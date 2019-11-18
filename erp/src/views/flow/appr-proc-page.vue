<!-- 通用的审批页面 -->
<template>
    <div class="paydetail-wrapper my-payment">
        <div class="receivables-information" v-for="(formData, index) in formList" :key="index">
            <p class="paydetail-title">{{formData.title}}</p>
            <div class="essential-wrapper pay-detail essential-row-float">
                <div class="essential-item" v-for="(item, index) in formData.dataList" :key="index">
                    <div class="essential-title">{{item.itemName}}</div>
                    <div class="essential-text" v-if="item.itemType === 'text'">{{item.itemValue || '--'}}</div>
                    <div class="essential-text" v-if="item.itemType === 'file'" style="width:100%;">
                        <span v-if="item.itemValue && item.itemValue.length !== 0" @click="showImgs(item.itemValue)"><i class="iconfont icon-photo"></i></span>
                        <span v-else><i class="iconfont icon-photo-null"></i></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="essential-information" v-if="isPass">
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
        <div class="foot">
            <button class="gy-button-normal" @click="$router.go(-1)">返回</button>
            <template v-if="isPass">
                <button class="gy-button-normal" @click="reject()">驳回</button>
                <button class="gy-button-extra confirmations" @click="approveSub(1)">通过</button>
            </template>
        </div>
        <div class="foot" v-if="this.$route.query.subSysType == 0">
            <button class="gy-button-extra" @click="comment()">评论</button>
        </div>
        <gy-operation-history ref="operationHis"></gy-operation-history>
        <gy-comment-remark v-if="commentDiog.dialogVisibleRemark === true" :dialog = "commentDiog" :invoice="contractDetailCommpany"></gy-comment-remark>
        <gy-file-view ref="contFileView"></gy-file-view>
    </div>
</template>

<script>
import gyOperationHistory from './../../components/gyOperationHistoryComment';
import gyFileView from '../components/gyFileView';
import gyCommentRemark from './../../components/gyCommentRemark';
export default {
    components: {gyOperationHistory, gyFileView, gyCommentRemark},
    data () {
        return {
            commentDiog: {
                dialogVisibleRemark: false
            },
            contractDetailCommpany: {
                targetType: 2,
                subSysType: 0,
                targetId: null,
                refFunc: {}
            },
            approveData: {},
            formList: [],
            remarks: null, // 备注
            isPass: false // 是否审核通过
        };
    },
    mounted () {
        this.getDetail();
        this.getApproveHistory();
    },
    methods: {
        // 获取审批详情
        getDetail () {
            let that = this;
            this.$http.post(this.$api.apprProc.getApprReqInfo, {todoId: this.$route.query.todoId}).then(function (response) {
                if (response.data.code === 0) {
                    // 去结果画面
                    that.approveData = response.data.data;
                    if (Array.isArray(that.approveData)) {
                        // 兼容旧数据
                        that.formList = that.approveData;
                    } else if (that.approveData.formList && Array.isArray(that.approveData.formList)) {
                        that.formList = that.approveData.formList;
                    } else if (that.approveData.dataList && Array.isArray(that.approveData.dataList)) {
                        // 兼容旧数据
                        that.formList.push(that.approveData);
                    }

                    that.approveJurisdiction();
                } else {
                    that.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 获取审批记录
        getApproveHistory () {
            let params = {
                targetId: this.$route.query.bizId,
                targetType: this.$route.query.bizType,
                subSysType: this.$route.query.subSysType,
                affiliatedCompanyId: this.$route.query.companyId
            };
            this.$refs.operationHis.display(this.$api.contract.approve1History, params);
        },
        // 查看是否可以审批
        approveJurisdiction () {
            let that = this;
            let params = {
                targetId: this.$route.query.bizId,
                targetType: this.$route.query.bizType,
                subSysType: this.$route.query.subSysType
            };
            that.isPass = false;
            this.$http.post(this.$api.apprProc.hasApproveAuth, params).then(function (response) {
                if (response.data.code === 0) {
                    that.isPass = true;
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 驳回提示
        reject () {
            this.$confirm('<span><i class="iconfont icon-message-warning"></i>确认驳回?</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                this.approveSub(2);
            });
        },
        // 审批
        approveSub (type) {
            let that = this;
            let params = {
                todoId: this.$route.query.todoId,
                operaType: type, // 审批结果（1：同意 2：驳回）
                remarks: this.remarks// 审批备注
            };
            this.$http.post(this.$api.apprProc.doApprove, params).then(function (response) {
                if (response.data.code === 0) {
                    that.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    that.$router.go(-1);
                } else {
                    that.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 评论
        comment () {
            this.commentDiog.dialogVisibleRemark = true;
            this.contractDetailCommpany.targetId = Number(this.$route.query.bizId);
            this.contractDetailCommpany.targetType = Number(this.$route.query.bizType);
            this.contractDetailCommpany.refFunc = this.$refs.operationHis.display;
            this.contractDetailCommpany.refParam = {
                targetId: this.$route.query.bizId,
                targetType: this.$route.query.bizType
            };
        },
        // 图片预览
        showImgs (imgList) {
            this.$refs.contFileView.open4MultiFile(imgList);
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
  .my-payment {
    overflow: hidden;
    margin: 20px;
  }
  .paybuy-fpfkmx {
      .gy-table {
          width: 400px;
      }
  }
  .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .essential-row-float .essential-item .essential-title {
    flex: 0 0 100px;
  }
</style>
<style lang="scss">
    .paydetail-wrapper {
        .order-dialoged {
            .el-dialog__header {
                font-weight: bold;
                padding: 0;
            }
            .el-dialog__body {
                margin: 10px 0;
                padding: 10px 20px;
            }
            .order-apply {
                h3 {
                    margin: 10px 0;
                }
            }
            .gy-form-group{
                padding: 10px 40px 10px 125px;
                span{
                    i{
                        color: $color-highlight;
                    }
                }
            }
            .gy-form-group .l{
                width: 120px;
            }
        }
    }
</style>
