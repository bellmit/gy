<template>
  <div class="transport-wrap order">
    <div class="gy-h4">司机管理列表</div>
    <div class="t" style="overflow: hidden;">
      <ul class="tabs">
        <li class="all" :class="{'selected': tabIdx === -1}" @click="tabChange(-1,-1)"><a
          href="javascript:;">全部</a></li>

        <li v-for="(statusItem, index) in userStatusList"
            @click="tabChange(index,statusItem.initKeys)"
            :class="{'selected': tabIdx === index}"
            :key="index">
          <a href="javascript:;">
            {{statusItem.initValues}}
            (<span>{{statusItem.initCountValues}}</span>)</a>
        </li>

      </ul>
      <div class="search">
        <i class="iconfont icon-search" @click="searchList"></i>
        <input type="text" v-model="searchUserData.data.keywords" placeholder="请输入姓名或手机号" class="gy-input">
      </div>
    </div>
    <!---->
    <div class="gy-form-box-14">
      <div class="gy-form-group">
        <div class="l">承运商</div>
        <label>
          <input @click="blur11" placeholder="请输入承运商" type="text" class="gy-input" v-model="companyNamenew" @keyup.enter="onelist1click">
        </label>
        <ul class="listul" v-show="onelist1Show">
          <li v-for="(item,index) in onelist1" :key="index" @click="onelist1select(item)" v-if="onelist1.length>0">
            {{item.companyName}}
          </li>
          <li class="none-tips" v-if="onelist1.length === 0">没有搜到相关公司</li>
        </ul>
        <i class="iconfont icon-search" @click="onelist1click"></i>
      </div>
      <div class="gy-form-group">
        <div class="l">行驶证有效期</div>
        <div class="item">
          <div class="a">
            <el-date-picker
              v-model="searchUserData.data.startTime"
              type="date"
              class="form-date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="s">至</div>
          <div class="a">
            <el-date-picker
              v-model="searchUserData.data.endTime"
              type="date"
              class="form-date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="gy-form-group">
        <div class="l">人员类型</div>
        <el-select v-model="searchUserData.data.personnelType" class="select-plugin" placeholder="请选择类型">
          <el-option
            v-for="item in personnelTypeItems"
            :key="item.initKeys"
            :label="item.initValues"
            :value="item.initKeys">
          </el-option>
        </el-select>
        <i class="iconfont icon-search" @click="searchList"></i>
      </div>
      <div class="clear"></div>
    </div>
    <div class="button-box">
      <button type="button" @click="$router.push({ name: 'driverAdd' })" class="gy-button-extra">新增司机</button>
    </div>
    <table class="gy-table">
      <thead>
      <tr>
        <td>姓名</td>
        <td>承运商</td>
        <td>手机号</td>
        <td>人员类型</td>
        <td>初次领证日期</td>
        <td>证件有效期</td>
        <td>准驾车型</td>
        <td>状态</td>
        <td>操作</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in userList" :key="item.id" v-if="userList !==null && userList.length > 0">
        <td>{{item.username}}</td>
        <td>{{item.companyName}}</td>
        <td><span>{{item.phone}}</span></td>
        <td><span v-text="explainPersonnelType(item.personnelType)"></span></td>
        <td>{{item.receiveDate | date}}</td>
        <td>{{item.validDate | date}}</td>
        <td>{{item.vehicleModel}}</td>
        <td><span v-text="explainValidType(item.valid)"></span></td>
        <td>
          <span class="gy-button-view" @click="handleShowTransportUser(item.id)">查看</span>
          <span class="gy-button-view" @click="handleEditTransportUser(item.id)">编辑</span>
          <span class="gy-button-view disabled" v-if="item.valid === 1"
                @click="handleDisableTransportUser(item.id)">禁用</span>
          <span class="gy-button-view" v-if="item.valid === 0" @click="handleEnableTransportUser(item.id)">启用</span>
        </td>
      </tr>
      <tr v-if="userList !=null && userList.length === 0">
        <td colspan="8" class="note">暂无数据</td>
      </tr>
      </tbody>
    </table>
    <div class="pagination-wrapper" v-if="searchUserData != null && searchUserData.total>searchUserData.pageSize">
      <div class="pagination-total">共{{searchUserData.total}}条</div>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="searchUserData.pageNum"
        :page-size="searchUserData.pageSize"
        :total="searchUserData.total"
        @current-change="getList"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
    name: 'list',
    data () {
        return {
            tabIdx: -1,
            userList: null,
            searchUserData: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                data: {
                    valid: null,
                    keywords: null,
                    startTime: null,
                    endTime: null,
                    personnelType: null,
                    companyId: null
                }
            },
            personnelTypeItems: [
                {initKeys: null, initValues: '未选择'},
                {initKeys: '1', initValues: '驾驶人'},
                {initKeys: '2', initValues: '押运人'}
            ],
            statusCount: {},
            userStatusList: [
                {initKeys: '1', initValues: '已启用', initCountValues: ''},
                {initKeys: '0', initValues: '已禁用', initCountValues: ''}
            ],
            // 承运商列表数据
            carrierCompanyList: [],
            onelist1: [],
            onelist1Show: false,
            companyNamenew: ''

        };
    },
    created () {
        this.initData();
    },
    methods: {
        // 初始化数据
        initData () {
        // 查找所有承运商
        // this.getCarryierCompany();
        // 查找tab页的数据
            this.getCount();
            // 查找数据
            this.getList();
        },
        onelist1click () {
            this.onelist1Show = true;
            this.$http.post(this.$api.orders.creatOrderCompanies2, {
                'companyTypeId': 2, // 1:交易公司  2：承运商
                'name': this.companyNamenew
            })
                .then((res) => {
                    if (res.data.code === 0) {
                        this.onelist1 = res.data.data;
                    }
                }).catch(() => {
                    console.log('出错了');
                });
            this.searchUserData.data.companyId = '';
        },
        onelist1select (item) {
            this.companyNamenew = item.companyName;
            this.searchUserData.data.companyId = item.companyId;
            this.onelist1Show = false;
        },
        blur11 () {
            this.companyNamenew = '';
            this.onelist1Show = false;
            this.searchUserData.data.companyId = '';
        },
        // 查找所有承运商
        // getCarryierCompany () {
        //     this.$http.get(this.$api.transport.carryierCompany)
        //         .then(res => {
        //             let defaultItem = {'companyId': null, 'companyName': '未选择', 'companyPhone': null, 'username': null};
        //             this.carrierCompanyList.push(defaultItem);
        //             for (let item of res.data.data) {
        //                 this.carrierCompanyList.push(item);
        //             }
        //             // this.carrierCompanyList = res.data.data;
        //             console.log('承运商数据返回：');
        //             console.log(this.carrierCompanyList);
        //         });
        // },
        // 查询数量
        getCount () {
            this.$http.post(this.$api.transport.transportUserStatus, this.searchUserData.data)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.statusCount = res.data.data;
                        this.userStatusList[0].initCountValues = this.statusCount.validCount;
                        this.userStatusList[1].initCountValues = this.statusCount.unValidCount;
                    }
                });
        },
        // 查询列表
        getList () {
            this.$http.post(this.$api.transport.transportUserList, this.searchUserData)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.userList = res.data.data.list;
                        this.searchUserData.total = res.data.data.total;
                    }
                });
        },
        // tab切换
        tabChange (tabIdx, status) {
            this.tabIdx = tabIdx;
            this.searchUserData.data.valid = null;
            if (status !== -1) {
                this.searchUserData.data.valid = status;
            }
            this.searchList();
        },
        // 搜索按钮
        searchList () {
            this.searchUserData.pageNum = 1;
            this.getCount();
            this.getList();
        },
        // 详细页面跳转
        handleShowTransportUser (id) {
            this.$router.push({name: 'driverDetail', query: {id: id}});
        },
        // 编辑页面跳转
        handleEditTransportUser (id) {
            this.$router.push({name: 'driverAdd', params: {id: id}});
        },
        // 禁用
        handleDisableTransportUser (id) {
            this.$http.post(this.$api.transport.transportUserDisable, {id: id})
                .then((res) => {
                    if (res.data.code === 0) {
                        this.getCount();
                        this.getList();
                    }
                });
        },
        // 启用
        handleEnableTransportUser (id) {
            this.$http.post(this.$api.transport.transportUserEnable, {id: id})
                .then((res) => {
                    if (res.data.code === 0) {
                        this.getCount();
                        this.getList();
                    }
                });
        },
        // 人员类型解析
        explainPersonnelType (personnelType) {
            if (personnelType === 1) {
                return '驾驶人';
            } else if (personnelType === 2) {
                return '押运人';
            } else {
                return '未知';
            }
        },
        // 人员状态解析
        explainValidType (validType) {
            if (validType === 0) {
                return '已禁用';
            } else if (validType === 1) {
                return '已启用';
            } else {
                return '未知';
            }
        }

    }
};
</script>

