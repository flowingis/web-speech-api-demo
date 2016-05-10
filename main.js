(function(globalScope){
    if(!globalScope.webkitSpeechRecognition){
        alert('Not supported by your browser');
        throw new Error();
    }

    var lastTranscript = "";
    var recognition = new globalScope.webkitSpeechRecognition();

    recognition.lang = "it-IT";

    recognition.onstart = function () {
        lastTranscript = "";
    };

    recognition.onresult = function(e){
        _.each(e.results,function(result){
            if(result.isFinal){
                lastTranscript += _.maxBy(result, 'confidence').transcript;
            }
        });
    };

    recognition.onend = function(){
        addToChat("You",lastTranscript);
        respond();
    };


    globalScope.start = function(){
        recognition.start();
    };

    globalScope.stop = function(){
        recognition.stop();
    };

    var addToChat = function(prefix,text){
        $('#chat').append('<li>' + prefix + ": " + text + '</li>');
    };

    var speak = function(text){
        if(globalScope.SpeechSynthesisUtterance){
            var message = new globalScope.SpeechSynthesisUtterance(text);
            globalScope.speechSynthesis.speak(message);
        }
    };

    var respond = function(){
        return $.get("https://baconipsum.com/api/?type=all-meat&sentences=1").then(function(results){
            var text = results[0];
            speak(text);
            addToChat('System',text);
        });
    }
})(window);
