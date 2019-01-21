<template>
  <el-container class="layout">
      <el-header><top></top></el-header>
      <el-container class="wrap-main">
          <el-aside width="240px">
            <gy-menu></gy-menu>
          </el-aside>
          <el-container style="background: #fff;margin-left: 7px;">
              <el-main class="main-wrap">
                   <gy-breadcrumb></gy-breadcrumb>
                  <div class="root-router">
                    <router-view></router-view>
                  </div>
              </el-main>
          </el-container>
      </el-container>
  </el-container>
</template>

<script>
import top from '@/components/top';
import gyBreadcrumb from '@/components/breadcrumb';
import gyMenu from '@/components/menu';
export default {
    name: 'layout',
    components: {
        top, gyBreadcrumb, gyMenu
    },
    data () {
        return {
        };
    },
    methods: {
    }
};
</script>

<style lang="scss" scoped>
  .layout {
    width: 100%;
    height: 100%;
      .el-aside{
          /*min-height: 865px;*/
      }
      .wrap-main {
        width: 1200px;
        min-height: calc(100vh - 68px);
        margin: 0 auto;
        overflow: hidden;
      }
      .root-router{
          border-top: 7px solid #f5f5f5;
      }
  }

  .el-header {
      padding: 0;
      margin-bottom: 8px;
      background-color: #fff;
      box-shadow: 0 4px 6px 0 rgba(0,0,0,0.10);
  }
</style>
