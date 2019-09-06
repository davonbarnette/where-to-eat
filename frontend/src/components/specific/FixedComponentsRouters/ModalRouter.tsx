import React, {Component} from 'react';
import {observer} from "mobx-react";
import AppStore from "../../../data/App/Store";

class ModalRouter extends Component {

    render(){
        if (!AppStore.modal) return null;
        switch(AppStore.modal){
            default:
                return <div/>;

        }
    }
}

export default observer(ModalRouter);

