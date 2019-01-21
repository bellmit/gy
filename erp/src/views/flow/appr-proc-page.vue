<!-- 通用的审批页面 -->
<template>
    <div class="paydetail-wrapper my-payment">
        <div class="receivables-information">
            <p class="paydetail-title">{{formData.title}}</p>
            <div class="essential-wrapper pay-detail essential-row-float">
                <div class="essential-item" v-for="(item, index) in formData.dataList" :key="index">
                    <div class="essential-title">{{item.itemName}}</div>
                    <div class="essential-text">{{item.itemValue}}</div>
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
                <button class="gy-button-normal" @click="approveSub(2)">驳回</button>
                <button class="gy-button-extra confirmations" @click="approveSub(1)">通过</button>
            </template>
        </div>
        <div class="essential-information">
            <p class="paydetail-title">操作流程</p>
            <div class="essential-wrapper">
                <table class="gy-table box">
                    <thead>
                    <tr>
                        <th style="width: 80px">序号</th>
                        <th style="width: 120px">操作人</th>
                        <th style="width: 280px">操作时间</th>
                        <th style="width: 200px">操作结果</th>
                        <th style="width: 200px">备注</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in history" :key="index">
                        <td>{{index+1}}</td>
                        <td>{{item.username}}</td>
                        <td>{{item.createdDate | date(item.createdDate)}}</td>
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
export default {
    data () {
        return {
            formData: {
                title: null,
                dataList: []
            },
            remarks: null, // 备注
            history: [],
            isPass: false // 是否审核通过
        };
    },
    created () {
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
                    that.formData = response.data.data;
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
            let that = this;
            let params = {
                targetId: this.$route.query.bizId,
                targetType: this.$route.query.bizType,
                subSysType: this.$route.query.subSysType,
                affiliatedCompanyId: this.$route.query.companyId
            };
            this.$http.post(this.$api.contract.approve1History, params).then(function (res) {
                if (res.data.code === 0) {
                    that.history = res.data.data;
                }
            }).catch((e) => {
                console.log(e);
            });
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
                }
                that.$router.go(-1);
            }).catch((e) => {
                console.log(e);
            });
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
        .el-upload {
            border: 1px solid #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .el-upload:hover {
            border-color: #409EFF;
        }
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
