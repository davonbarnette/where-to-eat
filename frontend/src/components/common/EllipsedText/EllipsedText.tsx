import React, {Component, CSSProperties} from 'react';
import cx from 'classnames';
import './styles.scss'
import {Tooltip} from "antd";

interface EllipsedTextProps {
    text:string,
    style?:CSSProperties;
    className?:string,
    onClick?:()=>void,
    tooltipDisabled?:boolean
    tooltipOverride?:string,
}

export default class EllipsedText extends Component<EllipsedTextProps, any> {

    get content(){
        const {tooltipDisabled, text, onClick, tooltipOverride} = this.props;
        if (tooltipDisabled) return <span onClick={onClick}>{text}</span>;
        else return (
            <Tooltip title={tooltipOverride || text}>
                <span onClick={onClick}>{text}</span>
            </Tooltip>
        )
    }

    render(){
        const { style, className} = this.props;

        return(
            <div className={cx('ellipsed-text', className || '')} style={style}>
                {this.content}
            </div>
        )
    }

}