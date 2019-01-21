<template>
    <div class="financialConfirmation my-invoice invoic_details">
        <gy-contract type='1' :query="params"></gy-contract>
        <div class="title">收票信息  <el-button type="text" @click="buyLinkInvoice" class="linkInvoice" v-if="!noCollectTickets">查看详情</el-button></div>
        <div class="block-wrap clearfix" v-if="!noCollectTickets">
            <div class="gy-form-group">
                <span class="l">上游公司</span>
                <span>{{ticketInformations.sellerName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">发票月份</span>
                <span>{{ticketInformations.provideInvoiceType|invoiceMonthValue(ticketInformations)}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">发票总金额(元)</span>
                <span>{{ticketInformations.amount|numToCash}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">数量(吨)</span>
                <span>{{ticketInformations.quantity}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">收票状态</span>
                <span>{{receiptInvoiceStatusValue}}</span>
            </div>
            <div class="gy-form-group linkInvoice">
                <span class="l">单价(含税/元)</span>
                <span>{{ticketInformations.productUnitPrice|numToCash}}</span>
            </div>
            <div class="gy-form-group" style="width: 100%">
                <span class="l">收票凭证</span>
                <span v-if="ticketInformations.receiptInvoiceUrlList && ticketInformations.receiptInvoiceUrlList.length !== 0" @click="showImg(1)"><i class="iconfont icon-photo"></i></span>
                <span v-else><i class="iconfont icon-photo-null"></i></span>
            </div>
        </div>
        <div v-if="noCollectTickets" class="noinvoiceStyle">没有可显示的收票信息</div>
        <div class="title">开票信息
            <el-button type="text" @click="exportExcel" style="margin-left:660px" v-if="!noInvoice">下载开票申请单</el-button>
            <el-button type="text" @click="sellLinkInvoice" class="linkInvoice" v-if="!noInvoice">查看详情</el-button>
        </div>
        <div class="block-wrap clearfix" v-if="!noInvoice">
            <div class="gy-form-group">
                <span class="l">下游公司</span>
                <span>{{ticketInformationsd.buyerName}}</span>
            </div>
          <div class="gy-form-group">
            <span class="l">申请日期</span>
            <span>{{ticketInformationsd.date | date}}</span>
          </div>
          <div class="gy-form-group">
            <span class="l">开票单位名称</span>
            <span>{{ticketInformationsd.buyerName}}</span>
          </div>
          <div class="gy-form-group">
            <span class="l">开票数量(吨)</span>
            <span>{{ticketInformationsd.quantity}}{{ticketInformationsd.quantityUnitName}}</span>
          </div>
          <div class="gy-form-group">
            <span class="l">税号</span>
            <span>{{ticketInformationsd.buyerTaxCode}}</span>
          </div>
          <div class="gy-form-group">
            <span class="l">开票总金额(元)</span>
            <span>{{ticketInformationsd.amount | numToCash}}</span>
          </div>
          <div class="gy-form-group">
            <span class="l">开户银行</span>
            <span>{{ticketInformationsd.buyerBankName}}</span>
          </div>
          <div class="gy-form-group">
            <span class="l">发票月份</span>
            <span>{{ticketInformationsd.provideInvoiceType|invoiceMonthValue(ticketInformationsd)}}</span>
          </div>
          <div class="gy-form-group">
            <span class="l">银行账号</span>
            <span>{{ticketInformationsd.buyerBankAccount}}</span>
          </div>
          <div class="gy-form-group">
            <span class="l">商品税务编号</span>
            <span>{{ticketInformationsd.productTaxCode}}</span>
          </div>
          <div class="gy-form-group">
            <span class="l">转让货权总数量(吨)</span>
            <span>{{ticketInformationsd.deliveredProductQuantity}}</span>
          </div>
          <div class="gy-form-group">
            <span class="l">进项票</span>
            <span>{{ticketInformationsd.receiptInvoiceStatus === 0 ? '无进项票': '有进项票'}}</span>
          </div>
          <div class="gy-form-group my-group">
            <span class="l">已收上游发票(元)</span>
            <span>{{ticketInformationsd.receiptInvoiceAmount|numToCash}}</span>
          </div>
          <div class="gy-form-group">
            <span class="l">经办人</span>
            <span>{{ticketInformationsd.operationUserName}}</span>
          </div>
          <div style="clear: both"></div>
          <div class="gy-form-group">
            <span class="l">采购交割凭证</span>
            <span v-if="fileList.purchaseDeliverys && fileList.purchaseDeliverys.length !== 0"
                  @click="showImg(4)"><i class="iconfont icon-photo"></i></span>
            <span v-else><i class="iconfont icon-photo-null"></i></span>
          </div>
          <div class="gy-form-group"  >
            <span  class="l">销售交割凭证</span>
            <span v-if="fileList.salesDeliverys && fileList.salesDeliverys.length !== 0"
                  @click="showImg(5)"><i class="iconfont icon-photo"></i></span>
            <span v-else><i class="iconfont icon-photo-null"></i></span>
          </div>
          <div class="gy-form-group">
            <span class="l">收款凭证</span>
            <span v-if="fileList.collections && fileList.collections.length !== 0" @click="showImg(2)"><i class="iconfont icon-photo"></i></span>
            <span v-else><i class="iconfont icon-photo-null"></i></span>
          </div>
          <div class="gy-form-group">
            <span  class="l">开票凭证</span>
            <span v-if="ticketInformationsd.invoiceVoucherList && ticketInformationsd.invoiceVoucherList.length !== 0" @click="showImg(3)"><i class="iconfont icon-photo"></i></span>
            <span v-else><i class="iconfont icon-photo-null"></i></span>
          </div>
            <div class="gy-form-group"  v-if="ticketInformationsd.status === 70">
                <span class="l">快递单号</span>
                <span>{{ticketInformationsd.expressCode}}</span>
            </div>
          <div class="gy-form-group">
                <span class="l">开票状态</span>
                <span>{{salesInvoiceStatusValue}}</span>
            </div>
        </div>
        <div v-if="noInvoice" class="noinvoiceStyle">没有可显示的开票信息</div>
        <dialog-img v-if="dialogVisible" @closedialogvisible="closedialogvisible" :dialogVisible="dialogVisible" :dialogImg="fileUrl"></dialog-img>
    </div>
</template>

<script>
import gyContract from '../components/contractBasic.vue';
import dialogImg from './../components/dialogImg';
export default {
    name: 'invoiceDetails',
    components: {gyContract, dialogImg},
    data () {
        return {
            test: '测试',
            id: null,
            purchaseOrderId: null,
            saleOrderId: null,
            ticketInformations: [],
            ticketInformationsd: {},
            fileList: {}, // 凭证list
            params: {
                contEssId: null
            },
            form: {
                sellerInfo: { contractCode: null },
                buyerInfo: { contractCode: null }
            },
            noInvoice: false, // 开票
            noCollectTickets: false, // 收票
            dialogVisible: false,
            fileUrl: false,
            salesInvoiceStatusValue: '',
            receiptInvoiceStatusValue: ''
        };
    },
    created () {
        this.id = this.$route.query.id;
        this.params.contEssId = this.$route.query.id;
        this.purchaseOrderId = this.$route.query.purchaseOrderId; // 收票
        this.salesOrderId = this.$route.query.salesOrderId; // 开票
        this.salesInvoiceStatusValue = this.$route.query.salesInvoiceStatusValue; // 开票
        this.receiptInvoiceStatusValue = this.$route.query.receiptInvoiceStatusValue; // 开票
        this.information();
        this.ticketInfor();
        this.ticketInformation();
    },
    methods: {
        // 基本信息
        information () {
            let that = this;
            that.$http.get(that.$api.contract.getdetail + '/' + this.id).then(function (res) {
                if (res.data.code === 0) {
                    that.form = res.data.data;
                }
            }).catch(function (res) {
                that.$message(res.data.message);
            });
        },
        // 收票信息
        ticketInformation () {
            let that = this;
            if (that.purchaseOrderId === null) {
                that.noCollectTickets = true;
            }
            if (that.purchaseOrderId !== null) {
                that.$http.get(that.$api.invoice.getDetail + '/' + that.purchaseOrderId).then(function (res) {
                    if (res.data.code === 0) {
                        if (res.data.data !== undefined) {
                            that.ticketInformations = res.data.data;
                        } else {
                            that.noCollectTickets = true;
                        }
                    }
                }).catch(function (error) {
                    that.$message(error);
                });
            }
        },
        // 开票信息
        ticketInfor () {
            let that = this;
            if (that.salesOrderId === null) {
                that.noInvoice = true;
            }
            if (that.salesOrderId !== null) {
                that.$http.get(that.$api.invoice.getDetails + '/' + that.salesOrderId).then(function (res) {
                    if (res.data.code === 0) {
                        if (res.data.data !== undefined) {
                            that.ticketInformationsd = res.data.data;
                            that.getInvoiceDeliveryCollection();
                        } else {
                            that.noInvoice = true;
                        }
                    }
                }).catch(function (error) {
                    that.$message(error);
                });
            }
        },
        // 图片预览
        showImg (type) {
            this.dialogVisible = true;
            let arr = [];
            switch (type) {
            case 1:
                this.ticketInformations.receiptInvoiceUrlList.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.fileUrl = arr;
                break;
            case 2:
                // 开票的
                this.fileList.collections.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.fileUrl = arr;
                break;
            case 3:
                // 开票凭证
                this.ticketInformationsd.invoiceVoucherList.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.fileUrl = arr;
                break;
            case 4:
                // 开票的采购交割
                this.fileList.purchaseDeliverys.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.fileUrl = arr;
                break;
            case 5:
                // 开票的销售交割
                this.fileList.salesDeliverys.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.fileUrl = arr;
                break;
            default:
                this.dialogVisible = false;
                this.fileUrl = [];
                break;
            }
        },
        closedialogvisible () {
            this.dialogVisible = false;
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
        exportExcel (item) {
            // 下载开票申请单
            let that = this;
            let params = {};
            params.paymentId = item.id;
            params.essenceId = that.list.id;
            params.purchaseOrderId = that.paymentAndCollection.purchaseOrderId;
            let fileName = '开票申请单-' + that.$tools.parseDate(that.list.createdDate) + '-' + item.id + '.xls';
            that.$tools.exporttoExcel(that, that.$api.invoice.exportInvoiceApplication, params, fileName);
        }
    }
};
</script>

<style scoped lang="scss">
  .title{
      font-size: 14px;
      color: #333333;
      margin: 20px 30px;
      font-weight: bold;
  }
  .linkInvoice{
    float: right;
  }
  .financialConfirmation{
      padding-bottom: 30px;
    .noinvoiceStyle{
        width: 100%;
        height: 70px;
        text-align: center;
        line-height: 70px;
        font-size: 18px;
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
            padding: 8px 30px 8px 162px;
        }
        .l {
            width: 122px;
        }
    }
</style>
