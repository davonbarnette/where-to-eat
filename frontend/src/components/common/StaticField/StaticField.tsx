import React, {Component, CSSProperties} from 'react';
import './styles.scss';
import {Flex} from "../Flex/Flex";

interface StaticFieldProps {
    label?:string,
    className?:string,
    style?:CSSProperties
    onClick?:()=>void,
}

interface StaticFieldState {

}

export default class StaticField extends Component<StaticFieldProps, StaticFieldState> {

    render(){
        const { className, label, children, style, onClick } = this.props;
        return(
            <div className={`static-field-container ${className || ''}`} style={style} onClick={onClick}>
                {label && <Flex className='static-field-label' flexDirection='row'>{label}</Flex>}
                {children}
            </div>
        )
    }
}