<template>
  <el-dialog title="单据审核" :visible.sync="auditStatusVisible" :before-close="close" :modal="false" width="500px">
    <div class="audit-status-wrapper">
      <div class="audit-status-content">
        <div class="gy-form-group">
          <span class="l">审核结果</span>
          <el-radio-group v-model="auditStatusSub.billStatus" class="radio-group">
            <el-radio :label="3">通过</el-radio>
            <el-radio :label="2">拒绝</el-radio>
          </el-radio-group>
        </div>
        <div class="clear"></div>
        <div v-if="auditStatusSub.billStatus === 2" class="gy-form-group">
          <span class="l">选择原因</span>
          <el-select v-model="auditStatusSub.billRemark" placeholder="请选择">
            <el-option
              v-for="item in $constant[auditStatusReason[reason]]"
              :key="item.val"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </div>
        <div v-if="auditStatusSub.billRemark === '其他'" class="gy-form-group">
          <span class="l">填入原因</span>
          <textarea maxlength="30" v-model="auditStatusSub.myBillRemark" @input="descInput" placeholder="请输入" class="gy-textarea"></textarea>
          <span class="wordNumber">{{remnant}}/30</span>
        </div>
      </div>
      <div class="clear"></div>
      <div class="audit-status-foot">
        <button type="button" class="gy-button-extra" @click="submit">确定</button>
        <button type="button" class="gy-button-normal" @click="close">取消</button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
    name: 'audit',
    props: {
        auditStatusVisible: false,
        reason: null
    },
    data () {
        return {
            remnant: 30,
            auditStatusReason: ['', 'rejectReasonTrans', 'rejectReason'],
            auditStatusSub: {
                billStatus: null,
                billRemark: null,
                myBillRemark: null
            }
        };
    },
    methods: {
        submit () {
            if (!this.auditStatusSub.billStatus) {
                this.$message.error('请先选择审核状态');
                return;
            }
            if (this.auditStatusSub.billStatus === 2 && !this.auditStatusSub.billRemark) {
                this.$message.error('请先选择拒绝原因');
                return;
            }
            if (this.auditStatusSub.billStatus === 3) this.auditStatusSub.billRemark = null;
            this.$emit('sub', this.auditStatusSub);
            this.reset();
        },
        descInput () {
            var txtVal = this.auditStatusSub.myBillRemark.length;
            this.remnant = 30 - txtVal;
        },
        close () {
            this.$emit('close');
            this.reset();
        },
        reset () {
            this.auditStatusSub =
            {
                billStatus: null,
                billRemark: null
            };
        }
    }
};
</script>

<style lang="scss" scoped>

  /deep/.audit-status-wrapper {
    .gy-form-group {
      width: 100%;
      padding-left: 76px;
      .l {
        width: 56px;
      }
      .el-radio__label {
        color: $color-minor!important;
      }
    }
    .wordNumber{
      font-size: 12px;
      position: absolute;
      right: 20px;
      bottom: 10px;
    }
    .audit-status-foot {
      padding-top: 10px;
      text-align: right;
      .gy-button-extra {
        margin-right: 8px;
        background-color: #e59640;
        border-color: #e59640;
      }
      .gy-button-normal:hover {
        border-color: #e59640;
        color: #e59640;
      }
    }
  }
</style>
