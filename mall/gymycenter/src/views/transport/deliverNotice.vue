<template>
    <div class="transport-wrap">
        <h2>发货通知单</h2>
        <form action="javascript:;">
            <div class="gy-form">
                <div class="gy-form-group">
                    <span class="l">品名</span>
                    <span v-for="pro in orderInfo.consignmentNoteItemList" :key="pro.id">{{pro.skuName}}</span>
                </div>
                <div class="gy-form-group weight">
                    <span class="l">合同量</span>
                    <span v-for="pro in orderInfo.consignmentNoteItemList" :key="pro.id">{{pro.skuQuantity}}{{infUnitOfMeasureName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">运输订单号</span>
                    <span>{{orderInfo.consignmentNoteCode}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>预计装货时间</span>
                    <el-date-picker
                        v-model="deliverData.estimatedLoadingDate"
                        type="datetime"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>预计卸货时间</span>
                    <el-date-picker
                        v-model="deliverData.estimatedUnloadingDate"
                        type="datetime"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="gy-form-button">
                    <button class="gy-button-extra" @click="deliver">提交</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data () {
        return {
            orderId: null,
            orderInfo: {},
            deliverData: {
                lgsConsignmentNoteCode: null,
                skuName: null,
                skuQuantity: null,
                estimatedLoadingDate: null,
                estimatedUnloadingDate: null,
                username: null,
                phone: null
            },
            infUnitOfMeasureName: null
        };
    },
    created () {
        this.orderId = this.$route.query.orderId;
        if (localStorage.getItem('userInfo')) {
            this.deliverData.username = JSON.parse(localStorage.getItem('userInfo')).username;
            this.deliverData.phone = JSON.parse(localStorage.getItem('userInfo')).phone;
        }
        this.getOrderInfo();
    },
    methods: {
        getOrderInfo () {
            this.$http.get(this.$api.transport.newCharge + '/' + this.orderId)
                .then(res => {
                    this.orderInfo = res.data.data;
                    this.infUnitOfMeasureName = this.orderInfo.consignmentNoteItemList[0].infUnitOfMeasureName || '吨';
                    this.deliverData.lgsConsignmentNoteCode = this.orderInfo.consignmentNoteCode;
                    this.deliverData.skuName = this.orderInfo.consignmentNoteItemList[0].skuName;
                    this.deliverData.skuQuantity = this.orderInfo.consignmentNoteItemList[0].skuQuantity;
                });
        },
        deliver () {
            if (!this.deliverData.estimatedLoadingDate) {
                this.$message.error('装货时间不能为空');
                return;
            }
            if (!this.deliverData.estimatedUnloadingDate) {
                this.$message.error('卸货时间不能为空');
                return;
            }
            this.$http.post(this.$api.transport.deliverNotice, this.deliverData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('提交成功', '提示', {type: 'success'}).then(() => {
                            this.$router.push({name: 'transparentOrder'});
                        });
                    }
                });
        }
    }
};
</script>
<style lang="scss" scoped>
    .unit {
        width: auto;
        font-size: $small-font;
        position: absolute;
        right: 50px;
        top: 10px;
    }
</style>
