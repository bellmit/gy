<template>
    <div class="transmissionRange">
        <div class="new-title-public">运输范围</div>
        <div class="title"><i class="iconfont icon-icon_shenqing"></i>产品范围</div>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l">运输品类</span>
                <div>
                    <el-checkbox-group v-model="addFrom.productScopeIdList">
                        <el-checkbox v-for="(item, index) in rangeList.productScopeList" :checked="item.select" :key="index" :label="item.id">{{item.value}}</el-checkbox>
                        <!-- <el-checkbox label="1">固体</el-checkbox>
                        <el-checkbox label="2">液体(油品)</el-checkbox>
                        <el-checkbox label="3">液体(化工)</el-checkbox> -->
                    </el-checkbox-group>
                </div>
            </div>
        </div>
        <div class="title"><i class="iconfont icon-icon_shenqing"></i>运输区域</div>
        <div class="gy-province-box">
            <div class="gy-form-province mr30" v-clickOutside="handleHiddenList">
                <p @click="showSprovince =!showSprovince">起始省份<i class="iconfont" :class="showSprovince ? 'icon-arrow-right' : 'icon-arrow-down'"></i></p>
                <ul v-if="showSprovince">
                  <li
                    v-for="(item, index) in ProvinceSListName" :key="index"
                    class="red"
                    >{{item}}</li>
                </ul>
                <ul v-if="!showSprovince">
                  <li
                    v-for="(item, index) in rangeList.provinceList" :key="index"
                    :class="{red:addFrom.transportScopeProvinceSList.indexOf(item.id) >= 0}"
                    @click="getHavenSList(item)">{{item.regionName}}</li>
                </ul>
            </div>
            <div class="gy-form-province" v-clickOutside="handshowEprovince">
                <p @click="showEprovince =!showEprovince">到达省份<i class="iconfont" :class="showEprovince ? 'icon-arrow-right' : 'icon-arrow-down'"></i></p>
                <ul v-if="showEprovince">
                  <li
                    v-for="(item, index) in ProvinceEListName" :key="index"
                    class="red"
                    >{{item}}</li>
                </ul>
                <ul v-if="!showEprovince">
                  <li
                    v-for="(item, index) in rangeList.provinceList" :key="index"
                    :class="{red:addFrom.transportScopeProvinceEList.indexOf(item.id) >= 0}"
                    @click="getHavenEList(item)">{{item.regionName}}</li>
                </ul>
            </div>
        </div>
        <div class="gy-form-button" style="padding-top:20px;">
            <button class="gy-button-extra" @click="submit">保存</button>
        </div>
    </div>
</template>

<script>
const clickOutside = {
    bind (el, binding) {
        function documentHandler (e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.vueClickOutside = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    unbind (el) {
        document.removeEventListener('click', el.vueClickOutside);
        delete el.vueClickOutside;
    }
};
export default {
    directives: {
        clickOutside
    },
    data () {
        return {
            showSprovince: true,
            showEprovince: true,
            addFrom: {
                id: JSON.parse(localStorage.getItem('userInfo')).companyId,
                productScopeIdList: [], // 产品范围
                transportScopeProvinceSList: [], // 运输起始省份范围
                transportScopeProvinceEList: [] // 运输到达省份范围
            },
            rangeList: [], // 总数据
            ProvinceSListName: [], // 保存运输起始省份id
            ProvinceEListName: [], // 保存运输起始省份id
            ismianmin: true, // 面议
            intentPrice: null
        };
    },
    created () {
        this.getMissionRange();
    },
    methods: {
        getMissionRange () {
            this.$http.get(this.$api.transport.setRange + '/' + this.addFrom.id)
                .then(res => {
                    this.rangeList = res.data.data;
                    this.addFrom.transportScopeProvinceSList = this.rangeList.transportScopeProvinceSList;
                    this.addFrom.transportScopeProvinceEList = this.rangeList.transportScopeProvinceEList;
                    let that = this;
                    that.rangeList.provinceList.map(function (item) {
                        for (let i = 0; i < that.addFrom.transportScopeProvinceSList.length; i++) {
                            if (item.id === that.addFrom.transportScopeProvinceSList[i]) {
                                that.ProvinceSListName.push(item.regionName);
                            }
                        }
                        for (let i = 0; i < that.addFrom.transportScopeProvinceEList.length; i++) {
                            if (item.id === that.addFrom.transportScopeProvinceEList[i]) {
                                that.ProvinceEListName.push(item.regionName);
                            }
                        }
                    });
                    // this.ProvinceSListName.push(item.regionName);
                });
        },
        // 多选方法调用
        multiSelect (arrayList, id) {
            let idx = arrayList.indexOf(id);
            idx >= 0 ? arrayList.splice(idx, 1) : arrayList.push(id);
        },
        // 起始范围
        getHavenSList (item) {
            this.multiSelect(this.addFrom.transportScopeProvinceSList, item.id);
            this.multiSelect(this.ProvinceSListName, item.regionName);
        },
        // 到达范围
        getHavenEList (item) {
            this.multiSelect(this.addFrom.transportScopeProvinceEList, item.id);
            this.multiSelect(this.ProvinceEListName, item.regionName);
        },
        handleHiddenList () {
            this.showSprovince = true;
        },
        handshowEprovince () {
            this.showEprovince = true;
        },
        // 提交
        submit () {
            console.log(this.addFrom);
            this.$http.put(this.$api.transport.setRange, this.addFrom)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$message.success('保存成功');
                    }
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.transmissionRange{
    padding-bottom: 30px;
    .title{
        padding:20px 30px 0 30px;
        font-size: 14px;
        color: #333333;
        font-weight: bold;
        position: relative;
        i{
            font-size: 14px;
            margin-right: 5px;
            line-height: 14px;
            text-align: center;
            position: absolute;
            top: 26px;
            left: 11px;
            color: #666666;
            font-weight: normal;
        }
    }
    .mr30{
        margin-right: 30px;
    }
    .gy-province-box{
        padding: 10px 0 0 10px;
        .gy-form-province{
            float: left;
            font-size: 14px;
            background: #FBFBFB;
            padding: 0 18px 0 30px;
            width: 47%;
            p{
                padding: 20px 0 20px 0px;
                color: #333333;
                cursor: pointer;
                i{
                    margin-left: 8px;
                }
            }
            li{
                float: left;
                margin: 0 9px 12px 0;
                padding: 3px 6px;
                color: #999999;
                border: 1px solid #999999;
                cursor: pointer;
            }
            .red{
                border: 1px solid #E0370D;
                color: #E0370D;
            }
        }
    }
}
</style>
