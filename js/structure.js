var container = document.getElementById('container');
//飞机构造函数
function Plane(x,y,src){
    this.img = document.createElement('img');
    this.img.style.outline = null;
    this.img.style.border = null;
    this.bloodImg = document.createElement("div");//血量
    this.bloodImgR = document.createElement("img");//血量
    this.bloodImgBlack = document.createElement('img');//血量黑条
    this.bloodImgContainer = document.createElement('div');//血量外壳

    this.img.src = src;

    this.bloodImgR.src = '../images/ui/HPMAX.png';
    this.bloodImgBlack.src = '../images/ui/HP0.png';

    this.bloodImg.style.width = '56px';
    this.bloodImg.style.transition = 'width .2s linear';
    this.bloodImgBlack.style.width = '56px';

    this.bloodImg.style.height = '7px';
    this.bloodImgBlack.style.height = '7px';

    this.bloodImg.style.overflow = 'hidden';

    this.img.style.position = 'absolute';

    this.bloodImgContainer.style.position = 'absolute';
    this.bloodImg.style.position = 'absolute';
    this.bloodImgBlack.style.position = 'absolute';
    this.bloodImgR.style.position = 'absolute';
    this.bloodImg.style.top = 0;
    this.bloodImgBlack.style.top = 0;
    this.bloodImgR.style.top = 0;

    // this.img.id = 'myDragon';
    this.img.style.left = x +'px';
    this.bloodImgContainer.style.left = x + 5 +'px';
    this.bloodImgContainer.style.height = 7 +'px';
    this.img.style.top = y +'px';
    this.bloodImgContainer.style.top = y -20 +'px';


    container.appendChild(this.img);
    container.appendChild(this.bloodImgContainer);
    // this.bloodImgBlack.appendChild(this.bloodImg);
    this.bloodImgContainer.appendChild(this.bloodImgBlack);
    this.bloodImgContainer.appendChild(this.bloodImg);
    this.bloodImg.appendChild(this.bloodImgR);
}
