<template>
    <div>
        <div class="essential-row">
            <div class="essential-item">
                <div class="essential-title"><span v-if="compData.isNecessary" class="isMust">*</span>交割地点</div>
                <div class="essential-text">
                    <el-select v-model="orderData.deliveryWarehouseId" placeholder="请选择" @change="changeWarehouse($event)">
                        <el-option v-for="(item, index) in compData.compInfo.warehouseList" :key="index"
                                    :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="essential-row" v-if="orderData.deliveryWarehouseId == -1">
            <div class="essential-item">
                <div class="essential-title"></div>
                <div class="essential-text">
                    <textarea class="gy-textarea" type="text" maxlength="100" v-model="orderData.deliveryWarehouseName" placeholder="请输入，自定义文本选填，限制字数100字"></textarea>
                </div>
            </div>
        </div>
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
        };
    },
    methods: {
        changeWarehouse (event) {
            if (event === -1) {
                this.orderData.deliveryWarehouseName = null;
                return;
            }
            for (let y = 0; y < this.compData.compInfo.warehouseList.length; y++) {
                if (event === this.compData.compInfo.warehouseList[y].value) {
                    this.orderData.deliveryWarehouseName = this.compData.compInfo.warehouseList[y].label;
                }
            }
        }
    }
};
</script>
