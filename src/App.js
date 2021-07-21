import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { TextField, Box } from '@material-ui/core';


class Main extends React.Component {

    constructor(props){
        super(props);
        this.state = { 
            userArmy: this.props.userArmy, 
            compArmy: this.props.compArmy,
            simulating: false,
            isDialogOpen: false,
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
    }

    removeArmy(user, index){

        if(user) this.setState(this.state.userArmy.removeArmy(index));
        else this.setState(this.state.compArmy.removeArmy(index));

        this.forceUpdate(); 

    }

    addArmy(user){

        if(user) this.setState(this.state.userArmy.addArmy());
        else this.setState(this.state.compArmy.addArmy());

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
        this.setState({isDialogOpen: true});
    }
  
    closeHandler = () => {
        this.setState({
            isDialogOpen: false,
            errorInf: false,
            errorCav: false,
            errorArt: false
        });
    }

    //isNumeric function credited to "Dan" from StackOverflow
    isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    saveHandler = () => {
        if(this.state.errorInf || this.state.errorCav || this.state.errorArt) return;
        this.setState({isDialogOpen: false});
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

    simulate(){
        if(!this.state.simulating){
            this.setState({simulating: true});
        }
        else {
            this.setState({simulating: false});
        }
    }

    render(){
        return (
            <div>
                <div className="header">
                    <h1 id="title">Simulator</h1>
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

                <Dialog open={this.state.isDialogOpen} onClose={this.closeHandler}>
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
                    <Button onClick={this.saveHandler} 
                            color="primary" autoFocus>
                        Save
                    </Button>
                    <Button onClick={this.closeHandler} 
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
                            <div className={(this.props.user ? "element user" : "element comp")} >
                                <h3 className="elehead">{this.genArmyNumber(this.state.getIndex(index) + 1) + " Army"}</h3>
                                <p className="paragraph">Infantry = {army.infantry}, Cavalry = {army.cavalry}, Artillery = {army.artillery}</p>
                                <p className="paragraph">Skill = {army.skill}, Morale = {army.morale}</p>
                                <button className="armyBut" onClick={() => this.props.editHandler(this.props.user, index)}
                                    disabled={this.props.simulating}>Edit</button>
                                {this.state.getArmyCount() !== 1 && 
                                    <button className="armyBut" onClick={() => this.props.removeHandler(this.props.user, index)}
                                        disabled={this.props.simulating}>Remove</button>
                                }
                            </div>
                        );
                    })
                }
                {this.state.getArmyCount() < 9 &&
                    <button className="addArmy" onClick={() => this.props.addHandler(this.props.user)}
                        disabled={this.props.simulating}>Add Army</button>
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
        return (
            <div className="footer" id="footer">
                <button id="gobut" onClick={this.props.simulateHandler}>{this.props.simulating ? "Pause / Edit" : "Simulate"}</button>
                <p className="totals" id="userTotals">Totals: Infantry: {this.totalsUser[0]} Cavalry: {
                    this.totalsUser[1]} Artillery: {this.totalsUser[2]}</p>
                <p className="totals" id="userAverage">Average Skill: {this.totalsUser[3]} Average Morale: {this.totalsUser[4]}</p>
                <p className="totals" id="compTotals">Totals: Infantry: {this.totalsComp[0]} Cavalry: {
                    this.totalsComp[1]} Artillery: {this.totalsComp[2]}</p>
                <p className="totals" id="compAverage">Average Skill: {this.totalsComp[3]} Average Morale: {this.totalsComp[4]}</p>
                <p className="losses" id="userLosses">Losses: Infantry: 0 Cavalry: 0 Artillery: 0</p>
  		        <p className="losses" id="compLosses">Losses: Infantry: 0 Cavalry: 0 Artillery: 0</p>
            </div>
        )
    }

}

export default Main;