import BrowserRouter from "../../../data/Routers/BrowserRouter";
import * as FeatherIcon from "react-feather";
import React, {Component} from "react";
import Logo from '../../../assets/icons/logo-only.png';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Avatar, Layout, Menu} from 'antd';
import cx from 'classnames';
import {APP_HEADER_ITEMS} from "./HeaderPaths";
import {ClickParam} from "antd/lib/menu";

const {Sider} = Layout;
interface Props extends RouteComponentProps {

}

interface State {
    collapsed:boolean,
}

class AppHeader extends Component<Props, State> {

    state:State = {
        collapsed:false,
    };

    get selectedKey(){
        for (let key in APP_HEADER_ITEMS){
            if(this.props.location.pathname.startsWith(APP_HEADER_ITEMS[key].path)) return key;
        }
        return '';
    }

    onCollapse = (collapsed:boolean) => {
        this.setState({ collapsed });
    };

    onMenuItemSelect = (param:ClickParam) => {
        let path = APP_HEADER_ITEMS[param.key].path;
        BrowserRouter.push(path);
    };

    get menuItems(){


        return Object.keys(APP_HEADER_ITEMS).map(key => {
            const {icon} = APP_HEADER_ITEMS[key];
            return (
                <Menu.Item key={key}>
                    {icon}
                    <span>{key}</span>
                </Menu.Item>
            )
        })
    }

    get trigger(){
        return <FeatherIcon.ChevronLeft/>;
    }


    render(){
        const {collapsed} = this.state;
        return (
            <Sider className='app-header' trigger={<FeatherIcon.ChevronLeft/>} theme='light' collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <div className={cx('logo', {collapsed})}><img alt="" src={Logo}/><span>Realtime</span></div>
                <div className='avatar'>
                    <div className={cx('avatar-container', {collapsed})}>
                        <Avatar size='small'><FeatherIcon.User size={18}/></Avatar>
                        <span className='username'>Username</span>
                    </div>
                </div>
                <Menu theme='light' selectedKeys={[this.selectedKey]} onClick={this.onMenuItemSelect} mode='inline'>
                    {this.menuItems}
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(AppHeader);
