

// use left and top for positioning, not bottom and right

let playerOneBombs = 1;
let playerTwoBombs = 1;
let playerOneBombsInPlay = 0;
let playerTwoBombsInPlay = 0;
let bombs = {};     //example time: thisbomb

let monsters = {};
let players = [];

let playerOneCooldowns = {};        //get rid of these two and put in player to make npcs use same logic
let playerTwoCooldowns = {};        //get rid of these two and put in player to make npcs use same logic
let cooldownTime = 1;        //2 sec

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





















// location is a pair of x,y coordinates for the game grid
let Bomb = function(location, timeDropped, playerThatDropped){
    this.playerThatDropped = playerThatDropped
    this.locationPair = location
    this.explodeTime = timeDropped+2;
    console.log(`creating bomb(${this.locationPair[0]},${this.locationPair[1]})`);
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
            $($bomb).css('left', `${(this.locationPair[1]-(Object.keys(bombs).length))*40}px`);         //subtract pairs(sub, #ofballsLeft): (1,2), (2,1), (3,1)
            $($bomb).css('top', `${(this.locationPair[0])*40}px`);
            // console.log(`left: ${(this.locationPair[1]-(Object.keys(bombs).length))*40}px`);            //subtract pairs(sub, #ofballsLeft): (1,2), (2,1), (3,1)
            // console.log(`top: ${(this.locationPair[0])*40}px`);
            this.domElement = $($bomb);
            bombs[this.explodeTime] = this;
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
        
        
        


        // if(playerTwoRow === row && playerTwoCol === col){
        //     console.log('Player One Wins!!!')
        //     $('#p2').remove();
            
        // }
        // if(playerOneRow === row && playerOneCol === col){
        //     console.log('Player Two Wins!!!')
        //     $('#p1').remove();
            
        // }
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
        
        
        


        // if(playerTwoRow === row && playerTwoCol === col){
        //     console.log('Player One Wins!!!')
        //     $('#p2').remove();
            
        // }
        // if(playerOneRow === row && playerOneCol === col){
        //     console.log('Player Two Wins!!!')
        //     $('#p1').remove();
            
        // }
    }

    

    delete bombs[timer]
    this.playerThatDropped.numberOfBombs++;
    // bombsInPlay--;
}






























//player class
//========================================================================================



