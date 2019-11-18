<template>
    <div class="financialConfirmation my-invoice financial_add">
        <gy-contract :query="form"></gy-contract>
        <div class="title">收票信息</div>
        <div class="block-wrap clearfix">
          <div class="gy-form-group">
              <span class="l">上游公司</span>
              <span>{{ticketFinancialInformations.sellerName}}</span>
          </div>
          <div class="gy-form-group">
              <span class="l">发票月份</span>
              <span>{{ticketFinancialInformations.provideInvoiceType|invoiceMonthValue(ticketFinancialInformations)}}</span>
          </div>
          <div class="gy-form-group">
              <span class="l">产品名称</span>
              <span>{{ticketFinancialInformations.productName}}</span>
          </div>
          <div class="gy-form-group">
              <span class="l">数量(吨)</span>
              <span>{{ticketFinancialInformations.quantity|numToQuantity}}</span>
          </div>
          <div class="gy-form-group">
              <span class="l">发票总金额(元)</span>
              <span>{{ticketFinancialInformations.amount | numToCash}}</span>
          </div>
          <div class="gy-form-group">
              <span class="l">单价(元/吨)</span>
              <span v-if="ticketFinancialInformations.skuPriceType === 21 || ticketFinancialInformations.skuPriceType === 22">公式计价</span>
              <span v-else>{{ticketFinancialInformations.productUnitPrice | numToCash(true)}}</span>
          </div>
          <div class="gy-form-group">
              <span class="l">创建日期</span>
              <span>{{ticketFinancialInformations.createdDate | date(1)}}</span>
          </div>
          <div class="gy-form-group">
              <span class="l">收票凭证</span>
              <span v-if="ticketFinancialInformations.receiptInvoiceUrlList.length !== 0">
                <i class="iconfont icon-photo" @click="isShowImg(ticketFinancialInformations.receiptInvoiceUrlList)"></i>
              </span>
              <span v-else>
                <i class="iconfont icon-photo-null"></i>
              </span>
          </div>
          <div class="gy-form-group">
              <span class="l">创建人</span>
              <span>{{ticketFinancialInformations.createdName}}</span>
          </div>
          <div class="gy-form-group" style="width: 100%">
              <span class="l">采购合同</span>
              <span>
                <i v-if="ticketFinancialInformations.purchaseContractUrl && ticketFinancialInformations.purchaseContractUrl.length !== 0" class="iconfont icon-photo" @click="isShowImg(ticketFinancialInformations.purchaseContractUrl)"></i>
                <i v-else class="iconfont icon-photo-null"></i>
              </span>
          </div>
        </div>
        <div class="button-wrap">
          <button class="gy-button-normal" @click="callBack()">返回</button>
          <button v-if="ticketFinancialInformations.status === 10 && (doneFlg === '0' || doneFlg === 0)" class="gy-button-extra" @click="approvedClick(item =1)">财务确认</button>
        </div>
        <gy-operation-history ref="operationHis"></gy-operation-history>
        <!-- 预览图片 -->
        <gy-file-view ref="contFileView"></gy-file-view>
    </div>
</template>

<script>
import gyContract from '../components/contractBasic.vue';
import gyFileView from '../components/gyFileView';
import gyOperationHistory from './../../components/gyOperationHistoryComment';

export default {
    name: 'financialConfirmation',
    components: {gyContract, gyFileView, gyOperationHistory},
    data () {
        return {
            ticketFinancialInformations: {
                receiptInvoiceUrlList: []
            },
            saleOrderId: null,
            contEssId: null,
            purchaseOrderId: null,
            approvedList: {},
            basicInformationDeliveryList: [],
            skuQuantity: '',
            odrContactName: '',
            dtoParams: {},
            visible: false,
            imgLists: [],
            invoiceHistory: [],
            invoiceHistoryObj: {},
            doneFlg: null,
            sellerInfo: {},
            buyerInfo: {},
            form: {}
        };
    },
    mounted () {
        this.contEssId = this.$route.query.id;

        this.saleOrderId = this.$route.query.saleOrderId;
        this.purchaseOrderId = this.$route.query.purchaseOrderId;
        this.doneFlg = this.$route.query.doneFlg;
        this.ticketInformation();
        this.contrtactBase();
    },
    methods: {
        // 合同要素基本信息
        contrtactBase () {
            this.$http.get(this.$api.order.orderDetail + '/' + this.contEssId).then((res) => {
                if (res.data.code === 0) {
                    this.form = res.data.data;
                }
            });
        },
        isShowImg (list) {
            this.$refs.contFileView.open4MultiFile(list);
        },
        // 返回
        callBack () {
            this.$router.go(-1);
        },
        // 操作历史记录
        invoiceHistoryClick () {
            this.invoiceHistoryObj.targetId = this.ticketFinancialInformations.invoiceReceiptId;
            this.invoiceHistoryObj.targetType = 6;
            this.$refs.operationHis.display(this.$api.contract.approve1History, this.invoiceHistoryObj);
        },
        // 收票信息
        ticketInformation () {
            let that = this;
            that.$http.get(that.$api.invoice.getDetail + '/' + that.purchaseOrderId).then(function (res) {
                if (res.data.code === 0) {
                    that.ticketFinancialInformations = res.data.data;
                    that.invoiceHistoryClick();
                }
            }).catch(function (error) {
                that.$message(error);
            });
        },
        // 确认
        approvedClick (item) {
            this.approvedList.invoiceReceiptId = this.ticketFinancialInformations.invoiceReceiptId;
            this.approvedList.contEssId = this.contEssId;
            this.approvedList.todoId = this.$route.query.todoId;
            this.approvedList.allowedFunctionsId = 38;
            this.$http.post(this.$api.invoice.financialSure, this.approvedList).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    this.$router.go(-1);
                }
            });
        }
    }
};
</script>
<style scoped lang="scss">
    .financialConfirmation{
        padding-bottom: 30px;
        .title{
            font-size: 14px;
            color: #333333;
            margin: 20px 30px;
            font-weight: bold;
        }
        .padding_small{
            padding:0 16px;
        }
        .gy-table{
            white-space:pre-line;
            font-size: 12px;
            color:#666666;
        }
        .gy-table thead td, .gy-table thead th{
            font-weight: bold;
        }
    }
</style>
<style lang="scss">
    .ConfirmationImg{
        .el-dialog{
            .el-dialog__header {
                height:35px;
                line-height: 35px;
                padding:0 0 0 16px;
                border-bottom:1px solid #e6eaea;
            }
            .el-dialog__title{
                font-size: 16px;
                font-weight: bold;
                color:#333333;
            }
            .el-dialog__headerbtn{
                top:10px;
                right:16px;
            }
            .el-dialog__body{
                padding:30px;
            }
        }
    }
    .financial_add{
        .gy-form-group{
            padding:8px 30px 8px 144px;
            .l{
                width:125px;
            }
        }
    }
</style>
