<template>
    <div class="transport-wrap married-wrapper">
        <div class="main-title">
            <h2>撮合设置</h2>
        </div>
        <div class="set-box">
            <p class="note"><span>温馨提示：</span>请勾选相应的产品，平台将推送资源信息。</p>
            <h3><i class="iconfont icon-info"></i>撮合产品设置</h3>
            <p class="btm-note">温馨提示：如需增加撮合品种，请联系客服热线：400-777-6777</p>
            <div class="gy-form">
                <el-checkbox-group v-model="selectedList">
                    <el-checkbox v-for="item in productList" :label="item.productId" :key="item.productId">{{item.productName}}{{item.selected}}</el-checkbox>
                </el-checkbox-group>
                <div class="gy-form-button">
                    <a href="javascript:;" class="gy-button-extra" @click="saveSet">保存</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data () {
        return {
            productList: [],
            selectedList: [],
            companyId: null
        };
    },
    created () {
        this.init();
    },
    watch: {
        'selectedList' (newValue, oldValue) {}
    },
    methods: {
        init () {
            this.companyId = JSON.parse(localStorage.getItem('userInfo')).companyId;
            this.getSetList();
        },
        getSetList () {
            this.$http.get(this.$api.marriedDeal.setList + this.companyId)
                .then(res => {
                    this.productList = res.data.data.productModelList;
                    this.selectedList = res.data.data.dmkProductIdsList;
                }).catch(() => {
                    console.log('出错了');
                });
        },
        saveSet () {
            this.$http.put(this.$api.marriedDeal.set, {id: this.companyId, dmkProductIdsList: this.selectedList})
                .then(res => {
                    if (res.data.code === 0) {
                        this.$message({message: '保存成功', type: 'success'});
                        this.getSetList();
                        return;
                    }
                    this.$message({message: res.data.message, type: 'error'});
                }).catch(() => {
                    console.log('出错了');
                });
        }
    }
};
</script>
<style lang="scss" scoped>
    .set-box{
        padding: 20px 0;
        min-height: 520px;
        position: relative;
        .note{
            padding: 0 16px;
            span{
                color: #df7d00;
            }
        }
        .gy-form{
            padding: 0 30px;
        }
        .btm-note{
            position: absolute;
            left: 16px;
            bottom: 0;
            color: #999;
            font-size: 12px;
        }
    }
</style>
