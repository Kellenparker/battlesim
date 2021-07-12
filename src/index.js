import React from 'react';
import reactDom from 'react-dom';
import ReactDOM from 'react-dom';
import Army from "./App.js";
import ArmyHandler from "./ArmyHandler.js";

var friendlyArmies = 1;
var enemyArmies = 1;

const friendlyArmy = new ArmyHandler();
ReactDOM.render(<Army army={friendlyArmy} />, document.getElementById("user"));