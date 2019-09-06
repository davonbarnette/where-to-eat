import React, {Component, CSSProperties} from 'react';
import cx from 'classnames';
import './styles.scss'

interface ButtonProps {
    enabled?:boolean,
    onClick:(e?:React.MouseEvent)=>void,
    style?:CSSProperties;
    className?:string,
    color?:'orange'|'blue'|'clear'
}

export default class Button extends Component<ButtonProps, any> {

    static defaultProps = {
        enabled:true,
    };

    onButtonClick = (e:React.MouseEvent) => {
        const { enabled, onClick } = this.props;
        if (!enabled) return null;
        else onClick(e);
    };

    render(){
        const { enabled, children, style, className, color } = this.props;

        return(
            <div className={cx('button', className || '', color || 'blue', {enabled, disabled:!enabled})} onClick={this.onButtonClick} style={style}>
                {children}
            </div>
        )
    }

}