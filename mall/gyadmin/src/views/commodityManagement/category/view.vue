<template>
  <div class="commodity-main">
    <div class="gy-h4">后台类目查看</div>
    <div class="gy-form-box-14">
      <div class="gy-form-group">
        <span class="l">类目名称</span>
        <span>{{info.categoryName}}</span>
      </div>
      <div class="gy-form-group">
        <span class="l">类目层级</span>
        <span>{{info.categoryLevel}}</span>
      </div>
      <div class="gy-form-group">
        <span class="l">类目描述</span>
        <span>{{info.categoryDescription}}</span>
      </div>
      <div class="gy-form-group">
        <span class="l">上级类目</span>
        <div>
          <span>{{info.categoryList[0].categoryName}}</span>
        </div>
      </div>
      <div class="gy-form-group">
        <span class="l">类目状态</span>
        <!--<span class="l">可用</span>-->
        <span>{{info.valid === 1 ? '可用' : '不可用'}}</span>
      </div>
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
            info: ''
        };
    },
    created () {
        this.getInfo();
    },
    methods: {
        getInfo () {
            this.$http.get(this.$api.category.detail + '/' + this.$route.query.id)
                .then((res) => {
                    this.info = res.data.data;
                });
        }
    }
};
</script>

<style lang="scss" scoped>
  .gy-form-box-14 {
     margin-top: 11px;
  }
  .gy-form-group {
      padding-left: 86px;
     .l {
        width: 76px;
     }
  }
  .button-box {
     text-align: right;
  }
</style>
