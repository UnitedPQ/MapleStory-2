//背景图片的高度
var clientHeight = document.documentElement.clientHeight;
var bg = document.getElementById('bg');
bg.style.height = clientHeight +'px';
var dragon;
var level = 0;  //龙的等级
var levelInterval;
var energy = 3;
var screenWidth = document.documentElement.clientWidth;

// console.log(screenWidth);
//龙的攻击gif
var attackSrc = ['../images/dragon/small/magicmissile.gif','../images/dragon/middle/magicmissile.gif',
    '../images/dragon/big/magicmissile.gif','../images/dragon/large/magicmissile.gif','../images/dragon/final/magicmissile.gif']
//龙的站立gif
var standSrc = ['../images/dragon/small/stand.gif','../images/dragon/middle/stand.gif',
    '../images/dragon/big/stand.gif','../images/dragon/large/stand.gif','../images/dragon/final/stand.gif'];
//龙的子弹gif
var dragonBulletSrc = ['../images/dragon/small/att.gif','../images/dragon/middle/att.gif',
    '../images/dragon/big/att.gif','../images/dragon/large/att.gif','../images/dragon/final/att.gif'];
//龙的碰撞子弹gif
var dragonBulletCrashSrc = ['../images/dragon/small/hit.gif','../images/dragon/middle/hit.gif',
    '../images/dragon/big/hit.gif','../images/dragon/large/hit.gif','../images/dragon/final/hit.gif'];
//怪物的gif
var monsterSrc = [['../images/enemy/bird/move.gif','../images/enemy/bird/hit.gif', '../images/enemy/bird/die.gif'],
['../images/enemy/plane/move.gif','../images/enemy/plane/hit.gif', '../images/enemy/plane/die.gif'],
    ['../images/enemy/ghost/move.gif','../images/enemy/ghost/hit.gif', '../images/enemy/ghost/die.gif']];
var isAttacking = false; //攻击flag
var firstAttack = true;   //长按空格flag
var attackTimeout; //攻击间隔
var monsterArr = [];
var dragonBullet = [];
var bossBullet = [];
var boxArr = [];
var dragonArr = [];  //为了方便碰撞计算
var canAttack = false; //允许小龙发射子弹
var drgonmove; //监控小龙的函数 用于setInterval
var bulletMoveInter; //监听子弹移动的函数 setInterval
var time = 90;  //时间倒计时数
var timeInter;  //时间setInterval

//初始化小龙函数
    var direction = {left: false, right: false, up: false, down: false,attack:false}; //用于小龙操作
//小龙创建
    dragon = new Plane(0, 400, '../images/dragon/small/stand.gif');
    dragonArr.push(dragon);
    dragon.img.style.animation = 'moveStart .5s linear forwards';
    dragon.bloodImgContainer.style.animation = 'moveStart .5s linear forwards';
    dragon.isCrash = false;

    setTimeout(function () {
        dragon.img.style.left = '104px';
        dragon.bloodImgContainer.style.left = '104px';
        dragon.img.style.animation = null;
        dragon.bloodImgContainer.style.animation = null;
        dragonMoveKeyStart();
    }, 500);
