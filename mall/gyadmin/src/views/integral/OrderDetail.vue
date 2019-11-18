<template>
    <section class="integral-order-detail f-container">
        <h3 class="gy-h3">兑换单详情</h3>
        <el-form class="gy-detail-form clearfix" :model="info" ref="form" label-width="85px">
            <el-form-item class="half" label="兑换单号" prop="imgs">
              {{info.pointNoteCode}}
            </el-form-item>
            <el-form-item class="half" label="兑换单状态" prop="status">
                {{info.status | status}}
            </el-form-item>
            <el-form-item class="half" label="兑换时间" prop="price">
              {{info.createdDate | formatDate('YYYY-MM-DD hh:mm:ss')}}
            </el-form-item>
            <el-form-item class="half" label="兑换公司" prop="type">
              {{info.companyName}}
            </el-form-item>
            <el-form-item class="half" label="收货人" prop="type">
                {{info.receiveName}}
            </el-form-item>
            <el-form-item class="half" label="管理员" prop="type">
              {{info.userName}}
            </el-form-item>
            <el-form-item class="half" label="收货人手机" prop="name">
                {{info.receivePhone}}
            </el-form-item>
            <el-form-item class="half" label="管理员手机" prop="name">
              {{info.phone}}
            </el-form-item>
            <el-form-item class="half" label="收货地址" prop="count">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
                :content="info.provinceName+info.cityName+info.districtName+info.address">
                <el-button class="consigneeBtn" slot="reference">{{info.provinceName}} {{info.cityName}} {{info.districtName}} {{info.address}}</el-button>
              </el-popover>
              <span @click="consigneeClick" class="consignee">修改收货人信息</span>
            </el-form-item>
          <!--<span class="consignee" @click="consigneeClick">修改收货人信息</span>-->
        </el-form>
        <div class="gy-tab-list">
            <div :class="['gy-tab-item', { active: item.code === tabCode }]"
                v-for="(item, index) of tabList"
                :key="index"
                @click="tabCode = item.code">
                {{item.name}}
            </div>
        </div>
        <table class="gy-custom-table" v-if="tabCode === 'detail'">
            <tr>
                <th>商品图片</th>
                <th>商品名称</th>
                <th>商品数量</th>
                <th>商品价格</th>
            </tr>
            <tr v-for="(item, index) of (info.odrPointNoteItemModelList || [])" :key="index">
                <td><img class="td-img" :src="item.redemptionFilePath" alt="商品图片" v-if="item.redemptionFilePath"></td>
                <td>{{item.redemptionName}}</td>
                <td>× {{item.redemptionQuantity}}</td>
                <td>{{item.redemptionPrice | toMoney}} 元</td>
            </tr>
        </table>
        <table class="gy-custom-table" v-else>
            <tr>
                <th></th>
                <th>状态</th>
            </tr>
            <tr v-if="!info.logisticsInfo">
                <td>暂无物流信息</td>
                <td>待发货</td>
            </tr>
            <template v-else>
                <tr v-for="(item, index) of info.logisticsInfo.data" :key="index">
                    <td class="tal">{{item.context}}</td>
                    <td>{{item.ftime}}</td>
                </tr>
            </template>
        </table>
        <p class="total-price">总价： {{totalPrice | toMoney}} 元</p>
      <!---->
      <el-dialog title="修改收货人信息" :visible.sync="isDialog" :close-on-click-modal="false">
        <form>
          <div class="clearfix">
            <div class="gy-form-group">
              <span class="l">选择省</span>
              <el-select v-model="form.provinceId" placeholder="请选择省" @change="handleProvince">
                <el-option
                  v-for="item in provinceList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="gy-form-group">
              <span class="l">选择市</span>
              <el-select v-model="form.cityId" placeholder="请选择市" @change="handleCity">
                <el-option
                  v-for="item in cityList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="gy-form-group">
              <span class="l">选择区</span>
              <el-select v-model="form.districtId" placeholder="请选择区">
                <el-option
                  v-for="item in districtList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <div class="gy-form-group">
              <span class="l">详细地址</span>
              <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
            </div>
            <div class="gy-form-group">
              <span class="l">邮政编码</span>
              <el-input v-model="form.postCode" placeholder="请输入邮政编码"></el-input>
            </div>
            <div class="gy-form-group">
              <span class="l">收货人姓名</span>
              <el-input v-model="form.receiveName" placeholder="请输入姓名"></el-input>
            </div>
            <div class="gy-form-group">
              <span class="l">手机号码</span>
              <el-input v-model="form.receivePhone" placeholder="请输入手机号码"></el-input>
            </div>
          </div>
        </form>
        <div class="gy-form-button">
          <button class="gy-button-extra" @click="submit">保存</button>
          <button class="gy-button-normal" @click="isDialog = false">取消</button>
        </div>
      </el-dialog>
    </section>
</template>

<script>
import services from '@/services';
const classifyMap = {
    all: {
        name: '全部',
        value: ''
    },
    waiting: {
        name: '待发货',
        count: 0,
        value: 1
    },
    sent: {
        name: '已发货',
        count: 0,
        value: 2
    },
    done: {
        name: '已完成',
        count: 0,
        value: 3
    }
};

