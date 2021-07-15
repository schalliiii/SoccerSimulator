var canvas = document.getElementById('pitch');
var ctx = canvas.getContext('2d');
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
var speedH = document.getElementById("speedSlideH");
var speedG = document.getElementById("speedSlideG");
var accuracyH = document.getElementById("accuracySlideH");
var accuracyG = document.getElementById("accuracySlideG");
var trickotH = document.getElementById("trickotColorH");
var trickotG = document.getElementById("trickotColorG");
var possession = document.getElementById("possession");
var phase = 0;
var mousPos;
var deviatedBool = false;
var deviatedPos;
var goalsHome = 0;
var goalsGuest = 0;
var goalScored = false;

console.log(deviatedPos);




formsH.style.display = "none";
formsG.style.display = "none";
selectHomeSub.style.display = "none";
selectGuestSub.style.display = "none";
confirmSubH.style.display = "none";
confirmSubG.style.display = "none";

function changeTrickotH() {

  var players = activeH.concat(substitutesH);
  for (var i = 0; i < players.length; i++) {
    switch (trickotH.value) {
      case "Black":
        players[i].trickotColor = "#000000";
        break;
      case "Blue":
        players[i].trickotColor = "#0000ff";
        break;
      case "Green":
        players[i].trickotColor = "#00ff00";
        break;
      case "Purple":
        players[i].trickotColor = "#a020f0";
        break;
      case "Red":
        players[i].trickotColor = "#ff0000";
        break;
    }
  }
  redraw();
}

function changeTrickotG() {

  var players = activeG.concat(substitutesG);
  for (var i = 0; i < players.length; i++) {
    switch (trickotG.value) {
      case "Black":
        players[i].trickotColor = "#000000";
        break;
      case "Blue":
        players[i].trickotColor = "#0000ff";
        break;
      case "Green":
        players[i].trickotColor = "#00ff00";
        break;
      case "Purple":
        players[i].trickotColor = "#a020f0";
        break;
      case "Red":
        players[i].trickotColor = "#ff0000";
        break;
    }
  }
  redraw();
}

function cancelSubHome() {
  confirmSubH.style.display = "none";
  subListH.style.display = "none";
}

function cancelSubGuest() {
  confirmSubG.style.display = "none";
  subListG.style.display = "none";
}

function cancelAttributesH() {
  formsH.style.display = "none";
  speedH.value = 0;
  accuracyH.value = 0;
}

function cancelAttributesG() {
  formsG.style.display = "none";
  speedG.value = 0;
  accuracyG.value = 0;
}

function confirmAttributesH() {
  var speed = speedH.value;
  var accuracy = accuracyH.value;
  var homePlayer;
  for (var i = 0; i < activeH.length; i++) {
    if (activeH[i].name == homePlayerSelect.value) {
      homePlayer = activeH[i];
    }
  }
  homePlayer.speed = parseInt(speed);
  homePlayer.accuracy = parseInt(accuracy);
  formsH.style.display = "none";
}

function confirmAttributesG() {
  var speed = speedG.value;
  var accuracy = accuracyG.value;
  var guestPlayer;
  for (var i = 0; i < activeG.length; i++) {
    if (activeG[i].name == guestPlayerSelect.value) {
      guestPlayer = activeG[i];
    }
  }
  guestPlayer.accuracy = parseInt(accuracy);
  guestPlayer.speed = parseInt(speed);
  formsG.style.display = "none";
}

function changeAttributesH() {
  var name = homePlayerSelect.value;
  var player;
  for (var i = 0; i < activeH.length; i++) {
    if (activeH[i].name == name) {
      player = activeH[i];
    }
  }
  accuracyH.value = player.accuracy;
  speedH.value = player.speed;
  formsH.style.display = "block";
}

function changeAttributesG() {
  var name = guestPlayerSelect.value;
  var player;
  for (var i = 0; i < activeH.length; i++) {
    if (activeG[i].name == name) {
      player = activeG[i];
    }
  }
  accuracyG.value = player.accuracy;
  speedG.value = play.speed;
  formsG.style.display = "block";
}