//小龙移动和攻击的键盘监听
function dragonMoveKeyStart(){
    window.onkeydown = function (e) {
        if (e.keyCode == 37) {
            direction.left = true;
        }
        if (e.keyCode == 38) {
            direction.up = true;
        }
        if (e.keyCode == 39) {
            direction.right = true;
        }
        if (e.keyCode == 40) {
            direction.down = true;
        }
        if(e.keyCode == 32) {
            direction.attack = true;
        }
    };
    window.onkeyup = function (e) {
        if (e.keyCode == 37) {
            direction.left = false;
        }
        if (e.keyCode == 38) {
            direction.up = false;
        }
        if (e.keyCode == 39) {
            direction.right = false;
        }
        if (e.keyCode == 40) {
            direction.down = false;
        }
        if(e.keyCode == 32) {
            direction.attack = false;
        }
    };
}
function dragonMoveKeyPause(){
    window.onkeydown = null;
    window.onkeyup = null;
}
    //小龙移动攻击升级等功能
    function dragonMove() {
        if (direction.left) {
            dragon.img.style.left = parseInt(window.getComputedStyle(dragon.img).left) - 2.5 + 'px';
            dragon.bloodImgContainer.style.left = parseInt(window.getComputedStyle(dragon.img).left) - 2.5 + 'px';
            if (parseInt(dragon.img.style.left) <= 0) {
                dragon.img.style.left = 0;
                dragon.bloodImgContainer.style.left = 0;
            }
        }
        if (direction.right) {
            dragon.img.style.left = parseInt(window.getComputedStyle(dragon.img).left) + 2.5 + 'px';
            dragon.bloodImgContainer.style.left = parseInt(window.getComputedStyle(dragon.img).left) + 2.5 + 'px';
            if (parseInt(dragon.img.style.left) >= screenWidth-60) {
                dragon.img.style.left = screenWidth-60 + 'px';
                dragon.bloodImgContainer.style.left = screenWidth-60 + 'px';
            }
        }
        if (direction.up) {
            dragon.img.style.top = parseInt(window.getComputedStyle(dragon.img).top) - 2.5 + 'px';
            dragon.bloodImgContainer.style.top = parseInt(window.getComputedStyle(dragon.img).top) - 2.5 - 20 + 'px';
            if (parseInt(dragon.img.style.top) <= 0) {
                dragon.img.style.top = 0;
                dragon.bloodImgContainer.style.top = '-20px';
            }
        }
        if (direction.down) {
            dragon.img.style.top = parseInt(window.getComputedStyle(dragon.img).top) + 2.5 + 'px';
            dragon.bloodImgContainer.style.top = parseInt(window.getComputedStyle(dragon.img).top) + 2.5 - 20 + 'px';
            if (parseInt(dragon.img.style.top) > clientHeight-50) {
                dragon.img.style.top = clientHeight - 50+'px';
                dragon.bloodImgContainer.style.top = clientHeight - 50 - 20+'px';
            }
        }
        if(direction.attack){
            isAttacking = true;
            if(!firstAttack) {
                return;
            }
            if(isAttacking && firstAttack){
                dragon.img.src = attackSrc[level];
                firstAttack = false;
                setTimeout(function(){
                    createBullet('dragon');
                },400);
            }
            setTimeout(function(){
                    isAttacking = false;
                    firstAttack = true;
                    dragon.img.src = standSrc[level];
                },650);
        }
    }
     // drgonmove = setInterval(dragonMove,5);

//子弹的构造函数
function Bullet(x,y,src){
    this.img = document.createElement('img');
    this.img.style.position = 'absolute';
    this.img.style.left = x + 'px';
    this.img.style.top = y + 'px';
    this.img.src = src;
    this.dead = false;
    this.isCrashed = false;
    this.move = function(type){
        switch (type) {
            case 'dragon':
                this.img.style.left = parseInt(this.img.style.left) + 10 + 'px';

                break;
            case 'boss':
                this.img.style.left = parseInt(this.img.style.left) - 20 + 'px';
                break;
        }
    };
    container.appendChild(this.img);
}
//创建子弹函数
function createBullet(type){
    switch (type) {
        case 'dragon':
            var x = parseInt(window.getComputedStyle(dragon.img).left) + parseInt(window.getComputedStyle(dragon.img).width) -30;
            var y = parseInt(window.getComputedStyle(dragon.img).top) + parseInt(window.getComputedStyle(dragon.img).height)/2+5;
            var bullet = new Bullet(x,y,dragonBulletSrc[level]);
            dragonBullet.push(bullet);
            break;
        case 'boss':
            break;
    }
}
//子弹移动函数
function bulletMove(){
    for(let i = 0 ; i < dragonBullet.length; i++){
        dragonBullet[i].move('dragon');
        if(parseInt(dragonBullet[i].img.style.left)>=screenWidth && !dragonBullet[i].dead ){
            container.removeChild(dragonBullet[i].img);
            dragonBullet.splice(i,1);
        }else if(dragonBullet[i].dead && !dragonBullet[i].isCrashed) {
            dragonBullet[i].img.src = dragonBulletCrashSrc[level];
            dragonBullet[i].isCrashed = true;
            var img = dragonBullet[i].img;
            dragonBullet.splice(i,1);
            setTimeout(function(){
                container.removeChild(img);
            },100);
        }
    }
    for(var j = 0 ; j < bossBullet.length; j++){
        bossBullet[j].move('boss');
    }
}
// bulletMoveInter = setInterval(bulletMove,20);

