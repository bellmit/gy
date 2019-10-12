<template>
    <div class="transport-wrap order">
        <div class="detail">
            <h2>运输订单<span>订单号：{{orderId}}</span></h2>
            <div class="reject-step" v-if="status === 5 && smallStatus ===2">
                <dl v-if="companyTypeId === 2">
                    <dt>已失效</dt>
                    <dd>托运方已驳回运输订单，请重新创建。</dd>
                </dl>
                <dl v-else>
                    <dt>已失效</dt>
                    <dd>您已驳回运输订单，请重新创建。</dd>
                </dl>
            </div>
            <div class="order-step" v-else>
                <gy-step :step="item.id" :showLine="!(index === stepList.length - 1)" :isRight="index === stepList.length - 1" :isActive="item.active" :isDone="item.done" v-for="(item, index) in stepList" :key="index">
                    <div class="billStatus-active">{{item.name}}</div>
                </gy-step>
                <div class="tips cl">
                    <span><strong>温馨提示：</strong>{{message}}</span>
                    <router-link :to="{ name: 'transparentSettlementDetail', query: {view: true, orderId: orderId, status: orderInfo.consignmentNoteStatus} }" v-if="status === 2 && smallStatus > 4 && smallStatus < 8" class="highlight">结算明细</router-link>
                    <div class="buttons" v-if="status < 1">
                        <button class="gy-button-extra" @click="handleShowContract" v-if="companyTypeId === 2 && smallStatus === 0">签约</button>
                        <button class="gy-button-extra" @click="handleShowContract" v-if="companyTypeId !== 2 && smallStatus === 1">签约</button><button class="gy-button-normal" @click="rejectContract" v-if="companyTypeId !== 2 && smallStatus === 1">驳回</button>
                    </div>
                    <div class="buttons" v-if="status < 2 && status >= 1 && companyTypeId === 2">
                        <router-link :to="{ name: 'transportDispatch', query: {orderId: orderId} }" class="gy-button-extra">调度</router-link>
                    </div>
                    <div class="buttons" v-if="companyTypeId === 2 && status === 2 && smallStatus === 4">
                        <router-link :to="{ name: 'transparentSettlementDetail', query: {view: false, orderId: orderId, status: orderInfo.consignmentNoteStatus} }" class="gy-button-extra">结算</router-link>
                    </div>
                    <div class="buttons" v-if="companyTypeId !== 2 && status === 2 && smallStatus === 5">
                        <button @click="chargeConfirm(7)" class="gy-button-extra">确认</button><button @click="chargeConfirm(4)" class="gy-button-normal">驳回</button>
                    </div>
                    <div class="buttons" v-if="status < 4 && status >= 3 && companyTypeId !== 2">
                        <a :href='"#/my/payment/create?callback=transparentOrderDetail&orderNo=" + orderInfo.consignmentNoteCode + "&payMethod=4&billType=1&orderType=2"' class="gy-button-extra">支付</a>
                    </div>
                </div>
            </div>
            <h3><i class="iconfont icon-info"></i>订单信息</h3>
            <div class="order-info">
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
                    <dd>{{orderInfo.loadingWarehouseAddress}}</dd>
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
                    <dd v-for="pro in orderInfo.consignmentNoteItemList" :key="pro.id">{{pro.intCurrencyMark + pro.skuPrice + '元/' + pro.infUnitOfMeasureName}}</dd>
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
            </div>
            <div class="detail-list" v-if="status !== 5 && smallStatus !==2">
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
                            <td><router-link :to="{ name: 'transportDispatchDetail', query: {dispatchCode: list.id} }" class="gy-button-view">查看</router-link></td>
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
                </table>
            </div>
        </div>
        <transition name="fade">
            <contract :show-contract.sync="showContract" :show-btn="showHandlechapter" :file="contractUrl" @handlechapter="handleChapter" v-show="showContract"></contract>
        </transition>
    </div>
