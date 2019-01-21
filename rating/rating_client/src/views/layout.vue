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
                    <div class="router_title">{{title}}</div>
                    <router-view class="router_view"></router-view>
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
import {mapGetters} from 'vuex';
export default {
    name: 'layout',
    components: {
        top, gyBreadcrumb, gyMenu
    },
    data () {
        return {};
    },
    computed: mapGetters([
        'title'
    ])
};
</script>

<style lang="scss" scoped>
  .layout {
    width: 100%;
    height: 100%;
    .el-header {
       padding: 0;
       background: #fff;
       margin-bottom:10px;
    }
    .el-aside {
        height: 853px;
    }
   .el-container {
       width: 1200px;
       margin: 0 auto;
      .main-wrap {
         padding: 0;
         margin-left:10px;
         height: 853px;
      }
      .gy-breadcrumb {
     }
     .root-router {
         height: 813px;
         box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
         border-radius: 4px;
         border: 1px solid #ebeef5;
         overflow: hidden;
         color: #303133;
         transition: .3s;
         background-color: #fff;
         overflow-y: auto;
        .router_title {
            padding: 10px 20px;
            border-bottom: 1px solid #ebeef5;
            box-sizing: border-box;
            background-color: #fff;
            color: #333;
            font-size: 16px;
            font-weight: 590;
        }
     }
   }
   .root-router{
     margin-top:10px ;
   }
}
</style>
