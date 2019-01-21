<!-- 收付款详情 -->
<template>
<div class="paydetail-wrapper my-payment-detail">
  <div class="essential-information">
    <p class="paydetail-title">基本信息</p>
    <pay-cont :list="list"></pay-cont>
  </div>
  <div class="receivables-information">
    <p class="paydetail-title">收款信息</p>
    <div class="essential-wrapper">
      <div class="essential-row">
        <div class="essential-item">
          <div class="essential-title">下游公司</div>
          <div class="essential-text">{{list.buyerCompanyName}}</div>
        </div>
      </div>
      <div class="essential-row">
        <div class="essential-item">
          <div class="essential-title">合同金额(元)</div>
          <div class="essential-text">{{buys1.contractAmount | numToCash}}</div>
        </div>
        <div class="essential-item">
          <div class="essential-title">待收金额(元)</div>
          <div class="essential-text">{{buys1.needCollectionTotal | numToCash}}</div>
        </div>
      </div>
    </div>
    <div class="payment-elTable">
      <p class="paydetail-title1">收款记录</p>
      <div class="essential-wrapper">
        <div class="gy-table">
          <el-table
            :data="buys"
            style="width: 100%">
            <el-table-column
              label="编号"
              fixed
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              width="100">
              <template slot-scope="scope">
                <span>{{scope.row.collectionStatus === 10 ? '已创建' : '已确认'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="收款凭证"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.erpCollectionFileModelList.length !== 0" @click="showImg(scope.row, 1)"><i
                  class="iconfont icon-photo"></i></span>
                <span v-else><i class="iconfont icon-photo-null"></i></span>
              </template>
            </el-table-column>
            <el-table-column
              label="下游付款凭证"
              width="130">
              <template slot-scope="scope">
                <span v-if="scope.row.erpBuyerPaymentFileModelList.length !== 0" @click="showImg(scope.row, 9)"><i
                  class="iconfont icon-photo"></i></span>
                <span v-else><i class="iconfont icon-photo-null"></i></span>
              </template>
            </el-table-column>
            <el-table-column
              label="收款金额(元)"
              width="160">
              <template slot-scope="scope">
                <span>{{scope.row.collectionAmount | numToCash}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="付款用途"
              width="120">
              <template slot-scope="scope">
                <span>{{$constant.collectionType[scope.row.collectionType]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="到账日期"
              width="120">
              <template slot-scope="scope">
                <span>{{scope.row.collectionDate | date}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
              width="80">
              <template slot-scope="scope">
                <span class="gy-button-view gy-span" @click="showRecord(scope.row, 1)">查看</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
  <div class="payment-information">
    <p class="paydetail-title">付款信息</p>
    <div class="essential-wrapper">
      <div class="essential-row">
        <div class="essential-item">
          <div class="essential-title">上游公司</div>
          <div class="essential-text">{{list.sellerCompanyName}}</div>
        </div>
      </div>
      <div class="essential-row">
        <div class="essential-item">
          <div class="essential-title">合同金额(元)</div>
          <div class="essential-text">{{sales.contractAmount | numToCash}}</div>
        </div>
        <div class="essential-item">
          <div class="essential-title">待付金额(元)</div>
          <div class="essential-text">{{sales.needPaymentTotal | numToCash}}</div>
        </div>
      </div>
    </div>
    <!--<div class="essential-wrapper">
      <div class="essential-row">
        <div class="essential-item">
          <div class="essential-title">合同金额(元)</div>
          <div class="essential-text">{{sales.contractAmount | numToCash}}</div>
        </div>
        <div class="essential-item">
          <div class="essential-title">已付金额(元)</div>
          <div class="essential-text">{{sales.hadPaymentTotal | numToCash}}</div>
        </div>
      </div>
      <div class="essential-row">
        <div class="essential-item">
          <div class="essential-title">结算金额(元)</div>
          <div class="essential-text">{{sales.settleAmount | numToCash}}</div>
        </div>
        <div class="essential-item">
          <div class="essential-title">待付金额(元)</div>
          <div class="essential-text">{{sales.needPaymentTotal | numToCash}}</div>
        </div>
      </div>
    </div>-->
    <div class="payment-elTable">
      <p class="paydetail-title1">付款记录</p>
      <div class="essential-wrapper">
        <div class="gy-table">
          <el-table
            :data="sales.list"
            style="width: 100%">
            <el-table-column
              fixed
              label="编号"
              width="110">
              <template slot-scope="scope">
                <span>{{scope.row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              width="120">
              <template slot-scope="scope">
                <span>{{scope.row.approveStatusStr}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="付款凭证"
              width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.paymentVoucher && scope.row.paymentVoucher.length !== 0"
                      @click="showImg(scope.row, 2)"><i class="iconfont icon-photo"></i></span>
                <span v-else><i class="iconfont icon-photo-null"></i></span>
              </template>
            </el-table-column>
            <el-table-column
              label="付款金额(元)"
              width="150">
              <template slot-scope="scope">
                <span>{{scope.row.payTotalStr | numToCash}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="付款用途"
              width="120">
              <template slot-scope="scope">
                <span>{{scope.row.payMethodStr}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="收款单位"
              width="220">
              <template slot-scope="scope">
                <span>{{scope.row.sellerCorpName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="开户行"
              width="200">
              <template slot-scope="scope">
                <span>{{scope.row.sellerDepositBank}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="银行账号"
              width="240">
              <template slot-scope="scope">
                <span>{{scope.row.sellerAccount}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="付款方式"
              width="240">
              <template slot-scope="scope">
                <span>{{scope.row.tradeModeStr}}</span> <!--新加-->
              </template>
            </el-table-column>
            <el-table-column
              label="经办人"
              width="120">
              <template slot-scope="scope">
                <span>{{scope.row.createUserName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="申请日期"
              width="120">
              <template slot-scope="scope">
                <span>{{scope.row.createdDate | date}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="出账日期"
              width="120">
              <template slot-scope="scope">
                <span>{{scope.row.payTime | date}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="付款说明"
              width="200">
              <template slot-scope="scope">
              <span>{{scope.row.payDescStr}}
                <el-popover
                  placement="top-start"
                  width="360"
                  trigger="hover">
                  <el-table :data="scope.row.paymentInfoModels">
                      <el-table-column label="序号" width="60" type="index"></el-table-column>
                      <el-table-column label="申请金额(元)" width="120">
                        <template slot-scope="scope">
                          <span>{{scope.row.payAmount | numToCash}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column property="description" label="备注" width="150"></el-table-column>
                    </el-table>
                  <el-button type="text" slot="reference" v-if="scope.row.payDesc === 3">查看明细</el-button>
                </el-popover>
              </span>
              </template>
            </el-table-column>
            <el-table-column
              label="备注"
              width="200">
              <template slot-scope="scope">
                <span>{{scope.row.remarks}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
              width="110">
              <template slot-scope="scope">
                <span class="gy-button-view gy-span" @click="showRecord(scope.row, 2)">查看</span>
                <span class="gy-button-view gy-span" @click="exportExcel(scope.row)">下载</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
  <div class="foot">
    <button class="gy-button-normal" @click="$router.go(-1)">返回</button>
  </div>
  <dialog-img v-if="dialogVisible" @closedialogvisible="closedialogvisible" :dialogVisible="dialogVisible" :dialogImg="erpCollectionFileModelList"></dialog-img>
</div>
</template>

<script>
import payCont from './pay-cont';
import dialogImg from './../components/dialogImg';
export default {
    data () {
        return {
            buys: [],
            sales: {
                contractAmount: null, // 合同金额
                hadPaymentTotal: null, // 已付款金额
                settleAmount: null, // 结算金额
                needPaymentTotal: null, // 待付款金额
                list: []
            },
            paymentAndCollection: {
                id: null, // 合同要素id
                purchaseOrderId: null, // 采购单号
                sellerOrderId: null // 销售单号
            },
            order: {
                bizType: null, // 业务类型
                orderStatus: null, // 订单状态
                createdDate: null, // 创建时间
                businessManagerName: null // 业务操作人
            },
            list: {
                id: null, // 合同要素ID
                contEssenceStatus: null, // 合同要素状态
                bizType: null, // 业务类型
                contractType: null, // 单边交易
                createdName: null, // 创建人
                businessManagerId: null, // 业务操作人ID
                businessManagerName: null, // 业务操作人名称
                orderStatus: null, // 订单状态
                createdDate: null, // 创建时间（格式：yyyy-MM-dd HH:mm:ss）
                planBuyDlvyDat: null, // 交割日期(买家)
                planSaleDlvyDate: null, // 交割日期(卖家)
                buyerInfo: {
                    orderSn: null
                },
                sellerInfo: {
                    orderSn: null
                }
            },
            contractAmount: null,
            buys1: {
                contractAmount: null, // 合同金额
                alreadyCollectionTotal: null, // 已收款金额
                shouldCollectionTotal: null, // 应收款金额
                needCollectionTotal: null // 待收款金额
            },
            dialogVisible: false,
            dialogVisible1: false,
            erpCollectionFileModelList: []
        };
    },
    created () {
        this.paymentAndCollection = this.$route.query;
        console.log(this.$route.query);
        this.getdetailCollection();
        this.getdetailOrder();
        this.getdetail();
    },
    methods: {
        getdetail () { // 付款详情
            let that = this;
            let query = {
                purchaseOrderId: that.paymentAndCollection.purchaseOrderId, // 采购订单ID
                paymentId: null // 付款单ID
            };
            this.$http.post(this.$api.payment.getDetail, query).then(function (response) {
                if (response.data.code === 0) {
                    // 去结果画面
                    that.sales = response.data.data;
                    // 查看明细的内容存储
                    for (let i = 0; i < that.sales.list.length; i++) {
                        if (that.sales.list[i].payDesc === 3) {
                            that.$http.get(that.$api.payment.paymentInfoList + that.sales.list[i].id).then(function (response) {
                                if (response.data.code === 0) {
                                    that.$set(that.sales.list[i], 'paymentInfoModels', response.data.data.paymentInfoModels);
                                } else {
                                    that.$alert(response.data.code + ' ' + response.data.message);
                                }
                            }).catch((e) => {
                                console.log(e);
                            });
                        }
                    }
                    console.log(that.sales.list);
                } else {
                    that.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        getdetailCollection () { // 收款详情
            let that = this;
            this.$http.get(this.$api.payment.getDetailCollection + that.paymentAndCollection.sellerOrderId).then(function (response) {
                if (response.data.code === 0) {
                    // 去结果画面
                    that.buys = response.data.data.erpCollectionModelList;
                    that.buys1 = response.data.data;
                    that.contractAmount = response.data.data.contractAmount;
                } else {
                    that.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        getdetailOrder () { // 合同要素详情
            let that = this;
            this.$http.get(this.$api.payment.getDetailOrder + that.paymentAndCollection.id).then(function (response) {
                if (response.data.code === 0) {
                    that.list = response.data.data;
                } else {
                    that.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        showImg (idx, type) {
            this.dialogVisible = true;
            let arr = [];
            switch (type) {
            case 1:
                this.erpCollectionFileModelList = idx.erpCollectionFileModelList;
                break;
            case 2:
                idx.paymentVoucher.split(',').forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 3:
                this.list.sellerInfo.fileAttachList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 4:
                this.list.sellerInfo.fileDocUrl.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 5:
                this.list.buyerInfo.fileAttachList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 6:
                this.list.buyerInfo.fileDocUrl.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 7:
                this.list.sellerInfo.fileAttachCertifiedList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 8:
                this.list.buyerInfo.fileAttachCertifiedList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.erpCollectionFileModelList = arr;
                break;
            case 9:
                this.erpCollectionFileModelList = idx.erpBuyerPaymentFileModelList;
                break;
            default:
                this.erpCollectionFileModelList = [];
                break;
            }
        },
        closedialogvisible () {
            this.dialogVisible = false;
        },
        showRecord (item, type) {
            let that = this;
            if (type === 2) {
                this.$router.push(
                    {
                        name: 'paymentBuy',
                        query: {
                            payId: item.id,
                            purchaseOrderId: that.paymentAndCollection.purchaseOrderId,
                            contEssId: that.list.id
                        }
                    }
                );
            } else {
                this.$router.push(
                    {
                        name: 'paymentSell',
                        query: {
                            todoId: item.todoId,
                            collId: item.id,
                            contEssId: that.list.id
                        }
                    }
                );
            }
        },
        exportExcel (item) {
            // 下载付款申请单
            let that = this;
            let params = {};
            params.paymentId = item.id;
            params.essenceId = that.list.id;
            params.purchaseOrderId = that.paymentAndCollection.purchaseOrderId;
            let fileName = '付款申请单-' + that.$tools.parseDate(that.list.createdDate) + '-' + item.id + '.xls';
            that.$tools.exporttoExcel(that, that.$api.payment.exportPaymentApplication, params, fileName);
        }
    },
    provide () {
        return {
            showImg: this.showImg
        };
    },
    components: {payCont, dialogImg}
};
</script>

<style lang="scss" scoped>
  .my-payment-detail {
    margin-top: 20px;
    padding: 0 16px;
    overflow: hidden;
      padding: 0 16px 0 16px;
  }
</style>
<style lang="scss">
  .paydetail-wrapper {
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 20px;
    }
  }
  .payment-elTable {
     .cell {
        line-height: 1.08;
     }
    .gy-span {
        line-height: 23px;
    }
    .gy-table tr.selected, .gy-table tr:hover {
      background-color: #fff;
    }
    .el-table__body tr.hover-row>td {
      background-color: #f9f9f9;
    }
  }
</style>
