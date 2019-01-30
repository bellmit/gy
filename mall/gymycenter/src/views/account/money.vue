<!--<script src="../../config/api.js"></script>-->
<template>
    <div class="money-account">
        <div class="new-title-public">
            资金账户
        </div>
        <div class="money-account-common common-padding" v-for="(account,index) in accounts" :key="account.bankAccId">
            <div>
                <i class="el-icon-tickets"></i>
                <span class="createPayment-seller-tit">资金账户{{index+1}}</span>
            </div>
            <div class="clearfix money-accounts">
                <div class="money-accounts-left fl clearfix">
                    <img class="fl" style="margin-top: 30px;" :src="account.bigIcon"/>
                    <div class="fr money-accounts-left-items">
                        <div>子账户：{{account.bankAccount}}</div>
                        <div class="money-accounts-left-amount">
                            <div class="money-accounts-left-amount-item">
                                <div class="money-accounts-left-amount-item-tit">账户余额（元）</div>
                                <div class="money-accounts-left-amount-item-num">{{account.actualBalance |numToCash(2)}}</div>
                            </div>
                            <div class="money-accounts-left-amount-item">
                                <div class="money-accounts-left-amount-item-tit">冻结余额（元）</div>
                                <div class="money-accounts-left-amount-item-num">{{account.blockedBalance|numToCash(2)}}</div>
                            </div>
                            <div class="money-accounts-left-amount-item">
                                <div class="money-accounts-left-amount-item-tit">可用余额（元）</div>
                                <div class="money-accounts-left-amount-item-num">{{account.accountBalance |numToCash(2)}}</div>
                            </div>
                        </div>
                        <div>
                            <button class="createPayment-status-right-submit gy-button-normal"
                                    @click="shiftto(account.bankAccId)">转入
                            </button>
                            <button class="createPayment-status-right-cancel gy-button-normal"
                                    @click="roolout(account.bankAccId)">转出
                            </button>
                        </div>
                    </div>
                </div>
                <!-- <div class="money-accounts-right fr">
                  <div><i class="iconfont icon-Download"></i></div>
                  <div></div>
                </div> -->
            </div>
        </div>
        <div class="money-account-common common-padding">
            <div>
                <i class="el-icon-tickets"></i>
                <span class="createPayment-seller-tit">交易对账</span>
            </div>
            <div class="money-accounts">
                <el-radio-group v-model="period" @change="changeDuratoin">
                    <el-radio :label="7">1周</el-radio>
                    <el-radio :label="1">1个月</el-radio>
                    <el-radio :label="3">3个月</el-radio>
                    <el-radio :label="6">6个月</el-radio>
                </el-radio-group>
            </div>
            <div class="money-account-query  clearfix">
                <div class="date-picker-box money-accounts clearfix">
                    <div class="date-picker">
                        <span>交易时间 </span>
                        <el-date-picker
                            v-model="startDate"
                            type="date"
                            style="width: 40%;"
                            placeholder="开始日期"
                            @change='startDateChange'
                        >
                        </el-date-picker>
                        <span>  至  </span>
                        <el-date-picker
                            v-model="endDate"
                            type="date"
                            style="width: 40%;"
                            @change='endDateChange'
                            placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <div class="money-account-query-bank">
                        <span class="payment-list-content-item-tit fl">交易银行</span>
                        <el-select class="fl" value-key="bankName" v-model="selectedBank" placeholder="请选择" @change="selectVal">
                            <el-option
                                v-for="bank in accounts"
                                :key="bank.bankCode"
                                :label="bank.bankName"
                                :value="bank">
                            </el-option>
                        </el-select>
                        <i class="iconfont icon-search" @click="getTransactionList"></i>
                    </div>
                </div>
                <div class="money-account-query-btns">
                    <button class="gy-button-extra" @click="exportBtn">导出</button>
                </div>
                <div class="money-accounts-result">
                    <div class="money-accounts-result-th">
                        <span class="money-accounts-result-th-item result-item-width10">银行名称</span>
                        <span class="money-accounts-result-th-item result-item-width10">交易类型</span>
                        <span class="money-accounts-result-th-item result-item-width10">对方账户信息</span>
                        <span class="money-accounts-result-th-item result-item-width10">交易金额</span>
                        <span class="money-accounts-result-th-item result-item-width10">资金流向</span>
                        <span class="money-accounts-result-th-item result-item-width10">交易日期</span>
                        <span class="money-accounts-result-th-item result-item-width10">操作</span>
                    </div>
                    <div class="money-accounts-result-tb">
                        <div class="money-accounts-result-tb-item" v-for="(item,index) in resultList"
                             :key="item.dateUpdated" :class="{hoveredRow:index%2}">
                            <span
                                class="money-accounts-result-tb-item-colum result-item-width10">{{item.accBnkNm}}</span>
                            <span class="money-accounts-result-tb-item-colum result-item-width10">{{item.tranTypeString}}</span>
                            <span class="money-accounts-result-tb-item-colum result-item-width10">{{item.accountNm}}</span>
                            <span class="money-accounts-result-tb-item-colum result-item-width10">{{item.tranAmt}}</span>
                            <span class="money-accounts-result-tb-item-colum result-item-width10">{{item.transDirection}}</span>
                            <span class="money-accounts-result-tb-item-colum result-item-width10">{{item.tranDate | formatDate}}</span>
                            <span class="money-accounts-result-tb-item-colum result-item-width10"><button class="gy-button-view" @click="look(item)">查看</button></span>
                        </div>
                    </div>
                </div>
                 <div class="totaljl">
                        共{{resultList.length}}条记录
                    </div>
                <el-pagination
                    class="pagination-box"
                    background
                    @current-change="changeSelect"
                    layout="prev, pager, next"
                    :current-page.sync="pageNo"
                    :page-size="pageSize">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="转入资金提示" :visible.sync="isShiftto">
            <div class="shifttoDia">
                <div>
                    <img class="LedgerImg" :src="Ledger.bigIcon" alt="">
                </div>
                <div class="gy-form-group single-row" v-if="Ledger.bankId === 2">
                    <span class="l">账户名称</span>
                    <div>上海国烨跨境电子商务有限公司</div>
                </div>
                <div class="gy-form-group single-row" v-else>
                    <span class="l">账户名称</span>
                    <div>{{Ledger.usrCompanyName}}</div>
                </div>
                <div class="gy-form-group single-row" v-if="Ledger.bankId === 2">
                    <span class="l">账号</span>
                    <div>15000095778492</div>
                </div>
                <div class="gy-form-group single-row" v-else>
                    <span class="l">账号</span>
                    <div>{{Ledger.bankAccount}}</div>
                </div>
                <div class="gy-form-group single-row" v-if="Ledger.bankId === 2">
                    <span class="l">开户网点</span>
                    <div>平安银行长沙分行营业部</div>
                </div>
                <div class="gy-form-group single-row" v-else>
                    <span class="l">开户网点</span>
                    <div>中信银行上海分行浦东分行世纪大道网点</div>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l tip">温馨提示：</span>
                    <p>请按显示的银行电子账户号信息进行资金转入。</p>
                    <p>如果您在资金转入过程中有什么疑问请联系我们客服。</p>
                    <p>客服电话：400-072-777.</p>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="账单详情" :visible.sync="isLook">
            <div class="shifttoDia">
                <div class="gy-form-group single-row">
                    <span class="l">交易时间:</span>
                    <div>{{lookForm.tranDate | formatDate}}</div>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l">银行名称</span>
                    <div>{{lookForm.accBnkNm}}</div>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l">交易金额</span>
                    <div>{{lookForm.tranAmt}} 元</div>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l">资金流向</span>
                    <div>{{lookForm.transDirection}}</div>
                </div>
                <!--  -->
                <div class="gy-form-group single-row">
                    <span class="l">对方账户名</span>
                    <div>{{lookForm.accountNm}}</div>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l">对方账户</span>
                    <div>{{lookForm.accountNo}}</div>
                </div>
                <!--  -->
                <div class="gy-form-group single-row">
                    <span class="l">备注</span>
                    <div>{{lookForm.memo}}</div>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l">流水号</span>
                    <div>{{lookForm.tellerNo}}</div>
                </div>
                <!--  -->
                <div class="gy-form-group single-row">
                    <span class="l">附属账号</span>
                    <div>{{lookForm.subAccNo}}</div>
                    <span>（{{lookForm.bankName}}）</span>
                </div>
                <div class="gy-form-group single-row" v-if="!lookForm.needRequest">
                    <span class="l">打印验证码</span>
                    <div>{{lookForm.verifyCode}}</div>
                </div>
                <div class="gy-form-group single-row" v-if="lookForm.needRequest">
                    <span class="l">回单号</span>
                    <div>{{lookForm.verifyCode}}</div>
                </div>
                <div class="gy-form-group single-row" v-if="lookForm.needRequest">
                    <span class="l">回单验证码</span>
                    <div>{{lookForm.checkCode}}</div>
                </div>
                <!--  -->
                <div class="gy-form-group single-row">
                    <span class="l"></span>
                    <p style="color:#999999;text-align: right;">温馨提示：即将跳转中信银行系统，请将打开的页面在IE浏览器中浏览。</p>
                </div>
                <!-- 打印 -->
                <div class="gy-form-group single-row">
                    <a v-if="!lookForm.needRequest" class="gy-button-extra gy-submit button-r" target="_brank" :href="pingandianzihuidanurl">打印电子回单</a>
                    <!-- 中信只有生产 下 -->
                    <a v-if="lookForm.needRequest" class="gy-button-extra gy-submit button-r" target="_brank" :href="pingandianzihuidanurl">打印电子回单</a>
                </div>
            </div>
        </el-dialog>
        <form method="POST" :action=export1Url id="hiddenForm1" ref="hiddenForm1">
            <input type="text" name="dsl" :value="JSON.stringify(
                {
                    'pageNo': this.pageNo,
                    'pageSize': this.pageSize,
                    'startDate': this.exportInfo.startDate,
                    'endDate': this.exportInfo.endDate,
                    'subAccNo': this.exportInfo.subAccNo,
                    'fundId': this.fundAccId,
                    'bankName': this.bankName
                })" hidden/>
        </form>
    </div>
