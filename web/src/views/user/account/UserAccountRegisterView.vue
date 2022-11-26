<!--
 * @Author: kyrle
 * @Date: 2022-11-18 11:18:02
 * @LastEditTime: 2022-11-26 09:07:12
 * @FilePath: \web\src\views\user\account\UserAccountRegisterView.vue
 * @Description:
-->
<template>
    <div class="container-sm" style="padding-top:100px;">
        <div class="card">
            <form class="form" @submit.prevent="register">
                <div class="mb-3" >
                    <label for="exampleInputEmail1" class="form-label">UserName</label>
                    <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword2" class="form-label">ConfirmedPassword</label>
                    <input v-model="confirmedPassword" type="password" class="form-control" id="confirmedPassword" placeholder="请输入重复密码">
                </div>
                <div class="mb-3 alert alert-danger" role="alert" id="liveAlertPlaceholder" style="display:none;">
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-primary" style="width: 80%;margin-left: 10%;">注册</button>
                </div>
            </form>
        </div> 
    </div>
</template>

<script setup>
    import { useStore } from 'vuex'
    import { ref } from 'vue'
    import router from '../../../router/index'
    import $ from 'jquery'

    const store = useStore();
    let username = ref('');
    let password = ref('');
    let confirmedPassword = ref('');
    $("#liveAlertPlaceholder").hide();
    const register = () => {
        store.dispatch("register", {
            username: username.value,
            password: password.value,
            confirmedPassword: confirmedPassword.value,
            success(resp) {//如果成注册成功
                router.push({name: "user_account_login"});
                console.log(resp);
            },
            error(resp) {
                $("#liveAlertPlaceholder").html(resp.error_message);
                $("#liveAlertPlaceholder").show();
                console.log(resp);
            },
        })
    }


</script>
<style scoped>
    .form  {
        width: 90%;
        padding-left: 20px;
        padding-top: 10px;
        height: 80%;
        padding-bottom: 10px;
    }
    .card {
        padding-left: 20px;
        padding-top: 20px;
        width: 35%;
        margin: auto;
    }
</style>