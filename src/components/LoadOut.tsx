import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class LoadOut extends Component<any,any> {
    constructor(props:any) {
        super(props)
        this.state = {
            settingOne:true,
        }
    }


    render() {
    return (
        <div className="LoadOut">   
            <h3>LoadOut</h3>         
        </div>
    );
}}