<template>
  <div class="payment-list">
    <div class="payment-list-tit">
      收款单列表
    </div>
    <div class="payment-list-tabs">
      <el-tabs v-model="activeName"  @tab-click="handleClick" class="my-tabs">
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="未确认" name="second"></el-tab-pane>
        <el-tab-pane label="已确认" name="third"></el-tab-pane>
        <el-tab-pane label="已失效" name="fourth"></el-tab-pane>
      </el-tabs>
      <div >
        <div class="payment-list-content">
          <div class="payment-list-content-query clearfix">
            <div class="payment-list-content-query-more fr" @click="seniorSearch">
              <span>高级搜索</span>
              <i slot="suffix" class="el-icon-arrow-down"></i>
            </div>
            <div class="payment-list-content-query-iptbox fr">
              <input class="payment-list-content-query-iptbox-ipt" v-model="queryCriteria" type="text" placeholder="请输入收款单号" />
                <i class="iconfont icon-search" @click="getCollectionList(1)"></i>
            </div>
          </div>
          <div class="payment-list-content-item-box" v-show="isSeniorSearch">
            <div class="payment-list-content-item clearfix">
              <span class="payment-list-content-item-tit fl" >起止日期</span>
              <div class="date-picker payment-list-content-item-input fl">
                <el-date-picker
                  v-model="startDate"
                  type="date"
                  @focus="handleFocus"
                  :picker-options="startDateOptions"
                  value-format="yyyyMMdd"
                  placeholder="选择开始日期">
                </el-date-picker>
                <span>  -  </span>
                <el-date-picker
                  v-model="endDate"
                  type="date"
                  @focus="handleFocus"
                  :picker-options="endDateOptions"
                  value-format="yyyyMMdd"
                  placeholder="选择结束日期">
                </el-date-picker>
              </div>
            </div>
            <div class="payment-list-content-item payment-list-content-item-right clearfix">
              <label class="payment-list-content-item-tit fl">订单编号</label>
              <el-input class="payment-list-content-item-input fl" v-model="orderNumber" placeholder="请输入内容"></el-input>
            </div>
          </div>

          <div class="payment-list-content-item-box" v-show="isSeniorSearch">
              <div class="payment-list-content-item clearfix">
                  <span class="payment-list-content-item-tit fl">支付方式</span>
                  <el-select class="payment-list-content-item-input" v-model="tradeMode" placeholder="请选择">
                      <el-option
                          v-for="item in tradeModeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                  </el-select>
              </div>
            <div class="payment-list-content-item payment-list-content-item-right clearfix">
              <label class="payment-list-content-item-tit fl">付款企业</label>
              <el-select class="payment-list-content-item-input" v-model="receiveCompanyId" placeholder="请选择">
                <el-option
                  v-for="item in componyOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="payment-list-content-item-box" v-show="isSeniorSearch">

          </div>

          <div class="payment-list-content-item-box" v-show="isSeniorSearch">
              <div class="payment-list-content-item clearfix" style="width: 97%;">
               <el-row>
                <el-col :span="2">收款类型</el-col>
                <el-col :span="12">
                   <el-radio-group v-model="payMethod">
                       <el-radio :label="''">全部</el-radio>
                       <el-radio :label="2">保证金</el-radio>
                       <el-radio :label="1">货款</el-radio>
                       <el-radio :label="3">结算</el-radio>
                       <el-radio :label="4">运费</el-radio>
                   </el-radio-group>
                </el-col>
                <el-col :span="2">
                  <i class="iconfont icon-search" @click="getCollectionList(2)"></i>
                </el-col>
              </el-row>
            </div>
          </div>
            <div class="export-box">
                <el-row>
                    <el-col :span="24"><button @click="downloadData" class="gy-button-normal">导出</button></el-col>
                </el-row>
            </div>
          <div class="payment-list-result" v-show="resultList.length>0">
            <div class="payment-list-result-th">
              <span class="payment-list-result-th-item result-item-width20">收款单号</span>
              <span class="payment-list-result-th-item result-item-width20">付款企业</span>
              <span class="payment-list-result-th-item result-item-width10">收款单状态</span>
              <span class="payment-list-result-th-item result-item-width20">订单编号</span>
              <span class="payment-list-result-th-item result-item-width10">收款金额</span>
              <span class="payment-list-result-th-item result-item-width10">支付方式</span>
              <span class="payment-list-result-th-item result-item-width10">收款类型</span>
              <span class="payment-list-result-th-item result-item-width10">收款日期</span>
            </div>
            <div class="payment-list-result-tb" >
              <a href="javascript:void(0);" @click="gotoDetail(item.id,item.collectionStatus)" class="payment-list-result-tb-item" v-for="(item,index) in resultList" :key="item.dateUpdated" :class="{hoveredRow:index%2}">
                <span class="payment-list-result-tb-item-colum result-item-width20">{{item.payNumber}}</span>
                <span class="payment-list-result-tb-item-colum result-item-width20">{{item.payCompanyName}}</span>
                <span class="payment-list-result-tb-item-colum result-item-width10">{{item.collectionStatus|collectionStatus}}</span>
                <span class="payment-list-result-tb-item-colum result-item-width20">{{item.orderNumber}}</span>
                <span class="payment-list-result-tb-item-colum result-item-width10">{{item.payTotal}}</span>
                <span class="payment-list-result-tb-item-colum result-item-width10">{{item.tradeMode|tradeMode}}</span>
                <span class="payment-list-result-tb-item-colum result-item-width10">{{item.payMethod|payMethod}}</span>
                <span class="payment-list-result-tb-item-colum result-item-width10">{{item.payTime}}</span>
              </a>
              <form method="POST" action="/trade/pay/v1/collection/exportExcel" id="hiddenForm" ref="hiddenForm">
                <input type="text" name="dsl" :value="JSON.stringify(getFormValue())" hidden/>
              </form>
              <el-pagination
                class="pagination-box"
                background
                @current-change="changeSelect"
                @size-change="sizeChange"
                layout="prev, pager, next"
                :current-page.sync="pageNo"
                :page-size="pageSize"
                :total="itemTotal">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'payment-list',
    data () {
        return {
            queryCriteria: '',
            activeName: 'first',
            lastOpeType: 0,
            isWeek: true,
            isMonth: false,
            startDateOptions: {
                // disabledDate: (time) => {
                //     if (this.endDate) {
                //         return time.getTime() > this.endDate;
                //     }
                //     return time.getTime() > Date.now();
                // }
            },
            endDateOptions: {
                disabledDate: (time) => {
                    if (this.startDate) {
                        return time.getTime() < this.s;
                    }
                    return time.getTime() > Date.now();
                }
            },
            startDate: '',
            endDate: '',
            orderNumber: '',
            pageNo: 1,
            pageSize: 10,
            itemTotal: 0,

            // 采购单状态
            companyType: 0,
            collectionStatus: '',
            // 付款企业
            componyOptions: [],
            receiveCompanyId: '',

            // 支付方式
            tradeModeOptions: this.$constant.tradeMode,
            tradeMode: '',
            payBillType: 1,
            resultList: [],

            isSeniorSearch: true, // 高级搜索
            payMethod: 0
        };
    },
    methods: {
        seniorSearch () {
            let _this = this;
            _this.isSeniorSearch = !_this.isSeniorSearch;
        },
        aWeek () {
            const me = this;
            this.endDate = this.$tools.formatDate(new Date(), 'yyyyMMdd');
            this.startDate = this.$tools.formatDate(new Date(new Date().getTime() - 3600 * 1000 * 24 * 7), 'yyyyMMdd');
            this.isWeek = true;
            this.isMonth = false;

            // 查询供应商
            me.$http.get(me.$api.account.company_rel_xref + '?type=2')
                .then(function (response) {
                    if (response.data.code === 0) {
                        me.componyOptions = response.data.data.xrefInfo;
                        me.companyType = response.data.data.companyType;
                    }
                });
        },
        setPaymentStatus (tabName) {
            const mapList = {
                first: 0,
                second: 1,
                third: 2,
                fourth: 3
            };
            this.collectionStatus = this.$constant.collectionStatus[mapList[tabName]].value;
        },
        handleClick (tab) {
            this.pageNo = 1;
            this.setPaymentStatus(tab.name);
            this.getCollectionList(3);
        },
        downloadData () {
            this.$refs.hiddenForm.submit();
        },
        handleFocus () {
            this.isWeek = false;
            this.isMonth = false;
        },
        changeSelect (pageNo) {
            this.pageNo = pageNo;
            this.getCollectionList();
        },
        sizeChange (val) {
            this.pageSize = val;
            this.getCollectionList();
        },
        gotoDetail (itemId, payStatus) {
        // 根据不同状态跳转到各自业务画面
            console.log(itemId + '------' + payStatus);
            if (payStatus === 10) {
                // 已创建
                this.$router.push({path: '/my/collection/confirm', query: {collectionId: itemId}});
            } else if (payStatus === 20 || payStatus === 50 || payStatus === 60) {
                // 其他
                this.$router.push({path: '/my/collection/info', query: {collectionId: itemId}});
            } else {

            }
        },
        getFormValue: function () {
            const me = this;
            let params = null;
            let startDateQry = '';
            let endDateQry = '';
            if (me.startDate) {
                startDateQry = me.startDate + '000000';
            }
            if (me.endDate) {
                endDateQry = me.endDate + '235959';
            }
            params = {
                pageNo: me.pageNo,
                pageSize: me.pageSize,
                orderNumber: me.orderNumber,
                payBillType: me.payBillType, // 付款单分类
                payStatus: me.payStatus,
                tradeMode: me.tradeMode, // 支付方式
                receiveCompanyId: me.receiveCompanyId,
                staCreatedDate: startDateQry,
                endCreatedDate: endDateQry,
                payMethod: me.payMethod
            };
            return params;
        },
        getCollectionList (opeType) {
            const me = this;
            let params = null;
            if (opeType === undefined) {
                opeType = me.lastOpeType;
            }
            if (opeType === 1) {
                params = {
                    pageNo: me.pageNo,
                    pageSize: me.pageSize,
                    queryCriteria: me.queryCriteria
                };
            } else if (opeType === 2) {
                let startDateQry = '';
                let endDateQry = '';
                if (me.startDate) {
                    startDateQry = me.startDate + '000000';
                }
                if (me.endDate) {
                    endDateQry = me.endDate + '235959';
                }
                params = {
                    pageNo: me.pageNo,
                    pageSize: me.pageSize,
                    orderNumber: me.orderNumber,
                    payBillType: me.payBillType, // 付款单分类
                    collectionStatus: me.collectionStatus,
                    tradeMode: me.tradeMode, // 支付方式
                    receiveCompanyId: me.receiveCompanyId,
                    staCreatedDate: startDateQry,
                    endCreatedDate: endDateQry
                };
            } else if (opeType === 3) {
                params = {
                    pageNo: me.pageNo,
                    pageSize: me.pageSize,
                    collectionStatus: me.collectionStatus
                };
            }
            me.lastOpeType = opeType;

            me.$http.post(me.$api.payment.collectionList, params)
                .then(function (response) {
                    if (response.data.code === 0) {
                        let resData = response.data.data.rows;
                        resData.forEach(item => {
                            item.payTime = me.$tools.parseDate(item.payTime);
                        });
                        me.resultList = resData;
                        me.itemTotal = response.data.data.total;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        clickPayBillTypeItem (value) {
            const me = this;
            // 查询供应商
            me.$http.get(me.$api.account.company_rel_xref + '?type=' + value)
                .then(function (response) {
                    if (response.data.code === 0) {
                        me.componyOptions = response.data.data;
                    }
                });
        }
    },
    created: function () {
        this.setPaymentStatus(this.activeName);
        this.aWeek();
        this.getCollectionList(2);
    }
};
</script>

<style lang="scss" scoped>
    .export-box{
        text-align: right;
        padding:20px 0;
    }
  .payment-list {
    background: #fff;
  }

  .payment-list-tit {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
  }

  .payment-list-content-item-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 96%;
  }

  .payment-list-content-item {
    width: 430px;
    margin-top: 10px;
  }
  .payment-list-content-item-tit {
    width: 19%;
    display: inline-block;
    height: 31px;
    line-height: 31px;
  }
  .payment-list-content-item-input {
    width: 80%;
    .el-radio {
      height: 32px;
      line-height: 32px;
    }
    .container-fluid .el-input__inner {
      line-height: 30px;
    }
  }

  .payment-list-btn {
    width: 100%;
    padding: 30px 92px;
  }

  .payment-list-result {
    border: 1px solid #E7ECF1;
  }

  .payment-list-result-th {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: rgba(238, 243, 248, 1);
    font-weight: bold;
  }

  .payment-list-result-tb-item {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
  }

  .even-Row {
    opacity: 0.3;
    background: #F2F3F7;
  }

  .hoveredRow {
    background: #F3F4F6;
  }
  .pagination-box {
    text-align: center;
    margin: 20px;
  }
  .payment-list-tabs {
    padding: 0 20px;
  }

  .result-item-width10 {
    width: 10%;
  }
  .result-item-width20 {
    width: 20%;
  }

  .payment-list-result-tb-item-colum {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .payment-list-result-th-item-look {
    text-align: center;
  }

  .payment-list-content-query-iptbox {
    border-bottom: 1px solid #E7ECF1;
    padding: 0 0 0 14px;
    /*width: 300px;*/
  }

  .payment-list-content-query-iptbox-ipt {
    border: none;
    display: inline-block;
    width: 230px;
  }

  .payment-list-content-query-iptbox-ipt::-webkit-input-placeholder { /* WebKit browsers */
    opacity: 0.5;
    font-size: 12px;
    color: #666666;
  }

  .payment-list-content-query-iptbox-ipt:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    opacity: 0.5;
    font-size: 12px;
    color: #666666;
  }

  .payment-list-content-query-iptbox-ipt::-moz-placeholder { /* Mozilla Firefox 19+ */
    opacity: 0.5;
    font-size: 12px;
    color: #666666;
  }

  .payment-list-content-query-iptbox-ipt:-ms-input-placeholder { /* Internet Explorer 10+ */
    opacity: 0.5;
    font-size: 12px;
    color: #666666;
  }

  .payment-list-content-query-iptbox-btn {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
  }

  .payment-list-content-query-more {
    color: #979797;
    margin-left: 20px;
  }

  .payment-list-content-query {
    margin: 0px 0 20px;
  }
</style>
<style lang="scss">
    // el-tabs 样式
    .my-tabs{
        .el-tabs__nav-wrap::after{
            background-color: initial;
            /*border:red solid 1px;*/
        }
        .el-tabs__item.is-active{
            color: red;
        }
        .el-tabs__active-bar{
            background-color: red;
        }
    }
</style>
