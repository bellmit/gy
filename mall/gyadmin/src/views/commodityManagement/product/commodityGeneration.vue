<template>
    <div class="commodity-main">
        <h3 class="gy-h3">商品生成</h3>
        <div class="list">
            <div class="operation-menu">
                <button @click="del" class="gy-button-normal">删除</button>
            </div>
            <table class="gy-table">
                <thead>
                <tr>
                    <!--<th>选择</th>-->
                    <td>商品名称</td>
                    <td>所属类目</td>
                    <td>商品编码</td>
                    <td>商品属性</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in productGood.data" :key="index">
                    <!--<th><input type="checkbox" :checked="checkedList.indexOf(item.id) >= 0" @change="handleCheckChange(item.id)"></th>-->
                    <td>{{item.goodsName}}</td>
                    <td>{{item.productId}}</td>
                    <td>{{item.goodsCode}}</td>
                    <td>{{item.goodsId}}</td>
                </tr>
                </tbody>
            </table>
            <!--<div class="pagination" v-if="productInfo.total > productInfo.pageSize">-->
                <!--<el-pagination-->
                  <!--background-->
                  <!--layout="prev, pager, next"-->
                  <!--:current-page.sync = "productInfo.pageNum"-->
                  <!--:page-size="productInfo.pageSize"-->
                  <!--:total="productInfo.total"-->
                  <!--@current-change="handleCurrentChange">-->
                <!--</el-pagination>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
export default {
    name: 'product-commodityGeneration',
    data () {
        return {
            // productGood: ''
        };
    },
    created () {
        this.productGood = this.$route.params;
        console.log(this.productGood);
        // this.productGoodList();
    },
    methods: {
        // productGoodList () {
        //     let that = this;
        //     that.$http.get(that.$api.product.productGenerationGoods + '?keywords=' + that.id)
        //         .then(function (res) {
        //             console.log(res.data);
        //             console.log(that.id);
        //         });
        // }
        del () {
            let that = this;
            console.log(that.productGood);
        }
    }
};
</script>
