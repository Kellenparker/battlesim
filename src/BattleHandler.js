/*

    File: BattleHandler.js
    Author: Kellen Parker

    Creates and handles all aspects of the battle simulation

*/


let rand = high => Math.floor(Math.random() * high);

class BattleHandler {

    constructor(){

        this.tick = 0;
        // 1: user, 2: comp
        this.winner = 0;
        this.user = {
            armies: 0,
            active: 0,
            roll: 0,
            skill: 0,
            morale: 0,
            infLosses: 0,
            cavLosses: 0,
            artLosses: 0,
            moraleLoss: 0
        };
        this.comp = {
            armies: 0,
            active: 0,
            roll: 0,
            skill: 0,
            morale: 0,
            infLosses: 0,
            cavLosses: 0,
            artLosses: 0,
            moraleLoss: 0
        };
        //Stage 0: Artillery Barrage, Stage 2: Line Firing, Stage 3: Scatter and Retreat
        this.stage = 0;
        this.winner = 0;
        this.finalTick = 0;

    }
    
    progress(userArmy, compArmy, changed){
        
        let userTotal = userArmy.getInfantry() + userArmy.getArtillery() + userArmy.getCavalry();
        if(userTotal <= 0) {
            return 1;
        }
        
        let compTotal = compArmy.getInfantry() + compArmy.getArtillery() + compArmy.getCavalry();
        if(compTotal <= 0) {
            return 2;
        }

        if(changed){
            console.log("changed");
            this.user.skill = userArmy.getAverageSkill();
            this.comp.skill = compArmy.getAverageSkill();
            this.user.morale = userArmy.getAverageMorale();
            this.comp.morale = compArmy.getAverageMorale();
            this.user.armies = userArmy.getArmyCount();
            this.comp.armies = compArmy.getArmyCount();
            this.user.active = userArmy.getActiveCount();
            this.comp.active = compArmy.getActiveCount();
        }

        if(this.tick % 20 === 0){
            this.user.roll = rand(this.user.skill / 10);
            console.log("user: " + this.user.roll);
            this.comp.roll = rand(this.comp.skill / 10);
            console.log("comp: " + this.comp.roll);
        }

        //Artillery barrage will end after set amount of ticks
        if(this.tick >= 100 && this.stage === 0){
            console.log("line firing begins");
            this.stage = 1;
        }

        if(this.stage === 0){
            let userArtilleryStrength = userArmy.getArtillery();
            let compArtilleryStrength = compArmy.getArtillery();
            for(let i = 0; i < this.user.armies; i++){
                let composition = userArmy.getComposition(i);
                userArmy.subtractLosses(
                    i, 
                    Math.ceil((rand((compArtilleryStrength / 3000) + (this.comp.skill / 25) + (this.comp.roll / 2)) / (this.user.armies / 2)) * composition[0]),
                    Math.ceil((rand((compArtilleryStrength / 4000) + (this.comp.skill / 35) + (this.comp.roll / 3)) / (this.user.armies / 2)) * composition[1]),
                    Math.ceil((rand(compArtilleryStrength / 1500) / (this.user.armies / 2)) * composition[2]), 
                    (compArtilleryStrength / userArtilleryStrength >= 2) ? parseInt(rand(15) / 10) : 0
                );
            }
            for(let i = 0; i < this.comp.armies; i++){
                let composition = compArmy.getComposition(i);
                compArmy.subtractLosses(
                    i, 
                    Math.ceil((rand((userArtilleryStrength / 3000) + (this.user.skill / 25) + (this.user.roll / 2)) / (this.comp.armies / 2)) * composition[0]),
                    Math.ceil((rand((userArtilleryStrength / 4000) + (this.user.skill / 35) + (this.user.roll / 3)) / (this.comp.armies / 2)) * composition[1]),
                    Math.ceil((rand(userArtilleryStrength / 1500) / (this.comp.armies / 2)) * composition[2]), 
                    (userArtilleryStrength / compArtilleryStrength >= 2) ? parseInt(rand(15) / 10) : 0
                );
            }
        }
        else if(this.stage === 1){
            let userLineStrength = (userArmy.getInfantry() / 2) + userArmy.getCavalry();
            let compLineStrength = (compArmy.getInfantry() / 2) + compArmy.getCavalry();
            let userArtStrength = userArmy.getArtillery();
            let compArtStrength = compArmy.getArtillery();
            let userStrength = userLineStrength + (userArtStrength / 4);
            let compStrength = compLineStrength + (compArtStrength / 4);
            let userTotals = {
                inf: 0,
                cav: 0,
                art: 0
            }
            let userTotalComb = 0;
            let compTotals = {
                inf: 0,
                cav: 0,
                art: 0
            }
            let compTotalComb = 0;
            for(let i = 0; i < this.user.armies; i++){
                let moraleDifference = this.comp.morale - userArmy.getMorale(i);
                if (moraleDifference < -4) moraleDifference = -4;
                let lineDifference = compLineStrength - userLineStrength;
                if (lineDifference <= 1) lineDifference = 1;
                let distance = userArmy.getDistance(i);
                let composition = userArmy.getComposition(i);
                let currentSkill = userArmy.getSkill(i);
                let userLosses = {
                    inf: Math.ceil((rand((compStrength / 3000) + (this.comp.skill / 5) - (currentSkill / 40) + this.comp.roll + (moraleDifference / 6)) / (this.user.active / 2) - (distance / 2)) * composition[0]),
                    cav: Math.ceil((rand((compStrength / 3000) + (this.comp.skill / 5) - (currentSkill / 40) + this.comp.roll + (moraleDifference / 6)) / (this.user.active / 2) - (distance / 2)) * composition[1]),
                    art: Math.ceil((rand((((compLineStrength * (lineDifference / 150)) / 3500) - (currentSkill / 60)) + rand(this.comp.roll * 2)) / (this.user.active / 2) + (moraleDifference / 5) - (distance / 2)) * composition[2])
                }
                userTotals = {
                    inf: userTotals.inf + userLosses.inf,
                    cav: userTotals.cav + userLosses.cav,
                    art: userTotals.art + userLosses.art
                }
                userArmy.setLosses(i, (userLosses.inf + userLosses.cav + userLosses.art));
                userTotalComb += userTotals.inf + userTotals.cav + userTotals.art;
                userArmy.subtractLosses(
                    i, 
                    userLosses.inf,
                    userLosses.cav,
                    userLosses.art
                );
            }
            for(let i = 0; i < this.comp.armies; i++){
                let moraleDifference = this.user.morale - compArmy.getMorale(i);
                if (moraleDifference < -4) moraleDifference = -4;
                let distance = compArmy.getDistance(i);
                let lineDifference = userLineStrength - compLineStrength;
                if (lineDifference <= 1) lineDifference = 1;
                let composition = compArmy.getComposition(i);
                let currentSkill = compArmy.getSkill(i);
                let compLosses = {
                    inf: Math.ceil((rand((userStrength / 3000) + (this.user.skill / 5) - (currentSkill / 40) + this.user.roll + (moraleDifference / 6)) / (this.comp.active / 2) - (distance / 2)) * composition[0]),
                    cav: Math.ceil((rand((userStrength / 3000) + (this.user.skill / 5) - (currentSkill / 40) + this.user.roll + (moraleDifference / 6)) / (this.comp.active / 2) - (distance / 2)) * composition[1]),
                    art: Math.ceil((rand((((userLineStrength * (lineDifference / 150)) / 3500) - (currentSkill / 40)) + rand(this.user.roll * 2)) / (this.comp.active / 2) + (moraleDifference / 5) - (distance / 2)) * composition[2])
                }
                compTotals = {
                    inf: compTotals.inf + compLosses.inf,
                    cav: compTotals.cav + compLosses.cav,
                    art: compTotals.art + compLosses.art
                }
                compArmy.setLosses(i, (compLosses.inf + compLosses.cav + compLosses.art));
                compTotalComb += compTotals.inf + compTotals.cav + compTotals.art;
                compArmy.subtractLosses(
                    i, 
                    compLosses.inf,
                    compLosses.cav,
                    compLosses.art
                );
            }

            for(let i = 0; i < this.user.armies; i++){

                if(userArmy.getRetreating(i)) continue;

                if(userArmy.getPrevLosses(i) < compTotalComb / this.comp.active){
                    if(rand(35) > 33) userArmy.changeMorale(i, 1);
                }
                else if(userArmy.getPrevLosses(i) / 1.1 > compTotalComb / this.comp.active){
                    if(rand(10) > 8) userArmy.changeMorale(i, -1);
                }

                if(userArmy.getStrength(i) > (compArmy.getInfantry() + compArmy.getCavalry() + compArmy.getArtillery()) / this.comp.active){
                    if(rand(55) > 53) userArmy.changeMorale(i, 1);
                }
                else{
                    if(rand(50) > 48) userArmy.changeMorale(i, -1);
                }

                if(rand(this.user.roll) < 1){
                    if(rand(10) > 8) userArmy.changeMorale(i, -1);
                }

                if(userArmy.getPrevLosses(i) / 2.5 > compTotalComb / this.comp.active){
                    let change = rand(-1 * Math.abs(compTotalComb / this.comp.active) / userArmy.getPrevLosses(i));
                    console.log(change);
                    userArmy.changeMorale(i, change);
                }

            }

            for(let i = 0; i < this.comp.armies; i++){

                if(compArmy.getRetreating(i)) continue;

                if(compArmy.getPrevLosses(i) < userTotalComb / this.user.active){
                    if(rand(50) > 48) compArmy.changeMorale(i, 1);
                }
                else if(compArmy.getPrevLosses(i) / 1.1 > userTotalComb / this.user.active){
                    if(rand(10) > 8) compArmy.changeMorale(i, -1);
                }

                if(compArmy.getStrength(i) > (userArmy.getInfantry() + userArmy.getCavalry() + userArmy.getArtillery()) / this.user.active){
                    if(rand(55) > 53) compArmy.changeMorale(i, 1);
                }
                else{
                    if(rand(40) > 38) compArmy.changeMorale(i, -1);
                }

                if(rand(this.comp.roll) < 1){
                    if(rand(10) > 8) compArmy.changeMorale(i, -1);
                }

                if(compArmy.getPrevLosses(i) / 2.5 > userTotalComb / this.user.active){
                    let change = rand(-1 * Math.abs(userTotalComb / this.user.active) / compArmy.getPrevLosses(i));
                    console.log(change);
                    compArmy.changeMorale(i, change);
                }

            }

            //check for retreats / surrenders
            let compWinner = true;
            for(let i = 0; i < this.user.armies; i++){
                if(((userArmy.getMorale(i) < 15 && rand(10) > 8) || (userArmy.getStrength(i) <= 0)) && !userArmy.getRetreating(i)){
                    userArmy.setRetreating(i, true);
                    this.user.active--;
                }
                if(!userArmy.getRetreating(i)) compWinner = false;
            }

            if(compWinner){
                this.winner = 1;
                this.stage = 3;
                this.finalTick = this.tick + 50;
            }

            let userWinner = true;
            for(let i = 0; i < this.comp.armies; i++){
                if(((compArmy.getMorale(i) < 15 && rand(10) > 8 ) || (compArmy.getStrength(i) <= 0)) && !compArmy.getRetreating(i)){
                    compArmy.setRetreating(i, true);
                    this.comp.active--;
                }
                if(!compArmy.getRetreating(i)) userWinner = false;
            }

            if(userWinner){
                this.winner = 2;
                this.stage = 3;
                this.finalTick = this.tick + 50;
            }

            userArmy.addDistance(1);
            compArmy.addDistance(1);
            
        }
        else if(this.stage === 3){ //retreat stage

            if(this.tick >= this.finalTick) return this.winner;

            console.log("stage 3");

            //user retreating
            if(this.winner === 1){
                let compLineStrength = (compArmy.getInfantry() / 2) + compArmy.getCavalry() + (compArmy.getArtillery() / 4);
                for(let i = 0; i < this.user.armies; i++){
                    let composition = userArmy.getComposition(i);
                    let distance = userArmy.getDistance(i);
                    let userLosses = {
                        inf: Math.ceil((rand(compLineStrength / 1000) + (this.comp.skill / 10) + this.comp.roll / (this.user.armies / 2) - (distance / 4)) * composition[0]),
                        cav: Math.ceil((rand(compLineStrength / 1000) + (this.comp.skill / 10) + this.comp.roll / (this.user.armies / 2) - (distance / 4)) * composition[1]),
                        art: Math.ceil((rand(compLineStrength / 300) + (this.comp.skill / 10) / (this.user.armies / 2) - (distance / 4)) * composition[2])
                    }
                    userArmy.subtractLosses(
                        i, 
                        userLosses.inf,
                        userLosses.cav,
                        userLosses.art
                    );
                }
                for(let i = 0; i < this.comp.armies; i++){
                    if(compArmy.getRetreating(i)) continue;
                    let compLosses = {
                        inf: rand(2),
                        cav: rand(2),
                        art: rand(2)
                    }
                    compArmy.subtractLosses(
                        i, 
                        compLosses.inf,
                        compLosses.cav,
                        compLosses.art
                    );
                }
            }
            else if(this.winner === 2){
                let userLineStrength = (userArmy.getInfantry() / 2) + userArmy.getCavalry() + (userArmy.getArtillery() / 4);
                for(let i = 0; i < this.user.armies; i++){
                    if(userArmy.getRetreating(i)) continue;
                    let userLosses = {
                        inf: rand(2),
                        cav: rand(2),
                        art: rand(2)
                    }
                    userArmy.subtractLosses(
                        i, 
                        userLosses.inf,
                        userLosses.cav,
                        userLosses.art
                    );
                }
                for(let i = 0; i < this.comp.armies; i++){
                    let composition = compArmy.getComposition(i);
                    let distance = compArmy.getDistance(i);
                    let compLosses = {
                        inf: Math.ceil((rand(userLineStrength / 1000) + (this.user.skill / 10) + this.user.roll / (this.comp.armies / 2) - (distance / 4)) * composition[0]),
                        cav: Math.ceil((rand(userLineStrength / 1000) + (this.user.skill / 10) + this.user.roll / (this.comp.armies / 2) - (distance / 4)) * composition[1]),
                        art: Math.ceil((rand(userLineStrength / 300) + (this.user.skill / 10) / (this.comp.armies / 2) - (distance / 4)) * composition[2])
                    }
                    compArmy.subtractLosses(
                        i, 
                        compLosses.inf,
                        compLosses.cav,
                        compLosses.art
                    );
                }
            }

        }

        this.tick++;

        return 0;

    }

}

export default BattleHandler;