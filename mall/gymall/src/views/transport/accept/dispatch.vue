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
                    <span>{{dispatched}}</span>
                    <span class="unit">{{infUnitOfMeasureName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">待调度</span>
                    <span>{{undispatched}}</span>
                    <span class="unit">{{infUnitOfMeasureName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">车型</span>
                    <el-select v-model="dispatchData.infCarrierTypeId" @change="handleCarTypeChange" placeholder="请选择">
                        <el-option
                          v-for="item in carType"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l">车辆</span>
                    <el-select v-model="dispatchData.carId" placeholder="请选择车辆">
                        <el-option
                          v-for="item in carList"
                          :key="item.id"
                          :label="item.licensePlateNumber"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l">司机</span>
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
                          v-for="(item, index) in driverList"
                          :key="index"
                          :label="item.username"
                          :value="item.userId">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l">本次调度量</span>
                    <input type="text" class="gy-input" v-model="dispatchData.quantityLoading">
                    <span class="unit">{{infUnitOfMeasureName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">执行车次</span>
                    <input type="text" class="gy-input" v-model="dispatchData.dispatchTrains">
                </div>
                <div class="gy-form-group">
                    <span class="l">预计装货时间</span>
                    <el-date-picker
                      v-model="dispatchData.estimatedLoadingDate"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="gy-form-group">
                    <span class="l">预计卸货时间</span>
                    <el-date-picker
                      v-model="dispatchData.estimatedUnloadingDate"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="gy-form-button">
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
                infCarrierTypeId: null,
                carId: null,
                estimatedLoadingDate: null,
                estimatedUnloadingDate: null,
                dispatchTrains: null,
                driverUserId: null,
                escortUserId: null,
                quantityLoading: null
            },
            infUnitOfMeasureName: null,
            dispatched: null,
            undispatched: null,
            driverList: []
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
                            this.undispatched = this.orderInfo.consignmentNoteItemList[0].skuQuantity - this.dispatched;
                        });
                });
        },
        getCarType () {
            this.$http.post(this.$api.transport.carType)
                .then(res => {
                    this.carType = res.data.data.list;
                });
        },
        handleCarTypeChange () {
            this.dispatchData.carId = null;
            this.$http.post(this.$api.transport.carList, {
                data: {
                    infCarrierTypeId: this.dispatchData.infCarrierTypeId
                },
                pageNum: 1,
                pageSize: 10000000
            })
                .then(res => {
                    this.carList = res.data.data.data.list;
                });
        },
        getDriverList () {
            this.$http.get(this.$api.transport.driver)
                .then(res => {
                    this.driverList = res.data.data;
                });
        },
        dispatch () {
            let phpHeader = {
                withCredentials: false,
                baseURL: ''
            };
            this.dispatchData.lgsConsignmentNoteId = this.orderId;
            this.$http.post(this.$api.transport.dispatch, this.dispatchData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('提交成功', '提示').then(() => {
                            this.dispatchData.dispatchNoteId = res.data.data.id;
                            // for php
                            this.$http.post('http://logistics.app.api.uat.chinayie.net/?modules=driver&model=Api&action=AddOrderDispatch', this.dispatchData, phpHeader)
                                .then(r => {
                                    console.log(r);
                                });
                        });
                    }
                });
        }
    }
};
</script>
<style lang="scss" scoped>
    .unit{
        width: auto;
        font-size: $small-font;
        position: absolute;
        right: 50px;
        top: 10px;
    }
</style>
