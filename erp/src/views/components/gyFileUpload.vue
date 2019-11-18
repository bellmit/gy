<template>
    <div class="file-upload">
        <template v-for="(item, index) in fileList">
            <div class="contImgItem" :key="index">
                <img v-if="item.fileTypeAlias === 'img'" :src="item.fileUrl" width="50" height="50" alt="" />
                <img v-if="item.fileTypeAlias === 'pdf'" src="../../assets/images/PDF.png" height="50" width="50" />
                <img v-if="item.fileTypeAlias === 'word'" src="../../assets/images/WORD.png" height="50" width="50" />
                <img v-if="item.fileTypeAlias === 'excel'" src="../../assets/images/EXCEL.png" height="50" width="50" />
                <div>
                    <i class="el-icon-zoom-in plus" @click="elPlus(item)"></i>
                    <i @click="deleteImg(index)" class="el-icon-delete"></i>
                </div>
            </div>
        </template>
        <el-upload action="api" list-type="picture-card"
                    :drag="boolUpload"
                    multiple
                    class="upload-demo-tz"
                    :disabled="stopUpload"
                    :before-upload="beforeAvatarUpload"
                    :show-file-list="false"
                    :http-request="onFileUpload">
            <!-- <i class="el-icon-plus"></i> -->
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">拖到此处，或<em>点击上传</em></div>
            <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
        <gy-file-view ref="uFileView"></gy-file-view>
    </div>
</template>

<!--
 使用方法：调用端要定义回调函数 @callbackFileUpload="onCallbackFileUpload"，每上传一个附件调用一次，直接把所有文件列表传回调用端
 参数格式：[ { fileName: 'xxxxxxx.jpg', fileTypeAlias: 'img', fileUrl: 'http://xxxxxxx' } ... ]
 fileTypeAlias目前有 'img', 'pdf', 'word'
 这里表示文件类型的变量名本来是‘fileType’，但是由于业务里已经使用了这个变量，有其他用处(并且数据冲突)，因此改了变量名

 关于endUpload()，一般只用于在对话框中上传附件，并且上传提交后对话框不关闭
 如果是上传提交后画面直接跳转的，不必再调用此函数
--->
<script>
import gyFileView from './gyFileView';

export default {
    name: 'gyFileUpload',
    components: {
        gyFileView
    },
    data () {
        return {
            stopUpload: false,
            boolUpload: true,
            // 存放显示图片
            fileList: [] // 格式: [ {fileName: 'xxxxxxx.jpg', fileTypeAlias: 'img', fileUrl: 'http://xxxxxxx' }... ]
        };
    },
    methods: {
        // 初始化变量，由外部调用
        init () {
            this.stopUpload = false;
            this.fileList = [];
        },
        // 图片放大
        elPlus (val) {
            let arr = [];
            arr.push(val);
            this.$refs.uFileView.open(arr);
        },
        deleteImg (idx) {
            if (this.stopUpload) {
                return false;
            }
            this.fileList.splice(idx, 1);
            // 回调
            this.$emit('callbackFileUpload', this.fileList);
        },
        // 上传文件之前判断文件大小
        beforeAvatarUpload (file) {
            this.isLt10M = file.size < 10485760;
            if (!this.isLt10M) {
                this.$message.error('您上传的文件过大，请上传10M以下的文件');
                return this.isLt10M;
            }
        },
        onFileUpload (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            this.$http.post(this.url || this.$api.upload.imgUpload, formData, headers)
                .then(res => {
                    if (res.data.code === 0) {
                        let fileInfo = res.data.data;
                        fileInfo.fileTypeAlias = that.$tools.getFileTypeAlias(fileInfo.fileUrl);
                        if (that.isLt10M) {
                            that.fileList.push(fileInfo);
                        }
                        // 回调
                        that.$emit('callbackFileUpload', that.fileList);
                    } else {
                        that.$alert(res.data.code + ' ' + res.data.message);
                    }
                });
        },
        endUpload () {
            this.stopUpload = true;
        }
    }
};
</script>

<style lang="scss" scoped>
    .file-upload > div{
        display: inline-block;
    }
</style>
<style lang="scss">
    .file-upload{
        .el-upload--picture-card{
            border: none;
        }
        .el-upload-dragger{
            width: 160px!important;
            height: 50px!important;
            border: 1px dashed #d9d9d9!important;
        //     width: 40px;
        //     text-align: center;
        //     line-height: 40px;
        //     border: 1px solid #e6eaea;
        //     border-radius: 0;
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
        .upload-demo-tz {
            width: 160px;
            height: 50px;
        }

    }
</style>
