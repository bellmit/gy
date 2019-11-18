<template>
    <div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title"><span class="isMust" v-if="compData.isNecessary">*</span>单价(含税)</div>
                <div class="essential-text">
                    <div style="width:140%;">
                        <el-select v-model="skuPriceType" placeholder="请选择" @change="onchangePriceType">
                            <el-option
                                v-for="item in compData.compInfo.skuPriceTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <!-- 数字 -->
                    <input type="text" v-if="orderData.skuPriceType != 21" v-model="orderData.skuPrice" @input="handleInput" style="margin-top:1px;" placeholder="请输入">
                    <!-- 中文 -->
                    <input v-if="orderData.skuPriceType == 21" type="text" v-model="orderData.skuPriceExpression" style="margin-top:1px;" placeholder="请输入">
                    <span v-if="orderData.skuPriceType !== 21" class="unit">元/吨</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        compData: Object,
        orderData: Object
    },
    data () {
        return {
            skuPriceType: null
        };
    },
    mounted () {
        this.skuPriceType = this.orderData.skuPriceType;
    },
    methods: {
        onchangePriceType (v) {
            this.orderData.skuPriceType = v;
            // 切换单价类型时，清空前面输入的值
            this.orderData.skuPrice = null;
            this.orderData.skuPriceExpression = '';
        },
        handleInput (e) {
            // 通过正则过滤小数点后两位
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
            if (this.orderData.skuPriceType !== 21) {
                this.orderData.skuPrice = e.target.value;
            }
        }
    }
};
</script>
