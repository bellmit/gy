<template>
    <div class="invoiceDetail" v-if="invoiceDialog">
        <el-dialog width="1072px" class="order-dialog"
                    :close-on-click-modal = "false"
                    title = "发票详情"
                   :visible.sync="invoiceDialog">
                <div style="margin-top:14px"></div>
                <div class="cyresults" v-if="taxInvoiceApplicationModel && taxInvoiceApplicationModel.taxInvoiceApplicationDetailList && sellerCompanyTaxModel">
                    <div class="billtop">
                        <div class="title">浙江增值税专用发票</div>
                        <ul class="nav">
                            <li>发票代码<span>{{taxInvoiceApplicationModel.invoiceCode}}</span></li>
                            <li>发票号码<span>{{taxInvoiceApplicationModel.invoiceNum}}</span></li>
                            <li>开票日期<span>{{today | datems}}</span></li>
                            <li>校验码<span>-</span></li>
                            <li>机器编码<span>-</span></li>
                        </ul>
                    </div>
                    <ul class="gy-invoice-group">
                        <li class="l">购买方</li>
                        <li>
                            <div class="gy-invoice-item">
                                <span class="l">名称</span>
                                <div class="tinct">{{taxInvoiceApplicationModel.title}}</div>
                            </div>
                            <div class="gy-invoice-item">
                                <span class="l">纳税人识别号</span>
                                <div class="tinct">{{taxInvoiceApplicationModel.taxpayerno}}</div>
                            </div>
                            <div class="gy-invoice-item">
                                <span class="l">地址、电话</span>
                                <div class="tinct">{{taxInvoiceApplicationModel.registeredAddress}}{{taxInvoiceApplicationModel.phone}}</div>
                            </div>
                            <div class="gy-invoice-item">
                                <span class="l">开户行及账号</span>
                                <div class="tinct">{{taxInvoiceApplicationModel.bank}}{{taxInvoiceApplicationModel.bankAccount}}</div>
                            </div>
                        </li>
                        <li class="l">密码区</li>
                        <li class="gy-invoice-item"></li>
                    </ul>
                    <table class="gy-table">
                        <thead>
                            <tr>
                                <th style="width: 229px;">货物或应税劳务、服务名称</th>
                                <th style="width: 166px;">规格型号</th>
                                <th style="width: 50px;">单位</th>
                                <th style="width: 100px;">数量</th>
                                <th style="width: 190px;">单价</th>
                                <th style="width: 119px;">金额（含税）</th>
                                <th style="width: 110px;">税率</th>
                                <th style="width: 132px;">税额</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in taxInvoiceApplicationModel.taxInvoiceApplicationDetailList" :key="index">
                            <tr class="displayline">
                                <td>{{item.productName}}</td>
                                <td>{{item.productModel}}</td>
                                <td>{{item.unit}}</td>
                                <td class="align-r">
                                    <input type="text" class="align-r tinct" v-model="invoiceFrom.goodsNumber">
                                </td>
                                <td class="align-r">
                                    <!-- {{invoiceFrom.taxFreePrice}} -->
                                    <input type="text" readonly class="align-r tinct" v-model="invoiceFrom.taxFreePrice">
                                </td>
                                <td class="align-r">
                                    <input type="text" class="align-r tinct" v-model="invoiceFrom.subAmount">
                                </td>
                                <td class="align-r">
                                    <el-select placeholder="请选择" class="tinct" v-model="invoiceFrom.taxRate">
                                        <el-option
                                            v-for="item in taxRateList"
                                            :key="item.value"
                                            :value="item.label"
                                            :label="item.value">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td class="align-r">
                                    {{invoiceFrom.subTaxAssessment}}
                                </td>
                            </tr>
                            <tr class="displayline">
                                <td colspan="5"><span style="color: #666;">合计</span></td>
                                <td class="align-r">{{addFrom.invoiceInfoModel.amount}}</td>
                                <td></td>
                                <td class="align-r">{{invoiceFrom.subTaxAssessment}}</td>
                            </tr>
                            <tr style="border-top:1px solid #E7ECF1">
                                <td colspan="7">价税合计（大写）<span style="margin-left:20px;" class="tinct">{{invoiceFrom.subAmount | sumInWords}}</span></td>
                                <td class="align-r">(小写)<span class="tinct">￥{{invoiceFrom.subAmount}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                    <ul class="gy-invoice-group" style="border-bottom:1px solid #E7ECF1">
                        <li class="l">销售方</li>
                        <li>
                            <div class="gy-invoice-item">
                                <span class="l">名称</span>
                                <div class="tinct">{{sellerCompanyTaxModel.title}}</div>
                            </div>
                            <div class="gy-invoice-item">
                                <span class="l">纳税人识别号</span>
                                <div class="tinct">{{sellerCompanyTaxModel.taxpayerno}}</div>
                            </div>
                            <div class="gy-invoice-item">
                                <span class="l">地址、电话</span>
                                <div class="tinct">{{sellerCompanyTaxModel.registeredAddress}} {{sellerCompanyTaxModel.phone}}</div>
                            </div>
                            <div class="gy-invoice-item">
                                <span class="l">开户行及账号</span>
                                <div class="tinct">{{sellerCompanyTaxModel.bank}} {{sellerCompanyTaxModel.bankAccount}}</div>
                            </div>
                        </li>
                        <li class="l">备注</li>
                        <li style="padding-top:7px;">
                            <textarea class="gy-textarea" style="height: 126px;color: #3765A3;" v-model="taxInvoiceApplicationModel.remark"></textarea>
                            <!-- {{taxInvoiceApplicationModel.remark}} -->
                        </li>
                    </ul>
            </div>
            <div class="footerbtn">
                <span class="fl">开票人：{{addFrom.invoiceInfoModel.username}}</span>
                <span class="fr">
                    <button class="gy-button-normal" @click="invoiceDialog = false">取消</button>
                    <button class="gy-button-extra" @click="submit">开具发票</button>
                </span>
            </div>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: 'invoiceProvide',
    props: {
        invoiceProvide: Boolean,
        id: String
    },
    data () {
        return {
            invoiceDialog: false,
            taxInvoiceApplicationModel: null,
            sellerCompanyTaxModel: null,
            taxInvoiceApplicationDetailList: [],
            saleOrBuy: null,
            taxRateList: [
                {
                    value: '0%',
                    label: 0
                },
                {
                    value: '3%',
                    label: 0.03
                },
                {
                    value: '9%',
                    label: 0.09
                },
                {
                    value: '13%',
                    label: 0.13
                }],
            today: new Date(),
            addFrom: {
                taxInvoiceApplicationId: 19,
                updatedBy: JSON.parse(localStorage.getItem('userInfo')).id,
                invoiceInfoModel: {}
            },
            invoiceApplicationId: null,
            invoiceFrom: {}
        };
    },
    watch: {
        // 数量
        'invoiceFrom.goodsNumber' (newValue, oldValue) {
            if (this.invoiceFrom.taxFreePrice && this.invoiceFrom.goodsNumber) {
                this.invoiceFrom.subAmount = this.$tools.toFixedFn(newValue * this.invoiceFrom.taxFreePrice, 2);
            }
        },
        // 金额
        'invoiceFrom.subAmount' (newValue, oldValue) {
            this.addFrom.invoiceInfoModel.amount = this.$tools.toFixedFn(newValue / (1 + this.invoiceFrom.taxRate), 2);
            this.invoiceFrom.subTaxAssessment = this.$tools.toFixedFn(newValue - this.addFrom.invoiceInfoModel.amount, 2);
            if (this.invoiceFrom.goodsNumber && this.invoiceFrom.subAmount) {
                this.invoiceFrom.taxFreePrice = this.$tools.toFixedFn(newValue / this.invoiceFrom.goodsNumber, 8);
            }
        },
        // 税率
        'invoiceFrom.taxRate' (newValue, oldValue) {
            this.addFrom.invoiceInfoModel.amount = this.$tools.toFixedFn(this.invoiceFrom.subAmount / (1 + newValue), 2);
            this.invoiceFrom.subTaxAssessment = this.$tools.toFixedFn(this.invoiceFrom.subAmount - this.addFrom.invoiceInfoModel.amount, 2);
        }
    },
    methods: {
        init (id) {
            this.invoiceDialog = true;
            this.invoiceApplicationId = id;
            this.getInvoiceDetail(id);
        },
        // 详情
        getInvoiceDetail (id) {
            this.$http.get(this.$api.invoice.invoiceInfo + id + '/open')
                .then((res) => {
                    this.sellerCompanyTaxModel = res.data.data.sellerCompanyTaxModel;
                    this.taxInvoiceApplicationModel = res.data.data.taxInvoiceApplicationModel;
                    this.taxInvoiceApplicationDetailList = res.data.data.taxInvoiceApplicationModel.taxInvoiceApplicationDetailList;
                    this.addFrom.invoiceInfoModel = {
                        invoiceCode: this.taxInvoiceApplicationModel.invoiceCode,
                        invoiceNum: this.taxInvoiceApplicationModel.invoiceNum,
                        buyerName: this.taxInvoiceApplicationModel.buyerCompanyName,
                        buyerTaxNum: this.taxInvoiceApplicationModel.taxpayerno,
                        buyerAddressTel: this.taxInvoiceApplicationModel.registeredAddress + ' ' + this.taxInvoiceApplicationModel.phone,
                        buyerBankAccount: this.taxInvoiceApplicationModel.bank + ' ' + this.taxInvoiceApplicationModel.bankAccount,
                        sellerName: this.sellerCompanyTaxModel.title,
                        sellerTaxNum: this.sellerCompanyTaxModel.taxpayerno,
                        sellerAddressTel: this.sellerCompanyTaxModel.registeredAddress + ' ' + this.taxInvoiceApplicationModel.phone,
                        sellerBankAccount: this.sellerCompanyTaxModel.bank + ' ' + this.taxInvoiceApplicationModel.bankAccount,
                        memo: this.taxInvoiceApplicationModel.remark,
                        checkCode: null,
                        amount: this.$tools.toFixedFn(this.taxInvoiceApplicationDetailList[0].invoiceAmount / (1 + 0.13), 2), // 不含税金额
                        taxAssessment: null, // 税额合计
                        priceTaxSum: null, // 价税合计
                        username: JSON.parse(localStorage.getItem('userInfo')).username
                    };
                    this.invoiceFrom = {
                        goodsName: this.taxInvoiceApplicationDetailList[0].productName, // 商品名称
                        typeSpecification: this.taxInvoiceApplicationDetailList[0].productModel, // 商品规格
                        goodsTaxCode: this.taxInvoiceApplicationDetailList[0].productTaxNo, // 商品编号
                        taxFreePrice: this.taxInvoiceApplicationDetailList[0].invoicePrice, // 单价
                        subAmount: this.taxInvoiceApplicationModel.remainTotalAmount, // 金额
                        goodsNumber: this.$tools.toFixedFn(this.taxInvoiceApplicationModel.remainTotalAmount / this.taxInvoiceApplicationDetailList[0].invoicePrice, 8), // 数量
                        taxRate: 0.13, // 税率
                        subTaxAssessment: this.$tools.toFixedFn(this.taxInvoiceApplicationDetailList[0].invoiceAmount - this.addFrom.invoiceInfoModel.amount, 2), // 税额
                        measurementUnit: this.taxInvoiceApplicationDetailList[0].unit // 单位
                    };
                    // this.invoiceFrom.subTaxAssessment = this.$tools.toFixedFn(this.taxInvoiceApplicationDetailList[0].invoiceAmount - this.addFrom.invoiceInfoModel.amount, 2);
                });
        },
        // 提交
        submit () {
            this.addFrom.invoiceInfoModel.detailList = [];
            this.addFrom.invoiceInfoModel.taxAssessment = this.invoiceFrom.subTaxAssessment;
            this.addFrom.invoiceInfoModel.priceTaxSum = this.invoiceFrom.subAmount;
            this.addFrom.invoiceInfoModel.detailList.push(this.invoiceFrom);
            this.$http.post(this.$api.invoice.invoiceInfo + this.invoiceApplicationId + '/open', this.addFrom)
                .then((res) => {
                    if (res.data.code === 0) {
                        let makeInvoice = res.data.data;
                        let detailList = res.data.data.detailList[0];
                        let jsonstr = {
                            fplxdm: makeInvoice.invoiceType,
                            fpdm: makeInvoice.invoiceCode,
                            fphm: makeInvoice.invoiceNum,
                            kprq: makeInvoice.invoiceIssueDateLong,
                            jqbh: makeInvoice.mac,
                            skm: makeInvoice.taxCode,
                            ghdwmc: makeInvoice.buyerName,
                            ghdwdm: makeInvoice.buyerTaxNum,
                            ghdwdzdh: makeInvoice.buyerAddressTel,
                            ghdwyhzh: makeInvoice.buyerBankAccount,
                            xhdwmc: makeInvoice.sellerName,
                            xhdwdm: makeInvoice.sellerTaxNum,
                            xhdwdzdh: makeInvoice.sellerAddressTel,
                            xhdwyhzh: makeInvoice.sellerBankAccount,
                            hjje: Number(makeInvoice.amount),
                            se: Number(makeInvoice.taxAssessment),
                            jshj: Number(makeInvoice.priceTaxSum),
                            bz: makeInvoice.memo,
                            skr: null,
                            fhr: null,
                            kpr: makeInvoice.username,
                            fpzt: '00',
                            qdbz: '0',
                            jym: makeInvoice.checkCode,
                            mxzb: [
                                {
                                    fphxz: 0,
                                    je: Number(detailList.subAmount),
                                    sl: Number(detailList.taxRate),
                                    se: Number(detailList.subTaxAssessment),
                                    spmc: detailList.goodsName,
                                    ggxh: detailList.typeSpecification,
                                    dw: detailList.measurementUnit,
                                    spsl: Number(detailList.goodsNumber),
                                    spdj: Number(detailList.taxFreePrice)
                                }
                            ],
                            ewm: makeInvoice.qrCode
                        };
                        console.log(typeof JSON.stringify(jsonstr));
                        console.log(JSON.stringify(jsonstr));
                        // 专票01 004  普票04 007
                        if (makeInvoice.invoiceType === '01') {
                            window.printZzP(JSON.stringify(jsonstr), false);
                        } else {
                            window.printZpP(JSON.stringify(jsonstr), false);
                        }
                        this.$message(res.data.message);
                        this.invoiceDialog = false;
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.invoiceDetail{
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
                padding: 0 42px 0 0;
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
        color: #3765A3!important;
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
            width: 72px;
        }
    }
    .gy-table{
        tr:nth-child(odd) td {
            font-weight: 100;
            background: none;
        }
        tr:nth-child(even) td {
            font-weight: 100!important;
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
        overflow: hidden;
        padding: 32px 16px 0 16px;
        span{
            &:first-child{
                font-size: 12px;
            }
        }
    }
}
</style>

<style lang="scss">
.invoiceDetail{
    .el-dialog__body{
        padding: 10px 0 30px 0!important;
    }
    .tinct .el-input__inner {
        color: #3765A3!important;
    }
}
</style>
