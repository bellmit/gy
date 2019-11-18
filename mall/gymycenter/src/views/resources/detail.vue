<template>
    <div class="resourser_detailnew">
        <div class="top">
            <span class="mynewleft">商城资源详情</span>
            <span class="title">单号：{{info.odrOfferSn}}</span>
            <span class="right">状态：已{{info.offerStatus == 0 ? '上架':info.offerStatus == 1? '下架' : '作废' }}</span>
            <span class="right preview-number">预览数：{{info.readCount}}</span>
        </div>
        <el-row>
            <div class="btn-group top_btn">
                <button v-if='info.offerStatus === 0' class="gy-button-extra" @click="refresh(offerId)">刷新 </button>
                <template v-if="info.offerStatus == 0||info.offerStatus == 1">
                <router-link :to="{path:'add', query:{offerId: offerId}}">
                    <button class=" gy-button-normal">编辑</button>
                </router-link>
                </template>
            </div>

            <div>
                    <p class="mewmyp"><i class="iconfont icon-dingdanxinxi mewmyicon"></i> <span class="mewmyfont">商品信息</span></p>
                </div>
                <el-col :span="24">
                    <div class="base-info">
                        <dl>
                            <dt>品名：</dt>
                            <dd>{{info.skuName}}</dd>
                        </dl>
                        <dl>
                            <dt>创建时间：</dt>
                            <dd>{{info.createdDate | date('h')}}</dd>
                        </dl>
                        <dl>
                            <dt>商品图片：</dt>
                            <dd>
                                <div class="img-box"><img :src="info.skuPictureUrl" alt=""></div>
                            </dd>
                        </dl>
                        <dl>
                            <dt>有效时间：</dt>
                            <dd>{{info.effectiveMinutesN}}</dd>
                        </dl>
                        <dl>
                            <dt>单价(元)：</dt>
                            <dd>
                                <template v-if="info.skuPrice">
                                   {{info.skuPrice |numToCash}}{{info.skuPriceFlag == 1 ? "(可议价)" : ''}}
                                </template>
                                <template v-else>
                                    面议
                                </template>
                            </dd>
                        </dl>
                        <dl>
                            <dt>可供货量（{{info.infUnitOfMeasureDisplayName}}）：</dt>
                            <dd>
                                  {{info.skuQuantity|numToCash(2)}}
                            </dd>
                        </dl>
                        <dl>
                            <dt>最小起订量（{{info.infUnitOfMeasureDisplayName}}）：</dt>
                            <dd>
                                <template v-if="info.skuMinQuantityStr">
                                    {{info.skuMinQuantityStr|numToCash(2)}}
                                </template>
                                <template v-else>
                                    -
                                </template>
                            </dd>
                        </dl>
                    </div>
                    <div>
                        <p class="mewmyp"><i class="iconfont icon-xiangxixinxi mewmyicon"></i> <span class="mewmyfont">供应单信息</span></p>
                    </div>
                    <div class="base-info">
                        <dl>
                            <dt>交割仓库：</dt>
                            <dd>{{info.deliveryWarehouseName}}</dd>
                        </dl>
                        <dl>
                            <dt>交割地点：</dt>
                            <dd>
                                {{info.provinceName}}{{info.CityName}}{{info.districtName}}{{info.deliveryDetailedAddress}}
                            </dd>
                        </dl>
                        <dl>
                            <dt>交割时间：</dt>
                            <dd v-if="info.deliveryDateFlag ===3">{{info.deliveryDateText}}</dd>
                            <dd v-else-if="info.deliveryDateFlag === 2" >{{info.deliveryBeginDate|date}}以前</dd>
                            <dd v-else>{{info.deliveryBeginDate|date}}到{{info.deliveryEndDate|date}}</dd>
                        </dl>
                        <dl>
                            <dt>交付方式：</dt>
                            <dd>{{ info.deliveryType === 1 ? '买家自提' : info.deliveryType === 2 ? '卖家送货': '全部支持'}}</dd>
                        </dl>
                        <dl>
                            <dt>付款方式：</dt>
                            <dd>{{ info.paymentType === 1 ? '先货后款' : info.paymentType === 2 ? '先款后货': info.paymentType === 10 ? '担保交易' : '全部支持'}}</dd>
                        </dl>
                        <dl>
                            <dt>货源:</dt>
                            <dd>{{info.skuOrigin}}</dd>
                        </dl>
                        <dl>
                            <dt>促销方式:</dt>
                            <dd>{{promo[info.promoType]}}</dd>
                        </dl>
                        <dl>
                            <dt>买家保证金(%)：</dt>
                            <dd>{{info.depositRatio}}</dd>
                        </dl>
                        <dl>
                            <dt>发票月份：</dt>
                            <dd v-if="info.provideInvoiceType === null">{{info.provideInvoiceText}}</dd>
                            <dd v-else>{{info.provideInvoiceType === 0 ? '交割当月发票':'交割次月发票' }}</dd>
                        </dl>
                        <dl>
                            <dt>公司名称：</dt>
                            <dd>{{info.sellerCompanyName}}</dd>
                        </dl>
                        <dl>
                            <dt>是否公开公司名称：</dt>
                            <dd>{{info.isPublic ? '是':'否' }}</dd>
                        </dl>
                    </div>
                </el-col>
            </el-row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            offerId: '', // 供应单id
            info: {},
            item: {},
            data: {
                offerIdList: [],
                offerStatus: ''
            },
            promo: ['无', '热销', '推销', '降价', '优惠']
        };
    },
    created () {
        let that = this;
        that.offerId = that.$route.query.offerId;
        that.getInfo();
    },
    methods: {
        getInfo () {
            let that = this;
            that.$http.get(that.$api.offers.resources + '/' + that.offerId).then(function (res) {
                console.log(that.offerId);
                that.info = res.data.data;
                if (that.info.effectiveMinutes === 30) {
                    that.info.effectiveMinutesN = '30分钟';
                } else if (that.info.effectiveMinutes === 60) {
                    that.info.effectiveMinutesN = '1小时';
                } else if (that.info.effectiveMinutes === 1440) {
                    that.info.effectiveMinutesN = '1天';
                } else if (that.info.effectiveMinutes === 10080) {
                    that.info.effectiveMinutesN = '7天';
                } else if (that.info.effectiveMinutes === 43200) {
                    that.info.effectiveMinutesN = '一个月';
                } else if (that.info.effectiveMinutes === 5256000) {
                    that.info.effectiveMinutesN = '长期';
                }
            });
        },
        updateState (status) {
            // 0：上架，1：下架，2：作废）
            let that = this;
            status = status === 0 ? 1 : status === 1 ? 0 : 2;
            that.data.offerIdList.push(that.info.id);
            that.data.offerStatus = status;
            that.$http.post(that.$api.offers.state, that.data).then(function (res) {
                if (res.data.code === 0) {
                    that.getInfo();
                    that.data.offerIdList = [];
                }
            });
        },
        refresh (id) {
            this.$http.get(this.$api.offers.refresh + id).then((res) => {
                this.$message('刷新成功');
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    .resourser_detailnew{
        padding-bottom: 30px;
        .top{
            height: 35px;
            line-height: 35px;
            border-bottom: 1px solid #ebeef5;
            padding: 0 16px;
            color: #666;
            font-size: 14px;
            .mynewleft{
                color: #333;
                font-size: 16px;
                font-weight: 700;
                margin-right: 24px;
            }
        }
        .top_btn{
            margin: 20px 16px 0;
        }
        .right {
            float: right
        }
        .preview-number{
            display: inline-block;
            margin-right: 15px;
        }
        .base-info {
            font-size: 14px;
            overflow: hidden;
            padding: 0 30px;
        }
        .base-info dl {
            width: 50%;
            float: left;
            margin-bottom: 10px;
            dt {
                width: 130px;
                float: left;
                color:#333;
            }
            dd {
                float: left;
                color: #666;
                .img-box{
                    img{
                        width:60px;
                        height:60px;
                        margin-left:0;
                    }
                }
                img {
                    width: 30px;
                    height: 20px;
                    margin-left: 10px;
                    border: 1px solid $color-border;
                    border-radius: $border-radius-small;
                    cursor: pointer;
                }
            }
        }
    }
    .btn-group {
        text-align: right;
        min-width: 300px;
        button {
        margin-right:8px!important;
        }
  }
</style>
