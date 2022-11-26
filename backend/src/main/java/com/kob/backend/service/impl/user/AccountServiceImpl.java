package com.kob.backend.service.impl.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import com.kob.backend.service.impl.utils.UserDetailsImpl;
import com.kob.backend.service.user.AccountService;
import com.kob.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Map<String, String> getToken(String username, String password) { //获取jwt令牌
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username, password);
        Authentication authenticate = authenticationManager.authenticate(authenticationToken); //登陆失败会自动处理
        UserDetailsImpl loginUser = (UserDetailsImpl) authenticate.getPrincipal();
        User user = loginUser.getUser();
        String jwt = JwtUtil.createJWT(user.getId().toString());
        Map<String,String> res = new HashMap<>();
        res.put("error_message", "success");
        res.put("token", jwt);
        return res;
    }

    @Override
    public Map<String, String> getInfo() { //登录成功后获取用户信息
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl loginUser = (UserDetailsImpl) authenticationToken.getPrincipal();
        User user = loginUser.getUser();
        Map<String, String> res = new HashMap<>();
        res.put("error_message", "success");
        res.put("username", user.getUsername());
        res.put("password", user.getPassword());
        res.put("photo", user.getPhoto());
        return res;
    }

    //登陆验证
    @Override
    public Map<String, String> register(String username, String password, String confirmedPassword) {
        Map<String, String> res = new HashMap<>();
        if(username == null) {
            res.put("error_message", "用户名不能为空");
            return res;
        }

        if(password == null || confirmedPassword == null || password.length() == 0 || confirmedPassword.length() == 0) {
            res.put("error_message", "密码不能为空");
            return res;
        }

        username = username.trim();
        if(username.length() == 0) {
            res.put("error_message", "用户名不能为空");
            return res;
        }

        if(password.length() > 100 || confirmedPassword.length() > 100) {
            res.put("error_message", "密码长度不能超过100");
            return res;
        }

        if(!password.equals(confirmedPassword)) {
            res.put("error_message", "两次输入的密码不相同");
            return res;
        }

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username);
        List<User> userList = userMapper.selectList(queryWrapper);
        if(!userList.isEmpty()) {
            res.put("error_message", "用户名已存在");
            return res;
        }

        String encodePassword = passwordEncoder.encode(password);
        User user = new User(null, username, encodePassword, "https://cdn.acwing.com/media/user/profile/photo/199387_lg_f925f6d22d.jpg");
        userMapper.insert(user);
        res.put("error_message", "success");
        return res;
    }
}
