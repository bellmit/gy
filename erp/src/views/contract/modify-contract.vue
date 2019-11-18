<template>
    <!-- 合同要素修改 -->
    <div class="paydetail-wrapper modify-contract">
        <!-- 基本信息 -->
        <div class="essential-information">
            <p class="paydetail-title">基本信息</p>
            <div class="essential-wrapper essential-row-float">
                <div class="essential-item">
                    <div class="essential-title">合同要素ID</div>
                    <div class="essential-text">{{data.id}}</div>
                </div>
                <div class="essential-item">
                    <div class="essential-title">执行操作人</div>
                    <div class="essential-text">{{data.executiveName}}</div>
                </div>
                <div class="essential-item">
                    <div class="essential-title">业务类型</div>
                    <div class="essential-text">{{data.bizType | bizType}}
                    </div>
                </div>
                <div class="essential-item">
                    <div class="essential-title">我方公司</div>
                    <div class="essential-text">{{data.targetCorpName}}
                    </div>
                </div>
                <div class="essential-item">
                    <div class="essential-title">产品名称</div>
                    <div class="essential-text">{{data.prodName}}
                    </div>
                </div>
                <div class="essential-item">
                    <div class="essential-title">交易类型</div>
                    <div class="essential-text">{{data.transactionType | contractTransactionTypeList}}</div>
                </div>
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
        <!-- 主信息 -->
        <div class="pay-wrapper">
            <div v-if="!(data.contractType === 3)" class="essential-information">
                <p class="paydetail-title">采购信息</p>
                <div class="essential-wrapper" style="padding-bottom:10px">
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>上游公司</div>
                            <div class="essential-text">
                                <!-- companyName -->
                                <input type="text" placeholder="请选择上游公司" v-model="data.upstreamInfo.sellerCompanyName"
                                       @click="checkCompany(2)">
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
                    <component v-for="(item, index) in upstreamCmptList" :key="index" :is="item.propKey" :comp-data="item" :order-data="data.upstreamInfo"></component>
                    <div class="essential-row" v-if="data.bizType === 6">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust"></span>上游合约</div>
                            <div class="essential-text" style="flex-direction: column">
                                <div class="essential-text" style="margin-right: 0">
                                    <div class="d">
                                        <input type="text" placeholder="请选择上游合约编号" v-model="data.upstreamInfo.contractCode">
                                        <i class="iconfont icon-search" @click="onSeachContract('上游')"
                                           style="position: absolute;right: 5px;top: 3px;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                        <div class="essential-title">纸质合同号</div>
                        <div class="essential-text">
                            <input type="text" v-model="data.upstreamInfo.planNumber" placeholder="请输入纸质合同号"/>
                        </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>选择合同模板</div>
                            <div class="essential-text">
                                <el-select v-model="data.buyContTmplId" placeholder="请选择">
                                    <el-option v-for="item in ContractTemplate1" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row" v-if="data.buyContTmplId === 'upload'">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>上传采购合同</div>
                            <div class="essential-text">
                                <gy-file-upload ref="pFileUpload" @callbackFileUpload="onCallbackBuyFileUpload"></gy-file-upload>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!(data.contractType === 2)" class="essential-information">
                <p class="paydetail-title">销售信息</p>
                <div class="essential-wrapper" style="padding-bottom:10px">
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>下游公司</div>
                            <div class="essential-text">
                                <input type="text" placeholder="请选择下游公司" v-model="data.downstreamInfo.buyerCompanyName" @click="checkCompany(3)">
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
                    <component v-for="(item, index) in downstreamCmptList" :key="index" :is="item.propKey" :comp-data="item" :order-data="data.downstreamInfo"></component>
                    <div class="essential-row" v-if="data.bizType === 6">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust"></span>下游合约</div>
                            <div class="essential-text" style="flex-direction: column">
                                <div class="essential-text" style="margin-right: 0">
                                    <div class="d">
                                        <input type="text" placeholder="请选择下游合约编号" v-model="data.downstreamInfo.contractCode">
                                        <i class="iconfont icon-search" @click="onSeachContract('下游')"
                                           style="position: absolute;right: 5px;top: 3px;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                        <div class="essential-title">纸质合同号</div>
                        <div class="essential-text">
                            <input type="text" v-model="data.downstreamInfo.planNumber" placeholder="请输入纸质合同号"/>
                        </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>选择合同模板</div>
                            <div class="essential-text">
                                <el-select v-model="data.saleContTmplId" placeholder="请选择">
                                    <el-option v-for="item in ContractTemplate" :key="item.id" :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row" v-if="data.saleContTmplId === 'upload'">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>上传销售合同</div>
                            <div class="essential-text">
                                <gy-file-upload ref="pFileUpload" @callbackFileUpload="onCallbackSaleFileUpload"></gy-file-upload>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">下游统计口径</div>
                            <div class="essential-text">{{data.downstreamInfo.statisticalCaliber}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot">
            <button class="gy-button-normal" @click="open">返回</button>
            <button type="button" class="gy-button-extra confirmations" @click="onsubmit">提交</button>
        </div>
        <!-- 上下游合约 -->
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
        <el-dialog v-if="dialogVisible" width="800px" class="addDialog"
            title="上游公司列表"
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
            <div class="dialog-table min-height-table">
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
                <button class="gy-button-extra confirmations" :class="{sellConfirmation:sellerCheck}" :disabled='sellerCheck' @click="checkSales()" style="margin-left: 8px">选择</button>
            </span>
        </el-dialog>
        <el-dialog v-if="dialogVisibles" width="800px" class="addDialog"
            title="下游公司列表"
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
            <div class="dialog-table min-height-table">
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
                <button class="gy-button-extra confirmations" :class="{buyConfirmation:buyerCheck}" :disabled='buyerCheck' @click="checkSales()" style="margin-left: 8px">选择</button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Bus from '@/config/bus.js';
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
    data () {
        return {
            companyName: null,
            dialogVisible: false,
            dialogVisibles: false,
            upstreamTerm: null, // 判断长约处理字段
            showDvlyQtyCol: false, // (选择关联合同时)是否展示交割数量的相关列
            sellerCheck: false, // 限制上游按钮的显示
            buyerCheck: false, // 限制下游按钮的显示
            totalDelivery: null,
            isShowUnilateralDialog: false,
            activeIndex: null,
            buyCompanyList: [],
            sellCompanyList: [],
            contractType: '3',
            contEssId: null,
            purchaseContractList: [],
            searchForm: {
                pageNo: 1,
                pageSize: 10,
                productId: null,
                buyerCompanyName: null,
                sellerCompanyName: null,
                bizType: null // 1销售订单 2采购订单
            },
            obj: {},
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
            relatedCompany: [],
            proType: [],
            prdProductId: null,
            data: {
                id: null,
                isOnline: 1,
                sourceContEssId: null, // 源合同id
                lastContEssId: null, // 最后一次修改的id
                bizType: null, // 业务类型
                businessManagerId: null, // 业务操作人ID
                businessManagerName: null, // 业务操作人
                usrOrganizationId: null, // 业务操作人所在组ID
                contractType: 1, // 单边交易（ 合同类型）（默认为双边交易）
                prodName: null,
                buyContTmplId: null, // 采购合同模板ID
                saleContTmplId: null, // 销售合同模板ID
                purchaseFileAttachList: [],
                saleFileAttachList: [],
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
                    grade: null,
                    statisticalCaliber: null,
                    priceOfWeight: null, // 撮合单价
                    chattingCompanyName: null, // 撮合公司
                    chattingAmount: 0 // 撮合总费用
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
                    grade: null,
                    statisticalCaliber: null, // 统计口径
                    priceOfWeight: null, // 撮合单价
                    chattingCompanyName: null, // 撮合公司
                    chattingAmount: 0 // 撮合总费用
                }
            },
            oldData: {},
            sellDeliveryBank: [],
            buyDeliveryBank: [],
            activeCompanyType: null,
            buyContImg: [], // 采购文件
            saleContImg: [], // 销售文件
            sellerInfoProd: null,
            buyerInfoProd: null,
            newArr: [],
            upstreamCmptList: [], // 上游组件定义列表(只用于画面展示)
            downstreamCmptList: [], // 下游组件定义列表(只用于画面展示)
            upstreamPropList: [], // 上游组件定义列表(全部)
            downstreamPropList: [], // 下游组件定义列表(全部)
            modifyFieldInfo: {},
            activeContractType: null // 表示当前处理的是上游采购:2, 还是下游销售:3
        };
    },
    created () {
        this.baseFunc();
    },
    components: {
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
    methods: {
        baseFunc () {
            this.getdetailOrder();
            this.getRelatedCompany();
        },
        // 打开返回弹窗
        open () {
            this.$confirm('返回将不保存修改的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.go(-1);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        getdetailOrder () {
            this.$http.get(this.$api.order.orderDetail + '/' + this.$route.query.id).then(res => {
                if (res.data.code === 0) {
                    this.data = res.data.data;
                    this.data.usrOrganizationId = this.data.organizationId;
                    this.data.sourceContEssId = this.$route.query.id;
                    this.data.lastContEssId = res.data.data.lastContEssId || res.data.data.id;

                    // 上游
                    if (this.data.upstreamInfo) {
                        this.data.upstreamInfo.companyName = this.data.upstreamInfo.sellerCompanyName;
                        this.data.upstreamInfo.companyId = this.data.upstreamInfo.sellerCompanyId;
                        this.data.upstreamInfo.prdSkuId = this.data.productId;
                        this.data.upstreamInfo.targetCorpName = this.data.targetCorpName;
                        this.data.upstreamInfo.targetCorpId = this.data.targetCorpId;
                        this.gitPropType(2);
                    }
                    // 下游
                    if (this.data.downstreamInfo) {
                        this.data.downstreamInfo.companyName = this.data.downstreamInfo.buyerCompanyName;
                        this.data.downstreamInfo.companyId = this.data.downstreamInfo.buyerCompanyId;
                        this.data.downstreamInfo.prdSkuId = this.data.productId;
                        this.data.downstreamInfo.targetCorpName = this.data.targetCorpName;
                        this.data.downstreamInfo.targetCorpId = this.data.targetCorpId;
                        this.gitPropType(3);
                    }
                    this.companyName = null;
                    this.activeContractType = 0;
                    // 根据业务类型获取可交易的买卖方公司
                    this.forContEssRecreate = true;
                    // 深拷贝
                    this.oldData = JSON.parse(JSON.stringify(this.data));
                    this.getCompanyByBizType(true);
                    return false;
                }
                this.$alert(res.data.code + ' ' + res.data.message);
            });
        },
        gitPropType (contractType) {
            let params = {
                productId: this.data.productId,
                contractType: contractType
            };
            this.$http.post(this.$api.contract.getProdPropCompList, params).then(res => {
                if (res.data.code === 0) {
                    if (contractType === 2) {
                        this.upstreamPropList = res.data.data;
                        this.upstreamCmptList = this.upstreamPropList.filter(item => item.displayOrder > 0);
                    }
                    if (contractType === 3) {
                        this.downstreamPropList = res.data.data;
                        this.downstreamCmptList = this.downstreamPropList.filter(item => item.displayOrder > 0);
                    }
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 获取买卖方公司
        getCompanyByBizType (forContEssRecreate) {
            let params = {
                productId: this.data.productId,
                bizType: this.data.bizType // 业务类型
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
            this.$http.get(this.$api.contract.getRelatedCompany).then((res) => {
                res.data.code === 0 && (this.relatedCompany = res.data.data.targetCorpList);
            });
        },
        // 选择上游公司或者下游公司
        checkCompany (type) {
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
        // 获取交易对手评级
        getCompanyGrade (activeContractType, companyId, errMsg) {
            this.$http.post(this.$api.contract.getCompanyGrade, {productId: companyId}).then(res => {
                if (activeContractType === 2) {
                    this.data.upstreamInfo.grade = res.data.data.grade;
                    this.sellerCheck = false;
                    if (this.data.upstreamInfo.grade === '未评级') {
                        this.sellerCheck = true;
                        this.$message({message: errMsg, type: 'warning'});
                    }
                } else if (activeContractType === 3) {
                    this.data.downstreamInfo.grade = res.data.data.grade;
                    this.buyerCheck = false;
                    if (this.data.downstreamInfo.grade === '未评级') {
                        this.buyerCheck = true;
                        this.$message({message: errMsg, type: 'warning'});
                        return false;
                    }
                }
            });
        },
        // 公司选中
        checkSales () {
            if (this.activeIndex === null) {
                this.$message({
                    message: '请先选择公司',
                    type: 'error'
                });
                return;
            }
            if (this.activeContractType === 3) {
                this.dialogVisibles = false;
                this.data.downstreamInfo.companyName = this.buyCompanyList[this.activeIndex].buyerCorpName;
                this.data.downstreamInfo.companyId = this.buyCompanyList[this.activeIndex].buyerCorpId;
                this.data.downstreamInfo.buyerCompanyName = this.buyCompanyList[this.activeIndex].buyerCorpName;
                this.data.downstreamInfo.buyerCompanyId = this.buyCompanyList[this.activeIndex].buyerCorpId;
            } else {
                this.dialogVisible = false;
                this.data.upstreamInfo.companyName = this.sellCompanyList[this.activeIndex].sellerCorpName;
                this.data.upstreamInfo.companyId = this.sellCompanyList[this.activeIndex].sellerCorpId;
                this.data.upstreamInfo.sellerCompanyName = this.sellCompanyList[this.activeIndex].sellerCorpName;
                this.data.upstreamInfo.sellerCompanyId = this.sellCompanyList[this.activeIndex].sellerCorpId;
            }
        },
        // 弹出选择单边合同的对话框
        onSeachContract (val) {
            this.isShowUnilateralDialog = true;
            this.purchaseContract(val);
        },
        // 获取单边合同列表
        purchaseContract (vals, isPageFlip) {
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
        // 确认选择单边关联的合同
        crossSubmission () {
            // 这里要区分单边关联还是长约查询
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
        // 图片上传的回调-采购合同
        onCallbackBuyFileUpload (fileList) {
            this.buyContImg = [];
            fileList.forEach((e) => {
                this.buyContImg.push(e.fileUrl);
            });
            this.data.purchaseFileAttachList = this.buyContImg;
        },
        // 图片上传的回调-销售合同
        onCallbackSaleFileUpload (fileList) {
            this.saleContImg = [];
            fileList.forEach((e) => {
                this.saleContImg.push(e.fileUrl);
            });
            // 暂时注释
            this.data.saleFileAttachList = this.saleContImg;
        },
        // 修改后提交
        onsubmit () {
            let that = this;
            // contractType 1单边  2上游  3下游
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
                if (!that.data.buyContTmplId) {
                    that.$message({
                        message: '请选择合同模板！(上游)',
                        type: 'error'
                    });
                    return false;
                }
                if (that.data.buyContTmplId === 'upload' && !that.data.purchaseFileAttachList) {
                    that.$message({
                        message: '请上传采购合同',
                        type: 'error'
                    });
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
                // 指定日期情况下 付款日期必填
                if (that.data.downstreamInfo.paymentType === 4) {
                    if (!that.data.downstreamInfo.paymentDateFlag || !that.data.downstreamInfo.paymentBeginDate) {
                        that.$message.error('指定日期情况下，付款日期必填(下游)');
                        return;
                    }
                }
                if (!that.data.saleContTmplId) {
                    that.$message({
                        message: '请选择合同模板！(下游)',
                        type: 'error'
                    });
                    return false;
                }
                if (that.data.saleContTmplId === 'upload' && !that.data.saleFileAttachList) {
                    that.$message({
                        message: '请上传销售合同',
                        type: 'error'
                    });
                    return false;
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
            that.data.id = null;
            that.data['commitType'] = 1; // 标识 是修改操作
            that.data.buyContTmplId = that.data.buyContTmplId === 'upload' ? null : that.data.buyContTmplId; // 采购合同模板ID
            that.data.saleContTmplId = that.data.saleContTmplId === 'upload' ? null : that.data.saleContTmplId; // 销售合同模板ID
            if ((that.data.upstreamInfo && that.modifyFieldInfo.upstreamInfo.length === 0) &&
                (that.data.downstreamInfo && that.modifyFieldInfo.downstreamInfo.length === 0)) {
                that.$message({
                    message: '没有修改，请修改后再提交!',
                    type: 'warning'
                });
                return;
            }
            that.data['modifyFieldInfo'] = JSON.stringify(that.modifyFieldInfo);
            that.$http.post(that.$api.contract.addContract1, that.data).then((res) => {
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
  .paydetail-wrapper {
    padding: 20px 0 30px 0;
  }

  .page-bottom {
    font-size: 14px;
    line-height: 14px;
  }
    .isMust {
        color: #e0370f;
        position: absolute;
        left: 0;
        top: 0;
    }
  .contractType {
    background-color: yellow;
  }
  .essential-row-float .essential-item .essential-title {
    flex: 0 0 90px;
  }
  .min-height-table {
    height: 300px;
    overflow: scroll;
    width: 100%;
   }
   .search1 {
        position: absolute;
        right: 30px;
        bottom: 15px;
        line-height: 1;
   }
  .paydetail-wrapper {
    .essential-wrapper {
      overflow: auto;
      .gy-table {
        min-width: 700px;
      }
    }
      .paydetail-title {
          font-size: 14px;
      }
  }

  .foot {
    .gy-button-extra {
      margin-left: 8px;
    }
  }
  .button-wrap{
    text-align: right;
    padding-right: 30px;
    position: relative;
    .gy-button-extra{
      position: absolute;
      right: 30px;
      top: 3px;
    }
  }
  .buyConfirmation{
      background-color: #666!important;
      border: 1px solid #666;
  }
  .sellConfirmation{
      background-color: #666!important;
      border: 1px solid #666;
  }
</style>
<style lang="scss">
    .modify-contract {
      .el-input__inner{
          font-size: 14px;
      }
    }
    .el-dialog__header {
        .el-dialog__headerbtn {
            top: 10px;
            right: 16px;
        }
    }
.modify-contract {
    .el-radio {
        height: 30px;
        line-height: 30px;
    }
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
