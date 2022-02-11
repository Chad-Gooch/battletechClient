import React, {Component} from 'react';
import {Table, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MechPopup from './MechPopup';

interface MechInterface {
    id: number;
    model: string;
    DLC: string;
    weight: number;
    freeTon: number;
    walk: number;
    maxJet: number;
    head: string;
    rightArm: string;
    rightTorso: string;
    center: string;
    leftTorso: string;
    leftArm: string;
  }

export default class MechAdmin extends Component<any,any> {
    constructor(props:any) {
        super(props)
        this.state = {
            model:'',
            DLC:'Base',
            weight:'',
            freeTon:'',
            walk:'',
            maxJet:'',
            head:'',
            rightArm:'',
            rightTorso:'',
            center:'',
            leftTorso:'',
            leftArm:''
        }
    }

     addMech = () => {
            fetch(`http://localhost:5000/mech/add`, {
                method: 'POST',
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
    


     mechMapper = (machine:MechInterface[]) => {
        return machine.map((name:MechInterface) => {
            return(
                    <MechPopup mech={name} token={this.props.token}/>
            )
        })
    }

    render() {
    return (
        <div >
            <br />
            <br />
            <form onSubmit = {this.addMech}>
                <Table style={{width:'80%', margin:'auto'}} dark>
                    <tr>
                        <th style={{width:'100px', color:'white'}}>model</th>
                        <th style={{width:'100px', color:'white'}}>weight</th>
                        <th style={{width:'100px', color:'white'}}>freeTon</th>
                        <th style={{width:'100px', color:'white'}}>walk</th>
                        <th style={{width:'100px', color:'white'}}>maxJet</th>
                        <th style={{width:'100px', color:'white'}}>head</th>
                        <th style={{width:'100px', color:'white'}}>rightArm</th>
                        <th style={{width:'100px', color:'white'}}>rightTorso</th>
                        <th style={{width:'100px', color:'white'}}>Core</th>
                        <th style={{width:'100px', color:'white'}}>leftTorso</th>
                        <th style={{width:'100px', color:'white'}}>leftArm</th>
                        <th style={{width:'100px', color:'white'}}>DLC</th>
                        <th style={{width:'100px', color:'black'}}>____</th>
                        <th style={{width:'100px', color:'black'}}>____</th>

                    </tr>
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
                        <td><Button  style={{width:'100px', color:'white'}}onClick={() => this.addMech()}>Add Mech</Button></td>
                        <td style={{width:'100px', color:'white'}}></td>
                    </tr>
                </Table>
            </form>
            <br />
            {this.mechMapper(this.props.mechHolder)}
        </div> 
    );
}}