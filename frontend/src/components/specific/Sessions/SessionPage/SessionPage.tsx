import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Drawer} from "antd";
import {RouteComponentProps, withRouter} from "react-router";

import './styles.scss';
import AppStore from "../../../../data/App/Store";

import StrapiActions from "../../../../data/Strapi/Actions";
import AppMethods from "../../../../data/App/Methods";
import SuggestionList from "../SuggestionList/SuggestionList";
import SuggestionForm from '../SuggestionForm/Form';
import {FormatErrorParams} from "yup";


interface Props extends RouteComponentProps<{sessionId:string}>{

}

interface State {
    showAddSuggestion:boolean,
}

class SessionPage extends Component<Props, State> {

    state:State  = {
        showAddSuggestion:false,
    };

    async componentDidMount() {
        if (this.sessionId) await StrapiActions.suggestions.find(this.sessionId);
    }
    onCloseDrawer = () => {
        this.setState({showAddSuggestion:false});
    };
    onAddSuggestionClick = () => {
        this.setState({showAddSuggestion:true});
    };
    onSuggestionSubmit = async (errors:FormatErrorParams, values:any) => {
          if (!errors) {
              console.log('id', this.sessionId);
              console.log('session', AppStore.sessions);
              let appended = {...values, sessions:[AppStore.sessions.get(this.sessionId)]};
              console.log('appended', appended);
              await StrapiActions.suggestions.create(appended);
          }
    };

    get suggestions() {
        if (AppMethods.mapIsEmpty(AppStore.suggestions)) return undefined;
        return [...AppStore.suggestions.values()];
    }

    get sessionId(){
        return this.props.match.params.sessionId;
    }

    render(){
        if (!this.sessionId) return null;
        const {showAddSuggestion} = this.state;
        return (
            <section className='session-page'>
                <SuggestionList suggestions={this.suggestions}/>
                <button onClick={this.onAddSuggestionClick}>Add Vote</button>
                <Drawer title='Add Suggestion' width='100vw' visible={showAddSuggestion}
                        onClose={this.onCloseDrawer}>
                    <SuggestionForm submitStickied overrideSubmit onSubmit={this.onSuggestionSubmit}/>
                </Drawer>
            </section>
        )
    }
}

export default withRouter(observer(SessionPage));