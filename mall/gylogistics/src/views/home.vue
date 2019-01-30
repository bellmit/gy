<template>
    <div id="logistics-home" class="logistics-home">
        <!--START Kv-->
        <div class="logistics-kv" :style='"background-image: url(" + bgimage.banner + ")"'>
            <div class="gy-form" v-if="formShow">
                <ul class="tab">
                    <li>找物流</li>
                </ul>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>产品</span>
                    <el-select v-model="skuInfo" placeholder="请选择产品" @focus="tips">
                        <el-option
                          v-for="item in productList"
                          :key="item.goodsCode"
                          :label="item.goodsName"
                          :value="item.productId">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group weight">
                    <span class="l"><strong>*</strong>重量</span>
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
                    <span class="l"><strong>*</strong>发货地</span>
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
                    <span class="l"><strong>*</strong>卸货地</span>
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
                <span class="button-more" @click="showMore = !showMore">
                    <span v-if="showMore">收起</span>
                    <span v-if="!showMore">更多</span>
                    <i class="iconfont icon-arrow-down"></i>
                </span>
                <transition name="fade">
                    <div class="more" v-show="showMore">
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>托运方</span>
                            <input type="text" class="gy-input" v-model="consignorName" disabled>
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
                            <span class="l">联系人</span>
                            <input type="text" class="gy-input" v-model="contact">
                        </div>
                        <div class="gy-form-group">
                            <span class="l">联系方式</span>
                            <input type="text" class="gy-input" v-model="contactMobile">
                        </div>
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>货值</span>
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
                            <input type="text" class="gy-input" v-model="damageRate">
                            <span class="unit">‰</span>
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
                            <label><input type="radio" v-model="findData.freightPaymentType" name="payway" value="0">在线支付</label>
                            <label><input type="radio" v-model="findData.freightPaymentType" name="payway" value="1">线下支付</label>
                        </div>
                        <div class="gy-form-group cl">
                            <span class="l"><strong>*</strong>期望签约方式</span>
                            <label><input type="radio" v-model="findData.consignmentSignType" name="signway" value="0">在线签约</label>
                            <label><input type="radio" v-model="findData.consignmentSignType" name="signway" value="1">线下签约</label>
                        </div>
                        <div class="gy-form-group single-row">
                            <span class="l">备注</span>
                            <textarea class="gy-textarea" v-model="findData.remark"></textarea>
                        </div>
                    </div>
                </transition>
                <div class="gy-form-button">
                    <button class="gy-button-extra" @click="bidSend">提交</button>
                </div>
            </div>
        </div>
        <!--End Kv-->
        <div class="logistics-main-app" :style='"background-image: url(" + bgimage.app + ")"'>
            <div class="inner">
                <dl class="fl">
                    <dt>智运APP</dt>
                    <dd>智运随身，调度随心，一切尽在掌握</dd>
                    <dd class="ewm" v-if="isProduct">
                        <div>
                            <span><img src="../assets/images/ewm-zy.png" alt=""></span>
                            <strong>智运调度端</strong>
                        </div>
                        <div>
                            <span><img src="../assets/images/ewm-sj.png" alt=""></span>
                            <strong>智运司机端</strong>
                        </div>
                    </dd>
                    <dd class="ewm" v-else>
                        <div>
                            <span><img src="../assets/images/ewm-zy-uat.png" alt=""></span>
                            <strong>智运调度端</strong>
                        </div>
                        <div>
                            <span><img src="../assets/images/ewm-sj-uat.png" alt=""></span>
                            <strong>智运司机端</strong>
                        </div>
                    </dd>
                </dl>
                <div class="fr">
                    <img src="../assets/images/phone.png">
                </div>
            </div>
        </div>
        <div class="main-title">
            <h2>国烨智运</h2>
        </div>
        <span class="sub-title">定位于第四方大宗商品物流服务商</span>
        <div class="gy-logistics">
            <div class="item">
                <div class="inner">
                    <div class="fl"><img src="../assets/images/highway.jpg" alt=""></div>
                    <dl class="copy">
                        <dt>公路运输</dt>
                        <dd>可承运各类普货，危险货物，同时提供例如：海关监管，特种集装箱，大件物流等各类定制化服务。利用互联网+SAAS平台,GPS-GIS-RS相结合，时刻掌握在途货物最新动态.</dd>
                    </dl>
                </div>
            </div>
            <div class="item">
                <div class="inner">
                    <div class="fr"><img src="../assets/images/waterway.jpg" alt=""></div>
                    <dl class="copy">
                        <dt>水路运输</dt>
                        <dd>国烨整合内外航运，码头，仓储，商检，报关，保险等优质资源，为客户提供租船，订舱，港口码头，拖车，报检等一站式综合的进出口物流服务。</dd>
                    </dl>
                </div>
            </div>
            <div class="item">
                <div class="inner">
                    <div class="fl"><img src="../assets/images/railway.jpg" alt=""></div>
                    <dl class="copy">
                        <dt>铁路运输</dt>
                        <dd>国烨拥有优质铁路运输服务商，为客户提供国内铁路运输服务，及从国家往返周边国家，如：蒙古，俄罗斯，越南，朝鲜和中亚五国等的铁路运输服务。</dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="main-title">
            <h2>推荐物流</h2>
        </div>
        <div class="recommend">
            <!--<span class="more"><a href="">更多&gt;</a></span>-->
            <div class="item" v-for="item in recommendList" :key="item.id">
                <img :src="item.logo">
                <dl>
                    <dt>{{item.name}}</dt>
                    <dd>{{item.info}}</dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            bgimage: {
                banner: require('../assets/images/banner.jpg'),
                app: require('../assets/images/IntelligentAPP.png')
            },
            showMore: false,
            findData: {
                consignorId: null,
                freightPaymentType: 0,
                consignmentSignType: 0,
                infCarrierTypeId: null,
                quoteType: null,
                effectiveDate: null,
                estimatedLoadingDate: null,
                loadAreaId: null,
                unloadAreaId: null,
                loadAddress: null,
                unloadAddress: null,
                enquiryNoteItemList: [
                    {
                        infUnitOfMeasureId: null,
                        skuPrice: null,
                        skuQuantity: null
                    }
                ]
            },
            skuCode: null,
            skuName: null,
            contact: null,
            contactMobile: null,
            damageRate: null,
            sendProvinceList: [],
            sendCityList: [],
            loadProvinceList: [],
            loadCityList: [],
            consignorName: '',
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
            verifyFalseLength: '',
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
            skuInfo: null,
            weightUnit: [],
            moneyUnit: [],
            formShow: false,
            isProduct: false,
            recommendList: [
                {
                    id: 0,
                    name: '镇海石化物流有限责任公司',
                    info: '镇海石化物流有限公司成立于2005年，是江浙沪区域领先的综合型物流服务商，浙江省重点联系物流企业，中物联AAA信用企业，浙江省重点物流企业和宁波市物流龙头企业。',
                    logo: require('../assets/images/logistics-logo-1.png')
                },
                {
                    id: 1,
                    name: '常熟华润运输有限公司',
                    info: '常熟华润运输有限公司隶属于江南石油有限公司，主要经营普通货物运输，货物专用运输，危险货物运输，危险化学品经营。具备道路化学危险品运输国家二级资质。',
                    logo: require('../assets/images/logistics-logo-2.png')
                },
                {
                    id: 2,
                    name: '江苏正德物流有限公司',
                    info: '江苏正德物流有限公司成立于2013年9月，主要为华东、华北地区的客户提供高效安全的物流服务，被认定为泰州市重点物流企业、国家AAA级物流企业。',
                    logo: require('../assets/images/logistics-logo-3.png')
                },
                {
                    id: 3,
                    name: '上海中石化工物流有限公司',
                    info: '上海中石化工物流有限公司（SZCLC）是由原中石化集团公司下属的全资子公司上海石化汽车运输公司改制成立的综合性第三方化工物流企业。',
                    logo: require('../assets/images/logistics-logo-4.png')
                }
            ]
        };
    },
    created () {
        this.init();
    },
    beforeDestory () {
        sessionStorage.removeItem('noRightsUntip');
    },
    methods: {
        init () {
            sessionStorage.noRightsUntip = 1;
            if (localStorage.getItem('userInfo')) {
                this.consignorName = JSON.parse(localStorage.getItem('userInfo')).companyName;
            }
            this.getCarList();
            this.getProvince();
            this.getProductList();
            this.getMoneyUnit();
            this.getWeightUnit();
            this.getDomain();
        },
        getDomain () {
            // let url = window.location.hostname;
            this.isProduct = true;
        },
        tips () {
            if (!localStorage.getItem('userInfo')) {
                this.$message({
                    message: '温馨提示：登录后才能发布找物流信息',
                    type: 'warning'
                });
            }
        },
        getCarList () {
            this.$http.post(this.$api.transport.carType)
                .then(res => {
                    this.formShow = true;
                    this.carType = res.data.data.list;
                }).catch(err => {
                    if (err && err.data && err.data.code === 401) {
                        this.formShow = false;
                    }
                });
        },
        getProvince () {
            this.$http.get(this.$api.account.area + '/0')
                .then(res => {
                    this.formShow = true;
                    this.sendProvinceList = res.data.data;
                    this.loadProvinceList = res.data.data;
                }).catch(err => {
                    if (err && err.data && err.data.code === 401) {
                        this.formShow = false;
                    }
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
                    this.formShow = true;
                    this.productList = res.data.data;
                    console.log(this.productList);
                }).catch(err => {
                    if (err && err.data && err.data.code === 401) {
                        this.formShow = false;
                    }
                });
        },
        getMoneyUnit () {
            this.$http.get(this.$api.global.moneyUnit)
                .then(res => {
                    this.formShow = true;
                    this.moneyUnit = res.data.data;
                }).catch(err => {
                    if (err && err.data && err.data.code === 401) {
                        this.formShow = false;
                    }
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
                    this.formShow = true;
                    this.weightUnit = res.data.data.list;
                }).catch(err => {
                    if (err && err.data && err.data.code === 401) {
                        this.formShow = false;
                    }
                });
        },
        bidSend () {
            this.verifyFalseLength = 0;
            if (!localStorage.getItem('userInfo')) {
                this.$alert('请先登录后再继续', '提示');
                return;
            } else {
                this.findData.consignorId = JSON.parse(localStorage.getItem('userInfo')).companyId;
            }
            let formProduct = Object.keys(this.findData.enquiryNoteItemList[0]);
            let formAll = Object.keys(this.findData);
            formProduct.forEach(key => {
                if (this.findData.enquiryNoteItemList[0][key] === null || this.findData.enquiryNoteItemList[0][key] === '') {
                    this.verifyFalseLength = this.verifyFalseLength + 1;
                    console.log(key);
                }
            });
            formAll.forEach(key => {
                if (this.findData[key] === null || this.findData[key] === '') {
                    this.verifyFalseLength = this.verifyFalseLength + 1;
                    console.log(key);
                }
            });
            if (this.verifyFalseLength !== 0) {
                this.$message.error('带*号为必填项');
                return;
            }
            if (this.skuInfo) {
                this.findData.enquiryNoteItemList[0].skuName = this.skuInfo.goodsName;
                this.findData.enquiryNoteItemList[0].skuCode = this.skuInfo.goodsCode;
            }
            this.findData.enquiryNoteItemList[0].damageRate = this.damageRate;
            this.findData.contact = this.contact;
            this.findData.contactMobile = this.contactMobile;
            this.$http.post(this.$api.transport.priceList, this.findData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('提交成功', '提示').then(() => {
                            location.reload();
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
    .logistics-home{
        .gy-form-group{
            line-height: 26px;
        }
    }
    .el-select{
        width: 100%;
    }
    .unit-select, .unit{
        width: 80px;
        position: absolute;
        right: 20px;
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
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100% !important;
    }
</style>
