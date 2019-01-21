<template>
    <div class="account-company">
        <div class="add-comapny">
            <h3>公司信息及功能<span class="showtemplate" @click="showtemplate('1')">开通相关认证所需资料说明</span></h3>
            <template v-if="!isShowTemplate">
                <ul class="tab">
                    <li v-for="(item, index) in tabMenu" :key="item.id"
                        :class="[{'selected': tabMenuSelected === index}, 'iconfont', companyIcon[index]]"
                        @click="tabChange(index)">
                        <dl>
                            <dt>{{item.value}}<i :class="['iconfont', companyStatusIcon[item.status]]"></i></dt>
                            <dd>{{ companyStatus[index] && companyStatus[index][item.status] }}</dd>
                        </dl>
                    </li>
                </ul>
                <div v-show="tabMenuSelected === 0">
                    <div class="tips" v-if="companyInfo.authStatus === 3">
                        <i class="iconfont icon-tipserror"></i><span>公司上传认证信息有误，请重新提交！</span>
                    </div>
                    <form action="javascript:;" ref="companyInfo" :rules="ruleCompany">
                        <div class="gy-form">
                            <div class="gy-form-group">
                                <span class="l"><strong>*</strong>公司名称</span>
                                <input type="text" v-model="companyInfo.name"
                                       :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2">
                            </div>
                            <div class="gy-form-group">
                                <span class="l"><strong>*</strong>公司电话</span>
                                <input type="text" v-model="companyInfo.phone"
                                       :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2">
                            </div>
                            <div class="gy-form-group">
                                <span class="l"><strong>*</strong>公司邮箱</span>
                                <input type="text" v-model="companyInfo.email"
                                       :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2">
                            </div>
                            <div class="gy-form-group">
                                <span class="l"><strong>*</strong>公司类型</span>
                                <el-select v-model="companyInfo.companyTypeId" placeholder="请选择公司类型"
                                           :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2">
                                    <el-option
                                        v-for="item in companyTypeList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="gy-form-group form-group-address">
                                <span class="l"><strong>*</strong>公司地址</span>
                                <el-select v-model="companyInfo.provinceId" placeholder="请选择省"
                                           class="select-province"
                                           :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2"
                                           style="margin-right: 0;">
                                    <el-option
                                        v-for="item in provinceList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="companyInfo.cityId" placeholder="请选择市"
                                           class="select-province"
                                           :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2"
                                           style="margin-right: 0;">
                                    <el-option
                                        v-for="item in cityList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="companyInfo.districtId" placeholder="请选择区" class="select-province"
                                           :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2"
                                           style="margin-right: 0;">
                                    <el-option
                                        v-for="item in districtList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                <input type="text" v-model="companyInfo.address"
                                       :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2"
                                       class="address">
                            </div>
                            <div class="gy-form-group single-row" v-show="companyInfo.companyTypeId === 1">
                                <span class="l">危化品资质</span>
                                <gy-upload
                                    :url="imgApi"
                                    list-type="picture-card"
                                    :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2"
                                    v-model="imgList.dangerous.list"
                                    :upload-data="{filetype: imgList.dangerous.type}">
                                </gy-upload>
                            </div>
                            <div v-show="companyInfo.companyTypeId === 2">
                                <div class="gy-form-group single-row">
                                    <span class="l"><strong>*</strong>运输资料</span>
                                    <gy-upload
                                        :url="imgApi"
                                        :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2"
                                        v-model="imgList.transInfo.list"
                                        :upload-data="{filetype: imgList.transInfo.type}">
                                    </gy-upload>
                                </div>
                                <div class="gy-form-group single-row">
                                    <span class="l"><strong>*</strong>承运范围</span>
                                    <label><input
                                        :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2"
                                        v-model="carriageScope" type="checkbox" name="scope" value="0">危化品</label>
                                    <label><input
                                        :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2"
                                        v-model="carriageScope" type="checkbox" name="scope" value="1">普货</label>
                                </div>
                            </div>
                            <div class="gy-form-group single-row" v-show="companyInfo.companyTypeId === 3">
                                <span class="l"><strong>*</strong>仓储危险品经营许可证</span>
                                <gy-upload
                                    :url="imgApi"
                                    :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2"
                                    v-model="imgList.storage.list"
                                    :upload-data="{filetype: imgList.storage.type}">
                                </gy-upload>
                            </div>
                            <div class="gy-form-group single-row">
                                <span class="l"><strong>*</strong>三证</span>
                                <p class="license-tips">(请根据公司情况上传三证合一或三证照片)</p>
                                <div class="license-upload-box">
                                    <div class="item">
                                        <input :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2"
                                               type="radio" v-model="licenseOption" name="licenseOption" value="0">
                                        <div class="button-box">
                                            <gy-upload
                                                :url="imgApi"
                                                :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2"
                                                v-model="imgList.certificate.list"
                                                :limit="1"
                                                :upload-data="{filetype: imgList.certificate.type}">
                                            </gy-upload>
                                            <span class="name">三证合一</span>
                                        </div>
                                        <!--<span class="mask" v-show="Number(licenseOption) === 1 || (companyInfo.authStatus === 1 || companyInfo.authStatus === 2)"></span>-->
                                    </div>
                                    <div class="item">
                                        <input
                                            :disabled="(licenseOption !==  '0' || companyInfo.authStatus === 1 || companyInfo.authStatus === 2) && companyInfo.authStatus !== 0"
                                            type="radio" v-model="licenseOption" name="licenseOption" value="1">
                                        <div class="button-box">
                                            <gy-upload
                                                :url="imgApi"
                                                :disabled="licenseOption !==  '1' || companyInfo.authStatus === 1 || companyInfo.authStatus === 2"
                                                v-model="imgList.business.list"
                                                :limit="1"
                                                :upload-data="{filetype: imgList.business.type}">
                                            </gy-upload>
                                            <span class="name">营业执照</span>
                                        </div>
                                        <div class="button-box">
                                            <gy-upload
                                                :url="imgApi"
                                                :disabled="licenseOption !==  '1' || companyInfo.authStatus === 1 || companyInfo.authStatus === 2"
                                                v-model="imgList.orgCode.list"
                                                :limit="1"
                                                :upload-data="{filetype: imgList.orgCode.type}">
                                            </gy-upload>
                                            <span class="name">组织机构代码</span>
                                        </div>
                                        <div class="button-box">
                                            <gy-upload
                                                :url="imgApi"
                                                :disabled="licenseOption !== '1' || companyInfo.authStatus === 1 || companyInfo.authStatus === 2"
                                                v-model="imgList.tax.list"
                                                :limit="1"
                                                :upload-data="{filetype: imgList.tax.type}">
                                            </gy-upload>
                                            <span class="name">税务登记证</span>
                                        </div>
                                        <!--<span class="mask" v-show="Number(licenseOption) === 0 || (companyInfo.authStatus === 1 || companyInfo.authStatus === 2)"></span>-->
                                    </div>
                                </div>
                            </div>
                            <div class="gy-form-group single-row authen-apply">
                                <div class="l"><strong>*</strong>管理员授权书
                                    <a class="template-file" :href="templateFile.authen[companyInfo.companyTypeId]">下载模板</a>
                                </div>
                                <gy-upload
                                    :url="imgApi"
                                    :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2"
                                    v-model="imgList.authen.list"
                                    :upload-data="{filetype: imgList.authen.type}">
                                </gy-upload>
                            </div>
                            <div class="gy-form-button">
                                <button class="gy-button-extra" @click="authSubmit('put')"
                                        v-if="companyInfo.authStatus === 3">修改
                                </button>
                                <button class="gy-button-extra" @click="authSubmit('post')"
                                        v-if="companyInfo.authStatus === 0">提交
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div v-show="tabMenuSelected === 1" class="pop-inner ca-wrap">
                    <dl class="t">
                        <dt>电子签章（CA交割）</dt>
                        <dd>上传的文件需为加盖公章的扫描件，展示风格支持jpg，jpeg，gif，png风格，支持2M以内的图片。</dd>
                    </dl>
                    <form action="javascript:;" name="cacompany">
                        <div class="gy-form">
                            <div class="gy-form-group single-row card-group">
                                <span class="l"><strong>*</strong>法人身份证</span>
                                <gy-upload
                                    :url="imgApi"
                                    :disabled="caInfo.caStatus === 1 || caInfo.caStatus === 2"
                                    v-model="imgList.idCard.list"
                                    :limit="2"
                                    :upload-data="{filetype: imgList.idCard.type}">
                                </gy-upload>
                                <span v-show="imgList.idCard.list.length < 2" class="card-tips">请上传正反面身份证。</span>
                            </div>
                            <div class="gy-form-group">
                                <div class="l"><strong>*</strong>CA认证申请书
                                    <a v-if="caInfo.caStatus === 0 || caInfo.caStatus === 3" class="template-file"
                                       :href="templateFile.caApply">下载模板</a>
                                </div>
                                <gy-upload
                                    :url="imgApi"
                                    :disabled="caInfo.caStatus === 1 || caInfo.caStatus === 2"
                                    :hide-btn="caInfo.caStatus === 1 || caInfo.caStatus === 2"
                                    v-model="imgList.caApply.list"
                                    :upload-data="{filetype: imgList.caApply.type}">
                                </gy-upload>
                            </div>
                            <div class="gy-form-group">
                                <span class="l"><strong>*</strong></span>

                                <div class="l"><strong>*</strong>CA认证授权书
                                    <a v-if="caInfo.caStatus === 0 || caInfo.caStatus === 3" class="template-file"
                                       :href="templateFile.caAuthen">下载模板</a>
                                </div>
                                <gy-upload
                                    :url="imgApi"
                                    :disabled="caInfo.caStatus === 1 || caInfo.caStatus === 2"
                                    :hide-btn="caInfo.caStatus === 1 || caInfo.caStatus === 2"
                                    v-model="imgList.caAuthen.list"
                                    :upload-data="{filetype: imgList.caAuthen.type}">
                                </gy-upload>
                            </div>
                            <div class="gy-form-group" style="width: 100%;"
                                 v-if="caInfo.caStatus === 1 || caInfo.caStatus === 2">
                                <span class="l"></span>
                                <div class="link-kefu">
                                    <p style="margin-bottom: 30px;">电子签章{{ companyStatus[1][tabMenu[1].status] }}，如需信息修改，请联系客服开通更改权限</p>
                                    <el-button type="danger">客服电话：400-777-6777</el-button>
                                </div>
                            </div>
                            <div class="gy-form-button" v-if="caInfo.caStatus === 0 || caInfo.caStatus === 3">
                                <button class="gy-button-extra" @click="caSubmit" v-if="caInfo.caStatus === 3">修改
                                </button>
                                <button class="gy-button-extra" @click="caSubmit" v-if="caInfo.caStatus === 0">提交
                                </button>
                            </div>
                            <div class="gy-form-group gy-form-group-tips" v-if="caInfo.caStatus !== 2">
                                <div class="l"><strong>*</strong>邮寄正本文件</div>
                                <div class="email-tips">
                                    <p>需邮寄以下文件正本进行审核（需加盖公章）</p>
                                    <div class="email-tips-content">
                                        <ul>
                                            <li>
                                                <p class="el-icon-success">法人身份证</p>
                                                <div class="other">
                                                    <p>邮寄至</p>
                                                </div>
                                            </li>
                                            <li>
                                                <p class="el-icon-success">CA认证申请书</p>
                                                <div class="other">
                                                    <p>地址</p>
                                                    <span>上海市虹口区吴淞路130号城投大厦15楼</span>
                                                </div>
                                            </li>
                                            <li>
                                                <p class="el-icon-success">CA认证授权书</p>
                                                <div class="other">
                                                    <p>电话</p>
                                                    <span>400-072-7777</span>
                                                </div>
                                            </li>
                                            <li>
                                                <p class="el-icon-success">三证</p>
                                                <div class="other">
                                                    <p>收件人</p>
                                                    <span>国烨客服部</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div v-show="tabMenuSelected === 2" class="pop-inner ca-wrap">
                    <!--<div class="newbank">-->
                        <!--<div class="div1">-->
                            <!--开通银行-->
                        <!--</div>-->
                        <!--<div class="div2">-->
                            <!--<el-radio-group v-model="radio2">-->
                                <!--<el-radio :label="1">-->
                                    <!--<img class="img-bank" src="@/assets/images/cncb.jpg">-->
                                    <!--<span>未认证</span>-->
                                <!--</el-radio>-->
                                <!--<el-radio :label="2">-->
                                    <!--<img class="img-bank" src="@/assets/images/pab.png">-->
                                <!--</el-radio>-->
                            <!--</el-radio-group>-->
                        <!--</div>-->
                        <!--<div class="div3"></div>-->
                    <!--</div>-->
                    <!--显示选的值-->
                    <!--<form action="javascript:;" name="bankcompany">-->
                        <!--<div class="gy-form">-->
                            <!--<div class="gy-form-group single-row">-->
                                <!--<span class="l">开通资金帐户</span>-->
                                <!--<div class="form-group-wrapper">-->
                                    <!--<el-checkbox-->
                                        <!--class="form-section"-->
                                        <!--v-model="bankInfo.infPayEbankId"-->
                                        <!--v-for="item of bankList"-->
                                        <!--:disabled="bankInfo.infPayEbankIdList.includes(item.value)||item.authStatus"-->
                                        <!--:key="item.value"-->
                                        <!--:label="item.value">-->
                                        <!--<img class="img-bank" :src="item.img" :alt="item.name">-->
                                    <!--</el-checkbox>-->
                                    <!--&lt;!&ndash;中信银行&ndash;&gt;-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--&lt;!&ndash; <div class="gy-form-group single-row" v-if="bankInfo.infPayEbankId.includes(2)">-->
                                <!--<span class="l">平安银行信息</span>-->
                                <!--<el-input placeholder="银行卡号" v-model="PABData.card"></el-input>-->
                            <!--</div> &ndash;&gt;-->
                            <!--<div class="gy-form-group single-row card-group">-->
                                    <!--<span class="l" v-if="bankInfo.infPayEbankId.includes(1)">-->
                                        <!--<span  v-show="sfzShow">-->
                                           <!--法人身份证-->
                                        <!--</span>-->
                                    <!--</span>-->
                                <!--<div class="form-group-wrapper">-->
                                       <!--<div class="form-section" v-if="bankInfo.infPayEbankId.includes(1)">-->
                                           <!--<div v-show="sfzShow">-->
                                            <!--<gy-upload-->
                                                <!--:url="imgApi"-->
                                                <!--v-model="imgList.idCard.list"-->
                                                <!--:limit="2"-->
                                                <!--:upload-data="{filetype: imgList.idCard.type}">-->
                                            <!--</gy-upload>-->
                                           <!--</div>-->
                                            <!--<span  v-show="imgList.idCard.list.length < 2" class="card-tips">请上传正反面身份证。</span>-->
                                       <!--</div>-->
                                    <!--<div style="position: absolute;top: 10px;left: 500px;width: 300px;" class="form-section" v-if="bankInfo.infPayEbankId.includes(2)">-->
                                        <!--<div class="form-section-label" v-if="!selectedPa">-->
                                            <!--<span class="l">鉴权银行账号</span>-->
                                            <!--<el-input placeholder="证件号码" disabled v-model="PABData.socialCode"></el-input>-->
                                        <!--</div>-->
                                        <!--<div class="form-section-label" v-if="!selectedPa">-->
                                            <!--（用于银行开户鉴权及身份验证)-->
                                        <!--</div>-->
                                        <!--<div class="form-section-label" v-if="!selectedPa">-->
                                            <!--<span class="l">企业证件类型</span>-->
                                            <!--<el-select v-model="PABData.type" :disabled="bankInfo.infPayEbankIdList.includes(2)">-->
                                                <!--<el-option v-for="(item, index) of companyCardTypeList" :key="index" :value="item.value" :label="item.label"></el-option>-->
                                            <!--</el-select>-->
                                        <!--</div>-->
                                        <!--<div class="form-section-label" v-if="!selectedPa">-->
                                            <!--<span class="l">银行账号</span>-->
                                            <!--<el-input placeholder="请输入银行卡号" :disabled="bankInfo.infPayEbankIdList.includes(2)" v-model="PABData.cardNo"></el-input>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div class="gy-form-button">-->
                                <!--<button v-if="bankInfo.bankStatus!=2" style="margin-top: 90px" class="gy-button-extra" @click="bankSubmit" :disabled="infPayEbankIdBtn">-->
                                    <!--提交-->
                                <!--</button>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</form>-->
                </div>
            </template>
            <template v-else>
                <div class="template">
                    <div class="content"><GYtemplate></GYtemplate></div>
                    <div class="close">
                        <button type="button" class="gy-button-normal" @click="showtemplate('2')">关闭</button>
                    </div>
                </div>
            </template>
        </div>
        <form id="PABForm" name="RegisterForm" :action="PABData.pinganCorpbankRegeditJsyb" method="POST" target="_black">
            <!-- 交易市场监管账号 -->
            <input type="text" readonly id="MainAcctId" name="MainAcctId" :value="regulatoryAccount">
            <!-- 会员姓名 -->
            <input type="text" readonly id="clubName" name="clubName" v-model="PABData.name">
            <!-- 证件号码 -->
            <input type="text" readonly id="idnumber" name="idnumber" v-model="PABData.socialCode">
            <!-- 手机号 -->
            <input type="text" readonly id="mobile" name="mobile" v-model="PABData.adminPhone">
            <!-- 银行卡号 -->
            <input type="text" readonly id="cardNo" name="cardNo" v-model="PABData.cardNo">
            <!-- 会员代码 -->
            <input type="text" readonly id="ThirdCustId" name="ThirdCustId" v-model="PABData.id">
            <!-- 注册类型 -->
            <input type="text" readonly id="clubType " name="clubType" value="E">
            <!-- 证件类型 -->
            <input type="text" readonly id="idtype " name="idtype" v-model="PABData.type">
            <!-- 联系人名称 -->
            <input type="text" readonly id="CONTACTER_NAME" name="CONTACTER_NAME" v-model="PABData.contactName">
            <button type="submit">submit</button>
        </form>
    </div>
