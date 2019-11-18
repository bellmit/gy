<template>
    <!-- 合同要素修改 -->
    <div class="add-contract contract-revise contract-revise-new">
        <div class="essential-information">
            <p class="paydetail-title">基本信息</p>
            <div class="essential-wrapper">
                <div class="essential-row">
                    <div class="essential-item">
                        <div class="essential-title">业务类型</div>
                        <div class="essential-text">{{data.bizType | businessTradeType}}
                            <span v-if="data.contractType !== 1" class="contractType">{{data.contractType|contractTradeType(data.bizType)}}</span>
                        </div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title">交易类型</div>
                        <div class="essential-text">{{data.transactionType|contractTransactionTypeList}}</div>
                    </div>
                </div>
                <div class="essential-row">
                    <div class="essential-item">
                        <div class="essential-title">业务操作人</div>
                        <div class="essential-text">{{data.businessManagerName}}</div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title">业务组</div>
                        <div class="essential-text">{{data.organizationName}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pay-wrapper">
            <div v-if="!(data.contractType === 3)" class="essential-information">
                <p class="paydetail-title">上游合同信息</p>
                <div class="essential-wrapper" style="padding-bottom:10px">
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title sellerInfo-title"><span class="isMust">*</span>产品名称</div>
                            <div class="essential-text">
                                <el-select v-model="data.prodName" placeholder="请选择" disabled></el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title sellerInfo-title">我方公司</div>
                            <div class="essential-text">
                                <el-select v-model="data.targetCorpName" placeholder="请选择" @change="checktargetCorpbuy">
                                    <el-option v-for="(item, index) in relatedCompany" :key="index" :label="item.targetCorpName" :value="index"></el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title sellerInfo-title"><span class="isMust">*</span>上游公司</div>
                            <div class="essential-text">
                                <input type="text" placeholder="请选择上游公司" v-model="data.upstreamInfo.sellerCompanyName" @click="checkCompany(2)">
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title sellerInfo-title"><span class="isMust">*</span>交易对手评级</div>
                            <div class="essential-text">
                                <input type="text" disabled placeholder="请输入" v-model="data.upstreamInfo.grade">
                            </div>
                        </div>
                    </div>
                    <component v-for="(item, index) in upstreamCmptList" :key="index" :is="item.propKey" :comp-data="item" :order-data="data.upstreamInfo"></component>
                </div>
            </div>
            <div v-if="!(data.contractType === 2)" class="essential-information">
                <p class="paydetail-title">下游合同信息</p>
                <div class="essential-wrapper" style="padding-bottom:10px">
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title buyerInfo-title"><span class="isMust">*</span>产品名称</div>
                            <div class="essential-text">
                                <el-select v-model="data.prodName" placeholder="请选择" disabled></el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title buyerInfo-title">我方公司</div>
                            <div class="essential-text">
                                <el-select v-model="data.targetCorpName" placeholder="请选择" @change="checktargetCorpbuy">
                                    <el-option v-for="(item, index) in relatedCompany" :key="index" :label="item.targetCorpName" :value="index"></el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title buyerInfo-title"><span class="isMust">*</span>下游公司</div>
                            <div class="essential-text">
                                <input type="text" placeholder="请选择下游公司" v-model="data.downstreamInfo.buyerCompanyName" @click="checkCompany(3)">
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title buyerInfo-title"><span class="isMust">*</span>交易对手评级</div>
                            <div class="essential-text">
                                <input type="text" disabled placeholder="请输入" v-model="data.downstreamInfo.grade">
                            </div>
                        </div>
                    </div>
                    <component v-for="(item, index) in downstreamCmptList" :key="index" :is="item.propKey" :comp-data="item" :order-data="data.downstreamInfo"></component>
                </div>
            </div>
        </div>
        <div class="foot">
            <button class="gy-button-normal" @click="goback" v-if="contEssId !== undefined && contEssId !== null">返回</button>
            <button type="button" v-gy-auth="'to_create_cont_ess'" class="gy-button-extra confirmations" @click="onsubmit">提交</button>
        </div>
        <gy-file-view ref="contFileView"></gy-file-view>
        <el-dialog width="1200px" class="order-dialog" :title="upstreamTerm === 2 || upstreamTerm === 4? '销售合同列表' : '采购合同列表'"
                   :visible.sync="isShowUnilateralDialog" v-if='isShowUnilateralDialog'>
            <div class="gy-form-group">
                <span class="l">公司名称</span>
                <input type="text" placeholder="请输入上游公司名称" v-model="searchForm.buyerCompanyName" v-if="upstreamTerm === 1">
                <input type="text" placeholder="请输入下游公司名称" v-model="searchForm.sellerCompanyName" v-if="upstreamTerm === 2">
                <input type="text" placeholder="请输入上游公司名称" v-model="searchForm.sellerCompanyName" v-if="upstreamTerm === 3">
                <input type="text" placeholder="请输入下游公司名称" v-model="searchForm.buyerCompanyName" v-if="upstreamTerm === 4">
            </div>
            <div class="gy-form-group">
                <i class="iconfont icon-search" style="position: absolute;top: 10px;left: -20px;" @click="purchaseContract()"></i>
            </div>
            <table class="gy-table">
                <thead>
                <tr>
                    <th></th>
                    <th><span v-if="upstreamTerm === 2 || upstreamTerm === 4">下游公司</span><span v-else>上游公司</span>
                    </th>
                    <th><span v-if="upstreamTerm === 2 || upstreamTerm === 4">销售合同编号</span><span v-else>采购合同编号</span></th>
                    <th>合同金额(元)</th>
                    <th>交割库</th>
                    <th>交割日期</th>
                    <th v-if="showDvlyQtyCol">可交割数量</th>
                    <th v-if="showDvlyQtyCol">合约数量</th>
                    <th>免仓期(天)</th>
                    <!-- <th>合同状态</th> -->
                </tr>
                </thead>
                <tbody v-if="this.purchaseContractList.length > 0">
                <tr v-for="(item, index) in purchaseContractList" :key="index">
                    <td>
                        <input type="radio" @change="crossHandleCheckChange(item)" name="11">
                    </td>
                    <td><span v-if="upstreamTerm === 2 || upstreamTerm === 4">{{item.buyerCompanyName}}</span><span v-else>{{item.sellerCompanyName}}</span>
                    </td>
                    <td>{{item.contractCode}}</td>
                    <td v-if="showDvlyQtyCol">-</td>
                    <td class="align-r" v-else-if="item.skuPriceType === 21 || item.skuPriceType === 22">公式计价</td>
                    <td class="align-r" v-else>{{item.totalAmount | numToCash}}</td>
                    <td v-if="showDvlyQtyCol">-</td>
                    <td v-else>{{item.deliveryWarehouseName}}</td>
                    <td v-if="showDvlyQtyCol">-</td>
                    <td v-else>{{item.deliveryDate}}</td>
                    <td class="align-r" v-if="showDvlyQtyCol">{{item.canDeliveryQuantity | numToQuantity}}</td>
                    <td class="align-r" v-if="showDvlyQtyCol">{{item.skuQuantity | numToQuantity}}</td>
                    <td v-if="showDvlyQtyCol">-</td>
                    <td v-else>{{item.warehouseFreeDays}}</td>
                    <!-- <td>{{item.approveStatus}}</td> -->
                </tr>
                </tbody>
                <tbody v-else>
                <tr>
                    <td v-if="showDvlyQtyCol" colspan="9" style="text-align: center;">暂无数据</td>
                    <td v-else colspan="7" style="text-align: center;">暂无数据</td>
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
                <button class="gy-button-normal" style="margin-right: 6px;" @click="isShowUnilateralDialog = false">取消
                </button>
                <button class="gy-button-extra" @click="crossSubmission()">确定</button>
            </div>
        </el-dialog>
        <el-dialog v-if="dialogVisible" width="800px" class="addDialog" title="上游公司列表"
                   :visible.sync="dialogVisible">
            <div class="gy-form-group">
                <span class="l">公司名称</span>
                <div>
                    <input type="text" v-focus v-model="companyName"
                    placeholder="请输入上游公司名称">
                </div>
                <span class="search1" @click="getCompanyByBizType">
                    <i class="iconfont icon-search"></i>
                </span>
            </div>
            <div class="dialog-table">
                <table class="gy-table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>上游公司</th>
                        <th>地址</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in sellCompanyList" :key="index">
                        <td style="width: 50px;max-width: 50px">
                          <span class="el-radio__input" :class="index === activeIndex ? 'is-checked' : ''" @click="checked(index)">
                            <span class="el-radio__inner"></span>
                          </span>
                        </td>
                        <td style="width: 320px;max-width: 320px">{{item.sellerCorpName}}</td>
                        <td style="width: 358px;max-width: 358px">{{item.address}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
                <button class="gy-button-normal" @click="dialogVisible = false">取消</button>
                <button class="gy-button-extra confirmations" :class="{sellConfirmation:sellerCheck}" :disabled='sellerCheck' @click="checkSales(2)" style="margin-left: 8px">选择</button>
            </span>
        </el-dialog>
        <el-dialog v-if="dialogVisibles" width="800px" class="addDialog" title="下游公司列表"
                   :visible.sync="dialogVisibles">
            <div class="gy-form-group">
                <span class="l">公司名称</span>
                <div>
                    <input type="text" v-focus v-model="companyName"
                    placeholder="请输入下游公司名称">
                </div>
                <span class="search1" @click="getCompanyByBizType">
                    <i class="iconfont icon-search"></i>
                </span>
            </div>
            <div class="dialog-table">
                <table class="gy-table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>下游公司</th>
                        <th>地址</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in buyCompanyList" :key="index">
                        <td style="width: 50px;max-width: 50px">
                          <span class="el-radio__input" :class="index === activeIndex ? 'is-checked' : ''" @click="checked(index)">
                            <span class="el-radio__inner"></span>
                          </span>
                        </td>
                        <td style="width: 320px;max-width: 320px">{{item.buyerCorpName}}</td>
                        <td style="width: 358px;max-width: 358px">{{item.address}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
                <button class="gy-button-normal" @click="dialogVisibles = false">取消</button>
                <button class="gy-button-extra confirmations" :class="{buyConfirmation:buyerCheck}" :disabled='buyerCheck' @click="checkSales(3)" style="margin-left: 8px">选择</button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import Bus from '@/config/bus.js';
import gyFileView from './../components/gyFileView';
import gyFileUpload from './../components/gyFileUpload';
import brand from './create-cont-ess-components/brand';
import chattingFee from './create-cont-ess-components/chattingFee';
import consignmentTime from './create-cont-ess-components/consignmentTime';
import deliveryDate from './create-cont-ess-components/deliveryDate';
import deliverySite from './create-cont-ess-components/deliverySite';
import deliverySiteDock from './create-cont-ess-components/deliverySiteDock';
import deliveryType from './create-cont-ess-components/deliveryType';
import deposit from './create-cont-ess-components/deposit';
import depositAgreement from './create-cont-ess-components/depositAgreement';
import depositBenchmark from './create-cont-ess-components/depositBenchmark';
import manufacturer from './create-cont-ess-components/manufacturer';
import outgoingQualityBill from './create-cont-ess-components/outgoingQualityBill';
import packagingStandard from './create-cont-ess-components/packagingStandard';
import paymentDate from './create-cont-ess-components/paymentDate';
import paymentType from './create-cont-ess-components/paymentType';
import prodInspectionFee from './create-cont-ess-components/prodInspectionFee';
import prodInspectionType from './create-cont-ess-components/prodInspectionType';
import provideInvoiceType from './create-cont-ess-components/provideInvoiceType';
import qualityStandard from './create-cont-ess-components/qualityStandard';
import remarks from './create-cont-ess-components/remarks';
import settlementQtyType from './create-cont-ess-components/settlementQtyType';
import shortOverflowRate from './create-cont-ess-components/shortOverflowRate';
import skuOrigin from './create-cont-ess-components/skuOrigin';
import skuPrice from './create-cont-ess-components/skuPrice';
import skuQuantity from './create-cont-ess-components/skuQuantity';
import specifications from './create-cont-ess-components/specifications';
import transportType from './create-cont-ess-components/transportType';
import warehouseFreeDays from './create-cont-ess-components/warehouseFreeDays';
import wastage from './create-cont-ess-components/wastage';
import chattingCompany from './create-cont-ess-components/chattingCompany';
import packagingStandardMulti from './create-cont-ess-components/packagingStandardMulti';
import longTermContractUp from './create-cont-ess-components/longTermContractUp';
import longTermContractDown from './create-cont-ess-components/longTermContractDown';
import deliverySiteOtherDock from './create-cont-ess-components/deliverySiteOtherDock';

export default {
    components: {
        gyFileView,
        gyFileUpload,
        specifications, // 规格型号
        manufacturer, //  生产商
        skuQuantity, // 合同数量
        shortOverflowRate, // 溢短装
        packagingStandardMulti, // 包装标准
        longTermContractUp,
        longTermContractDown,
        wastage, // 损耗
        settlementQtyType, // 结算数量
        skuPrice, // 单价
        deposit, // 保证金
        depositAgreement, // 追保约定
        depositBenchmark, // 追保基准
        deliverySite, // 交割地点
        deliverySiteDock, // 交割地点
        deliveryDate, // 交割日期
        deliveryType, // 交割方式
        warehouseFreeDays, // 免仓期
        transportType, // 运输方式
        paymentType, // 付款方式
        provideInvoiceType, // 发票月份
        skuOrigin, // 货源
        brand, // 品牌
        qualityStandard, // 质量标准
        packagingStandard, // 包装标准
        prodInspectionType, // 商检
        prodInspectionFee, // 商检费用
        chattingFee, // 撮合费用
        consignmentTime,
        outgoingQualityBill, // 出厂质检单
        paymentDate, // 付款日期
        remarks, // 合同要素备注
        chattingCompany,
        deliverySiteOtherDock
    },
    data () {
        return {
            contEssId: null,
            searchForm: {
                pageNo: 1,
                pageSize: 10,
                productId: null,
                buyerCompanyName: null,
                sellerCompanyName: null,
                bizType: null // 1销售订单 2采购订单
            },
            goodsList: [],
            forContEssRecreate: null,
            totalDelivery: null,
            purchaseContractList: [],
            isShowUnilateralDialog: false,
            deliveryContractList: [], // 销售交割-采购合同List
            userid: null, // 用户id
            organizationId: null, // 业务组id
            businessManager: [], // 业务操作人
            businessManagerGroup: [], // 业务操作人所属组
            isSellerCh: false,
            isBuyerCh: false,
            data: {
                id: null, // 合同要素ID
                bizType: null, // 业务类型
                businessManagerId: null, // 业务操作人ID
                businessManagerName: null, // 业务操作人
                organizationName: null, // 业务操作人所在组
                usrOrganizationId: null, // 业务操作人所在组ID
                contractType: 1, // 单边交易（ 合同类型）（默认为双边交易）
                modifyFieldInfo: [], // 修改数据集合
                downstreamInfo: {
                    companyId: null, // 下游公司id
                    companyName: null, // 下游公司名称
                    skuOrigin: null, // 货源（国产、进口、自定义）
                    prodName: null, // 产品名称
                    skuCode: null, // 产品Code
                    prdSkuId: null, // 产品ID
                    deliveryWarehouseId: null, // 交割仓库id
                    deliveryWarehouseName: null, // 交割仓库名称
                    deliveryDateFlag: null, // 交割时间标识
                    deliveryBeginDate: null, // 计划交割开始日期（格式：yyyy-MM-dd）
                    deliveryEndDate: null, // 计划交割结束日期（格式：yyyy-MM-dd）
                    deliveryDateText: null, // 计划交割时间文本
                    provideInvoiceType: null, // 发票月份
                    provideInvoiceDays: null, // 发票月份
                    paymentType: null, // 付款方式（0：先款后货，1：先货后款）
                    skuPrice: null, // 单价
                    skuPriceType: 1, // 单价类型
                    depositType: null, //  保证金类型
                    skuPriceExpression: null, // 单价
                    packagingStandard: null, // 包装标准
                    qualityStandard: null, // 质量标准
                    skuQuantity: null, // 数量
                    depositRatio: null, // 保证金比率（%）
                    depositAmount: null, // 保证金按金额
                    depositRatioSubtract: null, // 保证金比率（跌）
                    depositRatioAppend: null, // 保证金比率（补）
                    warehouseFreeDays: null, // 免仓期（天）
                    deliveryType: null, // 交割方式
                    payChannel: null, // 支付结算方式
                    remarks: null, // 备注
                    targetCorpId: null, // 我方公司ID
                    targetCorpName: null, // 我方公司名称
                    longtermContractOrderId: null, // 下游合约
                    chattingAmount: null, // 撮合费用
                    priceOfWeight: null,
                    chattingCompanyName: null // 撮合公司
                },
                upstreamInfo: {
                    companyId: null, // 上游公司id
                    companyName: null, // 上游公司名称
                    skuOrigin: null, // 货源（国产、进口、自定义）
                    prodName: null, // 产品名称
                    skuCode: null, // 产品Code
                    prdSkuId: null, // 产品ID
                    deliveryWarehouseId: null, // 交割仓库id
                    deliveryWarehouseName: null, // 交割仓库名称
                    deliveryDateFlag: null, // 交割时间标识
                    deliveryBeginDate: null, // 计划交割开始日期（格式：yyyy-MM-dd）
                    deliveryEndDate: null, // 计划交割结束日期（格式：yyyy-MM-dd）
                    deliveryDateText: null, // 计划交割时间文本
                    provideInvoiceType: null, // 发票月份
                    provideInvoiceDays: null, // 发票月份
                    paymentType: null, // 付款方式（0：先款后货，1：先货后款）
                    skuPrice: null, // 单价
                    skuPriceType: 1, // 单价类型
                    depositType: null, //  保证金类型
                    skuPriceExpression: null, // 单价
                    packagingStandard: null, // 包装标准
                    qualityStandard: null, // 质量标准
                    skuQuantity: null, // 数量
                    depositRatio: null, // 保证金比率（%）
                    depositAmount: null, // 保证金按金额
                    depositRatioSubtract: null, // 保证金比率（跌）
                    depositRatioAppend: null, // 保证金比率（补）
                    warehouseFreeDays: null, // 免仓期（天）
                    deliveryType: null, // 交割方式
                    payChannel: null, // 支付结算方式
                    remarks: null, // 备注
                    targetCorpId: null, // 我方公司ID
                    targetCorpName: null, // 我方公司名称
                    longtermContractOrderId: null, // 上游合约
                    chattingAmount: null, // 撮合费用
                    priceOfWeight: null,
                    chattingCompanyName: null // 撮合公司
                }
            },
            dialogVisible: false,
            dialogVisibles: false,
            sellCompanyList: [],
            buyCompanyList: [],
            relatedCompany: [], //  targetCorpId:我方公司ID  targetCorpName:我方公司名称
            companyName: null,
            activeContractType: null, // 表示当前处理的是上游采购:2, 还是下游销售:3
            activeIndex: null,
            buyerInfoProd: null,
            sellerInfoProd: null,
            sellerInfoProdIndex: null,
            buyerTrade: null,
            sellerTrade: null,
            businessManageridx: null,
            srOrganizationIdx: null,
            obj: {},
            modifyFieldInfo: {},
            upstreamTerm: null, // 判断长约处理字段
            showDvlyQtyCol: false, // (选择关联合同时)是否展示交割数量的相关列
            sellerCheck: false, // 限制上游按钮的显示
            buyerCheck: false, // 限制下游按钮的显示
            dataOldList: {},
            oldData: {},
            targetCorpIdIdx: null, // 我方公司选择时的索引
            upstreamCmptList: [], // 上游组件定义列表(只用于画面展示)
            downstreamCmptList: [], // 下游组件定义列表(只用于画面展示)
            upstreamPropList: [], // 上游组件定义列表(全部)
            downstreamPropList: [], // 下游组件定义列表(全部)
            isTargetChange: false
        };
    },
    mounted () {
        this.getRelatedCompany();
        this.getGrade();
        this.businessManageridx = JSON.parse(localStorage.getItem('userInfo')).username;
        this.data.businessManagerName = this.businessManageridx;
        this.userid = JSON.parse(localStorage.getItem('userInfo')).id;
        this.getUserOrganization();
        this.contEssId = this.$route.query.id;
        if (this.$route.query.id !== null && this.$route.query.id !== undefined) {
            this.getdetailOrder();
        }
    },
    methods: {
        goback () {
            this.$router.go(-1);
        },
        getdetailOrder () { // 合同要素详情
            let that = this;
            this.$http.get(this.$api.order.orderDetail + '/' + that.$route.query.id).then(function (res) {
                if (res.data.code === 0) {
                    // 去结果画面
                    that.data = res.data.data;
                    that.activeProductId = that.data.productId; // 产品ID
                    that.data.sourceContEssId = that.$route.query.id;
                    that.data.lastContEssId = res.data.data.lastContEssId || res.data.data.id;

                    // 上游
                    if (that.data.upstreamInfo) {
                        that.data.upstreamInfo.companyName = that.data.upstreamInfo.sellerCompanyName; // 上游公司
                        that.data.upstreamInfo.companyId = that.data.upstreamInfo.sellerCompanyId; // 上游公司
                        that.data.upstreamInfo.prdSkuId = that.data.productId;
                        that.data.upstreamInfo.targetCorpName = that.data.targetCorpName;
                        that.gitPropType(2);
                    }
                    // 下游
                    if (that.data.downstreamInfo) {
                        that.data.downstreamInfo.companyName = that.data.downstreamInfo.buyerCompanyName; // 上游公司
                        that.data.downstreamInfo.companyId = that.data.downstreamInfo.buyerCompanyId; // 上游公司
                        that.data.downstreamInfo.prdSkuId = that.data.productId;
                        that.data.downstreamInfo.targetCorpName = that.data.targetCorpName;
                        that.gitPropType(3);
                    }
                    that.companyName = null;
                    that.activeContractType = 0;
                    // 根据业务类型获取可交易的买卖方公司
                    that.forContEssRecreate = true;

                    that.oldData = JSON.parse(JSON.stringify(that.data));
                    that.getCompanyByBizType(true);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        gitPropType (contractType) {
            let that = this;
            let params = {
                productId: this.data.productId,
                contractType: contractType
            };
            that.$http.post(that.$api.contract.getProdPropCompList, params).then(res => {
                if (res.data.code === 0) {
                    if (contractType === 2) {
                        that.upstreamPropList = res.data.data;
                        that.upstreamCmptList = that.upstreamPropList.filter(item => item.displayOrder > 0);
                    }
                    if (contractType === 3) {
                        that.downstreamPropList = res.data.data;
                        that.downstreamCmptList = that.downstreamPropList.filter(item => item.displayOrder > 0);
                    }
                } else {
                    that.$message.error(res.data.message);
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
        // 交叉采购合同
        crossHandleCheckChange (item) {
            this.obj = item;
        },
        // 分页
        handleCurrentChangeDeliver (e) {
            this.searchForm.pageNo = e;
            let vals = null;
            if (this.upstreamTerm === 1 || this.upstreamTerm === 2) {
                vals = '单边';
            } else if (this.upstreamTerm === 3) {
                vals = '上游';
            } else if (this.upstreamTerm === 4) {
                vals = '下游';
            }
            this.purchaseContract(vals, true);
        },
        // 获取单边合同列表
        purchaseContract (vals, isPageFlip) {
            if (vals && (isPageFlip === undefined || isPageFlip == null)) {
                this.searchForm = {};
            }
            this.upstreamTerm = 0;
            if (vals === '单边') {
                if (this.data.contractType == null || this.data.contractType === undefined) {
                    this.$message.error('请先选择单边交易类型后再查询单边合同');
                    this.isShowUnilateralDialog = false;
                    return false;
                }
                if (this.data.contractType === 1) {
                    this.$message.error('双边交易时不能查询单边合同');
                    this.isShowUnilateralDialog = false;
                    return false;
                }
                this.showDvlyQtyCol = false;

                // 这里要区分单边还是双边合同
                if (this.data.contractType === 2) {
                    // 采购
                    this.upstreamTerm = 2; // 匹配查询单边销售合同
                    if (this.sellerInfoProd == null || this.sellerInfoProd === undefined) {
                        this.$message.error('请先选择产品后再查询单边合同');
                        this.isShowUnilateralDialog = false;
                        return false;
                    }

                    this.searchForm.bizType = 1;
                    this.searchForm.unilateralCorrelation = 1;
                    this.searchForm.productId = this.sellerInfoProd;
                    this.searchForm.skuQuantity = Number(this.data.upstreamInfo.skuQuantity);
                } else if (this.data.contractType === 3) {
                    // 销售
                    this.upstreamTerm = 1; // 匹配查询单边采购合同
                    if (this.buyerInfoProd == null || this.buyerInfoProd === undefined) {
                        this.$message.error('请先选择产品后再查询单边合同');
                        this.isShowUnilateralDialog = false;
                        return false;
                    }

                    this.searchForm.bizType = 2;
                    this.searchForm.unilateralCorrelation = 1;
                    this.searchForm.productId = this.buyerInfoProd;
                    this.searchForm.skuQuantity = this.data.downstreamInfo.skuQuantity;
                }
                if (this.searchForm.productId == null || this.searchForm.productId === undefined) {
                    this.$message.error('请先选择产品后再查询单边合同');
                    this.isShowUnilateralDialog = false;
                    return false;
                }
                if (this.searchForm.skuQuantity == null || this.searchForm.skuQuantity === undefined) {
                    this.$message.error('请先输入产品数量后再查询单边合同');
                    this.isShowUnilateralDialog = false;
                    return false;
                }
            } else {
                this.showDvlyQtyCol = true;
                if (this.searchForm.unilateralCorrelation === 1) {
                    delete this.searchForm.unilateralCorrelation;
                }
                // 这里肯定是长约
                if (vals === '上游') {
                    // 上游
                    this.upstreamTerm = 3; // 匹配查询长约采购合同
                    this.searchForm.bizType = 2;
                    if (this.sellerInfoProd == null || this.sellerInfoProd === undefined) {
                        this.$message.error('请先选择产品后再查询长约合同');
                        this.isShowUnilateralDialog = false;
                        return false;
                    }

                    this.searchForm.productId = this.sellerInfoProd;
                    this.searchForm.skuQuantity = this.data.upstreamInfo.skuQuantity;
                    this.searchForm.sellerCompanyName = this.data.upstreamInfo.companyName;
                    // 再根据业务类型做判断(长约)
                    if (this.data.bizType === 6) {
                        this.searchForm.longtermContractFlag = 1;
                    }
                } else if (vals === '下游') {
                    // 下游
                    this.upstreamTerm = 4; // 匹配查询长约销售合同
                    this.searchForm.bizType = 1;
                    if (this.buyerInfoProd == null || this.buyerInfoProd === undefined) {
                        this.$message.error('请先选择产品后再查询长约合同');
                        this.isShowUnilateralDialog = false;
                        return false;
                    }

                    this.searchForm.productId = this.buyerInfoProd;
                    this.searchForm.skuQuantity = this.data.downstreamInfo.skuQuantity;
                    this.searchForm.buyerCompanyName = this.data.downstreamInfo.companyName;
                    // 再根据业务类型做判断(长约)
                    if (this.data.bizType === 6) {
                        this.searchForm.longtermContractFlag = 1;
                    }
                }
                if (this.searchForm.productId == null || this.searchForm.productId === undefined) {
                    this.$message.error('请先选择产品后再查询长约合同');
                    this.isShowUnilateralDialog = false;
                    return false;
                }
                if (this.searchForm.skuQuantity == null || this.searchForm.skuQuantity === undefined) {
                    this.$message.error('请先输入产品数量后再查询长约合同');
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
        // 确认选择单边关联的合同
        crossSubmission () {
            // 这里要只有长约查询
            if (this.upstreamTerm === 3) { // 上游长约
                this.data.upstreamInfo.contractCode = this.obj.contractCode;
                this.data.upstreamInfo.longtermContractOrderId = this.obj.orderId;
                this.isShowUnilateralDialog = false;
            } else if (this.upstreamTerm === 4) { // 下游长约
                this.data.downstreamInfo.contractCode = this.obj.contractCode;
                this.data.downstreamInfo.longtermContractOrderId = this.obj.orderId;
                this.isShowUnilateralDialog = false;
            }
            this.searchForm = {};
        },
        // 获取单边关联的合同附件
        deliveryContractClick (val) {
            if (val == null || val === undefined) {
                return false;
            }
            let that = this;
            that.$http.get(that.$api.delivery.deliveryContract + '/' + val).then((res) => {
                if (res.data.code === 0) {
                    // 合同附件
                    that.deliveryContractList = res.data.data.erpFileContractModelList;
                    if (that.deliveryContractList == null || that.deliveryContractList === undefined || that.deliveryContractList.length === 0) {
                        that.$message.error('您选择的单边合同无合同附件!');
                        return false;
                    }
                }
            });
        },
        // 业务操作人选中
        businessManagerchk () {
            this.data.businessManagerName = this.businessManager[this.businessManageridx].userName;
            this.data.businessManagerId = this.businessManager[this.businessManageridx].usrUserId;
            this.userid = this.businessManager[this.businessManageridx].usrUserId;
            this.getUserOrganization();
        },
        // 选中交易公司(上下游)
        checked (idx) {
            this.activeIndex = idx;
            // 检查交易方是否已准入
            if (this.activeContractType === 3) {
                let companyId = this.buyCompanyList[this.activeIndex].buyerCorpId;
                let errMsg = '您选择的下游公司:' + this.buyCompanyList[this.activeIndex].buyerCorpName + '，未做准入，请先提交准入申请！';
                this.getCompanyGrade(this.activeContractType, companyId, errMsg);
            } else {
                let companyId = this.sellCompanyList[this.activeIndex].sellerCorpId;
                let errMsg = '您选择的上游公司:' + this.sellCompanyList[this.activeIndex].sellerCorpName + '，未做准入，请先提交准入申请！';
                this.getCompanyGrade(this.activeContractType, companyId, errMsg);
            }
        },
        // 业务组选中
        checkGroup () {
            this.data.usrOrganizationId = this.businessManagerGroup[this.srOrganizationIdx].usrOrganizationId;
            this.data.usrOrganizationName = this.businessManagerGroup[this.srOrganizationIdx].orgName;
            this.data.orgName = this.businessManagerGroup[this.srOrganizationIdx].orgName;
        },
        checkCompany (type) {
            if (this.data.bizType === null || this.data.bizType === '') {
                this.$message.error('请先选择业务类型');
                return;
            }
            if (type === 3) {
                // 下游
                this.dialogVisibles = true;
            }
            if (type === 2) {
                // 上游
                this.dialogVisible = true;
            }
            this.companyName = null;
            this.activeContractType = type;
            this.activeIndex = null;
            this.getCompanyByBizType();
        },
        // 获取买卖方公司
        getCompanyByBizType (forContEssRecreate) {
            let params = {
                bizType: this.data.bizType, // 业务类型
                productId: this.data.productId
            };
            if (this.activeContractType === 3) {
                // 下游
                params.buyerCorpName = this.companyName;
            }
            if (this.activeContractType === 2) {
                // 上游
                params.sellerCorpName = this.companyName;
            }
            this.$http.post(this.$api.contract.getCompany, params).then(res => {
                this.sellCompanyList = res.data.data.sellerCorpList;
                this.buyCompanyList = res.data.data.buyerCorpList;
            }).catch((e) => {
                console.log(e);
            });
        },
        // 获取我方公司
        getRelatedCompany () {
            this.$http.get(this.$api.contract.getRelatedCompany).then(res => {
                this.relatedCompany = res.data.data.targetCorpList;
            }).catch((e) => {
                console.log(e);
            });
        },
        // 我方公司下拉
        checktargetCorpbuy (idx) {
            this.isTargetChange = true;
            if (this.data.upstreamInfo) {
                this.data.upstreamInfo.targetCorpName = this.relatedCompany[idx].targetCorpName;
                this.data.upstreamInfo.targetCorpId = this.relatedCompany[idx].targetCorpId;
            }
            if (this.data.downstreamInfo) {
                this.data.downstreamInfo.targetCorpName = this.relatedCompany[idx].targetCorpName;
                this.data.downstreamInfo.targetCorpId = this.relatedCompany[idx].targetCorpId;
            }
        },
        // 获取业务组
        getUserOrganization () {
            let that = this;
            this.$http.get(this.$api.contract.getUserOrganization + '?userId=' + this.userid).then(res => {
                if (res.data.code === 0) {
                    that.businessManagerGroup = res.data.data;
                    that.srOrganizationIdx = 0;
                    that.checkGroup();
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 获取业务操作人
        getGrade () {
            let that = this;
            let params = {
                organizationId: this.data.usrOrganizationId,
                pageNum: 0 // 表示不分页
            };
            this.$http.post(this.$api.contract.getGrade, params).then(res => {
                if (res.data.code === 0) {
                    that.businessManager = res.data.data.rows;
                    Object.keys(res.data.data.rows).forEach((e) => {
                        if (res.data.data.rows[e].usrUserId === that.userid) {
                            that.businessManageridx = e * 1;
                            that.businessManagerchk();
                        }
                    });
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 获取交易对手评级
        getCompanyGrade (activeContractType, companyId, errMsg) {
            let that = this;
            let params = {
                productId: companyId
            };
            that.$http.post(that.$api.contract.getCompanyGrade, params).then(res => {
                if (activeContractType === 2) {
                    that.data.upstreamInfo.grade = res.data.data.grade;
                    that.sellerCheck = false;
                    if (that.data.upstreamInfo.grade === '未评级') {
                        that.sellerCheck = true;
                        that.$message({message: errMsg, type: 'warning'});
                    }
                } else if (activeContractType === 3) {
                    that.data.downstreamInfo.grade = res.data.data.grade;
                    that.buyerCheck = false;
                    if (that.data.downstreamInfo.grade === '未评级') {
                        that.buyerCheck = true;
                        that.$message({message: errMsg, type: 'warning'});
                        return false;
                    }
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 交易公司选中
        checkSales (actType) {
            if (this.activeIndex === null) {
                this.$message({
                    message: '请先选择公司',
                    type: 'error'
                });
                return;
            }
            if (actType === 3) {
                this.dialogVisibles = false;
                this.data.downstreamInfo.companyName = this.buyCompanyList[this.activeIndex].buyerCorpName;
                this.data.downstreamInfo.companyId = this.buyCompanyList[this.activeIndex].buyerCorpId;
                this.data.downstreamInfo.buyerCompanyName = this.buyCompanyList[this.activeIndex].buyerCorpName;
                this.data.downstreamInfo.buyerCompanyId = this.buyCompanyList[this.activeIndex].buyerCorpId;
            }
            if (actType === 2) {
                this.dialogVisible = false;
                this.data.upstreamInfo.companyName = this.sellCompanyList[this.activeIndex].sellerCorpName;
                this.data.upstreamInfo.companyId = this.sellCompanyList[this.activeIndex].sellerCorpId;
                this.data.upstreamInfo.sellerCompanyName = this.sellCompanyList[this.activeIndex].sellerCorpName;
                this.data.upstreamInfo.sellerCompanyId = this.sellCompanyList[this.activeIndex].sellerCorpId;
            }
        },
        // 提交
        onsubmit () {
            let that = this;
            // 先单体校验
            if (that.data.contractType === 1 || that.data.contractType === 2) {
                // 先检查上游订单信息
                let rst = that.$inputCheckFunc.checkInputItem(that.upstreamPropList, that.data.upstreamInfo, '(上游)');
                if (rst) {
                    that.$message.error(rst);
                    return false;
                }
                rst = that.$inputCheckFunc.checkRelatedInputItem(that.data.upstreamInfo, '(上游)');
                if (rst) {
                    that.$message.error(rst);
                    return false;
                }
                // 指定日期情况下 付款日期必填
                if (that.data.upstreamInfo.paymentType === 4) {
                    if (!that.data.upstreamInfo.paymentDateFlag || !that.data.upstreamInfo.paymentBeginDate) {
                        that.$message.error('指定日期情况下，付款日期必填(上游)');
                        return;
                    }
                }
            }
            if (that.data.contractType === 1 || that.data.contractType === 3) {
                // 再检查下游订单信息
                let rst = that.$inputCheckFunc.checkInputItem(that.downstreamPropList, that.data.downstreamInfo, '(下游)');
                if (rst) {
                    that.$message.error(rst);
                    return false;
                }
                rst = that.$inputCheckFunc.checkRelatedInputItem(that.data.downstreamInfo, '(下游)');
                if (rst) {
                    that.$message.error(rst);
                    return false;
                }
                // 指定日期情况下 付款日期必填
                if (that.data.downstreamInfo.paymentType === 4) {
                    if (!that.data.downstreamInfo.paymentDateFlag || !that.data.downstreamInfo.paymentBeginDate) {
                        that.$message.error('指定日期情况下，付款日期必填(下游)');
                        return;
                    }
                }
            }
            if (that.data.upstreamInfo && that.upstreamPropList && that.upstreamPropList.length > 0) {
                that.modifyFieldInfo['upstreamInfo'] = [];
                that.upstreamPropList.forEach((prop, index) => {
                    let varNameArray = prop.varNameList;
                    if (varNameArray == null || varNameArray === undefined || varNameArray.length === 0) {
                        return;
                    }
                    for (let i = 0; i < varNameArray.length; i++) {
                        if (String(that.oldData.upstreamInfo[varNameArray[i]]) === '0' && !String(that.data.upstreamInfo[varNameArray[i]])) {
                            continue;
                        }
                        if (String(that.oldData.upstreamInfo[varNameArray[i]]) !== String(that.data.upstreamInfo[varNameArray[i]])) {
                            let updObj = {
                                key: prop.propKey,
                                varList: []
                            };
                            varNameArray.forEach(varName => {
                                let varInfo = {
                                    key: varName,
                                    oldVal: that.oldData.upstreamInfo[varName],
                                    newVal: that.data.upstreamInfo[varName]
                                };
                                updObj.varList.push(varInfo);
                            });
                            that.modifyFieldInfo.upstreamInfo.push(updObj);
                            break;
                        }
                    }
                });
            }

            if (that.data.downstreamInfo && that.downstreamPropList && that.downstreamPropList.length > 0) {
                that.modifyFieldInfo['downstreamInfo'] = [];
                that.downstreamPropList.forEach((prop, index) => {
                    let varNameArray = prop.varNameList;
                    if (varNameArray == null || varNameArray === undefined || varNameArray.length === 0) {
                        return;
                    }
                    for (let i = 0; i < varNameArray.length; i++) {
                        if (String(that.oldData.downstreamInfo[varNameArray[i]]) === '0' && !String(that.data.downstreamInfo[varNameArray[i]])) {
                            continue;
                        }
                        if (String(that.oldData.downstreamInfo[varNameArray[i]]) !== String(that.data.downstreamInfo[varNameArray[i]])) {
                            let updObj = {
                                key: prop.propKey,
                                varList: []
                            };
                            varNameArray.forEach(varName => {
                                let varInfo = {
                                    key: varName,
                                    oldVal: that.oldData.downstreamInfo[varName],
                                    newVal: that.data.downstreamInfo[varName]
                                };
                                updObj.varList.push(varInfo);
                            });
                            that.modifyFieldInfo.downstreamInfo.push(updObj);
                            break;
                        }
                    }
                });
            }

            if (that.$route.query.todoId !== null && that.$route.query.todoId !== undefined) {
                that.data.todoId = that.$route.query.todoId;
            }
            that.data['commitType'] = 1; // 标识 是修改操作
            if ((that.data.upstreamInfo && that.modifyFieldInfo.upstreamInfo.length === 0) &&
                    (that.data.downstreamInfo && that.modifyFieldInfo.downstreamInfo.length === 0)) {
                that.$message({
                    message: '没有修改，请修改后再提交!',
                    type: 'warning'
                });
                return;
            }
            if (that.data.upstreamInfo) {
                // 默认
                !that.isTargetChange && (that.data.upstreamInfo.targetCorpId = that.data.targetCorpId);
            }
            if (that.data.downstreamInfo) {
                // 默认
                !that.isTargetChange && (that.data.downstreamInfo.targetCorpId = that.data.targetCorpId);
            }
            that.data.modifyFieldInfo = JSON.stringify(that.modifyFieldInfo);
            that.$http.post(that.$api.contract.addContract, that.data).then((res) => {
                if (res.data.code === 0) {
                    that.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    Bus.$emit('setMenu');
                } else {
                    that.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
  .search1 {
    position: absolute;
    right: 0;
    bottom: 10px;
    line-height: 1;
  }
</style>

<style lang="scss">
    .contract-revise-new {
        padding-top: 20px;
    }
    .contract-revise{
        .addDialog{
            .el-dialog__body{
                height: 567px;
                overflow: auto;
            }
        }
    }
    .contract-revise{
        .essential-row .essential-item .essential-title{
            padding-left: 10px;
        }
    }
  .add-contract {
    .el-dialog__header {
      .el-dialog__headerbtn {
        top: 10px;
        right: 16px;
      }
    }
    .order-apply {
      .title {
        font-size: 14px;
        color: #333;
        font-weight: bold;
        height: 35px;
        margin-left: 16px;
        line-height: 35px;
      }
    }
    .el-radio__label {
      font-weight: 400;
    }
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
    .el-radio {
      color: $color-minor;
      line-height: 30px;
    }
      .el-input__inner{
          font-size: 14px;
      }
      .paydetail-title {
          font-size: 14px;
      }
  }
</style>
