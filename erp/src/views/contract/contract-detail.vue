<!-- 合同详情 -->
<template>
  <div class="contract-detail">
    <div class="essential-information">
      <p class="paydetail-title">基本信息</p>
      <cont :list="list"></cont>
    </div>
    <div class="pay-wrapper">
      <!-- 采购 -->
      <div class="essential-information" v-if="list.contractType === 1 || list.contractType === 2">
        <p class="paydetail-title">采购合同信息</p>
        <div class="essential-wrapper">
          <div class="essential-row">
            <div class="essential-item">
              <div class="essential-title">采购合同编号</div>
              <div class="essential-text">{{list.upstreamInfo.contractCode}}</div>
            </div>
          </div>
          <cont-sell :list="list" :isCont="contract"></cont-sell>
            <div class="essential-row">
                <div class="essential-item">
                    <div class="essential-title">纸质合同号</div>
                    <div class="essential-text">
                        <div class="essential-text">{{list.upstreamInfo.planNumber || '--'}}</div>
                    </div>
                </div>
            </div>
          <div class="essential-row">
            <div class="essential-item">
              <div class="essential-title">采购合同</div>
              <div class="essential-text">
                <div class="essential-text">
                    <span
                      v-if="list.upstreamInfo.fileAttachList && list.upstreamInfo.fileAttachList.length !== 0"
                      @click="showContImg(list.upstreamInfo.fileAttachList)"><i class="iconfont icon-photo"></i></span>
                    <span v-if="list.upstreamInfo.fileDocUrl && list.upstreamInfo.fileDocUrl.length !== 0"
                        @click="showImg(list.upstreamInfo.fileDocUrl)"><i class="iconfont icon-photo"></i></span>
                </div>
              </div>
            </div>
          </div>
            <div class="essential-row">
                <div class="essential-item">
                    <div class="essential-title">创建合同备注</div>
                    <div class="essential-text">{{list.buyRemark || '--'}}</div>
                </div>
            </div>
          <!-- 查看采购合同 -->
          <template
            v-if="list.upstreamInfo.fileAttachCertifiedList && list.upstreamInfo.fileAttachCertifiedList.length > 0">
            <div class="essential-row">
              <div class="essential-item">
                <div class="essential-title">盖章合同</div>
                <div class="essential-text">
                  <div class="essential-text">
                    <span @click="showContImg(list.upstreamInfo.fileAttachCertifiedList)"><i class="iconfont icon-photo"></i></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="essential-row">
              <div class="essential-item">
                <div class="essential-title">盖章合同备注</div>
                <div class="essential-text">{{list.upstreamInfo.executeRemarks || '--'}}</div>
              </div>
            </div>
          </template>
          <!-- 上传采购合同 -->
          <template v-if="canUploadContract && ($route.query.homeFromFlg === 1 || $route.query.homeFromFlg === '1') && ($route.query.doneFlg === 0 || $route.query.doneFlg === '0')
              && list.approveStatus === 6 && list.upstreamInfo.fileAttachCertifiedList && list.upstreamInfo.fileAttachCertifiedList.length === 0">
            <div class="essential-row">
              <div class="essential-item" v-if="isSingleBuyContract">
                <div class="essential-title"><span class="isMust">*</span>盖章采购合同
                </div>
                <div class="essential-text">
                    <gy-file-upload ref="pFileUpload" @callbackFileUpload="onCallbackBuyFileUpload"></gy-file-upload>
                </div>
              </div>
            </div>
            <div class="essential-row">
              <div class="essential-item" v-if="isSingleBuyContract">
                <div class="essential-title">盖章合同备注</div>
                <div class="essential-text">
                    <textarea name="" class="gy-textarea" v-model="purchaseExecuteRemarks" cols="30" rows="10"></textarea>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <!-- 销售 -->
      <div class="essential-information" v-if="list.contractType === 1 || list.contractType === 3">
        <p class="paydetail-title">销售合同信息</p>
        <div class="essential-wrapper">
          <div class="essential-row">
            <div class="essential-item">
              <div class="essential-title">销售合同编号</div>
              <div class="essential-text">{{list.downstreamInfo.contractCode}}</div>
            </div>
          </div>
          <cont-buy :list="list" :isCont="contract"></cont-buy>
            <div class="essential-row">
                <div class="essential-item">
                    <div class="essential-title">纸质合同号</div>
                    <div class="essential-text">
                        <div class="essential-text">{{list.downstreamInfo.planNumber || '--'}}</div>
                    </div>
                </div>
            </div>
          <div class="essential-row">
            <div class="essential-item">
              <div class="essential-title">销售合同</div>
              <div class="essential-text">
                <div class="essential-text">
                    <span
                      v-if="list.downstreamInfo.fileAttachList && list.downstreamInfo.fileAttachList.length !== 0"
                      @click="showContImg(list.downstreamInfo.fileAttachList)"><i class="iconfont icon-photo"></i></span>
                    <span v-if="list.downstreamInfo.fileDocUrl && list.downstreamInfo.fileDocUrl.length !== 0"
                        @click="showImg(list.downstreamInfo.fileDocUrl)"><i class="iconfont icon-photo"></i></span>
                </div>
              </div>
            </div>
          </div>
            <div class="essential-row">
                <div class="essential-item">
                    <div class="essential-title">创建合同备注</div>
                    <div class="essential-text">{{list.saleRemark || '--'}}</div>
                </div>
            </div>
          <!-- 查看销售合同 -->
          <template
            v-if="list.downstreamInfo.fileAttachCertifiedList && list.downstreamInfo.fileAttachCertifiedList.length > 0">
            <div class="essential-row">
              <div class="essential-item">
                <div class="essential-title">盖章合同</div>
                <div class="essential-text">
                  <div class="essential-text">
                    <span @click="showContImg(list.downstreamInfo.fileAttachCertifiedList)"><i class="iconfont icon-photo"></i></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="essential-row">
              <div class="essential-item">
                <div class="essential-title">盖章合同备注</div>
                <div class="essential-text">{{list.downstreamInfo.executeRemarks || '--'}}</div>
              </div>
            </div>
          </template>
          <!-- 上传销售合同 -->
          <template v-if="canUploadContract && ($route.query.homeFromFlg === 1 || $route.query.homeFromFlg === '1') && ($route.query.doneFlg === 0 || $route.query.doneFlg === '0')
                && list.approveStatus === 6 && list.downstreamInfo.fileAttachCertifiedList && list.downstreamInfo.fileAttachCertifiedList.length === 0">
            <div class="essential-row">
              <div class="essential-item" v-if="isSingleSaleContract">
                <div class="essential-title"><span class="isMust">*</span>盖章销售合同</div>
                <div class="essential-text">
                    <gy-file-upload ref="sFileUpload" @callbackFileUpload="onCallbackSaleFileUpload"></gy-file-upload>
                </div>
              </div>
            </div>
            <div class="essential-row">
              <div class="essential-item" v-if="isSingleSaleContract">
                <div class="essential-title">盖章合同备注</div>
                <div class="essential-text">
                    <textarea name="" class="gy-textarea" v-model="saleExecuteRemarks" cols="30" rows="10"></textarea>
                </div>
              </div>
            </div>
          </template>
            <div class="essential-row">
                <div class="essential-item">
                    <div class="essential-title">下游统计口径</div>
                    <div class="essential-text">
                        <div class="essential-text" style="padding-left: 10px;">{{list.downstreamInfo.statisticalCaliber}}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
    <!-- 变更记录 -->
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
      <button class="gy-button-normal" @click="goback">返回</button>
      <button v-if="canUploadContract && homeFromFlg === 1 && ($route.query.doneFlg === 0 || $route.query.doneFlg === '0') && list.approveStatus === 6"
              class="gy-button-extra" @click="submit()">提交
      </button>
      <template v-if="hasPass && homeFromFlg === 1">
        <button class="gy-button-normal" @click="reject">驳回</button>
        <button class="gy-button-extra confirmations" @click="approveSub(1)">通过</button>
      </template>
    </div>
    <div class="button-wrap" v-if="showCommentBtn && (homeFromFlg === 1 || homeFromFlg === 2)">
      <button class="gy-button-extra" @click="comment()">评论</button>
    </div>
    <gy-operation-history v-if="showCommentBtn" @checkHistory="checkHistory" ref="operationHis"></gy-operation-history>
    <gy-comment-remark v-if="commentDiog.dialogVisibleRemark === true" :dialog = "commentDiog" :invoice="contractDetailCommpany"></gy-comment-remark>
    <gy-file-view ref="contFileView"></gy-file-view>
  </div>
