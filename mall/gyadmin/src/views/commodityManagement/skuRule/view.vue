<template>
    <div class="commodity-main commodity-sku">
        <div class="gy-h4">规则查看</div>
        <div class="list">
            <div class="gy-form-group">
                <span class="l">规则名称</span>
                <span>{{skuData.skuNoRuleName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">规则前缀</span>
                <span>{{skuData.skuNoPrefix}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">当前值</span>
                <span>{{skuData.skuNoCurrentNum}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">递增数</span>
                <span>{{skuData.skuNoAddNum}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">填充值</span>
                <span>{{skuData.skuNoFill}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">长度</span>
                <span>{{skuData.skuNoLength}}</span>
            </div>
            <!--<div class="gy-form-group">-->
                <!--<span class="l">排序</span>-->
                <!--<span>{{skuData.skuNoOrder}}</span>-->
            <!--</div>-->
            <div class="gy-form-group">
                <span class="l">规则状态</span>
                <span>{{skuData.valid === 1 ? '可用' : '不可用'}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">规则描述</span>
                <span>{{skuData.skuNoRuleDescription}}</span>
            </div>
        </div>
        <div class="button-box">
            <button type="button" @click="$router.push({path: 'list'})" class="gy-button-extra">返回列表</button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            skuData: ''
        };
    },
    created () {
        this.getInfo();
    },
    methods: {
        getInfo () {
            this.$http.get(this.$api.sku.add + '/' + this.$route.query.id)
                .then((res) => {
                    this.skuData = res.data.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }
};
</script>
<style lang="scss" scoped>
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
  .list {
     padding: 6px 14px;
  }
  .button-box {
     padding: 5px 0 20px 0;
     text-align: right;
  }
</style>
