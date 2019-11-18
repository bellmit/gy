<template>
  <div class="my-order-list shipping">
    <div>
      <div class="gy-h4">
        奖励明细
      </div>
      <div class="title2">
        公司/个人名称：{{inviterCompanyName}}
      </div>
      <div class="gy-form">
        <div class="gy-form-group">
          <span class="l">对方公司名称</span>
          <div class="company-list">
            <span><input placeholder="请输入对方公司名称" @click="blur11" type="text" class="gy-input" v-model="CompaniesCony" @keyup.enter="onelist1click"><i class="iconfont icon-mySearch"  @click="onelist1click"></i></span>
            <ul class="listul"  v-show="onelist1Show">
              <li v-for="(item,index) in onelist1" :key="index" @click="onelist1select(item)" v-if="onelist1.length>0">
                {{item.companyName}}
              </li>
              <li class="none-tips" v-if="onelist1.length === 0">没有搜到相关公司</li>
            </ul>
          </div>
        </div>
        <div class="gy-form-group">
          <span class="l">日期</span>
          <el-date-picker
                  v-model="datatime"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  default-value="2019-01-01">
          </el-date-picker>
        </div>
        <div class="gy-form-group">
          <span class="l">奖励类型</span>
          <el-select v-model="parameter.data.prizeType" placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
          <i @click="search" class="iconfont icon-search" style="top: 0px!important;"></i>
        </div>
      </div>
    </div>
    <div>
      <table class="gy-table">
        <thead>
        <tr>
          <th style="width:100px">奖励时间</th>
          <th style="width:100px">奖励类型</th>
          <th style="width:120px">对方公司名称</th>
          <th style="width:100px">交易金额(元)</th>
          <th style="width:100px">奖励金额(元)</th>
          <th style="width:100px">交易订单号</th>
          <th style="width:100px">撮合订单号</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(items, ind ) in data" :key="ind">
          <td style="width:100px">{{items.createdDate|date}}</td>
          <td style="width:100px">{{items.prizeType}}</td>
          <td style="width:100px">{{items.usrCompanyName}}</td>
          <td style="width:100px" class="align-r">{{items.orderAmount| numToCash}}</td>
          <td style="width:100px" class="align-r">{{items.cashAmount| numToCash}}</td>
          <td style="width:100px;color: #4a90e2!important;cursor: pointer" @click="pageTransaction(items.odrOrderId)">{{items.odrOrderSn}}</td>
          <td style="width:100px">{{items.dmkOrderSn||'--'}}</td>
        </tr>
        </tbody>
      </table>
      <div class="pagination-wrapper">
        <div class="pagination-total top">奖励金额统计 : {{receiveAward| numToCash}}元</div>
        <div class="pagination-total">共 {{total}} 条</div>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :total=total>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>export default {
    data () {
        return {
            total: null,
            pageNum: null,
            parameter: {
                'pageNum': 1,
                'pageSize': 10,
                'data': {
                    'inviterId': this.$route.query.id, // 邀请人id
                    'usrCompanyId': '', // 公司id
                    'prizeType': '',
                    'cashFlowDateStart': '', // 奖励开始时间
                    'cashFlowDateEnd': '' // 奖励结束时间
                }
            },
            parameter2: {
                'pageNum': 1,
                'pageSize': 100,
                'data': {
                    'inviterId': this.$route.query.id, // 邀请人id
                    'usrCompanyId': '', // 公司id
                    'prizeType': '',
                    'cashFlowDateStart': '', // 奖励开始时间
                    'cashFlowDateEnd': '' // 奖励结束时间
                }
            },
            datatime: null,
            CompaniesCony: '',
            onelist1Show: false,
            onelist1: [],
            data: [],
            receiveAward: '',
            inviterCompanyName: '',
            options: [{
                value: '100',
                label: '全部'
            }, {
                value: '1',
                label: '撮合交易奖励'
            }, {
                value: '2',
                label: '撮合交易补贴'
            }, {
                value: '3',
                label: '邀请达标奖励'
            }]
        };
    },
    created () {
        this.getInfo();
    },
    methods: {
    // 修改全部公司获得接口
        onelist1click () {
            var that = this;
            that.onelist1Show = true;
            that.$http.post(that.$api.orders.creatOrderCompanies2, {
                'companyTypeId': 1, // 1:交易公司  2：承运商
                'name': this.CompaniesCony
            }).then(function (res) {
                that.onelist1 = res.data.data;
            }).catch(() => {
                console.log('出错了');
            });
            this.parameter.data.usrCompanyId = '';
        },
        onelist1select (item) {
            var that = this;
            that.CompaniesCony = item.companyName;
            that.parameter.data.usrCompanyId = item.companyId;
            that.onelist1Show = false;
        },
        blur11 () {
            this.onelist1Show = false;
            this.CompaniesCony = '';
            this.parameter.data.usrCompanyId = '';
        },
        search (state) { // 搜索
            console.log(this.datatime);
            if (this.datatime) {
                this.parameter.data.cashFlowDateStart = new Date(this.datatime[0]).getTime();
                this.parameter.data.cashFlowDateEnd = new Date(this.datatime[1]).getTime();
            } else {
                this.parameter.data.cashFlowDateStart = '';
                this.parameter.data.cashFlowDateEnd = '';
            }
            this.getInfo(this.parameter);
        },
        handleCurrentChange (val) { // 分页
            this.pageNum = val;
            this.parameter.pageNum = this.pageNum;
            this.getInfo(this.parameter);
        },
        getInfo (state) { // 获取信息
            let that = this;
            console.log(typeof (this.parameter.data.prizeType));
            if (Number(this.parameter.data.prizeType) === 100) {
                this.parameter.data.prizeType = '';
            }
            that.$http.post(this.$api.reward.search, that.parameter).then((res) => {
                if (res.data.code === 0) {
                    this.data = res.data.data.list;
                    this.total = res.data.data.total;
                    this.pageNum = res.data.data.pageNum;
                    for (let i = 0; i < res.data.data.list.length; i++) {
                        if (res.data.data.list[i].prizeType === 1) {
                            res.data.data.list[i].prizeType = '撮合交易奖励';
                        } else if (res.data.data.list[i].prizeType === 2) {
                            res.data.data.list[i].prizeType = '撮合交易补贴';
                        } else if (res.data.data.list[i].prizeType === 3) {
                            res.data.data.list[i].prizeType = '邀请达标奖励';
                        } else if (res.data.data.list[i].prizeType === 4) {
                            res.data.data.list[i].prizeType = '销售交易达标';
                        }
                    }
                }
            });
            //    奖励金额统计
            that.$http.post(this.$api.reward.invitationInfo, that.parameter.data).then((res) => {
                if (res.data.code === 0) {
                    console.log(res.data.data.receiveAward);
                    this.receiveAward = res.data.data.receiveAward;
                    if (res.data.data.inviterType === 1 || res.data.data.inviterType === 2) {
                        this.inviterCompanyName = res.data.data.inviterCompanyName;
                    } else if (res.data.data.inviterType === 3 || res.data.data.inviterType === 4) {
                        this.inviterCompanyName = res.data.data.inviterUsrName;
                    }
                }
            });
        },
        pageTransaction (v) {
            this.$router.push({name: 'orderDetail', query: {orderId: v}});
        }
    }
};
</script>
<style  lang="scss" scoped>
  .shipping{
    .gy-form{
      padding:20px 14px;
      .gy-form-group{
        position: relative;
         padding:0 30px 12px 96px;
      }
      .gy-form-group:nth-child(even){
         padding:0 0 12px 76px;
        .l{
           margin-left:30px;
        }
      }
    }
    .company-list{
      position: relative;
    }
    .listul{
      background-color: #fff;
      width: 100%;
      max-height: 200px;
      overflow: auto;
      position: absolute;
      left: 0;
      top: 32px;
      z-index: 9;
      border: 1px solid #e6eaea;
      border-top: none;
      li{
        padding: 5px 10px;
      }
      li:hover{
        cursor: pointer;
        background-color: #f5f7fa;
        color: #4a90e2;
      }
    }
    .my-search{
      margin-left: 5px;
      i:hover{
        cursor: pointer;
      }
    }
    .my-top{
      margin-top: 10px;
    }
    .selected {
      margin-top: 20px;
      padding-bottom: 15px;
      overflow: hidden;
      .right{
        float: right;
      }
      ul li {
        float: left;
        padding: 0 5px;
        cursor: pointer;
        &.active {
          color: $color-a-active;
          border-bottom: 2px solid $color-a-active
        }
      }
      ul li:not(:first-child) {
        position:relative;
        margin-left: 10px;
      }
      .search-btn{
        margin-right:14px;
        color: $color-minor;
      }
      .search-btn:hover{
        cursor: pointer;
      }
      .search-box {
        display: inline-block;
        width: 216px;
        font-size: 14px !important;
        border-bottom: 1px solid #e7ecf1;
        input {
          width: 140px;
          height: 30px;
          color: $color-minor;
          border: none;
        }
        button {
          display:inline-block;
          width: 60px;
          color: $color-minor;
          border: none;
          background-color: #fff;
          text-align: right;
        }
        span {
          color: $color-minor;
          padding-left: 20px
        }
      }
    }
    .rebox{
      position: relative;
      .abbox{
        position: absolute;
        top: 0px;
        right: -5px;
      }
    }
    .top{
      margin-bottom: 20px;
    }
    .title1{
      color: #333;
      font-size: 14px;
      margin-top: 10px;
    }
    .title2{
      color: #666;
      font-size: 14px;
      margin-left: 14px;
    }
    .icon-search{
      position: absolute;
      right:4px;
    }
    .icon-mySearch{
      position: absolute;
      right:25px;
    }
    .el-input__inner{
      height:34px;
      line-height: 34px;
    }
  }
</style>
