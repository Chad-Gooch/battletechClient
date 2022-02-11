import React, {Component} from 'react';
import {Outlet} from "react-router-dom";
import {Button} from 'reactstrap';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Banner.css';

export default class Banner extends Component<any,any> {
    constructor(props:any) {
        super(props)
        this.state = {
            settingOne:false
        }
    }

     menu = require('../assets/MenuIcon.png');
     logo = require('../assets/bannerLogo.png');

    toggle = (tokenHolder:string) => {
        if (tokenHolder!=='') {this.setState({settingOne:false})
        } else {this.setState({settingOne:true})}
    };

    componentDidMount(){this.toggle(this.props.sessionToken)}
    componentDidUpdate(prevProps:any) {if (this.props.sessionToken !== prevProps.sessionToken){this.toggle(this.props.sessionToken)}}
    
    render() {
    return (
        <div>
            <Navbar className='navbar' expand="md">
                    <button id='menuIcon' onClick={()=>this.props.toggle()}><img src={this.menu} alt='menu'/></button>
                <NavbarBrand className='brand' href="/"><img src={this.logo} alt='BattleTech' /></NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem >{(this.state.settingOne)?<Button className='signinbutton' href='/SignIn'>Sign In</Button>:<Button className='logoutButton' onClick={this.props.clearToken}>Logout</Button>}</NavItem>
                </Nav>
            </Navbar>

            <Outlet />
        </div>
    );
}}