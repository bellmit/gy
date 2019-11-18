<template>
  <div v-if="modelData"
       class="modelDetailCon">
    <div class="title">
      评级详情
    </div>
    <div class="model-form">
      <div class="clearfix">
        <div class="my-top-title"><i class="iconfont icon-icon_shenqing"></i>评级结果</div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">评级</span>
          <span>{{modelData.companyGoalModel.ratingRank || '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">最新评级日期</span>
          <span>{{modelData.companyGoalModel.createdDate.slice(0,10) || '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">模型评级</span>
          <span>{{modelData.companyGoalModel.referenceRank || '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">模型评分</span>
          <span>{{modelData.companyGoalModel.totalScore|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">评级描述</span>
          <span>{{modelData.companyGoalModel.remark || '--'}}</span>
        </div>
      </div>
      <div class="clearfix" style="border-bottom-width: 1px;">
        <div class="my-top-title"><i class="iconfont icon-icon_shenqing"></i>公司信息</div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">公司名称</span>
          <span>{{modelData.companyGoalModel.companyName || '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">大类</span>
          <span>{{modelData.companyGoalModel.parentName || '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">小类</span>
          <span>{{modelData.companyGoalModel.childName || '--'}}</span>
        </div>
      </div>
      <div class="clearfix">
        <div class="my-top-title"><i class="iconfont icon-icon_shenqing"></i>企业基础信息</div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">注册实缴资本(万元)</span>
          <span>{{modelData.values.actualCapital.paramModifyValue|formatNumber(4)|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">客户销售规模(亿元）</span>
          <span>{{modelData.values.salesVolume.paramModifyValue || '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">企业参保人数</span>
          <span>{{modelData.values.socialStaffNum.paramModifyValue|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">场地类型</span>
          <span>{{modelData.values.siteType.paramModifyValue|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">经营年限(年)</span>
          <span>{{modelData.values.operationPeriod.paramModifyValue|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">固定资产(万元)</span>
          <span>{{modelData.values.fixedAssets.paramModifyValue|formatNumber(4) || '--'}}</span>
        </div>
      </div>
      <div class="clearfix" style="border-bottom-width: 1px;">
        <div class="my-top-title"><i class="iconfont icon-icon_shenqing"></i>企业司法及经营信息</div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">严重违法</span>
          <span>{{modelData.values.breakTheLaw.paramModifyValue|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">工商登记状态</span>
          <span>{{modelData.values.regStatus.paramModifyValue ||'--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">失信被执行次数</span>
          <span>{{modelData.values.dishonestZhixing.paramModifyValue|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">法律诉讼</span>
          <span>{{modelData.values.lawSuit.paramModifyValue|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">历史失信被执行次数</span>
          <span>{{modelData.values.hiDishonestZhixing.paramModifyValue|| '--'}}</span>
        </div>
      </div>
      <div class="clearfix">
        <div class="my-top-title"><i class="iconfont icon-icon_shenqing"></i>经营风险</div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">经营异常数(含历史)</span>
          <span>{{modelData.values.abnormalInfo.paramModifyValue|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">行政处罚数(含历史)</span>
          <span>{{modelData.values.punishmentInfo.paramModifyValue|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">股权质押</span>
          <span>{{modelData.values.equityInfo.paramModifyValue|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">动产抵押</span>
          <span>{{modelData.values.mortgageInfo.paramModifyValue|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">司法拍卖</span>
          <span>{{modelData.values.judicialSale.paramModifyValue|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">清算信息</span>
          <span>{{modelData.values.liquidating.paramModifyValue|| '--'}}</span>
        </div>
      </div>
      <div class="clearfix">
        <div class="my-top-title"><i class="iconfont icon-icon_shenqing"></i>平台交易信息</div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">注册时间（月）</span>
          <span>{{modelData.values.regPeriod.paramModifyValue|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">线上交易笔数</span>
          <span>{{modelData.values.dealNum.paramModifyValue|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">线上交易金额(万元）</span>
          <span>{{modelData.values.dealAmount.paramModifyValue|formatNumber(4)|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">线上支付金额 (万元）</span>
          <span>{{modelData.values.dealPayment.paramModifyValue|formatNumber(4)|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">线上交易电子合同签约率（%）</span>
          <span>{{modelData.values.dealContractSign.paramModifyValue|formatNumber(2)|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">线上交易货物交割凭证上传率 (%)</span>
          <span>{{modelData.values.dealEvidenceUpload.paramModifyValue|formatNumber(2)|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">违约订单次数</span>
          <span>{{modelData.values.defaultOrderNum.paramModifyValue|| '--'}}</span>
        </div>
        <div class="gy-form-group">
          <span class="l-modelDetailCon">违约订单金额 (万元)</span>
          <span>{{modelData.values.defaultOrderAmountGlobal.paramModifyValue|formatNumber(4)|| '--'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            modelData: '',
            parentOptions: '',
            childOptions: '',
            commentId: this.$route.query.commentId || 103,
            selectInfo: [
                { value: '吊销' },
                { value: '注销' },
                { value: '停业' },
                { value: '清算' },
                { value: '存续' }
            ]
        };
    },
    methods: {
        init () {
            this.companyRatingInfo();
        },
        companyRatingInfo () {
            this.$http.get(this.$api.supplyAdmin.ratingInfo + this.commentId).then((res) => {
                if (res.data.code === 0) {
                    this.modelData = res.data.data.data;
                    console.log(this.modelData);
                } else {
                    this.$message(res.data.message);
                }
            });
        }
    },
    mounted () {
        this.init();
    }
};
</script>
<style lang="scss" scoped>
  .modelDetailCon {
    margin: 0 -20px;
    min-width: 1050px;
    .l-modelDetailCon{
      position: absolute;
      left: 0;
      top: 0;
      color: #000;
      width: 210px;
    }
    .title {
      line-height: 1;
      font-size: 16px;
      color: #333;
      font-weight: bold;
      padding: 12px 20px;
    }
    .model-form {
      margin-bottom: 4rem;
      .my-top-title {
        width: 100%;
        font-size: 14px;
        color: #333333;
        line-height: 14px;
        i {
          margin-right: 8px;
          margin-left: -10px;
          vertical-align: baseline;
          color: #ee7502;
        }
      }
      .isRequired::before {
        content: "*";
        color: #f56c6c;
        position: absolute;
        left: 8px;
        // margin-right: 4px;
      }
      .gy-form-group {
        padding-left: 240px;
          line-height: 20px;
          min-height: 36px;
        span:nth-child(2) {
        }
      }
      .score {
        width: 100%;
        font-size: 14px;
        color: #e59640;
        text-align: right;
        height: 40px;
        line-height: 40px;
      }
      .set-width {
        width: 30%;
      }
      .form_save {
        background-color: #f2ac4c;
        color: #fff;
        float: right;
        margin-top: 2rem;
      }
    }
    .clearfix {
      content: "";
      display: block;
      clear: both;
      border-bottom: 8px solid #f5f5f5;
      padding: 0 20px;
      .my-top-title{
        padding: 15px 0 21px 0;
      }
    }
  }
</style>
