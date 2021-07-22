

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
        this.ArmyLosses = {
            infLosses: 0,
            cavLosses: 0,
            artLosses: 0
        }
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

    //totals for skill and morale will return average of all armies
    getTotals(){
        let totals = [0, 0, 0, 0, 0];
        for(var i = 0; i < this.getArmyCount(); i++){
            totals[0] += this.ArmyArray[i].infantry;
            totals[1] += this.ArmyArray[i].cavalry;
            totals[2] += this.ArmyArray[i].artillery;
            totals[3] += this.ArmyArray[i].skill;
            totals[4] += this.ArmyArray[i].morale;
        }
        totals[3] = parseInt(totals[3] / this.getArmyCount());
        totals[4] = parseInt(totals[4] / this.getArmyCount());
        return totals;
    }

    getAverageSkill(){
        let sum = 0;
        let armyCount = this.getArmyCount();
        for(var i = 0; i < armyCount; i++)
            sum += this.ArmyArray[i].skill;
        return parseInt(sum / armyCount);
    }

    getLosses(){
        return [this.ArmyLosses.infLosses, this.ArmyLosses.cavLosses, this.ArmyLosses.artLosses];
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

    subtractLosses(index, infLosses, cavLosses, artLosses, moraleLoss){
        this.ArmyLosses.infLosses += infLosses;
        this.ArmyLosses.cavLosses += cavLosses;
        this.ArmyLosses.artLosses += artLosses;
        this.ArmyArray[index].infantry -= infLosses;
        this.ArmyArray[index].cavalry -= cavLosses;
        this.ArmyArray[index].artillery -= artLosses;
        this.ArmyArray[index].morale -= moraleLoss;
    }

    removeArmy(index){
        this.ArmyArray.splice(index,1);
    }

}

export default ArmyHandler;