// dom element should be a css selector
let Player = function(name, location, color){
    this.name = name;
    this.cooldown = {};
    this.locationPair = location;
    this.bombsInPlay = 0;
    this.numberOfBombs = 1;
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
// Player.prototype.createBomb = function(){
    // let $bomb = $('<div>',{
    //             class: 'game-bomb',
    //             id: `r${this.locationPair[0]}c${this.locationPair[1]}`,
    //             width: '40px',
    //             height: '40px',
    //         });
    //         let $ground = $('<div>',{
    //             class: 'game-ground',
    //         });
    //         let $homepage_bomb = $('<div>',{
    //             class: 'game-homepage-bomb',
    //         });
    //         let $fuse = $('<div>',{
    //             class: 'game-fuse',
    //         });
    //         let $spark = $('<div>',{
    //             class: 'game-spark',
    //         });
    //         let $triangle_upTriangle = $('<div>',{
    //             class: 'game-triangle game-upTriangle',
    //         });
    //         let $homepage_bomb_top = $('<div>',{
    //             class: 'game-homepage-bomb-top',
    //         });
    //         let $sphereshadow = $('<span>',{
    //             class: 'game-sphereshadow',
    //         });
    //         let $homepage_bomb_body_sphere = $('<div>',{
    //             class: 'game-homepage-bomb-body sphere',
    //         });
            

    //         // need to add to dom to manipulate location
    //         $('.gamebox').append($bomb);
    //         $bomb.append($ground);
    //         $ground.append($homepage_bomb);
    //         $homepage_bomb.append($fuse);
    //         $fuse.append($spark);
    //         $spark.append($triangle_upTriangle);
    //         $homepage_bomb.append($homepage_bomb_top);
    //         $homepage_bomb.append($sphereshadow);
    //         $homepage_bomb.append($homepage_bomb_body_sphere);
    //         ObstaclePairs


    //         // must account for previous gameboard appendings
    //         $($bomb).css('left', `${(col-(this.bombsInPlay))*40}px`);         //subtract pairs(sub, #ofballsLeft): (1,2), (2,1), (3,1)
    //         $($bomb).css('top', `${(row)*40}px`);
    //         console.log(`left: ${(col-(this.bombsInPlay))*40}px`);            //subtract pairs(sub, #ofballsLeft): (1,2), (2,1), (3,1)
    //         console.log(`top: ${(row)*40}px`);
// }
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
    }
}
Player.prototype.refreshCooldowns = function(){
    // console.log(`${this.name} is refreshing`);
    //find bomb that is going to explode
    // console.log(bombs[timer]);
    if(bombs[timer]!== undefined){
        console.log(`found bomb to explode ${bombs[timer].locationPair}`);
        bombs[timer].explode();
    }


    // if(this.cooldown[timer]!==undefined){
    //     let row = this.cooldown[timer][0];
    //     let col = this.cooldown[timer][1];

    //     //find bomb that is going to explode
    //     if(bombs[timer]!== undefined){
    //         bombs[timer].explode;
    //     }
    //     //trigger the explosion;
    //     // explode(row,col,'p1');
    //     // explode(row-1,col,'p1');
    //     // explode(row+1,col,'p1');
    //     // explode(row+2,col,'p1');
    //     // explode(row-2,col,'p1');
    //     // explode(row,col-1,'p1');
    //     // explode(row,col+1,'p1');
    //     // explode(row,col-2,'p1');
    //     // explode(row,col+2,'p1');
    //     // $(`#r${row}c${col}`).remove();
    //     // let bombID = `r${row}c${col}`;
    //     // console.log(`Removing ${bombID}'s cooldown`);
    //     // // $(`#${bombID}`).css('visibility', 'hidden');
    //     // delete playerOneCooldowns[timer];
    //     // playerOneBombs++;
    //     // playerOneBombsInPlay--;
    // }
    
    
}
Player.prototype.die = function(){
    console.log(`${this.name} died`);
    this.domElement.remove();
    delete PlayerLocationPairs[`${this.locationPair[0]},${this.locationPair[1]}`]
}










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
    let numberOfMonsters = Math.floor(Math.random()*10);
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












// 14x14?
// original
// let initializeAllBombs = function(){
//     for(let j = 0; j < playerTwoCol+1; ++j){
//         for(let k = 0; k < playerTwoCol+1; ++k){
//             $('.gamebox').append($('<div>',{
//             class: 'gameBomb clearfix sphere',
//             id: `r${j}c${k}`,
//             }));
//         }
//     }
    
// }



// let createBomb = function(row, col){
//     let $bomb = $('<div>',{
//                 class: 'game-bomb',
//                 id: `r${row}c${col}`,
//                 width: '40px',
//                 height: '40px',
//             });
//             let $ground = $('<div>',{
//                 class: 'game-ground',
//             });
//             let $homepage_bomb = $('<div>',{
//                 class: 'game-homepage-bomb',
//             });
//             let $fuse = $('<div>',{
//                 class: 'game-fuse',
//             });
//             let $spark = $('<div>',{
//                 class: 'game-spark',
//             });
//             let $triangle_upTriangle = $('<div>',{
//                 class: 'game-triangle game-upTriangle',
//             });
//             let $homepage_bomb_top = $('<div>',{
//                 class: 'game-homepage-bomb-top',
//             });
//             let $sphereshadow = $('<span>',{
//                 class: 'game-sphereshadow',
//             });
//             let $homepage_bomb_body_sphere = $('<div>',{
//                 class: 'game-homepage-bomb-body sphere',
//             });
            

//             // need to add to dom to manipulate location
//             $('.gamebox').append($bomb);
//             $bomb.append($ground);
//             $ground.append($homepage_bomb);
//             $homepage_bomb.append($fuse);
//             $fuse.append($spark);
//             $spark.append($triangle_upTriangle);
//             $homepage_bomb.append($homepage_bomb_top);
//             $homepage_bomb.append($sphereshadow);
//             $homepage_bomb.append($homepage_bomb_body_sphere);



//             // must account for previous gameboard appendings
//             $($bomb).css('left', `${(col-(playerOneBombsInPlay))*40}px`);         //subtract pairs(sub, #ofballsLeft): (1,2), (2,1), (3,1)
//             $($bomb).css('top', `${(row)*40}px`);
//             console.log(`left: ${(col-(playerOneBombsInPlay))*40}px`);            //subtract pairs(sub, #ofballsLeft): (1,2), (2,1), (3,1)
//             console.log(`top: ${(row)*40}px`);
// }

