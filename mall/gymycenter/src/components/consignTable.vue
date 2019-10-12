<template>
    <table class="gy-table list">
        <thead>
        <tr class="title">
            <td v-for="(td, index) in theadList" :key="index" :style='"width:" + td.width + "px"'>{{td.value}}</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in orderList" :key="index">
            <td :colspan="theadList.length" class="item">
                <div class="item-t">
                    <span class="fl" v-if="No === 0 || No === 3"><strong>单号：</strong>{{item.consignmentNoteCode}}
                        <!--<i class="iconfont icon-copy"></i>--></span>
                    <span class="fl" v-if="No === 2"><strong>单号：</strong>{{item.enquiryNoteCode}}
                        <!--<i class="iconfont icon-copy"></i>--></span>
                    <span class="fl" style="margin-left:16px;" v-if="item.consignmentContractCode"><strong>合同编号：</strong>{{item.consignmentContractCode}}</span>
                    <span class="fr"><strong>创建时间：</strong>{{item.createdDate | date(true)}}</span>
                </div>
                <table class="gy-table" v-if="No === 0">
                    <tr>
                        <td class="td-240">
                            <div class="pro-info" v-for="(pro, index) in item.consignmentNoteItemList" :key="index">
                                <span class="img" :style="'background-image: url(' + pro.imagePath + ')'"></span><span
                                class="name">{{pro.skuName}}<br>{{pro.skuQuantity + pro.infUnitOfMeasureName}}</span>
                            </div>
                        </td>
                        <td class="td-150">{{companyTypeId !== 2 ? item.carrierName : item.consignorName}}<br>
                            <a href="javascript:;" class="contact" v-if="companyTypeId === 2" @click="goIm(currentPhone, item.consignorImContactPhone, item.consignorId)"><i class="iconfont icon-imnew"></i>和我联系</a>
                            <a href="javascript:;" class="contact" v-else @click="goIm(currentPhone, item.carrierImContactMobile, item.carrierId)"><i class="iconfont icon-imnew"></i>和我联系</a>
                        </td>
                        <td class="td-180">{{item.loadingWarehouseAddress}}</td>
                        <td class="td-180">{{item.unloadingWarehouseAddress}}</td>
                        <td class="td-108">{{orderStatusValue[item.consignmentNoteStatus]}}</td>
                        <td class="td-108 align-c">
                            <router-link :to="{ name: 'transparentOrderDetail', query: {view: true, orderId: item.id} }"
                                         class="gy-button-view">查看
                            </router-link>
                            <div v-if="item.consignmentNoteStatus === 8 && storageId ===2 || storageId ===3 || storageId ===5">
                            <router-link target="_blank" :to="{ name: 'transBillsManagement', query: {consignmentNoteCode: item.consignmentNoteCode, orderId: item.id} }"
                                         class="gy-button-view">单据管理
                            </router-link>
                            <el-tooltip poper-class="test" :content="questionmark" placement="top" effect="light">
                                    <i v-if="item.billStatus === 1" class="iconfont icon-tishi2"></i>
                            </el-tooltip>
                            <el-tooltip poper-class="test" :content="exclamation" placement="top" effect="light">
                                    <i v-if="item.billStatus === 99" style="color: red;" class="iconfont icon-fail"></i>
                            </el-tooltip>
                            </div>
                        </td>
                    </tr>
                </table>
                <table class="gy-table" v-if="No === 2">
                    <tr>
                        <td class="td-240">
                            <div class="pro-info" v-for="(pro, index) in item.enquiryNoteItemList" :key="index">
                                <span class="img" :style="'background-image: url(' + pro.imagePath + ')'"></span><span
                                class="name">{{pro.skuName}}</span>
                            </div>
                        </td>
                        <td class="td-180">{{item.consignorName}}<br><a href="javascript:;" class="contact" target="_blank" @click="goIm(currentPhone, item.consignorImContactPhone, item.consignorId)"><i class="iconfont icon-imnew"></i>和我联系</a></td>
                        <td class="td-108 align-r">
                            <span v-for="(pro, index) in item.enquiryNoteItemList" :key="index">{{pro.skuQuantity | numToCash(3)}}</span>
                        </td>
                        <td class="td-120">{{item.estimatedLoadingDate | date}}</td>
                        <td class="td-210">装货地：{{item.loadTotalAddress}}<br>卸货地：{{item.unloadTotalAddress}}</td>
                        <td class="td-108 align-c">
                            <router-link :to="{ path: 'bid/detail', query: {'bidId': item.id} }" class="gy-button-view">
                                查看
                            </router-link>
                            <router-link v-if="!item.biddingNoteStatus" :to="{ path: 'bid/detail', query: {bidId: item.id, from: 'bidding'} }"
                                         class="gy-button-view">报价
                            </router-link>
                        </td>
                    </tr>
                </table>
                <table class="gy-table" v-if="No === 3">
                    <tr>
                        <td class="td-240">
                            <div class="pro-info" v-for="(pro, index) in item.consignmentNoteItemList" :key="index">
                                <span class="img" :style="'background-image: url(' + pro.imagePath + ')'"></span><span
                                class="name">{{pro.skuName}}</span>
                            </div>
                        </td>
                        <td class="td-210">{{companyTypeId !== 2 ? item.carrierName : item.consignorName}}</td>
                        <td class="td-100">{{item.freightPaymentType === 0 ? '在线支付' : '线下支付'}}</td>
                        <td class="td-100 align-r">{{item.freightFee || '待结算' | numToCash(2)}}</td>
                        <td class="td-125">
                            <span v-for="(pro, index) in item.consignmentNoteItemList" :key="index">装货数量：{{pro.quantityLoading || 0 + pro.infUnitOfMeasureName}}<br>卸货数量：{{pro.quantityUnloading || 0 + pro.infUnitOfMeasureName}}</span>
                        </td>
                        <td class="td-100">{{chargeStatusValue[item.settleStatus]}}</td>
                        <td class="td-95 align-c">
                            <router-link
                                :to="{ name: 'transparentSettlementDetail', query: {view: true, orderId: item.id} }"
                                class="gy-button-view">查看
                            </router-link>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    data () {
        return {
            storageId: JSON.parse(localStorage.getItem('userInfo')).companyTypeId,
            questionmark: '请提供准确真实的单据，否则会影响您在国烨网的信誉及后续交易。',
            exclamation: '单据未通过，请查看单据管理详情。',
            orderStatusValue: ['签约中', '签约中', '已失效', '实施中', '结算中', '结算中', '结算中', '付款中', '已完成', '实施中', '实施中', '实施中', '实施中'],
            chargeStatusValue: ['进行中', '已完成', '已失效', '已驳回'],
            companyTypeId: null,
            currentPhone: null
        };
    },
    props: ['orderList', 'theadList', 'No'],
    created () {
        this.companyTypeId = JSON.parse(localStorage.getItem('userInfo')).companyTypeId;
        this.currentPhone = JSON.parse(localStorage.getItem('userInfo')).phone;
    },
    methods: {
        goIm (f, t, c) {
            window.open('/im/#type=2&username=' + window.btoa(f) + '&touser=' + window.btoa(t) + '&touserCompanyId=' + window.btoa(c), '_blank');
        }
    }
};
</script>

<style lang="scss" scoped>
    .td-240 {
        width: 240px;
    }

    .td-180 {
        width: 180px;
    }

    .td-150 {
        width: 150px;
    }

    .td-108 {
        width: 108px;
    }

    .td-100 {
        width: 100px;
    }

    .td-222 {
        width: 222px;
    }
    .td-125 {
        width: 125px;
    }

    .td-210 {
        width: 210px;
    }

    .td-95 {
        width: 95px;
    }

    .td-120 {
        width: 120px;
    }
    .gy-button-view {
        margin-right: 5px;
    }
</style>
