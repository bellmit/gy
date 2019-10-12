<!--
-->

<template>
    <div>
        <div class="base-info" v-if="orderData.id">
            <dl>
                <dt>订单号</dt>
                <dd>{{orderData.odrOrderSn}}
                </dd>
            </dl>
            <dl>
                <dt>订单时间</dt>
                <dd>{{orderData.createdDate|date}}
                </dd>
            </dl>
            <dl>
                <dt>卖家</dt>
                <dd>{{orderData.sellerCompanyName}}
                    <!--<span class="im-talk"><i class="iconfont icon-im"></i>和我联系</span>-->
                </dd>
            </dl>
            <dl>
                <dt>买家</dt>
                <dd>{{orderData.buyerCompanyName}}
                    <!--<span class="im-talk"><i class="iconfont icon-im"></i>和我联系</span>-->
                </dd>
            </dl>
            <dl>
                <dt>交付方式</dt>
                <dd>{{orderData.deliveryType === 1 ? '买家自提' : '卖家代运'}}</dd>
            </dl>
            <dl>
                <dt>是否分批</dt>
                <dd>{{orderData.isBatchDelivery === 0 ? '否' :'是'}}</dd>
            </dl>
            <dl>
                <dt>溢短装</dt>
                <dd>±{{orderData.shortOverflowRate}}%</dd>
            </dl>
            <dl>
                <dt>付款方式</dt>
                <dd>{{orderData.paymentType | paymentType}}</dd>
            </dl>
            <dl>
                <dt>保证金</dt>
                <dd>{{orderData.depositRatio}}%</dd>
            </dl>

            <dl>
                <dt>追加保证金</dt>
                <dd>跌{{orderData.depositRatioSubtract}}%补{{orderData.depositRatioAppend}}%</dd>
            </dl>
          <dl>
            <dt>发票</dt>
            <dd v-if="orderData.provideInvoiceType === null">
              {{orderData.provideInvoiceText}}
              <img @click="showReceipt" :src=icon style="width: 25px;height: 25px">
            </dd>
            <!--<dd>{{orderData.provideInvoiceType ? '交割月发票':'交割次月' }}<img @click="showReceipt" v-if="iconsTrue" :src=icons></dd>-->
            <dd v-else>{{orderData.provideInvoiceType === 0 ? '交割当月发票':'交割次月发票' }}
              <!-- <img @click="showReceipt" :src=icon style="width: 25px;height: 25px"> -->
              <img style="width: 25px;height: 25px" v-if="previewerImg.list.length !==0" @click="showReceipt" :src=icon>
            <a style="width: 25px;height: 25px" v-for="(item, index) in previewerImg.pdflist" :key="index" :href="item.invoiceUrl" target="_blank"><img :src=pdfThumbnail></a>
            </dd>
          </dl>
            <dl>
                <dt>数量验收标准</dt>
                <dd>
                    <template v-if="orderData.acceptanceStandard">
                        签收数量
                    </template>
                    <template v-else>
                        出库数量
                    </template>
                </dd>
            </dl>
            <dl>
                <dt>卖方联系人</dt>
                <dd>{{orderData.sellerContact}}</dd>
            </dl>
            <dl>
                <dt>买方联系人</dt>
                <dd>{{orderData.buyerContact}}</dd>
            </dl>
            <dl>
                <dt>卖方系方式</dt>
                <dd>{{orderData.sellerContactMobile}}</dd>
            </dl>
            <dl>
                <dt>买方联系方式</dt>
                <dd>{{orderData.buyerContactMobile}}</dd>
            </dl>
            <dl v-if="orderData.orderContractCode">
                <dt>合同编号</dt>
                <dd>{{orderData.orderContractCode}}<img @click="handleShowContract" :src=icon style="width: 25px;height: 25px"></dd>
            </dl>
            <dl>
                <dt>免仓期</dt>
                <dd>{{orderData.warehouseFreeDays}}天</dd>
            </dl>
            <!--<dl>-->
                <!--<dt>货源</dt>-->
                <!--<dd>{{orderData.skuOrigin}}</dd>-->
            <!--</dl>-->
            <!--<dl>-->
                <!--<dt>质量标准</dt>-->
                <!--<dd>{{orderData.qualityStandard}}</dd>-->
            <!--</dl>-->
            <!--<dl>-->
                <!--<dt>包装标准</dt>-->
                <!--<dd>-->
                    <!--<template v-if="orderData.packagingStandard==0">-->
                        <!--散水-->
                    <!--</template>-->
                    <!--<template v-else-if="orderData.packagingStandard==1">-->
                        <!--桶装货-->
                    <!--</template>-->
                    <!--<template v-else-if="orderData.packagingStandard==2">-->
                        <!--袋装货-->
                    <!--</template>-->
                <!--</dd>-->
            <!--</dl>-->
            <dl>
                <dt>订单状态</dt>
                <dd>
                    <span v-if="orderData.orderStatus===1">签约</span>
                    <span v-else-if="orderData.orderStatus===2">收款与交割</span>
                    <span v-else-if="orderData.orderStatus===3">结算与复核</span>
                    <span v-else-if="orderData.orderStatus===4">已完成</span>
                    <span v-else-if="orderData.orderStatus===5">已失效</span>
                </dd>
            </dl>
        </div>
        <!-- 预览图片 -->
        <el-dialog title="图片预览" :visible.sync="previewerImg.visible" width="700px">
            <el-carousel @change="clickNum = 0" ref="previewerImg" trigger="click" :autoplay="false">
                <el-carousel-item v-for="(item, index) in previewerImg.list" :key="index">
                    <div><a :href="item.invoiceUrl" target="_blank"><img class="previewer-img-detail" :src="item.invoiceUrl"></a></div>
                </el-carousel-item>
            </el-carousel>
            <div @click="rotateImg" class="rotate-img">
                  <i class="iconfont icon-xuanzhuan"></i>
            </div>
        </el-dialog>
        <!-- 预览合同 -->
        <transition name="fade">
            <contract :show-contract.sync="showContract" :show-btn="showHandlechapter" :file="contractUrl"></contract>
        </transition>
    </div>

