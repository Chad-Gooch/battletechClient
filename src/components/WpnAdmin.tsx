import React, {Component} from 'react';
import {Table, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import WpnPopup from './WpnPopup';
import APIURL from '../helpers/environment';

interface WpnInterface {
    id: number;
    model: string;
    type: string;
    weight: number;
    shots: number;
    damage: number;
    stability: number;
    heat: number;
    minRange: number;
    maxRange: number;
    DLC: string|null;
  }

export default class WpnAdmin extends Component<any,any> {
    constructor(props:any) {
        super(props)
        this.state = {
            model:'',
            type:'',
            weight:'',
            shots:'',
            damage:'',
            stability:'',
            heat:'',
            minRange:'',
            maxRange:'',
            DLC:'Base'
        }
    }



       addWpn = (event:any) => {
            fetch(`${APIURL}/wpn/add`, {
                method: 'POST',
                body: JSON.stringify({ Wpn: {
                    model:this.state.model,
                    type:this.state.type,
                    weight:this.state.weight,
                    shots:this.state.shots,
                    damage:this.state.damage,
                    stability:this.state.stability,
                    heat:this.state.heat,
                    minRange:this.state.minRange,
                    maxRange:this.state.maxRange,
                    DLC:this.state.DLC
                }}),
                headers: new Headers ({
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + this.props.token
                })
            }).then(
                (response) => response.json()
            ).catch(err => console.log(err))
    }

     wpnMapper = (weapons:WpnInterface[]) => {
        return weapons.map((name:WpnInterface) => {
            return(
                    <WpnPopup key={name.id} wpn={name} token={this.props.token} />
            )
        })
    }

    render() {
        return (
            <div>
                <br />
                <br />
                <form onSubmit = {this.addWpn}>
                    <Table style={{width:'80%', margin:'auto'}} dark>
                        <thead>
                        <tr>
                            <th style={{width:'100px', color:'white'}}>model</th>
                            <th style={{width:'100px', color:'white'}}>type</th>
                            <th style={{width:'100px', color:'white'}}>weight</th>
                            <th style={{width:'100px', color:'white'}}>shots</th>
                            <th style={{width:'100px', color:'white'}}>damage</th>
                            <th style={{width:'100px', color:'white'}}>stability</th>
                            <th style={{width:'100px', color:'white'}}>heat</th>
                            <th style={{width:'100px', color:'white'}}>minRange</th>
                            <th style={{width:'100px', color:'white'}}>maxRange</th>
                            <th style={{width:'100px', color:'white'}}>DLC</th>
                            <th style={{width: '100px', color:'black'}}>____</th>
                            <th style={{width: '100px',color:'black'}}>____</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({model:e.target.value})} type='text' name='model' value={this.state.model} required/></td>
                            <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({type:e.target.value})} type='text' name='type' value={this.state.type} required/></td>
                            <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({weight:e.target.value})} type='number' name='weight' value={this.state.weight} required/></td>
                            <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({shots:e.target.value})} type='number' name='shots' value={this.state.shots} required/></td>
                            <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({damage:e.target.value})} type='number' name='damage' value={this.state.damage} required/></td>
                            <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({stability:e.target.value})} type='number' name='stability' value={this.state.stability} required/></td>
                            <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({heat:e.target.value})} type='number' name='heat' value={this.state.heat} required/></td>
                            <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({minRange:e.target.value})} type='number' name='minRange' value={this.state.minRange} required/></td>
                            <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({maxRange:e.target.value})} type='number' name='maxRange' value={this.state.maxRange} required/></td>
                            <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({DLC:e.target.value})} type='text' name='DLC' value={this.state.DLC} required/></td>
                            <td><Button  style={{width:'100px', color:'white'}}type='submit'>Add Wpn</Button></td>
                            <td style={{width:'100px', color:'white'}}></td>
                        </tr>
                        </tbody>
                    </Table>
                </form>
                <br />
                    {this.wpnMapper(this.props.wpnHolder)}
            </div>
        );
}}
