import React, { Component } from 'react';
import { login } from '../../userFunctions';

class Login extends Component {

    state = {
        email:'',
        password: '',
        error: {}
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    submitHandler = (e) => {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        if (this.state.username === '' || this.state.password === ''){
            window.alert("Please fill in all fields!");
        }
        login(user).then(res => {
            if (typeof res === 'object') { 
                window.alert("Account not found! Please try again")
                localStorage.clear()
                window.location.reload()
            }
            else{   
                this.props.history.push(`/`)
            }
        }
        )
    }

    render(){
        return (
            <div>
                <form onSubmit={(e) => this.submitHandler(e)}>
                    <div>
                        <label>email</label>
                        <input 
                        name='email'
                        type="text"
                        value={this.state.email}
                        onChange={(e) => this.changeHandler(e)}/>
                    </div>
                    <div>
                        <label>password</label>
                        <input 
                        type="password"
                        name='password'
                        value={this.state.password}
                        onChange={(e) => this.changeHandler(e)}/>
                    </div>
                    <button>Log in</button>
                </form>
            </div> 
        )
        
    }


}

export default Login;