

// use left and top for positioning, not bottom and right


let $playerOne = $('.p1');
let $playerTwo = $('.p2');
let playerWidth = parseInt($playerOne.css('width'));


let rightEdge = 693;
let leftEdge = 133;
let bottomEdge = 636;
let topEdge = 36;
let step = playerWidth;



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
    illegalLocationsXAxis[`${parseInt($playerTwo.css('left'))}`] = `${parseInt($playerTwo.css('left'))}`;

    //player two location top
    illegalLocationsYAxis[`${parseInt($playerTwo.css('top'))}`] = `${parseInt($playerTwo.css('top'))}`;

    
    //player one location left
    illegalLocationsXAxis[`${parseInt($playerOne.css('left'))}`] = `${parseInt($playerOne.css('left'))}`;

    // //player one location top
    illegalLocationsYAxis[`${parseInt($playerOne.css('top'))}`] = `${parseInt($playerOne.css('top'))}`;
}
initializeIllegalLocation();





// at the moment only wall collisison detection works propperly
// need to get object collision detection
let collisionRight = function(player){
    // if(illegalLocationsXAxis[parseInt(player.css('left'))+step]!==undefined){
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

        illegalLocationsXAxis[parseInt(player.css('left'))] = parseInt(player.css('left'));
    }
}

let stepLeft = function(player){
    if(!collisionLeft(player)){
        delete illegalLocationsXAxis[parseInt(player.css('left'))];

        player.css('left',parseInt(player.css('left'))-step);

        illegalLocationsXAxis[parseInt(player.css('left'))] = parseInt(player.css('left'));

    }
}

let stepDown = function(player){
    if(!collisionDown(player) ){
        delete illegalLocationsYAxis[parseInt(player.css('top'))];

        player.css('top',parseInt(player.css('top'))+step);

        illegalLocationsYAxis[parseInt(player.css('top'))] = parseInt(player.css('top'));

    }
}

let stepUp = function(player){
    if(!collisionUp(player) ){
        delete illegalLocationsYAxis[parseInt(player.css('top'))];

        player.css('top',parseInt(player.css('top'))-step);
        illegalLocationsYAxis[parseInt(player.css('top'))] = parseInt(player.css('top'));

    }
}




let dropBomb = function(player){
    //create a div bomb at player location absolute position
    $('<div>',{
        position: 'absolute', 
        left:`${player.css('left')}`, 
        top: `${player.css('top')}`, 
        background: 'black',
        border: '1px solid black',
        width: `${parseInt(player.css('width'))}`,
        height: `${parseInt(player.css('width'))}`,
    });

}




document.addEventListener('keyup',function (event){
    console.log(event);
    //player one controls
    if(event.key==='d'){
        stepRight($playerOne);
    }
    else if(event.key==='a'){
        stepLeft($playerOne);
    }
    else if(event.key==='s'){
        stepDown($playerOne);
    }
    else if(event.key==='w'){
        stepUp($playerOne);
    }

    //player two controls
    else if(event.key==='ArrowRight'){
        stepRight($playerTwo);
    }
    else if(event.key==='ArrowLeft'){
        stepLeft($playerTwo);
    }
    else if(event.key==='ArrowDown'){
        stepDown($playerTwo);
    }
    else if(event.key==='ArrowUp'){
        stepUp($playerTwo);
    }
});