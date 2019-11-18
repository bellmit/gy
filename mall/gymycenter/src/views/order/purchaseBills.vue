<template>
    <div class="purchaseBills">
        <div class="new-title-public">
           <span v-if="!supply">单据管理</span><span v-if="supply">单据查看</span><span class="numbered">订单号：{{odrOrderSn.orderSn}}</span>
        </div>
        <div class="content">
            <p class="note" v-if="!supply"><span>温馨提示： </span>支持上传图片和pdf格式。为避免冲突，同一类单据请上传相同格式附件。</p>
            <p class="note" v-if="supply"><span>温馨提示： </span>本页面可监控所有交易的单据凭证。</p>
            <div class="c-title"><i class="iconfont icon-dingdanxinxi"></i><span>合同</span></div>
            <div class="gy-form-group">
                <span v-if="!supply" class="l">合同</span>
                <span v-if="supply" class="l">本交易所有合同</span>
                <div class="uploadbox" v-if="signUnderLineData.visible">
                    <img :src=icon @click="showContracts" alt="">
                </div>
                <!-- 上传和通 -->
                <div v-if="!signUnderLineData.visible">
                    <div>
                        <el-upload
                            multiple
                            :disabled="showBillIcon == 3"
                            :class="[{'hide-btn': showBillIcon == 3 || limit === signUnderLineData.list.length}, 'demo']"
                            list-type="picture-card"
                            :data="{'storage':'logistics'}"
                            :action="imgApi"
                            :limit="limit"
                            :on-success="addthImagesuccessht"
                            :on-preview="handlePictureCardPreviewht"
                            :file-list="signUnderLineData.list"
                            :on-remove="handleRemoveht">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                </div>
                <!-- 结束 -->
            </div>
            <div class="c-title cl"><i class="iconfont icon-maoyi-1"></i><span>发票</span></div>
            <!-- <div v-if="!supply">
                <span v-if="supply" class="l fl">本交易所有发票</span>
                <button class="gy-button-extra fr"  @click="openVisible()" style="margin-bottom: 8px">上传发票</button>
            </div> -->
            <div style="margin-top:20px;"></div>
            <gy-order-invoice :order-invoice-data="orderInvoiceList"></gy-order-invoice>
            <!-- <div class="gy-form-group">
                <span v-if="!supply" class="l">发票</span>
                <span v-if="supply" class="l">本交易所有发票</span> -->
                <!-- <div class="uploadbox" v-for="(item, index) in InvoiceUrlList" :key="index">
                    <img width="60px" :src="item.invoiceUrl" alt="" @click="magnifyImg($event)">
                </div> -->
                <!-- 上传发票 -->
                <!-- <div v-if="InvoiceUrlList.length !==0 ">
                    <div>
                        <el-upload
                            multiple
                            :disabled="forbidden"
                            :class="[{'hide-btn': InvoiceUrlList.length || limit === InvoiceUrlList.length}, {'hide-btn': hideBtn}, 'demo']"
                            list-type="picture-card"
                            :data="{'storage':'logistics'}"
                            :action="imgApi"
                            :limit="InvoiceUrlList.length"
                            :file-list="InvoiceUrlList"
                            :on-preview="handlePictureCardPreviewfp"
                            >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                </div> -->
                <!-- 结束 -->
            <!-- </div> -->
            <div class="c-title cl"><i class="iconfont icon-zijinzhanghuicon" style="font-size:12px"></i><span>付款凭证</span></div>
            <div class="table-box">
                <table class="gy-table">
                    <thead>
                        <th style="width:14%">付款单号</th>
                        <th style="width:13%">付款时间</th>
                        <th style="width:9%">付款金额</th>
                        <th style="width:9%">付款类型</th>
                        <th style="width:9%">付款方式</th>
                        <th style="width:9%">付款状态</th>
                        <th style="width:20%">付款凭证</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in voucherList" :key="index">
                            <td>{{item.payNumber}}</td>
                            <td>{{item.payTime | date(true)}}</td>
                            <td class="align-r"><span v-if="item.payBillType===2">-</span>{{item.payTotal | numToCash(2)}}元</td>
                            <td>{{type[item.payMethod]}}</td>
                            <td>{{item.tradeMode === 1 || item.tradeMode === 30 ? "线上支付" : "线下支付"}}</td>
                            <td>{{payStatus[item.payStatus]}}</td>
                            <td>
                                <!-- <img width="40px" height="40ox" v-if="item.tradeMode !== 1" :src="item.fileUrl" alt=""> -->
                                <div v-if="item.genuine">
                                <div v-if="item.tradeMode !== 1 && item.tradeMode !== 30" class="" @click="canshu(item)">
                                    <el-upload
                                        multiple
                                        :disabled="showBillIcon == 3"
                                        :class="[{'hide-btn': showBillIcon == 3 || limit === item.fileUrl.length}, 'demo']"
                                        list-type="picture-card"
                                        :data="{'storage':'logistics'}"
                                        :action="imgApi"
                                        :limit="limit"
                                        :on-success="addthImagesuccess"
                                        :on-preview="handlePictureCardPreviewfk"
                                        :file-list="item.fileUrl"
                                        :on-remove="handleRemove">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                    <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                </div>
                                </div>
                                <div v-if="!item.genuine">
                                    <div v-if="item.tradeMode !== 1" class="" @click="canshu(item)">
                                        <el-upload
                                            multiple
                                            :disabled="forbidden"
                                            :class="[{'hide-btn': item.fileUrl || limit === item.fileUrl.length}, {'hide-btn': hideBtn}, 'demo']"
                                            list-type="picture-card"
                                            :data="{'storage':'logistics'}"
                                            :action="imgApi"
                                            :limit="limit"
                                            :on-success="addthImagesuccess"
                                            :on-preview="handlePictureCardPreview"
                                            :file-list="item.fileUrl"
                                            :on-remove="handleRemove">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <el-dialog :visible.sync="dialogVisible">
                                            <img width="100%" :src="dialogImageUrl" alt="">
                                        </el-dialog>
                                    </div>
                                </div>
                                <div v-if="item.tradeMode == 1 || item.tradeMode == 30">
                                   <a href="https://ebank.sdb.com.cn/corporbank/attachedStandBookBillInput.do"><img :src=pingan style="width: 60px;height: auto;" alt=""></a>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="voucherList.length === 0">
                            <td colspan="7" style="text-align: center;">暂无数据...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="c-title cl"><i class="iconfont icon-maoyi-1"></i><span>货权凭证</span></div>
            <div class="mytable">
                <table class="gy-table">
                    <thead>
                    <tr class="title">
                        <td style="width:26%">商品</td>
                        <td style="width:9%">发货数量</td>
                        <td style="width:8%">签收数量</td>
                        <td style="width:25%">发货仓库</td>
                        <td style="width:26%">货权凭证</td>
                    </tr>
                    </thead>
                    <tbody v-for="(item, index) in propertyList" :key="index">
                    <tr>
                        <td colspan="6" class="update-title"> <span style="color: #999">单号:  </span><span
                            class="right" style="color: #999">{{item.deliveryOrderCode}}</span></td>
                    </tr>
                    <tr v-for="(items, ind ) in item.deliveryOrderItemList" :key="ind">
                        <td class="tleft myleft_dic" style="width:25%">
                            <div class="img-box"><img :src="items.imagePath" alt=""></div>
                            <div class="info-box">{{items.skuName}}<br>￥{{items.skuPrice}}元/吨<br>{{items.skuQuantity}}吨
                            </div>
                        </td>
                        <td class="tleft align-r">{{items.quantityLoading}}吨<br>
                        <td style="width:15%" class="align-r">{{items.quantityUnloading || 0}}吨</td>
                        <td style="width:15%">
                            <p>发货仓库:{{item.loadingWarehouseName}}</p>
                            <p>发货时间:{{item.estimatedArrivalStart | date(true)}}</p>
                            <p>签收时间:{{item.estimatedArrivalEnd | date(true)}}</p>
                        </td>
                        <td>
                            <!-- <div v-if="item.tradeMode !== 1">
                                <img v-for="(items, index) in item.deliveryOrderFileList" @click="magnifyImg($event)" :key="index" class="evidencepic" :src="items.filePath" alt="">
                            </div> -->
                            <!-- 上传发票 -->
                            <div v-if="propertyList[index].deliveryOrderFileList">
                                <div>
                                    <el-upload
                                        multiple
                                        :limit="limit"
                                        :disabled="forbidden"
                                        :class="[{'hide-btn': propertyList[index].deliveryOrderFileList || limit === propertyList[index].deliveryOrderFileList.length}, {'hide-btn': hideBtn}, 'demo']"
                                        list-type="picture-card"
                                        :data="{'storage':'logistics'}"
                                        :action="imgApi"
                                        :file-list="propertyList[index].deliveryOrderFileList"
                                        :on-preview="handlePictureCardPreviewhq"
                                        >
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                    <el-dialog :visible.sync="dialogVisible">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                </div>
                            </div>
                            <!-- 结束 -->
                        </td>
                    </tr>
                    </tbody>
                    <tbody>
                        <tr v-if="propertyList.length === 0">
                            <td colspan="5" style="text-align: center;">暂无数据...</td>
                        </tr>
                    </tbody>
                </table>
                <!-- <div class="totaljl">
                    共 {{data.total}} 条记录
                </!-->
                <!-- <div class="totalfy">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :total="total">
                    </el-pagination>
                </div> -->
            </div>

        </div>
        <!-- 合同预览 -->
        <contract :show-contract.sync="showContract" :show-btn="showHandlechapter" :file="contractUrl"
                  @handlechapter="handleChapter" v-show="showContract">
        </contract>
        <!-- 图片预览 -->
        <el-dialog title="图片预览" :visible.sync="previewerImgs.visible" width="800px" height="800px">
            <img width="100%" :src="InvoiceImageUrl" alt="">
        </el-dialog>
        <!-- 上传发票 -->
        <upload-invoice ref="uploadInvoice"></upload-invoice>
    </div>
