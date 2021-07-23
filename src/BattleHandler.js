
let rand = high => Math.floor(Math.random() * high);

class BattleHandler {

    constructor(){

        this.tick = 0;
        this.user = {
            ratio: 0,
            roll: 0,
            skill: 0,
            infLosses: 0,
            cavLosses: 0,
            artLosses: 0,
            moraleLoss: 0
        };
        this.comp = {
            ratio: 0,
            roll: 0,
            skill: 0,
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
            this.user.ratio = userArmy.getArmyCount() / compArmy.getArmyCount();
            if(this.user.ratio < 1) this.user.ratio = 1;
            console.log("this.user.ratio:" + this.user.ratio);
            this.comp.ratio = compArmy.getArmyCount() / userArmy.getArmyCount();
            if(this.comp.ratio < 1) this.comp.ratio = 1;
            console.log("this.comp.ratio:" + this.comp.ratio);
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
            console.log((compArtilleryStrength / userArtilleryStrength) - 1);
            for(var i = 0; i < userArmy.getArmyCount(); i++){
                userArmy.subtractLosses(
                    i, 
                    Math.ceil(rand((compArtilleryStrength / 3000) + (this.comp.skill / 25) + (this.comp.roll / 2)) / (this.user.ratio / 2)),
                    Math.ceil(rand((compArtilleryStrength / 4000) + (this.comp.skill / 35) + (this.comp.roll / 3)) / (this.user.ratio / 2)),
                    Math.ceil(rand(compArtilleryStrength / 1500) / (this.user.ratio / 2)), 
                    (compArtilleryStrength / userArtilleryStrength >= 2) ? parseInt(rand(15) / 10) : 0
                );
            }
            for(var i = 0; i < compArmy.getArmyCount(); i++){
                compArmy.subtractLosses(
                    i, 
                    parseInt(rand((userArtilleryStrength / 3000) + (this.user.skill / 25) + (this.user.roll / 2)) / (this.comp.ratio / 2)),
                    parseInt(rand((userArtilleryStrength / 4000) + (this.user.skill / 35) + (this.user.roll / 3)) / (this.comp.ratio / 2)),
                    parseInt(rand(userArtilleryStrength / 1500) / (this.comp.ratio / 2)), 
                    (userArtilleryStrength / compArtilleryStrength >= 2) ? parseInt(rand(15) / 10) : 0
                );
            }
        }

        this.tick++;

    }

}

export default BattleHandler;