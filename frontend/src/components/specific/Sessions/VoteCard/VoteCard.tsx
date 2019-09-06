import React, {Component} from 'react';
import {observer} from "mobx-react";

import './styles.scss';
import AppStore from "../../../../data/App/Store";

interface Props{
    voteId:number,
}

interface State {

}

class VoteCard extends Component<Props, State> {

    state:State  = {

    };

    onVoteClick = () => {

    };

    get vote(){
        return AppStore.votes.get(this.props.voteId);
    }

    render(){
        if (!this.vote) return null;
        const {} = this.vote;
        return(
             <section className='vote-card' onClick={this.onVoteClick}>
                 vote
            </section>
        )
    }
}

export default observer(VoteCard);