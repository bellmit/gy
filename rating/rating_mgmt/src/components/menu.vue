
<template>
    <div class="gy-menu">
        <el-menu :default-active="menuData.active" class="gy-menu"   :collapse="menuData.isCollapse">
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
                            iconClass: 'iconfont icon-counterpartyList',
                            name: '客户分配',
                            frontUrl: 'customerList'
                        },
                        {
                            iconClass: 'iconfont icon-check',
                            name: '核准与评级',
                            frontUrl: 'checkList'
                        },
                        {
                            iconClass: 'iconfont icon-application',
                            name: '申请查看评级审核',
                            frontUrl: 'customerAppList'
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
            let menuList = JSON.parse(localStorage.getItem('userInfo')).menuList[0].resourceAccessList || [];
            // menuList = menuList.filter((item) => {
            //     return item.name === '服务端评级菜单';
            // });
            this.menuData.list = menuList;
        }
    },
    created () {
        // this.menuData.active = '0';
        this.setMenuData();
    }
};
</script>

<style lang="scss">
  .gy-menu {
    height: 100%;
    background-color: #5a5959;

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
      .iconfont{
          width: 20px;
          text-align: left;
      }

    .el-menu-item, .el-submenu__title {
      color: hsla(0,0%,100%,.7);

    &:focus, &:hover {
        background: transparent;
        color: #fff;
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
  .el-menu-item.is-active { background-color: #363636 !important; }

  }

</style>
