import React, { Component, View } from 'react';
// import { Text, View, StyleSheet, Image } from 'react-native';
import Button from '../../components/Button/Button';
import Model from '../../components/Model/Model';
import { getMovieInfo, checkUserFav, addToFav, deleteFromFav, updateMovComment, getPosterPath } from '../../userFunctions';
import jwt_decode from 'jwt-decode';
import NewReview from '../../components/MovieReviews/NewReview';
import Results from '../../components/MovieReviews/Results';
import styles from './MoviePage.module.css';

class MoviePage extends Component {
    state = {
        poster_path: '',
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
        comment: '',

        review: '',
        reviews: [],
        loading: true
    }

    // ------------------------------------------------------------

    handleChange = (event) => {
        this.setState({ review: event.target.value });
    }

    handleSubmit = async event => {
        console.log("handle submit review")
        event.preventDefault();
        this.setState({
            loading: true
        });
        // await fetch('/addReview/' + this.state.review + '/' + this.state.myemail + '/' + this.state.id, {
        //     method: 'GET'
        // });
        await fetch('/addReview/' + this.state.review + '/' + this.state.id + '/' + this.state.myemail, {
            method: 'GET'
        });
        this.getReviews(this.state.id);
    }

    //   get all reviews and print them out
    getReviews(mid) {
        console.log("getReviews got called!!!!")
        fetch('/getReviews/' + mid)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    review: '',
                    reviews: json,
                    loading: false
                })
            })
    }
    // ------------------------------------------------------------

    componentDidMount = () => {
        this.getReviews(this.props.mvId);
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

        getPosterPath(query).then(result => {
            console.log('returned poster path', result);
            if (!result.error) {
                const res = result;
                console.log(res);
                this.setState({
                    poster_path: res
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
        // let Image_Http_URL ={ uri: {poster_path}};

        return (
            <div>
                <div className={styles.main}>
                    <div className={styles.left} >
                        <h3>{this.state.title}</h3>
                        <img src={this.state.poster_path} alt="sorry no image available" />
                    </div>

                    {/* <img src={this.state.poster_path} alt="sorry no image available" width="500" height="600" /> */}
                    {/* <img src="http://image.tmdb.org/t/p/w92/qJ2tW6WMUDux911r6m7haRef0WH.jpg" alt="sorry no image available" /> */}
                    {/* <Card>
                    <Image src={this.state.poster_path} wrapped ui={false} />
                </Card> */}
                    <div className={styles.right}>

                        <span className={styles.ll}>Year: </span>
                        <span className={styles.ss}>{this.state.release_year}</span>

                        <p></p>
                        <span className={styles.ll}>Genres: </span>
                        <span className={styles.ss}>{this.state.genres}</span>

                        <p></p>
                        <span className={styles.ll}>Rating: </span>
                        <span className={styles.ss}>{this.state.vote_average}</span>

                        <p></p>
                        <span className={styles.ll}>Language: </span>
                        <span className={styles.ss}>{this.state.original_language}</span>

                        <p></p>
                        <span className={styles.ll}>Runtime: </span>
                        <span className={styles.ss}>{this.state.runtime}</span>

                        <p></p>
                        <span className={styles.ll}>Director(s): </span>
                        <span className={styles.ss}>{this.state.directors}</span>

                        <p></p>
                        <span className={styles.ll}>Actors: </span>
                        <span className={styles.ss}>{this.state.actors}</span>

                        <p></p>
                        <span className={styles.ll}>Overview: </span>
                        <span className={styles.ss}>{this.state.overview}</span>
                        {/* 
                        <p> Genres: {this.state.genres}</p>
                        <p>Year: {this.state.release_year}</p>
                        <p>Rating: {this.state.vote_average}</p >
                        <p>Language: {this.state.original_language}</p >
                        <p>Runtime: {this.state.runtime}</p >
                        <div>Directors: {this.state.directors}</div>
                        <p></p>
                        <div>Cast: {this.state.actors}</div>
                        <p>Overview: {this.state.overview}</p > */}

                    </div>


                </div>


                <div className={styles.bottom}>
                    <div className={styles.bottomLeft}>
                        <Button clicked={this.clickHandler.bind(this)} btnType={this.state.btnType}>Like</Button>
                        <Model></Model>
                        {this.state.savedToFav ?
                            <form onSubmit={this.submitHandler}>
                                <input onChange={(event) => this.changeInputHandler(event)} value={this.state.comment}></input>
                                <button>Update your comment!</button>
                            </form>
                            : null}
                    </div>

                </div>

                <div className={styles.foot}>
                    <NewReview handleChange={this.handleChange} handleSubmit={this.handleSubmit} value={this.state.review} />
                    {this.state.loading ? <h1>Loading...</h1> : <Results {...this.state} />}
                </div>
            </div>
        );

    }
}

export default MoviePage;