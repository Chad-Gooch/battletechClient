import React, {useState, useEffect} from 'react';
import {Outlet, Link} from "react-router-dom";
import {Button} from 'reactstrap';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sitenav.css';

const Sitenav = (props:any) => {

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
                <NavbarBrand className='brand' href="/">BattleTech</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem><Link className='navitem' to='/MechView'>View Mechs</Link></NavItem>
                    <NavItem><Link className='navitem' to='/WpnView'>View Weapons</Link></NavItem>
                    <NavItem><Link className='navitem' to='/TeamBuilder'>Team Builder</Link></NavItem>
                    <NavItem >{(settingOne)?<Button className='signinbutton' href='/SignIn'>Sign In</Button>:<Button className='logoutButton' onClick={props.clearToken}>Logout</Button>}</NavItem>
                </Nav>
            </Navbar>

            <Outlet />
        </div>
    );
}

export default Sitenav;