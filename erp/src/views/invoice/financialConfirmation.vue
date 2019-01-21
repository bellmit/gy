<template>
    <div class="financialConfirmation my-invoice financial_add">
        <gy-contract type='1' :query="params"></gy-contract>
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
              <span>{{ticketFinancialInformations.quantity}}</span>
          </div>
          <div class="gy-form-group">
              <span class="l">发票总金额(元)</span>
              <span>{{ticketFinancialInformations.amount | numToCash}}</span>
          </div>
          <div class="gy-form-group">
              <span class="l">单价(元/吨)</span>
              <span>{{ticketFinancialInformations.productUnitPrice | numToCash}}</span>
          </div>
          <div class="gy-form-group">
              <span class="l">创建日期</span>
              <span>{{ticketFinancialInformations.createdDate | date(1)}}</span>
          </div>
          <div class="gy-form-group">
              <span class="l">收票凭证</span>
              <span v-if="ticketFinancialInformations.receiptInvoiceUrlList.length !== 0">
                <i class="iconfont icon-photo" @click="isShowImg(1)"></i>
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
                <i v-if="ticketFinancialInformations.purchaseContractUrl && ticketFinancialInformations.purchaseContractUrl.length !== 0" class="iconfont icon-photo" @click="isShowImg(2)"></i>
                <i v-else class="iconfont icon-photo-null"></i>
              </span>
          </div>
        </div>
        <div class="button-wrap">
          <button class="gy-button-normal" @click="callBack()">返回</button>
          <button v-if="ticketFinancialInformations.status === 10 && (doneFlg === '0' || doneFlg === 0)" class="gy-button-extra" @click="approvedClick(item =1)">财务确认</button>
        </div>
        <div class="title">操作流程</div>
        <div class="padding_small">
            <table class="gy-table">
                <thead>
                <tr>
                    <th>序号</th>
                    <th>操作人</th>
                    <th>操作时间</th>
                    <th>操作结果</th>
                    <th>备注</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in invoiceHistory" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{item.username}}</td>
                    <td>{{item.createdDate | date(item.createdDate)}}</td>
                    <td>{{$constant.approveType[item.resultCode]}}</td>
                    <td>{{item.msg}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <!-- 预览图片 -->
        <el-dialog class="ConfirmationImg" title="图片预览" :visible.sync="visible" width="1000px" custom-class="dialog-erp-cont">
            <el-carousel arrow="always" trigger="click" :autoplay="false">
                <el-carousel-item v-for="(item, index) in imgLists" :key="index">
                    <!--<img class="previewer-img-detail" :src="item" style="width: 100%;height: 100%">-->
                    <img v-if="$constant.imgType.indexOf(item.split('.').pop()) !== -1" :src="item" alt="" width="100%" height="auto">
                    <iframe v-if="item.split('.').pop() === 'pdf'" :src="item" frameborder="0" id="contractIframe" width="100%" style="min-height: 490px"></iframe>
                    <iframe v-if="$constant.fileType.indexOf(item.split('.').pop().toLowerCase()) !== -1" :src="'https://view.officeapps.live.com/op/view.aspx?src='+ item" frameborder='0' width="100%" style="min-height: 490px"></iframe>
                </el-carousel-item>
            </el-carousel>
        </el-dialog>
    </div>
</template>

<script>
import gyContract from '../components/contractBasic.vue';
export default {
    name: 'financialConfirmation',
    components: {gyContract},
    data () {
        return {
            ticketFinancialInformations: {
                receiptInvoiceUrlList: []
            },
            saleOrderId: null,
            id: null,
            params: {
                contEssId: null
            },
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
            buyerInfo: {}
        };
    },
    mounted () {
        this.id = this.$route.query.id;
        this.$route.query.contEssId = this.id;

        this.saleOrderId = this.$route.query.saleOrderId;
        this.purchaseOrderId = this.$route.query.purchaseOrderId;
        this.doneFlg = this.$route.query.doneFlg;
        this.ticketInformation();
        this.basicInformationDelivery();
        // this.contrtactBase();
    },
    created () {
        this.params.contEssId = this.$route.query.id;
    },
    methods: {
        isShowImg (type) {
            // 收票凭证
            if (type === 1) {
                this.imgLists = this.ticketFinancialInformations.receiptInvoiceUrlList;
            }
            // 查看采购合同
            if (type === 2) {
                this.imgLists = this.ticketFinancialInformations.purchaseContractUrl;
                console.log(this.imgLists);
            }
            this.visible = true;
        },
        // 返回
        callBack () {
            this.$router.go(-1);
        },
        // 交割采购基本信息
        basicInformationDelivery () {
            this.$http.get(this.$api.delivery.getBuyDetail + '/' + this.purchaseOrderId).then((res) => {
                if (res.data.code === 0) {
                    this.basicInformationDeliveryList = res.data.data;
                }
            });
        },
        // 操作历史记录
        invoiceHistoryClick () {
            this.invoiceHistoryObj.targetId = this.ticketFinancialInformations.invoiceReceiptId;
            this.invoiceHistoryObj.targetType = 6;
            this.$http.post(this.$api.invoice.getInvoiceHistory, this.invoiceHistoryObj).then((res) => {
                if (res.data.code === 0) {
                    this.invoiceHistory = res.data.data;
                }
            });
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
            this.approvedList.contEssId = this.$route.query.id;
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
        // },
        // // 合同要素基本信息
        // contrtactBase () {
        //     this.$http.get(this.$api.contract.getdetail + '/' + this.id).then((res) => {
        //         if (res.data.code === 0) {
        //             this.form = res.data.data;
        //             this.skuQuantity = this.form.buyerInfo.skuQuantity;
        //             this.odrContactName = this.form.buyerInfo.odrContactName;
        //             this.buyerInfo = this.form.buyerInfo;
        //             this.sellerInfo = this.form.sellerInfo;
        //         }
        //     });
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
            padding:8px 30px 8px 134px;
            .l{
                width:100px;
            }
        }
    }
</style>
