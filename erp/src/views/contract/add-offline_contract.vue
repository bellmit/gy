<!-- 创建合同要素 -->
<template>
    <div class="add-contract">
        <div class="essential-information">
            <p class="paydetail-title">基本信息</p>
            <div class="essential-wrapper">
                <!--<div class="essential-row">-->
                    <!--<div class="essential-item">-->
                        <!--<div class="essential-title"><span class="isMust"></span>合同要素ID</div>-->
                        <!--<div class="essential-text">-->
                            <!--<input type="text" v-model="data.id" placeholder="请输入">-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="essential-item">-->
                        <!--<div class="essential-title"><span class="isMust"></span>订单ID</div>-->
                        <!--<div class="essential-text">-->
                            <!--<input type="text"  placeholder="请输入">-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <div class="essential-row">
                    <div class="essential-item">
                        <div class="essential-title"><span class="isMust">*</span>业务类型</div>
                        <div class="essential-text">
                            <el-select v-model="data.bizType" placeholder="请选择" @change="getCompany">
                                <el-option v-for="(item, index) in bizType4CreateEss" :key="index"
                                           :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title">合同类型</div>
                        <div class="essential-text">
                            <el-select v-model="data.contractType" placeholder="请选择" @change="onUnilateral">
                                <el-option v-for="(item, index) in $constant.contractTypeList" :key="index"
                                           :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="essential-row">
                    <div class="essential-item">
                        <div class="essential-title"><span class="isMust">*</span>业务员</div>
                        <div class="essential-text">
                            <el-select v-model="businessManageridx" placeholder="请选择" @change="businessManagerchk">
                                <el-option v-for="(item, index) in businessManager" :key="index" :label="item.userName"
                                           :value="index">
                                    <span>{{item.userName}}</span>
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="essential-item"></div>
                </div>
                <div class="essential-row">
                    <div class="essential-item">
                        <div class="essential-title"><span class="isMust">*</span>产品名称</div>
                        <div class="essential-text">
                            <el-select v-model="data.prdProductId" placeholder="请选择">
                                <el-option v-for="(item, index) in proType" :key="index" :label="item.goodsName"
                                           :value="item.goodsId">
                                    <span>{{item.goodsName}}</span>
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title"><span class="isMust">*</span>数量</div>
                        <div class="essential-text">
                            <input type="number" class="gy-input" v-on:input="downNumInput(data.skuQuantity)" v-model="data.skuQuantity" placeholder="请输入产品数量">
                            <span class="unit">吨</span>
                        </div>
                    </div>
                </div>
                <div class="essential-row">
                    <div class="essential-item">
                        <div class="essential-title"><span class="isMust">*</span>我方公司</div>
                        <div class="essential-text">
                            <el-select v-model="data.targetCorpIdbuy" placeholder="请选择" @change="checktargetCorpbuy">
                                <el-option v-for="(item, index) in relatedCompany" :key="index"
                                           :label="item.targetCorpName" :value="index">
                                    <span>{{item.targetCorpName}}</span>
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title"><span class="isMust">*</span>交易类型</div>
                        <div class="essential-text">
                            <el-select v-model="data.transactionType" class="mycorp" placeholder="请选择">
                                <el-option v-for="(item, index) in $constant.contractTradeTypeList" :key="index"
                                           :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="essential-row">
                    <div class="essential-item">
                        <div class="essential-title"><span class="isMust"></span>合同签约日</div>
                        <div class="essential-text">
                            <div>
                                <el-date-picker
                                    v-model="data.contractCreatedDate"
                                    type="date"
                                    value-format="timestamp"
                                    @change="pickertime(1)">
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="essential-item"></div>
                </div>
            </div>
        </div>
        <div class="pay-wrapper">
            <div class="essential-information" v-if="!(data.contractType === 3)">
                <p class="paydetail-title">上游合同信息</p>
                <div class="essential-wrapper" style="padding-bottom:10px">
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>上游公司</div>
                            <div class="essential-text">
                                <input type="text" placeholder="请选择上游公司" v-model="data.sellerInfo.companyName"
                                       @click="checkCompany('卖')">
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>单价(含税)</div>
                            <div class="essential-text">
                                <input type="text" v-model="data.sellerInfo.skuPrice" placeholder="请输入产品单价">
                                <span class="unit">元/吨</span>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">保证金</div>
                            <div class="essential-text">
                                <input type="text" @change="handleInput" v-model="data.sellerInfo.depositRatio"
                                       placeholder="请输入保证金比例">
                                <span class="unit">%</span>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">追保约定</div>
                            <div class="essential-text cont-ess-zbyd">
                                <div class="q" style="padding-left: 10px">跌</div>
                                <div class="w"><input type="text" style="text-align: center"
                                                      v-model="data.sellerInfo.depositRatioSubtract"></div>
                                <div class="e">%</div>
                                <div class="r"><span style="padding-left: 20%;text-align: right">补</span></div>
                                <div class="t"><input type="text" style="text-align: center"
                                                      v-model="data.sellerInfo.depositRatioAppend"></div>
                                <div class="y">%</div>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">追保基准</div>
                            <div class="essential-text cont-ess-zbyd">
                                <div class="w">
                                    <div class="essential-text">
                                        <el-select v-model="data.sellerInfo.depositAppendBenchmark" placeholder="请选择" :clearable="true"
                                                   @change="onDepositAppendBenchmark(3)">
                                            <el-option v-for="(item, index) in $constant.baselineRecovery" :key="index"
                                                       :label="item.name" :value="item.name">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="t">
                                    <div class="essential-text">
                                        <el-autocomplete v-model="data.sellerInfo.depositAppendArea" :clearable="true"
                                                         :fetch-suggestions="querySearch4DepositAppend" :debounce=10
                                                         placeholder="请输入或选择"></el-autocomplete>
                                    </div>
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
                                               :label="item.warehouseName" :value="item.warehouseId">
                                        <span>{{item.warehouseName}}</span>
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <!-- 上游 -->
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
                                    <el-option v-for="(item, index) in $constant.deliveryCreateEssList" :key="index"
                                               :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>免仓期</div>
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
                                    <el-option v-for="(item, index) in $constant.paymentType4Buy" :key="index"
                                               :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="data.sellerInfo.payChannel" placeholder="请选择" :clearable="true">
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
                                    <span v-if="data.sellerInfo.provideInvoiceType === 3 || data.sellerInfo.provideInvoiceType === '3'"
                                          style="font-size: 13px"><input type="text" style="width: 50px" v-model="data.sellerInfo.provideInvoiceDays">工作日</span>
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
                            <div class="essential-title"><span class="isMust">*</span>质量标准</div>
                            <div class="essential-text">
                                <el-select v-model="data.sellerInfo.qualityStandard" placeholder="请选择">
                                    <el-option v-for="(item, index) in $constant.qualityStandards" :key="index"
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
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">撮合费用</div>
                            <div class="essential-text">
                                <el-select class="lc-select" v-model="data.sellerInfo.priceOfWeight" placeholder="请选择" @change="upCost">
                                    <el-option v-for="(item, index) in priceOfWeightList" :key="index"
                                            :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                                <span v-if="data.sellerInfo.priceOfWeight">{{upCostNum}}元</span>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row" v-if="data.sellerInfo.priceOfWeight">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>撮合公司</div>
                            <div class="essential-text">
                                <input type="text" placeholder="请输入撮合公司"
                                        v-model="data.sellerInfo.chattingCompanyName">
                            </div>
                        </div>
                    </div>
                    <div class="essential-row" v-if="data.bizType === 6">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust"></span>上游合约</div>
                            <div class="essential-text" style="flex-direction: column">
                                <div class="essential-text" style="margin-right: 0">
                                    <div class="d">
                                        <input type="text" placeholder="请选择上游合约编号"
                                               v-model="data.sellerInfo.contractCode">
                                        <i class="iconfont icon-search" @click="onSeachContract('上游')"
                                           style="position: absolute;right: 5px;top: 3px;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">备注</div>
                            <div class="essential-text">
                                <textarea name="" class="gy-textarea" v-model="sellerRemarks" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>上游合同编号</div>
                            <div class="essential-text">
                                <div class="essential-text">
                                    <input type="text" v-model="data.sellerInfo.odrContractNumber" placeholder="请输入上游合同编号"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>盖章合同</div>
                            <div class="essential-text">
                                <gy-file-upload @callbackFileUpload="onCallbackBuyFileUpload"></gy-file-upload>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">纸质合同号</div>
                            <div class="essential-text">
                                <div class="essential-text">
                                    <input type="text" v-model="data.sellerInfo.planNumber" placeholder="请输入纸质合同号"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="essential-information" v-if="!(data.contractType === 2)">
                <p class="paydetail-title">下游合同信息</p>
                <div class="essential-wrapper" style="padding-bottom:10px">
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>下游公司</div>
                            <div class="essential-text">
                                <input type="text" placeholder="请选择下游公司" v-model="data.buyerInfo.companyName"
                                       @click="checkCompany('买')">
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>单价(含税)</div>
                            <div class="essential-text">
                                <input type="text" v-model="data.buyerInfo.skuPrice" placeholder="请输入产品单价">
                                <span class="unit">元/吨</span>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">保证金</div>
                            <div class="essential-text">
                                <input type="text" @change="handleInput2" v-model="data.buyerInfo.depositRatio"
                                       placeholder="请输入保证金比例">
                                <span class="unit">%</span>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">追保约定</div>
                            <div class="essential-text cont-ess-zbyd">
                                <div class="q" style="padding-left: 10px">跌</div>
                                <div class="w"><input type="text" style="text-align: center" v-model="data.buyerInfo.depositRatioSubtract"></div>
                                <div class="e">%</div>
                                <div class="r">补</div>
                                <div class="t"><input type="text" style="text-align: center" v-model="data.buyerInfo.depositRatioAppend"></div>
                                <div class="y">%</div>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">追保基准</div>
                            <div class="essential-text cont-ess-zbyd">
                                <div class="w">
                                    <div class="essential-text">
                                        <el-select v-model="data.buyerInfo.depositAppendBenchmark" placeholder="请选择" :clearable="true"
                                                   @change="onDepositAppendBenchmark(2)">
                                            <el-option v-for="(item, index) in $constant.baselineRecovery" :key="index"
                                                       :label="item.name" :value="item.name">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="t">
                                    <div class="essential-text">
                                        <el-autocomplete v-model="data.buyerInfo.depositAppendArea" :clearable="true"
                                                         :fetch-suggestions="querySearch4DepositAppend" :debounce=10
                                                         placeholder="请输入或选择"></el-autocomplete>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>交割库</div>
                            <div class="essential-text">
                                <el-select v-model="warehouseidxbuy" placeholder="请选择" @change="warehouseidxbuys">
                                    <el-option v-for="(item, index) in buyDeliveryBank" :key="index"
                                               :label="item.warehouseName" :value="item.warehouseId">
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
                                    <el-option v-for="(item, index) in $constant.deliveryCreateEssList" :key="index"
                                               :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>免仓期</div>
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
                                <el-select v-model="data.buyerInfo.payChannel" placeholder="请选择" :clearable="true">
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
                                    <span v-if="data.buyerInfo.provideInvoiceType === 3 || data.buyerInfo.provideInvoiceType === '3'"
                                          style="font-size: 13px"><input type="text" style="width: 50px" v-model="data.buyerInfo.provideInvoiceDays">工作日</span>
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
                            <div class="essential-title"><span class="isMust">*</span>质量标准</div>
                            <div class="essential-text">
                                <el-select v-model="data.buyerInfo.qualityStandard" placeholder="请选择">
                                    <el-option v-for="(item, index) in $constant.qualityStandards" :key="index"
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
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">撮合费用</div>
                            <div class="essential-text">
                                <el-select class="lc-select" v-model="data.buyerInfo.priceOfWeight" placeholder="请选择" @change="downCost">
                                    <el-option v-for="(item, index) in priceOfWeightList" :key="index"
                                            :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                                <span v-if="data.buyerInfo.priceOfWeight">{{downCostNum}}元</span>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row" v-if="data.buyerInfo.priceOfWeight">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>撮合公司</div>
                            <div class="essential-text">
                                <input type="text" placeholder="请输入撮合公司"
                                        v-model="data.buyerInfo.chattingCompanyName">
                            </div>
                        </div>
                    </div>
                    <div class="essential-row" v-if="data.bizType === 6">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust"></span>下游合约</div>
                            <div class="essential-text" style="flex-direction: column">
                                <div class="essential-text" style="margin-right: 0">
                                    <div class="d">
                                        <input type="text" placeholder="请选择下游合约编号"
                                               v-model="data.buyerInfo.contractCode">
                                        <i class="iconfont icon-search" @click="onSeachContract('下游')"
                                           style="position: absolute;right: 5px;top: 3px;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">备注</div>
                            <div class="essential-text">
                                <textarea name="" class="gy-textarea" v-model="buyerRemarks" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>下游合同编号</div>
                            <div class="essential-text">
                                <div class="essential-text">
                                    <input type="text" v-model="data.buyerInfo.odrContractNumber" placeholder="请输入下游合同编号"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title"><span class="isMust">*</span>盖章合同</div>
                            <div class="essential-text">
                                <gy-file-upload @callbackFileUpload="onCallbackSaleFileUpload"></gy-file-upload>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">纸质合同号</div>
                            <div class="essential-text">
                                <div class="essential-text">
                                    <input type="text" v-model="data.buyerInfo.planNumber" placeholder="请输入纸质合同号"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="essential-row">
                        <div class="essential-item">
                            <div class="essential-title">下游统计口径</div>
                            <div class="essential-text">
                                <div class="essential-text">
                                    <el-select v-model="data.buyerInfo.statisticalCaliber" placeholder="请选择">
                                        <el-option v-for="item in statisticalCaliber" :key="item"
                                                   :label="item" :value="item">
                                            <span>{{item}}</span>
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="essential-information" v-if="data.contractType === 2 || data.contractType === 3" />
        </div>
        <div style="text-align: center;margin-top:10px">
            <button type="button" v-gy-auth="'to_create_contract'" class="gy-button-extra confirmations" @click="beforeSubmit">提交</button>
        </div>
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
                    <th style="width: 120px;">合同要素ID</th>
                    <th>我方公司</th>
                    <th><span v-if="upstreamTerm === 2 || upstreamTerm === 4">下游公司</span><span v-else>上游公司</span></th>
                    <th style="width: 130px;">合同金额(元)</th>
                    <th>实际交割日期</th>
                    <th>交割日期</th>
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
                    <td style="width: 130px;" class="align-r" v-else>{{item.totalAmount | numToCash}}</td>
                    <td><span v-if="item.realDeliveryDate">{{item.realDeliveryDate | date}}</span><span v-else>-</span></td>
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
        <el-dialog v-if="dialogVisible" width="800px" class="addDialog" :title="activeCompanyType === '卖'? '上游公司列表' : '下游公司列表'"
                   :visible.sync="dialogVisible">
            <div class="gy-form-group">
                <span class="l">公司名称</span>
                <div>
                    <input type="text" v-focus v-model="companyName"
                           :placeholder="activeCompanyType === '卖'? '请输入上游公司名称' : '请输入下游公司名称'">
                </div>
                <span class="search1" @click="getCompany">
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
                <button class="gy-button-extra confirmations" :class="{sellConfirmation:sellerCheck}" :disabled='sellerCheck' @click="checkSales()" style="margin-left: 8px">选择</button>
            </span>
        </el-dialog>
        <el-dialog v-if="dialogVisibles" width="800px" class="addDialog" :title="activeCompanyType === '卖'? '上游公司列表' : '下游公司列表'"
                   :visible.sync="dialogVisibles">
            <div class="gy-form-group">
                <span class="l">公司名称</span>
                <div>
                    <input type="text" v-focus v-model="companyName"
                           :placeholder="activeCompanyType === '卖'? '请输入上游公司名称' : '请输入下游公司名称'">
                </div>
                <span class="search1" @click="getCompany">
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
                <button class="gy-button-extra confirmations" :class="{buyConfirmation:buyerCheck}" :disabled='buyerCheck' @click="checkSales()" style="margin-left: 8px">选择</button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import gyFileView from './../components/gyFileView';
