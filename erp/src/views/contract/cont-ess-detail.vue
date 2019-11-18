<!-- 合同要素详情 -->
<template>
  <div class="paydetail-wrapper">
    <div class="essential-information">
      <p class="paydetail-title">基本信息</p>
      <cont :list="list"></cont>
    </div>
    <div class="pay-wrapper">
      <div class="receivables-information" v-if="list.contractType === 1 || list.contractType === 2">
        <p class="paydetail-title">采购信息</p>
        <div class="essential-wrapper">
          <cont-sell :list="list"></cont-sell>
        </div>
      </div>
      <!-- TODO 单边情况下 上游公司信息大盒子拆分成两侧 -->
      <div class="receivables-information" v-if="list.contractType === 1 || list.contractType === 3">
        <p class="paydetail-title">销售信息</p>
        <div class="essential-wrapper">
          <cont-buy :list="list"></cont-buy>
        </div>
      </div>
    </div>
    <modifyFieldInfo v-if="list.modifyFieldInfo !== null" :source-cont-ess-id="list.sourceContEssId" :updated-cont-ess-id="list.id"
                       :modify-field-info="modifyFieldInfo"></modifyFieldInfo>
    <div class="essential-information" v-if="hasPass">
      <p class="paydetail-title">审批备注</p>
      <div class="essential-wrapper">
        <div class="essential-row">
          <div class="essential-item">
            <div class="essential-text">
              <textarea name="" class="gy-textarea" v-model="remarks" placeholder="请填写审批备注" id="" cols="30" rows="10"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <button class="gy-button-normal" @click="$router.go(-1)">返回</button>
      <button class="gy-button-extra" v-gy-auth="'to_create_cont_ess'" @click="resubMission()"
              v-if="homeFromFlg === 4 && (list.approveStatus === 7 || list.approveStatus === 10 || list.approveStatus === 11) && list.businessManagerId == userId">重新创建</button>
      <template v-if="hasPass && homeFromFlg === 1">
        <button class="gy-button-normal" @click="reject">驳回</button>
        <button class="gy-button-extra confirmations" @click="approveSub(1)">通过</button>
      </template>
      <button class="gy-button-normal confirmations" @click="contralDetail()" v-if="approveStatus">查看合同</button>
      <button class="gy-button-extra" v-if="changedable && list.approveStatus === 9" v-gy-auth="'to_create_contract'" @click="gotom">修改合同要素</button>
      <button class="gy-button-extra" v-if="changedable && (list.approveStatus === 5 || list.approveStatus === 6)" v-gy-auth="'to_create_cont_ess'" @click="contractRevise()">修改合同要素</button>
    </div>
    <div class="button-wrap" v-if="homeFromFlg === 1 || homeFromFlg === 2">
      <button class="gy-button-extra" @click="comment()">评论</button>
    </div>
    <!-- <gy-operation-history ref="operationHis"></gy-operation-history> -->
    <gy-operation-history ref="operationHis"></gy-operation-history>
    <gy-comment-remark v-if="commentDiog.dialogVisibleRemark === true" :dialog = "commentDiog" :invoice="contessDetailCommpany"></gy-comment-remark>
  </div>
</template>

<script>
import contSell from './orderSell';
import contBuy from './orderBuy';
import cont from './cont';
import gyOperationHistory from './../../components/gyOperationHistoryComment';
import gyCommentRemark from './../../components/gyCommentRemark';
import modifyFieldInfo from './../components/modifyFieldInfo';

