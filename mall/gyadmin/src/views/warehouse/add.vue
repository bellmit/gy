<template>
    <div class="add my-warehouse">
        <div class="tabs">
          <ul>
              <li v-for="(item, index) in tabList" :class="{'selected': index === tabIdx}" :key="index" @click="tabIdx = index">{{item.name}}</li>
          </ul>
        </div>
            <div class="panel first-tabs" v-if="tabIdx === 0">
              <div class="gy-form-group">
                  <span class="l"><strong>*</strong>企业名称</span>
                  <span><input type="text" class="gy-input" v-model="para.name" :disabled="id" ></span>
              </div>
              <div class="gy-form-group">
                  <span class="l"><strong>*</strong>港口</span>
                  <span>
                      <!-- @click="blur" -->
                      <div class="harbour-input row_half3">
                        <input type="text" @click="onelist1Show = false" class="gy-input harbour-input" placeholder="请选择或输入文字搜索" v-model="harbourName" @keyup.enter="aa">
                        <i class="iconfont icon-screen" @click="aa"></i>
                      </div>
                      <span class="addharbour fr" @click="harbourDIaOpen">
                        <i class="iconfont icon-addH"></i>
                        <span>港口维护</span>
                      </span>
                      <ul class="listul" v-show="onelist1Show">
                        <li v-for="(item, index) in harbourData" :key="index" @click="selectItem(item)" v-if="harbourData.length>0">
                          {{item.harbourName}}
                        </li>
                        <li class="none-tips" v-if="harbourData.length === 0">没有搜到相关公司</li>
                      </ul>
                  </span>
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
              <div class="gy-form-group h30">
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
              <div class="gy-form-group">
                  <span class="l"><strong>*</strong>公司链接</span>
                  <span><input type="text" class="gy-input" v-model="para.homeImgUrl"></span>
              </div>
              <div class="gy-form-group">
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
                      <input type="text" class="gy-input row_half2" v-model="para.registeredCapital">万
                      <el-select v-model="para.currencyId" class="row_half4 registeredCapital" placeholder="请选择">
                          <el-option
                            v-for="item in currencies"
                            :key="item.id"
                            :label="item.friendlyName"
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
              <div class="gy-form-group">
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
              <div class="gy-form-group cl">
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
              <div class="gy-form-group">
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
                <span class="l">出库类型</span>
                <span>
                    <el-select v-model="para.storageOutTypeList" multiple placeholder="请选择">
                          <el-option
                            v-for="item in storageOutTypeOptions"
                            :key="item.id"
                            :label="item.warehouseDicName"
                            :value="item.id">
                          </el-option>
                      </el-select>
                  </span>
             </div>
                <div class="gy-form-group">
                    <span class="l">入库类型</span>
                    <span>
                    <el-select v-model="para.storageInTypeList" multiple placeholder="请选择">
                          <el-option
                            v-for="item in storageInTypeOptions"
                            :key="item.id"
                            :label="item.warehouseDicName"
                            :value="item.id">
                          </el-option>
                      </el-select>
                  </span>
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
                  <span class="l">库区主流产品</span>
                  <span>
                    <el-select v-model="para.deliveryProductIdsList" multiple filterable placeholder="请选择或输入文字搜索">
                        <el-option
                          v-for="item in deliveryProductOptions"
                          :key="item.id"
                          :label="item.productName"
                          :value="item.id">
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
              <div class="gy-form-group">
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
                  <span class="l">库区评级</span>
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
                  <span class="l">主营品种</span>
                      <el-select v-model="para.productIdsList" filterable multiple  placeholder="请选择或输入文字搜索">
                        <el-option
                          v-for="item in deliveryProductOptions"
                          :key="item.id"
                          :label="item.productName"
                          :value="item.id">
                        </el-option>
                      </el-select>
              </div>
              <div>
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
                      <span class="l">固体库概括</span>
                      <span>
                      <textarea class="gy-textarea" placeholder="请填写" v-model="para.solidLibaryInf"></textarea>
                  </span>
                  </div>
                  <div class="gy-form-group">
                      <span class="l">备注</span>
                      <span>
                      <textarea class="gy-textarea" placeholder="请填写" v-model="para.remark"></textarea>
                  </span>
                  </div>
              </div>
            </div>
            <div class="panel" v-if="tabIdx === 1">
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
            <div class="panel" v-if="tabIdx === 2">
                <div class="gy-form-group single-row">
                    <span class="l">图片信息</span>
                    <span>
                        <div class="img-holder" v-if="para.homeImgPath&&!isReupload"  @click.prevent="showImgs" :style='"background-image: url(" + para.homeImgPath + ")"' title="点击看大图"></div>
                        <el-upload
                          class="product-upload"
                          action="api"
                          list-type="picture-card"
                          :on-preview="showImgs"
                          :limit="1"
                          :http-request="imgBanner">
                  <i class="el-icon-plus"></i>
                </el-upload>
                        </span>
                </div>
                <el-dialog :visible.sync="dialogVisible1" :modal-append-to-body="false">
                    <img width="100%" :src="dialogImageUrl">
                </el-dialog>
            </div>
        <!-- 港口列表弹出框 -->
        <el-dialog title="港口维护" :visible.sync="harbourDIaISShow" width="38%" class="diaHarbour">
          <div class="button-wrap">
            <button class="gy-button-extra my-button" @click="harbourName = '', isEdit = false, addharbourDIaISShow = true, harbourDIaISShow = false">添加</button>
          </div>
          <table class="gy-table">
            <thead>
            <tr>
              <td>港口名称</td>
              <td>区域</td>
              <td>状态</td>
              <td>操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in harbourList" :key="index" v-show="harbourList.length > 0">
              <td>{{item.harbourName}}</td>
              <td>{{item.areaCategoryId === 1 ? '东北' : item.areaCategoryId === 2 ? '华北' : item.areaCategoryId === 3 ? '华东' : item.areaCategoryId === 4 ? '华南' :item.areaCategoryId === 5 ? '华中' :item.areaCategoryId === 6 ? '西南' :'' }}</td>
              <td>{{item.valid | harbourValid}}</td>
              <td class="caoz">
                <span class="gy-button-view mr10" @click="editHarbour(item), isEdit = true, addharbourDIaISShow = true, harbourDIaISShow = false">编辑</span>
                <span v-if="item.valid === 1" class="gy-button-view" @click="delediaHarbour(item.id, 0)">禁用</span>
                <span v-if="item.valid === 0" class="gy-button-view" @click="delediaHarbour(item.id, 1)">启用</span>
              </td>
            </tr>
            <tr v-show="harbourList.length === 0">
              <td colspan="4" class="note">暂无数据</td>
            </tr>
            </tbody>
          </table>
          <div class="pagination-wrapper">
            <div class="pagination-total">共 {{harbourTotal}} 条</div>
          </div>
            <el-pagination
              v-if="harbourTotal !== 0"
              background
              layout="prev, pager, next"
              :current-page.sync="harbourSearchForm.pageNum"
              :page-size="harbourSearchForm.pageSize"
              :total="harbourTotal"
              @current-change="getHarbourList"
            >
            </el-pagination>
        </el-dialog>
        <!-- 添加港口弹出框 -->
        <el-dialog title="港口维护" :visible.sync="addharbourDIaISShow" width="38%" class="diaHarbour adddiaHarbour" @close="harbourDIaISShow = true, addharbourDIaISShow = false">
          <div class="gy-form-group">
              <span class="l">港口名称</span>
              <input class="gy-input" v-model="harbourName" placeholder="请输入港口名称">
          </div>
          <!-- 区域 -->
          <div class="gy-form-group">
              <span class="l"><strong>*</strong>区域分类</span>
              <span>
                  <el-select v-model="editHarbourForm.areaCategoryId" placeholder="请选择">
                      <el-option
                        v-for="item in areaOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
              </span>
          </div>
          <div slot="footer" class="dialog-footer">
          <div class="button-wrap">
            <button class="gy-button-extra my-button" @click="savediaHarbour">保存</button>
            <button class="gy-button-normal" @click="harbourDIaISShow = true, addharbourDIaISShow = false">取消</button>
          </div>
          </div>
        </el-dialog>
        <div class="gy-form-button">
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
            filePath: [],
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
            tabIdx: 0,
            tabList: [
                {
                    name: '基础信息'
                },
                {
                    name: '附件信息'
                },
                {
                    name: '图片信息'
                }
            ],
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
            harbourList: [],
            // 控制港口弹出框
            harbourDIaISShow: false,
            // 控制添加港口弹出框
            addharbourDIaISShow: false,
            onelist1Show: false,
            harbourTotal: 0,
            harbourData: [],
            harbourName: '', // 港口名称
            isEdit: false,
            valid: null,
            editHarbourForm: {
                harbourName: null,
                areaCategoryId: '',
                id: null
            },
            // 港口搜索条件
            harbourSearchForm: {
                data: {
                    harbourName: null
                },
                pageNum: 1,
                pageSize: 10
            },
            isReupload: false,
            homeImgPath: '',
            para: {
                homeImgPath: '',
                harbourId: '',
                solidLibaryInf: '',
                harbourName: '',
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
                depotStructuresList: [],
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
                companyFileList: [],
                storageOutTypeList: [],
                storageInTypeList: [],
                homeImgUrl: null
            },
            typeId: null,
            storageOutTypeOptions: [],
            storageInTypeOptions: [],
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
    },
    methods: {
        init () {
            this.id = this.$route.query.id;
            this.typeId = this.$route.query.typeId;
            this.id && this.getInfo(); // 基;
            this.address(0, 'province'); // 获取省市区
            this.getcurrencies(); // 调币种
            this.types('is'); // 仓库类型
            this.getHarbourSearch();
            this.getWarehouseType(4); // 出库类型
            this.getWarehouseType(5); // 入库类型
            this.getDeliveryProductList(); // 调产品
        },
        aa () {
            this.onelist1Show = true;
            this.getHarbourSearch();
        },
        getWarehouseType (n) {
            let that = this;
            that.$http.get(this.$api.warehouse.type + '/' + n).then(function (res) {
                if (res.data.code === 0) {
                    if (n === 4) {
                        that.storageOutTypeOptions = res.data.data;
                    } else if (n === 5) {
                        that.storageInTypeOptions = res.data.data;
                    }
                } else {
                    that.$message(res.data.message);
                }
            });
        },
        // blur () {
        // this.onelist1Show = false;
        // this.harbourName = null;
        // this.para.harbourId = null;
        // },
        selectItem (item) {
            this.harbourName = item.harbourName;
            this.para.harbourId = item.id;
            this.onelist1Show = false;
        },
        // 获取港口下拉框数据
        getHarbourSearch () {
            this.$http.post(this.$api.harbour.search, {harbourName: this.harbourName}).then(res => {
                if (res.data.code === 0) {
                    this.harbourData = res.data.data;
                }
            });
        },
        // 获取港口列表
        getHarbourList () {
            this.$http.post(this.$api.harbour.harbourList, this.harbourSearchForm).then(res => {
                if (res.data.code === 0) {
                    this.harbourList = res.data.data.list;
                    console.log(this.harbourList);
                    this.harbourTotal = res.data.data.total;
                }
            });
        },
        // 显示港口弹出框
        harbourDIaOpen () {
            this.harbourDIaISShow = true;
            this.getHarbourList();
        },
        // 编辑港口
        editHarbour (item) {
            this.harbourName = item.harbourName;
            this.editHarbourForm.id = item.id;
        },
        // 公用修改港口函数
        // baseHarbourPost (params) {
        //     this.$http.put(this.$api.harbour.save, params).then(res => {
        //         if (res.data.code === 0) {
        //             this.$message.success(res.data.message);
        //             this.harbourDIaISShow = true;
        //             this.addharbourDIaISShow = false;
        //             this.getHarbourList();
        //             return;
        //         }
        //         this.$message.error(res.data.message);
        //     });
        // },
        delediaHarbour (id, valid) {
            let params = {
                id: id,
                valid: valid
            };
            this.$http.put(this.$api.harbour.save, params).then(res => {
                if (res.data.code === 0) {
                    this.$message.success(res.data.message);
                    this.getHarbourList();
                    return;
                }
                this.$message.error(res.data.message);
            });
        },
        // 保存港口
        savediaHarbour () {
            if (!this.editHarbourForm.areaCategoryId) {
                this.$message('请选择区域分类');
                return false;
            }
            if (this.isEdit) {
                this.editHarbourForm.harbourName = this.harbourName;
                console.log(this.editHarbourForm);
                this.$http.put(this.$api.harbour.save, this.editHarbourForm).then(res => {
                    if (res.data.code === 0) {
                        this.$message.success(res.data.message);
                        this.harbourDIaISShow = true;
                        this.addharbourDIaISShow = false;
                        this.getHarbourList();
                        this.harbourName = '';
                        this.getHarbourSearch();
                        return;
                    }
                    this.$message.error(res.data.message);
                });
            } else {
                this.editHarbourForm.harbourName = this.harbourName;
                this.$http.post(this.$api.harbour.save, this.editHarbourForm).then(res => {
                    if (res.data.code === 0) {
                        this.$message.success(res.data.message);
                        this.harbourDIaISShow = true;
                        this.addharbourDIaISShow = false;
                        this.getHarbourList();
                        this.harbourName = '';
                        this.getHarbourSearch();
                        return;
                    }
                    this.$message.error(res.data.message);
                });
            }
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
                    that.filePath = [];
                    that.provinceName = res.data.data.provinceStr;
                    that.harbourName = res.data.data.harbourName;
                    that.para.harbourName = res.data.data.harbourName;
                    that.para.harbourId = res.data.data.harbourId;
                    that.cityName = res.data.data.cityStr;
                    that.para.materials = res.data.data.materials.map(Number);
                    that.para.depotTypes = res.data.data.depotTypes.map(Number);
                    that.para.depotStructures = res.data.data.depotStructures.map(Number);
                    that.para.storageOutTypeList = res.data.data.storageOutTypeList.map(Number);
                    that.para.storageInTypeList = res.data.data.storageInTypeList.map(Number);
                    console.log(that.para);
                    if (that.para.warehouseType === 2) {
                        that.types();
                    }
                    if (that.para.establishDate === null) {
                        that.para.establishDate = '';
                    }
                    if (that.para.protocolDate === null) {
                        that.para.protocolDate = '';
                    }
                    if (that.para.homeImgPath) {
                        that.filePath[0] = that.para.homeImgPath;
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
        // 因为接口替换 所以库区主流产品 deliveryProductOptions 需要跟着替换
        getDeliveryProductList () { // 产品
            this.$http.get(this.$api.warehouse.productsSearch).then(res => {
                if (res.data.code === 0) {
                    res.data.data.forEach((item) => {
                        item.id = String(item.id);
                    });
                    this.deliveryProductOptions = res.data.data;
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
        showImgs () {
            this.dialogVisible1 = true;
            // 存入公用展示框
            this.dialogImageUrl = this.para.homeImgPath;
        },
        submit () {
            this.para.establishDate = new Date(this.para.establishDate).getTime();
            this.para.protocolDate = new Date(this.para.protocolDate).getTime();
            if (!this.para.name) {
                this.$message.error('请输入企业名称');
                return false;
            }
            if (!this.para.harbourId) {
                this.$message.error('请选择港口');
                return false;
            }
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
            if (this.para.companyNatureIds.length === 0) {
                this.$message.error('企业性质');
                return false;
            }
            if (!this.para.homeImgUrl) {
                this.$message.error('请输入公司链接');
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
                        return;
                    }
                    this.$message.error(res.data.message);
                });
            } else if (this.id) {
                this.$http.put(this.$api.warehouse.create, this.para).then((res) => {
                    if (res.data.code === 0) {
                        // this.info.contractCode = res.data.data;
                        this.$message.success(res.data.message);
                        this.$router.push({name: 'warehouseView'});
                        return;
                    }
                    this.$message.error(res.data.message);
                });
            } else {
                this.$http.post(this.$api.warehouse.create, this.para).then((res) => {
                    if (res.data.code === 0) {
                        // this.info.contractCode = res.data.data;
                        this.$router.push({name: 'warehouseView'});
                        return;
                    }
                    this.$message.error(res.data.message);
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
        imgBanner (file) {
            let formData = new FormData();
            let headers = {
                'Content-Type': 'multipart/form-data'
            };
            formData.append('file', file.file);
            formData.append('storage', 'platform-mgmt');
            this.$http.post(this.$api.warehouse.file, formData, headers).then((res) => {
                this.para.homeImgPath = res.data;
                this.isReupload = true;
            });
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
        handleRemove (file) {
            console.log(file);
        },
        BannerRemove (file) {
            // if (file.fileType === null) {
            //     this.filePath = [];
            //     this.para.homeImgPath = '';
            // }
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
  @import './../../styles/module/OrderList';
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
  .img-holder{display:inline-block;width:60px;height:60px;line-height: 60px;background: no-repeat;border:1px solid $color-border}
  .product-upload{
      display:inline;}
  li.el-upload-list__item {
      -webkit-transition:none;
      transition:none;
  }
  .tabs{
      font-size: 0;
      margin-bottom: 20px;
      ul {
          overflow: hidden;
          display: inline-block;
          font-size: 14px;
      }
      li{
          float: left;
          padding: 0 5px;
          font-size: 14px;
          color: #666666;
          cursor: pointer;
          line-height: 31px;
          &.selected{
              color: #F5A622;
              border-bottom: 2px solid #F5A622;
          }
      }
      ul li:not(:first-child) {
          margin-left: 10px;
      }
  }
  // .transport-wrap.order .t .tabs li {
  //   padding: 0 5px;
  //   margin-right: 10px;
  // }
  .listul{
    background-color: #fff;
    width: 84%;
    max-height: 300px;
    position: absolute;
    top: 30px;
    z-index: 9;
    border: 1px solid #e6eaea;
    border-top: none;
    overflow: auto;
    li{
      padding: 5px 10px;
    }
    li:hover{
      cursor: pointer;
      background-color: #f5f7fa;
      color: #4a90e2;
    }
  }
  .mr10 {
    margin-right: 10px;
  }
  .diaHarbour {
    font-size: 16px;
    color: #333333;
  }
  .button-wrap {
    text-align: right;
    margin-bottom: 20px;
    .my-button {
      background: #e59640;
      border: #e59640;
    }
  }
  .addharbour {
    color: #4A90E2;
    cursor: pointer;
    span {
      vertical-align: middle;
    }
    .icon-addH {
      font-size: 14px;
    }
  }
  .adddiaHarbour {
    .gy-form-group {
      width: 100%;
    }
  }
  .harbour-input {
    position: relative;
    display: inline-block;
    float: left;
    input {
      padding-right: 20px;
    }
    .icon-screen {
      position: absolute;
      right: 0;
      width: 20px;
    }
  }
    .row_half4{width: 17%}
    .wid-half{width:90%}
  .row_half3 {
    width: 80%!important;
  }.row_half2 {
    width: 78%!important;
  }
  .note {
    text-align: center;
    line-height: 40px;
    font-size: 14px;
  }
  .add {
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
    padding-left: 110px;
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

    /*.gy-form-group:nth-child(odd) {*/
      /*padding-right: 0;*/
    /*}*/

    /*.gy-form-group:nth-child(even) {*/
      /*.l {*/
        /*padding-left: 0;*/
      /*}*/
    /*}*/
  }
  .caoz {
    text-align: center;
  }
  .gy-form-button {
     padding: 10px 0 30px 0;
     .gy-button-extra {
        background-color: #e59640;
        border: #e59640;
     }
  }
  .h30 {
    height: 30px;
  }
  .my-warehouse .el-select__tags .el-select__input{
      flex-grow: 1; width: 0.0539447%; max-width: 360.75px;
  }
  .first-tabs{
      .gy-form-group{
          padding-right: 30px;
          width: 50%;
      }
      .gy-form-group:nth-child(even){
          padding: 0 0 12px 138px;
          .l{
              width: 125px;
              padding-left: 38px;
              strong{
                  left:30px;
              }
          }
      }
      .gy-form-group:nth-child(even) {
          /*padding-left: 110px;*/
          /*.l {*/
              /*width: 100px;*/
              /*padding-left: 30px;*/
          /*}*/
      }
  }

</style>
