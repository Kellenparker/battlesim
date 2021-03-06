/*

    File: App.js
    Author: Kellen Parker

    Handles the function and design of the react components within the layout

*/

import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from "@material-ui/core/Button";
import { TextField, Box, CardActions, ButtonGroup} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import BattleHandler from './BattleHandler';
import info from './assets/info.png'

class Main extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            userArmy: this.props.userArmy, 
            compArmy: this.props.compArmy,
            simulating: false,
            isEditDialogOpen: false,
            isEndDialogOpen: false,
            isInfoDialogOpen: false,
            errorInf: false,
            errorCav: false,
            errorArt: false,
            errorSkill: false,
            errorMorale: false
        };
        this.editArmy = {
            user: null,
            index: null,
            infantry: null,
            cavalry: null,
            artillery: null,
            skill: null,
            morale: null
        }
        this.addArmy = this.addArmy.bind(this);
        this.removeArmy = this.removeArmy.bind(this);
        this.simulate = this.simulate.bind(this);
        this.closeEndHandler = this.closeEndHandler.bind(this);
        this.openInfoHandler = this.openInfoHandler.bind(this);
        this.closeInfoHandler = this.closeInfoHandler.bind(this);
        this.first = true;
        this.battle = null;
        this.currentSim = false;
        this.changed = true;
        this.result = 0;
        this.speed = 4;
    }

    removeArmy(user, index){

        if(user) this.setState(this.state.userArmy.removeArmy(index));
        else this.setState(this.state.compArmy.removeArmy(index));

        this.changed = true;
        this.forceUpdate(); 

    }

    addArmy(user){

        if(user) this.state.userArmy.addArmy();
        else this.state.compArmy.addArmy();

        this.changed = true;
        this.forceUpdate();

    }
  
    editHandler = (user, index) => {
        if(user){
            this.editArmy = {
                user: user,
                index: index,
                infantry: this.state.userArmy.getArmy()[index].infantry,
                cavalry: this.state.userArmy.getArmy()[index].cavalry,
                artillery: this.state.userArmy.getArmy()[index].artillery,
                skill: this.state.userArmy.getArmy()[index].skill,
                morale: this.state.userArmy.getArmy()[index].morale
            }
        }
        else {
            this.editArmy = {
                user: user,
                index: index,
                infantry: this.state.compArmy.getArmy()[index].infantry,
                cavalry: this.state.compArmy.getArmy()[index].cavalry,
                artillery: this.state.compArmy.getArmy()[index].artillery,
                skill: this.state.compArmy.getArmy()[index].skill,
                morale: this.state.compArmy.getArmy()[index].morale
            }
        }
        this.changed = true;
        this.setState({isEditDialogOpen: true});
    }
  
    closeEditHandler = () => {
        this.setState({
            isEditDialogOpen: false,
            errorInf: false,
            errorCav: false,
            errorArt: false
        });
    }

    //isNumeric function credited to "Dan" from StackOverflow
    isNumeric(str) {
        if (typeof str != "string") return false
        return !isNaN(str) &&
               !isNaN(parseFloat(str))
    }

    saveEditHandler = () => {
        if(this.state.errorInf || this.state.errorCav || this.state.errorArt) return;
        this.setState({isEditDialogOpen: false});
        if(this.editArmy.user){
            this.state.userArmy.editArmy(
                parseInt(this.editArmy.index),
                parseInt(this.editArmy.infantry),
                parseInt(this.editArmy.cavalry),
                parseInt(this.editArmy.artillery),
                parseInt(this.editArmy.skill),
                parseInt(this.editArmy.morale)
            );
        }
        else{
            this.state.compArmy.editArmy(
                parseInt(this.editArmy.index),
                parseInt(this.editArmy.infantry),
                parseInt(this.editArmy.cavalry),
                parseInt(this.editArmy.artillery),
                parseInt(this.editArmy.skill),
                parseInt(this.editArmy.morale)
            );     
        }

        this.changed = true;
        this.forceUpdate();

    }
    //0: infantry, 1: cavalry, 2: artillery
    handleOnChange(event, type){
        
        if( type === 0 ){
            if(!this.isNumeric(event.target.value)){
                this.setState({errorInf: true});
                return;
            } else this.setState({errorInf: false});
            this.editArmy.infantry = event.target.value;
        }
        else if(type === 1){
            if(!this.isNumeric(event.target.value)){
                this.setState({errorCav: true});
                return;
            } else this.setState({errorCav: false});
            this.editArmy.cavalry = event.target.value;
        }
        else if(type === 2){
            if(!this.isNumeric(event.target.value)){
                this.setState({errorArt: true});
                return;
            } else this.setState({errorArt: false});
            this.editArmy.artillery = event.target.value;
        }
        else if(type === 3){
            if(!this.isNumeric(event.target.value) || event.target.value < 0 || event.target.value > 100){
                this.setState({errorSkill: true});
                return;
            } else this.setState({errorSkill: false});
            this.editArmy.skill = event.target.value;
        }
        else if(type === 4){
            if(!this.isNumeric(event.target.value) || event.target.value < 0 || event.target.value > 100){
                this.setState({errorMorale: true});
                return;
            } else this.setState({errorMorale: false});
            this.editArmy.morale = event.target.value;
        }
    }

    closeEndHandler(){
        this.setState({isEndDialogOpen: false});
    }

    openInfoHandler(){
        this.setState({isInfoDialogOpen: true});
    }

    closeInfoHandler(){
        this.setState({isInfoDialogOpen: false});
    }

    simulate(){
        if(!this.state.simulating && this.result === 0){
            this.setState({simulating: true});
            this.currentSim = true;
            if(this.first) {
                this.battle = new BattleHandler();
                this.first = false;
            }
            const handle = setInterval(() => {
                if(!this.currentSim || this.result !== 0){
                    clearInterval(handle);
                    if(this.result !== 0){
                        this.setState({
                            isEndDialogOpen: true,
                            simulating: false
                        });
                        this.currentSim = false;
                    }
                }
                this.result = this.battle.progress(this.state.userArmy, this.state.compArmy, this.changed);
                this.changed = false;
                this.forceUpdate();
            }, 50);
        }
        else {
            this.setState({simulating: false});
            this.currentSim = false;
        }
    }

    render(){
        return (
            <div>
                <div className="header">
                    <Typography variant="h6" style={{
                        textAlign: "center",
                        lineHeight: "1.4vw",
                        marginBottom: ".5%",
                        fontSize: "1.3vw",
                        marginTop: "-5px",
                        fontWeight: "bold"
                    }}>BARE BONES<br /></Typography>
                    <Typography variant="h6" style={{
                        textAlign: "center",
                        lineHeight: "1vw",
                        fontStyle: "italic",
                        fontSize: "1.3vw",
                        fontWeight: "lighter"
                    }}>BATTLE SIMULATOR</Typography>
                    <img src={info} alt="info" style={{
                        position: 'fixed',
                        width: '20px',
                        right: '5px',
                        top: '5px',
                        cursor: 'pointer'
                    }} onClick={this.openInfoHandler}></img>
                </div>

                <div className="split left" id="user">
                    <Army army={this.state.userArmy} addHandler={this.addArmy} 
                            removeHandler={this.removeArmy} editHandler={this.editHandler}
                            user={true} simulating={this.state.simulating}></Army>
                </div>

                <div className="split right" id="comp">
                    <Army army={this.state.compArmy} addHandler={this.addArmy} 
                            removeHandler={this.removeArmy} editHandler={this.editHandler}
                            user={false} simulating={this.state.simulating}></Army>
                </div>

                <Dialog open={this.state.isEditDialogOpen} onClose={this.closeEditHandler}>
                    <DialogTitle>{"Edit Army"}</DialogTitle>
                    <DialogContent>
                    <form className="form" noValidate autoComplete="off">
                        <Box mb={1} ml={1}>
                            <TextField className="outlined-basic" label="Infantry" variant="outlined" 
                                    onChange={(e) => this.handleOnChange(e, 0)}
                                    defaultValue={this.editArmy.infantry}
                                    error={this.state.errorInf}
                                    helperText={this.state.errorInf ? "Please enter a valid number" : ""}/>
                        </Box>
                        <Box m={1} pt={2}>
                            <TextField className="outlined-basic" label="Cavalry" variant="outlined" 
                                    onChange={(e) => this.handleOnChange(e, 1)}
                                    defaultValue={this.editArmy.cavalry}
                                    error={this.state.errorCav}
                                    helperText={this.state.errorCav ? "Please enter a valid number" : ""}/>
                        </Box>
                        <Box m={1} pt={2}>
                            <TextField className="outlined-basic" label="Artillery" variant="outlined" 
                                    onChange={(e) => this.handleOnChange(e, 2)}
                                    defaultValue={this.editArmy.artillery}
                                    error={this.state.errorArt}
                                    helperText={this.state.errorArt ? "Please enter a valid number" : ""}/>
                        </Box>
                        <Box m={1} pt={2}>
                            <TextField className="outlined-basic" label="Skill" variant="outlined"
                                    onChange={(e) => this.handleOnChange(e, 3)}
                                    defaultValue={this.editArmy.skill}
                                    error={this.state.errorSkill}
                                    helperText={this.state.errorSkill ? "Please enter a valid number between 0 and 100" : ""}/>
                        </Box>
                        <Box m={1} pt={2}>
                            <TextField className="outlined-basic" label="Morale" variant="outlined"
                                    onChange={(e) => this.handleOnChange(e, 4)}
                                    defaultValue={this.editArmy.morale}
                                    error={this.state.errorMorale}
                                    helperText={this.state.errorMorale ? "Please enter a valid number between 0 and 100" : ""}/>
                        </Box>
                    </form>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.saveEditHandler} 
                            color="primary" autoFocus>
                        Save
                    </Button>
                    <Button onClick={this.closeEditHandler} 
                            color="primary" autoFocus>
                        Close
                    </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.isEndDialogOpen} onClose={this.closeEndHandler}>
                    <DialogTitle>{"The Battle is Over"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{this.result === 2 ? "Blue has won." : "Red has won."}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.closeEndHandler} 
                            color="primary" autoFocus>
                        Close
                    </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.isInfoDialogOpen} onClose={this.closeInfoHandler}>
                    <DialogTitle>{"Bare Bones Battle Simulator"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            The simulator was designed with 18th century warfare in mind which
                            explains the three different divisions being infantry, artillery, and cavalry. <br /> <br />

                            There are three stages to the battle: <br />
                            1. Artillery barrage, the initial stage where artillery bombardment happens.<br />
                            2. Line Firing, where the two lines of infantry fire upon each other.<br />
                            3. Retreating, where the retreating army will continue to take heavy losses. <br /><br />

                            An army is at risk of surrendering if their morale is below 15.<br /><br />

                            There is no bounds to the sizes you can make the armies, but beware, crazy numbers may give crazy results.

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.closeInfoHandler} 
                            color="primary" autoFocus>
                        Close
                    </Button>
                    </DialogActions>
                </Dialog>

                <div id="base">
                    <Footer userArmy={this.state.userArmy} compArmy={this.state.compArmy} simulateHandler={this.simulate} simulating={this.state.simulating}></Footer>
                </div>
            </div>
        )
    }

}

