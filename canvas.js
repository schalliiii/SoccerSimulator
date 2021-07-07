var canvas = document.getElementById('pitch');
var ctx = canvas.getContext('2d');
var aimX;
var aimY;
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
      ctx.beginPath();
      ctx.arc(this.x, this.y, 6, 0, 2*Math.PI, false);
      ctx.fillStyle = this.trickotColor;
      ctx.fill();
      ctx.strokeStyle = "#000";
      ctx.stroke();
      ctx.closePath(); 
  }
  isAt(ballX, ballY){
      return Math.abs(this.x - ballX) < 1 ? (Math.abs(this.y - ballY) < 1 ? true : false) : false;
  }
  move(ballX, ballY){
    var bX = ballX,
        bY = ballY;
      if (!this.isAt(bX, bY)) {
          this.x = this.x + this.speed;
          this.y = this.y + this.speed;
          this.draw();
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
var oneH = new player(1, "home", 2, 180, 100, 100, false, "#0047AB");
var twoH = new player(2, "home", 2, 140, 260, 100, false, "#0047AB");
var threeH = new player(3, "home", 2, 320, 60, false, "#0047AB");
var fourH = new player(4, "home", 2, 285, 250, 100, false, "#0047AB");
var fiveH = new player(5, "home", 2, 260, 410, 100, false, "#0047AB");
var sixH = new player(6, "home", 2, 500, 120, 100, false, "#0047AB");
var sevenH = new player(7, "home", 2, 530, 260, 100, false, "#0047AB");
var eightH = new player(8, "home", 2, 660, 85, 100, false, "#0047AB");
var nineH = new player(9, "home", 2, 610, 260, 100, false, "#0047AB");
var tenH = new player(10, "home", 2, 710, 180, 100, false, "#0047AB");
var elevenH = new player(11, "home", 2, canvas.width / 2 + 10 , canvas.height / 2 + 10, 100, true, "#0047AB");
var oneG = new player(1, "guest", canvas.width-70, canvas.height / 2 + 10, 100, false, "#FF0000");
var twoG = new player(2, "guest", 2, 650, 75, 100, false, "#FF0000");
var threeG = new player(3, "guest", 2, 625, 270, 100, false, "#FF0000");
var fourG = new player(4, "guest", 2, 630, 425, 100, false, "#FF0000");
var fiveG = new player(5, "guest", 2, 480, 90, 100, false, "#FF0000");
var sixG = new player(6, "guest", 2, 490, 405, 100, false, "#FF0000");
var sevenG = new player(7, "guest", 2, 315, 85, 100, false, "#FF0000");
var eightG = new player(8, "guest", 2, 250, 260, 100, false, "#FF0000");
var nineG = new player(9, "guest", 2, 260, 410, 100, false, "#FF0000");
var tenG = new player(10, "guest", 2, 140, 130, 100, false, "#FF0000");
var elvenG = new player(11, "guest", 2, 140, 380, 100, false, "#FF0000");

var activePlayers = [oneH, twoH, threeH, fourH, fiveH, sixH, sevenH, eightH, nineH, tenH, elevenH, oneG, twoG, threeG, fourG, fiveG, sixG, sevenG, eightG, nineG, tenG, elvenG];



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
    
    var ball = {
      x :  canvas.width / 2,
      y :  canvas.height / 2,
      //speed: 100,
      //target : {
      //  x : 0,
      //  y : 0
      //},
      /*move : function () {
        const h = Math.sqrt(Math.pow(Math.abs(this.x-this.target.x),2) +  Math.pow(Math.abs(this.y-this.target.y), 2));
        const v = Math.acos((Math.abs(this.x - this.target.x) / h));
  
        const x = ((this.speed/20)+1) * Math.cos(v);
        const y = ((this.speed/20)+1) * Math.sin(v);
  
        this.speed = this.speed * 0.98;
  
        if( this.target.x >= this.x && this.target.y >= this.y) {
            this.setPosition(this.x + x, this.y + y);
        }
        else if ( this.target.x >= this.x && this.target.y < this.y) {
            this.setPosition(this.x + x, this.y - y);
        }
        else if ( this.target.x < this.x && this.target.y >= this.y) {
            this.setPosition(this.x - x, this.y + y);
        }
        else if ( this.target.x < this.x && this.target.y < this.y) {
            this.setPosition(this.x - x, this.y - y);
        }
        this.draw();
      },*/
      draw : function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, 2*Math.PI, false);
        ctx.fillStyle = "#FFFF00";
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.closePath(); 
      }  
    };
    
    var player = {
      team: "home",
      speed: 1.5,
      x : 10,
      y : 10,
      isAt: function (point) {
        return Math.abs(this.x - point.x) < 1 ? (Math.abs(this.y - point.y) < 1 ? true : false) : false;
      },
      move: function (point) {
        if (!this.isAt(point)) {
  
          var h = Math.sqrt(Math.pow(Math.abs(this.x-point.x),2) +  Math.pow(Math.abs(this.y-point.y), 2));
          var v = Math.acos((Math.abs(this.x - point.x) / h));
          var x = this.speed * Math.cos(v);
          var y = this.speed * Math.sin(v);
  
          if( point.x >= this.x && point.y >= this.y) {
            this.x += x;
            this.y += y;
          }
          else if ( point.x >= this.x && point.y < this.y) {
            this.x += x;
            this.y -= y;
          }
          else if ( point.x < this.x && point.y >= this.y) {
            this.x -= x;
            this.y += y;
          }
          else if ( point.x < this.x && point.y < this.y) {
            this.x -= x;
            this.y -= y;
          }
          this.draw();
        }
      },
      draw: function () {
        pitch.draw();
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, 2*Math.PI, false);
        ctx.fillStyle = ((this.team === "home") ? "#00F" : "#F00");
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.closePath(); 
      }
    };
    ball.draw();  
    player.draw();  
    var coordinates = [
      { x: 200, y: 259}, 
      { x: 230, y: 229}, 
      { x: 290, y: 289}, 
      { x: 550, y: 289}, 
      { x: 400, y: 320}, 
      { x: 200, y: 259}
    ];
    
    var game = {
      timer: {},
      step: function () {
        //player.move(coordinates[0]);
        ball.move();
      },
      start: function () {  
        pitch.draw();
        ball.target.x = 800;
        ball.target.y = 250;
        this.timer = window.setInterval(this.step, 50);      
      }
    };
    pitch.draw();
    ball.draw();
    activePlayers.forEach(element => element.draw(ctx));
    this.timer = window.setInterval(this.step, 50);      
  })();
  
  