<template>
    <div class="money-account rollOut">
        <!-- page text -->
        <div class="money-account-tit common-padding">
            资金账户
        </div>
        <!-- 账户信息 -->
        <div class="money-account-common common-padding">
            <div>
                <i class="el-icon-tickets"></i>
                <span class="createPayment-seller-tit">资金账户</span>
            </div>
            <div class="clearfix money-accounts">
                <div class="money-accounts-left fl clearfix">
                    <img class="fl" style="margin-top: 30px;" :src="bankInfo.bigIcon"/>
                    <div class="fr money-accounts-left-items">
                        <div>子账户：{{bankInfo.bankAccount}}</div>
                        <div class="money-accounts-left-amount">
                            <div class="money-accounts-left-amount-item">
                                <div class="money-accounts-left-amount-item-tit">账户余额（元）</div>
                                <div class="money-accounts-left-amount-item-num">{{bankInfo.actualBalance || 0}}</div>
                            </div>
                            <div class="money-accounts-left-amount-item">
                                <div class="money-accounts-left-amount-item-tit">冻结余额（元）</div>
                                <div class="money-accounts-left-amount-item-num">{{bankInfo.blockedBalance || 0}}</div>
                            </div>
                            <div class="money-accounts-left-amount-item" style="display: none;">
                                <div class="money-accounts-left-amount-item-tit">可用余额（元）</div>
                                <div class="money-accounts-left-amount-item-num">{{bankInfo.accountBalance || 0}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 账户form -->
        <div class="money-account-common common-padding">
            <div class="title">
                <i class="el-icon-tickets"></i>
                <span class="createPayment-seller-tit">资金账户</span>
            </div>
            <div class="gy-form">
                <div class="gy-form-group single-row  w50">
                    <span class="l">账户名称</span>
                    <div>{{bankInfo.usrCompanyName}}</div>
                    <!--<div><input type="text" class="gy-input" v-model="form.recvAccNm"></div>-->
                </div>
                <div class="gy-form-group single-row w50 cl my-group">
                    <span class="l"><em class="required">*</em>账号</span>
                    <input class="gy-input" type="number" v-model="form.recvAccNo">
                    <div class="grop-r panel" @click="panelDialog">收款账号名册</div>
                </div>
                <div class="gy-form-group single-row w50 cl">
                    <span class="l"><em class="required">*</em>开户银行</span>
                    <el-select v-model="form.bankOfDepositName" placeholder="请选择开户银行" filterable @change="bankTypeChange">
                        <el-option
                            v-for="(item, index) in bankTypeList"
                            :key="index"
                            :label="item.bankNum"
                            :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group cl">
                    <span class="l"><em class="required">*</em>所在地区</span>
                    <el-select class="w50 lf" v-model="form.provinceName" placeholder="请选择省" @change='provinceChange'>
                        <el-option
                            v-for="(item, index) in provinceList"
                            :key="index"
                            :label="item.name"
                            :value="item">
                        </el-option>
                    </el-select>
                    <el-select class="w50 lf" v-model="form.cityName" placeholder="请选择市" @change="cityChange">
                        <el-option
                            v-for="(item, index) in cityList"
                            :key="index"
                            :label="item.name"
                            :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group single-row w50 cl">
                    <span class="l"><em class="required">*</em>网点名称</span>
                    <el-select v-model="form.latticePoint" filterable placeholder="请选择网点名称" @change="latticePointChange">
                        <el-option
                            v-for="(item, index) in latticePointList"
                            :key="index"
                            :label="item.bankName"
                            :value="item">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group single-row w50 cl my-group">
                    <span class="l"><em class="required">*</em>转出金额</span>
                    <input class="gy-input" type="number" v-model="form.tranAmt">
                    <div class="grop-r">元</div>
                </div>
                <!-- <div class="gy-form-group single-row w50 cl my-group">
                    <span class="l">交易密码</span>
                    <input class="gy-input" type="password" v-model="form.tradePwd">
                </div> -->
                <div class="gy-form-group single-row w50 cl my-group">
                    <span class="l">联系人</span>
                    <div>{{userInfo.username}}</div>
                </div>
                <div class="gy-form-group single-row w50 cl my-group">
                    <span class="l">联系电话</span>
                    <div>{{userInfo.phone}}</div>
                </div>
                <div class="gy-form-button">
                    <button class="gy-button-extra" @click="rolloff">转出</button>
                </div>
            </div>
        </div>
        <!-- 收款账号名册 -->
        <el-dialog title="常用收款账号名册" :visible.sync="isPanel">
            <div class="tabs">
                <table>
                    <thead>
                    <tr>
                        <td></td>
                        <td>收款账号</td>
                        <td>开户银行</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in this.tables" :key="index">
                        <td><input type="radio" name="status" @click="state(item)"></td>
                        <td>{{item.bankAccount}}</td>
                        <td>{{item.bankName}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="gy-form-button">
                <button class="gy-button-extra" @click="submit">确认</button>
            </div>
        </el-dialog>
        <!-- 交易密码 -->
        <el-dialog
            title="提示"
            :close-on-click-modal="false"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form ref="form" label-width="70px">
                <el-form-item label="支付密码" prop="account">
                    <el-input v-model="form.tradePwd" type="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="addBank">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'money-account',
    data () {
        return {
            form: {
                accountNo: null, // 付款账户 初始化中得 bankAccount
                recvAccNm: null, // 收款账户名称
                recvAccNo: null, // 收款账户
                // recvBankNm: null, // 开户银行
                bankOfDeposit: null, // 开户行ID
                bankOfDepositName: null, // 开户银行
                latticePoint: null, // 网点名称
                tranAmt: null, // 转出金额
                tradePwd: null, // 交易密码
                fundId: null,
                bankId: null,
                province: null, // 省 第二次调用参数：province 省
                provinceName: null,
                city: null, // 市
                cityName: null
            },
            bankInfo: {}, // 资金账户信息
            bankTypeList: [], // 开户银行List
            provinceList: [], // 省List
            cityList: [], // 市List
            latticePointList: [], // 网点List
            base: {
                fundId: JSON.parse(localStorage.getItem('bankAccId')), //  第一次 进入页面参数选择提现的银行账户ID
                companyId: null // 公司ID
            },
            tables: [],
            isPanel: false,
            too: {},
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
            dialogVisible: false,
            isPassword: {},
            obj: null
        };
    },
    mounted () {
        // 2018/9/27修改
        this.init(this.$api.payment.withdrawInfo, {fundId: this.base.fundId});
    },
    methods: {
        latticePointChange (v) {
            this.form.latticePoint = v.bankName;
        },
        init (url, params) {
            const me = this;
            me.$http.post(url, params)
                .then(function (res) {
                    if (res.data.code === 0) {
                        let data = res.data.data;
                        me.bankTypeList = data.lattice_points;
                        me.provinceList = data.areas;
                        me.form.fundId = data.bank.bankAccId;
                        me.form.bankId = data.bank.fundAccId;
                        me.bankInfo = Object.assign({}, data.bank);
                        me.base.companyId = me.bankInfo.usrCompanyId;
                        me.form.recvAccNm = me.bankInfo.usrCompanyName;
                        // 成功了拿到交易密码对象
                        me.$http.get(me.$api.account.isHasTradePwd
                        ).then(function (res) {
                            me.isPassword = res.data.data;
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 开户行选择
        bankTypeChange (v) {
            this.form.bankOfDeposit = v.bankType;
            this.form.bankOfDepositName = v.bankNum;
            this.form.province = null;
            this.form.provinceName = null;
            this.form.city = null;
            this.form.cityName = null;
            this.form.latticePoint = null;
        },
        // 省份选择
        provinceChange (v) {
            this.form.province = v.id;
            this.form.provinceName = v.name;
            const me = this;
            me.$http.post(this.$api.payment.withdrawInfo, {province: this.form.province})
                .then(function (res) {
                    if (res.data.code === 0) {
                        let data = res.data.data;
                        me.cityList = data.areas;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 市选择
        cityChange (v) {
            const me = this;
            // 传开户银行 省和城市 拿到网点名称
            me.form.city = v.id;
            this.form.cityName = v.name;
            let params = Object.assign({
                bankOfDeposit: me.form.bankOfDeposit,
                province: me.form.province,
                city: me.form.city
            });
            console.log(params);
            me.$http.post(me.$api.payment.latticePoints, params)
                .then(function (res) {
                    if (res.data.code === 0) {
                        let data = res.data.data;
                        me.latticePointList = data;
                        console.log('*********');
                        console.log(me.latticePointList);
                        console.log('*********');
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 开启收款账号名册
        panelDialog () {
            const me = this;
            me.isPanel = true;
            me.$http.post(me.$api.payment.useAccounts + '?companyId=' + me.base.companyId)
                .then(function (res) {
                    if (res.data.code === 0) {
                        let data = res.data.data;
                        me.tables = data;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 选择当前
        state (item) {
            this.too = item;
            this.too.bankId = this.form.bankId;
            this.too.fundId = this.form.fundId;
            console.log(item);
        },
        // 确认名册
        submit () {
            console.log(this.obj);
            this.form.city = this.too.city;
            this.form.cityName = this.too.cityName;
            this.form.province = this.too.province;
            this.form.provinceName = this.too.provinceName;
            this.form.recvAccNm = this.bankInfo.usrCompanyName;
            this.form.recvAccNo = this.too.bankAccount;
            this.form.bankOfDepositName = this.too.bankName;
            this.form.latticePoint = this.too.depositBankName;
            const me = this;
            this.bankTypeList.filter(function (e) {
                if (e.bankNum === me.form.bankOfDepositName) {
                    me.form.bankOfDeposit = e.bankType;
                    return false;
                }
            });
            this.isPanel = false;
            me.$http.post(this.$api.payment.withdrawInfo, {province: this.form.province})
                .then(function (res) {
                    if (res.data.code === 0) {
                        let data = res.data.data;
                        me.cityList = data.areas;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            let params = {
                bankOfDeposit: me.form.bankOfDeposit,
                province: me.form.province,
                city: me.form.city
            };
            me.$http.post(me.$api.payment.latticePoints, params)
                .then(function (res) {
                    if (res.data.code === 0) {
                        let data = res.data.data;
                        me.latticePointList = data;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 交易密码取消
        cancel () {
            this.isPassword.enableTradePwd = 1;
            this.dialogVisible = false;
        },
        // 交易密码确定
        addBank () {
            this.isPassword.enableTradePwd = 0;
            this.post();
        },
        // 转出按钮
        rolloff (type) {
            const me = this;
            if (!me.check()) return false;
            if (me.isPassword.enableTradePwd && Number(me.isPassword.enableTradePwd) === 1) {
                me.dialogVisible = true;
                // enableTradePwd  '启用交易密码(0:停用,1:启用)';1是支持在线支付密码，支持在线支付密码的时候需要弹出支付密码层
            } else {
                me.post();
            }
        },
        post () {
            const me = this;
            me.form.accountNo = me.bankInfo.bankAccount;
            me.form.bankOfDeposit = me.form.bankOfDepositName;
            console.log(me.form);
            me.$http.post(me.$api.payment.withdraw, me.form)
                .then(function (res) {
                    if (res.data.code === 0) {
                        me.form = {};
                        me.dialogVisible = true;
                        me.$router.push({name: 'accountMoney'});
                        return;
                    }
                    me.$message(res.data.message, '提示', {
                        type: 'error'
                    });
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 验证
        check () {
            if (this.form.recvAccNo === null) {
                this.$message.error('账号不能为空');
                return false;
            }
            if (this.form.bankOfDeposit === null) {
                this.$message.error('开户银行不能为空');
                return false;
            }
            if (this.form.province === null) {
                this.$message.error('省份不能为空');
                return false;
            }
            if (this.form.city === null) {
                this.$message.error('城市不能为空');
                return false;
            }
            if (this.form.latticePoint === null) {
                this.$message.error('网点名称不能为空');
                return false;
            }
            if (!this.form.tranAmt) {
                this.$message.error('转出金额不能为空');
                return false;
            }
            if (+this.form.tranAmt > this.bankInfo.accountBalance || +this.form.tranAmt <= 0) {
                this.$message.error('转出金额大于账户可用余额，请重新输入');
                return false;
            }
            return true;
        }
    }
};
</script>

<style lang="scss" scoped>
    .rollOut {
        .w50 {
            width: 50%;
        }
        .lf {
            float: left;
        }
        .panel {
            color: #4A90E2;
            cursor: pointer;
        }
        .required {
            display: inline-block;
            width: 15px;
            color: #E0370F;
        }
        .my-group {
            position: relative;
            .grop-r {
                position: absolute;
                bottom: 18px;
                right: 40px;
                line-height: 1;
            }
        }
        .gy-form-button {
            padding-top: 30px;
        }
        .tabs {
            position: relative;
            .exportBtn {
                position: absolute;
                right: 0;
                z-index: 99999;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                border: 1px solid $color-border;
                color: $color-main;
                font-size: $small-font;
            }
            table thead tr td {
                padding-left: 10px;
                height: 40px;
                background-color: #EEF3F8;
            }
            table tbody tr:nth-child(even) td {
                background-color: #F2F3F7;
            }
            table td {
                height: 40px;
                line-height: 16px;
                padding-left: 10px;
            }
            table .ge td {
                line-height: 20px;
            }
        }
    }

    .money-account {
        background-color: #fff;
        .common-padding {
            padding: 0 10px;
        }
        .money-account-tit {
            background: #fff;
            padding: 6px 10px;
        }
        .money-account-common {
            border-top: 1px solid #eee;
            padding: 20px 10px;
        }
        .money-accounts-left-amount {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .money-accounts-left-items {
            margin-left: 30px;
        }
        .money-accounts-left-amount-item {
            margin-right: 20px;
        }
        .money-accounts-left-amount-item-tit {
            color: $color-main;
            font-size: 12px;
        }
        .money-accounts-left-amount-item-num {
            color: $color-title;
            font-size: 14px;
            font-weight: bold;
        }
    }
</style>
