<template>
    <div class="product-list">
        <!--<input type="text" class="gy-input" v-model="keywords" @keyup="getList"  @keyup.13="handleGetList" :disabled="offerId">-->
        <input  placeholder="请输入"  type="text" class="gy-input" v-model="keywords" @keyup="getList"  @keyup.13="handleGetList" @click="keywords = ''" :disabled="offerId">
        <ul v-show="showList" v-clickOutside="handleHiddenList">
            <li v-for="(item, index) in list" :key="index" @click="handleList(item)" v-if="list.length > 0">{{item.goodsName}}</li>
            <li class="none-tips" v-if="list.length === 0">没有搜到相关产品</li>
        </ul>
        <i v-if="!offerId" class="iconfont icon-mySearch my-icon-jj" @click="handleGetList"></i>
    </div>
</template>

<script>
const clickOutside = {
    bind (el, binding) {
        function documentHandler (e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.vueClickOutside = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    unbind (el) {
        document.removeEventListener('click', el.vueClickOutside);
        delete el.vueClickOutside;
    }
};
export default {
    name: 'product-search',
    data () {
        return {
            keywords: '',
            list: [],
            showList: false,
            lastTime: null
        };
    },
    directives: {
        clickOutside
    },
    props: {
        selected: {
            type: Object,
            defalult: {}
        },
        defaultProduct: String,
        offerId: Boolean
    },
    created () {
        console.log(this.defaultProduct);
        this.defaultProduct && (this.keywords = this.defaultProduct);
    },
    watch: {
        keywords: function (val) {
            if (!val) {
                this.empty();
            }
        }
    },
    methods: {
        getList (e) {
            this.lastTime = e.timeStamp;
            setTimeout(() => {
                if (this.lastTime === e.timeStamp && this.keywords && this.keywords.length > 2) {
                    this.handleGetList();
                }
            }, 500);
        },
        handleGetList () {
            this.$http.get(this.$api.offers.goods + '?keywords=' + this.keywords).then(res => {
                this.list = res.data.data;
                this.showList = true;
            });
        },
        handleList (value) {
            this.keywords = value.goodsName;
            this.$emit('update:selected', value);
            this.showList = false;
        },
        empty () {
            this.$emit('update:selected', {});
            this.showList = false;
        },
        handleHiddenList () {
            this.showList = false;
        }
    }
};
</script>
<style lang="scss" scoped>
    .product-list{
        position: relative;
        ul{
            background-color: #fff;
            width: 100%;
            max-height: 200px;
            overflow: auto;
            position: absolute;
            left: 0;
            top: 31px;
            z-index: 9;
            border: 1px solid $color-border;
            border-top: none;
            li{
                padding: 5px 10px;
                cursor: pointer;
                &:hover{
                    background-color: #f5f7fa;
                    color: $color-extra;
                }
                &.none-tips{
                    font-size: $small-font;
                    text-align: center;
                }
            }
        }
        .my-icon-jj{
            position: absolute;
            right: 7px;
            top: 0px;
        }
    }
</style>
