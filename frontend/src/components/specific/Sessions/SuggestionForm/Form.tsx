import React, {Component} from 'react';
import {observer} from "mobx-react";
import cx from 'classnames';
import * as Icon from 'react-feather';
import {Form, Input} from "antd";
import {FormComponentProps} from "antd/es/form";

import './styles.scss';

import H2 from "../../../common/Sections/H2/H2";
import Button from "../../../common/Button/Button";
import {StrapiValidation} from "../../../../data/Strapi/ValidationSchemas";
import StrapiActions from "../../../../data/Strapi/Actions";

interface Props extends FormComponentProps{
    onSubmit?:(errors:any, values:any)=>void,
    overrideSubmit?:boolean,
    submitStickied?:boolean,
}

class SuggestionForm extends Component<Props>{

    onSubmit = async (e:any) => {
        e.preventDefault();
        const {onSubmit, form, overrideSubmit} = this.props;
        const {validateFieldsAndScroll} = form;
        validateFieldsAndScroll((errors, values)=> {
            if (onSubmit) onSubmit(errors, values);
            if (!errors && !overrideSubmit) StrapiActions.suggestions.create(values);
        })
    };

    render(){
        const {form, submitStickied} = this.props;
        const {getFieldDecorator} = form;
        return(
            <div className='suggestion-form-wrapper'>
                <Form onSubmit={this.onSubmit} colon={false} className='suggestion-form'>
                    <Form.Item label='Name'>
                        {getFieldDecorator('name', {
                            rules: [
                                {validator: StrapiValidation.genericName},
                                {required: true, message: 'This field is required.'}
                            ]
                        },)(<Input size='large'/>)}
                    </Form.Item>
                    <Form.Item label='Location' style={{marginBottom:60}}>
                        {getFieldDecorator('location', {
                            rules: [{validator: StrapiValidation.genericName}]
                        },)(<Input size='large'/>)}
                    </Form.Item>
                </Form>
                <section className={cx('submit', {stickied:submitStickied})}>
                    <Button className='button'  onClick={this.onSubmit}>Submit</Button>
                </section>
            </div>
        )
    }
}

export default observer(Form.create<Props>({name: 'addSuggestion'})(SuggestionForm));