import React, { Component } from 'react'; 
import SearchResults from '../../components/SearchResults/SearchResults';
import { search } from '../../userFunctions';

class Search extends Component {

    state = {
        name: '',
        results:[]
      }

    //it will execute each time the component renders 
    componentDidMount = () => {
        this.setState({
            name:'', 
            results:[]
        });
        console.log(this.state);
    }

    //Oct25：返回值即搜索结果应该setstate存在state中，pass on to <SearchResult />
    onSubmit = (e) => {
        e.preventDefault()
    
        const query = {
          name: this.state.name,
        }
        console.log(query);
    
        search(query).then(res => {
            console.log('returned res',res);
          if (!res.error) {
            // const l = res.length;
            // let newRes = []
            // for (var i = 0; i < l; i ++){
            //     newRes[i] = res[i];
            // }
            let newRes = res;
        
            this.setState({results: newRes});
            //this.props.history.push('/')
        
            //console.log('new state res first title',this.state.results[0].title);
          }
          else {
              this.setState({results:[]})
              //console.log(res.error);
          }
        })
    }

    //this handler will make the user input saved to state.name
    changeInputHandler = (event) => {
        this.setState({name:event.target.value});
    }

    //not implemented yet. For redirecting to a MoviePage when click on 'View Details'
    clickHandler = (id) => {
        this.props.history.push(`/movie/${id}`);
    }
    
    
    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input onChange={(event) => this.changeInputHandler(event)} value={this.state.name}></input>
                    <button>Search</button>
                </form>
                {this.state.results? 
                    <SearchResults results={this.state.results} clicked={this.clickHandler}/> :null}
            </div>
        )
    }
}

export default Search;