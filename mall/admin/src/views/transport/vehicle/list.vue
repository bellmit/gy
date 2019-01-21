<template>
  <div class="transport-wrap order">
    <div class="gy-h4">车辆列表</div>
    <div class="t" style="overflow: hidden;">
      <ul class="tabs">
        <li class="all" :class="{'selected': tabIdx === -1}" @click="tabChange(-1, -1)"><a href="javascript:;">全部</a>
        </li>
        <li v-for="(statusItem,index) in vehicleStatusList" :key="index" @click="tabChange(index,statusItem.initKeys)"
            :class="{'selected': tabIdx === index}">
          <a href="javascript:;">{{statusItem.initValues}}(<span>{{statusItem.initCountValues}}</span>)</a>
        </li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search" @click="getVehicleList"></i>
        <input type="text" v-model="searchData.data.keywords" placeholder="请输入车牌号" class="gy-input">
      </div>
    </div>
    <div class="gy-form-box-14">
      <div class="gy-form-group" style="height: 42px">
        <div class="l">承运商</div>
        <label>
          <input @click="blur11" placeholder="请选择承运商" type="text" class="gy-input" v-model="companyNamenew" @keyup.enter="onelist1click">
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
        <div class="l">车型</div>
        <el-select v-model="searchData.data.infCarrierTypeId" class="" placeholder="请选择">
          <el-option
            v-for="item in carrierTypeStaus"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="gy-form-group">
        <div class="l">行驶证有效期</div>
        <div class="item">
          <div class="a">
            <el-date-picker
              v-model="searchData.data.startTime"
              type="date"
              class="form-date-item"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="s">至</div>
          <div class="a">
            <el-date-picker
              v-model="searchData.data.endTime"
              type="date"
              class="form-date-item"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
        <i class="iconfont icon-search" @click="getVehicleList"></i>
      </div>
      <div class="clear"></div>
    </div>
    <span class="button-box">
      <button type="button" @click="$router.push({ name: 'vehicleAdd' })" class="gy-button-extra">新增</button>
    </span>
    <table class="gy-table list bid-list">
      <thead>
      <tr>
        <td>车牌号</td>
        <td>承运商</td>
        <td>车型</td>
        <td>注册日期</td>
        <td>行驶证有效期</td>
        <td>发动机号</td>
        <td>VIN</td>
        <td>状态</td>
        <td>操作</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in vehicleInfo.data.list" :key="index"
          v-if="vehicleInfo != null && vehicleInfo.data != null && vehicleInfo.data.list != null && vehicleInfo.data.list.length > 0">
        <td>{{item.licensePlateNumber}}</td>
        <td>{{item.companyName}}</td>
        <td>{{item.infCarrierName}}</td>
        <td>{{item.registerDate | date}}</td>
        <td>{{item.drivingLicenseValid | date}}</td>
        <td>{{item.engineNumber}}</td>
        <td>{{item.vin}}</td>
        <td>{{item.valid === 1 ? '可用' : '不可用'}}</td>
        <td>
          <span @click="$router.push({name:'vehicleDetail', query:{vehicleId: item.id}})"
                class="gy-button-view">查看
          </span>
          <span @click="$router.push({name:'vehicleAdd', query:{vehicleId: item.id}})" class="gy-button-view">编辑</span>
          <!--  <a class="gy-button-view" @click="deleteVehicle(item.id);">删除</a>-->
        </td>
      </tr>
      <tr
        v-if="vehicleInfo != null && vehicleInfo.data != null && vehicleInfo.data.list != null && vehicleInfo.data.list.length === 0">
        <td colspan="9" style="text-align: center">暂无数据</td>
      </tr>
      </tbody>
    </table>
    <div class="pagination-wrapper" v-if="searchData !== null && searchData.total > searchData.pageSize">
      <div class="pagination-total">共{{searchData.total}}条</div>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="searchData.pageNum"
        :page-size="searchData.pageSize"
        :total="searchData.total"
        @current-change="getList"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            tabIdx: -1,
            vehicleInfo: {
                data: {
                    list: []
                }
            },
            priceList: [],
            searchData: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                data: {
                    infCarrierTypeId: null,
                    licensePlateNumber: null,
                    startTime: null,
                    endTime: null,
                    valid: null,
                    keywords: null,
                    companyId: null
                }
            },
            carrierTypeStaus: [],
            vehicleStatusList: [
                {initKeys: '1', initValues: '已启用', initCountValues: ''},
                {initKeys: '0', initValues: '已禁用', initCountValues: ''}
            ],
            // carrierCompanyList: [],
            onelist1: [],
            onelist1Show: false,
            companyNamenew: ''
        };
    },
    created () {
        this.getVehicleList();
        this.getinfCarrierTypeStatus();
        this.getList();
        // this.getCarryierCompany();
    },
    methods: {
        onelist1click () {
            this.onelist1Show = true;
            this.$http.post(this.$api.orders.creatOrderCompanies2, {
                'companyTypeId': 2, // 1:交易公司  2：承运商
                'name': this.companyNamenew
            })
                .then((res) => {
                    this.onelist1 = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
            this.searchData.data.companyId = '';
        },
        onelist1select (item) {
            this.companyNamenew = item.companyName;
            this.searchData.data.companyId = item.companyId;
            this.onelist1Show = false;
        },
        blur11 () {
            this.companyNamenew = '';
            this.onelist1Show = false;
            this.searchData.data.companyId = '';
        },
        // 查询列表
        getVehicleList () {
            this.$http.post(this.$api.transport.vehicleList, this.searchData)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.getVehicleValidCount();
                        this.vehicleInfo = res.data.data;
                        this.searchData.total = res.data.data.data.total;
                    }
                });
        },
        // 查询车辆类型列表
        getinfCarrierTypeStatus () {
            this.$http.post(this.$api.transport.carriersList, this.searchData)
                .then((res) => {
                    this.carrierTypeStaus.push({id: null, name: '未选择'});
                    for (let item of res.data.data.list) {
                        this.carrierTypeStaus.push(item);
                    }
                });
        },
        // 查询车辆状态数量
        getVehicleValidCount () {
            this.$http.post(this.$api.transport.carriersStatus, this.searchData.data)
                .then((res) => {
                    this.vehicleStatusList[0].initCountValues = res.data.data.validCount;
                    this.vehicleStatusList[1].initCountValues = res.data.data.unValidCount;
                });
        },
        // 删除车辆
        deleteVehicle (id) {
            this.$confirm('<span><i class="iconfont icon-message-error"></i>确定删除?</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                // this.doDelete(row.id);
                this.$http.post(this.$api.transport.deleteVehicle, this.searchData)
                    .then(res => {
                        // this.carrierTypeStaus = res.data.data.list;
                    });
            }).catch(() => {
            });
        },
        // 切换tab页
        tabChange (tabIdx, status) {
            this.tabIdx = tabIdx;
            this.searchData.data.valid = null;
            if (status !== -1) {
                this.searchData.data.valid = status;
            }
            this.searchData.pageNum = 1;
            this.getVehicleList();
        },
        // 查询列表
        getList () {
            this.$http.post(this.$api.transport.vehicleList, this.searchData)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.vehicleInfo = res.data.data;
                    }
                });
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

  .button-box {
    display: block;
    text-align: right;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .gy-button-view {
    margin-right: 10px;
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
