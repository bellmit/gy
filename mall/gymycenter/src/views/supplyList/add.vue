<template>
    <div class="suppyAdd">
        <div class="new-title-public">
            供应链申请单
        </div>
        <div>
            <div class="div1">
                <div class="GradeTips" v-if="!ratingRank">
                    <span class="GradeSpan">温馨提示：</span>暂无评级信息，无法申请供应链服务。请在<a class="gradebutton" @click="ratingForm">我的评级</a>中完成评级再提交申请。
                </div>
                <div>
                    <el-row>
                        <p class="title">
                            <i class="iconfont icon-bangdingxindetixianzhanghao"></i>
                            <span class="mynewleftspan">公司信息</span>
                        </p>
                    </el-row>
                </div>
                <div class="div3new">
                    <el-row :gutter="60">
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="6">
                                    <span style="margin-left: 10px" class="mynewleftfont">公司名称</span>
                                </el-col>
                                <el-col :span="18">
                                    <span class="alignment">{{newName}}</span>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="7" class="mynewleftfont">
                                    <span style="margin-left: 10px">公司地址</span>
                                </el-col>
                                <el-col :span="17">
                                    <div class="rowSpace" :title="parameter.companyAddress">{{parameter.companyAddress}}</div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" style="margin-top: 10px">
                            <el-row>
                                <el-col :span="6" class="mynewleftfont">
                                    <span class="myred">*</span>联系人
                                </el-col>
                                <el-col :span="18">
                                    <input placeholder="请输入" type="text" class="gy-input" v-model="parameter.contactName">
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" style="margin-top: 10px">
                            <el-row>
                                <el-col :span="7" class="mynewleftfont">
                                    <span class="myred">*</span>联系电话
                                </el-col>
                                <el-col :span="17">
                                    <input placeholder="请输入" type="text" class="gy-input" v-model="parameter.contactPhone">
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
                <el-row>
                    <p class="title">
                        <i class="iconfont icon-icon_shenqing"></i>
                        <span class="mynewleftspan">申请详细信息</span>
                    </p>
                </el-row>
                <div class="div3new">
                    <el-row :gutter="60">
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="6" class="mynewleftfont">
                                    <span style="margin-left: 10px">申请单号</span>
                                </el-col>
                                <el-col :span="18">
                                    <span class="alignment">--</span>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="7" class="mynewleftfont">
                                    <span style="margin-left: 10px">申请时间</span>
                                </el-col>
                                <el-col :span="17" class="clock">
                                    <span class="alignment">{{ clock.applyDate + ' ' + clock.applyTime }}</span><img src="../../assets/images/clock.gif" alt="">
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="mynewleftfonttop">
                            <el-row>
                                <el-col :span="6" class="mynewleftfont">
                                    <span style="margin-left: 10px">服务类型</span>
                                </el-col>
                                <el-col :span="18">
                                    <span class="alignment">{{parameter.serviceTypeName}}</span>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" style="height: 30px;" class="mynewleftfonttop" v-if="type !== 2">
                            <el-row style="position: relative">
                                <el-col :span="7" class="mynewleftfont">
                                    <span style="margin-left: 10px;line-height: 29px;">
                                        <el-checkbox v-model="gyscheck"></el-checkbox>
                                        指定供应商
                                    </span>
                                </el-col>
                                <el-col :span="17">
                                    <input type="text" v-model="noneValue" v-if="!gyscheck">
                                    <input placeholder="请输入" v-if="gyscheck" @click="blur22" type="text" class="gy-input" v-model="parameter.thirdPartyName" @keyup.enter="onelist1click2">
                                </el-col>
                                <el-col v-show="gyscheck" :span="1" class="zdgys2"> <i class="iconfont icon-mySearch my-icon-jj"  @click="onelist1click2"></i></el-col>
                                <ul class="listul"  v-show="onelist2Show">
                                    <li v-for="(item,index) in onelist2" :key="index" @click="onelist1select2(item)" v-if="onelist2.length>0">
                                        {{item.companyName}}
                                    </li>
                                    <li class="none-tips" v-if="onelist2.length === 0">没有搜到相关公司</li>
                                </ul>
                            </el-row>
                        </el-col>
                        <el-col :span="12" style="height: 30px;" class="mynewleftfonttop" v-if="type === 2">
                            <el-row style="position: relative">
                                <el-col :span="7" class="mynewleftfont"><span class="myred">*</span>采购公司</el-col>
                                <el-col :span="17">
                                    <input placeholder="请输入" @click="blur22" type="text" class="gy-input" v-model="parameter.thirdPartyName" @keyup.enter="onelist1click2">
                                </el-col>
                                <el-col :span="1" class="zdgys2"> <i class="iconfont icon-mySearch my-icon-jj"  @click="onelist1click2"></i></el-col>
                                <ul class="listul"  v-show="onelist2Show">
                                    <li v-for="(item,index) in onelist2" :key="index" @click="onelist1select2(item)" v-if="onelist2.length>0">
                                        {{item.companyName}}
                                    </li>
                                    <li class="none-tips" v-if="onelist2.length === 0">没有搜到相关公司</li>
                                </ul>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="mynewleftfonttop">
                            <el-row>
                                <el-col :span="6" class="mynewleftfont"><span class="myred">*</span>商品名称
                                </el-col>
                                <el-col :span="18">
                                    <template>
                                        <product-search :selected.sync="selectedProduct"></product-search>
                                    </template>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="mynewleftfonttop">
                            <el-row>
                                <el-col :span="7" class="mynewleftfont"><span class="myred">*</span>数量</el-col>
                                <el-col :span="16">
                                    <input placeholder="请输入" type="text" class="gy-input" v-model="parameter.productAmount">
                                </el-col>
                                <el-col :span="1">
                                    吨
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="mynewleftfonttop" v-if="type !== 2">
                            <el-row>
                                <el-col :span="6" class="mynewleftfont"><span class="myred">*</span>市场预估价</el-col>
                                <el-col :span="16"><input placeholder="请输入" type="text" class="gy-input" v-model="parameter.productPriceMax"> </el-col>
                                <el-col :span="2">元/吨</el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="mynewleftfonttop" v-if="type === 2">
                            <el-row>
                                <el-col :span="6" class="mynewleftfont"><span class="myred">*</span>货物估值</el-col>
                                <el-col :span="16"><input placeholder="请输入" type="text" class="gy-input" v-model="parameter.fundDemand"> </el-col>
                                <el-col :span="2">万元</el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="mynewleftfonttop">
                            <el-row>
                                <el-col :span="7" class="mynewleftfont"><span class="myred">*</span>服务周期</el-col>
                                <el-col :span="16">
                                    <input placeholder="请输入" type="text" class="gy-input" v-model="parameter.period">
                                </el-col>
                                <el-col :span="1">
                                    天
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="mynewleftfonttop">
                            <el-row>
                                <el-col :span="6" class="mynewleftfont"><span class="myred" v-if="type === 2">*</span><span :style="type === 2 ? '' : 'margin-left:10px'">交割库</span></el-col>
                                <el-col :span="18">
                                    <div class="product-list">
                                        <input placeholder="请输入" type="text" class="gy-input" v-model="parameter.deliveryWarehouseName"
                                               @keyup.13="getWarehouses">
                                        <ul v-show="showList">
                                            <li v-for="(item, index) in warehousesList" :key="index"
                                                @click="handleSelect(item)" v-if="warehousesList.length > 0">{{item.value}}
                                            </li>
                                            <li class="none-tips" v-if="warehousesList.length === 0">没有搜到相关内容</li>
                                        </ul>
                                        <i class="iconfont icon-mySearch" @click="getWarehouses"></i>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="mynewleftfonttop" v-if="type !== 2">
                            <el-row>
                                <el-col :span="7" class="mynewleftfont"><span class="myred">*</span>货物需运输</el-col>
                                <el-col :span="17">
                                    <el-radio v-model="parameter.needTransport" label="1">需要</el-radio>
                                    <el-radio v-model="parameter.needTransport" label="0">不需要</el-radio>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="mynewleftfonttop" v-if="type === 2">
                            <el-row>
                                <el-col :span="7" class="mynewleftfont">
                                    <span style="margin-left: 10px">申请备注</span>
                                </el-col>
                                <el-col :span="17">
                                    <textarea style="" class="gy-textarea" v-model="parameter.memo"></textarea>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="mynewleftfonttop" :style="type === 2 ?  'margin-top: -30px;' : ''">
                            <el-row>
                                <el-col :span="6" class="mynewleftfont"><span class="myred">*</span>有效日期</el-col>
                                <el-col :span="16">
                                    <el-date-picker
                                            v-model="parameter.effectiveDate"
                                            type="date"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </el-col>
                                <el-col :span="2">以前</el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="mynewleftfonttop" v-if="type ===1">
                            <el-row>
                                <el-col :span="7" class="mynewleftfont">
                                    <span style="margin-left: 10px">申请备注</span>
                                </el-col>
                                <el-col :span="17">
                                    <textarea style="" class="gy-textarea" v-model="parameter.memo"></textarea>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
                <el-row>
                    <el-col style="text-align: right;margin-top: 20px">
                        <div v-if="ratingRank" class="gy-button-extra" @click="submitFormValid()" style="margin-right: 5px;">提交申请</div>
                        <div v-if="!ratingRank" class="button-none" style="margin-right: 5px;">提交申请</div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
