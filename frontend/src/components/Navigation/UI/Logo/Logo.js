import React from 'react';

import movieLogo from '../../../../assets/images/Film_logo_.png';
import styles from './Logo.module.css'

const logo = (props) => (
    <div className={styles.Logo}>
        <img src={movieLogo} alt="WebsiteLogo"></img>
    </div>
)

export default logo;