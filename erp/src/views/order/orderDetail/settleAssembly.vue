<template>
    <div class="createSettle">
        <el-dialog width="1032px" class="order-dialog"
                    :close-on-click-modal = "false"
                    :title = "saleOrBuy"
                   :visible.sync="orderBoolObj.purchasedialog">
            <div class="gy-table-box">
                <div class="title">结算明细</div>
                <table class="gy-table" style="width: 1000px;">
                    <thead>
                        <th style="width: 120px;">类别</th>
                        <th style="width: 220px;">数量(吨)</th>
                        <th style="width: 220px;">单价(元/吨)</th>
                        <th style="width: 220px;">金额(元)</th>
                        <th style="width: 220px;">已交货(吨)</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>合同信息</td>
                            <td class="align-r" style="padding-right: 50px">{{settlelistDetail.skuQuantity | numToQuantity}}</td>
                            <td class="align-r" style="padding-right: 50px">
                                <span v-if="settlelistDetail.skuPriceType === 21 || settlelistDetail.skuPriceType === 22">公式计价</span>
                                <span v-else>{{settlelistDetail.skuPrice | numToCash(true)}}</span>
                            </td>
                            <td class="align-r" style="padding-right: 50px">
                                <span v-if="settlelistDetail.skuPriceType === 21 || settlelistDetail.skuPriceType === 22">公式计价</span>
                                <span v-else>{{settlelistDetail.skuTotalAmount | numToCash}}</span>
                            </td>
                            <td class="align-r" style="padding-right: 50px">{{settlementOrder.alreadyDeliveryQuantity || "--"}}</td>
                        </tr>
                        <tr>
                            <td>合同结算</td>
                            <td class="align-r">
                                <input v-if="settlementOrder.settleStatus == 0" type="text" style="padding-right: 40px" class="gy-input align-r" v-model="addForm.settlementQuantity" @input="handleInput" placeholder="请输入数量">
                                <span style="padding-right: 40px" v-if="settlementOrder.settleStatus != 0">{{settlementOrder.settlementQuantity | numToCash}}</span>
                            </td>
                            <td class="align-r">
                                <input v-if="settlementOrder.settleStatus == 0" type="text" style="padding-right: 40px" class="gy-input align-r" v-model="addForm.settlementPrice" disabled>
                                <span style="padding-right: 40px" v-if="settlementOrder.settleStatus != 0">{{settlementOrder.settlementPrice | numToCash}}</span>
                            </td>
                            <td class="align-r">
                                <input v-if="settlementOrder.settleStatus == 0" type="text" style="padding-right: 40px" class="gy-input align-r" v-model="addForm.settlementAmount" @input="handleInput1" placeholder="请输入金额">
                                <span style="padding-right: 40px" v-if="settlementOrder.settleStatus != 0">{{settlementOrder.settlementAmount | numToCash}}</span>
                            </td>
                            <td class="align-r" style="padding-right: 50px">
                                --
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="title">{{settleText}}明细</div>
                <!-- 付款明细 -->
                <table class="gy-table" style="width: 1000px;" v-if="settleText == '付款'">
                    <thead>
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
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in paymentList" :key="index">
                            <td>{{item.id}}</td>
                            <td>{{item.payTime | date}}</td>
                            <td>
                                <el-tooltip poper-class="test" :content="item.buyerDepositBank" :disabled="(item.buyerDepositBank && item.buyerDepositBank.replace(/[^x00-xff]/g, 'aa').length > 16)? false : true" placement="bottom">
                                    <div class="wid-overflow" style="width:100px;cursor: pointer;">
                                        {{item.buyerDepositBank}}
                                    </div>
                                </el-tooltip>
                            </td>
                            <td>{{item.tradeMode | tradeMode}}</td>
                            <td>{{item.creatorName}}</td>
                            <td>{{item.createdDate | date}}</td>
                            <td class="align-r" v-if="settlelistDetail.skuPriceType === 21 || settlelistDetail.skuPriceType === 22">
                                <span v-if="item.payMethod ==2">--</span>
                                <span v-else>{{item.tempPrice | numToCash(true)}}</span>
                            </td>
                            <td class="align-r" v-else>{{settlelistDetail.skuPrice | numToCash(true)}}</td>
                            <td class="align-r" v-if="settlelistDetail.skuPriceType === 21 || settlelistDetail.skuPriceType === 22">
                                <span v-if="item.payMethod ==2">--</span>
                                <span v-else>{{item.applyQuantities | numToQuantity}}</span>
                            </td>
                            <td class="align-r" v-else>--</td>
                            <td>{{item.approveStatus | paymentBillStatus(item)}}</td>
                            <td class="align-r">{{item.payTotal | numToCash}}</td>
                        </tr>
                        <tr v-if="paymentList === null || paymentList.length==0">
                            <td style="text-align: center;" colspan="9">暂无付款</td>
                        </tr>
                        <tr>
                            <td colspan="2">实际付款总计</td>
                            <td class="align-r" colspan="8">
                                <span class="red">{{settlementOrder.hadPayAmount | numToCash}}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- 收款明细 -->
                <table class="gy-table" style="width: 1000px;" v-if="settleText == '收款'">
                    <thead>
                        <th>收款单号</th>
                        <th>入账日期</th>
                        <th>经办人</th>
                        <th>操作时间</th>
                        <th>单价(元/吨)</th>
                        <th>收款数量(吨)</th>
                        <th>状态</th>
                        <th>收款金额(元)</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in collectionList" :key="index">
                            <td>{{item.id}}</td>
                            <td>{{item.confirmDate | date}}</td>
                            <td>{{item.creatorName}}</td>
                            <td>{{item.createdDate | date}}</td>
                            <td class="align-r" v-if="settlelistDetail.skuPriceType === 21 || settlelistDetail.skuPriceType === 22">
                                <span v-if="item.payMethod ==2">--</span>
                                <span v-else>{{item.tempPrice | numToCash(true)}}</span>
                            </td>
                            <td class="align-r" v-else>{{settlelistDetail.skuPrice | numToCash(true)}}</td>
                            <td class="align-r" v-if="settlelistDetail.skuPriceType === 21 || settlelistDetail.skuPriceType === 22">
                                <span v-if="item.payMethod ==2">--</span>
                                <span v-else>{{item.applyQuantities | numToQuantity}}</span>
                            </td>
                            <td class="align-r" v-else>--</td>
                            <td>{{item.collectionStatus | collectionBillStatus()}}</td>
                            <td class="align-r">{{item.payTotal| numToCash}}</td>
                        </tr>
                        <tr v-if="collectionList === null || collectionList.length==0">
                            <td style="text-align: center;" colspan="7">暂无收款</td>
                        </tr>
                        <tr>
                            <td colspan="2">实际收款总计</td>
                            <td class="align-r" colspan="6">
                                <span class="red">{{settlementOrder.hadPayAmount | numToCash}}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="title">其它费用
                    <i
                    v-if="settlementOrder.settleStatus == 0"
                    @click="addEnumerated"
                    class="el-icon-circle-plus add_contact fl"
                    ></i>
                </div>
                <div v-if="settlementOrder.settleStatus == 0">
                    <div class="clearfix" v-for="(item, index) in addForm.orderSettleChargesList" :key="index">
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>费用名称</span>
                            <input type="text" class="gy-input" v-model="item.costItem" placeholder="请输入费用名称">
                        </div>
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>费用金额(元)</span>
                            <input type="text" class="gy-input" @input="charge($event, item)"  v-model="item.costCharge" placeholder="请输入费用金额">
                        </div>
                        <div class="gy-form-group" style="width: 37%;">
                            <span class="l"><strong>*</strong>费用承担方</span>
                            <el-select @change="assumecost(item)" v-model="item.bearer" placeholder="请选择" value-key="bearerName">
                                <el-option
                                        v-for="(item, index) in payerData"
                                        :key="index"
                                        :label="item.bearerName"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </div>
                        <i
                            @click="delEnumerated(index)"
                            class="el-icon-remove delete_bank"
                            ></i>
                        <!-- <i
                            @click="addEnumerated"
                            v-if="addForm.orderSettleChargesList.length == index+1"
                            class="el-icon-circle-plus add_contact"
                            ></i> -->
                    </div>
                </div>
                <div v-if="settlementOrder.settleStatus != 0">
                    <div class="clearfix" v-for="(item, index) in settleChargesList" :key="index">
                        <div class="gy-form-group">
                            <span class="l">费用名称</span>
                            <span>{{item.costItem}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">费用金额(元)</span>
                            <span>{{item.costCharge}}</span>
                        </div>
                        <div class="gy-form-group" style="width: 37%;">
                            <span class="l">费用承担方</span>
                            <span>{{item.bearerName}}</span>
                        </div>
                    </div>
                </div>
                <div class="title">备注</div>
                <div>
                    <input v-if="settlementOrder.settleStatus == 0" type="text" style="width:50%; margin-left: 30px;" v-model="addForm.remark" placeholder="请输入">
                    <span v-if="settlementOrder.settleStatus != 0" style="width:50%; margin-left: 30px;">{{settlementOrder.remark || '--'}}</span>
                </div>
                <div class="total-detail cl">
                    <dl>
                        <dt>合同总金额(元)</dt>
                        <dd v-if="settlelistDetail.skuPriceType === 21 || settlelistDetail.skuPriceType === 22">公式计价</dd>
                        <dd v-else>{{settlelistDetail.skuTotalAmount | numToCash}}</dd>
                    </dl>
                    <dl>
                        <dt>已{{settleText}}总金额(元)</dt>
                        <dd>{{settlementOrder.hadPayAmount | numToCash}}</dd>
                    </dl>
                    <dl>
                        <dt>结算总金额(元)</dt>
                        <dd v-if="settlementOrder.settleStatus == 0">{{addForm.settleTotalAmount | numToCash}}</dd>
                        <dd v-if="settlementOrder.settleStatus != 0">{{settlementOrder.settleTotalAmount | numToCash}}</dd>
                    </dl>
                    <hr/>
                    <dl>
                        <dt>待{{settleText}}(元)</dt>
                        <dd v-if="settlementOrder.settleStatus == 0">{{addForm.settleBalance | numToCash}}</dd>
                        <dd v-if="settlementOrder.settleStatus != 0">{{settlementOrder.settleBalance | numToCash}}</dd>
                    </dl>
                </div>
            </div>
            <div class="foot" v-if="settlementOrder.settleStatus == 0">
                <button class="gy-button-extra" @click="createSettle()">确认发起结算</button>
            </div>
            <div class="footclose" v-if="settlementOrder.settleStatus != 0">
                <p v-if="settlementOrder.settleStatus == 50"><span>温馨提示：</span>财务复核已完成，请进行结款！</p>
                <p v-if="settlementOrder.settleStatus == 60"><span>温馨提示：</span>结算已完成！</p>
                <p v-if="settlementOrder.settleStatus == 40 || settlementOrder.settleStatus == 30 || settlementOrder.settleStatus == 20 || settlementOrder.settleStatus == 10"><span>温馨提示：</span>已发起结算，请等待财务复核！</p>
                <button class="gy-button-extra" @click="closeSettle(orderBoolObj.purchasedialog = false)">关闭</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import gyFileUpload from './../../components/gyFileUpload';

export default {
    name: 'settleAssembly',
    props: {
        orderData: Object,
        orderIds: Object
    },
    components: {gyFileUpload},
    data () {
        return {
            saleOrBuy: null,
            settleText: null,
            purchasedialog: false,
            addForm: {
                contractEssenceId: null,
                settlementPrice: null, // 数量
                settlementQuantity: null, // 单价
                settlementAmount: null, // 金额
                settleBalance: 0, // 结算金额
                settleTotalAmount: 0, // 结算总金额
                hadPayAmount: null, // 已收付款总额
                orderSettleChargesList: [
                    {
                        bearer: null,
                        costItem: '', // 其他费用名称
                        costCharge: null, // 其他费用项目费用
                        bearerId: '', // 承担方公司id
                        bearerName: '' // 承担方公司名称
                    }
                ],
                remark: null
            },
            orderBoolObj: {
                purchasedialog: false,
                saledialog: false
            },
            settleChargesList: [], // 其他费用
            settlementOrder: {}, // 结算已交货什么的
            payerData: [], // 费用承担方公司
            paymentList: {}, // 付款明细
            collectionList: {}, // 收款明细
            settlelistDetail: {} // 结算明细
        };
    },
    watch: {
        'addForm.settlementQuantity' (newVal, oldVal) {
            console.log(newVal, oldVal);
            if (newVal != null && newVal !== undefined) {
                this.addForm.settlementAmount = this.$tools.toFixedFn(Number(newVal) * Number(this.addForm.settlementPrice), 2);
            }
        },
        'addForm.settlementAmount' (newVal, oldVal) {
            console.log(newVal, oldVal);
            this.addForm.settleTotalAmount = Number(this.addForm.settlementAmount);
            this.changeMoney();
            if (Number(this.addForm.settlementQuantity) !== 0) {
                this.addForm.settlementPrice = this.$tools.toFixedFn(Number(newVal) / Number(this.addForm.settlementQuantity), 2);
            }
        }
    },
    mounted () {
        console.log(this.orderIds);
    },
    methods: {
        // 采购结算进来-获取初始数据
        initPurchaseView (OrderId, item) {
            this.settleText = '付款';
            this.saleOrBuy = '采购结算';
            this.addForm = {
                purchaseOrderId: OrderId,
                contractEssenceId: item.id,
                settlementPrice: null, // 数量
                settlementQuantity: null, // 单价
                settlementAmount: null, // 金额
                settleBalance: 0, // 结算金额
                orderSettleChargesList: []
            };
            let PurchaseParams = {
                orderId: OrderId,
                contractEssenceId: item.id,
                purchaseOrderId: OrderId
            };
            this.orderSettleList(OrderId, PurchaseParams);
            this.orderBoolObj.purchasedialog = true;
        },
        // 销售结算进来-获取初始数据
        initSaleView (OrderId, item) {
            this.settleText = '收款';
            this.saleOrBuy = '销售结算';
            this.addForm = {
                saleOrderId: OrderId,
                contractEssenceId: item.id,
                settlementPrice: null, // 数量
                settlementQuantity: null, // 单价
                settlementAmount: null, // 金额
                orderSettleChargesList: []
            };
            let saleParams = {
                orderId: OrderId,
                contractEssenceId: item.id,
                saleOrderId: OrderId
            };
            this.orderSettleList(OrderId, saleParams);
            this.orderBoolObj.purchasedialog = true;
        },
        // 结算详情
        orderSettleList (OrderId, SettleParams) {
            this.$http.post(this.$api.order.getSettlementOrder, SettleParams).then(res => {
                console.log(res.data.data);
                this.settlelistDetail = res.data.data.order; // 订单明细
                this.payerData = res.data.data.bearerModelList; // 费用承担方公司
                this.settlementOrder = res.data.data.settlementOrder; // 结算明细 已交货 结算状态 已付款金额
                this.settleChargesList = res.data.data.settleChargesList; // 其他费用详情
                if (this.settlementOrder.hadPayAmount === null) {
                    this.settlementOrder.hadPayAmount = 0;
                }
                this.paymentList = res.data.data.paymentList; // 付款
                this.collectionList = res.data.data.collectionList; // 收款
                if (this.settlelistDetail.skuPriceType === 21) { // 公式计价
                    this.addForm.settlementPrice = 0;
                    this.addForm.settlementAmount = null;
                } else {
                    this.addForm.settlementPrice = this.settlelistDetail.skuPrice;
                    // this.addForm.settlementAmount = this.settlelistDetail.skuTotalAmount;
                }
                if (this.settlementOrder.alreadyDeliveryQuantity === 0) {
                    this.addForm.settlementQuantity = null;
                    // alert(1);
                } else {
                    this.addForm.settlementQuantity = this.settlementOrder.alreadyDeliveryQuantity;
                }
            });
        },
        // 添加
        addEnumerated () {
            let data = {
                costItem: '',
                costCharge: null,
                bearerId: '', // 承担方公司id
                bearerName: '' // 承担方公司名称
            };
            this.addForm.orderSettleChargesList.push(data);
            console.log(this.addForm.orderSettleChargesList);
        },
        // change 代收付款 随着其他费用 费用承担放和结算金额的变化而变化
        changeMoney () {
            if (this.settlementOrder.hadPayAmount === null) {
                this.settlementOrder.hadPayAmount = 0;
            }
            for (let i = 0; i < this.addForm.orderSettleChargesList.length; i++) {
                if (this.saleOrBuy === '采购结算') {
                    if (Number(this.addForm.orderSettleChargesList[i].bearer.bearerType) === 3) { // 供方承担  要➖
                        this.addForm.settleTotalAmount = this.addForm.settleTotalAmount + (Number(this.addForm.orderSettleChargesList[i].costCharge));
                    } else {
                        this.addForm.settleTotalAmount = this.addForm.settleTotalAmount - (Number(this.addForm.orderSettleChargesList[i].costCharge));
                    }
                } else {
                    if (Number(this.addForm.orderSettleChargesList[i].bearer.bearerType) === 3) { // 供方承担  要➖
                        this.addForm.settleTotalAmount = this.addForm.settleTotalAmount - (Number(this.addForm.orderSettleChargesList[i].costCharge));
                    } else {
                        this.addForm.settleTotalAmount = this.addForm.settleTotalAmount + (Number(this.addForm.orderSettleChargesList[i].costCharge));
                    }
                }
            }
            this.addForm.settleBalance = this.addForm.settleTotalAmount - this.settlementOrder.hadPayAmount;
        },
        // 费用承担方名字赋值也要算已收付款
        assumecost (item) {
            item.bearerId = item.bearer.bearerId;
            item.bearerName = item.bearer.bearerName;
            item.costCharge = Number(item.costCharge);
            this.addForm.settleTotalAmount = Number(this.addForm.settlementAmount);
            console.log(this.addForm.orderSettleChargesList);
            this.changeMoney();
            console.log(this.addForm.settleTotalAmount);
        },
        // 费用改变也要算已收付款
        charge (e, item) {
            console.log(item);
            // 通过正则过滤小数点后两位
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
            item.costCharge = e.target.value;
            this.addForm.settleTotalAmount = Number(this.addForm.settlementAmount);
            if (item.bearerName) {
                this.changeMoney();
            }
        },
        // 删除也要算已收付款
        delEnumerated (index) {
            this.addForm.orderSettleChargesList.splice(index, 1);
            this.addForm.settleTotalAmount = Number(this.addForm.settlementAmount);
            this.changeMoney();
        },
        // 关闭弹框
        closeSettle () {
            console.log('aa');
        },
        // 发起结算
        createSettle () {
            if (!this.check()) return false;
            this.addForm.hadPayAmount = this.settlementOrder.hadPayAmount; // 收付款总额
            this.$http.post(this.$api.order.createSettlementOrder, this.addForm)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message({
                            message: '创建成功',
                            type: 'success'
                        });
                        this.orderBoolObj.purchasedialog = false;
                    } else {
                        this.$message({
                            message: res.data.message,
                            type: 'error'
                        });
                    }
                });
        },
        // 验证
        check () {
            // 其他费用
            console.log(this.addForm.orderSettleChargesList);
            if (!this.addForm.settlementQuantity) {
                this.$message.error('请输入结算数量');
                return false;
            }
            if (!this.addForm.settlementAmount) {
                this.$message.error('请输入结算金额');
                return false;
            }
            if (this.addForm.orderSettleChargesList.length !== 0) {
                for (let i = 0; i < this.addForm.orderSettleChargesList.length; i++) {
                    if (!this.addForm.orderSettleChargesList[i].costItem) {
                        this.$message.error('费用名称不能为空');
                        return false;
                    }
                    if (!this.addForm.orderSettleChargesList[i].costCharge) {
                        this.$message.error('费用金额不能为空');
                        return false;
                    }
                    if (!this.addForm.orderSettleChargesList[i].bearerName) {
                        this.$message.error('费用承担方不能为空');
                        return false;
                    }
                }
            }
            return true;
        },
        handleInput (e) {
            // 通过正则过滤小数点后两位
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,3})/g)[0]) || null;
            this.addForm.settlementQuantity = e.target.value;
        },
        handleInput1 (e) {
            if (Number(this.addForm.settlementQuantity) === 0 || this.addForm.settlementQuantity === null || this.addForm.settlementQuantity === undefined) {
                this.$message.error('请先输入合同结算数量');
                this.addForm.settlementAmount = null;
            } else {
                // 通过正则过滤小数点后两位
                e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
                this.addForm.settlementAmount = e.target.value;
            }
        }
    }

};
</script>

