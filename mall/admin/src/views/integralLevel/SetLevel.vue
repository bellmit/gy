<template>
    <section class="set-level f-container">
        <h3 class="gy-h3">会员等级设置</h3>
        <div class="gy-form-button">
            <button class="gy-button-normal" @click="edit">编辑</button>
        </div>
        <el-table
            class="gy-table"
            :data="levelList"
            stripe
            ref="table">
            <el-table-column type="selection" width="80"></el-table-column>
            <el-table-column label="等级名称" width="200">
                <span slot-scope="{row, $index}">
                    <template v-if="$index !== editIndex">
                        {{row.name}}
                    </template>
                    <template v-else>
                        <el-input v-model="editLevel.name"></el-input>
                    </template>
                </span>
            </el-table-column>
            <el-table-column label="积分门槛" width="200">
                <span slot-scope="{row, $index}">
                    <template v-if="$index !== editIndex">
                        {{row.pointStart}}
                    </template>
                    <template v-else>
                        <el-input v-model="editLevel.pointStart"></el-input>
                    </template>
                </span>
            </el-table-column>
            <el-table-column label="积分上限" width="200">
                <span slot-scope="{row, $index}">
                    <template v-if="$index !== editIndex">
                        {{row.pointEnd}}
                    </template>
                    <template v-else>
                        <el-input v-model="editLevel.pointEnd"></el-input>
                    </template>
                </span>
            </el-table-column>
            <el-table-column label="专属标识">
                <span class="upload-img-span" slot-scope="{row, $index}">
                    <template v-if="$index !== editIndex">
                        <img :src="row.avatars" alt="专属标识">
                    </template>
                    <template v-else>
                        <img :src="editLevel.avatars[0].url" alt="专属标识">
                        <el-upload
                            class="product-upload"
                            action="api"
                            list-type="picture-card"
                            :file-list="editLevel.avatars"
                            :on-remove="onRemove"
                            :limit="9"
                            :http-request="uploadImg">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </template>
                </span>
            </el-table-column>
            <el-table-column label="头像标识">
                <span class="upload-img-span" slot-scope="{row, $index}">
                    <template v-if="$index !== editIndex">
                        <img :src="row.gradestamp" alt="专属标识">
                    </template>
                    <template v-else>
                        <img :src="editLevel.gradestamp[0].url" alt="专属标识">
                        <el-upload
                            class="product-upload"
                            action="api"
                            list-type="picture-card"
                            :file-list="editLevel.gradestamp"
                            :on-remove="onRemove"
                            :limit="9"
                            :http-request="uploadImg2">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </template>
                </span>
            </el-table-column>
        </el-table>
        <div class="gy-form-button submit-btn-group" v-if="editIndex > -1">
            <button class="gy-button-extra" @click="submit">保存</button>
            <button class="gy-button-normal" @click="cancel">取消</button>
        </div>
    </section>
</template>

<script>
import services from '@/services/';

const genLevel = (option = {}) => {
    const level = {
        id: option.id,
        name: option.name,
        pointStart: option.pointStart,
        pointEnd: option.pointEnd,
        avatars: [{ url: option.avatars }],
        gradestamp: [{ url: option.gradestamp }]
    };
    return level;
};

export default {
    name: 'set-level',
    data () {
        return {
            levelList: [],
            editIndex: -1,
            editLevel: genLevel()
        };
    },
    methods: {
        getLevels () {
            services.integralLevel.getLevels().then(result => {
                this.levelList = result;
            }).catch(() => {
                this.$message.error('获取会员等级失败');
            });
        },
        uploadImg (file) {
            services.integral.uploadFile(file.file).then(res => {
                this.$set(this.editLevel, 'avatars', [{ url: res.data }]);
            }).catch(err => {
                console.log(err);
            });
        },
        uploadImg2 (file) {
            services.integral.uploadFile(file.file).then(res => {
                this.$set(this.editLevel, 'gradestamp', [{ url: res.data }]);
            }).catch(err => {
                console.log(err);
            });
        },
        onRemove () {
        },
        getSelection () {
            const sel = this.$refs.table.selection;
            if (sel.length > 1) {
                this.$message.warning('只能选择一个');
                return [];
            } else if (!sel.length) {
                this.$message.warning('请选择一个');
                return [];
            }
            return sel;
        },
        edit () {
            const sel = this.getSelection()[0];
            if (sel) {
                this.editIndex = this.levelList.findIndex(item => item === sel);
                this.editLevel = genLevel(sel);
            }
        },
        submit () {
            const level = this.editLevel;
            services.integralLevel.editLevel({
                id: level.id,
                name: level.name,
                pointStart: level.pointStart,
                pointEnd: level.pointEnd,
                avatars: level.avatars[0].url,
                gradestamp: level.gradestamp[0].url
            }).then(() => {
                this.$message.success('修改成功');
                this.getLevels();
                this.editIndex = -1;
            }).catch(() => {
                this.$message.error('修改失败，请稍候重试');
            });
        },
        cancel () {
            this.editIndex = -1;
            this.editLevel = genLevel();
        }
    },
    mounted () {
        this.getLevels();
    }
};
</script>

<style lang="scss">
    .set-level {
        .upload-img-span {
            position: relative;
            .product-upload,
            .el-upload {
                position: absolute;
                top: 0; right: 0; bottom: 0; left: 0;
                width: auto;
                opacity: 0;
            }
            img {
                width: 30px;
            }
        }
        .submit-btn-group {
            margin-top: 48px;
        }
    }
</style>
