<template><!-- 收票列表 -->
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
                    <span class="l">上游公司</span>
                    <input type="text" placeholder="请输入上游公司" v-model="params.sellerName">
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
                    <span v-if="!isShowSearch" class="search" @click="invoiceList()"><i class="iconfont icon-search"></i></span>
                </div>
                <template v-if="isShowSearch">
                    <div class="gy-form-group cl">
                        <span class="l">产品名称</span>
                        <input type="text" placeholder="请输入产品名称" v-model="params.prodName">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">我方公司</span>
                        <input type="text" placeholder="请输入我方公司" v-model="params.targetCorpName">
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
                        <span v-if="isShowSearch" class="search" @click="invoiceList()"><i class="iconfont icon-search"></i></span>
                    </div>
                </template>
            </div>
        </div>
        <div class="deliver_padding_small">
            <div class="gy-table">
                <el-table
                    :data="list"
                    style="width: 100%">
                    <el-table-column
                        fixed
                        label="ID"
                        width="100">
                        <template slot-scope="scope">
                            <span>{{scope.row.id}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="产品名称"
                        :show-overflow-tooltip="true"
                        width="110">
                        <template slot-scope="scope"><div class="wid-overflow">
                            <span>{{scope.row.prodName}}</span></div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="上游公司" :show-overflow-tooltip="true"
                        width="120" class-name="dh-over">
                        <template slot-scope="scope">
                            <span>{{scope.row.sellerCompanyName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="收票状态"
                        width="170">
                        <template slot-scope="scope">
                            <span>{{scope.row.receiptInvoiceStatusValue}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="采购合同金额(元)"
                        class-name="amount-right-el"
                        width="150">
                        <template slot-scope="scope">
                            <template v-if="scope.row.purchaseOrderId">
                                <span v-if="scope.row.buySkuPriceType === 21 || scope.row.buySkuPriceType === 22">公式计价</span>
                                <span v-else>{{scope.row.purchaseAmount | numToCash}}</span>
                            </template>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="采购发票总金额(元)"
                        class-name="amount-right-el"
                        width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.receiptInvoiceAmount">{{scope.row.receiptInvoiceAmount | numToCash}}</span>
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
                        label="采购合同编号"
                        width="200">
                        <template slot-scope="scope">
                            <span>{{scope.row.purchaseContractCode}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="创建时间"
                        width="180">
                        <template slot-scope="scope">
                            <span>{{scope.row.receiptInvoiceCreatedDate | date(1)}}</span>
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
            isShowSearch: false,
            params: {
                pageNum: 1,
                pageSize: 10,
                invoiceQueryType: 3,
                contractType: 2 // 采购
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
                invoiceQueryType: 3,
                contractType: 2 //
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
                    receiptInvoiceStatusValue: item.receiptInvoiceStatusValue,
                    activeType: 2 // 表示只查看收票
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
        .dh-over .cell span {
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap
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
    /deep/.el-table .cell{
        white-space:pre-line;
    }
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
        .el-table .cell {
            white-space: pre-line;
            font-size: 12px;
            color: #666666;
        }
    }
    .invoiceInquiry{
        .gy-table thead td, .gy-table thead th{
            font-weight: bold;
        }
    }
</style>
