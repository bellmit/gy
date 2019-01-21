<template>
    <div class="">
        <div class="new-title-public clearfix">
            <span class="title">等级和积分</span>
        </div>
        <div class="vip">
            <span class="title1">我的企业等级 </span><img :src="Data.gradestamp" class="vipLogo">{{Data.companyLevel}}<span class="title2">企业累积积分</span><span>{{Data.companyPoints}}</span>
            <span class="title2">企业可用积分</span><span>{{Data.balancePoints}}</span><span v-if="Data.pointactivation === 0" class="unactive">积分待激活</span>
        </div>
        <div class="integralList">
            <div class="integralDetail">
                <div @click="integralDetailChange(1)" :class="integralDetail?'detailActive':''">积分累积明细</div>
                <div @click="integralDetailChange(2)" :class="integralDetail?'':'detailActive'">积分消费明细</div>
            </div>
            <template v-if="integralDetail">
                <table>
                    <thead>
                    <tr class="title">
                        <td>
                            <div class="user">日期</div>
                        </td>
                        <td>
                            <div class="contribution">用户名</div>
                        </td>
                        <td>
                            <div class="contribution">积分获取途径</div>
                        </td>
                        <td>
                            <div class="consumption">积分数量</div>
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
                                <div class="contribution"><span>{{item.userName}}</span></div>
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
                <div class="departmentName">共计{{total}}条记录</div>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  style="margin: 20px 0 30px 0;"
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
                            <div class="user">日期</div>
                        </td>
                        <td>
                            <div class="contribution">用户名</div>
                        </td>
                        <td>
                            <div class="contribution">积分消费途径</div>
                        </td>
                        <td>
                            <div class="consumption">积分数量</div>
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
                                <div class="contribution"><span>{{item.userName}}</span></div>
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
                <div class="departmentName">共计{{total1}}条记录</div>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  style="margin: 20px 0 30px 0;"
                  @current-change="handleCurrentChange1"
                  :current-page="page1.pageNum"
                  :page-size="page1.pageSize"
                  :total=total1>
                </el-pagination>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    name: 'myIntegral',
    data () {
        return {
            Data: {
                companyLevel: null,
                companyPoints: null,
                consumePoints: null,
                balancePoints: null,
                upgradePoints: null,
                gradestamp: null
            },
            userInfo: {
                usrCompanyId: null,
                type: 1
            },
            total: null,
            total1: null,
            vip: '黄金会员',
            navActive: 0,
            iShowNav: true,
            ShowMore: false,
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
            page: {
                pageNum: 1, // 当前页数
                pageSize: 10
            },
            page1: {
                pageNum: 1, // 当前页数
                pageSize: 10
            },
            username: null,
            isMy: true
        };
    },
    created () {
        let userinfo = localStorage.getItem('userInfo');
        if (userinfo) {
            this.userInfo.usrCompanyId = JSON.parse(userinfo).companyId;
            this.username = JSON.parse(userinfo).username;
            this.userInfo.userId = JSON.parse(userinfo).id;
        }
        this.getlist();
    },
    methods: {
        // 获取我的企业等级和积分
        getlist () {
            let that = this;
            let query = {
                data: {
                    userCompanyId: this.userInfo.usrCompanyId,
                    type: this.integralDetail ? '1' : '2'
                },
                pageNum: this.integralDetail ? this.page.pageNum : this.page1.pageNum,
                pageSize: this.integralDetail ? this.page.pageSize : this.page1.pageSize
            };
            this.$http.post(this.$api.point.getPointList, query).then((res) => {
                if (res.data.code === 0) {
                    that.Data = res.data.data;
                    that.integralDetail ? that.integralData = res.data.data.detailModelList.list : that.integralData1 = res.data.data.detailModelList.list;
                    that.integralDetail ? that.total = res.data.data.detailModelList.total : that.total1 = res.data.data.detailModelList.total;
                }
            }).catch((res) => {
                console.log(res);
            });
        },
        integralDetailChange (type) {
            this.integralDetail = type === 1;
            this.getlist(type);
        },
        // 升级积分分页
        handleCurrentChange (e) {
            this.page.pageNum = e;
            this.getlist();
        },
        // 消费积分分页
        handleCurrentChange1 (e) {
            this.page1.pageNum = e;
            this.getlist();
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
    }
    .vip {
        font-weight: 600;
        padding: 20px 0;
        .title1{
            padding: 0 20px 0 15px;
        }
        .vipLogo {
            margin-right: 10px;
            width: 30px;
            height: 30px;
        }
        .title2 {
            padding: 0 25px 0 50px;
        }
        .explain{
            padding-left: 20px;
            font-weight: 100;
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
            text-align: center;
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
            color:#666;
            font-size: 14px;
            font-weight:bold;
        }
        .title td{
            padding: 9px;
        }
        .user {
            width: 160px;
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
            width: 200px;
        }
        .consumption{
            width: 200px;
        }
    }
    .vip {
        font-weight: 600;
        padding-bottom: 20px;
        .title1{
            padding: 0 20px 0 16px;
        }
        .vipLogo {
            margin-right: 10px;
            width: 30px;
            height: 30px;
        }
    }
    .integralList{
        padding:10px 16px;
    }
    .integralDetail {
        /*padding-top: 40px;*/
        cursor: default;
        div{
            float: left;
            padding: 0px 7px 10px 7px;
            margin-right: 13px;
        }
        .detailActive {
            color: #E0370F;
            border-radius: 5px 5px 0 0;
            border-bottom: 2px solid #E0370F;
            font-weight: bold;
            font-size: 14px;

        }
    }
    .unactive{
        color: #ffa422;
        font-weight: normal;
        margin-left: 20px;
    }
</style>
