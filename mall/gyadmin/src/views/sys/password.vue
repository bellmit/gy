<template>
    <div class="commodity-main detail commodity-attribute">
        <div class="gy-h4">修改密码</div>
        <div id="password_form">
            <el-form ref="form" :model="form" label-width="93px" :rules="rules">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="用户名称" class="mr-60">
                      <el-input v-model="form.account" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="旧密码" prop="password" v-if="!form.id">
                    <el-input v-model="form.password" type="password" placeholder="请输入旧密码"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="新密码确认" prop="newPassword2">
                    <el-input v-model="form.newPassword2" type="password" placeholder="请输入新密码"></el-input>
                </el-form-item>
                </el-col>
              </el-row>
                <el-form-item class="gy-button-group">
                    <el-button type="primary" @click.stop="verificationForm('form')">保存</el-button>
                    <el-button @click.stop="jumpUrl()">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="color: red;">
            密码必须包含大小写字母和数字，不能使用特殊字符，长度在 8-20 之间！
        </div>
    </div>
</template>
<script>
export default {
    data () {
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('新密码不能为空'));
            } else {
                if (this.form.newPassword2 !== '') {
                    this.$refs.form.validateField('newPassword2');
                }
                callback();
            }
        };
        let validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('确认新密码不能为空'));
            } else if (value !== this.form.newPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            rules: {
                newPassword: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                newPassword2: [
                    { required: true, validator: validatePass2, trigger: 'blur' }
                ]
            },
            form: {
                id: '',
                newPassword: '',
                newPassword2: '',
                password: '',
                userId: 0,
                account: ''
            },
            userInfo: JSON.parse(localStorage.getItem('userInfo'))
        };
    },
    watch: {
        $route (to) {
            this.getParam();
        }
    },
    created () {
        this.getParam();
    },
    methods: {
        jumpUrl () {
            this.$router.go(-1);
        },
        getParam () {
            this.form.id = this.$route.query.id;
            this.form.account = this.$route.query.account;
            this.rules.password = [{ required: true, message: '旧密码不能为空', trigger: 'blur' }]; // 设置初使值验证
            if (this.form.id) {
                this.rules.password = null; // 阻止验证
            }
        },
        verificationForm (form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.submitForm();
                } else {
                    return false;
                }
            });
        },
        submitForm () {
            let url = '';
            let dataObj = {};
            if (this.form.id) {
                dataObj.id = this.form.id;
                dataObj.password = this.form.newPassword;
                dataObj.password2 = this.form.newPassword2;
                url = this.$api.password.reset; // 重置密码（管理员重置别人的密码）
            } else {
                dataObj.password = this.form.password;
                dataObj.newPassword = this.form.newPassword;
                dataObj.newPassword2 = this.form.newPassword2;
                url = this.$api.password.modify; // 修改密码（自己修改自己的密码）
            }
            this.$http({
                url: url,
                method: 'post',
                data: dataObj
            }).then(({data}) => {
                if (data.code === 0) {
                    this.$message.success('保存成功');
                    this.$router.go(-1);
                }
            }).catch(() => {
            });
        }
    }
};
</script>
<style scoped lang="scss">
</style>
