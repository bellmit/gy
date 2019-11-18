<template>
  <div class="box-card">
    <div class="application-wrapper">
      <div class="application-item1">
        <div class="item-title">单号</div>
        <div class="item-text">{{info.odrOfferSn}}</div>
      </div>
      <div class="application-item1">
        <div class="item-title">状态</div>
        <div class="item-text">已{{info.offerStatus === 0 ? '上架':info.offerStatus === 1? '下架' : '作废' }}</div>
      </div>
      <div class="application-item1">
        <div class="item-title">预览数</div>
        <div class="item-text">{{info.readCount}}</div>
      </div>
    </div>
    <el-row>
      <div class="btn-group">
          <button v-if='info.offerStatus === 0' class="gy-button-extra" @click="refresh(offerId)">刷新 </button>
          <button v-if='info.offerStatus === 0' class="gy-button-normal" @click="top(offerId)">{{isTop==2?'取消置顶': '置顶'}} </button>
        <template v-if="info.offerStatus === 0||info.offerStatus === 1">
          <button class="gy-button-normal" @click="updateState(info.offerStatus)">{{info.offerStatus === 0 ? '下架':'上架'}}
          </button>
        </template>
        <!--<router-link :to="{path:'add', query:{offerId: offerId}}"> <button class="gy-button-normal">编辑</button></router-link>-->
      </div>
      <el-col :span="24">
        <div class="base-info">
          <div class="gy-h5" style="margin-top: 7px">商品信息</div>
          <div class="base-wrapper">
            <dl>
              <dt>品名</dt>
              <dd>{{info.skuName}}</dd>
            </dl>
            <dl>
              <dt>创建时间</dt>
              <dd>{{info.createdDate | date('h')}}</dd>
            </dl>
            <dl style="height:100px;">
              <dt>商品图片</dt>
              <dd>
                <div class="img-box"><img :src="info.skuPictureUrl" alt=""></div>
              </dd>
            </dl>
            <dl style="height:100px;">
              <dt>有效时间</dt>
              <dd>{{info.effectiveMinutesN}}</dd>
            </dl>
            <dl>
              <dt>单价(元)</dt>
              <dd>
                <template v-if="info.skuPrice">
                  {{info.intCurrencyMark}}{{info.skuPrice |numToCash}}{{info.skuPriceFlag == 1 ? "(可议价)" : ''}}
                </template>
                <template v-else>
                  面议
                </template>
              </dd>
            </dl>
            <dl>
              <dt>可供货量（{{info.infUnitOfMeasureDisplayName}}）</dt>
              <dd>
                {{info.skuQuantity|numToCash(3)}}
              </dd>
            </dl>
            <dl>
              <dt>最小起订量（{{info.infUnitOfMeasureDisplayName}}）</dt>
              <dd>
                <template v-if="info.skuMinQuantity">
                  {{info.skuMinQuantity}}
                </template>
                <template v-else>
                  -
                </template>
              </dd>
            </dl>
          </div>
        </div>
        <div class="base-info">
          <div class="gy-h5">供应单信息</div>
          <div class="base-wrapper">
            <dl>
              <dt>交割仓库</dt>
              <dd>{{info.deliveryWarehouseName}}</dd>
            </dl>
            <dl>
              <dt>交割地点</dt>
              <dd>{{info.provinceName}}{{info.CityName}}{{info.districtName}}{{info.deliveryDetailedAddress}}</dd>
            </dl>
            <dl>
              <dt>交割时间</dt>
              <dd v-if="info.deliveryDateFlag ===3">{{info.deliveryDateText}}</dd>
              <dd v-else-if="info.deliveryDateFlag === 2">{{info.deliveryBeginDate|date}}以前</dd>
              <dd v-else>{{info.deliveryBeginDate|date}}到{{info.deliveryEndDate|date}}</dd>
            </dl>
            <dl>
              <dt>交付方式</dt>
              <dd>{{ info.deliveryType === 1 ? '买家自提' : info.deliveryType === 2 ? '卖家送货': '全部支持'}}</dd>
            </dl>
            <dl>
              <dt>付款方式</dt>
              <dd>{{ info.paymentType === 1 ? '先货后款' : info.paymentType === 2 ? '先款后货': info.paymentType === 10 ? '担保交易' : '全部支持'}}</dd>
            </dl>
            <dl>
              <dt>货源</dt>
              <dd>{{info.skuOrigin}}</dd>
            </dl>
            <dl>
              <dt>促销方式</dt>
              <dd>{{promo[info.promoType]}}</dd>
            </dl>
            <dl>
              <dt>买家保证金(%)</dt>
              <dd>{{info.depositRatio}}</dd>
            </dl>
            <dl>
              <dt>发票月份</dt>
              <dd v-if="info.provideInvoiceType === null">{{info.provideInvoiceText}}</dd>
              <dd v-else>{{info.provideInvoiceType === 0 ? '交割当月发票':'交割次月发票' }}</dd>
            </dl>
            <dl>
              <dt>公司名称</dt>
              <dd>{{info.sellerCompanyName}}</dd>
            </dl>
            <dl>
              <dt>是否公开公司名称</dt>
              <dd>{{info.isPublic ? '是':'否' }}</dd>
            </dl>
          </div>
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
            promo: ['无', '热销', '推销', '降价', '优惠'],
            isClick: false,
            isTop: ''
        };
    },
    created () {
        this.offerId = this.$route.query.offerId;
        this.getInfo();
    },
    methods: {
        getInfo () {
            this.$http.get(this.$api.offers.resources + '/' + this.offerId).then((res) => {
                this.info = res.data.data;
                this.isTop = res.data.data.isTop;
                if (this.info.effectiveMinutes === 30) {
                    this.info.effectiveMinutesN = '30分钟';
                } else if (this.info.effectiveMinutes === 60) {
                    this.info.effectiveMinutesN = '1小时';
                } else if (this.info.effectiveMinutes === 1440) {
                    this.info.effectiveMinutesN = '1天';
                } else if (this.info.effectiveMinutes === 10080) {
                    this.info.effectiveMinutesN = '7天';
                } else if (this.info.effectiveMinutes === 43200) {
                    this.info.effectiveMinutesN = '一个月';
                } else if (this.info.effectiveMinutes === 5256000) {
                    this.info.effectiveMinutesN = '长期';
                }
            });
        },
        updateState (status) {
        // 0:上架，1:下架，2:作废）
            status = status === 0 ? 1 : status === 1 ? 0 : 2;
            this.data.offerIdList.push(this.info.id);
            this.data.offerStatus = status;
            this.$http.post(this.$api.offers.state, this.data).then((res) => {
                if (res.data.code === 0) {
                    this.getInfo();
                    this.data.offerIdList = [];
                }
            });
        },
        refresh (id) {
            this.$http.get(this.$api.offers.refresh + id).then((res) => {
                this.$message('刷新成功');
            });
        },
        top (id) {
            if (this.isClick === true) {
                return;
            }
            this.isClick = true;
            this.$http.get(this.$api.offers.top + id).then((res) => {
                this.isClick = false;
                this.isTop = res.data.data.isTop;
                this.$message(res.data.data.isTop === 2 ? '置顶成功' : '取消置顶');
            });
        }
    }
};
</script>
<style scoped lang="scss">
  .btn-group {
    text-align: right;
    min-width: 300px;
    button {
      margin-right:8px!important;
    }
  }
  .btn-group-number {
    display: inline-block;
    position: absolute;
    right: 245px;
    top: 111px;
  }
  .gy-form-group{
    padding-right:42px;
  }
  .application-wrapper {
    width: 100%;
    height: 48px;
    line-height: 14px;
    padding: 12px 14px;
    position: relative;
    .application-item {
      display: inline-block;
      vertical-align: middle;
      color:#333;
      .item-title {
        display: inline-block;
        margin-right: 10px;
      }
      .item-text {
        display: inline-block;
        color:#666;
      }
    }
    .application-item1 {
      margin-right: 25px;
      @extend .application-item;
    }
  }
</style>

<style lang="scss">
  .box-card {
     padding: 15px 0 20px 0;
  }
  .el-card__header {
    padding: 10px 20px;
    .title {
      color: $color-title;
      font-size: 16px;
      font-weight: 700;
      margin-right: 24px
    }
  }

  .right {
    float: right
  }

  .base-info {
    overflow: hidden;
  }

  .base-info dl {
    width: 50%;
    float: left;
    font-size: 14px;
    height: 42px;
    line-height: 1;
    text-align: left;
    margin: 0;
    padding: 14px 0;
    dt {
      width: 112px;
      float: left;
      color: $color-title;
    }
    dd {
      float: left;
      color: $color-main;
      padding-left: 16px
    }
    .img-box img {
      width: 80px;
      height: 80px;
    }
  }

  .base-wrapper {
     padding: 0 14px;
  }
  .gy-h5 {
     margin: 16px 0 6px 0;
  }
</style>
