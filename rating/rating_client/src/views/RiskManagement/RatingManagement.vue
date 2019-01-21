<!--评级管理列表-->
<template>
    <div class="customer-list rating">
        <div class="select">
            <ul>
                <li :class="{ active: newIndex==1 }" @click="toggleTabs(1)" class="gy-h4">我的评级</li>
                <li :class="{ active: newIndex==0 }" @click="toggleTabs(0)" class="gy-h4">他方评级</li>
            </ul>
            <button class="gy-button-extra fr" v-if="newIndex==0" @click="reApplay">申请评级</button>
            <template v-if="newIndex==1">
                <button class="gy-button-extra fr" v-if="Info.ratingStatus ===0" @click="goApplay(false)">申请评级</button>
                <button class="gy-button-extra fr" v-if="Info.ratingStatus ===1" @click="goApplay(true)">申请复议</button>
            </template>
        </div>
        <div v-if="newIndex==0">
            <table class="gy-table">
                <thead>
                <tr>
                    <th>公司名称</th>
                    <th>评级结果</th>
                    <th>最新评级时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item , index) in list" :key="index">
                              <td><span>{{item.companyName}}</span></td>
                    <td>{{item.rank? item.rank:'-'}}</td>
                    <td>{{item.latestRatingTime|date}}</td>
                    <td>
                        <button class="gy-button-view" @click="goViews(item)" v-if="item.ratingStatus">查看评级</button>
                        <button class="gy-button-view" v-if="item.status == 1" @click="goView(item)">查看资料</button>
                        <button class="gy-button-view" v-if="item.status == 0" @click="goApplay(0, item, 0, 1)">修改资料</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :total=total>
            </el-pagination>
        </div>
        <div v-else-if="newIndex==1">
            <div class="rating-box">
                 <div class="gy-h5"><i class="el-icon-tickets"></i> 当前评级</div>
                <template v-if="Info.companyId">
                <div  class="gy-form-group single-row">
                    <span class="l">评级</span>
                    <span><strong>{{Info.rank}}</strong></span>
                </div>
                <div class="gy-form-group">
                    <span class="l">初评日期</span>
                    <span>{{Info.initialRatingTime|date}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">最新评级日期</span>
                    <span>{{Info.latestRatingTime|date}}</span>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l">评级描述</span>
                    <span>{{Info.remarks}}</span>
                </div>
               </template>
                <div v-else class="text-center">
                    暂无评级信息
                </div>
            </div>
            <div class="rating-box">
            <div class="gy-h5"><i class="el-icon-tickets"></i> 历史评级</div>
            <!--<template v-if="historyInfo.length">-->
            <table class="gy-table">
                <thead>
                <tr class="top">
                    <th>评级</th>
                    <th>评级时间</th>
                    <th>申报公司</th>
                    <!--<th>被申请报公司</th>-->
                    <th>类型</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item , index) in historyInfo" :key=index >
                    <td>{{item.rank || '-' }}</td>
                    <td>{{item.ratingDate |date}}</td>
                    <td>
                        <template v-if="item.declareCompanyName == item.ratingCompanyName">
                            自评
                        </template>
                        <template v-else>
                            {{item.declareCompanyName }}
                        </template>
                       </td>
                    <!--<td>{{item.ratingCompanyName }}</td>-->
                    <td>{{type[item.isReevaluationRequest]}}</td>
                    <td>
                        <template v-if="item.declareCompanyName == item.ratingCompanyName">
                            <button class="gy-button-view" v-if="item.status == 0" @click="goApplay(0, item ,1)">修改资料</button>
                            <button class="gy-button-view" v-if="item.status == 1" @click="goView(item)" >查看资料</button>
                        </template>
                        <span v-else>-</span>
                    </td>
                </tr>
                </tbody>
            </table>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  @current-change="handleCurrentChangeHistory"
                  :current-page="pageNumHistory"
                  :total=totalHistory>
                </el-pagination>
            <!--</template>-->
                <!--<div v-else class="text-center">-->
                    <!--暂无评级信息-->
                <!--</div>-->
        </div>
        </div>
        <el-dialog width="900px"
                   :visible.sync="dialogVisible" title="评级信息">
            <div style="overflow: hidden">
                <div class="gy-form-group">
                    <span class="l">公司名称</span>
                    <span>{{preInfo.companyName}}</span>
                </div>

                <div class="gy-form-group">
                    <span class="l">评级</span>
                    <span>{{preInfo.rank}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">最新评级日期</span>
                    <span>{{preInfo.latestRatingTime|date}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">初评日期</span>
                    <span>{{preInfo.initialRatingTime|date}}</span>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l">评级描述</span>
                    <span>{{preInfo.remarks}}</span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    name: 'customer-list',
    data () {
        return {
            // newIndex: 1,
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
                declareCompanyId: JSON.parse(localStorage.getItem('userInfoClient')).companyId
                // declareCompanyId: 202
            },
            preInfo: {},
            list: [],
            type: ['初评', '复议'],
            ratingStatus: ['未评级', '已评级']
        };
    },
    computed: mapGetters([
        'newIndex'
    ]),
    created () {
        this.getIndex();
        this.getInfo();
        this.getMyInfo();
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
        goViews (item) {
            this.$http.get(this.$api.customer.myRating + item.companyId).then((res) => {
                if (res.data.code === 0) {
                    this.dialogVisible = true;
                    this.preInfo = res.data.data;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        historyRating () {
            this.$http.post(this.$api.customer.historyRating, {
                pageNum: this.pageNumHistory,
                pageSize: 10
            }).then((res) => {
                if (res.data.code === 0) {
                    this.historyInfo = res.data.data.list;
                    this.totalHistory = res.data.data.total;
                    this.pageNumHistory = res.data.data.pageNum;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        getMyInfo () { // 我的评级详情
            this.$http.get(this.$api.customer.myRatingInfo + this.parameter.declareCompanyId).then((res) => {
                if (res.data.code === 0) {
                    this.Info = res.data.data;
                    this.historyRating();
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        toggleTabs (index) {
            this.$store.commit('setNewIndex', index);
            // this.newIndex = index;
            if (index === 1) {
                this.getMyInfo();
            }
        },
        goApplay (isReApplay, par, change, applyType) {
            let ratingCompanyId;
            let title;
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
                this.$router.push({name: 'ratingForm', query: {applyType, ratingCompanyId, change: 1}, params: {title}});
                return false;
            }
            this.$router.push({name: 'ratingForm', query: {applyType, ratingCompanyId}, params: {title}});
        },
        reApplay () {
            console.log(22);
            this.$router.push({name: 'ratingForm', query: {applyType: 1}});
        }
    }
};
</script>
<style scoped lang="scss">
    .customer-list{
        padding:20px 20px;
        background-color: #fff;
        strong{color:#E0370F}
        .cursor{color:#4a90e2;cursor:pointer}
        .cursor:hover{text-decoration: underline}
        .text-center{text-align: center;padding-bottom:10px;}
        .rating-box{
            overflow: hidden;
            margin-bottom:20px;
            .gy-h5{padding-bottom:10px}
        }
        .select{
            margin-bottom:20px;overflow: hidden;
            ul li {
                float: left;
                padding: 0 6px;
                &.active {
                    color: $color-a-active;
                    border-bottom: 1px solid $color-a-active
                }
            }
            ul li:not(:first-child) {
                position: relative;
                margin-left: 20px;
            }
        }
        .gy-form-group {
            padding-top:0 ;
            min-height:30px;
            .l{top:0;left:2px}
        }
        .search-box {
            float:right;
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
    }
</style>
<style>
    .el-dialog__body{padding-top:0}
</style>
