import React, {Component} from 'react';
import {observer} from "mobx-react";
import {List} from 'antd';

import './styles.scss';
import {StrapiSpaceObject} from "../../../../data/Strapi/Types";
import SpaceCard from "../SpaceCard/SpaceCard";



interface Props {
    spaces:StrapiSpaceObject[]
}

interface State {

}

class SpacesList extends Component<Props, State> {

    state:State  = {

    };

    renderItem = (space:StrapiSpaceObject) => {
        return (
            <List.Item>
                <SpaceCard key={space.id} spaceId={space.id}/>
            </List.Item>
        )
    };

    render(){
        return <List grid={{gutter:16, xs:1, sm:2, md: 4}} dataSource={this.props.spaces}
                     style={{width:'100%'}} renderItem={this.renderItem}/>
    }
}

export default observer(SpacesList);