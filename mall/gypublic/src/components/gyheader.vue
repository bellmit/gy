<template>
    <div class="header">
        <div class="t">
            <div class="inner clearfix">
                <span class="hot-line"><i class="iconfont icon-hotline"></i>客服热线: 400-777-6777<a
                  href="http://old.chinayie.com" target="_blank">返回旧版</a></span>
                <ul class="menu">
                    <li v-if="!isLogin"><a href="/my/#/login">登录</a> | <a href="/my/#/register">注册</a></li>
                    <li v-if="isLogin" class="account">
                        <a href="javascript:;" class="account-link" @click="goMenu">{{userInfo.account}}<i class="iconfont"></i></a>
                        <div class="pop-account">
                            <span class="company-logo" :style="'background-image: url(' + defaultCompanyLogo + ')'"></span><span class="company-phone">{{userInfo.phone}}</span><a href="javascript:;" @click="logout">退出</a>
                        </div>
                    </li>
                    <li v-if="isLogin"><a href="/my/#/news"><i class="iconfont icon-news"></i>消息<i class="icon-new-news" v-if="newMessage || unread"></i></a></li>
                    <li><a href="javascript:;" @click="goMycenter">我的中心</a></li>
                    <!--<li><a href="#" @click="setJump('/point')">积分商城</a></li>-->
                    <li><a href="/my/#/help">帮助中心</a></li>
                    <li><a href="http://chinayie.cn/about.php">关于我们</a></li>
                </ul>
            </div>
        </div>
        <div class="b">
            <div class="bc"></div>
            <div class="inner clearfix">
                <div class="nav">
                    <a href="/" class="logo"><img src="../assets/images/gy-logo.png" alt=""></a>
                    <div class="search search-placeholder" v-if="isHeader === false">
                        <div class="base" v-if="page === '积分'">
                            <i class="iconfont icon-search icon-search1" @click="handlePonintSearch"></i>
                            <input style="background-color: rgba(255,255,255,.5)!important;border-bottom-width:0" @keyup.enter="handlePonintSearch" v-model="pointKeywords" type="text" class="gy-input"
                                   placeholder="搜索兑换品">
                            <span class="ksfb gy-button-extra" @click="goMycenter('ZNFB')"><i class="iconfont icon-search icon-search2"></i>智能发布</span>
                        </div>
                        <div class="base" v-else>
                            <i class="iconfont icon-search icon-search1" @click="handleSearch"></i>
                            <input  style="background-color: rgba(255,255,255,.3)!important;border-bottom-width:0" @keyup.enter="handleSearch" v-model="keywordStr" type="text" class="gy-input"
                                    placeholder="请输入品名、类目">
                            <span class="ksfb gy-button-extra" @click="goMycenter('ZNFB')"><i class="iconfont icon-search icon-search2"></i>智能发布</span>
                        </div>
                    </div>
                    <div class="shopHome" v-else>
                        <ul style="margin-left: 205px">
                            <li>
                                <router-link :to="{ path: '/shop/index', query: {'companyId': this.companyId} }">首页</router-link>
                            </li>
                            <li>
                                <router-link :to="{ path: '/shop/profile', query: {'companyId': this.companyId} }">企业介绍</router-link>
                            </li>
                        </ul>
                    </div>
                    <ul v-if="isHeader === false && page !== '积分'" style="margin-left: 215px">
                        <li v-for="nav in navList" :key="nav.id">
                            <a @click="setJump(nav.link)" href="#" :class="{'selected': nav.selected}"><i class="iconfont" v-if="nav.name === '首页'" :class="'icon-' + nav.icon"></i>{{nav.name}}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="new-message-box" v-show="newMessageNote">
                <a href="/my/#/news">
                    <i class="iconfont icon-news"></i>
                    <i class="icon-new-news"></i>
                    <span>您有一条新消息通知</span>
                </a>
                <i class="iconfont icon-close" @click="closeNewMessageNote"></i>
            </div>
        </transition>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';

