mxmz.randomizeProcessor = {
	randomFlags: {redCat: false}
}

mxmz.randomizeProcessor.fireRandomEvents = function(currentLevel) {
	if (mxmz.levelDataProcessor.currentLevel.type === 'woods') {
		mxmz.randomizeProcessor.randomiseRedCat(currentLevel);
	}	
}

mxmz.randomizeProcessor.randomiseRedCat = function(currentLevel) {
	if (!mxmz.randomizeProcessor.randomFlags.redCat && mxmz.utilsHelper.getRandomInt(1, 1000) > 990) {
		mxmz.randomizeProcessor.setValueToRandomZeroCellInLevelMatrix('m4-3', 'redCat', 80);
	};
}

mxmz.randomizeProcessor.switchRandomFlag = function(flagName) {
	mxmz.randomizeProcessor.randomFlags[flagName] = !mxmz.randomizeProcessor.randomFlags[flagName];
}

mxmz.randomizeProcessor.setValueToRandomZeroCellInLevelMatrix = function(valueToSet, flagName, percent) {
	for (var i = 0; i < mxmz.levelDataProcessor.levelMatrix.length; i++) {
		for (var j = 0; j < mxmz.levelDataProcessor.levelMatrix[i].length; j++) {
			if (!mxmz.randomizeProcessor.randomFlags[flagName] && mxmz.levelDataProcessor.levelMatrix[i][j] === 0 && 
				(mxmz.utilsHelper.getRandomInt(1, 100) > percent || 60)) {
				mxmz.levelDataProcessor.levelMatrix[i][j] = valueToSet;
				mxmz.randomizeProcessor.switchRandomFlag(flagName);
			}
		}
	}
}