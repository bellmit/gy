<template>
    <span class="file-img-wrapper">
        <span @click="previewPictures(imgInfo.fileUrl)" class="img_cursor">
            <img v-if="item.fileTypeAlias === 'img'" :src="imgInfo.fileUrl" width="40" height="40" alt="" />
            <img v-if="item.fileTypeAlias === 'pdf'" src="../../assets/images/PDF.png" height="40" width="40" />
            <img v-if="item.fileTypeAlias === 'word'" src="../../assets/images/WORD.png" height="40" width="40" />
            <img v-if="item.fileTypeAlias === 'excel'" src="../../assets/images/EXCEL.png" height="40" width="40" />
        </span>
        <gy-file-view ref="uFileView"></gy-file-view>
    </span>
</template>

<script>
import gyFileView from './gyFileView';

export default {
    components: {
        gyFileView
    },
    props: {
        imgInfo: Object // 格式: {fileName: 'xxxxxxx.jpg', fileTypeAlias: 'img', fileUrl: 'http://xxxxxxx' }
    },
    data () {
        return {
            item: {}
        };
    },
    created () {
        this.item.fileTypeAlias = this.$tools.getFileTypeAlias(this.imgInfo.fileUrl);
    },
    methods: {
        // 预览图片
        previewPictures (val) {
            this.$refs.uFileView.open4SingleFile(val);
        }
    }
};
</script>

<style lang="scss">
    .file-img-wrapper {
        .img_cursor {
            display: inline-block;
            cursor:pointer;
            margin-bottom: 15px;
        }
    }
</style>