</template>
<script>
import gyStep from '@/components/step';
import contract from '@/components/contract';
export default {
    data () {
        return {
            orderId: null,
            companyId: null,
            contractUrl: null,
            showContract: false,
            orderInfo: {
                consignmentNoteItemList: [{}]
            },
            status: null,
            smallStatus: null,
            payWay: ['在线支付', '线下支付'],
            quoteType: ['承运商报价', '我有意向价', '向指定承运商询价'],
            signType: ['在线签约', '线下签约'],
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
            showHandlechapter: false,
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
    components: {
        gyStep,
        contract
    },
    created () {
        this.init();
    },
    watch: {
        $route: 'init'
    },
    methods: {
        init () {
            if (localStorage.getItem('userInfo')) {
                this.companyId = JSON.parse(localStorage.getItem('userInfo')).companyId;
                this.companyTypeId = JSON.parse(localStorage.getItem('userInfo')).companyTypeId;
                this.detailTabs[2].name = this.companyTypeId === 2 ? '收款明细' : '付款明细';
            }
            this.orderId = this.$route.query.orderId;
            this.getOrderInfo();
            this.getTraceList();
        },
        getOrderInfo () {
            this.$http.get(this.$api.transport.newOrder + '/' + this.orderId)
                .then(res => {
                    this.orderInfo = res.data.data;
                    this.status = res.data.data.consignmentNoteStatus;
                    this.getTransportStatus();
                });
        },
        getTransportStatus () {
            let postData = {};
            if (JSON.parse(localStorage.getItem('userInfo')).companyTypeId === 2) {
                postData = {
                    consignmentNoteStatus: this.status,
                    carrierId: this.companyId
                };
            } else {
                postData = {
                    consignmentNoteStatus: this.status,
                    consignorId: this.companyId
                };
            }
            this.$http.post(this.$api.transport.transportStatus, postData)
                .then(res => {
                    this.message = res.data.data.tips;
                    this.smallStatus = res.data.data.smallStatus;
                    this.status = res.data.data.bigStatus;
                    this.stepList.forEach(item => {
                        if (item.id <= (this.status + 1)) {
                            item.active = true;
                        } else {
                            item.active = false;
                        }
                        if (item.id < (this.status + 1)) {
                            item.done = true;
                        } else {
                            item.done = false;
                        }
                    });
                });
        },
        handleChapter () {
            let postData = {};
            this.showHandlechapter = true;
            if (JSON.parse(localStorage.getItem('userInfo')).companyTypeId === 2) {
                postData = {
                    lgsConsignmentNoteId: this.orderId,
                    carrierId: this.companyId
                };
            } else {
                postData = {
                    lgsConsignmentNoteId: this.orderId,
                    consignorId: this.companyId
                };
            }
            this.$http.post(this.$api.transport.signContract, postData)
                .then(res => {
                    // document.getElementById('contractIframe').contentDocument.location.reload(true);
                    this.contractUrl = res.data.data;
                    this.showContract = true;
                });
        },
        handleShowContract () {
            let postData = {};
            this.showHandlechapter = true;
            if (JSON.parse(localStorage.getItem('userInfo')).companyTypeId === 2) {
                postData = {
                    lgsConsignmentNoteId: this.orderId,
                    carrierId: this.companyId
                };
            } else {
                postData = {
                    lgsConsignmentNoteId: this.orderId,
                    consignorId: this.companyId
                };
            }
            this.$http.post(this.$api.transport.viewContract, postData)
                .then(res => {
                    // document.getElementById('contractIframe').contentDocument.location.reload(true);
                    this.contractUrl = res.data.data;
                    this.showContract = true;
                });
        },
        getTraceList () {
            this.$http.get(this.$api.transport.dispatchDetailList + '/' + this.orderId)
                .then(res => {
                    this.traceDetailList = res.data.data;
                });
        },
        getSettlementList () {
            this.$http.post(this.$api.transport.settleDetailList, {orderNumber: this.orderInfo.consignmentNoteCode})
                .then(res => {
                    this.settleDetailList = res.data.data;
                });
        },
        getPayList () {
            this.$http.post(this.$api.transport.payDetailList, {orderNumber: this.orderInfo.consignmentNoteCode})
                .then(res => {
                    this.payDetailList = res.data.data;
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
        rejectContract () {
            this.$http.put(this.$api.transport.viewContract + '/' + this.orderId + '/rejectContract', {
                consignorId: this.companyId
            })
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('提交成功', '提示').then(() => {
                            location.reload();
                        });
                    }
                });
        },
        chargeConfirm (status) {
            this.$http.put(this.$api.transport.newOrder, {
                consignmentNoteStatus: status,
                id: this.orderId
            }).then((res) => {
                if (res.data.code === 0) {
                    this.$alert('操作成功', '提示')
                        .then(() => {
                            this.$router.push({name: 'transparentOrder'});
                        });
                    return;
                }
                this.$alert(res.data.message, '出错了');
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    .tips .highlight{
        margin-left: 200px;
    }
</style>
