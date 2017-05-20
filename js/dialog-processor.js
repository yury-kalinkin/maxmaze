mxmz.dialogProcessor = {};

mxmz.dialogProcessor.currentDialog = [];
mxmz.dialogProcessor.lastPhrase = {};
mxmz.dialogProcessor.currentNpc = {};

mxmz.dialogProcessor.fillCurrentDilog = function (dialog) {
    console.log('fillCurrentDilog > dialog:', dialog);
    for (phrase of dialog.phrases) {
        if (phrase.condition && !phrase.condition()) {
            continue;
        }
        mxmz.dialogProcessor.currentDialog.push(phrase);
    };    
}

mxmz.dialogProcessor.beginDialog = function(npc, dialog) {
    if (npc) {
        mxmz.dialogProcessor.currentNpc = npc;
        mxmz.dialogProcessor.currentNpc.freeze = true;        
    }
        
    mxmz.dialogProcessor.currentDialog = [];
    mxmz.dialogProcessor.fillCurrentDilog(dialog);
    
    mxmz.dialogProcessor.prepareDialogWrapper();
    $('.dialogWrapper #npc-phrase').html('<div>' + mxmz.playerHelper.translate(dialog.greeting) + '</div>');
    mxmz.dialogProcessor.drawDialog()    
    mxmz.dialogProcessor.keyBoard();
    mxmz.viewProcessor.removeAnimationFromViewElementBySelector('.dialogWrapper', 'hide');
};

mxmz.dialogProcessor.switchDialog = function(dialog) {
        
    mxmz.dialogProcessor.currentDialog = [];
    mxmz.dialogProcessor.fillCurrentDilog(dialog);
    
    mxmz.dialogProcessor.prepareDialogWrapper();    
    mxmz.dialogProcessor.drawDialog();
    $('.dialogWrapper #npc-phrase').html('<div>' + mxmz.playerHelper.translate(mxmz.dialogProcessor.getNPCAnswer(mxmz.dialogProcessor.lastPhrase)) + '</div>');
    mxmz.dialogProcessor.keyBoard();
    mxmz.viewProcessor.removeAnimationFromViewElementBySelector('.dialogWrapper', 'hide');
};

mxmz.dialogProcessor.prepareDialogWrapper = function() {
  $('.dialogWrapper #npc-name').html('');
  $('.dialogWrapper #max-phrase').html('');
  $('.dialogWrapper #npc-phrase').html('');
};

mxmz.dialogProcessor.drawDialog = function() {
    $('.dialogWrapper #npc-name').html(mxmz.playerHelper.translate(mxmz.dialogProcessor.currentNpc.name));
    var i = 1;    
    for (phrase of mxmz.dialogProcessor.currentDialog) {
        $('.dialogWrapper #max-phrase').append('<div>' + i + ': ' + mxmz.playerHelper.translate(phrase.maxPhrase) + '</div>');
        i++;
    };
};

mxmz.dialogProcessor.getNPCAnswer = function(selectedPhrase) {
    if (Array.isArray(selectedPhrase.npcAnswer)) {
        return selectedPhrase.npcAnswer[mxmz.utilsHelper.getRandomInt(0, selectedPhrase.npcAnswer.length-1)];
    } else {
        return selectedPhrase.npcAnswer;
    }
}

mxmz.dialogProcessor.selectDialog = function(selectedPhraseIndex) {
    mxmz.dialogProcessor.lastPhrase = mxmz.dialogProcessor.currentDialog[selectedPhraseIndex-1];
    var selectedPhrase = mxmz.dialogProcessor.lastPhrase;
    var npcAnswer = mxmz.dialogProcessor.getNPCAnswer(selectedPhrase);
    $('.dialogWrapper #npc-phrase').html('<div>' + mxmz.playerHelper.translate(npcAnswer) + '</div>');
    if (selectedPhrase.subDialog) {
        mxmz.dialogProcessor.beginDialog(mxmz.dialogProcessor.currentNpc, selectedPhrase.subDialog);
    }
    if (selectedPhrase.result) {
        selectedPhrase.result();
    }
};

mxmz.dialogProcessor.closeDialog = function() {
    console.log('closeDialog')
    document.onkeydown = function (e) {
        mxmz.viewProcessor.addAnimationToViewElementBySelector('.dialogWrapper', 'hide');
        mxmz.dialogProcessor.currentDialog = [];
        mxmz.dialogProcessor.currentNpc.freeze = false;
        mxmz.dialogProcessor.currentNpc = {};
        mxmz.max.keyBoard();
    }
}

mxmz.dialogProcessor.keyBoard = function() {
    document.onkeydown = function (e) {

        switch (e.keyCode) {
            case 49:
            {
                mxmz.dialogProcessor.selectDialog(1);
                break;
            }
            case 50:
            {
                mxmz.dialogProcessor.selectDialog(2);
                break;
            }
            case 51:
            {
                mxmz.dialogProcessor.selectDialog(3);
                break;
            }
            case 52:
            {
                mxmz.dialogProcessor.selectDialog(4);
                break;
            }            
            default:
            {
            }
        }

    };  
};