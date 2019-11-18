<template>
    <div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title"><span class="isMust" v-if="compData.isNecessary">*</span>质量标准</div>
                <div class="essential-text">
                    <el-select v-model="orderData.qualityStandard" placeholder="请选择" :clearable="!compData.isNecessary">
                        <el-option v-for="item in compData.compInfo.qualityStandards" :key="item.name"
                                    :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="essential-row" v-if="orderData.qualityStandard === '其他'">
            <div class="essential-item">
                <div class="essential-title"></div>
                <div class="essential-text">
                    <textarea class="gy-textarea" type="text" maxlength="100" v-model="orderData.qualityStandardAux" placeholder="请输入，自定义文本选填，限制字数100字"></textarea>
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
        'orderData.qualityStandard' (newV, oldV) {
            if (newV === '-') {
                this.orderData.qualityStandardOther = null;
            }
        }
    },
    methods: {
    }
};
</script>
