import React, { Component } from 'react'; 
import Button from '../../components/Button/Button';

class MoviePage extends Component{
    state = {
        id: 1,
        genres: '',
        release_year: 2000,
        vote_average: 0,
        original_language: '',
        runtime: 100,
        directors: '',
        actors: '',
        actors: '',
        overview: '',
        savedToFav: false,
        btnType: 'Save'
    }

    componentDidMount = () => {
        console.log(this.props.mvId);
        //1. fetch info of the movie
        //2. check the LIKE table and change the savedToFav in this.state
    }

    clickHandler = () => {
        if (this.savedToFav == false) {
            this.setState({
                savedToFav: true,
                btnType: 'Delete'
            });
        } else {
            this.setState({
                savedToFav: false,
                btnType: 'Save'
            })
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
                <Button clicked={this.clickHandler} btnType={this.state.btnType}>Like</Button>
            </div>
        );
        
    }
}

export default MoviePage;