<style lang="scss" scoped>
    .createSettle {
        .footclose{
            padding: 32px 16px 32px 16px;
            overflow: hidden;
            p{
                float: left;
                span{
                    color: #E3070F;
                }
            }
            button{
                float: right;
            }
        }
        .foot{
            margin: 32px 16px 32px 0;
        }
        .gy-form{
            .gy-form-group{
                .l{
                    width: auto;
                }
                padding: 8px 30px 8px 160px;
            }
        }
        .gy-table-box{
            overflow: hidden;
            .title{
                position: relative;
                padding: 24px 0 5px 16px;
                font-size: 14px;
                color: #333333;
                font-weight: bold;
            }
            .clearfix{
                position: relative;
                .gy-form-group{
                    width: 28%;
                }
            }
            .total-detail{
                float:right;
                // width:238px;
                margin:33px 16px 0 0;
                dl{
                    font-size: 14px;
                    color: #333333;
                    overflow: hidden;
                    height:26px;
                }
                dl:last-child{
                    font-weight:bold;
                    font-size: 16px;
                    dd{
                        color: #E3070F;
                    }
                }
                hr{
                    height:1px;
                    border:none;
                    border: 1px solid #E7ECF1;
                }
                dt,dd{
                    float:left;
                    text-align: right;
                }
                dt{
                    width:110px;
                }
                dd{
                    width:130px;
                    float:right;
                    // margin-left:24px;
                }
            }
            .add_contact {
                position: absolute;
                right: 45px;
                top: 30px;
                display: inline-block;
                font-size: 23px;
                color: #ccc;
                cursor: pointer;
            }
            .delete_bank {
                position: absolute;
                right: 45px;
                top: 12px;
                display: inline-block;
                font-size: 23px;
                color: #ccc;
                cursor: pointer;
            }
            .gy-table {
                .red {
                    color: red;
                }
            }
        }
    }
</style>
<style lang="scss">
    .createSettle {
        .el-dialog__title{
            font-size: 16px;
            color: #333;
            font-weight: bold;
            height: 35px;
            line-height: 35px;
            margin-top: -36px;
        }
        .el-dialog__body {
            overflow: hidden;
            margin: 0;
            padding: 0;
        }
        .el-icon-close{
            position: absolute;
            right: -5px;
        }
    }
</style>
