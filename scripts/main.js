

// use left and top for positioning, not bottom and right


let bombsInPlay = 0;
let bombs = {};     //example time: thisbomb

let monsters = {};
let players = [];

// let playerOneCooldowns = {};        //get rid of these two and put in player to make npcs use same logic
// let playerTwoCooldowns = {};        //get rid of these two and put in player to make npcs use same logic
let cooldownTime = 2;        //2 sec

let playerOneRow = 0;
let playerOneCol = 0;
let playerTwoRow = 0;
let playerTwoCol = 14;
let timer = 0;
// let playerWidth = parseInt($('.p1').css('width'));
let playerWidth = 40;   //I have to set this value now because chaning perspective results in small round errors

let rightEdge = 600;
let leftEdge = 0;
let bottomEdge = 600;
let topEdge = 0;
let step = playerWidth;

let timeLimit = 300000;


let colors = ['purple', 'orange', 'green', 'black'];
let controlOptions = ['up','right','down','left','dropbomb'];

// keep updating this list every movement to make quicker collision detection
let absoluteIllegalLocationsYAxis = {}
let absoluteIllegalLocationsXAxis = {}
let illegalLocationsXAxis = {};
let illegalLocationsYAxis = {};


let ObstaclePairs = {};         //example: '3,4': [3,4]
let PlayerLocationPairs = {};
let $gamebox = $('.gamebox');














//========================================================================================
// gamebox grid
// height 15
// width 15

function makeGrid(){
    for(let i = 0; i < 15; ++i){
        let $col = $("<div>",{
            height: '40px',
            class: `col${i}`,
        })
        $col.css("display", "inline-block");
        for(let j = 0; j < 15; ++j){
            let $cell = $("<div>",{
                class: `r${j}c${i}`,
                height: '40px',
                width: '40px',
                // display: 'inline-block',
            })
            // $cell.display = "inline-block"
            $col.append($cell);
        }
        $gamebox.append($col) 
    }
    
}
makeGrid()












// location is a pair of x,y coordinates for the game grid
let Bomb = function(location, timeDropped, playerThatDropped){
    this.playerThatDropped = playerThatDropped
    this.locationPair = location
    this.explodeTime = timeDropped+4;
    console.log(`creating bomb(${this.locationPair[0]},${this.locationPair[1]})`);
    console.log(`at time: ${timer}`)
    let $bomb = $('<div>',{
                class: 'game-bomb',
                id: `bomb(${this.locationPair[0]},${this.locationPair[1]})`,
                width: '40px',
                height: '40px',
            });
            let $ground = $('<div>',{
                class: 'game-ground',
            });
            let $homepage_bomb = $('<div>',{
                class: 'game-homepage-bomb',
            });
            let $fuse = $('<div>',{
                class: 'game-fuse',
            });
            let $spark = $('<div>',{
                class: 'game-spark',
            });
            let $triangle_upTriangle = $('<div>',{
                class: 'game-triangle game-upTriangle',
            });
            let $homepage_bomb_top = $('<div>',{
                class: 'game-homepage-bomb-top',
            });
            let $sphereshadow = $('<span>',{
                class: 'game-sphereshadow',
            });
            let $homepage_bomb_body_sphere = $('<div>',{
                class: 'game-homepage-bomb-body sphere',
            });
            

            // need to add to dom to manipulate location
            $('.gamebox').append($bomb);
            $bomb.append($ground);
            $ground.append($homepage_bomb);
            $homepage_bomb.append($fuse);
            $fuse.append($spark);
            $spark.append($triangle_upTriangle);
            $homepage_bomb.append($homepage_bomb_top);
            $homepage_bomb.append($sphereshadow);
            $homepage_bomb.append($homepage_bomb_body_sphere);
            ObstaclePairs[`${this.locationPair[0],this.locationPair[1]}`] = [this.locationPair[0],this.locationPair[1]];


            // must account for previous gameboard appendings
            let left = (this.locationPair[1]-(bombsInPlay))*40
            let top = (this.locationPair[0])*40
            $($bomb).css('left', `${left}px`);         //subtract pairs(sub, #ofballsLeft): (1,2), (2,1), (3,1)
            $($bomb).css('top', `${top}px`);
    this.domElement = $($bomb);
    playerThatDropped.bombs[this.explodeTime] = this;
    // bombsInPlay++;
}


















