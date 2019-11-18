<template>
    <div v-if="orderData.depositAppendBenchmark === 'CCF' || orderData.depositAppendBenchmark === '其他'">
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title"><span class="isMust" v-if="compData.isNecessary">*</span>追保基准</div>
                <div class="essential-text">
                    <el-select v-model="orderData.depositAppendBenchmark" placeholder="请选择" :clearable="true">
                        <el-option v-for="(item, index) in compData.compInfo.baselineRecovery" :key="index"
                        :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title"></div>
                <div class="essential-text">
                    <textarea class="gy-textarea" type="text" maxlength="100" v-model="orderData.depositAppendArea" placeholder="请输入"></textarea>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title"><span class="isMust" v-if="compData.isNecessary">*</span>追保基准</div>
                <div class="essential-text cont-ess-zbyd">
                    <div class="w">
                        <div class="essential-text">
                            <el-select v-model="orderData.depositAppendBenchmark" placeholder="请选择" :clearable="true">
                                <el-option v-for="(item, index) in compData.compInfo.baselineRecovery" :key="index" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="t">
                        <div class="essential-text">
                            <el-select v-model="orderData.depositAppendArea" placeholder="请选择" :clearable="true">
                                <el-option v-for="(item, index) in compData.compInfo.restaurants" :key="index" :label="item.name" :value="item.name">
                                </el-option>
                            </el-select>
                        </div>
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
    watch: {
        'orderData.depositAppendBenchmark' (newV, oldV) {
            if (newV === 'CCF' || oldV === 'CCF') {
                this.orderData.depositAppendArea = '';
            }
        }
    }
};
</script>
