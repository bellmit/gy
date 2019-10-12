<!-- 合同要素列表 -->
<template>
  <div class="contract contract-list">
    <div class="search-wrapper">
      <div class="search-form">
        <div class="gy-form-group" style="height: 46px">
          <span class="l">合同要素ID</span>
          <input type="text" v-model="search.id" placeholder="请输入合同要素ID">
        </div>
        <div class="gy-form-group" style="height: 46px">
          <span class="l">产品名称</span>
          <input type="text" v-model="search.prodName" placeholder="请输入产品名称">
        </div>
        <div class="gy-form-group">
          <span class="l">上游公司</span>
          <input type="text" v-model="search.sellerCompanyName" placeholder="请输入上游公司名称">
        </div>
        <div class="gy-form-group">
          <span class="l">下游公司</span>
          <input type="text" v-model="search.buyerCompanyName" placeholder="请输入下游公司名称">
          <span class="searchicon" @click="getList" v-if="!isShowSearch"><i class="iconfont icon-search"></i></span>
        </div>
        <template v-if="isShowSearch">
          <div class="gy-form-group">
          <span class="l">状态</span>
          <el-select v-model="search.contEssenceStatus" placeholder="请选择">
            <el-option
              v-for="item in $constant.orderStatusList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
          <div class="gy-form-group">
            <span class="l">业务操作人</span>
            <input type="text" v-model="search.businessManagerName" placeholder="请输入业务操作人名称">
          </div>
          <div class="gy-form-group">
            <span class="l">业务类型</span>
            <el-select v-model="search.bizType" placeholder="请选择">
              <el-option
                v-for="item in $constant.bizType4CreateEss"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="gy-form-group">
            <span class="l">创建日期</span>
            <div class="searchDate">
              <div class="d">
                <el-date-picker
                  v-model="search.staCreatedDate"
                  type="date"
                  value-format="timestamp"
                  placeholder="开始日期">
                </el-date-picker>
              </div>
              <div class="c">至</div>
              <div class="d">
                <el-date-picker
                  v-model="search.endCreatedDate"
                  type="date"
                  value-format="timestamp"
                  placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
            <span class="searchicon" @click="getList"><i class="iconfont icon-search"></i></span>
          </div>
        </template>
        <div class="clearfix"></div>
      </div>
      <span class="search-btn" @click="isShowSearch = !isShowSearch">高级搜索<i class="el-input__icon"
                                                                            :class="isShowSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
    </div>
    <div class="ess-list">
      <div class="gy-table">
        <el-table
          :data="dataList"
          style="width: 100%">
          <el-table-column
            fixed
            :show-overflow-tooltip="true"
            :label="'ID\n产品名称'"
            width="110">
            <template slot-scope="scope">
              <span>{{scope.row.id}}</span><span v-if="scope.row.sourceContEssId"> ({{scope.row.sourceContEssId}})</span><br>
              <span>{{scope.row.prodName}}</span>
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
            :label="'上游公司\n下游公司'"
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
            prop="name"
            label="状态"
            width="180">
            <template slot-scope="scope">
              <span>{{$constant.orderStatus[scope.row.approveStatus]}}</span><br v-if="scope.row.currentTodoUserName">
              <span>{{scope.row.currentTodoUserName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="'采购交割日期\n销售交割日期'"
            width="240">
            <template slot-scope="scope">
              <span>{{scope.row.planBuyDlvyDate}}</span><br v-if="scope.row.planBuyDlvyDate !== null">
              <span>{{scope.row.planSaleDlvyDate}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="总金额(元)"
            class-name="amount-right-el"
            width="150">
            <template slot-scope="scope">
                <template v-if="scope.row.purchaseOrderId">
                    <span v-if="scope.row.buySkuPriceType === 21 || scope.row.buySkuPriceType === 22">公式计价</span>
                    <span v-else>{{scope.row.buyTotal | numToCash}}</span><br>
                </template>
                <template v-if="scope.row.saleOrderId">
                    <span v-if="scope.row.saleSkuPriceType === 21 || scope.row.saleSkuPriceType === 22">公式计价</span>
                    <span v-else>{{scope.row.saleTotal | numToCash}}</span>
                </template>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="业务操作人"
            width="120">
            <template slot-scope="scope">
              <span>{{scope.row.businessManagerName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="创建时间"
            width="180">
            <template slot-scope="scope">
              <span>{{scope.row.createdDate | date(scope.row.createdDate)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            class-name="operation-styles-el"
            width="71">
            <template slot-scope="scope">
              <button style="background-color: #fff" type="button" class="gy-button-view" @click="showDetail(scope.row)">查看</button>
            </template>
          </el-table-column>
        </el-table>
      </div>
        <listStatistics @toggleTabs="toggleTabs">
            <div class="list-statistics-item">
                <div class="list-statistics-item-l list-statistics-item-r"><span>新增采购单数(单)</span><span>{{statisticsShow.newPurchaseCount | numToQuantity}}</span></div>
                <div class="list-statistics-item-l list-statistics-item-r"><span>已双签采购单数(单)</span><span>{{statisticsShow.signedPurchaseCount | numToQuantity}}</span></div>
                <div class="list-statistics-item-l list-statistics-item-r"><span>未双签采购单数(单)</span><span>{{statisticsShow.unsignedPurchaseCount | numToQuantity}}</span></div>
                <div class="list-statistics-item-l list-statistics-item-r"><span>新增销售单数(单)</span><span>{{statisticsShow.newSellCount | numToQuantity}}</span></div>
                <div class="list-statistics-item-l list-statistics-item-r"><span>已双签销售单数(单)</span><span>{{statisticsShow.signedSellCount | numToQuantity}}</span></div>
                <div class="list-statistics-item-l list-statistics-item-r"><span>未双签销售单数(单)</span><span>{{statisticsShow.unsignedSellCount | numToQuantity}}</span></div>
            </div>
        </listStatistics>
      <span class="total-number">共 {{total}} 条记录</span>
    </div>
    <!-- 翻页 -->
    <el-pagination
      background
      :total="total"
      layout="prev, pager, next"
      @current-change="turnPage">
    </el-pagination>
  </div>
</template>

<script>
import listStatistics from './../components/listStatistics';
export default {
    data () {
        return {
            total: null,
            isShowSearch: false,
            value: '',
            dataList: [
                // {
                //     id: null, // 合同要素ID
                //     prodName: null, // 商品名称
                //     buyerCompanyName: null, // 下游公司名称
                //     sellerCompanyName: null, // 上游公司名称
                //     approveStatus: null, // 订单状态
                //     businessManagerId: null, // 业务操作人ID
                //     businessManagerName: null, // 业务操作人名称
                //     createdDate: null, // 创建时间（格式：yyyy-MM-dd HH:mm:ss）
                //     planBuyDlvyDate: null, // 计划采购交割日（这里可能是时间区间，也可能是文字描述，前端直接展示，无需再处理）
                //     actualBuyDlvyDate: null, // 实际采购交割日（这里是一个具体的日期）
                //     planSaleDlvyDate: null, // 计划销售交割日
                //     actualSaleDlvyDate: null, // 实际销售交割日
                //     buyTotal: null, // 采购总金额（直接展示，带格式带单位：0.00元）
                //     saleTotal: null, // 销售总金额
                //     paidTotal: null, // 已付采购金额（直接展示，带格式带单位：0.00元）
                //     receivedTotal: null, // 已收销售金额
                //     buyDlvyStatus: null, // 采购交割状态
                //     saleDlvyStatus: null, // 销售交割状态
                //     buyReceiptStatus: null, // 收票状态
                //     saleReceiptStatus: null// 开票状态
                // }
            ],
            search: {
                pageNo: 1, // 页码（从1开始）默认1
                pageSize: 10, // 每页大小（未设置时取后台设置默认值）
                prodName: null, // 商品名称
                sellerCompanyName: null, // 上游公司名称
                buyerCompanyName: null, // 下游公司名称
                businessManagerName: null, // 业务操作人名称
                contEssenceStatus: null, // 合同要素状态
                bizType: null, // 业务类型
                id: null, // 合同要素id
                staCreatedDate: null, // 创建时间-开始（格式：yyyyMMdd000000）
                endCreatedDate: null // 创建时间-结束（格式：yyyyMMdd235959）
            },
            statisticsShow: {
                newPurchaseCount: 0, // 新增采购统计
                signedPurchaseCount: 0, // 采购双签统计
                unsignedPurchaseCount: 0, // 未双签采购统计
                newSellCount: 0, // 新增销售统计
                signedSellCount: 0, // 双签销售统计
                unsignedSellCount: 0// 未双签销售统计
            }
        };
    },
    activated () {
        // 获取付款单信息
        if (!this.$route.meta.isBack) {
            this.search = {};
            this.getList();
        }
        this.$route.meta.isBack = false;
    },
    methods: {
        toggleTabs (idx) {
            this.$http.get(this.$api.contract.allPageStatusCount + '?countType=' + idx)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.statisticsShow = res.data.data;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        getList () {
            let params = {};
            Object.keys(this.search).forEach((k) => {
                params[k] = this.search[k];
            });
            if (params.endCreatedDate !== null && params.endCreatedDate !== '') {
                params.endCreatedDate = params.endCreatedDate + 1000 * 60 * 60 * 24 - 1;
            }
            this.$http.post(this.$api.contract.getlist, params).then((response) => {
                if (response.data.code === 0) {
                    // 去结果画面
                    this.dataList = response.data.data.rows;
                    this.total = response.data.data.total;
                } else {
                    this.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        showDetail (row) { // 合同要素详情
            let query = {
                id: row.id // 合同要素id
            };
            this.$router.push({name: 'contEssDetailmenu', query: query});
        },
        turnPage (e) {
            this.search.pageNo = e;
            this.getList();
        }
    },
    created () {
        // 获取付款单信息
        // this.getList();
        this.toggleTabs(1);
    },
    components: {listStatistics}
};
</script>

<style scoped lang="scss">

    .wid-overflow {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
  .gy-form-group {
    padding-left: 111px;
    .l {
      width: 101px;
    }
  }

  .gy-form-group:nth-child(even) {
    padding-right: 46px;
  }

  .search-wrapper {
    padding: 50px 0 22px 0;
    position: relative;
    .search-form {
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
      cursor: default;
    }
    .searchicon {
      position: absolute;
      right: 31px;
      bottom: 15px;
      line-height: 1;
    }
  }

  .container-fluid .el-input__icon {
    line-height: 1;
    width: 14px;
    margin-left: 5px;
  }

  .contract {
    .contractSearch {
      .gy-form-group {
        width: 42%;
      }
    }
  }

  .cont-css-list {
    overflow-x: auto;
    overflow-y: hidden;
    .gy-table {
      min-width: 1575px;
    }
  }

  /deep/ .el-table .cell {
    white-space: pre-line;
  }

  .ess-list {
    padding: 0 16px;
  }
</style>
<style lang="scss">
  .contract-list {
    .cell {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      span {
        overflow: hidden;
        white-space: nowrap;
        word-break: normal;
      }
    }
    .gy-table tr.selected, .gy-table tr:hover {
      background-color: #fff;
    }
    .el-table__body tr.hover-row > td {
      background-color: #f9f9f9;
    }
  }
</style>
