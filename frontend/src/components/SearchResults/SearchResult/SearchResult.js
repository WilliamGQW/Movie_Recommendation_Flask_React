import React from 'react';
import styles from './SearchResult.module.css';

const SearchResult = (props) => {
    console.log('movie id is')
    console.log(props.id);

    return(
        <div className={styles.SearchResult}>
            <div className={styles.Item}>{props.name}</div>
            <div className={styles.Item}>{props.genres}</div>
            <div className={styles.Item}>{props.rating}</div>
            <button className={styles.Button} onClick={() => props.clicked(props.id)}>View Details</button>
        </div>
    )
}

export default SearchResult;