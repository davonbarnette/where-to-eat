import React, {Component} from 'react';
import {observer} from "mobx-react";
import cx from 'classnames';

import './styles.scss'

interface Props{
    flatColor?:'red'|'blue'|'green'|'gray',
    theme?:'flat'|'raised',
    className?:string,
    style?:object,
}

class Box extends Component<Props, any> {

    static defaultProps = {
        theme:'flat',
        flatColor:'blue',
    };

    render(){
        const { className, children, style, flatColor, theme } = this.props;

        return(
            <div className={cx('box-container', className, flatColor, theme)} style={style}>
                {children}
            </div>
        )
    }
}

export default observer(Box);