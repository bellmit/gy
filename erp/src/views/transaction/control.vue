<template>
    <div class="standingBook control">
      <!-- 高级搜索 -->
      <div class="search-btn">
        <!-- <div class="title">准现货交易管控表</div> -->
        <span @click="ShowSearch" class="search-h">高级搜索<i class="el-input__icon" :class="isShowSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
      </div>
      <div class="my-search clearfix">
        <div class="gy-form-group">
          <span class="l">下游公司</span>
          <input type="text" placeholder="请输入" v-model="search.buyerCompanyName">
        </div>
        <div class="gy-form-group" :class="{'last-active': !isShowSearch}">
          <span class="l">上游公司</span>
          <input type="text" placeholder="请输入" v-model="search.sellerCompanyName">
        </div>
        <div class="search-form" v-if="isShowSearch">
          <div class="gy-form-group">
            <span class="l">销售合同编号</span>
            <input type="text" placeholder="请输入" v-model="search.purchaseContractCode">
          </div>
          <div class="gy-form-group">
            <span class="l">采购合同编号</span>
            <input type="text" placeholder="请输入" v-model="search.saleContractCode">
          </div>
          <div class="gy-form-group">
            <span class="l">销售交割库</span>
            <input type="text" placeholder="请输入" v-model="search.purchaseDeliveryWarehouseName">
          </div>
          <div class="gy-form-group">
            <span class="l">采购交割库</span>
            <input type="text" placeholder="请输入" v-model="search.saleContractDate">
          </div>
          <div class="gy-form-group">
            <span class="l">销售合同日期</span>
            <div class="searchDate">
              <div class="d">
                <el-date-picker
                  v-model="search.saleContractStartDate"
                  type="date"
                  value-format="timestamp"
                  placeholder="开始日期">
                </el-date-picker>
              </div>
              <div class="c">至</div>
              <div class="d">
                <el-date-picker
                  v-model="search.saleContractEndDate"
                  @change="search.saleContractEndDate = $tools.convertDateEnd(search.saleContractEndDate)"
                  type="date"
                  value-format="timestamp"
                  placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="gy-form-group">
            <span class="l">采购合同日期</span>
            <div class="searchDate">
              <div class="d">
                <el-date-picker
                  v-model="search.purchaseContractStartDate"
                  type="date"
                  value-format="timestamp"
                  placeholder="开始日期">
                </el-date-picker>
              </div>
              <div class="c">至</div>
              <div class="d">
                <el-date-picker
                  v-model="search.purchaseContractEndDate"
                  @change="search.purchaseContractEndDate = $tools.convertDateEnd(search.purchaseContractEndDate)"
                  type="date"
                  value-format="timestamp"
                  placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="gy-form-group">
            <span class="l">产品名称</span>
            <input type="text" placeholder="请输入" v-model="search.stuName">
          </div>
          <div class="gy-form-group" :class="{'last-active': isShowSearch}">
            <span class="l">业务操作人</span>
            <input type="text" placeholder="请输入" v-model="search.businessManagerName">
          </div>
        </div>
        <span class="searchicon" @click="init(9)"><i class="iconfont icon-search"></i></span>
      </div>
      <!-- 报表切换 -->
      <div class="tabs cl">
        <ul>
          <li v-for="(item, index) in tabs" :key="index" :class="{'active': index === activeId}" @click="tabClick(index)">
            <span>{{item.value}}</span>
          </li>
        </ul>
      </div>
      <!-- table -->
      <div class="box">
        <table class="gy-table">
          <thead>
            <tr>
                <th width="80px">合同要素ID</th>
                <th width="120px">合同编号</th>
                <th width="80px">合同日期</th>
                <th width="60px">品名</th>
                <th width="180px">上游公司</th>
                <th width="180px">下游公司</th>
                <th width="110px">交货地点</th>
                <th width="80px" v-show="this.activeId !== 3">保证金比例</th>
                <th width="100px" v-show="this.activeId === 0 || this.activeId === 1">涨跌约定</th>
                <th width="100px" v-show="this.activeId === 0 || this.activeId === 2 || this.activeId === 3">合同完成进度</th>
                <th width="100px" v-show="this.activeId === 0 || this.activeId === 3">盈亏计算(元)</th>
                <th width="80px">数量(吨)</th>
                <th width="120px">交易单价(元/吨)</th>
                <th width="130px">采购合同总金额(元)</th>
                <th width="130px">销售合同总金额(元)</th>
                <th width="120px">业务组</th>
            </tr>
          </thead>
          <tbody v-if="this.tableData.length !== 0">
            <tr v-for="(item, index) in tableData" :key="index">
              <td width="80px"><router-link :to="{ name: 'orderDetails', query: { id: item.id }}"><em style="color: #409EFF;">{{item.id}}</em></router-link></td>
              <td width="120px">
                <span v-if="item.purchaseContractCode||item.saleContractCode">{{item.purchaseContractCode}}<br>{{item.saleContractCode}}</span>
                <span v-else>-</span>
              </td>
              <td width="80px">
                <span v-if="item.purchaseContractDate||item.saleContractDate">{{item.purchaseContractDate | date}}<br>{{item.saleContractDate | date }}</span>
                <span v-else>-</span>
              </td>
              <td width="60px">{{item.stuName?item.stuName:"-"}}</td>
              <td width="180px">{{item.sellerCompanyName?item.sellerCompanyName:"-"}}</td>
              <td width="180px">{{item.buyerCompanyName?item.buyerCompanyName:"-"}}</td>
              <td width="200px">
                <span v-if="item.purchaseDeliveryWarehouseName||item.saleDeliveryWarehouseName">{{item.purchaseDeliveryWarehouseName}}<br>{{item.saleDeliveryWarehouseName}}</span>
                <span v-else>-</span>
              </td>
              <td width="80px" v-show="activeId !== 3">
                 <span v-if="item.purchaseContractCode">{{item.purchaseDepositAmount?item.purchaseDepositAmount:"0"}}%</span><br>
                 <span v-if="item.saleContractCode">{{item.saleDepositAmount?item.saleDepositAmount:"0"}}%</span>
              </td>
              <td width="100px" v-show="activeId === 0 || activeId === 1">
                <span v-if="item.purchaseDepositRatio||item.saleDepositRatio">{{item.purchaseDepositRatio}}<br>{{item.saleDepositRatio}}</span>
                <span v-else>跌 0% 补 0 %</span>
              </td>
              <td width="100px" v-show="activeId === 0 || activeId === 2 || activeId === 3">
                  <span v-if="item.purchaseContractCode">{{parseInt(item.purchaseContractSchedule * 100)}}%</span><br>
                  <span v-if="item.saleContractCode">{{parseInt(item.saleContractSchedule * 100)}}%</span>
              </td>
              <td class="text-r" width="100px" v-show="activeId === 0 || activeId === 3">
                <span v-if="item.purchaseProfitLossAccount">{{item.purchaseProfitLossAccount| numToCash}}</span>
                <span v-else>-</span>
              </td>
              <td class="text-r" width="80px">
                  <span  v-if="item.purchaseContractCode">{{item.purchaseSkuQuantity |numToQuantity}}</span><br>
                  <span v-if="item.saleContractCode">{{item.saleSkuQuantity |numToQuantity}}</span></td>
              <td class="text-r" width="120px">
                  <span v-if="item.purchaseContractCode">{{item.purchaseSkuPrice |numToCash(true)}}</span><br>
                  <span  v-if="item.saleContractCode">{{item.saleSkuPrice |numToCash(true)}}</span></td>
              <td class="text-r" width="130px">{{item.purchaseTotalAmount | numToCash}}</td>
              <td class="text-r" width="130px">{{item.saleTotalAmount | numToCash}}</td>
              <td width="120px">{{item.usrOrganization?item.usrOrganization:"-"}}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="8" style="text-align: center;">没有找到可显示的数据...</td>
            </tr>
          </tbody>
        </table>
      </div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    <span style="width:120px">所有页合计</span>采购数量(吨):<span style="width:150px">{{all.purchaseSkuQuantityTotal|numToQuantity}}</span>采购合同总金额(元):<span>{{all.purchaseTotalAmountTotal | numToCash}}</span>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="grid-content bg-purple">
                    <span style="width:120px">&nbsp;</span>销售数量(吨):<span style="width:150px">{{all.saleSkuQuantityTotal|numToQuantity}}</span>销售合同总金额(元):<span>{{all.saleTotalAmountTotal | numToCash}}</span>
                </div>
            </el-col>
        </el-row>
      <div class="departmentName">共 {{total}} 条记录</div>
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
    data () {
        return {
            total: 30,
            // 报表临时数据
            tableData: [],
            value: 1,
            //
            dialogVisible: false,
            isShowSearch: false,
            all: {},
            search: {
                pageNo: 1,
                pageSize: 10,
                purchaseContractCode: null,
                saleContractCode: null,
                stuName: null,
                purchaseDeliveryWarehouseName: null,
                saleContractDate: null,
                buyerCompanyName: null,
                sellerCompanyName: null,
                purchaseContractStartDate: null,
                purchaseContractEndDate: null,
                saleContractStartDate: null,
                saleContractEndDate: null,
                businessManagerName: null
            },
            tabs: [
                {
                    id: '',
                    value: '合同总控表',
                    data: null
                },
                {
                    id: 1,
                    value: '保证金监控表',
                    data: null
                },
                {
                    id: 2,
                    value: '交割监控表',
                    data: null
                },
                {
                    id: 3,
                    value: '盈亏监控表',
                    data: null
                }
            ],
            activeId: 0
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            this.$http.post(this.$api.statement.control, this.search).then((res) => {
                let data = res.data.data;
                this.total = data.total;
                this.tableData = data.rows;
                this.all.purchaseSkuQuantityTotal = data.purchaseSkuQuantityTotal;
                this.all.purchaseTotalAmountTotal = data.purchaseTotalAmountTotal;
                this.all.saleSkuQuantityTotal = data.saleSkuQuantityTotal;
                this.all.saleTotalAmountTotal = data.saleTotalAmountTotal;
            });
        },
        // 分页
        turnPage (v) {
            this.search.pageNo = v;
            this.init();
        },
        ShowSearch () {
            this.isShowSearch = !this.isShowSearch;
        },
        // tabs切换
        tabClick (i) {
            this.activeId = i;
        }
    }
};
</script>

<style lang="scss" scoped>
  .control {
    .gy-form-group {
      padding: 6px 40px 6px 126px;
    }
    .departmentName{
        margin: 20px 0 0 16px;
        font-size: 12px;
        color: #666;
    }
    .box {
      margin: 0 16px;
      overflow-x: scroll;
    }
    .gy-table {
      width: 2250px;
      color: #666666;
      font-size: 12px;
      th{
        font-weight: bold;
        color: #666666;
        // padding: 9px 0 9px 20px;
      }
    }
    .search-btn {
      float: none;
      .title {
        font-size: 18px;
        color: #333333;
        text-align: left;
        display: inline-block;
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
      color: white;
      padding-left: 10px;
  }
  .bg-purple-light {
      background: #e5e9f2;
  }
  .bg-purple {
      background: #d3dce6;
      padding-left: 10px;
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

</style>