let removeObstacle = function(row,col){
    if(ObstaclePairs[`${row},${col}`] !== undefined){
        $(`#obstacler${row}c${col}`).remove();
        delete ObstaclePairs[`${row},${col}`];
    }
    if(PlayerLocationPairs[`${row},${col}`] !== undefined){
        // PlayerLocationPairs[`${row},${col}`].die();
        PlayerLocationPairs[`${row},${col}`][0].die();

        if(Object.keys(PlayerLocationPairs).length === 1){
            console.log(`${PlayerLocationPairs[Object.keys(PlayerLocationPairs)[0]][0].name} has won!!!!`);
            let $winBanner = $('<h3>',{
                class: 'Win-Banner',
            });
            $winBanner.text(`${PlayerLocationPairs[Object.keys(PlayerLocationPairs)[0]][0].name} has won!!!!`);
            $('h1').append($winBanner);
        }
    }
}











let playerKill = function(){

}










// leaves ghost divs sometimes?
Bomb.prototype.explode = function(){
    console.log('boom');
    console.log(`blowing up bomb(${this.locationPair[0]},${this.locationPair[1]})`);

    delete ObstaclePairs[this.locationPair[0],this.locationPair[1]];
    this.domElement.remove();


    for(let j = -2; j < 3; ++j){
        let rowLocation = this.locationPair[0]-j
        let $explodeCell = $('<div>',{
        id: `explosion-${rowLocation}-${this.locationPair[1]}`,
        class: 'explosion',
        });

        // destroy obstacles
        // is destroying more than what is required I wont use this
        // can possibly implement point system here
        removeObstacle(rowLocation, this.locationPair[1]);

        // need to add to dom to manipulate location
        $('.gamebox').append($explodeCell);
        $explodeCell = $(`#explosion-${rowLocation}-${this.locationPair[1]}`);
        $explodeCell.css('left', `${(this.locationPair[1])*40}px`);
        $explodeCell.css('top', `${rowLocation*40}px`);
        $explodeCell.text('x');
        setTimeout(function(){
            $explodeCell.remove();
            
        },1000);  //delay clear for a second
        
    }
    for(let j = -2; j < 3; ++j){
        let colLocation = this.locationPair[1]+j
        let $explodeCell = $('<div>',{
        id: `explosion-${this.locationPair[0]}-${colLocation}`,
        class: 'explosion',
        });

        // destroy obstacles
        // is destroying more than what is required I wont use this
        // can possibly implement point system here
        removeObstacle(this.locationPair[0], colLocation);

        // need to add to dom to manipulate location
        $('.gamebox').append($explodeCell);
        $explodeCell = $(`#explosion-${this.locationPair[0]}-${colLocation}`);
        $explodeCell.css('left', `${colLocation*40}px`);
        $explodeCell.css('top', `${(this.locationPair[0])*40}px`);
        $explodeCell.text('x');
        setTimeout(function(){
            $explodeCell.remove();
            
        },1000);  //delay clear for a second
        
    }

    

    delete this.playerThatDropped.bombs[timer]
    this.playerThatDropped.numberOfBombs++;
    // --bombsInPlay;
}






























//player class
//========================================================================================



