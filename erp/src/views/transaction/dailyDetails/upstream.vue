<template>
    <div>
      <!-- 列表 -->
      <div class="table-box table-wrap">
          <table class="gy-table">
              <thead>
                  <tr>
                      <th>业务组</th>
                      <th>业务操作人</th>
                      <th>业务类型</th>
                      <th>合同签订日期</th>
                      <th>采购合同编号</th>
                      <th>我方公司</th>
                      <th>上游公司</th>
                      <th>评级</th>
                      <th>对应下游销售合同编号</th>
                      <th>品名</th>
                      <th>单位</th>
                      <th>采购数量(吨)</th>
                      <th>采购单价(元/吨)</th>
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
                      <th>累计付款金额(元)</th>
                      <th>应付款余额(元)</th>
                      <th>发票开具情况</th>
                      <th>备注</th>
                  </tr>
              </thead>
              <tbody v-if="tableData.length !== 0">
                  <tr v-for="(item, index) in tableData" :key="index">
                      <td>{{item.bizGrpName?item.bizGrpName:'-'}}</td>
                      <td>{{item.operation?item.operation:'-'}}</td>
                      <td><span v-if="item.bizType">{{item.bizType | businessTradeType}}</span><span v-else>-</span></td>
                      <td><span v-if="item.contSignDate">{{item.contSignDate | date}}</span><span v-else>-</span></td>
                      <td>{{item.contractSn?item.contractSn:'-'}}</td>
                      <td>{{item.companyName?item.companyName:'-'}}</td>
                      <td>{{item.sellerCorpName?item.sellerCorpName:'-'}}</td>
                      <td>{{item.grade?item.grade:'-'}}</td>
                      <td>{{item.saleContractSn?item.saleContractSn:'-'}}</td>
                      <td>{{item.productName?item.productName:'-'}}</td>
                      <td>{{item.unit?item.unit:'-'}}</td>
                      <td class="text-r">{{item.buyQuantity?item.buyQuantity:'-'|numToQuantity}}</td>
                      <td class="text-r"><span v-if="item.buyPrice">{{item.buyPrice|numToCash(true)}}</span><span v-else>-</span></td>
                      <td class="text-r"><span v-if="item.totalAmount">{{item.totalAmount|numToCash}}</span><span v-else>-</span></td>
                      <td><span v-if="item.staDeliveryDate">{{item.staDeliveryDate | date}}</span><span v-else>-</span></td>
                      <td><span v-if="item.endDeliveryDate">{{item.endDeliveryDate | date}}</span><span v-else>-</span></td>
                      <td>{{item.depositRatio}}</td>
                      <td>{{item.marginCall}}</td>
                      <td><span v-if="item.paymentTypeStr">{{item.paymentTypeStr}}</span><span v-else>-</span></td>
                      <td><span v-if="item.deliveryType">{{item.deliveryType | deliveryType}}</span><span v-else>-</span></td>
                      <td>{{item.dlvyWarehouse?item.dlvyWarehouse:'-'}}</td>
                      <td>{{parseInt(item.contProgress * 100)}}%</td>
                      <!-- zheli -->
                      <td class="text-r">{{item.actbuyPrice?item.actbuyPrice:'-'|numToCash(true)}}</td>
                      <td class="text-r"><span v-if="item.actBuyQuantity">{{item.actBuyQuantity |numToQuantity}}</span><span v-else>-</span></td>
                      <td class="text-r"><span v-if="item.actContracrPrice">{{item.actContracrPrice |numToCash(true)}}</span><span v-else>-</span></td>
                      <td>{{item.actDlvyWarehouse?item.actDlvyWarehouse:'-'}}</td>
                      <td class="text-r">
                        {{item.totalDlvyQty?item.totalDlvyQty:'-'|numToQuantity}}
                          <el-popover
                            placement="top-start"
                            width="430"
                            @show="popoverShow(item.id, 1)"
                            trigger="click">
                            <el-table :data="dialogData">
                              <el-table-column label="序号" width="60" type="index"></el-table-column>
                              <el-table-column label="交割数量" width="120">
                                  <template slot-scope="scope">{{scope.row.deliveryQuantity | numToQuantity}}</template>
                              </el-table-column>
                              <el-table-column label="交割时间" width="180">
                                <template slot-scope="scope">{{scope.row.deliveryDate | date}}</template>
                              </el-table-column>
                            </el-table>
                            <el-button class="gy-button-view" slot="reference" v-if="item.totalDlvyQty">明细</el-button>
                          </el-popover>
                      </td>
                      <td class="text-r">{{item.unDlvyQty?item.unDlvyQty:'-'|numToQuantity}}</td>
                      <td class="text-r">
                        {{item.totalPayAmount | numToCash}}
                          <el-popover
                            placement="top-start"
                            width="430"
                            @show="popoverShow(item.id, 2)"
                            trigger="click">
                            <el-table :data="dialogData">
                              <el-table-column label="序号" width="60" type="index"></el-table-column>
                              <el-table-column property="payTotal" label="付款金额(元)" width="120">
                                <template slot-scope="scope">{{scope.row.payTotal | numToCash}}</template>
                              </el-table-column>
                              <el-table-column label="付款时间" width="180">
                                <template slot-scope="scope">{{scope.row.payTime | date}}</template>
                              </el-table-column>
                            </el-table>
                            <el-button class="gy-button-view" slot="reference" v-if="item.totalPayAmount">明细</el-button>
                          </el-popover>
                      </td>
                      <td class="text-r">{{item.needPayAmount | numToCash}}</td>
                      <td>{{item.invoiceStatusStr?item.invoiceStatusStr:'-'}}</td>
                      <td>
                        <el-popover
                            v-if="item.remarks"
                            placement="top-start"
                            title="备注"
                            width="430"
                            trigger="hover"
                            :content="item.remarks">
                            <!-- <div class="td-max-w" slot="reference">{{item.remarks}}</div> -->
                            <div style="height: 300px;overflow-y:scroll">{{item.remarks?item.remarks:"-"}}</div>
                                <div class="text-overflow" slot="reference"  >{{(item.remarks?item.remarks:"-") | cutstring(20)}}</div>
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
      <!-- jiesu -->
      <div class="departmentName">共 {{total}} 条记录</div>
      <!-- 分页 -->
      <el-pagination
        background
        :total="total"
        layout="prev, pager, next"
        style="margin: 20px 0 30px 0;"
        @current-change="turnPage">
      </el-pagination>
      <!--  金额明细 -->
      <el-dialog :title="title" :visible.sync="isDialog"  width="30%"  >
        <el-table :data="dialogData" v-if="dialogData !==0">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column property="num" :label="dialogObj.num"></el-table-column>
          <el-table-column property="date" :label="dialogObj.date"></el-table-column>
        </el-table>
        <div v-else style="text-align: center;">
            暂无数据...
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'upstream',
    data () {
        return {
            total: null,
            tableData: [],
            // 明细
            title: null,
            isDialog: false,
            dialogData: [],
            dialogObj: {
                title: '序号',
                num: '',
                date: ''
            }
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
            this.$http.post(this.$api.statement.dailyUp, v)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.total = res.data.data.total;
                        this.tableData = res.data.data.purchaseContractDtos;
                    }
                });
        },
        // 明细显示
        popoverShow (id, type) {
            // 累计交割数量
            if (type === 1) {
                this.$http.post(this.$api.statement.deliveries, {id: id}).then((res) => {
                    if (res.data.code === 0) {
                        this.dialogData = res.data.data;
                    }
                });
            } else {
                this.$http.post(this.$api.statement.payments, {id: id}).then((res) => {
                    if (res.data.code === 0) {
                        this.dialogData = res.data.data;
                    }
                });
            }
        },
        // 导出
        excel (v) {
            let that = this;
            let fileName = '日报-上游采购合同-' + that.$tools.parseDate(new Date().getTime()) + '.xls';
            that.$tools.exporttoExcel(that, that.$api.statement.dailyUptoExcel, v, fileName);
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
    .departmentName{
        margin-top: 20px;
        font-size: 12px;
        color: #666;
    }
    .td-max-w {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 200px;
        display: inline-block;
    }
    .table-wrap {
        overflow-x: auto;
        .gy-table {
            overflow: auto;
            font-size: 12px;
            th {
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
