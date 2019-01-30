<template>
    <div class="transport-wrap order">
        <div class="detail">
            <h2>订单信息</h2>
            <div class="order-info">
                <dl>
                    <dt>订单号</dt>
                    <dd>{{orderInfo.consignmentNoteCode}}</dd>
                </dl>
                <dl>
                    <dt>订单状态</dt>
                    <dd>{{orderInfo.consignmentNoteStatusName}}</dd>
                </dl>
                <dl>
                    <dt>产品</dt>
                    <dd v-for="pro in orderInfo.consignmentNoteItemList" :key="pro.id">{{pro.skuName}}</dd>
                </dl>
                <dl>
                    <dt>重量</dt>
                    <dd v-for="pro in orderInfo.consignmentNoteItemList" :key="pro.id">{{pro.skuQuantity}}{{pro.infUnitOfMeasureName}}</dd>
                </dl>
                <dl>
                    <dt>装货地</dt>
                    <dd>{{orderInfo.loadingWarehouseAddress}}</dd>
                </dl>
                <dl>
                    <dt>卸货地</dt>
                    <dd>{{orderInfo.unloadingWarehouseAddress}}</dd>
                </dl>
                <dl>
                    <dt>期望发货日期</dt>
                    <dd>{{orderInfo.estimatedLoadingDate | date}}</dd>
                </dl>
                <dl>
                    <dt>车辆要求</dt>
                    <dd>{{orderInfo.infCarrierTypeName}}</dd>
                </dl>
                <dl>
                    <dt>承运方</dt>
                    <dd>{{orderInfo.carrierName}}</dd>
                </dl>
                <dl>
                    <dt>联系方式</dt>
                    <dd>{{orderInfo.consignorContactMobile}}</dd>
                </dl>
                <dl>
                    <dt>联系人</dt>
                    <dd>{{orderInfo.consignorContactName}}</dd>
                </dl>
                <dl>
                    <dt>货损限制</dt>
                    <dd v-for="pro in orderInfo.consignmentNoteItemList" :key="pro.id">±{{pro.damageRate}}‰</dd>
                </dl>
                <dl>
                    <dt>货值</dt>
                    <dd v-for="pro in orderInfo.consignmentNoteItemList" :key="pro.id">
                        <span v-if="pro.skuPrice">{{pro.intCurrencyMark + pro.skuPrice + '元/' + pro.infUnitOfMeasureName}}</span>
                    </dd>
                </dl>
                <dl>
                    <dt>支付方式</dt>
                    <dd>{{payWay[orderInfo.freightPaymentType]}}</dd>
                </dl>
                <dl>
                    <dt>签约方式</dt>
                    <dd>{{signType[orderInfo.consignmentSignType]}}</dd>
                </dl>
                <dl>
                    <dt>运费</dt>
                    <dd v-if="orderInfo.freightFee">{{orderInfo.freightFee + '元'}}</dd>
                    <dd v-else>未结算</dd>
                </dl>
                <dl>
                    <dt>合同编号</dt>
                    <dd>{{orderInfo.consignmentContractCode}}<i class="iconfont icon-img" @click="handleShowContract(orderInfo.contactFilePath)"></i></dd>
                </dl>
            </div>
            <div class="detail-list">
                <ul class="tabs">
                    <li :class="{'selected': item.selected}" v-for="(item, index) in detailTabs" :key="item.id" @click="handleDetailTab(index)">{{item.name}}</li>
                </ul>
                <table class="gy-table" v-show="detailTabs[0].selected">
                    <thead>
                        <tr>
                            <td>调度人</td>
                            <td>车辆</td>
                            <td>司机/电话</td>
                            <td>装货量</td>
                            <td>卸货量</td>
                            <td>状态</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(list, index) in traceDetailList" :key="index">
                            <td>{{list.schedulingPeople}}</td>
                            <td>{{list.licensePlateNumber}}</td>
                            <td>{{list.driverUsername + '/' +list.driverPhone}}</td>
                            <td>{{list.quantityLoading}}吨</td>
                            <td>{{list.quantityUnloading || 0}}吨</td>
                            <td>{{list.valid === 0 ? '无效' : '有效'}}</td>
                            <!--<td><router-link :to="{ name: 'transportDispatch', query: {dispatchCode: list.id} }" class="gy-button-view">查看</router-link></td>-->
                            <td><button class="gy-button-view" @click="handleViewDispatch(list.id)">查看</button></td>
                        </tr>
                    </tbody>
                </table>
                <table class="gy-table" v-show="detailTabs[1].selected">
                    <thead>
                    <tr>
                        <td>结算单号</td>
                        <td>品名</td>
                        <td>装货量(吨)</td>
                        <td>卸货量(吨)</td>
                        <td>运费(元/吨)</td>
                        <td>结算金额(元)</td>
                        <td>状态</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(list, index) in settleDetailList" :key="index">
                        <td>{{list.consignmentNoteCode}}</td>
                        <td v-for="pro in list.consignmentNoteItemList" :key="pro.id">{{pro.skuName}}</td>
                        <td v-for="pro in list.consignmentNoteItemList" :key="pro.id">{{pro.quantityLoading || 0}}</td>
                        <td v-for="pro in list.consignmentNoteItemList" :key="pro.id">{{pro.quantityUnloading || 0}}</td>
                        <td v-for="pro in list.consignmentNoteItemList" :key="pro.id">{{pro.freightUnitPrice}}</td>
                        <td>{{list.freightFee || 0}}</td>
                        <td>{{chargeStatusValue[list.settleStatus]}}</td>
                    </tr>
                    </tbody>
                </table>
                <table class="gy-table" v-show="detailTabs[2].selected">
                    <thead>
                    <tr>
                        <td>付款单号</td>
                        <td>付款方式</td>
                        <td>付款银行</td>
                        <td>收款银行</td>
                        <td>付款日期</td>
                        <td>付款金额</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in payDetailList" :key="index">
                        <td>{{item.payNumber}}</td>
                        <td>{{item.payMethod === 1 ? '在线支付' : (item.payMethod === 21 ? '银行转账' : '银行直付')}}</td>
                        <td>{{item.buyerDepositBank}}</td>
                        <td>{{item.sellerDepositBank}}</td>
                        <td>{{item.payTime | date}}</td>
                        <td>{{item.payTotal}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <transition name="fade">
            <contract :show-contract.sync="showContract" :show-btn="showHandlechapter" :file="contractUrl" @handlechapter="handleChapter" v-show="showContract"></contract>
        </transition>
    </div>
</template>
<script>
import contract from '@/components/contract';
export default {
    data () {
        return {
            orderId: null,
            companyId: null,
            contractUrl: null,
            showContract: false,
            showHandlechapter: false,
            orderInfo: {
                consignmentNoteItemList: [{}]
            },
            status: null,
            smallStatus: null,
            payWay: ['在线支付', '线下支付'],
            quoteType: ['承运商报价', '我有意向价', '向指定承运商询价'],
            signType: ['在线签约', '线下签约'],
            chargeStatusValue: ['进行中', '已完成', '已失效', '已驳回'],
            stepList: [
                {
                    id: 1,
                    name: '签约',
                    active: true,
                    done: false
                },
                {
                    id: 2,
                    name: '实施',
                    active: false,
                    done: false
                },
                {
                    id: 3,
                    name: '结算',
                    active: false,
                    done: false
                },
                {
                    id: 4,
                    name: '支付',
                    active: false,
                    done: false
                },
                {
                    id: 5,
                    name: '完成',
                    active: false,
                    done: false
                }
            ],
            message: null,
            companyTypeId: null,
            consignmentNoteCode: null,
            detailTabs: [
                {
                    id: 0,
                    name: '运输明细',
                    selected: true
                },
                {
                    id: 1,
                    name: '结算明细',
                    selected: false
                },
                {
                    id: 2,
                    name: '付款明细',
                    selected: false
                }
            ],
            traceDetailList: [],
            payDetailList: [],
            settleDetailList: []
        };
    },
    created () {
        this.init();
    },
    components: {
        contract
    },
    watch: {
        $route: 'init'
    },
    methods: {
        init () {
            this.orderId = this.$route.query.orderId;
            this.getOrderInfo();
            this.getTraceList();
        },
        getOrderInfo () {
            this.$http.get(this.$api.transport.orderDetail + this.orderId)
                .then(res => {
                    this.orderInfo = res.data.data;
                });
        },
        getTraceList () {
            this.$http.get(this.$api.transport.dispatchDetailList + '/' + this.orderId)
                .then(res => {
                    this.traceDetailList = res.data.data;
                });
        },
        getSettlementList () {
            this.$http.post(this.$api.transport.settleDetailList, {
                data: {
                    id: this.orderId
                },
                pageSize: 10000000,
                pageNum: 1
            })
                .then(res => {
                    this.settleDetailList = res.data.data.list;
                });
        },
        getPayList () {
            this.$http.post(this.$api.transport.payDetailList, {orderNumber: this.orderInfo.consignmentNoteCode})
                .then(res => {
                    this.payDetailList = res.data.data;
                });
        },
        handleViewDispatch (id) {
            this.$http.get(this.$api.transport.dispatchDetail + '/' + id)
                .then(res => {
                    let positon = res.data.data.dispatchNotePositionModelList;
                    window.localStorage.setItem('driverPosition', JSON.stringify(positon));
                    this.$router.push({name: 'transportDispatch', query: {dispatchCode: id}});
                });
        },
        handleDetailTab (idx) {
            this.detailTabs.forEach(item => {
                item.id === idx ? (item.selected = true) : (item.selected = false);
            });
            if (idx === 0) {
                this.getTraceList();
            }
            if (idx === 1) {
                this.getSettlementList();
            }
            if (idx === 2) {
                this.getPayList();
            }
        },
        handleChapter () {},
        handleShowContract (file) {
            this.showContract = true;
            this.contractUrl = file;
        }
    }
};
</script>
<style lang="scss" scoped>
    .tips .highlight{
        margin-left: 200px;
    }
    .icon-img{
        color: $color-extra;
        margin-left: 10px;
        cursor: pointer;
    }
</style>
