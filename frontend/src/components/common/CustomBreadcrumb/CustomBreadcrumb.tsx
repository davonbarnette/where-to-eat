import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import {Breadcrumb} from "antd";
import * as Icon from 'react-feather';
import cx from 'classnames';

import './styles.scss';


interface CustomBreadcrumbProps{
    path:string,
    breadcrumbMap:any,
}

interface State {
    visible:boolean,
}


class CustomBreadcrumb extends Component<CustomBreadcrumbProps, State> {

    state:State = {
        visible:false,
    };


    get breadcrumbs(){
        const {path, breadcrumbMap} = this.props;
        const pathSnippets = path.split('/').filter(i => i);
        const first = pathSnippets.length === 1;
        return pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            const key = pathSnippets[index];
            let name;
            let obj = breadcrumbMap[key];
            if (obj) name = obj.title;

            if (!name){
                let previous = pathSnippets[index - 1];
                if (!previous) name = '';
                else name = breadcrumbMap[previous].getter(key);
            }

            return (
                <Breadcrumb.Item key={url}>
                    <Link className={cx('breadcrumb-link', {first})} to={url}>{name}</Link>
                </Breadcrumb.Item>
            );
        });
    }


    render(){
        return (
            <Breadcrumb className='custom-breadcrumb' separator={<Icon.ArrowRight size={16}/>}>
                {this.breadcrumbs}
            </Breadcrumb>
        );
    }
}

export default observer(CustomBreadcrumb);