<template>
    <div class="changePassword">
        <div class="title">修改密码</div>
        <div class="gy-form">
            <div class="gy-form-group">
                <label class="l" for="password"><strong>*</strong>当前密码</label>
                <input type="password" id="password" class="gy-input" v-model="form.password" placeholder="请输入当前密码">
            </div>
            <div class="tips">
                <p>密码必须包含大小写字母和数字，不能使用特殊字符，长度在 8-20 之间！</p>
            </div>
            <div class="gy-form-group cl">
                <label class="l" for="newPassword"><strong>*</strong>新密码</label>
                <input maxlength="20" type="password" id="newPassword" class="gy-input" v-model="form.newPassword" placeholder="请输入新密码">
            </div>
            <div class="gy-form-group cl">
                <label class="l" for="newPassword2"><strong>*</strong>确认新密码</label>
                <input maxlength="20" type="password" id="newPassword2" class="gy-input" v-model="form.newPassword2" placeholder="请再次输入新密码">
            </div>
        </div>
        <div class="caoz">
            <button class="gy-button-extra" @click="submit(form)">保存</button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                password: null,
                newPassword: null,
                newPassword2: null
            }
        };
    },
    methods: {
        submit (form) {
            if (!form.password) {
                this.$message.error('请输入当前密码');
                return false;
            }
            if (!this.check(form.newPassword, '新')) return false;
            if (form.password === form.newPassword) {
                this.$message.error('当前密码和新密码不可一致');
                return false;
            }
            if (!this.check(form.newPassword2, '确认新')) return false;
            if (form.newPassword !== form.newPassword2) {
                this.$message.error('两次输入的密码不一致');
                return false;
            }
            this.$http.post(this.$api.user.modify, form).then(res => {
                if (res.data.code === 0) {
                    this.$router.push({name: 'login'});
                    this.$message.success(res.data.message);
                    return false;
                }
                this.$message.error(res.data.message);
            });
        },
        check (val, name) {
            if (!val) {
                this.$message.error(`请输入${name}密码`);
                return false;
            }
            let reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/;
            if (!reg.test(val)) {
                this.$message.error(`${name}密码格式不正确`);
                return false;
            }
            return true;
        }
    }
};
</script>

<style scoped lang="scss">
    .changePassword {
        .title {
            font-size: 14px;
            color: #333333;
            margin: 20px 16px;
            font-weight: bold;
        }
        .tips {
            display: inline-block;
            padding: 8px 0;
            min-height: 46px;
            line-height: 30px;
        }
        .caoz {
            text-align: right;
            padding-right: 16px;
        }
    }
</style>
