import React, { useState } from 'react'
const Model = (props) => {
    const [icoStatus, setIcoStatus] = useState(true)

    const iconSouCangData = (event, props) => {
        setIcoStatus(!icoStatus)
    }
    return (
        <>
            <span className={icoStatus ? " icon-soucang2 soucang-color" : "icon-soucang2"} onClick={(e) => iconSouCangData(e, props)}></span>

        </>
    )
}

export default Model;