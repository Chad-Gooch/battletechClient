import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button} from 'reactstrap';
import './LoadOut.css';
import LoadMech from './LoadMech';
import LoadWpn from './LoadWpn';

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

export default class LoadOut extends Component<any,any> {
    constructor(props:any) {
        super(props)
        this.state = {
            settingOne:true,
            select:true,
            currentMech:{
                id: 0,
                model: 'select a Mech',
                DLC: 'none',
                weight: 0,
                freeTon: 0,
                walk: 0,
                maxJet: 0,
                head: '0000',
                rightArm: '0000',
                rightTorso: '0000',
                center: '0000',
                leftTorso: '0000',
                leftArm: '0000',
              },
            currentLoc:'',
            currentIndex:0
        }
    }

    componentDidMount(){this.mechData()}

    mechData=()=>{
        let arr = this.props.activeMech[0]
        let answer = this.props.mechHolder.find((x:MechInterface) => x.id === arr)
        if (arr !== 0) {
            this.setState({currentMech:answer})
        }else {}
    }

    selectMech=()=>{
        this.setState({settingOne:(!this.state.settingOne)});
        this.setState({select:true});
    };
    
    toggleMechPop = (mechId:number) => {
        this.setState({currentMech:(this.props.mechHolder.find((x:MechInterface) => x.id === mechId))})
        this.setState({settingOne:(!this.state.settingOne)})
        this.props.changeArray(0,mechId)
        console.log(this.props.activeMech)
    }

    selectWpn = (wpnId:number) => {
        this.props.changeArray(this.state.currentIndex, wpnId)
        this.setState({settingOne:(!this.state.settingOne)})
    }

    toggleWpnPop = (wpnId:string, current:number) => {
        this.setState({select:false});
        this.setState({settingOne:(!this.state.settingOne)});
        this.setState({currentLoc:wpnId});
        this.setState({currentIndex:current})
    }

    displayEquip = (location:number) => {
        let wpnId:number = this.props.activeMech[location]
        let displayItem:string;
        if (wpnId === 98) {
            displayItem = 'HeatSink'
        } else if (wpnId === 99) {
            displayItem = 'Jump Jets'
        } else if (wpnId === 0) {
            displayItem = ''
        } else {
            let locateWpn:WpnInterface = this.props.wpnHolder.find((x:WpnInterface) => x.id === wpnId);
            displayItem = locateWpn.model
        }
        return(displayItem)
    }
 
    calculate = () => {
        let currentState = this.props.activeMech;
        let sink = 0;
        let jump = 0;
        let dam = 0;
        let stab = 0;
        let heat = -30;
        for (let i = 1; i < 50 ; i++) {
            if (this.props.activeMech[i] === 0) {
                
            } else if (this.props.activeMech[i] === 99) {
                heat = (heat+3);
                jump = (jump + 1);
            } else if (this.props.activeMech[i] === 98) {
                heat = (heat-3);
                sink = (sink + 1);
            } else {
                let locateWpn:WpnInterface = this.props.wpnHolder.find((x:WpnInterface) => x.id === this.props.activeMech[i]);
                dam = (dam + (locateWpn.shots*locateWpn.damage));
                stab = (stab + (locateWpn.shots*locateWpn.stability));
                heat = (heat + locateWpn.heat);
            }
        };
        currentState[50] = sink;
        currentState[51] = jump;
        currentState[52] = dam;
        currentState[53] = stab;
        currentState[54] = heat;
        this.props.saveCalculations(currentState)
    }
    
    saveBuild = () => {
        this.calculate()
        this.props.toggle()
        this.props.setBuild()
    }

    childProps = { 
        mechHolder:this.props.mechHolder,
        wpnHolder:this.props.wpnHolder,
        userData:this.props.userData,
        toggleMech:this.toggleMechPop,
        selectWpn:this.selectWpn,
        }

