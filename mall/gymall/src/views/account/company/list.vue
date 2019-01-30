<template>
    <div class="account-company">
        <div class="user-box">
            <h3>账户基本信息</h3>
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
                        <button class="gy-button-extra" @click="modifiyUserinfo">修改</button>
                    </div>
                </div>
            </form>
        </div>
        <!--END 个人信息-->
        <div class="company-list user-box">
            <h3>所属公司/子公司</h3>
            <div class="gy-form-button">
                <button class="gy-button-normal" @click="deleteCompany">删除</button><router-link :to="{ name: 'accountCompanyView', query: {} }" class="gy-button-extra">新增</router-link>
            </div>
            <span class="note" v-if="companyList.length < 1">您还没有填写过公司信息</span>
            <table class="gy-table" v-else>
                <thead>
                    <tr>
                        <td><input type="checkbox" :checked="companySelectedList.length === companyList.length" @change="handleCheckAllChange"></td>
                        <td>公司名称</td>
                        <td>公司地址</td>
                        <td>公司电话</td>
                        <td>类型</td>
                        <td>认证状态</td>
                        <td>CA</td>
                        <td>开通银行</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in companyList" :key="item.id">
                        <td><input type="checkbox" :checked="companySelectedList.indexOf(item.id) >= 0" @change="handleCheckChange(item.id)"></td>
                        <td>{{item.name}}</td>
                        <td>{{item.address}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.companyType === 0 ? '贸易商' : (item.companyType === 1 ? '承运商' : '仓储服务商')}}</td>
                        <td>{{authValue[item.authStatus]}}</td>
                        <td>{{caValue[item.caAuthStatus]}}</td>
                        <td>{{bankValue[item.bankAuthStatus]}}</td>
                        <td><router-link :to="{ name: 'accountCompanyView', query: {companyId: item.id} }" class="gy-button-view">查看</router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
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
            let that = this;
            that.$http.get(that.$api.account.userInfo + '/' + that.userId)
                .then(res => {
                    let r = res.data.data;
                    that.userInfo = {
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
                    that.companyList = res.data.data;
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
        }
    }
};
</script>
