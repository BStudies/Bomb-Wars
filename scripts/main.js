

// use left and top for positioning, not bottom and right


let $playerOne = $('.p1');
let $playerTwo = $('.p2');
let playerWidth = parseInt($playerOne.css('width'));
// let rightEdge = parseInt($('.gamebox').css('width')) - playerWidth
let rightEdge = 693;
let leftEdge = 133;
// let bottomEdge = parseInt($('.gamebox').css('height')) - playerWidth
let bottomEdge = 596;
// let topEdge = 0;
let topEdge = 36;
let step = 40;
// keep updating this list every movement to make quicker collision detection
let illegalLocations = {
    leftEdge: `${leftEdge}`,
    rightEdge: `${rightEdge}`,
    bottomEdge: `${bottomEdge}`,
    topEdge: `${topEdge}`,
    playerTwoLocationLeft: `${parseInt($playerTwo.css('left'))}`,                //player two location left
    playerTwoLocationRight: `${parseInt($playerTwo.css('left'))+playerWidth}`,  //player two location right
    playerTwoLocationTop: `${parseInt($playerTwo.css('top'))}`,                  //player two location top
    playerTwoLocationBot: `${parseInt($playerTwo.css('top'))+playerWidth}`,       //player two location bottom
    playerOneLocationLeft: `${parseInt($playerOne.css('left'))}`,               //player one location left
    playerOneLocationRight: `${parseInt($playerOne.css('left'))+playerWidth}`,      //player one location right
    playerOneLocationTop: `${parseInt($playerOne.css('top'))}`,                     //player one location top
    playerOneLocationBot: `${parseInt($playerOne.css('top'))+playerWidth}`,         //player one location bottom

};



let initializePlayerillegalLocation = function(){
    //player two location left
    illegalLocations[`${parseInt($playerTwo.css('left'))}`] = `${parseInt($playerTwo.css('left'))}`;
    //player two location right
    illegalLocations[`${parseInt($playerTwo.css('left'))+playerWidth}`] = `${parseInt($playerTwo.css('left'))+playerWidth}`;
    //player two location top
    illegalLocations[`${parseInt($playerTwo.css('top'))}`] = `${parseInt($playerTwo.css('top'))}`;
    //player two location bottom
    illegalLocations[`${parseInt($playerTwo.css('top'))+playerWidth}`] = `${parseInt($playerTwo.css('top'))+playerWidth}`;
    
    //player one location left
    illegalLocations[`${parseInt($playerOne.css('left'))}`] = `${parseInt($playerOne.css('left'))}`;
    //player one location right
    illegalLocations[`${parseInt($playerOne.css('left'))+playerWidth}`] = `${parseInt($playerOne.css('left'))+playerWidth}`;
    //player one location top
    illegalLocations[`${parseInt($playerOne.css('top'))}`] = `${parseInt($playerOne.css('top'))}`;
    //player one location bottom
    illegalLocations[`${parseInt($playerOne.css('top'))+playerWidth}`] = `${parseInt($playerOne.css('top'))+playerWidth}`;

}
initializePlayerillegalLocation();



let detectCollisionRight = function(player){
    if(illegalLocations[parseInt(player.css('left')+step)]!==undefined){
        return false;
    }
    return true;
}
let detectCollisionLeft = function(player){
    if(illegalLocations[parseInt(player.css('left')+step)]!==undefined){
        return false;
    }
    return true;
}
let detectCollisionUp = function(player){
    if(illegalLocations[parseInt(player.css('left')+step)]!==undefined){
        return false;
    }
    return true;
}
let detectCollisionDown = function(player){
    if(illegalLocations[parseInt(player.css('left')+step)]!==undefined){
        return false;
    }
    return true;
}
let detectCollision = function(player){
    if(detectCollisionDown(player) || detectCollisionLeft(player) || detectCollisionRight(player) || detectCollisionUp(player)){
        return true;
    }
    return false;
}








let stepRight = function(player){
    if(!detectCollision(player)){
        delete illegalLocations[player.css('left')];
        player.css('left',parseInt(player.css('left'))+step);
        illegalLocations[player.css('left')] = player.css('left');
    }
}

let stepLeft = function(player){
    if(!detectCollision(player)){
        delete illegalLocations[player.css('left')];
        player.css('left',parseInt(player.css('left'))-step);
        illegalLocations[player.css('left')] = player.css('left');
    }
}

let stepDown = function(player){
    if(!detectCollision(player)){
        delete illegalLocations[player.css('top')];
        player.css('top',parseInt(player.css('top'))+step);
        illegalLocations[player.css('top')] = player.css('top');
    }
}

let stepUp = function(player){
    if(!detectCollision(player)){
        delete illegalLocations[player.css('top')];
        player.css('top',parseInt(player.css('top'))-step);
        illegalLocations[player.css('top')] = player.css('top');
    }
}









document.addEventListener('keyup',function (event){
    console.log(event);
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