//初始化小怪
function createMonster(){
    //var y = parseInt(Math.random()*620)+50; //随机初始化y坐标
    var y = parseInt(Math.random()*(50-clientHeight))+clientHeight;
    // var monsterRandom = parseInt(Math.random()*3); //随机初始化怪物图片
    var monsterRandom = (function(){
        var random = parseInt(Math.random()*5);
        switch (random) {
            case 0:
            case 1:
                return 0;
                break;
            case 2:
            case 3:
                return 1;
                break;
            case 4:
                return 2;
                break;
        }
    })();
    var src = monsterSrc[monsterRandom][0];
    var monster = new Plane(screenWidth+100,y,src);
    var speedX = parseInt(Math.random()*5)+2;
    monster.speedY = parseInt(Math.random()*5)-2;
    monster.random = monsterRandom;
    monster.dead = false;
    monster.blood = (monsterRandom+1)*2;
    monster.score = (monsterRandom+1)*100;
    monster.move = function(){
        this.img.style.left = parseInt(this.img.style.left) - speedX +'px';
        this.bloodImgContainer.style.left = parseInt(this.img.style.left) - speedX + 5 +'px';
        this.img.style.top = parseInt(this.img.style.top) - monster.speedY +'px';
        this.bloodImgContainer.style.top = parseInt(this.img.style.top) - monster.speedY -20 +'px';
    };
    monsterArr.push(monster);
}
function monsterMove(){
    for(var i = 0 ; i < monsterArr.length; i++){
        monsterArr[i].move();
        if(parseInt(monsterArr[i].img.style.left)<=-360){
            contanier.removeChild(monsterArr[i].img);
            contanier.removeChild(monsterArr[i].bloodImgContainer)
            monsterArr.splice(i,1);
        }
    }
}
function monsterMoveY(){
    for(var i = 0 ; i < monsterArr.length; i++){
        if(parseInt(monsterArr[i].img.style.top)<=40){
            monsterArr[i].speedY = parseInt(Math.random()*(-2));
            // monsterArr[i].speedY = parseInt(Math.random()*(2));
        }else if(parseInt(monsterArr[i].img.style.top)>=(clientHeight-100)) {
            monsterArr[i].speedY = parseInt(Math.random()*(2));
            // monsterArr[i].speedY = parseInt(Math.random()*(-2));
        }else {
            monsterArr[i].speedY = parseInt(Math.random()*5)-2;
        }
    }
}
var monsterCreateInter,monsterMoveInter,monsterMoveYInter;
// monsterCreateInter = setInterval(createMonster,3000); //创建怪
// monsterMoveInter = setInterval(monsterMove,20);     //怪移动
// monsterMoveYInter = setInterval(monsterMoveY,1000); //怪Y移动

//初始化盒子
function Box(x,y){
    this.img = document.createElement('img');
    this.img.src = '../images/enemy/thing.gif';
    this.img.style.position = 'absolute';
    this.img.style.left = x;
    this.img.style.top = y;
    this.dead = false;
    this.speedX = parseInt(Math.random()*(-6))+3;
    this.speedY= parseInt(Math.random()*2)-1;

    this.move = function(){
        this.img.style.left = parseInt(this.img.style.left) + this.speedX +'px';
        this.img.style.top = parseInt(this.img.style.top) + this.speedY +'px';
    };
    contanier.appendChild(this.img);

}

var boxMoveInter;
function boxMove(){
    for(var i = 0 ; i < boxArr.length; i++){
        boxArr[i].move();
        if(parseInt(boxArr[i].img.style.left)<=0
            ||parseInt(boxArr[i].img.style.left)>=screenWidth
            ||parseInt(boxArr[i].img.style.top)>=clientHeight+40
            ||parseInt(boxArr[i].img.style.top)<=-40
            ||boxArr[i].dead){
            contanier.removeChild(boxArr[i].img);
            boxArr.splice(i,1);
        }
    }
}
// boxMoveInter = setInterval(boxMove,20);

