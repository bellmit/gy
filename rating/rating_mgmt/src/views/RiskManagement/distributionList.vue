<!--客户分配list-->
<template>
    <div class="customer-list">
        <div class="select">
            <div class="search-box">
                <input type="search" v-model="keywords" placeholder="请输入客户名称">
                <button @click="search" class="gy-button-extra"><i class="iconfont icon-search"></i></button>
            </div>
        </div>
        <table class="gy-table">
          <tr>
              <th>客户名称</th>
              <th>客户类型</th>
              <th>最新评级</th>
              <th>初评日期</th>
              <th>最新评级日期</th>
              <th>是否复议</th>
              <th style="width:100px">风控经理</th>
          </tr>
            <tr v-for="(item , index) in list" :key=index>
                <td>{{item.companyName}}</td>
                <td>{{item.companyTypeName}}</td>
                <td>{{item.rankName ? item.rankName : '-'}}</td>
                <td>{{item.initialRatingTime && item.initialRatingTime|date}}</td>
                <td>{{item.latestRatingTime &&item.latestRatingTime| date}}</td>
                <td>
                    {{item.isReevaluationRequest ? '是': '否'}}
                </td>
                <td>
                    <el-select  v-model="item.username"  placeholder="请选择" @change="update(item)">
                        <el-option
                          v-for="item in managerOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </td>
            </tr>
        </table>
        <div class="total">共{{total}}条记录</div>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :total=total>
        </el-pagination>
    </div>
</template>
<script>
export default {
    name: 'customer-list',
    data () {
        return {
            managerOptions: [],
            value: '',
            isEdit: false,
            total: 0,
            pageNum: 1,
            keywords: '',
            parameter: {
                pageNum: 1,
                data: {
                    companyName: ''
                }
            },
            list: []
        };
    },
    created () {
        this.getInfo();
        this.getRankManagers();
    },
    methods: {
        handleCurrentChange (val) { // 分页
            this.pageNum = val;
            this.parameter.pageNum = this.pageNum;
            this.getInfo();
        },
        search () {
            let that = this;
            that.parameter.data.companyName = that.keywords;
            that.getInfo();
        },
        getInfo () {
            this.$http.post(this.$api.customer.ratingList, this.parameter).then((res) => {
                if (res.data.code === 0) {
                    this.list = res.data.data.list;
                    this.total = res.data.data.total;
                    this.pageNum = res.data.data.pageNum;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        getRankManagers () {
            this.isEdit = true;
            this.$http.get(this.$api.customer.RankManagers).then((res) => {
                if (res.data.code === 0) {
                    for (var i = 0; i <= res.data.data.length; i++) {
                        let parm = {};
                        parm.label = res.data.data[i].username;
                        parm.value = res.data.data[i].userId;
                        this.managerOptions.push(parm);
                    }
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        update (item) {
            this.$http.put(this.$api.customer.ratingUpdate, {
                id: item.id,
                riskControlManagerId: item.username,
                loginUserId: 3
            }).then((res) => {
                if (res.data.code === 0) {
                    this.$message('操作成功');
                } else {
                    this.$message(res.data.message);
                }
            });
        }
    }
};
</script>
