<template>
    <div class="my-dalesView">
        <!-- 此页面暂时不需要 -->
        <gy-contract type='1' :ids="id"></gy-contract>
        <div class="title">采购交割信息</div>
        <div class="block-wrap clearfix">
            <div class="gy-form-group">
                <span class="l">交割库</span>
                <span>{{purchaseList.deliveryWarehouseName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">交割库地址</span>
                <span>{{purchaseList.deliveryDetailedAddress}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">上游公司</span>
                <span>{{purchaseList.sellerCompanyName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">数量(吨)</span>
                <span>{{purchaseList.skuQuantity | numToCash}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">已交割数量(吨)</span>
                <span>{{purchaseList.alreadyDeliveryQuantity | numToCash}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">待交割数量(吨)</span>
                <span>{{purchaseList.surplusDeliveryQuantity | numToCash}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">免仓期</span>
                <span>{{purchaseList.warehouseFreeDays}}天</span>
            </div>
            <div class="gy-form-group">
                <span class="l">计划交割日</span>
                <span>{{purchaseList.planDeliveryDate}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">本次交割数量(吨)</span>
                <span>{{purchaseList.deliveryQuantity}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">交割日</span>
                <span>{{purchaseList.deliveryDate | date}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">交割编号</span>
                <span>{{purchaseList.deliveryItemId}}</span>
            </div>
            <div class="gy-form-group cl" v-if="purchaseList.deliveryStatus === 1">
                <span class="l"><i>*</i>交割凭证</span>
                <el-upload
                        action="api"
                        list-type="picture-card"
                        :http-request="purchaseDeliveryVoucherUpload">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
            <div class="gy-form-group" v-if="purchaseList.deliveryStatus === 3">
                <span class="l">交割凭证</span>
                <i v-if="this.imgList.length !== 0" class="iconfont icon-photo" @click="visible=true"></i>
                <i v-else class="iconfont icon-photo-null"></i>
            </div>
            <div class="gy-form-group">
                <span class="l">创建时间</span>
                <span>{{purchaseList.createdDate | date(1)}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">创建人</span>
                <span>{{purchaseList.createdName}}</span>
            </div>
        </div>
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
            <button class="gy-button-extra" v-gy-auth="'to_upload_dlvy_voucher'" v-if="purchaseList.deliveryStatus === 1"
                    @click="subUploadDeliveryFile">保存
            </button>
            <button class="gy-button-extra" v-gy-auth="'to_upload_dlvy_voucher'" v-if="purchaseList.deliveryStatus === 1"
                    @click="rejUploadDeliveryFile">驳回
            </button>
        </div>
    </div>
</template>

<script>
import gyContract from '../components/contractBasic.vue';
export default {
    name: 'purchaseView',
    components: {gyContract},
    data () {
        return {
            icon: require('@/assets/images/icon-default.png'),
            visible: false,
            imgList: [],
            purchaseList: {},
            detailsOfPurchaseDeliveryDetailsId: 20,
            newReceiptsList: [] // 保存采购交割,
        };
    },
    mounted () {
        this.detailsOfPurchaseDelivery();
    },
    methods: {
        // 采购交割信息
        detailsOfPurchaseDelivery () {
            this.$http.get(this.$api.delivery.detailsOfPurchaseDeliveryDetails + this.$route.query.dlvItemId).then((res) => {
                if (res.data.code === 0) {
                    this.purchaseList = res.data.data;
                    this.purchaseList.erpDeliveryFileModelList.forEach(e => {
                        if (e.fileType === 0) {
                            this.imgList.push(e);
                        }
                    });
                }
            });
        },
        // 采购交割凭证上传
        purchaseDeliveryVoucherUpload (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            that.$http.post(that.$api.upload.imgUpload, formData, headers)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.newReceiptsList.push({
                            fileUrl: res.data.data
                        });
                    }
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
                'allowedFunctionsId': 36
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
    .my-dalesView{
        padding-bottom: 30px;
        .title{
            font-size: 14px;
            color: #333333;
            margin: 20px 30px;
            font-weight: bold;
        }
        .gy-form-group {
            padding: 8px 30px 8px 145px;
            .l{
                width: 108px;
            }
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
        .gy-table{
            font-size: 12px;
            color:#666666;
        }
        .gy-table thead{
            font-weight: bold;
        }
    }
</style>