</template>
<script>

import gyUpload from '@/components/upload';
import GYtemplate from '@/views/account/company/template';
const companyStatus = [
    ['未认证', '认证中', '已通过', '已驳回'], // authStatus
    ['未认证', '认证中', '已通过', '已驳回'], // caAuthStatus
    ['未认证', '认证中', '已通过', '已驳回'] // bankAuthStatus
];
const companyStatusIcon = ['icon-weitijiao', 'icon-renzhengzhong', 'icon-yirenzheng', 'icon-reject'];
const companyIcon = ['icon-company', 'icon-ca', 'icon-bank'];

const imgMap = {
    certificate: 0, // 三证合一
    business: 1, // 营业执照
    orgCode: 2, // 组织机构代码
    tax: 3, // 税务登记证
    dangerous: 4, // 危险资质
    idCard: 5, // 法人身份证
    caApply: 6, // CA认证申请书
    caAuthen: 7, // CA认证授权书
    authen: 8, // 管理员授权书
    transInfo: 9, // 运输资料
    storage: 10 // 仓储资质
};
const genImgList = () => {
    const imgList = {};
    for (const [key, value] of Object.entries(imgMap)) {
        imgList[key] = {
            type: value,
            list: []
        };
    }
    return imgList;
};

export default {
    components: {
        gyUpload,
        GYtemplate
    },
    data () {
        return {
            sfzShow: false,
            selectedPa: false,
            selectedZX: false,
            infPayEbankIdBtn: false,
            regulatoryAccount: null, // 监管账号
            companyId: '',
            companyStatus: companyStatus,
            companyStatusIcon: companyStatusIcon,
            companyIcon: companyIcon,
            imgApi: this.$api.account.upload,
            imgList: genImgList(),
            tabMenu: [
                {
                    id: 0,
                    value: '公司认证',
                    statusVal: '1',
                    status: 0
                },
                {
                    id: 1,
                    value: '电子签章CA交割',
                    statusVal: '1',
                    status: 0
                },
                {
                    id: 2,
                    value: '签约银行',
                    statusVal: '1',
                    status: 0
                }
            ],
            tabMenuSelected: 0,
            companyTypeList: [],
            provinceList: [],
            cityList: [],
            districtList: [],
            carriageScope: [],
            companyInfo: {
                id: '',
                authStatus: 0,
                companyFileModelList: [],
                companyTypeId: 1,
                carriageScope: '',
                name: '',
                email: '',
                phone: '',
                provinceId: '',
                cityId: '',
                districtId: '',
                address: ''
            },
            ruleCompany: {
                name: [{ required: true }],
                phone: [{ required: true }],
                email: [{ required: true }]
            },
            caInfo: {
                companyFileModelList: [],
                id: null,
                caStatus: 0
            },
            bankInfo: {
                infPayEbankId: [], // 已选银行，1：中信银行，2：平安银行
                infPayEbankIdList: [],
                companyFileModelList: [],
                id: null,
                bankStatus: 0
            },
            authValue: ['未提交', '待审核', '已通过', '已驳回'],
            imgBaseUrl: '',
            licenseOption: '0',
            fileModelList: [],
            // 1:国烨管理员授权书.docx
            // 2:CA申请表（法大大账户及数字证书申请）.docx
            // 3；CA授权书.doc
            templateFile: {
                authen: [
                    '',
                    process.env.API_ROOT_MAIN + '/trade/v1/companies/templates/1',
                    process.env.API_ROOT_MAIN + '/trade/v1/companies/templates/4',
                    process.env.API_ROOT_MAIN + '/trade/v1/companies/templates/5'
                ],
                caApply: process.env.API_ROOT_MAIN + '/trade/v1/companies/templates/2',
                caAuthen: process.env.API_ROOT_MAIN + '/trade/v1/companies/templates/3'
            },
            isShowTemplate: false,
            // bankList: [ // 可选银行
            //     {
            //         name: '中信银行',
            //         img: require('@/assets/images/cncb.jpg'),
            //         code: 'CNCB',
            //         value: 1,
            //         authStatus: false
            //     },
            //     {
            //         name: '平安银行',
            //         img: require('@/assets/images/pab.png'),
            //         code: 'PAB',
            //         value: 2,
            //         authStatus: true
            //     }
            // ],
            companyCardTypeList: [
                {
                    value: '989',
                    label: '统一社会信用代码'
                },
                {
                    value: '995',
                    label: '组织机构代码证'
                }
            ],
            PABData: {
                pinganCorpbankRegeditJsyb: 'https://my-st1.orangebank.com.cn/corporbank/perRegedit_jsyb.do',
                pinganEbankMainAcctId: '',
                name: '',
                socialCode: '',
                adminPhone: '',
                cardNo: '',
                id: '',
                type: '989',
                contactName: ''
            }
        };
    },
    watch: {
        'companyInfo.provinceId' (newValue, oldValue) {
            this.getCityData();
        },
        'companyInfo.cityId' (newValue, oldValue) {
            this.getDistrictData();
        }
    },
    created () {
        this.companyId = this.$route.query.companyId;
        this.companyId && this.getCompanyInfo();
        this.getProvince();
        this.getCompanylist();
        this.getCompanyType();
        this.regulatoryAccount = process.env.REGULATORYACCOUNT;
        // this.imgBaseUrl = process.env.API_ROOT_MAIN + '/trade/v1/companies/images?filePath=';
    },
    methods: {
        tabChange (index) {
            if (this.companyInfo.authStatus === 0) return;
            this.tabMenuSelected = index;
        },
        getProvince () {
            let that = this;
            that.$http.get(that.$api.account.area + '/0')
                .then(res => {
                    that.provinceList = res.data.data;
                });
        },
        provinceChange () {
            let that = this;
            that.cityList = [];
            that.companyInfo.cityId = null;
            that.districtList = [];
            that.companyInfo.districtId = null;
            this.getCityData();
        },
        getCityData () {
            let that = this;
            that.$http.get(that.$api.account.area + '/' + that.companyInfo.provinceId)
                .then(res => {
                    that.cityList = res.data.data;
                });
        },
        cityChange () {
            let that = this;
            that.districtList = [];
            that.companyInfo.districtId = null;
            this.getDistrictData();
        },
        getDistrictData () {
            let that = this;
            that.$http.get(that.$api.account.area + '/' + that.companyInfo.cityId)
                .then(res => {
                    that.districtList = res.data.data;
                });
        },
        getCompanylist () {
            let that = this;
            that.$http.get(that.$api.account.companyList)
                .then(res => {
                    that.companyList = res.data.data;
                });
        },
        getCompanyType () {
            let that = this;
            that.$http.get(that.$api.global.companyType)
                .then(res => {
                    that.companyTypeList = res.data.data;
                });
        },
        getCompanyInfo () {
            this.$http.get(this.$api.account.companyInfo + '/' + this.companyId)
                .then(res => {
                    let r = res.data.data;
                    this.companyInfo = {
                        id: r.id,
                        authStatus: r.authStatus,
                        companyFileModelList: r.companyFileModelList,
                        companyTypeId: r.companyTypeId,
                        name: r.name,
                        email: r.email,
                        phone: r.phone,
                        provinceId: r.provinceId,
                        cityId: r.cityId,
                        districtId: r.districtId,
                        address: r.address
                    };
                    this.caInfo.caStatus = r.caAuthStatus;
                    this.bankInfo.bankStatus = r.bankAuthStatus;
                    this.bankInfo.infPayEbankIdList = r.infPayEbankIdList;
                    this.carriageScope = r.carriageScope ? r.carriageScope.split(',') : [];
                    this.imgFilter(r.companyFileModelList);
                    this.tabMenu[0].status = r.authStatus;
                    this.tabMenu[1].status = r.caAuthStatus;
                    this.tabMenu[2].status = r.bankAuthStatus;
                    ['name', 'socialCode', 'adminPhone', 'id', 'contactName', 'pinganCorpbankRegeditJsyb', 'pinganEbankMainAcctId'].forEach(key => {
                        this.PABData[key] = r[key];
                    });
                    // 如果审核未通过的话  那么平安银行不可修改
                    if (r.authStatus === 2) {
                        //  平安银行隐藏修改
                        // this.bankList[1].authStatus = false;
                    } else {

                    }
                    // 判断中信银行是否通过
                    if (r.infPayEbankIdList.includes(1)) {
                        //  如果已经选择过了平安银行的话
                        this.selectedZX = true;
                        if (this.tabMenu[2].status === 3 || this.tabMenu[2].status === 0) {
                            this.sfzShow = true;
                        } else {
                            this.sfzShow = false;
                        }
                    } else {
                        this.selectedZX = false;
                        if (this.tabMenu[2].status === 3 || this.tabMenu[2].status === 0 || this.tabMenu[2].status === 2) {
                            this.sfzShow = true;
                        } else {
                            this.sfzShow = false;
                        }
                    }
                    // 判断平安银行是否通过
                    if (r.infPayEbankIdList.includes(2)) {
                        //  如果已经选择过了平安银行的话
                        this.selectedPa = true;
                    } else {
                        this.selectedPa = false;
                    }
                    //  判断平安银行有无勾选
                    if (r.infPayEbankIdList.includes(1)) {
                        if (r.infPayEbankIdList.includes(2)) {
                            if (this.tabMenu[2].status === 3) {
                                this.bankInfo.infPayEbankId = [1, 2];
                                this.infPayEbankIdBtn = false;
                            } else {
                                this.infPayEbankIdBtn = true;
                                this.bankInfo.infPayEbankId = [1, 2];
                            }
                        } else {
                            this.bankInfo.infPayEbankId = [1];
                        }
                    } else {
                        if (r.infPayEbankIdList.includes(2)) {
                            this.bankInfo.infPayEbankId = [2];
                        }
                    }
                });
        },
        authSubmit (type) {
            let that = this;
            if (!this.companyInfo.name) {
                return this.$message.error('请填写公司名称');
            } else if (!this.companyInfo.phone) {
                return this.$message.error('请填写公司电话');
            } else if (!this.companyInfo.email) {
                return this.$message.error('请填写公司邮箱');
            } else if (['address', 'districtId', 'provinceId', 'cityId'].some(item => !this.companyInfo[item])) {
                return this.$message.error('请完善地址信息');
            } else if (this.imgList.authen.list.length === 0) {
                return this.$message.error('请上传管理员授权书');
            }
            if (this.companyInfo.companyTypeId === 2) {
                if (this.imgList.transInfo.list.length === 0) {
                    return this.$message.error('请上传运输资料');
                }
                if (this.carriageScope.length === 0) {
                    return this.$message.error('请选择承运范围');
                }
                this.companyInfo.carriageScope = this.carriageScope.join(',');
            }

            if (this.companyInfo.companyTypeId === 3) {
                if (this.imgList.storage.list.length === 0) {
                    return this.$message.error('请上传仓储资质');
                }
            }

            if (this.licenseOption === '0') {
                if (this.imgList.certificate.list.length === 0) {
                    return this.$message.error('请完善证件信息');
                }
            } else if (this.licenseOption === '1') {
                if (this.imgList.business.list.length === 0 || this.imgList.orgCode.list.length === 0 || this.imgList.tax.list.length === 0) {
                    return this.$message.error('请完善证件信息');
                }
            }
            this.companyInfo.companyFileModelList = this.imgMerge();
            that.$http[type](that.$api.account.auth, that.companyInfo)
                .then(res => {
                    if (res.data.code === 0) {
                        that.$alert('操作成功', '提示')
                            .then(() => {
                                that.fileModelList = [];
                                that.$router.push({name: 'accountCompany'});
                            }).catch(() => {
                                that.fileModelList = [];
                                that.$router.push({name: 'accountCompany'});
                            });
                        return;
                    }
                    that.$alert(res.data.message, '出错了');
                });
        },
        caSubmit () {
            let that = this;
            if (this.imgList.idCard.list.length !== 2) {
                return this.$message.error('请上传身份证正反面');
            } else if (this.imgList.caApply.list.length === 0) {
                return this.$message.error('请上传CA认证申请书');
            } else if (this.imgList.caAuthen.list.length === 0) {
                return this.$message.error('请上传CA认证授权书');
            }

            that.caInfo.companyFileModelList = this.imgMerge();
            that.caInfo.id = that.companyId;
            that.$http.put(that.$api.account.companyCa, that.caInfo)
                .then(res => {
                    if (res.data.code === 0) {
                        that.$alert('操作成功', '提示')
                            .then(() => {
                                that.fileModelList = [];
                                that.$router.push({name: 'accountCompany'});
                            });
                        this.tabMenuSelected = 2;
                        return;
                    }
                    that.$alert(res.data.message, '出错了');
                });
        },
        // 中信银行接口调取
        funcmyhs () {
            let that = this;
            if (this.imgList.idCard.list.length !== 2) {
                this.$message.warning('请上传身份证正反面');
            } else {
                that.bankInfo.companyFileModelList = this.imgMerge();
                that.bankInfo.id = that.companyId;
                if (this.bankInfo.infPayEbankId.includes(1)) {
                    that.bankInfo.infPayEbankIdList = [1];
                } else {
                    return;
                }
                that.$http.put(that.$api.account.companyBank, that.bankInfo)
                    .then(res => {
                        if (res.data.code === 0) {
                            that.$alert('中信银行:已提交申请，请等待后台审核。', '操作成功').then(() => {
                                that.fileModelList = [];
                                that.$router.push({name: 'accountCompany'});
                            });
                            return;
                        }
                        that.$alert(res.data.message, '出错了');
                    });
            }
        },
        //  平安银行接口调取
        funPA () {
            let that = this;
            if (!this.PABData.cardNo) {
                return this.$message.warning('请输入银行账号');
            } else {
                that.$alert('平安银行:将跳转到平安银行进行签约。', '操作成功').then(() => {
                    const form = document.getElementById('PABForm');
                    form.submit();
                });
            }
        },
        bankSubmit () {
            this.imgList.caApply.list = [];
            this.imgList.caAuthen.list = [];
            if (this.bankInfo.infPayEbankId.includes(1) && !this.bankInfo.infPayEbankId.includes(2)) {
                //  如果只选择了中信银行
                if (this.selectedZX === true) {
                    // 以前勾选过了
                    if (this.tabMenu[2].status === 3) {
                        //    已经驳回了
                        this.funcmyhs();
                    } else {
                        if (this.tabMenu[2].status === 2) {
                            this.$alert('中信银行:审核已通过。', '提示').then(() => {
                            });
                        } else {
                            this.$alert('中信银行:已提交申请，请等待后台审核。', '提示').then(() => {
                            });
                        }
                    }
                } else {
                    // 还没有勾选过
                    this.funcmyhs();
                }
            } else if (this.bankInfo.infPayEbankId.includes(2) && !this.bankInfo.infPayEbankId.includes(1)) {
                //  如果只选择了平安银行
                if (this.selectedPa === true) {
                    this.$alert('平安银行已经通过，请不要重复提交。', '提示').then(() => {
                    });
                } else {
                    this.funPA();
                }
            } else if (this.bankInfo.infPayEbankId.includes(1) || this.bankInfo.infPayEbankId.includes(2)) {
                //  两个都选择了
                //  判断之前有没有选择过平安银行
                if (this.selectedPa === true) {
                //    之前有选择过平安银行
                    //  如果只选择了中信银行
                    if (this.selectedZX === true) {
                        // 以前勾选过了
                        if (this.tabMenu[2].status === 3) {
                            //    已经驳回了
                            this.funcmyhs();
                        } else {
                            if (this.tabMenu[2].status === 2) {
                                this.$alert('中信银行:审核已通过。', '提示').then(() => {
                                });
                            } else {
                                this.$alert('中信银行:已提交申请，请等待后台审核。', '提示').then(() => {
                                });
                            }
                        }
                    } else {
                        // 还没有勾选过
                        this.funcmyhs();
                    }
                } else {
                //    之前有选择过平安银行
                    //  如果只选择了中信银行
                    if (this.selectedZX === true) {
                        // 以前勾选过了
                        if (this.tabMenu[2].status === 3) {
                            //    已经驳回了
                            let that = this;
                            if (this.imgList.idCard.list.length !== 2) {
                                this.$message.warning('请上传身份证正反面');
                            } else {
                                that.bankInfo.companyFileModelList = this.imgMerge();
                                that.bankInfo.id = that.companyId;
                                if (this.bankInfo.infPayEbankId.includes(1)) {
                                    that.bankInfo.infPayEbankIdList = [1];
                                } else {
                                    return;
                                }
                                that.$http.put(that.$api.account.companyBank, that.bankInfo)
                                    .then(res => {
                                        if (res.data.code === 0) {
                                            this.$alert('<div>   \n' +
                                                    '  <div>中信银行: 已提交申请，请等待后台审核。</div>', '操作成功', {
                                                dangerouslyUseHTMLString: true
                                            }).then(() => {
                                                this.funPA();
                                            });
                                            return;
                                        }
                                        that.$alert(res.data.message, '出错了');
                                    });
                            }
                        } else {
                            if (this.tabMenu[2].status === 2) {
                                this.funPA();
                            } else {
                                this.funPA();
                            }
                        }
                    } else {
                        // 还没有勾选过
                        let that = this;
                        if (this.imgList.idCard.list.length !== 2) {
                            this.$message.warning('请上传身份证正反面');
                        } else {
                            that.bankInfo.companyFileModelList = this.imgMerge();
                            that.bankInfo.id = that.companyId;
                            if (this.bankInfo.infPayEbankId.includes(1)) {
                                that.bankInfo.infPayEbankIdList = [1];
                            } else {
                                return;
                            }
                            that.$http.put(that.$api.account.companyBank, that.bankInfo)
                                .then(res => {
                                    if (res.data.code === 0) {
                                        this.$alert('<div>   \n' +
                                            '  <div>中信银行: 已提交申请，请等待后台审核。</div>', '操作成功', {
                                            dangerouslyUseHTMLString: true
                                        }).then(() => {
                                            this.funPA();
                                        });
                                        return;
                                    }
                                    that.$alert(res.data.message, '出错了');
                                });
                        }
                    }
                }
            }
        },
        imgMerge () {
            let img = [];
            for (const item of Object.values(this.imgList)) {
                if (this.licenseOption === '0' || item.type !== 0) {
                    img.push(...item.list);
                }
            }
            return img;
        },
        imgFilter (data) {
            data.map(item => {
                if ([1, 2, 3].includes(item.fileType)) {
                    this.licenseOption = '1';
                }
                for (const imgItem of Object.values(this.imgList)) {
                    if (imgItem.type === item.fileType) {
                        let url = this.imgBaseUrl;
                        if (!item.filePath.includes('chinayie')) {
                            url += `${process.env.API_ROOT_MAIN}${this.$api.account.getMainImg}?filePath=`;
                        }
                        url += item.filePath;
                        imgItem.list.push(Object.assign(item, { url }));
                    }
                }
            });
        },
        showtemplate (r) {
            this.isShowTemplate = r === '1';
        },
        testBtn () {
            const form = document.getElementById('PABForm');
            if (form) {
                form.submit();
            }
        }
    }
};
</script>

