/*
 * @Author: kyrle
 * @Date: 2022-11-19 08:39:03
 * @LastEditTime: 2022-11-26 09:30:24
 * @FilePath: \web\src\store\user.js
 * @Description: 用户模块的属性及方法
 */
import $ from 'jquery'

export default {
  state: {
    id: "",
    username: "",
    photo: "",
    token: "",
    is_login: false,
  },
  getters: {
  },
  mutations: {
    updateUser(state, user) {
        state.id = user.id;
        state.username = user.username;
        state.photo = user.photo;
        state.is_login = user.is_login;
    },
    updateToken(state, token) {
        state.token = token;
    },
    logout(state) {//将存在本地的token删除即可实现退出登录功能
        state.id = "";
        state.username = "";
        state.photo = "";
        state.token = "";
        state.is_login = false;
    }
  },
  actions: {
    login(context, data) {
        $.ajax({
            url: "http://127.0.0.1:8001/user/account/token/",
            type: "post",
            data: {
              username: data.username,
              password: data.password,
            },
            success(resp) {
                if(resp.error_message == "success") {
                    //将token存到浏览器本地的硬盘中
                    localStorage.setItem("jwt_token",resp.token);
                    context.commit("updateToken", resp.token);
                    data.success(resp);
                }else{
                    data.error(resp);
                }
            },
            error(resp) {
                data.error(resp);
            }
        });
    },

    register(context, data) {
        $.ajax({
            url: "http://127.0.0.1:8001/user/account/register/",
            type: "post",
            data: {
              username: data.username,
              password: data.password,
              confirmedPassword: data.confirmedPassword,
            },
            success(resp) {
                if(resp.error_message == "success") {
                    data.success(resp);
                }else{
                    data.error(resp);
                }
            },
            error(resp) {
                data.error(resp);
            }
        });
    },
    getInfo(context, data) {
        $.ajax({
            url: "http://127.0.0.1:8001/user/account/info/",
            type: "get",
            headers: {
              Authorization: "Bearer " + context.state.token,
            },
            success(resp) {
                if(resp.error_message === "success") {
                    context.commit("updateUser", {
                        ...resp,
                        is_login: true,
                    });
                    data.success(resp);
                } else {
                    data.error(resp);
                }
            },
            error(resp) {
                data.error(resp);
            }
          });
    },
    logout(context) {
        //将token从浏览器本地的硬盘中删除
        localStorage.removeItem("jwt_token");
        context.commit("logout");
    }
  },
  modules: {
  }
}
