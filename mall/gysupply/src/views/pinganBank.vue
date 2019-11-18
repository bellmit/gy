<template>
  <div class="supply-home">
    <!--START Kv-->
    <div class="kv" :style='"background-image: url(" + bgimage.banner + ")"'></div>
    <!--END Kv-->
    <div class="pinganBank">
      <div class="my-pinganBank">
        <div class="left-box">
          <div class="product-box">
            <div class="product-title-top">
              <div class="product-title">产品列表</div>
            </div>
            <div class="center-product">
              <div class="center-img-left">
                <img src="../assets/images/taxes.png" alt="">
              </div>
              <div class="center-img-right">
                <div class="title1"> 税金贷</div>
                <div class="center-font">
                  <div class="left-font">
                    <div class="font-top">融资类型：&nbsp;&nbsp;&nbsp;&nbsp;信用融资</div>
                    <div class="font-top">融资年利率：不低于10%</div>
                  </div>
                  <div class="right-font">
                    <div class="font-top">融资期限：&nbsp;&nbsp;额度3年，单笔3个月</div>
                    <div class="font-top">融资额度：&nbsp;&nbsp;0-300万</div>
                  </div>
                </div>
                <div class="font-top">申请条件：&nbsp;&nbsp;&nbsp;开增值税发票的商户，营业执照满两年</div>
                <div class="font-top">发布时间：&nbsp;&nbsp;&nbsp;2019-03-07 09:00:00</div>
                <div  class="button-top">
                  <a href="http://www.orangebank.com.cn/sjd.html" target="_blank" class="gy-button-extra">立即申请</a>
                </div>
              </div>
            </div>
            <div class="center-product" style="border-bottom: none">
              <div class="center-img-left">
                <img src="../assets/images/invoice.png" alt="">
              </div>
              <div class="center-img-right">
                <div class="title1"> 发票贷</div>
                <div class="center-font">
                  <div class="left-font">
                    <div class="font-top">融资类型：&nbsp;&nbsp;&nbsp;&nbsp;应收账款融资</div>
                    <div class="font-top">融资年利率：8%-10%</div>
                  </div>
                  <div class="right-font">
                    <div class="font-top">融资期限：&nbsp;&nbsp;额度3年，单笔6个月</div>
                    <div class="font-top">融资额度：&nbsp;&nbsp;最高500万</div>
                  </div>
                </div>
                <div class="font-top">申请条件：&nbsp;&nbsp;&nbsp;开增值税发票的商户，营业执照满三年</div>
                <div class="font-top">发布时间：&nbsp;&nbsp;&nbsp;2019-03-07 09:00:00</div>
                <div  class="button-top">
                  <a href="http://www.orangebank.com.cn/scgyd.html" target="_blank" class="gy-button-extra">立即申请</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-box">
          <div class="contact">
            <div class="product-title-top">
              <div class="product-title">联系方式</div>
            </div>
            <div class="contact-center">
              <div class="contact-box">
                <div class="left-contact-box">
                  <div class="font-top">机构名称：</div>
                  <div class="font-top">机构地址：</div>
                  <div class="font-top2">邮政编码：</div>
                  <div class="font-top">联系电话：</div>
                </div>
                <div class="right-contact-box">
                  <div class="font-top">平安银行股份有限公司</div>
                  <div class="font-top">中国广东省深圳市深南东路<br>5047号</div>
                  <div class="font-top">518001</div>
                  <div class="font-top">95511-3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import banner from '../assets/images/pingan-banner.jpg';
export default {
    data () {
        return {
            bgimage: {
                banner: banner
            }
        };
    }
};
</script>
<style lang="scss" scoped>
.pinganBank{
.my-pinganBank{
  overflow: hidden;
  width: 1200px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  .left-box{
    float: left;
    .product-box{
        background: #fff;
        width: 890px;
      .product-title-top{
        border-bottom: 1px solid #E6EAEA;
        margin: 0 15px;
      }
      .product-title{
        color: #000;
        font-size: 16px;
        width: 80px;
        height: 50px;
        line-height: 50px;
        border-bottom: 2px solid #E0370F;
      }
      .center-product{
        overflow: hidden;
        margin-top: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #E6EAEA;
        .center-img-left{
          float: left;
          margin: 0 15px;
        }
        .center-img-right{
          float: left;
          .title1{
            font-size: 16px;
            color: #333;
            font-weight: bold;
          }
          .center-font{
           overflow: hidden;
            font-size: 14px;
            .left-font{
              float: left;
              margin-right: 40px;
            }
            .right-font{
              float: left;
            }
          }
          .font-top{
            margin-top: 8px;
          }
          .button-top{
            margin-top: 10px;
          }
        }
      }
    }
  }
  .right-box{
    float: left;
    margin-left: 15px;
    .contact{
      background: #fff;
      width: 280px;
      .product-title-top{
        border-bottom: 1px solid #E6EAEA;
        margin: 0 15px;
      }
      .product-title{
        color: #000;
        font-size: 16px;
        width: 80px;
        height: 50px;
        line-height: 50px;
        border-bottom: 2px solid #E0370F;
      }
      .contact-center{
        padding-bottom: 50px;
        .contact-box{
          overflow: hidden;
          padding: 0 15px;
          .left-contact-box{
            float: left;
            color: #333;
            font-weight: bold;
            font-size: 14px;
          }
          .right-contact-box{
            float: left;
            font-size: 14px;
          }
          .font-top{
            margin-top: 8px;
          }
          .font-top2{
            margin-top: 33px;
          }
        }
      }
    }
  }
}
}
</style>
