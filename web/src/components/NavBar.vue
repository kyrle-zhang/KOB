<!--
 * @Author: kyrle
 * @Date: 2022-11-09 09:28:05
 * @LastEditTime: 2022-11-19 19:49:52
 * @FilePath: \web\src\components\NavBar.vue
 * @Description: 
-->
<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link class="navbar-brand" :to="{name:'home'}">King of Bots</router-link>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <router-link :class="route_name == 'pk_index' ? 'nav-link active' : 'nav-link'" :to="{name:'pk_index'}">对战</router-link>
                    </li>
                    <li class="nav-item">
                    <router-link :class="route_name == 'recordlist_index' ? 'nav-link active' : 'nav-link'" :to="{name:'recordlist_index'}">对局列表</router-link>
                    </li>
                    <li class="nav-item">
                    <router-link :class="route_name == 'ranklist_index' ? 'nav-link active' : 'nav-link'" :to="{name:'ranklist_index'}">排行榜</router-link>
                    </li>
                </ul>

                <ul class="navbar-nav" v-if="$store.state.user.is_login">
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {{ $store.state.user.username }}
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li><router-link class="dropdown-item" :to="{name:'botlist_index'}">MyBots</router-link></li>
                        <li><a class="dropdown-item"  @click="logout">退出</a></li>
                    </ul>
                    </li>
                </ul>

                <ul class="navbar-nav " v-else>
                    <li class="nav-item">
                        <ul>
                            <router-link :to="{name:'user_account_login'}">登录</router-link>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <ul>
                            <router-link :to="{name:'user_account_register'}">注册</router-link>
                        </ul>
                    </li>
                </ul>

            </div>
        </div>
    </nav>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    // 获取目前的页面名称
    setup() {
        const store = useStore();
        const route = useRoute();
        let route_name = computed(() => route.name)
        const logout = () => {
          store.dispatch("logout");
        }

        return {
            route_name,
            logout,
        }
    }
}
</script>

<style scoped>

</style>
