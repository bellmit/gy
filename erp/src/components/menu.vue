<template>
    <div class="gy-menu" v-if="showList">
        <el-menu
                :default-active="menuDefault"
                :unique-opened=true
                @select="handleSelect"
                class="navMenu-body" ref="elementMenu">
            <!--home单独拎出来 -->
            <el-menu-item index='home' link="home">
                <i class="iconfont icon-workbench"></i>
                <span slot="title">工作台<span v-if="msgCountVal > 0" class="msg-count-color"> ({{msgCountVal}})</span></span>
            </el-menu-item>
            <gy-menu-item :menu-data="menuData"></gy-menu-item>
        </el-menu>
    </div>
</template>

<script>
import Bus from '@/config/bus.js';
import gyMenuItem from '@/components/menu-item';
import axios from 'axios';
export default {
    data () {
        return {
            menuDefault: null,
            msgTimer: null,
            msgCountVal: 0,
            axiosInstance: null,
            showList: true
        };
    },
    components: {
        gyMenuItem
    },
    props: {
        menuData: {
            type: Array,
            default: function () {
                let user = JSON.parse(localStorage.getItem('userInfo'));
                if (user.menuList[0]) {
                    if (user.menuList[0].resourceAccessList[0]) {
                        // 过滤掉'工作台'菜单
                        if (user.menuList[0].resourceAccessList[0].url === 'home') {
                            user.menuList[0].resourceAccessList.splice(0, 1);
                        }
                        return user.menuList[0].resourceAccessList;
                    }
                }
                return false;
            }
        }
    },
    methods: {
        setNewId: function (prefix, arr) {
            let _this = this;
            arr.forEach(function (obj, index, array) {
                let newId = prefix + '-' + (index + 1);
                if (obj.resourceAccessList && obj.resourceAccessList.length > 0) {
                    _this.setNewId(newId, obj.resourceAccessList);
                }
                obj.newId = newId.slice(1);
            });
            return arr;
        },
        handleOpen (key, keyPath) {},
        handleClose (key, keyPath) {},
        handleSelect (index, indexPath, target) {
            if (index === 'home') {
                this.isShowList();
                this.menuDefault = index;
            }
            this.$router.push({name: index});
        },
        countLastMsgList () {
            let me = this;
            // this.$http.post(this.$api.workbench.countWbMsgList, {}).then((res) => {
            //     if (res.data.code === 0) {
            //         me.msgCountVal = res.data.data.total;
            //     }
            // });

            if (this.axiosInstance == null) {
                this.axiosInstance = axios.create();
            }
            this.axiosInstance.post(this.$api.workbench.countWbMsgList, {}
            ).then(resp => {
                if (resp.data.code === 0) {
                    me.msgCountVal = resp.data.data.total;
                }
            }).catch(err => { //
                console.log('请求失败：' + err.status + ',' + err.statusText);
            });
        },
        isShowList () {
            this.showList = false;
            Promise.resolve().then(() => {
                this.showList = true;
            });
        }
    },
    created () {
        let menus = this.menuData.list;
        if (menus && menus.length > 0) {
            let par = this.setNewId('', menus);
            this.menuData.list = par;
        }
    },
    mounted () {
        let that = this;
        Bus.$on('setMenu', () => {
            that.menuDefault = '0-1';
            this.$router.push({name: 'contEssList'});
        });
        this.countLastMsgList();
        // 只有uat1和生产环境才定时刷新
        let envVal = null;
        if (process && process.env) {
            envVal = process.env.NODE_ENV;
        }
        if (envVal !== 'development' && envVal !== 'testing') {
            this.msgTimer = setInterval(this.countLastMsgList, 10000);
        }
    },
    beforeDestroy () {
        if (this.msgTimer) {
            clearInterval(this.msgTimer);
        }
    }
};
</script>

<style lang="scss">
    .gy-menu {
        height: 100%;
        /*background-color: #5a5959;*/
        background: #FFFFFF;
        /*box-shadow: 1px 0 0 0 #E7ECF1;*/
        border-right: 1px solid #E7ECF1;
        .el-menu {
            flex: 1;
            border-right-width: 0;
            background: transparent;
            /*overflow-y: auto;*/
            /*overflow-x: hidden;*/
            &::-webkit-scrollbar {
                display:none
            }
            .is-opened{
                .iconfont{
                    color: red;
                }
            }
        }
        .iconfont{
            width: 20px;
            text-align: left;
        }
        .msg-count-color {
            color: #e0370f;
            font-weight: bold;
        }
        .el-menu-item.is-active {
            background-color: #DCDCDC!important;
        }
        .el-menu-item, .el-submenu__title {
            color: #666666;
            &:hover {
                background: #EFEFEF;
                color: #333333;
            }
        }

        .el-submenu {
            &.is-opened, &:hover {
                /*background: $;*/
            }
        }

        .el-menu-item-group__title {
            padding: 0;
        }

    }
</style>
