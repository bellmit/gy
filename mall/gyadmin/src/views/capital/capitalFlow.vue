<template>
    <div class="capitalFlow">
        <div class="search">
            <div class="t">
                <ul class="l">
                    <li v-for="(item, index) in searchlist" :key="index" @click="getList(tabsIdx = index, form.directionType = item.type)" :class="{'active': tabsIdx === index}">
                      {{item.label}}<span v-if="index !== 0">({{item.value}})</span>
                    </li>
                </ul>
                <div class="r">
                    <div class="search-box">
                      <input type="search" v-model.number="form.account" placeholder="请输入账户名/账号">
                      <button><i class="iconfont icon-search" @click="getList"></i></button>
                    </div>
                    <span class="search-btn" @click="isShow = !isShow">高级搜索<i class="iconfont" :class="{'icon-arrow-down': !isShow, 'icon-arrow-up': isShow}"></i></span>
                </div>
            </div>
            <div class="b" v-show="isShow">
                <div class="form-group">
                    <span class="l">交易时间</span>
                    <div class="date-picker">
                        <el-date-picker
                            v-model="startDate"
                            type="date"
                            style="width: 47%;"
                            placeholder="请选择开票日期"
                            @change='startDateChange'>
                        </el-date-picker>
                        <span>  至  </span>
                        <el-date-picker
                            v-model="endDate"
                            type="date"
                            style="width: 47%;"
                            @change='endDateChange'
                            placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <el-radio-group v-model="period" @change="changeDuratoin" class="radio-group" >
                        <el-radio :label="7">近1周</el-radio>
                        <el-radio :label="1">近1月</el-radio>
                        <el-radio :label="3">近3月</el-radio>
                        <el-radio :label="6">近半年</el-radio>
                    </el-radio-group>
                    <i class="iconfont icon-search last-i" @click="getList"></i>
                </div>
            </div>
        </div>
        <button class="gy-button-normal cap" @click="exportBtn">导出</button>
        <table class="gy-table">
            <thead>
                <tr>
                    <td>交易时间</td>
                    <td>账号</td>
                    <td>账户名称</td>
                    <td>收支方式</td>
                    <td>记账类型</td>
                    <td>金额(元)</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in list" :key="index" v-show="list.length > 0">
                    <td>{{item.transDateTime}}</td>
                    <td>{{item.subAcctNo}}</td>
                    <td>{{item.subAcctName}}</td>
                    <td>{{item.comeInOutGo}}</td>
                    <td>{{item.tradeTypeDesc}}</td>
                    <td class="last-td">{{item.tempAmount}}</td>
                </tr>
                <tr v-show="list.length === 0">
                    <td colspan="6" style="text-align: center;">暂无数据...</td>
                </tr>
            </tbody>
        </table>
        <div class="pagination-wrapper">
            <div class="pagination-total">共 {{total}} 条记录</div>
            <el-pagination
                v-if="total > 10"
                :total="total"
                class="pagination-box"
                background
                @current-change="turnPage"
                layout="prev, pager, next">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'capitalFlow',
    data () {
        return {
            tabsIdx: 0,
            isShow: true,
            period: 7,
            startDate: null,
            endDate: null,
            total: 0,
            form: {
                startDate: null,
                endDate: null,
                pageNo: 1,
                pageSize: 10,
                account: null,
                directionType: 0
            },
            list: [],
            searchlist: [
                {
                    label: '全部',
                    type: 0
                },
                {
                    label: '收入',
                    value: 0,
                    type: 1
                },
                {
                    label: '支出',
                    value: 0,
                    type: 2
                }
            ]
        };
    },
    created () {
        this.base();
    },
    methods: {
        base () {
            let today = new Date();
            let weekBefore = new Date(today.getTime() - (+this.period * 24 * 60 * 60 * 1000));
            this.endDate = today;
            this.startDate = weekBefore;
            this.getList();
        },
        getList () {
            if (!this.checkout()) return false;
            this.form.startDate = this.date(this.startDate);
            this.form.endDate = this.date(this.endDate);
            this.$http.post(this.$api.findBankStatement.list, this.form)
                .then(res => {
                    if (res.data.code === 0) {
                        this.list = res.data.data.rows;
                        this.total = res.data.data.total;
                        this.searchlist[1].value = res.data.data.comeInCount;
                        this.searchlist[2].value = res.data.data.outGoCount;
                        return;
                    }
                    this.$message.error(res.data.message);
                });
        },
        exportBtn () {
            if (!this.checkout()) return false;
            this.$http.post(this.$api.findBankStatement.export, this.form, {responseType: 'blob', timeout: 60000}).then(res => {
                if (res.data.size > 0) {
                    this.download(res.data, '流水单.');
                    return;
                }
                this.$message.error('没有数据可下载');
            }).catch(e => {
                this.$message.error('下载出错');
            });
        },
        turnPage (v) {
            this.form.pageNo = v;
            this.getList();
        },
        startDateChange (v) {
            this.startDate = v;
            this.form.startDate = this.date(v);
            this.period = null;
        },
        endDateChange (v) {
            this.endDate = v;
            this.form.endDate = this.date(v);
            this.period = null;
        },
        changeDuratoin (value) {
            this.endDate = new Date();
            if (value === 7) {
                this.startDate = new Date(+this.endDate - (+value * 24 * 60 * 60 * 1000));
                this.form.startDate = this.date(this.startDate);
            } else {
                let ed = new Date(+this.endDate);
                ed.setMonth(ed.getMonth() - +value);
                this.startDate = ed;
                this.form.startDate = this.date(ed);
            }
        },
        download (data, filename) {
            var blob = new Blob([data]);
            if (window.navigator.msSaveOrOpenBlob) {
                // 兼容IE10
                navigator.msSaveBlob(blob, filename);
            } else {
                let url = window.URL.createObjectURL(new Blob([data]));
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
            }
        },
        date (time, hour) { // 把时间戳格式:若有参返回年-月-日时:分:秒 若无参返回 年-月-日
            if (!time) {
                return '';
            }
            let y, m, d, date, h, ms, s, data, hours;
            date = new Date(time);
            y = date.getFullYear();
            m = date.getMonth() + 1;
            d = date.getDate();
            h = date.getHours();
            ms = date.getMinutes();
            s = date.getSeconds();
            data = y + '' + format(m) + '' + format(d);
            hours = format(h) + ':' + format(ms) + ':' + format(s);
            if (hour) {
                return data + ' ' + hours;
            } else {
                return data;
            }
            function format (num) {
                if (parseInt(num) < 10) {
                    num = '0' + num;
                }
                return num;
            }
        },
        checkout () {
            if (!this.startDate) {
                this.$message.error('交易时间的开始日期不能为空');
                return false;
            }
            if (!this.endDate) {
                this.$message.error('交易时间的结束日期不能为空');
                return false;
            }
            return true;
        }
    }
};
</script>

