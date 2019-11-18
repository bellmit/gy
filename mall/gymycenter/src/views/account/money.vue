<template>
    <div class="new-money-account">
        <div class="new-title-public">
            资金账户
        </div>
        <div class="new-bank-zj">
            <p class="zjzh-title1" v-show="pinganData2.length!=0||pinganData1.length!=0"><i class="iconfont icon-zijinzhanghuicon mewmyicon"></i> <span class="mewmyfont">资金账户1</span></p>
            <div class="new-bank-box" v-show="pinganData2.length!=0||pinganData1.length!=0">
                <div class="left-img"> <img src="../../assets/images/pab.png"/></div>
                <div class="right-box">
                    <div class="wa-title">
                        为了区分收入和支出款项，平安银行将子账户分为商户子账户和普通子账户。
                        其中商户子账户用于收款，无法充值，普通子账户用于付款，请在交易前充值。两个子账户需绑定实体卡。
                    </div>
                    <div class="zh-box">
                        <div>
                            <el-row>
                                <el-col :span="14">
                                    <div class="title1 my_top">户名：{{companyName}}</div>
                                    <div class="subaccount-father">
                                        <div class="subaccount-child1">
                                            <span>请进行子账户绑卡</span>
                                        </div>
                                        <div class="subaccount-child2">
                                            <el-checkbox-group v-model="subaccountValue">
                                                <el-checkbox style="width: 110px;"  label="1" disabled>商户子账户</el-checkbox>
                                                <el-checkbox label="2" disabled>普通子账户</el-checkbox>
                                            </el-checkbox-group>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="10">
                                    <div class="mybtn2">
                                        <button @click="bindamountAll()" class="gy-button-extra">绑卡</button>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="zh-box top-gz" v-show="pinganData2.length!=0">
                        <el-row>
                            <el-col :span="14">
                                <div class="title1">商户子账户：{{pinganData2.bankAccount}}</div>
                                <div class="title2">
                                    <span>账户余额（元）</span>
                                    <span>冻结余额（元）</span>
                                    <span>可用余额（元）</span>
                                </div>
                                <div class="title3">
                                    <span>{{pinganData2.accountBalance|numToCash}}</span>
                                    <span>{{pinganData2.blockedBalance|numToCash}}</span>
                                    <span>{{pinganData2.actualBalance|numToCash}}</span>
                                </div>
                            </el-col>
                            <el-col :span="10">
                                <div class="mybtn">
                                    <button @click="detail(pinganData2.bankAccId,pinganData2.bankName)" class="gy-button-extra">明细</button>
                                    <button class="gy-button-normal" @click="roolout(pinganData2.bankAccId,pinganData2)">提现</button>
                                    <button class="gy-button-normal" @click="insideRoolout(pinganData2.bankAccId)">内部转账</button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="zh-box top-gz" v-show="pinganData1.length!=0">
                        <el-row>
                            <el-col :span="14">
                                <div class="title1">普通子账户：{{pinganData1.bankAccount}}</div>
                                <div class="title2">
                                    <span>账户余额（元）</span>
                                    <span>冻结余额（元）</span>
                                    <span>可用余额（元）</span>
                                </div>
                                <div class="title3">
                                    <span>{{pinganData1.accountBalance|numToCash}}</span>
                                    <span>{{pinganData1.blockedBalance|numToCash}}</span>
                                    <span>{{pinganData1.actualBalance|numToCash}}</span>
                                </div>
                            </el-col>
                            <el-col :span="10">
                                <div class="mybtn">
                                    <button @click="detail(pinganData1.bankAccId,pinganData1.bankName)" class="gy-button-extra">明细</button>
                                    <button class="gy-button-normal" @click="shiftto(pinganData1.bindStatus,pinganData1)">充值</button>
                                    <button class="gy-button-normal" @click="roolout(pinganData1.bankAccId,pinganData1)">提现</button>
                                    <button class="gy-button-normal" @click="insideRoolout(pinganData1.bankAccId)">内部转账</button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
            <p class="zjzh-title2" v-show="eciticData.length!=0"> <i class="iconfont icon-zijinzhanghuicon mewmyicon"></i> <span class="mewmyfont">资金账户{{pinganData2.length!=0||pinganData1.length!=0?'2':'1'}}</span></p>
            <!--中信-->
            <div class="new-bank-box" v-show="eciticData.length!=0">
                <div class="left-img"> <img :src="eciticData.bigIcon"/></div>
                <div class="right-box">
                    <div class="zh-box">
                        <el-row>
                            <el-col :span="14">
                                <div class="title1">子账户：{{eciticData.bankAccount}}</div>
                                <div class="title2">
                                    <span>账户余额（元）</span>
                                    <span>冻结余额（元）</span>
                                    <span>可用余额（元）</span>
                                </div>
                                <div class="title3">
                                    <span>{{eciticData.accountBalance|numToCash}}</span>
                                    <span>{{eciticData.blockedBalance|numToCash}}</span>
                                    <span>{{eciticData.actualBalance|numToCash}}</span>
                                </div>
                            </el-col>
                            <el-col :span="10">
                                <div class="mybtn">
                                    <button @click="detail(eciticData.bankAccId,eciticData.bankName)" class="gy-button-extra">明细</button>
                                    <button @click="shiftto2(eciticData.bankAccId)" class="gy-button-normal">充值</button>
                                    <button @click="roolout(eciticData.bankAccId,eciticData)" class="gy-button-normal">提现</button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog  width="850px" title="充值资金提示" :visible.sync="isShiftto">
            <div class="shifttoDia">
                <div>
                    <img class="LedgerImg" :src="Ledger.bigIcon" alt="">
                </div>
                <div class="gy-form-group single-row" v-if="Ledger.bankId === 2">
                    <span class="l">账号名称</span>
                    <div>上海国烨跨境电子商务有限公司</div>
                </div>
                <div class="gy-form-group single-row" v-else>
                    <span class="l">账号名称</span>
                    <div>{{Ledger.usrCompanyName}}</div>
                </div>
                <div class="gy-form-group single-row" v-if="Ledger.bankId === 2">
                    <span class="l">账号</span>
                    <div>15000095778492</div>
                </div>
                <div class="gy-form-group single-row" v-else>
                    <span class="l">账号</span>
                    <div>{{Ledger.bankAccount}}</div>
                </div>
                <div class="gy-form-group single-row" v-if="Ledger.bankId === 2">
                    <span class="l">开户网点</span>
                    <div>平安银行长沙分行营业部</div>
                </div>
                <div class="gy-form-group single-row" v-else>
                    <span class="l">开户网点</span>
                    <div>中信银行上海分行浦东分行世纪大道网点</div>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l tip">温馨提示：</span>
                    <p>请按显示的银行电子账户号信息进行资金充值。</p>
                    <p>如果您在资金充值过程中有什么疑问请联系我们客服。</p>
                    <p>客服电话：400-777-6777.</p>
                </div>
            </div>
        </el-dialog>
        <!--平安银行转入弹窗-->
        <!--第一步未完成的时候-->
        <el-dialog  width="850px" title="充值资金提示" :visible.sync="safetyShowZrw" class="safetyShowZr jqdialog">
            <div class="shifttoDia">
                <div>
                    <img src="../../assets/images/pab.png" class="img-bank"/>
                </div>
                <div class="my-box">
                    <div class="box1">
                        <img src="../../assets/images/step.png" class="left-step"/>
                    </div>
                    <div class="box2">
                        <div class="top2">
                            <span class="fontWeight">第一步</span><span class="fontWeight">绑定账号</span> <i style="color: red" class="iconfont icon-fail"></i>  <span>未完成</span>
                        </div>
                        <div class="top3">
                            请先绑定银行卡，然后使用绑定银行卡充值到以下账户，充值完成后银行将实时增加您的子账户余额。<span class="highlight">注：如果使用非绑定银行卡充值，将无法成功到账。</span>
                        </div>
                        <div class="top5">
                            <i class="iconfont icon-bank2" style="font-size: 12px"></i>
                            <span @click="bindamount">绑定新的账号</span>
                            <i class="iconfont icon-certificateInformation" style="margin-left: 15px"></i>
                            <span @click="manageBankZh">管理绑定账号</span>
                        </div>
                        <div class="top2 fontWeight">第二步  线下充值</div>
                        <div class="top4">
                            请先完成第一步后再进行充值。
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
        <!--第一步完成的时候-->
        <el-dialog title="充值资金提示" :visible.sync="safetyShowZr" class="safetyShowZr jqdialog" width="850px">
            <div class="shifttoDia">
                <div>
                    <img src="../../assets/images/pab.png" class="img-bank"/>
                </div>
                <div class="my-box">
                    <div class="box1">
                        <img src="../../assets/images/steplong.png" class="left-step"/>
                    </div>
                    <div class="box2">
                        <div class="top2">
                            <span class="fontWeight">第一步 </span><span class="fontWeight">绑定账号</span> <i class="iconfont icon-success"></i>  <span>已完成</span>
                        </div>
                        <div class="top3">
                            请先绑定银行卡，然后使用绑定银行卡充值到以下账户，充值完成后银行将实时增加您的子账户余额。<span class="highlight">注：如果使用非绑定银行卡充值，将无法成功到账。</span>
                        </div>
                        <div class="top5">
                             <i class="iconfont icon-bank2" style="font-size: 12px"></i>
                            <span @click="bindamount">绑定新的账号</span>
                            <i class="iconfont icon-certificateInformation" style="margin-left: 15px"></i>
                            <span @click="manageBankZh">管理绑定账号</span>
                        </div>
                        <div class="top2 fontWeight">第二步 线下充值</div>
                        <div class="top4">
                            <el-row :gutter="10">
                                <el-col :span="16" class="list-top">
                                    <el-row>
                                        <el-col :span="5" class="list-left-span">账号名称</el-col>
                                        <el-col :span="19" class="list-right-span">平安银行电子商务交易资金待清算专户(国烨网)<span class="copy" v-clipboard:copy="copyText" v-clipboard:success="onCopy"><i class="iconfont icon-copy"></i> 复制</span></el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="8" class="list-top">
                                    <el-row>
                                        <el-col :span="7" class="list-left-span">银行账号</el-col>
                                        <el-col :span="17" class="list-right-span">15000097982312</el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <el-row :gutter="10">
                                <el-col :span="16" class="list-top">
                                    <el-row>
                                        <el-col :span="5" class="list-left-span">开户银行</el-col>
                                        <el-col :span="19" class="list-right-span">平安银行长沙分行营业部</el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="8"></el-col>
                            </el-row>
                            <el-row class="list-top list-right-span">请按显示的银行账户号信息进行资金充值。<span class="highlight">注：请确保户名输入正确，特别是括号为半角，建议您进行复制粘贴。</span>如果您在资金充值过程中有什么疑问请联系我们客服。客服电话：400-777-6777.</el-row>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
        <!---->
        <el-dialog  class="jqdialog" title="管理绑定账号"  width="850px" :visible.sync="isPanel">
            <div>
                <table  class="gy-table">
                    <thead>
                    <tr  class="title">
                        <td>收款账号</td>
                        <td>开户银行</td>
                        <td>操作</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in mymanageBankData" :key="index">
                        <td>{{item.accountNo}}</td>
                        <td>{{item.latticeName}}</td>
                        <td style="text-align: center">
                            <button class="gy-button-view" @click="jbSubmit(item)">解绑</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div v-show="mymanageBankData.length == 0" style="text-align: center">没有数据</div>
            </div>
        </el-dialog>
        <!--新增弹窗-->
        <el-dialog  @close="closeDialog" class="jqdialog" width="610px" title="绑定新的账号" :visible.sync="newbindamountshow" :close-on-click-modal="false">
            <div class="jqyz1">
                <div>
                    <el-row :gutter="60">
                        <el-col :span="24" class="my_top">
                            <el-row>
                                <el-col :span="4"  class="list-left-span" style="padding-left: 15px;">账号名称</el-col>
                                <el-col :span="20" class="list-right-span" style="padding-left: 10px;">{{companyName}}</el-col>
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
        <!--鉴权验证-->
        <el-dialog  @close="closeDialog" class="jqdialog"  width="850px" title="鉴权验证" :visible.sync="jqyzshow">
            <div class="jqyz1">
                请查收鉴权账户收款记录，并回填平安银行对鉴权账户打款金额数字(24小时内有效)。
                信息正确后，即可完成账号绑定。
            </div>
            <div class="jqyz2">
                <el-row :gutter="60">
                    <el-col :span="12" class="list-top">
                        <el-row>
                            <el-col :span="5" class="list-left-span">账号名称</el-col>
                            <el-col :span="19" class="list-right-span">{{companyName}}</el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="list-top">
                        <el-row>
                            <el-col :span="5" class="list-left-span">银行账号</el-col>
                            <el-col :span="19" style="padding-left: 10px;" class="list-right-span">{{myNewrecvAccNo}}</el-col>
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
                                <input class="gy-input" v-model="authAmt" placeholder="请输入">
                            </el-col>
                            <span class="list-right-span">元</span>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <button  class="gy-button-extra mybtnbindnew" @click="newPost2">确认</button>
            </div>
        </el-dialog>
        <!--鉴权验证失败-->
        <el-dialog class="jqdialog"  width="850px" title="提示" :visible.sync="jqyzFailShow">
            <div class="jqyz1">
                <p><i style="color: red;margin-left: -20px" class="iconfont icon-fail"></i>  绑定失败，以下是详细信息</p>
                <p>错误代码:{{errorCode}}</p>
                <p>错误说明:{{errorMessage}}</p>
            </div>
            <div slot="footer" class="dialog-footer">
                <button  class="gy-button-extra" @click="upbtn">上一步</button>
                <button  class="gy-button-normal" @click="closejqyzFailShow">确认</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);

