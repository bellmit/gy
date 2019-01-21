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
            <input type="text" placeholder="输入关键字" v-model="hollowMoreObj.keywords">
            <span class="searchicon" @click="hollowMoreClick"><i class="iconfont icon-search"></i></span>
        </div>
        <table class="gy-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>生成时间</th>
                    <th>消息内容</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in hollowTabList" :key="index">
                    <td>{{index + 1}}</td>
                    <td>{{item.createdDate|date(2)}}</td>
                    <td>{{item.message}}</td>
                    <td>
                       <button @click="gotoBizPage(item.targetBizId, item.targetBizType, item.contEssId, item.saleOrderId, item.purchaseOrderId)" class="gy-button-view" style="background-color: white">查看</button>
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
    name: 'homeMoreMsgList',
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
                msgType: null,
                targetType: null
            }
        };
    },
    mounted () {
        this.hollowMoreObj.msgType = this.$route.query.activeId + 1;
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
        gotoBizPage (bizId, bizType, contEssId, saleOrderId, purchaseOrderId) {
            // 根据业务区分，去不同页面
            if (bizType === 1) {
                // 合同要素审批
                this.$router.push({name: 'contEssDetail', query: {id: contEssId}});
            } else if (bizType === 2) {
                // 合同审批
                this.$router.push({name: 'contractDetail', query: {id: contEssId}});
            } else if (bizType === 16) {
                // 创建合同
                this.$router.push({name: 'createContract', query: {id: bizId}});
            } else if (bizType === 3) {
                // 付款
                this.$router.push({name: 'paymentBuy', query: {homeFromFlg: 1, homeBizType: bizType, payId: bizId, contEssId: contEssId, purchaseOrderId: purchaseOrderId}});
            } else if (bizType === 4) {
                // 开发票
                this.$router.push({name: 'auditOperation', query: {homeFromFlg: 1, homeBizType: bizType, id: contEssId, saleOrderId: saleOrderId, purchaseOrderId: purchaseOrderId}});
            } else if (bizType === 8) {
                // 销售交割
                this.$router.push({name: 'deliverySalesView', query: {homeFromFlg: 1, homeBizType: bizType, dlvItemId: bizId, contEssId: contEssId}});
            } else if (bizType === 5) {
                // 收款确认（财务出纳确认）
                this.$router.push({name: 'paymentSell', query: {homeFromFlg: 1, homeBizType: bizType, id: contEssId, collId: bizId}});
            } else if (bizType === 6) {
                // 收票（财务出纳确认）
                this.$router.push({name: 'financialConfirmation', query: {homeFromFlg: 1, homeBizType: bizType, id: contEssId, saleOrderId: saleOrderId, purchaseOrderId: purchaseOrderId}});
            } else if (bizType === 45) {
                // 去收付款详情
                this.$router.push({name: 'paymentDetail', query: {homeFromFlg: 1, id: contEssId, sellerOrderId: saleOrderId, purchaseOrderId: purchaseOrderId}});
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
