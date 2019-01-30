<template>
  <div class="transport-wrap order">
    <div class="gy-h4">{{this.getModel.data.id ? '编辑运输人员': '新增运输人员'}}</div>
    <div class="gy-form-box-14">
      <div class="gy-form-group">
        <span class="l">承运商</span>
        <el-select v-model="findData.companyId" filterable placeholder="请选择">
          <el-option
            v-for="item in carrierCompanyList"
            :key="item.companyId"
            :label="item.companyName"
            :value="item.companyId">
          </el-option>
        </el-select>
      </div>
      <div class="gy-form-group">
        <span class="l">姓名</span>
        <input type="text" v-model="findData.username">
      </div>
      <div class="gy-form-group">
        <span class="l">人员类型</span>
        <el-select v-model="findData.personnelType" placeholder="请选择类型">
          <el-option
            v-for="item in personnelTypeItems"
            :key="item.initKeys"
            :label="item.initValues"
            :value="item.initKeys">
          </el-option>
        </el-select>
      </div>
      <div class="gy-form-group">
        <span class="l">性别</span>
        <label><input type="radio" v-model="findData.sex" name="sex" value="1">男</label>
        <label><input type="radio" v-model="findData.sex" name="sex" value="0">女</label>
      </div>
      <div class="gy-form-group">
        <span class="l">手机号</span>
        <input type="text" v-model="findData.phone">
      </div>
      <div class="gy-form-group">
        <span class="l">身份证号</span>
        <input type="text" v-model="findData.identityCode">
      </div>
      <div class="gy-form-group">
        <span class="l">从业资格证号</span>
        <input type="text" v-model="findData.qualificationCode">
      </div>
      <div class="gy-form-group">
        <span class="l">初次领证日期</span>
        <el-date-picker
          v-model="findData.receiveDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>

      </div>
      <div class="gy-form-group">
        <span class="l">证件有效期</span>
        <el-date-picker
          v-model="findData.validDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="gy-form-group">
        <span class="l">准驾车型</span>
        <el-select v-model="findData.vehicleModel" placeholder="请填写准驾车型">
          <el-option
            v-for="item in vehicleModelItems"
            :key="item.initKeys"
            :label="item.initValues"
            :value="item.initKeys">
          </el-option>
        </el-select>
      </div>
      <div class="gy-form-group">
        <span class="l">状态</span>
        <el-select v-model="findData.valid" placeholder="请选择状态">
          <el-option
            v-for="item in validStateItems"
            :key="item.initKeys"
            :label="item.initValues"
            :value="item.initKeys">
          </el-option>
        </el-select>
      </div>
      <div class="gy-form-button">
        <button class="gy-button-extra" @click="submitData">提交</button>
        <button class="gy-button-normal" type="reset" @click="backToList">取消</button>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'add',
    data () {
        return {
            getModel: {
                pageNum: null,
                pageSize: null,
                data: {
                    id: this.$route.params.id
                }
            },
            findData: {
                id: null,
                username: null, // 姓名
                sex: null, // 性别
                vehicleModel: null, // 准驾车型
                qualificationCode: null, // 从业资格证号
                identityCode: null, // 身份证号
                phone: null, // 手机号
                valid: null, // 是否启用
                receiveDate: null, // 初次领证时间
                validDate: null, // 证件有效期
                personnelType: null// 人员类型
            },
            validStateItems: [
                {initKeys: 1, initValues: '已启用'},
                {initKeys: 0, initValues: '未启用'}
            ],
            personnelTypeItems: [
                {initKeys: 1, initValues: '驾驶人'},
                {initKeys: 2, initValues: '押运人'}
            ],
            vehicleModelItems: [
                {initKeys: 'A1', initValues: 'A1'},
                {initKeys: 'A2', initValues: 'A2'},
                {initKeys: 'A3', initValues: 'A3'},
                {initKeys: 'B1', initValues: 'B1'},
                {initKeys: 'B2', initValues: 'B2'},
                {initKeys: '其他', initValues: '其他'}
            ],
            carrierCompanyList: []
        };
    },
    created () {
        this.getModel.data.id && this.initInfo(); // 基础信息
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
        // 提交数据
        submitData () {
            if (this.getModel.data.id) {
                this.findData.id = this.getModel.data.id;
                this.$http.put(this.$api.transport.transportUser, this.findData)
                    .then((res) => {
                        if (res.data.code === 0) {
                            this.$message.success('修改成功！');
                        }
                    });
            } else {
                this.$http.post(this.$api.transport.transportUser, this.findData)
                    .then((res) => {
                        this.statusCount = res.data.data;
                        if (res.data.code === 0) {
                            this.$message.success('新增成功！');
                            this.backToList();
                        }
                    });
            }
        },
        initInfo () {
            this.$http.post(this.$api.transport.transportUserList, this.getModel)
                .then((res) => {
                    this.findData = res.data.data.list[0];
                });
        },
        explainPersonnelType (personnelType) {
            if (personnelType === 1) {
                return '驾驶人';
            } else if (personnelType === 2) {
                return '押运人';
            } else {
                return '未知';
            }
        },
        explainValidType (validType) {
            if (validType === 0) {
                return '已禁用';
            } else if (validType === 1) {
                return '已启用';
            } else {
                return '未知';
            }
        },
        backToList () {
            this.$router.push({name: 'driverList'});
        }

    }
};
</script>
<style lang="scss" scoped>
  .gy-button-extra {
     margin-right: 8px;
  }

  .gy-form-button {
     padding: 0;
  }

  .gy-form-box-14 {
    padding: 6px 14px 30px;
  }

  .gy-form-group {
    padding-left: 95px;
    .l {
      width: 85px;
    }
  }

  .gy-form-group:nth-child(odd) {
    padding-right: 30px;
  }

  .gy-form-group:nth-child(even) {
    padding-left: 125px;
    .l {
      width: 115px;
      padding-left: 30px;
    }
  }
</style>
