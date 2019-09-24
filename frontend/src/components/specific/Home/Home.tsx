import React, {Component} from 'react';
import {observer} from "mobx-react";

import './styles.scss';

import AppStore from "../../../data/App/Store";
import StrapiActions from "../../../data/Strapi/Actions";
import AppMethods from "../../../data/App/Methods";
import SessionsList from "../Sessions/SessionsList/SessionsList";
import {Drawer} from "antd";
import SessionForm from "../Sessions/SessionForm/Form";
import {StrapiSessionArgs} from "../../../data/Strapi/Types";


interface Props {

}

interface State {
    showSessionForm:boolean,
}

class Home extends Component<Props, State> {

    state:State  = {
        showSessionForm:false,
    };
    onSubmitSession = (errors:any, values:StrapiSessionArgs) => {
        if (!errors) return StrapiActions.sessions.create(values);
    };
    onOpenSessionForm = () => {
        this.setState({showSessionForm:true})
    };
    onDrawerClose = () => {
        this.setState({showSessionForm:false})
    };

    get sessions(){
        if (AppMethods.mapIsEmpty(AppStore.sessions)) return undefined;
        else return [...AppStore.sessions.values()];
    }

    render(){
        const {showSessionForm} = this.state;
        return(
             <section className='home-page'>
                 <div className='content'>
                     <SessionsList sessions={this.sessions}/>
                     <button onClick={this.onOpenSessionForm}>New Session</button>
                 </div>
                 <Drawer title='New Session' width='100vw' visible={showSessionForm} onClose={this.onDrawerClose}>
                    <SessionForm onSubmit={this.onSubmitSession} submitStickied overrideSubmit/>
                 </Drawer>
            </section>
        )
    }
}

export default observer(Home);