// constants
let inputDir = {x:0,y:0}
const musicsound = new Audio('sounds/music.mp3')
const OverSound = new Audio('sounds/over.mp3')
const move = new Audio('sounds/move.mp3')
const foodSound = new Audio('sounds/food.mp3')
let speed = 8;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:13,y:15}]
food =  {x:7,y:8}


function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed){
        return; 
    }
    lastPaintTime = ctime;
    gameEngine();
    // console.log(ctime)
    musicsound.play();
}
function isCollapse(snake){
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x ===snake[0].x && snake[i].y ===snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0){
        return true;
    }
  return false;
}
function gameEngine(){
if(isCollapse(snakeArr)){
    OverSound.play();
    musicsound.pause();
    inputDir={x:0,y:0}
    alert("Game Over !...Press any key to play agian.")
    snakeArr=[{x:13,y:15}]
    musicsound.play();
    score = 0;

}
    //if fpod eaten
     if (snakeArr[0].y===food.y && snakeArr[0].x ===food.x){
        score += 1;
        scoreBox.innerHTML="Score : "+score;
        foodSound.play()
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y})
        let a = 2;
        let b= 18;
        food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
     }

    //  snake move 
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] ={...snakeArr[i]}
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    board.innerHTML ="";
    //snake 
        snakeArr.forEach((e,index)=> {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    });
    // food
        foodElement = document.createElement('div')
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}

// logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = {x:0,y:1}
    move.play()
   switch (e.key) {
    case "ArrowUp":
        inputDir.x=0;
        inputDir.y=-1;
        console.log("Arrowup")
        break;
    case "ArrowDown":
        inputDir.x=0;
        inputDir.y=1;
        console.log("Arrowdown")
        break;
    case "ArrowLeft":
        inputDir.x=-1;
        inputDir.y=0;
        console.log("Arrowleft")
        break;
    case "ArrowRight":
        inputDir.x=1;
        inputDir.y=0;
        console.log("Arrowright")
        break;
   
    default:
        break;
   }

})