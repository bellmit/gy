<template>
    <div class="account-company">
        <div class="add-comapny">
            <h3>公司信息及功能</h3>

            <ul class="tab">
                <li v-for="(item, index) in tabMenu" :key="item.id" :class="[{'selected': tabMenuSelected === index}, 'iconfont', companyIcon[index]]"
                    @click="tabChange(index)">
                    <dl>
                        <dt>{{item.value}}<i :class="['iconfont', companyStatusIcon[item.status]]"></i></dt>
                        <dd>{{ companyStatus[index] && companyStatus[index][item.status] }}</dd>
                    </dl>
                </li>
            </ul>
            <div v-show="tabMenuSelected === 0">
                <div class="tips" v-if="companyInfo.authStatus === 3">
                    <i class="iconfont icon-tipserror"></i><span>公司上传认证信息有误，请重新提交！<a href="" class="highlight">联系客服</a></span>
                </div>
                <form action="javascript:;">
                    <div class="gy-form">
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>公司名称</span>
                            <input type="text" v-model="companyInfo.name" :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2">
                        </div>
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>公司电话</span>
                            <input type="text" v-model="companyInfo.phone" :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2">
                        </div>
                        <div class="gy-form-group">
                            <span class="l">公司类型</span>
                            <el-select v-model="companyInfo.companyTypeId" placeholder="请选择公司类型" :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2">
                                <el-option
                                  v-for="item in companyTypeList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="gy-form-group form-group-address">
                            <span class="l">公司地址</span>
                            <el-select v-model="companyInfo.provinceId" placeholder="请选择省"
                                       class="select-province" :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2">
                                <el-option
                                  v-for="item in provinceList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select><el-select v-model="companyInfo.cityId" placeholder="请选择市"
                                       class="select-province" :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2">
                                <el-option
                                  v-for="item in cityList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select><el-select v-model="companyInfo.districtId" placeholder="请选择区" class="select-province" :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2" style="margin-right: 0;">
                                <el-option
                                  v-for="item in districtList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                            <input type="text" v-model="companyInfo.address" :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2" class="address">
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
                                <label><input type="checkbox" name="scope" value="0">危化品</label>
                                <label><input type="checkbox" name="scope" value="1">普货</label>
                            </div>
                        </div>
                        <div class="gy-form-group single-row" v-show="companyInfo.companyTypeId === 3">
                            <span class="l"><strong>*</strong>仓储资质</span>
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
                                    <input type="radio" v-model="licenseOption" name="licenseOption" value="0">
                                    <div class="button-box">
                                        <gy-upload
                                            :url="imgApi"
                                            :disabled="licenseOption !==  '0' || companyInfo.authStatus === 1 || companyInfo.authStatus === 2"
                                            v-model="imgList.certificate.list"
                                            :limit="1"
                                            :upload-data="{filetype: imgList.certificate.type}">
                                        </gy-upload>
                                        <span class="name">三证合一</span>
                                    </div>
                                    <!--<span class="mask" v-show="Number(licenseOption) === 1 || (companyInfo.authStatus === 1 || companyInfo.authStatus === 2)"></span>-->
                                </div>
                                <div class="item">
                                    <input type="radio" v-model="licenseOption" name="licenseOption" value="1">
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
                        <div class="gy-form-group single-row">
                            <span class="l"><strong>*</strong>管理员授权书</span>
                            <gy-upload
                                :url="imgApi"
                                :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus === 2"
                                v-model="imgList.authen.list"
                                :upload-data="{filetype: imgList.authen.type}">
                            </gy-upload>
                        </div>
                        <div class="gy-form-button">
                            <button class="gy-button-extra" @click="authSubmit('put')" v-if="companyInfo.authStatus === 3">修改</button>
                            <button class="gy-button-extra" @click="authSubmit('post')" v-if="companyInfo.authStatus === 0">提交</button>
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
                            <span class="card-tips">请上传正反面身份证。</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>CA认证申请书</span>
                            <gy-upload
                                :url="imgApi"
                                :disabled="caInfo.caStatus === 1 || caInfo.caStatus === 2"
                                v-model="imgList.caApply.list"
                                :upload-data="{filetype: imgList.caApply.type}">
                            </gy-upload>
                        </div>
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>CA认证授权书</span>
                            <gy-upload
                                :url="imgApi"
                                :disabled="caInfo.caStatus === 1 || caInfo.caStatus === 2"
                                v-model="imgList.caAuthen.list"
                                :upload-data="{filetype: imgList.caAuthen.type}">
                            </gy-upload>
                        </div>
                        <div class="gy-form-button">
                            <button class="gy-button-extra" @click="caSubmit"  v-if="caInfo.caStatus === 3">修改</button>
                            <button class="gy-button-extra" @click="caSubmit"  v-if="caInfo.caStatus === 0">提交</button>
                        </div>
                    </div>
                </form>
            </div>
            <div v-show="tabMenuSelected === 2" class="pop-inner ca-wrap">
                <form action="javascript:;" name="bankcompany">
                    <div class="gy-form">
                        <div class="gy-form-group">
                            <span class="l">开通资金帐户</span>
                            <img src="../../../assets/images/bank.png" class="img-bank" alt="">
                        </div>
                        <div class="gy-form-group single-row card-group">
                            <span class="l"><strong>*</strong>法人身份证</span>
                            <gy-upload
                                :url="imgApi"
                                :disabled="bankInfo.bankStatus === 1 || bankInfo.bankStatus === 2"
                                v-model="imgList.idCard.list"
                                :upload-data="{filetype: imgList.idCard.type}">
                            </gy-upload>
                            <span class="card-tips">请上传正反面身份证。</span>
                        </div>
                        <div class="gy-form-button">
                            <button class="gy-button-extra" @click="bankSubmit"  v-if="bankInfo.bankStatus === 3">修改</button>
                            <button class="gy-button-extra" @click="bankSubmit"  v-if="bankInfo.bankStatus === 0">提交</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import gyUpload from '@/components/upload';

