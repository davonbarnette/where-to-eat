import React, {Component} from 'react';
import {observer} from "mobx-react";
import cx from 'classnames';

import './styles.scss'

interface Props{
    title?:string,
    icon?:any,
    className?:string,
    style?:object,
    footer?:any,
    contentClassName?:string,
    contentStyle?:object,
    action?:any;
}

class Card extends Component<Props, any> {

    static defaultProps = {
        theme:'flat',
        flatColor:'blue',
    };

    render(){
        const { className, children, style, title, icon, footer, contentClassName, contentStyle, action } = this.props;

        return(
            <div className={cx('card', className)} style={style}>
                {(title || icon) &&<div className='header'>
                    <div className='text'>{icon}{title}</div>
                    <div className='action'>{action}</div>
                </div>}
                <div className={cx('content', contentClassName)} style={contentStyle}>
                    {children}
                </div>
                {footer && <div className='footer'>{footer}</div>}
            </div>
        )
    }
}

export default observer(Card);