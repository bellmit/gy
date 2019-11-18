<template>
    <el-dialog width="100px;" class="settle-dialogs" title="发票"
                :visible.sync="Visible"><div>请提供准确真实的单据，否则会影响您在国烨网的信誉及后续交易。</div>
        <template>
            <div v-for="(item, index) in fileList" :key="index">
                <div class="contImgItem">
                    <img v-if="item.indexOf('pdf') != -1" src="../../../assets/images/pdf.png" height="58" width="58" />
                    <img v-else :src="item" width="58" height="58" alt="" />
                    <div>
                        <i @click="deleteImg(index)" class="el-icon-delete"></i>
                    </div>
                </div>
            </div>
        </template>
        <el-upload
                action="api"
                :show-file-list="imgType"
                list-type="picture-card"
                :http-request="settleInfoImg">
            <i class="el-icon-plus"></i>
        </el-upload>
        <span slot="footer" class="dialog-footer">
            <button class="gy-button-extra" @click="sureUrls">确认</button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data () {
        return {
            Visible: false,
            fileList: [],
            imgType: false,
            signUnderLineData: {}
        };
    },
    methods: {
        init () {
            this.Visible = true;
            this.fileList = [];
        },
        settleInfoImg (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            that.$http.post(that.$api.invoice.uploadUrl, formData, headers)
                .then(function (res) {
                    that.fileList.push(res.data);
                });
            console.log(that.fileList);
        },
        deleteImg (idx) {
            this.fileList.splice(idx, 1);
        },
        sureUrls () {
            let that = this;
            if (that.fileList.length === 0) {
                that.$message({
                    type: 'error',
                    message: '请上传发票'
                });
                return;
            }
            that.signUnderLineData = {
                orderId: that.$route.query.orderId,
                invoicePathList: this.fileList
            };
            console.log(that.signUnderLineData);
            that.$http.post(that.$api.invoice.orderInvoices, that.signUnderLineData).then((res) => {
                if (res.data.code === 0) {
                    that.Visible = false;
                    this.$parent.getInvoiceInfos();
                } else {
                    that.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            }).catch(() => {
                console.log('出错了');
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.settle-dialogs {
    .img-holder {
        margin-top: 15px;
    }
    .el-dialog__header {
        padding: 0;
    }
    .el-dialog__body {
        padding: 20px 30px 30px 30px;
    }
    .el-dialog__footer{
        padding: 0 30px 30px;
    }
    .contImgItem {
        float: left;
        position: relative;
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin-right: 12px;
        img {
            width: 50px;
            height: 50px;
            border: 1px solid #c0ccda;
            border-radius: 5px;
        }
        div {
            display: none;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            line-height: 50px;
            border-radius: 5px;
            background: rgba(0, 0, 0, .5);
            font-size: 18px;
            color: #fff;
            text-align: center;
            .delete{
                margin-right: -10px;
                cursor: pointer;
            }
        }
        &:hover div {
            display: block;
        }
    }
}
</style>
