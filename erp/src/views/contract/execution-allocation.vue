<!-- 合同要素详情 -->
<template>
  <div class="paydetail-wrapper">
    <div class="essential-information">
      <p class="paydetail-title">基本信息</p>
      <cont :list="list" ref="contEssVo" @chkPerson="chkPerson" @chkCompany="chkCompany" @onChangeTransactionType="onChangeTransactionType" :isZXFP="isZXFP"></cont>
    </div>
    <div class="pay-wrapper">
      <div class="receivables-information" v-if="list.contractType === 1 || list.contractType === 2">
        <p class="paydetail-title">采购信息</p>
        <div class="essential-wrapper">
          <cont-sell :list="list"></cont-sell>
        </div>
      </div>
      <div class="receivables-information" v-if="list.contractType === 1 || list.contractType === 3">
        <p class="paydetail-title">销售信息</p>
        <div class="essential-wrapper">
          <cont-buy :list="list"></cont-buy>
          <template v-if="isDistribution === 1">
            <div class="essential-row">
              <div class="essential-item">
                <div class="essential-title">下游统计口径</div>
                <div class="essential-text">
                  <div class="essential-text">
                    <el-select v-model="list.downstreamInfo.statisticalCaliber" placeholder="请选择">
                      <el-option v-for="item in statisticalCaliber" :key="item"
                                 :label="item" :value="item">
                        <span>{{item}}</span>
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="essential-row">
              <div class="essential-item">
                <div class="essential-title">下游统计口径</div>
                <div class="essential-text">
                  <div class="essential-text">{{list.downstreamInfo.statisticalCaliber}}</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="foot">
      <button class="gy-button-normal" @click="$router.go(-1)">返回</button>
      <template v-if="isDistribution === 1">
        <button class="gy-button-normal" @click="reject">驳回</button>
        <button class="gy-button-extra confirmations" @click="Sub">分配</button>
      </template>
    </div>
    <gy-operation-history ref="operationHis"></gy-operation-history>
  </div>
</template>

<script>
import contSell from './orderSell';
import contBuy from './orderBuy';
import cont from './cont';
import gyOperationHistory from './../../components/gyOperationHistoryComment';

