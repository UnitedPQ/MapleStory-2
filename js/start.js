//开始游戏代码
function start() {
    // myDragon();
    timeInter = setInterval(timeBack,1000);
    crashInter = setInterval(crashInterval,1);
    boxMoveInter = setInterval(boxMove,20);
    monsterCreateInter = setInterval(createMonster,1000); //创建怪
    monsterMoveInter = setInterval(monsterMove,20);     //怪移动
    monsterMoveYInter = setInterval(monsterMoveY,1000); //怪Y移动
    bulletMoveInter = setInterval(bulletMove,20);
    dragonMoveIn = setInterval(dragonMove,5);
    levelInterval = setInterval(levelUp,1);

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
    clearInterval(dragonMoveIn);
    clearInterval(levelInterval);
}
