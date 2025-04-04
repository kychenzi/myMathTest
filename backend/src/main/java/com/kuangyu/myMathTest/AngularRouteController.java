package com.kuangyu.myMathTest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AngularRouteController {
    @GetMapping({"/baron", "/maeve"}) // 明確指定支援的路由
    public String redirect() {
        return "forward:/index.html";
    }
}
