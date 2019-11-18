<!--
    电子签章
-->

<template>
    <div>
        <dl class="t">
            <dt>电子签章（CA交割）</dt>
            <dd>上传的文件需为加盖公章的扫描件，展示风格支持jpg，jpeg，gif，png风格，支持2M以内的图片。</dd>
        </dl>
        <form action="javascript:;" name="cacompany">
            <div class="gy-form">
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
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>CA认证申请书</span>
                    <el-upload
                        action="api"
                        list-type="picture-card"
                        :data="{filetype: 6}"
                        multiple
                        :http-request="companyFileUpload">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>CA认证授权书</span>
                    <el-upload
                        action="api"
                        list-type="picture-card"
                        :data="{filetype: 7}"
                        multiple
                        :http-request="companyFileUpload">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
                <div class="gy-form-button">
                    <button class="gy-button-extra" @click="caSubmit">提交</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'accountSignture',
    data () {
        return {

        };
    }
};
</script>

<style lan="scss">

</style>
