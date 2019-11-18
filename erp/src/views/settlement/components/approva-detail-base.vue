<template>
   <div class="settle-detail">
       <div class="settle-title">基本信息</div>
        <div class="basic-information clearfix">
            <div class="gy-form-group">
                <span class="l">合同要素ID</span>
                <div class="text">{{contractEssenceId}}</div>
            </div>
            <div class="gy-form-group">
                <span class="l">结算状态</span>
                <div class="text">{{settleOrder.settleStatus | orderSettlementStatus}}</div>
            </div>
            <div class="gy-form-group">
                <span class="l">产品名称</span>
                <div class="text">{{essenceData.prodName}}</div>
            </div>
            <div class="gy-form-group">
                <span class="l">我方公司</span>
                <div class="text">{{essenceData.targetCorpName}}</div>
            </div>
            <div class="gy-form-group">
                <span class="l">结算发起人</span>
                <div class="text">{{settleOrder.launchName || '-'}}</div>
            </div>
            <div class="gy-form-group">
                <span class="l">创建时间</span>
                <div class="text">{{essenceData.createdDate | date}}</div>
            </div>
            <div class="gy-form-group">
                <span class="l">业务操作人</span>
                <div class="text">{{essenceData.businessManagerName}}</div>
            </div>
            <div class="gy-form-group">
                <span class="l">业务组</span>
                <div class="text">{{essenceData.organizationName}}</div>
            </div>
            <div class="gy-form-group">
                <span class="l">业务类型</span>
                <div class="text">{{essenceData.bizType | businessTradeType}}</div>
            </div>
            <div class="gy-form-group">
                <span class="l">交易类型</span>
                <div class="text">{{essenceData.transactionType | contractTransactionTypeList}}</div>
            </div>
        </div>
        <div class="settle-title">结算明细
            <span type="text" @click="lookSettle" v-if="settleOrder.paymentId || settleOrder.collectionId" class="linkInvoice">查看结款详情</span>
            <span type="text" @click="downloadpay" v-if="settleOrder.paymentId" class="linkInvoice" style="margin-right: 20px;">下载付款详情</span>
        </div>
        <div class="list">
            <table class="gy-table">
                <thead>
                    <tr>
                        <th>类别</th>
                        <th>数量 (吨)</th>
                        <th>单价 (元/吨)</th>
                        <th>金额 (元)</th>
                        <th>采购交割 (吨)</th>
                    </tr>
                </thead>
                <tbody v-if="settleOrder">
                    <tr>
                        <td style="width: 20%;">合同信息</td>
                        <td style="width: 20%;" class="text-r">{{order.skuQuantity | numToQuantity}}</td>
                        <td style="width: 20%;" class="text-r">
                            <span v-if="order.skuPriceType === 21 || order.skuPriceType === 22">公式计价</span>
                            <span v-else>{{order.skuPrice | numToCash(true)}}</span>
                        </td>
                        <td style="width: 20%;" class="text-r">
                            <span v-if="order.skuPriceType === 21 || order.skuPriceType === 22">公式计价</span>
                            <span v-else>{{order.skuTotalAmount | numToCash}}</span>
                        </td>
                        <td style="width: 20%;" class="text-r">{{settleOrder.alreadyDeliveryQuantity | numToQuantity}}</td>
                    </tr>
                    <tr>
                        <td>合同结算</td>
                        <td class="text-r">{{settleOrder.settlementQuantity | numToQuantity}}</td>
                        <td class="text-r">{{settleOrder.settlementPrice | numToCash(true)}}</td>
                        <td class="text-r">{{settleOrder.settlementAmount | numToCash}}</td>
                        <td class="text-r">-</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="5" style="text-align: center;">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="settle-title">{{typeText}}明细</div>
        <div class="list">
            <!-- 付款 -->
            <table class="gy-table" v-if='paymentList'>
                <thead>
                    <tr>
                        <th>付款单号</th>
                        <th>出账日期</th>
                        <th>付款银行</th>
                        <th>支付方式</th>
                        <th>经办人</th>
                        <th>操作时间</th>
                        <th>单价(元/吨)</th>
                        <th>付款数量(吨)</th>
                        <th>状态</th>
                        <th>付款金额(元)</th>
                    </tr>
                </thead>
                <tbody v-if="paymentList && paymentList.length != 0">
                    <tr v-for="(item, index) in paymentList" :key="index">
                        <td>{{item.id}}</td>
                        <td>{{item.payTime | date}}</td>
                        <td class="hover-td">
                            <span class="td">{{item.buyerDepositBank || '--'}}</span>
                            <span v-if="item.buyerDepositBank" class="hover-td-suspend">{{item.buyerDepositBank}}<i></i></span>
                        </td>
                        <td>{{item.tradeMode | tradeMode}}</td>
                        <td>{{item.creatorName}}</td>
                        <td>{{item.createdDate | date}}</td>
                        <td class="align-r" v-if="order.skuPriceType === 21 || order.skuPriceType === 22">
                            <span v-if="item.payMethod ==2">--</span>
                            <span v-else>{{item.tempPrice | numToCash(true)}}</span>
                        </td>
                        <td class="align-r" v-else>{{order.skuPrice | numToCash(true)}}</td>
                        <td class="align-r" v-if="order.skuPriceType === 21 || order.skuPriceType === 22">
                            <span v-if="item.payMethod ==2">--</span>
                            <span v-else>{{item.applyQuantities | numToQuantity}}</span>
                        </td>
                        <td class="align-r" v-else>--</td>
                        <td>{{item.approveStatus | paymentBillStatus(item)}}</td>
                        <td class="align-r">{{item.payTotal | numToCash}}</td>
                    </tr>
                    <tr>
                        <td colspan="2">实际付款总计</td>
                        <td colspan="8" class="text-r red" style="color:red">{{settleOrder.hadPayAmount | numToCash}}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="9" style="text-align: center;">暂无数据</td>
                    </tr>
                </tbody>
            </table>
            <!-- 收款 -->
            <table class="gy-table" v-if='collectionList'>
                <thead>
                    <tr>
                        <th>收款单号</th>
                        <th>入账日期</th>
                        <th>经办人</th>
                        <th>操作时间</th>
                        <th>单价(元/吨)</th>
                        <th>收款数量(吨)</th>
                        <th>状态</th>
                        <th>收款金额(元)</th>
                    </tr>
                </thead>
                <tbody v-if="collectionList && collectionList.length != 0">
                    <tr v-for="(item, index) in collectionList" :key="index">
                        <td>{{item.id}}</td>
                        <td>{{item.confirmDate | date}}</td>
                        <td>{{item.creatorName}}</td>
                        <td>{{item.createdDate | date}}</td>
                        <td class="align-r" v-if="order.skuPriceType === 21 || order.skuPriceType === 22">
                            <span v-if="item.payMethod ==2">--</span>
                            <span v-else>{{item.tempPrice | numToCash(true)}}</span>
                        </td>
                        <td class="align-r" v-else>{{order.skuPrice | numToCash(true)}}</td>
                        <td class="align-r" v-if="order.skuPriceType === 21 || order.skuPriceType === 22">
                            <span v-if="item.payMethod ==2">--</span>
                            <span v-else>{{item.applyQuantities | numToQuantity}}</span>
                        </td>
                        <td class="align-r" v-else>--</td>
                        <td>{{item.collectionStatus | collectionBillStatus()}}</td>
                        <td class="align-r">{{item.payTotal| numToCash}}</td>
                    </tr>
                    <tr>
                        <td colspan="2">实际收款总计</td>
                        <td colspan="6" class="text-r red" style="color:red">{{settleOrder.hadPayAmount | numToCash}}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="9" style="text-align: center;">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="settle-title">其他费用</div>
        <div class="other">
            <div v-if='otherList && otherList.length !== 0'>
                <div class="other-wrap" v-for="(item, index) in otherList" :key="index">
                    <span>费用名称 &nbsp;&nbsp;{{item.costItem || '-'}}</span>
                    <span>费用金额 (元) &nbsp;&nbsp;{{item.costCharge | numToCash}}</span>
                    <span>费用承担方 &nbsp;&nbsp;{{item.bearerName || '-'}}</span>
                </div>
            </div>
            <p v-else class="null-tip">-</p>
        </div>
        <div class="settle-title">备注</div>
        <div class="remark">{{settleOrder.remark || '-'}}</div>
        <div class="settle-title">合计</div>
        <div class="total">
            <!-- detailBuy 付款  detailSell 收款 -->
            <p>合同总金额(元)<span v-if="order.skuPriceType === 21 || order.skuPriceType === 22">公式计价</span><span v-else>{{typeText === '付款' ? essenceData.buyTotal : essenceData.saleTotal | numToCash}}</span></p>
            <p>已{{typeText}}总金额(元)<span>{{settleOrder.hadPayAmount | numToCash}}</span></p>
            <p>结算总金额(元)<span>{{settleOrder.settleTotalAmount | numToCash}}</span></p>
            <p>待{{typeText}}(元)<span class="red">{{settleOrder.settleBalance | numToCash}}</span></p>
        </div>
        <div class="settle-title" v-if="typeName === 'approval' && Number($route.query.doneFlg) === 0 && targetBizType ==23 && homeFromFlg==1">审批备注</div>
        <div class="approve-remark" v-if="typeName === 'approval' && Number($route.query.doneFlg) === 0 && targetBizType ==23 && homeFromFlg==1">
            <textarea class="gy-textarea" :disabled='Number($route.query.doneFlg) === 1' v-model="remarks"></textarea>
        </div>
        <div class="buttons">
            <button class="gy-button-normal" @click="goBack">返回</button>
            <button class="gy-button-normal" v-if="typeName === 'approval' && Number($route.query.doneFlg) === 0 && targetBizType ==23 && homeFromFlg==1" @click="doApprove(2)">驳回</button>
            <button class="gy-button-extra" v-if="typeName === 'approval' && Number($route.query.doneFlg) === 0 && targetBizType ==23 && homeFromFlg==1" @click="doApprove(1)">通过</button>
            <button v-if="settleOrder.settleBalance > 0 && Number($route.query.doneFlg) === 0 && targetBizType ==29 && homeFromFlg==1" class="gy-button-extra" @click="gotoSeetle(shouFuText)">{{shouFuText}}</button>
            <button v-if="settleOrder.settleBalance < 0 && Number($route.query.doneFlg) === 0 && targetBizType ==29 && homeFromFlg==1" class="gy-button-extra" @click="gotoSeetle(shouFuText)">{{shouFuText}}</button>
        </div>
        <div class="buttons pinl" v-if="typeName === 'approval' && homeFromFlg === 1">
            <button class="gy-button-extra" @click="comment()">评论</button>
        </div>
        <gy-operation-history ref="operationHis"></gy-operation-history>
        <gy-comment-remark :dialog="commentDiog" :invoice="contessDetailCommpany"></gy-comment-remark>
        <settleMoney ref="settleMoney" :cont-ess-data.sync="essenceData" :settleDilog="settleDilog" :order-item.sync="order" :settle-data.sync="settleOrder"></settleMoney>
   </div>
