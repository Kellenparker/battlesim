

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

class BattleHandler {

    constructor(){

        this.tick = 0;

    }
    
    progress(userArmy, compArmy){

        for(var i = 0; i < userArmy.getArmyCount(); i++)
            userArmy.subtractLosses(i, 10, 10, 10, 1);
        this.tick++;
        sleep(1000);

    }

}

export default BattleHandler;