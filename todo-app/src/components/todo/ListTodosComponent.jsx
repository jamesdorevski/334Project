import React, { Component } from 'react';
import moment from 'moment';
import TodoDataService from '../../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';

class ListTodosComponent extends Component {
    constructor(props) { //don't have initial API calls in constructor
        super(props)

        this.state = {
            todos : [],
            message: null
        }
    }

    componentDidMount = () => { //not good practice to call from other functions
        this.refreshTodos()
    }

    refreshTodos = () => {
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveAllTodos(username)
        .then(response => {
            this.setState({todos: response.data});
        })
    }

    deleteTodoCLicked = (id) => {
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.deleteTodo(username, id)
        .then(
            response => {
                this.setState({ message: `Delete of todo ${id} successful.`});
                this.refreshTodos();
            }
        )
    }

    updateTodoCLicked = (id) => {

        this.props.history.push(`/todos/${id}`);
   
    }

    addTodoClicked = () => {

        this.props.history.push(`/todos/-1`);
   
    }

    render () {
        return (
        <div>
            <h1>List Todos</h1>
            {this.state.message && <div className="alert slert-success">{this.state.message}</div>}
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>description</th>
                            <th>is completed</th>
                            <th>target date</th>
                            <th>update</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map (
                                todo => 
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTodoCLicked(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoCLicked(todo.id)}>Delete</button></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                </div>
            </div>
        </div>
        );
    }
}

export default ListTodosComponent;