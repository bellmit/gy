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
                      <td>{{item.buyQuantity?item.buyQuantity:'-'}}</td>
                      <td><span v-if="item.buyPrice">{{item.buyPrice | numToCash}}</span><span v-else>-</span></td>
                      <td><span v-if="item.totalAmount">{{item.totalAmount | numToCash}}</span><span v-else>-</span></td>
                      <td><span v-if="item.staDeliveryDate">{{item.staDeliveryDate | date}}</span><span v-else>-</span></td>
                      <td><span v-if="item.endDeliveryDate">{{item.endDeliveryDate | date}}</span><span v-else>-</span></td>
                      <td>{{item.depositRatio?item.depositRatio:'-'}}</td>
                      <td>{{item.marginCall}}%</td>
                      <td><span v-if="item.paymentType">{{item.paymentType | paymentType}}</span><span v-else>-</span></td>
                      <td><span v-if="item.deliveryType">{{item.deliveryType | deliveryType}}</span><span v-if="item.deliveryTypeStr ===' '">-</span></td>
                      <td>{{item.dlvyWarehouse?item.dlvyWarehouse:'-'}}</td>
                      <td>{{parseInt(item.contProgress * 100)}}%</td>
                      <td><span v-if="item.actBuyQuantity">{{item.actBuyQuantity | numToCash}}</span><span v-else>-</span></td>
                      <td>{{item.actbuyPrice?item.actbuyPrice:'-'}}</td>
                      <td><span v-if="item.actContracrPrice">{{item.actContracrPrice | numToCash}}</span><span v-else>-</span></td>
                      <td>{{item.actDlvyWarehouse?item.actDlvyWarehouse:'-'}}</td>
                      <td>
                        {{item.totalDlvyQty?item.totalDlvyQty:'-'}}
                          <el-popover
                            placement="top-start"
                            width="430"
                            @show="popoverShow(item.id, 1)"
                            trigger="click">
                            <el-table :data="dialogData">
                              <el-table-column label="序号" width="60" type="index"></el-table-column>
                              <el-table-column property="deliveryQuantity" label="交割数量" width="120"></el-table-column>
                              <el-table-column label="交割时间" width="180">
                                <template slot-scope="scope">{{scope.row.deliveryDate | date}}</template>
                              </el-table-column>
                            </el-table>
                            <el-button class="gy-button-view" slot="reference" v-if="item.totalDlvyQty">明细</el-button>
                          </el-popover>
                      </td>
                      <td>{{item.unDlvyQty?item.unDlvyQty:'-'}}</td>
                      <td>
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
                      <td>{{item.needPayAmount | numToCash}}</td>
                      <td>{{item.invoiceStatus?item.invoiceStatus:'-'}}</td>
                      <td>{{item.remarks?item.remarks:'-'}}</td>
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
      <div class="departmentName">共计{{total}}条记录</div>
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
            this.$http.post(this.$api.statement.standingBookReportExport, v, {responseType: 'blob'}).then(res => {
                if (res.data.size > 0) {
                    this.download(res.data);
                    return;
                }
                this.$message.error('没有文件可下载');
            });
        },
        download (data) {
            var blob = new Blob([data]);
            if (window.navigator.msSaveOrOpenBlob) {
                // 兼容IE10
                navigator.msSaveBlob(blob, 'excel.xls');
            } else {
                let url = window.URL.createObjectURL(new Blob([data]));
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', 'excel.xls');
                document.body.appendChild(link);
                link.click();
            }
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
    .table-wrap {
        overflow-x: auto;
        .gy-table {
            overflow: auto;
            font-size: 12px;
            th {
                padding: 9px 0 9px 20px;
                white-space: nowrap;
                font-weight: bold;
                color: #666666;
            }
            td{
                color: #666666;
            }
        }
    }
</style>
