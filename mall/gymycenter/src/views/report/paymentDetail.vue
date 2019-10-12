<template>
    <div class="userCenter-main in-and-out">
        <div class="userCenter-main-tit">
            <div class="userCenter-main-tit-left">应付报表明细</div>
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
                        <el-input class="content-query-item-num content-query-item-iput" v-model="input" placeholder=""
                                  :readonly=true></el-input>
                    </div>
                </div>
            </div>
            <div class="userCenter-query-result">
                <el-row class="userCenter-query-result-th">
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
                        <div class="grid-content"></div>
                        待付余额
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content">备注</div>
                    </el-col>
                </el-row>
                <ul class="userCenter-query-result-tb">
                    <li class="userCenter-query-result-tb-item" v-for="(item, index) in result" :key="item.num"
                        :class="{evenItem:index%2!==0}">
                        <el-col :span="4">
                            <div class="grid-content"></div>
                            {{item.dateCreate}}
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content">{{item.payNumber}}</div>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content"></div>
                            {{item.payType}}
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content">{{item.payTotal}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content"></div>
                            {{item.needPay}}
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
    name: 'paymentDetail',
    data () {
        return {
            input: '',
            isQuery: true,
            isWeek: true,
            isMonth: false,
            itemTotal: 0,
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
            pageNo: 1,
            pageSize: 10,
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
            this.isQuery = isQuery;
            this.$http.post(this.$api.offers.state, this.datas).then(function (res) {
                if (res.data.code === 0) {
                    // that.getInfo();
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
            this.endDate = new Date().getTime();
            this.startDate = start.getTime();
            this.isWeek = true;
            this.isMonth = false;
        },
        aMonth (event) {
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            this.endDate = new Date().getTime();
            this.startDate = start.getTime();
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
            url: me.$api.report.paymentDetail,
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
