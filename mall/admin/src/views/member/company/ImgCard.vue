<template>
    <section class="gy-img-card gy-form-group single-row" v-show="show">
        <span class="l text-top">{{label}}</span>
        <template v-for="(item, index) of imgs">
            <span class="gy-img-label" v-for="subItem of imgList[item].list" :key="subItem.id">
                <img v-if="type === 'view'" :class="['img-size', imgClass]" :src="contain(subItem.filePath)" @click="emit(subItem)"/>
            </span>
            <el-upload
                v-if="type !== 'view'"
                action=""
                :key="`${index}-upload`"
                :class="{ limit: (limit && imgEdit[index].length >= limit) }"
                list-type="picture-card"
                :file-list="imgEdit[index]"
                :limit="limit"
                :on-remove="removeImg(index)"
                :http-request="uploadImg(index)">
                <i class="el-icon-plus"></i>
            </el-upload>
            <br :key="index"><span class="img-name" :key="index" v-if="imgLabel[index]">{{imgLabel[index]}}</span>
        </template>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'img-card',
    props: {
        type: {
            type: String,
            default: 'view'
        },
        imgList: {
            type: Object
        },
        imgType: {
            type: [String, Array]
        },
        imgLabel: {
            type: [String, Array],
            default: ''
        },
        label: {
            type: String
        },
        show: {
            type: Boolean,
            default: true
        },
        imgClass: {
            type: String
        },
        limit: {
            type: Number
        }
    },
    data () {
        return {
            imgEdit: []
        };
    },
    methods: {
        contain (img) {
            return img.includes('chinayie') ? img : `${this.appendImages}${img}`;
        },
        emit (item) {
            this.$emit('imgClick', this.contain(item.filePath));
        },
        uploadImg (index) {
            return file => {
                const formData = new FormData();
                const headers = {
                    'Content-Type': 'multipart/form-data'
                };
                formData.append('file', file.file);
                formData.append('storage', 'platform-mgmt');

                axios.post('/platform/v1/uploadImage', formData, headers).then(result => {
                    this.imgEdit[index].push({ url: result.data });
                }).catch(err => {
                    console.log(err);
                });
            };
        },
        removeImg (index) {
            return file => {
                const list = this.imgEdit[index];
                const removeIndex = list.findIndex(item => item.url === file.url);
                if (removeIndex >= 0) {
                    list.splice(removeIndex, 1);
                }
            };
        },
        initImg () {
            this.imgEdit = this.imgs.map(item => this.imgList[item].list.map(subItem => ({ url: this.contain(subItem.filePath) })));
        },
        getEditImg () {
            const obj = {};
            this.imgs.forEach((item, index) => {
                obj[item] = this.imgEdit[index].map(subItem => subItem.url);
            });
            return obj;
        }
    },
    computed: {
        imgs () {
            if (typeof this.imgType === 'string') {
                return [this.imgType];
            }
            return this.imgType;
        }
    },
    watch: {
        type () {
            this.initImg();
        }
    },
    created () {
        this.initImg();
    }
};
</script>

<style lang="scss">
    .gy-img-card {
        .gy-img-label {
            display: inline-block;
            margin: 0 15px 15px 0;
            text-align: center;
        }
        .img-name {
            display: inline-block;
        }
        .img-size,
        .el-upload-list__item,
        .el-upload--picture-card {
            width: 100px !important;
            height: 100px !important;
        }
        .el-upload--picture-card > i {
            font-size: 36px;
            line-height: 98px;
        }
        .limit .el-upload--picture-card {
            display: none;
        }
    }
</style>
