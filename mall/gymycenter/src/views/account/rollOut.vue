<template>
    <div class="money-account rollOut">
        <!-- page text -->
        <div class="new-title-public">
            资金账户
        </div>
        <!-- 账户信息 -->
        <div class="money-account-common">
            <div class="zjzh">
                <i class="iconfont icon-zijinzhanghuicon mewmyicon"></i>
                <span class="mewmyfont">资金账户</span>
            </div>
            <div class="clearfix money-accounts">
                <div class="money-accounts-left">
                    <div class="fl money-accounts-left_div1">
                        <div class="myimg">
                            <img :src="bankInfo.bigIcon"/>
                        </div>
                    </div>
                    <div class="fl money-accounts-left-items">
                        <div class="div1">{{bankInfo.bankFlag =='1'?'普通':'商户'}}子账户：{{bankInfo.bankAccount}}</div>
                        <div class="money-accounts-left-amount">
                            <div class="money-accounts-left-amount-item">
                                <div class="money-accounts-left-amount-item-tit">账户余额（元）</div>
                                <div class="money-accounts-left-amount-item-num">{{bankInfo.accountBalance|numToCash}}</div>
                            </div>
                            <div class="money-accounts-left-amount-item">
                                <div class="money-accounts-left-amount-item-tit">冻结余额（元）</div>
                                <div class="money-accounts-left-amount-item-num">{{bankInfo.blockedBalance|numToCash}}</div>
                            </div>
                            <div class="money-accounts-left-amount-item">
                                <div class="money-accounts-left-amount-item-tit">可用余额（元）</div>
                                <div class="money-accounts-left-amount-item-num">{{bankInfo.actualBalance|numToCash}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="newtitle">
            <div class="div1">
                <i class="iconfont icon-dingdanxinxi mewmyicon"></i> <span class="mewmyfont">提现信息</span>
            </div>
            <div class="div2">
                <span  v-if="!rolloffShow">{{nobindvalue}}</span>
                <span class="span2" @click="bindamount">绑定新的银行卡</span>
            </div>
            <div class="div3" v-show="cardList.length!=0">
                <el-row>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="6" class="fontWeight list-left-span">选择提现账户</el-col>
                            <el-col :span="18">
                                <div class="bottom-radio" v-for="(item, index) in cardList" :key="index">
                                    <el-radio :label="index+1" @change="changeRadio(item)" v-model="radioTx">
                                        <!--<i class="iconfont icon-dingdanxinxi mewmyicon"></i>-->
                                        <span class="div3-span1">{{item.depositBankName}}</span>
                                        <span>卡号：</span>
                                        <span class="div3-span2">{{item.accountNo}}</span>
                                        <span class="div3-span4" @click="jbSubmit(item)">解绑</span>
                                    </el-radio>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!--新增弹窗-->
        <el-dialog  @close="closeDialog" class="jqdialog-rollOut" width="610px" title="绑定新的账号" :visible.sync="newbindamountshow" :close-on-click-modal="false">
            <div class="jqyz1">
                <div>
                    <el-row :gutter="60">
                        <el-col :span="24" class="my_top">
                            <el-row>
                                <el-col :span="4"  class="list-left-span" style="padding-left: 15px;">账号名称</el-col>
                                <el-col :span="20" class="list-right-span" style="padding-left: 10px;">{{bankInfo.usrCompanyName}}</el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="24" class="my_top">
                            <el-row>
                                <el-col :span="4"  class="list-left-span"><em class="required">*</em>银行账号</el-col>
                                <el-col :span="20" class="list-right-span">
                                    <input placeholder="请输入" class="gy-input" v-model="form.recvAccNo">
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="24" class="my_top">
                            <el-row>
                                <el-col :span="4"  class="list-left-span"><em class="required">*</em>开户银行</el-col>
                                <el-col :span="20" class="list-right-span">
                                    <el-select filterable v-model="form.bankOfDepositId" placeholder="请选择开户银行" @change="bankTypeChange">
                                        <el-option
                                                v-for="(item, index) in bankTypeList"
                                                :key="index"
                                                :label="item.bankNum"
                                                :value="item.bankNo">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="24" class="my_top">
                            <el-row>
                                <el-col :span="4"  class="list-left-span"><em class="required">*</em>所在地区</el-col>
                                <el-col :span="20" class="list-right-span">
                                    <el-select class="w50 lf" v-model="form.province" placeholder="请选择省" @change='provinceChange'>
                                        <el-option
                                                v-for="(item, index) in provinceList"
                                                :key="index"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <el-select class="w50 lf" v-model="form.city" placeholder="请选择市" @change="cityChange">
                                        <el-option
                                                v-for="(item, index) in cityList"
                                                :key="index"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="24" class="my_top">
                            <el-row>
                                <el-col :span="4"  class="list-left-span"><em class="required">*</em>网点名称</el-col>
                                <el-col :span="20" class="list-right-span">
                                    <el-select :title="form.latticePoint" filterable v-model="form.branchId" placeholder="请选择网点名称" @change="latticePointChange">
                                        <el-option
                                                v-for="(item, index) in latticePointList"
                                                :key="index"
                                                :label="item.bankName"
                                                :value="item.bankNo">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <button class="gy-button-extra mybtnbindnew" @click="newPost">确认</button>
            </div>
        </el-dialog>
        <!-- 回显数据1 -->
        <div class="hxdetail" v-show="rolloffShow">
            <el-row :gutter="60">
                <el-col class="mytop" :span="12">
                    <el-row>
                        <el-col :span="4" class="list-left-span">账号名称</el-col>
                        <el-col :span="20" class="list-right-span">{{bankInfo.usrCompanyName}}</el-col>
                    </el-row>
                </el-col>
                <el-col class="mytop" :span="12">
                    <el-row>
                        <el-col :span="4" class="list-left-span">银行账号</el-col>
                        <el-col :span="20" class="list-right-span">
                            {{too.accountNo}}
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row :gutter="60">
                <el-col class="mytop" :span="12">
                    <el-row>
                        <el-col :span="4" class="list-left-span">开户银行</el-col>
                        <el-col :span="20" class="list-right-span">
                            {{too.depositBankName}}
                        </el-col>
                    </el-row>
                </el-col>
                <el-col class="mytop" :span="12">
                    <el-row>
                        <el-col :span="4" class="list-left-span">所在地区</el-col>
                        <el-col :span="20" class="list-right-span">
                            {{too.provinceName}}{{too.cityName}}
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row :gutter="60">
                <el-col class="mytop" :span="12">
                    <el-row>
                        <el-col :span="4" class="list-left-span">网点名称</el-col>
                        <el-col :span="20" class="list-right-span">
                            {{too.latticeName}}
                        </el-col>
                    </el-row>
                </el-col>
                <el-col class="mytop" :span="12">
                    <el-row>
                        <el-col :span="4" class="list-left-span">提现金额</el-col>
                        <el-col :span="19" class="list-right-span">
                            <input placeholder="请输入" v-model="zcamount" class="gy-input">
                        </el-col>
                        <span>元</span>
                    </el-row>
                </el-col>
            </el-row>
            <el-row :gutter="60">
                <el-col class="mytop" :span="12">
                    <el-row>
                        <el-col :span="4" class="list-left-span">联系人</el-col>
                        <el-col :span="20" class="list-right-span">{{userInfo.username}}</el-col>
                    </el-row>
                </el-col>
                <el-col class="mytop" :span="12">
                    <el-row>
                        <el-col :span="4" class="list-left-span">联系电话</el-col>
                        <el-col :span="20" class="list-right-span">{{userInfo.phone}}</el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row class="mybtn">
                <button class="gy-button-extra" @click="rolloff">提现</button>
            </el-row>
        </div>
        <el-dialog
            class="passwordDialog"
            width="550px"
            title="提示"
            @close="cancel"
            :close-on-click-modal="false"
            :visible.sync="dialogVisible">
            <div>
                <el-form ref="form" label-width="70px">
                    <el-form-item label="支付密码" prop="account">
                        <el-input v-model="form.tradePwd" type="password"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <button  class="gy-button-extra mybtnbindnew" @click="addBank">确认</button>
            </span>
        </el-dialog>
        <!--鉴权验证-->
        <el-dialog @close="closeDialog" class="jqdialog-rollOut"  width="850px" title="鉴权验证" :visible.sync="jqyzshow">
            <div class="jqyz1">
                请查收鉴权账户收款记录，并回填平安银行对鉴权账户打款金额数字(24小时内有效)。
                信息正确后，即可完成账号绑定。
            </div>
            <div style="margin-top: 10px">
                <el-row :gutter="60">
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="5" class="list-left-span">账户名称</el-col>
                            <el-col :span="19" class="list-right-span">{{bankInfo.usrCompanyName}}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="5" class="list-left-span">银行账号</el-col>
                            <el-col :span="19" class="list-right-span">{{myNewrecvAccNo}}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="list-top">
                        <el-row>
                            <el-col :span="5" class="list-left-span">开户银行</el-col>
                            <el-col :span="19" class="list-right-span">{{myNewbankOfDepositName}}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="list-top">
                        <el-row>
                            <el-col :span="5" class="list-left-span">回填金额</el-col>
                            <el-col :span="18" class="list-right-span">
                                <input class="gy-input" v-model="authAmt">
                            </el-col>
                            <span class="list-right-span">元</span>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer list-top">
                <button  class="gy-button-extra mybtnbindnew" @click="newPost2">确认</button>
            </div>
        </el-dialog>
        <!--鉴权验证失败-->
        <el-dialog  class="jqdialog-rollOut" width="850px" title="提示" :visible.sync="jqyzFailShow">
            <div class="jqyz1">
                <p><i style="color: red;margin-left: -20px" class="iconfont icon-fail"></i>  绑定失败，以下是详细信息</p>
                <p>错误代码:{{errorCode}}</p>
                <p>错误说明:{{errorMessage}}</p>
            </div>
            <div slot="footer" class="dialog-footer">
                <button  class="gy-button-extra mybtnbindnew" @click="upbtn">上一步</button>
                <button  class="gy-button-normal mybtnbindnew" @click="closejqyzFailShow">确认</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'money-account',
    data () {
        return {
            nobindvalue: '',
            radioTx: 1,
            myNewrecvAccNo: '',
            myNewbankOfDepositName: '',
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
                cityName: null,
                branchId: null
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
            too: [],
            too2: [],
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
            dialogVisible: false,
            isPassword: {},
            obj: null,
            newbindamountshow: false,
            jqyzshow: false, // 鉴权验证弹窗
            jqyzFailShow: false, // 鉴权验证弹窗
            authAmt: '',
            errorCode: '',
            errorMessage: '',
            rolloffShow: false,
            zcamount: '',
            newbankhx: [], // 回显数据
            transmissionPass: [], // 支付密码
            cardList: [] // 支付密码
        };
    },
    mounted () {
        // 2018/9/27修改
        this.init(this.$api.payment.withdrawInfo, {fundId: this.base.fundId});
    },
    methods: {
        latticePointChange (v) {
            for (let i = 0; i < this.latticePointList.length; i++) {
                if (this.latticePointList[i].bankNo === v) {
                    this.form.latticePoint = this.latticePointList[i].bankName;
                    this.form.branchId = this.latticePointList[i].bankNo;
                }
            }
        },
        init (url, params) {
            const me = this;
            me.$http.post(url, params)
                .then(res => {
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
                            console.log(me.isPassword);
                        }).catch(function (error) {
                            console.log(error);
                        });
                        // 判断回显数据
                        if (data.latestSuccessAccount) {
                            me.too = data.latestSuccessAccount;
                            me.rolloffShow = true;
                        } else {
                            me.rolloffShow = false;
                            me.nobindvalue = '您还没有绑定银行卡';
                            console.log(me.nobindvalue);
                        }
                        //    选择提现账户列表
                        //   console.log(res.data.data.cardList);
                        me.cardList = res.data.data.cardList;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 开户行选择
        bankTypeChange (v) {
            for (let i = 0; i < this.bankTypeList.length; i++) {
                if (this.bankTypeList[i].bankNo === v) {
                    this.form.bankOfDeposit = this.bankTypeList[i].bankType;
                    this.form.bankOfDepositId = this.bankTypeList[i].bankNo;
                    this.form.bankOfDepositName = this.bankTypeList[i].bankNum;
                }
            }
            this.form.province = '';
            this.form.provinceName = '';
            this.form.city = '';
            this.form.cityName = '';
            this.form.latticePoint = '';
        },
        // 省份选择
        provinceChange (v) {
            for (let i = 0; i < this.provinceList.length; i++) {
                if (this.provinceList[i].id === v) {
                    this.form.province = this.provinceList[i].id;
                    this.form.provinceName = this.provinceList[i].name;
                }
            }
            this.$http.post(this.$api.payment.withdrawInfo, {province: this.form.province})
                .then(res => {
                    if (res.data.code === 0) {
                        this.form.cityName = '';
                        this.form.city = '';
                        this.cityList = res.data.data.areas;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 市选择
        cityChange (v) {
            // 传开户银行 省和城市 拿到网点名称
            for (let i = 0; i < this.cityList.length; i++) {
                if (this.cityList[i].id === v) {
                    this.form.city = this.cityList[i].id;
                    this.form.cityName = this.cityList[i].name;
                }
            }
            let params = Object.assign({
                bankOfDeposit: this.form.bankOfDeposit,
                province: this.form.province,
                city: this.form.city
            });
            this.$http.post(this.$api.payment.latticePoints, params)
                .then(res => {
                    if (res.data.code === 0) {
                        console.log(res.data.data);
                        this.latticePointList = res.data.data;
                        console.log(this.latticePointList);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 开启收款账号名册
        // 解绑
        jbSubmit (v) {
            this.$alert('请确认是否解绑？', '提示', {type: 'warning'})
                .then(() => {
                    this.$http.post(this.$api.payment.unbindCardInfo, {
                        fundId: this.bankInfo.bankAccId,
                        tranNetMemberCode: v.usrCompanyId,
                        subAcctNo: v.subAcctNo,
                        memberAcctNo: v.accountNo
                    }).then(res => {
                        if (res.data.code === 0) {
                            if (res.data.data.code === 0) {
                                this.init(this.$api.payment.withdrawInfo, {fundId: this.base.fundId});
                                this.$message({
                                    message: '解绑成功',
                                    type: 'success'
                                });
                            } else {
                                this.$message.error(res.data.data.message);
                            }
                        } else {
                            // res.data.data.isPanel = false;
                            this.$message.error(res.data.message);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                });
        },
        // 确认名册
        submit () {
            // fundId 资金账户ID
            // accountNo 付款账号,
            // recvAccNo 收款账号,
            // recvAccNm 收款账户名称,
            // recvBankNm 收款银行名称不能为空
            // tranAmt 提现金额
            // bankOfDeposit 收款银行开户行名称
            // latticePoint 收款银行网点名称
            // tranAmt 转出金额
            // tradePwd 交易密码（在开启交易密码验证时必填）
            const me = this;
            me.$http.post(this.$api.payment.withdrawInfo, {
                fundId: this.bankInfo.bankAccount,
                accountNo: this.bankInfo.bankAccount,
                recvAccNo: this.too.bankAccount,
                recvAccNm: this.bankInfo.usrCompanyName,
                recvBankNm: this.too.bankName,
                tranAmt: this.zcamount,
                bankOfDeposit: this.too.depositBankName,
                latticePoint: this.too.bankName
            })
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
                        this.init(this.$api.payment.withdrawInfo, {fundId: this.base.fundId});
                        me.latticePointList = res.data.data;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 交易密码取消
        cancel () {
            this.isPassword.enableTradePwd = 1;
            this.form.tradePwd = '';
            this.dialogVisible = false;
        },
        // 交易密码确定
        addBank () {
            if (!this.form.tradePwd) {
                this.$message.error('支付密码不能为空');
                return false;
            }
            this.isPassword.enableTradePwd = 0;
            this.post();
        },
        // 转出按钮
        rolloff (type) {
            const me = this;
            if (!this.zcamount) {
                this.$message.error('提现金额不能为空');
                return false;
            }
            if (me.isPassword.enableTradePwd && Number(me.isPassword.enableTradePwd) === 1) {
                me.dialogVisible = true;
                // enableTradePwd  '启用交易密码(0:停用,1:启用)';1是支持在线支付密码，支持在线支付密码的时候需要弹出支付密码层
            } else {
                me.post();
            }
        },
        post () {
            const me = this;
            me.too.recvAccNo = me.too.bankAccount;
            me.$http.post(me.$api.payment.withdraw, {
                fundId: this.bankInfo.bankAccId,
                accountNo: this.bankInfo.bankAccount,
                recvAccNo: this.too.accountNo,
                recvAccNm: this.bankInfo.usrCompanyName,
                recvBankNm: this.too.bankName,
                tranAmt: this.zcamount,
                bankOfDeposit: this.too.depositBankName,
                latticePoint: this.too.latticeName,
                tradePwd: this.form.tradePwd
            })
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('提现成功', '提示', '提示', {type: 'success'})
                            .then(() => {
                                this.init(this.$api.payment.withdrawInfo, {fundId: this.base.fundId});
                                this.transmissionPass = '';
                                this.zcamount = '';
                            });
                    } else {
                        this.dialogVisible = false;
                        me.$message(res.data.message, '提示', {
                            type: 'error'
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 验证
        check () {
            if (!this.form.recvAccNo) {
                this.$message.error('账号不能为空');
                return false;
            }
            if (!this.form.bankOfDeposit) {
                this.$message.error('开户银行不能为空');
                return false;
            }
            if (!this.form.province) {
                this.$message.error('省份不能为空');
                return false;
            }
            if (!this.form.city) {
                this.$message.error('城市不能为空');
                return false;
            }
            if (!this.form.latticePoint) {
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
        // 绑定新的提现账户
        bindamount () {
            // 打开弹窗
            this.newbindamountshow = true;
        },
        newPost () {
            if (!this.check()) return false;
            this.form.accountNo = this.bankInfo.bankAccount;
            this.form.companyId = this.bankInfo.usrCompanyId;
            this.form.bankName = this.bankInfo.bankName;
            this.$http.post(this.$api.payment.bindAuthenticateCard, this.form)
                .then(res => {
                    console.log(res);
                    if (res.data.code === 0) {
                        if (res.data.data.data.code === 0) {
                            this.newbindamountshow = false;
                            this.jqyzshow = true;
                            console.log(this.form.recvAccNo);
                            this.myNewrecvAccNo = this.form.recvAccNo;
                            this.myNewbankOfDepositName = this.form.bankOfDepositName;
                        } else {
                            this.$message.error(res.data.data.data.message, '提示', {
                                type: 'error'
                            });
                        }
                    } else {
                        this.$message.error(res.data.message, '提示', {
                            type: 'error'
                        });
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 鉴权账号提交
        newPost2 () {
            // 调取鉴权的接口
            if (!this.authAmt) {
                this.$message.error('回填金额不能为空');
                return false;
            }
            if (+this.authAmt > this.authAmt || +this.authAmt <= 0) {
                this.$message.error('回填金额验证失败');
                return false;
            }
            this.$http.post(this.$api.payment.checkAuthenticateAmount, {
                'subAcctNo': this.bankInfo.bankAccount,
                'tranNetMemberCode': this.bankInfo.usrCompanyId,
                'takeCashAcctNo': this.myNewrecvAccNo,
                'authAmt': this.authAmt,
                'fundId': this.form.fundId,
                'bankName': this.bankInfo.bankName
            }).then(res => {
                if (res.data.code === 0) {
                    if (res.data.data.data.code === 0) {
                        this.$alert('绑定成功', '提示', {type: 'success'})
                            .then(() => {
                                this.init(this.$api.payment.withdrawInfo, {fundId: this.base.fundId});
                                this.jqyzshow = false;
                            });
                    } else {
                        this.jqyzFailShow = true;
                        this.errorCode = res.data.data.data.code;
                        this.errorMessage = res.data.data.data.message;
                    }
                } else {
                    this.jqyzFailShow = true;
                    this.errorCode = res.data.code;
                    this.errorMessage = res.data.message;
                }
            }).catch(res => {
                console.log(res);
            });
        },
        upbtn () {
            this.newbindamountshow = true;
            this.jqyzFailShow = false;
        },
        closejqyzFailShow () {
            this.jqyzFailShow = false;
            this.jqyzshow = false;
        },
        // 选择提现账户选择的事件
        changeRadio (v) {
            this.too = v;
            this.rolloffShow = true;
        },
        //  清空表单
        closeDialog () {
            this.form.recvAccNo = '';
            this.form.bankOfDepositName = '';
            this.form.provinceName = '';
            this.form.cityName = '';
            this.form.latticePoint = '';
            this.authAmt = '';
        }
    }
};
</script>
<style lang="scss" scoped>
    .rollOut {
        .fontWeight{
            font-weight: bold;
        }
        .money-account-common{
            .zjzh{
                padding: 20px 8px;
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
            p{
                margin-bottom: 10px;
                margin-left: 20px;
            }
        }
        .hopefather{
            position: relative;
            .hopechildren{
                position: absolute;
                top: 0;
                right: 0;
            }
            .hopeSpan{
                position: absolute;
                top: 34px;
                right: -8px;
                color: #F5A623;
                font-size: 12px;
            }
        }
        .mybtnbindnew{
            margin-right: 10px;
            margin-bottom: 10px;
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
                .myimg{
                    margin-top: 20px;
                }
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
                padding: 20px 8px
            }
            .div2{
                font-size: 14px;
                padding: 0px 30px;
                .span1{
                    margin-right: 30px;
                }
                .span2{
                    color: #4A90E2;
                }
                .span2:hover{
                    cursor: pointer;
                }
            }
            .div3{
                font-size: 14px;
                color: #666666;
                padding: 20px 30px;
                i{
                    margin-left: 5px;
                }
                .div3-span1{
                    width: 150px;
                    margin-left: 5px;
                    margin-right: 20px;
                    display: inline-block;
                }
                .div3-span2{
                    width: 150px;
                    display: inline-block;
                }
                .div3-span4{
                    margin-left: 60px;
                    color: #4A90E2;
                }
                .bottom-radio{
                    margin-bottom: 20px;
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
        .el-radio__input.is-checked+.el-radio__label{
            color: #666;
        }
        .passwordDialog{
            .el-dialog__body{
                padding: 20px 30px;
            }
        }
        .jqdialog-rollOut{
            .el-dialog__body{
                padding: 20px 30px;
            }
        }
    }
</style>
