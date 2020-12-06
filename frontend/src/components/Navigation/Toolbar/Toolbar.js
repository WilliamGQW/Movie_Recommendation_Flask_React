import React from 'react';


import styles from './Toolbar.module.css'
import Logo from '../UI/Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
//import Button from '../../UI/Button/Button';

const toolbar = (props) => {

    return (
        <header className={styles.Toolbar}>
            <div className={styles.Logo}>
                <Logo></Logo>
            </div>
            <div>
                <NavigationItems isAuthenticated={props.isAuthenticated} />
            </div>

        </header>
    )
}

export default toolbar;