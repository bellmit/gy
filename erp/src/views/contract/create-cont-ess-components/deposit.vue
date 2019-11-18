<template>
    <div class="essential-row">
        <div class="essential-item">
            <div class="essential-title"><span class="isMust" v-if="compData.isNecessary">*</span>保证金</div>
            <div class="essential-text">
                <el-select v-model="orderData.depositType" placeholder="请选择">
                    <el-option
                        v-for="item in compData.compInfo.depositTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <input v-if="orderData.depositType == 1" type="text" style="margin-top:1px;" @input="handleInput" v-model="orderData.depositRatio"
                       placeholder="请输入比例">
                <input v-if="orderData.depositType == 2" type="text" style="margin-top:1px;" @input="handleInput" v-model="orderData.depositAmount"
                       placeholder="请输入金额">
                <span v-if="orderData.depositType == 1" class="unit">%</span>
                <span v-if="orderData.depositType == 2" class="unit">元</span>
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
    mounted () {
        if (this.orderData.depositType === 0) {
            this.orderData.depositAmount = null;
            this.orderData.depositRatio = null;
        }
    },
    watch: {
        'orderData.depositType' (newV, oldV) {
            newV === 1 && (this.orderData.depositAmount = null);
            newV === 2 && (this.orderData.depositRatio = null);
            if (newV === 0) {
                this.orderData.depositRatio = null;
                this.orderData.depositAmount = null;
            }
        }
    },
    methods: {
        handleInput (e) {
            // 通过正则过滤小数点后两位
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null;
            if (this.orderData.depositType === 1) {
                this.orderData.depositRatio = e.target.value;
            } else if (this.orderData.depositType === 2) {
                this.orderData.depositAmount = e.target.value;
            }
        }
    }
};
</script>
