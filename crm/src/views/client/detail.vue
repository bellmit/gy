<template>
  <div class="my-container">
       <div class="customer-title">
            {{formData.customerName}}
        </div>
      <div class="gy-form ">
            <p class="model_title"><i class="iconfont icon-gaishu"></i> 概述</p>
            <div class="gy-form-group">
                <span  class="l"> 客户编号</span>
                <span>{{formData.customerNo||'-'}}</span>
            </div>
            <div class="gy-form-group ">
                <span  :class="{'is-required':viewType===2}"  class="l"> 客户状态</span>
                <span v-if="viewType ===1">{{formData.customerStatus===0?'潜在客户':'客户'}}</span>
                <el-select v-else  v-model="formData.customerStatus"  placeholder="请选择">
                    <el-option
                    v-for="item in  clientManagers"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                    </el-option>
                </el-select>
            </div>
             <div class="gy-form-group clearfix">
                <span :class="{'is-required':viewType===2}" class="l"> 企业类型</span>
                <span v-if="viewType ===1">{{formData.customerTypeDictId||'-'}}</span>
                <el-select v-else  v-model="formData.customerTypeDictId"  placeholder="请选择">
                    <el-option
                    v-for="item in  customerType"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span :class="{'is-required':viewType===2}" class="l"> 企业属性</span>
                <span v-if="viewType ===1">{{formData.customerAttrDictId||'-'}}</span>
                <el-select  v-else v-model="formData.customerAttrDictId"  placeholder="请选择">
                    <el-option
                    v-for="item in  customerAttr"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l"> 企业规模</span>
                <span v-if="viewType ===1">{{formData.customerScaleDictId||'-'}}</span>
                <el-select v-else  v-model="formData.customerScaleDictId"  placeholder="请选择">
                    <el-option
                    v-for="item in  customerScale"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                    </el-option>
                </el-select>
            </div>
        </div>
     <div class="gy-form ">
        <p class="model_title"><i class="iconfont icon-xiangxixinxi"></i> 详细信息</p>
            <div class="gy-form-group">
                <span :class="{'is-required':viewType===2}" class="l"> 人员规模</span>
                <span v-if="viewType ===1">{{formData.personScale||'-'}}</span>
                <el-select  v-else v-model="formData.personScale"  placeholder="请选择">
                    <el-option
                    v-for="item in personScaleArr"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                    </el-option>
                </el-select>
            </div>
            <div class="gy-form-group">
                <span class="l"> 注册资金</span>
                <span v-if="viewType ===1">{{formData.registeredCapital| numToCash(4) =='-'?'-':formData.registeredCapital | numToCash(4) +'万元'}}</span>
                <div  v-else><input  @change="dataToFixed('registeredCapital', 4)" type="number" placeholder="请填写" class="gy-input three-column"  v-model.number="formData.registeredCapital">万元</div>
            </div>
            <div class="contact-address gy-form-group">
                    <span :class="{'is-required':viewType===2}" class="l">总部地址</span>
                    <span v-if="viewType === 1">{{(formData.provinceName+formData.cityName+formData.areaName)||'-'}}</span>
                    <div  v-else>
                    <el-select @change="searchArea(2,formData.provinceId,true)"  v-model="formData.provinceId"  placeholder="省市">
                        <el-option
                        v-for="item in addressData.province"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select  @change="searchArea(3,formData.cityId,true)"  v-model="formData.cityId"  placeholder="城市">
                        <el-option
                        v-for="item in addressData.city"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select   v-model="formData.areaId"  placeholder="区">
                        <el-option
                        v-for="item in addressData.area"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="gy-form-group">
                  <span :class="{'is-required':viewType===2}" class="l"> 成立日期</span>
                  <span v-if="viewType ===1">{{formData.registrationDate|date}}</span>
                  <el-date-picker
                  v-else
                  class="form-date"
                  v-model="formData.registrationDate"
                  type="date"
                  placeholder="选择日期"
                 :picker-options="pickerOptions0">
                  </el-date-picker>
            </div>
             <div class="gy-form-group">
                <span v-if="viewType ===1">{{formData.address ||'-'}}</span>
                <input v-else type="text" placeholder="联系地址" class="gy-input"  v-model="formData.address">
            </div>
             <div class="gy-form-group">
                <span :class="{'is-required':viewType===2}" class="l"> 主营产品</span>
                <span v-if="viewType ===1">{{formData.products ||'-'}}</span>
                <input v-else  type="text" placeholder="请填写" class="gy-input"  v-model="formData.products">
            </div>
             <div class="gy-form-group">
                <span class="l"> 产业链状态</span>
                <span v-if="viewType ===1">{{formData.industrialChainsStatus ||'-'}}</span>
                <input v-else  type="text" placeholder="请填写" class="gy-input"  v-model="formData.industrialChainsStatus">
            </div>
             <div class="gy-form-group">
                <span  class="l"> 产业链分布</span>
                <span v-if="viewType ===1">{{formData.industrialChainsArea ||'-'}}</span>
                <input v-else  type="text" placeholder="请填写" class="gy-input"  v-model="formData.industrialChainsArea">
            </div>
             <div class="clearfix  gy-form-group">
                <span class="l"> 年产量</span>
                <span v-if="viewType ===1">{{formData.annualYield| numToCash(4) =='-'?'-':formData.annualYield| numToCash(4)+'万吨'}}</span>
                <div  v-else><input  @change="dataToFixed('annualYield', 4)" type="number" placeholder="请填写" class="gy-input three-column"  v-model.number="formData.annualYield">万吨</div>
            </div>
            <div class="gy-form-group">
                <span class="l"> 原料</span>
                <span v-if="viewType ===1">{{formData.material ||'-'}}</span>
                <input  v-else type="text" placeholder="请填写" class="gy-input"  v-model="formData.material">
            </div>
            <div class="gy-form-group">
                <span class="l"> 年交易量</span>
                <span v-if="viewType ===1">{{formData.annualTurnover| numToCash(4) =='-'?'-':formData.annualTurnover| numToCash(4)+'万吨'}}</span>
                <div  v-else ><input type="number" placeholder="请填写" class="gy-input three-column"   @change="dataToFixed('annualTurnover', 4)"  v-model.number="formData.annualTurnover">万吨</div>
            </div>
            <div class="gy-form-group">
                <span class="l"> 年营业额</span>
                <span v-if="viewType ===1">{{formData.annualAmount| numToCash(4) == '-'?'-':formData.annualAmount| numToCash(4)+'万元'}}</span>
                <div  v-else><input type="number" placeholder="请填写" class="gy-input three-column"   @change="dataToFixed('annualAmount', 4)"  v-model.number="formData.annualAmount">万元</div>
            </div>
            <div class="gy-form-group clearfix">
                <span :class="{'is-required':viewType===2}" class="l"> 来源</span>
                <span v-if="viewType ===1">{{formData.customerSourceDictId||'-'}}</span>
                <el-select v-else  v-model="formData.customerSourceDictId"  placeholder="请填写">
                    <el-option
                    v-for="item in customerSource"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId">
                    </el-option>
                </el-select>
            </div>
             <div class="gy-form-group single-row clearfix">
                 <span class="l"> 备注</span>
                 <span v-if="viewType ===1">{{formData.remark||'-'}}</span>
                 <textarea v-else  class="gy-textarea" v-model="formData.remark" cols="30" rows="10" placeholder="请填写"></textarea>
            </div>
            <div class="gy-form-group">
                 <span class="l"> 企业认证状态</span>
                 <span>{{formData.authStatus===1?'待审核':formData.authStatus===2?'已通过':'已驳回'}}</span>
            </div>
            <div class="gy-form-group ">
                 <span class="l"> CA认证状态</span>
                 <span>{{authStatus[formData.caAuthStatus]||'-'}}</span>
            </div>
            <div class="gy-form-group ">
                 <span class="l"> 银行认证状态</span>
                 <span>{{authStatus[formData.bankAuthStatus]||'-'}}</span>
            </div>
            <div class="gy-form-group">
                 <span class="l"> 客户经理</span>
                 <span>{{managerArr.join(",")||'-'}}</span>
            </div>
            <div class="gy-form-group single-row clearfix my_uploader_con">
                <span class="l"> 三证信息</span>
                <div  v-if="viewType === 2">
                    <el-upload
                        :limit="3"
                        accept="image/*"
                        action="api"
                        list-type="picture-card"
                        :file-list="imgList"
                        :on-remove="deleteAvatar"
                        :on-preview="showImg"
                        :http-request="uploadImg">
                        <i class="el-icon-plus"></i>
                    </el-upload>
               </div>
               <div class="papers" v-else>
                   <div v-for="(item,index) in imgList" :key="index">
                      <img  @click="showImgUrl=item.url" :src="item.url" alt="">
                   </div>
                   <div v-if="imgList.length===0">{{'-'}}</div>
               </div>
                <div @click="showImgUrl=''" v-if="showImgUrl" class="showAvatar">
                    <img :src="showImgUrl" alt="">
               </div>
            </div>
            <div class="contact-con">
                <div @click="currentTabIndex=0" class="contact-tab" :class="{'current-tab':currentTabIndex===0}">客户内部员工</div>
                <div @click="currentTabIndex=1" class="contact-tab" :class="{'current-tab':currentTabIndex===1}">跟进进度</div>
                <div  v-if="viewType==2&&currentTabIndex==0" class="add-contact"><button   @click="addContact"  class="gy-button-extra">新增</button></div>
                <table v-if="currentTabIndex===0" class="gy-table">
                    <thead>
                        <tr>
                            <td>姓名</td>
                            <td>职务</td>
                            <td>移动电话</td>
                            <td>邮箱</td>
                            <td>是否联系人</td>
                            <td>备注</td>
                            <td width="100">操作</td>
                        </tr>
                    </thead>
                    <tbody v-if="formData.customerContacts.length !== 0">
                    <tr v-for="(item,index) in formData.customerContacts" :key="index">
                        <td>{{item.contactName||'-'}}</td>
                         <td>{{item.title||'-'}}</td>
                         <td class="align-r">{{item.mobile||'-'}}</td>
                         <td class="align-r">{{item.email||'-'}}</td>
                         <td>{{item.defaultContact?'是':'否'}}</td>
                         <td><span class="nowrap">{{item.remark||'-'}}</span></td>
                        <td  class="align-c"><button @click="editcontact(index)" class="gy-button-view">{{viewType==1?'查看':'编辑'}}</button><button v-if="viewType==2" @click="deleteContact(item.id, index)" class="gy-button-view add-margin">删除</button></td>
                    </tr>
                    </tbody>
                     <tbody v-else>
                        <tr>
                            <td colspan="7" class="null-td">没有找到可显示的数据...</td>
                        </tr>
                    </tbody>
               </table>
                <table v-else class="gy-table">
                    <thead>
                        <tr>
                            <td>跟进时间</td>
                            <td>联系人</td>
                            <td>跟进状态</td>
                            <td>跟进记录</td>
                            <td>客户经理</td>
                            <td>跟进人</td>
                            <td width="100">操作</td>
                        </tr>
                    </thead>
                    <tbody v-if="formData.trackList.length !== 0">
                    <tr v-for="(item,index) in formData.trackList" :key="index">
                        <td>{{item.trackDate|date('h')}}</td>
                         <td>{{item.contactUserName||'-'}}</td>
                         <td>{{item.trackStatusDictName||'-'}}</td>
                         <td :title='item.content'><span class="nowrap">{{item.content}}</span></td>
                         <td>{{item.customerManagers|filterData}}</td>
                         <td>{{item.trackUserName|'-'}}</td>
                        <td><button @click="lookTrackData(item)" class="gy-button-view">查看</button></td>
                    </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="7" class="null-td">没有找到可显示的数据...</td>
                        </tr>
                   </tbody>
               </table>
                 <div class="submit-con">
                    <div @click="sendFormData" v-if="viewType==2" class="gy-button-extra">保存</div>
                    <div @click="$router.go(-1)" :class="viewType == 2 ? 'gy-button-normal':'gy-button-extra'">{{viewType==1?'返回':'取消'}}</div>
                </div>
          </div>
      </div>
        <el-dialog width="900px"
                   :visible.sync="dialogVisible" :title="dialogTitle" class="gy-dialog-title">
            <div v-show="currentTabIndex===0" class="add-dialog gy-form" style="overflow: hidden">
                <div class="gy-form-group">
                    <span :class="{'is-required':viewType==2}" class="l">姓名</span>
                    <span v-if="viewType ==1">{{preInfo.contactName||'-'}}</span>
                    <input v-else type="text" placeholder="请填写" class="gy-input"  v-model="preInfo.contactName">
                </div>
                <!-- <div class="gy-form-group">
                    <span class="l">公司</span>
                    <span>{{companyName}}</span>
                </div> -->
                <div class="gy-form-group ">
                    <span  :class="{'is-required':viewType===2}"  class="l">部门</span>
                    <span v-if="viewType ===1">{{preInfo.dept||'-'}}</span>
                    <input v-else  type="text" placeholder="请填写" class="gy-input"  v-model="preInfo.dept">
                </div>
                <div class="gy-form-group">
                    <span :class="{'is-required':viewType===2}" class="l">职务</span>
                    <span v-if="viewType ===1">{{preInfo.title||'-'}}</span>
                    <input  v-else type="text" placeholder="请填写" class="gy-input"  v-model="preInfo.title">
                </div>
                <div class="gy-form-group">
                    <span :class="{'is-required':viewType===2}" class="l">移动电话</span>
                    <span v-if="viewType ===1">{{preInfo.mobile||'-'}}</span>
                    <input v-else type="text" placeholder="请填写" class="gy-input"  v-model="preInfo.mobile">
                </div>
                 <div class="gy-form-group">
                    <span class="l">办公电话</span>
                    <span v-if="viewType ===1">{{preInfo.phone||'-'}}</span>
                    <input v-else type="text" placeholder="请填写" class="gy-input"  v-model="preInfo.phone">
                </div>
                 <div class="gy-form-group">
                    <span class="l">邮箱</span>
                    <span v-if="viewType === 1">{{preInfo.email||'-'}}</span>
                    <input v-else type="text" placeholder="请填写" class="gy-input"  v-model="preInfo.email">
                </div>
                <div class="gy-form-group">
                    <span class="l">设为联系人</span>
                    <el-switch
                     :disabled="viewType==1"
                    v-model="preInfo.defaultContact">
                    </el-switch>
                </div>
                 <div class="gy-form-group single-row">
                    <span class="l">备注</span>
                    <span v-if="viewType === 1">{{preInfo.remark||'-'}}</span>
                    <textarea v-else  class="gy-textarea" v-model="preInfo.remark" cols="30" rows="10" placeholder="请填写"></textarea>
                </div>
                 <div v-if="viewType===2" class="submit-con" style="margin-right:30px;">
                    <div  @click='saveContactData' class="gy-button-extra">保存</div>
                    <!-- <div @click='cancelAdd' class="gy-button-normal">{{viewType==1?'关闭':'取消'}}</div> -->
                </div>
            </div>
                <div v-show="currentTabIndex===1" class="add-dialog" style="overflow: hidden">
                    <div class="gy-form-group">
                        <span class="l">客户经理</span>
                        <span>{{trackData.customerManagers |filterData}}</span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">客户名称</span>
                        <span>{{trackData.customerName||'-'}}</span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">跟进状态</span>
                        <span>{{trackData.trackStatusDictName||'-'}}</span>
                    </div>
                     <div class="gy-form-group">
                        <span class="l">联系人</span>
                        <span>{{trackData.contactUserName||'-'}}</span>
                    </div>
                     <div class="gy-form-group">
                        <span class="l">联系电话</span>
                        <span>{{trackData.contactUserMobile||'-'}}</span>
                    </div>
                     <div class="gy-form-group">
                        <span class="l">跟进时间</span>
                        <span>{{trackData.trackDate|date('h')}}</span>
                    </div>
                     <div class="gy-form-group single-row clearfix">
                        <span class="l">跟进人</span>
                        <span>{{trackData.trackUserName||'-'}}</span>
                    </div>
                     <div class="gy-form-group single-row clearfix">
                        <span class="l">跟进记录</span>
                        <span>{{trackData.content||'-'}}</span>
                    </div>
                    <!-- <div class="submit-con">
                        <div @click='cancelAdd' class="gy-button-normal">{{viewType==1?'确定':'取消'}}</div>
                    </div> -->
                </div>
        </el-dialog>
  </div>
