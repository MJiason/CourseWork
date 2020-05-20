package com.MJaison.Acl_with_springboot.controllers;

public class AuthenticationBean {
    private String message;

    public AuthenticationBean(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
