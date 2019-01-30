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
                    <input class="gy-input" v-model="form.phone" disabled>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>企业地址</span>
                    <input class="gy-input" v-model="form.address">
                </div>
                <div class="gy-form-group single-row">
                    <span class="l"><strong>*</strong>企业介绍</span>
                    <textarea class="gy-textarea" v-model="form.profile"></textarea>
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
                        :limit="1"
                        action="api"
                        :data="{type: 3}"
                        list-type="picture-card"
                        :on-remove="BannerRemove"
                        :http-request="uploadImg"
                        :file-list="imgList2">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <p class="tips">请上传Banner图片（最多1张）</p>
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
                    <span class="l"><strong>*</strong>荣誉资质</span>
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
            phone: null,
            url: null,
            companyId: JSON.parse(localStorage.getItem('userInfo')).companyId,
            form: {
                name: '',
                phone: '',
                address: '',
                profile: ''
            },
            imgList1: [],
            imgList2: [],
            imgList3: [],
            imgList4: [],
            companyProfileImgDtoList: [],
            isShoped: false,
            companyImgUploaded: []
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            const me = this;
            localStorage.getItem('userInfo') && (this.isShoped = JSON.parse(localStorage.getItem('userInfo')).shopsetup === 1);
            me.$http.post(me.$api.shop.profile, {companyId: this.companyId})
                .then(function (res) {
                    if (res.data.code === 0) {
                        me.form = res.data.data;
                        if (me.form.companyLogo !== null) {
                            me.imgList1.push({url: me.form.companyLogo});
                            me.companyProfileImgDtoList.push({absoluteUrl: me.imgList1[0].url, type: 5});
                        }
                        if (me.form.bannerAbsoluteUrl !== null) {
                            me.imgList2.push({url: me.form.bannerAbsoluteUrl});
                            me.companyProfileImgDtoList.push({absoluteUrl: me.imgList2[0].url, type: 3});
                        }
                        if (me.form.profileAbsoluteUrl !== null) {
                            me.imgList3.push({url: me.form.profileAbsoluteUrl});
                            me.companyProfileImgDtoList.push({absoluteUrl: me.imgList3[0].url, type: 4});
                        }
                        if (me.form.certificateAbsoluteUrlList !== []) {
                            me.form.certificateAbsoluteUrlList.forEach((item, index) => {
                                me.imgList4.push({url: item});
                                me.companyProfileImgDtoList.push({absoluteUrl: item, type: 2});
                            });
                        }
                    }
                });
        },
        // banner
        uploadImg (file) {
            const me = this;
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            me.$http.post(me.$api.shop.imgUploadFile, formData, headers)
                .then(function (res) {
                    if (res.data.code === 0) {
                        me.companyProfileImgDtoList.push({
                            absoluteUrl: res.data.data.absoluteUrl,
                            type: file.data.type
                        });
                    }
                });
        },
        BannerRemove (file) {
            let arr = this.companyProfileImgDtoList;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].absoluteUrl === file.url) {
                    this.companyProfileImgDtoList.splice(i, 1);
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
            this.companyImgUploaded = [];
            this.companyProfileImgDtoList.forEach(item => {
                this.companyImgUploaded.push(item.type);
            });
            if (!this.form.address) {
                this.$message.error('企业地址不能为空');
                return;
            }
            if (!this.form.profile) {
                this.$message.error('企业介绍不能为空');
                return;
            }
            if (!this.companyImgUploaded.includes(5)) {
                this.$message.error('请上传企业LOGO');
                return;
            }
            if (!this.companyImgUploaded.includes(4)) {
                this.$message.error('请上传企业介绍图片');
                return;
            }
            if (!this.companyImgUploaded.includes(3)) {
                this.$message.error('请上传Banner图片');
                return;
            }
            if (!this.companyImgUploaded.includes(2)) {
                this.$message.error('请上传荣誉资质图片');
                return;
            }
            this.form = Object.assign(this.form, {companyProfileImgDtoList: this.companyProfileImgDtoList});
            this.$http.post(this.$api.shop.save, this.form).then(res => {
                // if (res.data.code === 0) {
                //     this.$message.success('提交成功');
                // }
                res.data.code === 0 && this.$message.success('提交成功');
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
</style>
