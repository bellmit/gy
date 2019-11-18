<!--
    付款明细
-->

<template>
    <table class="gy-table">
      <thead>
        <tr class="title">
            <td>资金单号</td>
            <td>付款类型</td>
            <td>付款单状态</td>
            <td>付款日期</td>
            <td >付款金额</td>
            <td>收款日期</td>
            <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item ,index ) in payList" :key="index">
            <td>{{item.payNumber}}</td>
            <td>
                {{type[item.payMethod]}}
            </td>
            <td>{{payStatus[item.payStatus]}}</td>
            <td>{{item.payTime | date }}</td>
            <td class="align-r">{{item.payTotal | numToCash }}元</td>
            <td>{{item.confirmDate | date }}</td>
            <td>
                <!-- <router-link :to="{name: 'collectionInfo', query:{collectionId:item.id}}" class="gy-button-view">查看</router-link> -->
                <span v-if="item.imgpdf.length > 0" class="gy-button-view"  @click="showReceipt(item.imgpdf)">查看付款凭证</span>
                <span v-show="item.pdfimg.length > 0" v-for="(ite, inds) in item.pdfimg" :key="inds">
                    <a :href="ite.fileUrl" target="_blank">
                       <img style="width: 25px;height: 25px" :src=pdfThumbnail>
                    </a>
                </span>
            </td>
        </tr>
      </tbody>
      <!-- 预览图片 -->
      <el-dialog class="previewerImgDif previewerImgDiv" title="图片预览" :visible.sync="previewerImg.visible" width="700px">
        <el-carousel @change="clickNum = 0"  ref="previewerImg" trigger="click" :autoplay="false" arrow="never">
          <el-carousel-item class="previewer-item1" v-for="(item, index) in previewerImg.list" :key="index">
             <div style="width: 100%;height: 100%"><a :href="item.url" target="_blank"><img style="width: 100%;height: 100%" class="previewer-img-detail" :src="item.url"></a></div>
          </el-carousel-item>
        </el-carousel>
        <div @click="rotateImg" class="rotate-img">
              <i class="iconfont icon-xuanzhuan"></i>
        </div>
        <el-pagination
              background
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :page-size="1"
              :total="previewerImg.list.length">
        </el-pagination>
      </el-dialog>
    </table>
</template>

<script>
export default {
    name: 'orderPayment',
    props: {
        orderNo: {
            type: String,
            default: null
        },
        userType: {
            type: String,
            default: 'sell'
        },
        clickNum: 0
    },
    data () {
        return {
            previewerImg: {
                visible: false,
                list: []
            },
            payList: [],
            payStatus: {
                10: '已创建',
                20: '确认',
                30: '支付中',
                40: '已支付',
                50: '已完成',
                60: '已作废'
            },
            type: [ '', '货款', '保证金', '保证金', '结算', '运费' ],
            pdfThumbnail: require('@/assets/images/pdf.png')
        };
    },
    watch: {
        orderNo (newValue, oldValue) {
            newValue && this.getData();
        }
    },
    created () {
        this.orderNo && this.getData();// 收款单明细
    },
    methods: {
        rotateImg () {
            this.clickNum += 1;
            document.querySelectorAll('.previewer-item1 div').forEach((item) => {
                item.style.transform = `rotate(0deg)`;
            });
            document.querySelector('.previewer-item1.is-active div').style.transform = `rotate(${this.clickNum * 90}deg)`;
        },
        getData () {
            this.$http.post(this.$api.payment.payList, {
                orderNumber: this.orderNo
            }).then(res => {
                if (res.data.code === 0) {
                    this.payList = res.data.data;
                    this.payList.forEach((item) => {
                        item.attachments.forEach((e) => {
                            e.fileTypeAlias = this.$tools.getFileTypeAlias(e.fileUrl);
                        });
                    });
                    this.payList.forEach((ite) => {
                        ite.pdfimg = [];
                        ite.imgpdf = [];
                        ite.attachments.forEach((it) => {
                            if (it.fileTypeAlias === 'pdf') {
                                ite.pdfimg.push(it);
                            } else {
                                ite.imgpdf.push(it);
                            }
                            console.log(ite);
                        });
                    });
                }
            });
        },
        showReceipt (v) {
            var that = this;
            v.map(function (item) {
                if (item.fileUrl.indexOf('http') === -1) {
                    let timestmp = (new Date()).valueOf();
                    item.url = process.env.API_ROOT_MAIN + that.$api.upload.paymentImage + '?filePath=' + item.fileUrl + '&t=' + timestmp;
                } else {
                    item.url = item.fileUrl;
                }
            });
            // 查看发票
            that.previewerImg.visible = true;
            that.previewerImg.list = v;
        },
        handleCurrentChange (val) {
            this.$refs.previewerImg.setActiveItem(val - 1);
        }
    }
};
</script>

<style lang="scss">
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
.previewerImgDif .rotate-img{
    bottom: 60px;
}
.el-carousel__item{
        text-align: center;
        transform-origin: 50% 50%;
        overflow-y: auto!important;
        div {
            // position: absolute;
            // left: 0;
            // transform: translateX(-50%)!important;
            img{
                height: 100%!important;
                // width: 400px;
            }
        }
 }
</style>
