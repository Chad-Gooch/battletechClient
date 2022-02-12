import React, {Component} from "react";
import {Table, Button} from 'reactstrap';
import APIURL from '../helpers/environment';
 
export default class MechPopup extends Component<any,any>{
    constructor(props:any) {
        super(props)
        this.state = {
            model:this.props.mech.model,
            DLC:this.props.mech.DLC,
            weight:this.props.mech.weight,
            freeTon:this.props.mech.freeTon,
            walk:this.props.mech.walk,
            maxJet:this.props.mech.maxJet,
            head:this.props.mech.head,
            rightArm:this.props.mech.rightArm,
            rightTorso:this.props.mech.rightTorso,
            center:this.props.mech.center,
            leftTorso:this.props.mech.leftTorso,
            leftArm:this.props.mech.leftArm
        }
    }

     mechUpdate = () => {
        fetch(`${APIURL}/mech/update/${this.props.mech.id}`, {
                method: 'PUT',
                body: JSON.stringify({ mech: {
                        model:this.state.model,
                        DLC:this.state.DLC,
                        weight:this.state.weight,
                        freeTon:this.state.freeTon,
                        walk:this.state.walk,
                        maxJet:this.state.maxJet,
                        head:this.state.head,
                        rightArm:this.state.rightArm,
                        rightTorso:this.state.rightTorso,
                        center:this.state.center,
                        leftTorso:this.state.leftTorso,
                        leftArm:this.state.leftArm
                }}),
                headers: new Headers ({
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + this.props.token
                })
            }).then(
                (response) => response.json()
            ).catch(err => console.log(err))
    }

     mechDelete = () => {
        fetch(`${APIURL}/mech/delete/${this.props.mech.id}`, {
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
    <div style={{margin:'auto'}}>
      <form>
        <Table style={{width:'80%', margin:'auto'}} dark>
            <tr>
                <td><input  style={{width:'100px', color:'white'}} onChange={(e) => this.setState({model:e.target.value})} type='text' name='model' value={this.state.model} required/></td>
                <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({weight:e.target.value})} type='number' name='weight' value={this.state.weight} required/></td>
                <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({freeTon:e.target.value})} type='text' name='freeTon' value={this.state.freeTon} required/></td>
                <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({walk:e.target.value})} type='number' name='walk' value={this.state.walk} required/></td>
                <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({maxJet:e.target.value})} type='number' name='maxJet' value={this.state.maxJet} required/></td>
                <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({head:e.target.value})} type='number' name='head' value={this.state.head} required/></td>
                <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({rightArm:e.target.value})} type='rightArm' name='rightArm' value={this.state.rightArm} required/></td>
                <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({rightTorso:e.target.value})} type='number' name='rightTorso' value={this.state.rightTorso} required/></td>
                <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({center:e.target.value})} type='number' name='center' value={this.state.center} required/></td>
                <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({leftTorso:e.target.value})} type='number' name='leftTorso' value={this.state.leftTorso} required/></td>
                <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({leftArm:e.target.value})} type='number' name='leftArm' value={this.state.leftArm} required/></td>
                <td><input  style={{width:'100px', color:'white'}}onChange={(e) => this.setState({DLC:e.target.value})} type='text' name='DLC' value={this.state.DLC} required/></td>
                <td><Button style={{width:'100px', color:'white'}} onClick={() => this.mechUpdate()}>Update</Button></td>
                <td><Button style={{width:'100px', color:'white'}} onClick={() => this.mechDelete()}>Delete</Button></td>
            </tr>
        </Table>
      </form>
    </div>
  );
};}