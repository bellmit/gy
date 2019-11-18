<template>
    <div class="standingBook standingBook-upload">
        <!-- 高级搜索 -->
        <div class="search-btn">
            <span @click="isShowSearch = !isShowSearch" class="ShowSearch">高级搜索<i class="el-input__icon" :class="isShowSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </div>
        <div class="my-search clearfix">
            <div class="gy-form-group">
                <span class="l">合同要素ID</span>
                <input type="text" placeholder="请输入合同要素ID" v-model="search.contractId">
            </div>
            <div class="gy-form-group">
                <span class="l">合同编号</span>
                <input type="text" placeholder="请输入合同编号" v-model="search.orderSn">
            </div>
            <div class="gy-form-group">
                    <span class="l">产品名称</span>
                    <input type="text" placeholder="请输入产品名称" v-model="search.prodName">
                </div>
            <div class="gy-form-group">
                <span class="l">时间段</span>
                <div class="searchDate">
                    <div class="d">
                        <el-date-picker
                                v-model="search.createTimeS"
                                type="date"
                                value-format="timestamp"
                                placeholder="开始日期">
                        </el-date-picker>
                    </div>
                    <div class="c">至</div>
                    <div class="d">
                        <el-date-picker
                                v-model="search.createTimeE"
                                type="date"
                                value-format="timestamp"
                                @change="search.createTimeE = $tools.convertDateEnd(search.createTimeE)"
                                placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </div>
                <span v-if="!isShowSearch" class="searchicon" @click="getList(search)"><i
                        class="iconfont icon-search"></i></span>
            </div>
            <div class="search-form" v-if="isShowSearch">
                <div class="gy-form-group">
                    <span class="l">交易对手</span>
                    <input type="text" placeholder="请输入交易对手" v-model="search.counterparty">
                </div>
                <div class="gy-form-group">
                    <span class="l">合同类型</span>
                    <el-select v-model="search.bizType">
                        <el-option
                                v-for="(item, index) in bizTypeData"
                                :key="index"
                                :label="item.value"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <span v-if="isShowSearch" class="searchicon" @click="getList(search)"><i
                            class="iconfont icon-search"></i></span>
                </div>
            </div>
        </div>
        <!-- 报表 -->
        <div class="box">
            <table class="gy-table">
                <thead>
                <tr>
                    <td>合同要素ID</td>
                    <th>合同编号</th>
                    <th>产品名称</th>
                    <th>交易对手</th>
                    <th>创建时间</th>
                    <th>签章前合同</th>
                    <th>签章后合同</th>
                    <th>交割凭证</th>
                    <th>发票</th>
                    <th>收付款凭证</th>
                    <th>用印签章文件</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody v-if="list.length > 0">
                <tr v-for="(item, index) in list" :key="index">
                    <td>{{item.contractId}}</td>
                    <td class="hover">{{item.orderContractSn}}</td>
                    <td>
                        <el-tooltip poper-class="test" :content="item.prodName" :disabled="(item.prodName && item.prodName.replace(/[^x00-xff]/g, 'aa').length > 16)? disabled : !disabled" placement="bottom">
                            <div class="wid-overflow" style="width:90px;">
                                {{item.prodName}}
                            </div>
                        </el-tooltip>
                    </td>
                    <!-- bizType 1销售 2采购 -->
                    <td v-show="item.bizType === 1">{{item.buyCounterparty}}</td>
                    <td v-show="item.bizType === 2">{{item.sellCounterparty}}</td>
                    <td>{{item.contractCreateDate | date('h')}}</td>
                    <td class="td-w-100 hover operation-styles">
                        <div class="showImg-hover" v-if="item.signatureContractF !==null && item.signatureContractF.length >0">
                            <span><i class="iconfont icon-photo" @click="handleShowImg(item.signatureContractF, item)"></i></span>
                            <span v-if="!item.isOnlineSignatureContract" v-gy-auth="'to_create_contract'" @click="editFile(item, 1, 'qz')" class="icon-add-b-wrap"><i class="iconfont icon-add-b"></i></span>
                        </div>
                        <i v-else class="iconfont icon-photo-null" @click="imgErr('签章前合同')"></i>
                    </td>
                    <td class="td-w-100 hover operation-styles">
                        <div class="showImg-hover" v-if="item.signatureContractE !==null && item.signatureContractE.length >0">
                            <span><i class="iconfont icon-photo" @click="handleShowImg(item.signatureContractE)"></i></span>
                            <span @click="editFile(item, 2, 'qz')" v-gy-auth="'to_create_contract'" class="icon-add-b-wrap"><i class="iconfont icon-add-b"></i></span>
                        </div>
                        <i v-else class="iconfont icon-photo-null" @click="imgErr('签章后合同')"></i>
                    </td>
                    <td class="td-w-100 hover operation-styles">
                        <div class="showImg-hover" v-if="item.deliveryProof.length !==0">
                            <span><i class="iconfont icon-photo" @click="handleShowImg(item.deliveryProof)"></i></span>
                            <span class="icon-add-b-wrap" v-gy-auth="'to_confirm_buy_dlvy_voucher'" @click="editFile(item, 3)"><i class="iconfont icon-add-b"></i></span>
                        </div>
                        <i v-else class="iconfont icon-photo-null" @click="imgErr('交割凭证')"></i>
                    </td>
                    <td class="td-w-100 hover operation-styles">
                        <div class="showImg-hover" v-if="item.invoiceProof.length !==0">
                            <span><i class="iconfont icon-photo" @click="handleShowImg(item.invoiceProof)"></i></span>
                            <span class="icon-add-b-wrap" v-gy-auth="'to_receipt_invoice,accountant_invoice'" @click="editFile(item, 4)"><i class="iconfont icon-add-b"></i></span>
                        </div>
                        <i v-else class="iconfont icon-photo-null" @click="imgErr('发票')"></i>
                    </td>
                    <td class="td-w-100 hover operation-styles">
                        <div class="showImg-hover" v-if="item.tradingProof.length !==0">
                            <span><i class="iconfont icon-photo" @click="handleShowImg(item.tradingProof)"></i></span>
                            <span class="icon-add-b-wrap" v-gy-auth="'cashier_payment,cashier_coll_confirm'" @click="editFile(item, -1, 'sf')"><i class="iconfont icon-add-b"></i></span>
                        </div>
                        <i v-else class="iconfont icon-photo-null" @click="imgErr('收付款凭证')"></i>
                    </td>
                    <td class="td-w-110 hover operation-styles">
                        <div class="showImg-hover" v-if="item.signedFiles !==null && item.signedFiles.length !==0">
                            <span><i class="iconfont icon-photo" @click="handleShowImg(item.signedFiles)"></i></span>
                            <span class="icon-add-b-wrap" v-gy-auth="'createStamp'" @click="editFile(item, 7, null)"><i class="iconfont icon-add-b"></i></span>
                        </div>
                        <i v-else class="iconfont icon-photo-null" @click="imgErr('用印签章文件')"></i>
                    </td>
                    <td class="operation-styles">
                        <button class="gy-button-view bgcf" @click="zip(item.orderId, 3, item.orderSn)">打包下载</button>
                    </td>
                </tr>
                </tbody>
                <tbody v-else>
                <tr>
                    <td colspan="10" style="text-align: center;">没有找到可显示的数据...</td>
                </tr>
                </tbody>
            </table>
        </div>
        <!-- 分页 -->
        <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="search.pageNum"
                :page-size="search.pageSize"
                :total="total"
                @current-change="handleCurrentChange">
        </el-pagination>
        <!-- img 弹出 -->
        <gy-file-view ref="contFileView"></gy-file-view>
        <!-- 上传 非收付款弹出 -->
        <el-dialog width="550px" class="uploadFileDialog" title="上传文件"
            :visible.sync="isUploadFileDialog"
            :close-on-click-modal="false">
            <div class="file-upload">
                <div class="img-box">
                    <template v-for="(item, idx) in imgData">
                        <div class="contImgItem" :key="idx">
                            <img v-if="item.fileTypeAlias === 'img'" :src="item.url" alt="" />
                            <img v-if="item.fileTypeAlias === 'pdf'" src="../../assets/images/PDF.png"/>
                            <img v-if="item.fileTypeAlias === 'word'" src="../../assets/images/WORD.png"/>
                            <img v-if="item.fileTypeAlias === 'excel'" src="../../assets/images/EXCEL.png"/>
                            <div>
                                <i class="el-icon-zoom-in plus" @click="elPlus(item)"></i>
                                <i v-if="idx > imgDataSize - 1" @click="removeImg(idx)" class="el-icon-delete"></i>
                            </div>
                        </div>
                    </template>
                </div>
                <el-upload  action="api"
                            multiple=""
                            :file-list="imgData"
                            list-type="picture-card"
                            :drag="true"
                            class="upload-demo-tz"
                            :show-file-list="false"
                            :http-request="onFileUpload">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </div>
            <div class="gy-button">
                <button class="gy-button-normal" @click="isUploadFileDialog = false">取消</button>
                <button class="gy-button-extra" @click="save('ot')">上传</button>
            </div>
        </el-dialog>
        <!-- 上传 收付款弹出 -->
        <el-dialog
            class="file-upload uploadFileDialogMulti"
            width="770px"
            title="上传文件"
            :visible.sync="isShowUpload"
            :close-on-click-modal="false">
            <table class="gy-table">
                <thead>
                    <th>{{th1}}编号</th>
                    <th v-if="isShowNo" :class="{'td-w-130': th2 === '收款明细'}">{{th2}}编号</th>
                    <th>{{th3}}凭证</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr v-for="(items, index) in contractVouchersVos" :key="index">
                        <td class="td-w-110">
                            <span v-if="th3 === '收款'">{{items.targetId}}</span>
                            <span v-else>{{items.groupId}}</span>
                        </td>
                        <td v-if="isShowNo" class="td-w-100" :class="{'td-w-130': th2 === '收款明细'}">{{items.targetId}}</td>
                        <td class="td-hidden">
                            <div class="file-upload">
                                <div class="img-box">
                                    <template v-for="(item, idx) in items.contractFileVos">
                                        <div class="contImgItem" :key="idx">
                                            <img v-if="item.fileTypeAlias === 'img'" :src="item.url" alt="" />
                                            <img v-if="item.fileTypeAlias === 'pdf'" src="../../assets/images/PDF.png"/>
                                            <img v-if="item.fileTypeAlias === 'word'" src="../../assets/images/WORD.png"/>
                                            <img v-if="item.fileTypeAlias === 'excel'" src="../../assets/images/EXCEL.png"/>
                                            <div>
                                                <i class="el-icon-zoom-in plus" @click="elPlus(item)"></i>
                                                <i v-if="idx > items.contractFileVosSize - 1" @click="removeImg(idx, index)" class="el-icon-delete"></i>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </td>
                        <td>
                            <el-upload  action="api"
                                        multiple
                                        :file-list="imgData"
                                        list-type="picture-card"
                                        :drag="true"
                                        :data='{index: index}'
                                        class="upload-demo-tz"
                                        :show-file-list="false"
                                        :http-request="onFileUpload">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">拖到此处，或<em>点击上传</em></div>
                            </el-upload>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="gy-button">
                <button class="gy-button-normal" @click="isShowUpload = false">取消</button>
                <button class="gy-button-extra" @click="save('sf')">上传</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import gyFileView from './../components/gyFileView';
