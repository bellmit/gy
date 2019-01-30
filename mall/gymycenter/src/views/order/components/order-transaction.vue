<!--
    货物交割
-->
<template>
    <div>
        <table class="transaction">
            <tr>
                <td style="width:280px">商品</td>
                <td>发货数量</td>
                <td>签收数量</td>
                <td style="width:228px">发货仓库</td>
                <td>操作</td>
            </tr>
            <tbody v-for="(item, index) in transactionInfo" :key="index">
            <tr class="update-title">
                <td colspan="5" class="update-title-dh"><span class="dh-span">单号:</span>{{item.deliveryOrderCode}}</td>
            </tr>
            <tr class="ge" v-for="(order, index) in item.deliveryOrderItemList" :key="index">
                <td class="tleft">
                    <div class="img-box">
                        <img :src=src1 alt="">
                    </div>
                    <span class="img-boxs">
                            {{order.skuName}}<br>{{order.skuPrice|numToCash}}元/{{order.unitOfMeasureDisplayName}}<br>{{order.quantityPlanned}}{{order.unitOfMeasureDisplayName}}
                        </span>
                </td>
                <td>{{order.quantityLoading |numToCash(3)}} {{order.unitOfMeasureDisplayName}}<br></td>
                <td>{{order.quantityUnloading |numToCash(3)}}{{order.unitOfMeasureDisplayName}}</td>
                <td class="tleft">发货仓库：{{item.loadingWarehouseAddress}}<br>发货时间：{{item.estimatedArrivalStart | date(1)}}<br>
                    签收时间：{{item.estimatedArrivalEnd && item.estimatedArrivalEnd | date(1)}}
                </td>
                <td>
                    <button @click="viewDetail(item)" class="gy-button-view" style="background: none">查看</button>
                    <!--签收暂时不做（签收确认时后台返回有问题）-->
                    <!--<button v-if="userType ==='buy'" class="gy-button-normal" @click="signIn(item, order)">签收</button>-->
                </td>
            </tr>
            </tbody>
        </table>

        <el-dialog title="货物交割信息" :visible.sync="billFormVisible" width="800px" class="dialog hhjg-dialog">
            <el-form :model="billForm" size="mini">
                <div class="base-info">
                    <dl>
                        <dt>买家:</dt>
                        <dd>{{orderData.buyerCompanyName}}</dd>
                    </dl>
                    <dl>
                        <dt>订单号:</dt>
                        <dd>{{orderData.odrOrderSn}}</dd>
                    </dl>
                    <dl>
                        <dt>交割库:</dt>
                        <dd>{{orderData.orderItemList && orderData.orderItemList[0].deliveryWarehouseName}}</dd>
                    </dl>
                    <dl>
                        <dt>交割库地址</dt>
                        <dd>{{ orderData.orderItemList && orderData.orderItemList[0].deliveryDetailedAddress}}</dd>
                    </dl>
                    <dl>
                        <dt>交付方式</dt>
                        <dd>{{orderData.deliveryType === 1 ? '买家自提' : '卖家代运'}}</dd>
                    </dl>
                    <dl>
                        <dt>货权单凭证</dt>
                        <dd>
                            <img :src="img" alt="" @click="showImg">
                            <!--<gy-upload :disabled="true" v-model="billFormData.voucher"></gy-upload>-->
                        </dd>
                    </dl>
                </div>
                <table>
                    <tr>
                        <td>品名</td>
                        <td>订单数量</td>
                        <td>已出库数量</td>
                        <td>本次出库数量</td>
                        <!--<td>操作</td>-->
                    </tr>
                    <tr v-for="(item, index) in orderData.orderItemList" :key="index">
                        <td>{{item.skuName}}</td>
                        <td>{{item.skuQuantity}}吨</td>
                        <td>{{ item.quantityIssued | numToCash(3) }}吨</td>
                        <td>{{ item.quantityLoading | numToCash(3) }}吨</td>
                        <!--<td></td>-->
                    </tr>
                </table>
            </el-form>
        </el-dialog>
        <el-dialog title="图片预览" :visible.sync="previewerImg.visible" width="600px" hight="1000px" class="dialog">
            <el-carousel ref="previewerImg" trigger="click" :autoplay="false">
                <el-carousel-item v-for="(item, index) in previewerImg.list" :key="index">
                    <img class="previewer-img-detail" :src="item.filePath" style="width: 100%;height: 100%">
                </el-carousel-item>
            </el-carousel>
        </el-dialog>
    </div>

