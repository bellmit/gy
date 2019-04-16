<template>
<div>
    <el-dialog width="800px" :title="title" :visible.sync="dialogAddManager" :modal="showmodel" :before-close="close"
               append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
        <div>
            <div class="gy-form-group">
                <span class="l"><strong>*</strong>岗位名称</span>
                <input type="text" v-model="addAndEdit.name" placeholder="请输入">
            </div>
            <div class="gy-form-group">
                <span class="l">岗位职责</span>
                <div class="chkHigherAuthorities">
                    <input type="text" v-model="addAndEdit.positionDesc" placeholder="请输入">
                </div>
            </div>
            <div class="gy-form-group" style="width: 100%;height: auto;padding-right: 0">
                <span class="l">备注</span>
                <textarea class="gy-textarea" v-model="addAndEdit.remark" placeholder="请输入"></textarea>
            </div>
            <div style="clear: both"></div>
            <div class="addManager-btn-group">
                <button type="button" class="gy-button-extra" @click="add(1)">保存并继续新增</button>
                <button type="button" class="gy-button-normal" @click="add(0)">保存</button>
                <button type="button" class="gy-button-normal" @click="close">取消</button>
            </div>
        </div>
    </el-dialog>
</div>
</template>

<script>
export default {
    props: {
        dialogAddManager: Boolean,
        showmodel: Boolean,
        title: String,
        addAndEdit: Object
    },
    methods: {
        add (type) {
            this.$emit('doAddManager', {params: this.addAndEdit, type: type});
        },
        close () {
            this.$emit('closeAddManger');
        }
    }
};
</script>

<style lang="scss" scoped>
.addManager-btn-group {
    text-align: right;
    padding-top: 20px;
    button {
        margin-left: 8px;
    }
}

.gy-form-group {
    padding-left: 74px;
    height: 46px;
    .l {
        width: 64px;
        padding-left: 8px;
        strong {
            left: 0;
        }
    }
    .icon-search {
        position: absolute;
        right: 30px;
        top: 10px;
    }
    .icon-add-no-border {
        position: absolute;
        right: 5px;
        top: 10px;
    }
}

.gy-form-group:nth-child(even) {
    padding-left: 104px;
    padding-right: 0;
    .l {
        width: 94px;
        padding-left: 38px;
        strong {
            left: 28px;
        }
    }
}

.gy-button-extra, .gy-button-normal {
    height: 30px;
    line-height: 30px;
    margin-right: 8px;
}

.gy-textarea{
    max-height: 60px;
}
</style>
