<template>
    <div class="">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">积分明细</span>
            </div>
            <div class="vip">
                <span class="title1">我的企业等级 </span><img :src="Data.gradestamp" class="vipLogo">{{Data.companyLevel}}
            </div>
            <ul class="nav" :class="iShowNav?'iShowNav':''">
                <li v-for="(item, index) in nav" :key="index" @click="navChange(index)" :class="index === navActive ? 'navActive': ''">{{item.username}}</li>
                <li class="isShowMore" v-if="ShowMore" @click="isShowMore">更多<i class="el-submenu__icon-arrow" :class="iShowNav?'el-icon-arrow-down':'el-icon-arrow-up'"></i></li>
                <li style="clear: both"></li>
            </ul>
            <div>
                <table>
                    <thead>
                    <tr class="title">
                        <td><div class="user">用户</div></td>
                        <td>
                            <div class="contribution" v-if="isMy">我贡献的升级积分</div>
                            <div class="contribution" v-else>他贡献的升级积分</div>
                        </td>
                        <td>
                            <div class="consumption" v-if="isMy">我的消费积分</div>
                            <div class="consumption" v-else>他的消费积分</div>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <template>
                        <tr class="list-head">
                            <td>
                                <!--<div class="user"><img class="userLogo"><span>{{username}}</span></div>-->
                                <div class="user"><span>{{username}}</span></div>
                            </td>
                            <td>
                                <div class="contribution">{{Data.upgradePoints}}</div>
                            </td>
                            <td>
                                <div class="consumption">{{Data.consumePoints}}</div>
                            </td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
            <div>
                <div class="integralDetail">
                    <div @click="integralDetailChange('升级')" :class="integralDetail?'detailActive':''">升级积分明细</div>
                    <div @click="integralDetailChange('消费')" :class="integralDetail?'':'detailActive'">消费积分明细</div>
                </div>
                <template v-if="integralDetail">
                    <table>
                        <thead>
                        <tr class="title">
                            <td>
                                <div class="user">升级积分日期</div>
                            </td>
                            <td>
                                <div class="contribution">积分获取途径</div>
                            </td>
                            <td>
                                <div class="consumption">升级积分数量</div>
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-for="(item, index) in integralData">
                            <tr class="list-head" :key="index">
                                <td>
                                    <div class="user"><span>{{item.createdDate | pointdate}}</span></div>
                                </td>
                                <td>
                                    <div class="contribution">{{item.accessName}}</div>
                                </td>
                                <td>
                                    <div class="consumption">{{item.points}}</div>
                                </td>
                            </tr>
                        </template>
                        </tbody>
                    </table>
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change="handleCurrentChange"
                        :current-page="page.pageNum"
                        :page-size="page1.pageSize"
                        :total=total>
                    </el-pagination>
                </template>
                <template v-else>
                    <table>
                        <thead>
                        <tr class="title">
                            <td>
                                <div class="user">升级积分日期</div>
                            </td>
                            <td>
                                <div class="contribution">积分获取途径</div>
                            </td>
                            <td>
                                <div class="consumption">升级积分数量</div>
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        <template v-for="(item, index) in integralData1">
                            <tr class="list-head" :key="index">
                                <td>
                                    <div class="user"><span>{{item.createdDate | pointdate}}</span></div>
                                </td>
                                <td>
                                    <div class="contribution">{{item.accessName}}</div>
                                </td>
                                <td>
                                    <div class="consumption">{{item.points}}</div>
                                </td>
                            </tr>
                        </template>
                        </tbody>
                    </table>
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        @current-change="handleCurrentChange1"
                        :current-page="page1.pageNum"
                        :page-size="page1.pageSize"
                        :total=total1>
                    </el-pagination>
                </template>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'integralDetail',
    data () {
        return {
            total: null,
            total1: null,
            vip: '黄金会员',
            navActive: 0,
            iShowNav: true,
            ShowMore: false,
            Data: {
                companyLevel: null,
                companyPoints: null,
                consumePoints: null,
                upgradePoints: null,
                gradestamp: null
            },
            integralDetail: true,
            integralData: [
                {
                    createdDate: null,
                    accessName: null,
                    points: null
                }
            ],
            integralData1: [
                {
                    createdDate: null,
                    accessName: null,
                    points: null
                }
            ],
            nav: [
                {
                    'id': null,
                    'userId': null,
                    'companyId': null,
                    'username': null,
                    'account': null
                }
            ],
            page: {
                pageNum: 1, // 当前页数
                pageSize: 10
            },
            page1: {
                pageNum: 1, // 当前页数
                pageSize: 10
            },
            userpage: {
                pageSize: 10,
                pageNum: 1
            },
            username: null,
            userInfo: {
                companyId: null,
                userId: null
            },
            isMy: true
        };
    },
    created () {
        let userinfo = localStorage.getItem('userInfo');
        if (userinfo) {
            this.username = JSON.parse(userinfo).username;
            this.userInfo.companyId = JSON.parse(userinfo).companyId;
            this.userInfo.userId = JSON.parse(userinfo).id;
        }
        this.getlist(JSON.parse(userinfo).id);
        this.getuserlist();
    },
    methods: {
        // 获取员工列表
        getuserlist () {
            this.$http.post(this.$api.account.employee, this.userpage)
                .then(res => {
                    if (res.data.code === 0) {
                        this.nav = res.data.data && res.data.data.list;
                        Object.keys(res.data.data.list).forEach(key => {
                            if (this.userInfo.userId === res.data.data.list[key].id) {
                                this.navActive = key * 1;
                            }
                        });
                        if (res.data.data.total > 6) {
                            this.ShowMore = true;
                        }
                    } else {
                        this.nav = [];
                    }
                });
        },
        // 获取我的企业等级和积分
        getlist (userid) {
            let query = {
                companyId: this.userInfo.companyId,
                userId: userid
            };
            this.$http.post(this.$api.point.getPoint, query).then((res) => {
                if (res.data.code === 0) {
                    this.Data = res.data.data;
                }
            }).catch((res) => {

            });
            this.getPointList(userid);
        },
        // 获取积分明细
        getPointList (userid) {
            let query = {
                data: {
                    userCompanyId: this.userInfo.companyId,
                    userId: userid,
                    type: this.integralDetail ? '1' : '2'
                },
                pageNum: this.integralDetail ? this.page.pageNum : this.page1.pageNum,
                pageSize: this.integralDetail ? this.page.pageSize : this.page1.pageSize
            };
            this.$http.post(this.$api.point.getPointList, query).then((res) => {
                if (res.data.code === 0) {
                    this.integralDetail ? this.integralData = res.data.data.list : this.integralData1 = res.data.data.list;
                    this.integralDetail ? this.total = res.data.data.total : this.total1 = res.data.data.total;
                }
            }).catch((res) => {
                console.log(res);
            });
        },
        // 切换员工
        navChange (idx) {
            if (this.navActive === idx) {
                return;
            }
            this.page = {
                pageNum: 1, // 当前页数
                pageSize: 10
            };
            this.page1 = {
                pageNum: 1, // 当前页数
                pageSize: 10
            };
            this.total = null;
            this.total1 = null;
            this.integralDetail = true;
            this.username = this.nav[idx].username;
            this.navActive = idx;
            this.isMy = this.nav[idx].id === this.userInfo.userId;
            this.getlist(this.nav[idx].id);
        },
        // 切换消费积分升级积分
        integralDetailChange (type) {
            this.integralDetail = type === '升级';
            this.getPointList(this.nav[this.navActive].id);
        },
        // 升级积分分页
        handleCurrentChange (e) {
            this.page.pageNum = e;
            this.getPointList(this.nav[this.navActive].id);
        },
        // 消费积分分页
        handleCurrentChange1 (e) {
            this.page1.pageNum = e;
            this.getPointList(this.nav[this.navActive].id);
        },
        isShowMore () {
            this.iShowNav = !this.iShowNav;
        }
    },
    filters: {
        pointdate: function (time) { // 把时间戳格式:若有参返回年-月-日时:分:秒 若无参返回 年-月-日
            if (!time) {
                return '';
            }
            let y, m, d, date, h, ms, data, hours;
            date = new Date(time);
            y = date.getFullYear();
            m = date.getMonth() + 1;
            d = date.getDate();
            h = date.getHours();
            ms = date.getMinutes();
            data = y + '-' + format(m) + '-' + format(d);
            hours = format(h) + ':' + format(ms);
            return data + ' ' + hours;
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
        .el-card__header {
            padding: 10px 20px;
            .title {
                color: $color-title;
                font-size: 16px;
                margin-right: 24px;
                font-weight: 600;
            }
        }
    table {
        width: 100%;
        margin-top: 20px;
        border-collapse: collapse;
        td {
            color: $color-main;
            font-size: 12px;
            border: 0;
            vertical-align: middle;
        }
        .list-head {
            border: 1px solid $color-border;
            border-top: 0;
            td {
                padding: 10px;
            }
            &:nth-child(even) {
                background: #fbfbfc;
            }
        }
        .title {
            background-color: #EEF3F8;
            border: 1px solid $color-border;
            border-bottom: 0;
        }
        .title td{
            padding: 10px;
        }
        .user {
            width: 220px;
            padding-left: 40px;
            .userLogo{
                width: 30px;
                height: 30px;
                margin-right: 10px;
                border-radius: 30px;
                background-color: #EEF3F8;
            }
        }
        .contribution {
            width: 220px;
        }
        .consumption{
            width: 260px;
        }
    }
    .vip {
        font-weight: 600;
        padding-bottom: 20px;
        .title1{
            padding: 0 20px 0 15px;
        }
        .vipLogo {
            margin-right: 10px;
            width: 30px;
            height: 30px;
        }
    }
    .nav{
        position: relative;
        transition: 0.3s all;
        li {
            width: 80px;
            height: 25px;
            float: left;
            margin: 10px 60px 10px 0;
            padding: 0 5px;
            cursor: default;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .navActive{
            color: $color-highlight;
            border-bottom: 1px solid $color-highlight;
        }
        .isShowMore {
            position: absolute;
            top: 2px;
            right: 10px;
            width: 70px;
            margin-right: 0;
        }
    }
    .iShowNav{
        max-height: 50px;
        overflow: hidden;
    }
    .integralDetail {
        padding-top: 40px;
        cursor: default;
        div{
            float: left;
            padding: 10px 15px 10px 15px;
        }
        .detailActive {
            border-radius: 5px 5px 0 0;
            border: 1px solid $color-border;
            font-weight: 600;
        }
    }
</style>
