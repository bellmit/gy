<template>
    <div class="financialConfirmation my-invoice invoic_details">
        <gy-contract :query="form"></gy-contract>
        <div v-if="ticketInformations != null">
            <div class="title">收票信息  <span type="text" style="color:#4a90e2;cursor: pointer;" @click="buyLinkInvoice" class="linkInvoice" v-if="!noCollectTickets">查看详情</span></div>
            <div class="block-wrap clearfix" v-if="!noCollectTickets">
                <div class="gy-form-group">
                    <span class="l">上游公司</span>
                    <span>{{ticketInformations.sellerName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">发票月份</span>
                    <span>{{ticketInformations.provideInvoiceType|invoiceMonthValue(form.upstreamInfo)}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">发票总金额(元)</span>
                    <span>{{ticketInformations.amount|numToCash}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">数量(吨)</span>
                    <span>{{ticketInformations.quantity|numToQuantity}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">收票状态</span>
                    <span>{{receiptInvoiceStatusValue}}</span>
                </div>
                <div class="gy-form-group linkInvoice">
                    <span class="l">单价(元/吨)</span>
                    <span v-if="form.upstreamInfo.skuPriceType === 21 || form.upstreamInfo.skuPriceType === 22">公式计价</span>
                    <span v-else>{{ticketInformations.productUnitPrice|numToCash(true)}}</span>
                </div>
                <div class="gy-form-group" style="width: 100%">
                    <span class="l">收票凭证</span>
                    <span v-if="ticketInformations.receiptInvoiceUrlList && ticketInformations.receiptInvoiceUrlList.length !== 0" @click="showImgs(ticketInformations.receiptInvoiceUrlList)"><i class="iconfont icon-photo"></i></span>
                    <span v-else><i class="iconfont icon-photo-null"></i></span>
                </div>
            </div>
            <div v-if="noCollectTickets" class="noinvoiceStyle">还未收票，没有可显示的收票信息</div>
        </div>
        <div v-if="ticketInformationsd != null">
            <div class="title">开票信息</div>
            <div class="block-wrap clearfix" v-if="!noInvoice">
                <div class="gy-form-group">
                    <span class="l">下游公司</span>
                    <span>{{ticketInformationsd.buyerName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">发票月份</span>
                    <span>{{ticketInformationsd.provideInvoiceType|invoiceMonthValue(form.downstreamInfo)}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">数量(吨)</span>
                    <span>{{ticketInformationsd.contractNumber}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">合同金额(元)</span>
                    <span v-if="form.downstreamInfo.skuPriceType === 21 || form.downstreamInfo.skuPriceType === 22">公式计价</span>
                    <span v-else>{{ticketInformationsd.contractAmount | numToCash}}</span>
                </div>
                <div class="gy-form-group" style="width:100%">
                    <span class="l">已开票金额(元)</span>
                    <span>{{ticketInformationsd.makeOutInvoice | numToCash}}</span>
                </div>
                <div class="min-title min-titles">开票记录</div>
                <div class="min-title">
                    <el-table
                        :data="ticketInforInvoices"
                        style="width: 100%"
                        class="gy-table">
                        <el-table-column
                                label="编号"
                                fixed
                                width="80"><template slot-scope="item">{{item.row.id}}</template>
                        </el-table-column>
                        <el-table-column
                                label="状态"
                                width="100"><template slot-scope="item">{{item.row.statusDesc}}</template>
                        </el-table-column>
                        <el-table-column
                                label="本次开票金额(元)"
                                class-name="amount-right-el"
                                width="150"><template slot-scope="item">{{item.row.amount | numToCash}}</template>
                        </el-table-column>
                        <el-table-column
                                label="开票数量(吨)"
                                class-name="amount-right-el"
                                width="120"><template slot-scope="item">{{item.row.quantity| numToQuantity}}</template>
                        </el-table-column>
                        <el-table-column
                                label="企业税号"
                                width="150"><template slot-scope="item">{{item.row.buyerTaxCode}}</template>
                        </el-table-column>
                        <el-table-column
                                label="开户银行"
                                width="130">
                            <template slot-scope="item">
                                <span>{{item.row.buyerBankName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="银行账号"
                                width="250"><template slot-scope="item">{{item.row.buyerBankAccount}}</template>
                        </el-table-column>
                        <el-table-column
                                class-name="amount-right-el"
                                label="转让货权总数量(吨)"
                                width="150"><template slot-scope="item">{{item.row.deliveredProductQuantity|numToQuantity}}</template>
                        </el-table-column>
                        <el-table-column
                                label="商品税务编码"
                                width="180"><template slot-scope="item">{{item.row.productTaxCode}}</template>
                        </el-table-column>
                        <el-table-column
                                label="进项票"
                                width="160">
                                <template slot-scope="item">
                                    <span>{{item.row.receiptInvoiceAmount | entryTicket(item.row.receiptInvoiceAmount)}}</span>
                                    <span>{{item.row.receiptInvoiceStatus | entryTickets(item.row.receiptInvoiceStatus)}}</span>
                                    </template>
                        </el-table-column>
                        <el-table-column
                                label="已收进项票(元)"
                                class-name="amount-right-el"
                                width="135"><template slot-scope="item">{{item.row.receiptInvoiceAmount | numToCash}}</template>
                        </el-table-column>
                        <el-table-column
                                label="开票凭证"
                                class-name="operation-styles-el"
                                width="90">
                                <template slot-scope="item">
                                    <span v-if="item.row.invoiceVoucherList && item.row.invoiceVoucherList.length !== 0" @click="showImg(1, item.row.invoiceVoucherList)" style="padding-bottom:-2px">
                                    <i class="iconfont icon-photo"></i></span>
                                    <span v-else><i class="iconfont icon-photo-null"></i></span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                label="收款凭证"
                                class-name="operation-styles-el"
                                width="90">
                                <template slot-scope="item">
                                    <span v-if="item.row.collectionFileList && item.row.collectionFileList.length !== 0" @click="showImg(2, item.row.collectionFileList)" style="padding-bottom:-2px">
                                    <i class="iconfont icon-photo"></i></span>
                                    <span v-else><i class="iconfont icon-photo-null"></i></span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                label="销售交割凭证"
                                class-name="operation-styles-el"
                                width="135">
                                <template slot-scope="item">
                                    <span v-if="item.row.deliveredUrlList && item.row.deliveredUrlList.length !== 0" @click="showImg(3, item.row.deliveredUrlList)" style="padding-bottom:-2px">
                                    <i class="iconfont icon-photo"></i></span>
                                    <span v-else><i class="iconfont icon-photo-null"></i></span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                label="采购交割凭证"
                                class-name="operation-styles-el"
                                width="135">
                                <template slot-scope="item">
                                    <span v-if="item.row.productSettlementBillList && item.row.productSettlementBillList.length !== 0" @click="showImg(4, item.row.productSettlementBillList)" style="padding-bottom:-2px">
                                    <i class="iconfont icon-photo"></i></span>
                                    <span v-else><i class="iconfont icon-photo-null"></i></span>
                                </template>
                        </el-table-column>
                        <el-table-column
                                label="快递单号"
                                width="90"><template slot-scope="item">{{item.row.expressCode}}</template>
                        </el-table-column>
                        <el-table-column
                                label="经办人"
                                width="80"><template slot-scope="item">{{item.row.operationUserName}}</template>
                        </el-table-column>
                        <el-table-column
                                label="备注"
                                width="250"><template slot-scope="item"><div class="text-overflow">{{item.row.remark}}</div></template>
                        </el-table-column>
                        <el-table-column
                                label="创建时间"
                                width="150"><template slot-scope="item">{{item.row.createdDate | date(1)}}</template>
                        </el-table-column>
                        <el-table-column
                                class-name="operation-styles-el"
                                label="操作"
                                fixed="right"
                                width="110">
                            <template slot-scope="item">
                                <button class="gy-button-view" style="background-color: white;" @click="InvoiceCheck(item.row)">查看</button>
                                <button class="gy-button-view" style="background-color: white;"  @click="exportExcel(item.row)">下载</button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div v-if="noInvoice" class="noinvoiceStyle">还未开票，没有可显示的开票信息</div>
        </div>
        <gy-file-view ref="contFileView"></gy-file-view>
    </div>
</template>

<script>
import gyContract from '../components/contractBasic.vue';
import gyFileView from '../components/gyFileView';

export default {
    name: 'invoiceDetails',
    components: {gyContract, gyFileView},
    data () {
        return {
            id: null,
            purchaseOrderId: null,
            saleOrderId: null,
            ticketInformations: null,
            ticketInformationsd: null,
            ticketInforInvoices: [],
            fileList: {}, // 凭证list
            form: {
                downstreamInfo: {
                    skuPriceType: null
                },
                upstreamInfo: {
                    skuPriceType: null
                }
            },
            noInvoice: false, // 开票
            noCollectTickets: false, // 收票
            salesInvoiceStatusValue: '',
            receiptInvoiceStatusValue: ''
        };
    },
    created () {
        this.id = this.$route.query.id;
        this.purchaseOrderId = this.$route.query.purchaseOrderId; // 收票
        this.salesOrderId = this.$route.query.saleOrderId; // 开票
        this.salesInvoiceStatusValue = this.$route.query.salesInvoiceStatusValue; // 开票
        this.receiptInvoiceStatusValue = this.$route.query.receiptInvoiceStatusValue; // 开票
        let activeType = Number(this.$route.query.activeType);
        if (activeType === 2) {
            // 只查看收票
            this.ticketInformation();
        } else if (activeType === 3) {
            // 只查看开票
            this.ticketInfor();
        } else {
            this.ticketInformation();
            this.ticketInfor();
        }
        this.information();
    },
    methods: {
        // 基本信息
        information () {
            let that = this;
            that.$http.get(that.$api.order.orderDetail + '/' + this.id).then(function (res) {
                if (res.data.code === 0) {
                    that.form = res.data.data;
                } else {
                    that.$message(res.data.message);
                }
            }).catch(function (res) {
                that.$message(res.data.message);
            });
        },
        // 收票信息
        ticketInformation () {
            let that = this;
            that.ticketInformation = null;
            if (that.purchaseOrderId == null || that.purchaseOrderId === undefined || that.purchaseOrderId === '' || that.purchaseOrderId === 'null') {
                console.log('发票详情 采购订单ID为空 合同要素id=' + that.id);
                that.noCollectTickets = true;
                return false;
            }
            that.$http.get(that.$api.invoice.getDetail + '/' + that.purchaseOrderId).then(function (res) {
                if (res.data.code === 0) {
                    that.ticketInformations = res.data.data;
                    if (that.ticketInformations == null || that.ticketInformations === undefined) {
                        that.ticketInformations = {};
                        that.noCollectTickets = true;
                    }
                }
            }).catch(function (error) {
                that.$message(error);
            });
        },
        // 开票信息
        ticketInfor () {
            let that = this;
            that.ticketInformationsd = null;
            if (that.salesOrderId == null || that.salesOrderId === undefined || that.salesOrderId === '' || that.salesOrderId === 'null') {
                console.log('发票详情 销售订单ID为空 合同要素id=' + that.id);
                that.noInvoice = true;
                return false;
            }
            that.$http.get(that.$api.invoice.getDetails + '/' + that.salesOrderId).then(function (res) {
                if (res.data.code === 0) {
                    that.ticketInformationsd = res.data.data;
                    that.ticketInforInvoices = res.data.data.invoices;
                    if (that.ticketInformationsd == null || that.ticketInformationsd === undefined) {
                        that.ticketInformationsd = {};
                        that.noInvoice = true;
                    }
                    that.getInvoiceDeliveryCollection();
                }
            }).catch(function (error) {
                that.$message(error);
            });
        },
        // 图片预览
        showImgs (imgList) {
            this.$refs.contFileView.open4MultiFile(imgList);
        },
        showImg (type, arr) {
            switch (type) {
            case 1:
                this.fileList = arr;
                break;
            case 2:
                this.fileList = arr;
                break;
            case 3:
                this.fileList = arr;
                break;
            case 4:
                this.fileList = arr;
                break;
            default:
                this.fileList = [];
                break;
            }
            this.$refs.contFileView.open4MultiFile(this.fileList);
        },
        buyLinkInvoice () {
            this.$router.push({name: 'financialConfirmation', query: { id: this.form.id, saleOrderId: this.salesOrderId, purchaseOrderId: this.purchaseOrderId, doneFlg: 1 }});
        },
        sellLinkInvoice () {
            this.$router.push({name: 'auditOperation', query: { id: this.form.id, saleOrderId: this.salesOrderId, purchaseOrderId: this.purchaseOrderId, doneFlg: 1 }});
        },
        getInvoiceDeliveryCollection () {
            this.$http.post(this.$api.invoice.getInvoiceDeliveryCollection, {'salesOrderId': this.salesOrderId, 'purchaseOrderId': this.purchaseOrderId})
                .then((res) => {
                    if (res.data.code === 0) {
                        this.fileList = res.data.data;
                    }
                });
        },
        // 开票查看
        InvoiceCheck (item) {
            this.$router.push({name: 'auditOperation', query: {purchaseOrderId: this.$route.query.purchaseOrderId, salesOrderId: this.$route.query.salesOrderId, invoiceId: item.id, id: this.$route.query.id}});
        },
        exportExcel (item) {
            // 下载开票申请单
            let that = this;
            let params = {};
            params.contEssId = that.id;
            params.salesOrderId = that.salesOrderId;
            params.invoiceApplicationId = item.id;
            let fileName = '开票申请单-' + that.$tools.parseDate(that.ticketInformationsd.date) + '-' + that.id + '.xls';
            that.$tools.exporttoExcel(that, that.$api.invoice.exportInvoiceApplication, params, fileName);
        }
    }
};
</script>

<style scoped lang="scss">
  .title{
      font-size: 14px;
      color: #333333;
      margin: 20px 16px;
      font-weight: bold;
  }
  .min-title{
      margin: 0 16px;
  }
  .min-titles{
      margin-bottom:16px;
      font-size: 14px;
      color: #333333;
      font-weight: bold;
  }
  .linkInvoice{
    float: right;
  }
  .financialConfirmation{
      padding-bottom: 30px;
    .noinvoiceStyle{
        color:#666666;
        margin:20px 30px;
        font-size: 12px;
    }
  }
  .conStyle{
    background-color: yellow;
  }

</style>
<style lang="scss">
    .invoic_details{
        /*GYfrom padding修改*/
        .gy-form-group {
            padding: 8px 30px 8px 172px;
        }
        .l {
            width: 155px;
        }
        .icon-photo-null:before {
            line-height: 1.08;
        }
        .icon-photo:before {
            line-height: 1.08;
        }
    }
</style>
