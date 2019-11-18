<template>
  <div class="transportDetail">
    <div class="gy-h4">驾驶员/押运员管理</div>
    <div class="title"><i class="iconfont icon-qiye"></i>所属公司</div>
    <div class="gy-form">
      <div class="gy-form-group">
        <div class="l"><strong>*</strong>承运商</div>
        <label>
          <input @click="blur11" placeholder="请选择" type="text" class="gy-input" v-model="companyNamenew" @keyup.enter="onelist1click">
        </label>
        <ul class="listul" v-show="onelist1Show">
          <li v-for="(item,index) in onelist1" :key="index" @click="onelist1select(item)" v-if="onelist1.length>0">
            {{item.companyName}}
          </li>
          <li class="none-tips" v-if="onelist1.length === 0">没有搜到相关公司</li>
        </ul>
        <div class="form-mySearch">
          <i class="iconfont icon-mySearch" @click="onelist1click"></i>
        </div>
      </div>
    </div>
    <div class="title title-padding"><i class="iconfont icon-icon_shenqing"></i>基础信息</div>
    <div class="gy-form">
      <div class="gy-form-group">
        <span class="l"><strong>*</strong>姓名</span>
        <input type="text" v-model="datas.username" placeholder="请输入">
      </div>
      <div class="gy-form-group height-new">
        <span class="l"><strong>*</strong>性别</span>
        <el-radio v-model="datas.sex" :label="1">男</el-radio>
        <el-radio v-model="datas.sex" :label="0">女</el-radio>
      </div>
      <div class="gy-form-group">
        <span class="l"><strong>*</strong>身份证号码</span>
        <input type="text" v-model="datas.identityCode" placeholder="请输入" @blur="getBirthday">
      </div>
      <div class="gy-form-group">
        <span class="l"><strong>*</strong>手机号码</span>
        <input type="text" v-model="datas.phone" placeholder="请输入">
      </div>
      <div class="gy-form-group">
        <span class="l"><strong>*</strong>人员类型</span>
        <el-checkbox-group v-model="personnelType">
          <el-checkbox label="驾驶员"></el-checkbox>
          <el-checkbox label="押运员"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="gy-form-group">
        <span class="l">出生日期</span>
        <input type="text" v-model="datas.birthdayStr" placeholder="默认输入身份证号码时自动代入">
      </div>
    </div>
    <div class="title title-padding"><i class="iconfont icon-bangdingxindetixianzhanghao"></i>证照信息</div>
    <div class="gy-form">
      <div class="gy-form-group form-padding">
        <span class="l"><strong>*</strong>身份证正面</span>
        <div class="form-img">
          <div class="img-box" @click="handleDialogImg($event)">
            <img src="../../../assets/images/vehiclepic/identityFront.png" alt="">
          </div>
          <p class="img-title">图例</p>
        </div>
        <gy-upload
                :url="imgApi"
                v-model="imgList.identityFrontPath.list"
                :upload-data="{filetype: imgList.identityFrontPath.type}"
                :limit="1">
        </gy-upload>
      </div>
      <div class="gy-form-group form-padding">
        <span class="l"><strong>*</strong>身份证背面</span>
        <div class="form-img">
          <div class="img-box" @click="handleDialogImg($event)">
            <img src="../../../assets/images/vehiclepic/identityOpposite.png" alt="">
          </div>
          <p class="img-title">图例</p>
        </div>
        <gy-upload
                :url="imgApi"
                v-model="imgList.identityOppositePath.list"
                :upload-data="{filetype: imgList.identityOppositePath.type}"
                :limit="1">
        </gy-upload>
      </div>
      <!-- 驾驶员 -->
      <div class="gy-form-group form-padding" v-if="datas.personnelType !== 2">
        <span class="l"><strong>*</strong>驾驶证主页</span>
        <div class="form-img">
          <div class="img-box" @click="handleDialogImg($event)">
            <img src="../../../assets/images/vehiclepic/drivingFront.png" alt="">
          </div>
          <p class="img-title">图例</p>
        </div>
        <gy-upload
                :url="imgApi"
                v-model="imgList.drivingCertificateFrontPath.list"
                :upload-data="{filetype: imgList.drivingCertificateFrontPath.type}"
                :limit="1">
        </gy-upload>
      </div>
      <div class="gy-form-group form-padding" v-if="datas.personnelType !== 2">
        <span class="l"><strong>*</strong>驾驶证副页</span>
        <div class="form-img">
          <div class="img-box" @click="handleDialogImg($event)">
            <img src="../../../assets/images/vehiclepic/drivingOpposite.png" alt="">
          </div>
          <p class="img-title">图例</p>
        </div>
        <gy-upload
                :url="imgApi"
                v-model="imgList.drivingCertificateOppositePath.list"
                :upload-data="{filetype: imgList.drivingCertificateOppositePath.type}"
                :limit="1">
        </gy-upload>
      </div>
      <div class="gy-form-group form-padding" v-if="datas.personnelType !== 2">
        <span class="l"><strong>*</strong>准驾车型</span>
        <el-select v-model="datas.vehicleModel" placeholder="请选择">
          <el-option
                  v-for="item in vehicleModel"
                  :key="item.id"
                  :label="item.value"
                  :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="gy-form-group form-padding" v-if="datas.personnelType !== 2">
        <span class="l"><strong>*</strong>驾驶证有效期</span>
        <el-col :span="2">至</el-col>
        <el-col :span="22">
          <el-date-picker
                  v-model="datas.drivingCertificateValidDate"
                  class="form-date"
                  type="date"
                  placeholder="选择日期">
          </el-date-picker>
        </el-col>
      </div>
      <div class="gy-form-group form-padding" v-if="datas.personnelType !== 2">
        <span class="l"><strong>*</strong>从业资格证 <br>（驾驶员）</span>
        <gy-upload
                :url="imgApi"
                v-model="imgList.qualificationCertificatePath.list"
                :upload-data="{filetype: imgList.qualificationCertificatePath.type}"
                :limit="1">
        </gy-upload>
      </div>
      <div class="gy-form-group" style="height:96px;" v-if="datas.personnelType !== 2">
        <span class="l">从业资格证编号 <br>（驾驶员）</span>
        <input type="text" v-model="datas.qualificationCode" placeholder="请输入">
      </div>
      <div class="gy-form-group" v-if="datas.personnelType !== 2">
        <span class="l"><strong>*</strong>从业资格证有效期</span>
        <el-col :span="2">至</el-col>
        <el-col :span="22">
          <el-date-picker
                  v-model="datas.validDate"
                  class="form-date"
                  type="date"
                  placeholder="选择日期">
          </el-date-picker>
        </el-col>
      </div>
      <div class="gy-form-group" style="height:50px;" v-if="datas.personnelType !== 2"></div>
      <!-- 押运员 -->
      <div class="gy-form-group" v-if="datas.personnelType !== 1">
        <span class="l"><strong>*</strong>从业资格证 <br>（押运员）</span>
        <gy-upload
                :url="imgApi"
                v-model="imgList.escortQualificationCertificatePath.list"
                :upload-data="{filetype: imgList.escortQualificationCertificatePath.type}"
                :limit="1">
        </gy-upload>
      </div>
      <div class="gy-form-group" style="height:96px;" v-if="datas.personnelType !== 1">
        <span class="l">从业资格证编号 <br>（押运员）</span>
        <input type="text" v-model="datas.escortQualificationCode" placeholder="请输入">
      </div>
      <div class="gy-form-group" v-if="datas.personnelType !== 1">
        <span class="l"><strong>*</strong>从业资格证有效期</span>
        <el-col :span="2">至</el-col>
        <el-col :span="22">
          <el-date-picker
                  v-model="datas.escortQualificationValidDate"
                  class="form-date"
                  type="date"
                  placeholder="选择日期">
          </el-date-picker>
        </el-col>
      </div>
    </div>
    <div class="gy-form-button">
      <button class="gy-button-extra" v-if="this.$route.query.id" @click="submit('put')">提交</button>
      <button class="gy-button-extra" v-if="!this.$route.query.id" @click="submit('post')">提交</button>
      <button class="gy-button-normal" @click="backToList">取消</button>
    </div>
    <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="visible" width="800">
      <div class="dialog-img">
        <img :src="dialogImg" alt="">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import gyUpload from '@/components/upload';
