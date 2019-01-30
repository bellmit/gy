<template>
    <div class="transport-wrap">
        <h2>找物流</h2>
        <form action="javascript:;">
            <h3><i class="iconfont icon-info"></i>基础信息</h3>
            <div class="gy-form">
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>品名</span>
                    <div v-if="bidId">
                        <product-search :selected.sync="selectedProduct" :defaultProduct="skuName" v-if="skuName" :offerId="findData.enquiryFromId"></product-search>
                    </div>
                    <product-search :selected.sync="selectedProduct" :defaultProduct="skuName" :offerId="findData.enquiryFromId" v-else></product-search>
                </div>
                <div class="gy-form-group weight">
                    <span class="l"><strong>*</strong>重量</span>
                    <input type="text" class="gy-input" v-model="findData.enquiryNoteItemList[0].skuQuantity">
                    <el-select v-model="findData.enquiryNoteItemList[0].infUnitOfMeasureId" class="unit-select"
                               placeholder="单位">
                        <el-option
                            v-for="item in weightUnit"
                            :key="item.id"
                            :label="item.displayName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>装货地<a href="javascript:;" class="address-lib" @click="handleShowAddressLib(0)"><i class="iconfont icon-address"></i>地址库</a></span>
                    <div class="address">
                        <el-select v-model="findData.loadWarehouseAddressModel.provinceId" placeholder="省" @change="provinceChange(0, findData.loadWarehouseAddressModel.provinceId)"
                                   class="fl province">
                            <el-option
                                v-for="item in loadProvinceList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="findData.loadWarehouseAddressModel.cityId" placeholder="市" class="fr city" @change="cityChange(0, findData.loadWarehouseAddressModel.cityId)">
                            <el-option
                                v-for="item in loadCityList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="findData.loadWarehouseAddressModel.districtId" placeholder="区" class="fl province" @change="districtChange(0, findData.loadWarehouseAddressModel.districtId)">
                            <el-option
                              v-for="item in loadDistrictList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="findData.loadWarehouseAddressModel.townId" placeholder="镇/街道" class="fr city">
                            <el-option
                              v-for="item in loadTownList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                        <input type="text" class="gy-input" v-model="findData.loadWarehouseAddressModel.address" placeholder="请输入详细地址">
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>卸货地<a href="javascript:;" class="address-lib" @click="handleShowAddressLib(1)"><i class="iconfont icon-address"></i>地址库</a></span>
                    <div class="address">
                        <el-select v-model="findData.unloadWarehouseAddressModel.provinceId" placeholder="省" @change="provinceChange(1, findData.unloadWarehouseAddressModel.provinceId)"
                                   class="fl province">
                            <el-option
                                v-for="item in unloadProvinceList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="findData.unloadWarehouseAddressModel.cityId" placeholder="市" class="fr city" @change="cityChange(1, findData.unloadWarehouseAddressModel.cityId)">
                            <el-option
                                v-for="item in unloadCityList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="findData.unloadWarehouseAddressModel.districtId" placeholder="区" class="fl province" @change="districtChange(1, findData.unloadWarehouseAddressModel.districtId)">
                            <el-option
                              v-for="item in unloadDistrictList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="findData.unloadWarehouseAddressModel.townId" placeholder="镇/街道" class="fr city">
                            <el-option
                              v-for="item in unloadTownList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                        <input type="text" class="gy-input" v-model="findData.unloadWarehouseAddressModel.address" placeholder="请输入详细地址">
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">发货公司</span>
                    <input type="text" class="gy-input" v-model="findData.loadWarehouseAddressModel.warehouseName" placeholder="请输入发货公司">
                </div>
                <div class="gy-form-group">
                    <span class="l">收货公司</span>
                    <input type="text" class="gy-input" v-model="findData.unloadWarehouseAddressModel.warehouseName" placeholder="请输入收货公司">
                </div>
                <div class="gy-form-group">
                    <span class="l">发货联系人</span>
                    <input type="text" class="gy-input" v-model="findData.loadContact" placeholder="请输入发货联系人">
                </div>
                <div class="gy-form-group">
                    <span class="l">收货联系人</span>
                    <input type="text" class="gy-input" v-model="findData.unloadContact" placeholder="请输入收货联系人">
                </div>
                <div class="gy-form-group">
                    <span class="l">发货联系方式</span>
                    <input type="text" class="gy-input" v-model="findData.loadContactMobile" placeholder="请输入发货联系方式">
                </div>
                <div class="gy-form-group">
                    <span class="l">收货联系方式</span>
                    <input type="text" class="gy-input" v-model="findData.unloadContactMobile" placeholder="请输入收货联系方式">
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>期望发货日期</span>
                    <el-date-picker
                        v-model="findData.estimatedLoadingDate"
                        type="datetime"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>有效期</span>
                    <el-date-picker
                        v-model="findData.effectiveDate"
                        type="datetime"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <h3 class="title-detail"><i class="iconfont icon-dingdanxinxi"></i>详细信息</h3>
            <div class="gy-form">
                <div class="gy-form-group">
                    <span class="l">托运方</span>
                    <input type="text" class="gy-input" v-model="findData.consignorName" disabled>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>车辆要求</span>
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
                    <span class="l">托运方联系人</span>
                    <input type="text" class="gy-input" v-model="findData.contact">
                </div>
                <div class="gy-form-group">
                    <span class="l">托运方手机号</span>
                    <input type="text" class="gy-input" v-model="findData.contactMobile">
                </div>
                <div class="gy-form-group">
                    <span class="l">货值（元）</span>
                    <input type="text" class="gy-input" v-model="findData.enquiryNoteItemList[0].skuPrice">
                    <span class="unit"><el-select v-model="findData.enquiryNoteItemList[0].intCurrencyId" placeholder="币种" class="money">
                        <el-option
                            v-for="item in moneyUnit"
                            :key="item.id"
                            :label="item.friendlyName"
                            :value="item.id">
                        </el-option>
                    </el-select><el-select v-model="findData.enquiryNoteItemList[0].infUnitOfMeasureId" disabled
                                           class="weight" placeholder="单位">
                        <el-option
                            v-for="item in weightUnit"
                            :key="item.id"
                            :label="item.displayName"
                            :value="item.id">
                        </el-option>
                    </el-select></span>
                </div>
                <div class="gy-form-group">
                    <span class="l">货损限制(‰)</span>
                    <input type="text" class="gy-input" v-model="findData.enquiryNoteItemList[0].damageRate">
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>报价方式</span>
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
                    <span class="l"><strong>*</strong>期望支付方式</span>
                    <label><input type="radio" v-model="findData.freightPaymentType" name="payway"
                                  value="0">在线支付</label>
                    <label><input type="radio" v-model="findData.freightPaymentType" name="payway"
                                  value="1">线下支付</label>
                </div>
                <div class="gy-form-group cl">
                    <span class="l"><strong>*</strong>期望签约方式</span>
                    <label><input type="radio" v-model="findData.consignmentSignType" name="signway"
                                  value="0">在线签约</label>
                    <label><input type="radio" v-model="findData.consignmentSignType" name="signway"
                                  value="1">线下签约</label>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l">备注</span>
                    <textarea class="gy-textarea" v-model="findData.remark"></textarea>
                </div>
                <div class="gy-form-button">
                    <a href="javascript:;" class="gy-button-extra" @click="bidSend">提交</a>
                </div>
            </div>
        </form>
        <address-lib :loadSelected.sync="findData.loadWarehouseAddressModel" :unloadSelected.sync="findData.unloadWarehouseAddressModel" :show.sync="showAddressLib" :type.sync="addressType"></address-lib>
    </div>
