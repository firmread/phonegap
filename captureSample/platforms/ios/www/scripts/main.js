document.addEventListener("deviceready", onDeviceReady, false);
 
function id(element) {
    return document.getElementById(element);
}

function onDeviceReady() {
    navigator.splashscreen.hide();
    captureApp = new captureApp();
    captureApp.run();
}

function captureApp() {
}

captureApp.prototype = {
    pictureSource:null,
    
    destinationType:null,
    
    run:function() {
        var that = this;
        id("captureVideo").addEventListener("click", function() {
            that._captureVideo.apply(that, arguments);
        });
        id("captureAudio").addEventListener("click", function() {
            that._capureAudio.apply(that, arguments);
        });
        id("captureImage").addEventListener("click", function() {
            that._captureImage.apply(that, arguments);
        });
    },
    
    _captureVideo:function() {
        var that = this;
        navigator.device.capture.captureVideo(function() {
            that._captureSuccess.apply(that, arguments);
        }, function() { 
            captureApp._captureError.apply(that, arguments);
        }, {limit:1});
    },
    
    _capureAudio:function() {
        var that = this;
        navigator.device.capture.captureAudio(function() {
            that._captureSuccess.apply(that, arguments);
        }, function() { 
            captureApp._captureError.apply(that, arguments);
        }, {limit:1});
    },
    
    _captureImage:function() {
        var that = this;
        navigator.device.capture.captureImage(function() {
            that._captureSuccess.apply(that, arguments);
        }, function() { 
            captureApp._captureError.apply(that, arguments);
        }, {limit:1});
    },
    
    _captureSuccess:function(capturedFiles) {
        var i,
        media = document.getElementById("media");
        media.innerHTML = "";
        for (i=0;i < capturedFiles.length;i+=1) {
            media.innerHTML+='<p>Capture taken! Its path is: ' + capturedFiles[i].fullPath + '</p>'
        }
    },
    
    _captureError:function(error) {
        if (window.navigator.simulator === true) {
            alert(error);
        }
        else {
            var media = document.getElementById("media");
            media.innerHTML = "An error occured! Code:" + error.code;
        }
    },
}