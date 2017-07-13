

// use left and top for positioning, not bottom and right

let playerOneBombs = 3;
let playerTwoBombs = 3;
let playerOneCooldowns = {};
let playerTwoCooldowns = {};
let cooldownTime = 2;        //2 sec

let playerOneRow = 0;
let playerOneCol = 0;
let playerTwoRow = 0;
let playerTwoCol = 14;
let timer = 0;
let playerWidth = parseInt($('.p1').css('width'));


let rightEdge = 600;
let leftEdge = 0;
let bottomEdge = 600;
let topEdge = 0;
let step = playerWidth;

let timeLimit = 300000;



// keep updating this list every movement to make quicker collision detection
let absoluteIllegalLocationsYAxis = {}
let absoluteIllegalLocationsXAxis = {}
let illegalLocationsXAxis = {};
let illegalLocationsYAxis = {};








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
let initializeAllBombs = function(){
    for(let j = 0; j < playerTwoCol+1; ++j){
        for(let k = 0; k < playerTwoCol+1; ++k){
            $('.gamebox').append($('<div>',{
            class: 'gameBomb clearfix sphere',
            id: `r${j}c${k}`,
            }));
        }
    }
    
}
initializeAllBombs();














let getPixleOriginFromRowAndCol = function(row, col){
    return [row*playerWidth,playerWidth*col];
}















// at the moment only wall collisison detection works propperly
// need to get object collision detection
let collisionRight = function(player){
    // if(illegalLocationsXAxis[parseInt(player.css('left'))+step]!==undefined
    // &&illegalLocationsYAxis[parseInt(player.css('top'))]!==undefined){
    //     console.log(`collision detected with object from ${player.css('left')} ${illegalLocationsXAxis[parseInt(player.css('left'))+step]}`);
    //     return true;
    // }
    if(absoluteIllegalLocationsXAxis[parseInt(player.css('left'))+step]!==undefined){
        console.log(`collision detected from ${player.css('left')} wall ${absoluteIllegalLocationsXAxis[parseInt(player.css('left'))+step]}`)
        return true;
    }
    return false;
}
let collisionLeft = function(player){
    // if(illegalLocationsXAxis[parseInt(player.css('left'))]!==undefined){
    //     console.log(`collision detected with object from ${player.css('left')} ${illegalLocationsXAxis[parseInt(player.css('left'))]}`)
    //     return true;
    // }
    if(absoluteIllegalLocationsXAxis[parseInt(player.css('left'))]!==undefined){
        console.log(`collision detected at wall from ${player.css('left')} ${absoluteIllegalLocationsXAxis[parseInt(player.css('left'))]}`)
        return true;
    }
    return false;
}
let collisionUp = function(player){
    // if(illegalLocationsYAxis[parseInt(player.css('top'))]!==undefined){
    //     console.log(`collision detected with object from ${player.css('top')} ${illegalLocationsYAxis[parseInt(player.css('top'))]}`)
    //     return true;
    // }
    if(absoluteIllegalLocationsYAxis[parseInt(player.css('top'))]!==undefined){
        console.log(`collision detected from ${player.css('top')} wall ${absoluteIllegalLocationsYAxis[parseInt(player.css('top'))]}`)
        return true;
    }
    return false;
}
let collisionDown = function(player){
    // if(illegalLocationsYAxis[parseInt(player.css('top'))+step]!==undefined){
    //     console.log(`collision detected with object from ${player.css('top')} ${illegalLocationsYAxis[parseInt(player.css('top'))+step]}`)
    //     return true;
    // }
    if(absoluteIllegalLocationsYAxis[parseInt(player.css('top'))+step]!==undefined){
        console.log(`collision detected from ${player.css('top')} wall ${absoluteIllegalLocationsYAxis[parseInt(player.css('top'))+step]}`)
        return true;
    }
    return false;
}



