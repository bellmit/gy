<template>
<div class="add-invoice-wrapper">
    <div class="new-title-public">开票申请</div>
    <div class="jcxx-wrapper">
        <div class="title"><i
            class="iconfont icon-dingdanxinxi"></i>基础信息
        </div>
        <div class="jcxx-content clear">
            <div class="gy-form-group">
                <div class="l"><strong>*</strong>订单编号</div>
                <div>{{INFO.orderModel.odrOrderSn || '--'}}</div>
            </div>
            <div class="gy-form-group">
                <div class="l"><strong>*</strong>客户名称</div>
                <div>{{INFO.orderModel.buyerCompanyName || '--'}}</div>
            </div>
            <div class="gy-form-group">
                <div class="l"><strong>*</strong>发票类型</div>
                <div>
                    <el-select v-model="invoiceData.invoiceType">
                        <!--<el-option-->
                            <!--v-for="item in invoiceTypeData"-->
                            <!--:label="item.lab"-->
                            <!--:value="item.code"-->
                            <!--:key="item.code">-->
                        <!--</el-option>-->
                        <el-option v-if="INFO.sellerCompanyTaxModel.specialInvoice === 1" label="增值税专用发票" value="01"></el-option>
                        <el-option v-if="INFO.sellerCompanyTaxModel.ordinaryInvoice === 1" label="增值税普通发票纸质发票" value="04"></el-option>
                        <el-option v-if="INFO.sellerCompanyTaxModel.electronicInvoice === 1" label="增值税普通发票电子发票" value="10"></el-option>
                    </el-select>
                </div>
            </div>
        </div>
    </div>
    <div class="mfxx-wrapper">
        <div class="title"><i
            class="iconfont icon-maijia"></i>卖方信息
        </div>
        <div class="mfxx-content clear" v-if="INFO.sellerCompanyTaxModel">
            <div class="gy-form-group">
                <div class="l"><strong>*</strong>发票抬头</div>
                <div>{{INFO.sellerCompanyTaxModel.title}}
                    <!--<input type="text" class="gy-input" v-model="INFO.sellerCompanyTaxModel.title">-->
                </div>
            </div>
            <div class="gy-form-group">
                <div class="l"><strong>*</strong>纳税人识别号</div>
                <div>{{INFO.sellerCompanyTaxModel.taxpayerno}}
                    <!--<input v-model="INFO.sellerCompanyTaxModel.taxpayerno" type="text" class="gy-input" placeholder="请输入纳税人识别号">-->
                </div>
            </div>
            <template v-if="invoiceData.invoiceType === '01'">
                <div class="gy-form-group">
                    <div class="l"><strong>*</strong>开户银行</div>
                    <div>{{INFO.sellerCompanyTaxModel.bank}}
                        <!--<input v-model="INFO.sellerCompanyTaxModel.bank" type="text" class="gy-input" placeholder="请输入开户银行">-->
                    </div>
                </div>
                <div class="gy-form-group">
                    <div class="l"><strong>*</strong>开户银行账户</div>
                    <div>{{INFO.sellerCompanyTaxModel.bankAccount}}
                        <!--<input v-model="INFO.sellerCompanyTaxModel.bankAccount" type="text" class="gy-input" placeholder="请输入开户银行账户">-->
                    </div>
                </div>
                <div class="gy-form-group">
                    <div class="l"><strong>*</strong>注册电话</div>
                    <div>{{INFO.sellerCompanyTaxModel.phone}}
                        <!--<input v-model="INFO.sellerCompanyTaxModel.phone" type="text" class="gy-input" placeholder="请输入注册电话">-->
                    </div>
                </div>
                <div class="gy-form-group">
                    <div class="l"><strong>*</strong>注册地址</div>
                    <div>{{INFO.sellerCompanyTaxModel.registeredAddress}}
                        <!--<input v-model="INFO.sellerCompanyTaxModel.registeredAddress" type="text" class="gy-input" placeholder="请输入注册地址">-->
                    </div>
                </div>
            </template>
        </div>
    </div>
    <div class="mfxx1-wrapper">
        <div class="title"><i
            class="iconfont icon-maijia1"></i>买方信息
        </div>
        <div class="mfxx1-content clear" v-if="INFO.buyerCompanyTaxModel">
            <div class="gy-form-group">
                <div class="l"><strong>*</strong>发票抬头</div>
                <div>
                    <input v-model="INFO.buyerCompanyTaxModel.title" type="text" class="gy-input" placeholder="请输入发票抬头">
                    <!--{{INFO.buyerCompanyTaxModel.title}}-->
                </div>
            </div>
            <div class="gy-form-group">
                <div class="l"><strong>*</strong>纳税人识别号</div>
                <div>
                    <input v-model="INFO.buyerCompanyTaxModel.taxpayerno" type="text" class="gy-input" placeholder="请输入纳税人识别号">
                </div>
            </div>
            <template v-if="invoiceData.invoiceType === '01'">
                <div class="gy-form-group">
                    <div class="l"><strong>*</strong>开户银行</div>
                    <div>
                        <input v-model="INFO.buyerCompanyTaxModel.bank" type="text" class="gy-input" placeholder="请输入开户银行">
                    </div>
                </div>
                <div class="gy-form-group">
                    <div class="l"><strong>*</strong>开户银行账户</div>
                    <div>
                        <input v-model="INFO.buyerCompanyTaxModel.bankAccount" type="text" class="gy-input" placeholder="请输入开户银行账户">
                    </div>
                </div>
                <div class="gy-form-group">
                    <div class="l"><strong>*</strong>注册电话</div>
                    <div>
                        <input v-model="INFO.buyerCompanyTaxModel.phone" type="text" class="gy-input" placeholder="请输入注册电话">
                    </div>
                </div>
                <div class="gy-form-group">
                    <div class="l"><strong>*</strong>注册地址</div>
                    <div>
                        <input v-model="INFO.buyerCompanyTaxModel.registeredAddress" type="text" class="gy-input" placeholder="请输入注册地址">
                    </div>
                </div>
            </template>
            <template v-if="invoiceData.invoiceType === '04' || invoiceData.invoiceType === '01'">
                <div class="gy-form-group">
                    <div class="l"><strong>*</strong>收票人</div>
                    <div>
                        <input v-model="INFO.buyerCompanyTaxModel.name" type="text" class="gy-input" placeholder="请输入收票人">
                    </div>
                </div>
                <div class="gy-form-group">
                    <div class="l"><strong>*</strong>收票人电话</div>
                    <div>
                        <input v-model="INFO.buyerCompanyTaxModel.mobile" type="text" class="gy-input" placeholder="请输入收票人电话">
                    </div>
                </div>
                <div class="gy-form-group">
                    <div class="l"><strong>*</strong>收票地址</div>
                    <div>
                        <input v-model="INFO.buyerCompanyTaxModel.address" type="text" class="gy-input" placeholder="请输入收票地址">
                    </div>
                </div>
            </template>
            <template v-if="invoiceData.invoiceType === '10'">
                <div class="gy-form-group">
                    <div class="l"><strong>*</strong>收票人邮箱</div>
                    <div>
                        <input v-model="INFO.buyerCompanyTaxModel.email" type="text" class="gy-input" placeholder="请输入收票邮箱地址">
                    </div>
                </div>
            </template>
        </div>
    </div>
    <div class="ddxx-wrapper">
        <div class="title"><i
            class="iconfont icon-info"></i>订单信息
        </div>
        <div class="ddxx-content clear">
            <table class="gy-table">
                <thead>
                <tr>
                    <th>商品名称</th>
                    <th>买方公司</th>
                    <th>总金额(元)</th>
                    <th>交付方式</th>
                    <th>创建时间</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-if="INFO.orderModel.orderItemModelList && INFO.orderModel.orderItemModelList.length > 0"
                    v-for="item in INFO.orderModel.orderItemModelList" :key="item.id">
                    <td>{{item.skuName || '--'}}</td>
                    <td>{{INFO.orderModel.buyerCompanyName || '--'}}</td>
                    <td class="align-r">{{INFO.orderModel.totalAmountStr || '--'}}</td>
                    <td>{{INFO.orderModel.deliveryTypeStr || '--'}}</td>
                    <td>{{INFO.orderModel.createdDate | date(1)}}</td>
                    <td>{{INFO.orderModel.orderStatusStr || '--'}}</td>
                    <td><span class="gy-button-view" @click="goPage(item)">查看</span></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="fpmx-wrapper">
        <div class="title"><i
            class="iconfont icon-copy"></i>发票明细
        </div>
        <div class="fpmx-content clear">
            <table class="gy-table">
                <thead>
                <tr>
                    <th>商品名称</th>
                    <th>商品税务编码</th>
                    <th>单价(元)</th>
                    <th>数量(吨)</th>
                    <th>已开票金额(元)</th>
                    <th><span class="light">*</span>开票单价(元/吨)</th>
                    <th><span class="light">*</span>本次开票数量(吨)</th>
                    <th><span class="light">*</span>本次开票金额(元)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{{taxCode.skuName}}</td>
                    <td>
                        <div class="el-select nameKey-content selects" @click.stop="listShow('taxCodeDrop')">
                            <div class="ipt">{{taxCode.taxCode}}</div>
                            <div class="el-select-dropdown el-popper is-multiple gy-ul" style="display: none" id="taxCodeDrop" v-clickOutside="listHide">
                                <ul class="el-scrollbar__view el-select-dropdown__list" v-if="taxCodeList && taxCodeList.length > 0">
                                    <li class="el-select-dropdown__item"
                                        @click.stop="chkTaxCode(item)"
                                        v-for="item in taxCodeList"
                                        :class="{'selected' : taxCode.taxCode === item.taxCode}"
                                        :key="item.taxCode">
                                        <div class="select-slot">
                                            <span class="l">{{ item.productName }}</span>
                                            <span class="r">{{ item.taxCode }}</span>
                                        </div>
                                    </li>
                                </ul>
                                <ul class="el-scrollbar__view el-select-dropdown__list" v-else>
                                    <li class="el-select-dropdown__item" @click.stop="listHide">
                                        <div class="select-slot">暂无数据</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </td>
                    <td class="align-r">{{INFO.orderModel.orderItemModelList[0].skuPrice | numToCash}}</td>
                    <td class="align-r">{{INFO.orderModel.orderItemModelList[0].skuQuantity | numToCash(3)}}</td>
                    <td class="align-r">{{INFO.invoicedAmount | numToCash}}</td>
                    <td class="align-r">{{(invoiceNumber.invoicePrice).toFixed(8) * 1}}</td>
                    <td class="align-r"><input @focus="goChange = false" type="text" class="gy-input" v-model="invoiceNumber.invoiceQuantity"></td>
                    <td class="align-r"><input @focus="goChange = false" type="text" class="gy-input" v-model="invoiceNumber.invoiceAmount"></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="bz-wrapper">
        <div class="title"><i
            class="iconfont icon-confirm"></i>备注
        </div>
        <div class="bz-content clear">
            <el-input
                type="textarea"
                placeholder="这里是备注信息"
                v-model="invoiceData.remark"
                maxlength="30"
            >
            </el-input>
        </div>
    </div>
    <div class="btn-wrapper"><button
        type="button" class="gy-button-normal" @click="$router.go(-1)">取消</button><button
        type="button" class="gy-button-extra" @click="addInvoice">提交申请</button>
    </div>
