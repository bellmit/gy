<template>
    <div>
        <div class="new-title-public">
            <div class="mytop">
                <div class="top1">
                    供应链申请单
                </div>
            </div>
        </div>
        <application :scsAppModel="parameter" :isRemark="true" :statusName="statusName"></application>
        <div>
            <div style="border-bottom: 8px solid #f5f5f5">
                <div class="title-wrapper">
                    <i class="iconfont icon-bangdingxindetixianzhanghao"></i><span
                    class="gy-h5">公司信息</span>
                </div>
                <div class="application-info-content">
                    <view1 :scsAppModel="parameter"></view1>
                </div>
            </div>
            <div>
                <div class="title-wrapper">
                    <i class="iconfont icon-icon_shenqing"></i><span
                    class="gy-h5">申请详细信息</span>
                </div>
                <div class="application-info-content">
                    <view2 :scsAppModel="parameter"></view2>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import view1 from './component/view1';
import view2 from './component/view2';
import application from './component/application';
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
                'companyName': '',
                'thirdPartyName': '',
                'skuName': '',
                'deliveryWarehouseName': '',
                'shortOverflowRate': '',
                'needTransport': '',
                'companyId': JSON.parse(localStorage.getItem('userInfo')).companyId
            },
            statusName: 'color: #999'
        };
    },
    components: {
        productSearch, view1, view2, application
    },
    created () {
        this.myId = this.$route.query.myId;
        this.getInfo(); // 基础信息
    },
    methods: {
        // goback () {
        //     this.$router.push({name: 'supplyList'});
        // },
        getInfo () { // 申请单详情
            if (this.myId) {
                this.$http.get(this.$api.supply.getMyInfo + this.myId)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.parameter = res.data.data.scsAppModel;
                            switch (res.data.data.scsAppModel.statusName) {
                            case '平台审核':case '服务商审核':
                                this.statusName = 'color: #F49A1E';
                                break;
                            case '已拒绝':case '违约和处置':
                                this.statusName = 'color: #D12626';
                                break;
                            case '服务执行':case '已完成':
                                this.statusName = 'color: #24C815';
                                break;
                            default:
                                this.statusName = 'color: #999';
                                break;
                            }
                            return;
                        }
                        this.$message.error(res.data.message);
                    });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    .iconfont{
        color: $color-highlight;
    }
    .title-wrapper {
        padding: 15px 16px;
        cursor: default;
        .iconfont {
            margin-left: -6px;
            margin-right: 8px;
            vertical-align: baseline;
        }
        .gy-h5{
            /*font-family: "PingFangSC-Medium";*/
            font-weight: bold;
        }
        span {
            cursor: default;
        }
    }
    /deep/ .company-info-content {
        &:after {
            display: block;
            content: ' ';
            clear: both;
        }
        .gy-form-group {
            padding-left: 96px;
            .l {
                width: 86px;
            }
        }
    }
    /deep/ .application-info-content {
        padding-bottom: 6px;
        padding-left: 4px;
        &:after {
            display: block;
            content: ' ';
            clear: both;
        }
        .gy-form-group {
            padding-left: 125px;
            line-height: 20px;
            min-height: 36px;
            .l {
                width: 100px;
                color: #000;
            }
        }
    }
</style>
