<template>
    <div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title"><span v-if="compData.isNecessary" class="isMust">*</span>交割地点</div>
                <div class="essential-text">
                    <el-select v-model="dockWareObj"
                    @change="changeWarehouse" placeholder="请选择">
                        <el-option v-for="(item, index) in compData.compInfo.dockWareList"
                        :key="index"
                        :label="item.label"
                        :value="item">
                        </el-option>
                    </el-select>
                    <el-select v-model="baseID" placeholder="请选择" @change="handelChange">
                        <el-option v-for="(item, index) in dockWareObj.list"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <!-- orderData.deliveryWarehouseName -->
        <!-- <div class="essential-row" v-if="orderData.deliveryWarehouseId == -1">
            <div class="essential-item">
                <div class="essential-title"></div>
                <div class="essential-text">
                    <textarea class="gy-textarea" type="text" maxlength="100" v-model="orderData.deliveryWarehouseName" placeholder="请输入，自定义文本选填，限制字数100字"></textarea>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    props: {
        compData: Object,
        orderData: Object
    },
    data () {
        return {
            dockWareObj: {},
            baseID: null
        };
    },
    created () {
        this.dockWareObj['value'] = this.orderData.deliveryWarehouseType;
        this.dockWareObj['label'] = this.orderData.deliveryWarehouseName;
        // 库区
        if (this.orderData.deliveryWarehouseType === 1) {
            this.baseID = this.orderData.deliveryWarehouseId;
            this.dockWareObj['list'] = this.compData.compInfo.dockWareList[0].list;
        }
        // 码头
        if (this.orderData.deliveryWarehouseType === 2) {
            this.dockWareObj['list'] = this.compData.compInfo.dockWareList[1].list;
            this.baseID = this.orderData.wareDockId;
        }
    },
    methods: {
        changeWarehouse (e) {
            this.orderData.deliveryWarehouseType = e.value;
            this.orderData.deliveryWarehouseName = '';
            this.baseID = null;
        },
        handelChange (e) {
            // wareDockId 码头
            // deliveryWarehouseId 库区
            this.dockWareObj.list.forEach(item => {
                e === item.value && (this.orderData.deliveryWarehouseName = item.label);
            });
            // 库区
            if (this.dockWareObj.value === 1) {
                this.orderData.deliveryWarehouseId = this.baseID;
                this.orderData.wareDockId = null;
            }
            // 码头
            if (this.dockWareObj.value === 2) {
                this.orderData.wareDockId = this.baseID;
                this.orderData.deliveryWarehouseId = null;
            }
        }
    }
};
</script>
