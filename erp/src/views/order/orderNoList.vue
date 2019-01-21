<template>
    <div class="standingBook">
        <!-- 高级搜索 -->
        <div class="search-btn">
            <span @click="isShowSearch = !isShowSearch" class="ShowSearch">高级搜索<i class="el-input__icon"
                                                                                  :class="isShowSearch?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </div>
        <div class="my-search clearfix">
            <div class="gy-form-group">
                <span class="l">合同编号</span>
                <input type="text" placeholder="请输入合同编号" v-model="search.orderSn">
            </div>
            <div class="gy-form-group">
                <span class="l">时间段</span>
                <div class="searchDate">
                    <div class="d">
                        <el-date-picker
                                v-model="search.createTimeS"
                                type="date"
                                placeholder="开始日期">
                        </el-date-picker>
                    </div>
                    <div class="c">至</div>
                    <div class="d">
                        <el-date-picker
                                v-model="search.createTimeE"
                                type="date"
                                placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </div>
                <span v-if="!isShowSearch" class="searchicon" @click="getList(search)"><i
                        class="iconfont icon-search"></i></span>
            </div>
            <div class="search-form" v-if="isShowSearch">
                <div class="gy-form-group">
                    <span class="l">产品名称</span>
                    <input type="text" placeholder="请输入产品名称" v-model="search.prodName">
                </div>
                <div class="gy-form-group">
                    <span class="l">交易对手</span>
                    <input type="text" placeholder="请输入交易对手" v-model="search.counterparty">
                </div>
                <div class="gy-form-group">
                    <span class="l">合同类型</span>
                    <el-select v-model="search.bizType">
                        <el-option
                                v-for="(item, index) in bizTypeData"
                                :key="index"
                                :label="item.value"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <span v-if="isShowSearch" class="searchicon" @click="getList(search)"><i
                            class="iconfont icon-search"></i></span>
                </div>
            </div>
        </div>
        <!-- 报表 -->
        <div class="box">
            <table class="gy-table">
                <thead>
                <tr>
                    <th>合同编号</th>
                    <th>产品名称</th>
                    <th>交易对手</th>
                    <th>创建时间</th>
                    <th>签章前合同</th>
                    <th>签章后合同</th>
                    <th>交割凭证</th>
                    <th>发票</th>
                    <th>收付款凭证</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody v-if="list.length > 0">
                <tr v-for="(item, index) in list" :key="index">
                    <td class="hover">{{item.orderContractSn}}</td>
                    <td>{{item.prodName}}</td>
                    <!-- bizType 1销售 2采购 -->
                    <td v-show="item.bizType === 1">{{item.buyCounterparty}}</td>
                    <td v-show="item.bizType === 2">{{item.sellCounterparty}}</td>
                    <td>{{item.contractCreateDate | date('h')}}</td>
                    <td class="hover">
                        <i class="iconfont icon-order-default" @click="zip(item.orderId, 1, '签章前合同')">
                            <span>点击下载</span>
                        </i>
                    </td>
                    <td class="hover">
                        <i class="iconfont icon-order-default" @click="zip(item.orderId, 2, '签章后合同')">
                            <span>点击下载</span>
                        </i>
                    </td>
                    <td class="hover">
                        <i v-if="item.deliveryProof.length !==0" class="iconfont icon-photo"
                           @click="handleShowImg(item.deliveryProof)"></i>
                        <i v-else class="iconfont icon-photo-null" @click="imgErr('交割凭证')"></i>
                    </td>
                    <td class="hover">
                        <i v-if="item.invoiceProof.length !==0" class="iconfont icon-photo"
                           @click="handleShowImg(item.invoiceProof)"></i>
                        <i v-else class="iconfont icon-photo-null" @click="imgErr('发票')"></i>
                    </td>
                    <td class="hover">
                        <i v-if="item.tradingProof.length !==0" class="iconfont icon-photo"
                           @click="handleShowImg(item.tradingProof)"></i>
                        <i v-else class="iconfont icon-photo-null" @click="imgErr('收付款凭证')"></i>
                    </td>
                    <td>
                        <button class="gy-button-view bgcf" @click="zip(item.orderId, 3, item.orderSn)">打包下载</button>
                    </td>
                </tr>
                </tbody>
                <tbody v-else>
                <tr>
                    <td colspan="10" style="text-align: center;">没有找到可显示的数据...</td>
                </tr>
                </tbody>
            </table>
        </div>
        <!-- 分页 -->
        <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="search.pageNum"
                :page-size="search.pageSize"
                :total="total"
                @current-change="handleCurrentChange">
        </el-pagination>
        <!-- img 弹出 -->
        <el-dialog title="图片预览" :visible.sync="showImg" width="1000px" custom-class="dialog-erp-cont">
            <el-carousel arrow="always" trigger="click" :autoplay="false">
                <el-carousel-item v-for="(item, index) in imagesList" :key="index">
                    <img v-if="$constant.imgType.indexOf(item.split('.').pop().toLowerCase()) !== -1" :src="item" alt=""
                         width="100%" height="auto">
                    <iframe v-if="item.split('.').pop().toLowerCase() === 'pdf'" :src="item" frameborder="0"
                            id="contractIframe" width="100%" style="min-height: 490px"></iframe>
                    <iframe v-if="$constant.fileType.indexOf(item.split('.').pop().toLowerCase()) !== -1"
                            :src="'https://view.officeapps.live.com/op/view.aspx?src='+ item" frameborder='0'
                            width="100%" style="min-height: 490px"></iframe>
                </el-carousel-item>
            </el-carousel>
        </el-dialog>
        <!-- <transition name="fade">
            <div class="pop-image" v-show="showImg">
                <div class="pop-main">
                    <span class="pop-title">{{popTitle}}<i class="iconfont icon-close" @click="showImg = false"></i></span>
                    <div class="img-side">
                        <ul>
                            <li v-for="(item) in imagesList" v-if="imagesList.length > 0" :key="item.id"
                                @click="showBigImage(item)">
                                <span class="avatar" :style="'background-image: url(' + item + ')'"></span>
                            </li>
                        </ul>
                    </div>
                    <div class="img-main">
                        <div class="img-box"><a :href="bigImageUrl" target="_blank"><img :src="bigImageUrl" v-if="bigImageUrl" alt=""></a></div>
                    </div>
                </div>
                <span class="mask" @click="showImg = false"></span>
            </div>
        </transition> -->
    </div>
