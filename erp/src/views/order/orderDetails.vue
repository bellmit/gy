<template>
    <div class="orderDetails">
        <div class="tempo">
            <div class="title">基本信息</div>
        </div>
        <div class="orderDetailsTop">
            <div class="gy-form-group">
                <span class="l">合同要素ID</span>
                <span>{{orderDetailList.id}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">执行操作人</span>
                <span>{{orderDetailList.executiveName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">业务类型</span>
                <span>{{orderDetailList.bizType|businessTradeType}} <span
                        v-if="orderDetailList.contractType !== undefined" class="contractType">{{orderDetailList.contractType|contractTradeType(orderDetailList.bizType)}}</span></span>
            </div>
            <div class="gy-form-group">
                <span class="l">我方公司</span>
                <span>{{orderDetailList.targetCorpName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">产品名称</span>
                <span>{{orderDetailList.prodName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">交易类型</span>
                <span>{{orderDetailList.transactionType|contractTransactionTypeList}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">业务操作人</span>
                <span>{{orderDetailList.businessManagerName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">业务组</span>
                <span>{{orderDetailList.organizationName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">创建时间</span>
                <span>{{orderDetailList.createdDate | date(1)}}</span>
            </div>
        </div>
        <div class="orderDetailsCenter">
            <div class="orderDetailsTabs">
                <ul>
                    <li :class="{active: tabsIndex === 0}" @click="tabClick(0)">合同要素</li>
                    <li :class="{active: tabsIndex === 1}" @click="tabClick(1)">合同</li>
                    <li :class="{active: tabsIndex === 2}" @click="tabClick(2)">收付款</li>
                    <li :class="{active: tabsIndex === 3}" @click="tabClick(3)">交割</li>
                    <li :class="{active: tabsIndex === 4}" @click="tabClick(4)">发票</li>
                    <li :class="{active: tabsIndex === 5}" @click="tabClick(5)">用印申请</li>
                    <li :class="{active: tabsIndex === 6}" @click="tabClick(6)">结算</li>
                </ul>
            </div>
            <div v-if="tabsIndex === 0">
                <div class="pay-wrapper">
                    <div v-if="buyunilateralTransaction">
                        <div class="title1">采购信息</div>
                        <cont-sell :list="orderDetailList"></cont-sell>
                    </div>
                    <div v-if="saleunilateralTransaction">
                        <div class="title1">销售信息</div>
                        <cont-buy :list="orderDetailList"></cont-buy>
                    </div>
                </div>
            </div>
            <div class="orderDetailSalesPurchase" v-if="tabsIndex === 1">
                <div class="pay-wrapper">
                    <div v-if="buyunilateralTransaction">
                        <div class="title1">采购合同信息</div>
                        <div class="gy-form-group">
                            <span class="l">采购合同编号</span>
                            <span>{{orderDetailList.upstreamInfo.contractCode}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">采购合同</span>
                            <span v-if="orderDetailList.upstreamInfo.fileAttachList && orderDetailList.upstreamInfo.fileAttachList.length !== 0"
                                  @click="showImg( '', 8)"><i class="iconfont icon-photo"></i></span>
                            <span v-else-if="orderDetailList.upstreamInfo.fileDocUrl && orderDetailList.upstreamInfo.fileDocUrl.length !== 0"
                                  @click="showImg('', 9)"><i class="iconfont icon-photo"></i></span>
                            <span v-else><i class="iconfont icon-photo-null"></i></span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">创建合同备注</span>
                            <span>{{orderDetailList.buyRemark | showline}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">盖章合同</span>
                            <span v-if="orderDetailList.upstreamInfo.fileAttachCertifiedList && orderDetailList.upstreamInfo.fileAttachCertifiedList.length !== 0"
                                  @click="showImg( '', 10)"><i class="iconfont icon-photo"></i></span>
                            <span v-else><i class="iconfont icon-photo-null"></i></span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">盖章合同备注</span>
                            <div class="text-overflow">{{orderDetailList.upstreamInfo.executeRemarks || '--'}}</div>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">纸质合同号</span>
                            <span>{{orderDetailList.upstreamInfo.planNumber|showline}}</span>
                        </div>
                    </div>
                    <div v-if="saleunilateralTransaction">
                        <div class="title1">销售合同信息</div>
                        <div class="gy-form-group">
                            <span class="l">销售合同编号</span>
                            <span>{{orderDetailList.downstreamInfo.contractCode}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">销售合同</span>
                            <span v-if="orderDetailList.downstreamInfo.fileAttachList && orderDetailList.downstreamInfo.fileAttachList.length !== 0"
                                  @click="showImg( '', 11)"><i class="iconfont icon-photo"></i></span>
                            <span v-else-if="orderDetailList.downstreamInfo.fileDocUrl && orderDetailList.downstreamInfo.fileDocUrl.length !== 0"
                                  @click="showImg('', 12)"><i class="iconfont icon-photo"></i></span>
                            <span v-else><i class="iconfont icon-photo-null"></i></span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">创建合同备注</span>
                            <span>{{orderDetailList.saleRemark || '--'}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">盖章合同</span>
                            <span v-if="orderDetailList.downstreamInfo.fileAttachCertifiedList && orderDetailList.downstreamInfo.fileAttachCertifiedList.length !== 0"
                                  @click="showImg( '', 13)"><i class="iconfont icon-photo"></i></span>
                            <span v-else><i class="iconfont icon-photo-null"></i></span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">盖章合同备注</span>
                            <div class="text-overflow">{{orderDetailList.downstreamInfo.executeRemarks|| '--'}}</div>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">纸质合同号</span>
                            <span>{{orderDetailList.downstreamInfo.planNumber|showline}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">下游统计口径</span>
                            <span>{{orderDetailList.downstreamInfo.statisticalCaliber|showline}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="orderDetailCollectionPayment" v-if="tabsIndex === 2">
                <template v-if="saleunilateralTransaction">
                    <div class="title1">收款信息</div>
                    <div class="order-payment-item">
                        <div class="gy-form-group" style="width: 100%">
                            <span class="l">下游公司</span>
                            <span>{{orderDetailList.buyerCompanyName}}</span>
                        </div>

                        <div class="gy-form-group">
                            <span class="l">合同金额(元)</span>
                            <div v-if="isFormulaPrice" class="essential-text red">公式计价</div>
                            <span v-else>{{collectionList.contractAmount | numToCash}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">待收金额(元)</span>
                            <div v-if="isFormulaPrice" class="essential-text">--</div>
                            <span v-else>{{collectionList.needCollectionTotal | numToCash}}</span>
                        </div>
                    </div>
                    <div style="clear: both"></div>
                    <div class="min-title">收款记录</div>
                    <div class="order-skjl" style="margin-bottom:20px;">
                        <table class="gy-table j-table">
                            <thead>
                            <tr>
                                <th>编号</th>
                                <th>状态</th>
                                <th>收款凭证</th>
                                <th>下游付款凭证</th>
                                <th>收款金额(元)</th>
                                <th>付款用途</th>
                                <th>到账日期</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody v-if="this.collectionList.erpCollectionModelList">
                            <tr v-for="(item, index) in collectionList.erpCollectionModelList" :key="index">
                                <td>{{item.id}}</td>
                                <td>{{item.collectionStatus === 10 ? '已创建' : '已确认'}}</td>
                                <td class="operation-styles">
                                    <span v-if="item.erpCollectionFileModelList.length !== 0" @click="showImg(index, 7)"><i
                                            class="iconfont icon-photo"></i></span>
                                    <span v-else><i class="iconfont icon-photo-null"></i></span>
                                </td>
                                <td class="operation-styles">
                                    <span v-if="item.erpBuyerPaymentFileModelList.length !== 0" @click="showImg(index, 15)"><i
                                            class="iconfont icon-photo"></i></span>
                                    <span v-else><i class="iconfont icon-photo-null"></i></span>
                                </td>
                                <td class="amount-right">{{item.collectionAmount | numToCash}}</td>
                                <td>{{$constant.collectionType[item.collectionType]}}</td>
                                <td>{{item.collectionDate | date}}</td>
                                <td class="operation-styles">
                                    <button class="gy-button-view" style="background-color: white;" @click="lookRecelive(item)">查看
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                            <tbody v-else>
                            <tr>
                                <td colspan="10" style="padding-left:400px">暂无数据</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </template>
                <template v-if="buyunilateralTransaction">
                    <!--<div v-else style="text-align: center">没有可显示的数据</div>-->
                    <div class="title2">付款信息</div>
                    <div class="order-payment-item">
                        <div class="gy-form-group" style="width: 100%">
                            <span class="l">上游公司</span>
                            <span>{{orderDetailList.sellerCompanyName}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">合同金额(元)</span>
                            <div v-if="isFormula" class="essential-text" style="color: red;">公式计价</div>
                            <span v-else>{{paymentRece.contractAmount | numToCash}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">待付金额(元)</span>
                            <span v-if="isFormula">--</span>
                            <span v-else>{{paymentRece.needPaymentTotal | numToCash}}</span>
                        </div>
                    </div>
                    <div style="clear: both"></div>
                    <div class="min-title">付款记录</div>
                    <div>
                        <el-table
                                :data="paymentRece.list"
                                style="width: 100%"
                                class="gy-table paymentRece-list">
                            <el-table-column
                                    label="编号"
                                    fixed
                                    width="80"><template slot-scope="item">{{item.row.id}}</template>
                            </el-table-column>
                            <el-table-column
                                    label="状态"
                                    width="100"><template slot-scope="item">{{item.row.approveStatusStr}}</template>
                            </el-table-column>
                            <el-table-column
                                    label="付款凭证"
                                    class-name="picture-styles-el"
                                    width="150">
                                <template slot-scope="item">
                                    <span v-if="item.row.payDesc === 3 && item.row.approveType === 1" >-</span>
                                    <template v-else>
                                        <span v-if="item.row.paymentVoucher && item.row.paymentVoucher.length !== 0" @click="showImg(item.row.paymentVoucher, 6)" style="padding-bottom:-2px">
                                            <i class="iconfont icon-photo"></i></span>
                                            <span v-else><i class="iconfont icon-photo-null"></i></span>
                                    </template>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    class-name="amount-right-el"
                                    label="付款金额(元)"
                                    width="140"><template slot-scope="item">{{item.row.payTotalStr| numToCash}}</template>
                            </el-table-column>
                            <el-table-column v-if="orderDetailList.upstreamInfo.skuPriceType === 21 || orderDetailList.upstreamInfo.skuPriceType === 22"
                                     label="付款数量"
                                     class-name="amount-right-el"
                                     width="100">
                                <template slot-scope="scope">
                                    <span>{{scope.row.applyQuantities}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="付款用途"
                                    width="100"><template slot-scope="item">{{item.row.payMethodStr}}</template>
                            </el-table-column>
                            <el-table-column
                                    label="申请日期"
                                    width="150"><template slot-scope="item">{{item.row.createdDate | date}}</template>
                            </el-table-column>
                            <el-table-column
                                    label="出账日期"
                                    width="100">
                                <template slot-scope="item">
                                    <span v-if="item.row.payDesc === 3 && item.row.approveType === 1" >-</span>
                                    <template v-else>
                                        <span v-if="item.row.approveStatus === 1">{{item.row.payTime | date}}</span>
                                    </template>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="收款单位"
                                    width="250"><template slot-scope="item">{{item.row.sellerCorpName}}</template>
                            </el-table-column>
                            <el-table-column
                                    label="开户行"
                                    width="250"><template slot-scope="item">{{item.row.sellerDepositBank}}</template>
                            </el-table-column>
                            <el-table-column
                                    label="银行账号"
                                    width="200"><template slot-scope="item">{{item.row.sellerAccount}}</template>
                            </el-table-column>
                            <el-table-column
                                    label="付款方式"
                                    width="100"><template slot-scope="item">{{item.row.tradeModeStr}}</template>
                            </el-table-column>
                            <el-table-column
                                    label="经办人"
                                    width="80"><template slot-scope="item">{{item.row.createUserName}}</template>
                            </el-table-column>
                            <el-table-column
                                    label="备注"
                                    width="250"><template slot-scope="item"><div class="text-overflow">{{item.row.remarks}}</div></template>
                            </el-table-column>
                            <el-table-column
                                    label="说明"
                                    width="150"><template slot-scope="item">{{item.row.payDescStr}}
                                <el-popover
                                        placement="top-start"
                                        width="360"
                                        trigger="hover">
                                    <el-table :data="item.row.payInfoList" class="paymentRece-list">
                                        <el-table-column label="序号" width="60" type="index"></el-table-column>
                                        <el-table-column label="申请金额(元)" width="120" class-name="el-table-column-apply">
                                            <template slot-scope="item">
                                                <span>{{item.row.payAmount | numToCash}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="付款凭证" class-name="amount-right-el" width="120">
                                            <template slot-scope="item">
                                                <span v-if="item.row.fileUrl && item.row.fileUrl.length !== 0"
                                                    @click="showImgFk(item.row.fileUrl.split(','))"><i class="iconfont icon-photo"></i></span>
                                                <span v-else><i class="iconfont icon-photo-null"></i></span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="出账日期" class-name="amount-right-el" width="120">
                                            <template slot-scope="item">
                                            <span>{{item.row.payTime | date}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column property="description" label="备注" width="150"></el-table-column>
                                    </el-table>
                                    <el-button type="text" slot="reference" v-if="item.row.payInfoList && item.row.payInfoList.length > 0">查看明细
                                    </el-button>
                                </el-popover>
                            </template>
                            </el-table-column>
                            <el-table-column
                                    class-name="operation-styles-el"
                                    label="操作"
                                    fixed="right"
                                    width="80">
                                <template slot-scope="item">
                                    <button class="gy-button-view" style="background-color: white;" @click="gotPayInfo(item)">查看</button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
            </div>
            <div class="orderDetailDelivery" v-if="tabsIndex === 3">
                <template v-if="buyunilateralTransaction">
                    <div class="title1">采购交割</div>
                    <div class="block clearfix">
                        <div class="gy-form-group">
                            <span class="l">上游公司</span>
                            <span>{{purchaseList.sellerCompanyName}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">交割库</span>
                            <span>{{purchaseList.deliveryWarehouseName}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">交割库地址</span>
                            <span>{{purchaseList.deliveryDetailedAddress}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">计划交割日</span>
                            <span>{{purchaseList.planDeliveryDate}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">数量(吨)</span>
                            <span>{{purchaseList.skuQuantity|numToQuantity}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">免仓期(天)</span>
                            <span>{{purchaseList.warehouseFreeDays}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l" style="width: 116px">待交割数量(吨)</span>
                            <span>{{purchaseList.surplusDeliveryQuantity|numToQuantity}}</span>
                        </div>
                    </div>
                    <div class="min-title">交割记录</div>
                    <el-table
                            :data="purchaseList.deliveryEntityList"
                            style="width: 100%;margin-buttom:20px;"
                            class="gy-table el-table-delivery">
                        <el-table-column
                                label="编号"
                                fixed
                                width="80"><template slot-scope="item">{{item.row.deliveryItemId}}</template>
                        </el-table-column>
                        <el-table-column
                                label="状态"
                                width="100"><template slot-scope="item">{{item.row.deliveryStatus | buyDeliveryItemState}}</template>
                        </el-table-column>
                        <el-table-column
                                label="交割凭证"
                                class-name="picture-styles-el"
                                width="150">
                            <template slot-scope="item">
                                <span v-if="item.row.erpDeliveryFileModelList.length !== 0" @click="showImg(item.row.erpDeliveryFileModelList, 1)" style="padding-bottom:-2px"><i class="iconfont icon-photo"></i></span><span v-else><i class="iconfont icon-photo-null"></i></span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                class-name="amount-right-el"
                                label="本次交割数量(吨)"
                                width="140"><template slot-scope="item">{{item.row.deliveryQuantity|numToQuantity}}</template>
                        </el-table-column>
                        <el-table-column
                                label="实际交割日"
                                width="100"><template slot-scope="item">{{item.row.realDeliveryDate | date}}</template>
                        </el-table-column>
                        <el-table-column
                                label="创建时间"
                                width="150"><template slot-scope="item">{{item.row.createdDate | date(1)}}</template>
                        </el-table-column>
                        <el-table-column
                                class-name="operation-styles-el"
                                label="操作">
                            <template slot-scope="item">
                                <button class="gy-button-view view" @click="jumps(item.row)">查看</button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <template v-if="saleunilateralTransaction">
                    <div v-if="saleList !== null || saleList.length !== 0">
                        <div class="title2">销售交割</div>
                        <div class="block clearfix">
                            <div class="gy-form-group">
                                <span class="l">下游公司</span>
                                <span>{{saleList.buyerCompanyName}}</span>
                            </div>
                            <div class="gy-form-group">
                                <span class="l">交割库</span>
                                <span>{{saleList.deliveryWarehouseName}}</span>
                            </div>
                            <div class="gy-form-group">
                                <span class="l">交割库地址</span>
                                <span>{{saleList.deliveryDetailedAddress}}</span>
                            </div>
                            <div class="gy-form-group">
                                <span class="l">计划交割日</span>
                                <span>{{saleList.planDeliveryDate}}</span>
                            </div>
                            <div class="gy-form-group">
                                <span class="l">数量(吨)</span>
                                <span>{{saleList.skuQuantity|numToQuantity}}</span>
                            </div>
                            <div class="gy-form-group">
                                <span class="l">免仓期(天)</span>
                                <span>{{saleList.warehouseFreeDays}}</span>
                            </div>
                            <div class="gy-form-group">
                                <span class="l" style="width: 116px">待交割数量(吨)</span>
                                <span>{{saleList.surplusDeliveryQuantity|numToQuantity}}</span>
                            </div>
                        </div>
                        <div class="min-title">交割记录</div>
                        <el-table
                                :data="saleList.deliveryEntityList"
                                style="width: 100%"
                                class="gy-table">
                            <el-table-column
                                    label="编号"
                                    fixed
                                    width="80"><template slot-scope="item">{{item.row.deliveryItemId}}</template>
                            </el-table-column>
                            <el-table-column
                                    label="状态"
                                    width="100"><template slot-scope="item">{{item.row.deliveryStatus | sellDeliveryItemState}}</template>
                            </el-table-column>
                            <el-table-column
                                    class-name="operation-styles-el"
                                    label="交割凭证"
                                    width="150">
                                <template slot-scope="item">
                                    <span v-if="item.row.erpDeliveryFileModelList.length !== 0" @click="showImg(item.row.erpDeliveryFileModelList, 1)"><i class="iconfont icon-photo"></i></span><span v-else><i class="iconfont icon-photo-null"></i></span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    class-name="amount-right-el"
                                    label="本次交割数量(吨)"
                                    width="140"><template slot-scope="item">{{item.row.deliveryQuantity|numToQuantity}}</template>
                            </el-table-column>
                            <el-table-column
                                    label="实际交割日"
                                    width="120"><template slot-scope="item">{{item.row.realDeliveryDate | date}}</template>
                            </el-table-column>
                            <el-table-column
                                    label="交叉交割"
                                    width="100"><template slot-scope="item">{{item.row.acrossDelivery | acrossDelivery }}</template>
                            </el-table-column>
                            <el-table-column
                                    label="交叉采购合同"
                                    class-name="operation-styles-el"
                                    width="150">
                                <template slot-scope="item">
                                <span v-if="item.row.acrossDelivery == 1 && item.row.erpFileContractModelList.length !== 0"
                                      @click="showImg(item.$index, 3)"><i class="iconfont icon-photo"></i></span>
                                    <span v-else>—</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="交叉采购合同编号"
                                    width="180">
                                <template slot-scope="item">
                                    <span v-if="item.row.acrossDelivery == 1">{{item.row.acrossContractNo}}</span>
                                    <span v-else>—</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="换货仓库"
                                    width="200"><template slot-scope="item">{{item.row.productWareHouse}}</template>
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    class-name="operation-styles-el"
                                    width="85"
                                    label="操作">
                                <template slot-scope="item">
                                    <button class="gy-button-view view" @click="jump(item.row)">查看</button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
            </div>
            <div class="orderDetailSalesInvoice" v-if="tabsIndex === 4">
                <template v-if="buyunilateralTransaction">
                    <div class="title1 title3">收票信息
                        <el-button type="text" @click="buyLinkInvoice" class="linkInvoice" v-if="!noCollectTickets">查看详情</el-button>
                    </div>
                    <div v-if="!noCollectTickets">
                        <div class="lll">
                            <div class="gy-form-group">
                                <span class="l">上游公司</span>
                                <span>{{collectTicketReceipt.sellerName}}</span>
                            </div>
                            <div class="gy-form-group">
                                <span class="l">发票月份</span>
                                <span>{{collectTicketReceipt.provideInvoiceType|invoiceMonthValue(collectTicketReceipt)}}</span>
                            </div>
                            <div class="gy-form-group">
                                <span class="l">发票总金额(元)</span>
                                <span>{{collectTicketReceipt.amount | numToCash}}</span>
                            </div>
                            <div class="gy-form-group">
                                <span class="l">数量(吨)</span>
                                <span>{{collectTicketReceipt.quantity|numToQuantity}}</span>
                            </div>
                            <div class="gy-form-group">
                                <span class="l">单价(含税，元/吨)</span>
                                <span v-if="collectTicketReceipt.skuPriceType === 21 || collectTicketReceipt.skuPriceType === 22">公式计价</span>
                                <span v-else>{{collectTicketReceipt.productUnitPrice | numToCash(true)}}</span>
                            </div>
                            <div class="gy-form-group">
                                <span class="l">收票凭证</span>
                                <span>
                                    <span v-if="collectTicketReceipt.receiptInvoiceUrlList && collectTicketReceipt.receiptInvoiceUrlList.length !== 0"
                                          @click="showImg(-1, 5)"><i class="iconfont icon-photo"></i></span>
                                    <span v-else><i class="iconfont icon-photo-null"></i></span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div v-if="noCollectTickets" class="noinvoiceStyle">还未收票，没有可显示的收票信息</div>
                </template>
                <template v-if="saleunilateralTransaction">
                    <div class="title2 title3">开票信息</div>
                    <div v-if="!noInvoice">
                        <div class="gy-form-group">
                            <span class="l">下游公司</span>
                            <span>{{collectTickets.buyerName}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">发票月份</span>
                            <span>{{collectTickets.provideInvoiceType|invoiceMonthValue(orderDetailList.downstreamInfo)}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">数量(吨)</span>
                            <span>{{collectTickets.contractNumber}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">合同金额(元)</span>
                            <span v-if="orderDetailList.downstreamInfo.skuPriceType === 21 || orderDetailList.downstreamInfo.skuPriceType === 22">公式计价</span>
                            <span v-else>{{collectTickets.contractAmount | numToCash}}</span>
                        </div>
                        <div class="gy-form-group" style="width:100%">
                            <span class="l">已开票金额(元)</span>
                            <span>{{collectTickets.makeOutInvoice | numToCash}}</span>
                        </div>
                        <div class="min-title">开票记录</div>
                        <div style="margin-bottom: 20px;">
                            <el-table
                                    :data="collectTicketsInvoices"
                                    style="width: 100%"
                                    class="gy-table">
                                <el-table-column
                                        label="编号"
                                        fixed
                                        width="80"><template slot-scope="item">{{item.row.id}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="状态"
                                        width="100"><template slot-scope="item">{{item.row.statusDesc}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="本次开票金额(元)"
                                        class-name="amount-right-el"
                                        width="150"><template slot-scope="item">{{item.row.amount | numToCash}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="开票数量(吨)"
                                        class-name="amount-right-el"
                                        width="120"><template slot-scope="item">{{item.row.quantity| numToQuantity}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="企业税号"
                                        width="160"><template slot-scope="item">{{item.row.buyerTaxCode}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="开户银行"
                                        width="130">
                                    <template slot-scope="item">
                                        <span>{{item.row.buyerBankName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="银行账号"
                                        width="250"><template slot-scope="item">{{item.row.buyerBankAccount}}</template>
                                </el-table-column>
                                <el-table-column
                                        class-name="amount-right-el"
                                        label="转让货权总数量(吨)"
                                        width="150"><template slot-scope="item">{{item.row.deliveredProductQuantity|numToQuantity}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="商品税务编码"
                                        width="180"><template slot-scope="item">{{item.row.productTaxCode}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="进项票"
                                        width="160">
                                        <template slot-scope="item">
                                            <span>{{item.row.receiptInvoiceAmount | entryTicket(item.row.receiptInvoiceAmount)}}</span>
                                            <span>{{item.row.receiptInvoiceStatus | entryTickets(item.row.receiptInvoiceStatus)}}</span>
                                            </template>
                                </el-table-column>
                                <el-table-column
                                        label="已收进项票(元)"
                                        class-name="amount-right-el"
                                        width="135"><template slot-scope="item">{{item.row.receiptInvoiceAmount | numToCash}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="开票凭证"
                                        class-name="operation-styles-el"
                                        width="90">
                                        <template slot-scope="item">
                                            <span v-if="item.row.invoiceVoucherList && item.row.invoiceVoucherList.length !== 0" @click="showImgs(1, item.row.invoiceVoucherList)" style="padding-bottom:-2px">
                                            <i class="iconfont icon-photo"></i></span>
                                            <span v-else><i class="iconfont icon-photo-null"></i></span>
                                        </template>
                                </el-table-column>
                                <el-table-column
                                        label="收款凭证"
                                        class-name="operation-styles-el"
                                        width="90">
                                        <template slot-scope="item">
                                            <span v-if="item.row.collectionFileList && item.row.collectionFileList.length !== 0" @click="showImgs(2, item.row.collectionFileList)" style="padding-bottom:-2px">
                                            <i class="iconfont icon-photo"></i></span>
                                            <span v-else><i class="iconfont icon-photo-null"></i></span>
                                        </template>
                                </el-table-column>
                                <el-table-column
                                        label="销售交割凭证"
                                        class-name="operation-styles-el"
                                        width="135">
                                        <template slot-scope="item">
                                            <span v-if="item.row.deliveredUrlList && item.row.deliveredUrlList.length !== 0" @click="showImgs(3, item.row.deliveredUrlList)" style="padding-bottom:-2px">
                                            <i class="iconfont icon-photo"></i></span>
                                            <span v-else><i class="iconfont icon-photo-null"></i></span>
                                        </template>
                                </el-table-column>
                                <el-table-column
                                        label="采购交割凭证"
                                        class-name="operation-styles-el"
                                        width="135">
                                        <template slot-scope="item">
                                            <span v-if="item.row.productSettlementBillList && item.row.productSettlementBillList.length !== 0" @click="showImgs(4, item.row.productSettlementBillList)" style="padding-bottom:-2px">
                                            <i class="iconfont icon-photo"></i></span>
                                            <span v-else><i class="iconfont icon-photo-null"></i></span>
                                        </template>
                                </el-table-column>
                                <el-table-column
                                        label="快递单号"
                                        width="110"><template slot-scope="item">{{item.row.expressCode}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="经办人"
                                        width="80"><template slot-scope="item">{{item.row.operationUserName}}</template>
                                </el-table-column>
                                <el-table-column
                                        label="备注"
                                        width="250"><template slot-scope="item"><div class="text-overflow">{{item.row.remark}}</div></template>
                                </el-table-column>
                                <el-table-column
                                        label="创建时间"
                                        width="150"><template slot-scope="item">{{item.row.createdDate | date(1)}}</template>
                                </el-table-column>
                                <el-table-column
                                        class-name="operation-styles-el"
                                        label="操作"
                                        fixed="right"
                                        width="80">
                                    <template slot-scope="item">
                                        <button class="gy-button-view" style="background-color: white;" @click="InvoiceCheck(item.row)">查看</button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div v-if="noInvoice" class="noinvoiceStyle">还未开票，没有可显示的开票信息</div>
                </template>
            </div>
            <div class="stampList" v-if="tabsIndex === 5">
                <div class="clearfix">
                    <div class="title1">用印申请记录</div>
                    <button class="stampbtn gy-button-extra" @click="goStamp">新建用印申请</button>
                </div>
                <!-- 2 -->
                <div class="box">
                    <table class="gy-table">
                        <thead>
                        <tr>
                            <td>申请编号</td>
                            <th>印章种类</th>
                            <th>文件名称</th>
                            <th>状态</th>
                            <th>申请日期</th>
                            <th>使用日期</th>
                            <th>附件</th>
                            <th>签章文件</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody v-if="stampList.length > 0">
                        <tr v-for="(item, index) in stampList" :key="index">
                            <td>{{item.applyCode}}</td>
                            <td>{{item.stampTypeDesc}}</td>
                            <td>{{item.stampFileDescription}}</td>
                            <td>{{item.statusDesc}}</td>
                            <td>{{item.createdDate | date('h')}}</td>
                            <td>{{item.usedDate | date('h')}}</td>
                            <td class="hover operation-styles">
                                <i v-if="item.attachments !==null && item.attachments.length >0" class="iconfont icon-photo"
                                @click="showImgFk(item.attachments)"></i>
                                <i v-else class="iconfont icon-photo-null" @click="imgErr('附件')"></i>
                            </td>
                            <td class="hover operation-styles">
                                <i v-if="item.signedFiles !==null && item.signedFiles.length >0" class="iconfont icon-photo"
                                @click="showImgFk(item.signedFiles)"></i>
                                <i v-else class="iconfont icon-photo-null" @click="imgErr('签章文件')"></i>
                            </td>
                            <td class="operation-styles">
                                <button class="gy-button-view view" @click="lookStamp(item.id)">查看</button>
                            </td>
                        </tr>
                        </tbody>
                        <tbody v-else>
                        <tr>
                            <td colspan="10" style="text-align: center;">没有找到可显示的数据...</td>
                        </tr>
                        </tbody>
                    </table>
                    <!-- 分页 -->
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :current-page.sync="stampSearch.pageNo"
                            :page-size="stampSearch.pageSize"
                            :total="stampSearch.total"
                            @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
                <!-- 1 -->
            </div>
            <settlement v-show="tabsIndex === 6" :order-detail="orderDetailList"
                        :settlement-buy-list="settlementBuyList" :settlement-sell-list="settlementSellList"/>
        </div>
        <gy-file-view ref="contFileView"></gy-file-view>
    </div>
</template>
<script>
import step from '../../components/step';
import dialogImg from './../components/dialogImg';
import contSell from './../contract/orderSell';
import contBuy from './../contract/orderBuy';
import gyFileView from '../components/gyFileView';
import settlement from './orderDetail/settlement';

export default {
    name: 'orderDetails',
    components: {
        dialogImg,
        step,
        contSell,
        contBuy,
        gyFileView,
        settlement
    },
    data () {
        return {
            stampList: [],
            isFormula: false,
            isFormulaPrice: false,
            payStatus: 2,
            stepArr: [],
            id: null,
            purchaseOrderId: null,
            saleOrderId: null,
            orderDetailList: [], // 订单明细
            paymentReceivables: [], // 收付款-收款
            collectionList: [], // 收付款-收款
            paymentRece: [], // 收付款-付款
            ticketCollectingInformationList: [], // 收票
            marketingList: [], // 交割
            purchaseList: [],
            saleList: [],
            collectTicketReceipt: [], // 发票-收
            collectTickets: [], // 发票-开
            applyList: {
                receiptVoucher: null
            }, // 申请开票
            collectList: {
                receiptInvoiceUrlList: []
            }, // 新建收票
            paymentNwes: [], // 新增付款
            newReceiptsList: {
                erpCollectionFileModelList: []
            }, // 新建收款单
            deliveryView: [], // 新建页面
            createBuyDelive: {}, // 保存采购交割,
            createSellDelive: {}, // 保存销售交割
            creatPaymentForm: {
                payInfoList: []
            }, // 新建付款单
            icon: require('../../assets/images/log.png'),
            entryoptions: [{
                id: 0,
                label: '在途中'
            }, {
                id: 1,
                label: '已收到'
            }],
            entryoptionTwo: [{
                id: 0,
                label: '先开销项发票'
            }],
            signUnderLineData: {
                invoiceModelList: []
            },
            ComentList: { // 公用接收图片地址
                receiptList: []
            },
            stampSearch: {
                pageNo: 1,
                pageSize: 10,
                total: null,
                essenceId: this.$route.query.id
            },
            homeFromFlg: 0, // 1:表示从首页跳转来
            homeBizType: 0,
            noInvoice: false, // 开票
            noCollectTickets: false, // 收票
            buyunilateralTransaction: false, // 买方单边交易（上游采购）
            saleunilateralTransaction: false, // 卖方单边交易（下游销售）
            erpCollectionFileModelList: [], // 图片查看
            tabsIndex: 0,
            paymentShow: false, // 付款显示
            receivablesShow: false, // 收款显示
            invoiceShow: false, // 开票显示
            collectTicketsShow: false, // 收票显示
            dataRemark: null,
            collectTicketsInvoices: [], // 多次开票
            settlementBuyList: [], // 采购结算列表
            settlementSellList: [] // 销售结算列表
        };
    },
    mounted () {
        this.purchaseOrderId = this.$route.query.purchaseOrderId;
        this.saleOrderId = this.$route.query.saleOrderId;
        this.id = this.$route.query.id;
        this.orderDetail(); // 订单明细
        this.sale();
        this.purchase();
        this.collectTicketsSales();
        this.collectTicketSreceipt();
        this.paymentReceiv();// 付款
        this.paymentColl();
        this.getStampList(); // 用印
        this.getSettlementInfo();
    },
    created () {
        let me = this;
        if (this.$route.query.homeFromFlg === 1 || this.$route.query.homeFromFlg === '1') {
            // 从首页跳转来
            me.homeFromFlg = 1;
            me.homeBizType = this.$route.query.homeBizType;
            if (me.homeBizType === 3) {

            }
        }
        if (this.$route.query.tabsIndex) { // 从新建用印跳转过来
            this.tabsIndex = this.$route.query.tabsIndex;
        }
    },
    methods: {
        // 切换tab
        tabClick (index) {
            this.tabsIndex = index;
        },
        // 收款查看
        lookRecelive (val) {
            this.$router.push({name: 'paymentSell', query: {homeBizType: 5, contEssId: this.id, collId: val.id}});
        },
        // 付款查看
        gotPayInfo (val) {
            this.$router.push({name: 'paymentBuy', query: {homeBizType: 5, doneFlg: 1, contEssId: this.id, payId: val.row.id, purchaseOrderId: this.purchaseOrderId}});
        },
        // 开票查看
        InvoiceCheck (item) {
            this.$router.push({name: 'auditOperation', query: {purchaseOrderId: this.$route.query.purchaseOrderId, salesOrderId: this.$route.query.saleOrderId, invoiceId: item.id, id: this.$route.query.id}});
        },
        // 订单明细
        orderDetail () {
            let that = this;
            that.$http.get(that.$api.order.orderDetail + '/' + that.id)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.orderDetailList = res.data.data;
                        if (that.orderDetailList.contractType === 1 || that.orderDetailList.contractType === 2) {
                            // 上游采购
                            that.buyunilateralTransaction = true;
                            if (that.orderDetailList.upstreamInfo.skuPriceType === 21 || that.orderDetailList.upstreamInfo.skuPriceType === 22) {
                                // 采购合同-付款
                                that.isFormula = true;
                            }
                        }
                        if (that.orderDetailList.contractType === 1 || that.orderDetailList.contractType === 3) {
                            // 下游销售
                            that.saleunilateralTransaction = true;
                            if (that.orderDetailList.downstreamInfo.skuPriceType === 21 || that.orderDetailList.downstreamInfo.skuPriceType === 22) {
                                // 销售合同-收款
                                that.isFormulaPrice = true;
                            }
                        }
                    }
                });
        },
        showImgFk (list) {
            this.$refs.contFileView.open4MultiFile(list);
        },
        // 采购
        jumps (item) {
            let query = {
                contEssId: item.contractEssenceId,
                todoId: item.todoId,
                dlvItemId: item.deliveryItemId,
                homeFromFlg: 1,
                homeBizType: 8,
                doneFlg: 1
            };
            this.$router.push({name: 'deliveryPurchaseView', query: query});
        },
        jump (item) {
            let query = {
                contEssId: item.contractEssenceId,
                todoId: item.todoId,
                dlvItemId: item.deliveryItemId,
                homeFromFlg: 1,
                homeBizType: 8,
                doneFlg: 1
            };
            this.$router.push({name: 'deliverySalesView', query: query});
        },
        // 收付款-付款-李思义
        paymentReceiv () {
            let that = this;
            let params = {
                purchaseOrderId: this.purchaseOrderId
            };
            that.$http.post(that.$api.payment.getDetail, params)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.paymentRece = res.data.data;
                    }
                });
        },
        // 收付款-收款
        paymentColl () {
            let that = this;
            that.$http.get(that.$api.payment.getDetailCollection + that.saleOrderId)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.collectionList = res.data.data;
                    }
                });
        },
        // 交割
        // 采购
        purchase () {
            let that = this;
            that.$http.get(that.$api.delivery.getBuyDetail + '/' + that.purchaseOrderId)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.purchaseList = res.data.data;
                    }
                });
        },
        // 销售
        sale () {
            let that = this;
            that.$http.get(that.$api.delivery.getSellDetail + '/' + that.saleOrderId)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.saleList = res.data.data;
                    }
                });
        },
        // 发票-收
        collectTicketSreceipt () {
            let that = this;
            if (that.purchaseOrderId === null) {
                that.noCollectTickets = true;
            }
            if (that.purchaseOrderId !== null) {
                that.$http.get(that.$api.invoice.getDetail + '/' + that.purchaseOrderId)
                    .then(function (res) {
                        if (res.data.code === 0) {
                            if (res.data.data !== undefined) {
                                that.collectTicketReceipt = res.data.data;
                            } else {
                                that.noCollectTickets = true;
                            }
                        }
                    });
            }
        },
        // 发票-开
        collectTicketsSales () {
            let that = this;
            if (that.saleOrderId === null) {
                that.noInvoice = true;
            }
            if (that.saleOrderId !== null) {
                that.$http.get(that.$api.invoice.getDetails + '/' + that.saleOrderId)
                    .then(function (res) {
                        if (res.data.code === 0) {
                            if (res.data.data !== undefined) {
                                that.collectTickets = res.data.data;
                                that.collectTicketsInvoices = res.data.data.invoices;
                            } else {
                                that.noInvoice = true;
                            }
                        }
                    });
            }
        },
        // 用印
        getStampList () {
            this.$http.post(this.$api.stamp.stampList, this.stampSearch)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.stampList = res.data.data.list;
                        this.stampSearch.total = res.data.data.total;
                        return;
                    }
                    this.$message.error(res.data.message);
                });
        },
        // 分页
        handleCurrentChange (v) {
            this.search.pageNo = v;
            this.getStampList();
        },
        // 用印查看
        lookStamp (id) {
            let query = {
                id: id, // 合同要素id
                saleOrderId: this.$route.query.saleOrderId,
                purchaseOrderId: this.$route.query.purchaseOrderId
            };
            this.$router.push({name: 'stampDetail', query: query});
        },
        // 去新建用印
        goStamp (id) {
            let query = {
                orderDetailList: this.orderDetailList // 合同要素id页面来的
            };
            this.$router.push({name: 'createStamp', query: query});
        },
        // 无图片显示
        imgErr (title) {
            this.$message({message: title + '暂无数据', type: 'warning'});
        },
        // 图片预览
        showImgs (type, arr) {
            switch (type) {
            case 1:
                this.fileList = arr;
                break;
            case 2:
                this.fileList = arr;
                break;
            case 3:
                this.fileList = arr;
                break;
            case 4:
                this.fileList = arr;
                break;
            default:
                this.fileList = [];
                break;
            }
            this.$refs.contFileView.open4MultiFile(this.fileList);
        },
        showImg (idx, type) {
            let arr = [];
            switch (type) {
            case 1:// 交割-采购交割记录-交割凭证 交割-销售交割记录-交割凭证
                this.erpCollectionFileModelList = idx;
                break;
            case 3:// 交割-销售交割记录-采购合同
                this.erpCollectionFileModelList = this.saleList.deliveryEntityList[idx].erpFileContractModelList;
                break;
            case 4:// 交割-销售交割记录-货权凭证
                this.erpCollectionFileModelList = this.saleList.deliveryEntityList[idx].erpGoodFileModelList;
                break;
            case 5: // 发票-收票凭证
                this.collectTicketReceipt.receiptInvoiceUrlList.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 6:// 付款记录-付款凭证
                let PVoucher = idx.split(',');
                PVoucher.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 7:// 收款记录-收款凭证
                this.erpCollectionFileModelList = this.collectionList.erpCollectionModelList[idx].erpCollectionFileModelList;
                break;
            case 8:// 采购合同
                this.orderDetailList.upstreamInfo.fileAttachList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 9:// 采购合同
                this.orderDetailList.upstreamInfo.fileDocUrl.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 10:// 采购盖章合同
                this.orderDetailList.upstreamInfo.fileAttachCertifiedList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 11:// 销售合同
                this.orderDetailList.downstreamInfo.fileAttachList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 12:// 销售合同
                this.orderDetailList.downstreamInfo.fileDocUrl.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 13:// 销售盖章合同
                this.orderDetailList.downstreamInfo.fileAttachCertifiedList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 14:// 开票-收款凭证
                this.collectTickets.collectionFileList.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 15:// 收款记录-下游付款凭证
                this.erpCollectionFileModelList = this.collectionList.erpCollectionModelList[idx].erpBuyerPaymentFileModelList;
                break;
            case 16:// 开票-开票凭证
                this.collectTickets.invoiceVoucherList.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.erpCollectionFileModelList = arr;
                break;
            default:
                this.erpCollectionFileModelList = [];
                break;
            }
            this.$refs.contFileView.open(this.erpCollectionFileModelList);
        },
        buyLinkInvoice () {
            this.$router.push({name: 'financialConfirmation', query: { id: this.id, saleOrderId: this.saleOrderId, purchaseOrderId: this.purchaseOrderId, doneFlg: 1 }});
        },
        sellLinkInvoice () {
            this.$router.push({name: 'auditOperation', query: { id: this.id, saleOrderId: this.saleOrderId, purchaseOrderId: this.purchaseOrderId, doneFlg: 1 }});
        },
        // 获取结算详情
        getSettlementInfo () {
            let that = this;
            // 先查询采购结算
            let searchParam = {
                orderType: 1,
                contractEssenceId: that.id, // 合同要素ID
                pageNo: 1,
                pageSize: 100
            };
            that.$http.post(that.$api.settlement.getSettleList, searchParam)
                .then((response) => {
                    if (response.data.code === 0) {
                        that.settlementBuyList = response.data.data.rows;
                    } else {
                        that.$alert(response.data.code + ' ' + response.data.message);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });

            // 再查询销售结算
            searchParam = {
                orderType: 2,
                contractEssenceId: that.id, // 合同要素ID
                pageNo: 1,
                pageSize: 100
            };
            that.$http.post(that.$api.settlement.getSettleList, searchParam)
                .then((response) => {
                    if (response.data.code === 0) {
                        that.settlementSellList = response.data.data.rows;
                    } else {
                        that.$alert(response.data.code + ' ' + response.data.message);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
    .red {
        color: red !important;
    }
    .paymentRece-list {
        .icon-photo-null:before, .icon-photo:before {
            font-size: 20px;
        }
    }
    .orderDetailsTabs {
        overflow: hidden;
        padding: 5px 30px 15px 0px;
        ul{
            overflow: hidden;
            float: left;
            margin-top: 3px;
        }
        li {
            height: 27px;
            float: left;
            padding: 0 6px;
            color: #666;
            font-size: 14px;
            font-weight: bold;
            &.active {
                color: $color-a-active;
                border-bottom: 1px solid $color-a-active
            }
        }
        li:hover{
            cursor: pointer;
        }
        ul li:not(:first-child) {
            position: relative;
            margin-left: 20px;
        }
    }
    .billing {
        .gy-form-group {
            padding: 6px 40px 6px 160px;
            .l {
                width: 145px;
            }
        }
    }

    .orderDetails {
        .orderDetailsTop {
            margin-bottom: 0px;
            &:after {
                display: block;
                clear: both;
                content: ' ';
            }
            .gy-form-group {
                padding: 8px 30px 8px 110px;
            }
        }
        .orderDetailsCenter {
            margin: 0 16px;
            .gy-form-group {
                .l {
                    margin-left: 0px;
                }
            }
            .orderDetailSalesPurchase{
                .gy-form-group {
                    padding: 8px 30px 8px 112px;
                    .l {
                        padding-left: 15px;
                        width: 105px;
                    }
                }
            }
            .orderDetailCollectionPayment{
                .gy-form-group {
                    padding: 8px 30px 8px 110px;
                    .l {
                        padding-left: 15px;
                        width: 105px;
                    }
                }
            }
            .orderDetailDelivery{
                .gy-form-group {
                    padding: 8px 30px 8px 117px;
                    .l {
                        padding-left: 15px;
                        width: 105px;
                    }
                }
            }
            .orderDetailSalesInvoice{
                .gy-form-group {
                    padding: 8px 30px 8px 148px;
                    .l {
                        padding-left: 15px;
                        width: 138px;
                    }
                }
            }
        }
    }
    .stampList{
        .title1{
            float: left;
        }
        .stampbtn{
            float: right;
        }
        .box{
            margin-top: 8px;
        }
    }
    .my-pay-table-box {
        overflow-x: auto;
        .gy-table {
            min-width: 2500px;
        }
    }

    .pay-wrapper {
        display: flex;
        clear: both;
        & > div {
            flex: 1;
        }
        .gy-form-group {
            width: 100%;
        }
    }

    .noinvoiceStyle {
        width: 100%;
        height: 70px;
        text-align: center;
        line-height: 70px;
        font-size: 12px;
    }

    .title {
        font-size: 14px;
        color: #333333;
        margin: 20px 0 0 16px;
        font-weight: 600;
    }
    .titleDetail{
        font-size: 14px;
        color: #333333;
        margin: 5px 0 0 16px;
        font-weight: 600;
    }
    /deep/ .title1 {
        font-size: 14px;
        color: #333333;
        margin: 0 0 5px 0;
        font-weight: 600;
    }
    .title2{
        font-size: 14px;
        color: #333333;
        margin: 0px 0 0px 0;
        font-weight: 600;
    }
    .title3 {
        .el-button {
            padding: 0px;
            margin-top: 5px;
        }
    }

    .min-title {
        font-size: 14px;
        color: #333333;
        margin: 5px 0 20px 0;
        font-weight: 600;
    }

    .money {
        .icon-photo:before, .icon-photo-null:before {
            line-height: 1.08;
        }
    }

    .order-skjl {
        overflow: auto;
        .gy-table {
            min-width: 1500px;
        }
        .j-table {
            min-width: 100%;
        }
    }

    .tempo {
        .step-wrap {
            width: 30%;
            display: flex;
            margin: 20px 0 0 20px;
            .confirmed {
                position: relative;
                text-align: right;
                span {
                    display: inline-block;
                }
            }
            .unconfirm {
                margin-left: -14px;
            }
        }
        .button-wrap {
            text-align: right;
            margin: 80px 0;
        }
    }

    .view {
        background-color: #fff;
    }
</style>
<style lang="scss">
    .el-tabs--border-card {
        box-shadow: none;
    }

    .orderDetails {
        .el-table-column-apply{
            text-align: right;
        }
        .el-table-delivery{
            margin-bottom: 20px;
        }
        .el-tabs {
            .lll {
                width: 100%;
            }
            .el-tabs__content {
                padding: 14px;
            }
        }
        .order-dialog {
            .el-dialog__header {
                font-weight: bold;
                padding: 0px;
            }
            .el-dialog__body {
                margin: 10px 0;
                padding: 10px 20px;
            }
            .order-apply {
                h3 {
                    margin: 10px 0;
                }
            }
            .gy-form-group {
                padding: 10px 40px 10px 125px;
            }
            .gy-form-group .l {
                width: 120px;
            }
        }
        .icon-photo:before, .icon-photo-null:before {
            line-height: 1.08;
        }
    }

    .el-dialog__body {
        padding-top: 0;
        padding-bottom: 20px;
    }

    .contractType {
        background-color: yellow;
    }

    .linkInvoice {
        float: right;
    }

    .conStyle {
        background-color: yellow;
    }
</style>
