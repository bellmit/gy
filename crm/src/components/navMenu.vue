<template>
    <div class="gy-menu" v-if="showList">
        <el-menu :default-active="menuData.active" @select="handleSelect" :router="true" :unique-opened="true"
                 @open="handleOpen" @close="handleClose">
            <gy-menu-item :menu-data="menuData.list"></gy-menu-item>
        </el-menu>
    </div>
</template>

<script>
import gyMenuItem from '@/components/menu-item';

export default {
    data () {
        return {
            menuData: {
                active: '',
                list: []
            },
            showList: true
        };
    },
    components: {
        gyMenuItem
    },
    created () {
        let user = localStorage.getItem('userInfo');
        if (user && JSON.parse(user).menuList.length !== 0) {
            this.menuData.list = JSON.parse(user).menuList[0].resourceAccessList;
        }
        // this.firstmenu();
    },
    methods: {
        firstmenu () {
            let navData = this.menuData.list[0].resourceAccessList;
            let frontUrl;
            let firstlist = list => {
                if (list[0].resourceAccessList.length === 0) {
                    frontUrl = list[0].frontUrl;
                } else {
                    firstlist(list[0].resourceAccessList);
                }
            };
            firstlist(navData);
            this.menuData.active = frontUrl;
            this.$router.push({name: frontUrl});
        },
        handleOpen (key, keyPath) {
            // console.log(key, keyPath);
        },
        handleSelect (index, indexPath, target) {
            if (index === 'workbenchPersonal') {
                this.isShowList();
            }
            this.$router.push({name: index});
            this.menuData.active = index;
        },
        handleClose (key, keyPath) {
            // console.log(key, keyPath);
        },
        isShowList () {
            this.showList = false;
            setTimeout(() => { this.showList = true; }, 0);
            // Promise.resolve().then(() => {
            //     this.showList = true;
            // });
        }
    }
};
</script>

<style scoped lang="scss">
    /deep/ .is-active {
        color: $color-highlight;
    }
    /deep/ .is-opened {
        .iconfont {
            color: $color-highlight;
        }
    }
</style>
