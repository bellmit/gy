<template>
    <div class="">
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">下游公司</div>
                <div class="essential-text">{{list.buyerInfo.buyerCompanyName}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">交易对手评级</div>
                <div class="essential-text">{{list.buyerInfo.grade}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">数量(吨)</div>
                <div class="essential-text">{{list.buyerInfo.skuQuantity}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">单价(含税)元</div>
                <div class="essential-text">{{list.buyerInfo.skuPrice|numToCash}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">保证金</div>
                <div class="essential-text">{{list.buyerInfo.depositRatio}}%</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">追保约定</div>
                <div class="essential-text">
                    {{list.buyerInfo.depositRatioAppend|guaranteeAgreementValue(list.buyerInfo.depositRatioSubtract)}}
                </div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">交割库</div>
                <div class="essential-text">{{list.buyerInfo.deliveryWarehouseName}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">交割日期</div>
                <div class="essential-text">{{list.planSaleDlvyDate}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">交割方式</div>
                <div class="essential-text">{{$constant.deliveryStr[list.buyerInfo.deliveryType]}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">免仓期(天)</div>
                <div class="essential-text">{{list.buyerInfo.warehouseFreeDays}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">付款方式</div>
                <div class="essential-text">{{list.buyerInfo.paymentType|paymentType(list.buyerInfo.payChannel)}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">发票月份</div>
                <div class="essential-text"><span>{{list.buyerInfo.provideInvoiceType|invoiceMonthValue(list.buyerInfo, list.bizType)}}</span>
                </div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">货源</div>
                <div class="essential-text">{{list.buyerInfo.skuOrigin}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">包装标准</div>
                <div class="essential-text">{{$constant.packagingStandard[list.buyerInfo.packagingStandard]}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title">下游合约</div>
                <div class="essential-text" v-if="list.buyerInfo.longtermContractOrderId === null">无</div>
                <div class="essential-text" v-else>{{list.buyerInfo.longtermContractCode}}</div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title" v-if="isCont === 'contract'">合同要素备注</div>
                <div class="essential-title" v-else>备注</div>
                <div class="essential-text">{{list.buyerInfo.remarks}}</div>
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
