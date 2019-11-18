<template>
    <!-- 货押 -->
    <div class="clearfix">
        <div class="title">
            服务方案详情
            <a v-if="(supply.appProviderModel.status && supply.appProviderModel.status >= 210
                && supply.appProviderModel.status !== 220) || supply.appProviderModel.initiatorUserId"
                       href="javascript:void(0);" style="margin-right: -30px;" class="gy-link" @click.stop="serviceProviderHistory">服务方案审批详情 </a>
        </div>
        <div class="gy-form-group">
            <span class="l">方案发起人</span>
            {{supply.appProviderModel.initiatorUserName || '--'}}
        </div>
        <div class="gy-form-group">
            <span class="l">方案发起时间</span>
            {{supply.appProviderModel.initiateTime | date('h')}}
        </div>
        <div class="title"><i class="iconfont icon-czlc"></i><span>服务规则</span></div>
        <div class="pl-20">
          <div class="gy-form-group">
              <span class="l">销售保证金</span>
              <span v-if="form.saleContractAmount">{{form.saleContractAmount}}%</span>
              <span v-else>--</span>
          </div>
          <div class="gy-form-group">
              <span class="l">采购付款方式</span>
              {{form.buyPaymentType || '--'}}
          </div>
          <div class="gy-form-group">
              <span class="l">销售追保</span>
              <span v-if="form.depositRatioSubtract || form.depositRatioAppend">跌{{form.depositRatioSubtract}}%补{{form.depositRatioAppend}}%</span>
              <span v-else>--</span>
          </div>
          <div class="gy-form-group">
              <span class="l">采购期限</span>
              <span v-if="form.repoDays">{{form.repoDays}}天内</span>
              <span v-else>--</span>
          </div>
        </div>
        <div class="title"><i class="iconfont icon-zjhb"></i><span>贸易收益</span></div>
        <div class="pl-20">
          <div class="gy-form-group">
              <span class="l">采购金额</span>
              <span v-if="form.investedCapital">{{form.investedCapital}}万元</span>
              <span v-else>--</span>
          </div>
          <div class="gy-form-group">
            <span class="l">销售金额</span>
            <span v-if="form.saleAmount">{{form.saleAmount}}万元</span>
            <span v-else>--</span>
          </div>
          <!--<div class="gy-form-group">-->
              <!--<span class="l">年回报率</span>-->
              <!--<span v-if="form.annualRatioStart || form.annualRatioEnd">{{form.annualRatioStart}}-{{form.annualRatioEnd}}%</span>-->
              <!--<span v-else>&#45;&#45;</span>-->
          <!--</div>-->
          <div class="gy-form-group">
              <span class="l">服务周期</span>
              <span v-if="form.cashCycleDays">{{form.cashCycleDays}}天内</span>
              <span v-else>--</span>
          </div>
          <div class="gy-form-group">
              <span class="l">补充说明</span>
              <div class="pd10" v-if="form.backDescription">{{form.backDescription}}</div>
              <div v-else>--</div>
          </div>
        </div>
        <div class="title" @click="moduleItems.explain = !moduleItems.explain"><i class="iconfont icon-gdxq"></i><span>更多详情</span><i class="el-icon-arrow-down" :class="{'el-rotate' : moduleItems.explain}"></i></div>
        <transition name="slide-fade">
            <div v-show="moduleItems.explain" class="clearfix">
                <!-- <div class="title"><i class="iconfont icon-fxkz"></i><span>风险控制</span></div> -->
                <div class="pl-20">
                  <div class="gy-form-group single-row">
                      <span class="l">风险控制措施</span>
                      <span class="pd10" v-if="form.riskDescription" v-html="form.riskDescription.replace(/\n/g, '<br>')"></span>
                      <span v-else>--</span>
                  </div>
                </div>
                <!-- <div class="title"><i class="iconfont icon-hzlc"></i><span>合作流程</span></div> -->
                <div class="pl-20">
                  <div class="gy-form-group single-row">
                      <span class="l">服务前提条件</span>
                      <span class="pd10" v-if="form.cooperationDescription" v-html="form.cooperationDescription.replace(/\n/g, '<br>')"></span>
                      <span v-else>--</span>
                  </div>
                </div>
                <!-- <div class="title"><i class="iconfont icon-bcsm"></i><span>补充说明</span></div> -->
                <div class="pl-20">
                  <div class="gy-form-group single-row">
                    <span class="l">业务所需文件</span>
                    <span class="pd10" v-if="form.otherDescription" v-html="form.otherDescription.replace(/\n/g, '<br>')"></span>
                    <span v-else>--</span>
                  </div>
                </div>
                <!-- <div class="title"><i class="iconfont icon-xmhtjwj"></i><span>项目合同及文件</span></div> -->
                <div class="pl-20">
                  <div class="gy-form-group single-row">
                    <span class="l">补充说明</span>
                    <span class="pd10" v-if="form.replenishDescription" v-html="form.replenishDescription.replace(/\n/g, '<br>')"></span>
                    <span v-else>--</span>
                  </div>
                  <div class="gy-form-group file-wrap cl single-row">
                      <span class="l">附属文档</span>
                      <div v-if="fileList && fileList.length !== 0">
                          <template  v-for="(item, index) in fileList">
                              <a :href="item.filePath" class="link-file" target="_blank" :key="index">{{item.fileName}}</a>
                          </template>
                      </div>
                      <span v-else>--</span>
                  </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        supply: Object
    },
    inject: ['serviceProviderHistory'],
    data () {
        return {
            form: {},
            fileList: [],
            moduleItems: {
                explain: true
            }
        };
    },
    mounted () {
        this.form = this.supply.appProviderModel.providerItem;
        this.fileList = this.supply.appProviderModel.providerFileList;
    },
    methods: {
    }
};
</script>

<style lang='scss' scoped>
    .pl-20{
      padding-left: 22px;
      padding-right: 22px;
    }
    .title {
        font-size: 14px;
        color: #333333;
        padding: 15px 13px 9px 0px;
        font-weight: bold;
        clear: both;
        .iconfont {
            display: inline-block;
            width: 14px;
            margin-right: 8px;
            font-size: 14px;
            font-weight: normal;
            color: #ee7502;
        }
        .icon-fxkz {
            font-size: 16px;
        }
        span {
            display: inline-block;
            vertical-align: middle;
            font-weight: normal;
        }
    }
    .pd10 {
        border: 1px solid rgb(245, 245, 245);
        padding: 10px;
        display: block;
    }
    .file-wrap {
        a {
            margin-right: 12px;
        }
    }
    .link-file {
      color: #4A90E2;
    }
    .el-icon-arrow-down {
        transition: all 0.3s;
    }

    .gy-link {
        float: right;
        color: #4A90E2;
        font-weight: normal;
    }
    .el-rotate {
        transform: rotate(180deg);
        margin-left: 6px;
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
</style>
