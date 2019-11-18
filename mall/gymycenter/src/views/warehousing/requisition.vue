<template>
    <div class="requisition">
        <div class="new-title-public">仓储需求单</div>
        <div class="t">
            <ul class="tabs">
                <li v-for="(statusItem,index) in userStatusList"
                    @click="tabChange(index,statusItem.initKeys)"
                    :class="{'selected': tabIdx === index}" :key="index">
                    <a href="javascript:;">
                        {{statusItem.initValues}}
                        (<span>{{statusItem.initCountValues}}</span>)</a>
                </li>
            </ul>
            <div class="search">
                <div class="se-left11">
                    <input type="text" v-model="searchData.data.keywords" placeholder="请输入品名">
                    <i class="iconfont icon-search" @click="getRequisition"></i>
                </div>
                <div class="se-left2" @click="disflag = !disflag">
                    <span>高级搜索</span>
                    <i class="iconfont" :class="{'icon-arrow-down': !disflag, 'icon-arrow-up': disflag}"></i>
                </div>
            </div>
        </div>
        <div class="gy-form" v-if="disflag">
            <div class="gy-form-group">
                <span class="l">申请时间</span>
                <el-date-picker
                        v-model="createDate"
                        type="daterange"
                        align="center"
                        unlink-panels
                        range-separator="至"
                        start-placeholder = '开始日期'
                        end-placeholder= '结束日期'
                >
                </el-date-picker>
                <div class="my_add">
                    <i class="iconfont icon-search" @click="getRequisition"></i>
                </div>
            </div>
        </div>
        <div class="button-box">
            <router-link :to="{ name: 'requisitionAdd' }"
                         class="gy-button-extra">发布需求</router-link>
        </div>
        <div class="boat-table">
            <table class="gy-table list bid-list">
                <thead>
                <tr>
                    <td>品名</td>
                    <td>数量</td>
                    <td>计划入库日期</td>
                    <td>仓储单价</td>
                    <td>仓储区域</td>
                    <td>申请时间</td>
                    <td>状态</td>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="item in requisitionList" :key="item.id" v-if="requisitionList !==null && requisitionList.length > 0">
                        <td>{{item.prdProductName}}</td>
                        <td class="align-r">{{item.quantity}}吨</td>
                        <td>{{item.expectEntryDate | date}}</td>
                        <!-- <td>{{item.price ? item.price : '面议'}}</td> -->
                        <td class="align-r" v-if="item.price">{{item.price}}元/立方*月</td>
                        <td class="align-r" v-if="!item.price">面议</td>
                        <td>{{item.areaCategoryName}}</td>
                        <td>{{item.createdDate | datems(true)}}</td>
                        <td class="align-c"><span v-text="getStatus(item.isAudit)"></span></td>
                    </tr>
                    <tr v-if="requisitionList !=null && requisitionList.length === 0">
                        <td colspan="10" style="text-align:center;">暂无数据</td>
                    </tr>
                </tbody>
            </table>
            <div class="departmentName">
                共 {{searchData.total}} 条记录
            </div>
            <div class="pagination-box" v-if="searchData != null && searchData.total>searchData.pageSize">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :current-page.sync="searchData.pageNum"
                        :page-size="searchData.pageSize"
                        :total="searchData.total"
                        @current-change="getRequisition"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'list',
    data () {
        return {
            tabIdx: 0,
            disflag: false,
            createDate: '', // 存放申请时间
            estimatedDate: '', // 存放发货时间
            requisitionList: [],
            searchData: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                data: {
                    keywords: null, // 关键词搜索 品名-联系人-联系电话
                    isAudit: null, // 起始港
                    companyName: null, // 目的港
                    isDisplay: null, // 受理状态 1:未受理 2已受理 3:已拒绝
                    createdBeginDate: null, // 开始时间
                    createdEndDate: null, // 结束时间
                    expectBeginEntryDate: null, // 发货日期开始
                    expectEndEntryDate: null // 发货日期结束
                }
            },
            userStatusList: [
                {initKeys: '', initValues: '全部', initCountValues: ''},
                {initKeys: '0', initValues: '待受理', initCountValues: ''},
                {initKeys: '1', initValues: '已受理', initCountValues: ''},
                {initKeys: '2', initValues: '已拒绝', initCountValues: ''}
            ],
            listShow: false, // 起始港口下拉框展示
            listShow01: false, // 目的港口下拉框展示
            harbouList: [] // 存放港口列表
        };
    },
    created () {
        this.getRequisition();
        this.getRequisitionCount();
    },
    methods: {
        // 获得统计意向单
        getRequisitionCount () {
            var that = this;
            that.$http.post(that.$api.warehouse.requisitioncount, this.searchData)
                .then(res => {
                    if (res.data.code === 0) {
                        console.log(res.data);
                        let status = res.data.data;
                        this.userStatusList[0].initCountValues = status.total;
                        this.userStatusList[1].initCountValues = status.unaudited;
                        this.userStatusList[2].initCountValues = status.approved;
                        this.userStatusList[3].initCountValues = status.refuse;
                    } else {
                        that.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
        },
        // 获得需求单列表
        getRequisition () {
            this.getInfo();
            this.getRequisitionCount();
            var that = this;
            that.$http.post(that.$api.warehouse.search, that.searchData)
                .then(res => {
                    if (res.data.code === 0) {
                        console.log(res.data.data.list);
                        that.requisitionList = res.data.data.list;
                        that.searchData.total = res.data.data.total;
                    } else {
                        that.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
        },
        // tab切换
        tabChange (tabIdx, status) {
            this.tabIdx = tabIdx;
            console.log(tabIdx, status);
            this.searchData.data.isAudit = null;
            if (status !== -1) {
                this.searchData.data.isAudit = status;
            }
            this.getRequisition();
        },
        // 获取状态
        getStatus (type) {
            if (type === 0) {
                return '待受理';
            } else if (type === 1) {
                return '已受理';
            } else if (type === 2) {
                return '已拒绝';
            } else {
                return '未知';
            }
        },
        getInfo () {
            this.searchData.data.createdBeginDate = this.createDate ? this.createDate[0] : null;
            this.searchData.data.createdEndDate = this.createDate ? this.createDate[1] : null;
        }
    }
};
</script>

<style lang="scss" scoped>
.requisition{
    .t{
    overflow: hidden;
    .tabs{
        float: left;
        overflow: hidden;
        padding: 20px 16px;
        line-height: 1;
        margin-top: 0 !important;
        li{
            float: left;
            line-height: 30px;
            height: 30px;
            padding: 0 8px;
            position: relative;
            &.all{
                padding-right: 8px;
            }
            &.selected{
                a{
                    color: $color-highlight;
                }
                &:after{
                    position: absolute;
                    width: 100%;
                    left: 0;
                    bottom: 0;
                    content: '';
                    background-color: $color-highlight;
                    height: 2px;
                }
            }
        }
        li:hover{
            cursor: pointer;
        }
    }
    .search{
        float: right;
        overflow: hidden;
        padding: 20px 30px 0px 0;
        .se-left1{
            float: left;
            width: 216px;
            border-bottom: 1px solid #b5b5b5;
            input{
                border: none;
                width: 190px;
            }
        }
        .se-left11{
            float: left;
            width: 160px;
            margin-right: 5px;
            border-bottom: 1px solid #b5b5b5;
            input{
                border: none;
                width: 135px;
            }
        }
        .se-left2{
            float: left;
            display: inline-block;
            margin-left: 2px;
            i{
                vertical-align: top;
            }
        }
        .se-left2:hover{
            cursor: pointer;
        }
    }
    }
    .gy-form{
        padding-top:0;
        .gy-form-group{
            padding: 8px 30px 8px 100px
        }
    }
    .my_add{
        position: absolute;
        top: 10px;
        right: 11px;
    }
    .button-box {
        text-align: right;
        padding: 0 20px 10px;
    }
    .boat-table{
        padding: 0 14px;
    }
}
</style>
<style lang="scss">
.requisition{
    .el-range-separator, .el-input__icon{
        line-height: 24px;
        padding:0;
    }
    .el-input__inner{
        height: 30px;
        font-size: 14px;
    }
}
</style>
