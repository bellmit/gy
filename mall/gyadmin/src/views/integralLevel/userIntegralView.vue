<template>
  <div class="userIntegralView">
    <div class="gy-h4">用户积分明细</div>
    <div class="my-center">
      <div class="left-font">企业等级</div>
      <div class="right-font left-font-jl2">
        <img :src="list.gradestamp" alt="">
      </div>
      <div class="right-font left-font-jl2">{{list.companyLevel}}</div>
      <div class="left-font left-font-jl">企业累计积分</div>
      <div class="right-font left-font-jl2">{{list.totalHistoryPoints}}</div>
      <div class="left-font left-font-jl">企业待激活积分</div>
      <div class="right-font left-font-jl2">{{list.unActivedPoints}}</div>
      <div class="left-font left-font-jl">企业可用积分</div>
      <div class="right-font left-font-jl2">{{list.usablePoints}}</div>
    </div>
    <div class="mytab">
      <ul>
        <li @click="tabClick(1)" :class="{'selected': 1 === tabIdx}">累计积分明细</li>
        <li @click="tabClick(2)" :class="{'selected': 2 === tabIdx}">积分消费明细</li>
        <li class="li-right3">
          <i class="iconfont icon-search" @click.stop.prevent="search"></i>
        </li>
        <li class="li-right2">
          <el-date-picker
            v-model="createDate"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder='开始日期'
            end-placeholder='结束日期'>
          </el-date-picker>
        </li>
        <li class="li-right1">日期</li>
      </ul>
    </div>
    <div class="mytop">
      <table class="gy-table">
        <thead>
        <tr>
          <th width="100px">日期</th>
          <th width="200px">单号</th>
          <th width="400px">积分获取途径</th>
          <th width="100px">积分数量</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, key) in detailModelList" :key="key">
          <td width="100px">{{item.createdDate | date}}</td>
          <td width="200px">{{item.code}}</td>
          <td width="400px">{{item.accessName}}</td>
          <td width="100px" style="text-align: right;">{{item.points}}</td>
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
    name: 'userIntegralView',
    data () {
        return {
            tabIdx: 1,
            pageSize: 10,
            pageCount: 5,
            total: 0,
            currentPage: 1,
            list: [],
            detailModelList: [],
            createDate: []
        };
    },
    methods: {
        getList (v, i) {
            let setPara = {
                'data': {
                    'userCompanyId': this.$route.query.usrCompanyId,
                    'pointsDateStart': this.createDate && this.createDate[0],
                    'pointsDateEnd': this.createDate && this.createDate[1],
                    'type': v
                },
                'pageNum': i,
                'pageSize': 10
            };
            this.$http.post(this.$api.point.search, setPara).then((data) => {
                if (data.data.code === 0) {
                    this.list = data.data.data;
                    this.detailModelList = data.data.data.detailModelList.list;
                    // 设置分页信息
                    this.total = data.data.data.detailModelList.total;
                    this.currentPage = data.data.data.detailModelList.pageNum;
                }
            }).catch((e) => {
            });
        },
        //
        searchGood () {
            this.getList();
        },
        turnPage (currentPage) {
            console.log(currentPage);
            this.getList(this.tabIdx, currentPage);
        },
        tabClick (v) {
            if (v === 1) {
                this.tabIdx = 1;
            } else {
                this.tabIdx = 2;
            }
            this.getList(this.tabIdx, 1);
        },
        search () {
            this.getList(this.tabIdx, 1);
        }
    },
    created () {
        this.getList(1);
    }
};
</script>
<style lang="scss" scoped>
  .userIntegralView{
    .mytop{
      margin-top: 20px;
    }
    .my-padding{
      padding: 0 30px;
    }
    .my-center{
      overflow: hidden;
      padding: 0 30px;
      margin: 20px 0;
      font-size: 14px;
      div{
        float: left;
      }
      .left-font{
        color: #333333;
      }
      .right-font{
        color: #666666;
        img{
          width: 30px;
          height: 30px;
        }
      }
      .left-font-jl{
        margin-left: 50px;
      }
      .left-font-jl2{
        margin-left: 10px;
      }
    }
    .mytab{
      ul{
        overflow: hidden;
        li{
          float: left;
          padding: 0 5px;
          margin-right: 20px;
        }
        .li-right1{
          float: right;
          margin-right: 0px;
        }
        .li-right2{
          margin-right: -10px;
          margin-top: -8px;
          float: right;
        }
        .li-right3{
          margin-right: 10px;
          float: right;
        }
        li:hover{
          cursor: pointer;
        }
      }
      .selected{
        color: #e59640;
        border-bottom: 2px solid #e59640;
      }
    }
  }
</style>
