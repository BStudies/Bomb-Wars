let $playerOne = $('.p1');
let $playerTwo = $('.p2');
let playerOneWidth = parseInt($playerOne.css('width'));
let rightEdge = parseInt($('.gamebox').css('width')) - playerOneWidth
let leftEdge = 0;
let bottomEdge = parseInt($('.gamebox').css('height')) - playerOneWidth
let topEdge = 0;
let step = 20;
// keep updating this list every movement to make quicker collision detection
let illegalLocations = {
    leftEdge: `${leftEdge}`,
    rightEdge: `${rightEdge}`,
    bottomEdge: `${bottomEdge}`,
    topEdge: `${topEdge}`,
    // playerTwoLocationX: ,

};

let detectCollision = function(){

}

let stepRight = function(player){
    if(parseInt(player.css('left')+step) < rightEdge){
        player.css('left',parseInt(player.css('left'))+step);
    }
}

let stepLeft = function(player){
    if(parseInt(player.css('left')+step) > leftEdge){
        player.css('left',parseInt(player.css('left'))-step);
    }
}

let stepDown = function(player){
    if(parseInt(player.css('top')+step) < bottomEdge){
        player.css('top',parseInt(player.css('top'))+step);
    }
}

let stepUp = function(player){
    if(parseInt(player.css('top')+step) > topEdge){
        player.css('top',parseInt(player.css('top'))-step);
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