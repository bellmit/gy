<template>
    <div>
        <el-dialog class="gyCommentRemark"
            v-if="dialog.dialogVisibleRemark"
            title="评论"
            :visible.sync="dialog.dialogVisibleRemark" :close-on-click-modal = "false" width="800px" append-to-body>
            <div class="remark">
                <div id="testim" @focus='remarkFocus()' contenteditable="true" placeholder="请输入评论..." style="resize:none;width: 100%;height:230px;padding: 8px;background: #F9F9F9;"></div>
            </div>
            <div class="remind">
                <button class="gy-button-views-comment" @click="remindFollow()">@提醒谁关注</button>
            </div>
            <div class="upload">
                <i class="el-icon-circle-plus-outline"></i>
                <span @click="uploadImg()">上传文件</span>
                <gy-file-upload ref="sFileUpload" @callbackFileUpload="onCallbackSaleFileUpload"></gy-file-upload>
            </div>
            <div class="sublime">
                <button class="gy-button-normal" style="margin-right: 4px;" @click="close()">取消</button>
                <button class="gy-button-extra" @click="commentSublime()">发送</button>
            </div>
        </el-dialog>
        <el-dialog v-if="dialogStaff.dialogVisibleStaff" class="gyReminderStaff" title="指定提醒人员"
            :visible.sync="dialogStaff.dialogVisibleStaff" :close-on-click-modal = "false" width="800px" append-to-body>
            <table class="gy-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>姓名</th>
                        <th>岗位</th>
                        <th>所属岗位</th>
                    </tr>
                </thead>
                <tbody v-if="reminderStaffList && reminderStaffList.length != 0">
                    <tr v-for="(item, index) in reminderStaffList" :key="index">
                        <td>
                            <el-checkbox :checked="checkModel" @change="selectionOfficer($event,item)"></el-checkbox>
                        </td>
                        <td>{{item.userName}}</td>
                        <td>{{$constant.roleName}}</td>
                        <td>{{item.orgName}}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="10" style="text-align: center;">暂无数据</td>
                    </tr>
                </tbody>
            </table>
            <div class="sublime">
                <button class="gy-button-normal" style="margin-right: 4px;" @click="closeStaff()">取消</button>
                <button class="gy-button-extra" @click="staffSublime()">确定</button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
