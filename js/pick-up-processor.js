mxmz.pickUpProcessor = {};

mxmz.pickUpProcessor.pickUpCrystall = function(crystallX, crystallY, crystallType) {
    mxmz.playerHelper.scores = mxmz.playerHelper.scores + mxmz.playerHelper.getScoresForCrystall(crystallType);
    mxmz.levelDataProcessor.levelMatrix[crystallY - 1][crystallX - 1] = 0;
    mxmz.viewProcessor.removeAnimationFromViewElementBySelector(
            '.cell.coord_' + crystallX + '_' + crystallY, mxmz.cssProcessor.getCrystallClass(crystallType));
    mxmz.playerHelper.setScores(mxmz.playerHelper.scores);
    mxmz.soundProcessor.play(mxmz.soundProcessor.sounds.CRYSTALL);
}

mxmz.pickUpProcessor.pickUpItem = function(itemX, itemY, itemCode) {
    mxmz.levelDataProcessor.levelMatrix[itemY - 1][itemX - 1] = 0;
    mxmz.viewProcessor.removeAnimationFromViewElementBySelector(
            '.cell.coord_' + itemX + '_' + itemY, mxmz.cssProcessor.getItemClass(itemCode));
    var itemToPickUp = mxmz.itemsHelper.getItemByKey(itemCode);
    mxmz.max.getItem(itemToPickUp);
    mxmz.soundProcessor.play(mxmz.soundProcessor.sounds.ITEM);
}

mxmz.pickUpProcessor.pickUpPack = function(packX, packY, cellToGo) {
    var packMaster = cellToGo.replace('p-', '');
    mxmz.levelDataProcessor.levelMatrix[packY - 1][packX - 1] = 0;
    mxmz.viewProcessor.removeAnimationFromViewElementBySelector(
            '.cell.coord_' + packX + '_' + packY, 'pack');
    console.log('pickUpPack > packMaster:', packMaster);
    mxmz.packHelper.openPack(packMaster);
}