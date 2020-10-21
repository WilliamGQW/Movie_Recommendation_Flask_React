import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import styles from './Layout.module.css';
import { connect } from 'react-redux';

class Layout extends Component {
    
    
    render(){
       return (
        <Aux>
            <Toolbar isAuthenticated={this.props.token}/>
            <main className = {styles.Content}>
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