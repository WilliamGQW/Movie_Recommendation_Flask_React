import React, { Component } from 'react';
import { register } from '../../userFunctions';

class Register extends Component {

    state = {
        email:'',
        password: '',
        error: {}
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    submitHandler = (e) => {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        if (this.state.username === '' || this.state.password === ''){
            window.alert("Please fill in all fields!");
        }

        register(user).then(res => {
            if (typeof res === 'object') { 
                this.props.history.push(`/login`);
            }
            else{
                localStorage.clear();
            }
        }
        )
    }

    render(){
        return(
            <div>
                <form onSubmit={e => this.submitHandler(e)}>
                    <div>
                        <label>email</label>
                        <input 
                        name='email'
                        type='text'
                        value={this.state.email}
                        onChange={e => this.changeHandler(e)}/>
                    
                    </div>
                    <div>
                        <label>password</label>
                        <input 
                        name='password'
                        type='password'
                        value={this.state.password}
                        onChange={e => this.changeHandler(e)}/>
                    </div>
                    <button>Register</button>
                </form>
            </div> 
        )
    }


}

export default Register;