<template>
    <div class="deliveryDetails">
        <el-dialog width="1200px" class="order-dialog"
                   :before-close="handleClosePurchanseDelivery"
                   :visible.sync="orderData.purchaseDeliverydialog">
            <div class="order-apply">
                <div class="title">新建采购交割</div>
            </div>
            <div class="block clearfix">
              <div class="gy-form-group">
                  <span class="l">上游公司</span>
                  <span>{{orderMessage.sellerCompanyName}}</span>
              </div>
              <div class="gy-form-group">
                  <span class="l">交割库</span>
                  <input type="text" v-model="orderMessage.deliveryWarehouseName" placeholder="请输入交割库">
              </div>
              <div class="gy-form-group">
                  <span class="l">合同交割日</span>
                  <span>{{orderMessage.planDeliveryDate}}</span>
              </div>
              <div class="gy-form-group">
                  <span class="l">交割库地址</span>
                  <input type="text" v-model="orderMessage.deliveryDetailedAddress" placeholder="请输入交割库地址">
              </div>
              <div class="gy-form-group">
                  <span class="l">产品名称</span>
                  <span>{{orderMessage.skuName}}</span>
              </div>
              <div class="gy-form-group">
                  <span class="l">免仓期</span>
                  <span>{{orderMessage.warehouseFreeDays}}</span>
              </div>
              <div class="gy-form-group">
                  <span class="l"><i>*</i>交割日</span>
                  <div class="searchDate">
                      <div class="d">
                          <el-date-picker
                            v-model="createBuyDelive.deliveryDate"
                            type="date"
                            value-format="timestamp"
                            placeholder="交割日"
                          >
                          </el-date-picker>
                      </div>
                  </div>
              </div>
              <div class="gy-form-group">
                  <span class="l">数量(吨)</span>
                  <span>{{orderMessage.skuQuantity}}</span>
              </div>
              <div class="gy-form-group cl">
                  <span class="l"><i>*</i>本次交割数量(吨)</span>
                  <input type="text" v-model="orderMessage.surplusQuantitys">
              </div>
              <div class="gy-form-group">
                  <span class="l">待交割数量(吨)</span>
                  <span>{{orderMessage.surplusQuantity}}</span>
              </div>
              <!-- <div class="gy-form-group">
                  <span class="l">已交割数量(吨)</span>
                  <span>{{orderMessage.alreadyDeliveryQuantity}}</span>
              </div> -->
            </div>
            <!-- 进度条 -->
            <div class="step-title" v-if="!isSubmitBuy">操作流程</div>
            <div v-if="!isSubmitBuy" class="delivery-step">
                <gy-step :step="index+1"
                         :showLine="erpPurchaseHistoryModelList"
                         :doubleLength="erpPurchaseHistoryModelList"
                         :isRight="erpPurchaseHistoryModelList && (index === erpPurchaseHistoryModelList.length - 1)"
                         :isActive="erpPurchaseHistoryModelList && (index === 0)"
                         :isDone="erpPurchaseHistoryModelList && (index === 0)"
                         v-for="(item, index) in erpPurchaseHistoryModelList"
                         :key="index">
                    <div class="order-step-info">
                        <div>{{item.username}}</div>
                        <span>{{ item.actionDesc }}</span>
                    </div>
                </gy-step>
            </div>
            <div style="margin-top: 10px;text-align: right;padding-bottom: 30px;padding-right: 30px;">
                <button v-if="!deliveryPure" class="gy-button-normal" @click="orderData.purchaseDeliverydialog = false">取消</button>
                <button v-if="deliveryPure" class="gy-button-normal" @click="orderData.purchaseDeliverydialog = false">关闭</button>
                <button v-if="sublimePure" class="gy-button-extra" @click="createBuyDelivery()">提交</button>
            </div>
        </el-dialog>
        <el-dialog width="1200px" class="order-dialog"
                   :before-close="handleCloseSaleDelivery"
                   :visible.sync="orderData.newSaledialog">
            <div class="order-apply">
                <div class="title">新建销售交割</div>
            </div>
            <div class="gy-form-group">
                <span class="l">下游公司</span>
                <span>{{orderMessage.buyerCompanyName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">交割库</span>
                <input type="text" :disabled="!isSubmitBuy" v-model="orderMessage.deliveryWarehouseName" placeholder="请输入交割库">
            </div>
            <div class="gy-form-group">
                <span class="l">合同交割日</span>
                <span>{{orderMessage.planDeliveryDate}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">交割库地址</span>
                <input type="text" :disabled="!isSubmitBuy" v-model="orderMessage.deliveryDetailedAddress" placeholder="请输入交割库地址">
            </div>
            <div class="gy-form-group">
                <span class="l">产品名称</span>
                <span>{{orderMessage.skuName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">免仓期(天)</span>
                <span>{{orderMessage.warehouseFreeDays}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>交割日</span>
                <div class="searchDate">
                    <div class="d">
                        <el-date-picker
                          v-model="createSellDelive.deliveryDate"
                          :disabled="!isSubmitBuy"
                          type="date"
                          value-format="timestamp"
                          placeholder="交割日"
                        >
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l">数量(吨)</span>
                <span>{{orderMessage.skuQuantity}}</span>
            </div>
            <div class="gy-form-group cl">
                <span class="l">已交割数量(吨)</span>
                <span>{{orderMessage.alreadyDeliveryQuantity}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>本次交割数量(吨)</span>
                <!--<input type="text" v-model="createSellDelive.deliveryQuantity">-->
                <input type="text" :disabled="orderMessage.surplusQuantityTwo < 0" v-model="orderMessage.surplusQuantityTwo">
            </div>
            <div class="gy-form-group">
                <span class="l">待交割数量(吨)</span>
                <span>{{orderMessage.surplusQuantity}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l"><i>*</i>采购交割凭证</span>
                <span v-if="erpGoodFileModelList && erpGoodFileModelList.length !== 0" @click="showImg(erpGoodFileModelList)"><i class="iconfont icon-photo"></i></span>
                <span v-else><i class="iconfont icon-photo-null"></i></span>
            </div>
            <div class="gy-form-group">
                <span class="l">交叉交割</span>
                <!--<input type="checkBox" v-model="createSellDelive.acrossDelivery">-->
                <template>
                    <!-- `checked` 为 true 或 false -->
                    <el-checkbox :disabled="!isSubmitBuy" v-model="createSellDelive.acrossDelivery" true-label="1" false-label="0" @change="onAcrossDelivery"></el-checkbox>
                </template>
            </div>
            <div class="gy-form-group cl" v-if="createSellDelive.acrossDelivery === '1'">
                <span class="l"><i>*</i>交叉采购合同号</span>
                <input type="text" :disabled="!isSubmitBuy" v-model="createSellDelive.acrossContractNo" placeholder="请选择采购合同">
                <i v-if="isSubmitBuy" class="iconfont icon-search" style="position: absolute;top: 10px;right: 20px;" @click="onSeachContract()"></i>
            </div>
            <div class="gy-form-group" v-if="createSellDelive.acrossDelivery === '1'">
                <span class="l">交叉采购合同</span>
                <div v-for="(item, index) in deliveryContractList" :key="index" style="display: inline-block;height: 50px;width: 50px;margin-left: 5px;">
                    <img :src="item.fileUrl" style="width: 50px;height:50px;cursor: pointer" @click="uploadPurchaseContract()">
                </div>
            </div>
            <div class="clear"></div>
            <div class="order-skjl">
                <div class="title">收款信息</div>
                <div class="gy-form-group">
                    <span class="l">合同金额(元)</span>
                    <span>{{collectionList.contractAmount | numToCash}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">待收金额(元)</span>
                    <span>{{collectionList.needCollectionTotal | numToCash}}</span>
                </div>
                <table class="gy-table j-table" style="width: 96%">
                    <thead>
                    <tr>
                        <th>编号</th>
                        <th>状态</th>
                        <th>收款凭证</th>
                        <th>收款金额(元)</th>
                        <th>付款用途</th>
                        <th>到账日期</th>
                    </tr>
                    </thead>
                    <tbody v-if="this.collectionList.erpCollectionModelList">
                    <tr v-for="(item, index) in collectionList.erpCollectionModelList" :key="index">
                        <td>{{item.id}}</td>
                        <td>{{item.collectionStatus === 10 ? '已创建' : '已确认'}}</td>
                        <td>
                                <span v-if="item.erpCollectionFileModelList.length !== 0" @click="showImg(item.erpCollectionFileModelList)"><i
                                        class="iconfont icon-photo"></i></span>
                            <span v-else><i class="iconfont icon-photo-null"></i></span>
                        </td>
                        <td>{{item.collectionAmount | numToCash}}</td>
                        <td>{{$constant.collectionType[item.collectionType]}}</td>
                        <td>{{item.collectionDate | date}}</td>
                    </tr>
                    </tbody>
                    <tbody v-else>
                    <tr>
                        <td colspan="10" style="text-align: center;">暂无数据</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- 进度条 -->
            <div class="step-title" v-if="!isSubmitBuy">操作流程</div>
            <div v-if="!isSubmitBuy" class="delivery-step">
                <gy-step :step="index+1"
                         :showLine="erpDeliveryHistoryModelList"
                         :doubleLength="erpDeliveryHistoryModelList"
                         :isRight="erpDeliveryHistoryModelList && (index === erpDeliveryHistoryModelList.length - 1)"
                         :isActive="erpDeliveryHistoryModelList && (index === 0)"
                         :isDone="erpDeliveryHistoryModelList && (index === 0)"
                         v-for="(item, index) in erpDeliveryHistoryModelList"
                         :key="index">
                    <div class="order-step-info">
                        <div>{{item.username}}</div>
                        <span>{{ item.actionDesc }}</span>
                    </div>
                </gy-step>
            </div>
            <div style="margin-top: 10px;text-align: right;padding-bottom: 30px;padding-right: 30px;padding-top: 18px;">
                <button v-if="!deliverySell" class="gy-button-normal" style="margin-right: 4px;" @click="orderData.newSaledialog = false">取消</button>
                <button v-if="deliverySell" class="gy-button-normal" style="margin-right: 4px;" @click="orderData.newSaledialog = false">关闭</button>
                <button v-if="isSubmitBuy" class="gy-button-extra" @click="createSellDelivery()">提交</button>
            </div>
            <dialog-img v-if="dialogVisiblesssbuy" @closedialogvisible="closedialogvisiblebuy" :dialogVisible="dialogVisiblesssbuy" :dialogImg="flieListBuy"></dialog-img>
        </el-dialog>
        <el-dialog width="1200px" class="order-dialog"
                   :visible.sync="crossPurchaseContract">
            <div class="order-apply">
                <div class="title">选择采购合同</div>
            </div>
            <div class="gy-form-group">
                <span class="l">上游公司</span>
                <input type="text" v-model="purchaseContractObj.sellerCompanyName">
                <i class="iconfont icon-search" style="position: absolute;top: 10px;right: 20px;" @click="onSeachContractList()"></i>
            </div>
            <div class="gy-form-group">
            </div>
            <table class="gy-table" style="width: 96%;">
                <thead>
                    <tr>
                        <th></th>
                        <th>上游公司</th>
                        <th>采购合同编号</th>
                        <th>合同金额(元)</th>
                        <th>交割日期</th>
                        <th>交割库</th>
                        <th>免仓期(天)</th>
                    </tr>
                </thead>
                <tbody v-if="this.purchaseContractList.length > 0">
                    <tr v-for="(item, index) in purchaseContractList" :key="index">
                        <td>
                            <input type="radio" @change="crossHandleCheckChange(item)" name="11">
                        </td>
                        <td>{{item.sellerCompanyName}}</td>
                        <td>{{item.contractCode}}</td>
                        <td>{{item.totalAmount|numToCash}}</td>
                        <td>{{item.deliveryDate}}</td>
                        <td>{{item.deliveryWarehouseName}}</td>
                        <td>{{item.warehouseFreeDays}}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                <tr>
                    <td colspan="7" style="text-align: center;">暂无数据</td>
                </tr>
                </tbody>
            </table>
            <!-- 翻页 -->
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page.sync = "purchaseContractObj.pageNo"
                    :page-size="purchaseContractObj.pageSize"
                    :total="totalDelivery"
                    @current-change="handleCurrentChangeDeliver">
            </el-pagination>
            <div class="button-wrap" style="padding-top: 24px;padding-bottom: 30px;padding-right: 30px;">
              <button class="gy-button-normal" style="margin-right: 4px;" @click="crossPurchaseContract = false">取消</button>
              <button class="gy-button-extra" @click="crossSubmission()">确定</button>
            </div>
        </el-dialog>
        <el-dialog title="图片预览" :visible.sync="deliverAssembleVisible" width="1000px" custom-class="dialog-erp-cont">
            <div class="block" style="width: 100%" v-for="(item, index) in orderMessage.erpGoodFileModelList" :key="index">
                <!--<img :src="item.fileUrl" alt="" width="100%" height="100%">-->
                <img v-if="$constant.imgType.indexOf(item.fileUrl.split('.').pop().toLowerCase()) !== -1" :src="item.fileUrl" alt="" width="100%" height="auto">
                <iframe v-if="item.fileUrl.split('.').pop().toLowerCase() === 'pdf'" :src="item.fileUrl" frameborder="0" id="contractIframe" width="100%" style="min-height: 490px"></iframe>
                <iframe v-if="$constant.fileType.indexOf(item.fileUrl.split('.').pop().toLowerCase()) !== -1" :src="'https://view.officeapps.live.com/op/view.aspx?src='+ item.fileUrl" frameborder='0' width="100%" style="min-height: 490px"></iframe>
            </div>
        </el-dialog>
        <el-dialog title="图片预览" :visible.sync="deliverContractAssembleVisible" width="1000px" custom-class="dialog-erp-cont">
            <div class="block" style="width: 100%" v-for="(item, index) in deliveryContractList" :key="index">
                <!--<img :src="item.fileUrl" alt="" width="100%" height="100%">-->
                <img v-if="$constant.imgType.indexOf(item.fileUrl.split('.').pop().toLowerCase()) !== -1" :src="item.fileUrl" alt="" width="100%" height="auto">
                <iframe v-if="item.fileUrl.split('.').pop().toLowerCase() === 'pdf'" :src="item.fileUrl" frameborder="0" id="" width="100%" style="min-height: 490px"></iframe>
                <iframe v-if="$constant.fileType.indexOf(item.fileUrl.split('.').pop().toLowerCase()) !== -1" :src="'https://view.officeapps.live.com/op/view.aspx?src='+ item.fileUrl" frameborder='0' width="100%" style="min-height: 490px"></iframe>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import dialogImg from './../../components/dialogImg';
import gyStep from '@/components/step1';
export default {
    name: 'deliveryAssembly',
    props: {
        orderData: Object,
        orderMessage: Object,
        orderIds: Object
    },
    data () {
        return {
            id: 59,
            isSubmitBuy: true,
            purchaseOrderId: null,
            dialogVisiblesssbuy: false,
            saleOrderId: null,
            deliveryView: [], // 新建页面
            createSellDelive: {
                deliveryQuantity: null,
                deliveryDate: null,
                acrossDelivery: 0,
                erpDeliveryFileModelList: [], // 交割凭证
                erpFileContractModelList: [], // 合同凭证
                erpGoodFileModelList: [] // 货权凭证
            }, // 保存销售交割
            purchaseDeliverydialog: false, // 采购交割
            newSaledialog: false, // 销售
            marketingList: [], // 交割
            purchaseList: [],
            saleList: [],
            certificateOfSaleVoucherList: { // 销售-合同-货权单凭证-交割凭证上传
                erpDeliveryFileModelList: [], // 交割凭证
                erpFileContractModelList: [], // 合同凭证
                erpGoodFileModelList: [] // 货权凭证
            },
            crossPurchaseContract: false, // 交叉采购合同
            purchaseContractObj: {
                pageNo: 1,
                pageSize: 10
            }, // 交叉合同传入参数
            purchaseContractList: [], // 交叉合同接收数据
            crossSubmissionList: {}, // 提交转接数据
            totalDelivery: null,
            newDateDeliveryAssembly: '',
            deliverAssembleVisible: false, // 上游货权单凭证
            deliverContractAssembleVisible: false, // 上传合同单凭证
            deliveryContractList: [], // 销售交割-采购合同List
            erpGoodFileModelList: [], // 采购交割凭证
            befGoodFileModelList: [], // 采购交割凭证（交叉交割前的）
            deliverySure: null,
            erpPurchaseHistoryModelList: [], // 采购交割审批流程
            erpDeliveryHistoryModelList: [], // 销售交割审批流程
            deliveryPure: false,
            deliverySell: false,
            sublimePure: true,
            collectionList: [], // 收付款-收款
            createBuyDelive: {
                deliveryDate: null,
                erpDeliveryFileModelList: []
            } // 保存采购交割,
        };
    },
    mounted () {
        this.newDateDeliveryAssembly = new Date();
        this.createBuyDelive.deliveryDate = Date.parse(this.newDateDeliveryAssembly);
        this.createSellDelive.deliveryDate = Date.parse(this.newDateDeliveryAssembly);
        this.paymentColl();
        this.erpGoodFileModelList = this.orderMessage.erpGoodFileModelList;
        this.befGoodFileModelList = this.orderMessage.erpGoodFileModelList;
    },
    methods: {
        // 关闭弹出框-采购交割
        handleClosePurchanseDelivery () {
            this.orderData.purchaseDeliverydialog = false;
            this.$emit('ivoiceList');
        },
        // 关闭弹出框-销售交割
        handleCloseSaleDelivery () {
            this.orderData.newSaledialog = false;
            this.$emit('ivoiceList');
        },
        // 查看上传合同
        uploadPurchaseContract () {
            this.deliverContractAssembleVisible = true;
        },
        // 查看上游货权交割
        viewUpstreamDeliveries () {
            this.deliverAssembleVisible = true;
        },
        // 交叉采购合同
        crossHandleCheckChange (item) {
            this.crossSubmissionList = item;
            this.deliverySure = item.orderId;
        },
        // 交叉采购合同部- 提交
        crossSubmission () {
            this.deliveryContractClick(this.deliverySure);
            this.createSellDelive.acrossContractNo = this.crossSubmissionList.contractCode;
            this.crossPurchaseContract = false;
        },
        // 弹出新建销售交割
        onSeachContract () {
            this.crossPurchaseContract = true;
            this.purchaseContract();
        },
        onSeachContractList () {
            this.purchaseContract();
        },
        // 弹出新建销售交割列表
        purchaseContract () {
            this.purchaseContractObj.orderId = this.orderIds.purchaseOrderId;
            this.purchaseContractObj.productId = this.orderIds.productId;
            this.purchaseContractObj.skuQuantity = this.orderMessage.surplusQuantitys;
            this.$http.post(this.$api.delivery.crossContract, this.purchaseContractObj).then((res) => {
                if (res.data.code === 0) {
                    this.totalDelivery = res.data.data.total;
                    if (res.data.data.rows) {
                        this.purchaseContractList = res.data.data.rows;
                    } else {
                        this.purchaseContractList = [];
                    }
                }
            });
        },
        // 分页
        handleCurrentChangeDeliver (r) {
            this.purchaseContractObj.pageNo = r;
            this.purchaseContract();
        },
        // 收付款-收款
        paymentColl () {
            this.$http.get(this.$api.payment.getDetailCollection + this.orderIds.saleOrderId)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.collectionList = res.data.data;
                    }
                });
        },
        // 销售交割凭证
        salesDeliveryVoucher (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            that.$http.post(that.$api.upload.imgUpload, formData, headers)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.createSellDelive.erpDeliveryFileModelList.push({
                            fileUrl: res.data.data
                        });
                    }
                });
        },
        // 交割
        // 采购
        purchase () {
            let that = this;
            that.$http.get(that.$api.delivery.getBuyDetail + '/' + that.purchaseOrderId)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.purchaseList = res.data.data;
                    }
                });
        },
        // 销售
        sale () {
            let that = this;
            that.$http.get(that.$api.delivery.getSellDetail + '/' + that.saleOrderId)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.saleList = res.data.data;
                    }
                });
        },
        // 新增采购交割页面
        createBuyDeliveryViews () {
            this.$http.get(this.$api.delivery.createDeliveryView + this.purchaseOrderId).then((res) => {
                if (res.data.code === 0) {
                    this.deliveryView = res.data.data;
                }
            });
        },
        // 新增销售交割页面
        createSellDeliveryViews () {
            this.$http.get(this.$api.delivery.createDeliveryView + this.saleOrderId).then((res) => {
                if (res.data.code === 0) {
                    this.deliveryView = res.data.data;
                }
            });
        },
        // 保存采购交割
        createBuyDelivery () {
            if (this.orderMessage.deliveryWarehouseName === '') {
                this.$message({
                    message: '请输入交割库',
                    type: 'error'
                });
                return;
            }
            if (this.orderMessage.deliveryDetailedAddress === '') {
                this.$message({
                    message: '请输入交割地址',
                    type: 'error'
                });
                return;
            }
            if (this.createBuyDelive.deliveryDate === null) {
                this.$message({
                    message: '请选择交割日',
                    type: 'error'
                });
                return;
            }
            if (this.orderMessage.surplusQuantitys === '') {
                this.$message({
                    message: '请填本次交割数量',
                    type: 'error'
                });
                return;
            }
            // if (this.createBuyDelive.erpDeliveryFileModelList.length === 0) {
            //     this.$message({
            //         message: '请上传交割凭证',
            //         type: 'error'
            //     });
            //     return;
            // }
            this.createBuyDelive.deliveryWarehouseName = this.orderMessage.deliveryWarehouseName;
            this.createBuyDelive.deliveryDetailedAddress = this.orderMessage.deliveryDetailedAddress;
            this.createBuyDelive.deliveryQuantity = this.orderMessage.surplusQuantitys;
            this.createBuyDelive.orderId = this.orderIds.purchaseOrderId;
            this.createBuyDelive.contractEssenceId = this.orderIds.id;
            // this.createBuyDelive.allowedFunctionsId = 37;
            this.$http.post(this.$api.delivery.createBuyDelivery, this.createBuyDelive).then((res) => {
                if (res.data.code === 0) {
                    this.deliveryPure = true;
                    this.sublimePure = false;
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    // this.createBuyDelive.deliveryDate = null;
                    // this.orderData.purchaseDeliverydialog = false;
                    this.isSubmitBuy = false;
                    this.salesViewHistory(res.data.data.targetId, 'Purchase');
                    this.$emit('ivoiceList');
                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            });
        },
        // 保存销售交割
        createSellDelivery () {
            if (this.orderMessage.deliveryWarehouseName === '') {
                this.$message({
                    message: '请输入交割库',
                    type: 'error'
                });
                return;
            }
            if (this.createSellDelive.acrossDelivery === '1' && (!this.createSellDelive.acrossContractNo)) {
                this.$message({
                    message: '请选择交叉采购合同',
                    type: 'error'
                });
                return;
            }
            if (this.orderMessage.deliveryDetailedAddress === '') {
                this.$message({
                    message: '请输入交割地址',
                    type: 'error'
                });
                return;
            }
            if (this.createSellDelive.deliveryDate === null) {
                this.$message({
                    message: '请选择交割日',
                    type: 'error'
                });
                return;
            }
            if (this.orderMessage.surplusQuantityTwo === null) {
                this.$message({
                    message: '请输入本次交割数量',
                    type: 'error'
                });
                return;
            }
            if (this.orderMessage.surplusQuantityTwo <= 0) {
                this.$message({
                    message: '已超出待交割数量',
                    type: 'error'
                });
                return;
            }
            this.createSellDelive.deliveryQuantity = this.orderMessage.surplusQuantityTwo;
            this.createSellDelive.erpFileContractModelList = this.deliveryContractList;
            this.createSellDelive.erpGoodFileModelList = this.erpGoodFileModelList;
            this.createSellDelive.deliveryDetailedAddress = this.orderMessage.deliveryDetailedAddress;
            this.createSellDelive.deliveryWarehouseName = this.orderMessage.deliveryWarehouseName;
            this.createSellDelive.orderId = this.orderIds.saleOrderId;
            this.createSellDelive.contractEssenceId = this.orderIds.id;
            this.$http.post(this.$api.delivery.createSellDelivery, this.createSellDelive).then((res) => {
                if (res.data.code === 0) {
                    this.deliverySell = true;
                    this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    // this.createSellDelive.deliveryQuantity = null;
                    // this.createSellDelive.deliveryDate = null;
                    this.isSubmitBuy = false;
                    this.salesViewHistory(res.data.data.targetId, 'Delivery');
                    // this.orderData.newSaledialog = false;
                    this.$emit('ivoiceList');
                } else {
                    this.$message({
                        message: res.data.message,
                        type: 'error'
                    });
                }
            });
        },
        // 销售交割-交叉交割选择合同后回调
        deliveryContractClick (val) {
            this.$http.get(this.$api.delivery.deliveryContract + '/' + val).then((res) => {
                if (res.data.code === 0) {
                    // 采购交割凭证
                    this.erpGoodFileModelList = res.data.data.erpGoodFileModelList;
                    // 交叉采购合同
                    this.deliveryContractList = res.data.data.erpFileContractModelList;
                }
            });
        },
        // 选中或取消交叉交割
        onAcrossDelivery (val) {
            if (val === '1' || val === 1) {
                // 选中交叉交割
            } else {
                this.erpGoodFileModelList = this.befGoodFileModelList;
                this.deliveryContractList = [];
                this.createSellDelive.acrossContractNo = null;
            }
        },
        showImg (file) {
            console.log(file);
            this.dialogVisiblesssbuy = true;
            this.flieListBuy = file;
        },
        closedialogvisiblebuy () {
            this.dialogVisiblesssbuy = false;
        },
        // 销售交割工作流程
        salesViewHistory (item, val) {
            let params = {
                targetId: item,
                targetType: 7
            };
            if (val === 'Purchase') {
                params.targetType = 7;
            } else {
                params.targetType = 8;
            }
            this.$http.post(this.$api.contract.approve1History, params).then((res) => {
                if (res.data.code === 0) {
                    if (val === 'Purchase') {
                        this.erpPurchaseHistoryModelList = res.data.data;
                    } else {
                        this.erpDeliveryHistoryModelList = res.data.data;
                    }
                }
            }).catch((e) => {
                console.log(e);
            });
        }
    },
    components: {dialogImg, gyStep}
};
</script>

