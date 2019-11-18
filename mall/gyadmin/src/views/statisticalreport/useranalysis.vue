<template>
    <div class="commodity-main">
        <h3 class="gy-h3">用户分析表</h3>
        <div class="seniorSearch-row">
            <el-row>
                <el-col :span="10">
                    <div class="cell-block">统计日期：&nbsp;&nbsp;
                        <el-date-picker
                          v-model="dateRange"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="3" class="font-black">
                    <el-radio-group @change="categoryRadio">
                        <el-radio :label="1">订单数</el-radio>
                        <el-radio :label="2">交易额</el-radio>
                    </el-radio-group>
                </el-col>
                <el-col :span="5" class="font-black">
                    显示Top:&nbsp;
                    <el-radio-group @change="exhibitionRadio">
                        <el-radio :label="10">10</el-radio>
                        <el-radio :label="20">20</el-radio>
                        <el-radio :label="30">30</el-radio>
                        <el-radio :label="40">40</el-radio>
                    </el-radio-group>
                </el-col>
                <el-col :span="1" class="font-black">
                    &nbsp;
                </el-col>
                <el-col :span="1" class="font-black">
                    <i class="iconfont icon-search" @click.stop.prevent="searchGood"></i>
                </el-col>
            </el-row>
        </div>
        <div class="seniorSearch-row">
            <el-row>
                <el-col :span="12"><div id="mainOne" style="width:100%;height: 700px;"></div></el-col>
                <el-col :span="12"><div id="mainTwo" style="width:100%;height: 700px;"></div></el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts';
export default {
    data () {
        return {
            dateRange: '',
            categoryRadio: '',
            exhibitionRadio: '',
            parameter: {
            }
        };
    },
    components: {
    },
    mounted () {
        // var option = {
        //     xAxis: {
        //         type: 'category',
        //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        //     },
        //     yAxis: {
        //         type: 'value'
        //     },
        //     series: [{
        //         data: [120, 200, 150, 80, 70, 110, 130],
        //         type: 'bar',
        //         itemStyle: {
        //             color: '#75d1a3'
        //         }
        //     }]
        // };
        var optionOne = {
            title: {
                text: '订单数前20的买家',
                left: '50%'
            },
            dataset: {
                source: [
                    [58212, 'Matcha Latte'],
                    [78254, 'Milk Tea'],
                    [41032, 'Cheese Cocoa'],
                    [12755, 'Cheese Brownie'],
                    [20145, 'Matcha Cocoa'],
                    [79146, '中国人民解放军'],
                    [91852, 'Orange Juice'],
                    [101852, 'Lemon Juice'],
                    [20112, 'Walnut Brownie'],
                    [81852, '解放军']
                ]
            },
            grid: {containLabel: true},
            xAxis: {name: 'amount', inverse: true},
            yAxis: {type: 'category', position: 'right'},
            series: [
                {
                    type: 'bar',
                    encode: {
                        // Map the "amount" column to X axis.
                        x: 'amount',
                        // Map the "product" column to Y axis
                        y: 'product'
                    },
                    sort: 'asc',
                    barWidth: 10,
                    itemStyle: {
                        color: '#75d1a3'
                    }
                }
            ]
        };
        this.createEchart(document.getElementById('mainOne'), optionOne);
        var optionTwo = {
            title: {
                text: '订单数前20的卖家',
                left: '50%'
            },
            dataset: {
                source: [
                    [58212, 'Matcha Latte'],
                    [78254, 'Milk Tea'],
                    [41032, 'Cheese Cocoa'],
                    [12755, 'Cheese Brownie'],
                    [20145, 'Matcha Cocoa'],
                    [79146, '中国人民解放军'],
                    [91852, 'Orange Juice'],
                    [101852, 'Lemon Juice'],
                    [20112, 'Walnut Brownie'],
                    [81852, '解放军']
                ]
            },
            grid: {containLabel: true},
            xAxis: {name: 'amount', inverse: false},
            yAxis: {type: 'category', position: 'left'},
            series: [
                {
                    type: 'bar',
                    encode: {
                        // Map the "amount" column to X axis.
                        x: 'amount',
                        // Map the "product" column to Y axis
                        y: 'product'
                    },
                    sort: 'asc',
                    barWidth: 10,
                    itemStyle: {
                        color: '#7bb5ed'
                    }
                }
            ]
        };
        this.createEchart(document.getElementById('mainTwo'), optionTwo);
    },
    created () {
    },
    methods: {
        createEchart: function (obj, option) {
            var echartObj = echarts.init(obj);
            echartObj.title = '世界人口总量 - 条形图';
            echartObj.setOption(
                option
            );
        },
        getData () { // 获取信息
            let _this = this;
            _this.$http.post(_this.$api.statisticalReport.userAnalyseList, _this.parameter).then(function (res) {
                _this.data = res.data.data;
                _this.total = res.data.data.total;
                _this.parameter.pageNum = res.data.data.pageNum;
                // console.log(JSON.stringify(_this.parameter.data));
            });
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
