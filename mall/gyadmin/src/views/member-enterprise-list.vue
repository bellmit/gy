<template>
    <div class="page">
        <div class="m-panel" style="height: 50px; padding-top: 15px;padding-left: 10px;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="m-panel">
            <div style="text-align: left;margin-left: 40px;line-height:60px;">
                <el-input v-model="inputName" placeholder="请输入内容" style="width: 200px;"></el-input>
                &nbsp;&nbsp;&nbsp;&nbsp;<button class="gy-button-normal" @click="searchGood">搜索</button>
                &nbsp;&nbsp;&nbsp;&nbsp;<router-link :to="{ name: 'sysusermanage',}"><button class="gy-button-normal selected">添加</button></router-link>
            </div>
            <table class="u-table">
                <thead>
                <tr>
                    <!--<th>
                        <label class="u-checkbox">-->
                    <!--<input type="checkbox">-->
                    <!--<span></span>-->
                    <!--</label>
                </th>-->
                    <th>ID</th>
                    <th>用户名</th>
                    <th>邮箱</th>
                    <th>手机号</th>
                    <th>状态</th>
                    <th>创建时间</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in menuList" :key="index">
                    <!--<td>-->
                    <!--<label class="u-checkbox">-->
                    <!--<input type="checkbox">-->
                    <!--<span></span>-->
                    <!--</label>-->
                    <!--</td>-->
                    <td>{{index}}</td>
                    <td>用户名</td>
                    <td>149654420@qq.com</td>
                    <td>13522938784</td>
                    <td>正常</td>
                    <td>2018/07/13</td>
                    <td><router-link :to="{ path: 'sysmenumanage', query: {id: item.menuId}}">修改</router-link>    <a href="#" @click="deleteGood(item.menuId)">删除</a></td>
                </tr>
                </tbody>
            </table>
            <div class="footer text-center">
                <!-- 翻页 -->
                <el-pagination
                  :page-size="pageSize"
                  :pager-count="pageCount"
                  :total="total"
                  :current-page.sync = "currentPage"
                  layout="prev, pager, next"
                  style="margin-top: 40px;"
                  @current-change="turnPage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
// import { treeDataTranslate } from '@/utils';
import rolelist from '../config/api/menulist';
export default {
    name: 'HelloWorld',
    data () {
        return {
            pageSize: 0,
            pageCount: 0,
            total: 0,
            currentPage: 1,
            searchName: '',
            inputName: '',
            menuList: []
        };
    },
    methods: {
        getList (currentPage) {
            let _this = this;
            this.$http.post(this.$api.user.login, {
                'currentPage': currentPage,
                'searchName': _this.searchName
            }).then(function (data) {
                data = rolelist;
                // _this.menuList = treeDataTranslate(data.obj.data.list, 'menuId');
                _this.menuList = data.obj.data.list;
                // console.log(JSON.stringify(_this.menuList));
                // console.log(currentPage);
                _this.total = 10;
                // _this.pageSize = currentPage;
                // _this.pageCount = 5;
            }).catch(function (e) {
            });
        },
        turnPage (currentPage) {
            // console.log(currentPage);
            this.currentPage = currentPage;
            this.getList(currentPage);
        },
        searchGood () {
            this.currentPage = 1;
            this.searchName = this.inputName;
            this.getList(1);
        },
        deleteGood: function (id) {
            let _this = this;
            let iscomfirm = confirm('此操作将删除, 是否继续?');
            if (iscomfirm) {
                this.$http.post(this.$api.user.login, {
                    'id': id
                }).then(function (data) {
                    // _this.list = data.obj.data.list;
                    // _this.total = 10;
                    _this.turnPage(1);
                }).catch(function (e) {
                });
            }
        }
    },
    // activated () {
    //     console.log('activated');
    // },
    created () {
        // this.total = 10;
        this.pageSize = 2;
        this.pageCount = 5;
        this.getList(1);
    }
};
</script>
<style scoped lang="scss">
    .m-panel .g-title.base-info{
        padding: 15px 20px;
        li{
            padding:2px 0;
            width:260px;
        }
    }
    .table-box{
        position:relative;
    }
    .u-table{
        tr td:first-child{
            width:50px;
            vertical-align: middle;
            padding-left:20px;
        }
        tr td:last-child a{
            display: inline-block
        }
    }
    .download-btn{
        p{
            font-size:15px;
            padding:20px;
        }
        .u-btn{margin-bottom:15px;}
    }
</style>
