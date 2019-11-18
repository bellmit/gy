<template>
    <div class="account-company account-company-new">
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
                                       :disabled="updateAuthshow">
                            </div>
                            <div class="gy-form-group">
                                <span class="l"><strong>*</strong>公司邮箱</span>
                                <input type="text" v-model="companyInfo.email"
                                       :disabled="updateAuthshow">
                            </div>
                            <div class="gy-form-group">
                                <span class="l"><strong>*</strong>公司类型</span>
                                <el-select v-model="companyInfo.companyTypeId" placeholder="请选择公司类型"
                                           :disabled="updateAuthshow">
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
                                           @change="provinceChange"
                                           :disabled="updateAuthshow"
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
                                           @change="cityChange"
                                           :disabled="updateAuthshow"
                                           style="margin-right: 0;">
                                    <el-option
                                        v-for="item in cityList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="companyInfo.districtId" placeholder="请选择区" class="select-province"
                                           :disabled="updateAuthshow"
                                           style="margin-right: 0;">
                                    <el-option
                                        v-for="item in districtList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                <input type="text" v-model="companyInfo.address"
                                       :disabled="updateAuthshow"
                                       class="address">
                            </div>
                            <div class="gy-form-group single-row" v-show="companyInfo.companyTypeId === 1||companyInfo.companyTypeId === 6||companyInfo.companyTypeId === 7||companyInfo.companyTypeId === 4||companyInfo.companyTypeId === 5||companyInfo.companyTypeId === 8">
                                <span class="l">危化品资质</span>
                                <gy-upload
                                    style="margin-left:5px;"
                                    :url="imgApi"
                                    list-type="picture-card"
                                    :disabled="updateAuthshow"
                                    v-model="imgList.dangerous.list"
                                    :upload-data="{filetype: imgList.dangerous.type}">
                                </gy-upload>
                            </div>
                            <div v-show="companyInfo.companyTypeId === 2">
                                <div class="gy-form-group single-row">
                                    <span class="l"><strong>*</strong>运输资料</span>
                                    <gy-upload
                                        style="margin-left:5px;"
                                        :url="imgApi"
                                        :disabled="updateAuthshow"
                                        v-model="imgList.transInfo.list"
                                        :upload-data="{filetype: imgList.transInfo.type}">
                                    </gy-upload>
                                </div>
                                <div class="gy-form-group single-row">
                                    <span class="l"><strong>*</strong>承运范围</span>
                                    <label><input
                                        :disabled="updateAuthshow"
                                        v-model="carriageScope" type="checkbox" name="scope" value="0">危化品</label>
                                    <label><input
                                        :disabled="updateAuthshow"
                                        v-model="carriageScope" type="checkbox" name="scope" value="1">普货</label>
                                </div>
                            </div>
                            <div class="gy-form-group single-row" v-show="companyInfo.companyTypeId === 3 || companyInfo.companyTypeId === 9">
                                <span class="l"><strong>*</strong>仓储危险品经营许可证</span>
                                <gy-upload
                                    style="margin-left:5px;"
                                    :url="imgApi"
                                    :disabled="updateAuthshow"
                                    v-model="imgList.storage.list"
                                    :upload-data="{filetype: imgList.storage.type}">
                                </gy-upload>
                            </div>
                            <div class="gy-form-group single-row">
                                <span class="l"><strong>*</strong>三证</span>
                                <p class="license-tips">(请根据公司情况上传三证合一或三证照片)</p>
                                <p class="licenses-tips">上传的文件需为加盖公章的扫描件，支持图片和PDF，大小限制20M。</p>
                                <div class="license-upload-box">
                                    <div class="item">
                                        <input :disabled="updateAuthshow"
                                               type="radio" v-model="licenseOption" name="licenseOption" value="0">
                                        <div class="button-box">
                                            <gy-upload
                                                :url="imgApi"
                                                :disabled="licenseOption !==  '0' || updateAuthshow"
                                                v-model="imgList.certificate.list"
                                                :limit="1"
                                                :upload-data="{filetype: imgList.certificate.type}">
                                            </gy-upload>
                                            <span class="name">三证合一</span>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <input :disabled="(licenseOption !==  '0' || updateAuthshow) && companyInfo.authStatus !== 0"
                                            type="radio" v-model="licenseOption" name="licenseOption" value="1">
                                        <div class="button-box">
                                            <gy-upload
                                                :url="imgApi"
                                                :disabled="licenseOption !==  '1' || updateAuthshow"
                                                v-model="imgList.business.list"
                                                :limit="1"
                                                :upload-data="{filetype: imgList.business.type}">
                                            </gy-upload>
                                            <span class="name">营业执照</span>
                                        </div>
                                        <div class="button-box">
                                            <gy-upload
                                                :url="imgApi"
                                                :disabled="licenseOption !==  '1' || updateAuthshow"
                                                v-model="imgList.orgCode.list"
                                                :limit="1"
                                                :upload-data="{filetype: imgList.orgCode.type}">
                                            </gy-upload>
                                            <span class="name">组织机构代码</span>
                                        </div>
                                        <div class="button-box">
                                            <gy-upload
                                                :url="imgApi"
                                                :disabled="licenseOption !== '1' || updateAuthshow"
                                                v-model="imgList.tax.list"
                                                :limit="1"
                                                :upload-data="{filetype: imgList.tax.type}">
                                            </gy-upload>
                                            <span class="name">税务登记证</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--<div>-->
                                <!--{{companyInfo.companyTypeId}}-->
                                <!--{{templateFile.authen}}-->
                                <!--{{templateFile.authen[companyInfo.companyTypeId]}}-->
                            <!--</div>-->
                            <div class="gy-form-group single-row authen-apply">
                                <div class="l">
                                    <!--<strong>*</strong>-->
                                    管理员授权书
                                    <a class="template-file" :href="templateFile.authen[companyInfo.companyTypeId]">下载模板</a>
                                </div>
                                <gy-upload
                                    style="margin-left:5px;"
                                    :url="imgApi"
                                    :disabled="updateAuthshow"
                                    v-model="imgList.authen.list"
                                    :upload-data="{filetype: imgList.authen.type}">
                                </gy-upload>
                            </div>
                            <div class="gy-form-button">
                                <button class="gy-button-extra" @click="updateAuth"
                                        v-if="companyInfo.authStatus === 1 && updateAuthshow === true">更新资料
                                </button>
                                <button class="gy-button-extra" @click="authSubmit('put')"
                                        v-if="companyInfo.authStatus === 1 && updateAuthshow === false">提交
                                </button>
                                <button class="gy-button-extra" @click="authSubmit('put')"
                                        v-if="companyInfo.authStatus === 3">提交
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
                        <dt>电子签章</dt>
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
                                                    <span>400-777-6777</span>
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
                <div style="padding-bottom: 300px;" v-show="tabMenuSelected === 2" class="pop-inner ca-wrap">
                    <div class="top1-title">
                       <i class="iconfont icon-dingdanxinxi mewmyicon"></i> <span class="mewmyfont">请选择开通银行</span>
                    </div>
                    <div class="newbank">
                        <div class="new-bank-select">
                            <div class="box1">开通银行</div>
                            <div class="box2">
                                <el-radio v-model="bankRadio" label="100">
                                    <img src="../../../assets/images/pab.png" alt="" class="img-bank">
                                    <span v-show="safeState==0" class="dsh-class-wrz">未认证</span>
                                    <span v-show="safeState==1" class="dsh-class-dsh">待审核</span>
                                    <span v-show="safeState==2" class="dsh-class-ytg">已通过</span>
                                    <span v-show="safeState==3" class="dsh-class-ybh">已驳回</span>
                                </el-radio>
                            </div>
                            <div class="box3">
                                <el-radio v-model="bankRadio" label="200" style="display: none">
                                    <img src="../../../assets/images/bank.png" class="img-bank"/>
                                    <span v-show="ccbState==0" class="dsh-class-wrz">未认证</span>
                                    <span v-show="ccbState==1" class="dsh-class-dsh">待审核</span>
                                    <span v-show="ccbState==2" class="dsh-class-ytg">已通过</span>
                                    <span v-show="ccbState==3" class="dsh-class-ybh">已驳回</span>
                                </el-radio>
                            </div>
                        </div>
                    </div>
                    <div class="top1-title">
                        <i class="iconfont icon-dingdanxinxi mewmyicon"></i> <span class="mewmyfont">请填写开户资料</span>
                    </div>
                    <!--平安银行-->
                    <div class="top2-information" v-show="bankRadio==100">
                        <el-row :gutter="60" style="margin-bottom: 10px">
                            <el-col :span="3">手机号</el-col>
                            <el-col :span="8">
                                <input placeholder="请输入" type="text" class="gy-input" v-model="contactPhone">
                            </el-col>
                            <el-col :span="12" style="padding:0">注：当前手机号将用于电子账户交易过程中获取短信验证码。</el-col>
                        </el-row>
                        <el-row :gutter="60">
                            <el-col class="list-top">
                                <el-row>
                                    <el-col>
                                        <input :disabled="safeState==1||safeState==2" v-model="xyvalue" style="vertical-align: text-bottom;" type="checkbox" >我已阅读并同意 <span class="xy-click" @click="xyclick()">《平安银行电子商务支付结算服务协议》</span>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row  v-show="safeState==0||safeState==3">
                            <div class="top3-information">
                                <button class="gy-button-extra" :disabled="!xyvalue" @click="bankSubmitsafe">提交</button>
                            </div>
                        </el-row>
                    </div>
                    <!--中信银行-->
                    <div class="top2-information" v-show="bankRadio==200">
                        <el-row  :gutter="60">
                            <el-col :span="12">
                                <el-row>
                                    <el-col :span="5" class="list-left-span">法人身份证</el-col>
                                    <el-col :span="19">
                                        <div class="form-section">
                                            <div>
                                                <gy-upload
                                                    :url="imgApi"
                                                    v-model="imgList.idCard.list"
                                                    :limit="2"
                                                    :upload-data="{filetype: imgList.idCard.type}">
                                                </gy-upload>
                                            </div>
                                            <span  v-show="imgList.idCard.list.length < 2" class="card-tips">请上传正反面身份证。</span>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row v-show="ccbState==0||ccbState==3">
                            <div class="top3-information">
                                <button class="gy-button-extra" @click="bankSubmitccb">提交</button>
                            </div>
                        </el-row>
                    </div>
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
        <!--平安协议-->
        <el-dialog title="平安银行电子商务支付结算服务协议" :visible.sync="xyShow">
            <div class="payhxy">
                <div class="center-div">《平安银行电子商务支付结算服务协议》</div>
                <div class="center-div2">（系统在线签署确认）</div>
                <div>甲方（银行）：平安银行股份有限公司长沙分行</div>
                <div>乙方（平台用户）： {{companyInfo.name}} </div>
                <div class="left-div4">基于甲方与上海国烨平台的业务合作以及您（即乙方）属于该上海国烨平台的正式注册用户，平安银行（即甲方）同意为该上海国烨平台及您提供电子商务支付结算类相关服务。本协议由您与平安银行签署，本协议的签订视为您同意甲方向您提供本协议项下相关服务并充分知悉和理解了本协议项下甲方、乙方、上海国烨平台等各方的权利义务。</div>
                <div class="left-div3">第一条  协议总体说明 </div>
                <div class="left-div4"> 1.本协议项下主体为甲方、乙方以及与之关联的上海国烨平台。乙方为上海国烨平台的正式注册用户，并在该上海国烨平台提供的交易系统上进行订单交易、充值\入金交易、订单支付、出金\提现交易等；甲方与上海国烨平台已进行了实质性的业务合作，为上海国烨平台提供了电子商务支付结算类服务，且双方系统实现了互联互通。 </div>
                <div class="left-div4">2.正常情况下，乙方通过上海国烨平台提供的服务渠道进行订单交易和相关查询。</div>
                <div class="left-div4">3.正常情况下，甲方主要通过上海国烨平台提供的用户信息（含乙方信息）、订单交易信息、订单支付信息、清算对账类信息等进行相应的业务处理。 </div>
                <div class="left-div4">4.本协议项下，乙方通过甲方使用上海国烨平台向甲方交互的与乙方有关的各类信息，甲方保证只用于本协议项下服务之目的，不用做其他用途。</div>
                <div class="left-div4">5.本协议项下，基于上海国烨平台进一步提升支付结算效率和交易资金管理效率的诉求或乙方的诉求，乙方作为上海国烨平台的正式注册用户，通过该上海国烨平台向甲方申请开立“平台用户子钱包”，并按照本协议的约定依法合规使用该“平台用户子钱包”。乙方同意在申请开立该类子钱包的同时，在线签署并确认本协议。</div>
                <div class="left-div4">6.本协议项下，在经过甲方核验的前提下，甲方基于上海国烨平台“交易资金见证汇总专管户”，为乙方开立唯一的“平台用户子钱包”；乙方可通过该平台用户子钱包在乙方所属的上海国烨平台提供的服务渠道上从事充值\入金、订单支付、出金\提现等各类服务。</div>
                <div class="left-div3">第二条  相关释义 </div>
                <div class="left-div4">除非另有约定，本协议所述下列术语释义如下：</div>
                <div class="left-div4">1.电子商务支付结算类服务，是指甲方接受乙方所属上海国烨平台的委托，在为乙方所属上海国烨平台搭建一整套交易资金见证总分账户体系的同时，向乙方及其所属上海国烨平台提供总分账户的开立、账户绑定及鉴权验证、密令控件输出、充值\入金、交易担保支付、出金\提现、交易资金清分、清算和对账等一体化资金管理服务的一项电子商务支付结算类中间业务。 </div>
                <div class="left-div4">2.乙方“平台用户子钱包”，也称“乙方所属上海国烨平台项下的平台用户子钱包”，是指甲方基于乙方所属上海国烨平台交互的乙方用户信息，在经过甲方验证核实的前提下，由甲方业务系统在乙方所属上海国烨平台“交易资金见证汇总专管户”项下为乙方开立的专项用于登记核算乙方交易资金余额和交易资金变动明细的资金明细子账户。即，甲方在乙方所属上海国烨平台“交易资金见证汇总专管户”项下为乙方开立了专属的子钱包账户。 </div>
                <div class="left-div4">乙方“平台用户子钱包”，属于乙方所属上海国烨平台“交易资金见证汇总专管户”项下的台账级子账户，不属于银行存款账户或银行结算账户或银行电子账户；乙方“平台用户子钱包”项下的资金款项均存放于乙方所属上海国烨平台“交易资金见证汇总专管户”项下。乙方与甲方之间并不构成实质意义上的存款法律关系。甲方仅根据乙方及乙方所属上海国烨平台的指令进行相关业务的处理。 </div>
                <div class="left-div4">3.乙方银行账户，是指乙方在甲方或其他银行开立的、与乙方“平台用户子钱包”之间建立入金\充值或出金\提现对应绑定关系的同户名实体结算账户或电子账户（其使用需符合监管要求）或个人银行借记卡。 </div>
                <div class="left-div4">4.入金\充值，是指乙方通过其所属上海国烨平台提供的甲方支付通道或甲方之外的其他第三方支付通道，向乙方“平台用户子钱包”进行充值的行为；该类充值\入金所涉资金款项进入乙方所属上海国烨平台在甲方处的“交易资金见证汇总专管户”。</div>
                <div class="left-div4">5.出金\提现，是指乙方将其“平台用户子钱包”内的可用资金款项提现至其关联绑定的“银行账户”。</div>
                <div class="left-div4">6.订单支付，是指乙方通过自身“平台用户子钱包”在所属上海国烨平台提供的服务渠道上因发起订单交易而进行的支付（在本协议项下也称乙方子钱包支付），或者乙方通过其他支付通道而非利用自身“平台用户子钱包”进行的订单支付（在本协议项下也称乙方其它直接支付）。 </div>
                <div class="left-div4">7.乙方所属上海国烨平台“交易资金见证汇总专管户”：是指乙方所属上海国烨平台在甲方开立的专门用于存放平台用户交易结算资金（含乙方用户子钱包项下的资金款项）的银行类账户，或根据监管要求且经乙方所属上海国烨平台申请由甲方为其开设的专门用于存放和核算管理上海国烨平台项目项下平台用户交易结算资金的专用类账户。该账户与乙方所属上海国烨平台的自有资金银行类账户分设隔离，实行专门管理、专项使用。 </div>
                <div class="left-div4">8.银行密令控件：基于乙方所属上海国烨平台和乙方的申请，甲方可为乙方提供银行密令控件，即乙方“平台用户子钱包”项下的交易支付密码，该类交易支付密码由甲方以加密形式保存在甲方系统。乙方可通过甲方提供的银行密令控件设置相应的交易支付密码，并在后续的交易支付、提现\出金等交易发生时使用该密码，相关使用须经甲方系统的核验通过。</div>
                <div class="left-div3">当乙方输入正确的交易支付密码时，即视为乙方不可撤销地授权甲方执行相关指令，由此可能引发的任何资金损失，均由乙方承担，与甲方无关。 </div>
                <div class="left-div4">9.交易资金担保支付子账户，主要用于存放和核算乙方所属上海国烨平台项下已在甲方开立了“平台用户子钱包”的平台用户（含乙方）在交易时待支付划转的交易资金。甲方根据乙方所属上海国烨平台或付款方用户（含乙方）的确认付款指令，将交易资金担保支付子账户内的该笔待支付资金实时划转至收款方用户子钱包。交易资金担保支付子账户项下的资金款项存放于乙方所属上海国烨平台“交易资金见证汇总专管户”项下，由甲方专项管控。</div>
                <div class="left-div4">10.交易资金见证支付：是指为了解决乙方与交易对手方的信任问题，而产生的一种支付方式。当乙方在乙方所属上海国烨平台提供的服务渠道上对交易订单进行预支付，并在甲方提供的密令控件平台输入正确的银行交易支付密码后，甲方系统将乙方“平台用户子钱包”项下的拟支付资金划转至交易资金担保支付子账户内；当交易对手方履行完相关责任义务后，乙方在乙方所属上海国烨平台提供的服务渠道上进行确认支付，并在甲方系统输入正确的银行支付密码，甲方系统将交易资金担保支付子账户内的资金划转至卖方用户子钱包项下。如乙方所属上海国烨平台已经与乙方另行协议约定“在规定时间内乙方仍未付款，系统将自动付款”等类似的情形除外。</div>
                <div class="left-div4">11.即时支付：不同于交易资金见证支付，是指乙方在对交易订单发起支付指令时，在输入正确的银行交易支付密码后，即直接付给卖家用户子钱包的一种付款方式；该类支付无需乙方再进行一次确认支付。 </div>
                <div class="left-div4">第三条  关于银行端交易支付密码的使用 </div>
                <div class="left-div4">1.银行端交易支付密码的设置：乙方在乙方所属上海国烨平台提供的服务渠道上进行注册、申请开立平台用户子钱包、进行银行账户绑定时，在经甲方核验通过的前提下，需要根据甲方系统的提示设置相应的银行交易支付密码。</div>
                <div class="left-div4">2.银行端交易支付密码的使用</div>
                <div class="left-div4">（1）修改用户信息及银行预留信息：乙方修改信息及银行预留信息时，需根据甲方系统的提示输入正确的银行端交易支付密码，经核验通过后予以办理；</div>
                <div class="left-div4">（2）出金\提现：乙方发起出金\提现指令（申请）时，需根据甲方系统的提示输入正确的银行端交易支付密码，经核验通过后予以办理； </div>
                <div class="left-div4">（3）交易资金担保支付：乙方在对订单进行支付时，需输入两次交易支付密码，一次是在订单预支付时，第二次是在订单确认支付时，经核验通过后予以办理； </div>
                <div class="left-div4">（4）即时支付：乙方进行即时支付时，需根据甲方系统的提示输入正确的银行端交易支付密码，经核验通过后予以办理。</div>
                <div class="left-div4">3.若乙方所属上海国烨平台决定不使用甲方提供的密令控件平台，即在乙方针对其“平台用户子钱包”发起该钱包项下各类支付交易时，无需再输入银行端交易支付密码。乙方对于该类方式表示接受，同时承诺在其“平台用户子钱包”项下款项发生任何可能的损失时，均直接要求乙方所属上海国烨平台承担责任，承诺不向甲方提起赔偿等与之相关的任何诉求。 </div>
                <div class="left-div3">第四条  甲方权利义务 </div>
                <div class="left-div4">1.甲方将根据甲方系统接收到的相关指令办理业务，业务处理时间以甲方在甲方系统中处理的时间为准。 </div>
                <div class="left-div4">甲方系统接收到的指令只要是通过乙方通过输入正确的银行端交易支付密码后所产生的指令均视为乙方向甲方发出的有效指令，视为乙方真实意思表示，由此产生的一些后果和纠纷甲方概不负责。 </div>
                <div class="left-div4">对于银行端交易支付密码不正确的各类业务指令，甲方有权拒绝执行。</div>
                <div class="left-div4">2.甲方因以下情况没有正确执行乙方指令的，不承担责任：</div>
                <div class="left-div4">（1）甲方接收到的指令信息不明、存在乱码、不完整或无法辨认等； </div>
                <div class="left-div4">（2）乙方“平台用户子钱包”项下的可用余额不足，无法完成支付； </div>
                <div class="left-div4">（3）乙方“平台用户子钱包”以及乙方在乙方所属上海国烨平台端的交易账户被依法冻结或被有权机关采取其它限制性措施；</div>
                <div class="left-div4">（4）乙方操作不当或操作失误； </div>
                <div class="left-div4">（5）乙方所属上海国烨平台的原因； </div>
                <div class="left-div4">（6）不可抗力或其他不可归因于甲方过失的情况。 </div>
                <div class="left-div4">3.甲方有义务维护业务系统的安全平稳运行，但不可归咎于甲方原因的情形除外。</div>
                <div class="left-div4">4.乙方在使用甲方服务过程中如有疑问，甲方有义务提供相应的咨询和支持。甲方有权根据业务需要更新和升级甲方系统。在新版本使用前，甲方将通过甲方网站或电商平台网站等方式予以公告。 </div>
                <div class="left-div4">5.甲方提供的服务受乙方所属上海国烨平台“交易资金见证汇总专管户”、乙方“平台用户子钱包”等相关账户情况的制约，如该类账户因挂失、止付、冻结、可用余额不足等原因不能使用，本协议项下相关服务将中止或终止，且甲方不承担任何责任。 </div>
                <div class="left-div4">6.因不可归咎于甲方的原因导致乙方所属上海国烨平台中止/终止使用甲方服务的，甲方不退还乙方已缴纳的有关服务费用。同时，因此导致的乙方无法完成充值\入金、支付、出金\提现等相关服务的，甲方不承担任何责任，乙方承诺其与乙方所属上海国烨平台自行协商解决。 </div>
                <div class="left-div4">7.甲方承诺在法律法规许可范围内使用乙方的资料、用户信息和交易记录、交易支付记录等，并对乙方的银行端交易支付密码、乙方平台用户子钱包项下的资金动态和相关交易支付情况严格保密，但法律、法规及监管部门另有规定的除外。 </div>
                <div class="left-div4">8.甲方在本协议书载明的授权期限内有权向中国人民银行、依法设立的数据服务机构、信息查询及信息验证服务机构、政府部门及其他依法设立存续的第三方机构等无次数限制地收集、查询、验证，同意递交本公司相关信息（包括但不限于银行实名信息、通信实名信息等）进行验证并获得验证结果，用于以下用途： 国烨网在线交易。 </div>
                <div class="left-div3">第五条  乙方权利义务 </div>
                <div class="left-div4">1:乙方应妥善保管自身信息及银行端交易支付密码、乙方所属上海国烨平台端的交易密码（若有），不提供给他人使用，并对任何人使用所可能导致的风险和损失承担责任。如出现密码泄露等情况，乙方应及时通知甲方止付并重新申请设置新的银行端交易支付密码。 </div>
                <div class="left-div4">2.乙方对向甲方系统发送的电子业务指令所涉数据内容的真实性和有效性负责。对乙方与乙方所属上海国烨平台、其他交易用户之间的纠纷，均与甲方无关，乙方承诺其与上述各相关方自行协商解决。 </div>
                <div class="left-div4">3.乙方应在安全环境中使用甲方系统和本协议项下服务，避免存在病毒、木马等危害性的程序，并对所使用的相关软件的合法性和安全性承担责任。</div>
                <div class="left-div4">4.乙方应对甲方提供的资料和技术方案依法承担保密义务。 </div>
                <div class="left-div4">5.乙方在使用本协议服务过程中，所提供的资料信息如有更改，例如基本注册信息变更、预留手机号码变更、绑定的银行账号变更等，应及时按照甲方要求办理有关手续。办妥上述手续之前所产生的一切后果由乙方自行承担。</div>
                <div class="left-div4">6.乙方使用本协议项下服务时，如其使用的服务功能涉及到甲方其他业务规定或规则的需同时遵守；乙方同意遵守甲方有关电子银行的规章制度。 </div>
                <div class="left-div4">7.因乙方所属上海国烨平台“交易资金见证汇总专管户”、乙方“平台用户子钱包”等相关账户被国家有权机关依法查询、冻结、扣划，导致甲方中止/终止本协议项下服务的，或因此给乙方造成损失的，甲方对此均不承担任何责任。 </div>
                <div class="left-div4">8.乙方已明确知悉提供第四条第8点信息可能给本人/本公司带来财产或信用损失以及其他可能的不利风险，包括采集上述信息对本人/本公司信用方面可能产生不良影响以及上述信息被信息使用者依法提供给第三方后被他人不当利用的风险。</div>
                <div class="left-div4">9.乙方同意为避免重复授权之不便，本授权表明该等合法存续的第三方机构在使用或向有关机构提供本人/本公司信息时，可以依据本授权径行使用或向源数据机构提供本人/本公司相关信息，而无需再逐一向本人/本公司另行获取授权。 </div>
                <div class="left-div3">第六条  声明条款 </div>
                <div class="left-div4">本协议独立于乙方与乙方所属上海国烨平台双方通过各种方式签订的各类相关合同或协议，双方因上述各类合同或协议而发生的任何争议、纠纷甚至是诉讼、仲裁等，均与甲方无关，乙方承诺其与乙方所属上海国烨平台自行协商解决。</div>
                <div class="left-div3">第七条  不可抗力、免责及责任限制 </div>
                <div class="left-div4">因下列原因导致甲方无法正常提供本协议项下服务的，甲方不承担任何责任： </div>
                <div class="left-div4">1.甲方系统停机维护或升级； </div>
                <div class="left-div4">2.因台风、地震、洪水、雷电或恐怖袭击等不可抗力原因； </div>
                <div class="left-div4">3.用户的电脑软硬件和通信线路、供电线路出现故障的； </div>
                <div class="left-div4">4.用户操作不当或通过非甲方授权或认可的方式使用甲方系统或本协议项下服务的 </div>
                <div class="left-div4">5.因病毒、木马、恶意程序攻击、网络拥堵、系统不稳定、系统或设备故障、通讯故障、电力故障、第三方服务瑕疵或监管要求等非甲方可控的原因。 </div>
                <div class="left-div3">第八条  适用法律及争议解决 </div>
                <div class="left-div4">1.本协议的订立、效力、履行和解释，均适用中华人民共和国法律；法律无明文规定的，可适用通行的交易惯例。</div>
                <div class="left-div4">2.本协议未尽事宜，双方应友好协商或另行签订补充协议。因本协议引起的或与本协议有关的一切争议和纠纷，当事各方可友好协商解决。协商不成的，任何一方均可向甲方所在地人民法院提起诉讼。 </div>
                <div class="left-div3">第九条  协议的生效及效力 </div>
                <div class="left-div3">1．本协议自乙方通过甲方系统在线确认或通过甲方认可的乙方所属上海国烨平台提供的服务渠道在线确认之时起生效。乙方在上述渠道上点击确认提交即视为乙方已经确认并签订了本协议。 </div>
                <div class="left-div4">2．除非本协议另有约定，两方中如果有其中一方需要提前终止本协议，需提前通知另外一方。甲方拟终止本协议项下服务或终止本协议的，将提前通过相关渠道进行公告或进行相应的提醒；在甲方明示的公告期或提醒期限内，乙方若无异议的，则本协议在甲方明示的公告期届满之日起或提醒期限届满之日起自动终止。 </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import gyUpload from '@/components/upload';
