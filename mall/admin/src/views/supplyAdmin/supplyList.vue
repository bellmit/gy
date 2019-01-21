<template>
  <div class="supplyList">
    <div class="gy-h4">供应链申请管理</div>
    <!-- 搜索 -->
    <div class="selected">
      <ul>
        <li :class="{ active: variable.status === '' }" @click="toggleTabs(10)">全部({{this.status[10] || 0}})</li>
        <li :class="{ active: variable.status === 0 }" @click="toggleTabs(0)">待受理({{this.status[0] || 0}})</li>
        <li :class="{ active: variable.status === 1 }" @click="toggleTabs(1)">已受理({{this.status[1] || 0}})</li>
        <li :class="{ active: variable.status === 2 }" @click="toggleTabs(2)">已拒绝({{this.status[2] || 0}})</li>
      </ul>
      <div class="selected_right">
        <div class="search-box">
          <input type="search" v-model="variable.keywords" placeholder="请输入申请单号/品名">
          <span class="searchClick" @click="pageNum = 1; getInfo()"><i class="iconfont icon-search"></i></span>
        </div>
        <span class="search-btn" @click="toggleSelect=!toggleSelect">高级搜索<i class="iconfont" :class="toggleSelect?  'icon-arrow-up': 'icon-arrow-down'"></i></span>
      </div>
    </div>
    <!-- 高级搜索 -->
    <div class="selected-box clearfix" v-if="toggleSelect">
      <div class="search-form">
        <div class="gy-form-group">
          <span class="l">服务类型</span>
          <el-select v-model="variable.serviceTypeId" placeholder="请选择">
            <el-option
              v-for="(item, index) in serviceType"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="gy-form-group search_last">
          <span class="l">品名</span>
          <input type="text" placeholder="请输入品名" v-model="variable.productName" @keyup.13="getProductName"
                 @click="listShow = false; variable.productName = ''">
          <div class="Drop-down" v-if="listShow">
            <ul class="listUl">
              <li v-for="(item, index) in options" :key="index" v-if="options.length>0"
                  @click="setPriductName(item.goodsName)">{{item.goodsName}}
              </li>
              <li v-if="options.length === 0">没有搜到相关产品</li>
            </ul>
          </div>
          <span class="searchicon searchicon_a" @click="getProductName"><i class="iconfont icon-search"></i></span>
        </div>
        <div class="gy-form-group search_last">
          <span class="l">企业</span>
          <input type="text" placeholder="请输入企业" v-model="variable.companyName" @keyup.13="getCompanyTypes"
                 @click="CompanyShow = false; variable.companyName = ''">
          <div class="Drop-down" v-if="CompanyShow">
            <ul class="listUl">
              <li v-for="(item, index) in CompanyTypes" :key="index" v-if="CompanyTypes.length>0"
                  @click="setCompanyName(item.companyName)">{{item.companyName}}
              </li>
              <li v-if="CompanyTypes.length === 0">没有搜到相关产品</li>
            </ul>
          </div>
          <span class="searchicon searchicon_a" style="right: 30px" @click="getCompanyTypes"><i class="iconfont icon-search"></i></span>
        </div>
        <div class="gy-form-group search_last">
          <span class="l">时间段</span>
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
          <th>申请企业</th>
          <th>服务类型</th>
          <th>品名</th>
          <th>数量（吨）</th>
          <th>周期（天）</th>
          <th>申请时间</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody v-if="list.length !== 0">
        <tr v-for="(item, index) in list" :key="index">
          <td>{{item.code}}</td>
          <td>{{item.companyName}}</td>
          <td>{{item.serviceTypeName}}</td>
          <td>{{item.productName}}</td>
          <td>{{item.productAmount}}</td>
          <td>{{item.period}}</td>
          <td>{{item.createdDate | date(true)}}</td>
          <td>{{setStatus(item.status)}}</td>
          <td>
            <router-link class="gy-button-view"
                         :to="{name:'supplyDetail', query:{'id':item.id,'companyId':item.companyId}}">查看
            </router-link>
          </td>
        </tr>
        </tbody>
        <tbody v-else>
        <tr>
          <td colspan="8" style="text-align: center;">没有找到可显示的数据...</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination-wrapper">
      <div class="pagination-total">共{{total}}条</div>
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
                productName: '', // 品名
                serviceTypeId: '', // 服务类型
                companyName: '', // 客户ID
                status: '', // 状态
                startTime: '', // 开始时间
                endTime: '' // 结束时间
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
            CompanyShow: false
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
            this.getServiceType();
            this.getInfo();
        },
        // 获取服务类型
        getServiceType () {
            this.$http.get(this.$api.supplyAdmin.supplyTypes).then(res => {
                if (res.data.code === 0) {
                    this.serviceType = res.data.data;
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch((e) => {
                console.log('出错了' + e);
            });
        },
        // 获取品名
        getProductName () {
            this.listShow = true;
            this.$http.get(this.$api.offers.goods + '?keywords=' + this.variable.productName).then(res => {
                this.options = res.data.data;
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
                productName: this.variable.productName,
                serviceTypeId: this.variable.serviceTypeId,
                companyName: this.variable.companyName
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
            this.variable.startTime = this.time ? this.time[0] : '';
            this.variable.endTime = this.time ? this.time[1] : '';
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
            this.variable.status = index === 10 ? '' : index;
            this.pageNum = 1;
            this.getInfo();
        },
        setPriductName (text) {
            this.variable.productName = text;
            this.listShow = false;
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
      ul li {
        float: left;
        padding: 0 5px;
        margin-right: 10px;
        font-weight: bold;
        cursor: pointer;
        &.active {
          color: $color-a-active;
          border-bottom: 1px solid $color-a-active
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
      padding-top: 30px;
    }
    .table-box {
      padding-top: 30px;
    }
    .search_last {
      position: relative;
      .searchicon {
        position: absolute;
        top: 1px;
        right: 0px;
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
        right: 40px;
        padding-left: 148px;
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
  }

  .gy-form-group {
    padding-left: 66px;
    .l {
      width: 56px;
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
<style>
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

  .supplyList .container-fluid .el-input__icon, .supplyList .el-date-editor .el-range-separator {
    width: 25px;
    line-height: 26px;
  }
</style>
