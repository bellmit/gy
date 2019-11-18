<template>
    <div style="padding: 0 16px;">
        <div class="gy-form-group">
            <span class="l">时间</span>
            <div class="searchDate">
                <div class="d" style="width: 45%;display: inline-block">
                    <el-date-picker
                            type="date"
                            v-model="hollowMoreObj.staDate"
                            value-format="timestamp"
                            placeholder="开始时间">
                    </el-date-picker>
                </div>
                <div class="c" style="width: 5%;display: inline-block">至</div>
                <div class="d" style="width: 45%;display: inline-block">
                    <el-date-picker
                            type="date"
                            v-model="hollowMoreObj.endDate"
                            value-format="timestamp"
                            @change="hollowMoreObj.endDate = $tools.convertDateEnd(hollowMoreObj.endDate)"
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
                    <th style="width:600px;">事项内容</th>
                    <th>发起人</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody v-if="hollowTabList.length > 0">
                <tr v-for="(item, index) in hollowTabList" :key="index">
                    <td>{{item.id}}</td>
                    <td>{{item.createdDate|date(2)}}</td>
                    <td>
                        <span v-if="item.doneFlg === 0">{{item.todoMsg}}</span>
                        <span v-if="item.doneFlg === 1">{{item.doneMsg}}</span>
                    </td>
                    <td>{{item.creatorName}}</td>
                    <td>
                        <button v-if="item.doneFlg === 0" class="gy-button-view" style="background-color: white" @click="gotoBizPage(item)">立即处理</button>
                        <button v-if="item.doneFlg === 1" @click="gotoBizPage(item)" class="gy-button-view" style="background-color: white">查看</button>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="5" style="text-align:center" v-if="activeId === 0">没有新的待办事项</td>
                <td colspan="5" style="text-align:center" v-if="activeId === 1">没有新的已办事项</td>
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
    name: 'homeMoreTodoList',
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
                doneFlg: 0
            }
        };
    },
    activated () {
        if (!this.$route.meta.isBack) {
            this.hollowMoreObj = {};
            this.activeId = Number(this.$route.query.activeId);
            this.hollowMoreObj.doneFlg = Number(this.$route.query.activeId);
            this.hollowMoreClick(1);
        }
        this.$route.meta.isBack = false;
    },
    mounted () {
        // this.activeId = Number(this.$route.query.activeId);
        // this.hollowMoreObj.doneFlg = Number(this.$route.query.activeId);
        // this.hollowMoreClick(1);
    },
    methods: {
        hollowMoreClick (pageNo) {
            this.hollowMoreObj.pageNo = pageNo;
            // if (this.hollowMoreObj.endDate) {
            //     this.hollowMoreObj.endDate = this.hollowMoreObj.endDate + 86399999;
            // }
            this.$http.post(this.$api.workbench.getWbTodoList, this.hollowMoreObj).then((res) => {
                if (res.data.code === 0) {
                    this.total = res.data.data.total;
                    this.hollowTabList = res.data.data.rows;
                }
            });
        },
        gotoBizPage (todoInfo) {
            // 根据业务区分，去不同页面
            let todoId = todoInfo.id;
            let bizId = todoInfo.targetBizId;
            let bizType = todoInfo.targetBizType;
            let contEssId = todoInfo.contEssId;
            let saleOrderId = todoInfo.saleOrderId;
            let purchaseOrderId = todoInfo.purchaseOrderId;
            let doneFlg = todoInfo.doneFlg;
            let actTaskId = todoInfo.actTaskId;
            if ((todoInfo.subSysType !== null && todoInfo.subSysType !== undefined && todoInfo.subSysType !== 0) ||
                    (todoInfo.subSysType === 0 && bizType === 30)) {
                // 去通用的审批页面
                this.$router.push({name: 'apprCreate', query: {homeFromFlg: 1, bizId: bizId, bizType: bizType, subSysType: todoInfo.subSysType, doneFlg: doneFlg, todoId: todoId, actTaskId: actTaskId}});
                return false;
            }
            if (todoInfo.frontPageUrlName) {
                // 去定制的审批页面
                todoInfo.homeFromFlg = 1;
                todoInfo.todoId = todoInfo.id;
                this.$router.push({name: todoInfo.frontPageUrlName, query: todoInfo});
                return false;
            }

            let queryParam = {homeFromFlg: 1, homeBizType: bizType, doneFlg: doneFlg, actTaskId: actTaskId, todoId: todoId};
            if (bizType === 1) {
                // 合同要素审批
                queryParam.id = contEssId;
                this.$router.push({name: 'contEssDetail', query: queryParam});
            } else if (bizType === 2 || bizType === 19) {
                // 合同审批
                queryParam.id = contEssId;
                this.$router.push({name: 'contractDetail', query: queryParam});
            } else if (bizType === 16 && this.activeId === 0) {
                // 创建合同
                queryParam.id = bizId;
                this.$router.push({name: 'createContract', query: queryParam});
            } else if (bizType === 16 && this.activeId === 1) {
                // 创建合同(已完成)，去合同详情
                queryParam.id = bizId;
                this.$router.push({name: 'contractDetail', query: queryParam});
            } else if (bizType === 3 || bizType === 13 || bizType === 27 || bizType === 28) {
                // 付款审批 / 出纳付款 / 多次付款
                if (bizType === 27 || bizType === 28) {
                    // 如果是分批付款，则使用分批付款ID
                    queryParam.multiPayId = bizId;
                } else {
                    queryParam.payId = bizId;
                }
                queryParam.contEssId = contEssId;
                queryParam.purchaseOrderId = purchaseOrderId;
                this.$router.push({name: 'paymentBuy', query: queryParam});
            } else if (bizType === 4 || bizType === 11 || bizType === 17) {
                // 开发票
                queryParam.id = contEssId;
                queryParam.saleOrderId = saleOrderId;
                queryParam.purchaseOrderId = purchaseOrderId;
                queryParam.invoiceId = bizId;
                this.$router.push({name: 'auditOperation', query: queryParam});
            } else if (bizType === 8 || bizType === 22) {
                // 销售交割复核
                queryParam.dlvItemId = bizId;
                queryParam.contEssId = contEssId;
                this.$router.push({name: 'deliverySalesView', query: queryParam});
            } else if (bizType === 5 || bizType === 12) {
                // 收款确认（财务出纳确认）
                queryParam.collId = bizId;
                queryParam.contEssId = contEssId;
                this.$router.push({name: 'paymentSell', query: queryParam});
            } else if (bizType === 6 || bizType === 14) {
                // 收票（财务出纳确认）
                queryParam.id = contEssId;
                queryParam.saleOrderId = saleOrderId;
                queryParam.purchaseOrderId = purchaseOrderId;
                this.$router.push({name: 'financialConfirmation', query: queryParam});
            } else if (bizType === 25) {
                // 去分配执行人员
                queryParam.id = contEssId;
                this.$router.push({name: 'executionAllocation', query: queryParam});
            } else if (bizType === 7 || bizType === 26) {
                // 采购交割复核
                queryParam.dlvItemId = bizId;
                queryParam.contEssId = contEssId;
                this.$router.push({name: 'deliveryPurchaseView', query: queryParam});
            } else if (bizType === 31 || bizType === 30) {
                // 用印-上传文件
                queryParam.id = bizId;
                this.$router.push({name: 'stampApproval', query: queryParam});
            } else if (bizType === 29) {
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
