<!--
 * @Author: kyrle
 * @Date: 2022-11-09 15:21:44
 * @LastEditTime: 2022-11-09 15:30:52
 * @FilePath: \web\src\components\PlayGround.vue
 * @Description: 
-->
<template>
    <div class="playground">
        <GameMap/>
    </div>
</template>

<script>
import GameMap from "./GameMap.vue"
export default {
    components : {
        GameMap
    }
}

</script>

<style scoped>
    div.playground {
        width: 60vw;
        height: 70vh;
        background-color: lightblue;
        margin: 40px auto;
    }
</style>