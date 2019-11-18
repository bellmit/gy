<template>
    <div id="logistics-home" class="logistics-home">
        <!--START Kv-->
        <div class="logistics-kv">
            <el-carousel :interval="5000">
                <el-carousel-item v-for="item in banner" :key="item.id">
                    <a :href='item.linkUrl ? item.linkUrl : "javascript:;"' class="carouselImg">
                        <div class="item bg-img home-carousel-img" :style='"background-image: url(" + item.imageUrl + ")"'></div>
                    </a>
                </el-carousel-item>
            </el-carousel>
            <div class="form-position" :class="{'icon-search-hide': !formShow}" v-if="isShow">
                <div>
                    <i class="icon icon-kvsearch" @click="tips" v-show="!formShow"></i>
                </div>
                <div class="form-content" v-if="formShow">
                    <ul class="tab">
                        <li class="active">找物流</li>
                        <i class="iconfont icon-close" @click="formShow = false"></i>
                    </ul>
                    <div class="form-title">基础信息</div>
                    <div class="gy-form" style="padding-bottom:5px;">
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>品名</span>
                            <input @click="blur" type="text" class="gy-input" placeholder="请输入" @keyup.enter="getlist1click" v-model="skuInfo.goodsName">
                            <i class="iconfont icon-mySearch searchposition"  @click="getlist1click"></i>
                            <ul class="listulaaa"  v-show="listShow">
                                <li v-for="(item,index) in productList" :key="index" @click="getlist1select(item)" v-if="productList !==null && productList.length>0">
                                    {{item.goodsName}}
                                </li>
                                <li class="none-tips" v-if="productList !=null && productList.length === 0">没有搜到相关内容</li>
                            </ul>
                        </div>
                        <div class="gy-form-group weight">
                            <span class="l"><strong>*</strong>重量</span>
                            <input type="text" class="gy-input" v-model="findData.enquiryNoteItemList[0].skuQuantity">
                            <el-select v-model="findData.enquiryNoteItemList[0].infUnitOfMeasureId" class="unit-select" placeholder="单位">
                                <el-option
                                        v-for="item in weightUnit"
                                        :key="item.id"
                                        :label="item.displayName"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>装货地<a href="javascript:;" class="address-lib" @click="handleShowAddressLib(0)"><i class="gy-button-address">地址库</i></a></span>
                            <div class="address">
                                <el-select v-model="findData.loadWarehouseAddressModel.provinceId" placeholder="省" @change="provinceChange(0, findData.loadWarehouseAddressModel.provinceId)"
                                           class="fl province">
                                    <el-option
                                            v-for="item in loadProvinceList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="findData.loadWarehouseAddressModel.cityId" placeholder="市" class="fr city" @change="cityChange(0, findData.loadWarehouseAddressModel.cityId)">
                                    <el-option
                                            v-for="item in loadCityList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="findData.loadWarehouseAddressModel.districtId" placeholder="区" class="fl province" @change="districtChange(0, findData.loadWarehouseAddressModel.districtId)">
                                    <el-option
                                            v-for="item in loadDistrictList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="findData.loadWarehouseAddressModel.townId" placeholder="镇/街道" class="fr city">
                                    <el-option
                                            v-for="item in loadTownList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                                <input type="text" class="gy-input" v-model="findData.loadWarehouseAddressModel.address" placeholder="请输入详细地址">
                            </div>
                        </div>
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>卸货地<a href="javascript:;" class="address-lib" @click="handleShowAddressLib(1)"><i class="gy-button-address">地址库</i></a></span>
                            <div class="address">
                                <el-select v-model="findData.unloadWarehouseAddressModel.provinceId" placeholder="省" @change="provinceChange(1, findData.unloadWarehouseAddressModel.provinceId)"
                                           class="fl province">
                                    <el-option
                                            v-for="item in unloadProvinceList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="findData.unloadWarehouseAddressModel.cityId" placeholder="市" class="fr city" @change="cityChange(1, findData.unloadWarehouseAddressModel.cityId)">
                                    <el-option
                                            v-for="item in unloadCityList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="findData.unloadWarehouseAddressModel.districtId" placeholder="区" class="fl province" @change="districtChange(1, findData.unloadWarehouseAddressModel.districtId)">
                                    <el-option
                                            v-for="item in unloadDistrictList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-select v-model="findData.unloadWarehouseAddressModel.townId" placeholder="镇/街道" class="fr city">
                                    <el-option
                                            v-for="item in unloadTownList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                                <input type="text" class="gy-input" v-model="findData.unloadWarehouseAddressModel.address" placeholder="请输入详细地址">
                            </div>
                        </div>
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>车辆要求</span>
                            <el-select v-model="findData.infCarrierTypeId" placeholder="请选择车辆类型">
                                <el-option
                                        v-for="item in carType"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>货值（元）</span>
                            <input type="text" class="gy-input" v-model="findData.enquiryNoteItemList[0].skuPrice">
                            <span class="unit"><el-select v-model="findData.enquiryNoteItemList[0].intCurrencyId" placeholder="币种" class="money">
                            <el-option
                                    v-for="item in moneyUnit"
                                    :key="item.id"
                                    :label="item.friendlyName"
                                    :value="item.id">
                            </el-option>
                            </el-select><el-select v-model="findData.enquiryNoteItemList[0].infUnitOfMeasureId" disabled class="weight" placeholder="单位">
                                <el-option
                                        v-for="item in weightUnit"
                                        :key="item.id"
                                        :label="item.displayName"
                                        :value="item.id">
                                </el-option>
                            </el-select></span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>货损限制（‰）</span>
                            <input type="text" class="gy-input" v-model="damageRate" placeholder="请输入">
                        </div>
                        <!-- <div class="gy-form-group">
                            <span class="l"><strong>*</strong>报价方式</span>
                            <el-select v-model="findData.quoteType" placeholder="请选择报价方式">
                                <el-option
                                        v-for="item in quoteType"
                                        :key="item.id"
                                        :label="item.value"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div> -->
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>期望发货日期</span>
                            <el-date-picker
                                    v-model="findData.estimatedLoadingDate"
                                    type="datetime"
                                    :picker-options="minDate"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>有效期</span>
                            <el-date-picker
                                    v-model="findData.effectiveDate"
                                    type="datetime"
                                    :picker-options="minDate"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="gy-form">
                        <div class="form-title" v-show="showMore">详细信息</div>
                        <transition name="fade">
                            <div class="more" v-show="showMore">
                                <div class="gy-form-group">
                                    <span class="l">托运方</span>
                                    <input type="text" class="gy-input" v-model="consignorName" disabled>
                                </div>
                                <div class="gy-form-group">
                                    <span class="l">托运方联系人</span>
                                    <input type="text" class="gy-input" v-model="contact" placeholder="请输入托运方联系人">
                                </div>
                                <div class="gy-form-group">
                                    <span class="l">托运方手机号</span>
                                    <input type="text" class="gy-input" v-model="contactMobile" placeholder="请输入手机号">
                                </div>
                                <div class="gy-form-group">
                                    <span class="l">备注</span>
                                    <input type="text" class="gy-input" v-model="findData.remark" placeholder="请输入">
                                </div>
                                <div class="gy-form-group">
                                    <span class="l">发货公司</span>
                                    <input type="text" class="gy-input" placeholder="请输入发货公司名称" v-model="findData.loadWarehouseAddressModel.warehouseName">
                                </div>
                                <div class="gy-form-group">
                                    <span class="l">收货公司</span>
                                    <input type="text" class="gy-input" placeholder="请输入收货公司名称" v-model="findData.unloadWarehouseAddressModel.warehouseName">
                                </div>
                                <div class="gy-form-group">
                                    <span class="l">发货联系人</span>
                                    <input type="text" class="gy-input" v-model="findData.loadContact" placeholder="请输入发货联系人">
                                </div>
                                <div class="gy-form-group">
                                    <span class="l">收货联系人</span>
                                    <input type="text" class="gy-input" v-model="findData.unloadContact" placeholder="请输入收货联系人">
                                </div>
                                <div class="gy-form-group">
                                    <span class="l">发货联系方式</span>
                                    <input type="text" class="gy-input" v-model="findData.loadContactMobile" placeholder="请输入发货联系方式">
                                </div>
                                <div class="gy-form-group">
                                    <span class="l">收货联系方式</span>
                                    <input type="text" class="gy-input" v-model="findData.unloadContactMobile" placeholder="请输入收货联系方式">
                                </div>
                            </div>
                        </transition>
                        <div class="gy-form-button">
                            <span class="button-more">
                                <span v-if="showMore" @click="showMore = !showMore"><i class="iconfont icon-up1"></i></span>
                                <span v-if="!showMore" @click="showMore = !showMore"><i class="iconfont icon-down1"></i></span>
                            </span>
                            <button class="gy-button-extra bidSend" style="margin-top:8px;" @click="bidSend">提交</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--End Kv-->
        <!--实时物流需求-->
        <div class="real-time">
            <div class="real-left">
                <div class="title-public">
                    <div class="title-left">物流动态</div>
                    <div class="search">
                        <i class="iconfont icon-search" @click="searchData.pageNum = 1;getReal()"></i>
                        <input type="text" class="gy-input" v-model="keywords" placeholder="请输入品名" @keyup.enter="searchData.pageNum = 1;getReal()">
                    </div>
                </div>
                <div class="real-table">
                    <table class="gy-table">
                        <thead>
                        <tr>
                            <td>品名</td>
                            <td>数量</td>
                            <td>装货地</td>
                            <td>卸货地</td>
                            <td style="max-width: 160px;">货主公司</td>
                            <td>状态</td>
                            <td>发布日期</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in realList" :key="item.id" v-if="realList !==null && realList.length > 0">
                            <td>
                                <span style="max-width: 90px" :title="(item.goodsName && item.goodsName.replace(/[^x00-xff]/g, 'aa').length > 14)? item.goodsName : ''" v-if="item.goodsName">
                                    {{item.goodsName}}
                                </span>
                                <span v-else>-</span>
                            </td>
                            <td class="align-r">
                                <span style="max-width:60px;" :title="(item.total !==0 && JSON.stringify(item.total).replace(/[^x00-xff]/g, 'aa').length > 4)? item.total + '吨' : ''" v-if="item.total">
                                    {{item.total}}吨
                                </span>
                                <span v-else>-</span>
                            </td>
                            <td>
                                <span style="max-width: 145px;" :title="(item.loadTotalAddress).replace(/[^x00-xff]/g, 'aa').length > 22? item.loadTotalAddress : ''" v-if="item.loadTotalAddress">{{item.loadTotalAddress}}</span>
                                <span v-else>-</span>
                            </td>
                            <td>
                                <span style="max-width: 145px;" :title="(item.unloadTotalAddress).replace(/[^x00-xff]/g, 'aa').length > 22? item.unloadTotalAddress : ''" v-if="item.unloadTotalAddress">{{item.unloadTotalAddress}}</span>
                                <span v-else>-</span>
                            </td>
                            <td>
                                <span style="max-width: 150px;">{{item.consignorCompanyName}}</span><i v-if="item.consignorCompanyName !== null" class="iconfont icon-imnew" @click="goIm(contactMobile, item.consignorImContactPhone, item.consignorId)"></i>
                            </td>
                            <td>
                                <span style="max-width: 50px;" v-if="item.delivaryStatus !== null">{{item.delivaryStatus}}</span>
                                <span v-else>-</span>
                            </td>
                            <td>
                                <span style="max-width: 70px;">{{item.publishedDate | date}}</span>
                            </td>
                        </tr>
                        <tr v-if="realList !=null && realList.length === 0">
                            <td colspan="10" class="note">暂无数据</td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="pagination-box" v-if="searchData != null && searchData.total>searchData.pageSize">
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                :current-page.sync="searchData.pageNum"
                                :page-size="searchData.pageSize"
                                :total="searchData.total"
                                @current-change="getReal"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="real-right">
                <div class="title-public title-public-right">
                    实时运单信息
                    <div class="gy-form-button button-right">
                        <button class="gy-button-extra" @click="Order('order')">订单查询</button>
                    </div>
                </div>
                <div class="real-table-right">
                    <div class="real-container">
                        <vue-seamless :data="messageList" :class-option="classOption" class="warp">
                            <ul class="real-table-list">
                                <li v-for="(item, index) in messageList" :key="index" v-if="messageList !== null && messageList.length > 0">
                                    <span :title="item.companyName" class="span-width" v-if="item.companyName !== null">
                                        {{item.companyName}}
                                    </span>
                                    <span class="span-width" v-else>-</span>
                                    <span :title="(item.skuName && item.skuName.replace(/[^x00-xff]/g, 'aa').length > 10)? item.skuName : ''" style="width:84px;" class="span-width" v-if="item.skuName !==null">
                                        {{item.skuName}}
                                    </span>
                                    <span style="width:84px;" v-else>-</span>
                                    <span :title="item.quantityPlanned + '吨'" class="span-width-right">{{item.quantityPlanned}}吨</span>
                                    <span>{{item.dnStatusStr}}</span>
                                </li>
                                <li  v-if="messageList!= null && messageList.length === 0" style="text-align: center">
                                    暂无数据
                                </li>
                            </ul>
                        </vue-seamless>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-title">
            <h2>国烨智运</h2>
        </div>
        <span class="sub-title">定位于第四方大宗商品物流服务商</span>
        <div class="gy-logistics">
            <div class="item">
                <div class="inner">
                    <div class="fl"><img src="../assets/images/highway.jpg" alt=""></div>
                    <dl class="copy">
                        <dt>公路运输</dt>
                        <dd>可承运各类普货，危险货物，同时提供例如：海关监管，特种集装箱，大件物流等各类定制化服务。利用互联网+SAAS平台,GPS-GIS-RS相结合，时刻掌握在途货物最新动态.</dd>
                        <dd>
                            <div class="gy-form-button button-transport">
                                <button class="gy-button-extra" @click="Order('consign/find')" v-show="showLogistics">找物流</button>
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
            <div class="item">
                <div class="inner">
                    <div class="fr"><img src="../assets/images/waterway.jpg" alt=""></div>
                    <dl class="copy">
                        <dt>水路运输</dt>
                        <dd>国烨整合内外航运，码头，仓储，商检，报关，保险等优质资源，为客户提供租船，订舱，港口码头，拖车，报检等一站式综合的进出口物流服务。</dd>
                        <dd>
                            <div class="gy-form-button button-padding">
                                <button class="gy-button-extra" @click="Order('boat/add')" v-show="showLogistics">找物流</button>
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
            <!--<div class="item">-->
                <!--<div class="inner">-->
                    <!--<div class="fl"><img src="../assets/images/railway.jpg" alt=""></div>-->
                    <!--<dl class="copy">-->
                        <!--<dt>铁路运输</dt>-->
                        <!--<dd>国烨拥有优质铁路运输服务商，为客户提供国内铁路运输服务，及从国家往返周边国家，如：蒙古，俄罗斯，越南，朝鲜和中亚五国等的铁路运输服务。</dd>-->
                    <!--</dl>-->
                <!--</div>-->
            <!--</div>-->
        </div>
        <div class="logistics-main-app" :style='"background-image: url(" + bgimage.app + ")"'>
            <div class="inner">
                <dl class="fl">
                    <dt>智运APP</dt>
                    <dd>智运随身，调度随心，一切尽在掌握</dd>
                    <dd class="ewm" v-if="isProduct">
                        <div>
                            <span><img src="../assets/images/ewm-zy.png" alt=""></span>
                            <strong>智运调度端</strong>
                        </div>
                        <div>
                            <span><img src="../assets/images/ewm-sj.png" alt=""></span>
                            <strong>智运司机端</strong>
                        </div>
                    </dd>
                    <dd class="ewm" v-else>
                        <div>
                            <span><img src="../assets/images/ewm-zy-uat.png" alt=""></span>
                            <strong>智运调度端</strong>
                        </div>
                        <div>
                            <span><img src="../assets/images/ewm-sj-uat.png" alt=""></span>
                            <strong>智运司机端</strong>
                        </div>
                    </dd>
                </dl>
                <div class="fr">
                    <img src="../assets/images/phone.png">
                </div>
            </div>
        </div>
        <div class="main-title">
            <h2>推荐物流公司</h2>
        </div>
        <carousel :recommendCompany='recommendCompany'></carousel>
        <address-lib :loadSelected.sync="findData.loadWarehouseAddressModel" :unloadSelected.sync="findData.unloadWarehouseAddressModel" :show.sync="showAddressLib" :type.sync="addressType"></address-lib>
        <ul class="tools-bar">
            <li>
                <img src="../assets/images/ewm-zy.png" alt="">
                <span>调度端</span>
            </li>
            <li>
                <img src="../assets/images/ewm-sj.png" alt="">
                <span>司机端</span>
            </li>
        </ul>
    </div>
