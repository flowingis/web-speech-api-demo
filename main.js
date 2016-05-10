(function(globalScope){
    if(!globalScope.webkitSpeechRecognition){
        alert('Not supported by your browser');
        throw new Error();
    }
})(window);