</template>

<script>
import contSell from './orderSell';
import contBuy from './orderBuy';
import cont from './cont';
import gyFileView from './../components/gyFileView';
import gyFileUpload from './../components/gyFileUpload';
import gyOperationHistory from './../../components/gyOperationHistoryComment';
import gyCommentRemark from './../../components/gyCommentRemark';
import modifyFieldInfo from './../components/modifyFieldInfo';

export default {
    data () {
        return {
            commitType: '1', // TODO暂定 标识为修改类型的合同
            buyContImg: [], // 采购文件
            saleContImg: [], // 销售文件
            saleContTmplId: null, // 销售合同模板ID
            list: {
                id: null, // 合同要素ID
                contEssenceStatus: null, // 合同要素状态
                bizType: null, // 业务类型
                purchaseOrderId: null, // 业务类型
                contractType: null, // 单边交易
                createdName: null, // 创建人
                approveStatus: null, // 创建人
                businessManagerId: null, // 业务负责人ID
                businessManagerName: null, // 业务负责人名称
                orgName: null, // 业务组名称
                orderStatus: null, // 订单状态
                createdDate: null, // 创建时间（格式：yyyy-MM-dd HH:mm:ss）
                planBuyDlvyDate: null, // 计划交割日(买家)
                planSaleDlvyDate: null, // 计划交割日(卖家)
                targetCorpId: null, // 居间方公司Id(我方公司)
                targetCorpName: null, // 居间方公司名称(我方公司)
                downstreamInfo: { // 下游销售信息
                    buyerCompanyId: null, // 下游公司id
                    buyerCompanyName: null, // 下游公司名称
                    skuOrigin: null, // 货源（国产、进口、自定义）
                    deliveryWarehouseId: null, // 交割仓库id
                    deliveryWarehouseName: null, // 交割仓库名称
                    provideInvoiceType: null, // 发票月份
                    provideInvoiceDays: null, // 发票天数
                    paymentType: null, // 付款方式（0：先款后货，1：先货后款）
                    skuPrice: null, // 数量
                    grade: null, // 交易对手评级
                    packagingStandard: null, // 包装标准
                    skuQuantity: null, // 单价
                    odrContactId: null, // 内部业务联系人ID
                    odrContactName: null, // 内部业务联系人名称
                    depositRatio: null, // 保证金比率（%）
                    depositRatioSubtract: null, // 保证金比率（跌）
                    depositRatioAppend: null, // 保证金比率（补）
                    warehouseFreeDays: null, // 免仓期（天）
                    deliveryType: null, // 交割方式
                    payChannel: null, // 支付渠道
                    remarks: null, // 备注
                    fileDocUrl: null, // 电子合同
                    fileAttachList: null // 合同模板
                },
                upstreamInfo: {// 上游采购信息
                    buyerCompanyId: null, // 下游公司id
                    buyerCompanyName: null, // 下游公司名称
                    skuOrigin: null, // 货源（国产、进口、自定义）
                    deliveryWarehouseId: null, // 交割仓库id
                    deliveryWarehouseName: null, // 交割仓库名称
                    provideInvoiceType: null, // 发票月份
                    provideInvoiceDays: null, // 发票天数
                    paymentType: null, // 付款方式（0：先款后货，1：先货后款）
                    skuPrice: null, // 数量
                    grade: null, // 交易对手评级
                    packagingStandard: null, // 包装标准
                    skuQuantity: null, // 单价
                    odrContactId: null, // 内部业务联系人ID
                    odrContactName: null, // 内部业务联系人名称
                    depositRatio: null, // 保证金比率（%）
                    depositRatioSubtract: null, // 保证金比率（跌）
                    depositRatioAppend: null, // 保证金比率（补）
                    warehouseFreeDays: null, // 免仓期（天）
                    deliveryType: null, // 交割方式
                    payChannel: null, // 支付渠道
                    remarks: null, // 备注
                    fileDocUrl: null, // 电子合同
                    fileAttachList: null // 合同模板
                }
            },
            hasPass: false,
            canUploadContract: false,
            remarks: null,
            contract: 'contract',
            purchaseExecuteRemarks: null, // 采购盖章备注
            saleExecuteRemarks: null, // 销售盖章备注
            isSingleBuyContract: false,
            isSingleSaleContract: false,
            commentDiog: {
                dialogVisibleRemark: false
            },
            contractDetailCommpany: {
                targetType: 2,
                subSysType: 0,
                targetId: null,
                refFunc: {}
            },
            showCommentBtn: true,
            homeFromFlg: null,
            modifyFieldInfo: {},
            isModify: false // 是否有变更记录
        };
    },
    mounted () {
        this.getdetailOrder();
        this.approve1History();
        this.contractDetailCommpany.targetId = Number(this.$route.query.id);
        this.homeFromFlg = Number(this.$route.query.homeFromFlg);
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
        },
        purchaseExecuteRemarks (val) {
            if (val.length > 2500) {
                this.$message({
                    message: '盖章合同备注最多可填写2500字',
                    type: 'warning'
                });
                this.purchaseExecuteRemarks = this.purchaseExecuteRemarks.substr(0, 2500);
            }
        },
        saleExecuteRemarks (val) {
            if (val.length > 2500) {
                this.$message({
                    message: '盖章合同备注最多可填写2500字',
                    type: 'warning'
                });
                this.saleExecuteRemarks = this.saleExecuteRemarks.substr(0, 2500);
            }
        }
    },
    methods: {
        checkHistory () {
            // 没有操作流程数据时不显示'评论'按钮
            this.showCommentBtn = false;
        },
        getdetailOrder () { // 合同要素详情
            this.$http.get(this.$api.order.orderDetail + '/' + this.$route.query.id).then(response => {
                if (response.data.code === 0) {
                    // 去结果画面
                    this.list = response.data.data;

                    // 有变更记录
                    if (this.list.modifyFieldInfo && this.list.sourceContEssId) {
                        this.isModify = true;
                        this.modifyFieldInfo = JSON.parse(this.list.modifyFieldInfo);
                    }
                    if (this.list.upstreamInfo && (this.list.upstreamInfo.fileAttachCertifiedList === null || this.list.upstreamInfo.fileAttachCertifiedList.length === 0)) {
                        this.isSingleBuyContract = true;
                    }
                    if (this.list.downstreamInfo && (this.list.downstreamInfo.fileAttachCertifiedList === null || this.list.downstreamInfo.fileAttachCertifiedList.length === 0)) {
                        this.isSingleSaleContract = true;
                    }

                    // 如果该合同要素已被单边关联
                    if (this.list.correlatedEssenceId) {
                        this.showCommentBtn = false;
                    }
                    // 确认当前用户是否可以上传盖章合同
                    if ((this.$route.query.homeFromFlg === 1 || this.$route.query.homeFromFlg === '1') && (this.$route.query.doneFlg === 0 || this.$route.query.doneFlg === '0') && this.list.approveStatus === 6 && this.$tools.hasBizAuth('to_create_contract')) {
                        this.canUploadContract = true;
                    }
                    this.approveJurisdiction();
                } else {
                    this.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 合同审批记录
        approve1History () {
            let params = {
                targetId: Number(this.$route.query.id), // 合同要素ID
                targetType: 2
            };
            this.$refs.operationHis.display(this.$api.contract.approve1History, params);
        },
        // 合同审批权限
        approveJurisdiction () {
            let that = this;
            let params = {
                targetId: Number(that.$route.query.id),
                targetType: 2
            };
            this.$http.post(this.$api.apprProc.hasApproveAuth, params).then(function (response) {
                if (response.data.code === 0 && that.list.approveStatus === 5) {
                    // 必须是合同审核中
                    that.hasPass = true;
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 合同审批
        approveSub (type) {
            let that = this;
            let params = {
                todoId: that.$route.query.todoId,
                id: Number(that.$route.query.id), // 合同要素ID
                operaType: type, // 审批结果（1：同意 2：驳回）
                remarks: this.remarks // 审批备注
            };
            // 是变更记录审批 新增两个变更标识字段
            if (this.isModify) {
                params['sourceContEssId'] = this.list.sourceContEssId;
                params['commitType'] = '1';
            }
            if (that.list.sourceContEssId != null) {
                params.commitType = 1;
                params.sourceContEssId = that.list.sourceContEssId;
            }
            this.$http.post(this.$api.contract.approve1, params).then(function (response) {
                if (response.data.code === 0) {
                    that.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    // that.hasPass = false;
                    // that.getdetailOrder();
                    // that.approve1History();
                    that.$router.push({name: 'home'});
                } else {
                    that.$message.error(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        goback () {
            this.$router.go(-1);
        },
        // 图片上传的回调-采购合同
        onCallbackBuyFileUpload (fileList) {
            this.buyContImg = [];
            fileList.forEach((e) => {
                this.buyContImg.push(e.fileUrl);
            });
        },
        // 图片上传的回调-销售合同
        onCallbackSaleFileUpload (fileList) {
            this.saleContImg = [];
            fileList.forEach((e) => {
                this.saleContImg.push(e.fileUrl);
            });
        },
        submit () {
            let that = this;
            let query = {
                todoId: that.$route.query.todoId,
                id: Number(this.$route.query.id), // 合同要素ID
                purchaseCertifiedFileAttachList: this.buyContImg, // 采购合同文件
                purchaseExecuteRemarks: this.purchaseExecuteRemarks, // 采购合同备注
                saleCertifiedFileAttachList: this.saleContImg, // 销售文件附件
                saleExecuteRemarks: this.saleExecuteRemarks // 销售文件备注
            };
            if (that.list.sourceContEssId != null) {
                query.commitType = 1;
                query.sourceContEssId = that.list.sourceContEssId;
            }
            if (this.isSingleBuyContract) {
                if ((this.list.contractType === 1 || this.list.contractType === 2) && this.list.approveStatus === 6 && this.buyContImg.length === 0) {
                    this.$message({
                        message: '请上传盖章采购合同',
                        type: 'warning'
                    });
                    return false;
                }
            }
            if (this.isSingleSaleContract) {
                if ((this.list.contractType === 1 || this.list.contractType === 3) && this.list.approveStatus === 6 && this.saleContImg.length === 0) {
                    this.$message({
                        message: '请上传盖章销售合同',
                        type: 'warning'
                    });
                    return false;
                }
            }
            this.$http.post(this.$api.contract.attach, query).then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        message: '创建成功',
                        type: 'success'
                    });
                    that.goback();
                } else {
                    this.$message.error(res.data.code + ' ' + res.data.message);
                }
            });
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
        showImg (imgList) {
            this.$refs.contFileView.open4MultiFile(imgList);
        },
        showContImg (imgList) {
            let arr = [];
            imgList.forEach((e) => {
                arr.push({fileUrl: e.filepath});
            });
            this.$refs.contFileView.open(arr);
        },
        // 评论
        comment () {
            this.commentDiog.dialogVisibleRemark = true;
            this.contractDetailCommpany.targetId = Number(this.$route.query.id);
            this.contractDetailCommpany.refFunc = this.$refs.operationHis.display;
            this.contractDetailCommpany.refParam = {
                targetId: this.$route.query.id,
                targetType: 2
            };
        }
    },
    components: {
        contSell,
        contBuy,
        cont,
        gyFileView,
        gyFileUpload,
        gyOperationHistory,
        gyCommentRemark,
        modifyFieldInfo
    }
};
</script>

<style lang="scss" scoped>
  .contract-detail {
    margin-top: 20px;
    .change-list {
        padding: 18px 36px 30px 30px;
    }
    .essential-wrapper {
      overflow: auto;
      .gy-table {
        min-width: 700px;
      }
    }
    .plus {
      margin-left: 0px;
    }
  }

  .search1 {
    position: absolute;
    right: 0;
    bottom: 10px;
    line-height: 1;
  }

  .isMust {
    left: -10px;
  }
</style>
<style lang="scss">
  .contract-detail {
    .el-input-number__decrease {
      border-right: 0;
      background: #fff;
    }
    .el-input-number__increase {
      border-left: 0;
      background: #fff;
    }

    .el-dialog__body {
      padding-top: 0;
      height: 100%;
    }
      .paydetail-title {
          font-size: 14px;
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
  }
</style>
