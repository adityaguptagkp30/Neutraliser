    var collector;
    var charges = [];


    function startGame() 
    {
        gameArea.start();
        collector = new component(130, 140, "images/collector.png", 310, 580, "image");
    }

    var gameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
            this.canvas.width = 750;
            this.canvas.height = 700;
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
        
        
    }

    function component(width, height, img, x, y, type) {  //component is collector.
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
        var blast = true;
        if ((collectorbottom < chargetop) || (collectortop > chargebottom) || (collectorright < chargeleft) || (collectorleft > chargeright)) {
            blast = false;
        }
        return blast;
    }
        

    }

    function updateGameArea(){ 
                                                
        
        for (i = 0; i < charges.length; i++) {
        if (collector.collision(charges[i])) {
            charges[i].width = 0;
            charges[i].height =0;
            }
            }
            
        
        
        

         gameArea.clear();

        gameArea.frame += 1;
        if (gameArea.frame==1 || everyinterval(20)) {
            if(Math.round(Math.random())==0){
            charges.push(new component(50, 40, "images/-charge.png", Math.random()*700, 0,"image"));   
            }
            else{
            charges.push(new component(50, 40, "images/+charge.png", Math.random()*700, 0,"image"));
            }
        }


        for (i = 0; i < charges.length; i++) {
            charges[i].y += 5;
            charges[i].update();
        }
        collector.speedX=0;
        collector.speedY=0;
        if ( gameArea.key == 37) {if(collector.x >0){collector.speedX = -10; }}
        if ( gameArea.key == 39) {if(collector.x + collector.width/2 <700){collector.speedX = 10; }}
        collector.newPos();
        collector.update();

    }

    function everyinterval(n) {
        if (gameArea.frame %n == 0) {return true;}
        return false;
    }








