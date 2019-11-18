<template>
    <div class="order-list customerList">
        <div class="new-title-public">
            开票申请单
        </div>
        <div class="selected">
            <ul>
                <li :class="{ active: formData.data.status === null }" @click="toggleTabs(null)">全部</li>
                <li :class="{ active: formData.data.status === 1 }" @click="toggleTabs(1)">审批中({{dataCount.application || 0}})</li>
                <li :class="{ active: formData.data.status === 2 }" @click="toggleTabs(2)">开票中({{dataCount.makeInvoice || 0}})</li>
                <li :class="{ active: formData.data.status === 3 }" @click="toggleTabs(3)">开票完成({{dataCount.finish || 0}})</li>
                <li :class="{ active: formData.data.status === 4 }" @click="toggleTabs(4)">已拒绝({{dataCount.rebut || 0}})</li>
            </ul>
            <div class="right">
                <div class="search-box">
                    <input type="search" v-model="formData.data.keywords" placeholder="请输入申请单号/品名">
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
                    <div>
                        <input v-model="formData.data.applySn" type="text" placeholder="请输入">
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">订单编号</span>
                    <div>
                        <input v-model="formData.data.orderSn" type="text" placeholder="请输入">
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">买方发票抬头</span>
                    <div style="position: relative;line-height: 1"><input v-model="formData.data.title"
                        type="text" placeholder="请输入" @keyup.enter="searchCompany">
                        <i class="iconfont icon-mySearch" style="display: none" @click.stop="searchCompany"></i>
                        <div class="managerList" v-show="companyShow" v-clickOutside="companyHide">
                            <ul>
                                <li v-for="(item,index) in companyList" :key="index" @click="companySelect(item)" v-if="companyList && companyList.length > 0">
                                    {{item.companyName}}
                                </li>
                                <li class="managerEmpty" @click="companyHide" v-if="companyList && companyList.length === 0">没有搜到相关数据</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">起止日期</span>
                    <div class="search-time">
                        <div class="c">
                            <el-date-picker
                                v-model="formData.data.createdBeginDate"
                                type="date"
                                value-format="timestamp"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <div class="t">至</div>
                        <div class="c">
                            <el-date-picker
                                v-model="formData.data.createdEndDate"
                                type="date"
                                value-format="timestamp"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </div>
                    <i @click="search" class="iconfont icon-search icon-search-supply"></i>
                </div>
            </div>
        </div>
        <div class="mytable">
            <div style="text-align: right"><button @click="downLoad"
                type="button" class="gy-button-extra">导出</button>
            </div>
            <div class="gy-table-wrap">
                <table class="gy-table">
                    <thead>
                    <tr>
                        <th>开票申请单号</th>
                        <th>买方发票抬头</th>
                        <th>开票状态</th>
                        <th>订单编号</th>
                        <th>品名</th>
                        <th>开票金额(元)</th>
                        <th>申请时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody v-if="dataList && dataList.length !== 0">
                    <tr v-for="(item, index) in dataList" :key="index">
                        <td>{{item.applySn}}</td>
                        <td>{{item.title}}</td>
                        <td>{{item.statusStr}}</td>
                        <td>{{item.orderSn}}</td>
                        <td v-if="item.taxInvoiceApplicationDetailList[0]">{{item.taxInvoiceApplicationDetailList[0].productName}}</td>
                        <td v-if="item.taxInvoiceApplicationDetailList[0]">{{item.taxInvoiceApplicationDetailList[0].invoiceAmountStr}}</td>
                        <td class="align-r">{{item.createdDate | date(1)}}</td>
                        <td class="cz">
                            <router-link
                                class="gy-button-view"
                                :to="{name:'billingCenterDetail', query: item}">查看
                            </router-link>
                        </td>
                    </tr>
                    </tbody>
                    <tbody v-else>
                    <tr>
                        <td colspan="9" style="text-align:center">没有找到可显示的数据...</td>
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
                    :total=total>
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
const clickOutside = {
    bind (el, binding) {
        function documentHandler (e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.vueClickOutside = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    unbind (el) {
        document.removeEventListener('click', el.vueClickOutside);
        delete el.vueClickOutside;
    }
};
export default {
    data () {
        return {
            toggleSelect: false,
            formData: {
                data: {
                    keywords: null,
                    'orderSn': null,
                    'status': null,
                    'productName': null,
                    'applySn': null,
                    'title': null,
                    createdBeginDate: null,
                    createdEndDate: null
                },
                'pageNum': 1,
                'pageSize': 10
            },
            dataList: [
                // {
                //     'id': 1,
                //     'valid': 1,
                //     'keywords': null,
                //     'createdDate': 1571198357000,
                //     'updatedDate': 1571645377000,
                //     'createdBy': null,
                //     'updatedBy': null,
                //     'applySn': 'GY1571198358285',
                //     'orderId': 7272,
                //     'orderSn': 'GY19051000007273',
                //     'sellCompanyId': 104,
                //     'sellCompanyName': '上海车拓贸易有限公司',
                //     'buyerCompanyId': 103,
                //     'buyerCompanyName': '上海易车贸易有限公司',
                //     'invoiceType': '0',
                //     'title': '上海国烨控股',
                //     'taxpayerno': 'string',
                //     'bank': '',
                //     'bankAccount': null,
                //     'registeredAddress': 'string',
                //     'phone': 'string',
                //     'email': 'string',
                //     'name': 'string',
                //     'mobile': 'string',
                //     'address': 'address',
                //     'status': 2,
                //     'statusStr': '开票中',
                //     'remark': 'string',
                //     'taxInvoiceApplicationDetailList': [{
                //         'id': 3,
                //         'valid': 1,
                //         'keywords': null,
                //         'createdDate': 1571637258000,
                //         'updatedDate': 1571646920000,
                //         'createdBy': 74,
                //         'updatedBy': 74,
                //         'taxInvoiceApplicationId': 1,
                //         'productName': '低密度聚乙烯,牌号:LD M050X',
                //         'productModel': null,
                //         'productTaxNo': null,
                //         'settlementAmount': 8888,
                //         'remainAmount': null,
                //         'invoiceAmount': 23144545.454578,
                //         'invoiceAmountStr': '23,144,545.45',
                //         'invoicePrice': null,
                //         'invoiceNumber': null,
                //         'realAmount': null,
                //         'unit': '吨'
                //     }]
                // }
            ],
            total: 98,
            dataCount: {
                'application': 0,
                'finish': 0,
                'rebut': 0,
                'makeInvoice': 0
            },
            companyList: [
                // {
                //     companyName: 'aa'
                // }
            ],
            companyShow: false
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            this.search();
            this.searchDataCount();
        },
        search () {
            this.createdEndDate();
            this.$http.post(this.$api.invoice.getInvoiceList, this.formData)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.dataList = res.data.data.list;
                        this.total = res.data.data.total;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        searchDataCount () {
            this.createdEndDate();
            this.$http.post(this.$api.invoice.getInvoiceListStatus, this.formData.data)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.dataCount = res.data.data;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        downLoad () {
            this.createdEndDate();
            let y, m, d, date, time;
            date = new Date();
            y = date.getFullYear();
            m = date.getMonth() + 1;
            d = date.getDate();
            time = y + '' + this.format(m) + '' + this.format(d);
            let name = `${time}开票申请单.xls`;
            this.$tools.downloadFile(this, this.$api.invoice.downLoad, this.formData.data, name);
        },
        format (num) {
            if (parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        },
        createdEndDate () {
            if (this.formData.data.createdEndDate) this.formData.data.createdEndDate = this.formData.data.createdEndDate + (1000 * 60 * 60 * 24 - 1);
        },
        toggleTabs (type) {
            this.formData.data.status = type;
            this.init();
        },
        handleCurrentChange (val) {
            this.formData.pageNum = val;
            this.init();
        },
        searchCompany () {
            this.companyShow = true;
        },
        companyHide () {
            this.companyShow = false;
        }
    },
    directives: {
        clickOutside
    }
};
</script>

<style lang="scss" scoped>
    .order-list {
        .newrel{
            .newabl{
                position: absolute;
                top: 0;
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
                    padding-right: 8px;
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
            right:16px;
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
    .search-time {
        display: flex;
        .c{
            flex: 1;
        }
        .t {
            flex: 0 0 30px;
            text-align: center;
        }
    }
    .icon-mySearch {
        position: absolute;
        right: 0;
        top: 6px;
        color: $color-main!important;
        height: 30px;
    }
    .managerList {
        position: absolute;
        left: 0;
        top: 30px;
        z-index: 999;
        width: 100%;
        background: #fff;
        overflow: auto;
        ul {
            max-height: 260px;
            overflow: auto;
            padding: 10px 0;
            border: 1px solid $color-border;
            li {
                padding: 5px 10px;
                cursor: pointer;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                &:hover {
                    background-color: #f5f7fa;
                    color: #4a90e2;
                }
            }
        }
    }
    .gy-form-group {
        padding-left: 138px;
        .l{
            width: 138px;
        }
    }
</style>
