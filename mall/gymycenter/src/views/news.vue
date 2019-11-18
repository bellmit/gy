<template>
    <div class="news">
        <div class="news-title">
            <h6><i class="iconfont icon-news"></i>消息盒子</h6>
            <button class="gy-button-normal" @click="handleAllRead">全部已读</button>
        </div>
        <div class="list">
            <a href="javascript:;" class="item" v-for="(item, index) in newsInfo.list" :key="index" @click="goDetail(item, index)">
                <div class="avatar-box">
                    <span class="avatar" v-if="item.messageType === 1">
                        <img :src="item.fromCompanyLogo" alt="" v-if="item.fromCompanyLogo">
                        <i class="iconfont icon-im" v-else></i>
                    </span>
                    <span class="avatar" v-if="item.messageType === 2" :style="'background-image: url(' + avatarHolder + ')'"></span>
                    <i class="unread" v-if="item.isReceived === 0"></i>
                </div>
                <dl>
                    <dt v-if="item.messageType === 1">{{item.fromCompanyName ? (item.fromCompanyName + ' - ' + item.fromUserName) : item.fromUserName}}</dt>
                    <dt v-else>系统消息</dt>
                    <dd v-if="item.content.indexOf('data-isimg') !== -1">【图片】消息</dd>
                    <dd v-else v-html="item.content"></dd>
                </dl>
                <span class="date">{{item.createdDate | date('hour')}}</span>
            </a>
        </div>
        <div class="pagination-box" v-if="newsInfo.total > newsInfo.pageSize">
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page.sync="newsInfo.pageNum"
              :page-size="newsInfo.pageSize"
              :total="newsInfo.total"
              @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    name: 'news',
    data () {
        return {
            avatarHolder: require('@/assets/images/news-holder.png'),
            listData: {
                pageNum: 1,
                pageSize: 10
            },
            newsInfo: {}
        };
    },
    computed: mapGetters([
        'socket'
    ]),
    watch: {
        socket: {
            handler (newValue, oldValue) {
                newValue.msg && this.getNewsList(1);
            },
            deep: true
        }
    },
    created () {
        this.getNewsList(1);
    },
    methods: {
        getNewsList (n) {
            this.listData.pageNum = n;
            this.$http.post(this.$api.news.list, this.listData)
                .then(res => {
                    this.newsInfo = res.data.data;
                });
        },
        handleCurrentChange (r) {
            this.getNewsList(r);
        },
        goDetail (d, idx) {
            if (d.messageType === 1) {
                let newWindow = window.open();
                this.$http.get(this.$api.news.read + '/' + d.id)
                    .then(res => {
                        if (res.data.code === 0) {
                            let url = '/im/#type=2&username=' + window.btoa(d.toMobile) + '&touser=' + window.btoa(d.fromMobile) + '&touserCompanyId=' + window.btoa(d.fromCompanyId);
                            newWindow.location.href = url;
                            this.newsInfo.list[idx].isReceived = 1;
                        }
                    });
            } else {
                this.$http.get(this.$api.news.read + '/' + d.id)
                    .then(res => {
                        if (res.data.code === 0) {
                            window.location.href = d.url;
                        }
                    });
            }
        },
        handleAllRead () {
            this.$http.post(this.$api.news.allRead)
                .then(res => {
                    if (res.data.code === 0) {
                        location.reload();
                        return;
                    }
                    this.$message.error(res.data.message);
                });
        }
    }
};
</script>

<style scoped lang="scss">
    .news{
        background-color: #fff;
        padding: 10px;
        width: 1200px;
        margin: 10px auto;
        min-height: 500px;
        .news-title{
            border-bottom: 1px solid $color-border;
            overflow: hidden;
            padding-bottom: 10px;
            h6{
                line-height: 30px;
                font-weight: normal;
                float: left;
                font-size: 16px;
                margin: 0;
                color: $color-title;
                i{
                    margin-right: 5px;
                }
            }
            button{
                float: right;
            }
        }
        .list{
            .item{
                position: relative;
                padding: 10px 200px 10px 64px;
                border-bottom: 1px solid #f5f5f5;
                display: block;
                &:hover{
                    background-color: #f5f5f5;
                }
                .avatar-box{
                    position: absolute;
                    left: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    .avatar{
                        display: inline-block;
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: center center;
                        height: 44px;
                        width: 44px;
                        border-radius: 100%;
                        border: 1px solid $color-border;
                        overflow: hidden;
                        text-align: center;
                        line-height: 40px;
                        color: $color-minor;
                        img{
                            height: 100%;
                            width: 100%;
                        }
                    }
                    .unread{
                        position: absolute;
                        height: 6px;
                        width: 6px;
                        border-radius: 100%;
                        background-color: $color-highlight;
                        right: 0;
                        top: 0;
                    }
                }
                .date{
                    font-size: 12px;
                    right: 10px;
                    position: absolute;
                    top: 10px;
                    color: $color-minor;
                }
                dt{
                    color: $color-title;
                    margin-bottom: 5px;
                    line-height: 1;
                }
                dd{
                    color: $color-minor;
                }
            }
        }
        .el-pagination{
            margin-top: 10px !important;
        }
    }
</style>
