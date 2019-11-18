<template><!-- 单选 -->
    <div class="essential-row">
        <div class="essential-item">
            <div class="essential-title"><span v-if="compData.isNecessary" class="isMust">*</span>包装标准</div>
            <div class="essential-text">
                <el-radio-group v-model="orderData.packagingStandard">
                    <el-radio v-for="item in compData.compInfo.packagingStandards"
                    :key="item.value"
                    :label=item.value>{{item.label}}</el-radio>
                </el-radio-group>
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
    },
    methods: {
    }
};
</script>
