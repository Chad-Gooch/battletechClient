import React, {useState, useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {Button} from 'reactstrap';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Banner.css';

const Banner = (props:any) => {

    const menu = require('../assets/MenuIcon.png');
    const logo = require('../assets/bannerLogo.png');
    const [settingOne, setSettingOne] = useState(false);

    const toggle = (tokenHolder:string) => {
        if (tokenHolder !== '') {setSettingOne(false)
        } else {setSettingOne(true)}
    };

    useEffect(()=>{
        toggle(props.sessionToken);
    },[props.sessionToken])

    return (
        <div>
            <Navbar className='navbar' expand="md">
                    <button id='menuIcon' onClick={()=>props.toggle()}><img src={menu}/></button>
                <NavbarBrand className='brand' href="/"><img src={logo} alt='BattleTech' /></NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem >{(settingOne)?<Button className='signinbutton' href='/SignIn'>Sign In</Button>:<Button className='logoutButton' onClick={props.clearToken}>Logout</Button>}</NavItem>
                </Nav>
            </Navbar>

            <Outlet />
        </div>
    );
}

export default Banner;