<template>
    <div class="transport-wrap order">
        <h2>司机管理列表</h2>
        <div class="t">
            <ul class="tabs">
                <li class="all" :class="{'selected': tabIdx === -1}" @click="tabChange(-1,-1)"><a
                    href="javascript:;">全部</a></li>

                <li v-for="(statusItem,index) in userStatusList"
                    @click="tabChange(index,statusItem.initKeys)"
                    :class="{'selected': tabIdx === index}" :key="index">
                    <a href="javascript:;">
                        {{statusItem.initValues}}
                        (<span>{{statusItem.initCountValues}}</span>)</a>
                </li>

            </ul>
            <div class="search">
                <i class="iconfont icon-search" @click="searchList"></i>
                <input type="text" v-model="searchUserData.data.keywords" placeholder="请输入姓名或手机号" class="gy-input">
            </div>
        </div>

        <div class="date-picker-box clearfix search-area">
            <div class="date-picker fl">
                <span class="1">行驶证有效期 </span>
                <el-date-picker
                    v-model="searchUserData.data.startTime"
                    type="date"
                    style="width: 30%;"
                    placeholder="选择日期">
                </el-date-picker>
                <span>  至  </span>
                <el-date-picker
                    v-model="searchUserData.data.endTime"
                    type="date"
                    style="width: 30%;"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
            <div>
                <span class="payment-list-content-item-tit">人员类型</span>
                <el-select v-model="searchUserData.data.personnelType" class="select-plugin" placeholder="请选择类型">
                    <el-option
                        v-for="item in personnelTypeState"
                        :key="item.initKeys"
                        :label="item.initValues"
                        :value="item.initKeys">
                    </el-option>
                </el-select>
                <i class="iconfont icon-search" @click="searchList"></i>
            </div>

        </div>

        <span class="button-box">
            <router-link :to="{ name: 'transportUserAdd' }"
                         class="gy-button-extra">新增司机</router-link>
        </span>

        <table class="gy-table list bid-list">
            <thead>
            <tr>
                <td class="td-180">姓名</td>
                <td class="td-100">手机号</td>
                <td class="td-100">人员类型</td>
                <td class="td-180">初次领证日期</td>
                <td class="td-180">证件有效期</td>
                <td class="td-100">准驾车型</td>
                <td class="td-100">状态</td>
                <td class="td-180">操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in userList" :key="item.id" v-if="userList !==null && userList.length > 0">
                <td colspan="8" class="item">
                    <table class="gy-table">
                        <tr>
                            <td class="td-180">{{item.username}}</td>
                            <td class="td-100"><span>{{item.phone}}</span></td>
                            <td class="td-100"><span v-text="explainPersonnelType(item.personnelType)"></span></td>
                            <td class="td-180">{{item.receiveDate | date}}</td>
                            <td class="td-180">{{item.validDate | date}}</td>
                            <td class="td-100">{{item.vehicleModel}}</td>
                            <td class="td-100"><span v-text="explainValidType(item.valid)"></span></td>
                            <td class="td-180">
                                <span class="gy-button-view" @click="handleShowTransportUser(item.id)">查看</span>
                                <span class="gy-button-view" @click="handleEditTransportUser(item.id)">编辑</span>
                                <span class="gy-button-view disabled" v-if="item.valid==1" @click="handleDisableTransportUser(item.id)">禁用</span>
                                <span class="gy-button-view" v-if="item.valid==0" @click="handleEnableTransportUser(item.id)">启用</span>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr v-if="userList !=null && userList.length === 0">
                <td colspan="8" class="note">暂无数据</td>
            </tr>

            <div class="pagination-box"
                 v-if="searchUserData != null && searchUserData.total>searchUserData.pageSize">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page.sync = "searchUserData.pageNum"
                    :page-size="searchUserData.pageSize"
                    :total="searchUserData.total"
                    @current-change="getList"
                >
                </el-pagination>
            </div>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from '../../../config/axios';

