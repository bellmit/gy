<template>
    <div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title"><span v-if="compData.isNecessary" class="isMust">*</span>交割日期</div>
                <div class="essential-text" style="flex-direction: column">
                    <div>
                        <el-select v-model="orderData.deliveryDateFlag" placeholder="请选择">
                            <el-option v-for="(item, index) in compData.compInfo.deliveryDateFlags" :key="index"
                                        :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="essential-text" style="margin-right: 0">
                        <div class="d">
                            <el-date-picker
                                    v-model="orderData.deliveryBeginDate"
                                    type="date" :editable="false"
                                    value-format="timestamp"
                                    @change="pickertime"
                                    :placeholder="orderData.deliveryDateFlag === 2 ? '截止日期':'开始日期'">
                            </el-date-picker>
                        </div>
                        <template v-if="orderData.deliveryDateFlag !== 2">
                            <div class="c">-</div>
                            <div class="d">
                                <el-date-picker
                                        v-model="deliveryEndDate"
                                        type="date" :editable="false"
                                        @change="pickertime"
                                        value-format="timestamp"
                                        placeholder="结束日期">
                                </el-date-picker>
                            </div>
                        </template>
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
            deliveryEndDate: null
        };
    },
    watch: {
        'orderData.deliveryDateFlag' (newV, oldV) {
            newV === 2 && (this.deliveryEndDate = null);
        }
    },
    methods: {
        // 时间选择限制
        pickertime () {
            this.orderData.deliveryEndDate = this.deliveryEndDate;
            if (this.orderData.deliveryDateFlag === 1 && this.orderData.deliveryBeginDate > this.deliveryEndDate && this.deliveryEndDate !== null) {
                this.$message({
                    message: '开始时间不能大于结束时间',
                    type: 'error'
                });
                this.orderData.deliveryBeginDate = null;
            }
        }
    }
};
</script>
