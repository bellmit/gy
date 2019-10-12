<template>
    <div class="commodity-main">
        <h3 class="gy-h3">新客户报表</h3>
        <!--<commodity-search :keywords.sync="keyObj.keywords" @search="searchList"></commodity-search>-->
        <div class="seniorSearch-row">
            <el-row>
                <el-col :span="10">
                    <div class="cell-block">交易日期：&nbsp;&nbsp;
                        <el-date-picker
                        v-model="dateRange"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="1" class="font-black">&nbsp;客户范围:&nbsp;</el-col>
                <el-col :span="5">
                    <el-select v-model="value" placeholder="请选择客户范围">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="1" class="font-black">
                    &nbsp;
                </el-col>
                <el-col :span="1" class="font-black">
                    <i class="iconfont icon-search" @click.stop.prevent="searchGood"></i>
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
                    <td>日期</td>
                    <td>注册企业数</td>
                    <td>注册个人数</td>
                    <td>合计</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in data.list" :key="index">
                    <th>{{index + 1}}</th>
                    <td>{{item.createDate1}}</td>
                    <td>{{item.registerCompany}}</td>
                    <td>{{item.registerUser}}</td>
                    <td>{{item.createDate2}}</td>
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
            loading: false,
            options: [{
                value: '1',
                label: '选项1'
            }, {
                value: '2',
                label: '选项2'
            }, {
                value: '3',
                label: '选项3'
            }, {
                value: '4',
                label: '选项4'
            }, {
                value: '5',
                label: '选项5'
            }],
            value: ''
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
            _this.$http.post(_this.$api.statisticalReport.newCustomerList, _this.parameter).then(function (res) {
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
    .font-black{
        color: black;
    }
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
