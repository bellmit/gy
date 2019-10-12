<template>
    <div class="userCenter-main in-and-out">
        <div class="userCenter-main-tit">
            <div class="userCenter-main-tit-left">应付汇总</div>
            <div class="userCenter-main-tit-right">
                <el-button class="userCenter-main-tit-right-btn" :isActive="isQuery"
                           @click="toggleQueryAndDownload(true)">查询
                </el-button>
                <el-button class="userCenter-main-tit-right-btn" :isActive="!isQuery"
                           @click="toggleQueryAndDownload(false)">导出
                </el-button>
            </div>
        </div>
        <div class="userCenter-main-content">
            <div class="userCenter-main-content-query">
                <p class="userCenter-main-content-query-tit">请设置查询条件</p>
                <div>
                    <div class="content-query-item">
                        <span class="content-query-item-tit">起止日期：</span>
                        <div class="date-picker">
                            <el-date-picker
                                v-model="startDate"
                                type="date"
                                @focus="handleFocus"
                                :picker-options="startDateOptions"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyyMMdd"
                                placeholder="选择开始日期">
                            </el-date-picker>
                            <span>  -  </span>
                            <el-date-picker
                                v-model="endDate"
                                type="date"
                                @focus="handleFocus"
                                :picker-options="endDateOptions"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyyMMdd"
                                placeholder="选择结束日期">
                            </el-date-picker>
                            <el-button class="date-picker-shortcut date-picker-shortcut-aWeek" :isActive="isWeek"
                                       @click="aWeek">最近一周
                            </el-button>
                            <el-button class="date-picker-shortcut" :isActive="isMonth" @click="aMonth">最近一月</el-button>
                        </div>
                    </div>
                    <div class="content-query-item">
                        <span class="content-query-item-tit">供应商：</span>
                        <el-input class="content-query-item-num content-query-item-iput" v-model="partnerName"
                                  placeholder=""></el-input>
                    </div>

                    <div class="content-query-item">
                        <span class="content-query-item-tit">是否结清：</span>
                        <el-radio v-model="radio" label="1">已结清</el-radio>
                        <el-radio v-model="radio" label="2">未结清</el-radio>
                    </div>

                </div>
            </div>
            <div class="userCenter-query-result">
                <el-row class="userCenter-query-result-th">
                    <el-col :span="0">
                        <div class="grid-content">供应商ID</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">供应商</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">期初应付余额(万)</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">本期采购金额(万)</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">本期付款金额(万)</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">期末应付余额(万)</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">操作</div>
                    </el-col>
                </el-row>
                <ul class="userCenter-query-result-tb">
                    <li class="userCenter-query-result-tb-item" v-for="(item, index) in result" :key="item.num"
                        :class="{evenItem:index%2!==0}">
                        <el-col :span="0">
                            <div class="grid-content"></div>
                            {{item.sellerId}}
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content">{{item.companyName}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content"></div>
                            {{item.startNeedPay}}
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content">{{item.purchaseTotal}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content"></div>
                            {{item.payTotal}}
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content">{{item.endNeedPay}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content">
                                <router-link
                                    :to="{path:'/my/report/statistic/payment/detail',query:{companyid:item.sellerId,companyName:item.companyName}}">
                                    查看明细
                                </router-link>
                            </div>
                        </el-col>

                    </li>
                </ul>
                <el-pagination
                    class="pagination-box"
                    background
                    @current-change="changeSelect"
                    layout="prev, pager, next"
                    :current-page.sync="pageNo"
                    :page-size="pageSize"
                    :total="itemTotal">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'paymentSummary',
    data () {
        return {
            input: '',
            isQuery: true,
            isWeek: true,
            isMonth: false,
            radio: '1',
            itemTotal: 0,
            pageNo: 1,
            pageSize: 10,
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
            partnerName: '',
            result: []
        };
    },
    methods: {
        toggleQueryAndDownload (isQuery) {
            const me = this;
            let startDateQry = '';
            let endDateQry = '';
            if (me.startDate) {
                startDateQry = me.startDate + '000000';
            }
            if (me.endDate) {
                endDateQry = me.endDate + '235959';
            }
            this.isQuery = isQuery;
            this.$http.post(this.$api.report.paymentSummary,
                {
                    pageNo: me.pageNo,
                    pageSize: me.pageSize,
                    startTime: startDateQry,
                    endTime: endDateQry,
                    partnerName: me.partnerName,
                    settleAccounts: me.radio
                }
            ).then(function (response) {
                if (response.data.code === 0) {
                    let resData = response.data.data.paymentReport.payments;
                    resData.forEach(item => {
                    });
                    me.result = resData;
                    me.itemTotal = response.data.data.total;
                }
            });
        },
        aWeek (event) {
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            // this.endDate = new Date().getTime();
            // this.startDate = start.getTime();
            this.isWeek = true;
            this.isMonth = false;
        },
        changeSelect (pageNo) {
            this.pageNo = pageNo;
            this.toggleQueryAndDownload(true);
        },
        aMonth (event) {
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            // this.endDate = new Date().getTime();
            // this.startDate = start.getTime();
            this.isWeek = false;
            this.isMonth = true;
        },
        handleFocus () {
            this.isWeek = false;
            this.isMonth = false;
        }
    },
    created: function () {
        this.aWeek(event);
    }
};
</script>
