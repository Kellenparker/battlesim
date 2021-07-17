import React from 'react';
import ReactDOM from 'react-dom';
import ArmyHandler from './ArmyHandler';

class Main extends React.Component {

    constructor(props){
        super(props);
        this.state = { userArmy: this.props.userArmy, compArmy: this.props.compArmy};
        this.addArmy = this.addArmy.bind(this);
    }

    removeArmy(user){

        

    }

    addArmy(user){

        if(user){
            this.setState(this.state.userArmy.addArmy());
        }
        else{
            this.setState(this.state.compArmy.addArmy());
        }

        this.forceUpdate(); 

    }

    render(){
        return (
            <div>
                <div className="header">
                    <h1 id="title">Simulator</h1>
                </div>

                <div className="split left" id="user">
                    <Army army={this.state.userArmy} addHandler={this.addArmy} user={true}></Army>
                </div>

                <div className="split right" id="comp">
                    <Army army={this.state.compArmy} addHandler={this.addArmy} user={false}></Army>
                </div>

                <div id="base">
                    <Footer userArmy={this.state.userArmy} compArmy={this.state.compArmy}></Footer>
                </div>
            </div>
        )
    }

}

class Army extends React.Component {
    
    constructor(props){
        super(props);
        this.state = this.props.army;
        this.removeClick = this.removeClick.bind(this);
    }

    removeClick(index){
        this.setState(
            this.state.removeArmy(index)
        );
        this.forceUpdate();
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
                                <button className="armyBut">Edit</button>
                                {this.state.getArmyCount() !== 1 && 
                                    <button className="armyBut" onClick={() => this.removeClick(index)}>Remove</button>
                                }
                            </div>
                        );
                    })
                }
                {this.state.getArmyCount() < 9 &&
                    <button className="addArmy" onClick={() => this.props.addHandler(this.props.user)}>Add Army</button>
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
                <button id="gobut">Simulate</button>
                <p class="totals" id="userTotals">Totals: Infantry: {this.totalsUser[0]} Cavalry: {
                    this.totalsUser[1]} Artillery: {this.totalsUser[2]}</p>
                <p class="totals" id="compTotals">Totals: Infantry: {this.totalsComp[0]} Cavalry: {
                    this.totalsComp[1]} Artillery: {this.totalsComp[2]}</p>
                <p class="losses" id="userLosses">Losses: Infantry: 0 Cavalry: 0 Artillery: 0</p>
  		        <p class="losses" id="compLosses">Losses: Infantry: 0 Cavalry: 0 Artillery: 0</p>
            </div>
        )
    }

}

export default Main;