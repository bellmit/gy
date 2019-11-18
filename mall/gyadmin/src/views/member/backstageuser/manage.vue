<template>
    <div>
        <div class="detail-info">
            <el-form ref="form" :model="form" label-width="70px" :rules="rules">
                <el-row>
                    <div class="gy-form-group">
                        <span class="l"> <strong>*</strong>账户</span>
                        <input type="text" v-model="form.account" placeholder="请输入账户">
                    </div>
                    <div class="gy-form-group">
                        <span class="l"> <strong>*</strong>用户名</span>
                        <input type="text" v-model="form.username" placeholder="请输入用户名">
                    </div>
                </el-row>
                <el-row>
                    <div class="gy-form-group">
                        <span class="l">手机号</span>
                        <input type="text" v-model="form.phone" placeholder="请输入手机号">
                    </div>
                    <div class="gy-form-group">
                        <span class="l"><strong>*</strong>邮箱</span>
                        <input type="text" v-model="form.email" placeholder="请输入邮箱">
                    </div>
                </el-row>
                <el-row>
                    <div class="gy-form-group">
                        <span class="l">性别</span>
                        <el-radio-group v-model="form.sex">
                            <el-radio :label="0">男</el-radio>
                            <el-radio :label="1">女</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">备注</span>
                        <span>
                            <textarea class="gy-textarea" placeholder="请输入备注" v-model="form.remark"></textarea>
                        </span>
                        <!--<input type="text" v-model="form.remark" placeholder="请输入备注">-->
                        <!--<el-form-item label="  备注">-->
                            <!--<el-input v-model="form.remark" placeholder="请输入备注"></el-input>-->
                        <!--</el-form-item>-->
                    </div>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item class="gy-button-group">
                            <button type="button" @click.stop="submitForm('form')" class="gy-button-extra">保存</button>
                            <button @click="$router.push({path: 'list'})" class="gy-button-normal">取消</button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--<el-form-item label="新密码">-->
                <!--<el-input v-model="form.password" type="password"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="确认密码">-->
                <!--<el-input v-model="form.repeatPassword" type="password"></el-input>-->
                <!--</el-form-item>-->

            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            form: {
                username: null,
                remark: null,
                phone: null,
                email: null,
                account: null,
                password: null,
                id: null, // 主键id
                sex: null
            },
            menuList: [],
            menuListTreeProps: {
                children: 'children',
                label: 'name'
            },
            rules: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]
            }
        };
    },
    methods: {
        submitForm (form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.toSubmit();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        toSubmit () {
            let method = this.id ? 'put' : 'post';
            let url = '';
            let dataObj = this.form;
            dataObj.userType = 1;
            if (this.id) {
                dataObj.id = this.id;
                url = this.$api.memberBackStageUser.manage; // 修改操作
            } else {
                url = this.$api.memberBackStageUser.create; // 添加操作
            }
            this.$http({
                url: url,
                method: method,
                data: dataObj
            }).then(({data}) => {
                if (data.code === 0) {
                    this.$router.push({path: 'list'});
                    this.$message.success('保存成功!');
                    return;
                }
                this.$message.error(data.message);
            }).catch((e) => {
            });
        },
        getData (id) {
            // ID有值说明为修改
            if (id) {
                this.id = id;
                this.$http.get(this.$api.memberBackStageUser.info + id).then(({data}) => {
                    if (data.code === 0) {
                        this.form = data.data;
                    }
                }).catch((e) => {
                });
            }
        }
    },
    created () {
        if (this.$route.query.id) {
            this.getData(this.$route.query.id);
        }
    }
};
</script>
<style scoped lang="scss">
.detail-info {
  padding: 15px 0 0 ;
}
.el-form-item__label {
    width: 65px;
}
.gy-form-group{
    padding-left: 60px;
    padding-right: 30px;
    .l{padding-left:10px}
}
.gy-form-group:nth-child(even) {
    padding-left: 90px;
    padding-right: 0;
    .l {
        padding-left: 30px;
        strong{
            left:20px;
        }
    }
}
</style>
