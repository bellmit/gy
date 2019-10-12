<template>
    <section class="integral-category f-container">
        <h3 class="gy-h4">类目总数：{{categoryList.length}}</h3>
        <div class="gy-form-button">
            <!-- <button class="gy-button-normal" @click="newCategory">添加</button> -->
            <button class="gy-button-extra" @click="editCategory">编辑</button>
            <!-- <button class="gy-button-normal" @click="del">删除</button> -->
        </div>
        <el-table
            class="gy-table"
            :data="categoryList"
            stripe
            ref="categoryTable">
            <el-table-column type="selection" width="80px"></el-table-column>
            <el-table-column prop="name" label="类目名称" width="200"></el-table-column>
            <el-table-column prop="description" label="类目描述" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="count" label="商品数量" width="200"></el-table-column>
        </el-table>

        <!-- 弹框，编辑和新增 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogShow">
            <el-form class="gy-form">
                <el-form-item class="gy-label" :label="item.name" v-for="(item, key) of categoryInfo" :key="key">
                    <input type="text" class="gy-input" v-model="item.text" :maxlength="item.limit">
                    <span class="input-limit">{{item.text.length}} / {{item.limit}}</span>
                </el-form-item>
            </el-form>
            <div class="gy-form-button">
                <button class="gy-button-extra" @click="saveCategory">保存</button>
                <button class="gy-button-normal" @click="dialogShow = false">取消</button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import services from '@/services';
const genCategory = info => {
    const category = {
        name: {
            name: '类目名称',
            text: '',
            limit: 10
        },
        description: {
            name: '类目描述',
            text: '',
            limit: 30
        }
    };
    if (typeof info === 'object') {
        for (const [key, value] of Object.entries(info)) {
            if (category[key]) {
                category[key].text = value;
            }
        }
    }
    return category;
};

export default {
    name: 'integral-category',
    data () {
        return {
            categoryList: [],
            categoryInfo: genCategory(),
            categoryId: '',
            pageInfo: {
                total: 5,
                pageSize: 10,
                pageNum: 1
            },
            dialogShow: false,
            dialogType: ''
        };
    },
    computed: {
        dialogTitle () {
            return this.dialogType === 'edit' ? '类目编辑' : '类目添加';
        }
    },
    watch: {
        dialogType (newval) {
            this.dialogShow = !!newval;
        },
        dialogShow (newval) {
            this.dialogType = newval ? this.dialogType : false;
        }
    },
    methods: {
        async del () {
            const selection = this.$refs.categoryTable.selection;
            if (selection.length) {
                const count = selection.length === 1 ? selection[0].count : selection.reduce((n, m) => n.count + m.count);
                if (count) {
                    this.$alert('所选类目下有商品，不能删除');
                } else {
                    // this.$confirm('确定删除所选类目').then(() => {
                    //     console.log('delete selection');
                    // }).catch(() => {
                    //     console.log('I am sorry');
                    // });
                    await this.$confirm('确定删除所选类目');
                    services.integral.delCategory(selection.map(item => item.id).join()).then(result => {
                        this.$message.success('删除成功');
                        this.getCategory();
                    }).catch(() => {
                        this.$message.error('删除失败');
                    });
                }
            } else {
                this.$alert('请选择删除类目');
            }
        },
        getCategory () {
            services.integral.getCategory().then(result => {
                this.categoryList = result;
            }).catch(() => {
                console.log('获取类目失败！');
            });
        },
        saveCategory () {
            const category = {};
            const type = this.dialogType;
            if (type === 'edit') {
                category.id = this.categoryId;
            }
            for (const [key, value] of Object.entries(this.categoryInfo)) {
                category[key] = value.text;
            }
            const str = type === 'edit' ? '编辑' : '新增';
            services.integral[type === 'edit' ? 'editCategory' : 'saveCategory'](category).then(result => {
                this.$message.success(`${str}成功`);
                this.getCategory();
                this.dialogType = '';
            }).catch(() => {
                this.$message.error(`${str}失败`);
            });
        },
        editCategory () {
            const selection = this.$refs.categoryTable.selection;
            if (!selection.length) {
                this.$alert('请选择编辑项');
            } else if (selection.length > 1) {
                this.$alert('只能编辑一个类目');
            } else {
                const sel = selection[0];
                this.categoryInfo = genCategory(sel);
                this.categoryId = sel.id;
                this.dialogType = 'edit';
            }
        },
        newCategory () {
            this.categoryInfo = genCategory();
            this.dialogType = 'new';
        }
    },
    mounted () {
        this.getCategory();
    }
};
</script>

<style lang="scss" scoped>
    .integral-category {
        width: 100%;
        .gy-form .gy-input {
            width: calc(100% - 7em);
        }
        .gy-form-button{
            padding-right:0;
        }
    }
</style>
