<template>
  <div>
    <template v-for="item in menuData">
      <el-submenu v-if="item.resourceAccessList && item.resourceAccessList.length > 0"  :index="item.name" :key="item.id">
          <template slot="title">
                <i v-if="item.icon" :class="[item.icon]"></i>&nbsp;<span slot="title">{{ item.name }}</span>
          </template>
          <gy-menu-item :menu-data="item.resourceAccessList"></gy-menu-item>
      </el-submenu>
      <el-menu-item v-else-if="item.type == 'group'" :index="item.name" :key="item.id">
          <span class="group-label">{{ item.name }}</span>
      </el-menu-item>
      <el-menu-item @click.native="goPage({name: item.frontUrl})" v-else :index="item.name" :key="item.id">
          <i v-if="item.icon" :class="[item.icon]"></i>&nbsp;<span slot="title">{{ item.name }}</span>
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
    methods: {
        goPage (data) {
            this.$router.push(data);
        }
    }
};
</script>

<style scoped lang="scss">
  .group-label {
    color: #909399;
  }

  *::-webkit-scrollbar {
    display: none;
  }
</style>
