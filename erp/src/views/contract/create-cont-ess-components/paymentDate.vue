<template>
    <div v-if="orderData.prdSkuId === 309 || orderData.prdSkuId === 511 || orderData.prdSkuId === 284 || orderData.prdSkuId === 530 || orderData.prdSkuId === 378"><!-- "先款后货，指定日期付款",目前只有PVC类型、双芬A、国六车柴才有 -->
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title"><span v-if="compData.isNecessary" class="isMust">*</span>付款日期</div>
                <div class="essential-text" style="flex-direction: column">
                    <div>
                        <el-select v-model="orderData.paymentDateFlag" placeholder="请选择" :clearable="true">
                            <el-option v-for="(item, index) in $constant.paymentDateFlag" :key="index"
                                        :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="essential-text" style="margin-right: 0">
                        <div class="d">
                            <el-date-picker
                                    v-model="orderData.paymentBeginDate"
                                    type="date"
                                    value-format="timestamp"
                                    @change="pickertime"
                                    :placeholder="orderData.paymentDateFlag === 2 ? '截止日期':'开始日期'">
                            </el-date-picker>
                        </div>
                        <template v-if="orderData.paymentDateFlag !== 2">
                            <div class="c">-</div>
                            <div class="d">
                                <el-date-picker
                                        v-model="orderData.paymentEndDate"
                                        type="date"
                                        @change="pickertime"
                                        value-format="timestamp"
                                        placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </template>
                        <span class="date-text-r" v-if="orderData.paymentDateFlag == 2">前(含当日)</span>
                    </div>
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
    created () {
    },
    methods: {
        // 时间选择限制
        pickertime () {
            if (this.orderData.paymentBeginDate > this.orderData.paymentEndDate && this.orderData.paymentEndDate !== null) {
                this.$message({
                    message: '开始时间不能大于结束时间',
                    type: 'error'
                });
                this.orderData.paymentBeginDate = null;
            }
        }
    }
};
</script>
