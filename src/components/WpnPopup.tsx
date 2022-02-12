import React, {Component} from "react";
import {Table, Button} from 'reactstrap';
import APIURL from '../helpers/environment';
 
export default class WpnPopup extends Component<any,any> {
    constructor(props:any) {
        super(props)
        this.state = {
            model:this.props.wpn.model,
            type:this.props.wpn.type,
            weight:this.props.wpn.weight,
            shots:this.props.wpn.shots,
            damage:this.props.wpn.damage,
            stability:this.props.wpn.stability,
            heat:this.props.wpn.heat,
            minRange:this.props.wpn.minRange,
            maxRange:this.props.wpn.maxRange,
            DLC:this.props.wpn.DLC
        }
    }

    wpnUpdate = () => {
            fetch(`${APIURL}/wpn/update/${this.props.wpn.id}`, {
                method: 'PUT',
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

    wpnDelete = () => {
        fetch(`${APIURL}/wpn/delete/${this.props.wpn.id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            })
        }).then(
            (response) => response.json()
        ).catch(err => console.log(err))
    }

    render() {
  return (
      <form>
        <Table style={{width:'80%', margin:'auto'}} dark>
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
                <td><Button style={{width:'100px', color:'white'}}onClick={() => this.wpnUpdate()}>Update</Button></td>
                <td><Button style={{width:'100px', color:'white'}}onClick={() => this.wpnDelete()}>Delete</Button></td>
            </tr>
        </Table>
      </form>
  );
};}