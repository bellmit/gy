<template>
  <div class="detail-info gy-form">
    <div class="gy-form-group">
          <span class="l">
            <strong>*</strong>
            账户
          </span>
      <input type="text" v-model="form.account" placeholder="请输入账户">
    </div>
    <div class="gy-form-group">
          <span class="l">
            用户名
          </span>
      <input type="text" v-model="form.username" placeholder="请输入账户">
    </div>
    <div class="gy-form-group">
          <span class="l">
            手机号
          </span>
      <input type="text" v-model="form.phone" placeholder="请输入手机号">
    </div>
    <div class="gy-form-group">
          <span class="l">
            邮箱
          </span>
      <input type="text" v-model="form.email" placeholder="请输入邮箱">
    </div>
    <div class="gy-form-group">
          <span class="l">
            性别
          </span>
      <el-radio-group v-model="form.sex" style="padding-top: 8px">
        <el-radio :label="0">男</el-radio>
        <el-radio :label="1">女</el-radio>
      </el-radio-group>
    </div>
    <div class="gy-form-group">
          <span class="l">
            备注
          </span>
      <input type="text" v-model="form.remark" placeholder="请输入备注">
    </div>
    <div class="gy-button-group">
      <button type="button" class="gy-button-extra" @click.stop="toSubmit">保存</button>
      <button class="gy-button-normal" @click="$router.push({path: 'list'})">取消</button>
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
                sex: 0
            },
            rules: {
                account: [
                    { required: true, message: '请输入账户', trigger: 'blur' }
                ],
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        toSubmit () {
            if (!this.form.account) {
                this.$message.warning('请输入账户');
                return false;
            }
            if (!this.form.username) {
                this.$message.warning('请输入用户名');
                return false;
            }
            let method = this.id ? 'put' : 'post';
            let dataObj = {
                'username': this.form.username,
                'remark': this.form.remark,
                'phone': this.form.phone,
                'email': this.form.email,
                'account': this.form.account,
                // 'password': _this.form.password,
                'sex': this.form.sex
            };
            if (this.id) {
                dataObj.id = this.id;
            }
            this.$http({
                url: this.$api.memberPersonal.manage,
                method: method,
                data: dataObj
            }).then(({data}) => {
                if (data.code === 0) {
                    this.$router.push({path: 'list'});
                    this.$message.success('保存成功!');
                }
            }).catch(() => {
            });
        },
        getData (id) {
        // ID有值说明为修改
            if (id) { this.id = id; }
            this.$http.get(this.$api.memberPersonal.info + id).then(({data}) => {
                if (data.code === 0) {
                    this.form = data.data;
                }
            }).catch((e) => {
            });
        }
    },
    created () {
        let id = this.$route.query.id;
        this.getData(id);
    }
};
</script>
<style scoped lang="scss">
  .detail-info{
    padding: 20px 0 0 ;
  }
  .gy-form-group {
    padding-left: 62px;
    .l {
      width: 52px;
    }
  }
  .gy-form-group:nth-child(odd) {
    padding-right: 30px;
  }
  .gy-form-group:nth-child(even) {
    padding-left: 92px;
    .l {
      width: 82px;
      padding-left: 30px;
    }
  }
</style>
