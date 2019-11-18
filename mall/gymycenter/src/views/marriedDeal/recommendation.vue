<template>
    <div class="recommendationDetails">
        <div class="new-title-public">
            引荐奖励
        </div>
        <div class="selected">
            <div class="right">
                <div class="search-box">
                    <input type="search" v-model="parameter.data.customerName" placeholder="请输入被引荐公司名称">
                    <i @click="search" class="iconfont icon-search icon-font"></i>
                </div>
            </div>
        </div>
        <div class="mytable">
            <div class="gy-table-wrap">
                <table class="gy-table">
                    <thead>
                    <tr>
                        <th>被引荐公司</th>
                        <th>撮合订单数</th>
                        <th>撮合线上支付总额(元)</th>
                        <th>奖励金额(元)</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody v-if="mydata.list && mydata.list.length !== 0">
                    <tr v-for="(item, index) in mydata.list" :key="index">
                        <td>{{item.customerName}}</td>
                        <td align="right">{{item.tradeNum}}</td>
                        <td align="right">{{item.tradeAmount|numToCash}}</td>
                        <td align="right">{{item.receiveAward|numToCash}}</td>
                        <td align="center">
                            <router-link
                                class="gy-button-view"
                                :to="{name:'recommendationDetails', query:{tradeCompanyId: item.tradeCompanyId,inviterId:item.inviterId,customerName:item.customerName}}">查看
                            </router-link>
                        </td>
                    </tr>
                    </tbody>
                    <tbody v-else>
                    <tr>
                        <td colspan="11" style="text-align:center">暂无数据</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="departmentName">总计奖励金额：{{dataValue|numToCash}}元</div>
            <div class="departmentName">共 {{total}} 条记录</div>
            <div class="pagination-box" v-if="total !== 0">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :total=total>
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            total: 0, // 总条数
            pageNum: 0, // 总条数
            parameter: {
                pageSize: 10, // 显示数量
                pageNum: 1, // 当前页
                data: {
                    'customerName': ''
                }
            },
            mydata: [],
            dataValue: ''
        };
    },
    created () {
        this.getInfo();
    },
    methods: {
        search () { // 搜索 单号
            this.getInfo();
        },
        handleCurrentChange (val) { // 分页
            this.pageNum = val;
            this.parameter.pageNum = val;
            this.getInfo();
        },
        getInfo () { // 获取信息
            this.$http.post(this.$api.marriedDeal.recommendAwardInfoList, this.parameter).then(res => {
                if (res.data.code === 0) {
                    this.mydata = res.data.data;
                    this.total = res.data.data.total;
                    this.pageNum = res.data.data.pageNum;
                }
            });
            this.$http.post(this.$api.marriedDeal.recommendAwardInfo, this.parameter.data).then(res => {
                if (res.data.code === 0) {
                    console.log(res.data.data);
                    this.dataValue = res.data.data;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    .recommendationDetails {
        .right {
            float: right
        }
        .mytable{
            padding: 0 14px 14px;
        }
        .selected-box {
            position: relative;
            margin-bottom: 20px;
        }
        .selected {
            overflow: hidden;
            padding: 20px 14px;
            ul{
                overflow: hidden;
                float: left;
                margin-top: 3px;
            }
            li {
                float: left;
                padding: 0 6px;
                text-align: center;
                &.active {
                    color: $color-a-active;
                    border-bottom: 2px solid $color-a-active
                }
            }
            li:hover{
                cursor: pointer;
            }
            ul li:not(:first-child) {
                position: relative;
                margin-left: 10px;
            }
            .search-btn {
                margin-right: 10px;
                i{
                    margin-left:5px;
                    vertical-align: top;
                }
            }
            .search-btn:hover{
                cursor: pointer;
            }
            .search-box {
                display: inline-block;
                width: 216px;
                border-bottom: 1px solid $color-light;
                input {
                    width: 190px;
                    height: 30px;
                    color: $color-light;
                    border: none;
                }
                button {
                    display: inline-block;
                    width: 60px;
                    color: $color-main;
                    border: none;
                    background-color: #fff;
                    text-align: right;
                }
                span {
                    color: $color-light;
                    padding-left: 20px
                }
            }
        }
        td.price {
            color: $color-a-active
        }
        .icon-search-supply{
            position: absolute;
            top:6px;
            right:0;
        }
        .gy-form-group{
            padding: 5px 30px 5px 120px;
            min-height: 30px;
            .l{
                top:5px;
            }
        }
        .Drop-down {
            width: 100%;
            max-height: 200px;
            position: absolute;
            top: 37px;
            right: 31px;
            padding-left: 152px;
            z-index: 9;
        }
        .searchicon {
            position: absolute;
            top: 6px;
            right: 16px;
            color: #666666;
        }
        .icon-font:before{
            font-size: 15px!important;
        }
        /deep/ .gy-table td, .gy-table th {
            line-height: 18px;
            padding:8px;
        }
    }
</style>
