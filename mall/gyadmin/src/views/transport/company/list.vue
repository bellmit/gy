<template>
    <div class="page memberList">
        <div class="m-panel">
            <div class="selected">
                <div class="gy-h4">物流公司</div>
                <div class="fr">
                    <div class="search-box">
                        <input type="search" v-model="inputName" placeholder="请输入企业名称">
                        <button @click="searchGood"><i class="iconfont icon-search"></i></button>
                    </div>
                    <span class="search-btn" @click="toggleSelect =!toggleSelect">高级搜索<i
                            class="iconfont icon-arrow-down"></i></span>
                </div>
            </div>
            <div class="gy-form-box-14" v-show="toggleSelect">
                <div class="gy-form-group">
                    <span class="l">认证申请人</span>
                    <span><input v-model="username" placeholder="请输入内容" class="gy-input"></span>
                </div>
                <div class="gy-form-group">
                    <span class="l">企业认证状态</span>
                    <span>
            <el-select v-model="authStatus" placeholder="企业认证状态">
                        <el-option
                                v-for="item in authStatusList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
            </el-select>
          </span>
                </div>
                <div class="gy-form-group cl">
                    <span class="l">CA认证状态</span>
                    <span>
              <el-select v-model="caAuthStatus" placeholder="CA认证状态">
                <el-option
                        v-for="item in caAuthStatusList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
              </el-select>
          </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">银行认证状态</span>
                    <span>
           <el-select v-model="bankAuthStatus" placeholder="银行认证状态">
              <el-option
                      v-for="item in bankAuthStatusList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
              </el-option>
            </el-select>
          </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">启用状态</span>
                    <el-select v-model="valid" placeholder="启用状态">
                        <el-option
                                v-for="item in validList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <i class="iconfont icon-search" @click="searchGood"></i>
                <div class="clear"></div>
            </div>
            <div class="btns-wrapper">
                <!--<router-link :to="{ name: 'sysRoleManage',}"><button class="gy-button-normal">添加</button></router-link>&nbsp;-->
                <button class="gy-button-extra" @click="editAll" v-if="isAuth('logistics:company:edit')">编辑</button>
                <button class="gy-button-normal" @click="verifyAll" v-if="isAuth('logistics:company:audit')">审核</button>
                <button class="gy-button-normal" @click="deleteAll" v-if="isAuth('logistics:company:batch_stop')">停用</button>
                <button class="gy-button-normal" @click="startAll" v-if="isAuth('logistics:company:batch_start')">启用</button>
            </div>
            <table class="gy-table">
                <thead>
                <tr>
                    <th>
                        <label class="u-checkbox">
                            <input type="checkbox" v-model="checkedAll" @click.stop="changeState">
                            <span>#</span>
                        </label>
                    </th>
                    <th>企业名称</th>
                    <th>认证申请人</th>
                    <th>企业类型</th>
                    <th>企业认证状态</th>
                    <th>CA认证状态</th>
                    <th>银行认证状态</th>
                    <th>审核日期</th>
                    <th>电话号码</th>
                    <th>启用状态</th>
                    <!--<th>操作</th>-->
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in list" :key="index" @dblclick='$tools.dbCheckItem(item, checkModel)'>
                    <td>
                        <label class="u-checkbox">
                            <input type="checkbox" v-model="checkModel" :value="item.id">
                            <span></span>
                        </label>
                        {{item.id}}
                    </td>
                    <td>{{item.name}}</td>
                    <td>{{item.username}}</td>
                    <td>{{item.companyTypeName}}</td>
                    <td>
                        <span :style="colors[item.authStatus]">{{item.authStatus | authStatus}}</span>
                    </td>
                    <td>
                        <span :style="colors[item.caAuthStatus]">{{item.caAuthStatus | authStatus}}</span>
                    </td>
                    <td>
                        <span :style="colors[item.bankAuthStatus]">{{item.bankAuthStatus | authStatus}}</span>
                    </td>
                    <td>{{item.authDate | date(true)}}</td>
                    <td>{{item.phone}}</td>
                    <td>
                        <span v-if="item.valid === 0">停用</span>
                        <span v-if="item.valid === 1">启用</span>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="pagination-wrapper">
                <div class="pagination-total">共 {{total}} 条</div>
                <!-- 翻页 -->
                <el-pagination
                        background
                        :page-size="pageSize"
                        :pager-count="pageCount"
                        :total="total"
                        :current-page.sync="currentPage"
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
            authStatusList: [{id: null, name: '全部'}, {id: 1, name: '待审核'}, {id: 2, name: '已通过'}, {id: 3, name: '已驳回'}],
            caAuthStatusList: [{id: null, name: '全部'}, {id: 0, name: '未认证'}, {id: 1, name: '待审核'}, {
                id: 2,
                name: '已通过'
            }, {id: 3, name: '已驳回'}],
            bankAuthStatusList: [{id: null, name: '全部'}, {id: 0, name: '未认证'}, {id: 1, name: '待审核'}, {
                id: 2,
                name: '已通过'
            }, {id: 3, name: '已驳回'}],
            validList: [{id: null, name: '全部'}, {id: 0, name: '停用'}, {id: 1, name: '启用'}],
            typeOptions: ['', '贸易商', '物流商', '仓储商'],
            pageSize: 10,
            pageCount: 5,
            total: 0,
            currentPage: 1,
            searchName: '',
            inputName: '',
            list: [],
            toggleSelect: false,
            checkedAll: false,
            checkModel: [],
            authStatus: null,
            bankAuthStatus: null,
            caAuthStatus: null,
            username: '',
            searchAuthStatus: null,
            searchCaAuthStatus: null,
            searchBankAuthStatus: null,
            searchUserName: '',
            searchValid: null,
            valid: null,
            companyTypeName: '',
            companyTypeList: [],
            companyType: '',
            dataObj: {
                companyIdList: []
            },
            colors: {
                0: 'color: #909399!important', // 未认证
                1: 'color: #e6a23c!important', // 待审核
                2: 'color: #409eff!important', // 已通过
                3: 'color: #f56c6c!important' // 已驳回
            }
        };
    },
    watch: {
        checkModel: {
            handler () {
                this.checkedAll = this.checkModel.length === this.list.length;
            },
            deep: true
        }
    },
    methods: {
        getCompanyType () {
            this.$http.get(this.$api.memberCompany.companyType)
                .then((res) => {
                    this.companyTypeList = res.data.data;
                });
        },
        goNewPage (url, id) {
            let routeUrl = this.$router.resolve({
                path: url,
                query: {id}
            });
            window.open(routeUrl.href, '_blank');
        },
        editAll () {
            if (this.checkModel.length !== 1) {
                this.$message.error('不能多选且只能选择一个编辑项！');
            } else {
                this.goNewPage('/transport/company/edit', this.checkModel[0].toString());
            }
        },
        getList (currentPage) {
            if (!this.isAuth('logistics:company:list')) return;
            let setPara = {
                'companyCategory': 2, // 公司类别 （1：交易类型的公司   2：物流类型公司   3：仓储类型公司 ）
                'pageNum': currentPage,
                'pageSize': this.pageSize,
                'name': this.searchName,
                'username': this.searchUserName,
                'authStatus': this.searchAuthStatus,
                'caAuthStatus': this.searchCaAuthStatus,
                'bankAuthStatus': this.searchBankAuthStatus,
                'valid': this.searchValid,
                companyTypeId: this.companyType
            };
            this.$http.post(this.$api.memberCompany.list, setPara).then((res) => {
                if (res.data.code === 0) {
                    this.list = res.data.data.list;
                    this.list.forEach(item => {
                        item['flag'] = false;
                    });
                    // 设置分页信息
                    this.total = res.data.data.total;
                    this.currentPage = res.data.data.pageNum;
                    // 设置check
                    this.cancelCheck();
                }
            }).catch((e) => {
                console.log(e);
            });
        },
        turnPage (currentPage) {
            this.getList(currentPage);
        },
        searchGood () {
            this.searchName = this.inputName;
            this.searchAuthStatus = this.authStatus;
            this.searchCaAuthStatus = this.caAuthStatus;
            this.searchBankAuthStatus = this.bankAuthStatus;
            this.searchUserName = this.username;
            this.searchValid = this.valid;
            this.getList(1);
        },
        deleteGood (id) {
            this.$confirm('<span><i class="iconfont icon-message-error"></i>此操作将永久删除, 是否继续?</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                this.$http.put(this.$api.memberCompany.delete + id).then((data) => {
                    if (data.data.code === 0) {
                        this.$message.success('删除成功!');
                        this.getList(1);
                    }
                });
            }).catch(() => {
            });
        },
        deleteAll () {
            if (this.checkModel.length < 1) {
                this.$message.error('请选择操作项！');
                return;
            }
            this.checkModel.forEach((obj) => {
                this.dataObj.companyIdList.push(obj.id);
            });
            this.$confirm('<span><i class="iconfont icon-message-error"></i>此操作将停用, 是否继续?</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                this.$http({
                    url: this.$api.memberCompany.companyStop,
                    method: 'put',
                    data: this.dataObj
                }).then(({data}) => {
                    if (data.code === 0) {
                        this.getList(1);
                        this.$message.success('操作成功!');
                        this.dataObj.companyIdList.length = 0;
                    }
                }).catch((e) => {
                });
            }).catch(() => {
            });
        },
        startAll () {
            if (this.checkModel.length < 1) {
                this.$message.error('请选择操作项！');
                return;
            }
            this.checkModel.forEach((obj) => {
                this.dataObj.companyIdList.push(obj.id);
            });
            this.$http({
                url: this.$api.memberCompany.companyStart,
                method: 'put',
                data: this.dataObj
            }).then(({data}) => {
                if (data.code === 0) {
                    this.getList(1);
                    this.dataObj.companyIdList.length = 0;
                    this.$message.success('操作成功!');
                }
            }).catch((e) => {
            });
        },
        verifyAll () {
            if (this.checkModel.length !== 1) {
                this.$message.error('只能选择一个审核项！');
            } else {
                this.goNewPage(`/index/member/company/view?valueList=1`, this.checkModel[0].toString());
            }
        },
        cancelCheck (e) {
            this.checkedAll = false;
            this.checkModel = [];
        },
        changeState (e) {
            this.checkedAll = !this.checkedAll;
            this.checkModel = [];
            if (this.checkedAll) {
                this.list.forEach((obj) => {
                    this.checkModel.push(obj.id);
                });
            }
        }
    },
    created () {
        this.getList(1);
        this.getCompanyType();
    }
};
</script>
<style scoped lang="scss">
    .btns-wrapper {
        text-align: right;
        padding-bottom: 10px;
        button {
            margin-left: 8px;
        }
    }

    /*.icon-search {*/
    /*position: absolute;*/
    /*top: 0;*/
    /*right: 8px;*/
    /*}*/

    .gy-form-box-14 {
        padding: 6px 14px 5px;
    }

    .selected {
        overflow: hidden;
        padding-bottom: 20px;
    }

    .selected-box {
        padding-top: 20px;
        .el-date-editor .el-range-separator {
            width: 25px;
        }
    }

    .search-btn {
        margin-right: 14px;
        cursor: pointer;
    }

    .search-box {
        display: inline-block;
        width: 216px;
        margin-right: 10px;
        border-bottom: 1px solid $color-light;
        input {
            width: 180px;
            height: 30px;
            color: $color-light;
            border: none;
        }
        button {
            display: inline-block;
            color: $color-main;
            border: none;
            background-color: #fff;
            text-align: right;
            width:auto;
        }
        span {
            color: $color-light;
            padding-left: 20px
        }
    }

    .gy-form-group {
        padding-left: 94px;
        .l {
            width: 84px;
        }
    }

    .gy-form-group:nth-child(odd) {
        padding-right: 30px;
    }

    .gy-form-group:nth-child(even) {
        padding-left: 124px;
        .l {
            width: 114px;
            padding-left: 30px;
        }
    }
</style>
<style>
    .memberList .el-input__inner{
        line-height: 40px!important;
    }
</style>
