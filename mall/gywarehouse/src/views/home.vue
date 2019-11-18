<template>
    <div class="warehouse-home">
        <!--START Kv-->
        <div class="kv">
            <i v-if="!addRequisition && storageId !==2 && storageId !==3 && storageId !==5"  @click="dengluShow" class="icon icon-kvsearch search"></i>
            <div class="gy-form-box" v-if="addRequisition">
              <div class="search-tit">
                <span>找仓储</span>
                <i class="iconfont icon-close" @click="addRequisition = false"></i>
              </div>
              <div class="">
                <div class="gy-form-group">
                  <span class="l"><strong>*</strong>品名</span>
                  <product-search :selected.sync="selectedProduct"></product-search>
                </div>
                <div class="gy-form-group">
                  <span class="l"><strong>*</strong>数量</span>
                  <input class="gy-input" type="text" style="width:90%;" v-model="searchfrom.quantity" placeholder="请输入"> 吨
                </div>
                <div class="gy-form-group">
                  <span class="l"><strong>*</strong>计划入库日期</span>
                  <div class="date-picker">
                    <el-date-picker
                        v-model="searchfrom.expectEntryDate"
                        type="date"
                        placeholder="请选择">
                    </el-date-picker>
                  </div>
                </div>
                <div class="gy-form-group">
                  <span class="l"><strong>*</strong>仓储区域</span>
                  <el-select v-model="searchfrom.areaCategory">
                  <!-- <el-option label="全部" value=""></el-option> -->
                  <el-option
                          v-for="item in areaCategoryLists"
                          :key="item.id"
                          :label="item.areaCategoryName"
                          :value="item.id">
                      </el-option>
                  </el-select>
                </div>
                <div class="gy-form-group form-width-new cl">
                  <span class="l"><strong>*</strong>仓储单价</span>
                  <input type="text" style="width:30%;" placeholder="请输入" v-model="intentPrice" @focus="ismianmin = true">
                  <span class="search-span">元/立方*月</span>
                  <el-radio-group v-model="ismianmin" @change="change">
                      <el-radio label="面议"></el-radio>
                  </el-radio-group>
                </div>
                <div class="cl fr" style="padding:10px 30px 30px 0">
                  <button class="gy-button-extra" @click="requisitonSubmit">提交</button>
                </div>
              </div>
            </div>
            <el-carousel :interval="5000">
                <el-carousel-item v-for="(item, index) in advertisingList" :key="index">
                    <div class="bg-img home-carousel-img" :style='"background-image: url(" + item.imageUrl + ")"'>
                      <!-- <div class="search" @click="">搜</div> -->
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <!--END 内容区-->
        <div class="warehouse-main">
          <!-- 仓储资源搜索 -->
          <div class="resource-selection">
            <div class="selection-left">
              <div style="padding-bottom:17px;">
                <p class="cztit">仓储资源筛选</p>
                <div class="search-box">
                    <input type="text" class="gy-input" style="padding:0;" v-model="WarehouseCompanySearch.data.name" @keyup.13="getWarehouseCompany" placeholder="请输入仓储公司名称">
                    <i  @click="getWarehouseCompany()" class="iconfont icon-search"></i>
                </div>
              </div>
              <div class="gy-search-group">
                <span class="l">仓储区域</span>
                <ul>
                  <li v-for="(item, index) in areaCategoryList" :key="index" :class="{red:districtindex === item.areaCategoryName}" @click="getDistrictList(item)">
                    {{item.areaCategoryName}}<i class="el-icon-caret-bottom"></i></li>
                </ul>
                <ul class="cl" v-if="havenList.length > 1 && districtindex !== '不限'">
                  <!-- <span>不限</span> -->
                  <li v-for="(item, index) in havenList" :key="index" :class="{red:Havenindex === item.harbourName}" @click="getHavenList(item)">{{item.harbourName}}</li>
                </ul>
              </div>
              <div class="gy-search-group">
                <span class="l">品种类型</span>
                <ul>
                  <li v-for="(item, index) in varietype" :key="index" :class="{red:varietypeindex === item.variety}" @click="getvarietypeList(item)">{{item.variety}}</li>
                </ul>
              </div>
              <div class="gy-search-group">
                <span class="l">码头规模</span>
                <ul>
                  <li v-for="(item, index) in dockScale" :key="index" :class="{red:dockScaleindex === item.dockName}" @click="getdockList(item)">{{item.dockName}}</li>
                </ul>
              </div>
              <div class="gy-search-group">
                <span class="l">入库方式</span>
                <ul>
                  <li v-for="(item, index) in inPutmode" :key="index" :class="{red:inPutmodeindex === item.warehouseDicName}" @click="getinPutmodeList(item)">{{item.warehouseDicName}}</li>
                </ul>
              </div>
              <div class="gy-search-group">
                <span class="l">出库方式</span>
                <ul>
                  <li v-for="(item, index) in outPutmode" :key="index" :class="{red:outPutmodeindex === item.warehouseDicName}" @click="getoutPutmodeList(item)">{{item.warehouseDicName}}</li>
                </ul>
              </div>
            </div>
            <div class="selection-right">
                <p style="font-size: 24px;color: #666666;">液体石油化工分布图</p>
                <div class="map">
                    <img src="../assets/images/map-all.jpg" alt="" class="map-all">
                    <a href="javascript:;" class="map-handler" v-for="(item, index) in mapHandlers" :key="item.id" :style="{left: item.left + 'px', top: item.top + 'px'}" @click="handelShowPopMap(index)"><span></span><i></i></a>
                </div>
            </div>
          </div>
          <div class="clearfix">
            <div class="company-box" v-for="(item, index) in warehouseCompanyList" :key="index">
                <div class="company-list" :class="{'company-cursor':item.homeImgUrl}">
                  <a class="newlink" :href="item.homeImgUrl" style="display: block" target="_blank">
                  <img width="100%" style="display:block;" height="187px;" :src="item.homeImgPath" alt="">
                  <div class="list-details">
                    <div>
                      <p class="fl" style="font-weight:bold;">{{item.name}}</p>
                      <span class="fr" style="color: #999999;">更新日期：{{item.updatedDate | date}}</span>
                    </div>
                    <div v-if="item.warehouseType ===2 " class="cl" style="font-size: 14px;color: #333333;">
                      总罐容: {{item.totalTankCapacity | shownull}}<span v-if="item.totalTankCapacity">万m³</span>
                    </div>
                    <div v-if="item.warehouseType ===1 " class="cl" style="height:36px;">

                    </div>
                    <div class="fields cl">
                      <div style="height:30px;"><span>仓储区域：{{item.areaCategoryName}}·{{item.harbourName}}</span>
                        <span>品种类型：{{item.topCatalogueStr | shownull}}</span>
                        <span class="width180"  v-if="item.registeredCapital">注册资本：{{item.registeredCapital}}万{{item.currencyStr}}</span><span v-else>注册资本：-</span></div>
                      <div><span>经营品种：{{item.productStr | shownull}}</span>
                        <span>出库方式：{{item.storageOutTypeStr | shownull}}</span>
                        <span class="width180">入库方式：{{item.storageInTypeStr | shownull}}</span></div>
                    </div>
                    <div class="chitchat" @click="goIm(currentPhone, '13501141389', '11001')">
                      <i class="iconfont icon-imnew"></i>
                      <span>和我联系</span>
                    </div>
                  </div>
                  </a>
                </div>
            </div>
          </div>
          <div class="more-content" v-if="warehouseCompanyList.length>=4 && hasNextPage" @click="getWarehouseNext">
              更多内容
          </div>
          <div class="gy-from-box">
            <div class="realtime">
              <span>仓储需求</span>
              <div class="search-box">
                  <input type="text" class="gy-input" v-model="requisitionSearch.data.keywords" @keyup.13="getRequisition" placeholder="请输入品名">
                  <i  @click="getRequisition()" class="iconfont icon-search"></i>
              </div>

            </div>
            <div class="table-wrap">
              <table class="gy-table">
                <thead>
                  <tr>
                    <th style="width:160px;">品名</th>
                    <th style="width:160px;">数量</th>
                    <th style="width:160px;">计划入库日期</th>
                    <th style="width:220px;">货主公司</th>
                    <th style="width:160px;">仓储区域</th>
                    <th style="width:160px;">联系人手机</th>
                    <th style="width:180px;">仓储单价</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in requisitionList" :key="item.id">
                        <td style="cursor:pointer;" :title="(item.prdProductName && item.prdProductName.replace(/[^x00-xff]/g, 'aa').length > 20)? item.prdProductName : ''">{{item.prdProductName}}</td>
                        <td class="align-r">{{item.quantity | numToCash(3)}}吨</td>
                        <td>{{item.expectEntryDate | date}}</td>
                        <td class="imclass"><span :title="(item.companyName && item.companyName.replace(/[^x00-xff]/g, 'aa').length > 24)? item.companyName : ''">{{item.companyName | companystart}}</span>&nbsp;&nbsp;<i class="iconfont icon-imnew" @click="goIm(currentPhone, item.phone, item.companyId)"></i></td>
                        <td>{{item.areaCategoryName}}</td>
                        <td>{{item.phone | showstart}}</td>
                        <!-- <td v-if="item.price">{{item.price ? item.price : '面议'}}</td> -->
                        <td class="align-18" v-if="item.price">{{item.price}}元/立方*月</td>
                        <td class="align-18" v-if="!item.price">面议</td>
                    </tr>
                    <tr v-if="requisitionList !=null && requisitionList.length === 0">
                        <td colspan="10" style="text-align:center" class="note">暂无数据</td>
                    </tr>
                </tbody>
              </table>
              <el-pagination
                v-if="requisitionSearch.total>requisitionSearch.pageSize"
                background
                @current-change="getRequisition"
                layout="prev, pager, next"
                style="padding: 20px 0 30px 0;"
                :current-page.sync="requisitionSearch.pageNum"
                :page-size="requisitionSearch.pageSize"
                :total="requisitionSearch.total">
              </el-pagination>
            </div>
          </div>
          <div class="gy-from-box">
            <div class="realtime">
              <span>仓储供应</span>
              <!-- <div class="search-box">
                  <input type="text" class="gy-input" v-model="SupplySearch.data.keywords" placeholder="">
                  <i  @click="getWarehouseSupply()" class="iconfont icon-search"></i>
              </div> -->
              <div class="search-box">
                  <i class="iconfont icon-search" @click="getWarehouseSupply()"></i>
                  <input type="text" class="gy-input" v-model="SupplySearch.data.keywords" placeholder="请输入品名" @keyup.13="getWarehouseSupply">
              </div>
            </div>
            <div class="table-wrap">
              <table class="gy-table">
                <thead>
                  <tr>
                    <th style="width:160px;">品名</th>
                    <th style="width:160px;">空容量</th>
                    <th style="width:160px;">发布日期</th>
                    <th style="width:220px;">仓储公司</th>
                    <th style="width:160px;">仓储区域</th>
                    <th style="width:160px;">联系人手机</th>
                    <th style="width:180px;">仓储单价</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in supplyList" :key="index">
                    <td style="cursor:pointer;" :title="(item.productName && item.productName.replace(/[^x00-xff]/g, 'aa').length > 20)? item.productName : ''">{{item.productName}}</td>
                    <td class="align-r">{{item.emptyCapacity | numToCash(3)}}m³</td>
                    <td>{{item.updatedDate | date}}</td>
                    <td class="imclass"><span :title="(item.companyName && item.companyName.replace(/[^x00-xff]/g, 'aa').length > 24)? item.companyName : ''">{{item.companyName}}</span>&nbsp;&nbsp;<i class="iconfont icon-imnew" @click="goIm(currentPhone, '13501141389', '11001')"></i></td>
                    <td v-if="item.areaCategoryId">{{item.areaCategoryName}}·{{item.harbourName}}</td>
                    <td v-else>-</td>
                    <td>{{item.contactMobile | showstart}}</td>
                    <!-- <td>{{item.intentionalPrice}}</td> -->
                    <td class="align-18" v-if="item.intentionalPrice">{{item.intentionalPrice}}元/立方*月</td>
                    <td class="align-18" v-if="!item.intentionalPrice">面议</td>
                  </tr>
                  <tr v-if="supplyList !=null && supplyList.length === 0">
                        <td colspan="10" style="text-align:center" class="note">暂无数据</td>
                  </tr>
                </tbody>
              </table>
              <el-pagination
                background
                v-if="SupplySearch.total>SupplySearch.pageSize"
                @current-change="getWarehouseSupply"
                layout="prev, pager, next"
                style="padding: 20px 0 30px 0;"
                :current-page.sync="SupplySearch.pageNum"
                :page-size="SupplySearch.pageSize"
                :total="SupplySearch.total">
              </el-pagination>
            </div>
          </div>
          <!--START 推荐仓储-->
          <div class="main-title">
              <h2>推荐仓储公司</h2>
          </div>
          <carousel :recommendCompany='recommendCompany'></carousel>
          <!-- <div class="kv recommend"
          @mouseenter.stop="handleMouseEnter"
          @mouseleave.stop="handleMouseLeave">
                <i class="iconfont icon-jiantou icon-one iconLeft" @click="recommendLeft(activeIndex-1)"></i>
                <i class="iconfont icon-jiantou icon-one iconRight" @click="recommendRight(activeIndex+1)"></i>
                <ul :style=" 'width :' + recommendCompany.length * 305 + 'px;left:' + messageLeft + 'px'" class="recommendUi">
                    <li v-for="(item, index) in recommendCompany" :key="index">
                        <img :src="item.companyLogo" alt="">
                        <dl>
                            <dt :title="item.name">{{item.name}}</dt>
                        </dl>
                    </li>
                </ul>
          </div> -->
          <!--END 推荐仓储-->
          <!--  -->
        </div>
        <transition name="fade">
            <div class="pop-map" v-show="showPopMap">
                <div class="main">
                    <div class="map-img">
                        <img v-for="(item, index) in mapBig" :src="item" :key="item" v-show="mapHandlers[index].showbig" alt="" class="map-big">
                    </div>
                </div>
                <span class="mask" @click="closePopMap"></span>
            </div>
        </transition>
    </div>
