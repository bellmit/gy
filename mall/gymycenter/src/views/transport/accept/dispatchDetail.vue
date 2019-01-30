<template>
    <div class="transport-wrap">
        <h2>调度单详情<span>调度单号：{{traceInfo.dispatchNoteCode}}</span></h2>
        <div class="gy-form">
            <div class="gy-form-group">
                <span class="l">调度时间</span>
                <span>{{traceInfo.createdDate | date(0)}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">车牌号</span>
                <span>{{traceInfo.licensePlateNumber}}</span>
            </div>
            <div class="gy-form-group">
                <span class="l">司机（电话）</span>
                <span>{{traceInfo.driverUsername}}({{traceInfo.driverPhone}})</span>
            </div>
            <div class="gy-form-group">
                <span class="l">押运员（电话）</span>
                <span>{{traceInfo.escortUsername}}<span v-if="traceInfo.escortPhone">(</span>{{traceInfo.escortPhone}}<span v-if="traceInfo.escortPhone">)</span></span>
            </div>
            <div class="gy-form-group">
                <span class="l">调度量</span>
                <span>{{traceInfo.quantityPlanned}}吨</span>
            </div>
            <div class="gy-form-group">
                <span class="l">单据凭证</span>
                <a href="javascript:;" class="iconfont icon-img" @click="handleShowImg"></a>
            </div>
        </div>
        <div class="trace">
            <div class="step">
                <div class="item" v-for="(item, index) in stepList" :class="{'active': item.time}" :key="index">
                    <i class="iconfont icon-car-right" v-if="index === activeList.length - 1"></i>
                    <i class="iconfont icon-right" v-if="item.time"></i>
                    <i class="circle" v-else></i>
                    <dl>
                        <dt>{{item.name}}</dt>
                        <dd v-if="item.time">{{item.time | date(1)}}</dd>
                    </dl>
                    <span class="line" :class="{'done': index < activeList.length - 1}"
                          v-if="index < stepList.length - 1"></span>
                </div>
            </div>
            <div class="map" id="bmap">
                <baidu-map class="bm-view" :scroll-wheel-zoom="true" ak="BHB2NGRNNsQhnKoHciLgBU14PNygoaMZ" :center="mapConfig.center" :zoom="mapConfig.zoom">
                    <bm-point-collection :points="mapConfig.points" shape="BMAP_POINT_SHAPE_CIRCLE" color="#4a90e2" size="BMAP_POINT_SIZE_SMALL"></bm-point-collection>
                </baidu-map>
            </div>
        </div>
        <transition name="fade">
            <div class="pop-image" v-show="showImg">
                <div class="pop-main">
                    <span class="pop-title">单据凭证<i class="iconfont icon-close" @click="showImg = false"></i></span>
                    <div class="img-side">
                        <ul>
                            <li v-for="(item) in imagesList" v-if="imagesList.length > 0" :key="item.id"
                                @click="showBigImage(item.filePath)">
                                <span class="avatar" :style="'background-image: url(' + item.filePath + ')'"></span>
                                <span class="name">{{item.fileDisplayName || imgName[item.fileType]}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="img-main">
                        <div class="img-box"><a :href="bigImageUrl" target="_blank"><img :src="bigImageUrl" v-if="bigImageUrl" alt=""></a></div>
                    </div>
                </div>
                <span class="mask" @click="showImg = false"></span>
            </div>
        </transition>
    </div>
</template>
<script>
import {BaiduMap, BmPointCollection} from 'vue-baidu-map';
let PI = 3.1415926535897932384626;
let xPI = 3.14159265358979324 * 3000.0 / 180.0;
let a = 6378245.0;
let ee = 0.00669342162296594323;
function transformlat (lng, lat) {
    let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret;
}
function transformlng (lng, lat) {
    let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret;
}
export default {
    data () {
        return {
            mapConfig: {
                center: {
                    lng: '',
                    lat: ''
                },
                zoom: 15,
                points: []
            },
            showImg: false,
            stepList: [
                {
                    id: 0,
                    time: null,
                    name: '发车'
                },
                {
                    id: 1,
                    time: null,
                    name: '到达装货点'
                },
                {
                    id: 2,
                    time: null,
                    name: '装货完成'
                },
                {
                    id: 3,
                    time: null,
                    name: '到达卸货点'
                },
                {
                    id: 4,
                    time: null,
                    name: '卸货完成'
                }
            ],
            activeList: [],
            traceInfo: {},
            dispatchCode: null,
            imagesList: {},
            bigImageUrl: null,
            imgName: ['装货图', '卸货图']
        };
    },
    components: {
        BaiduMap,
        BmPointCollection
    },
    created () {
        this.dispatchCode = this.$route.query.dispatchCode;
        this.getTraceInfo();
        this.getTraceDetail();
        this.mapInit();
    },
    mounted () {
    },
    methods: {
        mapInit () {
            let pointList;
            let newPoint;
            localStorage.getItem('driverPosition') && (pointList = JSON.parse(localStorage.getItem('driverPosition')));
            if (pointList[pointList.length - 1]) {
                this.mapConfig.center = {
                    lng: pointList[pointList.length - 1].gpsLatitude,
                    lat: pointList[pointList.length - 1].gpsLongitude
                };
            } else {
                this.mapConfig.center = {
                    lng: 116.403847,
                    lat: 39.915526
                };
            }
            for (let i = 0; i < pointList.length; i++) {
                newPoint = this.gcj02tobd09(pointList[i].gpsLatitude, pointList[i].gpsLongitude);
                newPoint = this.wgs84togcj02(newPoint[0], newPoint[1]);
                this.mapConfig.points.push({
                    lng: pointList[i].gpsLatitude,
                    lat: pointList[i].gpsLongitude
                });
            }
        },
        getTraceDetail () {
            this.$http.get(this.$api.transport.dispatchDetail + '/' + this.dispatchCode)
                .then(res => {
                    this.activeList = res.data.data;
                    res.data.data.forEach((item, index) => {
                        this.stepList[index].time = item.createdDate;
                    });
                });
        },
        getTraceInfo () {
            this.$http.get(this.$api.transport.diapatchTraceInfo + '/' + this.dispatchCode)
                .then(res => {
                    this.traceInfo = res.data.data;
                });
        },
        handleShowImg () {
            this.showImg = true;
            this.$http.get(this.$api.transport.diapatchImages + '/' + this.dispatchCode)
                .then(res => {
                    this.imagesList = res.data.data;
                    this.imagesList.length > 0 && (this.bigImageUrl = this.imagesList[0].filePath);
                });
        },
        showBigImage (url) {
            this.bigImageUrl = url;
        },
        wgs84togcj02 (lng, lat) {
            let dlat = transformlat(lng - 105.0, lat - 35.0);
            let dlng = transformlng(lng - 105.0, lat - 35.0);
            let radlat = lat / 180.0 * PI;
            let magic = Math.sin(radlat);
            magic = 1 - ee * magic * magic;
            let sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
            dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
            let mglat = lat + dlat;
            let mglng = lng + dlng;
            return [mglng, mglat];
        },
        gcj02tobd09 (lng, lat) {
            let z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * xPI);
            let theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * xPI);
            let bdlng = z * Math.cos(theta) + 0.0065;
            let bdlat = z * Math.sin(theta) + 0.006;
            return [bdlng, bdlat];
        }
    }
};
</script>
<style lang="scss" scoped>
    .gy-form {
        overflow: hidden;
        padding: 20px 30px;
        .gy-form-group {
            padding-left: 115px;
        }
        .l {
            width: 110px;
            padding-left: 0;
        }
        .icon-img {
            color: #4a90e2;
            font-size: 20px;
        }
    }

    .trace {
        padding: 0 30px 20px;
        .step {
            overflow: hidden;
            margin-bottom: 30px;
            line-height: 1;
            position: relative;
            padding-left: 10px;
            .item {
                float: left;
                width: 20%;
                font-size: $small-font;
                position: relative;
                padding-top: 40px;
                dl {
                    margin-left: -8px;
                }
                dt {
                    color: $color-title;
                    margin: 15px 0 10px;
                }
                .icon-car-right {
                    position: absolute;
                    left: -10px;
                    top: -2px;
                    font-size: 26px;
                    color: #f5a623;
                }
                .line {
                    height: 4px;
                    background-color: #dce0e4;
                    position: absolute;
                    left: 0;
                    top: 30px;
                    width: 100%;
                    z-index: 1;
                    &.done {
                        background-color: #f5a623;
                    }
                }
                .icon-right, .circle {
                    position: absolute;
                    left: -10px;
                    top: 22px;
                    z-index: 9;
                    &:before {
                        position: relative;
                        z-index: 9;
                    }
                }
                .circle {
                    background-color: #dce0e4;
                    height: 16px;
                    width: 16px;
                    border-radius: 16px;
                }
                .icon-right {
                    color: #f5a623;
                    font-size: 21px;
                }
            }
        }
        .map {
            height: 480px;
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
    .bm-view{
        height: 100%;
        width: 100%;
    }
</style>
