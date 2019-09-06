import React, { Component } from 'react';
import './styles.scss'
import * as Icon from 'react-feather';

interface ModalProps{
    exitModalFn:()=>void,
    title:string,
    icon?:any
}

export default class Modal extends Component<ModalProps, any> {

    render() {
        const { children, exitModalFn, title, icon } = this.props;

        return (
            <div className='modal-wrapper'>
                <div className='modal-content'>
                    <div className='modal-header-container'>
                        <div className='title'>{icon} {title}</div>
                        <Icon.X size={24} color='#505050' className='icon' onClick={exitModalFn}/>
                    </div>
                    {children}
                </div>
                <div className='backdrop' onClick={exitModalFn}/>
            </div>
        )
    }

}