// at the moment does not work
let collision = function(player){
    if(collisionDown(player) || collisionLeft(player) || collisionRight(player) || collisionUp(player)){
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


























// let dropBomb = function(player){
//     //create a div bomb at player location absolute position
//     bombID = ''
//     if(player.hasClass('p1') && playerOneBombs > 0){
//         console.log($('.p1').css('left'))
//         bombID = `p1b${playerOneBombs.pop()}`;
//         console.log(`dropping bomb ${bombID}`);
//         $('.gamebox').append($('<div>',{
//         width: `${parseInt($('.p1').css('width'))}`,
//         height: `${parseInt($('.p1').css('width'))}`,
//         class: 'bomb clearfix',
//         left: `${parseInt($('.p1').css('left'))+playerWidth}`,
//         top: `${parseInt($('.p1').css('top'))+playerWidth}`,
//         id: `${bombID}`,
//         position: 'inherit',
//         }));
//     }
//     else if (player.hasClass('p2') && playerTwoBombs > 0){
//         bombID = `p2b${playerTwoBombs.pop()}`;
//         console.log(`dropping bomb ${bombID}`);
//         $('.gamebox').append($('<div>',{
//         width: `${parseInt($('.p2').css('width'))}`,
//         height: `${parseInt($('.p2').css('width'))}`,
//         class: 'bomb clearfix',
//         left: `${parseInt($('.p2').css('left'))}`,
//         top: `${parseInt($('.p2').css('top'))}`,
//         id: `${bombID}`,
//         position: 'inherit',
//         }));
//     }


//     //this is not occuring ..
//     console.log(`Moving ${bombID}`);
//     // let $bomb = $(`#${bombID}`);
//     // $bomb.css('left',`${parseInt(player.css('left'))+playerWidth}`);
//     // $bomb.css('top',`${parseInt(player.css('top'))+playerWidth}`);
//     // let bomb = document.querySelector(`#${bombID}`);
//     // bomb.setAttribute('left', `${parseInt($('.p2').css('left'))}`)
//     // bomb.setAttribute('top', `${parseInt($('.p2').css('top'))}`)

    

// }








// if div is already there
let dropBomb = function(player){
    //create a div bomb at player location absolute position
    
    bombID = '';
    if(player.hasClass('p1') && playerOneBombs> 0){
        console.log('test');
        let rc = [playerOneRow,playerOneCol]
        let $bombID = `#r${rc[0]}c${rc[1]}`;
        // document.querySelector(`#${rc}`)
        console.log(`#${rc[0]}${rc[1]}`);
        $($bombID).css('visibility','visible');
        $($bombID).css('translateZ','1');
        let rcLeft = playerOneRow*playerWidth;
        let rcTop = playerOneRow*playerWidth;
        illegalLocationsXAxis[rcLeft] = rcLeft;
        illegalLocationsYAxis[rcTop] = rcTop;
        playerOneBombs--;
        timer++;   //to ensure multiple bombs dont line up on the same cooldown time
        playerOneCooldowns[timer + cooldownTime] = rc;
    }
    if(player.hasClass('p2') && playerTwoBombs > 0){
        console.log('test');
        let rc = [playerTwoRow,playerTwoCol]
        let $bombID = `#r${rc[0]}c${rc[1]}`;
        // document.querySelector(`#${rc}`)
        console.log(`#${rc[0]}${rc[1]}`);
        $($bombID).css('visibility','visible');
        $($bombID).css('translateZ','1');
        let rcLeft = playerTwoRow*playerWidth;
        let rcTop = playerTwoRow*playerWidth;
        illegalLocationsXAxis[rcLeft] = rcLeft;
        illegalLocationsYAxis[rcTop] = rcTop;
        playerTwoBombs--;
        timer++;   //to ensure multiple bombs dont line up on the same cooldown time
        playerTwoCooldowns[timer + cooldownTime] = rc;
    }
    

}







document.addEventListener('keyup',function (event){
    console.log(event);
    //player one controls
    if(event.key==='d'){
        stepRight($('.p1'));
    }
    else if(event.key==='a'){
        stepLeft($('.p1'));
    }
    else if(event.key==='s'){
        stepDown($('.p1'));
    }
    else if(event.key==='w'){
        stepUp($('.p1'));
    }
    else if(event.key==='x'){
        dropBomb($('.p1'));
    }

    //player two controls
    else if(event.key==='ArrowRight'){
        stepRight($('.p2'));
    }
    else if(event.key==='ArrowLeft'){
        stepLeft($('.p2'));
    }
    else if(event.key==='ArrowDown'){
        stepDown($('.p2'));
    }
    else if(event.key==='ArrowUp'){
        stepUp($('.p2'));
    }
    else if(event.key==='l'){
        dropBomb($('.p2'));
    }
});












// axis should be a string: x or y
//row and col should be numbers.
// allow wraparound?
let explode = function(row, col){
    // getPixleOriginFromRowAndCol(row, col);
    

    console.log('boom');
    let $bombID = $(`#r${row}c${col}`);
    $bombID.css('background','white');
    $bombID.css('visibility','visible');
    $bombID.css('color','black');
    $bombID.text('x');
    $bombID.css('font-size','33px');

    //if player is in blast radius you win
    if(playerTwoRow === row && playerTwoCol === col){
        console.log('Player One Wins!!!')
        $('#p2').remove();
        timeLimit = 0;
    }
    if(playerOneRow === row && playerOneCol === col){
        console.log('Player Two Wins!!!')
        $('#p1').remove();
        timeLimit = 0;
    }

    setTimeout(function(){$($bombID).css('visibility', 'hidden');},1000);  //delay clear for a second

    // if(axis === 'x'){
    //     for(let j = row; j > row-2; --row){
    //         console.log('boom');
    //         let $bombID = $(`#r${j}c${col}`);
    //         $bombID.css('background','white');
    //         $bombID.css('color','black');
    //         $bombID.text('x');
    //         $bombID.css('font-size','33px');
    //     }
    //     for(let j = row; j < row+2; ++row){
    //         let $bombID = `#r${j}c${col}`;
    //         $bombID.css('background','white');
    //         $bombID.css('color','black');
    //         $bombID.text('x');
    //         $bombID.css('font-size','33px');
    //     }
    // }
    

}


















let refreshCooldowns = function(){
    if(playerOneCooldowns[timer]!==undefined){
        let row = playerOneCooldowns[timer][0];
        let col = playerOneCooldowns[timer][1];
        explode(row,col);
        explode(row-1,col);
        explode(row+1,col);
        explode(row+2,col);
        explode(row-2,col);
        explode(row,col-1);
        explode(row,col+1);
        explode(row,col-2);
        explode(row,col+2);

        let bombID = `r${row}c${col}`;
        console.log(`Removing ${bombID}'s cooldown`);
        // $(`#${bombID}`).css('visibility', 'hidden');
        delete playerOneCooldowns[timer];
        playerOneBombs++;
    }
    if(playerTwoCooldowns[timer]!==undefined){
        if(playerTwoCooldowns[timer]!==undefined){
        let row = playerTwoCooldowns[timer][0];
        let col = playerTwoCooldowns[timer][1];
        explode(row,col);
        explode(row-1,col);
        explode(row+1,col);
        explode(row+2,col);
        explode(row-2,col);
        explode(row,col-1);
        explode(row,col+1);
        explode(row,col-2);
        explode(row,col+2);

        let bombID = `r${row}c${col}`;
        console.log(`Removing ${bombID}'s cooldown`);
        // $(`#${bombID}`).css('visibility', 'hidden');
        delete playerTwoCooldowns[timer];
        playerTwoBombs++;
    }
    }
}








let checkTime = function(){
    //end is 300,000ms = 5min
    //1000*60*5
    
    for(let j = 0; j*1000 < timeLimit;++j){
        setTimeout(function(){
           
            //monitor bomb stuff
            

            refreshCooldowns();
            timer++;
            console.log(timer);
        }, j*1000);//increase the timer every second
    }
}
checkTime();