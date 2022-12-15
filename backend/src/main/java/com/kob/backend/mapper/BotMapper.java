package com.kob.backend.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kob.backend.pojo.Bot;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * bot Mapper接口
 * </p>
 *
 * @author 张冬冬
 * @since 2022/12/12
 */
@Mapper
public interface BotMapper extends BaseMapper<Bot> {
}
