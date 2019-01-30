<!--suppress ALL -->
<template>
    <el-row class="navMenu">
        <el-col :span="12">
            <div class="navMenu-user">
                <div class="navMenu-user-avatar" :style="styleObj">
                    <img :src="avatars" alt="">
                </div>
                <div class="navMenu-user-desc">
                    <p class="navMenu-user-desc-name">{{username}}</p>
                    <el-dropdown trigger="click" @command="setCompanyMain">
                        <p>
                            <el-tooltip class="navMenu-user-desc-compony" :content=compony pplacement="bottom"
                                        effect="light">
                                <button>{{compony}}</button>
                            </el-tooltip>
                            <i class="el-submenu__icon-arrow icon el-icon-arrow-down"></i>
                        </p>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(item, index) in companyList"
                                              :style="item.isChief === 1? 'background-color: #ecf5ff;color: #66b1ff;':''"
                                              :key="index" :command="item">{{item.name}}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <el-row class="tac">
                <el-col :span="12" v-if="showList">
                    <el-menu :default-active="menuDefault" @select="handleSelect" :unique-opened="true"
                             @open="handleOpen" @close="handleClose">
                        <gy-menu-item :menu-data="navData"></gy-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import Bus from '@/config/bus.js';
import gyMenuItem from '@/components/menu-item';
export default {
    data () {
        return {
            isCompany: false,
            timer: '',
            activeNames: ['1'],
            username: '国烨',
            compony: '海南海通能源有限公司',
            styleObj: {
                backgroundImage: 'url(' + require('../assets/images/mylogo.png') + ')'
            },
            companyList: [],
            menuDefault: '',
            userInfo: {
                companyId: null,
                userId: null
            },
            avatars: null,
            showList: true
        };
    },
    created () {
        this.refresh();
    },
    methods: {
        refresh () {
            let userinfo = localStorage.getItem('userInfo');
            if (userinfo) {
                this.userInfo.companyId = JSON.parse(userinfo).companyId;
                this.userInfo.userId = JSON.parse(userinfo).id;
            }
            this.getlist();
            this.getCompanylist();
            // this.firstmenu();
        },
        firstmenu () {
            let firstMenu = localStorage.getItem('firstMenu');
            if (firstMenu && !JSON.parse(firstMenu).isToFirst) {
                this.menuDefault = JSON.parse(firstMenu).menudef;
                return;
            }
            let userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                let navData = JSON.parse(userInfo).menuList[0].resourceAccessList;
                let frontUrl;
                let firstlist = list => {
                    if (list[0].resourceAccessList.length === 0) {
                        frontUrl = list[0].frontUrl;
                    } else {
                        firstlist(list[0].resourceAccessList);
                    }
                };
                firstlist(navData);
                this.menuDefault = frontUrl;
                this.$router.push({name: frontUrl});
            }
        },
        // 获取我的企业等级和积分
        getlist () {
            this.$http.post(this.$api.point.getPoint, this.userInfo).then((res) => {
                if (res.data.code === 0) {
                    this.avatars = res.data.data.avatars;
                }
            }).catch((res) => {
                console.log(res);
            });
        },
        handleSelect (index, indexPath, target) {
            this.$router.push({name: index});
            let firstMenuData = {
                isToFirst: false,
                menudef: index
            };
            localStorage.setItem('firstMenu', JSON.stringify(firstMenuData));
        },
        handleOpen (key, indexPath) {
            // clearTimeout(this.timer);
            // this.timer = setTimeout(() => {
            //     const lis = [...document.querySelectorAll('.is-opened')];
            //     const parentDom = lis[lis.length - 1].parentNode;
            //     if (parentDom.nodeName.toLowerCase() === 'ul') {
            //         this.removeId();
            //         lis[0].setAttribute('id', 'active');
            //         this.rotateArrow(-90, this.getArrows());
            //         this.rotateArrow(0, this.getArrow(key));
            //         return;
            //     }
            //     const arrows = [...parentDom.parentNode.parentNode.childNodes[1].querySelectorAll('.el-submenu__icon-arrow')];
            //     this.rotateArrow(-90, arrows);
            //     this.rotateArrow(0, this.getArrow(key));
            // }, 0);
        },
        handleClose (key) {
            // this.rotateArrow(-90, this.getArrow(key));
            // key.length === 1 && this.removeId();
        },
        removeId () {
            const activeDom = document.querySelector('#active');
            activeDom && activeDom.removeAttribute('id', 'active');
        },
        getArrow (id) {
            const lis = [...document.querySelectorAll('li[myId]')];
            const arrowList = lis.filter(arrow => {
                return arrow.getAttribute('myId') === id;
            });
            const arrowBoxDom = arrowList[0].childNodes[0];
            if (arrowBoxDom.childNodes.length === 2) {
                return [arrowBoxDom.childNodes[1]];
            }
            return [arrowBoxDom.childNodes[3]];
        },
        getArrows () {
            const selector = '.navMenu .el-submenu__icon-arrow';
            return [...document.querySelectorAll(selector)];
        },
        rotateArrow (deg, arrows) {
            arrows.forEach(arrow => {
                arrow.style.transform = 'rotateZ(' + deg + 'deg)';
            });
        },
        getCompanylist () {
            let user = localStorage.getItem('userInfo');
            if (user) {
                this.username = JSON.parse(user).account;
                this.compony = JSON.parse(user).companyName;
                if (JSON.parse(user).companyId) this.isCompany = true;
            }
            let that = this;
            that.$http.get(that.$api.account.companyListAutoPass)
                .then(res => {
                    that.companyList = res.data.data;
                });
        },
        setCompanyMain (data) {
            let that = this;
            if (data.isChief === 1) return;
            // 设为主企业
            this.$http.put(this.$api.account.setMain + data.id)
                .then(res => {
                    if (res.data.code === 0) {
                        localStorage.setItem('userInfo', JSON.stringify(res.data.data));
                        Bus.$emit('resetmenuList', res.data.data.menuList);
                        this.$alert('设置成功', '提示')
                            .then(() => {
                                let firstMenuData = {
                                    isToFirst: true,
                                    menudef: null,
                                    firstPath: ''
                                };
                                localStorage.setItem('firstMenu', JSON.stringify(firstMenuData));
                                that.isShowList();
                            });
                        return;
                    }
                    this.$alert(res.data.message, '出错了');
                });
        },
        isShowList () {
            this.refresh();
            let that = this;
            that.showList = false;
            Promise.resolve().then(() => {
                this.firstmenu();
                that.showList = true;
            });
        }
    },
    props: {
        breadcrumbIndex: String,
        navData: {
            default: []
        }
    },
    mounted: function () {
        // this.rotateArrow(-90, this.getArrows());
        Bus.$on('setcompanyName', () => {
            this.isShowList();
        });
    },
    components: {gyMenuItem}
};
</script>

