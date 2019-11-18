<!--
    订单发票明细
-->

<template>
<div>
    <table class="gy-table">
        <thead class="trcenter">
            <th>发票代码</th>
            <th>发票来源</th>
            <th>发票凭证</th>
            <th>开票日期</th>
            <th>合计金额(元)</th>
            <th>合计税额(元)</th>
            <th>价税合计(元)</th>
            <th>状态</th>
            <th>操作</th>
        </thead>
        <tbody>
            <tr v-for="(item,index) in orderInvoiceData" :key="index">
                <td>{{item.invoiceInfoModel && item.invoiceInfoModel.invoiceCode || '-'}}</td>
                <td>{{item.type === 1?'上传凭证':'在线开票'}}</td>
                <td>
                    <img v-if="item.invoiceUrl.lastIndexOf('pdf') != -1" style="width:30px" height="20" src="../../../assets/images/pdf.png" @click="showReceipt(item.invoiceUrl)">
                    <img v-else style="width:30px" height="20"  @click="showReceipt(item.invoiceUrl)" :src='item.invoiceUrl'>
                </td>
                <td>{{item.invoiceInfoModel && item.invoiceInfoModel.invoiceIssueDate | date}}</td>
                <td class="align-r">{{item.invoiceInfoModel && item.invoiceInfoModel.amount || '-'}}</td>
                <td class="align-r">{{item.invoiceInfoModel && item.invoiceInfoModel.taxAssessment || '-'}}</td>
                <td class="align-r">{{item.invoiceInfoModel && item.invoiceInfoModel.priceTaxSum || '-'}}</td>
                <td><span :class="{'success':item.statusStr == '已查验','refused':item.statusStr == '已拒绝','failure':item.statusStr == '查验失败'}">{{item.statusStr}}</span></td>
                <td class="align-c">
                    <button @click="loockInvoice(item.id)" class="gy-button-view">查看</button>
                </td>
            </tr>
            <tr v-if="orderInvoiceData.length===0">
                <td colspan="8" class="invoicetd"><i class="iconfont icon-weikong"></i>没有可显示的发票信息</td>
            </tr>
        </tbody>
    </table>
    <invoice-detail ref="invoice"></invoice-detail>
    <!-- 图片查看 -->
    <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
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
            icon2: require('@/assets/images/newfp.png'),
            dialogVisible: false,
            dialogImageUrl: null,
            logisticData: []
        };
    },
    created () {
        console.log(this.orderInvoiceData.length);
    },
    methods: {
        getData () {
            this.$http.post(this.$api.transport.orderList, {
                data: {
                    id: this.orderId,
                    valid: 1
                }
            }).then(res => {
                if (res.data.code === 0) {
                    this.logisticData = res.data.data.list || [];
                } else {
                    this.logisticData = [];
                }
            });
        },
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
        loockInvoice (id) {
            this.$refs.invoice.init(id);
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
</style>
