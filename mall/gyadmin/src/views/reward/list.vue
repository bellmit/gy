<template>
  <div class="my-order-list shipping">
    <div class="selected">
      <ul>
        <li :class="{ active: newIndex==='' }" @click="toggleTabs('')">全部</li>
        <li :class="{ active: newIndex===1 }" @click="toggleTabs(1)">撮合公司({{brokerCompanyNum}})</li>
        <li :class="{ active: newIndex===3 }" @click="toggleTabs(3)">内部员工({{internalStaffNum}}) </li>
        <li :class="{ active: newIndex===4 }" @click="toggleTabs(4)">外部人员({{externalStaffNum}})</li>
        <li :class="{ active: newIndex===2 }" @click="toggleTabs(2)">外部公司({{externalCompanyNum}})</li>
      </ul>
      <div class="right">
        <div class="search-box" style="width: 260px">
          <input  style="width: 212px;border: none" type="search" v-model="parameter.keywords" placeholder="请输入获奖公司/个人">
          <button style="width: 43px" @click="search2">
            <i class="iconfont icon-search"></i>
          </button>
        </div>
      </div>
    </div>
    <div style="margin-top: 20px">
      <table class="gy-table">
        <thead>
        <tr>
          <th style="width:100px">类型</th>
          <th style="width:100px">获奖公司/个人</th>
          <th style="width:120px">联系人</th>
          <th style="width:100px">联系手机</th>
          <th style="width:100px">邀请公司数</th>
          <th style="width:100px">获得奖励（元）</th>
          <th style="width:100px">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(items, ind ) in data" :key="ind">
          <td style="width:100px">{{items.inviterType||'--'}}</td>
          <td style="width:100px">{{items.inviterCompanyName||'--'}}</td>
          <td style="width:100px">{{items.inviterUsrName||'--'}}</td>
          <td style="width:100px">{{items.inviterPhone||'--'}}</td>
          <td style="width:100px">{{items.inviterCompanyNum||'--'}}</td>
          <td style="width:100px" class="align-r">{{items.receiveAward| numToCash}}</td>
          <td style="width:100px;text-align: center">
            <span class="gy-button-view" @click="view(items.id)">查看</span>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="pagination-wrapper">
        <div class="pagination-total">共 {{total}} 条</div>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :total=total>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>export default {
    data () {
        return {
            data: [],
            total: null,
            pageNum: null,
            newIndex: '',
            // 1：撮合公司2：内部员工3：外部人员4：外部公司
            parameter: {
                'data': {
                    'inviterType': ''
                },
                'keywords': '',
                'pageNum': 1,
                'pageSize': 10
            },
            brokerCompanyNum: null,
            internalStaffNum: null,
            externalStaffNum: null,
            externalCompanyNum: null
        };
    },
    created () {
        this.getInfo();
    },
    methods: {
        // 单独搜索单号
        search2 () {
            this.getInfo();
        },
        toggleTabs (index) { // 状态筛选
            console.log(index);
            this.parameter.data.inviterType = index;
            this.newIndex = index;
            // if (index === 99) {
            //     this.newIndex = 99;
            //     this.stateCode = '';
            //     this.parameter.data.approveStatus = '';
            // } else {
            //     this.newIndex = index;
            //     this.stateCode = index;
            //     this.parameter.data.approveStatus = index;
            // }
            // 0：上架，1：下架，2：作废
            this.getInfo(this.parameter);
        },
        handleCurrentChange (val) { // 分页
            this.pageNum = val;
            this.parameter.pageNum = val;
            this.getInfo(this.parameter);
        },
        view (v) {
            this.$router.push({name: 'rewardView', query: {id: v}});
        },
        getInfo () { // 获取信息
            let that = this;
            that.$http.post(this.$api.reward.list, that.parameter).then((res) => {
                if (res.data.code === 0) {
                    that.data = res.data.data.list;
                    that.total = res.data.data.total;
                    that.pageNum = res.data.data.pageNum;
                    console.log(res.data.data.list);
                    for (let i = 0; i < res.data.data.list.length; i++) {
                        // console.log(res.data.data.list[i]);
                        // alert('12');
                        if (res.data.data.list[i].inviterType === 1) {
                            res.data.data.list[i].inviterType = '撮合公司';
                        } else if (res.data.data.list[i].inviterType === 3) {
                            res.data.data.list[i].inviterType = '内部员工';
                        } else if (res.data.data.list[i].inviterType === 4) {
                            res.data.data.list[i].inviterType = '外部人员';
                        } else if (res.data.data.list[i].inviterType === 2) {
                            res.data.data.list[i].inviterType = '外部公司';
                        }
                    }
                }
            });
            //    获取数量
            that.$http.get(this.$api.reward.statisticsInviterType + '?keywords=' + that.parameter.keywords).then((res) => {
                if (res.data.code === 0) {
                    console.log(res.data.data);
                    this.brokerCompanyNum = res.data.data.brokerCompanyNum;
                    this.internalStaffNum = res.data.data.internalStaffNum;
                    this.externalStaffNum = res.data.data.externalStaffNum;
                    this.externalCompanyNum = res.data.data.externalCompanyNum;
                }
            });
        }
    }
};
</script>
<style  lang="scss" scoped>
  .shipping{
    .listul{
      background-color: #fff;
      width: 83%;
      max-height: 200px;
      overflow: auto;
      position: absolute;
      left: 1px;
      top: 31px;
      z-index: 9;
      border: 1px solid #e6eaea;
      border-top: none;
      margin-left: 16.5%;
      li{
        padding: 5px 10px;
      }
      li:hover{
        cursor: pointer;
        background-color: #f5f7fa;
        color: #4a90e2;
      }
    }
    .my-search{
      margin-left: 5px;
      i:hover{
        cursor: pointer;
      }
    }
    .my-top{
      margin-top: 10px;
    }
    .selected {
      margin-top: 20px;
      padding-bottom: 15px;
      overflow: hidden;
      .right{
        float: right;
      }
      ul li {
        float: left;
        padding: 0 5px;
        cursor: pointer;
        &.active {
          color: $color-a-active;
          border-bottom: 2px solid $color-a-active
        }
      }
      ul li:not(:first-child) {
        position:relative;
        margin-left: 10px;
      }
      .search-btn{
        margin-right:14px;
        color: $color-minor;
      }
      .search-btn:hover{
        cursor: pointer;
      }
      .search-box {
        display: inline-block;
        width: 216px;
        font-size: 14px !important;
        border-bottom: 1px solid #e7ecf1;
        input {
          width: 140px;
          height: 30px;
          color: $color-minor;
          border: none;
        }
        button {
          display:inline-block;
          width: 60px;
          color: $color-minor;
          border: none;
          background-color: #fff;
          text-align: right;
        }
        span {
          color: $color-minor;
          padding-left: 20px
        }
      }
    }
    .rebox{
      position: relative;
      .abbox{
        position: absolute;
        top: 0px;
        right: -5px;
      }
    }
  }
</style>
