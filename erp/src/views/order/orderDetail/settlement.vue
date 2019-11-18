<template>
    <div>
        <div v-if="orderDetail.upstreamInfo">
            <div class="title1">采购结算</div>
            <div class="contract-wrapper">
                <div>
                    <span>合同数量(吨)</span><span>{{orderDetail.upstreamInfo.skuQuantity | numToQuantity}}</span>
                </div>
                <div>
                    <span>合同单价(元/吨)</span>
                    <span v-if="orderDetail.upstreamInfo.skuPriceType === 21 || orderDetail.upstreamInfo.skuPriceType === 22">公式计价</span>
                    <span v-else>{{orderDetail.upstreamInfo.skuPrice | numToCash(true)}}</span>
                </div>
                <div>
                    <span>合同金额(元)</span>
                    <span v-if="orderDetail.upstreamInfo.skuPriceType === 21 || orderDetail.upstreamInfo.skuPriceType === 22">公式计价</span>
                    <span v-else>{{orderDetail.upstreamInfo.totalAmount | numToCash}}</span>
                </div>
            </div>
            <div class="order-skjl" style="margin-bottom:20px;">
                <div class="gy-table j-table">
                    <el-table :data="settlementBuyList">
                        <el-table-column
                            fixed
                            label="编号"
                            width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.id}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="结算价(元/吨)"
                            width="120">
                            <template slot-scope="scope">
                                <div class="text-r">{{scope.row.settlementPrice | numToCash(true)}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="结算数量(吨)"
                            width="120">
                            <template slot-scope="scope">
                                <div class="text-r">{{scope.row.settlementQuantity | numToQuantity}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="结算金额(元)"
                            width="120">
                            <template slot-scope="scope">
                                <div class="text-r">{{scope.row.settlementAmount | numToCash}}</div>
                            </template>
                        </el-table-column>
                        <!--<el-table-column-->
                            <!--label="其他费用合计(元)"-->
                            <!--width="140">-->
                            <!--<template slot-scope="scope">-->
                                <!--<div class="text-r">{{scope.row.chargeTotalAmount | numToCash}}</div>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <el-table-column
                            label="已付款数量(元)"
                            width="130">
                            <template slot-scope="scope">
                                <div class="text-r" v-if="scope.row.skuPriceType === 21 || scope.row.skuPriceType === 22">{{scope.row.alreadyPaymentQuantity | numToQuantity}}</div>
                                <div v-else>--</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="已付款总额(元)"
                            width="130">
                            <template slot-scope="scope">
                                <div class="text-r">{{scope.row.hadPayAmount | numToCash}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="结算总金额(元)"
                            width="130">
                            <template slot-scope="scope">
                                <div class="text-r">{{scope.row.settleTotalAmount | numToCash}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="结算差额(元)"
                            width="120">
                            <template slot-scope="scope">
                                <div class="text-r">{{scope.row.settleBalance | numToCash}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="状态"
                            width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.settleStatus | orderSettlementStatus}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="创建时间"
                            width="120">
                            <template slot-scope="scope">
                                <span>{{scope.row.createdDate | date}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="110">
                            <template slot-scope="scope">
                                <button class="gy-button-view" style="background-color: white;" @click="showDetailBuy(scope.row)">查看</button>
                                <button class="gy-button-view" style="background-color: white;" @click="buyDownload(scope.row)">下载</button>
                                <!--<button class="gy-button-view" style="background-color: white;" @click="lookRecelive(item)">用印</button>-->
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div v-if="orderDetail.downstreamInfo">
            <div class="title1">销售结算</div>
            <div class="contract-wrapper">
                <div>
                    <span>合同数量(吨)</span><span>{{orderDetail.downstreamInfo.skuQuantity | numToQuantity}}</span>
                </div>
                <div>
                    <span>合同单价(元/吨)</span>
                    <span v-if="orderDetail.downstreamInfo.skuPriceType === 21 || orderDetail.downstreamInfo.skuPriceType === 22">公式计价</span>
                    <span v-else>{{orderDetail.downstreamInfo.skuPrice | numToCash(true)}}</span>
                </div>
                <div>
                    <span>合同金额(元)</span>
                    <span v-if="orderDetail.downstreamInfo.skuPriceType === 21 || orderDetail.downstreamInfo.skuPriceType === 22">公式计价</span>
                    <span v-else>{{orderDetail.downstreamInfo.totalAmount | numToCash}}</span>
                </div>
            </div>
            <div class="order-skjl" style="margin-bottom:20px;">
                <div class="gy-table j-table">
                    <el-table :data="settlementSellList" style="width: 100%">
                        <el-table-column
                            fixed
                            label="编号"
                            width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.id}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="结算价(元/吨)"
                            width="120">
                            <template slot-scope="scope">
                                <div class="text-r">{{scope.row.settlementPrice | numToCash(true)}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="结算数量(吨)"
                            width="120">
                            <template slot-scope="scope">
                                <div class="text-r">{{scope.row.settlementQuantity | numToQuantity}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="结算金额(元)"
                            width="120">
                            <template slot-scope="scope">
                                <div class="text-r">{{scope.row.settlementAmount | numToCash}}</div>
                            </template>
                        </el-table-column>
                        <!--<el-table-column-->
                            <!--label="其他费用合计(元)"-->
                            <!--width="140">-->
                            <!--<template slot-scope="scope">-->
                                <!--<div class="text-r">{{scope.row.chargeTotalAmount | numToCash}}</div>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <el-table-column
                            label="已收款数量(元)"
                            width="130">
                            <template slot-scope="scope">
                                <div class="text-r" v-if="scope.row.skuPriceType === 21 || scope.row.skuPriceType === 22">{{scope.row.alreadyPaymentQuantity | numToQuantity}}</div>
                                <div v-else>--</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="已收款总额(元)"
                            width="130">
                            <template slot-scope="scope">
                                <div class="text-r">{{scope.row.hadPayAmount | numToCash}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="结算总金额(元)"
                            width="130">
                            <template slot-scope="scope">
                                <div class="text-r">{{scope.row.settleTotalAmount | numToCash}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="结算差额(元)"
                            width="120">
                            <template slot-scope="scope">
                                <div class="text-r">{{scope.row.settleBalance | numToCash}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="状态"
                            width="100">
                            <template slot-scope="scope">
                                <span>{{scope.row.settleStatus | orderSettlementStatus}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="创建时间"
                            width="120">
                            <template slot-scope="scope">
                                <span>{{scope.row.createdDate | date}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="110">
                            <template slot-scope="scope">
                                <button class="gy-button-view" style="background-color: white;" @click="showDetailSale(scope.row)">查看</button>
                                <button class="gy-button-view" style="background-color: white;" @click="sellDownload(scope.row)">下载</button>
                                <!--<button class="gy-button-view" style="background-color: white;" @click="lookRecelive(item)">用印</button>-->
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        orderDetail: {
            default: {
                upstreamInfo: {},
                downstreamInfo: {}
            }
        },
        settlementBuyList: {
            default: []
        },
        settlementSellList: {
            default: []
        }
    },
    data () {
        return {
        };
    },
    methods: {
        showDetailBuy (row) { // 采购结算详情
            let query = {
                contEssId: row.contractEssenceId, // 合同要素id
                purchaseOrderId: row.purchaseOrderId, // 采购订单ID
                targetBizId: row.id, // 结算单ID
                tabsIndex: this.$route.query.saleOrderId // 从合同详情页过来的
            };
            this.$router.push({name: 'settlementDetailBuy', query: query});
        },
        // 采购下载
        buyDownload (item) {
            console.log(item);
            let that = this;
            let params = {
                orderSettleId: item.id,
                orderId: item.purchaseOrderId,
                contractEssenceId: item.contractEssenceId
            };
            let fileName = '采购结算清单-' + that.$tools.parseDate(new Date()) + '-' + item.id + '.xls';
            that.$tools.exporttoExcel(that, that.$api.settlement.purchaseReport, params, fileName);
        },
        // 销售下载
        sellDownload (item) {
            let that = this;
            let params = {
                orderSettleId: item.id, // 结算id
                orderId: item.saleOrderId, // 销售订单id
                contractEssenceId: item.contractEssenceId // 合同要素id
            };
            let fileName = '销售结算清单-' + that.$tools.parseDate(new Date()) + '-' + item.id + '.xls';
            that.$tools.exporttoExcel(that, that.$api.settlement.saleReport, params, fileName);
        },
        showDetailSale (row) { // 销售结算详情
            let query = {
                contEssId: row.contractEssenceId, // 合同要素id
                saleOrderId: this.$route.query.id, // 销售订单ID
                targetBizId: row.id, // 结算单ID
                tabsIndex: this.$route.query.saleOrderId // 从合同详情页过来的
            };
            this.$router.push({name: 'settlementDetailSell', query: query});
        }
    }
};
</script>

<style lang="scss" scoped>
.text-r {
    text-align: right;
}
.contract-wrapper {
    display: flex;
    height: 46px;
    line-height: 46px;
    &>div{
        flex: 1;
        span:first-child{
            padding-right: 15px;
        }
    }
}
.order-skjl {
    width: 100%;
    .gy-table {
    }
}
.btns-wrapper {
    display: flex;
    span{
        flex: 0 0 10px;
        text-align: center;
        color: $color-extra;
    }
}
</style>
