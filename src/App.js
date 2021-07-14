import React from 'react';
import ReactDOM from 'react-dom';
import ArmyHandler from './ArmyHandler';

class Army extends React.Component {
    
    constructor(props){
        super(props);
        this.state = props.army;
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index, type){
        this.setState(
            this.state.removeArmy()
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
                            <button className="armyBut" onClick={() => this.handleClick(index)}>Remove</button>
                        </div>
                    );
                })
            }
            </div>
        )
    };
}

export default Army;