<template>
    <div class="sellerOrder resource">
        <div class="gy-h4">发起订单</div>
        <el-form :model="info" ref="form" label-width="130px" size="mini" class="demo-ruleForm order-add">
            <div class="gy-h5" style="padding: 14px 0"><i class="el-icon-tickets"></i>基础信息</div>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="品名" class="mr-60" prop="deliveryType" :required="true">
                        <product-search :selected.sync="selectedProduct" @updateselected="updateselected" :defaultProduct="goodsName" :offerId="findData.enquiryFromId"></product-search>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="交割库" prop="deliveryWarehouseName" :required="true">
                        <input  type="text" v-model="info.orderItemList[0].deliveryWarehouseName" >
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row >
                <el-col :span="12">
                    <el-form-item label="单价(元/吨)" class="mr-60" prop="skuPrice" :required="true">
                        <input  type="text" v-model="info.orderItemList[0].skuPrice" >
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="交割期" :required="true">
                        <el-date-picker
                          v-model="orderTimes"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="timestamp">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row >
                <el-col :span="12">
                    <el-form-item label="数量" class="mr-60" prop="skuPrice" :required="true">
                        <input  type="text" v-model="info.orderItemList[0].skuQuantity" >
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="总金额" prop="skuPrice" :required="true">
                        {{settleAmount}}
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="gy-h5" style="padding: 12px 0"><i class="el-icon-tickets"></i>详细信息</div>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="买方公司名" class="mr-60" prop="buyerCompanyName" :required="true">
                        <gy-company-select @change="buyChange" :selected.sync="selectedProduct" :defaultProduct="companyName" :offerId="findData.enquiryFromId"></gy-company-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12" style="margin-left: 0;">
                    <el-form-item label="卖方公司名" prop="sellerCompanyName" :required="true">
                        <gy-company-select @change="selChange" :selected.sync="selectedProduct" :defaultProduct="companyName" :offerId="findData.enquiryFromId"></gy-company-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="买方保证金(%)" class="mr-60" prop="deliveryDetailedAddress" :required="true">
                        <input type="text" v-model="info.depositRatio">
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="卖方保证金额(%)" class="bao" prop="warehouseFreeDays" :required="true">
                        <input  type="text" v-model="info.sellerDepositRatio">
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row >
                <el-col :span="12">
                    <el-form-item label="货源" class="mr-60" prop="deliveryType" :required="true">
                        <el-select v-model="info.skuOrigin" placeholder="请选择">
                            <el-option
                              v-for="item in skuOriginOption"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="成交时间" :required="true">
                        <el-date-picker
                          v-model="info.transactionDate"
                          type="date"
                          placeholder="选择日期"
                          value-format="timestamp">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="卖方联系人" class="mr-60" prop="deliveryDetailedAddress" :required="true">
                        <!-- <input type="text" v-model="info.sellerContact"> -->
                        <contacts-search :selecteds.sync="selectedProduct" @updateselectedsell="updateselectedsell" :contactData="contacta" :contactSel="contactaSell"></contacts-search>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="卖方联系人方式" class="bao" prop="warehouseFreeDays" :required="true">
                        <input  type="text" v-model="info.sellerContactMobile">
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="买方联系人" class="mr-60" prop="deliveryDetailedAddress" :required="true">
                        <!-- <input  type="text" v-model="info.buyerContact"> -->
                        <contacts-search :selecteds.sync="selectedProduct" @updateselectedbuy="updateselectedbuy" :contactData="contacta" :contactSel="contactaBuy"></contacts-search>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="买方联系人方式" class="bao" prop="warehouseFreeDays" :required="true">
                        <input  type="text" v-model="info.buyerContactMobile">
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="买方撮合业务员" class="mr-60" prop="deliveryDetailedAddress" :required="true">
                        <!-- <input  type="text" v-model="info.buyerMatchName"> -->
                        <together-business :selecteds.sync="selectedProduct" @updateselectedMatchBuy="updateselectedbuyMatch" :contactMatch="contactMatchBuy"></together-business>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="卖方撮合业务员" class="bao" prop="warehouseFreeDays" :required="true">
                        <!-- <input  type="text" v-model="info.sellerMatchName"> -->
                        <together-business :selecteds.sync="selectedProduct" @updateselectedMathcSell="updateselectedsellMatch" :contactMatch="contactMatchSell"></together-business>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row class="gy-btn-bottom">
            <el-col>
                <button class="gy-button-extra" @click.prevent="addMatchOrder()"> 生成订单</button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import gyCompanySelect from '@/components/company-select';
import productSearch from '@/components/productSearch';
import contactsSearch from '@/components/contactsSearch';
import togetherBusiness from '@/components/togetherBusiness';

