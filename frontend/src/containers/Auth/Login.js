import React, { Component } from 'react';
import { login } from '../../userFunctions';

class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            error: {}
        }

        this.changeHandler = this.changeHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = (e) => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        if (this.state.email === '' || this.state.password === '') {
            window.alert("Please fill in all fields!");
        }

        login(user).then(res => {
            console.log(res);
            if (typeof res === 'object') {

                window.alert("Account not found! Please try again")
                localStorage.clear()
                //window.location.reload()
            }
            else {
                //console.log(localStorage.usertoken);
                this.props.history.push(`/`)

            }

        })
    }

    render() {
        return (
            <div>
                <form onSubmit={e => this.submitHandler(e)}>
                    <div>
                        <label>email</label>
                        <input
                            name='email'
                            type='text'
                            value={this.state.email}
                            onChange={e => this.changeHandler(e)} />

                    </div>
                    <div>
                        <label>password</label>
                        <input
                            name='password'
                            type='password'
                            value={this.state.password}
                            onChange={e => this.changeHandler(e)} />
                    </div>
                    <button>Login</button>
                </form>
            </div>
        )
    }


}

export default Login;