class Army extends React.Component {
    
    constructor(props){
        super(props);
        this.state = this.props.army;
    }

    genArmyNumber(num){

        if(!(num === 1 || num === 2 || num === 3)) return num + 'th';
        else if (num === 2) return num + 'nd';
        else if (num === 3) return num + 'rd';
        else return num + 'st';
    
    }

    render() {
        return (
            <div>
                {
                    this.state.getArmy().map((army, index) => {
                        return (
                            <Card className="element" style={this.state.getRetreating(index) ? {backgroundColor: "#cccccc"} : this.props.user ? {backgroundColor: "#ccccff"} : {backgroundColor: "#ffcccc"}}>
                                <CardContent>
                                    <Typography variant="h6">{this.genArmyNumber(this.state.getIndex(index) + 1) + " Army"}</Typography>
                                    <Typography variant="body1">Infantry = {army.infantry}, Cavalry = {army.cavalry}, Artillery = {army.artillery}<br /></Typography>
                                    <Typography variant="body1">Skill = {army.skill}, Morale = {army.morale}<br /></Typography>
                                </CardContent>
                                <CardActions>
                                    <ButtonGroup style={{ 
                                        margin: '0 auto',
                                        marginTop: '-15px'
                                        }}>
                                        <Button variant="contained" style={{backgroundColor: "#ffffff"}} onClick={() => this.props.editHandler(this.props.user, index)}
                                            disabled={this.props.simulating || this.state.getRetreating(index)}>Edit</Button>
                                        {this.state.getArmyCount() !== 1 && 
                                            <Button variant="contained" style={{backgroundColor: "#ffffff"}} onClick={() => this.props.removeHandler(this.props.user, index)}
                                                disabled={this.props.simulating || this.state.getRetreating(index)}>Remove</Button>
                                        }
                                    </ButtonGroup>
                                </CardActions>
                            </Card>
                        );
                    })
                }
                {this.state.getArmyCount() < 9 &&
                    <Button variant="contained" style={{
                        transform: "translate(-50%)",
                        left: "50%",
                        backgroundColor: "#ffffff",
                        width: "200px",
                        height: "50px",
	                    marginTop: "40px",
                        marginBottom: "21%"
                    }} onClick={() => this.props.addHandler(this.props.user)}
                        disabled={this.props.simulating}>Add Army</Button>
                }
            </div>
        )
    }
}


