<template>
    <div class="order-list customerList">
        <div class="new-title-public">
            供应链申请单
        </div>
        <div class="selected">
            <ul>
                <!--0 代采  1 货押 2 赊销 10全部-->
                <li :class="{ active: newIndex==10 }" @click="toggleTabs(10)">全部({{dataCount[3] || 0}})</li>
                <li :class="{ active: newIndex==1 }" @click="toggleTabs(1)">代采({{dataCount[0] || 0}})</li>
                <li :class="{ active: newIndex==3 }" @click="toggleTabs(3)">赊销({{dataCount[2] || 0}})</li>
                <li :class="{ active: newIndex==2 }" @click="toggleTabs(2)">货押({{dataCount[1] || 0}})</li>
            </ul>
            <div class="right">
                <div class="search-box">
                    <input type="search" v-model="parameter.data.keywords" placeholder="请输入申请单号/品名">
                    <i @click="search" class="iconfont icon-search icon-font"></i>
                </div>
                <span class="search-btn" @click="toggleSelect =!toggleSelect">高级搜索<i
                        class="iconfont" :class="toggleSelect ? 'icon-arrow-up' : 'icon-arrow-down'"></i></span>
            </div>
        </div>
        <div class="selected-box clearfix" v-if="toggleSelect">
            <div class="search-form">
                <div class="gy-form-group">
                    <span class="l">申请单号</span>
                    <input type="text" placeholder="请输入" v-model="parameter.data.code">
                </div>
                <div class="gy-form-group search_last">
                    <span class="l">品名</span>
                    <template>
                        <product-list :selected.sync="selectedProduct" ></product-list>
                    </template>
                </div>
                <div class="gy-form-group">
                    <span class="l">申请单状态</span>
                    <el-select v-model="parameter.data.status" placeholder="请选择">
                        <el-option
                                v-for="item in transactionOption"
                                v-if="item.providerShow"
                                :key="item.id"
                                :label="item.providerDisplay"
                                :value="item.applicationStatus">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group search_last">
                    <span class="l">申请日期</span>
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
                <div class="gy-form-group search_last">
                    <span class="l">申请公司</span>
                    <input type="text" placeholder="请输入" v-model="parameter.data.companyName" @keyup.13="getCompanyTypes"
                           @click="CompanyShow = false; parameter.data.companyName = ''">
                    <div class="Drop-down" v-if="CompanyShow">
                        <ul class="listUl">
                            <li v-for="(item, index) in CompanyTypes" :key="index" v-if="CompanyTypes.length>0"
                                @click="setCompanyName(item.companyName)">{{item.companyName}}
                            </li>
                            <li v-if="CompanyTypes.length === 0">没有搜到相关公司</li>
                        </ul>
                    </div>
                    <span class="searchicon searchicon_a" style="right: 39px" @click="getCompanyTypes"><i class="iconfont icon-mySearch"></i></span>
                    <i @click="search" class="iconfont icon-search icon-search-supply"></i>
                </div>
            </div>
        </div>
        <div class="mytable">
            <div class="gy-table-wrap">
                <table class="gy-table">
                    <thead>
                        <tr>
                            <th>申请单号</th>
                            <th>服务类型</th>
                            <th>申请公司</th>
                            <th>品名</th>
                            <th>商品数量(吨)</th>
                            <th>周期(天)</th>
                            <th>申请时间</th>
                            <th>有效日期</th>
                            <th>申请单状态</th>
                            <th>受理人</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody v-if="data.list && data.list.length !== 0">
                        <tr v-for="(item, index) in data.list" :key="index">
                            <td>{{item.code}}</td>
                            <td>{{item.serviceTypeName}}</td>
                            <td>{{item.companyName}}</td>
                            <td>{{item.skuName}}</td>
                            <td class="amount-right-el">{{item.productAmount}}</td>
                            <td class="amount-right-el">{{item.period}}</td>
                            <td>{{item.createdDate | date(true)}}</td>
                            <td>{{item.effectiveDate | date}}</td>
                            <td :style="applicationStatus[item.status]">{{item.statusName}}</td>
                            <td>{{item.assigneeUserName ? item.assigneeUserName : '-'}}</td>
                            <td class="cz">
                                <router-link
                                    class="gy-button-view"
                                    :to="{name:'customerApplicationForm', query: item}">查看
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="11" style="text-align:center">没有找到可显示的数据...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
import productList from '@/components/productList';
export default {
    components: {
        productList
    },
    data () {
        return {
            offerId: '', // 供应单id
            skuName: '', // 查询品名
            CompaniesCony: '',
            Companies: [],
            dataCount: [], // 总条数
            total: 0, // 总条数
            pageNum: 0, // 总条数
            newIndex: 10,
            mykeywords: '',
            productNameA: '',
            mycode: '',
            toggleSelect: false, // 高级搜索显示隐藏
            parameter: {
                pageSize: 10, // 显示数量
                pageNum: 1, // 当前页
                data: {
                    'keywords': '', // 关键字搜索
                    'skuName': '', // 品名
                    'code': '', // 申请单号
                    'status': '', // 申请单状态
                    'startTime': '', // 开始时间
                    'endTime': '', // 结束时间
                    'serviceTypeId': '', // 服务类型
                    'companyName': '', // 申请公司
                    'providerCompanyId': JSON.parse(localStorage.getItem('userInfo')).companyId, // 客户ID
                    'userActionType': 2
                }
            },
            parameter2: {
                'keywords': '', // 关键字搜索
                'skuName': '', // 品名
                'code': '', // 申请单号
                'status': '', // 申请单状态
                'startTime': '', // 开始时间
                'endTime': '', // 结束时间
                'serviceTypeId': '', // 服务类型
                'providerCompanyId': JSON.parse(localStorage.getItem('userInfo')).companyId // 客户ID
            },
            deliveryType: '',
            transactionType: '',
            onelist2Show: false,
            onelist2: [],
            data: [],
            selectedProduct: {},
            transactionOption: [],
            createDate: [], // 存时间
            CompanyTypes: [], // 企业类型
            CompanyShow: false,
            applicationStatus: {
                10: 'color: #F49A1E!important', // 平台审核
                20: 'color: #F49A1E!important', // 服务商审核
                21: 'color: #F49A1E!important', // 方案审批中
                22: 'color: #999999!important', // 申请驳回
                30: 'color: #24C815!important', // 服务执行
                40: 'color: #D12626!important', // 违约和处置
                98: 'color: #D12626!important', // 已拒绝
                99: 'color: #24C815!important' // 已完成
            }
        };
    },
    created () {
        this.getApplicationStatus();
        this.getInfo();
        this.getInfo2();
    },
    methods: {
        // 获取申请单状态
        getApplicationStatus () {
            this.$http.get(this.$api.account.supplyStatus).then(res => {
                if (res.data.code === 0) {
                    this.transactionOption = res.data.data;
                    let obj = {
                        providerShow: 1,
                        providerDisplay: '全部',
                        applicationStatus: ''
                    };
                    this.transactionOption.unshift(obj);
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        // 获取企业
        getCompanyTypes () {
            this.CompanyShow = true;
            this.$http.post(this.$api.order.creatOrderCompanies, {
                companyTypeId: 1,
                name: this.parameter.data.companyName
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
            this.parameter.data.companyName = text;
            this.CompanyShow = false;
        },
        search () { // 搜索 单号
            this.getInfo();
            this.getInfo2();
        },
        toggleTabs (index) { // 状态筛选
            this.newIndex = index;
            if (index === 10) {
                this.parameter.data.serviceTypeId = '';
            } else {
                this.parameter.data.serviceTypeId = index;
            }
            this.getInfo();
            this.getInfo2();
        },
        handleCurrentChange (val) { // 分页
            this.pageNum = val;
            this.parameter.pageNum = val;
            this.getInfo();
            this.getInfo2();
        },
        getInfo () { // 获取信息
            this.parameter.data.skuName = this.selectedProduct.goodsName;
            this.parameter.data.startTime = this.createDate && this.createDate[0];
            this.parameter.data.endTime = this.createDate && this.createDate[1];
            this.$http.post(this.$api.account.supplySearch, this.parameter).then(res => {
                if (res.data.code === 0) {
                    this.data = res.data.data;
                    this.total = res.data.data.total;
                    this.pageNum = res.data.data.pageNum;
                    // 0 待受理  1 已受理 2 已拒绝
                }
            });
        },
        getInfo2 (state) { // 获取信息
            //    数量接口
            this.parameter.data.skuName = this.selectedProduct.goodsName;
            this.parameter.data.startTime = this.createDate && this.createDate[0];
            this.parameter.data.endTime = this.createDate && this.createDate[1];
            this.parameter2 = {
                'keywords': this.parameter.data.keywords, // 关键字搜索
                'skuName': this.parameter.data.skuName, // 品名
                'status': this.parameter.data.status, // 申请单状态
                'code': this.parameter.data.code, // 服务类型
                'startTime': this.parameter.data.startTime, // 开始时间
                'endTime': this.parameter.data.endTime, // 结束时间
                'companyName': this.parameter.data.companyName, // 结束时间
                'serviceTypeId': this.parameter.data.serviceTypeId, // 结束时间
                'providerCompanyId': JSON.parse(localStorage.getItem('userInfo')).companyId // 客户ID
            };
            this.$http.post(this.$api.account.supplyCount, this.parameter2).then(res => {
                if (res.data.code === 0) {
                    this.dataCount = [];
                    for (let i in res.data.data) {
                        this.dataCount.push(res.data.data[i]);
                    }
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    .order-list {
        .newrel{
            .newabl{
                position: absolute;
                top: 0px;
                right: 7px;
            }
        }
        .right {
            float: right
        }
        .mytable{
            padding: 0 14px 14px;
            .gy-table-wrap {
                overflow-x: auto;
            }
            .gy-table {
                .title {
                    td{
                        color: #666!important;
                        font-size: 12px;
                        font-weight: bold;
                    }
                }
                th {
                    display: table-cell;
                    white-space: nowrap;
                    width: auto;
                }
                td {
                    color: #666;
                    font-size: 12px;
                    display: table-cell;
                    white-space: nowrap;
                    width: auto;
                    padding-right: 12px;
                    text-align: left;
                }
                .cz {
                    text-align: center;
                }
                .amount-right-el{
                    text-align: right;
                    padding-right: 8;
                }
                .co {
                    color: #E9645B !important;
                }
            }
        }
        .im-talk {
            color: $color-highlight;
            cursor: pointer;
            padding-left: 10px;
            .iconfont {
                color: $color-highlight;
                padding-right: 2px;
            }
        }
        .selected-box {
            position: relative;
            margin-bottom: 20px;
            .myI{
                position: absolute;
                top: 1px;
                right: -5px;
            }
            .cjsj{
                margin-top: -10px;
            }
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
        .listul{
            background-color: #fff;
            width: 80%;
            max-height: 200px;
            overflow: auto;
            position: absolute;
            top: 30px;
            z-index: 9;
            border: 1px solid #e6eaea;
            border-top: none;
            margin-left: 20.5%;
            li{
                padding: 5px 10px;
            }
            li:hover{
                cursor: pointer;
                background-color: #f5f7fa;
                color: #4a90e2;
            }
        }
        .newtop_{
            margin-top: 10px;
        }
        .newtop2_{
            margin-top: 9px;
            .input_xg{
                margin-left: -2px;
                width: 73%;
            }
        }
        .search_btn{
            margin-left: -25px;
        }
        .newaddclass{
            text-align: right;
            margin-right: 14px;
        }
        table {
            width: 100%;
            margin-top: 15px;
            border-collapse: collapse;
            td {
                color: $color-main;
                text-align: center;
                font-size: 12px
            }
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
    .customerList{
        .el-input__inner{
            height:28px;
        }
        .el-range__icon{
            margin-top: -11px!important;
        }
        .el-range-separator{
            margin-top: -11px!important;
        }
    }
</style>
