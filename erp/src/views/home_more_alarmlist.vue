<template>
    <div style="padding: 0 16px;">
        <div class="gy-form-group">
          <span class="l">预警类型</span>
          <el-select v-model="hollowMoreObj.targetBizType">
            <el-option
              v-for="(item, index) in $constant.alarmTypeList"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="gy-form-group">
            <span class="l">关键字</span>
            <input type="text" placeholder="输入关键字"  v-model="hollowMoreObj.keywords">
            <span class="searchicon" @click="hollowMoreClick(1)"><i class="iconfont icon-search"></i></span>
        </div>
        <table class="gy-table">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>类型</th>
                    <th>预警信息</th>
                    <th>计划交割日期</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody v-if="hollowTabList.length > 0">
              <tr v-for="(item, index) in hollowTabList" :key="index">
                <td>{{item.id}}</td>
                <td>{{item.targetBizType|alarmTypeList}}</td>
                <td>{{item.message}}</td>
                <td>{{item.createdDate|date()}}</td>
                <td>
                  <button @click="msgGoPage(item)" class="gy-button-view" style="background-color: white">查看</button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="4" style="text-align:center">没有预警信息</td>
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
        @current-change="hollowMoreClick">
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
    activated () {
        if (!this.$route.meta.isBack) {
            this.hollowMoreObj = {};
            this.hollowMoreClick(1);
        }
        this.$route.meta.isBack = false;
    },
    mounted () {
        // this.hollowMoreClick(1);
    },
    methods: {
        hollowMoreClick (pageNo) {
            this.hollowMoreObj.pageNo = pageNo;
            this.hollowMoreObj.staDate = new Date();
            this.hollowMoreObj.staDate.setHours(0);
            this.hollowMoreObj.staDate.setMinutes(0);
            this.hollowMoreObj.staDate.setSeconds(0);
            this.hollowMoreObj.staDate.setMilliseconds(0);
            this.hollowMoreObj.endDate = new Date();
            this.hollowMoreObj.endDate.setHours(23);
            this.hollowMoreObj.endDate.setMinutes(59);
            this.hollowMoreObj.endDate.setSeconds(59);
            this.hollowMoreObj.endDate.setMilliseconds(0);
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
