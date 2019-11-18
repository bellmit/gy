<template>
    <div class="account-company">
        <div class="add-comapny">
            <h3>公司信息及功能</h3>
            <ul class="tab">
                <li v-for="(item) in tabMenu" :key="item.id" :class="{'selected': item.selected}">
                    <dl>
                        <dt>{{item.value}}</dt>
                        <dd>{{item.status}}</dd>
                    </dl>
                </li>
            </ul>
            <div>
                <form action="javascript:;">
                    <div class="gy-form">
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>公司名称</span>
                            <input type="text" v-model="companyInfo.name">
                        </div>
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>公司电话</span>
                            <input type="text" v-model="companyInfo.phone">
                        </div>
                        <div class="gy-form-group">
                            <span class="l">公司类型</span>
                            <el-select v-model="companyInfo.companyTypeId" placeholder="请选择公司类型">
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
                            <el-select v-model="companyInfo.provinceId" placeholder="请选择省" @change="provinceChange"
                                       class="select-province">
                                <el-option
                                  v-for="item in provinceList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select><el-select v-model="companyInfo.cityId" placeholder="请选择市" @change="cityChange"
                                       class="select-province">
                                <el-option
                                  v-for="item in cityList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select><el-select v-model="companyInfo.districtId" placeholder="请选择区" class="select-province" style="margin-right: 0;">
                                <el-option
                                  v-for="item in districtList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                            <input type="text" v-model="companyInfo.address" class="address">
                        </div>
                        <div class="gy-form-group single-row" v-show="companyInfo.companyTypeId === 1">
                            <span class="l">危化品资质</span>
                            <el-upload
                              action="api"
                              list-type="picture-card"
                              class="img-upload"
                              :data="{filetype: 4}"
                              multiple
                              :http-request="companyFileUpload">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                        <div v-show="companyInfo.companyTypeId === 2">
                            <div class="gy-form-group single-row">
                                <span class="l"><strong>*</strong>运输资料</span>
                                <el-upload
                                  action="api"
                                  list-type="picture-card"
                                  class="img-upload"
                                  :data="{filetype: 9}"
                                  multiple
                                  :http-request="companyFileUpload">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                            </div>
                            <div class="gy-form-group single-row">
                                <span class="l"><strong>*</strong>承运范围</span>
                                <label><input type="checkbox" name="scope" value="0">危化品</label>
                                <label><input type="checkbox" name="scope" value="1">普货</label>
                            </div>
                        </div>
                        <div class="gy-form-group single-row" v-show="companyInfo.companyTypeId === 3">
                            <span class="l"><strong>*</strong>仓储资质</span>
                            <el-upload
                              action="api"
                              list-type="picture-card"
                              class="img-upload"
                              :data="{filetype: 10}"
                              multiple
                              :http-request="companyFileUpload">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                        <div class="gy-form-group single-row">
                            <span class="l"><strong>*</strong>三证</span>
                            <p class="license-tips">(请根据公司情况上传三证合一或三证照片)</p>
                            <div class="license-upload-box">
                                <div class="item">
                                    <input type="radio" v-model="licenseOption" name="licenseOption" value="0"><div class="button-box">
                                        <el-upload
                                          action="api"
                                          list-type="picture-card"
                                          class="img-upload"
                                          :limit="1"
                                          :data="{filetype: 0}"
                                          :on-success="companyFileUploadSuccess"
                                          :http-request="companyFileUpload">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <span class="name">三证合一</span>
                                    </div>
                                    <span class="mask" v-show="Number(licenseOption) === 1"></span>
                                </div>
                                <div class="item">
                                    <input type="radio" v-model="licenseOption" name="licenseOption" value="1"><div class="button-box">
                                        <el-upload
                                          action="api"
                                          list-type="picture-card"
                                          class="img-upload"
                                          :limit="1"
                                          :data="{filetype: 1}"
                                          :http-request="companyFileUpload">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <span class="name">营业执照</span>
                                    </div><div class="button-box">
                                        <el-upload
                                          action="api"
                                          list-type="picture-card"
                                          class="img-upload"
                                          :limit="1"
                                          :data="{filetype: 2}"
                                          :http-request="companyFileUpload">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <span class="name">组织机构代码</span>
                                    </div><div class="button-box">
                                        <el-upload
                                          action="api"
                                          list-type="picture-card"
                                          class="img-upload"
                                          :limit="1"
                                          :data="{filetype: 3}"
                                          :http-request="companyFileUpload">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <span class="name">税务登记证</span>
                                    </div>
                                    <span class="mask" v-show="Number(licenseOption) === 0"></span>
                                </div>
                            </div>
                        </div>
                        <div class="gy-form-group single-row">
                            <span class="l"><strong>*</strong>管理员授权书</span>
                            <el-upload
                              action="api"
                              list-type="picture-card"
                              class="img-upload"
                              :limit="1"
                              :data="{filetype: 8}"
                              :disabled="companyInfo.authStatus === 1"
                              :http-request="companyFileUpload">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                        <div class="gy-form-button">
                            <button class="gy-button-extra" @click="authSubmit">提交</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            tabMenu: [
                {
                    id: 0,
                    value: '公司认证',
                    selected: true,
                    status: '未提交'
                },
                {
                    id: 1,
                    value: '电子签章CA交割',
                    selected: false,
                    status: '未提交'
                },
                {
                    id: 2,
                    value: '签约银行',
                    selected: false,
                    status: '未提交'
                }
            ],
            companyTypeList: [],
            provinceList: [],
            cityList: [],
            districtList: [],
            companyInfo: {
                companyFileModelList: [],
                companyTypeId: '',
                name: '',
                phone: '',
                provinceId: '',
                cityId: '',
                districtId: '',
                address: '',
                carriageScope: ''
            },
            authValue: ['未提交', '待审核', '已通过', '已驳回'],
            imgBaseUrl: '',
            licenseOption: 0
        };
    },
    created () {
        this.getProvince();
        this.getCompanylist();
        this.getCompanyType();
        this.imgBaseUrl = process.env.API_ROOT_MAIN + '/trade/v1/companies/images?filePath=';
    },
    methods: {
        companyFileUpload (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            that.$http.post(that.$api.account.upload, formData, headers)
                .then(function (res) {
                    that.companyInfo.companyFileModelList.push({
                        fileType: file.data.filetype,
                        filePath: res.data
                    });
                });
        },
        companyFileUploadSuccess () {
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
            that.$http.get(that.$api.account.area + '/' + that.companyInfo.provinceId)
                .then(res => {
                    that.cityList = res.data.data;
                });
        },
        cityChange () {
            let that = this;
            that.districtList = [];
            that.companyInfo.districtId = null;
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
            let that = this;
            that.$http.get(that.$api.account.companyInfo + '/' + that.companyId)
                .then(res => {
                    let r = res.data.data;
                    that.companyInfo = {
                        companyFileModelList: r.companyFileModelList,
                        companyTypeId: r.companyTypeId,
                        name: r.name,
                        phone: r.phone,
                        provinceId: r.provinceId,
                        cityId: r.cityId,
                        districtId: r.districtId,
                        address: r.address
                    };
                });
        },
        authSubmit () {
            let that = this;
            that.$http.post(that.$api.account.auth, that.companyInfo)
                .then(res => {
                    if (res.data.code === 0) {
                        that.$alert('操作成功', '提示')
                            .then(() => {
                                that.companyInfo.companyFileModelList = [];
                                that.$router.push({name: 'accountCompany'});
                            });
                        return;
                    }
                    that.$alert(res.data.message, '出错了');
                });
        }
    }
};
</script>
