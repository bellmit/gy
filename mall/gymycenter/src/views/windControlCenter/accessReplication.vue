<template>
    <div class="accessReplication">
        <div class="grade">评级详情</div>
        <div class="rating-results">
            <p>
                <i class="iconfont icon-dingdanxinxi"></i>
                <span class="top">评级结果</span>
            </p>
            <div class="gy-form-group">
                <span class="l">评级</span>
                <span>{{list.companyGoalModel.ratingRank}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">模型评级</span>
                <span>{{list.companyGoalModel.referenceRank}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">最新评级日期</span>
                <span >{{list.companyGoalModel.createdDate | date()}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">评级描述</span>
                <span >{{list.companyGoalModel.remark}}</span>
            </div>
            <div class="clear"></div>
        </div>
        <div class="rating-results">
            <p>
                <i class="iconfont icon-dingdanxinxi"></i>
                <span class="top">企业类型</span>
            </p>
            <div class="gy-form-group">
                <span class="l">公司名称</span>
                <span>{{list.companyGoalModel.companyName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">大类</span>
                <span >{{list.companyGoalModel.parentName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">小类</span>
                <span >{{list.companyGoalModel.childName}}</span>
            </div>
            <div class="clear"></div>
        </div>
        <div class="rating-results">
            <p>
                <i class="iconfont icon-dingdanxinxi"></i>
                <span class="top">企业基础信息</span>
            </p>
            <div class="gy-form-group">
                <span class="l">注册实缴资本(万元)</span>
                <span>{{list.values.actualCapital.paramModifyValue | numToCash(4)}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">客户销售规模</span>
                <span>{{list.values.salesVolume.paramModifyValue}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">企业参保人数</span>
                <span>{{list.values.socialStaffNum.paramModifyValue}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">场地类型</span>
                <span>{{list.values.siteType.paramModifyValue}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">经营年限(年)</span>
                <span >{{list.values.operationPeriod.paramModifyValue}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">固定资产(万元)</span>
                <span >{{list.values.fixedAssets.paramModifyValue | numToCash(4)}}</span>
            </div>
            <div class="clear"></div>
        </div>
        <div class="rating-results">
            <p>
                <i class="iconfont icon-dingdanxinxi"></i>
                <span class="top">企业司法经营信息</span>
            </p>
            <div class="gy-form-group">
                <span class="l">严重违法</span>
                <span>{{list.values.breakTheLaw.paramModifyValue}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">工商登记状态</span>
                <span >{{list.values.regStatus.paramModifyValue}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">失信被执行次数</span>
                <span >{{list.values.dishonestZhixing.paramModifyValue}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">法律诉讼</span>
                <span >{{list.values.lawSuit.paramModifyValue}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">历史失信被执行次数</span>
                <span >{{list.values.hiDishonestZhixing.paramModifyValue}}</span>
            </div>
            <div class="clear"></div>
        </div>
        <div class="rating-results">
            <p>
                <i class="iconfont icon-dingdanxinxi"></i>
                <span class="top">经营风险</span>
            </p>
            <div class="gy-form-group">
                <span class="l">经营异常数(含历史)</span>
                <span>{{list.values.abnormalInfo.paramModifyValue}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">行政处罚数(含历史)</span>
                <span >{{list.values.punishmentInfo.paramModifyValue}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">股权质押</span>
                <span >{{list.values.equityInfo.paramModifyValue}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">动产抵押</span>
                <span >{{list.values.mortgageInfo.paramModifyValue}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">司法拍卖</span>
                <span >{{list.values.judicialSale.paramModifyValue}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">清算信息</span>
                <span >{{list.values.liquidating.paramModifyValue}}</span>
            </div>
            <div class="clear"></div>
        </div>
        <div class="rating-results">
            <p>
                <i class="iconfont icon-dingdanxinxi"></i>
                <span class="top">平台交易信息</span>
            </p>
            <div class="gy-form-group">
                <span class="l">注册时间(月)</span>
                <span >{{list.values.regPeriod.paramModifyValue}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">线上交易笔数</span>
                <span >{{list.values.dealNum.paramModifyValue}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">线上交易金额(万元)</span>
                <span>{{list.values.dealAmount.paramModifyValue| numToCash(4)}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">线上支付金额(万元)</span>
                <span >{{list.values.dealPayment.paramModifyValue | numToCash(4)}}</span>
            </div>
            <div class="gy-form-group" style="height:36px;">
                <span class="l">线上交易电子合同签约率(%)</span>
                <span style="top:27px;position:absolute">{{list.values.dealContractSign.paramModifyValue | numToCash(4)}}</span>
            </div>
            <div class="gy-form-group" style="height:36px;">
                <span class="l">线上交易货物交割凭证上传率(%)</span>
                <span style="top:27px;position:absolute">{{list.values.dealEvidenceUpload.paramModifyValue | numToCash(4)}}</span>
            </div>
            <div class="gy-form-group last-bottom">
                <span class="l">违约订单次数</span>
                <span >{{list.values.defaultOrderNum.paramModifyValue}}</span>
            </div>
            <div class="gy-form-group last-bottom">
                <span class="l">违约订单金额(万元)</span>
                <span >{{list.values.defaultOrderAmountGlobal.paramModifyValue | numToCash(4)}}</span>
            </div>
            <div class="clear"></div>
        </div>
        <div class="cancel">
            <button class="gy-button-extra" @click="clone()">关闭</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'accessReplication',
    data () {
        return {
            companyId: null,
            list: {
                companyGoalModel: {},
                values: {
                    actualCapital: {
                        paramModifyValue: null
                    },
                    salesVolume: {
                        paramModifyValue: null
                    },
                    socialStaffNum: {
                        paramModifyValue: null
                    },
                    siteType: {
                        paramModifyValue: null
                    },
                    operationPeriod: {
                        paramModifyValue: null
                    },
                    fixedAssets: {
                        paramModifyValue: null
                    },
                    breakTheLaw: {
                        paramModifyValue: null
                    },
                    regStatus: {
                        paramModifyValue: null
                    },
                    dishonestZhixing: {
                        paramModifyValue: null
                    },
                    lawSuit: {
                        paramModifyValue: null
                    },
                    hiDishonestZhixing: {
                        paramModifyValue: null
                    },
                    abnormalInfo: {
                        paramModifyValue: null
                    },
                    punishmentInfo: {
                        paramModifyValue: null
                    },
                    equityInfo: {
                        paramModifyValue: null
                    },
                    mortgageInfo: {
                        paramModifyValue: null
                    },
                    judicialSale: {
                        paramModifyValue: null
                    },
                    liquidating: {
                        paramModifyValue: null
                    },
                    regPeriod: {
                        paramModifyValue: null
                    },
                    dealNum: {
                        paramModifyValue: null
                    },
                    dealAmount: {
                        paramModifyValue: null
                    },
                    dealPayment: {
                        paramModifyValue: null
                    },
                    dealContractSign: {
                        paramModifyValue: null
                    },
                    dealEvidenceUpload: {
                        paramModifyValue: null
                    },
                    defaultOrderNum: {
                        paramModifyValue: null
                    },
                    defaultOrderAmountGlobal: {
                        paramModifyValue: null
                    }
                }
            }
        };
    },
    mounted () {
        this.companyId = this.$route.query.companyId;
        this.getCompanyList();
    },
    methods: {
        getCompanyList () {
            this.$http.get(this.$api.wind.getDetail + this.companyId)
                .then(res => {
                    if (res.data.code === 0) {
                        this.list.companyGoalModel = res.data.data.data.companyGoalModel;
                        if (res.data.data.data.values !== null) {
                            Object.keys(this.list.values).forEach(item => {
                                this.list.values[item].paramModifyValue = res.data.data.data.values[item].paramModifyValue;
                            });
                        } else {
                            console.log('ttt');
                        }
                    }
                });
        },
        clone () {
            window.close();
        }
    }
};
</script>

<style lang="scss">
    .accessReplication{
        // padding: 0 16px;
        .rating-results{
            padding: 0 16px;
            border-bottom: 8px solid #F5F5F5;
        }
        p{
            margin: 15px 0 7px 0;
        }
        .last-bottom{
            margin-top: 22px;
        }
        .clear{
            clear: both;
        }
        .gy-form-group{
            min-height: 20px;
            line-height: 20px;
            padding: 8px 30px 8px 180px;
            .l{
                width: 158px;
                padding-left: 18px;
            }
            span{
                height: 20px;
                display: inline-block;
            }
        }
        .iconfont{
            font-size: 14px;
        }
        .grade{
            border-bottom: 2px solid #F5F5F5;
            font-size: 16px;
            color: #333;
            padding: 0 16px;
            font-weight: bold;
        }
        .top{
            font-size: 14px;
            color: #333;
            font-weight: bold;
            padding-left: 2px;
        }
        .cancel{
            text-align: right;
            margin:32px 16px 32px 0;
        }
    }
</style>
