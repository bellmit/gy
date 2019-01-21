<!--交易对手list-->
<template>
    <div class="customer-list">
        <div class="select">
            <div class="search-box">
                <input type="search" v-model="parameter.data.keywords" placeholder="请输入公司名称">
                <button @click="search" class="gy-button-extra"><i class="iconfont icon-search"></i></button>
            </div>
        </div>
        <div class="fr" style="margin-bottom:10px">
            <button class="gy-button-extra" @click="add">新增</button>
            <button class="gy-button-normal" @click="deleteItem">删除</button>
        </div>
        <table class="gy-table">
            <thead>
            <tr>
                <th><input type="checkbox" :checked="SelectedList.length === list.length"
                           @change="handleCheckAllChange"></th>
                <th style="width:260px">公司信息</th>
                <th>公司类型</th>
                <th>交易模式</th>
                <th>交易品种</th>
                <th>交割方式</th>
                <th>交割周期</th>
                <th>交易限额(万元)</th>
                <!--<th>状态</th>-->
                <th style="width:80px">操作</th>
            </tr>
            </thead>
            <tr v-for="(item , index) in list" :key=index>
                <td><input type="checkbox" :checked="SelectedList.indexOf(item.id) >= 0"
                           @change="handleCheckChange(item.id)">
                </td>
                <td>
                    <span>{{item.counterpartyName}}</span><br/>
                    评级：{{item.ratingInfo? item.ratingInfo.finalRank : '-'}}<br/>
                    {{passOptions[item.access]}}<br/>
                </td>
                <td>
                    {{item.counterpartyTypeName}}
                </td>
                 <td>
                    <div v-if="item.configList.length" v-for="(items, ind) in item.configList" :key="ind">
                        <span> {{items.rskTranscationTypeName|| '-'}} </span>
                    </div>
                    <div v-else>
                        -
                    </div>
                </td>
                 <td>
                    <div v-if="item.configList.length" v-for="(items, ind) in item.configList" :key="ind">
                        <span> {{items.transcationProductCategoryName|| '-'}} </span>
                    </div>
                    <div v-else>
                        -
                    </div>
                </td>
                <td>
                    <div v-if="item.configList.length" v-for="(items, ind) in item.configList" :key="ind">
                        <span> {{items.paymentType ? '先货后款' : '先款后货'}} </span>
                    </div>
                </td>
                 <td>
                    <div v-if="item.configList" v-for="(items, ind) in item.configList" :key="ind">
                        <span> {{items.rskTranscationPeriodContent|| '-'}} </span>
                    </div>
                    <div v-else> -</div>
                </td>
                 <td>
                    <div v-if="item.configList.length" v-for="(items, ind) in item.configList" :key="ind">
                        <span> {{items.transcationLimit|| '-' }}</span>
                    </div>
                    <div v-else>
                            -
                    </div>
                </td>
                 <td>
                    <button class="gy-button-view" @click="goView(item)">评级信息</button>
                    <button class="gy-button-view" @click="approval(item)" v-if="item.approvalStatus === 0">申请查看</button>
                    <button class="gy-button-view" @click.stop="pass(item)">准入</button>
                </td>
            </tr>
        </table>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :total=total>
        </el-pagination>
        <el-dialog width="900px" class="settle-dialog" title="新增交易对手"
                   @open="handleOpen" :visible.sync="addVisible">
            <div>
                <div class="search-box" style="margin-bottom:10px">
                    <input type="search" v-model="keywords" placeholder="请输入公司名称">
                    <button @click="searchCompany" class="gy-button-extra"><i class="iconfont icon-search"></i></button>
                </div>
                <table class="gy-table">
                    <thead>
                        <tr>
                            <th><input type="checkbox"  :checked="SelectedCompanyList.length === companyList.length"
                                                          @change="handleCheckAllChangeCompany"></th>
                            <th style="width:300px">公司名称</th>
                            <th>公司类型</th>
                            <th>所属省市</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in companyList" :key="index">
                            <td><input type="checkbox" :checked="SelectedCompanyList.indexOf(item) >= 0"
                                       @change="handleCheckChangeCompany(item)"></td>
                            <td>{{item.counterpartyName}}</td>
                            <td>{{item.counterpartyTypeName}}</td>
                            <td>{{item.counterpartyAddress}}</td>
                        </tr>
                    </tbody>
                </table>
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
        <el-dialog width="900px" class="settle-dialog"
                   @open="handleOpen" :visible.sync="dialogVisible" title="准入设置">
            <div style="overflow: hidden">
            <!--<el-form :model="info" :rules="ruleForm" ref="form" size="mini" label-width="106px" class="demo-ruleForm">-->
               <div class="gy-form-group single-row sell">
                   <span class="gy-h4 l lc">是否准入</span>
                    <el-select v-model="info.access" placeholder="请选择">
                        <el-option
                          v-for="item in accessOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                     </el-select>
               </div>
                <div class="gy-h4"><i class="el-icon-tickets"></i> &nbsp;评级信息</div>
                <div class="gy-form-group">
                    <span class="l">公司名称</span>
                    <span >{{info.counterpartyName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">评级</span>
                    <span>{{info.ratingInfo? info.ratingInfo.finalRank: '-'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交易对手类别</span>
                    <span>{{info.counterpartyTypeName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">评级时间</span>
                    <span>{{info.ratingInfo&&info.ratingInfo.latestRatingTime| date }}</span>
                </div>
                <div class="button-box">
                    <div class="gy-h4"><i class="el-icon-tickets"></i> &nbsp;交易设置</div>
                        <button class="gy-button-normal fr" @click.stop.prevent="addRow">添加</button>
                </div>
                <table class="gy-table">
                    <thead>
                        <tr>
                            <th>交易模式</th>
                            <th>交易品种</th>
                            <th>交割方式</th>
                            <th>交易周期</th>
                            <th>交易限额（万元）</th>
                            <th style="width:97px">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(items , index) in configList" :key="index">
                            <td>
                                <el-select v-model="items.rskTranscationTypeId" placeholder="请选择">
                                    <el-option
                                      v-for="item in transcationType"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </td>
                            <td>
                                <input class="gy-input" v-model="items.transcationProductCategoryName" placeholder="请填写" prop="transcationProductCategoryName">
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
                                      v-for="item in transcationPeriod"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </td>
                            <td>
                                <input class="limit gy-input" v-model="items.transcationLimit"  placeholder="请填写">
                            </td>
                            <td>
                                <!--<button class="gy-button-normal" @click.stop="deleteTableData(index)">删除</button>-->
                                <button class="gy-button-normal" v-if="configList.length>1" @click.stop.prevent="deleteTableData(index)">删除</button>
                                <span v-else>-</span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="gy-form-group single-row">
                    <span class="l">备注</span>
                    <span><textarea class="gy-textarea" v-model="info.remark"  cols="30" rows="3" placeholder="请填写"></textarea></span>
                </div>
                <div class="gy-form-group single-row btn-wrap">
                    <button class="fr gy-button-extra" @click.stop.prevent="submitFormValid(info)">保存</button>
                </div>
                <!--</el-form>-->
            </div>
        </el-dialog>
        <el-dialog width="900px"
                   :visible.sync="viewDialogVisible" title="评级信息">
            <div style="overflow: hidden;min-height: 89px">
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
    </div>
</template>
<script>
export default {
    name: 'customer-list',
    data () {
        return {
            total: 0,
            pageNum: 1,
            pageNumSearch: 3,
            totalSearch: 1,
            checkAll: false,
            dialogVisible: false,
            addVisible: false,
            viewDialogVisible: false,
            preInfo: {},
            keywords: '',
            SelectedList: [],
            SelectedCompanyList: [],
            companyId: JSON.parse(localStorage.getItem('userInfoClient')).companyId,
            parameter: {
                pageNum: 1,
                pageSize: 10,
                data: {
                    keywords: ''
                }
            },
            parameters: {
                pageNum: 1,
                pageSize: 10,
                keywords: ''
            },
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
            // options: ['', '交易公司', '承运商', '仓储商'],
            passOptions: ['不准入', '准入'],
            approvalStatusOptions: ['未申请', '待审核', '已审核'],
            transcationPeriod: [],
            transcationType: [],
            info: {
                access: 0
            },
            infos: {
                transcationLimit: null,
                transcationProductCategoryName: ''
            },
            rskTranscationPeriodId: null,
            rskTranscationTypeId: null,
            paymentType: null,
            itemList: [],
            companyList: [],
            col: 1,
            configList: [{
                rskTranscationTypeId: 1,
                transcationLimit: 1,
                transcationProductCategoryName: '醇类',
                paymentType: 0,
                rskTranscationPeriodId: 1
            }],
            list: [],
            addList: {
                rskTranscationTypeId: 1,
                rskTranscationPeriodId: 1,
                paymentType: 0,
                transcationLimit: 1,
                transcationProductCategoryName: '醇类'
            }
        };
    },
    created () {
        this.getInfo();
    },
    methods: {
        deleteTableData (index) {
            this.configList.splice(index, 1);
        },
        addRow () {
            var list = {
                rskTranscationTypeId: 1,
                rskTranscationPeriodId: 1,
                paymentType: 0,
                transcationLimit: 1,
                transcationProductCategoryName: ''
            };
            this.configList.push(list);
            return false;
        },
        pass (item) { // 准入按钮
            this.dialogVisible = true;
            this.infos = {};
            this.itemList = [];
            this.rskTranscationPeriodId = null;
            this.rskTranscationTypeId = null;
            this.paymentType = null;
            this.configList.length = 0;
            this.addRow();
            // this.configList.push(this.addList);
            // this.configList[0] = {
            //     rskTranscationTypeId: 1,
            //     rskTranscationPeriodId: 1,
            //     paymentType: 0,
            //     transcationLimit: 1,
            //     transcationProductCategoryName: '醇类'
            // };
            this.$http.get(this.$api.customer.counterpartiesDetail + item.id).then((res) => {
                if (res.data.code === 0) {
                    this.info = res.data.data;
                    if (this.info.configList.length) {
                        this.configList = this.info.configList;
                    }
                } else {
                    this.$message(res.data.message);
                }
            });
            this.transcationPeriods();
            this.transcationTypes();
        },
        handleCheckChange (id) {
            let idx = this.SelectedList.indexOf(id);
            idx >= 0 ? this.SelectedList.splice(idx, 1) : this.SelectedList.push(id);
        },
        handleCheckAllChange () {
            this.checkAll = !this.checkAll;
            if (this.checkAll) {
                this.SelectedList = [];
                this.list.forEach(item => {
                    this.SelectedList.push(item.id);
                }, this);
                return;
            }
            this.SelectedList = [];
        },
        handleCheckChangeCompany (item) {
            let idx = this.SelectedCompanyList.indexOf(item);
            idx >= 0 ? this.SelectedCompanyList.splice(idx, 1) : this.SelectedCompanyList.push(item);
        },
        handleCheckAllChangeCompany () {
            this.checkAll = !this.checkAll;
            if (this.checkAll) {
                this.SelectedCompanyList = [];
                this.companyList.forEach(item => {
                    this.SelectedCompanyList.push(item);
                }, this);
                return;
            }
            this.SelectedCompanyList = [];
        },

        transcationPeriods () { // 获取交易周期
            this.transcationPeriod = [];
            this.$http.get(this.$api.customer.transcationPeriods).then((res) => {
                if (res.data.code === 0) {
                    for (var i = 0; i < res.data.data.length; i++) {
                        let par = {};
                        par.label = res.data.data[i].period;
                        par.value = res.data.data[i].id;
                        this.transcationPeriod.push(par);
                    }
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        transcationTypes () { // 获取交易模式
            this.transcationType = [];
            this.$http.get(this.$api.customer.transcationType).then((res) => {
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
        deleteItem () { // 删除
            let that = this;
            if (that.SelectedList.length === 0) {
                that.$alert('请先选择交易对手', '提示');
                return;
            }
            this.$confirm('您确认要删除吗？')
                .then(_ => {
                    that.$http.put(that.$api.customer.partiesDelete, that.SelectedList)
                        .then(res => {
                            if (res.data.code === 0) {
                                that.$message('删除成功', '提示');
                                that.SelectedList = [];
                                that.getInfo();
                                return;
                            }
                            that.$alert(res.data.message, '出错了');
                        });
                }).catch(_ => {});
        },
        getInfo () { // 获取
            this.$http.post(this.$api.customer.counterParties, this.parameter).then((res) => {
                if (res.data.code === 0) {
                    this.list = res.data.data.list;
                    this.pageNum = res.data.data.pageNum;
                    this.total = res.data.data.total;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        search () {
            this.getInfo();
        },
        submitFormValid (item) {
            var arr = this.configList;
            for (var index in arr) {
                var cc = arr[index];
                console.log(cc.rskTranscationTypeId, cc.rskTranscationPeriodId, cc.paymentType);
                if (!cc.rskTranscationTypeId) {
                    this.$alert('请补全交易设置');
                    return false;
                }
                if (!cc.rskTranscationPeriodId) {
                    this.$alert('请补全交易设置');
                    return false;
                }
                if (cc.paymentType === 'undefined') {
                    this.$alert('请补全交易设置');
                    return false;
                }
                if (cc.transcationProductCategoryName === '') {
                    this.$alert('交易品种不能为空');
                    return false;
                }
                var reg = /^\d{1,7}$/;
                if (!reg.test(cc.transcationLimit)) {
                    this.$alert('交易限额不能为空，且只能输入数字，长度不能大于7位');
                    return false;
                }
            }
            this.$http.post(this.$api.customer.access, {
                id: item.id,
                access: this.info.access,
                remark: this.info.remark,
                configList: this.configList
            }).then((res) => {
                if (res.data.code === 0) {
                    this.$message('操作成功');
                    this.dialogVisible = false;
                    this.getInfo();
                    this.infos = {};
                } else {
                    this.$message(res.data.message);
                }
                this.configList.length = 0;
                this.rskTranscationPeriodId = null;
                this.rskTranscationTypeId = null;
                this.paymentType = null;
            });
        },
        goView (item) {
            if (item.approvalStatus === 2) {
                this.$http.get(this.$api.customer.myRating + item.counterpartyId).then((res) => {
                    if (res.data.code === 0) {
                        this.preInfo = res.data.data;
                        if (this.preInfo.rank === null) {
                            this.$message('该公司尚无评级');
                            return false;
                        }
                        this.viewDialogVisible = true;
                    } else {
                        this.$message(res.data.message);
                    }
                });
            } else {
                this.$message('你目前还无权查看');
            }
        },
        handleOpen () {
            // 获取弹窗日期
        },
        approval (item) { // 申请查看交易对手
            this.$http.put(this.$api.customer.counterparties, {
                id: item.id
            }).then((res) => {
                if (res.data.code === 0) {
                    this.$message('您的申请已提交，请等待审核');
                    this.getInfo();
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        searchCompany () {
            this.parameters.keywords = this.keywords;
            this.companiesList();
        },
        add () { // 添加按钮
            this.addVisible = true;
            this.parameters.keywords = '';
            this.companiesList();
        },
        companiesList () { // 查看公司列表
            this.$http.post(this.$api.customer.companiesList, this.parameters).then((res) => {
                if (res.data.code === 0) {
                    this.companyList = res.data.data.list;
                    this.pageNumSearch = res.data.data.pageNum;
                    this.totalSearch = res.data.data.total;
                    this.keywords = '';
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        companyAdd () {
            let that = this;
            if (that.SelectedCompanyList.length === 0) {
                that.$alert('请先选择交易对手', '提示');
                return;
            }
            that.$http.post(that.$api.customer.addParties, that.SelectedCompanyList)
                .then(res => {
                    if (res.data.code === 0) {
                        that.$message('添加成功');
                        this.SelectedCompanyList = [];
                        this.companiesList();
                        this.parameters.keywords = '';
                        this.getInfo();
                        this.addVisible = false;
                        return;
                    }
                    that.$alert(res.data.message, '出错了');
                });
        },
        handleCurrentChange (val) { // 分页
            this.pageNum = val;
            this.parameter.pageNum = this.pageNum;
            this.parameter.pageSize = 10;
            this.getInfo(this.parameter);
        },
        handleCurrentChangeSearch (val) { // 分页
            this.pageNum = val;
            this.parameters.pageNum = this.pageNum;
            this.parameters.pageSize = 10;
            this.companiesList();
        }
    }
};
</script>
<style scoped lang="scss">
    .customer-list{
        padding:20px 20px;
        background-color: #fff;
        .cursor{color:#4a90e2;cursor:pointer}
        .cursor:hover{text-decoration: underline}
        .select{
            margin-bottom:20px;
            overflow: hidden;
        }
        .sell .el-select{width:110px;bottom:5px}
        .sell span.gy-h4{padding-left:0}
        .box{overflow: hidden;margin-top:10px;}
        .button-box{
            height:90px;
            margin-top:20px;
            .gy-h4{display: inline-block}
            button{margin-bottom:10px}
        }
        .gy-form-group{
            line-height: 15px;
            padding: 10px 0px 0px 108px;
            min-height: 40px;
            .l{left:0}
            .lc{top:8px}
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
    }
    .limit.gy-input{width:88%;}
   .el-dialog__body{padding-top:0}
</style>
