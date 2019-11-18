<template>
    <div class="boat-list transport-wrap order">
        <div class="new-title-public">船运需求单</div>
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
                    <i class="iconfont icon-search" @click="searchList"></i>
                </div>
                <div class="se-left2" @click="disflag = !disflag">
                    <span>高级搜索</span>
                    <i class="iconfont" :class="{'icon-arrow-down': !disflag, 'icon-arrow-up': disflag}"></i>
                </div>
            </div>
        </div>
        <div class="gy-form" v-if="disflag">
            <div class="gy-form-group">
                <span class="l">起始港</span>
                <input @click="blur" type="text" class="gy-input" placeholder="请输入" @keyup.enter="getlist1click" v-model="searchData.data.loadWrhHarbourName">
                <i class="iconfont icon-mySearch searchposition"  @click="getlist1click"></i>
                <ul class="listulaaa"  v-show="listShow">
                    <li v-for="(item,index) in harbouList" :key="index" @click="getlist1select(item)" v-if="harbouList.length>0">
                        {{item.harbourName}}
                    </li>
                    <li class="none-tips" v-if="harbouList.length === 0">没有搜到相关内容</li>
                </ul>
            </div>
            <div class="gy-form-group">
                <span class="l">目的港</span>
                <input @click="blur01" type="text" class="gy-input" placeholder="请输入" @keyup.enter="getlist1click01" v-model="searchData.data.unloadWrhHarbourName">
                <i class="iconfont icon-mySearch searchposition"  @click="getlist1click01"></i>
                <ul class="listulaaa"  v-show="listShow01">
                    <li v-for="(item,index) in harbouList" :key="index" @click="getlist1select01(item)" v-if="harbouList.length>0">
                        {{item.harbourName}}
                    </li>
                    <li class="none-tips" v-if="harbouList.length === 0">没有搜到相关内容</li>
                </ul>
            </div>
            <div class="gy-form-group">
                <span class="l">期望发货日期</span>
                <el-date-picker
                        v-model="estimatedDate"
                        type="daterange"
                        align="center"
                        unlink-panels
                        range-separator="至"
                        start-placeholder = '开始日期'
                        end-placeholder= '结束日期'
                >
                </el-date-picker>
            </div>
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
                    <i class="iconfont icon-search" @click="searchList"></i>
                </div>
            </div>
        </div>
        <div class="button-box">
            <router-link :to="{ name: 'boatAdd' }"
                         class="gy-button-extra">发布需求</router-link>
        </div>
        <div class="boat-table">
            <table class="gy-table list bid-list">
                <thead>
                <tr>
                    <td>适装品种</td>
                    <td>数量</td>
                    <td>期望发货日期</td>
                    <td>意向价格</td>
                    <td>起始港</td>
                    <td>目的港</td>
                    <td>联系人姓名</td>
                    <td>联系人手机</td>
                    <td>申请时间</td>
                    <td>状态</td>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="item in list" :key="item.id" v-if="list !==null && list.length > 0">
                        <td>{{item.skuName}}</td>
                        <td class="align-r">{{item.skuQuantity}}吨</td>
                        <td>{{item.estimatedLoadingDate | date}}</td>
                        <td class="align-r">
                            <span v-if="item.intentPrice">{{item.intentPrice | numToCash}}元</span>
                            <span v-if="!item.intentPrice">面议</span>
                        </td>
                        <td>{{item.loadWrhHarbourName}}</td>
                        <td>{{item.unloadWrhHarbourName}}</td>
                        <td>{{item.contact}}</td>
                        <td>{{item.contactMobile}}</td>
                        <td>{{item.createdDate | date}}</td>
                        <td><span v-text="getStatus(item.approveStatus)"></span></td>
                    </tr>
                    <tr v-if="list !=null && list.length === 0">
                        <td colspan="10" class="note">暂无数据</td>
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
                        @current-change="getList"
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
            list: [],
            searchData: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                data: {
                    keywords: null, // 关键词搜索 品名-联系人-联系电话
                    loadWrhHarbourName: null, // 起始港
                    unloadWrhHarbourName: null, // 目的港
                    approveStatus: null, // 受理状态 1:未受理 2已受理 3:已拒绝
                    createdDateStart: null, // 开始时间
                    createdDateEnd: null, // 结束时间
                    estimatedLoadingDateStart: null, // 发货日期开始
                    estimatedLoadingDateEnd: null // 发货日期结束
                }
            },
            userStatusList: [
                {initKeys: '', initValues: '全部', initCountValues: ''},
                {initKeys: '1', initValues: '待受理', initCountValues: ''},
                {initKeys: '2', initValues: '已受理', initCountValues: ''},
                {initKeys: '3', initValues: '已拒绝', initCountValues: ''}
            ],
            listShow: false, // 起始港口下拉框展示
            listShow01: false, // 目的港口下拉框展示
            harbouList: [] // 存放港口列表
        };
    },
    created () {
        this.init();
        this.getList();
    },
    methods: {
        // 初始化 港口列表
        init (value = null) {
            let list = {
                harbourName: value
            };
            this.$http.post(this.$api.transport.harboursList, list)
                .then(res => {
                    if (res.data.code === 0) {
                        this.harbouList = res.data.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
        },
        getStatusList () {
            this.$http.post(this.$api.transport.enquiryIntentStatus, this.searchData.data)
                .then(res => {
                    if (res.data.code === 0) {
                        let status = res.data.data;
                        for (let i in status) {
                            if (status[i].approveStatus === 1) {
                                this.userStatusList[1].initCountValues = status[i].count;
                            } else if (status[i].approveStatus === 2) {
                                this.userStatusList[2].initCountValues = status[i].count;
                            } else if (status[i].approveStatus === 3) {
                                this.userStatusList[3].initCountValues = status[i].count;
                            } else {
                                this.userStatusList[0].initCountValues = status[i].count;
                            }
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
        },
        // 起始港口 列表获取
        getlist1click () {
            this.listShow = true;
            this.init(this.searchData.data.loadWrhHarbourName);
        },
        getlist1select (item) {
            this.listShow = false;
            this.searchData.data.loadWrhHarbourName = item.harbourName;
        },
        blur () {
            this.listShow = false;
            this.searchData.data.loadWrhHarbourName = null;
        },
        // 目的港口 列表获取
        getlist1click01 () {
            this.listShow01 = true;
            this.init(this.searchData.data.unloadWrhHarbourName);
        },
        getlist1select01 (item) {
            this.listShow01 = false;
            this.searchData.data.unloadWrhHarbourName = item.harbourName;
        },
        blur01 () {
            this.listShow01 = false;
            this.searchData.data.unloadWrhHarbourName = null;
        },
        getList () {
            this.getInfo();
            this.getStatusList();
            this.$http.post(this.$api.transport.enquiryIntentSearch, this.searchData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.list = res.data.data.list;
                        this.searchData.total = res.data.data.total;
                    } else {
                        this.$message({
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
            this.searchData.data.approveStatus = null;
            if (status !== -1) {
                this.searchData.data.approveStatus = status;
            }
            this.searchList();
        },
        // 搜索按钮
        searchList () {
            this.searchData.pageNum = 1;
            this.getList();
        },
        // 获取状态
        getStatus (type) {
            if (type === 1) {
                return '待受理';
            } else if (type === 2) {
                return '已受理';
            } else if (type === 3) {
                return '已拒绝';
            } else {
                return '未知';
            }
        },
        getInfo () {
            this.searchData.data.createdDateStart = this.createDate[0] || null;
            this.searchData.data.createdDateEnd = this.createDate[1] || null;
            this.searchData.data.estimatedLoadingDateStart = this.estimatedDate[0] || null;
            this.searchData.data.estimatedLoadingDateEnd = this.estimatedDate[1] || null;
        }
    }
};
</script>

<style lang="scss" scoped>
.boat-list{
    .gy-form{
        padding-top:0;
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
    .note {
        text-align: center;
        line-height: 40px;
        font-size: 14px;
    }
    .searchposition{
        position: absolute;
        top: 10px;
        right: 37px;
    }
    .listulaaa{
        background-color: #fff;
        width: 65%;
        max-height: 200px;
        overflow: auto;
        position: absolute;
        top: 41px;
        z-index: 9;
        border: 1px solid #e6eaea;
        border-top: none;
        li{
            padding: 5px 10px;
        }
        li:hover{
            cursor: pointer;
            background-color: #f5f7fa;
            color: #4a90e2;
        }
    }
}
</style>
<style lang="scss">
.boat-list{
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
