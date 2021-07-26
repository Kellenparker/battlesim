
let rand = high => Math.floor(Math.random() * high);

class BattleHandler {

    constructor(){

        this.tick = 0;
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

    }
    
    progress(userArmy, compArmy, changed){

        if(changed){
            console.log("changed");
            this.user.skill = userArmy.getAverageSkill();
            this.comp.skill = compArmy.getAverageSkill();
            this.user.morale = userArmy.getAverageMorale();
            this.comp.morale = compArmy.getAverageMorale();
            this.user.armies = userArmy.getArmyCount();
            this.comp.armies = compArmy.getArmyCount();
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
            for(let i = 0; i < userArmy.getArmyCount(); i++){
                userArmy.subtractLosses(
                    i, 
                    Math.ceil(rand((compArtilleryStrength / 3000) + (this.comp.skill / 25) + (this.comp.roll / 2)) / (this.user.armies / 2)),
                    Math.ceil(rand((compArtilleryStrength / 4000) + (this.comp.skill / 35) + (this.comp.roll / 3)) / (this.user.armies / 2)),
                    Math.ceil(rand(compArtilleryStrength / 1500) / (this.user.armies / 2)), 
                    (compArtilleryStrength / userArtilleryStrength >= 2) ? parseInt(rand(15) / 10) : 0
                );
            }
            for(let i = 0; i < compArmy.getArmyCount(); i++){
                compArmy.subtractLosses(
                    i, 
                    parseInt(rand((userArtilleryStrength / 3000) + (this.user.skill / 25) + (this.user.roll / 2)) / (this.comp.armies / 2)),
                    parseInt(rand((userArtilleryStrength / 4000) + (this.user.skill / 35) + (this.user.roll / 3)) / (this.comp.armies / 2)),
                    parseInt(rand(userArtilleryStrength / 1500) / (this.comp.armies / 2)), 
                    (userArtilleryStrength / compArtilleryStrength >= 2) ? parseInt(rand(15) / 10) : 0
                );
            }
        }else if(this.stage === 1){
            let userLineStrength = userArmy.getInfantry() + userArmy.getCavalry() + (userArmy.getArtillery() / 3);
            let compLineStrength = compArmy.getInfantry() + compArmy.getCavalry() + (compArmy.getArtillery() / 3);
            let userLosses = {
                inf: 0,
                cav: 0,
                art: 0
            }
            let userTotals = {
                inf: 0,
                cav: 0,
                art: 0
            }
            let userTotalComb = 0;
            let compLosses = {
                inf: 0,
                cav: 0,
                art: 0
            }
            let compTotals = {
                inf: 0,
                cav: 0,
                art: 0
            }
            let compTotalComb = 0;
            for(let i = 0; i < this.user.armies; i++){
                let moraleDifference = this.comp.morale - userArmy.getMorale(i);
                userLosses = {
                    inf: Math.ceil(rand((compLineStrength / 2000) + (this.comp.skill / 15) + this.comp.roll + (moraleDifference / 4)) / (this.user.armies / 2)),
                    cav: Math.ceil(rand((compLineStrength / 3000) + (this.comp.skill / 25) + (this.comp.roll / 2) + (moraleDifference / 4)) / (this.user.armies / 2)),
                    art: Math.ceil(rand(compLineStrength / 4000) / (this.user.armies / 2) + (moraleDifference / 5))
                }
                userTotals = {
                    inf: userTotals.inf + userLosses.inf,
                    cav: userTotals.cav + userLosses.cav,
                    art: userTotals.art + userLosses.art
                }
                userTotalComb = userTotals.inf + userTotals.cav + userTotals.art;
                userArmy.subtractLosses(
                    i, 
                    userLosses.inf,
                    userLosses.cav,
                    userLosses.art
                );
            }
            for(let i = 0; i < this.comp.armies; i++){
                let moraleDifference = this.user.morale - compArmy.getMorale(i);
                compLosses = {
                    inf: Math.ceil(rand((userLineStrength / 2000) + (this.user.skill / 15) + this.user.roll + (moraleDifference / 4)) / (this.comp.armies / 2)),
                    cav: Math.ceil(rand((userLineStrength / 3000) + (this.user.skill / 25) + (this.user.roll / 2) + (moraleDifference / 4)) / (this.comp.armies / 2)),
                    art: Math.ceil(rand(userLineStrength / 4000) / (this.comp.armies / 2) + (moraleDifference / 5))
                }
                compTotals = {
                    inf: compTotals.inf + compLosses.inf,
                    cav: compTotals.cav + compLosses.cav,
                    art: compTotals.art + compLosses.art
                }
                compTotalComb = compTotals.inf + compTotals.cav + compTotals.art;
                compArmy.subtractLosses(
                    i, 
                    compLosses.inf,
                    compLosses.cav,
                    compLosses.art
                );
            }
            if(userTotalComb > compTotalComb && this.user.roll > this.comp.roll){

                for(let i = 0; i < this.comp.armies; i++){
                    //small chance that morale will go down
                    if(rand(10) > 7) compArmy.changeMorale(i, -1);
                }
                for(let i = 0; i < this.user.armies; i++){
                    if(rand(25) > 23) userArmy.changeMorale(i, 1);
                }

            }
            else if(compTotalComb > userTotalComb && this.comp.roll > this.user.roll){

                for(let i = 0; i < this.user.armies; i++){
                    //small chance that morale will go down
                    if(rand(10) > 7) userArmy.changeMorale(i, -1);
                }
                for(let i = 0; i < this.comp.armies; i++){
                    if(rand(25) > 23) compArmy.changeMorale(i, 1);
                }
            }
        }

        this.tick++;

    }

}

export default BattleHandler;