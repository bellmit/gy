<!-- 申请评级 -->
<template>
    <div class="application">
        <div class="new-title-public">{{$route.query.title}}</div>
        <!-- 基础信息 -->
        <div class="gy-form module-content basic-info">
            <p class="model_title rating-company">
                <i class="el-icon-tickets"></i> 公司信息
            </p>
            <div class="gy-form-group">
                <span class="l isRequired">公司名称</span>
                <span style="padding-left: 9px;" v-if="applyType === 0 ||currentCompanyId">{{ratingFormData.name}}</span>
                <span v-else>
          <el-select
              class="company_name_select"
              v-model="ratingFormData.companyId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="searchCompany"
              :loading="loading">
            <el-option
                v-for="item in allCompany"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            ></el-option>
          </el-select>
          <div class="gy-button-normal" @click="addOtherCompany">其他公司</div>
        </span>
            </div>
            <div v-if="applyType !== 0" class="company_type divPadding gy-form-group">
                <span class="l">申报类型</span>
                <el-select
                    class="single_select"
                    @change="ratingFormData.declareChildIdList = []"
                    v-model="ratingFormData.declareParentId"
                    placeholder="请填写"
                >
                    <el-option
                        v-for="item in baseInfoCompanyType.declareParentId"
                        :key="item.id"
                        :label="item.declarationName"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <el-select
                    class="multiple_select"
                    v-model="ratingFormData.declareChildIdList"
                    collapse-tags
                    multiple
                    placeholder="请填写"
                >
                    <el-option
                        v-for="item in baseInfoCompanyType.declareChildIdList"
                        :key="item.id"
                        :label="item.declarationName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </div>
            <div class="contact_address gy-form-group">
                <span class="l">办公地址</span>
                <el-select
                    @change="getCompanyAreasList(ratingFormData.provinceId,1)"
                    v-model="ratingFormData.provinceId"
                    placeholder="省市"
                >
                    <el-option
                        v-for="item in companyAddress.provinceArr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <el-select
                    @change="getCompanyAreasList(ratingFormData.cityId,2)"
                    v-model="ratingFormData.cityId"
                    placeholder="城市"
                >
                    <el-option
                        v-for="item in companyAddress.cityArr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <el-select v-model="ratingFormData.districtId" placeholder="区">
                    <el-option
                        v-for="item in companyAddress.districtArr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l isRequired">统一社会信用代码</span>
                <input type="text" maxlength="50" placeholder="请填写" class="gy-input" v-model="ratingFormData.socialCode">
            </div>
            <div class="gy-form-group">
                <span class="l"></span>
                <textarea
                    class="gy-textarea text-address"
                    placeholder="详细地址"
                    :class="{'line-two': settedLine}"
                    @keyup.enter="setHeight()"
                    v-model="ratingFormData.address"
                ></textarea>
            </div>
            <div class="gy-form-group">
                <span class="l isRequired">固定资产(万元)</span>
                <input type="text" maxlength="10" @keyup="lengthData(ratingFormData.fixedAssets, 1)" placeholder="请输入" class="gy-input" v-model="ratingFormData.fixedAssets">
            </div>
            <div class="gy-form-group">
                <span class="l isRequired">年销售规模(万元)</span>
                <input type="text" maxlength="10" @keyup="lengthData(ratingFormData.salesVolume, 2)" placeholder="请输入" class="gy-input" v-model="ratingFormData.salesVolume">
            </div>
        </div>
        <!-- 联系人信息 -->
        <div class="gy-form module-content contact-information" style="padding-right:15px; ">
            <p class="model_title rating-contacts">
                <i class="el-icon-tickets"></i> 联系人信息
            </p>
            <div class="add_list_data gy-button-extra" @click="addContact">新增</div>
            <table class="gy-table product_list">
                <thead>
                <tr>
                    <td>联系人</td>
                    <td>联系地址</td>
                    <td>联系电话</td>
                    <td>职务</td>
                    <td>证件号码</td>
                    <td width="100">操作</td>
                </tr>
                </thead>
                <tbody>
                <tr v-if="ratingFormData.companyContactModelList && ratingFormData.companyContactModelList.length === 0"><td colspan="6" class="align-c">暂无数据</td></tr>
                <tr v-for="(item,index) in ratingFormData.companyContactModelList" :key="index">
                    <td>{{item.name}}</td>
                    <td>{{item.address}}</td>
                    <td>{{item.phone}}</td>
                    <td>{{item.position}}</td>
                    <td>{{item.identityCardNumber}}</td>
                    <td class="align-c">
                        <button @click="editContactData(index)" class="gy-button-view">编辑</button>
                        <button @click="deteleContact(index)" class="gy-button-view add-margin">删除</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!-- 银行信息 -->
        <div class="gy-form module-content bank-info">
            <p class="model_title bank-information">
                <i class="el-icon-tickets"></i> 银行信息
            </p>
            <div
                class="clearfix back_info"
                v-for="(item, index) in ratingFormData.companyBankInfoModelList"
                :key="index"
            >
                <div class="gy-form-group">
                    <span class="l">开户行</span>
                    <el-autocomplete
                        class="inline-input bank_name_select"
                        v-model="item.openBank"
                        :fetch-suggestions="querySearch"
                        :maxlength="maxNumber"
                        placeholder="请填写"
                        @select="handleSelect"
                    ></el-autocomplete>
                </div>
                <div class="gy-form-group">
                    <span class="l">账号</span>
                    <input
                        style="width:89%;"
                        type="text"
                        placeholder="请填写"
                        class="gy-input"
                        maxlength="30"
                        v-model="item.account"
                    >
                </div>
                <i
                    v-if="ratingFormData.companyBankInfoModelList.length>1"
                    @click="deleteBackInfo(index)"
                    class="el-icon-remove delete_bank"
                ></i>
                <i
                    v-if="ratingFormData.companyBankInfoModelList.length == index+1"
                    @click="addBackInfo"
                    class="el-icon-circle-plus add_contact"
                ></i>
            </div>
        </div>
        <!-- 税务信息 -->
        <div class="gy-form module-content identity-info">
            <p class="model_title identity-infos">
                <i class="el-icon-tickets"></i> 相关人身份信息
            </p>
            <div class="gy-form-group">
                <span class="l">法定代表人</span>
                <input type="text" maxlength="10" placeholder="请填写" class="gy-input" v-model="ratingFormData.legalPerson">
            </div>
            <div class="gy-form-group">
                <span class="l">证件号码</span>
                <input
                    type="text"
                    placeholder="请填写"
                    class="gy-input"
                    maxlength="30"
                    v-model="ratingFormData.legalPersonCertificateNumber"
                >
            </div>
            <div class="clearfix">
                <div class="gy-form-group my_uploader_con">
                    <span class="l">身份证件</span>
                    <el-upload
                        accept="image/*"
                        :action="uploadFileUrl"
                        list-type="picture-card"
                        :before-upload="beforeAvatarUpload"
                        :file-list="legalPersonImg"
                        :on-success="function(response, file, fileList){return handleAvatarSuccess(response, file, fileList,1)}"
                        :on-preview="function(file){return showImg(file.url)}"
                        :on-remove="function(file, fileList){return deleteAvatar(file, fileList,1)}"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
                <div class="gy-form-group my_uploader_con">
                    <span class="l">名片</span>
                    <el-upload
                        accept="image/*"
                        :action="uploadFileUrl"
                        list-type="picture-card"
                        :before-upload="beforeAvatarUpload"
                        :file-list="legalCard"
                        :on-success="function(response, file, fileList){return handleAvatarSuccess(response, file, fileList,3)}"
                        :on-preview="function(file){return showImg(file.url)}"
                        :on-remove="function(file, fileList){return deleteAvatar(file, fileList,3)}"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l">联系人</span>
                <input type="text" maxlength="10" placeholder="请填写" class="gy-input" v-model="ratingFormData.contactName">
            </div>
            <div class="gy-form-group">
                <span class="l">证件号码</span>
                <input
                    type="text"
                    placeholder="请填写"
                    class="gy-input"
                    maxlength="30"
                    v-model="ratingFormData.contactCertificateNumber"
                >
            </div>
            <div class="clearfix">
                <div class="gy-form-group my_uploader_con">
                    <span class="l">身份证件</span>
                    <el-upload
                        accept="image/*"
                        :action="uploadFileUrl"
                        :before-upload="beforeAvatarUpload"
                        list-type="picture-card"
                        :file-list="contactImg"
                        :on-success="function(response, file, fileList){return handleAvatarSuccess(response, file, fileList,2)}"
                        :on-preview="function(file){return showImg(file.url)}"
                        :on-remove="function(file, fileList){return deleteAvatar(file, fileList,2)}"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
                <div class="gy-form-group my_uploader_con">
                    <span class="l">名片</span>
                    <el-upload
                        accept="image/*"
                        :action="uploadFileUrl"
                        list-type="picture-card"
                        :before-upload="beforeAvatarUpload"
                        :file-list="contactCard"
                        :on-success="function(response, file, fileList){return handleAvatarSuccess(response, file, fileList,4)}"
                        :on-preview="function(file){return showImg(file.url)}"
                        :on-remove="function(file, fileList){return deleteAvatar(file, fileList,4)}"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
            </div>
        </div>
        <div @click="showImgUrl=''" v-if="showImgUrl" class="showAvatar">
            <img :src="showImgUrl" alt>
        </div>
        <!--产品信息-->
        <div class="gy-form module-content product-info" style="padding-right:15px; ">
            <p class="model_title product-infos">
                <i class="el-icon-tickets"></i> 产品信息
            </p>
            <p/>
            <div class="company_type gy-form-group">
                <span class="l">企业类型</span>
                <el-select
                    @change="ratingFormData.enterpriseChildId=''"
                    v-model="ratingFormData.enterpriseParentId"
                    placeholder="请填写"
                >
                    <el-option
                        v-for="item in enterPriseType.enterpriseParent"
                        :key="item.id"
                        :label="item.declarationName"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <el-select v-model="ratingFormData.enterpriseChildId" placeholder="请填写">
                    <el-option
                        v-for="item in enterPriseType.enterpriseChild"
                        :key="item.id"
                        :label="item.declarationName"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </div>
            <div class="add_list_data gy-button-extra" @click="addTableData">新增</div>
            <table v-if="ratingFormData.enterpriseParentId==10" class="gy-table product_list">
                <thead>
                <tr>
                    <td>品类</td>
                    <td>产品</td>
                    <td>年用量(吨)</td>
                    <td>生产量(吨)</td>
                    <td width="300">备注</td>
                    <td width="100">操作</td>
                </tr>
                </thead>
                <tbody>
                <tr v-if="productList && productList.length === 0"><td colspan="6" class="align-c">暂无数据</td></tr>
                <tr v-else v-for="(item,index) in productList" :key="index">
                    <td>{{item.category}}</td>
                    <td>{{item.products}}</td>
                    <td class="align-r">{{item.annualConsumption}}</td>
                    <td class="align-r">{{item.productionOutput}}</td>
                    <td>{{item.remark}}</td>
                    <td class="align-c">
                        <button @click="editTableData(index,1)" class="gy-button-view">编辑</button>
                        <button @click="deleteTableData(index,1)" class="gy-button-view add-margin">删除</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <table v-if="ratingFormData.enterpriseParentId==12" class="gy-table product_list">
                <thead>
                <tr>
                    <td>主营品类</td>
                    <td>主营产品</td>
                    <td>年交易量(吨)</td>
                    <td width="300">备注</td>
                    <td width="100">操作</td>
                </tr>
                </thead>
                <tbody>
                <tr v-if="MainProductList && MainProductList.length === 0"><td colspan="5" class="align-c">暂无数据</td></tr>
                <tr v-for="(item,index) in MainProductList" :key="index">
                    <td>{{item.mainCategory}}</td>
                    <td>{{item.mainProducts}}</td>
                    <td class="align-r">{{item.annualTradingVolume}}</td>
                    <td>{{item.remark}}</td>
                    <td class="align-c">
                        <button @click="editTableData(index,2)" class="gy-button-view">编辑</button>
                        <button @click="deleteTableData(index,2)" class="gy-button-view add-margin">删除</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--证件信息-->
        <div class="gy-form module-content document-info clearfix">
            <p class="model_title">
                <i class="el-icon-tickets"></i> 证件信息
            </p>
            <div class="img_show_div" v-for="(item,index) in companyFileImg" :key="index">
                <div class="file_list_con">
                    <span>{{item.fileName}}</span>
                    <div class="img_list_con">
                        <div class="file_img_list" v-for="(n, i) in item.filePathList" :key="i+300">
                            <div>
                                <img :src="n" alt>
                            </div>
                            <label class="el-upload-list__item-status-label my_item-status">
                                <i class="el-icon-upload-success el-icon-check my-icon-uploade"></i>
                            </label>
                            <div class="handle_btn">
                                <i @click="showImg(n)" class="el-icon-zoom-in look_btn"></i>
                                <i @click="delete_upload_img(n, item)" class="el-icon-delete close_btn"></i>
                            </div>
                        </div>
                        <div class="file_upload_con">
                            <el-upload
                                accept="image/*"
                                class="avatar-uploader add_file"
                                :before-upload="beforeAvatarUpload"
                                :action="uploadFileUrl"
                                :show-file-list="false"
                                :on-success="function(response, file, fileList){return handleFlieSuccess(response, file, fileList, item)}"
                            >
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                    </div>
                </div>
                <div class="file_info">
                    <div
                        class="gy-form-group"
                        v-for="(subItem, subIndex) in item.fileParamValueModelList"
                        :key="subIndex"
                    >
                        <span class="l">{{subItem.paramName}}</span>
                        <input placeholder="请填写" :maxlength="50" class="gy-input" v-model="subItem.paramValue">
                    </div>
                </div>
            </div>
            <div class="upload_div">
                <el-upload
                    class="avatar-uploader add_file"
                    accept="image/*"
                    list-type="picture-card"
                    :action="uploadFileUrl"
                    :show-file-list="false"
                    :before-upload="beforeFileUpload"
                    :on-progress="fileUploading"
                    :on-error="fileUploadError"
                    :on-success="handleCompanyFileSuccess"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-select class="upload_select" v-model="imgTypeId" placeholder="请选择">
                    <el-option v-for="item in imgTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </div>
        </div>
        <!--经营资质-->
        <div class="gy-form module-content operating-qualifications">
            <p class="model_title operating-qualification">
                <i class="el-icon-tickets"></i> 经营资质
            </p>
            <div class="gy-form-group" style="width:100%;padding-right:15px;">
                <span class="l">装置设施</span>
                <el-checkbox-group v-model="checkList">
                    <el-checkbox label="0">自有建设用地及厂房装置</el-checkbox>
                    <el-checkbox label="1">租用厂房装置设备</el-checkbox>
                    <el-checkbox label="2">租用办公地址</el-checkbox>
                    <el-checkbox label="3">其他（请给予描述）</el-checkbox>
                </el-checkbox-group>
                <textarea
                    v-if="checkbox_remark"
                    class="gy-textarea remark_input"
                    v-model="ratingFormData.remark"
                    placeholder="请填写"
                    maxlength="300"
                    cols="30"
                    rows="10"
                ></textarea>
            </div>
        </div>
        <div class="gy-form submit_con">
            <div class="submit_div">
                <div @click="sendFormData(0)" class="gy-button-extra">保存</div>
                <div @click="sendFormData(1)" class="gy-button-normal form_save">提交</div>
            </div>
        </div>
        <el-dialog
            width="900px"
            :visible.sync="dialogVisible"
            :title="dialogTitle + '产品信息'"
            class="gy-dialog-title"
        >
            <div
                v-if="ratingFormData.enterpriseParentId==10"
                class="add-dialog gy-form"
                style="overflow: hidden"
            >
                <div class="gy-form-group">
                    <span class="l is-required">品类</span>
                    <input type="text" placeholder="请填写" class="gy-input" v-model="productInfo.category">
                </div>
                <div class="gy-form-group">
                    <span class="l">产品</span>
                    <input type="text" placeholder="请填写" class="gy-input" v-model="productInfo.products">
                </div>
                <div class="gy-form-group">
                    <span class="l">年用量(吨)</span>
                    <input
                        type="text"
                        maxlength="7"
                        @change="toNum('productInfo',productInfo.annualConsumption,'annualConsumption')"
                        placeholder="请填写"
                        class="gy-input"
                        v-model="productInfo.annualConsumption"
                    >
                </div>
                <div class="gy-form-group">
                    <span class="l">生产量(吨)</span>
                    <input
                        type="text"
                        maxlength="7"
                        @change="toNum('productInfo',productInfo.productionOutput,'productionOutput')"
                        placeholder="请填写"
                        class="gy-input"
                        v-model="productInfo.productionOutput"
                    >
                </div>
                <div class="gy-form-group single-row clearfix">
                    <span class="l">备注</span>
                    <textarea
                        class="gy-textarea"
                        maxlength="200"
                        v-model="productInfo.remark"
                        cols="30"
                        rows="10"
                        placeholder="请填写"
                    ></textarea>
                </div>
                <div class="submit-div" style="margin-right:30px;">
                    <div @click="saveProductData" class="gy-button-extra">保存</div>
                    <div @click="cancelAdd" class="gy-button-normal">取消</div>
                </div>
            </div>
            <div v-else class="add-dialog gy-form" style="overflow: hidden">
                <div class="gy-form-group">
                    <span class="l is-required">主营品类</span>
                    <input type="text" placeholder="请填写" class="gy-input" v-model="productInfo.mainCategory">
                </div>
                <div class="gy-form-group">
                    <span class="l">主营产品</span>
                    <input
                        type="text"
                        placeholder="请填写"
                        class="gy-input"
                        v-model.number="productInfo.mainProducts"
                    >
                </div>
                <div class="gy-form-group clearfix">
                    <span class="l">年用量(吨)</span>
                    <input
                        type="text"
                        placeholder="请填写"
                        @change="toNum('productInfo',productInfo.annualTradingVolume,'annualTradingVolume')"
                        class="gy-input"
                        maxlength="7"
                        v-model="productInfo.annualTradingVolume"
                    >
                </div>
                <div class="gy-form-group single-row clearfix">
                    <span class="l">备注</span>
                    <textarea
                        class="gy-textarea"
                        maxlength="200"
                        v-model="productInfo.remark"
                        cols="30"
                        rows="10"
                        placeholder="请填写"
                    ></textarea>
                </div>
                <div class="submit-div" style="margin-right:30px;">
                    <div @click="saveProductData" class="gy-button-extra">保存</div>
                    <div @click="cancelAdd" class="gy-button-normal">取消</div>
                </div>
            </div>
        </el-dialog>
        <div v-if="dialogVisible2">
            <el-dialog
                width="900px"
                :visible.sync="dialogVisible2"
                :title="dialogTitle + '联系人信息'"
                class="gy-dialog-title"
            >
                <div class="add-dialog gy-form" style="overflow: hidden">
                    <div class="contact_info clearfix">
                        <div class="gy-form-group">
                            <span class="l">联系人</span>
                            <input type="text" placeholder="请填写" class="gy-input" v-model="contactInfo.name">
                        </div>
                        <div class="contact_address divPadding gy-form-group">
                            <span class="l">联系地址</span>
                            <el-select
                                @change="getContactAreasList(contactInfo.provinceId, 1, editIndex)"
                                v-model="contactInfo.provinceId"
                                placeholder="省市"
                            >
                                <el-option
                                    v-for="item in baseInfoContactAddress[editIndex].provinceArr"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                            <el-select
                                @change="getContactAreasList(contactInfo.cityId, 2, editIndex)"
                                v-model="contactInfo.cityId"
                                placeholder="城市"
                            >
                                <el-option
                                    v-for="item in baseInfoContactAddress[editIndex].cityArr"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                            <el-select v-model="contactInfo.districtId" placeholder="区">
                                <el-option
                                    v-for="item in baseInfoContactAddress[editIndex].districtArr"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">联系电话</span>
                            <input type="text" placeholder="请填写" class="gy-input" v-model="contactInfo.phone">
                        </div>
                        <div class="gy-form-group">
                            <span class="l"></span>
                            <input type="text" placeholder="详细地址" class="gy-input" v-model="contactInfo.address">
                        </div>
                        <div class="gy-form-group">
                            <span class="l">职务</span>
                            <input type="text" placeholder="请填写" class="gy-input" v-model="contactInfo.position">
                        </div>
                        <div class="gy-form-group">
                            <span class="l">证件号码</span>
                            <input
                                type="text"
                                placeholder="请填写"
                                class="gy-input"
                                v-model="contactInfo.identityCardNumber"
                            >
                        </div>
                        <div class="submit-div" style="margin-right:30px;">
                            <div @click="saveContactData" class="gy-button-extra">保存</div>
                            <div @click="dialogVisible2 = false" class="gy-button-normal">取消</div>
                        </div>
                        <!-- <div class="delete_bank gy-button-normal"  v-if="baseInfoContactAddress.length>1" @click="deteleContact(index)">删除联系人</div> -->
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            maxNumber: 30,
            ratingDataType: 2,
            fixedAssetsData: false,
            salesVolumeData: false,
            allCompany: [], // 搜索查询公司名称
            searchCompanyInfo: '', // 选中公司信息
            ratingFormData: {
                fixedAssets: '', // 固定资产
                salesVolume: '', // 年销售规模
                name: '', // 公司名称
                account: '', // 账号
                address: '', // 公司注册地址详细地址
                cityId: '', //  公司注册地址城市id
                contactCertificateNumber: '', // 税务信息模块 联系人身份证号码
                contactName: '', // 税务信息模块 联系人姓名
                socialCode: '', // 社会信用代码
                districtId: '', // 公司注册地址区id
                legalPerson: '', // 法人姓名（相关人身证明）
                legalPersonCertificateNumber: '', // 法人身份证号
                openBank: '', //  开户行
                otherRemark: '', // 选择其它时展示的备注信息
                provinceId: '', // 公司注册地址省id
                declareChildIdList: [], // 申报子id
                declareParentId: '', // 申报父id
                enterpriseChildId: '', // 企业子类型id
                enterpriseParentId: 10, // 企业类型id
                devices: '',
                companyId: '', // 申请公司id
                status: 0, // 0保存1提交
                companyBankInfoModelList: [
                    {
                        account: '',
                        openBank: ''
                    }
                ],
                companyContactModelList: [],
                companyFileModelList: [],
                companyProductInfoModelList: []
            },
            baseInfoCompanyType: {
                // 申报类型
                declareParentId: [],
                declareChildIdList: []
            },
            enterPriseType: {
                // 企业类型
                enterpriseParent: [],
                enterpriseChildId: []
            },
            baseInfoContactAddress: [
                // 联系人地址
                {
                    provinceArr: [],
                    districtArr: [],
                    cityArr: []
                }
            ],
            companyAddress: {
                // 公司地址
                provinceArr: [],
                districtArr: [],
                cityArr: []
            },
            settedLine: false,
            legalPersonImg: [], // 法人身份证图片
            contactImg: [], // 联系人身份证图片
            legalCard: [], // 法人名片
            contactCard: [], // 联系人名片
            companyFileImg: [],
            showImgUrl: '', // 显示上传图片
            settedLine1: false,
            productList: [],
            MainProductList: [],
            productInfo: {
                annualConsumption: '',
                annualTradingVolume: '',
                category: '',
                mainCategory: '', // "主营品类",
                mainProducts: '', // "主营产品",
                productionOutput: '', // 生产量,
                products: '',
                remark: '' // "备注信息"
            },
            imgTypeList: [],
            imgTypeId: '',
            imgTypeName: '',
            fileTypeId: '',
            checkList: [],
            checkbox_remark: false,
            loading: false,
            openBankList: [
                { value: '中国工商银行' },
                { value: '中国农业银行' },
                { value: '中国银行' },
                { value: '中国建设银行' },
                { value: '交通银行' },
                { value: '中信银行' },
                { value: '中国光大银行' },
                { value: '华夏银行' },
                { value: '中国民生银行' },
                { value: '招商银行' },
                { value: '兴业银行' },
                { value: '广发银行' },
                { value: '平安银行' },
                { value: '上海浦东发展银行' },
                { value: '恒丰银行' },
                { value: '浙商银行' },
                { value: '渤海银行' },
                { value: '中国邮政储蓄银行' }
            ],
            editIndex: 0,
            dialogVisible: false,
            dialogVisible2: false,
            dialogTitle: '新增',
            contactInfo: {},
            currentCompanyId: this.$route.query.ratingCompanyId, // 当前评级公司ID
            applyType: this.$route.query.applyType || 0, // 0 我的评级 1他方评级
            uploadFileUrl:
                    this.$http.defaults.baseURL + this.$api.ratingApplication.uploadFile
        };
    },
    methods: {
        init () {
            // this.getCompanyInfo();
            this.getCompanyAreasList(0, 0, 1);
            this.getContactAreasList(0, 0, 0, 1);
            this.getRatingType();
            this.getPriseType();
            this.getImgTypeList();
            if (this.currentCompanyId) {
                this.getFormData();
            } else if (!this.currentCompanyId && this.applyType === 0) {
                this.getCompanyInfo();
            }
            if (this.applyType === 0) {
                this.ratingFormData.name = JSON.parse(
                    localStorage.getItem('userInfo')
                ).companyName;
                this.ratingFormData.companyId = JSON.parse(
                    localStorage.getItem('userInfo')
                ).companyId;
            }
        },
        lengthData (item) {
            console.log(isNaN(item));
            if (isNaN(item)) {
                this.$message.error('只能输入数字');
            }
        },
        addContact () {
            this.dialogVisible2 = true;
            this.dialogTitle = '新增';
            this.editIndex = this.ratingFormData.companyContactModelList.length;
            this.contactInfo = {
                address: '', // 联系人详细地址
                cityId: '', // 联系人市id
                districtId: '', // 联系人区id
                name: '', // 申报联系人姓名
                phone: '', // 申报联系人电话
                position: '', // 职务（岗位）
                provinceId: '' // 联系人省id
            };
            let contactAddress = {
                provinceArr: [],
                districtArr: [],
                cityArr: []
            };
            this.baseInfoContactAddress.push(contactAddress);
            this.getContactAreasList(0, 0, this.baseInfoContactAddress.length - 1);
        },
        editContactData (index) {
            this.editIndex = index;
            this.dialogTitle = '编辑';
            this.dialogVisible2 = true;
            this.contactInfo = Object.assign({},
                this.ratingFormData.companyContactModelList.slice(index, index + 1)[0]
            );
        },
        saveContactData () {
            this.editIndex === this.ratingFormData.companyContactModelList.length
                ? this.ratingFormData.companyContactModelList.push(
                    Object.assign({}, this.contactInfo)
                )
                : this.ratingFormData.companyContactModelList.splice(
                    this.editIndex,
                    this.editIndex + 1,
                    Object.assign({}, this.contactInfo)
                );
            this.dialogVisible2 = false;
        },
        deteleContact (index) {
            this.ratingFormData.companyContactModelList.splice(index, 1);
        },
        handleAvatarSuccess (res, file, fileList, id) {
            let data;
            if (id === 1) {
                data = this.uploadFileData('法定代表人身份证', res, 1);
                this.legalPersonImg.push({ url: res, name: '法定代表人身份证', data });
            } else if (id === 2) {
                data = this.uploadFileData('联系人身份证', res, 2);
                this.contactImg.push({ url: res, data });
            } else if (id === 3) {
                data = this.uploadFileData('法定代表人名片', res, 3);
                this.legalCard.push({ url: res, data });
            } else if (id === 4) {
                data = this.uploadFileData('联系人名片', res, 4);
                this.contactCard.push({ url: res, data });
            }
        },
        beforeAvatarUpload (file) {
            const isLt2M = file.size / 1024 / 1024 < 10;
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 10MB!');
            }
            return isLt2M;
        },
        setTextAreaheight (value) {
            let reg = new RegExp(/\n/g);
            if (reg.test(value)) {
                this.settedLine = true;
            }
        },
        showImg (file) {
            this.showImgUrl = file;
        },
        handleCompanyFileSuccess (res, file) {
            // 公司证件上传成功
            this.$store.dispatch('setHideLoading');
            if (!this.imgTypeId) {
                return false;
            }
            this.fileTypeId = Number(this.fileTypeId);
            if (isNaN(this.fileTypeId) || this.fileTypeId > 13) {
                this.fileTypeId = 13;
            }
            let flag = true;
            this.companyFileImg.forEach((element, index, arr) => {
                if (element.rskDeclareCompanyFileTypeId === this.fileTypeId) {
                    arr[index].filePathList.push(res);
                    flag = false;
                    return false;
                }
            });
            if (flag) {
                this.getFileParam(this.fileTypeId, res);
            }
        },
        handleFlieSuccess (res, file, fileList, item) {
            item.filePathList.push(res);
        },
        getFileParam (typeId, url) {
            this.$http
                .get(this.$api.ratingApplication.fileParam + typeId)
                .then(res => {
                    let data = {
                        fileName: this.imgTypeName,
                        rskDeclareCompanyFileTypeId: this.fileTypeId,
                        filePathList: [url],
                        fileParamValueModelList: res.data.data
                    };
                    this.companyFileImg.push(data);
                });
        },
        delete_upload_img (filePath, item) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    item.filePathList.splice(item.filePathList.indexOf(filePath), 1);
                    if (item.filePathList.length === 0) {
                        this.companyFileImg = this.companyFileImg.filter(
                            (element, index, arr) => {
                                return (
                                    element.rskDeclareCompanyFileTypeId !==
                                        item.rskDeclareCompanyFileTypeId
                                );
                            }
                        );
                    }
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        filterImg (arr, id) {
            let data = [];
            arr.forEach(e => {
                if (e.uid !== id) {
                    data.push(e);
                }
            });
            return data;
        },
        addBackInfo () {
            let data = {
                account: '',
                openBank: ''
            };
            this.ratingFormData.companyBankInfoModelList.push(data);
        },
        deleteBackInfo (index) {
            this.ratingFormData.companyBankInfoModelList.splice(index, 1);
        },
        getCompanyAreasList (id, type, time) {
            // 获取公司地理位置
            this.$http.get(this.$api.ratingApplication.areasList + id).then(res => {
                let data = res.data.data;
                if (type === 0) {
                    this.companyAddress.provinceArr = data;
                } else if (type === 1) {
                    this.companyAddress.cityArr = data;
                    if (time !== 1) {
                        this.ratingFormData.cityId = '';
                        this.ratingFormData.districtId = '';
                    }
                } else if (type === 2) {
                    this.companyAddress.districtArr = data;
                    if (time !== 1) {
                        this.ratingFormData.districtId = '';
                    }
                }
            });
        },
        getContactAreasList (id, type, index, time) {
            // 获取联系人地理位置
            this.$http.get(this.$api.ratingApplication.areasList + id).then(res => {
                let data = res.data.data;
                if (type === 0) {
                    this.baseInfoContactAddress[index].provinceArr = data;
                } else if (type === 1) {
                    this.baseInfoContactAddress[index].cityArr = data;
                    if (time !== 1) {
                        this.contactInfo.cityId = '';
                        this.baseInfoContactAddress[index].districtArr = '';
                        this.contactInfo.districtId = '';
                    }
                } else if (type === 2) {
                    this.baseInfoContactAddress[index].districtArr = data;
                    if (time !== 1) {
                        this.contactInfo.districtId = '';
                    }
                }
            });
        },
        setContactAreasList () {
            let contactAddress = {
                provinceArr: [],
                districtArr: [],
                cityArr: []
            };
            if (this.ratingFormData.provinceId) {
                this.getCompanyAreasList(this.ratingFormData.provinceId, 1, 1);
            }
            if (this.ratingFormData.cityId) {
                this.getCompanyAreasList(this.ratingFormData.cityId, 2, 1);
            }
            this.ratingFormData.companyContactModelList &&
                this.ratingFormData.companyContactModelList.forEach((element, index) => {
                    if (index !== 0) {
                        this.getContactAreasList(0, 0, index, 1);
                        this.baseInfoContactAddress.push(contactAddress);
                    }
                    this.getContactAreasList(element.provinceId, 1, index, 1);
                    if (element.cityId) {
                        this.getContactAreasList(element.cityId, 2, index, 1);
                    }
                });
        },
        fileUploading () {
            this.$store.dispatch('setShowLoading');
        },
        fileUploadError () {
            this.$store.dispatch('setHideLoading');
        },
        getRatingType () {
            // 获取公司类型列表
            let that = this;
            this.$http.get(this.$api.ratingApplication.declareInfo).then(res => {
                if (res.data.code === 0) {
                    that.baseInfoCompanyType.declareParentId = res.data.data.data;
                } else {
                    that.$message.error(res.data.message);
                }
            });
        },
        getPriseType () {
            // 获取企业类型
            let that = this;
            this.$http
                .get(this.$api.ratingApplication.enterpriseTypeList)
                .then(res => {
                    if (res.data.code === 0) {
                        that.enterPriseType.enterpriseParent = res.data.data.data;
                    } else {
                        that.$message.error(res.data.message);
                    }
                    that.enterPriseType.enterpriseParent.forEach(element => {
                        if (element.id === that.ratingFormData.enterpriseParentId) {
                            that.enterPriseType.enterpriseChild = element.declareList;
                        }
                    });
                });
        },
        uploadFileData (fileName, filePath, rskDeclareCompanyFileTypeId) {
            let data = {
                fileName,
                filePath,
                rskDeclareCompanyFileTypeId
            };
            return data;
        },
        addTableData () {
            this.dialogVisible = true;
            this.dialogTitle = '新增';
            this.productInfo = {
                annualConsumption: '',
                annualTradingVolume: '',
                category: '',
                mainCategory: '', // "主营品类",
                mainProducts: '', // "主营产品",
                productionOutput: '', // 生产量,
                products: '',
                remark: '' // "备注信息"
            };
            this.editIndex =
                    this.ratingFormData.enterpriseParentId === 10
                        ? this.productList.length
                        : this.MainProductList.length;
        },
        saveProductData () {
            if (this.ratingFormData.enterpriseParentId === 10) {
                this.editIndex === this.productList.length
                    ? this.productList.push(Object.assign({}, this.productInfo))
                    : this.productList.splice(
                        this.editIndex,
                        this.editIndex + 1,
                        Object.assign({}, this.productInfo)
                    );
            } else {
                this.editIndex === this.MainProductList.length
                    ? this.MainProductList.push(Object.assign({}, this.productInfo))
                    : this.MainProductList.splice(
                        this.editIndex,
                        this.editIndex + 1,
                        Object.assign({}, this.productInfo)
                    );
            }
            this.cancelAdd();
        },
        cancelAdd () {
            this.dialogVisible = false;
        },
        deleteTableData (index, type) {
            type === 1
                ? this.productList.splice(index, 1)
                : this.MainProductList.splice(index, 1);
        },
        editTableData (index, type) {
            this.editIndex = index;
            this.dialogTitle = '编辑';
            this.dialogVisible = true;
            if (type === 1) {
                this.productInfo = Object.assign({},
                    this.productList.slice(index, index + 1)[0]
                );
            } else {
                this.productInfo = Object.assign({}, this.MainProductList.slice(index, index + 1)[0]
                );
            }
        },
        deleteAvatar (file, fileList, id) {
            if (id === 1) {
                this.legalPersonImg = this.filterImg(this.legalPersonImg, file.uid);
            } else if (id === 2) {
                this.contactImg = this.filterImg(this.contactImg, file.uid);
            } else if (id === 3) {
                this.legalCard = this.filterImg(this.legalCard, file.uid);
            } else if (id === 4) {
                this.contactCard = this.filterImg(this.contactCard, file.uid);
            }
        },
        getImgTypeList () {
            let that = this;
            this.$http.get(this.$api.ratingApplication.fileType).then(res => {
                if (res.data.code === 0) {
                    let data = res.data.data;
                    that.imgTypeList = data;
                } else {
                    that.$message.error(res.data.message);
                }
            });
        },
        beforeFileUpload (file) {
            this.beforeAvatarUpload(file);
            if (!this.imgTypeId) {
                this.$message.error('请选择上传文件类型');
                this.$store.dispatch('setHideLoading');
                return false;
            }
        },
        toNum (className, value, name, index) {
            // this[className].forEach((e, i, arr) => {
            //     if (index === i) {
            //         arr[i][name] = value.replace(/[^0-9]+/g, '');
            //     }
            // });
            this[className][name] = value.replace(/[^0-9]+/g, '');
        },
        searchCompany (query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.$http
                        .get(this.$api.ratingApplication.searchCompany + query)
                        .then(res => {
                            if (res.data.code === 0) {
                                this.allCompany = res.data.data;
                            } else {
                                this.$message.error(res.data.message);
                            }
                        });
                }, 200);
            } else {
                this.allCompany = [];
            }
        },
        setImgUrl (data) {
            let arrItem;
            data.forEach(element => {
                arrItem = {
                    url: element.filePath,
                    data: element
                };
                if (element.rskDeclareCompanyFileTypeId === 1) {
                    this.legalPersonImg.push(arrItem);
                } else if (element.rskDeclareCompanyFileTypeId === 2) {
                    this.contactImg.push(arrItem);
                } else if (element.rskDeclareCompanyFileTypeId === 3) {
                    this.legalCard.push(arrItem);
                } else if (element.rskDeclareCompanyFileTypeId === 4) {
                    this.contactCard.push(arrItem);
                } else {
                    this.companyFileImg.push(element);
                }
            });
        },
        getImgArr (data) {
            let arr = [];
            data.forEach(e => {
                arr.push(e.data);
            });
            return arr;
        },
        getCompanyInfo () {
            this.$http.get(this.$api.ratingApplication.getCompanyInfo).then(res => {
                if (res.data.code === 0) {
                    let data = res.data.data;
                    this.ratingFormData.provinceId = data.provinceId;
                    this.ratingFormData.cityId = data.cityId;
                    this.ratingFormData.districtId = data.districtId;
                    this.ratingFormData.socialCode = data.socialCode;
                    this.ratingFormData.address = data.address;
                    if (
                        data.companyContactModelList &&
                            data.companyContactModelList.length > 0
                    ) {
                        this.ratingFormData.companyContactModelList =
                                data.companyContactModelList;
                    }
                    this.setContactAreasList();
                    this.setTextAreaheight(this.ratingFormData.address);
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        addOtherCompany () {
            this.$prompt('请输入其他公司名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(({ value }) => {
                    if (value.trim('') === '') {
                        return false;
                    }
                    let num = -Math.ceil(Math.random() * 10);
                    this.allCompany = [
                        {
                            id: num,
                            name: value
                        }
                    ];
                    this.ratingFormData.companyId = num;
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
        },
        addOtherBank (item) {
            this.$prompt('请输入其他银行名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(({ value }) => {
                    if (value.trim('') === '') {
                        return false;
                    }
                    this.openBankList.push({ name: value });
                    item.openBank = value;
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
        },
        setHeight1 () {
            this.$refs.textareaAddRow.height = '60px';
        },
        checkCompany () {
            if (this.currentCompanyId) {
                return;
            }
            let data;
            if (this.ratingFormData.companyId < 0) {
                this.allCompany.forEach(element => {
                    if (element.id === this.ratingFormData.companyId) {
                        data = {
                            companyName: element.name
                        };
                    }
                });
            } else {
                data = {
                    companyId: this.ratingFormData.companyId
                };
            }
            this.$http
                .post(
                    this.$api.ratingApplication.rangResult,
                    data
                )
                .then(res => {
                    if (res.data.code === 0) {
                        if (res.data.data === true) {
                            this.$message({
                                type: 'info',
                                message: '当前公司正在评级处理流程中，不可重复申请'
                            });
                            this.ratingFormData.companyId = '';
                            this.allCompany = [];
                        }
                    }
                });
        },
        getFormData () {
            this.$http
                .get(
                    this.$api.ratingApplication.getClientRatingFormData +
                        this.currentCompanyId
                )
                .then(res => {
                    if (res.data.code === 0) {
                        this.ratingFormData = res.data.data;
                        this.allCompany.push({
                            id: this.ratingFormData.companyId,
                            name: this.ratingFormData.name
                        });
                        if (this.ratingFormData.enterpriseParentId === 12) {
                            this.MainProductList = this.ratingFormData.companyProductInfoModelList;
                        }
                        if (this.ratingFormData.enterpriseParentId === 10) {
                            this.productList = this.ratingFormData.companyProductInfoModelList;
                        }
                        (this.ratingFormData.devices) && (this.checkList = this.ratingFormData.devices.split(','));
                        this.setContactAreasList();
                        this.setImgUrl(this.ratingFormData.companyFileModelList);
                        this.ratingFormData.companyFileModelList = [];
                        this.setTextAreaheight(this.ratingFormData.address);
                        if (!this.ratingFormData.companyContactModelList) {
                            this.ratingFormData.companyContactModelList = [];
                        }
                    }
                });
        },
        setHeight () {
            if (!this.settedLine) this.settedLine = true;
        },
        sendFormData (statusId) {
            this.allCompany.forEach(element => {
                if (element.id === this.ratingFormData.companyId) {
                    this.ratingFormData.name = element.name;
                }
            });
            if (!this.ratingFormData.name) {
                this.$message.error('公司名称不能为空');
                return false;
            }
            if (!this.ratingFormData.fixedAssets) {
                this.$message.error('固定资产不能为空');
                return false;
            }
            if (!this.ratingFormData.salesVolume) {
                this.$message.error('年销售规模不能为空');
                return false;
            }
            if (isNaN(this.ratingFormData.fixedAssets)) {
                this.$message.error('固定资产不能输入数字');
                return false;
            }
            if (isNaN(this.ratingFormData.salesVolume)) {
                this.$message.error('年销售规模不能输入数字');
                return false;
            }
            this.ratingFormData.status = statusId;
            this.ratingFormData.companyProductInfoModelList =
                    this.ratingFormData.enterpriseParentId === 10
                        ? this.productList
                        : this.MainProductList;
            this.ratingFormData.companyFileModelList = [
                ...this.getImgArr(this.legalPersonImg),
                ...this.getImgArr(this.contactImg),
                ...this.getImgArr(this.legalCard),
                ...this.getImgArr(this.contactCard),
                ...this.companyFileImg
            ];
            (this.checkList.length > 0) && (this.ratingFormData.devices = this.checkList.join(','));
            this.ratingFormData.applyType = this.applyType;
            if (this.currentCompanyId && this.applyType === 0) {
                if (!this.$route.query.change) {
                    this.ratingFormData.id = null;
                }
                if (statusId === 0) {
                    this.$http
                        .put(
                            this.$api.ratingApplication.updateRatingFormData,
                            this.ratingFormData
                        )
                        .then(res => {
                            if (res.data.code === 0) {
                                this.$router.go(-1);
                                this.$message.success('更新成功');
                            } else {
                                this.$message.error(res.data.message);
                            }
                        });
                } else {
                    this.$confirm('点击提交后，信息无法修改。确定提交吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                        .then(() => {
                            this.$http
                                .put(
                                    this.$api.ratingApplication.updateRatingFormData,
                                    this.ratingFormData
                                )
                                .then(res => {
                                    if (res.data.code === 0) {
                                        this.$router.go(-1);
                                        this.$router.push({ name: 'RatingManagement' });
                                        this.$message.success('更新成功');
                                    } else {
                                        this.$message.error(res.data.message);
                                    }
                                });
                        })
                        .catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                }
            } else if (statusId === 0) {
                this.$http
                    .post(
                        this.$api.ratingApplication.sendratingFormData,
                        this.ratingFormData
                    )
                    .then(res => {
                        if (res.data.code === 0) {
                            this.$router.go(-1);
                            this.$message.success('保存成功');
                        } else {
                            this.$message.error(res.data.message);
                        }
                    });
            } else {
                this.$confirm('点击提交后，信息无法修改。确定提交吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.$http
                            .post(
                                this.$api.ratingApplication.sendratingFormData,
                                this.ratingFormData
                            )
                            .then(res => {
                                if (res.data.code === 0) {
                                    this.$router.go(-1);
                                    this.$message.success('提交成功!');
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            });
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
            }
        },
        querySearch (queryString, cb) {
            var openBankList = this.openBankList;
            var results = queryString
                ? openBankList.filter(this.createFilter(queryString))
                : openBankList;
                // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter (queryString) {
            return openBankList => {
                return (
                    openBankList.value
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()) === 0
                );
            };
        },
        handleSelect () {
            console.log(this.ratingFormData.companyBankInfoModelList);
        }
    },
    mounted () {
        this.init();
        console.log(this.$http.defaults.baseURL + this.$api.ratingApplication.uploadFile);
    },
    watch: {
        'ratingFormData.declareParentId' (newValue, oldValue) {
            this.baseInfoCompanyType.declareParentId.forEach(element => {
                if (element.id === newValue) {
                    this.baseInfoCompanyType.declareChildIdList = element.declareList;
                }
            });
        },
        'ratingFormData.enterpriseParentId' (newValue, oldValue) {
            this.enterPriseType.enterpriseParent.forEach(element => {
                if (element.id === newValue) {
                    this.enterPriseType.enterpriseChild = element.declareList;
                }
            });
        },
        imgTypeId (newValue, oldValue) {
            this.fileTypeId = newValue;
            this.imgTypeList.forEach(element => {
                if (element.id === newValue) {
                    this.imgTypeName = element.name;
                }
                if (newValue === 13) {
                    this.$prompt('请输入图片类型', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputPattern: /^[A-Za-z0-9\u4e00-\u9fa5]{0,20}$/,
                        inputErrorMessage: '长度不得大于20个字且不允许为特殊字符'
                    })
                        .then(({ value }) => {
                            this.imgTypeId = this.imgTypeName = value;
                            if (!isNaN(value)) {
                                this.fileTypeId = 13;
                            }
                        })
                        .catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消输入'
                            });
                        });
                }
            });
        },
        checkList (newValue, oldValue) {
            if (newValue.indexOf('3') >= 0) {
                this.checkbox_remark = true;
            } else {
                this.checkbox_remark = false;
            }
        },
        'ratingFormData.companyId'  (newValue, oldValue) {
            if (newValue !== '') {
                this.checkCompany();
            }
        }
    }
};
</script>
<style lang="scss" scoped>
    .text-address {
        border: none;
        border-bottom: 1px solid $color-border;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        font-size: 14px;
        &.line-two {
            height: 60px;
        }
    }
    .application {
        .gy-form-group{
            min-height: 20px;
            line-height: 20px;
            .l{
                padding-left: 18px;
            }
            .isRequired{
                padding-left: 24px;
            }
            .gy-input{
                height: 20px!important;
                line-height: 20px;
            }
        }
        textarea {
            font-family: "Microsoft YaHei";
        }
        .first_div {
            padding-top: 0;
        }
        .el-icon-close-tip {
            display: none !important;
        }
        .isRequired::before {
            content: "*";
            color: #f56c6c;
            position: absolute;
            left: 16px;
            font-size: 12px;
        }
        .file_info {
            width: 800px;
            margin-top: 15px;
            margin-bottom: 15px;
            span {
                text-align: left;
                padding-left: 0;
            }
        }
        .single_select {
            width: 35% !important;
        }
        .multiple_select {
            width: 62% !important;
        }
        .company_name_select {
            width: 60% !important;
        }
        .bank_name_select {
            width: 100% !important;
        }
        .model_title {
            font-size: 14px;
            font-weight: bold;
            color: #333;
            padding-bottom: 15px;
        }
        .rating-company{
            padding:2px 0 5px 0;
        }
        .rating-contacts{
            padding-bottom: 19px;
        }
        .bank-information{
            padding-bottom: 8px;
        }
        .identity-infos{
            padding-bottom: 8px;
        }
        .product-infos{
            padding-bottom: 19px;
        }
        .operating-qualification{
            padding-bottom: 7px;
        }
        .my_uploader_con {
            position: relative;
            span {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .gy-text {
            width: 100%;
            background-color: #fff;
            border: none;
            border-bottom: 1px solid #e7ecf1;
            // padding: 0 5px;
            color: #999;
            max-height: 50px;
            line-height: 20px;
            vertical-align: middle;
        }
        input {
            font-size: 14px;
        }
    }
    .addressDiv .el-select {
        width: 32%;
    }
    .divPadding {
        padding-bottom: 14px;
    }
    .company_type .el-select {
        width: 46%;
    }
    .contact_address .el-select {
        width: 32%;
    }
    .back_info {
        position: relative;
        .add_contact {
            position: absolute;
            right: 15px;
            top: 8px;
            display: inline-block;
            font-size: 23px;
            color: #ccc;
            cursor: pointer;
        }
        .delete_bank {
            position: absolute;
            right: 45px;
            top: 8px;
            display: inline-block;
            font-size: 23px;
            color: #ccc;
            cursor: pointer;
        }
    }
    .add_list_data {
        float: right;
        margin-bottom: 8px;
    }
    .clearfix {
        content: "";
        display: block;
        clear: both;
    }
    .uploadImg,
    .el-icon-picture {
        color: #7dafeb;
        cursor: pointer;
    }
    .showAvatar {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 999999;
    }
    .showAvatar img {
        position: absolute;
        max-width: 800px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .product_list input {
        border: none;
        display: inline-block;
        width: 100%;
        height: 100%;
        color: #999;
        &::-webkit-input-placeholder {
            color: #999;
        }
    }
    .upload_div {
        width: 60px;
        vertical-align: middle;
        margin-top: 10px;
        margin-left: 23px;
        .add_file {
            display: inline-block;
            width: 60px;
            height: 60px;
            padding-left: 0;
            text-align: center;
            //  border:1px solid #E7ECF1;
            position: relative;
        }
    }

    .upload_select {
        width: 130px;
    }
    .remark_input {
        width: 100%;
        height: 100px;
        border: 1px solid #e7ecf1;
        display: inline-block;
        margin-left: -77px;
        margin-top: 9px;
    }
    .submit_con {
        padding-right: 15px;
        padding-top: 10px;
        margin-bottom: 12px;
        .submit_div {
            float: right;
            .form_save {
                // background-color: #f2ac4c;
                // color: #fff;
                margin-left: 15px;
            }
        }
    }
    .submit-div {
        float: right;
        margin-top: 30px;
        div:nth-child(1) {
            margin-right: 10px;
        }
    }
    .img_show_div {
        position: relative;
        top: 0;
        left: 0;
        display: inline-block;
        overflow: hidden;
        .file_list_con {
            position: relative;
            left: 23px;
            span {
                position: absolute;
                max-width: 90px;
                top: 50%;
                transform: translateY(-50%);
                word-wrap: break-word;
                -webkit-line-clamp: 3; //设置行数，2行显示
                display: -webkit-box; //盒子模型
                -webkit-box-orient: vertical; //元素的排列方式，垂直居中
                overflow: hidden; //隐藏溢出内容
                text-overflow: ellipsis;
            }
            .img_list_con {
                margin-left: 96px;
                display: inline-block;
                max-width: 760px;
                .file_img_list {
                    display: inline-block;
                    width: 60px;
                    text-align: center;
                    position: relative;
                    margin-right: 15px;
                    margin-top: 8px;
                    vertical-align: middle;
                    overflow: hidden;
                    border-radius: 5px;
                    span {
                        display: inline-block;
                        line-height: 20px;
                        text-align: center;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    div {
                        width: 60px;
                        height: 60px;
                        position: relative;
                        border: 1px solid #e7ecf1;
                        img {
                            width: 58px;
                            max-height: 58px;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            cursor: pointer;
                        }
                    }
                    .handle_btn {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 9999;
                        background-color: rgba(0, 0, 0, 0.5);
                        display: none;
                        .close_btn {
                            font-size: 20px;
                            position: absolute;
                            top: 50%;
                            right: 5px;
                            transform: translateY(-50%);
                            color: #fff;
                            cursor: pointer;
                            z-index: 9;
                        }
                        .look_btn {
                            font-size: 20px;
                            position: absolute;
                            top: 50%;
                            left: 5px;
                            transform: translateY(-50%);
                            color: #fff;
                            cursor: pointer;
                            z-index: 9;
                        }
                    }
                    &:hover .handle_btn {
                        display: block;
                    }
                    &:hover .my_item-status  {
                        display: none;
                    }
                }
            }
            .file_upload_con {
                display: inline-block;
                vertical-align: middle;
                margin-top: 6px;
                .add_file {
                    display: inline-block;
                    width: 60px;
                    height: 60px;
                    padding-left: 0;
                    text-align: center;
                    border: 1px solid #e7ecf1;
                    i {
                        height: 60px;
                        line-height: 60px;
                        font-size: 26px;
                        color: #ccc;
                    }
                }
            }
            .my_item-status {
                position: absolute;
                display: block;
                right: -15px;
                top: -6px;
                width: 40px;
                height: 24px;
                background: #13ce66;
                text-align: center;
                transform: rotate(45deg);
                -webkit-box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);
                box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);
                .my-icon-uploade {
                    transform: rotate(-45deg);
                    color: #fff;
                    position: absolute;
                    top:10px;
                    left: 12px;
                }
            }
        }
    }
    .avatar-upload-div {
        position: relative;
        width: 50px;
        height: 50px;
        border: 1px solid #e7ecf1;
        cursor: pointer;
        img {
            width: 100%;
            height: 100%;
        }
        .close_btn {
            font-size: 20px;
            position: absolute;
            top: -10px;
            right: -10px;
            color: #e0370f;
            cursor: pointer;
            z-index: 999999999;
        }
    }
    .add-margin {
        margin-left: 4px;
    }
    .module-content {
        padding: 16px 16px;
    }
    .contact-information{
        padding: 0 16px 16px 16px;
    }
    .basic-info {
        .gy-form-group{
            padding-left: 152px;
            .l{
                width: 142px;
            }
        }
    }

    .bank-info{
        padding: 11px 16px;
        .gy-form-group{
            padding-left: 114px;
            .l{
                width: 76px;
            }
        }
    }

    .identity-info{
        padding: 4px 16px 16px 16px;
        .gy-form-group{
            padding-left: 114px;
            .l{
                width: 104px;
            }
        }
    }

    .product-info{
        padding: 0 16px 16px 16px;
        .gy-form-group{
            padding-left: 107px;
            .l{
                width: 86px;
            }
        }
    }

    .document-info{
        padding: 11px 16px 16px 16px;
        .gy-form-group{
            padding-left: 106px;
            .l{
                width: 100px;
            }
        }
    }
    .operating-qualifications{
        padding: 11px 16px 16px 16px;
        .gy-form-group{
            padding-left: 100px;
            .l{
                width: 90px;
            }
        }
    }
</style>
<style lang="scss">
    .application{
        .gy-dialog-title .el-dialog__header {
            border-bottom: 1px solid #dce0e4 !important;
            position: relative;
        }
        .el-dialog__title{
            position: absolute;
            padding: 0;
            top: 5px;
        }
    }
    .application .container-fluid .el-input__inner {
        font-size: 14px;
        height: 20px;
    }
    .application{
        .el-input__inner{
            height: 20px;
        }
        .el-select{
            height: 20px;
        }
    }
    .application .el-dialog__body {
        padding: 0;
    }
</style>
