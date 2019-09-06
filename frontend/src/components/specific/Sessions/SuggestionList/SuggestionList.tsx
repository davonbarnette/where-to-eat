import React, {Component} from 'react';
import {observer} from "mobx-react";
import {List} from 'antd';

import './styles.scss';
import {StrapiSuggestionObject} from "../../../../data/Strapi/Types";
import SuggestionCard from "../SuggestionCard/SuggestionCard";


interface Props {
    suggestions?:StrapiSuggestionObject[]
}

interface State {

}

class SuggestionList extends Component<Props, State> {

    state:State  = {

    };

    renderItem = (whatDo:StrapiSuggestionObject) => {
        return (
            <List.Item>
                <SuggestionCard key={whatDo.id} suggestionId={whatDo.id}/>
            </List.Item>
        )
    };

    render(){
        return <List dataSource={this.props.suggestions} style={{width:'100%'}} renderItem={this.renderItem}/>
    }
}

export default observer(SuggestionList);