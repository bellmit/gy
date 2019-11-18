<template><!-- 上游长约 -->
    <div class="essential-row" v-if="bizType === 6">
        <div class="essential-item">
            <div class="essential-title"><span v-if="compData.isNecessary" class="isMust"></span>上游合约</div>
            <div class="essential-text" style="flex-direction: column">
                <div class="essential-text" style="margin-right: 0">
                    <div class="d">
                        <input type="text" placeholder="请选择上游合约编号" readonly v-model="contractCodeUp">
                        <i class="el-icon-close" v-if="contractCodeUp !== null && contractCodeUp !== undefined" @click="delectSeachContract"
                           style="position: absolute;top: 11px;right: 30px;cursor: pointer;"></i>
                        <i class="iconfont icon-search" @click="onSeachContract('上游')"
                           style="position: absolute;right: 5px;top: 3px;"></i>
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
        orderData: Object,
        bizType: Number,
        needRefresh: Number
    },
    data () {
        return {
            contractCodeUp: null
        };
    },
    methods: {
        // 弹出选择单边合同的对话框
        onSeachContract (val) {
            this.$parent.onSeachContract(val);
        },
        // 取消已选择的长约
        delectSeachContract () {
            this.orderData.contractCode = null;
            this.orderData.longtermContractOrderId = null;
            this.contractCodeUp = null;
        }
    },
    watch: {
        needRefresh (newValue, oldValue) {
            if (newValue) {
                this.contractCodeUp = this.orderData.contractCode;
            }
        }
    }
};
</script>
