<template>
  <div class="log-con">
   <div class="selected">
      <ul>
        <li :class="{ active: searchData.data.eventType == 0 }" @click="toggleTabs()">全部</li>
        <li :class="{ active: searchData.data.eventType === 1 }" @click="toggleTabs(1)">操作日志({{logCount.operationCount}})</li>
        <li :class="{ active: searchData.data.eventType === 2 }" @click="toggleTabs(2)">查询日志({{logCount.searchCount}})</li>
        <li :class="{ active: searchData.data.eventType === 3 }" @click="toggleTabs(3)">系统日志({{logCount.sysCount}})</li>
      </ul>
      <div class="right">
        <div class="search-box">
          <input type="search"  v-model="searchData.data.keyWords" placeholder="请输入用户名/账号名/手机号">
          <i   @click="search" class="iconfont icon-search"></i>
        </div>
        <span class="search-btn" @click="toggleSelect=!toggleSelect">高级搜索<i class="iconfont icon-arrow-down"></i></span>
      </div>
    </div>
    <div class="selected-box  gy-form" v-show="toggleSelect">
       <div class="gy-form-group">
        <span class="l"> 日志结果</span>
        <el-select  v-model="searchData.data.result" placeholder="请选择">
            <el-option
              v-for="item in logResult"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </div>
      <div class="gy-form-group">
        <span class="l">路径</span>
         <input  v-popover:menuListPopover type="text" v-model="pathName" readonly="readonly">
        <el-popover
          ref="menuListPopover"
          placement="bottom-start"
          trigger="click">
           <el-tree
            :data="treeList"
            show-checkbox
            node-key="id"
            :highlight-current="true"
             ref="menuListTree"
             @check='setPathName'
            :props="defaultProps">
          </el-tree>
        </el-popover>
      </div>
       <div class="gy-form-group">
        <span class="l">时间</span>
        <el-date-picker
            v-model="searchDate"
            @change="getTime"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="searchData.data.endDate"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
      </div>
      <div class="gy-form-group ip-con">
        <span class="l">IP地址</span>
        <input type="text"  v-model="searchData.data.ipAddress"  placeholder="请输入">
        <i   @click="search" class="iconfont ip-search icon-search"></i>
      </div>
    </div>
    <div class="btn-group">
      <button class="gy-button-extra"  @click="exportLog">导出</button>
    </div>
     <div class="m-panel">
      <table class="gy-table">
        <thead>
        <tr>
          <th width="170">时间</th>
          <th width="80">IP地址</th>
          <th width="80">用户名</th>
          <th width="80">账户名</th>
          <th width="110">手机号</th>
          <th width="80">日志类型</th>
          <th>路径</th>
          <th>功能</th>
          <th width="80">日志结果</th>
          <th>日志详情</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{item.createDate}}</td>
          <td>{{item.ipAddress}}</td>
          <td>{{item.userName}}</td>
          <td>{{item.account}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.eventTypeStr}}</td>
          <td>{{item.path}}</td>
          <td>{{item.functionName}}</td>
          <td>{{item.isSuccessStr}}</td>
          <td>{{item.eventDesc}}</td>
        </tr>
        </tbody>
      </table>
      <div class="pagination-wrapper">
        <div class="pagination-total">共 {{total}} 条</div>
        <el-pagination
          background
          :total="total"
          :current-page.sync="searchData.pageNum"
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
    data () {
        return {
            keywords: '',
            toggleSelect: false, // 高级搜索显示隐藏
            logResult: [
                {
                    label: '成功',
                    value: 1
                },
                {
                    label: '失败',
                    value: 0
                }
            ],
            logCount: '',
            searchData: {
                data: {
                    endDate: '',
                    eventType: '', // 日志类型：1操作，2查询，3系统
                    keyWords: '',
                    pathId: '', // 日志组织分类路径，用“/”隔开
                    result: '',
                    startDate: '',
                    ipAddress: ''
                },
                pageNum: 1,
                pageSize: 10
            },
            list: '',
            total: 0,
            currentPage: 1,
            isShowTree: false,
            defaultProps: {
                children: 'childrens',
                label: 'name'
            },
            treeList: [],
            searchDate: [],
            pathName: ''
        };
    },
    methods: {
        init () {
            this.search();
            this.searchCount();
            this.getTreeList();
        },
        toggleTabs (index) {
            this.searchData.data.eventType = index;
            this.search();
        },
        turnPage (currentPage) {
            this.search();
        },
        getTime () {
            this.searchData.data.startDate = this.searchDate[0];
            this.searchData.data.endDate = this.searchDate[1];
        },
        search () {
            this.menuListTreeCurrentChangeHandle();
            this.$http.post(this.$api.userLog.searchLog, this.searchData).then((res) => {
                let data = res.data.data;
                this.list = data.list;
                this.total = Number(data.total);
            });
        },
        searchCount () {
            this.$http.get(this.$api.userLog.searchCount).then((res) => {
                this.logCount = res.data.data;
            });
        },
        showTree () {
            this.isShowTree = true;
        },
        getTreeList () {
            this.$http.get(this.$api.userLog.searchTree).then((res) => {
                this.treeList = res.data.data;
            });
        },
        menuListTreeCurrentChangeHandle () {
            this.searchData.data.pathId = this.$refs.menuListTree.getCheckedKeys().filter((item) => item != null).join(',');
        },
        setPathName () {
            let data = this.$refs.menuListTree.getCheckedNodes();
            let arr = [];
            data.forEach(element => {
                arr.push(element.name);
            });
            this.pathName = arr.join(',');
        },
        exportLog () {
            let name = '日志查询';
            this.$tools.downloadFile(this, this.$api.userLog.exportLog, this.searchData.data, name, '暂无数据，无法导出');
        }
    },
    filters: {
        eventType (val) {
            if (val === 1) {
                return '操作日志';
            } else if (val === 2) {
                return '查询日志';
            } else {
                return '系统日志';
            }
        }
    },
    mounted () {
        this.init();
    }
};
</script>
<style lang="scss" scoped>
.log-con {
  margin-top: 15px;
 .selected {
    overflow: hidden;
    margin-bottom: 20px;
     .right {
      float: right;
      // margin-bottom: 20px;
    }
    ul li {
      float: left;
      padding: 0 5px;
      cursor: pointer;
      &.active {
        color: $color-a-active;
        border-bottom: 1px solid $color-a-active
      }
    }
    ul li:not(:first-child) {
      position: relative;
      margin-left: 10px;
    }
    .search-btn {
      position: relative;
      margin-right: 10px;
      color: $color-minor;
    }
    .search-box {
      display: inline-block;
      width: 276px;
      border-bottom: 1px solid $color-light;
      input {
        width: 200px;
        height: 30px;
        color: $color-light;
        border: none;
        float: left;
      }
      i {
        display: inline-block;
        width: 60px;
        color: $color-main;
        border: none;
        background-color: #fff;
        text-align: right;
      }
      span {
        color: $color-light;
        padding-left: 20px
      }
    }
  }
  .gy-form-group {
    padding-left: 72px;
    .l {
      width: 72px;
    }
  }
  .gy-form-group:nth-child(odd) {
    padding-right: 30px;
  }
  .gy-form-group:nth-child(even) {
    padding-left: 82px;
    .l {
      width: 72px;
      padding-left: 30px;
    }
  }
  .selected-box {
    .ip-con {
      position: relative;
      .ip-search {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
  .btn-group {
    float: right;
    margin-bottom: 15px ;
  }
}
</style>
