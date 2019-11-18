<template>
    <div>
        <!--违约和处置-->
        <div class="breach-contract-disposal" v-if="supply.appDisposalModel">
            <div class="title-wrapper"
                 @click="breachContractDisposal = !breachContractDisposal">
                <i class="iconfont icon-icon_shenqingxinxi"></i><span
                class="gy-h5">违约和处置<i
                class="el-icon-arrow-down"
                :class="{'el-rotate' : breachContractDisposal}"
            ></i></span><a v-if="[4003, 4004, 4005, 4006].includes(supply.appDisposalModel.status)"
                           href="javascript:void(0);" class="gy-link" @click.stop="serviceProviderHistory('处置')">处置申请审批详情</a>
            </div>
            <transition name="slide-fade">
                <div v-show="breachContractDisposal">
                    <div class="title-II"><span class="gy-h5">违约详情</span></div>
                    <div class="breach-contract-disposal-content">
                        <div class="gy-form-group">
                            <span class="l">违约录入人</span>
                            {{supply.appDisposalModel.recordUserName || '--'}}
                        </div>
                        <div class="gy-form-group">
                            <span class="l">违约录入时间</span>
                            {{supply.appDisposalModel.recordTime | date(1)}}
                        </div>
                        <div class="gy-form-group">
                            <span class="l">违约原因</span>
                            {{supply.appDisposalModel.casue || '--'}}
                        </div>
                    </div>
                    <template v-if="[4003, 4004, 4005, 4006].includes(supply.appDisposalModel.status)">
                        <div class="title-II"><span class="gy-h5">处置详情</span></div>
                        <div class="breach-contract-disposal-content">
                            <div class="gy-form-group">
                                <span class="l">处置申请人</span>
                                {{supply.appDisposalModel.applyUserName || '--'}}
                            </div>
                            <div class="gy-form-group">
                                <span class="l">处置申请时间</span>
                                {{supply.appDisposalModel.applyTime | date(1)}}
                            </div>
                            <div class="gy-form-group">
                                <span class="l">处置方案说明</span>
                                <div v-if="supply.appDisposalModel.remark" style="border: 1px solid #f5f5f5; padding: 10px;word-break: break-word;">{{supply.appDisposalModel.remark}}</div>
                                <span v-else>--</span>
                            </div>
                            <div class="gy-form-group">
                                <span class="l">处置方案附件</span>
                                <a :href="item.filePath" class="gy-link" target="_blank" style="display: block" v-for="(item, index) in supply.appDisposalModel.applicationDisposalFileList" :key="index">{{item.fileName}}</a>
                            </div>
                            <div class="gy-form-group" style="clear: both">
                                <span class="l">审批结果</span>
                                {{supply.appDisposalModel.result || '--'}}
                            </div>
                            <div class="gy-form-group">
                                <span class="l">处置结果说明</span>
                                <div v-if="supply.appDisposalModel.resultDescription" style="border: 1px solid #f5f5f5; padding: 10px;word-break: break-word;">{{supply.appDisposalModel.resultDescription}}</div>
                                <span v-else>--</span>
                            </div>
                        </div>
                    </template>
                    <div class="gy-btn-group">
                        <button type="button" class="gy-button-extra" @click="setManagement(true)" v-if="[4002].includes(supply.appDisposalModel.status)">申请处置</button>
                        <button type="button" class="gy-button-extra" @click="managementResa = true" v-if="[4004, 4005].includes(supply.appDisposalModel.status)">处置结果</button>
                    </div>
                </div>
            </transition>
        </div>
        <el-dialog v-if="dialog" class="management-dialog" :close-on-click-modal="false" @close="setManagement(false)"
                   :title="supply.scsAppModel.status === 30 ? '违约原因': '申请处置'" width="504px" :visible.sync="dialog">
            <div v-if="supply.scsAppModel.status === 30" style="padding: 28px 16px 32px 16px;">
                <div style="line-height: 1;padding-bottom: 16px;color: #000;">确认违约该申请单将进入违约处置流程，请谨慎操作!</div>
                <div class="management-content">
                    <div style="display: flex;padding-bottom: 29px">
                        <span style="flex: 0 0 115px;color: #000;"><strong style="color: #e0370f;padding-right: 8px">*</strong>是否需要处置</span>
                        <div style="flex: 1">
                            <el-radio v-model="createBreachData.status" label="4002">需要</el-radio>
                            <el-radio v-model="createBreachData.status" label="4001">不需要</el-radio>
                        </div>
                    </div>
                    <div style="display: flex;padding-bottom: 32px">
                        <span style="flex: 0 0 95px;color: #000;"><strong style="color: #e0370f;padding-right: 8px">*</strong>违约原因</span>
                        <div style="flex: 1;display: flex;flex-direction: column">
                            <el-select v-model="createBreachData.casue" placeholder="请选择">
                                <el-option label="买家逾期付款" value="买家逾期付款"></el-option>
                                <el-option label="卖家逾期交货" value="卖家逾期交货"></el-option>
                                <el-option label="其他" value="其他"></el-option>
                            </el-select>
                            <textarea v-if="createBreachData.casue === '其他'" style="flex: 1;margin-top: 20px;" class="gy-textarea" v-model="casue"></textarea>
                        </div>
                    </div>
                </div>
                <div style="text-align: right">
                    <button type="button" style="margin-right: 8px" class="gy-button-extra" @click="createBreach">确定</button><button
                    type="button" class="gy-button-normal" @click="setManagement(false)">取消</button>
                </div>
            </div>
            <div style="padding: 16px 16px 32px 16px;" v-if="supply.appDisposalModel && supply.appDisposalModel.status === 4002">
                <div>
                    <div style="display: flex;padding-bottom: 16px;">
                        <span style="flex: 0 0 138px;color: #000;line-height: 1;"><strong style="color: #e0370f;padding-right: 8px">*</strong>处置方案说明</span>
                        <textarea style="flex: 1" class="gy-textarea" v-model="managementData.remark"></textarea>
                    </div>
                    <div style="display: flex;padding-bottom: 16px;">
                        <span style="flex: 0 0 138px;color: #000;line-height: 1;"><strong style="color: #e0370f;padding-right: 8px">*</strong>处置方案附件</span>
                        <div style="flex: 1" class="up-load-file">
                            <div class="file-list">
                                <div v-for="(item, index) in applicationDisposalFileList" style="float: left" :key="index">
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
                                                        <span class="el-upload-list__item-delete" @click="deleteFileList(index, 2)"><i
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
                                           :http-request="onFileUpload1">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="text-align: right;">
                    <button type="button" style="margin-right: 10px" class="gy-button-extra" @click="doManagement">发起申请</button><button
                    type="button" class="gy-button-normal" @click="setManagement(false)">取消
                </button>
                </div>
            </div>
        </el-dialog>
        <el-dialog v-if="managementResa" class="management-dialog" :close-on-click-modal="false" title="处置结果" width="504px" :visible.sync="managementResa">
        <div style="padding: 20px 16px 32px 16px">
            <div class="management-content">
                <div style="display: flex;padding-bottom: 32px">
                    <span style="flex: 0 0 115px;color: #000;line-height: 1;"><strong style="color: #e0370f;margin-right: 8px">*</strong>处置结果说明</span>
                    <textarea style="flex: 1" class="gy-textarea" v-model="managementResault.resultDescription"></textarea>
                </div>
            </div>
            <div style="text-align: right">
                <button type="button" class="gy-button-extra" @click="managementRes">确定</button>
                <button
                    type="button" class="gy-button-normal" @click="managementResa = false">取消
                </button>
            </div>
        </div>
    </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'breachContractDisposal',
    props: {
        management: {
            defalult: false
        },
        supply: Object,
        applicationDisposalFileList: {
            default: []
        }
    },
    watch: {
        management (val) {
            this.dialog = val;
        }
    },
    data () {
        return {
            dialog: false,
            managementResa: false,
            managementData: {
                'applicationDisposalFileList': [],
                'applicationId': null,
                'remark': null,
                'status': '4003'
            },
            createBreachData: {
                applicationId: null,
                status: null,
                casue: null
            },
            casue: null,
            stopUpload: false,
            managementResault: {
                'applicationId': null,
                // 'result': null,
                'resultDescription': null,
                'status': '4006'
            },
            breachContractDisposal: true
        };
    },
    methods: {
        // 创建违约
        createBreach () {
            if (!this.createBreachData.status) {
                this.$message.error('请先选择是否需处置');
                return;
            }
            if (!this.createBreachData.casue) {
                this.$message.error('请先填写违约原因');
                return;
            }
            if (this.createBreachData.casue === '其他' && !this.casue) {
                this.$message.error('请先填写违约原因');
                return;
            }
            const params = Object.assign({}, {
                ...this.createBreachData,
                applicationId: this.$route.query.id,
                casue: this.createBreachData.casue === '其他' ? this.casue : this.createBreachData.casue
            });
            this.$http.post(this.$api.supply.createBreach, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('操作成功');
                        this.setManagement(false);
                        this.init();
                        return;
                    }
                    this.$message.error(res.data.message);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 申请处置
        doManagement () {
            if (!this.managementData.remark) {
                this.$message.error('请先填写处置方案说明');
                return;
            }
            if (this.managementData.remark.length > 300) {
                this.$message.error('处置方案说明最多填写300字');
                return;
            }
            if (this.applicationDisposalFileList.length === 0) {
                this.$message.error('请先上传处置方案附件');
                return;
            }
            const params = Object.assign({}, {
                ...this.managementData,
                applicationId: this.supply.appDisposalModel.applicationId,
                applicationDisposalFileList: this.applicationDisposalFileList
            });
            this.$http.post(this.$api.supply.management, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('操作成功');
                        this.init();
                        this.setManagement(false);
                        return;
                    }
                    this.$message.error(res.data.message);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 处置结果
        managementRes () {
            if (!this.managementResault.resultDescription) {
                this.$message.error('请先填写处置结果说明');
                return;
            }
            if (this.managementResault.resultDescription.length > 300) {
                this.$message.error('处置结果说明最多填写300字');
                return;
            }
            const params = Object.assign({}, {
                ...this.managementResault,
                applicationId: this.supply.appDisposalModel.applicationId
            });
            this.$http.post(this.$api.supply.managementResault, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('操作成功');
                        this.managementResa = false;
                        this.init();
                        return;
                    }
                    this.$message.error(res.data.message);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    },
    inject: ['serviceProviderHistory', 'dialogVisibleImg', 'deleteFileList', 'init', 'setManagement', 'onFileUpload1'],
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
    .title-wrapper {
        padding: 15px 16px 9px 40px!important;
        .iconfont {
            margin-left: -6px;
        }
    }
    .title-II {
        padding: 15px 0 9px 58px;
        cursor: default;
        line-height: 1;
        clear: both;
        .gy-h5{
            /*font-family: "PingFangSC-Medium";*/
            font-weight: bold;
        }
    }
    .breach-contract-disposal-content {
        padding-left: 28px;
        padding-bottom: 6px;
        &:after {
            display: block;
            content: ' ';
            clear: both;
        }
        .gy-form-group {
            padding-left: 138px;
            .l {
                width: 114px;
            }
        }
    }
    .management-dialog {
        .up-load-file{
            /*display: flex;*/
            &:after{
                display: block;
                content: ' ';
                clear: both;
            }
            .file-list{
                float: left;
                /*flex: 1;*/
            }
            .upload-btn{
                float: left;
                /*flex: 0 0 60px;*/
            }
        }
    }
</style>
