

class ArmyHandler {

    constructor(){
        this.index = 0;
        this.ArmyArray = [
            {
                index: 0,
                infantry: 10000,
                cavalry: 3000,
                artillery: 3000,
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

    getArmyCount = () => this.ArmyArray.length;

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

    getInfantry(){
        let sum = 0;
        for(var i = 0; i < this.getArmyCount(); i++)
            sum += this.ArmyArray[i].infantry;
        return sum;
    }

    getCavalry(){
        let sum = 0;
        for(var i = 0; i < this.getArmyCount(); i++)
            sum += this.ArmyArray[i].cavalry;
        return sum;
    }

    getArtillery(){
        let sum = 0;
        for(var i = 0; i < this.getArmyCount(); i++)
            sum += this.ArmyArray[i].artillery;
        return sum;
    }

    getAverageSkill(){
        let sum = 0;
        let armyCount = this.getArmyCount();
        for(var i = 0; i < armyCount; i++)
            sum += this.ArmyArray[i].skill;
        return parseInt(sum / armyCount);
    }

    getAverageMorale(){
        let sum = 0;
        let armyCount = this.getArmyCount();
        for(var i = 0; i < armyCount; i++)
            sum += this.ArmyArray[i].morale;
        return parseInt(sum / armyCount);
    }

    getMorale(index){
        return this.ArmyArray[index].morale;
    }

    getLosses(){
        return [this.ArmyLosses.infLosses, this.ArmyLosses.cavLosses, this.ArmyLosses.artLosses];
    }

    addArmy(infantry = 10000, cavalry = 3000, artillery = 3000, skill = 50, morale = 50){
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

    subtractLosses(index, infLosses, cavLosses, artLosses, moraleLoss = 0){
        this.ArmyLosses.infLosses += infLosses;
        this.ArmyLosses.cavLosses += cavLosses;
        this.ArmyLosses.artLosses += artLosses;
        
        if(this.ArmyArray[index].infantry - infLosses <= 0) this.ArmyArray[index].infantry = 0;
        else this.ArmyArray[index].infantry -= infLosses;
        
        if(this.ArmyArray[index].cavalry - cavLosses <= 0) this.ArmyArray[index].cavalry = 0;
        else this.ArmyArray[index].cavalry -= cavLosses;
        
        if(this.ArmyArray[index].artillery - artLosses <= 0) this.ArmyArray[index].artillery = 0;
        else this.ArmyArray[index].artillery -= artLosses;
        
        if(this.ArmyArray[index].morale - moraleLoss <= 0) this.ArmyArray[index].morale = 0;
        else this.ArmyArray[index].morale -= moraleLoss;
    }

    changeMorale(index, morale){
        this.ArmyArray[index].morale += morale;
    }

    removeArmy(index){
        this.ArmyArray.splice(index,1);
    }

}

export default ArmyHandler;