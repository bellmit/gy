<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-box">
        <div v-if="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="index">{{ item }}</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>{{ title }}</el-breadcrumb-item> -->
        </div>
  </el-breadcrumb>
</template>

<script>
import routes from '@/router/router';
import {mapGetters} from 'vuex';
export default {
    name: 'breadcrumb',
    data () {
        return {
            desc: 'breadcrumb component',
            breadcrumbData: []
        };
    },
    computed: mapGetters([
        'breadcrumb',
        'title'
    ]),
    watch: {
        breadcrumb (newValue, oldValue) {
            this.breadcrumbFilter(newValue);
        }
    },
    created () {
        console.log(this.$route.meta.title);
        this.breadcrumbFilter(this.breadcrumb);
    },
    methods: {
        breadcrumbFilter (data) {
            this.getName(routes, data, 0, '');
        },
        getName (arr, data, level, ind) {
            level++;
            if (arr && arr.length > 0) {
                arr.map((item, index) => {
                    if (item.name === data) {
                        ind += ',' + index;
                        this.setBreadcrumb(ind, level);
                    } else if (item.children && item.children.length > 0) {
                        this.getName(item.children, data, level, ind + ',' + index);
                    }
                });
            }
        },
        setBreadcrumb (data) {
            let dataArr = data.split(',');
            let arr = [];
            let nameData = routes;
            dataArr.shift();
            for (let i = 0; i < dataArr.length; i++) {
                if (i === 0) {
                    nameData = nameData[dataArr[i]];
                } else {
                    nameData = nameData.children[dataArr[i]];
                }
                if (nameData && nameData.meta && nameData.meta.title) {
                    arr.push(nameData.meta.title);
                }
            }
            this.breadcrumbData = arr;
        }
    }};
</script>
<style lang="scss" scoped>
  .breadcrumb-box {
      background: #fff;
      width: 100%;
      height: 30px;
      display: flex;
      padding-left:20px ;
      align-items: center;
      border-bottom:1px solid $color-border;
      line-height: 30px;
      font-size: 14px;
      font-weight: 1000;
      font-weight: 400;
      color: #606266;
      cursor: text;
  }
</style>
