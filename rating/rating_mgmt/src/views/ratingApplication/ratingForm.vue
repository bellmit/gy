<!-- 申请评级 -->
<template>
  <div class="application">
        <!-- 基础信息 -->
       <div class="gy-form first_div">
            <h3><i class="el-icon-tickets"></i>公司信息</h3>
            <div class="clearfix">
                <div class="gy-form-group">
                    <span class="l">公司名称</span>
                    <input type="text"  class="gy-input"  :disabled="true" v-model="ratingFormData.name">
                </div>
            </div>
            <div class="clearfix">
              <div class="contact_address gy-form-group">
                    <span class="l">办公地址</span>
                    <el-select   @change="getCompanyAreasList(ratingFormData.provinceId,1)" v-model="ratingFormData.provinceId"  placeholder="省市">
                        <el-option
                        v-for="item in companyAddress.provinceArr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select  @change="getCompanyAreasList(ratingFormData.cityId,2)"   v-model="ratingFormData.cityId"  placeholder="城市">
                        <el-option
                        v-for="item in companyAddress.cityArr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                        <el-select    v-model="ratingFormData.districtId"  placeholder="区">
                        <el-option
                        v-for="item in companyAddress.districtArr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
            </div>
             <div class="gy-form-group">
                <span class="l">统一社会信用代码</span>
                <input  type="text" placeholder="请填写" class="gy-input" v-model="ratingFormData.socialCode">
            </div>
         </div>
             <div class="gy-form-group">
                <span class="l"></span>
                 <textarea class="gy-textarea text-address" placeholder="详细地址" :class="{'line-two': settedLine}" @keyup.enter="setHeight"  v-model="ratingFormData.address" ></textarea>
            </div>
       </div>
        <!-- 联系人信息 -->
    <div class="gy-form">
           <h3><i class="el-icon-tickets"></i> 联系人信息</h3>
             <div class="contact_info clearfix" v-for="(item, index) in ratingFormData.companyContactModelList" :key="index">
                 <div class="gy-form-group">
                        <span class="l">联系人{{index+1}}</span>
                        <input  type="text" placeholder="请填写" class="gy-input" v-model="item.name">
                </div>
                <div class="contact_address divPadding gy-form-group">
                    <span class="l">联系地址</span>
                    <el-select  @change="getContactAreasList(item.provinceId, 1, index)" v-model="item.provinceId"  placeholder="省市">
                        <el-option
                        v-for="item in baseInfoContactAddress[index].provinceArr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select  @change="getContactAreasList(item.cityId, 2, index)"    v-model="item.cityId"  placeholder="城市">
                        <el-option
                        v-for="item in baseInfoContactAddress[index].cityArr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                        <el-select    v-model="item.districtId"  placeholder="区">
                        <el-option
                        v-for="item in baseInfoContactAddress[index].districtArr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="gy-form-group">
                    <span class="l">联系电话</span>
                    <input  type="text" placeholder="请填写" class="gy-input" v-model="item.phone">
                </div>
                <div class="gy-form-group">
                    <span class="l"></span>
                     <input  type="text" placeholder="请填写" class="gy-input" v-model="item.address">
                </div>
                <div class="gy-form-group ">
                    <span class="l">职务</span>
                    <input  type="text" placeholder="请填写" class="gy-input" v-model="item.position">
                </div>
                 <div class="gy-form-group ">
                    <span class="l">证件号码</span>
                    <input  type="text" placeholder="请填写" class="gy-input" v-model="item.identityCardNumber">
                </div>
                 <div class="delete_bank gy-button-normal"  v-if="baseInfoContactAddress.length>1" @click="deteleContact(index)">删除联系人</div>
           </div>
          <div class="add_contact gy-button-normal" @click="addContact">添加联系人</div>
    </div>
     <!-- 银行信息 -->
    <div class="gy-form">
           <h3><i class="el-icon-tickets"></i> 银行信息</h3>
           <div class="clearfix" v-for="(item, index) in ratingFormData.companyBankInfoModelList" :key="index">
                <div class="gy-form-group">
                    <span class="l">开户行</span>
                    <!-- <input  type="text" placeholder="请填写" class="gy-input" v-model="item.openBank"> -->
                     <el-select class="upload_select company_name_select" v-model="item.openBank "  placeholder="请选择">
                        <el-option
                            v-for="item in openBankList"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>
                    <div class="gy-button-normal" @click="addOtherBank(item)">其他银行</div>
                </div>
                <div class="gy-form-group">
                    <span class="l">账号</span>
                    <input  type="text" placeholder="请填写" class="gy-input" v-model="item.account">
                </div>
                <div class="delete_bank gy-button-normal" v-if="ratingFormData.companyBankInfoModelList.length>1" @click="deleteBackInfo(index)">删除开户行</div>
           </div>
        <div class="add_contact gy-button-normal" @click="addBackInfo">添加开户行</div>
    </div>
     <!-- 税务信息 -->
      <div class="gy-form">
           <h3><i class="el-icon-tickets"></i> 相关人身份信息</h3>
           <div class="gy-form-group">
                <span class="l">法定代表人</span>
                <input  type="text" placeholder="请填写" class="gy-input" v-model="ratingFormData.legalPerson">
            </div>
            <div class="gy-form-group">
                <span class="l">证件号码</span>
                <input  type="text" placeholder="请填写" class="gy-input" v-model="ratingFormData.legalPersonCertificateNumber">
            </div>
          <div class="clearfix">
             <div class="gy-form-group">
                <span class="l">身份证件</span>
                 <el-upload
                    accept="image/*"
                    :action="uploadFileUrl"
                    list-type="picture-card"
                    :file-list="legalPersonImg"
                    :on-success="function(response, file, fileList){return handleAvatarSuccess(response, file, fileList,1)}"
                    :on-preview="function(file){return showImg(file.url)}"
                    :on-remove="function(file, fileList){return deleteAvatar(file, fileList,1)}">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
            <div class="gy-form-group">
                <span class="l">名片</span>
                <el-upload
                    accept="image/*"
                    :action="uploadFileUrl"
                    list-type="picture-card"
                    :file-list="legalCard"
                    :on-success="function(response, file, fileList){return handleAvatarSuccess(response, file, fileList,3)}"
                    :on-preview="function(file){return showImg(file.url)}"
                    :on-remove="function(file, fileList){return deleteAvatar(file, fileList,3)}">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
        </div>
            <div class="gy-form-group">
                <span class="l">联系人</span>
                <input  type="text" placeholder="请填写" class="gy-input" v-model="ratingFormData.contactName">
            </div>
             <div class="gy-form-group">
                <span class="l">证件号码</span>
                <input  type="text" placeholder="请填写" class="gy-input" v-model="ratingFormData.contactCertificateNumber">
            </div>
            <div class="clearfix">
            <div class="gy-form-group">
                <span class="l">身份证件</span>
                <el-upload
                    accept="image/*"
                    :action="uploadFileUrl"
                    list-type="picture-card"
                    :file-list="contactImg"
                    :on-success="function(response, file, fileList){return handleAvatarSuccess(response, file, fileList,2)}"
                    :on-preview="function(file){return showImg(file.url)}"
                    :on-remove="function(file, fileList){return deleteAvatar(file, fileList,2)}">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
            <div class="gy-form-group">
                <span class="l">名片</span>
                <el-upload
                    accept="image/*"
                    :action="uploadFileUrl"
                    list-type="picture-card"
                    :file-list="contactCard"
                    :on-success="function(response, file, fileList){return handleAvatarSuccess(response, file, fileList,4)}"
                    :on-preview="function(file){return showImg(file.url)}"
                    :on-remove="function(file, fileList){return deleteAvatar(file, fileList,4)}">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
        </div>
     </div>
     <div @click="showImgUrl=''" v-if="showImgUrl" class="showAvatar">
         <img :src="showImgUrl" alt="">
     </div>
     <div class="gy-form">
            <h3><i class="el-icon-tickets"></i> 产品信息</h3>
            <div class="company_type gy-form-group">
                <span class="l">企业类型</span>
                 <el-select @change="ratingFormData.enterpriseChildId=''" v-model="ratingFormData.enterpriseParentId"  placeholder="请选择">
                    <el-option
                      v-for="item in enterPriseType.enterpriseParent"
                      :key="item.id"
                      :label="item.declarationName"
                      :value="item.id">
                    </el-option>
                </el-select>
                 <el-select  v-model="ratingFormData.enterpriseChildId"  placeholder="请选择">
                    <el-option
                      v-for="item in enterPriseType.enterpriseChild"
                      :key="item.id"
                      :label="item.declarationName"
                      :value="item.id">
                    </el-option>
                </el-select>
            </div>
          <div class="add_list_data gy-button-normal" @click="addTableData">新增</div>
            <table v-if="ratingFormData.enterpriseParentId==10" class="gy-table product_list">
                <thead>
                <tr>
                    <td>品类</td>
                    <td>产品</td>
                    <td>年用量(吨)</td>
                    <td>生产量(吨)</td>
                    <td>备注</td>
                    <td width="100">操作</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in productList" :key="index">
                    <td><input  v-model="item.category" ></td>
                    <td><input v-model="item.products"></td>
                    <td><input  maxlength='7' @change="toNum('productList',item.annualConsumption,'annualConsumption', index)" placeholder="请输入数字" v-model="item.annualConsumption" ></td>
                    <td><input  placeholder="请输入数字" maxlength='7' @change="toNum('productList',item.productionOutput,'productionOutput', index)" v-model="item.productionOutput"></td>
                    <td><input v-model="item.remark" ></td>
                    <td><button @click="deleteTableData(index,1)" class="gy-button-normal">删除</button></td>
                    </tr>
                </tbody>
            </table>
            <table v-if="ratingFormData.enterpriseParentId==12" class="gy-table product_list">
                <thead>
                <tr>
                    <td>主营品类</td>
                    <td>主营产品</td>
                    <td>年交易量(吨)</td>
                    <td>备注</td>
                    <td>操作</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in MainProductList" :key="index">
                    <td><input v-model="item.mainCategory" ></td>
                    <td><input v-model="item.mainProducts"></td>
                    <td><input  placeholder="请输入数字" maxlength='7' @change="toNum('MainProductList',item.annualTradingVolume,'annualTradingVolume', index)" v-model="item.annualTradingVolume" ></td>
                    <td><input v-model="item.remark" ></td>
                    <td><button @click="deleteTableData(index,2)"  class="gy-button-normal">删除</button></td>
                    </tr>
                </tbody>
            </table>
       </div>
          <div class="gy-form  clearfix">
              <h3><i class="el-icon-tickets"></i> 证件信息</h3>
               <div class="img_show_div"  v-for="(item,index) in companyFileImg"  :key="index">
                <div class="file_list_con">
                     <span class="l">{{item.fileName}}</span>
                     <div class="img_list_con">
                        <div  class="file_img_list" v-for="(n, i) in item.filePathList" :key="i+300" >
                            <i  @click="delete_upload_img(n, item)" class="el-icon-circle-close close_btn"></i>
                            <div @click="showImg(n)"><img  :src="n" alt=""></div>
                        </div>
                         <div class="file_upload_con">
                            <el-upload
                                accept="image/*"
                                class="avatar-uploader  add_file"
                                :action="uploadFileUrl"
                                :show-file-list="false"
                                :on-success="function(response, file, fileList){return handleFlieSuccess(response, file, fileList, item)}">
                                <i class="el-icon-plus"></i>
                        </el-upload>
               </div>
                   </div>
               </div>
                 <div class="file_info ">
                 <div class="gy-form-group"  v-for="(subItem, subIndex) in item.fileParamValueModelList" :key="subIndex"  >
                        <span class="l">{{subItem.paramName}}</span>
                        <input  placeholder="请填写" class="gy-input" v-model="subItem.paramValue">
                </div>
             </div>
            </div>
            <div class="upload_div">
                <el-upload
                    accept="image/*"
                    class="avatar-uploader add_file"
                    list-type="picture-card"
                    :action="uploadFileUrl"
                    :show-file-list="false"
                    :before-upload="beforeFileUpload"
                    :on-progress="fileUploading"
                    :on-error="fileUploadError"
                    :on-success="handleCompanyFileSuccess">
                    <i class="el-icon-plus"></i>
               </el-upload>
                <el-select class="upload_select" v-model="imgTypeId"  placeholder="请选择">
                <el-option
                    v-for="item in imgTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
               </el-select>
            </div>
         </div>
      <div class="gy-form">
            <h3><i class="el-icon-tickets"></i> 经营资质</h3>
            <div class="gy-form-group" style="width:100%;">
                <span class="l">装置设施</span>
                <el-checkbox-group v-model="checkList">
                    <el-checkbox label="0">自有建设用地及厂房装置</el-checkbox>
                    <el-checkbox label="1">租用厂房装置设备</el-checkbox>
                    <el-checkbox label="2">租用办公地址</el-checkbox>
                    <el-checkbox label="3" >其他（请给予描述）</el-checkbox>
                </el-checkbox-group>
                <textarea v-if="checkbox_remark" class="gy-textarea remark_input"  v-model="ratingFormData.remark" placeholder="请填写" cols="30" rows="10"></textarea>
            </div>
      </div>
      <div v-if='showHistoryList' class="history_con">
             <div class="history">
                <div class="history_title">
                    <span>历史申报</span>
                    <i @click='showHistoryList=false' class="el-icon-close history_closs_btn"></i>
                </div>
                <div class="history_content">
                    <span>被评级公司： {{historyList.beToDeclareCompanyName|dataFormat}}</span>
                <table class="gy-table history_list">
                    <thead>
                    <tr>
                        <td>申报公司</td>
                        <td>申报时间</td>
                        <td>申报类型</td>
                        <td>操作</td>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in historyList.list" :key="index">
                        <td>{{item.companyName|dataFormat}}</td>
                        <td>{{item.declareDate|date|dataFormat}}</td>
                        <td>{{historyDeclare(item)}}</td>
                        <td><button  class="gy-button-view" @click="goDetail(item)">查看</button></td>
                    </tr>
                </tbody>
            </table>
           </div>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :current-page="historyData.pageNum"
                    :total="historyList.total">
                </el-pagination>
             </div>
      </div>
      <div class="gy-form submitDiv">
            <div @click="sendFormData" class="gy-button-normal form_save">保存</div>
            <div  @click="showHistoryList=true"  class="gy-button-normal look_history ">查看历史申报</div>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            ratingDataType: 2,
            allCompany: [], // 搜索查询公司名称
            searchCompanyInfo: '', // 选中公司信息
            settedLine: false,
            ratingFormData: {
                name: JSON.parse(localStorage.getItem('userInfo')).companyName, // 公司名称
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
                companyBankInfoModelList: [
                    {
                        account: '',
                        openBank: ''
                    }
                ],
                companyContactModelList: [ // 申报联系人信息列表
                    {
                        address: '', // 联系人详细地址
                        cityId: '', // 联系人市id
                        districtId: '', // 联系人区id
                        name: '', // 申报联系人姓名
                        phone: '', // 申报联系人电话
                        position: '', // 职务（岗位）
                        provinceId: '' // 联系人省id
                    }
                ],
                companyFileModelList: [],
                companyProductInfoModelList: []
            },
            baseInfoCompanyType: { // 申报类型
                declareParentId: [],
                declareChildIdList: []
            },
            enterPriseType: { // 企业类型
                enterpriseParent: [],
                enterpriseChildId: []
            },
            baseInfoContactAddress: [ // 联系人地址
                {
                    provinceArr: [],
                    districtArr: [],
                    cityArr: []
                }
            ],
            companyAddress: { // 公司地址
                provinceArr: [],
                districtArr: [],
                cityArr: []
            },
            openBankList: [
                {name: '中国工商银行'},
                {name: '中国农业银行'},
                {name: '中国银行'},
                {name: '中国建设银行'},
                {name: '交通银行'},
                {name: '中信银行'},
                {name: '中国光大银行'},
                {name: '华夏银行'},
                {name: '中国民生银行'},
                {name: '招商银行'},
                {name: '兴业银行'},
                {name: '广发银行'},
                {name: '平安银行'},
                {name: '上海浦东发展银行'},
                {name: '恒丰银行'},
                {name: '浙商银行'},
                {name: '渤海银行'},
                {name: '中国邮政储蓄银行'}
            ],
            settedLine1: false,
            legalPersonImg: [], // 法人身份证图片
            contactImg: [], // 联系人身份证图片
            legalCard: [], // 法人名片
            contactCard: [], // 联系人名片
            companyFileImg: [], // 证件信息
            showImgUrl: '', // 显示上传图片
            productList: [{
                category: '',
                products: '',
                annualConsumption: '',
                productionOutput: '',
                mainCategory: '',
                mainProducts: '',
                annualTradingVolume: '',
                remark: ''
            }],
            MainProductList: [{
                category: '',
                products: '',
                annualConsumption: '',
                productionOutput: '',
                mainCategory: '',
                mainProducts: '',
                annualTradingVolume: '',
                remark: ''
            }],
            imgTypeList: [],
            imgTypeId: '',
            imgTypeName: '',
            fileTypeId: '',
            checkList: [],
            checkbox_remark: false,
            loading: false,
            currentCompanyId: this.$route.query.ratingCompanyId,
            uploadFileUrl: this.$http.defaults.baseURL + this.$api.ratingApplication.uploadFile,
            showHistoryList: false,
            historyData: {
                companyId: this.$route.query.ratingCompanyId,
                pageNum: 0,
                pageSize: 5
            },
            historyList: {},
            historyCompanyId: ''
        };
    },
    methods: {
        init () {
            this.getCompanyAreasList(0, 0, 1);
            this.getContactAreasList(0, 0, 0, 1);
            this.getRatingType();
            this.getPriseType();
            this.getImgTypeList();
            if (this.currentCompanyId) {
                this.getFormData();
            }
            this.getHistoryList();
        },
        addContact () {
            let contactInfo = {
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
            this.ratingFormData.companyContactModelList.push(contactInfo);
            this.baseInfoContactAddress.push(contactAddress);
            this.getContactAreasList(0, 0, this.baseInfoContactAddress.length - 1);
        },
        deteleContact (index) {
            this.ratingFormData.companyContactModelList.splice(index, 1);
            this.baseInfoContactAddress.splice(index, 1);
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
        setTextAreaheight (value) {
            let reg = new RegExp(/\n/g);
            if (reg.test(value)) {
                this.settedLine = true;
            }
        },
        addOtherBank (item) {
            this.$prompt('请输入其他银行名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({ value }) => {
                if (value.trim('') === '') {
                    return false;
                }
                this.openBankList.push({name: value});
                item.openBank = value;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },
        handleFlieSuccess (res, file, fileList, item) {
            item.filePathList.push(res);
        },
        handleAvatarSuccess (res, file, fileList, id) {
            let data;
            if (id === 1) {
                data = this.uploadFileData('法定代表人身份证', res, 1);
                this.legalPersonImg.push({url: res, name: '法定代表人身份证', data});
            } else if (id === 2) {
                data = this.uploadFileData('联系人身份证', res, 2);
                this.contactImg.push({url: res, data});
            } else if (id === 3) {
                data = this.uploadFileData('法定代表人名片', res, 3);
                this.legalCard.push({url: res, data});
            } else if (id === 4) {
                data = this.uploadFileData('联系人名片', res, 4);
                this.contactCard.push({url: res, data});
            }
        },
        showImg (file) {
            this.showImgUrl = file;
        },
        setHeight () {
            if (!this.settedLine) this.settedLine = true;
        },
        fileUploading () {
            this.$store.dispatch('setShowLoading');
        },
        fileUploadError () {
            this.$store.dispatch('setHideLoading');
        },
        handleCompanyFileSuccess (res, file) { // 公司证件上传成功
            this.$store.dispatch('setHideLoading');
            if (!this.imgTypeId) {
                return false;
            }
            this.fileTypeId = Number(this.fileTypeId);
            if (isNaN(this.fileTypeId)) {
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
        getFileParam (typeId, url) {
            this.$http.get(this.$api.ratingApplication.fileParam + typeId).then((res) => {
                let data = {
                    fileName: this.imgTypeName,
                    rskDeclareCompanyFileTypeId: this.fileTypeId,
                    filePathList: [url],
                    fileParamValueModelList: res.data.data
                };
                this.companyFileImg.push(data);
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
        getCompanyAreasList (id, type, time) { // 获取公司地理位置
            this.$http.get(this.$api.ratingApplication.areasList + id).then((res) => {
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
        getContactAreasList (id, type, index, time) { // 获取联系人地理位置
            this.$http.get(this.$api.ratingApplication.areasList + id).then((res) => {
                let data = res.data.data;
                if (type === 0) {
                    this.baseInfoContactAddress[index].provinceArr = data;
                } else if (type === 1) {
                    this.baseInfoContactAddress[index].cityArr = data;
                    if (time !== 1) {
                        this.ratingFormData.companyContactModelList[index].cityId = '';
                        this.baseInfoContactAddress[index].districtArr = '';
                        this.ratingFormData.companyContactModelList[index].districtId = '';
                    }
                } else if (type === 2) {
                    this.baseInfoContactAddress[index].districtArr = data;
                    if (time !== 1) {
                        this.ratingFormData.companyContactModelList[index].districtId = '';
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
        getRatingType () { // 获取公司类型列表
            this.$http.get(this.$api.ratingApplication.declareInfo).then((res) => {
                if (res.data.code === 0) {
                    let data = res.data.data;
                    this.baseInfoCompanyType.declareParentId = data;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        getPriseType () { // 获取企业类型
            this.$http.get(this.$api.ratingApplication.enterpriseTypeList).then((res) => {
                if (res.data.code === 0) {
                    let data = res.data.data;
                    this.enterPriseType.enterpriseParent = data;
                } else {
                    this.$message(res.data.message);
                }
                this.enterPriseType.enterpriseParent.forEach(element => {
                    if (element.id === this.ratingFormData.enterpriseParentId) {
                        this.enterPriseType.enterpriseChild = element.declareList;
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
            let productInfo = {
                annualConsumption: '',
                annualTradingVolume: '',
                category: '',
                mainCategory: '', // "主营品类",
                mainProducts: '', // "主营产品",
                productionOutput: '', // 生产量,
                products: '',
                remark: '' // "备注信息"
            };
            if (this.ratingFormData.enterpriseParentId === 10) {
                this.productList.push(productInfo);
            } else {
                this.MainProductList.push(productInfo);
            }
        },
        deleteTableData (index, type) {
            type === 1 ? this.productList.splice(index, 1) : this.MainProductList.splice(index, 1);
        },
        delete_upload_img (filePath, item) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                item.filePathList.splice(item.filePathList.indexOf(filePath), 1);
                if (item.filePathList.length === 0) {
                    this.companyFileImg = this.companyFileImg.filter((element, index, arr) => {
                        return element.rskDeclareCompanyFileTypeId !== item.rskDeclareCompanyFileTypeId;
                    });
                }
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
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
            this.$http.get(this.$api.ratingApplication.fileType).then((res) => {
                if (res.data.code === 0) {
                    let data = res.data.data;
                    that.imgTypeList = data;
                } else {
                    that.$message(res.data.message);
                }
            });
        },
        beforeFileUpload () {
            if (!this.imgTypeId) {
                this.$message.error('请选择上传文件类型');
                this.$store.dispatch('setHideLoading');
                return false;
            }
        },
        toNum (className, value, name, index) {
            this[className].forEach((e, i, arr) => {
                if (index === i) {
                    arr[i][name] = value.replace(/[^0-9]+/g, '');
                }
            });
        },
        searchCompany (query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    let that = this;
                    that.loading = false;
                    that.$http.get(this.$api.ratingApplication.searchCompany + query).then((res) => {
                        if (res.data.code === 0) {
                            that.allCompany = res.data.data;
                        } else {
                            that.$message(res.data.message);
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
        getHistoryList () {
            // let that = this;
            this.$http.post(this.$api.ratingApplication.ratingHistoryList, this.historyData).then((res) => {
                if (res.data.code === 0) {
                    this.historyList = res.data.data;
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        goDetail (data) { // 查看
            this.showHistoryList = false;
            let routeData = this.$router.resolve({
                path: `/ratingApplication/ratingView?historyCompanyInfo=${data.rskRatingTaskId}&applicationCompanyName=${data.companyName}`
            });
            window.open(routeData.href, '_blank');
        },
        handleCurrentChange (val) { // 分页
            this.historyData.pageNum = val;
            this.getHistoryList();
        },
        getImgArr (data) {
            let arr = [];
            data.forEach(e => {
                arr.push(e.data);
            });
            return arr;
        },
        historyDeclare (item) {
            if (item.applyType === 0) {
                return '自我申报';
            } else {
                let str = '';
                str = item.declareParentName ? item.declareParentName : '-';
                str += ',';
                str += item.declareChildNameList && item.declareChildNameList.length > 0 ? item.declareChildNameList.join(',') : '-';
                return str;
            }
        },
        getFormData () {
            this.$http.get(this.$api.ratingApplication.getRatingFormDataMgmt + this.currentCompanyId).then((res) => {
                if (res.data.code === 0) {
                    this.ratingFormData = res.data.data;
                    this.allCompany.push({
                        id: this.ratingFormData.companyId,
                        name: this.ratingFormData.name || '未填写'
                    });
                    if (this.ratingFormData.enterpriseParentId === 12) {
                        this.MainProductList = this.ratingFormData.companyProductInfoModelList;
                    }
                    if (this.ratingFormData.enterpriseParentId === 10) {
                        this.productList = this.ratingFormData.companyProductInfoModelList;
                    }
                    this.checkList = this.ratingFormData.devices.split(',');
                    this.setContactAreasList();
                    this.setImgUrl(this.ratingFormData.companyFileModelList);
                    this.ratingFormData.companyFileModelList = [];
                    this.setTextAreaheight(this.ratingFormData.address);
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        sendFormData () {
            this.ratingFormData.companyProductInfoModelList = this.ratingFormData.enterpriseParentId === 10 ? this.productList : this.MainProductList;
            this.ratingFormData.companyFileModelList = [...this.getImgArr(this.legalPersonImg), ...this.getImgArr(this.contactImg), ...this.getImgArr(this.legalCard), ...this.getImgArr(this.contactCard), ...this.companyFileImg];
            this.ratingFormData.devices = this.checkList.join(',');
            this.allCompany.forEach(element => {
                if (element.id === this.ratingFormData.companyId) {
                    this.ratingFormData.name = element.name;
                }
            });
            if (this.ratingFormData.id) {
                this.$http.put(this.$api.ratingApplication.updateRatingFormData, this.ratingFormData).then((res) => {
                    if (res.data.code === 0) {
                        this.$router.push({name: 'checkList'});
                        this.$message('更新成功');
                    } else {
                        this.$message(res.data.message);
                    }
                });
            } else {
                this.$http.post(this.$api.ratingApplication.sendratingFormData, this.ratingFormData).then((res) => {
                    if (res.data.code === 0) {
                        this.$router.push({name: 'checkList'});
                        this.$message('提交成功');
                    } else {
                        this.$message(res.data.message);
                    }
                });
            }
        }
    },
    mounted () {
        this.init();
    },
    watch: {
        'ratingFormData.declareParentId' (newValue, oldValue) {
            this.baseInfoCompanyType.declareParentId.forEach(element => {
                if (element.id === newValue) {
                    this.baseInfoCompanyType.declareChildIdList = element.declareList;
                    this.ratingFormData.declareChildIdList = [];
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
        'imgTypeId' (newValue, oldValue) {
            this.fileTypeId = newValue;
            this.imgTypeList.forEach(element => {
                if (element.id === newValue) {
                    this.imgTypeName = element.name;
                }
                if (newValue === 13) {
                    this.$prompt('请输入图片类型', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(({ value }) => {
                        this.imgTypeId = this.imgTypeName = value;
                        if (!isNaN(value)) {
                            this.fileTypeId = 13;
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消输入'
                        });
                    });
                }
            });
        },
        'checkList' (newValue, oldValue) {
            if (newValue.indexOf('3') >= 0) {
                this.checkbox_remark = true;
            } else {
                this.checkbox_remark = false;
            }
        }
    },
    filters: {
        dataFormat (data) {
            if (!data) {
                return '-';
            } else {
                return data;
            }
        }
    }
};

</script>
<style lang="scss" scoped>
    .text-address{
        border: none;
        border-bottom: 1px solid $color-border;
        height: 30px;
        overflow: hidden;
        font-size: 14px;
        &.line-two{
            height: 60px;
        }
    }
 .application {
     h3{margin: 13px 0 5px; font-size: 16px;}
    padding-bottom:100px ;
    min-width: 800px;
    .first_div {
        padding-top: 0;
    }
    .el-icon-close-tip {
        display: none!important;
    }
    .isRequired::before {
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
    }
    .contact_info {
        border-bottom:1px solid #ebeef5;
        padding-bottom:50px;
        margin-bottom:30px ;
    }
    .delete_bank {
        margin-left: 908px;
        margin-top: 10px;
        display: inline-block;
 }
   input {
        font-size: 14px;
    }
   textarea{font-family: "Microsoft YaHei"}
 }
 .addressDiv .el-select{
   width:32%;
 }
.company_name_select {
    width: 60%!important;
}
 .divPadding {
   padding-bottom: 14px;
 }
 .company_type .el-select {
     width: 46%;
 }
 .contact_address  .el-select {
     width: 32%;
 }
 .add_contact {
     margin-left: 100px;
     margin-top: 10px;
     display: inline-block;
 }
 .add_list_data {
     float: right;
     margin-bottom: 5px;
 }
 .clearfix {
    content: "";
    display: block;
    clear: both;
 }
 .uploadImg ,.el-icon-picture{
    color:#7dafeb;
    cursor: pointer;
 }
 .showAvatar {
     width: 100%;
     height: 100%;
     position: fixed;
     top: 0;
     left: 0;
     background-color: rgba(0,0,0,.8);
     z-index: 999999;
     img{
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%,-50%);
 }
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
     margin-top:15px;
    .add_file {
     display: inline-block;
     width: 60px;
     height: 60px;
     padding-left:0 ;
     text-align: center;
     position: relative;
     .upload_select {
       width: 60px;
       display: inline-block;
     }
    }
 }
 .remark_input {
     width: 80%;
     height: 100px;
     border:1px solid #E7ECF1;
     display: inline-block;
 }
 .submitDiv {
     padding-right:150px ;
     float: right;
     .form_save {
        background-color: #f2ac4c;
        color: #fff;
        margin-right:10px ;
     }
 }
 .img_show_div {
     position: relative;
     top: 0;
     left: 0;
     display: inline-block;
     cursor: pointer;
     .file_list_con{
         position: relative;
         margin-top:12px ;
         span {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left:10px;
            word-wrap:break-word;
            -webkit-line-clamp:3;           //设置行数，2行显示
            display: -webkit-box;           //盒子模型
            -webkit-box-orient:vertical;    //元素的排列方式，垂直居中
            overflow:hidden;                //隐藏溢出内容
            text-overflow: ellipsis;
            max-width: 90px;
         }
         .img_list_con {
            margin-left:108px;
            display: inline-block;
            max-width: 760px;
            min-width: 400px;
          .file_img_list {
            display: inline-block;
            width: 60px;
            text-align: center;
            position: relative;
            margin-right: 10px;
            vertical-align: middle;
            span {
                display: inline-block;
                line-height: 20px;
                text-align: center;
                width: 100%;
            }
            div {
                width: 60px;
                height: 60px;
                position: relative;
                border:1px solid #E7ECF1;
                img {
                    width: 58px;
                    max-height: 58px;
                    position: absolute;
                    top:50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                }
            }
            .close_btn {
                font-size: 20px;
                position: absolute;
                top: -10px;
                right: -10px;
                color: #E0370F;
                cursor: pointer;
                z-index: 9;
            }
            }
          }
    .file_upload_con{
        display: inline-block;
        vertical-align: middle;
        // margin-top:6px ;
        .add_file {
            display: inline-block;
            width: 60px;
            height: 60px;
            padding-left:0 ;
            text-align: center;
            border:1px solid #E7ECF1;
            i {
            height: 60x;
            line-height: 60px;
            font-size: 26px;
            color: #ccc;
            }
        }
    }
    }
 }
 .avatar-upload-div {
     position: relative;
     width: 50px;
     height: 50px;
     border:1px solid #E7ECF1;
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
     color: #E0370F;
     cursor: pointer;
     z-index: 2;
     }
 }
 .history_con {
     position: fixed;
     top:0;
     left: 0;
     z-index: 999999;
     width: 100%;
     height: 100%;
     background-color:rgba(0,0,0,0.8);
     .history {
         width: 50%;
         min-height: 200px;
         padding-bottom: 30px;
         position: absolute;
         top: 50%;
         left: 50%;
         transform: translate(-50%,-50%);
         background-color: #fff;
         .history_title {
            padding: 10px 20px;
            border-bottom: 1px solid #ebeef5;
            box-sizing: border-box;
            background-color: #fff;
            color: #000;
            font-size: 16px;
            font-weight: 700;
            .history_closs_btn {
                font-size: 20px;
                position: absolute;
                top: 20px;
                right: 20px;
                cursor: pointer;
         }
         }
         .history_content {
             width: 100%;
             padding: 0 20px;
             span {
                 display: inline-block;
                 margin: 10px 0;
             }
         }
         .history_list {
             padding: 0 20px;
            //  width: 100%;
             max-height:70%;
             margin: 0 auto 20px ;
         }
     }
 }
 .rating_dialog {
     height: 500px;
     overflow: hidden;
     overflow-y: scroll;
 }
</style>
