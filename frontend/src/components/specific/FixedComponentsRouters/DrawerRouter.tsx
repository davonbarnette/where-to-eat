import React, {Component} from 'react';
import {observer} from "mobx-react";
import AppStore from "../../../data/App/Store";

interface State {
    visible:boolean
}

class DrawerRouter extends Component {

    state:State = {
        visible:true,
    };

    render(){
        switch(AppStore.drawer){
            default:
                return <div/>;

        }
    }
}

export default observer(DrawerRouter);

