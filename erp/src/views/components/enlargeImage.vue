<template>
    <el-dialog :visible.sync="dataEnlarge.dialogVisibleImg" lock-scroll="true" append-to-body>
        <img width="100%" :src="dataEnlarge.dialogImageUrl">
    </el-dialog>
</template>

<script>
export default {
    name: 'enlargeImage',
    props: {
        dataEnlarge: Object
    },
    data () {
        return {
        };
    }
};
</script>

<style scoped>

</style>
