import React, {Component} from 'react';
import {Table, Col, Button, Row} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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

export default class MechView extends Component <any,any> {
    constructor(props:any) {
        super(props)
        this.state = {
            sortMech:[]
        }
    };

     mechMapper = (machine:MechInterface[]) => {
        return machine.map((name:MechInterface) => {
            return(
                <tr key={name.id}>
                    <td>{name.model}</td>
                    <td>{name.weight}</td>
                    <td>{name.freeTon}</td>
                    <td>{name.walk}</td>
                    <td>{name.maxJet}</td>
                    <td>{name.head}</td>
                    <td>{name.rightArm}</td>
                    <td>{name.rightTorso}</td>
                    <td>{name.center}</td>
                    <td>{name.leftTorso}</td>
                    <td>{name.leftArm}</td>
                    <td>{name.DLC}</td>
                </tr>
            )
        })
    }

    

     sortLight = () => {
        let holder = this.props.mechHolder.filter((item:MechInterface) => item.weight < 37);
        this.setState({sortMech:holder.sort(function (a:MechInterface,b:MechInterface){return a.weight - b.weight})});
    }

     sortMedium = () => {
        let holder = this.props.mechHolder.filter((item:MechInterface) => ((item.weight > 36)&&(item.weight < 56)));
        this.setState({sortMech:holder.sort(function (a:MechInterface,b:MechInterface){return a.weight - b.weight})});
    }

     sortHeavy = () => {
        let holder = this.props.mechHolder.filter((item:MechInterface) => ((item.weight > 56)&&(item.weight < 76)));
        this.setState({sortMech:holder.sort(function (a:MechInterface,b:MechInterface){return a.weight - b.weight})});
    }

     sortAssault = () => {
        let holder = this.props.mechHolder.filter((item:MechInterface) => item.weight > 77);
        this.setState({sortMech:holder.sort(function (a:MechInterface,b:MechInterface){return a.weight - b.weight})});
    }

     sortAll = () => {
        let holder = this.props.mechHolder
        this.setState({sortMech:holder.sort(function (a:MechInterface,b:MechInterface){return a.weight - b.weight})})
    }

    componentDidMount(){this.sortAll()}

    render() {
    return (
        <div>
            <Row style={{width:'80%', margin:'auto'}}>
                <Col><Button onClick={()=>this.sortAll()}>All</Button></Col>
                <Col><Button onClick={()=>this.sortLight()}>Light</Button></Col>
                <Col><Button onClick={()=>this.sortMedium()}>Medium</Button></Col>
                <Col><Button onClick={()=>this.sortHeavy()}>Heavy</Button></Col>
                <Col><Button onClick={()=>this.sortAssault()}>Assault</Button></Col>
            </Row>
        <Table id="MechView" style={{width:'90%', margin:'auto', background:'rgba(169, 169, 169, 0.3)'}} dark>
            <thead>
                <tr>
                    <td>model</td>
                    <td>weight</td>
                    <td>freeTon</td>
                    <td>walk</td>
                    <td>maxJet</td>
                    <td>head</td>
                    <td>Right Arm</td>
                    <td>Right Torso</td>
                    <td>Core</td>
                    <td>Left Torso</td>
                    <td>Left Arm</td>
                    <td>DLC</td>
                </tr>
            </thead>
            <tbody>
                {this.mechMapper(this.state.sortMech)}
            </tbody>
        </Table>
        </div>         
    );
}
}