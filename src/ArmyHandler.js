

class ArmyHandler {

    constructor(){
        this.ArmyArray = [
            {
                infantry: 10000,
                cavalry: 10000,
                artillery: 10000
            }
        ];
    }
    //0: infantry, 1: cavalry, 2: artillery
    getArmy(){
        return this.ArmyArray;
    }

    addArmy(infantry = 10000, cavalry = 10000, artillery = 10000){
        let army = {
            infantry: infantry,
            cavalry: cavalry,
            artillery: artillery
        }
        this.ArmyArray.push(army);
    }

    test(){
        this.ArmyArray[0].infantry = 500;
    }

}

export default ArmyHandler;