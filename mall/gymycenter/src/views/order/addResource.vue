<template>
    <div class="resource-add new_resourseadd">
        <div>
            <div class="top1">
                <span class="title">{{offerId ? '发布需求单': '发布需求单'}}</span>
            </div>
            <div>
                <el-form :model="info" :rules="ruleForm" ref="formA" size="mini" label-width="106px"
                         class="demo-ruleForm">
                    <el-row class="top2">
                        <p class="title"><i class="iconfont icon-dingdanxinxi"></i> <span class="spannew1">商品信息</span></p>
                    </el-row>
                    <div class="top3">
                        <el-row :gutter="60">
                            <el-col :span="12">
                                <el-form-item label="品名" prop="skuName">
                                    <span v-if="offerId">{{info.skuName}}</span>
                                    <template v-else>
                                        <product-search :selected.sync="selectedProduct"></product-search>
                                    </template>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="有效时间" prop="effectiveMinutes">
                                    <el-select v-model="info.effectiveMinutes">
                                        <el-option
                                            v-for="item in timeOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="60">
                            <el-col :span="12" class="display-inlinecol pricecenter">
                                <el-form-item label="单价(元)" prop="skuPrice">
                                    <el-select v-model="info.skuPriceFlag" @change="changeprice" placeholder="请选择">
                                        <el-option
                                            v-for="item in skuPriceList"
                                            :key="item.id"
                                            :label="item.userName"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <div class="inlineblock" v-if="info.skuPriceFlag * 1 !== 2">
                                        <el-input placeholder="请输入" v-model.number="info.skuPrice" v-bind:disabled="disabledInput"
                                                  @focus="changeInput" :min="0" ></el-input>
                                        <el-select v-model="info.intCurrencyCode" placeholder="请选择">
                                            <el-option
                                                v-for="item in currencies"
                                                :key="item.currencyCode"
                                                :label="item.friendlyName"
                                                :value="item.currencyCode">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <!-- <el-radio-group v-model="info.ismianmin" @change="change">
                                        <el-radio label="面议"></el-radio>
                                    </el-radio-group> -->
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="交割时间" prop="devV">
                                    <el-radio-group v-model="info.deliveryDateFlag">
                                        <el-radio :label="1">时间段</el-radio>
                                        <el-radio :label="2">时间点</el-radio>
                                        <el-radio :label="3">自定义</el-radio>
                                    </el-radio-group>
                                    <el-date-picker v-if="info.deliveryDateFlag===1"
                                                    v-model="info.deliveryDate"
                                                    type="daterange"
                                                    align="right"
                                                    unlink-panels
                                                    range-separator="至"
                                                    :start-placeholder=info.deliveryBeginDate|date
                                                    :end-placeholder=info.deliveryEndDate|date
                                                    :picker-options="pickerOptions">
                                    </el-date-picker>
                                    <template v-if="info.deliveryDateFlag===2">
                                        <el-row>
                                            <el-col :span="21">
                                                <el-date-picker
                                                    v-model="info.deliveryBeginDate"
                                                    type="date"
                                                    placeholder="选择日期">
                                                </el-date-picker>
                                            </el-col>
                                            <el-col :span="3">以前</el-col>
                                        </el-row>
                                    </template>
                                    <template v-if="info.deliveryDateFlag===3">
                                        <el-input v-model="info.deliveryDateText"></el-input>
                                    </template>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="60">
                            <el-col :span="12" class="display-inline">
                                <el-form-item label="需求量" prop="skuQuantity">
                                    <el-input placeholder="请输入" style="width: 214px;" v-model="info.skuQuantity"></el-input>
                                    <el-select v-model="info.infUnitOfMeasureId">
                                        <el-option
                                            v-for="item in options"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="60" style="margin-left: -20px">
                            <el-col>
                                <el-form-item label="商品图片" class="pic" prop="imgUrl">
                                    <div class="upload-box">
                                        <img :src="imgUrl" v-if="imgUrl">
                                        <div class="img-holder" v-if="imageUrl&&!isReupload"
                                             :style='"background-image: url(" + imageUrl + ")"'></div>
                                        <el-upload
                                            class="product-upload"
                                            action="api"
                                            list-type="picture-card"
                                            :http-request="uploadImg">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <p class="tips">您可以用默认图片，也可以点击上传自己的商品图片，大小为260*260px，展示风格支持jpg，jpeg，gif，png风格。</p>
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <el-row class="top4">
                        <p class="title"><i class="iconfont icon-xiangxixinxi"></i> <span class="spannew1">详细信息</span></p>
                    </el-row>
                    <div class="top333">
                        <el-row :gutter="60">
                            <el-col :span="12">
                                <el-form-item label="交割库">
                                    <div class="product-list">
                                        <input placeholder="请输入" type="text" class="gy-input" v-model="deliveryWarehouseName"
                                               @keyup.enter="getWarehouses" @blur="hideList">
                                        <ul v-show="showList">
                                            <li v-for="(item, index) in warehousesList" :key="index"
                                                @click="handleSelect(item)" v-if="warehousesList.length > 0">{{item.value}}
                                            </li>
                                        </ul>
                                        <i class="iconfont icon-mySearch" @click="getWarehouses"></i>
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="交割仓库地址" class="address">
                                    <el-col :span="8">
                                        <el-select v-model="info.provinceName" placeholder="选择省" @change="handleProvince">
                                            <el-option
                                                v-for="item in Province"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-select v-model="info.cityName" placeholder="选择市" @change="handleDelivery">
                                            <el-option
                                                v-for="item in deliveryCity"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-select v-model="info.districtName" placeholder="选择区" @change="handleDistrict">
                                            <el-option
                                                v-for="item in deliveryDistrict"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="24">
                                        <el-input v-model="info.deliveryDetailedAddress" placeholder="详细地址"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="60">
                            <el-col :span="12">
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
                        <el-row :gutter="60">
                            <el-col :span="12" style="padding-left: 18px;">
                                <el-form-item label="交付方式" prop="deliveryType">
                                    <el-select v-model="info.deliveryType" placeholder="请选择" style="width: 97%;
    margin-left: 10px">
                                        <el-option
                                            v-for="item in deliveryTypeOption"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" style="padding-left: 20px;">
                                <el-form-item label="付款方式" prop="deliveryType">
                                    <el-select v-model="info.paymentType" placeholder="请选择" style="width: 97%;
    margin-left: 10px">
                                        <el-option
                                            v-for="item in paymentTypeOption"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="60">
                            <el-col :span="12">
                                <el-form-item label="发票月份">
                                    <el-row :gutter="0">
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
                                        <el-col :span="2" style="text-align: center">或</el-col>
                                        <el-col :span="11">
                                            <el-input v-model="info.provideInvoiceText" placeholder="输入"
                                                      @focus="changeInvoiceText"></el-input>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :offset="3">
                                <el-checkbox v-model="isPublic">公开公司信息</el-checkbox>
                            </el-col>
                        </el-row>
                        <el-row class="new-resoursebtn">
                            <div class="gy-button-extra" @click.prevent="submitFormValid"> 提交</div>
                        </el-row>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import productSearch from '@/components/productSearch';

