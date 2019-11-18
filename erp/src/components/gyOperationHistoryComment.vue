<template>
    <div class="setpElementMain" v-if="opHistory && opHistory.length > 0">
        <div class="setpElementTop">
            <span>操作流程</span>
        </div>
        <div class="setpElementCenter">
            <div class="setpElementCenterMain" v-for="(item, index) in opHistory" :key="index">
                <div class="stepRadio">
                    <div v-if="item.executeStatus >=2" class="curr_big"></div>
                    <div v-else-if="item.executeStatus === 1" class="big"></div>
                    <div v-else-if="item.executeStatus === 0" class="small"></div>
                    <div v-else class="big"></div>
                </div>
                <div class="remarksComment" v-if="item.sceneType === 1"><!-- 评论 -->
                    <div class="all"><span class="name">{{item.commentCreater}}</span><span class="agree">添加了评论</span><span class="time">{{item.createdDate | date(2)}}</span></div>
                    <div class="comment my-input-box" v-html="item.approveComment">{{item.approveComment}}</div>
                    <gy-file-img :imgInfo="items" :key="indext" v-for="(items, indext) in item.commentFiles" />
                </div>
                <div class="remarksComment" v-else><!-- 操作流程  -->
                    <div class="all"><span class="name">{{item.username}}</span><span class="agree">{{item.resultCode|resultCode(item.executeStatus)}}</span><span class="time">{{item.createdDate | date(2)}}</span></div>
                    <div class="comment" style="color:#999">{{item.actionDesc}}</div>
                    <div class="comment" v-if="item.msg !== null">{{item.msg}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import gyFileImg from './../views/components/gyFileImg';

export default {
    name: 'gyoperationHistoryComment',
    components: {
        gyFileImg
    },
    data () {
        return {
            opHistory: []
        };
    },
    methods: {
        display (url, params) {
            let that = this;
            that.$http.post(url, params).then((res) => {
                if (res.data.code === 0) {
                    that.opHistory = res.data.data;
                    if (that.opHistory.length === 0) {
                        this.$emit('checkHistory');
                    }
                }
            }).catch((e) => {
                console.log(e);
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    .myinput {
        vertical-align: initial;
        color: #4A90E2;
        width: 80px;
        border: none;
        text-align: start;
    }
    .setpElementMain{
        margin-top: 20px;
        height: 100%;
        .testimsd{
            display: inline-block;
            border: none;
            width: auto;
        }
        .setpElementTop{
            margin-bottom: 20px;
            padding-left: 16px;
            height: 35px;
            line-height: 35px;
            font-size: 16px;
            color: #333;
            font-weight: bold;
        }
        .setpElementCenter{
            width: 90%;
            margin-left: 30px;
            padding: 0;
            .setpElementCenterMain{
                .setpElementCenterMain {
                    border: none;
                }
                height: auto;
                border-left: 1px solid #D7D7D7;
                .stepRadio{
                    // display: inline-block;
                    box-sizing: border-box;
                    width: 15px;
                    height: 15px;
                    margin-left: -8px;
                    background: #fff;
                    .big{
                        width: 15px;
                        height: 15px;
                        border: 2px solid #4A90E2;
                        border-radius:50% ;
                        margin: auto;
                        box-sizing: border-box;
                    }
                    .curr_big {
                        width: 17px;
                        height: 17px;
                        border: 2px solid red;
                        border-radius:50% ;
                        margin: auto;
                        box-sizing: border-box;
                        margin-left: -1px;
                    }
                    .small{
                        width: 15px;
                        height: 15px;
                        border: 2px solid #C8C8C8;
                        border-radius:50% ;
                        margin: auto;
                        box-sizing: border-box;
                    }
                }
                .remarksComment{
                    display: inline-block;
                    margin: -20px 0 0 20px;
                    .all{
                        width: 100%;
                    }
                    .name{
                        color: #333;
                        display: inline-block;
                    }
                    .agree{
                        display: inline-block;
                        margin-left: 15px;
                        color: #333
                    }
                    .time{
                        display: inline-block;
                        float:right;
                        color: #999;
                    }
                    .comment{
                        width: 760px;
                        padding-right: 160px;
                        min-height: 20px;
                        height: auto;
                        margin-top: 10px;
                        margin-bottom: 15px;
                    }
                }
            }
            .setpElementCenterMain:last-child{
                border: none;
            }
        }
    }
</style>
<style lang="scss">
.setpElementMain {
    .myinput {
        vertical-align: initial;
        color: #4A90E2;
        width: 80px;
        border: none;
        text-align: start;
        padding: 0 10px;
        height: 30px;
        line-height: 29px;
        vertical-align: middle;
        font-size: 14px;
        background-color: #fff;
    }
}
</style>
