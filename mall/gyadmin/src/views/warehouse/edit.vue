<template>
    <div class="manage-box">
        <div class="detail-info" id="detail-info">
            <el-form ref="form" :model="form" label-width="90px" :rules="rules">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="公司名称" prop="name" class="mr-60">
                            <el-input disabled v-model="form.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="公司电话">
                            <el-input v-model="form.phone" placeholder="请输入公司电话"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="别名" class="mr-60">
                            <el-input v-model="form.alias" placeholder="请输入别名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="英文名">
                            <el-input v-model="form.enName" placeholder="请输入英文名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="企业类型" class="mr-60">
                            <el-select disabled v-model="form.companyTypeId" placeholder="请选择公司类型">
                                <el-option
                                  v-for="item in form.companyTypeList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="选择省">
                            <el-select v-model="form.provinceId" placeholder="请选择省" @change="handleProvince">
                                <el-option
                                  v-for="item in form.provinceList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="area">
                    <el-col :span="12">
                        <el-form-item label="选择市" class="mr-60">
                            <el-select v-model="form.cityId" placeholder="请选择市" @change="handleCity">
                                <el-option
                                  v-for="item in form.cityList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="选择区">
                            <el-select v-model="form.districtId" placeholder="请选择区">
                                <el-option
                                  v-for="item in form.districtList"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="详细地址" class="mr-60">
                            <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="3">
                                <span style="color: #333333">企业LOGO</span>
                            </el-col>
                            <el-col :span="20">
                                <div class="upload-box">
                                    <el-upload
                                      action="api"
                                      :limit="1"
                                      list-type="picture-card"
                                      :file-list="fileLists"
                                      :http-request="uploadImg"
                                      :on-remove="handleRemove">
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-form-item class="gy-button-group">
                    <button type="button" @click="submitForm('form')" class="gy-button-extra">保存</button>
                    <button type="button" @click="cancel" class="gy-button-normal">取消</button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            fileLists: [],
            fileLists2: [],
            form: {
                companyLogo: '',
                id: null,
                name: '',
                phone: '',
                alias: '',
                enName: '',
                payEbankId: '',
                threeEvidence: '',
                businessLicense: '',
                organizationCode: '',
                taxRegistration: '',
                dangerousGoodsBusinessQualification: '',
                legalPersonIdentityCard: '',
                address: '',
                authDate: '',
                message: '',
                createdBy: '',
                updatedBy: '',
                licenceType: 0,
                licenceTypeList: [
                    {
                        value: 0,
                        label: '三证合一'
                    }, {
                        value: 1,
                        label: '非三证合一'
                    }
                ],
                companyTypeId: null,
                companyTypeList: [],
                valid: '0',
                validList: [
                    {
                        value: 0,
                        label: '无效'
                    }, {
                        value: 1,
                        label: '有效'
                    }
                ],
                provinceId: null, // 省
                city: null, // 市
                provinceList: [], // 省
                cityList: [], // 市
                districtList: [], // 区
                districtId: null // 区域ID
            },
            id: '',
            rules: {
                name: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        uploadImg (file) {
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            this.$http.post(this.$api.upload.img, formData, headers)
                .then((res) => {
                    this.form.companyLogo = res.data;
                });
        },
        handleRemove (file, fileList) {
            this.form.companyLogo = '';
        },
        getCompanyType () {
            this.$http.get(this.$api.memberCompany.companyType)
                .then(res => {
                    this.form.companyTypeList = res.data.data;
                });
        },
        submitForm (form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.toSubmit();
                } else {
                    return false;
                }
            });
        },
        toSubmit () {
            // 有id 编辑，无id添加  保存
            let method = this.id ? 'put' : 'post';
            let url = this.id ? this.$api.warehouse.manage : this.$api.warehouse.saveCompanies;
            let dataObj = this.form;
            if (this.id) {
                dataObj.id = this.id;
            }
            this.$http({
                url: url,
                method: method,
                data: dataObj
            }).then(({data}) => {
                if (data.code === 0) {
                    this.$router.go(-1);
                    this.$message.success('保存成功!');
                }
            }).catch((e) => {
            });
        },
        cancel () {
            this.$router.go(-1);
        },
        address (id, type) { // 获取地址
            this.$http.get(this.$api.area.list + id).then((data) => {
                if (type === 'province') {
                    this.form.provinceList = data.data.data;
                } else if (type === 'city') {
                    this.form.cityList = data.data.data;
                } else if (type === 'district') {
                    this.form.districtList = data.data.data;
                } else {
                    console.log('地址接口有误');
                }
            });
        },
        handleProvince (itemId) { // 省改变
            this.address(itemId, 'city');
            this.form.cityId = null;
            this.form.districtId = null;
        },
        handleCity (itemId) { // 市改变
            this.address(itemId, 'district');
            this.form.districtId = null;
        },
        getData (id) {
            // ID有值说明为修改
            if (id) {
                this.id = id;
            }
            this.$http.get(this.$api.warehouse.infov2 + id)
                .then(({data}) => {
                    if (data.code === 0) {
                        this.handleProvince(data.data.provinceId);
                        this.handleCity(data.data.cityId);
                        Object.keys(this.form).forEach((e) => {
                            this.form[e] = data.data[e];
                        });
                        if (data.data.companyLogo) {
                            this.fileLists.push({'url': data.data.companyLogo});
                        } else {
                            this.fileLists = [];
                        }
                    }
                })
                .catch((e) => {
                });
        },
        init () {
            this.getData(this.$route.query.id);
            this.address(0, 'province'); // 获取省市区
            this.getCompanyType(); // 公司类型
        }
    },
    created () {
        this.init();
    }
};
</script>
<style lang="scss" scoped>
    .detail-info{
        padding: 15px 0 0 ;
    }
    /deep/ .el-form-item__label {
        width: 79px !important;
    }
    /deep/  .el-form-item__content {
        margin-left: 79px!important;
    }
</style>
