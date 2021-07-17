const canvas = <HTMLCanvasElement> document.getElementById('pitch');
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
const homePlayerSelect = <any>document.getElementById('selectHomePlayer');
const guestPlayerSelect= <any>document.getElementById('selectGuestPlayer');
const formsH = <HTMLElement>document.getElementById("formsH");
const formsG = <HTMLElement>document.getElementById("formsG");
const selectHomeSub = <HTMLInputElement>document.getElementById("selectHomeSub");
const selectGuestSub = <HTMLInputElement>document.getElementById("selectGuestSub");
const subListH = <HTMLInputElement>document.getElementById("selectHomeSub");
const subListG = <HTMLInputElement>document.getElementById("selectGuestSub");
const confirmSubH = <HTMLElement>document.getElementById("confirmSubH");
const confirmSubG = <HTMLElement>document.getElementById("confirmSubG");
const speedH = <any>document.getElementById("speedSlideH");
const speedG = <any>document.getElementById("speedSlideG");
const accuracyH = <any>document.getElementById("accuracySlideH");
const accuracyG = <any>document.getElementById("accuracySlideG");
const trickotH = <HTMLInputElement>document.getElementById("trickotColorH");
const trickotG = <HTMLInputElement>document.getElementById("trickotColorG");
const possession = <HTMLElement>document.getElementById("possession");
let phase: number = 0;
let mousePos: Array<number>;
let deviatedBool: boolean = false;
let deviatedPos: Array<number>;
let goalsHome: number = 0;
let goalsGuest: number = 0;
let goalScored: boolean = false;
let canvasHeight: number = canvas.height;


formsH.style.display = "none";
formsG.style.display = "none";
selectHomeSub.style.display = "none";
selectGuestSub.style.display = "none";
confirmSubH.style.display = "none";
confirmSubG.style.display = "none";

