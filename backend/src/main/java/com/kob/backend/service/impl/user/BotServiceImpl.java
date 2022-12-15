package com.kob.backend.service.impl.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.BotMapper;
import com.kob.backend.pojo.Bot;
import com.kob.backend.pojo.User;
import com.kob.backend.service.impl.utils.UserDetailsImpl;
import com.kob.backend.service.user.BotService;
import com.kob.backend.utils.ResponseInfo;
import com.kob.backend.utils.ResponsePreprocessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.util.List;

/**
 * <p>
 * bot业务接口实现类
 * </p>
 *
 * @author 张冬冬
 * @since 2022/12/12
 */
@Service
public class BotServiceImpl implements BotService {

    @Autowired
    BotMapper botMapper;

    @Override
    public ResponseInfo add(Bot bot) {
        if(bot.getTitle() == null || bot.getTitle().length() == 0) {
            return ResponsePreprocessor.genFailResult("机器人名不能为空");
        }
        if(bot.getTitle().length() > 50) {
            return ResponsePreprocessor.genFailResult("机器人名长度不能超过50");
        }
        if(bot.getContent() == null || bot.getContent().length() == 0) {
            return ResponsePreprocessor.genFailResult("运行代码不能为空");
        }
        if(bot.getContent().length() > 10000) {
            return ResponsePreprocessor.genFailResult("运行代码长度不能超过10000");
        }
        if(bot.getDescription() == null || bot.getDescription().length() == 0) {
            return ResponsePreprocessor.genFailResult("描述不能为空");
        }
        if(bot.getDescription().length() > 255) {
            return ResponsePreprocessor.genFailResult("描述长度不能超过10000");
        }
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl loginUser = (UserDetailsImpl) authenticationToken.getPrincipal();
        User user = loginUser.getUser();
        bot.setUserId(user.getId());
        Date time = new Date();
        bot.setCreateTime(time);
        bot.setModifyTime(time);
        bot.setRating(0);
        botMapper.insert(bot);
        return ResponsePreprocessor.genSuccessResult();
    }

    @Override
    public ResponseInfo getList() {
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl loginUser = (UserDetailsImpl) authenticationToken.getPrincipal();
        User user = loginUser.getUser();
        QueryWrapper<Bot> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("user_id",user.getId());
        List<Bot> bots = botMapper.selectList(queryWrapper);
        return ResponsePreprocessor.genSuccessResult(bots);
    }

    @Override
    public ResponseInfo update(Bot bot) {
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl loginUser = (UserDetailsImpl) authenticationToken.getPrincipal();
        User user = loginUser.getUser();
        Bot oldBot = botMapper.selectById(bot.getId());
        if(oldBot == null) {
            return ResponsePreprocessor.genFailResult("删除的Bot不存在");
        }
        if(oldBot.getUserId() != user.getId()) {
            return ResponsePreprocessor.genFailResult("你无权修改该Bot");
        }
        bot.setModifyTime(new Date());
        botMapper.updateById(bot);
        return ResponsePreprocessor.genSuccessResult();
    }

    @Override
    public ResponseInfo delete(Integer id) {
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl loginUser = (UserDetailsImpl) authenticationToken.getPrincipal();
        User user = loginUser.getUser();
        Bot bot = botMapper.selectById(id);
        if(bot == null) {
            return ResponsePreprocessor.genFailResult("该Bot不存在");
        }
        if(bot.getUserId() != user.getId()) {
            return ResponsePreprocessor.genFailResult("你无权删除该Bot");
        }
        botMapper.deleteById(id);
        return ResponsePreprocessor.genSuccessResult();
    }
}
