<!-- 创建合同 -->
<template>
    <div class="add-contract">
        <div class="essential-information">
            <p class="paydetail-title">基本信息</p>
            <cont :list="list"></cont>
        </div>
        <div class="pay-wrapper">
            <div class="essential-information" v-if="list.contractType === 1 || list.contractType === 2">
                <p class="paydetail-title">采购合同信息</p>
                <div class="essential-wrapper">
                    <cont-sell :list="list"></cont-sell>
                    <div class="essential-row">
                        <div class="essential-item" v-if="isSingleBuyContract">
                            <div class="essential-title" style="padding-left: 10px"><span class="isMust">*</span>选择合同模板
                            </div>
                            <div class="essential-text">
                                <div class="essential-text">
                                    <el-select v-model="buyContTmplId" placeholder="请选择">
                                        <el-option v-for="item in ContractTemplate1" :key="item.id" :label="item.name"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row" v-if="buyContTmplId === 'upload'">
                        <div class="essential-item">
                            <div class="essential-title" style="padding-left: 10px"><span class="isMust">*</span>上传采购合同
                            </div>
                            <div class="essential-text">
                                <template v-for="(item, index) in  buyContImg">
                                    <div class="contImgItem" :key="item">
                                        <img v-if="$constant.imgType.indexOf(item.split('.').pop()) !== -1" :src="item"
                                             width="52" height="52" alt="">
                                        <img v-if="item.split('.').pop() === 'pdf'" src="../../assets/images/PDF.png"
                                             height="52" width="52"/>
                                        <img v-if="$constant.fileType.indexOf(item.split('.').pop()) !== -1"
                                             src="../../assets/images/WORD.png" height="52" width="52"/>
                                        <div>
                                            <i @click="deleteImg(index, 'buy')" class="el-icon-delete"></i>
                                        </div>
                                    </div>
                                </template>
                                <el-upload class="avatar-uploader"
                                           action=""
                                           :http-request="uploadBuy"
                                           :show-file-list="false"
                                           :before-upload="beforeAvatarUpload">
                                    <i class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="essential-wrapper" style="padding:0px"
                     v-if="list.contractType === 2 || list.contractType === 3">
                    <div class="gy-form-group">
                        <span class="l" style="margin-left:10px">单边关联</span>
                        <template>
                            <!-- `checked` 为 true 或 false -->
                            <el-checkbox v-model="unilateralRelevance.isUnilateralCorrelation" true-label="1"
                                         false-label="0"></el-checkbox>
                        </template>
                    </div>
                    <div class="gy-form-group cl" v-if="unilateralRelevance.isUnilateralCorrelation === '1'">
                        <span class="l" style="margin-left:0px"><i class="i" style="color: red">* </i>单边合同编号</span>
                        <input type="text" v-model="unilateralRelevance.contractCode">
                        <i class="iconfont icon-search" style="position: absolute;top: 10px;right: 20px;"
                           @click="onSeachContract('单边')"></i>
                    </div>
                    <div class="gy-form-group tl" v-if="unilateralRelevance.isUnilateralCorrelation === '1'">
                        <span class="l" v-if="list.contractType === 2">单边销售合同</span>
                        <span class="l" v-if="list.contractType === 3">单边采购合同</span>
                        <div class="ml" v-if="deliveryContractType !== 'pdf'" v-for="(item, index) in deliveryContractList"
                             :key="index"
                             style="display: inline-block;height: 50px;width: 50px;margin-left: 25px;">
                            <img :src="item.fileUrl" @click="deliverContractAssembleVisible = true"
                                 style="width: 50px;height:50px;cursor: pointer">
                        </div>
                        <div v-if="deliveryContractType === 'pdf'"
                             style="display: inline-block;height: 50px;width: 50px;margin-left: 5px;">
                            <i class="iconfont icon-photo"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="essential-information" v-if="list.contractType === 1 || list.contractType === 3">
                <p class="paydetail-title">销售合同信息</p>
                <div class="essential-wrapper">
                    <cont-buy :list="list"></cont-buy>
                    <div class="essential-row">
                        <div class="essential-item" v-if="isSingleSaleContract">
                            <div class="essential-title" style="padding-left: 10px"><span class="isMust">*</span>选择合同模板
                            </div>
                            <div class="essential-text">
                                <div class="essential-text">
                                    <el-select v-model="saleContTmplId" placeholder="请选择">
                                        <el-option v-for="item in ContractTemplate" :key="item.id" :label="item.name"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row" v-if="saleContTmplId === 'upload'">
                        <div class="essential-item">
                            <div class="essential-title" style="padding-left: 10px"><span class="isMust">*</span>上传销售合同
                            </div>
                            <div class="essential-text">
                                <template v-for="(item, index) in  saleContImg">
                                    <div class="contImgItem" :key="item">
                                        <img v-if="$constant.imgType.indexOf(item.split('.').pop()) !== -1" :src="item"
                                             width="52" height="52" alt="">
                                        <img v-if="item.split('.').pop() === 'pdf'" src="../../assets/images/PDF.png"
                                             height="52" width="52"/>
                                        <img v-if="$constant.fileType.indexOf(item.split('.').pop()) !== -1"
                                             src="../../assets/images/WORD.png" height="52" width="52"/>
                                        <div>
                                            <i @click="deleteImg(index, 'sale')" class="el-icon-delete"></i>
                                        </div>
                                    </div>
                                </template>
                                <el-upload class="avatar-uploader" action=""
                                           :http-request="uploadSell"
                                           :show-file-list="false"
                                           :before-upload="beforeAvatarUpload">
                                    <i class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="essential-wrapper" style="padding:0px"
                     v-if="list.contractType === 2 || list.contractType === 3">
                    <div class="gy-form-group">
                        <span class="l" style="margin-left:10px">单边关联</span>
                        <template>
                            <!-- `checked` 为 true 或 false -->
                            <el-checkbox v-model="unilateralRelevance.isUnilateralCorrelation" true-label="1"
                                         false-label="0"></el-checkbox>
                        </template>
                    </div>
                    <div class="gy-form-group cl" v-if="unilateralRelevance.isUnilateralCorrelation === '1'">
                        <span class="l" style="margin-left:0px"><i class="i" style="color: red">* </i>单边合同编号</span>
                        <input type="text" v-model="unilateralRelevance.contractCode">
                        <i class="iconfont icon-search" style="position: absolute;top: 10px;right: 20px;"
                           @click="onSeachContract('单边')"></i>
                    </div>
                    <div class="gy-form-group tl" v-if="unilateralRelevance.isUnilateralCorrelation === '1'">
                        <span class="l" v-if="list.contractType === 2">单边销售合同</span>
                        <span class="l" v-if="list.contractType === 3">单边采购合同</span>
                        <div class="ml" v-if="deliveryContractType !== 'pdf'" v-for="(item, index) in deliveryContractList"
                             :key="index"
                             style="display: inline-block;height: 50px;width: 50px;margin-left: 25px;">
                            <img :src="item.fileUrl" @click="deliverContractAssembleVisible = true"
                                 style="width: 50px;height:50px;cursor: pointer">
                        </div>
                        <div v-if="deliveryContractType === 'pdf'"
                             style="display: inline-block;height: 50px;width: 50px;margin-left: 5px;">
                            <i class="iconfont icon-photo"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot" style="margin-top: 60px;">
            <button class="gy-button-normal" @click="goback">取消</button>
            <button class="gy-button-extra confirmations" @click="onsubmit">提交</button>
        </div>
        <el-dialog width="1200px" class="order-dialog" :title="currContractType === 2? '选择销售合同' : '选择采购合同'"
                   :visible.sync="isShowUnilateralDialog">
            <div class="gy-form-group" v-if="currContractType === 2">
                <span class="l">下游公司</span>
                <input type="text" v-model="searchForm.sellerCompanyName">
            </div>
            <div class="gy-form-group" v-if="currContractType === 3">
                <span class="l">上游公司</span>
                <input type="text" v-model="searchForm.buyerCompanyName">
            </div>
            <div class="gy-form-group">
                <i class="iconfont icon-search" style="position: absolute;top: 10px;left: -50px;"
                   @click="purchaseContract()"></i>
            </div>
            <table class="gy-table">
                <thead>
                <tr>
                    <th></th>
                    <th><span v-if="currContractType === 2">下游公司</span><span v-if="currContractType === 3">上游公司</span>
                    </th>
                    <th><span v-if="currContractType === 2">销售合同编号</span><span
                            v-if="currContractType === 3">采购合同编号</span></th>
                    <th>合同金额(元)</th>
                    <th>交割库</th>
                    <th>交割日期</th>

                    <th>免仓期(天)</th>
                    <!-- <th>合同状态</th> -->
                </tr>
                </thead>
                <tbody v-if="this.purchaseContractList.length > 0">
                <tr v-for="(item, index) in purchaseContractList" :key="index">
                    <td>
                        <input type="radio" @change="crossHandleCheckChange(item)" name="11">
                    </td>
                    <td>{{item.sellerCompanyName}}</td>
                    <td>{{item.contractCode}}</td>
                    <td>{{item.totalAmount|numToCash}}</td>
                    <td>{{item.deliveryWarehouseName}}</td>
                    <td>{{item.deliveryDate}}</td>
                    <td>{{item.warehouseFreeDays}}</td>
                    <!-- <td>{{item.approveStatus}}</td> -->
                </tr>
                </tbody>
            </table>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page.sync="searchForm.pageNo"
                    :page-size="searchForm.pageSize"
                    :total="totalDelivery"
                    @current-change="handleCurrentChangeDeliver">
            </el-pagination>
            <div class="button-wrap">
                <button class="gy-button-normal" @click="isShowUnilateralDialog = false">取消</button>
                <button class="gy-button-extra" @click="crossSubmission()">确定</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import contSell from './sell';
