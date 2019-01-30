<!--
    货物交割
-->

<template>
    <div>
        <table class="gy-table">
            <thead>
              <tr class="title">
                  <td>货权单号</td>
                  <td style="width:280px">品名</td>
                  <td>发货日期</td>
                  <td>发货数量</td>
                  <td>签收日期</td>
                  <td>签收数量</td>
                  <td>状态</td>
                  <td>操作</td>
              </tr>
            </thead>
            <tbody v-for="(item, index) in transactionInfo" :key="index">
            <tr class="ge" v-for="(order, ind) in item.deliveryOrderItemList" :key="ind">
                <td class="tleft">{{item.deliveryOrderCode}}</td>
                <td class="tleft">
                    {{order.skuName}}</td>
                <td>{{item.estimatedArrivalStart | date(1)}}</td>
                <td>{{order.quantityLoading |numToCash(3)}} {{order.unitOfMeasureDisplayName}}</td>
                <td>{{item.estimatedArrivalEnd | date(1)}}</td>
                <td>{{order.quantityUnloading |numToCash(3)}}{{order.unitOfMeasureDisplayName}}</td>
                <td>
                    {{status[item.deliveryOrderStatus]}}
                </td>
                <td>
                  <el-button class="gy-button-normal"  @click="showReceipt(item)">查看货权凭证</el-button>
                </td>
            </tr>
            </tbody>
        </table>

        <el-dialog title="货物交割信息" :visible.sync="billFormVisible" width="600px" class="dialog">
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
                    <!--<dl>-->
                        <!--<dt>交割库:</dt>-->
                        <!--<dd>{{orderData.orderItemList && orderData.orderItemList[0].deliveryWarehouseName}}</dd>-->
                    <!--</dl>-->
                    <!--<dl>-->
                        <!--<dt>交割库地址</dt>-->
                        <!--<dd>{{ orderData.orderItemList && orderData.orderItemList[0].deliveryDetailedAddress}}</dd>-->
                    <!--</dl>-->
                    <dl>
                        <dt>交付方式</dt>
                        <dd>{{orderData.deliveryType === 1 ? '买家自提' : '卖家代运'}}</dd>
                    </dl>
                    <dl>
                        <dt>货权单凭证</dt>
                        <dd>
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
                        <td>操作</td>
                    </tr>
                    <tr v-for="(item, index) in orderData.orderItemList" :key="index">
                        <td>{{item.skuName}}</td>
                        <td>{{item.skuQuantity}}吨</td>
                        <td>{{quantityIssued ? quantityIssued :0}}吨</td>
                        <td>{{ billFormData.outNum | numToCash(3) }}吨</td>
                        <td></td>
                    </tr>
                </table>
            </el-form>
        </el-dialog>
      <!-- 预览图片 -->
      <el-dialog title="图片预览" :visible.sync="previewerImg.visible" width="700px">
        <el-carousel ref="previewerImg" trigger="click" :autoplay="false">
          <el-carousel-item v-for="(item, index) in previewerImg.list" :key="index">
            <img style="width: 100%;height: 100%" class="previewer-img-detail" :src="item.filePath">
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
    </div>
</template>

<script>
// import gyUpload from '@/components/upload';

export default {
    name: 'orderTransaction',
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
            previewerImg: {
                visible: false,
                list: []
            },
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
            status: ['已创建', '待确认', '待签收', '已完成']
        };
    },
    created () {
        this.getData();
    },
    methods: {
        getData () {
            this.$http.get(this.$api.orders.transaction + this.orderId)
                .then((res) => {
                    this.transactionInfo = res.data.data;
                    this.quantityIssued = this.transactionInfo.deliveryOrderItemList && this.transactionInfo.deliveryOrderItemList[0].quantityIssued ? this.transactionInfo.deliveryOrderItemList[0].quantityIssued : 0;
                    this.$emit('updateQuantityIssued', this.quantityIssued);
                });
        },
        viewDetail (data) {
            this.billFormVisible = true;
            // this.billFormData = data;
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
        },
        showReceipt (v) {
            console.log(v.deliveryOrderFileList);
            // 查看发票
            this.previewerImg.visible = true;
            this.previewerImg.list = v.deliveryOrderFileList;
            console.log(this.previewerImg.list);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
