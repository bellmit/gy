<template>
    <div class="file-upload">
        <template v-for="(item, idx) in imgData">
            <div class="contImgItem" :key="idx">
                <img v-if="item.fileTypeAlias === 'img'" :src="item.url" alt="" />
                <img v-if="item.fileTypeAlias === 'pdf'" src="../../assets/images/PDF.png"/>
                <img v-if="item.fileTypeAlias === 'word'" src="../../assets/images/WORD.png"/>
                <img v-if="item.fileTypeAlias === 'excel'" src="../../assets/images/EXCEL.png"/>
                <div>
                    <i class="el-icon-zoom-in plus" @click="elPlus(item)"></i>
                    <i @click="removeImg(idx)" class="el-icon-delete"></i>
                </div>
            </div>
        </template>
        <el-upload  action="api"
                    multiple
                    :file-list="imgData"
                    list-type="picture-card"
                    :drag="boolUpload"
                    class="upload-demo-tz"
                    :show-file-list="false"
                    :http-request="onFileUpload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <gy-file-view ref="uFileView"></gy-file-view>
    </div>
</template>

<script>
import gyFileView from './gyFileView';
export default {
    components: {
        gyFileView
    },
    props: {
        fileList: Array
    },
    data () {
        return {
            boolUpload: true,
            imgData: [],
            dialogImageUrl: ''
        };
    },
    created () {
        if (this.fileList && this.fileList.length > 0) {
            this.fileList.map((item, index) => {
                this.imgData.push(
                    {
                        name: index,
                        url: item,
                        fileName: index,
                        fileUrl: item,
                        fileTypeAlias: this.$tools.getFileTypeAlias(item)
                    }
                );
            });
        }
    },
    methods: {
        // 图片放大
        elPlus (val) {
            let arr = [];
            arr.push(val);
            this.$refs.uFileView.open(arr);
        },
        removeImg (idx) {
            this.imgData.splice(idx, 1);
            this.$emit('callbackFileUpload', this.imgData);
        },
        onFileUpload (file) {
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            this.$http.post(this.$api.upload.imgUpload, formData, headers)
                .then(res => {
                    if (res.data.code === 0) {
                        let obj = res.data.data;
                        obj.name = obj.fileName;
                        obj.url = obj.fileUrl;
                        obj.fileTypeAlias = this.$tools.getFileTypeAlias(obj.fileUrl);
                        this.imgData.push(obj);
                        // 回调
                        this.$emit('callbackFileUpload', this.imgData);
                    } else {
                        this.$alert(res.data.code + ' ' + res.data.message);
                    }
                });
        }
    }
};
</script>

<style lang="scss" scoped>
    .file-upload > div{
        display: inline-block;
    }
    .contImgItem {
        width: 50px;
        height: 50px;
        div .plus {
            margin-left: 0px;
        }
        img {
            width: 50px;
            height: 50px;
            border-radius: 5px;
        }
    }
</style>
<style lang="scss">
    .file-upload{
        .el-upload-list--picture-card .el-upload-list__item-actions span+span {
            margin-left: 4px;
        }
        .el-upload-list--picture-card .el-upload-list__item {
            width: 50px !important;
            height: 50px !important;
        }
        .el-upload--picture-card {
            border: none;
        }
        .el-upload-dragger {
            width: 160px!important;
            height: 50px!important;
            border: 1px dashed #d9d9d9!important;
            &:hover {
                border-color: #409eff!important;
            }
        }
        .el-icon-upload {
            margin: 0;
            line-height: 20px;
            position: relative;
            top: -3px;
        }
        .el-upload__text {
            font-size: 12px;
            margin-top: -25px;
        }
        .contImgItem {
            margin-bottom: 6px;
        }
    }
</style>
