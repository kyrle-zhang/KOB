<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link class="navbar-brand" :to="{name:'home'}">King of Bots</router-link>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <router-link :class="route_name == 'PKIndexView' ? 'nav-link active' : 'nav-link'" :to="{name:'PKIndexView'}">对战</router-link>

                    </li>
                    <li class="nav-item">
                    <router-link :class="route_name == 'RecordlistIndexView' ? 'nav-link active' : 'nav-link'" :to="{name:'RecordlistIndexView'}">对局列表</router-link>
                    </li>
                    <li class="nav-item">
                    <router-link :class="route_name == 'RanklistIndexView' ? 'nav-link active' : 'nav-link'" :to="{name:'RanklistIndexView'}">排行榜</router-link>
                    </li>
                </ul>

                <ul class="navbar-nav ">
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        zhangdongdong
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li><router-link class="dropdown-item" :to="{name:'BotlistIndexView'}">MyBots</router-link></li>
                        <li><router-link class="dropdown-item" :to="{name:'RanklistIndexView'}">退出</router-link></li>
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

export default {
    // 获取目前的页面名称
    setup() {
        const route = useRoute();
        let route_name = computed(() => route.name)
        return {
            route_name
        }
    }
}
</script>

<style scoped>

</style>
