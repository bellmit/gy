<template>
    <div class="vehicle-wrap">
        <h2 class="gy-h2">车辆详情</h2>
        <div class="clearfix">
            <h3><i class="el-icon-tickets"></i>所属公司</h3>
            <div class="gy-form-group">
                <span class="l">承运商</span>
                <span>{{vehicleData.companyName}}</span>
            </div>
            <h3 class="cl"><i class="el-icon-tickets"></i>基础信息</h3>
            <div class="gy-from-box">
                <div class="gy-form-group">
                    <span class="l">车辆隶属关系</span>
                    <span>{{vehicleData.vehicleMembershipRelationship === 1 ? '自有车辆' : '合作车辆'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">车牌号</span>
                    <span>{{vehicleData.licensePlateNumber}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">装货类型</span>
                    <span>{{vehicleData.loadingType === 1 ? '普货' : '危险品'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">装货载具</span>
                    <span>{{vehicleData.vehicleMountType === 1 ? '挂车' : '一体'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">车型</span>
                    <span>{{vehicleData.infLogisticsDictionaryIdVehicleTypeStr}}</span>
                </div>
                <!-- 槽罐 -->
                <div class="gy-frombox cl" v-if="vehicleData.infLogisticsDictionaryIdVehicleType ===null || vehicleData.infLogisticsDictionaryIdVehicleType ===8">
                    <div class="gy-form-group" style="height:46px;">
                        <span class="l">罐体容积</span>
                        <span>{{vehicleData.tubeVolume}}m³</span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">附加功能</span>
                        <span>{{vehicleData.infLogisticsDictionaryIdAdditionalFunctionStr}}</span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">罐体材质</span>
                        <span>{{vehicleData.infLogisticsDictionaryIdTankMaterialStr}}</span>
                    </div>
                </div>
                <!-- 平板 箱柜 -->
                <div class="gy-frombox cl" v-if="vehicleData.infLogisticsDictionaryIdVehicleType ===9 || vehicleData.infLogisticsDictionaryIdVehicleType ===10 || vehicleData.infLogisticsDictionaryIdVehicleType ===11">
                    <div class="gy-form-group" style="height:46px;">
                        <span class="l">车辆尺寸(米)</span>
                        <span>{{vehicleData.vehicleLength}}</span>&nbsp;长&nbsp;
                        <span>{{vehicleData.vehicleWidth}}</span>&nbsp;宽&nbsp;
                        <span>{{vehicleData.vehicleHeight}}</span>&nbsp;高&nbsp;
                    </div>
                    <div class="gy-form-group">
                        <span class="l">核载重量</span>
                        <span>{{vehicleData.loadWeight}}</span>&nbsp;吨&nbsp;
                    </div>
                    <div class="gy-form-group">
                        <span class="l">牵引总重量</span>
                        <span>{{vehicleData.vehicleTractionTotalWeight}}</span>&nbsp;吨&nbsp;
                    </div>
                    <div class="gy-form-group">
                        <span class="l">总载重重量</span>
                        <span>{{vehicleData.vehicleLoadTotalWeight}}</span>&nbsp;吨&nbsp;
                    </div>
                </div>
                <!--  -->
                <h3 class="cl"><i class="iconfont icon-xiaohuoche"></i>车辆外观</h3>
                <div class="gy-form-group">
                    <span class="l">车辆正面</span>
                    <div class="">
                        <!-- <img width="60px" height="60px; margin-right:20px;" :src="vehicleData.vehicleFrontPhotoUrl" alt=""> -->
                        <gy-upload
                            :disabled="true"
                            :url="imgApi"
                            :limit="1"
                            v-model="imgList.vehicleFrontPhotoUrl.list"
                            :upload-data="{filetype: imgList.vehicleFrontPhotoUrl.type}"
                            >
                        </gy-upload>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">车辆侧面</span>
                    <gy-upload
                        :disabled="true"
                        :url="imgApi"
                        :limit="1"
                        v-model="imgList.vehicleSidePhotoUrl.list"
                        :upload-data="{filetype: imgList.vehicleSidePhotoUrl.type}"
                        >
                    </gy-upload>
                </div>
                <div class="gy-form-group">
                    <span class="l">车辆后面</span>
                    <gy-upload
                        :disabled="true"
                        :url="imgApi"
                        :limit="1"
                        v-model="imgList.vehicleBackPhotoUrl.list"
                        :upload-data="{filetype: imgList.vehicleBackPhotoUrl.type}"
                        >
                    </gy-upload>
                </div>
                <h3 class="cl"><i class="iconfont icon-bangdingxindetixianzhanghao"></i>证照信息</h3>
                <div class="gy-form-group">
                    <span class="l">行驶证主页</span>
                    <div class="">
                    <gy-upload
                        :url="imgApi"
                        :disabled="true"
                        :limit="1"
                        v-model="imgList.drivingLicenseHomepagePhotoUrl.list"
                        :upload-data="{filetype: imgList.drivingLicenseHomepagePhotoUrl.type}"
                        >
                    </gy-upload>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">行驶证副页</span>
                    <div class="">
                    <gy-upload
                        :url="imgApi"
                        :disabled="true"
                        :limit="1"
                        v-model="imgList.drivingLicenseVicePagePhotoUrl.list"
                        :upload-data="{filetype: imgList.drivingLicenseVicePagePhotoUrl.type}"
                        >
                    </gy-upload>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l" style="width:auto;">行驶证检验有效期至</span>
                    <span class="ml20">{{vehicleData.drivingLicenseValid | date}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">道路运输证</span>
                    <gy-upload
                        :url="imgApi"
                        :disabled="true"
                        :limit="1"
                        v-model="imgList.transportLicensePhotoUrl.list"
                        :upload-data="{filetype: imgList.transportLicensePhotoUrl.type}"
                        >
                    </gy-upload>
                </div>
                <div class="gy-form-group">
                    <span class="l" style="width:auto;">道路运输证有效期至</span>
                    <span class="ml20">{{vehicleData.transportLicenseValidTime | date}}</span>
                </div>
                <h3 class="cl"><i class="iconfont icon-fenfabaoxian"></i>保险信息</h3>
                <div class="gy-form-group">
                    <span class="l">车辆保险单</span>
                    <gy-upload
                        :url="imgApi"
                        :disabled="true"
                        :limit="1"
                        v-model="imgList.vehicleInsurancePolicyPhotoUrl.list"
                        :upload-data="{filetype: imgList.vehicleInsurancePolicyPhotoUrl.type}"
                        >
                    </gy-upload>
                </div>
                <div class="gy-form-group">
                    <span class="l">投保金额</span>
                    <span>{{vehicleData.vehicleInsuredAmount}}</span>万元
                </div>
                <div class="gy-form-group cl">
                    <span class="l">车辆保险单号</span>
                    <span>{{vehicleData.vehicleInsuredNumber}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">保险有效期</span>
                    <span>{{vehicleData.insuredValidTime[0] | date}}</span>
                    &nbsp;至&nbsp;
                    <span>{{vehicleData.insuredValidTime[1] | date}}</span>
                    <!-- <el-date-picker
                        v-model="vehicleData.insuredValidTime"
                        type="daterange"
                        align="center"
                        unlink-panels
                        range-separator="至"
                        start-placeholder = '开始日期'
                        end-placeholder= '结束日期'
                        >
                    </el-date-picker> -->
                </div>
            </div>
        </div>

        <div class="buttonfooter fr">
            <button class="gy-button-normal" type="reset" @click="backToList">取消</button>
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
            imgApi: this.$api.transport.upload,
            imgList: genImgList(),
            vehicleData: {
                vehicleMembershipRelationship: '',
                loadingType: '',
                vehicleMountType: '',
                infLogisticsDictionaryIdVehicleType: '',
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
                companyId: JSON.parse(localStorage.getItem('userInfo')).companyId
            },
            categoryList: '',
            valid: [
                {
                    id: 0,
                    value: '未启用'
                },
                {
                    id: 1,
                    value: '已启用'
                }
            ]
        };
    },
    created () {
        this.vehicleId = this.$route.query.vehicleId;
        this.vehicleId && this.getDetail();
    },
    methods: {
        getDetail: function () {
            let that = this;
            that.$http.get(that.$api.transport.addvehicle + '/' + that.vehicleId)
                .then(res => {
                    console.log(res.data.data);
                    that.vehicleData = res.data.data;
                    for (const imgItem of Object.keys(this.imgList)) {
                        let url = that.vehicleData[imgItem];
                        url && this.imgList[imgItem].list.push({url, filePath: url});
                    }
                    let insuredValidTimes = [];
                    insuredValidTimes[0] = res.data.data.vehicleInsuredValidBeginTime;
                    insuredValidTimes[1] = res.data.data.vehicleInsuredValidEndTime;
                    that.vehicleData.insuredValidTime = insuredValidTimes;
                });
        },
        backToList: function () {
            this.$router.push({name: 'vehicleList'});
        }
    }
};
</script>
