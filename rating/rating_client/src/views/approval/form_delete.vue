<template>
  <div class="approval">
      <div class="gy-form">
        <div class="gy-form-group">
            <span class="l">注册日期</span>
            <el-date-picker
                class="form-date"
                v-model="form.registrationDate"
                type="date"
                placeholder="选择日期"
                v-if="groupId===0">
            </el-date-picker>
            <span v-else>{{form.registrationDate | date}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">注册资本</span>
            <input v-if="groupId===0" class="gy-input" v-model="form.registeredCapital" placeholder="请填写">
            <span v-else>{{form.registeredCapital}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">实缴资本</span>
            <input v-if="groupId===0" class="gy-input" v-model="form.paidInCapital" placeholder="请填写">
            <span v-else>{{form.paidInCapital}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">工商登记异常</span>
            <input v-if="groupId===0" class="gy-input" v-model="form.registrationAbnormality" placeholder="请填写">
            <span v-else>{{form.registrationAbnormality}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">法人</span>
            <input v-if="groupId===0" class="gy-input" v-model="form.legalPerson" placeholder="请填写">
            <span v-else>{{form.legalPerson}}</span>
        </div>
        <div class="gy-form-group single-row">
            <span class="l">经营范围</span>
            <textarea v-if="groupId===0" class="gy-textarea" v-model="form.businessScope" cols="30" rows="10" placeholder="请填写"></textarea>
            <span v-else>{{form.businessScope}}</span>
        </div>
        <div class="gy-form-group single-row">
            <span class="l">股东情况</span>
            <textarea v-if="groupId===0" class="gy-textarea" v-model="form.shareholder" cols="30" rows="10" placeholder="请填写"></textarea>
            <span v-else>{{form.shareholder}}</span>
        </div>
        <div class="gy-form-group single-row">
            <span class="l">关联公司</span>
            <textarea v-if="groupId===0" class="gy-textarea" v-model="form.associatedCompany" cols="30" rows="10" placeholder="请填写"></textarea>
            <span v-else>{{form.associatedCompany}}</span>
        </div>
        <div class="gy-form-group single-row">
            <span class="l">动产融资情况</span>
            <textarea v-if="groupId===0" class="gy-textarea" v-model="form.movableFinancing" cols="30" rows="10" placeholder="请填写"></textarea>
            <span v-else>{{form.movableFinancing}}</span>
        </div>
        <div class="gy-form-group single-row">
            <span class="l">股权质押情况</span>
            <textarea v-if="groupId===0" class="gy-textarea" v-model="form.equityPledge" cols="30" rows="10" placeholder="请填写"></textarea>
            <span v-else>{{form.equityPledge}}</span>
        </div>
        <div class="gy-form-group single-row">
            <span class="l">涉诉执行情况(重大经纪合同纠纷)</span>
            <textarea v-if="groupId===0" class="gy-textarea" v-model="form.litigation" cols="30" rows="10" placeholder="请填写"></textarea>
            <span v-else>{{form.litigation}}</span>
        </div>
        <div class="gy-form-group single-row">
            <span class="l">行政处罚情况(税务及环保等)</span>
            <textarea v-if="groupId===0" class="gy-textarea" v-model="form.administrativePenalties" cols="30" rows="10" placeholder="请填写"></textarea>
            <span v-else>{{form.administrativePenalties}}</span>
        </div>
        <div class="gy-form-group single-row btn-wrap" v-if="groupId===0">
            <button class="gy-button-normal m-l" @click="save">保存</button>
            <button class="gy-button-normal bgColor m-r" @click="put(0)">提交</button>
        </div>
        <div class="gy-form-group single-row btn-wrap" v-else>
            <button class="gy-button-normal bgColor m-r" @click="put(1)">审批</button>
        </div>
      </div>
      <el-dialog :visible.sync="isSubmit" class="my-dialog">
          <!-- 当前评级 -->
          <div class="gy-form my-form" v-if="groupId !== 0">
            <p class="title">当前评级</p>
            <div class="gy-form-group">
                <span class="l">大类</span>
                <span>{{currentInfo.primaryCategoryName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">小类</span>
                <span>{{currentInfo.secondaryCategoryName}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">基准等级</span>
                <span>{{currentInfo.baseRank}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">最新评级</span>
                <span>{{currentInfo.finalRank}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">审批意见</span>
                <span>{{currentInfo.remark}}</span>
            </div>
          </div>
          <!-- 客户评级 -->
          <div class="gy-form my-form">
            <p class="title t-2">客户评级</p>
            <div class="gy-form-group">
                <span class="l">大类</span>
                <el-select v-model="infoForm.primaryCategoryId" placeholder="请选择" @change="changeParent">
                    <el-option
                        v-for="(item, index) in parentList"
                        :key="index"
                        :label="item.categoryName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l">小类</span>
                <el-select v-model="infoForm.secondaryCategoryId" placeholder="请先选择大类">
                    <el-option
                        v-for="(item, index) in childList"
                        :key="index"
                        :label="item.categoryName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l">基础评级</span>
                <el-select v-model="infoForm.baseRatingId" placeholder="请选择">
                    <el-option
                        v-for="(item, index) in basicTypeList"
                        :key="index"
                        :label="item.rank"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l">最终评级</span>
                <el-select v-model="infoForm.ratingId" placeholder="请选择">
                    <el-option
                        v-for="(item, index) in finalTypeList"
                        :key="index"
                        :label="item.rank"
                        :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group single-row">
                <span class="l">审批意见</span>
                <textarea class="gy-textarea" v-model="infoForm.remark" cols="30" rows="10" placeholder="请填写"></textarea>
            </div>
            <div class="tips l">
              <span class="t">温馨提示：</span>
              <span v-if="groupId === 0">风控经理审批后，将移交风控总监审批。</span>
              <span v-else>风控总监审批后，将移交风控总经理审批。</span>
            </div>
            <div class="gy-form-group single-row btn-wrap">
                <button class="gy-button-normal bgColor m-l" @click="submit">提交</button>
                <button class="gy-button-normal m-r" @click="isSubmit = false">取消</button>
            </div>
          </div>
      </el-dialog>
  </div>
</template>
<script>
export default {
    data () {
        return {
            form: {
                rskRatingTaskId: this.$route.query.rskRatingTaskId, // 评级任务ID
                applyCompanyId: null, // 申请公司ID
                registrationDate: null, // 注册日期
                registeredCapital: null, // 注册资本
                paidInCapital: null, // 实缴资本
                registrationAbnormality: null, // 工商登记异常
                legalPerson: null, // 法人
                businessScope: null, // 经营范围
                shareholder: null, // 股东情况
                associatedCompany: null, // 关联公司
                movableFinancing: null, // 动产融资情况
                equityPledge: null, // 股权质押情况
                litigation: null, // 涉诉及执行情况
                administrativePenalties: null, // 行政处罚情况
                userId: null // 当前用户ID
            },
            // 客户评级
            infoForm: {
                rskRatingTaskId: this.$route.query.rskRatingTaskId, // 评级任务ID
                approverId: null, // 当前用户ID
                primaryCategoryId: null, // 大类
                secondaryCategoryId: null, // 小类
                baseRatingId: null, // 基础评级
                ratingId: null, // 最终评级
                remark: null, // 意见
                workflowName: this.$route.params.workflowName // 工作流名称
            },
            // 当前评级
            currentInfo: {},
            isSubmit: false, // 弹出框
            groupId: 0, // 0经理   1总监   2总经理
            userInfo: null,
            parentList: [], // 大类
            childList: [], // 小类
            basicTypeList: [], // 基本评级列表
            finalTypeList: [], // 最终评级列表
            ratingTaskId: 4 // 评级任务ID
        };
    },
    created () {
        this.userInfo = JSON.parse(localStorage.getItem('userInfoClient'));
        this.infoForm.approverId = this.userInfo.userId; // 当前用户ID
        this.form.userId = this.userInfo.userId; // 当前用户ID
        this.groupId = this.userInfo.groupId; // 当前角色
        this.ratingTaskId = this.$route.query.rskRatingTaskId;
        console.log(this.userInfo);
        // 判断属于哪个角色
        this.groupId === 0 ? this.init() : this.initRatingInfo();
    },
    methods: {
        // 经理弹出框
        init () {
            this.getParent();
            this.getTypeList();
        },
        // 总监初始化弹出框
        initDirector () {
            // ratingTaskId
            this.$http.get(this.$api.approval.newestRatingRecord + this.ratingTaskId).then((res) => {
                if (res.data.code === 0) {
                    console.log(res);
                    this.currentInfo = res.data.data;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        // 总监初始化页面
        initRatingInfo () {
            // ratingTaskId
            this.$http.get(this.$api.approval.ratingInfo + this.ratingTaskId).then((res) => {
                if (res.data.code === 0) {
                    this.form = res.data.data;
                    console.log(res);
                    console.log(this.form);
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        // 获取大类
        getParent () {
            this.$http.get(this.$api.approval.parent).then((res) => {
                if (res.data.code === 0) {
                    this.parentList = res.data.data;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        // 获取小类
        getChild (primaryCategoryId) {
            this.$http.get(this.$api.approval.child + primaryCategoryId).then((res) => {
                if (res.data.code === 0) {
                    this.childList = res.data.data;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        // 获取评级列表
        getTypeList () {
            this.$http.get(this.$api.approval.ratingTypeList).then((res) => {
                if (res.data.code === 0) {
                    this.basicTypeList = res.data.data.basicTypeList;
                    this.finalTypeList = res.data.data.finalTypeList;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        // 大类changge
        changeParent (v) {
            this.getChild(Number(v));
            this.infoForm.secondaryCategoryId = null;
            console.log(Number(v));
        },
        // 保存
        save () {
            this.$http.post(this.$api.approval.addForm, this.form).then((res) => {
                if (res.data.code === 0) {
                    this.$message(res.data.message);
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        // 显示弹出框
        // 0经理 !0总监-总经理
        put (type) {
            this.isSubmit = true;
            this.init();
            type === 0 ? this.init() : this.initDirector();
        },
        // 总监审批
        approve () {
            console.log('审批');
        },
        // 提交弹出层form
        submit () {
            console.log(this.infoForm);
            this.$http.post(this.$api.approval.submit, this.infoForm).then((res) => {
                if (res.data.code === 0) {
                    this.isSubmit = false;
                    console.log(res.data.data);
                } else {
                    this.$message(res.data.message);
                }
            });
        }
    }
};
</script>
<style scoped lang="scss">
.approval {
  height: 100%;
  background-color: #fff;
  .form-date,input,textarea {
    color: #999999;
    background-color: #fff;
  }
  .btn-wrap {
    text-align: right;
    .m-l {
      font-size: 14px;
      color: #666666;
      margin-right: 10px;
    }
    .m-r {
      border-radius: 2px;
    }
    .bgColor {
      color: #fff;
      background: #F2AC4C;
    }
  }
  .tips {
      padding-top: 10px;
      font-size: 12px;
      float: left;
      .t {
        color: #F2AC4C;
      }
  }
  .my-form {
      padding: 0;
  }
  .my-dialog {
      .title {
          font-size: 18px;
          color: #333333;
          margin-bottom: 10px;
      }
      .t-2 {
        margin-top: 20px;
      }
  }
  // .gy-form-group .l {
  //   width: 118px;
  // }
  // .gy-form-group {
  //   padding: 10px 40px 10px 118px;
  // }
}
</style>
