<template>
    <div class="helpCenterDetail">
        <h1 v-if = "id !== undefined">编辑目录</h1>
        <h1 v-else>添加目录</h1>
        <div class="gy-form-group">
            <span class="l"><i>*</i>目录名称</span>
            <input type="text" placeholder="请输入" v-model="addList.name">
        </div>
        <div class="gy-form-group">
            <span class="l"><i>*</i>目录描述</span>
            <input type="text" placeholder="请输入" v-model="addList.excerpt">
        </div>
        <div class="gy-form-group">
            <span class="l"><i>*</i>目录排序</span>
            <input type="text" placeholder="请输入" v-model="addList.orderNum">
        </div>
        <div style="clear: both"></div>
        <div class="operation">
            <button class="gy-button-extra" @click="helpSave()">保存</button>
            <button class="gy-button-normal" @click="cancel()">取消</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'detail',
    data () {
        return {
            id: null,
            show: false,
            addList: {
                id: null,
                name: null,
                describe: null,
                orderNum: null,
                type: 1
            }
        };
    },
    mounted () {
        this.id = this.$route.query.id;
        if (this.id !== undefined) {
            this.getDetail();
        }
    },
    methods: {
        helpSave () {
            if (!this.addList.name) {
                this.$message.error('目录名称不能为空');
                return;
            }
            if (!this.addList.excerpt) {
                this.$message.error('目录描述不能为空');
                return;
            }
            if (!this.addList.orderNum) {
                this.$message.error('目录排序不能为空');
                return;
            }
            let url;
            if (this.id !== undefined) {
                url = this.$api.htlpCenter.update;
            } else {
                url = this.$api.htlpCenter.save;
            }
            this.$http.post(url, this.addList).then(res => {
                if (res.data.code === 0) {
                    this.$confirm('保存成功', '提示', {type: 'success'})
                        .then(() => {
                            this.$router.push({name: 'helpCenterList'});
                        });
                }
            });
        },
        getDetail () {
            this.$http.get(this.$api.htlpCenter.getDetails + '/' + this.id).then(res => {
                if (res.data.code === 0) {
                    this.addList = res.data.data;
                }
            });
        },
        cancel () {
            this.$router.push({name: 'helpCenterList'});
        }
    }
};
</script>

<style lang="scss" scoped>
    .helpCenterDetail{
        .operation{
            text-align: right;
        }
        h1{
            font-size: 18px;
            color: #333;
        }
        .gy-form-group{
            .l{
                i{
                    color: red;
                    margin-right: 3px;
                }
            }
        }
    }
</style>
