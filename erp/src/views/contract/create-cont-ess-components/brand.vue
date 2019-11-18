<template>
    <div class="essential-row">
        <div class="essential-item">
            <div class="essential-title"><span v-if="compData.isNecessary" class="isMust">*</span>品牌</div>
            <div class="essential-text">
                <el-select v-model="orderData.brand" placeholder="请选择" clearable>
                    <el-option v-for="(item, index) in compData.compInfo.brandList" :key="index"
                                :label="item.name" :value="item.name">
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
