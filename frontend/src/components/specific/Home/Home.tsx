import React, {Component} from 'react';
import {observer} from "mobx-react";

import './styles.scss';

import AppStore from "../../../data/App/Store";
import StrapiActions from "../../../data/Strapi/Actions";
import AppMethods from "../../../data/App/Methods";
import SessionsList from "../Sessions/SessionsList/SessionsList";


interface Props {

}

interface State {

}

class Home extends Component<Props, State> {

    state:State  = {

    };
    onAddSpaceClick = () => {
        return StrapiActions.sessions.create({name:'test'});
    };

    get sessions(){
        if (AppMethods.mapIsEmpty(AppStore.sessions)) return undefined;
        else return [...AppStore.sessions.values()];
    }

    render(){
        return(
             <section className='home-page'>
                 <div className='content'>
                     <SessionsList sessions={this.sessions}/>
                     <button onClick={this.onAddSpaceClick}>New Session</button>
                 </div>
            </section>
        )
    }
}

export default observer(Home);