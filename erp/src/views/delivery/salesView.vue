<template>
    <div class="my-dalesView">
        <gy-contract type='0' :query="this.$route.query"></gy-contract>
        <div class="title">
            <span>销售交割信息</span>
            <span style="font-weight: 100;float: right;color: #4a90e2;font-size: 14px;cursor: pointer" @click="salesDetailClick">查看收款详情></span>
        </div>
        <div class="block-wrap clearfix">
            <div class="gy-form-group">
                <span class="l">交割库</span>
                <span>{{saleList.deliveryWarehouseName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">交割库地址</span>
                <span>{{saleList.deliveryDetailedAddress}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">下游公司名称</span>
                <span>{{saleList.buyerCompanyName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">数量(吨)</span>
                <span>{{saleList.skuQuantity}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">已交割数量(吨)</span>
                <span>{{saleList.alreadyDeliveryQuantity}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">待交割数量(吨)</span>
                <span>{{saleList.surplusDeliveryQuantity}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">免仓期</span>
                <span>{{saleList.warehouseFreeDays}}天</span>
            </div>
            <div class="gy-form-group">
                <span class="l">计划交割日</span>
                <span>{{saleList.planDeliveryDate}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">本次交割数量(吨)</span>
                <span>{{saleList.deliveryQuantity}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">交割日</span>
                <span>{{saleList.deliveryDate | date}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">交叉交割</span>
                <span>{{saleList.acrossDelivery | acrossDelivery}}</span>
            </div>
            <div class="gy-form-group form_height">
                <span class="l">货权单凭证</span>
                <i v-if="this.saleList.erpGoodFileModelList && this.saleList.erpGoodFileModelList.length !== 0" class="iconfont icon-photo" @click="openDidalog(0)"></i>
                <i v-else class="iconfont icon-photo-null"></i>
            </div>
            <div class="gy-form-group" v-if="saleList.acrossDelivery==1">
                <span class="l">交叉采购合同</span>
                <i v-if="this.saleList.erpFileContractModelList && this.saleList.erpFileContractModelList.length !== 0" class="iconfont icon-photo" @click="openDidalog(1)"></i>
                <i v-else class="iconfont icon-photo-null"></i>
            </div>
            <div class="gy-form-group form_height" v-if="saleList.deliveryStatus === 3">
                <span class="l">交割凭证</span>
                <i v-if="this.saleList.erpDeliveryFileModelList && this.saleList.erpDeliveryFileModelList.length !== 0" class="iconfont icon-photo" @click="openDidalog(2)"></i>
                <i v-else class="iconfont icon-photo-null"></i>
            </div>
            <div class="gy-form-group" v-gy-auth="'to_upload_dlvy_voucher'" v-if="saleList.deliveryStatus === 1">
                <span class="l">上传交割凭证</span>
                <el-upload
                        action="api"
                        list-type="picture-card"
                        :on-remove="beforeRemove"
                        :http-request="receiptDelivery">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
            <div class="gy-form-group" v-if="saleList.acrossDelivery==1">
                <span class="l">交叉采购合同号</span>
                <span>{{saleList.acrossContractNo}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">创建时间</span>
                <span>{{saleList.createdDate | date(1)}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">状态</span>
                <span>{{saleList.deliveryStatus | sellDeliveryItemState}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">创建人</span>
                <span>{{saleList.createdName}}</span>
            </div>
        </div>
        <!--<div class="essential-information" v-if="saleList.deliveryStatus === 0 && this.isAuth === 0">-->
        <!--<p class="paydetail-title">审批备注</p>-->
        <!--<div class="essential-wrapper">-->
        <!--<div class="essential-row">-->
        <!--<div class="essential-item">-->
        <!--<div class="essential-text">-->
        <!--<textarea name="" class="gy-textarea" v-model="remarks" placeholder="请填写审批备注" id="" cols="30"-->
        <!--rows="10"></textarea>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!-- 预览图片 -->
        <el-dialog title="图片预览" :visible.sync="visible" width="1000px" custom-class="dialog-erp-cont">
            <el-carousel arrow="always" trigger="click" :autoplay="false">
                <el-carousel-item v-for="(item, index) in imgList" :key="index">
                    <!--<img class="previewer-img-detail" :src="item.fileUrl" style="width: 100%;height: 100%">-->
                    <img v-if="$constant.imgType.indexOf(item.fileUrl.split('.').pop().toLowerCase()) !== -1" :src="item.fileUrl" alt="" width="100%" height="auto">
                    <iframe v-if="item.fileUrl.split('.').pop().toLowerCase() === 'pdf'" :src="item.fileUrl" frameborder="0" id="contractIframe" width="100%" style="min-height: 490px"></iframe>
                    <iframe v-if="$constant.fileType.indexOf(item.fileUrl.split('.').pop().toLowerCase()) !== -1" :src="'https://view.officeapps.live.com/op/view.aspx?src='+ item.fileUrl" frameborder='0' width="100%" style="min-height: 490px"></iframe>
                </el-carousel-item>
            </el-carousel>
        </el-dialog>
        <div class="button-wrap">
              <button class="gy-button-normal" @click="$router.back(-1)">返回</button>
              <!--<button class="gy-button-normal" v-if="this.saleList.deliveryStatus === 0 && this.isAuth === 0" @click="reject">驳回</button>-->
              <!--<button class="gy-button-extra" v-if="this.saleList.deliveryStatus === 0 && this.isAuth === 0" @click="salesConfirmations(type =1)">通过</button>-->
              <button class="gy-button-extra" v-gy-auth="'to_upload_dlvy_voucher'" v-if="saleList.deliveryStatus === 1" @click="subUploadDeliveryFile">保存</button>
              <button class="gy-button-extra" v-gy-auth="'to_upload_dlvy_voucher'" v-if="saleList.deliveryStatus === 1" @click="rejUploadDeliveryFile">驳回</button>
        </div>
        <div v-if="erpDeliveryHistoryModelList && erpDeliveryHistoryModelList !== 0">
            <div class="title">
                操作流程
            </div>
            <div class="deliver_padding_small">
                <table class="gy-table">
                    <thead>
                    <tr>
                        <td>序号</td>
                        <td>操作人</td>
                        <td>操作时间</td>
                        <td>操作结果</td>
                        <td>备注</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in erpDeliveryHistoryModelList" :key="index">
                        <td>{{index+1}}</td>
                        <td>{{item.username}}</td>
                        <td>{{item.createdDate | date(1)}}</td>
                        <td>{{$constant.approveType[item.resultCode]}}</td>
                        <td>{{item.msg}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import gyContract from '../components/contractBasic.vue';
export default {
    name: 'salesView',
    components: {gyContract},
    data () {
        return {
            icon: require('@/assets/images/icon-default.png'),
            visible: false,
            remarks: null,
            saleList: {},
            erpDeliveryHistoryModelList: [],
            confirmSellDelivery: {},
            id: null,
            // 获取单凭证
            voucherList: [],
            // 合同凭证
            compact: [],
            imgList: [],
            isAuth: null,
            newReceiptsList: []
        };
    },
    mounted () {
        this.detailsOfSalesDelivery();
        this.id = this.$route.query.contEssId;
    },
    methods: {
        beforeRemove (file, fileList) {
            console.log(file + fileList);
        },
        // 上传交割凭证
        receiptDelivery (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            that.$http.post(that.$api.upload.imgUpload, formData, headers)
                .then(function (res) {
                    that.newReceiptsList.push({
                        fileUrl: res.data.data
                    });
                });
        },
        salesDetailClick () {
            this.$router.push({name: 'paymentDetail', query: {id: this.$route.query.contEssId, sellerOrderId: this.saleList.saleOrderId, purchaseOrderId: this.saleList.purchaseOrderId}});
        },
        detailsOfSalesDelivery () {
            this.$http.get(this.$api.delivery.detailsOfSalesDeliveryDetails + this.$route.query.dlvItemId).then((res) => {
                if (res.data.code === 0) {
                    this.saleList = res.data.data;
                    this.salesViewHistory(this.saleList.deliveryItemId);
                    this.init();
                }
            });
        },
        init () {
            let params = {
                targetId: this.saleList.deliveryItemId,
                targetType: 8
            };
            this.$http.post(this.$api.apprProc.hasApproveAuth, params).then(res => {
                if (res.data.code === 0) {
                    this.isAuth = 0;
                    return;
                }
                this.isAuth = 1;
            });
        },
        // 工作流程
        salesViewHistory (item) {
            let params = {};
            params.targetId = item;
            params.targetType = 8;
            this.$http.post(this.$api.contract.approve1History, params).then((res) => {
                if (res.data.code === 0) {
                    this.erpDeliveryHistoryModelList = res.data.data;
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 预览图片
        // 0 货权单凭证 1 采购合同 2 交割凭证
        openDidalog (type) {
            if (type === 0) {
                this.imgList = this.saleList.erpGoodFileModelList;
            } else if (type === 1) {
                this.imgList = this.saleList.erpFileContractModelList;
            } else if (type === 2) {
                this.imgList = this.saleList.erpDeliveryFileModelList;
            }
            this.visible = true;
        },
        // type 1 通过 2拒绝
        salesConfirmations (type) {
            this.confirmSellDelivery.passFlag = type;
            this.confirmSellDelivery.deliveryItemId = this.$route.query.dlvItemId;
            this.confirmSellDelivery.remark = this.remarks;
            this.confirmSellDelivery.allowedFunctionsId = 35;
            this.$http.post(this.$api.delivery.salesConfirmation, this.confirmSellDelivery).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'warning'
                    });
                    this.$router.push({name: 'home'});
                }
            });
        },
        reject () {
            this.$confirm('确认驳回?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.salesConfirmations(2);
            });
        },
        subUploadDeliveryFile () {
            let that = this;
            if (this.newReceiptsList.length === 0) {
                this.$message({
                    message: '请先上传凭证',
                    type: 'warning'
                });
                return;
            }
            let params = {
                'passFlag': 1,
                'todoId': this.$route.query.todoId,
                'deliveryItemId': this.$route.query.dlvItemId,
                'erpDeliveryFileModelList': this.newReceiptsList,
                'allowedFunctionsId': 35
            };
            this.$http.post(this.$api.delivery.uploadDeliveryFile, params).then(response => {
                if (response.data.code === 0) {
                    that.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    that.$router.go(-1);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        rejUploadDeliveryFile () {
            let that = this;
            let params = {
                'passFlag': 2,
                'todoId': this.$route.query.todoId,
                'deliveryItemId': this.$route.query.dlvItemId,
                'erpDeliveryFileModelList': this.newReceiptsList,
                'allowedFunctionsId': 35
            };
            this.$http.post(this.$api.delivery.uploadDeliveryFile, params).then(response => {
                if (response.data.code === 0) {
                    that.$message({
                        message: '驳回成功',
                        type: 'success'
                    });
                    that.$router.go(-1);
                }
            }).catch((e) => {
                console.log(e);
            });
        }
    }
};
</script>
<style lang="scss" scoped>
  .my-dalesView {
      padding-bottom: 30px;
      .deliver_padding{
          padding-left:30px;
      }
      .deliver_padding_small{
          padding:0 16px;
      }
      .title{
          font-size: 14px;
          color: #333333;
          margin: 20px 30px;
          font-weight: bold;
      }
      .gy-table{
          font-size: 12px;
          color:#666666;
      }
      .gy-table thead{
          font-weight: bold;
      }
  }
</style>
<style lang="scss">
    .my-dalesView {
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
        /*GYfrom padding修改*/
        .gy-form-group{
            padding:8px 30px 8px 145px;
            .l{
                width:120px;
            }
        }
        .form_height{
            padding:6px 30px 5px 145px;
        }
    }
</style>
