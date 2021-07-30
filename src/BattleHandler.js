
let rand = high => Math.floor(Math.random() * high);

class BattleHandler {

    constructor(){

        this.tick = 0;
        // 1: user, 2: comp
        this.winner = 0;
        this.user = {
            armies: 0,
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
        
        if(changed){
            console.log("changed");
            this.user.skill = userArmy.getAverageSkill();
            this.comp.skill = compArmy.getAverageSkill();
            this.user.morale = userArmy.getAverageMorale();
            this.comp.morale = compArmy.getAverageMorale();
            this.user.armies = userArmy.getActiveCount();
            this.comp.armies = compArmy.getActiveCount();
        }

        if(this.tick % 20 === 0){
            this.user.roll = rand(this.user.skill / 10);
            console.log("user: " + this.user.roll);
            this.comp.roll = rand(this.comp.skill / 10);
            console.log("comp: " + this.comp.roll);

            //Only updates composition every 20 ticks

        }
        //Artillery barrage will end after set amount of ticks
        if(this.tick >= 100 && this.stage === 0){
            console.log("line firing begins");
            this.stage = 1;
        }

        if(this.stage === 0){
            let userArtilleryStrength = userArmy.getArtillery();
            let compArtilleryStrength = compArmy.getArtillery();
            for(let i = 0; i < userArmy.getArmyCount(); i++){
                let composition = userArmy.getComposition(i);
                userArmy.subtractLosses(
                    i, 
                    Math.ceil((rand((compArtilleryStrength / 3000) + (this.comp.skill / 25) + (this.comp.roll / 2)) / (this.user.armies / 2)) * composition[0]),
                    Math.ceil((rand((compArtilleryStrength / 4000) + (this.comp.skill / 35) + (this.comp.roll / 3)) / (this.user.armies / 2)) * composition[1]),
                    Math.ceil((rand(compArtilleryStrength / 1500) / (this.user.armies / 2)) * composition[2]), 
                    (compArtilleryStrength / userArtilleryStrength >= 2) ? parseInt(rand(15) / 10) : 0
                );
            }
            for(let i = 0; i < compArmy.getArmyCount(); i++){
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
            let userLineStrength = (userArmy.getInfantry() / 2) + userArmy.getCavalry() + (userArmy.getArtillery() / 4);
            let compLineStrength = (compArmy.getInfantry() / 2) + compArmy.getCavalry() + (compArmy.getArtillery() / 4);
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
                let distance = userArmy.getDistance(i);
                if (moraleDifference < -4) moraleDifference = -4;
                let composition = userArmy.getComposition(i);
                let userLosses = {
                    inf: Math.ceil((rand((compLineStrength / 2000) + (this.comp.skill / 15) + this.comp.roll + (moraleDifference / 6)) / (this.user.armies / 2) - (distance / 2)) * composition[0]),
                    cav: Math.ceil((rand((compLineStrength / 2000) + (this.comp.skill / 15) + this.comp.roll + (moraleDifference / 6)) / (this.user.armies / 2) - (distance / 2)) * composition[1]),
                    art: Math.ceil((rand(compLineStrength / 4000) / (this.user.armies / 2) + (moraleDifference / 5) - (distance / 2)) * composition[2])
                }
                userTotals = {
                    inf: userTotals.inf + userLosses.inf,
                    cav: userTotals.cav + userLosses.cav,
                    art: userTotals.art + userLosses.art
                }
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
                let distance = compArmy.getDistance(i);
                if (moraleDifference < -4) moraleDifference = -4;
                let composition = compArmy.getComposition(i);
                let compLosses = {
                    inf: Math.ceil((rand((userLineStrength / 2000) + (this.user.skill / 15) + this.user.roll + (moraleDifference / 6)) / (this.comp.armies / 2) - (distance / 2)) * composition[0]),
                    cav: Math.ceil((rand((userLineStrength / 2000) + (this.user.skill / 15) + this.user.roll + (moraleDifference / 6)) / (this.comp.armies / 2) - (distance / 2)) * composition[1]),
                    art: Math.ceil((rand(userLineStrength / 4000) / (this.comp.armies / 2) + (moraleDifference / 5) - (distance / 2)) * composition[2])
                }
                compTotals = {
                    inf: compTotals.inf + compLosses.inf,
                    cav: compTotals.cav + compLosses.cav,
                    art: compTotals.art + compLosses.art
                }
                compTotalComb += compTotals.inf + compTotals.cav + compTotals.art;
                compArmy.subtractLosses(
                    i, 
                    compLosses.inf,
                    compLosses.cav,
                    compLosses.art
                );
            }
            if((userTotalComb / this.user.armies) < (compTotalComb / this.comp.armies) && this.user.roll > this.comp.roll){

                for(let i = 0; i < this.comp.armies; i++){
                    //small chance that morale will go down
                    if(rand(10) > 7) compArmy.changeMorale(i, -1);
                }
                for(let i = 0; i < this.user.armies; i++){
                    if(rand(25) > 23) userArmy.changeMorale(i, 1);
                }

            }
            else if((compTotalComb / this.comp.armies) < (userTotalComb / this.user.armies) && this.comp.roll > this.user.roll){

                for(let i = 0; i < this.user.armies; i++){
                    //small chance that morale will go down
                    if(rand(10) > 7) userArmy.changeMorale(i, -1);
                }
                for(let i = 0; i < this.comp.armies; i++){
                    if(rand(25) > 23) compArmy.changeMorale(i, 1);
                }
            }

            //check for retreats / surrenders
            let compWinner = true;
            for(let i = 0; i < this.user.armies; i++){
                if(userArmy.getMorale(i) < 15 && rand(10) > 8){
                    userArmy.setRetreating(i, true);
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
                if(compArmy.getMorale(i) < 15 && rand(10) > 8){
                    compArmy.setRetreating(i, true);
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