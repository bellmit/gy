<template>
    <div class="essential-row">
        <div class="essential-item">
            <div class="essential-title"><span v-if="compData.isNecessary" class="isMust">*</span>运输方式</div>
            <div class="essential-text">
                <el-select v-model="orderData.transportType" placeholder="请选择">
                    <el-option v-for="(item, index) in compData.compInfo.transportType"
                    :key="index"
                    :label="item.name"
                    :value="item.name">
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
