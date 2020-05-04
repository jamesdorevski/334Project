package com.in28minutes.rest.basic.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationBean {

    private String message;

    public AuthenticationBean(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return(String.format("HelloWorldBean [message=%s]", message));
    }
}
