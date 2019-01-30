<template>
    <div>
        <div class="base-info" v-if="orderData.id">
            <dl v-if="userType === 'sell'">
                <dt>买家</dt>
                <dd>{{orderData.buyerCompanyName}}
                    <!--<span class="im-talk"><i class="iconfont icon-im"></i>和我联系</span>-->
                </dd>
            </dl>
            <dl v-else>
                <dt>卖家</dt>
                <dd>{{orderData.sellerCompanyName}}
                    <!--<span class="im-talk"><i class="iconfont icon-im"></i>和我联系</span>-->
                </dd>
            </dl>
            <dl>
                <dt>免仓期</dt>
                <dd>{{orderData.warehouseFreeDays}}天</dd>
            </dl>
            <dl>
                <dt>交付类型</dt>
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
                <dd>{{orderData.paymentType === 0 ? '先款后货' : '先货后款'}}
                    <template v-if="orderData.paymentType === 1">
                        (买方收到货后{{orderData.paymentTypeText}}个工作日付款)
                    </template>
                </dd>
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
                    {{orderData.provideInvoiceText}}<img @click="showReceipt" :src=icon>
                </dd>
                <!--<dd>{{orderData.provideInvoiceType ? '交割月发票':'交割次月' }}<img @click="showReceipt" v-if="iconsTrue" :src=icons></dd>-->
                <dd v-else>{{orderData.provideInvoiceType === 0 ? '交割当月发票':'交割次月发票' }}<img @click="showReceipt" :src=icon></dd>
            </dl>
            <dl>
                <dt>货源</dt>
                <dd>{{orderData.skuOrigin}}</dd>
            </dl>
            <dl>
                <dt>质量标准</dt>
                <dd>{{orderData.qualityStandard}}</dd>
            </dl>
            <dl>
                <dt>包装标准</dt>
                <dd>
                    <template v-if="orderData.packagingStandard==0">
                        散水
                    </template>
                    <template v-else-if="orderData.packagingStandard==1">
                        桶装货
                    </template>
                    <template v-else-if="orderData.packagingStandard==2">
                        袋装货
                    </template>
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
                <dt>业务联系人</dt>
                <dd>{{orderData.sellerContact}}</dd>
            </dl>
            <dl v-if="orderData.orderContractCode">
                <dt>合同编号</dt>
                <dd>{{orderData.orderContractCode}}<img @click="showContract" :src=icon></dd>
            </dl>
            <dl>
                <dt>业务联系方式</dt>
                <dd>{{orderData.sellerContactMobile}}</dd>
            </dl>
        </div>
        <!-- 预览图片 -->
        <el-dialog title="图片预览" :visible.sync="previewerImg.visible" width="600px" hight="1000px">
            <el-carousel ref="previewerImg" trigger="click" :autoplay="false">
                <el-carousel-item v-for="(item, index) in previewerImg.list" :key="index">
                    <img class="previewer-img-detail" :src="item.invoiceUrl" style="width: 100%;height: 100%">
                </el-carousel-item>
            </el-carousel>
        </el-dialog>
    </div>

</template>
<script>
export default {
    name: 'orderInfo',
    props: {
        orderData: Object,
        userType: {
            type: String,
            default: 'sell'
        }
    },
    data () {
        return {
            icon: require('@/assets/images/icon-piao.png'),
            icons: '',
            iconsTrue: false,
            previewerImg: {
                visible: false,
                list: []
            },
            prebiewImg: {
                list: []
            },
            orderId: ''
        };
    },
    watch: {
        orderData: {
            handler: function (newValue, oldValue) {
                // this.previewerImg.list = newValue.orderInvoiceModel;
            },
            deep: true
        }
    },
    created () {
        console.log('created', this.orderData);
        // this.previewerImg.list = this.orderData.orderInvoiceModel || [];
    },
    methods: {
        showReceipt () {
            // 查看发票
            let that = this;
            that.previewerImg.visible = true;
            // this.$emit('showReceipt');
            that.orderId = that.orderData.id;
            that.$http.get(that.$api.invoice.sellerInvoiceImg + '/' + that.orderId)
                .then((res) => {
                    console.log(that.orderData);
                    that.previewerImg.list = res.data.data;
                });
        },
        // showReceipts () {
        //     // 查看发票
        //     let that = this;
        //     that.orderId = that.orderData.id;
        //     that.$http.get(that.$api.invoice.sellerInvoiceImg + '/' + that.orderId)
        //         .then((res) => {
        //             that.prebiewImg.list = res.data.data;
        //             console.log(res.data.data);
        //             console.log(that.orderData);
        //             // if (that.orderData.orderInvoiceList.length > 0) {
        //             //     that.iconsTrue = true;
        //             //     that.icons = res.data.data[0].invoiceUrl;
        //             //     console.log(that.icons);
        //             // }
        //         });
        // },
        showContract () {
            // 卖方已盖章合同
            if (this.orderData.orderStatusHistoryModelList && this.orderData.orderStatusHistoryModelList.length > 0) {
                this.$emit('showContract');
            }
        }
    }
};
</script>
<style lang="scss" scoped>
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
            width: 110px;
            float: left;
            color:#333;
        }
        dd {
            float: left;
            color: #666;
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
</style>