export default {
    name: 'order-detail',
    data () {
        return {
            info: {},
            tabCode: 'detail',
            tabList: [
                {
                    code: 'detail',
                    name: '订单详情'
                },
                {
                    code: 'logistics',
                    name: '物流信息'
                }
            ],
            isDialog: false,
            provinceList: [], // 省
            cityList: [], // 省
            districtList: [], // 省
            form: {
                'address': '', // 详细地址
                'cityId': '', // 市ID
                // 'cityName': '', // 市名称
                'districtId': '', // 区ID
                // 'districtName': '', // 区县名称
                'id': '', // 主键
                'postCode': '', // 邮政编码
                'provinceId': '', // 省ID
                // 'provinceName': '', // 省名称
                'receiveName': '', // 收货人名称
                'receivePhone': ''// 收货人手机
            }
        };
    },
    created () {
        this.address(0, 'province');
    },
    methods: {
        address (id, type) { // 获取地址
            this.$http.get(this.$api.area.list + id).then((data) => {
                if (type === 'province') {
                    this.provinceList = data.data.data;
                } else if (type === 'city') {
                    this.cityList = data.data.data;
                } else if (type === 'district') {
                    this.districtList = data.data.data;
                } else {
                    console.log('地址接口有误');
                }
            });
        },
        handleProvince (itemId) { // 省改变
            this.address(itemId, 'city');
            this.form.cityId = null;
            this.form.districtId = null;
        },
        handleCity (itemId) { // 市改变
            this.address(itemId, 'district');
            this.form.districtId = null;
        },
        getData (id) {
        // ID有值说明为修改
            if (id) {
                this.id = id;
            }
            this.$http.get(this.$api.memberCompany.info + id)
                .then(({data}) => {
                    if (data.code === 0) {
                        this.handleProvince(data.data.provinceId);
                        this.handleCity(data.data.cityId);
                        Object.keys(this.form).forEach((e) => {
                            this.form[e] = data.data[e];
                        });
                        if (data.data.companyLogo) {
                            this.fileLists.push({'url': data.data.companyLogo});
                        } else {
                            this.fileLists = [];
                        }
                    }
                })
                .catch((e) => {
                });
        },
        getDetail (id) {
            services.integral.getOrder(id).then(res => {
                this.info = res;
                if (res.logisticsInfo) {
                    this.info.logisticsInfo = JSON.parse(res.logisticsInfo);
                }
                this.address(this.info.provinceId, 'city');
                this.address(this.info.cityId, 'district');
                this.form.provinceId = this.info.provinceId;
                this.form.cityId = this.info.cityId;
                this.form.districtId = this.info.districtId;
                this.form.address = this.info.address;
                this.form.postCode = this.info.postCode;
                this.form.receiveName = this.info.receiveName;
                this.form.receivePhone = this.info.receivePhone;
            }).catch(err => {
                console.log(err);
            });
        },
        del () {
            this.$confirm('确定删除该兑换品吗？', '提示', {
                type: 'warning'
            }).then(() => {
                services.integral.editGoods({
                    id: this.$route.query.i,
                    valid: 0
                }).then(result => {
                    this.$message.success(`删除成功`);
                    this.$router.replace('/index/integral/goods');
                }).catch(() => {
                    this.$message.error(`删除失败`);
                });
            }).catch(() => {
                console.log('想想还是算了吧');
            });
        },
        submit () {
            this.form.id = this.$route.query.i;
            this.$http.put(this.$api.area.odrPointNote, this.form).then((data) => {
                if (data.data.code === 0) {
                    this.$message.success(`保存成功`);
                    this.getDetail(this.$route.query.i);
                } else {
                    this.$message.error(`保存失败`);
                }
                this.isDialog = false;
            });
        },
        consigneeClick () {
            this.getDetail(this.$route.query.i);
            this.isDialog = true;
        }
    },
    computed: {
        totalPrice () {
            const list = this.info.odrPointNoteItemModelList || [];
            if (!list.length) {
                return 0;
            } else if (list.length === 1) {
                return list[0].redemptionPrice * list[0].redemptionQuantity;
            }
            return list.reduce((n, m) => (n.redemptionPrice * n.redemptionQuantity) + (m.redemptionPrice * m.redemptionQuantity));
        }
    },
    filters: {
        status (val) {
            const list = classifyMap;
            let item = {};
            for (const value of Object.values(list)) {
                if (value.value === val) {
                    item = value;
                }
            }
            return item.name;
        }
    },
    mounted () {
        this.getDetail(this.$route.query.i);
    }
};
</script>
<style lang="scss" scoped>
  .gy-detail-form{
    .consignee{
      color: rgb(74, 144, 226);
    }
    .consigneeBtn{
      border: none;
      width: 350px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      color: #666666;
      margin-right: 20px;
    }
    .consignee:hover{
      cursor: pointer;
    }
  }
</style>
<style lang="scss">
    .integral-order-detail {
        .gy-tab-list {
            display: flex;
            width: 100%;
            margin-top: 30px;
            margin-bottom: 5px;
        }
        .gy-tab-item {
            padding: 3px 8px;
            margin-right:8px;
            font-size: 14px;
            cursor: pointer;
            &.active {
                color: #e0370f;
                border-bottom: 2px solid #e0370f;
            }
        }
        .gy-custom-table {
            width: 100%;
            border: 1px solid #ddd;
            border-collapse:collapse;
            th {
                height: 40px;
                background: #d4d4d4;
            }
            td {
                height: 40px;
                text-align: center;
            }
        }
        .td-img {
            width: 75px;
        }
        .gy-custom-table .tal {
            padding-left: 5em;
            text-align: left;
        }
        .total-price {
            padding-right: 88px;
            text-align: right;
            font-size: 16px;
            font-weight: 700;
            color: #333;
        }
    }
</style>
