<template>
  <div class="flow-list">
    <header>
      <div class="title">流程定义列表</div>
    </header>
    <el-form :inline="true" :model="params" class="clearfix my-form demo-form-inline search">
      <div class="gy-form-group">
        <span class="l">业务类型</span>
        <el-select v-model="params.bizType" clearable placeholder="请选择">
          <el-option
            v-for="item in $constant.businessType4Top"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="gy-form-group last-active">
          <span class="l">流程名称</span>
          <input type="text" placeholder="请输入" v-model.trim="params.keywords">
          <span class="searchicon" @click="search"><i class="iconfont icon-search"></i></span>
      </div>
    </el-form>
    <div class="add-wrap">
    </div>
    <div class="div">
      <table class="gy-table">
        <thead>
        <tr>
          <th>业务类型</th>
          <th>类别</th>
          <th>详情</th>
          <th>匹配条件</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in apprRuleList" :key="index">
          <td>{{item.bizTradeType|businessTradeType}}</td>
          <td>{{item.processType|apprProcType}}</td>
          <td>{{item.processName}}</td>
          <td>{{item.processExpress}}</td>
          <td>
            <el-switch active-color="#13ce66" @change="convertStatus(item)" :disabled="item.forbidden"
              v-model="item.applyStatus">
            </el-switch>
          </td>
          <td class="caoz">
              <button class="gy-button-view edit" @click="edit(item)">详情</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <el-pagination
      background
      :current-page.sync = "params.pageNo"
      :page-size="params.pageSize"
      :total="itemTotal"
      layout="prev, pager, next"
      @current-change="changeSelect">
    </el-pagination>
  </div>
</template>
<script>
export default {
    data () {
        return {
            params: {
                pageNo: 1,
                pageSize: 20,
                bizType: '',
                keywords: null
            },
            itemTotal: 0,
            apprRuleList: []
        };
    },
    activated () {
        // 获取付款单信息
        if (!this.$route.meta.isBack) {
            this.params = {};
            this.search();
        }
        this.$route.meta.isBack = false;
    },
    created () {
        // this.search();
    },
    methods: {
        edit (apprRuleInfo) {
            // 查看审批流程定义，画面跳转
            let canEdit = 1;
            if (apprRuleInfo.canAddNodeFlg === 2) {
                canEdit = 0;
            }
            this.$router.push({name: 'flowDetail', query: {apprRuleId: apprRuleInfo.id, canEdit: canEdit}});
        },
        convertStatus (item) {
            let that = this;
            if (item.forbidden) {
                return false;
            }
            let showTxt = null;
            if (item.applyStatus === true) {
                showTxt = '确定要启用该审批流程(' + item.processName + ')吗？';
            } else {
                showTxt = '确定要停用该审批流程(' + item.processName + ')吗？';
            }
            this.$confirm(showTxt, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 保存审批流程定义数据
                let apprData = {};
                apprData.id = item.id;
                apprData.applyStatus = item.applyStatus === true ? 1 : 0;
                that.$http.post(that.$api.apprProc.saveApproveInfo, apprData).then((res) => {
                    if (res.data.code === 0) {
                        that.$message({
                            message: '设置成功',
                            type: 'success'
                        });
                    } else {
                        that.$alert(res.data.code + ' ' + res.data.message);
                    }
                });
            }).catch(() => {
                // 取消
                if (item.applyStatus === true) {
                    item.applyStatus = false;
                } else {
                    item.applyStatus = true;
                }
            });
        },
        changeSelect (pageNo) {
            this.params.pageNo = pageNo;
            this.search();
        },
        search () {
            // 查询审批流程定义
            const me = this;
            this.$http.post(this.$api.apprProc.getApprProcList, this.params).then(function (response) {
                if (response.data.code === 0) {
                    me.apprRuleList = response.data.data.rows;
                    for (let i = 0; i < me.apprRuleList.length; i++) {
                        if (me.apprRuleList[i].applyStatus === 1) {
                            me.apprRuleList[i].applyStatus = true;
                        }
                        if (me.apprRuleList[i].applyStatus === 2) {
                            me.apprRuleList[i].forbidden = true;
                        } else {
                            me.apprRuleList[i].forbidden = false;
                        }
                    }
                    me.itemTotal = response.data.data.total;
                } else {
                    me.$alert(response.data.code + ' ' + response.data.message);
                }
            }).catch((e) => {
                console.log(e);
            });
        }
    }
};
</script>
<style lang="scss" scoped>
  .my-form {
    margin-bottom: 30px;
  }
  .caoz {
      text-align: center;
      padding: 0 10px;
  }
</style>
