import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import styles from './Layout.module.css';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';

class Layout extends Component {

    state = {
        email: '',
        password: '',
        isAuthenticated: false
    }

    componentDidMount() {
        console.log(localStorage.usertoken);
        if (localStorage.usertoken) {
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)
            console.log('decode', decoded);
            console.log('decode', decoded.identity.email);
            this.setState({
                email: decoded.identity.email,
                password: decoded.identity.password
            })
            if (this.state.email !== '' && this.state.password !== '') {
                this.setState({ isAuthenticated: true });
            }
        }

    }



    render() {
        return (
            <Aux>
                <Toolbar isAuthenticated={this.state.isAuthenticated} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

};

// const mapStateToProps = state => {
//     return {
//         token: state.auth.token
//     }
// }

export default Layout;