</template>

<script>
import contract from '@/components/contract';
export default {
    name: 'orderInfo',
    props: {
        orderData: Object
    },
    data () {
        return {
            pdfThumbnail: require('@/assets/images/pdf.png'),
            icon: require('@/assets/images/icon-piao.png'),
            previewerImg: {
                visible: false,
                list: [],
                pdflist: []
            },
            contractUrl: null,
            showHandlechapter: false,
            showContract: false,
            clickNum: 0
        };
    },
    watch: {
        orderData: {
            handler: function (newValue, oldValue) {
                console.log('watch', newValue);
                this.previewerImg.list = newValue.orderInvoiceModel;
            },
            deep: true
        }
    },
    components: {
        contract
    },
    created () {
        this.previewerImg.list = this.orderData.orderInvoiceModel || [];
        this.getInvoice();
    },
    methods: {
        getInvoice () {
            let that = this;
            that.$http.get(that.$api.orders.invoice + '/' + this.orderData.id)
                .then((res) => {
                    console.log(res.data.data);
                    res.data.data.map(function (item) {
                        if (item.invoiceUrl.indexOf('.pdf') === -1) {
                            that.previewerImg.list.push(item);
                        } else {
                            that.previewerImg.pdflist.push(item);
                        }
                    });
                });
        },
        showReceipt () {
            // 查看发票
            this.previewerImg.visible = true;
            // this.$http.get(this.$api.orders.invoice + this.orderData.id)
            //     .then(res => {
            //         if (res.data.code === 0) {
            //             this.previewerImg.visible = true;
            //             this.previewerImg.list = res.data.data;
            //         }
            //     });
        },
        handleShowContract () {
            // 查看合同
            this.$http.get(this.$api.orders.contract + this.orderData.id + '/contracts/getDocUrl')
                .then(res => {
                    if (res.data.code === 0) {
                        this.showContract = true;
                        this.contractUrl = res.data.data.filepath[0];
                    }
                });
        },
        rotateImg () {
            this.clickNum += 1;
            document.querySelectorAll('.el-carousel__item img').forEach((item) => {
                item.style.transform = `rotate(0deg)`;
            });
            document.querySelector('.el-carousel__item.is-active').style.transform = `rotate(${this.clickNum * 90}deg)`;
            console.log(document.querySelector('.el-carousel__item.is-active'));
        }
    }
};
</script>

<style lang="scss" scoped>
    .order-detail{
        .el-carousel__container{
            height: 500px !important;
        }
        .el-carousel__item{
            text-align: center;
            transform-origin: 50% 50%;
            div {
                // position: absolute;
                // left: 0;
                // transform: translateX(-50%)!important;
                height: 100%!important;
                width: 100%;
                overflow: hidden!important;
                img{
                   height: 100%!important;
                   width: 100%;
                }
            }

        }
        .rotate-img {
            color: #000;
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            cursor: pointer;
            i {
              font-size: 30px;
            }
        }
    }
</style>
<style lang="scss">
    .order-detail{
        .el-carousel__container{
            height: 400px;
        }
        .el-dialog__body {
          padding-bottom: 50px;
        }
    }
</style>
