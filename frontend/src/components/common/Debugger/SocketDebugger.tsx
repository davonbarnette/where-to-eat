import React, { Component } from 'react';
import 'jsoneditor/dist/jsoneditor.min.css';
import './styles.scss';
import ReactJson from "react-json-view";
import AppStore from "../../../data/App/Store";
import {Flex} from "../Flex/Flex";
import {observer} from "mobx-react";
import CustomJSONEditor from "./CustomJSONEditor/CustomJSONEditor";
import * as mobx from 'mobx';
import {Select} from "antd";

const Option = Select.Option;

let defaultJSON = {
    "action": "query_base_data",
    "args": {
        "passthrough": {}
    }
};

class SocketDebugger extends Component {

    state = {
        json: undefined,
    };

    onSubmitClick = (json:any) => {
        // eslint-disable-next-line
        this.state.json = json;
        AppStore.realtime.send(json.action, json.args);
    };

    onSelectChange = (key:any) => {
        const { debug } = AppStore;
        if (debug){
            let json = debug[key];
            this.setState({json});
        }
    };

    get options(){
        const { debug } = AppStore;
        if (debug){
            let newDebug:any = mobx.toJS(debug);
            return Object.keys(newDebug).map((key:string) => {
                return <Option key={key}>{key}</Option>
            })
        }
        else return null;
    }

    render() {
        return (
            <Flex className="socket-debugger" flexDirection='row'>
                <Flex className='actionable' flexDirection='column'>
                    <Select className='select-action' size='large' showSearch onSelect={this.onSelectChange}>
                        {this.options}
                    </Select>
                    <CustomJSONEditor id={'socket_debugger'} json={this.state.json || defaultJSON} onSubmit={this.onSubmitClick}/>
                </Flex>
                <div className='payload'>
                    <ReactJson src={AppStore.socket ? JSON.parse(JSON.stringify(AppStore.socket)): {}} name={null}/>
                </div>
            </Flex>
        );
    }
}

export default observer(SocketDebugger);