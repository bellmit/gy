<template>
    <div class="mall-profile lic">
      <!--header-->
      <div class="profile-header">
            <img class="img" :src="form.bannerAbsoluteUrl" alt="">
      </div>
      <!--企业介绍-->
      <section class="firm">
        <div class="firm-left">
          <img class="firm-img" :src="form.profileAbsoluteUrl" alt="">
        </div>
        <div class="firm-right">
          <div class="gy-h1">企业介绍</div>
          <div class="firm-text">
              <p v-html="formatSolution(profile)"></p>
          </div>
        </div>
      </section>
      <!--荣誉资质-->
      <section class="typeArea honor">
        <div class="gy-h1 title">荣誉资质</div>

        <div id="slider">
            <div class="window" @mouseover="stop" @mouseleave="play">
            <ul class="container" :style="containerStyle">
                <li>
                <img :src="sliders[sliders.length - 1]" alt="">
                </li>
                <li v-for="(item, index) in sliders" :key="index">
                <img :src="item" alt="">
                </li>
                <li>
                <img :src="sliders[0]" alt="">
                </li>
            </ul>
            <ul class="direction">
                <li class="left" @click="move(220, 1, speed)">
                <svg class="icon" width="30px" height="30.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M481.233 904c8.189 0 16.379-3.124 22.628-9.372 12.496-12.497 12.496-32.759 0-45.256L166.488 512l337.373-337.373c12.496-12.497 12.496-32.758 0-45.255-12.498-12.497-32.758-12.497-45.256 0l-360 360c-12.496 12.497-12.496 32.758 0 45.255l360 360c6.249 6.249 14.439 9.373 22.628 9.373z"  /></svg>
                </li>
                <li class="right" @click="move(220, -1, speed)">
                <svg class="icon" width="30px" height="30.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z"  /></svg>
                </li>
            </ul>
            </div>
        </div>
      </section>
      <!--联系我们-->
      <section class="contact">
        <div class="gy-h1 typeArea lianxi">联系我们</div>
        <div class="contact-info">
          <div class="info-left">
              <div id="allmap" ref="allmap"></div>
          </div>
          <div class="info-right">
            <p class="iphone gy-h4">联系方式 <em></em><span>{{this.phone}}</span></p>
            <p class="address gy-h4"><span class="address-span-l">地址</span> <em></em><span class="address-span">{{this.address}}</span></p>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            companyId: this.$route.query.companyId,
            form: {
                bannerAbsoluteUrl: '',
                profileAbsoluteUrl: '',
                certificateAbsoluteUrlList: []
            },
            maps: {
                lng: '', // 经度
                lat: '' // 纬度
            },
            address: '',
            phone: '',
            profile: '',
            sliders: [
                {
                    img: 'http://chinayiepic.oss-cn-shanghai.aliyuncs.com/trade/20180823/荣誉5@3x.jpg'
                },
                {
                    img: 'http://chinayiepic.oss-cn-shanghai.aliyuncs.com/trade/20180823/荣誉5@3x.jpg'
                },
                {
                    img: 'http://chinayiepic.oss-cn-shanghai.aliyuncs.com/trade/20180823/荣誉5@3x.jpg'
                },
                {
                    img: 'http://chinayiepic.oss-cn-shanghai.aliyuncs.com/trade/20180823/荣誉5@3x.jpg'
                },
                {
                    img: 'http://chinayiepic.oss-cn-shanghai.aliyuncs.com/trade/20180823/荣誉5@3x.jpg'
                },
                {
                    img: 'http://chinayiepic.oss-cn-shanghai.aliyuncs.com/trade/20180823/荣誉5@3x.jpg'
                }
            ],
            currentIndex: 1,
            distance: -220,
            transitionEnd: true,
            speed: this.initialSpeed
        };
    },
    props: {
        initialSpeed: {
            type: Number,
            default: 30
        },
        initialInterval: {
            type: Number,
            default: 4
        }
    },
    mounted () {
        this.init();
        this.initlunbo();
    },
    computed: {
        containerStyle () {
            return {
                transform: `translate3d(${this.distance}px, 0, 0)`
            };
        },
        interval () {
            return this.initialInterval * 1000;
        }
    },
    methods: {
        init () {
            let that = this;
            that.$http.post(that.$api.shop.profile, {companyId: this.companyId}).then(function (res) {
                if (res.data.code === 0) {
                    that.form.bannerAbsoluteUrl = res.data.data.bannerAbsoluteUrl;
                    that.form.profileAbsoluteUrl = res.data.data.profileAbsoluteUrl;
                    that.sliders = res.data.data.certificateAbsoluteUrlList.slice(0, 6);
                    that.address = res.data.data.address;
                    that.profile = res.data.data.profile;
                    that.phone = res.data.data.phone;
                    that.maps.lng = res.data.data.lng;
                    that.maps.lat = res.data.data.lat;
                    that.map();
                }
            });
        },
        initlunbo () {
            this.play();
            window.onblur = function () { this.stop(); }.bind(this);
            window.onfocus = function () { this.play(); }.bind(this);
        },
        move (offset, direction, speed) {
            if (!this.transitionEnd) return;
            this.transitionEnd = false;
            direction === -1 ? this.currentIndex += offset / 220 : this.currentIndex -= offset / 220;
            if (this.currentIndex > 5) this.currentIndex = 1;
            if (this.currentIndex < 1) this.currentIndex = 5;

            const destination = this.distance + offset * direction;
            this.animate(destination, direction, speed);
        },
        animate (des, direc, speed) {
            if (this.temp) {
                window.clearInterval(this.temp);
                this.temp = null;
            }
            this.temp = window.setInterval(() => {
                if ((direc === -1 && des < this.distance) || (direc === 1 && des > this.distance)) {
                    this.distance += speed * direc;
                } else {
                    this.transitionEnd = true;
                    window.clearInterval(this.temp);
                    this.distance = des;
                    if (des < -1320) this.distance = -220;
                    if (des > -220) this.distance = -1320;
                }
            }, 25);
        },
        play () {
            if (this.timer) {
                window.clearInterval(this.timer);
                this.timer = null;
            }
            this.timer = window.setInterval(() => {
                this.move(220, -1, this.speed);
            }, this.interval);
        },
        stop () {
            window.clearInterval(this.timer);
            this.timer = null;
        },
        // 百度地图
        map () {
            let map = new BMap.Map(this.$refs.allmap); // 创建Map实例
            map.addControl(new BMap.MapTypeControl({ // 添加地图类型控件
                mapTypes: [ BMAP_NORMAL_MAP, BMAP_HYBRID_MAP ]
            }));
            map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
            let point;
            if (this.maps.lng === null || this.maps.lat === null) {
                this.maps.lng = 116.404;
                this.maps.lat = 39.915;
                point = new BMap.Point(this.maps.lng, this.maps.lat);
            } else {
                point = new BMap.Point(this.maps.lng, this.maps.lat); // 创建点坐标
            }
            // let point = new BMap.Point(this.maps.lng, this.maps.lat); // 创建点坐标
            let marker = new BMap.Marker(point);
            map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
            map.addOverlay(marker); // 将标注添加到地图中
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
  .profile-header {
    width: 100%;
    height: 220px;
  }
  .firm {
    width: 1200px;
    min-width: 1200px;
    margin: 0 auto;
    height: 512px;
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
        border-bottom: 1px solid #DCE0E4;
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

#slider{
  text-align: center;
}
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
</style>
