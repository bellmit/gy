<template>
    <div class="delivery">
        <div class="deliverySeachAll">
            <div class="deliverySeach clearfix">
                <div class="gy-form-group">
                    <span class="l">下游公司</span>
                    <input type="text" placeholder="请输入" v-model="params.buyerCompanyName">
                </div>
                <div class="gy-form-group">
                    <span class="l">上游公司</span>
                    <input type="text" placeholder="请输入" v-model="params.sellerCompanyName">
                </div>
                <div class="gy-form-group">
                    <span class="l">采购交割状态</span>
                    <el-select v-model="params.buyDeliveryStatus" placeholder="请选择">
                    <el-option
                    v-for="item in deliveryStatusList"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                    </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l">销售交割状态</span>
                    <el-select v-model="params.sellDeliveryStatus" placeholder="请选择">
                      <el-option
                        v-for="item in deliveryStatusList"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id">
                      </el-option>
                    </el-select>
                    <span v-if="!isShowSearch" class="search" @click="search()"><i class="iconfont icon-search"></i></span>
                </div>
                <template v-if="isShowSearch">
                    <div class="gy-form-group">
                        <span class="l">合同要素ID</span>
                        <input type="text" placeholder="请输入采购/销售合同ID" v-model="params.buyContractCode">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">业务操作人</span>
                        <input type="text" placeholder="请输入业务操作人" v-model="params.businessManagerName">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">业务组</span>
                        <input type="text" placeholder="请输入业务组">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">我方公司</span>
                        <input type="text" placeholder="请输入我方公司名称"  v-model="params.mediaCorpName">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">采购交割日期</span>
                        <div class="searchDate">
                            <div class="d">
                                <el-date-picker
                                  v-model="params.strBuyPlanDeliveryDate"
                                  type="date"
                                  value-format="timestamp"
                                  placeholder="开始日期">
                                </el-date-picker>
                            </div>
                            <div class="c">至</div>
                            <div class="d">
                                <el-date-picker
                                  v-model="params.endBuyPlanDeliveryDate"
                                  type="date"
                                  value-format="timestamp"
                                  placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">实际采购交割日</span>
                        <div class="searchDate">
                            <div class="d">
                                <el-date-picker
                                  v-model="params.strBuyActualDeliveryDate"
                                  type="date"
                                  value-format="timestamp"
                                  placeholder="开始日期">
                                </el-date-picker>
                            </div>
                            <div class="c">至</div>
                            <div class="d">
                                <el-date-picker
                                  v-model="params.endBuyActualDeliveryDate"
                                  type="date"
                                  value-format="timestamp"
                                  placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">销售交割日期</span>
                        <div class="searchDate">
                            <div class="d">
                                <el-date-picker
                                  v-model="params.strSellPlanDeliveryDate"
                                  type="date"
                                  value-format="timestamp"
                                  placeholder="开始日期">
                                </el-date-picker>
                            </div>
                            <div class="c">至</div>
                            <div class="d">
                                <el-date-picker
                                  v-model="params.endSellPlanDeliveryDate"
                                  type="date"
                                  value-format="timestamp"
                                  placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">实际销售交割日</span>
                        <div class="searchDate">
                            <div class="d">
                                <el-date-picker
                                  v-model="params.strSellActualDeliveryDate"
                                  type="date"
                                  value-format="timestamp"
                                  placeholder="开始日期">
                                </el-date-picker>
                            </div>
                            <div class="c">至</div>
                            <div class="d">
                                <el-date-picker
                                  v-model="params.endSellActualDeliveryDate"
                                  type="date"
                                  value-format="timestamp"
                                  placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </div>
                        <span v-if="isShowSearch" class="search" @click="search()"><i class="iconfont icon-search"></i></span>
                    </div>
                </template>
                <span class="advancedSearch" @click="ShowSearch">高级搜索<i class="el-input__icon" :class="isShowSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
            </div>
        </div>
        <div class="table_padding">
            <div class="gy-table">
                <el-table
                        :data="deliveryList"
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
                            width="240">
                        <template slot-scope="scope">
                            <span>{{scope.row.sellerCompanyName}}</span><br>
                            <span>{{scope.row.buyerCompanyName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="交割状态"
                            width="100">
                        <template slot-scope="scope">
                            <span>{{scope.row.buyDeliveryStatus | deliveryState}}</span><br>
                            <span>{{scope.row.sellDeliveryStatus | deliveryState}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            v-bind:label="'采购交割日期\n销售交割日期'"
                            width="220">
                        <template slot-scope="scope">
                            <span>{{scope.row.buyPlanDeliveryDate}}</span><br>
                            <span>{{scope.row.sellPlanDeliveryDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            v-bind:label="'实际采购交割日期\n实际销售交割日期'"
                            width="180">
                        <template slot-scope="scope">
                            <span>{{scope.row.buyActualDeliveryDate | date(0)}}</span><br>
                            <span>{{scope.row.sellActualDeliveryDate | date(0)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="数量(吨)"
                            width="120">
                        <template slot-scope="scope">
                            <span>{{scope.row.skuQuantity}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="已交割数量(吨)"
                            width="160">
                        <template slot-scope="scope">
                            <span>{{scope.row.buyAlreadyDeliveryQuantity}}</span><br>
                            <span>{{scope.row.sellAlreadyDeliveryQuantity}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            v-bind:label="'采购合同编号\n销售合同编号'"
                            width="200">
                        <template slot-scope="scope">
                            <span>{{scope.row.buyContractCode}}</span><br>
                            <span>{{scope.row.sellContractCode}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="创建时间"
                            width="200">
                        <template slot-scope="scope">
                            <span>{{scope.row.buyUpdatedDate | date(1)}}</span><br>
                            <span>{{scope.row.sellUpdatedDate | date(1)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="110">
                        <template slot-scope="scope">
                            <button class="gy-button-view view" @click="detail(scope.row)">查看</button>
                            <span v-if="scope.row.SellAlarmSign === 1 || scope.row.buyAlarmSign === 1" style="padding-left: 8px">
                          <img src="../../assets/images/icons/icon-sign.jpg" height="19" width="19"/>
                        </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        当前页合计&nbsp;&nbsp;未完成采购交割合同数：<em>{{currPagebuyCount}}</em>
                        <span class="r">未完成销售交割合同数：{{currPageSellCount}}</span>
                    </div>
                </el-col>
                <el-col :span="24"><div class="grid-content bg-purple">
                    所有页合计&nbsp;&nbsp;未完成采购交割合同数：<em>{{allPageBuyCount}}</em>
                    <span class="r">未完成销售交割合同数：{{allPageSellCount}}</span>
                </div></el-col>
            </el-row>
        </div>
    <!-- 翻页 -->
    <el-pagination
      background
      :current-page.sync = "params.pageNo"
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
    name: 'list',
    data () {
        return {
            params: {
                pageSize: 10,
                pageNo: 1
            },
            isSearchs: false,
            deliveryList: [],
            isShowSearch: false,
            total: null,
            deliveryStatusList: [{
                id: null,
                value: '全部'
            }, {
                id: 0,
                value: '交割中'
            }, {
                id: 1,
                value: '已完成'
            }, {
                id: 2,
                value: '未交割'
            }],
            currPageSellCount: 0,
            currPagebuyCount: 0,
            allPageSellCount: 0,
            allPageBuyCount: 0
        };
    },
    mounted () {
        // 获取交割信息
        this.getlist();
        this.allPageCount();
    },
    methods: {
        // 跳转详情
        detail (item) {
            console.log(item);
            this.$router.push({name: 'deliveryDetail', query: {id: item.id, saleOrderId: item.saleOrderId, purchaseOrderId: item.purchaseOrderId}});
        },
        getlist () {
            const me = this;
            this.$http.post(this.$api.delivery.getlist, this.params).then(function (response) {
                if (response.data.code === 0) {
                    me.deliveryList = response.data.data.rows;
                    me.total = response.data.data.total;
                    me.pageCount(me.deliveryList);
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
            this.params.endBuyPlanDeliveryDate = this.params.endBuyPlanDeliveryDate + 86399000;
            this.params.endBuyActualDeliveryDate = this.params.endBuyActualDeliveryDate + 86399000;
            this.params.endSellPlanDeliveryDate = this.params.endSellPlanDeliveryDate + 86399000;
            this.params.endSellActualDeliveryDate = this.params.endSellActualDeliveryDate + 86399000;
            this.getlist();
        },
        // 分页
        handleCurrentChange (r) {
            this.params.pageNum = r;
            this.getlist();
        },
        turnPage () {},
        pageCount (list) {
            // 当前页面的统计
            var pageList = list.map(data => {
                if (data.sellDeliveryStatus !== 1) {
                    return '未完成';
                }
            });
            pageList = pageList.join(',');
            this.currPageSellCount = pageList.split('未完成').length - 1;
            pageList = list.map(data => {
                if (data.buyDeliveryStatus !== 1) {
                    return '未完成';
                }
            });
            pageList = pageList.join(',');
            this.currPagebuyCount = pageList.split('未完成').length - 1;
        },
        allPageCount () {
            // 所有页面的统计
            this.$http.get(this.$api.delivery.allPageStatusCount).then((response) => {
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

    }
};
</script>

<style scoped lang="scss">
    .delivery{
        padding-bottom: 30px;
        .deliverySeachAll{
            position: relative;
            margin: 47px 0 20px;
            .deliverySeach{
                .advancedSearch {
                    position: absolute;
                    right: 30px;
                    top: -30px;
                    cursor: pointer;
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
                .search {
                    position: absolute;
                    right: 15px;
                    bottom: 15px;
                    line-height: 1;
                }
            }
        }
        .table_padding{
            font-size: 12px;
            padding:0 16px;
        }
        .gy-table {
          .view {
            display: inline-block;
            background-color: #fff;
          }
        }
        /*GYfrom padding修改*/
        .gy-form-group{
            padding:8px 30px 8px 138px;
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
      background: #ecf5ff;
    }
    .bg-purple {
      background: #ecf5ff;
      padding-left: 10px;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      height: 36px;
      line-height: 36px;
      em {
        min-width: 30px;
        display: inline-block;
      }
      .r {
        margin-left: 10px;
      }
    }
</style>
<style lang="scss">
    .delivery{
        .el-table .cell{
            white-space:pre-line;
            font-size: 12px;
            color:#666666;
        }
    }
    .delivery{
        .gy-table thead td, .gy-table thead th{
            font-weight: bold;
        }
    }
</style>
