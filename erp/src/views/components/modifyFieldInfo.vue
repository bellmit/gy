<template>
    <div>
        <p class="paydetail-title">变更记录</p>
        <table class="gy-table" style="width:94%;margin: 20px 30px 30px 30px;">
            <thead>
            <tr>
                <th style="width: 13%">变更类型</th>
                <th style="width: 20%">变更项目</th>
                <th style="width: 33%">变更前</th>
                <th style="width: 33%">变更后</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="contBasice">基本信息</td>
                <td>ID</td>
                <td><router-link :to="{ name: 'contEssDetailmenu', query: { id: sourceContEssId }}"><em style="color: #409EFF;">{{sourceContEssId}}</em></router-link></td>
                <td>{{updatedContEssId}}</td>
            </tr>
            <tr v-for="(item, index) in modifyFieldInfo.upstreamInfo" :key="index + '-'">
                <td class="contBasice" v-if="index ===0">采购信息</td>
                <td v-else></td>
                <td>{{item.title}}</td>
                <template v-if="item.valType === 'file'">
                    <td>
                        <span v-if="item.oldVal && item.oldVal.length !== 0"
                              @click="$refs.contFileView.open4MultiFile(item.oldVal)"><i class="iconfont icon-photo"></i></span>
                        <span v-else><i class="iconfont icon-photo-null"></i></span>
                    </td>
                    <td>
                        <span v-if="item.newVal && item.newVal.length !== 0"
                              @click="$refs.contFileView.open4MultiFile(item.newVal)"><i class="iconfont icon-photo"></i></span>
                        <span v-else><i class="iconfont icon-photo-null"></i></span>
                    </td>
                </template>
                <template v-else>
                    <td>
                        <span v-html="item.oldVal || '--'"></span>
                    </td>
                    <td>
                        <span v-html="item.newVal || '--'"></span>
                    </td>
                </template>
            </tr>
            <tr v-for="(item, index) in modifyFieldInfo.downstreamInfo" :key="index + '*'">
                <td class="contBasice" v-if="index ===0">销售信息</td>
                <td v-else></td>
                <td>{{item.title}}</td>
                <template v-if="item.valType === 'file'">
                    <td>
                        <span v-if="item.oldVal && item.oldVal.length !== 0"
                              @click="$refs.contFileView.open4MultiFile(item.oldVal)"><i class="iconfont icon-photo"></i></span>
                        <span v-else><i class="iconfont icon-photo-null"></i></span>
                    </td>
                    <td>
                        <span v-if="item.newVal && item.newVal.length !== 0"
                              @click="$refs.contFileView.open4MultiFile(item.newVal)"><i class="iconfont icon-photo"></i></span>
                        <span v-else><i class="iconfont icon-photo-null"></i></span>
                    </td>
                </template>
                <template v-else>
                    <td>
                        <span v-html="item.oldVal || '--'"></span>
                    </td>
                    <td>
                        <span v-html="item.newVal || '--'"></span>
                    </td>
                </template>
            </tr>
            </tbody>
        </table>
        <gy-file-view ref="contFileView"></gy-file-view>
    </div>
</template>

<script>
import gyFileView from './gyFileView';

export default {
    name: 'modifyFieldInfo',
    components: { gyFileView },
    data () {
        return {
        };
    },
    props: {
        sourceContEssId: Number,
        updatedContEssId: Number,
        modifyFieldInfo: Object
    }
};
</script>
<style lang="scss" scoped>
    .contBasice{
        text-align: center;
    }
    .paydetail-title {
        font-size: 14px;
    }
</style>
