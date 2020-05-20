package com.MJaison.Acl_with_springboot.dtos;



public class CreateUserRequest {



    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private long roleId;

    public CreateUserRequest(String username, String password, String firstName, String lastName) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public CreateUserRequest() {
    }

    public User  getUser() {
        return new  User(this.getUsername(), this.getPassword(), this.getFirstName(), this.getLastName());
    }

    public void setPassword(String password) {
        this.password = password;
    }



    public String getUsername() {
        return username;
    }

    public long getRoleId() {
        return roleId;
    }

    public void setRoleId(long roleId) {
        this.roleId = roleId;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


}
