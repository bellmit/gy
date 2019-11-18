<template>
    <div class="transport-wrap married-wrapper">
        <div class="main-title">
            <h2>生成撮合订单</h2>
        </div>
        <div class="detail-box">
            <h3><i class="iconfont icon-info"></i>撮合订单详情</h3>
            <div class="gy-form">
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>买方公司</span>
                    <div class="company-list">
                        <input placeholder="请输入" type="text" class="gy-input" v-model="buyerCompanyName" @keyup.enter="handleSearchComapany(0)">
                        <i class="iconfont icon-mySearch"  @click="handleSearchComapany(0)"></i>
                        <ul class="company-list"  v-show="showBuyerCompany">
                            <li v-for="(item, index) in buyerCompanyList" :key="index" @click="handleSelectComapany(item, 0)" v-if="buyerCompanyList.length > 0">
                                {{item.companyName}}
                            </li>
                            <li class="none-tips" v-if="buyerCompanyList.length === 0">没有搜到相关公司</li>
                        </ul>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>卖方公司</span>
                    <div class="company-list">
                        <input placeholder="请输入" type="text" class="gy-input" v-model="sellerCompanyName" @keyup.enter="handleSearchComapany(1)">
                        <i class="iconfont icon-mySearch"  @click="handleSearchComapany(1)"></i>
                        <ul class="company-list"  v-show="showSellerCompany">
                            <li v-for="(item, index) in sellerCompanyList" :key="index" @click="handleSelectComapany(item, 1)" v-if="sellerCompanyList.length > 0">
                                {{item.companyName}}
                            </li>
                            <li class="none-tips" v-if="sellerCompanyList.length === 0">没有搜到相关公司</li>
                        </ul>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>产品</span>
                    <div class="company-list">
                        <input placeholder="请输入" type="text" class="gy-input" v-model="productName" @keyup.enter="handleSearchProduct">
                        <i class="iconfont icon-mySearch"  @click="handleSearchProduct"></i>
                        <ul class="company-list"  v-show="showProduct">
                            <li v-for="(item, index) in productList" :key="index" @click="handleSelectProduct(item)" v-if="productList.length > 0">{{item.skuName}}</li>
                            <li class="none-tips" v-else>没有搜到相关产品</li>
                        </ul>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>重量</span>
                    <div class="unit">
                        <input type="text" class="gy-input" v-model="createData.dmkOrderQuantity">
                        <span>吨</span>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>价格</span>
                    <div class="unit">
                        <input type="text" class="gy-input" v-model="createData.dmkOrderPrice">
                        <span>元/吨</span>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>交割时间段</span>
                    <div>
                        <el-select class="date-select" v-model="createData.deliveryDateYear" placeholder="选择年">
                            <el-option
                              v-for="item in yearList"
                              :key="item"
                              :label="item"
                              :value="item">
                            </el-option>
                        </el-select><el-select class="date-select" v-model="createData.deliveryDateMonth" placeholder="选择月" @change="handleMonthChange">
                        <el-option
                          v-for="item in monthList"
                          :key="item.id"
                          :label="item.value"
                          :value="item.id">
                        </el-option>
                    </el-select><el-select class="date-select" v-model="createData.deliveryDateMonthType" placeholder="选择时段" v-show="!disableDay">
                        <el-option
                          v-for="item in dayList"
                          :key="item.id"
                          :label="item.value"
                          :value="item.id">
                        </el-option>
                    </el-select>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>交割库</span>
                    <div class="company-list">
                        <input placeholder="请输入" type="text" class="gy-input" v-model="warehouseName" @keyup.enter="handleSearchWarehouse">
                        <i class="iconfont icon-mySearch"  @click="handleSearchWarehouse"></i>
                        <ul class="company-list"  v-show="showWarehouse">
                            <li v-for="(item, index) in warehouseList" :key="index" @click="handleSelectWarehouse(item)" v-if="warehouseList.length > 0">
                                {{item.name}}
                            </li>
                            <li class="none-tips" v-if="warehouseList.length === 0">没有搜到相关交割库</li>
                        </ul>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>免仓期</span>
                    <div class="unit">
                        <input type="text" min="0" class="gy-input" v-model="createData.warehouseFreeDays">
                        <span>天</span>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>保证金(%)</span>
                    <el-input-number v-model="createData.depositRatio" :min="0" :step="1"></el-input-number>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>付款方式</span>
                    <el-select v-model="createData.paymentType" placeholder="请选择">
                        <el-option
                          v-for="item in paywayList"
                          :key="item.id"
                          :label="item.value"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>货源</span>
                    <el-select v-model="createData.skuOrigin" placeholder="请选择">
                        <el-option
                          v-for="item in skuOriginList"
                          :key="item.id"
                          :label="item.value"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l">买方撮合费</span>
                    <div class="unit">
                        <input type="text" class="gy-input" v-model="createData.dmkBuyerPayAmount">
                        <span>元/吨</span>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">卖方撮合费</span>
                    <div class="unit">
                        <input type="text" class="gy-input" v-model="createData.dmkSellerPayAmount">
                        <span>元/吨</span>
                    </div>
                </div>
                <div class="gy-form-button">
                    <a href="javascript:;" class="gy-button-extra" @click="formSubmit(0)" v-if="!orderId">提交</a>
                    <a href="javascript:;" class="gy-button-extra" @click="formSubmit(1)" v-else>提交</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            createData: {
                buyerCompanyId: null,
                sellerCompanyId: null,
                dmkOrderQuantity: null,
                dmkOrderPrice: null,
                deliveryDateYear: null,
                deliveryDateMonth: null,
                deliveryDateMonthType: null,
                warehouseFreeDays: null,
                depositRatio: null,
                paymentType: null,
                dmkSellerPayAmount: 0,
                dmkBuyerPayAmount: 0,
                deliveryWarehouseId: null,
                productId: null,
                skuCode: null,
                skuName: null,
                skuOrigin: null,
                deliveryDateType: null
            },
            buyerCompanyName: null,
            buyerCompanyList: [],
            sellerCompanyName: null,
            sellerCompanyList: [],
            showBuyerCompany: false,
            showSellerCompany: false,
            yearList: [],
            disableDay: false,
            orderId: null,
            monthList: [
                {
                    id: 0,
                    value: '现货'
                },
                {
                    id: 1,
                    value: '1月'
                },
                {
                    id: 2,
                    value: '2月'
                },
                {
                    id: 3,
                    value: '3月'
                },
                {
                    id: 4,
                    value: '4月'
                },
                {
                    id: 5,
                    value: '5月'
                },
                {
                    id: 6,
                    value: '6月'
                },
                {
                    id: 7,
                    value: '7月'
                },
                {
                    id: 8,
                    value: '8月'
                },
                {
                    id: 9,
                    value: '9月'
                },
                {
                    id: 10,
                    value: '10月'
                },
                {
                    id: 11,
                    value: '11月'
                },
                {
                    id: 12,
                    value: '12月'
                }
            ],
            dayList: [
                {
                    id: 1,
                    value: '上'
                },
                {
                    id: 2,
                    value: '中'
                },
                {
                    id: 3,
                    value: '下'
                }
            ],
            paywayList: [
                {
                    id: '0',
                    value: '全部支持'
                },
                {
                    id: '1',
                    value: '先货后款'
                },
                {
                    id: '2',
                    value: '先款后货'
                }
            ],
            skuOriginList: [
                {
                    id: 0,
                    value: '国产'
                },
                {
                    id: 1,
                    value: '进口'
                }
            ],
            productName: null,
            productList: [],
            showProduct: false,
            warehouseName: null,
            showWarehouse: false,
            warehouseList: []
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            this.orderId = this.$route.query.id;
            this.setYearList();
            this.getDetail();
        },
        getDetail () {
            this.orderId && this.$http.get(this.$api.marriedDeal.create + '/' + this.orderId)
                .then(res => {
                    this.buyerCompanyName = res.data.data.buyerCompanyName;
                    this.sellerCompanyName = res.data.data.sellerCompanyName;
                    this.warehouseName = res.data.data.deliveryWarehouseName;
                    this.productName = res.data.data.skuName;
                    this.disableDay = res.data.data.deliveryDateMonthType === null;
                    Object.keys(this.createData).map(item => {
                        this.createData[item] = res.data.data[item];
                    });
                }).catch(() => {
                    console.log('出错了');
                });
        },
        handleSearchComapany (type) {
            this.$http.post(this.$api.order.creatOrderCompanies, {
                companyTypeId: 1,
                name: type === 0 ? this.buyerCompanyName : this.sellerCompanyName
            })
                .then(res => {
                    if (type === 0) {
                        this.showBuyerCompany = true;
                        this.buyerCompanyList = res.data.data;
                    } else {
                        this.showSellerCompany = true;
                        this.sellerCompanyList = res.data.data;
                    }
                }).catch(() => {
                    console.log('出错了');
                });
        },
        handleSelectComapany (item, type) {
            if (type === 0) {
                this.showBuyerCompany = false;
                this.buyerCompanyName = item.companyName;
                this.createData.buyerCompanyId = item.companyId;
            } else {
                this.showSellerCompany = false;
                this.sellerCompanyName = item.companyName;
                this.createData.sellerCompanyId = item.companyId;
            }
        },
        handleSearchProduct () {
            this.$http.get(this.$api.offers.goods + '?keywords=' + this.productName)
                .then(res => {
                    this.showProduct = true;
                    this.productList = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
        },
        handleSelectProduct (item) {
            this.showProduct = false;
            this.productName = item.skuName;
            this.createData.productId = item.id;
            this.createData.skuCode = item.skuCode;
            this.createData.skuName = item.skuName;
        },
        handleSearchWarehouse () {
            this.$http.get(this.$api.offers.warehouses + this.warehouseName)
                .then(res => {
                    this.showWarehouse = true;
                    this.warehouseList = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
        },
        handleSelectWarehouse (item) {
            this.showWarehouse = false;
            this.warehouseName = item.name;
            this.createData.deliveryWarehouseId = item.id;
        },
        setYearList () {
            let y = new Date().getFullYear();
            for (let i = 0; i < 20; i++) {
                this.yearList.push(y + i);
            }
        },
        handleMonthChange () {
            if (this.createData.deliveryDateMonth === 0) {
                this.disableDay = true;
                this.createData.deliveryDateMonthType = null;
                this.createData.deliveryDateType = 0;
            } else {
                this.disableDay = false;
                this.createData.deliveryDateType = 2;
            }
        },
        formSubmit (t) {
            if (!this.createData.buyerCompanyId) {
                this.$message.error('买方公司不能为空');
                return;
            }
            if (!this.createData.sellerCompanyId) {
                this.$message.error('卖方公司不能为空');
                return;
            }
            if (!this.createData.productId) {
                this.$message.error('产品不能为空');
                return;
            }
            if (!this.createData.dmkOrderQuantity) {
                this.$message.error('重量不能为空');
                return;
            }
            if (!this.createData.dmkOrderPrice) {
                this.$message.error('价格不能为空');
                return;
            }
            if (!this.createData.deliveryDateYear) {
                this.$message.error('交割年份不能为空');
                return;
            }
            if (this.createData.deliveryDateMonth === null || this.createData.deliveryDateMonth === '') {
                this.$message.error('交割月份不能为空');
                return;
            }
            if (!this.createData.deliveryWarehouseId) {
                this.$message.error('交割库不能为空');
                return;
            }
            // if (!this.createData.warehouseFreeDays && this.createData.warehouseFreeDays !== 0) {
            //     this.$message.error('免仓期不能为空');
            //     return;
            // }
            if (this.createData.warehouseFreeDays < 0) {
                this.$message.error('免仓期不能为负数');
                return;
            }
            if (this.createData.paymentType === null || this.createData.paymentType === '') {
                this.$message.error('付款方式不能为空');
                return;
            }
            if (!this.createData.skuOrigin) {
                this.$message.error('货源不能为空');
                return;
            }
            t === 0 ? this.createSend() : this.editSend();
        },
        createSend () {
            this.$http.post(this.$api.marriedDeal.create, this.createData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$router.push({name: 'marriedDealOrder'});
                        this.imSend();
                        return;
                    }
                    this.$alert(res.data.message, '出错了', {type: 'error'});
                }).catch(() => {
                    console.log('出错了');
                });
        },
        editSend () {
            this.createData.id = this.orderId;
            this.$http.put(this.$api.marriedDeal.create, this.createData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$router.push({name: 'marriedDealOrder'});
                        localStorage.setItem('imNewOrder', true);
                        // this.imSend();
                        return;
                    }
                    this.$alert(res.data.message, '出错了', {type: 'error'});
                }).catch(() => {
                    console.log('出错了');
                });
        },
        imSend () {
            this.$http.post(this.$api.marriedDeal.im, {
                usrUserId: JSON.parse(localStorage.getItem('userInfo')).id,
                companyIds: [this.createData.buyerCompanyId, this.createData.sellerCompanyId],
                fromMobile: JSON.parse(localStorage.getItem('userInfo')).phone,
                chatType: 2,
                content: '我向您发起了一张撮合订单，您可以去个人中心查看。'
            }, {unLoading: true})
                .then(res => {
                    if (res.data.code === 0) {
                        localStorage.setItem('imNewOrder', true);
                        return;
                    }
                    this.$alert(res.data.message, '出错了', {type: 'error'});
                }).catch(() => {
                    console.log('出错了');
                });
        }
    }
};
</script>
<style lang="scss" scoped>
    .married-wrapper{
        .main-title{
            position: relative;
            .status{
                position: absolute;
                right: 16px;
                font-size: 12px;
                color: $color-minor;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
    .detail-box{
        h3{
            padding-bottom: 0;
        }
        .gy-form-group{
            height: 46px;
        }
        .unit{
            position: relative;
            span{
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .date-select{
            width: 33.3333333333%;
        }
        .el-input-number{
            width: 100%;
        }
        .gy-form-button{
            padding-top: 20px;
        }
    }
    .company-list{
        position: relative;
        ul{
            background-color: #fff;
            width: 100%;
            max-height: 200px;
            overflow: auto;
            position: absolute;
            left: 0;
            top: 31px;
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
            right: 7px;
            top: 0px;
        }
    }
    .el-input-number__decrease{
        position: absolute;
        z-index: 1;
        top: 10px;
        width: 25px;
        height: 25px;
        text-align: center;
        background: #f5f7fa;
        color: #666;
        line-height: 25px;
        font-size: 12px;
    }
    .el-input-number__increase{
        position: absolute;
        z-index: 1;
        top: 10px;
        width: 25px;
        height: 25px;
        text-align: center;
        background: #f5f7fa;
        color: #666;
        line-height: 25px;
        font-size: 12px;
    }
    .el-input-number{
        position: relative;
        display: inline-block;
        width: 121px;
        .el-input__inner{
            padding-left: 0;
            padding-right: 0;
        }
    }
</style>
<style lang="scss">
    .el-input-number__decrease, .el-input-number__increase{
        position: absolute;
        z-index: 1;
        width: 25px;
        height: 25px;
        top: 5px;
        text-align: center;
        background: #fff;
        border: none;
        color: #666;
        line-height: 25px;
        font-size: 16px;
        font-weight: bold;
    }
</style>
