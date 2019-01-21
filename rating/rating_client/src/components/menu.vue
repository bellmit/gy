
<template>
    <div class="gy-menu">
        <!-- <div class="user">
             <div  class="navMenu-user-avatar" style="background-image: url(./static/images/mylogo.ef7dc4e.png);">
        </div> -->
        <el-menu :default-active="menuData.active" class="gy-menu"  :collapse="menuData.isCollapse">
            <gy-menu-item :menu-data="menuData.list"></gy-menu-item>
        </el-menu>
    </div>
</template>

<script>
import gyMenuItem from '@/components/menu-item';
export default {
    name: 'gyMenu',
    components: {
        gyMenuItem
    },
    props: {
        menuData: {
            type: Object,
            default: function () {
                return {
                    active: '1',
                    isCollapse: false,
                    list: [
                        {
                            iconClass: 'iconfont icon-ratingManagement',
                            name: '评级管理',
                            frontUrl: 'RatingManagement'
                        },
                        {
                            iconClass: 'iconfont icon-counterpartyList',
                            name: '交易对手管理',
                            frontUrl: 'counterpartyList'
                        }
                    ]
                };
            }
        }
    },
    data () {
        return {
        };
    },
    methods: {
        setMenuData () {
            let menuList = JSON.parse(localStorage.getItem('userInfoClient')).menuList[0].resourceAccessList || [];
            menuList = menuList.filter((item) => {
                return item.name === '评级客户端菜单';
            });
            this.menuData.list = menuList[0].resourceAccessList;
            console.log(this.menuData.list);
        }
    },
    created () {
        // this.setMenuData();
    }
};
</script>

<style lang="scss">
  .gy-menu {
    height: 100%;
    background-color: #fff;
    color: #303133;;
    border-right: 1px solid #e6eaea;
    width: 240px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    overflow: hidden;
    .el-menu {
      flex: 1;
      border-right-width: 0;
      background: transparent;
      overflow-y: auto;
      overflow-x: hidden;

    &::-webkit-scrollbar {
       display:none
     }
    }
     .user {
         border-bottom: 1px solid #e6eaea;
         height: 90px;
         width: 100%;
     }
    .iconfont{
          width: 20px;
          text-align: left;
    }

    .el-menu-item, .el-submenu__title {
    &:focus, &:hover {
        background: #ecf5ff;
      }
    }
    .el-submenu {
    &.is-opened, &:hover {
                    /*background: $;*/
                  }
    }
    .el-menu-item-group__title {
      padding: 0;
    }
//  .el-menu-item.is-active i {color: red !important; }
  .el-menu-item.is-active { color: #303133 !important; }

  }
</style>
