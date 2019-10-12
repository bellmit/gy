<template>
    <div class="transport-wrap order">
        <h2 class="gy-h2">车辆查看</h2>
        <div class="t">
            <div class="gy-form-group">
                <span class="l">车牌号</span>
                <span>{{vehicleData.licensePlateNumber}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">车型</span>
                <span>{{vehicleData.infCarrierName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">发动机号</span>
                <span>{{vehicleData.engineNumber}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">VIN</span>
                <span>{{vehicleData.vin}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">注册日期</span>
                <span>{{vehicleData.registerDate | date}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">行驶证有效期</span>
                <span>{{vehicleData.drivingLicenseValid | date}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">状态</span>
                <span>{{vehicleData.valid === 1 ? '可用' : '不可用'}}</span>
            </div>

            <div class="button-box">
                <router-link :to="{path: 'list', query:{}}" class="gy-button-extra">返回列表</router-link>
            </div>
        </div>
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
            categoryList: '',
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
        this.vehicleId = this.$route.query.vehicleId;
        this.vehicleId && this.getDetail();
    },
    methods: {
        getDetail: function () {
            let that = this;
            that.$http.get(that.$api.transport.vehicleDetail + '/' + that.vehicleId)
                .then(res => {
                    console.log(res);
                    that.vehicleData = res.data.data;
                });
        }
    }
};
</script>
