import React, {Component} from 'react';
import {observer} from "mobx-react";

import './styles.scss';
import AppStore from "../../../../data/App/Store";
import BrowserRouter, {BrowserRoutes} from "../../../../data/Routers/BrowserRouter";

interface Props {
    spaceId:number,
}

interface State {

}

class SpaceCard extends Component<Props, State> {

    state:State  = {

    };

    onSpaceClick = () => {
        BrowserRouter.push(BrowserRoutes.getSpaceById(this.props.spaceId))
    };

    get space(){
        return AppStore.spaces.get(this.props.spaceId);
    }

    render(){
        if (!this.space) return null;
        const {name} = this.space;
        return(
             <section className='space-card' onClick={this.onSpaceClick}>
                 {name}
            </section>
        )
    }
}

export default observer(SpaceCard);