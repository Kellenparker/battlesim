

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

    getArmyCount(){
        return this.ArmyArray.length;
    }

    getTotals(){
        let totals = [0, 0, 0];
        for(var i = 0; i < this.getArmyCount(); i++){
            totals[0] += this.ArmyArray[i].infantry;
            totals[1] += this.ArmyArray[i].cavalry;
            totals[2] += this.ArmyArray[i].artillery;
        }
        return totals;
    }

    addArmy(infantry = 10000, cavalry = 10000, artillery = 10000){
        let army = {
            infantry: infantry,
            cavalry: cavalry,
            artillery: artillery
        }
        this.ArmyArray.push(army);
    }

    removeArmy(index){
        this.ArmyArray.splice(index,1);
    }

    test(){
        this.ArmyArray[0].infantry = 500;
    }

}

export default ArmyHandler;