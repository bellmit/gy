<!--suppress ALL -->
<template>
    <div class="payment-list">
        <div class="new-title-public">
            付款单
        </div>
        <div class="payment-list-tabs">
            <!-- 开始 -->
            <div class="selected">
                <ul>
                    <li :class="{ active: newIndex==0 }" @click="toggleTabs(0)">{{tabsFirst}}</li>
                    <li :class="{ active: newIndex==6 }" @click="toggleTabs(6)">{{tabsSixth}}</li>
                    <li :class="{ active: newIndex==1 }" @click="toggleTabs(1)">{{tabsSecond}}</li>
                    <li :class="{ active: newIndex==2 }" @click="toggleTabs(2)">{{tabsThird}}</li>
                    <li :class="{ active: newIndex==4 }" @click="toggleTabs(4)">{{tabsFourth}}</li>
                    <li :class="{ active: newIndex==5 }" @click="toggleTabs(5)">{{tabsFifth}}</li>
                </ul>
                <div class="fr">
                    <div class="search-box">
                        <input type="search" v-model="queryCriteria" placeholder="请输入品名/单号">
                        <!-- <button @click="search">搜索</button> -->
                        <i  @click="getPaymentList(1)" class="iconfont icon-search"></i>
                    </div>
                    <span class="search-btn" @click="isSeniorSearch =!isSeniorSearch">高级搜索<i
                        class="iconfont" :class="isSeniorSearch ? 'icon-arrow-up' : 'icon-arrow-down'"></i></span>
                </div>
            </div>
            <!-- 结束 -->
            <div>
                <div class="">
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
                                <span class="l">合同编号</span>
                                <input class="gy-input" v-model="contractCode" placeholder="请输入" type="text">
                            </div>
                            <div class="gy-form-group">
                                <span class="l">收款企业</span>
                                <input @click="blur22" type="text" class="gy-input" placeholder="请输入" v-model="receiveCompanyIdname" @keyup.enter="onelist1click2">
                                <i class="iconfont icon-mySearch searchposition"  @click="onelist1click2"></i>
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
                            <div class="gy-form-group">
                                <span class="l">付款类型</span>
                                <el-radio-group v-model="payMethod">
                                    <el-radio :label="''">全部</el-radio>
                                    <el-radio :label="2">保证金</el-radio>
                                    <el-radio :label="1">货款</el-radio>
                                    <el-radio :label="3">结算</el-radio>
                                    <el-radio :label="4">运费</el-radio>
                                </el-radio-group>
                                <i class="iconfont icon-search" @click="getPaymentList(2)"></i>
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
                    <!-- 开始 -->
                  <div class="paymentList table-wrap">
                        <table class="gy-table">
                            <thead>
                                <tr>
                                    <th>付款单号</th>
                                    <th>收款企业</th>
                                    <th>付款单状态</th>
                                    <th>订单编号/合同编号</th>
                                    <th>付款金额(元)</th>
                                    <th>支付方式</th>
                                    <th>付款类型</th>
                                    <th>付款日期</th>
                                </tr>
                            </thead>
                            <tbody v-if="resultList.length !== 0">
                                <tr v-for="(item, index) in resultList" :key="index" @click="gotoDetail(item.id, item.payStatus)">
                                    <td class="wid150">{{item.payNumber}}</td>
                                    <td><span class="nowrap">{{item.receiveCompanyName}}</span></td>
                                    <td>{{item.payStatus|paymentStatus}}</td>
                                    <td>{{item.orderNumber}}<br/><span style="color: #E0370F">{{item.contractCode}}</span></td>
                                    <td class="wid150 align-r">{{item.payTotalStr | numToCash(2) }}</td>
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
                        <div class="departmentName">共 {{itemTotal}} 条记录</div>

                        <!-- jieshu  -->
                        <form method="POST" :action=uploadUrl id="hiddenForm" ref="hiddenForm">
                            <input type="text" name="dsl" :value="JSON.stringify(getFormValue())" hidden/>
                        </form>
                        <el-pagination
                            background
                            @current-change="changeSelect"
                            @size-change="sizeChange"
                            layout="prev, pager, next"
                            style="margin: 20px 0 30px 0;"
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
                disabledDate: (time) => {
                    if (this.endDate) {
                        return time.getTime() > this.endDate;
                    }
                    return time.getTime() > Date.now();
                }
            },
            endDateOptions: {
                disabledDate: (time) => {
                    if (this.startDate) {
                        return time.getTime() < this.startDate;
                    }
                    return time.getTime() > Date.now();
                }
            },
            startDate: '',
            endDate: '',
            orderNumber: '',
            contractCode: null,
            pageNo: 1,
            pageSize: 10,
            itemTotal: 0,
            // (登录用户的)企业类型
            companyType: 0,
            uploadUrl: process.env.API_ROOT_MAIN + '/trade/pay/v1/billPayment/exportExcel',
            // 收款企业
            componyOptions: [],
            receiveCompanyId: '',
            // 付款单状态
            payStatusOptions: this.$constant.paymentStatus,
            payStatusOptionsForTab: this.$constant.paymentStatus.filter(item => item.label !== '支付中'),
            payStatus: 0,
            // 支付方式
            tradeModeOptions: this.$constant.tradeMode,
            tradeMode: null,
            payBillType: '',
            resultList: [],
            isSeniorSearch: false, // 高级搜索
            payMethod: '',
            tabsFirst: '全部',
            tabsSecond: '付款申请',
            tabsSixth: '审批中',
            tabsThird: '财务付款',
            tabsFourth: '收款确认',
            tabsFifth: '已失效',
            onelist2Show: false,
            onelist2: [],
            receiveCompanyIdname: '',
            needControlFlg: null // 查询是否要强控, 1:要强控
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
        aWeek () {
            const me = this;
            // this.endDate = this.$tools.formatDate(new Date(), 'yyyyMMdd');
            // this.startDate = this.$tools.formatDate(new Date(new Date().getTime() - 3600 * 1000 * 24 * 7), 'yyyyMMdd');
            this.isWeek = true;
            this.isMonth = false;
            // 查询供应商
            me.$http.get(me.$api.account.company_rel_xref + '?type=1')
                .then(function (response) {
                    if (response.data.code === 0) {
                        me.componyOptions = response.data.data.xrefInfo;
                        me.companyType = response.data.data.companyType;
                    }
                });

            // 查询是否要强控
            let user = JSON.parse(localStorage.getItem('userInfo'));
            if (user) {
                me.$http.get(me.$api.account.companyInfo + '/' + user.companyId)
                    .then(res => {
                        let r = res.data.data;
                        me.needControlFlg = r.needControl;
                        if (me.needControlFlg == null || me.needControlFlg === undefined) {
                            me.needControlFlg = 0;
                        }
                    });
            }
        },
        setPaymentStatus (tabName) {
            const mapList = {
                first: 0,
                second: 1,
                third: 2,
                fourth: 4,
                fifth: 5,
                sixth: 6
            };
            this.payStatus = this.$constant.paymentStatus[mapList[tabName]].value;
        },
        toggleTabs (index) {
            this.pageNo = 1;
            this.newIndex = index;
            // this.setPaymentStatus(tab.name);
            this.payStatus = this.$constant.paymentStatus[index].value;
            this.getPaymentList(3);
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
            this.getPaymentList();
        },
        sizeChange (val) {
            console.log(val);
            this.pageSize = val;
            this.getPaymentList();
        },
        gotoDetail (itemId, payStatus, f) {
            // 根据不同状态跳转到各自业务画面（目前有确认，完成两个）
            if (payStatus === 10) {
                // 已创建
                this.$router.push({path: '/my/payment/confirm', query: {paymentId: itemId, fromFinance: f}});
            } else if (payStatus === 20 || payStatus === 40 || payStatus === 50 || payStatus === 60) {
                // 已确认
                this.$router.push({path: '/my/payment/info', query: {paymentId: itemId}});
            } else if (payStatus === 8) {
                // 如果是审批中
                if (this.needControlFlg === 1) {
                    // 若必须强控，则去详情页，等待审批完成
                    this.$router.push({path: '/my/payment/info', query: {paymentId: itemId}});
                } else {
                    // 其他，去操作页
                    this.$router.push({path: '/my/payment/confirm', query: {paymentId: itemId}});
                }
            } else {
                console.log('未知付款单状态 status=' + payStatus + ', id=' + itemId);
            }
        },
        getFormValue () {
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
                endCreatedDate: endDateQry
            };
            return params;
        },
        exportData2Excel () {
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
                endCreatedDate: endDateQry
            };
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            me.$http({
                method: 'post',
                url: me.$api.payment.exportData,
                headers,
                data: params,
                responseType: 'stream'
            }).then(
                (res) => { // 处理返回的文件流
                    const content = res;
                    const blob = new Blob([content]);
                    const fileName = '付款单.xls';
                    if ('download' in document.createElement('a')) { // 非IE下载
                        const elink = document.createElement('a');
                        elink.download = fileName;
                        elink.style.display = 'none';
                        elink.href = URL.createObjectURL(blob);
                        document.body.appendChild(elink);
                        elink.click();
                        URL.revokeObjectURL(elink.href); // 释放URL 对象
                        document.body.removeChild(elink);
                    } else { // IE10+下载
                        navigator.msSaveBlob(blob, fileName);
                    }
                }
            ).catch(function (error) {
                console.log(error);
            });
        },
        getPaymentList (opeType) {
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
                    contractCode: me.contractCode,
                    payBillType: me.payBillType, // 付款单分类
                    payStatus: me.payStatus,
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
                    payStatus: me.payStatus,
                    tradeMode: me.tradeMode, // 支付方式
                    receiveCompanyId: me.receiveCompanyId,
                    staCreatedDate: startDateQry,
                    endCreatedDate: endDateQry,
                    payMethod: me.payMethod
                };
            }
            me.lastOpeType = opeType;
            me.$http.post(me.$api.payment.paymentList, params
            ).then(function (response) {
                if (response.data.code === 0) {
                    let resData = response.data.data.rows;
                    resData.forEach(item => {
                        item.payTime = me.$tools.parseDate(item.payTime);
                        // item.orderStatus = me.setOrderStatus(item.orderStatus);
                    });
                    me.resultList = resData;
                    me.itemTotal = response.data.data.total;
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        getTopayList () {
            this.$http.get(this.$api.payment.topaylist)
                .then(res => {
                    if (res.data.data.length > 0) {
                        let val = res.data.data[0];
                        this.$confirm(`当前存在付款单${val.payNumber}没有全部付款，是否继续付款？`, '提示', {type: 'warning'})
                            .then(() => {
                                this.gotoDetail(val.id, 10, 1);
                            });
                    }
                });
        },
        clickPayBillTypeItem (value) {
            const me = this;
            // 查询供应商
            me.$http.get(me.$api.account.company_rel_xref)
                .then(function (response) {
                    if (response.data.code === 0) {
                        me.componyOptions = response.data.data.xrefInfo;
                    }
                });
        },
        paymentStatusCount () {
            let _this = this;
            this.$http.get(this.$api.payment.paymentStatusCount)
                .then(function (response) {
                    if (response.data.code === 0) {
                        // if (response.data.data['0']) {
                        //     _this.tabsFirst = '全部 (' + response.data.data['0'] + ')';
                        // }
                        if (response.data.data['10']) {
                            _this.tabsSecond = '付款申请 (' + response.data.data['10'] + ')';
                        }
                        if (response.data.data['8']) {
                            _this.tabsSixth = '审批中 (' + response.data.data['8'] + ')';
                        }
                        if (response.data.data['20']) {
                            _this.tabsThird = '财务付款 (' + response.data.data['20'] + ')';
                        }
                        if (response.data.data['50']) {
                            _this.tabsFourth = '收款确认 (' + response.data.data['50'] + ')';
                        }
                        if (response.data.data['60']) {
                            _this.tabsFifth = '已失效 (' + response.data.data['60'] + ')';
                        }
                    }
                });
        }
    },
    created: function () {
        this.setPaymentStatus(this.activeName);
        this.aWeek();
        this.getPaymentList(2);
        this.clickPayBillTypeItem(1);
        this.paymentStatusCount();
        this.getTopayList();
    }
};
</script>
<style lang="scss" scoped>
    .payment-list{
        .clearfixx{
            .gy-form-group{
                padding:8px 30px 8px 100px;
                // min-height: 35px;
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
                .icon-search {
                    position: absolute;
                    right: 20px;
                    top: 10px;
                }
            }
        }
        .table-wrap{
            margin: 10px 16px 0 16px;
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
                float: left;
                padding: 0 5px;
                color: #666666;
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
                font-size: 14px;
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
        .newrel{
            .newabl{
                position: absolute;
                top: 0px;
                right: 7px;
            }
        }
        .export-box {
            text-align: right;
            padding: 10px 16px 0;
        }
        .payment-list {
            background: #fff;
        }

        .payment-list-tabs {
            padding: 20px 0 0 0;
        }
    }
    /deep/ .el-radio:not(:last-child){
        margin-right: 15px;
        .el-radio__label {
            color: $color-main;
        }
    }
    /deep/ .el-radio+.el-radio {
        margin-left: 0!important;
    }
    /deep/ .el-range-separator,/deep/ .el-input__icon{
        line-height: 24px;
    }
    /deep/ .el-input__inner{
        height: 30px;
        font-size: 14px;
    }
</style>
