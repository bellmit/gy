<template>
    <div class="home">
        <button class="gy-button-normal">一般按钮</button>
        <button class="gy-button-normal disable">一般按钮disable</button>
        <button class="gy-button-normal selected">一般按钮selected</button>
        <button class="gy-button-extra">增值按钮</button>
        <button class="gy-button-extra disable">增值按钮disable</button>
        <div class="form-group">
            <label>公司姓名</label>
            <input type="text">
        </div>
        <div class="form-group">
            <label>公司地址</label>
            <input type="text" disabled>
        </div>
        <div class="form-group">
            <label>详细说明</label>
            <textarea></textarea>
        </div>
    </div>
</template>

<script>
export default {
    created () {
        console.log(this.$api.user.login);
        this.$http.get(this.$api.user.login)
            .then(function (res) {
                console.log(res);
            });
    }
};
</script>
