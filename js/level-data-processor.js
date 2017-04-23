mxmz.levelDataProcessor = {
    levelName: null,
    levelMatrix: null,
    prevLevelType: null,
    levelType: null,
    maxDecorIndex: null,
    characters: [],
    levelXSize: null,
    levelCellsCount: null,
    refreshLevel: false,
    currentLevel: null,
    previousLevel: null
}

mxmz.levelDataProcessor.putItem = function(x, y, item) {
    if (mxmz.levelDataProcessor.levelMatrix[y-1][x-1] === 0) {
        var itemQty = item.data && item.data.qty;
        mxmz.levelDataProcessor.levelMatrix[y-1][x-1] = 'i' + item.key + (itemQty ? '-' + itemQty : '');
        mxmz.viewProcessor.addAnimationToViewElementBySelector('.cell.coord_' + x + '_' + y, item.cssClass);        
    }    
}

mxmz.levelDataProcessor.putPack = function(x, y, packMaster) {
    if (mxmz.levelDataProcessor.levelMatrix[y-1][x-1] === 0) {        
        mxmz.levelDataProcessor.levelMatrix[y-1][x-1] = 'p-' + packMaster;
        mxmz.viewProcessor.addAnimationToViewElementBySelector('.cell.coord_' + x + '_' + y, 'pack');        
    }    
}

mxmz.levelDataProcessor.getCellValueByCoords = function(coordX, coordY) {
    var levelX = coordY - 1;
    var levelY = coordX - 1;
    var cell = mxmz.levelDataProcessor.levelMatrix[levelX] ? mxmz.levelDataProcessor.levelMatrix[levelX][levelY] : undefined;
    return cell;
}

mxmz.levelDataProcessor.getCharacterByCoords = function(coordX, coordY) {
    for (var i = 0; i <= mxmz.levelDataProcessor.characters.length; i++) {
        if (mxmz.levelDataProcessor.characters[i] && mxmz.levelDataProcessor.characters[i].x === coordX && mxmz.levelDataProcessor.characters[i].y === coordY) {
            return mxmz.levelDataProcessor.characters[i];
        }
    }
}

mxmz.levelDataProcessor.getCharacterById = function(id) {
    for (var i = 0; i <= mxmz.levelDataProcessor.characters.length; i++) {
        if (mxmz.levelDataProcessor.characters[i] && mxmz.levelDataProcessor.characters[i].id === id) {
            return mxmz.levelDataProcessor.characters[i];
        }
    }
}

mxmz.levelDataProcessor.getPortalType = function(x, y) {
    
    if (y === undefined || y === null) {
        return mxmz.levelDataProcessor.analiseAndGetPortalPostfix(x);
    }
    var portalCell = mxmz.levelDataProcessor.levelMatrix[y][x];
    return mxmz.levelDataProcessor.analiseAndGetPortalPostfix(portalCell);
}

mxmz.levelDataProcessor.analiseAndGetPortalPostfix = function(portal) {
    return portal.indexOf('wf') === 0 ? 'far' : '';
}

mxmz.levelDataProcessor.analiseAndGetBoxFullType = function(box) {
    return mxmz.chestHelper.allBoxes[box]
}

mxmz.levelDataProcessor.isLevelTypeChanged = function() {
    return mxmz.levelDataProcessor.prevLevelType !== mxmz.levelDataProcessor.levelType;
}

mxmz.levelDataProcessor.loadLevel = function(level) {
    mxmz.levelDataProcessor.clearOldLevel();
    mxmz.levelDataProcessor.loadLevelData(level);
    mxmz.gameFieldProcessor.drawGameField();
    mxmz.gameFieldProcessor.fillGameField();
    mxmz.playerHelper.refreshWorldInfoSpan();
    mxmz.levelDataProcessor.noNeedToRehreshLevel();
    mxmz.actionProcessor.engineLoop();
    mxmz.levelDataProcessor.processLoadLevelSounds();
}

mxmz.levelDataProcessor.processLoadLevelSounds = function() {
    if (mxmz.levelDataProcessor.isLevelTypeChanged()) {
        mxmz.soundProcessor.stopAllSounds();
        mxmz.soundProcessor.play(mxmz.levelDataHelper.getLevelAmbient(mxmz.levelDataProcessor.currentLevel.type));
    } else {
        mxmz.soundProcessor.stopAllSoundsExceptAmbient();
    }   
}

mxmz.levelDataProcessor.needToRefreshLevel = function() {
    mxmz.levelDataProcessor.refreshLevel = true;
}

mxmz.levelDataProcessor.noNeedToRehreshLevel = function() {
    mxmz.levelDataProcessor.refreshLevel = false;
}

mxmz.levelDataProcessor.loadLevelData = function(level) {
    mxmz.levelDataProcessor.currentLevel = mxmz.levels['level_' + level];	
    mxmz.levelDataProcessor.levelName = mxmz.playerHelper.translate(mxmz.levelDataProcessor.currentLevel.name);
    mxmz.levelDataProcessor.levelMatrix = mxmz.levelDataProcessor.currentLevel.matrix;
    
    mxmz.randomizeProcessor.fireRandomEvents(mxmz.levelDataProcessor.currentLevel);
    
    mxmz.levelDataProcessor.levelType = '_' + mxmz.levelDataProcessor.currentLevel.type;
    mxmz.levelDataProcessor.maxDecorIndex = mxmz.levelDataProcessor.currentLevel.max_decor;
    mxmz.levelDataProcessor.levelXSize = mxmz.levelDataProcessor.levelMatrix[0].length;
    mxmz.levelDataProcessor.levelCellsCount = mxmz.levelDataProcessor.levelXSize * mxmz.levelDataProcessor.levelMatrix.length;
    
}

mxmz.levelDataProcessor.clearOldLevel = function() {
    mxmz.levelDataProcessor.prevLevelType = mxmz.levelDataProcessor.levelType;
    mxmz.viewProcessor.ereaseViewElement('.gameField');
    mxmz.levelDataProcessor.characters = [];
    clearInterval(mxmz.actionProcessor.monsterIntervalID);
}