package com.kob.backend.utils;

import java.util.List;

/**
 * 响应结果生成工具
 */
public class ResponsePreprocessor {
    private static final String DEFAULT_SUCCESS_MESSAGE = "SUCCESS";

    public static ResponseInfo genSuccessResult() {
        return new ResponseInfo()
                .setCode(ResponseCode.SUCCESS)
                .setMessage(DEFAULT_SUCCESS_MESSAGE);
    }

    public static ResponseInfo genSuccessResult(String message, Object data) {
        return new ResponseInfo()
                .setCode(ResponseCode.SUCCESS)
                .setMessage(message)
                .setData(data);
    }
    public static ResponseInfo genSuccessResult(Object data) {
        return new ResponseInfo()
                .setCode(ResponseCode.SUCCESS)
                .setMessage(DEFAULT_SUCCESS_MESSAGE)
                .setData(data);
    }

    public static ResponseInfo genFailResult(String message) {
        return new ResponseInfo()
                .setCode(ResponseCode.INTERNAL_SERVER_ERROR)
                .setMessage(message);
    }

    public static ResponseInfo genFailResult(List<String> message){
        return new ResponseInfo()
                .setCode(ResponseCode.INTERNAL_SERVER_ERROR)
                .setData(message);
    }
}
