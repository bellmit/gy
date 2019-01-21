<template>
    <div class="payment-list">
        <div class="new-title-public">
            收款单列表
        </div>
        <div class="payment-list-tabs">
            <div class="selected">
                <ul>
                    <li :class="{ active: newIndex==0 }" @click="toggleTabs(0)">{{tabsFirst}}</li>
                    <li :class="{ active: newIndex==1 }" @click="toggleTabs(1)">{{tabsSecond}}</li>
                    <li :class="{ active: newIndex==2 }" @click="toggleTabs(2)">{{tabsThird}}</li>
                    <li :class="{ active: newIndex==3 }" @click="toggleTabs(3)">{{tabsFourth}}</li>
                </ul>
                <div class="fr">
                    <div class="search-box">
                        <input type="search" v-model="queryCriteria" placeholder="请输入品名/单号">
                        <!-- <button @click="search">搜索</button> -->
                        <i  @click="getCollectionList(1)" class="iconfont icon-search"></i>
                    </div>
                    <span class="search-btn" @click="isSeniorSearch =!isSeniorSearch">高级搜索<i
                        class="iconfont icon-arrow-down"></i></span>
                </div>
            </div>
            <div>
                <div class="payment-list-content">
                    <!-- 开始修改 -->
                    <div class="clearfixx clearfix">
                        <div class="search-form" v-show="isSeniorSearch">
                            <div class="gy-form-group">
                                <span class="l">起止日期</span>
                                <!-- <div class="date-picker">
                                    <el-date-picker
                                        v-model="startDate"
                                        type="date"
                                        @focus="handleFocus"
                                        value-format="yyyyMMdd"
                                        placeholder="开始日期">
                                    </el-date-picker>至<el-date-picker
                                        v-model="endDate"
                                        type="date"
                                        @focus="handleFocus"
                                        value-format="yyyyMMdd"
                                        placeholder="结束日期">
                                    </el-date-picker>
                                </div> -->
                               <div class="">
                                    <el-date-picker
                                        v-model="createDate"
                                        type="daterange"
                                        align="center"
                                        unlink-panels
                                        value-format="yyyyMMdd"
                                        range-separator="至"
                                        start-placeholder = '开始日期'
                                        end-placeholder= '结束日期'
                                        :picker-options="pickerOptions">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="gy-form-group">
                                <span class="l">订单编号</span>
                                <input class="gy-input" v-model="orderNumber" placeholder="请输入" type="text">
                            </div>
                            <div class="gy-form-group cl">
                                <span class="l">支付方式</span>
                                <el-select v-model="tradeMode" placeholder="请选择">
                                    <el-option
                                        v-for="item in tradeModeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="gy-form-group">
                                <span class="l">付款企业</span>
                                <input @click="blur22" type="text" class="gy-input" placeholder="请输入" v-model="receiveCompanyIdname" @keyup.enter="onelist1click2">
                                <i class="iconfont icon-search searchposition"  @click="onelist1click2"></i>
                                <ul class="listulaaa"  v-show="onelist2Show">
                                    <li v-for="(item,index) in onelist2" :key="index" @click="onelist1select2(item)" v-if="onelist2.length>0">
                                        {{item.companyName}}
                                    </li>
                                    <li class="none-tips" v-if="onelist2.length === 0">没有搜到相关公司</li>
                                </ul>
                                <!-- <el-row class="newrel">
                                    <el-col style="margin-right: 3%" :span="4">收款企业</el-col>
                                    <el-col :span="19">
                                        <input @click="blur22" type="text" class="gy-input" v-model="receiveCompanyIdname" @keyup.enter="onelist1click2">
                                    </el-col>
                                    <el-col class="newabl" :span="1"> <i class="iconfont icon-search"  @click="onelist1click2"></i></el-col>
                                    <ul class="listulaaa"  v-show="onelist2Show">
                                        <li v-for="(item,index) in onelist2" :key="index" @click="onelist1select2(item)" v-if="onelist2.length>0">
                                            {{item.companyName}}
                                        </li>
                                        <li class="none-tips" v-if="onelist2.length === 0">没有搜到相关公司</li>
                                    </ul>
                                </el-row> -->
                            </div>
                        </div>
                        <div class="payment-list-content-item-box" v-show="isSeniorSearch">
                            <div class="payment-list-content-item clearfix" style="width: 97%;">
                                <el-row>
                                    <el-col :span="2">付款类型</el-col>
                                    <el-col :span="12" style="margin-left: 11px;">
                                        <el-radio-group v-model="payMethod">
                                            <el-radio :label="''">全部</el-radio>
                                            <el-radio :label="2">保证金</el-radio>
                                            <el-radio :label="1">货款</el-radio>
                                            <el-radio :label="3">结算</el-radio>
                                            <el-radio :label="4">运费</el-radio>
                                        </el-radio-group>
                                    </el-col>
                                    <el-col :span="2">
                                    <i class="iconfont icon-search" @click="getCollectionList(2)"></i>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                    <!-- 结束修改 -->
                    <div class="export-box">
                        <el-row>
                            <el-col :span="24">
                                <button @click="downloadData" class="gy-button-extra">导出</button>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- table开始 -->
                    <div class="table-box table-wrap">
                        <table class="gy-table">
                            <thead>
                                <tr>
                                    <th>收款单号</th>
                                    <th>付款企业</th>
                                    <th>收款单状态</th>
                                    <th>订单编号</th>
                                    <th>收款金额</th>
                                    <th>支付方式</th>
                                    <th>收款类型</th>
                                    <th>收款日期</th>
                                </tr>
                            </thead>
                            <tbody v-if="resultList.length !== 0">
                                <tr v-for="(item, index) in resultList" :key="index" @click="gotoDetail(item.id,item.collectionStatus)">
                                    <td class="wid150">{{item.payNumber}}</td>
                                    <td><span class="nowrap">{{item.payCompanyName}}</span></td>
                                    <td>{{item.collectionStatus|collectionStatus}}</td>
                                    <td>{{item.orderNumber}}</td>
                                    <td class="wid150">{{item.payTotal | numToCash(2) }}</td>
                                    <td>{{item.tradeMode|tradeMode}}</td>
                                    <td>{{item.payMethod|payMethod}}</td>
                                    <td>{{item.payTime === ''? '-' : item.payTime}}</td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="15" class="null-td" style="text-align:center">没有找到可显示的数据...</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="departmentName">共计{{itemTotal}}条记录</div>
                        <form method="POST" :action=exportUrl id="hiddenForm" ref="hiddenForm">
                            <input type="text" name="dsl" :value="JSON.stringify(getFormValue())" hidden/>
                        </form>
                        <el-pagination
                            class="pagination-box"
                            background
                            @current-change="changeSelect"
                            @size-change="sizeChange"
                            style="margin: 20px 0 30px 0;"
                            layout="prev, pager, next"
                            :current-page.sync="pageNo"
                            :page-size="pageSize"
                            :total="itemTotal">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'payment-list',
    data () {
        return {
            newIndex: 0,
            queryCriteria: '',
            activeName: 'first',
            lastOpeType: 0,
            isWeek: true,
            isMonth: false,
            createDate: '', // 存时间
            pickerOptions: { // 日期
                shortcuts: [{
                    text: '最近一周',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick (picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            startDateOptions: {
                // disabledDate: (time) => {
                //     if (this.endDate) {
                //         return time.getTime() > this.endDate;
                //     }
                //     return time.getTime() > Date.now();
                // }
            },
            endDateOptions: {
                disabledDate: (time) => {
                    if (this.startDate) {
                        return time.getTime() < this.s;
                    }
                    return time.getTime() > Date.now();
                }
            },
            startDate: '',
            endDate: '',
            orderNumber: '',
            pageNo: 1,
            pageSize: 10,
            itemTotal: 0,

            // 采购单状态
            companyType: 0,
            collectionStatus: '',
            // 付款企业
            componyOptions: [],
            receiveCompanyId: '',

            // 支付方式
            tradeModeOptions: this.$constant.tradeMode,
            tradeMode: '',
            payBillType: '',
            resultList: [],

            isSeniorSearch: false, // 高级搜索
            payMethod: '',
            exportUrl: process.env.API_ROOT_MAIN + '/trade/pay/v1/collection/exportExcel',

            tabsFirst: '全部',
            tabsSecond: '未确认',
            tabsThird: '已确认',
            tabsFourth: '已失效',
            onelist2Show: false,
            onelist2: [],
            receiveCompanyIdname: ''
        };
    },
    methods: {
        // 修改公司名称
        onelist1click2 () {
            var that = this;
            that.onelist2Show = true;
            that.$http.post(that.$api.order.creatOrderCompanies, {
                'companyTypeId': 1, // 1:交易公司  2：承运商
                'name': this.receiveCompanyIdname
            }).then(function (res) {
                that.onelist2 = res.data.data;
            }).catch(() => {
            });
            that.receiveCompanyId = '';
        },
        onelist1select2 (item) {
            var that = this;
            that.receiveCompanyIdname = item.companyName;
            that.receiveCompanyId = item.companyId;
            that.onelist2Show = false;
        },
        blur22 () {
            this.onelist2Show = false;
            this.receiveCompanyIdname = '';
            this.receiveCompanyId = '';
        },
        seniorSearch () {
            let _this = this;
            _this.isSeniorSearch = !_this.isSeniorSearch;
        },
        aWeek () {
            const me = this;
            // this.endDate = this.$tools.formatDate(new Date(), 'yyyyMMdd');
            // this.startDate = this.$tools.formatDate(new Date(new Date().getTime() - 3600 * 1000 * 24 * 7), 'yyyyMMdd');
            this.isWeek = true;
            this.isMonth = false;

            // 查询供应商
            me.$http.get(me.$api.account.company_rel_xref + '?type=2')
                .then(function (response) {
                    if (response.data.code === 0) {
                        me.componyOptions = response.data.data.xrefInfo;
                        me.companyType = response.data.data.companyType;
                    }
                });
        },
        setPaymentStatus (tabName) {
            const mapList = {
                first: 0,
                second: 1,
                third: 2,
                fourth: 3
            };
            this.collectionStatus = this.$constant.collectionStatus[mapList[tabName]].value;
        },
        toggleTabs (index) {
            this.pageNo = 1;
            this.newIndex = index;
            // this.setPaymentStatus(tab.name);
            this.collectionStatus = this.$constant.collectionStatus[index].value;
            this.getCollectionList(3);
        },
        downloadData () {
            this.$refs.hiddenForm.submit();
        },
        handleFocus () {
            this.isWeek = false;
            this.isMonth = false;
        },
        changeSelect (pageNo) {
            this.pageNo = pageNo;
            this.getCollectionList();
        },
        sizeChange (val) {
            this.pageSize = val;
            this.getCollectionList();
        },
        gotoDetail (itemId, payStatus) {
            // 根据不同状态跳转到各自业务画面
            console.log(itemId + '------' + payStatus);
            if (payStatus === 10) {
                // 已创建
                this.$router.push({path: '/my/collection/confirm', query: {collectionId: itemId}});
            } else if (payStatus === 20 || payStatus === 50 || payStatus === 60) {
                // 其他
                this.$router.push({path: '/my/collection/info', query: {collectionId: itemId}});
            } else {

            }
        },
        getFormValue: function () {
            const me = this;
            let params = null;
            let startDateQry = '';
            let endDateQry = '';
            if (me.createDate) {
                startDateQry = me.createDate[0] + '000000';
                endDateQry = me.createDate[1] + '235959';
            }
            params = {
                pageNo: me.pageNo,
                pageSize: me.pageSize,
                orderNumber: me.orderNumber,
                payBillType: me.payBillType, // 付款单分类
                payStatus: me.payStatus,
                tradeMode: me.tradeMode, // 支付方式
                receiveCompanyId: me.receiveCompanyId,
                staCreatedDate: startDateQry,
                endCreatedDate: endDateQry,
                payMethod: me.payMethod
            };
            return params;
        },
        getCollectionList (opeType) {
            const me = this;
            let params = null;
            if (opeType === undefined) {
                opeType = me.lastOpeType;
            }
            if (opeType === 1) {
                params = {
                    pageNo: me.pageNo,
                    pageSize: me.pageSize,
                    queryCriteria: me.queryCriteria
                };
            } else if (opeType === 2) {
                let startDateQry = '';
                let endDateQry = '';
                if (me.createDate) {
                    startDateQry = me.createDate[0] + '000000';
                    endDateQry = me.createDate[1] + '235959';
                }
                params = {
                    pageNo: me.pageNo,
                    pageSize: me.pageSize,
                    orderNumber: me.orderNumber,
                    payBillType: me.payBillType, // 付款单分类
                    collectionStatus: me.collectionStatus,
                    tradeMode: me.tradeMode, // 支付方式
                    receiveCompanyId: me.receiveCompanyId,
                    staCreatedDate: startDateQry,
                    endCreatedDate: endDateQry,
                    payMethod: me.payMethod
                };
            } else if (opeType === 3) {
                let startDateQry = '';
                let endDateQry = '';
                if (me.createDate) {
                    startDateQry = me.createDate[0] + '000000';
                    endDateQry = me.createDate[1] + '235959';
                }
                params = {
                    pageNo: me.pageNo,
                    pageSize: me.pageSize,
                    orderNumber: me.orderNumber,
                    payBillType: me.payBillType, // 付款单分类
                    collectionStatus: me.collectionStatus,
                    tradeMode: me.tradeMode, // 支付方式
                    receiveCompanyId: me.receiveCompanyId,
                    staCreatedDate: startDateQry,
                    endCreatedDate: endDateQry,
                    payMethod: me.payMethod
                };
            }
            me.lastOpeType = opeType;

            me.$http.post(me.$api.payment.collectionList, params)
                .then(function (response) {
                    if (response.data.code === 0) {
                        let resData = response.data.data.rows;
                        resData.forEach(item => {
                            item.payTime = me.$tools.parseDate(item.payTime);
                        });
                        me.resultList = resData;
                        me.itemTotal = response.data.data.total;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        clickPayBillTypeItem (value) {
            const me = this;
            // 查询供应商
            me.$http.get(me.$api.account.company_rel_xref + '?type=' + value)
                .then(function (response) {
                    if (response.data.code === 0) {
                        me.componyOptions = response.data.data;
                    }
                });
        },
        collectionStatusCount () {
            let _this = this;
            this.$http.get(this.$api.payment.collectionStatusCount)
                .then(function (response) {
                    if (response.data.code === 0) {
                        // if (response.data.data['0']) {
                        //     _this.tabsFirst = '全部 (' + response.data.data['0'] + ')';
                        // }
                        if (response.data.data['10']) {
                            _this.tabsSecond = '未确认 (' + response.data.data['10'] + ')';
                        }
                        if (response.data.data['20']) {
                            _this.tabsThird = '已确认 (' + response.data.data['20'] + ')';
                        }
                        if (response.data.data['60']) {
                            _this.tabsFourth = '已失效 (' + response.data.data['60'] + ')';
                        }
                    }
                });
        }
    },
    created: function () {
        this.setPaymentStatus(this.activeName);
        this.aWeek();
        this.getCollectionList(2);
        this.collectionStatusCount();
    }
};
</script>

<style lang="scss" scoped>
    .payment-list{
         background: #fff;
        .clearfixx{
            .gy-form-group{
                padding:0px 30px 0px 100px;
                min-height: 35px;
                .gy-input{
                    width: 98%;
                }
                .searchposition{
                    position: absolute;
                    top: 10px;
                    right: 30px;
                }
                .listulaaa{
                    background-color: #fff;
                    width: 65%;
                    max-height: 200px;
                    overflow: auto;
                    position: absolute;
                    top: 41px;
                    z-index: 9;
                    border: 1px solid #e6eaea;
                    border-top: none;
                    // margin-left: 19.5%;
                    li{
                        padding: 5px 10px;
                    }
                    li:hover{
                        cursor: pointer;
                        background-color: #f5f7fa;
                        color: #4a90e2;
                    }
                }
            }
        }
        .table-wrap{
            margin: 10px 15px 0 16px;
            cursor: pointer;
            .gy-table{
                th{
                    color: #666666;
                }
            }
            .nowrap {
                width: 150px;
                display: block;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
        .selected {
            overflow: hidden;
            padding: 0px 30px 10px 16px;
            ul{
                overflow: hidden;
                float: left;
                margin-top: 3px;
            }
            li {
                font-weight: bold;
                float: left;
                padding: 0 5px;
                color: #666666;
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
                margin-left: 15px;
            }
            .search-btn {
                font-size: 14px;
                color: #999999;
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
        .newrel{
            .newabl{
                position: absolute;
                top: 0px;
                right: 0px;
            }
        }
        .export-box {
            text-align: right;
            padding: 10px 16px;
        }
        .payment-list-content-item-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 auto;
            width: 94%;
            color: #333333;
        }

        .payment-list-content-item {
            width: 430px;
            margin-top: 10px;
        }
        .pagination-box {
            text-align: center;
            margin: 30px;
        }

        .payment-list-tabs {
            padding: 20px 0px;
        }
    }
</style>
