import React from 'react';
import ReactDOM from 'react-dom';
import ArmyHandler from './ArmyHandler';

class Army extends React.Component {
    
    constructor(props){
        super(props);
        this.army = this.props.army;
        this.army.addArmy();
    }

    render () {
        return  (
            <div>
            {
                this.army.getArmy().map(function(army, index = this) {
                    console.log("element " + index);
                    return (
                        <div class={("element " + index)}>
                            <h3 class="elehead">Army</h3>
                            <p class="paragraph">Infantry = {army.infantry}, Cavalry = {army.cavalry}, Artillery = {army.artillery}</p>
                            <button class="armyBut">Edit</button>
                            <button class="armyBut">Remove</button>
                        </div>
                    );
                })
            }
            </div>
        )
    };
}

export default Army;