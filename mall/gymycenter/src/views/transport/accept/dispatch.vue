<template>
    <div class="transport-wrap">
        <h2>调度单</h2>
        <form action="javascript:;">
            <div class="gy-form">
                <div class="gy-form-group">
                    <span class="l">品名</span>
                    <span v-for="pro in orderInfo.consignmentNoteItemList" :key="pro.id">{{pro.skuName}}</span>
                </div>
                <div class="gy-form-group weight">
                    <span class="l">合同量</span>
                    <span v-for="pro in orderInfo.consignmentNoteItemList" :key="pro.id">{{pro.skuQuantity}}</span>
                    <span class="unit">{{infUnitOfMeasureName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">已调度</span>
                    <span>{{dispatched || 0}}</span>
                    <span class="unit">{{infUnitOfMeasureName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">待调度</span>
                    <span>{{undispatched || 0}}</span>
                    <span class="unit">{{infUnitOfMeasureName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>车型</span>
                    <el-select v-model="dispatchData.infLogisticsDictionaryIdVehicleType" @change="handleCarTypeChange" placeholder="请选择">
                        <el-option
                            v-for="item in carType"
                            :key="item.id"
                            :label="item.logisticsDictionaryName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>车辆</span>
                    <el-select v-model="dispatchData.lgsVehicleId" placeholder="请选择车辆">
                        <el-option
                            v-for="item in carList"
                            :key="item.id"
                            :label="item.licensePlateNumber"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>司机</span>
                    <el-select v-model="dispatchData.driverUserId" placeholder="请选择">
                        <el-option
                            v-for="(item, index) in driverList"
                            :key="index"
                            :label="item.username"
                            :value="item.userId">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l">押运员</span>
                    <el-select v-model="dispatchData.escortUserId" placeholder="请选择">
                        <el-option
                            v-for="(item, index) in escortList"
                            :key="index"
                            :label="item.username"
                            :value="item.userId">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>本次调度量</span>
                    <input type="text" class="gy-input" v-model="dispatchData.quantityPlanned">
                    <span class="unit">{{infUnitOfMeasureName}}</span>
                </div>
                <div class="gy-form-group" style="display: none;">
                    <span class="l">执行车次</span>
                    <input type="text" class="gy-input" v-model="dispatchData.dispatchTrains" disabled>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>预计装货时间</span>
                    <el-date-picker
                        v-model="dispatchData.estimatedLoadingDate"
                        type="datetime"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>预计卸货时间</span>
                    <el-date-picker
                        v-model="dispatchData.estimatedUnloadingDate"
                        type="datetime"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="gy-form-button" v-if="undispatched > 0">
                    <button class="gy-button-extra" @click="dispatch">调度</button>
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
            carType: [],
            carList: [],
            dispatchData: {
                lgsConsignmentNoteId: null,
                infLogisticsDictionaryIdVehicleType: null,
                lgsVehicleId: null,
                estimatedLoadingDate: null,
                estimatedUnloadingDate: null,
                dispatchTrains: 1,
                driverUserId: null,
                escortUserId: null,
                quantityPlanned: null
            },
            infUnitOfMeasureName: null,
            dispatched: null,
            undispatched: null,
            driverList: [],
            escortList: []
        };
    },
    created () {
        this.orderId = this.$route.query.orderId;
        this.getOrderInfo();
        this.getCarType();
        this.getDriverList();
    },
    methods: {
        getOrderInfo () {
            this.$http.get(this.$api.transport.newCharge + '/' + this.orderId)
                .then(res => {
                    this.orderInfo = res.data.data;
                    this.infUnitOfMeasureName = this.orderInfo.consignmentNoteItemList[0].infUnitOfMeasureName || '吨';
                    this.$http.get(this.$api.transport.dispatchAmount + '/' + this.orderId)
                        .then(r => {
                            this.dispatched = r.data.data;
                            let n = this.orderInfo.consignmentNoteItemList[0].skuQuantity - this.dispatched;
                            this.undispatched = this.$tools.toFixedFn(n, 3);
                        });
                });
        },
        getCarType () {
            this.$http.get(this.$api.transport.carType)
                .then(res => {
                    this.carType = res.data.data;
                });
        },
        handleCarTypeChange () {
            this.dispatchData.carId = null;
            this.$http.post(this.$api.transport.list, {
                infLogisticsDictionaryIdVehicleType: this.dispatchData.infLogisticsDictionaryIdVehicleType,
                valid: 1
            })
                .then(res => {
                    this.dispatchData.lgsVehicleId = '';
                    this.carList = res.data.data;
                });
        },
        getDriverList () {
            let driverData = {};
            driverData.valid = 1;
            driverData.personnelType = 1;
            this.$http.post(this.$api.transport.transportUserAll, driverData)
                .then(res => {
                    console.log(res);
                    this.driverList = res.data.data;
                });
            let escortData = {};
            escortData.valid = 1;
            escortData.personnelType = 2;
            this.$http.post(this.$api.transport.transportUserAll, escortData)
                .then(res => {
                    console.log(res);
                    this.escortList = res.data.data;
                });
        },
        dispatch () {
            if (!this.dispatchData.infLogisticsDictionaryIdVehicleType) {
                this.$message.error('请选择车型');
                return;
            }
            if (!this.dispatchData.lgsVehicleId) {
                this.$message.error('请选择车辆');
                return;
            }
            if (!this.dispatchData.driverUserId) {
                this.$message.error('请选择司机');
                return;
            }
            if (!this.dispatchData.quantityPlanned) {
                this.$message.error('本次调度量不能为空');
                return;
            }
            if (Number(this.dispatchData.quantityPlanned) > Number(this.undispatched)) {
                this.$message.error('本次调度量不能大于待调度量');
                return;
            }
            if (!this.dispatchData.estimatedLoadingDate) {
                this.$message.error('装货时间不能为空');
                return;
            }
            if (!this.dispatchData.estimatedUnloadingDate) {
                this.$message.error('卸货时间不能为空');
                return;
            }
            this.dispatchData.lgsConsignmentNoteId = this.orderId;
            this.$http.post(this.$api.transport.dispatch, this.dispatchData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$confirm('提交成功，是否继续调度？', '提示', {type: 'success'})
                            .then(() => {
                                location.reload();
                            }).catch(() => {
                                this.$router.push({name: 'transparentOrderDetail', query: {view: true, orderId: this.orderId}});
                            });
                        return;
                    }
                    this.$message.error(res.data.message);
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
