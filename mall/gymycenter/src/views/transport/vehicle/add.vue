<template>
    <div class="transport-wrap">
        <h2>{{id ? '车辆管理' : '车辆管理'}}</h2>
        <form action="javascript:;">
            <div class="gy-form">
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>车牌号</span>
                    <input type="text" class="gy-input" v-model="vehicleData.licensePlateNumber">
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>车型</span>
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
                    <span class="l"><strong>*</strong>发动机号</span>
                    <input type="text" class="gy-input" v-model="vehicleData.engineNumber">
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>VIN</span>
                    <input type="text" class="gy-input" v-model="vehicleData.vin">
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>注册日期</span>
                    <el-date-picker
                        v-model="vehicleData.registerDate"
                        type="date"
                        placeholder="选择时间">
                    </el-date-picker>

                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>行驶证有效期</span>
                    <el-date-picker
                        v-model="vehicleData.drivingLicenseValid"
                        type="date"
                        placeholder="选择时间">
                    </el-date-picker>
                </div>

                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>状态</span>
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
                    <button class="gy-button-normal" type="reset" @click="backToList">取消</button>
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
                valid: 1,
                infCarrierTypeId: '',
                engineNumber: '',
                vin: '',
                registerDate: '',
                drivingLicenseValid: ''
            },
            infCarrierTypeId: [],
            valid: [
                {
                    id: 1,
                    value: '已启用'
                },
                {
                    id: 0,
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
            if (!that.vehicleData.licensePlateNumber) {
                that.$message.error('请填写车牌号');
                return;
            }
            if (that.vehicleData.valid === '' || that.vehicleData.valid === null) {
                that.$message.error('请填写状态');
                return;
            }
            if (!that.vehicleData.infCarrierTypeId) {
                that.$message.error('请填写车型');
                return;
            }
            if (!that.vehicleData.engineNumber) {
                that.$message.error('请填写发动机号');
                return;
            }
            if (!that.vehicleData.vin) {
                that.$message.error('请填写VIN');
                return;
            }
            if (!that.vehicleData.registerDate) {
                that.$message.error('请填写注册日期');
                return;
            }
            if (!that.vehicleData.drivingLicenseValid) {
                that.$message.error('请填写行驶证有效期');
                return;
            }
            if (that.id) {
                that.vehicleData.id = that.id;
                that.$http.put(that.$api.transport.vehicleSave, that.vehicleData)
                    .then(function (res) {
                        if (res.data.code === 0) {
                            that.$alert('编辑成功', '提示', {type: 'success'});
                            return;
                        }
                        that.$alert(res.data.message, '出错了', {type: 'error'});
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                return;
            }
            that.$http.post(that.$api.transport.vehicleSave, that.vehicleData)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.$alert('添加成功', '提示', {type: 'success'});
                        that.backToList();
                    } else {
                        that.$alert(res.data.message, '出错了', {type: 'error'});
                    }
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
        },
        backToList: function () {
            this.$router.push({name: 'vehicleList'});
        }

    }
};
</script>
