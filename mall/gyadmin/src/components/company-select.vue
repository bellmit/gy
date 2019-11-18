<!--
  公司选择组件
-->

<template>
    <div class="company-select my-company-select">
        <div class="company-select-picker">
          <div class="companylist">
              <input type="text" class="gy-input" placeholder="请输入公司名" v-model="keywords" @keyup.13="handleGetList" :disabled="defaultProduct">
              <ul v-show="showList" v-clickOutside="handleHiddenList">
                  <li v-for="(item, index) in list" :key="index" @click="handleList(item)" v-if="list.length > 0">{{item.companyName}}</li>
              </ul>
              <i class="iconfont icon-mySearch" @click="handleGetList"></i>
              <span v-show="showList">
                <el-button v-if="list.length === 0" class="company-select-btn company-Btn" @click="dialogFormVisible = true" type="danger" icon="el-icon-plus" circle></el-button>
              </span>
          </div>
        </div>

        <el-dialog title="公司信息录入" :visible.sync="dialogFormVisible">
            <div class="gy-form my-form">
              <div class="gy-form-group">
                <span class="l"><i>*</i> 公司名称</span>
                <input class="gy-input" v-model="form.companyName" placeholder="请输入公司名称">
              </div>
              <div class="gy-form-group">
                <span class="l">公司电话</span>
                <input class="gy-input" v-model="form.companyPhone" placeholder="请输入公司电话">
              </div>
              <div class="gy-form-group">
                <span class="l"><i>*</i> 公司类型</span>
                <el-select v-model="form.companyTypeId" placeholder="请选择公司类型">
                  <el-option v-for="(item, index) in companyTypeData" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
              <div class="gy-form-group">
                <span class="l"><i>*</i> 省</span>
                <el-select v-model="form.provinceId" placeholder="请选择省份" @change="handleProvince">
                  <el-option v-for="item in area.province" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
              <div class="gy-form-group">
                <span class="l"><i>*</i> 市</span>
                <el-select v-model="form.cityId" placeholder="请选择城市" @change="handleDelivery">
                  <el-option v-for="item in area.city" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
              <div class="gy-form-group">
                <span class="l"><i>*</i> 区</span>
                <el-select v-model="form.districtId" placeholder="请选择区县">
                  <el-option v-for="item in area.district" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
              <div class="gy-form-group">
                <span class="l"><i>*</i> 公司地址</span>
                <input class="gy-input" v-model="form.address" placeholder="请输入公司地址">
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
const clickOutside = {
    bind (el, binding) {
        function documentHandler (e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.vueClickOutside = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    unbind (el) {
        document.removeEventListener('click', el.vueClickOutside);
        delete el.vueClickOutside;
    }
};
export default {
    name: 'companySelect',
    props: {
        value: [String, Number],
        selected: {
            type: Object,
            defalult: {}
        },
        defaultProduct: String,
        defaultCpmpany: String,
        offerId: String
    },
    directives: {
        clickOutside
    },
    data () {
        return {
            keywords: '',
            list: [],
            showList: false,
            lastTime: null,
            area: {
                province: [],
                city: [],
                district: []
            },
            currentValue: '',
            dialogFormVisible: false,
            formLabelWidth: '100px',
            form: {
                companyName: '',
                companyPhone: '',
                companyTypeId: '',
                provinceId: '',
                cityId: '',
                districtId: '',
                address: ''
            },
            companyTypeData: []
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
        this.currentValue = this.value;
        this.address(0, 'province'); // 获取省市区
        this.defaultProduct && (this.keywords = this.defaultProduct);
        this.defaultCpmpany && (this.keywords = this.defaultCpmpany);
        this.getCompanyType();
    },
    methods: {
        getList (e) {
            this.lastTime = e.timeStamp;
            setTimeout(() => {
                if (this.lastTime === e.timeStamp && this.keywords && this.keywords.length > 2) {
                    this.handleGetList();
                }
            }, 500);
        },
        getCompanyType () {
            this.$http.get(this.$api.orders.companyType + '1').then(res => {
                this.companyTypeData = res.data.data;
            });
        },
        handleGetList (type) {
            // if (this.keywords.length < 2) {
            //     this.$message.error('请至少输入两个以上文字进行搜索。');
            //     return;
            // }
            this.$http.post(this.$api.orders.creatcompanynew, {
                'companyName': this.keywords,
                'category': 1
            }).then(res => {
                this.list = res.data.data;
                if (type === 1) {
                    this.showList = false;
                } else {
                    this.showList = true;
                }
            });
        },
        handleList (value) {
            this.keywords = value.companyName;
            this.$emit('update:selected', value);
            this.showList = false;
            this.$emit('change', value);
        },
        handleHiddenList () {
            this.showList = false;
        },
        setCurrentValue (value) {
            // 设置当前值
            if (value === this.currentValue) return;
            this.currentValue = value;
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
                    this.currentValue = this.form.companyName;
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    Object.assign(this.$data.form, this.$options.data().form);
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
.my-form {
  .gy-form-group .l {
      width: 70px;
      i {
        color: red;
        display: inline-block;
        vertical-align: middle;
      }
  }
}
.companylist{
    position: relative;
    width: 100%;
    .company-Btn {
        position: absolute;
        right: -35px;
        top: 0;
        line-height: 17px;
    }
    ul{
        background-color: #fff;
        width: 100%;
        max-height: 200px;
        overflow: auto;
        position: absolute;
        left: 0;
        top: 30px;
        z-index: 9;
        border: 1px solid $color-border;
        border-top: none;
        li{
            padding: 5px 10px;
            cursor: pointer;
            &:hover{
                background-color: #f5f7fa;
                color: $color-extra;
            }
            &.none-tips{
                font-size: $small-font;
                text-align: center;
            }
        }
    }
    .icon-mySearch{
        position: absolute;
        right: 0;
        top: 0;
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
<style lang="scss">
.my-company-select {
    // .el-form-item.is-error .el-input__inner {
    //    border-color: #e7ecf1 !important;
    // }
    .el-input__inner {
       border-color: #e7ecf1 !important;
    }
}
</style>
