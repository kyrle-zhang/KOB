package com.kob.backend.service.user;

import com.kob.backend.pojo.Bot;
import com.kob.backend.utils.ResponseInfo;

import java.util.Map;

/**
 * <p>
 * bot业务接口
 * </p>
 *
 * @author 张冬冬
 * @since 2022/12/12
 */
public interface BotService {

    ResponseInfo add(Bot bot);

    ResponseInfo getList();

    ResponseInfo update(Bot bot);

    ResponseInfo delete(Integer id);
}
