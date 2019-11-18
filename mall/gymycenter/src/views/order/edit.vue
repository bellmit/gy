<template>
    <div class="orderEdit">
        <div class="new-title-public">
            发起订单
        </div>
        <p class="mewmyp"><i class="iconfont icon-dingdanxinxi"></i><span class="top-span">基础信息</span></p>
        <div class="gy-form">
            <div class="gy-form-group limit-height">
                <span class="l"><strong>*</strong>品名</span>
                <product-search :selected.sync="selectedProduct"></product-search>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>单价(元)</span>
                <input class="gy-input" type="text" v-model="skuPrice" placeholder="请输入">
            </div>
            <div class="gy-form-group limit-height">
                <span class="l"><strong>*</strong>交割库</span>
                <div class="delivery-list">
                    <input type="text" class="gy-input" v-model="deliveryWarehouseName" @keyup.enter="getWarehouses" placeholder="请选择">
                    <ul v-show="showWarehouses">
                        <li v-for="(item, index) in warehousesList" :key="index" @click="handleSelectP(item)" v-if="warehousesList.length > 0">{{item.value}}</li>
                    </ul>
                    <i class="iconfont icon-mySearch dw-c" @click="getWarehouses"></i>
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>数量</span>
                <input type="text" v-model="skuQuantity" class="number_input" placeholder="请输入">
                <el-select v-model="list.infUnitOfMeasureId" class="number_select">
                    <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group limit-heights">
                <span class="l">交割时间</span>
                <div class="delivery-time">
                    <el-radio-group v-model="list.deliveryDateFlag">
                        <el-radio :label="1">时间段</el-radio>
                        <el-radio :label="2">时间点</el-radio>
                        <el-radio :label="3">自定义</el-radio>
                    </el-radio-group>
                    <el-date-picker v-if="list.deliveryDateFlag==1"
                                    v-model="deliveryDate"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    :start-placeholder=list.deliveryBeginDate|date
                                    :end-placeholder=list.deliveryEndDate|date
                                    :picker-options="pickerOptions">
                    </el-date-picker>
                    <template v-if="list.deliveryDateFlag==2">
                        <el-date-picker
                                class="date_select"
                                v-model="list.deliveryBeginDate"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                        <div class="date_text">以前</div>
                    </template>
                    <template v-if="list.deliveryDateFlag==3">
                        <el-input v-model="list.deliveryDateText"></el-input>
                    </template>
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l">总金额(元)</span>
                <span class="left-span">{{ sum| numToCash}}</span>
            </div>
        </div>
        <p class="mewmyp"><i class="iconfont icon-dingdanxinxi mewmyicon"></i><span class="top-span">详细信息</span></p>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l">资源编号</span>
                <span class="left-span">-</span>
            </div>
            <div class="gy-form-group">
                <span class="l" v-if="type === 2"><strong>*</strong>买方公司名</span>
                <span class="l" v-if="type === 1"><strong>*</strong>卖方公司名</span>
                <div class="delivery-list">
                    <input placeholder="请输入" type="text" class="gy-input" v-model="companyName" @keyup.enter="getCompany">
                    <ul v-show="showCompany">
                        <li v-for="(item, index) in listCompany" :key="index" @click="handleSelectA(item)" v-if="listCompany.length > 0">{{item.value}}</li>
                        <li class="none-tips" v-if="listCompany.length === 0">没有搜到相关公司</li>
                    </ul>
                    <i class="iconfont icon-mySearch dw-c" @click="getCompany"></i>
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l">合同编号</span>
                <span class="left-span">{{info.contractCode || '-'}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>交付方式</span>
                <el-select v-model="info.deliveryType" placeholder="请选择">
                    <el-option
                            v-for="item in deliveryTypeOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group limit-height">
                <span class="l"><strong>*</strong>交割仓库地址</span>
                <input class="gy-input" type="text" v-model="list.deliveryDetailedAddress" placeholder="请输入">
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>免仓期</span>
                <div class="warehouseNumber">
                    <el-input-number v-model="info.warehouseFreeDays" :min="0" :step="1"></el-input-number>
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>付款方式</span>
                <div class="payway-box">
                    <el-select v-model="info.paymentType" placeholder="请选择">
                        <el-option
                                v-for="item in transactionOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <i class="iconfont icon-help" title="买家付款后资金进入担保账户，确认收货后自动打款。只支持在线支付方式。" v-if="info.paymentType === 10"></i>
                </div>
                <template v-if="info.paymentType===1">
                    <el-select v-model="info.paymentWhenStart" placeholder="请选择" class="float-L">
                        <el-option
                                v-for="item in paymentWhenStartList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <input class="gy-input float-M" type="text" v-model="info.paymentTypeText">
                    <el-select v-model="info.paymentDayType" placeholder="请选择" class="float-R">
                        <el-option
                                v-for="item in paymentDayTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </template>
                <template v-if="info.paymentType===0 && productType === 3">
                    <el-date-picker
                            class="date_selects"
                            v-model="info.paymentTypeDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                    <div class="date_texts">以前付款</div>
                </template>
            </div>
            <div class="gy-form-group" :class="{'limit-heights': info.isBatchDelivery === 1}">
                <span class="l"><strong v-if="productType !== 3">*</strong>是否分批</span>
                <el-select v-model="info.isBatchDelivery" placeholder="请选择">
                    <el-option
                            v-for="item in isBatchDeliveryo"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <template v-if="info.isBatchDelivery === 1" style="height:46px;">
                    <span class="batch-span batch-span-margin">每</span>
                    <input class="gy-input batch-span-input" type="text" v-model="info.batchDeliveryQuantity">
                    <span class="batch-span">吨最多分</span>
                    <input class="gy-input batch-span-input" type="text" v-model="info.batchDeliveryFrequency">
                    <span class="batch-span">批</span>
                </template>
            </div>
            <div class="gy-form-group limit-height">
                <span class="l"><strong v-if="productType !== 3">*</strong>溢短装</span>
                <div class="warehouseNumber">
                    <el-input-number v-model="info.shortOverflowRate" :min="0" :step="1"></el-input-number>
                </div>
            </div>
            <div class="gy-form-group limit-height">
                <span class="l"><strong>*</strong>保证金(%)</span>
                <div class="warehouseNumber">
                    <el-input-number v-model="info.depositRatio" :min="0" :step="1"></el-input-number>
                </div>
            </div>
            <div class="gy-form-group limit-height">
                <span class="l"><strong v-if="productType !== 3">*</strong>追加保证金(%)</span>
                <div class="warehouseNumber">
                    <span class="warehouseLeft">跌</span>
                    <el-input-number v-model="info.depositRatioSubtract" :min="0" :step="1"></el-input-number>
                    <span class="warehouseRight">补</span>
                    <el-input-number v-model="info.depositRatioAppend" :min="0" :step="1"></el-input-number>
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>合同回签时间</span>
                <el-select v-model="info.contractBackSignDate" placeholder="请选择">
                    <el-option
                            v-for="item in SignDateOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>发票</span>
                <el-select v-model="provideInvoiceType" placeholder="请选择" class="provideOption">
                    <el-option
                            v-for="item in provideInvoiceOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <div class="provideOptionText">或</div>
                <input class="gy-input provideOption" type="text" v-model="info.provideInvoiceText" placeholder="请输入" @focus="provideInvoiceType = ''">
            </div>
            <div class="gy-form-group limit-height" v-if="!(info.depositRatioSubtract === 0 && info.depositRatioAppend === 0) && productType !== 3">
                <span class="l"><strong>*</strong>追保基准</span>
                <el-autocomplete
                        class="provideOption"
                        v-model="info.depositAppendBenchmark"
                        :fetch-suggestions="querySearch1"
                        placeholder="请输入或选择">
                </el-autocomplete>
                <el-autocomplete
                        class="provideOption"
                        v-model="info.depositAppendArea"
                        :fetch-suggestions="querySearch2"
                        placeholder="请输入或选择">
                </el-autocomplete>
                <div class="provideOptionText">地区</div>
            </div>
            <div class="gy-form-group" v-if="!(info.depositRatioSubtract === 0 && info.depositRatioAppend === 0) && productType === 3">
                <span class="l">追保基准</span>
                <el-select v-model="info.depositAppendBenchmark" placeholder="请选择">
                    <el-option
                            v-for="item in datum"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>结算数量</span>
                <el-select v-model="info.acceptanceStandard" placeholder="请选择">
                    <el-option
                            v-for="item in acceptanceOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group limit-height">
                <span class="l"><strong>*</strong>货源</span>
                <el-autocomplete
                        class="inline-input"
                        v-model="info.skuOrigin"
                        :fetch-suggestions="querySearchSkuOrigin"
                        placeholder="请输入或选择">
                </el-autocomplete>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>质量标准</span>
                <el-select v-model="info.qualityStandard" placeholder="请选择">
                    <el-option
                            v-for="item in qualityStandardOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group" v-if="productType !== 3">
                <span class="l"><strong>*</strong>包装标准</span>
                <el-select v-model="info.packagingStandard" placeholder="请选择">
                    <el-option
                            v-for="item in packagingOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group" v-if="productType === 3">
                <span class="l"><strong>*</strong>包装标准</span>
                <template>
                    <el-select v-model="info.packagingStandard" placeholder="请选择" class="provideOption">
                        <el-option
                                v-for="item in packagingStandardVal"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <div class="packagingLeft" v-if="info.packagingStandard === 3">25KG/包</div>
                    <div class="packagingLeft" v-if="info.packagingStandard === 4">
                        <input placeholder="请输入" type="text" v-model="info.packagingStandardVal">
                    </div>
                    <div class="packagingRight" v-if="info.packagingStandard === 4">KG</div>
                </template>
            </div>
            <div class="gy-form-group limit-height">
                <span class="l"><strong>*</strong>卖方联系人</span>
                <div class="delivery-list">
                    <input placeholder="请输入" type="text" @click="showSeller=false" class="gy-input" v-model="info.sellerContact"  @keyup.enter="getSeller">
                    <ul v-show="showSeller">
                        <li v-for="(item, index) in sellerList" :key="index" @click="handleSeller(item)" v-if="sellerList.length > 0">{{item.contactName}}</li>
                        <li class="none-tips" v-if="sellerList.length === 0">没有搜到相关内容</li>
                    </ul>
                    <i class="iconfont icon-mySearch dw-c" @click="getSeller"></i>
                </div>
            </div>
            <div class="gy-form-group limit-height">
                <span class="l"><strong>*</strong>卖方联系方式</span>
                <input class="gy-input" type="text" placeholder="请输入" v-model="info.sellerContactMobile">
            </div>
            <div class="gy-form-group limit-height">
                <span class="l"><strong>*</strong>买方联系人</span>
                <div class="delivery-list">
                    <input placeholder="请输入" type="text" @click="showBuyer=false" class="gy-input" v-model="info.buyerContact"  @keyup.enter="getBuyer">
                    <ul v-show="showBuyer">
                        <li v-for="(item, index) in buyerList" :key="index" @click="handleBuyer(item)" v-if="buyerList.length > 0">{{item.contactName}}</li>
                        <li class="none-tips" v-if="buyerList.length === 0">没有搜到相关内容</li>
                    </ul>
                    <i class="iconfont icon-mySearch dw-c" @click="getBuyer"></i>
                </div>
            </div>
            <div class="gy-form-group limit-height">
                <span class="l"><strong>*</strong>买方联系方式</span>
                <input class="gy-input" type="text" placeholder="请输入" v-model="info.buyerContactMobile">
            </div>
            <div class="gy-form-group limit-height" v-if="productType === 3">
                <span class="l"><strong>*</strong>损耗(‰)</span>
                <div class="warehouseNumber">
                    <el-input-number v-model="info.spoilage" :min="0" :step="1"></el-input-number>
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>合同签订地址</span>
                <input class="gy-input" type="text" placeholder="请输入" v-model="info.contractSigningAddress">
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>合同模板</span>
                <el-select v-model="info.contractTemplateId" placeholder="请选择">
                    <el-option
                            v-for="item in tempOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group single-row">
                <span class="l">其他条款</span>
                <textarea style="width:308px;" placeholder="请输入合同补充条款" class="gy-textarea" v-model="info.otherTerms"></textarea>
            </div>
        </div>
        <div class="foot mybtn">
            <div class="l"><span class="wxts">温馨提示：</span>请注意交易信息真实合规。如需配置订单审批流程，请联系客服热线：400-777-6777</div>
            <div class="r">
                <div class="gy-button-extra" @click="submitFormValid">生成订单</div>
            </div>
        </div>
    </div>
</template>

<script>
import productSearch from '@/components/productSearch';
export default {
    data () {
        return {
            type: '',
            info: {
                orderType: 6, // 6：直采订单
                buyerCompanyId: '',
                buyerCompanyName: '',
                buyerContactMobile: '',
                buyerContact: '',
                sellerCompanyId: '',
                sellerCompanyName: '',
                sellerContactMobile: '',
                sellerContact: '',
                deliveryType: 1,
                warehouseFreeDays: 0,
                paymentType: 0,
                paymentWhenStart: 2, // 付款开始（1：收货之日起；2：发货之日起；3：合同签定之日起；）
                paymentDayType: 1, // 天计算类型（1：工作日之内付款；2：自然日之内付款；）
                paymentTypeText: '',
                isBatchDelivery: 0, // 是否分批
                batchDeliveryQuantity: '',
                batchDeliveryFrequency: '',
                shortOverflowRate: 0,
                depositRatio: 0,
                depositRatioSubtract: 0,
                depositRatioAppend: 0,
                contractBackSignDate: 0,
                provideInvoiceText: '',
                depositAppendBenchmark: '',
                depositAppendArea: '',
                acceptanceStandard: 0,
                skuOrigin: '',
                qualityStandard: '国标',
                packagingStandard: 0,
                contractSigningAddress: '',
                spoilage: 0,
                contractCode: '', // 合同编号
                contractTemplateId: '',
                otherTerms: '',
                packagingStandardType: 0, // 0：通用，1：塑料
                paymentTypeDate: ''
            },
            selectedProduct: {}, // 品名
            productType: '', // 产品类型
            skuPrice: '',
            skuQuantity: '',
            showWarehouses: false, // 交割库选项列表
            warehousesList: [], // 存放交割库选项列表
            companyName: '',
            showCompany: false, // 买卖公司名
            listCompany: [], // 买卖公司名列表
            deliveryWarehouseName: '', // 交割库
            options: [], // 数量单位
            list: {
                odrOfferId: 0,
                skuCode: '',
                skuPrice: '',
                skuQuantity: '',
                infUnitOfMeasureId: 2,
                deliveryDateFlag: 3,
                deliveryDateText: '双方协商为准',
                deliveryBeginDate: '',
                deliveryEndDate: '',
                deliveryWarehouseName: '',
                deliveryDistrictId: '',
                districtName: '',
                cityName: '',
                provinceName: '',
                deliveryWarehouseId: '',
                deliveryDetailedAddress: ''
            }, // 交割时间 默认自定义
            deliveryDate: [], // 存时间
            sum: 0,
            skuOriginList: [],
            showSeller: false,
            sellerList: [],
            showBuyer: false,
            buyerList: [],
            companyId: '',
            tempOptions: [], // 合同模版列表
            provideInvoiceType: 0, // 发票
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
            },
            datum: [ { 'label': '主力盘', 'value': '主力盘' } ],
            deliveryTypeOption: [
                {
                    value: 1,
                    label: '买家自提'
                },
                {
                    value: 2,
                    label: '卖家送货'
                }],
            transactionOption: [
                {
                    value: 0,
                    label: '先款后货'
                },
                {
                    value: 1,
                    label: '先货后款'
                },
                {
                    value: 10,
                    label: '担保交易'
                }],
            isBatchDeliveryo: [
                {
                    value: 0,
                    label: '否'
                },
                {
                    value: 1,
                    label: '是'
                }],
            SignDateOption: [
                {
                    value: 0,
                    label: '当天'
                },
                {
                    value: 1,
                    label: '隔日'
                }],
            provideInvoiceOption: [
                {
                    value: 0,
                    label: '交割当月发票'
                },
                {
                    value: 1,
                    label: '交割次月发票'
                }],
            acceptanceOption: [
                {
                    value: 0,
                    label: '出库单数量'
                },
                {
                    value: 1,
                    label: '收货单数量'
                }],
            qualityStandardOption: [
                {
                    value: '国标',
                    label: '国标'
                },
                {
                    value: '生产商标准',
                    label: '生产商标准'
                }],
            packagingOption: [
                {
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
            packagingStandardVal: [
                {
                    value: 3,
                    label: '原厂原包'
                },
                {
                    value: 4,
                    label: '吨包'
                },
                {
                    value: 5,
                    label: '灌包'
                }],
            paymentWhenStartList: [
                {
                    value: 1,
                    label: '收货之日起'
                },
                {
                    value: 2,
                    label: '发货之日起'
                },
                {
                    value: 3,
                    label: '合同签定之日起'
                }
            ],
            paymentDayTypeList: [
                {
                    value: 1,
                    label: '工作日付款'
                },
                {
                    value: 2,
                    label: '自然日付款'
                }
            ]
        };
    },
    components: {
        productSearch
    },
    watch: {
        selectedProduct: function (val) {
            if (val.masterCatalogueId !== undefined) {
                this.productType = val.masterCatalogueId;
                this.list.skuCode = val.skuCode;
                if (this.productType === 3) {
                    this.info.packagingStandard = 3;
                    this.info.packagingStandardType = 1;
                } else {
                    this.info.packagingStandard = 0;
                    this.info.packagingStandardType = 0;
                }
                this.info.depositAppendBenchmark = '';
                this.info.depositAppendArea = '';
                this.getcontractCode();
                this.getTem();
            } else {
                this.productType = '';
                this.list.skuCode = '';
            }
        },
        skuPrice: function () {
            this.sum = parseFloat(this.skuPrice) * parseFloat(this.skuQuantity);
        },
        skuQuantity: function () {
            this.sum = parseFloat(this.skuPrice) * parseFloat(this.skuQuantity);
        },
        provideInvoiceType: function (val) {
            if (val != null) {
                this.info.provideInvoiceText = '';
            }
        },
        packagingStandard: function (val) {
            if (val === 3) {
                this.info.packagingStandardVal = '25KG/包';
            } else if (val === 4 || val === 5) {
                this.info.packagingStandardVal = '';
            }
        }
    },
    computed: {
        packagingStandard () {
            return this.info.packagingStandard;
        }
    },
    created () {
        this.init();
    },
    mounted () {
        this.restList = this.loadA();
        this.restListB = this.loadB();
        this.skuOriginList = this.skuOrigin();
    },
    methods: {
        // 初始化
        init () {
            this.type = Number(this.$route.query.type); // type 1 采购入口 当前为买方 2 销售入口 当前为卖方
            var value = JSON.parse(localStorage.getItem('userInfo'));
            if (this.type === 1) {
                this.info.buyerCompanyName = value.companyName;
                this.info.buyerCompanyId = value.companyId;
                this.info.buyerContactMobile = value.phone;
                this.info.buyerContact = value.username;
            } else if (this.type === 2) {
                this.info.sellerCompanyName = value.companyName;
                this.info.sellerCompanyId = value.companyId;
                this.info.sellerContactMobile = value.phone;
                this.info.sellerContact = value.username;
            }
            this.measures();
        },
        // 获取单位
        measures () {
            let that = this;
            that.$http.post(that.$api.offers.measures).then(function (res) {
                that.options = res.data.data.list;
            });
        },
        // 获取交割库
        getWarehouses () {
            this.showWarehouses = true;
            this.$http.get(this.$api.offers.warehouses + this.deliveryWarehouseName).then((res) => {
                if (res.data.code === 0) {
                    let param = {};
                    this.warehousesList = [];
                    for (let i = 0; i < res.data.data.length; i++) {
                        param.value = res.data.data[i].name;
                        param.id = res.data.data[i].id;
                        param.provinceName = res.data.data[i].provinceName;
                        param.cityName = res.data.data[i].cityName;
                        param.districtName = res.data.data[i].districtName;
                        param.districtId = res.data.data[i].districtId;
                        param.address = res.data.data[i].address;
                        this.warehousesList.push(param);
                        param = {};
                    }
                } else {
                    console.log('服务器繁忙');
                }
            });
        },
        handleSelectP (item) {
            this.list.deliveryWarehouseId = item.id;
            this.deliveryWarehouseName = item.value;
            this.list.provinceName = item.provinceName;
            this.list.cityName = item.cityName;
            this.list.districtName = item.districtName;
            this.list.deliveryDistrictId = item.districtId;
            this.list.deliveryDetailedAddress = item.address;
            this.showWarehouses = false;
        },
        // 获取买卖公司名
        getCompany () {
            var that = this;
            that.showCompany = true;
            that.listCompany = [];
            this.$http.post(that.$api.order.creatOrderCompanies, {
                companyTypeId: 1,
                name: that.companyName
            }).then(function (res) {
                if (res.data.code === 0) {
                    let param = {};
                    for (let i = 0; i < res.data.data.length; i++) {
                        param.value = res.data.data[i].companyName;
                        param.id = res.data.data[i].companyId;
                        that.listCompany.push(param);
                        param = {};
                    }
                } else {
                    console.log('商品服务器繁忙');
                }
            });
        },
        handleSelectA (item) {
            var that = this;
            if (that.type === 1) {
                that.info.sellerCompanyName = item.value;
                that.info.sellerCompanyId = item.id;
            } else {
                that.info.buyerCompanyName = item.value;
                that.info.buyerCompanyId = item.id;
            }
            that.companyName = item.value;
            that.showCompany = false;
        },
        getSeller () {
            var companyId = JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).companyId;
            var that = this;
            that.showSeller = true;
            that.sellerList = [];
            let data = {
                sellerCompanyId: that.type === 1 ? that.info.sellerCompanyId : companyId,
                buyerCompanyId: that.type === 1 ? companyId : that.info.buyerCompanyId,
                confirmCompanyId: that.type === 1 ? that.info.sellerCompanyId : companyId,
                contactName: that.info.sellerContact
            };
            this.$http.post(that.$api.order.orderContact, data).then(function (res) {
                if (res.data.code === 0) {
                    that.sellerList = res.data.data ? res.data.data : [];
                } else {
                    that.$message.error(res.data.message);
                }
            });
        },
        handleSeller (item) {
            this.info.sellerContact = item.contactName;
            this.info.sellerContactMobile = item.contactMobile;
            this.showSeller = false;
        },
        getBuyer () {
            var that = this;
            var companyId = JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).companyId;
            that.showBuyer = true;
            that.buyerList = [];
            let data = {
                sellerCompanyId: that.type === 1 ? that.info.sellerCompanyId : companyId,
                buyerCompanyId: that.type === 1 ? companyId : that.info.buyerCompanyId,
                confirmCompanyId: that.type === 1 ? companyId : that.info.buyerCompanyId,
                contactName: that.info.buyerContact
            };
            this.$http.post(that.$api.order.orderContact, data).then(function (res) {
                if (res.data.code === 0) {
                    that.buyerList = res.data.data ? res.data.data : [];
                } else {
                    that.$message.error(res.data.message);
                }
            });
        },
        handleBuyer (item) {
            this.info.buyerContact = item.contactName;
            this.info.buyerContactMobile = item.contactMobile;
            this.showBuyer = false;
        },
        // 合同编号
        getcontractCode () {
            this.$http.get(this.$api.order.contractCode + this.selectedProduct.productId).then((res) => {
                if (res.data.code === 0) {
                    this.info.contractCode = res.data.data;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        // 合同模版
        getTem () {
            this.companyId = JSON.parse(localStorage.getItem('userInfo')).companyId;
            this.$http.get(this.$api.order.contractTemplates + 'companyId=' + this.companyId + '&prdId=' + this.selectedProduct.productId + '&categoryId=' + this.productType + '&typeId=1').then((res) => {
                if (res.data.code === 0) {
                    // this.tempOptions = res.data.data;
                    this.tempOptions = [];
                    let param = {};
                    for (let i = 0; i < res.data.data.length; i++) {
                        param.label = res.data.data[i].templateName;
                        param.value = res.data.data[i].id;
                        this.tempOptions.push(param);
                        param = {};
                    }
                    if (this.tempOptions.length === 1) {
                        this.info.contractTemplateId = this.tempOptions[0].value;
                    }
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        submitFormValid () {
            // 验证
            if (!this.list.skuCode) {
                this.$message.error('请选择品名');
                return;
            }
            if (!this.skuPrice) {
                this.$message.error('单价不能为空');
                return;
            }
            if (!this.deliveryWarehouseName) {
                this.$message.error('交割库不能为空');
                return;
            }
            if (!this.skuQuantity) {
                this.$message.error('数量不能为空');
                return;
            }
            if (!this.list.infUnitOfMeasureId) {
                this.$message.error('数量单位不能为空');
                return;
            }
            if (!this.info.buyerCompanyName) {
                this.$message.error('买方公司名不正确');
                return;
            }
            if (this.type === 1 && !this.info.sellerCompanyName) {
                this.$message.error('卖方公司名不能为空');
                return;
            }
            if (!this.info.deliveryType) {
                this.$message.error('交付方式不能为空');
                return;
            }
            if (!this.list.deliveryDetailedAddress) {
                this.$message.error('交割仓库地址不能为空');
                return;
            }
            if (this.info.warehouseFreeDays === undefined || this.info.warehouseFreeDays === null || this.info.warehouseFreeDays === '') {
                this.$message.error('免仓期不能为空');
                return;
            }
            if (this.productType === 3 && this.info.paymentType === 0 && !this.info.paymentTypeDate) {
                this.$message.error('请选择付款日期');
                return;
            }
            let reg3 = /(^[-0-9][0-9]*(.[0-9]+)?)$/;
            if (this.info.paymentType === 1 && !this.info.paymentTypeText) {
                if (this.info.paymentDayType === 1) {
                    this.$message.error('请填写几个工作日付款');
                } else if (this.info.paymentDayType === 2) {
                    this.$message.error('请填写几个自然日付款');
                }
                return;
            } else if (this.info.paymentType === 1 && this.info.paymentTypeText) {
                if (this.info.paymentDayType === 1 && !reg3.test(this.info.paymentTypeText)) {
                    this.$message.error('请输入有效的工作日');
                    return;
                } else if (this.info.paymentDayType === 2 && !reg3.test(this.info.paymentTypeText)) {
                    this.$message.error('请输入有效的自然日');
                    return;
                }
            }
            if (this.productType !== 3) {
                if (this.info.isBatchDelivery === 1 && (!this.info.batchDeliveryFrequency || !this.info.batchDeliveryQuantity)) {
                    this.$message.error('请输入吨数和批次');
                    return;
                }
                if (this.info.shortOverflowRate === undefined || this.info.shortOverflowRate === null || this.info.shortOverflowRate === '') {
                    this.$message.error('溢短装不能为空');
                    return;
                }
            }
            if (this.info.depositRatio === undefined || this.info.depositRatio === null || this.info.depositRatio === '') {
                this.$message.error('保证金不能为空');
                return;
            }
            if (this.productType !== 3) {
                if (this.info.depositRatioAppend === undefined || this.info.depositRatioAppend === null || this.info.depositRatioAppend === '' || this.info.depositRatioSubtract === undefined || this.info.depositRatioSubtract === null || this.info.depositRatioSubtract === '') {
                    this.$message.error('追加保证金不能为空');
                    return;
                }
                if (this.info.depositRatioAppend || this.info.depositRatioSubtract) {
                    if (!this.info.depositAppendBenchmark || !this.info.depositAppendArea) {
                        this.$message.error('请填写追保基准和地区');
                        return;
                    }
                }
            }
            if (!this.info.provideInvoiceText && this.provideInvoiceType === '') {
                this.$message.error('请选择发票或输入发票备注');
                return;
            }
            if (!this.info.skuOrigin) {
                this.$message.error('请选择货源');
                return;
            }
            if (this.productType === 3 && !(this.info.packagingStandard === 5) && !this.info.packagingStandardVal) {
                this.$message.error('包装标准不能为空');
                return;
            }
            if (!this.info.sellerContact) {
                this.$message.error('卖方联系人不能为空');
                return;
            }
            if (!this.$tools.verifyMobile(this.info.sellerContactMobile)) {
                this.$message.error('请填写正确卖方联系方式');
                return;
            }
            if (!this.info.buyerContact) {
                this.$message.error('买方联系人不能为空');
                return;
            }
            if (!this.$tools.verifyMobile(this.info.buyerContactMobile)) {
                this.$message.error('请填写正确买方联系方式');
                return;
            }
            if (this.productType !== 3 && (this.info.spoilage === undefined || this.info.spoilage === null || this.info.spoilage === '')) {
                this.$message.error('损耗不能为空');
                return;
            }
            if (!this.info.contractSigningAddress) {
                this.$message.error('请填写合同签订地址');
                return;
            }
            if (!this.info.contractTemplateId) {
                this.$message.error('合同模板不能为空');
                return;
            }
            this.submitForm();
        },
        submitForm () {
            var that = this;
            this.list.skuPrice = this.skuPrice;
            this.list.skuQuantity = this.skuQuantity;
            this.list.deliveryWarehouseName = this.deliveryWarehouseName;
            if (this.list.deliveryDateFlag === 1) {
                this.list.deliveryBeginDate = new Date(this.deliveryDate[0]).getTime();
                this.list.deliveryEndDate = new Date(this.deliveryDate[1]).getTime();
            }
            if (this.list.deliveryDateFlag === 2) {
                this.list.deliveryBeginDate = this.info.deliveryBeginDate;
            }
            if (!(this.productType === 3) && this.info.depositRatioSubtract === 0 && this.info.depositRatioAppend === 0) {
                this.info.depositAppendBenchmark = this.info.depositAppendBenchmark ? this.info.depositAppendBenchmark : '安迅思';
                this.info.depositAppendArea = this.info.depositAppendArea ? this.info.depositAppendArea : '华东';
            }
            this.info.orderItemList = [];
            this.info.provideInvoiceType = this.provideInvoiceType;
            this.info.orderItemList.push(this.list);
            console.log(this.info);
            // console.log(this.info);
            this.$http.post(this.$api.order.createOrderList, this.info)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.$router.go(-1);
                    } else {
                        this.$message(res.data.message);
                    }
                }).catch(() => {
                    console.log('服务器繁忙');
                });
        },
        // 货源
        skuOrigin () {
            return [
                {
                    value: '国产'
                },
                {
                    value: '进口'
                }
            ];
        },
        loadA () {
            return [
                {
                    value: '安迅思'
                },
                {
                    value: 'CCF'
                },
                {
                    value: '卓创'
                },
                {
                    value: '隆众网'
                }
            ];
        },
        loadB () {
            return [
                {
                    value: '华东'
                },
                {
                    value: '华南'
                }
            ];
        },
        querySearch1 (queryString, cb) {
            var restaurants = this.restList;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        querySearch2 (queryString, cb) {
            var restaurants = this.restListB;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        querySearchSkuOrigin (queryString, cb) {
            var restaurants = this.skuOriginList;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter (queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        }
    }
};
</script>

<style lang="scss" scoped>
    .orderEdit{
        .mewmyp{
            margin:20px 7px 0;
            .iconfont{
                color: #ee7502;
            }
        }
        .top-span{
            font-size: 14px;
            color: #333;
            font-weight: bold;
            margin-left: 7px;
            vertical-align: middle;
        }
        .center{
            padding:0 10px;
        }
        .limit-height{
            height:46px;
        }
        .limit-heights{
            height:78px;
        }
        .delivery-list{
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
            .dw-c{
                position: absolute;
                right: 7px;
                top: 0;
            }
        }
        .number_input{
            width: 70%;
            float: left;
        }
        .number_select{
            width: 30%;
            float: right;
            margin-top: -1px;
        }
        .left-span{
            margin-left:10px;
        }
        .date_select{
            width: 90%;
            float: left;
        }
        .date_text{
            width: 10%;
            float: right;
        }
        .date_selects{
            width: 80%;
            float: left;
        }
        .date_texts{
            width: 20%;
            float: right;
        }
        .warehouseNumber{
            margin-top:-6px;
        }
        .warehouseLeft{
             margin-right:3px;
        }
        .warehouseRight{
            margin:0 3px;
        }
        .provideOption{
            width:45%;
            float: left;
        }
        .packagingLeft{
            width:46%;
            float: left;
        }
        .packagingRight{
            width:8%;
            float: left;
            text-align: right;
        }
        .provideOptionText{
            float: left;
            width:10%;
            text-align: center;
        }
        .mybtn{
            margin-top: 10px;
            margin-bottom: 30px;
            text-align: right;
            padding-right: 30px;
        }
        .wxts {
            color: #EEA443;
            font-size: 14px;
            font-weight: bold;
        }
        .foot {
            display: flex;
            .l{
                width: 70%;
                padding-left: 30px;
                line-height: 30px;
                text-align: left;
            }
            .r{
                width: 30%;
                text-align: right;
            }
        }
        .payway-box{
            position: relative;
            .icon-help{
                position: absolute;
                top: 0;
                left: 70px;
                cursor: pointer;
            }
        }
        .float-L{
            float:left;
            width:47%;
        }
        .float-M{
            float:left;
            width:11%;
            margin:2px 6px 0;
            padding:0;
        }
        .float-R{
            float:left;
            width:38%;
        }
        .batch-span{
            float:left;
        }
        .batch-span-margin{
            margin-left:10px;
        }
        .batch-span-input{
            float:left;
            width:34%;
        }
    }
</style>
<style lang="scss">
    .orderEdit{
        .el-input-number__decrease{
            position: absolute;
            z-index: 1;
            top: 9px;
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
            top: 9px;
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
        .el-autocomplete{
            width: 100%;
        }
        .el-date-editor .el-range-separator{
            padding:0;
        }
    }
</style>
