<!--核准与评级list-->
<template>
    <div class="customer-list">
        <div class="select">
            <ul>
                <li :class="{ active: newIndex==2 }" @click="toggleTabs(2)">待处理({{number.unpendCount}})</li>
                <li :class="{ active: newIndex==1 }" @click="toggleTabs(1)">已处理({{number.pendCount}})</li>
            </ul>
            <div class="search-box">
                <input type="search" v-model="parameter.data.companyName" placeholder="请输入客户名称">
                <button @click="search" class="gy-button-extra"><i class="iconfont icon-search"></i></button>
            </div>
        </div>
        <table class="gy-table">
            <tr>
                <th>客户名称</th>
                <th>客户类型</th>
                <th>最新评级</th>
                <th>申请时间</th>
                <th>最新评级时间</th>
                <th>状态</th>
                <th>是否复议</th>
                <th>操作</th>
            </tr>
            <tr v-for="(item , index) in list" :key=index>
                <td>{{item.companyName}}</td>
                <td>{{item.companyTypeName}}</td>
                <td>{{item.rankName?item.rankName:'-'}}</td>
                <td>{{item.createdDate| date('h')}}</td>
                <td>{{item.lastRatingDate| date('h')}}</td>
                <td>
                    {{item.approvalStatus === 10 ? '已完成': item.workflowName}}
                </td>
                <td>{{item.isReevaluationRequest ? '是': '否'}}</td>
                <td>
                    <button class="gy-button-view" @click="goDetail(item)" v-if="newIndex!=2 ">查看</button>
                    <template v-if="newIndex===2">
                        <template v-if="item.approvalStatus <= 1">
                            <button class="gy-button-view" @click="approval(item)">核准</button>
                            <button class="gy-button-view" @click="grade(item)" v-if="item.approvalStatus != 0">评级</button>
                        </template>
                        <template v-if="item.approvalStatus>=2 && item.approvalStatus <= 3">
                            <button class="gy-button-view" @click="goDetail(item)" v-if="role">查看</button>
                            <button class="gy-button-view" @click="grade(item)">审核</button>
                            <button class="gy-button-view" @click="goBack(item)" v-if="role">回退</button>
                        </template>
                    </template>
                </td>
            </tr>
        </table>
        <div class="total">共{{total}}条记录</div>
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :total=total>
        </el-pagination>
        <el-dialog width="870px" class="settle-dialog" title="评级"
                   :visible.sync="dialogVisible">
            <div style="overflow: hidden;" v-if="status >=2">
                <div class="gy-h4"><i class="el-icon-tickets"></i>&nbsp;上一环节评级</div>
                <div class="gy-form-group">
                    <span class="l">大类</span>
                    <span>{{preInfo.primaryName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">基础评级</span>
                    <span>{{preInfo.baseRatingName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">小类</span>
                    <span>{{preInfo.secondaryName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">评级范围</span>
                    <span>{{preInfo.ratingScale || '-'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">评级人</span>
                    <span>{{preInfo.approverName}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">评级</span>
                    <span>{{preInfo.ratingName|| '-'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">评级日期</span>
                    <span>{{preInfo.updatedDate && preInfo.updatedDate|date}}</span>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l">上一级备注</span>
                    <span>{{preInfo.remark|| '-'}}</span>
                </div>
            </div>
            <div style="overflow: hidden;" v-if="preInfo.rejectName">
                <div class="gy-h4"><i class="el-icon-tickets"></i>&nbsp;回退</div>
                <div class="gy-form-group">
                    <span class="l">回退人</span>
                    <span>{{preInfo.rejectName || '-'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">时间</span>
                    <span>{{preInfo.rejectDate|date}}</span>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l">原因</span>
                    <span>{{preInfo.rejectReason || '-'}}</span>
                </div>
            </div>
            <div style="overflow: hidden;">
                <div v-if="status===1">
                <div class="gy-h4"><i class="el-icon-tickets"></i>&nbsp;当前评级</div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>大类</span>
                    <el-select v-model="form.primaryCategoryId" placeholder="请选择" @change="getChild">
                        <el-option
                          v-for="item in parentOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>小类</span>
                    <el-select v-model="form.secondaryCategoryId" placeholder="请选择" @change="getRatingType">
                        <el-option
                          v-for="item in childOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>评级范围</span>
                    <span >{{form.rank ? form.rank : '-' }}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>基础评级</span>
                    <el-select v-model="baseRatingId" placeholder="请选择">
                        <el-option
                          v-for="item in baseRatingOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>评级</span>
                    <el-select v-model="ratingId" placeholder="请选择">
                        <el-option
                          v-for="item in ratingOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                </div>
               <div class="gy-form-group single-row"></div>
                <div class="gy-form-group single-row mr">
                    <span class="l"><strong> </strong>备注</span>
                    <textarea class="gy-textarea"  v-model="form.remark" cols="30" rows="10" placeholder="请填写"></textarea>
                </div>
            </div>
            <div style="overflow: hidden">
                <div class="gy-form-group single-row mark" >
                    <span v-if="status===1"><span class="tips l">注：</span>风控经理审批后，将移交风控总监审批。</span>
                    <span v-if="status===2"><span class="tips l">注：</span>风控总监审批后，将移交风控总经理审批，风控总经理审批后生效</span>
                </div>
                <div class="gy-form-group single-row btn-wrap mr">
                    <button class="gy-button-extra m-l" @click="submit">
                        <template v-if="status<=1"> 确定</template>
                        <template v-else-if="status==2"> 同意</template>
                        <template v-else-if="status==3"> 同意</template>
                    </button>
                    <button class="gy-button-normal m-r" @click="cannel"  v-if="status<=1">取消</button>
                </div>
            </div>
        </el-dialog>
        <el-dialog width="627px" class="settle-dialog"
                   :visible.sync="dialogVisibleBack" title="回退">
            <div style="overflow: hidden;margin-top:20px">
                <div class="gy-form-group single-row">
                    <span class="l">回退原因</span>
                    <input type="text" v-model="backMark" placeholder="请输入">
                </div>
                <div class="gy-form-group single-row btn-wrap">
                    <button class="gy-button-extra" @click="rejectSubmit">确定</button>
                    <button class="gy-button-normal m-r" @click="dialogVisibleBack=false">取消</button>
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
            dialogVisible: false, // 弹窗
            dialogVisibleBack: false, // 回退
            total: 5,
            newIndex: 2,
            pageNum: 1,
            keywords: '',
            number: {},
            status: null,
            form: {
                primaryCategoryId: '',
                secondaryCategoryId: '',
                remark: '',
                ratingId: '',
                baseRatingId: ''
            },
            ratingId: '',
            baseRatingId: '',
            parameter: {
                pageNum: 1,
                data: {
                    currentUserId: JSON.parse(localStorage.getItem('userInfo')).id,
                    // currentUserId: 18092,
                    companyName: '',
                    isPending: 3
                }
            },
            companyName: '',
            preInfo: {},
            ratingTypeInfo: {},
            parentOptions: [],
            childOptions: [],
            baseRatingOptions: [],
            ratingOptions: [],
            options: [],
            value: '',
            list: [],
            role: false,
            backMark: '',
            itemDate: {}
        };
    },
    created () {
        this.getRole();
    },
    methods: {
        goBack (item) {
            this.dialogVisibleBack = true;
            this.itemDate = item;
        },
        goDetail (item) {
            this.$router.push({name: 'approvalView', params: {rskRatingTaskId: item.id}, query: {ratingCompanyId: item.ratingCompanyId}});
        },
        getRole () { // 根据ID获取权限 控制查看按钮
            this.$http.get(this.$api.customer.role + this.parameter.data.currentUserId).then((res) => {
                if (res.data.code === 0) {
                    if (res.data.data.indexOf('riskControlDirector') > -1) {
                        this.role = true;
                    }
                    if (res.data.data.indexOf('riskControlGeneralManager') > -1) {
                        this.role = true;
                    }
                    this.getInfo();
                    this.getNubmer();
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        toggleTabs (index) { // 状态筛选
            this.newIndex = index; //
            this.parameter.data.isPending = this.newIndex + 1;
            this.getInfo();
        },
        getInfo () { // 获取列表
            this.$http.post(this.$api.customer.managerList, this.parameter).then((res) => {
                if (res.data.code === 0) {
                    this.list = res.data.data.list;
                    this.total = res.data.data.total;
                    this.pageNum = res.data.data.pageNum;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        handleCurrentChange (val) { // 分页
            this.pageNum = val;
            this.parameter.pageNum = this.pageNum;
            this.parameter.pageSize = 10;
            this.getInfo();
        },
        getNubmer () { // 获取待处理数量
            this.$http.post(this.$api.customer.askByRoleCount, {
                currentUserId: this.parameter.data.currentUserId,
                companyName: this.companyName
            }).then((res) => {
                if (res.data.code === 0) {
                    this.number = res.data.data;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        search () {
            let that = this;
            that.getInfo();
            this.getNubmer();
        },
        // TODO 进入核准信息页面
        approval (item) {
            console.log(item);
            this.$router.push({name: 'approvalInfo', params: {applyCompanyId: item.applyCompanyId}, query: {ratingCompanyId: item.ratingCompanyId}});
        },
        grade (item) { // 评级按钮
            this.form = {};
            this.dialogVisible = true;
            this.getParent(item);
            this.status = item.approvalStatus;
            this.form.rskRatingTaskId = item.id;
            // if (this.status < 2) {
            //     return;
            // }
            this.$http.get(this.$api.customer.preRecord + item.id).then((res) => {
                if (res.data.code === 0) {
                    this.preInfo = res.data.data;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        getParent () { // 大类
            this.parentOptions = [];
            this.$http.get(this.$api.customer.parent).then((res) => {
                if (res.data.code === 0) {
                    for (var i = 0; i < res.data.data.length; i++) {
                        let par = {};
                        par.label = res.data.data[i].categoryName;
                        par.value = res.data.data[i].id;
                        this.parentOptions.push(par);
                    }
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        getChild () { // 小类
            this.childOptions = [];
            this.$http.get(this.$api.customer.Child + this.form.primaryCategoryId).then((res) => {
                if (res.data.code === 0) {
                    for (var i = 0; i < res.data.data.length; i++) {
                        let par = {};
                        par.label = res.data.data[i].categoryName;
                        par.value = res.data.data[i].id;
                        this.childOptions.push(par);
                    }
                    this.form.secondaryCategoryId = null;
                    this.form.rank = '-';
                    this.ratingId = null;
                    this.baseRatingId = null;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        getRatingType () { // 获取评级类型及范围
            this.baseRatingOptions = [];
            this.ratingOptions = [];
            this.$http.post(this.$api.customer.ratingType, {
                childCompanyCategoryId: this.form.secondaryCategoryId,
                parentCompanyCategoryId: this.form.primaryCategoryId
            }).then((res) => {
                if (res.data.code === 0) {
                    this.ratingTypeInfo = res.data.data;
                    this.form.basicRank = res.data.data.id;
                    this.form.ratingScale = res.data.data.ratingScale;
                    this.form.rank = res.data.data.rank;
                    for (let i = 0; i < res.data.data.basicRankList.length; i++) {
                        let par = {};
                        par.label = res.data.data.basicRankList[i].basicRank;
                        par.value = res.data.data.basicRankList[i].id;
                        this.baseRatingOptions.push(par);
                    }
                    for (let i = 0; i < res.data.data.lastRating.length; i++) {
                        let par = {};
                        par.label = res.data.data.lastRating[i].rank;
                        par.value = res.data.data.lastRating[i].id;
                        this.ratingOptions.push(par);
                    }
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        rejectSubmit () { // 驳回确定
            this.$http.post(this.$api.customer.reject, {
                rejectReason: this.backMark,
                currentUserId: this.parameter.data.currentUserId,
                ratingTaskId: this.itemDate.id
            }).then((res) => {
                if (res.data.code === 0) {
                    this.$message('操作成功');
                    this.dialogVisibleBack = false;
                    this.getInfo();
                    this.getNubmer();
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        submit () { // 风控经理初审评级提交
            if (!this.role) {
                if (!this.form.secondaryCategoryId || !this.form.secondaryCategoryId || !this.baseRatingId || !this.ratingId) {
                    this.$alert('带红色*的都是必填项，请填写');
                    return false;
                }
            }
            this.form.approverId = this.parameter.data.currentUserId;
            this.form.ratingId = this.ratingId;
            this.form.baseRatingId = this.baseRatingId;
            this.$http.post(this.$api.customer.save, this.form).then((res) => {
                if (res.data.code === 0) {
                    this.$message('操作成功');
                    this.dialogVisible = false;
                    this.getInfo();
                    this.getNubmer();
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        cannel () {
            this.dialogVisible = false;
        }
    }
};
</script>
<style lang="scss" scoped>
    .settle-dialog .el-dialog__body{padding-top:0;}
    .gy-form-group{
        padding: 2px 40px 1px 99px;
    }
    .gy-form-group .l strong{
        left:14px;
        top:5px;
    }
    .gy-h4{
        padding: 10px 0 0;
    }
    .mr{text-align: right;}
    .container-fluid .el-dialog__headerbtn{
        top: 13px;
    }
</style>
