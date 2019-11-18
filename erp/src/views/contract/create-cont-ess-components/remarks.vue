<template>
    <div class="essential-row">
        <div class="essential-item">
            <div class="essential-title">备注</div>
            <div class="essential-text">
                <textarea maxlength="2500" name="" class="gy-textarea" v-model="orderData.remarks" cols="30" rows="10" placeholder="备注最多可填写2500字"></textarea>
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
    }
};
</script>
