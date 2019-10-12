<template>
  <div>
    <template v-for="(item) in menuData">
      <!--<el-submenu v-if="item.items && item.items.length > 0"  :data-index="menuIndex + index + ''" :index="menuIndex + index + ''" :key="menuIndex + index + ''">-->
        <!--<template slot="title">-->
          <!--<i v-if="item.iconClass" :class="[item.iconClass]"></i>-->
          <!--<span slot="title">{{ item.label }}</span>-->
        <!--</template>-->
        <!--<gy-menu-item :menu-data="item.items" :data-index="menuIndex + index + '-'" :menu-index="menuIndex + index + '-'"></gy-menu-item>-->
      <!--</el-submenu>-->
      <!--<el-menu-item v-else-if="item.type == 'group'"  :data-index="menuIndex + index + ''" :index="menuIndex + index + ''" :key="menuIndex + index + ''">-->
        <!--<span class="group-label">{{ item.label }}</span>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item @click.native="goPage({name: item.link})" v-else  :data-index="menuIndex + index + ''" :index="menuIndex + index + ''" :key="menuIndex + index + ''">-->
        <!--<i v-if="item.iconClass" :class="[item.iconClass]"></i>-->
        <!--<span slot="title">{{ item.label }}</span>-->
      <!--</el-menu-item>-->
        <!---------------------------------------------------------->
        <!--<el-submenu v-if="item.items && item.items.length > 0"  :index="item.newId" :key="item.newId">-->
            <!--<template slot="title">-->
                <!--<i v-if="item.iconClass" :class="[item.iconClass]"></i><span slot="title">{{ item.label }}</span>-->
            <!--</template>-->
            <!--<gy-menu-item :menu-data="item.items"></gy-menu-item>-->
        <!--</el-submenu>-->
        <!--<el-menu-item v-else-if="item.type == 'group'" :index="item.newId" :key="item.newId">-->
            <!--<span class="group-label">{{ item.label }}</span>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item @click.native="goPage({name: item.link})" v-else :index="item.newId" :key="item.newId">-->
        <!--<i v-if="item.iconClass" :class="[item.iconClass]"></i>-->
            <!--<span slot="title">{{ item.label }}</span>-->
        <!--</el-menu-item>-->
    <!--</template>-->

      <!---------------------------------------------------------->
      <el-submenu v-if="item.resourceAccessList && item.resourceAccessList.length > 0"  :index="item.newId" :key="item.newId">
          <template slot="title">
              <i v-if="item.icon" :class="[item.icon]"></i>&nbsp;<span slot="title">{{ item.name }}</span>
          </template>
          <gy-menu-item :menu-data="item.resourceAccessList"></gy-menu-item>
      </el-submenu>
      <el-menu-item v-else-if="item.type == 'group'" :index="item.newId" :key="item.newId">
          <span class="group-label">{{ item.name }}</span>
      </el-menu-item>
      <el-menu-item @click.native="goPage({name: item.frontUrl})" v-else :index="item.newId" :key="item.newId">
          <i v-if="item.icon" :class="[item.icon]"></i>&nbsp;<span slot="title">{{ item.name }}</span>
      </el-menu-item>
</template>
  </div>
</template>

<script>
// import menuItem from '@/components/menu-item';
export default {
    name: 'gyMenuItem',
    // components: {
    //     menuItem
    // },
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
