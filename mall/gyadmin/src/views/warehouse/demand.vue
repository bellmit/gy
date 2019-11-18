<template>
  <div class="intention-sheet transport-wrap order">
    <div class="t">
      <ul class="tabs">
        <li class="all" :class="{'selected': search.isAudit === null}" @click="tabChange(null)">
          <a href="javascript:;">全部({{count.total}})</a>
        </li>
        <li @click="tabChange(0)" :class="{'selected': search.isAudit === 0}">
          <a href="javascript:;">待受理({{count.unaudited}})</a>
        </li>
        <li @click="tabChange(1)" :class="{'selected': search.isAudit === 1}">
          <a href="javascript:;">已受理({{count.approved}})</a>
        </li>
        <li @click="tabChange(2)" :class="{'selected': search.isAudit === 2}">
          <a href="javascript:;">已拒绝({{count.refuse}})</a>
        </li>
      </ul>
      <div class="search-wrapper">
        <div class="search-content">
          <i class="iconfont icon-search" @click="searchList"></i>
          <input type="text" v-model="search.keywords" placeholder="请输入品名/申请人/申请人手机号" class="gy-input">
        </div>
        <div class="search-plus" @click="isSearchPlus = !isSearchPlus">
          <span>高级搜索</span>
          <i class="iconfont icon-arrow-down"></i>
        </div>
      </div>
    </div>
    <div class="gy-form-box-14" v-if="isSearchPlus">
      <div class="gy-form-group">
        <div class="l">仓储公司</div>
        <div class="">
          <input type="text" v-model="search.companyName" placeholder="请输入公司名称">
        </div>
      </div>
      <div class="gy-form-group">
        <div class="l">前台显示</div>
        <div class="">
          <el-radio-group v-model="search.isDisplay">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="gy-form-group">
        <div class="l">计划入库时间</div>
        <div class="item">
          <div class="a">
            <el-date-picker
              v-model="search.expectBeginEntryDate"
              type="date"
              @change="pickerTime(1,1)"
              :clearable="true"
              value-format="timestamp"
              class="form-date"
              placeholder="开始日期">
            </el-date-picker>
          </div>
          <div class="s">至</div>
          <div class="a">
            <el-date-picker
              v-model="search.expectEndEntryDate"
              type="date"
              @change="pickerTime(2,1)"
              :clearable="true"
              value-format="timestamp"
              class="form-date"
              placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div class="gy-form-group">
        <div class="l">申请时间</div>
        <div class="item">
          <div class="a">
            <el-date-picker
              v-model="search.createdBeginDate"
              type="date"
              @change="pickerTime(1)"
              :clearable="true"
              value-format="timestamp"
              class="form-date"
              placeholder="开始日期">
            </el-date-picker>
          </div>
          <div class="s">至</div>
          <div class="a">
            <el-date-picker
              v-model="search.createdEndDate"
              type="date"
              @change="pickerTime(2)"
              :clearable="true"
              value-format="timestamp"
              class="form-date"
              placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <i class="iconfont icon-search" @click="searchList"></i>
      </div>
    </div>
    <table class="gy-table">
      <thead>
      <tr>
        <td>品名</td>
        <td>数量(吨)</td>
        <td>计划入库日期</td>
        <td>仓储单价(元/立方*月)</td>
        <td>仓储地区</td>
        <td>联系人姓名</td>
        <td>联系人手机</td>
        <td>申请时间</td>
        <td>状态</td>
        <td style="width: 70px;min-width: 70px;max-width: 70px">前台显示</td>
        <td style="width: 85px;min-width: 85px;max-width: 85px">操作</td>
      </tr>
      </thead>
      <tbody>
      <tr v-if="List !=null && List.length === 0">
        <td colspan="11" class="align-c">暂无数据</td>
      </tr>
      <tr v-for="item in List" :key="item.id" v-else>
        <td>{{item.prdProductName}}</td>
        <td class="align-r">{{item.quantity}}</td>
        <td>{{item.expectEntryDate | date}}</td>
        <td class="align-r">{{item.price === 0 ? '面议' : item.price}}</td>
        <td>{{item.areaCategoryName}}</td>
        <td>{{item.contact}}</td>
        <td>{{item.phone}}</td>
        <td>{{item.createdDate | date(1, 1)}}</td>
        <td>{{isAudit[item.isAudit]}}</td>
        <td class="align-c">
          <el-switch v-if="item.isAudit === 1" v-model="item.isDisplay" @change="isDisplay(item)" :active-value="1" :inactive-value="0"></el-switch>
          <div v-else>-</div>
        </td>
        <td class="align-c">
          <template v-if="item.isAudit === 0">
            <span class="gy-button-view" @click="toExamine(item.id, 1)">受理</span>
            <span class="gy-button-view" @click="toExamine(item.id, 2)">拒绝</span>
          </template>
          <div v-else>-</div>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="pagination-wrapper" v-if="searchData != null && searchData.total > searchData.pageSize">
      <div class="pagination-total">共{{searchData.total}}条记录</div>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="searchData.pageNum"
        :page-size="searchData.pageSize"
        :total="searchData.total"
        @current-change="searchList"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            search: {
                keywords: null,
                companyName: null,
                isAudit: null,
                isDisplay: null,
                createdBeginDate: null,
                createdEndDate: null,
                expectBeginEntryDate: null,
                expectEndEntryDate: null
            },
            isAudit: ['未受理', '已受理', '已拒绝'],
            searchData: {
                pageNum: 1,
                pageSize: 10,
                total: null
            },
            List: [],
            isSearchPlus: false,
            count: {
                total: null,
                approved: null,
                unaudited: null,
                refuse: null
            }
        };
    },
    created () {
        this.searchList();
    },
    methods: {
        isDisplay (item) {
            let url;
            if (item.isDisplay === 0) {
                url = this.$api.warehouse.noDisplay;
            } else {
                url = this.$api.warehouse.isDisplay;
            }
            this.$http.put(url, item)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('操作成功!');
                        this.searchList();
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        tabChange (idx) {
            this.search.isAudit = idx;
            this.searchList();
        },
        searchList () {
            this.search.createdEndDate = this.search.createdEndDate ? this.search.createdEndDate + (1000 * 60 * 60 * 24 - 1) : this.search.createdEndDate;
            this.search.expectEndEntryDate = this.search.expectEndEntryDate ? this.search.expectEndEntryDate + (1000 * 60 * 60 * 24 - 1) : this.search.expectEndEntryDate;
            let params = {
                data: this.search,
                pageNum: this.searchData.pageNum,
                pageSize: this.searchData.pageSize
            };
            this.$http.post(this.$api.warehouse.intentionSheetPage, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.List = res.data.data.list;
                        this.searchData.total = res.data.data.total;
                        this.searchListCount();
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        pickerTime (type, t = 2) {
            if (t === 1 && this.search.expectEndEntryDate && this.search.expectEndEntryDate < this.search.expectBeginEntryDate) {
                this.$message.error('计划入库开始时间不能大于结束时间');
                type === 1 ? this.search.expectBeginEntryDate = null : this.search.expectEndEntryDate = null;
                return;
            }
            if (t === 2 && this.search.createdEndDate && this.search.createdEndDate < this.search.createdBeginDate) {
                this.$message.error('申请时间开始时间不能大于结束时间');
                type === 1 ? this.search.createdBeginDate = null : this.search.createdEndDate = null;
            }
        },
        searchListCount () {
            let params = Object.assign({}, this.search);
            params.isAudit = null;
            this.$http.post(this.$api.warehouse.count, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.count = res.data.data;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        toExamine (id, status) {
            let params = {
                id: id,
                isAudit: status
            };
            let url;
            if (status === 1) {
                url = this.$api.warehouse.audit;
            } else {
                url = this.$api.warehouse.refuse;
            }
            this.$http.put(url, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('操作成功!');
                        this.searchList();
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        deleteItem (id) {
            this.$http.get(this.$api.warehouse.valid + id)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('删除成功!');
                        this.searchList();
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }
};
</script>

<style scoped lang="scss">
  .transport-wrap.order .t {
    padding: 11px 0 15px;
    height: 56px;
    .tabs {
      flex: 1;
      padding: 0;
      li {
        padding: 0 5px;
        margin-right: 10px;
      }
    }
    .search-wrapper {
      float: right;
      width: 350px;
      padding-right: 14px;
      display: flex;
      .search-content {
        flex: 1;
        margin-right: 10px;
        position: relative;
      }
      .search-plus {
        flex: 0 0 80px;
        color: $color-main;
        .iconfont {
          position: relative;
          top: -4px;
        }
      }
    }
  }

  .gy-form-box-14 {
    padding:4px 0 12px 14px;
    &:after {
      display: block;
      content: ' ';
      clear: both;
    }
    .el-radio {
      margin-right: 0;
    }
    /deep/ .el-radio__input.is-checked+.el-radio__label {
      color: $color-main;
    }
    .item {
      display: flex;
      .a {
        flex: 1;
      }
      .s {
        flex: 0 0 25px;
      }
    }
  }

  .icon-search {
    position: absolute;
    top: 0;
    right: 0;
  }

  .button-box {
    text-align: right;
    padding: 0 0 10px;
  }

  .gy-form-group {
    padding-left: 95px;
    .l {
      width: 85px;
    }
  }

  .gy-form-group:nth-child(odd) {
    padding-right: 30px;
  }

  .gy-form-group:nth-child(even) {
    padding-left: 125px;
    .l {
      width: 115px;
      padding-left: 30px;
    }
  }
</style>
