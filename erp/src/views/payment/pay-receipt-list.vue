<!-- 收款列表 -->
<template>
  <div class="payment-list">
    <div class="search-btn">
        <span class="advancedSearch" @click="ShowSearch">高级搜索<i class="el-input__icon" :class="isShowSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
    </div>
    <div class="search-wrapper">
        <div class="gy-form-group">
            <span class="l">合同要素ID</span>
            <input type="text" v-model="search.essenceId" placeholder="请输入合同要素ID">
        </div>
        <div class="gy-form-group">
            <span class="l">产品名称</span>
            <input type="text" v-model="search.prodName" placeholder="请输入产品名称">
        </div>
        <div class="gy-form-group">
          <span class="l">下游公司</span>
          <input type="text" v-model="search.buyerCompanyName" placeholder="请输入下游公司名称">
        </div>
        <div class="gy-form-group">
            <span class="l">申请收款日期</span>
            <div class="searchDate">
                <div class="d">
                    <el-date-picker
                    v-model="search.collectionCreatedDateStart"
                    type="date"
                    value-format="timestamp"
                    placeholder="开始日期">
                    </el-date-picker>
                </div>
                <div class="c">至</div>
                <div class="d">
                    <el-date-picker
                    v-model="search.collectionCreatedDateEnd"
                    type="date"
                    value-format="timestamp"
                    @change="search.collectionCreatedDateEnd = $tools.convertDateEnd(search.collectionCreatedDateEnd)"
                    placeholder="结束日期">
                    </el-date-picker>
                </div>
                <span class="searchicon" @click="getlist" style="right: -15px; top: 8px;" v-if="!isShowSearch"><i
                class="iconfont icon-search"></i></span>
            </div>
        </div>
        <template v-if="isShowSearch">
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
                        @change="search.collectionDateEnd = $tools.convertDateEnd(search.collectionDateEnd)"
                        placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </div>
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
                <span class="searchicon" @click="getlist" style="right: 15px; top: 15px;" v-if="isShowSearch"><i
                    class="iconfont icon-search"></i></span>
            </div>
        </template>
        <div class="clearfix"></div>
    </div>
    <div style="padding: 0 16px">
      <div class="gy-table">
        <el-table
          :data="list"
          style="width: 100%">
          <el-table-column
            fixed
            label="ID"
            width="100">
            <template slot-scope="scope">
              <span>{{scope.row.contractId}}</span>
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
            label="下游公司" :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <span>{{scope.row.buyerCompanyName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="160">
            <template slot-scope="scope">
                <span>{{scope.row.collectionStateStr}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="应收款(元)"
            class-name="amount-right-el"
            width="125">
            <template slot-scope="scope">
                <template v-if="scope.row.sellerOrderId">
                    <span v-if="scope.row.saleSkuPriceType === 21 || scope.row.saleSkuPriceType === 22">公式计价</span>
                    <span v-else>{{scope.row.shouldCollectionTotal | numToCash}}</span>
                </template>
            </template>
          </el-table-column>
          <el-table-column
            label="待收款(元)"
            class-name="amount-right-el"
            width="125">
            <template slot-scope="scope">
                <template v-if="scope.row.sellerOrderId">
                    <span v-if="scope.row.saleSkuPriceType === 21 || scope.row.saleSkuPriceType === 22">--</span>
                    <span v-else>{{scope.row.needCollectionTotal | numToCash}}</span>
                </template>
            </template>
          </el-table-column>
          <el-table-column
            label="收款日期"
            width="150">
            <template slot-scope="scope">
              <span>{{scope.row.collectionDate | date}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="销售合同编号"
            width="140">
            <template slot-scope="scope">
              <span>{{scope.row.sellerCcontractCode}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="160">
            <template slot-scope="scope">
              <span>{{scope.row.collectionCreatedDate | date(1)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            class-name="operation-styles-el"
            label="操作"
            width="95">
            <template slot-scope="scope">
              <button type="button" class="gy-button-view view" @click="showDetail(scope.row)">查看</button>
              <span v-if="scope.row.paymentAlarmSign === 1 || scope.row.collectionAlarmSign === 1" style="">
                  <img src="../../assets/images/icons/icon-sign.jpg" style="margin-bottom:5px" height="19" width="19"/>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
        <listStatistics @toggleTabs="toggleTabs">
            <div class="list-statistics-item">
                <div><span>申请付款(元)</span><span class="span-money">{{ statisticsShow.applyAmount | numToCash }}</span></div>
                <div><span>申请付款笔数(笔)</span><span>{{ statisticsShow.applyPayCount | numToQuantity }}</span></div>
                <div><span>申请收款(元)</span><span class="span-money">{{ statisticsShow.applyCollectAmount | numToCash }}</span></div>
                <div><span>申请收款笔数(单)</span><span>{{ statisticsShow.applyCollectCount | numToQuantity }}</span></div>
                <div><span>已付款(元)</span><span class="span-money">{{ statisticsShow.paidAmount | numToCash }}</span></div>
                <div><span>已付款笔数(笔)</span><span>{{ statisticsShow.paidCount | numToQuantity }}</span></div>
                <div><span>已收款(元)</span><span class="span-money">{{ statisticsShow.collectedAmount | numToCash }}</span></div>
                <div><span>已收款合同(单)</span><span>{{ statisticsShow.collectedCount | numToQuantity }}</span></div>
            </div>
        </listStatistics>
    </div>
    <!-- 翻页 -->
    <el-pagination
      background
      :total="total"
      layout="prev, pager, next"
      style="margin-top: 40px;"
      :current-page.sync="search.pageNo"
      @current-change="turnPage">
    </el-pagination>
  </div>
</template>

<script>
import listStatistics from './../components/listStatistics';
export default {
    data () {
        return {
            isShowSearch: false,
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
                contractType: 3, // 销售
                pageNo: 1, // 页码（从1开始）默认1
                pageSize: 10 // 每页大小（未设置时取后台设置默认值）
            },
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
            statisticsShow: {
                applyAmount: 0, // 申请付款(元)
                paidAmount: 0, // 已付款(元)
                applyPayCount: 0, // 申请付款笔数(笔)
                paidCount: 0, // 已付款笔数(笔)
                applyCollectAmount: 0, // 申请收款(元)
                collectedAmount: 0, // 已收款(元)
                applyCollectCount: 0, // 申请收款笔数(笔)
                collectedCount: 0 // 已收款笔数(笔)
            }
        };
    },
    methods: {
        toggleTabs (idx) {
            this.$http.get(this.$api.payment.collectionPaymentCount + '?countType=' + idx)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.statisticsShow = res.data.data;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        getlist () {
            let params = {};
            Object.keys(this.search).forEach((k) => {
                params[k] = this.search[k];
            });
            params.paymentQueryType = '3';
            this.$http.post(this.$api.payment.getlist, params)
                .then((response) => {
                    if (response.data.code === 0) {
                    // 去结果画面
                        this.list = response.data.data.paymentAndCollectionDtos;
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
        turnPage (e) { // 分页切换
            this.search.pageNo = e;
            this.getlist();
        },
        showDetail (row) { // 收付款单详情
            let query = {
                id: row.contractId, // 合同要素id
                purchaseOrderId: row.purchaseOrderId, // 采购单号
                sellerOrderId: row.sellerOrderId, // 销售单号
                activeType: 3 // 表示只查看收款
            };
            this.$router.push({name: 'paymentDetail', query: query});
        }
    },
    activated () {
        if (!this.$route.meta.isBack) {
            this.search = {
                contractType: 3
            };
            this.getlist();
        }
        this.$route.meta.isBack = false;
    },
    created () {
        // 获取付款单信息
        // this.getlist();
        this.toggleTabs(1);
    },
    components: {listStatistics}
};
</script>

<style lang="scss" scoped>
    .payment-list {
        /*padding: 0 16px;*/
    }
    .search-btn {
        text-align: right;
        margin: 20px 25px 10px 0;
        .advancedSearch {
            cursor: pointer;
        }
    }
  .search-wrapper {
    padding: 10px 0 22px 0;
    position: relative;
    .gy-form-group {
      height: 46px;
      padding-left: 115px;
      .l {
        width: 115px;
      }
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
      right: 30px;
      top: 20px;
      line-height: 1;
      cursor: pointer;
    }
    .el-input__icon {
      line-height: 1;
      width: 14px;
      margin-left: 5px;
    }
    .searchicon {
      position: absolute;
      right: 15px;
      bottom: 15px;
      line-height: 1;
    }
  }

  .search-wrapper-open {
    .gy-form-group:nth-child(even) {
      padding-right: 46px;
    }
  }

  .tab-wrapper {
    position: relative;
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
  .payment-list {
    .el-table__body {
      .el-table__row {
          .operation-styles-el {
              .cell {
                  text-align: left;
              }
          }
      }
    }
    .cell {
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
    .el-table__body tr.hover-row > td {
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

  .el-table .cell {
    white-space: pre-line;
  }
</style>
