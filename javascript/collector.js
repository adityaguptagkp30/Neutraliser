//INITIALISING VARIABLES...............
var collector;
var poscharges = [];
var negcharges = [];
var bomb = []; 
var netcharge = 0;
var points;
var totcharge = 0;
var collectSound;
var blastSound;
var refresh;


function startGame()
    {   
        gameArea.start();
        collector = new component(130, 140, "images/collector.png", window.innerWidth/3 , window.innerHeight - 130, "image");
        points = new components("2vw", "arial", "white", 0, 40, "text");
        score = new components( "2vw", "arial", "white", 55ss0, 40, "text");
        gameOver = new components("60px", "arial", "blue", 220, 300, "text");
        collectSound = new sound("sounds/collect.mp3");
        blastSound = new sound("sounds/blast.mp3")
        refresh =new components("50px", "arial", "white", 200, 400, "text");
    }



var gameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
            this.canvas.width = (window.innerWidth)/2;
            this.canvas.height = window.innerHeight-20;
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
            
            gameArea.clear();
            gameOver.text="GAME OVER";
            gameOver.update();
            refresh.text="Hit F5 to Play Again";
            refresh.update();
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
        }


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




function components(width, height, color, x, y, type) {    // componentS is for TEXT ITEMS..
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
                    ctx.fillText(this.text, this.x, this.y);}
                   }
      }


function updateGameArea(){ 
       
           gameArea.clear();                       
           gameArea.frame += 1;

//PUSHING CHARGES AND BOMBS
    
           if (gameArea.frame==1 || everyinterval(20)) {
                if(Math.random()>0.3){
                if(Math.round(Math.random())==0){
                negcharges.push(new component(50, 40, "images/-charge.png", Math.random()*window.innerWidth/2, 0,"image"));   
                }
            else{
                poscharges.push(new component(50, 40, "images/+charge.png", Math.random()*window.innerWidth/2, 0,"image"));
                }}

                else { 
                    bomb.push(new component(55, 50, "images/bombs.png", Math.random()*window.innerWidth/2, 0,"image"));
                     }
             }


//CHECKING COLLISION WITH +VE CHARGE
    
        for (i = 0; i < poscharges.length; i++) {

                        if (collector.collision(poscharges[i])) {
                            collectSound.stop();
                            collectSound.play();
                            poscharges[i].width = 0;
                            poscharges[i].height = -500;
                            netcharge++;
                            totcharge++;
                               }
                        else {
                            poscharges[i].y += 4;
                            poscharges[i].update();
                               }
                        
                }

//CHECKING COLLISION WITH -VE CHARGE
    
        for (i = 0; i < negcharges.length; i++) {

                         if (collector.collision(negcharges[i])) {
                             collectSound.stop();
                             collectSound.play();
                             negcharges[i].width = 0;
                             negcharges[i].height = -500; 
                             
                             netcharge--;
                             totcharge++;
                                }
                        else{
                            negcharges[i].y += 4;
                            negcharges[i].update();
                                }
                        
                }
//CHECKING COLLISION WITH BOMB
       for (i = 0; i < bomb.length; i++) { 

                         if (collector.collision(bomb[i])) {
                             blastSound.play();
                             bomb.width = 0;
                             bomb.height = 0;
                             for(i = 0; i < bomb.length; i++)
                                 {bomb.pop();}
                             gameArea.stop();
                                }
                         else {
                            bomb[i].y += 4;
                            bomb[i].update();
                                }
                        }
 
//GAME TERMINATING CONDITION
    
        if(netcharge> 3 || netcharge < -3)
        { blastSound.play();
            gameArea.stop();

        }

        collector.speedX=0;
        collector.speedY=0;
//CONDITION FOR KEY LISTNER
    
        if ( gameArea.key == 37) {if(collector.x > -20){collector.speedX = -10; }}
        if ( gameArea.key == 39) {if(collector.x + collector.width/2 < 645){collector.speedX = 10; }}

//SCORE AND POINT UPDATE
    
        points.text="NetCharge: " + netcharge;
        points.update();
    
        score.text="Score: " + totcharge;
        score.update();

        collector.newPos();
        collector.update();

    }


function everyinterval(n) {
        if (gameArea.frame %n == 0) {return true;}
        return false;
    }


//FUNCTION FOR SOUND

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
        this.sound.currentTime=0;
    }
}



