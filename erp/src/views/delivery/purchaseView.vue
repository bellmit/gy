<template>
    <div class="my-dalesView">
        <!-- 此页面暂时不需要 -->
        <gy-contract :query="form"></gy-contract>
        <div class="title">采购交割信息</div>
        <div class="block-wrap clearfix">
            <div class="gy-form-group cl">
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
                <span class="l">免仓期(天)</span>
                <span>{{purchaseList.warehouseFreeDays}} &nbsp;&nbsp;自&nbsp;{{purchaseList.freeWarehouseDate| date}}&nbsp;起仓储费由收货单位承担</span>
            </div>
            <div class="gy-form-group">
                <span class="l">数量(吨)</span>
                <span>{{purchaseList.skuQuantity|numToQuantity}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">待交割数量(吨)</span>
                <span>{{purchaseList.surplusDeliveryQuantity|numToQuantity}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">计划交割日</span>
                <span>{{purchaseList.planDeliveryDate}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">本次交割数量(吨)</span>
                <span>{{purchaseList.deliveryQuantity|numToQuantity}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">申请交割日</span>
                <span>{{purchaseList.deliveryDate | date}}</span>
            </div>
            <div class="gy-form-group" v-if="purchaseList.deliveryStatus === 3">
                <span class="l">实际交割日</span>
                <span v-if="purchaseList.realDeliveryDate">{{purchaseList.realDeliveryDate | date}}</span>
                <span v-else>-</span>
            </div>
            <div class="gy-form-group" v-if="doneFlg === 0 && (purchaseList.deliveryStatus === 1 || purchaseList.deliveryStatus === 4)">
                <span class="l"><i style="color: red">*</i>实际交割日</span>
                <div class="d input-date">
                    <el-date-picker
                        type="date"
                        v-model="realDeliveryDate"
                        value-format="timestamp"
                        placeholder="实际交割日">
                    </el-date-picker>
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l">创建时间</span>
                <span>{{purchaseList.createdDate | date(1)}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">创建人</span>
                <span>{{purchaseList.createdName}}</span>
            </div>
            <div class="gy-form-group" v-gy-auth="'to_confirm_buy_dlvy_voucher'" v-if="doneFlg === 0 && (purchaseList.deliveryStatus === 1 || purchaseList.deliveryStatus === 4)">
                <span class="l"><i style="color: red">*</i>交割凭证</span>
                <gy-file-upload ref="pFileUpload" @callbackFileUpload="onCallbackBuyFileUpload"></gy-file-upload>
            </div>
            <div class="gy-form-group" v-if="purchaseList.deliveryStatus === 3">
                <span class="l">交割凭证</span>
                <i v-if="this.imgList.length !== 0" class="iconfont icon-photo" @click="handleShowImg(imgList)"></i>
                <i v-else class="iconfont icon-photo-null" style="color: red"></i>
            </div>
        </div>
        <!-- 预览图片 -->
        <gy-file-view ref="contFileView"></gy-file-view>
        <div class="essential-information" v-if="purchaseList.deliveryStatus === 5 && isAuth === 1">
            <p class="paydetail-title">审批备注</p>
            <div class="essential-wrapper">
                <div class="essential-row">
                    <div class="essential-item">
                        <div class="essential-text">
                            <textarea class="gy-textarea" v-model="remarks" placeholder="请填写审批备注" cols="30" rows="10"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="button-wrap">
            <button class="gy-button-normal" @click="$router.back(-1)">返回</button>
            <template v-if="purchaseList.deliveryStatus === 5 && isAuth === 1">
                <button class="gy-button-normal" @click="approveReject">驳回</button>
                <button class="gy-button-extra" @click="approveSub(1)">通过</button>
            </template>
            <span v-gy-auth="'to_confirm_buy_dlvy_voucher'" v-if="doneFlg === 0 && (purchaseList.deliveryStatus === 1 || purchaseList.deliveryStatus === 4)">
                <button class="gy-button-normal" @click="rejUploadDeliveryFile">驳回</button>
                <button class="gy-button-extra" @click="subUploadDeliveryFile">保存</button>
            </span>
        </div>
        <gy-operation-history ref="operationHis"></gy-operation-history>
    </div>
</template>

<script>
import gyContract from '../components/contractBasic.vue';
import gyFileView from './../components/gyFileView';
import gyFileUpload from './../components/gyFileUpload';
import gyOperationHistory from './../../components/gyOperationHistoryComment';

export default {
    name: 'purchaseView',
    components: {gyContract, gyFileView, gyFileUpload, gyOperationHistory},
    data () {
        return {
            realDeliveryDate: null,
            icon: require('@/assets/images/icon-default.png'),
            remarks: '',
            imgList: [],
            purchaseList: {},
            detailsOfPurchaseDeliveryDetailsId: 20,
            newReceiptsList: [], // 保存采购交割,
            createBuyDelive: {
                erpDeliveryFileModelList: []
            }, // 保存采购交割
            isAuth: null, // 是否有审批权限
            doneFlg: null,
            form: {}
        };
    },
    mounted () {
        this.detailsOfPurchaseDelivery();
        this.doneFlg = Number(this.$route.query.doneFlg);
        this.contrtactBase();
    },
    methods: {
        // 合同要素基本信息
        contrtactBase () {
            let that = this;
            that.$http.get(that.$api.order.orderDetail + '/' + that.$route.query.contEssId).then((res) => {
                if (res.data.code === 0) {
                    that.form = res.data.data;
                }
            });
        },
        handleShowImg (list) {
            this.$refs.contFileView.open(list);
        },
        // 采购交割信息
        detailsOfPurchaseDelivery () {
            let that = this;
            that.$http.get(that.$api.delivery.detailsOfPurchaseDeliveryDetails + that.$route.query.dlvItemId).then((res) => {
                if (res.data.code === 0) {
                    that.purchaseList = res.data.data;
                    that.realDeliveryDate = that.purchaseList.realDeliveryDate ? that.purchaseList.realDeliveryDate : that.purchaseList.deliveryDate;
                    that.purchaseList.erpDeliveryFileModelList.forEach(e => {
                        if (e.fileType === 0) {
                            that.imgList.push(e);
                        }
                    });
                    that.purchaseViewHistory(that.$route.query.dlvItemId);
                    let params = {
                        targetId: that.$route.query.dlvItemId,
                        targetType: 7
                    };
                    that.isAuth = 0;
                    that.$http.post(that.$api.apprProc.hasApproveAuth, params).then(res => {
                        if (res.data.code === 0) {
                            that.isAuth = 1;
                        }
                    });
                } else {
                    that.$message({
                        message: res.data.message,
                        type: 'warning'
                    });
                }
            });
        },
        // 采购交割凭证上传－回调
        onCallbackBuyFileUpload (fileList) {
            this.createBuyDelive.erpDeliveryFileModelList = [];
            fileList.forEach((e) => {
                this.createBuyDelive.erpDeliveryFileModelList.push({fileUrl: e.fileUrl});
            });
        },
        subUploadDeliveryFile () {
            let that = this;
            if (!that.realDeliveryDate) {
                that.$message({
                    message: '请选择实际交割日',
                    type: 'warning'
                });
                return;
            }
            if (that.createBuyDelive.erpDeliveryFileModelList.length === 0) {
                that.$message({
                    message: '请先上传凭证',
                    type: 'warning'
                });
                return;
            }
            let params = {
                'passFlag': 1,
                'realDeliveryDate': that.realDeliveryDate,
                'todoId': that.$route.query.todoId,
                'deliveryItemId': that.$route.query.dlvItemId,
                'erpDeliveryFileModelList': that.createBuyDelive.erpDeliveryFileModelList,
                'allowedFunctionsId': 36
            };
            that.$http.post(that.$api.delivery.uploadDeliveryFile, params).then(response => {
                if (response.data.code === 0) {
                    that.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    that.$router.go(-1);
                } else {
                    that.$message({
                        message: response.data.message,
                        type: 'warning'
                    });
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        rejUploadDeliveryFile () {
            let that = this;
            let params = {
                'passFlag': 2,
                'todoId': that.$route.query.todoId,
                'deliveryItemId': that.$route.query.dlvItemId,
                'erpDeliveryFileModelList': that.newReceiptsList,
                'allowedFunctionsId': 36
            };
            that.$http.post(that.$api.delivery.uploadDeliveryFile, params).then(response => {
                if (response.data.code === 0) {
                    that.$message({
                        message: '驳回成功',
                        type: 'success'
                    });
                    that.$router.go(-1);
                } else {
                    that.$message({
                        message: response.data.message,
                        type: 'warning'
                    });
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 审批
        approveSub (type) {
            let that = this;
            let params = {
                todoId: that.$route.query.todoId,
                contEssId: that.$route.query.contEssId,
                deliveryItemId: that.$route.query.dlvItemId,
                operaType: type, // 审批结果（1：同意 2：驳回）
                remarks: that.remarks// 审批备注
            };
            that.$http.post(that.$api.apprProc.flowApprove, params).then(function (response) {
                if (response.data.code === 0) {
                    that.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                } else {
                    that.$message({
                        message: response.data.message,
                        type: 'warning'
                    });
                }
                that.$router.go(-1);
            }).catch((e) => {
                console.log(e);
            });
        },
        approveReject () {
            this.$confirm('确认驳回?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.approveSub(2);
            });
        },
        // 工作流程
        purchaseViewHistory (item) {
            let params = {};
            params.targetId = item;
            params.targetType = 7;
            this.$refs.operationHis.display(this.$api.contract.approve1History, params);
        }
    },
    watch: {
        remarks (val) {
            if (val.length > 2500) {
                this.$message({
                    message: '审批备注最多可填写2500字',
                    type: 'warning'
                });
                this.remarks = this.remarks.substr(0, 2500);
            }
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
            margin: 20px 20px;
            font-weight: bold;
        }
        .gy-form-group {
            padding: 8px 30px 8px 155px;
            .l{
                width: 140px;
            }
        }
    }
</style>
<style lang="scss">
    .my-dalesView {
        .el-input__inner {
            font-size: 14px;
        }
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
