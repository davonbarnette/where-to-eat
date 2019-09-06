import React, {Component} from 'react';
import {observer} from "mobx-react";
import {FormComponentProps} from "antd/es/form";
import {Form, Input} from "antd";

import './styles.scss';

import {StrapiValidation} from "../../../../data/Strapi/ValidationSchemas";
import Button from "../../../common/Button/Button";
import StrapiActions from "../../../../data/Strapi/Actions";


interface Props extends FormComponentProps{

}

interface State {

}

class Register extends Component<Props, State> {

    state:State  = {

    };

    onSignUp = () => {
        const {validateFields} = this.props.form;
        validateFields((errors, values)=> {
            if (!errors) return StrapiActions.signup(values);
        })
    };

    render(){
        const {getFieldDecorator} = this.props.form;
        return(
             <section className='register-form'>
                 <Form onSubmit={this.onSignUp} colon={false} className='device-form'>
                     <Form.Item label='Username'>
                        {getFieldDecorator('username', {
                            rules: [
                                {validator: StrapiValidation.email},
                                {required: true, message: 'This field is required.'}
                            ]
                        },)(<Input size='large'/>)}
                    </Form.Item>
                    <Form.Item label='Email'>
                        {getFieldDecorator('email', {
                            rules: [
                                {validator: StrapiValidation.email},
                                {required: true, message: 'This field is required.'}
                            ]
                        },)(<Input size='large'/>)}
                    </Form.Item>
                    <Form.Item label='Password'>
                        {getFieldDecorator('password', {
                            rules: [
                                {validator: StrapiValidation.password},
                                {required: true, message: 'This field is required.'}
                            ]
                        },)(<Input.Password size='large'/>)}
                    </Form.Item>
                    <Form.Item>
                        <Button className='register-button' onClick={this.onSignUp}>Sign Up</Button>
                    </Form.Item>
                </Form>
            </section>
        )
    }
}

export default observer(Form.create<Props>({name: 'register'})(Register));