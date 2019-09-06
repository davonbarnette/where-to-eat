import React, {Component} from 'react';
import {observer} from "mobx-react";

import './styles.scss';
import AppStore from "../../../../data/App/Store";
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from "react-router";
import StrapiActions from "../../../../data/Strapi/Actions";
import AppMethods from "../../../../data/App/Methods";
import SessionsList from "../../Sessions/SessionsList/SessionsList";
import {BrowserRoutes} from "../../../../data/Routers/BrowserRouter";
import SessionPage from "../../Sessions/SessionPage/SessionPage";

interface Props extends RouteComponentProps<{spaceId:string}>{

}

interface State {

}

class SpacePage extends Component<Props, State> {

    state:State  = {

    };

    async componentDidMount() {
        if (this.spaceId) await StrapiActions.sessions.find(this.spaceId);
    }
    onAddSessionClick = () => {
        return StrapiActions.sessions.create({name:'test', space:this.spaceId});
    };

    get sessions() {
        if (AppMethods.mapIsEmpty(AppStore.sessions)) return null;
        return [...AppStore.sessions.values()];
    }

    get spaceId(){
        if (!this.props.match.params.spaceId) return undefined;
        else return parseInt(this.props.match.params.spaceId);
    }

    render(){
        if (!this.sessions || !this.spaceId) return null;
        let renderList = <SessionsList sessions={this.sessions}/>;
        return (
            <section className='space-page'>
                <Switch>
                    <Route exact path={BrowserRoutes.getSpaceById(this.spaceId)} render={() => renderList}/>
                    <Route path={BrowserRoutes.getSessionsByIdParam()} component={SessionPage}/>
                    <Redirect to={BrowserRoutes.getSpaceById(this.spaceId)}/>
                </Switch>
                <button onClick={this.onAddSessionClick}>Add Session</button>
            </section>
        )
    }
}

export default withRouter(observer(SpacePage));