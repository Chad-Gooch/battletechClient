import React, {Component} from 'react';
import {Table, Col, Row, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

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

export default class LoadWpn extends Component<any,any> {
    constructor(props:any) {
        super(props)
        this.state = {
            validWpn:[],
            sortWpn:[],
            currentArr:[]
        }
    };

    loadAvailable = () => {
        let finish = [];
        if (this.props.location === 'foot') {
            finish = [0,0,0,0]
        } else {
        let startPoint = this.props.currentMech[this.props.location];
        finish = [(Math.floor(startPoint[0])),(Math.floor(startPoint[1])),(Math.floor(startPoint[2])),(Math.floor(startPoint[3]))];
        };
        this.setState({currentArr:finish});
        let ballistic = [];
        let energy = [];
        let missile = [];
        let support = [];
        if (finish[0] > 0){ballistic = this.props.wpnHolder.filter((item:WpnInterface) => item.type.toLowerCase() === 'ballistic')};
        if (finish[1] > 0){energy = this.props.wpnHolder.filter((item:WpnInterface) => item.type.toLowerCase() === 'energy')};
        if (finish[2] > 0){missile = this.props.wpnHolder.filter((item:WpnInterface) => item.type.toLowerCase() === 'missile')};
        if (finish[3] > 0){support = this.props.wpnHolder.filter((item:WpnInterface) => item.type.toLowerCase() === 'support')};
        let total = [...ballistic, ...energy, ...missile, ...support]
        this.setState({validWpn:total})
    }

    componentDidMount(){this.loadAvailable()}


    wpnMapper = (weapons:WpnInterface[]) => {
        return weapons.map((name:WpnInterface) => {
            return(
                <tr key={name.id} onClick={()=>this.props.selectWpn(name.id)}>
                    <td>{name.model}</td>
                    <td>{name.type}</td>
                    <td>{name.weight}</td>
                    <td>{name.shots}</td>
                    <td>{name.damage}</td>
                    <td>{name.stability}</td>
                    <td>{name.heat}</td>
                    <td>{name.minRange}</td>
                    <td>{name.maxRange}</td>
                    <td>{name.DLC}</td>
                </tr>
            )
        })
    }

     sortSupport = () => {
        let holder = this.state.validWpn.filter((item:WpnInterface) => item.type.toLowerCase() === 'support');
        this.setState({sortWpn:holder});
    }

     sortEnergy = () => {
        let holder = this.state.validWpn.filter((item:WpnInterface) => item.type.toLowerCase() === 'energy');
        this.setState({sortWpn:holder.sort(function (a:WpnInterface,b:WpnInterface){return a.weight - b.weight})});
    }

     sortBallistic = () => {
        let holder = this.state.validWpn.filter((item:WpnInterface) => item.type.toLowerCase() === 'ballistic');
        this.setState({sortWpn:holder.sort(function (a:WpnInterface,b:WpnInterface){return a.weight - b.weight})});
    }

     sortMissile = () => {
        let holder = this.state.validWpn.filter((item:WpnInterface) => item.type.toLowerCase() === 'missile');
        this.setState({sortWpn:holder.sort(function (a:WpnInterface,b:WpnInterface){return a.weight - b.weight})});
    }

     sortAll = () => {
        let holder = this.state.validWpn
        this.setState({sortWpn:holder.sort(function (a:WpnInterface,b:WpnInterface)
            {var nameA = a.type.toLowerCase();
            var nameB = b.type.toLowerCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            return 0;})})
    }

    render() {
    return (
        <div>
            <Row style={{width:'80%', margin:'auto'}}>
                <Col><Button onClick={()=>this.sortAll()}>All</Button></Col>
                <Col><Button onClick={()=>this.sortSupport()}>Support</Button></Col>
                <Col><Button onClick={()=>this.sortEnergy()}>Energy</Button></Col>
                <Col><Button onClick={()=>this.sortBallistic()}>Ballistic</Button></Col>
                <Col><Button onClick={()=>this.sortMissile()}>Missile</Button></Col>
            </Row>
        <Table id="WpnView" style={{width:'80%', margin:'auto', background:'rgba(169, 169, 169, 0.3)'}} dark>
            <thead>
                <tr>
                    <th>model</th>
                    <th>type</th>
                    <th>weight</th>
                    <th>shots</th>
                    <th>damage</th>
                    <th>stability</th>
                    <th>heat</th>
                    <th>minRange</th>
                    <th>maxRange</th>
                    <th>DLC</th>
                </tr>
            </thead>
            <tbody>
                {this.wpnMapper(this.state.sortWpn)}
                <tr onClick={()=>this.props.selectWpn(99)}><td>Jump Jets</td><td></td><td>1</td><td></td><td></td><td></td><td>3</td><td></td><td></td><td></td></tr>
                <tr onClick={()=>this.props.selectWpn(98)}><td>Heat Sink</td><td></td><td>1</td><td></td><td></td><td></td><td>-3</td><td></td><td></td><td></td></tr>
            </tbody>
        </Table> 
        </div>
    );
}}