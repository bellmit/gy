<template>
    <div class="essential-wrapper pay-detail essential-row-float">
        <div class="essential-item">
            <div class="essential-title">合同要素ID</div>
            <div class="essential-text">{{list.id}}</div>
        </div>
        <div class="essential-item">
            <div class="essential-title">执行操作人</div>
            <div class="essential-text">{{list.executiveName}}</div>
        </div>
        <div class="essential-item">
            <div class="essential-title">业务类型</div>
            <div class="essential-text"><span>{{list.bizType|businessTradeType}}  <span v-if="list.contractType !== 1" class="contractType">{{list.contractType|contractTradeType(list.bizType)}}</span></span></div>
        </div>
        <div class="essential-item">
            <div class="essential-title">我方公司</div>
            <div class="essential-text">{{list.targetCorpName}}</div>
        </div>
        <div class="essential-item">
            <div class="essential-title">业务操作人</div>
            <div class="essential-text">{{list.businessManagerName}}</div>
        </div>
        <div class="essential-item">
            <div class="essential-title">业务组</div>
            <div class="essential-text">{{list.orgName}}</div>
        </div>
        <div class="essential-item">
            <div class="essential-title">产品名称</div>
            <div class="essential-text">{{list.prodName}}</div>
        </div>
        <div class="essential-item">
            <div class="essential-title">创建时间</div>
            <div class="essential-text">{{list.createdDate | date(list.createdDate)}}</div>
        </div>
        <div class="essential-item">
            <div class="essential-title">盖章销售合同</div>
            <div class="essential-text">
                <div class="essential-text">
                    <span v-if="list.buyerInfo.fileAttachList && list.buyerInfo.fileAttachList.length !== 0"
                          @click="EmitDialog(5)"><i class="iconfont icon-photo"></i></span>
                    <span v-else-if="list.buyerInfo.fileDocUrl && list.buyerInfo.fileDocUrl.length !== 0"
                          @click="EmitDialog(6)"><i class="iconfont icon-photo"></i></span>
                    <span v-else><i class="iconfont icon-photo-null"></i></span>
                </div>
            </div>
        </div>
        <div class="essential-item">
            <div class="essential-title">盖章采购合同</div>
            <div class="essential-text">
                <div class="essential-text">
                    <span v-if="list.sellerInfo.fileAttachList && list.sellerInfo.fileAttachList.length !== 0"
                          @click="EmitDialog(3)"><i class="iconfont icon-photo"></i></span>
                    <span v-else-if="list.sellerInfo.fileDocUrl && list.sellerInfo.fileDocUrl.length !== 0"
                          @click="EmitDialog(4)"><i class="iconfont icon-photo"></i></span>
                    <span v-else><i class="iconfont icon-photo-null"></i></span>
                </div>
            </div>
        </div>
        <!--<div class="essential-item">-->
            <!--<div class="essential-title">采购盖章合同</div>-->
            <!--<div class="essential-text">-->
                <!--<div class="essential-text">-->
                    <!--<span v-if="list.sellerInfo.fileAttachCertifiedList && list.sellerInfo.fileAttachCertifiedList.length !== 0"-->
                          <!--@click="EmitDialog(7)"><i class="iconfont icon-photo"></i></span>-->
                    <!--<span v-else><i class="iconfont icon-photo-null"></i></span>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="essential-item">-->
            <!--<div class="essential-title">销售盖章合同</div>-->
            <!--<div class="essential-text">-->
                <!--<div class="essential-text">-->
                    <!--<span v-if="list.buyerInfo.fileAttachCertifiedList && list.buyerInfo.fileAttachCertifiedList.length !== 0"-->
                          <!--@click="EmitDialog(8)"><i class="iconfont icon-photo"></i></span>-->
                    <!--<span v-else><i class="iconfont icon-photo-null"></i></span>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
export default {
    inject: ['showImg'],
    props: {
        list: {
            default: null
        }
    },
    methods: {
        EmitDialog (type) {
            switch (type) {
            case 3:
                this.showImg('', 3);
                break;
            case 4:
                this.showImg('', 4);
                break;
            case 5:
                this.showImg('', 5);
                break;
            case 6:
                this.showImg('', 6);
                break;
            case 7:
                this.showImg('', 7);
                break;
            case 8:
                this.showImg('', 8);
                break;
            default :
                break;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
  .contractType {
    background-color: yellow;
  }
  .essential-row-float .essential-item .essential-title {
    flex: 0 0 110px;
  }
</style>
