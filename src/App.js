import React from 'react';
import ReactDOM from 'react-dom';
import ArmyHandler from './ArmyHandler';

class Army extends React.Component {
    
    constructor(props){
        super(props);
        this.state = props.army;
        this.removeClick = this.removeClick.bind(this);
        this.addClick = this.addClick.bind(this);
    }

    removeClick(index){
        this.setState(
            this.state.removeArmy()
        );
        this.forceUpdate();
    }

    addClick(){
        this.setState(
            this.state.addArmy()
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
                            <div className={("element " + this.props.type)} >
                                <h3 className="elehead">{this.genArmyNumber(index + 1) + " Army"}</h3>
                                <p className="paragraph">Infantry = {army.infantry}, Cavalry = {army.cavalry}, Artillery = {army.artillery}</p>
                                <button className="armyBut">Edit</button>
                                {this.state.getArmyCount() != 1 && 
                                    <button className="armyBut" onClick={() => this.removeClick(index)}>Remove</button>
                                }
                            </div>
                        );
                    })
                }
                {this.state.getArmyCount() < 9 &&
                    <button className="addArmy" onClick={this.addClick}>Add Army</button>
                }
            </div>
        )
    }
}


class Totals extends React.Component {

    constructor(props){
        super(props);
        this.state = this.props.army;
        this.totals = this.state.getTotals();
    }

    render(){
        return (
            <p class="totals" id="userTotals">Totals: Infantry: {this.totals[0]} Cavalry: {
                this.totals[1]} Artillery: {this.totals[2]}</p>
        )
    }

}

export {Army, Totals};