<template>
    <div class="menu">
        <template v-for="(item) in menuData">
            <el-submenu v-if="item.resourceAccessList && item.resourceAccessList.length > 0"  :index="item.name" :key="item.name">
                <template slot="title">
                    <i v-if="item.icon" :class="[item.icon]"></i>
                    <i v-else-if="item.name === '店铺管理'" class="noIcon"></i>
                    <span slot="title" v-if="item.name === '基础数据'" class="zhiYun">{{ item.name }}</span>
                    <span slot="title" v-else>{{ item.name }}</span>
                </template>
                <gy-menu-item :menu-data="item.resourceAccessList"></gy-menu-item>
            </el-submenu>
            <el-menu-item :link="item.frontUrl" v-else :index="item.frontUrl" :key="item.name">
                <i v-if="item.icon" :class="[item.icon]"></i>&nbsp;&nbsp;<span slot="title">{{ item.name }}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
import menuItem from '@/components/menu-item';
export default {
    name: 'gyMenuItem',
    components: {
        menuItem
    },
    props: {
        menuData: Array,
        menuIndex: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
        };
    },
    created () {
    },
    methods: {
        goPage (data) {
            this.$router.push(data);
        }
    }
};
</script>

<style scoped lang="scss">
    .menu{
        /*min-height: 865px;*/
        .group-label {
            color: #909399;
        }

        *::-webkit-scrollbar {
            display: none;
        }
    }
</style>
