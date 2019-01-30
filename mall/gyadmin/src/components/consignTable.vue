<template>
    <table class="gy-table list">
        <thead>
        <tr>
            <td v-for="(td, index) in theadList" :key="index" :style='"width:" + td.width + "px"'>{{td.value}}</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in orderList" :key="index">
            <td :colspan="theadList.length" class="item">
                <div class="item-t">
                    <span class="fl" v-if="No === 0">单号：{{item.consignmentNoteCode}}<!--<i class="iconfont icon-copy"></i>--></span>
                    <span class="fr">创建时间：{{item.createdDate | date}}</span>
                </div>
                <table class="gy-table" v-if="No === 0">
                    <tr>
                        <td class="td-240">
                            <div class="pro-info" v-for="(pro, index) in item.consignmentNoteItemList" :key="index">
                                <span class="img" :style="'background-image: url(' + pro.imagePath + ')'"></span><span class="name">{{pro.skuName}}<br>{{pro.skuQuantity + pro.infUnitOfMeasureName}}</span>
                            </div>
                        </td>
                        <td class="td-180">{{item.consignorName}}</td>
                        <td class="td-180">{{item.carrierName}}</td>
                        <td class="td-180">{{item.loadingWarehouseAddress}}</td>
                        <td class="td-180">{{item.unloadingWarehouseAddress}}</td>
                        <td class="td-108">{{orderStatusValue[item.consignmentNoteStatus]}}</td>
                        <td><router-link :to="{ name: 'transportOrderDetail', query: {view: true, orderId: item.id} }" class="gy-button-view">查看</router-link></td>
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
    .td-240{
        width: 240px;
    }
    .td-180{
        width: 180px;
    }
    .td-150{
        width: 150px;
    }
    .td-108{
        width: 108px;
    }
    .td-100{
        width: 100px;
    }
    .td-222{
        width: 222px;
    }
    .td-210{
        width: 210px;
    }
    .gy-button-view{
        margin-right: 5px;
    }
</style>
