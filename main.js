objects = [];
status="";
answer = "";

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,480);
    video.hide();
  }

  function start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Deteting Objects";
    answer = document.getElementById("input").value;
  }

  function modelLoaded(){
    console.log("Model Loaded");
    status = true ;
  }

  function draw(){
    image(video,0,0,480,380);
    if(status != ""){
      objectDetector.detect(video, gotResults);
      for(i = 0;i < objects.length;i++){
          document.getElementById("status").innerHTML = "Status : Object Detected";
          console.log(objects.length);
          fill("#ff0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
          noFill();
          stroke("#ff0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

          if(objects[i].label == input){
              video.stop();
              object_Detector.detect(gotResults);
              document.getElementById("object_found").innerHTML = input+" Found";
              var synth = window.speechSynthesis;
              var utterThis = new SpeechSynthesisUtterance(input + "Found");
              synth.speak(utterThis);
          }
          else{
              document.getElementById("object_found").innerHTML = input + "Not Found";
          }
      }
  }
  }

  function gotResults(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}