// createBomb(3,4);

// let moveBomb = function(id, row, col){
//     let $bomb = $(`#${id}`);
//     bomb.css('left','row');
// }

// with animations
// let initializeAllBombs = function(){
//     for(let j = 0; j < playerTwoCol+1; ++j){
//         for(let k = 0; k < playerTwoCol+1; ++k){
//             let $bomb = $('<div>',{
//                 class: 'game-bomb',
//                 id: `r${j}c${k}`,
//                 width: '40px',
//                 height: '40px',
//             });
//             let $ground = $('<div>',{
//                 class: 'game-ground',
//             });
//             let $homepage_bomb = $('<div>',{
//                 class: 'game-homepage-bomb',
//             });
//             let $fuse = $('<div>',{
//                 class: 'game-fuse',
//             });
//             let $spark = $('<div>',{
//                 class: 'game-spark',
//             });
//             let $triangle_upTriangle = $('<div>',{
//                 class: 'game-triangle game-upTriangle',
//             });
//             let $homepage_bomb_top = $('<div>',{
//                 class: 'game-homepage-bomb-top',
//             });
//             let $sphereshadow = $('<span>',{
//                 class: 'game-sphereshadow',
//             });
//             let $homepage_bomb_body_sphere = $('<div>',{
//                 class: 'game-homepage-bomb-body sphere',
//             });
            

//             $('.gamebox').append($bomb);
//             $bomb.append($ground);
//             $ground.append($homepage_bomb);
//             $homepage_bomb.append($fuse);
//             $fuse.append($spark);
//             $spark.append($triangle_upTriangle);
//             $homepage_bomb.append($homepage_bomb_top);
//             $homepage_bomb.append($sphereshadow);
//             $homepage_bomb.append($homepage_bomb_body_sphere);

            
//         }
//     }
    
// }
// initializeAllBombs();


















