var contanier = document.getElementById('container');
//飞机构造函数
function Plane(x,y,src){
    this.img = document.createElement('img');
    this.img.style.position = 'absolute';
    this.img.id = 'myDragon';
    this.img.style.left = x +'px';
    this.img.style.top = y +'px';
    this.img.src = src;
    container.appendChild(this.img);
}
