<template>
    <div class="app-detail">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
                <gy-rating-form :base-data="info" @approval="approval"></gy-rating-form>
            </el-tab-pane>
            <el-tab-pane label="附加信息" name="second">
                  <gy-extra-info :base-data="info" :group-id='0' @approval="approval"></gy-extra-info>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import gyRatingForm from '../ratingApplication/ratingForm';
import gyExtraInfo from './form';
export default {
    name: 'detail',
    components: {
        gyRatingForm,
        gyExtraInfo
    },
    data () {
        return {
            info: {},
            activeName: 'first'
        };
    },
    created () {
        // lc
    },
    watch: {
    },
    methods: {
        approval () {
            this.activeName = 'second';
        },
        handleClick (tab, event) {
            // console.log(tab, event);
        }
    }
};
</script>
<style scoped lang="scss">
</style>
