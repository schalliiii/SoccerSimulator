var canvas = document.getElementById('pitch');
var ctx = canvas.getContext('2d');
var power = 0.5;
var anyPossession = false;
var aimX = 605;
var aimY = 185;
var homePlayerSelect = document.getElementById('selectHomePlayer');
var guestPlayerSelect = document.getElementById('selectGuestPlayer');
var formsH = document.getElementById("formsH");
var formsG = document.getElementById("formsG");
var selectHomeSub = document.getElementById("selectHomeSub");
var selectGuestSub = document.getElementById("selectGuestSub");
var subListH = document.getElementById("selectHomeSub");
var subListG = document.getElementById("selectGuestSub");
var confirmSubH = document.getElementById("confirmSubH");
var confirmSubG = document.getElementById("confirmSubG");


formsH.style.display = "none";
formsG.style.display = "none";
selectHomeSub.style.display = "none";
selectGuestSub.style.display = "none";
confirmSubH.style.display = "none";
confirmSubG.style.display = "none";

function redraw() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  field.draw(ctx);
  playball.draw(ctx);
  activePlayers.forEach(element => { element.draw(ctx); } );
}

function emptySelect(box) {
var length = box.options.length;
for (i = length-1; i >= 0; i--) {
  box.options[i] = null;
}
}

function showHomeSub(){
  selectHomeSub.style.display = "block";
  confirmSubH.style.display = "block";
}

function showGuestSub(){
  selectGuestSub.style.display = "block";
  confirmSubG.style.display = "block";
}

function confirmSubHome() {
  var e = document.getElementById("selectHomePlayer").value;
  var f = document.getElementById("selectHomeSub").value;
  var x;
  var y;
  for(var i = 0; i < activeH.length; i++){
    if(activeH[i].name == e){
      substitutesH.push(activeH[i]);
      x = activeH[i].x;
      y = activeH[i].y;
      activeH.splice(i, 1);
      for(var y = 0; y < activePlayers.length; y++){
        if(activePlayers[y].name == e){
          activePlayers.splice(i, 1);
        }
      }
    }
  }
  for(var i = 0; i < substitutesH.length; i++){
    if(substitutesH[i].name == f){
      substitutesH[i].x = x;
      substitutesH[i].y = y;
      activeH.push(substitutesH[i]);
      activePlayers.push(substitutesH[i]);
      substitutesH.splice(i, 1);
    }
  }
  emptySelect(homePlayerSelect);
  emptySelect(selectHomeSub);
  fillActiveHome();
  fillSubHome();
  redraw();
  confirmSubH.style.display="none";
  selectHomeSub.style.display="none";
}

function confirmSubGuest() {
  var e = document.getElementById("selectGuestPlayer").value;
  var f = document.getElementById("selectGuestSub").value;
  var x;
  var y;
  for(var i = 0; i < activeG.length; i++){
    if(activeG[i].name == e){
      substitutesH.push(activeG[i]);
      x = activeG[i].x;
      y = activeG[i].y;
      activeG.splice(i, 1);
      for(var y = 0; y < activePlayers.length; y++){
        if(activePlayers[y].name == e){
          activePlayers.splice(i, 1);
        }
      }
    }
  }
  for(var i = 0; i < substitutesG.length; i++){
    if(substitutesG[i].name == f){
      substitutesG[i].x = x;
      substitutesG[i].y = y;
      activeG.push(substitutesG[i]);
      activePlayers.push(substitutesG[i]);
      substitutesG.splice(i, 1);
    }
  }
  emptySelect(guestPlayerSelect);
  emptySelect(selectGuestSub);
  fillActiveHome();
  fillSubHome();
  redraw();
  confirmSubG.style.display="none";
  selectGuestSub.style.display="none";
}


class pitch {
  constructor(){
  }

  draw(ctx){
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


}
class player {
  constructor(number, team, speed, startingX, startingY, accuracy, possession, trickotColor, name){
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
      this.name = name;
  }
  draw(ctx) {
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
      return Math.abs(this.x - ballX) < 1 ? (Math.abs(this.y - ballY) < 1 ? true : false) : false;
  }
  
