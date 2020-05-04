import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService';

class LoginComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: 'in28minutes',
            password: '',
            loginFailed: false,
            showSuccessMessage: false
        }
    }

    handleChange = (event) => {
        this.setState( { [event.target.name]: event.target.value })
    }

    loginClicked = () => {

        AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        .then(
            () => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                this.props.history.push(`/welcome/${this.state.username}`) //history API - research, TICKS
            }
        ).catch( () => {
            this.setState({showSuccessMessage: false})
            this.setState({loginFailed: true})
        })
    }

    render () {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.loginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button className="btn" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        );
    }
}

export default LoginComponent;