import React from 'react';
import styles from './NavigationItems.module.css';

import { NavLink } from 'react-router-dom';

const navigationItems = (props) => (

    <ul className={styles.NavigationItems}>
        <li className={styles.Item}><NavLink to="/" exact activeClassName={styles.active}>Search</NavLink></li>
        <li className={styles.Item}><NavLink to="/profile" exact activeClassName={styles.active}>Profile</NavLink></li>
        {props.isAuthenticated ?
            <li className={styles.Item}><NavLink to="/logout" activeClassName={styles.active}>LogOut</NavLink></li>
            : <li className={styles.Item}><NavLink to="/login" activeClassName={styles.active}>SignIn</NavLink></li>}
        {props.isAuthenticated ? null : <li className={styles.Item}><NavLink to='/register' activeClassName={styles.active}>Register</NavLink></li>}
    </ul>
)

export default navigationItems;
