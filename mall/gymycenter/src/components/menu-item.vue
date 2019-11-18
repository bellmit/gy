<template>
    <div>
        <template v-for="(item) in menuData">
            <el-submenu v-if="item.resourceAccessList && item.resourceAccessList.length > 0" :index="item.name"
                        :key="item.name">
                <template slot="title">
                    <i v-if="item.icon" :class="[item.icon]"></i><i v-else-if="item.name === '店铺管理'" class="noIcon"></i><span
                    slot="title" v-if="item.name === '基础数据'" class="zhiYun">{{ item.name }}</span><span slot="title"
                                                                                                        v-else>{{ item.name }}</span>
                </template>
                <gy-menu-item :menu-data="item.resourceAccessList"></gy-menu-item>
            </el-submenu>
            <el-menu-item @click="goIm(item)" :link="item.frontUrl" v-else :index="item.frontUrl" :key="item.name">
                <i v-if="item.icon" :class="[item.icon]"></i><span slot="title">{{ item.name }}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
export default {
    name: 'gyMenuItem',
    props: {
        menuData: Array
    },
    data () {
        return {};
    },
    methods: {
        goIm (item) {
            if (item.frontUrl === 'marriedDealMain') {
                let currentPhone = JSON.parse(localStorage.getItem('userInfo')).phone;
                window.open('/im/#type=2&username=' + window.btoa(currentPhone) + '&touser=' + window.btoa(1), '_blank');
            }
        }
    }
};
</script>

<style scoped lang="scss">
    .el-submenu__title i {
        display: inline-block;
        width: 20px !important;
    }

    .el-submenu__title {
        .noIcon {
            width: 0px !important;
            /*padding-left: 5px;*/
        }
    }

    /*.group-label {*/
    /*color: #909399;*/
    /*}*/

    /**::-webkit-scrollbar {*/
    /*display: none;*/
    /*}*/
</style>
