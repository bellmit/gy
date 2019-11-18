<template>
    <div class="helpCenterList">
        <h1>帮助主题</h1>
        <button class="gy-button-extra addDirectories" @click="addDirectories()">添加目录</button>
        <!-- <el-table
            :data="list"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            default-expand-all
            :tree-props="{children: 'helpTopicsModelList'}">
            <el-table-column
            label="目录"
            width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.type !== 2">{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column
            label="主题"
            width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.type !== 1">{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column
            label="创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.createdDate | date(1)}}</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="excerpt"
            label="描述">
            </el-table-column>
            <el-table-column
            prop="orderNum"
            label="主题排序">
            </el-table-column>
            <el-table-column
            label="操作">
                <template slot-scope="scope">
                    <button class="gy-button-view" style="background-color: #fff" @click="edit(scope.row)">编辑</button>
                    <button class="gy-button-view" style="background-color: #fff" @click="del(scope.row)">删除</button>
                    <button v-if="scope.row.type === 1" class="gy-button-view" style="background-color: #fff" @click="addEdit(scope.row)">添加主题</button>
                </template>
            </el-table-column>
        </el-table> -->
        <div class="help">
            <ul class="top main">
                <li class="ttt">目录</li><li class="ttt">主题</li><li class="ttt">创建时间</li><li class="ttt">描述</li><li class="ttt">主题排序</li><li>操作</li>
            </ul>
            <div v-for="(item, index) in list" :key="index">
                <ul class="top">
                    <li>{{item.name}}</li><li></li><li>{{item.createdDate | date(1)}}</li><li>{{item.excerpt}}</li><li>{{item.orderNum}}</li><li>
                         <button class="gy-button-view" style="background-color: #fff" @click="edit(item)">编辑</button>
                        <button class="gy-button-view" style="background-color: #fff" @click="del(item)">删除</button>
                        <button class="gy-button-view" style="background-color: #fff" @click="addEdit(item)">添加主题</button>
                    </li>
                </ul>
                <ul class="top" v-for="(ite, inde) in item.helpTopicsModelList" :key="inde">
                    <li style="padding-left:40px"><i class="iconfont icon-help-list"></i></li><li>{{ite.name}}</li><li>{{ite.createdDate | date(1)}}</li><li>{{ite.excerpt}}</li><li>{{ite.orderNum}}</li><li>
                        <button class="gy-button-view" style="background-color: #fff" @click="edit(ite)">编辑</button>
                        <button class="gy-button-view" style="background-color: #fff" @click="del(ite)">删除</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'list',
    data () {
        return {
            list: [],
            imgs: require('../../assets/images/L.png')
        };
    },
    mounted () {
        this.helpList();
    },
    methods: {
        helpList () {
            this.$http.get(this.$api.htlpCenter.list).then(res => {
                if (res.data.code === 0) {
                    this.list = res.data.data;
                }
            });
        },
        addDirectories () {
            this.$router.push({name: 'helpCenterAdd'});
        },
        del (item) {
            let param = {};
            param.id = item.id;
            this.$confirm('<span><i class="iconfont icon-message-error"></i>请确认是否删除?</span>', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                dangerouslyUseHTMLString: true
            }).then(() => {
                console.log(item.helpTopicsModelList.length);
                if (item.helpTopicsModelList.length === 0) {
                    this.$http.post(this.$api.htlpCenter.delete, param).then(res => {
                        if (res.data.code === 0) {
                            this.helpList();
                        }
                    });
                } else {
                    this.$confirm('<span><i class="iconfont icon-message-error"></i>请先删除对应的主题</span>', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        dangerouslyUseHTMLString: true
                    }).then(() => {
                        console.log('11');
                    });
                }
            });
        },
        edit (item) {
            if (item.type === 1) {
                this.$router.push({name: 'helpCenterAdd', query: {id: item.id}});
            } else {
                this.$router.push({name: 'helpCenterEdit', query: {id: item.id, value: item.type}});
            }
        },
        addEdit (item) {
            this.$router.push({name: 'helpCenterEdit', query: {id: item.id}});
        }
    }
};
</script>

<style lang="scss" scoped>
    .helpCenterList{
        h1{
            font-size: 18px;
            color: #333;
            padding-left: 13px;
        }
        .addDirectories{
            float:right;
            margin-bottom: 10px;
        }
        .help{
            margin: 65px 0 0 13px;
            .top{
                cursor: pointer;
                width: 100%;
                border-bottom: 1px solid #F2F2F2;
                border-left: 1px solid #F2F2F2;
                border-right: 1px solid #F2F2F2;
                line-height: 48px;
                li{
                    display: inline-block;
                    width: 15%;
                    height: 30px;
                    line-height: 30px;
                    padding: 0 10px;
                    &:first-child{
                        width: 10%;
                    }
                    &:nth-child(2){
                        width: 25%;
                    }
                    &:nth-child(3){
                        width: 20%;
                        text-align: right;
                    }
                    &:nth-child(5){
                        width: 10%;
                        text-align: right;
                    }
                    &:last-child{
                        width: 20%;
                        text-align: center;
                    }
                }
            }
            .main{
                background: #edf3f7;
                li{
                    text-align: center !important;
                    font-weight: bold;
                }
            }
        }
        .ttt{
            position: relative;
        }
        .ttt:after{
            content: '';
            height: 90%;
            width: 1px;
            background-color: rgba(255, 255, 255, 0.7);
            // background: red;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
        }
        .ttt:last-child:after{
            display: none;
        }
    }
</style>
<style lang="scss">
    .helpCenterList{
        .icon-help-list{
            color: #999;
        }
        .el-table{
            border: 1px solid #F2F2F2;
            .el-table__header-wrapper{
                background-color: #333;
            }
            thead{
                th{
                    background: #D4D4D4;
                    color: #333333;
                }
            }
        }
    }
</style>
