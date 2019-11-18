<template>
    <div class="billsManagement">
        <div class="new-title-public">
            单据管理<span class="numbered">订单号：{{consignmentNoteCode}}</span>
        </div>
        <div class="table-box">
            <table class="gy-table">
                <thead>
                    <th style="width:44px;">序号</th>
                    <th style="width:100px;">调度单号</th>
                    <th style="width:70px;">调度人</th>
                    <th style="width:90px;">车辆</th>
                    <th style="width:90px;">司机/电话</th>
                    <th style="width:60px;">调度量</th>
                    <th style="width:60px;">装货量</th>
                    <th style="width:60px;">卸货量</th>
                    <th style="width:80px;">审核状态</th>
                    <th style="width:120px;">提货单</th>
                    <th style="width:120px;">卸货单</th>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in billsManagementList" :key="index">
                        <td>{{index+1}}</td>
                        <td>{{item.dispatchNoteCode}}</td>
                        <td>{{item.schedulingPeople}}</td>
                        <td>{{item.licensePlateNumber}}</td>
                        <td>{{item.driverUsername}}/{{item.driverPhone}}</td>
                        <td class="align-r">{{item.quantityPlanned}}吨</td>
                        <td class="align-r">{{item.quantityLoading}}吨</td>
                        <td class="align-r">{{item.quantityUnloading}}吨</td>
                        <td>
                            {{item.billStatusStr}}
                            <el-tooltip poper-class="test" :content="item.billRemark" placement="top" effect="light">
                                <span><i v-if="item.billStatus === 2" style="color: red;" class="iconfont icon-fail"></i></span>
                            </el-tooltip>
                        </td>
                        <td>
                            <div class="uploadbox" @click="canshu(item, '0')">
                                <el-upload
                                    :disabled="item.billStatus === 3"
                                    :class="[{'hide-btn': limit && item.billStatus === 3 || limit === billsManagementList[index].loadingPicturesList.length}, {'hide-btn': hideBtn}, 'demo']"
                                    list-type="picture-card"
                                    :data="{'storage':'logistics'}"
                                    :action="imgApi"
                                    :limit="limit"
                                    :on-success="addthImagesuccess"
                                    :on-preview="handlePictureCardPreview"
                                    :file-list="billsManagementList[index].loadingPicturesList"
                                    :on-remove="handleRemove">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </td>
                        <td>
                            <div class="uploadbox" @click="canshu(item, '1')">
                                <el-upload
                                    :disabled="item.billStatus === 3"
                                    :class="[{'hide-btn': limit && item.billStatus === 3 || limit === billsManagementList[index].unloadingPicturesList.length}, {'hide-btn': hideBtn}, 'demo']"
                                    list-type="picture-card"
                                    :data="{'storage':'logistics'}"
                                    :action="imgApi"
                                    :limit="limit"
                                    :on-success="addthImagesuccess"
                                    :on-preview="handlePictureCardPreview"
                                    :file-list="billsManagementList[index].unloadingPicturesList"
                                    :on-remove="handleRemove">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="billsManagementList.length === 0">
                        <td colspan="11" style="text-align: center;">暂无数据...</td>
                    </tr>
                </tbody>
            </table>
            <div class="departmentName">共 {{billsData.total}} 条记录</div>
            <el-pagination
                background
                @current-change="changeSelect"
                @size-change="sizeChange"
                layout="prev, pager, next"
                style="margin: 20px 0 30px 0;"
                :current-page.sync="billsData.pageNum"
                :page-size="billsData.pageSize"
                :total="billsData.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import gyUpload from '@/components/upload';
