<template>
    <div class="header">
        <div class="t">
            <div class="inner">
                <span class="hot-line"><i class="iconfont icon-hotline"></i>客服热线: 400-777-6777<a
                  href="http://old.chinayie.com" target="_blank">返回旧版</a></span>
                <ul class="menu">
                    <li><a href="/point" class="highlight">积分商城</a></li>
                    <li v-if="!isLogin"><a href="/my/#/login">登录</a> | <a href="/my/#/register">注册</a></li>
                    <!--<li><a href="">语言</a></li>-->
                    <li><a href="http://chinayie.cn/about.php">关于我们</a></li>
                    <li><a href="/mall/#/help">帮助中心</a></li>
                    <li v-if="isLogin"><a href="javascript:;" @click="goMenu">{{userInfo.account}}</a></li>
                    <li v-if="isLogin"><a href="/my/#/news"><i class="iconfont icon-news"></i>消息<i class="icon-new-news" v-if="newMessage || unread"></i></a></li>
                    <li v-if="isLogin"><a href="javascript:;" @click="logout">退出</a></li>
                </ul>
            </div>
        </div>
        <div class="b">
            <div class="inner">
                <div class="nav">
                    <a href="/" class="logo"><img src="../assets/images/gy-logo.png" alt=""></a>
                    <ul v-if="isHeader === false && page !== '积分'">
                        <li v-for="nav in navList" :key="nav.id">
                            <a :href="nav.link" :class="{'selected': nav.selected}"><i class="iconfont" :class="'icon-' + nav.icon"></i>{{nav.name}}</a>
                        </li>
                    </ul>
                </div>
                <div class="search" v-if="isHeader === false">
                    <div class="base" v-if="page === '积分'">
                        <i class="iconfont icon-search" @click="handlePonintSearch"></i>
                        <input @keyup.enter="handlePonintSearch" v-model="pointKeywords" type="text" class="gy-input"
                               placeholder="搜索兑换品">
                    </div>
                    <div class="base" v-else>
                        <i class="iconfont icon-search" @click="handleSearch"></i>
                        <input @keyup.enter="handleSearch" v-model="keywordStr" type="text" class="gy-input"
                               placeholder="请输入品名、类目">
                    </div>
                </div>
                <div class="shopHome" v-else>
                    <ul>
                        <li>
                            <router-link :to="{ path: '/shop/index', query: {'companyId': this.companyId} }">首页</router-link>
                        </li>
                        <li>
                            <router-link :to="{ path: '/shop/profile', query: {'companyId': this.companyId} }">企业介绍</router-link>
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
                }
            ],
            isHeader: false,
            companyId: null,
            newMessage: false,
            unread: false,
            newMessageNote: false
        };
    },
    props: ['page'],
    created () {
        this.init();
        if (this.$route) {
            this.companyId = this.$route.query.companyId;
        }
        this.isHeader = (this.$route.name === 'shopHome' || this.$route.name === 'shop-profile');
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
        handleSearch () {
            location.href = `/mall/#/search?fullSearch=${this.keywordStr}`;
        },
        logout () {
            this.$confirm('确定退出登录吗？', '提示')
                .then(() => {
                    this.$http.post('/trade/user/v1/logout')
                        .then(res => {
                            if (res.data.code === 0) {
                                localStorage.removeItem('userInfo');
                                location.href = '/my/#/login';
                                location.reload();
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
            overflow: hidden;
        }
        .t {
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
                color: $color-black;
                line-height: 30px;
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
                    color: $color-black;
                    &:hover {
                        color: $color-highlight;
                    }
                }
            }
        }
        .b {
            padding: 10px 0;
            background-color: #fff;
            img {
                width: 146px;
                height: auto;
                float: left;
                margin-right: 60px;
            }
            .nav {
                float: left;
                overflow: hidden;
                .logo {
                    float: left;
                }
                ul {
                    float: left;
                }
                li {
                    float: left;
                    margin-right: 40px;
                    a {
                        font-size: 16px;
                        color: $color-black;
                        i {
                            font-size: $small-font;
                            margin-right: 5px;
                        }
                        &.selected, &:hover {
                            color: $color-highlight;
                        }
                    }
                }
            }
            .search {
                float: right;
                overflow: hidden;
                .base {
                    float: left;
                    width: 300px;
                    position: relative;
                    i {
                        position: absolute;
                        right: 0;
                        top: 5px;
                        font-weight: bold;
                        color: $color-black;
                        line-height: 1;
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
</style>
