<!--收款财务确认-->
<template>
  <div class="paydetail-wrapper my-payment">
    <div class="essential-information">
      <p class="paydetail-title">基本信息</p>
      <pay-cont :list="list"></pay-cont>
    </div>
    <div class="receivables-information">
      <p class="paydetail-title">收款信息</p>
      <div class="essential-wrapper pay-detail essential-row-float">
        <div class="essential-item">
          <div class="essential-title">合同金额(元)</div>
            <template v-if="buys.payMethod == 3 && buys.payBillType == 2">
                <div class="essential-text" v-if="Number(list.upstreamInfo.skuPriceType) === 21 || Number(list.upstreamInfo.skuPriceType) === 22"><span style="color: red;">公式计价</span></div>
                <div class="essential-text" v-else>{{list.upstreamInfo.totalAmount | numToCash}}</div>
            </template>
            <template v-else>
                <div class="essential-text" v-if="isFormulaPrice"><span style="color: red;">公式计价</span></div>
                <div class="essential-text" v-else>{{list.downstreamInfo.totalAmount | numToCash}}</div>
            </template>
        </div>
        <div class="essential-item">
          <div class="essential-title">待收金额(元)</div>
          <div class="essential-text" v-if="isFormulaPrice || (buys.payMethod == 3 && buys.payBillType == 2)">--</div>
          <div class="essential-text" v-else>{{buys.needCollectionAmount | numToCash}}</div>
        </div>
        <div class="essential-item">
          <div class="essential-title">付款公司</div>
          <div class="essential-text" v-if="buys.payMethod == 3 && buys.payBillType == 2">{{list.sellerCompanyName}}</div>
          <div class="essential-text" v-else>{{list.buyerCompanyName}}</div>
        </div>
        <div class="essential-item" v-if="isFormulaPrice && buys.collectionType !==2">
          <div class="essential-title">合同数量(吨)</div>
          <div class="essential-text">{{list.downstreamInfo.skuQuantity | numToQuantity}}</div>
        </div>
        <div class="essential-item" v-if="isFormulaPrice && buys.collectionType !==2">
          <div class="essential-title">暂定价(元/吨)</div>
          <div class="essential-text">{{buys.tempPrice | numToCash(true)}}</div>
        </div>
        <div class="essential-item" v-if="isFormulaPrice && buys.collectionType !==2">
          <div class="essential-title">收款数量(吨)</div>
          <div class="essential-text">{{buys.applyQuantities | numToQuantity}}</div>
        </div>
        <div class="essential-item">
          <div class="essential-title">本次收款金额(元)</div>
          <div class="essential-text">{{buys.collectionAmount | numToCash}}</div>
        </div>
        <div class="essential-item">
          <div class="essential-title">付款类型</div>
          <div class="essential-text">{{$constant.collectionType[buys.collectionType]}}</div>
        </div>
        <div class="essential-item">
          <div class="essential-title">收款单状态</div>
          <div class="essential-text">{{buys.collectionStatus === 10 ? '待确认' : '已完成'}}</div>
        </div>
        <div class="essential-item">
          <div class="essential-title">付款凭证</div>
          <div class="essential-text">
                        <span v-if="buys.erpBuyerPaymentFileModelList && buys.erpBuyerPaymentFileModelList.length !== 0"
                              @click="showImg4Obj(buys.erpBuyerPaymentFileModelList)"><i class="iconfont icon-photo"></i></span>
            <span v-else>未上传</span>
          </div>
        </div>
        <div class="essential-item" style="min-height: 55px;">
          <div class="essential-title">收款单编号</div>
          <div class="essential-text">{{buys.payNumber}}</div>
        </div>
        <template class="essential-row" v-if="buys.collectionStatus === 20">
          <div class="essential-item">
            <div class="essential-title">到账日期</div>
            <div class="essential-text">{{buys.collectionDate | date}}</div>
          </div>
          <div class="essential-item" style="min-height: 52px;" :class="{'cl': isFormulaPrice}">
            <div class="essential-title">创建时间</div>
            <div class="essential-text">{{buys.createdDate | date(1)}}</div>
          </div>
          <div class="essential-item">
            <div class="essential-title">收款凭证</div>
            <div class="essential-text">
              <span v-if="buys.erpCollectionFileModelList && buys.erpCollectionFileModelList.length !== 0"
                    @click="showImg4Obj(buys.erpCollectionFileModelList)"><i
                class="iconfont icon-photo"></i></span>
              <span v-else>未上传</span>
            </div>
          </div>
        </template>
        <template class="essential-row" v-if="buys.collectionStatus === 10 && isPass">
          <div class="essential-item">
            <span class="essential-title"><em>*</em>到账日期</span>
            <div class="essential-text searchDate">
              <div class="d">
                <el-date-picker class="input-date"
                  v-model="collectionDate"
                  type="date"
                  value-format="timestamp"
                  placeholder="日期">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="essential-item" style="min-height: 52px;" :class="{'cl': isFormulaPrice}">
            <div class="essential-title">创建时间</div>
            <div class="essential-text">{{buys.createdDate | date(1)}}</div>
          </div>
          <div class="essential-item">
            <div class="essential-title"><em>*</em>收款凭证</div>
              <gy-file-upload ref="sFileUpload" @callbackFileUpload="onCallbackSaleFileUpload"></gy-file-upload>
          </div>
        </template>
      </div>
    </div>
    <div class="receivables-information">
      <p class="paydetail-title">当日收款记录</p>
      <div class="approval-list">
        <div class="gy-table">
          <el-table
            :data="dayRecordList"
            style="width: 100%">
            <!--<el-table-column-->
              <!--label="序号"-->
              <!--type="index"-->
              <!--width="80">-->
            <!--</el-table-column>-->
            <el-table-column
              label="客户名称">
              <template slot-scope="scope">
                <span>{{scope.row.buyerCompanyName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="收款金额(元)"
              class-name="amount-right-el"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.collectionAmount | numToCash}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="日期"
              width="120">
              <template slot-scope="scope">
                <span>{{scope.row.collectionDate |  date}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="合同要素ID"
              width="120">
              <template slot-scope="scope">
                <span>{{scope.row.essenceId}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="销售合同编号"
              width="200">
              <template slot-scope="scope">
                <span>{{scope.row.saleContractCode}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
        <!-- 翻页 -->
        <el-pagination
            background
            :current-page.sync = "params.pageNo"
            :page-size="params.pageSize"
            :total="total"
            layout="prev, pager, next"
            style="margin-top: 20px;"
            @current-change="handleCurrentChange">
        </el-pagination>
    </div>
    <div class="foot">
      <button class="gy-button-normal" @click="$router.go(-1)">返回</button>
      <button v-if="buys.collectionStatus === 10 && isPass" class="gy-button-extra" @click="approveSub">财务确认</button>
    </div>
    <gy-operation-history ref="operationHis"></gy-operation-history>
    <gy-file-view ref="contFileView"></gy-file-view>
  </div>
</template>

<script>
import payCont from './pay-cont';
import gyFileView from '../components/gyFileView';
import gyFileUpload from '../components/gyFileUpload';
import gyOperationHistory from './../../components/gyOperationHistoryComment';

export default {
    data () {
        return {
            params: {
                pageSize: 10,
                pageNo: 1
            },
            total: null,
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
                    orderSn: null,
                    fileAttachCertifiedList: []
                },
                upstreamInfo: {
                    orderSn: null,
                    fileAttachCertifiedList: []
                }
            },
            collectionDate: new Date(),
            buys: {
                contractAmount: null, // 合同金额
                settlementTotal: null, // 应收金额(结算金额)
                collectionAmount: null, // 本次收款金额
                buyerCompanyName: null, // 下游公司名
                collectionType: null, // 付款类型）（1：货款 2：保证金 3：结算 4：运费 5：追补保证金）
                createdDate: null, // 到账日期
                collectionStatus: null, // 收款单状态 （10：待确认 20：已完成）
                erpCollectionFileModelList: [] // 交割凭证fileUrlString凭证地址
            },
            isPass: false,
            fileList: [],
            dayRecordList: [],
            isFormulaPrice: false
        };
    },
    created () {
        this.getdetail();
        this.getdetailOrder();
        this.approveJurisdiction();
        this.getDayRecord();
    },
    mounted () {
        this.approve1History();
    },
    methods: {
        // 分页
        handleCurrentChange (r) {
            this.params.pageNum = r;
            this.getDayRecord();
        },
        getdetail () { // 收款详情
            let that = this;
            this.$http.get(this.$api.payment.getDetailCollectionById + this.$route.query.collId).then(function (response) {
                if (response.data.code === 0) {
                    // 去结果画面
                    that.buys = response.data.data;
                } else {
                    that.$message({
                        type: 'error',
                        message: response.data.code + ' ' + response.data.message
                    });
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        getdetailOrder () { // 合同要素详情
            let that = this;
            this.$http.get(this.$api.order.orderDetail + '/' + this.$route.query.contEssId).then(function (response) {
                if (response.data.code === 0) {
                    that.list = response.data.data;
                    if (Number(that.list.downstreamInfo.skuPriceType) === 21 || Number(that.list.downstreamInfo.skuPriceType) === 22) {
                        that.isFormulaPrice = true;
                    }
                } else {
                    that.$message({
                        type: 'error',
                        message: response.data.code + ' ' + response.data.message
                    });
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 当日收款记录
        getDayRecord () {
            this.$http.post(this.$api.payment.daliyCollections, this.params).then(res => {
                if (res.data.code === 0) {
                    this.dayRecordList = res.data.data.rows;
                    this.total = res.data.data.total;
                }
            });
        },
        // 判断当前登录人员是否有收款确认的权限
        approveJurisdiction () {
            let that = this;
            if (this.$tools.hasBizAuth('cashier_coll_confirm')) {
                that.isPass = true;
            }
        },
        // 收款凭证-回调
        onCallbackSaleFileUpload (fileListVal) {
            this.fileList = [];
            fileListVal.forEach((e) => {
                this.fileList.push({fileUrl: e.fileUrl});
            });
        },
        approveSub () {
            let that = this;
            if (this.collectionDate === null) {
                this.$message({
                    message: '请选择到账日期',
                    type: 'error'
                });
                return false;
            }
            if (this.fileList.length === 0) {
                this.$message({
                    message: '请上传收款凭证',
                    type: 'error'
                });
                return false;
            }
            let query = {
                id: this.$route.query.collId,
                todoId: this.$route.query.todoId,
                erpCollectionFileModelList: this.fileList,
                collectionDate: this.collectionDate,
                contractId: this.$route.query.contEssId,
                allowedFunctionsId: 34
            };
            this.$http.post(this.$api.payment.sale, query).then(function (response) {
                if (response.data.code === 0) {
                    that.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    that.$router.go(-1);
                } else {
                    that.$message.error(response.data.code + ' ' + response.data.message);
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
        // 收款审批记录
        approve1History () {
            let params = {
                targetId: this.$route.query.collId, // 付款单ID
                targetType: 5
            };
            this.$refs.operationHis.display(this.$api.contract.approve1History, params);
        }
    },
    provide () {
        return {
            showImg: this.showImg
        };
    },
    components: {payCont, gyFileView, gyFileUpload, gyOperationHistory}
};
</script>
<style lang="scss" scoped>
  .my-payment {
    margin-top: 20px;
  }

  .essential-row-float .essential-item .essential-title {
    flex: 0 0 128px;
  }

  /deep/ .essential-row-float .essential-item .essential-title {
    flex: 0 0 128px;
  }

  .my-table {
    margin: 15px 0 0 0;
  }
</style>
<style lang="scss">
  .paydetail-wrapper {
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .essential-item {
      em {
        color: red;
      }
    }

      .input-date {
          .el-input__inner {
              font-size: 14px;
          }
      }
  }
</style>