const companyStatus = [
    ['未认证', '待审核', '已通过', '已驳回'], // authStatus
    ['未认证', '待审核', '已通过', '已驳回'], // caAuthStatus
    ['未认证', '待审核', '已通过', '已驳回'] // bankAuthStatus
];
const companyStatusIcon = ['icon-weitijiao', 'icon-renzhengzhong', 'icon-yirenzheng', 'icon-reject'];
const companyIcon = ['icon-company', 'icon-ca', 'icon-bank'];

export default {
    components: {
        gyUpload
    },
    data () {
        return {
            companyId: '',
            companyStatus: companyStatus,
            companyStatusIcon: companyStatusIcon,
            companyIcon: companyIcon,
            imgApi: this.$api.account.upload,
            imgList: {
                dangerous: {
                    type: 4, // 危险资质
                    list: []
                },
                transInfo: {
                    type: 9, // 运输资料
                    list: []
                },
                storage: {
                    type: 10, // 仓储资质
                    list: []
                },
                certificate: {
                    type: 0, // 三证合一
                    list: []
                }, //
                business: {
                    type: 1, // 营业执照
                    list: []
                }, //
                orgCode: {
                    type: 2, // 组织机构代码
                    list: []
                }, //
                tax: {
                    type: 3, // 税务登记证
                    list: []
                },
                authen: {
                    type: 8, // 授权书
                    list: []
                },
                idCard: {
                    type: 5, // 法人身份证
                    list: []
                },
                caApply: {
                    type: 6, // ca认证申请书
                    list: []
                },
                caAuthen: {
                    type: 7, // ca认证授权书
                    list: []
                }
            },
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
                address: ''
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
            fileModelList: []
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
                        phone: r.phone,
                        provinceId: r.provinceId,
                        cityId: r.cityId,
                        districtId: r.districtId,
                        address: r.address
                    };
                    this.caInfo.caStatus = r.caAuthStatus;
                    this.bankInfo.bankStatus = r.bankAuthStatus;
                    this.imgFilter(r.companyFileModelList);
                    this.tabMenu[0].status = r.authStatus;
                    this.tabMenu[1].status = r.caAuthStatus;
                    this.tabMenu[2].status = r.bankAuthStatus;
                });
        },
        authSubmit (type) {
            let that = this;
            this.companyInfo.companyFileModelList = this.imgMerge();
            that.$http[type](that.$api.account.auth, that.companyInfo)
                .then(res => {
                    if (res.data.code === 0) {
                        that.$alert('操作成功', '提示')
                            .then(() => {
                                that.fileModelList = [];
                                that.$router.push({name: 'accountCompany'});
                            });
                        this.tabMenuSelected = 1;
                        return;
                    }
                    that.$alert(res.data.message, '出错了');
                });
        },
        caSubmit () {
            let that = this;
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
        bankSubmit () {
            let that = this;
            that.bankInfo.companyFileModelList = this.imgMerge();
            // that.bankInfo.companyFileModelList = that.fileModelList;
            that.bankInfo.id = that.companyId;
            that.$http.put(that.$api.account.companyBank, that.bankInfo)
                .then(res => {
                    if (res.data.code === 0) {
                        that.$alert('操作成功', '提示')
                            .then(() => {
                                that.fileModelList = [];
                                that.$router.push({name: 'accountCompany'});
                            });
                        return;
                    }
                    that.$alert(res.data.message, '出错了');
                });
        },
        imgMerge () {
            let img = [];
            Object.keys(this.imgList).forEach(key => {
                if (this.licenseOption === '0') {
                    if (this.imgList[key].type !== 1 || this.imgList[key].type !== 2 || this.imgList[key].type !== 3) {
                        console.log(this.imgList[key].type, this.licenseOption);
                        img = img.concat(this.imgList[key].list);
                    }
                } else {
                    if (this.imgList[key].type !== 0) {
                        console.log(this.imgList[key].type, this.licenseOption);
                        img = img.concat(this.imgList[key].list);
                    }
                }
            });
            console.log(img);
            return img;
        },
        imgFilter (data) {
            data.map(item => {
                if (item.fileType === 1 || item.fileType === 2 || item.fileType === 3) {
                    this.licenseOption = '1';
                }

                Object.keys(this.imgList).forEach(key => {
                    if (this.imgList[key].type === item.fileType) {
                        this.imgList[key].list.push(Object.assign(item, { url: this.imgBaseUrl + item.filePath }));
                    }
                });
            });
            console.log(data, this.imgList);
        }
    }
};
</script>

<style scoped lang="scss">
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
</style>
