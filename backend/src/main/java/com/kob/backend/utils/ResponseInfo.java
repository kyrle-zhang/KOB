package com.kob.backend.utils;

import com.alibaba.fastjson2.JSON;

/**
 * 统一API响应结果封装
 */
public class ResponseInfo {
    private int code;
    private String message;
    private Object data;

    public ResponseInfo setCode(ResponseCode responseCode) {
        this.code = responseCode.code();
        return this;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public ResponseInfo setMessage(String message) {
        this.message = message;
        return this;
    }

    public Object getData() {
        return data;
    }

    public ResponseInfo setData(Object data) {
        this.data = data;
        return this;
    }

    @Override
    public String toString() {
        return JSON.toJSONString(this);
    }
}
