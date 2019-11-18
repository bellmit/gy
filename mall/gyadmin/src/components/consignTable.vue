<template>
    <table class="gy-table list">
        <thead>
        <tr>
            <td v-for="(td, index) in theadList" :key="index" :style='"width:" + td.width + "%"'>{{td.value}}</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in orderList" :key="index">
            <td :colspan="theadList.length" class="item">
                <div class="item-t">
                    <span class="fl" v-if="No === 0">单号：{{item.consignmentNoteCode}}<!--<i class="iconfont icon-copy"></i>--></span>
                    <span class="fl f1-left" v-if="item.consignmentContractCode">合同编号：{{item.consignmentContractCode}}</span>
                    <span class="fr">创建时间：{{item.createdDate | date}}</span>
                </div>
                <table class="gy-table my-table" v-if="No === 0">
                    <tr>
                        <td class="td-15">
                            <div class="pro-info" v-for="(pro, index) in item.consignmentNoteItemList" :key="index">
                                <span class="img" :style="'background-image: url(' + pro.imagePath + ')'"></span><span class="name">{{pro.skuName}}<br>{{pro.skuQuantity + pro.infUnitOfMeasureName}}</span>
                            </div>
                        </td>
                        <td class="td-10">{{item.consignorName}}</td>
                        <td class="td-10">{{item.carrierName}}</td>
                        <td class="td-15">{{item.loadingWarehouseAddress}}</td>
                        <td class="td-15">{{item.unloadingWarehouseAddress}}</td>
                        <td class="td-5">{{orderStatusValue[item.consignmentNoteStatus]}}</td>
                        <td class="td-5">
                          <span v-if="item.consignmentNoteStatus === 8">{{item.billStatus | auditStatusTrans}}</span>
                          <span v-else>未提交</span>
                        </td>
                        <td class="td-5"><router-link target="_blank" :to="{ name: 'transportOrderDetail', query: {view: true, orderId: item.id} }" class="gy-button-view">查看</router-link></td>
                    </tr>
                </table>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    data () {
        return {
            orderStatusValue: ['签约中', '签约中', '已失效', '实施中', '结算中', '结算中', '结算中', '付款中', '已完成'],
            companyTypeId: null
        };
    },
    props: ['orderList', 'theadList', 'No'],
    created () {
        this.companyTypeId = JSON.parse(localStorage.getItem('userInfo')).companyTypeId;
    }
};
</script>

<style lang="scss" scoped>
    td{
        padding-right: 0;
    }
    .td-5{
        width: 5%;
    }
    .td-10{
        width: 10%;
    }
    .td-15{
        width: 15%;
    }
    .gy-button-view{
        margin-right: 5px;
    }
    .my-table td {
      line-height: 1.6;
    }
    .f1-left{
        margin-left:10px;
    }
    .gy-table td{
        padding:6px;
    }
</style>