<style lang="scss" scoped>
  .transport-wrap.order .t {
    padding: 11px 0 15px;
  }

  .transport-wrap.order .t .tabs li {
    padding: 0 5px;
    margin-right: 10px;
    font-weight: bold;
  }

  .transport-wrap.order .t .search {
    padding-right: 14px;
  }

  .gy-form-box-14 {
    padding-top: 6px;
  }

  .t .search {
    padding-right: 0 !important;
  }

  .disabled {
    color: #e0370f;
    border-color: #e0370f;
  }

  .search-area {
    padding: 10px 20px
  }

  .button-box {
    text-align: right;
    padding: 0 0 10px;
  }

  .td-180 {
    width: 180px;
  }

  .td-100 {
    width: 100px;
  }

  .td-126 {
    width: 126px;
  }

  .gy-button-view {
    margin-right: 6px;
  }

  .gy-button-view i {
    font-size: 12px;
    line-height: 8px;
    transform: scale(0.8);
    display: inline-block;
  }

  .sub-list {
    background-color: #fff;
    table {
      width: 90%;
      margin: 0 auto;
      td {
        background-color: #fff;
        border: none;
      }
    }
  }

  .link-im {
    color: $color-extra;
    margin-left: 10px;
  }

  .note {
    text-align: center;
    line-height: 40px;
    font-size: 14px;
  }

  .listul {
    background-color: #fff;
    width: calc(100% - 122px);
    max-height: 300px;
    overflow: auto;
    position: absolute;
    top: 32px;
    z-index: 1000;
    border: 1px solid #e6eaea;
    border-top: none;
    li {
      padding: 5px 10px;
    }
    li:hover {
      cursor: pointer;
      background-color: #f5f7fa;
      color: #4a90e2;
    }
  }

  .item {
    display: flex;
    .a {
      flex: 1;
    }
    .s {
      flex: 0 0 25px;
    }
  }

  .icon-search {
    position: absolute;
    top: 0;
    right: 14px;
  }

  .gy-form-group {
    padding-left: 95px;
    .l {
      width: 85px;
    }
  }

  .gy-form-group:nth-child(odd) {
    padding-right: 30px;
  }

  .gy-form-group:nth-child(even) {
    padding-left: 125px;
    .l {
      width: 115px;
      padding-left: 30px;
    }
  }
</style>
