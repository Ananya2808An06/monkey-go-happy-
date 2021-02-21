var PLAY=0;
var END=1;
var gameState=PLAY
var monkey , monkey_running,monkey_running2
var banana ,bananaImage,bananasGroup, obstacle, obstacleImage
var FoodGroup, obstaclesGroup,spawnObstacles;
var score
var invisibleground
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png" 
                                           )
  monkey_running2=loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(400,400);
  monkey=createSprite(100,200,20,20);
monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
monkey.setCollider("rectangle",0,0,400,monkey.height);
  monkey.debug = false
ground=createSprite(10,240,500,20);
  ground.velocityX=-4
  ground.x=ground.width/2;
  ground.shapeColor="brown"
  console.log(ground.x)
invisibleground=createSprite(20,240,500,20);
  invisibleground.visible=false;


  ObstaclesGroup=createGroup();
   bananasGroup=new Group();
ObstaclesGroup=new Group();
   bananasGroup=new Group();}
score=0;
  

function draw() {
background("white")
  
  stroke("black")
  textSize(20);
  fill("black");
  text("SCORE(survivalTime) : "+ score,100,50);
  
 // stroke("black");
  //textSize(20);
  //fill("Black");
  //survivalTime=Math.ceil(frameCount/frameRate());
  //text("SurvivalTime :"+survivalTime,100,50)
  
  
  
  
  if (gameState===PLAY){if(keyDown("space") && monkey.y>=159){
 monkey.velocityY=-13; 
  }
  monkey.velocityY = monkey.velocityY +0.8;
  
  if(ground.x<350){
    ground.x=ground.width/2;
  }
spwanObstacles();
  spwanBananas();
    if(ObstaclesGroup.isTouching(monkey)){
      gameState=END;
   monkey.addAnimation("moving",monkey_running2)
    }                 
   if(bananasGroup.isTouching(monkey)){
      bananasGroup.destroyEach();
     score=score+1; }                   
                       
               }

  
  
  else if(gameState===END){
  ObstaclesGroup.setVelocityXEach(0);
  bananasGroup.setVelocityXEach(0);
  ground.velocityX=0;
    monkey.velocityX=0
  text("PRESS R TO RESTART ",100,100)
 
  }
if(keyDown("R") && gameState===END){
  reset();
}
  
  monkey.collide(invisibleground);
  
  drawSprites ();

}

function spwanObstacles(){
  if(frameCount%100 === 0){
  obstacles=createSprite(400,215,20,20); 
    obstacles.addImage(obstacleImage);
 obstacles.scale=0.1
 obstacles.velocityX=-(4+score/5);

    ObstaclesGroup.add(obstacles);}
  
  }
function spwanBananas(){
  if(frameCount%80 === 0){
  bananas=createSprite(400,215,20,20); 
    bananas.addImage(bananaImage);
bananas.scale=0.1
 bananas.velocityX=-(4+score/5);
    bananas.y=Math.round(random(50,150));

    bananasGroup.add(bananas);}
  
  }
function reset(){
 gameState=PLAY; 
  ObstaclesGroup.destroyEach();
//survivalTime=0;
  score= 0
 monkey.addAnimation("moving",monkey_running);
}



