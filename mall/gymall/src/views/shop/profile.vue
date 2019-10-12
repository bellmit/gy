<template>
    <div class="mall-profile lic">
      <!--header-->
      <div class="profile-header">
            <el-carousel trigger="click">
                <el-carousel-item v-for="(item, index) in result.bannerAbsoluteUrlList" :key="index" >
                    <div class="item bg-img" :style='"background-image: url(" + item + ")"'></div>
                </el-carousel-item>
            </el-carousel>
      </div>
      <!--企业介绍-->
      <section class="firm clearfix">
        <div class="firm-left">
          <img class="firm-img" :src="result.profileAbsoluteUrl" alt="">
        </div>
        <div class="firm-right">
          <div class="gy-h1">企业介绍</div>
          <div class="firm-text">
              <p v-html="formatSolution(result.profile)"></p>
          </div>
          <div class="gy-h1" style="margin-top: 20px;">{{result.linkTitle}}</div>
          <div class="firm-text link-wrap">
            <div class="link-item" v-for="(item, index) in result.companyLinks" :key="index">
                <span class="l"><a target="_blank" :href="item.linkUrl">{{item.content}}</a></span>
            </div>
          </div>
        </div>
      </section>
      <!--荣誉资质-->
      <div class="honor" v-if="sliders.length > 0">
            <div class="gy-h1 title">荣誉资质</div>
            <el-carousel :interval="4000" arrow="always" type="card" height="200px" indicator-position="none">
                <el-carousel-item v-for="(item, index) in sliders" :key="index">
                    <img :src="item" alt="" @click="visible = true, honorItemImg = item">
                </el-carousel-item>
            </el-carousel>
      </div>
      <!--联系我们-->
      <section class="contact">
        <div class="gy-h1 typeArea lianxi">联系我们</div>
        <div class="contact-info">
          <div class="info-left">
              <div id="allmap" ref="allmap"></div>
          </div>
          <div class="info-right">
            <p class="iphone gy-h4">联系方式 <em></em><span>{{result.phone}}</span></p>
            <p class="address gy-h4"><span class="address-span-l">地址</span> <em></em><span class="address-span">{{result.completeAddress}}</span></p>
          </div>
        </div>
      </section>
        <!-- 预览图片 -->
        <el-dialog title="资质预览" :visible.sync="visible" width="400px">
            <img class="previewer-img-detail" :src="honorItemImg">
        </el-dialog>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            companyId: this.$route.query.companyId,
            honorItemImg: null,
            visible: false,
            sliders: [],
            result: {}
        };
    },
    created () {
        window.scrollTo(0, 0);
    },
    mounted () {
        this.init();
    },
    methods: {
        init () {
            this.$http.post(this.$api.shop.profile, {companyId: this.companyId}).then(res => {
                if (res.data.code === 0) {
                    this.result = res.data.data;
                    this.sliders = this.result.certificateAbsoluteUrlList.slice(0, 6);
                    this.map();
                }
            });
        },
        // 百度地图
        map () {
            let map = new BMap.Map(this.$refs.allmap);
            let point = new BMap.Point(this.result.lng, this.result.lat);
            map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
            map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
            function myFun () {
                var pp = local.getResults().getPoi(0).point; // 获取第一个智能搜索的结果
                map.centerAndZoom(pp, 18);
                map.addOverlay(new BMap.Marker(pp)); // 添加标注
            }
            let local = new BMap.LocalSearch(map, {onSearchComplete: myFun});
            local.search(this.result.completeAddress);
        },
        formatSolution (s) {
            if (s) {
                return s.replace(/\s/g, '<br/>');
            } else {
                return '';
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.mall-profile {
    background-color: #fff;
    .bg-img{
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .profile-header {
        .item {
            height: 220px;
        }
    }
    .honor img {
        height: 200px;
    }
    .el-carousel__item {
        text-align: center;
        background-color: #fff !important;
    }
   #allmap{
    overflow: hidden;
    height: 319px;
  }
  .carousel-img {
      width: 100%;
      height: 100%;
  }
   .img {
     width: 100%;
     height: 220px;
  }
  .firm-img {
    width: 332px;
    height: 332px;
    border-radius: 50%;
  }
  .firm {
    width: 1200px;
    min-width: 1200px;
    margin: 0 auto;
    // height: 512px;
    margin-bottom: 4.7%;
    clear: both;
    padding-top: 2.6%;
    .firm-left {
      width: 332px;
      height: 332px;
      margin-top: 3.7%;
      float: left;
    }
    .firm-right {
      float: left;
      margin: 1.7% 0 0 4.7%;
      .firm-text {
        width: 760px;
        p:first-child {
          margin-top: 20px;
        }
      }
    }
    .link-right {
      float: right;
      margin: 1.7% 0 0 4.7%;
      .firm-text {
        width: 760px;
        p:first-child {
          margin-top: 20px;
        }
      }
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .honor {
    width: 1200px;
    margin: 0 auto;
    .title {
      margin-bottom: 4.7%;
    }
  }
  .contact {
    width: 1200px;
    margin: 0 auto;
    margin-top: 7.9%;
    .lianxi {
        margin-bottom: 1.7%;
    }
    .contact-info {
      width: 100%;
      height: 319px;
      padding: 0;
      margin: 0;
      clear: both;
      .info-left {
        width: 62%;
        height: 319px;
        float: left;
          img {
              width: 100%;
              height: 319px;
          }
      }
      .info-right {
        width: 38%;
        height: 319px;
        float: left;
        padding: 2% 0 0 2.8%;
        border-top: 1px solid #DCE0E4;
        em {
          width: 50px;
          display: inline-block;
        }
        .address {
          em {
            width: 83px;
          }
          .address-span-l {
            vertical-align: top;
          }
          .address-span {
            width: 71%;
            display: inline-block;
          }
        }
      }
    }
  }
  /*版心*/
  .typeArea {
    width: 1200px;
    min-width: 1200px;
    margin: 0 auto;
  }

// #slider{
//   text-align: center;
// }
.window{
  position:relative;
  width:1200px;
  height:130px;
  margin:0 auto;
  overflow:hidden;
}
.container{
  display:flex;
  position:absolute;
}
.container li img {
    height: 130px;
    margin: 0 120px;
}
.left, .right{
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  width:50px;
  height:50px;
  opacity: 0.9;
  background: #FFFFFF;
  border-radius:50%;
  cursor:pointer;
}
.left{
  left:0%;
  padding-left:12px;
  padding-top:10px;
}
.right{
  right:0%;
  padding-right:12px;
  padding-top:10px;
}
img{
  user-select: none;
}
.dots{
    position:absolute;
    bottom:10px;
    left:50%;
    transform:translateX(-50%);
  }
.dots li{
  display:inline-block;
  width:15px;
  height:15px;
  margin:0 3px;
  border:1px solid white;
  border-radius:50%;
  background-color:#333;
  cursor:pointer;
}
.dots .dotted{
  background-color:orange;
}
}
.previewer-img-detail {
    width: 100%;
}
.firm-right {
    .link-wrap {
        margin-top: 10px;
        .link-item {
            display: inline-block;
            width: 33%;
            margin-top: 10px;
            text-align: center;
            padding-right: 15px;
            box-sizing: border-box;
            overflow: hidden;
            text-overflow:ellipsis;//文本溢出显示省略号
            white-space:nowrap;//文本不会换行（单行文本溢出）
        }
        .link-item:nth-child(3n + 1) {
            text-align: left;
        }
        .link-item:nth-child(3n) {
            text-align: right;
            padding-right: 0;
        }
    }
}
</style>
