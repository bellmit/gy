<template>
    <div class="createPayment">
        <div class="userCenter-main-tit">
            <div class="userCenter-main-tit-left">
                <span class="userCenter-main-tit-left-tit">付款单</span>
                <span class="userCenter-main-tit-left-no">付款单号：{{payNo}}</span>
            </div>
            <div class="userCenter-main-tit-right">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>付款申请</el-breadcrumb-item>
                    <el-breadcrumb-item class="createPayment-main-tit-right">财务付款</el-breadcrumb-item>
                    <el-breadcrumb-item>收款确认</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="createPayment-status createPayment-common clearfix">
            <div class="createPayment-status-left">
                <div>
                    <i class="el-icon-tickets"></i>
                    <span class="createPayment-status-left-tit">付款单状态</span>
                </div>
                <div class="createPayment-status-left-billStatus">
                    <step step="1" isActive="true">
                        <div style="margin-left:-15px;">等待财务付款</div>
                    </step>
                    <step step="2" isRight="true">
                        <div style="text-align: right;position: absolute;right:-10px;">付款中</div>
                    </step>
                    <step step="3" doubleLength="true" isRight="false">
                        <div
                            style="padding: 2px 20px;line-height: 15px;text-align: center;position: absolute;right: -50px;">
                            <p>已付款</p>
                            <p>等待对方确认</p>
                        </div>
                    </step>
                </div>
            </div>
            <div class="createPayment-status-right fr">
                <router-link :to="{name:'confirmOnlinePay'}" class="createPayment-status-right-submit btn-active">去支付
                </router-link>
                <router-link :to="{name:'createPayment'}" class="createPayment-status-right-submit btn">驳回</router-link>
            </div>
        </div>
        <div class="createPayment-detail createPayment-common">
            <div>
                <i class="el-icon-tickets"></i>
                <span class="createPayment-detail-tit">付款金额</span>
            </div>

            <!--可分期付款-->
            <div class="createPayment-detail-amount-box clearfix" v-if="payMethod === 1">
                <span class="fl">本次付款金额</span>
                <div class="fl createPayment-detail-amount-right">
                    <div class="createPayment-detail-amount">
                        <el-input
                            v-model="amount"
                            type="text"
                            debounce="50"
                            @input="hanldeInput"
                            placeholder="请输入金额"
                            class="createPayment-detail-amount-input">
                            <template slot="append">元</template>
                        </el-input>
                    </div>
                    <p>剩余应付金额：{{balance}}</p>
                </div>
            </div>
            <div class="createPayment-detail-content padding-left20" v-if="payMethod === 2">
                <span class="createPayment-items-subtit">本次支付保证金</span>
                <span class="createPayment-detail-content-amount">{{amount}}</span>
                <span
                    class="createPayment-detail-content-desc">（保证金比例：{{(amount/total*100).toFixed(2)}}％，{{total}} 元）</span>
            </div>
        </div>

        <div class="createPayment-seller">
            <div>
                <div>
                    <i class="el-icon-tickets"></i>
                    <span class="createPayment-seller-tit">收款账户信息</span>
                </div>
                <div class="createPayment-seller-account">
                    <div class="clearfix">
                        <div class="createPayment-seller-account-left fl clearfix">
                            <div class="padding-left20 fl">
                                <div class="createPayment-items-subtit">收款企业</div>
                                <div class="createPayment-items-subtit mg-top10">收款账号</div>
                            </div>
                            <div class="fr createPayment-seller-account-left-fr">
                                <div>{{compony}}
                                    <!--<a href="###" class="createPayment-seller-contact"><i class="iconfont icon-chat"></i>和我联系</a>--></div>
                                <div class="mg-top10">{{accountNumber}}</div>
                            </div>
                        </div>
                        <div class="padding-left20 createPayment-items-bank-box fr">
                            <span class="createPayment-items-subtit createPayment-items-bank">收款银行</span>
                            <span>{{accountName}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <i class="el-icon-tickets"></i>
                    <span class="createPayment-seller-tit">付款账户信息</span>
                </div>
                <div class="createPayment-seller-account">
                    <div class="clearfix">
                        <div class="createPayment-seller-account-left fl clearfix">
                            <div class="padding-left20 fl">
                                <div class="createPayment-items-subtit mg-top10">付款账号</div>
                            </div>
                            <div class="fr createPayment-seller-account-left-fr">
                                <div class="mg-top10">{{accountNumber}}</div>
                            </div>
                        </div>
                        <div class="padding-left20 createPayment-items-bank-box fr">
                            <span class="createPayment-items-subtit createPayment-items-bank">付款银行</span>
                            <span>{{accountName}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div class="createPayment-trade-mode mg-top40">
                    <div class="createPayment-status-left">
                        <i class="el-icon-tickets"></i>
                        <span class="createPayment-seller-tit">付款方式:</span>
                    </div>
                    <div class="createPayment-trade-mode-content">
                        <span class="createPayment-items-subtit padding-left20">付款方式</span>
                        <span class="createPayment-seller-account-left-fr createPayment-trade-mode-desc">{{paymentTerms}}</span>
                    </div>
                </div>
                <div class="createPayment-remark-box">
                    <div class="createPayment-remark">
                        <i class="el-icon-tickets"></i>
                        <span class="createPayment-items-subtit">备注</span>
                    </div>
                    <div class="createPayment-remark-content">
                        <el-input
                            type="textarea"
                            autosize
                            placeholder="该付款单金额正确，可以付款"
                            v-model="remark">
                        </el-input>
                        <el-tooltip class="createPayment-remark-content-tips" placement="right">
                            <div slot="content">历史备注1<br/>历史备注2</div>
                            <el-button>历史备注</el-button>
                        </el-tooltip>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import step from '../../components/step';

export default {
    name: 'to-pay',
    components: {step},
    data () {
        return {
            payMethod: '',
            payNo: '123456667',
            total: 3000,
            amount: 200,
            compony: '上海国烨',
            accountName: '平安银行电子账户',
            accountNumber: 31002554447745554,
            paymentTerms: '先货后款，允许分批发货后再分批付款',
            attachments: [{
                url: 'www.baidu.com',
                imgUrl: 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg',
                tit: '付款发票1'
            }, {
                url: 'www.baidu.com',
                imgUrl: 'http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg',
                tit: '付款发票2'
            }],
            remark: ''
        };
    },
    computed: {
        balance: function () {
            return this.total - this.amount;
        },
        defaultAccountName: function () {
            return this.seller.accounts[0].accountName;
        },
        defaultAccountNumber: function () {
            return this.seller.accounts[0].accountNumber;
        }
    },
    methods: {
        hanldeInput () {
            const reg = /^(0{2,}|-)/;
            const amountString = this.amount.toString();
            if (this.amount > this.total || this.amount < 0 || reg.test(amountString)) {
                this.open();
                this.amount = '';
            }
        },
        open () {
            this.$alert('输入的金额不能小于零或大于' + this.total, '金额输入错误', {
                confirmButtonText: '确定'
            });
        },
        getOrderInfo () {
            // 从订单页面的路由获取订单编号等信息
            this.payMethod = this.$route.params.payMethod;
        }
    },
    created: function () {
        this.getOrderInfo();
    }
};
</script>

<style lang="scss" scoped>
    .createPayment-common {
        padding:20px 16px 30px 30px;
    }
    .createPayment-status-left{
        position: relative;
        .el-icon-tickets{
            position: absolute;
            top: 6px;
            left: -19px;
        }
    }
    .createPayment-status {
        border-top: 1px solid #eee;
    }

    .createPayment-status-left-billStatus {
        width: 30%;
        display: flex;
        margin: 20px 0 0 20px;
        font-size: 12px;
    }

    .createPayment-status-right-submit {
        margin-right: 10px;
    }

    .createPayment-detail-amount {
        display: flex;
    }

    .createPayment-detail-amount-right {
        margin-left: 30px;
    }

    .createPayment-detail-amount-box {
        margin-top: 20px;
    }

    .createPayment-detail-amount-input {
        border: none;
        font-size: 20px;
    }

    .createPayment-seller {
        padding: 20px 20px 60px;
        width: 94%;
    }

    .createPayment-seller-account {
        margin: 20px 0;
    }

    .mg-top10 {
        margin-top: 10px;
    }

    .mg-top40 {
        margin-top: 40px;
    }

    .createPayment-items-bank {
        padding: 6px 40px;
        border-right: 1px solid #eee;
    }

    .createPayment-seller-account-left-fr {
        font-size: 12px;
        color: #666;
        margin-left: 50px;
        border-left: 1px solid #eee;
        padding-left: 14px;
    }

    .createPayment-trade-mode-content {
        margin: 10px 0;
    }

    .createPayment-trade-mode-desc {
        padding: 6px 10px;
        margin-left: 46px;
    }

    .createPayment-remark {
        margin: 30px 0 10px;
    }

    .createPayment-seller-contact {
        color: #E0370F;
        margin-left: 20px;
        opacity: 0.8;
        display: inline-flex;
        align-items: center;
        .icon-chat {
            margin: 0 6px 0 10px;
            font-size: 14px;
            color: #ef0505;
        }
    }

    .userCenter-main-tit-left-tit {
        color: #333;
        font-size: 16px;
    }

    .userCenter-main-tit-left-no {
        color: #666;
        font-size: 12px;
        margin-left: 20px;
        font-weight: normal;
    }

    .createPayment-detail {
        border-top: 7px solid #f5f5f5;
    }

    .createPayment-detail-tit,
    .createPayment-seller-tit,
    .createPayment-status-left-tit {
        color: $color-title;
        font-size: 14px;
        font-weight: bold;
    }

    .padding-left20 {
        padding-left: 20px;
    }

    .createPayment-items-subtit {
        color: #333;
        font-weight: bold;
        font-size: 12px;
    }

    .createPayment-detail-content {
        margin: 10px 0;
    }

    .createPayment-detail-content-amount {
        font-family: HelveticaNeue;
        font-size: 14px;
        color: #E0370F;
        margin-left: 14px;
        font-weight: 700;
    }

    .createPayment-detail-content-desc {
        font-size: 12px;
        color: #2A2A2A;
        line-height: 16px;
        opacity: 0.8;
    }

    .createPayment-attachment-items {
        display: flex;
    }

    .createPayment-attachment-item {
        display: flex;
        align-items: center;
        margin: 20px 0 0 20px;
    }

    .createPayment-attachment-item-img {
        width: 50px;
        height: 50px;
        margin-right: 8px;
    }

    .createPayment-attachment-item-right-name {
        color: #666;
    }

    .createPayment-attachment-item-right-look {
        color: #4A90E2;
    }

    .createPayment-remark-content {
        margin-left: 20px;
    }

    .createPayment-remark-content-tips {
        margin: 20px 0 0 -20px;
        border: none;
    }
</style>
<style lang="scss">
    .createPayment-main-tit-right {
        .el-breadcrumb__inner,
        .el-icon-arrow-right {
            color: #E0370F;
        }
    }

    .createPayment {
        .el-breadcrumb {
            font-size: 12px;
        }
    }

    .el-select-dropdown {
        left: 1361px;
    }

    .createPayment-items-bank-box {
        .el-input__inner {
            height: 30px;
            line-height: 30px;
            margin-left: 10px;
        }
        .el-select__caret {
            line-height: 30px;
        }
    }
</style>