</template>

<script>
import gyUpload from '@/components/upload';
import contract from '@/components/contract';
import uploadInvoice from './components/upload-invoice';
import gyOrderInvoice from './components/order-invoice';
export default {
    components: {
        gyUpload,
        contract,
        uploadInvoice,
        gyOrderInvoice
    },
    data () {
        return {
            supply: this.$route.query.supply,
            showBillIcon: this.$route.query.showBillIcon,
            forbidden: true,
            pingan: require('../../assets/images/pab.png'),
            pdfThumbnail: require('../../assets/images/pdf.png'),
            icon: require('@/assets/images/icon-piao.png'),
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
                url: 'http://chinayiepic.oss-cn-shanghai.aliyuncs.com/trade/20190321/local_1000001517370042.pdf',
                valid: null
            }],
            dialogVisible: false,
            dialogImageUrl: '',
            InvoiceImageUrl: '',
            limit: 10,
            allimg1: {},
            hideBtn: false,
            imgApi: process.env.API_ROOT_MAIN + this.$api.account.upload2,
            propertyList: [],
            voucherList: [],
            InvoiceUrlList: [],
            odrOrderSn: {
                orderSn: this.$route.query.odrOrderSn
                // orderSn: 'GY19012200005411'
            },
            orderID: {
                odrOrderId: this.$route.query.orderId
                // odrOrderId: '5411'
            },
            VoucherData: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                data: {
                    lgsConsignmentNoteId: null
                }
            },
            signUnderLineData: {
                visible: false,
                list: []
            },
            currentValue: [],
            previewerImgs: {
                visible: false,
                list: []
            },
            contractUrl: null,
            manifestId: null,
            manifestype: null,
            paymentId: null,
            oldfileUrl: null,
            showContract: false,
            showHandlechapter: false,
            orderInvoiceList: [],
            payStatus: {
                10: '已创建',
                20: '确认',
                30: '支付中',
                40: '已支付',
                50: '已完成',
                60: '已作废'
            },
            type: ['', '货款', '保证金', '结算', '运费', '追补保证金']
        };
    },
    created () {
        this.getVoucherList();
        this.getPropertyList();
        this.getDocUrlList();
        this.getInvoiceUrlList();
        this.getInvoiceInfos();
    },
    methods: {
        // 获取发票明细
        getInvoiceInfos () {
            this.$http.get(this.$api.invoice.DocUrl + '/' + this.$route.query.orderId + '/invoiceInfos')
                .then((res) => {
                    this.orderInvoiceList = res.data.data;
                });
        },
        // 付款凭证列表
        getVoucherList () {
            var that = this;
            that.$http.post(that.$api.payment.voucherList, that.odrOrderSn)
                .then(res => {
                    // console.log(res.data.data);
                    // let regex = '^,*|,*$';
                    res.data.data.map(function (item) {
                        console.log(item);
                        if (item.createdCorpId === JSON.parse(localStorage.getItem('userInfo')).companyId) {
                            item.genuine = true;
                        } else {
                            item.genuine = false;
                        }
                        if (item.fileUrl) {
                            // console.log(item.fileUrl.fileUrl);
                            item.fileUrldata = [];
                            item.fileUrl.map(function (item) {
                                console.log(item.fileUrl.indexOf('http'));
                                if (item.fileUrl.indexOf('http') === -1) {
                                    let timestmp = (new Date()).valueOf();
                                    item.url = process.env.API_ROOT_MAIN + that.$api.payment.paymentImage + '?filePath=' + item.fileUrl + '&t=' + timestmp;
                                } else {
                                    item.url = item.fileUrl;
                                }
                                if ((item.fileUrl.indexOf('.pdf') !== -1)) {
                                    item.url = that.pdfThumbnail;
                                }
                            });
                        }
                    });
                    that.voucherList = res.data.data;
                    console.log(this.voucherList);
                });
        },
        // 获取货权凭证列表
        getPropertyList () {
            this.$http.post(this.$api.payment.propertyList, this.orderID)
                .then(res => {
                    this.propertyList = res.data.data;
                    this.propertyList.map(item => {
                        console.log(item.deliveryOrderFileList);
                        item.deliveryOrderFileList.map(item => {
                            if ((item.filePath.indexOf('.pdf') === -1)) {
                                item.url = item.filePath;
                            } else {
                                item.url = this.pdfThumbnail;
                            }
                        });
                    });
                });
        },
        // 根据订单id返回合同url,
        getDocUrlList () {
            this.$http.get(this.$api.invoice.DocUrl + this.orderID.odrOrderId + '/contracts/getDocUrl')
                .then(res => {
                    if (res.data.code === 0) {
                        if (res.data.data.isOnline === 2) {
                            res.data.data.fileList.map(item => {
                                if ((item.filepath.indexOf('.pdf') !== -1)) {
                                    item.url = this.pdfThumbnail;
                                }
                            });
                            this.signUnderLineData.list = res.data.data.fileList;
                            this.signUnderLineData.visible = false;
                        } else {
                            this.signUnderLineData.visible = true;
                        }
                    }
                });
        },
        // 根据订单id得到发票url,
        getInvoiceUrlList () {
            this.$http.get(this.$api.invoice.sellerInvoiceImg + '/' + this.orderID.odrOrderId)
                .then(res => {
                    // this.InvoiceUrlList = res.data.data;
                    res.data.data.map(item => {
                        if ((item.invoiceUrl.indexOf('.pdf') === -1)) {
                            item.url = item.invoiceUrl;
                        } else {
                            item.url = this.pdfThumbnail;
                        }
                        // this.InvoiceUrlList.push({
                        //     filePath: item,
                        //     url: item
                        // });
                    });
                    this.InvoiceUrlList = res.data.data;
                });
        },
        // 上传合同
        addthImagesuccessht (file, fileList) {
            console.log(file);
            file[0].newurl = file[0].filePath;
            file[0].orderId = this.orderID.odrOrderId;
            console.log(file);
            this.$http.post(this.$api.payment.outlineContactupload, file[0])
                .then(res => {
                    console.log(res);
                    this.getDocUrlList();
                });
        },
        // 放大合同图片
        handlePictureCardPreviewht (file) {
            console.log(file);
            if ((file.filepath.indexOf('.pdf') === -1)) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            } else {
                window.open(file.filepath, '_blank');
            }
        },
        // 删除
        handleRemoveht (file, fileList) {
            console.log(file);
            file.oldurl = '';
            console.log(fileList);
            for (let i = 0; i < this.allimg1.length; i++) {
                if (this.allimg1[i].fileName === file.name) {
                    this.allimg1.splice(i, 1);
                }
            }
            this.$http.post(this.$api.payment.outlineContactupload, file)
                .then(res => {
                    console.log(res);
                });
        },
        // 查看合同
        showContracts () {
            this.handleChapter();
        },
        handleChapter () {
            this.$http.get(this.$api.invoice.DocUrl + this.orderID.odrOrderId + '/contracts/getDocUrl')
                .then(res => {
                    if (res.data.code === 0) {
                        if (res.data.data.isOnline === 2) {
                            this.signUnderLineData.list = [];
                            res.data.data.filepath.map(item => {
                                this.signUnderLineData.list.push({
                                    filePath: item,
                                    url: item
                                });
                            });
                            this.signUnderLineData.visible = true;
                        } else {
                            this.contractUrl = res.data.data.filepath[0];
                            this.showContract = true;
                            this.showHandlechapter = false;
                        }
                    }
                    // this.contractUrl = res.data.data.filepath[0];
                });
        },
        // 放大图片
        magnifyImg (e) {
            this.InvoiceImageUrl = e.target.src;
            this.previewerImgs.visible = true;
        },
        // 放大图片
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 放大发票图片
        handlePictureCardPreviewfp (file) {
            if ((file.invoiceUrl.indexOf('.pdf') === -1)) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            } else {
                // let downloadElement = document.createElement('a');
                // downloadElement.href = file.invoiceUrl;
                // downloadElement.target = '_blank';
                // downloadElement.click();
                window.open(file.invoiceUrl, '_blank');
            }
        },
        // 放大货权凭证图片
        handlePictureCardPreviewhq (file) {
            console.log(file);
            if ((file.filePath.indexOf('.pdf') === -1)) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            } else {
                window.open(file.filePath, '_blank');
            }
        },
        // 放大付款凭证图片
        handlePictureCardPreviewfk (file) {
            console.log(file);
            if ((file.fileUrl.indexOf('.pdf') === -1)) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            } else {
                window.open(file.fileUrl, '_blank');
            }
        },
        canshu (item) {
            console.log(item);
            this.oldfileUrl = item.fileUrl;
            this.manifestId = item.id;
            this.paymentId = item.paymentId;
            // console.log(this.oldfileUrl);
        },
        // 上传付款凭证成功
        addthImagesuccess (file, fileList) {
            this.allimg1 = {
                'userId': JSON.parse(localStorage.getItem('userInfo')).id,
                'paymentId': this.paymentId,
                'fileUrl': file[0].filePath, // 0： 装货单  1： 卸货单
                'id': this.manifestId,
                'orderId': this.orderID.odrOrderId
            };
            console.log(this.allimg1);
            this.$http.post(this.$api.payment.paymentupload, this.allimg1)
                .then(res => {
                    console.log(res);
                    this.getVoucherList();
                });
        },
        // 删除
        handleRemove (file, fileList) {
            console.log(file);
            console.log(fileList);
            for (let i = 0; i < this.allimg1.length; i++) {
                if (this.allimg1[i].fileName === file.name) {
                    this.allimg1.splice(i, 1);
                }
            }
            // var str = '';
            // for (let i = 0; i < fileList.length; i++) {
            //     console.log(fileList[i].url + ',');
            //     str += fileList[i].url + ',';
            //     console.log(str);
            // }
            file.fileUrl = '';
            this.$http.post(this.$api.payment.paymentupload, file)
                .then(res => {
                    console.log(res);
                });
        }
    }
};
</script>
<style lang="scss">
.purchaseBills{
    .hide-btn {
            .el-upload--picture-card {
                display: none !important; // 外部因数影响造成
            }
    }
    .el-upload--picture-card {
        height: 50px;
        line-height: 52px;
        width: 50px;
    }
    .el-upload-list--picture-card .el-upload-list__item{
        height: 50px;
        width: 50px;
        margin-bottom: 2px;
        vertical-align: middle;
    }
    .el-upload-list--picture-card .el-upload-list__item-actions span+span {
        margin-left: 5px;
    }
}
</style>