export default {
    data () {
        return {
            list: {
                id: null, // 合同要素ID
                contEssenceStatus: null, // 合同要素状态
                bizType: null, // 业务类型
                contractType: null, // 单边交易
                createdName: null, // 创建人
                businessManagerId: null, // 业务操作人ID
                businessManagerName: null, // 业务操作人名称
                orgName: null, // 业务组名称
                orderStatus: null, // 订单状态
                createdDate: null, // 创建时间（格式：yyyy-MM-dd HH:mm:ss）
                planBuyDlvyDate: null, // 交割日期(买家)
                planSaleDlvyDate: null, // 交割日期(卖家)
                targetCorpId: null, // 我方公司Id(我方公司)
                targetCorpName: null, // 我方公司名称(我方公司)
                buyerInfo: { // 下游公司信息
                    companyId: null, // 下游公司id
                    companyName: null, // 下游公司名称
                    skuOrigin: null, // 货源（国产、进口、自定义）
                    deliveryWarehouseId: null, // 交割仓库id
                    deliveryWarehouseName: null, // 交割仓库名称
                    provideInvoiceType: null, // 发票月份
                    provideInvoiceDays: null, // 发票天数
                    paymentType: null, // 付款方式（0：先款后货，1：先货后款）
                    skuPrice: null, // 单价（含税）
                    grade: null, // 交易对手评级
                    packagingStandard: null, // 包装标准
                    skuQuantity: null, // 数量
                    odrContactId: null, // 内部业务联系人ID
                    odrContactName: null, // 内部业务联系人名称
                    depositRatio: null, // 保证金比率（%）
                    depositRatioSubtract: null, // 保证金比率（跌）
                    depositRatioAppend: null, // 保证金比率（补）
                    warehouseFreeDays: null, // 免仓期（天）
                    deliveryType: null, // 交割方式
                    payChannel: null, // 支付渠道
                    remarks: null, // 备注
                    planNumber: null, // 计划号
                    statisticalCaliber: null // 统计口径
                },
                sellerInfo: {// 上游公司信息
                    companyId: null, // 下游公司id
                    companyName: null, // 下游公司名称
                    skuOrigin: null, // 货源（国产、进口、自定义）
                    deliveryWarehouseId: null, // 交割仓库id
                    deliveryWarehouseName: null, // 交割仓库名称
                    provideInvoiceType: null, // 发票月份
                    provideInvoiceDays: null, // 发票天数
                    paymentType: null, // 付款方式（0：先款后货，1：先货后款）
                    skuPrice: null, // 单价（含税）
                    grade: null, // 交易对手评级
                    packagingStandard: null, // 包装标准
                    skuQuantity: null, // 数量
                    odrContactId: null, // 内部业务联系人ID
                    odrContactName: null, // 内部业务联系人名称
                    depositRatio: null, // 保证金比率（%）
                    depositRatioSubtract: null, // 保证金比率（跌）
                    depositRatioAppend: null, // 保证金比率（补）
                    warehouseFreeDays: null, // 免仓期（天）
                    deliveryType: null, // 交割方式
                    payChannel: null, // 支付渠道
                    remarks: null, // 备注
                    planNumber: null, // 计划号
                    statisticalCaliber: null // 统计口径
                }
            },
            isShowApproval: true,
            isDistribution: 0,
            remarks: null,
            isZXFP: null,
            status: [4, 5, 6, 8, 9],
            statisticalCaliber: [1, 2, 3],
            history: [
                {
                    approverId: null, // 审批人ID
                    username: null, // 审批人名称
                    resultCode: null, // 审批结果（0:未审批 1:审批通过 2:审批驳回）
                    msg: null, // 审批意见
                    createdDate: null // 审批日期（时间戳）
                }
            ],
            eaSubmit: {
                id: null, // 合同要素ID（没有值是表示新建合同要素）
                executiveId: null, // 执行人ID
                executiveName: null, // 执行人名称
                targetCorpId: null, // 居间方公司Id(我方公司)
                targetCorpName: null, // 居间方公司名称(我方公司)
                purchaseOrderId: null, // 采购订单ID
                purchaseStatisticalCaliber: null, // 采购统计口径
                saleOrderId: null, // 销售订单ID
                saleStatisticalCaliber: null // 销售统计口径
            }
        };
    },
    watch: {
        isDistribution () {
            this.isZXFP = this.isDistribution;
        }
    },
    mounted () {
        this.getdetailOrder();
        this.approve1History();
    },
    methods: {
        getdetailOrder () { // 合同要素详情
            this.$http.get(this.$api.order.orderDetail + '/' + this.$route.query.id).then((response) => {
                if (response.data.code === 0) {
                    // 去结果画面
                    this.list = response.data.data;
                    this.eaSubmit.id = this.list.id;
                    this.eaSubmit.purchaseOrderId = this.list.purchaseOrderId;
                    this.eaSubmit.saleOrderId = this.list.saleOrderId;
                    this.eaSubmit.targetCorpName = this.list.targetCorpName;
                    this.eaSubmit.targetCorpId = this.list.targetCorpId;
                    this.eaSubmit.transactionType = this.list.transactionType;
                    if ((this.list.distributeType !== 1 && this.list.distributeType !== 2) ||
                        this.$route.query.doneFlg === 0 || this.$route.query.doneFlg === '0') {
                        this.isDistribution = 1;
                    }
                    if (this.$route.query.doneFlg === 1 || this.$route.query.doneFlg === '1') {
                        this.isDistribution = 0;
                    }
                    this.eaSubmit.executiveId = this.list.executiveId;
                    this.eaSubmit.executiveName = this.list.executiveName;

                    // 设置我方公司
                    this.$refs.contEssVo.targetCorpIdbuy = this.list.targetCorpId;
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        contralDetail () {
            let query = {
                id: this.$route.query.id // 合同要素id
            };
            this.$router.push({name: 'contractDetailmenu', query: query});
        },
        // 合同审批记录
        approve1History () {
            let params = {
                targetId: this.$route.query.id, // 合同要素ID
                targetType: 1
            };
            this.$refs.operationHis.display(this.$api.contract.approve1History, params);
        },
        onChangeTransactionType (item) {
            // 更改合同交易类型
            this.eaSubmit.transactionType = item;
        },
        chkPerson (item) {
            this.eaSubmit.executiveId = item.usrUserId;
            this.eaSubmit.executiveName = item.userName;
        },
        chkCompany (item) {
            this.list.targetCorpName = item.targetCorpName;
            this.list.targetCorpId = item.targetCorpId;
            this.eaSubmit.targetCorpName = item.targetCorpName;
            this.eaSubmit.targetCorpId = item.targetCorpId;
        },
        Sub () {
            this.eaSubmit.todoId = Number(this.$route.query.todoId);
            console.log(this.eaSubmit.targetCorpId);
            if (this.eaSubmit.executiveId === null || this.eaSubmit.executiveId === undefined) {
                this.$message.warning('请先选择执行人员');
                return;
            }
            if (this.eaSubmit.targetCorpId === null || this.eaSubmit.targetCorpId === undefined) {
                this.$message.warning('请先选择我方公司');
                return;
            }
            if (this.eaSubmit.transactionType === null || this.eaSubmit.transactionType === undefined) {
                this.$message.warning('请先选择交易类型');
                return;
            }
            if (this.list.downstreamInfo) {
                this.eaSubmit.saleStatisticalCaliber = this.list.downstreamInfo.statisticalCaliber;
            }
            this.$http.post(this.$api.contract.essenceUpdate, this.eaSubmit)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('分配成功!');
                        this.$router.go(-1);
                    } else {
                        this.$message.error(res.data.code + ' ' + res.data.message);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        approveSub () {
            // 驳回合同要素
            this.$http.post(this.$api.contract.rejectContEss, {id: this.list.id, todoId: this.$route.query.todoId})
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('操作成功!');
                        this.$router.go(-1);
                    } else {
                        this.$message.error(res.data.code + ' ' + res.data.message);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        reject () {
            // 驳回合同要素
            this.$confirm('<span><i class="iconfont icon-message-warning"></i>确认驳回?</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                this.approveSub();
            });
        }
    },
    components: {
        contSell,
        contBuy,
        cont,
        gyOperationHistory
    }
};
</script>

<style lang="scss" scoped>
  .page-bottom {
    font-size: 14px;
    line-height: 14px;
  }

  .paydetail-wrapper {
    margin-top: 20px;
    .essential-wrapper {
      overflow: auto;
      .gy-table {
        min-width: 700px;
      }
    }
  }
</style>
