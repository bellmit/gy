<!-- 创建合同要素 -->
<template>
    <div class="add-contract">
        <div class="essential-information">
            <p class="paydetail-title">基本信息</p>
            <div class="essential-wrapper">
                <div class="essential-row">
                    <div class="essential-item">
                        <div class="essential-title"><span class="isMust">*</span>业务类型</div>
                        <div class="essential-text">
                            <el-select v-model="data.bizType" placeholder="请选择" @change="onchangeBizType()">
                                <el-option v-for="(item, index) in $constant.bizType4CreateEss" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title">合同交易类型</div>
                        <div class="essential-text">
                            <el-select v-model="data.contractType" placeholder="请选择" @change="onUnilateral">
                                <el-option v-for="(item, index) in $constant.contractTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="essential-row">
                    <div class="essential-item">
                        <div class="essential-title"><span class="isMust">*</span>业务操作人</div>
                        <div class="essential-text">
                            <el-select v-model="businessManagerIdx" placeholder="请选择" @change="businessManagerchk">
                                <el-option v-for="(item, index) in businessManager" :key="index" :label="item.userName" :value="index"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title"><span class="isMust">*</span>业务组</div>
                        <div class="essential-text">
                            <el-select placeholder="请选择" v-model="srOrganizationIdx" @change="checkGroup">
                                <el-option v-for="(item, index) in businessManagerGroup" :key="index" :label="item.orgName" :value="index"></el-option>
                            </el-select>
                        </div>
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
                            <div class="essential-title"><span class="isMust">*</span>产品名称</div>
                            <div class="essential-text">
                                <el-select v-model="activeProductId" placeholder="请选择" :disabled="forContEssRecreate" @change="onchangeProduct(2,0)">
                                    <el-option v-for="(item, index) in goodsList" :key="index" :label="item.goodsName" :value="item.goodsId"></el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">我方公司</div>
                            <div class="essential-text">
                                <el-select v-model="targetCorpIdIdx" placeholder="请选择" @change="checktargetCorpbuy">
                                    <el-option v-for="(item, index) in relatedCompany" :key="index" :label="item.targetCorpName" :value="index"></el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>上游公司</div>
                            <div class="essential-text">
                                <input type="text" placeholder="请选择上游公司" v-model="data.upstreamInfo.companyName" @click="checkCompany(2)">
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>交易对手评级</div>
                            <div class="essential-text">
                                <input type="text" disabled placeholder="请输入" v-model="data.upstreamInfo.grade">
                            </div>
                        </div>
                    </div>
                    <component v-for="(item, index) in upstreamCmptList" :key="index" :is="item.propKey"
                               :biz-type="data.upstreamInfo.bizType" :need-refresh.sync="needRefresh" :comp-data="item" :order-data="data.upstreamInfo"></component>
                </div>
            </div>
            <div v-if="!(data.contractType === 2)" class="essential-information">
                <p class="paydetail-title">下游合同信息</p>
                <div class="essential-wrapper" style="padding-bottom:10px">
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>产品名称</div>
                            <div class="essential-text">
                                <el-select v-model="activeProductId" placeholder="请选择" :disabled="forContEssRecreate" @change="onchangeProduct(3,0)">
                                    <el-option v-for="(item, index) in goodsList" :key="index" :label="item.goodsName" :value="item.goodsId"></el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">我方公司</div>
                            <div class="essential-text">
                                <el-select v-model="targetCorpIdIdx" placeholder="请选择" @change="checktargetCorpbuy">
                                    <el-option v-for="(item, index) in relatedCompany" :key="index" :label="item.targetCorpName" :value="index"></el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>下游公司</div>
                            <div class="essential-text">
                                <input type="text" placeholder="请选择下游公司" v-model="data.downstreamInfo.companyName" @click="checkCompany(3)">
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>交易对手评级</div>
                            <div class="essential-text">
                                <input type="text" disabled placeholder="请输入" v-model="data.downstreamInfo.grade">
                            </div>
                        </div>
                    </div>
                    <component v-for="(item, index) in downstreamCmptList" :key="index" :is="item.propKey"
                               :biz-type.sync="data.downstreamInfo.bizType" :need-refresh.sync="needRefresh" :comp-data="item" :order-data="data.downstreamInfo"></component>
                </div>
            </div>
        </div>
        <div class="essential-wrapper isUnilateral" style="padding-top:0px"
             v-if="data.contractType === 2 || data.contractType === 3">
            <div class="gy-form-group cl">
                <span class="l"><span style="padding-left:6px">单边合同关联</span></span>
                <input type="text" v-model="unilateralRelevance.contractCode" readonly placeholder="请选择单边合同">
                <i class="el-icon-close" v-if="unilateralRelevance.contractCode !== null" style="position: absolute;top: 18px;right: 50px;cursor: pointer;" @click="delectSeachContract()"></i>
                <i class="iconfont icon-search" style="position: absolute;top: 10px;right: 30px;"
                   @click="onSeachContract('单边')"></i>
            </div>
            <div class="gy-form-group ll" v-if="deliveryContractList && deliveryContractList.length > 0">
                <span class="l" v-if="data.contractType === 2">单边销售合同</span>
                <span class="l" v-if="data.contractType === 3">单边采购合同</span>
                <div class="ml" style="display: inline-block;height: 50px;width: 50px;margin-left: 5px;">
                    <i class="iconfont icon-photo" @click="deliverContractAssembleVisibleClick()"></i>
                </div>
            </div>
        </div>
        <div class="foot">
            <button class="gy-button-normal" @click="$router.go(-1)" v-if="contEssId !== undefined && contEssId !== null">返回</button>
            <button type="button" v-gy-auth="'to_create_cont_ess'" class="gy-button-extra confirmations" @click="onsubmit">提交</button>
        </div>
        <gy-file-view ref="contFileView"></gy-file-view>
        <el-dialog width="1200px" class="order-dialog" :title="upstreamTerm === 2 || upstreamTerm === 4? '销售合同列表' : '采购合同列表'"
            :visible.sync="isShowUnilateralDialog" v-if='isShowUnilateralDialog'>
            <div class="gy-form-group">
                <span class="l">公司名称</span>
                <input type="text" placeholder="请输入上游公司名称" v-model="searchForm.buyerCompanyName" v-if="upstreamTerm === 3">
                <input type="text" placeholder="请输入下游公司名称" v-model="searchForm.sellerCompanyName" v-if="upstreamTerm === 1">
                <input type="text" placeholder="请输入上游公司名称" v-model="searchForm.sellerCompanyName" v-if="upstreamTerm === 4">
                <input type="text" placeholder="请输入下游公司名称" v-model="searchForm.buyerCompanyName" v-if="upstreamTerm === 2">
            </div>
            <div class="gy-form-group">
                <i class="iconfont icon-search" style="position: absolute;top: 10px;left: -20px;" @click="purchaseContract('单边', true)"></i>
            </div>
            <table class="gy-table">
                <thead>
                <tr>
                    <th style="width: 120px;">合同要素ID</th>
                    <th>我方公司</th>
                    <th><span v-if="upstreamTerm === 2 || upstreamTerm === 4">下游公司</span><span v-else>上游公司</span></th>
                    <th style="width: 130px;">合同金额(元)</th>
                    <th>合同交割日期</th>
                    <th>交割库</th>
                    <th v-if="showDvlyQtyCol">可交割数量</th>
                    <th v-if="showDvlyQtyCol">合约数量</th>
                    <th>免仓期(天)</th>
                    <!-- <th>合同状态</th> -->
                </tr>
                </thead>
                <tbody v-if="this.purchaseContractList.length > 0">
                <tr v-for="(item, index) in purchaseContractList" :key="index">
                    <td style="width: 120px;">
                        <input type="radio" @change="crossHandleCheckChange(item)" name="11">
                        <span style="margin-left: 3px;">{{item.contractEssenceId || '-'}}</span>
                    </td>
                    <td>{{item.ourCompanyName || '-'}}</td>
                    <td><span v-if="upstreamTerm === 2 || upstreamTerm === 4">{{item.buyerCompanyName}}</span><span v-else>{{item.sellerCompanyName}}</span>
                    </td>
                    <td v-if="showDvlyQtyCol">-</td>
                    <td class="align-r" v-else-if="item.skuPriceType === 21 || item.skuPriceType === 22">公式计价</td>
                    <td style="width: 130px;" class="align-r" v-else>{{item.totalAmount | numToCash}}</td>
                    <td v-if="showDvlyQtyCol">-</td>
                    <td v-else>{{item.deliveryDate}}</td>
                    <td v-if="showDvlyQtyCol">-</td>
                    <td v-else>{{item.deliveryWarehouseName}}</td>
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
        <el-dialog v-if="dialogVisible" width="800px" class="addDialog" title="上游公司列表" :visible.sync="dialogVisible">
            <div class="gy-form-group">
                <span class="l">公司名称</span>
                <div>
                    <input type="text" v-focus v-model="companyName" :placeholder="'请输入上游公司名称'">
                </div>
                <span class="search1" @click="getCompanyByBizType()">
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
        <el-dialog v-if="dialogVisibles" width="800px" class="addDialog" :title="'下游公司列表'" :visible.sync="dialogVisibles">
            <div class="gy-form-group">
                <span class="l">公司名称</span>
                <div>
                    <input type="text" v-focus v-model="companyName" :placeholder="'请输入下游公司名称'">
                </div>
                <span class="search1" @click="getCompanyByBizType()">
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
import brand from './create-cont-ess-components/brand';
import chattingFee from './create-cont-ess-components/chattingFee';
import chattingCompany from './create-cont-ess-components/chattingCompany';
import consignmentTime from './create-cont-ess-components/consignmentTime';
import deliveryDate from './create-cont-ess-components/deliveryDate';
import deliverySite from './create-cont-ess-components/deliverySite';
import deliverySiteDock from './create-cont-ess-components/deliverySiteDock';
import deliveryType from './create-cont-ess-components/deliveryType';
import deposit from './create-cont-ess-components/deposit';
import depositAgreement from './create-cont-ess-components/depositAgreement';
import depositBenchmark from './create-cont-ess-components/depositBenchmark';
import longTermContractUp from './create-cont-ess-components/longTermContractUp';
import longTermContractDown from './create-cont-ess-components/longTermContractDown';
import manufacturer from './create-cont-ess-components/manufacturer';
import outgoingQualityBill from './create-cont-ess-components/outgoingQualityBill';
import packagingStandard from './create-cont-ess-components/packagingStandard';
import packagingStandardMulti from './create-cont-ess-components/packagingStandardMulti';
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
import deliverySiteOtherDock from './create-cont-ess-components/deliverySiteOtherDock';

