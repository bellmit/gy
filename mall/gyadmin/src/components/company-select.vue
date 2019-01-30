<!--
  公司选择组件
-->

<template>
    <div class="company-select">
        <div class="company-select-picker">
          <el-select class="company-select-item" v-model="currentValue" placeholder="请选择" @change="change">
              <el-option
                v-for="(item, index) in company.list"
                :key="index"
                :label="item.companyName"
                :value="item.companyId">
              </el-option>
          </el-select>

          <el-button class="company-select-btn company-Btn" @click="dialogFormVisible = true" type="danger" icon="el-icon-plus" circle></el-button>
        </div>

        <el-dialog title="公司信息录入" :visible.sync="dialogFormVisible">
            <div class="gy-form">
              <div class="gy-form-group">
                <span class="l">公司名字</span>
                <input class="gy-input" v-model="form.companyName" placeholder="请输入公司名称">
              </div>
              <div class="gy-form-group">
                <span class="l">公司电话</span>
                <input class="gy-input" v-model="form.companyPhone" placeholder="请输入公司电话">
              </div>
              <div class="gy-form-group">
                <span class="l">公司类型</span>
                <el-select v-model="form.companyTypeId" placeholder="请选择公司类型">
                  <el-option v-for="(item, index) in companyTypeData" :key="index" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </div>
              <div class="gy-form-group">
                <span class="l">省</span>
                <el-select v-model="form.provinceId" placeholder="请选择省份" @change="handleProvince">
                  <el-option v-for="item in area.province" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
              <div class="gy-form-group">
                <span class="l">市</span>
                <el-select v-model="form.cityId" placeholder="请选择城市" @change="handleDelivery">
                  <el-option v-for="item in area.city" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
              <div class="gy-form-group">
                <span class="l">区</span>
                <el-select v-model="form.districtId" placeholder="请选择区县">
                  <el-option v-for="item in area.district" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
              <div class="gy-form-group">
                <span class="l">公司地址</span>
                <input class="gy-input" v-model="form.address" placeholder="请输入公司地址">
              </div>
              <div class="gy-form-group">
                <span class="l">用户名</span>
                <input class="gy-input" v-model="form.username" placeholder="请输入用户名">
              </div>
              <div class="gy-form-group">
                <span class="l">用户账号</span>
                <input class="gy-input" v-model="form.account" placeholder="请输入用户账号">
              </div>
              <div class="gy-form-group">
                <span class="l">用户邮箱</span>
                <input class="gy-input" v-model="form.userEmail" placeholder="请输入用户邮箱">
              </div>
              <div class="gy-form-group">
                <span class="l">用户电话</span>
                <input class="gy-input" v-model="form.adminPhone" placeholder="请输入用户电话">
              </div>
              <div class="gy-form-group">
                <span class="l">性别</span>
                <el-radio-group v-model="form.sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="0">女</el-radio>
                </el-radio-group>
              </div>
            </div>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addData">确 定</el-button>
          </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'companySelect',
    props: {
        value: [String, Number]
    },
    data () {
        return {
            area: {
                province: [],
                city: [],
                district: []
            },
            currentValue: '',
            company: {
                list: [
                ]
            },
            dialogFormVisible: false,
            formLabelWidth: '100px',
            form: {
                companyName: '',
                companyPhone: '',
                companyTypeId: 1,
                provinceId: '',
                cityId: '',
                districtId: '',
                address: '',
                username: '',
                account: '',
                userEmail: '',
                adminPhone: '',
                sex: 1
            },
            companyTypeData: [
                {
                    value: 1,
                    name: '贸易商'
                // },
                // {
                //     value: 2,
                //     name: '承运商'
                // },
                // {
                //     value: 3,
                //     name: '仓储服务商'
                }
            ]
        };
    },
    watch: {
        'value' (newValue, oldValue) {
            this.setCurrentValue(newValue);
        },
        'currentValue' (newValue, oldValue) {
            this.$emit('input', newValue);
        }
    },
    created () {
        this.getData();
        this.currentValue = this.value;
        this.address(0, 'province'); // 获取省市区
    },
    methods: {
        change (id) {
            let data;
            this.company.list.map(item => {
                if (id === item.companyId) {
                    data = item;
                }
            });
            // console.log(data);
            this.$emit('change', data);
        },
        setCurrentValue (value) {
            // 设置当前值
            if (value === this.currentValue) return;
            this.currentValue = value;
        },
        getData () {
            this.$http.get(this.$api.transport.tradeCompany)
                .then(res => {
                    if (res.data.code === 0) {
                        this.company.list = res.data.data;
                    } else {
                        this.company.list = [];
                    }
                });
        },
        addData () {
            this.submit();
        },
        submit () {
            if (!this.check()) return false;
            this.$http.post(this.$api.orders.companyAdd,
                this.form
            ).then(res => {
                if (res.data.code === 0) {
                    this.dialogFormVisible = false;
                    this.getData();
                    this.currentValue = this.form.companyName;
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            });
        },
        address (id, type) { // 获取地址
            this.$http.get(this.$api.offers.address + id).then((res) => {
                if (type === 'province') {
                    this.area.province = res.data.data;
                } else if (type === 'city') {
                    this.area.city = res.data.data;
                } else if (type === 'district') {
                    this.area.district = res.data.data;
                } else {
                    console.log('地址接口有误');
                }
            });
        },
        handleProvince (item) { // 省改变
            this.address(item, 'city');
        },
        handleDelivery (item) { // 市改变
            this.address(item, 'district');
        },
        check () {
            if (!this.form.companyName) {
                this.$message.error('公司名称不能为空');
                return false;
            }
            if (!this.form.companyPhone) {
                this.$message.error('公司电话不能为空');
                return false;
            }
            if (!this.form.companyTypeId) {
                this.$message.error('公司类型不能为空');
                return false;
            }
            if (!this.form.provinceId) {
                this.$message.error('省份不能为空');
                return false;
            }
            if (!this.form.cityId) {
                this.$message.error('城市不能为空');
                return false;
            }
            if (!this.form.districtId) {
                this.$message.error('区县不能为空');
                return false;
            }
            if (!this.form.address) {
                this.$message.error('公司地址不能为空');
                return false;
            }
            if (!this.form.username) {
                this.$message.error('用户名不能为空');
                return false;
            }
            if (!this.form.account) {
                this.$message.error('用户账号不能为空');
                return false;
            }
            if (!this.form.userEmail) {
                this.$message.error('用户邮箱不能为空');
                return false;
            }
            if (!this.form.adminPhone) {
                this.$message.error('用户电话不能为空');
                return false;
            }
            return true;
        }
    }
};
</script>

<style lang="scss" scoped>
.company-select {
    width: 100%;
    min-width: 300px;
    // 123
    .el-form-item {
      line-height: 50px;
    }
    .company-Btn {
        position: relative;
        left: -15px;
        line-height: 17px;
    }
    &-picker {
        display: flex;
     }

    &-item {
        width: 100%;
        padding-right: 20px;
    }

    &-btn {
        padding: 7px;
     }
}
/deep/ .el-dialog__body {
   padding: 0 20px 0 0;
}
.gy-form-group {
    padding-left: 66px;
    .l {
       width: 56px;
    }
}
.gy-form-group:nth-child(odd) {
  padding-right: 30px;
}
.gy-form-group:nth-child(even) {
  padding-left: 96px;
  .l {
    width: 86px;
    padding-left: 30px;
  }
}
/deep/ .el-dialog__footer {
    padding-top: 0;
}
</style>