<style lang="scss" scoped>
    .capitalFlow {
        .search {
            padding: 15px 30px 30px 0;
            .l {
                display: inline-block;
                li {
                    display: inline-block;
                    padding: 0 8px;
                    margin-right: 10px;
                    cursor: pointer;
                    &.active {
                        color: #e59640;
                        border-bottom: 2px solid #e59640;
                    }
                }
            }
            .r {
                color: $color-minor;
                float: right;
                display: inline-block;
                .search-box {
                  display: inline-block;
                  width: 216px;
                  font-size: 14px !important;
                  border-bottom: 1px solid #e7ecf1;
                  input {
                      width: 140px;
                      height: 30px;
                      color: $color-minor;
                      border: none;
                  }
                  button {
                      display:inline-block;
                      width: 60px;
                      color: $color-minor;
                      border: none;
                      background-color: #fff;
                      text-align: right;
                  }
                    span {
                      color: $color-minor;
                      padding-left: 20px
                    }
                }
                .search-btn {
                  cursor: pointer;
                }
            }
            .b {
                margin: 24px 0 0 16px;
                .date-picker {
                  width: 36% !important;
                  display: inline-block;
                }
                .radio-group {
                  display: inline-block;
                  .el-radio + .el-radio {
                      margin-left: 20px !important;
                  }
                }
                .last-i {
                    font-size: 20px;
                    margin-left: 10px;
                }
            }
        }
        .cap {
            background: #e59640;
            text-align: right;
            color: #fff;
            float: right;
            margin-bottom: 8px;
        }
        .last-td {
            text-align: right;
        }
    }
</style>
