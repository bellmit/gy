<template>
    <div class="suppyAdd">
        <div class="new-title-public">
            <div class="mytop">
                <div class="top1">
                    供应链申请单详情
                </div>
                <div class="top2">
                    申请单号：{{parameter.code}}
                </div>
                <div class="top3">
                    状态：{{parameter.status}}
                </div>
            </div>
        </div>
        <div class="div1">
            <div>
                <el-row>
                    <p class="title">
                        <i class="iconfont icon-shenqingren myi1" style="margin-top: -5px;
    display: inline-block;"></i>
                        <span class="myspan">申请人</span>
                    </p>
                </el-row>
            </div>
            <div class="div3">
                <el-row :gutter="60">
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="5" class="left_name">企业名称</el-col>
                            <el-col :span="19">{{newName}}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="5" class="left_name">联系人</el-col>
                            <el-col :span="19">{{parameter.contactName}}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top_1">
                        <el-row>
                            <el-col :span="5" class="left_name">企业地址</el-col>
                            <el-col :span="19">
                                {{parameter.companyAddress}}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top_1">
                        <el-row>
                            <el-col :span="5" class="left_name">联系方式</el-col>
                            <el-col :span="19">
                                {{parameter.contactPhone}}
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
            <el-row>
                <p class="title">
                    <i class="iconfont icon-dingdanxinxi myi1"></i>
                    <span class="myspan">详细信息</span>
                </p>
            </el-row>
            <div class="div3">
                <el-row :gutter="60">
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="5" class="left_name">
                                服务类型
                            </el-col>
                            <el-col :span="19">
                                {{parameter.serviceTypeName}}
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="5" class="left_name">
                                申请时间
                            </el-col>
                            <el-col :span="19">
                                {{parameter.createdDate| date('h')}}
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top_1">
                        <el-row>
                            <el-col :span="5" class="left_name">商品名称</el-col>
                            <el-col :span="19">
                                {{parameter.productName}}
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top_1">
                        <el-row>
                            <el-col :span="5" class="left_name">数量</el-col>
                            <el-col :span="18">
                                {{parameter.productAmount}}吨
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top_1">
                        <el-row>
                            <el-col :span="5" class="left_name">资金周期</el-col>
                            <el-col :span="19">
                                {{parameter.period}}天
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top_1">
                        <el-row>
                            <el-col :span="5" class="left_name">单价</el-col>
                            <el-col :span="19">
                                {{parameter.productPriceMin}}-{{parameter.productPriceMax}} 元/吨
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top_1">
                        <el-row>
                            <el-col :span="5" class="left_name">
                                指定供应商
                            </el-col>
                            <el-col :span="18">
                                {{parameter.thirdPartyName}}
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top_1">
                        <el-row>
                            <el-col :span="5" class="left_name">备注信息</el-col>
                            <el-col :span="19">
                                {{parameter.memo}}
                            </el-col>
                        </el-row>
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
            transactionType: 1,
            transactionOption: [{
                value: 1,
                label: '代采'
            },
            {
                value: 2,
                label: '代采代销'
            }],
            info: {
                districtName: ''
            },
            deliveryWarehouseName: '',
            isPublic: true,
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
                'serviceTypeId': '',
                'contactName': '',
                'companyAddress': '',
                'contactPhone': '',
                'productName': '',
                'productId': '',
                'productAmount': '',
                'period': '',
                'productPriceMin': '',
                'productPriceMax': '',
                'providerCompanyId': '',
                'providerCompanyName': '',
                'memo': '',
                'companyId': JSON.parse(localStorage.getItem('userInfo')).companyId
            }
        };
    },
    components: {
        productSearch
    },
    created () {
        this.myId = this.$route.query.myId;
        this.getInfo(); // 基础信息
    },
    methods: {
        // goback () {
        //     this.$router.push({name: 'supplyList'});
        // },
        getInfo () { // 编辑时调接口获取资源单详情
            if (this.myId) {
                this.$http.get(this.$api.account.supplyChainedit + '/' + this.myId).then(res => {
                    if (res.data.code === 0) {
                        console.log(res.data.data);
                        this.parameter.serviceTypeId = res.data.data.serviceTypeId;
                        this.parameter.contactName = res.data.data.contactName;
                        this.parameter.companyAddress = res.data.data.companyAddress;
                        this.parameter.contactPhone = res.data.data.contactPhone;
                        this.parameter.productAmount = res.data.data.productAmount;
                        this.parameter.productName = res.data.data.productName;
                        this.parameter.selectedProduct = res.data.data.selectedProduct;
                        this.parameter.period = res.data.data.period;
                        this.parameter.productPriceMin = res.data.data.productPriceMin;
                        this.parameter.productPriceMax = res.data.data.productPriceMax;
                        this.parameter.thirdPartyName = res.data.data.thirdPartyName;
                        this.parameter.memo = res.data.data.memo;
                        this.parameter.serviceTypeName = res.data.data.serviceTypeName;
                        this.parameter.createdDate = res.data.data.createdDate;
                        this.parameter.code = res.data.data.code;
                        if (res.data.data.status === 0) {
                            this.parameter.status = '待受理';
                        } else if (res.data.data.status === 1) {
                            this.parameter.status = '已受理';
                        } else if (res.data.data.status === 2) {
                            this.parameter.status = '已拒绝(很抱歉，您的申请不符合平台的要求)';
                        }
                    }
                });
            }
            console.log(this.myId);
        }
    }
};
</script>

<style lang="scss" scoped>
    .suppyAdd{
        margin-bottom: 400px;
        .myi1{
            margin-top: -3px;
            display: inline-block;
            font-size: 12px;
            color: #999;
        }
        .myspan{
            color: #333333;
            font-weight: bold;
        }
        .listul{
            background-color: #fff;
            width: 80%;
            max-height: 200px;
            overflow: auto;
            position: absolute;
            top: 30px;
            z-index: 9;
            border: 1px solid #e6eaea;
            border-top: none;
            margin-left: 20.5%;
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
            margin: 15px 16px;
        }
        .top_1{
            margin-top: 10px;
        }
        .mytop{
            overflow: hidden;
            .top1{
                float: left;
            }
            .top2{
                float: left;
                font-size: 12px;
                color: #666;
                margin-left: 16px;
            }
            .top3{
                float: right;
                font-size: 14px;
                color: #666;
            }
        }
        .left_name{
            color: #333333;
        }
    }
</style>
