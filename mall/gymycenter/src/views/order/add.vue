<template>
    <div>
     <div class="new-order-fq" v-if="tab===0">
            <div class="new-title-public">
                发起订单
            </div>
        <p class="mewmyp"><i class="iconfont icon-dingdanxinxi mewmyicon"></i><span class="top-span">基础信息</span></p>
        <div class="center-div">
                <el-row :gutter="60">
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col class="left-span left-span-i-jj" :span="6">品名</el-col>
                            <el-col class="right-span left-span-i-jj" :span="18">{{info.skuName}}</el-col></el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                           <el-col :span="6" class="left-span"><span class="left-span-i">*</span>单价(元)</el-col>
                           <el-col :span="18" class="right-span">
                               <input class="gy-input" type="text" v-model="info.skuPrice">
                           </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span "><span class="left-span-i">*</span>交割库</el-col>
                            <el-col :span="18" class="dw-f right-span">
                               <input type="text" class="gy-input" v-model="deliveryWarehouseName"  @keyup.enter="getWarehouses">
                                 <ul v-show="showListA">
                                        <li v-for="(item, index) in warehousesList" :key="index" @click="handleSelectP(item)" v-if="warehousesList.length > 0">{{item.value}}</li>
                                 </ul>
                                 <i class="iconfont icon-mySearch dw-c" @click="getWarehouses"></i>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>数量</el-col>
                            <el-col :span="18" class="right-span">
                                <input type="text" v-model="info.skuQuantity" style="width: 70%;float: left;margin-top: -1px;">
                                <el-select v-model="info.infUnitOfMeasureId" style="width: 30%;float: right;">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top" style="height: 65px;">
                        <el-row>
                            <el-col :span="6" class="left-span left-span-i-jj">交割时间</el-col>
                            <el-col :span="18" class="right-span">
                                <el-radio-group v-model="list.deliveryDateFlag">
                                    <el-radio :label="1">时间段</el-radio>
                                    <el-radio :label="2">时间点</el-radio>
                                    <el-radio :label="3">自定义</el-radio>
                                </el-radio-group>
                                <el-date-picker v-if="list.deliveryDateFlag==1"
                                                v-model="deliveryDate"
                                                type="daterange"
                                                align="right"
                                                unlink-panels
                                                range-separator="至"
                                                :start-placeholder=info.deliveryBeginDate|date
                                                :end-placeholder=info.deliveryEndDate|date
                                                :picker-options="pickerOptions">
                                </el-date-picker>
                                <template v-if="list.deliveryDateFlag==2">
                                    <el-row>
                                        <el-col :span="21">
                                            <el-date-picker
                                                v-model="info.deliveryBeginDate"
                                                type="date"
                                                placeholder="选择日期">
                                            </el-date-picker>
                                        </el-col>
                                        <el-col :span="3">以前</el-col>
                                    </el-row>
                                </template>
                                <template v-if="list.deliveryDateFlag==3">
                                    <el-input v-model="list.deliveryDateText"></el-input>
                                </template>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span left-span-i-jj">总金额(元)</el-col>
                            <el-col :span="18" class="right-span left-span-i-jj">{{ sum| numToCash}}</el-col>
                        </el-row>
                    </el-col>
                </el-row>
        </div>
                <p class="mewmyp"><i class="iconfont icon-dingdanxinxi mewmyicon"></i> <span class="top-span">详细信息</span></p>
        <div class="center-div">
                <el-row :gutter="60">
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span left-span-i-jj">资源编号</el-col>
                            <el-col :span="18" class="right-span left-span-i-jj">{{info.odrOfferSn}}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>买方公司名</el-col>
                            <el-col :span="18" class="dw-f right-span">
                                <input placeholder="请输入" type="text" class="gy-input" v-model="info.companyName"  @keyup.enter="getCompany">
                                <ul v-show="showList">
                                    <li v-for="(item, index) in list1" :key="index" @click="handleSelectA(item)" v-if="list1.length > 0">{{item.value}}</li>
                                    <li class="none-tips" v-if="list1.length === 0">没有搜到相关公司</li>
                                </ul>
                                <i class="iconfont icon-mySearch dw-c" @click="getCompany"></i>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span left-span-i-jj">合同编号</el-col>
                            <el-col :span="18" class="right-span left-span-i-jj">{{info.contractCode}}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>交付方式</el-col>
                            <el-col :span="18" class="right-span"><el-select v-model="info.deliveryType" placeholder="请选择">
                                <el-option
                                    v-for="item in deliveryTypeOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select></el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>交割仓库地址</el-col>
                            <el-col :span="18" class="right-span"><input type="text" v-model="info.deliveryDetailedAddress"></el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>免仓期</el-col>
                            <el-col :span="18" class="right-span" style="margin-top: -8px">
                                <el-input-number v-model="info.warehouseFreeDays" :min="0" :step="1"></el-input-number>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>付款方式</el-col>
                            <el-col :span="18" class="right-span">
                                <el-select v-model="info.paymentType" placeholder="请选择">
                                    <el-option
                                        v-for="item in transactionOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <template v-if="info.paymentType===1" >
                                    <el-col :span="8" class="left-span-i-jj">买方收到货后</el-col>
                                    <el-col :span="9">
                                        <el-input v-model="info.paymentTypeText"></el-input>
                                    </el-col>
                                    <el-col :span="7">个工作日付款</el-col>
                                </template>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>是否分批</el-col>
                            <el-col :span="18" class="right-span">
                                <el-select v-model="info.isBatchDelivery" placeholder="请选择">
                                    <el-option
                                        v-for="item in isBatchDeliveryo"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <template v-if="info.isBatchDelivery === 1">
                                    <el-col :span="2"  class="left-span-i-jj">每</el-col>
                                    <el-col :span="7">
                                        <el-input v-model="info.batchDeliveryQuantity"></el-input>
                                    </el-col>
                                    <el-col :span="5">吨最多分</el-col>
                                    <el-col :span="8">
                                        <el-input v-model="info.batchDeliveryFrequency"></el-input>
                                    </el-col>
                                    批
                                </template>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>溢短装</el-col>
                            <el-col :span="18" class="right-span" style="margin-top: -8px">
                                <el-input-number v-model="info.shortOverflowRate" :min="0" :step="1"></el-input-number>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>保证金(%)</el-col>
                            <el-col :span="18" class="right-span" style="margin-top: -8px">
                                <el-input-number v-model="info.depositRatio" :min="0" :max="100" :step="1"></el-input-number>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>追加保证金(%)</el-col>
                            <el-col :span="1" class="right-span myb"  style="margin-top: 1px">跌</el-col>
                            <el-col :span="7" style="margin-top: -8px">
                                <el-input-number v-model="info.depositRatioSubtract" :min="0" :step="1"></el-input-number>
                            </el-col>
                            <el-col :span="2" class="myb" style="margin-top: 1px">补</el-col>
                            <el-col :span="8" style="margin-top: -8px">
                                <el-input-number v-model="info.depositRatioAppend" :min="0" :step="1"></el-input-number>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>合同回签时间</el-col>
                            <el-col :span="18" class="right-span">
                                <el-select v-model="info.contractBackSignDate">
                                    <el-option
                                        v-for="item in SignDateOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>发票</el-col>
                            <el-col :span="8" class="right-span">
                                <el-select v-model="provideInvoiceType" placeholder="请选择">
                                    <el-option
                                        v-for="item in provideInvoiceOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="1" class="left-span">或</el-col>
                            <el-col :span="9" class="right-span">
                                <el-input v-model="info.provideInvoiceText" placeholder="输入" @focus="changeInvoiceText"></el-input>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top" v-if="!(info.depositRatioSubtract === 0 && info.depositRatioAppend === 0)">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>追保基准</el-col>
                            <el-col :span="8" class="right-span">
                                <el-autocomplete
                                    class="inline-input"
                                    v-model="info.depositAppendBenchmark"
                                    :fetch-suggestions="querySearch1"
                                    placeholder="请输入或选择"
                                    @select="handleSelect"></el-autocomplete>
                            </el-col>
                            <el-col :span="8" class="right-span">
                                <el-autocomplete
                                    class="inline-input"
                                    v-model="info.depositAppendArea"
                                    :fetch-suggestions="querySearch2"
                                    placeholder="请输入或选择"
                                    @select="handleSelect"></el-autocomplete>
                            </el-col>
                            <el-col :span="2" class="right-span">
                                地区
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>结算数量</el-col>
                            <el-col :span="18" class="right-span">
                                <el-select v-model="info.acceptanceStandard">
                                    <el-option
                                        v-for="item in acceptanceOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>货源</el-col>
                            <el-col :span="18" class="right-span">
                                <el-select v-model="info.skuOrigin" placeholder="请选择">
                                    <el-option
                                        v-for="item in skuOriginOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>质量标准</el-col>
                            <el-col :span="18" class="right-span">
                                <el-select v-model="info.qualityStandard">
                                    <el-option
                                        v-for="item in qualityStandardOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>包装标准</el-col>
                            <el-col :span="18" class="right-span">
                                <el-select v-model="info.packagingStandard">
                                    <el-option
                                        v-for="item in packagingOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top" v-if="(info.depositRatioSubtract === 0 && info.depositRatioAppend === 0)">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>合同模板</el-col>
                            <el-col :span="18" class="right-span">
                                <el-select v-model="info.contractTemplateId" placeholder="请选择">
                                    <el-option
                                            v-for="item in tempOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>卖方联系人</el-col>
                            <el-col :span="18" class="dw-f right-span">
                                <input placeholder="请输入" type="text" @click="showSeller=false" class="gy-input" v-model="info.sellerContact"  @keyup.enter="getSeller">
                                <ul v-show="showSeller">
                                    <li v-for="(item, index) in sellerList" :key="index" @click="handleSeller(item)" v-if="sellerList.length > 0">{{item.contactName}}</li>
                                    <li class="none-tips" v-if="sellerList.length === 0">没有搜到相关内容</li>
                                </ul>
                                <i class="iconfont icon-mySearch dw-c" @click="getSeller"></i>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>卖方联系方式</el-col>
                            <el-col :span="18" class="right-span"><input type="text" v-model="info.sellerContactMobile"></el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>买方联系人</el-col>
                            <el-col :span="18" class="dw-f right-span">
                                <input placeholder="请输入" type="text" @click="showBuyer=false" class="gy-input" v-model="info.buyerContact"  @keyup.enter="getBuyer">
                                <ul v-show="showBuyer">
                                    <li v-for="(item, index) in buyerList" :key="index" @click="handleBuyer(item)" v-if="buyerList.length > 0">{{item.contactName}}</li>
                                    <li class="none-tips" v-if="buyerList.length === 0">没有搜到相关内容</li>
                                </ul>
                                <i class="iconfont icon-mySearch dw-c" @click="getBuyer"></i>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>买方联系方式</el-col>
                            <el-col :span="18" class="right-span"><input placeholder="请输入" type="text" v-model="info.buyerContactMobile"></el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top" v-if="!(info.depositRatioSubtract === 0 && info.depositRatioAppend === 0)">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>合同模板</el-col>
                            <el-col :span="18" class="right-span">
                                <el-select v-model="info.contractTemplateId" placeholder="请选择">
                                    <el-option
                                        v-for="item in tempOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
        </div>
         <div class="foot mybtn">
             <div class="l"><span class="wxts">温馨提示：</span>请注意交易信息真实合规。如需配置订单审批流程，请联系客服热线：400-777-6777</div>
             <div class="r">
                 <div class="gy-button-extra" @click="submitFormValid()"> 生成订单</div>
             </div>
         </div>
    </div>
        <div class="new-order-fq" v-if="tab===1">
            <div class="new-title-public">
                再次发起订单
            </div>
            <p class="mewmyp"><i class="iconfont icon-dingdanxinxi mewmyicon"></i><span class="top-span">基础信息</span></p>
            <div class="center-div">
                <el-row :gutter="60">
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col class="left-span left-span-i-jj" :span="6">品名</el-col>
                            <el-col class="right-span left-span-i-jj" :span="18">{{info.skuName}}</el-col></el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>单价(元)</el-col>
                            <el-col :span="18" class="right-span">
                                <input class="gy-input" type="text" v-model="skuPrice">
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span "><span class="left-span-i">*</span>交割库</el-col>
                            <el-col :span="18" class="dw-f right-span">
                                <input type="text" class="gy-input" v-model="deliveryWarehouseName"  @keyup.enter="getWarehouses">
                                <ul v-show="showListA">
                                    <li v-for="(item, index) in warehousesList" :key="index" @click="handleSelectP(item)" v-if="warehousesList.length > 0">{{item.value}}</li>
                                </ul>
                                <i class="iconfont icon-mySearch dw-c" @click="getWarehouses"></i>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>数量</el-col>
                            <el-col :span="18" class="right-span">
                                <input type="text" v-model="skuQuantity" style="width: 70%;float: left;margin-top: -1px;">
                                <el-select v-model="info.infUnitOfMeasureId" style="width: 30%;float: right;">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top" style="height: 65px;">
                        <el-row>
                            <el-col :span="6" class="left-span left-span-i-jj">交割时间</el-col>
                            <el-col :span="18" class="right-span">
                                <el-radio-group v-model="list.deliveryDateFlag">
                                    <el-radio :label="1">时间段</el-radio>
                                    <el-radio :label="2">时间点</el-radio>
                                    <el-radio :label="3">自定义</el-radio>
                                </el-radio-group>
                                <el-date-picker v-if="list.deliveryDateFlag==1"
                                                v-model="deliveryDate"
                                                type="daterange"
                                                align="right"
                                                unlink-panels
                                                range-separator="至"
                                                :start-placeholder=info.deliveryBeginDate|date
                                                :end-placeholder=info.deliveryEndDate|date
                                                :picker-options="pickerOptions">
                                </el-date-picker>
                                <template v-if="list.deliveryDateFlag==2">
                                    <el-row>
                                        <el-col :span="21">
                                            <el-date-picker
                                                v-model="info.deliveryBeginDate"
                                                type="date"
                                                placeholder="选择日期">
                                            </el-date-picker>
                                        </el-col>
                                        <el-col :span="3">以前</el-col>
                                    </el-row>
                                </template>
                                <template v-if="list.deliveryDateFlag==3">
                                    <el-input v-model="list.deliveryDateText"></el-input>
                                </template>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span left-span-i-jj">总金额(元)</el-col>
                            <el-col :span="18" class="right-span left-span-i-jj">{{ sum| numToCash}}</el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
            <p class="mewmyp"><i class="iconfont icon-dingdanxinxi mewmyicon"></i> <span class="top-span">详细信息</span></p>
            <div class="center-div">
                <el-row :gutter="60">
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span left-span-i-jj">资源编号</el-col>
                            <el-col :span="18" class="right-span left-span-i-jj">{{info.odrOfferSn}}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>买方公司名</el-col>
                            <el-col :span="18" class="dw-f right-span">
                                <input placeholder="请输入" type="text" class="gy-input" v-model="info.companyName"  @keyup.enter="getCompany">
                                <ul v-show="showList">
                                    <li v-for="(item, index) in list1" :key="index" @click="handleSelectA(item)" v-if="list1.length > 0">{{item.value}}</li>
                                    <li class="none-tips" v-if="list1.length === 0">没有搜到相关公司</li>
                                </ul>
                                <i class="iconfont icon-mySearch dw-c" @click="getCompany"></i>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span left-span-i-jj">合同编号</el-col>
                            <el-col :span="18" class="right-span left-span-i-jj">{{info.orderContractCode}}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>交付方式</el-col>
                            <el-col :span="18" class="right-span"><el-select v-model="info.deliveryType" placeholder="请选择">
                                <el-option
                                    v-for="item in deliveryTypeOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select></el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>交割仓库地址</el-col>
                            <el-col :span="18" class="right-span"><input type="text" v-model="info.deliveryDetailedAddress"></el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>免仓期</el-col>
                            <el-col :span="18" class="right-span" style="margin-top: -8px">
                                <el-input-number v-model="info.warehouseFreeDays" :min="0" :step="1"></el-input-number>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>付款方式</el-col>
                            <el-col :span="18" class="right-span">
                                <el-select v-model="info.paymentType" placeholder="请选择">
                                    <el-option
                                        v-for="item in transactionOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <template v-if="info.paymentType===1" >
                                    <el-col :span="8" class="left-span-i-jj">买方收到货后</el-col>
                                    <el-col :span="9">
                                        <el-input v-model="info.paymentTypeText"></el-input>
                                    </el-col>
                                    <el-col :span="7">个工作日付款</el-col>
                                </template>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>是否分批</el-col>
                            <el-col :span="18" class="right-span">
                                <el-select v-model="info.isBatchDelivery" placeholder="请选择">
                                    <el-option
                                        v-for="item in isBatchDeliveryo"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <template v-if="info.isBatchDelivery === 1">
                                    <el-col :span="2"  class="left-span-i-jj">每</el-col>
                                    <el-col :span="7">
                                        <el-input v-model="info.batchDeliveryQuantity"></el-input>
                                    </el-col>
                                    <el-col :span="5">吨最多分</el-col>
                                    <el-col :span="8">
                                        <el-input v-model="info.batchDeliveryFrequency"></el-input>
                                    </el-col>
                                    批
                                </template>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>溢短装</el-col>
                            <el-col :span="18" class="right-span" style="margin-top: -8px">
                                <el-input-number v-model="info.shortOverflowRate" :min="0" :step="1"></el-input-number>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>保证金(%)</el-col>
                            <el-col :span="18" class="right-span" style="margin-top: -8px">
                                <el-input-number v-model="info.depositRatio" :min="0" :max="100" :step="1"></el-input-number>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>追加保证金(%)</el-col>
                            <el-col :span="1" class="right-span myb"  style="margin-top: 1px">跌</el-col>
                            <el-col :span="7" style="margin-top: -8px">
                                <el-input-number v-model="info.depositRatioSubtract" :min="0" :step="1"></el-input-number>
                            </el-col>
                            <el-col :span="2" class="myb" style="margin-top: 1px">补</el-col>
                            <el-col :span="8" style="margin-top: -8px">
                                <el-input-number v-model="info.depositRatioAppend" :min="0" :step="1"></el-input-number>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>合同回签时间</el-col>
                            <el-col :span="18" class="right-span">
                                <el-select v-model="info.contractBackSignDate">
                                    <el-option
                                        v-for="item in SignDateOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>发票</el-col>
                            <el-col :span="8" class="right-span">
                                <el-select v-model="provideInvoiceType" placeholder="请选择">
                                    <el-option
                                        v-for="item in provideInvoiceOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="1" class="left-span">或</el-col>
                            <el-col :span="9" class="right-span">
                                <el-input v-model="info.provideInvoiceText" placeholder="输入" @focus="changeInvoiceText"></el-input>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top" v-if="!(info.depositRatioSubtract === 0 && info.depositRatioAppend === 0)">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>追保基准</el-col>
                            <el-col :span="8" class="right-span">
                                <el-autocomplete
                                    class="inline-input"
                                    v-model="info.depositAppendBenchmark"
                                    :fetch-suggestions="querySearch1"
                                    placeholder="请输入或选择"
                                    @select="handleSelect"></el-autocomplete>
                            </el-col>
                            <el-col :span="8" class="right-span">
                                <el-autocomplete
                                    class="inline-input"
                                    v-model="info.depositAppendArea"
                                    :fetch-suggestions="querySearch2"
                                    placeholder="请输入或选择"
                                    @select="handleSelect"></el-autocomplete>
                            </el-col>
                            <el-col :span="2" class="right-span">
                                地区
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>结算数量</el-col>
                            <el-col :span="18" class="right-span">
                                <el-select v-model="info.acceptanceStandard">
                                    <el-option
                                        v-for="item in acceptanceOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>货源</el-col>
                            <el-col :span="18" class="right-span">
                                <el-select v-model="info.skuOrigin" placeholder="请选择">
                                    <el-option
                                        v-for="item in skuOriginOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>质量标准</el-col>
                            <el-col :span="18" class="right-span">
                                <el-select v-model="info.qualityStandard">
                                    <el-option
                                        v-for="item in qualityStandardOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>包装标准</el-col>
                            <el-col :span="18" class="right-span">
                                <el-select v-model="info.packagingStandard">
                                    <el-option
                                        v-for="item in packagingOption"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top" v-if="(info.depositRatioSubtract === 0 && info.depositRatioAppend === 0)">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>合同模板</el-col>
                            <el-col :span="18" class="right-span">
                                <el-select v-model="info.contractTemplateId" placeholder="请选择">
                                    <el-option
                                            v-for="item in tempOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>卖方联系人</el-col>
                            <el-col :span="18" class="dw-f right-span">
                                <input placeholder="请输入" type="text" @click="showSeller=false" class="gy-input" v-model="info.sellerContact"  @keyup.enter="getSeller">
                                <ul v-show="showSeller">
                                    <li v-for="(item, index) in sellerList" :key="index" @click="handleSeller(item)" v-if="sellerList.length > 0">{{item.contactName}}</li>
                                    <li class="none-tips" v-if="sellerList.length === 0">没有搜到相关内容</li>
                                </ul>
                                <i class="iconfont icon-mySearch dw-c" @click="getSeller"></i>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>卖方联系方式</el-col>
                            <el-col :span="18" class="right-span"><input type="text" v-model="info.sellerContactMobile"></el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>买方联系人</el-col>
                            <el-col :span="18" class="dw-f right-span">
                                <input placeholder="请输入" type="text" @click="showBuyer=false" class="gy-input" v-model="info.buyerContact"  @keyup.enter="getBuyer">
                                <ul v-show="showBuyer">
                                    <li v-for="(item, index) in buyerList" :key="index" @click="handleBuyer(item)" v-if="buyerList.length > 0">{{item.contactName}}</li>
                                    <li class="none-tips" v-if="buyerList.length === 0">没有搜到相关内容</li>
                                </ul>
                                <i class="iconfont icon-mySearch dw-c" @click="getBuyer"></i>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>买方联系方式</el-col>
                            <el-col :span="18" class="right-span"><input placeholder="请输入" type="text" v-model="info.buyerContactMobile"></el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="top" v-if="!(info.depositRatioSubtract === 0 && info.depositRatioAppend === 0)">
                        <el-row>
                            <el-col :span="6" class="left-span"><span class="left-span-i">*</span>合同模板</el-col>
                            <el-col :span="18" class="right-span">
                                <el-select v-model="info.contractTemplateId" placeholder="请选择">
                                    <el-option
                                        v-for="item in tempOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
            <el-row class="mybtn">
                <div class="gy-button-extra" @click="submitFormValid()"> 生成订单</div>
            </el-row>
        </div>
    </div>
  </template>