import productSearch from '@/components/productSearch';
export default {
    data () {
        return {
            noneValue: '无指定供应商',
            disabledInput: false,
            goodsListShow: false,
            selectedOptions3: ['zujian', 'data', 'tag'],
            cityOptions: [],
            value: '',
            value2: '',
            gyscheck: false,
            selectedProduct: {},
            restaurants: [], // 仓库
            offerId: '', // 供应单id
            options: [], // 存单位
            Province: [], // 存省
            deliveryCity: [], // 存市
            deliveryDistrict: [], // 存区
            imgUrl: '', // 图片
            list: [],
            warehousesList: [], // 存放交割库
            transactionType: 1,
            transactionOption: [],
            info: {
                districtName: ''
            },
            deliveryWarehouseName: '',
            isPublic: true,
            cpmcShow: false,
            imageUrl: '',
            imgBaseUrl: '',
            isReupload: true,
            dialogImageUrl: '',
            dialogVisible: false,
            showList: false, // 交割库列表显示
            provideInvoiceType: '',
            currencies: [], // 存币种
            skuData: [],
            onelist2Show: false,
            onelist2: [],
            newName: JSON.parse(localStorage.getItem('userInfo')).companyName, // 客户ID
            parameter: {
                'createdBy': JSON.parse(localStorage.getItem('userInfo')).id,
                'createdByName': JSON.parse(localStorage.getItem('userInfo')).username,
                'serviceTypeId': 0,
                'status': '',
                'serviceTypeName': '',
                'contactName': '',
                'companyAddress': '',
                'contactPhone': '',
                'skuName': '',
                'skuCode': '',
                'skuPictureUrl': '',
                'productAmount': '',
                'period': '',
                'productPriceMin': '',
                'thirdPartyFlag': '',
                'productPriceMax': '',
                'thirdPartyId': '',
                'thirdPartyName': '',
                'companyName': JSON.parse(localStorage.getItem('userInfo')).companyName,
                'memo': '',
                'companyId': JSON.parse(localStorage.getItem('userInfo')).companyId,
                'createdDate': '', // 申请时间
                'needTransport': '', // 货物需运输
                'effectiveDate': '', // 有效日期
                'deliveryWarehouseId': '', // 交割库ID
                'deliveryWarehouseName': '', // 交割仓库名称
                'topCatalogueId': '',
                'fundDemand': '', // 货物估值
                'providerRatingMark': 1 // 申请单弹出无评级信息继续提交时传入：0
            },
            clock: {
                applyDate: '',
                applyTime: ''
            },
            timer: null,
            ratingRank: true,
            type: null
        };
    },
    components: {
        productSearch
    },
    created () {
        this.type = this.parameter.serviceTypeId = Number(this.$route.query.type) || 1; // 申请代采 1 申请货押 2 申请赊销 3
        this.$http.get(this.$api.account.service + this.parameter.serviceTypeId).then(res => {
            if (res.data.code === 0) {
                console.log(res.data.data.name);
                this.parameter.serviceTypeName = res.data.data.name;
            }
        });
        this.setTime();
        this.getCityAdress();
        this.getGoal();
    },
    mounted () {
        this.timer = setInterval(() => {
            this.setTime();
        }, 1000);
    },
    beforeDestroy () {
        clearInterval(this.timer);
    },
    watch: {
        'parameter.deliveryWarehouseName' (val) {
            if (val === '') {
                this.parameter.deliveryWarehouseId = '';
            }
        }
    },
    methods: {
        // 获取评级信息
        getGoal () {
            let that = this;
            let companyId = JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).companyId;
            that.$http.get(that.$api.account.goal + companyId).then(function (res) {
                if (res.data.code === 0) {
                    that.ratingRank = res.data.data.data.ratingRank !== '-';
                } else {
                    that.$message(res.data.message);
                }
            });
        },
        // 获取公司地址
        getCityAdress () {
            let that = this;
            let companyIds = JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).companyId;
            that.$http.get(that.$api.order.cityAdress + companyIds).then(function (res) {
                if (res.data.code === 0) {
                    that.parameter.companyAddress = res.data.data.companyAdress;
                } else {
                    that.$message(res.data.message);
                }
            });
        },
        // 修改公司名称
        onelist1click2 () {
            var that = this;
            that.onelist2Show = true;
            that.$http.post(that.$api.order.creatOrderCompanies, {
                'companyTypeId': 1, // 1:交易公司  2：承运商
                'name': that.parameter.thirdPartyName
            })
                .then(function (res) {
                    that.onelist2 = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
        },
        onelist1select2 (item) {
            console.log(item);
            var that = this;
            that.parameter.thirdPartyName = item.companyName;
            that.parameter.thirdPartyId = item.companyId;
            that.onelist2Show = false;
        },
        blur22 () {
            this.onelist2Show = false;
            this.parameter.thirdPartyId = '';
            this.parameter.thirdPartyName = '';
        },
        // 选择交割库
        getWarehouses () {
            this.showList = true;
            this.$http.get(this.$api.offers.warehouses + this.parameter.deliveryWarehouseName).then((res) => {
                if (res.data.code === 0) {
                    let param = {};
                    this.warehousesList = [];
                    for (let i = 0; i < res.data.data.length; i++) {
                        param.value = res.data.data[i].name;
                        param.id = res.data.data[i].id;
                        this.warehousesList.push(param);
                        param = {};
                    }
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        handleSelect (item) {
            this.parameter.deliveryWarehouseId = item.id;
            this.parameter.deliveryWarehouseName = item.value;
            this.showList = false;
        },
        submitFormValid () {
            this.submitForm();
        },
        zeroPadding (num, digit) {
            let zero = '';
            for (let i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        setTime () {
            let cd = new Date();
            this.clock.applyTime = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
            this.clock.applyDate = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2);
        },
        submitForm () {
            // if (!this.parameter.companyAddress) {
            //     this.$message.error('公司地址不能为空');
            //     return;
            // }
            if (!this.parameter.contactName) {
                this.$message.error('联系人不能为空');
                return;
            }
            let reg = /^1[3456789]\d{9}$/;
            if (!reg.test(this.parameter.contactPhone)) {
                this.$message.error('请输入有效的手机号码');
                return;
            }
            if (this.type === 2 && !this.parameter.thirdPartyId) {
                this.$message.error('采购公司不能为空');
                return;
            }
            if (!this.selectedProduct.skuName) {
                this.$message.error('商品名称不能为空');
                return;
            }
            let reg2 = /^\+?[1-9][0-9]*$/;
            let reg3 = /(^[-0-9][0-9]*(.[0-9]+)?)$/;
            if (!reg3.test(this.parameter.productAmount)) {
                this.$message.error('请输入有效的数量');
                return;
            }
            if (this.type === 2 && !reg3.test(this.parameter.fundDemand)) {
                this.$message.error('请输入有效的货物估值');
                return;
            }
            if (this.type !== 2 && !reg3.test(this.parameter.productPriceMax)) {
                this.$message.error('请输入有效的市场预估价');
                return;
            }
            if (!reg2.test(this.parameter.period)) {
                this.$message.error('请输入有效的服务周期');
                return;
            }
            if (this.type === 2 && !this.parameter.deliveryWarehouseName && !this.parameter.deliveryWarehouseId) {
                this.$message.error('请输入交割库');
                return;
            }
            if (this.type !== 2 && !this.parameter.needTransport && this.parameter.needTransport !== 0) {
                this.$message.error('请选择是否需要货物运输');
                return;
            }
            if (!this.parameter.effectiveDate) {
                this.$message.error('有效日期不能为空');
                return;
            }
            if (this.type !== 2) {
                if (this.gyscheck === true) {
                    this.parameter.thirdPartyFlag = 1;
                } else {
                    this.parameter.thirdPartyFlag = 0;
                    this.parameter.thirdPartyName = '';
                    this.parameter.thirdPartyId = '';
                }
            }
            this.parameter.skuName = this.selectedProduct.skuName;
            this.parameter.topCatalogueId = this.selectedProduct.masterCatalogueId;
            this.parameter.skuCode = this.selectedProduct.skuCode;
            this.parameter.skuPictureUrl = this.selectedProduct.productUrl;
            this.parameter.prdSkuId = this.selectedProduct.productId;
            this.parameter.productId = this.selectedProduct.productId;
            let that = this;
            that.$http.post(this.$api.account.supplyChain, this.parameter).then(function (res) {
                if (res.data.code === 0) {
                    that.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    that.$router.push({name: 'supplyList'});
                    return false;
                } else if (res.data.code === 5002) {
                    that.$confirm(res.data.message, '提示', {
                        confirmButtonText: '提交申请',
                        confirmButtonClass: 'confirmButton',
                        cancelButtonText: '取消',
                        cancelButtonClass: 'confirmButton'
                    })
                        .then(() => {
                            that.parameter.providerRatingMark = 0;
                            that.submitForm();
                        }).catch(() => {
                            console.log('cancel');
                        });
                    return false;
                } else {
                    that.$message(res.data.message);
                }
            });
        },
        ratingForm () {
            this.$router.push({name: 'RatingManagement'});
        }
    }
};
</script>

<style lang="scss" scoped>
    .suppyAdd{
        margin-bottom: 300px;
        .myred{
            color: red;
            margin-right: 3px;
            vertical-align: middle;
        }
        .div3new{
            margin: 10px 12px;
        }
        .title{
            padding: 15px 0;
            .iconfont{
                color: #ee7502;
            }
        }
        .mynewlefti{
            font-size: 12px;
            vertical-align: text-top;
            color: #999;
        }
        .mynewleftspan{
            font-weight: bold;
            color: #333;
        }
        .mynewleftfont{
            color: #333;
            height: 30px;
            line-height: 27px;
        }
        .mynewleftfonttop{
            margin-top: 10px;
            min-height: 30px;
        }
        .mynewleftfonttop2{
            margin-top: 15px;
            position: relative;
        }
        .mynewleftfonttop2span{
            position: absolute;
            top: 36px;
            right: 36px;
            font-size: 12px;
        }
        .listul{
            background-color: #fff;
            width: 71%;
            max-height: 151px;
            overflow: auto;
            position: absolute;
            top: 30px;
            z-index: 9;
            border: 1px solid #e6eaea;
            border-top: none;
            margin-left: 28.8%;
            li{
                padding: 5px 10px;
            }
            li:hover{
                cursor: pointer;
                background-color: #f5f7fa;
                color: #4a90e2;
            }
        }
        .div1{
            margin: 0 18px 14px 8px;
            font-size: 14px;
        }
        .div2{
            margin-left: 16px;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .div3{
            margin: 10px 16px;
        }
        .fl_floa{
            overflow: hidden;
            margin-left: 100px;
        }
        .fl_flo{
            float: left;
        }
        .andw{
            position: absolute;
            top: 18px;
            left: 10px;
            width: 15px;
            background: #ccc;
            height: 1px;
        }
        .zdgys2{
            position: absolute;top: 0;right: 0;
        }
        .dw1new1{
            float: left;color: #f56c6c;
            margin-top: 2px;
            margin-right: 5px;
        }
        .dw1new2{
            float: left;width: 77%
        }
        .dw1new3{
            float: left;
            width: 20.2%;
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
        .GradeTips{
            padding:15px 15px 0 25px;
            color:#333333;
            .GradeSpan{
                color:#EEA443;
                margin-right:5px;
            }
        }
        .gradebutton{
            color:#4A90e2;
            cursor: pointer;
        }
        .button-none{
            border-radius: 3px;
            padding: 0 16px;
            line-height: 28px;
            border: 1px solid #d6d6d6;
            cursor: pointer;
            display: inline-block;
            vertical-align: middle;
            font-size: 14px;
            background: #d6d6d6;
            color:#ffffff;
        }
        .alignment{
            margin-left:10px;
            height: 30px;
            line-height: 27px;
        }
        .rowSpace{
            padding-left:10px;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            line-height: 27px;
            height:30px;
        }
        .gy-textarea{
            height:68px;
        }
    }
</style>
<style lang="scss">
    .suppyAdd{
        .el-input-number{
            width: 121px;
        }
        .el-input-number__decrease, .el-input-number__increase{
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
        .clock{
            img{
                height: 30px;
                width: 30px;
                margin-left: 5px;
                vertical-align: middle;;
            }
            .alignment{
                display: inline-block;
                vertical-align: middle;
                width: 145px;
            }
        }
        .el-radio{
            font-weight: normal;
        }
        .el-radio__label{
            line-height: 27px;
        }
    }
    .confirmButton{
        float: right;
        margin-left:10px;
        margin-bottom: 20px;
    }
</style>
