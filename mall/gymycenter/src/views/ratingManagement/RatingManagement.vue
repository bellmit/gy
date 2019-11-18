<!--评级管理列表-->
<template>
    <div>
        <div class="new-title-public">我的评级
            <el-tooltip content="对自己所在公司评级" popper-class="rating-tooltip" placement="bottom" effect="light">
                <i class="el-icon-info" style="color:#ccc;cursor:pointer"></i>
            </el-tooltip>
        </div>
        <div class="customer-list rating">
        <!-- <div class="point-out">温馨提示：对自己所在公司评级</div> -->
        <div class="select">
            <ul>
                <li :class="{ active: newIndex==1 }" @click="toggleTabs(1)" class="gy-h4">评级信息</li>
                <li :class="{ active: newIndex==0 }" @click="toggleTabs(0)" class="gy-h4">交易信息</li>
            </ul>
            <button class="gy-button-extra rating-button" v-if="isGo===true&&(Info.isExpired === '评级已过期' || Info.isExpired === null)" @click="goApplay(false)">申请评级</button>
            <button class="gy-button-extra rating-button" v-if="Info.ratingStatus ===1&&isGo&&Info.isExpired !== '评级已过期'" @click="goApplay(true)">申请复议</button>
        </div>
        <div v-if="newIndex==0">
            <div class="rating-box">
                <div class="gy-h5 my-title"><i class="el-icon-tickets"></i> 当前交易信息</div>
                <div class="gy-form-group  plus-width">
                    <span class="l">采购订单交易次数</span>
                    <span>{{dialogInfo.data.purchaseOrderCount||'--'}}</span>
                </div>
                <div class="gy-form-group  plus-width">
                    <span class="l">采购订单交易总金额</span>
                    <span v-if="dialogInfo.data.purchaseOrderAmountSum">{{dialogInfo.data.purchaseOrderAmountSum | numToCash(4)}}万元</span>
                    <span v-else>-</span>
                </div>
                <div class="gy-form-group  plus-width">
                    <span class="l">销售订单交易次数</span>
                    <span>{{dialogInfo.data.salesOrderCount||'--'}}</span>
                </div>
                <div class="gy-form-group  plus-width">
                    <span class="l">销售订单交易总金额</span>
                    <span v-if="dialogInfo.data.salesOrderAmountSum">{{dialogInfo.data.salesOrderAmountSum | numToCash(4)}}万元</span>
                    <span v-else>-</span>
                </div>
                <div class="gy-form-group plus-width">
                    <span class="l" >最后一次交易日期</span>
                    <span >{{dialogInfo.data.latestTransactionDate|date}}</span>
                </div>
                <div class="gy-form-group plus-width">
                    <span class="l">交易商品</span>
                    <span>{{dialogInfo.data.productNames.join(",")||'--'}}</span>
                </div>
            </div>
        </div>
        <div v-else-if="newIndex==1" class="rating-now">
            <div class="rating-box current-rating">
                <div class="gy-h5 my-title current-ratings"><i class="el-icon-tickets"></i> 当前评级</div>
                <template v-if="Info.companyId">
                    <div  class="gy-form-group">
                        <span class="l">评级</span>
                        <span><strong>{{Info.rank}}</strong><span>{{Info.isExpired === '评级已过期'? '(已过期)' : ''}}</span></span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">初评日期</span>
                        <span>{{Info.initialRatingTime|date}}</span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">最新评级日期</span>
                        <span>{{Info.latestRatingTime|date}}</span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">评级描述</span>
                        <span>{{Info.remarks}}</span>
                    </div>
                </template>
                <div v-else class="text-center">
                    暂无评级信息
                </div>
            </div>
            <div class="rating-box">
                <div class="gy-h5 my-title"><i class="el-icon-tickets"></i> 历史评级</div>
                <table class="gy-table">
                    <thead>
                    <tr class="top">
                        <th>评级</th>
                        <th>评级日期</th>
                        <th>申报公司</th>
                        <th>类型</th>
                        <th width="100">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-if="historyInfo && historyInfo.length === 0"><td colspan="5" class="align-c">暂无数据</td></tr>
                    <tr v-else v-for="(item , index) in historyInfo" :key=index >
                        <td>{{item.rank || '--' }}</td>
                        <td>{{item.ratingDate |date}}</td>
                        <td>
                            <template v-if="item.declareCompanyName == item.ratingCompanyName">
                                自评
                            </template>
                            <template v-else>
                                {{item.declareCompanyName }}
                            </template>
                        </td>
                        <td>{{type[item.isReevaluationRequest]}}</td>
                        <td class="align-c">
                            <template v-if="item.declareCompanyName == item.ratingCompanyName">
                                <button class="gy-button-view" v-if="item.status == 0" @click="goApplay(0, item ,1)">修改资料</button>
                                <button class="gy-button-view" v-if="item.status == 1" @click="goView(item)" >查看资料</button>
                            </template>
                            <span v-else>-</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="total">共 {{totalHistory}} 条记录</div>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChangeHistory"
                    :current-page="pageNumHistory"
                    :total=totalHistory>
                </el-pagination>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    name: 'customer-list',
    data () {
        return {
            keywords: '',
            pageNum: 1,
            pageNumHistory: 1,
            totalHistory: 0,
            dialogVisible: false,
            history: false,
            value: '',
            Info: {},
            isEdit: false,
            total: 50,
            historyInfo: [],
            parameter: {
                pageNum: 1,
                declareCompanyId: JSON.parse(localStorage.getItem('userInfo')).companyId
            },
            preInfo: {},
            list: [],
            type: ['初评', '复议'],
            ratingStatus: ['未评级', '已评级'],
            dialogInfo: {
                title: '评级信息',
                currentIndex: 1,
                data: ''
            },
            isGo: false
        };
    },
    computed: mapGetters([
        'newIndex'
    ]),
    created () {
        this.checkCompany();
        this.getIndex();
        this.getInfo();
        this.getMyInfo();
        this.getOrderTransactionInfo(JSON.parse(localStorage.getItem('userInfo')).companyId);
    },
    methods: {
        getIndex () {
            if (this.$route.query.flag) {
                this.$store.commit('setNewIndex', 1);
            }
        },
        handleCurrentChange (val) { // 分页
            this.pageNum = val;
            this.parameter.pageNum = this.pageNum;
            this.getInfo();
        },
        handleCurrentChangeHistory (val) { // 分页
            this.pageNumHistory = val;
            this.pageSize = 10;
            this.historyRating();
        },
        checkCompany () {
            this.$http
                .post(
                    this.$api.ratingApplication.rangResult,
                    {companyId: this.parameter.declareCompanyId}
                )
                .then(res => {
                    if (res.data.code === 0) {
                        console.log(res.data.data, 'ragnk');
                        if (res.data.data.data === false) {
                            this.isGo = true;
                        }
                    }
                });
        },
        getInfo () { // 我申请的公司评级列表
            this.$http.post(this.$api.customer.ratingManagement, this.parameter).then((res) => {
                if (res.data.code === 0) {
                    this.list = res.data.data.list;
                    this.total = res.data.data.total;
                    this.pageNum = res.data.data.pageNum;
                    this.getMyInfo();
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        goView (item) { // 查看我申请的公司详情
            this.$router.push({name: 'ratingView', query: {ratingCompanyId: item.taskId}, params: {title: '评级材料信息'}});
        },
        historyRating () {
            this.$http.post(this.$api.customer.historyRating, {
                pageNum: this.pageNumHistory,
                pageSize: 10
            }).then((res) => {
                if (res.data.code === 0) {
                    this.historyInfo = res.data.data.data.list;
                    this.totalHistory = res.data.data.data.total;
                    // this.pageNumHistory = res.data.data.pageNum;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        getMyInfo () { // 我的评级详情
            this.$http.get(this.$api.customer.myRatingInfo + this.parameter.declareCompanyId).then((res) => {
                if (res.data.code === 0) {
                    this.Info = res.data.data.data;
                    console.log(this.Info, '我的评级详情');
                    console.log(this.isGo);
                    this.historyRating();
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        getOrderTransactionInfo (id) { //  我的交易详情
            this.$http.get(this.$api.customer.orderTransactionInfo + id).then((res) => {
                if (res.data.code === 0) {
                    this.dialogInfo.data = res.data.data.data;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        toggleTabs (index) {
            this.$store.commit('setNewIndex', index);
            if (index === 1) {
                this.getMyInfo();
            }
        },
        goApplay (isReApplay, par, change, applyType) {
            let ratingCompanyId;
            let title = '申请评级';
            if (isReApplay) {
                ratingCompanyId = this.Info.taskId;
                title = '申请复议';
            }
            if (par) {
                ratingCompanyId = par.taskId;
            }
            if (!applyType) {
                applyType = 0;
            }
            if (change) {
                this.$router.push({name: 'ratingForm', query: {applyType, ratingCompanyId, change: 1, title}, params: {title}});
                return false;
            }
            this.$router.push({name: 'ratingForm', query: {applyType, ratingCompanyId, title}, params: {title}});
        }
    }
};
</script>
<style scoped lang="scss">
    .customer-list {
        padding: 0 16px;
        background-color: #fff;
        strong {
            color: #E0370F
        }
        .cursor {
            color: #4a90e2;
            cursor: pointer
        }
        .cursor:hover {
            text-decoration: underline
        }
        .text-center {
            text-align: center;
            padding-bottom: 10px;
        }
        .rating-box {
            overflow: hidden;
            margin-bottom: 13px;
            .gy-h5 {
                padding-bottom: 19px
            }
            .current-ratings{
                padding-bottom: 6px;
            }
            .current-rating{
                .gy-form-group{
                    padding-left: 125px;
                }
            }
        }
        .point-out {
            margin-bottom: 20px;
            color: #333;
            font-size: 14px;
        }
        .rating-button{
            position: absolute;
            right: 0;
            top: 7px;
        }
        .select {
            position: relative;
            margin-top: 17px;
            padding-bottom: 25px;
            overflow: hidden;
            ul li {
                float: left;
                padding: 0 6px;
                cursor: default;
                &.active {
                    color: $color-a-active;
                    border-bottom: 2px solid $color-a-active
                }
            }
            ul li:not(:first-child) {
                position: relative;
                margin-left: 20px;
            }
        }
        .gy-form-group {
            min-height: 20px;
            line-height: 20px;
            .l{
                padding-left: 19px;
            }
        }
        .search-box {
            float: right;
            display: inline-block;
            width: 268px;
            border-bottom: 1px solid $color-border;
            input {
                width: 208px;
                height: 30px;
                color: $color-light;
                border: none;
                float: left;
            }
            button {
                display: inline-block;
                width: 60px;
                color: $color-main;
                border: none;
                background-color: #fff;
                text-align: right;
            }
        }
        .dialog-tab {
            width: 100%;
            height: 40px;
            div {
                float: left;
                padding: 0 6px;
                &.active {
                    color: $color-a-active;
                    border-bottom: 1px solid $color-a-active
                }
                &:nth-child(2) {
                    margin-left: 20px;
                }
            }
        }
        .plus-width {
            padding-left: 166px;
            .l {
                width: 156px;
            }
        }
        .rating-now {
            .gy-form-group {
                padding-left: 124px;
                .l {
                    width: 114px;
                }
            }
        }
    }

    .my-title {
        font-size: 14px;
        font-weight: 700;
        color: #333;
    }

    .total {
        margin: 20px 0;
        font-size: 12px;
        color: #666;
    }
</style>
<style lang="scss">
    .el-dialog__body {
        padding-top: 0
    }

    .rating-tooltip {
        background-color: #eee !important;
        .popper__arrow {
            border-color: #fff !important;
            border-bottom-color: #eee !important;
            &:after {
                border-bottom-color: #eee !important;
            }
        }
    }
</style>
