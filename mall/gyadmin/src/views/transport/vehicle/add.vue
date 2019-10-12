<template>
    <div class="vehicle-wrap">
        <div class="gy-h4">{{id ? '车辆编辑' : '车辆添加'}}</div>
        <div class="clearfix">
            <h3><i class="iconfont icon-qiye"></i>所属公司</h3>
            <div class="gy-form-group" style="height: 42px">
              <span class="l"><strong>*</strong>承运商</span>
              <label>
                <input @click="blur11" :disabled="id" placeholder="请选择承运商" type="text" class="gy-input" v-model="companyNamenew" @keyup.enter="onelist1click">
              </label>
              <ul class="listul" v-show="onelist1Show">
                <li v-for="(item,index) in onelist1" :key="index" @click="onelist1select(item)" v-if="onelist1.length>0">
                  {{item.companyName}}
                </li>
                <li class="none-tips" v-if="onelist1.length === 0">没有搜到相关公司</li>
              </ul>
              <i class="iconfont icon-mySearch" @click="onelist1click"></i>
            </div>
            <h3 class="cl"><i class="iconfont icon-icon_shenqing"></i>基础信息</h3>
            <div class="gy-from-box">
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>车辆隶属关系</span>
                    <div>
                        <el-radio-group v-model="vehicleData.vehicleMembershipRelationship">
                            <el-radio :label="1">自有车辆</el-radio>
                            <el-radio :label="2">合作车辆</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>车牌号</span>
                    <input type="text" :disabled="id" class="gy-input" v-model="vehicleData.licensePlateNumber" placeholder="请输入">
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>装货类型</span>
                    <div>
                        <el-radio-group v-model="vehicleData.loadingType">
                            <el-radio :label="1">普货</el-radio>
                            <el-radio :label="2">危险品</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>装货载具</span>
                    <div>
                        <el-radio-group v-model="vehicleData.vehicleMountType">
                            <el-radio :label="1">挂车</el-radio>
                            <el-radio :label="2">一体</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>车型</span>
                    <!-- <div>
                        <el-radio-group v-model="vehicleData.vehicleType">
                            <el-radio :label="1">槽罐</el-radio>
                            <el-radio :label="2">平板</el-radio>
                            <el-radio :label="3">箱柜</el-radio>
                        </el-radio-group>
                    </div> -->
                    <el-select v-model="vehicleData.infLogisticsDictionaryIdVehicleType" placeholder="请选择">
                        <el-option
                            v-for="item in carrierTypeStaus"
                            :key="item.id"
                            :label="item.logisticsDictionaryName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <!-- 槽罐 -->
                <div class="gy-frombox cl" v-if="vehicleData.infLogisticsDictionaryIdVehicleType ===null || vehicleData.infLogisticsDictionaryIdVehicleType ===8">
                    <div class="gy-form-group" style="height:46px;">
                        <span class="l"><strong>*</strong>罐体容积</span>
                        <input type="text" style="width:95%;" class="gy-input" v-model="vehicleData.tubeVolume" placeholder="请输入">&nbsp;&nbsp;m³
                    </div>
                    <div class="gy-form-group">
                        <span class="l">附加功能</span>
                        <el-select v-model="vehicleData.infLogisticsDictionaryIdAdditionalFunction" placeholder="请选择">
                            <el-option
                                v-for="item in additionalFunctionList"
                                :key="item.id"
                                :label="item.logisticsDictionaryName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">罐体材质</span>
                        <el-select v-model="vehicleData.infLogisticsDictionaryIdTankMaterial" placeholder="请选择">
                            <el-option
                                v-for="item in tankMaterialList"
                                :key="item.id"
                                :label="item.logisticsDictionaryName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <!-- 平板 箱柜 -->
                <div class="gy-frombox cl" v-if="vehicleData.infLogisticsDictionaryIdVehicleType ===9 || vehicleData.infLogisticsDictionaryIdVehicleType ===10 || vehicleData.infLogisticsDictionaryIdVehicleType ===11">
                    <div class="gy-form-group" style="height:46px;">
                        <span class="l">车辆尺寸(米)</span>
                        <input type="text" style="width:29%;" class="gy-input" v-model="vehicleData.vehicleLength" placeholder="请输入">&nbsp;长&nbsp;
                        <input type="text" style="width:29%;" class="gy-input" v-model="vehicleData.vehicleWidth" placeholder="请输入">&nbsp;宽&nbsp;
                        <input type="text" style="width:29%;" class="gy-input" v-model="vehicleData.vehicleHeight" placeholder="请输入">&nbsp;高&nbsp;
                    </div>
                    <div class="gy-form-group">
                        <span class="l"><strong>*</strong>核载重量</span>
                        <input type="text" style="width:96%;" class="gy-input" v-model="vehicleData.loadWeight" placeholder="请输入">&nbsp;吨&nbsp;
                    </div>
                    <div class="gy-form-group">
                        <span class="l">牵引总重量</span>
                        <input type="text" style="width:96%;" class="gy-input" v-model="vehicleData.vehicleTractionTotalWeight" placeholder="请输入">&nbsp;吨&nbsp;
                    </div>
                    <div class="gy-form-group">
                        <span class="l">总载重重量</span>
                        <input type="text" style="width:96%;" class="gy-input" v-model="vehicleData.vehicleLoadTotalWeight" placeholder="请输入">&nbsp;吨&nbsp;
                    </div>
                </div>
                <!--  -->
                <h3 class="cl"><i class="iconfont icon-xiaohuoche"></i>车辆外观</h3>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>车辆正面</span>
                    <div>
                        <img class="picstyle" v-if="vehicleData.infLogisticsDictionaryIdVehicleType ===null || vehicleData.infLogisticsDictionaryIdVehicleType ===8" src="../../../assets/images/vehiclepic/cartankfrontpro.png" alt="" @click="magnifyPic($event)">
                        <img class="picstyle" v-if="vehicleData.infLogisticsDictionaryIdVehicleType ===9" src="../../../assets/images/vehiclepic/carpanelfrontpro.png" alt="" @click="magnifyPic($event)">
                        <img class="picstyle" v-if="vehicleData.infLogisticsDictionaryIdVehicleType ===10 || vehicleData.infLogisticsDictionaryIdVehicleType ===11" src="../../../assets/images/vehiclepic/carcofferfrontpro.png" alt="" @click="magnifyPic($event)">
                        <p class="tuli">图例</p>
                    </div>
                    <div class="uploadbox">
                    <gy-upload
                        :url="imgApi"
                        :limit="1"
                        v-model="imgList.vehicleFrontPhotoUrl.list"
                        :upload-data="{filetype: imgList.vehicleFrontPhotoUrl.type}"
                        >
                    </gy-upload>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>车辆侧面</span>
                    <div>
                        <img class="picstyle" v-if="vehicleData.infLogisticsDictionaryIdVehicleType ===null || vehicleData.infLogisticsDictionaryIdVehicleType ===8" src="../../../assets/images/vehiclepic/cartanksidepro.png" @click="magnifyPic($event)" alt="">
                        <img class="picstyle" v-if="vehicleData.infLogisticsDictionaryIdVehicleType ===9" src="../../../assets/images/vehiclepic/carpanelsidepro.png" alt="" @click="magnifyPic($event)">
                        <img class="picstyle" v-if="vehicleData.infLogisticsDictionaryIdVehicleType ===10 || vehicleData.infLogisticsDictionaryIdVehicleType ===11" src="../../../assets/images/vehiclepic/carcoffersidepro.png" alt="" @click="magnifyPic($event)">
                        <p class="tuli">图例</p>
                    </div>
                    <div class="uploadbox">
                    <gy-upload
                        :url="imgApi"
                        :limit="1"
                        v-model="imgList.vehicleSidePhotoUrl.list"
                        :upload-data="{filetype: imgList.vehicleSidePhotoUrl.type}"
                        >
                    </gy-upload>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>车辆后面</span>
                    <div>
                        <img class="picstyle" v-if="vehicleData.infLogisticsDictionaryIdVehicleType ===null || vehicleData.infLogisticsDictionaryIdVehicleType ===8" src="../../../assets/images/vehiclepic/cartankbehindpro.png" @click="magnifyPic($event)" alt="">
                        <img class="picstyle" v-if="vehicleData.infLogisticsDictionaryIdVehicleType ===9" src="../../../assets/images/vehiclepic/carpanelbehindpro.png" alt="" @click="magnifyPic($event)">
                        <img class="picstyle" v-if="vehicleData.infLogisticsDictionaryIdVehicleType ===10 || vehicleData.infLogisticsDictionaryIdVehicleType ===11" src="../../../assets/images/vehiclepic/carcofferbehindpro.png" alt="" @click="magnifyPic($event)">
                        <p class="tuli">图例</p>
                    </div>
                    <div class="uploadbox">
                    <gy-upload
                        :url="imgApi"
                        :limit="1"
                        v-model="imgList.vehicleBackPhotoUrl.list"
                        :upload-data="{filetype: imgList.vehicleBackPhotoUrl.type}"
                        >
                    </gy-upload>
                    </div>
                </div>
                <h3 class="cl"><i class="iconfont icon-bangdingxindetixianzhanghao"></i>证照信息</h3>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>行驶证主页</span>
                    <div>
                        <img class="picstyle" src="../../../assets/images/vehiclepic/drivingLicenseHomepagePhotoUrl.png" @click="magnifyPic($event)" alt="">
                        <p class="tuli">图例</p>
                    </div>
                    <div class="uploadbox">
                    <gy-upload
                        :url="imgApi"
                        :limit="1"
                        v-model="imgList.drivingLicenseHomepagePhotoUrl.list"
                        :upload-data="{filetype: imgList.drivingLicenseHomepagePhotoUrl.type}"
                        >
                    </gy-upload>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>行驶证副页</span>
                    <div>
                        <img class="picstyle" src="../../../assets/images/vehiclepic/drivingLicenseVicePagePhotoUrl.png" @click="magnifyPic($event)" alt="">
                        <p class="tuli">图例</p>
                    </div>
                    <div class="uploadbox">
                    <gy-upload
                        :url="imgApi"
                        :limit="1"
                        v-model="imgList.drivingLicenseVicePagePhotoUrl.list"
                        :upload-data="{filetype: imgList.drivingLicenseVicePagePhotoUrl.type}"
                        >
                    </gy-upload>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l" style="width:auto;"><strong>*</strong>行驶证检验有效期</span>
                    <span style="color:#333;">至</span>
                    <div class="zhiinline">
                        <el-date-picker
                            v-model="vehicleData.drivingLicenseValid"
                            type="date"
                            placeholder="请选择">
                        </el-date-picker>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>道路运输证</span>
                    <gy-upload
                        :url="imgApi"
                        :limit="1"
                        v-model="imgList.transportLicensePhotoUrl.list"
                        :upload-data="{filetype: imgList.transportLicensePhotoUrl.type}"
                        >
                    </gy-upload>
                </div>
                <div class="gy-form-group">
                    <span class="l" style="width:auto;"><strong>*</strong>道路运输证有效期</span>
                    <span style="color:#333;">至</span>
                    <div class="zhiinline">
                        <el-date-picker
                            v-model="vehicleData.transportLicenseValidTime"
                            type="date"
                            placeholder="请选择">
                        </el-date-picker>
                    </div>
                </div>
                <h3 class="cl"><i class="iconfont icon-fenfabaoxian"></i>保险信息</h3>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>车辆保险单</span>
                    <gy-upload
                        :url="imgApi"
                        :limit="1"
                        v-model="imgList.vehicleInsurancePolicyPhotoUrl.list"
                        :upload-data="{filetype: imgList.vehicleInsurancePolicyPhotoUrl.type}"
                        >
                    </gy-upload>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>投保金额</span>
                    <input type="text" style="width:95%;" class="gy-input" v-model="vehicleData.vehicleInsuredAmount">万元
                </div>
                <div class="gy-form-group cl">
                    <span class="l"><strong>*</strong>车辆保险单号</span>
                    <input type="text" class="gy-input" v-model="vehicleData.vehicleInsuredNumber">
                </div>
                <div class="gy-form-group">
                    <!-- <span class="l"><strong>*</strong>保险期间</span>
                    <el-date-picker
                        v-model="vehicleData.insuredValidTime"
                        type="daterange"
                        align="center"
                        unlink-panels
                        range-separator="至"
                        start-placeholder = '开始日期'
                        end-placeholder= '结束日期'
                        value-format="timestamp"
                        >
                    </el-date-picker> -->
                        <span class="l"><strong>*</strong>保险有效期</span>
                        <el-col :span="11">
                            <el-date-picker
                            v-model="vehicleData.vehicleInsuredValidBeginTime"
                            class="form-date"
                            type="date"
                            placeholder="开始日期">
                        </el-date-picker>
                        </el-col>
                        <el-col :span="2" style="border-bottom: 1px solid #e7ecf1;">至</el-col>
                        <el-col :span="11">
                            <el-date-picker
                                v-model="vehicleData.vehicleInsuredValidEndTime"
                                :picker-options="endDateOptions"
                                class="form-date"
                                type="date"
                                placeholder="结束日期">
                            </el-date-picker>
                        </el-col>
                </div>
            </div>
            <div class="buttonfooter fr">
                <button class="gy-button-extra-gyadmin" @click="addvehiclesave">{{id ? '提交' : '提交'}}</button>
                <!-- <button class="gy-button-normal" type="reset" @click="backToList">取消</button> -->
            </div>
            <el-dialog title="图片预览" width="800px" :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
    </div>
