import React, {Component} from 'react';
import {Table, Col, Row, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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

export default class WpnView extends Component<any,any> {
    constructor(props:any) {
        super(props)
        this.state = {
            sortWpn:[]
        }
    };

    componentDidMount(){this.sortAll()}

    wpnMapper = (weapons:WpnInterface[]) => {
        return weapons.map((name:WpnInterface) => {
            return(
                <tr key={name.id}>
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
        let holder = this.props.wpnHolder.filter((item:WpnInterface) => item.type.toLowerCase() === 'support');
        this.setState({sortWpn:holder});
    }

     sortEnergy = () => {
        let holder = this.props.wpnHolder.filter((item:WpnInterface) => item.type.toLowerCase() === 'energy');
        this.setState({sortWpn:holder.sort(function (a:WpnInterface,b:WpnInterface){return a.weight - b.weight})});
    }

     sortBallistic = () => {
        let holder = this.props.wpnHolder.filter((item:WpnInterface) => item.type.toLowerCase() === 'ballistic');
        this.setState({sortWpn:holder.sort(function (a:WpnInterface,b:WpnInterface){return a.weight - b.weight})});
    }

     sortMissile = () => {
        let holder = this.props.wpnHolder.filter((item:WpnInterface) => item.type.toLowerCase() === 'missile');
        this.setState({sortWpn:holder.sort(function (a:WpnInterface,b:WpnInterface){return a.weight - b.weight})});
    }

     sortAll = () => {
        let holder = this.props.wpnHolder
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
            </tbody>
        </Table> 
        </div>
    );
}}