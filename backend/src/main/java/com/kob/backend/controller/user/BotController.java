package com.kob.backend.controller.user;

import com.kob.backend.pojo.Bot;
import com.kob.backend.service.user.BotService;
import com.kob.backend.utils.ResponseInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 * bot 前端控制器
 * </p>
 *
 * @author 张冬冬
 * @since 2022/12/12
 */
@RestController
@RequestMapping("/user/bot/")
public class BotController {

    @Autowired
    BotService botService;

    @PostMapping("add/")
    public ResponseInfo add(@RequestBody Bot bot) {
        return botService.add(bot);
    }

    @PostMapping("update/")
    public ResponseInfo update(@RequestBody Bot bot) {
        return botService.update(bot);
    }

    @PostMapping("delete/{id}")
    public ResponseInfo delete(@PathVariable("id") String id) {
        return botService.delete(Integer.valueOf(id));
    }

    @GetMapping("getlist/")
    public ResponseInfo getList() {
        return botService.getList();
    }

}
