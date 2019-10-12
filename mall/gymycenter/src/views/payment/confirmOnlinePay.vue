<template>
    <div class="userCenter-main createPayment">
        <div class="userCenter-main-tit">
            <div class="userCenter-main-tit-left">
                <span class="userCenter-main-tit-left-tit">支付确认</span>
            </div>
        </div>
        <div class="createPayment-seller">
            <div>
                <div>
                    <i class="el-icon-tickets"></i>
                    <span class="createPayment-seller-tit">支付信息</span>
                </div>
                <div class="createPayment-seller-account">
                    <div class="clearfix">
                        <div class="createPayment-seller-account-left fl clearfix">
                            <div class="padding-left20 fl">
                                <div class="createPayment-items-subtit">付款金额</div>
                                <div class="createPayment-items-subtit mg-top10">付款银行</div>
                                <div class="createPayment-items-subtit mg-top10">账户余额</div>
                            </div>
                            <div class="fr createPayment-seller-account-left-fr">
                                <div>{{amount}}</div>
                                <div class="mg-top10">{{bank}}</div>
                                <div class="mg-top10">{{balance}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="confirm-online-btn-box">
                <button class="createPayment-status-right-submit btn-active">支付</button>
                <button class="createPayment-status-right-submit btn">转入</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'confirm-pay',
    data () {
        return {
            amount: '20,000.00',
            compony: '上海国烨',
            bank: '平安银行',
            balance: 66666
        };
    }
};
</script>

<style lang="scss" scoped>
    .confirm-online-btn-box {
        padding-left: 130px;
    }

    .createPayment-common {
        padding:20px 16px 30px 30px;
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
