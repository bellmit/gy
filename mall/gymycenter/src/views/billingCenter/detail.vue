<template>
    <div class="invoice-detail-wrapper">
        <view1 :INFO="INFO" :invoiceINFO="invoiceINFO" />
        <div class="fpkjjl-wrapper">
            <div class="title"><i
                class="iconfont icon-shoukuanyujiaoge"></i>发票开具记录
            </div>
            <div class="fpkjjl-content clear">
                <table class="gy-table">
                    <thead>
                    <tr>
                        <th>发票代码</th>
                        <th>发票号码</th>
                        <th>开票日期</th>
                        <th>合计金额(元)</th>
                        <th>合计税额(元)</th>
                        <th>价税合计(元)</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="invoiceINFO.orderInvoiceList && invoiceINFO.orderInvoiceList.length === 0">
                        <td class="align-c" colspan="8">暂无数据...</td>
                    </tr>
                    <tr v-else v-for="(item, index) in invoiceINFO.orderInvoiceList" :key="index">
                        <td>{{item.invoiceInfoModel.invoiceCode}}</td>
                        <td>{{item.invoiceInfoModel.invoiceNum}}</td>
                        <td>{{item.invoiceInfoModel.invoiceIssueDateStr}}</td>
                        <td class="align-r">{{item.invoiceInfoModel.amount | numToCash}}</td>
                        <td class="align-r">{{item.invoiceInfoModel.taxAssessment | numToCash}}</td>
                        <td class="align-r">{{item.invoiceInfoModel.priceTaxSum | numToCash}}</td>
                        <td>{{status[item.status]}}</td>
                        <td><span class="gy-button-view" @click="loockInvoice(item.id)">查看</span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="kpqk-wrapper">
            <div class="kpqk-item">
                <div class="l">本次申请开票:</div>
                <div class="c">{{invoiceINFO.taxInvoiceApplicationModel.applicationTotalAmount | numToCash}}元</div>
            </div>
            <div class="kpqk-item">
                <div class="l">已开具发票:</div>
                <div class="c">{{invoiceINFO.taxInvoiceApplicationModel.openedTotalAmount | numToCash}}元</div>
            </div>
            <div class="kpqk-item">
                <div class="l">待开具发票:</div>
                <div class="c">{{invoiceINFO.taxInvoiceApplicationModel.remainTotalAmount | numToCash}}元</div>
            </div>
        </div>
        <div class="btn-wrapper"><button
            type="button" class="gy-button-normal" @click="goBack(-1)">返回</button><button
            type="button" class="gy-button-extra" v-if="INFO.taxInvoiceApplicationModel.status === 2" @click="addInvoice">开票</button>
        </div>
        <invoice-detail ref="invoice"></invoice-detail>
        <invoice-provide ref="invoiceProvide"></invoice-provide>
        <div id="baiwang" style="display: none"></div>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogVisibleImage" alt="">
        </el-dialog>
        <el-dialog width="540px" title="提示" :visible.sync="baiwangLink">
            <div class="baiwang-download-link-content">
                <div class="baiwang-download-link-item1"><i
                    class="iconfont icon-message-warning"></i><span v-html="links[1]"></span>
                </div>
                <div class="baiwang-download-link-item2" v-html="links[2]"></div>
                <div class="baiwang-btn-wrapper"><button type="button" class="gy-button-normal" @click="baiwangLink = false">关闭</button></div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import view1 from './components/view.vue';
import invoiceDetail from './../order/components/invoice-detail';
import invoiceProvide from './../order/components/invoice-provide';

export default {
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
            dialogVisible: false,
            dialogVisibleImage: '',
            src: '',
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
            status: ['未查验', '已查验', '拒绝', '查验失败'],
            baiwangLink: false,
            links: []
        };
    },
    created () {
        this.getInfoDetail();
        this.getInvoiceDetail();
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
        showReceipt (item) {
            if ((item.indexOf('.pdf') === -1)) {
                this.dialogVisibleImage = item;
                this.dialogVisible = true;
            } else {
                window.open(item, '_blank');
            }
        },
        loockInvoice (id) {
            this.$refs.invoice.init(id);
        },
        goBack (step) {
            this.$router.go(step);
        },
        addInvoice () {
            if (!window.getLodop()) {
                if (document.getElementById('baiwang').innerHTML) {
                    this.links = document.getElementById('baiwang').innerHTML.split('<br>');
                    this.baiwangLink = true;
                }
            } else {
                this.$refs.invoiceProvide.init(this.$route.query.id);
            }
        }
    },
    components: {view1, invoiceDetail, invoiceProvide}
};
</script>

<style lang="scss" scoped>
    .invoice-detail-wrapper {
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
        .fpkjjl-wrapper {
            padding-top: 6px;
            .title {
            }
            .fpkjjl-content {
                padding: 0 16px 30px 16px;
            }
        }
        .kpqk-wrapper {
            .kpqk-item {
                display: flex;
                padding-bottom: 10px;
                line-height: 1;
                text-align: right;
                color: #333;
                .l{
                    flex: 1;
                }
                .c{
                    flex: 0 0 140px;
                    padding-right: 32px;
                }
            }
        }
        .btn-wrapper {
            padding: 22px 32px 9px 0;
            text-align: right;
            .gy-button-normal {
                margin-right: 10px;
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
