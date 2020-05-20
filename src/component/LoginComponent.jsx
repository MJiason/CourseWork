import React, { Component } from 'react'
import AuthenticationService from '../service/AuthenticationService';


class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }


    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked = () => {

        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((resp) => {
                console.log(resp);
                console.log(resp.data);
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, resp.data.token);
                this.props.history.push(`/courses`);
            }).catch((error) => {
            this.setState({ showSuccessMessage: false });
            this.setState({ hasLoginFailed: true });
            if (error.response.data){
                alert(JSON.stringify(error.response.data));
                return;
            }

            alert(error);
        })
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

export default LoginComponent