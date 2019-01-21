<template>
    <div class="">
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">上游公司</div>
                <div class="essential-text">{{list.sellerInfo.sellerCompanyName}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">交易对手评级</div>
                <div class="essential-text">{{list.sellerInfo.grade}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">数量(吨)</div>
                <div class="essential-text">{{list.sellerInfo.skuQuantity}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">单价(含税)元</div>
                <div class="essential-text">{{list.sellerInfo.skuPrice|numToCash}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">保证金</div>
                <div class="essential-text">{{list.sellerInfo.depositRatio}}%</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">追保约定</div>
                <div class="essential-text">
                    {{list.sellerInfo.depositRatioAppend|guaranteeAgreementValue(list.sellerInfo.depositRatioSubtract)}}
                </div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">交割库</div>
                <div class="essential-text">{{list.sellerInfo.deliveryWarehouseName}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">交割日期</div>
                <div class="essential-text">{{list.planBuyDlvyDate}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">交割方式</div>
                <div class="essential-text">{{$constant.deliveryStr[list.sellerInfo.deliveryType]}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">免仓期(天)</div>
                <div class="essential-text">{{list.sellerInfo.warehouseFreeDays}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">付款方式</div>
                <div class="essential-text">{{list.sellerInfo.paymentType|paymentType(list.sellerInfo.payChannel)}}
                </div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">发票月份</div>
                <div class="essential-text"><span>{{list.sellerInfo.provideInvoiceType|invoiceMonthValue(list.sellerInfo, list.bizType)}}</span>
                </div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">货源</div>
                <div class="essential-text">{{list.sellerInfo.skuOrigin}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">包装标准</div>
                <div class="essential-text">{{$constant.packagingStandard[list.sellerInfo.packagingStandard]}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">上游合约</div>
                <div class="essential-text" v-if="list.sellerInfo.longtermContractOrderId === null">无</div>
                <div class="essential-text" v-else>{{list.sellerInfo.longtermContractCode}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title" v-if="isCont === 'contract'">合同要素备注</div>
                <div class="essential-title" v-else>备注</div>
                <div class="essential-text">{{list.sellerInfo.remarks}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            default: {}
        },
        isCont: {
            default: String
        }
    }
};
</script>
