<template>
    <div class="search">
        <input type="text" placeholder="请输入" class="gy-input" v-model="subKeywords">
        <!--<span class="span1" @click="search">搜索</span>-->
        <i class="iconfont icon-search span1" @click="search"></i>
    </div>
</template>
<script>
export default {
    data () {
        return {
            subKeywords: ''
        };
    },
    props: ['keywords'],
    methods: {
        search () {
            this.$emit('update:keywords', this.subKeywords);
            this.$emit('search', null);
        }
    }
};
</script>
<style lang="scss" scoped>
  .search{
    position: relative;
    .span1{
      position: absolute;
      top: 0;
      right: 2px;
    }
    .span1:hover{
      cursor: pointer;
    }
  }
</style>
