<template>
  <div class="add">
    <el-tabs v-model="activeName2" type="card">
      <el-tab-pane label="基础信息" name="first">
        <div class="panel">
          <div class="gy-form-group">
            <span class="l"><strong>*</strong>企业名称</span>
            {{para.name}}
          </div>
          <div class="gy-form-group">
            <span class="l"><strong>*</strong>区域分类</span>
            {{areaOptions[para.areaCategoryId]}}
          </div>
          <div class="gy-form-group">
            <span class="l"><strong>*</strong>省</span>
            {{para.provinceStr}}
          </div>
          <div class="gy-form-group">
            <span class="l"><strong>*</strong>市</span>
            {{para.cityStr}}
          </div>
          <div class="gy-form-group">
            <span class="l"><strong>*</strong>详细地址</span>
            {{para.address}}
          </div>
          <div class="gy-form-group">
            <span class="l"><strong>*</strong>企业性质</span>
            <span v-for="(item, index) in list" :key=index>
                                <span v-if="index  !== 0">,</span>{{item}}
                            </span>
                    </div>
                    <div class="gy-form-group cl">
                        <span class="l"><strong>*</strong>联系人(职位)</span>
                        <span>{{para.contactPerson}}</span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l"><strong>*</strong>联系手机号</span>
                        <span>{{para.contactMobile}}</span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">法人代表</span>
                        <span>{{para.legalPerson || '-'}}</span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">注册资本</span>
                        <div>
                            {{para.registeredCapital || '-' }}万{{para.currencyStr|| '-'}}
                        </div>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">成立日期</span>
                        <span>
                        {{para.establishDate|date()}}
                    </span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l"><strong>*</strong>仓储类型</span>
                        <span>
                            {{para.warehouseTypeString || '-'}}
                    </span>
                    </div>
                    <div class="gy-form-group cl">
                        <span class="l">仓库结构</span>
                        <span>{{para.depotStructureStr || '-'}}
                        </span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">仓库类型</span>
                        <span>
                            {{para.depotTypeStr|| '-'}}
                        </span>
                    </div>
                    <div v-if="para.warehouseType===2">
                        <div class="gy-form-group">
                            <span class="l"><strong>*</strong>港口类型</span>
                            <span>
                                {{portTypeOption[para.portType]}}
                    </span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">总罐容</span>
                            <span>{{para.totalTankCapacity || '-'}}万m³</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">单个罐容</span>
                            <span>{{para.singleTankCapacity || '-'}}千m³</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">储罐数量</span>
                            <span>{{para.tankQuantity || '-'}}个</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">材质</span>
                            <span>
                                {{materialsOptions[para.material] || '-'}}
                            </span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">保税</span>
                            <span>
                                {{taxProtectOptions[para.taxProtect]}}
                             </span>
                        </div>
                        <div class="gy-form-group cl">
                            <span class="l">CDI-T</span>
                            <span>
                                {{cdOptions[para.cdi_t]}}
                            </span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">自有码头</span>
                            <span>
                                {{cdOptions[para.ownerWharf]}}
                            </span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">最大吨级</span>
                            <span>{{para.maxTonnage || '-'}}万吨</span>
                        </div>
                        <div class="gy-form-group">
                            <span class="l">港口水深</span>
                            <span>{{para.portDepth || '-'}}m</span>
                        </div>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">交割库</span>
                        <span>
                            {{taxProtectOptions[para.deliveryDepot]}}
                        </span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">交割品种</span>
                        <span>
                            {{para.deliveryProductStr || '-'}}
                        </span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">协议签订情况</span>
                        <span>
                            {{isProtocolO[para.isProtocol]}}
                         </span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">签约时间</span>
                        <span>
                            {{para.protocolDate|date}}
                        </span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">尽调负责人</span>
                        <span>{{para.surveyPrincipal || '-'}}</span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">现场尽调</span>
                        <span>{{taxProtectOptions[para.siteSurvey]}}
                    </span>
                    </div>
                    <div class="gy-form-group cl">
                        <span class="l">风控审批阶段</span>
                        <span>{{approvalStatusO[para.approvalStatus]}}</span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">业务开展情况</span>
                        <span>{{businessDevelopmentO[para.businessDevelopment]}}</span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">信用评级</span>
                        <span>
                            {{para.creditRating || '-'}}
                        </span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">证照收集情况</span>
                        <span>{{para.licenseCollection || '-'}}</span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">库区面积</span>
                        <span>{{para.depotAcreage|| '-'}}万m²</span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">主营产品</span>
                        <span>
                            {{para.productStr || '-'}}
                         </span>
                    </div>
                    <div class="gy-form-group cl">
                        <span class="l">经营范围</span>
                        <span>
                          {{para.businessScope || '-'}}
                        </span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">配套设施</span>
                        <span>
                         {{para.equipment || '-'}}
                         </span>
                    </div>
                    <div class="gy-form-group">
                        <span class="l">备注</span>
                        <span>
                        {{para.remark || '-'}}
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
                                <div class="img-box" v-for="(item, index) in imgList1" :key="index">
                                     <img :src="item.url" alt="" @click="handlePictureCardPreview(item)" v-if="item.url.slice(item.url.lastIndexOf('.') + 1).toLowerCase() !== 'pdf'">
                                      <a :href="item.url" target="_blank" v-else>
                                        <img :src="pdfThumbnail" alt="">
                                    </a>
                                </div>
                            </div>
                        </span>
                    </div>
                    <div class="gy-form-group single-row">
                        <span class="l"></span>
                        <span>统一社会信用代码 {{para.socialCode}}</span>
                    </div>
                    <div class="gy-form-group single-row">
                        <span class="l">码头危险品经营许可证<span  @click="showImg(1)">查看示例</span></span>
                        <span>
                             <div class="img-box" v-for="(item, index) in imgList2" :key="index">
                                     <img :src="item.url" alt="" @click="handlePictureCardPreview(item)" v-if="item.url.slice(item.url.lastIndexOf('.') + 1).toLowerCase() !== 'pdf'">
                                        <a :href="item.url" target="_blank" v-else>
                                        <img :src="pdfThumbnail" alt="">
                                    </a>
                                </div>
                        </span>
                    </div>
                    <div class="gy-form-group single-row">
                        <span class="l">仓储危险品经营许可证<span  @click="showImg(2)">查看示例</span></span>
                        <span>
                             <div class="img-box" v-for="(item, index) in imgList3" :key="index">
                                     <img :src="item.url" alt="" @click="handlePictureCardPreview(item)" v-if="item.url.slice(item.url.lastIndexOf('.') + 1).toLowerCase() !== 'pdf'">
                                        <a :href="item.url" target="_blank" v-else>
                                        <img :src="pdfThumbnail" alt="">
                                    </a>
                                </div>
                        </span>
                    </div>
                    <div class="gy-form-group single-row">
                        <span class="l">运输危险品经营许可证<span @click="showImg(4)">查看示例</span></span>
                        <span>
                            <div class="img-box" v-for="(item, index) in imgList4" :key="index">
                                     <img :src="item.url" alt="" @click="handlePictureCardPreview(item)" v-if="item.url.slice(item.url.lastIndexOf('.') + 1).toLowerCase() !== 'pdf'">
                                      <a :href="item.url" target="_blank" v-else>
                                        <img :src="pdfThumbnail" alt="">
                                    </a>
                            </div>
                        </span>
                    </div>
                    <div class="gy-form-group single-row">
                        <span class="l">消防验收证明</span>
                        <span>
                            <div class="img-box" v-for="(item, index) in imgList5" :key="index">
                                     <img :src="item.url" alt="" @click="handlePictureCardPreview(item)" v-if="item.url.slice(item.url.lastIndexOf('.') + 1).toLowerCase() !== 'pdf'">
                                        <a :href="item.url" target="_blank" v-else>
                                        <img :src="pdfThumbnail" alt="">
                                    </a>
                            </div>
                        </span>
                    </div>
                    <div class="gy-form-group single-row">
                        <span class="l">环评、安评文件</span>
                        <span>
                             <div class="img-box" v-for="(item, index) in imgList6" :key="index">
                                     <img :src="item.url" alt="" @click="handlePictureCardPreview(item)" v-if="item.url.slice(item.url.lastIndexOf('.') + 1).toLowerCase() !== 'pdf'">
                                        <a :href="item.url" target="_blank" v-else>
                                        <img :src="pdfThumbnail" alt="">
                                    </a>
                            </div>
                        </span>
                    </div>
                    <div class="gy-form-group single-row">
                        <span class="l">码头经营许可证<span  @click="showImg(3)">查看示例</span></span>
                        <span>
                          <div class="img-box" v-for="(item, index) in imgList7" :key="index">
                                     <img :src="item.url" alt="" @click="handlePictureCardPreview(item)" v-if="item.url.slice(item.url.lastIndexOf('.') + 1).toLowerCase() !== 'pdf'">
                                     <a :href="item.url" target="_blank" v-else>
                                        <img :src="pdfThumbnail" alt="">
                                    </a>
                            </div>
                        </span>
                    </div>
                    <div class="gy-form-group single-row">
                        <span class="l">法人身份证复印件</span>
                        <span>
                             <div class="img-box" v-for="(item, index) in imgList8" :key="index">
                                     <img :src="item.url" alt="" @click="handlePictureCardPreview(item)" v-if="item.url.slice(item.url.lastIndexOf('.') + 1).toLowerCase() !== 'pdf'">
                                      <a :href="item.url" target="_blank" v-else>
                                        <img :src="pdfThumbnail" alt="">
                                    </a>
                            </div>
                        </span>
                    </div>
                    <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
                        <img width="100%" :src="dialogImageUrl" v-if="dialogImageUrl.indexOf('pdf')=== -1" >
                        <!--<a :href="dialogImageUrl" target="_blank" v-else>-->
                            <!--<img :src="pdfThumbnail" alt="">点击打开pdf文件-->
                        <!--</a>-->
                    </el-dialog>
                </div>
            </el-tab-pane>
        </el-tabs>
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
            portTypeOption: ['', '海港', '江港'],
            taxProtectOptions: ['否', '是'],
            cdOptions: ['无', '有'],
            isProtocolO: ['未签', '已签'],
            approvalStatusO: ['', '已初审', '已终审'],
            businessDevelopmentO: ['否', '已'],
            provinceName: '',
            cityName: '',
            warehouseTypeOptions: ['', '固体仓储', '液体仓储'],
            areaOptions: ['', '东北', '华北', '华东', '华南', '华中', '西南'],
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
            materialsOptions: ['', 'CS', 'SS'],
            id: null,
            list: [],
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
                contactMobile: '',
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
    created () {
        this.id = this.$route.query.id;
        this.id && this.getInfo();
    },
    methods: {
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        showImg (m) {
            this.dialogImageUrl = this.imgSrc[m].src;
            this.dialogVisible = true;
        },
        getInfo () {
            this.$http.get(this.$api.warehouse.info + this.id).then((res) => {
                if (res.data.code === 0) {
                    this.para = res.data.data;
                    this.provinceName = res.data.data.provinceStr;
                    this.cityName = res.data.data.cityStr;
                    this.para.materials = res.data.data.materials.map(Number);
                    this.para.depotTypes = res.data.data.depotTypes.map(Number);
                    this.para.depotStructures = res.data.data.depotStructures.map(Number);
                    this.para.companyNatureIds.forEach((item) => {
                        this.companyNatureOptions.forEach((obj) => {
                            if (item === obj.value) {
                                this.list.push(obj.label);
                            }
                        });
                    });
                    if (this.para.establishDate === null) {
                        this.para.establishDate = '';
                    }
                    if (this.para.protocolDate === null) {
                        this.para.protocolDate = '';
                    }
                    if (this.para.companyFileMap && this.para.companyFileMap[0]) {
                        this.para.companyFileMap[0].forEach((item, index) => {
                            this.imgList1.push({url: item.filePath});
                        });
                    }
                    if (this.para.companyFileMap && this.para.companyFileMap[11]) {
                        this.para.companyFileMap[11].forEach((item, index) => {
                            this.imgList2.push({url: item.filePath});
                        });
                    }
                    if (this.para.companyFileMap && this.para.companyFileMap[10]) {
                        this.para.companyFileMap[10].forEach((item, index) => {
                            this.imgList3.push({url: item.filePath});
                        });
                    }

                    if (this.para.companyFileMap && this.para.companyFileMap[12]) {
                        this.para.companyFileMap[12].forEach((item, index) => {
                            this.imgList4.push({url: item.filePath});
                        });
                    }
                    if (this.para.companyFileMap && this.para.companyFileMap[13]) {
                        this.para.companyFileMap[13].forEach((item, index) => {
                            this.imgList5.push({url: item.filePath});
                        });
                    }
                    if (this.para.companyFileMap && this.para.companyFileMap[14]) {
                        this.para.companyFileMap[14].forEach((item, index) => {
                            this.imgList6.push({url: item.filePath});
                        });
                    }
                    if (this.para.companyFileMap && this.para.companyFileMap[15]) {
                        this.para.companyFileMap[15].forEach((item, index) => {
                            this.imgList7.push({url: item.filePath});
                        });
                    }
                    if (this.para.companyFileMap && this.para.companyFileMap[5]) {
                        this.para.companyFileMap[5].forEach((item, index) => {
                            this.imgList8.push({url: item.filePath});
                        });
                    }
                }
            });
        }
    }
};
</script>
<style scoped lang="scss">
  .add {
    padding: 20px;
    height: 100%;
  }

  .el-tabs__item {
    height: 36px;
    line-height: 30px;
  }

  .row_half {
    width: 50%;
  }

  .row_half1 {
    width: 45%;
  }

  .wid-half {
    width: 91%;
  }

  .panel {
    width: 80%;
    margin-left: 22px;
  }

  .gy-form-group {
    padding-left: 183px;
  }

  .gy-form-group .l {
    width: 170px;
  }

  .img-box {
    width: 60px;
    height: 60px;
    display: inline-block;
    float: left;
    margin-right: 10px;
    border: 1px solid $color-border;
    img {
      width: 58px;
      height: 58px;
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

  .gy-form-group:nth-child(odd) {
    padding-right: 30px;
  }

  .gy-form-group:nth-child(even) {
    padding-left: 132px;
    .l {
      width: 122px;
      padding-left: 30px;
      strong {
        left: 22px;
      }
    }
  }

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