function redraw() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  field.draw(ctx);
  playball.draw(ctx);
  activePlayers.forEach(element => { element.draw(ctx); });
  assistantTop.draw(ctx);
  assistantBot.draw(ctx);
}

function emptySelect(box) {
  var length = box.options.length;
  for (i = length - 1; i >= 0; i--) {
    box.options[i] = null;
  }
}

function showHomeSub() {
  selectHomeSub.style.display = "block";
  confirmSubH.style.display = "block";
}

function showGuestSub() {
  selectGuestSub.style.display = "block";
  confirmSubG.style.display = "block";
}

function confirmSubHome() {
  var e = document.getElementById("selectHomePlayer").value;
  var f = document.getElementById("selectHomeSub").value;
  var x;
  var y;
  for (var i = 0; i < activeH.length; i++) {
    if (activeH[i].name == e) {
      substitutesH.push(activeH[i]);
      x = activeH[i].x;
      y = activeH[i].y;
      activeH.splice(i, 1);
      for (var k = 0; k < activePlayers.length; k++) {
        if (activePlayers[k].name == e) {
          activePlayers.splice(k, 1);
        }
      }
    }
  }
  for (var i = 0; i < substitutesH.length; i++) {
    if (substitutesH[i].name == f) {
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
  confirmSubH.style.display = "none";
  selectHomeSub.style.display = "none";
}

function confirmSubGuest() {
  var e = document.getElementById("selectGuestPlayer").value;
  var f = document.getElementById("selectGuestSub").value;
  var x;
  var y;
  for (var i = 0; i < activeG.length; i++) {
    if (activeG[i].name == e) {
      substitutesG.push(activeG[i]);
      x = activeG[i].x;
      y = activeG[i].y;
      activeG.splice(i, 1);
      for (var k = 0; k < activePlayers.length; k++) {
        if (activePlayers[k].name == e) {
          activePlayers.splice(k, 1);
        }
      }
    }
  }
  for (var i = 0; i < substitutesG.length; i++) {
    if (substitutesG[i].name == f) {
      substitutesG[i].x = x;
      substitutesG[i].y = y;
      activeG.push(substitutesG[i]);
      activePlayers.push(substitutesG[i]);
      substitutesG.splice(i, 1);
    }
  }
  emptySelect(guestPlayerSelect);
  emptySelect(selectGuestSub);
  fillActiveGuest();
  fillSubGuest();
  redraw();
  confirmSubG.style.display = "none";
  selectGuestSub.style.display = "none";
}


class pitch {
  constructor() {
  }

  draw(ctx) {
    // Outer lines
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
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
    ctx.arc(canvas.width / 2, canvas.height / 2, 73, 0, 2 * (Math.PI), false);
    ctx.stroke();
    ctx.closePath();
    //Mid point
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, 2, 0, 2 * Math.PI, false);
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
    ctx.arc(88, canvas.height / 2, 1, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.closePath();
    //Home half circle
    ctx.beginPath()
    ctx.arc(88, canvas.height / 2, 73, 0.29 * Math.PI, 1.71 * Math.PI, true);
    ctx.stroke();
    ctx.closePath();

    //Away penalty box
    ctx.beginPath();
    ctx.rect(canvas.width - 132, (canvas.height - 322) / 2, 132, 322);
    ctx.stroke();
    ctx.closePath();
    //Away goal box
    ctx.beginPath();
    ctx.rect(canvas.width - 44, (canvas.height - 146) / 2, 44, 146);
    ctx.stroke();
    ctx.closePath();
    //Away goal 
    ctx.beginPath();
    ctx.moveTo(canvas.width - 1, (canvas.height / 2) - 22);
    ctx.lineTo(canvas.width - 1, (canvas.height / 2) + 22);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    ctx.lineWidth = 1;
    //Away penalty point
    ctx.beginPath()
    ctx.arc(canvas.width - 88, canvas.height / 2, 1, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.closePath();
    //Away half circle
    ctx.beginPath()
    ctx.arc(canvas.width - 88, canvas.height / 2, 73, 0.71 * Math.PI, 1.29 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();

    //Home L corner
    ctx.beginPath()
    ctx.arc(0, 0, 8, 0, 0.5 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
    //Home R corner
    ctx.beginPath()
    ctx.arc(0, canvas.height, 8, 0, 2 * Math.PI, true);
    ctx.stroke();
    ctx.closePath();
    //Away R corner
    ctx.beginPath()
    ctx.arc(canvas.width, 0, 8, 0.5 * Math.PI, 1 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
    //Away L corner
    ctx.beginPath()
    ctx.arc(canvas.width, canvas.height, 8, 1 * Math.PI, 1.5 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
  }


}
class player {
  constructor(number, team, speed, startingX, startingY, accuracy, possession, trickotColor, name) {
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
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
    ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
    ctx.font = '8pt Calibri';
    ctx.stroke();
    ctx.textAlign = "center";
    ctx.fillText(this.number, this.x, this.y);
    ctx.closePath();
  }

}

class ball {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
  }


  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#FFFF00";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.closePath();
  }
}

class referee {
  constructor(speed, startX, startY) {
    this.x = startingX;
    this.y = startingY;
  }
}

class assistant {
  constructor(speed, startingX, startingY) {
    this.speed = speed;
    this.startingX = startingX;
    this.startingY = startingY;
    this.x = startingX;
    this.y = startingY;

  }
  draw(ctx){
    ctx.beginPath();
    ctx.strokeStyle = "#FFFF00";
    ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
    ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
  }

}
var field = new pitch();
var playball = new ball();
var Neuer = new player(1, "home", 150, 40, canvas.height/2, 100, false, "#0047AB", "Neuer");
var Ruediger = new player(2, "home", 150, 190, 260, 100, false, "#0047AB", "Ruediger");
var Hummels = new player(5, "home", 150, 260, 60, 100, false, "#0047AB", "Hummels");
var Ginter = new player(4, "home", 150, 285, 250, 100, false, "#0047AB", "Ginter");
var Gosens = new player(20, "home", 150, 280, 440, 100, false, "#0047AB", "Gosens");
var Kroos = new player(8, "home", 150, 500, 120, 100, false, "#0047AB", "Kroos");
var Guendogan = new player(21, "home", 150, 530, 460, 100, false, "#0047AB", "Guendogan");
var Kimmich = new player(6, "home", 150, 660, 85, 100, false, "#0047AB", "Kimmich");
var Harvertz = new player(7, "home", 150, 610, 260, 100, false, "#0047AB", "Harvertz");
var Mueller = new player(25, "home", 150, 710, 180, 100, false, "#0047AB", "Mueller");
var Gnabry = new player(10, "home", 150, canvas.width / 2 + 10, canvas.height / 2 + 10, 100, false, "#0047AB", "Gnabry");
var Halstenberg = new player(3, "home", 100, canvas.width / 2 + 10, canvas.height / 2 + 10, 100, false, "#0047AB", "Halstenberg");
var Volland = new player(9, "home", 100, canvas.width / 2 + 10, canvas.height / 2 + 10, 100, false, "#0047AB", "Volland");
var Goretzka = new player(18, "home", 100, canvas.width / 2 + 10, canvas.height / 2 + 10, 100, false, "#0047AB", "Goretzka");
var Trapp = new player(22, "home", 100, canvas.width / 2 + 10, canvas.height / 2 + 10, 100, false, "#0047AB", "Trapp");
var Werner = new player(11, "home", 100, canvas.width / 2 + 10, canvas.height / 2 + 10, 100, false, "#0047AB", "Werner");
var Patricio = new player(1, "guest", 100, 760, 270, 100, false, "#FF0000", "Patricio");
var Semedo = new player(2, "guest", 100, 650, 75, 100, false, "#FF0000", "Semedo");
var Pepe = new player(3, "guest", 100, 625, 270, 100, false, "#FF0000", "Pepe");
var Dias = new player(4, "guest", 100, 630, 425, 100, false, "#FF0000", "Dias");
var Guerreiro = new player(5, "guest", 100, 480, 90, 100, false, "#FF0000", "Guerreiro");
var Pereira = new player(13, "guest", 100, 390, 405, 100, false, "#FF0000", "Pereira");
var Silva = new player(10, "guest", 100, 315, 85, 100, false, "#FF0000", "Silva");
var Fernandes = new player(11, "guest", 100, 250, 260, 100, false, "#FF0000", "Fernandes");
var Carvalho = new player(14, "guest", 100, 480, 280, 100, false, "#FF0000", "Carvalho");
var Jota = new player(21, "guest", 100, 140, 130, 100, false, "#FF0000", "Jota");
var Ronaldo = new player(7, "guest", 100, 140, 380, 100, false, "#FF0000", "Ronaldo");
var Goncalves = new player(19, "guest", 100, 140, 380, 100, false, "#FF0000", "Goncalves");
var Lopes = new player(12, "guest", 100, 140, 380, 100, false, "#FF0000", "Lopes");
var Dalot = new player(20, "guest", 100, 140, 380, 100, false, "#FF0000", "Dalot");
var Sanches = new player(16, "guest", 100, 140, 380, 100, false, "#FF0000", "Sanches");
var Neves = new player(18, "guest", 100, 140, 380, 100, false, "#FF0000", "Neves");

var assistantTop = new assistant(100, canvas.width / 2, 0.5);
var assistantBot = new assistant(100, canvas.width / 2, canvas.height-0.5);

var activePlayers = [Neuer, Ruediger, Hummels, Ginter, Gosens, Kroos, Guendogan, Kimmich, Harvertz, Mueller, Gnabry, Patricio, Semedo, Pepe, Dias, Guerreiro, Pereira, Silva, Fernandes, Carvalho, Jota, Ronaldo];
var activeH = [Neuer, Ruediger, Hummels, Ginter, Gosens, Kroos, Guendogan, Kimmich, Harvertz, Mueller, Gnabry];
var activeG = [Patricio, Semedo, Pepe, Dias, Guerreiro, Pereira, Silva, Fernandes, Carvalho, Jota, Ronaldo];
var substitutesH = [Halstenberg, Volland, Goretzka, Trapp, Werner];
var substitutesG = [Goncalves, Lopes, Dalot, Sanches, Neves];

function assistantMovement(assistant) {
  if(assistant.x > playball.x){
    assistant.x -= assistant.speed / 100;
  }
  if(assistant.x < playball.x){
    assistant.x += assistant.speed / 100;
  }
}

function fillActiveHome() {
  for (var i = 0; i < activeH.length; i++) {
    var hplayer = activeH[i].name;
    var el = document.createElement("option");
    el.textContent = hplayer;
    el.value = hplayer;
    homePlayerSelect.appendChild(el);
  };
}


function fillActiveGuest() {
  for (var i = 0; i < activeG.length; i++) {
    var gplayer = activeG[i].name;
    var el = document.createElement("option");
    el.textContent = gplayer;
    el.value = gplayer;
    guestPlayerSelect.appendChild(el);
  };
}


function fillSubHome() {
  for (var i = 0; i < substitutesH.length; i++) {
    var shplayer = substitutesH[i].name;
    var el = document.createElement("option");
    el.textContent = shplayer;
    el.value = shplayer;
    subListH.appendChild(el);
  };
}


function fillSubGuest() {
  for (var i = 0; i < substitutesG.length; i++) {
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
  return [x, y];
}



canvas.addEventListener("mousedown", function (e) {
  mousePos = getMousePosition(canvas, e);
  ficken();
});

function assistantAnimation() {
  assistantMovement(assistantTop);
  assistantMovement(assistantBot);
  redraw();
  requestAnimationFrame(assistantAnimation);
}

function playerAnimation() {
  for (var i = 0; i < activeH.length; i++) {
    if (playerMovement(activeH[i])) {
      return;
    }
  };
  for (var i = 0; i < activeG.length; i++) {
    if (playerMovement(activeG[i])) {
      return;
    }
  };
  redraw();
  requestAnimationFrame(playerAnimation);
}

function reset() {
  activePlayers.forEach(element => {
    element.x = element.startingX;
    element.y = element.startingY;
  });
  playball.x = canvas.width / 2;
  playball.y = canvas.height / 2;
  deviatedBool = false;
  assistantBot.x
  redraw();
}

function distanceToBall(player, ball) {
  var distance = Math.sqrt((ball.x - player.x) ** 2 + (ball.y - player.y) ** 2);
  return distance;
}


function playerMovement(player) {
  var distance = Math.sqrt((playball.x - player.x) ** 2 + (playball.y - player.y) ** 2);
  if (distance <= 240) {
    var vector = [((playball.x - player.x) / distance), ((playball.y - player.y) / distance)];
    player.x += vector[0] * (player.speed/100);
    player.y += vector[1] * (player.speed/100);
    if (distance <= 2) {
      player.possession = true;
      goalScored = false;
      possession.innerHTML = player.name;
      return true;
    }
  } else {
    var distance = Math.sqrt((player.startingX - player.x) ** 2 + (player.startingY - player.y) ** 2);
    if (distance >= 2) {
      var vector = [((player.startingX - player.x) / distance), ((player.startingY - player.y) / distance)];
      player.x += vector[0] * (player.speed/100);
      player.y += vector[1] * (player.speed/100);
    }
  }
}

function ballAnimation() {
  for (var i = 0; i < activeH.length; i++) {
    if (activeH[i].possession == true) {
      if(!deviatedBool){
        deviatedPos = ballDeviation(activeH[i], mousePos);
        deviatedBool = true;        
      }

      if (ballMovement(activeH[i], deviatedPos)) {
        return;
      }

    }
  };

  for (var i = 0; i < activeG.length; i++) {
    if (activeG[i].possession == true) {
      if(!deviatedBool){
        deviatedPos = ballDeviation(activeG[i], mousePos);
        deviatedBool = true;        
      }
      if (ballMovement(activeG[i], deviatedPos)) {
        return;
      }


    };
  }
  requestAnimationFrame(ballAnimation);
}


function ballMovement(player) {
  var distance = Math.sqrt((deviatedPos[0] - playball.x) ** 2 + (deviatedPos[1] - playball.y) ** 2);
  var vector = [((deviatedPos[0] - playball.x) / distance), ((deviatedPos[1] - playball.y) / distance)];
  playball.x += vector[0] * (0.1 + distance / 40);
  playball.y += vector[1] * (0.1 + distance / 40);
  redraw();

   if(playball.x < 1 && (canvas.height / 2) - 21 >= playball.y <= (canvas.height / 2) + 21 && !goalScored){
    goalsGuest++;
    document.getElementById("guestGoals").innerHTML = goalsGuest;
    reset();
    return true;
  } else if(playball.x > canvas.width - 1 && (canvas.height / 2) - 21 >= playball.y <= (canvas.height / 2) + 21 && !goalScored){
    goalsHome++;
    document.getElementById("homeGoals").innerHTML = goalsHome;
    reset();
    return true;
  }

  if (distance <= 1) {
    player.possession = false;
    deviatedBool = false;
    return true;
  }
}

function ballDeviation(player, mousePos){
    var distance = Math.sqrt((mousePos[0]-playball.x)**2+(mousePos[1]-playball.y)**2),
    maxDeviation = (distance / 1.5) * (1-player.accuracy/100),
    posXrange = [mousePos[0] - maxDeviation/2, mousePos[0] + maxDeviation/2],
    posYrange = [mousePos[1] - maxDeviation/2, mousePos[1] + maxDeviation/2],
    randomX = (Math.random() * (posXrange[1] - posXrange[0]) + posXrange[0]).toFixed(4),
    randomY = (Math.random() * (posYrange[1] - posYrange[0]) + posYrange[0]).toFixed(4),
    deviatedPos = [randomX, randomY];

    return deviatedPos;
}

function ficken() {
  if (phase == 0) {
    playerAnimation();
    assistantAnimation();
    phase += 1;
  } else {
    ballAnimation();
    phase += 1;
  }

  phase = phase % 2;

}
(function () {

  field.draw(ctx);
  playball.draw(ctx);
  activePlayers.forEach(element => { element.draw(ctx); });
  assistantTop.draw(ctx);
  assistantBot.draw(ctx);

})();

