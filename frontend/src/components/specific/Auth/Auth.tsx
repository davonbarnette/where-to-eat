import React, {Component} from 'react';
import {observer} from "mobx-react";

import './styles.scss';
import Login from "./Login/Login";
import SignUp from "./Register/Register";

type AuthType = 'login'|'signup';

interface Props {

}

interface State {
    authType:AuthType
}

class Auth extends Component<Props, State> {

    state:State  = {
        authType:'login',
    };
    swapAuthType = (authType:AuthType) => {
        this.setState({authType});
    };

    get auth(){
        const {authType} = this.state;
        if (authType === 'login') return <Login/>;
        else if (authType === 'signup') return <SignUp/>;
        else return null;
    }
    get footer(){
        const {authType} = this.state;
        if (authType === 'login') return (
            <footer className='footer'>Don't have an account? <div onClick={()=>this.swapAuthType('signup')}>Sign up</div> instead.</footer>
        );
        else if (authType === 'signup') return (
            <footer className='footer'>Have an account? <div onClick={()=>this.swapAuthType('login')}>Log in</div> instead.</footer>
        );
        else return null;
    }

    render(){
        return(
             <section className='auth-page'>
                 <div className='content'>
                     <header className='header'>
                         <div className='title'>
                             Welcome to Make a Fucking Decision
                         </div>
                         <p className='subtitle'>Let's get you started by either signing you up or logging into your
                             account.</p>
                     </header>
                     {this.auth}
                     {this.footer}
                 </div>
            </section>
        )
    }
}

export default observer(Auth);