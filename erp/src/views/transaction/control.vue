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
        <div class="gy-form-group">
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
                  @change="change(search.purchaseContractEndDate, 1)"
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
                  @change="change(search.saleContractEndDate, 2)"
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
          <div class="gy-form-group">
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
                <th width="100px">合同编号</th>
                <th width="80px">合同日期</th>
                <th width="60px">品名</th>
                <th width="110px">交货地点</th>
                <th width="80px" v-show="this.activeId !== 3">保证金比例</th>
                <th width="100px" v-show="this.activeId === 0 || this.activeId === 1">涨跌约定</th>
                <th width="100px" v-show="this.activeId === 0 || this.activeId === 2 || this.activeId === 3">合同完成进度</th>
                <th width="100px" v-show="this.activeId === 0 || this.activeId === 3">盈亏计算(含税)</th>
                <th width="80px">数量(吨)</th>
                <th width="120px">交易单价(元/吨)</th>
                <th width="130px">采购合同总金额(元)</th>
                <th width="130px">销售合同总金额(元)</th>
                <th width="180px">上游公司</th>
                <th width="180px">下游公司</th>
                <th width="120px">业务组</th>
            </tr>
          </thead>
          <tbody v-if="this.tableData.length !== 0">
            <tr v-for="(item, index) in tableData" :key="index">
              <td width="80px">{{item.id}}</td>
              <td width="100px">
                <span v-if="item.purchaseContractCode||item.saleContractCode">{{item.purchaseContractCode}}<br>{{item.saleContractCode}}</span>
                <span v-else>-</span>
              </td>
              <td width="80px">
                <span v-if="item.purchaseContractDate||item.saleContractDate">{{item.purchaseContractDate | date}}<br>{{item.saleContractDate | date }}</span>
                <span v-else>-</span>
              </td>
              <td width="60px">{{item.stuName?item.stuName:"-"}}</td>
              <td width="110px">
                <span v-if="item.purchaseDeliveryWarehouseName||item.saleDeliveryWarehouseName">{{item.purchaseDeliveryWarehouseName}}<br>{{item.saleDeliveryWarehouseName}}</span>
                <span v-else>-</span>
              </td>
              <td width="80px" v-show="activeId !== 3">
                {{item.purchaseDepositAmount?item.purchaseDepositAmount:"0"}}%<br>{{item.saleDepositAmount?item.saleDepositAmount:"0"}}%
              </td>
              <td width="100px" v-show="activeId === 0 || activeId === 1">
                <span v-if="item.purchaseDepositRatio||item.saleDepositRatio">{{item.purchaseDepositRatio}}<br>{{item.saleDepositRatio}}</span>
                <span v-else>跌 0% 补 0 %</span>
              </td>
              <td width="100px" v-show="activeId === 0 || activeId === 2 || activeId === 3">
                {{parseInt(item.purchaseContractSchedule * 100)}}%
                <br>{{parseInt(item.saleContractSchedule * 100)}}%
              </td>
              <td width="100px" v-show="activeId === 0 || activeId === 3">
                <span v-if="item.purchaseProfitLossAccount||item.saleProfitLossAccount">{{item.purchaseProfitLossAccount}}<br>{{item.saleProfitLossAccount}}</span>
                <span v-else>-</span>
              </td>
              <td width="80px">{{item.purchaseSkuQuantity | numToCash}}<br>{{item.saleSkuQuantity | numToCash}}</td>
              <td width="120px">{{item.purchaseSkuPrice | numToCash}}<br>{{item.saleSkuPrice | numToCash}}</td>
              <td width="130px">{{item.purchaseTotalAmount | numToCash}}</td>
              <td width="130px">{{item.saleTotalAmount | numToCash}}</td>
              <td width="180px">{{item.sellerCompanyName?item.sellerCompanyName:"-"}}</td>
              <td width="180px">{{item.buyerCompanyName?item.buyerCompanyName:"-"}}</td>
              <td width="120px">{{item.usrOrganization?item.usrOrganization:"-"}}</td>
            </tr>
            <tr class="total">
              <td colspan="9">总计</td>
              <td colspan="1">{{all.purchaseSkuQuantityTotal}}<br>{{all.saleSkuQuantityTotal}}</td>
              <td colspan="1">{{all.purchaseTotalAmountTotal | numToCash}}</td>
              <td colspan="5">{{all.saleTotalAmountTotal | numToCash}}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="8" style="text-align: center;">没有找到可显示的数据...</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="departmentName">共计{{total}}条记录</div>
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
                    value: '准现货交易合同总控表',
                    data: null
                },
                {
                    id: 1,
                    value: '准现货交易保证金情况监控表',
                    data: null
                },
                {
                    id: 2,
                    value: '准现货交易交割情况监控表',
                    data: null
                },
                {
                    id: 3,
                    value: '准现货交易盈亏情况监控表',
                    data: null
                }
            ],
            activeId: 0,
            // 业务类型
            list: [
                {
                    id: 1,
                    value: '准现货交易'
                }
            ]
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
        change (v, type) {
            type === 1 ? this.search.purchaseContractEndDate = v + 86399000 : this.search.saleContractEndDate = v + 86399000;
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
      margin: 30px 16px 0;
      overflow-x: scroll;
    }
    .gy-table {
      width: 2200px;
      color: #666666;
      font-size: 12px;
      th{
        font-weight: bold;
        color: #666666;
        padding: 9px 0 9px 20px
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
</style>
