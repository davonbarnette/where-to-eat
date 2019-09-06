import React, {Component} from 'react';
import './styles.scss';
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from "react-router-dom";
import AppStore from "../../../data/App/Store";
import {BrowserRoutes} from "../../../data/Routers/BrowserRouter";
import ModalRouter from "../FixedComponentsRouters/ModalRouter";
import DrawerRouter from "../FixedComponentsRouters/DrawerRouter";
// import AppHeader from "./AppHeader";
import {Layout} from 'antd';

/* App Imports */
import {IndeterminateLoader} from "../../common/IndeterminateLoader/IndeterminateLoader";
import {observer} from "mobx-react";
import Auth from "../Auth/Auth";
import Protected from "./Protected";

const {Content} = Layout;

AppStore.initialize();

class App extends Component<RouteComponentProps, any> {

    get routes(){
        const {user} = AppStore;
        if (user) return [
            <Redirect key={0} from={BrowserRoutes.auth} to={{pathname: BrowserRoutes.home, state: {from: this.props.location}}}/>,
            <Route key={1} component={Protected}/>
        ];
        else return [
            <Route key={0} path={BrowserRoutes.auth} component={Auth}/>,
            <Redirect key={1} to={{pathname: BrowserRoutes.auth, state: {from: this.props.location}}}/>,
        ]
    }

    render() {
        if (!AppStore.necessaryDataIsLoaded) return (
            <div className='loading-app'>
                <div className='text'>Loading...</div>
                <IndeterminateLoader className='app-indeterminate-loader'/>
            </div>
        );

        return (
            <Layout className='app' id='app' style={{minHeight:'100vh'}}>
                {/*<AppHeader/>*/}
                <Layout style={{background: '#f9fafc'}}>
                    <Content>
                        <Switch>
                            {this.routes}
                        </Switch>
                    </Content>
                </Layout>
                <ModalRouter/>
                <DrawerRouter/>
            </Layout>
        );
    }
}

export default withRouter(observer(App));
