<template>
    <div class="orderList">
        <div class="search-wrapper">
            <div class="search-form clearfix">
                <div class="gy-form-group">
                    <span class="l">产品名称</span>
                    <input type="text" placeholder="请输入" v-model="orders.prodName">
                </div>
                <div class="gy-form-group">
                    <span class="l">业务操作人</span>
                    <input type="text" placeholder="请输入" v-model="orders.businessManagerName">
                </div>
                <div class="gy-form-group">
                    <span class="l">上游公司</span>
                    <input type="text" placeholder="请输入" v-model="orders.sellerCompanyName">
                </div>
                <div class="gy-form-group">
                    <span class="l">下游公司</span>
                    <input type="text" placeholder="请输入" v-model="orders.buyerCompanyName">
                </div>
                <div class="gy-form-group">
                    <span class="l">合同编号</span>
                    <input type="text" placeholder=" 请输入采购/销售合同编号" v-model="orders.contractCode">
                    <span v-if="!isShowSearch" class="searchicon" @click="search()"><i class="iconfont icon-search"></i></span>
                </div>
                <template v-if="isShowSearch">
                    <div class="gy-form-group">
                        <span class="l">业务类型</span>
                        <el-select v-model="orders.bizType" placeholder="请选择">
                            <el-option
                                    v-for="item in payStatus"
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
                        v-bind:label="'ID\n产品名称'"
                        width="110">
                    <template slot-scope="scope">
                        <span @click="orderClickDetail(scope.row)" style="color: #4A90E2;cursor: pointer">{{scope.row.id}}</span><br/>
                        <span @click="orderClickDetail(scope.row)" style="color: #4A90E2;cursor: pointer;">{{scope.row.prodName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        v-bind:label="'上游公司\n下游公司'"
                        width="240">
                    <template slot-scope="scope">
                        <span>{{scope.row.sellerCompanyName}}</span><br>
                        <span>{{scope.row.buyerCompanyName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="180">
                    <template slot-scope="scope">
                        <span v-if="scope.row.sellerInfo !== null && scope.row.sellerInfo.operateDetailModel.orderExecuteSubStatusModel !== null">{{scope.row.sellerInfo.operateDetailModel.orderExecuteSubStatusModel.sellerMessage}}</span><br>
                        <span v-if="scope.row.buyerInfo !== null && scope.row.buyerInfo.operateDetailModel.orderExecuteSubStatusModel !== null">{{scope.row.buyerInfo.operateDetailModel.orderExecuteSubStatusModel.buyerMessage}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        v-bind:label="'采购交割日期\n销售交割日期'"
                        width="220">
                    <template slot-scope="scope">
                        <span>{{scope.row.planBuyDlvyDate}}</span><br>
                        <span>{{scope.row.planSaleDlvyDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="总金额(元)"
                        width="140">
                    <template slot-scope="scope">
                        <span v-if="scope.row.buyTotal">{{scope.row.buyTotal | numToCash}}</span><br>
                        <span v-if="scope.row.saleTotal">{{scope.row.saleTotal | numToCash}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="数量(吨)"
                        width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.saleSkuQuantity}}</span><br>
                        <span>{{scope.row.buySkuQuantity}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="交叉交割"
                        width="90">
                    <template slot-scope="scope">
                        <!--<span v-if="scope.row.buyCrossDeliveryFlag === 0" style="display: inline-block;"><i class="el-icon-circle-check-outline" style="color: #4C97FC;position: absolute;top: 27px;"></i></span><br>-->
                        <!--<span v-if="scope.row.buyCrossDeliveryFlag === 1" style="display: inline-block;"><i class="el-icon-remove-outline" style="color:#D9D9D9;position: absolute;top: 27px;height: 30px;width: 30px;"></i></span><br>-->
                        <span v-if="scope.row.saleCrossDeliveryFlag === 1" style="display: inline-block;"><i
                                class="el-icon-success" style="color: #4C97FC;position: absolute;top: 37px;"></i></span>
                        <span v-if="scope.row.saleCrossDeliveryFlag === 0" style="display: inline-block;"><i
                                class="el-icon-remove-outline" style="color:#D9D9D9;position: absolute;top: 37px;"></i></span>
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
                        <span>{{scope.row.phsContractCode}}</span><br>
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
                <el-table-column fixed="right" label="操作" width="215">
                    <template slot-scope="scope">
                        <div style="display: inline-block;width: 100%" v-if="scope.row.sellerInfo !== null && scope.row.sellerInfo.operateDetailModel.orderExecuteSubStatusModel !== null">
                            <span v-for="(itemSales,index) in scope.row.sellerInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList"
                                  :key="index" style="display: inline-block;margin-left: 3px;">
                                <button class="bgc" style="width: 55px"
                                        :class="{notComplete:itemSales.valid === 1,notOperable: itemSales.valid === 0}"
                                        v-if="itemSales.statueSeller !== null"
                                        @click="salesClick(itemSales.id, itemSales, scope.row)">{{itemSales.button}}
                                </button>
                            </span>
                        </div>
                        <div style="display: inline-block;width: 100%" v-if="scope.row.buyerInfo !== null && scope.row.buyerInfo.operateDetailModel.orderExecuteSubStatusModel !== null">
                            <span v-for="(itemPurse,index) in scope.row.buyerInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList"
                                  :key="index" style="display: inline-block;margin-left: 3px;">
                                <button class="bgc" style="width: 55px"
                                        :class="{notComplete:itemPurse.valid === 1,notOperable: itemPurse.valid === 0}"
                                        @click="purchaseClick(itemPurse.id, itemPurse, scope.row)">{{itemPurse.button}}
                                </button>
                            </span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <table class="gy-table">
                <thead>
                    <tr>
                        <td> <el-radio v-model="radio" label="1" @change="getAllPageStatusCount">今日新增</el-radio></td>
                        <td>采购成交数量(吨)   {{getAllPageStatusCountObj.approvaledBuySkuQuantity}}</td>
                        <td>采购合同数量(吨)   {{getAllPageStatusCountObj.sealBuySkuQuantity}}</td>
                        <td>采购交割数量(吨)   {{getAllPageStatusCountObj.approvaledBuyDeliveryQuantityCount}}</td>
                        <td>付款金额(元)   {{getAllPageStatusCountObj.approvaledBuyPayTotalAll}}</td>
                        <td>库存量(吨)   {{getAllPageStatusCountObj.inventorySkuQuantity}}</td>
                    </tr>
                    <tr>
                        <td> <el-radio v-model="radio" label="2" @change="getAllPageStatusCount">本月累计</el-radio></td>
                        <td>销售成交数量(吨)   {{getAllPageStatusCountObj.approvaledSellSkuQuantity}}</td>
                        <td>销售合同数量(吨)   {{getAllPageStatusCountObj.sealSellSkuQuantity}}</td>
                        <td>销售交割(吨)   {{getAllPageStatusCountObj.approvaledSellDeliveryQuantityCount}}</td>
                        <td>收款金额(元)   {{getAllPageStatusCountObj.approvaledSellPayTotalAll}}</td>
                    </tr>
                </thead>
            </table>
        </div>
        <gy-payment :order-data="orderBoolObj"
                    :order-message="collectTicketsOpingList" :order-messagies="orderSaleMessage"
                    :order-ids="orderlistDetail" :order-sale="orderSaleMessage" :order-purchase="orderPurchaseMessage"
                    :initial-data="InitializationDataList" :new-bank="newPaymentBankList" @ivoiceList="getOrderlist" ref="paymentClick"></gy-payment>
        <gy-delivery v-if="orderBoolObj.newSaledialog || orderBoolObj.purchaseDeliverydialog" :order-data="orderBoolObj"
                     :order-message="salesDeliveryList" :order-ids="orderlistDetail" :order-sale="orderSaleMessage"
                     :order-purchase="orderPurchaseMessage" @ivoiceList="getOrderlist"></gy-delivery>
        <gy-invoice v-if="orderBoolObj.collectTicketsdialog || orderBoolObj.dialogVisibles" :order-data="orderBoolObj" :order-message="orderCreatMessage" :order-ids="orderlistDetail"
                    :invoice-sale="invoiceOrderSaleMessage" :invoice-purchase="invoiceOrderPurchaseMessage"
                    :initial-data="InitializationDataList" :commod-code="commodityTaxCodeList"
                    :invoice-collection="invoiceDeliveryCollection" @ivoiceList="getOrderlist"></gy-invoice>
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
export default {
    components: {
        gyPayment,
        gyDelivery,
        gyInvoice
    },
    data () {
        return {
            payStatus: [
                {
                    name: '全部',
                    status: 0,
                    id: 0
                },
                {
                    name: '高频交易',
                    status: 1,
                    id: 1
                }
            ],
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
                newReceiptsdialog: false // 新建收款
            },
            orderCreatMessage: {}, // 显示对象
            salesDeliveryList: {}, // 交割基本信息
            collectTicketsOpingList: {},
            paymentDetailList: {}, // 付款初始化信息
            orderlistDetail: {}, // 点击每行的基本信息,
            orderSaleMessage: {}, // 销售基本信息
            orderPurchaseMessage: {}, // 采购基本信息
            invoiceOrderSaleMessage: {}, // 销售发票
            invoiceOrderPurchaseMessage: {}, // 采购发票
            InitializationDataList: {}, // 发票初始化数据
            invoiceTotalAmount: null,
            commodityTaxCodeList: [], // 商品税务编码
            newPaymentBankList: [], // 新增收款银行
            invoiceDeliveryCollection: {}, // 收票凭证
            // paymentApplicationAmountObj: {}, // 付款申请金额
            allowedFunctionsId: 0, // 审批ID
            radio: '1',
            getAllPageStatusCountObj: {} // 统计接收对象
        };
    },
    created () {
        this.getOrderlist();
        this.getAllPageStatusCount();
    },
    methods: {
        // 采购列表按钮
        purchaseClick (ids, data, item) {
            // 付款 - 采购交割 - 收票
            if (ids === 34) {
                this.receivables(item, 4, 103, data);
            } else if (ids === 35) {
                this.salesDelivery(item, 5, 101, data);
            } else if (ids === 39) {
                this.ticketOpening(item, 6, 104, data);
            }
        },
        // 销售列表按钮
        salesClick (ids, data, item) {
            // 收款 - 销售交割 - 开票
            if (ids === 36) {
                this.payment(item, 1, 102, data);
            } else if (ids === 37) {
                this.purchaseDelivery(item, 2, 100, data);
            } else if (ids === 38) {
                this.collectTickets(item, 3, 105, data);
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
                    for (let j = 0; j < res.data.data.rows.length; j++) {
                        // 销售 - 上游
                        if (res.data.data.rows[j].sellerInfo !== null &&
                            res.data.data.rows[j].sellerInfo.operateDetailModel.orderExecuteSubStatusModel !== null &&
                            res.data.data.rows[j].sellerInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList !== null) {
                            for (let i = 0; i < res.data.data.rows[j].sellerInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList.length; i++) {
                                // 收款
                                if (res.data.data.rows[j].sellerInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].id === 34) {
                                    res.data.data.rows[j].sellerInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].statueSeller = res.data.data.rows[j].collectionStatus;
                                }
                                // 销售交割
                                if (res.data.data.rows[j].sellerInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].id === 35) {
                                    res.data.data.rows[j].sellerInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].statueSeller = res.data.data.rows[j].saleDlvyStatus;
                                }
                                // 开票
                                if (res.data.data.rows[j].sellerInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].id === 39) {
                                    res.data.data.rows[j].sellerInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].statueSeller = res.data.data.rows[j].saleReceiptStatus;
                                }
                            }
                        }
                        // 采购 - 下游
                        if (res.data.data.rows[j].buyerInfo !== null &&
                            res.data.data.rows[j].buyerInfo.operateDetailModel.orderExecuteSubStatusModel !== null &&
                            res.data.data.rows[j].buyerInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList !== null) {
                            for (let i = 0; i < res.data.data.rows[j].buyerInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList.length; i++) {
                                // 付款
                                if (res.data.data.rows[j].buyerInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].id === 36) {
                                    res.data.data.rows[j].buyerInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].statueBuyer = res.data.data.rows[j].paymentStatus;
                                }
                                // 采购交割
                                if (res.data.data.rows[j].buyerInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].id === 37) {
                                    res.data.data.rows[j].buyerInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].statueBuyer = res.data.data.rows[j].buyDlvyStatus;
                                }
                                // 收票
                                if (res.data.data.rows[j].buyerInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].id === 38) {
                                    res.data.data.rows[j].buyerInfo.operateDetailModel.orderExecuteSubStatusModel.allowedFunctionsModelList[i].statueBuyer = res.data.data.rows[j].buyReceiptStatus;
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
                        that.orderCreatMessage = res.data.data;
                        that.orderSaleMessage = res.data.data.sellerInfo;
                        that.orderPurchaseMessage = res.data.data.buyerInfo;
                        that.invoiceOrderSaleMessage = res.data.data.sellerInfo; // 销售发票
                        that.invoiceOrderPurchaseMessage = res.data.data.buyerInfo; // 采购发票
                        // 付款
                        if (val === 1) {
                            that.orderBoolObj.dialogVisible = true;
                            that.orderBoolObj.purchaseDeliverydialog = false;
                            that.orderBoolObj.collectTicketsdialog = false;
                            that.orderBoolObj.newReceiptsdialog = false;
                            that.orderBoolObj.newSaledialog = false;
                            that.orderBoolObj.dialogVisibles = false;
                            that.InitializationData(item);
                            that.newPaymentBank(item);
                            // that.getpaymentApplicationAmount(item);
                        }
                        // 采购交割
                        if (val === 2) {
                            that.orderBoolObj.dialogVisible = false;
                            that.orderBoolObj.purchaseDeliverydialog = true;
                            that.orderBoolObj.collectTicketsdialog = false;
                            that.orderBoolObj.newReceiptsdialog = false;
                            that.orderBoolObj.newSaledialog = false;
                            that.orderBoolObj.dialogVisibles = false;
                        }
                        // 收票
                        if (val === 3) {
                            that.orderBoolObj.dialogVisible = false;
                            that.orderBoolObj.purchaseDeliverydialog = false;
                            that.orderBoolObj.collectTicketsdialog = true;
                            that.orderBoolObj.newReceiptsdialog = false;
                            that.orderBoolObj.newSaledialog = false;
                            that.orderBoolObj.dialogVisibles = false;
                            that.invoiceTotalAmount = that.invoiceOrderSaleMessage.skuQuantity * that.invoiceOrderSaleMessage.skuPrice;
                            that.invoiceOrderSaleMessage.invoiceTotalAmount = that.invoiceTotalAmount;
                        }
                        // 收款
                        if (val === 4) {
                            that.orderBoolObj.dialogVisible = false;
                            that.orderBoolObj.purchaseDeliverydialog = false;
                            that.orderBoolObj.collectTicketsdialog = false;
                            that.orderBoolObj.newReceiptsdialog = true;
                            that.orderBoolObj.newSaledialog = false;
                            that.orderBoolObj.dialogVisibles = false;
                        }
                        // 销售交割
                        if (val === 5) {
                            that.orderBoolObj.dialogVisible = false;
                            that.orderBoolObj.purchaseDeliverydialog = false;
                            that.orderBoolObj.collectTicketsdialog = false;
                            that.orderBoolObj.newReceiptsdialog = false;
                            that.orderBoolObj.newSaledialog = true;
                            that.orderBoolObj.dialogVisibles = false;
                        }
                        // 开票
                        if (val === 6) {
                            that.orderBoolObj.dialogVisible = false;
                            that.orderBoolObj.purchaseDeliverydialog = false;
                            that.orderBoolObj.collectTicketsdialog = false;
                            that.orderBoolObj.newReceiptsdialog = false;
                            that.orderBoolObj.newSaledialog = false;
                            that.orderBoolObj.dialogVisibles = true;
                            that.InitializationData(item);
                            that.commodityTaxCode(item);
                            that.getInvoiceDeliveryCollection(item.saleOrderId, item.purchaseOrderId);
                        }
                    } else {
                        that.$message({
                            message: res.data.message,
                            type: 'error'
                        });
                    }
                });
        },
        // 新增付款银行
        newPaymentBank (item) {
            this.$http.post(this.$api.payment.newBank, {'companyId': item.sellerCompanyId}).then((res) => {
                if (res.data.code === 0) {
                    this.newPaymentBankList = res.data.data;
                }
            });
        },
        // 商品税务编码
        commodityTaxCode (item) {
            this.$http.post(this.$api.invoice.commodityCode, {'productId': item.productId}).then((res) => {
                if (res.data.code === 0) {
                    this.commodityTaxCodeList = res.data.data;
                }
            });
        },
        // 获取页面带取数据
        InitializationData (item) {
            this.$http.get(this.$api.invoice.pageBringInData + item.saleOrderId).then((res) => {
                if (res.data.code === 0) {
                    this.InitializationDataList = res.data.data;
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
            this.orders.endCreatedDate = this.orders.endCreatedDate + 86399000;
            this.getOrderlist();
        },
        // 分页
        handleCurrentChange (r) {
            this.orders.pageNo = r;
            this.getOrderlist();
        },
        showDetail (id) {
            this.$router.push({
                name: 'paymentDetail'
            });
        },
        // 付款
        payment (item, val, jur, valids) {
            this.$refs.paymentClick.getpaymentApplicationAmount(item.purchaseOrderId);
            if (valids.valid !== 1) {
                this.$message({
                    message: '暂时无法执行该操作',
                    type: 'warning'
                });
                return;
            }
            this.allowedFunctionsId = 36;
            this.$http.post(this.$api.apprProc.hasBizPermission, {targetType: jur}).then((res) => {
                if (res.data.code !== 0) {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                } else {
                    this.orderDetailList(item, val);
                    this.orderlistDetail = item;
                    this.orderlistDetail.allowedFunctionsId = this.allowedFunctionsId;
                    // console.log(this.orderlistDetail);
                    // this.orderlistDetail.payTotal = this.orderlistDetail.buyTotal - this.paymentApplicationAmountObj.;
                }
            });
        },
        // 采购交割
        purchaseDelivery (item, val, jur, valids) {
            if (valids.valid !== 1) {
                this.$message({
                    message: '暂时无法执行该操作',
                    type: 'warning'
                });
                return;
            }
            this.allowedFunctionsId = 37;
            this.$http.post(this.$api.apprProc.hasBizPermission, {targetType: jur}).then((res) => {
                if (res.data.code !== 0) {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                } else {
                    this.orderDetailList(item, val);
                    this.salesDeliveryDetail(item.purchaseOrderId);
                    this.orderlistDetail = item;
                    this.orderlistDetail.allowedFunctionsId = this.allowedFunctionsId;
                }
            });
        },
        // 收票
        collectTickets (item, val, jur, valids) {
            if (valids.valid !== 1) {
                this.$message({
                    message: '暂时无法执行该操作',
                    type: 'warning'
                });
                return;
            }
            this.allowedFunctionsId = 38;
            this.$http.post(this.$api.apprProc.hasBizPermission, {targetType: jur}).then((res) => {
                if (res.data.code !== 0) {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                } else {
                    console.log(item);
                    console.log(val);
                    this.orderDetailList(item, val);
                    this.orderlistDetail = item;
                    this.orderlistDetail.allowedFunctionsId = this.allowedFunctionsId;
                }
            });
        },
        // 收款
        receivables (item, val, jur, valids) {
            console.log(item);
            this.$refs.paymentClick.getreceliveApplicationAmount(item.saleOrderId);
            if (valids.valid !== 1) {
                this.$message({
                    message: '暂时无法执行该操作',
                    type: 'warning'
                });
                return;
            }
            this.allowedFunctionsId = 34;
            this.$http.post(this.$api.apprProc.hasBizPermission, {targetType: jur}).then((res) => {
                if (res.data.code !== 0) {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                } else {
                    this.orderDetailList(item, val);
                    this.collectTicketsOping(item.saleOrderId);
                    this.orderlistDetail = item;
                    this.orderlistDetail.allowedFunctionsId = this.allowedFunctionsId;
                }
            });
        },
        // 销售交割
        salesDelivery (item, val, jur, valids) {
            if (valids.valid !== 1) {
                this.$message({
                    message: '暂时无法执行该操作',
                    type: 'warning'
                });
                return;
            }
            this.allowedFunctionsId = 35;
            this.$http.post(this.$api.apprProc.hasBizPermission, {targetType: jur}).then((res) => {
                if (res.data.code !== 0) {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                } else {
                    this.orderDetailList(item, val);
                    this.salesDeliveryDetail(item.saleOrderId);
                    this.orderlistDetail = item;
                    this.orderlistDetail.allowedFunctionsId = this.allowedFunctionsId;
                }
            });
        },
        // 开票
        ticketOpening (item, val, jur, valids) {
            if (valids.valid !== 1) {
                this.$message({
                    message: '暂时无法执行该操作',
                    type: 'warning'
                });
                return;
            }
            this.allowedFunctionsId = 39;
            this.$http.post(this.$api.apprProc.hasBizPermission, {targetType: jur}).then((res) => {
                if (res.data.code !== 0) {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                } else {
                    this.orderDetailList(item, val);
                    this.orderlistDetail = item;
                    this.orderlistDetail.allowedFunctionsId = this.allowedFunctionsId;
                }
            });
        },
        // 新增采购-销售交割页面详情
        salesDeliveryDetail (val) {
            this.$http.get(this.$api.delivery.createDeliveryView + '/' + val).then((res) => {
                if (res.data.code === 0) {
                    this.salesDeliveryList = res.data.data;
                    this.salesDeliveryList.surplusQuantitys = this.salesDeliveryList.surplusQuantity;
                }
            });
        },
        // 新建收款详情页面
        collectTicketsOping (val) {
            this.$http.get(this.$api.invoice.createCollectView + '/' + val).then((res) => {
                if (res.data.code === 0) {
                    this.collectTicketsOpingList = res.data.data;
                    console.log(this.collectTicketsOpingList);
                    this.collectTicketsOpingList.collectionAmount = this.collectTicketsOpingList.needCollectionAmount;
                }
            });
        },
        // 获取收票交割凭证和收款凭证
        getInvoiceDeliveryCollection (saleOrderId, purchaseOrderId) {
            this.$http.post(this.$api.invoice.getInvoiceDeliveryCollection, {'salesOrderId': saleOrderId, 'purchaseOrderId': purchaseOrderId})
                .then((res) => {
                    if (res.data.code === 0) {
                        this.invoiceDeliveryCollection = res.data.data;
                    }
                });
        },
        getAllPageStatusCount () {
            let countType = this.radio;
            this.$http.get(this.$api.order.allPageStatusCount + '?countType=' + countType).then((res) => {
                if (res.data.code === 0) {
                    this.getAllPageStatusCountObj = res.data.data;
                }
            });
        }
        // 付款申请金额---
        // getpaymentApplicationAmount (val) {
        //     this.$http.get(this.$api.payment.paymentApplicationAmount + '/' + val.purchaseOrderId).then((res) => {
        //         if (res.data.code === 0) {
        //             this.paymentApplicationAmountObj = res.data.data;
        //             if (this.paymentApplicationAmountObj.depositStatus === 1) {
        //                 this.paymentApplicationAmountObj.payTotal = this.invoiceOrderSaleMessage.depositAmount;
        //                 this.paymentApplicationAmountObj.payMethod = '2';
        //             } else if (this.paymentApplicationAmountObj.appendDepositStatus === 1) {
        //                 this.paymentApplicationAmountObj.payMethod = '5';
        //                 this.paymentApplicationAmountObj.payTotal = this.paymentApplicationAmountObj.leftAmount;
        //             } else if (this.paymentApplicationAmountObj.goodPaymentStatus === 1) {
        //                 this.paymentApplicationAmountObj.payMethod = '1';
        //                 this.paymentApplicationAmountObj.payTotal = this.paymentApplicationAmountObj.leftAmount;
        //             }
        //         }
        //     });
        // }
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
        .gy-form-group .l{
            width: 75px;
        }
    }
</style>
<style lang="scss">
    .orderList{
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
        }
    }
</style>
