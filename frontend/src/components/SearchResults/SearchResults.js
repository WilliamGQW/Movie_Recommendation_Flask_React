import React from 'react';
import SearchResult from './SearchResult/SearchResult';
import styles from './SearchResults.module.css';

const SearchResults = (props) => {
    //assume that search results are passed on as props.results to this class
    let results = props.results;
    /*assume results: [
        {name: xxx, id:xxx, year:xxx, ratings:xxx},
        {name: xxx, id:xxx, year:xxx, ratings:xxx}
    ]*/
    return(
        <div className={styles.SearchResults}>
            {results.map(re => 
                <SearchResult
                name={re.name} 
                id={re.id}
                year={props.year}
                ratings={re.ratings}
                clicked={props.clicked}
                />)}
        </div>
    )
}

export default SearchResults;