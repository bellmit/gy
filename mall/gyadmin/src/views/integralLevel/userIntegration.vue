<template>
  <div class="userIntegration">
    <div class="gy-h4">用户积分查看</div>
    <div class="selected-box">
      <el-row :gutter="40">
        <el-col  :span="12">
          <el-row>
            <el-col :span="4">企业名称</el-col>
            <el-col :span="19"><input type="text" v-model="inputName" placeholder="请输入企业名称"></el-col>
          </el-row>
        </el-col>
        <el-col  :span="12">
          <el-row>
            <el-col :span="4">公司类型</el-col>
            <el-col :span="20">
              <el-select v-model="companyType" placeholder="请选择">
                <el-option label="全部" value=""></el-option>
                <el-option
                  v-for="item in companyTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col  :span="12" class="marginTop">
          <el-row>
            <el-col :span="4">激活等级</el-col>
            <el-col :span="19">
              <el-select v-model="pointactivation" placeholder="请选择">
                <el-option
                        v-for="item in pointactivationList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="1">
              <i class="iconfont icon-search" @click="searchGood"></i>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="mytop">
      <table class="gy-table">
        <thead>
        <tr>
          <th width="100px">公司类型</th>
          <th width="200px">企业名称</th>
          <th width="100px">企业总获得积分</th>
          <th width="100px">企业待激活积分</th>
          <th width="100px">企业可用积分</th>
          <th width="100px">激活等级</th>
          <th width="100px">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td width="100px">{{item.companyTypeName}}</td>
          <td width="200px">{{item.usrCompanyName}}</td>
          <td width="100px" style="text-align: right;">{{item.totalHistoryPoints}}</td>
          <td width="100px" style="text-align: right;">{{item.unActivedPoints}}</td>
          <td width="100px" style="text-align: right;">{{item.usablePoints}}</td>
          <td width="100px">{{item.activationLevelName}}</td>
          <td width="100px;" style="text-align: center">
            <router-link :to="{ name: 'userIntegralView', query: { usrCompanyId: item.usrCompanyId} }" class="gy-button-view">查看</router-link>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="pagination-wrapper">
        <div class="pagination-total">共 {{total}} 条</div>
        <!-- 翻页 -->
        <el-pagination
          background
          :page-size="pageSize"
          :pager-count="pageCount"
          :total="total"
          :current-page.sync="currentPage"
          layout="prev, pager, next"
          style="margin-top: 40px;"
          @current-change="turnPage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'companyList',
    data () {
        return {
            pageSize: 10,
            pageCount: 5,
            total: 0,
            currentPage: 1,
            inputName: '',
            list: [],
            companyTypeList: [],
            companyType: '',
            pointactivation: -1,
            pointactivationList: [
                {
                    id: -1,
                    name: '全部'
                },
                {
                    id: 0,
                    name: '未激活'
                },
                {
                    id: 1,
                    name: '一级'
                },
                {
                    id: 2,
                    name: '二级'
                },
                {
                    id: 99,
                    name: '全部激活'
                }
            ]
        };
    },
    methods: {
        getCompanyType () {
            this.$http.get(this.$api.memberCompany.companyType)
                .then((res) => {
                    this.companyTypeList = res.data.data;
                });
        },
        getList (currentPage) {
            let setPara = {
                'data': {
                    'companyTypeId': this.companyType,
                    'usrCompanyName': this.inputName,
                    'pointactivation': this.pointactivation
                },
                'pageNum': this.currentPage,
                'pageSize': 10
            };
            this.$http.post(this.$api.point.members, setPara).then((data) => {
                if (data.data.code === 0) {
                    this.list = data.data.data.list;
                    // 设置分页信息
                    this.total = data.data.data.total;
                    this.currentPage = data.data.data.pageNum;
                }
            }).catch((e) => {
            });
        },
        //
        searchGood () {
            this.getList();
        },
        turnPage (currentPage) {
            this.getList(currentPage);
        }
    },
    created () {
        this.getList(1);
        this.getCompanyType();
    }
};
</script>
<style lang="scss" scoped>
  .userIntegration{
    .mytop{
      margin-top: 20px;
    }
    .my-padding{
      padding: 0 30px;
    }
    .selected-box{
      padding:15px 0 12px 14px;
    }
    .marginTop{
      margin-top:15px;
    }
  }
</style>
