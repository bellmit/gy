<template>
    <div class="money-account rollOut">
        <!-- page text -->
        <div class="new-title-public">
            资金账户
        </div>
        <!-- 账户信息 -->
        <div class="money-account-common">
            <div class="zjzh">
                <i class="el-icon-tickets"></i>
                <span class="createPayment-seller-tit">资金账户</span>
            </div>
            <div class="clearfix money-accounts">
                <div class="money-accounts-left">
                    <div class="fl money-accounts-left_div1">
                        <img :src="bankInfo.bigIcon"/>
                    </div>
                    <div class="fl money-accounts-left-items">
                        <div class="div1">子账户：{{bankInfo.bankAccount}}</div>
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
        <div class="newtitle">
            <div class="div1">
                <i class="el-icon-tickets"></i>
                <span class="createPayment-seller-tit">提现信息</span>
            </div>
            <div class="div2">
                <span class="span1" @click="panelDialog">请选择提现账户</span>
                <span class="span2" @click="bindamount">绑定新的提现账户</span>
            </div>
        </div>
        <!--新增弹窗-->
        <el-dialog title="绑定新的提现账号" :visible.sync="newbindamountshow">
            <div class="jqyz1">
                <div>
                    <el-row :gutter="60">
                        <el-col :span="12" class="my_top">
                            <el-row>
                                <el-col :span="5" style="padding-left: 15px;">账户名称</el-col>
                                <el-col :span="19">{{bankInfo.usrCompanyName}}</el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="my_top">
                            <el-row>
                                <el-col :span="5"><em class="required">*</em>银行账号</el-col>
                                <el-col :span="19">
                                    <input class="gy-input" type="number" v-model="form.recvAccNo">
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="my_top">
                            <el-row>
                                <el-col :span="5"><em class="required">*</em>开户银行</el-col>
                                <el-col :span="19">
                                    <el-select v-model="form.bankOfDepositName" placeholder="请选择开户银行" @change="bankTypeChange">
                                        <el-option
                                            v-for="(item, index) in bankTypeList"
                                            :key="index"
                                            :label="item.bankNum"
                                            :value="item">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="my_top">
                            <el-row>
                                <el-col :span="5"><em class="required">*</em>所在地区</el-col>
                                <el-col :span="19">
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
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="12" class="my_top">
                            <el-row>
                                <el-col :span="5"><em class="required">*</em>网点名称</el-col>
                                <el-col :span="19">
                                    <el-select v-model="form.latticePoint" placeholder="请选择网点名称" @change="latticePointChange">
                                        <el-option
                                            v-for="(item, index) in latticePointList"
                                            :key="index"
                                            :label="item.bankName"
                                            :value="item">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <button class="gy-button-extra" @click="newPost">确认</button>
            </div>
        </el-dialog>
        <!-- 回显数据 -->
        <div class="hxdetail" v-show="rolloffShow">
            <el-row :gutter="60">
                <el-col class="mytop" :span="12">
                    <el-row>
                        <el-col :span="4" class="myleftspan">账户名称</el-col>
                        <el-col :span="20" class="myrightspan">{{bankInfo.usrCompanyName}}</el-col>
                    </el-row>
                </el-col>
                <el-col class="mytop" :span="12">
                    <el-row>
                        <el-col :span="4" class="myleftspan">银行账号</el-col>
                        <el-col :span="20" class="myrightspan">
                           {{too.bankAccount}}
                        </el-col>
                    </el-row>
                </el-col>
                <el-col class="mytop" :span="12">
                    <el-row>
                        <el-col :span="4" class="myleftspan">开户银行</el-col>
                        <el-col :span="20">
                            {{too.depositBankName}}
                        </el-col>
                    </el-row>
                </el-col>
                <el-col class="mytop" :span="12">
                    <el-row>
                        <el-col :span="4" class="myleftspan">所在地区</el-col>
                        <el-col :span="20">
                            {{too.provinceName}}{{too.cityName}}
                        </el-col>
                    </el-row>
                </el-col>
                <el-col class="mytop" :span="12">
                    <el-row>
                        <el-col :span="4" class="myleftspan">网点名称</el-col>
                        <el-col :span="20">
                            {{too.bankName}}
                        </el-col>
                    </el-row>
                </el-col>
                <el-col class="mytop" :span="12">
                    <el-row>
                        <el-col :span="4" class="myleftspan">转出金额</el-col>
                        <el-col :span="20"><input class="gy-input" type="number"></el-col>
                    </el-row>
                </el-col>
                <el-col class="mytop" :span="12">
                    <el-row>
                        <el-col :span="4" class="myleftspan">联系人</el-col>
                        <el-col :span="20">8678</el-col>
                    </el-row>
                </el-col>
                <el-col class="mytop" :span="12">
                    <el-row>
                        <el-col :span="4" class="myleftspan">联系电话</el-col>
                        <el-col :span="20">8768</el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row class="mybtn">
                <button class="gy-button-extra" @click="rolloff">转出</button>
            </el-row>
        </div>
        <!-- 收款账号名册 -->
        <el-dialog title="常用收款账号名册" :visible.sync="isPanel">
            <div class="tabstable">
                <table>
                    <thead>
                    <tr>
                        <td></td>
                        <td>收款账号</td>
                        <td>开户银行</td>
                        <td>操作</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in this.tables" :key="index">
                        <td><input type="radio" name="status" @click="state(item)"></td>
                        <td>{{item.bankAccount}}</td>
                        <td>{{item.bankName}}</td>
                        <td>
                            <button class="jbbtn">解绑</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="mybtn">
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
        <!--鉴权验证-->
        <el-dialog title="鉴权验证" :visible.sync="jqyzshow">
            <div class="jqyz1">
                请查收鉴权账户收款记录，并回填平安银行对鉴权账户打款金额数字(24小时内有效)。
                信息正确后，即可完成账号绑定。
            </div>
            <div class="jqyz2">
                <el-row :gutter="60">
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="4">账户名称</el-col>
                            <el-col :span="20">{{bankInfo.usrCompanyName}}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="4">银行账号</el-col>
                            <el-col :span="20">{{form.recvAccNo}}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="4">开户银行</el-col>
                            <el-col :span="20">{{form.bankOfDepositName}}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="4">回填金额</el-col>
                            <el-col :span="20">
                                <input class="gy-input" type="number" v-model="authAmt">
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <button  class="gy-button-extra" @click="newPost2">确认</button>
            </div>
        </el-dialog>
        <!--鉴权验证失败-->
        <el-dialog title="提示" :visible.sync="jqyzFailShow">
            <div class="jqyz1">
                <p>绑定失败，以下是详细信息</p>
                <p>错误代码：{{errorCode}}</p>
                <p>错误说明，{{errorMessage}}</p>
            </div>
            <div slot="footer" class="dialog-footer">
                <button  class="gy-button-extra" @click="upbtn">上一步</button>
                <button  class="gy-button-normal" @click="closejqyzFailShow">确认</button>
            </div>
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

                bankOfDeposit: null, // 开户行ID
                bankOfDepositName: null, // 开户银行
                latticePoint: '', // 网点名称
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
            obj: null,
            newbindamountshow: false,
            jqyzshow: false, // 鉴权验证弹窗
            jqyzSuccessShow: false, // 鉴权验证弹窗
            jqyzFailShow: false, // 鉴权验证弹窗
            authAmt: '',
            errorCode: '',
            errorMessage: '',
            rolloffShow: false
        };
    },
    mounted () {
        // 2018/9/27修改
        this.init(this.$api.payment.withdrawInfo, {fundId: this.base.fundId});
    },
    methods: {
        latticePointChange (v) {
            console.log(this.form.latticePoint);
            this.form.latticePoint = v.bankName;
            console.log(this.form.latticePoint);
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
            this.form.bankOfDepositId = v.bankNo;
            this.form.bankOfDepositName = v.bankNum;
            this.form.province = '';
            this.form.provinceName = '';
            this.form.city = '';
            this.form.cityName = '';
            this.form.latticePoint = '';
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
            // 传开户银行 省和城市 拿到网点名称
            this.form.city = v.id;
            this.form.cityName = v.name;
            let params = Object.assign({
                bankOfDeposit: this.form.bankOfDeposit,
                province: this.form.province,
                city: this.form.city
            });
            console.log(params);
            this.$http.post(this.$api.payment.latticePoints, params)
                .then(res => {
                    if (res.data.code === 0) {
                        let data = res.data.data;
                        this.latticePointList = data;
                        console.log(this.latticePointList);
                        console.log(this.form.latticePoint);
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
            this.rolloffShow = true;
            this.isPanel = false;
            // this.too.bankId = this.form.bankId;
            // this.too.fundId = this.form.fundId;
            // this.isPanel = false;
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
            if (me.isPassword.enableTradePwd && Number(me.isPassword.enableTradePwd) === 1) {
                me.dialogVisible = true;
                // enableTradePwd  '启用交易密码(0:停用,1:启用)';1是支持在线支付密码，支持在线支付密码的时候需要弹出支付密码层
            } else {
                me.post();
            }
        },
        post () {
            const me = this;
            me.too.accountNo = me.bankInfo.bankAccount;
            // me.too.bankOfDeposit = me.form.bankOfDepositName;
            me.too.recvAccNo = me.too.bankAccount;
            me.$http.post(me.$api.payment.withdraw, me.too)
                .then(res => {
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
            // if (!this.form.tranAmt) {
            //     this.$message.error('转出金额不能为空');
            //     return false;
            // }
            // if (+this.form.tranAmt > this.bankInfo.accountBalance || +this.form.tranAmt <= 0) {
            //     this.$message.error('转出金额大于账户可用余额，请重新输入');
            //     return false;
            // }
            return true;
        },
        bindamount () {
            this.newbindamountshow = true;
        },
        newPost () {
            if (!this.check()) return false;
            if (this.isPassword.enableTradePwd && Number(this.isPassword.enableTradePwd) === 1) {
                this.dialogVisible = true;
                // enableTradePwd  '启用交易密码(0:停用,1:启用)';1是支持在线支付密码，支持在线支付密码的时候需要弹出支付密码层
            } else {
                this.form.accountNo = this.bankInfo.bankAccount;
                this.form.companyId = this.bankInfo.usrCompanyId;
                this.form.mobile = '12345678910';
                console.log(this.form);
                this.$http.post(this.$api.payment.bindAuthenticateCard, this.form)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.newbindamountshow = false;
                            this.jqyzshow = true;
                            return;
                        }
                        console.log(res.data);
                        this.$message(res.data.message, '提示', {
                            type: 'error'
                        });
                    }).catch(function (error) {
                        console.log(error);
                    });
            }
        },
        // 鉴权账号提交
        newPost2 () {
            // 调取鉴权的接口
            // if (!this.authAmt) {
            //     this.$message.error('转出金额不能为空');
            //     return false;
            // }
            // if (+this.authAmt > this.authAmt || +this.authAmt <= 0) {
            //     this.$message.error('转出金额大于账户可用余额，请重新输入');
            //     return false;
            // }
            this.$http.post(this.$api.payment.checkAuthenticateAmount, {
                'subAcctNo': this.bankInfo.bankAccount,
                'tranNetMemberCode': this.bankInfo.usrCompanyId,
                'takeCashAcctNo': this.form.recvAccNo,
                'authAmt': this.authAmt,
                'fundId': this.form.fundId
            }).then(res => {
                if (res.data.code === 0) {
                    this.$alert('绑定成功', '提示')
                        .then(() => {
                            this.form = {};
                            this.jqyzshow = false;
                        });
                    return;
                }
                this.jqyzFailShow = true;
                this.errorCode = res.data.code;
                this.errorMessage = res.data.message;
            }).catch(res => {
                console.log(res);
            });
        },
        upbtn () {
            this.newbindamountshow = true;
        },
        closejqyzFailShow () {
            this.jqyzFailShow = false;
        }
    }
};
</script>

<style lang="scss" scoped>
    .rollOut {
        .money-account-common{
            .zjzh{
                padding: 20px 12px;
            }
        }
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
        .tabstable {
            padding: 20px 16px;
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
            .jbbtn{
                background: none;
                border: 1px solid #4A90E2;
                color: #4A90E2;
                border-radius: 5px;
            }
        }
        .mybtn{
            padding-bottom: 30px;
            margin-top: 10px;
            text-align: right;
            margin-right: 16px;
        }
        .jqyz1{
            padding: 20px 30px;
            p{
                margin-bottom: 10px;
            }
        }
        .jqyz2{
            padding: 0 30px;
        }
    }
    .money-account {
        background-color: #fff;
        .money-account-tit {
            background: #fff;
            padding: 6px 10px;
        }
        .money-accounts{
            border-bottom: 1px solid #e6eaea;
            padding: 0 30px 20px;
        }
        .money-accounts-left{
            overflow: hidden;
            .money-accounts-left_div1{
                float: left;
            }
        }
        .money-accounts-left-amount {
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .money-accounts-left-items {
            margin-left: 30px;
            .div1{
                color: #333;
                font-weight: bold;
            }
        }
        .money-accounts-left-amount-item {
            margin-right: 20px;
        }
        .money-accounts-left-amount-item-tit {
            color: $color-main;
            font-size: 14px;
        }
        .money-accounts-left-amount-item-num {
            color: $color-title;
            font-size: 14px;
            font-weight: bold;
            margin-top: 10px;
        }
        .newtitle{
            .div1{
                padding: 20px 12px
            }
            .div2{
                color: #4A90E2;
                font-size: 14px;
                padding: 0px 30px;
                .span1{
                    margin-right: 30px;
                }
                .span2{

                }
                span:hover{
                    cursor: pointer;
                }
            }
        }
        .hxdetail{
            padding: 0 30px;
            .mytop{
                margin-top: 10px;
            }
            .mybtn{
                float: right;
                margin: 20px 0 30px;
            }
            .myleftspan{
                color: #333;
            }
            .myrightspan{
                color: #333;
            }
        }
        .el-dialog__header{
            border-bottom: 1px solid #dce0e4;
            padding: 15px;
        }
    }
    .my_top{
        margin-bottom: 10px;
    }
</style>
<style lang="scss">
    .rollOut{
        .el-dialog__body{
            padding: 0;
        }
    }
</style>
