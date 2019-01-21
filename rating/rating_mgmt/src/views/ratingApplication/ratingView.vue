<!-- 申请评级展示页 -->
<template>
   <div class="application">
      <!-- 基础信息 -->
        <div  v-if="applicationCompanyName" class="clearfix">
            <h3 class="apply_comp">
                <span class="a">申报公司:</span>
                <span class="company_name">{{applicationCompanyName}}</span>
            </h3>
         </div>
      <!-- <h3 class="historyTitle" v-if="applicationCompanyName">历史申报({{applicationCompanyName}})</h3> -->
      <div  class="clearfix" style="padding-top:13px">
         <h3><i class="el-icon-tickets"></i> 基础信息</h3>
         <div class="clearfix">
            <div class="gy-form-group">
                <span class="l">被评级公司:</span>
                <span>{{viewData.name|dataFormat}}</span>
            </div>
            <div  v-if="viewData.applyType!==0" class="company_type divPadding gy-form-group">
                <span class="l">公司类型:</span>
                <span>{{viewData.declareParentId|dataFormat}},{{viewData.declareChildIdList|dataFormat}}</span>
            </div>
        </div>
            <div class="gy-form-group">
                <span class="l">办公地址:</span>
                <span >{{viewData.companyAddress|dataFormat}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">统一社会信用代码:</span>
                <span>{{viewData.socialCode|dataFormat}}</span>
            </div>
      </div>
        <!-- 联系人列表 -->
        <div  class="clearfix" style="padding-top:13px">
           <h3><i class="el-icon-tickets"></i> 联系人信息</h3>
             <div class=" clearfix" v-for="(item, index) in viewData.companyContactModelList" :key="index+300">
                 <div class="gy-form-group">
                        <span class="l">联系人{{index+1}}:</span>
                        <span>{{item.name|dataFormat}}</span>
                </div>
                <div class="contact_address divPadding gy-form-group">
                    <span class="l">联系地址:</span>
                     <span>{{item.contactAddress|dataFormat}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">联系电话:</span>
                     <span>{{item.phone|dataFormat}}</span>
                </div>
                <div class="gy-form-group ">
                    <span class="l">职务:</span>
                     <span>{{item.position|dataFormat}}</span>
                </div>
                <div class="gy-form-group ">
                    <span class="l">证件号码:</span>
                     <span>{{item.identityCardNumber|dataFormat}}</span>
                </div>
           </div>
        </div>
        <!-- 银行信息 -->
        <div class="clearfix" style="padding-top:13px">
            <h3><i class="el-icon-tickets"></i> 银行信息</h3>
           <div class="clearfix" v-for="(item, index) in viewData.companyBankInfoModelList" :key="index+800">
                <div class="gy-form-group">
                        <span class="l">开户行:</span>
                        <span>{{item.openBank|dataFormat}}</span>
                </div>
                <div class="company_type divPadding gy-form-group">
                    <span class="l">账号:</span>
                    <span>{{item.account|dataFormat}}</span>
                </div>
            </div>
        </div>
       <!-- 税务信息 -->
        <div class="clearfix" style="padding-top:13px">
            <h3><i class="el-icon-tickets"></i> 相关人身份信息</h3>
            <div class="clearfix">
            <div class="gy-form-group">
                <span class="l">法定代表人:</span>
                <span>{{viewData.legalPerson|dataFormat}}</span>
            </div>
             <div class="gy-form-group">
                <span class="l">证件号码:</span>
                <span>{{viewData.legalPersonCertificateNumber|dataFormat}}</span>
            </div>
             <div class="gy-form-group my_uploader_con">
                <span class="l">身份证件:</span>
                <span  v-if="legalPersonImg.length === 0">-</span>
                 <div v-else  v-for="item in legalPersonImg" :key="item.id" class="avatar-upload-div ">
                    <img  @click="showImg(item.filePath)" :src="item.filePath" alt="">
                </div>
            </div>
             <div class="gy-form-group my_uploader_con">
                <span class="l">名片:</span>
                <span  v-if="legalCard.length === 0">-</span>
               <div v-else  v-for="item in legalCard" :key="item.id" class="avatar-upload-div ">
                    <img  @click="showImg(item.filePath)" :src="item.filePath" alt="">
                </div>
            </div>
         </div>
        <div class="clearfix">
            <div class="gy-form-group">
                <span class="l">联系人:</span>
                <span>{{viewData.contactName|dataFormat}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">证件号码:</span>
                <span>{{viewData.contactCertificateNumber|dataFormat}}</span>
            </div>
            <div class="gy-form-group my_uploader_con">
                <span class="l">身份证件:</span>
                <span  v-if="contactImg.length === 0">-</span>
               <div v-else  v-for="item in contactImg" :key="item.id" class="avatar-upload-div ">
                    <img  @click="showImg(item.filePath)" :src="item.filePath" alt="">
                </div>
            </div>
            <div class="gy-form-group my_uploader_con">
                <span class="l">名片:</span>
                <span  v-if="contactCard.length === 0">-</span>
                 <div v-else  v-for="item in contactCard" :key="item.id" class="avatar-upload-div ">
                    <img  @click="showImg(item.filePath)" :src="item.filePath" alt="">
                </div>
            </div>
        </div>
        </div>
        <div @click="showImgUrl=''" v-if="showImgUrl" class="showAvatar">
            <img :src="showImgUrl" alt="">
        </div>

         <div class="clearfix" style="padding-top:13px">
              <h3><i class="el-icon-tickets"></i> 产品信息</h3>
              <div class="gy-form-group">
                    <span class="l">企业类型</span>
                    <span>{{enterpriseParent?enterpriseParent + ',' + enterpriseChild:'暂无数据'}}</span>
              </div>
               <table v-if="viewData.enterpriseParentId==10" class="gy-table product_list" style="margin-left:20px">
                <thead>
                <tr>
                    <td>品类</td>
                    <td>产品</td>
                    <td>年用量(吨)</td>
                    <td>生产量(吨)</td>
                    <td>备注</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in viewData.companyProductInfoModelList" :key="index+50">
                    <td>{{item.category|dataFormat}}</td>
                    <td>{{item.products|dataFormat}}</td>
                    <td>{{item.annualConsumption|dataFormat}}</td>
                    <td>{{item.productionOutput|dataFormat}}</td>
                    <td>{{item.remark|dataFormat}}</td>
                    </tr>
                </tbody>
            </table>

            <table v-if="viewData.enterpriseParentId==12" class="gy-table product_list" style="margin-left:20px">
                <thead>
                <tr>
                    <td>主营品类</td>
                    <td>主营产品</td>
                    <td>年交易量(吨)</td>
                    <td>备注</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in viewData.companyProductInfoModelList" :key="index+500">
                    <td>{{item.mainCategory|dataFormat}}</td>
                    <td>{{item.mainProducts|dataFormat}}</td>
                    <td>{{item.annualTradingVolume|dataFormat}}</td>
                    <td>{{item.remark|dataFormat}}</td>
                </tr>
                </tbody>
            </table>
        </div>
         <!-- 证件信息 -->
        <div class="clearfix" style="padding-top:13px">
            <h3><i class="el-icon-tickets"></i> 证件信息</h3>
             <div class="img_show_div"  v-for="(item,index) in  viewData.companyFileModelList" v-if="item.rskDeclareCompanyFileTypeId>4" :key="index+1000">
                <div class="img_file_con">
                    <span class="img_file_name">{{item.fileName|dataFormat}}</span>
                    <div  class="file_img_list" >
                        <div  v-for="(n, i) in item.filePathList" :key="i + 900" @click="showImg(n)"><img  :src="n" alt=""></div>
                    </div>
                </div>
                 <div class="file_info  clearfix">
                 <div class="gy-form-group"  v-for="(subItem, subIndex) in item.fileParamValueModelList" :key="subIndex+100"  >
                        <span class="l">{{subItem.paramName}}</span>
                        <span>{{subItem.paramValue|dataFormat}}</span>
                </div>
             </div>
            </div>
            <div v-if="viewData.companyFileModelList.length <= 0">暂无数据</div>
        </div>
          <!-- 经营资质 -->
        <div class="clearfix" style="padding-top:13px">
            <h3><i class="el-icon-tickets"></i> 经营资质</h3>
              <div class="gy-form-group ">
                    <span class="l">装备设施:</span>
                    <span>{{viewData.devices|dataFormat}}</span>
              </div>
        </div>
        <div v-if="viewData.remark" class="remark_con">
                <span>{{viewData.remark|dataFormat}}</span>
         </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            viewData: {
                companyFileModelList: []
            },
            legalPersonImg: [], // 法定代表人身份证
            contactImg: [], // 联系人身份证
            legalCard: [], // 法定代表人名片
            contactCard: [], // 联系人名片
            showImgUrl: '', // 显示隐藏图片
            priseType: '', // 企业类型
            enterpriseParent: '',
            enterpriseChild: '',
            currentCompanyId: this.$route.query.ratingCompanyId,
            historyCompanyInfo: this.$route.query.historyCompanyInfo,
            applicationCompanyName: this.$route.query.applicationCompanyName
        };
    },
    methods: {
        init () {
            this.getRatingType();
            this.getPriseType();
            this.getDevices();
            this.getImgUrl(this.viewData.companyFileModelList);
            if (this.applicationCompanyName) {
                this.$store.commit('setTitle', '申报详情');
            }
        },
        getViewData () {
            let that = this;
            let httpApi = '';
            if (this.historyCompanyInfo) {
                httpApi = this.$api.ratingApplication.getHistoryRatingFormData + this.historyCompanyInfo;
            } else {
                httpApi = this.$api.ratingApplication.getRatingFormDataMgmt + this.currentCompanyId;
            }
            this.$http.get(httpApi).then((res) => {
                if (res.data.code === 0) {
                    that.viewData = res.data.data;
                    this.init();
                }
            });
        },
        // getContactAreasList (id) { // 获取联系人地理位置
        //     // let that = this;
        //     this.$http.get(this.$api.ratingApplication.areasList + id).then((res) => {
        //         // let data = res.data.data;
        //         console.log(res);
        //     });
        // },
        getRatingType () { // 获取公司类型列表
            this.$http.get(this.$api.ratingApplication.declareInfo).then((res) => {
                if (res.data.code === 0) {
                    let data = res.data.data;
                    let subData = [];
                    data.forEach(element => {
                        if (element.id === this.viewData.declareParentId) {
                            this.viewData.declareParentId = element.declarationName;
                            subData = element.declareList;
                        }
                    });
                    let str = '';
                    subData.forEach((element, index) => {
                        if (this.viewData.declareChildIdList.indexOf(element.id) >= 0) {
                            if (index < subData.length - 1) {
                                str += element.declarationName + ',';
                            } else {
                                str += element.declarationName;
                            }
                        }
                    });
                    this.viewData.declareChildIdList = str;
                }
            });
        },
        getImgUrl (data) {
            data.forEach(element => {
                if (element.rskDeclareCompanyFileTypeId === 1) {
                    this.legalPersonImg.push(element);
                } else if (element.rskDeclareCompanyFileTypeId === 2) {
                    this.contactImg.push(element);
                } else if (element.rskDeclareCompanyFileTypeId === 3) {
                    this.legalCard.push(element);
                } else if (element.rskDeclareCompanyFileTypeId === 4) {
                    this.contactCard.push(element);
                }
            });
        },
        showImg (url) {
            this.showImgUrl = url;
        },
        getPriseType () { // 获取企业类型
            let that = this;
            this.$http.get(this.$api.ratingApplication.enterpriseTypeList).then((res) => {
                if (res.data.code === 0) {
                    let data = res.data.data;
                    that.priseType = data;
                    let subData = [];
                    that.priseType.forEach(element => {
                        if (element.id === that.viewData.enterpriseParentId) {
                            that.enterpriseParent = element.declarationName;
                            subData = element.declareList;
                        }
                    });
                    subData.forEach(element => {
                        if (element.id === that.viewData.enterpriseChildId) {
                            that.enterpriseChild = element.declarationName;
                        }
                    });
                    if (!that.enterpriseParent) {
                        that.enterpriseParent = '-';
                    }
                    if (!that.enterpriseChild) {
                        that.enterpriseChild = '-';
                    }
                }
            });
        },
        getDevices () { // 获取装备信息
            if (this.viewData.devices.length === 0) {
                return false;
            }
            let data = this.viewData.devices.split(',');
            let deviceArr = ['自有建设用地及厂房装置', '租用厂房装置设备', '租用办公地址', '其他（请给予描述）'];
            let str = '';
            data.forEach((element, index) => {
                if (index === data.length - 1) {
                    str += deviceArr[Number(element)];
                } else {
                    str += deviceArr[Number(element)] + ',';
                }
            });
            this.viewData.devices = str;
        }
    },
    created () {
        // this.getContactAreasList(320311);
        this.getViewData();
    },
    watch: {
        historyCompanyInfo () {
            this.getViewData();
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
    h3{margin:0 0 4px;font-size: 16px}
  .application {
      min-width: 800px;
      padding-bottom: 100px ;
      .historyTitle {
          text-align: center;
      }
      .apply_comp {
          margin-left:20px ;
          .company_name {
              font-size: 14px;
              margin-left:15px ;
          }
      }
  }
  .uploadImg ,.el-icon-picture{
    color:#7dafeb;
    cursor: pointer;
 }
 .upload_div {
     width: 60px;
     height: 90px;
     display: inline-block;
     vertical-align: middle;
    .add_file {
     display: inline-block;
     width: 60px;
     height: 60px;
     text-align: center;
     border:1px solid #E7ECF1;
     position: relative;
     i {
      height: 60px;
      line-height: 60px;
      font-size: 26px;
      color: #ccc;
     }
     .upload_select {
       width: 60px;
       display: inline-block;
     }
    }
    img {
         width: 60px;
         max-height: 60px;
         border:1px solid #E7ECF1;
         position: absolute;
         top:50%;
         left: 50%;
         transform: translate(-50%,-50%);
    }
    span {
        display: inline-block;
        line-height: 20px;
        text-align: center;
        width: 100%;
    }
    &:nth-child(n+2) {
        margin-left: 15px;
    }
 }
 .remark_con {
    width: 70%;
    border:1px solid #E7ECF1;
    text-align: left;
    padding: 10px 5px;
    color: #999;
     margin-left:20px;
    white-space:pre-wrap;
 }
 .avatar-upload-div {
     position: relative;
     display: inline-block;
     width: 50px;
     height: 50px;
     margin-left:10px ;
     margin-top:10px ;
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
     }
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
 .img_show_div {
     position: relative;
     top: 0;
     left: 10px;
     cursor: pointer;
     .img_file_con {
         position: relative;
         .img_file_name {
            line-height: 20px;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
             word-wrap:break-word;
            -webkit-line-clamp:3;           //设置行数，2行显示
            display: -webkit-box;           //盒子模型
            -webkit-box-orient:vertical;    //元素的排列方式，垂直居中
            overflow:hidden;                //隐藏溢出内容
            text-overflow: ellipsis;
            max-width: 90px;
        }
         .file_img_list {
            display: inline-block;
            max-width: 800px;
            margin-left: 115px;
            div {
            width: 60px;
            height: 60px;
            margin-left:10px ;
            display: inline-block;
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
    .file_info {
      margin-top:15px ;

    }

    .l {
       width: 128px;
    }
    .gy-form-group {
        width: 50%;
        float: left;
        position: relative;
        padding: 0px 40px 10px 128px;
        color: #999;
        word-wrap: break-word;
        word-break: break-all;
    }
 }
 /** .my_uploader_con {
        position: relative;
        span {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
    }**/

</style>
