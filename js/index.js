//背景图片的高度
var clientHeight = document.documentElement.clientHeight;
var bg = document.getElementById('bg');
bg.style.height = clientHeight +'px';
var dragon;
var level = 0;  //龙的等级
//龙的攻击gif
var attackSrc = ['../images/dragon/small/magicmissile.gif','../images/dragon/middle/magicmissile.gif',
    '../images/dragon/large/magicmissile.gif','../images/dragon/big/magicmissile.gif','../images/dragon/final/magicmissile.gif']
//龙的站立gif
var standSrc = ['../images/dragon/small/stand.gif','../images/dragon/middle/stand.gif',
    '../images/dragon/large/stand.gif','../images/dragon/big/stand.gif','../images/dragon/final/stand.gif'];
//龙的子弹gif
var dragonBulletSrc = ['../images/dragon/small/att.gif','../images/dragon/middle/att.gif',
    '../images/dragon/large/att.gif','../images/dragon/big/att.gif','../images/dragon/final/att.gif'];
//龙的碰撞子弹gif
var dragonBulletCrashSrc = ['../images/dragon/small/hit.gif','../images/dragon/middle/hit.gif',
    '../images/dragon/large/hit.gif','../images/dragon/big/hit.gif','../images/dragon/final/hit.gif'];
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
var canAttack = false; //允许小龙发射子弹
var drgonmove; //监控小龙的函数 用于setInterval
var bulletMoveInter; //监听子弹移动的函数 setInterval
var time = 90;  //时间倒计时数
var timeInter;  //时间setInterval
//初始化小龙函数
    function myDragon() {
    var direction = {left: false, right: false, up: false, down: false,attack:false}; //用于小龙操作
//小龙创建
    dragon = new Plane(0, 400, '../images/dragon/small/stand.gif');
    dragon.img.style.animation = 'moveStart .5s linear forwards';
    setTimeout(function () {
        dragon.img.style.left = '104px';
        dragon.img.style.animation = null;
    }, 500);
//小龙移动和攻击的键盘监听
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
    //小龙移动攻击升级等功能
    function dragonMove() {
        if (direction.left) {
            dragon.img.style.left = parseInt(window.getComputedStyle(dragon.img).left) - 2.5 + 'px';
            if (parseInt(dragon.img.style.left) <= 0) {
                dragon.img.style.left = 0;
            }
        }
        if (direction.right) {
            dragon.img.style.left = parseInt(window.getComputedStyle(dragon.img).left) + 2.5 + 'px';
            if (parseInt(dragon.img.style.left) >= 1320) {
                dragon.img.style.left = 1320 + 'px';
            }
        }
        if (direction.up) {
            dragon.img.style.top = parseInt(window.getComputedStyle(dragon.img).top) - 2.5 + 'px';
            if (parseInt(dragon.img.style.top) <= 0) {
                dragon.img.style.top = 0;
            }
        }
        if (direction.down) {
            dragon.img.style.top = parseInt(window.getComputedStyle(dragon.img).top) + 2.5 + 'px';
            if (parseInt(dragon.img.style.top) > clientHeight-50) {
                dragon.img.style.top = clientHeight - 50+'px';
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
     drgonmove = setInterval(dragonMove,5);
}




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
        if(parseInt(dragonBullet[i].img.style.left)>=1396 && !dragonBullet[i].dead ){
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
bulletMoveInter = setInterval(bulletMove,20);

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
    var monster = new Plane(1400,y,src);
    var speedX = parseInt(Math.random()*5)+2;
    monster.speedY = parseInt(Math.random()*4)-2;
    monster.random = monsterRandom;
    monster.dead = false;
    monster.blood = (monsterRandom+1)*2;
    monster.move = function(){
        this.img.style.left = parseInt(this.img.style.left) - speedX +'px';
        this.img.style.top = parseInt(this.img.style.top) - monster.speedY +'px';
    };
    monsterArr.push(monster);
}
function monsterMove(){
    for(var i = 0 ; i < monsterArr.length; i++){
        monsterArr[i].move();
        if(parseInt(monsterArr[i].img.style.left)<=-360){
            contanier.removeChild(monsterArr[i].img);
            monsterArr.splice(i,1);
        }

    }
}
function monsterMoveY(){
    for(var i = 0 ; i < monsterArr.length; i++){
        monsterArr[i].speedY = parseInt(Math.random()*4)-2;
        if(parseInt(monsterArr[i].img.style.top)<=40 || parseInt(monsterArr[i].img.style.top)>=clientHeight-50){
            monsterArr[i].speedY *= -1;
        }
    }
}
var monsterCreateInter,monsterMoveInter,monsterMoveYInter;
monsterCreateInter = setInterval(createMonster,3000); //创建怪
monsterMoveInter = setInterval(monsterMove,20);     //怪移动
monsterMoveYInter = setInterval(monsterMoveY,1000); //怪Y移动


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
                monsterArr[ci.j].blood -= level+4;
                monsterHit = setTimeout(function(){
                    monsterArr[ci.j].img.src = monsterSrc[monsterArr[ci.j].random][0];
                },400);
                if(monsterArr[ci.j].blood <= 0){
                    monsterArr[ci.j].dead = true;
                    clearTimeout(monsterHit);
                    // monsterArr[ci.j].img.src = monsterSrc[1][2];
                    monsterArr[ci.j].img.src = monsterSrc[monsterArr[ci.j].random][2];
                    var img = monsterArr[ci.j].img;
                    monsterArr.splice(ci.j,1);
                    setTimeout(function(){
                        container.removeChild(img);
                    },700)
                }
            }
        }
    }
}
var crashInter; //用于监听碰撞
crashInter = setInterval(crashInterval,1);

//时间倒计时
var min1 = document.getElementById('min1');
var min2 = document.getElementById('min2');
var sec1 = document.getElementById('sec1');
var sec2 = document.getElementById('sec2');

timeInter = setInterval(function(){
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
},1000);

