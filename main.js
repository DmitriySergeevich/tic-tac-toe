const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let arr = []
let countX = 0
let countO = 0
let countE = 0
for (var i = 0; i < 3; i++){
    arr[i] = [];
        for (var j = 0; j < 3; j++){
            arr[i][j] = null;
    }}
let stepCircle = false;

function game(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stepCircle = false;
    for (var i = 0; i < 3; i++){
            for (var j = 0; j < 3; j++){
                arr[i][j] = null;
        }}

    ctx.fillStyle = 'black'
    ctx.lineJoin="round";
    ctx.lineWidth="1";

    ctx.font = "italic 20pt Arial";
    ctx.fillText("Крестик " + countX, 620, 30);
    ctx.fillText("Нолик " + countO, 620, 60);
    ctx.fillText("Ничья " + countE, 620, 90);

    ctx.beginPath()
    ctx.rect(5,5,600,600);
    ctx.stroke();

    ctx.beginPath()
    ctx.moveTo(200,10);
    ctx.lineTo(200,600);
    ctx.stroke();

    ctx.beginPath()
    ctx.moveTo(400,10);
    ctx.lineTo(400,600);
    ctx.stroke();

    ctx.beginPath()
    ctx.moveTo(10,200);
    ctx.lineTo(600,200);
    ctx.stroke();
    
    ctx.beginPath()
    ctx.moveTo(10,400);
    ctx.lineTo(600,400);
    ctx.stroke();    

    canvas.addEventListener("click", step)
}
game()


function step(event){
    stepCircle?createCircle(event):createCross2(event)
    console.log(arr);
    
switch (gameOver()){
    case "Circle":createText("Круг win")
    canvas.removeEventListener("click", step)
    canvas.addEventListener("click", newGame)
    countO++
    break;
    case "Cross": createText("Крестик win")
    canvas.removeEventListener("click", step)
    canvas.addEventListener("click", newGame)
    countX++
    break;
    case "Error": createText("Ничья")
    canvas.removeEventListener("click", step)
    canvas.addEventListener("click", newGame)
    countE++
    break;
    default: break
}
}

function createCircle(event){
    event.stopPropagation();
    let dx = Math.trunc(event.layerX/200)
    let dy = Math.trunc(event.layerY/200)

    if(dx>2) dx = 2
    if(dy>2) dy = 2

    if(arr[dy][dx]) return

    let x = dx * 200 + 100;
    let y = dy * 200 + 100;
    arr[dy][dx] = 1

    ctx.beginPath();
    ctx.arc(x,y,77,0,2*Math.PI);
    ctx.stroke();
    stepCircle = !stepCircle  
}

function createCross2(event){
    event.stopPropagation();
    let dx = Math.trunc(event.layerX/200)
    let dy = Math.trunc(event.layerY/200)

    if(dx>2) dx = 2
    if(dy>2) dy = 2

    if(arr[dy][dx]) return
    arr[dy][dx] = 4
    let cx = 200 * dx
    let cy = 200 * dy
            ctx.beginPath()
            ctx.moveTo(cx+30,cy+30);
            ctx.lineTo(cx+180,cy+180);
            ctx.stroke();    
            ctx.beginPath()
            ctx.moveTo(cx+180,cy+30);
            ctx.lineTo(cx+30,cy+180);
            ctx.stroke();   
            stepCircle = !stepCircle    

}

function gameOver(){

    for(let i = 0; i < 3; i++ ){
        if(arr[i][0] + arr[i][1] + arr[i][2] === 3) {return "Circle"}
        else if (arr[i][0] + arr[i][1] + arr[i][2] === 12) {return "Cross"}
    }

    for(let i = 0; i < 3; i++ ){
        if(arr[0][i] + arr[1][i] + arr[2][i] === 3) {return "Circle"}
        else if (arr[0][i] + arr[1][i] + arr[2][i] === 12) {return "Cross"}
    }

    if(arr[0][0] + arr[1][1] + arr[2][2] === 3) {return "Circle"}
    else if (arr[0][0] + arr[1][1] + arr[2][2] === 12) {return "Cross"}

    if(arr[0][2] + arr[1][1] + arr[2][0] === 3) {return "Circle"}
    else if (arr[0][2] + arr[1][1] + arr[2][0] === 12) {return "Cross"}

for(let i = 0; i<3; i++){
    for(let j = 0; j< 3; j++){
        if(arr[i][j] == null) return false
    }
}
return "Error"    
}

function createText(s){
    ctx.font = "italic 90pt Arial";
    ctx.fillText(s, 50, 315);
}

function newGame(){
    console.log("Крестик: " + countX);
    console.log("Нолик: " + countO);
    console.log("Ничья: " + countE);
    game()
    canvas.removeEventListener("click", newGame)
}