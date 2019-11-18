<template>
    <!--服务商审核信息-->
    <div class="service-provider-audit-info">
        <div class="title-wrapper"
             @click="serviceProviderAuditInfo = !serviceProviderAuditInfo">
            <i class="iconfont icon-service-provider"></i><span
            class="gy-h5">服务商审核信息<i
            class="el-icon-arrow-down"
            :class="{'el-rotate' : serviceProviderAuditInfo}"
        ></i></span>
        </div>
        <transition name="slide-fade">
            <div v-show="serviceProviderAuditInfo">
                <div class="service-provider-audit-info-content">
                    <div class="gy-form-group1">
                        <span class="l">受理人</span>
                        <span class="c" v-if="supply.appProviderModel.assigneeUserName">
                        {{supply.appProviderModel.assigneeUserName || '--'}}
                        </span>
                        <span class="c" v-else>
                        {{userName || '--'}}
                        </span>
                    </div>
                    <div class="gy-form-group1">
                        <span class="l">受理时间</span>
                        <div class="c" v-if="supply.appProviderModel.acceptTime">{{supply.appProviderModel.acceptTime | date(1)}}</div>
                        <div v-else class="c clock"><span class="alignment">{{ clock.applyDate + ' ' + clock.applyTime }}</span><img src="../../../assets/images/clock.gif" alt=""></div>
                    </div>
                    <div class="gy-form-group1">
                        <span class="l">申请公司评级</span>
                        <span class="c">
                            <template v-if="supply.appProviderModel.sinoyieRatingRank && supply.appProviderModel.sinoyieRatingRank !== '-'">
                                <span class="color-height">{{supply.appProviderModel.sinoyieRatingRank || '--'}}</span>(最近更新: {{supply.appProviderModel.sinoyieRatingDate | date}})
                            </template>
                            <template v-else>--</template>
                        </span>
                    </div>
                    <div class="gy-form-group1" v-if="[1, 3].includes(supply.scsAppModel.serviceTypeId) && supply.scsAppModel.thirdPartyId">
                        <span class="l">供应商评级</span>
                        <span class="c">
                            <template v-if="supply.appProviderModel.thirdPartySinoyieRatingRank && supply.appProviderModel.thirdPartySinoyieRatingRank !== '-'">
                                <span class="color-height">{{supply.appProviderModel.thirdPartySinoyieRatingRank || '--'}}</span>(最近更新: {{supply.appProviderModel.thirdPartySinoyieRatingDate | date}})
                            </template>
                            <template v-else>--</template>
                        </span>
                    </div>
                    <div class="gy-form-group1" v-if="supply.scsAppModel.serviceTypeId === 2">
                        <span class="l">采购公司评级</span>
                        <span class="c">
                            <template v-if="supply.appProviderModel.thirdPartySinoyieRatingRank && supply.appProviderModel.thirdPartySinoyieRatingRank !== '-'">
                                <span class="color-height">{{supply.appProviderModel.thirdPartySinoyieRatingRank || '--'}}</span>(最近更新: {{supply.appProviderModel.thirdPartySinoyieRatingDate | date}})
                            </template>
                            <template v-else>--</template>
                        </span>
                    </div>
                    <div class="gy-form-group1" v-if="supply.appProviderModel.status === 200">
                        <span class="l">受理备注</span>
                        <span class="c">
                        <textarea class="gy-textarea" v-model="supply.appProviderModel.acceptRemark"></textarea></span>
                    </div>
                    <div class="gy-form-group1" v-if="[201, 210, 220, 300, 400, 990].includes(supply.appProviderModel.status)">
                        <span class="l">受理备注</span>
                        <div class="c" v-if="supply.appProviderModel.acceptRemark">
                            <div style="border: 1px solid #f5f5f5;padding: 10px;word-break: break-word">{{supply.appProviderModel.acceptRemark}}</div>
                        </div>
                        <div class="c" v-else>--</div>
                    </div>
                    <div class="gy-form-group1" v-if="supply.appProviderModel.status === 220">
                        <span class="l">驳回原因</span>
                        <span class="c">{{supply.appProviderModel.rejectCause || '--'}}</span>
                    </div>
                    <div class="gy-form-group1" :class="{'clear': supply.appProviderModel.acceptRemark}" v-if="[210, 220, 300, 400, 990].includes(supply.appProviderModel.status) || supply.appProviderModel.initiatorUserId">
                        <span class="l">方案审批结果</span>
                        <div class="c">
                            <span v-if="supply.appProviderModel.status === 210 ">方案审批中</span>
                            <span v-if="supply.appProviderModel.status === 220 ">{{supply.appProviderModel.initiatorUserId ? '方案审批未通过' : '申请驳回'}}</span>
                            <span v-if="[300,400,990].includes(supply.appProviderModel.status)">方案审批通过</span></div>
                    </div>
                    <template v-if="supply.appProviderModel.status === 201">
                        <div style="clear: both;padding: 0 18px">
                            <div class="title-II"><span
                                class="gy-h5">服务方案</span>
                            </div>
                            <div class="title-II"><i class="iconfont icon-czlc"></i><span class="">服务规则</span>
                            </div>
                            <component class="fwfa-form" :is="content" :supply="supply" :appProviderModel.sync="appProviderModel"></component>
                            <div class="title-II"><i class="iconfont icon-zjhb"></i><span class="">贸易收益</span>
                            </div>
                            <div class="programme-content fwfa-form">
                                <div class="gy-form-group1">
                                    <div class="l"><strong>*</strong>采购金额</div>
                                    <div class="c">
                                    <div class="con-flex">
                                        <input v-model="appProviderModel.providerItem.investedCapital" type="text" class="gy-input ipt"><span class="t3">万元</span>
                                    </div></div>
                                </div>
                                <div class="gy-form-group1">
                                    <div class="l"><strong>*</strong>销售金额</div>
                                    <div class="c">
                                    <div class="con-flex">
                                        <input v-model="appProviderModel.providerItem.saleAmount" type="text" class="gy-input ipt"><span class="t3">万元</span>
                                    </div></div>
                                </div>
                                <!--<div class="gy-form-group1">-->
                                    <!--<span class="l"><strong>*</strong>年回报率(%)</span>-->
                                    <!--<div class="c">-->
                                    <!--<div class="con-flex">-->
                                        <!--<input v-model="appProviderModel.providerItem.annualRatioStart" type="text" class="gy-input ipt">-->
                                        <!--<span class="t2">-</span>-->
                                        <!--<input v-model="appProviderModel.providerItem.annualRatioEnd" type="text" class="gy-input ipt">-->
                                    <!--</div></div>-->
                                <!--</div>-->
                                <div class="gy-form-group1">
                                    <span class="l"><strong>*</strong>服务周期</span>
                                    <div class="c">
                                    <div class="con-flex">
                                        <input v-model="appProviderModel.providerItem.cashCycleDays" type="text" class="gy-input ipt"><span class="t3">天内</span>
                                    </div></div>
                                </div>
                                <div class="gy-form-group1">
                                    <span class="l">补充说明</span>
                                    <div class="c">
                                    <textarea v-model="appProviderModel.providerItem.backDescription" class="gy-textarea"></textarea></div>
                                </div>
                            </div>
                            <!--说明详情-->
                            <div class="title-II" @click="Details = !Details"><span
                                class="gy-h5"><i class="iconfont icon-gdxq"></i>更多详情<i
                                class="el-icon-arrow-down"
                                :class="{'el-rotate' : Details}"
                            ></i></span>
                            </div>
                            <transition name="slide-fade">
                                <div class="details-content" v-show="Details">
                                    <!--<div class="title-II-32"><i class="iconfont icon-fxkz"></i><span class="">风险控制</span></div>-->
                                    <div class="programme-content">
                                        <div class="gy-form-group1">
                                            <span class="l">风险控制措施</span>
                                            <div class="c">
                                                <div class="pb-16">请填写降低风险发生或风险发生时减少损失的措施与方法</div>
                                                <textarea v-model="appProviderModel.providerItem.riskDescription" class="gy-textarea"></textarea></div>
                                            </div>
                                    </div>
                                    <!--<div class="title-II"><i class="iconfont icon-hzlc"></i><span class="">合作流程</span></div>-->
                                    <div class="programme-content">
                                        <div class="gy-form-group1">
                                            <span class="l">服务前提条件</span>
                                            <div class="c">
                                                <div class="pb-16">请填写服务流程中有哪些已有或必备的条件</div>
                                                <textarea v-model="appProviderModel.providerItem.cooperationDescription" class="gy-textarea"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <!--<div class="title-II"><i class="iconfont icon-bcsm"></i><span class="">补充说明</span></div>-->
                                    <div class="programme-content">
                                        <div class="gy-form-group1">
                                            <span class="l">业务所需文件</span>
                                            <div class="c">
                                                <div class="pb-16">请填写业务流程中所涉及的文件如公司资料、合同、补充协议等</div>
                                                <textarea v-model="appProviderModel.providerItem.otherDescription" class="gy-textarea"></textarea>
                                            </div>
                                        </div>
                                        <div class="gy-form-group1">
                                            <span class="l">补充说明</span>
                                            <div class="c">
                                                <div class="pb-16">请填写需要补充描述的说明内容</div>
                                                <textarea v-model="appProviderModel.providerItem.replenishDescription" class="gy-textarea"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <!--<div class="title-II"><i class="iconfont icon-xmhtjwj"></i><span class="">项目合同及文件</span></div>-->
                                    <div class="programme-content">
                                        <div class="gy-form-group1">
                                            <span class="l">上传附属文档</span>
                                            <div class="c">
                                                <div class="up-load-file">
                                                    <div class="file-list">
                                                        <div v-for="(item, index) in providerFileList" style="float: left" :key="index">
                                                            <div class="contImgItem">
                                                                <ul class="el-upload-list el-upload-list--picture-card">
                                                                    <li tabindex="0" class="el-upload-list__item is-success">
                                                                        <img v-if="item.filetype === 'img'"
                                                                             :src="item.filePath" width="100%" height="100%" alt=""/>
                                                                        <img v-if="item.filetype === 'pdf'"
                                                                             src="../../../assets/images/pdf.png" height="100%"
                                                                             width="100%"/>
                                                                        <img v-if="item.filetype === 'word'"
                                                                             src="../../../assets/images/word.png" height="100%"
                                                                             width="100%"/>
                                                                        <img v-if="item.filetype === 'excel'"
                                                                             src="../../../assets/images/excel.png" height="100%"
                                                                             width="100%"/>
                                                                        <a class="el-upload-list__item-name"><i
                                                                            class="el-icon-document"></i>
                                                                        </a><label class="el-upload-list__item-status-label"><i
                                                                        class="el-icon-upload-success el-icon-check"></i></label><i
                                                                        class="el-icon-close"></i><i
                                                                        class="el-icon-close-tip">按 delete 键可删除</i><!----><span
                                                                        class="el-upload-list__item-actions">
                                                            <span v-show="item.filetype === 'img'" class="el-upload-list__item-preview" @click="dialogVisibleImg(item.filePath)"><i class="el-icon-zoom-in"></i></span>
                                                            <a :href="item.filePath" target="_blank" v-show="item.filetype === 'pdf'"><span class="el-upload-list__item-preview"><i class="el-icon-zoom-in"></i></span></a>
                                                            <a :href="item.filePath" target="_blank" v-show="item.filetype === 'word'"><span class="el-upload-list__item-preview"><i class="el-icon-zoom-in"></i></span></a>
                                                            <a :href="item.filePath" target="_blank" v-show="item.filetype === 'excel'"><span class="el-upload-list__item-preview"><i class="el-icon-zoom-in"></i></span></a>
                                                            <span class="el-upload-list__item-delete" @click="deleteFileList(index)"><i
                                                                class="el-icon-delete"></i></span></span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="upload-btn">
                                                        <el-upload action="api"
                                                                   list-type="picture-card"
                                                                   :disabled="stopUpload"
                                                                   :show-file-list="false"
                                                                   :http-request="onFileUpload">
                                                            <i class="el-icon-plus"></i>
                                                        </el-upload>
                                                    </div>
                                                </div></div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </template>
                    <div class="clear"></div>
                    <!-- 货押 服务商审核信息 -->
                    <template v-if="(supply.appProviderModel.status && [210, 300, 400, 990].includes(supply.appProviderModel.status)) || supply.appProviderModel.initiatorUserId">
                        <dc-facilitatorReviewInfo v-if="[1, 3].includes(supply.scsAppModel.serviceTypeId)" :supply=supply></dc-facilitatorReviewInfo>
                        <hy-facilitatorReviewInfo v-if="supply.scsAppModel.serviceTypeId === 2" :supply=supply></hy-facilitatorReviewInfo>
                    </template>
                </div>
                <div class="gy-btn-group" style="padding-right: 58px;" v-if="[200, 201].includes(supply.appProviderModel.status)">
                    <button type="button" v-if="supply.appProviderModel.status === 200" class="gy-button-extra" @click="serviceProviderAccept">确认受理</button><button
                    v-if="supply.appProviderModel.status === 201" type="button" class="gy-button-extra" @click="serviceProviderInitiate">发起方案审批</button><button
                    type="button" class="gy-button-normal" @click="serviceProviderReject = true" v-if="supply.appProviderModel.status === 200 || supply.appProviderModel.status === 201">驳回申请
                </button>
                </div>
            </div>
        </transition>
        <el-dialog v-if="serviceProviderReject" class="management-dialog" :close-on-click-modal="false" width="504px" title="驳回申请" :visible.sync="serviceProviderReject">
            <div style="padding: 20px 16px 32px 16px">
                <div class="management-content">
                    <div style="display: flex;padding-bottom: 32px">
                        <span style="flex: 0 0 88px"><strong style="color: #e0370f;margin-right: 8px">*</strong>驳回原因</span>
                        <div style="position: relative;flex: 1">
                            <textarea class="gy-textarea" v-model="rejectCause"></textarea>
                            <div style="position: absolute;right: 3px;bottom: 3px">{{rejectCause.length}}/30</div>
                        </div>
                    </div>
                </div>
                <div style="text-align: right">
                    <button type="button" class="gy-button-extra" style="margin-right: 10px" @click="doServiceProviderReject">确定</button><button
                        type="button" class="gy-button-normal" @click="serviceProviderReject = false">取消
                    </button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import mortgage from './projectApprovalMortgage';
