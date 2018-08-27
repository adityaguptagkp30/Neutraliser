var collector;


function startGame() 
{
    
    collector = new component(130, 140, "images/collector.png", 310, 580, "image");
    
       gameArea.start();
}

var gameArea = {
    canvas : document.getElementById("canvas"),
    start : function() {
        this.canvas.width = 750;
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
       this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            gameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            gameArea.key = false;
        })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
}

function component(width, height, img, x, y, type) {  //component is collector
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = img;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;   
    this.x = x;
    this.y = y;    
    this.update = function() 
    {
        ctx = gameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
               
    }
}

function updateGameArea() {
    gameArea.clear();
    collector.speedX = 0;
    
    if (gameArea.key == 37)
      {if(collector.x >0)
       {collector.speedX = -3}};
    
    if (gameArea.key == 39) 
      {if(collector.x + collector.width/2 <700)
        {collector.speedX = 3}};

    collector.newPos();
    collector.update();
}