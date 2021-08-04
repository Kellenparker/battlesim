/*

    File: ArmyHandler.js
    Author: Kellen Parker

    Creates and handles the army arrays

*/

class ArmyHandler {

    constructor(){
        this.index = 0;
        this.ArmyArray = [
            {
                index: 0,
                retreating: false,
                distance: 0,
                infantry: 10000,
                cavalry: 3000,
                artillery: 3000,
                skill: 50,
                morale: 100,
                prevLosses: 0
            }
        ];
        this.ArmyLosses = {
            infLosses: 0,
            cavLosses: 0,
            artLosses: 0
        }
    }
    //0: infantry, 1: cavalry, 2: artillery
    getArmy = () => this.ArmyArray;

    getArmyCount = () => this.ArmyArray.length;

    getActiveCount(){
        let sum = 0;
        for(let i = 0; i < this.getArmyCount(); i++)
            if(!this.ArmyArray[i].retreating)
                sum++;

        return sum;
    }

    getIndex = index => this.ArmyArray[index].index;

    //totals for skill and morale will return average of all armies
    getTotals(){
        let totals = [0, 0, 0, 0, 0];
        for(var i = 0; i < this.getArmyCount(); i++){
            if(this.ArmyArray[i].retreating) continue;
            totals[0] += this.ArmyArray[i].infantry;
            totals[1] += this.ArmyArray[i].cavalry;
            totals[2] += this.ArmyArray[i].artillery;
            totals[3] += this.ArmyArray[i].skill;
            totals[4] += this.ArmyArray[i].morale;
        }

        if(this.getActiveCount() === 0) totals[3] = 0;
        else totals[3] = parseInt(totals[3] / this.getActiveCount());
        if(this.getActiveCount() === 0) totals[4] = 0;
        else totals[4] = parseInt(totals[4] / this.getActiveCount());

        return totals;
    }

    getInfantry(){
        let sum = 0;
        for(var i = 0; i < this.getArmyCount(); i++)
            if(!this.ArmyArray[i].retreating) sum += this.ArmyArray[i].infantry;
        return sum;
    }

    getCavalry(){
        let sum = 0;
        for(var i = 0; i < this.getArmyCount(); i++)
            if(!this.ArmyArray[i].retreating) sum += this.ArmyArray[i].cavalry;
        return sum;
    }

    getArtillery(){
        let sum = 0;
        for(var i = 0; i < this.getArmyCount(); i++)
            if(!this.ArmyArray[i].retreating) sum += this.ArmyArray[i].artillery;
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

    getMorale = index => this.ArmyArray[index].morale;
    
    getSkill = index => this.ArmyArray[index].skill;

    getRetreating = index => this.ArmyArray[index].retreating;

    getLosses = () => [this.ArmyLosses.infLosses, this.ArmyLosses.cavLosses, this.ArmyLosses.artLosses];

    getDistance = index => this.ArmyArray[index].distance;

    getPrevLosses = index => this.ArmyArray[index].prevLosses;

    getStrength = index => this.ArmyArray[index].infantry + this.ArmyArray[index].cavalry + this.ArmyArray[index].artillery;

    // 0: infantry, 1: cavalry, 2: artillery
    getComposition(index){
        let total = this.ArmyArray[index].infantry + this.ArmyArray[index].cavalry + this.ArmyArray[index].artillery;
        let composition = [this.ArmyArray[index].infantry / total, this.ArmyArray[index].cavalry / total, this.ArmyArray[index].artillery / total];
        return composition;
    }

    addArmy(infantry = 10000, cavalry = 3000, artillery = 3000, skill = 50, morale = 100){
        this.index++;
        let army = {
            index: this.index,
            retreating: false,
            distance: 0,
            infantry: infantry,
            cavalry: cavalry,
            artillery: artillery,
            skill: skill,
            morale: morale,
            prevLosses: 0
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

    setRetreating = (index, value) => this.ArmyArray[index].retreating = value;

    setLosses = (index, value) => this.ArmyArray[index].prevLosses = value;

    //adds distance to retreating armies
    addDistance(value){
        for(let i = 0; i < this.getArmyCount(); i++)
            if(this.ArmyArray[i].retreating)
                this.ArmyArray[i].distance++;
    }

    subtractLosses(index, infLosses, cavLosses, artLosses, moraleLoss = 0){
        
        if(infLosses < 0) infLosses = 0;
        if(cavLosses < 0) cavLosses = 0;
        if(artLosses < 0) artLosses = 0;
        if(moraleLoss < 0) moraleLoss = 0;

        if(this.ArmyArray[index].infantry - infLosses <= 0) this.ArmyArray[index].infantry = 0;
        else {
            this.ArmyArray[index].infantry -= infLosses;
            this.ArmyLosses.infLosses += infLosses;
        }
        
        if(this.ArmyArray[index].cavalry - cavLosses <= 0) this.ArmyArray[index].cavalry = 0;
        else {
            this.ArmyArray[index].cavalry -= cavLosses;
            this.ArmyLosses.cavLosses += cavLosses;
        }
        
        if(this.ArmyArray[index].artillery - artLosses <= 0) this.ArmyArray[index].artillery = 0;
        else {
            this.ArmyArray[index].artillery -= artLosses;
            this.ArmyLosses.artLosses += artLosses;
        }
        
        if(this.ArmyArray[index].morale - moraleLoss <= 0) this.ArmyArray[index].morale = 0;
        else this.ArmyArray[index].infantry -= infLosses;
    }

    changeMorale(index, morale){
        if(this.ArmyArray[index].morale + morale > 100) this.ArmyArray[index].morale = 100;
        else if(this.ArmyArray[index].morale + morale < 0) this.ArmyArray[index].morale = 0;
        else this.ArmyArray[index].morale += morale;
    }

    removeArmy = index => this.ArmyArray.splice(index,1);

}

export default ArmyHandler;