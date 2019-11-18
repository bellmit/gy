<template>
    <div>
        <div class="gy-form-group">
            <span class="l">公司名称</span>
            {{scsAppModel.companyName}}
        </div>
        <div class="gy-form-group">
            <span class="l">公司地址</span>
            {{scsAppModel.companyAddress}}
        </div>
        <div class="gy-form-group">
            <span class="l">联系人</span>
            {{scsAppModel.contactName}}
        </div>
        <div class="gy-form-group" style="color: #4a90e2;">
            <span class="l">联系电话</span>
            {{scsAppModel.contactPhone}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'view1',
    props: {
        scsAppModel: {
            companyName: null,
            companyAddress: null,
            contactName: null,
            contactPhone: null
        }
    }
};
</script>

<style scoped>

</style>
