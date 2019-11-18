<template>
    <div class="standingBook stampList">
        <!-- 高级搜索 -->
        <div class="search-btn">
            <span @click="isShowSearch = !isShowSearch" class="ShowSearch">高级搜索<i class="el-input__icon"
                    :class="isShowSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </div>
        <div class="my-search clearfix">
            <div class="gy-form-group">
                <span class="l">用印单位</span>
                <input type="text" placeholder="请输入" v-model="search.companyName">
            </div>
            <div class="gy-form-group">
                <span class="l">状态</span>
                <el-select v-model="search.status">
                    <el-option
                            v-for="(item, index) in approvalStatus"
                            :key="index"
                            :label="item.value"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l">客户名称</span>
                <input type="text" placeholder="请输入" v-model="search.othersideCompanyName">
            </div>
            <div class="gy-form-group">
                <span class="l">申请人员</span>
                <input type="text" placeholder="请输入" v-model="search.userName">
                <span v-if="!isShowSearch" class="searchicon" @click="getList()"><i
                        class="iconfont icon-search"></i></span>
            </div>
            <div class="search-form" v-if="isShowSearch">
                <div class="gy-form-group">
                    <span class="l">申请日期</span>
                    <div class="searchDate">
                        <div class="d">
                            <el-date-picker
                                    v-model="search.applyStartDate"
                                    type="date"
                                    value-format="timestamp"
                                    placeholder="申请开始日期">
                            </el-date-picker>
                        </div>
                        <div class="c">至</div>
                        <div class="d">
                            <el-date-picker
                                    v-model="search.applyEndDate"
                                    type="date"
                                    @change="search.applyEndDate = $tools.convertDateEnd(search.applyEndDate)"
                                    value-format="timestamp"
                                    placeholder="申请结束日期">
                            </el-date-picker>
                        </div>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">使用日期</span>
                    <div class="searchDate">
                        <div class="d">
                            <el-date-picker
                                    v-model="search.usedStartDate"
                                    type="date"
                                    value-format="timestamp"
                                    placeholder="使用开始日期">
                            </el-date-picker>
                        </div>
                        <div class="c">至</div>
                        <div class="d">
                            <el-date-picker
                                    v-model="search.usedEndDate"
                                    type="date"
                                    @change="search.usedEndDate = $tools.convertDateEnd(search.usedEndDate)"
                                    value-format="timestamp"
                                    placeholder="使用结束日期">
                            </el-date-picker>
                        </div>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">印章种类</span>
                    <el-select v-model="search.stampType">
                        <el-option
                                v-for="(item, index) in stampData"
                                :key="index"
                                :label="item.value"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l">关联合同</span>
                    <input type="text" placeholder="请输入" v-model="search.essenceId">
                </div>
                <div class="gy-form-group">
                    <span class="l">申请编号</span>
                    <input type="text" placeholder="请输入" v-model="search.applyCode">
                    <span v-if="isShowSearch" class="searchicon" @click="getList()"><i
                            class="iconfont icon-search"></i></span>
                </div>
            </div>
        </div>
        <div class="box">
            <div class="gy-table">
                <el-table
                    :data="stampList"
                    style="width: 100%">
                    <el-table-column
                        :show-overflow-tooltip="true"
                        label="用印单位"
                        width="120">
                        <template slot-scope="scope">
                            <span>{{scope.row.companyName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="状态"
                        width="140">
                        <template slot-scope="scope">
                            <span>{{scope.row.statusDesc}}</span>&nbsp;<span v-for="(item1, index) in scope.row.toDoUserList" :key="index">{{item1.username}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="申请日期"
                        width="140">
                        <template slot-scope="scope">
                            <span>{{scope.row.createdDate | date(2)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="申请人员"
                        width="100">
                        <template slot-scope="scope">
                            <span>{{scope.row.userName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="关联合同"
                        width="100">
                        <template slot-scope="scope">
                            <span>{{scope.row.essenceId||"--"}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="文件名称"
                        width="140">
                        <template slot-scope="scope">
                            <span>{{scope.row.stampFileDescription}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="印章种类"
                        width="100">
                        <template slot-scope="scope">
                            <span>{{scope.row.stampTypeDesc}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="使用日期"
                        width="100">
                        <template slot-scope="scope">
                            <span>{{scope.row.usedDate| date()}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="附件"
                        width="100">
                        <template slot-scope="scope">
                            <span><i v-if="scope.row.attachments !==null && scope.row.attachments.length >0" class="iconfont icon-photo"
                           @click="handleShowImg(scope.row.attachments)"></i>
                        <i v-else class="iconfont icon-photo-null" @click="imgErr('附件')"></i></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="签章文件"
                        width="100">
                        <template slot-scope="scope">
                            <span><i v-if="scope.row.signedFiles !==null && scope.row.signedFiles.length >0" class="iconfont icon-photo"
                           @click="handleShowImg(scope.row.signedFiles)"></i>
                        <i v-else class="iconfont icon-photo-null" @click="imgErr('签章文件')"></i></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="申请编号"
                        width="180">
                        <template slot-scope="scope">
                            <span>{{scope.row.applyCode}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="65">
                        <template slot-scope="scope">
                            <button class="gy-button-view" style="background-color: #fff" @click="lookStamp(scope.row.id)">查看</button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 分页 -->
        <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="search.pageNo"
                :page-size="search.pageSize"
                :total="total"
                @current-change="handleCurrentChange">
        </el-pagination>
        <!-- img 弹出 -->
        <gy-file-view ref="contFileView"></gy-file-view>
    </div>
</template>

<script>
import gyFileView from './../components/gyFileView';

export default {
    components: {gyFileView},
    data () {
        return {
            total: null,
            isShowSearch: false,
            search: {
                pageNo: 1,
                pageSize: 10,
                companyName: null, // 用印单位
                status: null, // 状态
                othersideCompanyName: null, // 客户公司名称
                userName: null, // 申请人员
                applyStartDate: null, // 申请开始日期
                applyEndDate: null, // 申请结束日期
                usedStartDate: null, // 使用开始日期
                usedEndDate: null, // 使用结束日期
                stampType: null, // 印章类型
                essenceId: null, // 合同要素ID
                applyCode: null // 申请编号，格式为（^YY(\d{6})(\d{3,})$）。e.g YY190627001
            },
            stampList: [],
            approvalStatus: [
                {
                    value: '全部'
                },
                {
                    id: 1,
                    value: '审批中'
                },
                {
                    id: 2,
                    value: '审批通过'
                },
                {
                    id: 3,
                    value: '已完成'
                },
                {
                    id: 4,
                    value: '已驳回'
                }
            ],
            stampData: [ // 印章种类
                {
                    value: '全部'
                },
                {
                    id: 1,
                    value: '合同章'
                },
                {
                    id: 2,
                    value: '提货章'
                }
            ]
        };
    },
    activated () {
        if (!this.$route.meta.isBack) {
            this.search = {};
            this.getList();
        }
        this.$route.meta.isBack = false;
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            this.getList();
        },
        // 列表
        getList () {
            this.$http.post(this.$api.stamp.stampList, this.search)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.stampList = res.data.data.list;
                        this.total = res.data.data.total;
                        return;
                    }
                    this.$message.error(res.data.message);
                });
        },
        handleShowImg (list) {
            this.$refs.contFileView.open4MultiFile(list);
        },
        imgErr (title) {
            this.$message({message: title + '暂无数据', type: 'warning'});
        },
        lookStamp (id) {
            let query = {
                id: id // 合同要素id
            };
            this.$router.push({name: 'stampDetail', query: query});
        },
        // 分页
        handleCurrentChange (v) {
            this.search.pageNo = v;
            this.getList();
        }
    }
};
</script>
<style lang="scss" scoped>
    .stampList {
        .my-search {
            .gy-form-group {
                padding: 6px 40px 6px 110px;
                .l {
                    width: 102px;
                    display: block;
                    // top: 16px;
                    // line-height: 40px;
                }
            }
        }
    }
    .ShowSearch {
        margin-right: 30px;
        cursor: pointer;
    }

    .hover:hover {
        color: #4A90E2;
        cursor: pointer;
    }
    .icon-photo:before, .icon-photo-null:before {
        font-size: 20px;
        // line-height: 1.08;
    }
    .hover {
        color: #999999;
        span {
            margin-left: 5px;
            vertical-align: middle;
            font-size: 14px;
            line-height: 1.8;
        }
        .icon-photo:before, .icon-photo-null:before {
            line-height: 1.08;
        }
    }

    .bgcf {
        background-color: #fff;
    }

    .box {
        margin: 0 16px;
    }
</style>