// dom element should be a css selector
let Player = function(name, location, color){
    this.name = name;
    this.cooldown = {};
    this.locationPair = location;
    PlayerLocationPairs[`${this.locationPair[0]},${this.locationPair[1]}`] = [this.locationPair[0],this.locationPair[1]];
    this.bombsInPlay = 0;
    this.numberOfBombs = 1;
    this.bombs = {}     //example time: bomb
    PlayerLocationPairs[this.locationPair] = [this];
    $gamebox.append($('<div>',{
        class: `player clearfix ${name}`,
        id: `${name}`,
        style: `background-color: ${color}; border: ${color}`, 
        border: `${color}`,
    }));
    this.domElement = $(`#${name}`);
    this.domElement.css(`left`,`${location[1]*40}px`);
    this.domElement.css(`top`,`${location[0]*40}px`);

}
Player.prototype.collisionUp = function(){
    if(absoluteIllegalLocationsYAxis[parseInt(this.domElement.css('top'))]!==undefined){
        console.log(`collision detected from ${this.domElement.css('top')} wall ${absoluteIllegalLocationsYAxis[parseInt(this.domElement.css('top'))]}`)
        return true;
    }
    let newCoordinates = [this.locationPair[0]-1,this.locationPair[1]];
    if(ObstaclePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
        console.log(`collision detected`)
        return true;
    }
    return false;
}
Player.prototype.collisionDown = function(){
    if(absoluteIllegalLocationsYAxis[parseInt(this.domElement.css('top'))+step]!==undefined){
        console.log(`collision detected from ${this.domElement.css('top')} wall ${absoluteIllegalLocationsYAxis[parseInt(this.domElement.css('top'))+step]}`)
        return true;
    }
    let newCoordinates = [this.locationPair[0]+1,this.locationPair[1]];
    if(ObstaclePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
        console.log(`collision detected`)
        return true;
    }
    return false;
}
Player.prototype.collisionRight = function(){
    if(absoluteIllegalLocationsXAxis[parseInt(this.domElement.css('left'))+step]!==undefined){
        console.log(`collision detected from ${this.domElement.css('left')} wall ${absoluteIllegalLocationsXAxis[parseInt(this.domElement.css('left'))+step]}`)
        return true;
    }
    let newCoordinates = [this.locationPair[0],this.locationPair[1]+1];
    console.log(newCoordinates);
    if(ObstaclePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
        console.log(`collision detected`)
        return true;
    }
    return false;
}
Player.prototype.collisionLeft = function(){
    if(absoluteIllegalLocationsXAxis[parseInt(this.domElement.css('left'))]!==undefined){
        console.log(`collision detected at wall from ${this.domElement.css('left')} ${absoluteIllegalLocationsXAxis[parseInt(this.domElement.css('left'))]}`)
        return true;
    }
    let newCoordinates = [this.locationPair[0],this.locationPair[1]-1];
    if(ObstaclePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
        console.log(`collision detected`)
        return true;
    }
    return false;
}
Player.prototype.stepUp = function(){
    if(!this.collisionUp()){
        delete PlayerLocationPairs[this.locationPair];
        delete illegalLocationsYAxis[parseInt(this.domElement.css('top'))];
        this.domElement.css('top',parseInt(this.domElement.css('top'))-step);
        this.locationPair[0]--;
        illegalLocationsYAxis[parseInt(this.domElement.css('top'))] = parseInt(this.domElement.css('top'));
        PlayerLocationPairs[this.locationPair] = [this];
    }
}
Player.prototype.stepDown = function(){
    if(!this.collisionDown() ){
        delete PlayerLocationPairs[this.locationPair];
        delete illegalLocationsYAxis[parseInt(this.domElement.css('top'))];
        this.domElement.css('top',parseInt(this.domElement.css('top'))+step);
        this.locationPair[0]++;
        illegalLocationsYAxis[parseInt(this.domElement.css('top'))] = parseInt(this.domElement.css('top'));
        PlayerLocationPairs[this.locationPair] = [this];
    }
}
Player.prototype.stepRight = function(){
    if(!this.collisionRight()){
        delete PlayerLocationPairs[this.locationPair];
        delete illegalLocationsXAxis[parseInt(this.domElement.css('left'))];
        this.domElement.css('left',parseInt(this.domElement.css('left'))+step);
        this.locationPair[1]++;
        illegalLocationsXAxis[parseInt(this.domElement.css('left'))] = parseInt(this.domElement.css('left'));
        PlayerLocationPairs[this.locationPair] = [this];
    }
}
Player.prototype.stepLeft = function(){
    if(!this.collisionLeft()){
        delete PlayerLocationPairs[this.locationPair];
        delete illegalLocationsXAxis[parseInt(this.domElement.css('left'))];
        this.domElement.css('left',parseInt(this.domElement.css('left'))-step);
        this.locationPair[1]--;
        illegalLocationsXAxis[parseInt(this.domElement.css('left'))] = parseInt(this.domElement.css('left'));
        PlayerLocationPairs[this.locationPair] = [this];
    }
}

