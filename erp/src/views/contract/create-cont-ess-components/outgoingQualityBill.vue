<template>
    <div class="essential-row">
        <div class="essential-item">
            <div class="essential-title"><span v-if="compData.isNecessary" class="isMust">*</span>出厂质检单</div>
            <div class="essential-text">
                <gy-file-upload ref="pFileUpload"
                    @callbackFileUpload="onCallbackBuyFileUpload"
                    :fileList='orderData.outgoingQualityBill'
                    >
                </gy-file-upload>
            </div>
        </div>
    </div>
</template>

<script>

import gyFileUpload from '../../components/gyFileUploadEdit';

export default {
    props: {
        compData: Object,
        orderData: Object
    },
    components: {
        gyFileUpload
    },
    data () {
        return {
            outgoingQualityBill: []
        };
    },
    methods: {
        onCallbackBuyFileUpload (fileList) {
            this.orderData.outgoingQualityBill = [];
            fileList.forEach((e) => {
                this.orderData.outgoingQualityBill.push(e.fileUrl);
            });
        }
    }
};
</script>
