var airballoon,database,position;

var airballonimg,backgroundimg;

function preload(){
    airballonimg = loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon03.png")
    backgroundimg = loadImage("Images/cityImage.png");
}
function setup(){
    createCanvas(800,800);
    database=firebase.database();
    airballoon = createSprite(250,250,50,50);
    airballoon.addAnimation("riding",airballonimg);
    airballoon.scale = 0.2;

    database.ref("balloon/height").on("value",readposition);
}

function draw(){
    background(backgroundimg);
    if(position!=undefined){

    
    if(keyDown(LEFT_ARROW)){
        updateHeight(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        updateHeight(1,0);
    }
    else if(keyDown(UP_ARROW)){
        updateHeight(0,-1); 
    }
    else if(keyDown(DOWN_ARROW)){
        updateHeight(0,+1);
    }
    drawSprites();
}

}

function updateHeight(x,y){
    database.ref("balloon/height").set({
        "x": position.x+x,
        "y": position.y+y
    })
    
}
function readposition(data){
    position=data.val();
    airballoon.x=position.x;
    airballoon.y=position.y;
}