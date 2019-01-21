<!--
  个人用户添加
-->

<template>
    <div class="member-add">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio v-model="form.sex" label="1">男</el-radio>
                <el-radio v-model="form.sex" label="2">女</el-radio>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                name: null,
                phone: null,
                username: null,
                sex: null,
                email: null
            }
        };
    }
};
</script>

<style lang="scss" scoped>

</style>
