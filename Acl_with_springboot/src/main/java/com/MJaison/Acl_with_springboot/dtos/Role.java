package com.MJaison.Acl_with_springboot.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
public class Role {
    private @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "is_read")
    private boolean isRead;
    @Column(name = "is_write")
    private boolean isWrite;
    @Column(name = "is_delete")
    private boolean isDelete;
    @Column(name = "is_create")
    private boolean isCreate;
    @Column(name = "resource")
    private String resource;



    @JsonIgnore
    @OneToMany(mappedBy = "role")
    Set<UserRole> users;

    public Role(String name, boolean isRead, boolean isWrite, boolean isDelete, boolean isCreate, boolean isAdmin, String resource, Set<UserRole> users) {
        this.name = name;
        this.isRead = isRead;
        this.isWrite = isWrite;
        this.isDelete = isDelete;
        this.isCreate = isCreate;
        this.resource = resource;
        this.users = users;
    }


    public Role() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    public boolean isWrite() {
        return isWrite;
    }

    public void setWrite(boolean write) {
        isWrite = write;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public boolean isCreate() {
        return isCreate;
    }

    public void setCreate(boolean create) {
        isCreate = create;
    }

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }

    public Set<UserRole> getUsers() {
        return users;
    }

    public void setUsers(Set<UserRole> users) {
        this.users = users;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role = (Role) o;
        return isRead == role.isRead &&
                isWrite == role.isWrite &&
                isDelete == role.isDelete &&
                isCreate == role.isCreate &&
                Objects.equals(id, role.id) &&
                Objects.equals(name, role.name) &&
                Objects.equals(resource, role.resource) &&
                Objects.equals(users, role.users);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, isRead, isWrite, isDelete, isCreate, resource);
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", isRead=" + isRead +
                ", isWrite=" + isWrite +
                ", isDelete=" + isDelete +
                ", isCreate=" + isCreate +
                ", resource='" + resource + '\'' +
                '}';
    }
}
