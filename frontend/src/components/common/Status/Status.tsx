import React from "react";
import cx from "classnames";

import './styles.scss';

interface StatusProps {
    online: boolean,
    text?:string,
}

export const Status = (props:StatusProps) => {
    const {online, text} = props;

    return (
        <div className='status'>
            <div className={cx('circle', {online})}/>
            {text && <div className='text'>{text}</div>}
        </div>
    )
};