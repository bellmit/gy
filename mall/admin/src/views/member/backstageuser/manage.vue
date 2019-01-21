<template>
    <div>
        <div class="detail-info">
            <el-form ref="form" :model="form" label-width="70px" :rules="rules">
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="账户" prop="account">
                            <el-input v-model="form.account" placeholder="请输入账户"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="手机号">
                            <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="性别">
                            <el-radio-group v-model="form.sex">
                                <el-radio :label="0">男</el-radio>
                                <el-radio :label="1">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                        <el-form-item label="备注">
                            <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </el-col>
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
                }
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
</style>
