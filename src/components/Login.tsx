import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const Login = (props:any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = (event:any) => {       
        event.preventDefault();
        fetch(`http://localhost:5000/user/login`,{
           method: 'POST',
           body: JSON.stringify({user:{email:email, password:password}}),
           headers: new Headers ({
               'Content-Type':'application/json'
           })
        }).then(
           (response) => response.json()
        ).then((data) => {
            if (typeof(data.sessionToken) !== 'string') {
                alert(`Invalid username or password`)
            } else {
                props.updateToken(data.sessionToken);
                window.location.href='/';
            }
        })
    }

    return(
        <div id='logIn'>
            <h2>Log In</h2>
            <br />
            <br />
            <br />
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor='email'>Email Address:</Label>
                    <Input onChange={(e) => setEmail(e.target.value)} type='email' name='email' value={email} required/>
                </FormGroup>
                <FormGroup>
                <Label htmlFor='password'>Password:</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} type='password' name='password' value={password} required/>
                </FormGroup>
                <Button type='submit'>Login</Button>
            </Form>
            <br />
            <br />
            <br />
            <div className='loginSwitch'>
                <h3>Don't have an account?</h3>
                <Button  onClick={()=>props.setSettingOne(!props.current)}>Create an account here!</Button>
            </div>
        </div>
    )
}

export default Login;