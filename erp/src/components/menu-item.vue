<template>
    <div class="menu">
        <template v-for="(item) in menuData">
            <el-submenu v-if="item.resourceAccessList && item.resourceAccessList.length > 0"  :index="item.newId" :key="item.newId">
                <template slot="title">
                    <i v-if="item.icon" :class="[item.icon]"></i>&nbsp;<span slot="title">{{ item.label }}</span>
                </template>
                <gy-menu-item :menu-data="item.resourceAccessList"></gy-menu-item>
            </el-submenu>
            <el-menu-item v-else-if="item.type == 'group'" :index="item.newId" :key="item.newId">
                <span class="group-label">{{ item.label }}</span>
            </el-menu-item>
            <el-menu-item @click.native="goPage({name: item.link})" v-else :index="item.newId" :key="item.newId">
                <i v-if="item.icon" :class="[item.icon]"></i>&nbsp;<span slot="title">{{ item.label }}</span>
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
        min-height: 865px;
        .group-label {
            color: #909399;
        }

        *::-webkit-scrollbar {
            display: none;
        }
    }
</style>
