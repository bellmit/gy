<!--
    订单发票明细
-->

<template>
<div>
    <table class="gy-table">
        <thead class="trcenter">
            <th>发票代码</th>
            <th>买家</th>
            <th>卖家</th>
            <th>发票金额（元）</th>
            <th>价税合计（元）</th>
            <th width="100">开票日期</th>
            <th>发票凭证</th>
            <th width="100">上传时间</th>
            <th>状态</th>
            <th>查验备注</th>
            <th width="100">操作</th>
        </thead>
        <tbody>
            <tr v-for="(item,index) in orderInvoiceData" :key="index">
                <td>{{item.invoiceInfoModel && item.invoiceInfoModel.invoiceCode || '-'}}</td>
                <td>{{item.invoiceInfoModel && item.invoiceInfoModel.buyerName || '-'}}</td>
                <td>{{item.invoiceInfoModel && item.invoiceInfoModel.sellerName || '-'}}</td>
                <td class="align-r">{{item.invoiceInfoModel && item.invoiceInfoModel.amount || '-'}}</td>
                <td class="align-r">{{item.invoiceInfoModel && item.invoiceInfoModel.priceTaxSum || '-'}}</td>
                <td>{{item.invoiceInfoModel && item.invoiceInfoModel.invoiceIssueDate | date}}</td>
                <td><img style="width:30px" height="20"  @click="showReceipt(item.invoiceUrl)" :src='item.invoiceUrl'></td>
                <td>{{item.createdDate | date}}</td>
                <td>
                    <span :class="{'success':item.statusStr == '已查验','refused':item.statusStr == '已拒绝','failure':item.statusStr == '查验失败'}">{{item.statusStr}}</span>
                </td>
                <td>
                   {{item.remark || '-'}}
                </td>
                <td>
                    <button v-if="item.status != 0"  @click="loockInvoice(item.id)" class="gy-button-view">查看</button>
                    <!-- <button  @click="loockInvoice(item.id)" class="gy-button-view">查看</button> -->
                    <button v-if="item.status == 0 || item.status == 3" @click="showCheck(item.invoiceUrl, item.id)" class="gy-button-view">查验</button>
                    <button v-if="item.status!= 2" @click="refuse(item.id)" class="gy-button-view">拒绝</button>
                </td>
            </tr>
            <tr v-if="orderInvoiceData.length == 0">
                <td colspan="11" class="invoicetd"><i class="iconfont icon-weikong"></i>没有可显示的发票信息</td>
            </tr>
        </tbody>
    </table>
    <invoice-detail ref="invoice"></invoice-detail>
    <!-- 图片查看 -->
    <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
     <el-dialog class="refuse-dialog" :visible.sync="showRefuse" title="发票拒绝">
       <div class="refuse-con gy-form-group">
          <span class="l">拒绝原因</span>
           <el-select v-model="refuseRemark" placeholder="请选择"  class="refuse-option">
              <el-option
                v-for="item in rejectReason"
                :key="item.label"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
      </div>
      <div  v-show="refuseRemark == '其他'" class="refuse-con gy-form-group">
          <span class="l">填入原因</span>
          <textarea class="gy-textarea" v-model="otherRefuseRemark" cols="30" rows="10"></textarea>
      </div>
        <div class="box fr">
              <button class="gy-button-extra" @click="sendRefuse">确定</button>
              <button class="gy-button-normal" @click="showRefuse = false">取消</button>
        </div>
        <div class="clearfix"></div>
    </el-dialog>
     <el-dialog  class="check-dialog" width="1070px"  :visible.sync="showCheckInvoice" title="发票查验">
         <div class="check-con">
             <div @click="showReceipt(invoiceImg)" class="invoice-img-con">
                 <img :src="invoiceImg" alt="">
             </div>
             <div class="gy-form  check-form">
                 <div class="gy-form-group">
                      <span class="l isRequired">发票类型</span>
                      <div class="check-box">
                         <el-radio v-model="checkInfo.invoiceType" label="01">增值税专用发票</el-radio>
                         <el-radio v-model="checkInfo.invoiceType" label="04">增值税普通发票</el-radio>
                      </div>
                 </div>
                 <div class="gy-form-group">
                      <span class="l isRequired">发票代码</span>
                       <input type="text" v-model="checkInfo.invoiceCode" placeholder="请输入发票代码">
                 </div>
                  <div class="gy-form-group">
                      <span class="l isRequired">发票编号</span>
                       <input type="text" v-model="checkInfo.invoiceNum" placeholder="请输入发票编号">
                 </div>
                  <div class="gy-form-group">
                      <span class="l isRequired">开票日期</span>
                       <el-date-picker
                            v-model="checkInfo.invoiceIssueDate"
                            type="date"
                            style="width: 100%;"
                            placeholder="请选择开票日期"
                            @change='startDateChange'>
                        </el-date-picker>
                 </div>
                  <div v-if="checkInfo.invoiceType == '01'"  class="gy-form-group">
                      <span class="l isRequired">发票金额(不含税)</span>
                       <input type="text" v-model="checkInfo.amount" placeholder="请输入发票金额(不含税)">
                 </div>
                  <div v-if="checkInfo.invoiceType == '04'" class="gy-form-group">
                      <span class="l isRequired">校验码后6位</span>
                       <input type="text" v-model="checkInfo.checkCode" placeholder="请输入校验码后六位">
                 </div>
             </div>
             <div class="check-bottom">
               <span><span style="color:#E59640">温馨提示：</span><span>点击“开始识别”，系统将自动识别发票信息，查验前请核对票面和输入信息。</span></span>
              <div>
                  <button class="gy-button-extra" @click="discernInvoice">开始识别</button>
                  <button :class="{'is-can-check': !isCanCheck}" class="gy-button-normal" @click="checkInvoice">开始查验</button>
                  <button class="gy-button-normal" @click="resetting">重置</button>
              </div>
             </div>
         </div>
    </el-dialog>

