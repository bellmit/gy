<template>
    <div class="commodity-main">
        <div class="gy-h4">订单补录及查看</div>
        <div class="gy-h5" style="padding: 12px 0 16px 0">基础信息</div>
        <div class="gy-form-box-14">
          <div class="fl item">
              <div class="gy-form-group">
                  <span class="l">品名</span>
                  <span class="ll">{{obj.skuName}}</span>
              </div>
              <div class="gy-form-group">
                  <span class="l">交割库</span>
                  <span class="ll">{{obj.deliveryWarehouseName}}</span>
              </div>
          </div>
          <div class="fl item">
              <div class="gy-form-group">
                  <span class="l">单价(元/吨)</span>
                  <span class="ll">{{obj.skuPrice}}</span>
              </div>
              <div class="gy-form-group">
                  <span class="l">交割期</span>
                  <span class="ll">{{obj.deliveryBeginDate | date}} 至 {{obj.deliveryEndDate | date}}</span>
              </div>
          </div>
          <div class="fl item">
              <div class="gy-form-group">
                  <span class="l">数量(吨)</span>
                  <span class="ll">{{obj.skuQuantity}}</span>
              </div>
              <div class="gy-form-group">
                  <span class="l">总金额(元)</span>
                  <span class="ll">{{detailDate.totalAmount}}</span>
              </div>
          </div>
        </div>
        <div class="gy-h5" style="clear: both;padding: 4px 0 16px 0">订单信息</div>
        <div class="gy-form-box-14">
          <div class="fl item">
              <div class="gy-form-group">
                  <span class="l">订单号</span>
                  <span class="ll">{{detailDate.odrOrderSn}}</span>
              </div>
              <div class="gy-form-group">
                  <span class="l">订单时间</span>
                  <span class="ll">{{detailDate.createdDate |date}}</span>
              </div>
          </div>
          <div class="fl item">
              <div class="gy-form-group">
                  <span class="l">买方公司名</span>
                  <span class="ll">{{detailDate.buyerCompanyName}}</span>
              </div>
              <div class="gy-form-group">
                  <span class="l">卖方公司名</span>
                  <span class="ll">{{detailDate.sellerCompanyName}}</span>
              </div>
          </div>
          <div class="fl item">
              <div class="gy-form-group">
                  <span class="l">买方保证金(%)</span>
                  <span class="ll">{{detailDate.depositRatio}}</span>
              </div>
              <div class="gy-form-group">
                  <span class="l">卖方保证金(%)</span>
                  <span class="ll">{{detailDate.sellerDepositRatio}}</span>
              </div>
          </div>
          <div class="fl item">
              <div class="gy-form-group">
                  <span class="l">货源</span>
                  <span class="ll">{{detailDate.skuOrigin}}</span>
              </div>
              <div class="gy-form-group">
                  <span class="l">成交时间</span>
                  <span class="ll">{{detailDate.transactionDate || null | date}}</span>
              </div>
          </div>
          <div class="fl item">
              <div class="gy-form-group">
                  <span class="l">卖方联系人</span>
                  <span class="ll">{{detailDate.sellerContact}}</span>
              </div>
              <div class="gy-form-group">
                  <span class="l">卖方联系人方式</span>
                  <span class="ll">{{detailDate.sellerContactMobile}}</span>
              </div>
          </div>
          <div class="fl item">
              <div class="gy-form-group">
                  <span class="l">买方联系人</span>
                  <span class="ll">{{detailDate.buyerContact}}</span>
              </div>
              <div class="gy-form-group">
                  <span class="l">买方联系人方式</span>
                  <span class="ll">{{detailDate.buyerContactMobile}}</span>
              </div>
          </div>
          <div class="fl item">
              <div class="gy-form-group">
                  <span class="l">买方撮合业务员</span>
                  <span class="ll">{{detailDate.buyerMatchName}}</span>
              </div>
              <div class="gy-form-group">
                  <span class="l">卖方撮合业务员</span>
                  <span class="ll">{{detailDate.sellerMatchName}}</span>
              </div>
          </div>
          <div class="fl item">
              <div class="gy-form-group">
                  <span class="l">订单状态</span>
                  <span class="ll">{{detailDate.orderStatus | orderState}}</span>
              </div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            detailDate: {},
            obj: {},
            orderId: ''
        };
    },
    created () {
        this.orderId = this.$route.query.orderId;
        this.detailMatch();
    },
    methods: {
        detailMatch () {
            this.$http.get(this.$api.matchmak.detialMatchmak + this.orderId)
                .then((res) => {
                    this.detailDate = res.data.data;
                    this.obj = this.detailDate.orderItemList[0];
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.commodity-main{
    width: 100%;
    .item{
        width: 100%;
        .gy-form-group{
            padding:0 14px 12px 122px;
            .l{
                width: 106px;
            }
        }
    }
}
</style>
