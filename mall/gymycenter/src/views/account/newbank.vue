<!--<script src="../../config/api.js"></script>-->
<template>
    <div class="money-account">
        <div class="new-title-public">
            明细记录
        </div>
        <div class="money-account-common common-padding">
            <div  class="search_class3">
                <i class="iconfont icon-qianyue mewmyicon"></i>
                <span class="mewmyfont">明细记录（{{newbankname}}）</span>
            </div>
            <!--搜索-->
            <div class="search_class">
                <el-row>
                    <el-col :span="2">起止时间</el-col>
                    <el-col :span="10">
                        <div class="date-picker">
                            <el-date-picker
                                v-model="startDate"
                                type="date"
                                style="width: 47%;"
                                placeholder="开始日期"
                                @change='startDateChange'>
                            </el-date-picker>
                            <span>  至  </span>
                            <el-date-picker
                                v-model="endDate"
                                type="date"
                                style="width: 47%;"
                                @change='endDateChange'
                                placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-radio-group v-model="period" @change="changeDuratoin">
                            <el-radio :label="7">近1周</el-radio>
                            <el-radio :label="1">近1月</el-radio>
                            <el-radio :label="3">近3月</el-radio>
                            <el-radio :label="6">近半年</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
            </div>
            <div>
            </div>
            <div class="search_class2" v-show="newbankname!='中信银行电子账户'">
                <el-row>
                    <el-col :span="2">类型</el-col>
                    <el-col :span="10">
                        <el-radio-group v-model="classify">
                            <el-radio :label="0">全部</el-radio>
                            <el-radio :label="1">充值</el-radio>
                            <el-radio :label="2">交易</el-radio>
                            <el-radio :label="3">提现</el-radio>
                        </el-radio-group>
                    </el-col>
                    <el-col :span="2">
                        <i class="iconfont icon-search" @click="getTransactionList"></i>
                    </el-col>
                </el-row>
            </div>
            <div class="money-account-query clearfix">
                <div class="money-account-query-btns">
                <button class="gy-button-extra" @click="exportBtn">导出</button>
                </div>
                <table class="gy-table">
                    <thead>
                    <tr class="title">
                        <td style="width: 250px;">交易时间</td>
                        <td style="width: 120px;">类型</td>
                        <td style="width: 180px;">借/贷方发生额</td>
                        <td style="width: 350px;">对方户名</td>
                        <td style="width: 250px;">对方账户</td>
                        <td style="width: 200px;">摘要</td>
                        <td style="width: 100px;">操作</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in resultList" :key="index">
                        <td>{{item.tranDate}}</td>
                        <td>{{item.tranTypeString}}</td>
                        <td class="align-r">{{item.tranAmt}}</td>
                        <td>{{item.accountNm}}</td>
                        <td>{{item.accountNo}}</td>
                        <td>{{item.memo}}</td>
                        <td style="width: 100px;text-align: center"><div><button class="gy-button-view" @click="look(item)">查看</button></div></td>
                    </tr>
                    <tr v-if="resultList.length === 0">
                        <td colspan="8" style="text-align: center;">暂无数据...</td>
                    </tr>
                    </tbody>
                </table>
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
        <el-dialog  width="850px" title="转入资金提示" :visible.sync="isShiftto">
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
                    <p>客服电话：400-777-6777.</p>
                </div>
            </div>
        </el-dialog>
        <el-dialog class="detail-dialog-new"  width="850px" title="账单详情" :visible.sync="isLook">
            <div class="shifttoDia">
                <div class="gy-form-group single-row">
                    <span class="l list-left-span">交易时间:</span>
                    <div class="list-right-span">{{lookForm.tranDate | formatDate}}</div>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l list-left-span">银行名称</span>
                    <div class="list-right-span">{{newbankname!='中信银行电子账户'?'平安银行':'中信银行'}}</div>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l list-left-span">交易金额</span>
                    <div class="list-right-span">{{lookForm.tranAmt|numToCash}} 元</div>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l list-left-span">资金流向</span>
                    <div class="list-right-span">{{lookForm.transDirection}}</div>
                </div>
                <!--  -->
                <div class="gy-form-group single-row">
                    <span class="l list-left-span">对方账户名</span>
                    <div class="list-right-span">{{lookForm.accountNm}}</div>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l list-left-span">对方账户</span>
                    <div class="list-right-span">{{lookForm.accountNo}}</div>
                </div>
                <!--  -->
                <div class="gy-form-group single-row">
                    <span class="l list-left-span">备注</span>
                    <div class="list-right-span">{{lookForm.memo}}</div>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l list-left-span">流水号</span>
                    <div>{{lookForm.tellerNo}}</div>
                </div>
                <!--  -->
                <div class="gy-form-group single-row">
                    <span class="l list-left-span">附属账号</span>
                    <div class="list-right-span">{{lookForm.subAccNo}}</div>
                    <span class="list-right-span" v-show="lookForm.bankName">（{{lookForm.bankName}}）</span>
                </div>
                <div class="gy-form-group single-row" v-if="!lookForm.needRequest">
                    <span class="l list-left-span">打印验证码</span>
                    <div class="list-right-span">{{lookForm.verifyCode}}</div>
                </div>
                <div class="gy-form-group single-row" v-if="lookForm.needRequest">
                    <span class="l list-left-span">回单号</span>
                    <div class="list-right-span">{{lookForm.verifyCode}}</div>
                </div>
                <div class="gy-form-group single-row" v-if="lookForm.needRequest">
                    <span class="l list-left-span">回单验证码</span>
                    <div class="list-right-span">{{lookForm.checkCode}}</div>
                </div>
                <!--  -->
                <!--<div class="gy-form-group single-row">-->
                    <!--<span class="l"></span>-->
                    <!--<p style="color:#999999;text-align: right;">温馨提示：即将跳转平安银行系统，请将打开的页面在IE浏览器中浏览。</p>-->
                <!--</div>-->
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
                    'fundAccId': this.$route.query.fundAccId,
                    'fundId': this.fundAccId,
                    'bankName': this.newbankname,
                    'detailCategory': this.classify
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
            startDate: '',
            endDate: '',
            pageNo: 1,
            pageSize: 10,
            total: null,
            itemTotal: 0,
            period: 7,
            classify: 0,
            selectedBank: '',
            resultList: [],
            bankAccId: null,
            fundAccId: '',
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
            lastPageNo: -1,
            newbankname: ''
        };
    },
    methods: {
        startDateChange (v) {
            this.startDate = v;
            this.exportInfo.startDate = this.date(v);
            this.period = null;
        },
        endDateChange (v) {
            this.endDate = v;
            this.exportInfo.endDate = this.date(v);
            this.period = null;
        },
        selectVal (item) {
            console.log(item);
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
            me.$http.post(me.$api.payment.findTransRecordByReceiptNo,
                {'usrCompanyFundId': me.exportInfo.subAccNo,
                    'receptNo': item.verifyCode,
                    'fundAccId': me.fundAccId})
                .then(function (res) {
                    if (res.data.data.code === 0) {
                        me.lookForm = Object.assign(item);
                        me.lookForm.checkCode = res.data.data.data.checkCode;
                        me.isLook = true;
                    } else {
                        me.$message(res.data.data.message);
                    }
                });
        },
        // 导出
        exportBtn () {
            if (this.resultList.length === 0) {
                this.$message.error('没有可以导出的数据');
                return;
            }
            this.$refs.hiddenForm1.submit();
        },
        getTransactionList () {
            // 查询交易记录
            const me = this;
            me.$http.post(me.$api.payment.accTrans,
                {
                    'pageNo': me.pageNo,
                    'pageSize': me.pageSize,
                    'transStartDate': me.exportInfo.startDate,
                    'transEndDate': me.exportInfo.endDate,
                    'usrCompanyFundId': me.exportInfo.subAccNo,
                    'fundAccId': this.$route.query.fundAccId,
                    'bankName': me.bankName,
                    'detailCategory': me.classify
                }
            ).then(function (response) {
                // 是否是平安  true 为平安 false 为中信
                if (response.data.data.code === 0) {
                    me.resultList = response.data.data.data;
                    me.total = me.resultList.length;
                    console.log(response.data.data.data);
                } else {
                    me.resultList = [];
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
        },
        getAccountList () {
            // 获取资金账户信息
            const me = this;
            me.$http.post(me.$api.payment.companyAccount,
                {}
            ).then(function (response) {
                if (response.data.code === 0) {
                    console.log(me.exportInfo);
                    me.accounts = response.data.data;
                    me.bankAccId = me.accounts[0].bankAccId;
                    me.selectedBank = me.accounts[0].bankName;
                    for (let i = 0; i < me.accounts.length; i++) {
                        if (me.accounts[i].bankAccId === parseInt(me.$route.query.fundAccId)) {
                            me.selectVal(me.accounts[i]);
                            if (me.accounts[i].bankFlag === 1) {
                                me.newbankname = '平安银行普通电子账户';
                            } else if (me.accounts[i].bankFlag === 2) {
                                me.newbankname = '平安银行商户电子账户';
                            }
                        }
                    }
                    me.getTransactionList();
                } else {
                    me.$message(response.data.message);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    },
    created: function () {
        this.pingandianzihuidanurl = process.env.PINGANDIANZIHUIDANURL;
        console.log(this.pingandianzihuidanurl);
        let today = new Date();
        let weekBefore = new Date(today.getTime() - (+this.period * 24 * 60 * 60 * 1000));
        this.endDate = today;
        this.startDate = weekBefore;
        this.getAccountList();
        this.newbankname = sessionStorage.getItem('newBankValue');
        console.log(this.newbankname);
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
        .money-account-tit {
            background: #fff;
            padding: 6px 10px;
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
            margin-top: 0;
        }
        .money-account-query {
            margin: 20px 0;
            padding: 0 16px;
        }
        .money-account-query-btns {
            margin: 20px 0 10px 0;
            text-align: right;
        }
        .money-account-query-bank {
            width: 40%;
            .el-select {
                width: 60%;
            }
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
        .search_class{
            overflow: hidden;
            padding: 0 30px;
            .div1_class{
                float: left;
                margin-right: 60px;
                margin-top: 5px;
            }
            .div2_class{
                float: left;
                width: 432px;
            }
            .div3_class{
                float: left;
            }
            .newspan{
                font-size: 14px;
                color: #333;
                margin-right: 10px;
            }
        }
        .search_class2{
            overflow: hidden;
            margin-top: 10px;
            padding: 0 30px;
            .div1{
                float: left;
                margin-right: 10px;
                margin-top: 3px;
            }
            .div2{
                float: left;
            }
            .newspan{
                font-size: 14px;
                color: #333;
                margin-right: 10px;
            }
        }
        .search_class3{
            padding: 20px 8px;
            color: #333;
            font-weight: bold;
            font-size: 14px;
        }
    }

</style>
<style lang="scss">
    .money-account{
        .detail-dialog-new{
            .el-dialog__body{
                padding: 0;
                padding: 10px 0;
            }
        }
    }
</style>
