import React, { Component } from 'react';
import SearchResults from '../../components/SearchResults/SearchResults';
import { search } from '../../userFunctions';
import Select from 'react-select';

class Search extends Component {

    state = {
        name: '',
        results: [],
        rate: ''
    }

    //it will execute each time the component renders 
    componentDidMount = () => {
        this.setState({
            name: '',
            results: [],
            rate: ''
        });
        console.log(this.state);
    }

    //Oct25：返回值即搜索结果应该setstate存在state中，pass on to <SearchResult />
    onSubmit = (e) => {
        e.preventDefault()

        const query = {
            name: this.state.name,
            rate: this.state.rate
        }
        console.log("something something")
        console.log(query);

        search(query).then(res => {
            console.log('returned res', res);
            if (!res.error) {
                // const l = res.length;
                // let newRes = []
                // for (var i = 0; i < l; i ++){
                //     newRes[i] = res[i];
                // }
                let newRes = res;

                this.setState({ results: newRes });
                //this.props.history.push('/')

                //console.log('new state res first title',this.state.results[0].title);
            }
            else {
                this.setState({ results: [] })
                //console.log(res.error);
            }
        })
    }

    //this handler will make the user input saved to state.name
    changeInputHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    //not implemented yet. For redirecting to a MoviePage when click on 'View Details'
    clickHandler = (id) => {
        this.props.history.push(`/movie/${id}`);
    }

    // change = selectedOption => {
    //     this.setState({ rate: selectedOption });
    //     console.log(`rate selected:`, selectedOption);
    // }
    change = (e) => {
        this.setState({ rate: e.target.value });
    }

    render() {

        const ratings = [
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
            { label: "5", value: "5" },
            { label: "6", value: "6" },
            { label: "7", value: "7" },
            { label: "8", value: "8" },
            { label: "9", value: "9" }
        ];

        return (
            <div>
                <div>
                    {/* <Select onChange={this.change} value={this.state.rate} options={ratings} placeholder="Select count" /> */}
                    <select onChange={this.change}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    {/* <input type="submit" value="Submit" /> */}
                </div>
                <form onSubmit={this.onSubmit}>
                    <input onChange={(event) => this.changeInputHandler(event)} value={this.state.name}></input>
                    {/* <Select onChange={this.change} value={this.state.rate} options={ratings} placeholder="Select count"/> */}

                    <button>Search</button>

                </form>
                {this.state.results ?
                    <SearchResults results={this.state.results} clicked={this.clickHandler} /> : null}


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