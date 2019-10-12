<template>
    <div class="money-account">
      <div class="money-account-tit common-padding">
        资金账户
      </div>
      <div class="money-account-common common-padding" v-for="(account,index) in accounts" :key="account.bankAccId">
        <div>
          <i class="el-icon-tickets"></i>
          <span class="createPayment-seller-tit">资金账户{{index+1}}</span>
        </div>
        <div class="clearfix money-accounts">
          <div class="money-accounts-left fl clearfix">
            <img class="fl" style="margin-top: 30px;" :src="account.bigIcon" />
            <div class="fr money-accounts-left-items">
              <div>子账户：{{account.bankAccount}}</div>
              <div class="money-accounts-left-amount">
                <div class="money-accounts-left-amount-item">
                  <div class="money-accounts-left-amount-item-tit">账户余额（元）</div>
                  <div class="money-accounts-left-amount-item-num">{{account.actualBalance}}</div>
                </div>
                <div class="money-accounts-left-amount-item">
                  <div class="money-accounts-left-amount-item-tit">冻结余额（元）</div>
                  <div class="money-accounts-left-amount-item-num">{{account.blockedBalance}}</div>
                </div>
                <div class="money-accounts-left-amount-item">
                  <div class="money-accounts-left-amount-item-tit">可用余额（元）</div>
                  <div class="money-accounts-left-amount-item-num">{{account.actualBalance - account.blockedBalance}}</div>
                </div>
              </div>
              <div>
                <button class="createPayment-status-right-submit gy-button-normal">转入</button>
                <button class="createPayment-status-right-cancel gy-button-normal">转出</button>
              </div>
            </div>
          </div>
          <div class="money-accounts-right fr">
            <div><i class="iconfont icon-Download"></i></div>
            <div>下载开户通知书</div>
          </div>
        </div>
      </div>
      <div class="money-account-common common-padding">
        <div>
          <i class="el-icon-tickets"></i>
          <span class="createPayment-seller-tit">交易对账</span>
        </div>
        <div>
          <el-radio-group v-model="period">
            <el-radio  :label="1">1周</el-radio>
            <el-radio :label="2">1个月</el-radio>
            <el-radio :label="3">3个月</el-radio>
            <el-radio :label="6">6个月</el-radio>
          </el-radio-group>
        </div>
        <div class="money-account-query clearfix">
          <div class="date-picker-box clearfix">
            <div class="date-picker fl">
              <span>交易时间 </span>
              <el-date-picker
                v-model="startDate"
                type="date"
                value-format="yyyyMMdd"
                style="width: 40%;"
                placeholder="开始日期">
              </el-date-picker>
              <span>  至  </span>
              <el-date-picker
                v-model="endDate"
                type="date"
                value-format="yyyyMMdd"
                style="width: 40%;"
                placeholder="结束日期">
              </el-date-picker>
            </div>
            <div class="money-account-query-bank fl clearfix">
              <span class="payment-list-content-item-tit fl">交易银行</span>
              <el-select class="fl" v-model="selectedBank" placeholder="请选择">
                <el-option
                  v-for="bank in accounts"
                  :key="bank.bankCode"
                  :label="bank.bankName"
                  :value="bank.bankAccount">
                </el-option>
              </el-select>
              <i class="iconfont icon-search"></i>
            </div>
          </div>
          <div class="money-account-query-btns">
            <el-button class="gy-button-normal ">导出</el-button>
          </div>
          <div class="money-accounts-result" >
            <div class="money-accounts-result-th">
              <span class="money-accounts-result-th-item result-item-width10">银行名称</span>
              <span class="money-accounts-result-th-item result-item-width10">交易类型</span>
              <span class="money-accounts-result-th-item result-item-width10">对方账户信息</span>
              <span class="money-accounts-result-th-item result-item-width10">交易金额</span>
              <span class="money-accounts-result-th-item result-item-width10">资金流向</span>
              <span class="money-accounts-result-th-item result-item-width10">交易日期</span>
              <span
                class="money-accounts-result-th-item money-accounts-result-th-item-look result-item-width10">操作</span>
            </div>
            <div class="money-accounts-result-tb">
              <div class="money-accounts-result-tb-item" v-for="(item,index) in resultList"
                   :key="item.dateUpdated" :class="{hoveredRow:index%2}">
                <span class="money-accounts-result-tb-item-colum result-item-width10">{{item.transBankName}}</span>
                <span class="money-accounts-result-tb-item-colum result-item-width10" v-if="item.transType == 1">交易转账</span>
                <span class="money-accounts-result-tb-item-colum result-item-width10">{{item.otherUsrCompanyName}}</span>
                <span class="money-accounts-result-tb-item-colum result-item-width10">{{item.amount}}</span>
                <span class="money-accounts-result-tb-item-colum result-item-width10">{{item.transDirection}}</span>
                <span class="money-accounts-result-tb-item-colum result-item-width10">{{item.transDate}}</span>
              </div>
            </div>
          </div>
          <el-pagination
            class="pagination-box"
            background
            @current-change="changeSelect"
            @size-change="sizeChange"
            layout="sizes, prev, pager, next"
            :current-page.sync="pageNo"
            :page-size="pageSize"
            :total="itemTotal">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'money-account',
    data () {
        return {
            accounts: [],
            startDate: '',
            endDate: '',
            pageNo: 1,
            pageSize: 10,
            itemTotal: 0,
            period: 3,
            selectedBank: '',
            resultList: []
        };
    },
    methods: {
        getAccountList () {
        // 获取资金账户信息
            const me = this;
            me.$http.post(me.$api.payment.companyAccount,
                {}
            ).then(function (response) {
                if (response.data.code === 0) {
                    me.accounts = response.data.data;
                    me.selectedBank = me.accounts[0].bankAccount;
                    me.getTransactionList();
                    if (me.accounts.length > 0) {
                        me.selectedBank = me.accounts[0].bankAccount;
                    }
                } else {
                    me.$alert(response.data.code + ' ' + response.data.message);
                    console.log(response.data.code + ' ' + response.data.message);
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        getTransactionList () {
            // 查询交易记录
            const me = this;
            me.$http.post(me.$api.payment.accTrans,
                {
                    'pageNo': me.pageNo,
                    'pageSize': me.pageSize,
                    'startDate': me.startDate,
                    'endDate': me.endDate,
                    'usrCompanyFundId': me.selectedBank
                }
            ).then(function (response) {
                if (response.data.code === 0) {
                    me.resultList = response.data.data.rows;
                    me.itemTotal = response.data.data.total;
                } else {
                    me.$alert(response.data.code + ' ' + response.data.message);
                    console.log(response.data.code + ' ' + response.data.message);
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        changeSelect (pageNo) {
            this.pageNo = pageNo;
            this.getTransactionList();
        },
        sizeChange (size) {
            this.pageSize = size;
            this.getTransactionList();
        }
    },
    created: function () {
        const me = this;
        me.getAccountList();
    }
};
</script>

<style lang="scss" scoped>
  .money-account {
    background-color: #fff;
    .common-padding {
      padding: 0 10px;
    }
    .money-account-tit {
      background: #fff;
      padding: 6px 10px;
    }
    .money-account-common {
      border-top: 1px solid #eee;
      padding: 20px 10px;
    }
    .money-accounts-left-amount {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .money-accounts-right {
      text-align: center;
      .icon-Download {
        font-size: 30px;
      }
    }
    .money-accounts-left-items {
      margin-left: 30px;
    }
    .userCenter .date-picker {
      width: 50%;
      margin-top:0;
    }
    .money-account-query {
      margin: 20px 0;
    }
    .money-account-query-btns {
      margin: 20px 0 10px 0;
      text-align: right;
    }
    .money-account-query-bank {
      width: 40%;
      margin-left: 20px;
      .el-select {
        width: 60%;
      }
    }
    .el-radio-group {
      margin-top: 20px;
    }
    .money-accounts-left-amount-item {
      margin-right: 20px;
    }
    .money-accounts-left-amount-item-tit {
      color: $color-main;
      font-size: 12px;
    }
    .money-accounts-left-amount-item-num {
      color: $color-title;
      font-size: 14px;
      font-weight: bold;
    }
    .money-accounts-left-amount {
      margin: 10px 0 20px 0;
    }
    .createPayment-status-right-cancel {
      margin-left: 10px;
    }

    .money-accounts-result {
      border: 1px solid #E7ECF1;
    }

    .money-accounts-result-th {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      background: rgba(238, 243, 248, 1);
    }
    .money-accounts-result-tb-item {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      height: 40px;
      line-height: 40px;
    }
    .money-accounts-result-tb-item-colum {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .money-accounts-result-th-item-look {
      text-align: center;
    }
    .result-item-width10 {
      width: 10%;
    }
    .result-item-width20 {
      width: 20%;
    }
  }

</style>
