import React from 'react';
import SearchResult from './SearchResult/SearchResult';
import styles from './SearchResults.module.css';
import styles_res from './SearchResult/SearchResult.module.css';

const SearchResults = (props) => {
    //assume that search results are passed on as props.results to this class
    let results = props.results;

    /*assume results: [
        {title:xxx, id:xx, genres:xxx, vote_average:xxxx},
        {title:xxx, id:xx, genres:xxx, vote_average:xxxx},
        ....
    ]*/
    return(
        <div className={styles.SearchResults}>
            <div className={styles_res.SearchResult}>
                <div className={styles_res.Item}>Movie Name</div>
                <div className={styles_res.Item}>Genres</div>
                <div className={styles_res.Item}>Rating</div>
                <div className={styles_res.Item}>Movie Page</div>
            </div>
            {results.map(re => 
                <SearchResult
                name={re.title} 
                id={re.id}
                genres={re.genres}
                rating={re.vote_average}
                clicked={props.clicked}
                />)}
        </div>
    )
}

export default SearchResults;