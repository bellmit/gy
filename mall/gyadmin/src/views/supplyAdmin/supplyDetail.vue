<template>
    <div class="supplyDetail">
        <div class="new-title-public">
            供应链申请管理
        </div>
        <!-- 信息展示 -->
        <div class="supply_form">
            <div class="supplyTitle">
                <i class="iconfont icon-myApply"></i>
                申请详情
            </div>
            <div class="supplyList clearfix">
                <div class="gy-form-group">
                    <span class="l">申请单号</span>
                    <span>{{list.code || '-'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">申请时间</span>
                    <span>{{ getTime(list.createdDate) || '-'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">服务类型</span>
                    <span>{{list.serviceTypeName || '-'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">状态</span>
                    <span>{{setStatus(list.status) || '-'}}</span>
                </div>
            </div>
            <div class="supplyTitle">
                <i class="iconfont icon-qiye"></i>
                企业信息
            </div>
            <div class="supplyList clearfix">
                <div class="gy-form-group">
                    <span class="l">企业名称</span>
                    <span>{{list.companyName || '-'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">联系人</span>
                    <span>{{list.contactName || '-'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">企业地址</span>
                    <span>{{list.companyAddress || '-'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">联系方式</span>
                    <span>{{list.contactPhone || '-'}}</span>
                </div>
            </div>
            <div class="supplyTitle">
                <i class="iconfont icon-icon_shenqing"></i>
                商品信息
            </div>
            <div class="supplyList clearfix">
                <div class="gy-form-group">
                    <span class="l">商品名称</span>
                    <span>{{list.productName || '-'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">数量</span>
                    <span>{{list.productAmount|| '-'}}{{list.productAmount?'吨':''}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">资金周期</span>
                    <span>{{list.period || '-'}}{{list.period ? '天' : ''}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">单价</span>
                    <span>{{list.productPriceMin}}-{{list.productPriceMax}}{{(list.productPriceMax && list.productPriceMin)?'元/吨':''}}</span>
                </div>
            </div>
            <div class="supplyTitle">
                <i class="iconfont icon-qitaxinxi"></i>
                其他信息
            </div>
            <div class="supplyList clearfix">
                <div class="gy-form-group">
                    <span class="l">指定供应商</span>
                    <span>{{list.thirdPartyName || '-'}}</span>
                </div>
            </div>
            <div class="supplyList clearfix">
                <div class="gy-form-group">
                    <span class="l">备注信息</span>
                    <span>{{list.memo || '-'}}</span>
                </div>
            </div>
            <div class="supplyTitle">
                <i class="iconfont icon-dengjixinxi"></i>
                企业评级信息
            </div>
            <div class="supplyList clearfix">
                <div class="gy-form-group">
                    <span class="l">企业评级</span>
                    <span :class="{'supply_light':rating.rank}">{{rating.rank ? rating.rank : '无评级信息'}}</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">最近评级日期</span>
                    <span v-if="rating.latestRatingTime">{{rating.latestRatingTime | date(1)}}</span>
                    <span v-if="!rating.latestRatingTime">无日期信息</span>
                </div>
            </div>
            <div class=" footer_btn" v-if="list.status === 0">
                <span slot="footer" class="dialog-footer">
                    <button class="gy-button-extra" @click="edit(1)">确认受理</button>
                    <button class="gy-button-normal" @click="dialogVisible = true">拒绝申请</button>
                </span>
            </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="475px"
            top="35vh">
            <span class="tips">拒绝后将无法恢复，确定拒绝该申请吗？</span>
            <span slot="footer" class="dialog-footer textRight">
                <button class="gy-button-extra" @click="edit(2)">确认</button>
                <button class="gy-button-normal" @click="dialogVisible = false">取消</button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            dialogVisible: false,
            list: {
                code: '',
                createdDate: '',
                serviceTypeName: '',
                status: '',
                companyName: '',
                contactName: '',
                companyAddress: '',
                productAmount: '',
                period: '',
                productPriceMin: '',
                productPriceMax: '',
                providerCompanyName: '',
                memo: ''
            }, // 数据存放
            rating: {
                rank: '',
                latestRatingTime: ''
            } // 存放评级数据
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            this.getInfo();
            this.getRating();
        },
        getInfo () {
            let id = this.$route.query.id;
            this.$http.get(this.$api.supplyAdmin.supplyDetail + id).then(res => {
                if (res.data.code === 0) {
                    if (res.data.data) {
                        this.list = res.data.data;
                    }
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch((e) => {
                console.log('出错了' + e);
            });
        },
        getRating () {
            let companyId = this.$route.query.companyId;
            this.$http.get(this.$api.supplyAdmin.supplyRating + companyId).then(res => {
                if (res.data.code === 0) {
                    if (res.data.data) {
                        this.rating = res.data.data;
                    }
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch((e) => {
                console.log('出错了' + e);
            });
        },
        edit (index) {
            let userInfo = localStorage.getItem('userInfo');
            if (userInfo) {
                userInfo = JSON.parse(userInfo);
            }
            let query = {
                'id': this.$route.query.id, // 主键ID
                'status': index, // 申请状态  0  待受理    1  已受理  2  已拒绝
                'updatedBy': userInfo.id, // 修改人ID
                'updatedDate': new Date() // 修改事件
            };
            let url;
            if (index === 2) {
                url = this.$api.supplyAdmin.refuse;
            } else {
                url = this.$api.supplyAdmin.supplyEdit;
            }
            this.$http.put(url, query).then(res => {
                if (res.data.code === 0) {
                    this.dialogVisible = false;
                    this.init();
                    this.$message({
                        message: '成功',
                        type: 'success'
                    });
                } else {
                    this.$message.error(res.data.message);
                }
            }).catch((e) => {
                console.log('出错了' + e);
            });
        },
        getTime (time) {
            let d = new Date(time);
            let times = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日 ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            return times;
        },
        setStatus (type) {
            if (type === 0) {
                return '待受理';
            } else if (type === 1) {
                return '已受理';
            } else if (type === 2) {
                return '已拒绝';
            }
        }
    }
};
</script>

<style scoped lang="scss">
    .supplyDetail{
        // 页面的标题栏
        .new-title-public{
            padding-top:24px;
            padding-bottom:16px;
            font-size: 18px;
            font-weight: bold;
            color: #333!important;
        }
        .iconfont{
            font-weight: normal;
            font-size:14px;
            color:#999999;
        }
        .icon-qitaxinxi{
            font-size:16px;
        }
        .supplyTitle{
            margin:8px 15px;
            color:#333333;
            font-size:16px;
            font-weight: bold;
            i{
                margin-right:4px;
            }
        }
        .supplyList{
            width:100%;
            padding:0 30px;
        }
        .footer_btn{
            margin:20px 15px;
            text-align:right;
        }
        .supply_light{
            color:#e59640;
        }
        .textRight{
            text-align: right;
        }
        .tips{
            font-size: 14px;
            color:#333333;
        }
        .gy-form-group{
            padding: 8px 30px 8px 108px;
            min-height: 36px;
            line-height: 20px;
            .l{
                top:8px;
            }
        }
    }
</style>
<style>
    .el-dialog__header{
        border-bottom: 1px solid #E8E8E8;
    }
</style>
