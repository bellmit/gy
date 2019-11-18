<template>
  <div class="slide-list" @mouseenter="enter()" @mouseleave="leave()">
      <i class="iconfont icon-jiantou icon-one iconLeft" @click="recommendLeft"></i>
      <i class="iconfont icon-jiantou icon-one iconRight" @click="recommendRight"></i>
      <ul class="slide-item" :style='"left:" + left + "px;"' :class="{anim:transition === true}">
          <li v-for="(item,index) in newData" :key="index">
              <div class="gy-box bg-img" :style='"background-image: url(" + shopBg[index] + ")"' :key="index">
                  <span class="company-logo bg-img" :style='"background-image: url(" + item.companyLogo + ")"'></span>
                  <dl>
                      <dt><a :href='"mall/#/shop/index?companyId=" + item.companyId'>{{item.companyName}}</a></dt>
                      <dd style="height: 25px" class="products">{{item.profile}}</dd>
                  </dl>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    data () {
        return {
            left: 0,
            timer: null,
            transition: null,
            newData: [],
            Company: this.recommendCompany,
            shopBg: ['', require('./../assets/images/shop-bg-1.jpg'), '', require('./../assets/images/shop-bg-2.jpg'), '']
        };
    },
    watch: {
        recommendCompany (newval, oldval) {
            this.Company = newval;
            this.init();
        }
    },
    props: ['recommendCompany'],
    methods: {
        init () {
            let itemNum = 5;
            let num = this.Company.length % itemNum;
            let addData = num > itemNum / 2 ? this.Company.slice(0, num + itemNum) : this.Company.slice(0, itemNum * 2);
            if (this.Company.length > 4) {
                this.newData = this.Company.concat(addData);
                this.timer = setInterval(this.scroll, 3000);
            } else {
                this.newData = this.Company;
            }
        },
        scroll () {
            if (this.left < -244 * (this.Company.length)) {
                this.transition = false;
                this.left = this.left - (-244 * (this.Company.length));
                // setTimeout(this.scroll, 1000);
            } else {
                this.transition = true;
                this.left -= 244;
            }
        },
        enter () {
            if (this.Company.length > 5) {
                clearInterval(this.timer);
            }
        },
        leave () {
            if (this.Company.length > 5) {
                this.timer = setInterval(this.scroll, 3000);
            }
        },
        recommendLeft () {
            this.transition = true;
            if (this.Company.length < 6) {
                return;
            }
            if (this.left === 0) {
                this.transition = false;
                this.left = -244 * (this.Company.length - 2);
                setTimeout(this.scroll, 100);
            } else {
                this.left += 244;
            }
        },
        recommendRight () {
            this.transition = true;
            if (this.Company.length < 6) {
                return;
            }
            if (this.left < -244 * (this.Company.length)) {
                this.transition = false;
                this.left = this.left - (-244 * (this.Company.length));
                setTimeout(this.scroll, 100);
            } else {
                this.left -= 244;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    .slide-list{
      width:1200px;
      height:160px;
      overflow: hidden;
      position: relative;
    .slide-item{
      width:1000%;
      height:100%;
      position: relative;
      top:0;
      a{
          width:100%;
      }
      li {
        width:224px;
        height:100%;
        float:left;
        text-align: center;
        margin-right:20px;
        color: #333333;
        /*dt {*/
            /*cursor: pointer;*/
            /*white-space: nowrap;*/
            /*overflow: hidden;*/
            /*text-overflow: ellipsis;*/
            /*height: 25px;*/
            /*line-height: 1;*/
            /*font-size: 16px;*/
            /*font-weight: bold;*/
            /*color:#333;*/
        /*}*/

      }
      img{
          height:60px;
      }
    }
    .anim{
      transition: all 1s;
    }
    .iconLeft{
        left:0;
        transform: rotate(180deg);
    }
    .iconRight{
        right:0;
    }
    .icon-one{
      display: block;
      position: absolute;
      top:65px;
      margin:auto;
      z-index: 2;
      cursor: pointer;
    }
    .icon-one:hover{
          color:#E0370F;
    }
  }
</style>
