x = 0;
y = 0;

screen_width = 0;
screen_height = 0;

draw_apple = "";

apple = "";
speak_data = "";
to_number = 0;

function preload (){
    apple = loadImage("apple.png");
}

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start(){
    document.getElementById("status").innerHTML = "O istema está ouvindo. Por favor, fale.";
    recognition.start();
}

recognition.onresult = function(event){
    console.log(event);

    content = event.reults[0][0].trancript;

    document.getElementById("status").innerHTML = "A fala foi reconhecida: " + content;
    to_number = Number(content);
    if(Number.isInteger(to_number)){
        document.getElementById("status").innerHTML = "A maçã começou a ser desenhada.";
        draw_apple = "set";
    }
    else{
        document.getElementById("status").innerHTML = "O número não fo reconhecido";
    }

}

function setup(){
    screen_width = window.innerWidth;
    screen_height = window.innerHeight;

    canvas = createCanvas(screen_width, screen_height-150);
    canvas.position(0, 150);
}

function draw(){
    if(draw_apple == "set"){
        for(var i = i ; 1 <= to_number; i++){
            x = Math.floor(Math.random() * 700);
            y = Math.floor(Math.random() * 400);
            Image(apple, x, y, 50, 50);
        }
        document.getElementById("status").innerHTML = to_number + "maçãs desenhadas";
        speak_data = to_number + "maçãs desenhadas";
        speak()
        draw_apple = "";
    }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}