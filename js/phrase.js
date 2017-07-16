mxmz.Phrase = function (maxPhrase, npcAnswer, result, condition, subDialog) {
    this.maxPhrase = maxPhrase;
    this.npcAnswer = npcAnswer;
    this.result = result;
    this.condition = condition;
    this.subDialog = subDialog;
    this.setMaxPhrase = function(maxPhrase) {
        this.maxPhrase = maxPhrase;
        return this;
    }
    this.setNPCAnswer = function(npcAnswer) {
        this.npcAnswer = npcAnswer;
        return this;
    }
    this.setResult = function(result) {
        this.result = result;
        return this;
    }
    this.setCondition = function(condition) {
        this.condition = condition;
        return this;
    }
    this.setSubDialog = function(subDialog) {
        this.subDialog = subDialog;
        return this;
    }    
}