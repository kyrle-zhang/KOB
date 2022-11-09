<!--
 * @Author: kyrle
 * @Date: 2022-11-09 10:24:59
 * @LastEditTime: 2022-11-09 10:54:04
 * @FilePath: \web\src\components\ContentFeild.vue
 * @Description: 
-->
<template>
    <div class="container content-field">
        <div class="card">
            <div class="card-body">
                <slot></slot>
            </div>
        </div>
    </div>             
</template>

<script>
</script>

<style scoped>
    div.content-field {
        margin-top: 20px;
    }
</style>