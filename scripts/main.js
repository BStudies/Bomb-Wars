

// use left and top for positioning, not bottom and right

let playerOneBombs = 1;
let playerTwoBombs = 1;
let playerOneBombsInPlay = 0;
let playerTwoBombsInPlay = 0;

let playerOneCooldowns = {};
let playerTwoCooldowns = {};
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


// keep updating this list every movement to make quicker collision detection
let absoluteIllegalLocationsYAxis = {}
let absoluteIllegalLocationsXAxis = {}
let illegalLocationsXAxis = {};
let illegalLocationsYAxis = {};

let rowObsticles = {};
let colObsticles = {};
let obsticlePairs = {};





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



let createBomb = function(row, col){
    let $bomb = $('<div>',{
                class: 'game-bomb',
                id: `r${row}c${col}`,
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



            // must account for previous gameboard appendings
            $($bomb).css('left', `${(col-(playerOneBombsInPlay))*40}px`);         //subtract pairs(sub, #ofballsLeft): (1,2), (2,1), (3,1)
            $($bomb).css('top', `${(row)*40}px`);
            console.log(`left: ${(col-(playerOneBombsInPlay))*40}px`);            //subtract pairs(sub, #ofballsLeft): (1,2), (2,1), (3,1)
            console.log(`top: ${(row)*40}px`);
}

// createBomb(3,4);

let moveBomb = function(id, row, col){
    let $bomb = $(`#${id}`);
    bomb.css('left','row');
}

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








// not working?
let makeObsticle = function(row,col){
    // if(rowObsticles[row] === undefined && colObsticles[col] === undefined){
        
        // rowObsticles[row] = row;
        // colObsticles[col] = col;
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
        rowObsticles[row] = row;
        colObsticles[col] = col;
        obsticlePairs[`${row},${col}`] = [row,col];
    // }
    // else{
    //     console.log(`${row},${col} is occupied`)
    // }

}
// makeObsticle(0,2);
// makeObsticle(0,3);
// makeObsticle(0,4);
// makeObsticle(3,2);
// makeObsticle(3,3);
// makeObsticle(3,4);


// this generates ghost divs for some reason so I will reveal them.
let putRandomObsticlesInGame = function(){
    for(let row = 0; row < playerTwoCol; row+=2){

        let numberOfObsticles = Math.floor(Math.random()*playerTwoCol/2);
        for(let j = 0; j < numberOfObsticles; ++j){
            let col = Math.floor(Math.random()*playerTwoCol)
            if(obsticlePairs[`${row},${col}`] === undefined){
                makeObsticle(row,col);
            }
        }
        
    }

    // let rowObsticleKeys = Object.keys(rowObsticles);
    // let colObsticleKeys = Object.keys(colObsticles);
    // for(let j = 0; j < rowObsticleKeys.length; ++j){
    //     for(let k = 0; k < colObsticleKeys.length; ++k){
    //         makeObsticle(rowObsticleKeys[j],colObsticleKeys[k]);
    //     }
    // }


}
putRandomObsticlesInGame();






let getPixleOriginFromRowAndCol = function(row, col){
    return [row*playerWidth,playerWidth*col];
}














//stop undoing here
//here
// at the moment only wall collisison detection works propperly
let collisionRight = function(player){

    if(absoluteIllegalLocationsXAxis[parseInt(player.css('left'))+step]!==undefined){
        console.log(`collision detected from ${player.css('left')} wall ${absoluteIllegalLocationsXAxis[parseInt(player.css('left'))+step]}`)
        return true;
    }
    if(player.attr('id')==='p1'){
        let newCoordinates = [playerOneRow,playerOneCol+1];
        console.log(newCoordinates);
        if(obsticlePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
            console.log(`collision detected`)
            return true;
        }
        else if(newCoordinates[0]===playerTwoRow && newCoordinates[1]===playerTwoCol){
            console.log(`collision detected`)
            return true;
        }
    }
    else{
        let newCoordinates = [playerTwoRow,playerTwoCol+1];
        if(obsticlePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
            console.log(`collision detected`)
            return true;
        }
        else if(newCoordinates[0]===playerOneRow && newCoordinates[1]===playerOneCol){
            console.log(`collision detected`)
            return true;
        }
        
    }
    
    return false;
}
let collisionLeft = function(player){

    if(absoluteIllegalLocationsXAxis[parseInt(player.css('left'))]!==undefined){
        console.log(`collision detected at wall from ${player.css('left')} ${absoluteIllegalLocationsXAxis[parseInt(player.css('left'))]}`)
        return true;
    }
    if(player.attr('id')==='p1'){
        let newCoordinates = [playerOneRow,playerOneCol-1];
        if(obsticlePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
            console.log(`collision detected`)
            return true;
        }
        else if(newCoordinates[0]===playerTwoRow && newCoordinates[1]===playerTwoCol){
            console.log(`collision detected`)
            return true;
        }
    }
    else{
        let newCoordinates = [playerTwoRow,playerTwoCol-1];
        if(obsticlePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
            console.log(`collision detected`)
            return true;
        }
        else if(newCoordinates[0]===playerOneRow && newCoordinates[1]===playerOneCol){
            console.log(`collision detected`)
            return true;
        }
    }
    
    return false;
}
let collisionUp = function(player){
 
    if(absoluteIllegalLocationsYAxis[parseInt(player.css('top'))]!==undefined){
        console.log(`collision detected from ${player.css('top')} wall ${absoluteIllegalLocationsYAxis[parseInt(player.css('top'))]}`)
        return true;
    }
    if(player.attr('id')==='p1'){
        let newCoordinates = [playerOneRow-1,playerOneCol];
        if(obsticlePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
            console.log(`collision detected`)
            return true;
        }
        else if(newCoordinates[0]===playerTwoRow && newCoordinates[1]===playerTwoCol){
            console.log(`collision detected`)
            return true;
        }
    }
    else{
        let newCoordinates = [playerTwoRow-1,playerTwoCol];
        if(obsticlePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
            console.log(`collision detected`)
            return true;
        }
        else if(newCoordinates[0]===playerOneRow && newCoordinates[1]===playerOneCol){
            console.log(`collision detected`)
            return true;
        }
    }

    return false;
}
let collisionDown = function(player){

    if(absoluteIllegalLocationsYAxis[parseInt(player.css('top'))+step]!==undefined){
        console.log(`collision detected from ${player.css('top')} wall ${absoluteIllegalLocationsYAxis[parseInt(player.css('top'))+step]}`)
        return true;
    }
    if(player.attr('id')==='p1'){
        let newCoordinates = [playerOneRow+1,playerOneCol];
        if(obsticlePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
            console.log(`collision detected`)
            return true;
        }
        else if(newCoordinates[0]===playerTwoRow && newCoordinates[1]===playerTwoCol){
            console.log(`collision detected`)
            return true;
        }
    }
    else{
        let newCoordinates = [playerTwoRow+1,playerTwoCol];
        if(obsticlePairs[`${newCoordinates[0]},${newCoordinates[1]}`] !== undefined){
            console.log(`collision detected`)
            return true;
        }
        else if(newCoordinates[0]===playerOneRow && newCoordinates[1]===playerOneCol){
            console.log(`collision detected`)
            return true;
        }
    }
    return false;
}



// at the moment does not work
let collisionHorizontal = function(player){
    if( collisionLeft(player) || collisionRight(player) ){
        return true;
    }
    return false;
}
let collisionVerticle = function(player){
    if(collisionDown(player) ||  collisionUp(player)){
        return true;
    }
    return false;
}





















// if players new x y coordinate is taken, cannot move
let stepRight = function(player){
    if(!collisionRight(player)){
        delete illegalLocationsXAxis[parseInt(player.css('left'))];
        player.css('left',parseInt(player.css('left'))+step);
        console.log(player.attr('id'));
        if(player.attr('id') === 'p1'){
            playerOneCol++;
        }
        else{
            playerTwoCol++;
        }
        illegalLocationsXAxis[parseInt(player.css('left'))] = parseInt(player.css('left'));
    }
}

let stepLeft = function(player){
    if(!collisionLeft(player)){
        delete illegalLocationsXAxis[parseInt(player.css('left'))];

        player.css('left',parseInt(player.css('left'))-step);
        if(player.attr('id') === 'p1'){
            playerOneCol--;
        }
        else{
            playerTwoCol--;
        }
        illegalLocationsXAxis[parseInt(player.css('left'))] = parseInt(player.css('left'));

    }
}

let stepDown = function(player){
    if(!collisionDown(player) ){
        delete illegalLocationsYAxis[parseInt(player.css('top'))];

        player.css('top',parseInt(player.css('top'))+step);
        if(player.attr('id') === 'p1'){
            playerOneRow++;
        }
        else{
            playerTwoRow++;
        }
        illegalLocationsYAxis[parseInt(player.css('top'))] = parseInt(player.css('top'));

    }
}

let stepUp = function(player){
    if(!collisionUp(player) ){
        delete illegalLocationsYAxis[parseInt(player.css('top'))];

        player.css('top',parseInt(player.css('top'))-step);
        if(player.attr('id') === 'p1'){
            playerOneRow--;
        }
        else{
            playerTwoRow--;
        }
        illegalLocationsYAxis[parseInt(player.css('top'))] = parseInt(player.css('top'));

    }
}



































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
//         rowObsticles[rc[0]] = rc[0];
//         colObsticles[rc[1]] = rc[1];
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
//         rowObsticles[rc[0]] = rc[0];
//         colObsticles[rc[1]] = rc[1];
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
//         rowObsticles[rc[0]] = rc[0];
//         colObsticles[rc[1]] = rc[1];
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
//         rowObsticles[rc[0]] = rc[0];
//         colObsticles[rc[1]] = rc[1];
//         playerTwoBombs--;
//         timer++;   //to ensure multiple bombs dont line up on the same cooldown time
//         playerTwoCooldowns[timer + cooldownTime] = rc;
//     }
    

// }





let dropBomb = function(player){
    //create a div bomb at player location absolute position
    
    bombID = '';
    if(player.hasClass('p1') && playerOneBombs> 0){
        let rc = [playerOneRow,playerOneCol]
        createBomb(rc[0],rc[1]);
        rowObsticles[rc[0]] = rc[0];
        colObsticles[rc[1]] = rc[1];
        playerOneBombs--;
        timer++;   //to ensure multiple bombs dont line up on the same cooldown time
        playerOneCooldowns[timer + cooldownTime] = rc;
        playerOneBombsInPlay++;
    }
    if(player.hasClass('p2') && playerTwoBombs> 0){
        let rc = [playerTwoRow,playerTwoCol]
        createBomb(rc[0],rc[1]);
        rowObsticles[rc[0]] = rc[0];
        colObsticles[rc[1]] = rc[1];
        playerTwoBombs--;
        timer++;   //to ensure multiple bombs dont line up on the same cooldown time
        playerTwoCooldowns[timer + cooldownTime] = rc;
        playerTwoBombsInPlay++;
    }
    

}




document.addEventListener('keyup',function (event){
    console.log(event);
    //player one controls
    if(event.key==='d'){
        stepRight($('.p1'));
    }
    if(event.key==='a'){
        stepLeft($('.p1'));
    }
    if(event.key==='s'){
        stepDown($('.p1'));
    }
    if(event.key==='w'){
        stepUp($('.p1'));
    }
    if(event.key==='x'){
        dropBomb($('.p1'));
    }

    //player two controls
    if(event.key==='ArrowRight'){
        stepRight($('.p2'));
    }
    if(event.key==='ArrowLeft'){
        stepLeft($('.p2'));
    }
    if(event.key==='ArrowDown'){
        stepDown($('.p2'));
    }
    if(event.key==='ArrowUp'){
        stepUp($('.p2'));
    }
    if(event.key==='l'){
        dropBomb($('.p2'));
    }
});












// axis should be a string: x or y
//row and col should be numbers.
// allow wraparound?
//explode for original 
// let explode = function(row, col){
//     // getPixleOriginFromRowAndCol(row, col);
    

//     console.log('boom');
//     delete colObsticles[col];
//     delete rowObsticles[row];
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
let explode = function(row, col, playerName){
    
    console.log('boom');
    console.log(`blowing up r${row}c${col}`);
    // delete colObsticles[col];
    // delete rowObsticles[row];
    delete obsticlePairs[`${row},${col}`];
    $(`#obstacler${row}c${col}`).remove();
    //create a div for the object and append to the row and col
    let $explodeCell = $('<div>',{
        id: `explosionr${row}c${col}`,
        class: 'explosion',
    });

    // destroy obstacles
    // is destroying more than what is required I wont use this
    // if(rowObsticles[row] !== undefined && colObsticles[col] !== undefined){
    //     $(`#obstacler${row}c${col}`).remove();
    // }

    // need to add to dom to manipulate location
    $('.gamebox').append($explodeCell);
    $explodeCell = $(`#explosionr${row}c${col}`);
    $explodeCell.css('left', `${(col)*40}px`);
    $explodeCell.css('top', `${(row)*40}px`);
    $explodeCell.text('x');
    //if player is in blast radius you win
    // if(playerName === 'p1'){
    //     playerOneBombsInPlay--;
    // }
    // else{
    //     playerTwoBombsInPlay--;
    // }
    if(playerTwoRow === row && playerTwoCol === col){
        console.log('Player One Wins!!!')
        $('#p2').remove();
        
    }
    if(playerOneRow === row && playerOneCol === col){
        console.log('Player Two Wins!!!')
        $('#p1').remove();
        
    }

    setTimeout(function(){$explodeCell.remove();},1000);  //delay clear for a second
}

















let refreshCooldowns = function(){
    if(playerOneCooldowns[timer]!==undefined){
        let row = playerOneCooldowns[timer][0];
        let col = playerOneCooldowns[timer][1];
        explode(row,col,'p1');
        explode(row-1,col,'p1');
        explode(row+1,col,'p1');
        explode(row+2,col,'p1');
        explode(row-2,col,'p1');
        explode(row,col-1,'p1');
        explode(row,col+1,'p1');
        explode(row,col-2,'p1');
        explode(row,col+2,'p1');
        $(`#r${row}c${col}`).remove();
        let bombID = `r${row}c${col}`;
        console.log(`Removing ${bombID}'s cooldown`);
        // $(`#${bombID}`).css('visibility', 'hidden');
        delete playerOneCooldowns[timer];
        playerOneBombs++;
        playerOneBombsInPlay--;
    }
    if(playerTwoCooldowns[timer]!==undefined){
        if(playerTwoCooldowns[timer]!==undefined){
        let row = playerTwoCooldowns[timer][0];
        let col = playerTwoCooldowns[timer][1];
        explode(row,col,'p2');
        explode(row-1,col,'p2');
        explode(row+1,col,'p2');
        explode(row+2,col,'p2');
        explode(row-2,col,'p2');
        explode(row,col-1,'p2');
        explode(row,col+1,'p2');
        explode(row,col-2,'p2');
        explode(row,col+2,'p2');
        $(`#r${row}c${col}`).remove();
        let bombID = `r${row}c${col}`;
        console.log(`Removing ${bombID}'s cooldown`);
        // $(`#${bombID}`).css('visibility', 'hidden');
        delete playerTwoCooldowns[timer];
        playerTwoBombs++;
        playerTwoBombsInPlay--;
    }
    }
}








let checkTime = function(){
    //end is 300,000ms = 5min
    //1000*60*5
    
    for(let j = 0; j*1000 < timeLimit;++j){
        let timeoutID = setTimeout(function(){
           console.log(timeoutID);
            //monitor bomb stuff
            

            refreshCooldowns();
            timer++;
            console.log(timer);
        }, j*1000);//increase the timer every second
    }
}
checkTime();