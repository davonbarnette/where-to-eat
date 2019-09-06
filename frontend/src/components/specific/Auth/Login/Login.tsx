import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Form, Input} from "antd";
import {FormComponentProps} from "antd/es/form";

import './styles.scss';

import {StrapiValidation} from "../../../../data/Strapi/ValidationSchemas";
import Button from "../../../common/Button/Button";
import StrapiActions from "../../../../data/Strapi/Actions";


interface Props extends FormComponentProps {

}

interface State {

}

class Login extends Component<Props, State> {

    state: State = {};

    onLogin = () => {
        const {validateFields} = this.props.form;
        validateFields((errors, values)=> {
            if (!errors) return StrapiActions.login(values);
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <section className='login-form'>
                <Form onSubmit={this.onLogin} colon={false} className='device-form'>
                    <Form.Item label='E-mail or Username'>
                        {getFieldDecorator('identifier', {
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
                        <Button className='login-button' onClick={this.onLogin}>Login</Button>
                    </Form.Item>
                </Form>
            </section>
        )
    }
}

export default observer(Form.create<Props>({name: 'login'})(Login));