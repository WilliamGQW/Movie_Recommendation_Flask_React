import React, { Component } from 'react'; 
import SearchResults from '../../components/SearchResults/SearchResults';
import { search } from '../../userFunctions';

class Search extends Component {

    state = {
        name: 'lasttry',
        results:[{
            name:'name1',
            year:'2000',
            ratings:5,
            id:1
        },{
            name:'name2',
            year:'2001',
            ratings:3,
            id:2
        }]
      }
    
    //Oct25 设想：返回值即搜索结果应该setstate存在state中，pass on to <SearchResult />
    onSubmit = (e) => {
        e.preventDefault()
    
        const query = {
          name: this.state.name,
        }
        console.log(query);
    
        search(query).then(res => {
            console.log(res);
          if (!res.error) {
            this.props.history.push(`/`)
          }
          else {
              console.log(res.error);
          }
        })
    }
    clickHandler = (id) => {
        console.log(id);
    }
    
    
    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input></input>
                    <button>Search</button>
                </form>
                {this.state.results? 
                <SearchResults results={this.state.results} clicked={this.clickHandler}/> :null}
            </div>
        )
    }
}

export default Search;