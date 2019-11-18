<template>
<div style="padding-bottom: 30px" class="workbench-personal">
    <div class="workbench-row">
        <div class="workbench-item digital-statistics">
            <customer-data :gyItem="gyItem"></customer-data>
        </div>
        <div class="workbench-item digital-statistics">
            <div class="item-title">
                <span class="title">快捷方式</span>
            </div>
            <div class="item-content">
                <div class="shortcut">
                    <div>
                        <span class="gy-button-normal" @click="$router.push( 'add')"><i class="iconfont icon-add-customers"></i>
                            新增客户</span>
                        <!-- <span class="gy-button-normal" @click="$router.push( 'addLurking')"><i class="iconfont icon-new-customers"></i>
                            新增潜在客户</span> -->
                        <span class="gy-button-normal" @click="$router.push( 'customertrack')"><i class="iconfont icon-new-contacts"></i>
                            客户跟进</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="workbench-row">
        <div class="workbench-item digital-statistics">
            <div class="item-title">
                <span class="title">客户列表</span>
                <span class="isMore" @click="$router.push({name: 'list'})">更多</span>
            </div>
            <div class="item-content">
                <div class="customer-wrapper" v-if="customerList && customerList.length === 0">
                    <div style="text-align: center;line-height: 115px;">暂无数据</div>
                </div>
                <div class="customer-wrapper" v-else>
                    <div class="customer-item customer-item1" @click="goDetail(index)" v-for="(item, index) in customerList" :key="index">
                        <div class="customer-item-text">{{item.customerName}}</div>
                        <div class="customer-item-date">{{item.createdDate | date}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="workbench-item digital-statistics">
            <div class="item-title">
                <span class="title">跟进列表</span>
                <span class="isMore" @click="$router.push({name: 'customertrack'})">更多</span>
            </div>
            <div class="item-content">
                <div class="customer-wrapper" v-if="followUpReminder && followUpReminder.length === 0">
                    <div style="text-align: center;line-height: 115px;">暂无数据</div>
                </div>
                <div class="customer-wrapper" v-else>
                    <div class="customer-item customer-follow" v-for="(item, index) in followUpReminder" :key="index" @click="CustomerFollowUp(item)">
                        <div class="customer-item-text1">{{item.customerName}}</div>
                        <div class="customer-item-type">{{item.trackStatusDictName}}</div>
                        <div class="customer-item-date">{{item.createdDate | date}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="workbench-row">
        <div class="workbench-item digital-statistics">
            <div class="item-title">
                <span class="title">消息盒子</span>
                <span class="isMore" @click="$router.push({name: 'msgbox'})">更多</span>
            </div>
            <div class="item-content">
                <div class="customer-wrapper" v-if="msgList && msgList.length === 0">
                    <div style="text-align: center;line-height: 115px;">暂无数据</div>
                </div>
                <div class="customer-wrapper" v-else>
                    <div class="customer-item" v-for="(item, index) in msgList" :key="index">
                        <div class="customer-item-text">{{item.content}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="workbench-item digital-statistics" style="visibility: hidden">
        </div>
    </div>
     <el-dialog width="50%" title="详情" class="gy-dialog-title"
            :visible.sync="dialogVisible">
            <div>
                <div class="gy-form-group">
                    <span class="l">客户名称</span>
                    <span>{{addForm.customerName ||'-'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">跟进状态</span>
                    <span>{{addForm.trackStatusDictName ||'-'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">联系人</span>
                    <span>{{addForm.contactUserName ||'-'}}</span>
                </div>
                <!-- <div class="gy-form-group">
                    <span class="l">提醒时间</span>
                    <span v-if="addForm.trackDate !== null">{{addForm.trackDate | date()}}</span>
                    <span v-else>-</span>
                </div> -->
                <div class="gy-form-group record">
                    <span class="l">跟进记录</span>
                    <textarea class="gy-textarea" :disabled="true" cols="30" rows="10" placeholder="请填写" v-model="addForm.content"></textarea>
                </div>
                <div style="clear:both"></div>
                <div class="operation">
                    <button class="gy-button-normal" @click="dialogVisible = false">关闭</button>
                </div>
            </div>
    </el-dialog>
</div>
</template>

<script>
import customerData from './../data-management/customer-data.vue';
export default {
    data () {
        return {
            gyItem: {
                title: '客户数据',
                active: '本月',
                titleType: 'router',
                isBig: '',
                resetData: 1,
                routerData: {
                    link: 'echarts',
                    text: '更多'
                }
            },
            customerList: [
                // {
                //     customerName: '',
                //     createdDate: ''
                // }
            ],
            followUpReminder: [
                // {
                //     customerName: '',
                //     trackStatusDictName: '',
                //     trackDate: ''
                // }
            ],
            search: {
                data: {
                    customerId: null,
                    customerName: null,
                    followUserId: null,
                    companyType: null,
                    dataCategory: '2',
                    products: null,
                    customerScale: null,
                    customerStatus: null
                },
                keywords: '',
                pageNum: 1,
                pageSize: 5
            },
            statistics: {
                // total: null, // 公司总客户数
                // newAdded: null, // 公司月新增客户数
                // myTotal: null, // 我的客户数
                // myNewAdded: null // 我的月新增客户数
            },
            msgList: [
                // {
                //     Id: null, // 消息Id
                //     usrCompanyId: null, // 公司Id
                //     sendUserId: null, // 发送用户Id
                //     receiveUserId: null, // 接收用户Id
                //     readStatus: null, // 读取状态0未读取1已读取
                //     content: null, // 消息内容
                //     createdDate: null, // 消息发送日期
                //     bizType: null, // 业务类型
                //     bizTypeName: null, // 业务类型名称
                //     bizId: null // 业务对象Id
                // }
            ],
            dialogVisible: false,
            startDateOptions: {},
            addForm: {
                contactUserId: '',
                content: '',
                customerId: '',
                trackDate: '',
                trackStatusDictId: '',
                customerName: '',
                contactUserName: '',
                contactUserMobile: ''
            },
            tradeModeOptionStatus: []
        };
    },
    created () {
    },
    mounted () {
        this.init();
    },
    methods: {
        init () {
            this.getCustomerList();
            this.getCollectionList();
            this.getMsgList();
            this.getControllerStatus();
        },
        goDetail (idx) {
            this.$router.push({
                name: 'detail',
                query: {
                    viewType: 1,
                    id: this.customerList[idx].id
                }
            });
        },
        // 跟进列表
        // 显示弹框
        CustomerFollowUp (item) {
            // console.log(item, '111');
            this.dialogVisible = true;
            this.addForm = item;
            console.log(this.addForm);
        },
        // 验证
        checkDialogData () {
            let flag = true;
            let data = [
                {value: this.addForm.customerId, msg: '客户名称不能为空'},
                {value: this.addForm.trackStatusDictId, msg: '跟进状态不能为空'},
                {value: this.addForm.contactUserId, msg: '联系人不能为空'},
                // {value: this.addForm.trackDate, msg: '时间不能为空'},
                {value: this.addForm.content, msg: '跟进记录不能为空'}
            ];
            for (let i = 0; i < data.length; i++) {
                if (!data[i].value && data[i].value !== 0) {
                    this.$message({message: data[i].msg, type: 'error'});
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        // 获得跟进状态
        getControllerStatus () {
            const me = this;
            me.$http.get(me.$api.customer.dictionaryController + 'track_status')
                .then(function (response) {
                    if (response.data.code === 0) {
                        me.tradeModeOptionStatus = response.data.data;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        getCustomerList () {
            this.$http.post(this.$api.workbench.recommendlist, this.search)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.customerList = res.data.data.list;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        getCollectionList () {
            let params = {
                data: {
                    customerId: '', // 公司名称
                    customerManagerId: '', // 客户经理id
                    customerName: '', // 客户名称
                    startDate: '', // 开始时间
                    endDate: '', // 结束时间
                    trackStatusDictId: '' // 跟进状态id
                },
                pageNum: 1,
                pageSize: 5,
                keywords: ''
            };
            this.$http.post(this.$api.customer.customersearch, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.followUpReminder = res.data.data.list;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getMsgList () {
            this.$http.post(this.$api.msg.getListWorkbench)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.msgList = res.data.data;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    },
    components: {customerData}
};
</script>

<style lang="scss">
    .workbench-personal{
        .gy-dialog-title .el-dialog__header {
            border-bottom: 1px solid #DCE0E4!important;
            padding: 15px!important;
        }
        .el-dialog__body {
            // padding: 0;
            padding: 10px 0px 0px 15px;
        }
        .record{
            width: 100%;
        }
        .operation{
            text-align: right;
            margin-top: 22px;
            padding-bottom: 32px;
            padding-right: 32px;
        }
        .is-required::before {
            content: "*";
            color: #e0370f;
            font-size: 12px;
            font-weight: 400;
            position: absolute;
            margin-left: 6px;
            left: 0px;
            top: 0;
        }
    }
</style>
<style lang="scss" scoped>
.page-title {
    height: 35px;
    line-height: 35px;
    padding-left: 15px;
    margin-bottom: 5px;
    border-bottom: 1px solid $color-border;
    span{
        font-size: 16px;
        font-weight: bold;
        color: #333;
    }
    div {
        float: right;
    }
}
.workbench-row {
    display: flex;
    padding: 10px 15px 0 15px;
    .workbench-item {
        flex: 1;
        max-width: calc(50% - 10px);
        display: flex;
        flex-direction: column;
        margin-right: 10px;
        border: 1px solid $color-border;
        .item-title {
            flex: 0 0 40px;
            line-height: 40px;
            padding-left: 15px;
            border-bottom: 1px solid $color-border;
            position: relative;
            display: flex;
            .title {
                flex: 1;
                font-size: 16px;
                color: $color-title;
                font-weight: bold;
            }
            .item-header-item {
                flex: 1;
                line-height: 34px;
                .title {
                    padding-left: 20px;
                    font-size: 18px;
                    font-weight: 600;
                }
                ul {
                    display: flex;
                    justify-content: flex-end;
                    li {
                        flex: 0 0 30px;
                        text-align: center;
                        margin: 0 8px;
                        cursor: default;
                    }
                    .active {
                        color: $color-a-active;
                        border-bottom: 2px solid $color-a-active;
                    }
                }
            }
            .isMore {
                position: absolute;
                right: 15px;
                top: 0;
                line-height: 39px;
                font-size: 14px;
                font-weight: 100;
                cursor: pointer;
                &:hover {
                    color: $color-a-active;
                }
            }
            .item-num {
                color: $color-main;
                padding-right: 20px;
                span {
                    color: $color-highlight;
                }
            }
        }
        .item-content {
            flex: 1;
            min-height: 164px;
            .number {
                display: flex;
                flex-direction: column;
                min-height: 150px;
                font-size: 24px;
                font-weight: 600;
                text-align: center;
                color: $color-a-active;
                .space {
                    flex: 1;
                }
                .text-num{
                    flex: 0 0 35px;
                }
            }
            .customer-wrapper {
                padding: 8px 0;
                min-height: 115px;
                .customer-item {
                    display: flex;
                    line-height: 1;
                    padding: 8px 15px;
                    .customer-item-text {
                        flex: 1;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .customer-item-text1 {
                        flex: 2;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .customer-item-type {
                        flex: 1;
                        text-align: center;
                    }
                    .customer-item-date {
                        flex: 1;
                        text-align: right;
                    }
                }
                .customer-item1 {
                    cursor: pointer;
                    &:hover {
                        background: $color-body-bg;
                        .customer-item-text {
                            color: $color-a-active;
                        }
                    }
                }
                .customer-follow{
                    cursor:pointer;
                    &:hover {
                        background: $color-body-bg;
                        .customer-item-text1 {
                            color: $color-a-active;
                        }
                    }
                }
            }
            .shortcut {
                height: 145px;
                padding: 10px;
                text-align: left;
                /*display: flex;*/
                /*flex-direction: column;*/
                /*justify-content: center;*/
                /*div {*/
                    /*flex: 0 0 32px;*/
                /*}*/
                .gy-button-normal {
                    margin-right: 10px;
                }
                .gy-button-normal {
                    padding: 4px 16px;
                    .icon-font-size {
                        font-size: 24px;
                    }
                    .icon-add-customers {
                        @extend .icon-font-size
                    }
                    .icon-new-customers {
                        @extend .icon-font-size
                    }
                    .icon-new-contacts {
                        @extend .icon-font-size
                    }
                }
            }
            .myChart5 {
                margin: 0 auto;
                width: 480px;
                .company-level {
                    display: flex;
                    width: 100%;
                    .company-name {
                        flex: 1;
                        text-align: center;
                    }
                }
            }
            .total-statistics {
                display: flex;
                justify-content: center;
                .statistics-item {
                    flex: 0 0 120px;
                    display: flex;
                    .text {
                        flex: 1;
                    }
                    .value {
                        flex: 1;
                    }
                }
            }
            .company-trading-volume {
                display: flex;
                padding: 5px 10px;
                .company-name {
                    flex: 0 0 115px;
                    display: flex;
                    flex-direction: column;
                    .name-item {
                        flex: 1;
                        padding-top: 12px;
                        line-height: 1.2;
                    }
                }
                .company-chart {
                    flex: 0 0 350px;
                }

                .statistical-unit {
                    flex: 0 0 80px;
                    text-align: center;
                }
            }
        }
    }
    /deep/ .charts-item {
        flex: 1;
        min-height: 260px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .item-header {
            flex: 0 0 40px;
            border-bottom: 1px solid $color-border;
            display: flex;
            .item-header-item {
                flex: 1;
                line-height: 40px;
                .title {
                    padding-left: 15px;
                    font-size: 16px;
                    font-weight: bold;
                    color: $color-title;
                }
                ul {
                    display: flex;
                    justify-content: flex-end;
                    li {
                        flex: 0 0 30px;
                        line-height: 39px;
                        text-align: center;
                        margin: 0 8px;
                        cursor: default;
                    }
                    .active {
                        color: $color-a-active;
                        border-bottom: 2px solid $color-a-active;
                    }
                }
            }
        }
        .item-content {
            flex: 1;
            .number {
                display: flex;
                flex-direction: column;
                height: 100%;
                font-size: 24px;
                font-weight: 600;
                text-align: center;
                color: $color-a-active;
                .space {
                    flex: 1;
                }
                .text-num {
                    flex: 0 0 35px;
                }
            }
        }
    }
}
</style>
