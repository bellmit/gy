<template>
    <div class="approve-invoice my-invoice">
        <gy-contract type='1' :query="params"></gy-contract>
        <div class="title">开票信息</div>
        <div class="block-wrap clearfix">
            <div class="gy-form-group">
                <span class="l">下游公司</span>
                <span>{{ticketAuditInformationsd.buyerName}}</span>
            </div>
            <div class="gy-form-group">
              <span class="l">申请日期</span>
              <span>{{ticketAuditInformationsd.date | date}}</span>
            </div>
            <div class="gy-form-group">
              <span class="l">开票单位名称</span>
              <span>{{ticketAuditInformationsd.buyerName}}</span>
            </div>
            <div class="gy-form-group">
              <span class="l">开票数量(吨)</span>
              <span>{{ticketAuditInformationsd.quantity}}{{ticketAuditInformationsd.quantityUnitName}}</span>
            </div>
            <div class="gy-form-group">
              <span class="l">税号</span>
              <span>{{fileList.corpTaxCode}}</span>
            </div>
            <div class="gy-form-group">
              <span class="l">开票总金额(元)</span>
              <span>{{ticketAuditInformationsd.amount | numToCash}}</span>
            </div>
            <div class="gy-form-group">
              <span class="l">开户银行</span>
              <span>{{ticketAuditInformationsd.buyerBankName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">发票月份</span>
                <span>{{ticketAuditInformationsd.provideInvoiceType|invoiceMonthValue(ticketAuditInformationsd)}}</span>
            </div>
            <div class="gy-form-group">
              <span class="l">银行账号</span>
              <span>{{ticketAuditInformationsd.buyerBankAccount}}</span>
            </div>
            <div class="gy-form-group">
              <span class="l">商品税务编号</span>
              <span>{{ticketAuditInformationsd.productTaxCode}}</span>
            </div>
          <div class="gy-form-group">
            <span class="l">转让货权总数量(吨)</span>
            <span>{{ticketAuditInformationsd.deliveredProductQuantity}}</span>
          </div>
          <div class="gy-form-group">
            <span class="l">进项票</span>
            <span>{{ticketAuditInformationsd.hasReceiptInvoice === 0 ? '无进项票': '有进项票'}}</span>
          </div>
          <div class="gy-form-group my-group">
            <span class="l">已收上游发票(元)</span>
            <span>{{ticketAuditInformationsd.receiptInvoiceAmount | numToCash}}</span>
          </div>
          <div class="gy-form-group">
            <span class="l">经办人</span>
            <span>{{ticketAuditInformationsd.operationUserName}}</span>
          </div>
          <div class="gy-form-group">
            <span class="l">收款凭证</span>
            <span v-if="fileList.collections && fileList.collections.length !== 0"
                  @click="showImg(fileList.collections)"><i class="iconfont icon-photo"></i></span>
            <span v-else><i class="iconfont icon-photo-null"></i></span>
          </div>
          <div class="gy-form-group">
            <span class="l">销售交割凭证</span>
            <span v-if="fileList.salesDeliverys && fileList.salesDeliverys.length !== 0"
                  @click="showImg(fileList.salesDeliverys)"><i class="iconfont icon-photo"></i></span>
            <span v-else><i class="iconfont icon-photo-null"></i></span>
          </div>
          <div class="gy-form-group">
            <span class="l">采购交割凭证</span>
            <span v-if="fileList.purchaseDeliverys && fileList.purchaseDeliverys.length !== 0"
                  @click="showImg(fileList.purchaseDeliverys)"><i class="iconfont icon-photo"></i></span>
            <span v-else><i class="iconfont icon-photo-null"></i></span>
          </div>
          <div class="gy-form-group"  v-if="ticketAuditInformationsd.status === 70 || ticketAuditInformationsd.status === 60">
            <span class="l">开票凭证</span>
            <span v-if="ticketAuditInformationsd.invoiceVoucherList && ticketAuditInformationsd.invoiceVoucherList.length !== 0" @click="showImg(ticketAuditInformationsd.invoiceVoucherList)"><i class="iconfont icon-photo"></i></span>
            <span v-else><i class="iconfont icon-photo-null"></i></span>
          </div>
          <div class="gy-form-group"  v-if="ticketAuditInformationsd.status === 70">
            <span class="l">快递单号</span>
            <span>{{ticketAuditInformationsd.expressCode}}</span>
          </div>

          <div class="gy-form-group" v-if="ticketAuditInformationsd.status === 60 && doneFlg === 0">
            <span class="l">快递单号</span>
            <input type="text" v-model="courierNumberObj.expressCode" placeholder="请填写快递单号">
          </div>
        </div>
        <div class="gy-form-group" style="width: 100%" v-if="ticketAuditInformationsd.status === 50 && doneFlg === 0">
            <span class="l"><i style="color: red">*</i>发票凭证</span>
            <el-upload
                    action="api"
                    list-type="picture-card"
                    :http-request="invoiceVoucherConfirm">
                <i class="el-icon-plus"></i>
            </el-upload>
        </div>
        <template v-if="isShow && doneFlg === 0">
            <div class="title">审批备注</div>
            <div class="block-wrap clearfix">
                <div class="tex-wrapper">
                    <textarea class="gy-textarea" v-model="remarks"></textarea>
                </div>
            </div>
        </template>
        <div class="button-wrap">
            <button class="gy-button-normal" @click="callBack()">返回</button>
            <template v-if="ticketAuditInformationsd.status < 50 && doneFlg === 0">
                <button class="gy-button-normal" @click="reject">驳回</button>
                <button class="gy-button-extra" @click="approvedClick(1)">确认</button>
            </template>
            <template
                    v-if="(ticketAuditInformationsd.status === 50 || ticketAuditInformationsd.status === 60) && doneFlg === 0">
                <button class="gy-button-extra" @click="approvedClick()">保存</button>
            </template>
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
        <dialog-img v-if="visible" @closedialogvisible="closedialogvisible" :dialogVisible="visible"
                    :dialogImg="erpCollectionFileModelList"></dialog-img>
    </div>
</template>
<script>
import gyContract from '../components/contractBasic.vue';
import dialogImg from './../components/dialogImg';
export default {
    components: {gyContract, dialogImg},
    data () {
        return {
            visible: false,
            ticketAuditInformationsd: {
                receiptVoucherList: [],
                invoiceVoucherUrlList: []
            },
            saleOrderId: null,
            id: null,
            purchaseOrderId: null,
            isShow: null,
            approvedList: {},
            skuQuantity: '',
            odrContactName: '',
            form: {},
            doneFlg: null,
            todoId: null,
            remarks: null,
            invoiceVoucherConfirmObj: {
                invoiceApplicationId: null,
                invoiceVoucherUrlList: []
            }, // 上传发票凭证
            courierNumberObj: {
                expressCode: null,
                invoiceApplicationId: null
            }, //  快递单号
            invoiceHistoryObj: {},
            invoiceHistory: null,
            buyerInfo: {},
            sellerInfo: {},
            erpCollectionFileModelList: [],
            fileList: {}, // 凭证list
            params: {
                contEssId: null
            }
        };
    },
    mounted () {
        this.id = this.$route.query.id;
        this.saleOrderId = this.$route.query.saleOrderId;
        this.purchaseOrderId = this.$route.query.purchaseOrderId;
        this.doneFlg = parseInt(this.$route.query.doneFlg);
        this.todoId = this.$route.query.todoId;
        this.ticketInfor();
        this.contrtactBase();
    },
    created () {
        this.params.contEssId = this.$route.query.id;
    },
    filters: {
        currBizType (type, contractType) {
            if (type === 1) {
                return '高频交易';
            }
        }
    },
    methods: {
        // 查看合同
        showImg (file) {
            this.visible = true;
            let arr = [];
            file.forEach((e) => {
                arr.push({fileUrl: e});
            });
            this.erpCollectionFileModelList = arr;
        },
        // 上传发票凭证
        invoiceVoucherConfirm (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            that.$http.post(that.$api.upload.imgUpload, formData, headers)
                .then(function (res) {
                    that.invoiceVoucherConfirmObj.invoiceVoucherUrlList.push(res.data.data);
                });
        },
        // 上传发票凭证
        uploadInvoiceClick () {
            if (this.invoiceVoucherConfirmObj.invoiceVoucherUrlList.length === 0) {
                this.$message({
                    message: '请上传发票凭证',
                    type: 'error'
                });
                return;
            }
            this.invoiceVoucherConfirmObj.invoiceApplicationId = this.ticketAuditInformationsd.invoiceApplicationId;
            this.invoiceVoucherConfirmObj.todoId = this.todoId;
            this.invoiceVoucherConfirmObj.contEssId = this.id;
            this.$http.post(this.$api.invoice.uploadInvoice, this.invoiceVoucherConfirmObj).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    this.$router.go(-1);
                }
            });
        },
        // 快递单号
        courierNumberClick () {
            if (this.courierNumberObj.expressCode === null || this.courierNumberObj.expressCode === '') {
                this.$message({
                    message: '请填写快递单号',
                    type: 'error'
                });
                return;
            }
            this.courierNumberObj.invoiceApplicationId = this.ticketAuditInformationsd.invoiceApplicationId;
            this.courierNumberObj.todoId = this.todoId;
            this.courierNumberObj.contEssId = this.id;
            this.courierNumberObj.allowedFunctionsId = 39;
            this.$http.post(this.$api.invoice.courierNumber, this.courierNumberObj).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    this.$router.go(-1);
                }
            });
        },
        // 返回
        callBack () {
            this.$router.go(-1);
        },
        // 开票信息
        ticketInfor () {
            let that = this;
            that.$http.get(that.$api.invoice.getDetails + '/' + that.saleOrderId).then(function (res) {
                if (res.data.code === 0) {
                    that.ticketAuditInformationsd = res.data.data;
                    that.init();
                    that.showClick();
                    that.invoiceHistoryClick();
                }
            }).catch(function (error) {
                that.$message(error);
            });
        },
        init () {
            let that = this;
            that.$http.post(this.$api.invoice.getInvoiceDeliveryCollection, {'salesOrderId': that.saleOrderId, 'purchaseOrderId': that.purchaseOrderId})
                .then((res) => {
                    if (res.data.code === 0) {
                        that.fileList = res.data.data;
                    }
                });
        },
        // 按钮显示
        showClick () {
            let that = this;
            let params = {
                targetId: this.ticketAuditInformationsd.invoiceApplicationId,
                targetType: 4
            };
            this.$http.post(this.$api.apprProc.hasApproveAuth, params).then(function (response) {
                if (response.data.code === 0) {
                    that.isShow = true;
                } else {
                    that.isShow = false;
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 确认
        approvedClick (item) {
        // 上传发票
            if (this.ticketAuditInformationsd.status === 50 && this.doneFlg === 0) {
                this.uploadInvoiceClick();
            } else if (this.ticketAuditInformationsd.status === 60 && this.doneFlg === 0) { // 快递单号
                this.courierNumberClick();
            } else {
                this.approvedSub(item); // 工作流
            }
        },
        approvedSub (item) {
            this.approvedList.contEssId = this.id;
            this.approvedList.approved = item;
            this.approvedList.remark = this.remarks;
            this.approvedList.invoiceApplicationId = this.ticketAuditInformationsd.invoiceApplicationId;
            this.$http.post(this.$api.invoice.approveSure, this.approvedList).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    this.$router.go(-1);
                }
            });
        },
        // 合同要素基本信息
        contrtactBase () {
            let that = this;
            this.$http.get(this.$api.contract.getdetail + '/' + this.id).then((res) => {
                if (res.data.code === 0) {
                    that.form = res.data.data;
                    that.buyerInfo = that.form.buyerInfo;
                    that.sellerInfo = that.form.sellerInfo;
                    that.skuQuantity = that.form.buyerInfo.skuQuantity;
                    that.odrContactName = that.form.buyerInfo.odrContactName;
                }
            });
        },
        reject () {
            this.$confirm('确认驳回?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.approvedSub(2);
            });
        },
        // 操作历史记录
        invoiceHistoryClick () {
            this.invoiceHistoryObj.targetId = this.ticketAuditInformationsd.invoiceApplicationId;
            this.invoiceHistoryObj.targetType = 4;
            this.$http.post(this.$api.invoice.getInvoiceHistory, this.invoiceHistoryObj).then((res) => {
                if (res.data.code === 0) {
                    this.invoiceHistory = res.data.data;
                }
            });
        },
        closedialogvisible () {
            this.visible = false;
        }
    }
};
</script>
<style lang="scss">
  .approve-invoice{
      padding-bottom: 30px;
      .title{
          font-size: 14px;
          color: #333333;
          margin: 20px 30px;
          font-weight: bold;
      }
      .gy-form-group{
          padding:8px 30px 8px 162px;
          .l{
              width:122px;
          }
      }
      .padding_small{
          padding:0 16px;
      }
      .button-wrap {
          margin-top: 20px;
      }
      .tex-wrapper {
          padding-right: 30px;
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
