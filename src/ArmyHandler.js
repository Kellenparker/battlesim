

class ArmyHandler {
    #ArmyObj = new Object;

    constructor(){
        this.ArmyObj = {
            army1: {
                infantry: 10000,
                cavalry: 10000,
                artillery: 10000
            }
        };
    }
    //0: infantry, 1: cavalry, 2: artillery
    getArmy(armyNum){
        return this.ArmyObj["army" + armyNum];
    }

}

export default ArmyHandler;