export default {
    data () {
        return {
            isLogin: false,
            userInfo: null,
            keywordStr: null,
            pointKeywords: null,
            navList: [
                {
                    id: 0,
                    name: '首页',
                    link: '/',
                    icon: 'home',
                    blank: false,
                    selected: false
                },
                {
                    id: 1,
                    name: '商城',
                    link: '/mall',
                    icon: 'mall',
                    blank: false,
                    selected: false
                },
                {
                    id: 2,
                    name: '仓储',
                    link: '/warehouse',
                    icon: 'storage',
                    blank: false,
                    selected: false
                },
                {
                    id: 3,
                    name: '物流',
                    link: '/logistics',
                    icon: 'logistics',
                    blank: false,
                    selected: false
                },
                {
                    id: 4,
                    name: '数据资讯',
                    link: 'http://info.chinayie.com',
                    icon: 'datanews',
                    blank: false,
                    selected: false
                },
                {
                    id: 5,
                    name: '积分商城',
                    link: '/point',
                    icon: 'datanews',
                    blank: false,
                    selected: false
                }
            ],
            isHeader: false,
            companyId: null,
            newMessage: false,
            unread: false,
            newMessageNote: false,
            defaultCompanyLogo: require('../assets/images/mylogo.png'),
            backgroundImage: require('../assets/images/search2.png')
        };
    },
    props: ['page'],
    created () {
        this.init();
        if (this.$route) {
            this.companyId = this.$route.query.companyId;
        }
        this.isHeader = (this.$route.name === 'shopHome' || this.$route.name === 'shop-profile');
        localStorage.setItem('jump', true);
    },
    computed: mapGetters([
        'getUserinfo',
        'socket'
    ]),
    watch: {
        getUserinfo: 'init',
        $route (to, from) {
            this.init();
            this.isHeader = (to.name === 'shopHome' || to.name === 'shop-profile');
            this.companyId = this.$route.query.companyId;
        },
        socket: {
            handler (newValue, oldValue) {
                if (newValue.msg) {
                    this.newMessage = true;
                    this.handleNewMessageNote();
                }
            },
            deep: true
        }
    },
    methods: {
        init () {
            let user = localStorage.getItem('userInfo');
            if (user) {
                this.isLogin = true;
                this.userInfo = JSON.parse(user);
                this.checkRead();
            }
            this.navList.forEach(item => {
                item.selected = (item.name === this.page);
            });
        },
        setJump (href) {
            localStorage.setItem('jump', true);
            location.href = href;
        },
        handleSearch () {
            location.href = `/mall/#/search?fullSearch=${this.keywordStr}`;
        },
        logout () {
            this.$confirm('确定退出登录吗？', '提示', {type: 'warning'})
                .then(() => {
                    this.$http.post('/trade/user/v1/logout')
                        .then(res => {
                            if (res.data.code === 0) {
                                this.isLogin = false;
                                localStorage.removeItem('userInfo');
                                location.href = '/my/#/login';
                                this.userInfo = null;
                                return;
                            }
                            this.$alert(res.data.message, '出错了');
                        });
                });
        },
        goAccount () {
            let menuList = JSON.parse(localStorage.getItem('userInfo')).menuList[0].resourceAccessList[0].resourceAccessList;
            this.getFirstMenu(menuList);
        },
        getFirstMenu (menu) {
            for (let item of menu) {
                if (item.resourceAccessList.length === 0) {
                    this.$router.push({name: item.frontUrl});
                    break;
                } else {
                    this.getFirstMenu(item.resourceAccessList);
                }
            }
        },
        checkRead () {
            this.$http.get('/trade/messageInfo/v1/message/isReceived')
                .then(res => {
                    this.unread = (res.data.code === 0 && res.data.data);
                    this.newMessage = this.unread;
                });
        },
        handleNewMessageNote () {
            this.newMessageNote = true;
            window.setTimeout(() => {
                this.newMessageNote = false;
            }, 5000);
        },
        closeNewMessageNote () {
            this.newMessageNote = false;
        },
        handlePonintSearch () {
            location.href = `/point/#/search?keywords=${this.pointKeywords}`;
        },
        goMenu () {
            let firstMenuData = {
                isToFirst: true,
                menudef: null
            };
            localStorage.setItem('firstMenu', JSON.stringify(firstMenuData));
            location.href = '/my/#/order/list';
        },
        goMycenter (type) {
            location.href = this.isLogin ? (type === 'ZNFB' ? '/my/#/resources/add' : '/my/#/order/list') : '/my/#/login';
        }
    }
};
</script>
<style lang="scss" scoped>
    .header {
        .shopHome {
            float: right;
            ul {
                display: block;
                li {
                    display: inline-block;
                    margin-left: 15px;
                    font-size: 16px;
                    line-height: 1.8;
                    color: $color-black;
                }
            }
            .router-link-active {
                color: $color-highlight;
            }
        }
        .inner {
            margin: 0 auto;
            width: 1200px;
        }
        .t {
            height: 30px;
            line-height: 30px;
            background: #2D2D2D;
            .hot-line {
                float: left;
                color: $color-minor;
                i {
                    font-size: 14px;
                    margin-right: 5px;
                }
                a {
                    font-size: $small-font;
                    margin-left: 20px;
                    color: $color-extra;
                }
            }
            .menu {
                float: right;
                font-size: $small-font;
                color: #999;
                .account{
                    position: relative;
                    .iconfont{
                        margin-left: 8px;
                        color: #999;
                        &:before{
                            content: "\e620";
                        }
                    }
                    .account-link{
                        padding: 0 10px;
                        margin-right: -10px;
                        display: inline-block;
                        /*border: 1px solid #f5f5f5;*/
                        border-width: 0;
                        border-bottom: none;
                    }
                    .pop-account{
                        position: absolute;
                        background-color: #fff;
                        border: 1px solid $color-border;
                        padding: 10px;
                        z-index: 22222;
                        top: 30px;
                        left: 0;
                        border-top: none;
                        width: 216px;
                        display: none;
                        .company-logo{
                            background-color: #f5f5f5;
                            height: 60px;
                            width: 60px;
                            display: inline-block;
                            border-radius: 100%;
                            overflow: hidden;
                            background-position: center center;
                            background-size: cover;
                            background-repeat: no-repeat;
                            vertical-align: middle;
                            border: 6px solid #f5f5f5;
                        }
                        .company-phone{
                            padding: 0 16px;
                            display: inline-block;
                        }
                    }
                    &:hover{
                        .account-link{
                            background-color: #fff;
                            border-color: $color-border;
                        }
                        .iconfont{
                            &:before{
                                content: "\e61f";
                            }
                        }
                        .pop-account{
                            display: block;
                        }
                    }
                }
                .message {
                    position: relative;
                    display: inline-block;
                    em {
                        background-color: $color-highlight;
                        color: #fff;
                        padding: 2px 5px;
                        text-align: center;
                        font-size: 12px;
                        transform: scale(0.8);
                        position: absolute;
                        right: -13px;
                        top: 5px;
                        line-height: 10px;
                        border-radius: 10px;
                        width: 18px;
                    }
                }
                i {
                    font-size: $small-font;
                }
                i.icon-news{
                    font-size: 16px;
                }
                li {
                    display: inline-block;
                    margin-left: 15px;
                }
                a {
                    color: #999;
                    &:hover {
                        color: $color-highlight;
                    }
                }
            }
        }
        .b {
            padding-top: 16px;
            padding-bottom: 2px;
            width: 100%;
            position: relative;
            z-index: 999;
            background-image: url("./../assets/images/home-bg.png");
            /*border-bottom: 2px solid rgba(255,255,255,.5);*/
            background-size: 100% 100%;
            .bc{
                position: absolute;
                left: 0;
                top: 0;
                z-index: -1;
                width: 100%;
                height: 100%;
                background: linear-gradient(to bottom, rgba(0,0,0,0.8),rgba(0,0,0,0.1));
            }
            img {
                width: 146px;
                height: auto;
                float: left;
                margin-right: 60px;
            }
            .nav {
                overflow: hidden;
                .logo {
                    float: left;
                    background-color: rgba(0,0,0,0);
                }
                ul {
                }
                li {
                    float: left;
                    margin-right: 40px;
                    a {
                        font-size: 16px;
                        color:#fff;
                        i {
                            font-size: $small-font;
                            margin-right: 5px;
                        }
                        &.selected, &:hover {
                            color: #FF6A46;
                        }
                    }
                }
            }
            .search {
                overflow: hidden;
                .base {
                    width: 600px;
                    position: relative;
                    input {
                        border-radius: 3px;
                        color: #fff!important;
                    }
                    ::placeholder{
                        color: #fff!important;
                    }
                    .icon-search1 {
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 50px;
                        height: 100%;
                        background-color: #e0370f;
                        font-weight: bold;
                        color: #fff!important;
                        line-height: 30px;
                        text-align: center;
                        border-radius: 3px;
                        &:before{
                            color: #fff;
                        }
                    }
                    .icon-search2 {
                        margin-right: 8px;
                        &:before{
                            color: #fff;
                        }
                    }
                    .ksfb {
                        position: absolute;
                        top: 0;
                        right: -160px;
                        height: 30px;
                    }
                }
                .advanced {
                    float: left;
                    font-size: 18px;
                    line-height: 1;
                    color: $color-black;
                    font-weight: bold;
                    margin-top: 5px;
                }
            }
        }
    }
    .icon-new-news{
        background-color: $color-highlight;
        height: 6px;
        width: 6px;
        border-radius: 100%;
        display: inline-block;
        vertical-align: 4px;
    }
    .new-message-box{
        background-color: #fff;
        border-radius: $border-radius-small;
        padding: 10px;
        position: fixed;
        right: 10px;
        bottom: 10px;
        z-index: 1000;
        a{
            display: block;
            color: $color-main;
            padding-right: 25px;
        }
        .icon-new-news{
            margin-left: -5px;
        }
        .icon-close{
            position: absolute;
            right: 5px;
            top: 0;
            font-size: 14px;
            cursor: pointer;
        }
    }
    .search-placeholder {
        padding-bottom: 8px;
        ::placeholder {
            color: #666!important;
        }
        .icon-search1 {
            background-position: 0 0;
            width: 18px;
            height: 18px;
            cursor: pointer;
            background-size: contain;
            background-repeat: no-repeat;
        }
    }
</style>
