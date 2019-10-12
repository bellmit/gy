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
                <td class="align-r">{{order.quantityLoading |numToCash(3)}} {{order.unitOfMeasureDisplayName}}</td>
                <td>{{item.estimatedArrivalEnd | date(1)}}</td>
                <td class="align-r">{{order.quantityUnloading |numToCash(3)}}{{order.unitOfMeasureDisplayName}}</td>
                <td>
                    {{status[item.deliveryOrderStatus]}}
                </td>
                <td>
                    <span v-if="item.imgpdf.length > 0" class="gy-button-view"  @click="showReceipt(item.imgpdf)">查看货权凭证</span>
                    <span v-show="item.pdfimg.length > 0" v-for="(ite, inds) in item.pdfimg" :key="inds">
                        <a :href="ite.filePath" target="_blank">
                            <img style="width: 25px;height: 25px" :src=pdfThumbnail>
                        </a>
                    </span>
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
      <el-dialog class="previewerImgDiv" title="图片预览" :visible.sync="previewerImg.visible" width="700px">
        <el-carousel @change="clickNum = 0" ref="previewerImg" trigger="click" :autoplay="false">
          <el-carousel-item class="previewer-item" v-for="(item, index) in previewerImg.list" :key="index">
             <div><a :href="item.filePath" target="_blank"><img style="width: 100%;height: 100%" class="previewer-img-detail" :src="item.filePath"></a></div>
          </el-carousel-item>
        </el-carousel>
        <div @click="rotateImg" class="rotate-img">
              <i class="iconfont icon-xuanzhuan"></i>
        </div>
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
            clickNum: 0,
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
            status: ['已创建', '待确认', '待签收', '已完成'],
            imgPdf: [],
            pdfThumbnail: require('@/assets/images/pdf.png')
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
                    this.transactionInfo.forEach((item) => {
                        item.deliveryOrderFileList.forEach((e) => {
                            e.fileTypeAlias = this.$tools.getFileTypeAlias(e.filePath);
                        });
                    });
                    this.transactionInfo.forEach((ite) => {
                        ite.pdfimg = [];
                        ite.imgpdf = [];
                        ite.deliveryOrderFileList.forEach((it) => {
                            if (it.fileTypeAlias === 'pdf') {
                                ite.pdfimg.push(it);
                            } else {
                                ite.imgpdf.push(it);
                            }
                        });
                    });
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
            // 查看发票
            this.previewerImg.visible = true;
            this.previewerImg.list = v;
        },
        rotateImg () {
            this.clickNum += 1;
            document.querySelectorAll('.previewer-item div').forEach((item) => {
                item.style.transform = `rotate(0deg)`;
            });
            document.querySelector('.previewer-item.is-active div').style.transform = `rotate(${this.clickNum * 90}deg)`;
            console.log(document.querySelector('.el-carousel__item.is-active'));
        }

    }
};
</script>

<style lang="scss" scoped>
 .el-carousel__item{
        text-align: center;
        transform-origin: 50% 50%;
        overflow-y: auto!important;
        div {
            // position: absolute;
            // left: 0;
            // transform: translateX(-50%)!important;
            img{
                height: 90%!important;
                // width: 400px;
            }
        }
 }
 .rotate-img {
        color: #000;
        position: absolute;
        bottom: -3px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        cursor: pointer;
        i {
          font-size: 30px;
        }
  }
</style>
<style lang="scss">
.previewerImgDiv {
  .el-dialog__body {
  padding-bottom: 50px;
}

}
</style>
