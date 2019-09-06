import React, {Component} from 'react';
import {observer} from "mobx-react";
import {List} from 'antd';

import './styles.scss';
import {StrapiSessionObject} from "../../../../data/Strapi/Types";
import SessionCard from "../SessionCard/SessionCard";



interface Props {
    sessions?:StrapiSessionObject[]
}

interface State {

}

class SessionsList extends Component<Props, State> {

    state:State  = {

    };

    renderItem = (session:StrapiSessionObject) => {
        return (
            <List.Item>
                <SessionCard key={session.id} sessionId={session.id}/>
            </List.Item>
        )
    };

    render(){
        if (!this.props.sessions) return null;
        return <List grid={{gutter:16, xs:1, sm:2, md: 4}} dataSource={this.props.sessions}
                     style={{width:'100%'}} renderItem={this.renderItem}/>
    }
}

export default observer(SessionsList);