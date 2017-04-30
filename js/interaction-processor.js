mxmz.interactionProcessor = {};

mxmz.interactionProcessor.interactions = {
    OPEN_CHEST: 'open.chest',
    TALK_TO_NPC: 'talk.to.npc'
}

mxmz.interactionProcessor.interaction = function(place) {
    if (mxmz.gameFieldProcessor.isHereClosedBox(place)) {
        mxmz.interactionProcessor.openChest(place);
        mxmz.interactionProcessor.keyDown(mxmz.interactionProcessor.interactions.OPEN_CHEST);
        return;
    }
    if (mxmz.gameFieldProcessor.isHereNpc(place)) {
        mxmz.interactionProcessor.talk(place);
        return;
    }    
}

mxmz.interactionProcessor.openChest = function(place) {
    var max = mxmz.max;
    var loot = mxmz.chestHelper.getItemsFromOpenedBox(place);
    mxmz.chestHelper.currentChestItems = loot;
    mxmz.itemsDisplayProcessor.draw(loot, 0, loot.length);
    mxmz.chestHelper.drawBoxOpened(max.lookCoords.x, max.lookCoords.y, max.look);
    loot.forEach(function(item) {
        max.getItem(item);
    });    
};

mxmz.interactionProcessor.closeChest = function() {
    mxmz.chestHelper.currentChestItems = [];
    mxmz.inventory.hide();
    mxmz.max.keyBoard();
}

mxmz.interactionProcessor.talk = function(target) {
    var max = mxmz.max;
    var npc = mxmz.levelDataProcessor.getCharacterByCoords(max.lookCoords.x, max.lookCoords.y);
//    if (npc.data.relationship < 0) {
//        return console.log('npc ' + npc.data.name + ' said: ARRRRRRRHHH!!!!');
//    }
//    return console.log('npc ' + npc.data.name + ' said: ' + npc.data.speak);

    mxmz.dialogProcessor.beginDialog(npc, mxmz.dialogs[npc.code]);
}

mxmz.interactionProcessor.keyDown = function(event) {
    document.onkeydown = function (e) {
        if (e.keyCode === 76) {
            mxmz.playerHelper.changeTranslate();
        };
        if ((e.keyCode === 69 || e.keyCode === 13 || e.keyCode === 32)) {
            if (event === mxmz.interactionProcessor.interactions.OPEN_CHEST) {
                mxmz.inventory.hide();
                mxmz.interactionProcessor.closeChest();
                mxmz.max.keyBoard();
            };
        }
    };
}