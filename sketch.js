var START=0;
var PLAY=1;
var END=2;
var WIN=3;
var gameState=START;
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground;
var startImg,block,imageImg,imgImage,gameStartImg,endImg;
var startMusic,music,winMusic,endMusic;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("Images/Cargo-Plane.png");
	packageIMG=loadImage("Images/package.png"); 
	startMusic=loadSound("Sounds/startMusic.mp3"); 
	music=loadSound("Sounds/music.mp3");  
	winMusic=loadSound("Sounds/mission passed.wav");
	endMusic=loadSound("Sounds/mission failed.mp3");
	startImg=loadImage("Images/background.jpg"); 
	gameStartImg=loadImage("Images/game start img.jpg");
	imageImg=loadImage("Images/image.png");
	imgImage=loadImage("Images/mission failed.jpg");
	endImg=loadImage("Images/mission completed.png");
}


function setup() {     
	createCanvas(800, 700); 
	rectMode(CENTER);

	block=createSprite(400,200,10000,10000);
	block.visible=false;

	helicopterSprite=createSprite(-50, 100, 10,10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale=0.6;

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale=0.2;
	packageSprite.visible=false;
                                                    
	groundSprite=createSprite(width/2, height-85, width,10);
	groundSprite.shapeColor=color("black");


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.4, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

 	boxPosition=width/2-100;
 	boxY=560;


 	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);

 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor=color(255,0,0);

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxRightSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxRightSprite.shapeColor=color(255,0,0);

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);

	Engine.run(engine);
	Matter.Body.translate(packageBody, {x:-20,y:0});

}

function draw() {
  rectMode(CENTER);
  if(gameState==START){
    background(gameStartImg);
	if(frameCount==20){
        startMusic.play();
	}
	helicopterSprite.visible=false;
	packageSprite.visible=false;
	boxleftSprite.visible=false;
	boxBase.visible=false;
	boxRightSprite.visible=false;
	groundSprite.visible=false;
	if(mousePressedOver(block)){
		gameState=PLAY;
		startMusic.stop();
		music.play();
		helicopterSprite.visible=true;
	    boxleftSprite.visible=true;
	    boxBase.visible=true;
	    boxRightSprite.visible=true;
	    groundSprite.visible=true;
		helicopterSprite.velocityX=2;
	}
  }
  if(gameState==PLAY){
  background(startImg);
  packageSprite.x= packageBody.position.x ;
  packageSprite.y= packageBody.position.y ;
  console.log(packageSprite.y,helicopterSprite.x);
  keyPressed();
  if(packageSprite.y>570 && helicopterSprite.x>720){
     gameState=WIN;
	 music.stop();
	 helicopterSprite.velocityX=0.4;
	 winMusic.play();
  }
  if(packageSprite.y==200 && helicopterSprite.x>860){
	  background("black")
	  gameState=END
	  music.stop();
	  endMusic.play();
	  helicopterSprite.visible=false;
	  helicopterSprite.velocityX=0;
	  block.x=400;
	  block.y=350;
	  block.addImage(imgImage);
	  block.visible=true;
	  block.scale=1.2
      boxleftSprite.visible=false;
	  boxBase.visible=false;
	  boxRightSprite.visible=false;
  }
}
  if(gameState==WIN){
	 block.visible=true;
     block.addImage(imageImg);
	 background(startImg);
	 if(helicopterSprite.x>875){
		 background(endImg);
		 block.visible=false;
		 boxleftSprite.visible=false;
	     boxBase.visible=false;
	     boxRightSprite.visible=false;
		 packageSprite.visible=false;
		 groundSprite.visible=false;
	 }
  }
  
  drawSprites();
	
}


function keyPressed(){
	if(keyDown(DOWN_ARROW) && helicopterSprite.x>350 && helicopterSprite.x<700){
		packageSprite.visible=true;
		Matter.Body.setStatic(packageBody,false);
	}
}
