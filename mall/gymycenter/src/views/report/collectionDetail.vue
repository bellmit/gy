<template>
    <div class="userCenter-main in-and-out">
        <div class="userCenter-main-tit">
            <div class="userCenter-main-tit-left">应收报表明细</div>
            <div class="userCenter-main-tit-right">
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
                                value-format="timestamp"
                                :readonly=true
                                placeholder="选择开始日期">
                            </el-date-picker>
                            <span>  -  </span>
                            <el-date-picker
                                v-model="endDate"
                                type="date"
                                @focus="handleFocus"
                                :picker-options="endDateOptions"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="timestamp"
                                :readonly=true
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
                        <el-input class="content-query-item-num content-query-item-iput" v-model="input"
                                  placeholder=""></el-input>
                    </div>
                </div>
            </div>
            <div class="userCenter-query-result" :summary-method="getSummaries">
                <el-row class="userCenter-query-result">
                    <el-col :span="4">
                        <div class="grid-content"></div>
                        日期
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">单据编号</div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grid-content"></div>
                        单据类型
                    </el-col>
                    <el-col :span="3">
                        <div class="grid-content">金额</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">代收余额</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content">备注</div>
                    </el-col>
                </el-row>
                <ul class="userCenter-query-result-tb" v-if="result.length > 0">
                    <li class="userCenter-query-result-tb-item" v-for="(item, index) in result" :key="item.num"
                        :class="{evenItem:index%2!==0}">
                        <el-col :span="4">
                            <div class="grid-content"></div>
                            {{item.date}}
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content">{{item.collectionNumber}}</div>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content"></div>
                            {{item.collectionType}}
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content">{{item.amountTotal}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content"></div>
                            {{item.balance}}
                        </el-col>
                        <el-col :span="2">
                            <div class="grid-content">{{item.remark}}</div>
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
    name: 'collectionDetail',
    data () {
        return {
            input: '',
            isQuery: true,
            isWeek: true,
            isMonth: false,
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
            value8: '',
            checkedType: ['收款'],
            typies: ['收款', '付款'],
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
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            me.$http({
                method: 'post',
                url: me.$api.report.collectionDetail,
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
        },
        changeSelect (pageNo) {
            this.pageNo = pageNo;
            this.toggleQueryAndDownload(true);
        },
        aWeek: function (event) {
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
        },
        getSummaries (param) {
            const {columns, data} = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '当前页合计';
                    sums[index] = '所有页合计';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                } else {
                    sums[index] = '';
                }
            });

            return sums;
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
            url: me.$api.report.collectionDetail,
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
