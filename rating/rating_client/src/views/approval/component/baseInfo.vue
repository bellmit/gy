<template>
    <div class="base-info">
    <div class="gy-form">
        <div class="gy-form-group">
            <span class="l">公司名称</span>
            <span class="2">{{baseData.name}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">公司电话</span>
            <span>{{baseData.phone}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">公司类型</span>
            <span class="2">
                <template v-if="baseData.companyTypeId===1">
                    交易公司
                </template>
                <template v-else-if ="baseData.companyTypeId===2">
                    承运商
                </template>
                <template v-else-if ="baseData.companyTypeId===3">
                    仓储服务商
                </template>
            </span>
        </div>
        <div class="gy-form-group">
            <span class="l">邮箱</span>
            <span>{{baseData.email}}</span>
        </div>
        <div  v-if ="baseData.companyTypeId===2" class="gy-form-group">
            <span class="l">承运范围</span>
            <span v-for='(item, index) in baseData.carriageScopeList' :key='index'>{{item==0?'危险品 ':'普货 '}}</span>
        </div>
         <div class="gy-form-group">
            <span class="l">公司地址</span>
            <span>{{baseData.companyAdress}}</span>
        </div>
        <div v-for='(item, index) in baseData.companyFileModelList' :key='index' class="gy-form-group">
            <span class="l">{{item.fileType|setFileType}}</span>
            <img :src="item.filePath" alt="">
        </div>
    </div>
    <div class="gy-form-group single-row btn-wrap">
        <button class="gy-button-normal bgColor" @click = approval>前往核准信息</button>
    </div>
    </div>
</template>

<script>
export default {
    name: 'baseInfo',
    props: {
        baseData: Object
    },
    methods: {
        approval: function () {
            this.$emit('approval');
        }
    },
    created () {
        console.log(this.baseData);
    },
    filters: {
        setFileType (fileType) {
            switch (fileType) {
            case 0:
                fileType = '三证合一';
                break;
            case 1:
                fileType = '工商营业执照';
                break;
            case 2:
                fileType = '组织机构代码证';
                break;
            case 3:
                fileType = '税务登记证';
                break;
            case 4:
                fileType = '危险品经营资质证';
                break;
            case 5:
                fileType = '法人身份证';
                break;
            case 6:
                fileType = 'CA认证申请书';
                break;
            case 7:
                fileType = 'CA认证授权书';
                break;
            case 8:
                fileType = '管理员授权书';
                break;
            case 9:
                fileType = '运输资料';
                break;
            case 10:
                fileType = '仓储资质';
                break;
            }
            return fileType;
        }

    }
};
</script>

<style scoped lang="scss">
    .base-info {
    .btn-wrap{
        text-align: right;
    .bgColor{
        background: #F2AC4C;color:#fff;
    }
    }
    }
    .gy-form-group {
        img {
        width: 77px;
        height: 77px;
        border: 1px solid $color-border;
        border-radius: 2px;
    }
    }
</style>