</div>
</template>

<script>
import invoiceDetail from './invoice-detail';

export default {
    name: 'orderInvoice',
    components: {
        invoiceDetail
    },
    props: {
        orderData: Object,
        orderInvoiceData: Array
    },
    data () {
        return {
            icon2: require('@/assets/images/icon-piao.png'),
            dialogVisible: false,
            dialogImageUrl: null,
            logisticData: [],
            showRefuse: false,
            refuseRemark: '',
            refuseId: '',
            rejectReason: [
                {label: '凭证/发票与实际订单不符，请重新上传'},
                {label: '凭证/发票拍摄不完整或模糊，无法查看，请重新上传'},
                {label: '凭证/发票有涂改，影响内容真实性，请确认后重新上传'},
                {label: '凭证/发票有缺失，请尽快补充上传'},
                {label: '其他'}
            ],
            showCheckInvoice: false,
            invoiceImg: '',
            invoiceId: '',
            checkInfo: {
                checkCode: '',
                amount: '',
                invoiceCode: '',
                invoiceIssueDate: '',
                invoiceNum: '',
                invoiceType: '01'
                // orderInvoiceId: ''
            },
            otherRefuseRemark: '',
            isCanCheck: false
        };
    },
    watch: {
        refuseRemark (oldValue, newValue) {
            if (newValue !== '其他') {
                this.otherRefuseRemark = '';
            }
        },
        showCheckInvoice (oldValue, newValue) {
            if (newValue === false) {
                this.resetting();
            }
        }
        // checkInfo: {
        //     handler (oldValue, newValue) {
        //         let flag = true;
        //         Object.keys(newValue).forEach((key) => {
        //             if (newValue[key] === '') {
        //                 if ((this.checkInfo.invoiceType === '01' && key === 'checkCode') || (this.checkInfo.invoiceType === '04' && key === 'amount')) {
        //                 } else {
        //                     this.isCanCheck = false;
        //                     flag = false;
        //                 }
        //             }
        //         });
        //         (flag === true) && (this.isCanCheck = true);
        //     },
        //     deep: true,
        //     immediate: true
        // }
    },
    mounted () {
    },
    methods: {
        // 发票查看
        showReceipt (item) {
            console.log(item);
            if ((item.indexOf('.pdf') === -1)) {
                this.dialogImageUrl = item;
                this.dialogVisible = true;
            } else {
                window.open(item, '_blank');
            }
        },
        refuse (id) {
            this.showRefuse = true;
            this.refuseId = id;
        },
        sendRefuse () {
            let remark = this.refuseRemark === '其他' ? this.otherRefuseRemark : this.refuseRemark;
            this.$http.post(this.$api.orders.refusedInvoice, {id: this.refuseId, remark}).then((res) => {
                this.$message(res.data.message);
                this.showRefuse = false;
                this.$emit('getInfoList', true);
            });
        },
        loockInvoice (id) {
            this.$refs.invoice.init(id);
        },
        startDateChange () {

        },
        showCheck (url, id) {
            this.showCheckInvoice = true;
            this.invoiceImg = url;
            this.invoiceId = id;
        },
        discernInvoice () {
            // this.invoiceId = 2031492084;
            this.$http.get(this.$api.orders.discernInvoice + this.invoiceId + '/discern').then((res) => {
                if (res.data.code === 0) {
                    Object.assign(this.checkInfo, res.data.data);
                    this.checkInfo.invoiceIssueDateLong = null;
                    this.checkInfo.invoiceIssueDateStr = null;
                    this.isCanCheck = true;
                    this.$forceUpdate();
                }
                this.$message(res.data.message);
            });
        },
        resetting () {
            Object.keys(this.checkInfo).forEach((key) => {
                this.checkInfo[key] = '';
            });
            this.checkInfo.invoiceType = '01';
        },
        checkInvoice () {
            if (!this.isCanCheck) {
                return;
            }
            this.$http.post(this.$api.orders.check + this.invoiceId + '/check', this.checkInfo).then((res) => {
                this.$message(res.data.message);
                this.showCheckInvoice = false;
                this.$emit('getInfoList', true);
            });
        }

    }
};
</script>

