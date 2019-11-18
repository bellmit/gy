<template>
    <div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title"><span v-if="compData.isNecessary" class="isMust">*</span>付款方式</div>
                <div class="essential-text">
                    <el-select v-model="orderData.paymentType" placeholder="请选择">
                        <el-option v-for="(item, index) in compData.compInfo.paymentType" :key="index" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-if="orderData.paymentType !== -1" v-model="orderData.payChannel" placeholder="请选择" :clearable="true">
                        <el-option v-for="(item, index) in compData.compInfo.paymentChannel" :key="index"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <input v-else type="text" class="gy-input" placeholder="请输入" v-model="orderData.paymentTypeText">
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
        'orderData.paymentType' (newV, oldV) {
            newV !== -1 && (this.orderData.paymentTypeText = null);
        }
    },
    methods: {
    }
};
</script>