<style lang="scss" scoped>
    .delivery-step {
        padding: 0 75px;
        clear: both;
        .step-box {
            float: left;
        }
        .line {
            width: 75px;
        }
        .order-step-info {
            position: relative;
            width: 170px;
            text-align: center;
        }
        .step-box:first-child {
            .order-step-info {
                width: 95px;
                left: -36px;
                span {
                    display: block;
                    width: 170px;
                    position: relative;
                    left: -40px;
                }
            }
        }
        .step-box:last-child {
            .order-step-info {
                width: 95px;
                left: 36px;
                span {
                    display: block;
                    width: 170px;
                    position: relative;
                    left: -40px;
                }
            }
        }
        &:after {
            display: block;
            content: ' ';
            clear: both;
        }
    }
    .button-wrap {
        width: 100%;
        text-align: right;
    }
</style>
<style lang="scss">
    .deliveryDetails {
        .clear {
            clear: both;
        }
        .el-tabs {
            .lll {
                width: 100%;
                height: 340px;
            }
        }
        .order-dialog {
            .order-skjl{
                .title {
                    font-size: 16px;
                    color: #333;
                    font-weight: bold;
                    height: 35px;
                    margin-left: 16px;
                    line-height: 35px;
                }
            }
            .step-title{
                font-size: 16px;
                color: #333;
                font-weight: bold;
                height: 35px;
                margin-left: 16px;
                margin-top: 14px;
                line-height: 35px;
            }
            .el-dialog__header {
                font-weight: bold;
                padding: 0px;
                .el-dialog__headerbtn{
                    top: 10px;
                    right: 16px;
                }
            }
            .el-dialog__body {
                margin: 0;
                padding: 0;
            }
            .order-apply {
                .title {
                    font-size: 16px;
                    color: #333;
                    font-weight: bold;
                    height: 35px;
                    margin-left: 16px;
                    line-height: 35px;
                }
            }
            .gy-form-group {
                padding: 10px 40px 10px 154px!important;
                .l{
                    width: 114px!important;
                }
                span {
                    i {
                        color: $color-highlight;
                    }
                }
            }
            .gy-form-group .l {
                width: 125px;
            }
        }
    }
</style>
