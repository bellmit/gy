<template>
    <div style="padding: 0 16px;">
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
            <span class="searchicon" @click="hollowMoreClick(1)"><i class="iconfont icon-search"></i></span>
        </div>
        <table class="gy-table">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>生成时间</th>
                    <th>消息内容</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody v-if="hollowTabList.length > 0">
                <tr v-for="(item, index) in hollowTabList" :key="index">
                    <td>{{item.id}}</td>
                    <td>{{item.createdDate|date(2)}}</td>
                    <td>{{item.message}}</td>
                    <td>
                       <button @click="gotoBizPage(item)" class="gy-button-view" style="background-color: white">查看</button>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="4" style="text-align:center">没有新的消息</td>
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
    activated () {
        if (!this.$route.meta.isBack) {
            this.hollowMoreObj = {};
            this.hollowMoreClick(1);
        }
        this.$route.meta.isBack = false;
    },
    mounted () {
        this.hollowMoreObj.msgType = this.$route.query.activeId + 1;
        // this.hollowMoreClick(1);
    },
    methods: {
        hollowMoreClick (pageNo) {
            this.hollowMoreObj.pageNo = pageNo;
            this.$http.post(this.$api.workbench.getWbMsgList, this.hollowMoreObj).then((res) => {
                if (res.data.code === 0) {
                    this.total = res.data.data.total;
                    this.hollowTabList = res.data.data.rows;
                }
            });
        },
        gotoBizPage (itemInfo) {
            let todoId = itemInfo.id;
            let bizId = itemInfo.targetBizId;
            let bizType = itemInfo.targetBizType;
            let contEssId = itemInfo.contEssId;
            let saleOrderId = itemInfo.saleOrderId;
            let purchaseOrderId = itemInfo.purchaseOrderId;

            // 根据业务区分，去不同页面
            let queryParam = {homeFromFlg: 2, homeBizType: bizType, todoId: todoId};
            if (itemInfo.msgType === 4) {
                // 驳回的情况
                queryParam.homeFromFlg = 4;
            }

            if (bizType === 1) {
                // 合同要素审批
                queryParam.id = contEssId;
                this.$router.push({name: 'contEssDetail', query: queryParam});
            } else if (bizType === 2) {
                // 合同审批
                this.$router.push({name: 'contractDetail', query: {id: contEssId}});
            } else if (bizType === 16) {
                // 创建合同
                if (queryParam.homeFromFlg === 4) {
                    // 驳回的，去合同要素详情
                    queryParam.id = bizId;
                    this.$router.push({name: 'contEssDetail', query: queryParam});
                } else {
                    this.$router.push({name: 'createContract', query: {id: bizId}});
                }
            } else if (bizType === 3) {
                // 付款
                this.$router.push({
                    name: 'paymentBuy',
                    query: {
                        homeFromFlg: 2,
                        homeBizType: bizType,
                        payId: bizId,
                        contEssId: contEssId,
                        purchaseOrderId: purchaseOrderId,
                        todoId: todoId
                    }
                });
            } else if (bizType === 4) {
                // 开发票
                this.$router.push({
                    name: 'auditOperation',
                    query: {
                        homeFromFlg: 2,
                        homeBizType: bizType,
                        id: contEssId,
                        saleOrderId: saleOrderId,
                        purchaseOrderId: purchaseOrderId,
                        todoId: todoId,
                        invoiceId: bizId
                    }
                });
            } else if (bizType === 8 || bizType === 22) {
                // 销售交割
                this.$router.push({
                    name: 'deliverySalesView',
                    query: {homeFromFlg: 2, homeBizType: bizType, dlvItemId: bizId, contEssId: contEssId, doneFlg: 1}
                });
            } else if (bizType === 5) {
                // 收款确认（财务出纳确认）
                this.$router.push({
                    name: 'paymentSell',
                    query: {homeFromFlg: 2, homeBizType: bizType, id: contEssId, collId: bizId}
                });
            } else if (bizType === 6) {
                // 收票（财务出纳确认）
                this.$router.push({
                    name: 'financialConfirmation',
                    query: {
                        homeFromFlg: 2,
                        homeBizType: bizType,
                        id: contEssId,
                        saleOrderId: saleOrderId,
                        purchaseOrderId: purchaseOrderId
                    }
                });
            } else if (bizType === 45) {
                // 去收付款详情
                this.$router.push({
                    name: 'paymentDetail',
                    query: {homeFromFlg: 2, id: contEssId, sellerOrderId: saleOrderId, purchaseOrderId: purchaseOrderId}
                });
            } else if (bizType === 25) {
                // 消息提醒界面，分配执行时驳回，也去要素详情页面
                queryParam.id = contEssId;
                this.$router.push({name: 'contEssDetail', query: queryParam});
            } else if (bizType === 7 || bizType === 26) {
                // 采购交割复核
                queryParam.dlvItemId = bizId;
                queryParam.contEssId = contEssId;
                queryParam.doneFlg = 1;
                this.$router.push({name: 'deliveryPurchaseView', query: queryParam});
            } else if (bizType === 30 || bizType === 31) {
                // 用印审批
                queryParam.id = bizId;
                this.$router.push({name: 'stampApproval', query: queryParam});
            } else if (bizType === 23 || bizType === 29) {
                // 结算
                queryParam.id = todoId;
                queryParam.contEssId = contEssId;
                queryParam.targetBizId = bizId;
                this.$router.push({name: 'settlementDetailBuy', query: queryParam});
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