Player.prototype.dropBomb = function(){
    if(this.numberOfBombs > 0){
        console.log(`bombs: ${this.numberOfBombs}`)
        console.log(`dropping a bomb at ${this.locationPair[0]}, ${this.locationPair[1]}`);
        bombID = '';
        // let rc = [playerOneRow,playerOneCol]
        // let droppingLocation = this.locationPair;        //doesnt work because keeps updating bombs location
        let droppingLocation = [parseInt(this.domElement.css('top'))/40, parseInt(this.domElement.css('left'))/40];
        let bomb = new Bomb(droppingLocation, timer, this);
        // this.createBomb(this.locationPair[0],this.locationPair[1]);
        ObstaclePairs[`${this.locationPair[0],this.locationPair[1]}`] = [this.locationPair[0],this.locationPair[1]];
        this.numberOfBombs--;
        timer++;   //to ensure multiple bombs dont line up on the same cooldown time
        this.cooldown[timer + cooldownTime] = this.locationPair;
        this.bombsInPlay++;
        // bombsInPlay++;
        this.bombs[timer+2] = bomb;
    }
}
Player.prototype.refreshCooldowns = function(){
    if(this.bombs[timer]!== undefined){
        console.log(`found bomb to explode ${this.bombs[timer].locationPair}`);
        this.bombs[timer].explode();
    }
}
Player.prototype.die = function(){
    console.log(`${this.name} died`);
    this.domElement.remove();
    delete PlayerLocationPairs[`${this.locationPair[0]},${this.locationPair[1]}`]
}









// Gameplay







//========================================================================================





















let Obstacle = function(location){
    this.location = location
}

// an npc

let Monster = function(name, location, color){
    Player.call(this, name, location, color);
    // monsters.push(this);
    monsters[this.name] = this;
    console.log(`Made ${this.name} ${this.color}`);
}
Monster.prototype = Object.create(Player.prototype);
Monster.prototype.constructor = Monster;
// let controlOptions = ['up','right','down','left','dropbomb'];

Monster.prototype.randomMove = function(){
    let randomCommand = controlOptions[Math.floor(Math.random()*controlOptions.length)];
    switch(randomCommand){
        case 'up':
            this.stepUp();
            break;
        case 'right':
            this.stepRight();
            break;
        case 'down':
            this.stepDown();
            break;
        case 'left':
            this.stepLeft();
            break;
        case 'dropbomb':
            this.dropBomb();
            break;
    }
}

Monster.prototype.die = function(){
    console.log(`${this.name} died`);
    this.domElement.remove();
    delete PlayerLocationPairs[`${this.locationPair[0]},${this.locationPair[1]}`]
    delete monsters[this.name];
}


let playerOne = new Player('p1', [0,0], 'red');
let playerTwo = new Player('p2', [0,14], 'blue');
players.push(playerOne);
players.push(playerTwo);

let createRandomMonsters = function(){
    let numberOfMonsters = Math.floor(Math.random()*5);
    console.log(`Monsters: ${numberOfMonsters}`);
    for(let j = 0; j < numberOfMonsters; ++j){

        let randomRow = Math.floor(Math.random()*playerTwoCol);
        let randomCollumn = Math.floor(Math.random()*playerTwoCol);
        // let randomColor = colors[Math.floor(Math.random()*colors.length)];
        let monster = new Monster(`monster${j}`, [randomRow, randomCollumn], 'teal');
    }
}
createRandomMonsters();

























let initializeIllegalLocation = function(){
    absoluteIllegalLocationsXAxis[`${rightEdge}`] = `${rightEdge}`;
    absoluteIllegalLocationsXAxis[`${leftEdge}`] = `${leftEdge}`;
    absoluteIllegalLocationsYAxis[`${bottomEdge}`] = `${bottomEdge}`;
    absoluteIllegalLocationsYAxis[`${topEdge}`] = `${topEdge}`;

    //player two location left
    illegalLocationsXAxis[`${parseInt($('.p2').css('left'))}`] = `${parseInt($('.p2').css('left'))}`;

    //player two location top
    illegalLocationsYAxis[`${parseInt($('.p2').css('top'))}`] = `${parseInt($('.p2').css('top'))}`;

    
    //player one location left
    illegalLocationsXAxis[`${parseInt($('.p1').css('left'))}`] = `${parseInt($('.p1').css('left'))}`;

    // //player one location top
    illegalLocationsYAxis[`${parseInt($('.p1').css('top'))}`] = `${parseInt($('.p1').css('top'))}`;
}
initializeIllegalLocation();

