import GYtemplate from '@/views/account/company/template';
const companyStatus = [
    ['未认证', '待审核', '已通过', '已驳回'], // authStatus
    ['未认证', '待审核', '已通过', '已驳回'], // caAuthStatus
    ['未认证', '待审核', '已通过', '已驳回'] // bankAuthStatus
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
            updateAuthshow: false,
            pdfThumbnail: require('../../../assets/images/pdf.png'),
            contactPhone: '',
            xyShow: false,
            xyvalue: false,
            bankRadio: '100',
            companyFundData: [],
            ccbState: '', // 中信状态
            safeState: '', // 平安状态
            tradePasswddata: '', // 平安状态
            sfzShow: false,
            selectedPa: false,
            selectedZX: false,
            infPayEbankIdBtn: false,
            regulatoryAccount: null, // 监管账号
            companyId: '',
            companyStatus: companyStatus,
            companyStatusIcon: companyStatusIcon,
            companyIcon: companyIcon,
            imgApi: this.$api.account.newUpload,
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
                    value: '电子签章',
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
                licenceType: 0,
                authStatus: 0,
                companyFileModelList: [],
                companyTypeId: null, // 取消公司类型默认
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
            authValue: ['未认证', '待审核', '已通过', '已驳回'],
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
                    process.env.API_ROOT_MAIN + '/trade/v1/companies/templates/5',
                    process.env.API_ROOT_MAIN + '/trade/v1/companies/templates/1',
                    process.env.API_ROOT_MAIN + '/trade/v1/companies/templates/1',
                    process.env.API_ROOT_MAIN + '/trade/v1/companies/templates/1',
                    process.env.API_ROOT_MAIN + '/trade/v1/companies/templates/1',
                    process.env.API_ROOT_MAIN + '/trade/v1/companies/templates/1',
                    process.env.API_ROOT_MAIN + '/trade/v1/companies/templates/5'
                ],
                caApply: process.env.API_ROOT_MAIN + '/trade/v1/companies/templates/2',
                caAuthen: process.env.API_ROOT_MAIN + '/trade/v1/companies/templates/3'
            },
            isShowTemplate: false,
            bankList: [ // 可选银行
                {
                    name: '中信银行',
                    img: require('@/assets/images/cncb.jpg'),
                    code: 'CNCB',
                    value: 1,
                    authStatus: false
                },
                {
                    name: '平安银行',
                    img: require('@/assets/images/pab.png'),
                    code: 'PAB',
                    value: 2,
                    authStatus: true
                }
            ],
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
                    console.log(that.companyTypeList);
                });
        },
        getCompanyInfo () {
            this.$http.get(this.$api.account.companyInfo + '/' + this.companyId)
                .then(res => {
                    let r = res.data.data;
                    console.log(r);
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
                    // 新增平安银行，判断 infPayEbankId=1是中信 2为平安
                    this.companyFundData = r.companyFundItemApplyModelList;
                    for (let i = 0; i < this.companyFundData.length; i++) {
                        console.log(this.companyFundData[i].infPayEbankId);
                        if (this.companyFundData[i].infPayEbankId === 1) {
                        // 中信
                            this.ccbState = this.companyFundData[i].auditStatus;
                        } else if (this.companyFundData[i].infPayEbankId === 2) {
                        // 平安
                            this.safeState = this.companyFundData[i].auditStatus;
                            this.contactPhone = this.companyFundData[i].contactPhone;
                            console.log(this.companyFundData[i]);
                            if (this.safeState === 1 || this.safeState === 2) {
                                this.xyvalue = true;
                            } else {
                                this.xyvalue = false;
                            }
                        }
                    }
                    //
                    if (r.authStatus === 1 || r.authStatus === 2) {
                        this.updateAuthshow = true;
                    } else {
                        this.updateAuthshow = false;
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
            } else if (!this.companyInfo.companyTypeId) {
                return this.$message.error('请填写公司类型'); // 添加公司类型判断
            } else if (['address', 'districtId', 'provinceId', 'cityId'].some(item => !this.companyInfo[item])) {
                return this.$message.error('请完善地址信息');
            }
            // 管理员授权书 改非必填
            // else if (this.imgList.authen.list.length === 0) {
            //     return this.$message.error('请上传管理员授权书');
            // }
            if (this.companyInfo.companyTypeId === 2) {
                if (this.imgList.transInfo.list.length === 0) {
                    return this.$message.error('请上传运输资料');
                }
                if (this.carriageScope.length === 0) {
                    return this.$message.error('请选择承运范围');
                }
                this.companyInfo.carriageScope = this.carriageScope.join(',');
            }

            if (this.companyInfo.companyTypeId === 3 || this.companyInfo.companyTypeId === 9) {
                if (this.imgList.storage.list.length === 0) {
                    return this.$message.error('请上传仓储资质');
                }
            }
            if (this.licenseOption === '0') {
                if (this.imgList.certificate.list.length === 0) {
                    return this.$message.error('请完善证件信息');
                }
                this.companyInfo.licenceType = 0;
            } else if (this.licenseOption === '1') {
                if (this.imgList.business.list.length === 0 || this.imgList.orgCode.list.length === 0 || this.imgList.tax.list.length === 0) {
                    return this.$message.error('请完善证件信息');
                }
                this.companyInfo.licenceType = 1;
            }
            this.companyInfo.companyFileModelList = this.imgMerge();
            that.$http[type](that.$api.account.auth, that.companyInfo)
                .then(res => {
                    if (res.data.code === 0) {
                        that.$confirm('操作成功', '提示', {type: 'success'})
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
                        that.$confirm('操作成功', '提示', {type: 'success'})
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
                            that.$confirm('中信银行:已提交申请，请等待后台审核。', '操作成功', {type: 'success'}).then(() => {
                                that.fileModelList = [];
                                that.$router.push({name: 'accountCompany'});
                            });
                            return;
                        }
                        that.$alert(res.data.message, '出错了');
                    });
            }
        },
        // 平安银行调取接口
        bankSubmitsafe () {
            let reg = /^1[3456789]\d{9}$/;
            if (!reg.test(this.contactPhone)) {
                this.$message.error('请输入有效的手机号码');
                return false;
            }
            if (this.tabMenu[1].status === 0) {
                this.imgList.caApply.list = [];
                this.imgList.caAuthen.list = [];
            }
            this.$http.put(this.$api.account.companyBank, {
                'id': this.companyId,
                'companyFundItemApplyModelList': [{
                    'infPayEbankId': 2,
                    'contactPhone': this.contactPhone
                }]
            }).then(res => {
                if (res.data.code === 0) {
                    this.$confirm('平安银行:已提交申请，请等待后台审核。', '操作成功', {type: 'success'}).then(() => {
                        this.$router.push({name: 'accountCompany'});
                    });
                    return;
                }
                this.$alert(res.data.message, '出错了');
            });
        },
        // 中信银行调取接口
        bankSubmitccb () {
            if (this.tabMenu[1].status === 0) {
                this.imgList.caApply.list = [];
                this.imgList.caAuthen.list = [];
            }
            if (this.imgList.idCard.list.length !== 2) {
                this.$message.warning('请上传身份证正反面');
            } else {
                this.$http.put(this.$api.account.companyBank, {
                    'companyFileModelList': this.imgList.idCard.list,
                    'id': this.companyId,
                    'companyFundItemApplyModelList': [{
                        'infPayEbankId': 1
                    }]
                })
                    .then(res => {
                        if (res.data.code === 0) {
                            this.$confirm('中信银行:已提交申请，请等待后台审核。', '操作成功', {type: 'success'}).then(() => {
                                this.fileModelList = [];
                                this.$router.push({name: 'accountCompany'});
                            });
                            return;
                        }
                        this.$alert(res.data.message, '出错了');
                    });
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
                console.log(Object.values(this.imgList));
                for (const imgItem of Object.values(this.imgList)) {
                    if (imgItem.type === item.fileType) {
                        let url = this.imgBaseUrl;
                        if (!item.filePath.includes('chinayie')) {
                            url += `${process.env.API_ROOT_MAIN}${this.$api.account.getMainImg}?filePath=`;
                        }
                        if ((item.filePath.indexOf('.pdf') === -1)) {
                            url += item.filePath;
                        } else {
                            url = this.pdfThumbnail;
                        }
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
        },
        xyclick () {
            this.xyShow = true;
        },
        updateAuth () {
            this.updateAuthshow = false;
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
        margin: 20px 0;
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
    .new-bank-select{
        overflow: hidden;
        .box1{
            float: left;
            margin-top: 8px;
            color: #333;
        }
        .box2{
            float: left;
            margin-left: 60px;
        }
        .box3{
            float: left;
            margin-left: 200px;
        }
        .img-bank{
            width: 120px;
            height: 45px;
        }
        .dsh-class-wrz{
            border: 1px solid #ccc;
            border-radius: 5px;
            color: #ccc;
            padding: 1px 3px;
            margin-left: 10px;
        }
        .dsh-class-dsh{
            border: 1px solid #F2AC4C;
            border-radius: 5px;
            color: #F2AC4C;
            padding: 1px 3px;
            margin-left: 10px;
        }
        .dsh-class-ytg{
            border: 1px solid #28CE87;
            border-radius: 5px;
            color: #28CE87;
            padding: 1px 3px;
            margin-left: 10px;
        }
        .dsh-class-ybh{
            border: 1px solid #e0370f;
            border-radius: 5px;
            color: #e0370f;
            padding: 1px 3px;
            margin-left: 10px;
        }
    }
    .top1-title{
        margin-left: -22px;
    }
    .top2-information{
        margin-top: 20px;
    }
    .top3-information{
        margin-top: 30px;
        text-align: right;
    }
    .xy-click{
        color: #4a90e2;
    }
    .xy-click:hover{
        cursor: pointer;
    }
    .account-company-new{
        .center-div{
            text-align: center;
            font-size: 16px;
            font-weight: bold;
        }
        .center-div2{
            text-align: center;
            font-size: 14px;
        }
        .left-div3{
            font-size: 14px;
            font-weight: bold;
            text-indent:28px;
            color: #333333;
        }
        .left-div4{
            font-size: 14px;
            text-indent:28px;
            color: #333333;
        }
        .payhxy{
            height: 500px;
            overflow: auto;
        }
    }
    .licenses-tips{
        font-size: 14px;
        color:#999;
        position: absolute;
        left: 30px;
    }
    .license-upload-box{
        margin-top:15px;
    }
</style>
<style lang="scss">
    .account-company-new{
        .el-dialog__body{
            padding:20px 30px
        }
    }
</style>
