var back = document.getElementById('back');
back.onmouseover = function(){
    this.src = '../images/ui/backover.gif';
};
back.onmouseout = function(){
    this.src = '../images/ui/back.gif';
};
back.onmousedown = function(){
    this.src = '../images/ui/backClick.gif';
};
var exp = document.getElementById('exp');
var exp0 = document.getElementById('exp0');
var expBottom = clientHeight/4*3;
exp.style.bottom = expBottom +'px';
exp0.style.bottom = expBottom +'px';
var energyBox = document.getElementById('energy');
energyBox.style.bottom = expBottom/8*7 + 'px';
cover.style.height = clientHeight + 'px';
