<template>
  <div class="account-company">
    <div class="add-comapny">
      <div class="gy-h4">公司信息及功能</div>
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
        <form action="javascript:;">
          <div class="gy-form">
            <div class="gy-form-group"><span class="l">公司名称</span> {{companyInfo.name}}</div>
            <div class="gy-form-group"><span class="l">公司电话</span> {{companyInfo.phone}}</div>
            <div class="gy-form-group">
              <span class="l">公司类型</span>
              <span>{{(companyTypeList.find(item => item.id === companyInfo.companyTypeId) || {}).name}}</span>
            </div>
            <div class="gy-form-group"><span class="l">邮箱</span> {{companyInfo.email}}</div>
            <div class="gy-form-group" v-if="companyInfo.carriageScopeList && companyInfo.carriageScopeList.length > 0">
              <span class="l">承运范围</span>
              <span v-for="(key) in companyInfo.carriageScopeList" :key="key.id">{{key}}</span>
            </div>
            <div class="gy-form-group form-group-address"><span class="l">公司地址</span> {{companyInfo.companyAdress}}
            </div>
            <img-card class="text-top"
                      label="危化品资质"
                      :type="imgViewType[0]"
                      ref="dangerous"
                      :imgList="imgList"
                      :imgType="'dangerous'"
                      :show="imgshow1"
                      @imgClick="showImg">
            </img-card>
            <img-card class="text-top"
                      label="运输资料"
                      :type="imgViewType[0]"
                      ref="transInfo"
                      :imgList="imgList"
                      :imgType="'transInfo'"
                      :show="imgshow2"
                      @imgClick="showImg">
            </img-card>
            <img-card class="text-top"
                      label="仓储危险品经营许可证"
                      :type="imgViewType[0]"
                      ref="storage"
                      :imgList="imgList"
                      :imgType="'storage'"
                      :show="imgshow3"
                      @imgClick="showImg">
            </img-card>
            <img-card v-if="!!imgList.business.list.length"
              label="公司证照"
              :type="imgViewType[0]"
              ref="business"
              :imgList="imgList"
              :imgType="['business', 'orgCode', 'tax']"
              :show="!!imgList.business.list.length"
              @imgClick="showImg">
            </img-card>
            <img-card v-if="!!imgList.certificate.list.length"
              label="三证合一"
              :type="imgViewType[0]"
              ref="certificate"
              :imgList="imgList"
              imgType="certificate"
              :show="!!imgList.certificate.list.length"
              @imgClick="showImg">
            </img-card>
            <div class="gy-form-group single-row">
              <div class="img-margin-left">
                统一社会信用代码&nbsp;&nbsp;
                <el-input :disabled="tabMenu[0].status === 2" v-model="companyInfo.socialCode"
                          style="width: 20%;"></el-input>
              </div>
            </div>
            <img-card v-if="tabMenuSelected === 0"
              label="管理员授权"
              :type="imgViewType[0]"
              ref="authen"
              :imgList="imgList"
              :imgType="'authen'"
              @imgClick="showImg">
            </img-card>
            <div class="gy-form-button">
              <template v-if="tabMenu[0].status === 2">
                <button class="gy-button-normal" v-if="imgViewType[0] === 'view'" @click="$set(imgViewType, 0, 'edit')">
                  编辑资料
                </button>
                <button class="gy-button-normal" v-if="imgViewType[0] === 'edit'" @click="$set(imgViewType, 0, 'view')">
                  取消
                </button>
                <button class="gy-button-extra" v-if="imgViewType[0] === 'edit'" @click="submitEdit(0)">保存</button>
              </template>
              <button class="gy-button-extra" v-show="tabMenu[0].status !== 3" @click="authSubmit('2')">审核通过</button>
              <button class="gy-button-normal" v-show="tabMenu[0].status !== 2&&tabMenu[0].status !== 3" @click="authSubmit('3')">驳回</button>
            </div>
          </div>
        </form>
      </div>
      <div v-show="tabMenuSelected === 1" class="signing-CA">
        <form action="javascript:;">
          <div class="gy-form">
            <div class="gy-form-group single-row ">
              <div class="img-margin-left">
                法人姓名&nbsp;&nbsp;
                <el-input v-model="companyInfo.legalPerson" :disabled="tabMenu[1].status === 2"
                          style="width: 20%;"></el-input>
              </div>
            </div>
            <img-card v-if="tabMenuSelected === 1"
              class="text-top"
              label="CA认证申请书"
              :type="imgViewType[1]"
              ref="caApply"
              :imgList="imgList"
              imgType="caApply"
              @imgClick="showImg">
            </img-card>
            <img-card v-if="tabMenuSelected === 1"
              class="text-top"
              label="CA认证授权书"
              :type="imgViewType[1]"
              ref="caAuthen"
              :imgList="imgList"
              imgType="caAuthen"
              @imgClick="showImg">
            </img-card>
            <div class="gy-form-button">
              <!--<template v-if="tabMenu[1].status === 2">-->
                <!--<button class="gy-button-normal" v-if="imgViewType[1] === 'view'" @click="$set(imgViewType, 1, 'edit')">-->
                  <!--编辑资料-->
                <!--</button>-->
                <!--<button class="gy-button-normal" v-if="imgViewType[1] === 'edit'" @click="$set(imgViewType, 1, 'view')">-->
                  <!--取消-->
                <!--</button>-->
                <!--<button class="gy-button-extra" v-if="imgViewType[1] === 'edit'" @click="submitEdit(1)">保存</button>-->
              <!--</template>-->
              <template v-if="tabMenu[1].status !== 2">
                <button v-show="tabMenu[1].status!=0&&tabMenu[1].status!=3&&tabMenu[0].status==2" class="gy-button-extra"
                        @click="caSubmit('2')">审核通过
                </button>
                <button v-show="tabMenu[1].status==1&&tabMenu[0].status==2" class="gy-button-normal"
                        @click="caSubmit('3')">驳回
                </button>
              </template>
            </div>
          </div>
        </form>
      </div>
      <div v-show="tabMenuSelected === 2" class="signing-bank">
        <div>
          <div class="title">请选择银行</div>
          <div class="newbank">
            <div class="new-bank-select">
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
                <el-radio v-model="bankRadio" label="200">
                  <img src="../../../assets/images/bank.png" class="img-bank"/>
                  <span v-show="ccbState==0" class="dsh-class-wrz">未认证</span>
                  <span v-show="ccbState==1" class="dsh-class-dsh">待审核</span>
                  <span v-show="ccbState==2" class="dsh-class-ytg">已通过</span>
                  <span v-show="ccbState==3" class="dsh-class-ybh">已驳回</span>
                </el-radio>
              </div>
            </div>
          </div>
          <!--平安-->
          <div v-show="bankRadio==100">
            <div class="gy-form-button">
              <template>
                <button v-show="safeState==1&&tabMenu[0].status==2" class="gy-button-extra"
                        @click="bankSubmit2('2')">审核通过
                </button>
                <button v-show="safeState==1&&tabMenu[0].status==2" class="gy-button-normal"
                        @click="bankSubmit2('3')">驳回
                </button>
              </template>
            </div>
          </div>
          <!--中信-->
          <div v-show="bankRadio==200">
            <div class="title">请审核开户资料</div>
            <el-row class="card-center" :gutter="60">
              <el-col :span="12">
                <el-row>
                  <el-col :span="5" class="title-left">法人身份证</el-col>
                  <el-col :span="19">
                    <img-card v-if="bankRadio==200"
                      :type="imgViewType[2]"
                      ref="idCard"
                      :imgList="imgList"
                      imgClass="img-size-sfz"
                      imgType="idCard"
                      @imgClick="showImg">
                    </img-card>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="5" class="title-left">法人姓名</el-col>
                  <el-col :span="19" class="title-right">
                    <el-input :disabled="tabMenu[2].status === 2" v-model="companyInfo.legalPerson"></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div class="gy-form-button">
              <template>
                <button v-show="ccbState==1&&tabMenu[0].status==2" class="gy-button-extra"
                        @click="bankSubmit('2')">审核通过
                </button>
                <button v-show="ccbState==1&&tabMenu[0].status==2" class="gy-button-normal"
                        @click="bankSubmit('3')">驳回
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
      <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>
