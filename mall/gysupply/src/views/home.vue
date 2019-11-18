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
                        <dd class="button-box"><a href="javascript:;" @click="goApply(1)" class="gy-button-extra">申请代采</a></dd>
                    </dl>
                </div>
            </div>
            <div class="item">
                <div class="inner">
                    <div class="fr"><img src="../assets/images/kernel-5.jpg" alt=""></div>
                    <dl class="copy">
                        <dt>赊销业务</dt>
                        <dd>为信誉和资质良好的企业提供先货后款模式，匹配优质供应商为企业提前释放货权，先提货后付款的优质服务。</dd>
                        <dd class="button-box"><a href="javascript:;" @click="goApply(3)" class="gy-button-extra">申请赊销</a></dd>
                    </dl>
                </div>
            </div>
            <div class="item">
                <div class="inner">
                    <div class="fl"><img src="../assets/images/kernel-2.jpg" alt=""></div>
                    <dl class="copy">
                        <dt>货押业务</dt>
                        <dd>作为买卖双方指定的中间方，同时签订采购和销售合同，买方向中间方支付一定金额的保证金后，再由中间方向卖方全款采购，最后按双方指定的的方式销售给买方。</dd>
                        <dd class="button-box"><a href="javascript:;" @click="goApply(2)" class="gy-button-extra">申请货押</a></dd>
                    </dl>
                </div>
            </div>
            <div class="item">
              <div class="inner">
                <div class="fr"><img src="../assets/images/kernel-4.jpg" alt=""></div>
                <dl class="copy">
                  <dt>平安银行税金贷</dt>
                  <dd>
                    <ul class="pingan-info">
                      <li><span>融资类型：</span>信用融资</li>
                      <li><span>融资期限：</span>额度3年，单笔3个月</li>
                      <li><span>融资年利率：</span>不低于10%</li>
                      <li><span>融资额度：</span>0-300万</li>
                      <li class="single-row"><span>申请条件：</span>开增值税发票的商户，营业执照满两年</li>
                      <li style="float: right"><span>发布时间：</span>2019-03-07 09:00:00</li>
                    </ul>
                  </dd>
                  <dd class="button-box">
                    <router-link :to="{name:'pinganBank'}" class="gy-button-extra">更多产品</router-link>
                  </dd>
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
        goApply (type) {
            if (!localStorage.getItem('userInfo')) {
                this.$message({
                    message: '请先登录后再继续。',
                    type: 'warning'
                });
                return;
            }
            if (localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')).companyTypeId !== 1) {
                this.$message({
                    message: '很抱歉，非贸易公司暂时不能申请金融服务。',
                    type: 'warning'
                });
                return;
            }
            location.href = '/my/#/supply/add?type=' + type;
        }
    }
};
</script>
