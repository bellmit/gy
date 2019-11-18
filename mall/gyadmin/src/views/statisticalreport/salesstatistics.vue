<template>
    <div class="commodity-main">
        <h3 class="gy-h3">销售统计表</h3>
        <!--<commodity-search :keywords.sync="keyObj.keywords" @search="searchList"></commodity-search>-->
        <div class="seniorSearch-row">
            <el-row>
                <el-col :span="20"><div class="cell-block">
                    <el-radio-group v-model="parameter.search.radioItem" @change="searchRadio">
                        <el-radio :label="0">自定义</el-radio>
                        <el-radio :label="30">按月份</el-radio>
                        <el-radio :label="90">按季度</el-radio>
                        <el-radio :label="360">按年份</el-radio>
                    </el-radio-group>
                </div></el-col>
            </el-row>
            <el-row>
                <el-col :span="18">
                    <div class="cell-block">交易日期：&nbsp;&nbsp;<el-date-picker
                      v-model="dateRange"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                    <!--<button class="gy-button-extra" @click.stop.prevent="searchGood">查询</button>-->
                     <i class="iconfont icon-search" @click.stop.prevent="searchGood"></i></div>
                </el-col>
            </el-row>
        </div>
        <div class="operation-row">
            <button class="gy-button-normal" @click="exportMethod">导出</button>&nbsp;
        </div>
        <div class="list">
            <table class="gy-table">
                <thead>
                <tr>
                    <th>No</th>
                    <td>统计月</td>
                    <td>总交易额(人民币)</td>
                    <td>总订单数</td>
                    <td>平均人民币每单金额</td>
                    <td>总交易天数</td>
                    <td>日均交易额</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in data.list" :key="index">
                    <th>{{index + 1}}</th>
                    <td>{{item.yearMonth}}</td>
                    <td>{{item.tradeMoney}}</td>
                    <td>{{item.orderNum}}</td>
                    <td>{{item.avgTradeMoney}}</td>
                    <td>{{item.tradeDay}}</td>
                    <td>{{item.avgDayTrade}}</td>
                </tr>
                </tbody>
            </table>
            <div class="footer text-center">
                <el-pagination
                  background
                  :page-size="parameter.pageSize"
                  :pager-count="pageCount"
                  :total="total"
                  :current-page.sync="parameter.pageNum"
                  layout="prev, pager, next"
                  style="margin-top: 40px;"
                  @current-change="turnPage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            total: 0, // 总条数
            pageCount: 5,
            data: {},
            parameter: {
                pageSize: 10, // 当前条数
                pageNum: 1, // 当前页数
                search: {
                    createdBeginDate: '', // 开始时间
                    createdEndDate: '', // 结束时间
                    radioItem: 90
                }
            },
            dateRange: [new Date(2016, 10, 10, 10, 10), new Date(2018, 10, 11, 10, 10)],
            loading: false
        };
    },
    components: {
    },
    created () {
        this.getList();
    },
    methods: {
        getList () { // 获取信息
            let _this = this;
            _this.$http.post(_this.$api.statisticalReport.salesStatisticsList, _this.parameter).then(function (res) {
                _this.data = res.data.data;
                _this.total = res.data.data.total;
                _this.parameter.pageNum = res.data.data.pageNum;
                // console.log(JSON.stringify(_this.parameter.data));
            });
        },
        turnPage (pageNum) { // 分页跳转
            let _this = this;
            _this.parameter.pageNum = pageNum;
            this.getList();
        },
        searchRadio: function () { // 搜索
            let _this = this;
            _this.parameter.pageNum = 1;
            _this.parameter.search.createdBeginDate = ''; // 开始时间
            _this.parameter.search.createdEndDate = ''; // 结束时间
            _this.getList();
        },
        searchGood: function () { // 搜索
            let _this = this;
            _this.parameter.pageNum = 1;
            _this.parameter.search.createdBeginDate = _this.dateRange[0]; // 开始时间
            _this.parameter.search.createdEndDate = _this.dateRange[1]; // 结束时间
            _this.parameter.search.radioItem = 0;
            _this.getList();
        },
        exportMethod () {
            // let _this = this;
            // _this.$http.post(_this.$api.statisticalReport.export, _this.parameter).then(function (res) {
            // });
        }
    }
};
</script>

<style lang="scss">
    .operation-row{
        text-align: right;
    }
    .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
        width: 600px;
    }
        .seniorSearch-row{
            line-height: 50px;
            margin-bottom: 20px;
            .cell-block{
                text-indent:10px;
                color:black;
                /*border:red solid 1px;*/
                .el-input{
                    width: 70%;
                }
                .el-select{
                    width: 70% !important;
                }
            }
        }
        .operation-row{
            margin-bottom: 20px;
            /*border:red solid 1px;*/
        }
        .selected {
            margin-bottom: 10px;
            .right {
                float: right;
            }
            overflow: hidden;
            ul li {
                float: left;
                padding: 0 6px;
                &.active {
                    color: $color-a-active;
                    border-bottom: 1px solid $color-a-active
                }
            }
            ul li:not(:first-child) {
                position:relative;
                margin-left: 20px;
                cursor: pointer;
            }
            .search-btn{
                margin-right:10px;
                cursor: pointer;
            }
            .search-box {
                display: inline-block;
                width: 216px;
                border-bottom: 1px solid $color-light;
                input {
                    width: 140px;
                    height: 30px;
                    color: $color-light;
                    border: none;
                }
                button {
                    display:inline-block;
                    width: 60px;
                    color: $color-main;
                    border: none;
                    background-color: #fff;
                    text-align: right;
                    cursor: pointer;
                }
                span {
                    color: $color-light;
                    padding-left: 20px
                }
            }
        }
</style>
