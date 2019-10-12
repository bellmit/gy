<template>
  <div class="commodity-main">
    <div class="gy-h4">属性查看</div>
    <div class="gy-form-box-14">
      <div class="gy-form-group">
        <span class="l">属性名称</span>
        <span>{{attributeInfo.optionEntity.optionName}}</span>
      </div>
      <div class="gy-form-group">
        <span class="l">属性状态</span>
        <span>{{attributeInfo.optionEntity.valid === 1 ? '可用' : '不可用'}}</span>
      </div>
      <div class="gy-form-group">
        <span class="l">SKU规则</span>
        <span>{{attributeInfo.optionEntity.skuRuleName}}</span>
      </div>
      <div class="gy-form-group">
        <span class="l">属性描述</span>
        <span>{{attributeInfo.optionEntity.optionDescription}}</span>
      </div>
      <table class="gy-table">
        <thead>
        <tr>
          <th>属性值</th>
          <th>属性编码</th>
          <td>属性值状态</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in attributeInfo.optionValueList" :key="index">
          <th>{{item.optionValue}}</th>
          <th>{{item.skuNo}}</th>
          <td>{{item.valid === 1 ? '可用' : '不可用'}}</td>
        </tr>
        </tbody>
      </table>
      <div class="button-box">
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
            attributeInfo: {}
        };
    },
    created () {
        this.id = this.$route.query.id;
        this.id && this.getDetail();
    },
    methods: {
        getDetail () {
            this.$http.get(this.$api.attribute.add + '/' + this.id)
                .then((res) => {
                    this.attributeInfo = res.data.data;
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.gy-form-box-14 {
   padding-top: 4px;
}
.button-box {
   text-align: right;
   padding-bottom: 20px;
}
.gy-form-group {
  padding-left: 76px;
  .l {
    width: 56px;
  }
}
.gy-form-group:nth-child(odd) {
  padding-right: 30px;
}
.gy-form-group:nth-child(even) {
  padding-left: 106px;
  .l {
    width: 86px;
    padding-left: 30px;
  }
}
</style>
