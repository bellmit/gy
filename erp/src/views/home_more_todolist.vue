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
                    <th>事项内容</th>
                    <th>发起人</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in hollowTabList" :key="index">
                    <td>{{index + 1}}</td>
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
    mounted () {
        this.hollowMoreObj.doneFlg = this.$route.query.activeId;
        this.hollowMoreClick();
    },
    methods: {
        hollowMoreClick () {
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
            if (todoInfo.subSysType !== 0) {
                // 去通用的审批页面
                this.$router.push({name: 'apprCreate', query: {homeFromFlg: 1, bizId: bizId, bizType: bizType, subSysType: todoInfo.subSysType, doneFlg: doneFlg, todoId: todoId}});
                return false;
            }

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
            } else if (bizType === 4 || bizType === 11 || bizType === 17) {
                // 开发票
                this.$router.push({name: 'auditOperation', query: {homeFromFlg: 1, homeBizType: bizType, id: contEssId, saleOrderId: saleOrderId, purchaseOrderId: purchaseOrderId, doneFlg: doneFlg, todoId: todoId}});
            } else if (bizType === 8) {
                // 销售交割复核
                this.$router.push({name: 'deliverySalesView', query: {homeFromFlg: 1, homeBizType: bizType, dlvItemId: bizId, contEssId: contEssId, todoId: todoId}});
            } else if (bizType === 5) {
                // 收款确认（财务出纳确认）
                this.$router.push({name: 'paymentSell', query: {homeFromFlg: 1, homeBizType: bizType, id: contEssId, collId: bizId, todoId: todoId}});
            } else if (bizType === 6) {
                // 收票（财务出纳确认）
                this.$router.push({name: 'financialConfirmation', query: {homeFromFlg: 1, homeBizType: bizType, id: contEssId, saleOrderId: saleOrderId, purchaseOrderId: purchaseOrderId, doneFlg: doneFlg, todoId: todoId}});
            } else if (bizType === 25) {
                // 去分配执行人员
                this.$router.push({name: 'executionAllocation', query: {homeFromFlg: 1, id: contEssId}});
            }
        },
        // 分页
        handleCurrentChange (r) {
            this.hollowMoreObj.pageNo = r;
            this.hollowMoreClick();
        },
        endDateChange (v) {
            console.log(v);
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
