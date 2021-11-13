quick_draw_data_set = ['boat','Eye','Skull','Airplane','Alarm Clock','Ambulance','Basketball','Boomerang','Calender','Crayon','Sofa','Cat','Apple','Arm','Anvil','Wallnut','Bread','Violin','Church','Book','Ice-Cream','Drum','Fork','Frog','Turtle','Bow','Bracelet','Camel','Camera','Hat','Porcupine','Headphones','Crab','Ear','Duck','Dumble','Megaphone','Fish','Giraffe','Hotdog','Flower','Street Lamp','Burger','Knife','Ladder','Shirt','Hammer and nail','UFO','Hexagon','Face','Feather','Chair','Cellphone','Hand','Key','Kangaroo','Keyboard','Doughnut','Dolphin','Flippers','Bus'];
random_no = Math.floor((Math.random()*quick_draw_data_set.length)+1);
console.log(quick_draw_data_set[random_no]);
sketch= quick_draw_data_set[random_no];
document.getElementById("to_be_drawn").innerHTML = "Sketch To be drawn: " + sketch;
timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;

function updateCanvas(){
background = "white";
random_no = Math.floor((Math.random()*quick_draw_data_set.length)+1);
console.log(quick_draw_data_set[random_no]);
sketch= quick_draw_data_set[random_no];
document.getElementById("to_be_drawn").innerHTML = "Sketch To be drawn: " + sketch;
}
function preload(){
classifier = ml5.imageClassifier('DoodleNet');
}

function setup(){
canvas = createCanvas(280,280);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas);
}
    
function clear_canvas(){
background("white");
}
function draw(){
strokeWeight(10);
stroke(0);
if(mouseIsPressed){
    line(pmouseX, pmouseY, mouseX, mouseY);
}
check_sketch()
if(drawn_sketch == sketch){
    answer_holder = 'set';
    score++;
    document.getElementById("score").innerHTML = 'Score: ' + score;
}
}

function classifyCanvas(){
classifier.classify(canvas,gotResult);
}

function gotResult(error,results){
if(error){
console.error(error);
}
console.log(results);
drawn_sketch = results[0].label;
document.getElementById('label').innerHTML = 'Your Sketch - ' +  drawn_sketch;
}

function check_sketch(){
    timer_counter++;
    document.getElementById("timer").innerHTML = 'Timer: ' + timer_counter;
    console.log(timer_counter);
    if(timer_counter > 400){
        timer_counter = 0;
        timer_check = 'Completed';
    }
    if(timer_check == 'Completed' || answer_holder == "set"){
         answer_holder = "";
         timer_check = "";
         updateCanvas();
    }
}