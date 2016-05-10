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
        alert(lastTranscript);
    };


    globalScope.start = function(){
        recognition.start();
    };

    globalScope.stop = function(){
        recognition.stop();
    };
})(window);