let makeObstacle = function(row,col){
    if(ObstaclePairs[`${row},${col}`] === undefined){
        
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

    // let rowObstacleKeys = Object.keys(rowObstacles);
    // let colObstacleKeys = Object.keys(colObstacles);
    // for(let j = 0; j < rowObstacleKeys.length; ++j){
    //     for(let k = 0; k < colObstacleKeys.length; ++k){
    //         makeObstacle(rowObstacleKeys[j],colObstacleKeys[k]);
    //     }
    // }


}
putRandomObstaclesInGame();

























//stop undoing here
//here
// at the moment only wall collisison detection works propperly
// use objects to monitor player current position, so I can use this logic for monsters
// right now player is a jquery dom object
// let collisionRight = function(player){

//     if(absoluteIllegalLocationsXAxis[parseInt(player.css('left'))+step]!==undefined){
//         console.log(`collision detected from ${player.css('left')} wall ${absoluteIllegalLocationsXAxis[parseInt(player.css('left'))+step]}`)
//         return true;
//     }
//     if(player.attr('id')==='p1'){
//         let newCoordinates = [playerOneRow,playerOneCol+1];
//         console.log(newCoordinates);
//         if(ObstaclePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
//             console.log(`collision detected`)
//             return true;
//         }
//         else if(newCoordinates[0]===playerTwoRow && newCoordinates[1]===playerTwoCol){
//             console.log(`collision detected`)
//             return true;
//         }
//     }
//     else{
//         let newCoordinates = [playerTwoRow,playerTwoCol+1];
//         if(ObstaclePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
//             console.log(`collision detected`)
//             return true;
//         }
//         else if(newCoordinates[0]===playerOneRow && newCoordinates[1]===playerOneCol){
//             console.log(`collision detected`)
//             return true;
//         }
        
//     }
    
//     return false;
// }
// let collisionLeft = function(player){

//     if(absoluteIllegalLocationsXAxis[parseInt(player.css('left'))]!==undefined){
//         console.log(`collision detected at wall from ${player.css('left')} ${absoluteIllegalLocationsXAxis[parseInt(player.css('left'))]}`)
//         return true;
//     }
//     if(player.attr('id')==='p1'){
//         let newCoordinates = [playerOneRow,playerOneCol-1];
//         if(ObstaclePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
//             console.log(`collision detected`)
//             return true;
//         }
//         else if(newCoordinates[0]===playerTwoRow && newCoordinates[1]===playerTwoCol){
//             console.log(`collision detected`)
//             return true;
//         }
//     }
//     else{
//         let newCoordinates = [playerTwoRow,playerTwoCol-1];
//         if(ObstaclePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
//             console.log(`collision detected`)
//             return true;
//         }
//         else if(newCoordinates[0]===playerOneRow && newCoordinates[1]===playerOneCol){
//             console.log(`collision detected`)
//             return true;
//         }
//     }
    
//     return false;
// }
// let collisionUp = function(player){
 
//     if(absoluteIllegalLocationsYAxis[parseInt(player.css('top'))]!==undefined){
//         console.log(`collision detected from ${player.css('top')} wall ${absoluteIllegalLocationsYAxis[parseInt(player.css('top'))]}`)
//         return true;
//     }
//     if(player.attr('id')==='p1'){
//         let newCoordinates = [playerOneRow-1,playerOneCol];
//         if(ObstaclePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
//             console.log(`collision detected`)
//             return true;
//         }
//         else if(newCoordinates[0]===playerTwoRow && newCoordinates[1]===playerTwoCol){
//             console.log(`collision detected`)
//             return true;
//         }
//     }
//     else{
//         let newCoordinates = [playerTwoRow-1,playerTwoCol];
//         if(ObstaclePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
//             console.log(`collision detected`)
//             return true;
//         }
//         else if(newCoordinates[0]===playerOneRow && newCoordinates[1]===playerOneCol){
//             console.log(`collision detected`)
//             return true;
//         }
//     }

//     return false;
// }
// let collisionDown = function(player){

//     if(absoluteIllegalLocationsYAxis[parseInt(player.css('top'))+step]!==undefined){
//         console.log(`collision detected from ${player.css('top')} wall ${absoluteIllegalLocationsYAxis[parseInt(player.css('top'))+step]}`)
//         return true;
//     }
//     if(player.attr('id')==='p1'){
//         let newCoordinates = [playerOneRow+1,playerOneCol];
//         if(ObstaclePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
//             console.log(`collision detected`)
//             return true;
//         }
//         else if(newCoordinates[0]===playerTwoRow && newCoordinates[1]===playerTwoCol){
//             console.log(`collision detected`)
//             return true;
//         }
//     }
//     else{
//         let newCoordinates = [playerTwoRow+1,playerTwoCol];
//         if(ObstaclePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
//             console.log(`collision detected`)
//             return true;
//         }
//         else if(newCoordinates[0]===playerOneRow && newCoordinates[1]===playerOneCol){
//             console.log(`collision detected`)
//             return true;
//         }
//     }
//     return false;
// }



// // at the moment does not work
// let collisionHorizontal = function(player){
//     if( collisionLeft(player) || collisionRight(player) ){
//         return true;
//     }
//     return false;
// }
// let collisionVerticle = function(player){
//     if(collisionDown(player) ||  collisionUp(player)){
//         return true;
//     }
//     return false;
// }





















// // if players new x y coordinate is taken, cannot move
// let stepRight = function(player){
//     if(!collisionRight(player)){
//         delete illegalLocationsXAxis[parseInt(player.css('left'))];
//         player.css('left',parseInt(player.css('left'))+step);
//         console.log(player.attr('id'));
//         if(player.attr('id') === 'p1'){
//             playerOneCol++;
//         }
//         else{
//             playerTwoCol++;
//         }
//         illegalLocationsXAxis[parseInt(player.css('left'))] = parseInt(player.css('left'));
//     }
// }

// let stepLeft = function(player){
//     if(!collisionLeft(player)){
//         delete illegalLocationsXAxis[parseInt(player.css('left'))];

//         player.css('left',parseInt(player.css('left'))-step);
//         if(player.attr('id') === 'p1'){
//             playerOneCol--;
//         }
//         else{
//             playerTwoCol--;
//         }
//         illegalLocationsXAxis[parseInt(player.css('left'))] = parseInt(player.css('left'));

//     }
// }

// let stepDown = function(player){
//     if(!collisionDown(player) ){
//         delete illegalLocationsYAxis[parseInt(player.css('top'))];

//         player.css('top',parseInt(player.css('top'))+step);
//         if(player.attr('id') === 'p1'){
//             playerOneRow++;
//         }
//         else{
//             playerTwoRow++;
//         }
//         illegalLocationsYAxis[parseInt(player.css('top'))] = parseInt(player.css('top'));

//     }
// }

// let stepUp = function(player){
//     if(!collisionUp(player) ){
//         delete illegalLocationsYAxis[parseInt(player.css('top'))];

//         player.css('top',parseInt(player.css('top'))-step);
//         if(player.attr('id') === 'p1'){
//             playerOneRow--;
//         }
//         else{
//             playerTwoRow--;
//         }
//         illegalLocationsYAxis[parseInt(player.css('top'))] = parseInt(player.css('top'));

//     }
// }



































// if div is already there
// let dropBomb = function(player){
//     //create a div bomb at player location absolute position
    
//     bombID = '';
//     if(player.hasClass('p1') && playerOneBombs> 0){
//         console.log('test');
//         let rc = [playerOneRow,playerOneCol]
//         let $bombID = `#r${rc[0]}c${rc[1]}`;
//         // document.querySelector(`#${rc}`)
//         console.log(`#${rc[0]}${rc[1]}`);
//         $($bombID).css('visibility','visible');
//         $($bombID).css('translateZ','1');
//         let rcLeft = playerOneRow*playerWidth;
//         let rcTop = playerOneRow*playerWidth;
//         rowObstacles[rc[0]] = rc[0];
//         colObstacles[rc[1]] = rc[1];
//         playerOneBombs--;
//         timer++;   //to ensure multiple bombs dont line up on the same cooldown time
//         playerOneCooldowns[timer + cooldownTime] = rc;
//     }
//     if(player.hasClass('p2') && playerTwoBombs > 0){
//         console.log('test');
//         let rc = [playerTwoRow,playerTwoCol]
//         let $bombID = `#r${rc[0]}c${rc[1]}`;
//         // document.querySelector(`#${rc}`)
//         console.log(`#${rc[0]}${rc[1]}`);
//         $($bombID).css('visibility','visible');
//         $($bombID).css('translateZ','1');
//         let rcLeft = playerTwoRow*playerWidth;
//         let rcTop = playerTwoRow*playerWidth;
//         rowObstacles[rc[0]] = rc[0];
//         colObstacles[rc[1]] = rc[1];
//         playerTwoBombs--;
//         timer++;   //to ensure multiple bombs dont line up on the same cooldown time
//         playerTwoCooldowns[timer + cooldownTime] = rc;
//     }
    

// }


// let dropBomb = function(player){
//     //create a div bomb at player location absolute position
    
//     bombID = '';
//     if(player.hasClass('p1') && playerOneBombs> 0){
//         console.log('test');
//         let rc = [playerOneRow,playerOneCol]
//         let $bombID = `#r${rc[0]}c${rc[1]}`;
//         let $bomb = $($bombID);
//         // document.querySelector(`#${rc}`)
//         console.log($bombID);
//         console.log($($bombID).css('visibility'));
//         $bomb.css('visibility','visible');
//         $bomb.css('translateZ','1');

//         // $ground = $(`${$bomb} .game-ground`);
//         // $ground.css('visibility', 'visible');

//         // $game_homepage_bomb = $(`${$bomb} .game-ground .game-homepage-bomb`);
//         // $game_homepage_bomb.css('visibility', 'visible');

//         // $game_fuse = $(`${$bomb} .game-ground .game-homepage-bomb .game-fuse`);
//         // $game_fuse.css('visibility', 'visible');

//         // $game_spark = $(`${$bomb} .game-ground .game-homepage-bomb .game-fuse .game-spark`);
//         // $game_spark.css('visibility', 'visible');

//         // $game_triangle = $(`${$bomb} .game-ground .game-homepage-bomb .game-fuse .game-spark .game-triangle`);
//         // $game_triangle.css('visibility', 'visible');

//         // $game_upTriangle = $(`${$bomb} .game-ground .game-homepage-bomb .game-fuse .game-spark .game-upTriangle`);
//         // $game_upTriangle.css('visibility', 'visible');


//         // $game_homepage_bomb_top = $(`${$bomb} .game-ground .game-homepage-bomb .game-homepage-bomb-top`);
//         // $game_homepage_bomb_top.css('visibility', 'visible');

//         // $game_sphereshadow = $(`${$bomb} .game-ground .game-homepage-bomb .game-sphereshadow`);
//         // $game_sphereshadow.css('visibility', 'visible');

//         // $game_homepage_bomb_body = $(`${$bomb} .game-ground .game-homepage-bomb .game-homepage-bomb-body`);
//         // $game_homepage_bomb_body.css('visibility', 'visible');

//         // $sphere = $(`${$bomb} .game-ground .game-homepage-bomb .sphere`);
//         // $sphere.css('visibility', 'visible');

        

//         let rcLeft = playerOneRow*playerWidth;
//         let rcTop = playerOneRow*playerWidth;
//         rowObstacles[rc[0]] = rc[0];
//         colObstacles[rc[1]] = rc[1];
//         playerOneBombs--;
//         timer++;   //to ensure multiple bombs dont line up on the same cooldown time
//         playerOneCooldowns[timer + cooldownTime] = rc;
//     }
//     if(player.hasClass('p2') && playerTwoBombs > 0){
//         console.log('test');
//         let rc = [playerTwoRow,playerTwoCol]
//         let $bombID = `#r${rc[0]}c${rc[1]}`;
//         // document.querySelector(`#${rc}`)
//         console.log(`#${rc[0]}${rc[1]}`);
//         $($bombID).css('visibility','visible');
//         $($bombID).css('translateZ','1');
//         let rcLeft = playerTwoRow*playerWidth;
//         let rcTop = playerTwoRow*playerWidth;
//         rowObstacles[rc[0]] = rc[0];
//         colObstacles[rc[1]] = rc[1];
//         playerTwoBombs--;
//         timer++;   //to ensure multiple bombs dont line up on the same cooldown time
//         playerTwoCooldowns[timer + cooldownTime] = rc;
//     }
    

// }




// switch player to class logic
// let dropBomb = function(player){
//     //create a div bomb at player location absolute position
    
//     bombID = '';
//     if(player.hasClass('p1') && playerOneBombs> 0){
//         let rc = [playerOneRow,playerOneCol]
//         createBomb(rc[0],rc[1]);
//         // rowObstacles[rc[0]] = rc[0];
//         // colObstacles[rc[1]] = rc[1];
//         ObstaclePairs[`${rc[0],rc[1]}`] = [rc];
//         playerOneBombs--;
//         timer++;   //to ensure multiple bombs dont line up on the same cooldown time
//         playerOneCooldowns[timer + cooldownTime] = rc;
//         playerOneBombsInPlay++;
//     }
//     if(player.hasClass('p2') && playerTwoBombs> 0){
//         let rc = [playerTwoRow,playerTwoCol]
//         createBomb(rc[0],rc[1]);
//         // rowObstacles[rc[0]] = rc[0];
//         // colObstacles[rc[1]] = rc[1];
//         ObstaclePairs[`${rc[0],rc[1]}`] = [rc]
//         playerTwoBombs--;
//         timer++;   //to ensure multiple bombs dont line up on the same cooldown time
//         playerTwoCooldowns[timer + cooldownTime] = rc;
//         playerTwoBombsInPlay++;
//     }
// }



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
        playerOne.stepRight();
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












// axis should be a string: x or y
//row and col should be numbers.
// allow wraparound?
//explode for original 
// let explode = function(row, col){
//     // getPixleOriginFromRowAndCol(row, col);
    

//     console.log('boom');
//     delete colObstacles[col];
//     delete rowObstacles[row];
//     let $bombID = $(`#r${row}c${col}`);
//     $bombID.css('background','white');
//     $bombID.css('visibility','visible');
//     $bombID.css('color','black');
//     $bombID.text('x');
//     $bombID.css('font-size','33px');

//     //if player is in blast radius you win
//     if(playerTwoRow === row && playerTwoCol === col){
//         console.log('Player One Wins!!!')
//         $('#p2').remove();
        
//     }
//     if(playerOneRow === row && playerOneCol === col){
//         console.log('Player Two Wins!!!')
//         $('#p1').remove();
        
//     }

//     setTimeout(function(){$($bombID).css('visibility', 'hidden');},1000);  //delay clear for a second
// }


// explode for animation
// first is correct, rest is not
// let explode = function(row, col, playerName){
    
//     console.log('boom');
//     console.log(`blowing up r${row}c${col}`);
//     // delete colObstacles[col];
//     // delete rowObstacles[row];
//     delete ObstaclePairs[`${row},${col}`];
//     $(`#obstacler${row}c${col}`).remove();
//     //create a div for the object and append to the row and col
//     let $explodeCell = $('<div>',{
//         id: `explosionr${row}c${col}`,
//         class: 'explosion',
//     });

//     // destroy obstacles
//     // is destroying more than what is required I wont use this
//     // if(rowObstacles[row] !== undefined && colObstacles[col] !== undefined){
//     //     $(`#obstacler${row}c${col}`).remove();
//     // }

//     // need to add to dom to manipulate location
//     $('.gamebox').append($explodeCell);
//     $explodeCell = $(`#explosionr${row}c${col}`);
//     $explodeCell.css('left', `${(col)*40}px`);
//     $explodeCell.css('top', `${(row)*40}px`);
//     $explodeCell.text('x');
//     //if player is in blast radius you win
//     // if(playerName === 'p1'){
//     //     playerOneBombsInPlay--;
//     // }
//     // else{
//     //     playerTwoBombsInPlay--;
//     // }
//     if(playerTwoRow === row && playerTwoCol === col){
//         console.log('Player One Wins!!!')
//         $('#p2').remove();
        
//     }
//     if(playerOneRow === row && playerOneCol === col){
//         console.log('Player Two Wins!!!')
//         $('#p1').remove();
        
//     }

//     setTimeout(function(){$explodeCell.remove();},1000);  //delay clear for a second
// }

















// let refreshCooldowns = function(){
//     if(playerOneCooldowns[timer]!==undefined){
//         let row = playerOneCooldowns[timer][0];
//         let col = playerOneCooldowns[timer][1];
//         explode(row,col,'p1');
//         explode(row-1,col,'p1');
//         explode(row+1,col,'p1');
//         explode(row+2,col,'p1');
//         explode(row-2,col,'p1');
//         explode(row,col-1,'p1');
//         explode(row,col+1,'p1');
//         explode(row,col-2,'p1');
//         explode(row,col+2,'p1');
//         $(`#r${row}c${col}`).remove();
//         let bombID = `r${row}c${col}`;
//         console.log(`Removing ${bombID}'s cooldown`);
//         // $(`#${bombID}`).css('visibility', 'hidden');
//         delete playerOneCooldowns[timer];
//         playerOneBombs++;
//         playerOneBombsInPlay--;
//     }
//     if(playerTwoCooldowns[timer]!==undefined){
//         if(playerTwoCooldowns[timer]!==undefined){
//         let row = playerTwoCooldowns[timer][0];
//         let col = playerTwoCooldowns[timer][1];
//         explode(row,col,'p2');
//         explode(row-1,col,'p2');
//         explode(row+1,col,'p2');
//         explode(row+2,col,'p2');
//         explode(row-2,col,'p2');
//         explode(row,col-1,'p2');
//         explode(row,col+1,'p2');
//         explode(row,col-2,'p2');
//         explode(row,col+2,'p2');
//         $(`#r${row}c${col}`).remove();
//         let bombID = `r${row}c${col}`;
//         console.log(`Removing ${bombID}'s cooldown`);
//         // $(`#${bombID}`).css('visibility', 'hidden');
//         delete playerTwoCooldowns[timer];
//         playerTwoBombs++;
//         playerTwoBombsInPlay--;
//     }
//     }
// }









let checkTime = function(){
    //end is 300,000ms = 5min
    //1000*60*5
    for(let j = 0; j*1000 < timeLimit;++j){
        let timeoutID = setTimeout(function(){
        //    console.log(timeoutID);
            //monitor bomb stuff
            

            playerOne.refreshCooldowns();
            playerTwo.refreshCooldowns();
            let monsterKeys = Object.keys(monsters);
            for(let j = 0; j < monsterKeys.length; ++j){
                monsters[monsterKeys[j]].randomMove();
                monsters[monsterKeys[j]].refreshCooldowns();
            }
            timer++;
            console.log(timer);
        }, j*1000);//increase the timer every second
    }
}
checkTime();