    render() {
    return (
        <div>
        {(this.state.settingOne)?
        <div className="LoadOut" style={{backgroundColor:'darkslategrey', height:'775px', width:'1050px', margin:'auto', borderRadius:'150px', paddingTop:'18px'}}>   
            <h2 style={{margin:'auto'}}><Button onClick={()=>this.selectMech()}>{this.state.currentMech.model}</Button></h2>
            <br></br>
            <Container style={{width:'1000px'}}>
                <Row>
                    <Col className='mechColumn'><div className='mechPiece'>Right Arm<p>{this.state.currentMech.rightArm[0]}B {this.state.currentMech.rightArm[1]}E {this.state.currentMech.rightArm[2]}M {this.state.currentMech.rightArm[3]}S</p>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('rightArm', 2)}>{this.displayEquip(2)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('rightArm', 3)}>{this.displayEquip(3)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('rightArm', 4)}>{this.displayEquip(4)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('rightArm', 5)}>{this.displayEquip(5)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('rightArm', 6)}>{this.displayEquip(6)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('rightArm', 7)}>{this.displayEquip(7)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('rightArm', 8)}>{this.displayEquip(8)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('rightArm', 9)}>{this.displayEquip(9)}</button>
                        </div></Col>
                    <Col className='mechColumn'><div className='mechPiece'>Right Torso<p>{this.state.currentMech.rightTorso[0]}B {this.state.currentMech.rightTorso[1]}E {this.state.currentMech.rightTorso[2]}M {this.state.currentMech.rightTorso[3]}S</p>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('rightTorso', 10)}>{this.displayEquip(10)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('rightTorso', 11)}>{this.displayEquip(11)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('rightTorso', 12)}>{this.displayEquip(12)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('rightTorso', 13)}>{this.displayEquip(13)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('rightTorso', 14)}>{this.displayEquip(14)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('rightTorso', 15)}>{this.displayEquip(15)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('rightTorso', 16)}>{this.displayEquip(16)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('rightTorso', 17)}>{this.displayEquip(17)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('rightTorso', 18)}>{this.displayEquip(18)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('rightTorso', 19)}>{this.displayEquip(19)}</button>
                        </div></Col>
                    <Col className='mechColumn'><div className='mechPiece'><Row><div>Head</div><p>{this.state.currentMech.head[0]}B {this.state.currentMech.head[1]}E {this.state.currentMech.head[2]}M {this.state.currentMech.head[3]}S</p>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('head', 1)}>{this.displayEquip(1)}</button>
                        </Row>
                        <br></br>
                        <Row><div>Center Torso</div><p>{this.state.currentMech.center[0]}B {this.state.currentMech.center[1]}E {this.state.currentMech.center[2]}M {this.state.currentMech.center[3]}S</p>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('center', 20)}>{this.displayEquip(20)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('center', 21)}>{this.displayEquip(21)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('center', 22)}>{this.displayEquip(22)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('center', 23)}>{this.displayEquip(23)}</button>
                        </Row></div></Col>
                    <Col className='mechColumn'><div className='mechPiece'>Left Torso<p>{this.state.currentMech.leftTorso[0]}B {this.state.currentMech.leftTorso[1]}E {this.state.currentMech.leftTorso[2]}M {this.state.currentMech.leftTorso[3]}S</p>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('leftTorso', 24)}>{this.displayEquip(24)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('leftTorso', 25)}>{this.displayEquip(25)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('leftTorso', 26)}>{this.displayEquip(26)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('leftTorso', 27)}>{this.displayEquip(27)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('leftTorso', 28)}>{this.displayEquip(28)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('leftTorso', 29)}>{this.displayEquip(29)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('leftTorso', 30)}>{this.displayEquip(30)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('leftTorso', 31)}>{this.displayEquip(31)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('leftTorso', 32)}>{this.displayEquip(32)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('leftTorso', 33)}>{this.displayEquip(33)}</button>
                        </div></Col>
                    <Col className='mechColumn'><div className='mechPiece'>Left Arm<p>{this.state.currentMech.leftArm[0]}B {this.state.currentMech.leftArm[1]}E {this.state.currentMech.leftArm[2]}M {this.state.currentMech.leftArm[3]}S</p>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('leftArm', 34)}>{this.displayEquip(34)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('leftArm', 35)}>{this.displayEquip(35)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('leftArm', 36)}>{this.displayEquip(36)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('leftArm', 37)}>{this.displayEquip(37)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('leftArm', 38)}>{this.displayEquip(38)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('leftArm', 39)}>{this.displayEquip(39)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('leftArm', 40)}>{this.displayEquip(40)}</button>
                        <button className='mechEquip' onClick={()=>this.toggleWpnPop('leftArm', 41)}>{this.displayEquip(41)}</button>
                        </div></Col>
                </Row>
                <Row>
                    <Col><div className='mechLeg'>Right Leg
                    <button className='mechEquip' onClick={()=>this.toggleWpnPop('foot', 42)}>{this.displayEquip(42)}</button>
                    <button className='mechEquip' onClick={()=>this.toggleWpnPop('foot', 43)}>{this.displayEquip(43)}</button>
                    <button className='mechEquip' onClick={()=>this.toggleWpnPop('foot', 44)}>{this.displayEquip(44)}</button>
                    <button className='mechEquip' onClick={()=>this.toggleWpnPop('foot', 45)}>{this.displayEquip(45)}</button>
                    </div></Col>
                    <Col>
                    <div className='mechLeg'>Left Leg
                    <button className='mechEquip' onClick={()=>this.toggleWpnPop('foot', 46)}>{this.displayEquip(46)}</button>
                    <button className='mechEquip' onClick={()=>this.toggleWpnPop('foot', 47)}>{this.displayEquip(47)}</button>
                    <button className='mechEquip' onClick={()=>this.toggleWpnPop('foot', 48)}>{this.displayEquip(48)}</button>
                    <button className='mechEquip' onClick={()=>this.toggleWpnPop('foot', 49)}>{this.displayEquip(49)}</button>
                    </div></Col>
                </Row>
            </Container>
            <Button style={{width:'150px', backgroundColor:'black'}} onClick={()=>this.saveBuild()}>Save</Button>
        </div>:
            (this.state.select)?<LoadMech {...this.childProps}/>:<LoadWpn {...this.childProps} id={this.state.id} currentMech={this.state.currentMech} location={this.state.currentLoc}/>}
        </div>
    );
}}