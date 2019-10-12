<template>
    <div class="order shop">
        <div class="new-title-public">
            企业介绍维护
        </div>
        <div class="none-shop" v-if="!isShoped">
            <img src="../../assets/images/noneshop.png" alt="">
            <p>开通店铺可以获得更多的优惠</p>
            <button class="gy-button-extra" @click="goOpenShop">我要开通店铺</button>
        </div>
        <div v-else>
            <form action="javascript:;">
            <div class="gy-form my-form">
                <div class="gy-form-group">
                    <span class="l">企业名称</span>
                    <input class="gy-input" v-model="form.name" disabled>
                </div>
                <div class="gy-form-group">
                    <span class="l">企业电话</span>
                    <input class="gy-input" v-model="form.phone">
                </div>
                <div class="gy-form-group single-row my-single-row">
                    <div class="col">
                        <span class="l"><strong>*</strong>企业地址</span>
                        <el-select v-model="form.provinceId" placeholder="请选择省" @change="provinceChange">
                            <el-option
                                v-for="item in provinceList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col">
                        <el-select v-model="form.cityId" placeholder="请选择市" @change="cityChange">
                            <el-option
                                v-for="item in cityList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col">
                        <el-select v-model="form.districtId" placeholder="请选择区">
                            <el-option
                                v-for="item in districtList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="col">
                        <input type="text" v-model="form.address" class="address">
                    </div>
                </div>
                <!-- <div class="gy-form-group">
                    <span class="l"><strong>*</strong>企业地址</span>
                    <input class="gy-input" v-model="form.address">
                </div> -->
                <div class="gy-form-group single-row">
                    <span class="l"><strong>*</strong>企业介绍</span>
                    <textarea class="gy-textarea" @input="profileInput" maxlength="600" v-model="form.profile"></textarea>
                    <div class="text-num fr">{{textNum}}/600</div>
                </div>
                <!-- 相关链接 -->
                <div class="gy-form-group">
                    <span class="l">相关链接标题</span>
                    <input class="gy-input" v-model="form.linkTitle" placeholder="请输入">
                </div>
                <div class="form-lz clearfix cl">
                    <div class="form-item" v-for="(item, index) in companyLinks" :key="index">
                        <div class="gy-form-group">
                            <span class="l">相关链接文字</span>
                            <input class="gy-input" v-model="item.content" placeholder="请输入">
                        </div>
                        <div class="gy-form-group">
                            <span class="l">链接</span>
                            <input class="gy-input jian" v-model="item.linkUrl" placeholder="请输入">
                            <i class="iconfont icon-weitijiao" v-if="companyLinks.length !== 1" @click="caoz(1, index)"></i>
                        </div>
                    </div>
                    <div class="add">
                        <i class="iconfont icon-add-shop" @click="caoz(2)"></i>
                    </div>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l"><strong>*</strong>企业LOGO</span>
                    <el-upload
                        ref="clearUpload"
                        :limit="1"
                        action="api"
                        :data="{type: 5}"
                        list-type="picture-card"
                        :on-remove="BannerRemove"
                        :http-request="uploadImg"
                        :file-list="imgList1">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <p class="tips">请上传企业LOGO图片（最多1张）</p>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l"><strong>*</strong>Banner</span>
                    <el-upload
                        ref="clearUpload1"
                        :limit="5"
                        action="api"
                        :data="{type: 3}"
                        list-type="picture-card"
                        :on-remove="BannerRemove"
                        :http-request="uploadImg"
                        :file-list="imgList2">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <p class="tips">请上传Banner图片（最多5张）</p>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l"><strong>*</strong>企业介绍</span>
                    <el-upload
                        :limit="1"
                        ref="clearUpload2"
                        action="api"
                        :data="{type: 4}"
                        list-type="picture-card"
                        :on-remove="BannerRemove"
                        :http-request="uploadImg"
                        :file-list="imgList3">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <p class="tips">请上传企业介绍图片（1张）</p>
                </div>
                <div class="gy-form-group single-row">
                    <span class="l">荣誉资质</span>
                    <el-upload
                        :limit="6"
                        ref="clearUpload3"
                        action="api"
                        :data="{type: 2}"
                        list-type="picture-card"
                        :on-remove="BannerRemove"
                        :http-request="uploadImg"
                        :file-list="imgList4">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <p class="tips">请上传荣誉资质图片（最多6张）</p>
                </div>
                <div class="gy-form-button">
                    <button class="gy-button-extra gy-submit" @click="submit">提交</button>
                </div>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            flag: true,
            isList: true,
            textNum: 0,
            companyLinks: [],
            phone: null,
            url: null,
            companyId: JSON.parse(localStorage.getItem('userInfo')).companyId,
            form: {
                name: '',
                phone: '',
                address: '',
                profile: '',
                linkTitle: null, // 相关链接标题
                companyLinkModels: [],
                companyId: '',
                provinceId: '',
                cityId: '',
                districtId: ''
            },
            imgList1: [],
            imgList2: [],
            imgList3: [],
            imgList4: [],
            provinceList: [],
            cityList: [],
            districtList: [],
            companyProfileImgDtoList: [],
            isShoped: false,
            companyImgUploaded: [],
            defaultCompanyId: JSON.parse(localStorage.getItem('userInfo')).companyId
        };
    },
    created () {
        this.init();
    },
    watch: {
    },
    methods: {
        getProvince () {
            this.$http.get(this.$api.account.area + '/0')
                .then(res => {
                    this.provinceList = res.data.data;
                });
        },
        provinceChange () {
            this.$http.get(this.$api.account.area + '/' + this.form.provinceId)
                .then(res => {
                    this.cityList = res.data.data;
                });
        },
        cityChange () {
            this.$http.get(this.$api.account.area + '/' + this.form.cityId)
                .then(res => {
                    this.districtList = res.data.data;
                });
        },
        caoz (type, index) {
            let params = {content: '', linkUrl: ''};
            if (type === 1) {
                this.companyLinks.splice(index, 1);
            } else {
                this.companyLinks.push(params);
            }
        },
        getList () {
            this.$http.post(this.$api.shop.profile, {companyId: this.companyId}).then(res => {
                if (res.data.code === 0) {
                    this.companyLinks = res.data.data.companyLinks;
                    this.form.linkTitle = res.data.data.linkTitle;
                }
            });
        },
        init () {
            const me = this;
            localStorage.getItem('userInfo') && (this.isShoped = JSON.parse(localStorage.getItem('userInfo')).shopsetup === 1);
            me.$http.post(me.$api.shop.profile, {companyId: this.companyId})
                .then(function (res) {
                    if (res.data.code === 0) {
                        me.form = res.data.data;
                        me.companyLinks = me.companyLinks.concat(me.form.companyLinks);
                        if (me.companyLinks.length === 0) {
                            me.companyLinks.push({content: '', linkUrl: ''});
                        }
                        me.textNum = me.form.profile && me.form.profile.length;
                        if (me.form.companyLogo !== null) {
                            me.imgList1.push({url: me.form.companyLogo, absoluteUrl: me.form.companyLogo, type: 5});
                        }
                        if (me.form.bannerAbsoluteUrlList !== null) {
                            me.form.bannerAbsoluteUrlList.forEach((item, index) => {
                                me.imgList2.push({url: item, absoluteUrl: item, type: 3});
                            });
                        }
                        if (me.form.profileAbsoluteUrl !== null) {
                            me.imgList3.push({url: me.form.profileAbsoluteUrl, absoluteUrl: me.form.profileAbsoluteUrl, type: 4});
                        }
                        if (me.form.certificateAbsoluteUrlList !== []) {
                            me.form.certificateAbsoluteUrlList.forEach((item, index) => {
                                me.imgList4.push({url: item, absoluteUrl: item, type: 2});
                            });
                        }
                        me.getProvince();
                        if (me.form.provinceId && me.form.cityId) {
                            console.log(me.form.provinceId);
                            console.log(me.form.cityId);
                            me.provinceChange();
                            me.cityChange();
                        }
                    }
                });
        },
        profileInput () {
            this.textNum = this.form.profile.length;
        },
        uploadImg (file) {
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            this.$http.post(this.$api.shop.imgUploadFile, formData, headers)
                .then(res => {
                    if (res.data.code === 0) {
                        // 企业LOGO
                        if (file.data.type === 5) {
                            this.basePush(this.imgList1, file, res);
                        }
                        // Banner
                        if (file.data.type === 3) {
                            this.basePush(this.imgList2, file, res);
                        }
                        // 企业介绍图片
                        if (file.data.type === 4) {
                            this.basePush(this.imgList3, file, res);
                        }
                        // 荣誉资质
                        if (file.data.type === 2) {
                            this.basePush(this.imgList4, file, res);
                        }
                    }
                });
        },
        // 上传的文件或照片按需分配
        basePush (list, file, res) {
            let path;
            path = res.data.data.absoluteUrl;
            list.push({
                type: file.data && file.data.type,
                absoluteUrl: res.data.data.absoluteUrl,
                url: path
            });
        },
        BannerRemove (file) {
            // 企业LOGO
            if (file.type === 5) {
                this.baseDele(this.imgList1, file);
            }
            // Banner
            if (file.type === 3) {
                this.baseDele(this.imgList2, file);
            }
            // 企业介绍图片
            if (file.type === 4) {
                this.baseDele(this.imgList3, file);
            }
            // 荣誉资质
            if (file.type === 2) {
                this.baseDele(this.imgList4, file);
            }
        },
        baseDele (arr, file) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].absoluteUrl === file.absoluteUrl) {
                    arr.splice(i, 1);
                    return false;
                }
            }
        },
        goOpenShop () {
            this.$http.put(this.$api.point.openShop, {
                usrCompanyId: this.companyId,
                shopsetup: 1
            }).then(res => {
                if (res.data.code === 0) {
                    let userinfo = JSON.parse(localStorage.getItem('userInfo'));
                    userinfo.shopsetup = 1;
                    localStorage.setItem('userInfo', JSON.stringify(userinfo));
                    this.isShoped = true;
                    return;
                }
                this.$message.error(res.data.message);
            });
        },
        submit () {
            if (!this.form.provinceId) {
                this.$message.error('企业省份不能为空');
                return;
            }
            if (!this.form.cityId) {
                this.$message.error('企业城市不能为空');
                return;
            }
            if (!this.form.districtId) {
                this.$message.error('企业区域不能为空');
                return;
            }
            if (!this.form.address) {
                this.$message.error('企业地址不能为空');
                return;
            }
            if (!this.form.profile) {
                this.$message.error('企业介绍不能为空');
                return;
            }
            this.companyLinks.some(item => {
                if (item.linkUrl && !item.content) {
                    this.$message.error('请填写相关链接文字');
                    this.flag = false;
                    return item;
                } else {
                    this.flag = true;
                }
            });
            if (!this.flag) {
                return false;
            }
            this.form.companyLinkModels = this.companyLinks;
            if (this.imgList1.length === 0) {
                this.$message.error('请上传企业LOGO');
                return;
            }
            if (this.imgList2.length === 0) {
                this.$message.error('请上传Banner图片');
                return;
            }
            if (this.imgList3.length === 0) {
                this.$message.error('请上传企业介绍图片');
                return;
            }
            // if (this.imgList4.length === 0) {
            //     this.$message.error('请上传荣誉资质图片');
            //     return;
            // }
            this.companyProfileImgDtoList = this.companyProfileImgDtoList.concat(this.imgList1, this.imgList2, this.imgList3, this.imgList4);
            this.form = Object.assign(this.form, {companyProfileImgDtoList: this.companyProfileImgDtoList});
            this.form.companyId = this.defaultCompanyId;
            this.$http.post(this.$api.shop.save, this.form).then(res => {
                if (res.data.code === 0) {
                    this.$message.success('提交成功');
                    return;
                }
                this.$alert(res.data.message, '出错了', {type: 'error'});
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    .none-shop{
        text-align: center;
        padding-top: 50px;
        font-size: 12px;
        img{
            width: 68px;
        }
        button{
            margin-top: 10px;
        }
    }
    .my-single-row {
        .col {
            width: 19.7%;
            display: inline-block;
        }
        .col:nth-last-child(1) {
            width: 39.1%;
        }
    }
    .shop {
        .header {
            padding: 10px 20px;
            border-bottom: 1px solid #ebeef5;
            box-sizing: border-box;
            .title {
                color: $color-title;
                font-size: 16px;
                margin-right: 24px;
            }
        }
        .my-form {
            .tips {
                color: $color-minor;
            }
        }
    }
    .jian {
        width: 86%;
    }
    .form-lz {
        position: relative;
        .iconfont {
            cursor: pointer;
        }
        .add {
            margin-right: 30px;
            position: absolute;
            bottom: 9px;
            right: 0;
        }
    }
</style>
