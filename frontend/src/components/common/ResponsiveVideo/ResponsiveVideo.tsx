import React, {Component} from 'react';
import './styles.scss';
import {observer} from "mobx-react";
import cx from 'classnames';

interface ResponsiveVideoProps{
    frame?:string,
    className?:string,
    videoContainerClassName?:string,
    onClick?:()=>void,
}


@observer
class ResponsiveVideo extends Component<ResponsiveVideoProps, any> {

    render() {

        const { className, videoContainerClassName, frame, children, onClick } = this.props;

        return (
            <div className={cx('responsive-video', className || '')} onClick={onClick}>
                <div className={cx('video-container', videoContainerClassName  || '')}
                     style={{backgroundImage:`url(${frame})`, backgroundSize:'contain',
                         backgroundPosition:"center center", backgroundRepeat:'no-repeat'}}>
                    {children}
                </div>
            </div>
        )
    }
}

export default ResponsiveVideo;

