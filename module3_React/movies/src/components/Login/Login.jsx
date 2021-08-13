import React, { Component } from 'react'
import { useHistory } from 'react-router-dom';

class Login extends Component {
    state = {
        email: "ken@gmail.com",
        password: "123456",
    };


    setEmail = (email) => {
        this.setState({ ...this.state, email: email });
    }

    setPassword = (password) => {
        this.setState({ ...this.state, password: password });
    }

    handleLogin() {
        try {
            this.props.handleLogin(this.state.email, this.state.password);
            console.log(this.props.user);
        } catch (err) {
            console.log(this.props.user);
        }
    }

    render() {
        return (<div>
            <div>
                Email <input value={this.state.email} type="text" onChange={(e) => this.setEmail(e.target.value)} />
            </div>
            <br />
            <div>
                Password <input value={this.state.password} type="text" onChange={(e) => this.setPassword(e.target.value)} />
            </div>
            <br />
            <button onClick={() => this.handleLogin(this.state.email, this.state.password)}>Login</button>
        </div>);
    };
}

export default Login;