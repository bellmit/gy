<template><!-- 发票列表 -->
    <div class="invoiceInquiry">
        <div class="search-btn">
          <span class="advancedSearch" @click="ShowSearch">高级搜索<i class="el-input__icon" :class="isShowSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </div>
        <div class="invoiceSeachAll">
            <div class="invoiceSeach clearfix">
                <div class="gy-form-group">
                    <span class="l">下游公司</span>
                    <input type="text" placeholder="请输入下游公司名" v-model="params.buyerName">
                </div>
                <div class="gy-form-group">
                    <span class="l">上游公司</span>
                    <input type="text" placeholder="请输入上游公司名" v-model="params.sellerName">
                </div>
                <template v-if="isShowSearch">
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
                    <div class="gy-form-group">
                        <span class="l">合同编号</span>
                        <input type="text" placeholder="请输入采购/销售合同编号" v-model="params.orderCode">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">业务操作人</span>
                        <input type="text" placeholder="请输入业务操作人" v-model="params.userName">
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
                            v-bind:label="'ID\n产品名称'"
                            width="110">
                        <template slot-scope="scope">
                            <span>{{scope.row.id}}</span><br/>
                            <span>{{scope.row.prodName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            v-bind:label="'上游公司\n下游公司'"
                            width="220">
                        <template slot-scope="scope">
                            <span>{{scope.row.sellerCompanyName}}</span><br>
                            <span>{{scope.row.buyerCompanyName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            v-bind:label="'收票状态\n开票状态'"
                            width="100">
                        <template slot-scope="scope">
                            <span>{{scope.row.receiptInvoiceStatusValue}}</span><br>
                            <span>{{scope.row.salesInvoiceStatusValue}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            v-bind:label="'采购合同金额(元)\n销售合同金额(元)'"
                            width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.purchaseAmount">{{scope.row.purchaseAmount | numToCash}}</span><br>
                            <span v-if="scope.row.salesAmount">{{scope.row.salesAmount | numToCash}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            v-bind:label="'采购发票总金额(元)\n销售发票总金额(元)'"
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
                            width="110">
                        <template slot-scope="scope">
                            <button class="gy-button-view" style="background-color: #fff;" @click="check(scope.row)">查看</button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-row>
                <el-col :span="24"><div class="grid-content bg-purple">
                    当前页合计&nbsp;&nbsp;&nbsp;&nbsp;未完成开票合同数： <span>{{currPageSellCount}}</span> &nbsp;&nbsp;未完成收票合同数：{{currPagebuyCount}}
                </div></el-col>
                <el-col :span="24"><div class="grid-content bg-purple">
                    <!-- {{allPageSellCount}} -->
                    所有页合计&nbsp;&nbsp;&nbsp;&nbsp;未完成开票合同数： <span>{{allPageSellCount}}</span> &nbsp;&nbsp;未完成收票合同数：{{allPageBuyCount}}
                </div></el-col>
            </el-row>
        </div>
        <!-- 翻页 -->
        <el-pagination
          background
          :page-size="params.pageSize"
          :total="total"
          layout="prev, pager, next"
          style="margin-top: 20px;"
          @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'invoicelist',
    data () {
        return {
            params: {
                pageNum: 1,
                pageSize: 10
            },
            // 销售
            saleStatus: [
                {id: 0, name: '全部'},
                {id: 15, name: '审核中'},
                {id: 50, name: '待开发票'},
                {id: 60, name: '已开票'},
                {id: 70, name: '已完成'}
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
            currPageSellCount: 0,
            currPagebuyCount: 0,
            allPageSellCount: 0,
            allPageBuyCount: 0
        };
    },
    mounted () {
        this.invoiceList();
        this.allPageCount();
    },
    methods: {
        // 查看
        check (item) {
            this.$router.push({name: 'invoiceDetail', query: { purchaseOrderId: item.purchaseOrderId, salesOrderId: item.salesOrderId, id: item.id, salesInvoiceStatusValue: item.salesInvoiceStatusValue, receiptInvoiceStatusValue: item.receiptInvoiceStatusValue }});
        },
        invoiceList () {
            const me = this;
            this.$http.post(this.$api.invoice.getlist, this.params).then(function (response) {
                if (response.data.code === 0) {
                    me.list = response.data.data.list;
                    me.total = response.data.data.total;
                    me.pageCount(me.list);
                } else {
                    me.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
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
        },
        pageCount (list) {
            // 当前页面的统计
            var pageList = list.map(data => {
                if (data.salesInvoiceStatusValue !== '已确认') {
                    return '未完成';
                }
            });
            pageList = pageList.join(',');
            this.currPageSellCount = pageList.split('未完成').length - 1;
            pageList = list.map(data => {
                if (data.receiptInvoiceStatusValue !== '已确认') {
                    return '未完成';
                }
            });
            pageList = pageList.join(',');
            this.currPagebuyCount = pageList.split('未完成').length - 1;
        },
        allPageCount () {
            // 所有页面的统计
            this.$http.get(this.$api.invoice.allPageStatusCount).then((response) => {
                if (response.data.code === 0) {
                // 去结果画面
                    this.allPageBuyCount = response.data.data.allPageBuyCount;
                    this.allPageSellCount = response.data.data.allPageSellCount;
                } else {
                    console.log(response);
                }
            }).catch((e) => {
                console.log(e);
            });
        }
    }
};
</script>

<style scoped lang="scss">
.invoiceInquiry{
    padding-bottom: 30px;
    .search-btn {
      text-align: right;
      margin: 20px 30px 20px 0;
        .advancedSearch {
            cursor: pointer;
        }
    }
    .invoiceSeachAll{
      width: 100%;
      position: relative;
      margin: 20px 0;
        .invoiceSeach{
            position: relative;
          .search {
              position: absolute;
              right: 15px;
              bottom: 15px;
              line-height: 1;
          }
        }
    }
    /*GYfrom padding修改*/
    .gy-form-group{
        padding:8px 30px 8px 124px;
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
