<template>
    <div class="commodity-main commodity-sku">
        <div class="gy-h4">产品查看</div>
        <div class="list gy-form-box-14">
            <div class="gy-form-group">
                <span class="l">产品名称</span>
                <span>{{productData.productName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">所属类目</span>
                <span>{{productData.categoryNames}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">cas号</span>
                <span>{{productData.casNo}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">分子式</span>
                <span>{{productData.molecularFormula}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">中文别名</span>
                <span>{{productData.cnAlias}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">英文全称</span>
                <span>{{productData.enFullName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">英文简称</span>
                <span>{{productData.enAbbreviation}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">SKU规则</span>
                <span>{{productData.skuNo}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">产品状态</span>
                <div>
                    <input type="radio" v-model="productData.valid" value="1" name="status" checked><span>可用</span>
                    <input type="radio" v-model="productData.valid" value="0" name="status"><span>不可用</span>
                </div>
            </div>
            <div class="gy-form-group form-group-special">
                <span class="l">产品图片</span>
                <div class="newINg" v-bind:key="index" v-for="(item,index) in productData.productUrlList">
                    <img :src="item" v-if="productData.productUrlList" alt="" class="product-img">
                </div>
            </div>
            <div class="gy-form-group form-group-special">
                <span class="l">产品描述</span>
                <span>{{productData.productDescription}}</span>
            </div>
            <div class="btns-wrapper">
                <button type="button" @click="$router.push({path: 'list'})" class="gy-button-extra">返回列表</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            id: '',
            productData: {
                productName: '',
                valid: 1,
                productDescription: '',
                productUrl: '',
                skuNoRuleId: '',
                cnAlias: '',
                enFullName: '',
                enAbbreviation: '',
                molecularFormula: '',
                casNo: '',
                categoryIds: '',
                skuNo: '',
                categoryNames: ''
            },
            imgBaseUrl: ''
        };
    },
    created () {
        this.id = this.$route.query.id;
        this.id && this.getDetail();
    },
    methods: {
        getDetail () {
            this.$http.get(this.$api.product.add + '/' + this.id)
                .then((res) => {
                    this.productData = res.data.data;
                });
        }
    }
};
</script>

<style  lang="scss" scoped>
.newINg{
  width: 60px;
  height: 60px;
  float: left;
  img{
    width: 100%;
    height: 100%;
  }
}
.gy-form-group{
  padding-left: 76px;
    .l{
      width: 66px;
    }
}
.list {
  margin-top: 6px;
}
.btns-wrapper {
    margin-top: 12px;
    margin-bottom: 20px;
    text-align: right;
}
</style>