export default {
    data () {
        return {
            homeFromFlg: null,
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
                downstreamInfo: { // 下游销售信息
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
                    chattingAmount: null, // 撮合费用
                    chattingCompanyName: null // 撮合公司
                },
                upstreamInfo: {// 上游采购信息
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
                    chattingAmount: null, // 撮合费用
                    chattingCompanyName: null // 撮合公司
                }
            },
            hasPass: true,
            isShowApproval: true,
            changedable: false,
            remarks: null,
            approveStatus: false, // 是否可以查看合同
            userId: null,
            history: [
                {
                    approverId: null, // 审批人ID
                    username: null, // 审批人名称
                    resultCode: null, // 审批结果（0:未审批 1:审批通过 2:审批驳回）
                    msg: null, // 审批意见
                    createdDate: null // 审批日期（时间戳）
                }
            ],
            commentDiog: {
                dialogVisibleRemark: false
            },
            contessDetailCommpany: {
                targetType: 1,
                subSysType: 0,
                targetId: null,
                refFunc: {},
                refParam: {
                    targetId: this.$route.query.id, // 付款单ID
                    targetType: 1
                }
            },
            modifyFieldInfo: {} // 基本信息
        };
    },
    watch: {
        remarks (val) {
            if (val.length > 2500) {
                this.$message({
                    message: '审批备注最多可填写2500字',
                    type: 'warning'
                });
                this.remarks = this.remarks.substr(0, 2500);
            }
        }
    },
    created () {
        this.getdetailOrder();
        this.approveJurisdiction();
    },
    mounted () {
        this.approve1History();
        this.userId = JSON.parse(localStorage.getItem('userInfo')).id;
        this.contessDetailCommpany.targetId = Number(this.$route.query.id);
        this.homeFromFlg = Number(this.$route.query.homeFromFlg);
    },
    methods: {
        contractRevise () { // 修改合同要素
            this.$router.push({name: 'creatEssRevise', query: {id: this.$route.query.id}});
        },
        getdetailOrder () { // 合同要素详情
            let that = this;
            this.$http.get(this.$api.order.orderDetail + '/' + that.$route.query.id).then(response => {
                if (response.data.code === 0) {
                    // 去结果画面
                    that.list = response.data.data;
                    that.modifyFieldInfo = JSON.parse(response.data.data.modifyFieldInfo);

                    // 到了合同阶段就要有"查看合同"按钮
                    that.approveStatus = (that.list.approveStatus >= 4 && that.list.approveStatus <= 6) ||
                        that.list.approveStatus === 8 || that.list.approveStatus === 9 || that.list.approveStatus === 12;

                    // 根据合同执行状况来判断是否可修改合同要素, 只有在未执行时才可以修改
                    if ((that.list.paymentStatus === 0 && that.list.buyDlvyStatus === 0 && that.list.buyReceiptStatus === 0 &&
                            that.list.collectionStatus === 0 && that.list.saleDlvyStatus === 0 && that.list.saleReceiptStatus === 0) ||
                        (that.list.paymentStatus == null && that.list.collectionStatus === 0 && that.list.saleDlvyStatus === 0 && that.list.saleReceiptStatus === 0) ||
                        (that.list.collectionStatus == null && that.list.paymentStatus === 0 && that.list.buyDlvyStatus === 0 && that.list.buyReceiptStatus === 0)) {
                        that.changedable = true;
                    }
                    if (that.list.sourceContEssId) {
                        // 如果该合同要素已经是修改的(变更流程)中的，则不可修改
                        that.changedable = false;
                    }
                    if (that.homeFromFlg === 1 || that.homeFromFlg === 2) {
                        // 只允许从合同要素列表跳转过来时才可显示"修改合同要素"，其他页面跳转都不可以
                        that.changedable = false;
                    }
                } else {
                    that.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 重新提交
        resubMission () {
            this.$router.push({name: 'createEss', query: {id: this.$route.query.id, todoId: this.$route.query.todoId}});
        },
        contralDetail () {
            let query = {
                id: this.$route.query.id // 合同要素id
            };
            this.$router.push({name: 'contractDetailmenu', query: query});
        },
        // 合同审批
        approveSub (type) {
            let that = this;
            let params = {
                todoId: that.$route.query.todoId,
                id: that.$route.query.id, // 合同要素ID
                operaType: type, // 审批结果（1：同意 2：驳回）
                remarks: this.remarks // 审批备注
            };
            if (that.list.sourceContEssId !== null) {
                params.commitType = 1;
            }
            this.$http.post(this.$api.contract.approve, params).then(function (response) {
                if (response.data.code === 0) {
                    that.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    that.$router.push({name: 'home'});
                    // that.hasPass = false;
                    // that.getdetailOrder();
                    // that.approve1History();
                } else {
                    that.$message.error(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 合同审批权限
        approveJurisdiction () {
            let that = this;
            let params = {
                targetId: that.$route.query.id, // 合同要素ID
                targetType: 1
            };
            that.hasPass = false;
            this.$http.post(this.$api.apprProc.hasApproveAuth, params).then(function (response) {
                if (response.data.code === 0) {
                    that.hasPass = true;
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 合同审批记录
        approve1History () {
            let params = {
                targetId: this.$route.query.id, // 合同要素ID
                targetType: 1
            };
            this.$refs.operationHis.display(this.$api.contract.approve1History, params);
        },
        reject () {
            this.$confirm('<span><i class="iconfont icon-message-warning"></i>确认驳回?</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                this.approveSub(2);
            });
        },
        // 评论
        comment () {
            this.commentDiog.dialogVisibleRemark = true;
            this.contessDetailCommpany.refFunc = this.$refs.operationHis.display;
        },
        gotom () {
            this.$router.push({name: 'modifyContract', query: {id: this.$route.query.id}});
        }
    },
    components: {
        contSell,
        contBuy,
        cont,
        gyOperationHistory,
        gyCommentRemark,
        modifyFieldInfo
    }
};
</script>

<style lang="scss" scoped>
  .text-overflow {
      line-height: 30px !important;
  }
  .paydetail-wrapper {
    padding: 20px 0 30px 0;
  }

  .page-bottom {
    font-size: 14px;
    line-height: 14px;
  }

  .paydetail-wrapper {
    .essential-wrapper {
      overflow: auto;
      .gy-table {
        min-width: 700px;
      }
    }
      .paydetail-title {
          font-size: 14px;
      }
  }

  .foot {
    .gy-button-extra {
      margin-left: 8px;
    }
  }
  .button-wrap{
    text-align: right;
    padding-right: 30px;
    position: relative;
    .gy-button-extra{
      position: absolute;
      right: 30px;
      top: 3px;
    }
  }
</style>
