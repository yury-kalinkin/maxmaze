mxmz.actionProcessor = {
	monsterIntervalID: null
}

mxmz.actionProcessor.setMaxStart = function(maxStartX, maxStartY) {
    mxmz.max.x = maxStartX;
    mxmz.max.y = maxStartY;	
    mxmz.viewProcessor.addAnimationToViewElementBySelector(
            '.cell.coord_' + maxStartX + '_' + maxStartY, 'max_front');	
}

mxmz.actionProcessor.init = function() {
	mxmz.playerHelper.currentLang = mxmz.en_translate;
	mxmz.playerHelper.initScores(); 
	mxmz.max = new mxmz.Max();        
	mxmz.max.keyBoard();
        mxmz.playerHelper.refreshSelectedItem();
        mxmz.playerHelper.refreshCurrentAmmo();        
};

mxmz.actionProcessor.engineLoop = function() {
    mxmz.actionProcessor.monsterIntervalID = setInterval('mxmz.actionProcessor.move()', 500);
}

mxmz.actionProcessor.warp = function(level) {
    mxmz.levelDataProcessor.previousLevel = mxmz.levelDataProcessor.currentLevel;
    mxmz.levelDataProcessor.loadLevel(level);
    mxmz.soundProcessor.play(mxmz.soundProcessor.sounds.PORTAL);
}

mxmz.actionProcessor.move = function() {
	if (mxmz.levelDataProcessor.refreshLevel) {            
		mxmz.levelDataProcessor.loadLevel(mxmz.levelDataProcessor.currentLevel.index);
		return;
	}
	mxmz.actionProcessor.moveMonsters();
}

mxmz.actionProcessor.moveMonsters = function() {

	mxmz.levelDataProcessor.characters.forEach(function (character) {
            if (!character.freeze) {
                character.walk();
            };
	});
	
}