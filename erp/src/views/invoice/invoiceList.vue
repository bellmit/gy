<template><!-- 发票列表 -->
    <div class="invoiceInquiry">
        <div class="search-btn">
          <span class="advancedSearch" @click="ShowSearch">高级搜索<i class="el-input__icon" :class="isShowSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </div>
        <div class="invoiceSeachAll">
            <div class="invoiceSeach clearfix">
                <div class="gy-form-group">
                        <span class="l">合同要素ID</span>
                        <input type="text" placeholder="请输入合同要素ID" v-model="params.essenceId">
                </div>
                <div class="gy-form-group">
                        <span class="l">业务操作人</span>
                        <input type="text" placeholder="请输入业务操作人" v-model="params.userName">
                </div>
                <div class="gy-form-group">
                    <span class="l">下游公司</span>
                    <input type="text" placeholder="请输入下游公司" v-model="params.buyerName">
                </div>
                <div class="gy-form-group">
                    <span class="l">上游公司</span>
                    <input type="text" placeholder="请输入上游公司" v-model="params.sellerName">
                    <span v-if="!isShowSearch" class="search" @click="search()"><i class="iconfont icon-search"></i></span>
                </div>
                <template v-if="isShowSearch">
                    <div class="gy-form-group">
                        <span class="l">产品名称</span>
                        <input type="text" placeholder="请输入产品名称" v-model="params.prodName">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">我方公司</span>
                        <input type="text" placeholder="请输入我方公司" v-model="params.targetCorpName">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">申请开票日期</span>
                        <div class="searchDate">
                            <div class="d">
                                <el-date-picker
                                v-model="params.invoiceStartDate"
                                type="date"
                                value-format="timestamp"
                                placeholder="开始日期">
                                </el-date-picker>
                            </div>
                            <div class="c">至</div>
                            <div class="d">
                                <el-date-picker
                                v-model="params.invoiceEndDate"
                                type="date"
                                value-format="timestamp"
                                @change="params.invoiceEndDate = $tools.convertDateEnd(params.invoiceEndDate)"
                                placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">申请收票日期</span>
                        <div class="searchDate">
                            <div class="d">
                                <el-date-picker
                                v-model="params.receiptStartDate"
                                type="date"
                                value-format="timestamp"
                                placeholder="开始日期">
                                </el-date-picker>
                            </div>
                            <div class="c">至</div>
                            <div class="d">
                                <el-date-picker
                                v-model="params.receiptEndDate"
                                type="date"
                                value-format="timestamp"
                                @change="params.receiptEndDate = $tools.convertDateEnd(params.receiptEndDate)"
                                placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">销售发票状态</span>
                        <el-select v-model="params.saleInvoiceStatus" placeholder="请选择">
                            <el-option
                              v-for="item in saleStatus"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">采购发票状态</span>
                        <el-select v-model="params.poInvoiceStatus" placeholder="请选择">
                            <el-option
                              v-for="item in sellerStatus"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </template>
                <span class="search" @click="search()"><i class="iconfont icon-search"></i></span>
            </div>
        </div>
        <div class="deliver_padding_small">
            <div class="gy-table">
                <el-table
                        :data="list"
                        style="width: 100%">
                    <el-table-column
                            fixed
                            :show-overflow-tooltip="true"
                            v-bind:label="'ID\n产品名称'"
                            width="110">
                        <template slot-scope="scope"><div class="wid-overflow">
                            <span>{{scope.row.id}}</span><br/>
                            <span>{{scope.row.prodName}}</span></div>
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
                            v-bind:label="'收票状态\n开票状态'"
                            width="170">
                        <template slot-scope="scope">
                            <span>{{scope.row.receiptInvoiceStatusValue}}</span><br>
                            <span>{{scope.row.salesInvoiceStatusValue}}</span>
                            <span class="text-overflow payment-person" v-if="scope.row.toDoUserList && scope.row.toDoUserList.length === 1"> {{ scope.row.toDoUserList[0].username }}</span>
                            <template v-if="scope.row.toDoUserList && scope.row.toDoUserList.length > 1">
                                <el-popover
                                    placement="bottom"
                                    title=""
                                    width="400"
                                    trigger="click">
                                    <el-table :data="scope.row.toDoUserList">
                                        <el-table-column label="序号" width="80" type="index"></el-table-column>
                                        <el-table-column label="提交时间" width="160">
                                            <template slot-scope='item'><div>{{ item.row.createdDate | date(1) }}</div></template>
                                        </el-table-column>
                                        <el-table-column label="当前审批人" width="120">
                                            <template slot-scope='item'><div>{{ item.row.username }}</div></template>
                                        </el-table-column>
                                    </el-table>
                                    <span slot="reference" class="popover-name text-overflow payment-person">{{ scope.row.toDoUserList[0].username }}<i class="sort-caret descending"></i></span>
                                </el-popover>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column
                            v-bind:label="'采购合同金额(元)\n销售合同金额(元)'"
                            class-name="amount-right-el"
                            width="150">
                        <template slot-scope="scope">
                            <template v-if="scope.row.purchaseOrderId">
                                <span v-if="scope.row.buySkuPriceType === 21 || scope.row.buySkuPriceType === 22">公式计价</span>
                                <span v-else>{{scope.row.purchaseAmount | numToCash}}</span><br>
                            </template>
                            <template v-if="scope.row.salesOrderId">
                                <span v-if="scope.row.saleSkuPriceType === 21 || scope.row.saleSkuPriceType === 22">公式计价</span>
                                <span v-else>{{scope.row.salesAmount | numToCash}}</span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column
                            v-bind:label="'采购发票总金额(元)\n销售发票总金额(元)'"
                            class-name="amount-right-el"
                            width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.receiptInvoiceAmount">{{scope.row.receiptInvoiceAmount | numToCash}}</span><br>
                            <span v-if="scope.row.salesInvoiceAmount">{{scope.row.salesInvoiceAmount | numToCash}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="业务操作人"
                            width="120">
                        <template slot-scope="scope">
                            <span>{{scope.row.businessManagerName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            v-bind:label="'采购合同编号\n销售合同编号'"
                            width="200">
                        <template slot-scope="scope">
                            <span>{{scope.row.purchaseContractCode}}</span><br>
                            <span>{{scope.row.salesContractCode}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="创建时间"
                            width="180">
                        <template slot-scope="scope">
                            <span>{{scope.row.receiptInvoiceCreatedDate | date(1)}}</span> <br>
                            <span>{{scope.row.salesInvoiceCreatedDate | date(1)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="65">
                        <template slot-scope="scope">
                            <button class="gy-button-view" style="background-color: #fff" @click="check(scope.row)">查看</button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <listStatistics @toggleTabs="toggleTabs">
                <div class="list-statistics-item">
                    <div><span>申请收票(元)</span><span class="span-money">{{statisticsShow.applyReceiptAmount | numToCash}}</span></div>
                    <div><span>申请开票笔数(笔)</span><span>{{statisticsShow.applyIssueCount| numToQuantity}}</span></div>
                    <div><span>申请开票(元)</span><span class="span-money">{{statisticsShow.applyIssueAmount | numToCash}}</span></div>
                    <div><span>申请收票笔数(笔)</span><span>{{statisticsShow.applyReceiptCount | numToQuantity}}</span></div>
                    <div><span>已收票(元)</span><span class="span-money">{{statisticsShow.receiptedAmount | numToCash}}</span></div>
                    <div><span>已开票笔数(笔)</span><span>{{statisticsShow.issuedCount | numToQuantity}}</span></div>
                    <div><span>已开票(元)</span><span class="span-money">{{statisticsShow.issuedAmount | numToCash}}</span></div>
                    <div><span>已收票笔数(笔)</span><span>{{statisticsShow.receiptedCount | numToQuantity}}</span></div>
                </div>
            </listStatistics>
        </div>
        <!-- 翻页 -->
        <el-pagination
          background
          :page-size="params.pageSize"
          :total="total"
          layout="prev, pager, next"
          style="margin-top: 20px;"
          :current-page.sync="params.pageNum"
          @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
import listStatistics from './../components/listStatistics';
export default {
    name: 'invoicelist',
    data () {
        return {
            params: {
                pageNum: 1,
                pageSize: 10,
                invoiceQueryType: 1
            },
            // 销售
            saleStatus: [
                {id: '', name: '全部'},
                {id: 0, name: '未开票'},
                {id: 1, name: '开票中'},
                {id: 2, name: '已开票'}
            ],
            // 采购
            sellerStatus: [
                {id: 0, name: '全部'},
                {id: 10, name: '待确认'},
                {id: 20, name: '已确认'}
            ],
            list: [],
            isShowSearch: false,
            total: null,
            statisticsShow: {
                allPageSellCount: null, // 弃用
                allPageBuyCount: null, // 弃用
                applyReceiptAmount: null, //  申请收票金额
                receiptedAmount: null, // 已收票金额
                applyReceiptCount: 0, // 申请收票笔数
                receiptedCount: 0, // 已收票笔数
                applyIssueAmount: null, // 申请开票金额
                issuedAmount: null, // 已开票金额
                applyIssueCount: 0, // 申请开票笔数
                issuedCount: 0 // 已开票笔数
            }
        };
    },
    activated () {
        if (!this.$route.meta.isBack) {
            this.params = {
                invoiceQueryType: 1
            };
            this.invoiceList();
        }
        this.$route.meta.isBack = false;
    },
    mounted () {
        // this.invoiceList();
        this.toggleTabs(1);
    },
    methods: {
        toggleTabs (idx) {
            let countType = idx === 1 ? 'day' : 'month';
            this.$http.get(this.$api.invoice.allPageStatusCount + '?period=' + countType)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.statisticsShow = res.data.data;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 查看
        check (item) {
            this.$router.push({name: 'invoiceDetail',
                query: {
                    purchaseOrderId: item.purchaseOrderId,
                    saleOrderId: item.salesOrderId,
                    id: item.id,
                    salesInvoiceStatusValue: item.salesInvoiceStatusValue,
                    receiptInvoiceStatusValue: item.receiptInvoiceStatusValue
                }
            });
        },
        invoiceList () {
            this.$http.post(this.$api.invoice.getlist, this.params)
                .then((response) => {
                    if (response.data.code === 0) {
                        this.list = response.data.data.list;
                        this.total = response.data.data.total;
                    } else {
                        this.$alert(response.data.code + ' ' + response.data.message);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        ShowSearch () {
            this.isShowSearch = !this.isShowSearch;
        },
        search () {
            this.invoiceList();
        },
        // 分页
        handleCurrentChange (r) {
            this.params.pageNum = r;
            this.invoiceList();
        }
    },
    components: {listStatistics}
};
</script>

<style scoped lang="scss">
.invoiceInquiry{
    .wid-overflow {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .search-btn {
      text-align: right;
      margin: 20px 25px 10px 0;
        .advancedSearch {
            cursor: pointer;
        }
    }
    .invoiceSeachAll{
      position: relative;
      margin: 10px 25px 20px 0;
        .invoiceSeach{
            position: relative;
          .search {
              position: absolute;
              right: 5px;
              bottom: 15px;
              line-height: 1;
          }
        }
    }
    /*GYfrom padding修改*/
    .gy-form-group{
        padding:8px 30px 8px 124px;
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
    }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
  padding-left: 10px;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  height: 36px;
  line-height: 36px;
  background-color: #ecf5ff;
  span {
    min-width: 30px;
    display: inline-block;
    margin-left: 10px;
  }
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
// /deep/.el-table .cell{
//     white-space:pre-line;
// }
/*样式规范*/
.deliver_padding_small{
    padding:0 16px;
    font-size: 12px;
}

/deep/ .sort-caret {
    right: 0;
    top: 5px;
    bottom: auto;
    left: auto;
}

/deep/ .popover-name {
    position: relative;
}

/deep/ .text-overflow {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

/deep/ .payment-person {
    display: inline-block;
    max-width: 90px;
    padding: 0 10px;
    vertical-align: text-top;
    cursor: default;
}
</style>
<style lang="scss">
    .invoiceInquiry {
        .el-table  {
            th .cell {
                white-space: pre-line;
            }
            .cell {
                font-size: 12px;
                color:#666666;
            }
        }
    }
    .invoiceInquiry{
        .gy-table thead td, .gy-table thead th{
            font-weight: bold;
        }
    }
</style>