//碰撞函数
var monsterHit;
function crashInterval(){
    //子弹和怪物的碰撞判断
    var ci = crash(dragonBullet,monsterArr);
    if(ci.isCrash){
        if(!dragonBullet[ci.i].dead){
            dragonBullet[ci.i].dead = true;
            // dragonBullet[ci.i].img.src = dragonBulletCrashSrc[level];
            // setTimeout(function(){
            //     container.removeChild(dragonBullet[ci.i].img);
            //     dragonBullet.splice(ci.i,1);
            // },100);
            if(!monsterArr[ci.j].dead && monsterArr[ci.j].blood > 0) {
                monsterArr[ci.j].img.src = monsterSrc[monsterArr[ci.j].random][1];
                monsterArr[ci.j].img.style.left = parseInt(monsterArr[ci.j].img.style.left) + 25 + 'px';
                var oldBlood = (monsterArr[ci.j].random+1)*2;
                monsterArr[ci.j].blood -= level+1;
                monsterArr[ci.j].bloodImg.style.width = monsterArr[ci.j].blood/oldBlood*56+'px';
                    monsterHit = setTimeout(function(){
                    monsterArr[ci.j].img.src = monsterSrc[monsterArr[ci.j].random][0];
                },400);
                if(monsterArr[ci.j].blood <= 0){
                    monsterArr[ci.j].dead = true;
                    clearTimeout(monsterHit);
                    // monsterArr[ci.j].img.src = monsterSrc[1][2];
                    monsterArr[ci.j].img.src = monsterSrc[monsterArr[ci.j].random][2];
                    var img = monsterArr[ci.j].img;
                    var bloodImg = monsterArr[ci.j].bloodImgContainer;
                    scoreGet(monsterArr[ci.j].score,(monsterArr[ci.j].random+1)*(12-level*2));
                    monsterArr.splice(ci.j,1);
                    setTimeout(function(){
                        var x = img.style.left;
                        var y = img.style.top;
                        var random = parseInt(Math.random()*4);
                        container.removeChild(img);
                        container.removeChild(bloodImg);
                        if(random){
                            var box = new Box(x,y);
                            boxArr.push(box);
                        }
                    },700)
                }
            }
        }
    }

    //龙和盒子的碰撞
    var db = crash(dragonArr,boxArr);
    if(db.isCrash){
        if(!boxArr[db.j].dead){
            time += 15;
            var sec = time%60;
            var sec22 = sec%10;
            var sec11 = (sec-sec22)/10;
            var min = (time-sec)/60;
            var min22 = min%10;
            var min11 = (min-min22)/10;
            sec1.src = `../images/num/${sec11}.gif`;
            sec2.src = `../images/num/${sec22}.gif`;
            min1.src = `../images/num/${min11}.gif`;
            min2.src = `../images/num/${min22}.gif`;
        }
        boxArr[db.j].dead = true;
    }

    //龙和怪的碰撞
    var dm = crash(dragonArr,monsterArr);
    if(dm.isCrash){
        if(!dragon.isCrash) {
            dragon.isCrash = true;
            if(parseInt(dragon.bloodImg.style.width)>=10){
                dragon.bloodImg.style.width = parseInt(dragon.bloodImg.style.width) - 10 + 'px';
                dragon.img.style.animation = 'dragonOpacity 1.5s linear';
            }else {
                dragon.bloodImg.style.width = 0;
            }
            setTimeout(function(){
                dragon.isCrash = false;
                dragon.img.style.animation = null;
            },1500);
        }
    }

}
var crashInter; //用于监听碰撞
// crashInter = setInterval(crashInterval,1);

//时间倒计时
var min1 = document.getElementById('min1');
var min2 = document.getElementById('min2');
var sec1 = document.getElementById('sec1');
var sec2 = document.getElementById('sec2');
function timeBack(){
    time--;
    var sec = time%60;
    var sec22 = sec%10;
    var sec11 = (sec-sec22)/10;
    var min = (time-sec)/60;
    var min22 = min%10;
    var min11 = (min-min22)/10;
    sec1.src = `../images/num/${sec11}.gif`;
    sec2.src = `../images/num/${sec22}.gif`;
    min1.src = `../images/num/${min11}.gif`;
    min2.src = `../images/num/${min22}.gif`;
}

// timeInter = setInterval(timeBack,1000);

//记录分数
function scoreGet(num,exp1){
    var scoreNum = document.getElementById('scoreNum');
    var img = exp.getElementsByTagName('img')[0];
    scoreNum.innerHTML = parseInt(scoreNum.innerHTML) + num +'分';
    if(level < 4) {
        exp.style.height = parseInt(window.getComputedStyle(exp).height) + exp1 +'px';
    }
    if(parseInt(exp.style.height)>166){
        img.src = '../images/ui/expFull.gif';
        levelUp();
        setTimeout(function(){
            img.src = '../images/ui/expMax.gif';
            exp.style.height = '62px';
        },3000)
    }
}

// levelInterval = setInterval()
function levelUp(){
    // dragonMoveKeyPause();
    // if(level<4) {
        pause();
        dragon.img.src = '';
        dragon.img.style.background = standSrc[level];
    // }
        setTimeout(function(){
            level += 1;
            dragon.img.src = standSrc[level];
            dragon.img.style.background = null;
            start();
            dragonMoveKeyStart();
        },3000);
}
//开始游戏
start();
