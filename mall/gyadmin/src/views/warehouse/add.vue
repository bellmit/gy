<template>
    <div class="add my-warehouse">
        <el-tabs v-model="activeName2" type="card">
            <el-tab-pane label="基础信息" name="first">
                <div class="panel">
                <div class="gy-form-group cl">
                    <span class="l"><strong>*</strong>企业名称</span>
                    <span><input type="text" class="gy-input" v-model="para.name" :disabled="id" ></span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>区域分类</span>
                    <span>
                        <el-select v-model="para.areaCategoryId" placeholder="请选择">
                            <el-option
                              v-for="item in areaOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>省</span>
                    <span>
                      <el-select v-model="provinceName" placeholder="选择省" @change="handleProvince">
                                    <el-option
                                      v-for="item in Province"
                                      :key="item.id"
                                      :label="item.name"
                                      :value="item.id">
                                    </el-option>
                    </el-select>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>市</span>
                    <span>
                        <el-select v-model="cityName" placeholder="选择市" @change="handleDelivery">
                                    <el-option
                                      v-for="item in deliveryCity"
                                      :key="item.id"
                                      :label="item.name"
                                      :value="item.id">
                                    </el-option>
                        </el-select>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>详细地址</span>
                    <span><input type="text" class="gy-input" v-model="para.address"></span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>企业性质</span>
                    <span>
                         <el-select v-model="para.companyNatureIds" multiple  placeholder="请选择">
                            <el-option
                              v-for="item in companyNatureOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                    </span>
                </div>
                <div class="gy-form-group cl">
                    <span class="l"><strong>*</strong>联系人(职位)</span>
                    <span><input type="text" class="gy-input" v-model="para.contactPerson"></span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>联系手机号</span>
                    <span><input type="text" maxlength="11" lass="gy-input" v-model="para.contactMobile"></span>
                </div>
                <div class="gy-form-group">
                    <span class="l">法人代表</span>
                    <span><input type="text" class="gy-input" v-model="para.legalPerson"></span>
                </div>
                <div class="gy-form-group">
                    <span class="l">注册资本</span>
                    <div>
                        <input type="text" class="gy-input row_half3" v-model="para.registeredCapital">万
                        <el-select v-model="para.currencyId" class="row_half4" placeholder="请选择">
                            <el-option
                              v-for="item in currencies"
                              :key="item.id"
                              :label="item.currencyCode"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">成立日期</span>
                    <span>
                        <el-date-picker
                              v-model="para.establishDate"
                              type="date"
                              placeholder="选择日期">
                         </el-date-picker>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>仓储类型</span>
                    <span>
                        <el-radio-group v-model="para.warehouseType" @change="types">
                          <el-radio :label=1>固体仓储</el-radio>
                          <el-radio :label=2>液体仓储</el-radio>
                        </el-radio-group>
                    </span>
                </div>
                <div class="gy-form-group cl">
                    <span class="l">仓库结构</span>
                    <span>
                      <el-select v-model="para.depotStructures" multiple placeholder="请选择">
                            <el-option
                              v-for="item in depotStructuresOptions"
                              :key="item.id"
                              :label="item.warehouseDicName"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </span>
                </div>
                    <div class="gy-form-group">
                    <span class="l">仓库类型</span>
                    <span>
                        <el-select v-model="para.depotTypes"  multiple placeholder="请选择">
                            <el-option
                              v-for="item in depotTypesOptions"
                              :key="item.id"
                              :label="item.warehouseDicName"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </span>
                    </div>
                    <div v-if="para.warehouseType===2">
                <div class="gy-form-group">
                    <span class="l"><strong>*</strong>港口类型</span>
                    <span>
                        <el-radio-group v-model="para.portType">
                          <el-radio :label=1>海港</el-radio>
                          <el-radio :label="2">江港</el-radio>
                        </el-radio-group>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">总罐容</span>
                    <span><input type="text" class="gy-input wid-half" v-model="para.totalTankCapacity">万m³</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">单个罐容</span>
                    <span><input type="text" class="gy-input wid-half" v-model="para.singleTankCapacity">千m³</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">储罐数量</span>
                    <span><input type="text" class="gy-input wid-half" v-model="para.tankQuantity">个</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">材质</span>
                    <span>
                        <el-checkbox-group v-model="para.materials">
                          <el-checkbox :label="1" name="type">CS</el-checkbox>
                          <el-checkbox :label="2" name="type">SS</el-checkbox>
                        </el-checkbox-group>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">保税</span>
                    <span>
                        <el-radio-group v-model="para.taxProtect">
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </span>
                </div>
                <div class="gy-form-group cl">
                    <span class="l">CDI-T</span>
                    <span>
                        <el-radio-group v-model="para.cdi_t">
                          <el-radio :label="1">有</el-radio>
                          <el-radio :label="0">无</el-radio>
                        </el-radio-group>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">自有码头</span>
                    <span>
                        <el-radio-group v-model="para.ownerWharf">
                          <el-radio :label="1">有</el-radio>
                          <el-radio :label="0">无</el-radio>
                        </el-radio-group>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">最大吨级</span>
                    <span><input type="text" class="gy-input wid-half" v-model="para.maxTonnage">万吨</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">港口水深</span>
                    <span><input type="text" class="gy-input wid-half" v-model="para.portDepth">m</span>
                </div>
                </div>
                <div class="gy-form-group">
                    <span class="l">交割库</span>
                    <span>
                        <el-radio-group v-model="para.deliveryDepot">
                          <el-radio :label=1>是</el-radio>
                          <el-radio :label=0>否</el-radio>
                        </el-radio-group>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">交割品种</span>
                    <span>
                      <el-select v-model="para.deliveryProductIdsList" filterable multiple placeholder="请选择或输入文字搜索">
                        <el-option
                          v-for="item in deliveryProductOptions"
                          :key="item.goodsCode"
                          :label="item.goodsName"
                          :value="item.goodsCode">
                        </el-option>
                      </el-select>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">协议签订情况</span>
                    <span>
                         <el-radio-group v-model="para.isProtocol">
                          <el-radio :label="1">已签</el-radio>
                          <el-radio :label="0">未签</el-radio>
                        </el-radio-group>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">签约时间</span>
                    <span>
                        <el-date-picker
                          v-model="para.protocolDate"
                          type="date"
                          placeholder="选择日期">
                         </el-date-picker>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">尽调负责人</span>
                    <span><input type="text" class="gy-input" v-model="para.surveyPrincipal" placeholder="多个用逗号分隔"></span>
                </div>
                <div class="gy-form-group">
                    <span class="l">现场尽调</span>
                    <span>
                        <el-radio-group v-model="para.siteSurvey">
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </span>
                </div>
                <div class="gy-form-group cl">
                    <span class="l">风控审批阶段</span>
                    <span>
                        <el-radio-group v-model="para.approvalStatus">
                          <el-radio :label="1">已初审</el-radio>
                          <el-radio :label="2">已终审</el-radio>
                        </el-radio-group>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">业务开展情况</span>
                    <span>
                        <el-radio-group v-model="para.businessDevelopment">
                          <el-radio :label="1">已</el-radio>
                          <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">信用评级</span>
                    <span>
                        <el-select v-model="para.creditRating"  placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">证照收集情况</span>
                    <span><input type="text" class="gy-input" v-model="para.licenseCollection"></span>
                </div>
                <div class="gy-form-group">
                    <span class="l">库区面积</span>
                    <span><input type="text" class="gy-input wid-half" v-model="para.depotAcreage">万m²</span>
                </div>
                <div class="gy-form-group">
                    <span class="l">主营产品</span>
                        <el-select v-model="para.productIdsList" multiple filterable placeholder="请选择或输入文字搜索">
                          <el-option
                            v-for="item in productIdsOptions"
                            :key="item.goodsCode"
                            :label="item.goodsName"
                            :value="item.goodsCode">
                          </el-option>
                        </el-select>
                </div>
                <div class="gy-form-group cl">
                    <span class="l">经营范围</span>
                    <span>
                        <textarea class="gy-textarea" placeholder="请填写" v-model="para.businessScope"></textarea>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">配套设施</span>
                    <span>
                        <textarea class="gy-textarea" placeholder="请填写" v-model="para.equipment"></textarea>
                    </span>
                </div>
                <div class="gy-form-group">
                    <span class="l">备注</span>
                    <span>
                        <textarea class="gy-textarea" placeholder="请填写" v-model="para.remark"></textarea>
                    </span>
                </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="附件信息" name="second">
                <div class="panel">
                    <div class="gy-form-group single-row">
                        <span class="l">营业执照<br><span  @click="showImg(0)">查看示例</span></span>
                        <span>
                            <div class="upload-box" >
                                <!--<div class="img-box" v-for="(item,index) in imgList1" v-if="imgList1.length" :key="index"  :on-remove="BannerRemove">-->
                                    <!--<img v-if="item.url.indexOf('.pdf')=== -1" :src="pdfThumbnail" alt="" >-->
                                    <!--<img :src="item.url" alt="" v-else>-->
                                <!--</div>-->
                          <el-upload
                              :limit="6"
                              ref="clearUpload1"
                              action="api"
                              accept=".jpg,.png,.jpeg,.pdf"
                              :data="{type: 0}"
                              list-type="picture-card"
                              :on-remove="BannerRemove"
                              :http-request="uploadImg"
                              :file-list="imgList1"
                              :on-preview="handlePictureCardPreview">
                              <i class="el-icon-plus"></i>
                        </el-upload>
                            </div>
                        </span>
                    </div>
                    <div class="gy-form-group single-row">
                        <span class="l"></span>
                        <span>统一社会信用代码 <input type="text" class="gy-input row_half1" v-model="para.socialCode"></span>
                    </div>
                    <div class="gy-form-group single-row">
                        <span class="l">码头危险品经营许可证<span  @click="showImg(1)">查看示例</span></span>
                        <span>
                            <el-upload
                              :limit="6"
                              accept=".jpg,.png,.jpeg,.pdf"
                              ref="clearUpload2"
                              action="api"
                              :data="{type: 11}"
                              list-type="picture-card"
                              :on-remove="BannerRemove"
                              :http-request="uploadImg"
                              :on-preview="handlePictureCardPreview"
                              :file-list="imgList2" v-if="imgList2">
                                 <i class="el-icon-plus"></i>
                              </el-upload>
                        </span>
                    </div>
                    <div class="gy-form-group single-row">
                    <span class="l">仓储危险品经营许可证<span  @click="showImg(2)">查看示例</span></span>
                    <span>
                            <el-upload
                              :limit="6"
                              accept=".jpg,.png,.jpeg,.pdf"
                              ref="clearUpload3"
                              action="api"
                              :data="{type: 10}"
                              list-type="picture-card"
                              :on-remove="BannerRemove"
                              :http-request="uploadImg"
                              :on-preview="handlePictureCardPreview"
                              :file-list="imgList3">
                                  <i class="el-icon-plus"></i>
                              </el-upload>
                        </span>
                    </div>
                    <div class="gy-form-group single-row">
                        <span class="l">运输危险品经营许可证<span @click="showImg(4)">查看示例</span></span>
                        <span>
                            <el-upload
                              :limit="6"
                              accept=".jpg,.png,.jpeg,.pdf"
                              ref="clearUpload4"
                              action="api"
                              :data="{type: 12}"
                              list-type="picture-card"
                              :on-remove="BannerRemove"
                              :http-request="uploadImg"
                              :on-preview="handlePictureCardPreview"
                              :file-list="imgList4">
                                  <i class="el-icon-plus"></i>
                              </el-upload>
                        </span>
                    </div>
                    <div class="gy-form-group single-row">
                        <span class="l">消防验收证明</span>
                        <span>
                            <el-upload
                              :limit="6"
                              ref="clearUpload5"
                              accept=".jpg,.png,.jpeg,.pdf"
                              action="api"
                              :data="{type: 13}"
                              list-type="picture-card"
                              :on-remove="BannerRemove"
                              :on-preview="handlePictureCardPreview"
                              :http-request="uploadImg"
                              :file-list="imgList5">
                                  <i class="el-icon-plus"></i>
                              </el-upload>
                        </span>
                    </div>
                    <div class="gy-form-group single-row">
                        <span class="l">环评、安评文件</span>
                        <span>
                            <el-upload
                              :limit="6"
                              accept=".jpg,.png,.jpeg,.pdf"
                              ref="clearUpload6"
                              action="api"
                              :data="{type: 14}"
                              list-type="picture-card"
                              :on-remove="BannerRemove"
                              :http-request="uploadImg"
                              :on-preview="handlePictureCardPreview"
                              :file-list="imgList6">
                                  <i class="el-icon-plus"></i>
                              </el-upload>
                        </span>
                    </div>
                    <div class="gy-form-group single-row">
                        <span class="l">码头经营许可证<span  @click="showImg(3)">查看示例</span></span>
                        <span>
                            <el-upload
                              :limit="6"
                              accept=".jpg,.png,.jpeg,.pdf"
                              ref="clearUpload7"
                              action="api"
                              :data="{type: 15}"
                              list-type="picture-card"
                              :on-remove="BannerRemove"
                              :http-request="uploadImg"
                              :on-preview="handlePictureCardPreview"
                              :file-list="imgList7">
                                  <i class="el-icon-plus"></i>
                              </el-upload>
                        </span>
                    </div>
                    <div class="gy-form-group single-row">
                        <span class="l">法人身份证复印件</span>
                        <span>
                            <el-upload
                              :limit="6"
                              accept=".jpg,.png,.jpeg,.pdf"
                              ref="clearUpload8"
                              action="api"
                              :data="{type: 5}"
                              list-type="picture-card"
                              :on-remove="BannerRemove"
                              :on-preview="handlePictureCardPreview"
                              :http-request="uploadImg"
                              :file-list="imgList8">
                                  <i class="el-icon-plus"></i>
                              </el-upload>
                        </span>
                    </div>
                    <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
                        <div  v-if="dialogImageUrl1.name">
                            <img width="100%" :src="dialogImageUrl1.url" v-if="dialogImageUrl1.name.indexOf('pdf')=== -1" >
                            <a :href="dialogImageUrl1.url" target="_blank" v-else>
                                <img :src="pdfThumbnail" alt="">点击打开pdf文件
                            </a>
                        </div>
                        <div v-else-if="dialogImageUrl1.url">
                        <img width="100%" :src="dialogImageUrl1.url" v-if="dialogImageUrl1.url.indexOf('pdf')=== -1" >
                            <a :href="dialogImageUrl1.url" target="_blank" v-else>
                                <img :src="pdfThumbnail" alt="">点击打开pdf文件
                            </a>
                        </div>
                    </el-dialog>
                    <!-- 公用展示框 -->
                    <el-dialog :visible.sync="dialogVisible1" :modal-append-to-body="false">
                        <img width="100%" :src="dialogImageUrl">
                    </el-dialog>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="gy-form-button" style="width:80%">
            <button class="gy-button-extra fr" @click.prevent="submit()">提交</button>
            <button style="display: none">111</button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            pdfThumbnail: require('../../assets/images/pdf.png'),
            activeName2: 'first',
            value: '',
            value1: '',
            type: 1,
            n: 10,
            list: [],
            provinceName: '',
            cityName: '',
            options4: [],
            dialogVisible1: false,
            areaOptions: [{ // 区域分类
                value: 1,
                label: '东北'
            }, {
                value: 2,
                label: '华北'
            }, {
                value: 3,
                label: '华东'
            }, {
                value: 4,
                label: '华南'
            }, {
                value: 5,
                label: '华中'
            }, {
                value: 6,
                label: '西南'
            }],
            companyNatureOptions: [{ // 企业性质
                value: '1',
                label: '国企'
            }, {
                value: '2',
                label: '央企'
            }, {
                value: '3',
                label: '上市'
            }, {
                value: '4',
                label: '民营'
            }, {
                value: '5',
                label: '外资'
            }, {
                value: '6',
                label: '合资'
            }],
            options: [{
                value: 'A',
                label: 'A'
            }, {
                value: 'B',
                label: 'B'
            }, {
                value: 'C',
                label: 'C'
            }, {
                value: 'D',
                label: 'D'
            }],
            imgList1: [],
            imgList2: [],
            imgList3: [],
            imgList4: [],
            imgList5: [],
            imgList6: [],
            imgList7: [],
            imgList8: [],
            Province: [], // 存省
            deliveryCity: [], // 存市
            // companyProfileImgDtoList: [],
            companyImgUploaded: [],
            currencies: [], // 存币种
            productIdsOptions: [], // 存产品
            deliveryProductOptions: [],
            typeOptions: [],
            depotTypesOptions: [],
            depotStructuresOptions: [],
            id: null,
            para: {
                socialCode: '',
                deliveryProductIdsList: [],
                productIdsList: [],
                areaCategoryId: 1,
                address: '',
                companyNatureIds: [],
                name: '',
                legalPerson: '',
                contactPerson: '',
                contactMobile: null,
                registeredCapital: null,
                currencyId: null,
                establishDate: '',
                warehouseType: 1,
                deliveryDepot: 0,
                portType: 1,
                totalTankCapacity: null,
                singleTankCapacity: '',
                tankQuantity: '',
                materials: [1],
                depotStructures: [],
                depotTypes: [],
                taxProtect: 0,
                cdi_t: 0,
                ownerWharf: 0,
                maxTonnage: null,
                portDepth: null,
                surveyPrincipal: '',
                isProtocol: 0,
                protocolDate: '',
                siteSurvey: 0,
                approvalStatus: 1,
                businessDevelopment: 0,
                creditRating: 'A',
                licenseCollection: '',
                depotAcreage: null,
                businessScope: null,
                equipment: '',
                remark: '',
                cityId: null,
                provinceId: 130300,
                companyFileList: []
            },
            typeId: null,
            dialogVisible: false,
            dialogImageUrl: '',
            dialogImageUrl1: {
                name: '',
                url: ''
            },
            imgSrc: [{
                src: require('../../assets/images/card1.jpg')
            }, {
                src: require('../../assets/images/card2.jpg')
            }, {
                src: require('../../assets/images/card3.jpg')
            }, {
                src: require('../../assets/images/card4.jpg')
            }, {
                src: require('../../assets/images/card5.jpeg')
            }
            ]
        };
    },
    mounted () {
    },
    created () {
        this.init();
        // 这是一条测试信息
    },
    methods: {
        init () {
            this.id = this.$route.query.id;
            this.typeId = this.$route.query.typeId;
            this.id && this.getInfo(); // 基;
            this.address(0, 'province'); // 获取省市区
            this.getcurrencies(); // 调币种
            this.types('is'); // 仓库类型
            this.product(); // 调产品
        },
        remoteMethod (query) {
            if (query !== '') {
                setTimeout(() => {
                    this.options4 = this.list.filter(item => {
                        return item.label.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.options4 = [];
            }
        },
        showImg (m) {
            this.dialogImageUrl = this.imgSrc[m].src;
            this.dialogVisible1 = true;
        },
        getInfo () {
            let that = this;
            this.$http.get(this.$api.warehouse.info + this.id).then(function (res) {
                if (res.data.code === 0) {
                    that.para = res.data.data;
                    that.provinceName = res.data.data.provinceStr;
                    that.cityName = res.data.data.cityStr;
                    that.para.materials = res.data.data.materials.map(Number);
                    that.para.depotTypes = res.data.data.depotTypes.map(Number);
                    that.para.depotStructures = res.data.data.depotStructures.map(Number);
                    // that.para.deliveryProductIdsList = res.data.data.deliveryProductIdsList.map(Number);
                    if (that.para.warehouseType === 2) {
                        that.types();
                    }
                    if (that.para.establishDate === null) {
                        that.para.establishDate = '';
                    }
                    if (that.para.protocolDate === null) {
                        that.para.protocolDate = '';
                    }
                    if (that.para.companyFileMap && that.para.companyFileList) {
                        if (that.para.companyFileMap[0]) {
                            that.getBasePush(that.para.companyFileMap[0], that.imgList1, 0);
                        }
                        if (that.para.companyFileMap[11]) {
                            that.getBasePush(that.para.companyFileMap[11], that.imgList2, 11);
                        }
                        if (that.para.companyFileMap[10]) {
                            that.getBasePush(that.para.companyFileMap[10], that.imgList3, 10);
                        }
                        if (that.para.companyFileMap[12]) {
                            that.getBasePush(that.para.companyFileMap[12], that.imgList4, 12);
                        }
                        if (that.para.companyFileMap[13]) {
                            that.getBasePush(that.para.companyFileMap[13], that.imgList5, 13);
                        }
                        if (that.para.companyFileMap[14]) {
                            that.getBasePush(that.para.companyFileMap[14], that.imgList6, 14);
                        }
                        if (that.para.companyFileMap[15]) {
                            that.getBasePush(that.para.companyFileMap[15], that.imgList7, 15);
                        }
                        if (that.para.companyFileMap[5]) {
                            that.getBasePush(that.para.companyFileMap[5], that.imgList8, 5);
                        }
                    }
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        types (n) { // 产品
            let that = this;
            if (n) {
                that.para.depotStructures = [];
                that.para.depotTypes = [];
            }
            that.depotStructuresOptions = [];
            that.depotTypesOptions = [];
            this.$http.get(this.$api.warehouse.type).then(function (res) {
                if (res.data.code === 0) {
                    if (that.para.warehouseType === 1) {
                        that.depotStructuresOptions = res.data.data[0].depotStructureList;
                        that.depotTypesOptions = res.data.data[0].depotTypeList;
                    } else if (that.para.warehouseType === 2) {
                        that.depotStructuresOptions = res.data.data[1].depotStructureList;
                        that.depotTypesOptions = res.data.data[1].depotTypeList;
                    }
                } else {
                    that.$message(res.data.message);
                }
            });
        },
        product () { // 产品
            let that = this;
            this.$http.get(this.$api.warehouse.goods).then(function (res) {
                if (res.data.code === 0) {
                    that.productIdsOptions = res.data.data;
                    that.deliveryProductOptions = res.data.data;
                    that.deliveryProductOptions.forEach((obj) => {
                        that.list.push({value: obj.goodsCode, label: obj.goodsName});
                    });
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        getcurrencies () { // 币种
            let that = this;
            this.$http.get(this.$api.warehouse.currencies).then(function (res) {
                if (res.data.code === 0) {
                    that.currencies = res.data.data;
                    if (that.para.currencyId === null) {
                        that.para.currencyId = res.data.data[0].id;
                    }
                } else {
                    this.$message(res.data.message);
                }
            });
        },
        address (id, type) { // 获取地址
            let that = this;
            that.$http.get(that.$api.warehouse.address + id).then(function (res) {
                if (type === 'province') {
                    that.Province = res.data.data;
                } else if (type === 'city') {
                    that.deliveryCity = res.data.data;
                    that.cityName = that.deliveryCity[0].name;
                    that.para.cityId = that.deliveryCity[0].id;
                    // that.address(that.deliveryCity[0].id, 'district');
                }
            });
        },
        handleProvince (item) { // 省改变
            this.address(item, 'city');
            this.para.provinceId = item;
        },
        handleDelivery (item) { // 市改变
            this.address(item, 'district');
            this.para.cityId = item;
        },
        submit () {
            this.para.establishDate = new Date(this.para.establishDate).getTime();
            this.para.protocolDate = new Date(this.para.protocolDate).getTime();
            if (!this.para.areaCategoryId) {
                this.$message.error('请选择区域分类');
                return false;
            }
            if (!this.para.provinceId) {
                this.$message.error('请选择省');
                return false;
            }
            if (!this.para.cityId) {
                this.$message.error('请选择市');
                return false;
            }
            if (!this.para.address) {
                this.$message.error('请输入地址');
                return false;
            }
            if (!this.para.name) {
                this.$message.error('请输入企业名称');
                return false;
            }
            if (this.para.companyNatureIds.length === 0) {
                this.$message.error('企业性质');
                return false;
            }
            if (!(/^(0|86|17951)?(13[0-9]|15[0-9]|166|17[3678]|18[0-9]|19[0-9]|14[57])[0-9]{8}$/.test(this.para.contactMobile))) {
                this.$message.error('请输入正确格式的联系手机号');
                return false;
            }
            if (this.para.contactPerson === null) {
                this.$message.error('请输联系人');
                return false;
            }
            if (!this.para.warehouseType) {
                this.$message.error('请选择仓储类型');
                return false;
            }
            if (!this.para.warehouseType === 2) {
                if (!this.para.materials.length) {
                    this.$message.error('请选择港口类型');
                    return false;
                }
            }
            if (this.typeId) {
                this.$http.put(this.$api.warehouse.change, this.para).then((res) => {
                    if (res.data.code === 0) {
                        this.$message.success('操作成功');
                        this.$router.push({name: 'warehouseView'});
                    }
                });
            } else if (this.id) {
                this.$http.put(this.$api.warehouse.create, this.para).then((res) => {
                    if (res.data.code === 0) {
                        // this.info.contractCode = res.data.data;
                        this.$message.success(res.data.message);
                        this.$router.push({name: 'warehouseView'});
                    }
                });
            } else {
                this.$http.post(this.$api.warehouse.create, this.para).then((res) => {
                    if (res.data.code === 0) {
                        // this.info.contractCode = res.data.data;
                        this.$router.push({name: 'warehouseView'});
                    }
                });
            }
        },
        handlePictureCardPreview (file) {
            // 点击文件列表中已上传的文件时的钩子
            if (file.filePath.slice(file.filePath.lastIndexOf('.') + 1).toLowerCase() !== 'pdf') {
                this.dialogVisible = true;
                // 存入公用展示框
                this.dialogImageUrl1 = file;
            } else {
                window.open(file.filePath, '_blank');
            }
        },
        uploadImg (file) {
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            this.$http.post(this.$api.warehouse.file, formData, headers)
                .then((res) => {
                    if (res.data) {
                        // 当前file-list显示
                        // 0 营业执照
                        if (file.data.type === 0) {
                            this.basePush(this.imgList1, file, res);
                        }
                        // 11 码头危险品经营许可证
                        if (file.data.type === 11) {
                            this.basePush(this.imgList2, file, res);
                        }
                        // 10 仓储危险品经营许可证
                        if (file.data.type === 10) {
                            this.basePush(this.imgList3, file, res);
                        }
                        // 12 运输危险品经营许可证
                        if (file.data.type === 12) {
                            this.basePush(this.imgList4, file, res);
                        }
                        // 13 消防验收证明
                        if (file.data.type === 13) {
                            this.basePush(this.imgList5, file, res);
                        }
                        // 14 环评、安评文件
                        if (file.data.type === 14) {
                            this.basePush(this.imgList6, file, res);
                        }
                        // 15 码头经营许可证
                        if (file.data.type === 15) {
                            this.basePush(this.imgList7, file, res);
                        }
                        // 5 法人身份证复印件
                        if (file.data.type === 5) {
                            this.basePush(this.imgList8, file, res);
                        }
                        // 存到提交数组
                        this.para.companyFileList.push({
                            filePath: res.data,
                            fileType: file.data.type
                        });
                    }
                });
        },
        // 获取的文件或粘片按需分配
        getBasePush (data, list, type) {
            data.forEach((item, index) => {
                let path;
                path = (item.filePath.slice(item.filePath.lastIndexOf('.') + 1).toLowerCase() !== 'pdf') ? item.filePath : this.pdfThumbnail;
                item.url = path;
                list.push(item);
                this.para.companyFileList.push({filePath: item.filePath, fileType: type});
            });
        },
        // 上传的文件或照片按需分配
        basePush (list, file, res) {
            let path;
            path = (res.data.slice(res.data.lastIndexOf('.') + 1).toLowerCase() !== 'pdf') ? res.data : this.pdfThumbnail;
            list.push({
                fileType: file.data && file.data.type,
                filePath: res.data,
                url: path
            });
        },
        /**
       * @return {boolean}
       */
        BannerRemove (file) {
            let arr = this.para.companyFileList;
            if (file.fileType === 0) {
                this.baseDele(this.imgList1, file);
            }
            if (file.fileType === 11) {
                this.baseDele(this.imgList2, file);
            }
            if (file.fileType === 10) {
                this.baseDele(this.imgList3, file);
            }
            if (file.fileType === 12) {
                this.baseDele(this.imgList4, file);
            }
            if (file.fileType === 13) {
                this.baseDele(this.imgList5, file);
            }
            if (file.fileType === 14) {
                this.baseDele(this.imgList6, file);
            }
            if (file.fileType === 15) {
                this.baseDele(this.imgList7, file);
            }
            if (file.fileType === 5) {
                this.baseDele(this.imgList8, file);
            }
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].filePath === file.filePath) {
                    this.para.companyFileList.splice(i, 1);
                    return false;
                }
            }
        },
        baseDele (arr, file) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].filePath === file.filePath) {
                    arr.splice(i, 1);
                    return false;
                }
            }
        }
    }
};
</script>
<style scoped lang="scss">
  .items {
     display: flex;
     .a {
        flex: 1;
     }
     .s {
        flex: 0 0 33px;
       text-align: center;
     }
     .d {
        flex: 0 0 80px;
     }
  }

  .add {
    padding: 20px;
    height: 100%;
  }

  .el-tabs__item {
    height: 36px;
    line-height: 30px;
  }

  .row_half1 {
    width: 45%;
  }

  .panel {
    padding: 0 14px;
  }

  .img-box {
    width: 60px;
    height: 60px;
    display: inline-block;
    float: left;
    margin-right: 10px;
    border: 1px solid $color-border;
    img {
      width: 100%;
      height: 100%
    }
  }

  .l span {
    display: block;
    color: #4A90E2;
    font-size: 10px;
    text-decoration: underline;
  }

  .container-fluid .el-select {
    height: auto;
  }

  .gy-form-group {
    padding-left: 102px;
    .l {
      width: 92px;
      padding-left: 8px;
    }
  }

  /*.gy-form-group:nth-child(odd) {*/
    /*padding-right: 30px;*/
  /*}*/

  /*.gy-form-group:nth-child(even) {*/
    /*padding-left: 132px;*/
    /*.l {*/
      /*width: 122px;*/
      /*padding-left: 30px;*/
      /*strong {*/
         /*left: 22px;*/
      /*}*/
    /*}*/
  /*}*/

  .fjxx {
    .gy-form-group {
      padding-left: 124px;
      .l {
        width: 114px;
        padding-left: 0;
      }
    }

    .gy-form-group:nth-child(odd) {
      padding-right: 0;
    }

    .gy-form-group:nth-child(even) {
      .l {
        padding-left: 0;
      }
    }
  }

  .gy-form-button {
     padding: 10px 0 30px 0;
  }
</style>
