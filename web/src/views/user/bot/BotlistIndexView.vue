<!--
 * @Author: kyrle
 * @Date: 2022-11-09 10:31:43
 * @LastEditTime: 2022-12-15 15:00:54
 * @FilePath: \web\src\views\user\bot\BotlistIndexView.vue
 * @Description: 
-->
<template>
    <div class="container">
        <div class="row" style="margin-top:20px">
            <div class="col-3">
                <div class="card">
                    <div class="card-body">
                        <img :src="$store.state.user.photo" style="width:100%">
                    </div>
                </div>
            </div>

            <div class="col-9">
                <div class="card">
                    <div class="card-header ">
                        <span style="font-size:130%">我的Bot</span>
                        <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#addModal">创建Bot</button>
                    </div>

                    <div class="card-body">
                        <!--  Bot展示表格 -->
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>名称</th>
                                    <th>描述</th>
                                    <th>创建时间</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="bot in bots" :key="bot.id">
                                    <td>{{ bot.title }}</td>
                                    <td>{{ bot.description }}</td>
                                    <td>{{ bot.createTime }}</td>
                                    <td>
                                        <button type="button" class="btn btn-success" style="margin-right:10px" @click="handleUpdate(bot)" data-bs-toggle="modal" data-bs-target="#updateModal">修改</button>
                                        <button type="button" class="btn btn-danger" @click="deleteBot(bot)">删除</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- 新增模态窗口 -->
                        <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">新增Bot</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="title" class="col-form-label">名称</label>
                                        <input v-model="newBot.title" type="text" class="form-control" id="title">
                                    </div>
                                    <div class="mb-3">
                                        <label for="description" class="col-form-label">描述</label>
                                        <textarea v-model="newBot.description" class="form-control" id="description" rows="3"></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="content" class="col-form-label">代码</label>
                                        <VAceEditor
                                            v-model:value="newBot.content"
                                            :options="{fontSize: 18}" 
                                            @init="editorInit"
                                            lang="c_cpp"
                                            theme="textmate"
                                            style="height: 300px" />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" @click="addBot">创建</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                            </div>
                            </div>
                        </div>
                        </div>

                        <!-- 修改模态窗口 -->
                        <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">更新Bot</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="title" class="col-form-label">名称</label>
                                        <input v-model="updateNewBot.title" type="text" class="form-control" id="title">
                                    </div>
                                    <div class="mb-3">
                                        <label for="description" class="col-form-label">描述</label>
                                        <textarea v-model="updateNewBot.description" class="form-control" id="description" rows="3"></textarea>
                                    </div>
                                    <div class="mb-3">
                                        <label for="content" class="col-form-label">代码</label>
                                        <VAceEditor
                                            v-model:value="updateNewBot.content"
                                            :options="{fontSize: 18}" 
                                            @init="editorInit"
                                            lang="c_cpp"
                                            theme="textmate"
                                            style="height: 300px" />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" @click="updateBot">更新</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
    import $ from 'jquery'
    import { useStore } from 'vuex'
    import {ref, reactive} from 'vue'
    import { Modal } from 'bootstrap/dist/js/bootstrap'
    import { VAceEditor } from 'vue3-ace-editor';
    import ace from 'ace-builds';
    
    ace.config.set(
    "basePath", 
    "https://cdn.jsdelivr.net/npm/ace-builds@" + require('ace-builds').version + "/src-noconflict/")

    const store = new useStore();
    const bots = ref([]);
    const newBot = reactive({
        title: '',
        description: '',
        content: '',
    })
    const updateNewBot = reactive({
        id: '',
        rating: '',
        createTime: '',
        userId: '',
        title: '',
        description: '',
        content: '',
    })
    const getList = () => {
        $.ajax({
            url: "http://127.0.0.1:8001/user/bot/getlist/",
            type: "get",
            headers: {
              Authorization: "Bearer " + store.state.user.token,
            },
            success(resp) {
                console.log(resp);
                bots.value = resp.data
            }
        });
    }

    const addBot = () => {
        $.ajax({
            url: "http://127.0.0.1:8001/user/bot/add/",
            type: "post",
            data: JSON.stringify(newBot),
            headers: {
              Authorization: "Bearer " + store.state.user.token,
            },
            datatype: 'json',
            contentType: 'application/json',
            success(resp) {
                if(resp.code === 200) {
                    newBot.title = '';
                    newBot.description = '';
                    newBot.content = '';
                    Modal.getInstance("#addModal").hide();
                    getList();
                }
            }
        });
    }

    const deleteBot =(bot) => {
        $.ajax({
            url: "http://127.0.0.1:8001/user/bot/delete/" + bot.id,
            type: "post",
            headers: {
              Authorization: "Bearer " + store.state.user.token,
            },
            success(resp) {
                if(resp.code === 200) {
                    getList();
                }
            }
        });
    }

    const updateBot = () => {
        $.ajax({
            url: "http://127.0.0.1:8001/user/bot/update/",
            type: "post",
            data: JSON.stringify({"id":updateNewBot.id, "title": updateNewBot.title, 
                "description": updateNewBot.description,"content": updateNewBot.content,
                "createTime": updateNewBot.createTime, "userId": updateNewBot.userId, 
                "rating": updateNewBot.rating}),
            // data: JSON.stringify(updateNewBot.value),
            headers: {
              Authorization: "Bearer " + store.state.user.token,
            },
            datatype: 'json',
            contentType: 'application/json',
            success(resp) {
                if(resp.code === 200) {
                    Modal.getInstance("#updateModal").hide();
                    getList();
                }
            }
        });
    }

    const handleUpdate = (bot) => {
        updateNewBot.title = bot.title;
        updateNewBot.description = bot.description;
        updateNewBot.content = bot.content;
        updateNewBot.id = bot.id;
        updateNewBot.userId = bot.userId;
        updateNewBot.createTime = bot.createTime;
    }

    getList();

</script>
<style scoped>
    .parent {
        display: flex;
        align-items: center;
    }
</style>