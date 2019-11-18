<!--风控中心-->
<template>
    <div class="bussinessAcc-list-main">
        <div class="new-title-public">业务准入</div>
        <div class="bussinessAcc-list">
            <div class="select">
                <div class="search-box">
                    <input type="search" v-model="search.data.keywords" placeholder="请输入公司名称">
                    <button @click="searchs" class="gy-button-extra"><i class="iconfont icon-search"></i></button>
                </div>
            </div>
            <div class="fr" style="margin-bottom:10px">
                <button class="gy-button-extra added" @click="addCompany">新增</button>
                <button class="gy-button-normal" @click="deleteItem">删除</button>
            </div>
            <el-table
                ref="multipleTable"
                :data="list"
                tooltip-effect="dark"
                style="width: 100%"
                class="gy-table"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    label="公司信息"
                    width="200px">
                    <template slot-scope="scope">
                        <span>{{scope.row.counterpartyName}}</span><br>
                        <span>评级：{{scope.row.ratingInfo? (scope.row.ratingInfo.finalRank ? scope.row.ratingInfo.finalRank : '--') : '--'}}</span><br>
                        <span>{{scope.row.access === 0? '不准入' : '准入'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="公司类型"
                    width="120">
                    <template slot-scope="scope">
                        {{scope.row.counterpartyTypeName}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="交易模式">
                    <template slot-scope="scope">
                        <div v-if="scope.row.configList.length" v-for="(items, ind) in scope.row.configList" :key="ind">
                            <span> {{items.rskTranscationTypeName|| '--'}} </span>
                        </div>
                        <div v-else>
                            -
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="交易品种">
                    <template slot-scope="scope">
                        <div v-if="scope.row.configList.length" v-for="(items, ind) in scope.row.configList" :key="ind">
                            <span> {{items.transcationProductCategoryName|| '--'}} </span>
                        </div>
                        <div v-else>
                            -
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="交割方式">
                    <template slot-scope="scope">
                        <div v-if="scope.row.configList.length" v-for="(items, ind) in scope.row.configList" :key="ind">
                            <span> {{items.paymentType ? '先货后款' : '先款后货'}} </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="交割周期">
                    <template slot-scope="scope">
                        <div v-if="scope.row.configList.length" v-for="(items, ind) in scope.row.configList" :key="ind">
                            <span> {{items.rskTranscationPeriodContent}} </span>
                        </div>
                        <div v-else>
                            -
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="交易限额(万元)"
                    width="120px">
                    <template slot-scope="scope">
                        <div v-if="scope.row.configList.length" v-for="(items, ind) in scope.row.configList" :key="ind">
                            <span>{{items.transcationLimit}} </span>
                        </div>
                        <div v-else>
                            -
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    class-name="operation">
                    <template slot-scope="scope">
                        <button class="gy-button-view" @click="goView(scope.row)">评级信息</button>
                        <button class="gy-button-view admit" @click.stop="pass(scope.row)">准入</button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 准入 -->
            <el-dialog v-if="dialogVisible" width="960px" class="settle-dialog"
                    @close="handAdmittance" @open="handleOpen" :visible.sync="dialogVisible" title="准入设置">
                <div style="overflow: hidden">
                    <div class="paddingLeft">
                        <div class="gy-form-group single-row-whether sell">
                            <span class="access l lc">是否准入</span>
                                <el-select v-model="info.access" placeholder="请选择">
                                    <el-option
                                        v-for="item in accessOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                        </div>
                        <div class="clear"></div>
                        <div class="gy-h4 rating-information">评级信息</div>
                        <div class="gy-form-group">
                            <span class="l">公司名称</span>
                            <span>{{info.counterpartyName}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">交易对手类别</span>
                            <span>{{info.counterpartyTypeName}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">国烨参考评级</span>
                            {{info.companyGoalModel? info.companyGoalModel.referenceRank: '--'}}
                            <span>
                                <router-link class="targetRouter" tag="a" target="_blank" :to="{name:'accessReplication',query: {companyId: info.companyGoalModel? info.companyGoalModel.companyId: ''}}">查看评级详情</router-link>
                            </span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">国烨评级日期</span>
                            <span>{{info.companyGoalModel?(info.companyGoalModel.ratingCreatedDate === null ? '--':info.companyGoalModel.ratingCreatedDate) : '--'}}</span>
                        </div>
                        <div class="gy-form-group sells">
                            <span class="l">自有评级</span>
                            <span>{{info.ratingInfo?(info.ratingInfo.finalRank === null ? '--':info.ratingInfo.finalRank) : '--'}}</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">自有评级日期</span>
                            <span>{{info.ratingInfo?(info.ratingInfo.ratingDate === null? '--': info.ratingInfo.ratingDate) : '--'}}</span>
                        </div>
                        <div class="clear"></div>
                        <div class="gy-h4 business-Information">经营信息</div>
                        <div class="gy-form-group">
                            <span class="l">年销售额(万元)</span>
                            <span v-if="info.companyBusinessInfo">{{info.companyBusinessInfo.salesVolume | numToCash(4)}}</span>
                            <span v-else>--</span>
                            <!-- <span>{{info.companyBusinessInfo? info.companyBusinessInfo.salesVolume: '--'}}</span> -->
                        </div>
                        <div class="gy-form-group">
                            <span class="l">固定资产(万元)</span>
                            <span v-if="info.companyBusinessInfo">{{info.companyBusinessInfo.fixedAssets | numToCash(4)}}</span>
                            <span v-else>--</span>
                            <!-- <span>{{info.companyBusinessInfo? info.companyBusinessInfo.fixedAssets: '--'}}</span> -->
                        </div>
                        <div class="clear"></div>
                        <div class="button-box">
                            <div class="gy-h4 transaction-settings">交易设置</div>
                            <button class="gy-button-extra fr" @click.stop.prevent="addRow">添加</button>
                        </div>
                    </div>
                    <table class="gy-table thead-Access">
                        <thead>
                            <tr>
                                <th style="width:157px;">交易模式</th>
                                <th style="width:138px;">交易品种</th>
                                <th style="width:108px;">交割方式</th>
                                <th style="width:84px;">交易周期</th>
                                <th style="width:80px;">参考准入评分</th>
                                <th style="width:138px;">参考交易限额(万元)</th>
                                <th style="width:138px;">确认交易限额(万元)</th>
                                <th style="width:90px;">操作</th>
                            </tr>
                        </thead>
                        <tbody class="tbody-Access">
                            <tr v-for="(items , index) in configList" :key="index" style="border-bottom: 1px solid #E7ECF1">
                                <td>
                                    <el-select v-model="items.rskTranscationTypeId" placeholder="请选择" @change="changeName(items, index)">
                                        <el-option
                                        v-for="item in transcationType"
                                        :key="item.id"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <input class="gy-input" v-model="items.transcationProductCategoryName" placeholder="请填写" @mouseleave="changeName(items, index)">
                                </td>
                                <td>
                                    <el-select v-model="items.paymentType" placeholder="请选择">
                                        <el-option
                                        v-for="item in paymentTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <el-select v-model="items.rskTranscationPeriodId" placeholder="请选择">
                                        <el-option
                                        v-for="item in transcationPeriods"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <span>{{items.referGoal}}</span>
                                </td>
                                <td class="limitList">
                                    <span>{{items.referTransactionLimit}}</span>
                                </td>
                                <td>
                                    <input class="limit gy-input" v-model="items.transcationLimit"  placeholder="请填写">
                                </td>
                                <td style="text-align: center">
                                    <button class="gy-button-view" @click.stop.prevent="deleteTableData(index)">删除</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="paddingLeftRight">
                        <div class="single-row">
                            <p class="gy-h4 remark">备注</p>
                            <textarea class="gy-textarea" v-model="info.remark" cols="35" rows="7" placeholder="请填写"></textarea>
                        </div>
                        <div class="single-row btn-wrap">
                            <button class="fr cancel gy-button-normal" @click="dialogVisible = false">取消</button>
                            <button class="fr gy-button-extra" @click.stop.prevent="submitFormValid(info)">保存</button>
                        </div>
                    </div>
                </div>
            </el-dialog>
            <!-- 新增 -->
            <el-dialog width="900px" class="settle-dialog settle-dialogs" title="新增交易对手"
                    @open="handleOpen" :visible.sync="addVisible">
                <div>
                    <div class="search-box" style="margin-bottom:10px">
                        <input type="search" v-model="parameters.keywords" placeholder="请输入公司名称">
                        <button @click="searchCompany" class="gy-button-extra"><i class="iconfont icon-search"></i></button>
                    </div>
                    <el-table
                        :data="companyList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        class="gy-table"
                        @selection-change="handleSelectionChangeCompany">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="counterpartyName"
                            label="公司名称">
                        </el-table-column>
                        <el-table-column
                            prop="counterpartyTypeName"
                            label="公司类型">
                        </el-table-column>
                        <el-table-column
                            prop="counterpartyAddress"
                            label="所属省市">
                        </el-table-column>
                    </el-table>
                    <div class="box">
                        <button class="gy-button-extra fr" @click="companyAdd">确定</button>
                    </div>
                    <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChangeSearch"
                    :current-page="pageNumSearch"
                    :total=totalSearch>
                    </el-pagination>
                </div>
            </el-dialog>
            <el-dialog width="900px"
                    :visible.sync="viewDialogVisible" title="评级信息">
                <div class="rating-information-elastic" style="overflow: hidden;min-height: 89px">
                    <div class="gy-form-group">
                        <span class="l">公司名称信息</span>
                        <span>{{preInfo.companyName}}</span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">评级信息</span>
                        <span>{{preInfo.rank}}</span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">最新评级日期</span>
                        <span>{{preInfo.latestRatingTime|date}}</span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">初评日期</span>
                        <span>{{preInfo.initialRatingTime|date}}</span>
                    </div>
                    <div class="gy-form-group single-row">
                        <span class="l">备注</span>
                        <span>{{preInfo.remarks}}</span>
                    </div>
                </div>
            </el-dialog>
            <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :total=total>
            </el-pagination>

        </div>
    </div>
</template>
<script>
export default {
    name: 'bussinessAcc-list',
    data () {
        return {
            total: 0,
            pageNum: 1,
            pageNumSearch: 1,
            totalSearch: 0,
            checkAllCompany: false, // 新增列表全选
            handleCheckAll: false, // 列表全选
            SelectedList: [],
            SelectedCompanyList: [],
            search: {
                data: {
                    keywords: ''
                },
                pageNum: 1,
                pageSize: 10
            },
            list: [],
            dialogVisible: false,
            addVisible: false,
            viewDialogVisible: false,
            accessOptions: [
                {
                    label: '不准入',
                    value: 0
                },
                {
                    label: '准入',
                    value: 1
                }
            ],
            info: {
                access: 0,
                counterpartyName: '',
                ratingInfo: null,
                companyGoalModel: null
            },
            preInfo: {},
            configList: [],
            transcationType: [],
            paymentTypeOptions: [
                {
                    label: '先款后货',
                    value: 0
                },
                {
                    label: '先货后款',
                    value: 1
                }
            ],
            transcationPeriods: [],
            keywords: '',
            addCompanins: {
                keywords: '',
                pageNum: 1,
                pageSize: 10
            },
            companyList: [],
            parameters: {
                pageNum: 1,
                pageSize: 10,
                keywords: ''
            },
            value1: null
        };
    },
    mounted () {
        // this.windList();
        this.windList();
    },
    methods: {
        windList () {
            this.$http.post(this.$api.wind.searchList, this.search).then((res) => {
                if (res.data.code === 0) {
                    this.list = res.data.data.list;
                    this.list.forEach(item => {
                        item.checkOut = false;
                    });
                    this.total = res.data.data.total;
                    this.pageNum = res.data.data.pageNum;
                }
            });
        },
        // 搜索
        searchs () {
            this.windList();
        },
        // 查看
        goView (item) {
            this.$http.get(this.$api.wind.myRating + item.counterpartyId).then((res) => {
                if (res.data.code === 0) {
                    this.preInfo = res.data.data.data;
                    if (this.preInfo.rank === null) {
                        this.$message('该公司尚无评级');
                        return false;
                    }
                    this.viewDialogVisible = true;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        // 删除
        deleteItem () {
            let that = this;
            if (that.SelectedList.length === 0) {
                that.$alert('请先选择交易对手', '提示');
                return;
            }
            this.list.forEach(item => {
                item.checkOut = false;
            });
            this.$confirm('您确认要删除吗？')
                .then(_ => {
                    that.$http.put(that.$api.wind.partiesDelete, that.SelectedList).then(res => {
                        if (res.data.code === 0) {
                            that.$message('删除成功', '提示');
                            that.SelectedList = [];
                            that.handleCheckAll = false;
                            that.windList();
                            return;
                        }
                        that.$alert(res.data.message, '出错了');
                    });
                }).catch(_ => {});
        },
        // 搜索
        searchCompany () {
            // this.parameters.keywords = this.keywords;
            this.addCompanyList();
        },
        // 新增
        addCompany () {
            this.addVisible = true;
            this.parameters.keywords = '';
            this.addCompanyList();
        },
        // 新增公司
        addCompanyList () {
            this.$http.post(this.$api.wind.addCompany, this.parameters)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.companyList = res.data.data.list;
                        this.companyList.forEach(item => {
                            item.checkOutCompany = false;
                        });
                        this.totalSearch = res.data.data.total;
                    }
                });
        },
        // 选择问题
        handleSelectionChange (rows) {
            if (rows.length !== 0) {
                this.SelectedList = [];
                rows.forEach(item => {
                    this.SelectedList.push(item.id);
                });
            } else {
                this.SelectedList = [];
            }
        },
        // 准入
        pass (item) {
            this.dialogVisible = true;
            this.getPassDetail(item);
        },
        // 获取准入信息
        getPassDetail (item) {
            let id = item.id;
            console.log(id, 'id');
            this.$http.get(this.$api.wind.counterpartiesDetail + id)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.info = res.data.data;
                        if (this.info.configList.length) {
                            this.configList = this.info.configList;
                        }
                        this.transcationPeriodsDetail();
                        this.transcationTypes();
                    } else {
                        this.$message(res.data.message);
                    }
                });
        },
        // 关闭回调
        handAdmittance () {
            this.configList = [];
            this.info.access = 0;
        },
        transcationPeriodsDetail () { // 获取交易周期
            this.transcationPeriods = [];
            this.$http.get(this.$api.wind.transcationPeriodsApi)
                .then((res) => {
                    if (res.data.code === 0) {
                        for (var i = 0; i < res.data.data.length; i++) {
                            let par = {};
                            par.label = res.data.data[i].period;
                            par.value = res.data.data[i].id;
                            this.transcationPeriods.push(par);
                        }
                    } else {
                        this.$message(res.data.message);
                    }
                });
        },
        transcationTypes () { // 获取交易模式
            this.transcationType = [];
            this.$http.get(this.$api.wind.transcationTypeApi)
                .then((res) => {
                    if (res.data.code === 0) {
                        for (var i = 0; i < res.data.data.length; i++) {
                            let par = {};
                            par.label = res.data.data[i].transactionType;
                            par.value = res.data.data[i].id;
                            this.transcationType.push(par);
                        }
                    } else {
                        this.$message(res.data.message);
                    }
                });
        },
        // 回调数据
        changeName (item, index) {
            this.alculateData(item, index);
        },
        // 授信积分参考准入限额
        alculateData (item, index) {
            let param = {
                companyId: this.info.companyGoalModel.companyId,
                businessType: item.rskTranscationTypeId,
                productInfo: item.transcationProductCategoryName
            };
            this.$http.post(this.$api.wind.alculate, param)
                .then(res => {
                    if (res.data.code === 0) {
                        let datas = res.data.data;
                        this.configList[index].referGoal = datas.referGoal;
                        this.configList[index].referTransactionLimit = datas.referTransactionLimit;
                    }
                });
        },
        handleOpen () {},
        // 查看详情
        viewDeatil (item) {
            this.$router.push({path: 'accessReplication', query: {companyId: item.companyGoalModel.companyId}});
        },
        // 列表分页
        handleCurrentChange (val) {
            this.search.data.keywords = '';
            this.pageNum = val;
            this.search.pageNum = this.pageNum;
            this.search.pageSize = 10;
            this.windList(this.search);
        },
        // 分页
        handleCurrentChangeSearch (val) {
            this.pageNumSearch = val;
            this.parameters.pageNum = this.pageNumSearch;
            this.parameters.pageSize = 10;
            this.addCompanyList();
        },
        // 添加
        addRow () {
            var list = {
                rskTranscationTypeId: 1,
                rskTranscationPeriodId: 1,
                paymentType: 0,
                transcationLimit: 1,
                transcationProductCategoryName: '',
                referGoal: null,
                referTransactionLimit: null
            };
            this.configList.push(list);
            return false;
        },
        // 删除
        deleteTableData (index) {
            this.configList.splice(index, 1);
        },
        // 新增公司全选
        handleSelectionChangeCompany (rows) {
            if (rows.length !== 0) {
                this.SelectedCompanyList = [];
                rows.forEach(item => {
                    this.SelectedCompanyList.push(item);
                });
            } else {
                this.SelectedCompanyList = [];
            }
        },
        // 确定
        companyAdd () {
            let that = this;
            if (that.SelectedCompanyList.length === 0) {
                that.$alert('请先选择交易对手', '提示');
                return;
            }
            that.$http.post(that.$api.wind.addParties, that.SelectedCompanyList)
                .then(res => {
                    if (res.data.code === 0) {
                        that.$message('添加成功');
                        this.SelectedCompanyList = [];
                        this.addCompanyList();
                        this.parameters.keywords = '';
                        this.windList();
                        this.addVisible = false;
                        return;
                    }
                    that.$alert(res.data.message, '出错了');
                });
        },
        // 保存
        submitFormValid (item) {
            console.log(item);
            var arr = this.configList;
            for (var index in arr) {
                var cc = arr[index];
                if (!cc.rskTranscationTypeId) {
                    this.$message({message: '请补全交易设置', type: 'error'});
                    return false;
                }
                if (!cc.rskTranscationPeriodId) {
                    this.$message({message: '请补全交易设置', type: 'error'});
                    return false;
                }
                if (cc.paymentType === 'undefined') {
                    this.$message({message: '请补全交易设置', type: 'error'});
                    return false;
                }
                if (cc.transcationProductCategoryName === '') {
                    this.$message({message: '交易品种不能为空', type: 'error'});
                    return false;
                }
                var reg = /^\d{1,7}$/;
                if (cc.transcationLimit === '') {
                    this.$message({message: '交易限额不能为空', type: 'error'});
                    return false;
                }
                if (!reg.test(cc.transcationLimit)) {
                    this.$message({message: '只能输入整数字，长度不能大于7位', type: 'error'});
                    return false;
                }
            }
            this.$http.post(this.$api.wind.access, {
                id: item.id,
                access: this.info.access,
                remark: this.info.remark,
                configList: this.configList
            }).then((res) => {
                if (res.data.code === 0) {
                    this.$message('操作成功');
                    this.dialogVisible = false;
                    this.windList();
                    this.infos = {};
                    this.configList = [];
                    this.rskTranscationPeriodId = null;
                    this.rskTranscationTypeId = null;
                    this.paymentType = null;
                } else {
                    this.$message(res.data.message);
                }
            });
        }

    }
};
</script>
<style scoped lang="scss">
    .bussinessAcc-list-main{
        .targetRouter{
            color: #4a90e2;
        }
        .bussinessAcc-list{
            .clear{
                clear: both;
            }
            padding:0 16px 32px 16px;
            background-color: #fff;
            .cursor{color:#4a90e2;cursor:pointer}
            .cursor:hover{text-decoration: underline}
            .select{
                margin-bottom:20px;
                overflow: hidden;
            }
            .sell .el-select{width:39%;bottom:5px}
            .sells .el-select{width: 102%;bottom: 5px;}
            .sell span.gy-h4{padding-left:0}
            .box{overflow: hidden;margin-top:10px;}
            .button-box{
                height:88px;
                margin-top:12px;
            }
            .gy-h4{
                margin: 11px 0 16px 0;
                font-size: 14px;
                color: #333;
                font-weight: bold;
            }
            .rating-information{
                margin: 11px 0 6px 0;
            }
            .business-Information{
                margin: 11px 0 6px 0;
            }
            .transaction-settings{
                margin: 11px 0 24px 0;
            }
            .l{
                padding-left: 0;
            }
            .gy-form-group{
                padding: 8px 30px 8px 138px;
            }
            .detail{
                background: #fff;
                color: #4a90e2;
                cursor: pointer;
            }
            .search-box {
                float:right;
                display: inline-block;
                width: 268px;
                border-bottom: 1px solid $color-border;
                input {
                    width: 208px;
                    height: 30px;
                    color: $color-light;
                    border: none;
                    float: left;
                }
                button {
                    display: inline-block;
                    width: 60px;
                    color: $color-main;
                    border: none;
                    background-color: #fff;
                    text-align: right;
                }
            }
            .admit{
                margin-top: 7px;
            }
            .cancel{
                margin-left: 8px;
            }
            .btn-wrap{
                margin-top: 32px;
            }
            .remark{
                margin: 32px 0 3px 0;
            }
            .paddingLeft{
                padding-left: 16px;
            }
            .paddingLeftRight{
                padding: 0 16px;
            }
            .added{
                margin-right: 3px;
            }
        }
        .new-title-public{
                line-height: 35px;
                padding: 0 16px;
                border-bottom: 1px solid #e6eaea;
                font-size: 16px;
                font-weight: 700;
                color: #333;
                margin-bottom: 16px;
        }
    }
</style>
<style lang="scss">
    .bussinessAcc-list{
        .thead-Access th{
            padding: 8px 0;
            border: none;
            line-height: 19px;
        }
        .thead-Access td{
            padding: 3px 0;
            border: none;
            line-height: 19px;
            input{
                font-size: 12px!important;
            }
        }
        .el-dialog{
            border-radius: 5px;
        }
        .el-dialog__body{
            padding: 32px 16px;
        }
        .limit.gy-input{
            width:88%;
            text-align: right;
        }
        .limitList{
            text-align: right;
            span{
                display: inline-block;
            }
        }
        .el-dialog__body{padding-top:0}
        .el-table{
            .el-table__header-wrapper{
                background-color: #EEF3F8;
                .el-table__header{
                    tr{
                        th{
                            text-align: center;
                            font-size: 12px;
                            font-weight: bold;
                            color: #666;
                        }
                    }
                }
            }
            .el-table__body-wrapper{
                .operation{
                    text-align: center;
                }
            }
            .cell{
                padding: 0;
            }
        }
        .el-select{
            .el-input{
                .el-input__inner{
                    font-size: 12px!important;
                }
            }
        }
        .single-row-whether{
            display: inline-block;
            margin-top: 16px;
            width: 100%;
        }
        .settle-dialog{
            .gy-form-group{
                min-height: 20px;
                line-height: 20px;
            }
        }
        .rating-information-elastic{
            .gy-form-group{
                min-height: 20px;
                line-height: 20px;
                padding: 8px 30px 8px 108px!important;
            }
        }
        .settle-dialogs{
            .gy-table{
                thead{
                    th{
                        padding: 5px 10px;
                    }
                }
                tbody{
                    td{
                        padding: 6px 10px;
                    }
                }
            }
        }
    }
</style>
