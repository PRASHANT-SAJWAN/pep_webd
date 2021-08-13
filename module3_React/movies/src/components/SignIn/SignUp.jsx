import React, { Component } from 'react'

class SignUp extends Component {
    state = {
        email: "",
        password: "",
        username: "",
    };

    setUsername = (username) => {
        this.setState({ ...this.state, username: username });
    }

    setEmail = (email) => {
        this.setState({ ...this.state, email: email });
    }

    setPassword = (password) => {
        this.setState({ ...this.state, password: password });
    }

    render() {
        return (<div>
            <div>
                Username <input value={this.state.username} type="text" onChange={(e) => this.setUsername(e.target.value)} />
            </div>
            <br />
            <div>
                Email <input value={this.state.email} type="text" onChange={(e) => this.setEmail(e.target.value)} />
            </div>
            <br />
            <div>
                Password <input value={this.state.password} type="text" onChange={(e) => this.setPassword(e.target.value)} />
            </div>
            <br />
            <button onClick={() => this.props.handleSignUp(this.state.email, this.state.password)}>Sign Up</button>
        </div>);
    };
}

export default SignUp;