<style lang="scss" scoped>
    .el-col-12 {
        width: 240px;
    }

    .navMenu-user {
        border-bottom: 1px solid $color-border;
    }

    .navMenu {
        background-color: #fff;
        border-right: 1px solid $color-border;
        min-height: 850px;
    }

    .navMenu-user {
        display: flex;
    }

    .navMenu-user-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin: 15px;
        border: 1px solid $color-border;
        background-size: 40px;
        background-position: 8px 8px;
        background-repeat: no-repeat;
        background-color: #eee;
        position: relative;
        img {
            position: absolute;
            right: -10px;
            bottom: 0;
            left: auto;
            top: auto;
            height: 10px;
        }
    }

    .navMenu-user-desc {
        font-size: 14px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 160px;
        .icon {
            margin-top: -4px;
        }
    }

    .navMenu-user-desc p, .navMenu-user-desc button {
        margin: 3px 0 0;
        color: $color-title;
    }

    .navMenu-user-desc button {
        width: 126px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background: none;
        padding-left: 0px
    }

    .navMenu-user-desc-compony {
        opacity: 0.3;
        text-align: left;
    }

    .navMenu #active .iconfont {
        color: #E0370F;
    }

    /deep/ .is-active {
        color: $color-highlight;
    }
    /deep/ .is-opened {
        .iconfont {
            color: $color-highlight;
        }
    }
</style>
