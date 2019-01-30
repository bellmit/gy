<template>
<div class="postManagement">
    <div class="new-title-public">岗位管理</div>
    <div class="search">
        <div class="search-content">
            <input type="text" v-model="search.name" placeholder="请输入岗位名称">
            <i class="iconfont icon-search" @click="getList"></i>
        </div>
    </div>
    <div class="btn-groups">
        <button type="button" class="gy-button-extra" @click="addMan">新增</button>
        <button type="button" class="gy-button-normal" @click="deleteManager">批量删除</button>
    </div>
    <div class="table-content">
        <div class="gy-table">
            <table class="gy-table">
                <thead>
                <tr>
                    <th style="width: 55px"><el-checkbox v-model="chkAll" @change="managerChkAll"></el-checkbox></th>
                    <th style="width: 55px">ID</th>
                    <th style="width: 120px">岗位名称</th>
                    <th>岗位描述</th>
                    <th>备注</th>
                    <th style="width: 100px">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="manageList && manageList.length === 0"><td colspan="6" style="text-align: center">暂无数据</td></tr>
                <tr v-else v-for="(item, index) of manageList" :key="index">
                    <td>
                        <el-checkbox v-model="item.isDelete" :true-label="1" :false-label="0"></el-checkbox>
                    </td>
                    <td>{{index + 1}}</td>
                    <td>{{item.name}}</td>
                    <td style="max-width: 350px">{{item.positionDesc ? item.positionDesc : '-'}}</td>
                    <td style="max-width: 350px">{{item.remark ? item.remark : '-'}}</td>
                    <td>
                        <span class="gy-button-view" @click="editManager(item)">编辑</span>
                        <span class="gy-button-view" @click="managerDetail(item)">查看</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="pagination-wrapper" v-if="total > 0">
            <div class="pagination-total">共 {{total}} 条</div>
            <!-- 翻页 -->
            <el-pagination
                background
                :total="total"
                layout="prev, pager, next"
                @current-change="turnPage">
            </el-pagination>
        </div>
    </div>
    <el-dialog width="800px" title="岗位详情" :visible.sync="detailAddManager">
        <div class="detailAddManager">
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>岗位名称</span>{{dialogManager.name}}
            </div>
            <div class="gy-form-group" style="height: auto">
                <span class="l">岗位职责</span>
                <div class="chkHigherAuthorities">{{dialogManager.positionDesc ? dialogManager.positionDesc : '-'}}</div>
            </div>
            <div class="gy-form-group" style="width: 100%;height: auto;padding-right: 0">
                <span class="l">备注</span><div>{{dialogManager.remark ? dialogManager.remark : '-'}}</div>
            </div>
            <div style="clear: both"></div>
            <div class="addManager-btn-group">
                <button type="button" class="gy-button-normal" @click="detailAddManager = false">取消</button>
            </div>
        </div>
    </el-dialog>
    <add-manager :dialogAddManager="dialogAddManager" :title="title" :addAndEdit="add" :showmodel="true" @closeAddManger="closeAddManger" @doAddManager="doAddManager"></add-manager>
</div>
</template>

