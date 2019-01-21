<template>
    <div class="clearfix">
        <div class="title">基本信息</div>
        <div class="gy-form-group">
            <span class="l">合同要素ID</span>
            <span>{{form.id}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">执行操作人</span>
            <span>{{form.executiveName}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">业务类型</span>
            <span>{{form.bizType|businessTradeType}}  <span v-if="form.contractType !== 1" class="contractType">{{form.contractType|contractTradeType(form.bizType)}}</span></span>
        </div>
      <div class="gy-form-group">
        <span class="l">我方公司</span>
        <span>{{form.targetCorpName}}</span>
      </div>
        <div class="gy-form-group" v-if="form.contractType !== 1">
            <span class="l">单边交易</span>
            <span v-if="form.contractType === 1">-</span>
            <span v-else>{{form.contractType | contractType}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">业务操作人</span>
            <span>{{form.businessManagerName}}</span>
        </div>
      <div class="gy-form-group">
        <span class="l">业务组</span>
        <span>{{form.orgName}}</span>
      </div>
        <div class="gy-form-group">
            <span class="l">产品名称</span>
            <span>{{form.prodName}}</span>
        </div>
        <div class="gy-form-group">
            <span class="l">创建时间</span>
            <span>{{form.createdDate | date(1)}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'contractBasic',
    data () {
        return {
            skuQuantity: '',
            odrContactName: '',
            form: {},
            buyerInfo: {},
            sellerInfo: {}
        };
    },
    // 0销售交割信息 1采购交割信息
    props: {
        type: String,
        query: Object
    },
    created () {
        this.contrtactBase();
    },
    methods: {
        // 合同要素基本信息
        contrtactBase () {
            this.$http.get(this.$api.contract.getdetail + '/' + this.query.contEssId).then((res) => {
                if (res.data.code === 0) {
                    this.form = res.data.data;
                    this.buyerInfo = this.form.buyerInfo;
                    this.sellerInfo = this.form.sellerInfo;
                    this.skuQuantity = this.form.buyerInfo.skuQuantity;
                    this.odrContactName = this.form.buyerInfo.odrContactName;
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    .clearfix{
        .title{
            font-size: 14px;
            color: #333333;
            margin: 20px 30px;
            font-weight: bold;
        }
        .wid100 {
            width: 100%;
        }
        .contractType {
            background-color: yellow;
        }
    }
</style>