<style scoped lang="scss">
    button[disabled]{
        border: 1px solid #DDD;
        background-color: #ccc;
        color:#fff;opacity: 1;
    }
    .tab {
        dt {
            position: relative;
        }

        dt i {
            position: absolute;
            top: -10px;
            right: 0px;
        }

        li:before {
            position: absolute;
            bottom: -33px;
            right: -7px;
            font-size: 56px;
            color: #fff;
        }
    }
    .gy-form-group.single-row.authen-apply {
        min-height: 100px;
    }
    .template-file {
        color: $color-extra;
    }
    .gy-form-group-tips {
        padding-left: 10px;
        padding-top: 40px;
        width: 100%;
    }
    .email-tips {
        & > p {
            margin-bottom: 30px;
            display: block;
        }

        ul {
            li {
                display: flex;

                p {
                    color: $color-black;
                    display: inline-block;
                }

                & > p {
                    flex: 1;

                    &:before {
                        margin-right: 10px;
                         color: $color-a-hover;
                     }
                }

                .other {
                    flex: 1;

                    p {
                        width: 7em;
                    }

                    span {
                        text-indent: 1em;
                        border-left: 2px solid $color-border;
                        display: inline-block;
                    }
                }
            }
        }
    }
    .showtemplate {
        float: right;
        font-size: 14px;
        color: $color-extra;
        cursor: default;
    }
    .template {
        display: flex;
        flex-direction: column;
        .content {
            flex: 1 0 0;
            padding: 5px;
        }
        .close {
            flex: 0 0 60px;
            padding-right: 20px;
            text-align: right;
            line-height: 60px;
        }
    }
    .form-group-wrapper {
        display: flex !important;
        width: 100%;
        .form-section {
            position: relative;
            flex-basis: 50%;
            .l {
                top: auto;
            }
            .l + div {
                padding-left: 120px;
            }
            .form-section-label {
                width: 100%;
            }
        }
    }
    #PABForm {
        position: fixed;
        top: -100%;
        left: -100%;
    }
    .newbank{
        overflow: hidden;
        .div1{
            float: left;
        }
        .div2{
            float: left;
        }
        .div3{
            float: left;
        }
    }
</style>
