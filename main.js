Webcam.set({
    height: 350,
    width: 400,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('camera');

function takeShot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capturedImg" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version: ', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/sB6j0PF3I/model.json', modelLoaded);

function modelLoaded() {
    console.log('ml5 model loaded')
}

function check() {
    img = document.getElementById('capturedImg');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("objectName").innerHTML = results[0].label;
        document.getElementById("objectAccuracy").innerHTML = results[0].confidence.toFixed(1);
    }
}