import React, {Component} from 'react';
import {observer} from "mobx-react";

import './styles.scss';
import AppStore from "../../../../data/App/Store";

interface Props{
    suggestionId:number,
}

interface State {

}

class SuggestionCard extends Component<Props, State> {

    state:State  = {

    };

    onSuggestionClick = () => {

    };

    get suggestion(){
        return AppStore.suggestions.get(this.props.suggestionId);
    }

    render(){
        if (!this.suggestion) return null;
        const {name} = this.suggestion;
        return(
             <section className='suggestion-card' onClick={this.onSuggestionClick}>
                 {name}
            </section>
        )
    }
}

export default observer(SuggestionCard);