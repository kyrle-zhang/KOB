<!--
 * @Author: kyrle
 * @Date: 2022-11-09 15:29:29
 * @LastEditTime: 2022-11-10 11:45:45
 * @FilePath: \web\src\components\GameMap.vue
 * @Description: 
-->
<template>
    <div ref="parent" class="gamemap">
        <canvas ref="canvas" tabindex="0"></canvas>
    </div>
    
</template>

<script>
    import { GameMap } from "../assets/scripts/GameMap";
    import { ref,onMounted } from "vue";

    export default {
        setup() {
            let parent = ref(null);
            let canvas = ref(null);
            onMounted(() => {
                new GameMap(canvas.value.getContext("2d"),parent.value)
            });

            return {
                parent,
                canvas
            }
        }
    }

</script>

<style scoped>
    div.gamemap {
        width : 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center; 
    }
</style>