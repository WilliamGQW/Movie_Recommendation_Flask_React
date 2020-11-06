import React, { Component } from 'react';
import Button from '../../components/Button/Button';
import Model from '../../components/Model/Model';
import { getMovieInfo, checkUserFav, addToFav, deleteFromFav, updateMovComment } from '../../userFunctions';
import jwt_decode from 'jwt-decode';

class MoviePage extends Component {
    state = {
        title: '',
        id: '',
        genres: '',
        release_year: '',
        vote_average: '',
        original_language: '',
        runtime: '',
        directors: '',
        actors: '',
        overview: '',
        savedToFav: false,
        btnType: 'Save',
        myemail: '',
        comment: ''
    }

    componentDidMount = () => {
        console.log(this.props.mvId);

        const query = {
            mvId: this.props.mvId
        }
        //1. fetch info of the movie
        getMovieInfo(query).then(result => {
            console.log('returned res', result);
            if (!result.error) {
                const res = result[0];
                console.log(res);
                this.setState({
                    title: res[0],
                    id: res[1],
                    genres: res[2],
                    release_year: res[3],
                    vote_average: res[4],
                    original_language: res[5],
                    runtime: res[6],
                    directors: res[7],
                    actors: res[8],
                    overview: res[9]
                });
            }
        })

        console.log(this.state);
        //2. check the LIKE table if the user has liked this movie before
        //console.log(localStorage.usertoken);
        if (localStorage.usertoken) {
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)
            // console.log(decoded);
            const temp = decoded.identity.email;
            //console.log(typeof(temp));

            //this.setState({myemail: temp});

            // console.log('state');
            // console.log(this.state);            

            const query2 = {
                mvId: this.props.mvId,
                email: temp
            }
            //console.log(query2)

            checkUserFav(query2).then(res => {
                console.log('returned res', res);
                if (!res.error) {
                    this.setState({
                        savedToFav: true,
                        myemail: temp
                    });
                }
                else {
                    this.setState({ myemail: temp });
                }
            })
        }
    }


    clickHandler = () => {

        if (localStorage.usertoken) {
            if (!this.state.savedToFav) {
                this.setState({
                    savedToFav: true,
                    btnType: 'Delete'
                });
                const token = localStorage.usertoken
                const decoded = jwt_decode(token)
                // console.log(decoded);
                const temp = decoded.identity.email;
                const like = {
                    email: temp,
                    mvId: this.state.id,
                    title: this.state.title
                }
                console.log(like);
                addToFav(like).then(res => {
                    console.log(res);
                })
            } else {
                this.setState({
                    savedToFav: false,
                    btnType: 'Save'
                });
                const token = localStorage.usertoken
                const decoded = jwt_decode(token)
                // console.log(decoded);
                const temp = decoded.identity.email;
                const like = {
                    email: temp,
                    mvId: this.state.id,
                    title: this.state.title
                }
                console.log(like);
                deleteFromFav(like).then(res => {
                    console.log(res);
                })
            }
        }
    }

    submitHandler = (e) => {
        e.preventDefault();
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        // console.log(decoded);
        const temp = decoded.identity.email;
        const lst = [this.state.comment, temp, this.props.mvId]
        const update = {
            query: lst
        }
        console.log(update);
        updateMovComment(update).then(res => {
            console.log(res)
        });
    }

    changeInputHandler = (e) => {
        this.setState({ comment: [e.target.value] });
    }

    render() {
        return (
            <div>
                <h3>{this.state.title}</h3>
                <p>{this.state.genres}</p >
                <p>Year: {this.state.release_year}</p >
                <p>Rating: {this.state.vote_average}</p >
                <p>Language: {this.state.original_language}</p >
                <p>Runtime: {this.state.runtime}</p >
                <div>Directors: {this.state.directors}</div>
                <div>Cast: {this.state.actors}</div>
                <p>Overview: {this.state.overview}</p >
                <Button clicked={this.clickHandler.bind(this)} btnType={this.state.btnType}>Like</Button>
                <Model></Model>
                { this.state.savedToFav ?
                    <form onSubmit={this.submitHandler}>
                        <input onChange={(event) => this.changeInputHandler(event)} value={this.state.comment}></input>
                        <button>Update your comment!</button>
                    </form>
                    : null}
            </div>
        );

    }
}

export default MoviePage;