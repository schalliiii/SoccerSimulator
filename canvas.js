var canvas = document.getElementById('pitch');
var ctx = canvas.getContext('2d');
var power = 1;
class player {
  constructor(number, team, speed, startingX, startingY, accuracy, possession, trickotColor){
      this.number = number;
      this.team = team;
      this.speed = speed;
      this.startingX = startingX;
      this.startingY = startingY;
      this.accuracy = accuracy;
      this.x = startingX;
      this.y = startingY;
      this.possession = possession;
      this.trickotColor = trickotColor;
  }
  draw(ctx) {
    console.log(ctx);
      ctx.beginPath();
      ctx.strokeStyle = this.trickotColor;
      ctx.arc(this.x, this.y, 10, 0, 2*Math.PI, false);
      ctx.font = '8pt Calibri';
      ctx.stroke();
      ctx.textAlign = "center";
      ctx.fillText(this.number, this.x, this.y);
      ctx.closePath(); 
  }

  isAt(ballX, ballY){
    this.possession = true;
      return Math.abs(this.x - ballX) < 1 ? (Math.abs(this.y - ballY) < 1 ? true : false) : false;
  }
  
  move(ballX, ballY, ctx){
    var bX = ballX,
        bY = ballY;
      if (!this.isAt(bX, bY)) {
        if(bX > this.x){
          this.x = this.x + this.speed;
        }
        if(bX < this.X){
          this.x = this.x - this.speed;
        }
        if(bY > this.Y){
          this.y = this.y + this.speed;
        }
        if(bY < this.Y){
          this.y = this.y - this.speed;
        }
          this.draw(ctx);
        }
  }

  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
  getPossession(){
    return this.possession;
  }
  kick(x,y){
    ball.move(x + (100 - this.accuracy), y + (100 - this.accuracy));
  }
}

class ball{
  constructor(){
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
  }

    move(aimX, aimY) {
      if(this.x < aimX){
        this.x += power;
      }
      if(this.x > aimX){
        this.x -= power;
      }
      if(this.y < aimY){
        this.y += power;
      }
      if(this.y > aimY){
        this.y -= power;
      }
      power = power * 0.98;

      this.draw();
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, 2*Math.PI, false);
      ctx.fillStyle = "#FFFF00";
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.stroke();
      ctx.closePath(); 
    }
    getX(){
      return this.x;
    }
    getY(){
      return this.y;
    }  
    setX(x){
      this.x = x;
    }
    setY(y){
      this.y = y;
    }  
    
}

class referee{
constructor(speed, startX, startY){
  this.x = startingX;
  this.y = startingY;
}

move(){
}
getX(){
  return this.x;
}
getY(){
  return this.y;
}
}

class assistant{
constructor(speed, startX, startY){
  this.x = startingX;
  this.y = startingY;
}

move(){
}
getX(){
  return this.x;
}
getY(){
  return this.y;
}
}
var playball = new ball();
var oneH = new player(1, "home", 2, 180, 100, 100, false, "#0047AB");
var twoH = new player(2, "home", 2, 140, 260, 100, false, "#0047AB");
var threeH = new player(3, "home", 2, 320, 60, false, "#0047AB");
var fourH = new player(4, "home", 2, 285, 250, 100, false, "#0047AB");
var fiveH = new player(5, "home", 2, 280, 440, 100, false, "#0047AB");
var sixH = new player(6, "home", 2, 500, 120, 100, false, "#0047AB");
var sevenH = new player(7, "home", 2, 530, 260, 100, false, "#0047AB");
var eightH = new player(8, "home", 2, 660, 85, 100, false, "#0047AB");
var nineH = new player(9, "home", 2, 610, 260, 100, false, "#0047AB");
var tenH = new player(10, "home", 2, 710, 180, 100, false, "#0047AB");
var elevenH = new player(11, "home", 2, canvas.width / 2 + 10 , canvas.height / 2 + 10, 100, true, "#0047AB");
var oneG = new player(1, "guest", 2, 760, 270, 100, false, "#FF0000");
var twoG = new player(2, "guest", 2, 650, 75, 100, false, "#FF0000");
var threeG = new player(3, "guest", 2, 625, 270, 100, false, "#FF0000");
var fourG = new player(4, "guest", 2, 630, 425, 100, false, "#FF0000");
var fiveG = new player(5, "guest", 2, 480, 90, 100, false, "#FF0000");
var sixG = new player(6, "guest", 2, 490, 405, 100, false, "#FF0000");
var sevenG = new player(7, "guest", 2, 315, 85, 100, false, "#FF0000");
var eightG = new player(8, "guest", 2, 250, 260, 100, false, "#FF0000");
var nineG = new player(9, "guest", 2, 260, 410, 100, false, "#FF0000");
var tenG = new player(10, "guest", 2, 140, 130, 100, false, "#FF0000");
var elevenG = new player(11, "guest", 2, 140, 380, 100, false, "#FF0000");

