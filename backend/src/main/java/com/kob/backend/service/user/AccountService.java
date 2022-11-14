package com.kob.backend.service.user;

import java.util.Map;

public interface AccountService {

    Map<String, String> getToken(String username, String password);

    Map<String, String> getInfo();

    Map<String, String> register(String username, String password, String confirmedPassword);
}
