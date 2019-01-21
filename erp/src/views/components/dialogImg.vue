<template>
  <el-dialog class="dialogImg" title="图片预览" :visible.sync="dialogVisible" width="1000px" custom-class="dialog-erp-cont" :before-close="close" append-to-body>
    <div class="block">
      <el-carousel trigger="click" indicator-position="none" :autoplay="false">
        <el-carousel-item v-for="(item, index) in dialogImg" :key="index">
          <!--<img :src="item.fileUrl" alt="" width="100%" height="100%">-->
          <img v-if="$constant.imgType.indexOf(item.fileUrl.split('.').pop().toLowerCase()) !== -1" :src="item.fileUrl" alt="" width="100%" height="auto">
          <iframe v-if="item.fileUrl.split('.').pop().toLowerCase() === 'pdf'" :src="item.fileUrl" frameborder="0" width="100%" style="min-height: 490px"></iframe>
          <iframe v-if="$constant.fileType.indexOf(item.fileUrl.split('.').pop().toLowerCase()) !== -1" :src="'https://view.officeapps.live.com/op/view.aspx?src='+ item.fileUrl" frameborder='0' width="100%" style="min-height: 490px"></iframe>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-dialog>
</template>

<script>
export default {
    props: {
        dialogImg: {
            default: []
        },
        dialogVisible: {
            default: false
        }
    },
    data () {
        return {
        };
    },
    methods: {
        close () {
            this.$emit('closedialogvisible');
        }
    }
};
</script>

<style lang="scss">
  .dialogImg{
    .el-dialog{
      .el-dialog__header {
        height:35px;
        line-height: 35px;
        padding:0 0 0 16px;
        border-bottom:1px solid #e6eaea;
      }
      .el-dialog__title{
        font-size: 16px;
        font-weight: bold;
        color:#333333;
      }
      .el-dialog__headerbtn{
        top:10px;
        right:16px;
      }
      .el-dialog__body{
        padding:30px;
      }
    }
  }
</style>
