<template>
  <el-dialog class="dialogImg" title="图片预览" :visible.sync="dialogVisible" width="1000px" custom-class="dialog-erp-cont" :before-close="close" append-to-body>
    <div class="block">
      <el-carousel ref="myCarousel" trigger="click" indicator-position="none" :autoplay="false" :loop="false">
        <el-carousel-item v-for="(item, index) in fileList" :key="index">
          <img v-if="item.fileTypeAlias === 'img'" :src="item.fileUrl" alt="" width="100%" height="auto">
          <iframe v-if="item.fileTypeAlias === 'pdf'" :src="item.fileUrl" frameborder="0" width="100%" style="min-height: 490px"></iframe>
          <iframe v-if="item.fileTypeAlias === 'word' || item.fileTypeAlias === 'excel'" :src="'https://view.officeapps.live.com/op/view.aspx?src='+ item.fileUrl" frameborder='0' width="100%" style="min-height: 490px"></iframe>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-dialog>
</template>

<script>
export default {
    data () {
        return {
            dialogVisible: false,
            // fileTypeAlias目前有 'img', 'pdf', 'word'
            // 这里表示文件类型的变量名本来是‘fileType’，但是由于业务里已经使用了这个变量，有其他用处(并且数据冲突)，因此改了变量名
            fileList: [] // 格式: [ {fileName: 'xxxxxxx.jpg', fileTypeAlias: 'img', fileUrl: 'http://xxxxxxx' }... ]
        };
    },
    methods: {
        open (fileListVal) {
            if (this.$refs.myCarousel) {
                // 每次(重新)打开固定显示第一张图
                this.$refs.myCarousel.setActiveItem(0);
            }
            // 参数格式: [ {fileName: 'xxxxxxx.jpg', fileTypeAlias: 'img', fileUrl: 'http://xxxxxxx' }... ]
            if (fileListVal == null || fileListVal === undefined || fileListVal.length === 0) {
                return false;
            }
            this.fileList = [];
            this.dialogVisible = true;
            fileListVal.forEach((e) => {
                e.fileTypeAlias = this.$tools.getFileTypeAlias(e.fileUrl);
            });
            this.fileList = fileListVal;
        },
        open4SingleFile (fileUrl) {
            // 参数格式: 'xxxxxxx.jpg'
            if (fileUrl == null || fileUrl === undefined || fileUrl === '') {
                return false;
            }
            let fileListVal = [];
            fileListVal.push({fileUrl: fileUrl});
            this.open(fileListVal);
        },
        open4MultiFile (fileUrlList) {
            // 参数格式: [ 'xxxxxxx1.jpg', 'xxxxxxx2.jpg'... ]
            if (fileUrlList == null || fileUrlList === undefined || fileUrlList.length === 0) {
                return false;
            }
            let fileListVal = [];
            fileUrlList.forEach((e) => {
                let fileInfo = {
                    fileUrl: e
                };
                fileInfo.fileTypeAlias = this.$tools.getFileTypeAlias(e);
                fileListVal.push(fileInfo);
            });
            this.open(fileListVal);
        },
        close () {
            this.dialogVisible = false;
        }
    }
};
</script>

<style lang="scss">
  .dialogImg{
    .el-dialog{
      .el-dialog__headerbtn{
        top:10px;
        right:16px;
      }
      .el-dialog__body{
        padding-bottom: 30px;
      }
    }
  }
</style>
