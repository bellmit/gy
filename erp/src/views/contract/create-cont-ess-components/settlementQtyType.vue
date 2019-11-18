<template>
    <div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title"><span v-if="compData.isNecessary" class="isMust">*</span>结算数量</div>
                <div class="essential-text">
                    <el-select v-model="orderData.settlementQtyType" placeholder="请选择">
                        <el-option v-for="(item, index) in compData.compInfo.settlementQtyTypeList" :key="index"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <input class="gy-input" v-if="orderData.settlementQtyType === -1" type="text" v-model="orderData.settlementQtyTypeAux" placeholder="请输入">
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
        // 'orderData.settlementQtyType' (newV, oldV) {
        //     console.log(newV);
        //     newV !== -1 && (this.orderData.settlementQtyTypeAux = null);
        // }
    },
    methods: {
    }
};
</script>
