<template>
    <div class="sellerOrder-main">
        <div class="sellerOrder">
            <div slot="header" class="clearfix">
                <span class="title">发起订单</span>
            </div>
            <el-form label-width="110px" size="mini" class="demo-ruleForm">
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="品名">
                            {{info.skuName}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="11">
                        <el-form-item label="单价">
                            <input  type="text" v-model="info.skuPrice">
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item label="交割库">
                            <input  type="text" v-model="info.deliveryWarehouseName">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="11">
                        <el-form-item label="数量(吨)">
                            <input  type="text" v-model="info.skuQuantity">
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item label="交割日期">
                            <el-date-picker
                              v-model="deliveryDate"
                              type="daterange"
                              align="right"
                              unlink-panels
                              range-separator="至"
                              :start-placeholder=info.deliveryBeginDate|date
                              :end-placeholder=info.deliveryBeginDate|date
                              :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="11">
                        <el-form-item label="总金额">
                            {{info.skuPrice*info.skuQuantity}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <p><i class="el-icon-tickets"></i> 详细信息</p>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="资源编号">
                            {{info.odrOfferSn}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item label="买方公司名">
                            <el-autocomplete
                              class="inline-input form-item-ll"
                              v-model="info.companyName"
                              :fetch-suggestions="querySearch"
                              placeholder="请输入内容"
                              @select="handleSelect"
                              :trigger-on-focus="false"
                            ></el-autocomplete>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="交割仓库地址">
                            <input  type="text" v-model="info.deliveryDetailedAddress">
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item label="免仓期">
                            <input  type="text" v-model="info.warehouseFreeDays">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="11">
                        <el-form-item label="交付方式">
                            <el-select v-model="info.deliveryType" placeholder="请选择" class="form-item-ll">
                                <el-option
                                  v-for="item in deliveryTypeOption"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item label="是否分批">
                            <el-col :span="6">
                                <el-select  v-model="info.isBatchDelivery" placeholder="请选择">
                                    <el-option
                                      v-for="item in isBatchDeliveryo"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="1">每</el-col>
                            <el-col :span="5">
                                <el-input v-model="info.batchDeliveryQuantity" ></el-input>
                            </el-col>
                            <el-col :span="5">吨最多分</el-col>
                            <el-col :span="5">
                                <el-input v-model="info.batchDeliveryFrequency"></el-input>
                            </el-col>
                            批
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="11">
                        <el-form-item label="溢短装">
                            <input  type="text" v-model="info.shortOverflowRate">
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item label="付款方式">
                            <el-select v-model="info.transactionType" placeholder="请选择" class="form-item-ll">
                                <el-option
                                  v-for="item in transactionOption"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="11">
                        <el-form-item label="保证金">
                            <input  type="text" v-model="info.depositRatio">
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item label="追加保证金(%)">
                            <el-col :span="1">跌</el-col>
                            <el-col :span="11">
                                <el-input v-model="info.depositRatioSubtract"></el-input>
                            </el-col>
                            <el-col :span="1">保</el-col>
                            <el-col :span="11">
                                <el-input v-model="info.depositRatioAppend"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="11">
                        <el-form-item label="发票">
                            <el-select v-model="info.provideInvoiceType" placeholder="请选择" class="form-item-ll">
                                <el-option
                                  v-for="item in provideInvoiceOption"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item label="货源">
                            <el-select v-model="info.skuOrigin" placeholder="请选择" class="form-item-ll">
                                <el-option
                                  v-for="item in skuOriginOption"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="11">
                        <el-form-item label="质量标准">
                            <input  type="text" v-model="info.qualityStandard">
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item label="包装标准">
                            <el-select v-model="info.packagingStandard" class="form-item-ll">
                                <el-option
                                  v-for="item in packagingOption"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="11">
                        <el-form-item label="数量验收标准">
                            <el-select v-model="info.acceptanceStandard" class="form-item-ll">
                                <el-option
                                  v-for="item in acceptanceOption"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item label="合同回签时间">
                            <el-select v-model="info.contractBackSignDate" class="form-item-ll">
                                <el-option
                                  v-for="item in SignDateOption"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="11">
                        <el-form-item label="卖方联系人">
                            <input  type="text" v-model="info.sellerContact">
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item label="卖方联系方式">
                            <input  type="text" v-model="info.sellerContactMobile">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="买方联系人">
                            <input  type="text" v-model="info.buyerContact">
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-form-item label="买方联系方式">
                            <input  type="text" v-model="info.buyerContactMobile">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item class="createOrder-submit">
                            <!--<div class="gy-button-extra" @click.prevent="submitForm()"> 生成订单</div>-->
                            <button class="gy-button-extra createOrder" @click.prevent="submitForm()">生成订单</button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
    </div>
    </div>
</template>
<script>
export default {
    name: 'sellerOrder',
    data () {
        return {
            value5: '',
            info: {
                orderItemList: [],
                shortOverflowRate: '',
                qualityStandard: '',
                packagingStandard: '',
                acceptanceStandard: '',
                contractBackSignDate: '',
                buyerContact: '',
                buyerContactMobile: '',
                depositRatioSubtract: '',
                depositRatioAppend: '',
                batchDeliveryQuantity: '',
                batchDeliveryFrequency: ''
            },
            list: {},
            deliveryDate: [], // 存时间
            deliveryTypeOption: [{
                value: 0,
                label: '买家自提、买家发货、全部支持'
            },
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
            transactionOption: [{
                value: 0,
                label: '先款后货'
            },
            {
                value: 1,
                label: '先货后款'
            }],
            packagingOption: [{
                value: 0,
                label: '散水'
            },
            {
                value: 1,
                label: '桶装货'
            },
            {
                value: 2,
                label: '袋装'
            }],
            acceptanceOption: [{
                value: 0,
                label: '出库数量'
            },
            {
                value: 1,
                label: '签收数量'
            }],
            SignDateOption: [{
                value: 0,
                label: '当天'
            },
            {
                value: 1,
                label: '隔天'
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
            pickerOptions: { // 日期
                shortcuts: [{
                    text: '最近一周',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            }
        };
    },
    created () {
        // this.offerId = 1;
        // this.offerId && this.getInfo();
        this.getCompany();
        // this.GetRequest();
        // console.log(window.location.href);
        // console.log(location.search);
        // console.log(this.GetRequest('url'));
        this.getQueryString('resourcesListId');
    },
    methods: {
        // GetRequest () {
        //     let url = location.search; // 获取url中"?"符后的字串
        //     let theRequest = new Object();
        //     if (url.indexOf("?") != -1) {
        //         let str = url.substr(1);
        //         let strs = str.split('&');
        //         for (let i = 0; i < strs.length; i++) {
        //             theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
        //         }
        //     }
        //     return theRequest;
        // },
        getQueryString (name) {
            let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            let res = window.location.search.substr(0).match(reg);
            if (res[1]) {
                return res[1];
            } else {
                return null;
            }
        },
        getInfo () {
            let that = this;
            that.$http.get(that.$api.offers.resources + '/' + that.offerId)
                .then(function (res) {
                    that.info = res.data.data;
                    that.deliveryDate[0] = res.data.data.deliveryBeginDate;
                    that.deliveryDate[1] = res.data.data.deliveryEndDate;
                }).catch(() => {
                    console.log('出错了');
                });
        },
        submitForm () {
            let that = this;
            that.list.odrOfferId = that.offerId;
            that.list.skuPrice = that.info.skuPrice;
            that.list.deliveryWarehouseName = that.info.deliveryWarehouseName;
            that.list.deliveryDetailedAddress = that.info.deliveryDetailedAddress;
            that.list.deliveryBeginDate = new Date(this.deliveryDate[0]).getTime();
            that.list.deliveryEndDate = new Date(this.deliveryDate[1]).getTime();
            that.list.skuQuantity = that.info.skuQuantity;
            that.info.orderItemList = [];
            that.info.orderItemList.push(that.list);
            console.log(that.info);
            that.$http.post(that.$api.order.createOrderList, that.info)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.$router.push({name: 'salesList'});
                    }
                }).catch(() => {
                    console.log('出错了');
                });
        },
        querySearch (queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter (queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect (item) {
            let that = this;
            console.log(item);
            that.info.buyerCompanyName = '1111';
            that.info.buyerCompanyId = item.id;
        },
        getCompany () {
            let that = this;
            this.$http.get(that.$api.order.creatOrderCompanies).then(function (res) {
                if (res.data.code === 0) {
                    let param = {};
                    for (let i = 0; i < res.data.data.length; i++) {
                        param.value = res.data.data[i].companyName;
                        param.id = res.data.data[i].companyId;
                        that.restaurants.push(param);
                        param = {};
                    }
                } else {
                    console.log('接口有问题');
                }
            });
        }
    }
};
</script>

<style lang="scss">
    .el-card__header {
        padding: 10px 20px;
        .title {
            color: $color-title;
            font-size: 16px;
            margin-right: 24px
        }
    }
    .sellerOrder-main{
        background-color: $color-white;
        .sellerOrder{
            width: 1200px;
            margin: auto;
            .el-form-item__label{text-align: left}
            .form-item-ll{
                width: 450px;
            }
        }
        .createOrder-submit{
            text-align: right;
            .createOrder{
                margin-right: 52px;
            }
        }
        /*.el-select{*/
            /*width: 450px;*/
        /*}*/
    }
</style>
