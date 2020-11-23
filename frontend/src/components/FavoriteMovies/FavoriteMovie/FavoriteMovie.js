import React from 'react';
import FavoriteMovies from '../FavoriteMovies';
import styles from './FavoriteMovie.module.css';

const FavoriteMovie = (props) => {
    console.log(props.id);

    return (
        <div className={styles.FavoriteMovie}>
            <div className={styles.Item} >{props.title}</div>
            <div className={styles.Item}>{props.desc}</div>
            <button onClick={() => props.clicked(props.id)} className={styles.Button}>View Details</button>
        </div>
    )
}

export default FavoriteMovie;