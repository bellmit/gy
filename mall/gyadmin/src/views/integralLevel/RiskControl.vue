<template>
    <section class="risk-control f-container">
        <div class="gy-h4">积分获取企业黑名单</div>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l">添加企业</span>
                <input type="text" v-model="blackName">
            </div>
            <div class="gy-form-group">
                <button class="gy-button-extra" @click="addBlack">确定</button>
            </div>
        </div>
        <h3 class="gy-h4">企业黑名单</h3>
        <ul class="black-name">
            <li v-for="(item, index) in companyList" :key="index"><a href="javascript:;">{{item.name}}<i class="iconfont icon-weitijiao" @click="removeBlack(item.name)"></i></a></li>
        </ul>
    </section>
</template>

<script>
export default {
    name: 'risk-control',
    data () {
        return {
            blackName: null,
            companyList: []
        };
    },
    created () {
        this.getCompany();
    },
    methods: {
        addBlack () {
            this.$http.put(this.$api.point.addBlackName, {blacklist: 1, name: this.blackName})
                .then(res => {
                    if (res.data.code === 0) {
                        this.$message.success('添加成功');
                        this.getCompany();
                        return;
                    }
                    this.$message.error(res.data.message);
                });
        },
        removeBlack (name) {
            this.$confirm('确定将"' + name + '"移除黑名单吗？', '提示').then(() => {
                this.$http.put(this.$api.point.removeName, {blacklist: 0, name: name})
                    .then(res => {
                        if (res.data.code === 0) {
                            this.$message.success('删除成功');
                            this.getCompany();
                            return;
                        }
                        this.$message.error(res.data.message);
                    });
            });
        },
        getCompany () {
            this.$http.post(this.$api.point.blackName, {pageNum: 1, pageSize: 10000, keywords: null})
                .then(res => {
                    console.log(res);
                    this.companyList = res.data.data;
                });
        }
    }
};
</script>
<style lang="scss" scoped>
    .black-name{
        overflow: hidden;
        li{
            float: left;
            width: 25%;
            a{
                display: block;
                height: 40px;
                line-height: 20px;
                padding: 10px 0;
                i{
                    display: none;
                    margin-left: 5px;
                }
                &:hover{
                    i{
                        display: inline-block;
                    }
                }
            }
        }
    }
    .gy-form{
        padding:0 0 0 14px;
    }
</style>
