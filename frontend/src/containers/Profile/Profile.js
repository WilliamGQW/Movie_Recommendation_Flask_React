import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { getUserFav, getRecMovies } from '../../userFunctions';
import FavoriteMovies from '../../components/FavoriteMovies/FavoriteMovies';
import RecMovies from '../../components/RecMovies/RecMovies';

class Profile extends Component {
    state = {
        email: '',
        favs: [[1, 'h', 'good'], [2, 'asd', 'like it'], [3, 'akw', '!!!'], [4, 'kjhuiwhf', 'kagdfhew hejkfaef']],
        recommends: [[1, 'h', 'good'], [2, 'asd', 'like it'], [3, 'akw', '!!!'], [4, 'kjhuiwhf', 'kagdfhew hejkfaef']]
    }

    componentDidMount() {
        if (!localStorage.usertoken) {
            this.props.history.push(`/login`);
        } else {
            const token = localStorage.usertoken;
            const decoded = jwt_decode(token);
            const temp = decoded.identity.email;
            this.setState({
                email: decoded.identity.email
            })
            //console.log('decoded', decoded);
            console.log('iden', decoded.identity);
            console.log(this.state.email);

            const query = {
                email: temp
            }
            getUserFav(query).then(res => {
                console.log("------------getUserFav---------");
                console.log(res);
                if (res.movies) {
                    this.setState({ favs: res.movies, email: temp });
                }
            })

            getRecMovies(query).then(res => {
                console.log("------------getRecMovies---------");
                console.log(res);
                if (res.movies) {
                    this.setState({ recommends: res.movies, email: temp });
                }
            })

        }

    }


    clickHandler = (id) => {
        this.props.history.push(`/movie/${id}`);
    }

    render() {
        return (
            <div>
                <div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td className="badge badge-dark text-white col-8">User: {this.state.email} </td>
                                <td>{this.state.username}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h3>Favorite List</h3>
                    <div>
                        <FavoriteMovies results={this.state.favs} clicked={this.clickHandler} />
                    </div>
                </div>

                <div>
                    <h3>Recommended Movies</h3>
                    <div>
                        <RecMovies results={this.state.recommends} clicked={this.clickHandler} />
                    </div>
                </div>
            </div>
        )
    }


}

export default Profile;