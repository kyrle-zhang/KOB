<!--
 * @Author: kyrle
 * @Date: 2022-11-08 21:16:51
 * @LastEditTime: 2022-11-09 12:09:57
 * @FilePath: \web\src\App.vue
 * @Description: 
-->
<template>
    <NavBar/>
  <router-view/>
</template>


<script>
  import "bootstrap/dist/css/bootstrap.min.css"
  import "bootstrap/dist/js/bootstrap"
  import NavBar from "./components/NavBar.vue";

  

  export default {
    components: {
      NavBar
    }
    
  }
</script>

<style>
  body {
    background: url("./assets/images/background.png");
    background-size : cover;
  }
</style>
