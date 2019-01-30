<!--suppress ALL -->
<template>
    <div class="account-company">
        <div class="new-title-public">
            会员账户
        </div>
        <div class="user-box">
            <form action="javascript:;">
                <div class="personal-info gy-form">
                    <div class="gy-form-group">
                        <span class="l">账号</span>
                        <input type="text" class="gy-input" v-model="userInfo.account" disabled>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">申请人</span>
                        <input type="text" class="gy-input" v-model="userInfo.username">
                    </div>
                    <div class="gy-form-group">
                        <span class="l">手机号</span>
                        <input type="text" class="gy-input" v-model="userInfo.phone" disabled>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">邮箱</span>
                        <input type="text" class="gy-input" v-model="userInfo.email">
                    </div>
                    <div class="gy-form-button">
                        <button  class="gy-button-extra" @click="modifiyUserinfo">修改</button>
                    </div>
                </div>
            </form>
        </div>
        <!--END 个人信息-->
        <div class="company-list user-box">
            <h3>所属公司/子公司</h3>
            <div class="gy-form-button">
                <router-link :to="{ name: 'accountCompanyView', query: {} }" class="gy-button-extra">新增</router-link>
                <button class="gy-button-normal" @click="deleteCompany">删除</button>
            </div>
            <span class="note" v-if="companyList.length < 1">您还没有填写过公司信息</span>
            <table class="gy-table" v-else>
                <thead>
                <tr class="title">
                    <td><input type="checkbox" :checked="companySelectedList.length === companyList.length"
                               @change="handleCheckAllChange"></td>
                    <td>公司名称</td>
                    <td>公司地址</td>
                    <td  width="96px">公司电话</td>
                    <td width="80px">类型</td>
                    <td width="80px">认证状态</td>
                    <td width="70px">CA</td>
                    <td width="80px">开通银行</td>
                    <td width="170px">操作</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in companyList" :key="item.id">
                    <td><input type="checkbox" :checked="companySelectedList.indexOf(item.id) >= 0"
                               @change="handleCheckChange(item.id)"></td>
                    <td>{{item.name}}</td>
                    <td style="width: 200px;">{{item.address}}</td>
                    <td>{{item.phone}}</td>
                    <td width="80px">{{item.companyTypeId === 1 ? '交易公司' : (item.companyTypeId === 2 ? '承运商' : '仓储服务商')}}</td>
                    <td width="80px">{{authValue[item.authStatus]}}</td>
                    <td width="70px">{{caValue[item.caAuthStatus]}}</td>
                    <td width="80px">{{bankValue[item.bankAuthStatus]}}</td>
                    <td width="170px">
                        <router-link :to="{ name: 'accountCompanyView', query: {companyId: item.id} }"
                                     class="gy-button-view">查看
                        </router-link>
                        <div v-if="item.authStatus === 2" style="display: inline-block;" @click="setCompanyMain(item)">
                            设为主企业
                            <el-switch v-model="checkCompany[index]" :disabled="item.isChief === 1">
                            </el-switch>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
             <div class="totaljl">
                共{{companyList.length}}条记录
            </div>
        </div>
    </div>
</template>
<script>
import Bus from '@/config/bus.js';
export default {
    data () {
        return {
            userId: 1,
            userInfo: {
                username: '',
                phone: '',
                email: '',
                account: ''
            },
            companyList: [],
            checkAll: false,
            checkCompany: [],
            companySelectedList: [],
            authValue: ['未提交', '待审核', '已通过', '已驳回'],
            caValue: ['未认证', '待审核', '已通过', '已驳回'],
            bankValue: ['未认证', '待审核', '已通过', '已驳回']
        };
    },
    created () {
        let user = localStorage.getItem('userInfo');
        if (user) {
            this.userId = JSON.parse(user).id;
        }
        this.getUserInfo();
        this.getCompanylist();
    },
    methods: {
        getUserInfo () {
            this.$http.get(this.$api.account.userInfo + '/' + this.userId)
                .then(res => {
                    let r = res.data.data;
                    this.userInfo = {
                        username: r.username,
                        phone: r.phone,
                        email: r.email,
                        account: r.account
                    };
                });
        },
        modifiyUserinfo () {
            let that = this;
            that.$http.put(that.$api.account.userInfo, {
                id: that.userId,
                username: that.userInfo.username,
                email: that.userInfo.email
            })
                .then(res => {
                    if (res.data.code === 0) {
                        that.$alert('修改成功', '提示')
                            .then(() => {
                                that.getUserInfo();
                                that.isModified = false;
                            });
                        return;
                    }
                    that.$alert(res.data.message, '出错了');
                });
        },
        getCompanylist () {
            let that = this;
            that.$http.get(that.$api.account.companyList)
                .then(res => {
                    let ResData = res.data.data;
                    let checklist = [];
                    for (let i = 0; i < ResData.length; i++) {
                        if (ResData[i].isChief === 1) {
                            checklist[i] = true;
                        } else {
                            checklist[i] = false;
                        }
                    }
                    this.checkCompany = checklist;
                    that.companyList = ResData;
                });
        },
        handleCheckChange (id) {
            let idx = this.companySelectedList.indexOf(id);
            idx >= 0 ? this.companySelectedList.splice(idx, 1) : this.companySelectedList.push(id);
        },
        handleCheckAllChange () {
            this.checkAll = !this.checkAll;
            if (this.checkAll) {
                this.companySelectedList = [];
                this.companyList.forEach(item => {
                    this.companySelectedList.push(item.id);
                }, this);
                return;
            }
            this.companySelectedList = [];
        },
        deleteCompany () {
            let that = this;
            if (that.companySelectedList.length === 0) {
                that.$alert('请先选择公司', '提示');
                return;
            }
            that.$http.put(that.$api.account.companyDelete, {companyIdList: that.companySelectedList})
                .then(res => {
                    if (res.data.code === 0) {
                        that.$alert('删除成功', '提示')
                            .then(() => {
                                that.companySelectedList = [];
                                that.getCompanylist();
                            });
                        return;
                    }
                    that.$alert(res.data.message, '出错了');
                });
        },
        setCompanyMain (data) {
            if (data.isChief === 1) return;
            // 设为主企业
            this.$http.put(this.$api.account.setMain + data.id)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('设置成功', '提示')
                            .then(() => {
                                let firstMenuData = {
                                    isToFirst: true,
                                    menudef: null
                                };
                                localStorage.setItem('firstMenu', JSON.stringify(firstMenuData));
                                localStorage.setItem('userInfo', JSON.stringify(res.data.data));
                                Bus.$emit('resetmenuList', res.data.data.menuList);
                                Bus.$emit('setcompanyName');
                            });
                        return;
                    }
                    this.$alert(res.data.message, '出错了');
                });
        }
    }
};
</script>

<style lang="scss" scoped>
    .company-list{
        padding-bottom: 16px;
    }
    table tr td{
        text-align: center;
    }
    .totaljl{
        margin-top: 20px;
        font-size: 12px;
        color: #666;
    }
</style>