</template>

<script>
import gyUpload from '@/components/upload';
export default {
    name: 'orderTransaction',
    components: {
        gyUpload
    },
    props: {
        orderData: Object,
        orderId: [Number, String],
        userType: {
            type: String,
            default: 'sell'
        }
    },
    data () {
        return {
            transactionInfo: [],
            quantityIssued: 0,
            src1: require('@/assets/images/default1.jpg'),
            src: require('@/assets/images/default.jpg'),
            icon: require('@/assets/images/icon-piao.png'),
            billFormVisible: false,
            billForm: {},
            billFormData: {
                voucher: [],
                outNum: 1
            },
            img: '',
            previewerImg: {
                visible: false
            },
            imgList: []
        };
    },
    created () {
        this.getData();
    },
    methods: {
        getData () {
            this.$http.get(this.$api.order.transaction + this.orderId)
                .then((res) => {
                    this.transactionInfo = res.data.data;
                    this.quantityIssued = this.transactionInfo.deliveryOrderItemList && this.transactionInfo.deliveryOrderItemList[0].quantityIssued ? this.transactionInfo.deliveryOrderItemList[0].quantityIssued : 0;
                    this.$emit('updateQuantityIssued', this.quantityIssued);
                });
        },
        viewDetail (data) {
            console.log(data);
            this.billFormVisible = true;
            // this.billFormData = data;
            this.$http.get('/trade/order/v1/deliveryOrders/' + data.id).then(res => {
                if (res.data.code === 0) {
                    this.img = res.data.data.deliveryOrderFileList && res.data.data.deliveryOrderFileList[0].filePath;
                    this.imgList = res.data.data.deliveryOrderFileList;
                } else {
                    this.$message('获取不到交割凭证单');
                }
            });
        },
        showImg () {
            this.previewerImg.visible = true;
            this.previewerImg.list = this.imgList;
        },
        signIn (data, dataItem) {
            this.$prompt(`请输入"${dataItem.skuName}"签收数量`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then((value) => {
                this.$http.get(this.$api.order.receipt,
                    {
                        deliveryOrderFileList: [],
                        deliveryOrderItemList: [
                            {
                                'id': dataItem.id, // 货权单明细id
                                'quantityUnloading': Number(value.value) // 货权单明细签收数量
                            }
                        ],
                        id: data.id // 货权单id
                    })
                    .then(res => {
                        if (res.data.code === 0) {
                            this.getData();
                            this.$message({
                                type: 'info',
                                message: '已签收'
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: '签收失败，' + res.data.data
                            });
                        }
                    });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消签收'
                });
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    .transaction tr td {
        padding: 10px;
        text-align: center;
    }

    .transaction tr.update-title td {
        background: #fbfbfc;
        text-align: center;
        padding: 0 10px 0;
    }

    .transaction tr td.tleft {
        text-align: left;
        padding-left: 10px;
    }

    .tleft {
        .img-box {
            display: inline-block;
            float: left;
        }
        .img-boxs {
            display: inline-block;
            float: left;
        }
        .img-box img {
            width: 60px;
        }
    }

    .base-info {
        margin: 10px;
        overflow: hidden
    }

    .base-info dl {
        width: 50%;
        float: left;
        font-size: $small-font;
        text-align: left;
        min-height: 30px;
        margin: 0;
        dt {
            width: 80px;
            float: left;
            margin: auto 10px;
            color: $color-title;
            font-size: 14px;
        }
        dd {
            float: left;
            color: $color-main;
            padding-left: 10px;
            font-size: 14px;

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
    .update-title-dh{
        background: #fbfbfc !important;
        text-align: right !important;
        padding-right: 16px !important;
        color: #666!important;
        font-weight: normal !important;
        .dh-span{
            color: #999;
            margin-right: 5px;
        }
    }
</style>
<style lang="scss">
    .hhjg-dialog{
        .el-dialog__body{
            padding: 10px 16px 30px;
        }
    }
</style>
