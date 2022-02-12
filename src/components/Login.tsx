import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import APIURL from '../helpers/environment';

export default class Login extends Component<any,any> {
    constructor(props:any) {
        super(props)
        this.state = {
            email:'',
            password:''
        }
    }



     handleSubmit = (event:any) => {       
        event.preventDefault();
        fetch(`${APIURL}/user/login`,{
           method: 'POST',
           body: JSON.stringify({user:{email:this.state.email, password:this.state.password}}),
           headers: new Headers ({
               'Content-Type':'application/json'
           })
        }).then(
           (response) => response.json()
        ).then((data) => {
            if (typeof(data.sessionToken) !== 'string') {
                alert(`Invalid username or password`)
            } else {
                this.props.updateToken(data.sessionToken, data.user.isAdmin);
                window.location.href='/';
            }
        })
    }

    render() {
    return(
        <div id='logIn'>
            <h2>Log In</h2>
            <br />
            <br />
            <br />
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label htmlFor='email'>Email Address:</Label>
                    <Input onChange={(e) => this.setState({email:e.target.value})} type='email' name='email' value={this.state.email} required/>
                </FormGroup>
                <FormGroup>
                <Label htmlFor='password'>Password:</Label>
                    <Input onChange={(e) => this.setState({password:e.target.value})} type='password' name='password' value={this.state.password} required/>
                </FormGroup>
                <Button type='submit'>Login</Button>
            </Form>
            <br />
            <br />
            <br />
            <div className='loginSwitch'>
                <h3>Don't have an account?</h3>
                <Button  onClick={()=>this.props.changeSettingOne()}>Create an account here!</Button>
            </div>
        </div>
    )
}}
