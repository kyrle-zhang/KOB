<!--
 * @Author: kyrle
 * @Date: 2022-11-08 21:16:51
 * @LastEditTime: 2022-11-19 11:18:55
 * @FilePath: \web\src\App.vue
 * @Description: 
-->
<template>
    <NavBar/>
  <router-view/>
</template>


<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap/dist/js/bootstrap";
  import NavBar from "./components/NavBar.vue";

  export default {
    components: {
      NavBar
    },

    setup() {
      
      
    

    //   $.ajax({
    //     url: "http://127.0.0.1:8001/user/account/register/",
    //     type: "post",
    //     data: {
    //       username: "zdd",
    //       password: "123456",
    //       confirmedPassword: "123456"
    //     },
    //     success(resp) {
    //         console.log(resp);
    //       },
    //     error(resp) {
    //       console.log(resp);
    //     }
    //   });
    }
    
  }
</script>

<style>
  body {
    background: url("./assets/images/background.png");
    background-size : cover;
  }
</style>
