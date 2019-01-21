<template>
    <div class="orderDetails">
        <div class="tempo">
            <div class="title">基本信息</div>
            <!-- 作为暂定需求 -->
            <!-- 进度条 -->
            <!-- <div class="step-wrap" >
              <step :step="(index+1)"
                    :isRight="index > 0"
                    :showLine="index > 0"
                    :isActive="payStatus >= item.payStatus"
                    :isDone="payStatus >= item.payStatus"
                    v-for="(item, index) in stepArr"
                    :key="index">
                  <div class="confirmed" v-if="index > 0">
                      <span>{{item.text}}</span>
                  </div>
                  <div class="unconfirm" v-else>
                      <span>{{item.text}}</span>
                  </div>
              </step>
            </div> -->
            <!-- 条件按钮 -->
            <!-- <div class="button-wrap">
              <button class="gy-button-extra">按钮1</button>
              <button class="gy-button-extra">按钮2</button>
              <button class="gy-button-extra">按钮3</button>
              <button class="gy-button-extra">按钮4</button>
              <button class="gy-button-extra">按钮5</button>
              <button class="gy-button-extra">按钮6</button>
            </div> -->
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
                <span class="l">业务操作人</span>
                <span>{{orderDetailList.businessManagerName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">业务组</span>
                <span>{{orderDetailList.orgName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">产品名称</span>
                <span>{{orderDetailList.prodName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">创建时间</span>
                <span>{{orderDetailList.createdDate | date(1)}}</span>
            </div>
        </div>
        <div class="orderDetailsCenter">
            <el-tabs type="border-card">
                <el-tab-pane label="合同要素">
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
                </el-tab-pane>
                <el-tab-pane label="合同">
                    <div class="pay-wrapper">
                        <div v-if="buyunilateralTransaction">
                            <div class="title1">采购合同信息</div>
                            <div class="gy-form-group">
                                <span class="l">采购合同编号</span>
                                <span>{{sellerInfoContract.contractCode}}</span>
                            </div>
                            <div class="gy-form-group">
                                <span class="l">采购合同</span>
                                <span v-if="sellerInfoContract.fileAttachList && sellerInfoContract.fileAttachList.length !== 0"
                                      @click="showImg( '', 8)"><i class="iconfont icon-photo"></i></span>
                                <span v-else-if="sellerInfoContract.fileDocUrl && sellerInfoContract.fileDocUrl.length !== 0"
                                      @click="showImg('', 9)"><i class="iconfont icon-photo"></i></span>
                                <span v-else><i class="iconfont icon-photo-null"></i></span>
                            </div>
                            <template v-if="procurementContract.approveStatus === 9">
                                <div class="gy-form-group">
                                    <span class="l">盖章合同</span>
                                    <span v-if="sellerInfoContract.fileAttachCertifiedList && sellerInfoContract.fileAttachCertifiedList.length !== 0"
                                          @click="showImg( '', 10)"><i class="iconfont icon-photo"></i></span>
                                    <span v-else><i class="iconfont icon-photo-null"></i></span>
                                </div>
                                <div class="gy-form-group">
                                    <span class="l">盖章合同备注</span>
                                    <span>{{sellerInfoContract.executeRemarks}}</span>
                                </div>
                            </template>
                        </div>
                        <div v-if="saleunilateralTransaction">
                            <div class="title1">销售合同信息</div>
                            <div class="gy-form-group">
                                <span class="l">销售合同编号</span>
                                <span>{{buyerInfoContract.contractCode}}</span>
                            </div>
                            <div class="gy-form-group">
                                <span class="l">销售合同</span>
                                <span v-if="buyerInfoContract.fileAttachList && buyerInfoContract.fileAttachList.length !== 0"
                                      @click="showImg( '', 11)"><i class="iconfont icon-photo"></i></span>
                                <span v-else-if="buyerInfoContract.fileDocUrl && buyerInfoContract.fileDocUrl.length !== 0"
                                      @click="showImg('', 12)"><i class="iconfont icon-photo"></i></span>
                                <span v-else><i class="iconfont icon-photo-null"></i></span>
                            </div>
                            <template v-if="procurementContract.approveStatus === 9">
                                <div class="gy-form-group">
                                    <span class="l">盖章合同</span>
                                    <span v-if="buyerInfoContract.fileAttachCertifiedList && buyerInfoContract.fileAttachCertifiedList.length !== 0"
                                          @click="showImg( '', 13)"><i class="iconfont icon-photo"></i></span>
                                    <span v-else><i class="iconfont icon-photo-null"></i></span>
                                </div>
                                <div class="gy-form-group">
                                    <span class="l">盖章合同备注</span>
                                    <span>{{buyerInfoContract.executeRemarks}}</span>
                                </div>
                            </template>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="收付款" class="money">
                    <div class="title2">收款信息</div>
                    <div class="order-payment-item">
                        <div class="gy-form-group" style="width: 100%">
                            <span class="l">下游公司</span>
                            <span>{{orderDetailList.buyerCompanyName}}</span>
                        </div>

                        <div class="gy-form-group">
                            <span class="l">合同金额(元)</span>
                            <span>{{collectionList.contractAmount | numToCash}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">待收金额(元)</span>
                            <span>{{collectionList.needCollectionTotal | numToCash}}</span>
                        </div>
                    </div>
                    <div style="clear: both"></div>
                    <div class="min-title">收款记录</div>
                    <div class="order-skjl">
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
                                <td>
                                <span v-if="item.erpCollectionFileModelList.length !== 0" @click="showImg(index, 7)"><i
                                        class="iconfont icon-photo"></i></span>
                                    <span v-else><i class="iconfont icon-photo-null"></i></span>
                                </td>
                                <td>
                                <span v-if="item.erpBuyerPaymentFileModelList.length !== 0" @click="showImg(index, 15)"><i
                                        class="iconfont icon-photo"></i></span>
                                    <span v-else><i class="iconfont icon-photo-null"></i></span>
                                </td>
                                <td>{{item.collectionAmount | numToCash}}</td>
                                <td>{{$constant.collectionType[item.collectionType]}}</td>
                                <td>{{item.collectionDate | date}}</td>
                                <td><button style="color: #4A90E2;background: white;cursor: pointer" @click="lookRecelive(item)">查看</button></td>
                            </tr>
                            </tbody>
                            <tbody v-else>
                            <tr>
                                <td colspan="10" style="text-align: center;">暂无数据</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--<div v-else style="text-align: center">没有可显示的数据</div>-->
                    <div class="title2">付款信息</div>
                    <div class="order-payment-item">
                        <div class="gy-form-group" style="width: 100%">
                            <span class="l">上游公司</span>
                            <span>{{orderDetailList.sellerCompanyName}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">合同金额(元)</span>
                            <span>{{paymentRece.contractAmount | numToCash}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">待付金额(元)</span>
                            <span>{{paymentRece.needPaymentTotal | numToCash}}</span>
                        </div>
                    </div>
                    <div style="clear: both"></div>
                    <div class="min-title">付款记录</div>
                    <div class="my-pay-table-box">
                        <table class="gy-table">
                            <thead>
                            <tr>
                                <th>编号</th>
                                <th>状态</th>
                                <th>付款凭证</th>
                                <th>付款金额(元)</th>
                                <th>付款用途</th>
                                <th>申请日期</th>
                                <th>出账日期</th>
                                <th>收款单位</th>
                                <th>开户行</th>
                                <th>银行账号</th>
                                <th>交易类型</th>
                                <th>经办人</th>
                                <th>备注</th>
                                <th>说明</th>
                            </tr>
                            </thead>
                            <tbody v-if="paymentRece.list && paymentRece.list.length !== 0">
                            <tr v-for="(item, index) in paymentRece.list" :key="index">
                                <td>{{item.id}}</td>
                                <td>{{item.approveStatusStr}}</td>
                                <td>
                                <span v-if="item.paymentVoucher && item.paymentVoucher.length !== 0"
                                      @click="showImg(index, 6)"><i class="iconfont icon-photo"></i></span>
                                    <span v-else><i class="iconfont icon-photo-null"></i></span>
                                </td>
                                <td>{{item.payTotalStr | numToCash}}</td>
                                <td>{{item.payMethodStr}}</td>
                                <td>{{item.createdDate | date}}</td>
                                <td><span v-if="item.approveStatus === 1">{{item.payTime | date}}</span></td>
                                <td>{{item.sellerCorpName}}</td>
                                <td>{{item.sellerDepositBank}}</td>
                                <td>{{item.sellerAccount}}</td>
                                <td>{{item.tradeModeStr}}</td>
                                <td>{{item.createUserName}}</td>
                                <td style="max-width: 200px;">{{item.remarks}}</td>
                                <td>{{item.payDescStr}}
                                    <el-popover
                                            placement="top-start"
                                            width="360"
                                            trigger="hover">
                                        <el-table :data="item.paymentInfoModels">
                                            <el-table-column label="序号" width="60" type="index"></el-table-column>
                                            <el-table-column label="申请金额(元)" width="120">
                                                <template slot-scope="scope">
                                                  <span>{{scope.row.payAmount | numToCash}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column property="description" label="备注"
                                                             width="150"></el-table-column>
                                        </el-table>
                                        <el-button type="text" slot="reference" v-if="item.payDesc == 3">查看明细
                                        </el-button>
                                    </el-popover>
                                </td>
                            </tr>
                            </tbody>
                            <tbody v-else>
                            <tr>
                                <td colspan="10" style="text-align: center;">暂无数据</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--<div v-else style="text-align: center">没有可显示的数据</div>-->
                </el-tab-pane>
                <el-tab-pane label="交割" class="money">
                    <div class="title2">采购交割</div>
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
                            <span>{{purchaseList.skuQuantity}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">免仓期(天)</span>
                            <span>{{purchaseList.warehouseFreeDays}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l" style="width: 116px">待交割数量(吨)</span>
                            <span>{{purchaseList.surplusDeliveryQuantity}}</span>
                        </div>
                    </div>
                    <div class="min-title">交割记录</div>
                    <el-table
                            :data="purchaseList.deliveryEntityList"
                            style="width: 100%"
                            class="gy-table">
                        <el-table-column
                                label="编号"
                                fixed
                                width="80">
                            <template slot-scope="item">
                                {{item.row.deliveryItemId}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="状态"
                                width="100">
                            <template slot-scope="item">
                                {{item.row.deliveryStatus | buyDeliveryItemState}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="交割凭证"
                                width="150">
                            <template slot-scope="item">
                        <span v-if="item.row.erpDeliveryFileModelList.length !== 0" @click="showImg(item.row.erpDeliveryFileModelList, 1)"><i
                                class="iconfont icon-photo"></i></span>
                                <span v-else><i class="iconfont icon-photo-null"></i></span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="交割数量(吨)">
                            <template slot-scope="item">
                                {{item.row.deliveryQuantity}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="交割日">
                            <template slot-scope="item">
                                {{item.row.deliveryDate | date}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="创建时间">
                            <template slot-scope="item">
                                {{item.row.createdDate | date(1)}}
                            </template>
                        </el-table-column>
                    </el-table>
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
                            <span>{{saleList.skuQuantity}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">免仓期(天)</span>
                            <span>{{saleList.warehouseFreeDays}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l" style="width: 116px">待交割数量(吨)</span>
                            <span>{{saleList.surplusDeliveryQuantity}}</span>
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
                                width="80">
                            <template slot-scope="item">
                                {{item.row.deliveryItemId}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="状态"
                                width="100">
                            <template slot-scope="item">
                                {{item.row.deliveryStatus | sellDeliveryItemState}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="交割凭证"
                                width="150">
                            <template slot-scope="item">
                        <span v-if="item.row.erpDeliveryFileModelList.length !== 0" @click="showImg(item.row.erpDeliveryFileModelList, 1)"><i
                                class="iconfont icon-photo"></i></span>
                                <span v-else><i class="iconfont icon-photo-null"></i></span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="交割数量(吨)"
                                width="120">
                            <template slot-scope="item">
                                {{item.row.deliveryQuantity}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="交割日"
                                width="120">
                            <template slot-scope="item">
                                {{item.row.deliveryDate | date}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="交叉交割"
                                width="100">
                            <template slot-scope="item">
                                {{item.row.acrossDelivery | acrossDelivery }}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="交叉采购合同"
                                width="150">
                            <template slot-scope="item">
                      <span v-if="item.row.acrossDelivery == 1 && item.row.erpFileContractModelList.length !== 0"
                            @click="showImg(index, 3)"><i
                              class="iconfont icon-photo"></i></span>
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
                                fixed="right"
                                label="操作">
                            <template slot-scope="item">
                                <button class="gy-button-view view" @click="jump(item.row)">查看</button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="发票" class="billing">
                    <div class="title2">收票信息 <el-button type="text" @click="buyLinkInvoice" class="linkInvoice" v-if="!noCollectTickets">查看详情</el-button></div>
                    <div v-if="!noCollectTickets">
                        <div class="lll" style="height:120px">
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
                                <span>{{collectTicketReceipt.quantity}}</span>
                            </div>
                            <div class="gy-form-group">
                                <span class="l">单价(含税/元)</span>
                                <span>{{collectTicketReceipt.productUnitPrice | numToCash}}</span>
                            </div>
                            <div class="gy-form-group">
                                <span class="l">收票凭证</span>
                                <span>
                              <span v-if="collectTicketReceipt.receiptInvoiceUrlList && collectTicketReceipt.receiptInvoiceUrlList.length !== 0"
                                    @click="showImg(index, 5)"><i class="iconfont icon-photo"></i></span>
                              <span v-else><i class="iconfont icon-photo-null"></i></span>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div v-if="noCollectTickets" class="noinvoiceStyle">没有可显示的收票信息</div>
                    <div class="title2">开票信息  <el-button type="text" @click="sellLinkInvoice" class="linkInvoice"  v-if="!noInvoice">查看详情</el-button></div>
                    <div v-if="!noInvoice">
                        <div class="gy-form-group">
                            <span class="l">下游公司</span>
                            <span>{{collectTickets.buyerName}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">申请日期</span>
                            <span>{{collectTickets.date | date}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">开票单位名称</span>
                            <span>{{collectTickets.buyerName}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">开票数量(吨)</span>
                            <span>{{collectTickets.quantity}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">税号</span>
                            <span>{{collectTickets.buyerTaxCode}}</span>
                        </div>

                        <div class="gy-form-group">
                            <span class="l">开票总金额(元)</span>
                            <span>{{collectTickets.amount | numToCash}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">开户银行</span>
                            <span>{{collectTickets.buyerName}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">发票月份</span>
                            <span>{{collectTickets.provideInvoiceType|invoiceMonthValue(collectTickets)}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">银行账号</span>
                            <span>{{collectTickets.buyerBankName}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">商品税务编码</span>
                            <span>{{collectTickets.productTaxCode}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">转让货权总数量(吨)</span>
                            <span>{{collectTickets.deliveredProductQuantity}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">进项票</span>
                            <span>{{collectTickets.hasReceiptInvoice === 0 ? '无进项票': '有进项票'}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">已收上游发票(元)</span>
                            <span>{{collectTickets.receiptInvoiceAmount | numToCash}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">经办人</span>
                            <span>{{collectTickets.operationUserName}}</span>
                        </div>
                        <div class="gy-form-group cl">
                            <span class="l">收款凭证</span>
                            <span v-if="collectTickets.collectionFileList && collectTickets.collectionFileList.length !== 0"
                                  @click="showImg(index, 14)"><i class="iconfont icon-photo"></i></span>
                            <span v-else><i class="iconfont icon-photo-null"></i></span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">开票凭证</span>
                            <span v-if="collectTickets.invoiceVoucherList && collectTickets.invoiceVoucherList.length !== 0"
                                  @click="showImg(index, 16)"><i class="iconfont icon-photo"></i></span>
                            <span v-else><i class="iconfont icon-photo-null"></i></span>
                        </div>
                        <div style="clear: both"></div>
                        <div class="gy-form-group">
                            <span class="l">快递单号</span>
                            <span>{{collectTickets.expressCode}}</span>
                        </div>
                    </div>
                    <div v-if="noInvoice" class="noinvoiceStyle">没有可显示的开票信息</div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <dialog-img v-if="dialogVisible" @closedialogvisible="closedialogvisible" :dialogVisible="dialogVisible"
                    :dialogImg="erpCollectionFileModelList"></dialog-img>
    </div>
</template>
<script>
import step from '../../components/step';
import gyPayment from './orderDetail/paymentAssembly.vue';
import gyDelivery from './orderDetail/deliveryAssembly.vue';
import gyInvoice from './orderDetail/invoiceAssembly.vue';
import dialogImg from './../components/dialogImg';
import contSell from './../contract/sell';
import contBuy from './../contract/buy';
export default {
    name: 'orderDetails',
    components: {
        gyPayment,
        gyDelivery,
        gyInvoice,
        dialogImg,
        step,
        contSell,
        contBuy
    },
    data () {
        return {
            payStatus: 2,
            stepArr: [],
            id: null,
            purchaseOrderId: null,
            saleOrderId: null,
            orderDetailList: [], // 订单明细
            sellerInfos: [],
            buyerInfos: [],
            procurementContract: [], // 采购合同
            sellerInfoContract: {
                fileAttachList: []
            },
            buyerInfoContract: {
                fileAttachList: []
            },
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
            homeFromFlg: 0, // 1:表示从首页跳转来
            homeBizType: 0,
            noInvoice: false, // 开票
            noCollectTickets: false, // 收票
            buyunilateralTransaction: false, // 买方单边交易
            saleunilateralTransaction: false, // 卖方单边交易
            dialogVisible: false,
            erpCollectionFileModelList: [] // 图片查看
        };
    },
    mounted () {
        this.purchaseOrderId = this.$route.query.purchaseOrderId;
        this.saleOrderId = this.$route.query.saleOrderId;
        this.id = this.$route.query.id;
        this.orderDetail(); // 订单明细
        this.contractDetail(); // 合同明细
        this.sale();
        this.purchase();
        this.collectTicketsSales();
        this.collectTicketSreceipt();
        this.paymentReceiv();// 付款
        this.paymentColl();
    },
    created () {
        let me = this;
        if (this.$route.query.homeFromFlg === 1) {
            // 从首页跳转来
            me.homeFromFlg = 1;
            me.homeBizType = this.$route.query.homeBizType;
            if (me.homeBizType === 3) {

            }
        }
    },
    computed: {
    },
    methods: {
        // 收款查看
        lookRecelive (val) {
            this.$router.push({name: 'paymentSell', query: {homeBizType: 5, contEssId: this.id, collId: val.id}});
        },
        // 上传发票
        settleInfoImg (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            that.$http.post(that.$api.upload.imgUpload, formData, headers)
                .then(function (res) {
                    that.ComentList.receiptList.push(res.data.data);
                });
        },
        // 上传发票
        newInfoImg (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            that.$http.post(that.$api.upload.imgUpload, formData, headers)
                .then(function (res) {
                    that.newReceiptsList.erpCollectionFileModelList.push({
                        fileUrl: res.data.data
                    });
                });
        },
        // 订单明细
        orderDetail () {
            let that = this;
            that.$http.get(that.$api.order.orderDetail + '/' + that.id)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.orderDetailList = res.data.data;
                        that.sellerInfos = res.data.data.sellerInfo;
                        that.buyerInfos = res.data.data.buyerInfo;
                        if (that.orderDetailList.contractType === 1 || that.orderDetailList.contractType === 2) {
                            that.buyunilateralTransaction = true;
                        }
                        if (that.orderDetailList.contractType === 1 || that.orderDetailList.contractType === 3) {
                            that.saleunilateralTransaction = true;
                        }
                    }
                });
        },
        jump (item) {
            let query = {
                contEssId: item.contractEssenceId,
                todoId: item.todoId,
                dlvItemId: item.deliveryItemId,
                homeFromFlg: 1,
                homeBizType: 8
            };
            this.$router.push({name: 'deliverySalesView', query: query});
        },
        // 采购合同
        contractDetail () {
            let that = this;
            that.$http.get(that.$api.order.orderDetail + '/' + that.id)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.procurementContract = res.data.data;
                        that.sellerInfoContract = res.data.data.sellerInfo;
                        that.buyerInfoContract = res.data.data.buyerInfo;
                    }
                });
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
                        // 查看明细的内容存储
                        for (let i = 0; i < that.paymentRece.list.length; i++) {
                            if (that.paymentRece.list[i].payDesc === 3) {
                                that.$http.get(that.$api.payment.paymentInfoList + that.paymentRece.list[i].id).then(function (response) {
                                    if (response.data.code === 0) {
                                        that.$set(that.paymentRece.list[i], 'paymentInfoModels', response.data.data.paymentInfoModels);
                                    } else {
                                        that.$alert(response.data.code + ' ' + response.data.message);
                                    }
                                }).catch((e) => {
                                    console.log(e);
                                });
                            }
                        }
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
                        console.log(that.saleList);
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
                            } else {
                                that.noInvoice = true;
                            }
                        }
                    });
            }
        },
        // 图片预览
        showImg (idx, type) {
            this.dialogVisible = true;
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
                let PVoucher = this.paymentRece.list[idx].paymentVoucher.split(',');
                PVoucher.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 7:// 收款记录-收款凭证
                this.erpCollectionFileModelList = this.collectionList.erpCollectionModelList[idx].erpCollectionFileModelList;
                break;
            case 8:// 采购合同
                this.sellerInfoContract.fileAttachList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 9:// 采购合同
                this.sellerInfoContract.fileDocUrl.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 10:// 采购盖章合同
                this.sellerInfoContract.fileAttachCertifiedList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 11:// 销售合同
                this.buyerInfoContract.fileAttachList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 12:// 销售合同
                this.buyerInfoContract.fileDocUrl.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 13:// 销售盖章合同
                this.buyerInfoContract.fileAttachCertifiedList.forEach((e) => {
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
                this.dialogVisible = false;
                break;
            }
        },
        closedialogvisible () {
            this.dialogVisible = false;
        },
        buyLinkInvoice () {
            this.$router.push({name: 'financialConfirmation', query: { id: this.id, saleOrderId: this.saleOrderId, purchaseOrderId: this.purchaseOrderId, doneFlg: 1 }});
        },
        sellLinkInvoice () {
            this.$router.push({name: 'auditOperation', query: { id: this.id, saleOrderId: this.saleOrderId, purchaseOrderId: this.purchaseOrderId, doneFlg: 1 }});
        }
    }
};
</script>

<style lang="scss" scoped>
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
            margin-bottom: 30px;
            &:after {
                display: block;
                clear: both;
                content: ' ';
            }
            .gy-form-group {
                padding: 8px 30px 8px 110px;
                .l {
                    width: 71px;
                }
            }
        }
        .orderDetailsCenter {
            margin: 0 16px;
            .gy-form-group {
                .l {
                    margin-left: 0px;
                }
            }
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
    }

    .title {
        font-size: 16px;
        color: #333333;
        margin: 20px 0 20px 16px;
        font-weight: 600;
    }

    .title1 {
        font-size: 14px;
        color: #333333;
        margin: 0 0 20px 0;
        font-weight: 600;
    }
    .title2{
        font-size: 16px;
        color: #333333;
        margin: 20px 0 20px 0;
        font-weight: 600;
    }

    .min-title {
        @extend .title;
        font-size: 14px;
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
        .el-tabs {
            .lll {
                width: 100%;
                height: 210px;
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