</template>

<script>
import gyOperationHistory from '@/components/gyOperationHistoryComment';
import gyCommentRemark from '@/components/gyCommentRemark';
import settleMoney from './settleMoney';
export default {
    components: {
        gyOperationHistory,
        gyCommentRemark,
        settleMoney
    },
    props: {
        typeName: String
    },
    data () {
        return {
            shouFuText: null,
            commentDiog: {
                dialogVisibleRemark: false
            },
            contessDetailCommpany: {
                targetType: 23,
                subSysType: 0,
                todoItemId: this.$route.query.id,
                targetId: this.$route.query.targetBizId,
                refFunc: {},
                refParam: {
                    targetId: this.$route.query.targetBizId, // 结算单ID
                    targetType: 23,
                    subSysType: 0,
                    affiliatedCompanyId: this.$route.query.companyId
                }
            },
            settleOrder: {}, // 结算明细-合同信息
            order: {}, // 结算明细-合同结算
            remarks: null,
            typeText: null,
            otherList: [], // 其他费用
            essenceData: {}, // 合同要素
            settleDilog: {
                collectionDialog: false,
                paymentDialog: false
            }, // 弹框
            targetBizType: this.$route.query.targetBizType, // 判断通过还是发起 29是发起
            homeFromFlg: Number(this.$route.query.homeFromFlg), // 1是审批 2是详情
            contractEssenceId: null, // 合同要素ID
            orderSettleId: null, // 结算单ID
            paymentList: [], // 付款
            collectionList: [] // 收款
        };
    },
    created () {
    },
    mounted () {
        this.init();
    },
    methods: {
        init () {
            // 审批 approval   详情 detail
            this.contractEssenceId = this.$route.query.contEssId;
            this.orderSettleId = this.$route.query.targetBizId;
            this.$route.query.todoId = this.$route.query.id; // 待办事项ID
            this.approve1History();
            this.getEssences();
            this.getSettlementOrder();
        },
        // 合同要素
        getEssences () {
            this.$http.get(this.$api.order.orderDetail + '/' + this.contractEssenceId).then(res => {
                if (res.data.code === 0) {
                    this.essenceData = res.data.data;
                    return;
                }
                this.$message({
                    message: res.data.message,
                    type: 'error'
                });
            });
        },
        // 结算明细
        getSettlementOrder () {
            let params = {
                orderSettleId: this.orderSettleId,
                contractEssenceId: this.contractEssenceId
            };
            this.$http.post(this.$api.settlement.getSettlementOrder, params).then(res => {
                if (res.data.code === 0) {
                    let data = res.data.data;
                    this.settleOrder = data.settlementOrder;
                    this.order = data.order;
                    this.paymentList = data.paymentList;
                    this.collectionList = data.collectionList;
                    this.otherList = data.settleChargesList; // 其他费用详情
                    this.typeText = this.paymentList ? '付款' : '收款';
                    if (this.settleOrder.bizType === 2) { // 销售
                        if (this.settleOrder.settleBalance > 0) {
                            this.shouFuText = '发起付款';
                        } else {
                            this.shouFuText = '发起收款';
                        }
                    } else {
                        if (this.settleOrder.settleBalance > 0) {
                            this.shouFuText = '发起收款';
                        } else {
                            this.shouFuText = '发起退款';
                        }
                    }
                    return;
                }
                this.$message({
                    message: res.data.message,
                    type: 'error'
                });
            });
        },
        // 审批
        doApprove (type) {
            let params = {
                todoId: this.$route.query.id,
                operaType: type,
                remarks: this.remarks
            };
            this.$http.post(this.$api.apprProc.doApprove, params).then(res => {
                if (res.data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.$router.go(-1);
                    return;
                }
                this.$message({
                    message: res.data.message,
                    type: 'error'
                });
            });
        },
        comment () {
            this.commentDiog.dialogVisibleRemark = true;
            this.contessDetailCommpany.refFunc = this.$refs.operationHis.display;
        },
        approve1History () {
            this.$refs.operationHis.display(this.$api.contract.approve1History, this.contessDetailCommpany.refParam);
        },
        gotoSeetle (shouFuText) {
            if (shouFuText === '发起收款') {
                this.$refs.settleMoney.initCollectionDialgData(shouFuText);
                this.settleDilog.collectionDialog = true;
            } else {
                this.$refs.settleMoney.initSettleMoney(shouFuText);
                this.settleDilog.paymentDialog = true;
            }
        },
        // 返回
        goBack () {
            if (this.$route.query.tabsIndex) {
                this.$router.push({name: 'orderDetails', query: {id: this.$route.query.contEssId, saleOrderId: this.$route.query.tabsIndex, purchaseOrderId: this.$route.query.purchaseOrderId, tabsIndex: 6}});
            } else {
                this.$router.go(-1);
            }
        },
        // 下载付款单
        downloadpay () {
            let that = this;
            let params = {};
            params.paymentId = that.settleOrder.paymentId;
            params.essenceId = that.$route.query.contEssId;
            let fileName = '结算付款单-' + that.$tools.parseDate(that.essenceData.createdDate) + '-' + that.settleOrder.paymentId + '.xls';
            that.$tools.exporttoExcel(that, that.$api.payment.downloadPayment, params, fileName);
        },
        // 查看结款详情
        lookSettle () {
            if (this.settleOrder.collectionId) { // 收款查看
                this.$router.push({name: 'paymentSell', query: {contEssId: this.contractEssenceId, collId: this.settleOrder.collectionId}});
            }
            if (this.settleOrder.paymentId) { // 付款查看
                this.$router.push({name: 'paymentBuy', query: {contEssId: this.contractEssenceId, payId: this.settleOrder.paymentId, purchaseOrderId: this.settleOrder.orderId}});
            }
        }
    }
};
</script>

