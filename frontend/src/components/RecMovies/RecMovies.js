import React from 'react';
import RecMovie from './RecMovie/RecMovie';
import styles from './RecMovies.module.css';

const RecMovies = (props) => {
    //assume that search results are passed on as props.results to this class
    let results = props.results;

    return (
        <div className={styles.RecMovies}>
            {results.map(re =>

                <RecMovie
                    id={re.movie_id}
                    title={re.title}
                    // desc={re.notes}
                    clicked={props.clicked}
                />)}
        </div>
    )
}

export default RecMovies;