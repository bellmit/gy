<template>
  <div class="commodity-main">
    <div class="gy-h4">前台类目查看</div>
    <div class="gy-form-wrapper">
      <div class="gy-form-group">
        <span class="l">类目名称</span>
        <span>{{info.catalogueName}}</span>
      </div>
      <div class="gy-form-group">
        <span class="l">类目层级</span>
        <span>{{info.catalogueLevel}}</span>
      </div>
      <div class="gy-form-group">
        <span class="l">类目描述</span>
        <span>{{info.catalogueDescription}}</span>
      </div>
      <div class="gy-form-group">
        <span class="l">上级类目</span>
        <div>
          <span v-for="item in info.parentCatalogue" :key="item.id">{{item.catalogueName}}</span>
        </div>
      </div>
      <div class="gy-form-group">
        <span class="l">类目状态</span>
        <span>{{info.valid === 1 ? '可用' : '不可用'}}</span>
      </div>
    </div>
    <div class="btns-wrapper">
      <button type="button" @click="$router.push({path: 'list'})" class="gy-button-extra">返回列表</button>
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
        getInfo: function () {
            let that = this;
            that.$http.get(that.$api.receptionCategory.detail + '/' + that.$route.query.id)
                .then(function (res) {
                    that.info = res.data.data;
                    console.log(that.info);
                });
        }
    }
};
</script>

<style  lang="scss" scoped>
  .gy-form-wrapper {
     padding: 0 14px;
  }
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
