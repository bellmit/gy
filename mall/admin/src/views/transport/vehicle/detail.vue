<template>
  <div class="transport-wrap order">
    <div class="gy-h4">车辆查看</div>
    <div class="gy-form-box-14">
      <div class="gy-form-group">
        <span class="l">承运商</span>
        <el-select v-model="vehicleData.companyId" filterable placeholder="请选择">
          <el-option
            v-for="item in carrierCompanyList"
            :key="item.companyId"
            :label="item.companyName"
            :value="item.companyId">
          </el-option>
        </el-select>
      </div>
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
      <div class="gy-form-button">
        <button class="gy-button-extra" type="reset" @click="backToList">取消</button>
      </div>
      <div class="clear"></div>
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
                    value: '未启用'
                },
                {
                    id: 1,
                    value: '已启用'
                }
            ],
            carrierCompanyList: []
        };
    },
    created () {
        this.vehicleId = this.$route.query.vehicleId;
        this.vehicleId && this.getDetail();
        this.getCarryierCompany();
    },
    methods: {
        // 查找所有承运商
        getCarryierCompany () {
            this.$http.get(this.$api.transport.carryierCompany)
                .then((res) => {
                    this.carrierCompanyList = res.data.data;
                });
        },
        // 查找车辆详细信息
        getDetail () {
            this.$http.get(this.$api.transport.vehicleDetail + '/' + this.vehicleId)
                .then((res) => {
                    this.vehicleData = res.data.data;
                });
        },
        // 退回到车辆列表页面
        backToList () {
            this.$router.push({name: 'vehicleList'});
        }
    }
};
</script>

<style lang="scss" scoped>
@import "./../../../styles/module/transportDetail";
</style>
