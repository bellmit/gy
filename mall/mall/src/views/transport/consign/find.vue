<template>
    <div class="transport-wrap">
        <h2>找物流</h2>
        <form action="javascript:;">
            <h3><i class="iconfont icon-info"></i>基础信息</h3>
            <div class="gy-form">
                <div class="gy-form-group">
                    <span class="l">产品</span>
                    <el-select v-model="goodsCode" placeholder="请选择产品" :disabled="fromTrade">
                        <el-option
                          v-for="item in productList"
                          :key="item.goodsCode"
                          :label="item.goodsName"
                          :value="item.goodsCode">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group weight">
                    <span class="l">重量</span>
                    <input type="text" class="gy-input" v-model="findData.enquiryNoteItemList[0].skuQuantity">
                    <el-select v-model="findData.enquiryNoteItemList[0].infUnitOfMeasureId" class="unit-select" placeholder="单位">
                        <el-option
                          v-for="item in weightUnit"
                          :key="item.id"
                          :label="item.displayName"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l">装货地</span>
                    <div class="address">
                        <el-select v-model="sendProvinceId" placeholder="请选择省份" @change="provinceChange(0)" class="fl province">
                            <el-option
                              v-for="item in sendProvinceList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="findData.loadAreaId" placeholder="请选择城市" class="fr city">
                            <el-option
                              v-for="item in sendCityList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                        <input type="text" class="gy-input" v-model="findData.loadAddress" placeholder="请输入详细地址">
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">卸货地</span>
                    <div class="address">
                        <el-select v-model="loadProvinceId" placeholder="请选择省份" @change="provinceChange(1)" class="fl province">
                            <el-option
                              v-for="item in loadProvinceList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="findData.unloadAreaId" placeholder="请选择城市" class="fr city">
                            <el-option
                              v-for="item in loadCityList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                        <input type="text" class="gy-input" v-model="findData.unloadAddress" placeholder="请输入详细地址">
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">期望发货日期</span>
                    <el-date-picker
                      v-model="findData.estimatedLoadingDate"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="gy-form-group">
                    <span class="l">有效期</span>
                    <el-date-picker
                      v-model="findData.effectiveDate"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <h3><i class="iconfont icon-info"></i>详细信息</h3>
            <div class="gy-form">
                <div class="gy-form-group">
                    <span class="l">托运方</span>
                    <input type="text" class="gy-input" v-model="findData.consignorName" disabled>
                </div>
                <div class="gy-form-group">
                    <span class="l">车辆要求</span>
                    <el-select v-model="findData.infCarrierTypeId" placeholder="请选择车辆类型">
                        <el-option
                          v-for="item in carType"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group cl">
                    <span class="l">联系人</span>
                    <input type="text" class="gy-input" v-model="findData.contact">
                </div>
                <div class="gy-form-group">
                    <span class="l">联系方式</span>
                    <input type="text" class="gy-input" v-model="findData.contactMobile">
                </div>
                <div class="gy-form-group">
                    <span class="l">货值</span>
                    <input type="text" class="gy-input" v-model="findData.enquiryNoteItemList[0].skuPrice">
                    <span class="unit"><el-select v-model="findData.enquiryNoteItemList[0].intCurrencyId" placeholder="币种" class="money">
                        <el-option
                          v-for="item in moneyUnit"
                          :key="item.id"
                          :label="item.friendlyName"
                          :value="item.id">
                        </el-option>
                    </el-select><el-select v-model="findData.enquiryNoteItemList[0].infUnitOfMeasureId" disabled class="weight" placeholder="单位">
                        <el-option
                          v-for="item in weightUnit"
                          :key="item.id"
                          :label="item.displayName"
                          :value="item.id">
                        </el-option>
                    </el-select></span>
                </div>
                <div class="gy-form-group">
                    <span class="l">货损限制</span>
                    <input type="text" class="gy-input" v-model="findData.enquiryNoteItemList[0].damageRate">
                    <span class="unit">‰</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">报价方式</span>
                    <el-select v-model="findData.quoteType" placeholder="请选择报价方式">
                        <el-option
                          v-for="item in quoteType"
                          :key="item.id"
                          :label="item.value"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l">期望支付方式</span>
                    <label><input type="radio" v-model="findData.freightPaymentType" name="payway" value="0">在线支付</label>
                    <label><input type="radio" v-model="findData.freightPaymentType" name="payway" value="1">线下支付</label>
                </div>
                <div class="gy-form-group cl">
                    <span class="l">期望签约方式</span>
                    <label><input type="radio" v-model="findData.consignmentSignType" name="signway" value="0">在线签约</label>
                    <label><input type="radio" v-model="findData.consignmentSignType" name="signway" value="1">线下签约</label>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l">备注</span>
                    <textarea class="gy-textarea" v-model="findData.remark"></textarea>
                </div>
                <div class="gy-form-button">
                    <button class="gy-button-extra" @click="bidSend">提交</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data () {
        return {
            userInfo: {},
            findData: {
                consignorId: null,
                enquiryNoteItemList: [
                    {
                        infUnitOfMeasureId: null,
                        skuCode: null,
                        skuName: null,
                        skuPrice: null,
                        skuQuantity: null
                    }
                ],
                freightPaymentType: 0,
                consignmentSignType: 0,
                infCarrierTypeId: null,
                quoteType: null,
                contact: null,
                contactMobile: null,
                effectiveDate: null,
                enquiryFrom: '',
                estimatedLoadingDate: null,
                loadAreaId: null,
                unloadAreaId: null,
                loadAddress: null,
                unloadAddress: null,
                consignorName: null
            },
            sendProvinceList: [],
            sendCityList: [],
            loadProvinceList: [],
            loadCityList: [],
            tabsList: [
                {
                    title: '签约中',
                    amount: 120
                },
                {
                    title: '实施中',
                    amount: 120
                },
                {
                    title: '结算中',
                    amount: 120
                },
                {
                    title: '付款中',
                    amount: 120
                },
                {
                    title: '已完成',
                    amount: 120
                },
                {
                    title: '已失效',
                    amount: 120
                }
            ],
            sendProvinceId: null,
            loadProvinceId: null,
            carType: [],
            productId: null,
            unit: null,
            quoteType: [
                {
                    id: 0,
                    value: '承运商报价'
                },
                {
                    id: 1,
                    value: '我有意向价'
                },
                {
                    id: 2,
                    value: '向指定承运商询价'
                }
            ],
            productList: [],
            weightUnit: [],
            moneyUnit: [],
            goodsCode: null
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            localStorage.getItem('userInfo') && (this.userInfo = JSON.parse(localStorage.getItem('userInfo')));
            this.fromTrade = this.$route.query.trade === true;
            this.goodsCode = this.$route.query.skuCode;
            this.findData.consignorId = this.userInfo.companyId;
            this.findData.consignorName = this.userInfo.companyName;
            this.getCarList();
            this.getProvince();
            this.getProductList();
            this.getMoneyUnit();
            this.getWeightUnit();
        },
        getCarList () {
            this.$http.post(this.$api.transport.carType)
                .then(res => {
                    this.carType = res.data.data.list;
                });
        },
        getProvince () {
            this.$http.get(this.$api.account.area + '/0')
                .then(res => {
                    this.sendProvinceList = res.data.data;
                    this.loadProvinceList = res.data.data;
                });
        },
        provinceChange (t) {
            if (t === 0) {
                this.sendCityList = [];
                this.findData.loadAreaId = null;
                this.$http.get(this.$api.account.area + '/' + this.sendProvinceId)
                    .then(res => {
                        this.sendCityList = res.data.data;
                    });
                return;
            }
            this.loadCityList = [];
            this.findData.unloadAreaId = null;
            this.$http.get(this.$api.account.area + '/' + this.loadProvinceId)
                .then(res => {
                    this.loadCityList = res.data.data;
                });
        },
        getProductList () {
            this.$http.get(this.$api.global.product)
                .then(res => {
                    this.productList = res.data.data;
                });
        },
        getMoneyUnit () {
            this.$http.get(this.$api.global.moneyUnit)
                .then(res => {
                    this.moneyUnit = res.data.data;
                });
        },
        getWeightUnit () {
            this.$http.post(this.$api.global.weightUnit, {
                data: {
                    infUnitOfMeasureCategoryId: 1
                },
                pageNum: 1,
                pageSize: 10000
            })
                .then(res => {
                    this.weightUnit = res.data.data.list;
                });
        },
        bidSend () {
            this.findData.enquiryNoteItemList[0].skuCode = this.goodsCode;
            this.productList.forEach((item) => {
                item.goodsCode === this.goodsCode && (this.findData.enquiryNoteItemList[0].skuName = item.goodsName);
            });
            this.$http.post(this.$api.transport.priceList, this.findData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('提交成功', '提示').then(() => {
                            this.$router.push({name: 'consignBid'});
                        });
                        return;
                    }
                    this.$alert(res.data.message, '出错了');
                });
        }
    }
};
</script>
<style lang="scss" scoped>
    .unit-select, .unit{
        width: 80px;
        position: absolute;
        right: 40px;
        top: 10px;
    }
    .address{
        .province, .city{
            width: 45%;
        }
        .gy-input{
            clear: both;
            margin-top: 10px;
        }
    }
    label{
        margin-right: 10px;
        input{
            margin-right: 5px;
        }
    }
    .unit{
        width: auto;
        font-size: $small-font;
        .weight, .money{
            width: 75px;
        }
    }
</style>
