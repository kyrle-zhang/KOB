<!--
 * @Author: kyrle
 * @Date: 2022-11-08 21:16:51
 * @LastEditTime: 2022-11-08 22:19:53
 * @FilePath: \web\src\App.vue
 * @Description: 
-->
<template>
    <div>
      <div>Bot昵称：{{bot_name}}</div>
      <div>Bot战力：{{bot_rating}}</div>
    </div>
  <router-view/>
</template>


<script>
  import $ from "jquery";
  import { ref } from "vue";

  export default {
    name: "App",
    setup: () => {
      let bot_name = ref("");
      let bot_rating = ref("");

      $.ajax({
        url : "http://localhost:8001/pk/getbotinfo/",
        type : "get",
        success : resp => {
          bot_name.value = resp.name;
          bot_rating.value = resp.power;
        }
      })
      return {
        bot_name,
        bot_rating
      }
    }
  }
</script>

<style>
  body {
    background: url("./assets/background.png");
    background-size : cover;
  }
</style>
