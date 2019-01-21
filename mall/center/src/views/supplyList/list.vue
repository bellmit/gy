<template>
    <div class="order-list">
        <div class="new-title-public">
            供应链申请单
        </div>
        <div class="selected">
            <ul>
                <!--0 待受理  1 已受理 2 已拒绝  10全部-->
                <li :class="{ active: newIndex==3 }" @click="toggleTabs(3)">全部({{dataCount[3]}})</li>
                <li :class="{ active: newIndex==0 }" @click="toggleTabs(0)">待受理({{dataCount[0]}})</li>
                <li :class="{ active: newIndex==2 }" @click="toggleTabs(2)">
                    已拒绝({{dataCount[2]}})
                </li>
                <li :class="{ active: newIndex==1 }" @click="toggleTabs(1)">
                    已受理({{dataCount[1]}})
                </li>
            </ul>
            <div class="right">
                <div class="search-box">
                    <input type="search" v-model="mykeywords" placeholder="请输入申请单号/品名">
                    <i @click="search1" class="iconfont icon-search"></i>
                </div>
                <span class="search-btn" @click="toggleSelect =!toggleSelect">高级搜索<i
                    class="iconfont icon-arrow-down"></i></span>
            </div>
        </div>
        <div class="selected-box" v-show="toggleSelect">
            <el-row :gutter="30">
                <el-col :span="12">
                        <el-row>
                            <el-col :span="5">服务类型</el-col>
                            <el-col :span="19">
                                <el-select v-model="transactionType" placeholder="请选择">
                                    <el-option
                                        v-for="item in transactionOption"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-col>
                <el-col :span="12">
                    <el-row class="newrel">
                        <el-row>
                            <el-col :span="5">
                                品名
                            </el-col>
                            <el-col :span="19">
                                <template>
                                    <product-search :selected.sync="selectedProduct" ></product-search>
                                </template>
                            </el-col>
                        </el-row>
                    </el-row>
                </el-col>
                <el-col :span="12" style="margin-top: 10px">
                    <el-row>
                        <el-col :span="5">申请单号</el-col>
                        <el-col :span="18">
                            <input type="text" class="gy-input" v-model="mycode">
                        </el-col>
                        <el-col :span="1">
                            <i  @click="search2" class="iconfont icon-search"></i>
                        </el-col>
                    </el-row>
                </el-col>
                </el-row>
        </div>
        <div class="newaddclass">
            <!--<span @click="newadd" class="gy-button-extra">新增</span>-->
            <span @click="goPage()" style="text-align: right" class="gy-button-extra">申请供应链服务</span>
        </div>
        <div class="mytable">
            <table class="gy-table">
                <thead>
                <tr class="title">
                    <td style="width:160px">申请单号</td>
                    <td style="width:90px">服务类型</td>
                    <td style="width:170px">品名</td>
                    <td style="width:120px">商品数量（吨）</td>
                    <td style="width:70px">周期(天)</td>
                    <td style="width:130px">申请时间</td>
                    <td style="width:70px">状态</td>
                    <td style="width:70px">操作</td>
                </tr>
                </thead>
                <tr v-for="(items, ind ) in data.list" :key="ind">
                    <td>{{items.code}}</td>
                    <td>{{items.serviceTypeName}}</td>
                    <td>{{items.productName}}</td>
                    <td>{{items.productAmount}}</td>
                    <td>{{items.period}}</td>
                    <td>{{items.createdDate| date()}}</td>
                    <td>{{items.status}}</td>
                    <td>
                        <a @click="goPage(items)" class="gy-button-view">查看</a>
                    </td>
                </tr>
            </table>
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :total=total>
            </el-pagination>
        </div>
    </div>
</template>