</template>
<script>
export default {
    data () {
        return {
            viewType: Number(this.$route.query.viewType), // 1 查看 2 编辑
            formData: {
                address: '', // 地址
                annualAmount: '', // 年营业额
                annualTurnover: '', // 年交易量
                annualYield: '', // 年产量
                areaId: '', // 所属区县
                certificateFileUrl: '',
                cityId: '', // 城市
                provinceId: '', // 所属省份
                customerAttrDictId: '', // 企业属性
                industrialChainsStatus: '', // 产业链状态
                industrialChainsArea: '', // 产业链分布
                customerContacts: [
                    {
                        contactName: '',
                        dept: '',
                        email: '',
                        mobile: '',
                        phone: '',
                        remark: '',
                        title: '',
                        defaultContact: ''
                    }
                ],
                customerFollowups: [
                    {
                        followUserId: '',
                        followUserName: ''
                    }
                ],
                customerName: '', // 客户名称
                customerScaleDictId: '', // 企业规模
                customerSourceDictId: '', // 来源
                customerStatus: '',
                customerTypeDictId: '', // 企业类型
                enName: '',
                fax: '',
                material: '', // 原料
                personScale: '', //  人员规模
                phone: '',
                products: '', // 主营产品
                registeredCapital: '', //  注册资金
                registrationDate: '', //  注册日期
                remark: '', // 备注
                socialCode: '',
                website: ''
            },
            clientManagers: [{dictId: 0, dictName: '潜在客户'}, {dictId: 1, dictName: '客户'}], // 客户经理
            personScaleArr: [], // 人员规模
            customerType: [], // 企业类型
            customerAttr: [], // 企业属性
            customerScale: [], // 企业规模
            addressData: {
                province: [],
                city: [],
                area: []
            },
            customerSource: [], // 来源
            preInfo: {
                contactName: '',
                dept: '',
                email: '',
                mobile: '',
                phone: '',
                remark: '',
                title: '',
                defaultContact: '',
                customerId: this.$route.query.id
            },
            dialogVisible: false,
            dialogTitle: '新增客户内部员工',
            currentIndex: 0,
            uploadFileUrl: this.$http.defaults.baseURL + this.$api.client.uploadFile,
            isReupload: true,
            authStatus: ['未认证', '待审核', '已通过', '已驳回'],
            managerArr: [],
            currentTabIndex: 0,
            trackData: [],
            imgList: [],
            showImgUrl: '',
            companyName: JSON.parse(localStorage.getItem('userInfo')).companyName,
            customerId: this.$route.query.id,
            pickerOptions0: {
                disabledDate (time) {
                    return time.getTime() > Date.now();
                }
            }
        };
    },
    methods: {
        init () {
            this.getPersonScale();
            this.getCompanyType();
            this.getCompanyAttr();
            this.getCustomerScale();
            this.getCustomerSource();
            this.searchArea(1, 0);
            this.formData.provinceId && this.searchArea(2, this.formData.provinceId);
            this.formData.cityId && this.searchArea(3, this.formData.cityId);
        },
        getFormData () {
            this.$http.get(this.$api.client.searchCustomers + this.customerId).then((res) => {
                if (res.data.code === 0) {
                    this.formData = res.data.data;
                    // this.formData.personScale = 0;
                    this.formData.personScale = Number(this.formData.personScale) === 0 ? '' : Number(this.formData.personScale);
                    this.formData.certificateFileUrl && (this.imgList = JSON.parse(this.formData.certificateFileUrl));
                    this.init();
                    if (this.formData.customerFollowups.length > 0) {
                        this.formData.customerFollowups.forEach(element => {
                            this.managerArr.push(element.followUserName);
                        });
                    }
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        getCompanyType () {
            this.$http.get(this.$api.client.companyType).then((res) => {
                if (res.data.code === 0) {
                    this.customerType = res.data.data;
                    this.viewType === 1 && this.filterData(this.formData.customerTypeDictId, 'customerTypeDictId', this.customerType);
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        getCompanyAttr () {
            this.$http.get(this.$api.client.companyAttr).then((res) => {
                if (res.data.code === 0) {
                    this.customerAttr = res.data.data;
                    this.viewType === 1 && this.filterData(this.formData.customerAttrDictId, 'customerAttrDictId', res.data.data);
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        getCustomerScale () {
            this.$http.get(this.$api.client.customerScale).then((res) => {
                if (res.data.code === 0) {
                    this.customerScale = res.data.data;
                    this.viewType === 1 && this.filterData(this.formData.customerScaleDictId, 'customerScaleDictId', res.data.data);
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        getPersonScale () {
            this.$http.get(this.$api.client.personScale).then((res) => {
                if (res.data.code === 0) {
                    this.personScaleArr = res.data.data;
                    this.viewType === 1 && this.filterData(this.formData.personScale, 'personScale', res.data.data);
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        getCustomerSource () {
            this.$http.get(this.$api.client.customerSource).then((res) => {
                if (res.data.code === 0) {
                    this.customerSource = res.data.data;
                    this.viewType === 1 && this.filterData(this.formData.customerSourceDictId, 'customerSourceDictId', res.data.data);
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        filterData (value, name, obj) {
            obj.forEach(element => {
                if (element.dictId === value) {
                    this.formData[name] = element.dictName;
                }
            });
        },
        dataToFixed (value, n) {
            this.formData[value] = this.formData[value].toFixed(n);
        },
        searchArea (type, id, bool) {
            this.$http.get(this.$api.client.searchArea + id).then((res) => {
                if (res.data.code === 0) {
                    if (type === 1) {
                        this.addressData.province = res.data.data;
                        if (bool) {
                            this.formData.cityId = '';
                            this.formData.areaId = '';
                        }
                    } else if (type === 2) {
                        this.addressData.city = res.data.data;
                        if (bool) {
                            this.formData.cityId = '';
                            this.formData.areaId = '';
                        }
                    } else if (type === 3) {
                        if (bool) {
                            this.formData.areaId = '';
                        }
                        this.addressData.area = res.data.data;
                    }
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        addContact () {
            this.dialogTitle = '新增客户内部员工';
            this.dialogVisible = true;
            this.preInfo = {
                contactName: '',
                dept: '',
                email: '',
                mobile: '',
                phone: '',
                remark: '',
                title: '',
                defaultContact: false,
                customerId: this.customerId
            };
            this.currentIndex = this.formData.customerContacts.length;
        },
        editcontact (index) {
            this.dialogTitle = this.viewType === 1 ? '查看客户内部员工' : '编辑客户内部员工';
            this.dialogVisible = true;
            this.currentIndex = index;
            this.preInfo = Object.assign({}, this.formData.customerContacts.slice(index, index + 1)[0]);
            if (this.preInfo.defaultContact) {
                this.preInfo.defaultContact = true;
                return;
            }
            this.preInfo.defaultContact = false;
        },
        deleteContact (id, index) {
            this.$confirm('确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                confirmButtonClass: 'gy-button-extra',
                cancelButtonText: '取消',
                cancelButtonClass: 'gy-button-normal',
                type: 'warning'
            })
                .then(() => {
                    this.$http.delete(this.$api.client.deleteContact + id)
                        .then((res) => {
                            if (res.data.code === 0) {
                                this.formData.customerContacts.splice(index, 1);
                            } else {
                                this.$message(res.data.message);
                            }
                        });
                });
        },
        saveContactData () {
            if (!this.checkDialogData()) {
                return false;
            }
            this.preInfo.defaultContact = this.preInfo.defaultContact ? 1 : 0;
            if (this.currentIndex === this.formData.customerContacts.length) {
                this.$http.post(this.$api.client.addContact, this.preInfo)
                    .then((res) => {
                        if (res.data.code === 0) {
                            this.getContactData();
                        } else {
                            this.$message(res.data.message);
                        }
                    });
            } else {
                this.$http.put(this.$api.client.editorContact, this.preInfo)
                    .then((res) => {
                        if (res.data.code === 0) {
                            this.getContactData();
                        } else {
                            this.$message(res.data.message);
                        }
                    });
            }
            this.dialogVisible = false;
        },
        getContactData () {
            this.$http.get(this.$api.client.getContact + this.customerId)
                .then((res) => {
                    this.formData.customerContacts = res.data.data;
                });
        },
        cancelAdd () {
            this.dialogVisible = false;
        },
        lookTrackData (item) {
            this.dialogVisible = true;
            this.trackData = item;
            this.dialogTitle = '查看跟进信息';
        },
        uploadImg (file) {
            let that = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            that.$http.post(that.$api.client.uploadFile, formData, headers)
                .then(function (res) {
                    that.imgList.push({url: res.data.data});
                    that.isReupload = true;
                });
        },
        deleteAvatar (file, fileList) {
            this.imgList = this.filterImg(this.imgList, file.url);
        },
        handleAvatarSuccess (res, file, fileList) {
            this.imgList.push({url: res});
        },
        showImg (file) {
            this.showImgUrl = file.url;
        },
        filterImg (arr, url) {
            let data = [];
            arr.forEach(e => {
                if (e.url !== url) {
                    data.push(e);
                }
            });
            return data;
        },
        checkFormData () {
            let flag = true;
            let data = [
                {value: this.formData.customerName, msg: '客户名称不能为空'},
                {value: this.formData.customerStatus, msg: '客户状态不能为空'},
                {value: this.formData.customerTypeDictId, msg: '企业类型不能为空'},
                {value: this.formData.customerAttrDictId, msg: '企业属性不能为空'},
                {value: this.formData.personScale, msg: '人员规模不能为空'},
                {value: this.formData.provinceId, msg: '省市不能为空'},
                {value: this.formData.cityId, msg: '城市不能为空'},
                {value: this.formData.areaId, msg: '区不能为空'},
                {value: this.formData.address, msg: '联系地址不能为空'},
                {value: this.formData.products, msg: '主营产品不能为空'},
                {value: this.formData.customerSourceDictId, msg: '来源不能为空'},
                {value: this.formData.registrationDate, msg: '成立日期不能为空'}
            ];
            for (let i = 0; i < data.length; i++) {
                if (!data[i].value && data[i].value !== 0) {
                    this.$message({message: data[i].msg, type: 'error'});
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        checkDialogData () {
            let flag = true;
            let data = [
                {value: this.preInfo.contactName, msg: '姓名不能为空'},
                {value: this.preInfo.dept, msg: '部门不能为空'},
                {value: this.preInfo.title, msg: '职务不能为空'},
                {value: this.preInfo.mobile, msg: '移动电话不能为空'}
            ];
            for (let i = 0; i < data.length; i++) {
                if (!data[i].value && data[i].value !== 0) {
                    this.$message({message: data[i].msg, type: 'error'});
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        sendFormData () {
            if (!this.checkFormData()) {
                return false;
            }
            this.imgList.length !== 0 && (this.formData.certificateFileUrl = JSON.stringify(this.imgList));
            if (this.viewType === 2) {
                this.$http.put(this.$api.client.updateCustomers, this.formData).then((res) => {
                    if (res.data.code === 0) {
                        this.$router.go(-1);
                    } else {
                        this.$message(res.data.message);
                    }
                });
            }
        }

    },
    watch: {
        dialogVisible (newValue, oldValue) {
            if (!newValue) {
                this.currentIndex = 0;
            }
        }
        // preInfo: {
        //     handler: function () {
        //         var _this = this;
        //         var _sum = 40;
        //         _this.$refs.count.setAttribute('maxlength', _sum);
        //     },
        //     deep: true
        // }
    },
    filters: {
        filterData (value) {
            let data = [];
            if (value && value.length > 0) {
                value.forEach(element => {
                    data.push(element.userName);
                });
                return data.join(',');
            }
            return '-';
        }
    },
    created () {
        this.getFormData();
    }
};

</script>
<style scoped lang="scss">
  .my-container {
       .model_title i{
          vertical-align: baseline;
       }
       .customer-title {
        padding: 3px 15px;
        font-size: 16px;
        color: #333333;
        font-weight: bold;
        border-bottom: 1px solid #E7ECF1;
      }
      .contact-con  {
          margin-top:20px ;
          padding-right:30px ;
          padding-left:15px ;
          display: inline-block;
          width: 100%;
          div {
              display: inline-block;
          }
          .add-margin {
              margin-left: 12px;
          }
          .contact-tab {
              padding: 5px 15px;
              cursor: pointer;
          }
          .current-tab {
              border: 1px solid #f2f2f2;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
          }
          .add-contact {
              float: right;
          }
          .nowrap {
            width: 200px;
            display: block;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
         }
      }
       .null-td {
        text-align: center;
      }
       .is-required::before {
            content: "*";
            color: #e0370f;
            font-size: 12px;
            font-weight: 400;
            position: absolute;
            left: 6px;
            top: 0;
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
      .clearfix {
          content: "";
          display: block;
          clear: both;
      }
      .contact-address  .el-select {
          width: 32%;
      }
      .papers {
          div {
                height: 60px;
                width: 60px;
                display: inline-block;
                margin-left: 10px ;
                cursor: pointer;
          }
          img {
              width: 100%;
              height: 100%;
              line-height: 60px;
              border: 1px solid #e6eaea;
              background-color: #fff;
              border-radius: 0;
          }
      }
      .submit-con {
          float: right;
          margin-top:50px ;
          div:nth-child(1) {
              margin-right:10px ;
          }
          .form_save {
              background-color: #d04627;
              color: #fff;
              margin-right:10px ;
        }
      }
      input::-webkit-input-placeholder {
        color: #999;
        font-size: 14px;
      }
      .three-column {
         width: 93%;
      }
      .l {
          width: 105px;
      }
  }
</style>
<style lang="scss">
.gy-dialog-title .el-dialog__header {
    border-bottom: 1px solid #DCE0E4!important;
    padding: 15px!important;
}
.my-container .el-dialog__body {
    padding: 0;
}
.my-container .container-fluid .el-input__inner {
    font-size: 14px;
}
 .el-message-box__wrapper .el-button--primary{
     background-color: #d04627;
     color: #fff;
     border:none;
}
</style>
