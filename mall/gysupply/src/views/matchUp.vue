<template>
  <div class="matchUp">
    <div class="banner">
      <el-carousel :interval="5000" height="348px">
        <el-carousel-item v-for="(item,key) in kvList" :key="key">
          <a @click="goIm(item.linkUrl,key)" target="_blank">
            <div class="item bg-img home-carousel-img" :style='"background-image: url(" + item.imageUrl + ")"'></div>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="matchUp-company">
      <div class="top">
        <div>推荐撮合公司 </div>
        <div  class="base">
          <i class="iconfont icon-search" @click="handleSearch"></i>
          <input class="matchUp" @keyup.enter="handleSearch" v-model="params.keyword" type="text"
                 placeholder="请输入撮合公司名">
        </div>
      </div>
      <div class="matchUp-list">
        <div class="my-list" v-for="(item,key) in shopList" :key="key">
          <div class="top-img">
            <img :src="item.homeFirstPicture" alt="" style="border-radius: 5px 5px 0 0;">
          </div>
          <div class="bottom-box">
            <div class="left-name">
              <div class="name1">{{item.companyName}}</div>
              <div class="name2" :title="item.profile">
                {{item.profile}}
              </div>
              <div class="name2" @click="openQQ(item.qqCode)" style="margin-top: 7px;font-size: 12px">
                <img style="width: 18px;
    height: 17px;
    vertical-align: sub;" src="../assets/images/qq.png" alt="">
                {{item.qqCode}}
              </div>
              <div class="dw-title" v-show="dwTitle == key&&dwTitle2">{{item.companyName}}</div>
              <div class="dw-title2" v-show="dwTitle3 == key&&dwTitle4">{{item.profile}}</div>
            </div>
            <div class="img-ewm">
              <div><img :src="item.qrCode" alt=""></div>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="matchUp-more" @click="morefun" v-if="hasNextPage">-->
      <!--更多内容-->
      <!--</div>-->
      <!--<div class="matchUp-foot"  :style='"background-image: url(" + bgimage.matchUp + ")"'>-->
      <!--<div class="box">-->
      <!--<div class="font1">撮合服务</div>-->
      <!--<div class="font2"></div>-->
      <!--<div class="font3">-->
      <!--国烨平台为入驻的优质企业搭建一个信息集中的平台，买卖双方可以在信息平台上发布供需信息，国烨平台作为第三方为客户提供免费的撮合服务。撮合人员基于国烨平台研发的撮合工具，可一键转发各客户群体，通过平台独有的智能文本解析技术，快速识别客户发布的供求信息，形成相应的合同要素，减少人工编辑的人力及时间，提高撮合信息的时效性，提升撮合服务的工作效率，帮助平台买卖家尽快达成交易。-->
      <!--</div>-->
      <!--<div class="font4">-->
      <!--<button @click="goIm">立即前往</button>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
