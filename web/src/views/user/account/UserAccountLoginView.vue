<!--
 * @Author: kyrle
 * @Date: 2022-11-18 11:15:57
 * @LastEditTime: 2022-11-26 09:57:48
 * @FilePath: \web\src\views\user\account\UserAccountLoginView.vue
 * @Description: 
-->
<template>
    <div class="container-sm" style="padding-top:100px;">
        <div class="card">
            <form class="form" @submit.prevent="login">
                <div class="mb-3" >
                    <label for="exampleInputEmail1" class="form-label">UserName</label>
                    <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-primary" style="width: 80%;margin-left: 10%;">登录</button>
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-light" style="width: 80%;margin-left: 10%;">注册</button>
                </div>
            </form>
        </div> 
    </div>
</template>

<script setup>
    import { useStore } from 'vuex'
    import { ref } from 'vue'
    import router from '../../../router/index'

    const store = useStore();
    //先判断浏览器本地硬盘中是否存有token
    let token = localStorage.getItem("jwt_token");
    if(token) { //如果token存在，判断其是否过期
        store.commit("updateToken",token);
        store.dispatch("getInfo", {
            success(resp) {
                console.log(resp);
                router.push({name: 'home'});//跳转到home页面
            },
            error() {

            },
        });
    }
    let username = ref('');
    let password = ref('');
    const login = () => {
        store.dispatch("login", {
            username: username.value,
            password: password.value,
            success(resp) {//如果成功验证用户信息并获取到jwt_token，那么先将用户信息保存在前端
                console.log(resp);
                store.dispatch("getInfo", {
                    success(resp) {
                        console.log(resp);
                    },
                    error(resp) {
                        console.log(resp);
                    }
                });
                router.push({name: 'pk_index'});
            },
            error(resp) {
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