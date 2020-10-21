import React from 'react';
import styles from './NavigationItems.module.css';

import { NavLink } from 'react-router-dom';

const navigationItems = (props) => (

    <ul className={styles.NavigationItems}>
        <li className={styles.Item}><NavLink to="/" exact activeClassName={styles.active}>Search</NavLink></li>
        <li className={styles.Item}><NavLink to="/explore" exact activeClassName={styles.active}>Explore</NavLink></li>
        {props.isAuthenticated?<li className={styles.Item}><NavLink to="/post" activeClassName={styles.active}>Post</NavLink></li>: null}
        {props.isAuthenticated?<li className={styles.Item}><NavLink to="/recommendations" activeClassName={styles.active}>Recommendations</NavLink></li>: null}
        {props.isAuthenticated?
            <li className={styles.Item}><NavLink to="/logout" activeClassName={styles.active}>LogOut</NavLink></li>
            : <li className={styles.Item}><NavLink to="/auth" activeClassName={styles.active}>SignIn</NavLink></li>}
    </ul>
)

export default navigationItems;

