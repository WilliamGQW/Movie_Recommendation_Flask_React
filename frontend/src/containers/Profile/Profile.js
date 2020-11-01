import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

class Profile extends Component {
    state= {
        email: '',
        username: ''
    }

    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            username: decoded.identity.username,
            email: decoded.identity.email
        })
    }


    render(){
        return(
            <div>
                <div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td className="badge badge-dark text-white col-8">User: </td>
                                <td>{this.state.username}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3>Favorite List</h3>
                </div> 
                <div>
                    <h3>Recommended Movies</h3>
                </div> 
            </div>
        )
    }


}

export default Profile;