<style lang="scss" scoped>
.gy-table{
    .trcenter{
        text-align: center;
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
    .invoicetd{
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
}
.clearfix:after {
    clear: both;
    content: '';
    height: 0;
    display: block;
}
.clearfix {
  zoom: 1;
}
.check-dialog {
  .check-con {
    .invoice-img-con {
       width: 120px;
       height:120px;
       float:left;
       margin-right: 15px;
       img {
         width: 100%;
         height: 100%;
       }
    }
    .check-form {
          width: 86%;
          float: right;
          padding-left: 0;
          padding-top: 0px;
          .gy-form-group {
              position: relative;
            .l {
               width: 155px;
            }
            .isRequired::before {
                content: "*";
                color: #f56c6c;
                position: absolute;
                left: -8px;
                    // margin-right: 4px;
              }
          }
        .check-box {
          width: 350px;
      }
    }
    .check-bottom {
      width: 100%;
      float: right;
      text-indent: 12%;
      div {
        float: right;
        width: 28%;
      }
    }
  }
}
.is-can-check {
  background-color: #ddd!important;
  cursor: text;
  &:hover {
    border: 1px solid #e6eaea!important;
    color: #666;
  };
}
</style>
<style lang="scss">
  .refuse-con {
      width: 100%;
      margin:20px 0  5px;
      .refuse-option {
        // display: inline-block;
        // width: 80%;
      }
   }
   .refuse-dialog {
      .el-dialog__body {
        // height: 250px;
        padding: 20px 15px;
      }
       .box {
        button:nth-child(1) {
          margin-right: 10px;
        }
      }
   }
   .check-dialog {
     .el-dialog__body {
        padding: 20px 15px;
        height: 240px;
      }
      .el-radio {
        margin-left: 0px;
        margin-right:10px ;
      }
   }
     .tdColor  {
     color: #E54840!important;
   }

</style>