  move(ballX, ballY){
    var bX = ballX,
        bY = ballY;
        if(Math.abs(bX-this.x) <= 240 || Math.abs(bY-this.y) <= 240){
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
        }
      } else {
        if(this.startingX > this.x){
          this.x = this.x + this.speed;
        }
        if(this.startingX < this.X){
          this.x = this.x - this.speed;
        }
        if(this.startingY > this.Y){
          this.y = this.y + this.speed;
        }
        if(this.startingY < this.Y){
          this.y = this.y - this.speed;
        }
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
        this.x += Math.ceil(power);
      }
      if(this.x > aimX){
        this.x -= Math.ceil(power);
      }
      if(this.y < aimY){
        this.y += Math.ceil(power);
      }
      if(this.y > aimY){
        this.y -= Math.ceil(power);
      }
      power = power * 0.98;

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
var field = new pitch();
var playball = new ball();
var Neuer = new player(1, "home", 2, 180, 100, 100, false, "#0047AB", "Neuer");
var Ruediger = new player(2, "home", 2, 140, 260, 100, false, "#0047AB", "Ruediger");
var Hummels = new player(5, "home", 2, 320, 60, 100, false, "#0047AB", "Hummels");
var Ginter = new player(4, "home", 2, 285, 250, 100, false, "#0047AB", "Ginter");
var Gosens = new player(20, "home", 2, 280, 440, 100, false, "#0047AB", "Gosens");
var Kroos = new player(8, "home", 2, 500, 120, 100, false, "#0047AB", "Kroos");
var Guendogan = new player(21, "home", 2, 530, 260, 100, false, "#0047AB", "Guendogan");
var Kimmich = new player(6, "home", 2, 660, 85, 100, false, "#0047AB", "Kimmich");
var Harvertz = new player(7, "home", 2, 610, 260, 100, false, "#0047AB", "Harvertz");
var Mueller = new player(25, "home", 2, 710, 180, 100, false, "#0047AB", "Mueller");
var Gnabry = new player(10, "home", 0.5, canvas.width / 2 + 10 , canvas.height / 2 + 10, 100, true, "#0047AB", "Gnabry");
var Halstenberg = new player(3, "home", 0.5, canvas.width / 2 + 10 , canvas.height / 2 + 10, 100, true, "#0047AB", "Halstenberg");
var Volland = new player(9, "home", 0.5, canvas.width / 2 + 10 , canvas.height / 2 + 10, 100, true, "#0047AB", "Volland");
var Goretzka = new player(18, "home", 0.5, canvas.width / 2 + 10 , canvas.height / 2 + 10, 100, true, "#0047AB", "Goretzka");
var Trapp = new player(22, "home", 0.5, canvas.width / 2 + 10 , canvas.height / 2 + 10, 100, true, "#0047AB", "Trapp");
var Werner = new player(11, "home", 0.5, canvas.width / 2 + 10 , canvas.height / 2 + 10, 100, true, "#0047AB", "Werner");
var Patricio = new player(1, "guest", 2, 760, 270, 100, false, "#FF0000", "Patricio");
var Semedo = new player(2, "guest", 2, 650, 75, 100, false, "#FF0000", "Semedo");
var Pepe = new player(3, "guest", 2, 625, 270, 100, false, "#FF0000", "Pepe");
var Dias = new player(4, "guest", 2, 630, 425, 100, false, "#FF0000", "Dias");
var Guerreiro = new player(5, "guest", 2, 480, 90, 100, false, "#FF0000", "Guerreiro");
var Pereira = new player(13, "guest", 2, 490, 405, 100, false, "#FF0000", "Pereira");
var Silva = new player(10, "guest", 2, 315, 85, 100, false, "#FF0000", "Silva");
var Fernandes = new player(11, "guest", 2, 250, 260, 100, false, "#FF0000", "Fernandes");
var Carvalho = new player(14, "guest", 2, 260, 410, 100, false, "#FF0000", "Carvalho");
var Jota = new player(21, "guest", 2, 140, 130, 100, false, "#FF0000", "Jota");
var Ronaldo = new player(7, "guest", 2, 140, 380, 100, false, "#FF0000", "Ronaldo");
var Goncalves = new player(19, "guest", 2, 140, 380, 100, false, "#FF0000", "Goncalves");
var Lopes = new player(12, "guest", 2, 140, 380, 100, false, "#FF0000", "Lopes");
var Dalot = new player(20, "guest", 2, 140, 380, 100, false, "#FF0000", "Dalot");
var Sanches = new player(16, "guest", 2, 140, 380, 100, false, "#FF0000", "Sanches");
var Neves = new player(18, "guest", 2, 140, 380, 100, false, "#FF0000", "Neves");

var activePlayers = [Neuer, Ruediger, Hummels, Ginter, Gosens, Kroos, Guendogan, Kimmich, Harvertz, Mueller, Gnabry, Patricio, Semedo, Pepe, Dias, Guerreiro, Pereira, Silva, Fernandes, Carvalho, Jota, Ronaldo];
var activeH = [Neuer, Ruediger, Hummels, Ginter, Gosens, Kroos, Guendogan, Kimmich, Harvertz, Mueller, Gnabry];
var activeG = [Patricio, Semedo, Pepe, Dias, Guerreiro, Pereira, Silva, Fernandes, Carvalho, Jota, Ronaldo];
var substitutesH = [Halstenberg, Volland, Goretzka, Trapp, Werner];
var substitutesG = [Goncalves, Lopes, Dalot, Sanches, Neves];


function fillActiveHome() {
  for(var i = 0; i < activeH.length; i++) {
    var hplayer = activeH[i].name;
    var el = document.createElement("option");
    el.textContent = hplayer;
    el.value = hplayer;
    homePlayerSelect.appendChild(el);
  };
}


function fillActiveGuest() {
  for(var i = 0; i < activeG.length; i++) {
    var gplayer = activeG[i].name;
    var el = document.createElement("option");
    el.textContent = gplayer;
    el.value = gplayer;
    guestPlayerSelect.appendChild(el);
  };
}


function fillSubHome() {
  for(var i = 0; i < substitutesH.length; i++) {
    var shplayer = substitutesH[i].name;
    var el = document.createElement("option");
    el.textContent = shplayer;
    el.value = shplayer;
    subListH.appendChild(el);
  };
}


function fillSubGuest() {
  for(var i = 0; i < substitutesG.length; i++) {
    var sgplayer = substitutesG[i].name;
    var el = document.createElement("option");
    el.textContent = sgplayer;
    el.value = sgplayer;
    subListG.appendChild(el);
  };  
}
fillActiveHome();
fillActiveGuest();
fillSubHome();
fillSubGuest();



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


function play(){
  while(!anyPossession){
  activePlayers.forEach(element => {
    if (element.isAt(ball.getX, ball.getY)){
      element.possession = true;
      playball.setX(element.x);
      playball.setY(element.y);
      anyPossession = true;
      return
    }
  })
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    field.draw(ctx);
    playball.move(aimX, aimY);
    playball.draw(ctx);
    activePlayers.forEach(element => {
      element.move(playball.getX(), playball.getY(), ctx);
      element.draw(ctx);
    })
  
}


}

function test() {
  for(var i = 0; i < 500; i++){
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    field.draw(ctx);
    playball.move(aimX, aimY);
    playball.draw(ctx);
    activePlayers.forEach(element => {
      element.move(playball.getX(), playball.getY());
      element.draw(ctx);
    });
    setTimeout(function(){ console.log("hi"); }, 3000);
  }
}

(function () {  
     
    field.draw(ctx);
    playball.draw(ctx);
    activePlayers.forEach(element => { element.draw(ctx); } );
    //play();
/*     for(var i = 0; i < 300; i++){
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      field.draw(ctx);
      playball.move(aimX, aimY);
      playball.draw(ctx);
      elevenH.move(playball.getX(), playball.getY());
      elevenH.draw(ctx);
      console.log(playball.getX(), playball.getY());
    }  */

  })();
  
  