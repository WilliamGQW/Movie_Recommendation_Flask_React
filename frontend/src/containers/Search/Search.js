import React, { Component } from 'react';
import SearchResults from '../../components/SearchResults/SearchResults';
import { search, getPopularMovies } from '../../userFunctions';
import Select from 'react-select';
import styles from './Search.module.css';

class Search extends Component {

    state = {
        name: '',
        results: [],
        num: '',
        popular: []
    }

    //it will execute each time the component renders 
    componentDidMount = () => {
        this.setState({
            name: '',
            results: [],
            num: ''
        });
        console.log(this.state);

        getPopularMovies().then(res => {
            console.log('returned getPopularMovies', res);
            if (!res.error) {
                let newRes = res;

                this.setState({ popular: newRes });
            }
            else {
                this.setState({ popular: [] })
            }
        })
    }

    //Oct25：返回值即搜索结果应该setstate存在state中，pass on to <SearchResult />
    onSubmit = (e) => {
        e.preventDefault()

        console.log("onSubmit name is:", this.state.name)
        console.log("onSubmit num is:", this.state.num)
        const query = {
            name: this.state.name,
            num: this.state.num
        }
        console.log("something something")
        console.log(query);

        search(query).then(res => {
            console.log('returned res', res);
            if (!res.error) {
                let newRes = res;

                this.setState({ results: newRes });
            }
            else {
                this.setState({ results: [] })
                //console.log(res.error);
            }
        })
    }

    //this handler will make the user input saved to state.name
    changeInputHandler = (event) => {
        // this.setState({ name: event.target.value });
        this.setState({ [event.target.name]: event.target.value });
    }

    //not implemented yet. For redirecting to a MoviePage when click on 'View Details'
    clickHandler = (id) => {
        this.props.history.push(`/movie/${id}`);
    }

    // change = selectedOption => {
    //     this.setState({ rate: selectedOption });
    //     console.log(`rate selected:`, selectedOption);
    // }
    change = (event) => {
        this.setState({ num: event.target.value });
    }

    submit = (event) => {
        event.preventDefault()
        console.log('returned num', event.target.value);
        this.setState({ num: event.target.value });
    }

    render() {
        return (
            <div>

                {/* <Select onChange={this.change} value={this.state.rate} options={ratings} placeholder="Select count" /> */}
                {/* <select onChange={this.change}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select> */}

                {/* <form onSubmit={this.submit}>
                    <input onChange={(event) => this.change(event)} value={this.state.num} placeholder="Select num"></input>

                    <button>Submit</button>

                </form> */}

                <form onSubmit={e => this.onSubmit(e)} >
                    <div >
                        <label>name</label>
                        <input
                            className={styles.SearchForm}
                            name='name'
                            value={this.state.name}
                            onChange={e => this.changeInputHandler(e)}
                            placeholder="enter some key words to search..." />

                    </div>
                    <div>
                        <label>num</label>
                        <input
                            className={styles.SearchForm}
                            name='num'
                            value={this.state.num}
                            onChange={e => this.changeInputHandler(e)}
                            placeholder="Liked by how many users..." />
                    </div>
                    <button>Search</button>
                </form>


                {this.state.results ?
                    <SearchResults results={this.state.results} clicked={this.clickHandler} /> : null}

                <p className={styles.body}> Popular Movies</p>
                {this.state.popular ?
                    <SearchResults results={this.state.popular} /> : <p>No popular movies available right now</p>}


                {/* <div className="row">

                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <Select onChange={this.change} value={this.state.rate} options={techCompanies} />
                    </div>
                    <div className="col-md-4"></div>
                </div> */}
            </div>
        )
    }
}

export default Search;