import contBuy from './buy';
import cont from './cont';
export default {
    data () {
        return {
            unilateralRelevance: {
                isUnilateralCorrelation: null, // 是否关联
                correlationOrderId: null, // 单边合同ID
                contractCode: null // 单边合同编号
            },
            totalDelivery: null,
            searchForm: {
                pageNo: 1,
                pageSize: 10,
                productId: null,
                buyerCompanyName: null,
                sellerCompanyName: null,
                bizType: null // 1销售订单 2采购订单
            },
            data: {},
            list: {
                id: null, // 合同要素ID
                contEssenceStatus: null, // 合同要素状态
                bizType: null, // 业务类型
                contractType: null, // 单边交易
                productId: null,
                createdName: null, // 创建人
                approveStatus: null, // 合同状态
                businessManagerId: null, // 业务负责人ID
                businessManagerName: null, // 业务负责人名称
                orgName: null, // 业务组名称
                orderStatus: null, // 订单状态
                createdDate: null, // 创建时间（格式：yyyy-MM-dd HH:mm:ss）
                planBuyDlvyDate: null, // 计划交割日(买家)
                planSaleDlvyDate: null, // 计划交割日(卖家)
                purchaseOrderId: null, // 采购合同编号
                targetCorpId: null, // 居间方公司Id(我方公司)
                targetCorpName: null, // 居间方公司名称(我方公司)
                buyerInfo: { // 买家信息
                    companyId: null, // 下游公司id
                    companyName: null, // 下游公司名称
                    skuOrigin: null, // 货源（国产、进口、自定义）
                    deliveryWarehouseId: null, // 交割仓库id
                    deliveryWarehouseName: null, // 交割仓库名称
                    provideInvoiceType: null, // 发票月份
                    provideInvoiceDays: null, // 发票天数
                    paymentType: null, // 付款方式（0：先款后货，1：先货后款）
                    skuPrice: null, // 数量
                    grade: null, // 交易对手评级
                    packagingStandard: null, // 包装标准
                    skuQuantity: null, // 单价
                    odrContactId: null, // 内部业务联系人ID
                    odrContactName: null, // 内部业务联系人名称
                    depositRatio: null, // 保证金比率（%）
                    depositRatioSubtract: null, // 保证金比率（跌）
                    depositRatioAppend: null, // 保证金比率（补）
                    warehouseFreeDays: null, // 免仓期（天）
                    deliveryType: null, // 交割方式
                    payChannel: null, // 支付渠道
                    remarks: null // 备注
                },
                sellerInfo: {// 上游公司信息
                    companyId: null, // 下游公司id
                    companyName: null, // 下游公司名称
                    skuOrigin: null, // 货源（国产、进口、自定义）
                    deliveryWarehouseId: null, // 交割仓库id
                    deliveryWarehouseName: null, // 交割仓库名称
                    provideInvoiceType: null, // 发票月份
                    provideInvoiceDays: null, // 发票天数
                    paymentType: null, // 付款方式（0：先款后货，1：先货后款）
                    skuPrice: null, // 数量
                    grade: null, // 交易对手评级
                    packagingStandard: null, // 包装标准
                    skuQuantity: null, // 单价
                    odrContactId: null, // 内部业务联系人ID
                    odrContactName: null, // 内部业务联系人名称
                    depositRatio: null, // 保证金比率（%）
                    depositRatioSubtract: null, // 保证金比率（跌）
                    depositRatioAppend: null, // 保证金比率（补）
                    warehouseFreeDays: null, // 免仓期（天）
                    deliveryType: null, // 交割方式
                    payChannel: null, // 支付渠道
                    remarks: null // 备注
                }
            },
            imageUrl: false,
            ContractTemplate1: [
                {
                    name: '使用通用采购合同模板',
                    id: 3
                },
                {
                    name: '上传采购合同',
                    id: 'upload'
                }
            ],
            ContractTemplate: [
                {
                    name: '使用通用销售合同模板',
                    id: 3
                },
                {
                    name: '上传销售合同',
                    id: 'upload'
                }
            ],
            buyContTmplId: null, // 采购合同模板ID
            saleContTmplId: null, // 销售合同模板ID
            buyContImg: [], // 采购文件
            saleContImg: [], // 销售文件
            action: {
                type: String,
                default: 'api'
            },
            obj: {},
            deliveryContractList: [],
            isShowUnilateralDialog: false,
            purchaseContractList: [],
            isSingleBuyContract: false, // 是否单边采购合同
            isSingleSaleContract: false, // 是否单边销售合同
            currContractType: null, // 判断销售和采购对应去显示
            deliveryContractType: null // 判断pdf和图片的区别
        };
    },
    created () {
        this.getdetailOrder();
    },
    methods: {
        getdetailOrder () { // 合同要素详情
            let that = this;
            this.$http.get(this.$api.payment.getDetailOrder + that.$route.query.id).then(function (response) {
                if (response.data.code === 0) {
                    // 去结果画面
                    that.list = response.data.data;
                    that.data = that.list;
                    // 单边关联的判断，如果是，不需要上传合同
                    // 判断依据，是否已存在盖章合同
                    if (that.list.sellerInfo.fileAttachCertifiedList === null || that.list.sellerInfo.fileAttachCertifiedList.length === 0) {
                        that.isSingleBuyContract = true;
                    }
                    if (that.list.buyerInfo.fileAttachCertifiedList === null || that.list.buyerInfo.fileAttachCertifiedList.length === 0) {
                        that.isSingleSaleContract = true;
                    }
                    if (that.list.contractType === 2 || that.list.contractType === 3) {
                        that.unilateral = true;
                    } else {
                        that.unilateral = false;
                    }
                    if (that.list.contractType === 2) {
                        this.currContractType = 2; // 如果是采购，则关联的销售合同
                    } else if (this.data.contractType === 3) {
                        this.currContractType = 3;
                    }
                } else {
                    that.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 弹出选择单边合同的对话框
        onSeachContract (val) {
            this.isShowUnilateralDialog = true;
            this.purchaseContract(val);
        },
        // 获取单边合同列表
        purchaseContract (vals) {
            if (vals === '单边') {
                if (this.data.contractType == null || this.data.contractType === undefined) {
                    this.$message('请先单边交易类型后再查询单边合同');
                    this.isShowUnilateralDialog = false;
                    return false;
                }
                if (this.data.contractType === 1) {
                    this.$message('双边交易时不能查询单边合同');
                    this.isShowUnilateralDialog = false;
                    return false;
                }
                // 这里要区分单边还是双边合同
                if (this.data.contractType === 2) {
                    this.searchForm.bizType = 1;
                    this.currContractType = 2; // 如果是采购，则关联的销售合同
                    this.searchForm.unilateralCorrelation = 1;
                    this.searchForm.productId = this.list.productId;
                    this.searchForm.skuQuantity = this.data.sellerInfo.skuQuantity;
                } else if (this.data.contractType === 3) {
                    this.searchForm.bizType = 2;
                    this.currContractType = 3; // 如果是销售，则关联的采购合同
                    this.searchForm.unilateralCorrelation = 1;
                    this.searchForm.productId = this.list.productId;
                    this.searchForm.skuQuantity = this.data.buyerInfo.skuQuantity;
                }
            } else {
                if (this.searchForm.unilateralCorrelation === 1) {
                    delete this.searchForm.unilateralCorrelation;
                    console.log(this.searchForm);
                }
                // 这里要区分单边还是双边合同
                if (vals === '上游') {
                    // 上游
                    this.upstreamTerm = 1;
                    this.searchForm.bizType = 2;
                    this.currContractType = 3;
                    if (this.sellerInfoProd == null || this.sellerInfoProd === undefined) {
                        this.$message('请先选择产品后再查询单边合同');
                        this.isShowUnilateralDialog = false;
                        return false;
                    }
                    if (this.data.sellerInfo.skuQuantity == null || this.data.sellerInfo.skuQuantity === undefined || this.data.sellerInfo.skuQuantity === 0) {
                        this.$message('请先输入产品数量后再查询单边合同');
                        this.isShowUnilateralDialog = false;
                        return false;
                    }
                    this.searchForm.productId = this.proType[this.sellerInfoProd].goodsId;
                    this.searchForm.skuQuantity = this.data.sellerInfo.skuQuantity;
                    this.searchForm.sellerCompanyName = this.data.sellerInfo.companyName;
                    this.searchForm.longtermContractFlag = this.data.sellerInfo.longtermContractFlag;
                } else if (vals === '下游') {
                    // 下游
                    this.upstreamTerm = 2;
                    this.currContractType = 2;
                    this.searchForm.bizType = 1;
                    if (this.buyerInfoProd == null || this.buyerInfoProd === undefined) {
                        this.$message('请先选择产品后再查询单边合同');
                        this.isShowUnilateralDialog = false;
                        return false;
                    }
                    if (this.data.buyerInfo.skuQuantity == null || this.data.buyerInfo.skuQuantity === undefined || this.data.buyerInfo.skuQuantity === 0) {
                        this.$message('请先输入产品数量后再查询单边合同');
                        this.isShowUnilateralDialog = false;
                        return false;
                    }

                    this.searchForm.productId = this.proType[this.buyerInfoProd].goodsId;
                    this.searchForm.skuQuantity = this.data.buyerInfo.skuQuantity;
                    this.searchForm.buyerCompanyName = this.data.buyerInfo.companyName;
                    this.searchForm.longtermContractFlag = this.data.buyerInfo.longtermContractFlag;
                }
                if (this.searchForm.productId == null || this.searchForm.productId === undefined) {
                    this.$message('请先选择产品后再查询单边合同');
                    this.isShowUnilateralDialog = false;
                    return false;
                }
                if (this.searchForm.skuQuantity == null || this.searchForm.skuQuantity === undefined) {
                    this.$message('请先输入产品数量后再查询单边合同');
                    this.isShowUnilateralDialog = false;
                    return false;
                }
            }
            this.$http.post(this.$api.delivery.crossContract, this.searchForm).then((res) => {
                if (res.data.code === 0) {
                    this.totalDelivery = res.data.data.total;
                    this.purchaseContractList = res.data.data.rows;
                }
            });
        },
        crossSubmission () {
        // 上游
            if (this.upstreamTerm === 1) {
                this.data.sellerInfo.contractCode = this.obj.contractCode;
                this.data.sellerInfo.longtermContractOrderId = this.obj.orderId;
                this.isShowUnilateralDialog = false;
            } else if (this.upstreamTerm === 2) { // 下游
                this.data.buyerInfo.contractCode = this.obj.contractCode;
                this.data.buyerInfo.longtermContractOrderId = this.obj.orderId;
                this.isShowUnilateralDialog = false;
            } else {
                this.unilateralRelevance.contractCode = this.obj.contractCode;
                this.unilateralRelevance.correlationOrderId = this.obj.orderId;
                this.isShowUnilateralDialog = false;
                this.deliveryContractClick(this.obj.orderId);
            }
        },
        // 分页
        handleCurrentChangeDeliver (e) {
            this.searchForm.pageNo = e;
            this.purchaseContract();
        },
        beforeAvatarUpload (file) {
            // if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
            //     this.$message({
            //         showClose: true,
            //         message: `文件扩展名错误`,
            //         type: 'error'
            //     });
            //     return false;
            // }
        },
        uploadBuy (file) {
            this.upload(file, '1');
        },
        // 交叉采购合同
        crossHandleCheckChange (item) {
            this.obj = item;
        },
        uploadSell (file) {
            this.upload(file, '2');
        },
        upload (file, l) {
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
                        l === '1' ? that.buyContImg.push(res.data.data) : that.saleContImg.push(res.data.data);
                    }
                });
        },
        deliveryContractClick (val) {
            this.$http.get(this.$api.delivery.deliveryContract + '/' + val).then((res) => {
                if (res.data.code === 0) {
                    // 采购交割凭证
                    this.deliveryContractList = res.data.data.erpFileContractModelList;
                    let delveryLength = this.deliveryContractList[0].fileUrl.lastIndexOf('.');
                    let deliveryContractLast = this.deliveryContractList[0].fileUrl.substring(delveryLength + 1, this.deliveryContractList[0].fileUrl.delveryLength);
                    this.deliveryContractType = deliveryContractLast;
                }
            });
        },
        onsubmit () {
            let that = this;
            if (this.unilateralRelevance.isUnilateralCorrelation === '1') {
                this.unilateralRelevance.isUnilateralCorrelation = true;
            } else {
                this.unilateralRelevance.isUnilateralCorrelation = false;
            }
            let query = {
                id: this.$route.query.id, // 合同要素ID
                isOnline: 1, // 合同类型(1.线上通用模板合同，2.线下合同)
                buyContTmplId: this.buyContTmplId === 'upload' ? null : this.buyContTmplId, // 采购合同模板ID
                saleContTmplId: this.saleContTmplId === 'upload' ? null : this.saleContTmplId, // 销售合同模板ID
                purchaseFileAttachList: this.buyContTmplId === 'upload' ? this.buyContImg : null, // 采购合同文件
                saleFileAttachList: this.saleContTmplId === 'upload' ? this.saleContImg : null, // 销售文件附件
                correlationOrderId: this.obj.orderId,
                isUnilateralCorrelation: this.unilateralRelevance.isUnilateralCorrelation
            };
            // if (this.list.contractType === 1 && this.buyContTmplId === null) {
            //     this.$message({
            //         message: '请选择采购合同模板',
            //         type: 'warning'
            //     });
            //     return false;
            // }
            // if (this.list.contractType === 1 && this.buyContImg.length === 0 && this.buyContTmplId === 'upload') {
            //     this.$message({
            //         message: '请上传采购合同',
            //         type: 'warning'
            //     });
            //     return false;
            // }
            // if (this.list.contractType === 1 && this.saleContTmplId === null) {
            //     this.$message({
            //         message: '请选择销售合同模板',
            //         type: 'warning'
            //     });
            //     return false;
            // }
            // if (this.list.contractType === 1 && this.saleContImg.length === 0 && this.saleContTmplId === 'upload') {
            //     this.$message({
            //         message: '请上传销售合同',
            //         type: 'warning'
            //     });
            //     return false;
            // }
            // if (this.list.contractType === 2 && this.buyContTmplId === null) {
            //     this.$message({
            //         message: '请选择采购合同模板',
            //         type: 'warning'
            //     });
            //     return false;
            // }
            // if (this.list.contractType === 2 && this.buyContImg.length === 0 && this.buyContTmplId === 'upload') {
            //     this.$message({
            //         message: '请上传采购合同',
            //         type: 'warning'
            //     });
            //     return false;
            // }
            // if (this.list.contractType === 3 && this.saleContTmplId === null) {
            //     this.$message({
            //         message: '请选择销售合同模板',
            //         type: 'warning'
            //     });
            //     return false;
            // }
            // if (this.list.contractType === 3 && this.saleContImg.length === 0 && this.saleContTmplId === 'upload') {
            //     this.$message({
            //         message: '请上传销售合同',
            //         type: 'warning'
            //     });
            //     return false;
            // }
            this.$http.post(this.$api.contract.addContract1, query).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    that.goback();
                } else {
                    this.$message({
                        message: res.data.code + ' ' + res.data.message,
                        type: 'error'
                    });
                }
            });
        },
        goback () {
            this.$router.go(-1);
        },
        deleteImg (idx, type) {
            type === 'sale' ? this.saleContImg.splice(idx, 1) : this.buyContImg.splice(idx, 1);
        }
    },
    components: {
        contSell,
        contBuy,
        cont
    }
};
</script>

<style lang="scss" scoped>
    .add-contract {
        margin-top: 20px;
        padding: 0 16px;
    }

    .avatar-uploader-icon {
        font-size: 20px;
        color: #8c939d;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }

    .avatar {
        width: 50px;
        height: 50px;
        display: block;
    }

    .search1 {
        position: absolute;
        right: 0;
        bottom: 10px;
        line-height: 1;
    }
    .essential-wrapper{
        padding: 0;
    }
</style>
<style lang="scss">
    .add-contract {
        .el-input-number__decrease {
            border-right: 0;
            background: #fff;
        }
        .el-input-number__increase {
            border-left: 0;
            background: #fff;
        }
        .el-upload {
            border: 1px solid #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .el-upload:hover {
            border-color: #409EFF;
        }
        .el-dialog__body {
            padding-top: 0;
        }
    }
</style>
