<template>
    <div class="header">
        <div class="t">
            <div class="inner">
                <span class="hot-line"><i class="iconfont icon-hotline"></i>客服热线: 400-072-7777<a href="http://old.chinayie.com" target="_blank">返回旧版</a></span>
                <ul class="menu">
                    <li v-if="!isLogin"><a href="/my/#/login">登录</a> | <a href="/my/#/register">注册</a></li>
                    <!-- <li><a href="">语言</a></li> -->
                    <li><a href="http://chinayie.cn/about.php">关于我们</a></li>
                    <li><a href="/mall/#/help">帮助中心</a></li>
                    <li v-if="isLogin"><a href="/my/#/resources/list">{{userInfo.account}}</a><!-- | <a href="" class="message">消息<em>{{userInfo.messageAmount}}</em></a>--></li>
                    <li v-if="isLogin"><a href="javascript:;" @click="logout">退出</a></li>
                </ul>
            </div>
        </div>
        <div class="b">
            <div class="inner">
                <div class="nav">
                    <a href="/" class="logo"><img src="../assets/images/gy-logo.png" alt=""></a>
                    <ul v-if="this.isHeader === false">
                        <li><a href="/"><i class="iconfont icon-home"></i>首页</a></li>
                        <li><a href="/mall" class="selected"><i class="iconfont icon-mall"></i>商城</a></li>
                        <li><a href="/warehouse"><i class="iconfont icon-storage"></i>仓储</a></li>
                        <li><a href="/logistics"><i class="iconfont icon-logistics"></i>物流</a></li>
                        <li><a href="http://info.chinayie.com"><i class="iconfont icon-text"></i>数据资讯</a></li>
                    </ul>
                </div>
                <div class="search" v-if="this.isHeader === false">
                    <div class="base">
                        <i class="iconfont icon-search" @click="handleSearch"></i>
                        <input @keyup.enter="handleSearch" v-model="keywordStr" type="text" class="gy-input" placeholder="请输入品名、类目">
                    </div>
                    <i @click="handleSearch" class="iconfont icon-arrow3 advanced"></i>
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
    </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
    data () {
        return {
            isLogin: false,
            userInfo: null,
            keywordStr: null,
            companyId: this.$route.query.companyId
        };
    },
    computed: {
        ...mapGetters([
            'isHeader'
        ])
    },
    watch: {
        $route (to, from) {
            this.companyId = this.$route.query.companyId;
        }
    },
    created () {
        let user = localStorage.getItem('userInfo');
        if (user) {
            this.isLogin = true;
            this.userInfo = JSON.parse(user);
        }
    },
    methods: {
        ...mapMutations(['updataisHeader']),
        handleSearch () {
            this.$router.push({path: '/search', query: { fullSearch: this.keywordStr }});
        },
        logout () {
            let that = this;
            that.$confirm('确定退出登录吗？', '提示')
                .then(() => {
                    that.$http.post('/trade/user/v1/logout')
                        .then(res => {
                            if (res.data.code === 0) {
                                that.$alert('退出成功', '提示')
                                    .then(() => {
                                        localStorage.removeItem('userInfo');
                                        location.href = '/my/#/login';
                                    });
                                return;
                            }
                            that.$alert(res.data.message, '出错了');
                        });
                });
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
                a{
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
                    input{
                        padding-right: 18px;
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
</style>
