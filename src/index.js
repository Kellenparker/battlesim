import React from 'react';
import reactDom from 'react-dom';
import ReactDOM from 'react-dom';
import App, {Army, AddButton} from "./App.js";
import ArmyHandler from "./ArmyHandler.js";

var friendlyArmies = 1;
var enemyArmies = 1;

const friendlyArmy = new ArmyHandler();
const armyTest = friendlyArmy.getArmy(1);
ReactDOM.render(<Army infantry={armyTest.infantry} cavalry={armyTest.cavalry} artillery={armyTest.artillery} />, document.getElementById("user"));
ReactDOM.render(<AddButton key="123m" />, document.getElementById("user"));