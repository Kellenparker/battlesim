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

    render () {
        return  (
            <div>
                {
                    this.state.getArmy().map((army, index) => {
                        return (
                            <div className={("element " + this.props.type)} >
                                <h3 className="elehead">Army</h3>
                                <p className="paragraph">Infantry = {army.infantry}, Cavalry = {army.cavalry}, Artillery = {army.artillery}</p>
                                <button className="armyBut">Edit</button>
                                {index != 0 && 
                                    <button className="armyBut" onClick={() => this.removeClick(index)}>Remove</button>
                                }
                            </div>
                        );
                    })
                }
                <button className="addArmy" onClick={this.addClick}>Add Army</button>
            </div>
        )
    };
}

export default Army;