export default {
    components: {
        gyUpload
    },
    data () {
        return {
            disabled: false,
            pcival: [{
                createdBy: null,
                createdDate: null,
                fileDisplayName: null,
                fileName: '360截图16591008244908.png',
                filePath: 'http://chinayiepic.oss-cn-shanghai.aliyuncs.com/logistics/20190403/0d8c7bcd-60aa-47db-ae3e-457e870fd93e.png',
                fileType: 0,
                id: 625,
                keywords: null,
                updatedBy: null,
                updatedDate: null,
                url: 'http://chinayiepic.oss-cn-shanghai.aliyuncs.com/logistics/20190403/0d8c7bcd-60aa-47db-ae3e-457e870fd93e.png',
                valid: null
            }],
            dialogVisible: false,
            dialogImageUrl: '',
            limit: 3,
            allimg1: {},
            hideBtn: false,
            imgApi: process.env.API_ROOT_MAIN + this.$api.account.upload2,
            consignmentNoteCode: this.$route.query.consignmentNoteCode,
            billsManagementList: null,
            billsmanagement: true,
            billsData: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                data: {
                    lgsConsignmentNoteId: null
                }
            },
            manifestId: null,
            manifestype: null
        };
    },
    created () {
        this.billsData.data.lgsConsignmentNoteId = this.$route.query.orderId;
        console.log(this.billsData.data.lgsConsignmentNoteId);
        this.getbillsManagement();
    },
    methods: {
        getbillsManagement () {
            this.$http.post(this.$api.transport.documentsManagementList, this.billsData)
                .then(res => {
                    console.log(res.data.data.list);
                    this.billsData.total = res.data.data.total;
                    this.billsManagementList = res.data.data.list;
                    this.billsManagementList.map(function (item) {
                        console.log(item);
                    });
                });
        },
        // 冯海莹新增 js
        handlePictureCardPreview (file) {
            console.log(file);
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        canshu (item, manifestype) {
            this.manifestId = item.id;
            this.manifestype = manifestype;
        },
        // 上传成功
        addthImagesuccess (file, fileList) {
            this.allimg1 = {
                'createdBy': JSON.parse(localStorage.getItem('userInfo')).id,
                'fileDisplayName': file[0].fileName,
                'fileName': file[0].fileName,
                'filePath': file[0].filePath,
                'fileType': this.manifestype, // 0： 装货单  1： 卸货单
                'lgsDispatchNoteId': this.manifestId
            };
            console.log(this.allimg1);
            this.$http.post(this.$api.transport.addUploadDocumentsFile, this.allimg1)
                .then(res => {
                    console.log(res);
                    this.getbillsManagement();
                });
        },
        // 删除
        handleRemove (file, fileList) {
            console.log(file.id);
            console.log(fileList);
            for (let i = 0; i < this.allimg1.length; i++) {
                if (this.allimg1[i].fileName === file.name) {
                    this.allimg1.splice(i, 1);
                }
            }
            this.$http.get(this.$api.transport.deleteDocumentsFile + '/' + file.id)
                .then(res => {
                    console.log(res);
                    this.getbillsManagement();
                });
        },
        // 页码
        changeSelect (pageNo) {
            this.billsData.pageNum = pageNo;
            this.getbillsManagement();
        },
        sizeChange (val) {
            console.log(val);
            this.billsData.pageSize = val;
            this.getbillsManagement();
        }
    }
};
</script>

<style lang="scss" scoped>
.billsManagement{
    .numbered{
        margin-left: 16px;
        font-size: 12px;
        color: #666666;
    }
    .table-box{
        padding: 24px 16px 0 16px;
    }

}

</style>
<style lang="scss">
.billsManagement{
    .hide-btn {
            .el-upload--picture-card {
                display: none !important; // 外部因数影响造成
            }
    }
    .el-upload--picture-card{
        width:40px;
        height:40px;
        line-height: 40px;
    }
    .el-upload-list--picture-card .el-upload-list__item{
        width:40px;
        height:40px;
    }
    .el-upload-list__item-status-label{
        width: 30px;
        // height: 24px;
        top: -10px;
    }
    .el-upload-list__item-actions{
        font-size: 14px;
    }
    .el-upload-list__item-actions .el-upload-list__item-delete{
        margin-left: -0px;
    }
}
</style>
