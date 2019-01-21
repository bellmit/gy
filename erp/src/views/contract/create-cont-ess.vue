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
                            <el-select v-model="data.bizType" placeholder="请选择" @change="getCompany">
                                <el-option v-for="(item, index) in $constant.bizType4CreateEss" :key="index"
                                           :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title">
                            <el-checkbox v-model="unilateral" @change="onUnilateral"></el-checkbox>
                            单边交易
                        </div>
                        <div class="essential-text">
                            <el-select v-model="data.contractType" placeholder="请选择" :disabled="!unilateral">
                                <el-option v-for="(item, index) in $constant.contractTypeList" :key="index"
                                           :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="essential-row">
                    <div class="essential-item">
                        <div class="essential-title"><span class="isMust">*</span>业务操作人</div>
                        <div class="essential-text">
                            <el-select v-model="businessManageridx" placeholder="请选择" @change="businessManagerchk">
                                <el-option v-for="(item, index) in businessManager" :key="index" :label="item.userName"
                                           :value="index">
                                    <span>{{item.userName}}</span>
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title"><span class="isMust">*</span>业务组</div>
                        <div class="essential-text">
                            <el-select placeholder="请选择" v-model="srOrganizationIdx" @change="checkGroup">
                                <el-option v-for="(item, index) in businessManagerGroup" :key="index"
                                           :label="item.orgName" :value="index">
                                    <span>{{item.orgName}}</span>
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pay-wrapper">
            <div v-if="!(data.contractType === 3 && unilateral)" class="essential-information">
                <p class="paydetail-title">上游公司信息</p>
                <div class="essential-wrapper" style="padding-bottom:10px">
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">我方公司</div>
                            <div class="essential-text">
                                <el-select v-model="targetCorpIdbuy" placeholder="请选择" @change="checktargetCorpbuy">
                                    <el-option v-for="(item, index) in relatedCompany" :key="index"
                                               :label="item.targetCorpName" :value="index">
                                        <span>{{item.targetCorpName}}</span>
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>上游公司</div>
                            <div class="essential-text">
                                <input type="text" placeholder="请输入上游公司名" v-model="data.sellerInfo.companyName"
                                       @click="checkCompany('卖')">
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>交易对手评级</div>
                            <div class="essential-text">
                                <input type="text" disabled placeholder="请选择交易对手评级" v-model="sellerTrade">
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>产品名称</div>
                            <div class="essential-text">
                                <el-select v-model="sellerInfoProd" placeholder="请选择"
                                           @visible-change="openPro($event, 2)" @change="checkPro('卖')">
                                    <el-option v-for="(item, index) in proType" :key="index" :label="item.goodsName"
                                               :value="index">
                                        <span>{{item.goodsName}}</span>
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>数量</div>
                            <div class="essential-text">
                                <input type="text" v-model="data.sellerInfo.skuQuantity" placeholder="请输入产品数量">
                                <span class="unit">吨</span>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>单价(含税)</div>
                            <div class="essential-text">
                                <input type="text" v-model="data.sellerInfo.skuPrice" placeholder="请输入产品单价">
                                <span class="unit">元</span>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">保证金</div>
                            <div class="essential-text">
                                <input type="text" v-model="data.sellerInfo.depositRatio" placeholder="请输入保证金比例">
                                <span class="unit">%</span>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">追保约定</div>
                            <div class="essential-text cont-ess-zbyd">
                                <div class="q">跌</div>
                                <div class="w"><input type="text" style="text-align: center"
                                                      v-model="data.sellerInfo.depositRatioSubtract"></div>
                                <div class="e">%</div>
                                <div class="r"><span style="padding-left: 20%;text-align: right">补</span></div>
                                <div class="t"><input type="text" style="text-align: center"
                                                      v-model="data.sellerInfo.depositRatioAppend"></div>
                                <div class="y">%</div>
                                <div class="u">
                                    <el-tooltip class="tooltip" effect="light" content="价格标准以安迅思华东区的价格为准"
                                                placement="top">
                                        <i class="iconfont icon-priceTool"></i>
                                    </el-tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>交割库</div>
                            <div class="essential-text">
                                <el-select v-model="warehouseidxsell" placeholder="请选择"
                                           @visible-change="openPro($event, 4)" @change="warehouseidxsells">
                                    <el-option v-for="(item, index) in sellDeliveryBank" :key="index"
                                               :label="item.warehouseName" :value="index">
                                        <span>{{item.warehouseName}}</span>
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>交割日期</div>
                            <div class="essential-text" style="flex-direction: column">
                                <div>
                                    <el-select v-model="data.sellerInfo.deliveryDateFlag" placeholder="请选择">
                                        <el-option v-for="(item, index) in $constant.deliveryDateFlag" :key="index"
                                                   :label="item.name" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="essential-text" style="margin-right: 0">
                                    <div class="d">
                                        <el-date-picker
                                                v-model="data.sellerInfo.deliveryBeginDate"
                                                type="date"
                                                value-format="timestamp"
                                                @change="pickertime(1)"
                                                :placeholder="data.sellerInfo.deliveryDateFlag === 2 ? '截止日期':'开始日期'">
                                        </el-date-picker>
                                    </div>
                                    <template v-if="data.sellerInfo.deliveryDateFlag !== 2">
                                        <div class="c">-</div>
                                        <div class="d">
                                            <el-date-picker
                                                    v-model="data.sellerInfo.deliveryEndDate"
                                                    type="date"
                                                    @change="pickertime(2)"
                                                    value-format="timestamp"
                                                    placeholder="结束日期">
                                            </el-date-picker>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>交割方式</div>
                            <div class="essential-text">
                                <el-select v-model="data.sellerInfo.deliveryType" placeholder="请选择">
                                    <el-option v-for="(item, index) in $constant.deliveryList" :key="index"
                                               :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">免仓期</div>
                            <div class="essential-text">
                                <input type="text" v-model="data.sellerInfo.warehouseFreeDays" placeholder="请输入天数">
                                <span class="unit">天</span>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>付款方式</div>
                            <div class="essential-text">
                                <el-select v-model="data.sellerInfo.paymentType" placeholder="请选择">
                                    <el-option v-for="(item, index) in $constant.paymentType" :key="index"
                                               :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="data.sellerInfo.payChannel" placeholder="请选择">
                                    <el-option v-for="(item, index) in $constant.paymentType1" :key="index"
                                               :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>发票月份</div>
                            <div class="essential-text">
                                <el-radio-group v-model="data.sellerInfo.provideInvoiceType">
                                    <el-radio :label="1">交割月</el-radio>
                                    <el-radio :label="2">交割次月</el-radio>
                                    <el-radio :label="3">交割后</el-radio>
                                    <div v-if="data.sellerInfo.provideInvoiceType === 3 || data.sellerInfo.provideInvoiceType === '3'"
                                         style="font-size: 13px"><input type="text" style="width: 50px"
                                                                        v-model="data.sellerInfo.provideInvoiceDays">工作日
                                    </div>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>货源</div>
                            <div class="essential-text">
                                <el-select v-model="data.sellerInfo.skuOrigin" placeholder="请选择">
                                    <el-option v-for="(item, index) in $constant.sourceGoods" :key="index"
                                               :label="item.name" :value="item.name">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>包装标准</div>
                            <div class="essential-text">
                                <el-radio-group v-model="data.sellerInfo.packagingStandard">
                                    <el-radio :label="0">散水</el-radio>
                                    <el-radio :label="1">桶装</el-radio>
                                    <el-radio :label="2">袋装</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row" v-if="data.bizType === 5">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust"></span>上游合约</div>
                            <div class="essential-text" style="flex-direction: column">
                                <div>
                                    <el-select v-model="data.sellerInfo.longtermContractFlag" placeholder="请选择">
                                        <el-option v-for="(item, index) in $constant.downstreamLongTerm" :key="index"
                                                   :label="item.name" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="essential-text" style="margin-right: 0" v-if="data.sellerInfo.longtermContractFlag === 1">
                                    <div class="d">
                                        <input type="text" placeholder="请选择上游合约编号" v-model="data.sellerInfo.contractCode">
                                        <i class="iconfont icon-search" @click="onSeachContract('上游')"
                                           style="position: absolute;right: 5px;top: 7px;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">备注</div>
                            <div class="essential-text">
                                <textarea name="" class="gy-textarea" v-model="sellerRemarks" cols="30"
                                          rows="10"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!(data.contractType === 2 && unilateral)" class="essential-information">
                <p class="paydetail-title">下游公司信息</p>
                <div class="essential-wrapper" style="padding-bottom:10px">
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">我方公司</div>
                            <div class="essential-text">
                                <el-select v-model="targetCorpIdbuy" placeholder="请选择" @change="checktargetCorpbuy">
                                    <el-option v-for="(item, index) in relatedCompany" :key="index"
                                               :label="item.targetCorpName" :value="index">
                                        <span>{{item.targetCorpName}}</span>
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>下游公司</div>
                            <div class="essential-text">
                                <input type="text" placeholder="请输入下游公司名" v-model="data.buyerInfo.companyName"
                                       @click="checkCompany('买')">
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>交易对手评级</div>
                            <div class="essential-text">
                                <input type="text" disabled placeholder="请选择交易对手评级" v-model="buyerTrade">
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>产品名称</div>
                            <div class="essential-text">
                                <el-select v-model="buyerInfoProd" placeholder="请选择"
                                           @visible-change="openPro($event, 1)" @change="checkPro('买')">
                                    <el-option v-for="(item, index) in proType" :key="index" :label="item.goodsName"
                                               :value="index">
                                        <span>{{item.goodsName}}</span>
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>数量</div>
                            <div class="essential-text">
                                <input type="text" v-model="data.buyerInfo.skuQuantity" placeholder="请输入产品数量">
                                <span class="unit">吨</span>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>单价(含税)</div>
                            <div class="essential-text">
                                <input type="text" v-model="data.buyerInfo.skuPrice" placeholder="请输入产品单价">
                                <span class="unit">元</span>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">保证金</div>
                            <div class="essential-text">
                                <input type="text" v-model="data.buyerInfo.depositRatio" placeholder="请输入保证金比例">
                                <span class="unit">%</span>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">追保约定</div>
                            <div class="essential-text cont-ess-zbyd">
                                <div class="q">跌</div>
                                <div class="w"><input type="text" style="text-align: center"
                                                      v-model="data.buyerInfo.depositRatioSubtract"></div>
                                <div class="e">%</div>
                                <div class="r">补</div>
                                <div class="t"><input type="text" style="text-align: center"
                                                      v-model="data.buyerInfo.depositRatioAppend"></div>
                                <div class="y">%</div>
                                <div class="u">
                                    <el-tooltip class="tooltip" effect="light" content="价格标准以安迅思华东区的价格为准"
                                                placement="top">
                                        <i class="iconfont icon-priceTool"></i>
                                    </el-tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>交割库</div>
                            <div class="essential-text">
                                <el-select v-model="warehouseidxbuy" placeholder="请选择"
                                           @visible-change="openPro($event, 3)" @change="warehouseidxbuys">
                                    <el-option v-for="(item, index) in buyDeliveryBank" :key="index"
                                               :label="item.warehouseName" :value="index">
                                        <span>{{item.warehouseName}}</span>
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>交割日期</div>
                            <div class="essential-text" style="flex-direction: column">
                                <div>
                                    <el-select v-model="data.buyerInfo.deliveryDateFlag" placeholder="请选择">
                                        <el-option v-for="(item, index) in $constant.deliveryDateFlag" :key="index"
                                                   :label="item.name" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="essential-text" style="margin-right: 0">
                                    <div class="d">
                                        <el-date-picker
                                                v-model="data.buyerInfo.deliveryBeginDate"
                                                type="date"
                                                value-format="timestamp"
                                                @change="pickertime(3)"
                                                :placeholder="data.buyerInfo.deliveryDateFlag === 2 ? '截止日期':'开始日期'">
                                        </el-date-picker>
                                    </div>
                                    <template v-if="data.buyerInfo.deliveryDateFlag !== 2">
                                        <div class="c">-</div>
                                        <div class="d">
                                            <el-date-picker
                                                    v-model="data.buyerInfo.deliveryEndDate"
                                                    type="date"
                                                    @change="pickertime(4)"
                                                    value-format="timestamp"
                                                    placeholder="结束日期">
                                            </el-date-picker>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>交割方式</div>
                            <div class="essential-text">
                                <el-select v-model="data.buyerInfo.deliveryType" placeholder="请选择">
                                    <el-option v-for="(item, index) in $constant.deliveryList" :key="index"
                                               :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">免仓期</div>
                            <div class="essential-text">
                                <input type="text" v-model="data.buyerInfo.warehouseFreeDays" placeholder="请输入天数">
                                <span class="unit">天</span>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>付款方式</div>
                            <div class="essential-text">
                                <el-select v-model="data.buyerInfo.paymentType" placeholder="请选择">
                                    <el-option v-for="(item, index) in $constant.paymentType" :key="index"
                                               :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="data.buyerInfo.payChannel" placeholder="请选择">
                                    <el-option v-for="(item, index) in $constant.paymentType1" :key="index"
                                               :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>发票月份</div>
                            <div class="essential-text">
                                <el-radio-group v-model="data.buyerInfo.provideInvoiceType">
                                    <el-radio :label="1">交割月</el-radio>
                                    <el-radio :label="2">交割次月</el-radio>
                                    <el-radio :label="3">交割后</el-radio>
                                    <div v-if="data.buyerInfo.provideInvoiceType === 3 || data.buyerInfo.provideInvoiceType === '3'"
                                         style="font-size: 13px"><input type="text" style="width: 50px"
                                                                        v-model="data.buyerInfo.provideInvoiceDays">工作日
                                    </div>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>货源</div>
                            <div class="essential-text">
                                <el-select v-model="data.buyerInfo.skuOrigin" placeholder="请选择">
                                    <el-option v-for="(item, index) in $constant.sourceGoods" :key="index"
                                               :label="item.name" :value="item.name">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>包装标准</div>
                            <div class="essential-text">
                                <el-radio-group v-model="data.buyerInfo.packagingStandard">
                                    <el-radio :label="0">散水</el-radio>
                                    <el-radio :label="1">桶装</el-radio>
                                    <el-radio :label="2">袋装</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row" v-if="data.bizType === 5">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust"></span>下游合约</div>
                            <div class="essential-text" style="flex-direction: column">
                                <div>
                                    <el-select v-model="data.buyerInfo.longtermContractFlag" placeholder="请选择">
                                        <el-option v-for="(item, index) in $constant.downstreamLongTerm" :key="index"
                                                   :label="item.name" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="essential-text" style="margin-right: 0" v-if="data.buyerInfo.longtermContractFlag === 1">
                                    <div class="d">
                                        <input type="text" placeholder="请选择下游合约编号" v-model="data.buyerInfo.contractCode">
                                        <i class="iconfont icon-search" @click="onSeachContract('下游')"
                                           style="position: absolute;right: 5px;top: 7px;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">备注</div>
                            <div class="essential-text">
                                <textarea name="" class="gy-textarea" v-model="buyerRemarks" cols="30"
                                          rows="10"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="essential-wrapper isUnilateral" style="padding-top:0px" v-if="unilateral && (data.bizType === 5 || data.bizType === 4)">
            <div class="gy-form-group">
                <span class="l" style="margin-left:10px">单边关联</span>
                <template>
                    <!-- `checked` 为 true 或 false -->
                    <el-checkbox v-model="unilateralRelevance.isUnilateralCorrelation" true-label="1"
                                 false-label="0"></el-checkbox>
                </template>
            </div>
            <div class="gy-form-group cl" v-if="unilateralRelevance.isUnilateralCorrelation === '1'">
                <span class="l" style="margin-left:0px"><i class="i">* </i>单边合同编号</span>
                <input type="text" v-model="unilateralRelevance.contractCode">
                <i class="iconfont icon-search" style="position: absolute;top: 10px;right: 20px;"
                   @click="onSeachContract('单边')"></i>
            </div>
            <div class="gy-form-group" v-if="unilateralRelevance.isUnilateralCorrelation === '1'">
                <span class="l" v-if="data.contractType === 2">单边销售合同</span>
                <span class="l" v-if="data.contractType === 3">单边采购合同</span>
                <div v-if="deliveryContractType !== 'pdf'" v-for="(item, index) in deliveryContractList" :key="index"
                     style="display: inline-block;height: 50px;width: 50px;margin-left: 5px;">
                    <img :src="item.fileUrl" @click="deliverContractAssembleVisible = true"
                         style="width: 50px;height:50px;cursor: pointer">
                </div>
                <div v-if="deliveryContractType === 'pdf'"
                     style="display: inline-block;height: 50px;width: 50px;margin-left: 5px;">
                    <i class="iconfont icon-photo"></i>
                </div>
            </div>
        </div>
        <div class="foot">
            <!--<button type="button" class="gy-button-normal">取消</button>-->
            <button type="button" v-gy-auth="'to_create_cont_ess'" class="gy-button-extra confirmations"
                    @click="onsubmit">提交
            </button>
        </div>
        <el-dialog title="图片预览" :visible.sync="deliverContractAssembleVisible" width="1000px"
                   custom-class="dialog-erp-cont">
            <div class="block" style="width: 100%" v-for="(item, index) in deliveryContractList" :key="index">
                <!--<img :src="item.fileUrl" alt="" width="100%" height="100%">-->
                <img v-if="$constant.imgType.indexOf(item.fileUrl.split('.').pop().toLowerCase()) !== -1"
                     :src="item.fileUrl" alt="" width="100%" height="auto">
                <iframe v-if="item.fileUrl.split('.').pop().toLowerCase() === 'pdf'" :src="item.fileUrl" frameborder="0"
                        id="" width="100%" style="min-height: 490px"></iframe>
                <iframe v-if="$constant.fileType.indexOf(item.fileUrl.split('.').pop().toLowerCase()) !== -1"
                        :src="'https://view.officeapps.live.com/op/view.aspx?src='+ item.fileUrl" frameborder='0'
                        width="100%" style="min-height: 490px"></iframe>
            </div>
        </el-dialog>
        <el-dialog width="1200px" class="order-dialog" :title="currContractType === 2? '选择销售合同' : '选择采购合同'" :visible.sync="isShowUnilateralDialog">
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
                    <th><span v-if="currContractType === 2">下游公司</span><span v-if="currContractType === 3">上游公司</span></th>
                    <th><span v-if="currContractType === 2">销售合同编号</span><span v-if="currContractType === 3">采购合同编号</span></th>
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
                    <td>{{item.sellerCompanyName}}</td>
                    <td>{{item.contractCode}}</td>
                    <td>{{item.totalAmount|numToCash}}</td>
                    <td>{{item.deliveryWarehouseName}}</td>
                    <td>{{item.deliveryDate}}</td>
                    <td v-if="showDvlyQtyCol">{{item.canDeliveryQuantity}}</td>
                    <td v-if="showDvlyQtyCol">{{item.skuQuantity}}</td>
                    <td>{{item.warehouseFreeDays}}</td>
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
            <div class="button-wrap">
                <button class="gy-button-normal" @click="isShowUnilateralDialog = false">取消</button>
                <button class="gy-button-extra" @click="crossSubmission()">确定</button>
            </div>
        </el-dialog>
        <el-dialog width="800px" class="addDialog" :title="activeCompanyType === '卖'? '选择上游公司' : '选择下游公司'"
                   :visible.sync="dialogVisible">
            <div class="gy-form-group">
                <span class="l">{{activeCompanyType === '卖'? '上游公司' : '下游公司'}}</span>
                <div class="r">
                    <input type="text" v-model="companyName">
                </div>
                <span class="search1" @click="getCompany">
            <i class="iconfont icon-search"></i>
          </span>
            </div>
            <div class="dialog-table">
                <table class="gy-table" v-if="activeCompanyType === '卖'">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>上游公司</th>
                        <th>地区</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in sellCompanyList" :key="index">
                        <td>
            <span class="el-checkbox__input" :class="index === activeIndex?'is-checked':''" @click="checked(index)">
              <span class="el-checkbox__inner"></span>
            </span>
                        </td>
                        <td>{{item.sellerCorpName}}</td>
                        <td>{{item.address}}</td>
                    </tr>
                    </tbody>
                </table>
                <table class="gy-table" v-else>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>下游公司</th>
                        <th>地区</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in buyCompanyList" :key="index">
                        <td>
            <span class="el-checkbox__input" :class="index === activeIndex?'is-checked':''" @click="checked(index)">
              <span class="el-checkbox__inner"></span>
            </span>
                        </td>
                        <td>{{item.buyerCorpName}}</td>
                        <td>{{item.address}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
            <button class="gy-button-normal" @click="dialogVisible = false">取消</button>
            <button class="gy-button-extra confirmations" @click="checkSales()">选择</button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import Bus from '@/config/bus.js';
export default {
    data () {
        return {
            unilateralRelevance: {
                isUnilateralCorrelation: null, // 是否关联
                correlationOrderId: null, // 单边合同ID
                contractCode: null // 单边合同编号
            },
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
            sellerRemarks: null, // 备注
            buyerRemarks: null, // 备注
            userid: null, // 用户id
            organizationId: null, // 业务组id
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
            data: {
                id: null, // 合同要素ID
                bizType: null, // 业务类型
                businessManagerId: null, // 业务操作人ID
                businessManagerName: null, // 业务操作人
                usrOrganizationName: null, // 业务操作人所在组
                usrOrganizationId: null, // 业务操作人所在组ID
                contractType: null, // 单边交易（ 合同类型）
                buyerInfo: {
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
                    packagingStandard: null, // 包装标准
                    skuQuantity: null, // 数量
                    depositRatio: null, // 保证金比率（%）
                    depositRatioSubtract: null, // 保证金比率（跌）
                    depositRatioAppend: null, // 保证金比率（补）
                    warehouseFreeDays: null, // 免仓期（天）
                    deliveryType: null, // 交割方式
                    payChannel: null, // 交易类型
                    remarks: null, // 备注
                    targetCorpId: null, // 我方公司ID
                    targetCorpName: null, // 我方公司名称
                    longtermContractOrderId: null // 下游合约
                },
                sellerInfo: {
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
                    packagingStandard: null, // 包装标准
                    skuQuantity: null, // 数量
                    depositRatio: null, // 保证金比率（%）
                    depositRatioSubtract: null, // 保证金比率（跌）
                    depositRatioAppend: null, // 保证金比率（补）
                    warehouseFreeDays: null, // 免仓期（天）
                    deliveryType: null, // 交割方式
                    payChannel: null, // 交易类型
                    remarks: null, // 备注
                    targetCorpId: null, // 我方公司ID
                    targetCorpName: null, // 我方公司名称
                    longtermContractOrderId: null // 上游合约
                }
            },
            proType: [
                // {
                //     goodsName: null, // 商品名称
                //     goodsCode: null, // 商品code
                //     goodsId: null // 商品id
                // }
            ],
            unilateral: false,
            imageUrl: null,
            dialogVisible: false,
            sellCompanyList: [
                // {
                //     sellerCorpId: null, // 企业ID
                //     sellerCorpName: null, // 企业名称
                //     address: null // 地址
                // }
            ],
            buyCompanyList: [
                // {
                //     buyerCorpId: null, // 企业ID
                //     buyerCorpName: null, // 企业名称
                //     address: null // 地址
                // }
            ],
            relatedCompany: [
                // {
                //     targetCorpId: null, // 我方公司ID
                //     targetCorpName: null // 我方公司名称
                // }
            ],
            contractType: '3',
            companyName: null,
            activeCompanyType: null,
            activeIndex: null,
            buyDeliveryBank: [
                // {
                //     warehouseName: null, // 交割库名称
                //     warehouseId: null // 交割库ID
                // }
            ],
            sellDeliveryBank: [
                // {
                //     warehouseName: null, // 交割库名称
                //     warehouseId: null // 交割库ID
                // }
            ],
            buyerInfoProd: null,
            sellerInfoProd: null,
            buyerTrade: null,
            sellerTrade: null,
            targetCorpIdbuy: null,
            targetCorpIdsell: null,
            warehouseidxbuy: null,
            warehouseidxsell: null,
            businessManageridx: null,
            srOrganizationIdx: null,
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
                    name: 'usrOrganizationId',
                    msg: '请先选择业务组'
                }
            ],
            Verification1: [
                // {
                //     name: 'targetCorpId',
                //     msg: '请先选择我方公司'
                // },
                {
                    name: 'companyId',
                    msg: '请先选择上游公司或下游公司'
                },
                {
                    name: 'prdSkuId',
                    msg: '请先选择产品'
                },
                {
                    name: 'skuQuantity',
                    msg: '数量不能为空'
                },
                {
                    name: 'skuPrice',
                    msg: '单价不能为空'
                },
                {
                    name: 'deliveryWarehouseId',
                    msg: '请先选择交割库'
                },
                {
                    name: 'deliveryDateFlag',
                    msg: '请先选择交割时间'
                },
                {
                    name: 'deliveryBeginDate',
                    msg: '请先选择交割时间'
                },
                {
                    name: 'deliveryType',
                    msg: '请先选择交割方式'
                },
                {
                    name: 'paymentType',
                    msg: '请先选择付款方式'
                },
                {
                    name: 'provideInvoiceType',
                    msg: '请先选择发票月份'
                },
                {
                    name: 'skuOrigin',
                    msg: '请先选择货源'
                },
                {
                    name: 'packagingStandard',
                    msg: '请先选择包装标准'
                },
                {
                    name: 'payChannel',
                    msg: '请先选择付款方式'
                }
            ],
            Verification2: [
                {
                    name: 'deliveryEndDate',
                    msg: '请先选择交割时间'
                }
            ],
            obj: {},
            deliveryContractType: null, // 判断pdf和图片的区别
            upstreamTerm: null, // 判断长约处理字段
            currContractType: null, // 判断销售和采购对应去显示
            showDvlyQtyCol: false // (选择关联合同时)是否展示交割数量的相关列
        };
    },
    mounted () {
        this.getRelatedCompany();
        this.getGrade();
        this.businessManageridx = JSON.parse(localStorage.getItem('userInfo')).username;
        this.data.businessManagerName = this.businessManageridx;
        this.userid = JSON.parse(localStorage.getItem('userInfo')).id;
        this.getUserOrganization();
    },
    watch: {
        sellerRemarks (val) {
            if (val.length > 100) {
                this.$message({
                    message: '备注最多可填写100字',
                    type: 'warning'
                });
                this.sellerRemarks = this.sellerRemarks.substr(0, 100);
            }
            this.data.sellerInfo.remarks = this.sellerRemarks;
        },
        buyerRemarks (val) {
            if (val.length > 100) {
                this.$message({
                    message: '备注最多可填写100字',
                    type: 'warning'
                });
                this.buyerRemarks = this.buyerRemarks.substr(0, 100);
            }
            this.data.buyerInfo.remarks = this.buyerRemarks;
        }
    },
    methods: {
        // 单边交易选择框的状态变化
        onUnilateral (val) {
            if (!val) {
                this.data.contractType = null;
            }
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
        // 获取单边合同列表
        purchaseContract (vals) {
            console.log(vals);
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
                this.showDvlyQtyCol = false;

                // 这里要区分单边还是双边合同
                if (this.data.contractType === 2) {
                    // 采购
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

                    this.searchForm.bizType = 1;
                    this.currContractType = 2; // 如果是采购，则关联的销售合同
                    this.searchForm.unilateralCorrelation = 1;
                    this.searchForm.productId = this.proType[this.sellerInfoProd].goodsId;
                    this.searchForm.skuQuantity = this.data.sellerInfo.skuQuantity;
                } else if (this.data.contractType === 3) {
                    // 销售
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

                    this.searchForm.bizType = 2;
                    this.currContractType = 3; // 如果是销售，则关联的采购合同
                    this.searchForm.unilateralCorrelation = 1;
                    this.searchForm.productId = this.proType[this.buyerInfoProd].goodsId;
                    this.searchForm.skuQuantity = this.data.buyerInfo.skuQuantity;
                }
            } else {
                this.showDvlyQtyCol = true;
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
        // 销售交割-上传采购合同
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
        // 分页
        handleCurrentChangeDeliver (e) {
            this.searchForm.pageNo = e;
            this.purchaseContract();
        },
        openPro (event, type) {
            if (event && type === 1 && (this.data.bizType === null || this.data.buyerInfo.companyName === null)) {
                this.$message('请先选择业务类型及下游公司后再选择产品');
            }
            if (event && type === 2 && (this.data.bizType === null || this.data.sellerInfo.companyName === null)) {
                this.$message('请先选择业务类型及上游公司后再选择产品');
            }
            if (event && type === 3 && (this.data.bizType === null || this.data.buyerInfo.companyName === null || this.data.buyerInfo.prdSkuId === null)) {
                this.$message('请先选择业务类型、下游公司及产品后再选择交割库');
            }
            if (event && type === 4 && (this.data.bizType === null || this.data.sellerInfo.companyName === null || this.data.sellerInfo.prdSkuId === null)) {
                this.$message('请先选择业务类型、上游公司及产品后再选择交割库');
            }
        },
        warehouseidxbuys () {
            this.data.buyerInfo.deliveryWarehouseId = this.buyDeliveryBank[this.warehouseidxbuy].warehouseId;
            this.data.buyerInfo.deliveryWarehouseName = this.buyDeliveryBank[this.warehouseidxbuy].warehouseName;
        },
        // 业务操作人选中
        businessManagerchk () {
            this.data.businessManagerName = this.businessManager[this.businessManageridx].userName;
            this.data.businessManagerId = this.businessManager[this.businessManageridx].usrUserId;
            this.userid = this.businessManager[this.businessManageridx].usrUserId;
            console.log(this.businessManageridx);
            this.getUserOrganization();
        },
        warehouseidxsells () {
            this.data.sellerInfo.deliveryWarehouseId = this.sellDeliveryBank[this.warehouseidxsell].warehouseId;
            this.data.sellerInfo.deliveryWarehouseName = this.sellDeliveryBank[this.warehouseidxsell].warehouseName;
        },
        // 选中公司
        checked (idx) {
            this.activeIndex = idx;
        },
        // 业务组选中
        checkGroup () {
            this.data.usrOrganizationId = this.businessManagerGroup[this.srOrganizationIdx].usrOrganizationId;
            this.data.usrOrganizationName = this.businessManagerGroup[this.srOrganizationIdx].orgName;
        },
        checkCompany (type) {
            if (this.data.bizType === null || this.data.bizType === '') {
                this.$message('请先选择业务类型');
                return;
            }
            this.companyName = null;
            this.dialogVisible = true;
            this.activeCompanyType = type;
            this.activeIndex = null;
            this.getCompany();
        },
        // 获取买卖方公司
        getCompany () {
            let that = this;
            let params = {
                bizType: that.data.bizType, // 业务类型
                // companyName: that.companyName, // 公司名称
                prdProductId: that.activeCompanyType === '卖' ? that.data.sellerInfo.prdSkuId : that.data.buyerInfo.prdSkuId // 商品id
            };
            that.activeCompanyType === '卖' ? params.sellerCorpName = that.companyName : params.buyerCorpName = that.companyName; // 商品id
            this.$http.post(this.$api.contract.getCompany, params).then(res => {
                that.proType = res.data.data.goodsList;
                that.activeCompanyType === '卖' ? that.sellCompanyList = res.data.data.sellerCorpList : that.buyCompanyList = res.data.data.buyerCorpList;
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
            this.data.buyerInfo.targetCorpName = this.relatedCompany[this.targetCorpIdbuy].targetCorpName;
            this.data.buyerInfo.targetCorpId = this.relatedCompany[this.targetCorpIdbuy].targetCorpId;
            this.data.sellerInfo.targetCorpName = this.relatedCompany[this.targetCorpIdbuy].targetCorpName;
            this.data.sellerInfo.targetCorpId = this.relatedCompany[this.targetCorpIdbuy].targetCorpId;
        },
        checktargetCorpsell () {
            this.data.sellerInfo.targetCorpName = this.relatedCompany[this.targetCorpIdsell].targetCorpName;
            this.data.sellerInfo.targetCorpId = this.relatedCompany[this.targetCorpIdsell].targetCorpId;
        },
        // 根据所选产品获取交割库
        checkPro (type) {
            if (type === '卖') {
                this.data.sellerInfo.prdSkuId = this.proType[this.sellerInfoProd].goodsId;
                this.data.sellerInfo.skuCode = this.proType[this.sellerInfoProd].goodsCode;
                this.data.sellerInfo.prodName = this.proType[this.sellerInfoProd].goodsName;
            }
            if (type === '买') {
                this.data.buyerInfo.prdSkuId = this.proType[this.buyerInfoProd].goodsId;
                this.data.buyerInfo.skuCode = this.proType[this.buyerInfoProd].goodsCode;
                this.data.buyerInfo.prodName = this.proType[this.buyerInfoProd].goodsName;
            }
            let that = this;
            let params = {
                productId: type === '卖' ? this.proType[this.sellerInfoProd].goodsId : this.proType[this.buyerInfoProd].goodsId
            };
            this.$http.post(this.$api.contract.getDeliveryBank, params).then(res => {
                type === '卖' ? that.sellDeliveryBank = res.data.data.warehouseList : that.buyDeliveryBank = res.data.data.warehouseList;
            }).catch((e) => {
                console.log(e);
            });
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
                organizationId: 2,
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
        getCompanyGrade () {
            let that = this;
            let params = {
                productId: that.activeCompanyType === '卖' ? this.data.sellerInfo.companyId : this.data.buyerInfo.companyId
            };
            this.$http.post(this.$api.contract.getCompanyGrade, params).then(res => {
                that.activeCompanyType === '卖' ? this.sellerTrade = res.data.data.grade : this.buyerTrade = res.data.data.grade;
            }).catch((e) => {
                console.log(e);
            });
        },
        // 公司选中
        checkSales () {
            if (this.activeIndex === null) {
                this.$message({
                    message: '请先选择公司',
                    type: 'warning'
                });
                return;
            }
            if (this.activeCompanyType === '买') {
                this.data.buyerInfo.companyName = this.buyCompanyList[this.activeIndex].buyerCorpName;
                this.data.buyerInfo.companyId = this.buyCompanyList[this.activeIndex].buyerCorpId;
            } else {
                this.data.sellerInfo.companyName = this.sellCompanyList[this.activeIndex].sellerCorpName;
                this.data.sellerInfo.companyId = this.sellCompanyList[this.activeIndex].sellerCorpId;
            }
            this.dialogVisible = false;
            this.getCompanyGrade();
        },
        // 提交
        onsubmit () {
            if (!this.testForm(this.Verification, 1)) return false;
            if (!this.unilateral) {
                if (!this.testForm(this.Verification1, 3)) return false;
                if (!this.testForm(this.Verification1, 2)) return false;
                if (this.data.buyerInfo.deliveryDateFlag !== 2) {
                    if (!this.testForm(this.Verification2, 3)) return false;
                }
                if (this.data.sellerInfo.deliveryDateFlag !== 2) {
                    if (!this.testForm(this.Verification2, 2)) return false;
                }
                if (this.data.sellerInfo.provideInvoiceType === 3 && (this.data.sellerInfo.provideInvoiceDays === null || this.data.sellerInfo.provideInvoiceDays === '')) {
                    this.$message({
                        message: '请填写发票日期',
                        type: 'warning'
                    });
                    return false;
                }
                if (this.data.buyerInfo.provideInvoiceType === 3 && (this.data.buyerInfo.provideInvoiceDays === null || this.data.buyerInfo.provideInvoiceDays === '')) {
                    this.$message({
                        message: '请填写发票日期',
                        type: 'warning'
                    });
                    return false;
                }
                this.data.contractType = 1;
            } else {
                if (this.data.contractType === null || this.data.contractType === '') {
                    this.$message({
                        message: '请先选择合同类型',
                        type: 'warning'
                    });
                    return false;
                }
                if (this.data.contractType === 2 && this.data.sellerInfo.provideInvoiceType === 3 && (this.data.sellerInfo.provideInvoiceDays === null || this.data.sellerInfo.provideInvoiceDays === '')) {
                    this.$message({
                        message: '请填写发票日期',
                        type: 'warning'
                    });
                    return false;
                }
                if (this.data.contractType === 3 && this.data.buyerInfo.provideInvoiceType === 3 && (this.data.buyerInfo.provideInvoiceDays === null || this.data.buyerInfo.provideInvoiceDays === '')) {
                    this.$message({
                        message: '请填写发票日期',
                        type: 'warning'
                    });
                    return false;
                }
                if (this.data.buyerInfo.deliveryDateFlag !== 2 && this.data.contractType === 3) {
                    if (!this.testForm(this.Verification2, 3)) return false;
                }
                if (this.data.sellerInfo.deliveryDateFlag !== 2 && this.data.contractType === 2) {
                    if (!this.testForm(this.Verification2, 2)) return false;
                }
                if (!this.testForm(this.Verification1, this.data.contractType)) return false;
            }
            if (this.unilateralRelevance.isUnilateralCorrelation === '1' && this.unilateral) {
                if (!this.unilateralRelevance.contractCode) {
                    this.$message({
                        message: '请选择单边合同',
                        type: 'warning'
                    });
                    return false;
                }
            }
            this.unilateralRelevance.isUnilateralCorrelation === '1' ? this.unilateralRelevance.isUnilateralCorrelation = true : this.unilateralRelevance.isUnilateralCorrelation = false;
            Object.assign(this.data, this.unilateralRelevance);
            let query = this.data;
            this.$http.post(this.$api.contract.addContract, query).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    Bus.$emit('setMenu');
                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            });
        },
        // 表单验证
        testForm (type, e) {
            let that = this;
            let list = e === 1 ? that.data : e === 3 ? that.data.buyerInfo : that.data.sellerInfo;
            for (let i = 0; i < type.length; i++) {
                if (list[type[i].name] === null || list[type[i].name] === '') {
                    that.$message({
                        message: type[i].msg,
                        type: 'warning'
                    });
                    return false;
                }
            }
            return true;
        },
        // 时间选择限制
        pickertime (t) {
            if (t === 1 && this.data.sellerInfo.deliveryBeginDate > this.data.sellerInfo.deliveryEndDate && this.data.sellerInfo.deliveryEndDate !== null) {
                this.$message({
                    message: '开始时间不能大于结束时间',
                    type: 'warning'
                });
                this.data.sellerInfo.deliveryBeginDate = null;
                return;
            }
            if (t === 2 && this.data.sellerInfo.deliveryBeginDate > this.data.sellerInfo.deliveryEndDate && this.data.sellerInfo.deliveryBeginDate !== null) {
                this.$message({
                    message: '结束时间应大于开始时间',
                    type: 'warning'
                });
                this.data.sellerInfo.deliveryEndDate = null;
                return;
            }
            if (t === 3 && this.data.buyerInfo.deliveryBeginDate > this.data.buyerInfo.deliveryEndDate && this.data.buyerInfo.deliveryEndDate !== null) {
                this.$message({
                    message: '开始时间不能大于结束时间',
                    type: 'warning'
                });
                this.data.buyerInfo.deliveryBeginDate = null;
                return;
            }
            if (t === 4 && this.data.buyerInfo.deliveryBeginDate > this.data.buyerInfo.deliveryEndDate && this.data.buyerInfo.deliveryBeginDate !== null) {
                this.$message({
                    message: '结束时间应大于开始时间',
                    type: 'warning'
                });
                this.data.buyerInfo.deliveryEndDate = null;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
  .add-contract {
    padding: 20px 16px;
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
  .search1{
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
      flex: 0 0 60px;
    }
    .r {
      flex: 0 0 20px;
    }
    .t {
      flex: 1;
    }
    .y {
      flex: 0 0 40px;
    }
    .u {
      flex: 0 0 20px;
    }
  }
  .essential-row {
    line-height: 22px;
    .essential-item {
      .essential-title {
        flex: 0 0 110px;
        line-height: 30px;
        padding-left: 10px;
      }
    }
  }
  .isUnilateral {
    .i {
      color: red;
    }
  }
  .sell-company {
    .essential-item:nth-child(1) {
      .essential-text {
        margin-right: 0;
      }
    }
  }
</style>
<style lang="scss">
  .add-contract {
      .el-dialog__header{
          .el-dialog__headerbtn{
              top: 10px;
              right: 16px;
          }
      }
      .order-apply{
          .title {
              font-size: 16px;
              color: #333;
              font-weight: bold;
              height: 35px;
              margin-left: 16px;
              line-height: 35px;
          }
      }
    .el-radio__label{
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
    .el-radio{
      color: $color-minor;
      line-height: 30px;
    }
  }
</style>
