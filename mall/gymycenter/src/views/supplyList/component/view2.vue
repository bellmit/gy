<template>
    <div>
        <div class="gy-form-group">
            <span class="l">服务类型</span>
            {{scsAppModel.serviceTypeName || '--'}}
        </div>
        <div class="gy-form-group" v-if="scsAppModel.serviceTypeId === 2">
            <span class="l">采购公司</span>
            {{scsAppModel.thirdPartyName || '--'}}
        </div>
        <div class="gy-form-group" v-if="[1, 3].includes(scsAppModel.serviceTypeId)">
            <span class="l">指定供应商</span>
            {{scsAppModel.thirdPartyName || '无'}}
        </div>
        <div class="gy-form-group">
            <span class="l">商品名称</span>
            {{scsAppModel.skuName || '--'}}
        </div>
        <div class="gy-form-group" v-if="[1, 3].includes(scsAppModel.serviceTypeId)">
            <span class="l">服务周期</span>
            {{scsAppModel.period || '--'}} 天
        </div>
        <div class="gy-form-group">
            <span class="l">数量</span>
            {{scsAppModel.productAmount || '--'}} 吨
        </div>
        <div class="gy-form-group" v-if="[1, 3].includes(scsAppModel.serviceTypeId)">
            <span class="l">市场预估价</span>{{scsAppModel.productPriceMax}} 元/吨
        </div>
        <div class="gy-form-group" v-if="scsAppModel.serviceTypeId === 2">
            <span class="l">货物估值</span>{{scsAppModel.fundDemand}} 万元
        </div>
        <div class="gy-form-group" v-if="scsAppModel.serviceTypeId === 2">
            <span class="l">服务周期</span>
            {{scsAppModel.period || '--'}} 天
        </div>
        <div class="gy-form-group">
            <span class="l">交割库</span>
            {{scsAppModel.deliveryWarehouseName || '--'}}
        </div>
        <div class="gy-form-group" v-if="[1, 3].includes(scsAppModel.serviceTypeId)">
            <span class="l">货物需运输</span>
            {{needTransport[scsAppModel.needTransport] || '--'}}
        </div>
        <div class="gy-form-group">
            <span class="l">有效日期</span>
            {{scsAppModel.effectiveDate | date}} 以前
        </div>
        <div class="gy-form-group">
            <span class="l">申请备注</span>
            <div>{{scsAppModel.memo || '--'}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'view1',
    props: {
        scsAppModel: {
            assigneeUserName: null, // 受理人
            code: null, // 单号
            companyAddress: null, // 客户地址
            companyId: null, // 客户公司Id
            companyName: null, // 客户公司名称
            contactName: null, // 联系人名称
            contactPhone: null, // 联系方式
            createdBy: null, // integer($int64)
            createdDate: null, // string($date-time)
            deliveryWarehouseId: null, // 交割库id
            deliveryWarehouseName: null, // 交割库名称
            disposed: null, // 0: 未经过处置 1 经过处置  是否处置过
            effectiveDate: null, // 有效日期
            endTime: null, // 高级搜索结束时间
            id: null, // integer($int64)
            keywords: null, // string
            memo: null, // 备注
            needTransport: null, //  0: 不需要 1 需要  是否需要运输
            num: null, // 标签页数量
            period: null, // (资金)周期
            prdSkuId: null, // 产品ID
            productAmount: null, // 商品数量
            productId: null, // 商品Id
            productName: null, // 商品名称
            productPriceMax: null, // 商品高价格
            productPriceMin: null, // 商品低价格
            providerCompanyId: null, // 服务商公司Id(此字段为冗余)
            providerCompanyName: null, // 服务商公司名称(此字段为冗余)
            serviceTypeId: null, // 服务类型Id
            serviceTypeName: null, // 服务类型名称
            shortOverflowRate: null, // 溢短装
            skuCode: null, // 商品编号
            skuName: null, // 商品名称
            skuPictureUrl: null, // 商品图片url
            startTime: null, // 高级搜索开始时间
            status: null, //  10 平台审核 20 服务商审核 21 立项中 22 申请驳回 30 单证执行 40 违约和处理 98 已拒绝 99 已完成 状态
            statusName: null, // 状态名称
            thirdPartyFlag: null, // 0无 1有  第三方标志
            thirdPartyId: null, // 第三方公司Id
            thirdPartyName: null, // 第三方公司名称
            topCatalogueId: null, // 产品顶级分类id
            unit: null, //  d 天 m 月 单位
            updatedBy: null, // integer($int64)
            updatedDate: null, // string($date-time)
            valid: null // integer($int32)
        }
    },
    data () {
        return {
            needTransport: ['不需要', '需要']
        };
    }
};
</script>

<style scoped>

</style>
