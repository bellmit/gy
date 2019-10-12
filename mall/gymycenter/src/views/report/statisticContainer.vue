<template>
    <div class="sheet-container">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="收付汇总" name="0">
            </el-tab-pane>
            <el-tab-pane label="应付报表" name="1">
            </el-tab-pane>
            <el-tab-pane label="应收汇总" name="2">
            </el-tab-pane>
        </el-tabs>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'sheet-container',
    data () {
        return {
            activeName: '0',
            comps: ['inAndOut', 'paymentSummary', 'collectionSummary']
        };
    },
    methods: {
        handleClick (tab) {
            this.$router.push({name: this.comps[(tab.name)]});
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$router.push({name: vm.comps[0]});
        });
    }
};
</script>

<style scoped>
    .sheet-container {
        background-color: #fff;
        padding-top: 18px;
    }
</style>
