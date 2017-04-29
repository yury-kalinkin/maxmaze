mxmz.chestHelper = {};

mxmz.chestHelper.currentChestItems = [];

mxmz.chestHelper.isChestOpened = function() {
    return mxmz.chestHelper.currentChestItems && mxmz.chestHelper.currentChestItems.length;
}

mxmz.chestHelper.changeOpenedChestItemsTranslate = function() {
    if (mxmz.chestHelper.isChestOpened()) {
        mxmz.itemsDisplayProcessor.refreshItemsDescription(mxmz.chestHelper.currentChestItems, mxmz.inventory);
    }
};

mxmz.chestHelper.getItemsFromOpenedBox = function(boxType) {    
    var foundItems = [];
    var chestItemsList = mxmz.chestHelper.getChestItemsList(boxType);
    var isSpec = mxmz.chestHelper.allBoxes[boxType].indexOf('spec') > 0;

    var itemsInCurrentChestCnt = isSpec ? 1 : mxmz.utilsHelper.getRandomInt(1, 3);
    for (var i=0; i < itemsInCurrentChestCnt; i++) {
        var currentItemIndex = mxmz.utilsHelper.getRandomInt(0, chestItemsList.length-1);
        foundItems.push(chestItemsList[currentItemIndex]);
        chestItemsList.splice(currentItemIndex, 1);
    }
    return mxmz.utilsHelper.cloneObj(foundItems);
}

mxmz.chestHelper.openedBoxes = {
    'bm-o': 'max_chest_opened',
    'bms-o': 'max_spec_chest_opened',
    'ba-o': 'alien_chest_opened',
    'bas-o': 'alien_spec_chest_opened'
}

mxmz.chestHelper.closedBoxes = {
    'bm-c': 'max_chest_closed',
    'bms-c': 'max_spec_chest_closed',
    'ba-c': 'alien_chest_closed',
    'bas-c': 'alien_spec_chest_closed'
}

mxmz.chestHelper.allBoxes = 
        Object.assign(mxmz.utilsHelper.cloneObj(mxmz.chestHelper.openedBoxes), mxmz.chestHelper.closedBoxes);


mxmz.chestHelper.getChestItemsList = function(boxType) {
    switch(boxType) {
        case 'bm-c': {
           return mxmz.chests.maxChestItems;
        }
        case 'bms-c': {
           return mxmz.chests.maxSpecialChestItems;
        }
        case 'ba-c': {
           return mxmz.chests.alienChestItems;
        } 
        case 'bas-c': {
           return mxmz.chests.alienSpecialChestItems;
        }     
    }    
}

mxmz.chestHelper.drawBoxOpened = function(x, y, place) {    
    //and need to simplify this
    var preparedOpenedBoxCode = place.replace('-c', '-o');
    mxmz.levelDataProcessor.levelMatrix[y-1][x-1] = preparedOpenedBoxCode;
    var boxFullType = mxmz.levelDataProcessor.analiseAndGetBoxFullType(preparedOpenedBoxCode);
    var classToSelect = '.cell.coord_' + x + '_' + y;
    mxmz.viewProcessor.addAnimationToViewElementBySelector(classToSelect, mxmz.cssProcessor.getBoxClass(boxFullType));
    mxmz.cssHelper.removeClosedChestClass(classToSelect);
}