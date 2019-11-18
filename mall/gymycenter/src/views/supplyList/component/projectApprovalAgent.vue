<template>
    <!--代采-->
    <div class="programme-content">
        <div class="gy-form-group1" v-if="!supply.scsAppModel.thirdPartyId">
            <span class="l"><strong>*</strong>供应商</span>
            <div class="c" style="position: relative">
                <input type="text" v-model="appProviderModel.providerItem.supplierCompanyName" placeholder="请输入" @keyup.enter="searchCompany">
                <i class="iconfont icon-mySearch" @click.stop="searchCompany"></i>
                <div class="managerList" v-show="companyShow" v-clickOutside="companyHide">
                    <ul>
                        <li v-for="(item,index) in companyList" :key="index" @click="companySelect(item)" v-if="companyList && companyList.length > 0">
                            {{item.companyName}}
                        </li>
                        <li class="managerEmpty" @click="companyHide" v-if="companyList && companyList.length === 0">没有搜到相关仓储公司</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="gy-form-group1 gy-form-group2">
            <span class="l"><strong>*</strong>销售保证金(%)</span>
            <div class="c">
            <el-input-number v-model="appProviderModel.providerItem.saleContractAmount" :min="0" :step="1"></el-input-number></div>
        </div>
        <div class="gy-form-group1 gy-form-group2">
            <span class="l"><strong>*</strong>采购保证金(%)</span>
            <div class="c">
            <el-input-number v-model="appProviderModel.providerItem.buyContractAmount" :min="0" :step="1"></el-input-number></div>
        </div>
        <div class="gy-form-group1">
            <span class="l"><strong>*</strong>销售追保(%)</span>
            <div class="c">
            <div class="con-flex ipt-num">
                <span class="t1">跌</span>
                <el-input-number class="ipt" v-model="appProviderModel.providerItem.depositRatioSubtract" :min="0" :step="1"></el-input-number>
                <span class="t2">补</span>
                <el-input-number class="ipt" v-model="appProviderModel.providerItem.depositRatioAppend" :min="0" :step="1"></el-input-number>
            </div></div>
        </div>
        <div class="gy-form-group1">
            <span class="l"><strong>*</strong>采购付款方式</span>
            <div class="c">
            <input type="text" v-model="appProviderModel.providerItem.buyPaymentType" class="gy-input" placeholder="请输入"></div>
        </div>
        <div class="gy-form-group1">
            <span class="l"><strong>*</strong>销售订单分批</span>
            <div class="c">
            <el-select v-model="appProviderModel.providerItem.saleIsBatchDelivery" placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
            </el-select></div>
        </div>
        <div class="gy-form-group1">
            <span class="l"><strong>*</strong>采购订单分批</span>
            <div class="c">
            <el-select v-model="appProviderModel.providerItem.buyIsBatchDelivery" placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
            </el-select></div>
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
            companyShow: false,
            companyList: [
            ],
            payType: [
                {
                    lab: 'a',
                    val: 0
                }
            ]
        };
    },
    props: {appProviderModel: Object, supply: Object},
    methods: {
        searchCompany () {
            this.$http.post(this.$api.order.creatOrderCompanies, {
                'companyTypeId': 1, // 1:交易公司  2：承运商
                'name': this.appProviderModel.providerItem.supplierCompanyName
            })
                .then((res) => {
                    if (res.data.code === 0) {
                        this.companyShow = true;
                        this.companyList = res.data.data;
                    }
                })
                .catch(() => {
                    console.log('出错了');
                });
        },
        companyHide () {
            this.companyShow = false;
        },
        companySelect (value) {
            this.appProviderModel.providerItem.supplierCompanyName = value.companyName;
            this.appProviderModel.providerItem.supplierCompanyId = value.companyId;
            this.companyHide();
        }
    },
    directives: {
        clickOutside
    }
};
</script>

<style lang="scss" scoped>
    .managerList {
        position: absolute;
        left: 24px;
        top: 30px;
        z-index: 999;
        width: calc(100% - 24px);
        background: #fff;
        overflow: auto;
        ul {
            max-height: 260px;
            overflow: auto;
            padding: 10px 0;
            border: 1px solid $color-border;
            li {
                padding: 5px 10px;
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
    .icon-mySearch {
        position: absolute;
        right: 0px;
        top: 6px;
        color: $color-main!important;
    }
    /deep/ .ipt-num{
        .el-input__inner {
            padding-left: 30px;
            padding-right: 30px;
        }
    }
</style>
