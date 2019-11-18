<!--
-->

<template>
    <el-pagination
        @size-change="handlePageSizeChange"
        @current-change="handlePageCurrentChange"
        :current-page="value"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
</template>

<script>
export default {
    name: 'pagination',
    props: {
        value: {
            type: Number,
            defalult: 1
        },
        pageSizes: {
            type: Array,
            defalult: function () {
                return [10, 20, 30, 50];
            }
        },
        pageSize: {
            type: Number,
            defalult: 10
        },
        total: {
            type: Number,
            defalult: 1
        }
    },
    data () {
        return {
            page: {
                currentPage: 1,
                pageSizes: [10, 20, 30, 50],
                pageSize: 2,
                total: 0
            }
        };
    },
    methods: {
        handlePageSizeChange (val) {
            this.$emit('pageChange', {
                pageSize: val,
                pageNum: this.value
            });
        },
        handlePageCurrentChange (val) {
            this.$emit('pageChange', {
                pageSize: this.pageSize,
                pageNum: val
            });
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