export default {
    components: {
        gyCompanySelect,
        productSearch,
        contactsSearch,
        togetherBusiness
    },
    data () {
        return {
            selectedProduct: {},
            goodsName: null,
            bidId: null,
            companyName: null,
            findData: {
                enquiryFromId: null
            },
            contactData: {},
            orderTime: '',
            orderTimes: '',
            info: {
                currentUserId: '', // 登录用户
                depositAmount: '', // 总金额
                sellerCompanyId: '', // 卖方公司ID
                sellerCompanyName: '', // 卖方公司名
                depositRatio: '10', // 买方保证金(%)
                sellerDepositRatio: '0', // 卖方保证金(%)
                skuOrigin: '国产', // 货源
                sellerContact: '', // 卖方联系人
                sellerContactMobile: '', // 卖方联系方式 电话
                buyerCompanyId: '', // 买方公司ID
                buyerCompanyName: '', // 买方公司名
                buyerContact: '', // 买方联系人
                buyerContactMobile: '', // 买方联系方式 电话
                buyerMatchName: '', // 买方撮合业务员
                sellerMatchName: '', // 卖方撮合业务员
                transactionDate: '', // 成交时间
                orderItemList: [
                    {
                        prdSkuId: '',
                        skuName: '',
                        skuPictureUrl: '',
                        skuQuantity: '',
                        skuPrice: '',
                        deliveryBeginDate: '',
                        deliveryEndDate: '',
                        deliveryWarehouseName: ''
                    }
                ]
            },
            deliveryDate: [], // 存时间
            deliveryTypeOption: [
                {
                    value: 1,
                    label: '买家自提'
                },
                {
                    value: 2,
                    label: '卖家送货'
                }],
            provideInvoiceOption: [{
                value: 0,
                label: '交割当月发票'
            },
            {
                value: 1,
                label: '交割次月发票'
            }],
            skuOriginOption: [{
                value: '国产',
                label: '国产'
            },
            {
                value: '进口',
                label: '进口'
            }],
            isBatchDeliveryo: [{
                value: 0,
                label: '否'
            },
            {
                value: 1,
                label: '是'
            }],
            restaurants: [],
            usersName: '',
            oje: {},
            company: '',
            company1: '',
            isCompany: false,
            isCompany1: false,
            contacta: {
                sellerCompanyId: null,
                buyerCompanyId: null
            },
            contactaSell: 1,
            contactaBuy: 2,
            contactMatchSell: 1,
            contactMatchBuy: 2
        };
    },
    computed: {
        settleAmount () {
            return this.info.orderItemList[0].skuQuantity.length > 0 ? this.info.orderItemList.reduce((total, item) => {
                return total + item.skuQuantity * item.skuPrice;
            }, 0) : 0;
        }
    },
    created () {
        this.info.currentUserId = JSON.parse(localStorage.userInfo).id;
        // this.getCompany();
        this.getUserName();
    },
    methods: {
        // 生成订单
        addMatchOrder () {
            if (!this.check()) {
                return false;
            }
            this.info.orderItemList[0].deliveryBeginDate = this.orderTimes[0];
            this.info.orderItemList[0].deliveryEndDate = this.orderTimes[1];
            this.info.depositAmount = this.settleAmount;
            this.$http.post(this.$api.matchmak.addMatchOrder, this.info)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$router.push({name: 'orderAdditionalList'});
                    }
                });
        },
        // 本页面买方
        handleSelect (item) {
            this.info.buyerContact = item.username;
            this.info.buyerContactMobile = item.companyPhone;
            this.info.buyerCompanyName = item.value;
            this.info.buyerCompanyId = item.id;
        },
        // 组件买方
        buyChange (item) {
            this.contacta.componyId = item.companyId;
            console.log(item);
            this.info.buyerContact = item.username;
            this.info.buyerContactMobile = item.contactPhone;
            this.info.buyerCompanyName = item.companyName;
            this.info.buyerCompanyId = item.companyId;
            this.contacta.buyerCompanyId = this.info.buyerCompanyId;
        },
        // 本页面卖方
        handleSelect1 (item) {
            this.info.sellerCompanyName = item.value;
            this.info.sellerContactMobile = item.companyPhone;
            this.info.sellerContact = item.username;
            this.info.sellerCompanyId = item.companyId;
        },
        // 组件卖方
        selChange (item) {
            this.contacta.componyId = item.companyId;
            this.info.sellerCompanyName = item.companyName;
            this.info.sellerContactMobile = item.contactPhone;
            this.info.sellerContact = item.username;
            this.info.sellerCompanyId = item.companyId;
            this.contacta.sellerCompanyId = this.info.sellerCompanyId;
        },
        // getCompany () {
        //     this.$http.get(this.$api.orders.creatOrderCompanies).then(function (res) {
        //         if (res.data.code === 0) {
        //             let param = {};
        //             for (let i = 0; i < res.data.data.length; i++) {
        //                 param.value = res.data.data[i].companyName;
        //                 param.id = res.data.data[i].companyId;
        //                 param.username = res.data.data[i].username;
        //                 param.companyPhone = res.data.data[i].companyPhone;
        //                 param = {};
        //             }
        //             console.log('-------');
        //         } else {
        //             console.log('服务器繁忙');
        //         }
        //     });
        // },
        // 品名选择
        selectGet (vId) {
            this.obj = this.usersName.find((item) => {
                if (item.id === vId) {
                    this.info.orderItemList[0].prdSkuId = item.id;
                    this.info.orderItemList[0].skuName = item.goodsName;
                    this.info.orderItemList[0].skuPictureUrl = item.productUrl;
                    return false;
                }
            });
        },
        updateselected (item) {
            this.info.orderItemList[0].prdSkuId = item.id;
            this.info.orderItemList[0].skuName = item.goodsName;
            this.info.orderItemList[0].skuPictureUrl = item.productUrl;
            this.info.orderItemList[0].skuCode = item.skuCode;
            this.info.orderItemList[0].deliveryDateFlag = '1';
        },
        // 卖方联系人
        updateselectedsell (item) {
            console.log(item, '卖方联系人');
            if (item instanceof Object) {
                this.info.sellerContact = item.contactName;
                this.info.sellerContactMobile = item.contactMobile;
            } else {
                this.info.sellerContact = item;
            }
            console.log(this.info);
        },
        // 买方联系人
        updateselectedbuy (item) {
            console.log(item, '买方联系人');
            if (item instanceof Object) {
                this.info.buyerContact = item.contactName;
                this.info.buyerContactMobile = item.contactMobile;
            } else {
                this.info.buyerContact = item;
            }
            console.log(this.info);
        },
        // 买方撮合
        updateselectedbuyMatch (item) {
            if (item instanceof Object) {
                this.info.buyerMatchName = item.matchContactName;
            } else {
                this.info.buyerMatchName = item;
            }
            console.log(this.info, '买方');
        },
        // 卖方撮合
        updateselectedsellMatch (item) {
            if (item instanceof Object) {
                this.info.sellerMatchName = item.matchContactName;
            } else {
                this.info.sellerMatchName = item;
            }
            console.log(this.info, '卖方');
        },
        // 卖方
        // 初始化基础数据
        getUserName () {
            this.$http.get(this.$api.user.userName).then((res) => {
                if (res.data.code === 0) {
                    this.usersName = res.data.data;
                } else {
                    console.log('服务器繁忙');
                }
            });
        },
        // 验证
        check () {
            if (!this.info.orderItemList[0].skuName) {
                this.$message.error('品名不能为空');
                return false;
            }
            if (!this.info.orderItemList[0].deliveryWarehouseName) {
                this.$message.error('交割库不能为空');
                return false;
            }
            if (!this.info.orderItemList[0].skuPrice) {
                this.$message.error('单价不能为空');
                return false;
            }
            if (!this.orderTimes[0] || !this.orderTimes[1]) {
                this.$message.error('交割期不能为空');
                return false;
            }
            if (!this.info.orderItemList[0].skuQuantity) {
                this.$message.error('数量不能为空');
                return false;
            }
            // 13
            if (!this.info.buyerCompanyName) {
                this.$message.error('买方公司名不能为空');
                return false;
            }
            if (!this.info.sellerCompanyName) {
                this.$message.error('卖方公司名不能为空');
                return false;
            }
            if (!this.info.depositRatio) {
                this.$message.error('买方保证金不能为空');
                return false;
            }
            if (!this.info.sellerDepositRatio) {
                this.$message.error('卖方保证金不能为空');
                return false;
            }
            if (!this.info.skuOrigin) {
                this.$message.error('货源不能为空');
                return false;
            }
            if (!this.info.transactionDate) {
                this.$message.error('成交时间不能为空');
                return false;
            }
            if (!this.info.sellerContact) {
                this.$message.error('卖方联系人不能为空');
                return false;
            }
            if (!this.info.sellerContactMobile) {
                this.$message.error('卖方联系人方式不能为空');
                return false;
            }
            if (!this.info.buyerContact) {
                this.$message.error('买方联系人不能为空');
                return false;
            }
            if (!this.info.buyerContactMobile) {
                this.$message.error('买方联系人方式不能为空');
                return false;
            }
            if (!this.info.buyerMatchName) {
                this.$message.error('买方撮合业务员不能为空');
                return false;
            }
            if (!this.info.sellerMatchName) {
                this.$message.error('卖方撮合业务员不能为空');
                return false;
            }
            return true;
        }
    }
};
</script>

<style lang="scss" scoped>
.sellerOrder.resource{
    .el-card__header {
        /*padding: 10px 20px;*/
        .title {
            color: $color-title;
            font-size: 16px;
            margin-right: 24px
        }
    }
    .el-autocomplete{width:100%}
    .sellerOrder{
        .el-form-item__label{
            text-align: left;
        }
    }
    .gy-btn-bottom {
        padding-top: 20px;
        text-align: right;
    }
    .demo-ruleForm {
        p {
            font-size: 16px;
            margin-bottom: 12px;
            padding-top: 15px;
            color: #333;
        }
        .el-row {
            margin-left: 14px;
        }
    }
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
        margin-bottom: 0;
    }
    .inline-input,.inline-inputs{
        /*width: 368.5px;*/
    }
    .el-autocomplete.inline-input .el-form-item--mini .el-form-item__error{
        z-index: 22;
    }
}
.el-icon-tickets {
  margin-right: 7px;
}
</style>
