<template>
    <div class="footer">
        <div class="menu">
            <div class="inner">
                <dl>
                    <dt>联系我们</dt>
                    <dd><a href="http://chinayie.cn/contactus.php">公司地址</a></dd>
                    <dd><a href="http://www.chinayie.cn/index.php?m=content&c=index&a=lists&catid=37">诚聘英才</a></dd>
                    <dd><a href="http://chinayie.cn/contactus.php">联系我们</a></dd>
                </dl>
                <dl>
                    <dt>关于我们</dt>
                    <dd><a href="http://chinayie.cn/about_speech.php">董事长致辞</a></dd>
                    <dd><a href="http://chinayie.cn/about_structure.php">组织架构</a></dd>
                    <dd><a href="http://chinayie.cn/about_bigevent.php">企业大事记</a></dd>
                </dl>
                <dl>
                    <dt>公司信息</dt>
                    <dd><a href="http://chinayie.cn/about.php">公司介绍</a></dd>
                    <dd><a href="http://chinayie.cn/about_culture.php">企业文化</a></dd>
                    <dd><a href="http://chinayie.cn/about_honor.php">荣誉资质</a></dd>
                </dl>
                <ul class="ewm">
                    <li><img src="../assets/images/ewm-wechat.png" alt=""><span>微信</span></li>
                    <li><img src="../assets/images/ewm-app.png" alt=""><span>APP</span></li>
                </ul>
            </div>
        </div>
        <div class="copyright">
            <div class="inner">
                <span><a target="_blank" href="https://pic.chinayie.com/cdn/yyzz.jpg"><img src="https://pic.chinayie.com/cdn/ib.png"></a></span><span id="kxscript"></span><span class="copy">上海国烨跨境电子商务有限公司 | Copyright &copy; 2015 - 2019  国烨 chinayie.com 版权所有 <br>沪ICP备15040931号-1 | ICP证：沪B2-20160174<br/><a target="_blank" href="https://pic.chinayie.com/cdn/yyzz.jpg">营业执照</a> | <a target="_blank" href="https://pic.chinayie.com/cdn/whpzz.jpg">危险品经营许可证</a></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {};
    },
    mounted () {
        this.handleKx();
    },
    methods: {
        handleKx () {
            let kx = '<script src=' + 'http://kxlogo.knet.cn/seallogo.dll?sn=e15111331010961452erxd000000&size=0' + '><' + '/script>';
            // let kx = '<a data-v-525a292d="" href="http://www.kxnet.cn" rel="nofollow" target="_blank"><img data-v-525a292d="" src="http://static.mall.chinayie.com/img/sgs.png"></a>';
            document.getElementById('kxscript').innerHTML = kx;
        }
    }
};
</script>
<style lang="scss" scoped>
    .footer {
        color: #bbb;
        a{
            color: #bbb;
        }
        .menu {
            background-color: #333;
            padding-top: 35px;
            .inner{
                overflow: hidden;
                margin: 0 auto;
                width: 1200px;
                line-height: 1;
                padding-bottom: 35px;
            }
            dl {
                float: left;
                margin-right: 80px;
                dt {
                    font-size: 18px;
                    color: #ddd;
                    margin-bottom: 20px;
                }
                dd {
                    margin-top: 15px;
                    color: #bbb;
                }
            }
            .ewm {
                float: right;
                li {
                    display: inline-block;
                    margin-left: 40px;
                    text-align: center;
                    span {
                        display: block;
                        margin-top: 15px;
                    }
                }
                img {
                    width: 115px;
                    height: auto;
                    border: 5px solid #fff;
                }
            }
        }
        .copyright {
            background-color: #000;
            padding-bottom: 35px;
            color: #999;
            a{
                color: #999;
            }
            .inner{
                margin: 0 auto;
                width: 1200px;
                padding-top: 35px;
                text-align: center;
            }
            span {
                display: inline-block;
                vertical-align: middle;
                margin: 0 10px;
                &.copy {
                    text-align: left;
                }
            }
        }
    }
</style>
