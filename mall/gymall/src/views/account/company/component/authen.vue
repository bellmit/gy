<!--
    公司认证
-->

<template>
    <div>
        <div class="tips" v-if="companyInfo.authStatus === 3">
            <i class="iconfont icon-tipserror"></i><span>公司上传认证信息有误，请重新提交！<a href="" class="highlight">联系客服</a></span>
        </div>
        <form action="javascript:;">
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>公司名称</span>
                <input type="text" v-model="companyInfo.name" :disabled="companyInfo.authStatus !== 3">
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>公司电话</span>
                <input type="text" v-model="companyInfo.phone" :disabled="companyInfo.authStatus !== 3">
            </div>
            <div class="gy-form-group">
                <span class="l">公司类型</span>
                <el-select v-model="companyInfo.companyTypeId" placeholder="请选择公司类型" :disabled="companyInfo.authStatus !== 3">
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
                           class="select-province" :disabled="companyInfo.authStatus !== 3">
                    <el-option
                        v-for="item in provinceList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select><el-select v-model="companyInfo.cityId" placeholder="请选择市" @change="cityChange"
                                       class="select-province" :disabled="companyInfo.authStatus !== 3">
                <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select><el-select v-model="companyInfo.districtId" placeholder="请选择区" class="select-province" :disabled="companyInfo.authStatus !== 3" style="margin-right: 0;">
                <el-option
                    v-for="item in districtList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
                <input type="text" v-model="companyInfo.address" :disabled="companyInfo.authStatus !== 3" class="address">
            </div>
            <div class="gy-form-group single-row" v-show="companyInfo.companyTypeId === 1">
                <span class="l">危化品资质</span>
                <el-upload
                    action="api"
                    list-type="picture-card"
                    class="img-upload"
                    :disabled="companyInfo.authStatus !== 3"
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
                        :disabled="companyInfo.authStatus !== 3"
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
                    :disabled="companyInfo.authStatus !== 3"
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
                            :http-request="companyFileUpload">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <span class="name">三证合一</span>
                    </div>
                        <span class="mask" v-show="Number(licenseOption) === 1 || companyInfo.authStatus !== 3"></span>
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
                        <span class="mask" v-show="Number(licenseOption) === 0 || companyInfo.authStatus !== 3"></span>
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
                    :disabled="companyInfo.authStatus === 1 || companyInfo.authStatus !== 3"
                    :data="{filetype: 8}"
                    :http-request="companyFileUpload">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
            <div class="gy-form-button">
                <button class="gy-button-extra" v-if="companyInfo.authStatus === 3">修改</button>
            </div>
        </div>
    </form>
    </div>
</template>

<script>
export default {
    name: 'accountAuthen',
    data () {
        return {
            companyInfo: {
                companyFileModelList: [],
                companyTypeId: '',
                name: '',
                phone: '',
                provinceId: '',
                cityId: '',
                districtId: '',
                address: ''
            },
            companyTypeList: [],
            provinceList: [],
            cityList: [],
            districtList: [],
            licenseOption: 0
        };
    },
    methods: {
        companyFileUpload () {

        }
    }
};
</script>

<style>

</style>
