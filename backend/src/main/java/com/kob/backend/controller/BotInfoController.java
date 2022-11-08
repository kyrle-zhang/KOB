package com.kob.backend.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/pk/")
public class BotInfoController {

    @RequestMapping("getbotinfo/")
    public Map<String,String> getBotInfo(){
        Map<String,String> map = new HashMap<>();
        map.put("power","22");
        map.put("name","apple");
        return map;
    }

}
