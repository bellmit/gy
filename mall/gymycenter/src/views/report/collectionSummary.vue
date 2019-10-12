<template>
    <div class="userCenter-main in-and-out">
        <div class="userCenter-main-tit">
            <div class="userCenter-main-tit-left">应收报表-汇总</div>
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
                        <span class="content-query-item-tit">收付日期：</span>
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
                        <div class="grid-content">客户ID</div>
                    </el-col>
                    <el-col :span="3">
                        <div class="grid-content">客户</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">期初应收余额</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">本期销售金额</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">本期收款金额</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">期末应收余额</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">操作</div>
                    </el-col>
                </el-row>
                <ul class="userCenter-query-result-tb">
                    <li class="userCenter-query-result-tb-item" v-for="(item, index) in result" :key="item.num"
                        :class="{evenItem:index%2!==0}">
                        <el-col :span="0">
                            <div class="grid-content">{{item.buyerId}}</div>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content">{{item.buyerName}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content">{{item.startNeedCollection}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content">{{item.sellerTotal}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content">{{item.collectionTotal}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content">{{item.endNeedCollection}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content">
                                <router-link to="/my/report/statistic/collection/detail">查看明细</router-link>
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
    name: 'collectionSummary',
    data () {
        return {
            input: '',
            radio: '1',
            itemTotal: 0,
            isQuery: true,
            isWeek: true,
            isMonth: false,
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
            pageNo: 1,
            pageSize: 10,
            endDate: '',
            partnerName: '',
            result: []
        };
    },
    methods: {
        checkboxChange () {
            if (this.checkedType.length > 1) {
                this.checkedType = [this.checkedType[1]];
            }
        },
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
            this.$http.post(this.$api.report.collectionSummary, {
                pageNo: me.pageNo,
                pageSize: me.pageSize,
                startTime: startDateQry,
                endTime: endDateQry,
                partnerName: me.partnerName,
                settleAccounts: me.radio
            }).then(function (res) {
                if (res.data.code === 0) {
                    let resData = res.data.data.rows;
                    resData.forEach(item => {
                    });
                    me.result = resData;
                    me.itemTotal = res.data.data.total;
                }
            });
        },
        changeSelect (pageNo) {
            this.pageNo = pageNo;
            this.toggleQueryAndDownload(true);
        },
        aWeek (event) {
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            // this.endDate = new Date().getTime();
            // this.startDate = start.getTime();
            this.isWeek = true;
            this.isMonth = false;
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
        const me = this;
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        this.aWeek(event);
        me.$http({
            method: 'post',
            url: me.$api.report.collectionSummary,
            headers,
            data: {
                pageNo: me.pageNo,
                pageSize: me.pageSize
            }
        }).then(function (response) {
            if (response.data.code === 0) {
                let resData = response.data.data.rows;
                resData.forEach(item => {
                });
                me.result = resData;
                me.itemTotal = response.data.data.total;
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
};
</script>
