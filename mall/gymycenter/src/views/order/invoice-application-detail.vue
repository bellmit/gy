<template>
    <div class="add-invoice-wrapper">
        <view1 :INFO="INFO" :invoiceINFO="invoiceINFO"/>
        <div class="btn-wrapper"><button
            type="button" class="gy-button-normal" @click="$router.go(-1)">返回</button>
        </div>
        <div class="spqk-wrapper">
            <div class="title"><i style="visibility: hidden"
                class="iconfont icon-confirm"></i>审批情况
            </div>
            <div class="spqk-content">
                <div>
                    <div v-for="(item, index) in spqk" :key="index" class="spqk-item">
                        <div class="item-head">
                            <div class="icon"></div>
                            <div class="content">
                                <span>{{item.username || '--'}}</span><span
                                class="strStatus">{{resultCode[item.resultCode] || '--'}}</span>
                            </div>
                            <div class="time">{{item.createdDate | date(1)}}</div>
                        </div>
                        <div class="item-text">
                            <div class="actionDesc" :class="{'actionDesc1': item.msg}">
                                {{item.actionDesc || '--'}}
                            </div>
                            <div class="msg" v-if="item.msg">
                                {{item.msg}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import view1 from './../billingCenter/components/view.vue';
export default {
    name: 'invoice-application-detail',
    data () {
        return {
            INFO: {
                'taxInvoiceApplicationModel': {
                    'id': null,
                    'valid': null,
                    'keywords': null,
                    'createdDate': null,
                    'updatedDate': null,
                    'createdBy': null,
                    'updatedBy': null,
                    'applySn': null,
                    'orderId': null,
                    'orderSn': null,
                    'sellCompanyId': null,
                    'sellCompanyName': null,
                    'buyerCompanyId': null,
                    'buyerCompanyName': null,
                    'invoiceType': null,
                    'invoiceTypeStr': null,
                    'title': null,
                    'taxpayerno': null,
                    'bank': null,
                    'bankAccount': null,
                    'registeredAddress': null,
                    'phone': null,
                    'email': null,
                    'name': null,
                    'mobile': null,
                    'address': null,
                    'status': null,
                    'statusStr': null,
                    'remark': null,
                    'taxInvoiceApplicationDetailList': [{
                        'id': null,
                        'valid': null,
                        'keywords': null,
                        'createdDate': null,
                        'updatedDate': null,
                        'createdBy': null,
                        'updatedBy': null,
                        'taxInvoiceApplicationId': null,
                        'productName': null,
                        'productModel': null,
                        'productTaxNo': null,
                        'settlementAmount': null,
                        'remainAmount': null,
                        'invoiceAmount': null,
                        'invoiceAmountStr': null,
                        'invoicePrice': null,
                        'invoicePriceStr': null,
                        'invoiceNumber': null,
                        'invoiceNumberStr': null,
                        'realAmount': null,
                        'unit': null
                    }],
                    'invoiceCode': null,
                    'invoiceNum': null
                },
                'orderModel': {
                    'id': null,
                    'valid': null,
                    'keywords': null,
                    'createdDate': null,
                    'updatedDate': null,
                    'createdBy': null,
                    'updatedBy': null,
                    'odrOrderSn': null,
                    'orderType': null,
                    'sellerCompanyId': null,
                    'sellerCompanyName': null,
                    'buyerCompanyId': null,
                    'buyerCompanyName': null,
                    'totalAmount': null,
                    'totalAmountStr': null,
                    'deliveryType': null,
                    'deliveryTypeStr': null,
                    'orderStatus': null,
                    'orderStatusStr': null,
                    'settlementTotal': null,
                    'settlementTotalStr': null,
                    'orderItemModelList': [{
                        'id': null,
                        'odrOrderId': null,
                        'odrOfferId': null,
                        'odrOfferSn': null,
                        'odrOfferSkuQuantity': null,
                        'prdSkuId': null,
                        'skuCode': null,
                        'skuName': null,
                        'skuPictureUrl': null,
                        'skuQuantity': null,
                        'skuQuantityStr': null,
                        'skuPrice': null,
                        'infUnitOfMeasureId': null,
                        'infUnitOfMeasureDisplayName': null,
                        'skuTotalAmount': null,
                        'deliveryDateFlag': null,
                        'deliveryDateText': null,
                        'deliveryBeginDate': null,
                        'deliveryBeginDateStr': null,
                        'deliveryEndDate': null,
                        'deliveryEndDateStr': null,
                        'deliveryWarehouseId': null,
                        'deliveryWarehouseName': null,
                        'settlementPrice': null,
                        'settlementQuantity': null,
                        'deliveryDistrictId': null,
                        'deliveryDetailedAddress': null,
                        'createdBy': null,
                        'updatedBy': null,
                        'valid': null,
                        'createdDate': null,
                        'updatedDate': null,
                        'skuPriceStr': null,
                        'skuTotalAmountStr': null,
                        'skuQuantityDecimal': null,
                        'quantityIssued': null,
                        'quantityPlanned': null,
                        'productId': null,
                        'topCatalogueId': null,
                        'skuPriceType': null
                    }]
                },
                'sellerCompanyTaxModel': {
                    'id': null,
                    'valid': null,
                    'keywords': null,
                    'createdDate': null,
                    'updatedDate': null,
                    'createdBy': null,
                    'updatedBy': null,
                    'companyId': null,
                    'companyName': null,
                    'title': null,
                    'taxpayerno': null,
                    'registeredAddress': null,
                    'phone': null,
                    'bank': null,
                    'bankAccount': null,
                    'onlineInvoice': null,
                    'deviceno': null,
                    'name': null,
                    'email': null,
                    'mobile': null,
                    'address': null,
                    'appkey': null,
                    'specialInvoice': null,
                    'ordinaryInvoice': null,
                    'electronicInvoice': null,
                    'updatedDateStart': null,
                    'updatedDateEnd': null
                },
                'buyerCompanyTaxModel': {
                    'id': null,
                    'valid': null,
                    'keywords': null,
                    'createdDate': null,
                    'updatedDate': null,
                    'createdBy': null,
                    'updatedBy': null,
                    'companyId': null,
                    'companyName': null,
                    'title': null,
                    'taxpayerno': null,
                    'registeredAddress': null,
                    'phone': null,
                    'bank': null,
                    'bankAccount': null,
                    'onlineInvoice': null,
                    'deviceno': null,
                    'name': null,
                    'email': null,
                    'mobile': null,
                    'address': null,
                    'appkey': null,
                    'specialInvoice': null,
                    'ordinaryInvoice': null,
                    'electronicInvoice': null,
                    'updatedDateStart': null,
                    'updatedDateEnd': null
                }
            },
            invoiceINFO: {
                'orderInvoiceList': [
                    {
                        'id': null,
                        'status': null,
                        'type': null,
                        'invoiceUrl': '',
                        'invoiceInfoModel': {
                            'invoiceCode': '',
                            'invoiceNum': '',
                            'invoiceIssueDateStr': '',
                            'amount': '',
                            'taxAssessment': '',
                            'priceTaxSum': ''
                        }
                    }
                ],
                taxInvoiceApplicationModel: {
                    'applicationTotalAmount': null,
                    'openedTotalAmount': null,
                    'remainTotalAmount': null
                }
            },
            spqk: [
                // {
                //     username: 'username',
                //     resultCode: 3, // （0:未审批 1:审批通过 2:审批驳回）
                //     createdDate: '2019-12-12',
                //     actionDesc: '执行人员发起付款申请',
                //     msg: '倒萨的时段是哦'
                // }
            ],
            resultCode: ['未审批', '审批通过', '审批驳回', '已创建']
        };
    },
    created () {
        this.getInfoDetail();
        this.getInvoiceDetail();
        this.getApplicationList();
    },
    methods: {
        getInfoDetail () {
            this.$http.get(this.$api.invoice.invoiceListDetail + this.$route.query.id)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.INFO = res.data.data;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        getInvoiceDetail () {
            this.$http.get(this.$api.invoice.getInfoInvoice + this.$route.query.id + '/invoiceInfo')
                .then((res) => {
                    if (res.data.code === 0) {
                        this.invoiceINFO = res.data.data;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        getApplicationList () {
            this.$http.get(this.$api.invoice.applicationList + this.$route.query.id + '/approve/history/list')
                .then((res) => {
                    if (res.data.code === 0) {
                        this.spqk = res.data.data;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    },
    components: {view1}
};
</script>

<style lang="scss" scoped>
    .add-invoice-wrapper {
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
        .btn-wrapper {
            padding: 30px 16px 9px 30px;
            text-align: right;
            .gy-button-normal {
                margin-right: 10px;
            }
        }
        .spqk-wrapper {
            padding-bottom: 30px;
            .title {
            }
            .spqk-content {
                padding-top: 21px;
                .spqk-item {
                    padding-left: 58px;
                    .item-head {
                        height: 15px;
                        line-height: 15px;
                        display: flex;
                        .icon {
                            flex: 0 0 15px;
                            border: 2px solid #4a90e2;
                            border-radius: 50%;
                            margin-left: -7px;
                        }
                        .content {
                            flex: 1;
                            padding-left: 16px;
                            .strStatus {
                                color: #4a90e2;
                                padding-left: 8px;
                            }
                        }
                        .time {
                            flex: 0 0 200px;
                            text-align: right;
                            padding-right: 26px;
                        }
                    }
                    .item-text {
                        padding: 8px 0 16px 24px;
                        border-left: 1px dotted #d7d7d7;
                    }
                    /*.actionDesc1 {*/
                        /*line-height: 1;*/
                    /*}*/
                }
            }
        }
    }
    /deep/ .gy-form-group {
        min-height: 36px;
        line-height: 20px;
        padding-left: 138px;
        .l {
            width: 138px;
        }
    }
</style>
