<template>
    <div class="page sys-menu-list-wrapper">
        <div class="gy-h4">资源访问</div>
        <div class="btn-group">
            <button type="button" @click="$router.push({ path: 'manage'})" v-if="isAuth('sys:menu:add')" class="gy-button-extra">添加</button>
        </div>
        <div class="m-panel gy-table my-table-c">
            <el-table
              :data="dataList"
              style="width: 100%;"
              :row-class-name="tableRowClassName"
              :header-cell-class-name="tableHeaderCellClassName"
              id="menu-table">
                <el-table-column
                  prop="id"
                  header-align="center"
                  width="90"
                  label="ID">
                </el-table-column>
                <table-tree-column
                  prop="name"
                  header-align="center"
                  treeKey="id"
                  width="200"
                  label="名称">
                </table-tree-column>
                <el-table-column
                  prop="parentName"
                  width="140"
                  header-align="center"
                  label="上级菜单">
                </el-table-column>
                <el-table-column
                  header-align="center"
                  prop="url"
                  width="160"
                  label="菜单URL">
                    <!--<template slot-scope="scope">-->
                    <!--<icon-svg :name="scope.row.icon || ''"></icon-svg>-->
                    <!--</template>-->
                </el-table-column>
                <el-table-column
                  prop="frontUrl"
                  width="120"
                  header-align="center"
                  label="前端路由">
                </el-table-column>
                <el-table-column
                  prop="isLeaf"
                  header-align="center"
                  width="140"
                  label="类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.isLeaf === 0">目录</span>
                        <span v-else-if="scope.row.isLeaf === 1">资源访问</span>
                        <span v-else-if="scope.row.isLeaf === 2">按钮</span>
                    </template>
                </el-table-column>
                <!--<el-table-column-->
                <!--prop="orderNum"-->
                <!--header-align="center"-->
                <!--align="center"-->
                <!--label="排序号">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--prop="url"-->
                <!--header-align="center"-->
                <!--align="center"-->
                <!--width="150"-->
                <!--:show-overflow-tooltip="true"-->
                <!--label="菜单URL">-->
                <!--</el-table-column>-->

                <el-table-column
                  header-align="center"
                  :show-overflow-tooltip="true"
                  width="100"
                  label="图标">
                    <template slot-scope="scope">
                        <i :class="setIcon(scope.row.icon)"></i>
                    </template>
                </el-table-column>
                <el-table-column
                prop="permission"
                header-align="center"
                align="center"
                :show-overflow-tooltip="true"
                label="授权标识">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  header-align="center"
                  align="center"
                  width="200"
                  label="操作">
                    <template slot-scope="scope">
                        <span class="gy-button-view" @click="$router.push({ path: 'manage', query: {id: scope.row.id}})" v-if="isAuth('sys:menu:edit')">编辑</span>
                        <span class="gy-button-view" @click="deleteGood(scope.row.id)" v-if="isAuth('sys:menu:delete')">删除</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import TableTreeColumn from './table-tree-column';
import { treeDataTranslate } from '@/utils';
export default {
    data () {
        return {
            dataForm: {},
            dataList: [],
            dataListLoading: false,
            addOrUpdateVisible: false
        };
    },
    components: {
        TableTreeColumn
        // AddOrUpdate
    },
    created () {
        this.getDataList();
    },
    methods: {
        setIcon (icon) {
            return 'iconfont ' + icon;
        },
        // 获取数据列表
        editAll (id) {
            this.$router.push({path: 'manage', query: {id: this.checkModel.toString()}});
        },
        getDataList () {
            if (!this.isAuth('sys:menu:list')) return;
            this.dataListLoading = true;
            this.$http.get(this.$api.menu.list).then(({data}) => {
                if (data.code === 0) {
                    this.dataList = treeDataTranslate(data.data, 'id');
                    this.dataListLoading = false;
                }
            });
        },
        tableRowClassName ({row, rowIndex}) {
            if (rowIndex === 0) {
                return 'warning-row';
            } else if (rowIndex === 1) {
                return 'success-row';
            }
            return '';
        },
        tableHeaderCellClassName ({row, rowIndex}) {
            return 'header-row-cell';
        },
        deleteGood (id) {
            this.$confirm('<span><i class="iconfont icon-message-warning"></i>此操作将永久删除, 是否继续?</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                let dataObj = {
                    resourceAccessIdList: []
                };
                dataObj.resourceAccessIdList.push(id);
                this.$http({
                    url: this.$api.menu.delete,
                    method: 'put',
                    data: dataObj
                }).then(({data}) => {
                    if (data.code === 0) {
                        this.getDataList();
                        this.$message.success('操作成功!');
                    }
                });
            }).catch(() => {
            });
        }
    }
};
</script>
<style lang="scss">
  .sys-menu-list-wrapper {

  }
  .my-table-c {
    #menu-table .header-row-cell {
      padding: 0px;
      line-height: 18px;
    }
    .el-table th>.cell {
      line-height: 21px;
      padding: 10px;
    }
  }
  .btn-group {
    padding: 7px 0;
    text-align: right;
  }
  // .gy-table td, .gy-table th {
  //   padding: 10px !important;
  // }
    // #henry-breadcrumb>.el-breadcrumb__item.el-breadcrumb__inner{
    #menu-table .warning-row {
        /*background: oldlace;*/
    }
    #menu-table{
        .gy-button-extra{
            margin-right: 10px;
        }
    }
    #menu-table .success-row {
        /*background: #f0f9eb;*/
        /*font-size: 12px;*/
        padding: 18px 5px;
        line-height: 1.5;
    }
    #menu-table .header-row-cell {
        padding: 10px;
        font-size: 12px;
        text-align: center;
    }
    .sys-menu-list-wrapper {
      .gy-table tr.selected, .gy-table tr:hover {
        background-color: #fff;
      }
    }
    .el-table__body tr.hover-row>td {
      background-color: #f9f9f9;
    }
</style>
