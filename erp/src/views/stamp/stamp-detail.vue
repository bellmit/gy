<!-- 用印申请详情 -->
<template>
    <div class="stamp-detail">
        <div class="paydetail-title">基本信息</div>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l">业务类型</span>
                <span>{{detailList.businessTypeDesc}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">印章种类</span>
                <span>{{detailList.stampTypeDesc}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">用印单位</span>
                <span>{{detailList.companyName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">单据类型</span>
                <span>{{detailList.documentTypeDesc}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">用印文件名称</span>
                <span>{{detailList.stampFileDescription}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">单据去向</span>
                <span>{{detailList.documentDirectionDesc}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">使用日期</span>
                <span>{{detailList.usedDate | date()}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">用印申请编号</span>
                <span>{{detailList.applyCode}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">申请人员</span>
                <span>{{userName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">所在部门</span>
                <span>{{userDepartmentName}}</span>
            </div>
        </div>
        <div class="paydetail-title">业务信息</div>
        <div class="gy-form">
            <div class="gy-form-group" v-if="detailList.businessType===null || detailList.businessType===2">
                <span class="l">合同要素ID</span>
                <span>{{detailList.essenceId}}</span>
            </div>
            <div class="gy-form-group" v-if="detailList.businessType==1 || detailList.businessType==3">
                <span class="l">合同编号</span>
                <span>{{detailList.contractCode}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">我方公司</span>
                <span>{{detailList.ourCompanyName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">客户名称</span>
                <span>{{detailList.othersideCompanyName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">业务进度</span>
                <span>{{detailList.businessProgress}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">业务人员</span>
                <span>{{detailList.businessUserName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">产品名称</span>
                <span>{{detailList.productName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">备注</span>
                <span>{{detailList.remark||'--'}}</span>
            </div>
        </div>
        <div class="paydetail-title">附件信息</div>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l">附件</span>
                <span v-if="detailList.attachments && detailList.attachments.length !== 0"
                        @click="handleShowImg(detailList.attachments)"><i class="iconfont icon-photo"></i></span>
                <span v-else><i class="iconfont icon-photo-null" @click="imgErr('附件')"></i></span>
            </div>
            <div v-if="homeFromFlg == 1 && detailList.status===2" v-gy-auth="'createStamp'">
                <div class="gy-form-group" v-if="detailList.signedFiles && detailList.signedFiles.length === 0">
                    <span class="l"><strong>*</strong>上传签章文件</span>
                    <gy-file-upload ref="sFileUpload" @callbackFileUpload="onCallbackSaleFileUpload"></gy-file-upload>
                </div>
            </div>
            <div v-if="detailList.status==3">
                <div class="gy-form-group" v-if="detailList.signedFiles && detailList.signedFiles.length !== 0">
                    <span class="l">签章文件</span>
                    <span v-if="detailList.signedFiles && detailList.signedFiles.length !== 0"
                          @click="handleShowImg(detailList.signedFiles)"><i class="iconfont icon-photo"></i></span>
                    <span v-else><i class="iconfont icon-photo-null"></i></span>
                </div>
            </div>
        </div>
        <div class="foot">
            <button class="gy-button-normal" @click="goback">返回</button>
            <button v-if="homeFromFlg == 1 && detailList.status===2" v-gy-auth="'createStamp'" class="gy-button-extra" @click="onsubmit">保存</button>
        </div>
        <div class="button-wrap" v-if="homeFromFlg == 1 || homeFromFlg == 2">
            <button class="gy-button-extra" @click="comment()">评论</button>
        </div>
        <gy-operation-history v-if="showCommentBtn" @checkHistory="checkHistory" ref="operationHis"></gy-operation-history>
        <gy-comment-remark v-if="commentDiog.dialogVisibleRemark === true" :dialog = "commentDiog" :invoice="contractDetailCommpany"></gy-comment-remark>
        <!-- img 弹出 -->
        <gy-file-view ref="contFileView"></gy-file-view>
    </div>
</template>

<script>
import gyFileView from './../components/gyFileView';
import gyFileUpload from '../components/gyFileUpload';
import gyOperationHistory from './../../components/gyOperationHistoryComment';
import gyCommentRemark from './../../components/gyCommentRemark';
export default {
    components: {gyOperationHistory, gyCommentRemark, gyFileUpload, gyFileView},
    data () {
        return {
            userName: JSON.parse(localStorage.getItem('userInfo')).username, // 申请人员
            userDepartmentName: JSON.parse(localStorage.getItem('userInfo')).orgName, // 部门
            progressData: ['', '已签约', '已收款', '已付款'], // 业务进度
            stampApplyId: this.$route.query.id,
            showCommentBtn: true,
            commentDiog: {
                dialogVisibleRemark: false
            },
            contractDetailCommpany: {
                targetType: 30,
                subSysType: 0,
                targetId: null,
                refFunc: {}
            },
            detailList: {},
            addFrom: {
                id: this.$route.query.id,
                todoId: this.$route.query.todoId,
                stampApplicationFiles: []
            },
            homeFromFlg: null
        };
    },
    mounted () {
        this.getStampDetail();
        this.approve1History();
        if (this.$route.query.homeFromFlg) {
            this.homeFromFlg = Number(this.$route.query.homeFromFlg);
        }
    },
    methods: {
        // 用印审批记录
        approve1History () {
            let params = {
                targetId: Number(this.stampApplyId), // 合同要素ID
                targetType: 30
            };
            this.$refs.operationHis.display(this.$api.contract.approve1History, params);
        },
        // 评论
        comment () {
            this.commentDiog.dialogVisibleRemark = true;
            this.contractDetailCommpany.targetId = Number(this.stampApplyId);
            this.contractDetailCommpany.targetType = 30;
            this.contractDetailCommpany.subSysType = 0;
            this.contractDetailCommpany.refFunc = this.$refs.operationHis.display;
            this.contractDetailCommpany.refParam = {
                targetId: this.stampApplyId,
                targetType: 30
            };
        },
        getStampDetail () {
            // 获取审批流程和详情数据
            this.$http.get(this.$api.stamp.stampDetail + this.stampApplyId).then((res) => {
                if (res.data.code === 0) {
                    console.log(res);
                    this.detailList = res.data.data;
                } else {
                    this.$alert(res.data.code + ' ' + res.data.message);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        checkHistory () {
            // 没有操作流程数据时不显示'评论'按钮
            this.showCommentBtn = false;
        },
        // 返回
        goback () {
            if (this.$route.query.saleOrderId) {
                this.$router.push({name: 'orderDetails', query: {id: this.detailList.essenceId, saleOrderId: this.$route.query.saleOrderId, purchaseOrderId: this.$route.query.purchaseOrderId, tabsIndex: 5}});
            } else {
                this.$router.go(-1);
            }
        },
        handleShowImg (list) {
            this.$refs.contFileView.open4MultiFile(list);
        },
        imgErr (title) {
            this.$message({message: title + '暂无数据', type: 'warning'});
        },
        // 上传签证文件
        onCallbackSaleFileUpload (fileList) {
            console.log(fileList);
            this.addFrom.stampApplicationFiles = [];
            fileList.forEach((e) => {
                this.addFrom.stampApplicationFiles.push(e.fileUrl);
            });
        },
        // 保存签证文件
        onsubmit () {
            if (!this.check()) return false;
            this.$http.post(this.$api.stamp.completeStamp, this.addFrom).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    this.$router.go(-1);
                    // Bus.$emit('setMenu');
                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            });
        },
        // 表单验证
        check () {
            if (this.addFrom.stampApplicationFiles.length === 0) {
                this.$message.error('请先上传签章文件');
                return false;
            }
            return true;
        }
    }
};
</script>

<style lang="scss" scoped>
.stamp-detail{
    padding: 20px 0 30px 0;
    .paydetail-title{
        font-size: 14px;
    }
    .button-wrap{
        text-align: right;
        padding-right: 30px;
        position: relative;
        .gy-button-extra{
            position: absolute;
            right: 30px;
            top: 3px;
        }
    }
    .addDialog{
        .search1 {
            position: absolute;
            right: 0;
            bottom: 10px;
            line-height: 1;
        }
    }
}
</style>
<style lang="scss">
  .stamp-detail {
    .el-dialog__header {
      .el-dialog__headerbtn {
        top: 10px;
        right: 16px;
      }
    }
    .el-input__inner{
        font-size: 14px;
    }
  }
</style>
