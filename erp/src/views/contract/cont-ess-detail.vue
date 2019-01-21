<!-- 合同要素详情 -->
<template>
  <div class="paydetail-wrapper">
    <div class="essential-information">
      <p class="paydetail-title">基本信息</p>
      <cont :list="list"></cont>
    </div>
    <div class="pay-wrapper">
    <div class="receivables-information" v-if="list.contractType === 1 || list.contractType === 2">
      <p class="paydetail-title">上游公司信息</p>
      <div class="essential-wrapper">
        <cont-sell :list="list"></cont-sell>
      </div>
    </div>
    <!-- TODO 单边情况下 上游公司信息大盒子拆分成两侧 -->
    <div class="receivables-information" v-if="list.contractType === 1 || list.contractType === 3">
      <p class="paydetail-title">下游公司信息</p>
      <div class="essential-wrapper">
        <cont-buy :list="list"></cont-buy>
      </div>
    </div>
    </div>
    <div class="essential-information" v-if="hasPass">
      <p class="">审批备注</p>
      <div class="essential-wrapper">
        <div class="essential-row">
          <div class="essential-item">
            <div class="essential-text">
              <textarea name="" class="gy-textarea" v-model="remarks" placeholder="请填写审批备注" id="" cols="30"
                        rows="10"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="foot">
      <button class="gy-button-normal" @click="$router.go(-1)">返回</button>
      <template v-if="hasPass && $route.query.homeFromFlg === 1">
        <button class="gy-button-normal" @click="reject">驳回</button>
        <button class="gy-button-extra confirmations" @click="approveSub(1)">通过</button>
      </template>
      <button class="gy-button-extra confirmations" @click="contralDetail" v-if="approveStatus">查看合同</button>
    </div>
    <div class="essential-information">
      <p class="paydetail-title">操作流程</p>
      <div v-if="isShowApproval" class="essential-wrapper">
        <table class="gy-table">
          <thead>
          <tr>
            <th style="width: 80px">序号</th>
            <th style="width: 120px">操作人</th>
            <th style="width: 150px">操作时间</th>
            <th style="width: 150px">操作结果</th>
            <th style="width: 200px">备注</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in history" :key="index">
            <td>{{index+1}}</td>
            <td>{{item.username}}</td>
            <td>{{item.createdDate | date(item.createdDate)}}</td>
            <td>{{$constant.approveType[item.resultCode]}}</td>
            <td>{{item.msg}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import contSell from './sell';
import contBuy from './buy';
import cont from './cont';
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
                    paymentType: null, // 交易类型（0：先款后货，1：先货后款）
                    skuPrice: null, // 数量
                    grade: null, // 交易对手评级
                    packagingStandard: null, // 包装标准
                    skuQuantity: null, // 单价（含税）
                    odrContactId: null, // 内部业务联系人ID
                    odrContactName: null, // 内部业务联系人名称
                    depositRatio: null, // 保证金比率（%）
                    depositRatioSubtract: null, // 保证金比率（跌）
                    depositRatioAppend: null, // 保证金比率（补）
                    warehouseFreeDays: null, // 免仓期（天）
                    deliveryType: null, // 交割方式
                    payChannel: null, // 支付渠道
                    remarks: null // 备注
                },
                sellerInfo: {// 上游公司信息
                    companyId: null, // 下游公司id
                    companyName: null, // 下游公司名称
                    skuOrigin: null, // 货源（国产、进口、自定义）
                    deliveryWarehouseId: null, // 交割仓库id
                    deliveryWarehouseName: null, // 交割仓库名称
                    provideInvoiceType: null, // 发票月份
                    provideInvoiceDays: null, // 发票天数
                    paymentType: null, // 交易类型（0：先款后货，1：先货后款）
                    skuPrice: null, // 数量
                    grade: null, // 交易对手评级
                    packagingStandard: null, // 包装标准
                    skuQuantity: null, // 单价（含税）
                    odrContactId: null, // 内部业务联系人ID
                    odrContactName: null, // 内部业务联系人名称
                    depositRatio: null, // 保证金比率（%）
                    depositRatioSubtract: null, // 保证金比率（跌）
                    depositRatioAppend: null, // 保证金比率（补）
                    warehouseFreeDays: null, // 免仓期（天）
                    deliveryType: null, // 交割方式
                    payChannel: null, // 支付渠道
                    remarks: null // 备注
                }
            },
            hasPass: true,
            isShowApproval: true,
            remarks: null,
            status: [4, 5, 6, 8, 9],
            approveStatus: false,
            history: [
                {
                    approverId: null, // 审批人ID
                    username: null, // 审批人名称
                    resultCode: null, // 审批结果（0:未审批 1:审批通过 2:审批驳回）
                    msg: null, // 审批意见
                    createdDate: null // 审批日期（时间戳）
                }
            ]
        };
    },
    watch: {
        remarks (val) {
            if (val.length >= 100) {
                this.$message({
                    message: '备注最多可填写100字',
                    type: 'warning'
                });
                this.remarks = this.remarks.substr(0, 100);
            }
        }
    },
    created () {
        this.getdetailOrder();
        this.approveJurisdiction();
        this.approve1History();
    },
    methods: {
        getdetailOrder () { // 合同要素详情
            let that = this;
            this.$http.get(this.$api.payment.getDetailOrder + that.$route.query.id).then(function (response) {
                if (response.data.code === 0) {
                    // 去结果画面
                    that.list = response.data.data;
                    that.approveStatus = that.status.indexOf(that.list.approveStatus) !== -1;
                } else {
                    that.$alert(response.data.code + ' ' + response.data.message);
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
        // 合同审批
        approveSub (type) {
            let that = this;
            let params = {
                id: that.$route.query.id, // 合同要素ID
                operaType: type, // 审批结果（1：同意 2：驳回）
                remarks: this.remarks // 审批备注
            };
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
            let that = this;
            let params = {
                targetId: that.$route.query.id, // 合同要素ID
                targetType: 1
            };
            this.$http.post(this.$api.contract.approve1History, params).then(function (res) {
                if (res.data.code === 0) {
                    that.history = res.data.data;
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        reject () {
            this.$confirm('确认驳回?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.approveSub(2);
            });
        }
    },
    components: {
        contSell,
        contBuy,
        cont
    }
};
</script>

<style lang="scss" scoped>
  .paydetail-wrapper {
     padding: 0 16px;
  }
  .page-bottom {
    font-size: 14px;
    line-height: 14px;
  }
  .paydetail-wrapper {
      padding-left: 16px;
      padding-right: 16px;
    margin-top: 20px;
    .essential-wrapper {
      overflow: auto;
      .gy-table {
        min-width: 700px;
      }
    }
  }
</style>
