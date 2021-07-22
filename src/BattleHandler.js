

class BattleHandler {

    constructor(){

        this.tick = 0;
        this.userLosses = {
            infLosses: 0,
            cavLosses: 0,
            artLosses: 0,
            moraleLoss: 0
        };
        this.compLosses = {
            infLosses: 0,
            cavLosses: 0,
            artLosses: 0,
            moraleLoss: 0
        };

    }
    
    progress(userArmy, compArmy){

        for(var i = 0; i < userArmy.getArmyCount(); i++)
            userArmy.subtractLosses(i, 10, 10, 10, 1);
        this.tick++;

    }

}

export default BattleHandler;