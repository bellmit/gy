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
                    <div class="essential-text">{{buys.contractAmount | numToCash}}</div>
                </div>
                <div class="essential-item">
                    <div class="essential-title">待收金额(元)</div>
                    <div class="essential-text">{{buys.needCollectionAmount | numToCash}}</div>
                </div>
                <div class="essential-item">
                    <div class="essential-title">下游公司</div>
                    <div class="essential-text">{{buys.buyerCompanyName}}</div>
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
                    <div class="essential-title">下游付款凭证</div>
                    <div class="essential-text">
                        <span v-if="buys.erpBuyerPaymentFileModelList && buys.erpBuyerPaymentFileModelList.length !== 0"
                              @click="showImg('', 1)"><i class="iconfont icon-photo"></i></span>
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
                    <div class="essential-item" style="min-height: 52px;">
                      <div class="essential-title">创建时间</div>
                      <div class="essential-text">{{buys.createdDate  | date(1)}}</div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title">收款凭证</div>
                        <div class="essential-text">
              <span v-if="buys.erpCollectionFileModelList && buys.erpCollectionFileModelList.length !== 0"
                    @click="showImg('', 9)"><i
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
                                <el-date-picker
                                        v-model="collectionDate"
                                        type="date"
                                        value-format="timestamp"
                                        placeholder="日期"
                                >
                                </el-date-picker>
                            </div>
                        </div>
                    </div>
                    <div class="essential-item" style="min-height: 52px;">
                      <div class="essential-title">创建时间</div>
                      <div class="essential-text">{{buys.createdDate  | date(1)}}</div>
                    </div>
                    <div class="essential-item">
                        <div class="essential-title"><em>*</em>收款凭证</div>
                        <el-upload
                                action="api"
                                list-type="picture-card"
                                :http-request="receiptVoucher">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                </template>
            </div>
        </div>
        <div class="receivables-information">
            <p class="paydetail-title">当日收款记录</p>
            <div class="gy-table my-table">
                <el-table
                    :data="dayRecordList"
                    style="width: 100%">
                    <el-table-column
                      label="序号"
                      type="index"
                      width="80">
                    </el-table-column>
                    <el-table-column
                        label="客户名称"
                        width="150">
                        <template slot-scope="scope">
                            <span>{{scope.row.buyerCompanyName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="收款金额(元)"
                        width="150">
                        <template slot-scope="scope">
                            <span>{{scope.row.collectionAmount | numToCash}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="日期">
                        <template slot-scope="scope">
                            <span>{{scope.row.collectionDate |  date}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="合同要素ID"
                        width="150">
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
        <div class="foot">
            <button class="gy-button-normal" @click="$router.go(-1)">返回</button>
            <button v-if="buys.collectionStatus === 10 && isPass" class="gy-button-extra" @click="approveSub">财务确认
            </button>
        </div>
        <div class="essential-information">
            <p class="paydetail-title">操作流程</p>
            <div class="essential-wrapper">
                <table class="gy-table box">
                    <thead>
                    <tr>
                        <th style="width: 80px">序号</th>
                        <th style="width: 120px">操作人</th>
                        <th style="width: 280px">操作时间</th>
                        <th style="width: 200px">操作结果</th>
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
        <dialog-img v-if="dialogVisible" @closedialogvisible="closedialogvisible" :dialogVisible="dialogVisible"
                    :dialogImg="erpCollectionFileModelList"></dialog-img>
    </div>
</template>

<script>
import payCont from './pay-cont';
import dialogImg from './../components/dialogImg';
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
            collectionDate: new Date(),
            collectionChecked: false,
            erpCollectionFileModelList: [],
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
            dialogVisible: false,
            isPass: false,
            history: [],
            fileList: [],
            dayRecordList: []
        };
    },
    created () {
        this.getdetail();
        this.getdetailOrder();
        this.approveJurisdiction();
        this.approve1History();
        this.getDayRecord();
    },
    methods: {
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
        // 当日收款记录
        getDayRecord () {
            this.$http.post(this.$api.payment.daliyCollections, {}).then(res => {
                if (res.data.code === 0) {
                    this.dayRecordList = res.data.data;
                }
            });
        },
        // 判断是否有收款确认的权限
        approveJurisdiction () {
            let that = this;
            let params = {
                targetId: that.$route.query.collId,
                targetType: 107
            };
            this.$http.post(this.$api.apprProc.hasBizPermission, params).then(function (response) {
                that.isPass = response.data.code === 0;
            }).catch((e) => {
                console.log(e);
            });
        },
        // 上传发票
        receiptVoucher (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            that.$http.post(that.$api.upload.imgUpload, formData, headers)
                .then(function (res) {
                    that.fileList.push({
                        fileUrl: res.data.data
                    });
                });
        },
        getdetailOrder () { // 合同要素详情
            let that = this;
            this.$http.get(this.$api.payment.getDetailOrder + this.$route.query.contEssId).then(function (response) {
                if (response.data.code === 0) {
                    that.list = response.data.data;
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
                }
                that.$router.go(-1);
            }).catch((e) => {
                console.log(e);
            });
        },
        showImg (idx, type) {
            this.dialogVisible = true;
            let arr = [];
            switch (type) {
            case 1:
                this.erpCollectionFileModelList = this.buys.erpBuyerPaymentFileModelList;
                break;
            case 2:
                this.sales[idx].paymentVoucher.split(',').forEach((e) => {
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
                this.erpCollectionFileModelList = this.buys.erpCollectionFileModelList;
                break;
            default:
                this.erpCollectionFileModelList = [];
                break;
            }
        },
        closedialogvisible () {
            this.dialogVisible = false;
        },
        // 收款审批记录
        approve1History () {
            let that = this;
            let params = {
                targetId: this.$route.query.collId, // 付款单ID
                targetType: 5
            };
            this.$http.post(this.$api.contract.approve1History, params).then((res) => {
                if (res.data.code === 0) {
                    that.history = res.data.data;
                }
            }).catch((e) => {
                console.log(e);
            });
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
  .my-payment {
     margin-top: 20px;
     padding: 0 16px;
  }
  .essential-row-float .essential-item .essential-title {
    flex: 0 0 130px;
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
  }
</style>