import gyFileUpload from './../components/gyFileUpload';

export default {
    data () {
        return {
            downCostNum: 0,
            upCostNum: 0,
            unilateralRelevance: {
                correlationOrderId: null, // 单边合同ID
                contractCode: null // 单边合同编号
            },
            contEssId: null,
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
            businessManager: [],
            businessManagerGroup: [],
            isSellerCh: false,
            isBuyerCh: false,
            bizType4CreateEss: [
                {
                    name: '准现货-现货',
                    id: 4
                },
                // {
                //     name: '准现货-现货',
                //     id: 5
                // },
                {
                    name: '准现货-长约',
                    id: 6
                }
            ],
            priceOfWeightList: [
                {
                    value: '',
                    label: '请选择'
                },
                {
                    value: 1,
                    label: '1元/吨'
                },
                {
                    value: 1.5,
                    label: '1.5元/吨'
                },
                {
                    value: 2,
                    label: '2元/吨'
                }
            ],
            data: {
                id: null, // 合同要素ID
                bizType: 4, // 业务类型
                prdProductId: 1,
                skuQuantity: null,
                businessManagerId: 1924, // 业务操作人ID
                businessManagerName: null, // 业务操作人
                usrOrganizationName: null, // 业务操作人所在组
                usrOrganizationId: null, // 业务操作人所在组ID
                contractType: 2, // 单边交易（ 合同类型）（默认为单边采购）
                contractCreatedDate: null,
                transactionType: 4,
                targetCorpIdbuy: null,
                buyerInfo: {
                    companyId: null, // 下游公司id
                    companyName: null, // 下游公司名称
                    skuOrigin: '进口', // 货源（国产、进口、自定义）
                    prodName: null, // 产品名称
                    skuCode: null, // 产品Code
                    prdSkuId: 1, // 产品ID
                    deliveryWarehouseId: null, // 交割仓库id
                    deliveryWarehouseName: null, // 交割仓库名称
                    deliveryDateFlag: null, // 交割时间标识
                    deliveryBeginDate: null, // 计划交割开始日期（格式：yyyy-MM-dd）
                    deliveryEndDate: null, // 计划交割结束日期（格式：yyyy-MM-dd）
                    deliveryDateText: null, // 计划交割时间文本
                    provideInvoiceType: 1, // 发票月份
                    provideInvoiceDays: null, // 发票月份
                    paymentType: 0, // 付款方式（0：先款后货，1：先货后款）
                    skuPrice: null, // 单价
                    packagingStandard: 0, // 包装标准
                    qualityStandard: '国标', // 质量标准
                    skuQuantity: null, // 数量
                    depositRatio: null, // 保证金比率（%）
                    depositRatioSubtract: null, // 保证金比率（跌）
                    depositRatioAppend: null, // 保证金比率（补）
                    warehouseFreeDays: 5, // 免仓期（天）
                    deliveryType: 3, // 交割方式
                    payChannel: 1, // 支付结算方式
                    remarks: null, // 备注
                    targetCorpId: null, // 我方公司ID
                    targetCorpName: null, // 我方公司名称
                    longtermContractOrderId: null, // 下游合约
                    chattingAmount: null, // 撮合费用
                    priceOfWeight: null,
                    chattingCompanyName: null, // 撮合公司
                    statisticalCaliber: 1,
                    odrContractNumber: null
                },
                sellerInfo: {
                    companyId: null, // 上游公司id
                    companyName: null, // 上游公司名称
                    skuOrigin: '进口', // 货源（国产、进口、自定义）
                    prodName: null, // 产品名称
                    skuCode: null, // 产品Code
                    prdSkuId: 1, // 产品ID
                    deliveryWarehouseId: null, // 交割仓库id
                    deliveryWarehouseName: null, // 交割仓库名称
                    deliveryDateFlag: null, // 交割时间标识
                    deliveryBeginDate: null, // 计划交割开始日期（格式：yyyy-MM-dd）
                    deliveryEndDate: null, // 计划交割结束日期（格式：yyyy-MM-dd）
                    deliveryDateText: null, // 计划交割时间文本
                    provideInvoiceType: 1, // 发票月份
                    provideInvoiceDays: null, // 发票月份
                    paymentType: 0, // 付款方式（0：先款后货，1：先货后款）
                    skuPrice: null, // 单价
                    packagingStandard: 0, // 包装标准
                    qualityStandard: '国标', // 质量标准
                    skuQuantity: null, // 数量
                    depositRatio: null, // 保证金比率（%）
                    depositRatioSubtract: null, // 保证金比率（跌）
                    depositRatioAppend: null, // 保证金比率（补）
                    warehouseFreeDays: 5, // 免仓期（天）
                    deliveryType: 3, // 交割方式
                    payChannel: 1, // 支付结算方式
                    remarks: null, // 备注
                    targetCorpId: null, // 我方公司ID
                    targetCorpName: null, // 我方公司名称
                    longtermContractOrderId: null, // 上游合约
                    chattingAmount: null, // 撮合费用
                    priceOfWeight: null,
                    chattingCompanyName: null, // 撮合公司
                    odrContractNumber: null
                }
            },
            proType: [
                {
                    goodsId: 1,
                    goodsName: '乙二醇                 '
                },
                {
                    goodsId: 2,
                    goodsName: '甲醇'
                },
                {
                    goodsId: 3,
                    goodsName: '二甘醇'
                }
            ],
            dialogVisible: false,
            dialogVisibles: false,
            sellCompanyList: [],
            buyCompanyList: [],
            relatedCompany: [],
            companyName: null,
            activeCompanyType: null,
            activeIndex: null,
            buyDeliveryBank: [],
            sellDeliveryBank: [],
            buyerInfoProd: 1,
            sellerInfoProd: 1,
            sellerInfoProdIndex: null,
            buyerTrade: null,
            sellerTrade: null,
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
                    name: 'skuQuantity',
                    msg: '请先输入产品数量'
                },
                {
                    name: 'targetCorpIdbuy',
                    msg: '请先选择我方公司'
                }
            ],
            Verification1: [
                {
                    name: 'companyId',
                    msg: '请先选择上游公司或下游公司'
                },
                {
                    name: 'prdSkuId',
                    msg: '请先选择产品'
                },
                {
                    name: 'skuPrice',
                    msg: '请先输入产品单价'
                },
                {
                    name: 'deliveryWarehouseId',
                    msg: '请先选择交割库'
                },
                {
                    name: 'deliveryDateFlag',
                    msg: '请先选择交割日期'
                },
                {
                    name: 'warehouseFreeDays',
                    msg: '请先输入免仓期'
                },
                {
                    name: 'odrContractNumber',
                    msg: '请输入合同编号'
                }
            ],
            obj: {},
            deliveryContractType: null, // 判断pdf和图片的区别
            upstreamTerm: null, // 判断长约处理字段
            showDvlyQtyCol: false, // (选择关联合同时)是否展示交割数量的相关列
            depositAppendBenchmarkType: 0,
            sellerCheck: false, // 限制上游按钮的显示
            buyerCheck: false, // 限制下游按钮的显示
            dataList: {},
            statisticalCaliber: [1, 2, 3],
            buyContImg: [], // 采购合同文件
            saleContImg: [] // 销售合同文件
        };
    },
    mounted () {
        this.getRelatedCompany();
        this.getGrade();
        this.userid = JSON.parse(localStorage.getItem('userInfo')).id;
        this.downCostNum = this.data.skuQuantity * this.data.buyerInfo.priceOfWeight;
        this.upCostNum = this.data.skuQuantity * this.data.sellerInfo.priceOfWeight;
    },
    watch: {
        sellerRemarks (val) {
            if (val.length > 2500) {
                this.$message({
                    message: '备注最多可填写2500字',
                    type: 'warning'
                });
                this.sellerRemarks = this.sellerRemarks.substr(0, 2500);
            }
            this.data.sellerInfo.remarks = this.sellerRemarks;
        },
        buyerRemarks (val) {
            if (val.length > 2500) {
                this.$message({
                    message: '备注最多可填写2500字',
                    type: 'warning'
                });
                this.buyerRemarks = this.buyerRemarks.substr(0, 2500);
            }
            this.data.buyerInfo.remarks = this.buyerRemarks;
        },
        'data.bizType': {
            handler (newValue, oldValue) {
                if (newValue === 6) {
                    this.data.transactionType = 5;
                }
            },
            deep: true
        },
        'data.sellerInfo.depositAppendBenchmark': {
            handler (newValue, oldValue) {
                if (newValue == null || newValue === '' || newValue === undefined) {
                    if (this.data.sellerInfo) {
                        this.data.sellerInfo.depositAppendArea = null;
                    }
                }
            },
            deep: true
        },
        'data.buyerInfo.depositAppendBenchmark': {
            handler (newValue, oldValue) {
                if (newValue == null || newValue === '' || newValue === undefined) {
                    if (this.data.buyerInfo) {
                        this.data.buyerInfo.depositAppendArea = null;
                    }
                }
            },
            deep: true
        }
    },
    components: {gyFileView, gyFileUpload},
    methods: {
        goback () {
            this.$router.go(-1);
        },
        upNumInput (v) {
            this.upCostNum = v * this.data.sellerInfo.priceOfWeight;
        },
        downNumInput (v) {
            this.downCostNum = v * this.data.buyerInfo.priceOfWeight;
        },
        downCost (v) {
            this.downCostNum = this.data.skuQuantity * this.data.buyerInfo.priceOfWeight;
            this.data.buyerInfo.chattingCompanyName = !v ? null : this.data.buyerInfo.chattingCompanyName;
        },
        upCost (v) {
            this.upCostNum = this.data.skuQuantity * this.data.sellerInfo.priceOfWeight;
            this.data.sellerInfo.chattingCompanyName = !v ? null : this.data.sellerInfo.chattingCompanyName;
        },

        // 上游
        handleInput (e) {
        // 通过正则过滤小数点后两位
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,3})/g)[0]) || null;
            this.data.sellerInfo.depositRatio = e.target.value;
        },
        // 下游
        handleInput2 (e) {
        // 通过正则过滤小数点后两位
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,3})/g)[0]) || null;
            this.data.buyerInfo.depositRatio = e.target.value;
        },
        // 单边交易选择框的状态变化
        onUnilateral (val) {
            // 清空单边合同的数据(已有值的话)
            this.deliveryContractList = [];
            this.deliveryContractType = null;
            this.unilateralRelevance.contractCode = null;
            this.data.contractType = val;
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
                    this.searchForm.skuQuantity = this.data.skuQuantity;
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
                    this.searchForm.skuQuantity = this.data.skuQuantity;
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
                    this.searchForm.skuQuantity = this.data.skuQuantity;
                    this.searchForm.sellerCompanyName = this.data.sellerInfo.companyName;
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
                    this.searchForm.skuQuantity = this.data.skuQuantity;
                    this.searchForm.buyerCompanyName = this.data.buyerInfo.companyName;
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
                this.data.sellerInfo.contractCode = this.obj.contractCode;
                this.data.sellerInfo.longtermContractOrderId = this.obj.orderId;
                this.isShowUnilateralDialog = false;
            } else if (this.upstreamTerm === 4) { // 下游长约
                this.data.buyerInfo.contractCode = this.obj.contractCode;
                this.data.buyerInfo.longtermContractOrderId = this.obj.orderId;
                this.isShowUnilateralDialog = false;
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
                    let delveryLength = that.deliveryContractList[0].fileUrl.lastIndexOf('.');
                    let deliveryContractLast = that.deliveryContractList[0].fileUrl.substring(delveryLength + 1, that.deliveryContractList[0].fileUrl.delveryLength);
                    that.deliveryContractType = deliveryContractLast;
                }
            });
        },
        openPro (event, type) {
            if (event && type === 1 && (this.data.bizType === null || this.data.buyerInfo.companyName === null)) {
                this.$message.error('请先选择业务类型及下游公司后再选择产品');
            }
            if (event && type === 2 && (this.data.bizType === null || this.data.sellerInfo.companyName === null)) {
                this.$message.error('请先选择业务类型及上游公司后再选择产品');
            }
            if (event && type === 3 && (this.data.bizType === null || this.data.buyerInfo.companyName === null || this.data.buyerInfo.prdSkuId === null)) {
                this.$message.error('请先选择业务类型、下游公司及产品后再选择交割库');
            }
            if (event && type === 4 && (this.data.bizType === null || this.data.sellerInfo.companyName === null || this.data.sellerInfo.prdSkuId === null)) {
                this.$message.error('请先选择业务类型、上游公司及产品后再选择交割库');
            }
        },
        warehouseidxbuys () {
            if (this.warehouseidxbuy !== null && this.warehouseidxbuy !== undefined) {
                for (var y = 0; y < this.buyDeliveryBank.length; y++) {
                    if (this.warehouseidxbuy === this.buyDeliveryBank[y].warehouseId) {
                        this.data.buyerInfo.deliveryWarehouseId = this.buyDeliveryBank[y].warehouseId;
                        this.data.buyerInfo.deliveryWarehouseName = this.buyDeliveryBank[y].warehouseName;
                    }
                }
            }
        },
        // 业务操作人选中
        businessManagerchk () {
            this.data.businessManagerName = this.businessManager[this.businessManageridx].userName;
            this.data.businessManagerId = this.businessManager[this.businessManageridx].usrUserId;
            this.userid = this.businessManager[this.businessManageridx].usrUserId;
        },
        warehouseidxsells () {
            if (this.warehouseidxsell !== null && this.warehouseidxsell !== undefined) {
                for (var s = 0; s < this.sellDeliveryBank.length; s++) {
                    if (this.warehouseidxsell === this.sellDeliveryBank[s].warehouseId) {
                        this.data.sellerInfo.deliveryWarehouseId = this.sellDeliveryBank[s].warehouseId;
                        this.data.sellerInfo.deliveryWarehouseName = this.sellDeliveryBank[s].warehouseName;
                    }
                }
            }
        },
        // 选中交易公司(上下游)
        checked (idx) {
            this.activeIndex = idx;
        },
        // 业务组选中
        checkGroup () {
            this.data.usrOrganizationId = this.businessManagerGroup[this.srOrganizationIdx].usrOrganizationId;
            this.data.usrOrganizationName = this.businessManagerGroup[this.srOrganizationIdx].orgName;
        },
        checkCompany (type) {
            // 下游
            if (type === '买') {
                this.dialogVisibles = true;
                this.data.buyerInfo.contractCode = null;
                this.data.buyerInfo.longtermContractOrderId = null;
            }
            if (type === '卖') {
                this.dialogVisible = true;
                this.data.sellerInfo.contractCode = null;
                this.data.sellerInfo.longtermContractOrderId = null;
            }
            if (this.data.bizType === null || this.data.bizType === '') {
                this.$message.error('请先选择业务类型');
                return;
            }
            this.companyName = null;
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
                that.checkPro(that.activeCompanyType);
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
            this.data.buyerInfo.targetCorpName = this.relatedCompany[this.data.targetCorpIdbuy].targetCorpName;
            this.data.buyerInfo.targetCorpId = this.relatedCompany[this.data.targetCorpIdbuy].targetCorpId;
            this.data.sellerInfo.targetCorpName = this.relatedCompany[this.data.targetCorpIdbuy].targetCorpName;
            this.data.sellerInfo.targetCorpId = this.relatedCompany[this.data.targetCorpIdbuy].targetCorpId;
        },
        // 根据所选产品获取交割库
        checkPro (type) {
            if (type === '卖') {
                for (let i = 0; i < this.proType.length; i++) {
                    if (this.sellerInfoProd === this.proType[i].goodsId) {
                        this.sellerInfoProdIndex = i;
                    }
                }
                this.data.sellerInfo.prdSkuId = this.proType[this.sellerInfoProdIndex].goodsId;
                this.data.sellerInfo.skuCode = this.proType[this.sellerInfoProdIndex].goodsCode;
                this.data.sellerInfo.prodName = this.proType[this.sellerInfoProdIndex].goodsName;
                this.data.buyerInfo.prdSkuId = this.proType[this.sellerInfoProdIndex].goodsId;
                this.data.buyerInfo.skuCode = this.proType[this.sellerInfoProdIndex].goodsCode;
                this.data.buyerInfo.prodName = this.proType[this.sellerInfoProdIndex].goodsName;
                this.buyerInfoProd = this.sellerInfoProd;
            }
            if (type === '买') {
                for (let i = 0; i < this.proType.length; i++) {
                    if (this.buyerInfoProd === this.proType[i].goodsId) {
                        this.sellerInfoProdIndex = i;
                    }
                }
                this.data.buyerInfo.prdSkuId = this.proType[this.sellerInfoProdIndex].goodsId;
                this.data.buyerInfo.skuCode = this.proType[this.sellerInfoProdIndex].goodsCode;
                this.data.buyerInfo.prodName = this.proType[this.sellerInfoProdIndex].goodsName;
                this.data.sellerInfo.prdSkuId = this.proType[this.sellerInfoProdIndex].goodsId;
                this.data.sellerInfo.skuCode = this.proType[this.sellerInfoProdIndex].goodsCode;
                this.data.sellerInfo.prodName = this.proType[this.sellerInfoProdIndex].goodsName;
                this.sellerInfoProd = this.buyerInfoProd;
            }
            let that = this;
            let params = {
                productId: type === '卖' ? this.sellerInfoProd : this.buyerInfoProd
            };
            this.$http.post(this.$api.contract.getWarehouseList, params).then(res => {
                that.sellDeliveryBank = res.data.data.warehouseList;
                that.buyDeliveryBank = res.data.data.warehouseList;
                if (that.$route.query.id !== null || that.$route.query.if !== undefined) {
                    if (that.data.contractType === 2) {
                        that.warehouseidxsells();
                    } else if (that.data.contractType === 3) {
                        that.warehouseidxbuys();
                    } else {
                        that.warehouseidxsells();
                        that.warehouseidxbuys();
                    }
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
                        if (res.data.data.rows[e].usrUserId === 1924) {
                            that.businessManageridx = e * 1;
                            that.data.businessManagerName = that.businessManager[that.businessManageridx].userName;
                            that.data.businessManagerId = that.businessManager[that.businessManageridx].usrUserId;
                            that.userid = that.businessManager[that.businessManageridx].usrUserId;
                        }
                    });
                }
            }).catch((e) => {
                console.log(e);
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
            if (this.activeCompanyType === '买') {
                this.dialogVisibles = false;
                this.data.buyerInfo.companyName = this.buyCompanyList[this.activeIndex].buyerCorpName;
                this.data.buyerInfo.companyId = this.buyCompanyList[this.activeIndex].buyerCorpId;
            } else {
                this.dialogVisible = false;
                this.data.sellerInfo.companyName = this.sellCompanyList[this.activeIndex].sellerCorpName;
                this.data.sellerInfo.companyId = this.sellCompanyList[this.activeIndex].sellerCorpId;
            }
        },
        beforeSubmit () {
            let rst = this.chksubmit();
            if (rst === false) {
                return false;
            }
            this.$messagebox.prompt('请输入安全码', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        if (instance.inputValue) {
                            this.data.prodName = instance.inputValue;
                            this.onsubmit();
                            done();
                        } else {
                            this.$message.error('必须输入安全码');
                        }
                    } else {
                        done();
                    }
                }
            }).then(({ value }) => {
                // 不做处理
            }).catch(() => {
                // 不做特殊处理
            });
        },
        // 提交到后台
        onsubmit () {
            this.$http.post(this.$api.contract.addOfflineContract, this.data).then((res) => {
                if (res.data.code === 0) {
                    this.$alert('补录合同成功 id= ' + res.data.data.id, '提交成功', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.go(0);
                        }
                    });
                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            });
        },
        // 提交前验证输入项
        chksubmit () {
            if (this.data.contractType === 1) {
                this.data.buyerInfo.skuQuantity = this.data.skuQuantity;
                this.data.sellerInfo.skuQuantity = this.data.skuQuantity;
            } else if (this.data.contractType === 2) {
                this.data.sellerInfo.skuQuantity = this.data.skuQuantity;
            } else if (this.data.contractType === 3) {
                this.data.buyerInfo.skuQuantity = this.data.skuQuantity;
            }
            if (!this.testForm(this.Verification, 1)) {
                return false;
            }

            if (this.data.contractType === 1) {
                if (!this.testForm(this.Verification1, 2)) {
                    return false;
                }
                if (!this.testForm(this.Verification1, 3)) {
                    return false;
                }
            } else if (this.data.contractType === 2 || this.data.contractType === 3) {
                if (!this.testForm(this.Verification1, this.data.contractType)) {
                    return false;
                }
            }
            if (this.deliveryContractList == null || this.deliveryContractList === undefined || this.deliveryContractList.length === 0) {
                this.unilateralRelevance.isUnilateralCorrelation = false;
            } else {
                this.unilateralRelevance.isUnilateralCorrelation = true;
            }
            if (this.unilateralRelevance.contractCode && !this.unilateralRelevance.isUnilateralCorrelation) {
                this.$message({
                    message: '已选择的单边合同无合同附件！',
                    type: 'error'
                });
                return false;
            }
            if (this.data.contractType === 1 || this.data.contractType === 2) {
                // 上游
                if (this.data.sellerInfo.provideInvoiceType === 3 && (this.data.sellerInfo.provideInvoiceDays === null || this.data.sellerInfo.provideInvoiceDays === '')) {
                    this.$message({
                        message: '请填写发票日期',
                        type: 'error'
                    });
                    return false;
                }
                if (!this.data.sellerInfo.deliveryDateFlag) {
                    this.$message({
                        message: '请先选择交割日期',
                        type: 'error'
                    });
                    return false;
                }
                if (!this.data.sellerInfo.deliveryBeginDate) {
                    this.$message({
                        message: `请选择${this.data.sellerInfo.deliveryDateFlag === 2 ? '截止日期' : '开始日期'}`,
                        type: 'error'
                    });
                    return false;
                }
                if (this.data.sellerInfo.deliveryDateFlag === 1 && !this.data.sellerInfo.deliveryEndDate) {
                    this.$message({
                        message: '请选择结束日期',
                        type: 'error'
                    });
                    return false;
                }
                if (this.data.sellerInfo.priceOfWeight) {
                    if (!this.data.sellerInfo.chattingCompanyName || this.getBLen(this.data.sellerInfo.chattingCompanyName) > 50) {
                        this.$message({
                            message: '请填写上游撮合公司且长度不能超过50字符',
                            type: 'error'
                        });
                        return false;
                    }
                }
                this.data.sellerInfo.chattingAmount = this.data.sellerInfo.skuQuantity * this.data.sellerInfo.priceOfWeight;

                if (this.buyContImg == null || this.buyContImg === undefined || this.buyContImg.length === 0) {
                    // 采购合同附件
                    this.$message({
                        message: '请上传盖章采购合同',
                        type: 'error'
                    });
                    return false;
                }
            }
            if (this.data.contractType === 1 || this.data.contractType === 3) {
                // 下游
                if (this.data.buyerInfo.provideInvoiceType === 3 && (this.data.buyerInfo.provideInvoiceDays === null || this.data.buyerInfo.provideInvoiceDays === '')) {
                    this.$message({
                        message: '请填写发票日期',
                        type: 'error'
                    });
                    return false;
                }
                if (!this.data.buyerInfo.deliveryDateFlag) {
                    this.$message({
                        message: '请先选择交割日期',
                        type: 'error'
                    });
                    return false;
                }
                if (!this.data.buyerInfo.deliveryBeginDate) {
                    this.$message({
                        message: `请选择${this.data.buyerInfo.deliveryDateFlag === 2 ? '截止日期' : '开始日期'}`,
                        type: 'error'
                    });
                    return false;
                }
                if (this.data.buyerInfo.deliveryDateFlag === 1 && !this.data.buyerInfo.deliveryEndDate) {
                    this.$message({
                        message: '请选择结束日期',
                        type: 'error'
                    });
                    return false;
                }
                if (this.data.buyerInfo.priceOfWeight) {
                    if (!this.data.buyerInfo.chattingCompanyName || this.getBLen(this.data.buyerInfo.chattingCompanyName) > 50) {
                        this.$message({
                            message: '请填写下游撮合公司且长度不能超过50字符',
                            type: 'error'
                        });
                        return false;
                    }
                }
                this.data.buyerInfo.chattingAmount = this.data.buyerInfo.skuQuantity * this.data.buyerInfo.priceOfWeight;

                if (this.saleContImg == null || this.saleContImg === undefined || this.saleContImg.length === 0) {
                    // 销售合同附件
                    this.$message({
                        message: '请上传盖章销售合同',
                        type: 'error'
                    });
                    return false;
                }
            }

            Object.assign(this.data, this.unilateralRelevance);
            this.data.purchaseCertifiedFileAttachList = this.buyContImg; // 采购合同附件
            this.data.saleCertifiedFileAttachList = this.saleContImg; // 销售合同附件
            return true;
        },
        getBLen (str) {
            if (str == null) return 0;
            if (typeof str !== 'string') {
                str += '';
            }
            return str.replace(/[^x00-xff]/g, '01').length;
        },
        // 表单验证
        testForm (type, e) {
            let that = this;
            let list = e === 1 ? that.data : e === 3 ? that.data.buyerInfo : that.data.sellerInfo;
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
        },
        // 时间选择限制
        pickertime (t) {
            if (t === 1 && this.data.sellerInfo.deliveryBeginDate > this.data.sellerInfo.deliveryEndDate && this.data.sellerInfo.deliveryEndDate !== null) {
                this.$message({
                    message: '开始时间不能大于结束时间',
                    type: 'error'
                });
                this.data.sellerInfo.deliveryBeginDate = null;
                return;
            }
            if (t === 2 && this.data.sellerInfo.deliveryBeginDate > this.data.sellerInfo.deliveryEndDate && this.data.sellerInfo.deliveryBeginDate !== null) {
                this.$message({
                    message: '结束时间应大于开始时间',
                    type: 'error'
                });
                this.data.sellerInfo.deliveryEndDate = null;
                return;
            }
            if (t === 3 && this.data.buyerInfo.deliveryBeginDate > this.data.buyerInfo.deliveryEndDate && this.data.buyerInfo.deliveryEndDate !== null) {
                this.$message({
                    message: '开始时间不能大于结束时间',
                    type: 'error'
                });
                this.data.buyerInfo.deliveryBeginDate = null;
                return;
            }
            if (t === 4 && this.data.buyerInfo.deliveryBeginDate > this.data.buyerInfo.deliveryEndDate && this.data.buyerInfo.deliveryBeginDate !== null) {
                this.$message({
                    message: '结束时间应大于开始时间',
                    type: 'error'
                });
                this.data.buyerInfo.deliveryEndDate = null;
            }
        },
        onDepositAppendBenchmark (type) {
            this.depositAppendBenchmarkType = type;
        },
        querySearch4DepositAppend (queryString, cb) {
            var restaurants = [];
            var results = null;
            if (this.depositAppendBenchmarkType === 2) {
                if (this.data.buyerInfo.depositAppendBenchmark === 'CCF') {
                    cb(restaurants);
                } else {
                    restaurants = [{value: '华东地区'}, {value: '华南地区'}];
                    results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                    // 调用 callback 返回建议列表的数据
                    cb(results);
                }
            } else if (this.depositAppendBenchmarkType === 3) {
                if (this.data.sellerInfo.depositAppendBenchmark === 'CCF') {
                    cb(restaurants);
                } else {
                    restaurants = [{value: '华东地区'}, {value: '华南地区'}];
                    results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                    // 调用 callback 返回建议列表的数据
                    cb(results);
                }
            } else {
                cb(restaurants);
            }
        },
        createFilter (queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
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

  .essential-row {
    .essential-item {
      .essential-title {
        flex: 0 0 110px;
        line-height: 30px;
        padding-left: 10px;
      }
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
