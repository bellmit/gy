<template>
    <div class="sellerOrder order-add">
      <el-form :model="info" :rules="ruleForm" ref="form" label-width="115px" size="mini"
               class="demo-ruleForm order-add">
        <p><i class="el-icon-tickets"></i> 基础信息</p>
        <el-row>
          <el-col :span="11">
            <el-form-item label="品名">
              {{info.skuName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="单价(元)" prop="skuPrice">
              <input type="text" v-model="info.skuPrice">
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="交割库" prop="deliveryWarehouseName">
              <div class="product-list">
                <input type="text" class="gy-input" v-model="deliveryWarehouseName"  @keyup.enter="getWarehouses">
                <ul v-show="showListA">
                  <li v-for="(item, index) in warehousesList" :key="index" @click="handleSelectP(item)" v-if="warehousesList.length > 0">{{item.value}}</li>
                </ul>
                <ul v-show="showListA&&warehousesList.length===0">
                  <li>没有搜到</li>
                </ul>
                <i class="iconfont icon-search" @click="getWarehouses"></i>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="数量" prop="skuQuantity" style="overflow: hidden;">
              <input type="text" v-model="info.skuQuantity" style="width: 70%;float: left;margin-top: -1px;">
              <el-select v-model="info.infUnitOfMeasureId" style="width: 30%;float: right;">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="交割时间">
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
                              :start-placeholder=info.deliveryBeginDate|date
                              :end-placeholder=info.deliveryEndDate|date
                              :picker-options="pickerOptions">
              </el-date-picker>
              <template v-if="list.deliveryDateFlag==2">
                <el-row>
                  <el-col :span="18">
                    <el-date-picker
                      v-model="info.deliveryBeginDate"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-col>
                  <el-col :span="5">以前</el-col>
                </el-row>
              </template>
              <template v-if="list.deliveryDateFlag==3">
                <el-input v-model="list.deliveryDateText"></el-input>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="总金额">
              ￥{{ info.skuPrice * info.skuQuantity| numToCash}}元
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
            <el-form-item label="买方公司名" prop="companyName">
              <el-row>
                <el-col :span="23"><input @click="blur11" type="text" class="gy-input" v-model="info.companyName" @keyup.enter="onelist1click"></el-col>
                <el-col :span="1"><i class="iconfont icon-search"  @click="onelist1click"></i></el-col>
                <ul class="listul2"  v-show="onelist1Show">
                  <li v-for="(item,index) in onelist1" :key="index" @click="onelist1select(item)" v-if="onelist1.length>0">
                    {{item.companyName}}
                  </li>
                  <li class="none-tips" v-if="onelist1.length === 0">没有搜到相关公司</li>
                </ul>
              </el-row>
            </el-form-item>
            <!--<el-form-item label="买方公司名" prop="companyName">-->
              <!--<div class="product-list">-->
                <!--<input type="text" class="gy-input" v-model="info.companyName"  @keyup.enter="getCompany">-->
                <!--<ul v-show="showList">-->
                  <!--<li v-for="(item, index) in list1" :key="index" @click="handleSelectA(item)" v-if="list1.length > 0">{{item.value}}</li>-->
                  <!--<li class="none-tips" v-if="list1.length === 0">没有搜到相关公司</li>-->
                <!--</ul>-->
                <!--<i class="iconfont icon-search" @click="getCompany"></i>-->
              <!--</div>-->
            <!--</el-form-item>-->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="合同编号">
              {{info.contractCode}}
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="交付方式" prop="deliveryType">
              <el-select v-model="info.deliveryType" placeholder="请选择">
                <el-option
                  v-for="item in deliveryTypeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="交割仓库地址" prop="deliveryDetailedAddress">
              <input type="text" v-model="info.deliveryDetailedAddress">
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="免仓期" class="bao" prop="warehouseFreeDays">
              <!--<input  type="text" v-model="info.warehouseFreeDays">-->
              <el-input-number v-model="info.warehouseFreeDays" :min="0" :step="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="付款方式" prop="paymentType" >
              <el-select v-model="info.paymentType" placeholder="请选择">
                <el-option
                  v-for="item in transactionOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <template v-if="info.paymentType===1" >
                <el-col :span="9">买方收到货后</el-col>
                <el-col :span="5">
                  <el-input v-model="info.paymentTypeText"></el-input>
                </el-col>
                <el-col :span="9">个工作日付款</el-col>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="是否分批" prop="isBatchDelivery">
              <el-col :span="6">
                <el-select v-model="info.isBatchDelivery" placeholder="请选择">
                  <el-option
                    v-for="item in isBatchDeliveryo"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <template v-if="info.isBatchDelivery === 1">
                <el-col :span="1">每</el-col>
                <el-col :span="5">
                  <el-input v-model="info.batchDeliveryQuantity"></el-input>
                </el-col>
                <el-col :span="5">吨最多分</el-col>
                <el-col :span="5">
                  <el-input v-model="info.batchDeliveryFrequency"></el-input>
                </el-col>
                批
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="溢短装" class="bao" prop="shortOverflowRate">
              <!--<input  type="text" v-model="info.depositRatio">-->
              <el-input-number v-model="info.shortOverflowRate" :min="0" :step="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="11"  :offset="1" >
            <el-form-item label="发票" prop="provideInvoice">
              <el-col :span="11">
                <el-select v-model="provideInvoiceType" placeholder="请选择">
                  <el-option
                    v-for="item in provideInvoiceOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="1">或</el-col>
              <el-col :span="11">
                <el-input v-model="info.provideInvoiceText" placeholder="输入" @focus="changeInvoiceText"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="保证金(%)" class="bao" prop="depositRatio">
              <!--<input  type="text" v-model="info.depositRatio">-->
              <el-input-number v-model="info.depositRatio" :min="0" :step="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="追加保证金(%)" prop="depositRatio">
              <el-col :span="1">跌</el-col>
              <el-col :span="11">
                <el-input-number v-model="info.depositRatioSubtract" :min="0"
                                 :step="1"></el-input-number>
              </el-col>
              <el-col :span="1">补</el-col>
              <el-col :span="11">
                <el-input-number v-model="info.depositRatioAppend" :min="0" :step="1"></el-input-number>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="合同回签时间" prop="contractBackSignDate">
              <el-select v-model="info.contractBackSignDate">
                <el-option
                  v-for="item in SignDateOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="追保基准" class="depositAppend" prop="depositAppendBenchmark">
              <el-col :span="8">
                <el-autocomplete
                  class="inline-input"
                  v-model="info.depositAppendBenchmark"
                  :fetch-suggestions="querySearch1"
                  placeholder="请输入或选择"
                  @select="handleSelect"
                ></el-autocomplete>
              </el-col>
              <el-col :span="8" :offset="3" prop="depositAppendArea">
                <el-autocomplete
                  class="inline-input"
                  v-model="info.depositAppendArea"
                  :fetch-suggestions="querySearch2"
                  placeholder="请输入或选择"
                  @select="handleSelect"
                ></el-autocomplete>
              </el-col>
              <el-col :span="3">
                地区
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="结算数量" prop="acceptanceStandard">
              <el-select v-model="info.acceptanceStandard">
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
            <el-form-item label="货源" prop="skuOrigin">
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
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="质量标准" prop="qualityStandard">
              <el-select v-model="info.qualityStandard">
                <el-option
                  v-for="item in qualityStandardOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="包装标准" prop="packagingStandard">
              <el-select v-model="info.packagingStandard">
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
        <el-row>
          <el-col :span="11" prop="sellerContact">
            <el-form-item label="卖方联系人" prop="sellerContact">
              <input type="text" v-model="info.sellerContact">
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="卖方联系方式" prop="sellerContactMobile">
              <input type="text" v-model="info.sellerContactMobile">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="买方联系人" prop="buyerContact">
              <input type="text" v-model="info.buyerContact">
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="买方联系方式" prop="buyerContactMobile">
              <input type="text" v-model="info.buyerContactMobile">
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="合同模板" prop="contractTemplateId">
              <el-select v-model="info.contractTemplateId" placeholder="请选择">
                <el-option
                  v-for="item in tempOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="gy-btn-bottom">
          <el-col :span="23" style="text-align: right">
            <el-form-item>
              <div class="gy-button-extra" @click.prevent="submitFormValid()"> 生成订单</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
</template>
<script>
export default {
    name: 'sellerOrder',
    data () {
        var append = (rule, value, callback) => {
            if (this.info.depositRatioAppend || this.info.depositRatioSubtract) {
                if (!this.info.depositAppendBenchmark || !this.info.depositAppendArea) {
                    callback(new Error('请填写追保基准和地区'));
                }
            }
            callback();
        };
        var provideInvoice = (rule, value, callback) => {
            if (!this.info.provideInvoiceText && this.provideInvoiceType === '') {
                callback(new Error('请选择发票或输入发票备注'));
            }
            callback();
        };
        var isBatchDelivery = (rule, value, callback) => {
            if (this.info.isBatchDelivery === 1 && (!this.info.batchDeliveryFrequency || !this.info.batchDeliveryQuantity)) {
                callback(new Error('请输入吨数和批次'));
            }
            callback();
        };
        var paymentType = (rule, value, callback) => {
            if (this.info.paymentType === 1 && this.info.paymentTypeText === '') {
                console.log(11);
                callback(new Error('请填写几个工作日付款'));
            }
            callback();
        };
        var houseName = (rule, value, callback) => {
            if (this.deliveryWarehouseName === '') {
                callback(new Error('请输入交割仓库名称'));
            }
            callback();
        };
        // var append = (rule, value, callback) => {
        //     if (!this.info.depositAppendBenchmark && !this.info.depositAppendArea) {
        //         callback(new Error('请填写追保基准和地区'));
        //     }
        //     callback();
        // };
        return {
            onelist1: [],
            onelist1Show: false,
            showList: false,
            sellerCompanyId: '',
            value5: '',
            info: {
                skuQuantity: 0,
                orderItemList: [],
                infUnitOfMeasureId: '',
                qualityStandard: '国标',
                packagingStandard: '',
                depositRatio: 5,
                paymentType: 0,
                batchDeliveryQuantity: '',
                batchDeliveryFrequency: '',
                buyerContact: '',
                deliveryType: 0,
                skuPrice: 0,
                companyName: '',
                provideInvoiceText: '',
                contractTemplateId: '',
                depositAppendBenchmark: '',
                depositAppendArea: '',
                shortOverflowRate: 5, // 溢短装
                isBatchDelivery: 0, // 是否分批
                warehouseFreeDays: 5, // 免仓期
                acceptanceStandard: 0,
                contractBackSignDate: 0,
                depositRatioSubtract: 5,
                depositRatioAppend: 5,
                contractCode: '',
                deliveryBeginDate: '',
                paymentTypeText: '',
                sellerContact: '',
                sellerContactMobile: ''
            },
            showListA: false,
            list1: [],
            restList: [],
            restListB: [],
            tempOptions: [],
            provideInvoiceType: '',
            ruleForm: {
                skuPrice: [{required: true, message: '请输入单价', trigger: 'blur'}], // 单价
                companyName: [{required: true, message: '请输入并选择买家公司名', trigger: 'blur'}], // 买家公司名
                skuQuantity: [{required: true, message: '请输入数量', trigger: 'blur'}], // 可供量
                deliveryWarehouseName: [{required: true, validator: houseName, trigger: 'blur'}], // 交割库
                deliveryDate: [{required: true, message: '请选择交割时间', trigger: 'blur'}], // 交割时间
                skuOrigin: [{required: true, message: '请选择货源类型', trigger: 'blur'}], // 货源
                deliveryType: [{required: true, message: '请选择交付方式', trigger: 'blur'}], // 交割方式
                deliveryDetailedAddress: [{required: true, message: '请输入交割仓库地址', trigger: 'blur'}], // 交割地址
                warehouseFreeDays: [{required: true, message: '免仓期不能为空，你可以输入0', trigger: 'blur'}], // 免仓期
                shortOverflowRate: [{required: true, message: '溢短装不能为空，你可以输入0', trigger: 'blur'}], // 溢短装
                paymentType: [{required: true, validator: paymentType, trigger: 'blur'}], // 付款方式
                depositRatio: [{required: true, message: '保证金不能为空，请输入0', trigger: 'blur'}], // 保证金
                qualityStandard: [{required: true, message: '请选择质量标准', trigger: 'blur'}], // 质量标准
                packagingStandard: [{required: true, message: '请选择包装标准', trigger: 'blur'}], // 包装标准
                acceptanceStandard: [{required: true, message: '请选择验收标准', trigger: 'blur'}], // 验收标准
                contractBackSignDate: [{required: true, message: '请选择合同回签时间', trigger: 'blur'}], // 合同回签时间
                sellerContact: [{required: true, message: '请输入卖联系人', trigger: 'blur'}], // 卖联系人
                sellerContactMobile: [{required: true, message: '请输入卖方联系人电话', trigger: 'blur'}], // 卖方联系人电话
                buyerContact: [{required: true, message: '请输入买方联系人', trigger: 'blur'}], // 买方联系人
                buyerContactMobile: [{required: true, message: '请输入买方联系人电话', trigger: 'blur'}], // 买方联系人电话
                isBatchDelivery: [{required: true, validator: isBatchDelivery, trigger: 'blur'}], // 买方联系人电话
                // provideInvoiceType: [{required: false, validator: InvoiceType, trigger: 'blur'}], // 买方联系人电话
                contractTemplateId: [{required: true, message: '请选择合同模版', trigger: 'blur'}], // 买方联系人电话
                depositAppendBenchmark: [{required: true, validator: append, trigger: 'blur'}], // 买方联系人电话
                provideInvoice: [{required: true, validator: provideInvoice, trigger: 'blur'}] // 买方联系人电话
            },
            deliveryWarehouseName: '',
            companyId: '',
            list: {
                deliveryDateFlag: 1,
                deliveryDateText: '双方协商为准'
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
            qualityStandardOption: [{
                value: '国标',
                label: '国标'
            },
            {
                value: '生产商标准',
                label: '生产商标准'
            }],
            acceptanceOption: [{
                value: 0,
                label: '出库单数量'
            },
            {
                value: 1,
                label: '收货单数量'
            }],
            SignDateOption: [{
                value: 0,
                label: '当天'
            },
            {
                value: 1,
                label: '隔日'
            }],
            isBatchDeliveryo: [{
                value: 0,
                label: '否'
            },
            {
                value: 1,
                label: '是'
            }],
            options: [], // 存单位
            warehousesList: [],
            tempArray: [],
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
        this.offerId = this.$route.query.offerId;
        this.offerId && this.getInfo();
        this.measures();
    },
    watch: {
        provideInvoiceType: function () {
            this.info.provideInvoiceText = '';
        },
        deliveryWarehouseName: function (val) {
            if (val === '') {
                this.info.deliveryDetailedAddress = '';
            }
        }
    },
    computed: {
    // sum () {
    //     return parseFloat() * parseFloat(this.info.skuQuantity);
    // }
    },
    methods: {
        onelist1click () {
            var that = this;
            that.onelist1Show = true;
            that.$http.post(that.$api.orders.creatOrderCompanies2, {
                'companyTypeId': 1, // 1:交易公司  2：承运商
                'name': this.info.companyName
            })
                .then(function (res) {
                    that.onelist1 = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
            this.info.userCompanyId = '';
        },
        onelist1select (item) {
            var that = this;
            that.info.companyName = item.companyName;
            this.info.buyerCompanyName = item.companyName;
            this.info.buyerCompanyId = item.companyId;
            that.onelist1Show = false;
        },
        blur11 () {
            this.onelist1Show = false;
            this.info.companyName = '';
            this.info.userCompanyId = '';
        },
        getcontractCode () {
            this.$http.post(this.$api.orders.genContractCode, {
                prdId: this.info.productId,
                userCompanyId: this.sellerCompanyId
            }).then((res) => {
                if (res.data.code === 0) {
                    this.info.contractCode = res.data.data;
                    console.log(this.info.contractCode);
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        getTem () {
            this.$http.get(this.$api.orders.contractTemplates + 'companyId=' + this.sellerCompanyId + '&prdId=' + this.info.productId).then((res) => {
                if (res.data.code === 0) {
                    // this.tempOptions = res.data.data;
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
        measures () { // 获取单位
            let that = this;
            that.$http.post(that.$api.offers.measures).then(function (res) {
                that.options = res.data.data.list;
            });
        },
        changeInvoiceText () {
            this.provideInvoiceType = '';
        },
        getInfo () {
            let that = this;
            that.$http.get(that.$api.offers.resources + '/' + that.offerId).then(function (res) {
                if (res.data.code === 0) {
                    that.info = Object.assign(that.info, res.data.data);
                    that.sellerCompanyId = that.info.sellerCompanyId;
                    that.skuQuantity = that.info.skuQuantity;
                    if (that.info.paymentType === 2) {
                        that.info.paymentType = 0;
                    }
                    if (!that.info.skuPrice) {
                        that.info.skuPrice = '';
                    }
                    (that.info.deliveryType === 0) && (that.info.deliveryType = '');
                    that.list.deliveryDateFlag = that.info.deliveryDateFlag;
                    if (res.data.data.deliveryEndDate) {
                        that.deliveryDate[0] = res.data.data.deliveryBeginDate;
                        that.deliveryDate[1] = res.data.data.deliveryEndDate;
                    }
                    that.deliveryWarehouseName = that.info.deliveryWarehouseName;
                    that.getTem();
                    that.getcontractCode();
                } else {
                    that.$message('服务器繁忙');
                }
            });
        },
        submitFormValid () {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.submitForm();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        submitForm () {
            if (this.skuQuantity < this.info.skuQuantity) {
                this.$confirm('您输入的数量大于资源单发布的数量, 是否继续?', '提示', {
                    confirmButtonText: '继续',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.Submission();
                }).catch(() => {
                    return false;
                    // this.$message({
                    //     type: 'info',
                    //     message: '请修改订单数量或资源单数量'
                    // });
                });
            } else {
                this.Submission();
            }
        },
        Submission () {
            let that = this;
            console.log(that.info.deliveryWarehouseName);
            that.list.odrOfferId = that.offerId;
            that.list.skuPrice = that.info.skuPrice;
            that.list.infUnitOfMeasureId = that.info.infUnitOfMeasureId;
            that.list.deliveryWarehouseId = that.info.deliveryWarehouseId;
            that.list.deliveryWarehouseName = that.deliveryWarehouseName;
            that.list.deliveryDetailedAddress = that.info.deliveryDetailedAddress;
            if (that.list.deliveryDateFlag === 1) {
                that.list.deliveryBeginDate = new Date(this.deliveryDate[0]).getTime();
                that.list.deliveryEndDate = new Date(this.deliveryDate[1]).getTime();
            }
            if (that.list.deliveryDateFlag === 2) {
                that.list.deliveryBeginDate = that.info.deliveryBeginDate;
            }
            if (this.info.depositRatioSubtract === 0 && this.info.depositRatioAppend === 0) {
                this.info.depositAppendBenchmark = this.info.depositAppendBenchmark ? this.info.depositAppendBenchmark : '安迅思';
                this.info.depositAppendArea = this.info.depositAppendArea ? this.info.depositAppendArea : '华东';
            }
            that.list.skuQuantity = that.info.skuQuantity;
            that.info.orderItemList = [];
            that.info.provideInvoiceType = that.provideInvoiceType;
            that.info.orderItemList.push(that.list);
            that.$http.post(that.$api.orders.createOrderList, that.info)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.$router.push({name: 'orderList'});
                    } else {
                        this.$message({
                            message: res.data.message,
                            type: 'error'
                        });
                    }
                }).catch(() => {
                    console.log('服务器繁忙');
                });
        },
        querySearch (queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
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
        createFilter (queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadA () {
            return [{
                value: '安迅思'},
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
            return [{
                value: '华东'},
            {
                value: '华南'
            }
            ];
        },
        // handleSelectA (item) {
        //     var that = this;
        //     that.info.buyerCompanyName = item.value;
        //     that.info.buyerCompanyId = item.id;
        //     that.info.companyName = item.value;
        //     that.showList = false;
        // },
        handleSelect (item) {
            console.log(item);
        },
        getWarehouses () {
            this.showListA = true;
            this.$http.get(this.$api.offers.warehouses + this.deliveryWarehouseName).then((res) => {
                if (res.data.code === 0) {
                    let param = {};
                    this.warehousesList = [];
                    for (let i = 0; i < res.data.data.length; i++) {
                        console.log(res.data.data[i]);
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
            console.log(item);
            this.info.deliveryWarehouseId = item.id;
            this.deliveryWarehouseName = item.value;
            this.info.provinceName = item.provinceName;
            this.info.cityName = item.cityName;
            this.info.districtName = item.districtName;
            this.info.deliveryDistrictId = item.districtId;
            this.info.deliveryDetailedAddress = item.address;
            this.showListA = false;
        },
        getCompany () {
            var that = this;
            that.showList = true;
            that.list1 = [];
            this.$http.post(that.$api.orders.creatcompanynew, {
                companyTypeId: 1,
                name: that.info.companyName
            }).then(function (res) {
                if (res.data.code === 0) {
                    let param = {};
                    for (let i = 0; i < res.data.data.length; i++) {
                        param.value = res.data.data[i].companyName;
                        param.id = res.data.data[i].companyId;
                        that.list1.push(param);
                        param = {};
                    }
                } else {
                    console.log('商品服务器繁忙');
                }
            });
        }
    },
    mounted () {
        this.restList = this.loadA();
        this.restListB = this.loadB();
    }
};
</script>

<style lang="scss">
  .el-date-editor .el-range-separator{width:16% !important;}
</style>
<style lang="scss" scoped>
  .sellerOrder{
    .el-row{
      margin-top: 15px;
    }
  }
  .sellerOrder .el-card__header .title {
    font-weight: bold;
  }

  .sellerOrder {
    &.order-add{
    }
    .el-card__header {
      padding: 10px 20px;
      .title {
        color: $color-title;
        font-size: 16px;
        margin-right: 24px
      }
    }
    .el-autocomplete {
      width: 303px
    }

    .depositAppend .el-autocomplete{width:auto}
    .sellerOrder {
      .el-form-item__label {
        text-align: left
      }
    }

    .gy-btn-bottom {
      padding-top: 20px;
    }

    .demo-ruleForm {
      p {
        font-size: 16px;
        margin-bottom: 12px;
        padding-top: 15px;
        color: #333;
      }

      .el-row {
        margin-left: 1.6em;
      }
    }

    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
      margin-bottom: 6px;
    }
    .el-autocomplete.inline-input .el-form-item--mini .el-form-item__error {
      z-index: 22;
    }
    .product-list{
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
      .icon-search{
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
  .el-form-item--mini .el-form-item__error{z-index: 500!important;}
  .listul2{
    background-color: #fff;
    width: 95%;
    max-height: 200px;
    overflow: auto;
    position: absolute;
    left: 1px;
    top: 31px;
    z-index: 9;
    border: 1px solid #e6eaea;
    border-top: none;
    li{
      padding: 5px 10px;
    }
    li:hover{
      cursor: pointer;
      background-color: #f5f7fa;
      color: #4a90e2;
    }
  }
</style>
