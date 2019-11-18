<template>
  <div class="slide-list" @mouseenter="enter()" @mouseleave="leave()">
      <i class="iconfont icon-jiantou icon-one iconLeft" @click="recommendLeft"></i>
      <i class="iconfont icon-jiantou icon-one iconRight" @click="recommendRight"></i>
      <ul class="slide-item" :style='"left:" + left + "px;"' :class="{anim:transition === true}">
          <li v-for="(item,index) in newData" :key="index">
              <span class="tag">推荐</span>
              <dl>
                  <dt class="clearfix">
                                <span class="fl" style="display: inline-block;width: 25px;height: 25px;background-size: cover;margin-top: -6px;">
                                    <img :src="item.companyLogo" style="height:25px;width:25px" alt="" v-if="item.companyLogo != null"/>
                                    <img src="../assets/images/V_logo.jpg" style="height:25px;width:25px" alt="" v-if="item.companyLogo == null"/>
                                </span>
                      <div class="fl" style="width: 80%;margin-left: 10px;">
                          <p class="company-name">{{item.companyName}}</p>
                          <p class="products">{{item.profile}}</p>
                      </div>
                  </dt>
              </dl>
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
            Company: this.recommendCompany
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
            if (this.Company.length > 5) {
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
      height:150px;
      margin:20px auto;
      overflow: hidden;
      position: relative;
      background: #f5f5f5;
    .slide-item{
      width:1000%;
      height:100%;
      position: relative;
      top:0;
      li {
        width:224px;
        height:164px;
        float:left;
        padding:60px 10px 10px 20px;
        text-align: center;
        margin-right:20px;
        background: #ffffff;
        color: #333333;
        position: relative;
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
    .gy-box{
        height: 164px;
    }
    .company-name {
        color: #666666;
        line-height: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 12px;
    }
    .products{
        color: #333333;
        line-height: 18px;
        height: 36px;
        overflow: hidden;
    }
    .gy-box {
        border-radius: 5px;
        margin-right: 20px;
        width: 224px;
        position: relative;
        padding: 60px 10px 20px;
        float: left;
        cursor: pointer;
    }
    .tag {
        color: #fff;
        line-height: 25px;
        position: absolute;
        padding: 0 12px;
        left: 0;
        top: 10px;
        background-color: #f7b608;
        font-size: 12px;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
    }
    .tag:after {
        position: absolute;
        width: 100%;
        height: 4px;
        left: 0;
        bottom: -4px;
        content: '';
    }
</style>
