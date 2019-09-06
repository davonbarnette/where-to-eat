import React, {Component} from 'react';
import {observer} from "mobx-react";
import {List} from 'antd';

import './styles.scss';
import {StrapiVoteObject, StrapiVoteObjectReduced} from "../../../../data/Strapi/Types";
import VoteCard from "../VoteCard/VoteCard";



interface Props {
    votes:StrapiVoteObjectReduced[]
}

interface State {

}

class VotesList extends Component<Props, State> {

    state:State  = {

    };

    renderItem = (vote:StrapiVoteObjectReduced) => {
        return (
            <List.Item>
                <VoteCard key={vote.id} voteId={vote.id}/>
            </List.Item>
        )
    };

    render(){
        return <List dataSource={this.props.votes} style={{width:'100%'}} renderItem={this.renderItem}/>
    }
}

export default observer(VotesList);