<template>
    <div class="transport-wrap">
        <h2>{{id ? '车辆编辑' : '车辆添加'}}</h2>
        <form action="javascript:;">
            <div class="gy-form">
                <div class="gy-form-group">
                    <span class="l">车牌号</span>
                    <input type="text" class="gy-input" v-model="vehicleData.licensePlateNumber">
                </div>
                <div class="gy-form-group">
                    <span class="l">车型</span>
                        <el-select v-model="vehicleData.infCarrierTypeId" placeholder="请选择">
                            <el-option
                                v-for="item in infCarrierTypeId"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l">发动机号</span>
                    <input type="text" class="gy-input" v-model="vehicleData.engineNumber">
                </div>
                <div class="gy-form-group">
                    <span class="l">VIN</span>
                    <input type="text" class="gy-input" v-model="vehicleData.vin">
                </div>
                <div class="gy-form-group">
                    <span class="l">注册日期</span>
                    <el-date-picker
                        v-model="vehicleData.registerDate"
                        type="date"
                        placeholder="选择时间">
                    </el-date-picker>

                </div>
                <div class="gy-form-group">
                    <span class="l">行驶证有效期</span>
                    <el-date-picker
                        v-model="vehicleData.drivingLicenseValid"
                        type="date"
                        placeholder="选择时间">
                    </el-date-picker>
                </div>

                <div class="gy-form-group">
                    <span class="l">状态</span>
                        <el-select v-model="vehicleData.valid" placeholder="请选择">
                            <el-option
                                v-for="item in valid"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id">
                            </el-option>
                        </el-select>
                </div>

                <div class="gy-form-button">
                    <button class="gy-button-extra" @click="add">{{id ? '编辑' : '添加'}}</button>
                    <button class="gy-button-normal" type="reset">取消</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            id: '',
            vehicleData: {
                licensePlateNumber: '',
                valid: null,
                infCarrierTypeId: '',
                engineNumber: '',
                vin: '',
                registerDate: '',
                drivingLicenseValid: ''
            },
            infCarrierTypeId: [

            ],
            valid: [
                {
                    id: 0,
                    value: '已启用'
                },
                {
                    id: 1,
                    value: '未启用'
                }
            ]
        };
    },
    created () {
        this.id = this.$route.query.vehicleId;
        this.id && this.getDetail();
        this.getinfCarrierType();
    },
    methods: {
        getCategoryList () {
            let that = this;
            that.$http.post(that.$api.category.list)
                .then(function (res) {
                    that.categoryList = res.data.data.list;
                });
        },
        add () {
            let that = this;

            /* if (that.vehicleData.licensePlateNumber === '') {
                                    that.$alert('请填写车牌号', '提示');
                                    return;
                                }
                                if (that.vehicleData.valid === '') {
                                    that.$alert('请填写状态', '提示');
                                    return;
                                }
                                if (that.vehicleData.infCarrierTypeId === '') {
                                    that.$alert('请填写车型', '提示');
                                    return;
                                }
                                if (that.vehicleData.engineNumber === '') {
                                    that.$alert('请填写发动机号', '提示');
                                    return;
                                }
                                if (that.vehicleData.vin === '') {
                                    that.$alert('请填写VIN', '提示');
                                    return;
                                }
                                if (that.vehicleData.registerDate === '') {
                                    that.$alert('请填写注册日期', '提示');
                                    return;
                                }
                                if (that.vehicleData.drivingLicenseValid === '') {
                                    that.$alert('请填写行驶证有效期', '提示');
                                    return;
                                } */
            if (that.id) {
                that.vehicleData.id = that.id;
                that.$http.put(that.$api.transport.vehicleSave, that.vehicleData)
                    .then(function (res) {
                        if (res.data.code === 0) {
                            that.$alert('编辑成功', '提示');
                            return;
                        }
                        that.$alert(res.data.message, '出错了');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                return;
            }
            that.$http.post(that.$api.transport.vehicleSave, that.vehicleData)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.$alert('添加成功', '提示');
                        return;
                    }
                    that.$alert(res.data.message, '出错了');
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getinfCarrierType () {
            this.$http.post(this.$api.transport.carriersList, this.vehicleData)
                .then(res => {
                    this.infCarrierTypeId = res.data.data.list;
                });
        },
        getDetail: function () {
            let that = this;
            that.$http.get(that.$api.transport.vehicleDetail + '/' + that.id)
                .then(res => {
                    console.log(res);
                    that.vehicleData = res.data.data;
                });
        }
    }
};
</script>
<style>
    .gy-form-group{
        min-height:60px;
        line-height:30px;
    }
</style>
