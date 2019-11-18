<template>
    <div class="recommendationDetails">
        <div class="new-title-public">
            引荐奖励明细
        </div>
        <!--<div class="selected">-->
            <!--<div class="right">-->
                <!--<div class="search-box">-->
                    <!--&lt;!&ndash;<input type="search" v-model="" placeholder="请输入被引荐公司名称">&ndash;&gt;-->
                    <!--<i @click="search" class="iconfont icon-search icon-font"></i>-->
                <!--</div>-->
                <!--<span class="search-btn" @click="toggleSelect =!toggleSelect">高级搜索<i-->
                    <!--class="iconfont" :class="toggleSelect ? 'icon-arrow-up' : 'icon-arrow-down'"></i></span>-->
            <!--</div>-->
        <!--</div>-->
        <div class="selected-box clearfix" style="margin-top: 20px">
            <div class="search-form">
                <div class="gy-form-group">
                    <span class="l">被引荐公司</span>
                    <input type="text" placeholder="请输入被引荐公司" v-model="parameter.data.usrCompanyName" @keyup.13="getCompanyTypes"
                           @click="CompanyShow = false; parameter.data.usrCompanyName = ''; parameter.data.usrCompanyId = ''">
                    <div class="Drop-down" v-if="CompanyShow">
                        <ul class="listUl">
                            <li v-for="(item, index) in CompanyTypes" :key="index" v-if="CompanyTypes.length>0"
                                @click="setCompanyName(item)">{{item.companyName}}
                            </li>
                            <li v-if="CompanyTypes.length === 0">没有搜到相关公司</li>
                        </ul>
                    </div>
                    <span class="searchicon searchicon_a" style="right: 39px" @click="getCompanyTypes"><i class="iconfont icon-mySearch"></i></span>
                </div>
                <div class="gy-form-group">
                    <span class="l">奖励日期</span>
                    <el-date-picker
                        v-model="createDate"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder='开始时间'
                        end-placeholder='结束时间'>
                    </el-date-picker>
                </div>
                <div class="gy-form-group">
                    <span class="l">奖励类型</span>
                    <el-select v-model="parameter.data.prizeType" placeholder="请选择">
                        <el-option
                            v-for="item in prizeType"
                            :key="item.id"
                            :label="item.value"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <i @click="search" class="iconfont icon-search icon-search-supply"></i>
                </div>
            </div>
        </div>
        <div class="mytable">
            <div class="gy-table-wrap">
                <table class="gy-table">
                    <thead>
                    <tr>
                        <th>被引荐公司</th>
                        <th>奖励类型</th>
                        <th>撮合线上支付金额(元)</th>
                        <th>奖励金额(元)</th>
                        <th>奖励日期</th>
                        <th>交易订单号</th>
                        <th>撮合订单号</th>
                    </tr>
                    </thead>
                    <tbody v-if="data.list && data.list.length !== 0">
                    <tr v-for="(item, index) in data.list" :key="index">
                        <td>{{item.usrCompanyName || '--'}}</td>
                        <td>{{item.prizeType == 1 ? '撮合交易奖励' :'撮合交易补贴'}}</td>
                        <td align="right">{{item.orderAmount|numToCash}}</td>
                        <td align="right">{{item.cashAmount|numToCash}}</td>
                        <td>{{item.createdDate | date}}</td>
                        <td>{{item.odrOrderSn || '--'}}</td>
                        <td>{{item.dmkOrderSn || '--'}}</td>
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
            toggleSelect: false, // 高级搜索显示隐藏
            parameter: {
                pageSize: 10, // 显示数量
                pageNum: 1, // 当前页
                data: {
                    'cashFlowDateEnd': '', // 奖励开始时间止
                    'cashFlowDateStart': '', // 奖励开始时间起
                    'inviterId': this.$route.query.inviterId,
                    'prizeType': '', // 奖励类型
                    'usrCompanyId': this.$route.query.tradeCompanyId, // 被引荐公司ID
                    'usrCompanyName': '' // 被引荐公司名称
                }
            },
            prizeType: [
                {value: '全部', id: ''},
                {value: '撮合交易奖励', id: '1'},
                {value: '撮合交易补贴', id: '2'}
            ],
            createDate: [], // 存时间
            CompanyTypes: [], // 企业类型
            CompanyShow: false,
            data: [],
            dataValue: ''
        };
    },
    created () {
        this.getInfo();
        this.parameter.data.usrCompanyName = this.$route.query.customerName;
    },
    methods: {
        // 获取申请单状态
        // 获取企业
        getCompanyTypes () {
            this.CompanyShow = true;
            this.$http.post(this.$api.order.creatOrderCompanies, {
                companyTypeId: 1,
                name: this.parameter.data.usrCompanyName
            }).then(res => {
                if (res.data.code === 0) {
                    this.CompanyTypes = res.data.data;
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch((e) => {
                console.log('出错了' + e);
            });
        },
        setCompanyName (text) {
            this.parameter.data.usrCompanyName = text.companyName;
            this.parameter.data.usrCompanyId = text.companyId;
            this.CompanyShow = false;
        },
        search () { // 搜索 单号
            this.getInfo();
        },
        handleCurrentChange (val) { // 分页
            this.pageNum = val;
            this.parameter.pageNum = val;
            this.getInfo();
        },
        getInfo () { // 获取信息
            this.parameter.data.cashFlowDateStart = this.createDate && this.createDate[0];
            this.parameter.data.cashFlowDateEnd = this.createDate && this.createDate[1];
            this.$http.post(this.$api.marriedDeal.searchAward, this.parameter).then(res => {
                if (res.data.code === 0) {
                    this.data = res.data.data;
                    this.total = res.data.data.total;
                    this.pageNum = res.data.data.pageNum;
                }
            });
            this.$http.post(this.$api.marriedDeal.invitationInfo, this.parameter.data).then(res => {
                if (res.data.code === 0) {
                    this.dataValue = res.data.data.receiveAward;
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
        .listUl {
            background-color: #fff;
            width: 100%;
            max-height: 200px;
            overflow: auto;
            border: 1px solid #e6eaea;
            border-top: none;
            li {
                padding: 5px 10px;
            }
            li:hover {
                cursor: pointer;
                background-color: #f5f7fa;
                color: #4a90e2;
            }
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
<style lang="scss">
    .recommendationDetails{
        .el-input__inner{
            height:29px;
        }
        .el-range__icon{
            margin-top: -11px!important;
        }
        .el-range-separator{
            margin-top: -11px!important;
        }
    }
</style>
