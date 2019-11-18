<template>
<div>
  <div class="gy-h5"><i class="iconfont icon-info"></i>发布仓储供应单</div>
  <div class="gy-form-box-14">
    <div class="gy-form-group">
      <div class="l"><strong>*</strong>仓储公司</div>
      <div class="">
        <input type="text" v-model="params.companyName" placeholder="请输入" @keyup.enter="searchCompany">
        <i class="iconfont icon-mySearch" @click.stop="searchCompany"></i>
        <div class="managerList" v-if="companyShow" v-clickOutside="companyHide">
          <ul>
            <li v-for="(item,index) in companyList" :key="index" @click="companySelect(item)" v-if="companyList && companyList.length > 0">
              {{item.name}}
            </li>
            <li class="managerEmpty" @click="companyHide" v-if="companyList && companyList.length === 0">没有搜到相关仓储公司</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="gy-form-group">
      <div class="l"><strong>*</strong>品名</div>
      <div class="">
        <input type="text" v-model="params.productName" placeholder="请输入" @keyup.enter="searchProduct">
        <i class="iconfont icon-mySearch" @click.stop="searchProduct"></i>
        <div class="managerList" v-if="productShow" v-clickOutside="productHide">
          <ul>
            <li v-for="(item,index) in productList" :key="index" @click="productSelect(item)" v-if="productList && productList.length > 0">
              {{item.productName}}
            </li>
            <li class="managerEmpty" @click="productHide" v-if="productList && productList.length === 0">没有搜到相关品名</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="gy-form-group">
      <div class="l"><strong>*</strong>空容量</div>
      <div class="content">
        <input type="text" v-model="params.emptyCapacity" placeholder="请输入"><span>m³</span>
      </div>
    </div>
    <div class="gy-form-group">
      <div class="l"><strong>*</strong>仓储单价</div>
      <div class="group-content">
        <div class="c"><input type="text" :disabled="intentionalPrice" v-model="params.intentionalPrice" placeholder="请输入"></div>
        <div class="t">元/立方*月</div>
        <div class="r">
          <span class="el-radio__input" :class="intentionalPrice ? 'is-checked' : ''" @click="intentionalPrice = !intentionalPrice"><span class="el-radio__inner"></span></span>面议
        </div>
      </div>
    </div>
    <div class="gy-form-group">
      <div class="l">联系人</div>
      <div class="">
        <input type="text" v-model="params.contactName" placeholder="请输入">
      </div>
    </div>
    <div class="gy-form-group">
      <div class="l">联系人手机</div>
      <div class="">
        <input type="text" v-model="params.contactMobile" placeholder="请输入">
      </div>
    </div>
  </div>
  <div class="button-wrapper">
    <button type="button" @click="onSubmit" class="gy-button-extra">提交</button>
  </div>
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
    data () {
        return {
            params: {
                companyName: '',
                companyId: null,
                productName: '',
                productId: null,
                emptyCapacity: null,
                depotName: null,
                intentionalPrice: null,
                contactName: null,
                contactMobile: null
            },
            companyShow: false,
            productShow: false,
            companyList: [],
            productList: [],
            intentionalPrice: false
        };
    },
    methods: {
        searchCompany () {
            this.$http.get(this.$api.warehouse.companies + this.params.companyName)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.companyList = res.data.data;
                        this.companyShow = true;
                        this.productShow = false;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        searchProduct () {
            this.productShow = true;
            this.companyShow = false;
            this.$http.get(this.$api.warehouse.products + this.params.productName)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.productList = res.data.data;
                        this.productShow = true;
                        this.companyShow = false;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        companySelect (item) {
            this.companyHide();
            this.params.companyName = item.name;
            this.params.companyId = item.id;
        },
        companyHide () {
            this.companyShow = false;
        },
        productSelect (item) {
            this.productHide();
            this.params.productName = item.productName;
            this.params.productId = item.id;
        },
        productHide () {
            this.productShow = false;
        },
        onSubmit () {
            let params = Object.assign({}, this.params);
            if (!this.params.companyId) {
                this.$message.error('请先选择仓储公司');
                return;
            }
            let companyChk = this.companyList.filter((e) => e.id === this.params.companyId);
            if (companyChk[0].name !== this.params.companyName) {
                this.$message.error('所选仓储公司不存在，请重新选择');
                return;
            }
            if (!this.params.productId) {
                this.$message.error('请先选择品名');
                return;
            }
            let productChk = this.productList.filter((e) => e.id === this.params.productId);
            if (productChk[0].productName !== this.params.productName) {
                this.$message.error('所选品名不存在，请重新选择');
                return;
            }
            if (!this.params.emptyCapacity) {
                this.$message.error('请先填写空容量');
                return;
            }
            if (this.params.emptyCapacity && !/^(0|[1-9]\d*)(\.\d{0,6})?$/.test(this.params.emptyCapacity)) {
                this.$message.error('请填写正确空容量');
                return;
            }
            if (this.intentionalPrice) {
                params.intentionalPrice = 0;
            } else if (!this.params.intentionalPrice) {
                this.$message.error('请先填写意向价格');
                return;
            }
            if (this.params.intentionalPrice && !/^(0|[1-9]\d*)(\.\d+)?$/.test(this.params.intentionalPrice)) {
                this.$message.error('请填写正确意向价格');
                return;
            }
            if (this.params.contactMobile && !/^1([34578])\d{9}$/.test(this.params.contactMobile)) {
                this.$message.error('请填写正确手机号');
                return;
            }
            this.$http.post(this.$api.warehouse.addSheet, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('操作成功');
                        this.resetForm();
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        resetForm () {
            Object.keys(this.params).forEach((e) => {
                this.params[e] = null;
            });
            this.params = {
                ...this.params,
                companyName: '',
                productName: '',
                intentionalPrice: false
            };
            this.$router.push({name: 'warehouseIntentionSheet'});
        }
    },
    directives: {
        clickOutside
    }
};
</script>

<style scoped lang="scss">
  .gy-h5 {
    margin: 20px 0 15px 0;
    .icon-info {
      margin-right: 10px;
    }
  }

  .gy-form-group {
    padding-left: 74px;
    height: 46px;
    .l {
      width: 64px;
      padding-left: 8px;
      strong {
        left: 0;
      }
    }
    .icon-mySearch {
      position: absolute;
      right: 16px;
      top: 0;
    }
    .group-content {
      display: flex;
      .c {
        flex: 1;
      }
      .t {
        flex: 0 0 100px;
      }
      .r {
        flex: 0 0 60px;
        &>span{
          margin-right: 10px;
        }
      }
    }
    .content {
      display: flex;
      input {
        flex: 1;
      }
      span {
        flex: 0 0 10px;
      }
    }
  }

  .gy-form-group:nth-child(even) {
    padding-left: 118px;
    padding-right: 0;
    .l {
      width: 108px;
      padding-left: 38px;
      strong {
        left: 28px;
      }
    }
    .managerList {
      left: 119px;
      width: calc(100% - 119px);
    }
  }

  .managerList {
    position: absolute;
    left: 74px;
    top: 30px;
    z-index: 999;
    width: calc(100% - 89px);
    background: #fff;
    overflow: auto;
    ul {
      max-height: 260px;
      overflow: auto;
      padding: 10px 0;
      border: 1px solid $color-border;
      li {
        padding: 0 10px;
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:hover {
          background-color: #f5f7fa;
          color: #4a90e2;
        }
      }
    }
  }

  .gy-form-box-14 {
    padding-top: 4px;
    &:after {
      display: block;
      content: ' ';
      clear: both;
    }
  }

  .button-wrapper {
    margin: 15px 14px 0 0;
    text-align: right;
  }
</style>
