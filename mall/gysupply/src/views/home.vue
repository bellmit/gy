<template>
    <div class="supply-home">
        <!--START Kv-->
        <div class="kv" :style='"background-image: url(" + bgimage.banner + ")"'></div>
        <!--END Kv-->
        <!--START 核心服务-->
        <div class="main-title">
            <h2>供应链服务</h2>
        </div>
        <div class="kernel-service">
            <div class="item">
                <div class="inner">
                    <div class="fl"><img src="../assets/images/kernel-1.jpg" alt=""></div>
                    <dl class="copy">
                        <dt>代采业务</dt>
                        <dd>为信誉和资质良好的企业提供代采服务，接受采购方委托采购相应的产品，一次或分批次销售给采购方的业务模式。</dd>
                        <dd class="button-box"><a href="javascript:;" @click="goApply" class="gy-button-extra">申请代采</a></dd>
                    </dl>
                </div>
            </div>
            <div class="item" style="background-color: #f7f8fa">
                <div class="inner">
                    <div class="fr"><img src="../assets/images/kernel-2.jpg" alt=""></div>
                    <dl class="copy">
                        <dt>代采代销业务</dt>
                        <dd>作为上下游企业的中间方，同时签订采购和销售合同，下游企业支付一定金额的保证金后再向上游企业全款采购，最后按指定的的方式销售给下游。</dd>
                    </dl>
                </div>
            </div>
            <div class="item">
                <div class="inner">
                    <div class="fl"><img src="../assets/images/kernel-3.jpg" alt=""></div>
                    <dl class="copy">
                        <dt>个性化定制</dt>
                        <dd>请致电我们的客服人员：400-777-6777。</dd>
                    </dl>
                </div>
            </div>
        </div>
        <!--END 核心服务-->
    </div>
</template>

<script>
import banner from '../assets/images/banner.jpg';
export default {
    data () {
        return {
            bgimage: {
                banner: banner
            }
        };
    },
    methods: {
        goApply () {
            if (!localStorage.getItem('userInfo')) {
                this.$message({
                    message: '请先登录后再继续。',
                    type: 'warning'
                });
                return;
            }
            if (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).companyTypeId !== 1) {
                this.$message({
                    message: '很抱歉，非贸易公司暂时不能申请供应链服务。',
                    type: 'warning'
                });
                return;
            }
            location.href = '/my/#/supply/add';
        }
    }
};
</script>
