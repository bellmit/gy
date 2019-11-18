<template>
    <div class="essential-row">
        <div class="essential-item">
            <div class="essential-title"><span v-if="compData.isNecessary" class="isMust">*</span>发票月份</div>
            <div class="essential-text">
                <el-radio-group v-model="orderData.provideInvoiceType">
                    <el-radio :label="1">交割月</el-radio>
                    <el-radio :label="2">交割次月</el-radio>
                    <el-radio :label="3">交割后</el-radio>
                    <span v-if="orderData.provideInvoiceType === 3 || orderData.provideInvoiceType === '3'"
                            style="font-size: 13px"><input type="text" style="width: 50px" v-model="orderData.provideInvoiceDays">工作日</span>
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
    methods: {
    }
};
</script>