// import reminderStaff from './reminderStaff';
import gyFileUpload from './../views/components/gyFileUpload';
export default {
    name: 'gyComment',
    props: {
        dialog: Object,
        invoice: Object
    },
    components: {gyFileUpload},
    data () {
        return {
            dialogStaff: {
                dialogVisibleStaff: false
            },
            comment: '',
            commentValue: '',
            reminderStaffList: [],
            userIdLists: [],
            isIndeterminate: false,
            checkModel: false,
            checkModelAll: false,
            commentObject: {
                todoItemId: null, // 代办事项ID
                comment: '', // 评论内容,
                commentFiles: []
            }
        };
    },
    mounted () {
        this.associatedPersonnel();
        if (this.$route.query.todoId) {
            this.commentObject.todoItemId = Number(this.$route.query.todoId);
        }
        if (this.$route.query.homeFromFlg) {
            this.commentObject.homeFromFlg = Number(this.$route.query.homeFromFlg);
        }
        if (this.invoice.targetId) {
            this.commentObject.targetId = Number(this.invoice.targetId);
        }
        if (this.invoice.targetType) {
            this.commentObject.targetType = Number(this.invoice.targetType);
        }
        if (this.invoice.subSysType || this.invoice.subSysType === 0) {
            this.commentObject.subSysType = Number(this.invoice.subSysType);
        }
    },
    methods: {
        remarkFocus () {},
        // 测试
        ceshi () {},
        // 上传文件
        uploadImg () {},
        onCallbackSaleFileUpload (fileList) {
            this.commentObject.commentFiles = fileList;
        },
        // 关闭
        close () {
            this.dialog.dialogVisibleRemark = false;
            this.reminderStaffUser();
        },
        reminderStaffUser (reminderStaffUser) {
            console.log(reminderStaffUser);
        },
        // 提醒关注
        remindFollow () {
            this.dialogStaff.dialogVisibleStaff = true;
            this.userIdLists = [];
        },
        // 发送
        commentSublime () {
            let that = this;
            var testIms = document.getElementById('testim');
            var newInputs = document.getElementById('testim').getElementsByTagName('input');
            var dingel = [];
            for (var s = 0; s < newInputs.length; s++) {
                for (var t = 0; t < this.reminderStaffList.length; t++) {
                    if (newInputs[s].name === this.reminderStaffList[t].userName) {
                        dingel.push(this.reminderStaffList[t].userId);
                    }
                }
            }
            that.commentObject.comment = testIms.innerHTML;
            that.commentObject.userIdList = dingel;
            that.$http.post(that.$api.commentsRematk.add, that.commentObject).then((res) => {
                if (res.data.code === 0) {
                    that.dialog.dialogVisibleRemark = false;
                    that.$message({
                        message: '发送成功',
                        type: 'success'
                    });
                    that.invoice.refFunc(this.$api.contract.approve1History, this.invoice.refParam);
                } else {
                    that.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            });
        },
        // 获取关联人员
        associatedPersonnel () {
            let that = this;
            that.$http.post(that.$api.commentsRematk.staff, that.invoice).then((res) => {
                if (res.data.code === 0) {
                    that.reminderStaffList = res.data.data;
                }
            });
        },
        // 关闭
        closeStaff () {
            this.dialogStaff.dialogVisibleStaff = false;
        },
        // 提醒人员确定
        staffSublime () {
            if (this.userIdLists.length === 0) {
                this.$message({
                    message: '请选择指定提醒人员',
                    type: 'warning'
                });
                return;
            }
            this.dialogStaff.dialogVisibleStaff = false;
            for (var c = 0; c < this.reminderStaffList.length; c++) {
                for (var z = 0; z < this.userIdLists.length; z++) {
                    if (this.reminderStaffList[c].userId === this.userIdLists[z]) {
                        var testIm = document.getElementById('testim');
                        let nodes = `<input type='text' class='testimsd' disabled='true' style='vertical-align: initial;color:#4A90E2;width:80px;border:none' name= ${this.reminderStaffList[c].userName} value='${'@' + this.reminderStaffList[c].userName}'/>`;
                        testIm.innerHTML = testIm.innerHTML + nodes;
                        console.log(testIm.innerHTML);
                    }
                }
            }
        },
        // 选择人员
        selectionOfficer (even, val) {
            if (even === true) {
                this.userIdLists.push(val.userId);
            }
        },
        // 全选
        allElection (even) {
            console.log(even);
            if (even) {
                this.checkModel = true;
            } else {
                this.checkModel = false;
            }
            console.log(this.checkModel);
        }
    },
    watch: {
        userIdLists: {
            handler () {
                this.checkModelAll = (this.userIdLists.length === this.reminderStaffList.length);
            },
            deep: true
        },
        comment (val) {
            console.log(val);
            if (val.length > 2500) {
                this.$message({
                    message: '审批备注最多可填写2500字',
                    type: 'warning'
                });
            }
            this.commentObject.comment = this.comment.substr(0, 2500);
        }
    }
};
</script>
<style lang="scss">
    .gyCommentRemark{
        #testim{
            input{
                color: #4A90E2 !important;
                display: inline-block;
                border: none;
                width: 65px !important;
                background-color: transparent;
                padding: 0;
                readonly:readonly
            }
        }
        #testim:empty:before{
            content:attr(placeholder);
            font-size: 16px;
            color: #999;
        }
        #testim:focus{
            content:none;
        }
        .sublime{
            text-align: right;
            margin-top: 20px;
        }
        .upload{
            color: #4C97FC;
            margin-top: 10px;
            span{
                cursor: pointer;
            }
        }
        .remind{
            margin-top: 3px;
        }
        .remark{
            textarea{
                border: none;
                background: #F9F9F9;
            }
        }
        .el-icon-close{
            position: absolute;
            top: -10px;
            right: 0px;
        }
        .checkbox{
            margin-right: 0px;
        }
        .el-dialog__title{
            font-size: 16px;
            color: #333;
            font-weight: bold;
        }
    }
    .gyReminderStaff{
        .sublime{
            text-align: right;
            margin-top: 20px;
        }
        .el-icon-close{
            position: absolute;
            top: -10px;
            right: 0px;
        }
        .el-dialog__title{
            font-size: 16px;
            color: #333;
            font-weight: bold;
        }
    }
    .gyCommentRemark {
        .el-upload--picture-card {
            line-height: 40px;
        }
        .el-upload--picture-card {
            width: 160px;
            height: 50px;
        }
        .el-upload__text {
            font-size: 12px;
            margin-top: -25px;
        }
        .file-upload .el-icon-upload {
            font-size: 20px;
        }
    }
</style>
