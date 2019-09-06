import React, {Component} from 'react';
import './styles.scss';
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from "react-router-dom";
import AppStore from "../../../data/App/Store";
import {BrowserRoutes} from "../../../data/Routers/BrowserRouter";
import SocketDebugger from "../../common/Debugger/SocketDebugger";

/* App Imports */
import {IndeterminateLoader} from "../../common/IndeterminateLoader/IndeterminateLoader";
import {observer} from "mobx-react";
import Home from "../Home/Home";
import SpacePage from "../Spaces/SpacePage/SpacePage";
import SessionPage from "../Sessions/SessionPage/SessionPage";

class Protected extends Component<RouteComponentProps, any> {

    render() {
        if (!AppStore.necessaryDataIsLoaded) return (
            <div className='loading-app'>
                <div className='text'>Loading...</div>
                <IndeterminateLoader className='app-indeterminate-loader'/>
            </div>
        );
        return (
            <Switch>
                <Route path={BrowserRoutes.account}/>

                /* Data Routes */

                <Route exact path={BrowserRoutes.debugger} component={SocketDebugger}/>
                <Route path={BrowserRoutes.spacesByIdParam} component={SpacePage}/>
                <Route path={BrowserRoutes.getSessionsByIdParam()} component={SessionPage}/>
                <Route exact path={BrowserRoutes.home} component={Home}/>
                <Redirect to={{pathname: BrowserRoutes.home, state: {from: this.props.location}}}/>
            </Switch>
        );
    }
}

export default withRouter(observer(Protected));
