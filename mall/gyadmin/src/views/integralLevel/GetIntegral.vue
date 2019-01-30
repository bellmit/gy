<template>
    <section class="get-level f-container">
        <h3 class="gy-h3">积分获取设置</h3>
        <div class="gy-form-button">
            <button class="gy-button-normal" @click="edit">编辑</button>
        </div>
        <el-table
            class="gy-table"
            :data="ruleList"
            stripe
            ref="table">
            <el-table-column type="selection" width="80"></el-table-column>
            <el-table-column prop="moduleName" label="获取途径"></el-table-column>
            <el-table-column prop="consumptionPoints" label="获得积分" width="400"></el-table-column>
        </el-table>
    </section>
</template>

<script>
import services from '@/services/';

export default {
    name: 'get-level',
    data () {
        return {
            ruleList: []
        };
    },
    methods: {
        getIntegralWays () {
            services.integralLevel.getIntegralWays().then(result => {
                this.ruleList = result;
            }).catch(() => {
                this.$message.error('获取积分规则失败');
            });
        },
        getSelection () {
            const sel = this.$refs.table.selection;
            if (sel.length > 1) {
                this.$message.warning('只能选择一个');
                return [];
            } else if (!sel.length) {
                this.$message.warning('请选择一个');
                return [];
            }
            return sel;
        },
        edit () {
            const sel = this.getSelection()[0];
            if (sel) {
                this.$router.push(`/index/integralLevel/editGetIntegral?i=${sel.moduleId}`);
            }
        }
    },
    mounted () {
        this.getIntegralWays();
    }
};
</script>

<style lang="scss">

</style>
