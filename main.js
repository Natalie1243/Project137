status_model = "";
objects = [];
results = "";

function setup() {
canvas= createCanvas(500, 450);
canvas.center();
video = createCapture(VIDEO);
video.size(500, 450);
}

function preload() {
video.hide();
}

function draw(){
image(video, 0, 0, 500, 450);
if(status_model != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;

            fill("#FF0000");
            confidence = floor(objects[i].confidence * 100);
            text(objects[i].label + confidence + " % ", objects[i].x + 10 , objects[i].y - 10);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }

        if(objects[i].label == object_name) {
            variable_name_holds_webcamLiveView.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_status").innerHTML = object_name + "Found";
            const synth = window.speechSynthesis;
            const utterThis = new SpeechSynthesisUtterance("Object metioned found");
            objects = results.speak(utterThis);
            
            else{

            }

            
            
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting objects";
    value = document.getElementById('input').value;

}

function modelLoaded() {
    console.log('Model Loaded');
    status_model = true;
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    
    else{
        console.log(results);
        objects = results;
    }
    
    }
    