<script>
import productSearch from '@/components/productSearch';
export default {
    components: {
        productSearch
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
            newIndex: 3,
            mykeywords: '',
            productNameA: '',
            mycode: '',
            toggleSelect: false, // 高级搜索显示隐藏
            parameter: {
                pageSize: 10, // 显示数量
                pageNum: 1, // 当前页
                data: {
                    'keywords': '', // 关键字搜索
                    'productName': '', // 品名
                    'serviceTypeId': '', // 服务类型
                    'code': '',
                    'companyId': JSON.parse(localStorage.getItem('userInfo')).companyId // 客户ID
                }
            },
            parameter2: {
                'keywords': '', // 关键字搜索
                'productName': '', // 品名
                'serviceTypeId': '', // 服务类型
                'code': '', // 服务类型
                'companyId': JSON.parse(localStorage.getItem('userInfo')).companyId // 客户ID
            },
            deliveryType: '',
            transactionType: '',
            onelist2Show: false,
            onelist2: [],
            data: [],
            selectedProduct: {},
            transactionOption: []
        };
    },
    created () {
        this.getInfo();
        this.getInfo2();
    },
    methods: {
        //
        search1 () { // 搜索 单号
            this.parameter = {
                data: {
                    'keywords': this.mykeywords,
                    'companyId': JSON.parse(localStorage.getItem('userInfo')).companyId // 客户ID
                },
                pageNum: 1,
                pageSize: 10
            };
            this.parameter2 = {
                'keywords': this.mykeywords, // 关键字搜索
                'companyId': JSON.parse(localStorage.getItem('userInfo')).companyId // 客户ID
            };
            this.getInfo(this.parameter);
            this.getInfo2(this.parameter2);
        },
        search2 () { // 搜索 全部
            this.parameter.data.keywords = this.mykeywords;
            this.parameter.data.code = this.mycode;
            this.parameter.data.productName = this.selectedProduct.goodsName;
            this.parameter.data.serviceTypeId = this.transactionType;
            this.parameter2 = {
                'keywords': this.mykeywords, // 关键字搜索
                'productName': this.selectedProduct.goodsName, // 品名
                'serviceTypeId': this.transactionType, // 服务类型
                'code': this.mycode, // 服务类型
                'companyId': JSON.parse(localStorage.getItem('userInfo')).companyId // 客户ID
            };
            this.getInfo(this.parameter);
            this.getInfo2(this.parameter2);
        },
        toggleTabs (index) { // 状态筛选
            this.newIndex = index;
            if (index === 3) {
                this.parameter.data.status = '';
            } else {
                this.parameter.data.status = index;
            }
            // 0：上架，1：下架，2：作废
            this.parameter2 = {
                'keywords': this.mykeywords, // 关键字搜索
                'productName': this.selectedProduct.goodsName, // 品名
                'serviceTypeId': this.transactionType, // 服务类型
                'code': this.mycode, // 服务类型
                'companyId': JSON.parse(localStorage.getItem('userInfo')).companyId // 客户ID
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
                'productName': this.selectedProduct.goodsName, // 品名
                'serviceTypeId': this.transactionType, // 服务类型
                'code': this.mycode, // 服务类型
                'companyId': JSON.parse(localStorage.getItem('userInfo')).companyId // 客户ID
            };
            this.getInfo2(this.parameter2);
        },
        getInfo (state) { // 获取信息
            this.$http.post(this.$api.account.supplySearch, this.parameter).then(res => {
                if (res.data.code === 0) {
                    this.data = res.data.data;
                    for (let i = 0; i < this.data.list.length; i++) {
                        if (this.data.list[i].status === 0) {
                            this.data.list[i].status = '待受理';
                        } else if (this.data.list[i].status === 1) {
                            this.data.list[i].status = '已受理';
                        } else if (this.data.list[i].status === 2) {
                            this.data.list[i].status = '已拒绝';
                        }
                    }
                    this.total = res.data.data.total;
                    this.pageNum = res.data.data.pageNum;
                    console.log(this.total);
                    // 0 待受理  1 已受理 2 已拒绝
                }
            });
            this.$http.get(this.$api.account.types).then(res => {
                if (res.data.code === 0) {
                    console.log(res.data.data);
                    this.transactionOption = res.data.data;
                }
            });
        },
        getInfo2 (state) { // 获取信息
            //    数量接口
            this.$http.post(this.$api.account.supplyCount, this.parameter2).then(res => {
                if (res.data.code === 0) {
                    this.dataCount = [];
                    for (let i in res.data.data) {
                        this.dataCount.push(res.data.data[i]);
                    }
                    console.log(this.dataCount);
                }
            });
        },
        goPage (data) {
            if (data) {
                this.$router.push({name: 'viewList', query: {myId: data.id}});
            } else {
                this.$router.push({name: 'addList'});
            }
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
                right: 0px;
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
                }
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
                padding: 0 6px;
                width: 80px;
                text-align: center;
                &.active {
                    color: $color-a-active;
                    border-bottom: 1px solid $color-a-active
                }
            }
            li:hover{
                cursor: pointer;
            }
            ul li:not(:first-child) {
                position: relative;
                margin-left: 20px;
            }
            .search-btn {
                margin-right: 10px;
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
    }
</style>
