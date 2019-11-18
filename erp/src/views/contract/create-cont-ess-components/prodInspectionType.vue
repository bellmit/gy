<template>
    <div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title"><span v-if="compData.isNecessary" class="isMust">*</span>商检类型</div>
                <div class="essential-text">
                    <el-select v-model="orderData.prodInspectionType" placeholder="请选择">
                        <el-option v-for="item in compData.compInfo.prodInspectionTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <input v-if="orderData.prodInspectionType === -1" placeholder="请输入" type="text" class="gy-input" v-model="orderData.prodInspectionTypeText">
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
        'orderData.prodInspectionType' (newV, oldV) {
            newV === -1 && (this.orderData.prodInspectionTypeText = null);
        }
    },
    methods: {
    }
};
</script>