const imgMap = {
    identityFrontPath: 0, // 身份证正面
    identityOppositePath: 1, // 身份证背面
    drivingCertificateFrontPath: 2, // 驾驶证主页
    drivingCertificateOppositePath: 3, // 驾驶证副页
    qualificationCertificatePath: 4, // 从业资格证（驾驶员）
    escortQualificationCertificatePath: 5 // 从业资格证(押运员）
};
const getImgList = () => {
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
    components: {
        gyUpload
    },
    data () {
        return {
            visible: false,
            dialogImg: '',
            datas: {
                username: '', // 姓名
                sex: 1, // 性别
                identityCode: '', // 身份证号码
                phone: '', // 手机号码
                personnelType: 1, // 人员类型 0：全选；1：驾驶员；2：押运员
                birthdayStr: '', // 出生日期
                valid: 1, // 是否有效
                identityFrontPath: '', // 身份证正面照
                identityOppositePath: '', // 身份证背面照
                drivingCertificateFrontPath: '', // 驾驶证主页照
                drivingCertificateOppositePath: '', // 驾驶证副页照
                vehicleModel: '', // 准驾车型
                drivingCertificateValidDate: '', // 驾驶证有效期
                qualificationCertificatePath: '', // 驾驶员从业资格证书路径
                qualificationCode: '', // 驾驶员从业资格证书编号
                validDate: '', // 驾驶员从业资格证书有效时间
                escortQualificationCode: '', // 押运员从业资格证编号
                escortQualificationCertificatePath: '', // 押运员从业资格证路径
                escortQualificationValidDate: '', // 从业资格证书有效时间（押运人）
                companyId: ''
            },
            companyNamenew: null, // 承运商
            onelist1Show: false,
            onelist1: [],
            vehicleModel: [
                {
                    id: 0,
                    value: 'A1'
                },
                {
                    id: 1,
                    value: 'A2'
                },
                {
                    id: 2,
                    value: 'B1'
                },
                {
                    id: 3,
                    value: 'B2'
                },
                {
                    id: 4,
                    value: 'C1'
                }
            ],
            personnelType: ['驾驶员'],
            imgApi: this.$api.transport.upload,
            imgList: getImgList()
        };
    },
    watch: {
        'personnelType' (newValue, oldValue) {
            if (newValue.length === 2) {
                // 全选
                this.datas.personnelType = 0;
            } else if (newValue.length === 1) {
                // 选一个
                this.datas.personnelType = newValue[0] === '驾驶员' ? 1 : 2;
            } else {
                // 都没选
                this.datas.personnelType = '';
            }
        }
    },
    created () {
        this.$route.query.id && this.getData(); // 详情 初始化数据
    },
    methods: {
        // 初始化
        getData () {
            let id = this.$route.query.id;
            let List = {
                data: {
                    id: id
                },
                pageNum: 1,
                pageSize: 10
            };
            this.$http.post(this.$api.transport.transportUserList, List)
                .then(res => {
                    if (res.data.code === 0) {
                        this.datas = res.data.data.list[0];
                        // 承运商
                        this.companyNamenew = res.data.data.list[0].companyName;
                        // 人员类型
                        this.personnelType = this.datas.personnelType === 0 ? ['驾驶员', '押运员'] : this.datas.personnelType === 1 ? ['驾驶员'] : ['押运员'];
                        // 照片
                        for (const imgItem of Object.keys(this.imgList)) {
                            let url = this.datas[imgItem];
                            url && this.imgList[imgItem].list.push({url, filePath: url});
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
        },
        // 输入身份证自动带入出生日期
        getBirthday () {
            let numb = this.datas.identityCode;
            if (numb.length === 15 || numb.length === 18) {
                let left = numb.length - 12;
                let right = numb.length - 4;
                let Birthday = numb.slice(left, right);
                if (Birthday.length === 8) {
                    var reg = /(\d{4})(\d{2})(\d{2})/;
                    this.datas.birthdayStr = Birthday.replace(reg, '$1' + '-' + '$2' + '-' + '$3');
                } else this.datas.birthdayStr = '';
            } else this.datas.birthdayStr = '';
        },
        // 提交
        submit (type) {
            // 验证
            if (!this.check()) {
                return;
            }
            this.getDetail();
            this.$http[type](this.$api.transport.transportUser, this.datas)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                        this.backToList();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
        },
        check () {
            if (!this.datas.companyId) {
                this.$message.error('承运商不可为空');
                return false;
            }
            if (!this.datas.username) {
                this.$message.error('姓名不可为空');
                return false;
            }
            if (this.datas.sex === '' || this.datas.sex === null || this.datas.sex === 'undefined') {
                this.$message.error('请选择性别');
                return false;
            }
            if (!this.$tools.verifyIdCard(this.datas.identityCode)) {
                this.$message.error('请填写正确身份证号');
                return false;
            }
            if (!this.$tools.verifyMobile(this.datas.phone)) {
                this.$message.error('请填写正确手机号');
                return false;
            }
            if (this.datas.personnelType === '' || this.datas.personnelType === null || this.datas.personnelType === 'undefined') {
                this.$message.error('请选择人员类型');
                return false;
            }
            if (!this.imgList.identityFrontPath.list.length > 0) {
                this.$message.error('身份证正面照不可为空');
                return false;
            }
            if (!this.imgList.identityOppositePath.list.length > 0) {
                this.$message.error('身份证背面照不可为空');
                return false;
            }
            if (this.datas.personnelType !== 2 && !this.imgList.drivingCertificateFrontPath.list.length > 0) {
                this.$message.error('驾驶证主页不可为空');
                return false;
            }
            if (this.datas.personnelType !== 2 && !this.imgList.drivingCertificateOppositePath.list.length > 0) {
                this.$message.error('驾驶证副页不可为空');
                return false;
            }
            if (this.datas.personnelType !== 2 && !this.datas.vehicleModel) {
                this.$message.error('准驾车型不可为空');
                return false;
            }
            if (this.datas.personnelType !== 2 && !this.datas.drivingCertificateValidDate) {
                this.$message.error('驾驶证有效期不可为空');
                return false;
            }
            if (this.datas.personnelType !== 2 && !this.imgList.qualificationCertificatePath.list.length > 0) {
                this.$message.error('从业资格证（驾驶员）不可为空');
                return false;
            }
            if (this.datas.personnelType !== 2 && !this.datas.validDate) {
                this.$message.error('从业资格证有效期不可为空');
                return false;
            }
            if (this.datas.personnelType !== 1 && !this.imgList.escortQualificationCertificatePath.list.length > 0) {
                this.$message.error('从业资格证（押运员）不可为空');
                return false;
            }
            if (this.datas.personnelType !== 1 && !this.datas.escortQualificationValidDate) {
                this.$message.error('从业资格证有效期不可为空');
                return false;
            }
            return true;
        },
        // 返回值优化
        getDetail () {
            for (const imgItem of Object.keys(this.imgList)) {
                this.datas[imgItem] = this.imgList[imgItem].list.length > 0 ? this.imgList[imgItem].list[0].url : '';
            }
        },
        backToList () {
            this.$router.push({name: 'driverList'});
        },
        // 图片预览
        handleDialogImg (e) {
            this.dialogImg = e.target.src;
            this.visible = true;
        },
        // 搜索承运商
        onelist1click () {
            this.onelist1Show = true;
            this.$http.post(this.$api.orders.creatOrderCompanies2, {
                'companyTypeId': 2, // 1:交易公司  2：承运商
                'name': this.companyNamenew
            })
                .then((res) => {
                    this.onelist1 = res.data.data;
                }).catch(() => {
                    console.log('出错了');
                });
            this.datas.companyId = '';
        },
        onelist1select (item) {
            this.companyNamenew = item.companyName;
            this.datas.companyId = item.companyId;
            this.onelist1Show = false;
        },
        blur11 () {
            this.companyNamenew = '';
            this.onelist1Show = false;
            this.datas.companyId = '';
        }
    }
};
</script>

<style scoped lang="scss">
  .transportDetail{
    padding-bottom: 30px;
    .title{
      padding:20px 16px 0 16px;
      font-size: 14px;
      color: #333333;
      font-weight: bold;
      position: relative;
      i{
        font-size: 14px;
        margin-right: 5px;
        line-height: 14px;
        text-align: center;
        position: absolute;
        top: 26px;
        left: -4px;
        color: #666666;
        font-weight: normal;
      }
    }
    .title-padding{
      padding:0 16px;
      i{
        top: 6px;
      }
    }
    .gy-form{
      .gy-form-group{
        padding: 8px 30px 10px 130px;
        .l{
          width:162px;
          top:8px;
          strong{
            top:10px;
            left:-10px;
          }
        }
      }
      .gy-form-group:nth-child(even){
        padding: 8px 0 10px 160px;
        .l{
          width:162px;
          top:8px;
          left:30px;
          strong{
            top:10px;
            left:-10px;
          }
        }
      }
      .height-new{
        padding: 10px 0 10px 169px!important;
      }
      .form-img{
        width:66px;
        border-radius: 1.2px;
        float: left;
        margin-right:18px;
        margin-top:6px;
        .img-box{
          width:66px;
          height:66px;
          line-height: 66px;
          border: 1px solid #E7ECF1;
          border-radius: 1.2px;
        }
        img{
          width:100%;
        }
        .img-title{
          text-align: center;
          font-size: 12px;
          color: #999999;
        }
      }
    }
    .dialog-img{
      width:100%;
      img{
        width:100%;
      }
    }
    .gy-button-extra{
       background-color:#e59640;
       border-color:#e59640;
    }
    .gy-button-normal:hover{
      color:#e59640;
      border-color:#e59640;
    }
    .listul {
      background-color: #fff;
      width: calc(100% - 122px);
      max-height: 300px;
      overflow: auto;
      position: absolute;
      top: 39px;
      z-index: 1000;
      border: 1px solid #e6eaea;
      border-top: none;
      li {
        padding: 5px 10px;
      }
      li:hover {
        cursor: pointer;
        background-color: #f5f7fa;
        color: #4a90e2;
      }
    }
    .form-mySearch {
      position: absolute;
      top: 8px;
      right: 37px;
      cursor: pointer;
    }
    .gy-form-button{
      padding-right:0;
    }
  }
</style>
<style lang="scss">
  .transportDetail{
    .el-upload--picture-card{
      width:66px;
      height:66px;
      line-height: 66px;
    }
    .el-upload-list--picture-card .el-upload-list__item{
      width:66px;
      height:66px;
    }
    .el-dialog__body{
      padding:15px 2px;
    }
    .el-checkbox+.el-checkbox{
      margin-left:16px;
    }
    .el-checkbox__input.is-checked+.el-checkbox__label{
      color:#666666;
    }
    .el-radio__input.is-checked+.el-radio__label{
      color:#666666;
    }
  }
</style>