import gyFileUpload from './../components/gyFileUploadEdit';

export default {
    components: {gyFileView, gyFileUpload},
    data () {
        return {
            disabled: false,
            imgData: [],
            imgDataSize: null,
            isShowUpload: false, // 收付款的上传
            total: null,
            isShowSearch: false,
            isUploadFileDialog: false, // 当前组件的上传
            search: {
                pageNum: 1,
                pageSize: 10,
                orderSn: null,
                createTimeS: null,
                createTimeE: null,
                prodName: null,
                bizType: null,
                counterparty: null
            },
            list: [],
            bizTypeData: [
                {
                    id: 0,
                    value: '全部'
                },
                {
                    id: 1,
                    value: '销售合同'
                },
                {
                    id: 2,
                    value: '采购合同'
                }
            ],
            contractVouchersVos: [],
            bizType: 2,
            type: null,
            fileIndex: null,
            th1: '',
            th2: '',
            th3: '',
            isShowNo: true
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            this.getList(this.search);
        },
        // 图片放大
        elPlus (val) {
            let arr = [];
            arr.push(val);
            this.$refs.contFileView.open(arr);
        },
        // idx 子项
        // index 父项
        removeImg (idx, index) {
            if (this.type === 'qz') {
                this.imgData.splice(idx, 1);
                this.onCallbackBuyFileUpload(this.imgData);
                return;
            }
            this.contractVouchersVos[index].contractFileVos.splice(idx, 1);
            this.onCallbackBuyFileUpload(this.contractVouchersVos[index].contractFileVos, index);
        },
        onCallbackBuyFileUpload (fileList, index) {
            if (this.type === 'qz') {
                this.contractVouchersVos.map(item => {
                    item.contractFileVos = this.imgData;
                });
                return;
            }
            this.contractVouchersVos[index].contractFileVos = fileList;
        },
        // 列表
        getList (search) {
            this.$http.post(this.$api.order.orderNoList, search)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.list = res.data.data.list;
                        this.total = res.data.data.total;
                        return;
                    }
                    this.$message.error(res.data.message);
                });
        },
        // bizType 1销售 2采购
        handleShowImg (list, row) {
            this.$refs.contFileView.open4MultiFile(list);
        },
        // 上传操作
        // bizType 1销售-收款 2采购-付款
        editFile (row, voucherType, type) {
            this.type = type;
            type && type === 'qz' ? this.isUploadFileDialog = true : this.isShowUpload = true;
            switch (voucherType) {
            case 3:
                this.th1 = '交割';
                this.th3 = '交割';
                this.isShow1 = true;
                break;
            case 4:
                this.th1 = '申请';
                this.th3 = '发票';
                this.isShow1 = true;
                break;
            case -1:
                if (row.bizType === 1) {
                    this.th1 = '收款申请';
                    this.th3 = '收款';
                    this.isShowNo = false;
                } else {
                    this.th1 = '付款申请';
                    this.th3 = '付款';
                    this.th2 = '付款明细';
                    this.isShowNo = true;
                }
                break;
            case 7:
                this.isShowNo = false;
                this.th1 = '申请';
                this.th3 = '签章';
                this.isShow1 = true;
            }
            if (voucherType === -1 && type === 'sf') {
                voucherType = row.bizType === 1 ? 5 : 6;
            }
            this.bizType = row.bizType;
            const params = {
                bizType: row.bizType, // 业务类型，1：销售订单，2：采购订单
                contractEssenceId: row.contractId, // 合同要素ID
                orderId: row.orderId, // 订单ID
                voucherType: voucherType
            };
            this.getImgDetail(params);
        },
        initStructure () {
            // 初始化结构
            if (this.type === 'qz') {
                if (this.contractVouchersVos && this.contractVouchersVos.length > 0) {
                    this.contractVouchersVos.map((items, index) => {
                        items.contractFileVos && items.contractFileVos.map((item, idx) => {
                            this.imgData.push(
                                {
                                    name: `${index}k${idx}`,
                                    url: item.url,
                                    fileName: `${index}k${idx}`,
                                    fileUrl: item.url,
                                    fileTypeAlias: this.$tools.getFileTypeAlias(item.url)
                                }
                            );
                        });
                        this.imgDataSize = this.imgData.length;
                    });
                }
                return;
            }
            if (this.contractVouchersVos && this.contractVouchersVos.length > 0) {
                this.contractVouchersVos.map((items, index) => {
                    let arr = [];
                    items.contractFileVos && items.contractFileVos.map((item, idx) => {
                        arr.push(
                            {
                                name: `${index}k${idx}`,
                                url: item.url,
                                fileName: `${index}k${idx}`,
                                fileUrl: item.url,
                                fileTypeAlias: this.$tools.getFileTypeAlias(item.url)
                            }
                        );
                    });
                    items.contractFileVos = arr;
                    items.contractFileVosSize = arr.length;
                });
            }
        },
        // 获取文件详情
        async getImgDetail (params) {
            this.imgData = [];
            try {
                const res = await this.$http.post(this.$api.order.fileDetails, params);
                if (res.data.code === 0) {
                    this.resObj = res.data.data;
                    this.contractVouchersVos = res.data.data.contractVouchersVos;
                    this.initStructure();
                    console.log(this.contractVouchersVos);
                    return;
                }
                this.$message.error(res.data.message);
            } catch (err) {
                console.log(err);
            }
        },
        // 保存修改的文件
        async save (type) {
            this.resObj.contractVouchersVos = this.contractVouchersVos;
            try {
                const res = await this.$http.post(this.$api.order.fileUpload, this.resObj);
                if (res.data.code === 0) {
                    type === 'sf' && (this.isShowUpload = false);
                    type === 'ot' && (this.isUploadFileDialog = false);
                    this.init();
                    return;
                }
                this.$message.error(res.data.message);
            } catch (err) {
                console.log(err);
            }
        },
        // 上传文件
        // type 只有签章前后为 qz ---> 弹出框不是多次列表
        onFileUpload (file) {
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            this.type !== 'qz' && (this.fileIndex = file.data.index);
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            this.$http.post(this.$api.upload.imgUpload, formData, headers)
                .then(res => {
                    if (res.data.code === 0) {
                        let obj = res.data.data;
                        obj.name = obj.fileName;
                        obj.url = obj.fileUrl;
                        obj.fileTypeAlias = this.$tools.getFileTypeAlias(obj.fileUrl);
                        if (this.type === 'qz') {
                            this.imgData.push(obj);
                            this.onCallbackBuyFileUpload(this.imgData);
                        } else {
                            this.contractVouchersVos[this.fileIndex].contractFileVos.push(obj);
                            this.onCallbackBuyFileUpload(this.contractVouchersVos[this.fileIndex].contractFileVos, this.fileIndex);
                        }
                        // 回调
                        return;
                    }
                    this.$alert(res.data.code + ' ' + res.data.message);
                });
        },
        imgErr (title) {
            this.$message({message: title + '暂无数据', type: 'warning'});
        },
        zip (id, type, title) {
            let params = {
                orderId: id,
                downType: type
            };
            this.$tools.exporttoExcel(this, this.$api.order.files, params, title + '.zip');
        },
        // 分页
        handleCurrentChange (v) {
            this.search.pageNum = v;
            this.getList(this.search);
        }
    }
};
</script>
<style lang="scss">
    .standingBook-upload {
        .el-dialog__title {
            line-height: 35px;
        }
        .el-dialog__headerbtn {
            top: 10px;
        }
        .uploadFileDialog, .uploadFileDialogMulti {
            .gy-button {
                text-align: right;
                margin-top: 32px;
                .gy-button-normal {
                    margin-right: 8px;
                }
            }
        }
        .uploadFileDialog {
            .file-upload {
                .contImgItem {
                    display: inline-block;
                    float: none;
                }
                .upload-demo-tz {
                    margin: 32px 0 37px 0;
                    width: 100%;
                    height: 84px;
                    display: block;
                    text-align: center;
                }
                .el-upload--picture-card, .el-upload-dragger {
                    width: 204px !important;
                    height: 84px !important;
                    line-height: 24px;
                }
                .el-icon-upload {
                    font-size: 24px;
                    top: 0;
                    line-height: 50px;
                }
                .el-upload__text {
                    position: none;
                    margin-top: 0;
                    line-height: 1;
                }
            }
        }
    }