<script>
export default {
    name: 'sellerOrder',
    data () {
        var append = (rule, value, callback) => {
            if (this.info.depositRatioAppend || this.info.depositRatioSubtract) {
                if (!this.info.depositAppendBenchmark || !this.info.depositAppendArea) {
                    callback(new Error('请填写追保基准和地区'));
                }
            }
            callback();
        };
        var provideInvoice = (rule, value, callback) => {
            if (!this.info.provideInvoiceText && this.provideInvoiceType === '') {
                callback(new Error('请选择发票或输入发票备注'));
            }
            callback();
        };
        var isBatchDelivery = (rule, value, callback) => {
            if (this.info.isBatchDelivery === 1 && (!this.info.batchDeliveryFrequency || !this.info.batchDeliveryQuantity)) {
                callback(new Error('请输入吨数和批次'));
            }
            callback();
        };
        var paymentType = (rule, value, callback) => {
            if (this.info.paymentType === 1 && this.info.paymentTypeText === '') {
                console.log(11);
                callback(new Error('请填写几个工作日付款'));
            }
            callback();
        };
        var houseName = (rule, value, callback) => {
            if (this.deliveryWarehouseName === '') {
                callback(new Error('请输入交割仓库名称'));
            }
            callback();
        };
        return {
            value5: '',
            info: {
                orderType: 1,
                skuQuantity: 0,
                orderItemList: [],
                infUnitOfMeasureId: '',
                qualityStandard: '国标',
                packagingStandard: 0,
                depositRatio: 0,
                paymentType: 0,
                batchDeliveryQuantity: '',
                batchDeliveryFrequency: '',
                buyerContact: '',
                deliveryType: 0,
                skuPrice: 0,
                companyName: '',
                provideInvoiceText: '',
                contractTemplateId: '',
                depositAppendBenchmark: '',
                depositAppendArea: '',
                shortOverflowRate: 5, // 溢短装
                isBatchDelivery: 0, // 是否分批
                warehouseFreeDays: 5, // 免仓期
                acceptanceStandard: 0,
                contractBackSignDate: 0,
                depositRatioSubtract: 0,
                depositRatioAppend: 0,
                contractCode: '',
                deliveryBeginDate: '',
                paymentTypeText: '',
                sellerContact: JSON.parse(localStorage.getItem('userInfo')).username,
                sellerContactMobile: JSON.parse(localStorage.getItem('userInfo')).phone
            },
            showListA: false,
            showList: false,
            list1: [],
            restList: [],
            restListB: [],
            tempOptions: [],
            provideInvoiceType: '',
            typeId: 0,
            tab: 0,
            ruleForm: {
                companyName: [{required: true, message: '请输入并选择买家公司名', trigger: 'blur'}], // 买家公司名
                skuQuantity: [{required: true, message: '请输入数量', trigger: 'blur'}], // 可供量
                deliveryWarehouseName: [{required: true, validator: houseName, trigger: 'blur'}], // 交割库
                deliveryDate: [{required: true, message: '请选择交割时间', trigger: 'blur'}], // 交割时间
                skuOrigin: [{required: true, message: '请选择货源类型', trigger: 'blur'}], // 货源
                deliveryType: [{required: true, message: '请选择交付方式', trigger: 'blur'}], // 交割方式
                deliveryDetailedAddress: [{required: true, message: '请输入交割仓库地址', trigger: 'blur'}], // 交割地址
                warehouseFreeDays: [{required: true, message: '免仓期不能为空，你可以输入0', trigger: 'blur'}], // 免仓期
                shortOverflowRate: [{required: true, message: '溢短装不能为空，你可以输入0', trigger: 'blur'}], // 溢短装
                paymentType: [{required: true, validator: paymentType, trigger: 'blur'}], // 付款方式
                depositRatio: [{required: true, message: '保证金不能为空，请输入0', trigger: 'blur'}], // 保证金
                qualityStandard: [{required: true, message: '请选择质量标准', trigger: 'blur'}], // 质量标准
                packagingStandard: [{required: true, message: '请选择包装标准', trigger: 'blur'}], // 包装标准
                acceptanceStandard: [{required: true, message: '请选择验收标准', trigger: 'blur'}], // 验收标准
                contractBackSignDate: [{required: true, message: '请选择合同回签时间', trigger: 'blur'}], // 合同回签时间
                sellerContact: [{required: true, message: '请输入卖联系人', trigger: 'blur'}], // 卖联系人
                sellerContactMobile: [{required: true, message: '请输入卖方联系人电话', trigger: 'blur'}], // 卖方联系人电话
                buyerContact: [{required: true, message: '请输入买方联系人', trigger: 'blur'}], // 买方联系人
                buyerContactMobile: [{required: true, message: '请输入买方联系人电话', trigger: 'blur'}], // 买方联系人电话
                isBatchDelivery: [{required: true, validator: isBatchDelivery, trigger: 'blur'}], // 买方联系人电话
                // provideInvoiceType: [{required: false, validator: InvoiceType, trigger: 'blur'}], // 买方联系人电话
                contractTemplateId: [{required: true, message: '请选择合同模版', trigger: 'blur'}], // 买方联系人电话
                depositAppendBenchmark: [{required: true, validator: append, trigger: 'blur'}], // 买方联系人电话
                provideInvoice: [{required: true, validator: provideInvoice, trigger: 'blur'}] // 买方联系人电话
            },
            deliveryWarehouseName: '',
            companyId: '',
            list: {
                deliveryDateFlag: 1,
                deliveryDateText: '双方协商为准'
            },
            deliveryDate: [], // 存时间
            deliveryTypeOption: [
                {
                    value: 1,
                    label: '买家自提'
                },
                {
                    value: 2,
                    label: '卖家送货'
                }],
            provideInvoiceOption: [{
                value: 0,
                label: '交割当月发票'
            },
            {
                value: 1,
                label: '交割次月发票'
            }],
            skuOriginOption: [{
                value: '国产',
                label: '国产'
            },
            {
                value: '进口',
                label: '进口'
            }],
            transactionOption: [{
                value: 0,
                label: '先款后货'
            },
            {
                value: 1,
                label: '先货后款'
            }],
            packagingOption: [{
                value: 0,
                label: '散水'
            },
            {
                value: 1,
                label: '桶装货'
            },
            {
                value: 2,
                label: '袋装'
            }],
            qualityStandardOption: [{
                value: '国标',
                label: '国标'
            },
            {
                value: '生产商标准',
                label: '生产商标准'
            }],
            acceptanceOption: [{
                value: 0,
                label: '出库单数量'
            },
            {
                value: 1,
                label: '收货单数量'
            }],
            SignDateOption: [{
                value: 0,
                label: '当天'
            },
            {
                value: 1,
                label: '隔日'
            }],
            isBatchDeliveryo: [{
                value: 0,
                label: '否'
            },
            {
                value: 1,
                label: '是'
            }],
            options: [], // 存单位
            warehousesList: [],
            tempArray: [],
            restaurants: [],
            pickerOptions: { // 日期
                shortcuts: [{
                    text: '最近一周',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            showSeller: false,
            sellerList: [],
            showBuyer: false,
            buyerList: []
        };
    },
    created () {
        this.offerId = this.$route.query.offerId;
        this.typeId = this.$route.query.typeId;
        this.offerId && this.getInfos();
        this.measures();
    },
    watch: {
        provideInvoiceType: function () {
            this.info.provideInvoiceText = '';
        },
        deliveryWarehouseName: function (val) {
            if (val === '') {
                this.info.deliveryDetailedAddress = '';
            }
        },
        depositRatio: function (val) {
            if (val === 0) {
                this.info.depositRatioSubtract = 0;
                this.info.depositRatioAppend = 0;
            }
        }
    },
    computed: {
        sum () {
            return parseFloat(this.info.skuPrice) * parseFloat(this.info.skuQuantity);
        },
        depositRatio () {
            return this.info.depositRatio;
        }
    },
    methods: {
        getcontractCode () {
            this.$http.get(this.$api.order.contractCode + this.info.productId).then((res) => {
                if (res.data.code === 0) {
                    this.info.contractCode = res.data.data;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        getTem () {
            this.companyId = JSON.parse(localStorage.getItem('userInfo')).companyId;
            this.$http.get(this.$api.order.contractTemplates + 'companyId=' + this.companyId + '&prdId=' + this.info.productId).then((res) => {
                if (res.data.code === 0) {
                    // this.tempOptions = res.data.data;
                    let param = {};
                    for (let i = 0; i < res.data.data.length; i++) {
                        param.label = res.data.data[i].templateName;
                        param.value = res.data.data[i].id;
                        this.tempOptions.push(param);
                        param = {};
                    }
                    if (this.tempOptions.length === 1) {
                        this.info.contractTemplateId = this.tempOptions[0].value;
                    }
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        measures () { // 获取单位
            let that = this;
            that.$http.post(that.$api.offers.measures).then(function (res) {
                that.options = res.data.data.list;
            });
        },
        changeInvoiceText () {
            this.provideInvoiceType = '';
        },
        getInfos () {
            let that = this;
            that.$http.get(that.$api.offers.resources + '/' + that.offerId).then(function (res) {
                if (res.data.code === 0) {
                    that.info = Object.assign(that.info, res.data.data);
                    that.skuQuantity = that.info.skuQuantity;
                    if (that.info.paymentType === 2) {
                        that.info.paymentType = 0;
                    }
                    if (!that.info.skuPrice) {
                        that.info.skuPrice = '';
                    }
                    (that.info.deliveryType === 0) && (that.info.deliveryType = '');
                    that.list.deliveryDateFlag = that.info.deliveryDateFlag;
                    if (res.data.data.deliveryEndDate) {
                        that.deliveryDate[0] = res.data.data.deliveryBeginDate;
                        that.deliveryDate[1] = res.data.data.deliveryEndDate;
                    }
                    that.deliveryWarehouseName = that.info.deliveryWarehouseName;
                    that.getTem();
                    that.getcontractCode();
                } else {
                    that.$message(res.data.message);
                }
            });
        },
        submitFormValid () {
            console.log(this.info.shortOverflowRate);
            if (!this.info.skuPrice) {
                this.$message.error('单价不能为空');
                return;
            }
            if (!this.deliveryWarehouseName) {
                this.$message.error('交割库不能为空');
                return;
            }
            if (!this.info.skuQuantity) {
                this.$message.error('数量不能为空');
                return;
            }
            if (!this.info.buyerCompanyName) {
                this.$message.error('买方公司名不能为空');
                return;
            }
            if (!this.info.deliveryType) {
                this.$message.error('交付方式不能为空');
                return;
            }
            if (!this.info.deliveryDetailedAddress) {
                this.$message.error('交割仓库地址不能为空');
                return;
            }
            // if (!this.info.warehouseFreeDays) {
            //     this.$message.error('免仓期不能为空');
            //     return;
            // }
            if (this.info.paymentType === 1 && this.info.paymentTypeText === '') {
                this.$message.error('请填写几个工作日付款');
                return;
            }
            if (this.info.isBatchDelivery === 1 && (!this.info.batchDeliveryFrequency || !this.info.batchDeliveryQuantity)) {
                this.$message.error('请输入吨数和批次');
                return;
            }
            if (this.info.shortOverflowRate === undefined || this.info.shortOverflowRate === null || this.info.shortOverflowRate === '') {
                this.$message.error('溢短装不能为空');
                return;
            }
            if (!this.info.provideInvoiceText && this.provideInvoiceType === '') {
                this.$message.error('请选择发票或输入发票备注');
                return;
            }
            // if (!this.info.depositRatio) {
            //     this.$message.error('保证金不能为空');
            //     return;
            // }
            // if (!this.info.depositRatioSubtract) {
            //     this.$message.error('追加保证金不能为空');
            //     return;
            // }
            // if (!this.info.depositRatioAppend) {
            //     this.$message.error('追加保证金不能为空');
            //     return;
            // }
            if (this.info.depositRatioAppend || this.info.depositRatioSubtract) {
                if (!this.info.depositAppendBenchmark || !this.info.depositAppendArea) {
                    this.$message.error('请填写追保基准和地区');
                    return;
                }
            }
            // console.log(this.info.packagingStandard);
            // if (!this.info.packagingStandard) {
            //     this.$message.error('包装标准不能为空');
            //     return;
            // }
            if (!this.info.sellerContact) {
                this.$message.error('卖方联系人不能为空');
                return;
            }
            if (!this.info.sellerContactMobile) {
                this.$message.error('卖方联系方式不能为空');
                return;
            }
            if (!this.info.buyerContact) {
                this.$message.error('买方联系人不能为空');
                return;
            }
            if (!this.info.buyerContactMobile) {
                this.$message.error('买方联系方式不能为空');
                return;
            }
            if (!this.info.contractTemplateId) {
                this.$message.error('合同模板不能为空');
                return;
            }
            this.submitForm();
        },
        submitForm () {
            if (this.skuQuantity <= 0) {
                this.$message('资源单数量为0，不能创建订单');
                return false;
            }
            if (this.skuQuantity < this.info.skuQuantity) {
                this.$confirm('您输入的数量大于资源单发布的数量, 是否继续?', '提示', {
                    confirmButtonText: '继续',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.Submission();
                }).catch(() => {
                    return false;
                });
            } else {
                this.Submission();
            }
        },
        Submission () {
            let that = this;
            that.list.odrOfferId = that.offerId;
            that.list.skuPrice = that.info.skuPrice;
            that.list.infUnitOfMeasureId = that.info.infUnitOfMeasureId;
            that.list.deliveryWarehouseId = that.info.deliveryWarehouseId;
            that.list.deliveryWarehouseName = that.deliveryWarehouseName;
            that.list.deliveryDetailedAddress = that.info.deliveryDetailedAddress;
            if (that.list.deliveryDateFlag === 1) {
                that.list.deliveryBeginDate = new Date(this.deliveryDate[0]).getTime();
                that.list.deliveryEndDate = new Date(this.deliveryDate[1]).getTime();
            }
            if (that.list.deliveryDateFlag === 2) {
                that.list.deliveryBeginDate = that.info.deliveryBeginDate;
            }
            if (this.info.depositRatioSubtract === 0 && this.info.depositRatioAppend === 0) {
                this.info.depositAppendBenchmark = this.info.depositAppendBenchmark ? this.info.depositAppendBenchmark : '安迅思';
                this.info.depositAppendArea = this.info.depositAppendArea ? this.info.depositAppendArea : '华东';
            }
            that.list.skuQuantity = that.info.skuQuantity;
            that.info.orderItemList = [];
            that.info.provideInvoiceType = that.provideInvoiceType;
            that.info.orderItemList.push(that.list);
            that.$http.post(that.$api.order.createOrderList, that.info)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.$router.push({name: 'salesList'});
                    } else {

                    }
                }).catch(() => {
                    console.log('服务器繁忙');
                });
        },
        querySearch (queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        querySearch1 (queryString, cb) {
            var restaurants = this.restList;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        querySearch2 (queryString, cb) {
            var restaurants = this.restListB;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter (queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadA () {
            return [{
                value: '安迅思'},
            {
                value: 'CCF'
            },
            {
                value: '卓创'
            },
            {
                value: '隆众网'
            }
            ];
        },
        loadB () {
            return [{
                value: '华东'},
            {
                value: '华南'
            }
            ];
        },
        handleSelectA (item) {
            var that = this;
            that.info.buyerCompanyName = item.value;
            that.info.buyerCompanyId = item.id;
            that.info.companyName = item.value;
            that.showList = false;
        },
        handleSelect (item) {
            console.log(item);
        },
        getWarehouses () {
            this.showListA = true;
            this.$http.get(this.$api.offers.warehouses + this.deliveryWarehouseName).then((res) => {
                if (res.data.code === 0) {
                    let param = {};
                    this.warehousesList = [];
                    for (let i = 0; i < res.data.data.length; i++) {
                        param.value = res.data.data[i].name;
                        param.id = res.data.data[i].id;
                        param.provinceName = res.data.data[i].provinceName;
                        param.cityName = res.data.data[i].cityName;
                        param.districtName = res.data.data[i].districtName;
                        param.districtId = res.data.data[i].districtId;
                        param.address = res.data.data[i].address;
                        this.warehousesList.push(param);
                        param = {};
                    }
                } else {
                    console.log('服务器繁忙');
                }
            });
        },
        handleSelectP (item) {
            this.info.deliveryWarehouseId = item.id;
            this.deliveryWarehouseName = item.value;
            this.info.provinceName = item.provinceName;
            this.info.cityName = item.cityName;
            this.info.districtName = item.districtName;
            this.info.deliveryDistrictId = item.districtId;
            this.info.deliveryDetailedAddress = item.address;
            this.showListA = false;
        },
        getCompany () {
            var that = this;
            that.showList = true;
            that.list1 = [];
            this.$http.post(that.$api.order.creatOrderCompanies, {
                companyTypeId: 1,
                name: that.info.companyName
            }).then(function (res) {
                if (res.data.code === 0) {
                    let param = {};
                    for (let i = 0; i < res.data.data.length; i++) {
                        param.value = res.data.data[i].companyName;
                        param.id = res.data.data[i].companyId;
                        that.list1.push(param);
                        param = {};
                    }
                } else {
                    console.log('商品服务器繁忙');
                }
            });
        },
        getSeller () {
            var companyId = JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).companyId;
            var that = this;
            that.showSeller = true;
            that.sellerList = [];
            this.$http.post(that.$api.order.orderContact, {
                sellerCompanyId: companyId,
                buyerCompanyId: this.info.buyerCompanyId,
                confirmCompanyId: companyId,
                contactName: that.info.sellerContact
            }).then(function (res) {
                if (res.data.code === 0) {
                    that.sellerList = res.data.data ? res.data.data : [];
                } else {
                    that.$message.error(res.data.message);
                }
            });
        },
        handleSeller (item) {
            this.info.sellerContact = item.contactName;
            this.info.sellerContactMobile = item.contactMobile;
            this.showSeller = false;
        },
        getBuyer () {
            var that = this;
            var companyId = JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).companyId;
            that.showBuyer = true;
            that.buyerList = [];
            this.$http.post(that.$api.order.orderContact, {
                sellerCompanyId: companyId,
                buyerCompanyId: this.info.buyerCompanyId,
                confirmCompanyId: this.info.buyerCompanyId,
                contactName: that.info.buyerContact
            }).then(function (res) {
                if (res.data.code === 0) {
                    that.buyerList = res.data.data ? res.data.data : [];
                } else {
                    that.$message.error(res.data.message);
                }
            });
        },
        handleBuyer (item) {
            this.info.buyerContact = item.contactName;
            this.info.buyerContactMobile = item.contactMobile;
            this.showBuyer = false;
        }
    },
    mounted () {
        this.restList = this.loadA();
        this.restListB = this.loadB();
    }
};
</script>
<style lang="scss" scoped>
    .new-order-fq{
        .top-span{
            font-size: 14px;
            color: #333;
            font-weight: bold;
            margin-left: 7px;
            vertical-align: middle;
        }
        .left-span{
            font-size: 14px;
            color: #333;
        }
        .left-span-i{
            color: red;
            margin-right: 2px;
            vertical-align: middle;
        }
        .left-span-i-jj{
            padding-left: 8px;
        }
        .right-span{
            font-size: 14px;
            color: #666;
        }
        .dw-f{
            position: relative;
        }
        .dw-c{
            position: absolute;
            top: 0;
            right: 0;
        }
        .top{
            margin-bottom: 20px;
        }
        .center-div{
            padding: 0 30px;
        }
        .mybtn{
            margin-top: 10px;
            margin-bottom: 30px;
            text-align: right;
            padding-right: 30px;
        }
        .myb{
            margin-top: 9px;
            text-align: center;
        }
        ul{
            background-color: #fff;
            width: 100%;
            max-height: 200px;
            overflow: auto;
            position: absolute;
            left: 0;
            top: 31px;
            z-index: 9;
            border: 1px solid $color-border;
            border-top: none;
            li{
                padding: 5px 10px;
                cursor: pointer;
                &:hover{
                    background-color: #f5f7fa;
                    color: $color-extra;
                }
                &.none-tips{
                    font-size: $small-font;
                    text-align: center;
                }
            }
        }
        .wxts {
            color: #EEA443;
            font-size: 14px;
            font-weight: bold;
        }
        .foot {
            display: flex;
            .l{
                width: 70%;
                padding-left: 40px;
                line-height: 30px;
                text-align: left;
            }
            .r{
                width: 30%;
                text-align: right;
            }
        }
    }
</style>
<style lang="scss">
    .new-order-fq{
    .el-input-number__decrease{
        position: absolute;
        z-index: 1;
        top: 10px;
        width: 25px;
        height: 25px;
        text-align: center;
        background: #f5f7fa;
        color: #666;
        line-height: 25px;
        font-size: 12px;
    }
    .el-input-number__increase{
        position: absolute;
        z-index: 1;
        top: 10px;
        width: 25px;
        height: 25px;
        text-align: center;
        background: #f5f7fa;
        color: #666;
        line-height: 25px;
        font-size: 12px;
    }
     .el-input-number{
            position: relative;
            display: inline-block;
            width: 121px;
         .el-input__inner{
             padding-left: 0;
             padding-right: 0;
          }
     }
    }
</style>
