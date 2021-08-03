/*

    File: index.js
    Author: Kellen Parker

    Creates the armies and renders the root react component

*/

import React from 'react';
import ReactDOM from 'react-dom';
import Main from './App.js';
import ArmyHandler from "./ArmyHandler.js";

const friendlyArmy = new ArmyHandler();

const enemyArmy = new ArmyHandler();

ReactDOM.render(<Main userArmy={friendlyArmy} compArmy={enemyArmy}/>, document.getElementById('root'));