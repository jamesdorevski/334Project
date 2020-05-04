import Axios from "axios";

class TodoDataService {
    retrieveAllTodos(name){
        return Axios.get(`http://localhost:8080/users/${name}/todos`);
    }

    retrieveTodo(name, id){
        return Axios.get(`http://localhost:8080/users/${name}/todos/${id}`);
    }

    deleteTodo(name, id){
        return Axios.delete(`http://localhost:8080/users/${name}/todos/${id}`);
    }

    updateTodo(name, id, todo){
        return Axios.put(`http://localhost:8080/users/${name}/todos/${id}`, todo);
    }

    createTodo(name, todo){
        return Axios.post(`http://localhost:8080/users/${name}/todos/`, todo);
    }
}

export default new TodoDataService();