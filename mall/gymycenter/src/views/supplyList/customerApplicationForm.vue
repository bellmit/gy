<template>
    <div class="customer-application-form">
        <div class="new-title-public">供应链申请单</div>
        <application :scsAppModel="supply.scsAppModel" :statusName="statusName"></application>
        <!--基本信息-->
        <div class="application-content">
            <!--公司信息-->
            <div class="company-info">
                <div class="title-wrapper" @click="moduleItems.companyInfo = !moduleItems.companyInfo">
                    <i class="iconfont icon-bangdingxindetixianzhanghao"></i><span
                    class="gy-h5">公司信息<i
                    class="el-icon-arrow-down"
                    :class="{'el-rotate' : moduleItems.companyInfo}"
                ></i></span>
                </div>
                <transition name="slide-fade">
                    <div class="application-info-content" v-show="moduleItems.companyInfo" style="border-bottom-width: 0">
                        <view1 :scsAppModel="supply.scsAppModel"></view1>
                    </div>
                </transition>
            </div>
            <!--申请详情-->
            <div class="application-info">
                <div class="title-wrapper" @click="moduleItems.applicationInfo = !moduleItems.applicationInfo">
                    <i class="iconfont icon-icon_shenqing"></i><span
                    class="gy-h5">申请详情<i
                    class="el-icon-arrow-down"
                    :class="{'el-rotate' : moduleItems.applicationInfo}"
                ></i></span>
                </div>
                <transition name="slide-fade">
                    <div class="application-info-content" v-show="moduleItems.applicationInfo">
                        <view2 :scsAppModel="supply.scsAppModel"></view2>
                    </div>
                </transition>
            </div>
        </div>
        <!--流程信息-->
        <div class="module-content">
            <!--平台审核信息-->
            <platform-audit :supply="supply" v-if="supply.appPlatformModel"></platform-audit>
            <!--服务商审核信息-->
            <service-provider v-if="supply.appProviderModel" :providerFileList="providerFileList" :supply="supply"></service-provider>
            <!--服务执行信息-->
            <document-execution :supply="supply" v-if="supply.scsAppModel.status >= 30 && supply.scsAppModel.status !== 98"></document-execution>
            <!--违约和处置-->
            <breach-contract-disposal :supply="supply" :management="management" :applicationDisposalFileList="applicationDisposalFileList"></breach-contract-disposal>
        </div>
        <el-dialog v-if="projectApprovalRecords" :close-on-click-modal="false" class="spqk" title="审批情况" :visible.sync="projectApprovalRecords">
            <div>
                <table class="gy-table">
                    <thead>
                    <tr>
                        <td style="width: 80px;max-width: 80px;">序号</td>
                        <td style="width: 150px;max-width: 150px;">审批人</td>
                        <td style="width: 100px;max-width: 100px;">状态</td>
                        <td style="width: 220px;max-width: 220px;">备注</td>
                        <td style="width: 200px;max-width: 200px;">时间</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="projectApprovalRecordsList && projectApprovalRecordsList.length === 0">
                        <td colspan="5" class="align-c">暂无数据</td>
                    </tr>
                    <tr v-else v-for="(item, index) of projectApprovalRecordsList" :key="index">
                        <td>{{index * 1 + 1}}</td>
                        <td>{{item.username}}</td>
                        <td>{{resultCode[item.resultCode]}}</td>
                        <td>
                            <el-tooltip placement="top" :disabled="(item.msg && item.msg.replace(/[^x00-xff]/g, 'aa').length > 40)? disabled : !disabled" effect="light">
                                    <div class="tootip" slot="content">{{item.msg}}</div>
                                    <div style="width: 100%;max-width: 280px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis">{{item.msg || '--'}}</div>
                            </el-tooltip>
                        </td>
                        <td>{{item.createdDate | date(1)}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="gy-btn-group">
                    <button type="button" class="gy-button-extra" @click="projectApprovalRecords = false">确定</button>
                </div>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogVisibleImage" alt="">
        </el-dialog>
    </div>
</template>

<script>
import view1 from './component/view1';
import view2 from './component/view2';
import serviceProvider from './component/serviceProvider';
import platformAudit from './component/platformAudit';
import breachContractDisposal from './component/breachContractDisposal';
import documentExecution from './component/documentExecution';
import application from './component/application';

export default {
    name: 'customerApplicationForm',
    data () {
        return {
            supply: {
                // 基本信息部分
                scsAppModel: {
                    assigneeUserName: null, // 受理人
                    code: null, // 单号
                    companyAddress: null, // 客户地址
                    companyId: null, // 客户公司Id
                    companyName: null, // 客户公司名称
                    contactName: null, // 联系人名称
                    contactPhone: null, // 联系方式
                    createdBy: null, // integer($int64)
                    createdDate: null, // string($date-time)
                    deliveryWarehouseId: null, // 交割库id
                    deliveryWarehouseName: null, // 交割库名称
                    disposed: null, // 0: 未经过处置 1 经过处置  是否处置过
                    effectiveDate: null, // 有效日期
                    endTime: null, // 高级搜索结束时间
                    id: null, // integer($int64)
                    keywords: null, // string
                    memo: null, // 备注
                    needTransport: null, //  0: 不需要 1 需要  是否需要运输
                    num: null, // 标签页数量
                    period: null, // (资金)周期
                    prdSkuId: null, // 产品ID
                    productAmount: null, // 商品数量
                    productId: null, // 商品Id
                    productName: null, // 商品名称
                    productPriceMax: null, // 商品高价格
                    productPriceMin: null, // 商品低价格
                    providerCompanyId: null, // 服务商公司Id(此字段为冗余)
                    providerCompanyName: null, // 服务商公司名称(此字段为冗余)
                    serviceTypeId: null, // 服务类型Id 1 代采 2 货压
                    serviceTypeName: null, // 服务类型名称
                    shortOverflowRate: null, // 溢短装
                    skuCode: null, // 商品编号
                    skuName: null, // 商品名称
                    skuPictureUrl: null, // 商品图片url
                    startTime: null, // 高级搜索开始时间
                    status: null, //  10 平台审核 20 服务商审核 21 立项中 22 申请驳回 30 单证执行 40 违约和处理 98 已拒绝 99 已完成 状态
                    statusName: null, // 状态名称
                    thirdPartyFlag: null, // 0无 1有  第三方标志
                    thirdPartyId: null, // 第三方公司Id
                    thirdPartyName: null, // 第三方公司名称
                    topCatalogueId: null, // 产品顶级分类id
                    unit: null, //  d 天 m 月 单位
                    updatedBy: null, // integer($int64)
                    updatedDate: null, // string($date-time)
                    valid: null // integer($int32)
                },
                // 平台审核
                appPlatformModel: null,
                //     {
                //     acceptTime: null, // 受理时间
                //     applicationId: null, // 申请单ID
                //     assigneeUserId: null, // 受理人id
                //     assigneeUserName: null, // 受理人名称
                //     chinayieRatingDate: null, // 国烨评级时间
                //     chinayieRatingRank: null, // 国烨评级结果
                //     createdBy: null, // integer($int64)
                //     createdDate: null, // string($date-time)
                //     id: null, // integer($int64)
                //     keywords: null, // string
                //     remark: null, // 备注
                //     status: null, // 100 已转交服务商 101 已拒绝 状态
                //     updatedBy: null, // integer($int64)
                //     updatedDate: null, // string($date-time)
                //     valid: null, // integer($int32)
                //     version: null // 乐观锁版本，防止并发
                // },
                // 服务商审核
                appProviderModel: null,
                //     {
                //     acceptRemark: null, // 受理备注
                //     acceptTime: null, // 受理时间
                //     applicationId: null, // 申请单ID
                //     assigneeUserId: null, // 受理人
                //     assigneeUserName: null, // 受理人名称
                //     createdBy: null, // integer($int64)
                //     createdDate: null, // string($date-time)
                //     id: null, // integer($int64)
                //     initiateTime: null, // 立项申请发起时间
                //     initiatorUserId: null, // 立项申请发起人ID
                //     initiatorUserName: null, // 立项申请发起人名称
                //     keywords: null,
                //     providerCompanyId: null, // 服务方公司Id
                //     providerCompanyName: null, // 服务方公司名称
                //     providerFileList: [], // 立项文件
                //     providerId: null, //  服务商ID
                //     rejectCause: null, // 立项拒绝原因
                //     remark: null, // 立项备注
                //     sinoyieAccessDate: null, // 中烨准入时间
                //     sinoyieAccessLimit: null, // 中烨准入额度
                //     sinoyieRatingDate: null, // 中烨评级时间
                //     sinoyieRatingRank: null, // 中烨评级结果
                //     status: null, // 200 待受理 201 已受理 210 立项审批中 220 申请驳回 300 单证执行中 400 违约处置 990 完成  状态
                //     updatedBy: null, // integer($int64)
                //     updatedDate: null, // string($date-time)
                //     valid: null,
                //     version: null // 乐观锁版本号，防止并发
                // },
                // 违约和处置
                appDisposalModel: null,
                //     {
                //     applicationDisposalFileList: [], // 处置附件
                //     applicationId: null, // 申请单ID
                //     applyTime: null, // 处置申请发起时间
                //     applyUserId: null, // 处置申请发起人
                //     applyUserName: null, // 处置申请发起人名称
                //     casue: null, // 违约原因
                //     companyId: null, // 公司ID
                //     createdBy: null, // integer($int64)
                //     createdDate: null, // string($date-time)
                //     id: null, // integer($int64)
                //     keywords: null, // string
                //     recordTime: null, // 违约记录时间
                //     recordUserId: null, // 违约记录人
                //     recordUserName: null, // 违约记录人名称
                //     remark: null, // 处置申请备注
                //     result: null, // 处置结果
                //     resultDescription: null, // 处置结果说明
                //     status: null, //  4001 违约无需处置 4002 违约需处置 4003 处置申请中 4004 处置申请拒绝 4005 处置中 4006 处置完成  状态
                //     updatedBy: null, // integer($int64)
                //     updatedDate: null, // string($date-time)
                //     valid: null // integer($int32)
                // },
                'createdBy': null,
                'createdDate': null,
                'id': null,
                'keywords': null,
                // 订单
                purchaseOrderModel: null,
                // 订单
                sellOrderModel: null,
                'updatedBy': null,
                'updatedDate': null,
                'valid': null
            },
            needTransport: ['不需要', '需要'],
            moduleItems: {
                companyInfo: true,
                applicationInfo: true,
                platformAuditInfo: true,
                serviceProviderAuditInfo: true,
                applicationInfoFunds: true,
                documentExecutionInfo: true,
                breachContractDisposal: true
            },
            management: false,
            projectApprovalRecords: false,
            projectApprovalRecordsList: [
                // {
                //     'createdDate': 1003213213215555,
                //     'username': '易车贸易',
                //     'sceneType': 0,
                //     'actionDesc': '执行人员发起付款申请',
                //     'resultCode': 3,
                //     'msg': ''
                // }
            ],
            projectDocument: [],
            earlyWarningList: [],
            dialogVisibleImage: '',
            parameter: {
                'serviceTypeId': '',
                'contactName': '',
                'companyAddress': '',
                'contactPhone': '',
                'productName': '',
                'productId': '',
                'productAmount': '',
                'period': '',
                'productPriceMin': '',
                'productPriceMax': '',
                'providerCompanyId': '',
                'providerCompanyName': '',
                'memo': '',
                'companyName': '',
                'thirdPartyName': '',
                'skuName': '',
                'deliveryWarehouseName': '',
                'shortOverflowRate': '',
                'needTransport': '',
                'companyId': JSON.parse(localStorage.getItem('userInfo')).companyId
            },
            providerFileList: [],
            dialogVisible: false,
            stopUpload: false,
            resultCode: ['未审批', '审批通过', '审批驳回', '已创建'],
            applicationDisposalFileList: [],
            statusName: 'color: #999',
            disabled: false
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            this.getInfo();
        },
        dialogVisibleImg (url) {
            this.dialogVisibleImage = url;
            this.dialogVisible = true;
        },
        // 获取申请单信息
        getInfo () {
            this.$http.get(this.$api.supply.getDetail + this.$route.query.id)
                .then((res) => {
                    if (res.data.code === 0) {
                        switch (res.data.data.scsAppModel.statusName) {
                        case '平台审核':case '服务商审核':case '方案审批中':
                            this.statusName = 'color: #F49A1E';
                            break;
                        case '已拒绝':case '违约和处置':
                            this.statusName = 'color: #D12626';
                            break;
                        case '服务执行':case '已完成':
                            this.statusName = 'color: #24C815';
                            break;
                        default:
                            this.statusName = 'color: #999';
                            break;
                        }
                        this.supply = res.data.data;
                        return;
                    }
                    this.$message.error(res.data.message);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 服务商&&处置审批历史
        serviceProviderHistory (type) {
            let params = {
                'targetId': this.supply.appProviderModel.id,
                'targetType': 60,
                'affiliatedCompanyId': this.supply.appProviderModel.providerCompanyId,
                'subSysType': 1
            };
            if (type === '处置') {
                params = {
                    'targetId': this.$route.query.id,
                    'targetType': 61,
                    'affiliatedCompanyId': this.supply.appDisposalModel.providerCompanyId,
                    'subSysType': 1
                };
            }
            this.$http.post(this.$api.supply.serviceProviderHistory, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.projectApprovalRecordsList = res.data.data;
                        this.projectApprovalRecords = true;
                        return;
                    }
                    this.$message.error(res.data.message);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 查看
        goPage (data, type) {
            let name = type ? 'purchaseDetail' : data.orderStatus > 2 && data.orderStatus !== 5 ? 'sellerSettle' : 'salesDetail';
            const {href} = this.$router.resolve({name: name, query: {orderId: data.id}});
            window.open(href, '_blank');
        },
        onFileUpload1 (file) {
            this.onFileUpload(file, 1);
        },
        onFileUpload (file, type) {
            if (file && file.file.size > 10 * 1024 * 1024) {
                this.$message.error('上传文件不能超过10M');
                return;
            }
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            this.$http.post(this.$api.account.upload2, formData, headers)
                .then(res => {
                    const data = {
                        ...res.data[0],
                        filetype: this.$tools.getFileTypeAlias(res.data[0].filePath)
                    };
                    if (type === 1) {
                        this.applicationDisposalFileList.push(data);
                        return;
                    }
                    this.providerFileList.push(data);
                });
        },
        deleteFileList (idx, type) {
            type === 2 ? this.applicationDisposalFileList.splice(idx, 1) : this.providerFileList.splice(idx, 1);
        },
        setManagement (val) {
            this.management = val;
        }
    },
    components: {view1, view2, serviceProvider, platformAudit, breachContractDisposal, documentExecution, application},
    provide () {
        return {
            dialogVisibleImg: this.dialogVisibleImg,
            onFileUpload: this.onFileUpload,
            deleteFileList: this.deleteFileList,
            serviceProviderHistory: this.serviceProviderHistory,
            enforcement: this.enforcement,
            setManagement: this.setManagement,
            goPage: this.goPage,
            onFileUpload1: this.onFileUpload1,
            init: this.init
        };
    },
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
    .customer-application-form {
        /deep/ .iconfont{
            color: $color-highlight;
        }
        /deep/ .company-info{
            border-bottom: 8px solid #f5f5f5;
        }
        /deep/ .clear {
            &:after {
                display: block;
                content: ' ';
                clear: both;
            }
        }
        /deep/ .pt-6 {
            padding-bottom: 6px;
        }
        /deep/ .title-wrapper {
            padding: 15px 16px 9px 9px;
            cursor: default;
            line-height: 1;
            .gy-h5{
                /*font-family: "PingFangSC-Medium";*/
                font-weight: bold;
            }
            .iconfont {
                margin-right: 8px;
                vertical-align: baseline;
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
        .application-info {
            border-bottom: 8px solid #f5f5f5;
        }
        .application-content {
            /*padding: 0 16px;*/
            &:after {
                display: block;
                content: ' ';
                clear: both;
            }
        }
        /deep/ .company-info-content {
            @extend .application-content;
            @extend .pt-6;
            /deep/ .gy-form-group {
                padding-left: 96px;
                /deep/ .l {
                    width: 86px;
                }
            }
        }
        /deep/ .application-info-content {
            @extend .application-content;
            @extend .pt-6;
            padding-left: 4px;
        }
        /deep/ .module-content {
            @extend .clear;
        }
        /deep/ .application-info-funds {
            border-bottom: 8px solid #f5f5f5;
        }

        /deep/ .platform-audit-info,
        /deep/ .document-execution-info,
        /deep/ .service-provider-audit-info {
            padding: 0 20px;
            border-bottom: 1px solid #f5f5f5;
        }

        /deep/ .platform-audit-info-content {
            @extend .clear;
            @extend .pt-6;
            /deep/ .gy-link {
                padding-left: 15px;
            }
        }
        /deep/ .service-provider-audit-info {
            /deep/ .icon-service-provider {
                font-size: 17px;
            }
        }
        /deep/ .service-provider-audit-info-content {
            @extend .clear;
            @extend .pt-6;
        }
        /deep/ .application-info-funds-content {
            @extend .clear;
            @extend .pt-6;
            /deep/ .gy-link {
                padding-left: 15px;
            }
        }
        /deep/ .document-execution-info-content {
            @extend .pt-6;
        }
    }

    /deep/ .spqk{
        /deep/ .el-dialog__body {
            padding-top: 16px;
        }
    }

    /deep/ .gy-form-group{
        font-family: "PingFangSC-Regular";
        min-height: 36px;
        line-height: 20px;
        /deep/ .l {
            width: 114px;
            color: #000;
        }
    }

    /deep/ .reject-apply-reason {
        position: relative;
        span {
            position: absolute;
            top: auto;
            left: auto;
            right: 3px;
            bottom: 0;
            color: $color-main;
        }
    }

    /deep/ .unit-wrapper {
        display: flex;
        div{
            flex: 1;
        }
        span{
            flex: 0 0 40px;
            text-align: right;
        }
    }

    /deep/ .management-content{
        /deep/ .gy-form-group{
            /deep/ .el-radio__label, /deep/ .el-radio{
                color: $color-main!important;
            }
        }
    }

    /deep/ .step-icon {
        flex: 0 0 20px;
        margin-right: 20px;
        border-right: 2px dotted $color-border;
        position: relative;
        & > div {
            width: 15px;
            height: 15px;
            position: absolute;
            left: 12px;
            top: 0;
            border: 3px solid rgba(74, 144, 226, .3);
            border-radius: 50%;
            div {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: #4a90e2;
            }
        }
    }

    /deep/ .version {
        line-height: 1.2;
        padding-bottom: 20px;
        margin-top: -2px;
    }

    /deep/ .platformAudit-wrapper {
        /deep/ .platformAudit-item {
            display: flex;
            &:last-child {
                .step-icon {
                    border-right-width: 0;
                }
            }
            /deep/ .time {
                flex: 0 0 120px;
                @extend .version;
            }
            /deep/ .text {
                flex: 1;
                @extend .version;
            }
        }
    }

    /deep/ .earlyWarning-wrapper {
        /deep/ .earlyWarning-item {
            display: flex;
            /deep/ .step-icon {
                & > div {
                    border: 3px solid rgba($color-highlight, .3);
                    div {
                        background: $color-highlight;
                    }
                }
            }
            &:last-child {
                .step-icon {
                    border-right-width: 0;
                }
            }
            /deep/ .version {
                line-height: 1.2;
                padding-bottom: 20px;
                margin-top: -2px;
            }
            /deep/ .earlyWarning-content {
                flex: 1;
                .content-title {
                    display: flex;
                    .time {
                        flex: 0 0 200px;
                        text-align: right;
                    }
                    .text {
                        flex: 1;
                    }
                }
            }
        }
    }

    /deep/ .commodity {
        display: flex;
        .commodity-img {
            flex: 0 0 56px;
            width: 56px;
            padding-top: 6px;
            img{
                border: 1px solid $color-border;
                width: 56px;
            }
        }
        .commodity-content {
            flex: 1;
            padding-left: 10px;
        }
    }

    /deep/ .gy-btn-group {
        padding: 15px 0;
        text-align: right;
        clear: both;
        .gy-button-extra {
            margin-right: 10px;
        }
    }

    /deep/ .color-height{
        color: $color-highlight;
    }

    /deep/ .gy-link {
        color: $color-extra;
    }

    /deep/ .el-icon-arrow-down {
        transition: all 0.3s;
    }

    /deep/ .el-rotate {
        transform: rotate(180deg);
    }

    /deep/ .slide-fade-enter-active {
        transition: all .3s ease;
    }

    /deep/ .slide-fade-leave-active {
        transition: all .2s ease;
    }

    /deep/ .slide-fade-enter, /deep/ .slide-fade-leave-to {
        transform: translateY(-10px);
        opacity: 0;
    }

    /depp/ .up-load-file{
        /*display: flex;*/
        &:after{
            display: block;
            content: ' ';
            clear: both;
        }
        /deep/ .file-list{
            float: left;
            /*flex: 1;*/
        }
        /deep/ .upload-btn{
            float: left;
            /*flex: 0 0 60px;*/
        }
    }
</style>
<style lang="scss">
    .management-dialog {
        .el-dialog__body {
            padding: 0!important;
        }
    }
</style>
