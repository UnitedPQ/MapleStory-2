//开始游戏代码
function start() {
    // myDragon();
    timeInter = setInterval(timeBack,1000);
    crashInter = setInterval(crashInterval,1);
    boxMoveInter = setInterval(boxMove,20);
    monsterCreateInter = setInterval(createMonster,3000); //创建怪
    monsterMoveInter = setInterval(monsterMove,20);     //怪移动
    monsterMoveYInter = setInterval(monsterMoveY,1000); //怪Y移动
    bulletMoveInter = setInterval(bulletMove,20);
    drgonmove = setInterval(dragonMove,5);
}

function pause() {
    dragonMoveKeyPause();
    clearInterval(timeInter);
    clearInterval(crashInter);
    clearInterval(boxMoveInter);
    clearInterval(monsterCreateInter);
    clearInterval(monsterMoveInter);
    clearInterval(monsterMoveYInter);
    clearInterval(bulletMoveInter);
    clearInterval(drgonmove);
}
