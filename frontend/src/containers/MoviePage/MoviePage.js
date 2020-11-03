import React, { Component } from 'react'; 
import Button from '../../components/Button/Button';
import Model from '../../components/Model/Model';
import { getMovieInfo, checkUserFav, addToFav, deleteFromFav } from '../../userFunctions';
import jwt_decode from 'jwt-decode';

class MoviePage extends Component{
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
        email:''
    }

    componentDidMount = () => {
        console.log(this.props.mvId);
        
        const query = {
            mvId: this.props.mvId
        }
        //1. fetch info of the movie
        getMovieInfo(query).then(result => {
            console.log('returned res',result);
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
        });
        //2. check the LIKE table and change the savedToFav in this.state
        if (localStorage.usertoken){
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)
            this.setState({
                email: decoded.identity.email
            });

            const query2 = {
                mvId: this.props.mvId,
                email: this.state.email
            }

            checkUserFav(query2).then(res => {
                console.log('returned res',res);
                if (!res.error) {
                    this.setState({
                        savedToFav: true
                    });
                }
            })
        }
    }

    clickHandler = () => {
        if (!this.state.savedToFav) {
            this.setState({
                savedToFav: true,
                btnType: 'Delete'
            });
            if (this.state.email){
                const like = {
                    email: this.state.email,
                    mvId: this.state.id
                }
                addToFav(like).then(res => {
                    console.log(res);
                })
            }
        } else {
            this.setState({
                savedToFav: false,
                btnType: 'Save'
            });
            if (this.state.email){
                const like = {
                    email: this.state.email,
                    mvId: this.state.id
                }
                deleteFromFav(like).then(res => {
                    console.log(res);
                })
            }
        }
    }

    render(){
        return(
            <div>
                <h3>{this.state.title}</h3>
                <p>{this.state.genres}</p>
                <p>Year: {this.state.release_year}</p>
                <p>Rating: {this.state.vote_average}</p>
                <p>Language: {this.state.original_language}</p> 
                <p>Runtime: {this.state.runtime}</p>
                <div>Directors: {this.state.directors}</div>
                <div>Cast: {this.state.actors}</div>
                <p>Overview: {this.state.overview}</p>
                <Button clicked={this.clickHandler.bind(this)} btnType={this.state.btnType}>Like</Button>
                <Model></Model>
            </div>
        );
        
    }
}

export default MoviePage;