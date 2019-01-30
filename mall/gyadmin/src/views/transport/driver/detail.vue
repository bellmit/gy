<template>
  <div class="transport-wrap order">
    <div class="gy-h4">司机信息</div>
    <div class="gy-form-box-14">
      <div class="gy-form-group">
        <span class="l">承运商</span>
        <el-select v-if="Model!=null" v-model="Model.companyId" filterable placeholder="请选择">
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
        <span class="2" v-if="Model!=null">{{Model.username}}</span>
      </div>
      <div class="gy-form-group">
        <span class="l">人员类型</span>
        <span class="2" v-if="Model!=null" v-text="explainPersonnelType(Model.personnelType)"></span>
      </div>
      <div class="gy-form-group">
        <span class="l">性别</span>
        <label v-if="Model!=null" v-text="explainSexType(Model.sex)"></label>
      </div>
      <div class="gy-form-group">
        <span class="l">手机号</span>
        <span class="2" v-if="Model!=null">{{Model.phone}}</span>
      </div>
      <div class="gy-form-group">
        <span class="l">身份证号</span>
        <span class="2" v-if="Model!=null">{{Model.identityCode}}</span>
      </div>
      <div class="gy-form-group">
        <span class="l">从业资格证号</span>
        <span class="2" v-if="Model!=null">{{Model.qualificationCode}}</span>
      </div>
      <div class="gy-form-group">
        <span class="l">初次领证日期</span>
        <span class="2" v-if="Model!=null">{{Model.receiveDate | date}}</span>
      </div>
      <div class="gy-form-group">
        <span class="l">证件有效期</span>
        <span class="2" v-if="Model!=null">{{Model.validDate | date}}</span>
      </div>
      <div class="gy-form-group">
        <span class="l">准驾车型</span>
        <span class="2" v-if="Model!=null">{{Model.vehicleModel}}</span>
      </div>
      <div class="gy-form-group">
        <span class="l">状态</span>
        <span class="2" v-if="Model!=null" v-text="explainValidType(Model.valid)"></span>
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
    name: 'detail',
    data () {
        return {
            getModel: {
                pageNum: null,
                pageSize: null,
                data: {
                    id: this.$route.query.id
                }
            },
            Model: null,
            // 人员状态
            validState: [
                {initKeys: '1', initValues: '已启用'},
                {initKeys: '0', initValues: '未启用'}
            ],
            // 人员类型
            personnelTypeState: [
                {initKeys: '1', initValues: '驾驶人'},
                {initKeys: '2', initValues: '押运人'}
            ],
            // 承运商列表数据
            carrierCompanyList: []
        };
    },
    created () {
        this.initData();
    },
    methods: {
        // 初始化数据
        initData () {
        // alert(this.getModel.id);
            this.$http.post(this.$api.transport.transportUserList, this.getModel)
                .then((res) => {
                    this.Model = res.data.data.list[0];
                });
            this.getCarryierCompany();
        },
        // 查找所有承运商
        getCarryierCompany () {
            this.$http.get(this.$api.transport.carryierCompany)
                .then((res) => {
                    this.carrierCompanyList = res.data.data;
                });
        },
        // 解析人员类型
        explainPersonnelType (personnelType) {
            if (personnelType === 1) {
                return '驾驶人';
            } else if (personnelType === 2) {
                return '押运人';
            } else {
                return '未知';
            }
        },
        // 解析人员状态
        explainValidType (validType) {
            if (validType === 0) {
                return '已禁用';
            } else if (validType === 1) {
                return '已启用';
            } else {
                return '未知';
            }
        },
        // 解析性别
        explainSexType (sexType) {
            if (sexType === 0) {
                return '女';
            } else if (sexType === 1) {
                return '男';
            } else {
                return '未知';
            }
        },
        // 退回到人员列表页面
        backToList () {
            this.$router.push({name: 'driverList'});
        }

    }

};
</script>
<style lang="scss" scoped>
.gy-form-box-14 {
   padding: 6px 14px 30px;
}

.gy-form-button {
   padding: 0;
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