<script>
import addManager from './addManager';
export default {
    name: 'postManagement',
    data () {
        return {
            detailAddManager: false,
            manageList: [
                // {
                //     id: null, // 岗位id
                //     name: null, // 岗位名称
                //     positionDesc: null, // 岗位描述
                //     remark: null, // 备注
                //     companyId: null // 公司id
                // }
            ],
            total: 0,
            title: null,
            edit: false,
            currentPage: 1,
            chkManagerList: [],
            search: {
                name: null,
                pageSize: 10,
                pageNum: 1
            },
            add: {
                name: null,
                positionDesc: null,
                remark: null
            },
            dialogAddManager: false,
            dialogManager: {
                name: null,
                positionDesc: null,
                remark: null
            },
            chkAll: false
        };
    },
    created () {
        this.getList();
    },
    methods: {
        deleteManager () {
            let ids = Array.from(this.manageList, e => e.isDelete === 1 ? e.id : null).filter(e => e);
            if (ids.length === 0) {
                this.$message.error('请先选择要删除的岗位');
                return;
            }
            this.$confirm('确认删除所选岗位?', '提示', {
                confirmButtonText: '确定',
                confirmButtonClass: 'gy-button-extra',
                cancelButtonText: '取消',
                cancelButtonClass: 'gy-button-normal',
                callback: this.doDelete
            });
        },
        doDelete (type) {
            if (type === 'cancel') return;
            let ids = Array.from(this.manageList, e => e.isDelete === 1 ? e.id : null).filter(e => e);
            let params = {ids: ids};
            this.$http.put(this.$api.organizational.deleteManager, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('删除成功!');
                        this.chkAll = false;
                        this.getList();
                    }
                })
                .catch(() => {});
        },
        getList () {
            this.$http.post(this.$api.organizational.getManagerList, this.search)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.total = res.data.data.total;
                        this.manageList = Array.from(res.data.data.list, (e) => {
                            e.isDelete = 0;
                            return e;
                        });
                    }
                })
                .catch((e) => {});
        },
        turnPage (e) {
            this.search.pageNum = e;
            this.chkAll = false;
            this.getList();
        },
        managerChkAll (type) {
            this.manageList = Array.from(this.manageList, (x) => {
                x.isDelete = type ? 1 : 0;
                return x;
            });
        },
        editManager (item) {
            this.add = {...item};
            this.edit = true;
            this.title = '编辑岗位';
            this.dialogAddManager = true;
        },
        addMan () {
            this.dialogAddManager = true;
            this.edit = false;
            this.title = '新增岗位';
        },
        doAddManager (e) {
            let params = e.params;
            if (!params.name || params.name.replace(/(^\s+)|(\s+$)/g, '').length === 0) {
                this.$message.error('请先填写岗位名称');
                return;
            }
            this.$http[this.edit ? 'put' : 'post'](this.$api.organizational.addManager, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('操作成功!');
                        this.edit = false;
                        this.getList();
                        this.clearData();
                        if (e.type === 1) { this.title = '新增岗位'; return; }
                        this.dialogAddManager = false;
                        return;
                    }
                    this.$message.error(res.data.message);
                })
                .catch((e) => {});
        },
        closeAddManger () {
            this.dialogAddManager = false;
            this.clearData();
        },
        clearData () {
            Object.keys(this.add).map((e) => {
                this.add[e] = null;
            });
        },
        managerDetail (item) {
            this.detailAddManager = true;
            this.dialogManager = item;
        }
    },
    components: {addManager}
};
</script>

<style lang="scss" scoped>
    .postManagement {
        .search {
            padding: 15px 16px 0 0;
            text-align: right;
            &:after {
                display: block;
                clear: both;
                content: ' ';
            }
            .search-content {
                float: right;
                width: 200px;
                padding-right: 26px;
                position: relative;
                .icon-search {
                    position: absolute;
                    right: 0;
                    top: 2px;
                }
            }
        }
        .btn-groups {
            text-align: right;
            padding: 20px 16px;
            .gy-button-extra {
                height: 30px;
                line-height: 30px;
                margin-right: 8px;
            }
        }
        .table-content {
            padding: 0 16px;
        }
    }

    .pagination-wrapper {
        padding-top: 20px;
        padding-bottom: 30px;
        .pagination-total {
            font-size: 12px;
            line-height: 1;
            color: $color-main;
        }
    }

    .gy-table {
        td {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    /deep/ .detailAddManager {
        .addManager-btn-group {
            text-align: right;
            padding-top: 20px;
            button {
                margin-left: 8px;
            }
        }
        .gy-form-group {
            padding-left: 74px;
            height: 46px;
            .l {
                width: 64px;
                padding-left: 8px;
                strong {
                    left: 0;
                }
            }
            .icon-search {
                position: absolute;
                right: 30px;
                top: 10px;
            }
            .icon-add-no-border {
                position: absolute;
                right: 5px;
                top: 10px;
            }
        }
        .gy-form-group:nth-child(even) {
            padding-left: 104px;
            padding-right: 0;
            .l {
                width: 94px;
                padding-left: 38px;
                strong {
                    left: 28px;
                }
            }
        }
    }
</style>
