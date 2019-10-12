<template>
    <div class="recommend news">
        <div class="container">
            <div class="gy-h4">资讯{{id ? '编辑' : '添加'}}</div>
            <form action="javascript:;" name="newsAdd">
                <div class="gy-form-group">
                    <span class="l">标题</span>
                    <input type="text" class="gy-input" v-model="newsData.newsTitle">
                </div>
                <div class="gy-form-group">
                    <span class="l">链接</span>
                    <input type="text" class="gy-input" v-model="newsData.newsUrl">
                </div>
                <div class="gy-form-group">
                    <span class="l">展示排序</span>
                    <input type="text" class="gy-input" v-model="newsData.displayOrder">
                </div>
                <div class="gy-form-button">
                    <button href="javascript:;" class="gy-button-extra" @click="addNews">{{id ? '编辑' : '添加'}}</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            id: '',
            newsData: {
                newsTitle: '',
                newsUrl: '',
                displayOrder: 1
            }
        };
    },
    created () {
        this.id = this.$route.query.id;
        this.id && this.getDetail();
    },
    methods: {
        getDetail () {
            this.$http.get(this.$api.market.newsDetail + '/' + this.id)
                .then(res => {
                    this.newsData.newsTitle = res.data.data.newsTitle;
                    this.newsData.newsUrl = res.data.data.newsUrl;
                    this.newsData.displayOrder = res.data.data.displayOrder;
                });
        },
        addNews () {
            let reg = /^[0-9]+$/;
            if (!this.newsData.newsTitle) {
                this.$message.error('请填写资讯标题');
                return;
            }
            if (!this.newsData.newsUrl) {
                this.$message.error('请填写资讯链接');
                return;
            }
            if (!reg.test(this.newsData.displayOrder)) {
                this.$message.error('展示排序只能为正整数');
                return;
            }
            if (!this.id) {
                this.$http.post(this.$api.market.addNews, this.newsData)
                    .then(res => {
                        if (res.data.code === 0) {
                            this.$alert('添加成功').then(() => {
                                this.$router.push({name: 'generalize-news'});
                            });
                        } else {
                            this.$message.error(res.data.message);
                        }
                    });
                return;
            }
            this.newsData.id = this.id;
            this.$http.put(this.$api.market.addNews, this.newsData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$alert('编辑成功').then(() => {
                            this.$router.push({name: 'generalize-news'});
                        });
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
        }
    }
};
</script>
<style lang="scss" scoped>
    .recommend.news{
        .gy-h3{
            font-weight: normal;
            margin: 0;
        }
        .gy-form-group{
            padding-right: 30px;
            padding-left: 85px;
        }
        .gy-form-group:nth-child(even) {
            padding-right: 0;
            .l {
                width: 86px;
                padding-left: 30px;
            }
        }
        .gy-form-button{
            padding-right: 0;
        }
    }
</style>
