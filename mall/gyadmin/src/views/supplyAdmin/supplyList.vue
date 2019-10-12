<template>
  <div class="supplyList">
    <div class="gy-h4">供应链申请管理</div>
    <!-- 搜索 -->
    <div class="selected">
      <ul>
        <!--0 代采  1 代采代销 10全部--><!---->
        <li :class="{ active: variable.serviceTypeId === '' }" @click="toggleTabs(10)">全部({{this.status[10] || 0}})</li>
        <li :class="{ active: variable.serviceTypeId === 1 }" @click="toggleTabs(1)">代采({{this.status[0] || 0}})</li>
        <li :class="{ active: variable.serviceTypeId === 3 }" @click="toggleTabs(3)">赊销({{this.status[2] || 0}})</li>
        <li :class="{ active: variable.serviceTypeId === 2 }" @click="toggleTabs(2)">货押({{this.status[1] || 0}})</li>
      </ul>
      <div class="selected_right">
        <div class="search-box">
          <input type="search" v-model="variable.keywords" placeholder="请输入申请单号、品名">
          <span class="searchClick" @click="pageNum = 1; getInfo()"><i class="iconfont icon-search"></i></span>
        </div>
        <span class="search-btn" @click="toggleSelect=!toggleSelect">高级搜索<i class="iconfont" :class="toggleSelect?  'icon-arrow-up': 'icon-arrow-down'"></i></span>
      </div>
    </div>
    <!-- 高级搜索 -->
    <div class="selected-box clearfix" v-if="toggleSelect">
      <div class="search-form">
          <div class="gy-form-group">
              <span class="l">申请单号</span> <!--新加-->
              <input type="text" placeholder="请输入" v-model="variable.code">
          </div>
          <div class="gy-form-group search_last">
              <span class="l">品名</span>
              <input type="text" placeholder="请输入" v-model="variable.skuName" @keyup.13="getProductName"
                     @click="listShow = false; variable.skuName = ''">
              <div class="Drop-down" style="right: 16px;" v-if="listShow">
                  <ul class="listUl">
                      <li v-for="(item, index) in options" :key="index" v-if="options.length>0"
                          @click="setPriductName(item.goodsName)">{{item.goodsName}}
                      </li>
                      <li v-if="options.length === 0">没有搜到相关产品</li>
                  </ul>
              </div>
              <span class="searchicon searchicon_a" @click="getProductName"><i class="iconfont icon-mySearch"></i></span>
          </div>
          <div class="gy-form-group search_last">
              <span class="l">申请公司</span>
              <input type="text" placeholder="请输入" v-model="variable.companyName" @keyup.13="getCompanyTypes"
                     @click="CompanyShow = false; variable.companyName = ''">
              <div class="Drop-down" v-if="CompanyShow">
                  <ul class="listUl">
                      <li v-for="(item, index) in CompanyTypes" :key="index" v-if="CompanyTypes.length>0"
                          @click="setCompanyName(item.companyName)">{{item.companyName}}
                      </li>
                      <li v-if="CompanyTypes.length === 0">没有搜到相关公司</li>
                  </ul>
              </div>
              <span class="searchicon searchicon_a" style="right: 35px" @click="getCompanyTypes"><i class="iconfont icon-mySearch"></i></span>
          </div>
          <div class="gy-form-group search_last">
              <span class="l">服务商</span>
              <input type="text" placeholder="请输入" v-model="variable.providerCompanyName" @keyup.13="getProviderCompanyName"
                     @click="providerShow = false; variable.providerCompanyName = ''">
              <div class="Drop-down" style="right: 16px;" v-if="providerShow">
                  <ul class="listUl">
                      <li v-for="(item, index) in providerList" :key="index" v-if="providerList.length>0"
                          @click="setProviderName(item.name)">{{item.name}}
                      </li>
                      <li v-if="providerList.length === 0">没有搜到相关内容</li>
                  </ul>
              </div>
              <span class="searchicon searchicon_a" @click="getProviderCompanyName"><i class="iconfont icon-mySearch"></i></span>
          </div>
          <div class="gy-form-group">
              <span class="l">申请单状态</span>
              <el-select v-model="variable.status" placeholder="请选择">
                  <el-option
                          v-for="(item, index) in serviceType"
                          :key="index"
                          :label="item.platformDisplay"
                          :value="item.applicationStatus">
                  </el-option>
              </el-select>
          </div>
          <div class="gy-form-group search_last">
              <span class="l">申请日期</span>
              <el-date-picker
                      v-model="time"
                      type="daterange"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
              </el-date-picker>
              <span class="searchicon" @click="pageNum = 1; getInfo()"><i class="iconfont icon-search"></i></span>
          </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="table-box">
      <table class="gy-table">
        <thead>
        <tr>
          <th>申请单号</th>
          <th>申请公司</th>
          <th>服务商</th>
          <th>业务类型</th>
          <th>品名</th>
          <th>数量(吨)</th>
          <th>周期(天)</th>
          <th>申请时间</th>
          <th>有效日期</th>
          <th>申请单状态</th>
          <th>受理人</th>
          <!--<th>受理备注</th>-->
          <th>操作</th>
        </tr>
        </thead>
        <tbody v-if="list.length !== 0">
        <tr v-for="(item, index) in list" :key="index">
          <td>{{item.code}}</td>
          <td>{{item.companyName}}</td>
          <td>{{item.providerCompanyName || '-'}}</td>
          <td>{{item.serviceTypeName}}</td>
          <td>{{item.skuName}}</td>
          <td class="align-r">{{item.productAmount}}</td>
          <td class="align-r">{{item.period}}</td>
          <td>{{item.createdDate | date(true)}}</td>
          <td>{{item.effectiveDate | date}} 以前</td>
          <td><span :style="applicationStatus[item.status]">{{item.statusName}}</span></td>
          <td>{{item.assigneeUserName || '-'}}</td>
          <!--<td>-->
              <!--<div class="amount-memo" :title="item.memo">{{item.memo || '-'}}</div>-->
          <!--</td>-->
          <td class="align-c">
            <router-link
              class="gy-button-view"
              :to="{name:'supplyFormDetail', query:item}">查看
              <!--:to="{name:'supplyDetail', query:{'id':item.id,'companyId':item.companyId}}">查看-->
            </router-link>
          </td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="16" style="text-align: center;">没有找到可显示的数据...</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination-wrapper">
      <div class="pagination-total">共 {{total}} 条记录</div>
      <!-- 分页 -->
      <el-pagination
        v-if="list.length !== 0"
        background
        :total="total"
        :current-page="pageNum"
        layout="prev, pager, next"
        @current-change="turnPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            variable: {
                keywords: '', // 关键字搜索
                skuName: '', // 品名
                serviceTypeId: '', // 服务类型
                companyName: '', // 客户ID
                code: '', // 申请单号
                providerCompanyName: '', // 服务商
                status: '', // 申请单状态
                startTime: '', // 开始时间
                endTime: '', // 结束时间
                userActionType: 3
            },
            total: 0,
            pageNum: 1,
            toggleSelect: false, // 点击高级搜索
            serviceType: [], // 服务类型
            CompanyTypes: [], // 企业类型
            time: '', // 时间
            list: [], // 供应链申请管理列表
            status: [], // 状态数
            companyId: '', // 用户id
            options: [], // 存放品名列表
            listShow: false,
            providerShow: false,
            providerList: [],
            CompanyShow: false,
            applicationStatus: {
                10: 'color: #F49A1E!important', // 平台审核
                20: 'color: #F49A1E!important', // 服务商审核
                21: 'color: #F49A1E!important', // 方案审批中
                22: 'color: #999999!important', // 申请驳回
                30: 'color: #24C815!important', // 服务执行
                40: 'color: #D12626!important', // 违约和处置
                98: 'color: #D12626!important', // 已拒绝
                99: 'color: #24C815!important' // 已完成
            }
        };
    },
    created () {
        this.init();
    },
    methods: {
        // 初始信息
        init () {
            let userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                userInfo = JSON.parse(userInfo);
                this.companyId = userInfo.id;
            }
            this.getApplicationStatus();
            this.getInfo();
        },
        // 获取申请单状态
        getApplicationStatus () {
            this.$http.get(this.$api.supplyAdmin.status).then(res => {
                if (res.data.code === 0) {
                    this.serviceType = res.data.data;
                    let obj = {
                        platformDisplay: '全部',
                        applicationStatus: ''
                    };
                    this.serviceType.unshift(obj);
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        // 获取服务商
        getProviderCompanyName () {
            this.providerShow = true;
            this.$http.get(this.$api.supplyAdmin.provider + '?keywords=' + this.variable.providerCompanyName).then(res => {
                if (res.data.code === 0) {
                    this.providerList = res.data.data;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        // 获取品名
        getProductName () {
            this.listShow = true;
            this.$http.get(this.$api.offers.goods + '?keywords=' + this.variable.skuName).then(res => {
                if (res.data.code === 0) {
                    this.options = res.data.data;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        // 获取企业
        getCompanyTypes () {
            this.CompanyShow = true;
            this.$http.post(this.$api.supplyAdmin.CompanyTypes, {
                companyTypeId: 1,
                name: this.variable.companyName
            }).then(res => {
                if (res.data.code === 0) {
                    this.CompanyTypes = res.data.data;
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch((e) => {
                console.log('出错了' + e);
            });
        },
        // 获取状态数
        getStatus () {
            this.$http.post(this.$api.supplyAdmin.statusNum, {
                keywords: this.variable.keywords,
                skuName: this.variable.skuName,
                serviceTypeId: this.variable.serviceTypeId,
                companyName: this.variable.companyName,
                code: this.variable.code,
                providerCompanyName: this.variable.providerCompanyName, // 服务商
                status: this.variable.status, // 申请单状态
                startTime: this.time && this.time[0], // 开始时间
                endTime: this.time && this.time[1] // 结束时间
            }).then(res => {
                if (res.data.code === 0) {
                    this.status = res.data.data;
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch((e) => {
                console.log('出错了' + e);
            });
        },
        // 获取列表
        getInfo () {
            this.getStatus();
            this.variable.startTime = this.time && this.time[0];
            this.variable.endTime = this.time && this.time[1];
            let query = {
                'pageSize': 10, // 显示数量
                'pageNum': this.pageNum, // 当前页
                'data': this.variable
            };
            this.$http.post(this.$api.supplyAdmin.supplyList, query).then(res => {
                if (res.data.code === 0) {
                    this.list = res.data.data.list;
                    this.total = res.data.data.total;
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch((e) => {
                console.log('出错了' + e);
            });
        },
        // table切换
        toggleTabs (index) {
            this.variable.serviceTypeId = index === 10 ? '' : index;
            this.pageNum = 1;
            this.getInfo();
        },
        setPriductName (text) {
            this.variable.skuName = text;
            this.listShow = false;
        },
        setProviderName (text) {
            this.variable.providerCompanyName = text;
            this.providerShow = false;
        },
        setCompanyName (text) {
            this.variable.companyName = text;
            this.CompanyShow = false;
        },
        // 分页
        turnPage (v) {
            this.pageNum = v;
            this.getInfo();
        },
        setStatus (type) {
            if (type === 0) {
                return '待受理';
            } else if (type === 1) {
                return '已受理';
            } else if (type === 2) {
                return '已拒绝';
            }
        }
    }
};
</script>

<style scoped lang="scss">
  .supplyList {
    padding: 0 15px;
    // 页面的标题栏
    .new-title-public {
      padding: 20px 0;
      font-size: 16px;
      font-weight: bold;
      color: #333 !important;
    }
    .selected {
      overflow: hidden;
      margin-bottom: 0;
      ul li {
        float: left;
        padding: 0 5px;
        margin-right: 10px;
        cursor: pointer;
        &.active {
          color: $color-a-active;
          border-bottom:2px solid $color-a-active
        }
      }
      .selected_right {
        float: right;
        overflow: hidden;
      }
      .search-btn {
        float: left;
        cursor: pointer;
        margin-right: 10px;
        color: #979797;
        i {
          font-size: 14px;
          margin-left: 5px;
        }
      }
      .search-box {
        float: left;
        display: inline-block;
        width: 216px;
        margin-right: 10px;
        border-bottom: 1px solid $color-light;
        position: relative;
        input {
          width: 210px;
          height: 30px;
          color: #666666;
          border: none;
          float: left;
        }
      }
      .searchClick {
        position: absolute;
        cursor: pointer;
        right: 0;
        top: 0;
      }
    }
    .selected-box {
      padding-top: 20px;
      padding-left:14px;
    }
    .table-box {
      padding-top: 5px;
      overflow-x: auto;
      .gy-table {
          th {
              display: table-cell;
              white-space: nowrap;
              width: auto;
          }
          td {
              color: #666;
              font-size: 12px;
              display: table-cell;
              white-space: nowrap;
              width: auto;
              padding-right: 12px;
          }
      }
    }
    .search_last {
      position: relative;
      .searchicon {
        position: absolute;
        top: 0;
        right: 0;
        color: #666666;
      }
      .searchicon_a {
        right: 16px;
      }
      .Drop-down {
        width: 100%;
        max-height: 200px;
        position: absolute;
        top: 37px;
        right: 31px;
        padding-left: 112px;
        z-index: 9;
      }
      .listUl {
        background-color: #fff;
        width: 100%;
        max-height: 200px;
        overflow: auto;
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
    }
    .amount-memo{
        max-width:150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
  }

  .gy-form-group {
    padding-left: 80px;
    .l {
      width: 70px;
    }
  }

  .gy-form-group:nth-child(odd) {
    padding-right: 30px;
  }

  .gy-form-group:nth-child(even) {
    padding-left: 96px;
    .l {
      width: 86px;
      padding-left: 30px;
    }
  }
</style>
<style lang="scss">
  .supplyList .el-select .el-input.is-focus .el-input__inner, .supplyList .el-select .el-input__inner:focus {
    border-color: #409EFF;
  }

  .container-fluid .el-input__inner {
    font-size: 14px;
  }

  .container-fluid .el-input__inner::-webkit-input-placeholder {
    color: #999999;
  }

  .container-fluid .el-input__inner::-moz-placeholder {
    color: #999999;
  }

  .container-fluid .el-input__inner::-ms-input-placeholder {
    color: #999999;
  }

  .supplyList .el-date-editor.el-input, .supplyList .el-date-editor.el-input__inner {
    height: 30px;
  }

  .supplyList .el-date-editor .el-range-separator {
    width: 25px;
    line-height: 26px;
  }
  .supplyList .el-input__icon {
    width: 25px;
    line-height: 25px;
  }
  .supplyList .el-range-editor .el-range-input {
    text-align: left;
    padding-left:3px;
  }
  /deep/ .supplyList .el-select-dropdown__item {
     &.selected{
      margin-bottom: 0!important;
    }
  }
</style>
