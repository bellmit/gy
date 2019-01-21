<!-- 收付款列表 -->
<template>
    <div class="payment-list">
        <div class="search-wrapper">
            <div class="search-form">
                <div class="gy-form-group">
                    <span class="l">下游公司</span>
                    <input type="text" v-model="search.buyerCompanyName" placeholder="请输入下游公司名称">
                </div>
                <div class="gy-form-group">
                    <span class="l">上游公司</span>
                    <input type="text" v-model="search.sellerCompanyName" placeholder="请输入上游公司名称">
                </div>
                <div class="gy-form-group">
                    <span class="l">付款状态</span>
                    <el-select v-model="search.paymentStatus" placeholder="请选择">
                        <el-option
                                v-for="item in $constant.paymentStatusBuy"
                                :key="item.id"
                                :label="item.name"
                                :value="item.status">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l">收款状态</span>
                    <el-select v-model="search.collectionStatus" placeholder="请选择">
                        <el-option
                                v-for="item in $constant.paymentStatusSell"
                                :key="item.id"
                                :label="item.name"
                                :value="item.status">
                        </el-option>
                    </el-select>
                    <span class="searchicon" @click="getlist" v-if="!isShowSearch"><i class="iconfont icon-search"></i></span>
                </div>
                <template v-if="isShowSearch">
                    <div class="gy-form-group">
                        <span class="l">合同编号</span>
                        <input type="text" v-model="search.contractCode" placeholder="请输入采购/销售合同编号">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">付款日期</span>
                        <div class="searchDate">
                            <div class="d">
                                <el-date-picker
                                        v-model="search.paymentDateStart"
                                        type="date"
                                        value-format="timestamp"
                                        placeholder="开始日期">
                                </el-date-picker>
                            </div>
                            <div class="c">至</div>
                            <div class="d">
                                <el-date-picker
                                        v-model="search.paymentDateEnd"
                                        type="date"
                                        value-format="timestamp"
                                        placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">收款日期</span>
                        <div class="searchDate">
                            <div class="d">
                                <el-date-picker
                                        v-model="search.collectionDateStart"
                                        type="date"
                                        value-format="timestamp"
                                        placeholder="开始日期">
                                </el-date-picker>
                            </div>
                            <div class="c">至</div>
                            <div class="d">
                                <el-date-picker
                                        v-model="search.collectionDateEnd"
                                        type="date"
                                        value-format="timestamp"
                                        placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                        <span class="searchicon" @click="getlist"><i class="iconfont icon-search"></i></span>
                    </div>
                </template>
                <div class="clearfix"></div>
            </div>
            <span class="search-btn" @click="ShowSearch">高级搜索<i class="el-input__icon" :class="isShowSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </div>
        <div class="gy-table">
            <el-table
                    :data="list"
                    style="width: 100%">
                <el-table-column
                        fixed
                        v-bind:label="'ID\n产品名称'"
                        width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.contractId}}</span><br/>
                        <span>{{scope.row.prodName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        :label="'上游公司\n下游公司'"
                        width="240">
                    <template slot-scope="scope">
                        <span>{{scope.row.sellerCompanyName}}</span><br>
                        <span>{{scope.row.buyerCompanyName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.paymentStateStr}}</span><br>
                        <span>{{scope.row.collectionStateStr}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        :label="'应付款(元)\n应收款(元)'"
                        width="220">
                    <template slot-scope="scope">
                        <span v-if="scope.row.shouldPaymentTotal">{{scope.row.shouldPaymentTotal | numToCash}}</span><br>
                        <span v-if="scope.row.shouldCollectionTotal">{{scope.row.shouldCollectionTotal | numToCash}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        :label="'待付款(元)\n待收款(元)'"
                        width="200">
                    <template slot-scope="scope">
                        <span v-if="scope.row.needPaymentTotal">{{scope.row.needPaymentTotal | numToCash}}</span><br>
                        <span v-if="scope.row.needCollectionTotal">{{scope.row.needCollectionTotal | numToCash}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        :label="'付款日期\n收款日期'"
                        width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.paymentDate | date}}</span><br>
                        <span>{{scope.row.collectionDate | date}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        :label="'采购合同编号\n销售合同编号'"
                        width="200">
                    <template slot-scope="scope">
                        <span>{{scope.row.purchaseCcontractCode}}</span><br>
                        <span>{{scope.row.sellerCcontractCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="创建时间"
                        width="200">
                    <template slot-scope="scope">
                        <span>{{scope.row.paymentCreatedDate | date(1)}}</span><br>
                        <span>{{scope.row.collectionCreatedDate | date(1)}}</span>
                    </template>
                </el-table-column>
                <!--<el-table-column-->
                        <!--v-bind:label="'已付款\n收款金额(元)'"-->
                        <!--width="180">-->
                    <!--<template slot-scope="scope">-->
                        <!--<span>{{scope.row.hadPaymentTotal | numToCash}}</span><br>-->
                        <!--<span>{{scope.row.hadCollectionTotal | numToCash}}</span>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                        <!--label="业务操作人"-->
                        <!--width="120">-->
                    <!--<template slot-scope="scope">-->
                        <!--<span>{{scope.row.businessManagerName}}</span>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="110">
                    <template slot-scope="scope">
                        <button class="gy-button-view view" @click="showDetail(scope.row)">查看</button>
                        <span v-if="scope.row.paymentAlarmSign === 1 || scope.row.collectionAlarmSign === 1"
                              style="padding-left: 8px">
                            <img src="../../assets/images/icons/icon-sign.jpg" height="19" width="19"/>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    当前页合计 未完成收款合同数:{{currPageSellCount}} 未完成付款合同数：{{currPagebuyCount}}
                </div>
            </el-col>
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    所有页合计 未完成收款合同数:{{allPageSellCount}} 未完成付款合同数：{{allPageBuyCount}}
                </div>
            </el-col>
        </el-row>
        <!-- 翻页 -->
        <el-pagination
                background
                :total="total"
                layout="prev, pager, next"
                style="margin-top: 40px;"
                @current-change="turnPage">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data () {
        return {
            search: {
                contEssenceSn: null, // 合同编号
                payNumber: null, // 付款单号
                purchaseOrderNumber: null, // 采购订单号
                sellerOrderNumber: null, // 销售订单号
                collectionStatus: null, // 收款单状态 10: 'CREATED': 已创建 20: 'CONFIRMED': 已确认 30: 'PAYING': 支付中 40: 'PAID': 已支付 50: 'COMPLETED': 已完成 60: 'DISCARDED': 已作废
                paymentStatus: null, // 付款单状态 10: 'CREATED': 已创建 20: 'CONFIRMED': 已确认 30: 'PAYING': 支付中 40: 'PAID': 已支付 50: 'COMPLETED': 已完成 60: 'DISCARDED': 已作废
                buyerCompanyName: null, // 下游公司名称
                sellerCompanyName: null, // 上游公司名称
                paymentDateStart: null, // 付款开始时间
                paymentDateEnd: null, // 付款结束时间
                collectionDateStart: null, // 收款开始时间
                collectionDateEnd: null, // 收款结束时间
                businessOwnerName: null, // 业务操作人
                pageNo: 1, // 页码（从1开始）默认1
                pageSize: 10 // 每页大小（未设置时取后台设置默认值）
            },
            isShowSearch: false,
            list: [
                {
                    id: null, // 合同要素ID
                    buyerCompanyName: null, // 下游公司名称
                    sellerCompanyName: null, // 上游公司名称
                    shouldPaymentTotal: null, // 应付款金额
                    shouldCollectionTotal: null, // 应收款金额
                    hadPaymentTotal: null, // 已付款金额
                    hadCollectionTotal: null, // 已收款金额
                    needPaymentTotal: null, // 待付款金额
                    needCollectionTotal: null, // 待收款金额
                    paymentDate: null, // 付款日期 （格式：yyyy-MM-dd）
                    collectionDate: null, // 收款日期（格式：yyyy-MM-dd）
                    paymentStateStr: null, // 付款状态
                    collectionStateStr: null, // 收款状态
                    paymentCreatedDate: null, // 付款创建时间（格式：yyyy-MM-dd HH:mm:ss）
                    collectionCreatedDate: null, // 收款创建时间（格式：yyyy-MM-dd HH:mm:ss）
                    sellerOrderNumber: null, // 销售单号
                    sellerOrderId: null, // 销售ID
                    purchaseOrderNumber: null, // 采购单号
                    purchaseOrderId: null // 采购单号
                }
            ],
            total: null,
            currPageSellCount: 0,
            currPagebuyCount: 0,
            allPageSellCount: 0,
            allPageBuyCount: 0
        };
    },
    methods: {
        getlist () {
            const me = this;
            let params = {};
            Object.keys(this.search).forEach((k) => {
                params[k] = this.search[k];
            });
            if (params.paymentDateEnd !== null && params.paymentDateEnd !== '') {
                params.paymentDateEnd = params.paymentDateEnd + 1000 * 60 * 60 * 24 - 1;
            }
            if (params.collectionDateEnd !== null && params.collectionDateEnd !== '') {
                params.collectionDateEnd = params.collectionDateEnd + 1000 * 60 * 60 * 24 - 1;
            }

            this.$http.post(this.$api.payment.getlist, params).then(function (response) {
                if (response.data.code === 0) {
                    // 去结果画面
                    me.list = response.data.data.paymentAndCollectionDtos;
                    me.total = response.data.data.total;
                    me.pageCount(me.list);
                } else {
                    me.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        ShowSearch () { // 搜索详情
            this.isShowSearch = !this.isShowSearch;
        },
        turnPage (e) { // 分页切换
            this.search.pageNo = e;
            this.getlist();
        },
        showDetail (row) { // 收付款单详情
            let query = {
                id: row.contractId, // 合同要素id
                purchaseOrderId: row.purchaseOrderId, // 采购单号
                sellerOrderId: row.sellerOrderId // 销售单号
            };
            this.$router.push({name: 'paymentDetail', query: query});
        },
        pageCount (list) {
            // 当前页面的统计
            var pageList = list.map(data => {
                if (data.collectionStateStr !== '已完成') {
                    return '未完成';
                }
            });
            pageList = pageList.join(',');
            this.currPageSellCount = pageList.split('未完成').length - 1;
            pageList = list.map(data => {
                if (data.paymentStateStr !== '已完成') {
                    return '未完成';
                }
            });
            pageList = pageList.join(',');
            this.currPagebuyCount = pageList.split('未完成').length - 1;
        },
        allPageCount () {
            // 所有页面的统计
            this.$http.get(this.$api.payment.allPageStatusCount).then((response) => {
                if (response.data.code === 0) {
                // 去结果画面
                    this.allPageBuyCount = response.data.data.allPageBuyCount;
                    this.allPageSellCount = response.data.data.allPageSellCount;
                } else {
                }
            }).catch((e) => {
                console.log(e);
            });
        }
    },
    created: function () {
        // 获取付款单信息
        this.getlist();
        this.allPageCount();
    }

};
</script>

<style lang="scss" scoped>
  .payment-list {
     padding: 0 16px;
  }
  .gy-form-group{
    padding-left: 90px;
  }
  .search-wrapper {
    padding: 50px 0 20px 0;
    position: relative;
    .gy-form-group{
      height: 50px;
    }
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
      right: 0;
      top: 15px;
      cursor: pointer;
    }
    .searchicon {
      position: absolute;
      right: 15px;
      bottom: 15px;
      line-height: 1;
    }
  }
  .tab-wrapper {
    position: relative;
  }
</style>
<style lang="scss">
  .payment-list{
      padding-right: 16px;
      padding-left: 16px;
    .cell{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .view {
        background-color: #fff;
      }
    }
    .gy-table tr.selected, .gy-table tr:hover {
      background-color: #fff;
    }
    .el-table__body tr.hover-row>td {
      background-color: #f9f9f9;
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
    color: white;
    padding-left: 10px;
  }
  .bg-purple {
    background: #d3dce6;
    padding-left: 10px;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-table .cell{
      white-space:pre-line;
  }
</style>
