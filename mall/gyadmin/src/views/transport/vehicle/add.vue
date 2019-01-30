<template>
  <div class="transport-wrap">
    <div class="gy-h4">{{id ? '车辆编辑' : '车辆添加'}}</div>
    <form action="javascript:;">
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
          <input type="text" placeholder="请输入车牌号" class="gy-input" v-model="vehicleData.licensePlateNumber">
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
          <input type="text" placeholder="请输入发动机号" class="gy-input" v-model="vehicleData.engineNumber">
        </div>
        <div class="gy-form-group">
          <span class="l">VIN</span>
          <input type="text" placeholder="请输入VIN号" class="gy-input" v-model="vehicleData.vin">
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
                valid: null,
                infCarrierTypeId: '',
                engineNumber: '',
                vin: '',
                registerDate: '',
                drivingLicenseValid: '',
                companyId: ''
            },
            infCarrierTypeId: [],
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
            // 承运商列表数据
            carrierCompanyList: []
        };
    },
    created () {
        this.id = this.$route.query.vehicleId;
        this.id && this.getDetail();
        this.getinfCarrierType();
        this.getCarryierCompany();
    },
    methods: {
        // 查找所有承运商
        getCarryierCompany () {
            this.$http.get(this.$api.transport.carryierCompany)
                .then(res => {
                    this.carrierCompanyList = res.data.data;
                });
        },
        // 查找所有
        getCategoryList () {
            this.$http.post(this.$api.category.list)
                .then((res) => {
                    this.categoryList = res.data.data.list;
                });
        },
        // 新增/编辑
        add () {
            // if (this.vehicleData.licensePlateNumber === '') {
            //     this.$message.error('请填写车牌号', '提示');
            //     return;
            // }
            // if (this.vehicleData.valid === '') {
            //     this.$message.error('请填写状态', '提示');
            //     return;
            // }
            // if (this.vehicleData.infCarrierTypeId === '') {
            //     this.$message.error('请填写车型', '提示');
            //     return;
            // }
            // if (this.vehicleData.engineNumber === '') {
            //     this.$message.error('请填写发动机号', '提示');
            //     return;
            // }
            // if (this.vehicleData.vin === '') {
            //     this.$message.error('请填写VIN', '提示');
            //     return;
            // }
            // if (this.vehicleData.registerDate === '') {
            //     this.$message.error('请填写注册日期', '提示');
            //     return;
            // }
            // if (this.vehicleData.drivingLicenseValid === '') {
            //     this.$message.error('请填写行驶证有效期', '提示');
            //     return;
            // }
            if (this.id) {
                this.vehicleData.id = this.id;
                this.$http.put(this.$api.transport.vehicleSave, this.vehicleData)
                    .then((res) => {
                        if (res.data.code === 0) {
                            this.$message.success('编辑成功', '提示', {type: 'success'});
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                return;
            }
            this.$http.post(this.$api.transport.vehicleSave, this.vehicleData)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('添加成功');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        // 查找车辆类型
        getinfCarrierType () {
            this.$http.post(this.$api.transport.carriersList, this.vehicleData)
                .then(res => {
                    this.infCarrierTypeId = res.data.data.list;
                });
        },
        // 查找车辆详情
        getDetail () {
            this.$http.get(this.$api.transport.vehicleDetail + '/' + this.id)
                .then(res => {
                    this.vehicleData = res.data.data;
                });
        },
        // 回退到车辆列表页面
        backToList () {
            this.$router.push({name: 'vehicleList'});
        }

    }
};
</script>
<style lang="scss" scoped>
@import "./../../../styles/module/transportDetail";
</style>