</template>

<script>
import productSearch from './components/productSearch';
import carousel from './components/carousel';
export default {
    components: {
        productSearch,
        carousel
    },
    data () {
        return {
            storageId: null,
            addRequisition: false,
            arriveDate: '',
            pageNum: '',
            pageSize: '',
            itemTotal: '',
            checkedValue: '',
            ismianmin: true, // 面议
            intentPrice: null,
            selectedProduct: {},
            queryCriteria: '',
            districtindex: '不限',
            Havenindex: '不限',
            varietypeindex: '不限',
            dockScaleindex: '不限',
            outPutmodeindex: '不限',
            inPutmodeindex: '不限',
            currentPhone: null,
            districtred: false,
            warehouseCompanyList: [],
            havenList: [
                {
                    id: null,
                    harbourName: '不限'
                }
            ],
            searchfrom: {
                expectEntryDate: '',
                areaCategoryId: null,
                prdProductId: '',
                quantity: '',
                price: ''
            },
            requisitionSearch: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                data: {
                    keywords: null, // 关键词搜索 品名-联系人-联系电话
                    isAudit: 1, //  受理状态 1:未受理 2已受理 3:已拒绝
                    isDisplay: 1, // 是否显示 1 显示 0不显示
                    unloadWrhHarbourName: null, // 目的港
                    approveStatus: null, // 受理状态 1:未受理 2已受理 3:已拒绝
                    createdDateStart: null, // 开始时间
                    createdDateEnd: null, // 结束时间
                    estimatedLoadingDateStart: null, // 发货日期开始
                    estimatedLoadingDateEnd: null // 发货日期结束
                }
            },
            SupplySearch: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                data: {
                    keywords: null, // 关键词搜索 品名-联系人-联系电话
                    isAudit: 1, //  受理状态 1:未受理 2已受理 3:已拒绝
                    companyName: null, // 目的港
                    isDisplay: 1, // 是否显示 1 显示 0不显示
                    createdBeginDate: null, // 开始时间
                    createdEndDate: null, // 结束时间
                    expectBeginEntryDate: null, // 发货日期开始
                    expectEndEntryDate: null // 发货日期结束
                }
            },
            WarehouseCompanySearch: {
                total: 0,
                pageNum: 1,
                pageSize: 4,
                data: {
                    name: null, // 公司名称
                    address: null, // 公司地址
                    areaCategoryIds: null, // 地区
                    contactPerson: null, // 联系人
                    contactMobile: null, // 联系手机
                    status: null, // 状态
                    createdPerson: null, // 提交人
                    updatedPerson: null, // 更改人
                    areaCategoryId: null, // 区域
                    harbourId: null, // 港口
                    topCatalogueIds: null, // 品种类型
                    minTonnage: null, // 最小吨位
                    maxTonnage: null, // 最大吨位
                    storageOutType: null, // 出库类型
                    storageInType: null // 入库类型
                }
            },
            warehouseCompany: {
                pageNum: 1,
                pageSize: 4
            },
            recommendCompany: null,
            advertisingList: [],
            supplyList: [], // 供应单
            requisitionList: [], // 需求单
            bgimgHolder: require('../assets/images/map.png'),
            recommendList: [
                {
                    id: 0,
                    name: '洋山申港国际石油储运有限公司',
                    logo: require('../assets/images/warehouse-logo-1.png')
                },
                {
                    id: 1,
                    name: '恒阳石化物流有限公司',
                    logo: require('../assets/images/warehouse-logo-2.png')
                },
                {
                    id: 2,
                    name: '长江国际港务有限公司',
                    logo: require('../assets/images/warehouse-logo-3.png')
                },
                {
                    id: 3,
                    name: '江苏长江石油化工有限公司',
                    logo: require('../assets/images/warehouse-logo-4.png')
                }
            ],
            varietype: [
                {
                    id: null,
                    variety: '不限'
                },
                {
                    id: 1,
                    variety: '化工'
                },
                {
                    id: 2,
                    variety: '油品'
                },
                {
                    id: 3,
                    variety: '塑料'
                }
            ],
            dockScale: [
                {
                    id: null,
                    dockName: '不限'
                },
                {
                    id: 1,
                    dockName: '1万以下'
                },
                {
                    id: 2,
                    dockName: '1-5万'
                },
                {
                    id: 3,
                    dockName: '5-10万'
                },
                {
                    id: 4,
                    dockName: '10万以上'
                }
            ],
            outPutmode: [],
            inPutmode: [],
            areaCategoryList: [
                {
                    id: null,
                    areaCategoryName: '不限'
                },
                {
                    id: 1,
                    areaCategoryName: '东北'
                },
                {
                    id: 2,
                    areaCategoryName: '华北'
                },
                {
                    id: 3,
                    areaCategoryName: '华东'
                },
                {
                    id: 4,
                    areaCategoryName: '华南'
                },
                {
                    id: 5,
                    areaCategoryName: '华中'
                },
                {
                    id: 6,
                    areaCategoryName: '西南'
                }
            ],
            areaCategoryLists: [
                {
                    id: 1,
                    areaCategoryName: '东北'
                },
                {
                    id: 2,
                    areaCategoryName: '华北'
                },
                {
                    id: 3,
                    areaCategoryName: '华东'
                },
                {
                    id: 4,
                    areaCategoryName: '华南'
                },
                {
                    id: 5,
                    areaCategoryName: '华中'
                },
                {
                    id: 6,
                    areaCategoryName: '西南'
                }
            ],
            mapHandlers: [
                {
                    id: 0,
                    left: 425,
                    top: 160,
                    showbig: false
                },
                {
                    id: 1,
                    left: 455,
                    top: 270,
                    showbig: false
                },
                {
                    id: 2,
                    left: 360,
                    top: 310,
                    showbig: false
                },
                {
                    id: 3,
                    left: 350,
                    top: 395,
                    showbig: false
                }
            ],
            mapBig: [require('../assets/images/map-1.jpg'), require('../assets/images/map-2.jpg'), require('../assets/images/map-3.jpg'), require('../assets/images/map-4.jpg')],
            showPopMap: false,
            messageLeft: 0,
            hasNextPage: null
        };
    },
    watch: {
        selectedProduct (val) {
            // console.log(val);
            this.searchfrom.prdProductId = val.id;
        }
    },
    created () {
        if (localStorage.getItem('userInfo')) {
            this.currentPhone = JSON.parse(localStorage.getItem('userInfo')).phone;
            this.storageId = JSON.parse(localStorage.getItem('userInfo')).companyTypeId;
        }
        this.getWarehouseCompany();
        this.getWarehouseSupply();
        this.getAdvertising();
        this.getRecommendCompany();
        this.getRequisition();
        this.getOutType();
        this.getInType();
    },
    methods: {
        goIm (f, t, touserCompanyId) {
            if (localStorage.getItem('userInfo')) {
                window.open('/im/#type=2&username=' + window.btoa(f) + '&touser=' + window.btoa(t) + '&touserCompanyId=' + window.btoa(touserCompanyId), '_blank');
            } else {
                window.open(`/my/#/login`);
            }
        },
        // 仓储出库类型
        getOutType () {
            let that = this;
            that.$http.get(that.$api.category.warehouseOutType)
                .then(res => {
                    // console.log(res.data.data);
                    that.outPutmode = res.data.data;
                    that.outPutmode.unshift({
                        id: null,
                        warehouseDicName: '不限'
                    });
                });
        },
        // 仓储入库类型
        getInType () {
            let that = this;
            that.$http.get(that.$api.category.warehouseInType)
                .then(res => {
                    // console.log(res.data.data);
                    that.inPutmode = res.data.data;
                    that.inPutmode.unshift({
                        id: null,
                        warehouseDicName: '不限'
                    });
                });
        },
        // 广告位
        getAdvertising () {
            let that = this;
            that.$http.get(that.$api.category.advertising)
                .then(res => {
                    // console.log(res.data.data);
                    that.advertisingList = res.data.data;
                });
        },
        // 下面推荐公司
        getRecommendCompany () {
            let that = this;
            that.$http.get(that.$api.category.recommendcompany)
                .then(res => {
                    that.recommendCompany = res.data.data;
                    let itemNum = 4;
                    let num = this.recommendCompany.length % itemNum;
                    let addData = num > itemNum / 2 ? this.recommendCompany.slice(0, num + itemNum) : this.recommendCompany.slice(0, itemNum * 2);
                    if (this.recommendCompany.length > 4) {
                        this.newData = this.recommendCompany.concat(addData);
                        // console.log(this.newData);
                        this.timer = setInterval(this.scroll, 3000);
                    } else {
                        this.newData = this.recommendCompany;
                    }
                });
        },
        // 仓库供应单接口
        getWarehouseSupply () {
            let that = this;
            that.$http.post(that.$api.category.warehousesupply, that.SupplySearch)
                .then(res => {
                    // console.log(res.data.data.list);
                    that.supplyList = res.data.data.list;
                    that.supplyList.contactMobile = ''; // cut
                    that.SupplySearch.total = res.data.data.total;
                    that.supplyList.filter((item) => {
                        // console.log(item.areaCategoryId);
                        this.areaCategoryList.map((item1) => {
                            // console.log(item1);
                            if (item.areaCategoryId === item1.id) {
                                item.areaCategoryName = item1.areaCategoryName;
                            }
                        });
                    });
                });
        },
        // 获得需求单
        getRequisition () {
            var that = this;
            that.$http.post(that.$api.category.search, that.requisitionSearch)
                .then(res => {
                    if (res.data.code === 0) {
                        // console.log(res.data.data.list);
                        that.requisitionList = res.data.data.list;
                        that.requisitionSearch.total = res.data.data.total;
                    } else {
                        that.$message({
                            type: 'error',
                            message: res.data.message
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
        },
        //  仓储公司
        getWarehouseCompany () {
            let that = this;
            that.$http.post(that.$api.category.warehousecompany, that.WarehouseCompanySearch)
                .then(res => {
                    // console.log(res.data.data);
                    // for (var i = 0; i < res.data.data.list.length; i++) {
                    //     console.log(res.data.data.list[i].name);
                    //     if (res.data.data.list[i].name === '江苏海伦石化有限公司') {
                    //         res.data.data.list[i].newlink = 'https://baike.baidu.com/item/%E6%B1%9F%E8%8B%8F%E6%B5%B7%E4%BC%A6%E7%9F%B3%E5%8C%96%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/19995015?fr=aladdin';
                    //     }
                    //     if (res.data.data.list[i].name === '泉州振戎石化仓储有限公司') {
                    //         res.data.data.list[i].newlink = 'https://baike.baidu.com/item/%E6%B3%89%E5%B7%9E%E6%8C%AF%E6%88%8E%E7%9F%B3%E5%8C%96%E4%BB%93%E5%82%A8%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/20527607?fr=aladdin';
                    //     }
                    //     if (res.data.data.list[i].name === '欧德油储（南京）责任有限公司') {
                    //         res.data.data.list[i].newlink = 'https://baike.baidu.com/item/%E6%AC%A7%E5%BE%B7%E6%B2%B9%E5%82%A8%EF%BC%88%E5%8D%97%E4%BA%AC%EF%BC%89%E6%9C%89%E9%99%90%E8%B4%A3%E4%BB%BB%E5%85%AC%E5%8F%B8/15083005';
                    //     }
                    //     if (res.data.data.list[i].name === '上海亿升仓储有限公司') {
                    //         res.data.data.list[i].newlink = ' http://www.lbcsh.cn/web/index.asp';
                    //     }
                    // }
                    console.log(res.data.data.list);
                    that.warehouseCompanyList = res.data.data.list;
                    this.hasNextPage = res.data.data.hasNextPage;
                    that.warehouseCompanyList.filter((item) => {
                        // console.log(item.areaCategoryId);
                        this.areaCategoryList.map((item1) => {
                            // console.log(item1);
                            if (item.areaCategoryId === item1.id) {
                                item.areaCategoryName = item1.areaCategoryName;
                            }
                        });
                    });
                });
        },
        // 仓储区域
        getDistrictList (item) {
            // console.log(item.areaCategoryName);
            this.WarehouseCompanySearch.data.areaCategoryId = item.id;
            this.districtindex = item.areaCategoryName;
            this.Havenindex = '不限';
            let that = this;
            if (item.id !== null) {
                that.$http.post(that.$api.category.areaCategory + item.id)
                    .then(res => {
                        // console.log(res.data.data);
                        that.havenList = res.data.data;
                        that.havenList.unshift({
                            id: null,
                            harbourName: '不限'
                        });
                    });
            } else {
                that.WarehouseCompanySearch.data.harbourId = null;
                that.Havenindex = '';
            }
            that.getWarehouseCompany();
        },
        // 价格
        change () {
            if (this.ismianmin) {
                this.intentPrice = '';
            }
        },
        // 添加仓储需求提交
        requisitonSubmit () {
            if (!this.check()) {
                return;
            }
            if (this.ismianmin !== true) {
                this.searchfrom.price = 0;
            } else {
                this.searchfrom.price = this.intentPrice;
            }
            if (this.searchfrom.areaCategory) {
                // console.log(this.searchfrom.areaCategory);
                this.searchfrom.areaCategoryId = this.searchfrom.areaCategory;
                this.areaCategoryLists.map((item1) => {
                    // console.log(item1);
                    if (this.searchfrom.areaCategory === item1.id) {
                        this.searchfrom.areaCategoryName = item1.areaCategoryName;
                    }
                });
                // this.searchfrom.areaCategoryName = this.searchfrom.areaCategory;
            }
            // console.log(this.searchfrom);
            // let userInfo = JSON.parse(window.localStorage.getItem('userInfo') || null);
            // this.searchfrom.consignorName = userInfo.companyName;
            this.$http.post(this.$api.category.offers, this.searchfrom)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        });
                        this.getRequisition();
                        this.searchfrom = {};
                        this.addRequisition = false;
                        this.intentPrice = '';
                        this.ismianmin = true;
                        // this.$router.push({name: 'requisition'});
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
        // 港口地区
        getHavenList (item) {
            // console.log(item);
            this.WarehouseCompanySearch.data.harbourId = item.id;
            this.Havenindex = item.harbourName;
            this.getWarehouseCompany();
        },
        // 码头
        getdockList (item) {
            // console.log(item);
            this.dockScaleindex = item.dockName;
            if (item.dockName === '不限') {
                this.WarehouseCompanySearch.data.minTonnage = null;
                this.WarehouseCompanySearch.data.maxTonnage = null;
            }
            if (item.dockName === '1万以下') {
                this.WarehouseCompanySearch.data.minTonnage = '0';
                this.WarehouseCompanySearch.data.maxTonnage = '1';
            }
            if (item.dockName === '1-5万') {
                this.WarehouseCompanySearch.data.minTonnage = '1';
                this.WarehouseCompanySearch.data.maxTonnage = '5';
            }
            if (item.dockName === '5-10万') {
                this.WarehouseCompanySearch.data.minTonnage = '5';
                this.WarehouseCompanySearch.data.maxTonnage = '10';
            }
            if (item.dockName === '10万以上') {
                this.WarehouseCompanySearch.data.minTonnage = '10';
                this.WarehouseCompanySearch.data.maxTonnage = '';
            }
            this.getWarehouseCompany();
        },
        dengluShow () {
            if (!localStorage.getItem('userInfo')) {
                window.open(`/my/#/login`);
            } else {
                this.addRequisition = true;
            }
        },
        // 出库
        getoutPutmodeList (item) {
            this.outPutmodeindex = item.warehouseDicName;
            this.WarehouseCompanySearch.data.storageOutType = item.id;
            this.getWarehouseCompany();
        },
        // 入库
        getinPutmodeList (item) {
            this.inPutmodeindex = item.warehouseDicName;
            this.WarehouseCompanySearch.data.storageInType = item.id;
            this.getWarehouseCompany();
        },
        // 品种类型
        getvarietypeList (item) {
            // console.log(item);
            this.WarehouseCompanySearch.data.topCatalogueIds = item.id;
            this.varietypeindex = item.variety;
            this.getWarehouseCompany();
        },
        // 查看更多
        getWarehouseNext () {
            this.WarehouseCompanySearch.pageSize += 4;
            this.getWarehouseCompany();
        },
        changeSelect (pageNo) {
            console.log(pageNo);
        },
        sizeChange (val) {
            console.log(val);
        },
        // 验证
        check () {
            if (!this.searchfrom.prdProductId) {
                this.$message.error('请输入品名');
                return false;
            } else if (!this.searchfrom.quantity) {
                this.$message.error('请输入数量');
                return false;
            } else if (!this.searchfrom.expectEntryDate) {
                this.$message.error('请选择计划入库日期');
                return false;
            } else if (!this.searchfrom.areaCategory) {
                this.$message.error('请选择仓储区域');
                return false;
            } else if (this.ismianmin === true && !this.intentPrice) {
                console.log(this.ismianmin);
                this.$message.error('请输入仓储单价');
                return false;
            }
            return true;
        },
        handelShowPopMap (idx) {
            this.showPopMap = true;
            this.mapHandlers.map((item, index) => {
                (index === idx) && (item.showbig = true);
            });
        },
        closePopMap () {
            this.showPopMap = false;
            this.mapHandlers.map(item => {
                item.showbig = false;
            });
        }
    }
};
</script>
<style scoped>
  .newlink{
    display: block!important;
  }
  .newlink:hover{
    color: #333!important;
  }
  .company-cursor:hover{
    cursor: pointer;
  }
</style>
