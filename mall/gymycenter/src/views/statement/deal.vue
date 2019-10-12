<template>
    <div class="lic deal">
        <div class="new-title-public">
            交易报表
        </div>
        <div>
            <div class="state-title-wrap">
                <p style="margin-left: -7px;" class="state-title"><i class="iconfont icon-info"></i><span>交易报表</span></p>
            </div>
            <div class="gy-form my-form">
                <div class="gy-form-group my-raio-wrap">
                    <label><input type="radio" v-model="info.periods" value="当日" @click="timer(1)">当日</label>
                    <label><input type="radio" v-model="info.periods" value="当周" @click="timer(2)">当周</label>
                    <label><input type="radio" v-model="info.periods" value="当月" @click="timer(3)">当月</label>
                    <label><input type="radio" v-model="info.periods" value="当年" @click="timer(4)">当年</label>
                    <label><input type="radio" v-model="info.periods" value="自定义" @click="timer(5)">自定义</label>
                </div>
                <div class="gy-form-group">
                    <span class="l">日期</span>
                    <div v-if="!userdefined">{{time.startTime.slice(0, 10)}} 至 {{time.endTime.slice(0, 10)}}</div>
                    <div v-if="userdefined">
                        <el-date-picker
                            style="height:30px;"
                            v-model="createDate"
                            type="daterange"
                            align="center"
                            unlink-panels
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder = '开始日期'
                            end-placeholder= '结束日期'
                            @change="customDate"
                            >
                        </el-date-picker>
                    </div>
                </div>
                <div class="gy-form-group cl">
                    <span class="l">成交采购订单数</span>
                    <div>{{base.purchaseNoteCount}}</div>
                </div>
                <div class="gy-form-group">
                    <span class="l">成交销售订单数</span>
                    <div>{{base.sellerNoteCount}}</div>
                </div>
                <div class="gy-form-group">
                    <span class="l">成交采购数量（吨）</span>
                    <div>{{base.purchaseQuantity | numToCash(3)}}</div>
                </div>
                <div class="gy-form-group">
                    <span class="l">成交销售数量（吨）</span>
                    <div>{{base.sellerQuantity | numToCash(3)}}</div>
                </div>
                <div class="gy-form-group">
                    <span class="l">成交采购金额（元） </span>
                    <div>{{base.purchaseAmount | numToCash}}</div>
                </div>
                <div class="gy-form-group">
                    <span class="l">成交销售金额（元）</span>
                    <div>{{base.sellerAmount | numToCash}}</div>
                </div>
                <div class="gy-form-group">
                    <span class="l">付款金额（元）</span>
                    <div>{{base.paymentAmount | numToCash}}</div>
                </div>
                <div class="gy-form-group">
                    <span class="l">收款金额（元）</span>
                    <div>{{base.collectionAmount | numToCash}}</div>
                </div>
                <div class="gy-form-group">
                    <span class="l">收货数量（吨）</span>
                    <div>{{base.receiveQuantity | numToCash(3)}}</div>
                </div>
                <div class="gy-form-group">
                    <span class="l">发货数量（吨）</span>
                    <div>{{base.sendQuantity | numToCash(3)}}</div>
                </div>
            </div>
            <div class="tabs">
                <ul>
                    <li v-for="(item, index) in tabList" :class="{'selected': index === tabIdx}" :key="index" @click="tabClick(tabIdx = index)">{{item.name}}</li>
                </ul>
                <div class="btn-wrap">
                    <button class="gy-button-extra exportBtn" @click="exportBtn(tabIdx)">导出</button>
                    <button class="gy-button-normal exportBtn2" @click="exportAll">全部导出</button>
                </div>
            </div>
            <div class="tables">
                <table class="gy-table" v-if="tabIdx === 0">
                    <thead>
                    <tr>
                        <!-- <td></td> -->
                        <td>订单日期</td>
                        <td>采购订单号</td>
                        <td>供应商</td>
                        <td>采购数量(吨)</td>
                        <td>采购金额(元)</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="!list1.purchaseNoteDtos">
                        <td  style="text-align:center;" colspan="6">暂无数据...</td>
                    </tr>
                    <tr v-else v-for="(item, index) in list1.purchaseNoteDtos" :key="index">
                        <!-- <td></td> -->
                        <td>{{item.orderTime|date}}</td>
                        <td>{{item.orderNumber}}</td>
                        <td>{{item.sellerCompanyName}}</td>
                        <td class="text-r">{{item.purchaseQuantity || 0 |numToCash(3)}}</td>
                        <td class="text-r">{{item.purchaseAmount || 0 |numToCash}}</td>
                    </tr>
                    <tr>
                        <td style="text-align: left;">当前页合计</td>
                        <!-- <td></td> -->
                        <td></td>
                        <td></td>
                        <td class="text-r">{{this.cloumNum(list1.purchaseNoteDtos, 'purchaseQuantity') || 0 | numToCash(3)}}
                        </td>
                        <td class="text-r">{{this.cloumNum(list1.purchaseNoteDtos, 'purchaseAmount') || 0 | numToCash}}</td>
                    </tr>
                    <tr>
                        <td style="text-align: left;">所有页合计</td>
                        <td></td>
                        <!-- <td></td> -->
                        <td></td>
                        <td class="text-r">{{list1.totalPagePurchaseQuantity || 0 | numToCash(3)}}</td>
                        <td class="text-r">{{list1.totalPagePurchaseAmount || 0 | numToCash}}</td>
                    </tr>
                    </tbody>
                </table>
                <table class="gy-table" v-if="tabIdx === 1">
                    <thead>
                    <tr>
                        <td>期间</td>
                        <td>采购订单号</td>
                        <td>供应商</td>
                        <td class="text-r">采购数量(吨)</td>
                        <td class="text-r">采购金额(元)</td>
                        <td class="text-r">本期付款(元)</td>
                        <td class="text-r">累计付款(元)</td>
                        <td class="text-r">应付款(元)</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="!list2.billPaymentDtos">
                        <td style="text-align:center;" colspan="9">暂无数据...</td>
                    </tr>
                    <tr v-else v-for="(item, index) in list2.billPaymentDtos" :key="index">
                        <td>{{item.period}}</td>
                        <td>{{item.orderNumber}}</td>
                        <td>{{item.sellerCompanyName}}</td>
                        <td class="text-r">{{item.purchaseGoodsQuantity || 0 |numToCash(3)}}</td>
                        <td class="text-r">{{item.purchaseAmount || 0 |numToCash}}</td>
                        <td class="text-r">{{item.currentPayment || 0 |numToCash}}</td>
                        <td class="text-r">{{item.accumulatePayment || 0 |numToCash}}</td>
                        <td class="text-r">{{item.needPayment || 0 |numToCash}}</td>
                    </tr>
                    <tr>
                        <td style="text-align: left; width: 100px">当前页合计</td>
                        <td></td>
                        <td></td>
                        <td class="text-r">{{this.cloumNum(list2.billPaymentDtos, 'purchaseGoodsQuantity')|| 0
                            |numToCash(3)}}
                        </td>
                        <td class="text-r">{{this.cloumNum(list2.billPaymentDtos, 'purchaseAmount')|| 0 |numToCash}}</td>
                        <td class="text-r">{{this.cloumNum(list2.billPaymentDtos, 'currentPayment')|| 0 |numToCash}}</td>
                        <td class="text-r">{{this.cloumNum(list2.billPaymentDtos, 'accumulatePayment')|| 0 |numToCash}}</td>
                        <td class="text-r">{{this.cloumNum(list2.billPaymentDtos, 'needPayment') || 0 | numToCash}}</td>
                    </tr>
                    <tr>
                        <td style="text-align: left; width: 100px">所有页合计</td>
                        <td></td>
                        <td></td>
                        <td class="text-r">{{list2.totalPagePurchaseGoodsQuantity || 0 | numToCash(3)}}</td>
                        <td class="text-r">{{list2.totalPagePurchaseAmount || 0 | numToCash}}</td>
                        <td class="text-r">{{list2.totalPageCurrentPayment || 0 | numToCash}}</td>
                        <td class="text-r">{{list2.totalPageAccumulatePayment || 0 | numToCash}}</td>
                        <td class="text-r">{{list2.totalPageNeedPayment || 0 | numToCash}}</td>
                    </tr>
                    </tbody>
                </table>
                <table class="gy-table" v-if="tabIdx === 2">
                    <thead>
                    <tr>
                        <td>期间</td>
                        <td>采购订单号</td>
                        <td>供应商</td>
                        <td>采购数量(吨)</td>
                        <td>采购金额(元)</td>
                        <td>本期收货数量(吨)</td>
                        <td>累计收货数量(吨)</td>
                        <td>待收货数量(吨)</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="!list3.receiveGoodsDtos">
                        <td style="text-align:center;" colspan="9">暂无数据...</td>
                    </tr>
                    <tr v-else v-for="(item, index) in list3.receiveGoodsDtos" :key="index">
                        <td>{{item.period}}</td>
                        <td>{{item.orderNumber}}</td>
                        <td>{{item.sellerCompanyName}}</td>
                        <td class="text-r">{{item.purchaseQuantity || 0 |numToCash(3)}}</td>
                        <td class="text-r">{{item.purchaseAmount || 0 |numToCash}}</td>
                        <td class="text-r">{{item.currentReceiveQuantity || 0 |numToCash(3)}}</td>
                        <td class="text-r">{{item.accumulateReceiveQuantity || 0 |numToCash(3)}}</td>
                        <td class="text-r">{{item.needReceiveQuantity || 0 |numToCash(3)}}</td>
                    </tr>
                    <tr>
                        <td style="text-align: left; width: 100px">当前页合计</td>
                        <td></td>
                        <td></td>
                        <td class="text-r">{{this.cloumNum(list3.receiveGoodsDtos, 'purchaseQuantity') || 0 |numToCash(3)}}
                        </td>
                        <td class="text-r">{{this.cloumNum(list3.receiveGoodsDtos, 'purchaseAmount') || 0 |numToCash}}</td>
                        <td class="text-r">{{this.cloumNum(list3.receiveGoodsDtos, 'currentReceiveQuantity') || 0
                            |numToCash}}
                        </td>
                        <td class="text-r">{{this.cloumNum(list3.receiveGoodsDtos, 'accumulateReceiveQuantity') || 0
                            |numToCash}}
                        </td>
                        <td class="text-r">{{this.cloumNum(list3.receiveGoodsDtos, 'needReceiveQuantity') || 0 | numToCash}}
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left; width: 100px">所有页合计</td>
                        <td></td>
                        <td></td>
                        <td class="text-r">{{list3.totalPagePurchaseQuantity || 0 | numToCash(3)}}</td>
                        <td class="text-r">{{list3.totalPagePurchaseAmount || 0 | numToCash}}</td>
                        <td class="text-r">{{list3.totalPageCurrentReceiveQuantity || 0 | numToCash(3)}}</td>
                        <td class="text-r">{{list3.totalPageAccumulateReceiveQuantity || 0 | numToCash(3)}}</td>
                        <td class="text-r">{{list3.totalPageNeedReceiveQuantity || 0 | numToCash(3)}}</td>
                    </tr>
                    </tbody>
                </table>
                <table class="gy-table" v-if="tabIdx === 3">
                    <thead>
                    <tr>
                        <td>订单日期</td>
                        <td>销售订单号</td>
                        <td>客户</td>
                        <td>销售数量(吨)</td>
                        <td>销售金额(元)</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="!list4.sellerNoteDtos">
                        <td style="text-align:center;" colspan="6">暂无数据...</td>
                    </tr>
                    <tr v-else v-for="(item, index) in list4.sellerNoteDtos" :key="index">
                        <td>{{item.orderTime|date}}</td>
                        <td>{{item.orderNumber}}</td>
                        <td>{{item.buyerCompanyName}}</td>
                        <td class="text-r">{{item.sellerQuantity || 0 |numToCash(3)}}</td>
                        <td class="text-r">{{item.sellerAmount || 0|numToCash}}</td>
                    </tr>
                    <tr>
                        <td style="text-align: left; width: 100px">当前页合计</td>
                        <td></td>
                        <td></td>
                        <td class="text-r">{{this.cloumNum(list4.sellerNoteDtos, 'sellerQuantity') || 0 | numToCash(3)}}</td>
                        <td class="text-r">{{this.cloumNum(list4.sellerNoteDtos, 'sellerAmount') || 0 | numToCash}}</td>
                    </tr>
                    <tr>
                        <td style="text-align: left; width: 100px">所有页合计</td>
                        <td></td>
                        <td></td>
                        <td class="text-r">{{list4.totalPageSellerQuantity || 0 | numToCash(3)}}</td>
                        <td class="text-r">{{list4.totalPageSellerAmount || 0 | numToCash}}</td>
                    </tr>
                    </tbody>
                </table>
                <table class="gy-table" v-if="tabIdx === 4">
                    <thead>
                    <tr>
                        <td>期间</td>
                        <td>销售订单号</td>
                        <td>客户</td>
                        <td>销售数量(吨)</td>
                        <td>销售金额(元)</td>
                        <td>本期收款(元)</td>
                        <td>累计收款(元)</td>
                        <td>应收款(元)</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="!list5.billCollectionDtos">
                        <td style="text-align:center;" colspan="9">暂无数据...</td>
                    </tr>
                    <tr v-else v-for="(item, index) in list5.billCollectionDtos" :key="index">
                        <td>{{item.period}}</td>
                        <td>{{item.orderNumber}}</td>
                        <td>{{item.buyerCompanyName}}</td>
                        <td class="text-r">{{item.sellerGoodsQuantity || 0 |numToCash(3)}}</td>
                        <td class="text-r">{{item.sellerAmount || 0 |numToCash}}</td>
                        <td class="text-r">{{item.currentCollection || 0 |numToCash}}</td>
                        <td class="text-r">{{item.accumulateCollection || 0 |numToCash}}</td>
                        <td class="text-r">{{item.needCollection || 0 |numToCash}}</td>
                    </tr>
                    <tr>
                        <td style="text-align: left; width: 100px">当前页合计</td>
                        <td></td>
                        <td></td>
                        <td class="text-r">{{this.cloumNum(list5.billCollectionDtos, 'sellerGoodsQuantity') || 0
                            |numToCash(3)}}
                        </td>
                        <td class="text-r">{{this.cloumNum(list5.billCollectionDtos, 'sellerAmount')|| 0 |numToCash}}</td>
                        <td class="text-r">{{this.cloumNum(list5.billCollectionDtos, 'currentCollection')|| 0 |numToCash}}</td>
                        <td class="text-r">{{this.cloumNum(list5.billCollectionDtos, 'accumulateCollection')|| 0 |numToCash}}
                        </td>
                        <td class="text-r">{{this.cloumNum(list5.billCollectionDtos, 'needCollection')|| 0 | numToCash}}</td>
                    </tr>
                    <tr>
                        <td style="text-align: left; width: 100px">所有页合计</td>
                        <td></td>
                        <td></td>
                        <td class="text-r">{{list5.totalPageSellerGoodsQuantity||0 | numToCash(3)}}</td>
                        <td class="text-r">{{list5.totalPageSellerAmount ||0 | numToCash}}</td>
                        <td class="text-r">{{list5.totalPageCurrentCollection ||0 | numToCash}}</td>
                        <td class="text-r">{{list5.totalPageAccumulateCollection ||0 | numToCash}}</td>
                        <td class="text-r">{{list5.totalPageNeedCollection ||0 | numToCash}}</td>
                    </tr>
                    </tbody>
                </table>
                <table class="gy-table" v-if="tabIdx === 5">
                    <thead>
                    <tr>
                        <td>期间</td>
                        <td>销售订单号</td>
                        <td>客户</td>
                        <td>销售数量(吨)</td>
                        <td>销售金额(元)</td>
                        <td>本期发货数量(吨)</td>
                        <td>累计发货数量(吨)</td>
                        <td>待发货数量(吨)</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="!list6.sendGoodsDtos">
                        <td style="text-align:center;" colspan="9">暂无数据...</td>
                    </tr>
                    <tr v-else v-for="(item, index) in list6.sendGoodsDtos" :key="index">
                        <td>{{item.period}}</td>
                        <td>{{item.orderNumber}}</td>
                        <td class="text-r">{{item.buyerCompanyName}}</td>
                        <td class="text-r">{{item.sellerQuantity || 0 |numToCash(3)}}</td>
                        <td class="text-r">{{item.sellerAmount || 0 |numToCash}}</td>
                        <td class="text-r">{{item.currentSendQuantity || 0 |numToCash(3)}}</td>
                        <td class="text-r">{{item.accumulateSendQuantity || 0 |numToCash(3)}}</td>
                        <td class="text-r">{{item.needSendQuantity || 0 |numToCash(3)}}</td>
                    </tr>
                    <tr>
                        <td style="text-align: left; width: 100px">当前页合计</td>
                        <td></td>
                        <td></td>
                        <td class="text-r">{{this.cloumNum(list6.sendGoodsDtos, 'sellerQuantity') || 0 |numToCash(3)}}</td>
                        <td class="text-r">{{this.cloumNum(list6.sendGoodsDtos, 'sellerAmount') || 0 |numToCash}}</td>
                        <td class="text-r">{{this.cloumNum(list6.sendGoodsDtos, 'currentSendQuantity') || 0 |numToCash(3)}}
                        </td>
                        <td class="text-r">{{this.cloumNum(list6.sendGoodsDtos, 'accumulateSendQuantity') || 0
                            |numToCash(3)}}
                        </td>
                        <td class="text-r">{{this.cloumNum(list6.sendGoodsDtos, 'needSendQuantity') || 0 | numToCash(3)}}</td>
                    </tr>
                    <tr>
                        <td style="text-align: left; width: 100px">所有页合计</td>
                        <td class="text-r"></td>
                        <td class="text-r"></td>
                        <td class="text-r">{{list6.totalPageSellerQuantity || 0 | numToCash(3)}}</td>
                        <td class="text-r">{{list6.totalPageSellerAmount || 0 | numToCash}}</td>
                        <td class="text-r">{{list6.totalPageCurrentSendQuantity || 0 | numToCash(3)}}</td>
                        <td class="text-r">{{list6.totalPageAccumulateSendQuantity || 0 | numToCash(3)}}</td>
                        <td class="text-r">{{list6.totalPageNeedSendQuantity || 0 | numToCash(3)}}</td>
                    </tr>
                    </tbody>
                </table>
                <!-- 接口修改后 启动 -->
                <!-- <div class="total">共 {{info.total}} 条记录</div> -->
            </div>
            <form method="POST" :action=export1Url id="hiddenForm1" ref="hiddenForm1">
                <input type="text" name="dsl" :value="JSON.stringify(this.info)" hidden/>
            </form>
            <form method="POST" :action=export2Url id="hiddenForm2" ref="hiddenForm2">
                <input type="text" name="dsl" :value="JSON.stringify(this.info)" hidden/>
            </form>
            <form method="POST" :action=export3Url id="hiddenForm3" ref="hiddenForm3">
                <input type="text" name="dsl" :value="JSON.stringify(this.info)" hidden/>
            </form>
            <form method="POST" :action=export4Url id="hiddenForm4" ref="hiddenForm4">
                <input type="text" name="dsl" :value="JSON.stringify(this.info)" hidden/>
            </form>
            <form method="POST" :action=export5Url id="hiddenForm5" ref="hiddenForm5">
                <input type="text" name="dsl" :value="JSON.stringify(this.info)" hidden/>
            </form>
            <form method="POST" :action=export6Url id="hiddenForm6" ref="hiddenForm6">
                <input type="text" name="dsl" :value="JSON.stringify(this.info)" hidden/>
            </form>
            <form method="POST" :action=exportAllUrl id="hiddenFormAll" ref="hiddenFormAll">
                <input type="text" name="dsl" :value="JSON.stringify(this.info)" hidden/>
            </form>
            <div class="block" v-if="info.total !== 0">
                <el-pagination
                    background
                    @current-change="sizeChange"
                    :current-page.sync="info.pageNo"
                    :page-size="info.pageSize"
                    layout="prev, pager, next"
                    :total="info.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            createDate: null,
            userdefined: false,
            tabIdx: 0,
            // 交互数据
            info: {
                startTime: '',
                endTime: '',
                periods: '当日', // 期间(当天/本周/本月/本年)
                period: '当日',
                pageNo: 1, // 当前页
                pageSize: 10, // 条数
                total: 0
            },
            uploadUrl: null,
            // 实时时间
            time: {
                startTime: '',
                endTime: ''
            },
            // 基础表单
            base: {
                purchaseNoteCount: null, // 采购订单数
                purchaseQuantity: null, // 采购数量(吨)
                purchaseAmount: null, // 采购金额(元)
                sellerNoteCount: null, // 销售订单数量
                sellerQuantity: null, // 销售数量(吨)
                sellerAmount: null, // 销售金额(元)
                paymentAmount: null, // 付款金额(元)
                collectionAmount: null, // 收款金额(元)
                receiveQuantity: null, // 收货数量(吨)
                sendQuantity: null // 发货数量(吨)
            },
            currentTabIdx: 0,
            activeName: 'first',
            trType1: false,
            trType2: false,
            trType3: false,
            trType4: false,
            trType5: false,
            trType6: false,
            // 日期
            oldDay: '',
            newDay: '',
            oldWeek: '',
            newWeek: '',
            oldMonth: '',
            newMonth: '',
            oldYear: '',
            newYear: '',
            export1Url: process.env.API_ROOT_MAIN + '/trade/report/v1/increasedPurchaseNote/export',
            export2Url: process.env.API_ROOT_MAIN + '/trade/report/v1/purchasePayment/export',
            export3Url: process.env.API_ROOT_MAIN + '/trade/report/v1/purchaseGoodsReceive/export',
            export4Url: process.env.API_ROOT_MAIN + '/trade/report/v1/increasedSellerNote/export',
            export5Url: process.env.API_ROOT_MAIN + '/trade/report/v1/sellerCollection/export',
            export6Url: process.env.API_ROOT_MAIN + '/trade/report/v1/sellerGoodsSend/export',
            exportAllUrl: process.env.API_ROOT_MAIN + '/trade/report/v1/allExport',
            // 新增采购单查询
            list1: {},
            // 采购单付款查询
            list2: {},
            // 采购单收货查询
            list3: {},
            // 新增销售单查询
            list4: {},
            // 销售单收款查询
            list5: {},
            // 销售单发货查询
            list6: {},
            url: null,
            tabList: [
                {
                    id: 0,
                    name: '成交采购单'
                },
                {
                    id: 1,
                    name: '采购单付款'
                },
                {
                    id: 2,
                    name: '采购单收货'
                },
                {
                    id: 3,
                    name: '成交销售单'
                },
                {
                    id: 4,
                    name: '销售单收款'
                },
                {
                    id: 5,
                    name: '销售单发货'
                }
            ]
        };
    },
    mounted () {
        this.initBase();
        this.initTable();
    },
    methods: {
        // 导出当前的tab
        exportBtn (type) {
            if (type === 0) {
                this.$refs.hiddenForm1.submit();
            }
            if (type === 1) {
                this.$refs.hiddenForm2.submit();
            }
            if (type === 2) {
                this.$refs.hiddenForm3.submit();
            }
            if (type === 3) {
                this.$refs.hiddenForm4.submit();
            }
            if (type === 4) {
                this.$refs.hiddenForm5.submit();
            }
            if (type === 5) {
                this.$refs.hiddenForm6.submit();
            }
        },
        exportAll () {
            this.$refs.hiddenFormAll.submit();
        },
        // 当前页码 改变时会触发
        sizeChange (val) {
            this.info.pageNo = val;
            let me = this;
            let idx = Number(me.currentTabIdx);
            if (idx === 0) {
                me.post(0, me.$api.deal.increasedPurchaseNote);
            }
            if (idx === 1) {
                me.post(1, this.$api.deal.purchasePayment);
            }
            if (idx === 2) {
                me.post(2, me.$api.deal.purchaseGoodsReceive);
            }
            if (idx === 3) {
                me.post(3, me.$api.deal.increasedSellerNote);
            }
            if (idx === 4) {
                me.post(4, me.$api.deal.sellerCollection);
            }
            if (idx === 5) {
                me.post(5, me.$api.deal.sellerGoodsSend);
            }
        },
        // 公用调用数据
        post (type, url) {
            let me = this;
            type = Number(type);
            if (me.currentTabIdx === type) {
                me.$http.post(url, me.info).then(function (res) {
                    if (res.data.code === 0) {
                        // 取到对象中需要的key
                        let key = Object.keys(res.data.data).sort()[0];
                        me.info.total = res.data.data.total;
                        me.info.pageSize = 10;
                        if (type === 0) {
                            me.list1 = res.data.data[key];
                        }
                        if (type === 1) {
                            me.list2 = res.data.data[key];
                        }
                        if (type === 2) {
                            me.list3 = res.data.data[key];
                        }
                        if (type === 3) {
                            me.list4 = res.data.data[key];
                        }
                        if (type === 4) {
                            me.list5 = res.data.data[key];
                        }
                        if (type === 5) {
                            me.list6 = res.data.data[key];
                        }
                        if (res.data.data.isNull === '2') {
                            if (type === 0) {
                                me.trType1 = true;
                            }
                            if (type === 1) {
                                me.trType2 = true;
                            }
                            if (type === 2) {
                                me.trType3 = true;
                            }
                            if (type === 3) {
                                me.trType4 = true;
                            }
                            if (type === 4) {
                                me.trType5 = true;
                            }
                            if (type === 5) {
                                me.trType6 = true;
                            }
                        }
                    } else {
                        if (type === 0) {
                            me.trType1 = true;
                        }
                        if (type === 1) {
                            me.trType2 = true;
                        }
                        if (type === 2) {
                            me.trType3 = true;
                        }
                        if (type === 3) {
                            me.trType4 = true;
                        }
                        if (type === 4) {
                            me.trType5 = true;
                        }
                        if (type === 5) {
                            me.trType6 = true;
                        }
                    }
                });
            }
        },
        // init 数据概览
        initBase (type) {
            type = Number(type);
            this.Date();
            this.info.startTime = this.oldDay;
            this.info.endTime = this.newDay;
            this.info.periods = '当日';
            if (type === 1) {
                this.info.startTime = this.oldDay;
                this.info.endTime = this.newDay;
                this.info.periods = '当日';
                this.info.period = this.info.periods;
            }
            if (type === 2) {
                this.info.startTime = this.oldWeek;
                this.info.endTime = this.newWeek;
                this.info.periods = '当周';
                this.info.period = this.info.periods;
            }
            if (type === 3) {
                this.info.startTime = this.oldMonth;
                this.info.endTime = this.newMonth;
                this.info.periods = '当月';
                this.info.period = this.info.periods;
            }
            if (type === 4) {
                this.info.startTime = this.oldYear;
                this.info.endTime = this.newYear;
                this.info.periods = '当年';
                this.info.period = this.info.periods;
            }
            this.time.startTime = this.info.startTime;
            this.time.endTime = this.info.endTime;
            if (type === 5) {
                console.log(this.info.startTime);
                this.info.startTime = this.oldTomoDay;
                this.info.endTime = this.newTomoDay;
                this.userdefined = true;
                this.info.periods = '自定义';
                this.createDate = null;
            } else {
                this.userdefined = false;
            }
            this.surveyData(type);
            // let me = this;
            // // 数据概览
            // me.$http.post(this.$api.deal.summarizing, this.info).then(function (res) {
            //     if (res.data.code === 0) {
            //         me.base = res.data.data;
            //         for (let i in me.base) {
            //             if (me.base[i] == null) {
            //                 me.base[i] = 0;
            //             }
            //         }
            //     }
            // });
        },
        // 数据概览
        surveyData (type) {
            let me = this;
            me.$http.post(this.$api.deal.summarizing, this.info).then(function (res) {
                if (res.data.code === 0) {
                    if (type === 5) {
                        me.base = [];
                    } else {
                        me.base = res.data.data;
                    }
                    for (let i in me.base) {
                        if (me.base[i] == null) {
                            me.base[i] = 0;
                        }
                    }
                }
            });
        },
        // 自定义日期
        customDate () {
            console.log(this.createDate);
            if (this.createDate) {
                console.log(this.createDate);
                this.info.startTime = this.createDate[0];
                this.info.endTime = this.createDate[1];
                this.info.period = this.info.startTime + '至' + this.info.endTime;
                this.info.periods = '自定义';
                let me = this;
                if (this.currentTabIdx === 0) {
                    me.post(0, me.$api.deal.increasedPurchaseNote);
                }
                if (this.currentTabIdx === 1) {
                    me.post(1, me.$api.deal.purchasePayment);
                }
                if (this.currentTabIdx === 2) {
                    me.post(2, me.$api.deal.purchaseGoodsReceive);
                }
                if (this.currentTabIdx === 3) {
                    me.post(3, me.$api.deal.increasedSellerNote);
                }
                if (this.currentTabIdx === 4) {
                    me.post(4, me.$api.deal.sellerCollection);
                }
                if (this.currentTabIdx === 5) {
                    me.post(5, me.$api.deal.sellerGoodsSend);
                }
            } else {
                this.info.startTime = this.oldTomoDay;
                this.info.endTime = this.newTomoDay;
                let me = this;
                if (this.currentTabIdx === 0) {
                    me.post(0, me.$api.deal.increasedPurchaseNote);
                }
                if (this.currentTabIdx === 1) {
                    me.post(1, me.$api.deal.purchasePayment);
                }
                if (this.currentTabIdx === 2) {
                    me.post(2, me.$api.deal.purchaseGoodsReceive);
                }
                if (this.currentTabIdx === 3) {
                    me.post(3, me.$api.deal.increasedSellerNote);
                }
                if (this.currentTabIdx === 4) {
                    me.post(4, me.$api.deal.sellerCollection);
                }
                if (this.currentTabIdx === 5) {
                    me.post(5, me.$api.deal.sellerGoodsSend);
                }
            }
            this.surveyData();
        },
        initTable () {
            let me = this;
            me.$http.post(this.$api.deal.increasedPurchaseNote, this.info).then(function (res) {
                if (res.data.code === 0) {
                    me.list1 = res.data.data.purchaseNoteReport;
                    me.info.total = res.data.data.total;
                }
            });
        },
        // 选取日期
        timer (type) {
            type = Number(type);
            this.initBase(type);
            let me = this;
            if (this.currentTabIdx === 0) {
                me.post(0, me.$api.deal.increasedPurchaseNote);
            }
            if (this.currentTabIdx === 1) {
                me.post(1, me.$api.deal.purchasePayment);
            }
            if (this.currentTabIdx === 2) {
                me.post(2, me.$api.deal.purchaseGoodsReceive);
            }
            if (this.currentTabIdx === 3) {
                me.post(3, me.$api.deal.increasedSellerNote);
            }
            if (this.currentTabIdx === 4) {
                me.post(4, me.$api.deal.sellerCollection);
            }
            if (this.currentTabIdx === 5) {
                me.post(5, me.$api.deal.sellerGoodsSend);
            }
        },
        // tab切换
        tabClick (item) {
            let me = this;
            me.currentTabIdx = Number(item);
            me.post(0, me.$api.deal.increasedPurchaseNote);
            me.post(1, me.$api.deal.purchasePayment);
            me.post(2, me.$api.deal.purchaseGoodsReceive);
            me.post(3, me.$api.deal.increasedSellerNote);
            me.post(4, me.$api.deal.sellerCollection);
            me.post(5, me.$api.deal.sellerGoodsSend);
        },
        //  时间
        Date () {
            let y, m, d, date, h, ms, s, time, hours, w1, month, tomotime;
            date = new Date();
            y = date.getFullYear();
            m = date.getMonth() + 1;
            d = date.getDate();
            h = date.getHours();
            ms = date.getMinutes();
            s = date.getSeconds();
            hours = format(h) + ':' + format(ms) + ':' + format(s);
            w1 = this.getWeek();// 当周第一天
            time = y + '-' + m + '-' + d;// 当天
            tomotime = date.setTime(date.getTime() + 24 * 60 * 60 * 1000);// 明天
            month = y + '-' + m;// 当月初
            // 当日
            this.oldDay = this.date(time) + ' ' + '00:00:00';
            this.newDay = this.date(time) + ' ' + hours;
            // 明天
            this.oldTomoDay = this.date(tomotime) + ' ' + '00:00:00';
            this.newTomoDay = this.date(tomotime) + ' ' + hours;
            // 当周
            this.oldWeek = this.date(w1) + ' ' + '00:00:00';
            this.newWeek = this.date(time) + ' ' + hours;
            // 当月
            this.oldMonth = this.date(month) + ' ' + '00:00:00';
            this.newMonth = this.date(time) + ' ' + hours;
            // 当年
            this.oldYear = y + '-' + '01' + '-' + '01' + ' ' + '00:00:00';
            this.newYear = this.date(time) + ' ' + hours;
            function format (num) {
                if (parseInt(num) < 10) {
                    num = '0' + num;
                }
                return num;
            }
        },
        // 格式化时间
        date (time, hour) { // 把时间戳格式:若有参返回年-月-日时:分:秒 若无参返回 年-月-日
            if (!time) {
                return '';
            }
            let y, m, d, date, h, ms, s, data, hours;
            date = new Date(time);
            y = date.getFullYear();
            m = date.getMonth() + 1;
            d = date.getDate();
            h = date.getHours();
            ms = date.getMinutes();
            s = date.getSeconds();
            data = y + '-' + format(m) + '-' + format(d);
            hours = format(h) + ':' + format(ms) + ':' + format(s);
            if (hour) {
                return data + ' ' + hours;
            } else {
                return data;
            }
            function format (num) {
                if (parseInt(num) < 10) {
                    num = '0' + num;
                }
                return num;
            }
        },
        // 获取一周第一天时间
        getWeek () {
        // 一周
            let newdate = new Date();
            let now = newdate.getTime();
            let day = newdate.getDay();
            let oneDayTime = 60 * 60 * 24 * 1000;
            var stepSunDay = -day + 1;
            var monday = new Date(now + stepSunDay * oneDayTime);
            var week = this.date(monday); // 日期变换
            return week;
        },
        // 当前页合计
        cloumNum (arr, v1) {
            if (arr) {
                let vals1 = 0;
                arr.forEach(function (item, idx, list) {
                    vals1 += item[v1];
                });
                return vals1;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
    .deal {
        .total {
            margin: 20px 0;
            font-size: 12px;
            color: #666;
        }
        .tabs{
            font-size: 0;
            ul {
                overflow: hidden;
                display: inline-block;
                font-size: 14px;
            }
            li{
                float: left;
                padding: 0 5px;
                cursor: pointer;
                line-height: 31px;
                &.selected{
                    color: $color-highlight;
                    border-bottom: 2px solid $color-highlight;
                }
            }
            ul li:not(:first-child) {
                margin-left: 10px;
            }
        }
        .state-title-wrap {
            margin: 20px 30px;
            .state-title {
                margin-left: -7px;
                .iconfont, span {
                    display: inline-block;
                    vertical-align: middle;
                }
                span {
                    font-size: 14px;
                    color: #333;
                    font-weight: bold;
                }
                .iconfont {
                    margin-right: 7px;
                }
            }
        }
        .my-form {
            margin-bottom: 0 !important;
            padding-top: 0px;
        }
        .gy-table {
            tr:hover {
                background-color: transparent;
            }
            .text-r {
                text-align: right;
            }
            .text-r:last-child {
                border-right: 1px solid #f2f2f2;
            }
        }
        .gy-form {
            .my-raio-wrap {
                padding: 10px 30px 10px 24px !important;
            }
            .gy-form-group {
                padding: 8px 30px 8px 160px;
            }
            .l {
                width: 160px;
            }
        }
        .iconfont {
            font-weight: lighter;
            color: $color-minor;
        }
        .tabs, .tables {
            margin: 0 16px;
            tr {
                height: 40px;
                line-height: 40px;
            }
        }
        .tables {
            margin-bottom: 30px;
        }
        .tabs {
            .btn-wrap {
                text-align: right;
                display: inline-block;
                float: right;
                position: relative;
                bottom: 10px;
                .exportBtn {
                    margin-right: 10px;
                }
            }
        }
    }
</style>
<style lang="scss">
.deal{
    .el-date-editor{
        .el-range-separator{
            padding: 0 15px 0px;
            line-height:24px;
        }
    }
}
</style>