import agent from './projectApprovalAgent';
import hyFacilitatorReviewInfo from './hy-facilitatorReviewInfo';
import dcFacilitatorReviewInfo from './dc-facilitatorReviewInfo';
export default {
    name: 'serviceProvider',
    props: {supply: Object, providerFileList: Array},
    data () {
        return {
            serviceProviderAuditInfo: true,
            Details: false,
            appProviderModel:
                {
                    'id': null, // 服务立项表id    服务商审核信息中获取
                    'applicationId': null, // 申请单id
                    'remark': null,
                    'providerItem': { // 立项详情
                        'applicationProviderId': null, // 立项申请单id   服务商审核信息中获取
                        'annualRatioEnd': null, // 资金年回报率（%）开始
                        'annualRatioStart': null, // 资金年回报率（%）结束
                        'backDescription': null, // 资金回报补充说明
                        'buyContractAmount': 0, // 采购合同保证金
                        'saleContractAmount': 0, // 销售合同保证金
                        'saleIsBatchDelivery': null, // 销售订单是否分批交割
                        'buyIsBatchDelivery': null, //  采购订单是否分批交割
                        'buyPaymentType': null, //  采购合同付款方式
                        'cashCycleDays': null, // 服务周期（天）
                        'cooperationDescription': null, // 合作流程说明
                        'depositRatioAppend': 0, // 追加保证金 补   销售追加保证金 补
                        'depositRatioSubtract': 0, // 追加保证金 跌   销售追加保证金 跌
                        'investedCapital': null, // 采购金额（万元）
                        'saleAmount': null, // 销售金额（万元）
                        'otherDescription': null, // 项目合同及文件-业务所需文件
                        'replenishDescription': null, // 补充说明
                        'repoDays': null, // 回购时间（天）
                        'riskDescription': null, // 风险控制措施说明
                        'supplierCompanyId': null, // 供应商公司id
                        'supplierCompanyName': null// 供应商公司名称
                    },
                    'providerFileList': [// 立项文件
                        // {
                        //     'filePath': 's111tring', // 文件路径
                        //     'fileType': 110// 文件类型
                        // }
                    ],
                    'version': null // 服务立项版本号  乐观锁   服务商审核信息中获取
                },
            content: this.supply.scsAppModel.serviceTypeId === 2 ? mortgage : agent,
            rejectCause: '',
            serviceProviderReject: false,
            stopUpload: false,
            userName: null,
            timer: null,
            clock: {
                applyDate: '',
                applyTime: ''
            }
        };
    },
    mounted () {
        this.timer = setInterval(() => {
            this.setTime();
        }, 1000);
        this.userName = JSON.parse(localStorage.getItem('userInfo')).username;
    },
    beforeDestroy () {
        clearInterval(this.timer);
    },
    methods: {
        zeroPadding (num, digit) {
            let zero = '';
            for (let i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        setTime () {
            let cd = new Date();
            this.clock.applyTime = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
            this.clock.applyDate = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2);
        },
        // 服务商受理
        serviceProviderAccept () {
            const params = {
                'id': this.supply.appProviderModel.id,
                'applicationId': this.supply.appProviderModel.applicationId,
                'acceptRemark': this.supply.appProviderModel.acceptRemark,
                'version': this.supply.appProviderModel.version
            };
            this.$http.post(this.$api.supply.serviceProviderAccept, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('操作成功');
                        this.init();
                        return;
                    }
                    this.$message.error(res.data.message);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 服务商发起方案
        serviceProviderInitiate () {
            if (!this.appProviderModel.providerItem.saleContractAmount && this.appProviderModel.providerItem.saleContractAmount !== 0) {
                this.$message.error('请先填写销售保证金');
                return;
            }
            if (!/^\d+$/.test(this.appProviderModel.providerItem.saleContractAmount)) {
                this.$message.error('销售保证金只能是数字');
                return;
            }
            if ((!this.appProviderModel.providerItem.depositRatioSubtract && this.appProviderModel.providerItem.depositRatioSubtract !== 0) ||
                (!this.appProviderModel.providerItem.depositRatioAppend && this.appProviderModel.providerItem.depositRatioAppend !== 0)) {
                this.$message.error('请先填写销售追保');
                return;
            }
            if (!/^\d+$/.test(this.appProviderModel.providerItem.depositRatioSubtract)) {
                this.$message.error('销售追保只能是数字');
                return;
            }

            if (!this.appProviderModel.providerItem.buyPaymentType) {
                this.$message.error('请先填写采购付款方式');
                return;
            }
            // 货压
            if (this.supply.scsAppModel.serviceTypeId === 2 && !this.appProviderModel.providerItem.repoDays) {
                this.$message.error('请先填写采购期限');
                return;
            }

            if (this.supply.scsAppModel.serviceTypeId === 2 && !/^\d+$/.test(this.appProviderModel.providerItem.repoDays)) {
                this.$message.error('采购期限只能是数字');
                return;
            }
            // 代采无指定供应商
            if ([1, 3].includes(this.supply.scsAppModel.serviceTypeId) && !this.supply.scsAppModel.thirdPartyId &&
                (!this.appProviderModel.providerItem.supplierCompanyId || !this.appProviderModel.providerItem.supplierCompanyName)) {
                this.$message.error('请先填供应商');
                return;
            }
            // 代采
            if ([1, 3].includes(this.supply.scsAppModel.serviceTypeId)) {
                if (!this.appProviderModel.providerItem.buyContractAmount && this.appProviderModel.providerItem.buyContractAmount !== 0) {
                    this.$message.error('请先填写采购保证金');
                    return;
                }
                if (!/^\d+$/.test(this.appProviderModel.providerItem.buyContractAmount)) {
                    this.$message.error('采购保证金只能是数字');
                    return;
                }
                if (!this.appProviderModel.providerItem.saleIsBatchDelivery) {
                    this.$message.error('请先选择销售订单分批');
                    return;
                }
                if (!this.appProviderModel.providerItem.buyIsBatchDelivery) {
                    this.$message.error('请先选择采购订单分批');
                    return;
                }
            }

            if (!this.appProviderModel.providerItem.investedCapital) {
                this.$message.error('请先填写采购金额');
                return;
            }
            if (!/^\d+$/.test(this.appProviderModel.providerItem.investedCapital)) {
                this.$message.error('采购金额只能是数字');
                return;
            }
            if (!this.appProviderModel.providerItem.saleAmount) {
                this.$message.error('请先填写销售金额');
                return;
            }
            if (!/^\d+$/.test(this.appProviderModel.providerItem.saleAmount)) {
                this.$message.error('销售金额只能是数字');
                return;
            }
            // if (!this.appProviderModel.providerItem.annualRatioStart || !this.appProviderModel.providerItem.annualRatioEnd) {
            //     this.$message.error('请先填写年回报率');
            //     return;
            // }
            // if (!/^\d+$/.test(this.appProviderModel.providerItem.annualRatioStart) || !/^\d+$/.test(this.appProviderModel.providerItem.annualRatioEnd)) {
            //     this.$message.error('年回报率只能是数字');
            //     return;
            // }
            if (!this.appProviderModel.providerItem.cashCycleDays) {
                this.$message.error('请先填写服务周期');
                return;
            }
            if (!/^\d+$/.test(this.appProviderModel.providerItem.cashCycleDays)) {
                this.$message.error('服务周期只能是数字');
                return;
            }
            const params = {
                providerItem: {
                    ...this.appProviderModel.providerItem,
                    applicationProviderId: this.supply.appProviderModel.id
                },
                'id': this.supply.appProviderModel.id,
                'applicationId': this.supply.appProviderModel.applicationId,
                'remark': this.supply.appProviderModel.remark,
                providerFileList: this.providerFileList,
                'version': this.supply.appProviderModel.version
            };
            this.$http.post(this.$api.supply.serviceProviderInitiate, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('操作成功');
                        this.init();
                        return;
                    }
                    this.$message.error(res.data.message);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 服务商受理/立项拒绝
        doServiceProviderReject () {
            const params = {
                'id': this.supply.appProviderModel.id,
                'applicationId': this.supply.appProviderModel.applicationId,
                'rejectCause': this.rejectCause,
                'version': this.supply.appProviderModel.version
            };
            if (!params.rejectCause) {
                this.$message.error('请先填写备注');
                return;
            }
            this.$http.post(this.$api.supply.serviceProviderReject, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('操作成功');
                        this.serviceProviderReject = false;
                        this.init();
                        return;
                    }
                    this.$message.error(res.data.message);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        companySelect (item) {
            console.log(item);
        }
    },
    components: {mortgage, agent, hyFacilitatorReviewInfo, dcFacilitatorReviewInfo},
    watch: {
        rejectCause (val) {
            if (this.rejectCause.length > 30) {
                // this.$message.error('备注最多填写30字');
                this.rejectCause = this.rejectCause.substr(0, 30);
            }
        }
    },
    inject: ['dialogVisibleImg', 'onFileUpload', 'serviceProviderHistory', 'init', 'deleteFileList'],
    filters: {
        date: function (time, hour) { // 把时间戳格式:若有参返回年-月-日时:分:秒 若无参返回 年-月-日
            if (!time) {
                return '--';
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
        }
    }
};
</script>

<style lang="scss" scoped>
    .clock{
        height: 20px;
        margin-top: -2px;
        img{
            height: 25px;
            width: 25px;
            margin-left: 5px;
            vertical-align: middle;;
        }
        .alignment{
            display: inline-block;
            vertical-align: middle;
            width: 145px;
        }
    }
    /deep/ .service-provider-audit-info-content {
        padding-left: 10px;
        padding-right: 10px;
        .gy-link {
            padding-left: 15px;
        }
    }
    /deep/ .gy-form-group1 {
        float: left;
        width: 50%;
        padding: 8px 30px 8px 0;
        min-height: 36px;
        color: #000;
        line-height: 20px;
        &:after{
            clear: both;
            content: ' ';
            display: block;
        }
        .l {
            float: left;
            display: inline-block;
            width: 114px;
            padding-left: 30px;
            position: relative;
            strong{
                color: #e0370f;
                font-size: 12px;
                font-weight: normal;
                width: 8px;
                position: absolute;
                left: 20px;
                text-align: left;
                top: 0;
            }
        }
        .c {
            float: left;
            display: inline-block;
            color: $color-main;
            width: calc(100% - 114px);
            padding-left: 24px;
        }
    }
    /deep/ .gy-form-group2 {
        .l {
            width: 138px;
        }
        .c {
            width: calc(100% - 138px);
            padding-left: 0;
        }
    }
    /deep/ .con-flex {
        display: flex;
        height: 30px;
        line-height: 30px;
        text-align: center;
        .t1{
            flex: 0 0 20px;
        }
        .ipt{
            flex: 1;
        }
        .t2{
            flex: 0 0 20px;
        }
        .t3{
            flex: 0 0 35px;
            text-align: right;
        }
    }
    /deep/ .title-wrapper {
        padding: 15px 16px 9px 20px!important;
        .iconfont {
            margin-left: -6px;
        }
    }
    /deep/ .title-II {
        padding: 15px 0 9px 12px;
        cursor: default;
        line-height: 1;
        clear: both;
        .gy-h5{
            /*font-family: "PingFangSC-Medium";*/
            font-weight: bold;
        }
        .iconfont {
            display: inline-block;
            width: 16px;
            margin-right: 8px;
            vertical-align: text-bottom;
        }
        span {
            cursor: default;
        }
        .el-icon-arrow-down {
            margin-left: 8px;
        }
        .gy-link {
            float: right;
        }
    }
    /deep/ .programme-content {
        padding-left: 5px;
        &:after {
            display: block;
            clear: both;
            content: ' ';
        }
    }
    .details-content {
        .gy-form-group1{
            width: 100%;
        }
    }
    .up-load-file{
        &:after{
            display: block;
            content: ' ';
            clear: both;
        }
        .file-list{
            float: left;
        }
        .upload-btn{
            float: left;
        }
    }
    .bt8{
        border-top: 8px solid #f5f5f5;
    }
    /deep/ .el-input-number{
        width: 100%;
        line-height: 30px;
        .el-input {
            height: 30px;
            .el-input__inner {
                display: inline;
            }
        }
    }
    /deep/ .el-input-number__decrease, /deep/ .el-input-number__increase{
        position: absolute;
        z-index: 1;
        top: 1px;
        width: 25px;
        height: 30px;
        text-align: center;
        background: #fff;
        color: #666;
        line-height: 30px;
        font-size: 12px;
        border-width: 0;
    }
    .clear {
        clear: both;
    }
    .pl-32{
        padding-left: 32px;
    }
    .pl-25{
        padding-left: 25px;
    }
    .pb-16 {
        padding-bottom: 16px;
        color: #999;
    }
    /deep/ .fwfa-form {
        .l{
            line-height: 30px;
        }
    }
</style>