function changeTrickotH(): void {

  let players: Array<any> = activeH.concat(substitutesH);
  for (let i = 0; i < players.length; i++) {
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

function changeTrickotG(): void{

  let players: Array<any> = activeG.concat(substitutesG);
  for (let i = 0; i < players.length; i++) {
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

function cancelSubHome(): void {
  confirmSubH.style.display = "none";
  subListH.style.display = "none";
}

function cancelSubGuest():void {
  confirmSubG.style.display = "none";
  subListG.style.display = "none";
}

function cancelAttributesH():void {
  formsH.style.display = "none";
  speedH.value = 0;
  accuracyH.value = 0;
}

function cancelAttributesG(): void {
  formsG.style.display = "none";
  speedG.value = 0;
  accuracyG.value = 0;
}

function confirmAttributesH():void {
  let speed = speedH.value;
  let accuracy = accuracyH.value;
  let homePlayer;
  for (let i = 0; i < activeH.length; i++) {
    if (activeH[i].name == homePlayerSelect.value) {
      homePlayer = activeH[i];
    }
  }
  homePlayer.speed = parseInt(speed);
  homePlayer.accuracy = parseInt(accuracy);
  formsH.style.display = "none";
}

function confirmAttributesG():void {
  let speed = speedG.value;
  let accuracy = accuracyG.value;
  let guestPlayer;
  for (let i = 0; i < activeG.length; i++) {
    if (activeG[i].name == guestPlayerSelect.value) {
      guestPlayer = activeG[i];
    }
  }
  guestPlayer.accuracy = parseInt(accuracy);
  guestPlayer.speed = parseInt(speed);
  formsG.style.display = "none";
}

function changeAttributesH():void {
  let name = homePlayerSelect.value;
  let player;
  for (let i = 0; i < activeH.length; i++) {
    if (activeH[i].name == name) {
      player = activeH[i];
    }
  }
  accuracyH.value = player.accuracy;
  speedH.value = player.speed;
  formsH.style.display = "block";
}

function changeAttributesG():void {
  let name = guestPlayerSelect.value;
  let player;
  for (let i = 0; i < activeH.length; i++) {
    if (activeG[i].name == name) {
      player = activeG[i];
    }
  }
  accuracyG.value = player.accuracy;
  speedG.value = player.speed;
  formsG.style.display = "block";
}

function redraw():void {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  field.draw(ctx);
  playball.draw(ctx);
  activePlayers.forEach(element => { element.draw(ctx); });
  assistantTop.draw(ctx);
  assistantBot.draw(ctx);
  ref.draw(ctx);
}

function emptySelect(box):void {
  let length = box.options.length;
  for (let i = length - 1; i >= 0; i--) {
    box.options[i] = null;
  }
}

function showHomeSub():void {
  selectHomeSub.style.display = "block";
  confirmSubH.style.display = "block";
}

function showGuestSub():void {
  selectGuestSub.style.display = "block";
  confirmSubG.style.display = "block";
}

function confirmSubHome():void {
  let e: any = homePlayerSelect.value;
  let f: any = selectHomeSub.value;
  let x: number;
  let y: number;
  for (let i = 0; i < activeH.length; i++) {
    if (activeH[i].name == e) {
      substitutesH.push(activeH[i]);
      x = activeH[i].x;
      y = activeH[i].y;
      activeH.splice(i, 1);
      for (let k = 0; k < activePlayers.length; k++) {
        if (activePlayers[k].name == e) {
          activePlayers.splice(k, 1);
        }
      }
    }
  }
  for (let i = 0; i < substitutesH.length; i++) {
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

function confirmSubGuest(): void {
  let e: any = guestPlayerSelect.value;
  let f: any = selectGuestSub.value;
  let x: number;
  let y: number;
  for (let i = 0; i < activeG.length; i++) {
    if (activeG[i].name == e) {
      substitutesG.push(activeG[i]);
      x = activeG[i].x;
      y = activeG[i].y;
      activeG.splice(i, 1);
      for (let k = 0; k < activePlayers.length; k++) {
        if (activePlayers[k].name == e) {
          activePlayers.splice(k, 1);
        }
      }
    }
  }
  for (let i = 0; i < substitutesG.length; i++) {
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

  draw(ctx):void {
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
  number: number;
  team: string;
  speed: number;
  startingX: number;
  startingY: number;
  accuracy: number;
  x: number;
  y: number;
  possession: boolean;
  trickotColor: string;
  name: string;
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
  draw(ctx): void {
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
  x: number;
  y: number;
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
  }


  draw(ctx): void {
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
  speed: number;
  x: number;
  y: number;
  constructor(speed, startingX, startingY) {
    this.speed = speed;
    this.x = startingX;
    this.y = startingY;
  }

  draw(ctx): void {
    ctx.beginPath();
    ctx.strokeStyle = "#42f5e9";
    ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
    ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
  }
}

class assistant {
  speed: number;
  startingX: number;
  startingY: number;
  x: number;
  y: number;
  constructor(speed, startingX, startingY) {
    this.speed = speed;
    this.startingX = startingX;
    this.startingY = startingY;
    this.x = startingX;
    this.y = startingY;
  }

  draw(ctx): void {
    ctx.beginPath();
    ctx.strokeStyle = "#42f5e9";
    ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
    ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
  }

}
let field = new pitch();
let playball = new ball();
let Neuer = new player(1, "home", 150, 40, canvas.height/2, 100, false, "#0047AB", "Neuer");
let Ruediger = new player(2, "home", 150, 190, 260, 100, false, "#0047AB", "Ruediger");
let Hummels = new player(5, "home", 150, 260, 60, 100, false, "#0047AB", "Hummels");
let Ginter = new player(4, "home", 150, 285, 250, 100, false, "#0047AB", "Ginter");
let Gosens = new player(20, "home", 150, 280, 440, 100, false, "#0047AB", "Gosens");
let Kroos = new player(8, "home", 150, 500, 120, 100, false, "#0047AB", "Kroos");
let Guendogan = new player(21, "home", 150, 530, 460, 100, false, "#0047AB", "Guendogan");
let Kimmich = new player(6, "home", 150, 660, 85, 100, false, "#0047AB", "Kimmich");
let Harvertz = new player(7, "home", 150, 610, 260, 100, false, "#0047AB", "Harvertz");
let Mueller = new player(25, "home", 150, 710, 180, 100, false, "#0047AB", "Mueller");
let Gnabry = new player(10, "home", 150, canvas.width / 2 + 10, canvas.height / 2 + 10, 100, false, "#0047AB", "Gnabry");
let Halstenberg = new player(3, "home", 100, canvas.width / 2 + 10, canvas.height / 2 + 10, 100, false, "#0047AB", "Halstenberg");
let Volland = new player(9, "home", 100, canvas.width / 2 + 10, canvas.height / 2 + 10, 100, false, "#0047AB", "Volland");
let Goretzka = new player(18, "home", 100, canvas.width / 2 + 10, canvas.height / 2 + 10, 100, false, "#0047AB", "Goretzka");
let Trapp = new player(22, "home", 100, canvas.width / 2 + 10, canvas.height / 2 + 10, 100, false, "#0047AB", "Trapp");
let Werner = new player(11, "home", 100, canvas.width / 2 + 10, canvas.height / 2 + 10, 100, false, "#0047AB", "Werner");
let Patricio = new player(1, "guest", 100, 760, 270, 100, false, "#FF0000", "Patricio");
let Semedo = new player(2, "guest", 100, 650, 75, 100, false, "#FF0000", "Semedo");
let Pepe = new player(3, "guest", 100, 625, 270, 100, false, "#FF0000", "Pepe");
let Dias = new player(4, "guest", 100, 630, 425, 100, false, "#FF0000", "Dias");
let Guerreiro = new player(5, "guest", 100, 480, 90, 100, false, "#FF0000", "Guerreiro");
let Pereira = new player(13, "guest", 100, 390, 405, 100, false, "#FF0000", "Pereira");
let Silva = new player(10, "guest", 100, 315, 85, 100, false, "#FF0000", "Silva");
let Fernandes = new player(11, "guest", 100, 250, 260, 100, false, "#FF0000", "Fernandes");
let Carvalho = new player(14, "guest", 100, 480, 280, 100, false, "#FF0000", "Carvalho");
let Jota = new player(21, "guest", 100, 140, 130, 100, false, "#FF0000", "Jota");
let Ronaldo = new player(7, "guest", 100, 140, 380, 100, false, "#FF0000", "Ronaldo");
let Goncalves = new player(19, "guest", 100, 140, 380, 100, false, "#FF0000", "Goncalves");
let Lopes = new player(12, "guest", 100, 140, 380, 100, false, "#FF0000", "Lopes");
let Dalot = new player(20, "guest", 100, 140, 380, 100, false, "#FF0000", "Dalot");
let Sanches = new player(16, "guest", 100, 140, 380, 100, false, "#FF0000", "Sanches");
let Neves = new player(18, "guest", 100, 140, 380, 100, false, "#FF0000", "Neves");

let assistantTop = new assistant(100, canvas.width / 2, 0.5);
let assistantBot = new assistant(100, canvas.width / 2, canvas.height-0.5);
let ref = new referee(80, canvas.width/20 + 80, canvas.height/2 + 80);

let activePlayers = [Neuer, Ruediger, Hummels, Ginter, Gosens, Kroos, Guendogan, Kimmich, Harvertz, Mueller, Gnabry, Patricio, Semedo, Pepe, Dias, Guerreiro, Pereira, Silva, Fernandes, Carvalho, Jota, Ronaldo];
let activeH = [Neuer, Ruediger, Hummels, Ginter, Gosens, Kroos, Guendogan, Kimmich, Harvertz, Mueller, Gnabry];
let activeG = [Patricio, Semedo, Pepe, Dias, Guerreiro, Pereira, Silva, Fernandes, Carvalho, Jota, Ronaldo];
let substitutesH = [Halstenberg, Volland, Goretzka, Trapp, Werner];
let substitutesG = [Goncalves, Lopes, Dalot, Sanches, Neves];

function assistantMovement(assistant): void {
  if(assistant.x > playball.x){
    assistant.x -= assistant.speed / 100;
  }
  if(assistant.x < playball.x){
    assistant.x += assistant.speed / 100;
  }
}

function refereeMovement(ref): void {

  if(ref.x > playball.x + 80){
    ref.x -= ref.speed / 100;
  }
  if(ref.y > playball.y + 80){
    ref.y -= ref.speed / 100;
  }
  if(ref.x < playball.x - 80){
    ref.x += ref.speed / 100;
  }
  if(ref.y < playball.y - 80){
    ref.y += ref.speed / 100;
  }
}

function fillActiveHome() : void {
  for (let i = 0; i < activeH.length; i++) {
    let hplayer = activeH[i].name;
    let el = document.createElement("option");
    el.textContent = hplayer;
    el.value = hplayer;
    homePlayerSelect.appendChild(el);
  };
}


function fillActiveGuest() : void{
  for (let i = 0; i < activeG.length; i++) {
    let gplayer = activeG[i].name;
    let el = document.createElement("option");
    el.textContent = gplayer;
    el.value = gplayer;
    guestPlayerSelect.appendChild(el);
  };
}


function fillSubHome() : void {
  for (let i = 0; i < substitutesH.length; i++) {
    let shplayer = substitutesH[i].name;
    let el = document.createElement("option");
    el.textContent = shplayer;
    el.value = shplayer;
    subListH.appendChild(el);
  };
}


function fillSubGuest() : void{
  for (let i = 0; i < substitutesG.length; i++) {
    let sgplayer = substitutesG[i].name;
    let el = document.createElement("option");
    el.textContent = sgplayer;
    el.value = sgplayer;
    subListG.appendChild(el);
  };
}
fillActiveHome();
fillActiveGuest();
fillSubHome();
fillSubGuest();



function getMousePosition(canvas, event): Array<number> {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  return [x, y];
}



canvas.addEventListener("mousedown", function (e) {
  mousePos = getMousePosition(canvas, e);
  play();
});

function assistantAnimation(): void {
  assistantMovement(assistantTop);
  assistantMovement(assistantBot);
  redraw();
  requestAnimationFrame(assistantAnimation);
}
function refereeAnimation(): void {
  refereeMovement(ref);
  redraw();
  requestAnimationFrame(refereeAnimation);
}

function playerAnimation(): void {
  for (let i = 0; i < activeH.length; i++) {
    if (playerMovement(activeH[i])) {
      return;
    }
  };
  for (let i = 0; i < activeG.length; i++) {
    if (playerMovement(activeG[i])) {
      return;
    }
  };
  redraw();
  requestAnimationFrame(playerAnimation);
}

function reset(): void {
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

function distanceToBall(player, ball): number {
  let distance = Math.sqrt((ball.x - player.x) ** 2 + (ball.y - player.y) ** 2);
  return distance;
}


function playerMovement(player): boolean {
  let distance = Math.sqrt((playball.x - player.x) ** 2 + (playball.y - player.y) ** 2);
  if (distance <= 240) {
    let vector = [((playball.x - player.x) / distance), ((playball.y - player.y) / distance)];
    player.x += vector[0] * (player.speed/100);
    player.y += vector[1] * (player.speed/100);
    if (distance <= 2) {
      player.possession = true;
      goalScored = false;
      possession.innerHTML = player.name;
      return true;
    }
  } else {
    let distance = Math.sqrt((player.startingX - player.x) ** 2 + (player.startingY - player.y) ** 2);
    if (distance >= 2) {
      let vector = [((player.startingX - player.x) / distance), ((player.startingY - player.y) / distance)];
      player.x += vector[0] * (player.speed/100);
      player.y += vector[1] * (player.speed/100);
    }
  }
}

function ballAnimation(): void {
  for (let i = 0; i < activeH.length; i++) {
    if (activeH[i].possession == true) {
      if(!deviatedBool){
        deviatedPos = ballDeviation(activeH[i], mousePos);
        deviatedBool = true;        
      }

      if (ballMovement(activeH[i])) {
        return;
      }

    }
  };

  for (let i = 0; i < activeG.length; i++) {
    if (activeG[i].possession == true) {
      if(!deviatedBool){
        deviatedPos = ballDeviation(activeG[i], mousePos);
        deviatedBool = true;        
      }
      if (ballMovement(activeG[i])) {
        return;
      }


    };
  }
  requestAnimationFrame(ballAnimation);
}


function ballMovement(player): boolean {
  let distance: number = Math.sqrt((deviatedPos[0] - playball.x) ** 2 + (deviatedPos[1] - playball.y) ** 2);
  let vector = [((deviatedPos[0] - playball.x) / distance), ((deviatedPos[1] - playball.y) / distance)];
  let bool1: boolean  = (canvas.height / 2) - 21 >= playball.y;
  let bool2: boolean = playball.y <= (canvas.height / 2) + 21;
  let bool3: boolean = playball.y <= 1;
  let bool4: boolean = playball.y >= canvas.height - 1;
  playball.x += vector[0] * (0.1 + distance / 40);
  playball.y += vector[1] * (0.1 + distance / 40);
  redraw();


   if(playball.x < 1 && bool1 && bool2 && !goalScored){
    goalsGuest++;
    document.getElementById("guestGoals").innerHTML = "" + goalsGuest;
    reset();
    return true;
  } else if(playball.x > canvas.width - 1 &&  bool1 && bool2 && !goalScored){
    goalsHome++;
    document.getElementById("homeGoals").innerHTML = "" + goalsHome;
    reset();
    return true;
  }

  if (distance <= 1) {
    player.possession = false;
    deviatedBool = false;
    return true;
  }
}

function ballDeviation(player, mousePos): Array<number>{
    let distance = Math.sqrt((mousePos[0]-playball.x)**2+(mousePos[1]-playball.y)**2),
    maxDeviation = (distance / 1.5) * (1-player.accuracy/100),
    posXrange = [mousePos[0] - maxDeviation/2, mousePos[0] + maxDeviation/2],
    posYrange = [mousePos[1] - maxDeviation/2, mousePos[1] + maxDeviation/2],
    randomX = (Math.random() * (posXrange[1] - posXrange[0]) + posXrange[0]).toFixed(4),
    randomY = (Math.random() * (posYrange[1] - posYrange[0]) + posYrange[0]).toFixed(4),
    deviatedPos = [randomX, randomY];

    return deviatedPos;
}

function play(): void {
  if (phase == 0) {
    playerAnimation();
    assistantAnimation();
    refereeAnimation();
    phase += 1;
  } else {
    ballAnimation();
    phase += 1;
  }

  phase = phase % 2;

}
(function (): void {

  field.draw(ctx);
  playball.draw(ctx);
  activePlayers.forEach(element => { element.draw(ctx); });
  assistantTop.draw(ctx);
  assistantBot.draw(ctx);
  ref.draw(ctx);

})();