let makeObstacle = function(row,col){
    if(ObstaclePairs[`${row},${col}`] === undefined && PlayerLocationPairs[`${row},${col}`]===undefined){
        
        // rowObstacles[row] = row;
        // colObstacles[col] = col;
        let index = Math.floor(Math.random()*colors.length);
        console.log(`making a ${colors[index]} object at (${row},${col})`);
        let $obstacle = $('<div>',{
            id: `obstacler${row}c${col}`,
            class: 'obstacle',
        });

        $('.gamebox').append($obstacle);
        $obstacle = $(`#obstacler${row}c${col}`)
        $obstacle.css('background-color',`${colors[index]}`);
        $obstacle.css('left',`${col*40}px`);
        $obstacle.css('top',`${row*40}px`);
        // rowObstacles[row] = row;
        // colObstacles[col] = col;
        ObstaclePairs[`${row},${col}`] = [row,col];
    }
    else{
        console.log(`${row},${col} is occupied`)
    }

}
// makeObstacle(0,2);
// makeObstacle(0,3);
// makeObstacle(0,4);
// makeObstacle(3,2);
// makeObstacle(3,3);
// makeObstacle(3,4);


// this generates ghost divs for some reason so I will reveal them.
let putRandomObstaclesInGame = function(){
    for(let row = 0; row < playerTwoCol; row+=2){

        let numberOfObstacles = Math.floor(Math.random()*playerTwoCol/2);
        for(let j = 0; j < numberOfObstacles; ++j){
            let col = Math.floor(Math.random()*playerTwoCol)
            makeObstacle(row,col);
        }
        
    }

}
putRandomObstaclesInGame();











// instead of a jquery dom object, call the functions on the class person to be DRY
document.addEventListener('keyup',function (event){
    console.log(event);
    //player one controls
    if(event.key==='d'){
        // stepRight($('.p1'));
        playerOne.stepRight();
    }
    if(event.key==='a'){
        // stepLeft($('.p1'));
        playerOne.stepLeft();
    }
    if(event.key==='s'){
        // stepDown($('.p1'));
        playerOne.stepDown();

    }
    if(event.key==='w'){
        // stepUp($('.p1'));
        playerOne.stepUp();

    }
    if(event.key==='x'){
        // dropBomb($('.p1'));
        playerOne.dropBomb();
    }

    //player two controls
    if(event.key==='ArrowRight'){
        // stepRight($('.p2'));
        playerTwo.stepRight();
    }
    if(event.key==='ArrowLeft'){
        // stepLeft($('.p2'));
        playerTwo.stepLeft();
    }
    if(event.key==='ArrowDown'){
        // stepDown($('.p2'));
        playerTwo.stepDown();
    }
    if(event.key==='ArrowUp'){
        // stepUp($('.p2'));
        playerTwo.stepUp();
    }
    if(event.key==='l'){
        // dropBomb($('.p2'));
        playerTwo.dropBomb();
    }
});











let checkTime = function(){
    //end is 300,000ms = 5min
    //1000*60*5
    // for(let j = 0; j*1000 < timeLimit;++j){
    //     let timeoutID = setInterval(function(){
    //     //    console.log(timeoutID);
    //         //monitor bomb stuff
            
    //         bombsInPlay = 0;
    //         playerOne.refreshCooldowns();
    //         playerTwo.refreshCooldowns();
    //         let monsterKeys = Object.keys(monsters);
    //         for(let j = 0; j < monsterKeys.length; ++j){
    //             monsters[monsterKeys[j]].randomMove();
    //             monsters[monsterKeys[j]].refreshCooldowns();
    //         }
    //         timer++;
    //         console.log(timer);
    //     }, j*1000);//increase the timer every second
    // }
    let id = setInterval(()=>{
        
        if(timer > 180){
            clearInterval(id);
        }
        //actions
        console.log(timer);
        playerOne.refreshCooldowns();
        playerTwo.refreshCooldowns();
        let monsterKeys = Object.keys(monsters);
        for(let j = 0; j < monsterKeys.length; ++j){
            monsters[monsterKeys[j]].randomMove();
            monsters[monsterKeys[j]].refreshCooldowns();
        }

        timer++;
    }, 500)
    //stop execution
    // clearInterval(id);
}
checkTime();