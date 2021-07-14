import React from 'react';
import ReactDOM from 'react-dom';
import Army from "./App.js";
import ArmyHandler from "./ArmyHandler.js";

var friendlyArmies = 1;
var enemyArmies = 1;

const friendlyArmy = new ArmyHandler();
friendlyArmy.addArmy();

const enemyArmy = new ArmyHandler();

ReactDOM.render(<Army army={friendlyArmy} type="user" />, document.getElementById("user"));
ReactDOM.render(<Army army={enemyArmy} type="comp" />, document.getElementById("comp"))