import React, { Component } from 'react';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css';
import './styles.scss';
import Button from "../../Button/Button";
import {Flex} from "../../Flex/Flex";

interface CustomJSONEditorProps {
    id:string,
    json:any,
    onSubmit:(json:any) => void,
}

export default class CustomJSONEditor extends Component<CustomJSONEditorProps,any>{
    ref:any;

    componentDidUpdate(props:CustomJSONEditorProps){
        const { json } = this.props;
        this.ref.set(json);
    }

    get id(){
        const {id} = this.props;
        return id + '_curJson';
    }

    setRef = (e:any) => {
        let jsonEditorConfig = {modes:["code", "tree"]};
        if (e) this.ref = new JSONEditor(e, jsonEditorConfig as any)
    };

    onSubmitClick = () => {
        const {onSubmit} = this.props;
        let json = this.ref.get();
        onSubmit(json);
    };

    onKeyDown = (e:React.KeyboardEvent<HTMLDivElement>) => {
        const {shiftKey, key} = e;
        if (shiftKey && key === 'Enter') {
            e.preventDefault();
            this.onSubmitClick();
        }
    };

    onSaveClick = () => {
        let json = this.ref.get();
        localStorage.setItem(this.id, JSON.stringify(json));
    };

    render(){
        return(
            <Flex className='editor-container' flexDirection='column'>
                <div className='custom-json-editor' ref={this.setRef} onKeyDown={this.onKeyDown}/>
                <Button enabled={true} onClick={this.onSubmitClick}>Submit</Button>
                <Button enabled={true} onClick={this.onSaveClick}
                        style={{marginTop: 12, background: '#6d6dd0'}}>Save</Button>
            </Flex>
        )
    }
}