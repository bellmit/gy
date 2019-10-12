<template>
    <div class="userCenter-main in-and-out">
        <div class="userCenter-main-content">
            <div class="userCenter-main-content-query">
                <p class="userCenter-main-content-query-tit">请设置查询条件</p>
                <div>
                    <div class="content-query-item">
                        <span class="content-query-item-tit">收付类型：</span>
                        <el-checkbox-group
                            class="content-query-item-iput content-query-item-type"
                            v-model="checkedType"
                            @change="checkboxChange()"
                            :min="1"
                            :max="2">
                            <el-checkbox v-for="type in typies" :label="type" :key="type">{{type}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div class="content-query-item">
                        <span class="content-query-item-tit">收付日期：</span>
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
                            <button class="gy-button-normal" :isActive="isWeek" @click="aWeek">最近一周</button>
                            <button class="gy-button-normal" :isActive="isMonth" @click="aMonth">最近一月</button>
                        </div>
                    </div>
                    <div class="content-query-item">
                        <span class="content-query-item-tit">收付企业：</span>
                        <el-select class="content-query-item-iput" v-model="value8" filterable placeholder="请选择企业">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <!--<div class="content-query-item">-->
                    <!--<span class="content-query-item-tit">单据编号：</span>-->
                    <!--<el-input class="content-query-item-num content-query-item-iput" v-model="input" placeholder="单据编号可为空"></el-input>-->
                    <!--</div>-->
                </div>
                <div class="userCenter-main-tit-btns">
                    <button class="userCenter-main-tit-right-btn gy-button-normal" :isActive="isQuery"
                            @click="toggleQueryAndDownload(true)">查询
                    </button>
                    <button class="userCenter-main-tit-right-btn gy-button-normal" :isActive="!isQuery"
                            @click="toggleQueryAndDownload(false)">导出
                    </button>
                </div>
            </div>
            <div class="userCenter-query-result">
                <el-row class="userCenter-query-result-th">
                    <el-col :span="4">
                        <div class="grid-content"></div>
                        收付日期
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">单据编号</div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grid-content"></div>
                        收付企业
                    </el-col>
                    <el-col :span="3">
                        <div class="grid-content">单据金额</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content"></div>
                        确认时间
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content">确认人</div>
                    </el-col>
                    <el-col :span="2">
                        <div class="grid-content">收付类型</div>
                    </el-col>
                </el-row>
                <ul class="userCenter-query-result-tb">
                    <li class="userCenter-query-result-tb-item" v-for="(item, index) in result" :key="item.num"
                        :class="{evenItem:index%2!==0}">
                        <el-col :span="4">
                            <div class="grid-content"></div>
                            {{item.date}}
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content">{{item.num}}</div>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content"></div>
                            {{item.compony}}
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content">{{item.sum}}</div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content"></div>
                            {{item.confirmDay}}
                        </el-col>
                        <el-col :span="2">
                            <div class="grid-content">{{item.confirmMan}}</div>
                        </el-col>
                        <el-col :span="2">
                            <div class="grid-content">{{item.type}}</div>
                        </el-col>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'inAndOut',
    data () {
        return {
            input: '',
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
            endDate: '',
            options: [
                {
                    value: '选项1',
                    label: '浙江寰宇能源有限公司'
                },
                {
                    value: '选项2',
                    label: '海南海通能源有限公司'
                },
                {
                    value: '选项3',
                    label: '浙江寰宇能源有限公司'
                },
                {
                    value: '选项4',
                    label: '海南海通能源有限公司'
                },
                {
                    value: '选项5',
                    label: '浙江寰宇能源有限公司'
                }
            ],
            value8: '',
            checkedType: ['收款'],
            typies: ['收款', '付款'],
            result: [
                {
                    date: '2017.10.03 21:25',
                    num: 'CG2017072600001',
                    compony: '浙江寰宇能源有限公司',
                    sum: '12,256.00',
                    confirmDay: '2017.07.16 13:25',
                    confirmMan: '刘会计',
                    type: '收款'
                },
                {
                    date: '2017.10.03 21:25',
                    num: 'CG2017072600002',
                    compony: '海南海通能源有限公司',
                    sum: '12,256.00',
                    confirmDay: '2017.07.16 13:25',
                    confirmMan: '刘会计',
                    type: '收款'
                },
                {
                    date: '2017.10.03 21:25',
                    num: 'CG2017072600003',
                    compony: '浙江寰宇能源有限公司',
                    sum: '12,256.00',
                    confirmDay: '2017.07.16 13:25',
                    confirmMan: '刘会计',
                    type: '收款'
                },
                {
                    date: '2017.10.03 21:25',
                    num: 'CG2017072600004',
                    compony: '海南海通能源有限公司',
                    sum: '12,256.00',
                    confirmDay: '2017.07.16 13:25',
                    confirmMan: '刘会计',
                    type: '收款'
                }
            ]
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
        this.aWeek(event);
    }
};
</script>
<style lang="scss" scoped>
    .userCenter-main-tit-btns {
        margin: 20px 0 0 76px;
    }

    .in-and-out .date-picker .el-date-editor {
        width: 194px !important;
    }
</style>
