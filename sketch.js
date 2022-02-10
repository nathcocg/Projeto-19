var rocket, star, ovni, space, restart;
var rocketImg, starImg, ovniImg, spaceImg, restartImg;
var gStars, gOvnis;
var JOGAR = 1; var ENCERRAR = 0;
var gameState = JOGAR;
var points = 0;


function preload () {
 rocketImg = loadImage("rocket.png");
 starImg = loadImage("star.png");
 ovniImg = loadImage("ovni.png");
 spaceImg = loadImage("space.png");
 restartImg = loadImage("restart.png");
}

function setup () {
 createCanvas(600,400);
 space = createSprite(300,200);
 space.addImage(spaceImg);
 space.scale = 1.1;
 space.velocityY=1;

 rocket = createSprite(250,100,5,15);
 rocket.addImage(rocketImg);
 rocket.scale = 0.03;
 gStars = new Group();
 gOvnis = new Group();

 restart = createSprite(290,200);
 restart.addImage(restartImg);
 restart.visible = false;
 restart.scale=0.2;

}

function draw() {
    if (gameState === JOGAR){
        rocket.visible = true;
        restart.visible = false;
        spaceImg.velocity = 0.15;

        if(space.y>400){
            space.y= height/2;
        }
            

        if(keyDown("right")){
            rocket.x = rocket.x+3;
        }
        if(keyDown("left")){
            rocket.x = rocket.x-3;
        }
        if(keyDown("space")){
            rocket.velocityY = -10;
        }
        rocket.velocityY = rocket.velocityY +0.8;
     
        if (gStars.collide(rocket)){
            points = points +10;
            star.destroy();
        }
        if(gOvnis.collide(rocket)){
            points = points-10;
            ovni.destroy();
        }
            
        if (points===50 || points===-50){
            gameState = ENCERRAR;
        }
    }    

 if (gameState === ENCERRAR){
     rocket.visible = false;
     restart.visible = true;
     gStars.destroyEach();
     gOvnis.destroyEach();
     space.y=200;
     spaceImg.velocityY = 0;
     gStars.setLifetimeEach(-1);
     gOvnis.setLifetimeEach(-1);

     if(mousePressedOver(restart)){
         reset();
     }
    }

 createStars();

 drawSprites();
 fill("white");
 textSize(10);
 text("Points: "+points,10,380);
}

function createStars(){
    if(frameCount%200==0){
        star = createSprite(200,-50);
        star.addImage(starImg);
        star.scale = 0.04;
        star.x = Math.round(random(50,350));
        star.velocityY = 1.3;
        star.lifetime = 600/1;

        ovni = createSprite(200,-50);
        ovni.addImage(ovniImg);
        ovni.scale = 0.06;
        ovni.x = Math.round(random(50,350));
        ovni.velocityY = 1.3;
        ovni.lifetime = 600/1.5;
        
        gStars.add(star);
        gOvnis.add(ovni);
    }
}

function reset(){
    gameState = JOGAR;
    rocket.visible = true;
    rocket.x = 250;
    rocket.y = 100;
    points = 0;

}


