var dog, happydog, dogImage, dogImage1, database;
var foodS, foodStock;

function preload()
{
dogImage = loadImage("images/dogImg.png");
dogImage1 = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  dog = createSprite(250,300,150,150);
  dog.addImage(dogImage);
  dog.scale = 0.15;
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
 background("green");
 if(keyWentDown(UP_ARROW)){
   writeStock(foodS);
   dog.addImage(dogImage1);
 }
   
  drawSprites();
  
  fill("brown");
  text("Food Remaining" + foodS, 170,200);
  text("Note:Press Up Arrow key to Feed Drago Milk",130,10,300,20);

}

function readStock(data){
foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;

  }else{
    x = x-1
  }
  database.ref('/').update({
    Food:x
  })
}