export default {
    name: 'money-account',
    data () {
        return {
            subaccountValue: ['1', '2'],
            companyName: JSON.parse(localStorage.getItem('userInfo')).companyName,
            statusDialog: '',
            myNewrecvAccNo: '',
            myNewbankOfDepositName: '',
            isPanel: false,
            accounts: [],
            pinganData1: [],
            pinganData2: [],
            eciticData: [],
            pageNo: 1,
            pageSize: 10,
            // selectedBank: '',
            bankAccId: null,
            fundAccId: null,
            bankName: null,
            bankId: null,
            // 开始Dialog
            isShiftto: false,
            // 转入Dialog
            Ledger: {},
            // exportInfo: {
            //     subAccNo: null,
            //     bankName: null,
            //     fundId: null,
            //     startDate: null,
            //     endDate: null
            // },
            // lookForm: {},
            safetyShowZr: false, //   新增平安银行的转入提示框完成
            safetyShowZrw: false, //   新增平安银行的转入提示框未完成
            manageBankData: [], //   新增平安银行的转入提示框未完成
            mymanageBankData: [], //   新增平安银行的转入提示框未完成
            newbindamountshow: false,
            bankOfDepositName: null, // 开户银行
            bankInfo: {}, // 资金账户信息
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
            bankTypeList: [], // 开户银行List
            provinceList: [], // 省List
            cityList: [], // 市List
            latticePointList: [], // 网点List
            jqyzshow: false, // 鉴权验证弹窗
            authAmt: '',
            errorCode: '',
            errorMessage: '',
            jqyzFailShow: false, // 鉴权验证弹窗
            base: {
                fundId: JSON.parse(localStorage.getItem('bankAccId')), //  第一次 进入页面参数选择提现的银行账户ID
                companyId: null // 公司ID
            },
            copyText: '平安银行电子商务交易资金待清算专户(国烨网)'
        };
    },
    methods: {
        getAccountList () {
            // 获取资金账户信息
            const me = this;
            me.$http.post(me.$api.payment.companyAccount,
                {}
            ).then(response => {
                if (response.data.code === 0) {
                    me.accounts = response.data.data;
                    me.bankAccId = me.accounts[0].bankAccId;
                    // me.selectedBank = me.accounts[0].bankName;
                    //  平安银行重新定义
                    for (let i = 0; i < response.data.data.length; i++) {
                        if (response.data.data[i].alias === 'pingan') {
                            // 1是普通 2 是商户
                            if (response.data.data[i].bankFlag === 1) {
                                this.pinganData1 = response.data.data[i];
                            } else if (response.data.data[i].bankFlag === 2) {
                                this.pinganData2 = response.data.data[i];
                            }
                        }
                        if (response.data.data[i].alias === 'ecitic') {
                            // 中信的数据
                            this.eciticData = response.data.data[i];
                        }
                    }
                } else {
                    me.$message(response.data.message);
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        // 转入
        shiftto (v, f) {
            console.log(f);
            this.manageBankData = f;
            this.statusDialog = v;
            if (v === 2) {
            // 绑定成功
                this.safetyShowZr = true;
            } else {
                this.safetyShowZrw = true;
            }
            // this.init(this.$api.payment.withdrawInfo, {
            //     queryAcctInfoIfNecessary: false
            // });
        },
        // 绑定新的账号
        manageBankZh () {
            this.safetyShowZrw = false;
            this.safetyShowZr = false;
            this.isPanel = true;
            this.$http.post(this.$api.payment.useAccounts, {
                companyId: this.manageBankData.usrCompanyId,
                subAcctNo: this.manageBankData.bankAccount,
                fundId: this.manageBankData.bankAccId
            }).then(res => {
                if (res.data.code === 0) {
                    this.mymanageBankData = res.data.data;
                } else {
                    this.isPanel = false;
                    this.$message(res.data.message, '提示', {
                        type: 'error'
                    });
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        // 管理新的账号
        // 开启收款账号名册
        // 转出
        roolout (bankAccId, v) {
            this.$router.push({name: v.alias, query: bankAccId});
            localStorage.setItem('bankAccId', JSON.stringify(bankAccId));
        },
        shiftto2 (bankId) {
            const me = this;
            me.isShiftto = true;
            me.$http.post(me.$api.payment.recharge, {fundId: bankId})
                .then(function (res) {
                    if (res.data.code === 0) {
                        let data = res.data.data;
                        me.Ledger = Object.assign({}, data);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        },
        // 内部转账
        insideRoolout (bankAccId, v) {
            this.$router.push({name: 'internalTransfer', query: {bankAccId: bankAccId}});
        },
        // 明细记录查询
        detail (id, name) {
            sessionStorage.setItem('newBankValue', name);
            this.$router.push({
                name: 'newBank',
                query: {
                    fundAccId: id
                }
            });
        },
        // 解绑
        jbSubmit (v) {
            this.$alert('请确认是否解绑？', '提示', {type: 'warning'})
                .then(() => {
                    this.$http.post(this.$api.payment.unbindCardInfo, {
                        fundId: this.manageBankData.bankAccId,
                        tranNetMemberCode: v.usrCompanyId,
                        subAcctNo: v.subAcctNo,
                        memberAcctNo: v.accountNo
                    }).then(res => {
                        if (res.data.code === 0) {
                            if (res.data.data.code === 0) {
                                this.manageBankZh();
                                this.$message({
                                    message: '解绑成功',
                                    type: 'success'
                                });
                            } else {
                                this.$message.error(res.data.data.message);
                            }
                        } else {
                            this.safetyShowZr = false;
                            this.safetyShowZrw = false;
                            this.isPanel = false;
                            this.$message.error(res.data.message);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                });
        },
        // 绑定新的提现账户
        bindamount () {
            // 打开弹窗
            this.safetyShowZrw = false;
            this.safetyShowZr = false;
            this.form.accountNo = this.pinganData1.bankAccount;
            this.form.fundId = this.pinganData1.bankAccId;
            this.newbindamountshow = true;
        },
        bindamountAll () {
            if (this.subaccountValue.includes('1') && this.subaccountValue.includes('2')) {
                console.log('1,2');
                console.log(this.pinganData2.bankAccount + ',' + this.pinganData1.bankAccount);
                this.form.accountNo = this.pinganData2.bankAccount + ',' + this.pinganData1.bankAccount;
                this.form.fundId = this.pinganData2.bankAccId + ',' + this.pinganData1.bankAccId;
                this.newbindamountshow = true;
            } else {
                if (this.subaccountValue.includes('1')) {
                    console.log('1');
                    this.form.accountNo = this.pinganData2.bankAccount;
                    this.form.fundId = this.pinganData2.bankAccId;
                    this.newbindamountshow = true;
                } else if (this.subaccountValue.includes('2')) {
                    console.log('2');
                    this.form.accountNo = this.pinganData1.bankAccount;
                    this.form.fundId = this.pinganData1.bankAccId;
                    this.newbindamountshow = true;
                } else {
                    this.$message.error('请选择子账户进行绑卡', '提示', {
                        type: 'error'
                    });
                }
            }
        },
        newPost () {
            if (!this.check()) return false;
            this.form.companyId = this.pinganData2.usrCompanyId;
            this.form.bankName = this.pinganData2.bankName;
            this.form.bankId = this.pinganData2.fundAccId;
            this.form.recvAccNm = this.companyName;
            this.$http.post(this.$api.payment.bindAuthenticateCard, this.form)
                .then(res => {
                    console.log(res.data.code === 0);
                    if (res.data.code === 0) {
                        if (res.data.data.data.code === 0) {
                            this.newbindamountshow = false;
                            this.jqyzshow = true;
                            this.myNewrecvAccNo = this.form.recvAccNo;
                            this.myNewbankOfDepositName = this.form.bankOfDepositName;
                        } else {
                            // this.newbindamountshow = false;
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
                'subAcctNo': this.form.accountNo,
                'tranNetMemberCode': this.pinganData2.usrCompanyId,
                'takeCashAcctNo': this.myNewrecvAccNo,
                'authAmt': this.authAmt,
                'fundId': this.form.fundId,
                'bankName': this.pinganData2.bankName
            }).then(res => {
                if (res.data.code === 0) {
                    if (res.data.data.data.code === 0) {
                        this.$alert('绑定成功', '提示', {type: 'success'})
                            .then(() => {
                                this.jqyzshow = false;
                                this.safetyShowZr = false;
                                this.safetyShowZrw = false;
                            });
                    } else {
                        this.jqyzFailShow = true;
                        this.errorCode = res.data.data.data.code;
                        this.errorMessage = res.data.data.data.message;
                        // this.$message.error('绑定失败');
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
        //  清空表单
        closeDialog () {
            this.form.recvAccNo = '';
            this.form.bankOfDepositName = '';
            this.form.provinceName = '';
            this.form.cityName = '';
            this.form.latticePoint = '';
            this.authAmt = '';
        },
        latticePointChange (v) {
            for (let i = 0; i < this.latticePointList.length; i++) {
                if (this.latticePointList[i].bankNo === v) {
                    this.form.latticePoint = this.latticePointList[i].bankName;
                    this.form.branchId = this.latticePointList[i].bankNo;
                }
            }
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
            return true;
        },
        closejqyzFailShow () {
            if (this.statusDialog === 2) {
                // 绑定成功
                this.safetyShowZr = true;
            } else {
                this.safetyShowZrw = true;
            }
            this.jqyzFailShow = false;
            this.jqyzshow = false;
        },
        onCopy () {
            this.$message.success('复制成功，直接粘贴吧');
        },
        init (url, params) {
            const me = this;
            me.$http.post(url, params)
                .then(res => {
                    if (res.data.code === 0) {
                        let data = res.data.data;
                        me.bankTypeList = data.lattice_points;
                        me.provinceList = data.areas;
                        // me.bankInfo = Object.assign({}, data.bank);
                        me.base.companyId = me.bankInfo.usrCompanyId;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        }
    },
    created: function () {
        this.getAccountList();
        this.init(this.$api.payment.withdrawInfo, {
            queryAcctInfoIfNecessary: false
        });
    }
};
</script>
<style lang="scss" scoped>
    .left-step{
        width: auto !important;
        height: auto !important;
    }
    .copy{
        color: #4a90e2;
        cursor: pointer;
        margin-left: 10px;
    }
    .new-money-account {
        .fontWeight{
            font-weight: bold;
        }
        .w50 {
            width: 50%;
        }
        .lf {
            float: left;
        }
        .required {
            display: inline-block;
            width: 15px;
            color: #E0370F;
        }
        .jqyz1{
            p{
                margin-bottom: 10px;
                margin-left: 20px;
            }
        }
        .button-r {
            float: right;
            a {
                color: #fff;
            }
        }
        background-color: #fff;
        .shifttoDia {
            // padding-top: -20px;
            .LedgerImg {
                width: 120px;
                height: 43px;
            }
        }
        .tip {
            color: #F2AC4C;
        }
        .gy-form-group {
            float: initial;
        }
        .common-padding {
            padding: 0 10px;
        }
        .money-account-tit {
            background: #fff;
            padding: 6px 10px;
        }
        .money-account-common {
            padding: 20px 14px;
        }
        .money-accounts-left-amount {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .money-accounts-right {
            text-align: center;
            .icon-Download {
                font-size: 30px;
            }
        }
        .money-accounts-left-items {
            margin-left: 30px;
            .box1{
                font-weight: bold;
                color: #333333;
            }
        }
        .userCenter .date-picker {
            width: 50%;
            margin-top: 0;
        }
        .money-account-query {
            margin: 20px 0;
        }
        .money-account-query-btns {
            margin: 20px 0 10px 0;
            text-align: right;
        }
        .money-account-query-bank {
            width: 40%;
            // margin-left: 20px;
            .el-select {
                width: 60%;
            }
        }
        .el-radio-group {
            margin-top: 20px;
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
        .money-accounts-left-amount {
            margin: 10px 0 20px 0;
        }
        .createPayment-status-right-cancel {
            margin-left: 10px;
        }

        .money-accounts-result {
            border: 1px solid #E7ECF1;
        }

        .money-accounts-result-th {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            background: rgba(238, 243, 248, 1);
            .money-accounts-result-th-item{
                font-weight: bold;
                font-size: 12px;
            }
        }
        .money-accounts-result-tb-item {
            display: flex;
            justify-content: space-between;
            padding: 0 10px;
            height: 40px;
            line-height: 40px;
            font-weight: bold;
        }
        .money-accounts-result-tb-item-colum {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
        }
        .money-accounts-result-th-item-look {
            text-align: center;
        }
        .result-item-width10 {
            width: 10%;
        }
        .result-item-width20 {
            width: 20%;
        }
        .safetyShowZr{
            .img-bank {
                width: 120px;
                height: 43px;
            }
            .my-box{
                overflow: hidden;
                width: 100%;
                .box1{
                    float: left;
                    width: 4%;
                    margin-top: 25px;
                }
                .box2{
                    float: left;
                    width: 96%;
                    .top2{
                        font-size: 14px;
                        color: #333333;
                        margin-top: 20px;
                        i{
                            color: #7ED321;
                            margin-left: 10px;
                        }
                    }
                    .top3{
                        font-size: 14px;
                        color: #666;
                        margin-top: 10px;
                    }
                    .top5{
                        font-size: 14px;
                        color: #4A90E2;
                        margin-top: 13px;
                        i{
                            font-size: 14px;
                            margin-right: 5px;
                        }
                    }
                    .top5:hover{
                        cursor: pointer;
                    }
                }
            }
        }
        .new-bank-zj{
            .new-bank-box{
                overflow: hidden;
                /*border-bottom: 1px solid #e6eaea;*/
                margin: 20px 30px;
                .left-img{
                    float: left;
                    width: 112px;
                    height: 42px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .right-box{
                    float: left;
                    margin-left: 30px;
                    width: 740px;
                    .wa-title{
                        margin-bottom: 20px;
                    }
                    .zh-box{
                        .my-left-font{
                            padding-left: 20px;
                        }
                        .title1{
                            font-weight: bold;
                            font-size: 14px;
                            color: #333333;
                        }
                        .title2{
                            color: #666666;
                            margin-top: 10px;
                            padding-left: 15px;
                            span{
                                width: 135px;
                                display: inline-block;
                            }
                        }
                        .title3{
                            color: #333333;
                            margin-top: 10px;
                            padding-left: 15px;
                            span{
                                width: 135px;
                                display: inline-block;
                                font-weight: bold;
                            }
                        }
                        .mybtn{
                            margin-top: 60px;
                            text-align: right;
                        }
                        .mybtn2{
                            margin-top: 25px;
                            text-align: right;
                        }
                        .subaccount-father{
                            overflow: hidden;
                            padding-left: 15px;
                            .subaccount-child1{
                                float: left;
                                width: 140px;
                            }
                            .subaccount-child2{
                                   float: left;
                               }
                            .subaccount-child3{
                                float: left;
                            }
                        }
                    }
                    .top-gz{
                        margin-top: 20px;
                    }
                }
            }
            .zjzh-title1{
                padding: 20px 10px 0 10px;
            }
            .zjzh-title2{
                margin: 0 10px 0 10px;
                padding-top: 10px;
            }
        }
        .tabstable {
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
        button:hover{
            cursor: pointer;
        }
        .my_top{
            margin-bottom: 10px;
        }
        .mybtnbindnew{
            margin-right: 10px;
            margin-bottom: 10px;
        }
    }
</style>
<style lang="scss">
    .new-money-account{
        .jqdialog{
            .el-dialog__body{
                padding: 20px 30px;
            }
        }
    }
</style>
