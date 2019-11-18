<template>
    <div class="transportUserInfo">
        <div class="new-title-public">驾驶员/押运员详情</div>
        <div class="title"><i class="iconfont icon-icon_shenqing"></i>基础信息</div>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>姓名</span>
                {{datas.username}}
            </div>
            <div class="gy-form-group height-new">
                <span class="l"><strong>*</strong>性别</span>
                {{datas.sex === 1 ? '男' : '女'}}
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>身份证号码</span>
                {{datas.identityCode}}
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>手机号码</span>
                {{datas.phone}}
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>人员类型</span>
                {{datas.personnelType === 0 ? '驾驶员/押运员' : datas.personnelType === 1 ? '驾驶员' : '押运员'}}
            </div>
            <div class="gy-form-group">
                <span class="l">出生日期</span>
                {{datas.birthdayStr}}
            </div>
        </div>
        <div class="title title-padding"><i class="iconfont icon-bangdingxindetixianzhanghao"></i>证照信息</div>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>身份证正面</span>
                <gy-upload
                        :url="imgApi"
                        :disabled="true"
                        v-model="imgList.identityFrontPath.list"
                        :limit="1"
                        :upload-data="{filetype: imgList.identityFrontPath.type}">
                </gy-upload>
            </div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>身份证背面</span>
                <gy-upload
                        :url="imgApi"
                        :disabled="true"
                        v-model="imgList.identityOppositePath.list"
                        :limit="1"
                        :upload-data="{filetype: imgList.identityOppositePath.type}">
                </gy-upload>
            </div>
            <!-- 驾驶员 -->
            <div class="gy-form-group" v-if="datas.personnelType !== 2">
                <span class="l"><strong>*</strong>驾驶证主页</span>
                <gy-upload
                        :url="imgApi"
                        :disabled="true"
                        v-model="imgList.drivingCertificateFrontPath.list"
                        :limit="1"
                        :upload-data="{filetype: imgList.drivingCertificateFrontPath.type}">
                </gy-upload>
            </div>
            <div class="gy-form-group" v-if="datas.personnelType !== 2">
                <span class="l"><strong>*</strong>驾驶证副页</span>
                <gy-upload
                        :url="imgApi"
                        :disabled="true"
                        v-model="imgList.drivingCertificateOppositePath.list"
                        :limit="1"
                        :upload-data="{filetype: imgList.drivingCertificateOppositePath.type}">
                </gy-upload>
            </div>
            <div class="gy-form-group" v-if="datas.personnelType !== 2">
                <span class="l"><strong>*</strong>准驾车型</span>
                {{datas.vehicleModel}}
            </div>
            <div class="gy-form-group" v-if="datas.personnelType !== 2">
                <span class="l"><strong>*</strong>驾驶证有效期</span>
                <el-col :span="2">至</el-col>
                <el-col :span="22">
                    {{datas.drivingCertificateValidDate | date}}
                </el-col>
            </div>
            <div class="gy-form-group" v-if="datas.personnelType !== 2">
                <span class="l"><strong>*</strong>从业资格证 <br> (驾驶员）</span>
                <gy-upload
                        :url="imgApi"
                        :disabled="true"
                        v-model="imgList.qualificationCertificatePath.list"
                        :limit="1"
                        :upload-data="{filetype: imgList.qualificationCertificatePath.type}">
                </gy-upload>
            </div>
            <div class="gy-form-group" style="height:96px;" v-if="datas.personnelType !== 2">
                <span class="l">从业资格证编号 <br> (驾驶员）</span>
                {{datas.qualificationCode}}
            </div>
            <div class="gy-form-group" v-if="datas.personnelType !== 2">
                <span class="l"><strong>*</strong>从业资格证有效期</span>
                <el-col :span="2">至</el-col>
                <el-col :span="22">
                    {{datas.validDate | date}}
                </el-col>
            </div>
            <div class="gy-form-group" style="height:50px;" v-if="datas.personnelType !== 2"></div>
            <!-- 押运员 -->
            <div class="gy-form-group" v-if="datas.personnelType !== 1">
                <span class="l"><strong>*</strong>从业资格证 <br> (押运员）</span>
                <gy-upload
                        :url="imgApi"
                        :disabled="true"
                        v-model="imgList.escortQualificationCertificatePath.list"
                        :limit="1"
                        :upload-data="{filetype: imgList.escortQualificationCertificatePath.type}">
                </gy-upload>
            </div>
            <div class="gy-form-group" style="height:96px;" v-if="datas.personnelType !== 1">
                <span class="l">从业资格证编号 <br> (押运员）</span>
                {{datas.escortQualificationCode}}
            </div>
            <div class="gy-form-group" v-if="datas.personnelType !== 1">
                <span class="l"><strong>*</strong>从业资格证有效期</span>
                <el-col :span="2">至</el-col>
                <el-col :span="22">
                    {{datas.escortQualificationValidDate | date}}
                </el-col>
            </div>
        </div>
        <div class="gy-form-button button-padding">
            <button class="gy-button-normal" @click="backToList">取消</button>
        </div>
    </div>
</template>

<script>
import gyUpload from '@/components/upload';
const imgMap = {
    identityFrontPath: 0, // 身份证正面
    identityOppositePath: 1, // 身份证背面
    drivingCertificateFrontPath: 2, // 驾驶证主页
    drivingCertificateOppositePath: 3, // 驾驶证副页
    qualificationCertificatePath: 4, // 从业资格证(驾驶员）
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
    name: 'transportInfo',
    components: {
        gyUpload
    },
    data () {
        return {
            datas: {
                username: '', // 姓名
                sex: 1, // 性别
                identityCode: '', // 身份证号码
                phone: '', // 手机号码
                personnelType: 1, // 人员类型 0：全选；1：驾驶员；2：押运员
                birthdayStr: '', // 出生日期
                valid: 1, // 是否有效
                identityFrontPath: [], // 身份证正面照
                identityOppositePath: [], // 身份证背面照
                drivingCertificateFrontPath: [], // 驾驶证主页照
                drivingCertificateOppositePath: [], // 驾驶证副页照
                vehicleModel: '', // 准驾车型
                drivingCertificateValidDate: '', // 驾驶证有效期
                qualificationCertificatePath: [], // 驾驶员从业资格证书路径
                qualificationCode: '', // 驾驶员从业资格证书编号
                validDate: '', // 驾驶员从业资格证书有效时间
                escortQualificationCode: '', // 押运员从业资格证编号
                escortQualificationCertificatePath: [], // 押运员从业资格证路径
                escortQualificationValidDate: '' // 从业资格证书有效时间（押运人）
            },
            imgApi: this.$api.account.upload,
            imgList: getImgList()
        };
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
        backToList () {
            this.$router.push({name: 'transportUser'});
        }
    }
};
</script>

<style scoped lang="scss">
    .transportUserInfo{
        padding-bottom:30px;
        .title{
            padding:20px 30px 0 30px;
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
                left: 11px;
                color: #666666;
                font-weight: normal;
            }
        }
        .title-padding{
            padding:0 30px;
            i{
                top: 6px;
            }
        }
        .gy-form-group{
            padding: 8px 30px 10px 162px;
            .l{
                width:162px;
            }
            img{
                display: block;
                width:66px;
                height:66px;
            }
        }
    }
</style>
<style lang="scss">
    .transportUserInfo{
        .el-upload--picture-card{
            width:66px;
            height:66px;
            line-height: 66px;
        }
        .el-upload-list--picture-card .el-upload-list__item{
            width:66px;
            height:66px;
        }
    }
</style>
