<template>
  <div class="my-order-list">
    <div class="selected">
      <ul>
        <li :class="{ active: search.bindStatus === 0 }" @click="toggleTabs(0)">全部</li>
        <li :class="{ active: search.bindStatus === 2 }" @click="toggleTabs(2)">已绑卡({{data.bindCount}})</li>
        <li :class="{ active: search.bindStatus === 1 }" @click="toggleTabs(1)">未绑卡({{data.unbindCount}}) </li>
      </ul>
      <div class="right">
        <div class="search-box">
          <input type="search" v-model="search.account" placeholder="请输入账户名称/账号">
          <i class="iconfont icon-search" @click="getList"></i>
        </div>
        <span class="search-btn"  @click="toggleSelect = !toggleSelect">高级搜索<i class="iconfont icon-arrow-down"></i></span>
      </div>
    </div>
    <div class="selected-box" v-show="toggleSelect">
      <div class="form-group">
        <div class="gy-form-group">
          <span class="l">创建时间</span>
          <div class="date-content">
            <div class="date-picker">
              <div class="d">
                <el-date-picker
                  v-model="search.transStartDate"
                  type="date"
                  @change="pickerTime(1)"
                  placeholder="开始日期">
                </el-date-picker>
              </div>
              <div class="c">至</div>
              <div class="d">
                <el-date-picker
                  v-model="search.transEndDate"
                  type="date"
                  @change="pickerTime(2)"
                  placeholder="结束日期">
                </el-date-picker>
              </div>
            </div>
            <div class="date-radio">
              <el-radio-group v-model="period" @change="changeDuration" class="radio-group">
                <el-radio :label="1">近1周</el-radio>
                <el-radio :label="2">近1月</el-radio>
                <el-radio :label="3">近3月</el-radio>
                <el-radio :label="4">近半年</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="gy-form-group">
          <span class="l">账户类型</span>
          <el-radio-group v-model="search.bankFlag" class="radio-group">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="2">商户子账户</el-radio>
            <el-radio :label="1">普通子账户</el-radio>
          </el-radio-group>
          <i class="iconfont icon-search" @click="getList"></i>
        </div>
      </div>
    </div>
    <div>
      <div class="right" style="padding-bottom:8px">
        <button class="gy-button-extra" @click='downList'>导出</button>
      </div>
      <table class="gy-table">
        <thead>
        <tr class="title">
          <th style="width:150px">创建时间</th>
          <th style="width:150px">账号</th>
          <th style="width:240px">账户名称</th>
          <th style="width:100px">账户类型</th>
          <th style="width:100px">绑卡状态</th>
          <th style="width:160px">账户余额(元)</th>
          <th style="width:160px">冻结金额(元)</th>
          <th style="width:160px">可用余额(元)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="dataList && dataList.length === 0">
          <td colspan="8" class="align-c">暂无数据</td>
        </tr>
        <template v-else>
          <tr v-for="item in dataList" :key="item.id">
            <td>{{item.createdDateString || '-'}}</td>
            <td>{{item.bankAccount || '-'}}</td>
            <td>{{item.bankAccountName || '-'}}</td>
            <td>{{item.bankFlagAlias || '-'}}</td>
            <td>{{item.bindStatusAlias || '-'}}</td>
            <td class="align-r">
              <span v-show="isLoadMoney">{{item.accountBalance | toMoney}}</span>
              <i class="el-icon-loading" v-show="!isLoadMoney"></i>
            </td>
            <td class="align-r">
              <span v-show="isLoadMoney">{{item.blockedBalance | toMoney}}</span>
              <i class="el-icon-loading" v-show="!isLoadMoney"></i>
            </td>
            <td class="align-r">
              <span v-show="isLoadMoney">{{item.actualBalance | toMoney}}</span>
              <i class="el-icon-loading" v-show="!isLoadMoney"></i>
            </td>
          </tr>
        </template>
        </tbody>
      </table>
      <div class="pagination-wrapper">
        <div class="pagination-total">共 {{data.totalCount}} 条记录</div>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="search.pageNo"
          :total='data.totalCount'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            data: {
                totalCount: null,
                bindCount: 0, // 已绑卡统计
                unbindCount: 0 // 未绑卡统计
            },
            search: {
                transStartDate: new Date().getTime() - 1000 * 60 * 60 * 24 * 7, // 开始日期
                transEndDate: new Date().getTime(), // 结束日期
                bankFlag: null, // 账户类型 1、普通账户 2、商户账户
                account: null, // 关键字搜索(账户名、账号)
                bindStatus: 0, // 绑卡状态 1、未绑定 2、已绑定，默认不填或者填0
                pageNo: 1,
                pageSize: 10
            },
            period: 1, // 交易时间段
            toggleSelect: false,
            dataList: [
                // {
                //     accountBalance: null,
                //     accountType: null,
                //     actualBalance: null,
                //     alias: null,
                //     bankAccId: null,
                //     bankAccount: '3508000000006846', // 账号
                //     bankAccountName: '平滑测试公司001', // 账户名称
                //     bankFlag: 1,
                //     bankFlagAlias: '普通子账户', // 账户类型
                //     bankId: null,
                //     bankName: null,
                //     bigIcon: null,
                //     bindStatus: 0,
                //     bindStatusAlias: '未绑定', // 绑卡状态
                //     blockedBalance: null,
                //     city: null,
                //     cityName: null,
                //     contactName: null,
                //     createdBy: null,
                //     createdDate: null, // 创建时间
                //     createdDateString: null, // 创建时间字符串
                //     depositBankName: null,
                //     fundAccId: null,
                //     id: null,
                //     idCode: null,
                //     idType: null,
                //     keywords: null,
                //     mobileTail: null,
                //     phone: null,
                //     province: null,
                //     provinceName: null,
                //     smallIcon: null,
                //     updatedBy: null,
                //     updatedDate: null,
                //     usrCompanyId: null,
                //     usrCompanyName: null,
                //     valid: null,
                //     accountBalance: null, // 账户余额
                //     blockedBalance: null, // 冻结余额
                //     actualBalance: null // 可用余额
                // }
            ],
            dataList1: [],
            endIdx: null,
            isLoadMoney: false
        };
    },
    created () {
        this.getList();
    },
    methods: {
        // 导出
        downList () {
            this.timeFormat();
            let name = '资金账户__' + this.search.transStartDate + '__' + this.search.transEndDate;
            this.$tools.downloadFile(this, this.$api.findBankStatement.downList, this.search, name, '暂无数据，无法导出');
        },
        // 获取账户列表
        getList () {
            this.timeFormat();
            this.$http.post(this.$api.findBankStatement.getSubList, this.search)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.endIdx = 0;
                        this.isLoadMoney = false;
                        this.data = Object.assign(this.data, res.data.data);
                        this.dataList1 = res.data.data.datas || [];
                        this.dataList = [...res.data.data.datas] || [];
                        if (res.data.data.datas[0].id) {
                            this.getMoney(res.data.data.datas[0].id);
                        }
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 时间格式
        timeFormat () {
            if (!this.search.transStartDate) { this.$message.error('创建起始时间不能为空!'); return; }
            if (!this.search.transEndDate) { this.$message.error('创建结束时间不能为空!'); return; }
            let timeStart = new Date(this.search.transStartDate);
            let timeEnd = new Date(this.search.transEndDate);
            this.search.transStartDate = timeStart.getFullYear() + '-' + (timeStart.getMonth() + 1) + '-' + timeStart.getDate();
            this.search.transEndDate = timeEnd.getFullYear() + '-' + (timeEnd.getMonth() + 1) + '-' + timeEnd.getDate();
        },
        // 获取账户金额
        getMoney (id) {
            this.$http.get(this.$api.findBankStatement.getMoney + '?fundId=' + id, {unLoading: true})
                .then((res) => {
                    this.endIdx++;
                    if (res.data.code === 0) {
                        this.dataList1[this.endIdx - 1] = {
                            ...this.dataList1[this.endIdx - 1],
                            accountBalance: res.data.data.accountBalance, // 账户余额
                            blockedBalance: res.data.data.blockedBalance, // 冻结余额
                            actualBalance: res.data.data.actualBalance // 可用余额
                        };
                    }
                    if (this.endIdx === this.dataList1.length) {
                        this.dataList = this.dataList1;
                        this.isLoadMoney = true;
                    } else {
                        this.getMoney(this.dataList1[this.endIdx].id);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 时间选择限制
        pickerTime (type) {
            if (this.search.transEndDate && this.search.transEndDate < this.search.transStartDate) {
                this.$message.error('开始时间不能大于结束时间');
                type === 1 ? this.search.transStartDate = null : this.search.transEndDate = null;
            }
        },
        // 日期radio选中
        changeDuration (val) {
            let date = new Date();
            let time, y, m, d;
            time = date.getTime();
            y = date.getFullYear();
            m = date.getMonth();
            d = date.getDate();
            switch (val) {
            case 1: // 近一周
                this.search.transEndDate = time;
                this.search.transStartDate = time - 1000 * 60 * 60 * 24 * 7;
                break;
            case 2:
                this.search.transEndDate = time;
                this.search.transStartDate = new Date(y, m - 1, d).getTime();
                break;
            case 3:
                this.search.transEndDate = time;
                this.search.transStartDate = new Date(y, m - 3, d).getTime();
                break;
            case 4:
                this.search.transEndDate = time;
                this.search.transStartDate = new Date(y, m - 6, d).getTime();
                break;
            default:
                break;
            }
        },
        // 分页
        handleCurrentChange (i) {
            this.search.pageNo = i;
            this.getList();
        },
        // tab切换
        toggleTabs (v) {
            this.search.bindStatus = v;
            this.search.pageNo = 1;
            this.getList();
        }
    },
    filters: {
        // 金额格式转换
        toMoney (value, num = 2) {
            value = parseFloat(value);
            if (value === null || value === undefined || value === '' || value === 0 || value === !NaN || !value) {
                value = 0;
                return value.toFixed(num);
            } else {
                value = value.toFixed(num);
                let end = value.split('.')[1];
                let start = value.split('.')[0];
                let arr = [];

                start = start.split('').reverse();
                start.map(function (elem, index) {
                    arr.push(elem);
                    if (index % 3 === 2 && index !== value.length - 1 && index !== start.length - 1) {
                        arr.push(',');
                    }
                });

                start = arr.reverse().join('');
                return start + '.' + end;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
  .my-order-list {
    padding-top: 15px;
    .right {
      float: right;
      .gy-button-extra {
        background-color: #e59640;
        border-color: #e59640;
      }
    }
    .selected {
      padding-bottom: 15px;
      overflow: hidden;
      ul li {
        float: left;
        padding: 0 5px;
        cursor: pointer;
        &.active {
          color: $color-a-active;
          border-bottom: 2px solid $color-a-active
        }
      }
      ul li:not(:first-child) {
        position:relative;
        margin-left: 10px;
      }
      .search-btn{
        margin-right:14px;
        color: $color-minor;
        cursor: pointer;
        .icon-arrow-down {
          vertical-align: baseline;
        }
      }
      .search-box {
        display: inline-block;
        width: 216px;
        font-size: 14px !important;
        border-bottom: 1px solid #e7ecf1;
        input {
          width: 195px;
          height: 30px;
          color: $color-minor;
          border: none;
        }
      }
    }
    .form-group {
      padding-left: 14px;
      &:after {
        display: block;
        content: ' ';
        clear: both;
      }
    }
    .gy-form-group {
      .l {
        width: 64px;
      }
      padding-left: 74px;
      width: 100%;
      .date-content {
        display: flex;
        .date-picker {
          flex: 0 0 400px;
          display: flex;
          .d {
            flex: 1;
          }
          .c {
            flex: 0 0 30px;
            text-align: center;
          }
        }
        .date-radio {
          flex: 0 0 600px;
          padding-left: 35px;
        }
      }
      .icon-search {
        padding-left: 10px;
      }
    }
    .el-radio, .el-radio__input.is-checked+.el-radio__label {
      color: $color-main!important;
    }
  }
</style>