<script>
import ImgCard from './ImgCard';

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
    storage: 10, // 仓储资质
    param1: 11,
    param2: 12,
    param3: 13,
    param4: 14,
    param5: 15
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
    data () {
        return {
            companyId: '',
            companyStatus: companyStatus,
            companyStatusIcon: companyStatusIcon,
            companyIcon: companyIcon,
            imgList: genImgList(),
            imgViewType: ['view', 'view', 'view'],
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
            bankRadio: '100',
            ccbState: '', // 中信状态
            safeState: '', // 平安状态
            // tradePasswddata: '', // 平安状态
            companyTypeList: [],
            provinceList: [],
            cityList: [],
            districtList: [],
            companyInfo: {
                id: '',
                authStatus: 0,
                companyFileModelList: [],
                companyTypeId: '',
                name: '',
                phone: '',
                provinceId: '',
                cityId: '',
                districtId: '',
                address: '',
                legalPerson: '',
                infPayEbankId: '',
                infPayEbankIdList: [],
                socialCode: '',
                companyAdress: ''
            },
            caInfo: {
                companyFileModelList: [],
                id: null,
                caStatus: 0
            },
            bankInfo: {
                infPayEbankId: 1,
                companyFileModelList: [],
                id: null,
                bankStatus: 0
            },
            authValue: ['未提交', '待审核', '已通过', '已驳回'],
            imgBaseUrl: '',
            licenseOption: '0',
            fileModelList: [],
            dialogVisible: false,
            dialogImageUrl: '',
            imgarrdel: [],
            appendImages: process.env.API_ROOT_MAIN + this.$api.memberCompany.appendImages,
            imgshow1: false, // 危化
            imgshow2: false, // 运输
            imgshow3: false, // 仓储
            valueList: ''
        };
    },
    methods: {
        contain (img) {
            return img.indexOf('chinayie') > -1 ? img : this.appendImages + img;
        },
        showImg (url) {
            this.dialogImageUrl = url;
            this.dialogVisible = true;
        },
        authSubmit (typeid) {
            let dataObj = {
                'authStatus': typeid,
                'id': this.id,
                'message': '',
                'socialCode': this.companyInfo.socialCode
            };
            let url;
            if (typeid === '3') {
                if (this.valueList === '1') {
                    url = '/platform/v1/logistics/companies/audit/reject';
                } else if (this.valueList === '2') {
                    url = '/platform/v1/storage/companies/audit/reject';
                } else {
                    url = '/platform/v1/companies/audit/reject';
                }
            } else if (typeid === '2') {
                if (this.valueList === '1') {
                    url = '/platform/v1/logistics/companies/audit';
                } else if (this.valueList === '2') {
                    url = '/platform/v1/storage/companies/audit';
                } else {
                    url = '/platform/v1/companies/audit';
                }
            } else {
                url = this.$api.memberCompany.licences;
            }
            console.log(url);
            this.$http({
                url: url,
                method: 'put',
                data: dataObj
            }).then(({data}) => {
                if (data.code === 0) {
                    // this.$router.go(-1);
                    this.id = this.$route.query.id;
                    // valueList 1 代表物流公司保存  2代表仓储公司保存
                    this.valueList = this.$route.query.valueList;
                    if (this.id) {
                        this.getCompanyInfo();
                    }
                    this.getCompanyType();
                    this.$message.success('操作成功!');
                } else {
                    this.$message.error(data.message);
                }
            }).catch((e) => {
            });
        },
        // 审核通过2 驳回3
        // 平安审核
        bankSubmit2 (typeid) {
            let dataObj = {
                'bankAuthStatus': typeid,
                'id': this.id,
                'infPayEbankId': 1,
                infPayEbankIdList: [2]
            };
            this.$http({
                url: this.$api.memberCompany.bank,
                method: 'put',
                data: dataObj
            }).then(({data}) => {
                if (data.code === 0) {
                    this.id = this.$route.query.id;
                    // valueList 1 代表物流公司保存  2代表仓储公司保存
                    this.valueList = this.$route.query.valueList;
                    if (this.id) {
                        this.getCompanyInfo();
                    }
                    this.getCompanyType();
                    this.$message.success('操作成功!');
                } else {
                    this.$message({
                        message: data.message,
                        type: 'error'
                    });
                }
            }).catch((e) => {
            });
        },
        bankSubmit (typeid) {
            let dataObj = {
                'bankAuthStatus': typeid,
                'id': this.id,
                'message': '',
                'legalPerson': this.companyInfo.legalPerson,
                'infPayEbankId': 1,
                infPayEbankIdList: [1]
            };
            this.$http({
                url: this.$api.memberCompany.bank,
                method: 'put',
                data: dataObj
            }).then(({data}) => {
                if (data.code === 0) {
                    this.id = this.$route.query.id;
                    // valueList 1 代表物流公司保存  2代表仓储公司保存
                    this.valueList = this.$route.query.valueList;
                    if (this.id) {
                        this.getCompanyInfo();
                    }
                    this.getCompanyType();
                    this.$message.success('操作成功!');
                } else {
                    this.$message({
                        message: data.message,
                        type: 'error'
                    });
                }
            }).catch((e) => {
            });
        },
        caSubmit (typeid) {
            let dataObj = {
                'caAuthStatus': typeid,
                'id': this.id,
                'message': '',
                'legalPerson': this.companyInfo.legalPerson
            };
            this.$http({
                url: this.$api.memberCompany.ca,
                method: 'put',
                data: dataObj
            }).then(({data}) => {
                if (data.code === 0) {
                    this.id = this.$route.query.id;
                    // valueList 1 代表物流公司保存  2代表仓储公司保存
                    this.valueList = this.$route.query.valueList;
                    if (this.id) {
                        this.getCompanyInfo();
                    }
                    this.getCompanyType();
                    this.$message.success('操作成功!');
                    return;
                }
                this.$message.error(data.message);
            }).catch((e) => {
            });
        },
        tabChange (index) {
            this.tabMenuSelected = index;
        },
        getCompanyInfo () {
            this.$http.get(this.$api.memberCompany.manage + this.id).then(({data}) => {
                if (data.code === 0) {
                    this.companyInfo = Object.assign({infPayEbankId: 1}, data.data);
                    this.caInfo.caStatus = data.data.caAuthStatus;
                    this.bankInfo.bankStatus = data.data.bankAuthStatus;
                    // this.imgFilter(r.companyFileModelList);
                    this.tabMenu[0].status = data.data.authStatus;
                    this.tabMenu[1].status = data.data.caAuthStatus;
                    this.tabMenu[2].status = data.data.bankAuthStatus;
                    const codeToType = {};
                    for (const [key, value] of Object.entries(imgMap)) {
                        codeToType[value] = key;
                    }
                    const list = data.data.companyFileModelList;
                    const types = [...new Set(list.map(item => item.fileType))];
                    for (const item of types) {
                        this.imgList[codeToType[item]].list = list.filter(subItem => subItem.fileType === item);
                    }
                    for (let i = 0; i < data.data.companyFundItemApplyModelList.length; i++) {
                        if (data.data.companyFundItemApplyModelList[i].infPayEbankId === 1) {
                            this.ccbState = data.data.companyFundItemApplyModelList[i].auditStatus;
                        } else if (data.data.companyFundItemApplyModelList[i].infPayEbankId === 2) {
                            this.safeState = data.data.companyFundItemApplyModelList[i].auditStatus;
                        }
                    }
                    // 判断显示
                    if (this.companyInfo.companyTypeId === 2) {
                        this.imgshow2 = true;
                    } else if (this.companyInfo.companyTypeId === 3 || this.companyInfo.companyTypeId === 9) {
                        this.imgshow3 = true;
                    } else {
                        this.imgshow1 = true;
                    }
                    //  保存获取的全部的图片
                    this.imgarrdel = data.data.companyFileModelList;
                }
            }).catch((e) => {
            });
        },
        getCompanyType () {
            this.$http.get(this.$api.memberCompany.companyType)
                .then((res) => {
                    this.companyTypeList = res.data.data;
                });
        },
        submitEdit (index) {
            for (let i = 0; i < this.imgarrdel.length; i++) {
                if (this.imgarrdel[i].fileType === 0 || this.imgarrdel[i].fileType === 1 ||
                this.imgarrdel[i].fileType === 2 || this.imgarrdel[i].fileType === 3 ||
                this.imgarrdel[i].fileType === 4 || this.imgarrdel[i].fileType === 8 ||
                  this.imgarrdel[i].fileType === 10 || this.imgarrdel[i].fileType === 9
                ) {
                    console.log(this.imgarrdel[i].fileType);
                    this.imgarrdel.splice(i--, 1);
                }
            }
            console.log(this.imgarrdel);

            const codeList = [
                ['dangerous', 'transInfo', 'storage', 'business', 'certificate', 'authen'],
                ['caApply', 'caAuthen'],
                ['idCard']
            ];
            const refs = codeList[index].map(item => this.$refs[item]); // 拿到视图
            let refsNoundefind = [];
            refs.forEach((item) => {
                if (item !== undefined) {
                    refsNoundefind.push(item);
                }
            });
            const showList = refsNoundefind.filter(item => item.show); // 去掉不显示的
            const res = showList.map(item => item.getEditImg()); // 拿到图片列表
            const obj = res.reduce((n, m) => ({...n, ...m})); // 合并成对象
            const ary = [];
            for (const [key, value] of Object.entries(obj)) {
                for (const path of value) {
                    ary.push({
                        filePath: path,
                        fileType: imgMap[key]
                    });
                }
            }
            var ary2 = [];
            ary2 = ary.concat(this.imgarrdel);
            console.log(ary2);
            let urls;
            if (this.valueList === '1') {
                urls = '/platform/v1/companies/file/validate';
            } else if (this.valueList === '2') {
                urls = '/platform/v1/story/companies';
            } else {
                urls = '/platform/v1/companies';
            }
            this.$http.put(urls, {
                id: this.companyInfo.id,
                companyFileModelList: ary2
            }).then(result => {
                if (result.data && result.data.code === 0) {
                    this.$message.success('编辑成功');
                    this.imgViewType.forEach((item, index) => {
                        this.$set(this.imgViewType, index, 'view');
                    });
                    this.getCompanyInfo();
                    window.location.reload();
                    // ary2 = [];
                    // this.imgarrdel = [];
                    this.id = this.$route.query.id;
                    // valueList 1 代表物流公司保存  2代表仓储公司保存
                    this.valueList = this.$route.query.valueList;
                    if (this.id) {
                        this.getCompanyInfo();
                    }
                    this.getCompanyType();
                } else {
                    throw new Error('编辑失败');
                }
            }).catch(() => {
                this.$message.error('编辑失败，请稍候再试');
            });
        }
    },
    created () {
        this.id = this.$route.query.id;
        // valueList 1 代表物流公司保存  2代表仓储公司保存
        this.valueList = this.$route.query.valueList;
        if (this.id) {
            this.getCompanyInfo();
        }
        this.getCompanyType();
    },
    components: {
        ImgCard
    }
};
</script>
<style scoped lang="scss">
  .gy-form {
    margin-top: 40px;
  }
  .img-size {
    width: 100px;
    height: 100px;
  }
  .img-size-sfz {
    width: 88px;
    height: 60px;
  }
  .text-top {
    top: 0;
    margin-top: 0;
  }
  .img-margin-left {
    color: $color-title;
  }
  .account-company .add-comapny{
    .tab {
      text-align: left;
      dt {
        position: relative;
      }
      dt i {
        position: absolute;
        top: -10px;
        right: 0px;
      }
      li{
        margin-left:0;
        margin-right:20px;
      }
      li:before {
        position: absolute;
        bottom: -33px;
        right: -7px;
        font-size: 56px;
        color: #fff;
      }
    }
  }

  .gy-form-button {
     padding: 15px 0 0 0;
  }
  /deep/ .gy-form-group {
    padding-left: 90px;
    .l {
      width: 80px;
    }
  }
  /deep/ .signing-bank {
     .gy-form-group {
        padding-left: 104px;
        .l {
          width: 94px;
        }
      }
  }
  /deep/ .signing-CA {
     .gy-form-group {
        padding-left: 96px;
        .l {
          width: 100px;
        }
      }
  }
  .new-bank-select{
    overflow: hidden;
    padding-bottom: 30px;
    .box1{
      float: left;
      margin-top: 8px;
      margin-left: 12px;
      color: #333;
    }
    .box2{
      float: left;
      margin-left: 60px;
    }
    .box3{
      float: left;
      margin-left: 500px;
    }
    .img-bank{
      width: 120px;
      height: 45px;
    }
    .dsh-class{
      border: 1px solid #e59640;
      border-radius: 5px;
      color: #e59640;
      padding: 1px 3px;
      margin-left: 10px;
    }
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
      border: 1px solid #e59640;
      border-radius: 5px;
      color: #e59640;
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
      border: 1px solid #e59640;
      border-radius: 5px;
      color: #e59640;
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
  .title{
    color: #333333;
    font-weight: bold;
    margin-top: 10px;
  }
  .title-left{
    color: #333333;
  }
  .title-right{
    color: #666666;
  }
  .card-center{
    margin-top: 20px;
  }
</style>
