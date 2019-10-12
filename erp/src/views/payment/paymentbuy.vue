<!-- 付款审批 -->
<template>
  <div class="paydetail-wrapper my-payment">
      <div class="essential-information">
          <p class="paydetail-title">基本信息</p>
          <pay-cont :list="list"></pay-cont>
      </div>
      <div class="receivables-information">
          <p class="paydetail-title">付款信息</p>
          <div class="essential-wrapper pay-detail essential-row-float" v-if="flag1 === 0">
              <div class="essential-item">
                  <div class="essential-title">申请金额(元)</div>
                  <div class="essential-text">{{sales.payTotal|numToCash}}</div>
              </div>
              <div class="essential-item">
                  <div class="essential-title">申请日期</div>
                  <div class="essential-text">{{sales.createdDate | date}}</div>
              </div>
              <div class="essential-item" v-if="isFormula && sales.payMethod !==3">
                  <div class="essential-title">申请付款数量(吨)</div>
                  <div class="essential-text" :class="{'red': isFormula}">{{applyQuantities | numToQuantity}}</div>
              </div>
              <div class="essential-item" v-if="isFormula && sales.payMethod !==3">
                  <div class="essential-title">合同数量(吨)</div>
                  <div class="essential-text">{{skuQuantity | numToQuantity}}</div>
              </div>
              <div class="essential-item">
                  <div class="essential-title">合同金额(元)</div>
                  <template v-if="sales.payMethod == 3 && sales.payBillType == 2">
                      <div v-if="Number(list.downstreamInfo.skuPriceType) === 21 || Number(list.downstreamInfo.skuPriceType) === 22" class="essential-text red">公式计价</div>
                      <div v-else class="essential-text">{{list.downstreamInfo.totalAmount | numToCash}}</div>
                  </template>
                  <template v-else>
                      <div v-if="isFormula" class="essential-text red">公式计价</div>
                      <div v-else class="essential-text">{{list.upstreamInfo.totalAmount | numToCash}}</div>
                  </template>
              </div>
              <div class="essential-item" v-if="isFormula && sales.payMethod !==3 && sales.allAppliedQty > skuQuantity">
                  <div class="essential-title">申请付款总量(吨)</div>
                  <div class="essential-text">{{sales.allAppliedQty | numToQuantity}}<span class="red">&nbsp;&nbsp;(申请总量已超出合同约定)</span></div>
              </div>
              <div class="essential-item" v-if="isFormula && sales.payMethod !==3">
                  <div class="essential-title">暂定价(元/吨)</div>
                  <div class="essential-text">{{tempPrice | numToCash(true)}}</div>
              </div>
              <div class="essential-item">
                  <div class="essential-title">付款单位</div>
                  <div class="essential-text">{{list.targetCorpName}}</div>
              </div>
              <div class="essential-item">
                  <div class="essential-title">计划付款时间</div>
                  <div class="essential-text">{{sales.planPayTime|date}}</div>
              </div>
              <div class="essential-item">
                  <div class="essential-title">收款单位</div>
                  <div class="essential-text" v-if="sales.payMethod == 3 && sales.payBillType == 2">{{list.buyerCompanyName}}</div>
                  <div class="essential-text" v-else>{{list.sellerCompanyName}}</div>
              </div>
              <div class="essential-item">
                  <div class="essential-title">开户行</div>
                  <div class="essential-text">{{sales.sellerDepositBank}}</div>
              </div>
              <div class="essential-item">
                  <div class="essential-title">付款用途</div>
                  <div class="essential-text">{{sales.payMethodStr}}</div>
              </div>
              <div class="essential-item">
                  <div class="essential-title">银行账号</div>
                  <div class="essential-text">{{sales.sellerAccount}}</div>
              </div>
              <div class="essential-item">
                  <div class="essential-title">经办人</div>
                  <div class="essential-text">{{sales.createUserName}}</div>
              </div>
              <div class="essential-item">
                  <div class="essential-title">付款方式</div>
                  <div class="essential-text">{{sales.tradeModeStr}}</div>
              </div>
              <div class="essential-item">
                  <div class="essential-title">付款单编号</div>
                  <div class="essential-text">{{sales.payNumber}}</div>
              </div>
              <div class="essential-item">
                  <div class="essential-title">付款说明</div>
                  <div class="essential-text">{{sales.payDesc | payDescStr}}</div>
              </div>
              <div class="essential-item" v-if="sales.payDesc === 3">
                  <div class="essential-title">审批类型</div>
                  <div class="essential-text">{{sales.approveType | approveType}}</div>
              </div>
              <div class="essential-item">
                  <div class="essential-title">状态</div>
                  <div class="essential-text">{{sales.approveStatusStr}}</div>
              </div>
              <div class="essential-item">
                  <div class="essential-title">备注</div>
                  <div class="essential-text text-overflow" style="line-height: 30px;">{{sales.remarks||'-'}}</div>
              </div>
              <!-- 付款银行及账号 -->
              <div class="essential-item" v-if="isUpdated && permiseCreate === 1">
                  <div class="essential-title">付款银行</div>
                  <div class="essential-text">{{sales.buyerDepositBank}}</div>
              </div>
              <div class="essential-item" v-if="isUpdate && permiseCreate === 1">
                  <div class="essential-title"><span class="isMust">*</span>付款银行</div>
                  <el-select class="input-date" v-model="payingBankInfo.buyerDepositBank" placeholder="请选择" @change="changeBlank">
                      <el-option
                          v-for="item in newBank"
                          :key="item.bankAccId"
                          :label="item.depositBankName"
                          :value="item.bankAccId">
                      </el-option>
                  </el-select>
              </div>
              <div class="essential-item" v-if="isUpdated && permiseCreate === 1">
                  <div class="essential-title">出账日期</div>
                  <div class="essential-text">{{sales.payTime | date}}</div>
              </div>
              <div class="essential-item" v-if="isUpdate && permiseCreate === 1">
                  <div class="essential-title"><span class="isMust">*</span>付款凭证</div>
                  <div class="essential-text">
                      <gy-file-upload ref="pFileUpload" @callbackFileUpload="onCallbackBuyFileUpload"></gy-file-upload>
                  </div>
              </div>
              <div class="essential-item" v-if="isUpdate && permiseCreate === 1" style="height: 50px">
                  <div class="essential-title">出账日期</div>
                  <div>
                      <el-date-picker class="input-date"
                                      v-model="appalyPaymentTime"
                                      type="date"
                                      value-format="timestamp"
                                      placeholder="日期">
                      </el-date-picker>
                  </div>
              </div>
              <div class="essential-item" v-if="isUpdated && permiseCreate === 1">
                  <div class="essential-title">付款凭证</div>
                  <div class="essential-text">
                    <span v-if="sales.paymentVoucher && sales.paymentVoucher.length !== 0" @click="showImg(sales.paymentVoucher.split(','))"><i
                        class="iconfont icon-photo"></i></span>
                      <span v-else><i class="iconfont icon-photo-null"></i></span>
                  </div>
              </div>
          </div>
          <!-- 重新创建 -->
          <div class="essential-wrapper pay-detail essential-row-float" v-else>
              <div class="essential-item">
                  <div class="essential-title"><i class="isMust">*</i>申请日期1</div>
                  <div class="essential-text input-date">
                      <el-date-picker
                          v-model="createPaymentForm.appalyPaymentTime"
                          type="date"
                          value-format="timestamp"
                          placeholder="申请日期"
                      >
                      </el-date-picker>
                  </div>
              </div>
              <div class="essential-item">
                  <div class="essential-title"><i class="isMust">*</i>付款单位</div>
                  <div class="essential-text">
                      {{sales.buyerCorpName}}
                  </div>
              </div>
              <div class="essential-item cl">
                  <div class="essential-title"><i class="isMust">*</i>计划付款日期</div>
                  <div class="essential-text input-date">
                      <el-date-picker
                          v-model="createPaymentForm.planPayTime"
                          type="date"
                          value-format="timestamp"
                          placeholder="计划付款日期"
                      >
                      </el-date-picker>
                  </div>
              </div>
              <div class="essential-item">
                  <div class="essential-title">收款单位</div>
                  <div class="essential-text">{{sales.sellerCorpName}}</div>
              </div>
              <div class="essential-item cl">
                  <div class="essential-title"><i class="isMust">*</i>收款开户行</div>
                  <div class="essential-text input-date">
                      <el-select v-model="createPaymentForm.sellerDepositBankId" placeholder="请选择收款银行账户" @change="changeBlank">
                          <el-option
                              v-for="item in newBank"
                              :key="item.bankAccId"
                              :label="item.depositBankName"
                              :value="item.bankAccId">
                          </el-option>
                      </el-select>
                  </div>
              </div>
            <div class="essential-item">
                  <div class="essential-title"><i class="isMust">*</i>收款银行账号</div>
                  <div class="essential-text">
                      <input type="text" v-model="createPaymentForm.sellerAccount" readonly>
                  </div>
            </div>
              <div class="essential-item">
                  <div class="essential-title">合同金额(元)</div>
                  <div v-if="isFormula" class="essential-text red">公式计价</div>
                  <div v-else class="essential-text">{{list.upstreamInfo.totalAmount | numToCash}}</div>
              </div>
              <div class="essential-item">
                  <div class="essential-title"><i class="isMust">*</i>付款方式</div>
                  <div class="essential-text">
                      <div><input type="radio" v-model="createPaymentForm.tradeMode" value="22">银行电汇</div>
                      <div><input type="radio" v-model="createPaymentForm.tradeMode" value="26">承兑汇票</div>
                  </div>
              </div>
              <!-- 保证金的话 没有申请付款数量和暂定价. 申请金额不能输入 只能展示 -->
            <div class="gy-form-group" v-if="isFormula">
                <span class="l"><i>*</i>申请付款数量(吨)</span>
                <input class="gy-input" v-model="applyQuantities" type="number" min="0" placeholder="请输入申请付款数量">
            </div>
              <div class="essential-item">
                  <div class="essential-title"><i class="isMust">*</i>用途</div>
                  <div class="essential-text">
                      <div style="display: inline-block">
                          <input type="radio" v-model="createPaymentForm.payMethod" value="1" disabled="true">货款
                      </div>
                      <div style="display: inline-block">
                          <input type="radio" v-model="createPaymentForm.payMethod" disabled="true" value="2">保证金
                      </div>
                      <div style="display: inline-block">
                          <input type="radio" v-model="createPaymentForm.payMethod" disabled="true" value="5">追加保证金
                      </div>
                  </div>
              </div>
            <div class="gy-form-group cl" v-if="isFormula">
                <span class="l"><i>*</i>暂定价(元/吨)</span>
                <input class="gy-input" v-model="tempPrice" type="number" placeholder="请输入暂定价">
            </div>
            <div class="gy-form-group" style="float: right; height: 90px;padding: 8px 30px 8px 131px;">
                    <span class="l" style="width: 120px"><strong>*</strong>付款说明</span>
                    <input type="radio" v-model="createPaymentForm.payDesc" value="1">本笔资金支出为正常交割，我司需垫资<br>
                    <input type="radio" v-model="createPaymentForm.payDesc" value="2">本笔资金支出需先收到下家款项，我司无需垫资<br>
                    <input type="radio" v-model="createPaymentForm.payDesc" value="3">分批付款，以付款明细表为准
            </div>
              <div class="gy-form-group">
                    <span class="l"><strong>*</strong>申请金额(元)</span>
                    <input type="text" v-model="createPaymentForm.payTotal" placeholder="请输入申请金额">
              </div>
            <div class="gy-form-group" v-if="createPaymentForm.payDesc == 3" style="padding: 8px 30px 8px 131px;">
                <span class="l" style="width: 120px"><strong>*</strong>审批类型</span>
                <input type="radio" v-model="createPaymentForm.approveType" value="1">一次审批
                <input type="radio" v-model="createPaymentForm.approveType" value="2">批次审批
            </div>
              <div class="gy-form-group cl">
                  <span class="l">经办人</span>
                  <div>{{sales.createUserName}}</div>
              </div>
              <div class="essential-item">
                  <div class="essential-title">备注</div>
                  <div class="essential-text">
                      <textarea class="gy-textarea" v-model="createPaymentForm.remarks" cols="30" rows="10"></textarea>
                  </div>
              </div>
          </div>
          <div class="paybuy-fpfkmx" style="margin-bottom:20px" v-if="fromFlg===2 && (createPaymentForm.payDesc==='3' || createPaymentForm.payDesc===3)">
              <p class="paydetail-title" style="padding-left:0px;margin-bottom:10px">分批付款明细</p><!-- 这里是驳回后重新提交 -->
              <table class="gy-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>付款金额(元)</th>
                    <th>备注</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in createPaymentForm.payInfoList" :key="index">
                    <td>{{index + 1}}</td>
                    <td><input type="text" v-model="item.payAmount" placeholder="请输入付款金额"></td>
                    <td><input type="text" v-model="item.description" placeholder="请输入备注"></td>
                    <td>
                        <span @click="addClick()" style="cursor: pointer">+</span><br>
                        <span v-if="createPaymentForm.payInfoList.length > 1" @click="delectClick(index)" style="cursor: pointer">-</span>
                    </td>
                </tr>
                </tbody>
            </table>
          </div>
        <!-- 已付款明细 -->
        <div class="payment-elTable my-table" v-if="paymemtDtos && paymemtDtos.multiPaylist && !isPass">
            <p class="paydetail-title">{{paymentTblTitle}}</p>
            <div class="essential-wrapper approval-list">
                <div class="gy-table">
                    <el-table
                    :data="paymemtDtos.multiPaylist"
                    style="width: 100%">
                    <el-table-column
                        class-name="text-r"
                        label="付款金额(元)"
                        width="120">
                        <template slot-scope="scope">
                        <span>{{scope.row.payAmount | numToCash}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="付款银行">
                        <template slot-scope="scope">
                        <span>{{scope.row.buyerDepositBank}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="出账日期"
                        width="150">
                        <template slot-scope="scope">
                        <span>{{scope.row.payTime | date}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="付款凭证"
                        class-name="picture-styles-el"
                        width="120">
                        <template slot-scope="scope">
                        <span v-if="scope.row.fileUrl"
                            @click="showImg(scope.row.fileUrl.split(','))"><i class="iconfont icon-photo"></i></span>
                        <span v-else><i class="iconfont icon-photo-null"></i></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="备注">
                        <template slot-scope="scope">
                        <div class="text-overflow">{{scope.row.description}}</div>
                        </template>
                    </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="essential-information my-form-l" v-if="batchesList && Number($route.query.homeFromFlg)===1">
              <div class="essential-wrapper">
                  <!-- paybuy-fpfkmx -->
                  <!-- 付款明细 -->
                  <p class="paydetail-title">分批付款明细</p><!-- 这里是财务付款时的查看 -->
                  <div v-for="(item, index) in batchesList" :key="index">
                      <div class="min-title-2">付款明细{{index + 1}}</div>
                      <div class="clearfix">
                        <div class="gy-form-group">
                            <label class="l">付款金额(元)</label>
                            <span>{{item.payAmount | numToCash}}</span>
                            <!-- <input type="text" v-model="item.payAmount"> -->
                        </div>
                        <div class="gy-form-group">
                            <label class="l"><i>*</i>出账日期</label>
                            <el-date-picker class="input-date"
                                v-model="item.payTime"
                                type="date"
                                value-format="timestamp">
                            </el-date-picker>
                        </div>
                        <div class="gy-form-group">
                            <label class="l"><i>*</i>付款银行</label>
                            <el-select placeholder="请选择付款银行" v-model="item.bankAccId" @change="itemBankChange(item, item.bankAccId, item.buyerDepositBank, index)">
                                <el-option
                                    v-for="item in newBank"
                                    :key="item.bankAccId"
                                    :label="item.depositBankName"
                                    :value="item.bankAccId">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="gy-form-group">
                            <span class="l spanLeft"><i>*</i>付款凭证</span>
                            <gy-file-upload style="display: inline-block;" ref="sFileUpload" @callbackFileUpload="onCallbackSaleFileUpload($event, item)"></gy-file-upload>
                        </div>
                        <div class="gy-form-group">
                            <label class="l">备注</label>
                            <span>{{item.description}}</span>
                        </div>
                      </div>
                  </div>
                  <!-- <table class="gy-table" style="width: 100%">
                      <thead>
                      <tr>
                          <th style="width:120px">付款金额(元)</th>
                          <th style="width: 280px">备注</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(item, index) in sales.payInfoList" :key="index">
                          <td style="text-align: right;">{{item.payAmount | numToCash}}</td>
                          <td>{{item.description}}</td>
                      </tr>
                      </tbody>
                  </table> -->
              </div>
          </div>
      </div>
      <div class="essential-information" v-if="isPass">
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
      <div class="foot" :class="{'mt-20': sales.payDesc === '3'}">
          <template v-if="isDefault">
              <button class="gy-button-normal" @click="$router.go(-1)">返回</button>
          </template>
          <template v-if="isPass">
              <button class="gy-button-normal" @click="$router.go(-1)">返回</button>
              <template v-if="$route.query.homeFromFlg===1 || $route.query.homeFromFlg==='1'">
                  <button class="gy-button-normal" @click="reject">驳回</button>
                  <button class="gy-button-extra confirmations" @click="approveSub('1')">通过</button>
              </template>
          </template>
          <template v-if="isUpdate && !isUpdated && doneFlg === 0">
              <button v-if="!batchesList" class="gy-button-extra confirmations" v-gy-auth="'cashier_payment'" @click="submit">保存</button>
              <button v-if="batchesList" class="gy-button-extra confirmations" v-gy-auth="'cashier_payment'" @click="updateSubmit">保存</button>
          </template>
          <template v-if="flag1 === 1">
              <button class="gy-button-normal" @click="cancelResubmit">取消</button>
              <button class="gy-button-extra confirmations" @click="submitRet">提交</button>
          </template>
          <!--<template v-if="flag === 2">-->
              <!--<button class="gy-button-extra confirmations" v-gy-auth="'to_payment'" @click="resetSub">重新创建</button>-->
          <!--</template>-->
          <div class="button-wrap" v-if="fromFlg===1 || fromFlg===2">
              <button class="gy-button-extra comment-button" @click="comment()">评论</button>
          </div>
      </div>
      <gy-operation-history ref="operationHis"></gy-operation-history>
      <gy-comment-remark v-if="commentDiog.dialogVisibleRemark === true" :dialog = "commentDiog" :invoice="commentParam"></gy-comment-remark>
      <bank-acc ref="bankAcc" @onSaveAccInfo="popupPaySubmission"></bank-acc>
      <gy-file-view ref="contFileView"></gy-file-view>
  </div>
</template>

<script>
import payCont from './pay-cont';
import gyFileView from '../components/gyFileView';
import bankAcc from './../components/bankAcc';
import gyFileUpload from './../components/gyFileUpload';
import gyOperationHistory from './../../components/gyOperationHistoryComment';
import gyCommentRemark from './../../components/gyCommentRemark';

// 目前销售结算时的退款审批也共用此页面，但是收款方和付款方用的是销售订单里的交易双方
export default {
    components: {payCont, gyFileView, bankAcc, gyFileUpload, gyOperationHistory, gyCommentRemark},
    data () {
        return {
            isFormula: false,
            skuQuantity: null, // 合同数量
            tempPrice: null,
            applyQuantities: null,
            fileModelList: [],
            isShowFpmx: false,
            indexPc: null,
            batchesList: [
                // {
                //     id: null,
                //     payAmount: null,
                //     buyerDepositBankId: null,
                //     buyerDepositBank: null,
                //     buyerAccount: null,
                //     payTime: null,
                //     fileUrl: null,
                //     description: null
                // }
            ],
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
            flag: 1,
            flag1: 0, // 1:编辑  0: 回显
            createPaymentForm: {
                contEssId: null,
                appalyPaymentTime: new Date().getTime(),
                planPayTime: new Date(), //
                sellerAccount: null, //
                sellerDepositBankId: null,
                sellerDepositBank: null,
                payMethod: null, //
                sellerCorpName: null, //
                payTotal: null, //
                tradeMode: null, //
                handlerUserName: null,
                payDesc: null, //
                approveType: null, //
                payInfoList: [ //
                    {payAmount: null, description: null}
                ],
                remarks: null
            },
            showPayDesc: true,
            payDescRet: null,
            defalultPayDesc: null, // 缺省的付款说明
            defaultPayInfoList: [ // 缺省的付款明细(两行)
                {payAmount: null, description: null},
                {payAmount: null, description: null}
            ],
            sales: {
                sellerCorpName: null, // 上游公司名称(和收款单位一样)
                tracontractAmount: null, // 合同金额
                payTotal: null, // 申请金额
                payMethodStr: null, // 用途 1：货款 2：保证金 5:追加保证金
                createdDate: null, // 申请日期
                payTime: null, // 出账日期
                sellerDepositBank: null, // 开户行
                sellerAccount: null, // 银行账户
                tradeMode: null, // 付款方式 1: 在线支付 线下支付目前有以下子分类： 21:银行转账、22:银行直付、23:银行承兑汇票、24:商业承兑汇票 25、支票 26、承兑汇票
                tradeModeStr: null,
                shouldPaymentTotal: null, // 应付款金额
                hadPaymentTotal: null, // 已付款金额
                needPaymentTotal: null, // 待付款金额
                createUserName: null, // 经办人
                approveStatusStr: null, // 状态 0:未审批 1:已审批通过 2:审批驳回 3：审批中 这里缺省值设为'1'是为了确保兼容现有数据
                approveStatus: null, // 状态
                paymentVoucher: null, // 付款凭证
                remarks: null, // 备注
                payDescStr: null, // 付款说明 1:本地资金支出为正常支出,我司需垫资 2:本地资金支出需先收到下家款项,我司无需垫资 3:分批付款,以付款明细表为准
                payNumber: null,
                uploadFileStatus: null
            },
            remarks: null, // 审批备注
            payRemarks: null, // 重新提交的付款备注
            ContImg: [], // 付款凭证
            isPass: false, // 是否审核通过
            isUpdate: false, // 是否可上传付款凭证
            isUpdated: false, // 付款凭证是否已上传
            isDefault: false, // 该付款流程是否已完成／默认状态
            newBank: [], // 新增银行账号
            payingBankInfo: {
                buyerDepositBank: null
            },
            paymentAmount: {},
            appalyPaymentTime: new Date().getTime(),
            commentDiog: {
                dialogVisibleRemark: false
            },
            commentParam: {
                targetType: 3,
                subSysType: 0,
                refFunc: {},
                refParam: {
                    targetId: this.$route.query.payId, // 付款单ID
                    targetType: 3
                }
            },
            fromFlg: null,
            doneFlg: null,
            paymemtDtos: null,
            permiseCreate: null, // 1:正常付款 2:多次付款
            paymentTblTitle: '已付款明细'
        };
    },
    created () {
    },
    mounted () {
        this.getdetailOrder();
        this.getdetail();
        if (this.$route.query.homeFromFlg == null || this.$route.query.homeFromFlg === undefined) {
            this.fromFlg = 0;
        } else {
            this.fromFlg = Number(this.$route.query.homeFromFlg);
        }
        // doneFlg == 1 表示是详情页
        this.doneFlg = Number(this.$route.query.doneFlg);
    },
    watch: {
        remarks (val) {
            if (val.length > 2500) {
                this.$message.error('审批备注最多可填写2500字');
                this.remarks = this.remarks.substr(0, 2500);
            }
        },
        payRemarks (val) {
            if (val.length > 2500) {
                this.$message.error('付款备注最多可填写2500字');
                this.payRemarks = this.payRemarks.substr(0, 2500);
            }
        },
        // 创建付款单时，付款金额随付款数量和暂定价而改变
        'applyQuantities' (newValue, oldValue) {
            if (newValue != null && newValue !== undefined && this.permiseCreate === 1) {
                if (this.isFormula && Number(this.paymentAmount.payMethodAmount) === 1) {
                    // 是公式计价-付货款的场景, 注意，这里减去的是保证金，不是所有已付金额
                    if (this.tempPrice) {
                        this.createPaymentForm.payTotal = this.$tools.toFixedFn(Number(newValue) * Number(this.tempPrice), 2);
                    }
                }
            }
        },
        'tempPrice' (newValue, oldValue) {
            if (newValue != null && newValue !== undefined && this.permiseCreate === 1) {
                if (this.isFormula && Number(this.paymentAmount.payMethodAmount) === 1) {
                    // 是公式计价-付货款的场景
                    if (this.applyQuantities) {
                        this.createPaymentForm.payTotal = this.$tools.toFixedFn(Number(this.applyQuantities) * Number(newValue), 2);
                    }
                }
            }
        }
    },
    methods: {
        itemBankChange (item, id, buyerDepositBank, index) {
            // console.log(id);
            if (id === 0) {
                this.$refs.bankAcc.addBank = true;
                this.indexPc = index;
                if (this.flag1 === 1) {
                    this.$refs.bankAcc.creatBank.companyId = this.list.sellerCompanyId; // 这里是收款公司ID
                    this.$refs.bankAcc.creatBank.accountName = this.list.sellerCompanyName;
                } else {
                    this.$refs.bankAcc.creatBank.companyId = this.list.targetCorpId; // 这里是收款公司ID
                    this.$refs.bankAcc.creatBank.accountName = this.list.targetCorpName;
                }
                return;
            }
            let obj = {};
            this.newBank.find((v) => {
                if (v.bankAccId === id) {
                    obj = v;
                }
            });
            item.buyerAccount = obj.bankAccount;
            item.buyerDepositBank = obj.depositBankName;
            item.buyerDepositBankId = obj.bankAccId;
        },
        // 上传付款凭证 单笔或多笔
        updateSubmit () {
            for (let i = 0; i < this.batchesList.length; i++) {
                if (!this.batchesList[i].payTime) {
                    this.$message({
                        message: '请选择出账日期',
                        type: 'error'
                    });
                    return false;
                }
                if (!this.batchesList[i].buyerDepositBankId) {
                    this.$message({
                        message: '请选择付款银行',
                        type: 'error'
                    });
                    return false;
                }
                if (!this.batchesList[i].fileUrl) {
                    this.$message({
                        message: '请上传付款凭证',
                        type: 'error'
                    });
                    return false;
                }
            }
            let params = {
                paymentId: this.sales.id,
                multiPayId: Number(this.$route.query.multiPayId),
                contEssId: this.$route.query.contEssId,
                purchaseOrderId: Number(this.$route.query.purchaseOrderId),
                todoId: this.$route.query.todoId,
                payInfoList: this.batchesList
            };
            this.$http.post(this.$api.payment.updateErpPaymentInfo, params).then((res) => {
                if (res.data.code === 0) {
                    this.$message.success('操作成功');
                    this.$router.go(-1);
                } else {
                    this.$message.error(res.data.code + ' ' + res.data.message);
                }
            });
        },
        // 收款时,下游付款凭证-回调
        onCallbackSaleFileUpload (fileList, item) {
            this.fileModelList = [];
            fileList.forEach((e) => {
                this.fileModelList.push(e.fileUrl);
            });
            item.fileUrl = this.fileModelList.join();
        },
        // 点击按钮确定要重新提交
        resetSub () {
            Object.keys(this.createPaymentForm).forEach((key) => {
                this.createPaymentForm[key] = this.sales[key];
            });
            this.createPaymentForm.contEssId = this.$route.query.contEssId;
            this.createPaymentForm.appalyPaymentTime = this.sales.createdDate;
            this.createPaymentForm.handlerUserName = this.sales.createUserName;
            this.createPaymentForm.sellerDepositBankId = this.sales.sellerBankId;
            console.log(this.createPaymentForm);
            this.newPaymentBankAssembly(this.list.sellerCompanyId);
            this.getpaymentApplicationAmount();
            this.flag1 = 1;
            this.flag = 1;
            this.isDefault = false;
            this.showPayDesc = false;
        },
        // 取消重新提交
        cancelResubmit () {
            this.flag1 = 0;
            this.flag = 2;
            this.isDefault = true;
            this.showPayDesc = true;
        },
        // 查询剩余应付金额
        getpaymentApplicationAmount (val) {
            this.$http.get(this.$api.payment.paymentApplicationAmount + '/' + this.list.purchaseOrderId).then((res) => {
                if (res.data.code === 0) {
                    this.paymentAmount = res.data.data;
                }
            });
        },
        // 分批付款新增条数
        addClick () {
            let addObj = {
                payAmount: null,
                description: null
            };
            this.createPaymentForm.payInfoList.push(addObj);
        },
        // 分批付款删除条数
        delectClick (index) {
            this.createPaymentForm.payInfoList.splice(index, 1);
            if (this.createPaymentForm.payInfoList.length === 0) {
                this.createPaymentForm.payDesc = null;
            }
        },
        // 查询付款银行--查询指定公司的银行账户
        newPaymentBankAssembly (val, data, type) {
            this.$http.post(this.$api.payment.newBank, {'companyId': val}).then((res) => {
                if (res.data.code === 0) {
                    this.newBank = res.data.data;
                    if (type === 'y') {
                        // console.log(data.bankName);
                        let obj = {};
                        this.newBank.find((item) => {
                            if (data.bankName === item.bankName) {
                                obj = item;
                            }
                        });
                        // console.log(obj);
                        this.batchesList[this.indexPc].buyerAccount = obj.bankAccount;
                        this.batchesList[this.indexPc].buyerDepositBank = obj.depositBankName;
                        this.batchesList[this.indexPc].buyerDepositBankId = obj.bankAccId;
                        this.batchesList[this.indexPc].bankAccId = obj.bankAccId;
                    }
                }
            });
        },
        // 切换付款银行
        changeBlank (selAccInfo) {
            if (selAccInfo === 0) {
                this.$refs.bankAcc.addBank = true;
                if (this.flag1 === 1) {
                    this.$refs.bankAcc.creatBank.companyId = this.list.sellerCompanyId; // 这里是收款公司ID
                    this.$refs.bankAcc.creatBank.accountName = this.list.sellerCompanyName;
                } else {
                    this.$refs.bankAcc.creatBank.companyId = this.list.targetCorpId; // 这里是收款公司ID
                    this.$refs.bankAcc.creatBank.accountName = this.list.targetCorpName;
                }
                return;
            }
            let newBankFil = this.newBank.filter((item) => { return item.bankAccId === selAccInfo; });
            if (this.flag1 === 1) {
                this.createPaymentForm.sellerAccount = newBankFil[0].bankAccount;
                this.createPaymentForm.sellerBankId = newBankFil[0].bankAccId;
                this.createPaymentForm.sellerDepositBank = newBankFil[0].depositBankName;
            } else {
                // 财务付款时不显示账户信息
                this.payingBankInfo.buyerDepositBankId = newBankFil[0].bankAccId;
                this.payingBankInfo.buyerDepositBank = newBankFil[0].depositBankName;
            }
        },
        // 新增银行-提交(这里要区分两种情况：审批驳回时重新提交和财务付款并上传付款凭证)
        popupPaySubmission (accInfo) {
            if (!accInfo) {
                this.createPaymentForm.sellerAccount = null;
                this.createPaymentForm.sellerBankId = null;
                this.createPaymentForm.sellerDepositBank = null;
                this.payingBankInfo.buyerDepositBank = null;
                return;
            }
            // this.newPaymentBankAssembly(this.list.sellerCompanyId);
            if (this.flag1 === 1) {
                this.createPaymentForm.sellerAccount = accInfo.companyAccount;
                this.createPaymentForm.sellerBankId = accInfo.id;
                this.createPaymentForm.sellerDepositBank = accInfo.depositBank;
                this.newPaymentBankAssembly(this.list.sellerCompanyId); // 查询上游公司
            } else {
                this.payingBankInfo.buyerDepositBankId = accInfo.id;
                this.payingBankInfo.buyerDepositBank = accInfo.depositBank;
                this.newPaymentBankAssembly(this.list.targetCorpId, accInfo, 'y'); // 查询我方公司
                // console.log(accInfo.bankName);
            }
        },
        // 付款详情
        getdetail () {
            let that = this;
            let query = {
                purchaseOrderId: this.$route.query.purchaseOrderId, // 采购订单ID
                paymentId: this.$route.query.payId, // 付款单ID
                multiPayId: this.$route.query.multiPayId
            };
            that.$http.post(that.$api.payment.getDetail, query).then((response) => {
                if (response.data.code === 0) {
                    // 去结果画面
                    if (response.data.data.list == null) {
                        this.$message.error('数据错误，缺少付款信息。');
                        return;
                    }
                    that.paymemtDtos = response.data.data;
                    that.sales = response.data.data.list[0];
                    console.log('that.sales', that.sales);
                    that.applyQuantities = that.sales.applyQuantities;
                    that.tempPrice = that.sales.tempPrice;
                    that.batchesList = that.paymemtDtos.todoPaylist;
                    if (that.batchesList) {
                        that.batchesList.forEach(item => {
                            item.payTime = new Date();
                        });
                    }
                    that.defalultPayDesc = that.sales.payDesc;
                    that.sales.payDescRet = that.sales.payDesc;
                    that.payRemarks = that.sales.remarks;
                    that.isUpdated = that.sales.approveStatus === 1 && that.sales.uploadFileStatus === 1; // 表示已经上传了凭证
                    if (that.sales.approveStatus === 2 && that.fromFlg === 4) {
                        // 可以重新提交
                        that.flag = 2;
                    }
                    if (that.sales.payStatus === 50) {
                        // 流程已完成
                        that.isDefault = true;
                    }
                    that.permiseCreate = 1;
                    if (that.sales.payDesc === 3 && that.sales.approveType === 1) {
                        that.permiseCreate = 2;
                    }
                    if (that.doneFlg === 1) {
                        that.paymemtDtos.multiPaylist = that.paymemtDtos.allPaylist;
                        that.batchesList = null;
                        that.paymentTblTitle = '分批付款明细';
                    }
                    that.getVoucherJurisdiction();
                    that.approve1History();

                    // 如果是结算退款，则交易双方要重新设置
                    // 包括公司抬头，收付款账号
                } else {
                    that.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 合同要素详情
        getdetailOrder () {
            this.$http.get(this.$api.order.orderDetail + '/' + this.$route.query.contEssId).then((response) => {
                if (response.data.code === 0) {
                    // 去结果画面
                    this.list = response.data.data;
                    if (this.list.upstreamInfo) {
                        if (Number(this.list.upstreamInfo.skuPriceType) === 21 || Number(this.list.upstreamInfo.skuPriceType) === 22) {
                            this.isFormula = true;
                        }
                        this.skuQuantity = this.list.upstreamInfo.skuQuantity;
                    }
                    this.approveJurisdiction();
                    this.newPaymentBankAssembly(this.list.targetCorpId);
                } else {
                    this.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 验证当前登录人员是否能上传付款凭证
        getVoucherJurisdiction () {
            let that = this;
            if (this.$tools.hasBizAuth('cashier_payment')) {
                if (that.sales.approveStatus === 1 && that.sales.uploadFileStatus === 0 && that.fromFlg === 1) {
                    that.isUpdate = true;
                }
            }
        },
        // 付款审批权限
        approveJurisdiction () {
            let params = {
                targetId: this.$route.query.payId,
                targetType: 3
            };
            this.$http.post(this.$api.apprProc.hasApproveAuth, params).then((response) => {
                if (response.data.code === 0) {
                    if (this.sales.approveStatus === 3) {
                        this.isPass = true;
                    } else {
                        this.isDefault = true;
                    }
                } else {
                    this.isPass = false;
                    this.isDefault = true;
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 审批
        approveSub (type) {
            let params = {
                todoId: this.$route.query.todoId,
                id: this.$route.query.payId, // 付款单ID
                contEssId: this.$route.query.contEssId,
                operaType: type, // 审批结果（1：同意 2：驳回）
                remarks: this.remarks// 审批备注
            };
            this.$http.post(this.$api.payment.buy, params).then((response) => {
                if (response.data.code === 0) {
                    this.$message.success('操作成功');
                    this.$router.go(-1);
                } else {
                    this.$message.error(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        // 付款审批记录
        approve1History () {
            let params = {
                targetId: this.sales.id, // 付款单ID
                targetType: 3
            };
            this.$refs.operationHis.display(this.$api.contract.approve1History, params);
        },
        // 上传付款凭证-回调
        onCallbackBuyFileUpload (fileList) {
            this.ContImg = [];
            fileList.forEach((e) => {
                this.ContImg.push(e.fileUrl);
            });
        },
        // 保存付款凭证
        submit () {
            if (this.ContImg.length === 0) {
                this.$message.error('请先上传付款凭证');
                return;
            }
            if (!this.payingBankInfo.buyerDepositBank) {
                this.$message.error('请先选择付款银行');
                return;
            }
            if (this.appalyPaymentTime === null) {
                this.$message.error('请选择申请日期');
                return;
            }
            let params = {
                todoId: this.$route.query.todoId,
                appalyPaymentTime: this.appalyPaymentTime, // 申请日期
                purchaseOrderId: this.$route.query.purchaseOrderId,
                contEssId: this.$route.query.contEssId,
                paymentId: this.$route.query.payId, // 付款ID
                paymentVoucher: '', // 付款凭证路径
                allowedFunctionsId: 36 // 审批ID
            };
            Object.keys(this.ContImg).forEach((e) => {
                params.paymentVoucher += this.ContImg[e] + ',';
            });
            params.paymentVoucher = params.paymentVoucher.substr(0, params.paymentVoucher.length - 1);
            params.contEssId = this.$route.query.contEssId;
            params.buyerAccount = this.payingBankInfo.buyerAccount;
            params.buyerDepositBankId = this.payingBankInfo.buyerDepositBankId;
            params.buyerDepositBank = this.payingBankInfo.buyerDepositBank;
            this.$http.post(this.$api.payment.voucher, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('保存成功');
                        this.$router.go(-1);
                    } else {
                        this.$message.error(res.data.code + ' ' + res.data.message);
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
        deleteImg (idx) {
            this.ContImg.splice(idx, 1);
        },
        showImg (list) {
            this.$refs.contFileView.open4MultiFile(list);
        },
        // 重新提交
        submitRet () {
            console.log(this.createPaymentForm);
            if (!this.createPaymentForm.appalyPaymentTime) {
                this.$message.error('请选择申请日期');
                return;
            }
            if (!this.createPaymentForm.planPayTime) {
                this.$message.error('请选择计划付款日期');
                return;
            }
            if (!this.createPaymentForm.sellerDepositBank) {
                this.$message.error('请输入收款开户行');
                return;
            }
            if (!this.createPaymentForm.payTotal) {
                this.$message.error('请输入申请金额');
                return;
            }
            if (!/^0\.\d+$|^[1-9]?\d+(\.\d+)?$/.test(this.createPaymentForm.payTotal)) {
                this.$message.error('请输入大于零申请金额');
                return;
            }
            if (this.createPaymentForm.payTotal === 0 || this.createPaymentForm.payTotal === '0') {
                this.$message({
                    message: '申请金额不能为0',
                    type: 'error'
                });
                return;
            }
            if (this.isFormula && Number(this.paymentAmount.payMethodAmount) === 1) {
                // 只有公式计价,且在付货款时才验证
                if (Number(this.paymentAmount.leftPayQuantities) <= 0) {
                    this.$message.error('申请付款数量已超出合同数量，不可再申请付款');
                    return;
                }
                if (!this.applyQuantities || this.applyQuantities <= 0) {
                    this.$message({
                        message: '申请付款数量不能为空且不能小于等于0',
                        type: 'error'
                    });
                    return;
                }
                if (!this.tempPrice || this.tempPrice <= 0) {
                    this.$message({
                        message: '暂定价不能为空且不能小于等于0',
                        type: 'error'
                    });
                    return;
                }
            }
            if (this.createPaymentForm.payMethod === 1) {
                let checkGoodsAmountPayment = null;
                // 合同金额 - 需要付款金额  + 保证金金额 + 申请货款金额
                checkGoodsAmountPayment = this.list.upstreamInfo.totalAmount - this.paymentAmount.leftAmount + this.createPaymentForm.payTotal * 1;
                if (checkGoodsAmountPayment >= this.list.upstreamInfo.totalAmount * 1.05) {
                    this.$message.error('抱歉，申请金额核算已超出合同金额的5%，无法提交申请');
                    return;
                }
            }
            if (this.createPaymentForm.payDesc === 3) {
                if (this.createPaymentForm.payInfoList.length < 2) {
                    this.$message.error('需要分批，至少分两批以上');
                    return;
                }
                let sumInfoList = 0;
                for (let i = 0; i < this.createPaymentForm.payInfoList.length; i++) {
                    let payAmounts = null;
                    payAmounts = Number(this.createPaymentForm.payInfoList[i].payAmount);
                    sumInfoList = sumInfoList + payAmounts;
                    if (!this.createPaymentForm.payInfoList[i].payAmount) {
                        this.$message.error('请填写付款金额');
                        return;
                    }
                }
                if (sumInfoList !== this.createPaymentForm.payTotal * 1) {
                    this.$message.error('分批金额总和，应该等于申请金额');
                    return;
                }
            }
            this.createPaymentForm.purchaseOrderId = this.$route.query.purchaseOrderId;
            this.createPaymentForm.orderType = 3; // 默认设为ERP订单
            this.$http.post(this.$api.order.newPayment, this.createPaymentForm).then((res) => {
                if (res.data.code === 0) {
                    this.$message.success(res.data.message);
                    this.flag = 1;
                    this.flag1 = 0;
                    this.rejectPayment();
                } else {
                    this.$message.error(res.data.code + ' ' + res.data.message);
                }
            });
        },
        // 更改付款单状态 从工作台提醒消息中移除
        rejectPayment () {
            this.$http.post(this.$api.payment.rejectPayment, {alarmingId: this.$route.query.todoId})
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$router.go(-1);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 评论
        comment () {
            if (this.$route.query.payId) {
                this.commentParam.refParam.targetId = Number(this.$route.query.payId);
            } else {
                this.commentParam.refParam.targetId = this.sales.id;
            }
            this.commentParam.targetId = this.commentParam.refParam.targetId;
            this.commentParam.refParam.targetType = 3;
            this.commentParam.refFunc = this.$refs.operationHis.display;
            this.commentDiog.dialogVisibleRemark = true;
        }
    },
    provide () {
        return {
            showImg: this.showImg
        };
    }
};
</script>

<style lang="scss" scoped>
  .my-payment {
    overflow: hidden;
    margin-top: 20px;
    .essential-row-float .essential-item .essential-title {
        flex: 0 0 118px;
    }
  }
  .my-table {
   .icon-photo:before, .icon-photo-null:before {
       width: 20px;
       height: 20px;
       font-size: 20px;
   }
  }
  .my-form-l {
      .icon-photo {
        vertical-align: text-top;
      }
  }
  .red {
      color: red !important;
  }
  .paybuy-fpfkmx {
      padding-left: 30px;
      padding-top: 20px;
      padding-right: 30px;
  }

  .essential-row-float .essential-item .essential-title {
    flex: 0 0 100px;
  }

  .isMust {
    left: -10px;
  }

  .mt-20 {
      margin-top: 20px;
  }
.gy-form-group .l{
    width: 145px;
    i{
        color: red;
        margin-left: -7px;
    }
}
.min-title-2 {
    padding-left: 30px;
    margin-top: 10px;
}
</style>
<style lang="scss">
.payment-elTable .el-table__row {
    .text-r .cell {
        text-align: right !important;
    }
}
  .paydetail-wrapper {
    .order-dialoged {
      .el-dialog__header {
        font-weight: bold;
        padding: 0;
      }
      .el-dialog__body {
        margin: 10px 0;
        padding: 10px 20px;
      }
      .order-apply {
        h3 {
          margin: 10px 0;
        }
      }
      .gy-form-group {
        padding: 10px 40px 10px 125px;
        span {
          i {
            color: $color-highlight;
          }
        }
      }
      .gy-form-group .l {
        width: 120px;
      }
    }
      .button-wrap {
          margin-top: 20px;
          text-align: right;
          position: relative;
          .gy-button-extra{
              position: absolute;
              right: 0px;
              top: 10px;
          }
      }
      .comment-button {
      }
      .input-date {
          .el-input__inner {
              font-size: 14px;
          }
      }
  }
</style>
