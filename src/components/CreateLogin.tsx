import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateLogin.css';
//import APIURL from '../helpers/environment';

const CreateLogin = (props:any) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let handleSubmit = (event:any) => {
        event.preventDefault();
        if (password.length >= 5) {
            fetch(`http://localhost:5000/user/register`, {
                method: 'POST',
                body: JSON.stringify({user:{email:email, password:password}}),
                headers: new Headers ({
                    'Content-Type':'application/json'
                })
            }).then(
                (response) => response.json()
                ).then((data) => {
                    if (typeof(data.sessionToken) !== 'string') {
                        alert('Email already registered.')
                    } else {
                        props.updateToken(data.sessionToken, data.user.isAdmin);
                        window.location.href='/'
                    }
            })
        } else {
            alert(`Password must be at least 5 characters (${password.length}).`)
        }
    }

    return(
        <div id='createLogin'>
            <h2>Create an Account</h2>
            <br />
            <br />
            <br />
            <Form onSubmit= {handleSubmit}>
                <FormGroup>
                    <Label htmlFor='email'>Email Address</Label>
                    <Input onChange={(e) => setEmail(e.target.value)} type='email' name='email' value={email} required/>
                </FormGroup>
                <FormGroup>
                <Label htmlFor='password'>Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} type='password' name='password' value={password} required/>
                </FormGroup>
                <Button type='submit'>Sign Up</Button>
            </Form>
            <br />
            <br />
            <br />
            <div className='loginSwitch'>
                <h3>Already have an account?</h3>
                <Button  onClick={()=>props.setSettingOne(!props.current)}>Sign in here.</Button>
            </div>
        </div>
    )
}

export default CreateLogin;