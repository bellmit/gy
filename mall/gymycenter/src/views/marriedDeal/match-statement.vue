<template>
    <div class="transport-wrap order marriedDeal">
        <div class="new-title-public">
            撮合报表
        </div>
        <div class="t">
            <ul class="tabs">
                <li class="all selected">
                    <a href="javascript:;">当日</a>
                <li>
                    <a href="javascript:;">当周</a>
                </li>
                <li>
                    <a href="javascript:;">当月</a>
                </li>
                <li>
                    <a href="javascript:;">当年</a>
                </li>
            </ul>
            <div class="search">
                <div class="search-box">
                    <span class="l">自定义</span>
                    <div class="c">
                        <div class="a">
                            <el-date-picker
                                v-model="search.startDate"
                                type="date"
                                :clearable="true"
                                value-format="timestamp"
                                class="form-date"
                                placeholder="开始日期">
                            </el-date-picker>
                        </div>
                        <div class="s">至</div>
                        <div class="a">
                            <el-date-picker
                                v-model="search.endDate"
                                type="date"
                                :clearable="true"
                                value-format="timestamp"
                                class="form-date"
                                placeholder="结束日期">
                            </el-date-picker>
                        </div>
                    </div>
                    <i class="iconfont icon-search"></i>
                    <span class="search-btn" @click="toggleSelect = !toggleSelect">高级搜索
                        <i class="iconfont icon-arrow-down" :class="{'el-rotate': toggleSelect}"></i>
                    </span>
                </div>
            </div>
        </div>
        <div v-if="toggleSelect" class="isshow clearfix">
            <div class="gy-form-group">
                <span class="l">卖方公司</span>
                <el-select placeholder="请选择">
                    <el-option
                        v-for="item in carrierTypeStaus"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l">买方公司</span>
                <el-select placeholder="请选择">
                    <el-option
                        v-for="item in carrierTypeStaus"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"></el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l">品名</span>
                <el-select placeholder="请选择">
                    <el-option
                        v-for="item in carrierTypeStaus"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"></el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l">交割库</span>
                <input type="text" class="gy-input" placeholder="请输入">
            </div>
        </div>
        <div class="bid-body">
            <img src="../../assets/images/match-statement.png" height="auto" width="100%"/>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            toggleSelect: false,
            carrierTypeStaus: [
                {
                    label: '1',
                    id: 1
                }
            ],
            search: {
                startDate: null,
                endDate: null
            }
        };
    },
    created () {
    },
    methods: {
    }
};
</script>
<style lang="scss" scoped>
    .transport-wrap{
        .t{
            overflow: initial;
        }
        .t:after{display:block;clear:both;content:"";visibility:hidden;height:0}
    }
    .transport-wrap.order .t .search {
        padding: 20px 16px;
    }
    .search-box {
        display: flex;
        width: 500px;
        height: 30px;
        .m {
            line-height: 30px;
        }
        .h {
            height: 30px;
        }
        .l{
            flex: 0 0 60px;
            @extend .m;
        }
        .c {
            flex: 1;
            display: flex;
            @extend .h;
            .a {
                flex: 1;
                @extend .m;
            }
            .s {
                flex: 0 0 30px;
                text-align: center;
                @extend .m;
            }
        }
        .iconfont {
            flex: 0 0 30px;
            @extend .m;
        }
        .search-btn {
            flex: 0 0 80px;
            @extend .m;
            .iconfont {
                vertical-align: bottom;
            }
            .el-rotate {
                transform: rotate(180deg);
            }
        }
    }
</style>
<style lang="scss">
    .marriedDeal {
        .el-input__inner {
            height: 30px !important;
        }
    }
</style>
