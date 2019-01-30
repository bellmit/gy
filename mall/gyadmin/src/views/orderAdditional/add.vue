<template>
    <div class="sellerOrder resource">
        <div class="gy-h4">发起订单</div>
        <el-form :model="info" ref="form" label-width="118px" size="mini" class="demo-ruleForm order-add">
            <div class="gy-h5" style="padding: 14px 0"><i class="el-icon-tickets"></i>基础信息</div>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="品名" class="mr-60" prop="deliveryType">
                        <el-select v-model="info.deliveryType" @change="selectGet" placeholder="请选择">
                            <el-option
                              v-for="item in usersName"
                              :key="item.id"
                              :label="item.goodsName"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="交割库" prop="deliveryWarehouseName">
                        <input  type="text" v-model="info.orderItemList[0].deliveryWarehouseName" >
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row >
                <el-col :span="12">
                    <el-form-item label="单价(元/吨)" class="mr-60" prop="skuPrice">
                        <input  type="text" v-model="info.orderItemList[0].skuPrice" >
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="交割期">
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
                    <el-form-item label="数量" class="mr-60" prop="skuPrice">
                        <input  type="text" v-model="info.orderItemList[0].skuQuantity" >
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="总金额" prop="skuPrice">
                        {{settleAmount}}
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="gy-h5" style="padding: 12px 0"><i class="el-icon-tickets"></i>详细信息</div>
            <el-row>
                <el-col :span="12" v-if="!isCompany">
                    <el-form-item label="买方公司名" class="mr-60" prop="buyerCompanyName">
                        <el-autocomplete
                          class="inline-input"
                          v-model="info.buyerCompanyName"
                          :fetch-suggestions="querySearch"
                          placeholder="请输入内容"
                          @select="handleSelect"
                          :trigger-on-focus="false"
                        ></el-autocomplete>
                    </el-form-item>
                </el-col>
                <!-- company-select -->
                <el-col :span="12" v-else>
                    <el-form-item label="买方公司名">
                      <gy-company-select v-model="company" @change="buyChange"></gy-company-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12" v-if="!isCompany1" style="margin-left: 0;">
                    <el-form-item label="卖方公司名" prop="sellerCompanyName">
                        <el-autocomplete
                          class="inline-inputs"
                          v-model="info.sellerCompanyName"
                          :fetch-suggestions="querySearch1"
                          placeholder="请输入内容"
                          @select="handleSelect1"
                          :trigger-on-focus="false"
                        ></el-autocomplete>
                    </el-form-item>
                </el-col>
                <!-- company-select1 -->
                <el-col :span="12" v-else>
                    <el-form-item label="卖方公司名">
                      <gy-company-select v-model="company1" @change="selChange"></gy-company-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="买方保证金(%)" class="mr-60" prop="deliveryDetailedAddress">
                        <input type="text" v-model="info.depositRatio">
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="卖方保证金额(%)" class="bao" prop="warehouseFreeDays">
                        <input  type="text" v-model="info.sellerDepositRatio">
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row >
                <el-col :span="12">
                    <el-form-item label="货源" class="mr-60" prop="deliveryType">
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
                    <el-form-item label="成交时间">
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
                    <el-form-item label="卖方联系人" class="mr-60" prop="deliveryDetailedAddress">
                        <input type="text" v-model="info.sellerContact">
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="卖方联系人方式" class="bao" prop="warehouseFreeDays">
                        <input  type="text" v-model="info.sellerContactMobile">
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="买方联系人" class="mr-60" prop="deliveryDetailedAddress">
                        <input  type="text" v-model="info.buyerContact">
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="买方联系人方式" class="bao" prop="warehouseFreeDays">
                        <input  type="text" v-model="info.buyerContactMobile">
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="买方撮合业务员" class="mr-60" prop="deliveryDetailedAddress">
                        <input  type="text" v-model="info.buyerMatchName">
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="卖方撮合业务员" class="bao" prop="warehouseFreeDays">
                        <input  type="text" v-model="info.sellerMatchName">
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="gy-btn-bottom">
                <el-col>
                    <el-form-item>
                        <button class="gy-button-extra" @click.prevent="addMatchOrder()"> 生成订单</button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import gyCompanySelect from '@/components/company-select';

export default {
    components: {
        gyCompanySelect
    },
    data () {
        return {
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
            isCompany1: false
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
        this.getCompany();
        this.getUserName();
    },
    methods: {
        // 生成订单
        addMatchOrder () {
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
        // 买方公司名
        querySearch (queryString, cb) {
            let restaurants = this.restaurants;
            let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            if (results.length === 0) {
                this.isCompany = true;
            }
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        querySearch1 (queryString, cb) {
            let restaurants = this.restaurants;
            let results = queryString ? restaurants.filter(this.createFilter1(queryString)) : restaurants;
            if (results.length === 0) {
                this.isCompany1 = true;
            }
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter (queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        createFilter1 (queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
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
            this.info.buyerContact = item.username;
            this.info.buyerContactMobile = item.companyPhone;
            this.info.buyerCompanyId = item.companyId;
        },
        // 本页面卖方
        handleSelect1 (item) {
            this.info.sellerCompanyName = item.value;
            this.info.sellerContactMobile = item.companyPhone;
            this.info.sellerContact = item.username;
            this.info.sellerCompanyId = item.id;
        },
        // 组件卖方
        selChange (item) {
            this.info.sellerContact = item.username;
            this.info.sellerContactMobile = item.companyPhone;
        },
        getCompany () {
            this.$http.get(this.$api.orders.creatOrderCompanies).then(function (res) {
                if (res.data.code === 0) {
                    let param = {};
                    for (let i = 0; i < res.data.data.length; i++) {
                        param.value = res.data.data[i].companyName;
                        param.id = res.data.data[i].companyId;
                        param.username = res.data.data[i].username;
                        param.companyPhone = res.data.data[i].companyPhone;
                        this.restaurants.push(param);
                        param = {};
                    }
                } else {
                    console.log('服务器繁忙');
                }
            });
        },
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
            if (!this.info.deliveryType) {
                this.$message.error('品名不能为空');
                return false;
            }
            if (!this.info.orderItemList[0].deliveryWarehouseName) {
                this.$message.error('交割库不能为空');
                return false;
            }
            if (!this.info.orderItemList[0].skuPrice) {
                this.$message.error('单价能为空');
                return false;
            }
            if (!this.info.orderItemList[0].deliveryBeginDate || !this.info.orderItemList[0].deliveryEndDate) {
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