class Footer extends React.Component {

    constructor(props){
        super(props);
        this.state = { userArmy: this.props.userArmy, compArmy: this.props.compArmy};
    }

    render(){

        this.totalsUser = this.state.userArmy.getTotals();
        this.totalsComp = this.state.compArmy.getTotals();
        this.lossesUser = this.state.userArmy.getLosses();
        this.lossesComp = this.state.compArmy.getLosses();

        return (
            <div className="footer" id="footer">
                <Button variant="contained" style={{
                        transform: "translate(-50%)",
                        left: "50%",
                        backgroundColor: "#f3f3f3",
                        width: "15%",
                        height: "35%",
	                    marginTop: "2%",
                        fontSize: "1.3vw"
                    }} onClick={this.props.simulateHandler}>{this.props.simulating ? "Pause / Edit" : "Simulate"}</Button>

                <Typography variant="body1" style={{
                        textAlign: "center",
	                    marginTop: "1%",
                        fontSize: "1vw",
                        color: "#555555"
                    }} >Made by Kellen Parker, 2021</Typography>

                <Card className="element" style={{
                    position: "fixed",
                    backgroundColor: "ffffff",
                    width: "30%",
                    height: "12%",
                    right: "6%",
                    bottom: "1%",
                    overflow: "hidden",
                    textAlign: "center"
                }}>
                    <CardContent>
                        <Typography style={{fontSize: "1vw"}} variant="body1">Totals: Infantry: {this.totalsComp[0]} Cavalry: {
                            this.totalsComp[1]} Artillery: {this.totalsComp[2]}<br /></Typography>
                        <Typography style={{fontSize: "1vw"}} variant="body1">Average Skill: {this.totalsComp[3]} Average Morale: {this.totalsComp[4]}<br /></Typography> 
                        <Typography style={{fontSize: "1vw"}} variant="body1">Losses: Infantry: {this.lossesComp[0]} Cavalry: {this.lossesComp[1]} Artillery: {this.lossesComp[2]}<br /></Typography>
                    </CardContent>
                </Card>
                <Card style={{
                    position: "fixed",
                    backgroundColor: "ffffff",
                    width: "30%",
                    height: "12%",
                    left: "6%",
                    bottom: "1%",
                    overflow: "hidden",
                    textAlign: "center"
                }}>
                    <CardContent style={{top: "3%"}}>
                        <Typography style={{fontSize: "1vw"}} variant="body1">Totals: Infantry: {this.totalsUser[0]} Cavalry: {
                            this.totalsUser[1]} Artillery: {this.totalsUser[2]}<br /></Typography>
                        <Typography style={{fontSize: "1vw"}} variant="body1">Average Skill: {this.totalsUser[3]} Average Morale: {this.totalsUser[4]}<br /></Typography> 
                        <Typography style={{fontSize: "1vw"}} variant="body1">Losses: Infantry: {this.lossesUser[0]} Cavalry: {this.lossesUser[1]} Artillery: {this.lossesUser[2]}<br /></Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }

}

export default Main;