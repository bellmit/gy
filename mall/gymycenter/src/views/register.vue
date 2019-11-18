<template>
    <div class="register-main-bagk">
        <div class="register-main">
            <h3><i class="iconfont icon-register"></i><span class="register-logo">注册</span></h3>
            <form action="javascript:;">
                <div class="gy-form">
                    <div class="gy-form-group">
                        <span class="l">
                            <span class="btred">*</span>用户注册
                        </span>
                        <input @keyup="accountFun(account)" v-model="account" type="text" placeholder="请输入用户名">
                        <p class="gy-form-group-explain" :class="{active:isActiveUser}">{{ verificationAccount }}</p>
                    </div>
                </div>
                <div class="gy-form">
                    <div class="gy-form-group">
                        <span class="l"><span class="btred">*</span>设置密码 </span>
                        <input @keyup="passwordFun(password)" v-model="password" type="password" placeholder="请设置登录密码">
                        <p class="gy-form-group-explain" :class="{active:isActivePassword}">{{ verificationPassword }}</p>
                    </div>
                </div>
                <div class="gy-form">
                    <div class="gy-form-group">
                        <span class="l"></span>
                        <span class="gy-form-group-security">安全程度</span>
                        <span class="gy-form-group-security-highlight gy-form-group-security-highlight-first" :class="{activeWeak:isActiveWeak}"></span>
                        <span class="gy-form-group-security-highlight" :class="{activeMiddle:isActiveMiddle}"></span>
                        <span class="gy-form-group-security-highlight" :class="{activeStrong:isActiveStrong}"></span>
                    </div>
                </div>
                <div class="gy-form">
                    <div class="gy-form-group">
                        <span class="l"><span class="btred">*</span>手机号码</span>
                        <input @keyup="phoneNumberFun(phoneNumber)" v-model="phoneNumber" type="text" placeholder="请输入11位数的手机号">
                        <p class="gy-form-group-explain" :class="{active:isActivePhone}">{{ verificationPhone }}</p>
                    </div>
                </div>
                <div class="gy-form">
                    <div class="gy-form-group">
                        <span class="l"><span class="btred">*</span>图片验证码</span>
                        <input @blur="txNumberFun2(register.graphicVerificationCode)" v-model="register.graphicVerificationCode" id="gy-form-group-img" type="text" placeholder="请输入图形验证码">
                        <img @click="refreshGraphic" v-if="graphicVerificationCodee" :src='"data:image/jpeg;base64," + graphicVerificationCodee' class="gy-form-group-imgs">
                        <p class="gy-form-group-explain">看不清? <span class="changone" @click="refreshGraphic">点击换一张</span></p>
                        <p class="gy-form-group-explain" :class="{active:isActivetzm}">{{ YZMAccount }}</p>
                    </div>
                </div>
                <div class="gy-form">
                    <div class="gy-form-group gy-form-phone">
                        <span class="l"><span class="btred">*</span>短信验证码</span>
                        <input @blur="txNumberFun(register.phoneVerificationCode)" v-model="register.phoneVerificationCode" id="gy-form-group-phone"  type="text" placeholder="请输入您收到的验证码">
                        <span @click="getPhoneClick()" :disabled="codeDisabled" class="gy-form-group-phone-code">{{ verificationNumber }}</span>
                        <p class="gy-form-group-explain gy-form-group-explain-code"  :class="{active:isActivetsjyzm}">{{overVerification}}</p>
                    </div>
                </div>
                <div class="gy-form">
                    <div class="gy-form-group">
                        <span class="l">真实姓名</span>
                        <input v-model="userName" type="text" placeholder="请输入您的真实姓名">
                        <p class="gy-form-group-explain"></p>
                    </div>
                </div>
                <div class="gy-form">
                    <div class="gy-form-group">
                        <span class="l">电子邮箱</span>
                        <input @keyup="emailFun(email)" v-model="email" type="text" placeholder="请输入电子邮箱">
                        <p class="gy-form-group-explain" :class="{active:isActiveEmail}">{{ verificationEmail }}</p>
                    </div>
                </div>
                <div class="gy-form">
                    <div class="gy-form-group">
                        <p class="gy-form-upgrade">如需企业注册请登录后到"我的中心" > "企业用户升级", 完善企业注册信息</p>
                        <p ><a :href="pdfSrc" target="_blank" class="gy-form-upgrade">&lt;&lt;国烨网&法大大电子合同系统合规性说明 &gt;&gt;</a></p>
                </div>
                </div>
                <div class="gy-form">
                    <div class="gy-form-group gy-form-agrees">
                        <span class="l"></span>
                        <input type="checkbox" class="gy-form-group-checkbox" v-model="register.agreeProtocol">
                        <p class="gy-form-agree">我已阅读并同意 <span class="gy-form-group-agreement" @click="registerGy()">&lt;&lt;国烨平台服务协议&gt;&gt;</span></p>
                    </div>
                </div>
                <div class="gy-form gy-form-button">
                    <div class="gy-form-group gy-form-agrees gy-form-register">
                        <span class="l"></span>
                        <button class="gy-button-extra gy-submit" @click="submit()">注册</button>
                    </div>
                </div>
            </form>
        </div>
        <!--<el-dialog class="register-fish" width="1000px" title="法大大说明"  :close-on-click-modal="showPdf" :visible.sync="showPdf">-->
        <!--</el-dialog>-->
        <el-dialog class="register-fish" width="1000px" title="国烨网平台协议"  :close-on-click-modal="registerModal" :visible.sync="dialogVisible">
            <div class="register-agre">
                <div class="register-ageesd">
                    <img :src="logo">
                    <span class="cehgn">生效时间:{{ newdatas | dates}}</span><br>
                    <span class="jianc">欢迎阅读国烨网平台服务协议(以下简称“本协议”)</span>
                </div>
                <div class="clear"></div>
                <div class="register-agees">
                    【审慎阅读】您在申请注册流程中点击同意本协议之前，应当认真阅读本协议。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用及解决争议条款。如您对本协议有任何疑问，可向国烨网平台客服咨询。
                </div>
                <div class="register-agees">
                    【签约动作】当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与国烨网达成一致，成为国烨网平台“用户”。阅读本协议过程中，如您不同意本协议或其中任何条款约定，您应立即停止注册程序。
                </div>
                <div class="register-agee">
                    <h4>第一条 定义</h4>
                    <span><i>1.1 国烨网平台/国烨网：</i>系指国烨能源集团有限公司所有并经营的，网址为http://www.chinayie.com/的跨境大宗电商互联网平台，还包括子平台“资讯中心”。</span><br>
                    <span><i>1.2 国烨网平台服务/国烨网服务：</i>系指国烨能源集团有限公司通过互联网，以包含国烨网、客户端等在内的各种方式（包括未来技术发展出现的新的服务方式）向您提供的各项服务。</span><br>
                    <span><i>1.3 您/用户：</i>指符合国烨网平台注册要求且注册为会员的法人或其他组织以及受该等法人或其他组织授权办理注册、开户等相关事宜的自然人。</span><br>
                </div>
                <div class="register-agee">
                    <h4>第二条 协议</h4>
                    <span><i>2.1  签约主体：</i>本协议由国烨网平台经营者（国烨能源集团有限公司）与用户共同缔结，本协议对您与国烨网平台经营者均具有法律效力。</span><br>
                    <span><i>2.2 协议完整性：</i>本协议内容包括本协议正文及国烨网平台已经发布或将来可能发布的各类规则，如交易规则、指南等。所有规则为本协议不可分割的一部分，与本协议正文具有同等法律效力。</span><br>
                    <span><i>2.3 协议变更：</i>国烨网平台有权根据业务需要酌情修订本协议，如本协议有任何变更，国烨网平台将在网站上刊载公告，不再单独另行通知予您。经修订的协议一经在国烨网公布，即产生效力。如您不同意相关修订，请您立即停止使用国烨网平台服务。如您继续使用国烨网平台服务，则将视为您已接受经修订的协议，当您与国烨网平台发生争议时，应以最新的协议为准。</span><br>
                    <span><i>2.4 接受：</i>以任何方式进入国烨网并使用国烨网平台服务即表示您已充分阅读、理解并同意接受本协议的条款和条件(以下合称“条款”)。</span><br>
                </div>
                <div class="register-agee">
                    <h4>第三条 风险提示</h4>
                    <span><i>3.1 风险承担：</i>使用国烨网的相关服务时将存在（但不限于）以下风险，您将承担由此导致的损失：</span><br>
                    3.1.1 由于国烨网无法控制和不可预测原因，如地震、水灾、火灾等不可抗力，系统故障、设备故障、通讯故障、电力故障、网络故障及其它因素,可能导致系统非正常运行甚至瘫痪,使您的交易指令或数据信息出现延迟、中断、数据错误、指令无法成交等情况；<br>
                    3.1.2 由于交易撮合、清算交收、行情揭示、资金划付是通过电子通讯技术和电脑技术来实现的，这些技术存在着被网络黑客和计算机病毒攻击的可能，因此导致的系统故障，可能使交易无法进行及行情信息出现错误或延迟，或资金不能及时到账，给您带来的损失；<br>
                    3.1.3互联网上的数据传输可能因通信繁忙等原因出现延迟、中断、数据错误或不完全，从而使网上数据传输或交易出现延迟、中断、错误等；<br>
                    3.1.4 如果您缺乏网上交易经验，可能因操作不当造成交易失败或交易失误；<br>
                    3.1.5 您未在规定时间内缴付所需保证金，导致您持有的交易合同可能因违约而被中止、终止；<br>
                    3.1.6 您应注意到，与以欺诈手段行事的人进行交易的风险是客观存在的；国烨网希望您在使用国烨网平台服务时，小心谨慎并运用常识；<br>
                    3.1.7 您有义务每日在国烨网阅读或提取交易结算资料或中心公告、通知等相关文件资料。如对交易结算数据有异议，您应在下一个交易日开市前以书面形式提出，否则视为确认交易结算结果。<br>
                    <span><i>3.2 不完全揭示：</i>上述风险提示可能无法完全揭示接受国烨网服务时可能面临的所有风险，您在开户之前，应全面了解国烨网公布的交易规则及其他文件，对您的经济承受能力和风险控制能力作出相应的判断，对大宗商品电子交易、云仓、物流等领域可能面临的风险做仔细的研究，在此基础上确定是否接受国烨网的服务。</span><br>
                    <span><i>3.3 商贸信息：</i>国烨网不能控制或保证国烨网平台上商贸信息的真实性、合法性、准确性，亦不能控制或保证交易所涉及的物品的质量、安全或合法性。</span><br>
                    <span><i>3.4 履行能力：</i>国烨网不能也不会控制或保证交易各方履行各项义务的能力。倘若您与一名或一名以上用户，或与您通过国烨网获取服务的第三方供应商发生争议，您在此确认，免除国烨网(及国烨网代理人和雇员)因该等争议而引起的，或在任何方面与该等争议有关的不同种类和性质的任何(实际和后果性的)权利主张、要求和损害赔偿等方面的责任。</span><br>
                </div>
                <div class="register-agee">
                    <h4>第四条 账户和安全</h4>
                    <span><i>4.1 用户资格：</i>您确认，在您开始注册程序使用国烨网服务前，您应当是具备完全民事权利能力并与所从事的民事行为相适应的自然人、法人或其他组织。否则您将承担一切后果，且国烨网有权注销（永久冻结）您的账户，并向您索偿。如您代表一家公司或其他法律主体在国烨网上注册登记，则您声明和保证，您有权使该公司或该法律主体受本协议“条款”的约束。</span><br>
                    <span><i>4.2 会员账户：</i></span><br>
                    4.2.1 当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，您可获得国烨网账户并成为国烨网会员。国烨网只允许每位用户使用一个国烨网账户。如有证据证明或国烨网有理由相信您存在不当注册或不当使用多个国烨网账户的情形，国烨网可采取冻结或关闭账户、取消订单、拒绝提供服务等措施，如给国烨网及相关方造成损失的，您还应当承担赔偿责任。<br>
                    4.2.2 您在国烨网注册会员账户时应按照法律法规及注册页面提示填写信息和提交相关资料（以下简称“您的资料”），国烨网如有合理理由怀疑您提供的资料错误、不实、过时或不完整的，有权向您发出询问及/或要求改正的通知，并有权直接做出删除相应资料的处理，直至中止、终止对您提供部分或全部服务，由此产生的一切损失由您个人承担，国烨网对此不承担任何责任。<br>
                    4.2.3 您特此保证，您对提交给国烨网的“您的资料”拥有全部权利，您有义务保持您提供信息的真实性及有效性。您应当及时更新您的资料，在法律有明确规定要求国烨网必须对部分用户的信息进行核实的情况下，国烨网依法不时地对您的信息进行检查核实，您应当配合提供最新、真实、完整、有效的信息。您确认，国烨网前述核实仅为一项权利，并非国烨网应当履行的义务，国烨网没有义务去认定或决定您提交给国烨网的资料哪些属于真实有效，哪些是应当受到保护的，对享有“服务”的其他用户使用“您的资料”，国烨网也不必负责。<br>
                    <span>4.3 资金账户：</span><br>
                    4.3.1 您可通过国烨网向与国烨网合作的银行申请资金账户（具体按国烨网合作银行的要求办理），该资金账户便于您在国烨网交易时资金划转。您授权国烨网将您的指令传达给银行，除非得到您的同意，国烨网不会干涉您的指令和资金划转行为，一切法律后果由您自行承担，指令的执行结果取决于银行，国烨网不对此负责。<br>
                    4.3.2 您应当对您的资金账户密码和操作安全负责，妥善保管资金账户、密码、U盾等资料和物品，因此造成的一切损失由您自行承担，国烨网对此不负责。<br>
                    4.3.3 根据交易规则，当您支付或接受保证金/货款时，为了保证交易的安全和便利，保证金和货款会在一定时间内被国烨网冻结，直到交易完成或其它解冻事由出现。您对此完全知晓并同意。<br>
                    4.3.4 保证金、货款等款项留存于您的资金账户期间，国烨网及国烨网合作银行将不向您支付任何利息。您对此完全知晓并同意。<br>
                    4.3.5 当您与交易对手发生纠纷时，您同意国烨网冻结相关保证金货款，直到您与交易对手双方达成一致意见或国烨网收到相关司法裁判文书。<br>
                    4.3.6 担保交易：为保障买卖双方合法权益并确保资金安全，当交易双方在国烨网选择担保交易，包括：<br>
                    4.3.6.1 资金锁定：如买方在当次交易中的支付环节选择“担保交易”，则付款将被锁定于平安银行担保专管账户中。<br>
                    4.3.6.2 资金解锁及支付：买方支付完成后，若确认收货并无异议，则应在担保时效内做出“确认收货”的操作，款项将从担保账户支付给卖方；如买方未在国烨网对当次交易进行“确认收货”的操作，则国烨网不会将平安银行电子担保账户的资金予以解锁。买卖双方一旦选择“担保支付”，即表明其不可撤销地授权国烨网根据该选择进行处理并接受该处理结果。<br>
                    4.3.6.3 退款申请：如有交易异议，买方应在担保时效内按国烨网的相关交易规则向卖方提出退款申请，并应自行与其进行协商联络。<br>
                    4.3.6.4 资金解锁及退款：资金锁定状态下，如交易双方根据国烨网的交易规则，经协商一致取消相关交易后，国烨网根据用户指令将平安银行担保专管账户的资金解锁并退款至相应买方账户。<br>
                    4.3.6.5 争议交易资金处置：因买卖双方发生交易争议而导致无法对平安银行电子担保账户中锁定的当次交易资金归属做出明确的认定，国烨则以买卖双方加盖公章的争议处理结果文书或对相关争议交易资金做出裁判的生效的司法文书（如诉讼判决书、仲裁裁决书）为准执行相关操作。<br>
                    <span>4.4 账户安全：</span><br>
                    4.4.1 您的账户系由您自行设置（包括但不限于账户名、昵称、绑定人手机号码、密码等）并由您保管，您应对账户项下的所有行为及结果（包括但不限于信息披露、发布信息、网上点击同意或提交各类规则协议、签署交易合同、金钱支付及向国烨网发出各项指令）负责。<br>
                    4.4.2 国烨网任何时候均不会主动要求您提供您的账户密码，因此建议您务必保管好您的账户密码，并确保您在每个上网时段结束时退出登录并以正确步骤离开国烨网。若账户密码因您泄露或因您遭受他人攻击、诈骗等行为而产生损失及后果，国烨网并不承担责任，您应通过司法、行政等救济途径向侵权行为人追偿。<br>
                    4.4.3 您同意，如发现任何人未经授权使用您的账户，或发生违反保密规定的任何其他情况，您会立即通知国烨网，并授权国烨网将该信息同步给您申请资金账户的合作银行，您理解国烨网对您的任何请求采取行动均需要合理时间，且国烨网应您请求而采取的行动可能无法避免或阻止侵害后果的形成或扩大，除国烨网应承担的法定责任外，国烨网不承担责任。<br>
                    <span><i>4.5 账户转让：</i> 因您的账户关联您的信用信息，仅当有法律明文规定、司法裁定或经国烨网同意，并符合国烨网平台规则规定的账户转让流程的情况下，您可进行账户转让。您的账户一经转让，该账户项下权利义务一并转移。除此外，您的账户不得以任何方式转让，否则国烨网有权追究您的违约责任，且由此产生的一切责任均由您承担。</span><br>
                    <span><i>4.6 账户注销：</i> 若您不再继续在国烨网平台参与交易，应申请办理账户注销手续。未办理注销手续的，您应对您账户发生的所有行为承担全部责任。</span><br>
                </div>
                <div class="register-agee">
                    <h4>第五条 服务终止</h4>
                    <span><i>5.1 未收费终止：</i>您同意，在国烨网未向您收费的情况下，国烨网可自行全权决定以任何理由终止您账户的使用，并可进一步使您的账户无效，或注销您的账户以及在您的账户内的所有相关资料和档案。前述国烨网服务终止后，国烨网没有义务为您保留原账户中或与之相关的任何信息，或转发任何未曾阅读或发送的信息给您或第三方。您同意，国烨网不会就终止向您提供国烨网平台服务而对您或任何第三方承担任何责任。</span><br>
                    <span><i>5.2 已收费终止：</i>您同意在国烨网向您收费的情况下，如国烨网基于合理的怀疑认为您有违约情形亦可实施上述终止国烨网平台服务的行为。</span><br>
                    <span><i>5.3 注销账户：</i>您有权向国烨网申请终止向您提供国烨网平台服务并注销您的账户，经国烨网审核同意的，国烨网将注销您的账户。另外，在适用5.1条及5.2条规定，国烨网终止向您提供国烨网服务的情形下，国烨网也有权注销您的账户。您的账户被注销后，在您履行完毕所有对国烨网义务时，您与国烨网基于本协议的合同关系即终止，除国烨网的法定义务外，国烨网没有义务为您保留或向您披露您账户中的任何信息，也没有义务向您或第三方转发任何您未曾阅读或发送过的信息。</span><br>
                    <span><i>5.4 您理解并同意，您与国烨网的合同关系终止后：</i></span><br>
                    5.4.1 国烨网有权保留您的注册数据及以前的交易行为记录。<br>
                    5.4.2 若您在注销前在国烨网平台上存在违法行为或违反本协议和/或规则的行为的，国烨网仍可依据本协议向您主张权利。<br>
                    5.4.3 您在使用国烨网平台服务期间因使用国烨网服务与其他用户之间发生的关系，不因本协议的终止而终止，其他用户仍有权向您主张权利，您应继续按您的承诺履行义务。<br>
                </div>
                <div class="register-agee">
                    <h4>第六条 用户的权利和义务</h4>
                    <span><i>6.1 用户名及密码：</i>用户有权拥有自己在国烨网的用户名及密码，并有权使用自己的用户名及密码随时登录国烨网。除本协议另有约定外，用户不得以任何形式擅自转让或授权他人使用自己国烨网的用户名和密码。</span><br>
                    <span><i>6.2 使用国烨网平台功能：</i>通过国烨网平台，您可在国烨网上发布大宗商品或仓储库存交易信息、查询商品和服务信息、达成交易意向并进行交易、管理查询转让在库商品、对其他用户进行评价、参加国烨网组织的活动以及使用其它信息服务及技术服务。</span><br>
                    <span><i>6.3 信息发布要求：</i>用户发布在国烨网平台上的信息必须真实。您应当确保您所发布的信息不包含以下内容：</span><br>
                    （1） 违反国家法律法规禁止性规定的；<br>
                    （2） 欺诈、虚假、不准确或存在误导性的；<br>
                    （3） 侵犯他人知识产权或涉及第三方商业秘密及其他专有权利的；<br>
                    （4） 存在可能破坏、篡改、删除、影响国烨网平台任何系统正常运行或未经授权秘密获取国烨网平台及其他用户的数据、个人资料的病毒、木马等恶意软件、程序代码的。
                    <span><i>6.4 信息审核和使用：</i>用户同意国烨网平台可以自行或通过合作的第三方机构对用户提交或国烨网平台收集的用户信息（包括但不限于用户的身份信息、财务信息、工作信息、经营信息等）进行核实，并对获得的核实结果根据相关法律法规、本协议及有关文件进行查看、使用和留存等操作。</span><br>
                    <span><i>6.5 修改合同文本：</i>国烨网给交易各方提供的合同文本或其它文件（如有）仅为建议和参考，不代表国烨网的合同或交易立场。如您不能接受相应文件，可与交易对方另行协商或直接中止交易或服务。国烨网不因所提供的合同或其它文本承担任何责任。</span><br>
                    <span><i>6.6 调解纠纷：</i>用户在国烨网上交易过程中若与其他用户因交易等行为产生纠纷，可请求国烨网从中予以协调。</span><br>
                    <span><i>6.7 禁止恶意评价：</i>用户不得在国烨网上恶意评价其他用户，或采取不正当手段提高自身的信用或降低其他用户的信用。</span><br>
                    <span><i>6.8 用户承诺：</i>用户承诺自己在使用国烨网时实施的所有行为均遵守国家法律、法规和国烨网相关规定以及各种社会公共利益或公共道德。如有违反导致任何法律后果的发生，用户应自行承担全部法律责任，国烨网因此而遭受损失的，用户应承担全部法律责任。</span><br>
                </div>
                <div class="register-agee">
                    <h4>第七条 国烨网的权利和义务</h4>
                    <span><i>7.1 收费：</i>国烨网保留向您收费的权利，在国烨网发布收费规则后，如您不同意，您应立即退出国烨网的相关服务。您在使用国烨网服务过程中，按法律规定应承担的税赋义务均由您自行承担。</span><br>
                    <span><i>7.2 技术支持：</i>国烨网致力于在现有技术上维护整个交易平台的正常运行，并努力提升和改进技术，使用户网上交易活动得以顺利进行，但如同3.1条和9.1.2条所规定，国烨网对应由您承担风险的技术问题不承担责任。</span><br>
                    <span><i>7.3 信息审查：</i>存在下列情形之一，国烨网在提供服务的过程中有权根据不同情况选择保留或删除相关信息或继续、停止对该用户提供服务，并追究相关法律责任：</span><br>
                    （1） 用户或其他第三方通知国烨网，认为某个具体用户或具体交易事项可能存在重大问题；<br>
                    （2） 用户或其他第三方向国烨网告知交易平台上有违法或不当行为的，国烨网以普通非专业交易者的知识水平标准对相关内容进行判别，可以明显认为这些内容或行为具有违法或不当性质的；<br>
                    （3） 国烨网认为用户存在其他违法或有违诚信等其他不当行为的。 用户确认，上述国烨网的审查和决定仅系国烨网的一项权利而非国烨网的义务。<br>
                    <span><i>7.4 调解纠纷：</i>用户在国烨网交易过程中如与其他用户因交易产生纠纷，请求国烨网从中予以调处，经国烨网审核后，国烨网有权通过电子邮件等联系纠纷双方了解情况，并将所了解的情况通过电子邮件等互相通知对方。因国烨网非司法机构，您完全理解并承认，国烨网对证据的鉴别能力及对纠纷的处理能力有限，受理用户间的争议完全是基于您之委托，不保证争议处理结果符合您的期望，亦不对争议处理结果承担任何责任。</span><br>
                    <span><i>7.5 网络公布：</i>经生效法律文书确认用户存在违法或违反本协议行为或者国烨网自行判断用户涉嫌存在违法或违反本协议行为的，国烨网有权在国烨网上以网络发布形式公布用户的违法行为并对该用户在国烨网的权限做出相应的限制（包括但不限于限制权利、终止国烨网平台服务等）。</span><br>
                </div>
                <div class="register-agee">
                    <h4>第八条 许可使用权</h4>
                    <span><i>8.1 您完全理解并同意不可撤销地授予国烨网及其关联公司下列权利：</i></span><br>
                    8.1.1 您授予国烨网及其关联公司独家的、全球通用的、永久的、免费的许可使用权利(并有权在多个层面对该权利进行再授权)，使国烨网及其关联公司有权(全部或部分地)使用、复制、修订、改写、发布、翻译、分发、执行和展示用户的全部数据资料（包括但不限于“您的资料”、交易行为数据及全部展示于网站的各类信息）或制作其派生作品，和/或以现在已知或日后开发的任何形式、媒体或技术，将其纳入其他作品内。<br>
                    8.1.2 您了解并确认，一旦您自愿在国烨网提交、披露第8.1.1条所述的资料，该等资料即可能被其他人士获取和使用。<br>
                    8.1.3 当您违反本协议或与国烨网签订的其他协议，国烨网有权采取包括但不限于资金强制划转等在内的任何措施，并可中止或终止对您提供部分或全部国烨网平台服务，且通过一定途径公示您的违约情况。国烨网无须就此限制措施或公示行为向您承担任何责任。<br>
                    <span><i>8.2 信息共享：</i>为方便您使用国烨网平台服务，您同意无条件授权国烨网将您在账户注册和使用国烨网平台服务过程中提供、形成的信息传递给其他相关服务提供者（包括但不限于您申请资金账户的与国烨网有合作的银行），或从其他相关服务提供者处获取您在注册、使用相关服务期间提供、形成的信息。</span><br>
                </div>
                <div class="register-agee">
                    <h4>第九条 责任限制、赔偿及补救措施</h4>
                    <span><i>9.1 责任限制：</i></span><br>
                    9.1.1 您明确理解和同意，国烨网不对下述任一情况产生的任何损害承担赔偿责任，包括但不限于利润、商誉、使用、数据等方面的损失或其他无形损失(无论国烨网是否已被告知该等损害赔偿的可能性)：<br>
                    (i) 使用或未能使用国烨网平台服务；<br>
                    (ii) 因通过国烨网平台购买或获取任何货物、样品、数据、资料或服务，或通过国烨网平台接收任何信息或缔结任何交易所产生的获取替代货物和服务的费用；<br>
                    (iii) 未经批准接入或更改您的传输资料或数据；<br>
                    (iv) 任何第三方对国烨网平台服务的声明或行为；<br>
                    (v) 因任何原因而引起的与国烨网平台服务有关的任何其他事宜，包括疏忽。<br>
                    9.1.2 国烨网不能随时预见到任何技术上的问题或其他困难，该等困难可能会导致数据损失或其他服务中断。为此，您明确理解和同意，您使用国烨网平台服务的风险由您自行承担，且国烨网平台服务以“按现状”和“按可得到”的状态提供。国烨网明确声明不作任何种类的明示或暗示的保证，包括但不限于时效性、适用于某一特定用途和无侵权行为等方面的保证。国烨网对下述内容不作保证：<br>
                    (i) 国烨网平台服务会符合您的要求；<br>
                    (ii) 国烨网平台服务不会中断，且适时、安全和不带任何错误；<br>
                    (iii) 通过使用国烨网平台服务而可能获取的结果将是准确或可信赖的；<br>
                    (iv) 您通过国烨网平台而购买或获取的任何产品、服务、资料或其他材料的质量将符合您的预期。通过使用国烨网平台服务而下载或以其他形式获取任何材料是由您自行全权决定进行的，且与此有关的风险由您自行承担，对于因您下载任何该等材料而发生的您的电脑系统的任何损毁或任何数据损失，您将自行承担责任。您从国烨网平台或通过国烨网平台服务获取的任何口头或书面意见或资料，均不构成未在本协议内明确载明的任何保证责任。
                    <span><i>9.2 全额赔偿：</i>您同意，如因您违反本协议或本协议提及的其他文件，或因您违反法律侵害了第三方的合法权利，或因您违反法律须承担行政或刑事责任，而使第三方或行政、司法机关对国烨网及其子公司、关联公司、分公司、董事、职员、代理人提出索赔或处罚要求（包括司法费用和其他专业人士的费用），您必须全额赔偿国烨网及其子公司、关联公司、分公司、董事、职员、代理人，并使其免遭损失。</span><br>
                    <span><i>9.3 补救措施：</i>在不限制其他补救措施的前提下，发生下述任一情况，国烨网可立即发出警告，暂时中止、永久中止或终止您的会员资格，删除您的任何现有产品信息，以及您在网站上展示的任何其他资料：</span><br>
                    (i) 您违反本协议；<br>
                    (ii) 国烨网无法核实或鉴定您向国烨网提供的任何资料；<br>
                    (iii) 国烨网相信您的行为可能会使您与其他用户或通过国烨网向国烨网提供服务的第三方供应商发生任何争议纠纷，从而产生法律责任。在不限制任何其他补救措施的前提下，若发现您通过国烨网从事涉及诈骗的活动，国烨网可暂停或终止您的账户。<br>
                </div>
                <div class="register-agee">
                    <h4>第十条 链接</h4>
                    <span>10.1国烨网可根据具体情况与其他网站或资源建立链接。但，由于国烨网并不控制该等网站和资源，您承认并同意，国烨网并不对该等外在网站或资源的可用性负责，且不认可该等网站或资源、或可从该等网站或资源获取的任何内容、宣传、产品、服务或其他材料，也不对其真实性等负责或承担任何责任。您进一步承认和同意，对于任何因使用或信赖从此类网站或资源上获取的此类内容、宣传、产品、服务或其他材料而造成（或声称造成）的任何直接或间接损失，国烨网均不承担责任。</span><br>
                    <h4>第十一条 通知与送达</h4>
                    <span><i>11.1 通知：</i>您应当准确填写并及时更新您提供的电子邮件地址、联系电话、联系地址、邮政编码等联系方式，以便国烨网或其他用户与您进行有效联系，因通过这些联系方式无法与您取得联系，导致您在使用国烨网服务过程中产生任何损失或增加费用的，应由您完全独自承担。您了解并同意，您有义务保持您提供的联系方式的有效性，如有变更，应及时进行通知。</span><br>
                    <span><i>11.2 送达：</i>除非另有明确规定，任何您与国烨网之间的通知应以电子邮件形式发送，国烨网电子邮件地址为“customer@chinayie.com”，您的电子邮件地址以您在注册时提交的为准。在电子邮件发出二十四(24)小时后，通知应被视为已送达，除非发送人被告知相关电子邮件地址已作废。</span><br>
                    <h4>第十二条 其他</h4>
                    <span><i>12.1 法律适用：</i>本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律。</span><br>
                    <span><i>12.2 可分性：</i>本协议任一条款被视为废止、无效或不可执行，该条款应视为可分的且不影响本协议其余条款的有效性及可执行性。</span><br>
                    <span><i>12.3 转让：</i>您同意国烨网因经营业务需要有权将本协议项下的权利义务就部分或全部进行转让，而无须再通知予您并取得您的同意。</span><br>
                    <span><i>12.4 争议解决：</i>因本协议或国烨网服务所引起或与其有关的任何争议应向国烨能源集团有限公司所在地人民法院提起诉讼。</span><br>
                    <span><i>12.5 生效：</i>本协议自您成功注册为国烨网用户之日起生效。</span><br>
                </div>
            </div>
            <div class="aggren">
                <button class="gy-button-normal" @click="agree()">同意并继续</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'register',
    data () {
        return {
            logo: require('@/assets/images/logo.png'),
            pdfSrc: require('@/assets/images/aaa.pdf'),
            register: {
                phoneVerificationCode: '',
                graphicVerificationCode: '',
                agreeProtocol: true
            },
            email: '',
            password: '',
            phoneNumber: '',
            account: '',
            userName: '',
            graphicVerificationCodee: '',
            verificationEmail: '',
            YZMAccount: '',
            verificationAccount: '以字母开头、允许字母、数字和下划线，6-20个字符',
            verificationPassword: '包含大小写字母和数字，不能使用特殊字符，8-20个字符',
            verificationPhone: '验证通过后，您可以通过此手机找回密码',
            verificationNumber: '获取验证码',
            overVerification: '',
            // 是否禁用按钮
            codeDisabled: false,
            timer: null,
            isActivePassword: false,
            isActiveUser: false,
            isActivetzm: false,
            isActivetsjyzm: false,
            isActivePhone: false,
            isActiveEmail: false,
            isActiveWeak: false,
            isActiveMiddle: false,
            isActiveStrong: false,
            count: 0,
            TIME_COUNT: 60,
            userType: 0,
            dialogVisible: false,
            registerModal: false,
            newDate: '',
            newdatas: '',
            showPdf: false
        };
    },
    created () {
        this.getGraphic();
        this.newdata();
        localStorage.removeItem('jump', true);
    },
    methods: {
        newdata () {
            this.newDate = new Date();
            this.newdatas = Date.parse(this.newDate);
            console.log(this.newdatas);
        },
        // 协议
        close () {
            let that = this;
            that.dialogVisible = false;
        },
        registerGy () {
            let that = this;
            that.dialogVisible = true;
        },
        agree () {
            let that = this;
            that.dialogVisible = false;
            that.register.agreeProtocol = true;
        },
        // 验证码倒计时
        getCode () {
            if (!this.timer) {
                this.count = this.TIME_COUNT;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= this.TIME_COUNT) {
                        this.count--;
                        this.verificationNumber = this.count + ' s';
                    } else {
                        this.codeDisabled = true;
                        this.verificationNumber = '获取验证码';
                        this.overVerification = '';
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000);
            }
        },
        getGraphic () {
            let that = this;
            that.$http.get(that.$api.register.graphic)
                .then(res => {
                    that.graphicVerificationCodee = res.data.data;
                });
        },
        refreshGraphic () {
            let that = this;
            that.$http.get(that.$api.register.graphic + '?a=' + new Date().getTime())
                .then(res => {
                    that.graphicVerificationCodee = res.data.data;
                });
        },
        getPhone () {
            let registerPhone = this.phoneNumber;
            let that = this;
            that.getCode();
            that.$http.get(that.$api.register.phoneNumber + '/' + registerPhone)
                .then(function (res) {
                }).catch(() => {
                    console.log('出错了');
                });
        },
        getPhoneClick () {
            if (this.phoneNumber === '') {
                this.verificationPhone = '请填写手机号';
                this.isActivePhone = true;
                return;
            }
            if (this.verificationPhone !== '') {
                return;
            }
            this.isActivePhone = false;
            if (this.count > 0) {
                this.overVerification = '验证码发送中,请耐心等待';
                return;
            }
            this.getPhone();
        },
        accountFun (rule) {
            let that = this;
            if (rule === '') {
                that.isActiveUser = false;
                that.verificationAccount = '以字母开头、允许字母、数字和下划线，6-20个字符';
            } else {
                that.isActiveUser = true;
                if (rule.length < 6 || rule.length > 20) {
                    that.verificationAccount = '请填写6到20个字符';
                } else if (/^[0-9]+$/.test(rule)) {
                    that.verificationAccount = '不能全是数字';
                } else {
                    let reg = /^[a-zA-Z]([-_a-zA-Z0-9]{6,20})$/;
                    if (!reg.test(rule)) {
                        that.verificationAccount = '以字母开头、允许字母、数字和下划线，6-20个字符';
                    } else {
                        that.isActiveUser = false;
                        that.verificationAccount = '';
                        that.postAccount();
                    }
                }
            }
        },
        passwordFun (rule) {
            let that = this;
            if (rule === '') {
                that.isActivePassword = false;
                that.verificationPassword = '包含大小写字母和数字，不能使用特殊字符，8-20个字符';
            } else {
                that.isActivePassword = true;
                if (rule.length < 8 || rule.length > 20) {
                    that.verificationPassword = '请填写8到20个字符';
                    that.isActiveWeak = false;
                    that.isActiveMiddle = false;
                    that.isActiveStrong = false;
                } else if (/^[0-9]+$/.test(rule)) {
                    that.verificationPassword = '不能全是数字';
                } else {
                    let reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
                    if (reg.test(rule)) {
                        that.verificationPassword = '包含大小写字母和数字，不能使用特殊字符，8-20个字符';
                        that.isActiveWeak = false;
                        that.isActiveMiddle = false;
                        that.isActiveStrong = false;
                        that.isActivePassword = true;
                    } else {
                        that.isActivePassword = false;
                        that.verificationPassword = '';
                        if (rule.length >= 8 && rule.length <= 12) {
                            that.isActiveWeak = true;
                        } else if (rule.length > 12 && rule.length <= 15) {
                            that.isActiveMiddle = true;
                        } else {
                            that.isActiveStrong = true;
                        }
                    }
                }
            }
        },
        phoneNumberFun (rule) {
            let that = this;
            if (rule === '') {
                that.isActivePhone = false;
                that.verificationPhone = '验证通过后，您可以通过此手机找回密码';
            } else {
                that.isActivePhone = true;
                if (rule !== '') {
                    let reg = /^1[3456789]\d{9}$/;
                    if (!reg.test(rule)) {
                        that.verificationPhone = '请输入有效的手机号码';
                    } else {
                        that.postPhone();
                        that.isActivePhone = false;
                        that.verificationPhone = '';
                    }
                }
            }
        },
        emailFun (rule) {
            let that = this;
            if (rule === '') {
                that.isActiveEmail = false;
                that.verificationEmail = '';
            } else {
                that.isActiveEmail = true;
                if (rule !== '') {
                    let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                    if (!reg.test(rule)) {
                        that.verificationEmail = '请输入有效的邮箱';
                    } else {
                        that.postEmail();
                        that.isActiveEmail = false;
                        that.verificationEmail = '';
                    }
                }
            }
        },
        txNumberFun (rule) {
            let that = this;
            if (rule === '') {
                that.isActivetsjyzm = true;
                that.overVerification = '验证码必填';
            } else {
                that.isActivetsjyzm = false;
                that.overVerification = '';
            }
        },
        txNumberFun2 (rule) {
            let that = this;
            if (rule === '') {
                that.isActivetzm = true;
                that.YZMAccount = '验证码必填';
            } else {
                that.isActivetzm = false;
                that.YZMAccount = '';
            }
        },
        submit () {
            let that = this;
            if (that.account === '') {
                that.verificationAccount = '不能为空';
                that.isActiveUser = true;
                return false;
            }
            if (that.isActiveUser === true) {
                that.verificationAccount = '用户名不符合要求，请重新填写';
                return false;
            }
            if (that.password === '') {
                that.verificationPassword = '不能为空';
                that.isActivePassword = true;
                return false;
            }
            if (that.isActivePassword === true) {
                that.verificationPassword = '密码不符合要求，请重新填写';
                return false;
            }
            if (that.phoneNumber === '') {
                that.verificationPhone = '不能为空';
                that.isActivePhone = true;
                return false;
            }
            if (that.isActivePhone === true) {
                that.verificationPhone = '手机号不正确，请重新填写';
                return false;
            }
            if (that.register.graphicVerificationCode === '') {
                that.YZMAccount = '验证码必填';
                that.isActivetzm = true;
                return false;
            }
            if (that.register.phoneVerificationCode === '') {
                that.overVerification = '验证码必填';
                that.isActivetsjyzm = true;
                return false;
            }
            if (that.isActiveEmail === true) {
                that.verificationEmail = '邮箱不正确，请重新填写';
                return false;
            }
            that.register.account = that.account;
            that.register.password = that.password;
            that.register.phoneNumber = that.phoneNumber;
            that.register.email = that.email;
            that.register.userName = that.userName;
            that.$http.post(that.$api.register.register, that.register)
                .then(function (res) {
                    if (res.data.code === 0) {
                        that.$alert('注册成功，前往登录？', '提示')
                            .then(() => {
                                that.$router.push({name: 'login'});
                            });
                        return;
                    }
                    that.$alert(res.data.message, '出错了');
                }).catch(() => {
                    console.log('出错了');
                });
        },
        postAccount () {
            let that = this;
            that.$http.post(that.$api.register.checkAccount, {
                account: that.account,
                userType: that.userType
            }).then(function (res) {
                if (res.data.code === 0) {
                    if (res.data.data === true) {
                        that.isActiveUser = true;
                        that.verificationAccount = '用户名已经被注册，请重新填写';
                    } else {
                        that.isActiveUser = false;
                        that.verificationAccount = '';
                    }
                } else {
                    that.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            });
        },
        postEmail () {
            let that = this;
            that.$http.post(that.$api.register.checkEmail, {
                email: that.email,
                userType: that.userType
            }).then(function (res) {
                if (res.data.code === 0) {
                    if (res.data.data === true) {
                        that.isActiveEmail = true;
                        that.verificationEmail = '邮箱已经存在，请更换邮箱';
                    } else {
                        that.isActiveEmail = false;
                        that.verificationEmail = '';
                    }
                } else {
                    that.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            });
        },
        postPhone () {
            let that = this;
            that.$http.post(that.$api.register.checkPhone, {
                phoneNumber: that.phoneNumber,
                userType: that.userType
            }).then(function (res) {
                if (res.data.code === 0) {
                    if (res.data.data === true) {
                        that.isActivePhone = true;
                        that.verificationPhone = '手机号已经存在，请更换手机号';
                    } else {
                        that.isActivePhone = false;
                        that.verificationPhone = '';
                    }
                } else {
                    that.$message({
                        type: 'error',
                        message: res.data.message
                    });
                }
            });
        }
        // AnalyzePasswordSecurityLevel(password) {
        //     let pwdArray = new Array();
        //     let securityLevelFlag = 0;
        //     if (password.length < 6) {
        //         return 0;
        //     } else {
        //         var securityLevelFlagArray = new Array(0, 0, 0, 0);
        //         for (var i = 0; i < password.length; i++) {
        //             var asciiNumber = password.substr(i, 1).charCodeAt();
        //             if (asciiNumber >= 48 && asciiNumber <= 57) {
        //                 securityLevelFlagArray[0] = 1; // digital
        //             } else if (asciiNumber >= 97 && asciiNumber <= 122) {
        //                 securityLevelFlagArray[1] = 1; // lowercase
        //             } else if (asciiNumber >= 65 && asciiNumber <= 90) {
        //                 securityLevelFlagArray[2] = 1; // uppercase
        //             } else {
        //                 securityLevelFlagArray[3] = 1; // specialcase
        //             }
        //         }
        //         for (var i = 0; i < securityLevelFlagArray.length; i++) {
        //             if (securityLevelFlagArray[i] == 1) {
        //                 securityLevelFlag++;
        //             }
        //         }
        //         return securityLevelFlag;
        //     }
        // }
    },
    watch: {
        account: function (rule, value) {
            let that = this;
            if (rule === '') {
                that.isActiveUser = false;
                that.verificationAccount = '以字母开头、允许字母、数字和下划线，6-20个字符';
            }
        },
        email: function (rule, value) {
            let that = this;
            if (rule === '') {
                that.isActiveEmail = false;
                that.verificationAccount = '';
            }
        },
        password: function (rule, value) {
            let that = this;
            if (rule === '') {
                that.isActivePassword = false;
                that.verificationPassword = '包含大小写字母和数字，不能使用特殊字符，8-20个字符';
            }
        },
        phoneNumber: function (rule, value) {
            let that = this;
            if (rule === '') {
                that.isActivePhone = false;
                that.verificationPhone = '验证通过后，您可以通过此手机找回密码';
            }
        }
    }
};
</script>
<style lang="scss" scoped>
    .register-main-bagk{
        width: 100%;
        background: $color-white;
        margin: 10px 0;
        position: relative;
        .register-main{
            /*padding: 5px 0;*/
            margin: 0 auto;
            width: 1200px;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: $border-radius-base;
            h3{
                margin: 0 0 20px;
            }
            .register-logo{
                display: inline-block;
                margin-left: 14px;
            }
            .gy-form{
                padding: 0;
                input{
                    height: 40px;
                }
                .gy-form-phone{
                    position: relative;
                }
                .gy-form-agrees{
                    position: relative;
                }
                .gy-form-group{
                    width: 100%;
                    input[type=text]{
                        width: 500px !important;
                        margin-left: 36px;
                    }
                    input[type=password]{
                        width: 500px !important;
                        margin-left: 36px;
                    }
                    .active{color: red;}
                    .activeWeak{
                        background-color: green!important;
                    }
                    .activeMiddle{
                        background-color: green!important;
                    }
                    .activeStrong{
                        background-color: green!important;
                    }
                    input[type=password]{
                        width: 500px !important;
                    }
                    #gy-form-group-phone{
                        width: 370px!important;
                    }
                    #gy-form-group-img{
                        width: 385px!important;
                    }
                    .changone{
                        cursor:pointer;
                        margin-left: 5px;
                    }
                    .gy-form-group-imgs{
                        display: inline-block;
                        width: 105px;
                        height: 40px;
                        margin-left: 7px;
                        border:1px solid $color-border;
                    }
                    .gy-form-group-security{
                        margin-left: 41px;
                        display: inline-block;
                        font-size: $body-font-size;
                        color: $color-main;
                    }
                    .gy-form-group-phone-code{
                        display: inline-block;
                        width: 125px;
                        height: 40px;
                        background: #D1D2D5;
                        position: absolute;
                        top: 10px;
                        text-align: center;
                        line-height: 40px;
                        cursor:pointer;
                        margin-left: 5px ;
                    }
                    .gy-form-group-explain-code{
                        margin-left: 165px!important;
                    }
                    .gy-form-group-security-highlight{
                        display: inline-block;
                        width: 40px;
                        height: 8px;
                        background: #D8D8D8;
                        margin-left: 8px;
                        border-radius: $border-radius-small;
                    }
                    .gy-form-group-security-highlight-first{
                        margin-left: 15px;
                    }
                    .gy-form-group-agreement{
                        font-size: $body-font-size;
                        color:red;
                        cursor:pointer;
                        margin-left: 5px;
                    }
                    .gy-form-upgrade{
                        color: #4A90E2;
                        margin-left: 29px;;

                    }
                    .l{
                        display: inline-block;
                        color: $color-main;
                        font-size: 16px;
                        font-family: $body-font-family;
                        width: 120px;
                        height: 22px;
                        padding-left: 30px;
                    }
                    .gy-form-group-explain{
                        display: inline-block;
                        margin-left: 33px;
                    }
                    .gy-form-agree{
                        display: inline-block;
                        position: absolute;
                        top: 7px;
                    }
                    .gy-form-group-checkbox{
                        width: 16px;
                        height: 16px;
                        margin-left: 27px;
                        margin-right: 16px;
                    }
                    .gy-form-register{
                        position: relative;
                    }
                    .gy-submit{
                        position: absolute;
                        left: 568px;
                    }
                }
            }
        }
        .register-fish{
            width: 1000px;
            height: auto;
            margin: 0 auto;
            position: absolute;
            background: $color-white;
            border-radius:$border-radius-base;
            .agreement{
                position: relative;
                width: 100%;
                height: 50px;
                line-height: 50px;
                padding-left: 15px;
                color: $color-body-bg;
                background-color: $color-highlight;
                border-radius:$border-radius-base;
                span{
                    position: absolute;
                    right: 15px;
                    top: 0px;
                    color: $color-black;
                }
            }
        }
        .aggren{
            width: 100%;
            height: 80px;
            text-align: center;
            line-height:80px;
            button{
                height: 50px;
                width: 120px;
            }
        }
        .register-agre{
            width: 100%;
            height: 500px;
            border: 2px solid $color-white;
            border-radius: $border-radius-base;
            background: $color-white;
            color: $color-black;
            overflow-y:auto;
        }
        .register-agee{
            margin-left: 45px;
        }
        .register-agees{
            margin-left: 30px;
        }
        .clear{
            clear:both;
        }
        .register-ageesd{
            margin-left: 30px;
            margin-bottom: 30px;
            position: relative;
            img{
                width: 50px;
                height: 50px;
                display: inline-block;
            }
            span{
                margin-left: 15px;
                height: 20px;
            }
            .cehgn{
                position: absolute;
                top: 3px;
            }
            .jianc{
                position: absolute;
                top: 25px;
                left: 55px;
            }
        }
        span{
            display: inline-block;
            margin-left: -15px;
            i{
                font-weight: bold;
            }
        }
        h4{
            margin-left: -15px;
        }
    }
</style>
<style lang="scss">
        .register-fish{
            bottom: inherit;
            .el-dialog{
                margin: 0!important;
                .el-dialog__header{
                    height: 50px;
                    line-height: 55px;
                    padding: 0px 0px 0px 15px;
                    background-color: #F2F3F7;
                    .el-dialog__title{
                        color: $color-black;
                        font-weight: bold;
                    }
                }
                .el-dialog__body{
                    padding: 0px;
                }
            }
        }
    .register-main-bagk{
        .btred{
            color: red;margin-right: 10px;vertical-align: middle;
        }
    }
</style>