</template>

<script>
import gyUpload from '@/components/upload';
const imgMap = {
    vehicleFrontPhotoUrl: 0, // 车辆正面 vehicleFrontPhotoUrl
    vehicleSidePhotoUrl: 1, // 车辆ce面 vehicleSidePhotoUrl
    vehicleBackPhotoUrl: 2, // 车辆后面 vehicleBackPhotoUrl
    drivingLicenseHomepagePhotoUrl: 3, // 行驶证主页
    drivingLicenseVicePagePhotoUrl: 4, // 行驶证fu页
    transportLicensePhotoUrl: 5, // 车辆道路运输证
    vehicleInsurancePolicyPhotoUrl: 6 // 车辆保险单
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
    components: {
        gyUpload
    },
    data () {
        return {
            id: '',
            picList: [],
            carrierCompanyList: [],
            onelist1: [],
            companyNamenew: '',
            imgBaseUrl: '',
            dialogImageUrl: '',
            imgApi: this.$api.transport.uploadImage,
            vehicleData: {
                vehicleMembershipRelationship: 1, // 车辆隶属关系
                loadingType: 1, // 装货类型
                vehicleMountType: 1, // 装货载具
                infLogisticsDictionaryIdVehicleType: null,
                tubeVolume: '',
                licensePlateNumber: '',
                infLogisticsDictionaryIdAdditionalFunction: '',
                infLogisticsDictionaryIdTankMaterial: '',
                vehicleLength: '',
                vehicleWidth: '',
                vehicleHeight: '',
                loadWeight: '',
                vehicleTractionTotalWeight: '',
                vehicleLoadTotalWeight: '',
                transportLicenseValidTime: '',
                drivingLicenseValid: '',
                vehicleInsuredAmount: '',
                vehicleInsuredNumber: '',
                insuredValidTime: '',
                vehicleInsuredValidBeginTime: '',
                vehicleInsuredValidEndTime: '',
                companyId: ''
            },
            infCarrierTypeId: [],
            additionalFunctionList: [],
            tankMaterialList: [],
            carrierTypeStaus: [],
            imgList: genImgList(),
            dialogVisible: false,
            onelist1Show: false,
            endDateOptions: {
                disabledDate: (time) => {
                    if (this.vehicleData.vehicleInsuredValidBeginTime) {
                        return time.getTime() < this.vehicleData.vehicleInsuredValidBeginTime;
                    }
                    return time.getTime() < this.vehicleData.vehicleInsuredValidBeginTime;
                }
            },
            valid: [
                {
                    id: 1,
                    value: '已启用'
                },
                {
                    id: 0,
                    value: '未启用'
                }
            ]
        };
    },
    created () {
        this.id = this.$route.query.vehicleId;
        this.id && this.getDetail();
        this.getadditionalFunction();
        this.getTankMaterial();
        this.getinfCarrierTypeStatus();
        this.getCarryierCompany();
    },
    methods: {
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
            this.vehicleData.companyId = '';
        },
        onelist1select (item) {
            console.log(item);
            this.companyNamenew = item.companyName;
            this.vehicleData.companyId = item.companyId;
            this.onelist1Show = false;
        },
        blur11 () {
            this.companyNamenew = '';
            this.onelist1Show = false;
            this.vehicleData.companyId = '';
        },
        // 查找所有承运商
        getCarryierCompany () {
            this.$http.get(this.$api.transport.carryierCompany)
                .then(res => {
                    this.carrierCompanyList = res.data.data;
                });
        },
        // 车辆类型
        getinfCarrierTypeStatus () {
            this.$http.get(this.$api.transport.vehicleType)
                .then(res => {
                    // console.log('车辆类型列表数据：');
                    // console.log(res.data.data);
                    this.carrierTypeStaus = res.data.data;
                });
        },
        // 附加功能
        getadditionalFunction () {
            const that = this;
            that.$http.get(that.$api.transport.additionalFunction)
                .then(function (res) {
                    that.additionalFunctionList = res.data.data;
                });
        },
        // 罐体材质
        getTankMaterial () {
            const that = this;
            that.$http.get(that.$api.transport.tankMaterial)
                .then(function (res) {
                    that.tankMaterialList = res.data.data;
                });
        },
        // 编辑添加车辆信息
        addvehiclesave () {
            if (!this.check()) {
                return false;
            }
            let that = this;
            if (that.id) {
                that.vehicleData.id = that.id;
                that.$http.put(that.$api.transport.addvehicle, that.vehicleData)
                    .then(function (res) {
                        if (res.data.code === 0) {
                            // that.$alert('编辑成功', '提示', {type: 'success'});
                            that.$message.success('编辑成功');
                            that.backToList();
                        } else {
                            // that.$alert(res.data.message, '出错了', {type: 'error'});
                            that.$message.error(res.data.message);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                return;
            }
            that.$http.post(that.$api.transport.addvehicle, that.vehicleData)
                .then(function (res) {
                    console.log(res);
                    if (res.data.code === 0) {
                        // that.$alert('添加成功', '提示', {type: 'success'});
                        that.$message.success('添加成功');
                        that.backToList();
                    } else {
                        that.$message.error(res.data.message);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        // 获取数据
        getDetail: function () {
            let that = this;
            that.$http.get(that.$api.transport.addvehicle + '/' + that.id)
                .then(res => {
                    console.log(res.data.data);
                    that.vehicleData = res.data.data;
                    that.companyNamenew = that.vehicleData.companyName;
                    that.vehicleData.companyId = that.vehicleData.companyId;
                    // let insuredValidTimes = [];
                    if (!res.data.data.vehicleInsuredValidBeginTime && !res.data.data.vehicleInsuredValidEndTime) {
                        // insuredValidTimes = '';
                        that.vehicleData.vehicleInsuredValidBeginTime = '';
                        that.vehicleData.vehicleInsuredValidEndTime = '';
                    }
                    // else {
                    //     insuredValidTimes[0] = res.data.data.vehicleInsuredValidBeginTime;
                    //     insuredValidTimes[1] = res.data.data.vehicleInsuredValidEndTime;
                    //     that.$set(that.vehicleData, 'insuredValidTime', insuredValidTimes);
                    // }
                    // console.log(insuredValidTimes);
                    for (const imgItem of Object.keys(this.imgList)) {
                        let url = that.vehicleData[imgItem];
                        url && this.imgList[imgItem].list.push({url, filePath: url});
                    }
                });
        },
        // 图片放大
        magnifyPic (e) {
            console.log(e.target.src);
            this.dialogVisible = true;
            this.dialogImageUrl = e.target.src;
        },
        // 验证
        check () {
            if (!this.vehicleData.companyId) {
                this.$message.error('承运商不能为空');
                return false;
            }
            if (!this.vehicleData.vehicleMembershipRelationship) {
                this.$message.error('车辆隶属关系不能为空');
                return false;
            }
            if (!this.vehicleData.licensePlateNumber) {
                this.$message.error('车牌号不能为空');
                return false;
            }
            if (!this.vehicleData.loadingType) {
                this.$message.error('装货类型不能为空');
                return false;
            }
            if (!this.vehicleData.vehicleMountType) {
                this.$message.error('装货载具不能为空');
                return false;
            }
            if (!this.vehicleData.infLogisticsDictionaryIdVehicleType) {
                this.$message.error('车型不能为空');
                return false;
            } else if (this.vehicleData.infLogisticsDictionaryIdVehicleType === 8) {
                if (!this.vehicleData.tubeVolume) {
                    this.$message.error('罐体容积不能为空');
                    return false;
                }
            } else {
                if (!this.vehicleData.loadWeight) {
                    this.$message.error('核载重量不能为空');
                    return false;
                }
            }
            if (this.imgList.vehicleFrontPhotoUrl.list === null || this.imgList.vehicleFrontPhotoUrl.list.length === 0) {
                this.$message.error('车辆正面图片不能为空');
                return false;
            } else {
                this.vehicleData.vehicleFrontPhotoUrl = this.imgList.vehicleFrontPhotoUrl.list[0].url;
            }
            if (this.imgList.vehicleSidePhotoUrl.list === null || this.imgList.vehicleSidePhotoUrl.list.length === 0) {
                this.$message.error('车辆侧面图片不能为空');
                return false;
            } else {
                this.vehicleData.vehicleSidePhotoUrl = this.imgList.vehicleSidePhotoUrl.list[0].url;
            }
            if (this.imgList.vehicleBackPhotoUrl.list === null || this.imgList.vehicleBackPhotoUrl.list.length === 0) {
                this.$message.error('车辆后面图片不能为空');
                return false;
            } else {
                this.vehicleData.vehicleBackPhotoUrl = this.imgList.vehicleBackPhotoUrl.list[0].url;
            }
            if (this.imgList.drivingLicenseHomepagePhotoUrl.list === null || this.imgList.drivingLicenseHomepagePhotoUrl.list.length === 0) {
                this.$message.error('行驶证主页图片不能为空');
                return false;
            } else {
                this.vehicleData.drivingLicenseHomepagePhotoUrl = this.imgList.drivingLicenseHomepagePhotoUrl.list[0].url;
            }
            if (this.imgList.drivingLicenseVicePagePhotoUrl.list === null || this.imgList.drivingLicenseVicePagePhotoUrl.list.length === 0) {
                this.$message.error('行驶证副页图片不能为空');
                return false;
            } else {
                this.vehicleData.drivingLicenseVicePagePhotoUrl = this.imgList.drivingLicenseVicePagePhotoUrl.list[0].url;
            }
            if (!this.vehicleData.drivingLicenseValid) {
                this.$message.error('行驶证检验有效期至不能为空');
                return false;
            }
            if (this.imgList.transportLicensePhotoUrl.list === null || this.imgList.transportLicensePhotoUrl.list.length === 0) {
                this.$message.error('道路运输证图片不能为空');
                return false;
            } else {
                this.vehicleData.transportLicensePhotoUrl = this.imgList.transportLicensePhotoUrl.list[0].url;
            }
            if (!this.vehicleData.transportLicenseValidTime) {
                this.$message.error('道路运输证有效期至不能为空');
                return false;
            }
            if (this.imgList.vehicleInsurancePolicyPhotoUrl.list === null || this.imgList.vehicleInsurancePolicyPhotoUrl.list.length === 0) {
                this.$message.error('车辆保险单图片不能为空');
                return false;
            } else {
                this.vehicleData.vehicleInsurancePolicyPhotoUrl = this.imgList.vehicleInsurancePolicyPhotoUrl.list[0].url;
            }
            if (!this.vehicleData.vehicleInsuredAmount) {
                this.$message.error('投保金额不能为空');
                return false;
            }
            if (!this.vehicleData.vehicleInsuredNumber) {
                this.$message.error('保险单号不能为空');
                return false;
            }
            if (!this.vehicleData.vehicleInsuredValidBeginTime && !this.vehicleData.vehicleInsuredValidEndTime) {
                this.$message.error('保险期间不能为空');
                return false;
            }
            // else {
            //     this.vehicleData.vehicleInsuredValidBeginTime = this.vehicleData.insuredValidTime[0];
            //     this.vehicleData.vehicleInsuredValidEndTime = this.vehicleData.insuredValidTime[1];
            // }
            return true;
        },
        backToList: function () {
            this.$router.push({name: 'vehicleList'});
        }

    }
};
</script>
<style lang="scss">
.vehicle-wrap{
    .el-range-separator{
        padding: 0px;
    }
    .el-upload--picture-card{
        width:66px;
        height:66px;
        line-height: 66px;
    }
    .el-upload-list--picture-card .el-upload-list__item{
        width:66px;
        height:66px;
    }
    .el-radio+.el-radio{
        margin-left:20px;
        color:#666666;
    }
    .el-range-separator, .el-input__icon{
        line-height: 24px;
    }
    .el-input__inner{
        height: 30px;
        font-size: 14px;
    }
    .el-radio__input.is-checked+.el-radio__label {
        color: #666666;
    }
}

</style>
