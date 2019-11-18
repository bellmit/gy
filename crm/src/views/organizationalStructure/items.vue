<template>
    <li class="list-item" v-if="menuData">
        <div :style="{paddingLeft: left + 'px'}" class="fa" :class="{'back': Array.from(checkedId, e => e.id).includes(menuData.id)}">
            <div class="list-content"  @click='checkDepartment(menuData)'>
            <span @click.stop="toggle" style="padding-right: 2px" v-if='menuData && menuData.list && menuData.list.length > 0'><i :class="open ? 'el-tree-node__expand-icon el-icon-caret-bottom' : 'el-tree-node__expand-icon el-icon-caret-bottom el-rotate'"></i></span>
            <span v-else style="padding-left: 15px"></span>
            <span class="list-title">{{menuData.name}}</span>
            </div>
        </div>
        <transition name="slide-fade">
            <ul v-show="open" class="content" v-if='menuData && menuData.list && menuData.list.length > 0'>
                <items v-for='(cel, id) in menuData.list' :defaultOpen="defaultOpen" :type="type" :checkedId="checkedId" :key="id" :left="left + 15" :menuData='cel'></items>
            </ul>
        </transition>
    </li>
</template>
<script type="text/javascript">
export default {
    name: 'items',
    props: {
        menuData: Object,
        left: Number,
        checkedId: Array,
        type: Number,
        defaultOpen: Boolean
    },
    watch: {
        defaultOpen () {
            this.open = this.defaultOpen;
        }
    },
    data () {
        return {
            open: this.defaultOpen
        };
    },
    methods: {
        toggle () {
            if (this.menuData.list && this.menuData.list.length > 0) {
                this.open = !this.open;
            }
        },
        checkDepartment (item) {
            switch (this.type) {
            case 1:
                this.checkedD(item);
                break;
            case 2:
                this.handleNodeClick(item);
                break;
            case 3:
                this.higherAuthoritiesClick(item);
                break;
            default:
                break;
            }
        }
    },
    inject: ['checkedD', 'handleNodeClick', 'higherAuthoritiesClick']
};
</script>
<style lang="scss" scoped>
    .list-item {
        cursor: pointer;
        .fa {
           &:hover {
               background-color: #f5f7fa;
           }
        }
        .list-content {
            overflow: hidden;
            white-space: nowrap;
        }
        .list-title {
            overflow: hidden;
            white-space: nowrap;
        }
    }

    .el-icon-caret-right {
        transition: all 0.3s;
    }

    .el-rotate {
        transform: rotate(-90deg);
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .2s ease;
    }

    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateY(-10px);
        opacity: 0;
    }

    .back {
        background-color: #f5f7fa;
    }
</style>
