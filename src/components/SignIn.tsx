import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignIn.css';
import Login from './Login';
import CreateLogin from './CreateLogin';

export default class SignIn extends Component<any,any> {
    constructor(props:any) {
        super(props)
        this.state = {
            settingOne:true,
        }
    }

    changeSettingOne = () => {
        this.setState({settingOne:(!this.state.settingOne)})
    }

    toChildren = {
        updateToken:this.props.updateToken, 
        changeSettingOne:this.changeSettingOne,
    }

    render() {
    return (
        <div className="loginScreen">            
            {(this.state.settingOne) ? <Login {...this.toChildren}/> : <CreateLogin {...this.toChildren} /> }
        </div>
    );
}}