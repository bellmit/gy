<template>
    <div>
        <div class="table-box table-wrap">
            <table class="gy-table">
                <thead>
                    <tr>
                        <th>业务组</th>
                        <th>业务操作人</th>
                        <th>业务类型</th>
                        <th>合同签订日期</th>
                        <th>销售合同编号</th>
                        <th>我方合同主体</th>
                        <th>客户名称</th>
                        <th>评级</th>
                        <th>对应上游采购合同编号</th>
                        <th>品名</th>
                        <th>销售数量(吨)</th>
                        <th>销售单价(元/吨)</th>
                        <th>合同金额(元)</th>
                        <th>合同交割起始日</th>
                        <th>合同交割终止日</th>
                        <th>保证金比例</th>
                        <th>追保比例</th>
                        <th>结算方式</th>
                        <th>交割方式</th>
                        <th>货物交割库</th>
                        <th>合同履行进度</th>
                        <th>实际结算单价(元)</th>
                        <th>实际结算数量(吨)</th>
                        <th>实际合同结算价格(元)</th>
                        <th>实际交割库</th>
                        <th>累计交割数量(吨)</th>
                        <th>未交割数量(吨)</th>
                        <th>累计收款金额(元)</th>
                        <th>应付款余额(元)</th>
                        <th>发票开具情况</th>
                        <th>备注</th>
                    </tr>
                </thead>
                <tbody v-if="tableData.length !== 0">
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td class="wid150">{{item.organizationName?item.organizationName:'-'}}</td>
                        <td>{{item.businessManagerName?item.businessManagerName:'-'}}</td>
                        <td><span v-if="item.bizType">{{item.bizType | businessTradeType}}</span><span v-else>-</span></td>
                        <td><span v-if="item.signedDate">{{item.signedDate | date}}</span><span v-else>-</span></td>
                        <td>{{item.salesContractCode?item.salesContractCode:'-'}}</td>
                        <td>{{item.intermediaryCorpName?item.intermediaryCorpName:'-'}}</td>
                        <td>{{item.customerName?item.customerName:'-'}}</td>
                        <td>{{item.customerGrade?item.customerGrade:'-'}}</td>
                        <td>{{item.purchaseContractCode?item.purchaseContractCode:'-'}}</td>
                        <td>{{item.productName?item.productName:'-'}}</td>
                        <td class="text-r">{{item.salesQuantity?item.salesQuantity:'-'|numToQuantity}}</td>
                        <td class="text-r"><span v-if="item.salesUnitPrice">{{item.salesUnitPrice |numToCash(true)}}</span><span v-else>-</span></td>
                        <td class="text-r"><span v-if="item.contractAmount">{{item.contractAmount | numToCash}}</span><span v-else>-</span></td>
                        <td><span v-if="item.deliveryDateStart">{{item.deliveryDateStart | date}}</span><span v-else>-</span></td>
                        <td><span v-if="item.deliveryDateEnd">{{item.deliveryDateEnd | date}}</span><span v-else>-</span></td>
                        <td v-if="item.depositRatio">{{item.depositRatio}}%</td>
                        <td v-else>无</td>
                        <td v-if="item.depositRatioSubstract && item.depositRatioAppend">跌{{item.depositRatioSubstract}}%补{{item.depositRatioAppend}}%</td>
                        <td v-else>无</td>
                        <td><span v-if="item.paymentType">{{item.paymentType | paymentType}}</span><span v-else>-</span></td>
                        <td><span v-if="item.deliveryType">{{item.deliveryType | deliveryType}}</span><span v-else>-</span></td>
                        <td>{{item.deliveryWarehouseName?item.deliveryWarehouseName:'-'}}</td>
                        <td>{{parseInt(item.contractProcess * 100)}}%</td>
                        <td class="text-r"><span v-if="item.realPrice">{{item.realPrice | numToCash(true)}}</span><span v-else>-</span></td>
                        <td class="text-r">{{item.realQuantity?item.realQuantity:'-'|numToQuantity}}</td>
                        <td class="text-r"><span v-if="item.realContractPrice">{{item.realContractPrice |numToCash(true)}}</span><span v-else>-</span></td>
                        <td>{{item.realDeliveryWarehouseName?item.realDeliveryWarehouseName:'-'}}</td>
                        <td class="text-r">{{item.deliveriedQuantity?item.deliveriedQuantity:'-'|numToQuantity}}</td>
                        <td class="text-r">{{item.undeliveriedQuantity?item.undeliveriedQuantity:'-'|numToQuantity}}</td>
                        <td class="text-r"><span v-if="item.receivedAmount">{{item.receivedAmount | numToCash}}</span><span v-else>-</span></td>
                        <td class="text-r"><span v-if="item.unreceivedAmount">{{item.unreceivedAmount | numToCash}}</span><span v-else>-</span></td>
                        <td>{{item.invoiceStatusValue?item.invoiceStatusValue:'-'}}</td>
                        <td>
                            <el-popover
                                v-if="item.remark"
                                placement="top-start"
                                title="备注"
                                width="430"
                                trigger="hover"
                                :content="item.remark">
                                <!-- <div class="td-max-w" slot="reference">{{item.remark}}</div> -->
                                 <div style="height: 300px;overflow-y:scroll">{{item.remark?item.remark:"-"}}</div>
                                <div class="text-overflow" slot="reference"  >{{(item.remark?item.remark:"-") | cutstring(20)}}</div>
                            </el-popover>
                            <div v-else>-</div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="15" class="null-td" style="text-align:center">没有找到可显示的数据...</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="departmentName">共 {{total}} 条记录</div>
        <!-- jiesu -->
        <!-- 分页 -->
        <el-pagination
          background
          :total="total"
          layout="prev, pager, next"
          style="margin: 20px 0 30px 0;"
          @current-change="turnPage">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'downstream',
    data () {
        return {
            total: null,
            tableData: []
        };
    },
    props: {
        searchForm: {
            type: Object,
            defalult: {}
        }
    },
    created () {
        this.init(this.searchForm);
    },
    methods: {
        init (v) {
            this.$http.post(this.$api.statement.dailyDown, v).then((res) => {
                this.total = res.data.data.total;
                this.tableData = res.data.data.list;
            });
        },
        // 导出
        excel (v) {
            let that = this;
            let fileName = '日报-下游销售合同-' + that.$tools.parseDate(new Date().getTime()) + '.xls';
            that.$tools.exporttoExcel(that, that.$api.statement.dailyDowntoExcel, v, fileName);
        },
        // 分页
        turnPage (v) {
            this.searchForm.pageNum = v;
            this.init(this.searchForm);
        }
    }
};
</script>
<style lang="scss" scoped>
    .td-max-w {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 200px;
        max-height: 120px;
        display: inline-block;
    }
    .table-wrap {
        overflow-x: auto;
        .gy-table {
            overflow: auto;
            font-size: 12px;
            th {
                // padding: 9px 0 9px 20px;
                white-space: nowrap;
                font-weight: bold;
                color: #666666;
            }
            td {
                color: #666666;
                padding-left: 10px;
            }
        }
    }
</style>
