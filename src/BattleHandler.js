
let rand = high => Math.floor(Math.random() * high);

class BattleHandler {

    constructor(){

        this.tick = 0;
        this.user = {
            roll: 0,
            skill: 0,
            infLosses: 0,
            cavLosses: 0,
            artLosses: 0,
            moraleLoss: 0
        };
        this.comp = {
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

        for(var i = 0; i < userArmy.getArmyCount(); i++)
            userArmy.subtractLosses(i, 10, 10, 10, 1);
        this.tick++;

    }

}

export default BattleHandler;