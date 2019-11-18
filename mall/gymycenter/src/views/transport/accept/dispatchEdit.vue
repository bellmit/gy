<template>
    <div class="transport-wrap">
        <h2>调度单-修改<i class="dispatch-tips">(请谨慎修改，每单限定修改3次)</i></h2>
        <form action="javascript:;">
            <div class="gy-form">
                <div class="gy-form-group">
                    <span class="l">品名</span>
                    <span class="form-margin">{{editList.skuName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">合同量</span>
                    <span class="form-margin">{{editList.skuQuantity}}吨</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">已调度</span>
                    <span class="form-margin">{{editList.alreadyDispatch}}吨</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">待调度</span>
                    <span class="form-margin">{{editList.notDispatch}}吨</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">车型</span>
                    <span class="form-margin">{{editList.vehicleTypeName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">车辆</span>
                    <el-select v-model="editList.lgsVehicleId" placeholder="请选择车辆">
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
                    <el-select v-model="editList.driverUserId" placeholder="请选择">
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
                    <el-select v-model="editList.escortUserId" placeholder="请选择">
                        <el-option
                                v-for="(item, index) in escortList"
                                :key="index"
                                :label="item.username"
                                :value="item.userId">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l">本次调度量</span>
                    <span class="form-margin">{{editList.quantityPlanned}}吨</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">执行车次</span>
                    <span class="form-margin">{{editList.dispatchTrains}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">预计装货时间</span>
                    <span class="form-margin">{{editList.estimatedLoadingDate | date}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">预计卸货时间</span>
                    <span class="form-margin">{{editList.estimatedUnloadingDate | date}}</span>
                </div>
            </div>
            <div class="gy-form-button">
                <button class="gy-button-extra" @click="dispatchEdio">确定</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            orderId: null,
            editList: {
                skuName: null, // 品名
                skuQuantity: null, // 合同量
                quantityPlanned: null, // 本次调度量
                alreadyDispatch: null, // 已调度
                driverUsername: null, // 司机
                escortUsername: null, // 押运员
                dispatchTrains: null, // 执行车次
                vehicleTypeName: null, // 车型
                estimatedUnloadingDate: null, // 预计卸货时间
                licensePlateNumber: null, // 车辆
                notDispatch: null, // 未调度
                estimatedLoadingDate: null, // 预计装货时间
                vehicleType: null,
                lgsVehicleId: null, // 车辆id
                driverUserId: null, // 司机id
                escortUserId: null // 押运员id
            },
            carList: [], // 车辆列表
            driverList: [], // 司机列表
            escortList: [] // 押运员列表
        };
    },
    created () {
        this.orderId = this.$route.query.orderId;
        this.getEditList();
        this.getDriverList();
    },
    methods: {
        getEditList () {
            this.$http.get(this.$api.transport.modifyDispatchNoteDetail + this.orderId)
                .then(res => {
                    if (res.data.code === 0) {
                        this.editList = res.data.data;
                        this.handleCarTypeChange();
                    }
                });
        },
        // 根据车型获取车辆
        handleCarTypeChange () {
            this.$http.post(this.$api.transport.carList, {
                data: {
                    infLogisticsDictionaryIdVehicleType: this.editList.vehicleType,
                    valid: 1
                },
                pageNum: 1,
                pageSize: 10000000
            })
                .then(res => {
                    if (res.data.code === 0) {
                        this.carList = res.data.data.data.list;
                    }
                });
        },
        // 获取司机押运员
        getDriverList () {
            let driverData = {};
            driverData.valid = 1;
            driverData.personnelType = 1;
            this.$http.post(this.$api.transport.transportUserAll, driverData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.driverList = res.data.data;
                    }
                });
            let escortData = {};
            escortData.valid = 1;
            escortData.personnelType = 2;
            this.$http.post(this.$api.transport.transportUserAll, escortData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.escortList = res.data.data;
                    }
                });
        },
        // 获取司机押运员
        dispatchEdio () {
            console.log(this.editList);
            this.$http.put(this.$api.transport.dispatch, {
                id: this.orderId, // 调度单id
                driverUserId: this.editList.driverUserId, // 司机id
                escortUserId: this.editList.escortUserId, // 押运员id
                lgsVehicleId: this.editList.lgsVehicleId, // 车辆id
                updatedBy: JSON.parse(localStorage.getItem('userInfo')).id// 当前登入人id
            })
                .then(res => {
                    if (res.data.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                        this.$router.go(-1);
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
        }
    }
};
</script>

<style lang="scss" scoped>
    .transport-wrap{
        h2 .dispatch-tips{
            font-size: 12px;
            color: #E0370F;
            font-weight: normal;
            margin-left:8px;
        }
        .gy-form-button{
            margin-top:10px;
        }
        .form-margin{
            margin-left:10px;
        }
    }
</style>
