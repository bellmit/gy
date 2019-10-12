<template>
    <div class="commodity-main detail commodity-sku">
        <div  class="gy-h4">{{id ? '规则编辑' : '规则添加'}}</div>
        <form action="javascript:;" name="skuAdd" class="gy-form-box-14">
            <div class="gy-form-group">
                <span class="l">规则名称</span>
                <input class="gy-input" placeholder="请输入规则名称" type="text" v-model="skuData.skuNoRuleName" >
            </div>
            <div class="gy-form-group">
                <span class="l">规则前缀</span>
                <input class="gy-input" placeholder="请输入规则前缀" type="text" v-model="skuData.skuNoPrefix">
            </div>
            <div class="gy-form-group">
                <span class="l">当前值</span>
                <input class="gy-input" placeholder="请输入当前值" type="text" v-model="skuData.skuNoCurrentNum">
            </div>
            <div class="gy-form-group">
                <span class="l">递增数</span>
                <input class="gy-input" placeholder="请输入递增数" type="text" v-model="skuData.skuNoAddNum">
            </div>
            <div class="gy-form-group">
                <span class="l">填充值</span>
                <input class="gy-input" placeholder="请输入填充值" type="text" v-model="skuData.skuNoFill">
            </div>
            <!--<div class="gy-form-group">-->
                <!--<span class="l">排序</span>-->
                <!--<input class="gy-input" type="text" v-model="skuData.skuNoOrder">-->
            <!--</div>-->
            <div class="gy-form-group">
              <span class="l">长度</span>
              <input class="gy-input" placeholder="请输入长度" type="text" v-model="skuData.skuNoLength">
            </div>
            <div class="gy-form-group">
                <span class="l">规则状态</span>
                <div>
                    <input type="radio" v-model="skuData.valid" value="1" name="status" checked><span>可用</span>
                    <input type="radio" v-model="skuData.valid" value="0" name="status"><span>不可用</span>
                </div>
            </div>
            <div class="gy-form-group">
                <span class="l">规则描述</span>
                <textarea v-model="skuData.skuNoRuleDescription" placeholder="请输入规则描述" class="gy-textarea"></textarea>
            </div>
            <div class="clear"></div>
            <div class="form-group-button">
                <button class="gy-button-extra" @click="add">{{id ? '编辑' : '添加'}}</button>
                <!--<button class="gy-button-normal" type="reset">取消</button>-->
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            id: '',
            skuData: {
                skuNoRuleName: '',
                skuNoRuleDescription: '',
                skuNoPrefix: '',
                skuNoCurrentNum: '',
                skuNoAddNum: '',
                skuNoFill: '',
                skuNoLength: '',
                valid: 1
            }
        };
    },
    created () {
        this.id = this.$route.query.id;
        this.id && this.getDetail();
    },
    methods: {
        add () {
            if (this.skuData.skuNoRuleName === '') {
                this.$message.error('请填写规则名称');
                return;
            }
            if (this.skuData.skuNoPrefix === '') {
                this.$message.error('请填写规则前缀');
                return;
            }
            if (this.skuData.skuNoCurrentNum === '') {
                this.$message.error('请填写当前值');
                return;
            }
            if (this.skuData.skuNoAddNum === '') {
                this.$message.error('请填写递增数');
                return;
            }
            if (this.skuData.skuNoFill === '') {
                this.$message.error('请填写填充值');
                return;
            }
            if (this.skuData.skuNoLength === '') {
                this.$message.error('请填写长度');
                return;
            }
            if (this.skuData.skuNoRuleDescription === '') {
                this.$message.error('请填写描述');
                return;
            }
            if (this.id) {
                this.skuData.id = this.id;
                this.$http.put(this.$api.sku.add, this.skuData)
                    .then((res) => {
                        if (res.data.code === 0) {
                            this.$message.success('编辑成功');
                            this.$router.push({path: 'list'});
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                return;
            }
            this.$http.post(this.$api.sku.add, this.skuData)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('添加成功');
                        this.$router.push({path: 'list'});
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getDetail () {
            this.$http.get(this.$api.sku.add + '/' + this.id)
                .then((res) => {
                    this.skuData = res.data.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
};
</script>
<style lang="scss" scoped>
.gy-form-box-14 {
   padding: 6px 14px;
}
.commodity-main .form-group-button {
   margin: 11px 0 20px 0;
   text-align: right;
}
.gy-form-group {
  padding-left: 66px;
.l {
  width: 56px;
}
}
.gy-form-group:nth-child(odd) {
  padding-right: 30px;
}
.gy-form-group:nth-child(even) {
  padding-left: 96px;
.l {
  width: 86px;
  padding-left: 30px;
}
}
</style>
