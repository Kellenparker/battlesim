

class ArmyHandler {

    constructor(){
        this.index = 0;
        this.ArmyArray = [
            {
                index: 0,
                infantry: 10000,
                cavalry: 10000,
                artillery: 10000,
                skill: 50,
                morale: 50
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

    getIndex(i){
        return this.ArmyArray[i].index;
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

    addArmy(infantry = 10000, cavalry = 10000, artillery = 10000, skill = 50, morale = 50){
        this.index++;
        let army = {
            index: this.index,
            infantry: infantry,
            cavalry: cavalry,
            artillery: artillery,
            skill: skill,
            morale: morale
        }
        this.ArmyArray.push(army);
    }

    editArmy(index, infantry, cavalry, artillery, skill, morale){
        this.ArmyArray[index].infantry = infantry;
        this.ArmyArray[index].cavalry = cavalry;
        this.ArmyArray[index].artillery = artillery;
        this.ArmyArray[index].skill = skill;
        this.ArmyArray[index].morale = morale;
    }

    removeArmy(index){
        this.ArmyArray.splice(index,1);
    }

}

export default ArmyHandler;