<style lang="scss" scoped>
.purchaseBills{
    .note{
        padding-top: 20px;
        height: 40px;
        span{
            color: #f4a956;
        }
    }
    .numbered{
        margin-left: 16px;
        font-size: 12px;
        color: #666666;
    }
    .uploadbox{
        width: 50px;
        height: 50px;
        float: left;
        margin-right: 30px;
        img{
            height: 100%;
        }
    }
    .content{
        padding: 0px 16px 0 16px;
        .c-title{
            padding-top: 28px;
            font-size: 14px;
            position: relative;
            color: #333;
            i{
                margin-right: 5px;
                font-size: 14px;
            }
            span{
                font-weight:bold;
            }
        }
        .gy-form-group{
            width: 100%;
            height: 70px;
            margin-top: 3px;
            .l{
                color: #333;
                padding-left: 20px;
            }
        }
        .table-box{
            margin-top: 20px;
        }
    }
    .mytable{
        margin: 20px 0 30px 0;
        .info-box{
            white-space: nowrap;
        }
        .title{
            border: 1px solid #e7ecf1;
            td{
                color: #666!important;
                font-size: 12px;
                font-weight: bold;
            }
        }
        .evidencepic{
            width: 60px;
            height: 60px;
            margin-right: 10px;
        }
        td{
            color: #666!important;
            font-size: 12px;
        }
        .update-title{
            background: #fbfbfc;
            text-align: left;
            padding: 0 16px;
            border: 0;
            vertical-align: middle;
            height: 39px;
            line-height: 39px;
        }
        .myleft_dic{
            overflow: hidden;
            padding: 10px 16px 10px 16px;
            text-align: left;
            .img-box{
                float: left;
                border: 1px solid $color-border;
                margin-right: 10px;
                width: 58px;
                height: 58px;
                float: left;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        tbody{
            border: 1px solid #e7ecf1;
        }
    }
}

</style>