export default {
    name: 'addResource',
    data () {
        var validate2 = (rule, value, callback) => {
            if (!value.length) {
                callback(new Error('请选择交割日期'));
            }
            callback();
        };
        var validatePrice = (rule, value, callback) => {
            if (!(this.info.skuPriceFlag === '2') && !this.info.skuPrice) {
                callback(new Error('请输入价格'));
            }
            callback();
        };
        var validate3 = (rule, value, callback) => {
            if (!this.info.deliveryBeginDate && !this.info.deliveryDateText) {
                callback(new Error('交割时间不能为空'));
            }
            callback();
        };
        return {
            ruleForm: {
                skuName: [{required: true, message: '请输入产品名称', trigger: 'change'}], // 产品名称
                skuPrice: [{required: true, validator: validatePrice, trigger: 'blur'}], // 单价
                skuQuantity: [{required: true, message: '请输入可供量', trigger: 'blur'}], // 可供量
                deliveryWarehouseName: [{required: true, message: '请输入交割库', trigger: 'blur'}], // 交割库
                deliveryDate: [{required: true, type: 'array', validator: validate2, trigger: 'change'}],
                skuOrigin: [{required: false, message: '请选择货源类型', trigger: 'blur'}], // 货源
                deliveryType: [{required: true, message: '请选择交割方式', trigger: 'blur'}], // 交割方式
                effectiveMinutes: [{required: true, message: '请输入有效时间', trigger: 'change'}], // 有效时间
                devV: [{required: true, validator: validate3, trigger: 'blur'}]// 有效时间
                // imgUrl: [{ required: true, validator: imgs, trigger: 'blur' }] // 图片
            },
            radio2: 3,
            disabledInput: false,
            goodsListShow: false,
            selectedOptions3: ['zujian', 'data', 'tag'],
            cityOptions: [],
            value: '',
            value2: '',
            selectedProduct: {},
            restaurants: [], // 仓库
            offerId: '', // 供应单id
            options: [], // 存单位
            Province: [], // 存省
            deliveryCity: [], // 存市
            deliveryDistrict: [], // 存区
            imgUrl: '', // 图片
            list: [],
            warehousesList: [],
            info: {
                skuPriceFlag: '0',
                districtName: '',
                skuOrigin: '国产', // 货源
                skuName: '', // 品名
                skuPrice: '', // 价格
                intCurrencyCode: 'RMB',
                isPublic: 1,
                infUnitOfMeasureId: 2,
                deliveryType: 0,
                skuPictureUrl: '',
                deliveryDate: [], // 存时间
                ismianmin: '',
                paymentType: 0,
                deliveryDateFlag: 3,
                deliveryDateText: '双方协商为准',
                provideInvoiceText: '',
                deliveryBeginDate: '',
                prdSkuId: 0
            },
            deliveryWarehouseName: '',
            isPublic: true,
            imageUrl: '',
            imgBaseUrl: '',
            isReupload: true,
            dialogImageUrl: '',
            dialogVisible: false,
            timeOptions: [{
                value: 30,
                label: '30分钟'
            },
            {
                value: 60,
                label: '1小时'
            },
            {
                value: 1440,
                label: '1天'
            },
            {
                value: 10080,
                label: '7天'
            },
            {
                value: 43200,
                label: '一个月'
            },
            {
                value: 5256000,
                label: '长期'
            }
            ],
            skuOriginOption: [{
                value: '国产',
                label: '国产'
            },
            {
                value: '进口',
                label: '进口'
            }
            ],
            deliveryTypeOption: [
                {
                    value: 0,
                    label: '全部支持'
                },
                {
                    value: 1,
                    label: '买家自提'
                },
                {
                    value: 2,
                    label: '卖家送货'
                }],
            paymentTypeOption: [
                {
                    value: 0,
                    label: '全部支持'
                },
                {
                    value: 1,
                    label: '先货后款'
                },
                {
                    value: 2,
                    label: '先款后货'
                }],
            provideInvoiceOption: [{
                value: 0,
                label: '交割当月发票'
            },
            {
                value: 1,
                label: '交割次月发票'
            }],
            skuPriceList: [
                {id: '0', userName: '固定价'},
                {id: '1', userName: '可议价'},
                {id: '2', userName: '面议'}
            ],
            showList: false,
            provideInvoiceType: '',
            currencies: [], // 存币种
            skuData: [],
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
    components: {
        productSearch
    },
    created () {
        this.offerId = this.$route.query.offerId;
        this.typeId = this.$route.query.type; // 存在是再次发起
        this.offerId && this.getInfo(); // 基础信息
        this.getcurrencies(); // 调币种
        this.measures(); // 获取单位
        this.address(0, 'province'); // 获取省市区
        this.imgBaseUrl = process.env.IMG_ROOT;
    },
    watch: {
        selectedProduct (val) {
            this.imgUrl = val.productUrl;
            this.info.skuName = val.skuName;
        },
        provideInvoiceType (val) {
            if (val != null) {
                this.info.provideInvoiceText = '';
            }
        },
        deliveryWarehouseName (val) {
            if (val === '') {
                this.info.provinceName = '';
                this.info.cityName = '';
                this.info.districtName = '';
                this.info.deliveryDistrictId = '';
                this.info.deliveryDetailedAddress = '';
                this.deliveryWarehouseName = '';
            }
        }
    },
    methods: {
        changeprice () {
            if (this.info.skuPriceFlag === '2') {
                this.ruleForm.skuPrice[0].trigger = 'change';
            } else {
                this.ruleForm.skuPrice[0].trigger = 'blur';
            }
        },
        changeInvoiceText () {
            this.provideInvoiceType = '';
        },
        changeInput () {
            this.info.ismianmin = true;
        },
        change () {
            if (this.info.skuPriceFlag === '2') {
                this.info.skuPrice = '';
            }
        },
        loadAll () { // 获取交割仓库名
            this.$http.get(this.$api.offers.warehouses).then(res => {
                console.log(res);
            });
        },
        handleSelect (item) {
            this.deliveryWarehouseId = item.id;
            this.deliveryWarehouseName = item.value;
            this.info.provinceName = item.provinceName;
            this.info.cityName = item.cityName;
            this.info.districtName = item.districtName;
            this.info.deliveryDistrictId = item.districtId;
            this.info.deliveryDetailedAddress = item.address;
            this.showList = false;
        },
        address (id, type) { // 获取地址
            this.$http.get(this.$api.offers.address + id).then((res) => {
                if (type === 'province') {
                    this.Province = res.data.data;
                } else if (type === 'city') {
                    this.deliveryCity = res.data.data;
                    this.info.cityName = this.deliveryCity[0];
                    this.address(this.deliveryCity[0].id, 'district');
                } else if (type === 'district') {
                    this.deliveryDistrict = res.data.data;
                    this.info.districtName = this.deliveryDistrict[0];
                } else {
                    console.log('地址接口有误');
                }
            });
        },
        measures () { // 获取单位
            this.$http.post(this.$api.offers.measures).then((res) => {
                this.options = res.data.data.list;
            });
        },
        getcurrencies () { // 获取币种
            this.$http.get(this.$api.offers.currencies).then((res) => {
                this.currencies = res.data.data;
            });
        },
        getInfo () { // 编辑时调接口获取资源单详情
            this.$http.get(this.$api.offers.resources + '/' + this.offerId).then((res) => {
                if (res.data.code === 0) {
                    this.info = res.data.data;
                    // this.isPublic = res.data.data.isPublic;
                    this.isPublic = res.data.data.isPublic === 1;
                    if (res.data.data.deliveryEndDate) {
                        this.info.deliveryDate = [];
                        this.info.deliveryDate[0] = res.data.data.deliveryBeginDate;
                        this.info.deliveryDate[1] = res.data.data.deliveryEndDate;
                    }
                    this.provideInvoiceType = this.info.provideInvoiceType;
                    this.info.skuPriceFlag = this.info.skuPriceFlag.toString();
                    this.imgUrl = res.data.data.skuPictureUrl;
                    if (!this.info.skuPrice) {
                        this.info.ismianmin = '面议';
                        this.info.skuPrice = '';
                    }
                    if (this.typeId) {
                        this.info.skuQuantity = null;
                    }
                    this.deliveryWarehouseName = res.data.data.deliveryWarehouseName;
                }
            });
        },
        getWarehouses () {
            this.showList = true;
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
                    this.$message(res.data.message);
                }
            });
        },
        hideList () {
            // this.showList = false;
        },
        handleProvince (item) { // 省改变
            this.address(item, 'city');
        },
        handleDelivery (item) { // 市改变
            this.address(item, 'district');
        },
        handleDistrict (item) { // 区改变
            // this.info.districtName = item.name;
            this.info.deliveryDistrictId = item;
        },
        submitFormValid () {
            this.$refs.formA.validate((valid) => {
                if (valid) {
                    this.submitForm();
                } else {
                    console.error('error submit!!');
                    return false;
                }
            });
        },
        submitForm () {
            this.info.isPublic = this.isPublic ? 1 : 0;
            if (this.info.deliveryDateFlag === 1) {
                this.info.deliveryBeginDate = new Date(this.info.deliveryDate[0]).getTime();
                this.info.deliveryEndDate = new Date(this.info.deliveryDate[1]).getTime();
            }
            this.info.deliveryWarehouseId = this.deliveryWarehouseId;
            this.info.deliveryWarehouseName = this.deliveryWarehouseName;
            this.info.provideInvoiceType = this.provideInvoiceType;
            if (!this.offerId) {
                this.info.skuCode = this.selectedProduct.goodsCode;
                this.info.prdSkuId = this.selectedProduct.id;
                this.info.skuName = this.selectedProduct.skuName;
            }
            if (this.info.skuPriceFlag === '2') {
                this.info.skuPrice = '';
            }
            if (this.imageUrl) {
                this.info.skuPictureUrl = this.imageUrl; // 上传图片
            } else {
                this.info.skuPictureUrl = this.imgUrl;
            }
            if (!this.info.skuPrice) {
                this.info.skuPrice = 0;
            }
            if (this.offerId) {
                this.info.id = this.offerId;
                if (this.typeId) {
                    this.info.id = null;
                }
            }
            this.$http.post(this.$api.order.resources, this.info).then((res) => {
                if (res.data.code === 0) {
                    this.$message.success('操作成功');
                    this.$router.push({name: 'demandList'});
                    return false;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },
        uploadImg (file) {
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            this.$http.post(this.$api.offers.uploadImg, formData, headers)
                .then((res) => {
                    this.imageUrl = res.data.data;
                    this.isReupload = true;
                });
        },
        handleRemove (file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    },
    destroyed () {
        this.info = {
            offerItemList: []
        };
    },
    mounted () {
        this.restaurants = this.loadAll();
    }
};
</script>
<style lang="scss" scoped>
    .resource-add{
        .display-inlinecol{
            .inlineblock{
                display: inline-block;
            }
        }
    }
</style>

<style lang="scss">
    .resource-add {
        .pricecenter .el-form-item--mini .el-form-item__error{
            margin-left: 110px;
        }
        .new-resoursebtn{
            margin-top: 20px;
            text-align: right;
        }
        .product-list {
            position: relative;
            ul {
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
                li {
                    padding: 5px 10px;
                    cursor: pointer;
                    &:hover {
                        background-color: #f5f7fa;
                        color: $color-extra;
                    }
                    &.none-tips {
                        font-size: $small-font;
                        text-align: center;
                    }
                }
            }
            .icon-mySearch {
                position: absolute;
                right: 7px;
                top: 0;
            }
        }
        .tips {
            color: $color-minor
        }
        .right {
            float: right
        }
        .address .el-select {
            margin-left: -30px;
        }
        .address .el-select .el-input {
            width: 106px;
        }
        .address .el-col-24 .el-input {
            width: 316px;
            margin-left: -30px;
        }
        .el-autocomplete {
            width: 340px;
        }
        .display-inline, .display-inlinecol {
            padding-right: 0 !important;
        }
        .display-inlinecol .el-input--mini {
            width: 104px;
            display: inline-block;
        }
        .display-inlinecol .el-select .el-input input {
            display: inline-block;
        }
        .display-inline .el-input--mini {
            display: inline-block;
            width: 235px;
        }
        .display-inline .el-select .el-input--mini {
            width: 100px;
        }
        .display-inline .el-select .el-input input {
            display: inline-block;
            width: 103px;
        }
        .display-inline .el-select .el-input__suffix {
            right: 0
        }
        .display-inline .el-select, .display-inlinecol .el-select {
            width: auto
        }
        .display-inlinecol .el-radio {
            padding-left: 16px;
        }
        .display-inline .el-select input {
            text-align: right
        }
        .el-input__icon {
            line-height: 22px !important
        }
        .display-inline .el-select .el-input__suffix {
            right: 0
        }
        .display-inline .el-select {
            width: auto
        }
        .display-inline .el-select input {
            text-align: right
        }
        .el-input__icon {
            line-height: 22px !important
        }
        .el-date-editor--daterange.el-input__inner {
            width: 322px
        }
        .el-input__inner {
            border-left: 0;
            border-top: 0;
            border-right: 0;
        }
        .el-form-item__label {
            text-align: left;
            padding-left: 10px
        }
        input[type=text] {
            height: 30px;
            line-height: 30px
        }
        .bao .el-input input {
            width: 132px
        }
        .el-date-editor--daterange.el-input__inner {
            width: 322px
        }
        .el-input__inner {
            border-left: 0;
            border-top: 0;
            border-right: 0;
        }
        .el-form-item__label {
            text-align: left;
            padding-left: 10px
        }
        input[type=text] {
            height: 30px;
            line-height: 30px
        }
        .bao .el-input input {
            width: 132px
        }
    }

    .img-holder {
        display: inline
    }

    ;
    .product-upload {
        display: inline
    }

    .upload-box img {
        width: 60px;
        height: 60px;
        display: inline-block;
        border: 1px solid $color-border
    }

    .new_resourseadd {
        .top1 {
            overflow: hidden;
            height: 35px;
            line-height: 35px;
            padding: 0 16px;
            font-size: 16px;
            font-weight: bold;
            color: #333333;
            border-bottom: 1px solid #e6eaea
        }
        .top2 {
            padding: 20px 16px;
        }
        .top3{
            padding: 0px 30px 20px 15px;
        }
        .top333{
            padding: 0px 25px;
        }
        .top4{
            padding: 0 16px 20px;
        }
        .icon-dingdanxinxi{
            font-size: 12px;
            color: #333;
            vertical-align: bottom;
        }
        .icon-xiangxixinxi{
            font-size: 12px;
            color: #666666;
            vertical-align: bottom;
        }
        .spannew1{
            margin-left: 7px;
            font-size: 14px;
            font-weight: bold;
            color: #333;
        }
        .left_my{
            margin-left: -20px
        }
        .left_my2{
            padding-left: 45px;
        }
    }
</style>
