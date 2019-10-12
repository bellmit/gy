<template>
    <div class="recommend news">
        <div class="container">
            <div class="gy-h4">资讯管理</div>
            <div class="list">
                <div class="operation-menu">
                    <router-link :to="{ name: 'generalize-news-add' }" class="gy-button-extra">添加</router-link>
                    <button @click="edit" class="gy-button-normal">编辑</button>
                    <button @click="del" class="gy-button-normal">删除</button>
                </div>
                <table class="gy-table">
                    <thead>
                    <tr>
                        <th>选择</th>
                        <td>标题</td>
                        <td>链接</td>
                        <td>展示排序</td>
                        <td>状态</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in newsList.list" :key="index">
                        <th><input type="checkbox" :checked="checkedList.indexOf(item.id) >= 0" @change="handleCheckChange(item.id)"></th>
                        <td>{{item.newsTitle}}</td>
                        <td>{{item.newsUrl}}</td>
                        <td>{{item.displayOrder}}</td>
                        <td>{{item.status === 1 ? '可用' : '不可用'}}</td>
                    </tr>
                    </tbody>
                </table>
                <div class="pagination" v-if="newsList.total > newsList.pageSize">
                    <el-pagination
                      background
                      layout="prev, pager, next"
                      :current-page.sync = "newsList.pageNum"
                      :page-size="newsList.pageSize"
                      :total="newsList.total"
                      @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            newsList: {},
            newsData: {
                keywords: null,
                pageNum: 1,
                pageSize: 10
            },
            checkedList: []
        };
    },
    created () {
        this.getNewsList(1);
    },
    methods: {
        getNewsList (n) {
            this.newsData.pageNum = n;
            this.$http.post(this.$api.market.newsList, this.newsData)
                .then(res => {
                    this.newsList = res.data.data;
                });
        },
        handleCurrentChange: function (r) {
            this.getNewsList(r);
        },
        handleCheckChange (id) {
            let idx = this.checkedList.indexOf(id);
            idx >= 0 ? this.checkedList.splice(idx, 1) : this.checkedList.push(id);
        },
        edit () {
            let that = this;
            that.verify(that, function () {
                that.$router.push({name: 'generalize-news-add', query: {id: that.checkedList[0]}});
            });
        },
        del () {
            let that = this;
            let valid;
            that.newsList.list.forEach(item => {
                item.id === that.checkedList[0] && (valid = item.status);
            });
            that.verify(that, function () {
                that.$confirm('确认删除选择的资讯吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$http.put(that.$api.market.delNews, {id: that.checkedList[0], status: Number(valid) === 1 ? 0 : 1})
                        .then(function (res) {
                            if (res.data.code === 0) {
                                that.getNewsList();
                                return;
                            }
                            that.$alert(res.data.message, '出错了');
                        });
                }).catch(() => {
                });
            });
        },
        verify (that, callback) {
            if (that.checkedList.length === 0) {
                that.$alert('请选择一条资讯', '提示');
                return;
            }
            if (that.checkedList.length > 1) {
                that.$alert('只能选择一条资讯', '提示');
                return;
            }
            typeof callback === 'function' && callback();
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
        .operation-menu{
            text-align: right;
            margin-bottom: 10px;
        }
    }
</style>
