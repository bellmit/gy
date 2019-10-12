<!--
    签约银行
-->

<template>
    <div>
        <form action="javascript:;" name="bankcompany">
            <div class="gy-form">
                <div class="gy-form-group">
                    <span class="l">开通资金帐户</span>
                    <img src="../../../../assets/images/bank.png" class="img-bank" alt="">
                </div>
                <div class="gy-form-group single-row card-group">
                    <span class="l"><strong>*</strong>法人身份证</span>
                    <el-upload
                        action="api"
                        list-type="picture-card"
                        multiple
                        :data="{filetype: 5}"
                        :http-request="companyFileUpload">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <span class="card-tips">请上传正反面身份证。</span>
                </div>
                <div class="gy-form-button">
                    <button class="gy-button-extra" @click="bankSubmit">提交</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'accountBank',
    data () {
        return {
            companyInfo: {
                companyFileModelList: [],
                companyTypeId: '',
                name: '',
                phone: '',
                provinceId: '',
                cityId: '',
                districtId: '',
                address: ''
            }
        };
    },
    methods: {
        companyFileUpload () {

        },
        bankSubmit () {

        }
    }
};
</script>

<style lang="scss" scoped>

</style>