</div>
</template>

<script>
const clickOutside = {
    bind (el, binding) {
        function documentHandler (e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.vueClickOutside = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    unbind (el) {
        document.removeEventListener('click', el.vueClickOutside);
        delete el.vueClickOutside;
    }
};
export default {
    name: 'addInvoice',
    data () {
        return {
            INFO: {
                'orderModel': {
                    'id': null,
                    'valid': null,
                    'keywords': null,
                    'createdDate': null,
                    'updatedDate': null,
                    'createdBy': null,
                    'updatedBy': null,
                    'odrOrderSn': null,
                    'orderType': null,
                    'sellerCompanyId': null,
                    'sellerCompanyName': null,
                    'buyerCompanyId': null,
                    'buyerCompanyName': null,
                    'totalAmount': null,
                    'totalAmountStr': null,
                    'deliveryType': null,
                    'deliveryTypeStr': null,
                    'orderStatus': null,
                    'orderStatusStr': null,
                    'settlementTotal': null,
                    'settlementTotalStr': null,
                    'orderItemModelList': [{
                        'id': null,
                        'odrOrderId': null,
                        'odrOfferId': null,
                        'odrOfferSn': null,
                        'odrOfferSkuQuantity': null,
                        'prdSkuId': null,
                        'skuCode': null,
                        'skuName': null,
                        'skuPictureUrl': null,
                        'skuQuantity': null,
                        'skuPrice': null,
                        'infUnitOfMeasureId': null,
                        'infUnitOfMeasureDisplayName': null,
                        'skuTotalAmount': null,
                        'deliveryDateFlag': null,
                        'deliveryDateText': null,
                        'deliveryBeginDate': null,
                        'deliveryBeginDateStr': null,
                        'deliveryEndDate': null,
                        'deliveryEndDateStr': null,
                        'deliveryWarehouseId': null,
                        'deliveryWarehouseName': null,
                        'settlementPrice': null,
                        'settlementQuantity': null,
                        'deliveryDistrictId': null,
                        'deliveryDetailedAddress': null,
                        'createdBy': null,
                        'updatedBy': null,
                        'valid': null,
                        'createdDate': null,
                        'updatedDate': null,
                        'skuPriceStr': null,
                        'skuTotalAmountStr': null,
                        'skuQuantityDecimal': null,
                        'quantityIssued': null,
                        'quantityPlanned': null,
                        'productId': null,
                        'topCatalogueId': null,
                        'skuPriceType': null
                    }]
                },
                'sellerCompanyTaxModel': {
                    'id': null,
                    'valid': null,
                    'keywords': null,
                    'createdDate': null,
                    'updatedDate': null,
                    'createdBy': null,
                    'updatedBy': null,
                    'companyId': null,
                    'companyName': null,
                    'title': null,
                    'taxpayerno': null,
                    'registeredAddress': null,
                    'phone': null,
                    'bank': null,
                    'bankAccount': null,
                    'onlineInvoice': null,
                    'deviceno': null,
                    'name': null,
                    'email': null,
                    'mobile': null,
                    'address': null,
                    'appkey': null,
                    'specialInvoice': null,
                    'ordinaryInvoice': null,
                    'electronicInvoice': null,
                    'updatedDateStart': null,
                    'updatedDateEnd': null
                },
                'buyerCompanyTaxModel': {
                    'id': null,
                    'valid': null,
                    'keywords': null,
                    'createdDate': null,
                    'updatedDate': null,
                    'createdBy': null,
                    'updatedBy': null,
                    'companyId': null,
                    'companyName': null,
                    'title': null,
                    'taxpayerno': null,
                    'registeredAddress': null,
                    'phone': null,
                    'bank': null,
                    'bankAccount': null,
                    'onlineInvoice': null,
                    'deviceno': null,
                    'name': null,
                    'email': null,
                    'mobile': null,
                    'address': null,
                    'appkey': null,
                    'specialInvoice': null,
                    'ordinaryInvoice': null,
                    'electronicInvoice': null,
                    'updatedDateStart': null,
                    'updatedDateEnd': null
                }
            },
            INFOInvoice: {
                'orderInvoiceList': [
                    {
                        'id': null,
                        'status': null,
                        'type': null,
                        'invoiceUrl': '',
                        'invoiceInfoModel': {
                            'invoiceCode': '',
                            'invoiceNum': '',
                            'invoiceIssueDateStr': '',
                            'amount': '',
                            'taxAssessment': '',
                            'priceTaxSum': ''
                        }
                    }
                ],
                'applicationTotalAmount': null,
                'openedTotalAmount': null,
                'remainTotalAmount': null
            },
            invoiceTypeData: [
                {
                    code: '01',
                    lab: '增值税专用发票'
                },
                {
                    code: '04',
                    lab: '增值税普通发票纸质发票'
                },
                {
                    code: '10',
                    lab: '增值税普通发票电子发票'
                }
            ],
            invoiceData: {
                'invoiceType': null,
                'remark': null
            },
            invoiceNumber: {
                invoicePrice: 0,
                invoiceQuantity: 0,
                invoiceAmount: 0
            },
            taxCodeList: [
                // {
                //     createdBy: null,
                //     createdDate: null,
                //     id: 1,
                //     keywords: null,
                //     productId: 1,
                //     productName: '*有机化学原料*乙二醇',
                //     taxCode: '107020217',
                //     updatedBy: null,
                //     updatedDate: null,
                //     valid: null
                // }
            ],
            taxCode: {
                skuName: null,
                taxCode: null
            },
            goChange: true
        };
    },
    created () {
        this.getInfo();
    },
    methods: {
        chkTaxCode (item) {
            this.taxCode.skuName = item.productName;
            this.taxCode.taxCode = item.taxCode;
            this.listHide();
        },
        listShow () {
            document.getElementById('taxCodeDrop').style.display = 'block';
        },
        listHide () {
            document.getElementById('taxCodeDrop').style.display = 'none';
        },
        addInvoice () {
            let params = this.invoiceData;
            let keys = {
                'address': null,
                'bank': null,
                'bankAccount': null,
                'email': null,
                'mobile': null,
                'name': null,
                'phone': null,
                'registeredAddress': null,
                'taxpayerno': null,
                'title': null
            };
            Object.keys(keys).map((key) => {
                keys[key] = this.INFO.buyerCompanyTaxModel[key];
            });
            keys = Object.assign({}, keys, this.invoiceNumber);
            if (!keys.title) { this.$message.error('请先填写发票抬头'); return; }
            if (!keys.taxpayerno) { this.$message.error('请先填写纳税人识别号'); return; }
            if (keys.taxpayerno.toString().length > 20) { this.$message.error('纳税人识别号不能超出20位'); return; }
            if (!keys.invoiceQuantity || keys.invoiceQuantity * 1 === 0 || !/^(0|[1-9]\d*)(\.\d{0,3})?$/.test(keys.invoiceQuantity * 1)) {
                this.$message.error('本次开票数量只能为正数且最多保留小数点后三位数字'); return;
            }
            if (!keys.invoiceAmount || keys.invoiceAmount * 1 === 0 || !/^(0|[1-9]\d*)(\.\d{0,2})?$/.test(keys.invoiceAmount * 1)) {
                this.$message.error('本次开票金额只能为正数且最多保留小数点后两位数字'); return;
            }
            if (params.invoiceType === '10') {
                if (!keys.email) { this.$message.error('请先填写收票人邮箱'); return; }
            }
            if (params.invoiceType === '01') {
                if (!keys.bank) { this.$message.error('请先填写开户银行'); return; }
                if (!keys.bankAccount) { this.$message.error('请先填写开户银行账户'); return; }
                if (typeof (keys.bankAccount * 1) !== 'number' || keys.bankAccount.toString().length > 19) { this.$message.error('开户银行账号不能超出19位数字'); return; }
                if (!keys.phone) { this.$message.error('请先填写注册电话'); return; }
                if (!keys.registeredAddress) { this.$message.error('请先填写注册地址'); return; }
            }
            if (params.invoiceType === '01' || params.invoiceType === '04') {
                if (!keys.name) { this.$message.error('请先填写收票人'); return; }
                if (!keys.mobile) { this.$message.error('请先填写收票人电话'); return; }
                if (!keys.address) { this.$message.error('请先填写收票地址'); return; }
            }
            if (!this.taxCode.skuName) { this.$message.error('请先选择商品'); return; }
            if (!this.taxCode.taxCode) { this.$message.error('请先选择商品'); return; }
            if (this.INFO.orderModel.totalAmount - this.INFO.invoicedAmount < keys.invoiceAmount) {
                this.$message.error('本次开票金额已超出剩余可开票金额');
                return;
            }
            params = Object.assign({
                orderId: this.$route.query.id,
                productName: this.taxCode.skuName,
                taxCode: this.taxCode.taxCode
            }, params, keys);
            this.$http.post(this.$api.invoice.addInvoice, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('操作成功');
                        this.$router.go(-1);
                        return;
                    }
                    this.$message.error(res.data.message);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        getInfo () {
            this.$http.get(this.$api.invoice.getAddInfo + this.$route.query.id + '/invoiceApplication')
                .then((res) => {
                    if (res.data.code === 0) {
                        this.INFO = res.data.data.invoiceApplicationNeedData;
                        if (res.data.data.invoiceApplicationNeedData.sellerCompanyTaxModel.specialInvoice === 1) {
                            this.invoiceData.invoiceType = '01';
                        } else if (res.data.data.invoiceApplicationNeedData.sellerCompanyTaxModel.ordinaryInvoice === 1) {
                            this.invoiceData.invoiceType = '04';
                        } else if (res.data.data.invoiceApplicationNeedData.sellerCompanyTaxModel.electronicInvoice === 1) {
                            this.invoiceData.invoiceType = '10';
                        }
                        this.taxCodeList = res.data.data.productTaxCodeModels;
                        this.taxCode.skuName = res.data.data.invoiceApplicationNeedData.orderModel.orderItemModelList[0].skuName;
                        this.taxCode.taxCode = res.data.data.invoiceApplicationNeedData.orderModel.orderItemModelList[0].taxCode;
                        this.invoiceNumber.invoiceAmount = res.data.data.invoiceApplicationNeedData.currentInvoicingAmount || 0;
                        this.invoiceNumber.invoicePrice = res.data.data.invoiceApplicationNeedData.orderModel.orderItemModelList[0].skuPrice;
                        this.invoiceNumber.invoiceQuantity = (res.data.data.invoiceApplicationNeedData.currentInvoicingAmount * 1 / res.data.data.invoiceApplicationNeedData.orderModel.orderItemModelList[0].skuPrice).toFixed(3) * 1;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        goPage () {
            let data = this.INFO.orderModel;
            let name = data.orderStatus > 2 && data.orderStatus !== 5 ? 'sellerSettle' : 'salesDetail';
            const {href} = this.$router.resolve({name: name, query: {orderId: data.id, showBillIcon: data.showBillIcon}});
            window.open(href, '_blank');
        }
    },
    directives: {
        clickOutside
    },
    watch: {
        'invoiceNumber.invoiceAmount': function (val) {
            if (this.goChange) {
                return;
            }
            if (!/^(0|[1-9]\d*)(\.\d{0,2})?$/.test(val * 1)) {
                this.invoiceNumber.invoiceAmount = this.invoiceNumber.invoiceAmount.toString().substr(0, this.invoiceNumber.invoiceAmount.length - 1);
                this.$message.error('本次开票金额只能为正数且最多保留小数点后两位数字');
                return;
            }
            (Number(val) !== 0) && (Number(this.invoiceNumber.invoiceQuantity) !== 0) && (this.invoiceNumber.invoicePrice = (val * 1 / Number(this.invoiceNumber.invoiceQuantity)).toFixed(18) * 1);
            if (this.INFO.orderModel.totalAmount - this.INFO.invoicedAmount < val * 1) {
                this.$message.error('本次开票金额已超出剩余可开票金额');
            }
        },
        'invoiceNumber.invoiceQuantity': function (val) {
            if (this.goChange) {
                return;
            }
            if (!/^(0|[1-9]\d*)(\.\d{0,3})?$/.test(val * 1)) {
                this.invoiceNumber.invoiceQuantity = this.invoiceNumber.invoiceQuantity.toString().substr(0, this.invoiceNumber.invoiceQuantity.length - 1);
                this.$message.error('本次开票数量只能为正数且最多保留小数点后三位数字');
                return;
            }
            (Number(this.invoiceNumber.invoiceAmount) !== 0) && (Number(val) !== 0) && (this.invoiceNumber.invoicePrice = (Number(this.invoiceNumber.invoiceAmount) / Number(val)).toFixed(18) * 1);
        }
    }
};
</script>

<style lang="scss" scoped>
.add-invoice-wrapper {
    .title {
        padding: 15px 0 9px 8px;
        line-height: 1;
        color: #333;
        font-weight: 700;
        .iconfont {
            color: #909399;
            font-weight: 100;
            margin-right: 8px;
        }
    }
    .clear {
        clear: both;
        &:after {
            content: ' ';
            clear: both;
            display: block;
        }
    }
    .jcxx-wrapper {
        .title{
        }
        .jcxx-content {
            padding-bottom: 6px;
        }
    }
    .mfxx-wrapper {
        .title {
        }
        .mfxx-content {
            padding-bottom: 6px;
        }
    }
    .mfxx1-wrapper {
        .title {
        }
        .mfxx1-content {
            padding-bottom: 6px;
        }
    }
    .ddxx-wrapper {
        .title {
        }
        .ddxx-content {
            padding: 0 16px 6px 16px;
        }
    }
    .fpmx-wrapper {
        .title {
        }
        .fpmx-content {
            padding: 0 16px 6px 16px;
            .gy-table{
                tr:hover {
                    background: #fff;
                }
                .gy-input {
                    width: 120px;
                }
            }
        }
    }
    .bz-wrapper {
        .title {
        }
        .bz-content {
            padding: 0 16px;
        }
    }
    .btn-wrapper {
        padding: 30px 16px;
        text-align: right;
        .gy-button-normal {
            margin-right: 10px;
        }
    }
}
.gy-form-group {
    padding-left: 138px;
    .l {
        width: 138px;
    }
}
.light {
    color: $color-highlight;
}
.select-slot {
    height: 30px;
    display: flex;
    .l {
        /*flex: 0 0 100px;*/
        flex: 1;
        padding-right: 16px;
    }
    .r {
        /*flex: 0 0 100px;*/
    }
}
.nameKey-content {
    width: auto;
    min-width: 100px;
    line-height: 1;
    .ipt {
        height: 30px;
        line-height: 30px;
        padding-left: 16px;
        border-bottom: 1px solid $color-border;
    }
    .gy-ul {
        position: absolute;
        top: 30px;
        left: 0;
    }
}
</style>
