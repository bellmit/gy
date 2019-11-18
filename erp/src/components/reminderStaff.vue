<template>
    <el-dialog class="gyReminderStaff" title="指定提醒人员"
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
                <tr>
                   <td>
                        <el-checkbox
                            label="全选" v-model="checkModelAll" style="font-size: 12px;"
                            @change="allElection($event)"></el-checkbox>
                        <span style="font-size: 12px;" v-if="userIdLists.length !== 0">已选</span>
                        <span style="font-size: 12px;" v-if="userIdLists.length !== 0">{{userIdLists.length}}</span>
                        <span style="font-size: 12px;" v-if="userIdLists.length !== 0">人</span>
                   </td>
                   <td colspan="3"></td>
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
</template>
<script>
export default {
    name: 'reminderStaff',
    props: {
        dialogStaff: Object,
        invoiceStaff: Object
    },
    data () {
        return {
            reminderStaffList: [],
            userIdLists: [],
            isIndeterminate: false,
            checkModel: false,
            checkModelAll: false
        };
    },
    mounted () {
        this.associatedPersonnel();
    },
    methods: {
        // 关闭
        closeStaff () {
            this.dialogStaff.dialogVisibleStaff = false;
        },
        // 确定
        staffSublime () {
            if (this.userIdLists.length === 0) {
                this.$message({
                    message: '请选择指定提醒人员',
                    type: 'warning'
                });
                return;
            }
            this.dialogStaff.dialogVisibleStaff = false;
            this.$emit('reminderStaffUser', this.userIdLists);
            console.log(this.userIdLists);
        },
        // 获取关联人员
        associatedPersonnel () {
            let that = this;
            that.$http.post(that.$api.commentsRematk.staff, that.invoiceStaff).then((res) => {
                if (res.data.code === 0) {
                    that.reminderStaffList = res.data.data;
                }
            });
        },
        // 选择人员
        selectionOfficer (even, val) {
            console.log(this.checkModel);
            if (even === true) {
                this.userIdLists.push(val.userId);
            } else {
                for (var i = 0; i < this.userIdLists.length; i++) {
                    if (val.userId === this.userIdLists[i]) {
                        this.userIdLists.splice(i, 1);
                    }
                }
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
        }
    }
};
</script>
<style lang="scss">
    .gyReminderStaff{
        .sublime{
            text-align: right;
        }
    }
</style>