import matchUp from '../assets/images/matchUp.png';
export default {
    data () {
        return {
            bgimage: {
                matchUp: matchUp
            },
            kvList: [],
            params: {
                'pageSize': 100000,
                'pageNum': 1,
                'companyType': 5, // (必须)公司类型（固定值5）
                'keyword': ''
            },
            shopList: [],
            hasNextPage: '',
            dwTitle: '',
            dwTitle2: false,
            dwTitle3: '',
            dwTitle4: false

        };
    },
    methods: {
        openQQ (qqCode) {
            if (/^[1-9]\d{4,10}$/.test(qqCode)) {
                let linkuRL = `tencent://message/?uin=${qqCode}&Site=fdfdf&Menu=true`;
                window.open(linkuRL, '_self');
            } else {
                this.$message.error('QQ号码格式不正确');
            }
        },
        // 首页轮播
        getKvList () {
            this.$http.get(this.$api.category.getKvList)
                .then(res => {
                    if (res.data.code === 0) {
                        this.kvList = res.data.data;
                    }
                });
        },
        handleSearch () {
            this.$http.post(this.$api.category.shopRecommendByKeyword, this.params)
                .then(res => {
                    if (res.data.code === 0) {
                        this.shopList = res.data.data.shopList;
                        this.hasNextPage = res.data.data.hasNextPage;
                        console.log(this.hasNextPage);
                    }
                });
        },
        morefun () {
            this.params.pageSize += 6;
            this.handleSearch();
        },
        goIm (v, key) {
            if (key === 0) {
                if (localStorage.getItem('userInfo')) {
                    let currentPhone = JSON.parse(localStorage.getItem('userInfo')).phone;
                    window.open('/im/#type=3&username=' + window.btoa(currentPhone) + '&touser=' + window.btoa(1), '_blank');
                } else {
                    location.href = '/my/#/login';
                }
            } else {
                window.open(v, '_blank');
            }
        }
        // dwTitlefun (key) {
        //     this.dwTitle = key;
        //     this.dwTitle2 = true;
        // },
        // dwTitlefunleave (key) {
        //     this.dwTitle = key;
        //     this.dwTitle2 = false;
        // },
        // dwTitlefun2 (key) {
        //     this.dwTitle3 = key;
        //     this.dwTitle4 = true;
        // },
        // dwTitlefunleave2 (key) {
        //     this.dwTitle3 = key;
        //     this.dwTitle4 = false;
        // }
    },
    created () {
        this.getKvList();
        this.handleSearch();
    }
};
</script>
<style lang="scss" scoped>
  .matchUp{
    .banner{
      height: 348px;
      .home-carousel-img {
        position: relative;
        overflow: hidden;
      }
      .bg-img{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-repeat: no-repeat;
        background-size: cover;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .banner:hover{
      cursor: pointer;
    }
    img{
      width: 100%;
      height: 100%;
    }
    .matchUp-company{
      margin-bottom: 80px;
      .top{
        overflow: hidden;
        margin: 20px auto;
        width: 1200px;
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 1px;
        color: #333;
        div{
          float: left;
        }
        .base{
          float: right;
          width: 300px;
          position: relative;
          font-size: 14px;
          color: #999999;
          line-height: 14px;
          i{
            position: absolute;
            right: 0;
            top: 5px;
            font-weight: bold;
            color: #000;
            line-height: 1;
          }
          .matchUp{
            width: 100%;
            border: none;
            border-bottom: 1px solid #e7ecf1;
            padding: 0 10px;
            color: #666;
            height: 30px;
            line-height: 29px;
            vertical-align: middle;
            background: none!important;
          }
        }
      }
    }
    .matchUp-list{
      overflow: hidden;
      margin: auto;
      width: 1215px;
      .my-list{
        width: 395px;
        height: 250px;
        float: left;
        background: #fff;
        margin: 0 5px 16px;
        position: relative;
        border-radius: 5px;
        .top-img{
          height: 140px;
          background: #ccc;
        }
        .bottom-box{
          overflow: hidden;
          padding: 6px 20px;
          .left-name{
            float: left;
            width: 258px;
            margin-right: 10px;
            .name1{
              font-size: 16px;
              color: #333;
              height: 28px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              font-weight: 500;
            }
            .name2{
              font-size: 14px;
              color: #999999;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              line-height: 20px;
            }
            .name2:hover{
              cursor: pointer;
            }
            .dw-title{
              padding: 5px 10px;
              background: white;
              position: absolute;
              top: 100px;
              left: 16px;
              z-index: 100;
              border-radius: 4px;
              box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
              word-break: break-all;
              border-radius: 4px;
              border: 1px solid #ebeef5;
            }
            .dw-title2{
              padding: 5px 10px;
              background: white;
              position: absolute;
              left: 17px;
              z-index: 100;
              border-radius: 4px;
              -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
              word-break: break-all;
              border-radius: 4px;
              border: 1px solid #ebeef5;
              bottom: 86px;
              max-width: 300px;
              max-height: 160px;
              overflow: hidden;
            }
          }
          .img-ewm{
            float: right;
            margin-top: 7px;
            div{
              width: 80px;
              height: 80px;
              background: #ccc;
              border: 1px solid #CCC;
            }
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .matchUp-more{
      background: #EFEEEE;
      border-radius: 5px;
      text-align: center;
      width: 1200px;
      line-height: 50px;
      height: 50px;
      margin: 0px auto 20px;
    }
    .matchUp-more:hover{
      cursor: pointer;
    }
    .matchUp-foot{
      width: 1200px;
      height: 345px;
      margin: 0 auto 80px;
      .box{
        width: 692px;
        color: #FFFFFF;
        padding: 55px 95px;
        .font1{
          font-size: 20px;
        }
        .font2{
          width: 40px;
          margin: 5px 0;
          height: 3px;
          background: #fff;
        }
        .font3{
          font-size: 14px;
        }
        .font4{
          margin-top: 7px;
          button{
            background: #e0370f;
            border-radius: 4px;
            color: white;
            width: 80px;
            height: 30px;
            font-size: 14px;
          }
          button:hover{
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
