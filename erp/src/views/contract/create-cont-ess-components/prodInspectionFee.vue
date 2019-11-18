<template>
    <div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title"><span v-if="compData.isNecessary" class="isMust">*</span>商检费用</div>
                <div class="essential-text">
                    <el-select v-model="orderData.prodInspectionFee" placeholder="请选择">
                        <el-option v-for="(item, index) in compData.compInfo.prodInspectionFeeList"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <input v-if="orderData.prodInspectionFee === -1" type="text" class="gy-input" placeholder="请输入" v-model="orderData.prodInspectionFeeText">
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
        'orderData.prodInspectionFee' (newV, oldV) {
            newV === -1 && (this.orderData.prodInspectionFeeText = null);
        }
    },
    methods: {
    }
};
</script>
