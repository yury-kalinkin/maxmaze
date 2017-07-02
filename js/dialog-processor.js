mxmz.dialogProcessor = {};

mxmz.dialogProcessor.currentDialog = [];
mxmz.dialogProcessor.lastPhrase = {};
mxmz.dialogProcessor.currentNpc = {};
mxmz.dialogProcessor.currentDialogIndex = 0;

mxmz.dialogProcessor.fillCurrentDilog = function (dialog) {
    console.log('fillCurrentDilog > dialog:', dialog);
    for (phrase of dialog.phrases) {
        if (phrase.condition && !phrase.condition()) {
            continue;
        }
        mxmz.dialogProcessor.currentDialog.push(phrase);
    };
    mxmz.dialogProcessor.currentDialogIndex = 1;    
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
        $('.dialogWrapper #max-phrase').append('<div id="max-dialog-' + i + '">' + i + ': ' + mxmz.playerHelper.translate(phrase.maxPhrase) + '</div>');
        i++;
    };
    mxmz.dialogProcessor.addSelectedMarker(mxmz.dialogProcessor.currentDialogIndex);
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
        mxmz.dialogProcessor.currentDialogIndex = 0;
        mxmz.max.keyBoard();
    }
}

mxmz.dialogProcessor.addSelectedMarker = function(dialogIndex) {
    console.log('addSelectedMarker > dialogIndex:', dialogIndex)
    $('#max-dialog-' + dialogIndex).css('background-color', 'red');
}

mxmz.dialogProcessor.removeSelectedMarker = function(dialogIndex) {
    $('#max-dialog-' + dialogIndex).css('background-color', '');
}

mxmz.dialogProcessor.moveDialogSelectorUp = function() {
    var index = mxmz.dialogProcessor.currentDialogIndex;    
    if (index > 1) {
        mxmz.dialogProcessor.removeSelectedMarker(index);
        index = --mxmz.dialogProcessor.currentDialogIndex;
        mxmz.dialogProcessor.addSelectedMarker(index);
    }
}

mxmz.dialogProcessor.moveDialogSelectorDown = function() {
    var index = mxmz.dialogProcessor.currentDialogIndex;    
    if (index < mxmz.dialogProcessor.currentDialog.length) {
        mxmz.dialogProcessor.removeSelectedMarker(index);
        index = ++mxmz.dialogProcessor.currentDialogIndex;
        mxmz.dialogProcessor.addSelectedMarker(index);
    }
}

mxmz.dialogProcessor.keyBoard = function() {
    document.onkeydown = function (e) {
        
        switch (e.keyCode) {
            
            case 87:
            {
                mxmz.dialogProcessor.moveDialogSelectorUp()
                break;
            }
            case 38:
            {
                console.log('38')
                mxmz.dialogProcessor.moveDialogSelectorUp()
                break;
            }                
            case 83:
            {
                mxmz.dialogProcessor.moveDialogSelectorDown()
                break;
            }
            case 40:
            {
                mxmz.dialogProcessor.moveDialogSelectorDown()
                break;
            }
            
            case 69:
            {
                mxmz.dialogProcessor.selectDialog(mxmz.dialogProcessor.currentDialogIndex);
                break;
            }
            case 13:
            {
                mxmz.dialogProcessor.selectDialog(mxmz.dialogProcessor.currentDialogIndex);
                break;
            }             
                   
            default:
            {
            }
        }

    };  
};