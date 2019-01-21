<template>
    <div class="gy-menu">
        <el-menu :default-active="menuData.active" class="gy-menu" :collapse="menuData.isCollapse" @open="handleOpen" @close="handleClose">
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
                    list: []
                };
            }
        }
    },
    methods: {
        setNewId: function (prefix, arr) {
            let _this = this;
            arr.forEach(function (obj, index, array) {
                let newId = prefix + '-' + (index + 1);
                if (obj.resourceAccessList && obj.resourceAccessList.length > 0) {
                    _this.setNewId(newId, obj.resourceAccessList);
                }
                obj.newId = newId.slice(1);
            });
            return arr;
        },
        handleOpen (key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose (key, keyPath) {
            // console.log(key, keyPath);
        }
    },
    created () {
        let menus = JSON.parse(localStorage.getItem('menus'));
        if (menus.length > 0) {
            let par = this.setNewId('', menus);
            this.menuData.list = par;
        }
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

  }
</style>
