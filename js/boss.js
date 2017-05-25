var bossArr = [];
function createBoss(){
    var x = document.documentElement.clientWidth+20;
    var y = parseInt(Math.random()*(183-document.documentElement.clientHeight))+document.documentElement.clientHeight;
    var src = bossSrc.move;
    var boss = new Plane(x,y,src);
    boss.speedX = parseInt(Math.random()*10)+1;
    boss.speedY = parseInt(Math.random()*5)+1;
    boss.blood = 40;
    boss.count = 0;
    boss.score = 1000;
    boss.dead = false;
    boss.XM = false;
    boss.YM = false;
    boss.move = function () {
        if(!this.dead) {
            if(parseInt(this.img.style.left)<document.documentElement.clientWidth-200) {
                this.XM = true;
            }
            if(parseInt(this.img.style.top)>0 && parseInt(this.img.style.top)<document.documentElement.clientHeight-180){
                this.YM = true;

            }
            if(this.XM) {
                if(parseInt(this.img.style.left)<=document.documentElement.clientWidth/2
                    || parseInt(this.img.style.left)>=document.documentElement.clientWidth-60
                ) {
                    this.speedX = -1 * this.speedX;
                }
            }
            if(this.YM) {
                if(parseInt(this.img.style.top)<=0
                    || parseInt(this.img.style.top)>=document.documentElement.clientHeight-180
                ) {
                    this.speedY = -1 * this.speedY;
                }
            }
            this.img.style.left = parseInt(getComputedStyle(this.img).left) - this.speedX +'px';
            this.bloodImgContainer.style.left = parseInt(this.img.style.left) - this.speedX + 5 +'px';
            this.img.style.top = parseInt(this.img.style.top) - this.speedY +'px';
            this.bloodImgContainer.style.top = parseInt(this.img.style.top) - this.speedY -20 +'px';
        }
    }
    bossArr.push(boss);
}
function bossMove() {
    for(var i = 0 ; i < bossArr.length ; i++){
        bossArr[i].move();
    }
}
var createBossInter,bossMoveInter,createBossBullet;

function bossBulletFun () {
    for(var i = 0 ; i < bossArr.length ; i++){
         bossArr[i].img.src = bossSrc.attack;
         setTimeout(function(){
             var x = parseInt(this.img.style.left);
             var y = parseInt(this.img.style.top);
             this.img.src = bossSrc.move;
             createBullet('boss',x,y);
         }.bind(bossArr[i]),1800)
    }
}