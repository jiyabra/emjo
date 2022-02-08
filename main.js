var Prediction1 = "";
var Prediction2 = "";

Webcam.set({
    width:350,
    height:300,
    Image_format:'png',
    png_quality:90
});

Camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "capture_image" src ="'+data_uri+'"/>';
    });
}

console.log('ml5 version:',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/fCy8-v1BM/model.json',modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speakdata1 = "The first Prediction is = "+Prediction1;
    speakdata2 = "And the second Prediction is = "+Prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_Image');
    classifier.classify(img, gotResult);
}

function gotResult(error,results)
{
    if (error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        Prediction1 = results[0].label;
        Prediction2 = results[1].label;
        speak();
        if(results[0].label == "happy"){
            document.getElementById("update_emoji1").innerHTML = "&#128512;";
        }
        if(results[0].label == "sad"){
            document.getElementById("update_emoji1").innerHTML = "&#128545;";
        }
        if(results[0].label == "angry"){
            document.getElementById("update_emoji1").innerHTML = "&#128548;";

        }if(results[0].label == "crying"){
            document.getElementById("update_emoji1").innerHTML = "&#128546;";
        }
        if(results[1].label == "happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128512;";
        }
        if(results[1].label == "sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
        }
        if(results[1].label == "angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128548;";

        }if(results[1].label == "crying"){
            document.getElementById("update_emoji2").innerHTML = "&#128546;";
        }
    }
}