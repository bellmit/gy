<template>
    <div class="sear404">
      <div class="NAN">
        <div class="icon">
          <i class="iconfont icon-search"></i>
        </div>
        <div class="text">抱歉，暂无相关搜索结果。</div>
      </div>
    </div>
</template>

<script>
export default {
    data () {
        return {

        };
    },
    mounted () {
    },
    methods: {
    }
};
</script>
<style lang="scss" scoped>
.sear404 {
  width: 1200px;
  height: 544px;
  margin: 0 auto;
  margin-top: 45px;
  margin-bottom: 128px;
  background-color: #fff;
  .NAN {
    padding-top: 108px;
    text-align: center;
  }
  .icon {
    width: 44px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-radius: 50%;
    background-color: #ccc;
    .icon-search {
      color: #fff;
    }
  }
  .text {
    font-size: 20px;
    color: #666666;
    text-align: center;
    margin-top: 16px;
  }
}
</style>
