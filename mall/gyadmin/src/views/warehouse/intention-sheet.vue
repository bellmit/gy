<template>
  <div class="intention-sheet transport-wrap order">
    <div class="t">
      <ul class="tabs">
        <li :class="{'selected': search.isAudit === null}" @click="tabChange(null)">
          <a href="javascript:;">全部({{count.allCount}})</a>
        </li>
        <li @click="tabChange(1)" :class="{'selected': search.isAudit === 1}">
          <a href="javascript:;">已审核({{count.auditCount}})</a>
        </li>
        <li @click="tabChange(0)" :class="{'selected': search.isAudit === 0}">
          <a href="javascript:;">未审核({{count.noAuditCount}})</a>
        </li>
      </ul>
      <div class="search-wrapper">
        <div class="search-content">
          <i class="iconfont icon-search" @click="searchList"></i>
          <input type="text" v-model="search.keywords" placeholder="请输入品名" class="gy-input">
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
            <input v-model="search.companyName" type="text" placeholder="请输入公司名称">
          </div>
      </div>
      <div class="gy-form-group">
        <div class="l">仓储地区</div>
          <div class="">
            <el-select v-model="search.areaCategoryId" placeholder="请选择">
              <el-option v-for="(item, index) in $constant.regionalClassification" :key="index"
                         :label="item.name" :value="item.val">
              </el-option>
            </el-select>
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
        <div class="l">发布时间</div>
        <div class="item">
          <div class="a">
            <el-date-picker
              v-model="search.startDate"
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
              v-model="search.endDate"
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
    <div class="button-box">
      <button type="button" @click="$router.push({ name: 'warehouseAddSheet' })" class="gy-button-extra">发布供应</button>
    </div>
    <table class="gy-table">
      <thead>
      <tr>
        <td>品名</td>
        <td>空容量(m³)</td>
        <td>仓储单价(元/立方*月)</td>
        <td>仓储地区</td>
        <td>仓储公司</td>
        <td>联系人姓名</td>
        <td>联系人手机</td>
        <td>发布人</td>
        <td>发布时间</td>
        <td>状态</td>
        <td style="width: 70px;min-width: 70px;max-width: 70px">前台显示</td>
        <td style="width: 85px;min-width: 85px;max-width: 85px">操作</td>
      </tr>
      </thead>
      <tbody>
      <tr v-if="List !=null && List.length === 0">
        <td colspan="12" class="align-c">暂无数据</td>
      </tr>
      <tr v-for="(item, idx) in List" :key="idx" v-else>
        <td>{{item.productName}}</td>
        <td class="align-r">{{item.emptyCapacity}}</td>
        <td class="align-r">{{item.intentionalPrice === 0 ? '面议' : item.intentionalPrice}}</td>
        <td>
          <span v-if="item.areaCategoryId">
            {{$constant.regionalClassification[item.areaCategoryId].name}}
          </span>
        </td>
        <td>{{item.companyName}}</td>
        <td>{{item.contactName}}</td>
        <td>{{item.contactMobile}}</td>
        <td>{{item.account}}</td>
        <td>{{item.createdDate | date(1, 1)}}</td>
        <td>{{isAudit[item.isAudit]}}</td>
        <td class="align-c">
          <el-switch v-if="item.isAudit === 1" v-model="item.isDisplay" :active-value="1" @change="isDisplay(item)" :inactive-value="0"></el-switch>
          <div v-else>-</div>
        </td>
        <td class="align-c">
          <span class="gy-button-view" v-if="item.isAudit === 0" @click="toExamine(item)">审核</span>
          <router-link :to="{name:'reviseSheet', query:{reviseId: item.id}}" class="gy-button-view">修改</router-link>
          <span class="gy-button-view" @click="deleteItem(item)">删除</span>
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
                companyName: null,
                keywords: null,
                areaCategoryId: null,
                isAudit: null,
                isDisplay: null,
                startDate: null,
                endDate: null
            },
            isAudit: ['未审核', '已审核'],
            searchData: {
                pageNum: 1,
                pageSize: 10,
                total: null
            },
            List: [],
            isSearchPlus: false,
            count: {
                allCount: null,
                auditCount: null,
                noAuditCount: null
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
                url = this.$api.warehouse.noDisplaySupplyOrder;
            } else {
                url = this.$api.warehouse.isDisplaySupplyOrder;
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
            this.search.endDate = this.search.endDate ? this.search.endDate + (1000 * 60 * 60 * 24 - 1) : this.search.endDate;
            let params = {
                data: this.search,
                pageNum: this.searchData.pageNum,
                pageSize: this.searchData.pageSize
            };
            this.$http.post(this.$api.warehouse.supplyOrder, params)
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
        pickerTime (type) {
            if (this.search.endDate && this.search.endDate < this.search.startDate) {
                this.$message.error('开始时间不能大于结束时间');
                type === 1 ? this.search.startDate = null : this.search.endDate = null;
            }
        },
        searchListCount () {
            let params = Object.assign({}, this.search);
            params.isAudit = null;
            this.$http.post(this.$api.warehouse.supplyCount, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.count = res.data.data;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        toExamine (item) {
            item.isAudit = 1;
            this.$http.put(this.$api.warehouse.validate, item)
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
        deleteItem (item) {
            item.valid = 0;
            this.$http.put(this.$api.warehouse.supplyDelete, item)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('操作成功!');
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
