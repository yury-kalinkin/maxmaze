mxmz.dialogProcessor = {};

mxmz.dialogProcessor.currentDialog = [];
mxmz.dialogProcessor.currentNpc = {};

mxmz.dialogProcessor.fillCurrentDilog = function (dialog) {
    for (phrase of dialog) {
        if (phrase.condition && !phrase.condition()) {
            continue;
        }
        mxmz.dialogProcessor.currentDialog.push(phrase);
    };    
}

mxmz.dialogProcessor.beginDialog = function(npc, dialog) {
    mxmz.dialogProcessor.currentNpc = npc;
    mxmz.dialogProcessor.currentNpc.freeze = true;
    
    mxmz.dialogProcessor.fillCurrentDilog(dialog);
    
    mxmz.dialogProcessor.prepareDialogWrapper();
    mxmz.dialogProcessor.drawDialog()
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

mxmz.dialogProcessor.selectDialog = function(selectedPhraseIndex) {
    var selectedPhrase = mxmz.dialogProcessor.currentDialog[selectedPhraseIndex-1];
    var npcAnswer = '';
    if (Array.isArray(selectedPhrase.npcAnswer)) {
        npcAnswer = selectedPhrase.npcAnswer[mxmz.utilsHelper.getRandomInt(0, selectedPhrase.npcAnswer.length-1)];
    } else {
        npcAnswer = selectedPhrase.npcAnswer;
    }
    $('.dialogWrapper #npc-phrase').html('<div>' + mxmz.playerHelper.translate(npcAnswer) + '</div>');
    if (selectedPhrase.result) {
        selectedPhrase.result();
    }
};

mxmz.dialogProcessor.closeDialog = function() {
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