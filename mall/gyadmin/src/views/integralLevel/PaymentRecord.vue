<template>
    <div class="PaymentRecord">
        <div class="m-panel">
            <div class="selected">
                <div class="gy-h4">积分支付记录</div>
                <div class="fr">
                    <div class="search-box">
                        <input type="search" v-model="data.keywords" placeholder="请输入订单号">
                        <button><i class="iconfont icon-search" @click="getList(1)"></i></button>
                    </div>
                    <span class="search-btn" @click="toggleSelect =!toggleSelect">高级搜索<i class="iconfont" :class="{'icon-arrow-down': !toggleSelect, 'icon-arrow-up': toggleSelect}"></i></span>
                </div>
            </div>
            <div class="gy-form-box-14" v-show="toggleSelect">
                <div class="gy-form-group">
                    <span class="l">付款公司</span>
                    <span>
                        <label>
                            <input @click="receivablesBlur" placeholder="请选择" type="text" class="gy-input" @keyup.enter="receivablesclick"  v-model="receivablesName">
                        </label>
                        <ul class="listul" v-show="receivablesShow">
                            <li v-for="(item,index) in receivablesCompany" :key="index" @click="receivablesSelect(item)" v-if="receivablesCompany.length > 0">
                                {{item.name}}
                            </li>
                            <li class="none-tips" v-if="receivablesCompany.length === 0">没有搜到相关公司</li>
                        </ul>
                        <i class="iconfont icon-mySearch" @click="receivablesclick"></i>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">收款公司</span>
                    <span>
                        <label>
                            <input @click="paymentBlur" placeholder="请选择" type="text" class="gy-input" @keyup.enter="paymentclick"  v-model="paymentName">
                        </label>
                        <ul class="listul" v-show="  paymentShow">
                            <li v-for="(item,index) in paymentCompany" :key="index" @click="paymentSelect(item)" v-if="paymentCompany.length > 0">
                                {{item.name}}
                            </li>
                            <li class="none-tips" v-if="paymentCompany.length === 0">没有搜到相关公司</li>
                        </ul>
                        <i class="iconfont icon-mySearch" @click="paymentclick"></i>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">订单类型</span>
                    <span>
                        <el-select  v-model="data.orderType" placeholder="请选择">
                            <el-option
                                    v-for="item in orderList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">支付时间</span>
                    <span>
                        <el-date-picker
                                v-model="createDate"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder='开始时间'
                                end-placeholder='结束时间'>
                         </el-date-picker>
                    </span>
                    <i class="iconfont icon-search search_btn" @click="getList(1)"></i>
                </div>
            </div>
        </div>
        <table class="gy-table">
            <thead>
                <tr>
                    <th>订单类型</th>
                    <th>订单号</th>
                    <th>付款单号</th>
                    <th>付款公司/收款公司</th>
                    <th>支付金额(元)</th>
                    <th>消耗积分</th>
                    <th>收款银行账号</th>
                    <th>支付时间</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in list" :key="index">
                    <td>{{getOrder(item.orderType)}}</td>
                    <td>{{item.orderSn}}</td>
                    <td>{{item.payNumber}}</td>
                    <td>
                        {{item.buyerCorpName}}
                        <br>
                        {{item.sellerCorpName}}
                    </td>
                    <td class="align-r">{{item.payTotalStr}}</td>
                    <td class="align-r">{{item.points}}</td>
                    <td>{{item.sellerDepositBank}} {{item.sellerAccount}}</td>
                    <td>{{item.payTime | date(1, 1)}}</td>
                </tr>
            </tbody>
        </table>
        <div class="pagination-wrapper">
            <div class="pagination-total">共 {{total}} 条</div>
            <!-- 翻页 -->
            <el-pagination
                    background
                    :page-size="pageSize"
                    :pager-count="pageCount"
                    :total="total"
                    :current-page.sync="currentPage"
                    layout="prev, pager, next"
                    style="margin-top: 40px;"
                    @current-change="turnPage">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PaymentRecord',
    data () {
        return {
            data: {
                keywords: null, // 搜索关键词
                buyerId: null, // 付款公司
                sellerId: null, // 收款公司
                orderType: null, // 订单类型
                startTime: null, // 开始时间
                endTime: null // 结束时间
            },
            pageSize: 10,
            pageCount: 5,
            total: 0,
            currentPage: 1,
            receivablesName: '',
            receivablesCompany: [],
            paymentName: '',
            paymentCompany: [],
            receivablesShow: false,
            paymentShow: false,
            toggleSelect: false, // 搜索
            createDate: [], // 存时间
            orderList: [{id: null, name: '全部'}, {id: 1, name: '交易订单'}, {id: 2, name: '物流运输订单'}, {id: 3, name: 'ERP订单'}],
            list: []
        };
    },
    created () {
        this.getList(1);
    },
    methods: {
        getList (currentPage) {
            this.data.startTime = this.createDate ? this.createDate[0] : null;
            this.data.endTime = this.createDate ? this.createDate[1] : null;
            let setPara = {
                'data': this.data,
                'pageNum': currentPage,
                'pageSize': this.pageSize
            };
            this.$http.post(this.$api.point.pointConsumption, setPara).then((res) => {
                if (res.data.code === 0) {
                    this.list = res.data.data.list;
                    // // 设置分页信息
                    this.total = res.data.data.total;
                    this.currentPage = res.data.data.pageNum;
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 公司搜索
        receivablesclick () {
            this.receivablesShow = true;
            this.$http.post(this.$api.point.fuzzySearch, {
                'companyName': this.receivablesName
            })
                .then((res) => {
                    if (res.data.code === 0) {
                        this.receivablesCompany = res.data.data;
                    }
                })
                .catch(() => {
                    console.log('出错了');
                });
            this.data.buyerId = '';
        },
        receivablesBlur () {
            this.receivablesShow = false;
            this.receivablesName = '';
            this.data.buyerId = '';
        },
        receivablesSelect (item) {
            this.receivablesName = item.name;
            this.data.buyerId = item.companyId;
            this.receivablesShow = false;
        },
        paymentclick () {
            this.paymentShow = true;
            this.$http.post(this.$api.point.fuzzySearch, {
                'companyName': this.paymentName
            })
                .then((res) => {
                    if (res.data.code === 0) {
                        this.paymentCompany = res.data.data;
                    }
                })
                .catch(() => {
                    console.log('出错了');
                });
            this.data.sellerId = '';
        },
        paymentBlur () {
            this.paymentShow = false;
            this.paymentName = '';
            this.data.sellerId = '';
        },
        paymentSelect (item) {
            this.paymentName = item.name;
            this.data.sellerId = item.companyId;
            this.paymentShow = false;
        },
        turnPage (currentPage) {
            this.getList(currentPage);
        },
        getOrder (orderType) {
            return orderType === 1 ? '交易订单' : orderType === 2 ? '物流运输订单' : orderType === 3 ? '物流运输订单' : '';
        }
    }
};
</script>

<style scoped lang="scss">
    .selected {
        overflow: hidden;
        padding-bottom: 20px;
    }
    .search-btn {
        margin-right: 14px;
        cursor: pointer;
    }

    .search-box {
        display: inline-block;
        width: 216px;
        margin-right: 10px;
        border-bottom: 1px solid $color-light;
        input {
            width: 180px;
            height: 30px;
            color: $color-light;
            border: none;
        }
        button {
            display: inline-block;
            color: $color-main;
            border: none;
            background-color: #fff;
            text-align: right;
            width:auto;
        }
        span {
            color: $color-light;
            padding-left: 20px
        }
    }
    .search_btn{
        position: absolute;
        top: 0;
        right:0;
    }
    .icon-mySearch{
        position: absolute;
        top: 0;
        right:24px;
    }
    .listul{
        background-color: #fff;
        width: calc(100% - 122px);
        max-height: 300px;
        position: absolute;
        top: 31px;
        z-index: 9;
        border: 1px solid #e6eaea;
        border-top: none;
        overflow: auto;
        li{
            padding: 5px 10px;
        }
        li:hover{
            cursor: pointer;
            background-color: #f5f7fa;
            color: #4a90e2;
        }
    }
</style>
<style>
    .PaymentRecord .el-input__inner{
        height:30px;
        padding:0 10px;
    }
</style>
