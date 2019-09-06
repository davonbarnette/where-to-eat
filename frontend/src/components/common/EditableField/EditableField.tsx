import React, {Component} from 'react';
import {Input, Select, Tooltip} from 'antd';
import * as Icon from 'react-feather';
import cx from 'classnames';

import './styles.scss';

import {Flex} from "../Flex/Flex";
import {ValidationObject} from "../../../global/managers/Validator";
const Option = Select.Option;

interface DropdownSelectionType {
    id:string,
    name:string
}

interface EditableFieldProps {
    validation?:(value:string) => ValidationObject
    onClickSave:(value:string)=>void
    type?:'text'|'textarea'|'dropdown'|'password'
    defaultValue?:string
    placeholder?:string,
    label?:string,
    className?:string
    dropdownSelections?: DropdownSelectionType[],
    defaultSelectionValue?: string
    description?:string,
}

interface EditableFieldState {
    value:string,
    editing:boolean,
    error:string|null,
    selection:string|null,
}

export default class EditableField extends Component<EditableFieldProps, EditableFieldState> {

    state:EditableFieldState = {
        value:'',
        editing:false,
        error:null,
        selection: null,

    };

    constructor(props:EditableFieldProps){
        super(props);
        this.state.value = props.defaultValue || '';
    }

    onSaveClick = () => {
        const { onClickSave, type } = this.props;
        const { value, selection } = this.state;
        if (!this.valid) return null;
        this.setState({editing:false});
        switch (type){
            case 'dropdown': return onClickSave(selection!);
            default: return onClickSave(value);
        }
    };

    onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        this.validate(value);
        this.setState({ value })
    };

    onTextEditorChange = (value:string) => {
        this.setState({ value })
    };

    onEditFieldClick = () => {
        this.setState({editing:true});
    };

    onExitFieldClick = () => {
        this.setState({ editing:false, error:null });
    };

    onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        const {ctrlKey, key} = e;
        if (ctrlKey && key === 'Enter') this.onSaveClick();
        else if (key === 'Escape') this.onExitFieldClick();
        else return;
    };

    validate(value:string){
        const {validation} = this.props;
        if (validation) {
            let result = validation(value);
            const {error, isValid} = result;
            if (isValid) this.setState({error:null});
            else if (error) this.setState({ error });
        }
    }

    onSelectionChange = (selection:string) => {
        const {onClickSave} = this.props;
        if (onClickSave) {
            this.setState({editing:false, selection});
            return onClickSave(selection);
        }
    };

    get valid() {
        const {error} = this.state;
        return !error;
    }
    get label(){
        const { label } = this.props;
        if (!label) return null;

        const { editing } = this.state;
        let justifyContent = editing ? 'space-between' : 'flex-start';
        return (
            <Flex flexDirection='row' alignItems='center' justifyContent={justifyContent} className='editable-field-header'>
                <div className='editable-field-label'>{label}</div>
                {this.actions}
            </Flex>
        )
    }

    get dropdown(){
        const {dropdownSelections, type, defaultSelectionValue, label} = this.props;
        if (type !== "dropdown") return null;

        if (!dropdownSelections) return <Select disabled size='large' placeholder='No items' className='select'/>;

        let options = dropdownSelections.map((selection:DropdownSelectionType)=> {
            const {id, name} = selection;
            return <Option key={id}>{name}</Option>
        });
        const { selection } = this.state;
        return (
            <Select defaultOpen={true} autoFocus className='select' size='large' value={selection || defaultSelectionValue} showSearch
                    placeholder={`Choose ${label}`} onChange={this.onSelectionChange} onInputKeyDown={this.onKeyDown}>
                {options}
            </Select>
        )
    }

    get input(){
        const { editing } = this.state;
        const { defaultValue, type, label } = this.props;

        if (!editing) {
            return (
                <Tooltip title={`Edit ${label}`} placement='right'>
                    <input type={type} readOnly value={defaultValue || `No ${label}`}
                           className={cx('static-field-value', {empty: !defaultValue || defaultValue === ""})}
                           onClick={this.onEditFieldClick}/>
                </Tooltip>
            );
        }
        else if (type === 'dropdown') return this.dropdown;
        else if (type === 'password') return (
            <Input.Password onKeyDown={this.onKeyDown}
                            onChange={this.onInputChange}
                            autoFocus
                            style={{marginTop: 6}}
                            size='large'
                            defaultValue={defaultValue}/>
        );
        else return (
            <Input onKeyDown={this.onKeyDown}
                   onChange={this.onInputChange}
                   autoFocus
                   style={{marginTop:6}}
                   size='large'
                   defaultValue={defaultValue}/>
        )
    }
    get actions(){
        const { editing } = this.state;
        if (editing) return (
            <Flex>
                {this.valid && <ActionItem icon={<Icon.Save size={14} color='#cccccc' className='editable-field-icon'/>} label='Save (Ctrl+Ent)' onClick={this.onSaveClick}/>}
                <ActionItem icon={<Icon.XSquare size={14} color='#cccccc' className='editable-field-icon'/>} label='Cancel (Esc)' onClick={this.onExitFieldClick}/>
            </Flex>
        );
        else return null
    }
    get description(){
        const { description } = this.props;
        if (!description) return null;
        else return <div className='editable-field-description'>{description}</div>
    }

    render(){
        const { error, editing } = this.state;
        const { className } = this.props;
        return(
            <div className={`editable-field-container ${className || ''}`}>
                {this.label}
                {this.input}
                {this.description}
                <div className='editable-field-error' style={{opacity: editing && error ? 1 : 0, transform:'translate(0)'}}>{this.state.error || ' '}</div>
            </div>
        )
    }
}

class ActionItem extends Component<{icon:any, label:string, onClick:()=>void}, any> {

    render() {
        const { icon, label, onClick } = this.props;
        return (
            <div onClick={onClick} className='action-item'>
                {icon}
                <div className='action-item-label'>{label}</div>
            </div>
        )
    }
}