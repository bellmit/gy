<template>
    <section class="integral-add-goods f-container">
        <h3 class="gy-h3">{{id ? '编辑' : '添加'}}兑换品</h3>
        <el-form class="gy-detail-form" :model="info" :rules="ruleForm" ref="form" label-width="106px">
            <el-form-item class="half" label="选择类目" prop="prdCategoryId">
                <el-select v-model="info.prdCategoryId">
                    <el-option
                        v-for="(item, index) of categoryList"
                        :key="index"
                        :value="item.id"
                        :label="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="half" label="上架状态" prop="status">
                <el-radio
                    v-model="info.status"
                    v-for="(item, key) of goodsConst.statuses"
                    :key="key"
                    :label="+key">
                    {{item}}
                </el-radio>
            </el-form-item>
            <el-form-item class="half gy-label" label="积分价格" prop="redemptionPrice">
                <input type="text" class="gy-input" v-model="info.redemptionPrice">
                <span class="input-limit">积分</span>
            </el-form-item>
            <el-form-item class="half" label="剩余库存" prop="inventory">
                <el-input v-model="info.inventory"></el-input>
            </el-form-item>
            <el-form-item class="half" label="兑换品名称" prop="redemptionName">
                <el-input v-model="info.redemptionName"></el-input>
            </el-form-item>
            <el-form-item label="兑换品主图">
                <el-upload
                    class="product-upload"
                    action="api"
                    list-type="picture-card"
                    :file-list="filePath"
                    :on-remove="onRemove"
                    :limit="1"
                    :http-request="uploadImg">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <p class="tips">添加jpg，jpeg，png格式的图片</p>
            </el-form-item>
            <el-form-item label="兑换品描述" prop="description">
                <vue-editor
                    ref="newEditor"
                    v-model="info.description"
                    :options="editorOption">
                </vue-editor>
                <form action="" method="post" enctype="multipart/form-data" id="uploadFormMulti">
                    <input style="display: none" :id="uniqueId" type="file" name="avator" multiple accept="image/jpg,image/jpeg,image/png,image/gif" @change="testUpload('uploadFormMulti')"><!--style="display: none"-->
                </form>
            </el-form-item>
        </el-form>
        <div class="gy-form-button">
            <button class="gy-button-extra" @click="submit">保存</button>
            <button class="gy-button-normal" @click="$router.replace('/index/integral/goods')">取消</button>
        </div>
    </section>
</template>

<script>
import goodsConst from './const';
import services from '@/services';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import { quillEditor, Quill } from 'vue-quill-editor';
import { container } from 'quill-image-extend-module';

const ruleGen = (required, message, trigger = 'blur') => {
    return {
        required: typeof required === 'boolean' ? required : true,
        message: typeof required === 'boolean' ? message : required,
        trigger: typeof required === 'boolean' ? trigger : message
    };
};

export default {
    name: 'integral-add-goods',
    data () {
        return {
            goodsConst,
            id: this.$route.query.i,
            info: {},
            filePath: [],
            ruleForm: {
                categoryId: ruleGen('请输入兑换品类目'),
                price: ruleGen('请输入兑换品价格'),
                count: ruleGen('请输入兑换品库存'),
                name: ruleGen('请输入兑换品名称')
            },
            uniqueId: 'asdkfjlafd',
            categoryList: [],
            editorOption: {
                modules: {
                    toolbar: {
                        container,
                        handlers: {
                            'image': (image) => {
                                this.addImgRange = this.$refs.newEditor.quill.getSelection();
                                if (image) {
                                    const fileInput = document.getElementById(this.uniqueId);
                                    fileInput.click();
                                }
                            }
                        }
                    }
                }
            }
        };
    },
    methods: {
        // 获取商品详情
        getDetail (id) {
            services.integral.getGoodsDetail(id).then(res => {
                this.info = res;
                this.filePath = [];
                if (res.filePath) {
                    this.filePath.push({ url: res.filePath });
                }
            }).catch(() => {
                console.log('获取商品详情失败');
            });
        },
        // 获取类目
        getCategory () {
            services.integral.getCategory().then(res => {
                this.categoryList = res;
            }).catch(() => {
                console.log('获取类目失败');
            });
        },
        submit () {
            if (!/^\d+$/.test(this.info.redemptionPrice)) {
                this.$message.error('积分价格只能为正整数');
                return false;
            }
            if (!/^\d+$/.test(this.info.inventory)) {
                this.$message.error('剩余库存只能为正整数');
                return false;
            }
            if (!this.info.redemptionName) {
                this.$message.error('请输入兑换品名称');
                return false;
            }
            if (this.id) {
                services.integral.editGoods(this.info).then(result => {
                    this.$message.success(`编辑成功`);
                    this.getDetail(this.id);
                }).catch(() => {
                    this.$message.error(`编辑失败`);
                });
            } else {
                services.integral.addGoods(this.info).then(result => {
                    this.$message.success(`新增成功`);
                    for (const key of Object.keys(this.info)) {
                        this.info[key] = '';
                    }
                    this.filePath = [];
                }).catch(() => {
                    this.$message.error(`新增失败`);
                });
            }
        },
        uploadImg (file) {
            services.integral.uploadFile(file.file).then(res => {
                this.filePath.push({
                    url: res.data
                });
                this.info.filePath = res.data;
            }).catch(err => {
                console.log(err);
            });
        },
        onRemove (file) {
            this.filePath = [];
            this.info.file = '';
        },
        testUpload: async function (id) {
            this.imageLoading = true;
            const formData = document.querySelector('#' + id);
            try {
                const data = await services.integral.uploadFile(formData[0].files[0]); // 自定义的图片上传函数
                const url = data.data;
                if (url != null && url.length > 0) {
                    let value = url;
                    this.addImgRange = this.$refs.newEditor.quill.getSelection();
                    value = value.indexOf('http') !== -1 ? value : 'http:' + value;
                    this.$refs.newEditor.quill.insertEmbed(this.addImgRange != null ? this.addImgRange.index : 0, 'image', value, Quill.sources.USER);
                } else {
                    this.$message.warning('图片增加失败');
                }
                document.getElementById(this.uniqueId).value = '';
            } catch ({message: msg}) {
                document.getElementById(this.uniqueId).value = '';
                this.$message.warning(msg);
            }
        }
    },
    mounted () {
        if (this.id) {
            this.getDetail(this.id);
        }
        this.getCategory();
    },
    components: {
        VueEditor: quillEditor
    }
};
</script>

<style lang="scss">
    .integral-add-goods {
        .ql-picker-label:before {
            transform: translateY(-8px);
        }
        .ql-color,
        .ql-background,
        .ql-align {
            transform: translateY(-6px);
        }
        .ql-editor {
            min-height: 8em;
        }
    }
</style>
