import React from 'react';
import FavoriteMovie from './FavoriteMovie/FavoriteMovie';
import styles from './FavoriteMovies.module.css';

const FavoriteMovies = (props) => {
    //assume that search results are passed on as props.results to this class
    let results = props.results;

    return (
        <div className={styles.FavoriteMovies}>
            {results.map(re =>

                <FavoriteMovie
                    id={re.movie_id}
                    title={re.title}
                    desc={re.notes}
                    clicked={props.clicked}
                />)}
        </div>
    )
}

export default FavoriteMovies;