<template>
<div>
    <div class="new-title-public">开票申请详情</div>
    <div class="jcxx-wrapper">
        <div class="title"><i
            class="iconfont icon-dingdanxinxi"></i>基础信息
        </div>
        <div class="jcxx-content clear">
            <div class="gy-form-group">
                <div class="l">订单编号</div>
                <div>{{INFO.taxInvoiceApplicationModel.orderSn}}</div>
            </div>
            <div class="gy-form-group">
                <div class="l">客户名称</div>
                <div>{{INFO.taxInvoiceApplicationModel.buyerCompanyName}}</div>
            </div>
            <div class="gy-form-group">
                <div class="l">发票类型</div>
                <div>
                    {{$tools.invoiceType[INFO.taxInvoiceApplicationModel.invoiceType]}}
                </div>
            </div>
        </div>
    </div>
    <div class="mfxx-wrapper">
        <div class="title"><i
            class="iconfont icon-maijia"></i>卖方信息
        </div>
        <div class="mfxx-content clear">
            <div class="gy-form-group">
                <div class="l">发票抬头</div>
                <div>
                    {{INFO.sellerCompanyTaxModel.title}}
                </div>
            </div>
            <div class="gy-form-group">
                <div class="l">纳税人识别号</div>
                <div>
                    {{INFO.sellerCompanyTaxModel.taxpayerno}}
                </div>
            </div>
            <template v-if="INFO.taxInvoiceApplicationModel.invoiceType === '01'">
                <div class="gy-form-group">
                    <div class="l">开户银行</div>
                    <div>
                        {{INFO.sellerCompanyTaxModel.bank}}
                    </div>
                </div>
                <div class="gy-form-group">
                    <div class="l">开户银行账户</div>
                    <div>
                        {{INFO.sellerCompanyTaxModel.bankAccount}}
                    </div>
                </div>
                <div class="gy-form-group">
                    <div class="l">注册电话</div>
                    <div>
                        {{INFO.sellerCompanyTaxModel.phone}}
                    </div>
                </div>
                <div class="gy-form-group">
                    <div class="l">注册地址</div>
                    <div>
                        {{INFO.sellerCompanyTaxModel.registeredAddress}}
                    </div>
                </div>
            </template>
        </div>
    </div>
    <div class="mfxx1-wrapper">
        <div class="title"><i
            class="iconfont icon-maijia1"></i>买方信息
        </div>
        <div class="mfxx1-content clear">
            <div class="gy-form-group">
                <div class="l">发票抬头</div>
                <div>
                    {{INFO.taxInvoiceApplicationModel.title}}
                </div>
            </div>
            <div class="gy-form-group">
                <div class="l">纳税人识别号</div>
                <div>
                    {{INFO.taxInvoiceApplicationModel.taxpayerno}}
                </div>
            </div>
            <template v-if="INFO.taxInvoiceApplicationModel.invoiceType === '01'">
                <div class="gy-form-group">
                    <div class="l">开户银行</div>
                    <div>
                        {{INFO.taxInvoiceApplicationModel.bank}}
                    </div>
                </div>
                <div class="gy-form-group">
                    <div class="l">开户银行账户</div>
                    <div>
                        {{INFO.taxInvoiceApplicationModel.bankAccount}}
                    </div>
                </div>
                <div class="gy-form-group">
                    <div class="l">注册电话</div>
                    <div>
                        {{INFO.taxInvoiceApplicationModel.phone}}
                    </div>
                </div>
                <div class="gy-form-group">
                    <div class="l">注册地址</div>
                    <div>
                        {{INFO.taxInvoiceApplicationModel.registeredAddress}}
                    </div>
                </div>
            </template>
            <template v-if="INFO.taxInvoiceApplicationModel.invoiceType === '04' || INFO.taxInvoiceApplicationModel.invoiceType === '01'">
                <div class="gy-form-group">
                    <div class="l">收票人</div>
                    <div>
                        {{INFO.taxInvoiceApplicationModel.name}}
                    </div>
                </div>
                <div class="gy-form-group">
                    <div class="l">收票人电话</div>
                    <div>
                        {{INFO.taxInvoiceApplicationModel.mobile}}
                    </div>
                </div>
                <div class="gy-form-group">
                    <div class="l">收票地址</div>
                    <div>
                        {{INFO.taxInvoiceApplicationModel.address}}
                    </div>
                </div>
            </template>
            <template v-if="INFO.taxInvoiceApplicationModel.invoiceType === '10'">
                <div class="gy-form-group">
                    <div class="l">收票人邮箱</div>
                    <div>
                        {{INFO.taxInvoiceApplicationModel.email}}
                    </div>
                </div>
            </template>
        </div>
    </div>
    <div class="ddxx-wrapper">
        <div class="title"><i
            class="iconfont icon-info"></i>订单信息
        </div>
        <div class="ddxx-content clear">
            <table class="gy-table">
                <thead>
                <tr>
                    <th>商品名称</th>
                    <th>买方公司</th>
                    <th>总金额(元)</th>
                    <th>交付方式</th>
                    <th>创建时间</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-if="INFO.orderModel.orderItemModelList && INFO.orderModel.orderItemModelList.length > 0"
                    v-for="item in INFO.orderModel.orderItemModelList" :key="item.id">
                    <td>{{item.skuName || '--'}}</td>
                    <td>{{INFO.orderModel.buyerCompanyName || '--'}}</td>
                    <td class="align-r">{{INFO.orderModel.totalAmountStr || '--'}}</td>
                    <td>{{INFO.orderModel.deliveryTypeStr || '--'}}</td>
                    <td>{{INFO.orderModel.createdDate | date(1)}}</td>
                    <td>{{INFO.orderModel.orderStatusStr || '--'}}</td>
                    <td class="align-c"><span class="gy-button-view" @click="goPage(item)">查看</span></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="fpmx-wrapper">
        <div class="title"><i
            class="iconfont icon-copy"></i>发票明细
        </div>
        <div class="fpmx-content clear">
            <table class="gy-table">
                <thead>
                <tr>
                    <th>商品名称</th>
                    <th>商品税务编码</th>
                    <th>单价(元)</th>
                    <th>数量(吨)</th>
                    <th>已申请开票总额(元)</th>
                    <th>已开票金额(元)</th>
                    <th><span class="light">*</span>开票单价(元/吨)</th>
                    <th><span class="light">*</span>本次开票数量(吨)</th>
                    <th><span class="light">*</span>本次开票金额(元)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{{INFO.orderModel.orderItemModelList[0].skuName}}</td>
                    <td>{{INFO.taxInvoiceApplicationModel.taxInvoiceApplicationDetailList[0].productTaxNo}}</td>
                    <td class="align-r">{{INFO.orderModel.orderItemModelList[0].skuPrice | numToCash}}</td>
                    <td class="align-r">{{INFO.orderModel.orderItemModelList[0].skuQuantity | numToCash(3)}}</td>
                    <td class="align-r">{{INFO.taxInvoiceApplicationModel.taxInvoiceApplicationDetailList[0].realAmount | numToCash}}</td>
                    <td class="align-r">{{invoiceINFO.taxInvoiceApplicationModel.openedTotalAmount | numToCash}}</td>
                    <td class="align-r">{{INFO.taxInvoiceApplicationModel.taxInvoiceApplicationDetailList[0].invoicePriceStr}}</td>
                    <td class="align-r">{{INFO.taxInvoiceApplicationModel.taxInvoiceApplicationDetailList[0].invoiceNumberStr}}</td>
                    <td class="align-r">{{INFO.taxInvoiceApplicationModel.taxInvoiceApplicationDetailList[0].invoiceAmountStr}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="bz-wrapper">
        <div class="title"><i
            class="iconfont icon-confirm"></i>备注
        </div>
        <div class="bz-content clear">
            {{INFO.taxInvoiceApplicationModel.remark || '--'}}
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        INFO: Object,
        invoiceINFO: Object
    },
    methods: {
        goPage () {
            let data = this.INFO.orderModel;
            let name = data.orderStatus > 2 && data.orderStatus !== 5 ? 'sellerSettle' : 'salesDetail';
            const {href} = this.$router.resolve({name: name, query: {orderId: data.id, showBillIcon: data.showBillIcon}});
            window.open(href, '_blank');
        }
    }
};
</script>

<style lang="scss" scoped>
    .title {
        padding: 15px 0 9px 8px;
        line-height: 1;
        color: #333;
        font-weight: 700;
        .iconfont {
            color: #909399;
            font-weight: 100;
            margin-right: 8px;
        }
    }
    .clear {
        clear: both;
        &:after {
            content: ' ';
            clear: both;
            display: block;
        }
    }
    .jcxx-wrapper {
        .title{
        }
        .jcxx-content {
            padding-bottom: 6px;
        }
    }
    .mfxx-wrapper {
        .title {
        }
        .mfxx-content {
            padding-bottom: 6px;
        }
    }
    .mfxx1-wrapper {
        .title {
        }
        .mfxx1-content {
            padding-bottom: 6px;
        }
    }
    .ddxx-wrapper {
        .title {
        }
        .ddxx-content {
            padding: 0 16px 6px 16px;
        }
    }
    .fpmx-wrapper {
        .title {
        }
        .fpmx-content {
            padding: 0 16px 6px 16px;
        }
    }
    .bz-wrapper {
        .title {
        }
        .bz-content {
            padding: 16px 16px 0 16px;
        }
    }
    .light {
        color: #E0370F;
    }
</style>
