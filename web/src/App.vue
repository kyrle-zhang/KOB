<!--
 * @Author: kyrle
 * @Date: 2022-11-08 21:16:51
 * @LastEditTime: 2022-11-12 17:04:53
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
  import $ from "jquery";

  export default {
    components: {
      NavBar
    },

    setup() {
      $.ajax({
          url: "http://127.0.0.1:8001/user/account/token/",
          type: "post",
          data: {
            username: "admin",
            password: "123"
          },
          success(resp) {
            console.log(resp);
          },
          error(resp) {
            console.log(resp);
          }
      });
      
      $.ajax({
        url: "http://127.0.0.1:8001/user/account/info/",
        type: "get",
        Headers: {
          Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyMDdmMTJkZmM1YjE0MTM2YTFiNjQ4NzkxMzg4Y2YxZSIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTY2ODI0Mzg3OCwiZXhwIjoxNjY5NDUzNDc4fQ.uGpRp_n3IlVB9y-In_jZexolMswYhy7CHx1djEGSWSo"
        },
        success(resp) {
            console.log(resp);
          },
          error(resp) {
            console.log(resp);
          }
      })
    }
    
  }
</script>

<style>
  body {
    background: url("./assets/images/background.png");
    background-size : cover;
  }
</style>
