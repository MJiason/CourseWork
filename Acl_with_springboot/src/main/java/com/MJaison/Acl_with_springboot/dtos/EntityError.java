package com.MJaison.Acl_with_springboot.dtos;

public class EntityError {
    public String errCode;
    public String description;

    public EntityError(String errCode, String description) {
        this.errCode = errCode;
        this.description = description;
    }
}
