import React from 'react';
import styles from './SearchResult.module.css';

const SearchResult = (props) => {
    return(
        <div className={styles.SearchResult}>
            <div>{props.name}</div>
            <div>{props.year}</div>
            <div>{props.ratings}</div>
            <button onClick={props.clicked(props.id)}>View Details</button>
        </div>
    )
}

export default SearchResult;