</template>

<script>
export default {
    name: 'money-account',
    data () {
        return {
            pingandianzihuidanurl: null,
            accounts: [],
            startDate: '',
            endDate: '',
            pageNo: 1,
            pageSize: 10,
            itemTotal: 0,
            period: 7,
            selectedBank: '',
            resultList: [],
            bankAccId: null,
            fundAccId: null,
            bankName: null,
            bankId: null,
            // 查看弹出框
            isLook: false,
            // 开始Dialog
            isShiftto: false,
            // 转入Dialog
            Ledger: {},
            exportInfo: {
                subAccNo: null,
                bankName: null,
                fundId: null,
                startDate: null,
                endDate: null
            },
            lookForm: {},
            export1Url: process.env.API_ROOT_MAIN + '/trade/capital/v1/exportTransRecords',
            lastPageNo: -1
        };
    },
    methods: {
        startDateChange (v) {
            this.startDate = v;
            this.exportInfo.startDate = this.date(v);
        },
        endDateChange (v) {
            this.endDate = v;
            this.exportInfo.endDate = this.date(v);
        },
        selectVal (item) {
            this.exportInfo.bankName = item.bankName;
            this.exportInfo.subAccNo = item.bankAccount;
            this.exportInfo.fundId = item.bankId;
            this.exportInfo.startDate = this.date(this.startDate);
            this.exportInfo.endDate = this.date(this.endDate);
            this.fundAccId = item.fundAccId;
            this.bankName = item.bankName;
            this.getTransactionList();
        },
        // 查看
        look (item) {
            const me = this;
            if (item.needRequest) {
                me.$http.post(me.$api.payment.findTransRecordByReceiptNo,
                    {'usrCompanyFundId': me.exportInfo.subAccNo, 'receptNo': item.verifyCode, 'fundAccId': me.fundAccId})
                    .then(function (res) {
                        if (res.data.data.code === 0) {
                            me.lookForm = Object.assign(item);
                            me.lookForm.checkCode = res.data.data.data.checkCode;
                            me.isLook = true;
                        } else {
                            me.$message(res.data.data.message);
                        }
                    });
            } else {
                me.lookForm = Object.assign(item);
                me.isLook = true;
            }
        },
        // 导出
        exportBtn () {
            this.$refs.hiddenForm1.submit();
        },
        getAccountList () {
            // 获取资金账户信息
            const me = this;
            me.$http.post(me.$api.payment.companyAccount,
                {}
            ).then(function (response) {
                if (response.data.code === 0) {
                    me.accounts = response.data.data;
                    me.bankAccId = me.accounts[0].bankAccId;
                    me.selectedBank = me.accounts[0].bankName;
                    me.selectVal(me.accounts[0]);
                    me.getTransactionList();
                } else {
                    me.$message(response.data.message);
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        getTransactionList () {
            // 查询交易记录
            const me = this;
            // if (me.lastPageNo !== -1 && me.pageNo > me.lastPageNo) {
            //     me.pageNo = me.lastPageNo;
            //     return false;
            // }
            me.$http.post(me.$api.payment.accTrans,
                {
                    'pageNo': me.pageNo,
                    'pageSize': me.pageSize,
                    'transStartDate': me.exportInfo.startDate,
                    'transEndDate': me.exportInfo.endDate,
                    'usrCompanyFundId': me.exportInfo.subAccNo,
                    'fundAccId': me.fundAccId,
                    'bankName': me.bankName
                }
            ).then(function (response) {
                if (response.data.data.code === 0) {
                    me.resultList = response.data.data.data.list;
                } else {
                    me.resultList = [];
                    // me.lastPageNo = --me.pageNo;
                    me.$message('没有更多交易记录');
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        date (time, hour) { // 把时间戳格式:若有参返回年-月-日时:分:秒 若无参返回 年-月-日
            if (!time) {
                return '';
            }
            let y, m, d, date, h, ms, s, data, hours;
            date = new Date(time);
            y = date.getFullYear();
            m = date.getMonth() + 1;
            d = date.getDate();
            h = date.getHours();
            ms = date.getMinutes();
            s = date.getSeconds();
            data = y + '' + format(m) + '' + format(d);
            hours = format(h) + ':' + format(ms) + ':' + format(s);
            if (hour) {
                return data + ' ' + hours;
            } else {
                return data;
            }

            function format (num) {
                if (parseInt(num) < 10) {
                    num = '0' + num;
                }
                return num;
            }
        },
        // 转入
        shiftto (bankId) {
            const me = this;
            me.isShiftto = true;
            me.$http.post(me.$api.payment.recharge, {fundId: bankId})
                .then(function (res) {
                    if (res.data.code === 0) {
                        let data = res.data.data;
                        me.Ledger = Object.assign({}, data);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 转出
        roolout (bankAccId) {
            this.$router.push({name: 'rollOut', query: bankAccId});
            localStorage.setItem('bankAccId', JSON.stringify(bankAccId));
        },
        changeSelect (pageNo) {
            this.pageNo = pageNo;
            this.getTransactionList();
        },
        changeDuratoin (value) {
            if (value === 7) {
                this.startDate = new Date(+this.endDate - (+value * 24 * 60 * 60 * 1000));
                this.exportInfo.startDate = this.date(this.startDate);
            } else {
                let ed = new Date(+this.endDate);
                ed.setMonth(ed.getMonth() - +value);
                this.startDate = ed;
                this.exportInfo.startDate = this.date(ed);
            }
        }
    },
    created: function () {
        const me = this;
        this.pingandianzihuidanurl = process.env.PINGANDIANZIHUIDANURL;
        let today = new Date();
        let weekBefore = new Date(today.getTime() - (+this.period * 24 * 60 * 60 * 1000));
        this.endDate = today;
        this.startDate = weekBefore;
        me.getAccountList();
        // me.selectVal();
    }
};
</script>

<style lang="scss" scoped>
    .money-account {
        .button-r {
            float: right;
            a {
                color: #fff;
            }
        }
        background-color: #fff;
        .shifttoDia {
            // padding-top: -20px;
            .LedgerImg {
                width: 120px;
                height: 43px;
            }
        }
        .tip {
            color: #F2AC4C;
        }
        .gy-form-group {
            float: initial;
        }
        .common-padding {
            padding: 0 10px;
        }
        .money-account-tit {
            background: #fff;
            padding: 6px 10px;
        }
        .money-account-common {
            padding: 20px 16px;
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
        .date-picker {
            width: 50%;
            margin-top: 0;
            display: inline-block;
            padding-right:30px ;
        }
        .money-account-query {
            margin: 20px 0;
        }
        .money-account-query-btns {
            margin: 20px 0 10px 0;
            text-align: right;
        }
        .money-account-query-bank {
            display: inline-block;
            box-sizing: border-box;
            width: 49.5%;
            .el-select {
                width: 83%;
            }
        }
        .el-radio {
            color: #666;
        }
        .el-radio-group {
            margin-top: 20px;
        }
         .money-accounts {
            padding: 0 15px;
            box-sizing: border-box;
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
            .money-accounts-result-th-item{
                font-weight: bold;
                font-size: 12px;
            }
        }
        .money-accounts-result-tb-item {
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
            height: 40px;
            line-height: 40px;
            font-weight: bold;
        }
        .money-accounts-result-tb-item-colum {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
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
         .totaljl{
        margin-top: 20px;
        font-size: 12px;
        color: #666;
    }
    }

</style>