var activePlayers = [oneG, twoG, threeG, fourG, fiveG, sixG, sevenG, eightG, nineG, tenG, elevenG];



function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  /*var playerInPossession;
  activePlayers.array.forEach(element => {
    if(element.getPossession()==true){
      playerInPossession = element;
    }
  });
  playerInPossession.kick(x, y);*/
  console.log(x, y);
}


canvas.addEventListener("mousedown", function(e)
{
  getMousePosition(canvas, e);
});

function run() {
  
}




(function () {  

    
    var pitch = {
      draw : function () {
        
        // Outer lines
        ctx.beginPath();
        ctx.rect(0,0, canvas.width, canvas.height);
        ctx.fillStyle = "#060";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#FFF";
        ctx.stroke();
        ctx.closePath();
        
        ctx.fillStyle = "#FFF";
        
        // Mid line
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.closePath();
        
        //Mid circle
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, 73, 0, 2*(Math.PI), false);
        ctx.stroke();
        ctx.closePath();
        //Mid point
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, 2, 0, 2*Math.PI, false);
        ctx.fill();
        ctx.closePath();
        
        //Home penalty box
        ctx.beginPath();
        ctx.rect(0, (canvas.height - 322) / 2, 132, 322);
        ctx.stroke();
        ctx.closePath();
        //Home goal box
        ctx.beginPath();
        ctx.rect(0, (canvas.height - 146) / 2, 44, 146);
        ctx.stroke();
        ctx.closePath();
        //Home goal 
        ctx.beginPath();
        ctx.moveTo(1, (canvas.height / 2) - 22);
        ctx.lineTo(1, (canvas.height / 2) + 22);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        ctx.lineWidth = 1;
  
        //Home penalty point
        ctx.beginPath()
        ctx.arc(88, canvas.height / 2, 1, 0, 2*Math.PI, true);
        ctx.fill();
        ctx.closePath();
        //Home half circle
        ctx.beginPath()
        ctx.arc(88, canvas.height / 2, 73, 0.29*Math.PI, 1.71*Math.PI, true);
        ctx.stroke();
        ctx.closePath();
        
        //Away penalty box
        ctx.beginPath();
        ctx.rect(canvas.width-132, (canvas.height - 322) / 2, 132, 322);
        ctx.stroke();
        ctx.closePath();
        //Away goal box
        ctx.beginPath();
        ctx.rect(canvas.width-44, (canvas.height - 146) / 2, 44, 146);
        ctx.stroke();
        ctx.closePath();      
        //Away goal 
        ctx.beginPath();
        ctx.moveTo(canvas.width-1, (canvas.height / 2) - 22);
        ctx.lineTo(canvas.width-1, (canvas.height / 2) + 22);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        ctx.lineWidth = 1;
        //Away penalty point
        ctx.beginPath()
        ctx.arc(canvas.width-88, canvas.height / 2, 1, 0, 2*Math.PI, true);
        ctx.fill();
        ctx.closePath();
        //Away half circle
        ctx.beginPath()
        ctx.arc(canvas.width-88, canvas.height / 2, 73, 0.71*Math.PI, 1.29*Math.PI, false);
        ctx.stroke();
        ctx.closePath();
              
        //Home L corner
        ctx.beginPath()
        ctx.arc(0, 0, 8, 0, 0.5*Math.PI, false);
        ctx.stroke();
        ctx.closePath();
        //Home R corner
        ctx.beginPath()
        ctx.arc(0, canvas.height, 8, 0, 2*Math.PI, true);
        ctx.stroke();
        ctx.closePath();
        //Away R corner
        ctx.beginPath()
        ctx.arc(canvas.width, 0, 8, 0.5*Math.PI, 1*Math.PI, false);
        ctx.stroke();
        ctx.closePath();
        //Away L corner
        ctx.beginPath()
        ctx.arc(canvas.width, canvas.height, 8, 1*Math.PI, 1.5*Math.PI, false);
        ctx.stroke();
        ctx.closePath();
      }
    };  
    
    
    pitch.draw();
    playball.draw(ctx);
    activePlayers.forEach(element => { element.draw(ctx); } );
      
  })();
  
  