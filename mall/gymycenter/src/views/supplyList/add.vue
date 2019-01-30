<template>
    <div class="suppyAdd">
        <div class="new-title-public">
            申请供应链服务
        </div>
        <div>
            <div class="div1">
                <div>
                    <el-row>
                        <p class="title">
                            <i class="iconfont icon-shenqingren mynewlefti"></i>
                            <span class="mynewleftspan">申请人</span>
                        </p>
                    </el-row>
                </div>
                <div class="div3new">
                    <el-row :gutter="60">
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="5">
                                    <span style="margin-left: 10px" class="mynewleftfont">企业名称</span>
                                </el-col>
                                <el-col :span="19">
                                    <span>{{newName}}</span>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="5" class="mynewleftfont">
                                    <span class="myred">*</span>联系人
                                </el-col>
                                <el-col :span="19">
                                    <input placeholder="请输入" type="text" class="gy-input" v-model="parameter.contactName">
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" style="margin-top: 10px">
                            <el-row>
                                <el-col :span="5" class="mynewleftfont">
                                    <span class="myred">*</span>企业地址
                                </el-col>
                                <el-col :span="19">
                                    <input placeholder="请输入" type="text" class="gy-input" v-model="parameter.companyAddress">
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" style="margin-top: 10px">
                            <el-row>
                                <el-col :span="5" class="mynewleftfont">
                                    <span class="myred">*</span>联系方式
                                </el-col>
                                <el-col :span="19">
                                    <input placeholder="请输入" type="text" class="gy-input" v-model="parameter.contactPhone">
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
                <el-row>
                    <p class="title">
                        <i class="iconfont icon-icon_shenqing mynewlefti"></i>
                        <span class="mynewleftspan">申请服务</span>
                    </p>
                </el-row>
                <div class="div3new">
                    <el-row :gutter="60">
                        <el-col :span="12">
                            <el-row>
                                <el-col :span="5" class="mynewleftfont">
                                    <span style="margin-left: 10px">服务类型</span>
                                </el-col>
                                <el-col :span="19">
                                    <el-select v-model="parameter.serviceTypeId" placeholder="请选择">
                                        <el-option
                                            v-for="item in transactionOption"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" style="height: 30px;">
                            <el-row style="position: relative">
                                <el-col :span="1" style="margin-left: 10px;margin-right:7px">
                                    <el-checkbox v-model="gyscheck"></el-checkbox>
                                </el-col>
                                <el-col :span="5" class="mynewleftfont">
                                    指定供应商
                                </el-col>
                                <el-col :span="17">
                                    <input type="text" v-model="noneValue" v-if="!gyscheck">
                                    <input placeholder="请输入" v-if="gyscheck" @click="blur22" type="text" class="gy-input" v-model="parameter.thirdPartyName" @keyup.enter="onelist1click2">
                                </el-col>
                                <el-col v-show="gyscheck" :span="1" class="zdgys2"> <i class="iconfont icon-search"  @click="onelist1click2"></i></el-col>
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
                                <el-col :span="5" class="mynewleftfont"><span class="myred">*</span>商品名称
                                </el-col>
                                <el-col :span="19">
                                    <template>
                                        <product-search :selected.sync="selectedProduct"></product-search>
                                    </template>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="mynewleftfonttop">
                            <el-row>
                                <el-col :span="5" class="mynewleftfont"><span class="myred">*</span>数量</el-col>
                                <el-col :span="19">
                                    <input placeholder="请输入" style="width: 95%" type="text" class="gy-input" v-model="parameter.productAmount">吨
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="mynewleftfonttop">
                            <el-row>
                                <el-col :span="5" class="mynewleftfont"><span class="myred">*</span>资金周期</el-col>
                                <el-col :span="18">
                                    <input placeholder="请输入" type="text" class="gy-input" v-model="parameter.period">
                                </el-col>
                                <el-col :span="1">
                                    天
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="mynewleftfonttop">
                            <el-row>
                                <el-col :span="5" class="mynewleftfont"><span class="myred">*</span>单价</el-col>
                                <el-col :span="8">
                                    <input type="text" placeholder="请输入" class="gy-input" v-model="parameter.productPriceMin">
                                </el-col>
                                <el-col :span="1" style="text-align: center">-</el-col>
                                <el-col :span="8"><input placeholder="请输入" type="text" class="gy-input" v-model="parameter.productPriceMax"> </el-col>
                                <el-col :span="2">元/吨</el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row :gutter="60" class="mynewleftfonttop2">
                        <el-col :span="3" class="mynewleftfont" style="margin-left: 10px">备注</el-col>
                        <el-col :span="20" style="margin-left: -42px;width: 90.7%;">
                            <textarea style="" class="gy-textarea" v-model="parameter.memo"></textarea>
                        </el-col>
                    </el-row>
                </div>
                <el-row>
                    <el-col style="text-align: right;margin-top: 20px">
                        <div class="gy-button-extra" @click="submitFormValid()" style="margin-right: 5px;"> 提交</div>
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
            warehousesList: [],
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
            showList: false,
            provideInvoiceType: '',
            currencies: [], // 存币种
            skuData: [],
            onelist2Show: false,
            onelist2: [],
            newName: JSON.parse(localStorage.getItem('userInfo')).companyName, // 客户ID
            parameter: {
                'createdBy': JSON.parse(localStorage.getItem('userInfo')).id,
                'serviceTypeId': 1,
                'status': 0,
                'serviceTypeName': '代采',
                'contactName': '',
                'companyAddress': '',
                'contactPhone': '',
                'productName': '',
                'productId': '',
                'productAmount': '',
                'period': '',
                'productPriceMin': '',
                'thirdPartyFlag': '',
                'productPriceMax': '',
                'thirdPartyId': '',
                'thirdPartyName': '',
                'companyName': JSON.parse(localStorage.getItem('userInfo')).companyName,
                'memo': '',
                'companyId': JSON.parse(localStorage.getItem('userInfo')).companyId
            }
        };
    },
    components: {
        productSearch
    },
    created () {
        this.$http.get(this.$api.account.types).then(res => {
            if (res.data.code === 0) {
                console.log(res.data.data);
                this.transactionOption = res.data.data;
            }
        });
    },
    methods: {
        // 修改公司名称
        onelist1click2 () {
            var that = this;
            that.onelist2Show = true;
            that.$http.post(that.$api.order.creatOrderCompanies, {
                'companyTypeId': 1, // 1:交易公司  2：承运商
                'name': this.parameter.thirdPartyName
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
            that.parameter.thirdPartyId = item.id;
            that.onelist2Show = false;
        },
        blur22 () {
            this.onelist2Show = false;
            this.parameter.thirdPartyId = '';
            this.parameter.thirdPartyName = '';
        },
        submitFormValid () {
            this.submitForm();
        },
        submitForm () {
            //
            if (!this.parameter.contactName) {
                this.$message.error('联系人不能为空');
                return;
            }
            if (!this.parameter.companyAddress) {
                this.$message.error('企业地址不能为空');
                return;
            }
            let reg = /^1[3456789]\d{9}$/;
            if (!reg.test(this.parameter.contactPhone)) {
                this.$message.error('请输入有效的手机号码');
                return;
            }
            if (!this.selectedProduct.goodsName) {
                this.$message.error('商品名称不能为空');
                return;
            }
            let reg2 = /^\+?[1-9][0-9]*$/;
            if (!reg2.test(this.parameter.productAmount)) {
                this.$message.error('请输入有效的数量');
                return;
            }
            if (!reg2.test(this.parameter.period)) {
                this.$message.error('请输入有效的资金周期');
                return;
            }
            if (!reg2.test(this.parameter.productPriceMin)) {
                this.$message.error('请输入有效的单价最小值');
                return;
            }
            if (!reg2.test(this.parameter.productPriceMax)) {
                this.$message.error('请输入有效的单价最大值');
                return;
            }
            //
            if (this.gyscheck === true) {
                this.parameter.thirdPartyFlag = 1;
            } else {
                this.parameter.thirdPartyFlag = 0;
                this.parameter.thirdPartyName = '';
                this.parameter.thirdPartyId = '';
            }
            this.parameter.productName = this.selectedProduct.goodsName;
            this.parameter.productId = this.selectedProduct.productId;
            if (this.parameter.serviceTypeId === 1) {
                this.parameter.serviceTypeName = '代采';
            } else {
                this.parameter.serviceTypeName = '代采代销';
            }
            let that = this;
            that.$http.post(this.$api.account.supplyChain, this.parameter).then(function (res) {
                if (res.data.code === 0) {
                    that.$message('创建成功');
                    that.$router.push({name: 'supplyList'});
                    return false;
                } else {
                    that.$message(res.data.message);
                }
            });
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
            margin: 10px 5px;
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
        }
        .mynewleftfonttop{
            margin-top: 10px;
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
            margin: 14px;
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
    }
</style>
