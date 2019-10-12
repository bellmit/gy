<template>
    <div class="standingBook">
      <!-- 高级搜索 -->
      <div class="search-btn">
        <span @click="ShowSearch" class="search-h">高级搜索<i class="el-input__icon" :class="isShowSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
      </div>
      <div class="my-search clearfix">
        <div class="gy-form-group">
            <span class="l">合同要素ID</span>
          <input type="text" placeholder="请输入合同要素ID" v-model.trim="search.essenceId">
        </div>
        <div class="gy-form-group">
            <span class="l">业务组</span>
          <input type="text" placeholder="请输入业务组" v-model.trim="search.usrOrganizationName">
        </div>
        <div class="gy-form-group" style="clear: both">
            <span class="l" style="width: 120px">合同签订月份</span>
            <div class="searchDate">
              <div class="d">
                <el-date-picker
                  v-model="search.contractCreateDateS"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="开始日期">
                </el-date-picker>
              </div>
              <div class="c">至</div>
              <div class="d">
                <el-date-picker
                  v-model="search.contractCreateDateE"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
        </div>
        <div class="gy-form-group">
            <span class="l">业务类型</span>
            <el-select v-model="search.bizType">
              <el-option
                v-for="(item, index) in $constant.businessType4Erp"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <span v-if="!isShowSearch" class="searchicon" @click="init()"><i class="iconfont icon-search"></i></span>
          </div>
        <div class="search-form" v-if="isShowSearch" clearable>
          <div class="gy-form-group">
            <span class="l">上游公司</span>
            <input type="text" placeholder="请输入" v-model.trim="search.buyerCompanyName">
          </div>
          <div class="gy-form-group">
            <span class="l">下游公司</span>
            <input type="text" placeholder="请输入" v-model.trim="search.sellerCompanyName">
          </div>
          <div class="gy-form-group" :class="{'last-active': isShowSearch}">
            <span class="l">我方公司</span>
            <input type="text" placeholder="请输入" v-model.trim="search.usrCompanyName">
            <span class="searchicon" @click="init()"><i class="iconfont icon-search"></i></span>
          </div>
        </div>
      </div>
      <!-- 报表切换 -->
      <div class="tabs cl">
        <ul>
          <li v-for="(item, index) in tabs" :key="index" :class="{'active': item.id === activeId ||(activeId===7 &&item.id===6) }" @click="tabClick(item)">
            <span>{{item.value}}</span>
          </li>
        </ul>
        <div class="button-wrap">
          <button class="gy-button-extra mr10" v-if="activeId === 0 || activeId=== 4" @click="checkShowFlagsDiag">自定义列表项</button>
          <button class="gy-button-normal"  @click="exportExcel" v-if="activeId === 0 || activeId=== 4" >下载Excel</button>
        </div>
      </div>

      <!-- 报表 -->
    <div  v-if="activeId === 6 || activeId === 7 ">
    <ul class="tabs">
        <li v-for="(item, index) in tabsChildren" :key="index" :class="{'min-tab-active': item.id === minTabActiveId}" @click="handleClick(index, item.id)">
            <span>{{item.value}}</span>
        </li>
    </ul>
    </div>
      <div class="div">
        <div class="gy-table my-table">
          <template>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                v-if="showFlags[26]" key="contractCode"
                prop="contractCode" fixed
                label="合同要素ID"
                width="120">
              </el-table-column>
              <el-table-column
                v-if="showFlags[37]" key="bizTypeDesc"
                label="业务类型"
                width="120">
                <template slot-scope='item'>
                  <div v-if="item.row.bizType">{{item.row.bizType|businessTradeType}}</div>
                  <div v-else>-</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[39]" key="transactionType"
                label="交易类型"
                width="120">
                <template slot-scope='item'>
                    <div v-if="item.row.transactionType">{{$constant.contractTradeTypeList[item.row.transactionType - 1].name}}</div>
                    <div v-else>-</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[1]" key="organizationName"
                label="业务组"
                width="150">
                <template slot-scope='item'>
                  <div>{{item.row.organizationName?item.row.organizationName:"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[36]" key="businessManagerName"
                label="业务操作人"
                width="120">
                <template slot-scope='item'>
                  <div>{{item.row.businessManagerName?item.row.businessManagerName:"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[80]" key="executiveName"
                label="执行操作人"
                width="120">
                <template slot-scope='item'>
                  <div>{{item.row.executiveName?item.row.executiveName:"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[2]" key="usrCompanyName"
                label="我方公司"
                width="220">
                <template slot-scope='item'>
                  <div>{{item.row.usrCompanyName?item.row.usrCompanyName:"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[3]"  key="prodName"
                label="品名"
                width="100">
                <template slot-scope='item'>
                  <div>{{item.row.prodName?item.row.prodName:"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[40]" key="standard"
                label="规格"
                width="100">
                <template slot-scope='item'>
                  <div>{{item.row.standard?item.row.standard:"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[71]" key="orderExecuteStatus"
                label="执行状态"
                width="220">
                <template slot-scope='item'>
                  <div v-if="item.row.buyOrderExecuteStatus || item.row.sellOrderExecuteStatus">
                    {{item.row.buyOrderExecuteStatus}}
                    {{item.row.sellOrderExecuteStatus}}
                  </div>
                  <div v-else>-</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[27]"  key="buyContractCode"
                label="采购合同编号"
                width="200">
                <template slot-scope='item'>
                    <div>{{item.row.buyContractCode?item.row.buyContractCode:"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[0]" key="buySealPassingTime"
                label="上游签订日"
                width="120">
                <template slot-scope='item'>
                  <div>{{item.row.buySealPassingTime?item.row.buySealPassingTime:"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[76]"  key="buyPlanNumber"
                label="采购纸质合同号"
                width="200">
                <template slot-scope='item'>
                  <div>{{item.row.buyPlanNumber?item.row.buyPlanNumber:"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[77]"  key="buyStatisticalCaliber"
                label="上游统计口径"
                width="200">
                <template slot-scope='item'>
                  <div>{{item.row.buyStatisticalCaliber ?item.row.buyStatisticalCaliber :"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[16]"  key="sellerCompanyName"
                label="上游公司"
                width="220">
                <template slot-scope='item'>
                  <div>{{item.row.buyerCompanyName?item.row.buyerCompanyName:"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[74]" key="buyGrade"
                label="上游公司评级"
                width="130">
                <template slot-scope='item'>
                  <div>{{item.row.buyGrade?item.row.buyGrade:"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[30]" key="buySkuQuantity"
                label="采购合同数量(吨)"
                width="150">
                <template slot-scope='item'>
                  <div class="text-r">{{item.row.buySkuQuantity | numToQuantity}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[6]"   key="buySkuPrice"
                prop="buySkuPrice"
                label="采购单价(元/吨)"
                width="140">
                <template slot-scope='item'>
                  <div class="text-r">{{item.row.buySkuPrice | numToCash(true)}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[7]"  key="buyTotalAmount"
                label="采购合同总金额(元)"
                width="180">
                <template slot-scope='item'><div class="text-r">{{item.row.buyTotalAmount | numToCash}}</div></template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[8]"  key="buyPayTotalAll"
                label="付款总金额(元)"
                width="180">
                <template slot-scope='item'>
                  <div v-if="item.row.buyPayTotalAll!=null" class="text-r">
                    <span>{{item.row.buyPayTotalAll | numToCash}}</span>
                    <el-popover
                      placement="top-start"
                      width="430"
                      v-if="item.row.buyOrderPayTotals.length > 1"
                      trigger="click">
                      <el-table :data="item.row.buyOrderPayTotals">
                        <el-table-column  label="序号" width="60"  type="index"></el-table-column>
                        <el-table-column property="payTotal"  label="付款金额(元)" width="120">
                            <template slot-scope='item'><div>{{item.row.payTotal | numToCash}}</div></template>
                        </el-table-column>
                        <el-table-column property="createdDate" label="付款日期" width="180"></el-table-column>
                      </el-table>
                      <el-button class="gy-button-view" v-if="item.row.buyOrderPayTotals.length>1" slot="reference">明细</el-button>
                    </el-popover>
                  </div>
                  <div v-else class="text-r">0.00</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[50]" key="buyRemainPaymentPay"
                prop="buyRemainPaymentPay"
                label="应付款余额(元)"
                width="150">
                <template slot-scope='item'>
                  <div class="text-r">{{(item.row.buyRemainPaymentPay ) | numToCash}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[32]"   key="remarks2"
                label="单边保证金(元)"
                width="150">
                <template slot-scope='item'>
                  <div class="text-r">{{item.row.buyDepositAmount?item.row.buyDepositAmount:"0"| numToCash}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[43]" key="buyDepositRatio"
                prop="buyDepositRatio"
                label="上游保证金比例"
                width="150">
                <template  slot-scope='item'>{{item.row.buyDepositRatioDesc}}</template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[44]" key="buyDepositRatioSubtract"
                prop="buyDepositRatioSubtract"
                label="上游追保比例"
                width="150">
                <template  slot-scope='item'>{{item.row.buyDepositRatioSADesc}} </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[45]" key="buyPaymentTypeDesc"
                label="上游结算方式"
                width="150">
                <template slot-scope='item'>
                  <div>{{item.row.buyPaymentTypeDesc?item.row.buyPaymentTypeDesc:"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[46]" key="buyIsBatchDeliveryDesc"
                label="上游交割方式"
                width="150">
                <template slot-scope='item'>
                  <div>{{item.row.buyDeliveryTypeDesc?item.row.buyDeliveryTypeDesc:'-'}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[13]"   key="buyDeliveryWarehouseName"
                label="上游实际交割库"
                width="220">
                <template slot-scope='item'>
                  <div>{{item.row.buyDeliveryWarehouseName?item.row.buyDeliveryWarehouseName:'-'}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[15]"  key="planDeliveryDate"
                label="上游交割日"
                width="180">
                <template slot-scope='item'>
                 <div>{{item.row.buyPlanDeliveryDateStr}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[14]"  key="buyDeliveryDate"
                prop="buyDeliveryDate"
                label="上游实际交割日"
                width="200">
                <template slot-scope='item'>
                  <div v-if="item.row.buyDeliveryDates.length > 0">
                    <span>{{item.row.buyDeliveryDates[0].deliveryDate | date}}</span>
                    <el-popover
                      placement="top-start"
                      width="450"
                      v-if="item.row.buyDeliveryDates.length > 1"
                      trigger="click">
                      <el-table :data="item.row.buyDeliveryDates">
                        <el-table-column label="序号" width="60" type="index"></el-table-column>
                        <el-table-column label="上游实际交割数量(吨)" width="180"><template slot-scope='item'>{{item.row.deliveryQuantity | numToQuantity}}</template></el-table-column>
                        <el-table-column property="deliveryDate" label="上游实际交割日期" width="180"></el-table-column>
                      </el-table>
                      <el-button class="gy-button-view" slot="reference"  v-if="item.row.buyDeliveryDates.length>0">明细</el-button>
                    </el-popover>
                  </div>
                  <div v-else>-</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[48]" key="buyAlreadyDeliveryQuantityCount"
                prop="buyAlreadyDeliveryQuantityCount"
                label="累计提货数量(吨)"
                width="150">
                <template slot-scope='item'>
                  <div class="text-r">{{(item.row.buyAlreadyDeliveryQuantityCount ) | numToQuantity}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[49]" key="buyNotAlreadyDeliveryQuantityCount"
                prop="buyNotAlreadyDeliveryQuantityCount"
                label="未提货数量(吨)"
                width="150">
                <template slot-scope='item'>
                  <div class="text-r">{{(item.row.buyNotAlreadyDeliveryQuantityCount ) | numToQuantity}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[62]" key="buyInvoiceReceiptAmount"
                prop="buyInvoiceReceiptAmount"
                label="进项发票总金额(元)"
                width="180">
                <template slot-scope='item'>
                  <div class="text-r">{{(item.row.buyInvoiceReceiptAmount ) | numToCash}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[63]" key="buyInvoiceReceiptQuantity"
                prop="buyInvoiceReceiptQuantity"
                label="进项发票总吨数(吨)"
                width="180">
                <template slot-scope='item'>
                  <div class="text-r">{{(item.row.buyInvoiceReceiptQuantity ) | numToQuantity}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[12]" key="buyReceiptDate"
                label="进项收票日"
                width="150">
                <template slot-scope='item'>
                  <div>{{item.row.buyReceiptDate?item.row.buyReceiptDate:'-'}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[72]" key="orderInvoiceExist"
                prop="orderInvoiceExist"
                label="上游收票情况"
                width="150">
              </el-table-column>
              <el-table-column
                v-if="showFlags[33]"   key="remarks7"
                label="采购合同要素备注"
                width="300">
                <template slot-scope='item'>
                        <el-popover  v-if="item.row.buyRemarks"
                                     placement="top-start"
                                     width="500"
                                     trigger="hover"
                        >
                            <div style="height: 300px;overflow-y:scroll">{{item.row.buyRemarks?item.row.buyRemarks:"-"}}</div>
                            <div class="text-overflow" slot="reference"  >{{(item.row.buyRemarks?item.row.buyRemarks:"-") | cutstring(20)}}</div>
                        </el-popover>
                        <div v-else>-</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[64]"   key="remarks6"
                label="采购合约编号"
                width="180">
                <template slot-scope='item'>
                  <div>{{item.row.buyLongtermContractOrderId?item.row.buyLongtermContractOrderId:"-"}}</div>
                </template>
              </el-table-column>
                <el-table-column
                    v-if="showFlags[81]"   key="buyChattingCompanyName"
                    label="采购撮合公司"
                    width="180">
                    <template slot-scope='item'>
                        <div>{{item.row.buyChattingCompanyName?item.row.buyChattingCompanyName:"-"}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="showFlags[82]"   key="buyChattingAmount"
                    label="采购撮合费用"
                    width="180">
                    <template slot-scope='item'>
                        <div>{{item.row.buyChattingAmount| numToCash}}</div>
                    </template>
                </el-table-column>
              <el-table-column
                v-if="showFlags[5]"   key="remarksa5"
                label="上游结算单价(元/吨)"
                width="180">
                <template slot-scope='item'>
                  <div class="text-r">{{item.row.upSettlementPrice | numToCash(true)}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[22]"   key="remarksa22"
                label="上游结算数量(吨)"
                width="180">
                <template slot-scope='item'>
                  <div class="text-r">{{item.row.upSettlementQuantity | numToQuantity}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[23]"   key="remarksa23"
                label="上游结算金额(元)"
                width="180">
                <template slot-scope='item'>
                  <div class="text-r">{{item.row.upSettlementAmount | numToCash }}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[28]" key="sellContractCode"
                label="销售合同编号"
                width="200">
                <template slot-scope='item'>
                    <div>{{item.row.sellContractCode?item.row.sellContractCode:"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[4]" key="sellSealPassingTime"
                label="下游签订日"
                width="120">
                <template slot-scope='item'>
                  <div>{{item.row.sellSealPassingTime?item.row.sellSealPassingTime:"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[78]"  key="sellPlanNumber"
                label="销售纸质合同号"
                width="200">
                <template slot-scope='item'>
                  <div>{{item.row.sellPlanNumber?item.row.sellPlanNumber:"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[79]"  key="sellStatisticalCaliber"
                label="下游统计口径"
                width="200">
                <template slot-scope='item'>
                  <div>{{item.row.sellStatisticalCaliber ?item.row.sellStatisticalCaliber :"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[17]" key="buyerCompanyName"
                label="下游公司"
                width="220">
                <template slot-scope='item'>
                  <div>{{item.row.sellerCompanyName?item.row.sellerCompanyName:"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[75]" key="sellGrade"
                label="下游公司评级"
                width="130">
                <template slot-scope='item'>
                  <div>{{item.row.sellGrade?item.row.sellGrade:"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[29]" key="sellSkuQuantity"
                label="销售合同数量(吨)"
                width="150">
                <template slot-scope='item'>
                  <div class="text-r">{{item.row.sellSkuQuantity?item.row.sellSkuQuantity:"-"|numToQuantity}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[9]"  key="sellSkuPrice"
                prop="sellSkuPrice"
                label="销售单价(元/吨)"
                width="150">
                <template slot-scope='item'>
                  <div class="text-r">{{item.row.sellSkuPrice | numToCash(true)}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[10]"   key="sellTotalAmount"
                prop="sellTotalAmount"
                label="销售合同总金额(元)"
                width="180">
                <template slot-scope='item'>
                  <div class="text-r">{{item.row.sellTotalAmount | numToCash}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[11]"   key="sellPayTotalAll"
                label="收款总金额(元)"
                width="150">
                <template slot-scope='item'>
                  <div class="text-r">{{item.row.sellPayTotalAll | numToCash}}
                    <el-popover
                      placement="top-start"
                      width="430"
                      v-if="item.row.sellOrderPayTotals.length > 1"
                      trigger="click">
                      <el-table :data="item.row.sellOrderPayTotals">
                        <el-table-column  label="序号" width="60"  type="index"></el-table-column>
                        <el-table-column property="payTotal" label="收款金额(元)" width="120">
                          <template slot-scope='item'><div>{{item.row.payTotal | numToCash}}</div></template>
                        </el-table-column>
                        <el-table-column property="createdDate" label="收款日期" width="180"></el-table-column>
                      </el-table>
                      <el-button class="gy-button-view"  slot="reference">明细</el-button>
                    </el-popover>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[61]" key="sellRemainPaymentPay"
                prop="sellRemainPaymentPay"
                label="应收款余额(元)"
                width="140">
                <template slot-scope='item'>
                  <div class="text-r">{{(item.row.sellRemainPaymentPay ) | numToCash}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[54]" key="sellDepositRatio"
                prop="sellDepositRatio"
                label="下游保证金比例"
                width="150">
                <template  slot-scope='item'>{{item.row.sellDepositRatioDesc}}</template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[55]" key="sellDepositRatioSubtract"
                label="下游追保比例 "
                width="150">
                <template  slot-scope='item'>{{item.row.sellDepositRatioSADesc}}</template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[56]" key="sellPaymentTypeDesc"
                label="下游结算方式 "
                width="130">
                <template  slot-scope='item'>
                  {{item.row.sellPaymentTypeDesc!=null?item.row.sellPaymentTypeDesc:"-"}}
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[57]" key="sellIsBatchDeliveryDesc"
                label="下游交割方式"
                width="130">
                <template  slot-scope='item'>
                  {{item.row.sellDeliveryTypeDesc!=null?item.row.sellDeliveryTypeDesc:"-"}}
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[18]"   key="sellDeliveryWarehouseName"
                label="下游实际交割库"
                width="220">
                <template  slot-scope='item'>
                  {{item.row.sellDeliveryWarehouseName!=null?item.row.sellDeliveryWarehouseName:"-"}}
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[20]"  key="sellPlanDeliveryDate"
                label="下游交割日"
                width="180">
                <template slot-scope='item'>
                  <div>{{item.row.sellPlanDeliveryDateStr}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[19]"  key="sellDeliveryDate"
                prop="sellDeliveryDate"
                label="下游实际交割日"
                width="150">
                <template slot-scope='item'>
                  <div v-if="item.row.sellDeliveryDates.length > 0">
                    <span>{{item.row.sellDeliveryDates[0].deliveryDate | date}}</span>
                    <el-popover
                      placement="top-start"
                      width="450"
                      trigger="click">
                      <el-table :data="item.row.sellDeliveryDates">
                        <el-table-column label="序号" width="60" type="index"></el-table-column>
                        <el-table-column label="下游实际交割数量(吨)" width="180"><template slot-scope='item'>{{item.row.deliveryQuantity | numToQuantity}}</template></el-table-column>
                        <el-table-column property="deliveryDate" label="下游实际交割日期" width="180"></el-table-column>
                      </el-table>
                      <el-button class="gy-button-view" slot="reference"  v-if="item.row.sellDeliveryDates.length>0">明细</el-button>
                    </el-popover>
                  </div>
                  <div v-else>-</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[59]" key="sellAlreadyDeliveryQuantityCount"
                prop="sellAlreadyDeliveryQuantityCount"
                label="累计交货数量(吨)"
                width="180">
                <template slot-scope='item'>
                  <div class="text-r">{{(item.row.sellAlreadyDeliveryQuantityCount ) | numToQuantity}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[60]" key="sellNotAlreadyDeliveryQuantityCount"
                prop="sellNotAlreadyDeliveryQuantityCount"
                label="未交货数量(吨)"
                width="150">
                <template slot-scope='item'>
                  <div class="text-r">{{(item.row.sellNotAlreadyDeliveryQuantityCount ) | numToQuantity}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[65]" key="sellInvoiceReceiptAmount"
                prop="sellInvoiceReceiptAmount"
                label="销项发票总金额(元)"
                width="180">
                <template slot-scope='item'>
                  <div class="text-r">{{(item.row.sellInvoiceReceiptAmount ) | numToCash}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[66]" key="sellInvoiceReceiptQuantity"
                prop="sellInvoiceReceiptQuantity"
                label="销项发票总吨数(吨)"
                width="180">
                <template slot-scope='item'>
                  <div class="text-r">{{(item.row.sellInvoiceReceiptQuantity ) | numToQuantity}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[21]"  key="invoiceCreatedDate"
                prop="invoiceCreatedDate"
                label="销项开票日"
                width="140">
                <template slot-scope='item'>
                  <div>{{item.row.invoiceCreatedDate?item.row.invoiceCreatedDate:"-"}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[35]"   key="remarks5"
                label="交叉交割"
                width="100">
                <template slot-scope='item'>
                  <div  v-if="item.row.acrossDeliverys.length>0">
                  <el-popover
                    placement="top-start"
                    width="450"
                    trigger="click">
                    <el-table :data="item.row.acrossDeliverys">
                      <el-table-column  label="序号" width="60"  type="index"></el-table-column>
                      <el-table-column property="acrossContractNo" label="交叉采购合同编号" width="180"></el-table-column>
                      <el-table-column property="deliveryDate" label="交割时间" width="180"></el-table-column>
                    </el-table>
                    <el-button class="gy-button-view" slot="reference" v-if="item.row.acrossDeliverys.length>0" >明细</el-button>
                    <span slot="reference" v-if="item.row.acrossDeliverys.length<=0" >-</span>
                  </el-popover>
                  </div>
                  <div v-else>-</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[73]" key="invoiceVoucherExist"
                prop="invoiceVoucherExist"
                label="下游开票情况"
                width="130">
              </el-table-column>
              <el-table-column
                v-if="showFlags[34]" key="remarks4"
                label="销售合同要素备注"
                width="300">
                <template slot-scope='item'>
                    <el-popover  v-if="item.row.sellRemarks"
                        placement="top-start"
                        width="500"
                        trigger="hover"
                        >
                        <div style="height: 300px;overflow-y:scroll">{{item.row.sellRemarks?item.row.sellRemarks:'-'}}</div>
                        <div class="text-overflow" slot="reference"  >{{(item.row.sellRemarks?item.row.sellRemarks:'-') | cutstring(20)}}</div>
                    </el-popover>
                    <div v-else>-</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[38]"   key="remarks3"
                label="销售合约编号"
                width="180">
                <template slot-scope='item'>
                  <div>{{item.row.sellLongtermContractOrderId?item.row.sellLongtermContractOrderId:"-"}}</div>
                </template>
              </el-table-column>
                <el-table-column
                    v-if="showFlags[83]"   key="sellChattingCompanyName"
                    label="销售撮合公司"
                    width="180">
                    <template slot-scope='item'>
                        <div>{{item.row.sellChattingCompanyName?item.row.sellChattingCompanyName:"-"}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="showFlags[84]"   key="sellChattingAmount"
                    label="销售撮合费用"
                    width="180">
                    <template slot-scope='item'>
                        <div>{{item.row.sellChattingAmount| numToCash}}</div>
                    </template>
                </el-table-column>
              <el-table-column
                v-if="showFlags[25]"   key="remarksa25"
                label="下游结算单价(元/吨)"
                width="180">
                <template slot-scope='item'>
                  <div class="text-r">{{item.row.downSettlementPrice | numToCash(true)}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[31]"   key="remarksa31"
                label="下游结算数量(吨)"
                width="180">
                <template slot-scope='item'>
                  <div class="text-r">{{item.row.downSettlementQuantity | numToQuantity}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[47]"   key="remarksa47"
                label="下游结算金额(元)"
                width="180">
                <template slot-scope='item'>
                  <div class="text-r">{{item.row.downSettlementAmount | numToCash}}</div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[24]" key="payTotalAll"
                label="合同利润(元)"
                width="130">
              <template slot-scope='item'>
                <div class="text-r">{{item.row.profit| numToCash}}</div>
              </template>
              </el-table-column>
              <el-table-column
                v-if="showFlags[58]" key="payTotalAll58"
                label="结算利润(元)"
                width="130">
                <template slot-scope='item'>
                  <div class="text-r">-</div>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div class="departmentName">共 {{total}} 条记录</div>
      </div>

      <!-- 分页 -->
      <el-pagination
        background
        :total="total"
        layout="prev, pager, next"
        style="margin: 20px 0 30px 0;"
        @current-change="turnPage"
        @prev-click="prevClick"
        @next-click="nextClick"
        >
      </el-pagination>
      <!-- 全部的自定义列表项  $ycj-->
      <el-dialog width="50%" title="自定义列表项" class="cstSelItemDlg" :visible.sync="showFlagsDiaAll">
        <!-- 公共 -->
        <div class="common">
          <el-row>
            <el-col :span="6"><el-checkbox   @change="aCheckAll"  v-model="checkAllTag" >全选</el-checkbox></el-col>
            <div style="margin: 15px 0;"></div>
          </el-row>
          <div>公共</div>
            <div style="margin: 15px 0;"></div>
          <el-row>
          <el-col :span="6"><el-checkbox v-model="showFlagsdb[37]">业务类型</el-checkbox></el-col>
          <el-col :span="6"><el-checkbox v-model="showFlagsdb[70]">交易模式</el-checkbox></el-col>
          <el-col :span="6"><el-checkbox v-model="showFlagsdb[1]">业务组</el-checkbox></el-col>
          <el-col :span="6"> <el-checkbox v-model="showFlagsdb[36]">业务操作人</el-checkbox></el-col>
          <el-col :span="6"> <el-checkbox v-model="showFlagsdb[80]">执行操作人</el-checkbox></el-col>
          <el-col :span="6"> <el-checkbox v-model="showFlagsdb[40]">规格</el-checkbox></el-col>
          <el-col :span="6"><el-checkbox v-model="showFlagsdb[24]">合同利润</el-checkbox></el-col>
          <el-col :span="6"><el-checkbox v-model="showFlagsdb[71]">执行状态</el-checkbox></el-col>
        </el-row>
        </div>
        <!-- 卖方 -->
        <div class="sell">
          <div>卖方</div>
            <div style="margin: 15px 0;"></div>
          <el-row>
            <el-col :span="6"><el-checkbox v-model="showFlagsdb[27]">采购合同编号</el-checkbox></el-col>
            <el-col :span="6"><el-checkbox v-model="showFlagsdb[0]">上游签订日</el-checkbox></el-col>
            <el-col :span="6"><el-checkbox v-model="showFlagsdb[76]">采购纸质合同号</el-checkbox></el-col>
            <el-col :span="6"><el-checkbox v-model="showFlagsdb[77]">上游统计口径</el-checkbox></el-col>
            <el-col :span="6"><el-checkbox v-model="showFlagsdb[74]">上游公司评级</el-checkbox></el-col>
            <el-col :span="6"><el-checkbox v-model="showFlagsdb[30]">采购合同数量(吨)</el-checkbox></el-col>
            <el-col :span="6"><el-checkbox v-model="showFlagsdb[6]">采购单价(元/吨)</el-checkbox></el-col>
            <el-col :span="6"><el-checkbox v-model="showFlagsdb[7]">采购合同总金额(元)</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[8]">付款总金额(元)</el-checkbox></el-col>
            <el-col :span="6"><el-checkbox v-model="showFlagsdb[50]">应付款余额(元)</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[32]">单边保证金(元)</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[43]">上游保证金比例</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[44]">上游追保比例</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[45]">上游结算方式</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[46]">上游交割方式</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[13]">上游实际交割库</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[15]">上游交割日</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[14]">上游实际交割日</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[12]">进项收票日</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[48]">累计提货数量(吨)</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[49]">未提货数量(吨)</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[62]">进项发票总金额(元)</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[63]">进项发票总吨数(吨)</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[72]">上游收票情况</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[33]">采购合同要素备注</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[64]">采购合约编号</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[81]">采购撮合公司</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdb[82]">采购撮合费用</el-checkbox></el-col>
          </el-row>
        </div>
        <!-- 买方 -->
        <div class="buy">
          <div>买方</div>
            <div style="margin: 15px 0;"></div>
          <el-row>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[28]">销售合同编号</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[4]">下游签订日</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[78]">销售纸质合同号</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[79]">下游统计口径</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[75]">下游公司评级</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[29]">销售合同数量(吨)</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[9]">销售单价(元/吨)</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[10]">销售合同总金额(元)</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[11]">收款总金额(元)</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[61]">应收款余额(元)</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[54]">下游保证金比例</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[55]">下游追保比例</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[56]">下游结算方式</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[57]">下游交割方式</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[18]">下游实际交割库</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[20]">下游交割日</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[19]">下游实际交割日</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[21]">销项开票日</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[59]">累计交货数量(吨)</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[60]">未交货数量(吨)</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[65]">销项发票总金额(元)</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[66]">销项发票总吨数(吨)</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[35]">交叉交割</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[73]">下游开票情况</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[34]">销售合同要素备注</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[38]">销售合约编号</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[83]">销售撮合公司</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdb[84]">销售撮合费用</el-checkbox></el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <button class="gy-button-extra confirmations"  @click="saveShowFlagsdb">确定</button>
        </span>
      </el-dialog>
      <!--  金额明细 -->
      <el-dialog :title="payTotalAllTit.title" :visible.sync="payTotalAllDia"  width="30%"  >
        <el-table :data="payTotalAll">
          <el-table-column  label="序号" width="60"  type="index"></el-table-column>
          <el-table-column property="payTotal" :label="payTotalAllTit.payTotal" width="120"></el-table-column>
          <el-table-column property="createdDate" :label="payTotalAllTit.createdDate"></el-table-column>
        </el-table>
      </el-dialog>
      <!-- 执行台账的的自定义列表项  $ycj-->
      <el-dialog width="50%" title="自定义列表项" class="cstSelItemDlg" :visible.sync="showFlagsDiaExe">
        <!-- 公共 -->
        <div class="common">
          <el-row>
            <el-col :span="6"><el-checkbox   @change="aCheckAllExe"  v-model="checkAllTag" >全选</el-checkbox></el-col>
            <div style="margin: 15px 0;"></div>
          </el-row>
          <div>公共</div>
          <div style="margin: 15px 0;"></div>
          <el-row>
            <el-col :span="6"><el-checkbox v-model="showFlagsdbExe[1]">业务组</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[36]">业务操作人</el-checkbox></el-col>
            <el-col :span="6"><el-checkbox v-model="showFlagsdbExe[37]">业务类型</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[40]">规格</el-checkbox></el-col>
            <el-col :span="6"><el-checkbox v-model="showFlagsdbExe[24]">合同利润</el-checkbox></el-col>
          </el-row>
        </div>
        <!-- 卖方 -->
        <div class="sell">
          <div>卖方</div>
          <div style="margin: 15px 0;"></div>
          <el-row>
            <el-col :span="6"><el-checkbox v-model="showFlagsdbExe[27]">采购合同编号</el-checkbox></el-col>
            <el-col :span="6"><el-checkbox v-model="showFlagsdbExe[30]">采购合同数量(吨)</el-checkbox></el-col>
            <el-col :span="6"><el-checkbox v-model="showFlagsdbExe[6]">采购单价(元/吨)</el-checkbox></el-col>
            <el-col :span="6"><el-checkbox v-model="showFlagsdbExe[7]">采购合同总金额(元)</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdbExe[43]">上游保证金比例</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdbExe[44]">上游追保比例</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdbExe[45]">上游结算方式</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdbExe[46]">上游交割方式</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdbExe[13]">上游实际交割库</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdbExe[48]">累计提货数量(吨)</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdbExe[49]">未提货数量(吨)</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdbExe[62]">进项发票总金额(元)</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdbExe[63]">进项发票总吨数(吨)</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdbExe[64]">采购合约编号</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdbExe[81]">采购撮合公司</el-checkbox></el-col>
            <el-col :span="6">  <el-checkbox v-model="showFlagsdbExe[82]">采购撮合费用</el-checkbox></el-col>
          </el-row>
        </div>
        <!-- 买方 -->
        <div class="buy">
          <div>买方</div>
          <div style="margin: 15px 0;"></div>
          <el-row>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[28]">销售合同编号</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[29]">销售合同数量(吨)</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[9]">销售单价(元/吨)</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[10]">销售合同总金额(元)</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[61]">应收款余额(元)</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[54]">下游保证金比例</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[55]">下游追保比例</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[56]">下游结算方式</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[57]">下游交割方式</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[18]">下游实际交割库</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[59]">累计交货数量(吨)</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[60]">未交货数量(吨)</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[65]">销项发票总金额(元)</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[66]">销项发票总吨数(吨)</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[35]">交叉交割</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[38]">销售合约编号</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[83]">销售撮合公司</el-checkbox></el-col>
            <el-col :span="6"> <el-checkbox v-model="showFlagsdbExe[84]">销售撮合费用</el-checkbox></el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <button class="gy-button-extra confirmations"  @click="saveShowFlagsdbExe">确定</button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            total: 0,
            checkAll: false,
            // 报表临时数据
            tableData: [],
            payTotalAll: [],
            value: 1,
            tabName: 'first',
            //
            dialogVisible: false,
            showFlagsDiaAll: false,
            showFlagsDiaExe: false,
            payTotalAllDia: false,
            isShowSearch: false,
            businessManagerGroup: [],
            buyOrderPayTotals: [],
            sellOrderPayTotals: [],
            buyDeliveryDates: [],
            sellDeliveryDates: [],
            acrossDeliverys: [],
            search: {
                pageNum: 1,
                pageSize: 10,
                bizType: null,
                usrOrganizationId: null,
                usrOrganizationName: null,
                buyerCompanyName: null,
                sellerCompanyName: null,
                buyDeliveryWarehouseName: null,
                sellDeliveryWarehouseName: null,
                buyDeliveryDateS: null,
                buyDeliveryDateE: null,
                sellDeliveryDateS: null,
                sellDeliveryDateE: null,
                usrCompanyName: null,
                contractCreateDateS: null,
                contractCreateDateE: null,
                activeId: 0
            },
            tabs: [
                {
                    id: 0,
                    value: '全部',
                    data: null
                },
                {
                    id: 4,
                    value: '执行台账',
                    data: null
                },
                {
                    id: 5,
                    value: '业务台账',
                    data: null
                },
                {
                    id: 6,
                    value: '风控台账',
                    data: null
                },
                {
                    id: 8,
                    value: '财务台账',
                    data: null
                }
            ],
            minTabActiveId: 6,
            tabsChildren: [
                {
                    id: 6,
                    value: '上游合同',
                    data: null
                },
                {
                    id: 7,
                    value: '下游合同',
                    data: null
                }
            ],
            activeId: 0,
            a: null,
            checkAllTag: true,
            showFlags: [ true, true, true, true, true, true, true, true, true, true,
                true, true, true, true, true, true, true, true, true, true,
                true, true, true, true, true, true, true, true, true, true,
                true, true, true, true, true, true, true, true, true, true,
                true, true, true, true, true, true, true, true, true, true,
                true, true, true, true, true, true, true, true, true, true,
                true, true, true, true, true, true, true, true, true, true,
                true, true, true, true, true, true, true, true, true, true,
                true, true, true, true, true
            ],
            showFlagsdb: [ true, true, true, true, true, true, true, true, true, true,
                true, true, true, true, true, true, true, true, true, true,
                true, true, true, true, true, true, true, true, true, true,
                true, true, true, true, true, true, true, true, true, true,
                true, true, true, true, true, true, true, true, true, true,
                true, true, true, true, true, true, true, true, true, true,
                true, true, true, true, true, true, true, true, true, true,
                true, true, true, true, true, true, true, true, true, true,
                true, true, true, true, true
            ],
            showFlagsdbExe: [ true, true, true, true, false, false, true, true, true, true,
                true, true, false, true, true, false, true, false, true, true,
                false, false, false, false, true, true, true, true, true, true,
                true, false, false, false, false, true, true, true, false, false,
                true, true, true, true, true, true, true, false, true, true,
                true, false, true, true, true, true, true, true, false, true,
                true, true, true, true, false, true, true, false, false, false,
                true, false, false, false, false, true, true, true, true, true,
                true, true, true, true, true
            ],
            showFlagsExc: [ false, false, true, true, false, true, false, false, false, false,
                false, false, false, false, false, false, true, true, false, false,
                false, false, false, false, false, true, true, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false, false, false,
                false, false, false, false, false
            ],
            showFlagsdbExcExe: [ true, true, true, true, false, false, true, true, true, true,
                true, true, false, true, true, false, true, true, true, true,
                false, false, false, false, true, true, true, true, true, true,
                true, false, false, false, false, true, true, true, true, false,
                true, true, true, true, true, true, true, false, true, true,
                true, false, true, true, true, true, true, true, false, true,
                true, true, true, true, true, true, true, false, false, false,
                true, false, false, false, false, true, true, true, true, true,
                true, true, true, true, true
            ],
            payTotalAllTit: {
                title: '付款金额明细',
                payTotal: '付款金额',
                createdDate: '付款时间'
            }
        };
    },
    created () {
        this.initShowFlags();
        this.init();
        this.getUserOrganization();
    },
    methods: {
        init () {
            this.$http.post(this.$api.statement.standingBook, this.search).then((res) => {
                let resData = res.data.data.list;
                if (resData.length === 1 && resData[0] === null) {
                    this.tableData = null;
                } else {
                    this.tableData = resData;
                }
                this.total = res.data.data.total;
            }).catch((erro) => {
                console.log(erro);
            });
        },
        // 分页
        turnPage (pageNum) {
            this.search.pageNum = pageNum;
            this.init();
        },
        prevClick (pageNum) {
            this.search.pageNum = pageNum;
            this.init();
        },
        nextClick (pageNum) {
            this.search.pageNum = pageNum;
            this.init();
        },
        ShowSearch () {
            this.isShowSearch = !this.isShowSearch;
        },
        tabClick (item) {
            this.activeId = item.id;
            this.search.activeId = item.id;
            switch (item.id) {
            case 0:
                this.initShowFlags();
                break;
            case 4:
                this.initShowFlagsExe();
                break;
            case 5:
                this.showFlags = this.showFlagsExc.concat();
                this.showFlags[26] = true;
                this.showFlags[3] = true;
                this.showFlags[39] = true;
                this.showFlags[16] = true;
                this.showFlags[17] = true;
                this.showFlags[6] = true;
                this.showFlags[30] = true;
                this.showFlags[8] = true;
                this.showFlags[9] = true;
                this.showFlags[67] = true;
                this.showFlags[59] = true;
                this.showFlags[60] = true;
                this.showFlags[19] = true;
                this.showFlags[69] = true;
                this.showFlags[24] = true;
                this.showFlags[36] = true;
                this.showFlags[33] = true;
                this.showFlags[34] = true;
                this.showFlags[81] = true;
                this.showFlags[82] = true;
                this.showFlags[83] = true;
                this.showFlags[84] = true;
                break;
            case 6:
                this.showFlags = this.showFlagsExc.concat();
                this.showFlags[26] = true;
                this.showFlags[1] = true;
                this.showFlags[37] = true;
                this.showFlags[70] = true;
                this.showFlags[3] = true;
                this.showFlags[71] = true;
                this.showFlags[39] = true;
                this.showFlags[27] = true;
                this.showFlags[2] = true;
                this.showFlags[16] = true;
                this.showFlags[74] = true;
                this.showFlags[28] = true;
                this.showFlags[3] = true;
                this.showFlags[40] = true;
                this.showFlags[6] = true;
                this.showFlags[30] = true;
                this.showFlags[7] = true;
                this.showFlags[41] = true;
                this.showFlags[42] = true;
                this.showFlags[43] = true;
                this.showFlags[44] = true;
                this.showFlags[45] = true;
                this.showFlags[46] = true;
                this.showFlags[13] = true;
                this.showFlags[14] = true;
                this.showFlags[48] = true;
                this.showFlags[49] = true;
                this.showFlags[8] = true;
                this.showFlags[50] = true;
                this.showFlags[72] = true;
                this.showFlags[35] = true;
                this.showFlags[81] = true;
                this.showFlags[82] = true;
                break;
            case 7:
                this.showFlags = this.showFlagsExc.concat();
                this.showFlags[26] = true;
                this.showFlags[1] = true;
                this.showFlags[37] = true;
                this.showFlags[70] = true;
                this.showFlags[3] = true;
                this.showFlags[71] = true;
                this.showFlags[51] = true;
                this.showFlags[28] = true;
                this.showFlags[2] = true;
                this.showFlags[17] = true;
                this.showFlags[75] = true;
                this.showFlags[27] = true;
                this.showFlags[3] = true;
                this.showFlags[40] = true;
                this.showFlags[9] = true;
                this.showFlags[29] = true;
                this.showFlags[10] = true;
                this.showFlags[52] = true;
                this.showFlags[53] = true;
                this.showFlags[54] = true;
                this.showFlags[55] = true;
                this.showFlags[56] = true;
                this.showFlags[57] = true;
                this.showFlags[18] = true;
                this.showFlags[19] = true;
                this.showFlags[59] = true;
                this.showFlags[60] = true;
                this.showFlags[11] = true;
                this.showFlags[61] = true;
                this.showFlags[73] = true;
                this.showFlags[35] = true;
                this.showFlags[83] = true;
                this.showFlags[84] = true;
                break;
            case 8:
                this.showFlags = this.showFlagsExc.concat();
                this.showFlags[26] = true;
                this.showFlags[37] = true;
                this.showFlags[39] = true;
                this.showFlags[1] = true;
                this.showFlags[36] = true;
                this.showFlags[80] = true;
                this.showFlags[2] = true;
                this.showFlags[3] = true;
                this.showFlags[40] = true;
                this.showFlags[71] = true;
                this.showFlags[27] = true;
                this.showFlags[0] = true;
                this.showFlags[16] = true;
                this.showFlags[30] = true;
                this.showFlags[6] = true;
                this.showFlags[7] = true;
                this.showFlags[8] = true;
                this.showFlags[50] = true;
                this.showFlags[32] = true;
                this.showFlags[43] = true;
                this.showFlags[44] = true;
                this.showFlags[45] = true;
                this.showFlags[62] = true;
                this.showFlags[63] = true;
                this.showFlags[12] = true;
                this.showFlags[72] = true;
                this.showFlags[33] = true;
                this.showFlags[64] = true;
                this.showFlags[5] = true;
                this.showFlags[22] = true;
                this.showFlags[23] = true;
                this.showFlags[28] = true;
                this.showFlags[4] = true;
                this.showFlags[17] = true;
                this.showFlags[28] = true;
                this.showFlags[9] = true;
                this.showFlags[10] = true;
                this.showFlags[11] = true;
                this.showFlags[61] = true;
                this.showFlags[54] = true;
                this.showFlags[55] = true;
                this.showFlags[56] = true;
                this.showFlags[65] = true;
                this.showFlags[66] = true;
                this.showFlags[21] = true;
                this.showFlags[73] = true;
                this.showFlags[34] = true;
                this.showFlags[38] = true;
                this.showFlags[25] = true;
                this.showFlags[31] = true;
                this.showFlags[47] = true;
                this.showFlags[24] = true;
                this.showFlags[58] = true;
                this.showFlags[29] = true;
                this.showFlags[81] = true;
                this.showFlags[82] = true;
                this.showFlags[83] = true;
                this.showFlags[84] = true;
                break;
            }
        },
        saveShowFlagsdb () {
            // 这里有个有意思的点:必须做深拷贝处理，不然会关联  保存全部的自定义列表 $ycj
            this.showFlags = this.showFlagsdb.concat();
            window.localStorage.setItem('showFlags', JSON.stringify(this.showFlags));
            this.showFlagsDiaAll = false;
        },
        saveShowFlagsdbExe () {
            // 这里有个有意思的点:必须做深拷贝处理，不然会关联   保存执行台账的自定义列表 $ycj
            this.showFlags = this.showFlagsdbExe.concat();
            window.localStorage.setItem('showFlagsExe', JSON.stringify(this.showFlags));
            this.showFlagsDiaExe = false;
        },
        initShowFlags () {
            let showFlagsTemp = window.localStorage.getItem('showFlags');
            if (showFlagsTemp != null) {
                this.showFlags = JSON.parse(showFlagsTemp);
                this.showFlagsdb = this.showFlags.concat();
            }
            if (showFlagsTemp == null) {
                this.showFlags = new Array(90).fill(true);
            }
        },
        initShowFlagsExe () { // 执行台账
            let showFlagsTemp = window.localStorage.getItem('showFlagsExe');
            if (showFlagsTemp != null) {
                this.showFlags = JSON.parse(showFlagsTemp);
                this.showFlagsdbExe = this.showFlags.concat();
            }
            if (showFlagsTemp == null) {
                this.showFlags = this.showFlagsdbExcExe.concat();
            }
        },
        // 获取业务组
        getUserOrganization () {
            this.$http.get(this.$api.contract.getUserOrganization).then(res => {
                this.businessManagerGroup = res.data.data;
            }).catch((e) => {
                console.log(e);
            });
        },
        exportExcel () {
            this.$tools.exporttoExcel(this, this.$api.statement.standingBookReportExport, this.search, null, 60000);
        },
        aCheckAll (tag) {
            if (tag) this.showFlagsdb = new Array(90).fill(true);
            if (!tag) this.showFlagsdb = this.showFlagsExc.concat();
        },
        aCheckAllExe (tag) {
            if (tag) this.showFlagsdbExe = this.showFlagsdbExcExe.concat();
            if (!tag) this.showFlagsdbExe = this.showFlagsExc.concat();
        },
        checkShowFlagsDiag () {
            if (this.activeId === 0) {
                this.showFlagsDiaAll = true;
            }
            if (this.activeId === 4) {
                this.showFlagsDiaExe = true;
            }
        },
        handleClick (index, id) {
            this.minTabActiveId = id;
            this.tabClick(this.tabsChildren[index]);
        }
    }
};
</script>
<style lang="scss" scoped>
  .standingBook {
    .gy-form-group {
      padding: 6px 40px 6px 126px;
      .l {
        width: 106px
      }
    }
    .min-tab-active {
        border-bottom: 2px solid #e0370f;
        span {
            color: #e0370f;
        }
    }
  }
</style>
<style lang="scss">
    .standingBook .el-table .cell{
      height: 21px;
      font-size:12px;
      color:#666666;
      white-space: nowrap;
    }
    .standingBook .el-table th .cell{
      font-weight: bold;
    }
    .standingBook {
      .cstSelItemDlg {
        .el-checkbox__label {
          color: black;
        }
        .el-dialog__close {
          position: absolute;
          right: 1px;
          top: -8px;
        }
      }
    }
</style>
