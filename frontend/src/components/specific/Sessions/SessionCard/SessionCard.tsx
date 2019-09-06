import React, {Component} from 'react';
import {observer} from "mobx-react";

import './styles.scss';
import AppStore from "../../../../data/App/Store";
import BrowserRouter, {BrowserRoutes} from "../../../../data/Routers/BrowserRouter";

interface Props{
    sessionId:string,
}

interface State {

}

class SessionCard extends Component<Props, State> {

    state:State  = {

    };

    onSessionClick = () => {
        const {sessionId} = this.props;
        BrowserRouter.push(BrowserRoutes.getSessionById(sessionId))
    };

    get session(){
        return AppStore.sessions.get(this.props.sessionId);
    }

    render(){
        if (!this.session) return null;
        const {name} = this.session;
        return(
             <section className='session-card' onClick={this.onSessionClick}>
                 {name}

            </section>
        )
    }
}

export default observer(SessionCard);