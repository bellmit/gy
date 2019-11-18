<template>
    <div class="helpCenterOption">
        <h1 v-if = "value !== undefined">编辑主题</h1>
        <h1 v-else>添加主题</h1>
        <div class="gy-form-group">
            <span class="l"><i>*</i>主题名称</span>
            <input type="text" placeholder="请输入" v-model="addListOption.name">
        </div>
        <div class="gy-form-group">
            <span class="l"><i>*</i>主题描述</span>
            <input type="text" placeholder="请输入" v-model="addListOption.excerpt">
        </div>
        <div class="gy-form-group">
            <span class="l"><i>*</i>主题排序</span>
            <input type="text" placeholder="请输入" v-model="addListOption.orderNum">
        </div>
        <div style="clear: both"></div>
        <div>
            <!-- <uediter :value="ueditor.value" :config="ueditor.config" ref="ue"></uediter> -->
            <vue-editor
                ref="newEditor"
                v-model="addListOption.content"
                :options="editorOption">
            </vue-editor>
            <form action="" method="post" enctype="multipart/form-data" id="uploadFormMulti">
                <input style="display: none" :id="uniqueId" type="file" name="avator" accept="image/jpg,image/jpeg,image/png,image/gif" @change="testUpload('uploadFormMulti')"><!--style="display: none"-->
            </form>
        </div>
        <div class="operation">
            <button class="gy-button-extra" @click="helpSaveOption()">保存</button>
            <button class="gy-button-normal" @click="cancel()">取消</button>
        </div>
    </div>
</template>
<script>
import Uediter from '@/components/UE.vue';
import services from '@/services';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor, Quill } from 'vue-quill-editor';
import { container } from 'quill-image-extend-module';
export default {
    name: 'detail',
    components: {
        Uediter,
        VueEditor: quillEditor
    },
    data () {
        return {
            id: null,
            value: null,
            uniqueId: 'asdkfjlafd',
            addListOption: {
                name: null,
                describe: null,
                orderNum: null,
                content: null,
                type: 2,
                category: null
            },
            ueditor: {
                config: {
                    initialFrameWidth: 1608,
                    initialFrameHeight: 320
                }
            },
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
    mounted () {
        this.addListOption.category = this.$route.query.id;
        this.value = this.$route.query.value;
        console.log(this.value);
        if (this.value !== undefined) {
            this.id = this.$route.query.id;
            this.getDetail();
        } else {
            this.ueditor.value = '请输入。。。';
        }
    },
    methods: {
        helpSaveOption () {
            if (!this.addListOption.name) {
                this.$message.error('主题名称不能为空');
                return;
            }
            if (!this.addListOption.excerpt) {
                this.$message.error('主题描述不能为空');
                return;
            }
            if (!this.addListOption.orderNum) {
                this.$message.error('主题排序不能为空');
                return;
            }
            let url;
            if (this.value !== undefined) {
                url = this.$api.htlpCenter.update;
            } else {
                url = this.$api.htlpCenter.save;
            }
            this.$http.post(url, this.addListOption).then(res => {
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
                    this.addListOption = res.data.data;
                    this.ueditor.value = res.data.data.content;
                }
            });
        },
        testUpload: async function (id) {
            this.imageLoading = true;
            const formData = document.querySelector('#' + id);
            if (formData[0].files.length === 0) return;
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
            } catch ({message: msg}) {
                this.$message.warning(msg);
            }
            document.getElementById(this.uniqueId).value = '';
        },
        cancel () {
            this.$router.push({name: 'helpCenterList'});
        }
    }
};
</script>

<style lang="scss" scoped>
    .helpCenterOption{
        .operation{
            text-align: right;
            margin-top: 15px;
        }
        h1{
            font-size: 18px;
            color: #333;
        }
        .ql-bubble .ql-hidden{
            display: block;
        }
        .ql-editor{
            min-height: 8em;
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
