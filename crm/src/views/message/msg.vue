<template>
<div class="msg-box">
    <div class="title-wrapper">
        <div class="title">消息盒子</div>
        <div class="btn-group">
            <span class="gy-button-extra" @click="readed('readAll')">全部已读</span>
        </div>
    </div>
    <div>
        <div class="msg-item" v-for="item in msgList" :key="item.id" @click="readed(item)">
            <div class="msg-logo">
                <div class="logo-content">
                    <img src="../../assets/images/news-holder.png" class="logo"/>
                    <div class="is-read" :class="item.readStatus === 0 ? 'is-ready' : ''"></div>
                </div>
            </div>
            <div class="msg-content">
                <div class="msg-header">
                    <div class="msg-title" style="margin-left: -7px">【CRM】</div>
                    <div class="msg-time">{{item.createdDate}}</div>
                </div>
                <div class="msg-text">{{item.content}}</div>
                <span class="gy-button-view" @click.stop="$router.push({name: 'detail',query: {viewType: 1, id: item.bizId}})">{{item.bizName}}</span>
            </div>
        </div>
    </div>
    <!-- 翻页 -->
    <el-pagination
        v-if="total !== 0"
        background
        :total="total"
        layout="prev, pager, next"
        style="margin-top: 40px;"
        @current-change="turnPage">
    </el-pagination>
</div>
</template>

<script>
export default {
    name: 'msg',
    data () {
        return {
            msgList: [
                // {
                //     Id: null, // 消息Id
                //     usrCompanyId: null, // 公司Id
                //     sendUserId: null, // 发送用户Id
                //     receiveUserId: null, // 接收用户Id
                //     readStatus: null, // 读取状态0未读取1已读取
                //     content: null, // 消息内容
                //     createdDate: null, // 消息发送日期
                //     bizType: null, // 业务类型
                //     bizTypeName: null, // 业务类型名称
                //     bizId: null // 业务对象Id
                // }
            ],
            search: {
                data: {
                    receiveUserId: null
                },
                keywords: '',
                pageNum: 1,
                pageSize: 10
            },
            total: 0
        };
    },
    created () {
        let user = localStorage.getItem('userInfo');
        if (user) {
            let userInfo = JSON.parse(user);
            this.search.data.receiveUserId = userInfo.id;
        }
        this.getList();
    },
    methods: {
        turnPage (e) {
            this.search.pageNum = e;
            this.getList();
        },
        getList () {
            this.$http.post(this.$api.msg.getList, this.search)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.msgList = res.data.data.list;
                        this.total = res.data.data.total;
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        readed (item) {
            let params = [];
            if (item === 'readAll') {
                this.msgList.forEach((e) => {
                    if (e.readStatus === 0) {
                        params.push(e.id);
                    }
                });
            } else {
                if (item.readStatus === 0) {
                    params.push(item.id);
                }
            }
            if (params.length === 0) return;
            this.$http.post(this.$api.msg.readMsg, params)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.getList();
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }
};
</script>

<style scoped lang="scss">
.msg-box {
    padding: 15px;
    .title-wrapper {
        display: flex;
        /*padding: 5px 0;*/
        border-bottom: 1px solid $color-border;
        &>div {
            flex: 1;
        }
        .title {
            line-height: 35px;
            font-size: 16px;
            font-weight: bold;
            color: $color-title;
        }
        .btn-group {
            text-align: right;
        }
    }
    .msg-item {
        display: flex;
        min-height: 61px;
        border-bottom: 1px solid $color-border;
        cursor: default;
        .msg-logo {
            flex: 0 0 60px;
            margin: 0 15px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .logo-content {
                flex: 0 0 50px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: 1px solid $color-border;
                position: relative;
            }
            .logo {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
            .is-read {
                position: absolute;
                right: 0;
                top: -1px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
            }
            .is-ready {
                background-color: $color-highlight;
            }
        }
        .msg-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            position: relative;
            .msg-header {
                flex: 1;
                display: flex;
                line-height: 30px;
                .msg-title {
                    flex: 1;
                }
                .msg-time {
                    flex: 1;
                    padding-right: 5px;
                    font-size: 13px;
                    text-align: right;
                    color: $color-minor;
                }
            }
            .msg-text {
                flex: 1;
                max-width: 850px;
                color: $color-minor;
            }
            .gy-button-view {
                position: absolute;
                right: 5px;
                bottom: 7px;
            }
        }
    }
}
</style>
