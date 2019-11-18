<template>
  <div class="flow-list cont my-cont-list">
    <header>
      <div class="title">合同执行人员分配</div>
    </header>
    <el-form :inline="true" :model="formInline" class="clearfix demo-form-inline search">
      <div class="gy-form-group">
        <span class="l">产品名称</span>
        <input type="text" placeholder="请输入产品名称" v-model.trim="formInline.prodName">
      </div>
      <div class="gy-form-group">
        <span class="l">执行人员</span>
        <input type="text" placeholder="请输入执行人员" v-model.trim="formInline.executiveName">
      </div>
      <div class="gy-form-group">
        <el-checkbox label="只查询合同创建阶段数据" v-model="formInline.createdFlg"></el-checkbox>
      </div>
      <div class="gy-form-group">
          <el-checkbox label="未分配执行人员" v-model="formInline.executiveFlg"></el-checkbox>
          <span class="searchicon" @click="search"><i class="iconfont icon-search"></i></span>
      </div>
    </el-form>
    <div class="add-wrap">
      <!-- button class="gy-button-normal">新增</button -->
    </div>
    <div class="div">
      <el-table
        :data="essenceList"
        class="gy-table"
        style="width: 1200">
        <el-table-column
          label="ID"
          fixed
          width="150">
          <template slot-scope="item">
            <span>{{item.row.essenceId}}</span><br>
            <span>{{item.row.prodName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-bind:label="'上游公司\n下游公司'"
          width="250">
          <template slot-scope="item">
            <span>{{item.row.sellerCompanyName}}</span><br>
            <span>{{item.row.buyerCompanyName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="业务操作人"
          width="120">
          <template slot-scope="item">{{item.row.businessManagerName}}</template>
        </el-table-column>
        <el-table-column
          label="执行人员"
          width="120">
          <template slot-scope="item">{{item.row.executiveName}}</template>
        </el-table-column>
        <el-table-column
          label="合同要素创建时间"
          width="160">
          <template slot-scope="item">{{item.row.createdDate|date}}</template>
        </el-table-column>
        <el-table-column
          label="分配类型"
          width="100">
          <template slot-scope="item">{{item.row.distributeType | changeDistributeType}}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          class-name="amount-right-el"
          width="70">
          <template slot-scope="item" class="caoz1">
            <button type="button" class="gy-button-view edit" @click="clickItem(item.row.essenceId)">详情</button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page.sync="formInline.pageNum"
      @current-change="currentChange($event)"
      @prev-click="prevClick('essence',$event)"
      @next-click="nextClick('essence',$event)"
     >
    </el-pagination>
  </div>
</template>
<script>
export default {
    data () {
        return {
            formInline: {
                pageNum: 1,
                pageSize: 10,
                prodName: '',
                createdFlg: true,
                executiveFlg: false,
                executiveName: ''
            },
            essenceList: null,
            total: 0
        };
    },
    activated () {
        // 获取付款单信息
        if (!this.$route.meta.isBack) {
            this.formInline = {
                pageNum: 1,
                pageSize: 10,
                prodName: '',
                createdFlg: true,
                executiveFlg: false,
                executiveName: ''
            };
            this.search();
        }
        this.$route.meta.isBack = false;
    },
    created () {
        // this.search();
    },
    filters: {
        changeDistributeType: (val) => {
            return val === 1 ? '自动分配' : '手动分配';
        }
    },
    methods: {
        currentChange (pageNum) {
            this.formInline.pageNum = pageNum;
            this.search();
        },
        search () {
            // 查询审批流程定义
            this.$http.post(this.$api.contractEssence.essenceList, this.formInline).then((res) => {
                this.essenceList = res.data.data.data.list;
                this.total = res.data.data.data.total;
            }).catch((e) => {
                console.log(e);
            });
        },
        clickItem (id) {
            this.$router.push({name: 'executionAllocation', query: {homeFromFlg: 0, id: id}});
        }
    }
};
</script>
<style lang="scss" scoped>
    .caoz1 {
        text-align: center !important;
        padding: 0 10px !important;
    }
</style>

<style lang="scss">
    .flow-list{
        .el-table .cell{
            white-space:pre-line;
        }
    }
    .caoz {
        color: red!important;
        text-align: center;
        padding: 0 20px;
    }
</style>
