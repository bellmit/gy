<template>
    <div>
        <div class="gy-form-group">
            <span class="l">时间</span>
            <div class="searchDate">
                <div class="d" style="width: 45%;display: inline-block">
                  <el-date-picker
                    type="date"
                    v-model="hollowMoreObj.staDate"
                    value-format="yyyy-MM-dd"
                    placeholder="开始时间">
                  </el-date-picker>
                </div>
                <div class="c" style="width: 5%;display: inline-block">至</div>
                <div class="d" style="width: 45%;display: inline-block">
                  <el-date-picker
                    type="date"
                    v-model="hollowMoreObj.endDate"
                    value-format="yyyy-MM-dd"
                    placeholder="结束时间">
                  </el-date-picker>
                </div>
            </div>
        </div>
        <div class="gy-form-group">
            <span class="l">关键字</span>
            <input type="text" placeholder="输入关键字"  v-model="hollowMoreObj.keywords">
            <span class="searchicon" @click="hollowMoreClick"><i class="iconfont icon-search"></i></span>
        </div>
        <table class="gy-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>生成时间</th>
                    <th>预警信息</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in hollowTabList" :key="index">
              <td>{{index + 1}}</td>
              <td>{{item.createdDate|date(2)}}</td>
              <td>{{item.message}}</td>
              <td>
                <button @click="msgGoPage(item)" class="gy-button-view" style="background-color: white">查看</button>
              </td>
            </tr>
            </tbody>
        </table>
      <!-- 翻页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync = "hollowMoreObj.pageNo"
        :page-size="hollowMoreObj.pageSize"
        :total="total"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'homeMoreAlarmList',
    data () {
        return {
            hollowTabList: [],
            total: null,
            activeId: null,
            hollowMoreObj: {
                pageNo: 1,
                pageSize: 10,
                staDate: null,
                endDate: null,
                keywords: null,
                msgType: 3,
                targetType: null
            }
        };
    },
    mounted () {
        this.hollowMoreClick();
    },
    methods: {
        hollowMoreClick () {
            this.$http.post(this.$api.workbench.getWbMsgList, this.hollowMoreObj).then((res) => {
                if (res.data.code === 0) {
                    this.total = res.data.data.total;
                    this.hollowTabList = res.data.data.rows;
                }
            });
        },
        msgGoPage (item) {
        // 这里只有收付款/交割
            if (item.targetBizType === 40 || item.targetBizType === 41) {
                // 弹框
                this.$alert(item.message, '库存报警');
            } else if (item.targetBizType === 42 || item.targetBizType === 43) {
                // 去交割详情
                this.$router.push({name: 'deliveryDetail', query: {homeFromFlg: 1, id: item.contEssId, saleOrderId: item.saleOrderId, purchaseOrderId: item.purchaseOrderId}});
            } else if (item.targetBizType === 44) {
                // 去收付款详情
                this.$router.push({name: 'paymentDetail', query: {homeFromFlg: 1, id: item.contEssId, sellerOrderId: item.saleOrderId, purchaseOrderId: item.purchaseOrderId}});
            }
        },
        // 分页
        handleCurrentChange (r) {
            this.hollowMoreObj.pageNo = r;
            this.hollowMoreClick();
        },
        getList () {

        }
    }
};
</script>

<style scoped>
  .searchicon {
    position: absolute;
    right: 10px;
    top: auto;
    bottom: 10px;
  }
</style>
