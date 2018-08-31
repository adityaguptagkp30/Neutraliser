var collector;
var poscharges = [];
var negcharges = [];
var neutcharges = []; //hello world
var netcharge = 0;
var points;


function startGame()
    {   
        collector = new component(130, 140, "images/collector.png", 310, window.innerHeight-150, "image");
        gameArea.start();
        points = new components("30px", "Consolas", "black", 280, 40, "text");
    }


var gameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
            this.canvas.width = window.innerWidth * 1/2;
            this.canvas.height = window.innerHeight * 0.95;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateGameArea, 20);
            this.frame=0;
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
        stop : function() {
            clearInterval(this.interval);
           }


    }


 function component(width, height, img, x, y, type) {  //component is collector & charges.
        this.type = type;
        if (type == "image") {
            this.image = new Image();
            this.image.src = img;
        }
        this.width = width;
        this.height = height;
        this.speedX = 0; 
        this.speedY = 0;
        this.x = x;
        this.y = y;    
        this.update = function() 
        {
            ctx = gameArea.context;
            if (type == "image") {
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            }
            else {
                ctx.fillStyle = img;
                ctx.fillRect(this.x, this.y, this.width, this.height);
          }}


        this.newPos = function() {
            this.x += this.speedX;
         }


        this.collision = function(charge) {    // collision function of charge & collector
            var collectorleft = this.x;
            var collectorright = this.x + (this.width);
            var collectortop = this.y;
            var collectorbottom = this.y + (this.height);
            var chargeleft = charge.x;
            var chargeright = charge.x + (charge.width);
            var chargetop = charge.y;
            var chargebottom = charge.y + (charge.height);
            var collect = true;
            if ((collectortop > chargebottom -30) || (collectorbottom < chargetop +30) ||  (collectorright < chargeleft+30) || (collectorleft > chargeright - 30)) 
                {
                collect = false;
               }
            return collect;
         }


    }




function components(width, height, color, x, y, type) {    // componenet is for score..
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = gameArea.context;
        if (this.type == "text") {
            ctx.font = this.width  + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}


function updateGameArea(){ 
                          gameArea.clear();                       

    gameArea.frame += 1;

        if (gameArea.frame==1 || everyinterval(20)) {
            if(Math.random()>0.3){
            if(Math.round(Math.random())==0){
            negcharges.push(new component(50, 40, "images/-charge.png", Math.random()*window.innerWidth/2, 0,"image"));   
            }

            else{
            poscharges.push(new component(50, 40, "images/+charge.png", Math.random()*window.innerWidth/2, 0,"image"));
            }}
            
            else { //hello world
                neutcharges.push(new component(55, 50, "images/bomb.png", Math.random()*window.innerWidth/2, 0,"image"))
            }
        }


        for (i = 0; i < poscharges.length; i++) {

                        if (collector.collision(poscharges[i])) {
                            poscharges[i].width = 0;
                            poscharges[i].height = -500;
                            netcharge++;
                               }
                        else {
                            poscharges[i].y += 4;
                               }
                        poscharges[i].update();
                }


        for (i = 0; i < negcharges.length; i++) {

                         if (collector.collision(negcharges[i])) {
                             negcharges[i].width = 0;
                             negcharges[i].height = -500; 
                             netcharge--;
                                }
                        else{
                            negcharges[i].y += 4;
                                }
                        negcharges[i].update();
                }

for (i = 0; i < neutcharges.length; i++) { // hello world

                         if (collector.collision(neutcharges[i])) {
                             gameArea.stop();
                                }
                        else{
                            neutcharges[i].y += 4;
                                }
                        neutcharges[i].update();
                }




        if(netcharge> 3 || netcharge < -3)
        {
            gameArea.stop();

        }

        collector.speedX=0;
        collector.speedY=0;
        if ( gameArea.key == 37) {if(collector.x > -20){collector.speedX = -10; }}
        if ( gameArea.key == 39) {if(collector.x + collector.width/2 < 720){collector.speedX = 10; }}
        points.text="SCORE: " + netcharge;
        points.update();

        collector.newPos();
        collector.update();

    }


function everyinterval(n) {
        if (gameArea.frame %n == 0) {return true;}
        return false;
    }







