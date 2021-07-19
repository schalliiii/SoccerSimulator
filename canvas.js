var canvas = document.getElementById('pitch'), ctx = canvas.getContext('2d'), homePlayerSelect = document.getElementById('selectHomePlayer'), guestPlayerSelect = document.getElementById('selectGuestPlayer'), formsH = document.getElementById("formsH"), formsG = document.getElementById("formsG"), selectHomeSub = document.getElementById("selectHomeSub"), selectGuestSub = document.getElementById("selectGuestSub"), subListH = document.getElementById("selectHomeSub"), subListG = document.getElementById("selectGuestSub"), confirmSubH = document.getElementById("confirmSubH"), confirmSubG = document.getElementById("confirmSubG"), speedMinH = document.getElementById("speedMinH"), speedMaxH = document.getElementById("speedMaxH"), speedMinG = document.getElementById("speedMinG"), speedMaxG = document.getElementById("speedMaxG"), accuracyMinH = document.getElementById("accuracyMinH"), accuracyMaxH = document.getElementById("accuracyMaxH"), accuracyMinG = document.getElementById("accuracyMinG"), accuracyMaxG = document.getElementById("accuracyMaxG"), trickotH = document.getElementById("trickotColorH"), trickotG = document.getElementById("trickotColorG"), possession = document.getElementById("possession"); // HTML Elements
var phase = true, //Phase ( Ball or Players Move )
mousePos, // Mouse Position after click
deviatedBool = false, deviatedPos, // Coordinates with accuracy of player
goalsHome = 0, // variable counter for goals (used for scoreboard)
goalsGuest = 0, goalScored = false; // variable to decide if a goal is scored => rest player positions
formsH.style.display = "none";
formsG.style.display = "none";
selectHomeSub.style.display = "none";
selectGuestSub.style.display = "none";
confirmSubH.style.display = "none";
confirmSubG.style.display = "none"; // hide elements (confirm button etc)
var player = /** @class */ (function () {
    function player(number, team, speed, startingX, startingY, accuracy, possession, trickotColor, name) {
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
    player.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.trickotColor;
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, false);
        ctx.font = '8pt Calibri';
        ctx.stroke();
        ctx.textAlign = "center"; //positions number in middle of circle
        ctx.fillText(this.number, this.x, this.y);
        ctx.closePath();
    };
    return player;
}());
var ball = /** @class */ (function () {
    function ball() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
    }
    ball.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#FFFF00";
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.closePath();
    };
    return ball;
}());
var referee = /** @class */ (function () {
    function referee(speed, startingX, startingY) {
        this.speed = speed;
        this.x = startingX;
        this.y = startingY;
    }
    referee.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "#42f5e9";
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.closePath();
    };
    return referee;
}());
var assistant = /** @class */ (function () {
    function assistant(speed, startingX, startingY) {
        this.speed = speed;
        this.startingX = startingX;
        this.startingY = startingY;
        this.x = startingX;
        this.y = startingY;
    }
    assistant.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "#42f5e9";
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.closePath();
    };
    return assistant;
}());
var pitch = /** @class */ (function () {
    function pitch() {
    }
    pitch.prototype.draw = function (ctx) {
        // Outer lines
        ctx.beginPath(); //begin to draw
        ctx.rect(0, 0, canvas.width, canvas.height); //draw rectangle
        ctx.fillStyle = "#060"; //set fill color (green)
        ctx.fill(); //fill the element
        ctx.lineWidth = 1; //width of drawn line
        ctx.strokeStyle = "#FFF"; //set color to white
        ctx.stroke(); //draw
        ctx.closePath(); //stop drawing
        ctx.fillStyle = "#FFF";
        // Mid line
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0); //move "drawer" to starting position
        ctx.lineTo(canvas.width / 2, canvas.height); //create line to this position
        ctx.stroke(); //draw the line
        ctx.closePath();
        //Mid circle
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 73, 0, 2 * (Math.PI), false); //draw full circle
        ctx.stroke(); //execute drawing
        ctx.closePath();
        //Mid point
        ctx.beginPath(); //analog
        ctx.arc(canvas.width / 2, canvas.height / 2, 2, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
        //Home penalty box
        ctx.beginPath(); //analog
        ctx.rect(0, (canvas.height - 322) / 2, 132, 322);
        ctx.stroke();
        ctx.closePath();
        //Home goal box
        ctx.beginPath(); //analog
        ctx.rect(0, (canvas.height - 146) / 2, 44, 146);
        ctx.stroke();
        ctx.closePath();
        //Home goal  //anlog
        ctx.beginPath();
        ctx.moveTo(1, (canvas.height / 2) - 22);
        ctx.lineTo(1, (canvas.height / 2) + 22);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        ctx.lineWidth = 1;
        //Home penalty point  //analog
        ctx.beginPath();
        ctx.arc(88, canvas.height / 2, 1, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.closePath();
        //Home half circle
        ctx.beginPath();
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
        ctx.beginPath();
        ctx.arc(canvas.width - 88, canvas.height / 2, 1, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.closePath();
        //Away half circle
        ctx.beginPath();
        ctx.arc(canvas.width - 88, canvas.height / 2, 73, 0.71 * Math.PI, 1.29 * Math.PI, false);
        ctx.stroke();
        ctx.closePath();
        //Home L corner
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, 0.5 * Math.PI, false);
        ctx.stroke();
        ctx.closePath();
        //Home R corner
        ctx.beginPath();
        ctx.arc(0, canvas.height, 8, 0, 2 * Math.PI, true);
        ctx.stroke();
        ctx.closePath();
        //Away R corner
        ctx.beginPath();
        ctx.arc(canvas.width, 0, 8, 0.5 * Math.PI, 1 * Math.PI, false);
        ctx.stroke();
        ctx.closePath();
        //Away L corner
        ctx.beginPath();
        ctx.arc(canvas.width, canvas.height, 8, 1 * Math.PI, 1.5 * Math.PI, false);
        ctx.stroke();
        ctx.closePath();
    };
    return pitch;
}());
var field = new pitch(); //create a pitch
var playball = new ball(); //create the ball
var Neuer = new player(1, "home", 150, 40, canvas.height / 2, 100, false, "#0047AB", "Neuer"); //create player
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
var assistantBot = new assistant(100, canvas.width / 2, canvas.height - 0.5);
var ref = new referee(80, canvas.width / 20 + 80, canvas.height / 2 + 80);
var activePlayers = [Neuer, Ruediger, Hummels, Ginter, Gosens, Kroos, Guendogan, Kimmich, Harvertz, Mueller, Gnabry, Patricio, Semedo, Pepe, Dias, Guerreiro, Pereira, Silva, Fernandes, Carvalho, Jota, Ronaldo]; //save all players that are currently playing
var activeH = [Neuer, Ruediger, Hummels, Ginter, Gosens, Kroos, Guendogan, Kimmich, Harvertz, Mueller, Gnabry]; //active home players
var activeG = [Patricio, Semedo, Pepe, Dias, Guerreiro, Pereira, Silva, Fernandes, Carvalho, Jota, Ronaldo]; //active guest players
var substitutesH = [Halstenberg, Volland, Goretzka, Trapp, Werner]; //subs of home team
var substitutesG = [Goncalves, Lopes, Dalot, Sanches, Neves]; //subs of guest team
function fillActiveHome() {
    for (var i = 0; i < activeH.length; i++) { //iterate over array
        var hplayer = activeH[i].name; //save name of player
        var el = document.createElement("option"); //new option in select box
        el.textContent = hplayer;
        el.value = hplayer;
        homePlayerSelect.appendChild(el); //add option
    }
    ;
}
function fillActiveGuest() {
    for (var i = 0; i < activeG.length; i++) {
        var gplayer = activeG[i].name;
        var el = document.createElement("option");
        el.textContent = gplayer;
        el.value = gplayer;
        guestPlayerSelect.appendChild(el);
    }
    ;
}
function fillSubHome() {
    for (var i = 0; i < substitutesH.length; i++) {
        var shplayer = substitutesH[i].name;
        var el = document.createElement("option");
        el.textContent = shplayer;
        el.value = shplayer;
        subListH.appendChild(el);
    }
    ;
}
function fillSubGuest() {
    for (var i = 0; i < substitutesG.length; i++) {
        var sgplayer = substitutesG[i].name;
        var el = document.createElement("option");
        el.textContent = sgplayer;
        el.value = sgplayer;
        subListG.appendChild(el);
    }
    ;
}
fillActiveHome(); //initialize lists
fillActiveGuest();
fillSubHome();
fillSubGuest();
function changeTrickotH() {
    var players = activeH.concat(substitutesH);
    for (var i = 0; i < players.length; i++) { //iterate over all home team players
        switch (trickotH.value) { //decide what color gets set
            case "Black":
                players[i].trickotColor = "#000000"; //set color to black
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
    redraw(); //redraw the field and players
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
function showHomeSub() {
    selectHomeSub.style.display = "block"; //displays select box for substitutes 
    confirmSubH.style.display = "block"; //displays confirm button
}
function showGuestSub() {
    selectGuestSub.style.display = "block";
    confirmSubG.style.display = "block";
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
}
function cancelAttributesG() {
    formsG.style.display = "none";
}
function randomNumber(min, max) {
    var a = Math.floor(min);
    var b = Math.floor(max);
    var c;
    if (a > b) {
        c = b;
        b = a;
        a = c;
    }
    return Math.floor(Math.random() * (b - a)) + a;
}
function confirmAttributesH() {
    var speedMin = speedMinH.value; //selected speed value
    var speedMax = speedMaxH.value; //selected speed value
    if (speedMin < 0) {
        speedMin = 0;
    }
    var accuracyMax = accuracyMaxH.value; //selected accuracy value
    var accuracyMin = accuracyMinH.value; //selected accuracy value
    if (accuracyMax > 100) {
        accuracyMax = 100;
    }
    if (accuracyMin < 0) {
        accuracyMin = 0;
    }
    var homePlayer;
    var speed = randomNumber(speedMin, speedMax); //calculate random number between min and max
    var accuracy = randomNumber(accuracyMin, accuracyMax); //calculate random number between min and max
    for (var i = 0; i < activeH.length; i++) { //get selected player
        if (activeH[i].name == homePlayerSelect.value) {
            homePlayer = activeH[i]; //set selected player
        }
    }
    homePlayer.speed = speed; //set speed 
    homePlayer.accuracy = accuracy;
    formsH.style.display = "none"; //hide buttons
}
function confirmAttributesG() {
    var speedMin = speedMinG.value; //selected speed value
    var speedMax = speedMaxG.value; //selected speed value
    if (speedMin < 0) {
        speedMin = 0;
    }
    var accuracyMin = accuracyMinG.value; //selected accuracy value
    var accuracyMax = accuracyMaxG.value; //selected accuracy value
    if (accuracyMax > 100) {
        accuracyMax = 100;
    }
    if (accuracyMin < 0) {
        accuracyMin = 0;
    }
    var accuracy = randomNumber(accuracyMin, accuracyMax); //calculate random number between min and max
    var guestPlayer;
    var speed = randomNumber(speedMin, speedMax); //calculate random number between min and max
    console.log(accuracy);
    console.log(speed);
    for (var i = 0; i < activeG.length; i++) {
        if (activeG[i].name == guestPlayerSelect.value) {
            guestPlayer = activeG[i];
        }
    }
    guestPlayer.accuracy = accuracy;
    guestPlayer.speed = speed;
    formsG.style.display = "none";
}
function changeAttributesH() {
    var name = homePlayerSelect.value; //get selected players name
    var player; // variable for object
    for (var i = 0; i < activeH.length; i++) {
        if (activeH[i].name == name) {
            player = activeH[i]; //set selected player
        }
    }
    formsH.style.display = "block"; //show the slides
}
function changeAttributesG() {
    var name = guestPlayerSelect.value;
    var player;
    for (var i = 0; i < activeH.length; i++) {
        if (activeG[i].name == name) {
            player = activeG[i];
        }
    }
    formsG.style.display = "block";
}
function confirmSubHome() {
    var e = homePlayerSelect.value; //saves the name of selected player
    var f = selectHomeSub.value; //saves the name of selected sub
    var x;
    var y;
    for (var i = 0; i < activeH.length; i++) { //iterate over all active players
        if (activeH[i].name == e) { //check if name equals selected players name
            substitutesH.push(activeH[i]); //add selected player to substitutes
            x = activeH[i].x; //saves x coordinate from active player
            y = activeH[i].y; //saves y coordinate from active player
            activeH.splice(i, 1); //remove selected player from active players
            for (var k = 0; k < activePlayers.length; k++) {
                if (activePlayers[k].name == e) {
                    activePlayers.splice(k, 1);
                }
            }
        }
    }
    for (var i = 0; i < substitutesH.length; i++) { //iterates over all substitutes 
        if (substitutesH[i].name == f) { //check if names equals selected substitutes
            substitutesH[i].x = x; //set x coordinate to x coordinate of selected active player
            substitutesH[i].y = y;
            activeH.push(substitutesH[i]); //add player to active home players
            activePlayers.push(substitutesH[i]); //add player to active players
            substitutesH.splice(i, 1); //remove player from substitutes list
        }
    }
    emptySelect(homePlayerSelect); //removes all elements from select box
    emptySelect(selectHomeSub);
    fillActiveHome(); //adds all allements to select box
    fillSubHome();
    redraw();
    confirmSubH.style.display = "none"; //hides select box and buttons
    selectHomeSub.style.display = "none";
}
function confirmSubGuest() {
    var e = guestPlayerSelect.value;
    var f = selectGuestSub.value;
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
function redraw() {
    ctx.clearRect(0, 0, innerWidth, innerHeight); //clears everything
    field.draw(ctx); //draws new field
    playball.draw(ctx); //draws the ball
    activePlayers.forEach(function (element) { element.draw(ctx); }); //draws all players
    assistantTop.draw(ctx); //draws the assistants
    assistantBot.draw(ctx);
    ref.draw(ctx); //draw referee
}
function emptySelect(box) {
    var length = box.options.length;
    for (var i = length - 1; i >= 0; i--) {
        box.options[i] = null;
    }
}
function assistantMovement(assistant) {
    if (assistant.x > playball.x) { //check wheter assistant is to the right of the ball
        assistant.x -= assistant.speed / 100; // if so: move him to the left (towards the ball)
    }
    if (assistant.x < playball.x) { //check wheter assistant is to the left of the ball
        assistant.x += assistant.speed / 100; //if so: move him to the right (towards the ball)
    }
    //no need to check for y coordinates -- assistants cant move up and down
}
function refereeMovement(ref) {
    if (ref.x > playball.x + 80) { //check wheter assistant is to the right of the ball
        ref.x -= ref.speed / 100; // if so: move him to the left (towards the ball)
    }
    if (ref.y > playball.y + 80) { //check wheter the referee is beneath the ball
        ref.y -= ref.speed / 100; //if so: move him up (towards the ball)
    }
    if (ref.x < playball.x - 80) { //check wheter assistant is to the left of the ball
        ref.x += ref.speed / 100; //if so: move him to the right (towards the ball)
    }
    if (ref.y < playball.y - 80) { //check wheter the referee is above the ball
        ref.y += ref.speed / 100; //if so: move him down (towards the ball)
    }
}
function getMousePosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return [x, y];
}
canvas.addEventListener("mousedown", function (e) {
    mousePos = getMousePosition(canvas, e); //save mouse coordinates
    play(); //call main function
});
function assistantAnimation() {
    assistantMovement(assistantTop); //update position
    assistantMovement(assistantBot);
    redraw(); //redraw to show new positions
    requestAnimationFrame(assistantAnimation); //recursive call
}
function refereeAnimation() {
    refereeMovement(ref);
    redraw();
    requestAnimationFrame(refereeAnimation);
}
function playerAnimation() {
    for (var i = 0; i < activePlayers.length; i++) { //checks every active player
        if (playerMovement(activePlayers[i])) { //check if the player we are currently looking at has reached the ball
            return; //if so: return to exit the function => cancels movements of all players -- note: here only the positions of the players are updated, they are not animated yet
        }
    }
    ;
    redraw(); //delete the whole picture and draw it new, this time with the elements at their new position
    requestAnimationFrame(playerAnimation); //method tells the browser that we wish to perform an animation => this is where the animation happens
}
function playerMovement(player) {
    var distance = Math.abs((playball.x - player.x) + (playball.y - player.y)); //distance to ball
    if (distance <= 240) { //canvas field is 8 times bigger than real live field => radius of 30 times 8 cause realtion of real field to canvas is 1/8
        var vector = [((playball.x - player.x) / distance), ((playball.y - player.y) / distance)]; //vector for movement
        player.x += vector[0] * (player.speed / 100); //update x position of player
        player.y += vector[1] * (player.speed / 100); //update y position of player
        if (distance <= 2) { //check if player has reached the ball
            player.possession = true; //player now is in possession of ball
            goalScored = false; // set variable to false cause no goal is scored
            possession.innerHTML = player.name; //update name in possession html element
            return true; // return true because now a player is in possession of the ball
        }
    }
    else {
        var distance_1 = Math.abs((player.startingX - player.x) + (player.startingY - player.y));
        if (distance_1 >= 2) {
            var vector = [((player.startingX - player.x) / distance_1), ((player.startingY - player.y) / distance_1)];
            player.x += vector[0] * (player.speed / 100);
            player.y += vector[1] * (player.speed / 100);
        }
    }
}
function ballAnimation() {
    for (var i = 0; i < activeH.length; i++) { //check all home players that are currently playing
        if (activeH[i].possession == true) { //check if the player we are looking at is in possession of the ball
            if (!deviatedBool) { // check if a goal was scored in the previous action -- if so: the deviatedPos variable has to be calculated again, because the players have changed positions and the possession will change
                deviatedPos = ballDeviation(activeH[i], mousePos); // calculate new deviatedPos
                deviatedBool = true; //set variable to true, so the if condition will only be true when another goal gets scored
            }
            if (ballMovement(activeH[i])) { //check if ball has reached the position it should go to
                return; //exit the function to stop further animations
            }
        }
    }
    ;
    for (var i = 0; i < activeG.length; i++) { //same for away players
        if (activeG[i].possession == true) {
            if (!deviatedBool) {
                deviatedPos = ballDeviation(activeG[i], mousePos);
                deviatedBool = true;
            }
            if (ballMovement(activeG[i])) {
                return;
            }
        }
        ;
    }
    requestAnimationFrame(ballAnimation); //recursive call -- does the actual animation
}
function ballMovement(player) {
    var distance = Math.abs((deviatedPos[0] - playball.x) + (deviatedPos[1] - playball.y)); //check distance of ball to its desired position
    var vector = [((deviatedPos[0] - playball.x) / distance), ((deviatedPos[1] - playball.y) / distance)]; //calculate vector for movement
    var bool1 = (canvas.height / 2) - 21 <= playball.y; //check if ball has crossed the goal line
    var bool2 = playball.y <= (canvas.height / 2) + 21;
    var bool3 = (canvas.height / 2) - 21 <= playball.y;
    var bool4 = playball.y <= (canvas.height / 2) + 21;
    playball.x += vector[0] * (0.1 + distance / 40); //calculate new position of ball
    playball.y += vector[1] * (0.1 + distance / 40);
    redraw();
    if (playball.x < 1 && bool1 && bool2 && !goalScored) {
        goalsGuest++;
        document.getElementById("guestGoals").innerHTML = "" + goalsGuest;
        reset();
        return true;
    }
    else if (playball.x > canvas.width - 1 && bool3 && bool4 && !goalScored) {
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
function ballDeviation(player, mousePos) {
    var distance = Math.abs((mousePos[0] - playball.x) + (mousePos[1] - playball.y)), //calcuate distance
    maxDeviation = (distance / 1.5) * (1 - player.accuracy / 100), //calculate max deviation
    posXrange = [mousePos[0] - maxDeviation / 2, mousePos[0] + maxDeviation / 2], //calculate possible x values
    posYrange = [mousePos[1] - maxDeviation / 2, mousePos[1] + maxDeviation / 2], //calculate possible y values
    randomX = (Math.random() * (posXrange[1] - posXrange[0]) + posXrange[0]).toFixed(4), //calculate random position within this range
    randomY = (Math.random() * (posYrange[1] - posYrange[0]) + posYrange[0]).toFixed(4), deviatedPos = [randomX, randomY]; //array with final x and y value
    return deviatedPos; //return position where ball will end up
}
function reset() {
    activePlayers.forEach(function (element) {
        element.x = element.startingX;
        element.y = element.startingY;
    });
    playball.x = canvas.width / 2;
    playball.y = canvas.height / 2;
    deviatedBool = false;
    redraw();
}
function play() {
    if (phase) { //check if players should move or ball should move
        playerAnimation(); //move players with animation
        assistantAnimation();
        refereeAnimation();
        phase = false; //add +1 to phase so next time ball moves
    }
    else {
        ballAnimation(); // move ball with animation
        phase = true;
    }
}
(function () {
    field.draw(ctx);
    playball.draw(ctx);
    activePlayers.forEach(function (element) { element.draw(ctx); });
    assistantTop.draw(ctx);
    assistantBot.draw(ctx);
    ref.draw(ctx);
})();
