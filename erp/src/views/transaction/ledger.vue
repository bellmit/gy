<template>
    <div>
      <div class="search-wrapper">
        <div class="search-form">
          <div class="gy-form-group">
            <span class="l">合同编号</span>
            <input type="text" placeholder="请输入合同编号">
          </div>
          <div class="gy-form-group">
            <span class="l">商品编号</span>
            <input type="text" placeholder="请输入商品名称">
          </div>
          <div class="gy-form-group">
            <span class="l">交割库</span>
            <input type="text" placeholder="请输入交割库名称">
          </div>
          <div class="gy-form-group">
            <span class="l">上游公司名称</span>
            <input type="text" placeholder="请输入上游公司名称">
            <span class="searchicon" v-if="!isShowSearch"><i class="iconfont icon-search"></i></span>
          </div>
          <template v-if="isShowSearch">
            <div class="gy-form-group">
              <span class="l">下游公司名称</span>
              <input type="text" placeholder="请输入下游公司名称">
            </div>
            <div class="gy-form-group">
              <span class="l">合同日期</span>
              <div class="searchDate">
                <div class="d">
                  <el-date-picker
                    v-model="search.payDateStart"
                    type="date"
                    placeholder="开始日期">
                  </el-date-picker>
                </div>
                <div class="c">至</div>
                <div class="d">
                  <el-date-picker
                    v-model="search.payDateEnd"
                    type="date"
                    placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
            </div>
            <div class="gy-form-group">
              <span class="l">业务操作人</span>
              <input type="text" placeholder="请选择">
              <span class="searchicon" v-if="isShowSearch"><i class="iconfont icon-search"></i></span>
            </div>
          </template>
          <div class="clearfix"></div>
        </div>
        <span class="search-btn" @click="ShowSearch">高级搜索<i class="el-input__icon" :class="isShowSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
      </div>
      <div>
        <table class="gy-table">
          <thead>
          <tr>
            <th>签订月份</th>
            <th>主体</th>
            <th>品名</th>
            <th>采购合同编号</th>
            <th>销售合同编号</th>
            <th>供应商</th>
            <th>采购合同数量(吨)</th>
            <th>采购结算数量(吨)</th>
            <th>采购单价(元/吨)</th>
            <th>结算单价(元/吨)</th>
            <th>采购合同总额(元)</th>
            <th>付款总金额(元)</th>
            <th>付款金额1</th>
            <th>付款时间</th>
            <th>付款金额2</th>
            <th>付款时间</th>
            <th>上游交割期</th>
            <th>上游实际交割日</th>
            <th>开票日期</th>
            <th>销售合同编号</th>
            <th>客户</th>
            <th>销售合同数量(吨)</th>
            <th>销售结算数量(吨)</th>
            <th>销售单价(元/吨)</th>
            <th>销售结算单价(元/吨)</th>
            <th>销售总金额</th>
            <th>收款总金额</th>
            <th>收款金额1</th>
            <th>收款时间</th>
            <th>收款金额2</th>
            <th>收款时间</th>
            <th>下游交割时间</th>
            <th>下游实际交割日</th>
            <th>开票日期</th>
            <th>交割完成月</th>
            <th>发票完成月</th>
            <th>毛利</th>
            <th>备注</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isShowSearch: false,
            search: {
                payDateStart: null,
                payDateEnd: null
            }
        };
    },
    methods: {
        ShowSearch () {
            this.isShowSearch = !this.isShowSearch;
        }
    }
};
</script>

<style lang="scss" scoped>
  .search-wrapper {
    padding: 20px 30px;
    position: relative;
    .search-form {
      width: 95%;
    }
    .searchDate {
      display: flex;
      position: relative;
      .d {
        flex: 1;
      }
      .c {
        flex: 0 0 30px;
        text-align: center;
      }
    }
    .search-btn {
      position: absolute;
      right: 40px;
      top: 20px;
      color: #c0c4cc;
    }
    .searchicon {
      position: absolute;
      right: 15px;
      bottom: 15px;
      line-height: 1;
    }
  }
</style>
