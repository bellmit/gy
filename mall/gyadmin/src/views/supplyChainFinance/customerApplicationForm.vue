<template>
  <div class="customer-application-form">
    <div class="gy-h4">供应链申请单</div>
    <div class="application-wrapper">
      <div class="application-item1">
        <div class="item-title">申请单号</div>
        <div class="item-text">{{supply.scsAppModel.code}}</div>
      </div>
      <div class="application-item2">
        <div class="item-title">申请时间</div>
        <div class="item-text">{{supply.scsAppModel.createdDate | date(1)}}</div>
      </div>
      <div class="application-item3">
        <div class="item-title">申请状态</div>
        <div class="item-text" :style="statusName">{{supply.scsAppModel.statusName}}</div>
      </div>
    </div>
    <!--基本信息-->
    <div class="application-content">
      <!--公司信息-->
      <div class="company-info">
        <div class="title-wrapper" @click="moduleItems.companyInfo = !moduleItems.companyInfo">
          <i class="iconfont icon-bangdingxindetixianzhanghao"></i><span
          class="gy-h5">公司信息<i
          class="el-icon-arrow-down"
          :class="{'el-rotate' : moduleItems.companyInfo}"
        ></i></span>
        </div>
        <transition name="slide-fade">
          <div class="application-info-content" v-show="moduleItems.companyInfo" style="border-bottom-width: 0;margin-bottom: -2px">
            <div class="gy-form-group">
              <span class="l">公司名称</span>
              {{supply.scsAppModel.companyName}}
            </div>
            <div class="gy-form-group">
              <span class="l">公司地址</span>
              {{supply.scsAppModel.companyAddress}}
            </div>
            <div class="gy-form-group">
              <span class="l">联系人</span>
              {{supply.scsAppModel.contactName}}
            </div>
            <div class="gy-form-group" style="color: #4a90e2;">
              <span class="l">联系电话</span>
              {{supply.scsAppModel.contactPhone}}
            </div>
          </div>
        </transition>
      </div>
      <!--申请详情-->
      <div class="application-info">
        <div class="title-wrapper" @click="moduleItems.applicationInfo = !moduleItems.applicationInfo">
          <i class="iconfont icon-icon_shenqing"></i><span
          class="gy-h5">申请详情<i
          class="el-icon-arrow-down"
          :class="{'el-rotate' : moduleItems.applicationInfo}"
        ></i></span>
        </div>
        <transition name="slide-fade">
          <div class="application-info-content" style="padding-bottom: 7px" v-show="moduleItems.applicationInfo">
            <div class="gy-form-group">
              <span class="l">服务类型</span>
              {{supply.scsAppModel.serviceTypeName || '--'}}
            </div>
            <div class="gy-form-group" v-if="supply.scsAppModel.serviceTypeId === 2">
              <span class="l">采购公司</span>
              {{supply.scsAppModel.thirdPartyName || '--'}}
            </div>
            <div class="gy-form-group" v-if="[1, 3].includes(supply.scsAppModel.serviceTypeId)">
              <span class="l">指定供应商</span>
              {{supply.scsAppModel.thirdPartyName || '无'}}
            </div>
            <div class="gy-form-group">
              <span class="l">商品名称</span>
              {{supply.scsAppModel.skuName || '--'}}
            </div>
            <div class="gy-form-group" v-if="[1, 3].includes(supply.scsAppModel.serviceTypeId)">
              <span class="l">服务周期</span>
              {{supply.scsAppModel.period || '--'}} 天
            </div>
            <div class="gy-form-group">
              <span class="l">数量</span>
              {{supply.scsAppModel.productAmount || '--'}} 吨
            </div>
            <div class="gy-form-group" v-if="[1, 3].includes(supply.scsAppModel.serviceTypeId)">
              <span class="l">市场预估价</span>{{supply.scsAppModel.productPriceMax}} 元/吨
            </div>
            <div class="gy-form-group" v-if="supply.scsAppModel.serviceTypeId === 2">
              <span class="l">货物估值</span>{{supply.scsAppModel.fundDemand}} 万元
            </div>
            <div class="gy-form-group" v-if="supply.scsAppModel.serviceTypeId === 2">
              <span class="l">服务周期</span>
              {{supply.scsAppModel.period || '--'}} 天
            </div>
            <div class="gy-form-group">
              <span class="l">交割库</span>
              {{supply.scsAppModel.deliveryWarehouseName || '--'}}
            </div>
            <div class="gy-form-group" v-if="[1, 3].includes(supply.scsAppModel.serviceTypeId)">
              <span class="l">货物需运输</span>
              {{needTransport[supply.scsAppModel.needTransport] || '--'}}
            </div>
            <div class="gy-form-group">
              <span class="l">有效日期</span>
              <span v-if="supply.scsAppModel.effectiveDate">{{supply.scsAppModel.effectiveDate | date}} 以前</span>
              <span v-else>--</span>
            </div>
            <div class="gy-form-group">
              <span class="l">申请备注</span>
              <div v-if="supply.scsAppModel.memo" style="border: 1px solid #f5f5f5;padding: 10px;word-break: break-word;">{{supply.scsAppModel.memo}}</div>
              <div v-else>--</div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <!--审核信息-->
    <div class="module-content">
      <!--平台审核信息-->
      <div class="platform-audit-info" v-if="supply.appPlatformModel">
        <div class="title-wrapper" @click="moduleItems.platformAuditInfo = !moduleItems.platformAuditInfo">
          <i class="iconfont icon-qianyue"></i><span
          class="gy-h5">平台审核信息<i
          class="el-icon-arrow-down"
          :class="{'el-rotate' : moduleItems.platformAuditInfo}"
        ></i></span><a v-if="supply.appPlatformModel.status === 100"
          href="javascript:void(0);" class="gy-link" @click.stop="distributeList">派单记录</a>
        </div>
        <transition name="slide-fade">
          <div v-show="moduleItems.platformAuditInfo">
            <div class="service-provider-audit-info-content">
              <div class="gy-form-group1">
                <span class="l">受理人</span>
                <div class="c" v-if="supply.appPlatformModel.assigneeUserName">{{supply.appPlatformModel.assigneeUserName || '--'}}</div>
                <div class="c" v-else>{{userName}}</div>
              </div>
              <div class="gy-form-group1">
                <span class="l">受理时间</span>
                <div class="c clock">
                  <div v-if="supply.appPlatformModel.acceptTime">{{supply.appPlatformModel.acceptTime | date(1)}}</div>
                  <div v-else><span class="alignment">{{ clock.applyDate + ' ' + clock.applyTime }}</span><img src="../../assets/images/clock.gif" alt=""></div></div>
              </div>
              <div class="gy-form-group1">
                <span class="l">申请公司评级</span>
                <div class="c">
                  <template v-if="supply.appPlatformModel.chinayieRatingRank && supply.appPlatformModel.chinayieRatingRank !== '-'">
                    <span class="color-height">{{supply.appPlatformModel.chinayieRatingRank || '--'}}</span>(最近更新:
                    {{supply.appPlatformModel.chinayieRatingDate | date}}) <router-link
                    class="gy-link" tag="a" target="_blank" :to="{name: 'gradeDetail', query: {commentId: $route.query.companyId}}">查看详情</router-link>
                  </template>
                  <template v-else>--</template>
                </div>
              </div>
              <div class="gy-form-group1" v-if="[1, 3].includes(supply.scsAppModel.serviceTypeId) && supply.scsAppModel.thirdPartyId">
                <span class="l">供应商评级</span>
                <div class="c">
                  <template v-if="supply.appPlatformModel.thirdPartyChinayieRatingRank && supply.appPlatformModel.thirdPartyChinayieRatingRank !== '-'">
                    <span class="color-height">{{supply.appPlatformModel.thirdPartyChinayieRatingRank || '--'}}</span>(最近更新:
                    {{supply.appPlatformModel.thirdPartyChinayieRatingDate | date}}) <router-link
                    class="gy-link" tag="a" target="_blank" :to="{name: 'gradeDetail', query: {commentId: supply.scsAppModel.thirdPartyId}}">查看详情</router-link>
                  </template>
                  <template v-else>--</template>
                </div>
              </div>
              <div class="gy-form-group1" v-if="supply.scsAppModel.serviceTypeId === 2">
                <span class="l">采购公司评级</span>
                <div class="c">
                  <template v-if="supply.appPlatformModel.thirdPartyChinayieRatingRank && supply.appPlatformModel.thirdPartyChinayieRatingRank !== '-'">
                    <span class="color-height">{{supply.appPlatformModel.thirdPartyChinayieRatingRank || '--'}}</span>(最近更新:
                    {{supply.appPlatformModel.thirdPartyChinayieRatingDate | date}}) <router-link
                    class="gy-link" tag="a" target="_blank" :to="{name: 'gradeDetail', query: {commentId: supply.scsAppModel.thirdPartyId}}">查看详情</router-link>
                  </template>
                  <template v-else>--</template>
                </div>
              </div>
              <div class="gy-form-group1" v-if="(supply.appPlatformModel.status === 100 || supply.appPlatformModel.status === 101) && supply.scsAppModel.status !== 22">
                <span class="l">平台审核意见</span>
                <div class="c" v-if="supply.appPlatformModel.remark"><div style="border: 1px solid #f5f5f5;padding: 10px;word-break: break-word;">{{supply.appPlatformModel.remark}}</div></div>
                <span class="c" v-else>--</span>
              </div>
              <div class="gy-form-group1" v-if="supply.scsAppModel.status === 10 || supply.scsAppModel.status === 22" :class="{'pr0' : ([1, 3].includes(supply.scsAppModel.serviceTypeId) && !supply.scsAppModel.thirdPartyId)}" style="overflow-x: visible;">
                <span class="l"><strong style="left: -10px">*</strong>平台审核意见</span>
                <div class="c"><textarea class="gy-textarea" v-model="platformRemark"></textarea></div>
              </div>
            </div>
            <div class="gy-btn-group" style="padding-right: 64px" v-if="supply.scsAppModel.status === 10 || supply.scsAppModel.status === 22">
                <button type="button" class="gy-button-extra" @click="serviceProviderList">派单</button><button
                  type="button" class="gy-button-normal" @click="rejectApply">拒绝申请
                </button>
            </div>
          </div>
        </transition>
      </div>
      <!--服务商审核信息-->
      <div class="service-provider-audit-info" v-if="supply.appProviderModel">
        <div class="title-wrapper"
             @click="moduleItems.serviceProviderAuditInfo = !moduleItems.serviceProviderAuditInfo">
          <i class="iconfont icon-service-provider"></i><span
          class="gy-h5">服务商审核信息<i
          class="el-icon-arrow-down"
          :class="{'el-rotate' : moduleItems.serviceProviderAuditInfo}"
        ></i></span>
        </div>
        <transition name="slide-fade">
          <div v-show="moduleItems.serviceProviderAuditInfo">
            <div class="service-provider-audit-info-content">
              <div class="gy-form-group">
                <span class="l">服务商</span>
                {{supply.appProviderModel.providerCompanyName || '--'}}
              </div>
              <div class="gy-form-group">
                <span class="l">审批状态</span>
                <span v-if="supply.appProviderModel.status === 210 ">服务商审核</span>
                <span v-else-if="supply.appProviderModel.status === 220 ">{{supply.appProviderModel.initiatorUserId ? '服务方案审批未通过' : '申请驳回'}}</span>
                <span v-else-if="[300,400,990].includes(supply.appProviderModel.status)">服务方案审批通过</span>
                <span v-else>--</span>
              </div>
              <div class="gy-form-group">
                <span class="l">受理人</span>
                <span v-if="supply.appProviderModel.assigneeUserName">{{supply.appProviderModel.assigneeUserName}}</span>
                <span v-else>--</span>
              </div>
              <div class="gy-form-group">
                <span class="l">受理时间</span>
                  <div v-if="supply.appProviderModel.acceptTime">{{supply.appProviderModel.acceptTime | date(1)}}</div>
                  <div v-else>--</div>
                  <!--<div v-else class="clock"><span class="alignment">{{ clock.applyDate + ' ' + clock.applyTime }}</span><img src="../../assets/images/clock.gif" alt=""></div>-->
              </div>
              <div class="gy-form-group">
                <span class="l">申请公司评级</span>
                <template v-if="supply.appProviderModel.sinoyieRatingRank && supply.appProviderModel.sinoyieRatingRank !== '-'">
                  <span class="color-height">{{supply.appProviderModel.sinoyieRatingRank || '--'}}</span>(最近更新: {{supply.appProviderModel.sinoyieRatingDate | date}})
                </template>
                <template v-else>--</template>
              </div>
              <div class="gy-form-group">
                <span class="l" v-if="[1, 3].includes(supply.scsAppModel.serviceTypeId)">供应商评级</span>
                <span class="l" v-if="supply.scsAppModel.serviceTypeId === 2">采购公司评级</span>
                <template v-if="supply.appProviderModel.thirdPartySinoyieRatingRank && supply.appProviderModel.thirdPartySinoyieRatingRank !== '-'">
                  <span class="color-height">{{supply.appProviderModel.thirdPartySinoyieRatingRank || '--'}}</span>(最近更新: {{supply.appProviderModel.thirdPartySinoyieRatingDate | date}})
                </template>
                <template v-else>--</template>
              </div>
              <div class="gy-form-group" v-if="[201, 210, 220, 300, 400, 990].includes(supply.appProviderModel.status)">
                <span class="l">受理备注</span>
                <div v-if="supply.appProviderModel.acceptRemark" style="border: 1px solid #f5f5f5;padding: 10px;word-break: break-word;">{{supply.appProviderModel.acceptRemark}}</div>
                <div v-else>--</div>
              </div>
              <div class="gy-form-group" v-if="supply.appProviderModel.status === 220">
                <span class="l">驳回原因</span>
                {{supply.appProviderModel.rejectCause || '--'}}
              </div>
              <template v-if="supply.appProviderModel.status && supply.appProviderModel.status >= 210  && supply.appProviderModel.status !== 220">
                  <dc-facilitatorReviewInfo v-if="[1, 3].includes(supply.scsAppModel.serviceTypeId)" :supply=supply></dc-facilitatorReviewInfo>
                  <hy-facilitatorReviewInfo v-if="supply.scsAppModel.serviceTypeId === 2" :supply=supply></hy-facilitatorReviewInfo>
              </template>
            </div>
          </div>
        </transition>
      </div>
      <!--单证执行信息-->
      <div class="document-execution-info" v-if="supply.purchaseOrderModel || supply.sellOrderModel">
        <div class="title-wrapper"
             @click="moduleItems.documentExecutionInfo = !moduleItems.documentExecutionInfo">
          <i class="iconfont icon-icon-fapiao"></i><span
          class="gy-h5">服务执行<i
          class="el-icon-arrow-down"
          :class="{'el-rotate' : moduleItems.documentExecutionInfo}"
        ></i></span>
        </div>
        <div class="document-execution-info-content" v-show="moduleItems.documentExecutionInfo">
          <div class="order-type">销售订单</div>
          <div style="margin-bottom: 15px" v-if="supply.sellOrderModel">
            <table class="gy-table">
              <thead>
              <tr>
                <td style="width: 230px">商品</td>
                <td style="width: 270px">买方公司</td>
                <td style="width: 117px">总金额(元)</td>
                <td style="width: 100px">交付方式</td>
                <td style="width: 120px">状态</td>
                <td style="width: 110px">操作</td>
              </tr>
              </thead>
              <tbody>
              <tr class="order-num">
                <td colspan="6"><span style="color: #999">单号: </span>{{supply.sellOrderModel.odrOrderSn}}
                  <div class="fr" style="color: #999">{{supply.sellOrderModel.createdDate | date(1)}}</div>
                </td>
              </tr>
              <tr>
                <td style="vertical-align: middle">
                  <div class="commodity">
                    <div class="commodity-img"><img
                      v-if="supply.sellOrderModel.orderItemList[0].skuPictureUrl"
                      :src=supply.sellOrderModel.orderItemList[0].skuPictureUrl alt=""><div
                      v-else style="width: 56px;height: 56px;border: 1px solid #f5f5f5"></div>
                    </div>
                    <div class="commodity-content">
                      <div>{{supply.sellOrderModel.orderItemList[0].skuName}}<br>{{supply.sellOrderModel.orderItemList[0].intCurrencyMark}}
                        {{supply.sellOrderModel.orderItemList[0].skuPrice|numToCash}} 元/{{supply.sellOrderModel.orderItemList[0].infUnitOfMeasureDisplayName}}
                        <br>{{supply.sellOrderModel.orderItemList[0].skuQuantity
                        | numToCash(3)}} {{supply.sellOrderModel.orderItemList[0].infUnitOfMeasureDisplayName}}</div>
                    </div>
                  </div>
                </td>
                <td>{{supply.sellOrderModel.buyerCompanyName}}</td>
                <td class="align-r">{{supply.sellOrderModel.intCurrencyMark}}{{supply.sellOrderModel.orderItemList[0].skuTotalAmount|numToCash}}</td>
                <td>{{supply.sellOrderModel.deliveryType === 1 ? '买家自提' : supply.sellOrderModel.deliveryType === 2? '卖家送货':'全部支持'}}</td>
                <td>
                  <span v-if="supply.sellOrderModel.orderStatus===1">签约</span>
                  <span v-else-if="supply.sellOrderModel.orderStatus===2">收款与交割</span>
                  <span v-else-if="supply.sellOrderModel.orderStatus===3">结算与复核</span>
                  <span v-else-if="supply.sellOrderModel.orderStatus===4">已完成</span>
                  <span v-else-if="supply.sellOrderModel.orderStatus===5">已失效</span>
                </td>
                <td class="align-c">
                  <a style="margin-bottom:5px;" href="javascript:void(0);" target="_blank" @click="goPage(supply.sellOrderModel.id)" class="gy-button-view">查看</a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="order-type">采购订单</div>
          <div style="margin-bottom: 10px" v-if="supply.purchaseOrderModel">
            <table class="gy-table">
              <thead>
              <tr>
                <td style="width: 230px">商品</td>
                <td style="width: 270px">卖方公司</td>
                <td style="width: 117px">总金额(元)</td>
                <td style="width: 100px">交付方式</td>
                <td style="width: 120px">状态</td>
                <td style="width: 110px">操作</td>
              </tr>
              </thead>
              <tbody>
              <tr class="order-num">
                <td colspan="6"> <span style="color: #999">单号:  </span>{{supply.purchaseOrderModel.odrOrderSn}} <span
                  class="fr" style="color: #999">{{supply.purchaseOrderModel.createdDate| date(1)}}</span></td>
              </tr>
              <tr>
                <td>
                  <div class="commodity">
                    <div class="commodity-img"><img
                      v-if="supply.purchaseOrderModel.orderItemList[0].skuPictureUrl"
                      :src=supply.purchaseOrderModel.orderItemList[0].skuPictureUrl alt=""><div
                      v-else style="width: 56px;height: 56px;border: 1px solid #f5f5f5"></div>
                    </div>
                    <div class="commodity-content">{{supply.purchaseOrderModel.orderItemList[0].skuName}}<br>{{supply.purchaseOrderModel.orderItemList[0].intCurrencyMark}}
                      {{supply.purchaseOrderModel.orderItemList[0].skuPrice |numToCash}} 元/{{supply.purchaseOrderModel.orderItemList[0].infUnitOfMeasureDisplayName}}<br>
                      {{supply.purchaseOrderModel.orderItemList[0].skuQuantity |numToCash(3)}} {{supply.purchaseOrderModel.orderItemList[0].infUnitOfMeasureDisplayName}}
                    </div>
                  </div>
                </td>
                <td>{{supply.purchaseOrderModel.sellerCompanyName}}</td>
                <td class="align-r">{{supply.purchaseOrderModel.intCurrencyMark}}
                  {{supply.purchaseOrderModel.orderItemList[0].skuTotalAmount|numToCash}}</td>
                <td>{{supply.purchaseOrderModel.deliveryType === 1 ? '买家自提' :
                  supply.purchaseOrderModel.deliveryType === 2? '卖家送货':'全部支持'}}</td>
                <td>
                  <span v-if="supply.purchaseOrderModel.orderStatus===1">签约</span>
                  <span v-else-if="supply.purchaseOrderModel.orderStatus===2">收款与交割</span>
                  <span v-else-if="supply.purchaseOrderModel.orderStatus===3">结算与复核</span>
                  <span v-else-if="supply.purchaseOrderModel.orderStatus===4">已完成</span>
                  <span v-else-if="supply.purchaseOrderModel.orderStatus===5">已失效</span>
                </td>
                <td class="align-c">
                  <a style="margin-bottom:5px;" href="javascript:void(0);" target="_blank" @click="goPage(supply.purchaseOrderModel.id)" class="gy-button-view">查看</a>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--违约和处置-->
      <div class="breach-contract-disposal" v-if="supply.appDisposalModel">
        <div class="title-wrapper"
             @click="moduleItems.breachContractDisposal = !moduleItems.breachContractDisposal">
          <i class="iconfont icon-icon_shenqingxinxi"></i><span
          class="gy-h5">违约和处置<i
          class="el-icon-arrow-down"
          :class="{'el-rotate' : moduleItems.breachContractDisposal}"
        ></i></span><a v-if="[4003, 4004, 4005, 4006].includes(supply.appDisposalModel.status)"
          href="javascript:void(0);" class="gy-link" @click.stop="serviceProviderHistory('处置')">处置申请审批详情</a>
        </div>
        <transition name="slide-fade">
          <div v-show="moduleItems.breachContractDisposal" style="margin-left: -3px">
            <div class="title-wrapper" style="padding-left: 20px"><span class="gy-h5">违约详情</span></div>
            <div class="breach-contract-disposal-content">
              <div class="gy-form-group">
                <span class="l">违约录入人</span>
                {{supply.appDisposalModel.recordUserName || '--'}}
              </div>
              <div class="gy-form-group">
                <span class="l">违约录入时间</span>
                {{supply.appDisposalModel.recordTime | date(1)}}
              </div>
              <div class="gy-form-group">
                <span class="l">违约原因</span>
                {{supply.appDisposalModel.casue || '--'}}
              </div>
            </div>
            <template v-if="[4003, 4004, 4005, 4006].includes(supply.appDisposalModel.status)">
              <div class="title-wrapper" style="padding-left: 20px"><span class="gy-h5">处置详情</span></div>
              <div class="breach-contract-disposal-content">
                <div class="gy-form-group">
                  <span class="l">处置申请时间</span>
                  {{supply.appDisposalModel.applyTime | date(1)}}
                </div>
                <div class="gy-form-group">
                  <span class="l">处置申请人</span>
                  {{supply.appDisposalModel.applyUserName || '--'}}
                </div>
                <div class="gy-form-group">
                  <span class="l">处置方案说明</span>
                  <div v-if="supply.appDisposalModel.remark" style="border: 1px solid #f5f5f5;padding: 10px;word-break: break-word;">{{supply.appDisposalModel.remark}}</div>
                  <div v-else></div>
                </div>
                <div class="gy-form-group">
                  <span class="l">处置方案附件</span>
                  <a :href="item.filePath" class="gy-link" style="display: block" target="_blank" v-for="(item, index) in supply.appDisposalModel.applicationDisposalFileList" :key="index">{{item.fileName}}</a>
                </div>
                <div class="gy-form-group" style="clear: both">
                  <span class="l">审批结果</span>
                  {{supply.appDisposalModel.result || '--'}}
                </div>
                <div class="gy-form-group">
                  <span class="l">处置结果说明</span>
                  <div v-if="supply.appDisposalModel.resultDescription" style="border: 1px solid #f5f5f5;padding: 10px;word-break: break-word;">{{supply.appDisposalModel.resultDescription}}</div>
                  <div v-else></div>
                </div>
              </div>
            </template>
          </div>
        </transition>
      </div>
    </div>
    <el-dialog title="派单记录" :close-on-click-modal="false" :visible.sync="platformAuditHistory">
      <div class="platformAudit-wrapper">
        <div class="platformAudit-item" v-for="item in platformAuditList" :key="item.time">
          <div class="step-icon"><div><div></div></div></div>
          <div class="time">{{item.createdDate | date(1)}}</div>
          <div class="text">{{actionType[item.actionId]}} <strong v-if="item.actionId * 1 !== 14">{{item.userName}}</strong>
            {{item.actionName}} <strong>{{item.targetName}}</strong><div style="padding-top: 3px" v-if="item.actionId * 1 === 5">原因: {{item.remark}}</div></div>
        </div>
      </div>
    </el-dialog>
    <el-dialog v-if="projectApprovalRecords" :close-on-click-modal="false" class="spqk" title="审批情况" :visible.sync="projectApprovalRecords">
      <div>
        <table class="gy-table">
          <thead>
          <tr>
            <td style="width: 80px;max-width: 80px;">序号</td>
            <td style="width: 120px;max-width: 120px;">审批人</td>
            <td style="width: 80px;max-width: 80px;">状态</td>
            <td style="width: 300px;max-width: 300px;">备注</td>
            <td style="width: 170px;max-width: 170px;">时间</td>
          </tr>
          </thead>
          <tbody>
          <tr v-if="projectApprovalRecordsList && projectApprovalRecordsList.length === 0">
            <td colspan="5" class="align-c">暂无数据</td>
          </tr>
          <tr v-else v-for="(item, index) of projectApprovalRecordsList" :key="index">
            <td>{{index * 1 + 1}}</td>
            <td>{{item.username}}</td>
            <td>{{resultCode[item.resultCode]}}</td>
            <td>
              <el-tooltip placement="top" :disabled="(item.msg && item.msg.replace(/[^x00-xff]/g, 'aa').length > 40)? disabled : !disabled" effect="light">
                <div class="tootip" slot="content">{{item.msg}}</div>
                <div style="width: 100%;max-width: 280px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis">{{item.msg || '--'}}</div>
              </el-tooltip>
            </td>
            <td>{{item.createdDate | date(1)}}</td>
          </tr>
          </tbody>
        </table>
        <div class="gy-btn-group">
          <button type="button" class="gy-button-extra" @click="projectApprovalRecords = false">确定</button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="派单" :close-on-click-modal="false" :visible.sync="distributeLeaflets">
      <div>
        <div style="line-height: 1;padding-bottom: 12px;">请选择合适的公司进行供应链服务:</div>
        <div>
          <table class="gy-table">
            <thead>
            <tr>
              <td>选择</td>
              <td>服务商名称</td>
              <td>历史服务总单数(单)</td>
              <td>历史服务总金额(万元)</td>
            </tr>
            </thead>
            <tbody>
            <tr v-if="distributeLeafletsList && distributeLeafletsList.length === 0">
              <td colspan="5" class="align-c">暂无数据</td>
            </tr>
            <tr v-else v-for="(item, index) in distributeLeafletsList" :key="index">
              <td class="align-c"><el-radio v-model="item.isCheck" @change="chkDistributeLeaflets(item.companyId)"></el-radio></td>
              <td>{{item.name}}</td>
              <td class="align-r">{{item.totalNumber}}</td>
              <td class="align-r">{{item.totalAmountStr}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="gy-btn-group">
          <button type="button" class="gy-button-extra" @click="reject('accept')">确定</button><button
          type="button" class="gy-button-normal" @click="distributeLeaflets = false">取消</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import hyFacilitatorReviewInfo from './hy-facilitatorReviewInfo';
import dcFacilitatorReviewInfo from './dc-facilitatorReviewInfo';
export default {
    components: {hyFacilitatorReviewInfo, dcFacilitatorReviewInfo},
    name: 'customerApplicationForm',
    provide () {
        return {
            serviceProviderHistory: this.serviceProviderHistory
        };
    },
    data () {
        return {
            supply: {
                // 基本信息部分
                scsAppModel: {
                    assigneeUserName: null, // 受理人
                    code: null, // 单号
                    companyAddress: null, // 客户地址
                    companyId: null, // 客户公司Id
                    companyName: null, // 客户公司名称
                    contactName: null, // 联系人名称
                    contactPhone: null, // 联系方式
                    createdBy: null, // integer($int64)
                    createdDate: null, // string($date-time)
                    deliveryWarehouseId: null, // 交割库id
                    deliveryWarehouseName: null, // 交割库名称
                    disposed: null, // 0: 未经过处置 1 经过处置  是否处置过
                    effectiveDate: null, // 有效日期
                    endTime: null, // 高级搜索结束时间
                    id: null, // integer($int64)
                    keywords: null, // string
                    memo: null, // 备注
                    needTransport: null, //  0: 不需要 1 需要  是否需要运输
                    num: null, // 标签页数量
                    period: null, // (资金)周期
                    prdSkuId: null, // 产品ID
                    productAmount: null, // 商品数量
                    productId: null, // 商品Id
                    productName: null, // 商品名称
                    productPriceMax: null, // 商品高价格
                    productPriceMin: null, // 商品低价格
                    providerCompanyId: null, // 服务商公司Id(此字段为冗余)
                    providerCompanyName: null, // 服务商公司名称(此字段为冗余)
                    serviceTypeId: null, // 服务类型Id
                    serviceTypeName: null, // 服务类型名称
                    shortOverflowRate: null, // 溢短装
                    skuCode: null, // 商品编号
                    skuName: null, // 商品名称
                    skuPictureUrl: null, // 商品图片url
                    startTime: null, // 高级搜索开始时间
                    status: null, //  10 平台审核 20 服务商审核 21 立项中 22 申请驳回 30 单证执行 40 违约和处理 98 已拒绝 99 已完成 状态
                    statusName: null, // 状态名称
                    thirdPartyFlag: null, // 0无 1有  第三方标志
                    thirdPartyId: null, // 第三方公司Id
                    thirdPartyName: null, // 第三方公司名称
                    topCatalogueId: null, // 产品顶级分类id
                    unit: null, //  d 天 m 月 单位
                    updatedBy: null, // integer($int64)
                    updatedDate: null, // string($date-time)
                    valid: null // integer($int32)
                },
                // 平台审核
                appPlatformModel: null,
                //   {
                //     acceptTime: null, // 受理时间
                //     applicationId: null, // 申请单ID
                //     assigneeUserId: null, // 受理人id
                //     assigneeUserName: null, // 受理人名称
                //     chinayieRatingDate: null, // 国烨评级时间
                //     chinayieRatingRank: null, // 国烨评级结果
                //     createdBy: null, // integer($int64)
                //     createdDate: null, // string($date-time)
                //     id: null, // integer($int64)
                //     keywords: null, // string
                //     remark: null, // 备注
                //     status: null, // 100 已转交服务商 101 已拒绝 状态
                //     updatedBy: null, // integer($int64)
                //     updatedDate: null, // string($date-time)
                //     valid: null, // integer($int32)
                //     version: null // 乐观锁版本，防止并发
                // },
                // 服务商审核
                appProviderModel: null,
                //   {
                //     acceptRemark: null, // 受理备注
                //     acceptTime: null, // 受理时间
                //     applicationId: null, // 申请单ID
                //     assigneeUserId: null, // 受理人
                //     assigneeUserName: null, // 受理人名称
                //     createdBy: null, // integer($int64)
                //     createdDate: null, // string($date-time)
                //     id: null, // integer($int64)
                //     initiateTime: null, // 立项申请发起时间
                //     initiatorUserId: null, // 立项申请发起人ID
                //     initiatorUserName: null, // 立项申请发起人名称
                //     keywords: null,
                //     providerCompanyId: null, // 服务方公司Id
                //     providerCompanyName: null, // 服务方公司名称
                //     providerFileList: [], // 立项文件
                //     providerId: null, //  服务商ID
                //     rejectCause: null, // 拒绝原因
                //     remark: null, // 立项备注
                //     sinoyieAccessDate: null, // 中烨准入时间
                //     sinoyieAccessLimit: null, // 中烨准入额度
                //     sinoyieRatingDate: null, // 中烨评级时间
                //     sinoyieRatingRank: null, // 中烨评级结果
                //     status: null, // 200 待受理 201 已受理 210 立项审批中 220 申请驳回 300 单证执行中 400 违约处置 990 完成  状态
                //     updatedBy: null, // integer($int64)
                //     updatedDate: null, // string($date-time)
                //     valid: null,
                //     version: null// 乐观锁版本号，防止并发
                // },
                // 违约和处置
                appDisposalModel: null,
                //   {
                //     applicationDisposalFileList: [], // 处置附件
                //     applicationId: null, // 申请单ID
                //     applyTime: null, // 处置申请发起时间
                //     applyUserId: null, // 处置申请发起人
                //     applyUserName: null, // 处置申请发起人名称
                //     casue: null, // 违约原因
                //     companyId: null, // 公司ID
                //     createdBy: null, // integer($int64)
                //     createdDate: null, // string($date-time)
                //     id: null, // integer($int64)
                //     keywords: null, // string
                //     recordTime: null, // 违约记录时间
                //     recordUserId: null, // 违约记录人
                //     recordUserName: null, // 违约记录人名称
                //     remark: null, // 处置申请备注
                //     result: null, // 处置结果
                //     resultDescription: null, // 处置结果说明
                //     status: null, //  4001 违约无需处置 4002 违约需处置 4003 处置申请中 4004 处置申请拒绝 4005 处置中 4006 处置完成  状态
                //     updatedBy: null, // integer($int64)
                //     updatedDate: null, // string($date-time)
                //     valid: null // integer($int32)
                // },
                'createdBy': 0,
                'createdDate': '2019-07-18T05:07:44.047Z',
                'id': 0,
                'keywords': 'string',
                // 订单
                purchaseOrderModel: null,
                // 订单
                sellOrderModel: null,
                'updatedBy': 0,
                'updatedDate': '2019-07-18T05:07:44.048Z',
                'valid': 0
            },
            needTransport: ['不需要', '需要'],
            moduleItems: {
                companyInfo: true,
                applicationInfo: true,
                platformAuditInfo: true,
                serviceProviderAuditInfo: true,
                applicationInfoFunds: true,
                documentExecutionInfo: true,
                breachContractDisposal: true
            },
            platformAuditHistory: false,
            actionType: {
                2: '运营人员',
                4: '服务商员工',
                5: '服务商员工',
                14: ''
            },
            platformAuditList: [
                // {
                //     'id': 58, // 主键id
                //     'createdBy': 74, // 创建人id
                //     'updatedBy': null, // 更新人id
                //     'createdDate': '2019-07-17T05:59:36.000+0000', // 创建时间
                //     'updatedDate': null, // 更新时间
                //     'valid': null, //
                //     'keywords': null, //
                //     'applicationId': 1, // 申请单id
                //     'userId': 74, // 操作人id
                //     'userName': '易车贸易', // 操作人名称
                //     'companyId': 10, // 服务商公司id
                //     'companyName': '测试服务商公司名称', // 服务商公司名称
                //     'actionId': 2,
                //     'remark': '我派单', // 备注
                //     'targetId': 1, // 目标id
                //     'targetName': '中冶', // 目标名称,
                //     'targetType': 1,
                //     'actionName': '派发'// 动作
                // }
            ],
            projectApprovalRecords: false,
            projectApprovalRecordsList: [],
            earlyWarning: false,
            resultCode: ['未审批', '审批通过', '审批驳回', '已创建'],
            distributeLeaflets: false,
            // 服务商列表
            distributeLeafletsList: [
                // {
                //     'id': 1, // 服务商id
                //     'createdBy': null,
                //     'updatedBy': null,
                //     'createdDate': '2019-07-17T02:31:53.000+0000',
                //     'updatedDate': null,
                //     'valid': 1,
                //     'keywords': null,
                //     'name': '上海石化商业贸易有限公司', // 服务商名称
                //     'companyId': 196, // 服务商公司id
                //     'amountLimit': null, // 可贷款金额上限
                //     'rateMin': null, // 利率下限
                //     'rateMax': null, // 利率上线
                //     'totalNumber': 0, // 总交易笔数
                //     'totalAmount': 0.0 // 总交易金额数
                // }
            ],
            statusName: 'color: #999',
            clock: {
                applyDate: '',
                applyTime: ''
            },
            timer: null,
            platformRemark: null,
            userName: null,
            disabled: false
        };
    },
    created () {
        this.init();
    },
    mounted () {
        this.timer = setInterval(() => {
            this.setTime();
        }, 1000);
        this.userName = JSON.parse(localStorage.getItem('userInfo')).username;
    },
    beforeDestroy () {
        clearInterval(this.timer);
    },
    methods: {
        zeroPadding (num, digit) {
            let zero = '';
            for (let i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        setTime () {
            let cd = new Date();
            this.clock.applyTime = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
            this.clock.applyDate = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2);
        },
        init () {
            this.getInfo();
        },
        // 获取申请单信息
        getInfo () {
            this.$http.get(this.$api.supply.getDetail + this.$route.query.id)
                .then((res) => {
                    if (res.data.code === 0) {
                        switch (res.data.data.scsAppModel.statusName) {
                        case '平台审核':case '服务商审核':case '方案审批中':
                            this.statusName = 'color: #F49A1E';
                            break;
                        case '已拒绝':case '违约和处置':
                            this.statusName = 'color: #D12626';
                            break;
                        case '服务执行':case '已完成':
                            this.statusName = 'color: #24C815';
                            break;
                        default:
                            this.statusName = 'color: #999';
                            break;
                        }
                        this.supply = Object.assign({}, res.data.data);
                        return;
                    }
                    this.$message.error(res.data.message);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 平台审核拒绝/通过 初次派单 post 再次派单put 初次/再次拒绝 post
        reject (status) {
            const user = JSON.parse(localStorage.getItem('userInfo'));
            if (!this.platformRemark) {
                this.$message.error('请先填写备注');
                return;
            }
            if (this.platformRemark && this.platformRemark.length > 300) {
                this.$message.error('备注最多只能填300字!');
                return;
            }
            let params = {
                'acceptTime': new Date(), // 受理时间
                'applicationId': this.$route.query.id, // 申请单id
                'assigneeUserId': user.id, // 受理人id
                'assigneeUserName': user.username, // 受理人名称
                'createdBy': user.id, // 创建人id
                // 'createdDate': this.supply.appPlatformModel.createdDate, //
                'remark': this.platformRemark, // 拒绝理由
                'status': 101 // 审核状态：已审核：100，已拒绝：101
            };
            if (status === 'accept') {
                const arr = this.distributeLeafletsList.filter((item) => item.isCheck !== false);
                if (arr.length === 0) {
                    this.$message.error('请先选择服务商');
                    return;
                }
                params = {
                    ...params,
                    providerCompanyId: arr[0].companyId,
                    providerCompanyName: arr[0].name,
                    status: 100
                };
                if (this.supply.scsAppModel.status === 22) {
                    params = {
                        ...params,
                        providerCompanyId: arr[0].companyId,
                        providerCompanyName: arr[0].name,
                        status: 100,
                        updatedBy: user.id, // 更新人id
                        updatedDate: new Date()// 更新时间
                    };
                }
            }
            this.$http[this.supply.scsAppModel.status === 22 && status === 'accept' ? 'put' : 'post'](this.$api.supply.reject, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('操作成功');
                        this.init();
                        this.distributeLeaflets = false;
                        return;
                    }
                    this.$message.error(res.data.message);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 拒绝弹窗
        rejectApply () {
            if (!this.platformRemark) {
                this.$message.error('请先填写备注');
                return;
            }
            if (this.platformRemark && this.platformRemark.length > 300) {
                this.$message.error('备注最多只能填300字!');
                return;
            }
            this.$confirm('<span><i class="iconfont icon-message-warning"></i>请确认是否拒绝该供应链申请?</span>', '拒绝申请', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                this.reject();
            }).catch(() => {
            });
        },
        // 派单记录
        distributeList () {
            this.$http.get(this.$api.supply.distributeList + this.$route.query.id)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.platformAuditList = res.data.data;
                        this.platformAuditHistory = true;
                        return;
                    }
                    this.$message.error(res.data.message);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 获取服务商列表
        serviceProviderList () {
            if (!this.platformRemark) {
                this.$message.error('请先填写备注');
                return;
            }
            if (this.platformRemark && this.platformRemark.length > 300) {
                this.$message.error('备注最多只能填300字!');
                return;
            }
            this.$http.get(this.$api.supply.serviceProviderList + '')
                .then((res) => {
                    if (res.data.code === 0) {
                        this.distributeLeafletsList = Array.from(res.data.data, (item) => {
                            return {
                                ...item,
                                isCheck: false
                            };
                        });
                        this.distributeLeaflets = true;
                        return;
                    }
                    this.$message.error(res.data.message);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 选择服务商
        chkDistributeLeaflets (companyId) {
            this.distributeLeafletsList = Array.from(this.distributeLeafletsList, (item) => {
                if (item.companyId !== companyId) {
                    return {
                        ...item,
                        isCheck: false
                    };
                } else {
                    return item;
                }
            });
        },
        // 服务商&&处置审批历史
        serviceProviderHistory (type) {
            let params = {
                'targetId': this.supply.appProviderModel.id,
                'targetType': 60,
                'affiliatedCompanyId': this.supply.appProviderModel.providerCompanyId,
                'subSysType': 1
            };
            if (type === '处置') {
                params = {
                    'targetId': this.$route.query.id,
                    'targetType': 61,
                    'affiliatedCompanyId': this.supply.appDisposalModel.providerCompanyId,
                    'subSysType': 1
                };
            }
            this.$http.post(this.$api.supply.serviceProviderHistory, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.projectApprovalRecordsList = res.data.data;
                        this.projectApprovalRecords = true;
                        return;
                    }
                    this.$message.error(res.data.message);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        // 查看
        goPage (id) {
            const {href} = this.$router.resolve({name: 'orderDetail', query: {orderId: id}});
            window.open(href, '_blank');
        }
    },
    filters: {
        date: function (time, hour) { // 把时间戳格式:若有参返回年-月-日时:分:秒 若无参返回 年-月-日
            if (!time) {
                return '--';
            }
            let y, m, d, date, h, ms, s, data, hours;
            date = new Date(time);
            y = date.getFullYear();
            m = date.getMonth() + 1;
            d = date.getDate();
            h = date.getHours();
            ms = date.getMinutes();
            s = date.getSeconds();
            data = y + '-' + format(m) + '-' + format(d);
            hours = format(h) + ':' + format(ms) + ':' + format(s);
            if (hour) {
                return data + ' ' + hours;
            } else {
                return data;
            }
            function format (num) {
                if (parseInt(num) < 10) {
                    num = '0' + num;
                }
                return num;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
  .clearf{
    clear: both;
  }
  .customer-application-form {
      margin: 0 -20px;
      /deep/ .iconfont{
          color: #ee7502;
      }
      .gy-h4{
          padding: 12px 20px;
      }
    .application-wrapper {
      width: 100%;
      height: 48px;
      line-height: 14px;
      padding: 12px 20px;
        position: relative;
      .application-item {
          display: inline-block;
          vertical-align: middle;
        .item-title {
            display: inline-block;
            margin-right: 10px;
        }
        .item-text {
            display: inline-block;
        }
      }
      .application-item1 {
          margin-right: 20px;
        @extend .application-item;
        .item-text {
          color: #999999;
        }
      }
      .application-item2 {
        @extend .application-item;
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
        .item-text {
          color: #999999;
        }
      }
      .application-item3 {
        flex: 1;
        @extend .application-item;
      }
    }
    .title-wrapper {
      padding: 15px 0 21px 0;
      cursor: default;
      line-height: 1;
      .gy-h5{
        /*font-family: "PingFang-SC-Bold";*/
        font-weight: bold;
      }
      .iconfont {
        display: inline-block;
        width: 16px;
        margin-right: 8px;
        margin-left: -6px;
        vertical-align: baseline;
      }
      span {
        cursor: default;
      }
      .el-icon-arrow-down {
        margin-left: 8px;
      }
      .gy-link {
        float: right;
      }
    }
    .pt-6 {
      padding-bottom: 6px;
    }
    .application-content {
      &:after {
        display: block;
        content: ' ';
        clear: both;
      }
    }
      .company-info, .application-info{
          border-bottom: 8px solid #f5f5f5;
          padding: 0 20px 0 15px;
      }
     .platform-audit-info {
         border-bottom: 1px solid #f5f5f5;
         padding: 0 20px 0 35px;
      }
    .service-provider-audit-info {
      padding: 0 20px 0 35px;
    }
      .document-execution-info, .breach-contract-disposal{
          border-top: 1px solid #f5f5f5;
          padding: 0 20px 0 35px;
      }

    .application-info, .document-execution-info {
      border-bottom-width: 1px;
    }
    .company-info-content {
      @extend .module-content;
      @extend .pt-6;
      .gy-form-group {
        padding-left: 66px;
        .l {
          width: 56px;
        }
      }
    }
    .application-info-content {
      padding-left: 20px;
      @extend .module-content;
      .gy-form-group {
        padding-left: 108px;
        .l {
          width: 84px;
        }
      }
    }
    .module-content {
      &:after {
        display: block;
        content: ' ';
        clear: both;
      }
    }
    .platform-audit-info-content {
      @extend .module-content;
      @extend .pt-6;
      .gy-form-group {
        padding-left: 108px;
        .l {
          width: 84px;
        }
      }
      .gy-link {
        padding-left: 15px;
      }
    }
    .service-provider-audit-info-content {
      padding-left: 18px;
      padding-right: 18px;
      @extend .module-content;
      .gy-form-group {
        padding-left: 108px;
        .l {
          width: 84px;
        }
      }
      .gy-link {
        padding-left: 15px;
      }
    }
    .application-info-funds-content {
      @extend .module-content;
      .gy-form-group {
        padding-left: 108px;
        .l {
          width: 84px;
        }
      }
      .gy-link {
        padding-left: 15px;
      }
    }
    .document-execution-info-content {
      @extend .pt-6;
      .order-type {
        padding: 0 15px 8px;
      }
      .gy-table {
        thead{
          tr{
            td{
              height: 36px;
              line-height: 1;
            }
          }
        }
        .order-num {
          background-color: #fbfbfc;
          height: 36px;
          &:hover, & > td {
            padding: 0 16px;
            vertical-align: middle;
            background-color: #fbfbfc !important;
            border:0;
          }
        }
        tbody {
          tr:hover, td:hover {
            background-color: #fff;
          }
          td {
            vertical-align: top;
          }
        }
      }
    }
    .breach-contract-disposal-content {
      padding-left: 20px;
      padding-right: 18px;
      @extend .module-content;
      @extend .pt-6;
      .gy-form-group {
        padding-left: 108px;
        .l {
          width: 84px;
        }
      }
    }
  }
  .gy-table thead td, .gy-table thead th {
    background-color: #d4d4d4;
    padding: 8px 10px;
    &:after {
      background-color: #e7ecf1;
    }
  }
  /deep/ .spqk{
    .el-dialog__body {
      padding-top: 16px;
    }
  }

  /deep/ .gy-form-group{
    font-family: "PingFangSC-Regular";
    padding-right: 64px;
    min-height: 36px;
    line-height: 20px;
    .l {
        color: #000;
        line-height: 20px;
        padding-top: 0;
        strong {
          top: 4px;
        }
    }
  }

  .gy-form-group1 {
    float: left;
    width: 50%;
    padding: 0 64px 12px 0;
    min-height: 36px;
    color: #000;
    line-height: 20px;
    &:after{
      clear: both;
      content: ' ';
      display: block;
    }
    .l {
      float: left;
      display: inline-block;
      width: 84px;
      padding-left: 0;
      position: relative;
      strong{
        color: #e0370f;
        font-size: 12px;
        font-weight: normal;
        width: 8px;
        position: absolute;
        left: 20px;
        text-align: left;
        top: 0;
      }
    }
    .c {
      float: left;
      display: inline-block;
      color: $color-main;
      width: calc(100% - 84px);
      padding-left: 24px;
    }
  }

  /deep/ .gy-form-group:nth-child(2n + 1), .gy-form-group1:nth-child(2n + 1) {
    padding-right: 96px;
  }

  .reject-apply-reason {
    position: relative;
    span{
      position: absolute;
      top: auto;
      left: auto;
      right: 3px;
      bottom: 0;
      color: $color-main;
    }
  }

  /deep/ .platformAudit-wrapper {
    .platformAudit-item {
      display: flex;
      /*overflow: hidden;*/
      .step-icon {
        flex: 0 0 20px;
        margin-right: 20px;
        border-right: 2px dotted $color-border;
        position: relative;
        &>div{
          width: 15px;
          height: 15px;
          position: absolute;
          left: 12px;
          top: 0;
          border: 3px solid rgba(74, 144, 226, .3);
          border-radius: 50%;
          div{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #4a90e2;
          }
        }
      }
      &:last-child{
        .step-icon {
          border-right-width: 0;
        }
      }
      .version{
        line-height: 1.2;
        padding-bottom: 20px;
        margin-top: -2px;
      }
      .time {
        flex: 0 0 150px;
        @extend .version;
      }
      .text {
        flex: 1;
        @extend .version;
      }
    }
  }

  .color-height{
    color: $color-highlight;
  }

  .commodity {
    display: flex;
    .commodity-img {
      flex: 0 0 56px;
      width: 56px;
      padding-top: 6px;
      img{
        border: 1px solid $color-border;
        width: 56px;
      }
    }
    .commodity-content {
      flex: 1;
      padding-left: 10px;
    }
  }

  .gy-btn-group {
    padding: 15px 0;
    text-align: right;
    clear: both;
    .gy-button-extra {
      margin-right: 10px;
    }
  }

  .pr0 {
    padding-right: 0;
  }

  .gy-link {
    color: $color-extra;
  }

  .el-icon-arrow-down {
    transition: all 0.3s;
  }

  .el-rotate {
    transform: rotate(180deg);
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .2s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }
  .clock{
      height: 20px;
      margin-top: -2px;
      img{
          height: 25px;
          width: 25px;
          margin-left: 5px;
          vertical-align: middle;;
      }
      .alignment{
          display: inline-block;
          vertical-align: middle;
          width: 145px;
      }
  }
</style>
<style lang="scss">
  .el-tooltip__popper.is-light {
    max-width: 420px;
    line-height: 1.8;
    border: 1px solid $color-border;
    word-break: break-all;
  }
  .el-tooltip__popper .popper__arrow {
    border-top-color: $color-border!important;
    border-bottom-color: $color-border!important;
  }
</style>
