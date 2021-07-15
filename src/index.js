import React from 'react';
import ReactDOM from 'react-dom';
import Main from './App.js';
import ArmyHandler from "./ArmyHandler.js";

var friendlyArmies = 1;
var enemyArmies = 1;

const friendlyArmy = new ArmyHandler();

const enemyArmy = new ArmyHandler();

ReactDOM.render(<Main userArmy={friendlyArmy} compArmy={enemyArmy}/>, document.getElementById('root'));