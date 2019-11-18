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
                    <!-- 查看采购合同 -->
                    <template v-if="list.upstreamInfo.fileAttachCertifiedList && list.upstreamInfo.fileAttachCertifiedList.length > 0">
                        <div class="essential-row">
                          <div class="essential-item">
                            <div class="essential-title">纸质合同号</div>
                            <div class="essential-text">
                              <div class="essential-text">
                              {{list.upstreamInfo.purchasePlanNumber || '--'}}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="essential-row">
                            <div class="essential-item">
                                <div class="essential-title">盖章合同</div>
                                <div class="essential-text">
                                    <div class="essential-text">
                                        <span @click="showContImg(list.upstreamInfo.fileAttachCertifiedList)"><i class="iconfont icon-photo"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="essential-row">
                            <div class="essential-item">
                                <div class="essential-title">盖章合同备注</div>
                                <div class="essential-text text-overflow">{{list.upstreamInfo.executeRemarks || '--'}}</div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="essential-row" v-if="buyContTmplId === 'upload'">
                          <div class="essential-item ">
                            <div class="essential-title">纸质合同号</div>
                            <div class="essential-text">
                              <div class="essential-text">
                                <input type="text" @blur="essenceTest(purchasePlanNumber, 'purchasePlanNumber')"
                                       v-model="purchasePlanNumber" placeholder="请输入纸质合同号"/>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="essential-row">
                            <div class="essential-item">
                                <div class="essential-title"><span class="isMust">*</span>选择合同模板
                                </div>
                                <div class="essential-text">
                                    <div class="essential-text">
                                        <el-select v-model="buyContTmplId" placeholder="请选择">
                                            <el-option v-for="item in ContractTemplate1" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="essential-row" v-if="buyContTmplId === 'upload'">
                            <div class="essential-item">
                                <div class="essential-title"><span class="isMust">*</span>上传采购合同</div>
                                <div class="essential-text">
                                    <gy-file-upload ref="pFileUpload" @callbackFileUpload="onCallbackBuyFileUpload"></gy-file-upload>
                                </div>
                            </div>
                        </div>
                        <div class="essential-row">
                            <div class="essential-item">
                                <div class="essential-title">创建合同备注</div>
                                <div class="essential-text">
                                    <textarea cols="4" rows="4" style="width:306px" v-model="buyRemark"></textarea>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="single-essential-wrapper" style="padding:0"
                     v-if="list.contractType === 2 || list.contractType === 3">
                    <div class="gy-form-group">
                        <span class="l" style="margin-left:10px">单边关联</span>
                        <template>
                            <!-- `checked` 为 true 或 false -->
                            <el-checkbox v-model="unilateralRelevance.isUnilateralCorrelation" true-label="1" false-label="0"></el-checkbox>
                        </template>
                    </div>
                    <div class="gy-form-group cl" v-if="unilateralRelevance.isUnilateralCorrelation === '1'">
                        <span class="l" style="margin-left:0px"><i class="i" style="color: red">* </i>单边合同编号</span>
                        <input type="text" readonly v-model="unilateralRelevance.contractCode">
                        <i class="iconfont icon-search" style="position: absolute;top: 10px;right: 20px;" @click="onSeachContract('单边')"></i>
                    </div>
                    <div class="gy-form-group tl" v-if="unilateralRelevance.isUnilateralCorrelation === '1'">
                        <span class="l" v-if="list.contractType === 2">单边销售合同</span>
                        <span class="l" v-if="list.contractType === 3">单边采购合同</span>
                        <span v-if="deliveryContractList && deliveryContractList.length > 0"
                              @click="showImgList(deliveryContractList)"><i class="iconfont icon-photo"></i></span>
                    </div>
                </div>
            </div>
            <div class="essential-information" v-if="list.contractType === 1 || list.contractType === 3">
                <p class="paydetail-title">销售合同信息</p>
                <div class="essential-wrapper">
                    <cont-buy :list="list"></cont-buy>
                    <!-- 查看销售合同 -->
                    <template v-if="list.downstreamInfo.fileAttachCertifiedList && list.downstreamInfo.fileAttachCertifiedList.length > 0">
                        <div class="essential-row">
                          <div class="essential-item">
                            <div class="essential-title">纸质合同号</div>
                            <div class="essential-text">
                              <div class="essential-text">{{list.downstreamInfo.salePlanNumber || '--'}}</div>
                            </div>
                          </div>
                        </div>
                        <div class="essential-row">
                            <div class="essential-item">
                                <div class="essential-title">下游统计口径</div>
                                <div class="essential-text">
                                    <div class="essential-text">{{list.downstreamInfo.statisticalCaliber || '--'}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="essential-row">
                            <div class="essential-item">
                                <div class="essential-title">盖章合同</div>
                                <div class="essential-text">
                                    <div class="essential-text">
                                        <span @click="showContImg(list.downstreamInfo.fileAttachCertifiedList)"><i class="iconfont icon-photo"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="essential-row">
                            <div class="essential-item">
                                <div class="essential-title">盖章合同备注</div>
                                <div class="essential-text text-overflow">{{list.downstreamInfo.executeRemarks || '--'}}</div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="essential-row" v-if="saleContTmplId === 'upload'">
                          <div class="essential-item">
                            <div class="essential-title">纸质合同号</div>
                            <div class="essential-text">
                              <div class="essential-text">
                                <input type="text" @blur="essenceTest(salePlanNumber, 'salePlanNumber')"
                                       v-model="salePlanNumber" placeholder="请输入纸质合同号"/>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="essential-row">
                            <div class="essential-item">
                                <div class="essential-title"><span class="isMust">*</span>选择合同模板
                                </div>
                                <div class="essential-text">
                                    <div class="essential-text">
                                        <el-select v-model="saleContTmplId" placeholder="请选择">
                                            <el-option v-for="item in ContractTemplate" :key="item.id" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="essential-row" v-if="saleContTmplId === 'upload'">
                            <div class="essential-item">
                                <div class="essential-title"><span class="isMust">*</span>上传销售合同
                                </div>
                                <div class="essential-text">
                                    <gy-file-upload ref="sFileUpload" @callbackFileUpload="onCallbackSaleFileUpload"></gy-file-upload>
                                </div>
                            </div>
                        </div>
                        <div class="essential-row">
                            <div class="essential-item">
                                <div class="essential-title">创建合同备注</div>
                                <div class="essential-text">
                                    <textarea cols="4" rows="4" style="width:306px" v-model="saleRemark"></textarea>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">下游统计口径</div>
                            <div class="essential-text">
                                <div class="essential-text" style="padding-left: 10px;">{{list.downstreamInfo.statisticalCaliber || '--'}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="single-essential-wrapper" style="padding:0"
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
                        <span class="l" style="margin-left:0"><i class="i" style="color: red">* </i>单边合同编号</span>
                        <div class="essential-text">
                        <input type="text" v-model="unilateralRelevance.contractCode">
                        </div>
                        <i class="iconfont icon-search" style="position: absolute;top: 10px;right: 20px;"
                           @click="onSeachContract('单边')"></i>
                    </div>
                    <div class="gy-form-group tl" v-if="unilateralRelevance.isUnilateralCorrelation === '1'">
                        <span class="l" v-if="list.contractType === 2">单边销售合同</span>
                        <span class="l" v-if="list.contractType === 3">单边采购合同</span>
                        <span v-if="deliveryContractList && deliveryContractList.length > 0"
                              @click="showImgList(deliveryContractList)"><i class="iconfont icon-photo"></i></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot">
            <button class="gy-button-normal" @click="goback">取消</button>
            <button class="gy-button-normal" @click="turnDown">驳回</button>
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
                    <th style="width: 120px;">合同要素ID</th>
                    <th>我方公司</th>
                    <th><span v-if="currContractType === 2">下游公司</span><span v-if="currContractType === 3">上游公司</span>
                    </th>
                    <!-- <th><span v-if="currContractType === 2">销售合同编号</span><span
                            v-if="currContractType === 3">采购合同编号</span></th> -->
                    <th style="width: 130px;">合同金额(元)</th>
                    <th>实际交割日期</th>
                    <th>交割日期</th>
                    <th>交割库</th>
                    <th>免仓期(天)</th>
                    <!-- <th>合同状态</th> -->
                </tr>
                </thead>
                <tbody v-if="this.purchaseContractList.length > 0">
                <tr v-for="(item, index) in purchaseContractList" :key="index">
                    <td>
                        <input type="radio" @change="crossHandleCheckChange(item)" name="11">
                        <span style="margin-left: 3px;">{{item.contractEssenceId || '-'}}</span>
                    </td>
                    <td>{{item.ourCompanyName || '-'}}</td>
                    <td><span v-if="currContractType === 2">{{item.buyerCompanyName}}</span><span v-else>{{item.sellerCompanyName}}</span></td>
                    <!-- <td>{{item.contractCode}}</td> -->
                    <td class="align-r" style="width: 130px;" v-if="item.skuPriceType === 21 || item.skuPriceType === 22">公式计价</td>
                    <td class="align-r" style="width: 130px;" v-else>{{item.totalAmount | numToCash}}</td>
                    <td><span v-if="item.realDeliveryDate">{{item.realDeliveryDate | date}}</span><span v-else>-</span></td>
                    <td>{{item.deliveryDate}}</td>
                    <td>{{item.deliveryWarehouseName}}</td>
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
            <div class="button-wrap" style="text-align: right">
                <button class="gy-button-normal" @click="isShowUnilateralDialog = false">取消</button>
                <button class="gy-button-extra" @click="crossSubmission()">确定</button>
            </div>
        </el-dialog>
        <gy-file-view ref="contFileView"></gy-file-view>
    </div>
</template>

<script>
import contSell from './orderSell';
import contBuy from './orderBuy';
import cont from './cont';
import gyFileView from './../components/gyFileView';
import gyFileUpload from './../components/gyFileUpload';

export default {
    data () {
        return {
            purchasePlanNumber: null,
            salePlanNumber: null,
            remark: null,
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
            saleRemark: null,
            buyRemark: null,
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
                downstreamInfo: { // 买家信息
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
                    payChannel: null // 支付渠道
                },
                upstreamInfo: {// 上游公司信息
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
                    payChannel: null // 支付渠道
                }
            },
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
            obj: {},
            deliveryContractList: [],
            isShowUnilateralDialog: false,
            purchaseContractList: [],
            // isSingleBuyContract: false, // 是否单边采购合同
            // isSingleSaleContract: false, // 是否单边销售合同
            currContractType: null // 判断销售和采购对应去显示
        };
    },
    created () {
        this.getdetailOrder();
    },
    watch: {
        purchasePlanNumber (val) {
            if (val && val.length > 20) {
                this.$message({
                    message: '纸质合同号最多可填写20字',
                    type: 'error'
                });
                this.purchasePlanNumber = this.purchasePlanNumber.substr(0, 20);
            }
        },
        salePlanNumber (val) {
            if (val && val.length > 20) {
                this.$message({
                    message: '纸质合同号最多可填写20字',
                    type: 'error'
                });
                this.salePlanNumber = this.salePlanNumber.substr(0, 20);
            }
        }
    },
    methods: {
        // 驳回
        turnDown () {
            this.$confirm('<span><i class="iconfont icon-message-warning"></i>确认驳回?</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                this.$http.post(this.$api.contract.turnDown, {todoId: this.$route.query.todoId, id: this.$route.query.id}).then(res => {
                    if (res.data.code === 0) {
                        this.$message('合同已驳回');
                        this.$router.go(-1);
                    } else {
                        this.$message.error(res.data.code + ' ' + res.data.message);
                    }
                });
            });
        },
        // showImg (imgList) {
        //     this.$refs.contFileView.open4MultiFile(imgList);
        // },
        showContImg (imgList) {
            let arr = [];
            imgList.forEach((e) => {
                arr.push({fileUrl: e.filepath});
            });
            this.showImgList(arr);
        },
        showImgList (imgList) {
            this.$refs.contFileView.open(imgList);
        },
        essenceTest (e, type) {
            this.$http.post(this.$api.contract.essenceTest, {planNumber: e})
                .then((res) => {
                    if (res.data.code === 1) {
                        this.$message.error('纸质合同号已存在，请重新输入');
                        this[type] = null;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 图片上传的回调-采购合同
        onCallbackBuyFileUpload (fileList) {
            this.buyContImg = [];
            fileList.forEach((e) => {
                this.buyContImg.push(e.fileUrl);
            });
        },
        // 图片上传的回调-销售合同
        onCallbackSaleFileUpload (fileList) {
            this.saleContImg = [];
            fileList.forEach((e) => {
                this.saleContImg.push(e.fileUrl);
            });
        },
        getdetailOrder () { // 合同要素详情
            let that = this;
            this.$http.get(this.$api.order.orderDetail + '/' + that.$route.query.id).then(function (response) {
                if (response.data.code === 0) {
                    // 去结果画面
                    that.list = response.data.data;
                    // 单边关联的判断，如果是，不需要上传合同
                    // // 判断依据，是否已存在盖章合同
                    // if (that.list.upstreamInfo.fileAttachCertifiedList === null || that.list.upstreamInfo.fileAttachCertifiedList.length === 0) {
                    //     that.isSingleBuyContract = true;
                    // }
                    // if (that.list.downstreamInfo.fileAttachCertifiedList === null || that.list.downstreamInfo.fileAttachCertifiedList.length === 0) {
                    //     that.isSingleSaleContract = true;
                    // }
                    if (that.list.contractType === 2 || that.list.contractType === 3) {
                        that.unilateral = true;
                    } else {
                        that.unilateral = false;
                    }
                    if (that.list.contractType === 2) {
                        this.currContractType = 2; // 如果是采购，则关联的销售合同
                    } else if (this.list.contractType === 3) {
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
            this.searchForm.pageNo = 1;
            this.purchaseContract(val);
        },
        // 获取单边合同列表
        purchaseContract (vals) {
            if (vals === '单边') {
                if (this.list.contractType == null || this.list.contractType === undefined) {
                    this.$message('请先选择单边交易类型后再查询单边合同');
                    this.isShowUnilateralDialog = false;
                    return false;
                }
                if (this.list.contractType === 1) {
                    this.$message('双边交易时不能查询单边合同');
                    this.isShowUnilateralDialog = false;
                    return false;
                }
                // 这里要区分单边还是双边合同
                if (this.list.contractType === 2) {
                    this.searchForm.bizType = 1;
                    this.currContractType = 2; // 如果是采购，则关联的销售合同
                    this.searchForm.unilateralCorrelation = 1;
                    this.searchForm.productId = this.list.productId;
                    this.searchForm.skuQuantity = this.list.upstreamInfo.skuQuantity;
                } else if (this.list.contractType === 3) {
                    this.searchForm.bizType = 2;
                    this.currContractType = 3; // 如果是销售，则关联的采购合同
                    this.searchForm.unilateralCorrelation = 1;
                    this.searchForm.productId = this.list.productId;
                    this.searchForm.skuQuantity = this.list.downstreamInfo.skuQuantity;
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
                this.list.upstreamInfo.contractCode = this.obj.contractCode;
                this.list.upstreamInfo.longtermContractOrderId = this.obj.orderId;
                this.isShowUnilateralDialog = false;
            } else if (this.upstreamTerm === 2) { // 下游
                this.list.downstreamInfo.contractCode = this.obj.contractCode;
                this.list.downstreamInfo.longtermContractOrderId = this.obj.orderId;
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
        // 交叉采购合同
        crossHandleCheckChange (item) {
            this.obj = item;
        },
        deliveryContractClick (val) {
            this.$http.get(this.$api.delivery.deliveryContract + '/' + val).then((res) => {
                if (res.data.code === 0) {
                    // 采购交割凭证
                    this.deliveryContractList = res.data.data.erpFileContractModelList;
                }
            });
        },
        onsubmit () {
            let that = this;
            let query = {
                todoId: this.$route.query.todoId,
                id: this.$route.query.id, // 合同要素ID
                isOnline: 1, // 合同类型(1.线上通用模板合同，2.线下合同)
                buyContTmplId: this.buyContTmplId === 'upload' ? null : this.buyContTmplId, // 采购合同模板ID
                saleContTmplId: this.saleContTmplId === 'upload' ? null : this.saleContTmplId, // 销售合同模板ID
                purchaseFileAttachList: this.buyContTmplId === 'upload' ? this.buyContImg : null, // 采购合同文件
                saleFileAttachList: this.saleContTmplId === 'upload' ? this.saleContImg : null, // 销售文件附件
                correlationOrderId: this.obj.orderId,
                purchasePlanNumber: this.purchasePlanNumber,
                salePlanNumber: this.salePlanNumber,
                saleRemark: this.saleRemark,
                buyRemark: this.buyRemark
            };
            if (that.list.sourceContEssId != null) {
                query.commitType = 1;
                query.sourceContEssId = that.list.sourceContEssId;
            }
            query.isUnilateralCorrelation = this.unilateralRelevance.isUnilateralCorrelation === '1';

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
        }
    },
    components: {
        contSell,
        contBuy,
        cont,
        gyFileView,
        gyFileUpload
    }
};
</script>

<style lang="scss" scoped>
  .add-contract {
    margin-top: 20px;
  }

  .search1 {
    position: absolute;
    right: 0;
    bottom: 10px;
    line-height: 1;
  }

  .ml {

  }

  .tl {
    padding: 8px 30px 8px 120px;
  }

  .essential-row .essential-item .essential-title {
    padding-left: 10px;
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

    .el-dialog__body {
      padding-top: 0;
    }
      .essential-row .essential-item {
          padding: 0px 20px;
      }
      .paydetail-title {
          font-size: 14px;
      }

      .single-essential-wrapper .gy-form-group .l {
          padding-left: 20px;
      }
  }
</style>
