<!--suppress ALL -->
<template>
    <div class="transport-wrap order">
        <div class="detail">
            <h2>运输订单详情<span>订单号：{{orderInfo.consignmentNoteCode}}</span></h2>
            <div class="reject-step" v-if="status === 5 && smallStatus ===2">
                <dl v-if="companyTypeId === 2">
                    <dt>已失效</dt>
                    <dd>托运方已驳回运输订单，请重新创建。</dd>
                </dl>
                <dl v-else>
                    <dt>已失效</dt>
                    <dd>您已驳回运输订单，请重新创建。</dd>
                </dl>
            </div>
            <div class="order-step" v-else>
                <gy-step :step="item.id" :showLine="!(index === stepList.length - 1)"
                         :isRight="index === stepList.length - 1" :isActive="item.active" :isDone="item.done"
                         v-for="(item, index) in stepList" :key="index">
                    <div class="billStatus-active">{{item.name}}</div>
                </gy-step>
                <div class="tips cl">
                    <span><strong>温馨提示：</strong>{{message}}</span><router-link :to="{ name: 'transparentSettlementDetail', query: {view: true, orderId: orderId, status: orderInfo.consignmentNoteStatus} }" v-if="status === 2 && smallStatus > 4 && smallStatus < 8 && smallStatus !== 6" class="highlight">结算明细</router-link><a href="javascript:;" @click="handleViewReason(1)" class="gy-button-views" v-if="smallStatus === 9">查看终止理由</a><a href="javascript:;" @click="handleViewReason(2)" class="gy-button-views" v-if="smallStatus === 6">查看驳回理由</a><a href="javascript:;" @click="handleViewReason(3)" class="gy-button-views" v-if="smallStatus === 11">查看终止理由</a><a href="javascript:;" class="gy-button-views" v-if="isApproving" @click="openApprListDlg">查看审批流程</a>
                    <!--承运商操作-->
                    <div class="buttons" v-if="companyTypeId === 2">
                        <!--签约-->
                        <button class="gy-button-extra" @click="contractPwd" v-if="(status === 0 && smallStatus === 0) && logisticsedsTrue === true">签约</button>
                        <!--确认、驳回终止订单申请-->
                        <span v-if="smallStatus === 11">
                            <button @click="handleStopDo(8)" class="gy-button-extra">确认</button><button @click="handleStopDo(12)" class="gy-button-normal">驳回</button>
                        </span>
                        <!--调度、结算-->
                        <router-link v-if="status === 1 && smallStatus !== 9 && smallStatus !== 11" :to="{ name: 'transportDispatch', query: {orderId: orderId} }" class="gy-button-extra">调度</router-link>
                        <router-link v-if="status === 2 && (smallStatus === 4 || smallStatus === 6)" :to="{ name: 'transparentSettlementDetail', query: {view: false, orderId: orderId, status: orderInfo.consignmentNoteStatus} }" class="gy-button-extra">结算</router-link>
                        <!--确认、驳回终止调度申请-->
                        <span v-if="smallStatus === 9">
                            <button @click="handleStopDo(4)" class="gy-button-extra">确认</button><div class="help-box"><i class="iconfont icon-help"></i><span>提醒：确认后将直接进入结算环节。</span></div><button @click="handleStopDo(10)" class="gy-button-normal">驳回</button>
                        </span>
                    </div>
                    <!--托运方操作-->
                    <div class="buttons" v-else>
                        <!--签约、驳回-->
                        <span v-if="(status === 0 && smallStatus === 1) && logisticsedsTrue === true">
                            <button class="gy-button-extra" @click="contractPwd">签约</button>
                            <button class="gy-button-normal" @click="rejectContract">驳回</button>
                        </span>
                        <!--已签约未调度，终止订单-->
                        <button v-if="(smallStatus === 3 || smallStatus === 12) && orderInfo.checkDispatch" @click="openStopPop(3)" class="gy-button-extra">终止</button>
                        <!--确认、驳回结算、支付-->
                        <button v-if="status === 2 && smallStatus === 5" @click="chargeConfirm(7)" class="gy-button-extra">确认</button>
                        <button v-if="status === 2 && smallStatus === 5" @click="showChargeReason = true" class="gy-button-normal">驳回</button>
                        <a v-if="status === 3 && !orderInfo.hadPay" :href='"#/my/payment/create?callback=transparentOrderDetail&orderNo=" + orderInfo.consignmentNoteCode + "&orderId=" + orderId + "&payMethod=4&billType=1&orderType=2"'
                           class="gy-button-extra">支付</a>
                        <!--终止调度-->
                        <span v-if="orderInfo.checkStop">
                            <button @click="openStopPop(1)" class="gy-button-extra">结束实施</button><div class="help-box"><i class="iconfont icon-help"></i><span>提醒：您可以发起终止申请，对方同意后可直接进入结算环节。</span></div>
                        </span>
                    </div>
                </div>
            </div>
            <h3><i class="iconfont icon-info"></i>订单信息</h3>
            <div class="order-info">
                <dl>
                    <dt>产品</dt>
                    <dd v-for="(pro, idx) in orderInfo.consignmentNoteItemList" :key="idx">{{pro.skuName}}</dd>
                </dl>
                <dl>
                    <dt>重量</dt>
                    <dd v-for="(pro, idx) in orderInfo.consignmentNoteItemList" :key="idx">
                        {{pro.skuQuantity}}{{pro.infUnitOfMeasureName}}
                    </dd>
                </dl>
                <dl>
                    <dt>装货地</dt>
                    <dd>{{orderInfo.loadingWarehouseAddress}}</dd>
                </dl>
                <dl>
                    <dt>卸货地</dt>
                    <dd>{{orderInfo.unloadingWarehouseAddress}}</dd>
                </dl>
                <dl>
                    <dt>发货公司</dt>
                    <dd>{{orderInfo.loadWarehouseAddressModel.warehouseName}}</dd>
                </dl>
                <dl>
                    <dt>收货公司</dt>
                    <dd>{{orderInfo.unloadWarehouseAddressModel.warehouseName}}</dd>
                </dl>
                <dl>
                    <dt>发货联系人</dt>
                    <dd>{{orderInfo.loadingWarehouseContact}}</dd>
                </dl>
                <dl>
                    <dt>收货联系人</dt>
                    <dd>{{orderInfo.unloadingWarehouseContact}}</dd>
                </dl>
                <dl>
                    <dt>发货联系方式</dt>
                    <dd>{{orderInfo.loadingWarehouseMobile}}</dd>
                </dl>
                <dl>
                    <dt>收货联系方式</dt>
                    <dd>{{orderInfo.unloadingWarehouseMobile}}</dd>
                </dl>
                <dl>
                    <dt>期望发货日期</dt>
                    <dd>{{orderInfo.estimatedLoadingDate | date(1)}}</dd>
                </dl>
                <dl>
                    <dt>车辆要求</dt>
                    <dd>{{orderInfo.infCarrierTypeName}}</dd>
                </dl>
                <dl>
                    <dt>托运方</dt>
                    <dd>{{orderInfo.consignorName}}<a v-if="companyTypeId === 2" href="javascript:;" class="iconfont icon-imnew" @click="goIm(currentPhone, orderInfo.consignorImContactPhone)"></a></dd>
                </dl>
                <dl>
                    <dt>承运方</dt>
                    <dd>{{orderInfo.carrierName}}<a v-if="companyTypeId !== 2" href="javascript:;" class="iconfont icon-imnew" @click="goIm(currentPhone, orderInfo.carrierImContactMobile)"></a></dd>
                </dl>
                <dl>
                    <dt>托运方联系人</dt>
                    <dd>{{orderInfo.consignorContactName}}</dd>
                </dl>
                <dl>
                    <dt>承运方联系人</dt>
                    <dd>{{orderInfo.carrierContactName}}</dd>
                </dl>
                <dl>
                    <dt>托运方手机号</dt>
                    <dd>{{orderInfo.consignorContactMobile}}</dd>
                </dl>
                <dl>
                    <dt>承运方手机号</dt>
                    <dd>{{orderInfo.carrierContactMobile}}</dd>
                </dl>
                <dl>
                    <dt>货损限制</dt>
                    <dd v-for="(pro, idx) in orderInfo.consignmentNoteItemList" :key="idx">±{{pro.damageRate}}‰</dd>
                </dl>
                <dl>
                    <dt>货值</dt>
                    <dd v-for="(pro, idx) in orderInfo.consignmentNoteItemList" :key="idx">
                        <span v-if="pro.skuPrice">{{pro.skuPrice + '元/' + pro.infUnitOfMeasureName}}</span>
                        <span></span>
                    </dd>
                </dl>
                <dl>
                    <dt>运费</dt>
                    <dd v-if="orderInfo.carriageFee">{{orderInfo.carriageFee + '元'}}</dd>
                    <dd v-else>未结算</dd>
                </dl>
                <dl>
                    <dt>合同编号</dt>
                    <dd>{{orderInfo.consignmentContractCode || '未完成签约'}}<i @click="handleViewContract" v-if="orderInfo.consignmentContractCode" class="iconfont icon-img-view"></i></dd>
                </dl>
            </div>
            <div class="goods-deliver-button" v-if="status === 1 && companyTypeId !== 2 && noticeDetailList.length < 1">
                <router-link :to="{ name: 'deliverNotice', query: {orderId: orderId} }" class="gy-button-extra my-button">发货通知
                </router-link>
            </div>
            <div class="detail-list" v-if="status !== 5 && smallStatus !==2">
                <div class="tabs">
                    <ul>
                        <li :class="{'selected': item.selected}" v-for="(item, index) in detailTabs" :key="index" @click="handleDetailTab(index)">{{item.name}}
                        </li>
                    </ul>
                    <div class="button-wrap" v-show="detailTabs[1].selected">
                        <template v-if="companyTypeId === 2 && setConsignmentNoteStatus.includes(orderInfo.consignmentNoteStatus)">
                            <button class="gy-button-normal" v-if="detailTabsChk[searchForm.pageNum] && detailTabsChk[searchForm.pageNum].isEdit" @click="subDetailTabs1">核单提交</button>
                            <button class="gy-button-normal" v-else @click="detailTabs1Trag">批量核单</button>
                        </template>
                        <button class="gy-button-extra exportDoc" @click="exportDoc">导出Excel</button>
                    </div>
                </div>
                <table class="gy-table" v-show="detailTabs[0].selected">
                    <thead>
                    <tr>
                        <td>通知单号</td>
                        <td>联系人/电话</td>
                        <td>运输量(吨）</td>
                        <td>预计装货时间</td>
                        <td>预计卸货时间</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(list, index) in noticeDetailList" :key="index">
                        <td>{{ list.id }}</td>
                        <td>{{list.username + '/' +list.phone}}</td>
                        <td class="juy">{{ list.skuQuantity || 0}}吨</td>
                        <td>{{list.estimatedLoadingDate | date(1)}}</td>
                        <td>{{list.estimatedUnloadingDate | date(1)}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="null-msg" v-if="detailTabs[0].selected && noticeDetailList.length === 0">没有找到可显示的数据...</div>
                <table class="gy-table" v-show="detailTabs[1].selected">
                    <thead>
                    <tr>
                        <td style="min-width:45px;">序号</td>
                        <td>调度单号</td>
                        <td>调度人</td>
                        <td>车辆</td>
                        <td>司机/电话/身份证</td>
                        <td style="width:56px;">状态</td>
                        <td style="width:90px;">操作</td>
                        <td style="min-width:56px;">调度量</td>
                        <td style="min-width:56px;">装货量</td>
                        <td style="min-width:56px;">卸货量</td>
                        <td style="min-width:80px;">实际卸货量</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(list, index) in traceDetailList" :key="index">
                        <td>{{index + 1}}</td>
                        <td>{{ list.dispatchNoteCode }}</td>
                        <td>{{list.schedulingPeople}}</td>
                        <td>{{list.licensePlateNumber}}</td>
                        <td>{{list.driverUsername + '/' +list.driverPhone}} <br>{{list.identityCode}}</td>
                        <td>{{list.dispatchNoteStatusvalue}}</td>
                        <td>
                            <button class="gy-button-view" @click="handleViewDispatch(list.id)">查看</button>
                            <router-link v-if="companyTypeId == 2 && list.dispatchNoteStatus<=2" :to="{ name: 'transportDispatchEdit', query: {orderId: list.id} }" class="gy-button-view">编辑</router-link>
                            <button v-if="list.dispatchNoteStatus!=5&&companyTypeId==2" class="gy-button-view" @click="handleViewDispatchnew(list.dispatchNoteStatus,list.id)">{{list.dispatchNoteStatusvalue2}}</button>
                        </td>
                        <td class="juy">{{list.quantityPlanned || 0}}吨</td>
                        <td class="juy">{{list.quantityLoading || 0}}吨</td>
                        <td class="juy">{{list.quantityUnloading || 0}}吨</td>
                        <td class="juy"><template v-if="detailTabsChk[searchForm.pageNum] && detailTabsChk[searchForm.pageNum].isEdit && list.quantityUnloading * 1 > 0"><input
                            type="text" style="width: 60px" class="gyInput" v-model="list.actualQuantityUnloading"> 吨</template><template
                            v-else>{{list.actualQuantityUnloading + ' 吨' || '-'}}</template></td>
                    </tr>
                    <tr v-if="detailTabs[1].selected && traceDetailList.length === 0">
                        <td colspan="11" style="text-align: center;">没有找到可显示的数据...</td>
                    </tr>
                    <tr class="summation">
                        <td>合计</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="juy">{{summations.quantityPlanned || 0}}吨</td>
                        <td class="juy">{{summations.quantityLoading || 0}}吨</td>
                        <td class="juy">{{summations.quantityUnloading || 0}}吨</td>
                        <td class="juy">{{summations.actualQuantityUnloading || 0}}吨</td>
                    </tr>
                    </tbody>
                </table>
                <table class="gy-table" v-show="detailTabs[2].selected">
                    <thead>
                    <tr>
                        <td>结算单号</td>
                        <td>品名</td>
                        <td>装货量(吨)</td>
                        <td>卸货量(吨)</td>
                        <td>运费(元/吨)</td>
                        <td>结算金额(元)</td>
                        <td>状态</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(list, index) in settleDetailList" :key="index">
                        <td>{{list.consignmentNoteCode}}</td>
                        <td v-for="pro in list.consignmentNoteItemList" :key="pro.skuName">{{pro.skuName}}</td>
                        <td class="juy" v-for="pro in list.consignmentNoteItemList" :key="pro.quantityLoading">{{pro.quantityLoading || 0}}</td>
                        <td class="juy" v-for="pro in list.consignmentNoteItemList" :key='pro.quantityUnloading + "a"'>{{pro.quantityUnloading || 0}}</td>
                        <td class="juy" v-for="pro in list.consignmentNoteItemList" :key="pro.freightUnitPrice">{{pro.freightUnitPrice}}</td>
                        <td class="juy">{{list.freightFee || 0}}</td>
                        <td>{{chargeStatusValue[list.settleStatus]}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="null-msg" v-if="detailTabs[2].selected && settleDetailList.length === 0">没有找到可显示的数据...</div>
                <table class="gy-table" v-show="detailTabs[3].selected">
                    <thead>
                    <tr>
                        <td>付款单号</td>
                        <td>付款方式</td>
                        <td>付款银行</td>
                        <td>收款银行</td>
                        <td>付款日期</td>
                        <td>付款金额(元)</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in payDetailList" :key="index">
                        <td>{{item.payNumber}}</td>
                        <td>{{Number(item.tradeMode) | tradeMode}}</td>
                        <td>{{item.buyerDepositBank}}</td>
                        <td>{{item.sellerDepositBank}}</td>
                        <td>{{item.payTime | date}}</td>
                        <td class="juy">{{item.payTotal}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="null-msg" v-if="detailTabs[3].selected && payDetailList.length === 0">没有找到可显示的数据...</div>
                <div class="total" v-show="detailTabs[1].selected">共 {{total}} 条记录</div>
                <!-- 分页 -->
                <el-pagination
                    v-if="traceDetailList.length !== 0"
                    background
                    :total="total"
                    :page-size="searchForm.pageSize"
                    layout="prev, pager, next"
                    width="margin-top: 40px;"
                    @current-change="turnPage">
                </el-pagination>
            </div>
        </div>
        <transition name="fade">
            <contract :show-contract.sync="showContract" :show-btn="showHandlechapter" :file="contractUrl"
                      @handlechapter="handleChapter" v-show="showContract"></contract>
        </transition>
        <!--验证签约密码-->
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form ref="form" label-width="70px">
                <el-form-item label="签约密码" prop="account">
                    <el-input v-model="contractPasswd" type="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                        <div class="gy-form-button">
                            <button type="button" class="gy-button-extra" @click="testContractPwd">确定</button>
                            <button type="button" class="gy-button-normal" @click="dialogVisible = false">取消</button>
                        </div>
                </span>
        </el-dialog>
        <!--调度终止理由弹窗-->
        <div class="pop-reason" v-show="showStopReason || viewReason">
            <div class="main">
                <div class="reason-header">
                    <h5>终止理由</h5>
                    <span class="date" v-if="stopReasonValue.updatedDate">{{stopReasonValue.updatedDate | date(1)}}</span>
                    <i class="iconfont icon-close" @click="closeReasonPop"></i>
                </div>
                <div class="message-box">
                    <textarea placeholder="请填写终止理由" v-model="stopReason" v-if="!stopReasonValue.reason"></textarea>
                    <span v-else>{{stopReasonValue.reason}}</span>
                </div>
                <div class="buttons" v-if="!stopReasonValue.reason">
                    <a href="javascript:;" class="gy-button-extra" @click="stopDoConfirm">确认</a>
                </div>
            </div>
        </div>
        <!--结算驳回理由弹窗-->
        <div class="pop-reason" v-show="showChargeReason || viewChargeReason">
            <div class="main">
                <div class="reason-header">
                    <h5>查看理由</h5>
                    <span class="date" v-if="refuseChargeValue.updatedDate">{{refuseChargeValue.updatedDate | date(1)}}</span>
                    <i class="iconfont icon-close" @click="closeChargePop"></i>
                </div>
                <div class="message-box">
                    <textarea placeholder="请填写驳回理由" v-model="chargeReason" v-if="!refuseChargeValue.reason"></textarea>
                    <span v-else>{{refuseChargeValue.reason}}</span>
                </div>
                <div class="buttons" v-if="!refuseChargeValue.reason">
                    <a href="javascript:;" class="gy-button-extra" @click="refuseChargeConfirm">确认</a>
                </div>
            </div>
        </div>
        <!--添加提货信息-->
        <el-dialog
            :title="thtitle1"
            :visible.sync="addthshow"
            @close="closeaddthImageClick"
            width="40%">
            <el-form ref="form" label-width="100px">
                <el-form-item :label="thtitle2" prop="account">
                    <el-input style="width: 60%" v-model="thvalue1" placeholder="请输入实际提货量"></el-input>吨
                </el-form-item>
            </el-form>
            <div>
                <el-upload
                    ref="upload"
                    :action="imgApi"
                    list-type="picture-card"
                    :data="{'storage':'logistics'}"
                    :on-success="addthImagesuccess"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="addthImageshow">
                    <img width="100%" :src="addthImageUrl" alt="">
                </el-dialog>
            </div>
            <div>
                上传提货凭证（仅支持jpg格式，每张不得大于5M）
            </div>
            <span slot="footer" class="dialog-footer">
                        <div class="gy-form-button">
                            <button type="button" class="gy-button-extra" @click="addthImageClick">提交</button>
                        </div>
                </span>
        </el-dialog>
        <!-- 审批历史 弹窗组件 -->
        <approveHistory ref="myApprHisDlg"></approveHistory>
    </div>
</template>
<script>
import gyStep from '@/components/step';
import contract from '@/components/contract';
import {mapGetters} from 'vuex';
import approveHistory from '../../components/approveHistory';

export default {
    data () {
        return {
            setConsignmentNoteStatus: [
                3, 9, 10, 11, 12, // 实施中
                4 // 结算中(发起结算单之前)
                // 5, 6 // 结算中
            ],
            detailTabsChk: [],
            total: 0,
            icon: require('@/assets/images/icon-piao.png'),
            orderId: null,
            companyId: null,
            currentPhone: null,
            contractUrl: null,
            showContract: false,
            orderInfo: {
                consignmentNoteItemList: [{}],
                loadWarehouseAddressModel: {},
                unloadWarehouseAddressModel: {}
            },
            status: null,
            smallStatus: null,
            stopType: null,
            payWay: ['在线支付', '线下支付'],
            quoteType: ['承运商报价', '我有意向价', '向指定承运商询价'],
            signType: ['在线签约', '线下签约'],
            chargeStatusValue: ['进行中', '已完成', '已失效', '已驳回'],
            stepList: [
                {
                    id: 1,
                    name: '签约',
                    active: true,
                    done: false
                },
                {
                    id: 2,
                    name: '实施',
                    active: false,
                    done: false
                },
                {
                    id: 3,
                    name: '结算',
                    active: false,
                    done: false
                },
                {
                    id: 4,
                    name: '支付',
                    active: false,
                    done: false
                },
                {
                    id: 5,
                    name: '完成',
                    active: false,
                    done: false
                }
            ],
            message: null,
            companyTypeId: null,
            consignmentNoteCode: null,
            showHandlechapter: false,
            detailTabs: [
                {
                    id: 0,
                    name: '发货通知',
                    selected: false
                },
                {
                    id: 1,
                    name: '运输明细',
                    selected: true
                },
                {
                    id: 2,
                    name: '结算明细',
                    selected: false
                },
                {
                    id: 3,
                    name: '付款明细',
                    selected: false
                }
            ],
            traceDetailList: [],
            payDetailList: [],
            settleDetailList: [],
            noticeDetailList: [],
            isUseContractPSW: false,
            dialogVisible: false,
            contractPasswd: '',
            stopReason: null,
            showStopReason: false,
            viewReason: false,
            stopReasonValue: {
                reason: null,
                updatedDate: null
            },
            refuseChargeValue: {
                reason: null,
                updatedDate: null
            },
            showChargeReason: false,
            viewChargeReason: false,
            chargeReason: null,
            // 冯海莹新增
            thvalue1: '', // 提货量
            thtitle1: '', // 提货title
            thtitle2: '', // 提货title
            addthshow: false,
            addthImageUrl: '', // 提货信息图片
            addthImageshow: false, // 提货信息图片展示
            allimg1: [],
            thqhId: [],
            imgApi: process.env.API_ROOT_MAIN + this.$api.account.upload2,
            logisticseds: {},
            logisticsedsTrue: true,
            isApproving: false, // 是否正在合同申请审批中
            summations: {}, // 运输订单合计
            searchForm: {
                pageNum: 1,
                pageSize: 10,
                data: {
                    lgsConsignmentNoteId: this.$route.query.orderId
                }
            },
            fileTypeId: ''
        };
    },
    components: {gyStep, contract, approveHistory
    },
    created () {
        this.init();
        this.getContractPwd();
    },
    computed: mapGetters([
        'socket',
        'getUserinfo'
    ]),
    watch: {
        $route: 'init',
        socket: {
            handler (newValue, oldValue) {
                newValue.msg && this.init();
            },
            deep: true
        }
    },
    methods: {
        init () {
            if (localStorage.getItem('userInfo')) {
                this.companyId = JSON.parse(localStorage.getItem('userInfo')).companyId;
                this.companyTypeId = JSON.parse(localStorage.getItem('userInfo')).companyTypeId;
                this.currentPhone = JSON.parse(localStorage.getItem('userInfo')).phone;
            }
            this.orderId = this.$route.query.orderId;
            this.getOrderInfo();
            this.getSum();
        },
        subDetailTabs1 () {
            this.detailTabsChk[this.searchForm.pageNum].data = this.traceDetailList;
            let params = [];
            for (let i of this.detailTabsChk.keys()) {
                if (this.detailTabsChk[i]) {
                    for (let j of this.detailTabsChk[i].data.keys()) {
                        const AQU = this.detailTabsChk[i].data[j].actualQuantityUnloading * 1;
                        if (!Number.isFinite(AQU) || !/^(0|[1-9]\d*)(\.\d{0,2})?$/.test(AQU)) {
                            this.$message.error('请输入正确实际卸货量');
                            return;
                        }
                        params.push({id: this.detailTabsChk[i].data[j].id, actualQuantityUnloading: this.detailTabsChk[i].data[j].actualQuantityUnloading});
                    }
                }
            }
            this.$http.post(this.$api.transport.updateDNAQU, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.detailTabsChk = [];
                        this.turnPage(this.searchForm.pageNum);
                        return;
                    }
                    this.error(res.data.message);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        detailTabs1Trag () {
            if (this.detailTabsChk[this.searchForm.pageNum]) {
                this.$set(this.detailTabsChk, this.searchForm.pageNum, Object.assign({}, this.detailTabsChk[this.searchForm.pageNum], {isEdit: true}));
            } else {
                this.$set(this.detailTabsChk, this.searchForm.pageNum, {isEdit: true, data: this.traceDetailList});
            }
        },
        getTurnPage () {
            this.$http.post(this.$api.transport.pageInfo, this.searchForm)
                .then(res => {
                    if (this.detailTabsChk[this.searchForm.pageNum]) {
                        let dataList = [];
                        for (let i of res.data.data.list.keys()) {
                            dataList.push({...res.data.data.list[i], actualQuantityUnloading: this.detailTabsChk[this.searchForm.pageNum].data[i].actualQuantityUnloading});
                        }
                        this.traceDetailList = dataList;
                    } else {
                        this.traceDetailList = res.data.data.list;
                    }
                    this.total = res.data.data.total;
                    this.getSum();
                    for (var i = 0; i < this.traceDetailList.length; i++) {
                        if (this.traceDetailList[i].dispatchNoteStatus === 0) {
                            this.traceDetailList[i].dispatchNoteStatusvalue = '待发车';
                            this.traceDetailList[i].dispatchNoteStatusvalue2 = '发车';
                        } else if (this.traceDetailList[i].dispatchNoteStatus === 1) {
                            this.traceDetailList[i].dispatchNoteStatusvalue = '已发车';
                            this.traceDetailList[i].dispatchNoteStatusvalue2 = '到达提货点';
                        } else if (this.traceDetailList[i].dispatchNoteStatus === 2) {
                            this.traceDetailList[i].dispatchNoteStatusvalue = '已到达提货点';
                            this.traceDetailList[i].dispatchNoteStatusvalue2 = '提货信息';
                        } else if (this.traceDetailList[i].dispatchNoteStatus === 3) {
                            this.traceDetailList[i].dispatchNoteStatusvalue = '已提货';
                            this.traceDetailList[i].dispatchNoteStatusvalue2 = '到达卸货点';
                        } else if (this.traceDetailList[i].dispatchNoteStatus === 4) {
                            this.traceDetailList[i].dispatchNoteStatusvalue = '已到达卸货点';
                            this.traceDetailList[i].dispatchNoteStatusvalue2 = '卸货信息';
                        } else if (this.traceDetailList[i].dispatchNoteStatus === 5) {
                            this.traceDetailList[i].dispatchNoteStatusvalue = '已完成';
                        }
                    }
                });
        },
        turnPage (val) {
            if (this.detailTabsChk[this.searchForm.pageNum]) {
                this.detailTabsChk[this.searchForm.pageNum].data = this.traceDetailList;
            } else {
                this.$set(this.detailTabsChk, this.searchForm.pageNum, {isEdit: false, data: this.traceDetailList});
            }
            this.searchForm.pageNum = val;
            this.getTurnPage();
        },
        getOrderInfo () {
            this.$http.get(this.$api.transport.newOrder + '/' + this.orderId)
                .then(res => {
                    this.orderInfo = res.data.data;
                    this.status = res.data.data.consignmentNoteStatus;
                    this.getTransportStatus();
                    this.getTurnPage();
                    if (this.status === 0 || this.status === 1) {
                        // 只在签约阶段才查询审批信息
                        this.logisticsed();
                    }
                });
        },
        getTransportStatus () {
            let postData = {};
            if (JSON.parse(localStorage.getItem('userInfo')).companyTypeId === 2) {
                postData = {
                    consignmentNoteStatus: this.status,
                    carrierId: this.companyId
                };
            } else {
                postData = {
                    consignmentNoteStatus: this.status,
                    consignorId: this.companyId
                };
            }
            this.$http.post(this.$api.transport.transportStatus, postData)
                .then(res => {
                    this.message = res.data.data.tips;
                    this.smallStatus = res.data.data.smallStatus;
                    this.status = res.data.data.bigStatus;
                    this.stepList.forEach(item => {
                        if (item.id <= (this.status + 1)) {
                            item.active = true;
                        } else {
                            item.active = false;
                        }
                        if (item.id < (this.status + 1)) {
                            item.done = true;
                        } else {
                            item.done = false;
                        }
                    });
                });
        },
        handleChapter () {
            let postData = {};
            this.showHandlechapter = true;
            if (JSON.parse(localStorage.getItem('userInfo')).companyTypeId === 2) {
                postData = {
                    lgsConsignmentNoteId: this.orderId,
                    carrierId: this.companyId
                };
            } else {
                postData = {
                    lgsConsignmentNoteId: this.orderId,
                    consignorId: this.companyId
                };
            }
            this.$http.post(this.$api.transport.signContract, postData)
                .then(res => {
                    this.contractUrl = res.data.data;
                    this.showContract = true;
                    this.showHandlechapter = false;
                    this.init();
                });
        },
        openStopPop (type) {
            this.stopType = type;
            this.showStopReason = true;
        },
        testContractPwd () {
            let query = {
                contractPwd: this.contractPasswd
            };
            this.$http.post(this.$api.order.contractPwd, query).then(res => {
                if (res.data.code === 0) {
                    this.dialogVisible = false;
                    this.contractPasswd = '';
                    this.handleShowContract();
                } else {
                    this.$message({
                        type: 'info',
                        message: res.data.message
                    });
                }
            });
        },
        // 判断审批步骤 （approveStatus = 1是审批通过，3 审核审批）
        logisticsed () {
            this.$http.post(this.$api.transport.logistics, {id: this.orderId}).then(res => {
                if (res.data.code === 0) {
                    this.logisticseds = res.data.data;
                    if (this.logisticseds.companyId === this.logisticseds.carrierId) {
                        // 承运方
                        if (this.logisticseds.approveStatus === 3) {
                            this.logisticsedsTrue = false;
                            this.message = '合同审批中,请在审批通过后进行签约';
                        }
                        if (this.logisticseds.approveStatus === 5) {
                            this.logisticsedsTrue = false;
                            this.message = '您已签约，请等待托运方签约';
                        }
                    }
                    if (this.logisticseds.companyId === this.logisticseds.consignorId) {
                        // 托运方
                        if (this.logisticseds.approveStatus === 3) {
                            this.logisticsedsTrue = false;
                            this.message = '承运方已发起订单,请等待承运方签约';
                        }
                        if (this.logisticseds.approveStatus === 5) {
                            this.logisticsedsTrue = false;
                            this.message = '合同审批中,请在审批通过后进行签约';
                        }
                    }

                    // 检查审批状态，如果是正在审批中则显示'查看审批流程'的链接
                    let params = {targetId: this.orderId, targetType: 21, subSysType: 1};
                    let user = JSON.parse(localStorage.getItem('userInfo'));
                    if (user) {
                        params.affiliatedCompanyId = user.companyId;
                    }
                    if (params.affiliatedCompanyId == null || params.affiliatedCompanyId === undefined || params.affiliatedCompanyId === 0) {
                        this.$alert('未获取到当前用户所在公司信息，不能查询审批操作状态');
                        return false;
                    }
                    this.$http.post(this.$api.processes.bizApproveStatus, params).then((res) => {
                        if (res.data.code === 0) {
                            if (res.data.data.rsltStatus === 1) {
                                this.isApproving = true;
                                if (res.data.data.controlStatus === 0) {
                                    this.logisticsedsTrue = true;
                                }
                            }
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.message
                            });
                        }
                    });
                }
            });
        },
        openApprListDlg () {
            // 打开审批历史对话框
            let params = {targetId: this.orderId, targetType: 21, subSysType: 1};
            let user = JSON.parse(localStorage.getItem('userInfo'));
            if (user) {
                params.affiliatedCompanyId = user.companyId;
            }
            if (params.affiliatedCompanyId == null || params.affiliatedCompanyId === undefined || params.affiliatedCompanyId === 0) {
                this.$alert('未获取到当前用户所在公司信息，不能查询审批操作记录');
                return false;
            }

            this.$refs.myApprHisDlg.getAppHisList(params);
        },
        contractPwd () {
            if (this.isUseContractPSW) {
                this.dialogVisible = true;
            } else {
                this.handleShowContract();
            }
        },
        handleShowContract () {
            let postData = {};
            this.showHandlechapter = true;
            if (JSON.parse(localStorage.getItem('userInfo')).companyTypeId === 2) {
                postData = {
                    lgsConsignmentNoteId: this.orderId,
                    carrierId: this.companyId
                };
            } else {
                postData = {
                    lgsConsignmentNoteId: this.orderId,
                    consignorId: this.companyId
                };
            }
            this.$http.post(this.$api.transport.viewContract, postData)
                .then(res => {
                    this.contractUrl = res.data.data;
                    this.showContract = true;
                });
        },
        handleViewContract () {
            this.contractUrl = this.orderInfo.contactFilePath;
            this.showContract = true;
        },
        getNoticeList () {
            this.$http.post(this.$api.transport.deliverDetail, {
                data: {
                    lgsConsignmentNoteCode: this.orderInfo.consignmentNoteCode
                },
                pageSize: 10000000,
                pageNum: 1
            })
                .then(res => {
                    this.noticeDetailList = res.data.data.list;
                });
        },
        getTraceList () {
            this.$http.get(this.$api.transport.dispatchDetailList + '/' + this.orderId)
                .then(res => {
                    this.traceDetailList = res.data.data;
                    // this.total = this.traceDetailList.length;
                    this.getTurnPage();
                    for (var i = 0; i < this.traceDetailList.length; i++) {
                        if (this.traceDetailList[i].dispatchNoteStatus === 0) {
                            this.traceDetailList[i].dispatchNoteStatusvalue = '待发车';
                            this.traceDetailList[i].dispatchNoteStatusvalue2 = '发车';
                        } else if (this.traceDetailList[i].dispatchNoteStatus === 1) {
                            this.traceDetailList[i].dispatchNoteStatusvalue = '已发车';
                            this.traceDetailList[i].dispatchNoteStatusvalue2 = '到达提货点';
                        } else if (this.traceDetailList[i].dispatchNoteStatus === 2) {
                            this.traceDetailList[i].dispatchNoteStatusvalue = '已到达提货点';
                            this.traceDetailList[i].dispatchNoteStatusvalue2 = '提货信息';
                        } else if (this.traceDetailList[i].dispatchNoteStatus === 3) {
                            this.traceDetailList[i].dispatchNoteStatusvalue = '已提货';
                            this.traceDetailList[i].dispatchNoteStatusvalue2 = '到达卸货点';
                        } else if (this.traceDetailList[i].dispatchNoteStatus === 4) {
                            this.traceDetailList[i].dispatchNoteStatusvalue = '已到达卸货点';
                            this.traceDetailList[i].dispatchNoteStatusvalue2 = '卸货信息';
                        } else if (this.traceDetailList[i].dispatchNoteStatus === 5) {
                            this.traceDetailList[i].dispatchNoteStatusvalue = '已完成';
                        }
                    }
                });
        },
        getSum () {
            this.$http.get(`${this.$api.transport.transportTotal}/${this.orderId}`)
                .then(res => {
                    this.summations = res.data.data;
                });
        },
        getSettlementList () {
            this.$http.post(this.$api.transport.settleDetailList, {
                data: {
                    id: this.orderId
                },
                pageSize: 10000000,
                pageNum: 1
            })
                .then(res => {
                    this.settleDetailList = res.data.data.list;
                });
        },
        getPayList () {
            let api;
            api = this.companyTypeId === 2 ? this.$api.transport.collectionDetailList : this.$api.transport.payDetailList;
            this.$http.post(api, {orderType: 2, orderNumber: this.orderInfo.consignmentNoteCode})
                .then(res => {
                    this.payDetailList = res.data.data.rows;
                });
        },
        handleViewDispatch (id) {
            this.$http.get(this.$api.transport.diapatchTraceInfo + '/' + id)
                .then(res => {
                    let positon = res.data.data.dispatchNotePositionModelList;
                    window.localStorage.setItem('driverPosition', JSON.stringify(positon));
                    this.$router.push({name: 'transportDispatchDetail', query: {dispatchCode: id}});
                });
        },
        handleDetailTab (idx) {
            this.detailTabs.forEach(item => {
                item.id === idx ? (item.selected = true) : (item.selected = false);
            });
            if (idx === 0) {
                this.getNoticeList();
            }
            if (idx === 1) {
                this.getTraceList();
            }
            if (idx === 2) {
                this.getSettlementList();
            }
            if (idx === 3) {
                this.getPayList();
            }
        },
        // 导出
        exportDoc () {
            this.$http.get(`${this.$api.transport.consignmentNote}/${this.orderId}`, {responseType: 'blob'}).then(res => {
                if (res.data) {
                    this.download(res.data);
                    return;
                }
                this.$message.error('没有文件可下载');
            });
        },
        format (num) {
            if (parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        },
        download (data) {
            let blob = new Blob([data]);
            let y, m, d, date, time;
            date = new Date();
            y = date.getFullYear();
            m = date.getMonth() + 1;
            d = date.getDate();
            time = y + '' + this.format(m) + '' + this.format(d);
            if (window.navigator.msSaveOrOpenBlob) {
                // 兼容IE10
                navigator.msSaveBlob(blob, `${time}运输明细列表.xls`);
            } else {
                let url = window.URL.createObjectURL(new Blob([data]));
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', `${time}运输明细列表.xls`);
                document.body.appendChild(link);
                link.click();
            }
        },
        rejectContract () {
            this.$http.put(this.$api.transport.viewContract + '/' + this.orderId + '/rejectContract', {
                consignorId: this.companyId
            })
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('提交成功', '提示', {
                            type: 'success'
                        }).then(() => {
                            location.reload();
                        });
                    }
                });
        },
        chargeConfirm (status) {
            this.$http.put(this.$api.transport.newOrder, {
                consignmentNoteStatus: status,
                id: this.orderId
            }).then((res) => {
                if (res.data.code === 0) {
                    this.$alert('操作成功', '提示', {
                        type: 'success'
                    })
                        .then(() => {
                            this.$router.push({name: 'transparentOrder'});
                        });
                    return;
                }
                this.$alert(res.data.message, '出错了', {
                    type: 'error'
                });
            });
        },
        getContractPwd () {
            this.$http.get(this.$api.account.isHasContractPwd).then(res => {
                if (res.data.code === 0) {
                    this.isUseContractPSW = res.data.data.enableContractPwd === 1;
                }
            });
        },
        goIm (f, t) {
            window.open('/im/#type=2&username=' + window.btoa(f) + '&touser=' + window.btoa(t), '_blank');
        },
        stopDoConfirm () {
            if (!this.stopReason) {
                this.$message.error('请填写终止理由');
                return;
            }
            this.$http.post(this.$api.transport.stopDo, {lgsConsignmentNoteId: this.orderId, reason: this.stopReason, type: this.stopType})
                .then(res => {
                    if (res.data.code === 0) {
                        this.showStopReason = false;
                        this.init();
                        return;
                    }
                    this.$message.error(res.data.message);
                });
        },
        handleViewReason (type) {
            this.$http.post(this.$api.transport.stopReason, {lgsConsignmentNoteId: this.orderId, type: type})
                .then(res => {
                    if (res.data.code === 0) {
                        if (type === 1) {
                            this.viewReason = true;
                            Object.keys(this.stopReasonValue).map(item => {
                                this.stopReasonValue[item] = res.data.data[item];
                            });
                        } else {
                            this.viewChargeReason = true;
                            Object.keys(this.refuseChargeValue).map(item => {
                                this.refuseChargeValue[item] = res.data.data[item];
                            });
                        }
                        return;
                    }
                    this.$message.error(res.data.message);
                });
        },
        closeReasonPop () {
            this.viewReason = false;
            this.showStopReason = false;
        },
        closeChargePop () {
            this.viewChargeReason = false;
            this.showChargeReason = false;
        },
        handleStopDo (id) {
            this.$http.put(this.$api.transport.newOrder, {consignmentNoteStatus: id, id: this.orderId})
                .then(res => {
                    if (res.data.code === 0) {
                        this.init();
                        return;
                    }
                    this.$message.error(res.data.message);
                });
        },
        refuseChargeConfirm () {
            if (!this.chargeReason) {
                this.$message.error('请填写驳回理由');
                return;
            }
            this.$http.post(this.$api.transport.stopDo, {lgsConsignmentNoteId: this.orderId, reason: this.chargeReason, type: 2})
                .then(res => {
                    if (res.data.code === 0) {
                        this.showChargeReason = false;
                        this.init();
                        return;
                    }
                    this.$message.error(res.data.message);
                });
        },
        // 冯海莹新增 js
        handlePictureCardPreview (file) {
            this.addthImageUrl = file.url;
            this.addthImageshow = true;
        },
        // 上传成功
        addthImagesuccess (file, fileList) {
            this.allimg1.push({
                'fileDisplayName': file[0].fileName,
                'fileName': file[0].fileName,
                'filePath': file[0].filePath,
                'fileType': this.fileTypeId
            });
            console.log(this.allimg1);
        },
        // 删除
        handleRemove (file, fileList) {
            for (let i = 0; i < this.allimg1.length; i++) {
                if (this.allimg1[i].fileName === file.name) {
                    this.allimg1.splice(i, 1);
                }
            }
        },
        // 判断点开那个条件
        handleViewDispatchnew (index, id) {
            this.thqhId = '';
            this.thqhId = id;
            if (index === 2) {
                this.$alert('点击"提货信息"后将不可撤销该操作，是否继续？', '提示').then(() => {
                    this.fileTypeId = 0;
                    this.addthshow = true;
                    this.thtitle1 = '添加提货信息';
                    this.thtitle2 = '实际提货量';
                    this.getTraceList();
                });
            } else if (index === 4) {
                this.$alert('点击"卸货信息"后将不可撤销该操作，是否继续？', '提示').then(() => {
                    this.fileTypeId = 1;
                    this.addthshow = true;
                    this.thtitle1 = '添加卸货信息';
                    this.thtitle2 = '实际卸货量';
                    this.getTraceList();
                });
            } else if (index === 0) {
                this.$http.post(this.$api.transport.dispatchNotesth2, {
                    'createdBy': JSON.parse(localStorage.getItem('userInfo')).id,
                    'lgsDispatchNoteId': this.thqhId,
                    'dispatchNoteStatus': '1' // 调度单状态  1已发车2已到达提货点3已提货4已到达卸货点5已完成
                }).then(res => {
                    if (res.data.code === 0) {
                        this.addthshow = false;
                        this.$alert('成功', '提示');
                        this.init();
                        this.getTraceList();
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
            } else if (index === 1) {
                this.$http.post(this.$api.transport.dispatchNotesth2, {
                    'createdBy': JSON.parse(localStorage.getItem('userInfo')).id,
                    'lgsDispatchNoteId': this.thqhId,
                    'dispatchNoteStatus': '2' // 调度单状态  1已发车2已到达提货点3已提货4已到达卸货点5已完成
                }).then(res => {
                    if (res.data.code === 0) {
                        this.addthshow = false;
                        this.$alert('成功', '提示');
                        this.init();
                        this.getTraceList();
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
            } else if (index === 3) {
                this.$http.post(this.$api.transport.dispatchNotesth2, {
                    'createdBy': JSON.parse(localStorage.getItem('userInfo')).id,
                    'lgsDispatchNoteId': this.thqhId,
                    'dispatchNoteStatus': '4' // 调度单状态  1已发车2已到达提货点3已提货4已到达卸货点5已完成
                }).then(res => {
                    if (res.data.code === 0) {
                        this.addthshow = false;
                        this.$alert('成功', '提示');
                        this.init();
                        this.getTraceList();
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
            }
        },
        closeaddthImageClick () {
            this.thvalue1 = '';
            this.addthImageUrl = [];
            this.thtitle1 = '';
            this.thtitle2 = '';
            this.allimg1 = [];
        },
        addthImageClick () {
            if (this.allimg1.length === 0) {
                this.$message.error('请上传提货凭证');
                return;
            }
            if (this.thvalue1 === '') {
                this.$message.error('请输入提货量');
                return;
            }
            if (this.thtitle1 === '添加提货信息') {
                this.$refs.upload.clearFiles();
                this.$http.post(this.$api.transport.dispatchNotesth, {
                    'createdBy': JSON.parse(localStorage.getItem('userInfo')).id,
                    'filePaths': this.allimg1,
                    'lgsDispatchNoteId': this.thqhId,
                    'quantityLoading': this.thvalue1
                }).then(res => {
                    if (res.data.code === 0) {
                        this.addthshow = false;
                        this.init();
                        this.thvalue1 = '';
                        this.addthImageUrl = '';
                        this.thtitle1 = '';
                        this.thtitle2 = '';
                        this.getTraceList();
                        this.$http.post(this.$api.transport.dispatchNotesth2, {
                            'createdBy': JSON.parse(localStorage.getItem('userInfo')).id,
                            'lgsDispatchNoteId': this.thqhId,
                            'dispatchNoteStatus': '3' // 调度单状态  1已发车2已到达提货点3已提货4已到达卸货点5已完成
                        }).then(res => {
                            if (res.data.code === 0) {
                                this.$alert('操作成功', '提示');
                                this.addthshow = false;
                                this.init();
                                this.getTraceList();
                            } else {
                                this.$message.error(res.data.message);
                            }
                        });
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
            } else if (this.thtitle1 === '添加卸货信息') {
                this.$refs.upload.clearFiles();
                this.$http.post(this.$api.transport.dispatchNotesth, {
                    'createdBy': JSON.parse(localStorage.getItem('userInfo')).id,
                    'filePaths': this.allimg1,
                    'lgsDispatchNoteId': this.thqhId,
                    'quantityUnloading': this.thvalue1
                }).then(res => {
                    if (res.data.code === 0) {
                        this.addthshow = false;
                        this.init();
                        this.thvalue1 = '';
                        this.addthImageUrl = '';
                        this.thtitle1 = '';
                        this.thtitle2 = '';
                        this.getTraceList();
                        this.$http.post(this.$api.transport.dispatchNotesth2, {
                            'createdBy': JSON.parse(localStorage.getItem('userInfo')).id,
                            'lgsDispatchNoteId': this.thqhId,
                            'dispatchNoteStatus': '5' // 调度单状态  1已发车2已到达提货点3已提货4已到达卸货点5已完成
                        }).then(res => {
                            if (res.data.code === 0) {
                                this.$alert('操作成功', '提示');
                                this.addthshow = false;
                                this.init();
                                this.getTraceList();
                            } else {
                                this.$message.error(res.data.message);
                            }
                        });
                    } else {
                        this.$message.error(res.data.message);
                        this.allimg1 = [];
                    }
                });
            }
        }
        //    结束
    }
};
</script>
<style lang="scss" scoped>
    .tips .highlight {
        margin-left: 100px;
    }
    .gy-button-view {
        background-color: #fff;
    }
    .summation {
        td {
            background-color: #edf3f7 !important;
            color: #666666;
            font-weight: bold;
            border-bottom: 1px solid #f2f2f2;
            padding: 10px;
            line-height: 20px;
            font-size: 12px;
        }
    }
    .button-wrap {
        position: relative;
        display: inline-block;
        float: right;
        bottom: 10px;
        .gy-button-normal {
            margin-right: 10px;
        }
    }
    .null-msg {
        width: 100%;
        height: 39px;
        line-height: 39px;
        border: 1px solid #f2f2f2;
        border-top: 0;
        text-align: center;
    }
    .total {
        margin: 20px 0;
        font-size: 12px;
        color: #666;
    }
    .goods-deliver-button {
        text-align: right;
        padding: 0 16px 25px 0;
    }
    .icon-img-view {
        color: $color-extra;
        cursor: pointer;
    }
    .my-button {
        padding: 0 20px;
    }
    .pop-reason {
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        .main{
            width: 500px;
            background-color: #fff;
            border-radius: $border-radius-small;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -250px;
            transform: translateY(-50%);
            padding-bottom: 15px;
            .reason-header{
                border-bottom: 1px solid $color-border;
                line-height: 45px;
                padding: 0 15px;
                position: relative;
                h5{
                    font-weight: normal;
                    margin: 0;
                    font-size: 16px;
                    color: $color-title;
                }
                .date, .icon-close{
                    position: absolute;
                    top: 0;
                }
                .date{
                    right: 45px;
                }
                .icon-close {
                    right: 15px;
                    cursor: pointer;
                }
            }
            .message-box{
                padding: 15px;
                textarea{
                    height: 50px;
                    width: 100%;
                    padding: 0;
                    line-height: 1.8;
                    border: none;
                    resize: none;
                }
            }
            .buttons{
                text-align: right;
                padding: 0 15px;
            }
        }
    }
    .help-box {
        display: inline-block;
        vertical-align: top;
        margin-left: 5px;
        position: relative;
        cursor: pointer;
        .icon-help{
            color: $color-minor;
        }
        span{
            /*display: none;*/
            position: absolute;
            width: 200px;
            border: 1px solid $color-border;
            border-radius: $border-radius-small;
            background-color: #fff;
            text-align: left;
            font-size: 12px;
            padding: 5px;
            right: -20px;
            top: -60px;
            z-index: 100;
            color: $color-minor;
            display: none;
            transition: all 0.5s;
            &:after{
                position: absolute;
                content: '';
                border-left: 1px solid $color-border;
                border-bottom: 1px solid $color-border;
                background-color: #fff;
                transform: rotate(-45deg);
                width: 6px;
                height: 6px;
                right: 25px;
                bottom: -4px;
            }
        }
        &:hover{
            span{
                display: inline-block;
            }
        }
    }
    .link-approve{
        color: $color-extra;
        margin-left: 50px;
        display: inline-block;
    }
    .gy-button-views{
        font-size: 14px;
        margin-left: 10px;
    }
    .juy {
        text-align: right;
    }
</style>