</template>
<script>
import productSearch from '@/components/productSearch';
import addressLib from '@/components/address';

export default {
    data () {
        return {
            userInfo: {},
            findData: {
                consignorId: null,
                enquiryFromId: null,
                loadContact: null,
                loadContactMobile: null,
                unloadContact: null,
                unloadContactMobile: null,
                enquiryNoteItemList: [
                    {
                        infUnitOfMeasureId: 2,
                        skuCode: null,
                        skuName: null,
                        skuPrice: null,
                        skuQuantity: null,
                        damageRate: null,
                        intCurrencyId: 1
                    }
                ],
                freightPaymentType: 0,
                consignmentSignType: 0,
                infCarrierTypeId: null,
                quoteType: 0,
                contact: null,
                contactMobile: null,
                effectiveDate: null,
                estimatedLoadingDate: null,
                consignorName: null,
                remark: null,
                loadWarehouseAddressModel: {
                    address: null,
                    cityId: null,
                    districtId: null,
                    provinceId: null,
                    townId: null,
                    warehouseName: null
                },
                unloadWarehouseAddressModel: {
                    address: null,
                    cityId: null,
                    districtId: null,
                    provinceId: null,
                    townId: null,
                    warehouseName: null
                }
            },
            selectedProduct: {},
            selectedAddress: {},
            defaultProduct: null,
            defaultCode: null,
            loadProvinceList: [],
            loadCityList: [],
            loadDistrictList: [],
            loadTownList: [],
            unloadProvinceList: [],
            unloadCityList: [],
            unloadDistrictList: [],
            unloadTownList: [],
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
            weightUnit: [],
            moneyUnit: [],
            skuCode: null,
            skuName: null,
            bidId: null,
            verifyFalseLength: 0,
            showAddressLib: false,
            addressType: 0 // 0 装货地址， 1 卸货地址
        };
    },
    components: {
        productSearch,
        addressLib
    },
    created () {
        this.init();
    },
    computed: {
        loadWarehouseAddressModel () {
            return this.findData.loadWarehouseAddressModel;
        },
        unloadWarehouseAddressModel () {
            return this.findData.unloadWarehouseAddressModel;
        }
    },
    watch: {
        $route: 'init',
        loadWarehouseAddressModel (newValue, oldValue) {
            newValue.provinceId && this.provinceChange(0, newValue.provinceId, 1);
            newValue.cityId && this.cityChange(0, newValue.cityId, 1);
            newValue.districtId && this.districtChange(0, newValue.districtId, 1);
        },
        unloadWarehouseAddressModel (newValue, oldValue) {
            newValue.provinceId && this.provinceChange(1, newValue.provinceId, 1);
            newValue.cityId && this.cityChange(1, newValue.cityId, 1);
            newValue.districtId && this.districtChange(1, newValue.districtId, 1);
        }
    },
    methods: {
        init () {
            if (localStorage.getItem('userInfo')) {
                this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
                this.findData.consignorId = this.userInfo.companyId;
                this.findData.consignorName = this.userInfo.companyName;
                this.findData.contact = this.userInfo.username;
                this.findData.contactMobile = this.userInfo.phone;
            }
            this.$route.query.skuCode && (this.skuCode = this.$route.query.skuCode);
            this.$route.query.skuName && (this.skuName = this.$route.query.skuName);
            this.$route.query.enquiryFromId && (this.findData.enquiryFromId = this.$route.query.enquiryFromId);
            this.findData.consignorId = this.userInfo.companyId;
            this.findData.consignorName = this.userInfo.companyName;
            this.findData.contact = this.userInfo.username;
            this.findData.contactMobile = this.userInfo.phone;
            this.getCarList();
            this.getProvince();
            this.getMoneyUnit();
            this.getWeightUnit();
            this.bidId = this.$route.query.bidId;
            if (this.bidId) {
                this.$http.get(this.$api.transport.priceList + '/' + this.bidId)
                    .then(res => {
                        this.skuName = res.data.data.enquiryNoteItemList[0].skuName;
                        this.skuCode = res.data.data.enquiryNoteItemList[0].skuCode;
                        Object.keys(this.findData).map(item => {
                            if (item !== 'enquiryNoteItemList' || item !== 'loadWarehouseAddressModel' || item !== 'unloadWarehouseAddressModel') {
                                this.findData[item] = res.data.data[item];
                            }
                        });
                        Object.keys(this.findData.enquiryNoteItemList).map(item => {
                            this.findData.enquiryNoteItemList[item] = res.data.data.enquiryNoteItemList[item];
                        });
                        Object.keys(this.findData.loadWarehouseAddressModel).map(item => {
                            this.findData.loadWarehouseAddressModel[item] = res.data.data.loadWarehouseAddressModel[item];
                        });
                        Object.keys(this.findData.unloadWarehouseAddressModel).map(item => {
                            this.findData.unloadWarehouseAddressModel[item] = res.data.data.unloadWarehouseAddressModel[item];
                        });
                    });
            }
        },
        getCarList () {
            this.$http.post(this.$api.transport.carType)
                .then(res => {
                    this.carType = res.data.data.list;
                });
        },
        getProvince () {
            this.$http.get(this.$api.account.newArea + '/0')
                .then(res => {
                    this.loadProvinceList = res.data.data;
                    this.unloadProvinceList = res.data.data;
                });
        },
        provinceChange (type, param, lib) {
            this.$http.get(this.$api.account.newArea + '/' + param)
                .then(res => {
                    if (type === 0) {
                        if (!lib) {
                            for (let item in this.findData.loadWarehouseAddressModel) {
                                (item !== 'provinceId' && item !== 'adress') && (this.findData.loadWarehouseAddressModel[item] = null);
                            }
                        }
                        this.loadCityList = res.data.data;
                    } else {
                        if (!lib) {
                            for (let item in this.findData.unloadWarehouseAddressModel) {
                                (item !== 'provinceId' && item !== 'adress') && (this.findData.unloadWarehouseAddressModel[item] = null);
                            }
                        }
                        this.unloadCityList = res.data.data;
                    }
                });
        },
        cityChange (type, param, lib) {
            this.$http.get(this.$api.account.newArea + '/' + param)
                .then(res => {
                    if (type === 0) {
                        if (!lib) {
                            for (let item in this.findData.loadWarehouseAddressModel) {
                                (item !== 'provinceId' && item !== 'cityId' && item !== 'adress') && (this.findData.loadWarehouseAddressModel[item] = null);
                            }
                        }
                        this.loadDistrictList = res.data.data;
                    } else {
                        if (!lib) {
                            for (let item in this.findData.unloadWarehouseAddressModel) {
                                (item !== 'provinceId' && item !== 'cityId' && item !== 'adress') && (this.findData.unloadWarehouseAddressModel[item] = null);
                            }
                        }
                        this.unloadDistrictList = res.data.data;
                    }
                });
        },
        districtChange (type, param, lib) {
            this.$http.get(this.$api.account.newArea + '/' + param)
                .then(res => {
                    if (type === 0) {
                        !lib && (this.findData.loadWarehouseAddressModel['townId'] = null);
                        this.loadTownList = res.data.data;
                    } else {
                        !lib && (this.findData.unloadWarehouseAddressModel['townId'] = null);
                        this.unloadTownList = res.data.data;
                    }
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
        handleShowAddressLib (n) {
            this.addressType = n;
            this.showAddressLib = true;
        },
        bidSend () {
            if (this.skuName) {
                this.findData.enquiryNoteItemList[0].skuCode = this.skuCode;
                this.findData.enquiryNoteItemList[0].skuName = this.skuName;
            } else {
                this.findData.enquiryNoteItemList[0].skuCode = this.selectedProduct.skuCode;
                this.findData.enquiryNoteItemList[0].skuName = this.selectedProduct.skuName;
            }
            if (!this.findData.enquiryNoteItemList[0].skuCode) {
                this.$message.error('品名不能为空');
                return;
            }
            if (!this.findData.enquiryNoteItemList[0].skuQuantity || !/^[0-9]+(.[0-9]{1,3})?$/.test(this.findData.enquiryNoteItemList[0].skuQuantity)) {
                this.$message.error('重量不能为空，且最多保留3位小数');
                return;
            }
            if (!this.findData.loadWarehouseAddressModel.provinceId || !this.findData.loadWarehouseAddressModel.cityId || !this.findData.loadWarehouseAddressModel.districtId || !this.findData.loadWarehouseAddressModel.townId || !this.findData.loadWarehouseAddressModel.address || this.findData.loadWarehouseAddressModel.address.length > 30) {
                this.$message.error('装货省、市、区、镇/街道、地址不能为空，且地址最多输入30个字符');
                return;
            }
            if (!this.findData.unloadWarehouseAddressModel.provinceId || !this.findData.unloadWarehouseAddressModel.cityId || !this.findData.unloadWarehouseAddressModel.districtId || !this.findData.unloadWarehouseAddressModel.townId || !this.findData.unloadWarehouseAddressModel.address || this.findData.unloadWarehouseAddressModel.address.length > 30) {
                this.$message.error('卸货省、市、区、镇/街道、地址不能为空，且地址最多输入30个字符');
                return;
            }
            if (!this.findData.estimatedLoadingDate) {
                this.$message.error('发货日期不能为空');
                return;
            }
            if (!this.findData.effectiveDate) {
                this.$message.error('有效期不能为空');
                return;
            }
            if (!this.findData.infCarrierTypeId) {
                this.$message.error('请选择车辆类型');
                return;
            }
            if (!this.$tools.verifyMobile(this.findData.contactMobile)) {
                this.$message.error('请填写正确联系人手机号码');
                return;
            }
            if (this.findData.enquiryNoteItemList[0].damageRate && (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.findData.enquiryNoteItemList[0].damageRate)) || this.findData.enquiryNoteItemList[0].damageRate > 10)) {
                this.$message.error('货损限制最多保留2位小数且不能大于10');
                return;
            }
            if (this.findData.enquiryNoteItemList[0].skuPrice && !/^[0-9]+(.[0-9]{1,2})?$/.test(this.findData.enquiryNoteItemList[0].skuPrice)) {
                this.$message.error('货值最多保留2位小数');
                return;
            }
            this.$http.post(this.$api.transport.priceList, this.findData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('提交成功', '提示', {type: 'success'}).then(() => {
                            this.$router.push({name: 'consignBid'});
                        });
                        return;
                    }
                    this.$alert(res.data.message, '出错了', {type: 'error'});
                });
        }
    }
};
</script>
<style lang="scss" scoped>
    .transport-wrap .el-message {
        min-width: 180px !important;
    }
    .unit-select, .unit {
        width: 80px;
        position: absolute;
        right: 30px;
        top: 8px;
    }

    .address {
        .province, .city {
            width: 45%;
        }
        .gy-input {
            clear: both;
            margin-top: 10px;
        }
    }

    label {
        margin-right: 10px;
        input {
            margin-right: 5px;
        }
    }

    .unit {
        width: auto;
        font-size: $small-font;
        .weight{
            width: 75px;
        }
        .money{
            width: 90px;
        }
    }
    .address-lib{
        color: $color-extra;
        font-size: 12px;
        display: block;
        i{
            font-size: 12px;
        }
    }
</style>