</style>
<style lang="scss" scoped>
    .standingBook {
        .my-search {
            .gy-form-group {
                padding: 6px 40px 6px 110px;
                .l {
                    width: 102px;
                    display: block;
                }
            }
        }
    }
    .contImgItem {
        width: 50px;
        height: 50px;
        img {
            width: 50px;
            height: 50px;
            cursor: pointer;
            border-radius: 5px;
        }
    }
    .td-w-110 {
        width: 110px;
    }
    .td-w-100 {
        width: 100px;
    }
    .td-w-130 {
        width: 130px;
    }
    .td-hidden {
        .file-upload {
            overflow-x: auto;
            width: 300px;
            .img-box {
                display: table-cell;
                white-space: nowrap;
                width: auto;
                .contImgItem {
                    float: none;
                    display: inline-block;
                }
            }
        }
    }
    .icon-add-b-wrap {
        display: none;
    }
    .showImg-hover:hover {
        .icon-add-b-wrap {
            width: 28px;
            height: 28px;
            margin-left: 8px;
            line-height: 28px;
            text-align: center;
            display: inline-block;
            background-color: #fff;
            border: 1px solid #E7ECF1;
            position: relative;
            bottom: 4px;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
            .icon-add-b {
                color: #D8D8D8;
                font-size: 12px;
            }
        }
    }

    .pop-image {
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 999;
        .pop-main {
            position: absolute;
            background-color: #fff;
            border-radius: $border-radius-base;
            height: 520px;
            width: 750px;
            margin: -260px 0 0 -375px;
            left: 50%;
            top: 50%;
            z-index: 2;
            overflow: hidden;
            .pop-title {
                display: block;
                line-height: 49px;
                padding: 0 20px;
                color: $color-title;
                font-size: 16px;
                border-bottom: 1px solid $color-border;
                .icon-close {
                    position: absolute;
                    right: 20px;
                    top: 0;
                    cursor: pointer;
                    font-size: 20px;
                    color: $color-minor;
                }
            }
            .img-side {
                float: left;
                height: 470px;
                width: 180px;
                border-right: 1px solid $color-border;
                overflow: auto;
                ul {
                    overflow: hidden;
                    border-bottom: 1px solid $color-border;
                    li {
                        float: left;
                        width: 50%;
                        height: 100px;
                        overflow: hidden;
                        text-align: center;
                        padding-top: 10px;
                        border-top: 1px solid $color-border;
                        cursor: pointer;
                        .avatar {
                            height: 60px;
                            width: 60px;
                            display: inline-block;
                            background-position: center center;
                            background-repeat: no-repeat;
                            background-size: cover;
                            line-height: 1;
                        }
                        .name {
                            display: block;
                            font-size: 12px;
                            line-height: 1;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            width: 100%;
                            padding: 0 2px;
                        }
                        &:nth-child(odd) {
                            border-right: 1px solid $color-border;
                        }
                    }
                }
            }
            .img-main {
                float: left;
                height: 470px;
                width: 570px;
                padding: 20px;
                .img-box {
                    height: 100%;
                    position: relative;
                    text-align: center;
                    overflow: hidden;
                    img {
                        height: 100%;
                        width: auto;
                        top: 0;
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                    }
                }
            }
        }
        .mask {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1;
            cursor: pointer;
        }
    }

    .ShowSearch {
        margin-right: 30px;
        cursor: pointer;
    }

    .hover:hover {
        color: #4A90E2;
        cursor: pointer;
    }

    .hover {
        color: #999999;
        span {
            margin-left: 5px;
            vertical-align: middle;
            font-size: 14px;
            line-height: 1.8;
        }
        .icon-photo:before, .icon-photo-null:before {
            line-height: 1.08;
        }
    }

    .bgcf {
        background-color: #fff;
    }

    .box {
        margin: 0 16px;
        overflow-x: scroll;
        .gy-table {
            width: 1500px;
        }
    }
</style>

<style lang="scss" scoped>
    .file-upload > div{
        display: inline-block;
    }
    .div-hidden-file {
        width: 400px;
        height: 50px;
        overflow-x: auto;
        // position: relative;
        .img-box {
            display: block !important;
            width: 800px;
            height: 50px;
        }
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
