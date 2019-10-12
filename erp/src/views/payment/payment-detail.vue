<!-- 收付款详情 -->
<template>
  <div class="paydetail-wrapper my-payment-detail">
    <div class="essential-information">
      <p class="paydetail-title">基本信息</p>
      <pay-cont :list="list"></pay-cont>
    </div>
    <div class="receivables-information" v-if="buys1">
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
            <div v-if="isFormulaPrice" class="essential-text red">公式计价</div>
            <div v-else class="essential-text">{{buys1.contractAmount | numToCash}}</div>
          </div>
          <div class="essential-item">
            <div class="essential-title">待收金额(元)</div>
            <div v-if="isFormulaPrice" class="essential-text">--</div>
            <div v-else class="essential-text">{{buys1.needCollectionTotal | numToCash}}</div>
          </div>
        </div>
      </div>
      <div class="payment-elTable">
        <p class="paydetail-title">收款记录</p>
        <div class="essential-wrapper approval-list">
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
                class-name="picture-styles-el"
                width="100">
                <template slot-scope="scope">
                <span v-if="scope.row.erpCollectionFileModelList.length !== 0" @click="showImg4Obj(scope.row.erpCollectionFileModelList)"><i
                  class="iconfont icon-photo"></i></span>
                  <span v-else><i class="iconfont icon-photo-null"></i></span>
                </template>
              </el-table-column>
              <el-table-column
                label="下游付款凭证"
                class-name="picture-styles-el"
                width="130">
                <template slot-scope="scope">
                <span v-if="scope.row.erpBuyerPaymentFileModelList.length !== 0" @click="showImg4Obj(scope.row.erpBuyerPaymentFileModelList)"><i
                  class="iconfont icon-photo"></i></span>
                  <span v-else><i class="iconfont icon-photo-null"></i></span>
                </template>
              </el-table-column>
              <el-table-column
                label="收款金额(元)"
                class-name="amount-right-el"
                width="150">
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
                class-name="operation-styles-el"
                width="80">
                <template slot-scope="scope">
                  <button type="button" class="gy-button-view view" @click="showRecord(scope.row, 1)">查看</button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="payment-information" v-if="sales">
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
            <div v-if="isFormula" class="essential-text red">公式计价</div>
            <div v-else class="essential-text">{{sales.contractAmount | numToCash}}</div>
          </div>
          <div class="essential-item">
            <div class="essential-title">待付金额(元)</div>
            <div v-if="isFormula">--</div>
            <div v-else class="essential-text">{{sales.needPaymentTotal | numToCash}}</div>
          </div>
        </div>
      </div>
      <div class="payment-elTable fk-list">
        <p class="paydetail-title">付款记录</p>
        <div class="essential-wrapper approval-list">
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
                class-name="picture-styles-el"
                width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.payDesc === 3 && scope.row.approveType === 1" >-</span>
                  <template v-else>
                    <span v-if="scope.row.paymentVoucher && scope.row.paymentVoucher.length !== 0"
                       @click="showImg(scope.row.paymentVoucher.split(','))"><i class="iconfont icon-photo"></i></span>
                    <span v-else><i class="iconfont icon-photo-null"></i></span>
                  </template>
                </template>
              </el-table-column>
              <el-table-column
                label="付款金额(元)"
                class-name="amount-right-el"
                width="150">
                <template slot-scope="scope">
                  <span>{{scope.row.payTotalStr | numToCash}}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="list.upstreamInfo.skuPriceType === 21 || list.upstreamInfo.skuPriceType === 22"
                label="付款数量"
                class-name="amount-right-el"
                width="100">
                <template slot-scope="scope">
                    <span>{{scope.row.applyQuantities}}</span>
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
                  <span v-if="scope.row.payDesc === 3 && scope.row.approveType === 1" >-</span>
                  <template v-else>
                    <span>{{scope.row.payTime | date}}</span>
                  </template>
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
                  <el-table :data="scope.row.payInfoList" class="payinfo-list">
                      <el-table-column label="序号" width="60" type="index"></el-table-column>
                      <el-table-column label="申请金额(元)" class-name="amount-right-el" width="120">
                        <template slot-scope="scope">
                          <span>{{scope.row.payAmount | numToCash}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="付款凭证" class-name="amount-right-el" width="120">
                        <template slot-scope="scope">
                            <span v-if="scope.row.fileUrl && scope.row.fileUrl.length !== 0"
                                  @click="showImg(scope.row.fileUrl.split(','))"><i class="iconfont icon-photo"></i></span>
                            <span v-else><i class="iconfont icon-photo-null"></i></span>
                        </template>
                      </el-table-column>
                      <el-table-column label="出账日期" class-name="amount-right-el" width="120">
                        <template slot-scope="scope">
                          <span>{{scope.row.payTime | date}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column property="description" label="备注" width="150"></el-table-column>
                    </el-table>
                  <el-button type="text" slot="reference" v-if="scope.row.payInfoList && scope.row.payInfoList.length > 0">查看明细</el-button>
                </el-popover>
              </span>
                </template>
              </el-table-column>
              <el-table-column
                label="备注"
                width="250">
                <template slot-scope="scope">
                  <div class="text-overflow">{{scope.row.remarks}}</div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                fixed="right"
                class-name="operation-styles-el"
                width="105">
                <template slot-scope="scope">
                  <button type="button" class="gy-button-view view" @click="showRecord(scope.row, 2)">查看</button>
                  <button type="button" class="gy-button-view view" @click="exportExcel(scope.row)">下载</button>
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
    <gy-file-view ref="contFileView"></gy-file-view>
  </div>
</template>

<script>
import payCont from './pay-cont';
import gyFileView from '../components/gyFileView';

export default {
    data () {
        return {
            isFormula: false,
            isFormulaPrice: false,
            buys: [],
            sales: null,
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
                downstreamInfo: {
                    fileAttachCertifiedList: []
                },
                upstreamInfo: {
                    fileAttachCertifiedList: []
                }
            },
            contractAmount: null,
            buys1: null
        };
    },
    created () {
        this.paymentAndCollection = this.$route.query;
        let activeType = Number(this.$route.query.activeType);
        if (activeType === 2) {
            // 只查看付款
            this.getdetail();
        } else if (activeType === 3) {
            // 只查看收款
            this.getdetailCollection();
        } else {
            this.getdetail();
            this.getdetailCollection();
        }
        this.getdetailOrder();
    },
    methods: {
        getdetail () { // 付款详情
            let that = this;
            let query = {
                purchaseOrderId: that.paymentAndCollection.purchaseOrderId, // 采购订单ID
                paymentId: null // 付款单ID
            };
            if (query.purchaseOrderId == null || query.purchaseOrderId === undefined || query.purchaseOrderId === '' || query.purchaseOrderId === 'null') {
                console.log('收付款详情 采购订单ID为空 合同要素id=' + that.paymentAndCollection.id);
                return false;
            }
            this.$http.post(this.$api.payment.getDetail, query).then(function (response) {
                if (response.data.code === 0) {
                    // 去结果画面
                    that.sales = response.data.data;
                } else {
                    that.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        getdetailCollection () { // 收款详情
            let that = this;
            let sellerOrderId = that.paymentAndCollection.sellerOrderId;
            if (sellerOrderId == null || sellerOrderId === undefined || sellerOrderId === '' || sellerOrderId === 'null') {
                console.log('收付款详情 销售订单ID为空 合同要素id=' + that.paymentAndCollection.id);
                return false;
            }
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
            this.$http.get(this.$api.order.orderDetail + '/' + that.paymentAndCollection.id).then(function (response) {
                if (response.data.code === 0) {
                    that.list = response.data.data;
                    if (Number(that.list.upstreamInfo.skuPriceType) === 21 || Number(that.list.upstreamInfo.skuPriceType) === 22) {
                        // 采购合同-付款
                        that.isFormula = true;
                    }
                    if (Number(that.list.downstreamInfo.skuPriceType) === 21 || Number(that.list.downstreamInfo.skuPriceType) === 22) {
                        // 销售合同-收款
                        that.isFormulaPrice = true;
                    }
                } else {
                    that.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        showImg (list) {
            this.$refs.contFileView.open4MultiFile(list);
        },
        showImg4Obj (list) {
            this.$refs.contFileView.open(list);
        },
        showRecord (item, type) {
            let that = this;
            if (type === 2) {
                this.$router.push(
                    {
                        name: 'paymentBuy',
                        query: {
                            payId: item.id,
                            doneFlg: 1,
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
    components: {payCont, gyFileView}
};
</script>

<style lang="scss" scoped>
  .red {
      color: red !important;
  }
  .my-payment-detail {
    margin-top: 20px;
    overflow: hidden;
  }

  .essential-row {
    .essential-item {
      .essential-title {
        flex: 0 0 100px;
      }
    }
  }

  /deep/ .gy-table td {
    padding: 0 10px !important;
    height: 52px;
    .cell {
      line-height: normal;
    }
  }
    .gy-button-view {
        background: #fff;
    }
    .fk-list {
        .icon-photo-null:before, .icon-photo:before {
            font-size: 20px;
        }
    }
    .payinfo-list {
        .icon-photo-null:before, .icon-photo:before {
            font-size: 20px;
        }
    }
</style>
<style lang="scss">
  .paydetail-wrapper {
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 20px;
    }
      .paydetail-title {
          font-size: 14px;
      }
  }

  .payment-elTable {
    .cell {
      line-height: 1.08;
    }
    .gy-table tr.selected, .gy-table tr:hover {
      background-color: #fff;
    }
    .el-table__body tr.hover-row > td {
      background-color: #f9f9f9;
    }
  }
</style>
