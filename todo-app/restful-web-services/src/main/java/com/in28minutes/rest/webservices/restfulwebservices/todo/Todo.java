package com.in28minutes.rest.webservices.restfulwebservices.todo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
public class Todo {
    private Long id;
    private String username;
    private String description;
    private Date targetDate;
    private boolean isDone;

    protected Todo(){}
//    @Override
//    public boolean equals(Object obj) {
//        if(this == obj)
//            return true;
//        if (obj == null)
//            return false;
//        if (getClass() != obj.getClass())
//            return false;
//        Todo other = (Todo) obj;
//        if (this.id != other.id)
//            return false;
//        return true;
//    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Todo)) return false;
        Todo todo = (Todo) o;
        return id.equals(todo.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

