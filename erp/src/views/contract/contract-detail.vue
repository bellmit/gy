<!-- 合同详情 -->
<template>
  <div class="add-contract">
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
              <div class="essential-text">{{list.sellerInfo.contractCode}}</div>
            </div>
          </div>
          <cont-sell :list="list" :isCont="contract"></cont-sell>
          <div class="essential-row">
            <div class="essential-item">
              <div class="essential-title">采购合同</div>
              <div class="essential-text">
                <div class="essential-text">
                  <span v-if="list.sellerInfo.fileAttachList && list.sellerInfo.fileAttachList.length !== 0" @click="showImg(4)"><i class="iconfont icon-photo"></i></span>
                  <span v-if="list.sellerInfo.fileDocUrl && list.sellerInfo.fileDocUrl.length !== 0" @click="showImg(5)"><i class="iconfont icon-photo"></i></span>
                </div>
              </div>
            </div>
          </div>
          <!-- 查看采购合同 -->
          <template v-if="list.sellerInfo.fileAttachCertifiedList && list.sellerInfo.fileAttachCertifiedList.length > 0">
            <div class="essential-row">
              <div class="essential-item">
                <div class="essential-title">盖章合同</div>
                <div class="essential-text">
                  <div class="essential-text">
                    <span @click="showImg(6)"><i class="iconfont icon-photo"></i></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="essential-row">
              <div class="essential-item">
                <div class="essential-title">盖章合同备注</div>
                <div class="essential-text">{{list.sellerInfo.executeRemarks}}</div>
              </div>
            </div>
          </template>
          <!-- 上传采购合同 -->
          <template v-if="$route.query.homeFromFlg === 1 && $route.query.doneFlg === 0 && list.approveStatus === 6 && list.sellerInfo.fileAttachCertifiedList && list.sellerInfo.fileAttachCertifiedList.length === 0">
            <div class="essential-row">
              <div class="essential-item" v-if="isSingleBuyContract">
                <div class="essential-title" style="padding-left: 10px"><span class="isMust">*</span>上传盖章采购合同</div>
                <div class="essential-text">
                  <template v-for="(item, index) in  buyContImg">
                    <div class="contImgItem" :key="item">
                      <img v-if="$constant.imgType.indexOf(item.split('.').pop()) !== -1" :src="item" width="52" height="52" alt="">
                      <img v-if="item.split('.').pop() === 'pdf'" src="../../assets/images/PDF.png" height="52" width="52"/>
                      <img v-if="$constant.fileType.indexOf(item.split('.').pop()) !== -1" src="../../assets/images/WORD.png" height="52" width="52"/>
                      <div>
                        <i @click="deleteImg(index, 'buy')" class="el-icon-delete"></i>
                      </div>
                    </div>
                  </template>
                  <el-upload class="avatar-uploader"
                             action=""
                             :http-request="uploadBuy"
                             :show-file-list="false"
                             :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
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
              <div class="essential-text">{{list.buyerInfo.contractCode}}</div>
            </div>
          </div>
          <cont-buy :list="list" :isCont="contract"></cont-buy>
          <div class="essential-row">
            <div class="essential-item">
              <div class="essential-title">销售合同</div>
              <div class="essential-text">
                <div class="essential-text">
                  <span v-if="list.buyerInfo.fileAttachList && list.buyerInfo.fileAttachList.length !== 0" @click="showImg(1)"><i class="iconfont icon-photo"></i></span>
                  <span v-if="list.buyerInfo.fileDocUrl && list.buyerInfo.fileDocUrl.length !== 0" @click="showImg(2)"><i class="iconfont icon-photo"></i></span>
                </div>
              </div>
            </div>
          </div>
          <!-- 查看销售合同 -->
          <template v-if="list.buyerInfo.fileAttachCertifiedList && list.buyerInfo.fileAttachCertifiedList.length > 0">
            <div class="essential-row">
              <div class="essential-item">
                <div class="essential-title">盖章合同</div>
                <div class="essential-text">
                  <div class="essential-text">
                    <span @click="showImg(3)"><i class="iconfont icon-photo"></i></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="essential-row">
              <div class="essential-item">
                <div class="essential-title">盖章合同备注</div>
                <div class="essential-text">{{list.buyerInfo.executeRemarks}}</div>
              </div>
            </div>
          </template>
          <!-- 上传销售合同 -->
          <template v-if="$route.query.homeFromFlg === 1 && $route.query.doneFlg === 0 && list.approveStatus === 6 && list.buyerInfo.fileAttachCertifiedList && list.buyerInfo.fileAttachCertifiedList.length === 0">
            <div class="essential-row">
              <div class="essential-item" v-if="isSingleSaleContract">
                <div class="essential-title" style="padding-left: 10px"><span class="isMust">*</span>上传盖章销售合同</div>
                <div class="essential-text">
                  <template v-for="(item, index) in  saleContImg">
                    <div class="contImgItem" :key="item">
                      <img v-if="$constant.imgType.indexOf(item.split('.').pop()) !== -1" :src="item" width="52" height="52" alt="">
                      <img v-if="item.split('.').pop() === 'pdf'" src="../../assets/images/PDF.png" height="52" width="52"/>
                      <img v-if="$constant.fileType.indexOf(item.split('.').pop()) !== -1" src="../../assets/images/WORD.png" height="52" width="52"/>
                      <div>
                        <i @click="deleteImg(index, 'sale')" class="el-icon-delete"></i>
                      </div>
                    </div>
                  </template>
                  <el-upload class="avatar-uploader" action=""
                             :http-request="uploadSell"
                             :show-file-list="false"
                             :before-upload="beforeAvatarUpload">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
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
      <button class="gy-button-normal" @click="goback">返回</button>
      <button v-if="$route.query.homeFromFlg === 1 && $route.query.doneFlg === 0 && list.approveStatus === 6" class="gy-button-extra" @click="submit()">提交</button>
      <template v-if="hasPass && $route.query.homeFromFlg === 1">
        <button class="gy-button-normal" @click="reject">驳回</button>
        <button class="gy-button-extra confirmations" @click="approveSub(1)">通过</button>
      </template>
    </div>
    <div class="essential-information">
      <p class="paydetail-title">操作流程</p>
      <div class="essential-wrapper">
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
            <td>{{index + 1}}</td>
            <td>{{item.username}}</td>
            <td>{{item.createdDate | date(item.createdDate)}}</td>
            <td>{{$constant.approveType[item.resultCode]}}</td>
            <td>{{item.msg}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <dialog-img v-if="dialogVisible" @closedialogvisible="closedialogvisible" :dialogVisible="dialogVisible" :dialogImg="dialogImg"></dialog-img>
  </div>
</template>

<script>
import contSell from './sell';
import contBuy from './buy';
import cont from './cont';
import dialogImg from './../components/dialogImg';
export default {
    data () {
        return {
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
                buyerInfo: { // 下游公司信息
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
                sellerInfo: {// 上游公司信息
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
            imageUrl: false,
            history: [
                {
                    approverId: null, // 审批人ID
                    username: null, // 审批人名称
                    resultCode: null, // 审批结果（0:未审批 1:审批通过 2:审批驳回）
                    msg: null, // 审批意见
                    createdDate: null // 审批日期（时间戳）
                }
            ],
            hasPass: false,
            remarks: null,
            contract: 'contract',
            purchaseExecuteRemarks: null, // 采购盖章备注
            saleExecuteRemarks: null, // 销售盖章备注
            dialogVisible: false,
            dialogImg: [],
            isSingleBuyContract: false,
            isSingleSaleContract: false
        };
    },
    created () {
        this.getdetailOrder();
        this.approve1History();
        this.approveJurisdiction();
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
    methods: {
        getdetailOrder () { // 合同要素详情
            let that = this;
            this.$http.get(this.$api.payment.getDetailOrder + that.$route.query.id).then(function (response) {
                if (response.data.code === 0) {
                    // 去结果画面
                    that.list = response.data.data;
                    if (that.list.sellerInfo.fileAttachCertifiedList === null || that.list.sellerInfo.fileAttachCertifiedList.length === 0) {
                        that.isSingleBuyContract = true;
                    }
                    if (that.list.buyerInfo.fileAttachCertifiedList === null || that.list.buyerInfo.fileAttachCertifiedList.length === 0) {
                        that.isSingleSaleContract = true;
                    }
                } else {
                    that.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        deleteImg (idx, type) {
            type === 'sale' ? this.saleContImg.splice(idx, 1) : this.buyContImg.splice(idx, 1);
        },
        // 合同审批记录
        approve1History () {
            let that = this;
            let params = {
                targetId: that.$route.query.id, // 合同要素ID
                targetType: 2
            };
            this.$http.post(this.$api.contract.approve1History, params).then(function (res) {
                if (res.data.code === 0) {
                    that.history = res.data.data;
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 合同审批权限
        approveJurisdiction () {
            let that = this;
            let params = {
                targetId: that.$route.query.id,
                targetType: 2
            };
            this.$http.post(this.$api.apprProc.hasApproveAuth, params).then(function (response) {
                if (response.data.code === 0) {
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
                id: Number(that.$route.query.id), // 合同要素ID
                processId: Number(that.$route.query.actTaskId),
                operaType: type, // 审批结果（1：同意 2：驳回）
                remarks: this.remarks // 审批备注
            };
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
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        goback () {
            this.$router.go(-1);
        },
        beforeAvatarUpload (file) {
            // if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
            //     this.$message({
            //         showClose: true,
            //         message: `文件扩展名错误`,
            //         type: 'error'
            //     });
            //     return false;
            // }
        },
        uploadBuy (file) {
            this.upload(file, '1');
        },
        uploadSell (file) {
            this.upload(file, '2');
        },
        upload (file, l) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            this.$http.post(this.url || this.$api.upload.imgUpload, formData, headers)
                .then(res => {
                    if (res.data.code === 0) {
                        l === '1' ? that.buyContImg.push(res.data.data) : that.saleContImg.push(res.data.data);
                    }
                });
        },
        submit () {
            let that = this;
            let query = {
                id: Number(this.$route.query.id), // 合同要素ID
                purchaseCertifiedFileAttachList: this.buyContImg, // 采购合同文件
                purchaseExecuteRemarks: this.purchaseExecuteRemarks, // 采购合同备注
                saleCertifiedFileAttachList: this.saleContImg, // 销售文件附件
                saleExecuteRemarks: this.saleExecuteRemarks // 销售文件备注
            };
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
                }
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
        },
        showImg (type) {
            this.dialogVisible = true;
            let arr = [];
            switch (type) {
            case 1:
                this.list.buyerInfo.fileAttachList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.dialogImg = arr;
                break;
            case 2:
                this.list.buyerInfo.fileDocUrl.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.dialogImg = arr;
                break;
            case 3:
                this.list.buyerInfo.fileAttachCertifiedList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.dialogImg = arr;
                break;
            case 4:
                this.list.sellerInfo.fileAttachList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.dialogImg = arr;
                break;
            case 5:
                this.list.sellerInfo.fileDocUrl.forEach((e) => {
                    arr.push({fileUrl: e});
                });
                this.dialogImg = arr;
                break;
            case 6:
                this.list.sellerInfo.fileAttachCertifiedList.forEach((e) => {
                    arr.push({fileUrl: e.filepath});
                });
                this.dialogImg = arr;
                break;
            default:
                this.dialogImg = [];
                this.dialogVisible = false;
                break;
            }
        },
        closedialogvisible () {
            this.dialogVisible = false;
        }
    },
    components: {
        contSell,
        contBuy,
        dialogImg,
        cont
    }
};
</script>

<style lang="scss" scoped>
  .add-contract {
    margin-top: 20px;
    padding: 0 16px;
    .essential-wrapper {
      overflow: auto;
      .gy-table {
        min-width: 700px;
      }
    }
  }
  .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    display: block;
  }
  .search1{
    position: absolute;
    right: 0;
    bottom: 10px;
    line-height: 1;
  }
</style>
<style lang="scss">
  .add-contract {
    .el-input-number__decrease {
      border-right: 0;
      background: #fff;
    }
    .el-input-number__increase {
      border-left: 0;
      background: #fff;
    }
    .el-upload {
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409EFF;
    }
    .el-dialog__body {
      padding-top: 0;
      height: 100%;
    }
  }
</style>
