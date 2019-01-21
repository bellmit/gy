<!--
    图片预览
-->

<template>
    <div class="previewer-img">
        <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="item in imgList" :key="item">
                <el-dialog :visible.sync="item.visible">
                    <img style="width: 100%" :src="previewer.img">
                </el-dialog>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    name: 'previewerImg',
    props: {
        imgList: {
            type: Array,
            defalult: function () {
                return [];
            }
        }

    },
    data () {
        return {

        };
    }
};
</script>

<style lang="scss" scoped>

</style>
