<template>
    <div class="my-dalesView">
        <gy-contract :query="form"></gy-contract>
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
                <span>{{saleList.skuQuantity|numToQuantity}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">已交割数量(吨)</span>
                <span>{{saleList.alreadyDeliveryQuantity|numToQuantity}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">待交割数量(吨)</span>
                <span>{{saleList.surplusDeliveryQuantity|numToQuantity}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">免仓期(天)</span>
                <span>{{saleList.warehouseFreeDays}} &nbsp;&nbsp;自&nbsp;{{saleList.freeWarehouseDate| date}}&nbsp;起仓储费由收货单位承担</span>
            </div>
            <div class="gy-form-group">
                <span class="l">计划交割日</span>
                <span>{{saleList.planDeliveryDate}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">本次交割数量(吨)</span>
                <span>{{saleList.deliveryQuantity|numToQuantity}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">申请交割日</span>
                <span>{{saleList.deliveryDate | date}}</span>
            </div>
            <div class="gy-form-group form_height">
                <span class="l">换货仓库</span>
                <span>{{saleList.productWareHouse || '-'}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">交叉交割</span>
                <span>{{saleList.acrossDelivery | acrossDelivery}}</span>
            </div>
            <div class="gy-form-group form_height">
                <span class="l">货权单凭证</span>
                <i v-if="saleList.erpGoodFileModelList && saleList.erpGoodFileModelList.length !== 0" class="iconfont icon-photo" @click="openDidalog(saleList.erpGoodFileModelList)"></i>
                <i v-else class="iconfont icon-photo-null"></i>
            </div>
            <div class="gy-form-group" v-if="saleList.deliveryStatus === 3">
                <span class="l">实际交割日</span>
                <span v-if="saleList.realDeliveryDate">{{saleList.realDeliveryDate | date}}</span>
                <span v-else>-</span>
            </div>
            <div class="gy-form-group" v-if="doneFlg === 0 && (saleList.deliveryStatus === 1 || saleList.deliveryStatus === 4)">
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
            <div class="gy-form-group" v-if="saleList.acrossDelivery==1">
                <span class="l">交叉采购合同</span>
                <i v-if="saleList.erpFileContractModelList && saleList.erpFileContractModelList.length !== 0" class="iconfont icon-photo" @click="openDidalog(saleList.erpFileContractModelList)"></i>
                <i v-else class="iconfont icon-photo-null"></i>
            </div>
            <div class="gy-form-group form_height" v-if="saleList.deliveryStatus === 3">
                <span class="l">交割凭证</span>
                <i v-if="saleList.erpDeliveryFileModelList && saleList.erpDeliveryFileModelList.length !== 0" class="iconfont icon-photo" @click="openDidalog(saleList.erpDeliveryFileModelList)"></i>
                <i v-else class="iconfont icon-photo-null"></i>
            </div>
            <div class="gy-form-group" v-gy-auth="'to_upload_dlvy_voucher'" v-if="doneFlg === 0 && (saleList.deliveryStatus === 1 || saleList.deliveryStatus === 4)">
                <span class="l"><i style="color: red">*</i>上传交割凭证</span>
                <gy-file-upload ref="sFileUpload" @callbackFileUpload="onCallbackSaleFileUpload"></gy-file-upload>
            </div>
            <div class="gy-form-group cl" v-if="saleList.acrossDelivery==1">
                <span class="l">交叉采购合同号</span>
                <span>{{saleList.acrossContractNo}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">创建人</span>
                <span>{{saleList.createdName}}</span>
            </div>
            <div class="gy-form-group cl">
                <span class="l">创建时间</span>
                <span>{{saleList.createdDate | date(1)}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">状态</span>
                <span>{{saleList.deliveryStatus | sellDeliveryItemState}}</span>
            </div>
            <div class="gy-form-group" v-if="saleList.overdueReason">
                <span class="l">备注</span>
                <span>{{saleList.overdueReason}}</span>
            </div>
        </div>
        <div class="essential-information" v-if="saleList.deliveryStatus === 5 && isAuth === 1">
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
        <!-- 预览图片 -->
        <gy-file-view ref="contFileView"></gy-file-view>
        <div class="button-wrap">
            <button class="gy-button-normal" @click="$router.back(-1)">返回</button>
            <template v-if="saleList.deliveryStatus === 5 && isAuth === 1">
                <button class="gy-button-normal" @click="approveReject">驳回</button>
                <button class="gy-button-extra" @click="approveSub(1)">通过</button>
            </template>
            <span v-gy-auth="'to_upload_dlvy_voucher'" v-if="doneFlg === 0 && (saleList.deliveryStatus === 1 || saleList.deliveryStatus === 4)">
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
import gyFileUpload from '../components/gyFileUpload';
import gyOperationHistory from './../../components/gyOperationHistoryComment';

export default {
    name: 'salesView',
    components: {gyContract, gyFileView, gyFileUpload, gyOperationHistory},
    data () {
        return {
            realDeliveryDate: null,
            remarks: '',
            saleList: {},
            // 获取单凭证
            voucherList: [],
            isAuth: null,
            newReceiptsList: [],
            doneFlg: null,
            form: {}
        };
    },
    mounted () {
        this.detailsOfSalesDelivery();
        this.doneFlg = Number(this.$route.query.doneFlg);
        this.contrtactBase();
    },
    methods: {
        // 合同要素基本信息
        contrtactBase () {
            this.$http.get(this.$api.order.orderDetail + '/' + this.$route.query.contEssId).then((res) => {
                if (res.data.code === 0) {
                    this.form = res.data.data;
                }
            });
        },
        // 上传交割凭证-回调
        onCallbackSaleFileUpload (fileList) {
            this.newReceiptsList = [];
            fileList.forEach((e) => {
                this.newReceiptsList.push({fileUrl: e.fileUrl});
            });
        },
        salesDetailClick () {
            this.$router.push({name: 'paymentDetail', query: {id: this.$route.query.contEssId, sellerOrderId: this.saleList.saleOrderId, purchaseOrderId: this.saleList.purchaseOrderId}});
        },
        detailsOfSalesDelivery () {
            this.$http.get(this.$api.delivery.detailsOfSalesDeliveryDetails + this.$route.query.dlvItemId).then((res) => {
                if (res.data.code === 0) {
                    this.saleList = res.data.data;
                    this.realDeliveryDate = this.saleList.deliveryDate;
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
            this.isAuth = 0;
            this.$http.post(this.$api.apprProc.hasApproveAuth, params).then(res => {
                if (res.data.code === 0) {
                    this.isAuth = 1;
                }
            });
        },
        // 工作流程
        salesViewHistory (item) {
            let params = {};
            params.targetId = item;
            params.targetType = 8;
            this.$refs.operationHis.display(this.$api.contract.approve1History, params);
        },
        // 预览图片
        // 0 货权单凭证 1 采购合同 2 交割凭证
        openDidalog (list) {
            this.$refs.contFileView.open(list);
        },
        // type 1 通过 2拒绝
        approveSub (type) {
            let params = {
                todoId: this.$route.query.todoId,
                contEssId: this.$route.query.contEssId,
                deliveryItemId: this.$route.query.dlvItemId,
                operaType: type, // 审批结果（1：同意 2：驳回）
                remarks: this.remarks// 审批备注
            };
            this.$http.post(this.$api.apprProc.flowApprove, params).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'warning'
                    });
                    this.$router.go(-1);
                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'warning'
                    });
                }
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
        subUploadDeliveryFile () {
            let that = this;
            if (!this.realDeliveryDate) {
                this.$message({
                    message: '请选择实际交割日',
                    type: 'warning'
                });
                return;
            }
            if (this.newReceiptsList.length === 0) {
                this.$message({
                    message: '请先上传凭证',
                    type: 'warning'
                });
                return;
            }
            let params = {
                'passFlag': 1,
                'realDeliveryDate': this.realDeliveryDate,
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
                } else {
                    this.$message({
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
                } else {
                    this.$message({
                        message: response.data.message,
                        type: 'warning'
                    });
                }
            }).catch((e) => {
                console.log(e);
            });
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
            margin: 20px 20px;
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
        /*GYfrom padding修改*/
        .gy-form-group{
            padding:8px 30px 8px 155px;
            .l{
                width:140px;
            }
        }
        .form_height{
            padding:6px 30px 5px 155px;
        }
    }
</style>
