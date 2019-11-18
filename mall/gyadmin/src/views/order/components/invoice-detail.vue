<template>
    <div class="invoiceDetail" v-if="invoiceDialog">
        <el-dialog width="1072px" class="order-dialog"
                    :close-on-click-modal = "false"
                    title = "发票详情"
                    :visible.sync="invoiceDialog">
                <div  class="cyresults">
                  <div v-if="invoiceInfoModel&&invoiceDetail.status == 1">
                    <div style="padding: 8px 0 24px 0px;">
                        <i class="el-icon-tickets"></i>
                        <span class="title">查验结果</span>
                    </div>
                    <div  class="billtop">
                        <div class="title">浙江增值税专用发票</div>
                        <ul class="nav">
                            <li>发票代码<span>{{invoiceInfoModel.invoiceCode}}</span></li>
                            <li>发票号码<span>{{invoiceInfoModel.invoiceNum}}</span></li>
                            <li>开票日期<span>{{invoiceInfoModel.invoiceIssueDate|date}}</span></li>
                            <li>校验码<span>{{invoiceInfoModel.checkCode}}</span></li>
                            <li>机器编码<span>{{invoiceInfoModel.mac}}</span></li>
                        </ul>
                    </div>
                    <ul class="gy-invoice-group">
                        <li class="l">购买方</li>
                        <li>
                            <div class="gy-invoice-item">
                                <span class="l">名称</span>
                                <div class="tinct">{{invoiceInfoModel.buyerName}}</div>
                            </div>
                            <div class="gy-invoice-item">
                                <span class="l">纳税人识别号</span>
                                <div class="tinct">{{invoiceInfoModel.buyerTaxNum}}</div>
                            </div>
                            <div class="gy-invoice-item">
                                <span class="l">地址、电话</span>
                                <div class="tinct">{{invoiceInfoModel.buyerAddressTel}}</div>
                            </div>
                            <div class="gy-invoice-item">
                                <span class="l">开户行及账号</span>
                                <div class="tinct">{{invoiceInfoModel.buyerBankAccount}}</div>
                            </div>
                        </li>
                        <li class="l">密码区</li>
                        <li class="gy-invoice-item"></li>
                    </ul>
                    <table class="gy-table">
                        <thead>
                            <tr>
                                <th style="width: 229px;">货物或应税劳务、服务名称</th>
                                <th style="width: 150px;">规格型号</th>
                                <th style="width: 50px;">单位</th>
                                <th style="width: 70px;">数量</th>
                                <th style="width: 190px;">单价</th>
                                <th style="width: 119px;">金额</th>
                                <th style="width: 100px;">税率</th>
                                <th style="width: 142px;">税额</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="displayline" v-for="(item, index) in invoiceInfoModel.invoiceInfoDetailModelList" :key="index">
                                <td>{{item.goodsName}}</td>
                                <td>{{item.typeSpecification}}</td>
                                <td>{{item.measurementUnit}}</td>
                                <td class="align-r">{{item.goodsNumber}}</td>
                                <td class="align-r">{{item.taxFreePrice}}</td>
                                <td class="align-r">{{item.subAmount}}</td>
                                <td class="align-r">{{item.taxRate}}</td>
                                <td class="align-r">{{item.subTaxAssessment}}</td>
                            </tr>
                            <tr class="displayline">
                                <td colspan="5"><span style="color: #666;">合计</span></td>
                                <td class="align-r">{{invoiceInfoModel.amount}}</td>
                                <td></td>
                                <td class="align-r">{{invoiceInfoModel.taxAssessment}}</td>
                            </tr>
                            <tr style="border-top:1px solid #E7ECF1">
                                <td colspan="7">价税合计（大写）<span style="margin-left:20px;" class="tinct">{{invoiceInfoModel.priceTaxSumBig}}</span></td>
                                <td class="align-r">(小写)<span class="tinct">￥{{invoiceInfoModel.priceTaxSum}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <ul class="gy-invoice-group" style="border-bottom:1px solid #E7ECF1">
                        <li class="l">销售方</li>
                        <li>
                            <div class="gy-invoice-item">
                                <span class="l">名称</span>
                                <div class="tinct">{{invoiceInfoModel.sellerName}}</div>
                            </div>
                            <div class="gy-invoice-item">
                                <span class="l">纳税人识别号</span>
                                <div class="tinct">{{invoiceInfoModel.sellerTaxNum}}</div>
                            </div>
                            <div class="gy-invoice-item">
                                <span class="l">地址、电话</span>
                                <div class="tinct">{{invoiceInfoModel.sellerAddressTel}}</div>
                            </div>
                            <div class="gy-invoice-item">
                                <span class="l">开户行及账号</span>
                                <div class="tinct">{{invoiceInfoModel.sellerBankAccount}}</div>
                            </div>
                        </li>
                        <li class="l">备注</li>
                        <li style="padding-top:7px;color: #3765A3;">
                            {{invoiceInfoModel.memo}}
                        </li>
                    </ul>
                </div>
              <div v-if="!invoiceInfoModel || invoiceDetail.status !== 1" class="gy-form">
                  <div class="gy-form-group">
                    <span class="l">上传时间</span>
                    <span>{{invoiceDetail.createdDate |date}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">状态</span>
                    <span :class="{'success':invoiceDetail.statusStr == '已查验','refused':invoiceDetail.statusStr == '已拒绝','failure':invoiceDetail.statusStr == '查验失败'}">{{invoiceDetail.statusStr}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">查验时间</span>
                    <span>{{invoiceInfoModel && invoiceInfoModel.examineDate |date}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">发票凭证</span>
                    <span>
                        <img v-if="invoiceDetail.invoiceUrl.lastIndexOf('pdf') != -1" style="width:30px" height="20" src="../../../assets/images/pdf.png" @click="showReceipt(invoiceDetail.invoiceUrl)">
                        <img v-else style="width:30px" height="20"  @click="showReceipt(invoiceDetail.invoiceUrl)" :src='invoiceDetail.invoiceUrl'>
                    </span>
                </div>
                <div class="gy-form-group single-row" v-if="invoiceDetail.status == 2">
                    <span class="l">拒绝原因</span>
                    <span>{{invoiceDetail.remark}}</span>
                </div>
                <div style="margin-left: -20px">
                    <i class="el-icon-tickets"></i>
                    <span class="title">查验结果</span>
                </div>
                 <div class="invoicenone" v-if="invoiceDetail.status !== 1">
                    <i class="iconfont icon-weikong"></i>发票{{invoiceDetail.statusStr}}，没有可显示的发票明细
                </div>
                </div>
                <div  v-else  class="detail-info">
                    <div class="item">
                        <span class="l">上传时间</span>
                        <span>{{invoiceDetail.createdDate |date(true)}}</span>
                    </div>
                    <div class="item">
                        <span class="l">查验时间</span>
                        <span v-if='invoiceDetail.invoiceInfoModel'>{{invoiceDetail.invoiceInfoModel.examineDate|date}}</span>
                    </div>
                    <div class="item">
                        <span class="l">状态</span>
                        <span :class="{'success':invoiceDetail.statusStr == '已查验','refused':invoiceDetail.statusStr == '已拒绝','failure':invoiceDetail.statusStr == '查验失败'}">{{invoiceDetail.statusStr}}</span>
                    </div>
                <div v-if="invoiceInfoModel || invoiceDetail.status !== 1" class="tips-bottom">
                    <span class="left">温馨提示：</span>
                    <span class="right">
                      <div >本平台仅提供所查询发票票面信息的查验结果；</div>
                       <div>若发现发票查验结果和实际交易不符，可拒绝发票，需客户重新上传。</div>
                    </span>
                </div>
                </div>
                    <div class="footerbtn">
                        <button class="gy-button-extra" @click="close">关闭</button>
                    </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: 'invoiceDetail',
    props: {
        orderData: Object,
        orderIds: Object
    },
    data () {
        return {
            icon2: require('@/assets/images/icon-piao.png'),
            invoiceDialog: false,
            invoiceDetail: [],
            invoiceInfoModel: {
                examineDates: 1111111
            },
            saleOrBuy: null
        };
    },
    mounted () {
    },
    methods: {
        init (id) {
            this.invoiceDialog = true;
            this.getInvoiceDetail(id);
            // this.$forceUpdate();
        },
        getInvoiceDetail (id) {
            this.$http.get(this.$api.orders.getInvoiceDetail + id)
                .then((res) => {
                    this.invoiceDetail = res.data.data;
                    this.invoiceInfoModel = res.data.data.invoiceInfoModel;
                    console.log(this.invoiceInfoModel);
                });
        },
        showReceipt (item) {
            this.$parent.showReceipt(item);
        },
        close () {
            this.invoiceDialog = false;
            // this.$forceUpdate();
        }
    }

};
</script>

<style lang="scss" scoped>
.invoiceDetail{
    .cyresults{
        overflow: hidden;
        padding: 0 16px;
        .title{
            font-weight: bold;
            font-size: 14px;
            color: #333333;
            line-height: 14px;
        }
    }
    .billtop{
        border: 1px solid #F1F1F1;
        .title{
            padding: 16px 0 10px 0;
            text-align: center;
        }
        .nav{
            overflow: hidden;
            padding: 0 0 8px 28px;
            font-size: 12px;
            color: #333333;
            li{
                float: left;
                padding: 0 42px 0px 0;
                span{
                    padding-left: 22px;
                    color: #666;
                }
            }
        }
    }
    .gy-invoice-group{
        color: #666666;
        font-size: 12px;
        height: 146px;
        border-right: 1px solid #E7ECF1;
        li{
            border-left: 1px solid #E7ECF1;
            float: left;
            height: 146px;
            &:nth-child(even){
                width: 470px;
                padding: 0 16px;
            }
            &:nth-child(odd){
                padding: 40px 14px;
                width: 42px;
            }
        }
    }
    .tinct{
        color: #3765A3;
    }
    .gy-invoice-item{
        width: 100%;
        position: relative;
        padding: 7px 0px 0px 90px;
        min-height: 30px;
        color: $color-main;
        .l{
            position: absolute;
            left: 0;
            top: 0;
            padding-top: 7px;
            color: $color-title;
            width: 80px;
        }
    }
    .gy-table{
        tr:nth-child(odd) td {
            font-weight: none;
            background: none;
        }
        tr:nth-child(even) td {
            font-weight: none!important;
        }
        tr:hover{
            background: none;
        }
        td {
            padding: 0 8px;
            height: 32px;
            line-height: 32px;
        }
        .displayline{
            td{
                color: #3765A3!important;
                border-bottom: none;
            }
        }
    }
    .footerbtn{
        text-align: right;
        padding-top: 25px;
    }
    .detail-info {
      margin-top:15px ;
      div {
        display: inline-block;
        // width: 16%;
        &:nth-child(n+1) {
          margin-right:80px ;
        }
      }
       .l {
         margin-right:30px !important;
       }
      .invoice-img {
        width: 40px;
        height: 40px;
        display: inline-block;
        img {
          width: 100%;
          height: 100%;
          margin-left: 20px;
        }
      }
      .item-remark {
        width: 100%;
      }
    }
    .invoice-result {
      border-top: 1px dotted #666!important;
      margin-top: 40px;
      padding-top: 20px;
      div:nth-child(2) {
        width: 100%;
        margin:50px 0;
        text-align: center;
      }
    }
}
 .tips-bottom {
       width:100%;
       margin-top: 15px;
       .left{
         float: left!important;
         display: inline-block;
           color: #E59640;
       }
       .right {
         float: left;
         div {
           width: 100%;
         }
       }
    }
 .success{
        color: #0FD400;
    }
.refused {
    color: #E02020;
}
.failure{
    color: #F96043;
}
  .invoicenone{
        height: 64px;
        text-align: center;
        position: relative;
        .icon-weikong{
            font-size: 30px;
            position: relative;
            top: -2px;
            left: -5px;
        }
    }
</style>

<style lang="scss">
  .invoiceDetail{
    .el-dialog__body{
        padding: 10px 0 30px 0!important;
    }
}
</style>