export default {
    components: {
        gyFileView,
        brand, // 品牌
        chattingFee, // 撮合费用
        chattingCompany,
        consignmentTime, // 提/交货时间
        deliveryDate, // 交割日期
        deliverySite, // 交割地点
        deliverySiteDock, // 交割地点
        deliveryType, // 交割方式
        deposit, // 保证金
        depositAgreement, // 追保约定
        depositBenchmark, // 追保基准
        longTermContractUp,
        longTermContractDown,
        manufacturer, //  生产商
        outgoingQualityBill, // 出厂质检单
        packagingStandard, // 包装标准
        packagingStandardMulti, // 包装标准
        paymentDate, // 付款日期
        paymentType, // 付款方式
        prodInspectionFee, // 商检费用
        prodInspectionType, // 商检
        provideInvoiceType, // 发票月份
        qualityStandard, // 质量标准
        remarks, // 合同要素备注
        settlementQtyType, // 结算数量
        shortOverflowRate, // 溢短装
        skuOrigin, // 货源
        skuPrice, // 单价
        skuQuantity, // 合同数量
        specifications, // 规格型号
        transportType, // 运输方式
        warehouseFreeDays, // 免仓期
        wastage, // 损耗
        deliverySiteOtherDock
    },
    data () {
        return {
            unilateralRelevance: {
                correlationOrderId: null, // 单边合同ID
                contractCode: null // 单边合同编号
            },
            contEssId: null,
            forContEssRecreate: false,
            searchForm: {
                pageNo: 1,
                pageSize: 10,
                productId: null,
                buyerCompanyName: null,
                sellerCompanyName: null,
                bizType: null // 1销售订单 2采购订单
            },
            deliverContractAssembleVisible: false, // 上传合同单凭证
            totalDelivery: null,
            purchaseContractList: [],
            isShowUnilateralDialog: false,
            deliveryContractList: [], // 销售交割-采购合同List
            businessManager: [ // 业务操作人
                // {
                //     username: null,
                //     id: null
                // }
            ],
            businessManagerGroup: [ // 业务操作人所属组
                // {
                //     usrOrganizationId: null, // 组织Id
                //     orgName: null // 组织名称
                // }
            ],
            isSellerCh: false,
            isBuyerCh: false,
            data: {
                id: null, // 合同要素ID
                bizType: null, // 业务类型
                businessManagerId: null, // 业务操作人ID
                businessManagerName: null, // 业务操作人
                usrOrganizationName: null, // 业务操作人所在组
                organizationId: null, // 业务操作人所在组ID
                contractType: 1, // 单边交易（ 合同类型）（默认为双边交易）
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
                    skuPriceType: 1, // 固定价
                    skuPrice: null, // 单价
                    skuPriceExpression: null, // 单价
                    depositType: null, //  保证金类型
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
                    skuPriceType: 1, // 固定价
                    skuPriceExpression: null, // 单价
                    skuPrice: null, // 单价
                    depositType: null, //  保证金类型
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
            goodsList: [], // 可交易商品列表 goodsName:商品名称 goodsCode:商品code goodsId:商品id
            dialogVisible: false, // 查询上游公司列表
            dialogVisibles: false, // 查询下游公司列表
            sellCompanyList: [], // sellerCorpId:企业ID  sellerCorpName:企业名称 address:地址
            buyCompanyList: [], //  buyerCorpId:企业ID  buyerCorpName:企业名称  address:地址
            relatedCompany: [], //  targetCorpId:我方公司ID  targetCorpName:我方公司名称
            companyName: null,
            activeContractType: null, // 表示当前处理的是上游采购:2, 还是下游销售:3
            activeIndex: null, // 选择交易公司时的索引
            activeProductId: null, // 当前选择的产品ID
            targetCorpIdIdx: null, // 我方公司选择时的索引
            businessManagerIdx: null, // 业务操作人选择时的索引
            srOrganizationIdx: null, // 业务组选择时的索引
            Verification: [
                {
                    name: 'bizType',
                    msg: '请先选择业务类型'
                },
                {
                    name: 'businessManagerId',
                    msg: '请先选择业务操作人'
                },
                {
                    name: 'organizationId',
                    msg: '请先选择业务组'
                }
            ],
            obj: {},
            upstreamTerm: null, // 判断长约处理字段
            showDvlyQtyCol: false, // (选择关联合同时)是否展示交割数量的相关列
            sellerCheck: false, // 限制上游按钮的显示
            buyerCheck: false, // 限制下游按钮的显示
            upstreamCmptList: [], // 上游组件定义列表(只用于画面展示)
            downstreamCmptList: [], // 下游组件定义列表(只用于画面展示)
            upstreamPropList: [], // 上游组件定义列表(全部)
            downstreamPropList: [], // 下游组件定义列表(全部)
            isTargetChange: false,
            needRefresh: 0
        };
    },
    mounted () {
        this.data.businessManagerId = JSON.parse(localStorage.getItem('userInfo')).id;
        this.getRelatedCompany();
        this.getBizUserList();
        this.contEssId = this.$route.query.id;
        if (this.contEssId !== null && this.contEssId !== undefined) {
            this.getdetailOrder();
        }
    },
    methods: {
        // 删除单边已选择的
        delectSeachContract () {
            this.unilateralRelevance.contractCode = null;
            this.deliveryContractList = [];
        },
        getdetailOrder () { // 合同要素详情
            let that = this;
            that.$http.get(this.$api.order.orderDetail + '/' + that.contEssId).then(function (res) {
                if (res.data.code === 0) {
                    // 去结果画面
                    that.data = res.data.data;
                    that.targetCorpIdIdx = that.data.targetCorpName; // 我方公司
                    that.activeProductId = that.data.productId; // 产品ID
                    // 上游
                    if (that.data.upstreamInfo) {
                        that.data.upstreamInfo.companyName = that.data.upstreamInfo.sellerCompanyName; // 上游公司
                        that.data.upstreamInfo.companyId = that.data.upstreamInfo.sellerCompanyId; // 上游公司
                        that.data.upstreamInfo.prdSkuId = that.data.productId;
                    }
                    // 下游
                    if (that.data.downstreamInfo) {
                        that.data.downstreamInfo.companyName = that.data.downstreamInfo.buyerCompanyName; // 上游公司
                        that.data.downstreamInfo.companyId = that.data.downstreamInfo.buyerCompanyId; // 上游公司
                        that.data.downstreamInfo.prdSkuId = that.data.productId;
                    }
                    that.companyName = null;
                    that.activeContractType = 0;
                    // 根据业务类型获取可交易的买卖方公司
                    that.forContEssRecreate = true;
                    that.getCompanyByBizType(true);

                    // 如果是从驳回时"重新创建"而来，而本身又是修改合同要素的，删除修改信息
                    if (that.data.sourceContEssId || that.data.modifyFieldInfo) {
                        that.data.sourceContEssId = null;
                        that.data.modifyFieldInfo = null;
                    }

                    // 查询可交易商品
                    let params = {
                        bizType: that.data.bizType, // 业务类型
                        userId: that.data.businessManagerId
                    };
                    that.$http.post(that.$api.contract.getCompany, params).then(res => {
                        that.goodsList = res.data.data.goodsList;
                    }).catch((e) => {
                        console.log(e);
                    });
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 查看单边合同的附件
        deliverContractAssembleVisibleClick () {
            this.$refs.contFileView.open(this.deliveryContractList);
        },
        // 单边交易选择框的状态变化
        onUnilateral (val) {
            // 清空单边合同的数据(已有值的话)
            this.deliveryContractList = [];
            this.unilateralRelevance.contractCode = null;
        },
        // 弹出选择单边合同的对话框
        onSeachContract (vals) {
            this.upstreamTerm = 0;
            // 这里要区分单边还是双边合同
            if (vals === '单边') {
                if (this.data.contractType === 2) {
                    // 采购
                    this.upstreamTerm = 2; // 匹配查询单边销售合同
                } else if (this.data.contractType === 3) {
                    // 销售
                    this.upstreamTerm = 1; // 匹配查询单边采购合同
                }
            } else {
                // 这里肯定是长约
                if (vals === '上游') {
                    // 上游
                    this.upstreamTerm = 3; // 匹配查询长约采购合同
                } else if (vals === '下游') {
                    // 下游
                    this.upstreamTerm = 4; // 匹配查询长约销售合同
                }
            }
            this.isShowUnilateralDialog = true;
            this.purchaseContract(vals);
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
            // 这里要区分单边还是双边合同
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
                if (this.data.contractType === 2) {
                    // 采购
                    if (this.activeProductId == null || this.activeProductId === undefined) {
                        this.$message.error('请先选择产品后再查询单边合同');
                        this.isShowUnilateralDialog = false;
                        return false;
                    }

                    this.searchForm.bizType = 1;
                    this.searchForm.unilateralCorrelation = 1;
                    this.searchForm.productId = this.activeProductId;
                    this.searchForm.skuQuantity = Number(this.data.upstreamInfo.skuQuantity);
                } else if (this.data.contractType === 3) {
                    // 销售
                    if (this.activeProductId == null || this.activeProductId === undefined) {
                        this.$message.error('请先选择产品后再查询单边合同');
                        this.isShowUnilateralDialog = false;
                        return false;
                    }

                    this.searchForm.bizType = 2;
                    this.searchForm.unilateralCorrelation = 1;
                    this.searchForm.productId = this.activeProductId;
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
                    this.searchForm.bizType = 2;
                    if (this.activeProductId == null || this.activeProductId === undefined) {
                        this.$message.error('请先选择产品后再查询长约合同');
                        this.isShowUnilateralDialog = false;
                        return false;
                    }

                    this.searchForm.productId = this.activeProductId;
                    this.searchForm.skuQuantity = this.data.upstreamInfo.skuQuantity;
                    this.searchForm.sellerCompanyName = this.data.upstreamInfo.companyName;
                    // 再根据业务类型做判断(长约)
                    if (this.data.bizType === 6) {
                        this.searchForm.longtermContractFlag = 1;
                    }
                } else if (vals === '下游') {
                    // 下游
                    this.searchForm.bizType = 1;
                    if (this.activeProductId == null || this.activeProductId === undefined) {
                        this.$message.error('请先选择产品后再查询长约合同');
                        this.isShowUnilateralDialog = false;
                        return false;
                    }

                    this.searchForm.productId = this.activeProductId;
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
            // 这里要区分单边关联还是长约查询
            if (this.upstreamTerm === 3) { // 上游长约
                this.data.upstreamInfo.contractCode = this.obj.contractCode;
                this.data.upstreamInfo.longtermContractOrderId = this.obj.orderId;
                this.isShowUnilateralDialog = false;
                this.needRefresh += 1;
            } else if (this.upstreamTerm === 4) { // 下游长约
                this.data.downstreamInfo.contractCode = this.obj.contractCode;
                this.data.downstreamInfo.longtermContractOrderId = this.obj.orderId;
                this.isShowUnilateralDialog = false;
                this.needRefresh += 1;
            } else {
                this.unilateralRelevance.contractCode = this.obj.contractCode;
                this.unilateralRelevance.correlationOrderId = this.obj.orderId;
                this.isShowUnilateralDialog = false;
                this.deliveryContractClick(this.obj.orderId);
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
            let that = this;
            that.data.businessManagerName = that.businessManager[that.businessManagerIdx].userName;
            that.data.businessManagerId = that.businessManager[that.businessManagerIdx].usrUserId;
            that.getUserOrganization();
            // 查询可交易商品
            if (that.data.bizType) {
                that.onchangeBizType();
            }
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
            this.data.organizationId = this.businessManagerGroup[this.srOrganizationIdx].usrOrganizationId;
            this.data.usrOrganizationName = this.businessManagerGroup[this.srOrganizationIdx].orgName;
        },
        // 选择交易公司
        checkCompany (type) {
            if (this.data.bizType === null || this.data.bizType === undefined || this.data.bizType === '') {
                this.$message.error('请先选择业务类型');
                return;
            }
            if (this.activeProductId == null || this.activeProductId === undefined) {
                this.$message.error('请先选择产品');
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
        // 切换/选择业务类型
        onchangeBizType () {
            let that = this;
            // 清空商品列表及选择
            that.activeProductId = null;
            that.goodsList = [];
            // 清空交易公司列表及选择
            that.sellCompanyList = [];
            that.buyCompanyList = [];

            if (that.data.upstreamInfo) {
                that.data.upstreamInfo.companyId = null;
                that.data.upstreamInfo.companyName = null;
                that.data.upstreamInfo.sellerCompanyName = null;
                that.data.upstreamInfo.sellerCompanyId = null;
                that.data.upstreamInfo.prdSkuId = null;
                that.data.upstreamInfo.skuCode = null;
                that.data.upstreamInfo.prodName = null;
                that.data.upstreamInfo.grade = null;
            }
            if (that.data.downstreamInfo) {
                that.data.downstreamInfo.companyId = null;
                that.data.downstreamInfo.companyName = null;
                that.data.downstreamInfo.buyerCompanyName = null;
                that.data.downstreamInfo.buyerCompanyId = null;
                that.data.downstreamInfo.prdSkuId = null;
                that.data.downstreamInfo.skuCode = null;
                that.data.downstreamInfo.prodName = null;
                that.data.downstreamInfo.grade = null;
            }

            // 查询可交易商品
            let params = {
                bizType: that.data.bizType, // 业务类型
                userId: that.data.businessManagerId
            };
            that.$http.post(that.$api.contract.getCompany, params).then(res => {
                that.goodsList = res.data.data.goodsList;
            }).catch((e) => {
                console.log(e);
            });
        },
        // 根据业务类型获取可交易的买卖方公司
        getCompanyByBizType (forContEssRecreate) {
            let that = this;
            let params = {
                bizType: that.data.bizType // 业务类型
            };
            if (this.activeProductId) {
                params.productId = this.activeProductId;
            }
            if (this.activeContractType === 3) {
                // 下游
                params.buyerCorpName = this.companyName;
            }
            if (this.activeContractType === 2) {
                // 上游
                params.sellerCorpName = this.companyName;
            }
            if (that.data.upstreamInfo) {
                that.data.upstreamInfo.bizType = that.data.bizType;
            }
            if (that.data.downstreamInfo) {
                that.data.downstreamInfo.bizType = that.data.bizType;
            }
            that.$http.post(that.$api.contract.getCompany, params).then(res => {
                that.sellCompanyList = res.data.data.sellerCorpList;
                that.buyCompanyList = res.data.data.buyerCorpList;

                if (forContEssRecreate) {
                    let actContType = 0;
                    if (that.data.contractType === 1 || that.data.contractType === 2) {
                        actContType = 2;
                    } else {
                        actContType = 3;
                    }
                    that.onchangeProduct(actContType, 0, forContEssRecreate);
                } else {
                    // 正常创建合同要素时，清空产品选择
                    if (that.data.productId && !that.goodsList.find((e) => (e.goodsId === that.data.productId))) {
                        that.activeProductId = null;
                        if (that.data.upstreamInfo) {
                            that.data.upstreamInfo.prdSkuId = null;
                        }
                        if (that.data.downstreamInfo) {
                            that.data.downstreamInfo.prdSkuId = null;
                        }
                    }
                }
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
        checktargetCorpbuy () {
            this.isTargetChange = true;
            if (this.data.upstreamInfo) {
                // 上游订单
                this.data.upstreamInfo.targetCorpName = this.relatedCompany[this.targetCorpIdIdx].targetCorpName;
                this.data.upstreamInfo.targetCorpId = this.relatedCompany[this.targetCorpIdIdx].targetCorpId;
            }
            if (this.data.downstreamInfo) {
                // 下游订单
                this.data.downstreamInfo.targetCorpName = this.relatedCompany[this.targetCorpIdIdx].targetCorpName;
                this.data.downstreamInfo.targetCorpId = this.relatedCompany[this.targetCorpIdIdx].targetCorpId;
            }
        },
        // 根据所选产品获取交割库(产品切换), 要防止在切换商品时无限循环
        onchangeProduct (type, isDuplicateCopy, forContEssRecreate) {
            // 切换商品时必须要验证上下游交易公司是否都已准入可交易该商品
            let that = this;
            if (that.data.upstreamInfo) {
                that.data.upstreamInfo.bizType = that.data.bizType;
            }
            if (that.data.downstreamInfo) {
                that.data.downstreamInfo.bizType = that.data.bizType;
            }
            // 保存基本信息(非商品相关)
            let orderInfo4change = {};
            if (type === 2) {
                // 上游
                let goodsObj = that.goodsList.find((e) => (e.goodsId === that.activeProductId));
                if (goodsObj) {
                    that.data.upstreamInfo.prdSkuId = goodsObj.goodsId;
                    that.data.upstreamInfo.skuCode = goodsObj.goodsCode;
                    that.data.upstreamInfo.prodName = goodsObj.goodsName;
                }
                if (!forContEssRecreate) {
                    orderInfo4change.targetCorpId = that.data.upstreamInfo.targetCorpId;
                    orderInfo4change.targetCorpName = that.data.upstreamInfo.targetCorpName;
                    orderInfo4change.skuPriceType = 1;
                    orderInfo4change.prdSkuId = that.data.upstreamInfo.prdSkuId;
                    orderInfo4change.skuCode = that.data.upstreamInfo.skuCode;
                    orderInfo4change.prodName = that.data.upstreamInfo.prodName;
                    orderInfo4change.bizType = that.data.upstreamInfo.bizType;
                }
                // 查询指定交易商品包含的属性组件定义
                let param = {
                    productId: that.data.upstreamInfo.prdSkuId,
                    contractType: 2
                };
                that.$http.post(that.$api.contract.getProdPropCompList, param).then(res => {
                    if (res.data.code === 0) {
                        that.upstreamPropList = res.data.data;
                        that.upstreamCmptList = that.upstreamPropList.filter(item => item.displayOrder > 0);
                        // 重置所有已输入的值
                        if (!forContEssRecreate) {
                            that.data.upstreamInfo = {};
                            Object.assign(that.data.upstreamInfo, orderInfo4change);
                        }
                    } else {
                        that.$message.error(res.data.message);
                    }
                }).catch((e) => {
                    console.log(e);
                });
                if (that.data.contractType === 1 && isDuplicateCopy === 0) {
                    // 双边合同时同步切换下游销售的商品
                    that.onchangeProduct(3, 1, forContEssRecreate);
                }
            }
            if (type === 3) {
                // 下游
                for (var index in that.goodsList) {
                    if (that.goodsList[index].goodsId === that.activeProductId) {
                        that.data.downstreamInfo.prdSkuId = that.goodsList[index].goodsId;
                        that.data.downstreamInfo.skuCode = that.goodsList[index].goodsCode;
                        that.data.downstreamInfo.prodName = that.goodsList[index].goodsName;
                        break;
                    }
                }

                if (!forContEssRecreate) {
                    orderInfo4change.targetCorpId = that.data.downstreamInfo.targetCorpId;
                    orderInfo4change.targetCorpName = that.data.downstreamInfo.targetCorpName;
                    orderInfo4change.skuPriceType = 1;
                    orderInfo4change.prdSkuId = that.data.downstreamInfo.prdSkuId;
                    orderInfo4change.skuCode = that.data.downstreamInfo.skuCode;
                    orderInfo4change.prodName = that.data.downstreamInfo.prodName;
                    orderInfo4change.bizType = that.data.downstreamInfo.bizType;
                }

                // 查询指定交易商品包含的属性组件定义
                let param = {
                    productId: that.data.downstreamInfo.prdSkuId,
                    contractType: 3
                };
                that.$http.post(that.$api.contract.getProdPropCompList, param).then(res => {
                    if (res.data.code === 0) {
                        that.downstreamPropList = res.data.data;
                        that.downstreamCmptList = that.downstreamPropList.filter(item => item.displayOrder > 0);
                        // 重置所有已输入的值
                        if (!forContEssRecreate) {
                            that.data.downstreamInfo = {};
                            Object.assign(that.data.downstreamInfo, orderInfo4change);
                        }
                    } else {
                        that.$message.error(res.data.message);
                    }
                }).catch((e) => {
                    console.log(e);
                });
                if (that.data.contractType === 1 && isDuplicateCopy === 0) {
                    // 双边合同时同步切换上游采购的商品
                    that.onchangeProduct(2, 1, forContEssRecreate);
                }
            }
        },
        // 获取业务组
        getUserOrganization () {
            let that = this;
            this.$http.get(this.$api.contract.getUserOrganization + '?userId=' + this.data.businessManagerId).then(res => {
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
        getBizUserList () {
            let that = this;
            let params = {
                organizationId: this.data.organizationId,
                pageNum: 0 // 表示不分页
            };
            this.$http.post(this.$api.contract.getGrade, params).then(res => {
                if (res.data.code === 0) {
                    that.businessManager = res.data.data.rows;
                    Object.keys(res.data.data.rows).forEach((e) => {
                        if (res.data.data.rows[e].usrUserId === that.data.businessManagerId) {
                            that.businessManagerIdx = e * 1;
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
        // 交易公司选中（提交后由后台验证选中公司是否可交易指定产品）
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
            if (!that.testForm(that.Verification, 1)) {
                return false;
            }
            if (this.data.upstreamInfo && this.targetCorpIdIdx != null) {
                !this.isTargetChange && (this.data.upstreamInfo.targetCorpId = this.data.targetCorpId) && (this.data.upstreamInfo.targetCorpName = this.data.targetCorpName);
            }
            if (this.data.downstreamInfo && this.targetCorpIdIdx != null) {
                !this.isTargetChange && (this.data.downstreamInfo.targetCorpId = this.data.targetCorpId) && (this.data.downstreamInfo.targetCorpName = this.data.targetCorpName);
            }
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
            }

            if (that.deliveryContractList == null || that.deliveryContractList === undefined || that.deliveryContractList.length === 0) {
                that.unilateralRelevance.isUnilateralCorrelation = false;
            } else {
                that.unilateralRelevance.isUnilateralCorrelation = true;
            }
            if (that.unilateralRelevance.contractCode && !that.unilateralRelevance.isUnilateralCorrelation) {
                that.$message({
                    message: '已选择的单边合同无合同附件！',
                    type: 'error'
                });
                return false;
            }
            if (that.$route.query.todoId !== null && that.$route.query.todoId !== undefined) {
                that.data.todoId = that.$route.query.todoId;
            }
            Object.assign(that.data, that.unilateralRelevance);
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
        },
        // 表单验证
        testForm (type, e) {
            let that = this;
            let list = e === 1 ? that.data : e === 3 ? that.data.downstreamInfo : that.data.upstreamInfo;
            for (let i = 0; i < type.length; i++) {
                if (list[type[i].name] === null || list[type[i].name] === '') {
                    that.$message({
                        message: type[i].msg,
                        type: 'error'
                    });
                    return false;
                }
            }
            return true;
        }
    }
};
</script>

<style lang="scss" scoped>
  .add-contract {
    padding: 20px 0 30px 0;
  }
  .lc-select {
      width: 30%;
      margin-right: 20px;
  }
  .buyConfirmation{
      background-color: #666!important;
      border: 1px solid #666;
  }
  .sellConfirmation{
      background-color: #666!important;
      border: 1px solid #666;
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

  .dialog-table {
    max-height: 500px;
    overflow: auto;
    clear: both;
  }

  .cont-ess-zbyd {
    display: flex;
    .q {
      flex: 0 0 20px;
    }
    .w {
      flex: 1;
    }
    .e {
      flex: 0 0 30px;
    }
    .r {
      flex: 0 0 20px;
    }
    .t {
      flex: 1;
    }
    .y {
      flex: 0 0 10px;
    }
    .u {
      flex: 0 0 20px;
    }
  }

  .sell-company {
    .essential-item:nth-child(1) {
      .essential-text {
        margin-right: 0;
      }
    }
  }

  .ll {
    padding: 8px 30px 8px 119px;
  }

  /deep/ .el-radio__input.is-checked + .el-radio__label {
    color: #666;
  }
</style>
<style lang="scss">
  .add-contract {
    .el-dialog__header {
      .el-dialog__headerbtn {
        top: 10px;
        right: 16px;
      }
    }
    .spanBlock {
        display: inline-block;
        height: 30px;
        line-height: 30px;
    }
    .input-number {
        height: 30px;
        line-height: 30px;
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

.add-contract {
    .essential-row {
        .essential-item {
        .essential-title {
            flex: 0 0 110px;
            line-height: 30px;
            padding: 0px 10px 0px 10px !important;
        }
        }
    }
}
</style>
