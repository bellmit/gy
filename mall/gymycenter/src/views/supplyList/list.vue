<template>
    <div class="order-list supplyList">
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
                    <input type="search" v-model="mykeywords" placeholder="请输入申请单号/品名">
                    <i @click="search1" class="iconfont icon-search icon-font"></i>
                </div>
                <span class="search-btn" @click="toggleSelect =!toggleSelect">高级搜索<i
                    class="iconfont" :class="toggleSelect ? 'icon-arrow-up' : 'icon-arrow-down'"></i></span>
            </div>
        </div>
        <div class="selected-box" v-show="toggleSelect">
            <el-row :gutter="30">
                <el-col :span="12" style="padding-right:30px;">
                    <el-row>
                        <el-col :span="5">申请单号</el-col>
                        <el-col :span="19">
                            <input type="text" class="gy-input" v-model="mycode" placeholder="请输入">
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12" style="padding-left:30px;">
                    <el-row class="newrel">
                        <el-row>
                            <el-col :span="5">
                                品名
                            </el-col>
                            <el-col :span="19">
                                <template>
                                    <product-list :selected.sync="selectedProduct" ></product-list>
                                </template>
                            </el-col>
                        </el-row>
                    </el-row>
                </el-col>
                <el-col :span="12" style="margin-top: 10px;padding-right:30px;">
                    <el-row>
                        <el-col :span="5">申请单状态</el-col>
                        <el-col :span="19">
                            <el-select v-model="transactionType" placeholder="请选择">
                                <el-option
                                    v-for="item in transactionOption"
                                    v-if="item.userShow"
                                    :key="item.id"
                                    :label="item.userDisplay"
                                    :value="item.applicationStatus">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12" style="margin-top: 10px;padding-left:30px;">
                    <el-row>
                        <el-col :span="5">申请日期</el-col>
                        <el-col :span="19" style="margin-top: -10px;">
                            <el-date-picker
                                    v-model="createDate"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder='开始日期'
                                    end-placeholder='结束日期'>
                            </el-date-picker>
                        </el-col>
                        <el-col :span="1">
                            <i  @click="search2" class="iconfont icon-search icon-search-supply"></i>
                        </el-col>
                    </el-row>
                </el-col>
                </el-row>
        </div>
        <div class="newaddclass">
            <!--<span @click="newadd" class="gy-button-extra">新增</span>-->
            <span v-for="(item, index)  in butList" :key="index" @click="goAdd(item.id)" style="margin-left:10px;" class="gy-button-extra">{{item.displayButton}}</span>
        </div>
        <div class="mytable">
            <table class="gy-table">
                <thead>
                <tr class="title">
                    <td style="width:160px">申请单号</td>
                    <td style="width:70px">服务类型</td>
                    <td style="width:130px">品名</td>
                    <td style="width:80px">商品数量(吨)</td>
                    <td style="width:70px">周期(天)</td>
                    <td style="width:90px">申请单状态</td>
                    <td style="width:170px">申请时间</td>
                    <td style="width:140px">有效日期</td>
                    <td style="width:70px">操作</td>
                </tr>
                </thead>
                <tr v-for="(items, ind ) in data.list" :key="ind">
                    <td class="titleRow">{{items.code}}</td>
                    <td>{{items.serviceTypeName}}</td>
                    <td>{{items.skuName}}</td>
                    <td class="align-r">{{items.productAmount}}</td>
                    <td class="align-r">{{items.period}}</td>
                    <td><span :style="applicationStatus[items.status]">{{items.statusName}}</span></td>
                    <td class="titleRow">{{items.createdDate| date(true)}}</td>
                    <td class="titleRow">{{items.effectiveDate| date()}} <span v-if="items.effectiveDate"> 以前</span></td>
                    <td>
                        <a @click="goPage(items)" class="gy-button-view">查看</a>
                    </td>
                </tr>
                <tr v-if="data.list !=null && data.list.length === 0">
                    <td colspan="9" class="note align-c">暂无数据</td>
                </tr>
            </table>
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
                    'companyId': JSON.parse(localStorage.getItem('userInfo')).companyId, // 客户ID
                    'userActionType': 1
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
                'companyId': JSON.parse(localStorage.getItem('userInfo')).companyId // 客户ID
            },
            deliveryType: '',
            transactionType: '',
            onelist2Show: false,
            onelist2: [],
            data: [],
            selectedProduct: {},
            transactionOption: [],
            createDate: [], // 存时间
            applicationStatus: {
                10: 'color: #F49A1E!important', // 平台审核
                20: 'color: #F49A1E!important', // 服务商审核
                21: 'color: #F49A1E!important', // 方案审批中
                22: 'color: #F49A1E!important', // 申请驳回
                30: 'color: #24C815!important', // 服务执行
                40: 'color: #D12626!important', // 违约和处置
                98: 'color: #D12626!important', // 已拒绝
                99: 'color: #24C815!important' // 已完成
            },
            butList: [] // 存放申请按钮
        };
    },
    created () {
        this.getApplicationStatus();
        this.getServiceType();
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
                        userShow: 1,
                        userDisplay: '全部',
                        applicationStatus: ''
                    };
                    this.transactionOption.unshift(obj);
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        // 获取申请按钮按钮
        getServiceType () {
            let params = {
                keywords: null,
                categoryId: null
            };
            this.$http.post(this.$api.account.serviceType, params).then(res => {
                if (res.data.code === 0) {
                    this.butList = res.data.data;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        search1 () { // 搜索 单号
            this.parameter.data.keywords = this.mykeywords;
            this.parameter.data.code = this.mycode;
            this.parameter.data.skuName = this.selectedProduct.goodsName;
            this.parameter.data.status = this.transactionType;
            this.parameter.data.startTime = this.createDate && this.createDate[0];
            this.parameter.data.endTime = this.createDate && this.createDate[1];
            this.parameter2 = {
                'keywords': this.mykeywords, // 关键字搜索
                'skuName': this.selectedProduct.goodsName, // 品名
                'status': this.transactionType, // 申请单状态
                'serviceTypeId': this.parameter.data.serviceTypeId,
                'code': this.mycode, // 服务类型
                'startTime': this.createDate && this.createDate[0], // 开始时间
                'endTime': this.createDate && this.createDate[1], // 结束时间
                'companyId': JSON.parse(localStorage.getItem('userInfo')).companyId // 客户ID
            };
            this.getInfo(this.parameter);
            this.getInfo2(this.parameter2);
        },
        search2 () { // 搜索 全部
            this.parameter.data.keywords = this.mykeywords;
            this.parameter.data.code = this.mycode;
            this.parameter.data.skuName = this.selectedProduct.goodsName;
            this.parameter.data.status = this.transactionType;
            this.parameter.data.startTime = this.createDate && this.createDate[0];
            this.parameter.data.endTime = this.createDate && this.createDate[1];
            this.parameter2 = {
                'keywords': this.mykeywords, // 关键字搜索
                'skuName': this.selectedProduct.goodsName, // 品名
                'status': this.transactionType, // 申请单状态
                'serviceTypeId': this.parameter.data.serviceTypeId,
                'code': this.mycode, // 服务类型
                'startTime': this.createDate && this.createDate[0], // 开始时间
                'endTime': this.createDate && this.createDate[1], // 结束时间
                'companyId': JSON.parse(localStorage.getItem('userInfo')).companyId // 客户ID
            };
            this.getInfo(this.parameter);
            this.getInfo2(this.parameter2);
        },
        toggleTabs (index) { // 状态筛选
            this.newIndex = index;
            if (index === 10) {
                this.parameter.data.serviceTypeId = '';
            } else {
                this.parameter.data.serviceTypeId = index;
            }
            // 0：上架，1：下架，2：作废
            this.parameter2 = {
                'keywords': this.mykeywords, // 关键字搜索
                'skuName': this.selectedProduct.goodsName, // 品名
                'status': this.transactionType, // 申请单状态
                'code': this.mycode, // 服务类型
                'startTime': this.createDate && this.createDate[0], // 开始时间
                'endTime': this.createDate && this.createDate[1], // 结束时间
                'companyId': JSON.parse(localStorage.getItem('userInfo')).companyId, // 客户ID
                'serviceTypeId': index === 10 ? '' : index
            };
            this.getInfo(this.parameter);
            this.getInfo2(this.parameter2);
        },
        handleCurrentChange (val) { // 分页
            this.pageNum = val;
            this.parameter.pageNum = val;
            this.getInfo(this.parameter);
            this.parameter2 = {
                'keywords': this.mykeywords, // 关键字搜索
                'skuName': this.selectedProduct.goodsName, // 品名
                'status': this.transactionType, // 申请单状态
                'code': this.mycode, // 服务类型
                'startTime': this.createDate && this.createDate[0], // 开始时间
                'endTime': this.createDate && this.createDate[1], // 结束时间
                'companyId': JSON.parse(localStorage.getItem('userInfo')).companyId // 客户ID
            };
            this.getInfo2(this.parameter2);
        },
        getInfo (state) { // 获取信息
            this.$http.post(this.$api.account.supplySearch, this.parameter).then(res => {
                if (res.data.code === 0) {
                    this.data = res.data.data;
                    this.total = res.data.data.total;
                    this.pageNum = res.data.data.pageNum;
                    // 0 待受理  1 已受理 2 已拒绝
                }
            });
        },
        getInfo2 (state) { // 获取信息 数量接口
            this.$http.post(this.$api.account.supplyCount, this.parameter2).then(res => {
                if (res.data.code === 0) {
                    this.dataCount = [];
                    for (let i in res.data.data) {
                        this.dataCount.push(res.data.data[i]);
                    }
                }
            });
        },
        goPage (data) {
            if (data) {
                this.$router.push({name: 'viewList', query: {myId: data.id}});
            } else {
                this.$router.push({name: 'addList'});
            }
        },
        goAdd (type) {
            // 申请代采 1 申请货押 2
            this.$router.push({name: 'addList', query: {type: type}});
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
            .title{
                td{
                    color: #666!important;
                    font-size: 12px;
                    font-weight: bold;
                    white-space : nowrap;
                }
            }
            .titleRow{
                white-space : nowrap;
            }
            td{
                color: #666!important;
                font-size: 12px;
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
            padding:0 30px;
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
                padding: 0 7px;
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
                font-size: 12px
            }
        }
        .icon-search-supply{
            position: absolute;
            top:0;
            right:-18px;
        }
        .icon-font:before{
            font-size: 15px!important;
        }
    }
</style>
<style lang="scss">
    .supplyList{
        .el-date-editor{
            .el-range__icon{
                margin-top: 9px!important;
            }
            .el-range-input{
                margin-top: 8px!important;
                height: 25px!important;
                padding-left: 3px;
                box-sizing: border-box;
                text-align: left;
            }
            .el-range-separator{
                margin-top: 8px!important;
                width: 25px!important;
            }
            .el-range__close-icon{
                margin-top: 8px!important;
            }
        }
    }
</style>
