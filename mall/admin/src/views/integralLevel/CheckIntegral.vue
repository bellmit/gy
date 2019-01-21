<template>
    <section class="check-integral f-container">
        <h3 class="gy-h3">消费积分查看</h3>
        <el-form class="gy-detail-form clearfix short" :model="info" ref="controlForm" label-width="128px">
            <el-form-item class="half gy-label" prop="a" label="消费积分总发放"></el-form-item>
            <el-form-item class="half gy-label" prop="b" label="消费积分总消耗"></el-form-item>
            <el-form-item class="half gy-label" prop="c" label="消费积分总剩余"></el-form-item>
        </el-form>
        <h3 class="gy-h3">今日积分查看</h3>
        <el-form class="gy-detail-form clearfix short" :model="info" ref="controlForm" label-width="128px">
            <el-form-item class="half gy-label" prop="a" label="今日积分发放"></el-form-item>
            <el-form-item class="half gy-label" prop="b" label="今日积分消耗"></el-form-item>
        </el-form>
    </section>
</template>

<script>
export default {
    name: 'check-integral',
    data () {
        return {
            info: {}
        };
    }
};
</script>
