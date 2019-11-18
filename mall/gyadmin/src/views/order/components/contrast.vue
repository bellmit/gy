<template>
  <el-dialog  class="gy-compare" :visible.sync="showContrastTable" width="1100px" title="订单与发票比对">
       <table  class="gy-table">
        <thead class="trcenter">
            <th width="80">类型</th>
            <th>卖家</th>
            <th>买家</th>
            <th>品类</th>
            <th width="80">规格型号</th>
            <th width="80">单位</th>
            <th width="100">数量</th>
            <th>单价</th>
            <th width="110">金额</th>
            <th width="110">合计金额</th>
            <th width="120">生成时间</th>
        </thead>
        <tbody>
           <tr>
             <td>订单信息</td>
             <td>{{contrastData.sellerCompanyName}}</td>
             <td>{{contrastData.buyerCompanyName}}</td>
             <td>
                 <span v-for="(item, index) in contrastData.orderItemList" :key="index">{{item.skuName}}</span>
              </td>
             <td>-</td>
             <td>{{contrastData.orderItemList[0].infUnitOfMeasureDisplayName || '-'}}</td>
             <td>{{contrastData.orderItemList[0].skuQuantity || '-'}}</td>
             <td>{{contrastData.orderItemList[0].skuPrice || '-'}}</td>
             <td>{{contrastData.orderItemList[0].skuTotalAmount || '-'}}</td>
             <td>{{contrastData.settlementTotal || '-'}}</td>
             <td width="100">{{contrastData.createdDate | date}}</td>

           </tr>
            <tr  v-for="(item,index) in contrastData.orderInvoiceList" :key="index" >
                <td>发票{{index + 1}}</td>
                <td :class="{tdColor:item.invoiceInfoModel.sellerName !==contrastData.sellerCompanyName}">{{item.invoiceInfoModel && item.invoiceInfoModel.sellerName || '-'}}</td>
                <td :class="{tdColor:item.invoiceInfoModel.buyerName !==contrastData.buyerName}">{{item.invoiceInfoModel && item.invoiceInfoModel.buyerName || '-'}}</td>
                <td :class="{tdColor:item.invoiceInfoModel.detailList!== contrastData.orderItemList}">
                  <span v-for='(subitem, subindex) in item.invoiceInfoModel.detailList' :key="subindex">{{subitem.goodsName|| '-'}}</span>
                </td>
                <td>{{item.invoiceInfoModel.detailList[0].typeSpecification|| '-'}}</td>
                <td>{{item.invoiceInfoModel.detailList[0].measurementUnit || '-'}}</td>
                <td>{{item.invoiceInfoModel.detailList[0].goodsNumber}}</td>
                <td>{{item.invoiceInfoModel.detailList[0].taxFreePrice}}</td>

                <td>{{item.invoiceInfoModel.detailList[0].subAmount}}</td>
                <td>{{item.invoiceInfoModel.priceTaxSum}}</td>
                <td>{{item.invoiceInfoModel.invoiceIssueDateStr}}</td>
            </tr>
            <tr  v-if="!contrastData.orderInvoiceList || contrastData.orderInvoiceList.length == 0">
                <td colspan="11" class="invoicetd align-c"><i class="iconfont icon-weikong"></i>没有可显示的发票信息</td>
            </tr>
        </tbody>
    </table>
    <div>订单总额：{{contrastData.totalAmount}}元，发票总额:{{contrastData.invoiceTotalAmount || 0}}元，发票张数：{{contrastData.orderInvoiceList&&contrastData.orderInvoiceList.length || 0}}张</div>
       <div class="footerbtn">
            <button class="gy-button-extra" @click="showContrastTable = false">关闭</button>
      </div>
  </el-dialog>
</template>
<script>
export default {
    props: ['showContrastTable', 'contrastData'],
    data () {
        return {
            dialogVisible: this.showContrastTable
        };
    },
    watch: {
        showContrastTable (oldValue, newValue) {
            if (!this.showContrastTable) {
                this.$emit('hideContrastTable', true);
            }
        }
    },
    mounted () {
        console.log('dialogVisible', this.dialogVisible);
    }
};
</script>
<style lang="scss" stoped>
   .footerbtn{
        text-align: right;
        padding-top: 25px;
    }
  .icon-weikong {
      font-size: 22px;
  }
</style>
<style lang="scss">
 .gy-compare{
    .el-dialog__body{
        padding: 20px 15px!important;
    }
}
</style>
