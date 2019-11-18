<template>
    <div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title"><span class="isMust" v-if="compData.isNecessary">*</span>撮合费用</div>
                <div class="essential-text">
                    <el-select style="width:79%" v-model="orderData.priceOfWeight" placeholder="请选择" @change="onchangeChatFee">
                        <el-option v-for="(item, index) in compData.compInfo.priceOfWeightList" :key="index"
                        :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <span v-if="orderData.priceOfWeight">{{orderData.chattingAmount}}元</span>
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
        };
    },
    watch: {
        'orderData.skuQuantity' (newV, oldV) {
            this.$set(this.orderData, 'chattingAmount', newV * this.orderData.priceOfWeight);
        },
        'orderData.priceOfWeight' (newV, oldV) {
            !newV && this.$set(this.orderData, 'chattingAmount', null);
        }
    },
    methods: {
        onchangeChatFee () {
            if (this.orderData.skuQuantity == null || this.orderData.skuQuantity === undefined || this.orderData.skuQuantity === '') {
                this.orderData.priceOfWeight = null;
                this.$message.error('请先输入合同数量');
            } else {
                this.orderData.chattingAmount = this.orderData.skuQuantity * this.orderData.priceOfWeight;
            }
        }
    }
};
</script>
