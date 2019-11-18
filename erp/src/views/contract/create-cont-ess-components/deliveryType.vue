<template>
    <div class="essential-row">
        <div class="essential-item">
            <div class="essential-title"><span v-if="compData.isNecessary" class="isMust">*</span>交割方式</div>
            <div class="essential-text">
                <el-select v-model="orderData.deliveryType" placeholder="请选择">
                    <el-option v-for="(item, index) in compData.compInfo.deliveryCreateEssList" :key="index"
                                :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
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
    methods: {
    }
};
</script>