</template>

<script>
export default {
    data () {
        return {
            visible: false,
            total: null,
            value: null,
            isShowSearch: false,
            search: {
                pageNum: 1,
                pageSize: 10,
                orderSn: null,
                createTimeS: null,
                createTimeE: null,
                prodName: null,
                bizType: null,
                counterparty: null
            },
            list: [],
            showImg: false,
            imagesList: [],
            bigImageUrl: null,
            popTitle: null,
            bizTypeData: [
                {
                    id: 0,
                    value: '全部'
                },
                {
                    id: 1,
                    value: '销售合同'
                },
                {
                    id: 2,
                    value: '采购合同'
                }
            ]
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            this.getList(this.search);
        },
        // 列表
        getList (search) {
            this.$http.post(this.$api.order.orderNoList, search)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.list = res.data.data.list;
                        this.total = res.data.data.total;
                        return;
                    }
                    this.$message.error(res.data.message);
                });
        },
        handleShowImg (list) {
            this.imagesList = list;
            this.showImg = true;
        },
        imgErr (title) {
            this.popTitle = title;
            this.$message({message: this.popTitle + '暂无数据', type: 'warning'});
        },
        zip (id, type, title) {
            let params = {
                orderId: id,
                downType: type
            };
            this.$http.post(this.$api.order.files, params, {responseType: 'blob'}).then(res => {
                if (res.data.size > 0) {
                    this.download(res.data, title);
                    return;
                }
                this.$message.error('没有文件可下载');
            });
        },
        download (data, title) {
            var blob = new Blob([data]);
            if (window.navigator.msSaveOrOpenBlob) {
            // 兼容IE10
                navigator.msSaveBlob(blob, title + '.zip');
            } else {
                let url = window.URL.createObjectURL(blob);
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', title + '.zip');
                document.body.appendChild(link);
                link.click();
            }
        },
        // 分页
        handleCurrentChange (v) {
            this.search.pageNum = v;
            this.getList(this.search);
        }
    }
};
</script>
<style lang="scss" scoped>
    .standingBook {
        .my-search {
            .gy-form-group {
                padding: 6px 40px 6px 88px;
                .l {
                    width: 88px;
                    display: block;
                    // top: 16px;
                    // line-height: 40px;
                }
            }
        }
    }

    .pop-image {
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 999;
        .pop-main {
            position: absolute;
            background-color: #fff;
            border-radius: $border-radius-base;
            height: 520px;
            width: 750px;
            margin: -260px 0 0 -375px;
            left: 50%;
            top: 50%;
            z-index: 2;
            overflow: hidden;
            .pop-title {
                display: block;
                line-height: 49px;
                padding: 0 20px;
                color: $color-title;
                font-size: 16px;
                border-bottom: 1px solid $color-border;
                .icon-close {
                    position: absolute;
                    right: 20px;
                    top: 0;
                    cursor: pointer;
                    font-size: 20px;
                    color: $color-minor;
                }
            }
            .img-side {
                float: left;
                height: 470px;
                width: 180px;
                border-right: 1px solid $color-border;
                overflow: auto;
                ul {
                    overflow: hidden;
                    border-bottom: 1px solid $color-border;
                    li {
                        float: left;
                        width: 50%;
                        height: 100px;
                        overflow: hidden;
                        text-align: center;
                        padding-top: 10px;
                        border-top: 1px solid $color-border;
                        cursor: pointer;
                        .avatar {
                            height: 60px;
                            width: 60px;
                            display: inline-block;
                            background-position: center center;
                            background-repeat: no-repeat;
                            background-size: cover;
                            line-height: 1;
                        }
                        .name {
                            display: block;
                            font-size: 12px;
                            line-height: 1;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            width: 100%;
                            padding: 0 2px;
                        }
                        &:nth-child(odd) {
                            border-right: 1px solid $color-border;
                        }
                    }
                }
            }
            .img-main {
                float: left;
                height: 470px;
                width: 570px;
                padding: 20px;
                .img-box {
                    height: 100%;
                    position: relative;
                    text-align: center;
                    overflow: hidden;
                    img {
                        height: 100%;
                        width: auto;
                        top: 0;
                        position: absolute;
                        left: 50%;
                        transform: translateX(-50%);
                    }
                }
            }
        }
        .mask {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1;
            cursor: pointer;
        }
    }

    .ShowSearch {
        margin-right: 30px;
        cursor: pointer;
    }

    .hover:hover {
        color: #4A90E2;
        cursor: pointer;
    }

    .hover {
        color: #999999;
        span {
            margin-left: 5px;
            vertical-align: middle;
            font-size: 14px;
            line-height: 1.8;
        }
        .icon-photo:before, .icon-photo-null:before {
            line-height: 1.08;
        }
    }

    .bgcf {
        background-color: #fff;
    }

    .box {
        margin: 0 16px;
        overflow-x: scroll;
        .gy-table {
            width: 1500px;
        }
    }
</style>