</template>

<script>
import addressLib from '@/components/address';
import carousel from '@/components/carousel';
import vueSeamless from 'vue-seamless-scroll';
const findDatas = {
    consignorId: null,
    infCarrierTypeId: null,
    quoteType: 0,
    effectiveDate: null,
    estimatedLoadingDate: null,
    loadAreaId: null,
    unloadAreaId: null,
    loadAddress: null,
    unloadAddress: null,
    loadContact: null,
    unloadContact: null,
    loadContactMobile: null,
    unloadContactMobile: null,
    remark: null,
    freightPaymentType: 0,
    consignmentSignType: 0,
    enquiryNoteItemList: [
        {
            infUnitOfMeasureId: 2,
            skuPrice: null,
            skuQuantity: null,
            intCurrencyId: 1
        }
    ],
    loadWarehouseAddressModel: {
        address: null,
        cityId: null,
        districtId: null,
        provinceId: null,
        townId: null,
        warehouseName: null
    },
    unloadWarehouseAddressModel: {
        address: null,
        cityId: null,
        districtId: null,
        provinceId: null,
        townId: null,
        warehouseName: null
    }
};
// 手机号验证
const verifyMobile = function (value) {
    if (!(/^1[3456789]\d{9}$/.test(value))) {
        return false;
    } else {
        return true;
    }
};
export default {
    data () {
        return {
            left: 0,
            transition: null,
            newData: [],
            isShow: false,
            companyTypeId: null,
            minDate: {
                disabledDate (time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            messTotal: 0,
            listShow: false,
            bgimage: {
                banner: require('../assets/images/banner.jpg'),
                app: require('../assets/images/IntelligentAPP.png')
            },
            keywords: '',
            showMore: false,
            findData: JSON.parse(JSON.stringify(findDatas)),
            skuCode: null,
            skuName: null,
            contact: null,
            contactMobile: null,
            damageRate: null,
            sendProvinceList: [],
            sendCityList: [],
            loadProvinceList: [],
            loadCityList: [],
            loadDistrictList: [],
            loadTownList: [],
            unloadProvinceList: [],
            unloadCityList: [],
            unloadDistrictList: [],
            unloadTownList: [],
            consignorName: '',
            tabsList: [
                {
                    title: '签约中',
                    amount: 120
                },
                {
                    title: '实施中',
                    amount: 120
                },
                {
                    title: '结算中',
                    amount: 120
                },
                {
                    title: '付款中',
                    amount: 120
                },
                {
                    title: '已完成',
                    amount: 120
                },
                {
                    title: '已失效',
                    amount: 120
                }
            ],
            sendProvinceId: null,
            verifyFalseLength: '',
            loadProvinceId: null,
            carType: [],
            productId: null,
            unit: null,
            quoteType: [
                {
                    id: 0,
                    value: '承运商报价'
                }
                // {
                //     id: 1,
                //     value: '我有意向价'
                // },
                // {
                //     id: 2,
                //     value: '向指定承运商询价'
                // }
            ],
            productList: [],
            skuInfo: {
                goodsName: null,
                goodsCode: null
            },
            weightUnit: [],
            moneyUnit: [],
            formShow: false,
            isProduct: false,
            banner: null, // 存放 banner图片
            searchData: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                data: {
                    keywords: null // 关键词搜索 品名
                }
            }, // 存放实时物流需求请求
            realList: [], // 实时物流需求请求列表
            searchDataList: {
                pageNum: 1,
                pageSize: 100,
                data: {}
            }, // 存放实时运单信息
            messageList: [], // 存放实时运单信息列表
            timer: null,
            recommendCompany: null, // 存放推荐物流
            messageLeft: 0,
            showAddressLib: false,
            addressType: 0, // 0 装货地址， 1 卸货地址
            classOption: {
                step: 0.4,
                limitMoveNum: 12
            },
            showLogistics: true
        };
    },
    components: {
        addressLib,
        vueSeamless,
        carousel
    },
    created () {
        this.init();
    },
    beforeDestory () {
        sessionStorage.removeItem('noRightsUntip');
    },
    computed: {
        loadWarehouseAddressModel () {
            return this.findData.loadWarehouseAddressModel;
        },
        unloadWarehouseAddressModel () {
            return this.findData.unloadWarehouseAddressModel;
        }
    },
    watch: {
        loadWarehouseAddressModel (newValue, oldValue) {
            console.log(newValue);
            newValue.provinceId && this.provinceChange(0, newValue.provinceId, 1);
            newValue.cityId && this.cityChange(0, newValue.cityId, 1);
            newValue.districtId && this.districtChange(0, newValue.districtId, 1);
        },
        unloadWarehouseAddressModel (newValue, oldValue) {
            console.log(newValue);
            newValue.provinceId && this.provinceChange(1, newValue.provinceId, 1);
            newValue.cityId && this.cityChange(1, newValue.cityId, 1);
            newValue.districtId && this.districtChange(1, newValue.districtId, 1);
        }
    },
    methods: {
        init () {
            sessionStorage.noRightsUntip = 1;
            if (localStorage.getItem('userInfo')) {
                this.consignorName = JSON.parse(localStorage.getItem('userInfo')).companyName;
                this.contactMobile = JSON.parse(localStorage.getItem('userInfo')).phone;
                this.contact = JSON.parse(localStorage.getItem('userInfo')).username;
                this.findData.consignorId = JSON.parse(localStorage.getItem('userInfo')).companyId;
                this.companyTypeId = JSON.parse(localStorage.getItem('userInfo')).companyTypeId;
                this.showLogistics = this.companyTypeId !== 2; // 公路水路-找物流 承运商时隐藏
            }
            if (this.companyTypeId !== 5 && this.companyTypeId !== 2 && this.companyTypeId !== 3) {
                this.isShow = true;
            }
            this.getBanner();
            this.getReal();
            this.getMessage();
            this.getCarList();
            this.getProvince();
            this.getProductList();
            this.getMoneyUnit();
            this.getWeightUnit();
            this.getDomain();
            this.getRecommendCompany();
        },
        getBanner () {
            this.$http.get(this.$api.transport.bannerImg)
                .then(res => {
                    if (res.data.code === 0) {
                        this.banner = res.data.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
        },
        // 获取实时物流需求 列表
        getReal () {
            this.searchData.data.keywords = this.keywords;
            this.$http.post(this.$api.transport.notLoginSearch, this.searchData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.searchData.total = res.data.data.total;
                        this.realList = res.data.data.list;
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
        },
        // 实时运单信息列表
        getMessage () {
            this.$http.post(this.$api.transport.messageSearch, this.searchDataList)
                .then(res => {
                    if (res.data.code === 0) {
                        this.messageList = res.data.data.list;
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
        },
        // 推荐公司
        getRecommendCompany () {
            this.$http.get(this.$api.transport.warehouse)
                .then(res => {
                    if (res.data.code === 0) {
                        this.recommendCompany = res.data.data;
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
        },
        getDomain () {
            // let url = window.location.hostname;
            this.isProduct = true;
        },
        tips () {
            if (!localStorage.getItem('userInfo')) {
                window.open(`/my/#/login`);
            } else {
                this.formShow = true;
            }
        },
        getCarList () {
            this.$http.post(this.$api.transport.carType)
                .then(res => {
                    this.carType = res.data.data.list;
                }).catch(err => {
                    if (err && err.data && err.data.code === 401) {
                        this.formShow = false;
                    }
                });
        },
        /* 添加的 */
        getProvince () {
            this.$http.get(this.$api.account.newArea + '/0')
                .then(res => {
                    this.loadProvinceList = res.data.data;
                    this.unloadProvinceList = res.data.data;
                });
        },
        provinceChange (type, param, lib) {
            this.$http.get(this.$api.account.newArea + '/' + param)
                .then(res => {
                    if (type === 0) {
                        if (!lib) {
                            for (let item in this.findData.loadWarehouseAddressModel) {
                                (item !== 'provinceId' && item !== 'adress') && (this.findData.loadWarehouseAddressModel[item] = null);
                            }
                        }
                        this.loadCityList = res.data.data;
                    } else {
                        if (!lib) {
                            for (let item in this.findData.unloadWarehouseAddressModel) {
                                (item !== 'provinceId' && item !== 'adress') && (this.findData.unloadWarehouseAddressModel[item] = null);
                            }
                        }
                        this.unloadCityList = res.data.data;
                    }
                });
        },
        cityChange (type, param, lib) {
            this.$http.get(this.$api.account.newArea + '/' + param)
                .then(res => {
                    if (type === 0) {
                        if (!lib) {
                            for (let item in this.findData.loadWarehouseAddressModel) {
                                (item !== 'provinceId' && item !== 'cityId' && item !== 'adress') && (this.findData.loadWarehouseAddressModel[item] = null);
                            }
                        }
                        this.loadDistrictList = res.data.data;
                    } else {
                        if (!lib) {
                            for (let item in this.findData.unloadWarehouseAddressModel) {
                                (item !== 'provinceId' && item !== 'cityId' && item !== 'adress') && (this.findData.unloadWarehouseAddressModel[item] = null);
                            }
                        }
                        this.unloadDistrictList = res.data.data;
                    }
                });
        },
        districtChange (type, param, lib) {
            this.$http.get(this.$api.account.newArea + '/' + param)
                .then(res => {
                    if (type === 0) {
                        !lib && (this.findData.loadWarehouseAddressModel['townId'] = null);
                        this.loadTownList = res.data.data;
                    } else {
                        !lib && (this.findData.unloadWarehouseAddressModel['townId'] = null);
                        this.unloadTownList = res.data.data;
                    }
                });
        },
        handleShowAddressLib (n) {
            this.addressType = n;
            this.showAddressLib = true;
        },
        getProductList () {
            this.$http.get(this.$api.global.product + this.skuInfo.goodsName)
                .then(res => {
                    this.productList = res.data.data;
                }).catch(err => {
                    if (err && err.data && err.data.code === 401) {
                        this.formShow = false;
                    }
                });
        },
        getMoneyUnit () {
            this.$http.get(this.$api.global.moneyUnit)
                .then(res => {
                    this.moneyUnit = res.data.data;
                }).catch(err => {
                    if (err && err.data && err.data.code === 401) {
                        this.formShow = false;
                    }
                });
        },
        getWeightUnit () {
            this.$http.post(this.$api.global.weightUnit, {
                data: {
                    infUnitOfMeasureCategoryId: 1
                },
                pageNum: 1,
                pageSize: 10000
            })
                .then(res => {
                    this.weightUnit = res.data.data.list;
                }).catch(err => {
                    if (err && err.data && err.data.code === 401) {
                        this.formShow = false;
                    }
                });
        },
        bidSend () {
            this.verifyFalseLength = 0;
            if (!localStorage.getItem('userInfo')) {
                this.$alert('请先登录后再继续', '提示');
                return;
            } else {
                this.findData.consignorId = JSON.parse(localStorage.getItem('userInfo')).companyId;
            }
            if (this.skuInfo) {
                this.findData.enquiryNoteItemList[0].skuName = this.skuInfo.goodsName;
                this.findData.enquiryNoteItemList[0].skuCode = this.skuInfo.goodsCode;
            }
            this.findData.enquiryNoteItemList[0].damageRate = this.damageRate;
            this.findData.contact = this.contact;
            this.findData.contactMobile = this.contactMobile;
            if (!this.skuInfo.goodsName) {
                this.$message.error('品名不能为空');
                return;
            }
            if (!this.findData.enquiryNoteItemList[0].skuQuantity || !/^[0-9]+(.[0-9]{1,3})?$/.test(this.findData.enquiryNoteItemList[0].skuQuantity)) {
                this.$message.error('重量不能为空，且最多保留3位小数');
                return;
            }
            if (!this.findData.loadWarehouseAddressModel.provinceId || !this.findData.loadWarehouseAddressModel.cityId || !this.findData.loadWarehouseAddressModel.districtId || !this.findData.loadWarehouseAddressModel.townId || !this.findData.loadWarehouseAddressModel.address || this.findData.loadWarehouseAddressModel.address.length > 30) {
                this.$message.error('装货省、市、区、镇/街道、地址不能为空，且地址最多输入30个字符');
                return;
            }
            if (!this.findData.unloadWarehouseAddressModel.provinceId || !this.findData.unloadWarehouseAddressModel.cityId || !this.findData.unloadWarehouseAddressModel.districtId || !this.findData.unloadWarehouseAddressModel.townId || !this.findData.unloadWarehouseAddressModel.address || this.findData.unloadWarehouseAddressModel.address.length > 30) {
                this.$message.error('卸货省、市、区、镇/街道、地址不能为空，且地址最多输入30个字符');
                return;
            }
            if (!this.findData.infCarrierTypeId) {
                this.$message.error('请选择车辆类型');
                return;
            }
            if (this.findData.quoteType !== 0 && this.findData.quoteType !== 1 && this.findData.quoteType !== 2) {
                this.$message.error('请选择报价方式');
                return;
            }
            if (!this.findData.estimatedLoadingDate) {
                this.$message.error('期望发货日期不能为空');
                return;
            }
            if (!this.findData.effectiveDate) {
                this.$message.error('有效期不能为空');
                return;
            }
            if (!this.findData.contact) {
                this.$message.error('托运方联系人不能为空');
                return;
            }
            if (!verifyMobile(this.findData.contactMobile)) {
                this.$message.error('请输入正确托运方手机号');
                return;
            }
            if (!this.findData.enquiryNoteItemList[0].skuPrice) {
                this.$message.error('请填写货值');
                return;
            }
            if (this.findData.enquiryNoteItemList[0].skuPrice && !/^[0-9]+(.[0-9]{1,2})?$/.test(this.findData.enquiryNoteItemList[0].skuPrice)) {
                this.$message.error('货值最多保留2位小数');
                return;
            }
            if (this.damageRate && (!(/^[0-9]+(.[0-9]{1,2})?$/.test(this.damageRate)) || this.damageRate > 10)) {
                this.$message.error('货损限制最多保留2位小数且不能大于10');
                return;
            }
            if (!this.damageRate) {
                this.$message.error('请填写货损限制');
                return;
            }
            this.$http.post(this.$api.transport.priceList, this.findData)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '提交成功'
                        });
                        this.formShow = false;
                        this.showMore = false;
                        this.findData = JSON.parse(JSON.stringify(findDatas));
                        this.skuInfo = {
                            goodsName: null,
                            goodsCode: null
                        };
                        this.damageRate = null;
                        this.getReal();
                        return;
                    }
                    this.$alert(res.data.message, '出错了');
                });
        },
        // 订单查询跳转
        Order (value) {
            if (!localStorage.getItem('userInfo')) {
                window.open(`/my/#/login`);
            } else {
                location.href = `/my/#/transport/${value}`;
            }
        },
        // 品名筛选
        getlist1click () {
            this.listShow = true;
            this.getProductList();
        },
        getlist1select (item) {
            this.listShow = false;
            this.skuInfo.goodsName = item.goodsName;
            this.skuInfo.goodsCode = item.goodsCode;
        },
        blur () {
            this.listShow = false;
            this.skuInfo.goodsName = null;
            this.skuInfo.goodsCode = null;
        },
        goIm (f, t, touserCompanyId) {
            if (!localStorage.getItem('userInfo')) {
                window.open(`/my/#/login`);
            } else {
                window.open('/im/#type=2&username=' + window.btoa(f) + '&touser=' + window.btoa(t) + '&touserCompanyId=' + window.btoa(touserCompanyId), '_blank');
            }
        }
    }
};
</script>
<style lang="scss" scoped>
    .gy-button-address{
        padding: 0 3px;
        font-size: 12px;
        color: #E0370F;
        border: 1px solid #E0370F;
        border-radius: 4px;
        border-radius: 4px;
    }
    .logistics-home{
        .gy-form-group{
            line-height: 26px;
        }
        .carouselImg{
            display: block;
        }
        .el-carousel__container{
            height:380px !important;
        }
    }
    .el-select{
        width: 100%;
    }
    .unit-select, .unit{
        width: 80px;
        position: absolute;
        right: 20px;
        top: 4px;
    }
    .address{
        .province, .city{
            width: 45%;
        }
        .gy-input{
            clear: both;
            margin-top: 10px;
        }
    }
    label{
        margin-right: 10px;
        input{
            margin-right: 5px;
        }
    }
    .unit{
        width: auto;
        font-size: $small-font;
        .weight, .money{
            width: 85px;
        }
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100% !important;
    }
</style>
