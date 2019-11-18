<template>
    <div class="orderList">
        <div class="search-wrapper">
            <div class="search-form clearfix">
                <div class="gy-form-group">
                    <span class="l">合同要素ID</span>
                    <input type="text" placeholder="请输入合同要素ID" v-model="orders.id">
                </div>
                <div class="gy-form-group">
                    <span class="l">产品名称</span>
                    <input type="text" placeholder="请输入产品名称" v-model="orders.prodName">
                </div>
                <div class="gy-form-group">
                    <span class="l">业务操作人</span>
                    <input type="text" placeholder="请输入业务操作人" v-model="orders.businessManagerName">
                </div>
                <div class="gy-form-group">
                    <span class="l">执行操作人</span>
                    <input type="text" placeholder="请输入执行操作人" v-model="orders.executiveName">
                        <span v-if="!isShowSearch" class="searchicon" @click="search()"><i class="iconfont icon-search"></i></span>
                </div>
                <template v-if="isShowSearch">
                    <div class="gy-form-group">
                        <span class="l">上游公司</span>
                        <input type="text" placeholder="请输入上游公司" v-model="orders.sellerCompanyName">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">下游公司</span>
                        <input type="text" placeholder="请输入下游公司" v-model="orders.buyerCompanyName">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">我方公司</span>
                        <input type="text" placeholder="请输入我方公司" v-model="orders.targetCorpName">
                    </div>
                     <div class="gy-form-group">
                        <span class="l">业务类型</span>
                        <el-select v-model="orders.bizType" clearable placeholder="请选择业务类型">
                            <el-option
                                    v-for="item in $constant.bizType4CreateEss"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="gy-form-group cl">
                        <span class="l">创建时间</span>
                        <div class="searchDate">
                            <div class="d">
                                <el-date-picker
                                        v-model="orders.staCreatedDate"
                                        type="date"
                                        value-format="timestamp"
                                        placeholder="开始日期">
                                </el-date-picker>
                            </div>
                            <div class="c">至</div>
                            <div class="d">
                                <el-date-picker
                                        v-model="orders.endCreatedDate"
                                        type="date"
                                        value-format="timestamp"
                                        @change="orders.endCreatedDate = $tools.convertDateEnd(orders.endCreatedDate)"
                                        placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                        <span v-if="isShowSearch" class="searchicon" @click="search()"><i
                                class="iconfont icon-search"></i></span>
                    </div>
                </template>
            </div>
            <span class="search-btn" @click="ShowSearch">高级搜索<i class="el-input__icon"
                                                                :class="isShowSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </div>
        <div class="gy-table">
            <el-table
                    :data="orderlist"
                    style="width: 100%">
                <el-table-column
                        fixed
                        v-bind:label="'ID\n产品名称'" :show-overflow-tooltip="true"
                        width="110">
                    <template slot-scope="scope"><div class="wid-overflow">
                        <span @click="orderClickDetail(scope.row)" style="color: #4A90E2;cursor: pointer">{{scope.row.id}}</span><br/>
                        <span @click="orderClickDetail(scope.row)" style="color: #4A90E2;cursor: pointer;">{{scope.row.prodName}}</span></div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="类别"
                    width="70">
                    <template slot-scope="scope">
                        <span v-if="scope.row.contractType === 1">采购<br>销售</span>
                        <span v-if="scope.row.contractType === 2">采购</span>
                        <span v-if="scope.row.contractType === 3">销售</span>
                    </template>
                </el-table-column>
                <el-table-column
                        v-bind:label="'上游公司\n下游公司'"
                        width="120">
                    <template slot-scope="scope">
                        <el-tooltip placement="bottom" visible-arrow="false">
                            <div slot="content">{{scope.row.sellerCompanyName}}<br/>{{scope.row.buyerCompanyName}}</div>
                            <div class="wid-overflow">
                                <span>{{scope.row.sellerCompanyName}}</span><br v-if="scope.row.sellerCompanyName">
                                <span>{{scope.row.buyerCompanyName}}</span>
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="110">
                    <template slot-scope="scope">
                        <span v-if="scope.row.upstreamInfo && scope.row.upstreamInfo.operateDetailModel && scope.row.upstreamInfo.operateDetailModel.orderExecuteSubStatusModel !== null">{{scope.row.upstreamInfo.operateDetailModel.orderExecuteSubStatusModel.sellerMessage}}</span><br v-if="scope.row.upstreamInfo">
                        <span v-if="scope.row.downstreamInfo && scope.row.downstreamInfo.operateDetailModel && scope.row.downstreamInfo.operateDetailModel.orderExecuteSubStatusModel !== null">{{scope.row.downstreamInfo.operateDetailModel.orderExecuteSubStatusModel.buyerMessage}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="我方公司"
                        width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.targetCorpAbbrName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        v-bind:label="'采购交割日期\n销售交割日期'"
                        width="250">
                    <template slot-scope="scope">
                        <span>{{scope.row.planBuyDlvyDate}}</span><br v-if="scope.row.planBuyDlvyDate">
                        <span>{{scope.row.planSaleDlvyDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="总金额(元)"
                        class-name="amount-right-el"
                        width="140">
                    <template slot-scope="scope">
                        <template v-if="scope.row.purchaseOrderId">
                            <span v-if="scope.row.buySkuPriceType === 21 || scope.row.buySkuPriceType === 22">公式计价</span>
                            <span v-else>{{scope.row.buyTotal | numToCash}}</span><br>
                        </template>
                        <template v-if="scope.row.saleOrderId">
                            <span v-if="scope.row.saleSkuPriceType === 21 || scope.row.saleSkuPriceType === 22">公式计价</span>
                            <span v-else>{{scope.row.saleTotal | numToCash}}</span>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column
                        label="数量(吨)"
                        class-name="amount-right-el"
                        width="100">
                    <template slot-scope="scope">
                        <span v-if="scope.row.purchaseOrderId">{{scope.row.buySkuQuantity|numToQuantity}}</span><br v-if="scope.row.purchaseOrderId">
                        <span v-if="scope.row.saleOrderId">{{scope.row.saleSkuQuantity|numToQuantity}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="交叉交割"
                        width="90"><template slot-scope="scope"><span v-if="scope.row.saleCrossDeliveryFlag === 1" style="display: inline-block;"><i
                                class="el-icon-success" style="color: #4C97FC;"></i></span><span v-if="scope.row.saleCrossDeliveryFlag === 0" style="display: inline-block;"><i
                                class="el-icon-remove-outline" style="color:#D9D9D9;"></i></span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="业务操作人"
                        width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.businessManagerName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="执行操作人"
                    width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.executiveName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        v-bind:label="'采购合同编号\n销售合同编号'"
                        width="200">
                    <template slot-scope="scope">
                        <span>{{scope.row.phsContractCode}}</span><br v-if="scope.row.phsContractCode">
                        <span>{{scope.row.saleContractCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="创建时间"
                        width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.createdDate | date(1)}}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="266">
                    <template slot-scope="scope">
                        <div style="display: inline-block;width: 100%;padding-left:0px" v-if="scope.row.upstreamInfo !== null && scope.row.upstreamInfo.operateDetailModel.orderExecuteSubStatusModel !== null">
                            <span v-for="(itemSales,index) in scope.row.upstreamInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList"
                                  :key="index" style="display: inline-block;margin-left: 3px;">
                                <button class="bgc" style="width: 55px"
                                        :class="{notComplete:itemSales.valid === 1,notOperable: itemSales.valid === 0}"
                                        v-if="itemSales.statueSeller !== null"
                                        @click="salesClick(itemSales.id, itemSales, scope.row)">{{itemSales.button}}
                                </button>
                            </span>
                            <span style="display: inline-block;margin-left: 3px;">
                                <button class="bgc notComplete" style="width: 55px"
                                        :class="{notComplete:scope.row.buySettleStatus === 1,notOperable: scope.row.buySettleStatus === 2}"
                                        @click="purchaseSettle(scope.row.purchaseOrderId, scope.row)">采购结算</button>
                            </span>
                        </div>
                        <div style="display: inline-block;width: 100%;padding-left:0px" v-if="scope.row.downstreamInfo !== null && scope.row.downstreamInfo.operateDetailModel.orderExecuteSubStatusModel !== null">
                            <span v-for="(itemPurse,index) in scope.row.downstreamInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList"
                                  :key="index" style="display: inline-block;margin-left: 3px;">
                                <button class="bgc" style="width: 55px"
                                        :class="{notComplete:itemPurse.valid === 1,notOperable: itemPurse.valid === 0}"
                                        @click="purchaseClick(itemPurse.id, itemPurse, scope.row)">{{itemPurse.button}}
                                </button>
                            </span>
                            <span style="display: inline-block;margin-left: 3px;">
                                <button class="bgc notComplete" style="width: 55px"
                                        :class="{notComplete:scope.row.saleSettleStatus === 1,notOperable: scope.row.saleSettleStatus === 2}"
                                        @click="salesSettle(scope.row.saleOrderId, scope.row)">销售结算</button>
                            </span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <listStatistics @toggleTabs="getAllPageStatusCount">
                <div class="list-statistics-item">
                    <div class="list-statistics-item-l"><span>采购数量(吨)</span><span>{{getAllPageStatusCountObj.approvaledBuySkuQuantity | numToQuantity}}</span></div>
                    <div class="list-statistics-item-l"><span>采购交割(吨)</span><span>{{getAllPageStatusCountObj.approvaledBuyDeliveryQuantityCount | numToQuantity}}</span></div>
                    <div class="list-statistics-item-l"><span>付款金额(元)</span><span class="span-money">{{getAllPageStatusCountObj.approvaledBuyPayTotalAll | numToCash}}</span></div>
                    <div class="list-statistics-item-l"><span>销售数量(吨)</span><span>{{getAllPageStatusCountObj.approvaledSellSkuQuantity | numToQuantity}}</span></div>
                    <div class="list-statistics-item-l"><span>销售交割(吨)</span><span>{{getAllPageStatusCountObj.approvaledSellDeliveryQuantityCount | numToQuantity}}</span></div>
                    <div class="list-statistics-item-l"><span>收款金额(元)</span><span class="span-money">{{getAllPageStatusCountObj.approvaledSellPayTotalAll | numToCash}}</span></div>
                </div>
            </listStatistics>
        </div>
        <!-- 新建收付款 -->
        <gy-payment :order-data="orderBoolObj" :order-ids="orderlistDetail" :downstream-info="orderDownstreamMessage" :upstream-info="orderUpstreamMessage"
                    @ivoiceList="getOrderlist" ref="paymentClick"></gy-payment>
        <gy-delivery :order-data="orderBoolObj" :order-ids="orderlistDetail"
                     @ivoiceList="getOrderlist" ref="deliveryClick"></gy-delivery>
        <gy-invoice :order-data="orderBoolObj" :order-ids="orderlistDetail" :downstream-info="orderDownstreamMessage" :upstream-info="orderUpstreamMessage"
                    @ivoiceList="getOrderlist" ref="invoiceClick"></gy-invoice>
        <gy-settle :order-data="orderBoolObj" @ivoiceList="getOrderlist" ref="settleClick"></gy-settle>
        <!--</div>-->
        <!-- 翻页 -->
        <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="orders.pageNo"
                :page-size="orders.pageSize"
                :total="total"
                @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
import gyPayment from './orderDetail/paymentAssembly.vue';
import gyDelivery from './orderDetail/deliveryAssembly.vue';
import gyInvoice from './orderDetail/invoiceAssembly.vue';
import gySettle from './orderDetail/settleAssembly.vue';
import listStatistics from './../components/listStatistics';
export default {
    components: {
        gyPayment,
        gyDelivery,
        gyInvoice,
        gySettle,
        listStatistics
    },
    data () {
        return {
            payMethod: [
                {
                    type: '货款',
                    status: 1
                },
                {
                    type: '保证金',
                    status: 2
                },
                {
                    type: '追加保证金',
                    status: 5
                }
            ],
            isShowSearch: false,
            orderlist: [],
            orders: {
                pageNo: 1,
                pageSize: 10
            },
            total: null,
            orderBoolObj: {
                purchaseDeliverydialog: false, // 采购交割
                newSaledialog: false, // 销售
                dialogVisibles: false, // 开票
                collectTicketsdialog: false, // 收票
                dialogVisible: false, // 新建付款
                newReceiptsdialog: false, // 新建收款
                salesSettledialog: false, // 采购结算
                purchaseSettledialog: false // 销售结算
            },
            orderlistDetail: {}, // 点击每行的基本信息,
            settlelistDetail: {}, // 结算的信息,
            paymentInfo: null, // 付款明细
            receiptInfo: {}, // 收款明细
            orderUpstreamMessage: {}, // 采购基本信息
            orderDownstreamMessage: {}, // 销售基本信息
            allowedFunctionsId: 0, // 审批ID
            getAllPageStatusCountObj: {} // 统计接收对象
        };
    },
    activated () {
        if (!this.$route.meta.isBack) {
            this.orders = {};
            this.getOrderlist();
        }
        this.$route.meta.isBack = false;
    },
    created () {
        this.getAllPageStatusCount(1);
    },
    methods: {
        // 采购列表按钮
        purchaseClick (ids, data, item) {
            if (item.approveStatus === 12) {
                this.$message.warning('该合同锁定中，请在修改合同要素完成后再操作');
                return;
            }
            // 收款 - 销售交割 - 开票
            if (ids === 34) {
                this.receivables(item, 4, null, data);
            } else if (ids === 35) {
                this.salesDelivery(item, 5, null, data);
            } else if (ids === 39) {
                this.ticketOpening(item, 6, null, data);
            }
        },
        // 销售列表按钮
        salesClick (ids, data, item) {
            if (item.approveStatus === 12) {
                this.$message.warning('该合同锁定中，请在修改合同要素完成后再操作');
                return;
            }
            // 付款 - 采购交割 - 收票
            if (ids === 36) {
                this.payment(item, 1, null, data);
            } else if (ids === 37) {
                this.purchaseDelivery(item, 2, null, data);
            } else if (ids === 38) {
                this.collectTickets(item, 3, null, data);
            }
        },
        // 跳转详情
        orderClickDetail (item) {
            this.$router.push({name: 'orderDetails', query: {id: item.id, saleOrderId: item.saleOrderId, purchaseOrderId: item.purchaseOrderId}});
        },
        // 列表
        getOrderlist () {
            this.$http.post(this.$api.order.orderList, this.orders).then((res) => {
                if (res.data.code === 0) {
                    this.total = res.data.data.total;
                    this.orderlist = res.data.data.rows;
                    for (let j = 0; j < this.orderlist.length; j++) {
                        // 销售 - 下游
                        if (this.orderlist[j].downstreamInfo !== null && this.orderlist[j].downstreamInfo.operateDetailModel &&
                            this.orderlist[j].downstreamInfo.operateDetailModel.orderExecuteSubStatusModel !== null &&
                            this.orderlist[j].downstreamInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList !== null) {
                            for (let i = 0; i < this.orderlist[j].downstreamInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList.length; i++) {
                                // 收款
                                if (this.orderlist[j].downstreamInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].id === 34) {
                                    this.orderlist[j].downstreamInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].statueSeller = this.orderlist[j].collectionStatus;
                                }
                                // 销售交割
                                if (this.orderlist[j].downstreamInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].id === 35) {
                                    this.orderlist[j].downstreamInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].statueSeller = this.orderlist[j].saleDlvyStatus;
                                }
                                // 开票
                                if (this.orderlist[j].downstreamInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].id === 39) {
                                    this.orderlist[j].downstreamInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].statueSeller = this.orderlist[j].saleReceiptStatus;
                                }
                            }
                        }
                        // 采购 - 上游
                        if (this.orderlist[j].upstreamInfo !== null && this.orderlist[j].upstreamInfo.operateDetailModel &&
                            this.orderlist[j].upstreamInfo.operateDetailModel.orderExecuteSubStatusModel !== null &&
                            this.orderlist[j].upstreamInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList !== null) {
                            for (let i = 0; i < this.orderlist[j].upstreamInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList.length; i++) {
                                // 付款
                                if (this.orderlist[j].upstreamInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].id === 36) {
                                    this.orderlist[j].upstreamInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].statueBuyer = this.orderlist[j].paymentStatus;
                                }
                                // 采购交割
                                if (this.orderlist[j].upstreamInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].id === 37) {
                                    this.orderlist[j].upstreamInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].statueBuyer = this.orderlist[j].buyDlvyStatus;
                                }
                                // 收票
                                if (this.orderlist[j].upstreamInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].id === 38) {
                                    this.orderlist[j].upstreamInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].statueBuyer = this.orderlist[j].buyReceiptStatus;
                                }
                            }
                        }
                    }
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 获取订单详情
        // 订单明细
        orderDetailList (item, val) {
            let that = this;
            that.$http.get(that.$api.order.orderDetail + '/' + item.id)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.orderUpstreamMessage = res.data.data.upstreamInfo; // 上游采购
                        if (!that.orderUpstreamMessage) {
                            that.orderUpstreamMessage = {};
                        }
                        that.orderDownstreamMessage = res.data.data.downstreamInfo; // 下游销售
                        if (!that.orderDownstreamMessage) {
                            that.orderDownstreamMessage = {};
                        }
                        // 付款
                        if (val === 1) {
                            that.orderBoolObj.dialogVisible = true;
                            that.orderBoolObj.purchaseDeliverydialog = false;
                            that.orderBoolObj.collectTicketsdialog = false;
                            that.orderBoolObj.newReceiptsdialog = false;
                            that.orderBoolObj.newSaledialog = false;
                            that.orderBoolObj.dialogVisibles = false;
                            that.$refs.paymentClick.initPaymentView(item.purchaseOrderId, item.sellerCompanyId);
                        }
                        // 采购交割
                        if (val === 2) {
                            that.orderBoolObj.dialogVisible = false;
                            that.orderBoolObj.purchaseDeliverydialog = true;
                            that.orderBoolObj.collectTicketsdialog = false;
                            that.orderBoolObj.newReceiptsdialog = false;
                            that.orderBoolObj.newSaledialog = false;
                            that.orderBoolObj.dialogVisibles = false;
                            that.$refs.deliveryClick.initBuyDeliveryView(item.purchaseOrderId);
                        }
                        // 收票
                        if (val === 3) {
                            that.orderBoolObj.dialogVisible = false;
                            that.orderBoolObj.purchaseDeliverydialog = false;
                            that.orderBoolObj.collectTicketsdialog = true;
                            that.orderBoolObj.newReceiptsdialog = false;
                            that.orderBoolObj.newSaledialog = false;
                            that.orderBoolObj.dialogVisibles = false;
                            that.$refs.invoiceClick.initCollectTicketsView(item.purchaseOrderId);
                        }
                        // 收款
                        if (val === 4) {
                            that.orderBoolObj.dialogVisible = false;
                            that.orderBoolObj.purchaseDeliverydialog = false;
                            that.orderBoolObj.collectTicketsdialog = false;
                            that.orderBoolObj.newReceiptsdialog = true;
                            that.orderBoolObj.newSaledialog = false;
                            that.orderBoolObj.dialogVisibles = false;
                            that.$refs.paymentClick.initReceiptView(item.saleOrderId, item.sellerCompanyId);
                        }
                        // 销售交割
                        if (val === 5) {
                            that.orderBoolObj.dialogVisible = false;
                            that.orderBoolObj.purchaseDeliverydialog = false;
                            that.orderBoolObj.collectTicketsdialog = false;
                            that.orderBoolObj.newReceiptsdialog = false;
                            that.orderBoolObj.newSaledialog = true;
                            that.orderBoolObj.dialogVisibles = false;
                            that.$refs.deliveryClick.initSaleDeliveryView(item.saleOrderId, item.productId);
                        }
                        // 开票
                        if (val === 6) {
                            that.orderBoolObj.dialogVisible = false;
                            that.orderBoolObj.purchaseDeliverydialog = false;
                            that.orderBoolObj.collectTicketsdialog = false;
                            that.orderBoolObj.newReceiptsdialog = false;
                            that.orderBoolObj.newSaledialog = false;
                            that.orderBoolObj.dialogVisibles = true;
                            that.$refs.invoiceClick.initInvoiceView(item.purchaseOrderId, item.saleOrderId, item.productId, item.prodName, item.buyerCompanyId);
                        }
                    } else {
                        that.$message.error(res.data.message);
                    }
                });
        },
        ShowSearch () {
            this.isShowSearch = !this.isShowSearch;
        },
        search () {
            if (this.orders.bizType === 0) {
                this.orders.bizType = null;
            }
            this.getOrderlist();
        },
        // 分页
        handleCurrentChange (r) {
            this.orders.pageNo = r;
            this.getOrderlist();
        },
        // 付款
        payment (item, val, jur, valids) {
            if (valids.valid !== 1) {
                this.$message.warning('暂时无法执行该操作');
                return;
            }
            this.allowedFunctionsId = 36;

            if (this.$tools.hasBizAuth('to_payment')) {
                this.orderDetailList(item, val);
                this.orderlistDetail = item;
                this.orderlistDetail.allowedFunctionsId = this.allowedFunctionsId;
            } else {
                this.$message.error('没有付款操作权限');
            }
        },
        // 采购交割
        purchaseDelivery (item, val, jur, valids) {
            if (valids.valid !== 1) {
                this.$message.warning('暂时无法执行该操作');
                return;
            }
            this.allowedFunctionsId = 37;

            if (this.$tools.hasBizAuth('to_buy_dlvy')) {
                this.orderDetailList(item, val);
                this.orderlistDetail = item;
                this.orderlistDetail.allowedFunctionsId = this.allowedFunctionsId;
            } else {
                this.$message.error('没有采购交割操作权限');
            }
        },
        // 收票
        collectTickets (item, val, jur, valids) {
            if (this.$refs.invoiceClick) {
                this.$refs.invoiceClick.initUploadFileData();
            }
            if (valids.valid !== 1) {
                this.$message.warning('暂时无法执行该操作');
                return;
            }
            this.allowedFunctionsId = 38;

            if (this.$tools.hasBizAuth('to_receipt_invoice')) {
                this.orderDetailList(item, val);
                this.orderlistDetail = item;
                this.orderlistDetail.allowedFunctionsId = this.allowedFunctionsId;
            } else {
                this.$message.error('没有收票操作权限');
            }
        },
        // 收款
        receivables (item, val, jur, valids) {
            if (valids.valid !== 1) {
                this.$message.warning('暂时无法执行该操作');
                return;
            }
            this.allowedFunctionsId = 34;

            if (this.$tools.hasBizAuth('to_collection')) {
                this.orderDetailList(item, val);
                this.orderlistDetail = item;
                this.orderlistDetail.allowedFunctionsId = this.allowedFunctionsId;
            } else {
                this.$message.error('没有收款操作权限');
            }
        },
        // 销售交割
        salesDelivery (item, val, jur, valids) {
            if (valids.valid !== 1) {
                this.$message.warning('暂时无法执行该操作');
                return;
            }
            this.allowedFunctionsId = 35;

            if (this.$tools.hasBizAuth('to_sale_dlvy')) {
                this.orderDetailList(item, val);
                this.orderlistDetail = item;
                this.orderlistDetail.allowedFunctionsId = this.allowedFunctionsId;
            } else {
                this.$message.error('没有销售交割操作权限');
            }
        },
        // 开票
        ticketOpening (item, val, jur, valids) {
            if (valids.valid !== 1) {
                this.$message.warning('暂时无法执行该操作');
                return;
            }
            this.allowedFunctionsId = 39;

            if (this.$tools.hasBizAuth('to_make_invoice')) {
                this.orderDetailList(item, val);
                this.orderlistDetail = item;
                this.orderlistDetail.allowedFunctionsId = this.allowedFunctionsId;
            } else {
                this.$message.error('没有开票操作权限');
            }
        },
        // 采购结算
        purchaseSettle (OrderId, item) {
            if (item.approveStatus === 12) {
                this.$message.warning('该合同锁定中，请在修改合同要素完成后再操作');
                return;
            }
            if (item.buySettleStatus === 2) {
                this.$message.warning('暂时无法执行该操作');
                return;
            }
            this.$refs.settleClick.initPurchaseView(OrderId, item);
        },
        // 销售结算
        salesSettle (OrderId, item) {
            if (item.approveStatus === 12) {
                this.$message.warning('该合同锁定中，请在修改合同要素完成后再操作');
                return;
            }
            if (item.saleSettleStatus === 2) {
                this.$message.warning('暂时无法执行该操作');
                return;
            }
            this.$refs.settleClick.initSaleView(OrderId, item);
        },
        getAllPageStatusCount (idx) {
            this.$http.get(this.$api.order.allPageStatusCount + '?countType=' + idx)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.getAllPageStatusCountObj = res.data.data;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
    .orderList{
        .search-wrapper {
            padding: 50px 0 20px 0;
            position: relative;
            .search-form {
                width: 95%;
            }
            .searchDate {
                display: flex;
                position: relative;
                .d {
                    flex: 1;
                }
                .c {
                    flex: 0 0 30px;
                    text-align: center;
                }
            }
            .search-btn {
                position: absolute;
                cursor: pointer;
                right: 30px;
                top: 20px;
                color: $color-minor;
            }
            .searchicon {
                position: absolute;
                right: 15px;
                bottom: 15px;
                line-height: 1;
            }
        }
        .bgc{
            background-color: $color-white;
            font-size: $small-font;
            border-radius: $border-radius-base;
            line-height: 12px;
            padding: 2px;
            cursor: pointer;
        }
        // 未执行
        .notComplete{
            color: $color-input-focus;
            border-color: $color-input-focus;
            border: 1px solid $color-input-focus;
        }
        // 执行中
        .inTheExecution{
            color: $color-warning;
            border-color: $color-warning;
            border: 1px solid $color-warning;
        }
        // 执行完成
        .complete{
            color: $color-extraerp;
            border-color: $color-extraerp;
            border: 1px solid $color-extraerp;
        }
        // 未开始-不可操作
        .notOperable{
            color: $color-minor;
            border-color: $color-minor;
            border: 1px solid $color-minor;
        }
        .orderIdStayle {
            color: $color-input-focus;
       }
        .gy-table tbody tr td{
            width: 250px;
        }
        .gy-table thead tr th{
            width: 250px;
        }
        /deep/ .el-table .cell{
            white-space:pre-line;
        }
        .gy-form-group{
            padding: 8px 30px 8px 109px;
        }
    }
</style>
<style lang="scss">
    .orderList{
        .dh-over .cell span {
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap
        }
        .gy-table{
            margin: 0 16px 0 16px;
            border-top: none;
            width: auto;
            .el-table__header{
                .cell{
                    font-size: 12px;
                    font-weight: bold;
                    color: #666;
                }
            }
            .el-table__body{
                .cell{
                    font-size: 12px;
                    color: #666;
                }
            }
            .el-table_1_column_11{
                padding: 10px 0 10px 10px;
            }
            .el-table__fixed-header-wrapper{
                .el-table__header{
                    .el-table_1_column_11{
                        text-align: center;
                    }
                }
            }
            .item-left-align {
                padding-left: 30px;
                text-align: left;
            }
            .Total{
                thead {
                    td{
                        font-size: 14px;
                        font-weight: 100!important;
                    }
                }
            }
        }
    }
</style>