export default {
    name: 'list',
    data () {
        return {
            tabIdx: -1,
            userList: null,
            searchUserData: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                data: {
                    valid: null,
                    keywords: null,
                    startTime: null,
                    endTime: null,
                    personnelType: null
                }
            },
            personnelTypeState: [
                {initKeys: null, initValues: '未选择'},
                {initKeys: '1', initValues: '驾驶人'},
                {initKeys: '2', initValues: '押运人'}
            ],
            statusCount: {},
            userStatusList: [
                {initKeys: '1', initValues: '已启用', initCountValues: ''},
                {initKeys: '0', initValues: '已禁用', initCountValues: ''}
            ]
        };
    },
    created () {
        this.getCount();
        this.getList();
    },
    methods: {
        // 查询数量
        getCount () {
            this.$http.get(this.$api.transport.transportUserStatus)
                .then(res => {
                    this.statusCount = res.data.data;
                    this.userStatusList[0].initCountValues = this.statusCount.validCount;
                    this.userStatusList[1].initCountValues = this.statusCount.unValidCount;
                });
        },
        // 查询列表
        getList () {
            let that = this;
            this.$http.post(this.$api.transport.transportUserList, this.searchUserData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.userList = res.data.data.list;
                        this.pageInfo = res.data.data;
                        this.searchUserData.total = res.data.data.total;
                    } else {
                        that.$alert(res.data.message, '提示');
                    }
                });
        },
        // tab切换
        tabChange (tabIdx, status) {
            this.tabIdx = tabIdx;
            this.searchUserData.data.valid = null;
            if (status !== -1) {
                this.searchUserData.data.valid = status;
            }
            this.searchList();
        },
        // 搜索按钮
        searchList () {
            this.searchUserData.pageNum = 1;
            this.getList();
        },
        // 详细页面跳转
        handleShowTransportUser (id) {
            this.$router.push({name: 'transportUserDetail', params: {id: id}});
        },
        // 编辑页面跳转
        handleEditTransportUser (id) {
            this.$router.push({name: 'transportUserAdd', params: {id: id}});
        },
        // 禁用
        handleDisableTransportUser (id) {
            axios.data = {id: id};
            this.$http.delete(this.$api.transport.transportUserDisable, axios)
                .then(res => {
                    this.getCount();
                    this.getList();
                });
        },
        // 启用
        handleEnableTransportUser (id) {
            axios.data = {id: id};
            this.$http.delete(this.$api.transport.transportUserEnable, axios)
                .then(res => {
                    this.getCount();
                    this.getList();
                });
        },
        // 人员类型解析
        explainPersonnelType (personnelType) {
            if (personnelType === 1) {
                return '驾驶人';
            } else if (personnelType === 2) {
                return '押运人';
            } else {
                return '未知';
            }
        },
        // 人员状态解析
        explainValidType (validType) {
            if (validType === 0) {
                return '已禁用';
            } else if (validType === 1) {
                return '已启用';
            } else {
                return '未知';
            }
        }

    }
};
</script>

<style lang="scss" scoped>
    .disabled{
        color: #e0370f;
        border-color: #e0370f;
    }
    .search-area {
        padding: 10px 20px
    }

    .select-plugin {
        width: 30%
    }

    .button-box {
        display: block;
        text-align: right;
        padding: 0 20px 10px;
    }

    .bid-list {
        thead {
            td {
                padding-right: 0;
            }
        }
        tbody {
            td {
                background-color: #fbfbfc;
                border-bottom: 5px solid #fff;
                padding-right: 0;
            }
            tr:last-child {
                td {
                    border: none;
                }
            }
        }
    }

    .td-180 {
        width: 180px;
    }

    .td-100 {
        width: 100px;
    }

    .td-126 {
        width: 126px;
    }

    .gy-button-view {
        margin-right: 6px;
    }

    .gy-button-view i {
        font-size: 12px;
        line-height: 8px;
        transform: scale(0.8);
        display: inline-block;
    }

    .sub-list {
        background-color: #fff;
        table {
            width: 90%;
            margin: 0 auto;
            td {
                background-color: #fff;
                border: none;
            }
        }
    }

    .link-im {
        color: $color-extra;
        margin-left: 10px;
    }

    .note {
        text-align: center;
        line-height: 40px;
        font-size: 14px;
    }
</style>
