import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadOut from './LoadOut';
import {Container, Row, Col, Button} from 'reactstrap';
import APIURL from '../helpers/environment';

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

export default class TeamBuilder extends Component<any,any> {
    constructor(props:any) {
        super(props)
        this.state = {
            activeMech: [],
            activeSlot: 'mech0',
            mech1:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            mech2:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            mech3:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            mech4:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            noPopUp: true,
        }
    };
    
    loadUserData = () => {
        let data = this.props.userData;
        if (data.mech1.length>10) {
            this.setState({mech1:this.props.userData.mech1})
            this.setState({mech2:this.props.userData.mech2})
            this.setState({mech3:this.props.userData.mech3})
            this.setState({mech4:this.props.userData.mech4})
        }  
    }

    togglePop = (mech:any[], number:string) => {
        this.setState({activeMech:mech})
        this.setState({activeSlot:number})
        this.setState({noPopUp:(!this.state.noPopUp)})
    }
    
    setBuild = () => {
        if (this.state.activeSlot === 'mech1') {
            this.setState({mech1:this.state.activeMech})
        } else if (this.state.activeSlot === 'mech2') {
            this.setState({mech2:this.state.activeMech})
        } else if (this.state.activeSlot === 'mech3') {
            this.setState({mech3:this.state.activeMech})
        } else if (this.state.activeSlot === 'mech4') {
            this.setState({mech4:this.state.activeMech})
        }
    }
    
    changeArray = (location:number, change:number) => {
        let tempHolder = this.state.activeMech;
        tempHolder[location] = change;
        this.setState({activeMech:tempHolder})
    }

    childProps = { 
        mechHolder:this.props.mechHolder,
        wpnHolder:this.props.wpnHolder,
        userData:this.props.userData,
        toggle:this.togglePop,
        setBuild:this.setBuild,
        changeArray:this.changeArray
    }

    saveTeam = () => {
        fetch(`${APIURL}/user/team`, {
                method: 'PUT',
                body: JSON.stringify({ team: {
                        mech1:`[${this.state.mech1}]`,
                        mech2:`[${this.state.mech2}]`,
                        mech3:`[${this.state.mech3}]`,
                        mech4:`[${this.state.mech4}]`
                }}),
                headers: new Headers ({
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + this.props.token
                })
            }).then(
                (response) => response.json()
            ).catch(err => console.log(err))
    }

    componentDidMount(){this.loadUserData()}
    componentDidUpdate(prevProps:any) {if ((this.props.userData.mech1 !== prevProps.userData.mech1)||(this.props.userData.mech2 !== prevProps.userData.mech2)||(this.props.userData.mech3 !== prevProps.userData.mech3)||(this.props.userData.mech4 !== prevProps.userData.mech4)){this.loadUserData()}}

    displayBuild = (mechArray:number[]) => {
        let show:string;
        if (mechArray[0] === 0) {show = 'Get Started'} else {
        let answer:MechInterface = this.props.mechHolder.find((x:MechInterface) => x.id === mechArray[0])
        show = answer.model};         
        return( <div>{show}</div>)
    }

    render() {
        return (
            <div>
                {(this.state.noPopUp)? 
                <div className="TeamBuilder">   
                    <h3>TeamBuilder</h3>
                    <Container>
                        <Row>
                            <Col><div style={{width:'250px', height:'500px', background:'black'}} onClick={()=>this.togglePop(this.state.mech1, 'mech1')}>
                                <h2><u>Mech 1</u></h2>
                                <div>{this.displayBuild(this.state.mech1)}</div>
                                </div></Col>
                            <Col><div style={{width:'250px', height:'500px', background:'black'}} onClick={()=>this.togglePop(this.state.mech2, 'mech2')}>
                                <h2><u>Mech 2</u></h2>
                                <div>{this.displayBuild(this.state.mech2)}</div>
                                </div></Col>
                            <Col><div style={{width:'250px', height:'500px', background:'black'}} onClick={()=>this.togglePop(this.state.mech3, 'mech3')}>
                                <h2><u>Mech 3</u></h2>
                                <div>{this.displayBuild(this.state.mech3)}</div>
                                </div></Col>
                            <Col><div style={{width:'250px', height:'500px', background:'black'}} onClick={()=>this.togglePop(this.state.mech4, 'mech4')}>
                                <h2><u>Mech 4</u></h2>
                                <div>{this.displayBuild(this.state.mech4)}</div>
                                </div></Col>
                        </Row>
                    </Container>
                    <br></br>
                    <Button onClick={()=>this.saveTeam()}>Save Team</Button>
                </div>:
                    <LoadOut {...this.childProps} activeMech={this.state.activeMech}/>}
            </div>
        );
    }
}
