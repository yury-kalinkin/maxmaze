mxmz.Dialog = function (greeting, phrases) {
    this.greeting = greeting;
    this.phrases = phrases;
    this.setGreeting = function(greeting) {
        this.greeting = greeting;
        return this;
    }
    this.setPhrases = function(phrases) {
        this.phrases = phrases;
        return this;
    }    
}