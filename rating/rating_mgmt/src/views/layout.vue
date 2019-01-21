<template>
  <el-container class="layout">
      <el-header><top></top></el-header>
      <el-container>
          <el-aside width="240px">
            <gy-menu></gy-menu>
          </el-aside>
          <el-container>
              <el-main class="main-wrap">
                  <gy-breadcrumb class="gy-breadcrumb"></gy-breadcrumb>
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
        return {};
    }
};
</script>

<style lang="scss" scoped>
  .layout {
    width: 100%;
    height: 100%;
  }

  .el-header {
    padding: 0;
  }
  .main-wrap {
      padding: 0;
  }
  .gy-breadcrumb {
    //   padding:20px;
  }
    .root-router{
        padding: 20px 30px 0px 16px;
    }
</style>
