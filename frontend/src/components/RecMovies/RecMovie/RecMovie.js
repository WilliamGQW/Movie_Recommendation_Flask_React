import React from 'react';
import styles from './RecMovie.module.css';

const RecMovie = (props) => {
    console.log(props.id);

    return (
        <div className={styles.RecMovie}>
            <div className={styles.Item} >{props.title}</div>
            {/* <div className={styles.Item}>{props.desc}</div> */}
            <button onClick={() => props.clicked(props.id)} className={styles.Button}>View Details</button>
        </div>
    )
}

export default RecMovie;