<style lang='scss' scoped>
.settle-detail {
    overflow: hidden;
    .settle-title {
        font-size: 14px;
        color: #333333;
        line-height: 1;
        padding: 24px 16px;
        font-weight: bold;
    }
    .linkInvoice{
        color:#4a90e2;
        cursor: pointer;
        float: right;
    }
    .list {
        padding: 0 16px;
        .gy-table {
            .text-r {
                text-align: right;
            }
            .red {
                color: red;
            }
        }
        .hover-td {
            .td {
                width: 100px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: block;
            }
        }
        .hover-td {
            position: relative;
            .hover-td-suspend {
                display: none;
            }
            i {
                width: 12px;
                height: 12px;
                display: inline-block;
                background: #f5f5f5;
                position: absolute;
                top: -2px;
                left: 50%;
                transform: translateX(-50%);
                transform: rotate(45deg);
                z-index: -1;
            }
        }
        .hover-td:hover {
            .hover-td-suspend {
                display: block;
                width: max-content;
                position: absolute;
                bottom: -36px;
                left: 50%;
                transform: translateX(-55%);
                font-size: 12px;
                color: #999999;
                background: #f5f5f5;
                padding: 10px 8px;
                border-radius: 4px;
                z-index: 2000;
                line-height: 1.2;
                word-wrap: break-word;
                text-align: center;
            }
        }
    }
    .other {
        padding: 0 16px;
        .other-wrap {
            padding-left: 14px;
            span {
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-right: 24px;
            }
            span:nth-child(1) {
                width: 280px;
            }
            span:nth-child(2) {
                width: 260px;
            }
            span:nth-child(3) {
                width: 300px;
                margin-right: 0;
            }
        }
    }
    .remark {
        padding-left: 30px;
    }
    .total {
        text-align: right;
        padding-right: 30px;
        .red {
            color: #E3070F;
        }
        p {
            padding-bottom: 22px;
            span {
                padding-left: 24px;
                min-width: 100px;
                display: inline-block;
            }
        }
        p:last-child {
            padding-bottom: 0;
        }
    }
    .approve-remark {
        padding: 0 16px;
    }
    .buttons {
        text-align: right;
        padding: 32px 30px 32px 0;
        button {
            margin-right: 4px;
        }
        button:last-child {
            margin-right: 0;
        }
    }
    .pinl {
        padding-top: 0;
    }
    .null-tip {
        margin-left: 14px;
    }
}
</style>
